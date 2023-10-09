import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import usersRoute from './app/routes/usersRoute';
import expenseRoute from './app/routes/expenseRoute';
import incomeRoute from './app/routes/incomeRoute';
import dataRoute from './app/routes/dataRoute';

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
};

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors(corsOptions));
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1', expenseRoute);
app.use('/api/v1', incomeRoute);
app.use('/api/v1', dataRoute);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;
