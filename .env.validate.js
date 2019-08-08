require('dotenv').config();

const Validator = require('validatorjs');
const { each } = require('lodash');

// process.env validator
const result = new Validator(process.env, {
  NODE_ENV: 'required|in:development,testing,production',
  DB_QUERIES_LOG: 'required|boolean',
  PORT: 'required|numeric',
  JWT_SECRET: 'required|string',
  DB_HOST: 'required|string',
  DB_USER: 'required|string',
  DB_PASS: 'required|string',
  DB_NAME: 'required|string',
  DB_PORT: 'required|numeric'
});

if (result.fails()) {
  console.error('ENV wrong configured! Fix this errors!');
  each(result.errors.errors, items => {
    each(items, item => {
      console.error(item);
    });
  });
  process.exit(1);
}