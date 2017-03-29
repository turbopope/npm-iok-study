const fs = require('fs');
const exec = require('child_process').execSync;

const reposDir = '/home/mbrack/ma/npm-repos/';
const repoDirs = fs.readdirSync(reposDir)
                   .map(dir => `${reposDir}${dir}`)
                   .filter(fh => fs.lstatSync(fh).isDirectory())
                   .map(dir => `${dir}/`)

for (let repoDir of repoDirs) {
  const authors = exec(`git shortlog -sne HEAD`, { cwd: repoDir, encoding: 'utf-8' })
                 .trim()
                 .split("\n")
                 .map(line => /^(\d+)\s+(.+?)\s+<(.+?)>$/.exec(line.trim()))
                 .filter(parts => parts)
                 .map(function(parts) { return parts? {commits: parseInt(parts[1]), name: parts[2], mail: parts[3]} : null; })
                 .sort((a, b) => a.commits < b.commits ? 1 : -1)
  console.log(repoDir);
  console.dir(authors.slice(0, 3), { depth: null, color: true });
}
