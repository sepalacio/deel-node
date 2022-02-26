const express = require('express');

const getProfile = require('../../middleware/getProfile');
const getActiveJobs = require('./handlers/getActiveJobs');

const jobs = express.Router();

jobs
  .get('/jobs/unpaid', getProfile, getActiveJobs);

module.exports = jobs;
