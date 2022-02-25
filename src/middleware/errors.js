/**
 * Custom errors for Middleware
 */
const errors = new Map([
  ['ProfileNotFound', {
    name: 'ProfileNotFound',
    message: 'Profile not found',
    status: 404,
  }],
]);

module.exports = (name) => errors.get(name);
