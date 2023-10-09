import express from 'express';

import { createIncome, getMyIncomes, getAllIncomes, deleteIncome, updateIncome } from '../controllers/incomeController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

router.post('/incomes', verifyAuth, createIncome);
router.get('/incomes', verifyAuth, getMyIncomes);
router.get('/incomes/all', verifyAuth, getAllIncomes);
router.delete('/incomes/:incomeId', verifyAuth, deleteIncome);
router.put('/incomes/:incomeId', verifyAuth, updateIncome);

export default router;
