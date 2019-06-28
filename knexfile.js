require('./.env.validate');
const { database } = require('./core/config');

module.exports = {
  development: database,
  production: database,
  testing: database
};
