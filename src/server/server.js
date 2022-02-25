const chalk = require('chalk');

const { name, version } = require('../../package.json');
const { port } = require('../config/server');
const app = require('../app');
const addAppListeners = require('./addAppListeners');
const { handleFatalError } = require('../utils/logger');

const { NODE_ENV } = process.env;

const initServer = () => {
  try {
    addAppListeners();
    app.listen(port, () => {
      console.info(chalk.green(`
        ${name} ${version}
        Server running in http://localhost:${port}/
        Running with NodeJS ${process.version}
        Environment: ${NODE_ENV}`));
    });
  } catch (error) {
    handleFatalError();
  }
};

initServer();
