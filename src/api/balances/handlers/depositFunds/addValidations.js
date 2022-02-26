const addValidations = (req, _, next) => {
  req.checkBody({
    depositAmount: {
      notEmpty: true,
      errorMessage: 'The depositAmount is required',
    },
  });

  next();
};

module.exports = addValidations;
