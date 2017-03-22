'use strict';
const nodemailer = require('nodemailer');
const pug = require('pug');
const fs = require('fs');
const exec = require('child_process').execSync;

const MAIL_EXPRESSION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;


function sendSurvey(toMail, data) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'npm.island.casestudy@gmail.com',
      pass: '' // Gmail password here
    }
  });

  let mailOptions = {
    from: '"Marco Brack" <npm.island.casestudy@gmail.com>',
    to: toMail,
    subject: `Study: Islands of Knowledge in ${data.repoName}`,
    html: pug.renderFile(`${__dirname}/proto.pug`, data)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}


let repos = JSON.parse(fs.readFileSync(`${__dirname}/11to50.json`, { encoding: 'utf-8'}));

for (let repo of repos) {
  const repoName = repo.repoName;
  const contacts = exec(`git shortlog -sne HEAD`, { cwd: `/home/mbrack/ma/npm-repos/${repoName}`, encoding: 'utf-8' })
                 .trim()
                 .split("\n")
                 .map(line => /^(\d+)\s+(.+?)\s+<(.+?)>$/.exec(line.trim()))
                 .map(function(parts) { return {commits: parseInt(parts[1]), name: parts[2], mail: parts[3]}; })
                 .filter(entry => MAIL_EXPRESSION.test(entry.mail))
                 .filter(entry => entry.commits > 100)
                 .sort((a, b) => a.commits < b.commits ? 1 : -1)
                 .slice(0, 3)
  repo['contacts'] = contacts;
}

repos = repos.filter(repo => repo.domainPortionIoKs.length > 0);
for (let repo of repos.slice(0)) {
  for (let contact of repo.contacts) {
    sendSurvey(contact.mail, repo);
  }
}
