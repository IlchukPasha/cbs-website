const Router = require('koa-router');
const { capitalize } = require('lodash');
const { format } = require('date-fns');
const { uk } = require('date-fns/locale');

const { Event, Sermon } = require('./../models');

const router = new Router();

const handler = {
  async homePage(ctx) {
    const { lastEvents } = ctx.state;

    const lastSermons = await Sermon.query().orderBy('date', 'desc').limit(3);

    lastSermons.forEach(sermon => {
      sermon.month = capitalize(format(sermon.date, 'MMM', { locale: uk }));
      sermon.day = format(sermon.date, 'd');
    });

    await ctx.render('index', { lastEvents, lastSermons });
  },
  async aboutPage(ctx) {
    const { lastEvents } = ctx.state;
    await ctx.render('about', { lastEvents });
  },
  async contactPage(ctx) {
    const { lastEvents } = ctx.state;
    await ctx.render('contact', { lastEvents });
  },
  // async eventsPage(ctx) {
  //   await ctx.render('events', {});
  // },
  // async sermonsPage(ctx) {
  //   await ctx.render('sermons', {});
  // },
  // async blogPage(ctx) {
  //   await ctx.render('blog', {});
  // },
  async eventsDetailPage(ctx) {
    const { lastEvents } = ctx.state;
    const { id } = ctx.params;

    const event = await Event.query().findById(id);

    if (!event) {
      ctx.redirect('/');
      return;
    }

    await ctx.render('event', { event, lastEvents });
  },
  async sermonsDetailPage(ctx) {
    const { lastEvents } = ctx.state;
    const { id } = ctx.params;

    const sermon = await Sermon.query().findById(id);

    if (!sermon) {
      ctx.redirect('/');
      return;
    }

    sermon.date = `${capitalize(format(sermon.date, 'd MMM y', { locale: uk }))}`;

    await ctx.render('sermon', { sermon, lastEvents });
  },
  async schedulePage(ctx) {
    const { lastEvents } = ctx.state;
    await ctx.render('schedule', { lastEvents });
  }
};

async function eventsMw(ctx, next) {
  const lastEvents = await Event.query().orderBy('date', 'desc').limit(6);

  lastEvents.forEach(event => {
    const startedAtArray = event.startedAt.split(':');
    const finishedAtArray = event.finishedAt.split(':');

    event.startedAt = `${startedAtArray[0]}:${startedAtArray[1]}`;
    event.finishedAt = `${finishedAtArray[0]}:${finishedAtArray[1]}`;

    event.date = format(event.date, 'd MMMM, y', { locale: uk });
  });

  ctx.state.lastEvents = lastEvents;

  await next();
}

router.get('/', eventsMw, handler.homePage);
router.get('/about', eventsMw, handler.aboutPage);
router.get('/contact', eventsMw, handler.contactPage);
// router.get('/events', handler.eventsPage);
// router.get('/sermons', handler.sermonsPage);
// router.get('/blog', handler.blogPage);
router.get('/events/:id', eventsMw, handler.eventsDetailPage);
router.get('/sermons/:id', eventsMw, handler.sermonsDetailPage);
router.get('/schedule', eventsMw, handler.schedulePage);

module.exports = router.routes();