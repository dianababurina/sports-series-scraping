const Koa = require('koa');
const Router = require('koa-router');
const { readFromHistory, createLiner } = require('./utils');
const { HISTORY_TYPES } = require('./constants');

const app = new Koa();
const router = new Router();

const sportsSeriesLiner = createLiner(HISTORY_TYPES.SPORTS_SERIES);
const matchFixtureLiner = createLiner(HISTORY_TYPES.MATCH_FIXTURE);

router.get('/sports-series', (ctx) => {
  ctx.body = readFromHistory(sportsSeriesLiner);
});

router.get('/match-fixtures/:id', (ctx) => {
  ctx.body = readFromHistory(matchFixtureLiner);
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(5000);

