const getClient = require('./getClient');
const getActiveJobsSum = require('./getActiveJobsSum');
const validateDeposit = require('./validateDeposit');

const getModels = (req) => req.app.get('models');

const updateClientBalance = ({ params, body }, { Profile }) => Profile.increment(
  { balance: body.depositAmount },
  { where: { id: params.userId } },
);

const sendResponse = (res) => res.status(200).json({
  message: 'The funds were loaded into the client`s Balance.',
});

/**
 * Deposit money into a Client's balance
  * @param {object} req
  * @param {object} req.profile
  * @param {object} req.params
  * @param {object} req.params.userId - Customer id
  * @param {object} req.body.depositAmount
  * @param {object} res
  * @param {function} next
  */
const depositFunds = async (req, res, next) => {
  try {
    const models = getModels(req);
    const client = await getClient(req.params.userId, models);
    const { dataValues } = await getActiveJobsSum(client, models);
    validateDeposit(dataValues, req.body.depositAmount);
    await updateClientBalance(req, models);

    sendResponse(res);
  } catch (error) {
    next(error);
  }
};

module.exports = depositFunds;
