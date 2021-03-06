/**
 * Custom errors for Jobs
 */
const errors = new Map([
  ['NotActiveJobsFound', {
    name: 'NotActiveJobsFound',
    message: 'There are not active jobs for this user',
    status: 404,
  }],
  ['JobNotFound', {
    name: 'JobNotFound',
    message: 'The job with provided id does not exist for this user',
    status: 404,
  }],
  ['JobAlreadyPaid', {
    name: 'JobAlreadyPaid',
    message: 'The job with provided id was previously paid',
    status: 422,
  }],
  ['NoSufficientFunds', {
    name: 'NoSufficientFunds',
    message: 'The client balance is insufficient to process the payment',
    status: 422,
  }],
  ['ErrorProcessingTransaction', {
    name: 'ErrorProcessingTransaction',
    message: 'An unexpected error occurred when processing the payment',
    status: 422,
  }],
]);

module.exports = (name) => errors.get(name);
