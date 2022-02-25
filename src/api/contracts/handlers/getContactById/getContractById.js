const { Op } = require('sequelize');

const { throwCustomError } = require('../../../../utils/errorTools');
const contractsErrors = require('../../errors');

const contractNotFoundError = contractsErrors('ContractNotFound');

const getContractModel = (req) => req.app.get('models').Contract;

const findContract = ({ params, profile }, Contract) => Contract.findOne({
  where: {
    id: params.id,
    [Op.or]: [
      { ContractorId: profile.id },
      { ClientId: profile.id },
    ],
  },
});

const checkIfContractExists = (result) => (
  !result ? throwCustomError(contractNotFoundError) : result
);

const sendResponse = (res, contract) => res.status(200).json(contract);

const getContractById = async (req, res, next) => {
  try {
    const Contract = getContractModel(req);
    const result = await findContract(req, Contract);
    const contract = checkIfContractExists(result);

    sendResponse(res, contract);
  } catch (error) {
    next(error);
  }
};

module.exports = getContractById;
