# Node IoK Study

Code for the Case Study on Islands of Knowledge in popular NPM packages.

**Note: These are (for now) just some scripts for myself that contain local paths. They won't work for you.**

`npm install` once.

`node starScraper.js 5 > top5.json` to get a list of the repositories of the top `5*36` NPM packages (scraped from <https://www.npmjs.com/browse/star>).

`node update.js` to clone or update (pull) the repos in `top5.json`.

`node index.js` to analyze and report on the repos.

`node scan.js 0.75 0.75 25 25 > result.json` to scan for IoKs with the specified thresholds.

## Interesting Queries

Once you have the `results.json` file, you can do some analysis on it with `jq`. Note that the queries below might be outdated if the datastructure changed.

`jq '.repos | .mongoose' result.json` Show result of a repo.

`jq '.options' result.json` Show the options that were used for scanning.

`jq '[.repos[]] | sort_by(.uses)[] | {uses, repoName}' result.json` Show repo names and number of uses, sorted by number of uses.

`jq '[.repos[] | select(.uses > 4000) | .repoName]' result.json` Show repo names of repos with more than 400 uses.

`jq '. | length' top5.json` / `jq '.repos | length' result.json` Show number of scraped or scanned repos, respectively.

`jq '.repos[] | {repoName, ioks: ([.domainIslands.islandsByCarry[] | {location, carryAuthor}])}' result.json` Show domain islands by carry metric.

`jq '[.repos[] | .domainIslands | .islandsByCarry[]] | length' result.json` Count all domain ioks by carry metric.

`jq '[.repos[] | select(.domainIslands.islandsByCarry | length >= 3)] | length' result_90_90.json` Count how many repos have 3 or more domain ioks by carry.

`jq '[.repos[]] | sort_by(.uses) | .[-10:][] | {repoName, domainCarryIOKs: (.domainIslands.islandsByCarry)}' result_65_65.json` Show name and domain carry ioks of the ten repos with the most uses.

`jq '.repos[] | {repoName, uses, domainPortionIoKs: (.domainIslands.islandsByPortion | length), domainCarryIoKs: (.domainIslands.islandsByCarry | length)}' result_65_70.json` Show name, uses and number of domain ioks by portion and carry.

`[[.repos[]] | sort_by(.uses)[] | {repoName, uses, domainPortionIoKs: ([.domainIslands.islandsByPortion[] | select(.uses > 100)])}] | .[-10:] | reverse` -- Case Study Pilot
