const addValidations = require('./addValidations');
const depositFunds = require('./depositFunds');
const validateRequest = require('../../../../middleware/validateRequest');
const getProfile = require('../../../../middleware/getProfile');

const depositMiddleware = [
  getProfile,
  addValidations,
  validateRequest,
];

module.exports = {
  depositMiddleware,
  depositFunds,
};
