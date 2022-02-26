/**
 * Custom errors for Balances
 */
const errors = new Map([
  ['ClientNotFound', {
    name: 'ClientNotFound',
    message: 'There are not clients with the provided ID',
    status: 404,
  }],
  ['InvalidDepositAmount', {
    name: 'InvalidDepositAmount',
    message: 'The maximum allowed amount to deposit is:',
    status: 422,
  }],
]);

module.exports = (name) => errors.get(name);
