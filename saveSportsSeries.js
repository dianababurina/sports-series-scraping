/* eslint-disable no-console */
const fs = require('fs');
const os = require('os');
const axios = require('axios').default;
const cron = require('node-cron');
const config = require('config');
const { getHistoryFile } = require('./utils');

const requestSportsSeries = async () => {
  const { data: sportsSeries } = await axios({
    url: `${config.get('fetcherURL')}/sections/sport/${config.get('sport')}`,
  });
  return { date: Date.now(), ...sportsSeries };
};

const saveSportsSeries = (sportsSeries) => {
  const file = getHistoryFile();
  return fs.promises.appendFile(file, `${JSON.stringify(sportsSeries)}${os.EOL}`);
};

cron.schedule('*/10 * * * * *', async () => {
  console.log(`${new Date().toISOString()}: saving sports series snapshot`);
  try {
    const sportsSeries = await requestSportsSeries();
    await saveSportsSeries(sportsSeries);
  } catch (error) {
    console.error(error);
  }
});
