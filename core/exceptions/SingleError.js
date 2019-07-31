module.exports = function SingleError(message, statusCode = 400) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.code = statusCode;
};

require('util').inherits(module.exports, Error);
