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

  },
  async update(ctx) {

  },
  async remove(ctx) {

  }
};

router.get('/', handler.list);
router.get('/:sermonId', handler.byId);
router.post('/', handler.create);
router.put('/:sermonId', handler.update);
router.delete('/:sermonId', handler.remove);

module.exports = router.routes();