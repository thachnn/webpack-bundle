#!/usr/bin/env node
require("../vendor/v8-compile-cache"), (() => {
  var __webpack_modules__ = {
    42: (module, __unused_webpack_exports, __webpack_require__) => {
      const URL = __webpack_require__(310).URL;
      module.exports = function(arg) {
        const isString = "string" == typeof arg;
        if (!Array.isArray(arg) && !isString) return arg;
        const info = (isString ? arg.split(" ") : arg).map((arg => {
          try {
            const url = new URL(arg);
            return "" === url.password ? arg : arg.replace(url.password, "***");
          } catch (e) {
            return arg;
          }
        }));
        return isString ? info.join(" ") : info;
      };
    },
    987: module => {
      "use strict";
      var colorNums = {
        white: 37,
        black: 30,
        blue: 34,
        cyan: 36,
        green: 32,
        magenta: 35,
        red: 31,
        yellow: 33,
        brightBlack: 90,
        brightRed: 91,
        brightGreen: 92,
        brightYellow: 93,
        brightBlue: 94,
        brightMagenta: 95,
        brightCyan: 96,
        brightWhite: 97
      }, backgroundColorNums = {
        bgBlack: 40,
        bgRed: 41,
        bgGreen: 42,
        bgYellow: 43,
        bgBlue: 44,
        bgMagenta: 45,
        bgCyan: 46,
        bgWhite: 47,
        bgBrightBlack: 100,
        bgBrightRed: 101,
        bgBrightGreen: 102,
        bgBrightYellow: 103,
        bgBrightBlue: 104,
        bgBrightMagenta: 105,
        bgBrightCyan: 106,
        bgBrightWhite: 107
      }, open = {}, close = {}, colors = {};
      Object.keys(colorNums).forEach((function(k) {
        var o = open[k] = "[" + colorNums[k] + "m", c = close[k] = "[39m";
        colors[k] = function(s) {
          return o + s + c;
        };
      })), Object.keys(backgroundColorNums).forEach((function(k) {
        var o = open[k] = "[" + backgroundColorNums[k] + "m", c = close[k] = "[49m";
        colors[k] = function(s) {
          return o + s + c;
        };
      })), module.exports = colors, colors.open = open, colors.close = close;
    },
    91: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      var vendors = __webpack_require__(339), env = process.env;
      function checkEnv(obj) {
        return "string" == typeof obj ? !!env[obj] : Object.keys(obj).every((function(k) {
          return env[k] === obj[k];
        }));
      }
      Object.defineProperty(exports, "_vendors", {
        value: vendors.map((function(v) {
          return v.constant;
        }))
      }), exports.name = null, exports.isPR = null, vendors.forEach((function(vendor) {
        var isCI = (Array.isArray(vendor.env) ? vendor.env : [ vendor.env ]).every((function(obj) {
          return checkEnv(obj);
        }));
        if (exports[vendor.constant] = isCI, isCI) switch (exports.name = vendor.name, typeof vendor.pr) {
         case "string":
          exports.isPR = !!env[vendor.pr];
          break;

         case "object":
          "env" in vendor.pr ? exports.isPR = vendor.pr.env in env && env[vendor.pr.env] !== vendor.pr.ne : "any" in vendor.pr ? exports.isPR = vendor.pr.any.some((function(key) {
            return !!env[key];
          })) : exports.isPR = checkEnv(vendor.pr);
          break;

         default:
          exports.isPR = null;
        }
      })), exports.isCI = !!(env.CI || env.CONTINUOUS_INTEGRATION || env.BUILD_NUMBER || env.RUN_ID || exports.name);
    },
    166: module => {
      "use strict";
      module.exports = require("../lib/nopt");
    },
    613: module => {
      "use strict";
      module.exports = require("../lib/npm");
    },
    334: module => {
      "use strict";
      module.exports = require("../lib/npmlog");
    },
    235: module => {
      "use strict";
      module.exports = require("../vendor/update-notifier");
    },
    310: module => {
      "use strict";
      module.exports = require("url");
    },
    339: module => {
      "use strict";
      module.exports = JSON.parse('[{"name":"AppVeyor","constant":"APPVEYOR","env":"APPVEYOR","pr":"APPVEYOR_PULL_REQUEST_NUMBER"},{"name":"Azure Pipelines","constant":"AZURE_PIPELINES","env":"SYSTEM_TEAMFOUNDATIONCOLLECTIONURI","pr":"SYSTEM_PULLREQUEST_PULLREQUESTID"},{"name":"Bamboo","constant":"BAMBOO","env":"bamboo_planKey"},{"name":"Bitbucket Pipelines","constant":"BITBUCKET","env":"BITBUCKET_COMMIT","pr":"BITBUCKET_PR_ID"},{"name":"Bitrise","constant":"BITRISE","env":"BITRISE_IO","pr":"BITRISE_PULL_REQUEST"},{"name":"Buddy","constant":"BUDDY","env":"BUDDY_WORKSPACE_ID","pr":"BUDDY_EXECUTION_PULL_REQUEST_ID"},{"name":"Buildkite","constant":"BUILDKITE","env":"BUILDKITE","pr":{"env":"BUILDKITE_PULL_REQUEST","ne":"false"}},{"name":"CircleCI","constant":"CIRCLE","env":"CIRCLECI","pr":"CIRCLE_PULL_REQUEST"},{"name":"Cirrus CI","constant":"CIRRUS","env":"CIRRUS_CI","pr":"CIRRUS_PR"},{"name":"AWS CodeBuild","constant":"CODEBUILD","env":"CODEBUILD_BUILD_ARN"},{"name":"Codeship","constant":"CODESHIP","env":{"CI_NAME":"codeship"}},{"name":"Drone","constant":"DRONE","env":"DRONE","pr":{"DRONE_BUILD_EVENT":"pull_request"}},{"name":"dsari","constant":"DSARI","env":"DSARI"},{"name":"GitLab CI","constant":"GITLAB","env":"GITLAB_CI"},{"name":"GoCD","constant":"GOCD","env":"GO_PIPELINE_LABEL"},{"name":"Hudson","constant":"HUDSON","env":"HUDSON_URL"},{"name":"Jenkins","constant":"JENKINS","env":["JENKINS_URL","BUILD_ID"],"pr":{"any":["ghprbPullId","CHANGE_ID"]}},{"name":"Magnum CI","constant":"MAGNUM","env":"MAGNUM"},{"name":"Netlify CI","constant":"NETLIFY","env":"NETLIFY_BUILD_BASE","pr":{"env":"PULL_REQUEST","ne":"false"}},{"name":"Sail CI","constant":"SAIL","env":"SAILCI","pr":"SAIL_PULL_REQUEST_NUMBER"},{"name":"Semaphore","constant":"SEMAPHORE","env":"SEMAPHORE","pr":"PULL_REQUEST_NUMBER"},{"name":"Shippable","constant":"SHIPPABLE","env":"SHIPPABLE","pr":{"IS_PULL_REQUEST":"true"}},{"name":"Solano CI","constant":"SOLANO","env":"TDDIUM","pr":"TDDIUM_PR_ID"},{"name":"Strider CD","constant":"STRIDER","env":"STRIDER"},{"name":"TaskCluster","constant":"TASKCLUSTER","env":["TASK_ID","RUN_ID"]},{"name":"TeamCity","constant":"TEAMCITY","env":"TEAMCITY_VERSION"},{"name":"Travis CI","constant":"TRAVIS","env":"TRAVIS","pr":{"env":"TRAVIS_PULL_REQUEST","ne":"false"}}]');
    },
    905: module => {
      "use strict";
      module.exports = JSON.parse('{"version":"6.14.18-4","name":"npm","description":"a package manager for JavaScript","license":"Artistic-2.0","engines":{"node":"6 >=6.2.0 || 8 || >=9.3.0"}}');
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
  !function() {
    if ("undefined" != typeof WScript) return WScript.echo("npm does not work when run\nwith the Windows Scripting Host\n\n'cd' to a different directory,\nor type 'npm.cmd <args>',\nor type 'node npm <args>'."), 
    void WScript.quit(1);
    process.title = "npm";
    var npm = __webpack_require__(613), unsupported = npm._unsupported;
    unsupported.checkForBrokenNode();
    var log = __webpack_require__(334);
    log.pause(), log.info("it worked if it ends with", "ok"), unsupported.checkForUnsupportedNode();
    var npmconf = npm._config, errorHandler = npm._errorHandler, replaceInfo = __webpack_require__(42), configDefs = npmconf.defs, shorthands = configDefs.shorthands, types = configDefs.types, nopt = __webpack_require__(166);
    "g" === process.argv[1][process.argv[1].length - 1] && process.argv.splice(1, 1, "npm", "-g");
    var args = replaceInfo(process.argv);
    log.verbose("cli", args);
    var conf = nopt(types, shorthands);
    if (npm.argv = conf.argv.remain, npm.deref(npm.argv[0]) ? npm.command = npm.argv.shift() : conf.usage = !0, 
    conf.version) return console.log(npm.version), errorHandler.exit(0);
    conf.versions && (npm.command = "version", conf.usage = !1, npm.argv = []), log.info("using", "npm@%s", npm.version), 
    log.info("using", "node@%s", process.version), process.on("uncaughtException", errorHandler), 
    process.on("unhandledRejection", errorHandler), conf.usage && "help" !== npm.command && (npm.argv.unshift(npm.command), 
    npm.command = "help");
    var isGlobalNpmUpdate = conf.global && [ "install", "update" ].includes(npm.command) && npm.argv.includes("npm");
    conf._exit = !0, npm.load(conf, (function(er) {
      if (er) return errorHandler(er);
      if (!isGlobalNpmUpdate && npm.config.get("update-notifier") && !unsupported.checkVersion(process.version).unsupported) {
        const pkg = __webpack_require__(905);
        let notifier = __webpack_require__(235)({
          pkg
        });
        const isCI = __webpack_require__(91).isCI;
        if (notifier.update && notifier.update.latest !== pkg.version && !isCI) {
          const color = __webpack_require__(987), useColor = npm.config.get("color"), useUnicode = npm.config.get("unicode"), old = notifier.update.current, latest = notifier.update.latest;
          let type = notifier.update.type;
          if (useColor) switch (type) {
           case "major":
            type = color.red(type);
            break;

           case "minor":
            type = color.yellow(type);
            break;

           case "patch":
            type = color.green(type);
          }
          const changelog = `https://github.com/npm/cli/releases/tag/v${latest}`;
          notifier.notify({
            message: `New ${type} version of ${pkg.name} available! ${useColor ? color.red(old) : old} ${useUnicode ? "→" : "->"} ${useColor ? color.green(latest) : latest}\n${useColor ? color.yellow("Changelog:") : "Changelog:"} ${useColor ? color.cyan(changelog) : changelog}\nRun ${useColor ? color.green(`npm install -g ${pkg.name}`) : `npm i -g ${pkg.name}`} to update!`
          });
        }
      }
      npm.commands[npm.command](npm.argv, (function(err) {
        err || !npm.config.get("ham-it-up") || npm.config.get("json") || npm.config.get("parseable") || "completion" === npm.command || console.error(`\n ${npm.config.get("unicode") ? "🎵 " : ""} I Have the Honour to Be Your Obedient Servant,${npm.config.get("unicode") ? "🎵 " : ""} ~ npm ${npm.config.get("unicode") ? "📜🖋 " : ""}\n`), 
        errorHandler.apply(this, arguments);
      }));
    }));
  }();
})();