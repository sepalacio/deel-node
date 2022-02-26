/**
 * Custom errors for Jobs
 */
const errors = new Map([
  ['NotActiveJobsFound', {
    name: 'NotActiveJobsFound',
    message: 'There are not active jobs for this user',
    status: 404,
  }],
]);

module.exports = (name) => errors.get(name);
