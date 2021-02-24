const Koa = require('koa');
const Router = require('koa-router');
const LineByLine = require('n-readlines');
const { getHistoryFile } = require('./utils');

const app = new Koa();
const router = new Router();
const liner = new LineByLine(getHistoryFile());

const readSportsSeries = () => {
  const line = liner.next();
  return (line) ? JSON.parse(line.toString()) : {};
};

router.get('/sports-series', (ctx) => {
  ctx.body = readSportsSeries();
  return ctx;
});

router.get('/match-fixtures/:id', (ctx) => {
  ctx.body = ctx.params.id;
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(5000);

