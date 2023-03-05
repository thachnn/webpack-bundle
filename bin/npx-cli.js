#!/usr/bin/env node
require("../vendor/v8-compile-cache");

const npx = require("../lib/libnpx"), path = require("path"), NPM_PATH = path.join(__dirname, "npm-cli.js");

npx(npx.parseArgs(process.argv, NPM_PATH));