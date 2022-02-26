const { throwCustomError } = require('../../../../utils/errorTools');
const jobsErrors = require('../../errors');
const updateBalances = require('./updateBalances');

const JobNotFoundError = jobsErrors('JobNotFound');
const NoSufficientFundsError = jobsErrors('NoSufficientFunds');
const IN_PROGRESS_STATUS = 'in_progress';

const getModels = (req) => req.app.get('models');

const findJob = ({ profile, params }, { Job, Contract }) => Job.findOne({
  where: {
    id: params.job_id,
  },
  include: [{
    model: Contract,
    where: {
      status: IN_PROGRESS_STATUS,
      ClientId: profile.id,
    },
  }],
});

const getContractor = (ContractorId, { Profile }) => Profile.findOne({
  where: { id: ContractorId },
});

const checkIfJobExists = (result) => (
  !result ? throwCustomError(JobNotFoundError) : result
);

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
    const result = await findJob(req, models);
    const job = checkIfJobExists(result);
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
