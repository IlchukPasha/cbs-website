const homeRouter = require('./home');
const usersRouter = require('./api/admin/users');
const ErrorHandler = require('./../core/ErrorHandler');

module.exports = app => {
  app.use(homeRouter);

  // global middlewares
  app.use(ErrorHandler);

  // Admin routes
  app.use(usersRouter);
};