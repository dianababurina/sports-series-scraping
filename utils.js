const config = require('config');
const path = require('path');
const fs = require('fs');
const os = require('os');
const LineByLine = require('n-readlines');

const HISTORY_FILENAME = {
  sportsSeries: () => `${config.get('sport')}-sports-series-history`,
  matchFixture: () => `${config.get('matchId')}-match-fixture`,
};

const getHistoryFile = (type) => {
  const getFilename = HISTORY_FILENAME[type];
  return path.join('.', 'history', `${getFilename()}.txt`);
};

const createLiner = type => new LineByLine(getHistoryFile(type));

const readFromHistory = (liner) => {
  const line = liner.next();
  return (line) ? JSON.parse(line.toString()) : {};
};

const saveToHistory = (data, type) => {
  const file = getHistoryFile(type);
  return fs.promises.appendFile(file, `${JSON.stringify(data)}${os.EOL}`);
};

module.exports = {
  getHistoryFile,
  createLiner,
  readFromHistory,
  saveToHistory,
};
