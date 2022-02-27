const validateRequest = require('../../../../middleware/validateRequest');
const addValidations = require('./addValidations');
const getBestProfession = require('./getBestProfession');

const checkBestProfessionParams = [
  addValidations,
  validateRequest,
];

module.exports = {
  checkBestProfessionParams,
  getBestProfession,
};
