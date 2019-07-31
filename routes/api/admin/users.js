const Router = require('koa-router');

const { User } = require('./../../../models');
const { validate } = require('./../../../services');

const router = new Router({ prefix: '/api/admin/users' });

const handler = {
  async listUsers(ctx) {
    await validate(ctx.request.body, {
      id: 'required'
    });
    const users = await User.query();
    ctx.body = { users };
  }
};

router.get('/', handler.listUsers);

module.exports = router.routes();