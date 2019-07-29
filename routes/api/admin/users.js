const Router = require('koa-router');

const { User } = require('./../../../models');

const router = new Router({ prefix: '/api/admin/users' });

const handler = {
  async listUsers(ctx) {
    const users = await User.query();
    ctx.body = { users };
  }
};

router.get('/', handler.listUsers);

module.exports = router.routes();