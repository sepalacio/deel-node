const Sequelize = require('sequelize');
const { profileTypes } = require('../utils/constants');

class Profile extends Sequelize.Model {}

const setupProfile = (sequelize) => {
  Profile.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM(...profileTypes),
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};

module.exports = setupProfile;
