const Validator = require('validatorjs');
const { ValidationError } = require('./exceptions');

module.exports = (data, rules, messages = []) => new Promise((resolve, reject) => {
  const validator = new Validator(data, rules, messages);
  if (validator.fails()) {
    reject(new ValidationError('Validation Failed', validator.errors));
  }
  if (validator.passes()) {
    resolve(undefined);
  }
});
