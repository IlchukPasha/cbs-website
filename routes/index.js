const homeRouter = require('./home');
const usersRouter = require('./api/admin/users');
const eventsRouter = require('./api/admin/events');
const sermonsRouter = require('./api/admin/sermons');
const authRouter = require('./api/admin/auth');
const ErrorHandler = require('./../core/ErrorHandler');
const { authenticated } = require('./../middlewares');

module.exports = app => {
  app.use(homeRouter);

  // global middleware
  app.use(ErrorHandler);
  // Admin route
  app.use(authRouter);
  // global middleware
  app.use(authenticated);

  // Admin routes
  app.use(usersRouter);
  app.use(eventsRouter);
  app.use(sermonsRouter);
};