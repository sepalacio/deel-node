const { throwCustomError } = require('../../../../utils/errorTools');
const jobsErrors = require('../../errors');
const findJob = require('./findJob');
const updateBalances = require('./updateBalances');

const NoSufficientFundsError = jobsErrors('NoSufficientFunds');

const getModels = (req) => req.app.get('models');

const getContractor = (ContractorId, { Profile }) => Profile.findOne({
  where: { id: ContractorId },
});

const clientHasEnoughFunds = (clientBalance, jobPrice) => clientBalance >= jobPrice;

const validateClientBalance = (profile, job) => (
  clientHasEnoughFunds(profile.balance, job.price)
    ? profile.balance
    : throwCustomError(NoSufficientFundsError)
);

const sendResponse = (res, { id, price }) => res.status(200).json({
  message: `The Job with ID: ${id}, Billed Price: ${price}; was paid successfully`,
});

/**
  * @param {object} req
  * @param {object} req.profile
  * @param {object} req.params
  * @param {object} res
  * @param {function} next
  */
const payJob = async (req, res, next) => {
  try {
    const models = getModels(req);
    const job = await findJob(req, models);
    const contractor = await getContractor(job.Contract.ContractorId, models);

    validateClientBalance(req.profile, job);
    await updateBalances({
      client: req.profile,
      contractor,
      job,
      models,
    });

    sendResponse(res, job);
  } catch (error) {
    next(error);
  }
};

module.exports = payJob;
