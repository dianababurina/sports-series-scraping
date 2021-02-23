const http = require('http');
const LineByLine = require('n-readlines');
const { getHistoryFile } = require('./utils');

const liner = new LineByLine(getHistoryFile());

const readSportsSeries = () => {
  const line = liner.next();
  return (line)
    ? JSON.parse(line.toString())
    : {};
};

const createSportsSeriesRoute = (request, response) => {
  const { method, url } = request;

  response.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && url === '/sports-series') {
    const sportsSeries = readSportsSeries();
    response.write(JSON.stringify(sportsSeries));
  } else {
    response.write(JSON.stringify({ error: 'Request method and/or URL are not supported' }));
  }
  response.end();
};

http.createServer((request, response) => {
  createSportsSeriesRoute(request, response);
}).listen(5000);

