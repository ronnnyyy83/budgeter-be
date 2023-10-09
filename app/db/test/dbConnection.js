import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Table
 */
const createUserTable = () => {
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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createExpenseTypeTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS expense_types
    (id INTEGER PRIMARY KEY,
    type VARCHAR(100) NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createIncomeTypeTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS income_types
    (id INTEGER PRIMARY KEY,
    type VARCHAR(100) NOT NULL)`;

  pool
    .query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createExpenseTable = () => {
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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createIncomeTable = () => {
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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropUserTable = () => {
  const dropQuery = 'DROP TABLE IF EXISTS users';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropExpenseTypeTable = () => {
  const dropQuery = 'DROP TABLE IF EXISTS expense_type';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropIncomeTypeTable = () => {
  const dropQuery = 'DROP TABLE IF EXISTS income_type';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropExpenseTable = () => {
  const dropQuery = 'DROP TABLE IF EXISTS expenses';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropIncomeTable = () => {
  const dropQuery = 'DROP TABLE IF EXISTS incomes';
  pool
    .query(dropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createExpenseTypeTable();
  createIncomeTypeTable();
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
