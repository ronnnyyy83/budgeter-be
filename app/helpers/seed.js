import pool from '../db/dev/pool';
import { hashPassword } from '../helpers/validations';

pool.on('connect', () => {
  console.log('connected to the db');
});

const seedUser = () => {
  console.log('seed users table');
  const seedQuery = `INSERT INTO
  users VALUES 
  ( default, 'test@test.com', 'Test', '${hashPassword('testpassword')}', 'Amsterdam', 'Netherlands', NOW()),
  ( default, 'ronyb83@gmail.com', 'Roni', '${hashPassword('ronipassword')}', 'Amstelveen', 'Netherlands', NOW())`;

  pool
    .query(seedQuery)
    .then((res) => {
      console.log('users res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('users err:', err);
      pool.end();
    });
};

const seedExpenseType = () => {
  console.log('seed expense_types table');
  const seedQuery = `INSERT INTO
  expense_types VALUES 
  ( 1, 'Home Rent'),
  ( 2, 'Home Mortgage'),
  ( 3, 'Home Electricity')`;

  pool
    .query(seedQuery)
    .then((res) => {
      console.log('expense_types res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('expense_types err:', err);
      pool.end();
    });
};

const seedIncomeType = () => {
  console.log('seed income_types table');
  const seedUserQuery = `INSERT INTO
  income_types VALUES 
  ( 1, 'Salary'),
  ( 2, 'Child Help'),
  ( 3, 'Kindergarden / School / Childcare help')`;

  pool
    .query(seedUserQuery)
    .then((res) => {
      console.log('income_types res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('income_types err:', err);
      pool.end();
    });
};

const seedAll = () => {
  seedUser();
  seedExpenseType();
  seedIncomeType();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export { seedAll };

require('make-runnable');
