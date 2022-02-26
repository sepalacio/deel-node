const express = require('express');
const expressValidator = require('express-validator');

const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const expressErrorHandler = require('./server/expressErrorHandler');
const api = require('./api');

const app = express();
app.use(bodyParser.json());
app.use(expressValidator());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.get('/', (_, res) => {
  res.status(200).send('Welcome to DL API');
});
app.use('/api/', api);

expressErrorHandler(app);

module.exports = app;
