const Router = require('koa-router');

const router = new Router();
const handler = {
  async homePage(ctx) {
    await ctx.render('index', {});
  },
  async aboutPage(ctx) {
    await ctx.render('about', {});
  },
  async contactPage(ctx) {
    await ctx.render('contact', {});
  }
  // async eventsPage(ctx) {
  //   await ctx.render('events', {});
  // },
  // async sermonsPage(ctx) {
  //   await ctx.render('sermons', {});
  // },
  // async blogPage(ctx) {
  //   await ctx.render('blog', {});
  // },
  // async sermonsDetailsPage(ctx) {
  //   await ctx.render('sermons-details', {});
  // },
};
router.get('/', handler.homePage);
router.get('/about', handler.aboutPage);
router.get('/contact', handler.contactPage);
// router.get('/events', handler.eventsPage);
// router.get('/sermons', handler.sermonsPage);
// router.get('/blog', handler.blogPage);
// router.get('/sermons-details', handler.sermonsDetailsPage);
module.exports = router.routes();