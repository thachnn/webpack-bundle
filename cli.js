#!/usr/bin/env node
(() => {
  var __webpack_modules__ = {
    9667: module => {
      function BrowserslistError(message) {
        this.name = "BrowserslistError", this.message = message, this.browserslist = !0, 
        Error.captureStackTrace && Error.captureStackTrace(this, BrowserslistError);
      }
      BrowserslistError.prototype = Error.prototype, module.exports = BrowserslistError;
    },
    76793: (module, __unused_webpack_exports, __webpack_require__) => {
      var childProcess = __webpack_require__(32081), escalade = __webpack_require__(81045), pico = __webpack_require__(28901), path = __webpack_require__(71017), fs = __webpack_require__(57147), BrowserslistError = __webpack_require__(9667);
      function getBrowsersList() {
        return childProcess.execSync("npx browserslist").toString().trim().split("\n").map((function(line) {
          return line.trim().split(" ");
        })).reduce((function(result, entry) {
          return result[entry[0]] || (result[entry[0]] = []), result[entry[0]].push(entry[1]), 
          result;
        }), {});
      }
      function updateNpmLockfile(lock, latest) {
        var metadata = {
          latest,
          versions: []
        }, content = deletePackage(JSON.parse(lock.content), metadata);
        return metadata.content = JSON.stringify(content, null, "  "), metadata;
      }
      function deletePackage(node, metadata) {
        if (node.dependencies) {
          if (node.dependencies["caniuse-lite"]) {
            var version = node.dependencies["caniuse-lite"].version;
            metadata.versions[version] = !0, delete node.dependencies["caniuse-lite"];
          }
          for (var i in node.dependencies) node.dependencies[i] = deletePackage(node.dependencies[i], metadata);
        }
        return node;
      }
      var yarnVersionRe = /version "(.*?)"/;
      function updateLockfile(lock, latest) {
        return lock.content || (lock.content = fs.readFileSync(lock.file).toString()), "yarn" === lock.mode ? function(lock, latest) {
          var blocks = lock.content.split(/(\n{2,})/).map((function(block) {
            return block.split("\n");
          })), versions = {};
          return blocks.forEach((function(lines) {
            if (-1 !== lines[0].indexOf("caniuse-lite@")) {
              var match = yarnVersionRe.exec(lines[1]);
              versions[match[1]] = !0, match[1] !== latest.version && (lines[1] = lines[1].replace(/version "[^"]+"/, 'version "' + latest.version + '"'), 
              lines[2] = lines[2].replace(/resolved "[^"]+"/, 'resolved "' + latest.dist.tarball + '"'), 
              4 === lines.length && (lines[3] = latest.dist.integrity ? lines[3].replace(/integrity .+/, "integrity " + latest.dist.integrity) : ""));
            }
          })), {
            content: blocks.map((function(lines) {
              return lines.join("\n");
            })).join(""),
            versions
          };
        }(lock, latest) : updateNpmLockfile(lock, latest);
      }
      function updateWith(print, cmd) {
        print("Updating caniuse-lite version\n" + pico.yellow("$ " + cmd) + "\n");
        try {
          childProcess.execSync(cmd);
        } catch (e) {
          print(pico.red(e.stdout.toString())), print(pico.red("\n" + e.stack + "\n\nProblem with `" + cmd + "` call. Run it manually.\n")), 
          process.exit(1);
        }
      }
      module.exports = function(print) {
        var browsersListRetrievalError, oldBrowsersList, currentBrowsersList, old, current, lock = function() {
          var packageDir = escalade(".", (function(dir, names) {
            return -1 !== names.indexOf("package.json") ? dir : "";
          }));
          if (!packageDir) throw new BrowserslistError("Cannot find package.json. Is this the right directory to run `npx browserslist --update-db` in?");
          var lockfileNpm = path.join(packageDir, "package-lock.json"), lockfileShrinkwrap = path.join(packageDir, "npm-shrinkwrap.json"), lockfileYarn = path.join(packageDir, "yarn.lock"), lockfilePnpm = path.join(packageDir, "pnpm-lock.yaml");
          if (fs.existsSync(lockfilePnpm)) return {
            mode: "pnpm",
            file: lockfilePnpm
          };
          if (fs.existsSync(lockfileNpm)) return {
            mode: "npm",
            file: lockfileNpm
          };
          if (fs.existsSync(lockfileYarn)) {
            var lock = {
              mode: "yarn",
              file: lockfileYarn
            };
            return lock.content = fs.readFileSync(lock.file).toString(), lock.version = /# yarn lockfile v1/.test(lock.content) ? 1 : 2, 
            lock;
          }
          if (fs.existsSync(lockfileShrinkwrap)) return {
            mode: "npm",
            file: lockfileShrinkwrap
          };
          throw new BrowserslistError('No lockfile found. Run "npm install", "yarn install" or "pnpm install"');
        }(), latest = function(lock) {
          return "yarn" === lock.mode ? 1 === lock.version ? JSON.parse(childProcess.execSync("yarn info caniuse-lite --json").toString()).data : JSON.parse(childProcess.execSync("yarn npm info caniuse-lite --json").toString()) : JSON.parse(childProcess.execSync("npm show caniuse-lite --json").toString());
        }(lock);
        try {
          oldBrowsersList = getBrowsersList();
        } catch (e) {
          browsersListRetrievalError = e;
        }
        if (print("Latest version:     " + pico.bold(pico.green(latest.version)) + "\n"), 
        "yarn" === lock.mode && 1 !== lock.version ? updateWith(print, "yarn up -R caniuse-lite") : "pnpm" === lock.mode ? updateWith(print, "pnpm up caniuse-lite") : function(print, lock, latest) {
          var lockfileData = updateLockfile(lock, latest), caniuseVersions = Object.keys(lockfileData.versions).sort();
          if (1 !== caniuseVersions.length || caniuseVersions[0] !== latest.version) {
            0 === caniuseVersions.length && (caniuseVersions[0] = "none"), print("Installed version" + (1 === caniuseVersions.length ? ":  " : "s: ") + pico.bold(pico.red(caniuseVersions.join(", "))) + "\nRemoving old caniuse-lite from lock file\n"), 
            fs.writeFileSync(lock.file, lockfileData.content);
            var install = "yarn" === lock.mode ? "yarn add -W" : lock.mode + " install";
            print("Installing new caniuse-lite version\n" + pico.yellow("$ " + install + " caniuse-lite") + "\n");
            try {
              childProcess.execSync(install + " caniuse-lite");
            } catch (e) {
              print(pico.red("\n" + e.stack + "\n\nProblem with `" + install + " caniuse-lite` call. Run it manually.\n")), 
              process.exit(1);
            }
            var del = "yarn" === lock.mode ? "yarn remove -W" : lock.mode + " uninstall";
            print("Cleaning package.json dependencies from caniuse-lite\n" + pico.yellow("$ " + del + " caniuse-lite") + "\n"), 
            childProcess.execSync(del + " caniuse-lite");
          } else print("Installed version:  " + pico.bold(pico.green(latest.version)) + "\n" + pico.bold(pico.green("caniuse-lite is up to date")) + "\n");
        }(print, lock, latest), print("caniuse-lite has been successfully updated\n"), !browsersListRetrievalError) try {
          currentBrowsersList = getBrowsersList();
        } catch (e) {
          browsersListRetrievalError = e;
        }
        if (browsersListRetrievalError) print(pico.red("\n" + browsersListRetrievalError.stack + "\n\nProblem with browser list retrieval.\nTarget browser changes won’t be shown.\n")); else {
          var targetBrowserChanges = (old = oldBrowsersList, current = currentBrowsersList, 
          Object.keys(old).concat(Object.keys(current).filter((function(browser) {
            return void 0 === old[browser];
          }))).map((function(browser) {
            var oldVersions = old[browser] || [], currentVersions = current[browser] || [], intersection = oldVersions.filter((function(version) {
              return -1 !== currentVersions.indexOf(version);
            })), addedVersions = currentVersions.filter((function(version) {
              return -1 === intersection.indexOf(version);
            }));
            return oldVersions.filter((function(version) {
              return -1 === intersection.indexOf(version);
            })).map((function(version) {
              return pico.red("- " + browser + " " + version);
            })).concat(addedVersions.map((function(version) {
              return pico.green("+ " + browser + " " + version);
            })));
          })).reduce((function(result, array) {
            return result.concat(array);
          }), []).join("\n"));
          targetBrowserChanges ? (print("\nTarget browser changes:\n"), print(targetBrowserChanges + "\n")) : print("\n" + pico.green("No target browser changes") + "\n");
        }
      };
    },
    81045: (module, __unused_webpack_exports, __webpack_require__) => {
      const {dirname, resolve} = __webpack_require__(71017), {readdirSync, statSync} = __webpack_require__(57147);
      module.exports = function(start, callback) {
        let tmp, dir = resolve(".", start);
        for (statSync(dir).isDirectory() || (dir = dirname(dir)); ;) {
          if (tmp = callback(dir, readdirSync(dir)), tmp) return resolve(dir, tmp);
          if (dir = dirname(tmp = dir), tmp === dir) break;
        }
      };
    },
    28901: (module, __unused_webpack_exports, __webpack_require__) => {
      let tty = __webpack_require__(76224), isColorSupported = !("NO_COLOR" in process.env || process.argv.includes("--no-color")) && ("FORCE_COLOR" in process.env || process.argv.includes("--color") || "win32" === process.platform || tty.isatty(1) && "dumb" !== process.env.TERM || "CI" in process.env), formatter = (open, close, replace = open) => input => {
        let string = "" + input, index = string.indexOf(close, open.length);
        return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
      }, replaceClose = (string, close, replace, index) => {
        let start = string.substring(0, index) + replace, end = string.substring(index + close.length), nextIndex = end.indexOf(close);
        return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
      }, createColors = (enabled = isColorSupported) => ({
        isColorSupported: enabled,
        reset: enabled ? s => `[0m${s}[0m` : String,
        bold: enabled ? formatter("[1m", "[22m", "[22m[1m") : String,
        dim: enabled ? formatter("[2m", "[22m", "[22m[2m") : String,
        italic: enabled ? formatter("[3m", "[23m") : String,
        underline: enabled ? formatter("[4m", "[24m") : String,
        inverse: enabled ? formatter("[7m", "[27m") : String,
        hidden: enabled ? formatter("[8m", "[28m") : String,
        strikethrough: enabled ? formatter("[9m", "[29m") : String,
        black: enabled ? formatter("[30m", "[39m") : String,
        red: enabled ? formatter("[31m", "[39m") : String,
        green: enabled ? formatter("[32m", "[39m") : String,
        yellow: enabled ? formatter("[33m", "[39m") : String,
        blue: enabled ? formatter("[34m", "[39m") : String,
        magenta: enabled ? formatter("[35m", "[39m") : String,
        cyan: enabled ? formatter("[36m", "[39m") : String,
        white: enabled ? formatter("[37m", "[39m") : String,
        gray: enabled ? formatter("[90m", "[39m") : String,
        bgBlack: enabled ? formatter("[40m", "[49m") : String,
        bgRed: enabled ? formatter("[41m", "[49m") : String,
        bgGreen: enabled ? formatter("[42m", "[49m") : String,
        bgYellow: enabled ? formatter("[43m", "[49m") : String,
        bgBlue: enabled ? formatter("[44m", "[49m") : String,
        bgMagenta: enabled ? formatter("[45m", "[49m") : String,
        bgCyan: enabled ? formatter("[46m", "[49m") : String,
        bgWhite: enabled ? formatter("[47m", "[49m") : String
      });
      module.exports = createColors(), module.exports.createColors = createColors;
    },
    82565: module => {
      "use strict";
      module.exports = require("./index");
    },
    32081: module => {
      "use strict";
      module.exports = require("child_process");
    },
    57147: module => {
      "use strict";
      module.exports = require("fs");
    },
    71017: module => {
      "use strict";
      module.exports = require("path");
    },
    76224: module => {
      "use strict";
      module.exports = require("tty");
    },
    44029: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"browserslist","version":"4.20.4","description":"Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-env-preset"}');
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
    var fs = __webpack_require__(57147), browserslist = __webpack_require__(82565), updateDb = __webpack_require__(76793), pkg = __webpack_require__(44029), args = process.argv.slice(2), USAGE = 'Usage:\n  npx browserslist\n  npx browserslist "QUERIES"\n  npx browserslist --json "QUERIES"\n  npx browserslist --config="path/to/browserlist/file"\n  npx browserslist --coverage "QUERIES"\n  npx browserslist --coverage=US "QUERIES"\n  npx browserslist --coverage=US,RU,global "QUERIES"\n  npx browserslist --env="environment name defined in config"\n  npx browserslist --stats="path/to/browserlist/stats/file"\n  npx browserslist --mobile-to-desktop\n  npx browserslist --ignore-unknown-versions\n  npx browserslist --update-db';
    function isArg(arg) {
      return args.some((function(str) {
        return str === arg || 0 === str.indexOf(arg + "=");
      }));
    }
    function error(msg) {
      process.stderr.write("browserslist: " + msg + "\n"), process.exit(1);
    }
    if (isArg("--help") || isArg("-h")) process.stdout.write(pkg.description + ".\n\n" + USAGE + "\n"); else if (isArg("--version") || isArg("-v")) process.stdout.write("browserslist " + pkg.version + "\n"); else if (isArg("--update-db")) updateDb((function(str) {
      process.stdout.write(str);
    })); else {
      for (var queries, areas, browsers, coverage, mode = "browsers", opts = {}, i = 0; i < args.length; i++) if ("-" === args[i][0]) {
        var arg = args[i].split("="), name = arg[0], value = arg[1];
        value && (value = value.replace(/^["']|["']$/g, "")), "--config" === name || "-b" === name ? opts.config = value : "--env" === name || "-e" === name ? opts.env = value : "--stats" === name || "-s" === name ? opts.stats = value : "--coverage" === name || "-c" === name ? ("json" !== mode && (mode = "coverage"), 
        areas = value ? value.split(",") : [ "global" ]) : "--json" === name ? mode = "json" : "--mobile-to-desktop" === name ? opts.mobileToDesktop = !0 : "--ignore-unknown-versions" === name ? opts.ignoreUnknownVersions = !0 : error("Unknown arguments " + args[i] + ".\n\n" + USAGE);
      } else queries = args[i].replace(/^["']|["']$/g, "");
      try {
        browsers = browserslist(queries, opts);
      } catch (e) {
        if ("BrowserslistError" !== e.name) throw e;
        error(e.message);
      }
      if ("browsers" === mode) browsers.forEach((function(browser) {
        process.stdout.write(browser + "\n");
      })); else if (areas && (coverage = areas.map((function(area) {
        var stats;
        "global" !== area ? stats = area : opts.stats && (stats = JSON.parse(fs.readFileSync(opts.stats)));
        var result = browserslist.coverage(browsers, stats);
        return [ area, Math.round(100 * result) / 100 ];
      })), "coverage" === mode)) {
        var prefix = "These browsers account for ";
        process.stdout.write(prefix), coverage.forEach((function(data, index) {
          var area = data[0], round = data[1], end = "globally";
          area && "global" !== area ? end = "in the " + area.toUpperCase() : opts.stats && (end = "in custom statistics"), 
          0 !== index && process.stdout.write(prefix.replace(/./g, " ")), process.stdout.write(round + "% of all users " + end + "\n");
        }));
      }
      if ("json" === mode) {
        var data = {
          browsers
        };
        coverage && (data.coverage = coverage.reduce((function(object, j) {
          return object[j[0]] = j[1], object;
        }), {})), process.stdout.write(JSON.stringify(data, null, "  ") + "\n");
      }
    }
  })();
})();