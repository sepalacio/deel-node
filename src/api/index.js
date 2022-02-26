const express = require('express');

const balances = require('./balances');
const contracts = require('./contracts');
const jobs = require('./jobs');

const routes = express.Router();

routes.use(balances);
routes.use(contracts);
routes.use(jobs);

module.exports = routes;
