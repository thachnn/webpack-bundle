#!/usr/bin/env node
require("../vendor/v8-compile-cache"), (() => {
  "use strict";
  var __webpack_modules__ = {
    12: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(17), homedir = __webpack_require__(37).homedir(), {env} = process, envPaths = (name, options) => ((options = Object.assign({
        suffix: "nodejs"
      }, options)).suffix && (name += `-${options.suffix}`), "darwin" === process.platform ? (name => {
        const library = path.join(homedir, "Library");
        return {
          cache: path.join(library, "Caches", name)
        };
      })(name) : "win32" === process.platform ? (name => {
        const localAppData = env.LOCALAPPDATA || path.join(homedir, "AppData", "Local");
        return {
          cache: path.join(localAppData, name, "Cache")
        };
      })(name) : (name => ({
        cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, ".cache"), name)
      }))(name));
      module.exports = envPaths, module.exports.default = envPaths;
    },
    421: module => {
      module.exports = require("../lib/node-gyp");
    },
    334: module => {
      module.exports = require("../lib/npmlog");
    },
    147: module => {
      module.exports = require("fs");
    },
    37: module => {
      module.exports = require("os");
    },
    17: module => {
      module.exports = require("path");
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }
  (() => {
    process.title = "node-gyp";
    const envPaths = __webpack_require__(12), gyp = __webpack_require__(421), log = __webpack_require__(334), os = __webpack_require__(37), prog = gyp();
    var completed = !1;
    prog.parseArgv(process.argv), prog.devDir = prog.opts.devdir;
    var homeDir = os.homedir();
    if (prog.devDir) prog.devDir = prog.devDir.replace(/^~/, homeDir); else {
      if (!homeDir) throw new Error("node-gyp requires that the user's home directory is specified in either of the environmental variables HOME or USERPROFILE. Overide with: --devdir /path/to/.node-gyp");
      prog.devDir = envPaths("node-gyp", {
        suffix: ""
      }).cache;
    }
    0 === prog.todo.length && (~process.argv.indexOf("-v") || ~process.argv.indexOf("--version") ? console.log("v%s", prog.version) : console.log("%s", prog.usage()), 
    process.exit(0)), log.info("it worked if it ends with", "ok"), log.verbose("cli", process.argv), 
    log.info("using", "node-gyp@%s", prog.version), log.info("using", "node@%s | %s | %s", process.versions.node, process.platform, process.arch);
    var dir = prog.opts.directory;
    if (dir) {
      var fs = __webpack_require__(147);
      try {
        fs.statSync(dir).isDirectory() ? (log.info("chdir", dir), process.chdir(dir)) : log.warn("chdir", dir + " is not a directory");
      } catch (e) {
        "ENOENT" === e.code ? log.warn("chdir", dir + " is not a directory") : log.warn("chdir", 'error during chdir() "%s"', e.message);
      }
    }
    function errorMessage() {
      var os = __webpack_require__(37);
      log.error("System", os.type() + " " + os.release()), log.error("command", process.argv.map(JSON.stringify).join(" ")), 
      log.error("cwd", process.cwd()), log.error("node -v", process.version), log.error("node-gyp -v", "v" + prog.package.version);
    }
    function issueMessage() {
      errorMessage(), log.error("", [ "Node-gyp failed to build your package.", "Try to update npm and/or node-gyp and if it does not help file an issue with the package author." ].join("\n"));
    }
    process.on("exit", (function(code) {
      completed || code || (log.error("Completion callback never invoked!"), issueMessage(), 
      process.exit(6));
    })), process.on("uncaughtException", (function(err) {
      log.error("UNCAUGHT EXCEPTION"), log.error("stack", err.stack), issueMessage(), 
      process.exit(7);
    })), function run() {
      var command = prog.todo.shift();
      if (!command) return completed = !0, void log.info("ok");
      prog.commands[command.name](command.args, (function(err) {
        if (err) return log.error(command.name + " error"), log.error("stack", err.stack), 
        errorMessage(), log.error("not ok"), process.exit(1);
        if ("list" === command.name) {
          var versions = arguments[1];
          versions.length > 0 ? versions.forEach((function(version) {
            console.log(version);
          })) : console.log("No node development files installed. Use `node-gyp install` to install a version.");
        } else arguments.length >= 2 && console.log.apply(console, [].slice.call(arguments, 1));
        process.nextTick(run);
      }));
    }();
  })();
})();