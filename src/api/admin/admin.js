const express = require('express');

const { getBestProfession, checkBestProfessionParams } = require('./handlers/getBestProfession');
const { getBestClients, checkBestClientsParams } = require('./handlers/getBestClients');

const admin = express.Router();

admin
  .get('/admin/best-profession', checkBestProfessionParams, getBestProfession)
  .get('/admin/best-clients', checkBestClientsParams, getBestClients);

module.exports = admin;
