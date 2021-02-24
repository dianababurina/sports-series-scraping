/* eslint-disable no-console */
const axios = require('axios').default;
const cron = require('node-cron');
const config = require('config');
const { saveToHistory } = require('./utils');
const { HISTORY_TYPES } = require('./constants');

const requestSportsSeries = async () => {
  const { data: sportsSeries } = await axios({
    url: `${config.get('fetcherURL')}/sections/sport/${config.get('sport')}`,
  });
  return { date: Date.now(), ...sportsSeries };
};

cron.schedule('*/10 * * * * *', async () => {
  console.log(`${new Date().toISOString()}: saving sports series snapshot`);
  try {
    const sportsSeries = await requestSportsSeries();
    await saveToHistory(sportsSeries, HISTORY_TYPES.SPORTS_SERIES);
  } catch (error) {
    console.error(error);
  }
});
