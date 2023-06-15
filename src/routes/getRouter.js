const { Router } = require('express');
const getRouter = Router();
const {
  getDogsHandler,
  getDogsByIdHandler,
  getTemperamentsHandler,
} = require('../handlers/getDogsHandler');

getRouter.get('/dogs', getDogsHandler);
getRouter.get('/dogs/:idRaza', getDogsByIdHandler);
getRouter.get('/temperaments', getTemperamentsHandler);

module.exports = getRouter;
