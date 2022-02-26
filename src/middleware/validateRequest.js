const { validationError } = require('../utils/errorTools');

const handleValidationError = (getError, next) => (error) => (
  error.isEmpty()
    ? next()
    : next(getError(error.array()))
);

const validateRequest = (req, _, next) => req.getValidationResult()
  .then(handleValidationError(validationError, next));

module.exports = validateRequest;
