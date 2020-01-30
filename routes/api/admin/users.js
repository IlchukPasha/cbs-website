const Router = require('koa-router');

const validate = require('./../../../core/Validator');
const { User } = require('./../../../models');
const { authenticated } = require('./../../../middlewares');

const router = new Router({ prefix: '/api/admin/users' });

const handler = {
  async list(ctx) {
    await validate(ctx.query, {
      page: 'numeric|min:1',
      perPage: 'numeric|min:5'
    });
    const { page = 1, perPage = 5 } = ctx.query;
    ctx.body = await User.query().page(page - 1, perPage);
  },
  async byId(ctx) {
    await validate(ctx.params, {
      userId: 'required|numeric|min:1'
    });
    const { userId } = ctx.params;
    ctx.body = await User.query().findById(userId);
  },
  async create(ctx) {
    await validate(ctx.request.body, {
      email: 'required|email',
      password: 'required|string|min:6',
      firstName: 'required|string|min:3|max:50',
      lastName: 'required|string|min:3|max:50'
    });

    const {
      email, password, firstName, lastName
    } = ctx.request.body;

    const user = await User
      .query()
      .insert({ email, password, firstName, lastName });

    ctx.status = 201;
    ctx.body = user;
  },
  async update(ctx) {
    await validate(ctx.request.body, {
      email: 'required|email',
      password: 'required|string|min:6',
      firstName: 'required|string|min:3|max:50',
      lastName: 'required|string|min:3|max:50'
    });
    await validate(ctx.params, {
      userId: 'required|numeric|min:1'
    });

    const {
      email, password, firstName, lastName
    } = ctx.request.body;
    const { userId } = ctx.params;

    ctx.body = await User
      .query()
      .patchAndFetchById(userId, { email, password, firstName, lastName });
  }
};

router.use(authenticated);
router.get('/', handler.list);
router.get('/:userId', handler.byId);
router.post('/', handler.create);
router.put('/:userId', handler.update);

module.exports = router.routes();