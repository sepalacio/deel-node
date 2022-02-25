/**
 * Custom errors for Contracts
 */
const errors = new Map([
  ['ContractNotFound', {
    name: 'ContractNotFound',
    message: 'Contract not found',
    status: 404,
  }],
  ['NotContractsFound', {
    name: 'NotContractsFound',
    message: 'The profile does not have active contracts',
    status: 404,
  }],
]);

module.exports = (name) => errors.get(name);
