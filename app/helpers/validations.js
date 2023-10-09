/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const isValidUsername = (username) => {
  if (username === undefined || username.length < 5) {
    return false;
  }

  return true;
};

const isValidPassword = (password) => {
  if (password === undefined || password.length < 6) {
    return false;
  }

  return true;
};

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }

  return false;
};

const generateUserToken = (username, id) => {
  const token = jwt.sign({ username, user_id: id }, env.secret, { expiresIn: '3d' });

  return token;
};

export { hashPassword, comparePassword, isValidEmail, isValidPassword, isValidUsername, isEmpty, generateUserToken };
