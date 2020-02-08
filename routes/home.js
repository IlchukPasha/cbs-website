const Router = require('koa-router');
const { capitalize, range } = require('lodash');
const { format } = require('date-fns');
const { uk } = require('date-fns/locale');

const { formatEventTime, formatEventDate, escapeHtml } = require('./../core/helper');
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
  async eventsPage(ctx) {
    const { lastEvents } = ctx.state;
    const { page = 1, perPage = 5 } = ctx.query;

    const events = await Event.query().page(page - 1, perPage);

    if (events.results.length === 0) {
      ctx.redirect('/events');
      return;
    }

    events.results.forEach(event => {
      event.startedAt = formatEventTime(event.startedAt);
      event.finishedAt = formatEventTime(event.finishedAt);
      event.date = formatEventDate(event.date);
    });

    await ctx.render('events', { events, currentPage: +page, range, lastEvents });
  },
  async sermonsPage(ctx) {
    const { lastEvents } = ctx.state;
    const { page = 1, perPage = 4 } = ctx.query;

    const sermons = await Sermon.query().page(page - 1, perPage);

    if (sermons.results.length === 0) {
      ctx.redirect('/sermons');
      return;
    }

    sermons.results.forEach(sermon => {
      sermon.date = `${format(sermon.date, 'd MMM y', { locale: uk })}`;
    });

    await ctx.render('sermons', { sermons, currentPage: +page, range, lastEvents});
  },
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

    sermon.date = `${format(sermon.date, 'd MMM y', { locale: uk })}`;
    // sermon.description = escapeHtml(sermon.description);

    await ctx.render('sermon', { sermon, lastEvents, escapeHtml });
  },
  async schedulePage(ctx) {
    const { lastEvents } = ctx.state;
    await ctx.render('schedule', { lastEvents });
  }
};

async function eventsMw(ctx, next) {
  const lastEvents = await Event.query().orderBy('date', 'desc').limit(6);

  lastEvents.forEach(event => {
    event.startedAt = formatEventTime(event.startedAt);
    event.finishedAt = formatEventTime(event.finishedAt);
    event.date = formatEventDate(event.date);
  });

  ctx.state.lastEvents = lastEvents;

  await next();
}

router.get('/', eventsMw, handler.homePage);
router.get('/about', eventsMw, handler.aboutPage);
router.get('/contact', eventsMw, handler.contactPage);
router.get('/events', eventsMw, handler.eventsPage);
router.get('/sermons', eventsMw, handler.sermonsPage);
router.get('/events/:id', eventsMw, handler.eventsDetailPage);
router.get('/sermons/:id', eventsMw, handler.sermonsDetailPage);
router.get('/schedule', eventsMw, handler.schedulePage);

module.exports = router.routes();