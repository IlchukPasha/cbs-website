const Router = require('koa-router');

const router = new Router({ prefix: '/' });
const handler = {
  async homePage(ctx) {
    await ctx.render('index', {});
  }
};
router.get('/', handler.homePage);
module.exports = router.routes();