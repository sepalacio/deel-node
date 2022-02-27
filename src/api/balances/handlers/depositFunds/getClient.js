const { throwCustomError } = require('../../../../utils/errorTools');
const balanceErrors = require('../../errors');

const ClientNotFoundError = balanceErrors('ClientNotFound');

const findClient = (ClientId, { Profile }) => Profile.findOne({
  where: {
    id: ClientId,
    type: 'client',
  },
});

const checkIfClientExists = (result) => (
  !result ? throwCustomError(ClientNotFoundError) : result
);

/**
 * GET Client's data
  * @param {number} userId
  * @param {object} models
  * @returns {object} Client's Profile data
  */
const getClient = async (userId, models) => {
  const result = await findClient(userId, models);
  const client = checkIfClientExists(result);

  return client;
};

module.exports = getClient;
