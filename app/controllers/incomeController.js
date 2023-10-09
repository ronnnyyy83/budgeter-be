/* eslint-disable camelcase */
import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
import { isEmpty } from '../helpers/validations';
import { errorMessage, successMessage, status } from '../helpers/status';

const createIncome = async (req, res) => {
  const { type_id, name, amount, data } = req.body;
  const { user_id } = req.user;
  const created_on = moment(new Date());

  if (isEmpty(type_id) || isEmpty(name) || isEmpty(amount)) {
    errorMessage.error = 'Type, name, amount are required';
    return res.status(status.bad).send(errorMessage);
  }
  const createQuery = `INSERT INTO
          incomes(user_id, type_id, name, amount, data, created_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
  const values = [user_id, type_id, name, amount, data, created_on];

  try {
    const { rows } = await dbQuery.query(createQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to create income';
    return res.status(status.error).send(errorMessage);
  }
};

const getColumnName = (value) => {
  switch (value) {
    case 'type':
      return 'type_id';
    case 'amount':
      return 'amount';
    default:
      return null;
  }
}

const getMyIncomes = async (req, res) => {
  const { user_id } = req.user;
  const { orderBy, direction, startAmount, endAmount, type } = req.query;
  let orderColumn = 'id';
  let orderDirection = 'DESC';
  let filter = 'user_id = $1';
  let filterParam = 1;
  const filterValues = [user_id];

  if (orderBy) {
    orderColumn = getColumnName(orderBy) || 'id';
  }

  if (direction) {
    orderDirection = direction === 'ASC' ? 'ASC' : 'DESC';
  }

  if (startAmount && endAmount) {
    filter += ` and amount between $${filterParam++} and $${filterParam++}`;
    filterValues.push(startAmount);
    filterValues.push(endAmount);
  } else if (startAmount) {
    filter += ` and amount >= $${filterParam++}`;
    filterValues.push(startAmount);
  } else if (endAmount) {
    filter += ` and amount <= $${filterParam++}`;
    filterValues.push(endAmount);
  }

  if (type) {
    filter += ` and type_id = $${filterParam++}`;
    filterValues.push(type);
  }

  const getAllQuery = `SELECT * FROM incomes where ${filter} ORDER BY ${orderColumn} ${orderDirection}`;

  try {
    const { rows } = await dbQuery.query(getAllQuery, filterValues);
    const dbResponse = rows;

    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no incomes';
      return res.status(status.bad).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};

const getAllIncomes = async (req, res) => {
  const { orderBy, direction, type } = req.query;

  if (!type) {
    errorMessage.error = 'Should choose Type';
    return res.status(status.error).send(errorMessage);
  }

  let orderColumn = 'amount';
  let orderDirection = 'ASC';
  const filter = 'type_id = $1';
  const filterValues = [type];

  if (orderBy) {
    orderColumn = getColumnName(orderBy) || 'id';
  }

  if (direction) {
    orderDirection = direction === 'ASC' ? 'ASC' : 'DESC';
  }

  const getAllQuery = `SELECT * FROM incomes where ${filter} ORDER BY ${orderColumn} ${orderDirection}`;

  try {
    const { rows } = await dbQuery.query(getAllQuery, filterValues);
    const dbResponse = rows;

    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no incomes';
      return res.status(status.bad).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};

const deleteIncome = async (req, res) => {
  const { incomeId } = req.params;
  const { user_id } = req.user;
  const deleteQuery = 'DELETE FROM incomes WHERE id=$1 AND user_id = $2 returning *';

  try {
    const { rows } = await dbQuery.query(deleteQuery, [incomeId, user_id]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'You have no income with that id';
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = {};
    successMessage.data.message = 'Income deleted successfully';
    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};

const updateIncome = async (req, res) => {
  const { incomeId } = req.params;
  const { name, amount, data } = req.body;
  const { user_id } = req.user;

  if (isEmpty(type_id) || isEmpty(name) || isEmpty(amount)) {
    errorMessage.error = 'Type, name, amount are required';
    return res.status(status.bad).send(errorMessage);
  }
  const findQuery = 'SELECT * FROM incomes WHERE id=$1';
  const updateQuery = `UPDATE incomes
        SET name=$1, amount=$2, data=$3, WHERE user_id=$4 AND id=$5 returning *`;
  try {
    const { rows } = await dbQuery.query(findQuery, [incomeId]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'Income Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }

    const values = [user_id, type_id, name, amount, data, created_on];
    const response = await dbQuery.query(updateQuery, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

export { createIncome, getMyIncomes, getAllIncomes, deleteIncome, updateIncome };
