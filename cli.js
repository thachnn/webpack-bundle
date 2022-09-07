#!/usr/bin/env node
!function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.l = !0, module.exports;
  }
  __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function(value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 810);
}({
  0: function(module, exports) {
    module.exports = require("path");
  },
  1: function(module, exports) {
    module.exports = require("fs");
  },
  2: function(module, exports) {
    function BrowserslistError(message) {
      this.name = "BrowserslistError", this.message = message, this.browserslist = !0, 
      Error.captureStackTrace && Error.captureStackTrace(this, BrowserslistError);
    }
    BrowserslistError.prototype = Error.prototype, module.exports = BrowserslistError;
  },
  810: function(module, exports, __webpack_require__) {
    var fs = __webpack_require__(1), browserslist = __webpack_require__(811), updateDb = __webpack_require__(812), pkg = __webpack_require__(816), args = process.argv.slice(2), USAGE = 'Usage:\n  npx browserslist\n  npx browserslist "QUERIES"\n  npx browserslist --json "QUERIES"\n  npx browserslist --config="path/to/browserlist/file"\n  npx browserslist --coverage "QUERIES"\n  npx browserslist --coverage=US "QUERIES"\n  npx browserslist --coverage=US,RU,global "QUERIES"\n  npx browserslist --env="environment name defined in config"\n  npx browserslist --stats="path/to/browserlist/stats/file"\n  npx browserslist --mobile-to-desktop\n  npx browserslist --update-db';
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
        areas = value ? value.split(",") : [ "global" ]) : "--json" === name ? mode = "json" : "--mobile-to-desktop" === name ? opts.mobileToDesktop = !0 : error("Unknown arguments " + args[i] + ".\n\n" + USAGE);
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
          browsers: browsers
        };
        coverage && (data.coverage = coverage.reduce((function(object, j) {
          return object[j[0]] = j[1], object;
        }), {})), process.stdout.write(JSON.stringify(data, null, "  ") + "\n");
      }
    }
  },
  811: function(module, exports) {
    module.exports = require("./index");
  },
  812: function(module, exports, __webpack_require__) {
    var childProcess = __webpack_require__(813), colorette = __webpack_require__(814), escalade = __webpack_require__(815), path = __webpack_require__(0), fs = __webpack_require__(1), BrowserslistError = __webpack_require__(2), red = colorette.red, bold = colorette.bold, green = colorette.green, yellow = colorette.yellow;
    function getBrowsersList() {
      return childProcess.execSync("npx browserslist").toString().trim().split("\n").map((function(line) {
        return line.trim().split(" ");
      })).reduce((function(result, entry) {
        return result[entry[0]] || (result[entry[0]] = []), result[entry[0]].push(entry[1]), 
        result;
      }), {});
    }
    function updateLockfile(lock, latest) {
      if ("npm" === lock.mode) {
        var fixed = function deletePackage(node) {
          if (node.dependencies) for (var i in delete node.dependencies["caniuse-lite"], node.dependencies) node.dependencies[i] = deletePackage(node.dependencies[i]);
          return node;
        }(JSON.parse(lock.content));
        return JSON.stringify(fixed, null, "  ");
      }
      var i, lines = lock.content.split("\n");
      if ("pnpm" === lock.mode) {
        for (i = 0; i < lines.length; i++) if (lines[i].indexOf("caniuse-lite:") >= 0) lines[i] = lines[i].replace(/: .*$/, ": " + latest.version); else if (lines[i].indexOf("/caniuse-lite") >= 0) for (lines[i] = lines[i].replace(/\/[^/:]+:/, "/" + latest.version + ":"), 
        i += 1; i < lines.length; i++) if (-1 !== lines[i].indexOf("integrity: ")) lines[i] = lines[i].replace(/integrity: .+/, "integrity: " + latest.dist.integrity); else if (-1 !== lines[i].indexOf(" /")) break;
      } else if ("yarn" === lock.mode) for (i = 0; i < lines.length; i++) -1 !== lines[i].indexOf("caniuse-lite@") && (lines[i + 1] = lines[i + 1].replace(/version "[^"]+"/, 'version "' + latest.version + '"'), 
      lines[i + 2] = lines[i + 2].replace(/resolved "[^"]+"/, 'resolved "' + latest.dist.tarball + '"'), 
      lines[i + 3] = lines[i + 3].replace(/integrity .+/, "integrity " + latest.dist.integrity), 
      i += 4);
      return lines.join("\n");
    }
    module.exports = function(print) {
      var lock = function() {
        var packageDir = escalade(".", (function(dir, names) {
          return -1 !== names.indexOf("package.json") ? dir : "";
        }));
        if (!packageDir) throw new BrowserslistError("Cannot find package.json. Is it a right project to run npx browserslist --update-db?");
        var lockfileNpm = path.join(packageDir, "package-lock.json"), lockfileYarn = path.join(packageDir, "yarn.lock"), lockfilePnpm = path.join(packageDir, "pnpm-lock.yaml");
        if (fs.existsSync(lockfilePnpm)) return {
          mode: "pnpm",
          file: lockfilePnpm
        };
        if (fs.existsSync(lockfileNpm)) return {
          mode: "npm",
          file: lockfileNpm
        };
        if (fs.existsSync(lockfileYarn)) return {
          mode: "yarn",
          file: lockfileYarn
        };
        throw new BrowserslistError('No lockfile found. Run "npm install", "yarn install" or "pnpm install"');
      }();
      lock.content = fs.readFileSync(lock.file).toString();
      var browsersListRetrievalError, oldBrowsersList, current = function(lock) {
        var match;
        if ("pnpm" === lock.mode) {
          if ((match = /\/caniuse-lite\/([^:]+):/.exec(lock.content))[1]) return match[1];
        } else if ("npm" === lock.mode) {
          var dependencies = JSON.parse(lock.content).dependencies;
          if (dependencies && dependencies["caniuse-lite"]) return dependencies["caniuse-lite"].version;
        } else if ("yarn" === lock.mode && (match = /caniuse-lite@[^:]+:\r?\n\s+version\s+"([^"]+)"/.exec(lock.content))[1]) return match[1];
        return null;
      }(lock), latest = function(lock) {
        return "yarn" !== lock.mode ? JSON.parse(childProcess.execSync("npm show caniuse-lite --json").toString()) : JSON.parse(childProcess.execSync("yarn info caniuse-lite --json").toString()).data;
      }(lock);
      try {
        oldBrowsersList = getBrowsersList();
      } catch (e) {
        browsersListRetrievalError = e;
      }
      "string" == typeof current && print("Current version: " + bold(red(current)) + "\n"), 
      print("New version:     " + bold(green(latest.version)) + "\nRemoving old caniuse-lite from lock file\n"), 
      fs.writeFileSync(lock.file, updateLockfile(lock, latest));
      var install = "yarn" === lock.mode ? "yarn add -W" : lock.mode + " install";
      print("Installing new caniuse-lite version\n" + yellow("$ " + install + " caniuse-lite") + "\n");
      try {
        childProcess.execSync(install + " caniuse-lite");
      } catch (e) {
        print(red("\n" + e.stack + "\n\nProblem with `" + install + "  caniuse-lite` call. Run it manually.\n")), 
        process.exit(1);
      }
      var currentBrowsersList, del = "yarn" === lock.mode ? "yarn remove -W" : lock.mode + " uninstall";
      if (print("Cleaning package.json dependencies from caniuse-lite\n" + yellow("$ " + del + " caniuse-lite") + "\n"), 
      childProcess.execSync(del + " caniuse-lite"), print("caniuse-lite has been successfully updated\n"), 
      !browsersListRetrievalError) try {
        currentBrowsersList = getBrowsersList();
      } catch (e) {
        browsersListRetrievalError = e;
      }
      if (browsersListRetrievalError) print(red("\n" + browsersListRetrievalError.stack + "\n\nProblem with browsers list retrieval.\nTarget browser changes won’t be shown.\n")); else {
        var targetBrowserChanges = function(old, current) {
          return Object.keys(old).concat(Object.keys(current).filter((function(browser) {
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
              return red("- " + browser + " " + version);
            })).concat(addedVersions.map((function(version) {
              return green("+ " + browser + " " + version);
            })));
          })).reduce((function(result, array) {
            return result.concat(array);
          }), []).join("\n");
        }(oldBrowsersList, currentBrowsersList);
        targetBrowserChanges ? (print("\nTarget browser changes:\n"), print(targetBrowserChanges + "\n")) : print("\n" + green("No target browser changes") + "\n");
      }
    };
  },
  813: function(module, exports) {
    module.exports = require("child_process");
  },
  814: function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "options", (function() {
      return options;
    })), __webpack_require__.d(__webpack_exports__, "reset", (function() {
      return reset;
    })), __webpack_require__.d(__webpack_exports__, "bold", (function() {
      return bold;
    })), __webpack_require__.d(__webpack_exports__, "dim", (function() {
      return dim;
    })), __webpack_require__.d(__webpack_exports__, "italic", (function() {
      return italic;
    })), __webpack_require__.d(__webpack_exports__, "underline", (function() {
      return underline;
    })), __webpack_require__.d(__webpack_exports__, "inverse", (function() {
      return inverse;
    })), __webpack_require__.d(__webpack_exports__, "hidden", (function() {
      return hidden;
    })), __webpack_require__.d(__webpack_exports__, "strikethrough", (function() {
      return strikethrough;
    })), __webpack_require__.d(__webpack_exports__, "black", (function() {
      return black;
    })), __webpack_require__.d(__webpack_exports__, "red", (function() {
      return red;
    })), __webpack_require__.d(__webpack_exports__, "green", (function() {
      return green;
    })), __webpack_require__.d(__webpack_exports__, "yellow", (function() {
      return yellow;
    })), __webpack_require__.d(__webpack_exports__, "blue", (function() {
      return blue;
    })), __webpack_require__.d(__webpack_exports__, "magenta", (function() {
      return magenta;
    })), __webpack_require__.d(__webpack_exports__, "cyan", (function() {
      return cyan;
    })), __webpack_require__.d(__webpack_exports__, "white", (function() {
      return white;
    })), __webpack_require__.d(__webpack_exports__, "gray", (function() {
      return gray;
    })), __webpack_require__.d(__webpack_exports__, "bgBlack", (function() {
      return bgBlack;
    })), __webpack_require__.d(__webpack_exports__, "bgRed", (function() {
      return bgRed;
    })), __webpack_require__.d(__webpack_exports__, "bgGreen", (function() {
      return bgGreen;
    })), __webpack_require__.d(__webpack_exports__, "bgYellow", (function() {
      return bgYellow;
    })), __webpack_require__.d(__webpack_exports__, "bgBlue", (function() {
      return bgBlue;
    })), __webpack_require__.d(__webpack_exports__, "bgMagenta", (function() {
      return bgMagenta;
    })), __webpack_require__.d(__webpack_exports__, "bgCyan", (function() {
      return bgCyan;
    })), __webpack_require__.d(__webpack_exports__, "bgWhite", (function() {
      return bgWhite;
    })), __webpack_require__.d(__webpack_exports__, "blackBright", (function() {
      return blackBright;
    })), __webpack_require__.d(__webpack_exports__, "redBright", (function() {
      return redBright;
    })), __webpack_require__.d(__webpack_exports__, "greenBright", (function() {
      return greenBright;
    })), __webpack_require__.d(__webpack_exports__, "yellowBright", (function() {
      return yellowBright;
    })), __webpack_require__.d(__webpack_exports__, "blueBright", (function() {
      return blueBright;
    })), __webpack_require__.d(__webpack_exports__, "magentaBright", (function() {
      return magentaBright;
    })), __webpack_require__.d(__webpack_exports__, "cyanBright", (function() {
      return cyanBright;
    })), __webpack_require__.d(__webpack_exports__, "whiteBright", (function() {
      return whiteBright;
    })), __webpack_require__.d(__webpack_exports__, "bgBlackBright", (function() {
      return bgBlackBright;
    })), __webpack_require__.d(__webpack_exports__, "bgRedBright", (function() {
      return bgRedBright;
    })), __webpack_require__.d(__webpack_exports__, "bgGreenBright", (function() {
      return bgGreenBright;
    })), __webpack_require__.d(__webpack_exports__, "bgYellowBright", (function() {
      return bgYellowBright;
    })), __webpack_require__.d(__webpack_exports__, "bgBlueBright", (function() {
      return bgBlueBright;
    })), __webpack_require__.d(__webpack_exports__, "bgMagentaBright", (function() {
      return bgMagentaBright;
    })), __webpack_require__.d(__webpack_exports__, "bgCyanBright", (function() {
      return bgCyanBright;
    })), __webpack_require__.d(__webpack_exports__, "bgWhiteBright", (function() {
      return bgWhiteBright;
    }));
    let enabled = !("NO_COLOR" in process.env) && ("FORCE_COLOR" in process.env || "win32" === process.platform || null != process.stdout && process.stdout.isTTY && process.env.TERM && "dumb" !== process.env.TERM);
    const raw = (open, close, searchRegex, replaceValue) => s => enabled ? open + (~(s += "").indexOf(close, 4) ? s.replace(searchRegex, replaceValue) : s) + close : s, init = (open, close) => raw(`[${open}m`, `[${close}m`, new RegExp(`\\x1b\\[${close}m`, "g"), `[${open}m`), options = Object.defineProperty({}, "enabled", {
      get: () => enabled,
      set: value => enabled = value
    }), reset = init(0, 0), bold = raw("[1m", "[22m", /\x1b\[22m/g, "[22m[1m"), dim = raw("[2m", "[22m", /\x1b\[22m/g, "[22m[2m"), italic = init(3, 23), underline = init(4, 24), inverse = init(7, 27), hidden = init(8, 28), strikethrough = init(9, 29), black = init(30, 39), red = init(31, 39), green = init(32, 39), yellow = init(33, 39), blue = init(34, 39), magenta = init(35, 39), cyan = init(36, 39), white = init(37, 39), gray = init(90, 39), bgBlack = init(40, 49), bgRed = init(41, 49), bgGreen = init(42, 49), bgYellow = init(43, 49), bgBlue = init(44, 49), bgMagenta = init(45, 49), bgCyan = init(46, 49), bgWhite = init(47, 49), blackBright = init(90, 39), redBright = init(91, 39), greenBright = init(92, 39), yellowBright = init(93, 39), blueBright = init(94, 39), magentaBright = init(95, 39), cyanBright = init(96, 39), whiteBright = init(97, 39), bgBlackBright = init(100, 49), bgRedBright = init(101, 49), bgGreenBright = init(102, 49), bgYellowBright = init(103, 49), bgBlueBright = init(104, 49), bgMagentaBright = init(105, 49), bgCyanBright = init(106, 49), bgWhiteBright = init(107, 49);
  },
  815: function(module, exports, __webpack_require__) {
    const {dirname: dirname, resolve: resolve} = __webpack_require__(0), {readdirSync: readdirSync, statSync: statSync} = __webpack_require__(1);
    module.exports = function(start, callback) {
      let tmp, dir = resolve(".", start);
      for (statSync(dir).isDirectory() || (dir = dirname(dir)); ;) {
        if (tmp = callback(dir, readdirSync(dir)), tmp) return resolve(dir, tmp);
        if (dir = dirname(tmp = dir), tmp === dir) break;
      }
    };
  },
  816: function(module) {
    module.exports = JSON.parse('{"name":"browserslist","version":"4.14.7","description":"Share target browsers between different front-end tools, like Autoprefixer, Stylelint and babel-env-preset"}');
  }
});