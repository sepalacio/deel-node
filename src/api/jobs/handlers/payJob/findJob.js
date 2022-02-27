const { throwCustomError } = require('../../../../utils/errorTools');
const jobsErrors = require('../../errors');

const JobNotFoundError = jobsErrors('JobNotFound');
const JobAlreadyPaidError = jobsErrors('JobAlreadyPaid');
const IN_PROGRESS_STATUS = 'in_progress';

const checkIfJobExists = (result) => (
  !result ? throwCustomError(JobNotFoundError) : result
);

const checkIfJobWasPaid = (job) => (
  job.paid ? throwCustomError(JobAlreadyPaidError) : job
);

const getJob = ({ profile, params }, { Job, Contract }) => Job.findOne({
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

const findJob = async (req, models) => {
  const result = await getJob(req, models);
  const job = checkIfJobExists(result);
  checkIfJobWasPaid(job);

  return job;
};

module.exports = findJob;
