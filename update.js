const fs = require('fs');
const exec = require('child_process').execSync;
const url = require('url');

const reposDir = '/home/mbrack/ma/npm-repos/';
const URLsFile = process.argv[2];
const toolDir = '/home/mbrack/ma/node-iok-finder/';

const gitURLs = JSON.parse(fs.readFileSync(URLsFile), { encoding: 'utf-8' }).repoURLs;

for (let gitURL of gitURLs) {
  gitURL = url.parse(gitURL);
  const repoName = gitURL.pathname.split('/').slice(-1)[0].split('.')[0];
  console.log(`\n---- ${repoName} / ${gitURL.format()}`)
  const repoPath = prepareRepo(gitURL, repoName);
  if (!repoPath) {
    console.error(`Was unable to update ${repoName}`);
  }
}

function prepareRepo(gitURL, repoName) {
  try {
    exec(`git clone ${gitURL.format()} ${repoName}`, { cwd: reposDir, encoding: 'utf-8' });
  } catch (e1) {
    if (!e1.stderr) {
      console.error('Unknown Error without stderr:');
      console.error(e1);
      return undefined;
    } else if (!e1.stderr.includes('already exists and is not an empty directory.')) {
      console.error('Unknown Error:');
      console.error(e1.stderr);
      return undefined;
    }
    try {
      exec(`git checkout master`, { cwd: `${reposDir}${repoName}`, encoding: 'utf-8' });
      exec(`git pull`, { cwd: `${reposDir}${repoName}`, encoding: 'utf-8' });
    } catch (e2) {
      console.error('Yuo dun goofed');
      console.error(e2);
    }
  }
  return `${reposDir}${repoName}`;
}
