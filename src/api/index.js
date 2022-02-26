const express = require('express');

const contracts = require('./contracts');
const jobs = require('./jobs');

const routes = express.Router();

routes.use(contracts);
routes.use(jobs);

module.exports = routes;
