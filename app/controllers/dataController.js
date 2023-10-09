/* eslint-disable camelcase */
import { successMessage, status } from '../helpers/status';
import listModels from '../helpers/carbrandmodels.json';
import listCities from '../helpers/countrycities.min.json';

const getAllCarBrandModels = async (req, res) => {
  successMessage.data = listModels;
  return res.status(status.success).send(successMessage);
};

const getAllCountryCities = async (req, res) => {
  successMessage.data = listCities;
  return res.status(status.success).send(successMessage);
};

export { getAllCarBrandModels, getAllCountryCities };
