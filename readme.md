# Node IoK Study

Code for the Case Study on Islands of Knowledge in popular NPM packages.

**Note: These are (for now) just some scripts for myself that contain local paths. They won't work for you.**

`npm install` once.

`node starScraper.js 5 > top5.json` to get a list of the repositories of the top `5*36` NPM packages (scraped from <https://www.npmjs.com/browse/star>).

`node update.js` to clone or update (pull) the repos in `top5.json`.

`node index.js` to analyze and report on the repos.

`node scan.js > result.json` to scan for IoKs.

## Interesting Queries

Once you have the `results.json` file, you can do some analysis on it with `jq`. Note that the queries below might be outdated if the datastructure changed.

`jq '.repos | .mongoose' result.json` Show result of a repo.

`jq '.options' result.json` Show the options that were used for scanning.

`jq '[.repos[]] | sort_by(.uses)[] | {uses, repoName}' result.json` Show repo names and number of uses, sorted by number of uses.

`jq '[.repos[] | select(.uses > 4000) | .repoName]' result.json` Show repo names of repos with more than 400 uses.

`jq '. | length' top5.json` / `jq '.repos | length' result.json` Show number of scraped or scanned repos, respectively.
