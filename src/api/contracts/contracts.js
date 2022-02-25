const express = require('express');

const getProfile = require('../../middleware/getProfile');
const getContractsByProfile = require('./handlers/getContractsByProfile');
const getContractById = require('./handlers/getContactById');

const contracts = express.Router();

contracts
  .get('/contracts', getProfile, getContractsByProfile)
  .get('/contracts/:id', getProfile, getContractById);

module.exports = contracts;
