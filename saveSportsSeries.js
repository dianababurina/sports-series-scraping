/* eslint-disable no-console */
const axios = require('axios').default;
const cron = require('node-cron');
const config = require('config');
const get = require('lodash.get');
const { saveToHistory } = require('./utils');
const { HISTORY_TYPES } = require('./constants');

const requestSportsSeries = async () => {
  const { data: sportsSeries } = await axios({
    url: `${config.get('fetcherURL')}/sections/sport/${config.get('sport')}`,
  });
  return { date: Date.now(), ...sportsSeries };
};

const getMatchFixture = (sportsSeries) => {
  const matches = get(sportsSeries, 'sportSeries.sports_series', []);
  return matches.find(match => get(match, 'match_id') === config.get('matchId'));
};

cron.schedule('*/10 * * * * *', async () => {
  console.log(`${new Date().toISOString()}: saving ${config.get('sport')} sports series snapshot`);
  try {
    const sportsSeries = await requestSportsSeries();
    await saveToHistory(sportsSeries, HISTORY_TYPES.SPORTS_SERIES);

    const matchFixture = getMatchFixture(sportsSeries);
    if (matchFixture) {
      console.log(`${new Date().toISOString()}: saving ${config.get('matchId')} snapshot`);
      await saveToHistory(
        { date: sportsSeries.date, ...matchFixture },
        HISTORY_TYPES.MATCH_FIXTURE,
      );
    }
  } catch (error) {
    console.error(error);
  }
});
