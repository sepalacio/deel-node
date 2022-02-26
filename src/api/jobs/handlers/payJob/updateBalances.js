const updateProfileBalance = (profileId, newBalance, { Profile }) => Profile.update(
  {
    balance: newBalance,
  },
  {
    where: { id: profileId },
  },
);

const updateJobStatus = (job, { Job }) => Job.update(
  {
    paid: 1,
    paymentDate: new Date(),
  },
  {
    where: { id: job.id },
  },
);

const getNewClientBalance = (client, job) => client.balance - job.price;

const getNewContractorBalance = (contractor, job) => contractor.balance + job.price;

/**
  * @param {object} options
  * @param {object} options.client
  * @param {object} options.contractor
  * @param {object} options.job
  * @param {object} options.models
  */
const updateBalances = async ({
  client, contractor, job, models,
}) => {
  const newClientBalance = getNewClientBalance(client, job);
  const newContractorBalance = getNewContractorBalance(contractor, job);

  await Promise.all([
    updateProfileBalance(client.id, newClientBalance, models),
    updateProfileBalance(contractor.id, newContractorBalance, models),
    updateJobStatus(job, models),
  ]);
};

module.exports = updateBalances;
