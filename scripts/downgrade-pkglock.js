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
const normalizeDep = (k, v) => {
  if (!v.resolved && v.version) {
    v.resolved = `https://registry.npmjs.org/${k}/-/${k.replace(/^.*\//, '')}-${v.version}.tgz`;
  }

  if (v.requires) {
    v.requires = sortObject(v.requires);
  }
  if (v.dependencies) {
    v.dependencies = sortObject(v.dependencies, normalizeDep);
  }

  return v;
};

const downgradeFromV2 = (pkg) => {
  delete pkg.packages;

  if (pkg.dependencies) {
    pkg.dependencies = sortObject(pkg.dependencies, normalizeDep);
  }

  pkg.lockfileVersion = 1;
  return pkg;
};

const downgradeFromV3 = (pkg) => {
  delete pkg.packages[''];
  pkg.dependencies = {};

  Object.keys(pkg.packages).forEach((k) => {
    if (k.startsWith('node_modules/') && !k.includes('/node_modules/')) {
      pkg.dependencies[k.substring(13)] = downgradeDepV3(k, pkg.packages);
    }
  });

  return downgradeFromV2(pkg);
};

const downgradeDepV3 = (key, ref) => {
  let o = ref[key];
  if (o.link) {
    o = ref[(key = o.resolved)];
  }

  o.requires = o.dependencies;
  [
    'dependencies',
    'engines',
    'license',
    'funding',
    'bin',
    'devDependencies',
    'peerDependencies',
    'peerDependenciesMeta',
    'bundleDependencies',
    'optionalDependencies',
  ].forEach((k) => delete o[k]);

  Object.keys(o.requires || {}).forEach((k) => {
    const sk = `${key}/node_modules/${k}`;
    if (ref[sk]) {
      o.dependencies = o.dependencies || {};
      o.dependencies[k] = downgradeDepV3(sk, ref);
      delete ref[sk];
    }
  });

  Object.keys(ref).forEach((sk) => {
    let k = `${key}/node_modules/`;
    if (sk.startsWith(k) && !(k = sk.substring(k.length)).includes('/node_modules/')) {
      o.dependencies = o.dependencies || {};
      o.dependencies[k] = downgradeDepV3(sk, ref);
      delete ref[sk];
    }
  });

  return o;
};

// Main process
(async (filename) => {
  try {
    let data = await fs.readFile(filename, 'utf8');
    let pkg = JSON.parse(data);

    if (pkg.lockfileVersion > 1) {
      pkg = (pkg.lockfileVersion > 2 ? downgradeFromV3 : downgradeFromV2)(pkg);
      // await fs.rename(filename, `${filename}.bak`);

      data = JSON.stringify(pkg, null, 2);
      await fs.writeFile(filename, data + '\n', 'utf8');
    }
  } catch (err) {
    console.error(err);
  }
})(process.argv[2]);
