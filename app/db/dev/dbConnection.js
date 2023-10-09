import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Table
 */
const createUserTable = () => {
  console.log('create users table');
  const createQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL,
  allow_share BIT NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log('users res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('users err:', err);
      pool.end();
    });
};

const createExpenseTypeTable = () => {
  console.log('create expense_types table');
  const createQuery = `CREATE TABLE IF NOT EXISTS expense_types
    (id INTEGER PRIMARY KEY,
    type VARCHAR(100) NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log('expense_types res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('expense_types err:', err);
      pool.end();
    });
};

const createIncomeTypeTable = () => {
  console.log('create income_types table');
  const createQuery = `CREATE TABLE IF NOT EXISTS income_types
    (id INTEGER PRIMARY KEY,
    type VARCHAR(100) NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log('income_types res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('income_types err:', err);
      pool.end();
    });
};

const createExpenseTable = () => {
  console.log('create expenses table');
  const createQuery = `CREATE TABLE IF NOT EXISTS expenses
  (id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  name VARCHAR(100),
  amount NUMERIC(8,2) NOT NULL,
  data JSONB,
  provider VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log('expenses res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('expenses err:', err);
      pool.end();
    });
};

const createIncomeTable = () => {
  console.log('create incomes table');
  const createQuery = `CREATE TABLE IF NOT EXISTS incomes
  (id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL,
  type_id INTEGER NOT NULL,
  name VARCHAR(100),
  amount NUMERIC(8,2) NOT NULL,
  data JSONB,
  created_on DATE NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log('incomes res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('incomes err:', err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropUserTable = () => {
  console.log('drop users table');
  const dropQuery = 'DROP TABLE IF EXISTS users';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log('user res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('users err:', err);
      pool.end();
    });
};

const dropExpenseTypeTable = () => {
  console.log('drop expense_types table');
  const dropQuery = 'DROP TABLE IF EXISTS expense_types';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log('expense_types:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('expense_types err:', err);
      pool.end();
    });
};

const dropIncomeTypeTable = () => {
  console.log('drop income_types table');
  const dropQuery = 'DROP TABLE IF EXISTS income_types';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log('income_types res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('income_types err:', err);
      pool.end();
    });
};

const dropExpenseTable = () => {
  console.log('drop expenses table');
  const dropQuery = 'DROP TABLE IF EXISTS expenses';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log('expenses res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('expenses err:', err);
      pool.end();
    });
};

const dropIncomeTable = () => {
  console.log('drop incomes table');
  const dropQuery = 'DROP TABLE IF EXISTS incomes';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log('incomes res:', res);
      pool.end();
    })
    .catch((err) => {
      console.log('incomes err:', err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createIncomeTypeTable();
  createExpenseTypeTable();
  createExpenseTable();
  createIncomeTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropExpenseTypeTable();
  dropIncomeTypeTable();
  dropExpenseTable();
  dropIncomeTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export { createAllTables, dropAllTables };

require('make-runnable');
