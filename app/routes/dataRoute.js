import express from 'express';
import { getAllCarBrandModels, getAllCountryCities } from '../controllers/dataController';

const router = express.Router();

router.get('/carModels', getAllCarBrandModels);
router.get('/countryCities', getAllCountryCities);

export default router;
