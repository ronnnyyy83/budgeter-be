/* eslint-disable camelcase */
import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';
import {
  hashPassword,
  comparePassword,
  isValidPassword,
  isValidUsername,
  isEmpty,
  generateUserToken,
} from '../helpers/validations';
import { errorMessage, successMessage, status } from '../helpers/status';

const createUser = async (req, res) => {
  const { username, password, city, country, allowShare } = req.body;
  const created_on = moment(new Date());

  if (isEmpty(username) || isEmpty(password) || isEmpty(city) || isEmpty(country)) {
    errorMessage.error = 'Username, password field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidUsername(username)) {
    errorMessage.error = 'Please enter a valid Username';
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidPassword(password)) {
    errorMessage.error = 'Password must be more than five(5) characters';
    return res.status(status.bad).send(errorMessage);
  }

  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      users(username, password, city, country, created_on, allow_share)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
  const values = [username, hashedPassword, city, country, created_on, allowShare ? 1 : 0];

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    delete dbResponse.id;
    delete dbResponse.created_on;
    const token = generateUserToken(dbResponse.username, dbResponse.id);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log(error);
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that username is already exist';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const signinUser = async (req, res) => {
  const { username, password } = req.body;

  if (isEmpty(username) || isEmpty(password)) {
    errorMessage.error = 'Username or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidUsername(username) || !isValidPassword(password)) {
    errorMessage.error = 'Please enter a valid Username or Password';
    return res.status(status.bad).send(errorMessage);
  }

  const signinUserQuery = 'SELECT * FROM users WHERE username = $1';
  try {
    const { rows } = await dbQuery.query(signinUserQuery, [username]);
    const dbResponse = rows[0];

    if (!dbResponse) {
      errorMessage.error = 'User with this username does not exist';
      return res.status(status.notfound).send(errorMessage);
    }

    if (!comparePassword(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }

    const token = generateUserToken(dbResponse.username, dbResponse.id);
    delete dbResponse.password;
    delete dbResponse.id;
    delete dbResponse.created_on;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

export { createUser, signinUser };
