## Description

This tool is used to take snapshots of sports series and simalate live updates.

## Structure

This tool is splitted into 2 main modules: `SAVE_SPORTS_SERIES` and `GET_SPORTS_SERIES`.
### SAVE_SPORTS_SERIES

`saveSportsSeries` is used to make requests to Fetcher to get matches for specific sport and create snapshots of responses. It contains cron that runs every 10 seconds. So it means that every 10 seconds new snapshots for sports series and match fixture will be added.

If sports series includes POST or PRE matches, response doesn't change a lot. So it's better to launch this script when match status changes from e.g PRE to LIVE or from LIVE to POST.

### GET_SPORTS_SERIES

`getSportsSeries` is used to read snapshots from `/history` folder and simulate live updates. It starts server that reads snapshots one by one and sends them as response. So for every request made to server, it will send a completely different snapshot.

### Snapshots

`/history` folder contains 2 `.txt` files with snapshots captured:
- for sports series for sport specified in config (`test` cricket)
- for match specified in config (with id `TEST2020-210903`)

### Config

`/config` folder contains default config used:
- `fetcherURL` - fetcher url you want to create snapshots from. You can use either DEV of LOCAL fetcher because both have cache disabled for sports resources. So it means that you will always get up-to-date response.
- `sport` - sport series you want to create snapshots for. List of sports availiable can be found [here](https://github.com/newscorp-ghfb/au-metro-reel-fetcher/blob/develop/routers/config/Sports.js). Check object keys, e.g `afl`, `nrl`, `test`, `odi` etc.
- `matchId` - match id you want to create snapshots for. This match should be from the same series specified in `sport`.

## Local run

First of all please make sure that you have proper values defined in config (especially `sport` and `matchId`). Then:

- Clone the repository
- Install modules by running `npm i`

If you want to start `saveSportsSeries` script:
- Run command `npm run start:parsing`
- Check snapshots created in `/history/{sport}-sports-series-history.txt` and `${match_id}-match-fixture.txt`

If you want to start `getSportsSeries` script:
- Make sure that you have snapshots in `/history` folder
- Run command `npm run start:server`
- Go to http://localhost:5000/sports-series or to http://localhost:5000/match-fixtures/TEST2020-210903 and make requests several times. You can check that responses are different by `date` attribute.

## Simualate LIVE updates on FE

First of all please make sure that you have proper values defined in config (especially `sport` and `matchId`). Then:

1. Clone the repository
2. Install modules by running `npm i`
3. Make sure that you have snapshots in `/history` folder
4. Run command `npm run start:server`

On Fetcher:
<br>
5. Checkout `feat/simulate-live-updates`
6. Start Fetcher locally

On Transformer:
<br>
7. Make sure you are pointing to LOCAL Fetcher
8. Start Transformer locally

In UI:
<br>
10. If you are using default configuration with snapshots pushed to this repo, go to `Menu -> Sport -> Cricket`. Scroll down to cricket `SportEvent` frames.
11. Select `IND v ENG` in dropdown. `INV v ENG` match that starts on 24th Feb is the one that will have LIVE updates.
12. Wait for some time (~ 2 mins) until the match becomes LIVE. Unfortutately snapshots were made when the match just started, so scores are 0. So in the future we want to update scores, so that the effect of updating is more visible.

