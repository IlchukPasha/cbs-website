const Router = require('koa-router');

const { Sermon } = require('./../../../models');
const validate = require('./../../../core/Validator');

const router = new Router({ prefix: '/api/admin/sermons' });

const handler = {
  async list(ctx) {
    await validate(ctx.query, {
      page: 'numeric|min:1',
      perPage: 'numeric|min:5'
    });
    const { page = 1, perPage = 5 } = ctx.query;
    ctx.body = await Sermon.query().page(page - 1, perPage);
  },
  async byId(ctx) {
    await validate(ctx.params, {
      sermonId: 'required|numeric|min:1'
    });
    const { sermonId } = ctx.params;
    ctx.body = await Sermon.query().findById(sermonId);
  },
  async create(ctx) {
    await validate(ctx.request.body, {
      title: 'required|string|min:1|max:100',
      subject: 'required|string|min:1|max:100',
      speaker: 'required|string|min:1|max:100',
      text: 'required|string|min:10|max:30000',
      date: 'required|regex:/^\\d{4}-\\d{2}-\\d{2}$/|date'
    });

    const {
      title, subject, speaker, text, date
    } = ctx.request.body;

    const sermon = await Sermon
      .query()
      .insert({ title, subject, speaker, description: text, date });

    ctx.status = 201;
    ctx.body = sermon;
  },
  async update(ctx) {
    await validate(ctx.request.body, {
      title: 'required|string|min:1|max:100',
      subject: 'required|string|min:1|max:100',
      speaker: 'required|string|min:1|max:100',
      text: 'required|string|min:10|max:30000',
      date: 'required|regex:/^\\d{4}-\\d{2}-\\d{2}$/|date'
    });
    await validate(ctx.params, {
      sermonId: 'required|numeric|min:1'
    });

    const {
      title, subject, speaker, text, date
    } = ctx.request.body;
    const { sermonId } = ctx.params;

    ctx.body = await Sermon
      .query()
      .patchAndFetchById(sermonId, { title, subject, speaker, text, date });
  },
  async remove(ctx) {
    await validate(ctx.params, {
      sermonId: 'required|numeric|min:1'
    });
    const { sermonId } = ctx.params;

    await Sermon.query().deleteById(sermonId);

    ctx.status = 204;
    ctx.body = '';
  }
};

router.get('/', handler.list);
router.get('/:sermonId', handler.byId);
router.post('/', handler.create);
router.put('/:sermonId', handler.update);
router.delete('/:sermonId', handler.remove);

module.exports = router.routes();