const homeRouter = require('./home');
const usersRouter = require('./api/admin/users');
const ErrorHandler = require('./../core/ErrorHandler');
const { authenticated } = require('./../middlewares');

module.exports = app => {
  app.use(homeRouter);

  // global middlewares
  app.use(ErrorHandler);
  app.use(authenticated);

  // Admin routes
  app.use(usersRouter);
};