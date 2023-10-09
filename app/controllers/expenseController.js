/* eslint-disable camelcase */
import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
import { isEmpty } from '../helpers/validations';
import { errorMessage, successMessage, status } from '../helpers/status';

const createExpense = async (req, res) => {
  const { type_id, name, amount, data, provider } = req.body;
  const { user_id } = req.user;
  const created_on = moment(new Date());

  if (isEmpty(type_id) || isEmpty(name) || isEmpty(amount) || isEmpty(provider)) {
    errorMessage.error = 'Type, name, amount, provider are required';
    return res.status(status.bad).send(errorMessage);
  }

  const createQuery = `INSERT INTO
          expenses(user_id, type_id, name, amount, data, provider, created_on)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          returning *`;
  const values = [user_id, type_id, name, amount, data, provider, created_on];

  try {
    const { rows } = await dbQuery.query(createQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to create expense';
    return res.status(status.error).send(errorMessage);
  }
};

const getAllExpenses = async (req, res) => {
  const { user_id } = req.user;
  const getAllQuery = 'SELECT * FROM expenses where user_id = $1 ORDER BY id DESC';
  const values = [user_id];

  try {
    const { rows } = await dbQuery.query(getAllQuery, values);
    const dbResponse = rows;

    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no expenses';
      return res.status(status.bad).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  const { user_id } = req.user;
  const deleteQuery = 'DELETE FROM expenses WHERE id=$1 AND user_id = $2 returning *';

  try {
    const { rows } = await dbQuery.query(deleteQuery, [expenseId, user_id]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'You have no expense with that id';
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = {};
    successMessage.data.message = 'Expense deleted successfully';
    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;
  const { name, amount, data, provider } = req.body;
  const { user_id } = req.user;

  if (isEmpty(type_id) || isEmpty(name) || isEmpty(amount) || isEmpty(provider)) {
    errorMessage.error = 'Type, name, amount, provider are required';
    return res.status(status.bad).send(errorMessage);
  }

  const findQuery = 'SELECT * FROM expenses WHERE id=$1';
  const updateQuery = `UPDATE expenses
        SET name=$1, amount=$2, data=$3, provider=$4 WHERE user_id=$5 AND id=$6 returning *`;

  try {
    const { rows } = await dbQuery.query(findQuery, [expenseId]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'Expense Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }

    const values = [name, amount, data, provider, user_id, expenseId];
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

export { createExpense, getAllExpenses, deleteExpense, updateExpense };
