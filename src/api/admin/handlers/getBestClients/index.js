const validateRequest = require('../../../../middleware/validateRequest');
const addValidations = require('./addValidations');
const getBestClients = require('./getBestClients');

const checkBestClientsParams = [
  addValidations,
  validateRequest,
];

module.exports = {
  checkBestClientsParams,
  getBestClients,
};
