const { Op, Sequelize } = require('sequelize');

const IN_PROGRESS_STATUS = 'in_progress';

/**
 * Get total sums of active Jobs for a Client
  * @param {object} client
  * @param {object} models
  * @param {object} models.Job
  * @param {object} models.Contract
  */
const getActiveJobsSum = (client, { Job, Contract }) => Job.findOne({
  attributes: [
    [Sequelize.fn('sum', Sequelize.col('price')), 'totalJobsSum'],
  ],
  where: {
    paid: {
      [Op.is]: null,
    },
  },
  include: [{
    model: Contract,
    where: {
      status: IN_PROGRESS_STATUS,
      ClientId: client.id,
    },
  }],
});

module.exports = getActiveJobsSum;
