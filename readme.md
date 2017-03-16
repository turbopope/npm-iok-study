# Node IoK Study

Code for the Case Study on Islands of Knowledge in popular NPM packages.

**Note: These are (for now) just some scripts for myself that contain local paths. They won't work for you.**

`npm install` once.

`node starScraper.js 5 > top5.json` to get a list of the repositories of the top `5*36` NPM packages (scraped from <https://www.npmjs.com/browse/star>).

`node update.js` to clone or update (pull) the repos in `top5.json`.

`node index.js` to analyze and report on the repos.

`node scan.js > result.json` to scan for IoKs.
