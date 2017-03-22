const fs = require('fs');
const exec = require('child_process').execSync;
const path = require('path');

const reposDir = '/home/mbrack/ma/casestudy/out/';
const toolDir = '/home/mbrack/ma/node-iok-finder/';

const scan = require(`${toolDir}lib/scan_for_islands.js`);
const Table = require('table42');

function sum(ary) {
  return ary.reduce((a, b) => a + b, 0);
}
function totalUses(table) {
  return sum(Array.from(table._rows.keys()).map(row => sum(table.getRow(row))));
}

const options = {
  PORTION_THRESHOLD: parseFloat(process.argv[2]) || 0.75,
  CARRY_THRESHOLD: parseFloat(process.argv[3]) || 0.75,
  MODULE_THRESHOLD: parseInt(process.argv[4]) || 25,
  AUTHOR_THRESHOLD: parseInt(process.argv[5]) || 25,
}

const result = {
  options,
  repos: {}
};

const repoDirs = fs.readdirSync(reposDir)
                   .map(dir => `${reposDir}${dir}`)
                   .filter(fh => fs.lstatSync(fh).isDirectory())
                   .map(dir => `${dir}/`)

for (let repoDir of repoDirs) {
  const repoName = repoDir.split(path.sep).slice(-2, -1)[0];
  const domainTableFile = `${__dirname}/out/${repoName}/condensed.csv`;
  const domainTable = Table.parse(fs.readFileSync(domainTableFile, { encoding: 'utf-8' }));
  const moduleTableFile = `${__dirname}/out/${repoName}/uses.csv`;
  const moduleTable = Table.parse(fs.readFileSync(moduleTableFile, { encoding: 'utf-8' }));
  const remapFile = `${__dirname}/out/${repoName}/resolved_remap.json`;
  let domainIslands;
  let moduleIslands;

  if (fs.existsSync(domainTableFile)) {
    domainIslands = scan(domainTableFile, options, remapFile);
  } else {
    domainIslands = `${domainTableFile} does not exist`;
  }

  if (fs.existsSync(moduleTableFile)) {
    moduleIslands = scan(moduleTableFile, options);
  } else {
    moduleIslands = `${moduleTableFile} does not exist`;
  }

  result.repos[repoName] = {
    repoDir,
    repoName,
    uses: totalUses(domainTable),
    moduleIslands,
    domainIslands,
  };
};

console.log(JSON.stringify(result));
