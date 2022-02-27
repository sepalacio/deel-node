const test = require('ava');
const sinon = require('sinon');
const { Op } = require('sequelize');

const {
  findContract,
  checkIfContractExists,
  sendResponse,
} = require('../handlers/getContactById').test;

const contractMock = {
  id: 1,
  terms: 'bla bla bla',
  status: 'terminated',
  createdAt: '2022-02-25T04:11:11.264Z',
  updatedAt: '2022-02-25T04:11:11.264Z',
  ContractorId: 5,
  ClientId: 1,
};

const resFactory = (sandbox) => {
  const res = {
    status() { return this; },
    json: () => {},
  };

  sandbox.spy(res, 'status');
  sandbox.spy(res, 'json');

  return res;
};

test('#findContract() - Success retrieve a contract data', async (t) => {
  const findOneStub = sinon.stub().returns(contractMock);
  const Contract = {
    findOne: findOneStub,
  };
  const req = {
    params: {
      id: 7,
    },
    profile: {
      id: 2,
    },
  };

  const actual = await findContract(req, Contract);

  const actualOptions = findOneStub.getCall(0).args[0];
  const expectedOptions = {
    where: {
      id: 7,
      [Op.or]: [
        { ContractorId: 2 },
        { ClientId: 2 },
      ],
    },
  };
  t.deepEqual(actualOptions, expectedOptions, 'Should call findContract with expected options');
  t.deepEqual(actual, contractMock, 'Should return a contract object');
});

test('#checkIfContractExists() - Success retrieved contract in the results', (t) => {
  const result = { ...contractMock };

  const actual = checkIfContractExists(result);

  const expected = { ...contractMock };
  t.deepEqual(actual, expected, 'Should return a contract when there are results returned');
});

test('#checkIfContractExists() - No results in the response', (t) => {
  const result = null;

  const { name, message, status } = t.throws(() => { checkIfContractExists(result); });

  const error = { name, message, status };
  const expectedError = {
    name: 'ContractNotFound',
    message: 'Contract not found',
    status: 404,
  };
  t.deepEqual(error, expectedError, 'Should throw a ContractNotFound Error');
});

test('#sendResponse() - Send a response json', (t) => {
  const contract = { ...contractMock };
  const res = resFactory(sinon);

  sendResponse(res, contract);

  t.true(res.status.calledOnceWithExactly(200), 'Should set 200 status to the response');
  t.true(res.json.calledOnceWithExactly(contract), 'Should call json with the contract data');
});
