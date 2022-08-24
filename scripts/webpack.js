#!/usr/bin/env node

const webpack = require('webpack');
let configSet = require('../webpack.config');

if (!Array.isArray(configSet)) {
  configSet = [configSet];
}

// Parse arguments
const names = new Set(process.argv.slice(2));

if (names.size > 0) {
  configSet = configSet.filter((cfg) => cfg.name && names.has(cfg.name));
}

const webpackCompile = (cfg) => {
  if (!cfg) return;

  webpack(cfg, (err, stats) => {
    // Error handling
    if (err) {
      console.error(err);
      return;
    }

    // Log result...
    console.log(stats.toString({ colors: true, ...cfg.stats }));

    // Process next
    webpackCompile(configSet.shift());
  });
};

webpackCompile(configSet.shift());
