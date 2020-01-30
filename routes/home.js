const Router = require('koa-router');
const { capitalize } = require('lodash');
const { format, parseISO } = require('date-fns');
const { uk } = require('date-fns/locale');

const { Event, Sermon } = require('./../models');

const router = new Router();

const handler = {
  async homePage(ctx) {
    const lastEvents = await Event.query().orderBy('date', 'desc').limit(3);
    const lastSermons = await Sermon.query().orderBy('date', 'desc').limit(3);

    lastSermons.forEach(sermon => {
      sermon.month = capitalize(format(sermon.date, 'MMM', { locale: uk }));
      sermon.day = format(sermon.date, 'd');
    });

    await ctx.render('index', { lastEvents, lastSermons });
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