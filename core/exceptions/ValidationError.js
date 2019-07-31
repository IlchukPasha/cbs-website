module.exports = function ValidationError(message, validationMessages, statusCode = 400) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.code = statusCode;
  this.validationMessages = validationMessages;
};

require('util').inherits(module.exports, Error);
