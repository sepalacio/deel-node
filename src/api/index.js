const express = require('express');

const admin = require('./admin');
const balances = require('./balances');
const contracts = require('./contracts');
const jobs = require('./jobs');

const routes = express.Router();

routes.use(admin);
routes.use(balances);
routes.use(contracts);
routes.use(jobs);

module.exports = routes;
