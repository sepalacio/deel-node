const getFormattedDate = (currentDate) => {
  const date = new Date(currentDate).toISOString().slice(0, 10);
  const time = new Date(currentDate).toISOString().slice(11, 16);

  return `${date} ${time}`;
};

const getDefaultStartDate = () => {
  const currentDate = new Date().setHours('00', '00', '00');
  return getFormattedDate(currentDate);
};

const getStartDate = ({ start }) => start || getDefaultStartDate();

const getDefaultEndDate = () => {
  const currentDate = new Date().setHours('23', '59', '59');
  return getFormattedDate(currentDate);
};

const getEndDate = ({ end }) => end || getDefaultEndDate();

module.exports = {
  getStartDate,
  getEndDate,
};
