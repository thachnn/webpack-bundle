"use strict";

let updateNotifier = require("./update-notifier");

const options = JSON.parse(process.argv[2]);

updateNotifier = new updateNotifier.UpdateNotifier(options), updateNotifier.checkNpm().then((update => {
  updateNotifier.config.set("lastUpdateCheck", Date.now()), update.type && "latest" !== update.type && updateNotifier.config.set("update", update), 
  process.exit();
})).catch((() => {
  process.exit(1);
}));