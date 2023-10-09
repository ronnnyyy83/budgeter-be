import express from 'express';

import { createExpense, getAllExpenses, deleteExpense, updateExpense } from '../controllers/expenseController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

router.post('/expenses', verifyAuth, createExpense);
router.get('/expenses', verifyAuth, getAllExpenses);
router.delete('/expenses/:expenseId', verifyAuth, deleteExpense);
router.put('/expenses/:expenseId', verifyAuth, updateExpense);

export default router;
