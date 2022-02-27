const { sequelize } = require('../../../../models');
const { getStartDate, getEndDate } = require('../utils/getDates');

const DEFAULT_LIMIT = 2;

const getLimit = ({ limit }) => limit || DEFAULT_LIMIT;

const getRawQuery = (startDate, endDate, limit) => (
  `SELECT
    profile.id AS id,
    profile.firstName || ' ' || profile.lastName AS fullName,
    SUM(job.price) AS paid
  FROM Jobs AS job
    JOIN Contracts AS contract
      ON contract.id = job.ContractId
    JOIN Profiles AS profile
      ON contract.ClientId = profile.id
  WHERE job.paid IS NOT NULL
    AND job.paymentDate BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY fullName
  ORDER BY paid DESC
  LIMIT ${limit};
  )`
);

const getBestClientList = (query) => sequelize.query(query);

const foundRows = (results) => results.length > 0;

const checkResults = (results) => (
  foundRows(results) ? results : {}
);

const sendResponse = (res, bestClientsList) => res.status(200).json(bestClientsList);

/**
 * Get the profession that earned the most.
  * @param {object} req
  * @param {object} req.query - Url's query params
  * @param {string} req.query.start - Range period start date
  * @param {string} req.query.end - Range period end date
  * @param {number} req.query.limit
  * @param {object} res
  * @param {function} next
  */
const getBestClients = async (req, res, next) => {
  try {
    const startDate = getStartDate(req.query);
    const endDate = getEndDate(req.query);
    const limit = getLimit(req.query);
    const query = getRawQuery(startDate, endDate, limit);

    const [results] = await getBestClientList(query);
    const bestClientsList = checkResults(results);

    sendResponse(res, bestClientsList);
  } catch (error) {
    next(error);
  }
};

module.exports = getBestClients;
