require('./.env.validate.js');

const Koa = require('koa');
const render = require('koa-ejs');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');

require('./core/db');

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'resources/views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
app.use(mount('/static', serve(path.join(process.cwd(), '/public/static'), { defer: true })));
require('./routes')(app);

if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.log(`App running on port: ${process.env.PORT}`);
  });
}

module.exports = app;