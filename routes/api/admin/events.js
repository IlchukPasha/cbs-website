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
    await validate(ctx.request.body, {
      title: 'required|string|min:1|max:100',
      address: 'required|string|min:1|max:255',
      shortDescription: 'required|string|min:1|max:150',
      description: 'required|string|min:10|max:5000',
      date: 'required|regex:/^\\d{4}-\\d{2}-\\d{2}$/|date',
      startedAt: 'required|regex:/^\\d{2}:\\d{2}:\\d{2}$/|date',
      finishedAt: 'required|regex:/^\\d{2}:\\d{2}:\\d{2}$/|date'
    });

    const {
      title, address, shortDescription, description, date, startedAt, finishedAt
    } = ctx.request.body;

    const sermon = await Event
      .query()
      .insert({ title, address, shortDescription, description, date, startedAt, finishedAt });

    ctx.status = 201;
    ctx.body = sermon;
  },
  async update(ctx) {
    await validate(ctx.request.body, {
      title: 'required|string|min:1|max:100',
      address: 'required|string|min:1|max:255',
      shortDescription: 'required|string|min:1|max:150',
      description: 'required|string|min:10|max:5000',
      date: 'required|regex:/^\\d{4}-\\d{2}-\\d{2}$/|date',
      startedAt: 'required|regex:/^\\d{2}:\\d{2}:\\d{2}$/|date',
      finishedAt: 'required|regex:/^\\d{2}:\\d{2}:\\d{2}$/|date'
    });
    await validate(ctx.params, {
      eventId: 'required|numeric|min:1'
    });

    const {
      title, address, shortDescription, description, date, startedAt, finishedAt
    } = ctx.request.body;
    const { eventId } = ctx.params;

    ctx.body = await Event
      .query()
      .patchAndFetchById(eventId, { title, address, shortDescription, description, date, startedAt, finishedAt });
  },
  async remove(ctx) {
    await validate(ctx.params, {
      eventId: 'required|numeric|min:1'
    });
    const { eventId } = ctx.params;

    await Event.query().deleteById(eventId);

    ctx.status = 204;
    ctx.body = '';
  }
};

router.get('/', handler.list);
router.get('/:eventId', handler.byId);
router.post('/', handler.create);
router.put('/:eventId', handler.update);
router.delete('/:eventId', handler.remove);

module.exports = router.routes();