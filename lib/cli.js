(() => {
  var __webpack_modules__ = {
    724: (module, __unused_webpack_exports, __webpack_require__) => {
      const Npm = __webpack_require__(97);
      module.exports = async process => {
        process.title = "npm";
        const semver = __webpack_require__(747), supported = __webpack_require__(401).h$.d, nodejsVersion = process.version.replace(/-.*$/, "");
        semver.satisfies(nodejsVersion, "<12.5.0") && (console.error("ERROR: npm is known not to run on Node.js " + process.version), 
        console.error("You'll need to upgrade to a newer Node.js version in order to use this"), 
        console.error("version of npm. You can find the latest version at https://nodejs.org/"), 
        process.exit(1)), semver.satisfies(nodejsVersion, supported) || (console.error("npm does not support Node.js " + process.version), 
        console.error("You should probably upgrade to a newer version of node as we"), console.error("can't make any promises that npm will work with this version."), 
        console.error("You can find the latest version at https://nodejs.org/"));
        const exitHandler = Npm._exitHandler;
        process.on("uncaughtException", exitHandler), process.on("unhandledRejection", exitHandler);
        const npm = new Npm;
        exitHandler.setNpm(npm), "g" === process.argv[1][process.argv[1].length - 1] && process.argv.splice(1, 1, "npm", "-g");
        const log = Npm._log;
        let cmd;
        log.verbose("cli", process.argv.slice(0, 2).join(" ")), log.info("using", "npm@%s", npm.version), 
        log.info("using", "node@%s", process.version);
        try {
          return await npm.load(), npm.config.get("version", "cli") ? (npm.output(npm.version), 
          exitHandler()) : (npm.config.get("versions", "cli") && (npm.argv = [ "version" ], 
          npm.config.set("usage", !1, "cli")), cmd = npm.argv.shift(), cmd ? (await npm.exec(cmd, npm.argv), 
          exitHandler()) : (npm.output(await npm.usage), process.exitCode = 1, exitHandler()));
        } catch (err) {
          if ("EUNKNOWNCOMMAND" === err.code) {
            const didYouMean = Npm._didYouMean, suggestions = await didYouMean(npm, npm.localPrefix, cmd);
            return npm.output(`Unknown command: "${cmd}"${suggestions}\n`), npm.output("To see a list of supported npm commands, run:\n  npm help"), 
            process.exitCode = 1, exitHandler();
          }
          return exitHandler(err);
        }
      }, module.exports._config = Npm._config;
    },
    97: module => {
      "use strict";
      module.exports = require("./npm");
    },
    747: module => {
      "use strict";
      module.exports = require("./semver");
    },
    401: module => {
      "use strict";
      module.exports = JSON.parse('{"h$":{"d":"^12.13.0 || ^14.15.0 || >=16.0.0"}}');
    }
  }, __webpack_module_cache__ = {};
  var __webpack_exports__ = function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }(724);
  module.exports = __webpack_exports__;
})();