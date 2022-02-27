const { sequelize } = require('../../../../models');
const { getStartDate, getEndDate } = require('../utils/getDates');

const getRawQuery = (startDate, endDate) => (
  `SELECT
    profession,
    MAX(total) AS total
  FROM (
    SELECT
      profile.profession AS profession,
      SUM(job.price) AS total
    FROM Jobs AS job
      JOIN Contracts AS contract
        ON contract.id = job.ContractId
      JOIN Profiles AS profile
        ON contract.ContractorId = profile.id
    WHERE job.paid IS NOT NULL
    AND job.paymentDate BETWEEN '${startDate}' AND '${endDate}'
    GROUP BY profile.profession
  )`
);

const getSummaryByProfession = (query) => sequelize.query(query);

const checkResults = (results) => (
  results[0].total ? results[0] : {}
);

const sendResponse = (res, summaryByProfession) => res.status(200).json(summaryByProfession);

/**
 * Get the profession that earned the most.
  * @param {object} req
  * @param {object} req.query - Url's query params
  * @param {string} req.query.start - Range period start date
  * @param {string} req.query.end - Range period end date
  * @param {object} res
  * @param {function} next
  */
const getBestProfession = async (req, res, next) => {
  try {
    const startDate = getStartDate(req.query);
    const endDate = getEndDate(req.query);
    const query = getRawQuery(startDate, endDate);
    const [results] = await getSummaryByProfession(query);
    const summaryByProfession = checkResults(results);

    sendResponse(res, summaryByProfession);
  } catch (error) {
    next(error);
  }
};

module.exports = getBestProfession;
