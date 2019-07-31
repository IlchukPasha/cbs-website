const ErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const { code: statusCode, message, name: errorType } = error;
    switch (errorType) {
      case 'SingleError':
        ctx.body = {
          error: {
            errorType,
            message,
            statusCode
          }
        };
        ctx.status = statusCode;
        break;
      case 'ValidationError':
        ctx.body = {
          error: {
            errorType,
            message,
            statusCode,
            validationMessages: error.validationMessages.errors
            // errors: err.validation_errors.errors
          }
        };
        ctx.status = statusCode;
        break;
      default:
        /* eslint-disable */
        console.log('line:error -> ', error);
        /* eslint-enable */
        ctx.body = {
          error: {
            errorType,
            message: 'Unhandled error',
            statusCode
          }
        };
        ctx.status = 500;
        break;
    }
  }
};

module.exports = ErrorHandler;

