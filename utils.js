const config = require('config');
const path = require('path');

const getHistoryFile = () => path.join('.', 'history', `${config.get('sport')}-${config.get('fileNameSuffix')}`);

module.exports = {
  getHistoryFile,
};
