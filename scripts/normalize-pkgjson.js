#!/usr/bin/env node
'use strict';

const fs = require('fs').promises;

// Helpers
const isObject = (o) => typeof o === 'object' && o !== null && !Array.isArray(o);

const sortObject = (o, cb) =>
  Object.keys(o)
    .sort()
    .reduce((res, k) => ((res[k] = !cb ? o[k] : cb(k, o[k])), res), {});

// Functions
const normalizePKG = (pkg) => {
  Object.keys(pkg).forEach((k) => {
    if (k[0] === '_' || (typeof pkg[k] === 'boolean' && /^(bundleD|deprecated)/.test(k))) {
      delete pkg[k];
    }
  });

  if (pkg.author && typeof pkg.author === 'string') {
    pkg.author = parsePkgAuthor(pkg.author);
  }
  if (pkg.repository && typeof pkg.repository === 'string') {
    pkg.repository = { type: 'git', url: pkg.repository };
  }

  if (typeof pkg.bin === 'string') {
    pkg.bin = pkg.bin.replace(/^\.\//g, '');
  } else if (isObject(pkg.bin)) {
    Object.keys(pkg.bin).forEach((k) => (pkg.bin[k] = pkg.bin[k].replace(/^\.\//g, '')));
  }

  if (pkg.repository && !pkg.homepage) {
    pkg.homepage = pkg.repository.url.replace(/^git:/, 'https:').replace(/\.git$/, '#readme');
  }
  if (pkg.homepage && !pkg.bugs) {
    pkg.bugs = { url: pkg.homepage.replace(/#readme$/, '/issues') };
  } else if (pkg.bugs && typeof pkg.bugs === 'string') {
    pkg.bugs = { url: pkg.bugs };
  }

  return sortObject(pkg, (k, v) => (/([Dd]ependencies|scripts)$/.test(k) && isObject(v) ? sortObject(v) : v));
};

const parsePkgAuthor = (s) => {
  const o = {};
  s = s
    .replace(/<([^<>@]*@[^<>]*)>/, (_, p1) => ((o.email = p1), ''))
    .replace(/\(([^()/]*\/\/[^()]*)\)/, (_, p1) => ((o.url = p1), ''));

  return Object.assign({ name: s.trim() }, o);
};

// Main process
(async (filename) => {
  try {
    let data = await fs.readFile(filename, 'utf8');
    let pkg = JSON.parse(data);

    pkg = normalizePKG(pkg);
    // await fs.rename(filename, `${filename}.bak`);

    data = JSON.stringify(pkg, null, 2);
    await fs.writeFile(filename, data + '\n', 'utf8');
  } catch (err) {
    console.error(err);
  }
})(process.argv[2]);
