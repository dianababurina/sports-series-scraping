## Description

This module is used to take snapshots of sports series and simalate live updates.

## Structure

This module is splitted into 2 main scripts: `saveSportsSeries` and `getSportsSeries`.

`saveSportsSeries` is used to make requests to Fetcher to get sports series for specific sport and save the response into `/history` folder. For every sport a new `.txt` file will be created with all taken snapshots. This script contains cron that runs every 10 seconds. So it means that every 10 seconds new snapshot for sports series will be added.

If sports series includes POST or PRE matches, response doesn't change a lot. So it's better to launch this script when match status changes from e.g PRE to LIVE or from LIVE to POST.

`getSportsSeries` is used to read snapshots of sports series from `/history` folder and simulate live updates. It starts server that reads snapshots one by one and sends them as response. So for every request made to server, it will send a completely different snapshot.

## Local run

- Clone the repository
- Install modules by running `npm i`
- Update module config (`./config/default.json` file) and specify the sport you want to take snapshots for. List of sports availiable can be found [here](https://github.com/newscorp-ghfb/au-metro-reel-fetcher/blob/develop/routers/config/Sports.js). Check object keys, e.g `afl`, `nrl`, `test`, `odi` etc.

If you want to start `saveSportsSeries` script:
- Run command `npm run start:parsing`
- Check snapshots created in `/history/{sport}-sports-series-history.txt`

If you want to start `getSportsSeries` script:
- Make sure that you have snapshots in `/history` folder
- Run command `npm run start:server`
- Go to http://localhost:5000/sports-series and make requests several times. You can check that responses are different by `date` attribute


