const fs = require('fs');
const exec = require('child_process').execSync;
const path = require('path');

const reposDir = '/home/mbrack/ma/npm-repos/';
const toolDir = '/home/mbrack/ma/node-iok-finder/';

const index = require(`${toolDir}lib/index.js`);

const repoDirs = fs.readdirSync(reposDir)
                   .map(dir => `${reposDir}${dir}`)
                   .filter(fh => fs.lstatSync(fh).isDirectory())
                   .map(dir => `${dir}/`)
for (let repoDir of repoDirs) {
  const repoName = repoDir.split(path.sep).slice(-2, -1);
  console.log(`\n---- ${repoName} / ${repoDir}`);
  index(repoDir, `${__dirname}/out/${repoName}/`);
};
