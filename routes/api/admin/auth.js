const Router = require('koa-router');
const validate = require('./../../../core/Validator');
const { SingleError } = require('./../../../core/exceptions');
const { User } = require('./../../../models');
const { JwtManager } = require('./../../../services');
const { app: { roles } } = require('./../../../core/config');

const router = new Router({ prefix: '/api/admin' });

const handler = {
  plainLogin: async ctx => {
    await validate(ctx.request.body, {
      email: 'required|email',
      password: 'required|string'
    });
    const { email, password } = ctx.request.body;

    const user = await User.query().first().where({ email: email.toLowerCase(), role: roles.admin });
    if (!user) {
      throw new SingleError('No user with this email');
    }
    if (!(await user.verifyPassword(password))) {
      throw new SingleError('Password is invalid');
    }

    ctx.body = { token: `Bearer ${await JwtManager.createToken(user)}` };
  }
};

router.post('/login', handler.plainLogin);

module.exports = router.routes();
