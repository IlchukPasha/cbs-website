require('./.env.validate.js');

const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');

const logger = require('./libs/Logger')(module);

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'resources/views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});
require('./routes')(app);

if (!module.parent) {
  app.listen(process.env.PORT, () => {
    logger.info(`App running on port: ${process.env.PORT}`);
  });
}

module.exports = app;