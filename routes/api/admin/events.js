const Router = require('koa-router');

const { Event } = require('./../../../models');
const validate = require('./../../../core/Validator');

const router = new Router({ prefix: '/api/admin/events' });

const handler = {
  async list(ctx) {
    await validate(ctx.query, {
      page: 'numeric|min:1',
      perPage: 'numeric|min:5'
    });
    const { page = 1, perPage = 5 } = ctx.query;
    ctx.body = await Event.query().page(page - 1, perPage);
  },
  async byId(ctx) {
    await validate(ctx.params, {
      eventId: 'required|numeric|min:1'
    });
    const { eventId } = ctx.params;
    ctx.body = await Event.query().findById(eventId);
  },
  async create(ctx) {

  },
  async update(ctx) {

  },
  async remove(ctx) {

  }
};

router.get('/', handler.list);
router.get('/:eventId', handler.byId);
router.post('/', handler.create);
router.put('/:eventId', handler.update);
router.delete('/:eventId', handler.remove);

module.exports = router.routes();