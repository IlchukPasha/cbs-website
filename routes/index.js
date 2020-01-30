const homeRouter = require('./home');
const usersRouter = require('./api/admin/users');
const eventsRouter = require('./api/admin/events');
const sermonsRouter = require('./api/admin/sermons');
const authRouter = require('./api/admin/auth');
const ErrorHandler = require('./../core/ErrorHandler');

module.exports = app => {
  app.use(homeRouter);

  // global middleware
  app.use(ErrorHandler);

  // Admin routes
  app.use(authRouter);
  app.use(usersRouter);
  app.use(eventsRouter);
  app.use(sermonsRouter);
};