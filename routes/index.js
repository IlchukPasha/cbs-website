const homeRouter = require('./home');
const usersRouter = require('./api/admin/users');

module.exports = app => {
  app.use(homeRouter);

  // Admin routes
  app.use(usersRouter);
};