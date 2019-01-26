require('dotenv').config();

const Validator = require('validatorjs');
const { each } = require('lodash');
const logger = require('./libs/Logger')(module);

// process.env validator
const result = new Validator(process.env, {
  NODE_ENV: 'required|in:development,production',
  LOG_ENABLED: 'required',
  PORT: 'required|numeric',
});

if (result.fails()) {
  logger.error('ENV wrong configured! Fix this errors!');
  each(result.errors.errors, items => {
    each(items, item => {
      logger.error(item);
    });
  });
  process.exit(1);
}