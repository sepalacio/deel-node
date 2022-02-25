const Sequelize = require('sequelize');
const { contractStatus } = require('../utils/constants');

class Contract extends Sequelize.Model {}

const setupContract = (sequelize) => {
  Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...contractStatus),
      },
    },
    {
      sequelize,
      modelName: 'Contract',
    },
  );

  return Contract;
};

module.exports = setupContract;
