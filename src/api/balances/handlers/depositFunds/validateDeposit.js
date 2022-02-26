const { throwCustomError } = require('../../../../utils/errorTools');
const balanceErrors = require('../../errors');

const InvalidDepositAmountError = balanceErrors('InvalidDepositAmount');
const maximumDepositPercentage = 0.25;

const getMaximumAllowedAmount = (totalJobsSum) => totalJobsSum * maximumDepositPercentage;

const exceedsAllowedAmount = (depositAmount, maximumAllowedAmount) => (
  depositAmount > maximumAllowedAmount
);

const geErrorMessage = ({ message }, maximumAllowedAmount) => `${message} $${maximumAllowedAmount}.`;

/**
 * Checks if the Client is able to receive the funds to deposit
  * @param {object} dataValues
  * @param {number} dataValues.totalJobsSum
  * @param {number} depositAmount
  */
const validateDeposit = ({ totalJobsSum }, depositAmount) => {
  const maximumAllowedAmount = getMaximumAllowedAmount(totalJobsSum);

  if (exceedsAllowedAmount(depositAmount, maximumAllowedAmount)) {
    InvalidDepositAmountError.message = geErrorMessage(
      InvalidDepositAmountError,
      maximumAllowedAmount,
    );

    throwCustomError(InvalidDepositAmountError);
  }
};

module.exports = validateDeposit;
