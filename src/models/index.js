const Sequelize = require('sequelize');
const { sequelizeConfig } = require('../config/db');

const setupProfile = require('./Profile');
const setupContract = require('./Contract');
const setupJob = require('./Job');

const sequelize = new Sequelize(sequelizeConfig);
const Profile = setupProfile(sequelize);
const Contract = setupContract(sequelize);
const Job = setupJob(sequelize);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
