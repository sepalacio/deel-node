const express = require('express');

const { depositFunds, depositMiddleware } = require('./handlers/depositFunds');

const balances = express.Router();

balances
  .post('/balances/deposit/:userId', depositMiddleware, depositFunds);

module.exports = balances;
