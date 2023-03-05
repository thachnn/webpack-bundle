"use strict";

const BB = require("../vendor/bluebird"), extract = require("./pacote").extract;

module.exports = (args, cb) => {
  const parsed = "string" == typeof args ? JSON.parse(args) : args, spec = parsed[0], extractTo = parsed[1], opts = parsed[2];
  BB.resolve(extract(spec, extractTo, opts)).nodeify(cb);
};