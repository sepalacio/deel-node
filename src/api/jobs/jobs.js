const express = require('express');

const getProfile = require('../../middleware/getProfile');
const getActiveJobs = require('./handlers/getActiveJobs');
const payJob = require('./handlers/payJob');

const jobs = express.Router();

jobs
  .get('/jobs/unpaid', getProfile, getActiveJobs)

  .post('/jobs/:job_id/pay', getProfile, payJob);

module.exports = jobs;
