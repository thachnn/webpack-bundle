"use strict";

module.exports = launchSendMetrics;

var fs = require("../vendor/graceful-fs"), child_process = require("child_process");

function launchSendMetrics() {
  var path = require("path"), npm = require("./npm.js");
  try {
    if (!npm.config.get("send-metrics")) return;
    var cliMetrics = path.join(npm.config.get("cache"), "anonymous-cli-metrics.json"), targetRegistry = npm.config.get("metrics-registry");
    return fs.statSync(cliMetrics), runInBackground(__filename, [ cliMetrics, targetRegistry ]);
  } catch (ex) {}
}

function runInBackground(js, args, opts) {
  args || (args = []), args.unshift(js), opts || (opts = {}), opts.stdio = "ignore", 
  opts.detached = !0;
  var child = child_process.spawn(process.execPath, args, opts);
  return child.unref(), child;
}

function main() {
  (0, require("./npm.js")._metrics.send)(process.argv[2], process.argv[3]);
}

require.main === module && main();