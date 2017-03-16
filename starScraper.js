#!/usr/bin/bash

const request = require('request');
const fs = require('fs');
const xpath = require('xpath');
const parse5 = require('parse5');
const xmlser = require('xmlserializer');
const dom = require('xmldom').DOMParser;
const url = require('url');


const PAGE_COUNT = parseInt(process.argv[2]);
let pages = ['https://www.npmjs.com/browse/star'];
for (let i = 1; i < PAGE_COUNT; i++) {
  pages.push(`https://www.npmjs.com/browse/star?offset=${i*36}`)
}

let packagePages = [];

request(pages[0], onDownloadedStarsPage);

function onDownloadedStarsPage(error, response, body) {
  if (error) { throw error; }
  if (!response || !response.statusCode) { throw new Error(`${response.statusCode} -- ${response}`) }

  const document = parse5.parse(body);
  const xhtml = xmlser.serializeToString(document);
  const doc = new dom().parseFromString(xhtml);
  const select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
  const hrefs = select("//x:h3/x:a/@href", doc);
  const urls = hrefs.map(href => href.value);
  packagePages = packagePages.concat(urls);
  pages.splice(0, 1);
  if (pages.length > 0) {
    request(pages[0], onDownloadedStarsPage);
  } else {
    packagePages = packagePages.map(relative => relative.split('/')[2])
                               .map(id => `https://skimdb.npmjs.com/registry/${id}`);
    gotNPMUrls();
  }
};

let repoURLs = [];

function gotNPMUrls() {
  request(packagePages[0], onDownloadedPackagePage);
}

function onDownloadedPackagePage(error, response, body) {
  if (error) { throw error; }
  if (!response || !response.statusCode) { throw new Error(`${response.statusCode} -- ${response}`) }

  const pack = JSON.parse(body);
  if (pack.repository && pack.repository.type === 'git') {
    let repoURL = pack.repository.url;
    // repoURL = `git@${repoURL.host}${repoURL.path}`;
    repoURL = repoURL.split('://');
    let protocols = repoURL[0].split('+');
    repoURL = `${protocols[0]}://${repoURL[1]}`; // Just use whatever protocol was listed first, it's not important
    repoURLs.push(repoURL);
  } else {
    console.warn(`${pack.name}'s repository is not a git or undefined: ${pack.repository}'`)
  }
  packagePages.splice(0, 1);
  if (packagePages.length > 0) {
    request(packagePages[0], onDownloadedPackagePage);
  } else {
    console.log(JSON.stringify(repoURLs));
  }
}
