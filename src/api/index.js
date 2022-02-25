const express = require('express');

const contracts = require('./contracts');

const routes = express.Router();

routes.use(contracts);

module.exports = routes;
