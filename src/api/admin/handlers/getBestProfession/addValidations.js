const addValidations = (req, _, next) => {
  req.checkQuery({
    start: {
      optional: {
        options: { checkFalsy: false },
      },
      isDate: {
        options: {
          format: 'YYYY-MM-DD HH:HH',
          strictMode: true,
        },
        errorMessage: 'The start param must be a valid date: {YYYY-MM-DD HH:HH}',
      },
    },
    end: {
      optional: {
        options: { checkFalsy: false },
      },
      isDate: {
        options: {
          format: 'YYYY-MM-DD HH:HH',
          strictMode: true,
        },
        errorMessage: 'The end param must be a valid date: {YYYY-MM-DD HH:HH}',
      },
    },
  });

  next();
};

module.exports = addValidations;
