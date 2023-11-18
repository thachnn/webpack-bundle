#!/usr/bin/env node
"use strict";
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
  __webpack_require__(9);
}([ function(module, exports) {
  module.exports = require("path");
}, function(module, exports) {
  module.exports = require("webpack");
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports) {
  const GROUPS = {
    CONFIG_GROUP: "Config options:",
    BASIC_GROUP: "Basic options:",
    MODULE_GROUP: "Module options:",
    OUTPUT_GROUP: "Output options:",
    ADVANCED_GROUP: "Advanced options:",
    RESOLVE_GROUP: "Resolving options:",
    OPTIMIZE_GROUP: "Optimizing options:",
    DISPLAY_GROUP: "Stats options:"
  };
  module.exports = {
    NON_COMPILATION_ARGS: [ "init", "migrate", "serve", "generate-loader", "generate-plugin", "info" ],
    GROUPS: GROUPS,
    WEBPACK_OPTIONS_FLAG: "WEBPACK_OPTIONS"
  };
}, function(module, exports) {
  module.exports = require("os");
}, function(module, exports) {
  module.exports = require("child_process");
}, function(module, exports, __webpack_require__) {
  const path = __webpack_require__(0), prefix = __webpack_require__(21);
  let gm;
  module.exports = gm || (gm = "win32" === process.platform || "msys" === process.env.OSTYPE || "cygwin" === process.env.OSTYPE ? path.resolve(prefix, "node_modules") : path.resolve(prefix, "lib/node_modules"));
}, function(module, exports, __webpack_require__) {
  const os = __webpack_require__(4), hasFlag = __webpack_require__(32), {env: env} = process;
  let forceColor;
  function getSupportLevel(stream) {
    return function(level) {
      return 0 !== level && {
        level: level,
        hasBasic: !0,
        has256: level >= 2,
        has16m: level >= 3
      };
    }(function(stream) {
      if (0 === forceColor) return 0;
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
      if (hasFlag("color=256")) return 2;
      if (stream && !stream.isTTY && void 0 === forceColor) return 0;
      const min = forceColor || 0;
      if ("dumb" === env.TERM) return min;
      if ("win32" === process.platform) {
        const osRelease = os.release().split(".");
        return Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
      }
      if ("CI" in env) return [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI" ].some(sign => sign in env) || "codeship" === env.CI_NAME ? 1 : min;
      if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      if ("truecolor" === env.COLORTERM) return 3;
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
         case "iTerm.app":
          return version >= 3 ? 3 : 2;

         case "Apple_Terminal":
          return 2;
        }
      }
      return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : min;
    }(stream));
  }
  hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never") ? forceColor = 0 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (forceColor = 1), 
  "FORCE_COLOR" in env && (forceColor = !0 === env.FORCE_COLOR || "true" === env.FORCE_COLOR ? 1 : !1 === env.FORCE_COLOR || "false" === env.FORCE_COLOR ? 0 : 0 === env.FORCE_COLOR.length ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3)), 
  module.exports = {
    supportsColor: getSupportLevel,
    stdout: getSupportLevel(process.stdout),
    stderr: getSupportLevel(process.stderr)
  };
}, function(module, exports) {
  module.exports = function(module) {
    return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
    module.children || (module.children = []), Object.defineProperty(module, "loaded", {
      enumerable: !0,
      get: function() {
        return module.l;
      }
    }), Object.defineProperty(module, "id", {
      enumerable: !0,
      get: function() {
        return module.i;
      }
    }), module.webpackPolyfill = 1), module;
  };
}, function(module, exports, __webpack_require__) {
  const {NON_COMPILATION_ARGS: NON_COMPILATION_ARGS} = __webpack_require__(3);
  !function() {
    if (__webpack_require__(10)(__filename)) return;
    __webpack_require__(18);
    const ErrorHelpers = __webpack_require__(19), NON_COMPILATION_CMD = process.argv.find(arg => ("serve" === arg && (global.process.argv = global.process.argv.filter(a => "serve" !== a), 
    process.argv = global.process.argv), NON_COMPILATION_ARGS.find(a => a === arg)));
    if (NON_COMPILATION_CMD) return __webpack_require__(20)(NON_COMPILATION_CMD, ...process.argv);
    const yargs = __webpack_require__(28).usage(`webpack-cli ${__webpack_require__(29).version}\n\nUsage: webpack-cli [options]\n       webpack-cli [options] --entry <entry> --output <output>\n       webpack-cli [options] <entries...> --output <output>\n       webpack-cli <command> [options]\n\nFor more information, see https://webpack.js.org/api/cli/.`);
    __webpack_require__(30)(yargs), yargs.parse(process.argv.slice(2), (err, argv, output) => {
      if (Error.stackTraceLimit = 30, err && output) return console.error(output), void (process.exitCode = 1);
      if (output) return void console.log(output);
      let options;
      argv.verbose && (argv.display = "verbose");
      try {
        options = __webpack_require__(33)(argv);
      } catch (err) {
        if ("MODULE_NOT_FOUND" === err.code) {
          const moduleName = err.message.split("'")[1];
          let instructions = "", errorMessage = "";
          if ("webpack" === moduleName) return errorMessage = `\n${moduleName} not installed`, 
          instructions = `Install webpack to start bundling: [32m\n  $ npm install --save-dev ${moduleName}\n`, 
          void 0 !== process.env.npm_execpath && process.env.npm_execpath.includes("yarn") && (instructions = `Install webpack to start bundling: [32m\n $ yarn add ${moduleName} --dev\n`), 
          Error.stackTraceLimit = 1, console.error(`${errorMessage}\n\n${instructions}`), 
          void (process.exitCode = 1);
        }
        if ("ValidationError" !== err.name) throw err;
        const stack = ErrorHelpers.cleanUpWebpackOptions(err.stack, err.message), message = err.message + "\n" + stack;
        return argv.color ? console.error(`[1m[31m${message}[39m[22m`) : console.error(message), 
        void (process.exitCode = 1);
      }
      const stdout = argv.silent ? {
        write: () => {}
      } : process.stdout;
      function ifArg(name, fn, init) {
        Array.isArray(argv[name]) ? (init && init(), argv[name].forEach(fn)) : void 0 !== argv[name] && (init && init(), 
        fn(argv[name], -1));
      }
      !function processOptions(options) {
        if ("function" == typeof options.then) return void options.then(processOptions).catch((function(err) {
          console.error(err.stack || err), process.exit(1);
        }));
        const firstOptions = [].concat(options)[0], statsPresetToOptions = __webpack_require__(1).Stats.presetToOptions;
        let outputOptions = options.stats;
        "boolean" == typeof outputOptions || "string" == typeof outputOptions ? outputOptions = statsPresetToOptions(outputOptions) : outputOptions || (outputOptions = {}), 
        ifArg("display", (function(preset) {
          outputOptions = statsPresetToOptions(preset);
        })), outputOptions = Object.create(outputOptions), Array.isArray(options) && !outputOptions.children && (outputOptions.children = options.map(o => o.stats)), 
        void 0 === outputOptions.context && (outputOptions.context = firstOptions.context), 
        ifArg("env", (function(value) {
          outputOptions.env && (outputOptions._env = value);
        })), ifArg("json", (function(bool) {
          bool && (outputOptions.json = bool, outputOptions.modules = bool);
        })), void 0 === outputOptions.colors && (outputOptions.colors = __webpack_require__(7).stdout), 
        ifArg("sort-modules-by", (function(value) {
          outputOptions.modulesSort = value;
        })), ifArg("sort-chunks-by", (function(value) {
          outputOptions.chunksSort = value;
        })), ifArg("sort-assets-by", (function(value) {
          outputOptions.assetsSort = value;
        })), ifArg("display-exclude", (function(value) {
          outputOptions.exclude = value;
        })), outputOptions.json || (void 0 === outputOptions.cached && (outputOptions.cached = !1), 
        void 0 === outputOptions.cachedAssets && (outputOptions.cachedAssets = !1), ifArg("display-chunks", (function(bool) {
          bool && (outputOptions.modules = !1, outputOptions.chunks = !0, outputOptions.chunkModules = !0);
        })), ifArg("display-entrypoints", (function(bool) {
          outputOptions.entrypoints = bool;
        })), ifArg("display-reasons", (function(bool) {
          bool && (outputOptions.reasons = !0);
        })), ifArg("display-depth", (function(bool) {
          bool && (outputOptions.depth = !0);
        })), ifArg("display-used-exports", (function(bool) {
          bool && (outputOptions.usedExports = !0);
        })), ifArg("display-provided-exports", (function(bool) {
          bool && (outputOptions.providedExports = !0);
        })), ifArg("display-optimization-bailout", (function(bool) {
          bool && (outputOptions.optimizationBailout = bool);
        })), ifArg("display-error-details", (function(bool) {
          bool && (outputOptions.errorDetails = !0);
        })), ifArg("display-origins", (function(bool) {
          bool && (outputOptions.chunkOrigins = !0);
        })), ifArg("display-max-modules", (function(value) {
          outputOptions.maxModules = +value;
        })), ifArg("display-cached", (function(bool) {
          bool && (outputOptions.cached = !0);
        })), ifArg("display-cached-assets", (function(bool) {
          bool && (outputOptions.cachedAssets = !0);
        })), outputOptions.exclude || (outputOptions.exclude = [ "node_modules", "bower_components", "components" ]), 
        argv["display-modules"] && (outputOptions.maxModules = 1 / 0, outputOptions.exclude = void 0, 
        outputOptions.modules = !0)), ifArg("hide-modules", (function(bool) {
          bool && (outputOptions.modules = !1, outputOptions.chunkModules = !1);
        })), ifArg("info-verbosity", (function(value) {
          outputOptions.infoVerbosity = value;
        })), ifArg("build-delimiter", (function(value) {
          outputOptions.buildDelimiter = value;
        }));
        const webpack = __webpack_require__(1);
        let compiler, lastHash = null;
        try {
          compiler = webpack(options);
        } catch (err) {
          throw "WebpackOptionsValidationError" === err.name && (argv.color ? console.error(`[1m[31m${err.message}[39m[22m`) : console.error(err.message), 
          process.exit(1)), err;
        }
        if (argv.progress) {
          new (0, __webpack_require__(1).ProgressPlugin)({
            profile: argv.profile
          }).apply(compiler);
        }
        function compilerCallback(err, stats) {
          if (options.watch && !err || compiler.purgeInputFileSystem(), err) return lastHash = null, 
          console.error(err.stack || err), err.details && console.error(err.details), void (process.exitCode = 1);
          if (outputOptions.json) stdout.write(JSON.stringify(stats.toJson(outputOptions), null, 2) + "\n"); else if (stats.hash !== lastHash) {
            if (lastHash = stats.hash, stats.compilation && 0 !== stats.compilation.errors.length) {
              "EntryModuleNotFoundError" === stats.compilation.errors[0].name && (console.error("\n[1m[31mInsufficient number of arguments or no entry found."), 
              console.error("[1m[31mAlternatively, run 'webpack(-cli) --help' for usage info.[39m[22m\n"));
            }
            const statsString = stats.toString(outputOptions), delimiter = outputOptions.buildDelimiter ? outputOptions.buildDelimiter + "\n" : "";
            statsString && stdout.write(`${statsString}\n${delimiter}`);
          }
          !options.watch && stats.hasErrors() && (process.exitCode = 2);
        }
        if ("verbose" === outputOptions.infoVerbosity && (argv.w ? compiler.hooks.watchRun.tap("WebpackInfo", compilation => {
          const compilationName = compilation.name ? compilation.name : "";
          console.error("\nCompilation " + compilationName + " starting…\n");
        }) : compiler.hooks.beforeRun.tap("WebpackInfo", compilation => {
          const compilationName = compilation.name ? compilation.name : "";
          console.error("\nCompilation " + compilationName + " starting…\n");
        }), compiler.hooks.done.tap("WebpackInfo", compilation => {
          const compilationName = compilation.name ? compilation.name : "";
          console.error("\nCompilation " + compilationName + " finished\n");
        })), firstOptions.watch || options.watch) {
          const watchOptions = firstOptions.watchOptions || options.watchOptions || firstOptions.watch || options.watch || {};
          watchOptions.stdin && (process.stdin.on("end", (function(_) {
            process.exit();
          })), process.stdin.resume()), compiler.watch(watchOptions, compilerCallback), "none" !== outputOptions.infoVerbosity && console.error("\nwebpack is watching the files…\n");
        } else compiler.run((err, stats) => {
          compiler.close ? compiler.close(err2 => {
            compilerCallback(err || err2, stats);
          }) : compilerCallback(err, stats);
        });
      }(options);
    });
  }();
}, function(module, exports, __webpack_require__) {
  const path = __webpack_require__(0), resolveCwd = __webpack_require__(11), pkgDir = __webpack_require__(14);
  module.exports = filename => {
    const globalDir = pkgDir.sync(path.dirname(filename)), relativePath = path.relative(globalDir, filename), pkg = require(path.join(globalDir, "package.json")), localFile = resolveCwd.silent(path.join(pkg.name, relativePath));
    return localFile && "" !== path.relative(localFile, filename) ? require(localFile) : null;
  };
}, function(module, exports, __webpack_require__) {
  const resolveFrom = __webpack_require__(12);
  module.exports = moduleId => resolveFrom(process.cwd(), moduleId), module.exports.silent = moduleId => resolveFrom.silent(process.cwd(), moduleId);
}, function(module, exports, __webpack_require__) {
  const path = __webpack_require__(0), Module = __webpack_require__(13), resolveFrom = (fromDir, moduleId, silent) => {
    if ("string" != typeof fromDir) throw new TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDir}\``);
    if ("string" != typeof moduleId) throw new TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``);
    fromDir = path.resolve(fromDir);
    const fromFile = path.join(fromDir, "noop.js"), resolveFileName = () => Module._resolveFilename(moduleId, {
      id: fromFile,
      filename: fromFile,
      paths: Module._nodeModulePaths(fromDir)
    });
    if (silent) try {
      return resolveFileName();
    } catch (err) {
      return null;
    }
    return resolveFileName();
  };
  module.exports = (fromDir, moduleId) => resolveFrom(fromDir, moduleId), module.exports.silent = (fromDir, moduleId) => resolveFrom(fromDir, moduleId, !0);
}, function(module, exports) {
  module.exports = require("module");
}, function(module, exports, __webpack_require__) {
  const path = __webpack_require__(0), findUp = __webpack_require__(15);
  module.exports = cwd => findUp("package.json", {
    cwd: cwd
  }).then(fp => fp ? path.dirname(fp) : null), module.exports.sync = cwd => {
    const fp = findUp.sync("package.json", {
      cwd: cwd
    });
    return fp ? path.dirname(fp) : null;
  };
}, function(module, exports, __webpack_require__) {
  const path = __webpack_require__(0), locatePath = __webpack_require__(16);
  module.exports = (filename, opts = {}) => {
    const startDir = path.resolve(opts.cwd || ""), {root: root} = path.parse(startDir), filenames = [].concat(filename);
    return new Promise(resolve => {
      !function find(dir) {
        locatePath(filenames, {
          cwd: dir
        }).then(file => {
          file ? resolve(path.join(dir, file)) : dir === root ? resolve(null) : find(path.dirname(dir));
        });
      }(startDir);
    });
  }, module.exports.sync = (filename, opts = {}) => {
    let dir = path.resolve(opts.cwd || "");
    const {root: root} = path.parse(dir), filenames = [].concat(filename);
    for (;;) {
      const file = locatePath.sync(filenames, {
        cwd: dir
      });
      if (file) return path.join(dir, file);
      if (dir === root) return null;
      dir = path.dirname(dir);
    }
  };
}, function(module, exports, __webpack_require__) {
  const path = __webpack_require__(0), pathExists = __webpack_require__(17);
  module.exports = (iterable, options) => (options = Object.assign({
    cwd: process.cwd()
  }, options), Promise.resolve()), module.exports.sync = (iterable, options) => {
    options = Object.assign({
      cwd: process.cwd()
    }, options);
    for (const el of iterable) if (pathExists.sync(path.resolve(options.cwd, el))) return el;
  };
}, function(module, exports, __webpack_require__) {
  const fs = __webpack_require__(2);
  module.exports = fp => new Promise(resolve => {
    fs.access(fp, err => {
      resolve(!err);
    });
  }), module.exports.sync = fp => {
    try {
      return fs.accessSync(fp), !0;
    } catch (err) {
      return !1;
    }
  };
}, function(module, exports) {
  module.exports = require("../vendor/v8-compile-cache");
}, function(module, exports, __webpack_require__) {
  const {WEBPACK_OPTIONS_FLAG: WEBPACK_OPTIONS_FLAG} = __webpack_require__(3);
  exports.cutOffByFlag = (stack, flag) => {
    stack = stack.split("\n");
    for (let i = 0; i < stack.length; i++) stack[i].indexOf(flag) >= 0 && (stack.length = i);
    return stack.join("\n");
  }, exports.cutOffWebpackOptions = stack => exports.cutOffByFlag(stack, WEBPACK_OPTIONS_FLAG), 
  exports.cutOffMultilineMessage = (stack, message) => (stack = stack.split("\n"), 
  message = message.split("\n"), stack.reduce((acc, line, idx) => line === message[idx] || line === "Error: " + message[idx] ? acc : acc.concat(line), []).join("\n")), 
  exports.cleanUpWebpackOptions = (stack, message) => (stack = exports.cutOffWebpackOptions(stack), 
  stack = exports.cutOffMultilineMessage(stack, message));
}, function(module, exports, __webpack_require__) {
  const runWhenInstalled = (packages, pathForCmd, ...args) => {
    const func = require(pathForCmd).default;
    if ("function" != typeof func) throw new Error(`@webpack-cli/${packages} failed to export a default function`);
    return func(...args);
  };
  module.exports = function(packages, ...args) {
    const nameOfPackage = "@webpack-cli/" + packages;
    let pathForCmd, packageIsInstalled = !1;
    try {
      const path = __webpack_require__(0), fs = __webpack_require__(2);
      if (pathForCmd = path.resolve(process.cwd(), "node_modules", "@webpack-cli", packages), 
      fs.existsSync(pathForCmd)) require.resolve(pathForCmd); else {
        const globalModules = __webpack_require__(6);
        pathForCmd = globalModules + "/@webpack-cli/" + packages, require.resolve(pathForCmd);
      }
      packageIsInstalled = !0;
    } catch (err) {
      packageIsInstalled = !1;
    }
    if (packageIsInstalled) return runWhenInstalled(packages, pathForCmd, ...args);
    {
      const path = __webpack_require__(0), fs = __webpack_require__(2), readLine = __webpack_require__(27), isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock")), packageManager = isYarn ? "yarn" : "npm", options = [ "install", "-D", nameOfPackage ];
      isYarn && (options[0] = "add"), "init" === packages && (isYarn ? (options.splice(1, 1), 
      options.splice(0, 0, "global")) : options[1] = "-g");
      const commandToBeRun = `${packageManager} ${options.join(" ")}`, question = `Would you like to install ${packages}? (That will run ${commandToBeRun}) (yes/NO) : `;
      console.error("The command moved into a separate package: " + nameOfPackage);
      const questionInterface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      questionInterface.question(question, answer => {
        switch (questionInterface.close(), answer.toLowerCase()) {
         case "y":
         case "yes":
         case "1":
          ((command, args) => {
            const cp = __webpack_require__(5);
            return new Promise((resolve, reject) => {
              const executedCommand = cp.spawn(command, args, {
                stdio: "inherit",
                shell: !0
              });
              executedCommand.on("error", error => {
                reject(error);
              }), executedCommand.on("exit", code => {
                0 === code ? resolve() : reject();
              });
            });
          })(packageManager, options).then(_ => {
            if ("init" !== packages) return pathForCmd = path.resolve(process.cwd(), "node_modules", "@webpack-cli", packages), 
            runWhenInstalled(packages, pathForCmd, ...args);
            (() => {
              const cp = __webpack_require__(5);
              return new Promise((resolve, reject) => {
                const command = cp.spawn("npm", [ "root", "-g" ]);
                command.on("error", error => reject(error)), command.stdout.on("data", data => resolve(data.toString())), 
                command.stderr.on("data", data => reject(data));
              });
            })().then(root => path.resolve(root.trim(), "@webpack-cli", "init")).then(pathForInit => require(pathForInit).default(...args)).catch(error => {
              console.error(error), process.exitCode = 1;
            });
          }).catch(error => {
            console.error(error), process.exitCode = 1;
          });
          break;

         default:
          console.error(nameOfPackage + " needs to be installed in order to run the command."), 
          process.exitCode = 1;
        }
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  const fs = __webpack_require__(2), os = __webpack_require__(4), path = __webpack_require__(0), ini = __webpack_require__(22);
  let prefix;
  function tryConfigPath(configPath) {
    try {
      return ini.parse(fs.readFileSync(configPath, "utf-8")).prefix;
    } catch (err) {}
  }
  module.exports = (() => {
    if (process.env.PREFIX) return process.env.PREFIX;
    if (prefix) return prefix;
    let home = os.homedir();
    if (home && (prefix = tryConfigPath(path.resolve(home, ".npmrc"))), prefix) return prefix;
    let npm = function() {
      try {
        return fs.realpathSync(__webpack_require__(23).sync("npm"));
      } catch (err) {}
    }();
    if (npm && (prefix = tryConfigPath(path.resolve(npm, "..", "..", "npmrc")), prefix && (prefix = tryConfigPath(path.resolve(prefix, "etc", "npmrc")) || prefix)), 
    !prefix) {
      let {APPDATA: APPDATA, DESTDIR: DESTDIR, OSTYPE: OSTYPE} = process.env;
      if ("win32" === process.platform || "msys" === OSTYPE || "cygwin" === OSTYPE) return prefix = APPDATA ? path.join(APPDATA, "npm") : path.dirname(process.execPath), 
      prefix;
      prefix = path.dirname(path.dirname(process.execPath)), DESTDIR && (prefix = path.join(DESTDIR, prefix));
    }
    return prefix;
  })();
}, function(module, exports) {
  exports.parse = exports.decode = function(str) {
    var out = {}, p = out, section = null, re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    return str.split(/[\r\n]+/g).forEach((function(line, _, __) {
      if (line && !line.match(/^\s*[;#]/)) {
        var match = line.match(re);
        if (match) {
          if (void 0 !== match[1]) return "__proto__" === (section = unsafe(match[1])) ? void (p = {}) : void (p = out[section] = out[section] || {});
          var key = unsafe(match[2]);
          if ("__proto__" !== key) {
            var value = !match[3] || unsafe(match[4]);
            switch (value) {
             case "true":
             case "false":
             case "null":
              value = JSON.parse(value);
            }
            if (key.length > 2 && "[]" === key.slice(-2)) {
              if ("__proto__" === (key = key.substring(0, key.length - 2))) return;
              p[key] ? Array.isArray(p[key]) || (p[key] = [ p[key] ]) : p[key] = [];
            }
            Array.isArray(p[key]) ? p[key].push(value) : p[key] = value;
          }
        }
      }
    })), Object.keys(out).filter((function(k, _, __) {
      if (!out[k] || "object" != typeof out[k] || Array.isArray(out[k])) return !1;
      var parts = dotSplit(k), p = out, l = parts.pop(), nl = l.replace(/\\\./g, ".");
      return parts.forEach((function(part, _, __) {
        "__proto__" !== part && (p[part] && "object" == typeof p[part] || (p[part] = {}), 
        p = p[part]);
      })), (p !== out || nl !== l) && (p[nl] = out[k], !0);
    })).forEach((function(del, _, __) {
      delete out[del];
    })), out;
  }, exports.stringify = exports.encode = function encode(obj, opt) {
    var children = [], out = "";
    "string" == typeof opt ? opt = {
      section: opt,
      whitespace: !1
    } : (opt = opt || {}).whitespace = !0 === opt.whitespace;
    var separator = opt.whitespace ? " = " : "=";
    Object.keys(obj).forEach((function(k, _, __) {
      var val = obj[k];
      val && Array.isArray(val) ? val.forEach((function(item) {
        out += safe(k + "[]") + separator + safe(item) + "\n";
      })) : val && "object" == typeof val ? children.push(k) : out += safe(k) + separator + safe(val) + eol;
    })), opt.section && out.length && (out = "[" + safe(opt.section) + "]" + eol + out);
    return children.forEach((function(k, _, __) {
      var nk = dotSplit(k).join("\\."), section = (opt.section ? opt.section + "." : "") + nk, child = encode(obj[k], {
        section: section,
        whitespace: opt.whitespace
      });
      out.length && child.length && (out += eol), out += child;
    })), out;
  }, exports.safe = safe, exports.unsafe = unsafe;
  var eol = "undefined" != typeof process && "win32" === process.platform ? "\r\n" : "\n";
  function dotSplit(str) {
    return str.replace(/\1/g, "LITERAL\\1LITERAL").replace(/\\\./g, "").split(/\./).map((function(part) {
      return part.replace(/\1/g, "\\.").replace(/\2LITERAL\\1LITERAL\2/g, "");
    }));
  }
  function isQuoted(val) {
    return '"' === val.charAt(0) && '"' === val.slice(-1) || "'" === val.charAt(0) && "'" === val.slice(-1);
  }
  function safe(val) {
    return "string" != typeof val || val.match(/[=\r\n]/) || val.match(/^\[/) || val.length > 1 && isQuoted(val) || val !== val.trim() ? JSON.stringify(val) : val.replace(/;/g, "\\;").replace(/#/g, "\\#");
  }
  function unsafe(val, doUnesc) {
    if (!isQuoted(val = (val || "").trim())) {
      for (var esc = !1, unesc = "", i = 0, l = val.length; i < l; i++) {
        var c = val.charAt(i);
        if (esc) -1 !== "\\;#".indexOf(c) ? unesc += c : unesc += "\\" + c, esc = !1; else {
          if (-1 !== ";#".indexOf(c)) break;
          "\\" === c ? esc = !0 : unesc += c;
        }
      }
      return esc && (unesc += "\\"), unesc.trim();
    }
    "'" === val.charAt(0) && (val = val.substr(1, val.length - 2));
    try {
      val = JSON.parse(val);
    } catch (_) {}
    return val;
  }
}, function(module, exports, __webpack_require__) {
  module.exports = which, which.sync = function(cmd, opt) {
    for (var info = getPathInfo(cmd, opt = opt || {}), pathEnv = info.env, pathExt = info.ext, pathExtExe = info.extExe, found = [], i = 0, l = pathEnv.length; i < l; i++) {
      var pathPart = pathEnv[i];
      '"' === pathPart.charAt(0) && '"' === pathPart.slice(-1) && (pathPart = pathPart.slice(1, -1));
      var p = path.join(pathPart, cmd);
      !pathPart && /^\.[\\\/]/.test(cmd) && (p = cmd.slice(0, 2) + p);
      for (var j = 0, ll = pathExt.length; j < ll; j++) {
        var cur = p + pathExt[j];
        try {
          if (isexe.sync(cur, {
            pathExt: pathExtExe
          })) {
            if (!opt.all) return cur;
            found.push(cur);
          }
        } catch (ex) {}
      }
    }
    if (opt.all && found.length) return found;
    if (opt.nothrow) return null;
    throw getNotFoundError(cmd);
  };
  var isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(0), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(24);
  function getNotFoundError(cmd) {
    var er = new Error("not found: " + cmd);
    return er.code = "ENOENT", er;
  }
  function getPathInfo(cmd, opt) {
    var colon = opt.colon || COLON, pathEnv = opt.path || process.env.PATH || "", pathExt = [ "" ];
    pathEnv = pathEnv.split(colon);
    var pathExtExe = "";
    return isWindows && (pathEnv.unshift(process.cwd()), pathExt = (pathExtExe = opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(colon), 
    -1 !== cmd.indexOf(".") && "" !== pathExt[0] && pathExt.unshift("")), (cmd.match(/\//) || isWindows && cmd.match(/\\/)) && (pathEnv = [ "" ]), 
    {
      env: pathEnv,
      ext: pathExt,
      extExe: pathExtExe
    };
  }
  function which(cmd, opt, cb) {
    "function" == typeof opt && (cb = opt, opt = {});
    var info = getPathInfo(cmd, opt), pathEnv = info.env, pathExt = info.ext, pathExtExe = info.extExe, found = [];
    !function F(i, l) {
      if (i === l) return opt.all && found.length ? cb(null, found) : cb(getNotFoundError(cmd));
      var pathPart = pathEnv[i];
      '"' === pathPart.charAt(0) && '"' === pathPart.slice(-1) && (pathPart = pathPart.slice(1, -1));
      var p = path.join(pathPart, cmd);
      !pathPart && /^\.[\\\/]/.test(cmd) && (p = cmd.slice(0, 2) + p), function E(ii, ll) {
        if (ii === ll) return F(i + 1, l);
        var ext = pathExt[ii];
        isexe(p + ext, {
          pathExt: pathExtExe
        }, (function(er, is) {
          if (!er && is) {
            if (!opt.all) return cb(null, p + ext);
            found.push(p + ext);
          }
          return E(ii + 1, ll);
        }));
      }(0, pathExt.length);
    }(0, pathEnv.length);
  }
}, function(module, exports, __webpack_require__) {
  var core;
  __webpack_require__(2);
  function isexe(path, options, cb) {
    if ("function" == typeof options && (cb = options, options = {}), !cb) {
      if ("function" != typeof Promise) throw new TypeError("callback not provided");
      return new Promise((function(resolve, reject) {
        isexe(path, options || {}, (function(er, is) {
          er ? reject(er) : resolve(is);
        }));
      }));
    }
    core(path, options || {}, (function(er, is) {
      er && ("EACCES" === er.code || options && options.ignoreErrors) && (er = null, is = !1), 
      cb(er, is);
    }));
  }
  core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(25) : __webpack_require__(26), 
  module.exports = isexe, isexe.sync = function(path, options) {
    try {
      return core.sync(path, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
      throw er;
    }
  };
}, function(module, exports, __webpack_require__) {
  module.exports = isexe, isexe.sync = function(path, options) {
    return checkStat(fs.statSync(path), path, options);
  };
  var fs = __webpack_require__(2);
  function checkStat(stat, path, options) {
    return !(!stat.isSymbolicLink() && !stat.isFile()) && function(path, options) {
      var pathext = void 0 !== options.pathExt ? options.pathExt : process.env.PATHEXT;
      if (!pathext) return !0;
      if (-1 !== (pathext = pathext.split(";")).indexOf("")) return !0;
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) return !0;
      }
      return !1;
    }(path, options);
  }
  function isexe(path, options, cb) {
    fs.stat(path, (function(er, stat) {
      cb(er, !er && checkStat(stat, path, options));
    }));
  }
}, function(module, exports, __webpack_require__) {
  module.exports = isexe, isexe.sync = function(path, options) {
    return checkStat(fs.statSync(path), options);
  };
  var fs = __webpack_require__(2);
  function isexe(path, options, cb) {
    fs.stat(path, (function(er, stat) {
      cb(er, !er && checkStat(stat, options));
    }));
  }
  function checkStat(stat, options) {
    return stat.isFile() && function(stat, options) {
      var mod = stat.mode, uid = stat.uid, gid = stat.gid, myUid = void 0 !== options.uid ? options.uid : process.getuid && process.getuid(), myGid = void 0 !== options.gid ? options.gid : process.getgid && process.getgid(), u = parseInt("100", 8), g = parseInt("010", 8), o = parseInt("001", 8), ug = u | g;
      return mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && 0 === myUid;
    }(stat, options);
  }
}, function(module, exports) {
  module.exports = require("readline");
}, function(module, exports) {
  module.exports = require("../vendor/yargs");
}, function(module) {
  module.exports = JSON.parse('{"name":"webpack-cli","version":"3.3.12","description":"CLI for webpack & friends","license":"MIT"}');
}, function(module, exports, __webpack_require__) {
  const optionsSchema = __webpack_require__(31), {GROUPS: GROUPS} = __webpack_require__(3), {CONFIG_GROUP: CONFIG_GROUP, BASIC_GROUP: BASIC_GROUP, MODULE_GROUP: MODULE_GROUP, OUTPUT_GROUP: OUTPUT_GROUP, ADVANCED_GROUP: ADVANCED_GROUP, RESOLVE_GROUP: RESOLVE_GROUP, OPTIMIZE_GROUP: OPTIMIZE_GROUP, DISPLAY_GROUP: DISPLAY_GROUP} = GROUPS, nestedProperties = [ "anyOf", "oneOf", "allOf" ], resolveSchema = schema => {
    let current = schema;
    if (schema && "object" == typeof schema && "$ref" in schema) {
      const path = schema.$ref.split("/");
      for (const element of path) current = "#" === element ? optionsSchema : current[element];
    }
    return current;
  }, findPropertyInSchema = (schema, property, subProperty) => {
    if (!schema) return null;
    if (subProperty) {
      if (schema[property] && "object" == typeof schema[property] && subProperty in schema[property]) return resolveSchema(schema[property][subProperty]);
    } else if (property in schema) return resolveSchema(schema[property]);
    for (const name of nestedProperties) if (schema[name]) for (const item of schema[name]) {
      const resolvedItem = resolveSchema(item), result = findPropertyInSchema(resolvedItem, property, subProperty);
      if (result) return result;
    }
  }, getSchemaInfo = (path, property, subProperty) => {
    const pathSegments = path.split(".");
    let current = optionsSchema;
    for (const segment of pathSegments) if (current = "*" === segment ? findPropertyInSchema(current, "additionalProperties") || findPropertyInSchema(current, "items") : findPropertyInSchema(current, "properties", segment), 
    !current) return;
    return findPropertyInSchema(current, property, subProperty);
  };
  module.exports = function(yargs) {
    yargs.help("help").alias("help", "h").version().alias("version", "v").options({
      config: {
        type: "string",
        describe: "Path to the config file",
        group: CONFIG_GROUP,
        defaultDescription: "webpack.config.js or webpackfile.js",
        requiresArg: !0
      },
      "config-register": {
        type: "array",
        alias: "r",
        describe: "Preload one or more modules before loading the webpack configuration",
        group: CONFIG_GROUP,
        defaultDescription: "module id or path",
        requiresArg: !0
      },
      "config-name": {
        type: "string",
        describe: "Name of the config to use",
        group: CONFIG_GROUP,
        requiresArg: !0
      },
      env: {
        describe: "Environment passed to the config, when it is a function",
        group: CONFIG_GROUP
      },
      mode: {
        type: getSchemaInfo("mode", "type"),
        choices: getSchemaInfo("mode", "enum"),
        describe: getSchemaInfo("mode", "description"),
        group: CONFIG_GROUP,
        requiresArg: !0
      },
      context: {
        type: getSchemaInfo("context", "type"),
        describe: getSchemaInfo("context", "description"),
        group: BASIC_GROUP,
        defaultDescription: "The current directory",
        requiresArg: !0
      },
      entry: {
        type: "string",
        describe: getSchemaInfo("entry", "description"),
        group: BASIC_GROUP,
        requiresArg: !0
      },
      "no-cache": {
        type: "boolean",
        describe: "Disables cached builds",
        group: BASIC_GROUP
      },
      "module-bind": {
        type: "string",
        describe: "Bind an extension to a loader",
        group: MODULE_GROUP,
        requiresArg: !0
      },
      "module-bind-post": {
        type: "string",
        describe: "Bind an extension to a post loader",
        group: MODULE_GROUP,
        requiresArg: !0
      },
      "module-bind-pre": {
        type: "string",
        describe: "Bind an extension to a pre loader",
        group: MODULE_GROUP,
        requiresArg: !0
      },
      output: {
        alias: "o",
        describe: "The output path and file for compilation assets",
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-path": {
        type: "string",
        describe: getSchemaInfo("output.path", "description"),
        group: OUTPUT_GROUP,
        defaultDescription: "The current directory",
        requiresArg: !0
      },
      "output-filename": {
        type: "string",
        describe: getSchemaInfo("output.filename", "description"),
        group: OUTPUT_GROUP,
        defaultDescription: "[name].js",
        requiresArg: !0
      },
      "output-chunk-filename": {
        type: "string",
        describe: getSchemaInfo("output.chunkFilename", "description"),
        group: OUTPUT_GROUP,
        defaultDescription: "filename with [id] instead of [name] or [id] prefixed",
        requiresArg: !0
      },
      "output-source-map-filename": {
        type: "string",
        describe: getSchemaInfo("output.sourceMapFilename", "description"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-public-path": {
        type: "string",
        describe: getSchemaInfo("output.publicPath", "description"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-jsonp-function": {
        type: "string",
        describe: getSchemaInfo("output.jsonpFunction", "description"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-pathinfo": {
        type: "boolean",
        describe: getSchemaInfo("output.pathinfo", "description"),
        group: OUTPUT_GROUP
      },
      "output-library": {
        type: "array",
        describe: "Expose the exports of the entry point as library",
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-library-target": {
        type: "string",
        describe: getSchemaInfo("output.libraryTarget", "description"),
        choices: getSchemaInfo("output.libraryTarget", "enum"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "records-input-path": {
        type: "string",
        describe: getSchemaInfo("recordsInputPath", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "records-output-path": {
        type: "string",
        describe: getSchemaInfo("recordsOutputPath", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "records-path": {
        type: "string",
        describe: getSchemaInfo("recordsPath", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      define: {
        type: "string",
        describe: "Define any free var in the bundle",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      target: {
        type: "string",
        describe: getSchemaInfo("target", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      cache: {
        type: "boolean",
        describe: getSchemaInfo("cache", "description"),
        default: null,
        group: ADVANCED_GROUP,
        defaultDescription: "It's enabled by default when watching"
      },
      watch: {
        type: "boolean",
        alias: "w",
        describe: getSchemaInfo("watch", "description"),
        group: BASIC_GROUP
      },
      "watch-stdin": {
        type: "boolean",
        alias: "stdin",
        describe: getSchemaInfo("watchOptions.stdin", "description"),
        group: ADVANCED_GROUP
      },
      "watch-aggregate-timeout": {
        describe: getSchemaInfo("watchOptions.aggregateTimeout", "description"),
        type: getSchemaInfo("watchOptions.aggregateTimeout", "type"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "watch-poll": {
        type: "string",
        describe: getSchemaInfo("watchOptions.poll", "description"),
        group: ADVANCED_GROUP
      },
      hot: {
        type: "boolean",
        describe: "Enables Hot Module Replacement",
        group: ADVANCED_GROUP
      },
      debug: {
        type: "boolean",
        describe: "Switch loaders to debug mode",
        group: BASIC_GROUP
      },
      devtool: {
        type: "string",
        describe: getSchemaInfo("devtool", "description"),
        group: BASIC_GROUP,
        requiresArg: !0
      },
      "resolve-alias": {
        type: "string",
        describe: getSchemaInfo("resolve.alias", "description"),
        group: RESOLVE_GROUP,
        requiresArg: !0
      },
      "resolve-extensions": {
        type: "array",
        describe: getSchemaInfo("resolve.alias", "description"),
        group: RESOLVE_GROUP,
        requiresArg: !0
      },
      "resolve-loader-alias": {
        type: "string",
        describe: "Setup a loader alias for resolving",
        group: RESOLVE_GROUP,
        requiresArg: !0
      },
      "optimize-max-chunks": {
        describe: "Try to keep the chunk count below a limit",
        group: OPTIMIZE_GROUP,
        requiresArg: !0
      },
      "optimize-min-chunk-size": {
        describe: getSchemaInfo("optimization.splitChunks.minSize", "description"),
        group: OPTIMIZE_GROUP,
        requiresArg: !0
      },
      "optimize-minimize": {
        type: "boolean",
        describe: getSchemaInfo("optimization.minimize", "description"),
        group: OPTIMIZE_GROUP
      },
      prefetch: {
        type: "string",
        describe: "Prefetch this request (Example: --prefetch ./file.js)",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      provide: {
        type: "string",
        describe: "Provide these modules as free vars in all modules (Example: --provide jQuery=jquery)",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "labeled-modules": {
        type: "boolean",
        describe: "Enables labeled modules",
        group: ADVANCED_GROUP
      },
      plugin: {
        type: "string",
        describe: "Load this plugin",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      bail: {
        type: getSchemaInfo("bail", "type"),
        describe: getSchemaInfo("bail", "description"),
        group: ADVANCED_GROUP,
        default: null
      },
      profile: {
        type: "boolean",
        describe: getSchemaInfo("profile", "description"),
        group: ADVANCED_GROUP,
        default: null
      },
      d: {
        type: "boolean",
        describe: "shortcut for --debug --devtool eval-cheap-module-source-map --output-pathinfo",
        group: BASIC_GROUP
      },
      p: {
        type: "boolean",
        describe: 'shortcut for --optimize-minimize --define process.env.NODE_ENV="production"',
        group: BASIC_GROUP
      },
      silent: {
        type: "boolean",
        describe: "Prevent output from being displayed in stdout"
      },
      json: {
        type: "boolean",
        alias: "j",
        describe: "Prints the result as JSON."
      },
      progress: {
        type: "boolean",
        describe: "Print compilation progress in percentage",
        group: BASIC_GROUP
      },
      color: {
        type: "boolean",
        alias: "colors",
        default: function() {
          return __webpack_require__(7).stdout;
        },
        group: DISPLAY_GROUP,
        describe: "Force colors on the console"
      },
      "no-color": {
        type: "boolean",
        alias: "no-colors",
        group: DISPLAY_GROUP,
        describe: "Force no colors on the console"
      },
      "sort-modules-by": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Sorts the modules list by property in module"
      },
      "sort-chunks-by": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Sorts the chunks list by property in chunk"
      },
      "sort-assets-by": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Sorts the assets list by property in asset"
      },
      "hide-modules": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Hides info about modules"
      },
      "display-exclude": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Exclude modules in the output"
      },
      "display-modules": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display even excluded modules in the output"
      },
      "display-max-modules": {
        type: "number",
        group: DISPLAY_GROUP,
        describe: "Sets the maximum number of visible modules in output"
      },
      "display-chunks": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display chunks in the output"
      },
      "display-entrypoints": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display entry points in the output"
      },
      "display-origins": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display origins of chunks in the output"
      },
      "display-cached": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display also cached modules in the output"
      },
      "display-cached-assets": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display also cached assets in the output"
      },
      "display-reasons": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display reasons about module inclusion in the output"
      },
      "display-depth": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display distance from entry point for each module"
      },
      "display-used-exports": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display information about used exports in modules (Tree Shaking)"
      },
      "display-provided-exports": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display information about exports provided from modules"
      },
      "display-optimization-bailout": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display information about why optimization bailed out for modules"
      },
      "display-error-details": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display details about errors"
      },
      display: {
        type: "string",
        choices: [ "", "verbose", "detailed", "normal", "minimal", "errors-only", "none" ],
        group: DISPLAY_GROUP,
        describe: "Select display preset"
      },
      verbose: {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Show more details"
      },
      "info-verbosity": {
        type: "string",
        default: "info",
        choices: [ "none", "info", "verbose" ],
        group: DISPLAY_GROUP,
        describe: "Controls the output of lifecycle messaging e.g. Started watching files..."
      },
      "build-delimiter": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Display custom text after build output"
      }
    });
  };
}, function(module) {
  module.exports = JSON.parse('{"additionalProperties":false,"definitions":{"common.pluginFunction":{"description":"Function acting as plugin","instanceof":"Function","properties":{"apply":{"description":"The run point of the plugin, required method.","instanceof":"Function"}},"additionalProperties":true,"required":["apply"]},"common.pluginObject":{"description":"Plugin instance","type":"object","properties":{"apply":{"description":"The run point of the plugin, required method.","instanceof":"Function"}},"additionalProperties":true,"required":["apply"]},"common.arrayOfStringOrStringArrayValues":{"items":{"description":"string or array of strings","anyOf":[{"minLength":1,"type":"string"},{"items":{"description":"A non-empty string","minLength":1,"type":"string"},"type":"array"}]},"type":"array"},"common.arrayOfStringValues":{"items":{"description":"A non-empty string","minLength":1,"type":"string"},"type":"array"},"common.nonEmptyArrayOfUniqueStringValues":{"items":{"description":"A non-empty string","minLength":1,"type":"string"},"minItems":1,"type":"array","uniqueItems":true},"entry":{"oneOf":[{"minProperties":1,"additionalProperties":{"description":"An entry point with name","oneOf":[{"description":"The string is resolved to a module which is loaded upon startup.","minLength":1,"type":"string"},{"description":"All modules are loaded upon startup. The last one is exported.","anyOf":[{"$ref":"#/definitions/common.nonEmptyArrayOfUniqueStringValues"}]}]},"description":"Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.","type":"object"},{"description":"An entry point without name. The string is resolved to a module which is loaded upon startup.","minLength":1,"type":"string"},{"description":"An entry point without name. All modules are loaded upon startup. The last one is exported.","anyOf":[{"$ref":"#/definitions/common.nonEmptyArrayOfUniqueStringValues"}]},{"description":"A Function returning an entry object, an entry string, an entry array or a promise to these things.","instanceof":"Function"}]},"externals":{"anyOf":[{"description":"An exact matched dependency becomes external. The same string is used as external dependency.","type":"string"},{"additionalProperties":{"description":"The dependency used for the external","anyOf":[{"type":"string"},{"type":"object"},{"type":"boolean"}]},"description":"If an dependency matches exactly a property of the object, the property value is used as dependency.","type":"object"},{"description":"`function(context, request, callback(err, result))` The function is called on each dependency.","instanceof":"Function"},{"description":"Every matched dependency becomes external.","instanceof":"RegExp"},{"items":{"description":"External configuration","anyOf":[{"$ref":"#/definitions/externals"}]},"type":"array"}]},"module":{"additionalProperties":false,"properties":{"exprContextCritical":{"description":"Enable warnings for full dynamic dependencies","type":"boolean"},"exprContextRecursive":{"description":"Enable recursive directory lookup for full dynamic dependencies","type":"boolean"},"exprContextRegExp":{"description":"Sets the default regular expression for full dynamic dependencies","anyOf":[{"type":"boolean"},{"instanceof":"RegExp"}]},"exprContextRequest":{"description":"Set the default request for full dynamic dependencies","type":"string"},"noParse":{"description":"Don\'t parse files matching. It\'s matched against the full resolved request.","anyOf":[{"items":{"description":"A regular expression, when matched the module is not parsed","instanceof":"RegExp"},"minItems":1,"type":"array"},{"instanceof":"RegExp"},{"instanceof":"Function"},{"items":{"description":"An absolute path, when the module starts with this path it is not parsed","type":"string","absolutePath":true},"minItems":1,"type":"array"},{"type":"string","absolutePath":true}]},"rules":{"allOf":[{"$ref":"#/definitions/ruleSet-rules"}],"description":"An array of rules applied for modules."},"defaultRules":{"description":"An array of rules applied by default for modules.","anyOf":[{"$ref":"#/definitions/ruleSet-rules"}]},"unknownContextCritical":{"description":"Enable warnings when using the require function in a not statically analyse-able way","type":"boolean"},"unknownContextRecursive":{"description":"Enable recursive directory lookup when using the require function in a not statically analyse-able way","type":"boolean"},"unknownContextRegExp":{"description":"Sets the regular expression when using the require function in a not statically analyse-able way","anyOf":[{"type":"boolean"},{"instanceof":"RegExp"}]},"unknownContextRequest":{"description":"Sets the request when using the require function in a not statically analyse-able way","type":"string"},"unsafeCache":{"description":"Cache the resolving of module requests","anyOf":[{"type":"boolean"},{"instanceof":"Function"}]},"wrappedContextCritical":{"description":"Enable warnings for partial dynamic dependencies","type":"boolean"},"wrappedContextRecursive":{"description":"Enable recursive directory lookup for partial dynamic dependencies","type":"boolean"},"wrappedContextRegExp":{"description":"Set the inner regular expression for partial dynamic dependencies","instanceof":"RegExp"},"strictExportPresence":{"description":"Emit errors instead of warnings when imported names don\'t exist in imported module","type":"boolean"},"strictThisContextOnImports":{"description":"Handle the this context correctly according to the spec for namespace objects","type":"boolean"}},"type":"object"},"output":{"additionalProperties":false,"properties":{"auxiliaryComment":{"description":"Add a comment in the UMD wrapper.","anyOf":[{"description":"Append the same comment above each import style.","type":"string"},{"additionalProperties":false,"description":"Set explicit comments for `commonjs`, `commonjs2`, `amd`, and `root`.","properties":{"amd":{"description":"Set comment for `amd` section in UMD","type":"string"},"commonjs":{"description":"Set comment for `commonjs` (exports) section in UMD","type":"string"},"commonjs2":{"description":"Set comment for `commonjs2` (module.exports) section in UMD","type":"string"},"root":{"description":"Set comment for `root` (global variable) section in UMD","type":"string"}},"type":"object"}]},"chunkFilename":{"description":"The filename of non-entry chunks as relative path inside the `output.path` directory.","type":"string","absolutePath":false},"webassemblyModuleFilename":{"description":"The filename of WebAssembly modules as relative path inside the `output.path` directory.","type":"string","absolutePath":false},"globalObject":{"description":"An expression which is used to address the global object/scope in runtime code","type":"string","minLength":1},"crossOriginLoading":{"description":"This option enables cross-origin loading of chunks.","enum":[false,"anonymous","use-credentials"]},"jsonpScriptType":{"description":"This option enables loading async chunks via a custom script type, such as script type=\\"module\\"","enum":[false,"text/javascript","module"]},"chunkLoadTimeout":{"description":"Number of milliseconds before chunk request expires","type":"number"},"devtoolFallbackModuleFilenameTemplate":{"description":"Similar to `output.devtoolModuleFilenameTemplate`, but used in the case of duplicate module identifiers.","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"devtoolLineToLine":{"description":"Enable line to line mapped mode for all/specified modules. Line to line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It’s a performance optimization. Only use it if your performance need to be better and you are sure that input lines match which generated lines.","anyOf":[{"description":"`true` enables it for all modules (not recommended)","type":"boolean"},{"description":"An object similar to `module.loaders` enables it for specific files.","type":"object"}]},"devtoolModuleFilenameTemplate":{"description":"Filename template string of function for the sources array in a generated SourceMap.","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"devtoolNamespace":{"description":"Module namespace to use when interpolating filename template string for the sources array in a generated SourceMap. Defaults to `output.library` if not set. It\'s useful for avoiding runtime collisions in sourcemaps from multiple webpack projects built as libraries.","type":"string"},"filename":{"description":"Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written to, filename is used solely for naming the individual files.","anyOf":[{"type":"string"},{"instanceof":"Function"}],"absolutePath":false},"hashDigest":{"description":"Digest type used for the hash","enum":["latin1","hex","base64"]},"hashDigestLength":{"description":"Number of chars which are used for the hash","minimum":1,"type":"number"},"hashFunction":{"description":"Algorithm used for generation the hash (see node.js crypto package)","anyOf":[{"type":"string","minLength":1},{"instanceof":"Function"}]},"hashSalt":{"description":"Any string which is added to the hash to salt it","minLength":1,"type":"string"},"hotUpdateChunkFilename":{"description":"The filename of the Hot Update Chunks. They are inside the output.path directory.","anyOf":[{"type":"string"},{"instanceof":"Function"}],"absolutePath":false},"hotUpdateFunction":{"description":"The JSONP function used by webpack for async loading of hot update chunks.","type":"string"},"hotUpdateMainFilename":{"description":"The filename of the Hot Update Main File. It is inside the `output.path` directory.","anyOf":[{"type":"string"},{"instanceof":"Function"}],"absolutePath":false},"jsonpFunction":{"description":"The JSONP function used by webpack for async loading of chunks.","type":"string"},"chunkCallbackName":{"description":"The callback function name used by webpack for loading of chunks in WebWorkers.","type":"string"},"library":{"anyOf":[{"type":"string"},{"items":{"description":"A part of the library name","type":"string"},"type":"array"},{"type":"object","additionalProperties":false,"properties":{"root":{"description":"Name of the property exposed globally by a UMD library","anyOf":[{"type":"string"},{"$ref":"#/definitions/common.arrayOfStringValues"}]},"amd":{"description":"Name of the exposed AMD library in the UMD","type":"string"},"commonjs":{"description":"Name of the exposed commonjs export in the UMD","type":"string"}}}],"description":"If set, export the bundle as library. `output.library` is the name."},"libraryTarget":{"description":"Type of library","enum":["var","assign","this","window","self","global","commonjs","commonjs2","commonjs-module","amd","umd","umd2","jsonp"]},"libraryExport":{"description":"Specify which export should be exposed as library","anyOf":[{"type":"string"},{"$ref":"#/definitions/common.arrayOfStringValues"}]},"path":{"description":"The output directory as **absolute path** (required).","type":"string","absolutePath":true},"pathinfo":{"description":"Include comments with information about the modules.","type":"boolean"},"publicPath":{"description":"The `publicPath` specifies the public URL address of the output files when referenced in a browser.","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"sourceMapFilename":{"description":"The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.","type":"string","absolutePath":false},"sourcePrefix":{"description":"Prefixes every line of the source in the bundle with this string.","type":"string"},"strictModuleExceptionHandling":{"description":"Handles exceptions in module loading correctly at a performance cost.","type":"boolean"},"umdNamedDefine":{"description":"If `output.libraryTarget` is set to umd and `output.library` is set, setting this to true will name the AMD module.","type":"boolean"}},"type":"object"},"resolve":{"additionalProperties":false,"properties":{"alias":{"description":"Redirect module requests","anyOf":[{"additionalProperties":{"description":"New request","type":"string"},"type":"object"},{"items":{"description":"Alias configuration","additionalProperties":false,"properties":{"alias":{"description":"New request","type":"string"},"name":{"description":"Request to be redirected","type":"string"},"onlyModule":{"description":"Redirect only exact matching request","type":"boolean"}},"type":"object"},"type":"array"}]},"aliasFields":{"description":"Fields in the description file (package.json) which are used to redirect requests inside the module","anyOf":[{"$ref":"#/definitions/common.arrayOfStringOrStringArrayValues"}]},"cachePredicate":{"description":"Predicate function to decide which requests should be cached","instanceof":"Function"},"cacheWithContext":{"description":"Include the context information in the cache identifier when caching","type":"boolean"},"descriptionFiles":{"description":"Filenames used to find a description file","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"enforceExtension":{"description":"Enforce using one of the extensions from the extensions option","type":"boolean"},"enforceModuleExtension":{"description":"Enforce using one of the module extensions from the moduleExtensions option","type":"boolean"},"extensions":{"description":"Extensions added to the request when trying to find the file","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"fileSystem":{"description":"Filesystem for the resolver"},"mainFields":{"description":"Field names from the description file (package.json) which are used to find the default entry point","anyOf":[{"$ref":"#/definitions/common.arrayOfStringOrStringArrayValues"}]},"mainFiles":{"description":"Filenames used to find the default entry point if there is no description file or main field","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"moduleExtensions":{"description":"Extensions added to the module request when trying to find the module","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"modules":{"description":"Folder names or directory paths where to find modules","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"plugins":{"description":"Plugins for the resolver","type":"array","items":{"description":"Plugin of type object or instanceof Function","anyOf":[{"$ref":"#/definitions/common.pluginObject"},{"$ref":"#/definitions/common.pluginFunction"}]}},"resolver":{"description":"Custom resolver"},"symlinks":{"description":"Enable resolving symlinks to the original location","type":"boolean"},"concord":{"description":"Enable concord resolving extras","type":"boolean"},"unsafeCache":{"description":"Enable caching of successfully resolved requests","anyOf":[{"type":"boolean"},{"additionalProperties":true,"type":"object"}]},"useSyncFileSystemCalls":{"description":"Use synchronous filesystem calls for the resolver","type":"boolean"}},"type":"object"},"ruleSet-condition":{"anyOf":[{"instanceof":"RegExp"},{"minLength":1,"type":"string"},{"instanceof":"Function"},{"$ref":"#/definitions/ruleSet-conditions"},{"additionalProperties":false,"properties":{"and":{"description":"Logical AND","anyOf":[{"$ref":"#/definitions/ruleSet-conditions"}]},"exclude":{"description":"Exclude all modules matching any of these conditions","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"include":{"description":"Exclude all modules matching not any of these conditions","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"not":{"description":"Logical NOT","anyOf":[{"$ref":"#/definitions/ruleSet-conditions"}]},"or":{"description":"Logical OR","anyOf":[{"$ref":"#/definitions/ruleSet-conditions"}]},"test":{"description":"Exclude all modules matching any of these conditions","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]}},"type":"object"}]},"ruleSet-conditions":{"items":{"description":"A rule condition","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"type":"array"},"ruleSet-loader":{"minLength":1,"type":"string"},"ruleSet-query":{"anyOf":[{"type":"object"},{"type":"string"}]},"ruleSet-rule":{"additionalProperties":false,"properties":{"enforce":{"description":"Enforce this rule as pre or post step","enum":["pre","post"]},"exclude":{"description":"Shortcut for resource.exclude","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"include":{"description":"Shortcut for resource.include","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"issuer":{"description":"Match the issuer of the module (The module pointing to this module)","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"loader":{"description":"Shortcut for use.loader","anyOf":[{"$ref":"#/definitions/ruleSet-loader"},{"$ref":"#/definitions/ruleSet-use"}]},"loaders":{"description":"Shortcut for use.loader","anyOf":[{"$ref":"#/definitions/ruleSet-use"}]},"oneOf":{"description":"Only execute the first matching rule in this array","anyOf":[{"$ref":"#/definitions/ruleSet-rules"}]},"options":{"description":"Shortcut for use.options","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]},"parser":{"description":"Options for parsing","additionalProperties":true,"type":"object"},"resolve":{"description":"Options for the resolver","type":"object","anyOf":[{"$ref":"#/definitions/resolve"}]},"sideEffects":{"description":"Flags a module as with or without side effects","type":"boolean"},"query":{"description":"Shortcut for use.query","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]},"type":{"description":"Module type to use for the module","enum":["javascript/auto","javascript/dynamic","javascript/esm","json","webassembly/experimental"]},"resource":{"description":"Match the resource path of the module","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"resourceQuery":{"description":"Match the resource query of the module","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"compiler":{"description":"Match the child compiler name","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"rules":{"description":"Match and execute these rules when this rule is matched","anyOf":[{"$ref":"#/definitions/ruleSet-rules"}]},"test":{"description":"Shortcut for resource.test","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"use":{"description":"Modifiers applied to the module when rule is matched","anyOf":[{"$ref":"#/definitions/ruleSet-use"}]}},"type":"object"},"ruleSet-rules":{"items":{"description":"A rule","anyOf":[{"$ref":"#/definitions/ruleSet-rule"}]},"type":"array"},"ruleSet-use":{"anyOf":[{"$ref":"#/definitions/ruleSet-use-item"},{"instanceof":"Function"},{"items":{"description":"An use item","anyOf":[{"$ref":"#/definitions/ruleSet-use-item"}]},"type":"array"}]},"ruleSet-use-item":{"anyOf":[{"$ref":"#/definitions/ruleSet-loader"},{"instanceof":"Function"},{"additionalProperties":false,"properties":{"loader":{"description":"Loader name","anyOf":[{"$ref":"#/definitions/ruleSet-loader"}]},"options":{"description":"Loader options","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]},"ident":{"description":"Unique loader identifier","type":"string"},"query":{"description":"Loader query","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]}},"type":"object"}]},"filter-item-types":{"anyOf":[{"instanceof":"RegExp"},{"type":"string"},{"instanceof":"Function"}]},"filter-types":{"anyOf":[{"$ref":"#/definitions/filter-item-types"},{"type":"array","items":{"description":"Rule to filter","anyOf":[{"$ref":"#/definitions/filter-item-types"}]}}]}},"properties":{"mode":{"description":"Enable production optimizations or development hints.","enum":["development","production","none"]},"amd":{"description":"Set the value of `require.amd` and `define.amd`."},"bail":{"description":"Report the first error as a hard error instead of tolerating it.","type":"boolean"},"cache":{"description":"Cache generated modules and chunks to improve performance for multiple incremental builds.","anyOf":[{"description":"You can pass `false` to disable it.","type":"boolean"},{"description":"You can pass an object to enable it and let webpack use the passed object as cache. This way you can share the cache object between multiple compiler calls.","type":"object"}]},"context":{"description":"The base directory (absolute path!) for resolving the `entry` option. If `output.pathinfo` is set, the included pathinfo is shortened to this directory.","type":"string","absolutePath":true},"dependencies":{"description":"References to other configurations to depend on.","items":{"description":"References to another configuration to depend on.","type":"string"},"type":"array"},"devServer":{"description":"Options for the webpack-dev-server","type":"object"},"devtool":{"description":"A developer tool to enhance debugging.","anyOf":[{"type":"string"},{"enum":[false]}]},"entry":{"description":"The entry point(s) of the compilation.","anyOf":[{"$ref":"#/definitions/entry"}]},"externals":{"description":"Specify dependencies that shouldn\'t be resolved by webpack, but should become dependencies of the resulting bundle. The kind of the dependency depends on `output.libraryTarget`.","anyOf":[{"$ref":"#/definitions/externals"}]},"loader":{"description":"Custom values available in the loader context.","type":"object"},"module":{"description":"Options affecting the normal modules (`NormalModuleFactory`).","anyOf":[{"$ref":"#/definitions/module"}]},"name":{"description":"Name of the configuration. Used when loading multiple configurations.","type":"string"},"node":{"description":"Include polyfills or mocks for various node stuff.","anyOf":[{"enum":[false]},{"additionalProperties":{"description":"Include a polyfill for the node.js module","enum":[false,true,"mock","empty"]},"properties":{"Buffer":{"description":"Include a polyfill for the \'Buffer\' variable","enum":[false,true,"mock"]},"__dirname":{"description":"Include a polyfill for the \'__dirname\' variable","enum":[false,true,"mock"]},"__filename":{"description":"Include a polyfill for the \'__filename\' variable","enum":[false,true,"mock"]},"console":{"description":"Include a polyfill for the \'console\' variable","enum":[false,true,"mock"]},"global":{"description":"Include a polyfill for the \'global\' variable","type":"boolean"},"process":{"description":"Include a polyfill for the \'process\' variable","enum":[false,true,"mock"]}},"type":"object"}]},"output":{"description":"Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk.","anyOf":[{"$ref":"#/definitions/output"}]},"optimization":{"description":"Enables/Disables integrated optimizations","type":"object","additionalProperties":false,"properties":{"removeAvailableModules":{"description":"Removes modules from chunks when these modules are already included in all parents","type":"boolean"},"removeEmptyChunks":{"description":"Remove chunks which are empty","type":"boolean"},"mergeDuplicateChunks":{"description":"Merge chunks which contain the same modules","type":"boolean"},"flagIncludedChunks":{"description":"Also flag chunks as loaded which contain a subset of the modules","type":"boolean"},"occurrenceOrder":{"description":"Figure out a order of modules which results in the smallest initial bundle","type":"boolean"},"sideEffects":{"description":"Skip over modules which are flagged to contain no side effects when exports are not used","type":"boolean"},"providedExports":{"description":"Figure out which exports are provided by modules to generate more efficient code","type":"boolean"},"usedExports":{"description":"Figure out which exports are used by modules to mangle export names, omit unused exports and generate more efficient code","type":"boolean"},"concatenateModules":{"description":"Concatenate modules when possible to generate less modules, more efficient code and enable more optimizations by the minimizer","type":"boolean"},"splitChunks":{"description":"Optimize duplication and caching by splitting chunks by shared modules and cache group","oneOf":[{"enum":[false]},{"type":"object","additionalProperties":false,"properties":{"chunks":{"description":"Select chunks for determining shared modules (defaults to \\"async\\", \\"initial\\" and \\"all\\" requires adding these chunks to the HTML)","oneOf":[{"enum":["initial","async","all"]},{"instanceof":"Function"}]},"minSize":{"description":"Minimal size for the created chunk","type":"number","minimum":0},"minChunks":{"description":"Minimum number of times a module has to be duplicated until it\'s considered for splitting","type":"number","minimum":1},"maxAsyncRequests":{"description":"Maximum number of requests which are accepted for on-demand loading","type":"number","minimum":1},"maxInitialRequests":{"description":"Maximum number of initial chunks which are accepted for an entry point","type":"number","minimum":1},"name":{"description":"Give chunks created a name (chunks with equal name are merged)","oneOf":[{"type":"boolean"},{"instanceof":"Function"},{"type":"string"}]},"filename":{"description":"Sets the template for the filename for created chunks (Only works for initial chunks)","type":"string","minLength":1},"automaticNameDelimiter":{"description":"Sets the name delimiter for created chunks","type":"string","minLength":1},"cacheGroups":{"description":"Assign modules to a cache group (modules from different cache groups are tried to keep in separate chunks)","type":"object","additionalProperties":{"description":"Configuration for a cache group","anyOf":[{"enum":[false]},{"instanceof":"Function"},{"type":"string"},{"instanceof":"RegExp"},{"type":"object","additionalProperties":false,"properties":{"test":{"description":"Assign modules to a cache group","oneOf":[{"instanceof":"Function"},{"type":"string"},{"instanceof":"RegExp"}]},"chunks":{"description":"Select chunks for determining cache group content (defaults to \\"initial\\", \\"initial\\" and \\"all\\" requires adding these chunks to the HTML)","oneOf":[{"enum":["initial","async","all"]},{"instanceof":"Function"}]},"enforce":{"description":"Ignore minimum size, minimum chunks and maximum requests and always create chunks for this cache group","type":"boolean"},"priority":{"description":"Priority of this cache group","type":"number"},"minSize":{"description":"Minimal size for the created chunk","type":"number","minimum":0},"minChunks":{"description":"Minimum number of times a module has to be duplicated until it\'s considered for splitting","type":"number","minimum":1},"maxAsyncRequests":{"description":"Maximum number of requests which are accepted for on-demand loading","type":"number","minimum":1},"maxInitialRequests":{"description":"Maximum number of initial chunks which are accepted for an entry point","type":"number","minimum":1},"reuseExistingChunk":{"description":"Try to reuse existing chunk (with name) when it has matching modules","type":"boolean"},"name":{"description":"Give chunks for this cache group a name (chunks with equal name are merged)","oneOf":[{"type":"boolean"},{"instanceof":"Function"},{"type":"string"}]},"filename":{"description":"Sets the template for the filename for created chunks (Only works for initial chunks)","type":"string","minLength":1}}}]}}}}]},"runtimeChunk":{"description":"Create an additional chunk which contains only the webpack runtime and chunk hash maps","oneOf":[{"type":"boolean"},{"enum":["single","multiple"]},{"type":"object","additionalProperties":false,"properties":{"name":{"description":"The name or name factory for the runtime chunks","oneOf":[{"type":"string"},{"instanceof":"Function"}]}}}]},"noEmitOnErrors":{"description":"Avoid emitting assets when errors occur","type":"boolean"},"namedModules":{"description":"Use readable module identifiers for better debugging","type":"boolean"},"namedChunks":{"description":"Use readable chunk identifiers for better debugging","type":"boolean"},"portableRecords":{"description":"Generate records with relative paths to be able to move the context folder","type":"boolean"},"minimize":{"description":"Enable minimizing the output. Uses optimization.minimizer.","type":"boolean"},"minimizer":{"description":"Minimizer(s) to use for minimizing the output","type":"array","items":{"description":"Plugin of type object or instanceof Function","anyOf":[{"$ref":"#/definitions/common.pluginObject"},{"$ref":"#/definitions/common.pluginFunction"}]}},"nodeEnv":{"description":"Set process.env.NODE_ENV to a specific value","anyOf":[{"enum":[false]},{"type":"string"}]}}},"parallelism":{"description":"The number of parallel processed modules in the compilation.","minimum":1,"type":"number"},"performance":{"description":"Configuration for web performance recommendations.","anyOf":[{"enum":[false]},{"additionalProperties":false,"properties":{"assetFilter":{"description":"Filter function to select assets that are checked","instanceof":"Function"},"hints":{"description":"Sets the format of the hints: warnings, errors or nothing at all","enum":[false,"warning","error"]},"maxEntrypointSize":{"description":"Total size of an entry point (in bytes)","type":"number"},"maxAssetSize":{"description":"Filesize limit (in bytes) when exceeded, that webpack will provide performance hints","type":"number"}},"type":"object"}]},"plugins":{"description":"Add additional plugins to the compiler.","type":"array","items":{"description":"Plugin of type object or instanceof Function","anyOf":[{"$ref":"#/definitions/common.pluginObject"},{"$ref":"#/definitions/common.pluginFunction"}]}},"profile":{"description":"Capture timing information for each module.","type":"boolean"},"recordsInputPath":{"description":"Store compiler state to a json file.","type":"string","absolutePath":true},"recordsOutputPath":{"description":"Load compiler state from a json file.","type":"string","absolutePath":true},"recordsPath":{"description":"Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks. An absolute path is expected. `recordsPath` is used for `recordsInputPath` and `recordsOutputPath` if they left undefined.","type":"string","absolutePath":true},"resolve":{"description":"Options for the resolver","anyOf":[{"$ref":"#/definitions/resolve"}]},"resolveLoader":{"description":"Options for the resolver when resolving loaders","anyOf":[{"$ref":"#/definitions/resolve"}]},"serve":{"description":"Options for webpack-dev-server","type":"object"},"stats":{"description":"Used by the webpack CLI program to pass stats options.","anyOf":[{"type":"object","additionalProperties":false,"properties":{"all":{"type":"boolean","description":"fallback value for stats options when an option is not defined (has precedence over local webpack defaults)"},"context":{"type":"string","description":"context directory for request shortening","absolutePath":true},"hash":{"type":"boolean","description":"add the hash of the compilation"},"version":{"type":"boolean","description":"add webpack version information"},"timings":{"type":"boolean","description":"add timing information"},"builtAt":{"type":"boolean","description":"add built at time information"},"performance":{"type":"boolean","description":"add performance hint flags"},"depth":{"type":"boolean","description":"add module depth in module graph"},"assets":{"type":"boolean","description":"add assets information"},"env":{"type":"boolean","description":"add --env information"},"colors":{"description":"Enables/Disables colorful output","oneOf":[{"type":"boolean","description":"`webpack --colors` equivalent"},{"type":"object","additionalProperties":false,"properties":{"bold":{"description":"Custom color for bold text","type":"string"},"red":{"description":"Custom color for red text","type":"string"},"green":{"description":"Custom color for green text","type":"string"},"cyan":{"description":"Custom color for cyan text","type":"string"},"magenta":{"description":"Custom color for magenta text","type":"string"},"yellow":{"description":"Custom color for yellow text","type":"string"}}}]},"maxModules":{"type":"number","description":"Set the maximum number of modules to be shown"},"chunks":{"type":"boolean","description":"add chunk information"},"chunkModules":{"type":"boolean","description":"add built modules information to chunk information"},"modules":{"type":"boolean","description":"add built modules information"},"nestedModules":{"type":"boolean","description":"add information about modules nested in other modules (like with module concatenation)"},"moduleAssets":{"type":"boolean","description":"add information about assets inside modules"},"children":{"type":"boolean","description":"add children information"},"cached":{"type":"boolean","description":"add also information about cached (not built) modules"},"cachedAssets":{"type":"boolean","description":"Show cached assets (setting this to `false` only shows emitted files)"},"reasons":{"type":"boolean","description":"add information about the reasons why modules are included"},"source":{"type":"boolean","description":"add the source code of modules"},"warnings":{"type":"boolean","description":"add warnings"},"errors":{"type":"boolean","description":"add errors"},"warningsFilter":{"description":"Suppress warnings that match the specified filters. Filters can be Strings, RegExps or Functions","anyOf":[{"$ref":"#/definitions/filter-types"}]},"excludeAssets":{"description":"Suppress assets that match the specified filters. Filters can be Strings, RegExps or Functions","anyOf":[{"$ref":"#/definitions/filter-types"}]},"excludeModules":{"description":"Suppress modules that match the specified filters. Filters can be Strings, RegExps, Booleans or Functions","anyOf":[{"$ref":"#/definitions/filter-types"},{"type":"boolean"}]},"exclude":{"description":"Please use excludeModules instead.","anyOf":[{"$ref":"#/definitions/filter-types"},{"type":"boolean"}]},"entrypoints":{"type":"boolean","description":"Display the entry points with the corresponding bundles"},"chunkGroups":{"type":"boolean","description":"Display all chunk groups with the corresponding bundles"},"errorDetails":{"type":"boolean","description":"add details to errors (like resolving log)"},"chunkOrigins":{"type":"boolean","description":"add the origins of chunks and chunk merging info"},"modulesSort":{"type":"string","description":"sort the modules by that field"},"moduleTrace":{"type":"boolean","description":"add dependencies and origin of warnings/errors"},"chunksSort":{"type":"string","description":"sort the chunks by that field"},"assetsSort":{"type":"string","description":"sort the assets by that field"},"publicPath":{"type":"boolean","description":"Add public path information"},"outputPath":{"type":"boolean","description":"Add output path information"},"providedExports":{"type":"boolean","description":"show exports provided by modules"},"usedExports":{"type":"boolean","description":"show exports used by modules"},"optimizationBailout":{"type":"boolean","description":"show reasons why optimization bailed out for modules"}}},{"type":"boolean"},{"enum":["none","errors-only","minimal","normal","detailed","verbose"]}]},"target":{"description":"Environment to build for","anyOf":[{"enum":["web","webworker","node","async-node","node-webkit","electron-main","electron-renderer"]},{"instanceof":"Function"}]},"watch":{"description":"Enter watch mode, which rebuilds on file change.","type":"boolean"},"watchOptions":{"description":"Options for the watcher","additionalProperties":false,"properties":{"aggregateTimeout":{"description":"Delay the rebuilt after the first change. Value is a time in ms.","type":"number"},"ignored":{"description":"Ignore some files from watching"},"stdin":{"description":"Stop watching when stdin stream has ended","type":"boolean"},"poll":{"description":"Enable polling mode for watching","anyOf":[{"description":"`true`: use polling.","type":"boolean"},{"description":"`number`: use polling with specified interval.","type":"number"}]}},"type":"object"}},"type":"object"}');
}, function(module, exports, __webpack_require__) {
  module.exports = (flag, argv) => {
    argv = argv || process.argv;
    const prefix = flag.startsWith("-") ? "" : 1 === flag.length ? "-" : "--", pos = argv.indexOf(prefix + flag), terminatorPos = argv.indexOf("--");
    return -1 !== pos && (-1 === terminatorPos || pos < terminatorPos);
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    const path = __webpack_require__(0), fs = __webpack_require__(2);
    fs.existsSync = fs.existsSync || path.existsSync;
    const interpret = __webpack_require__(34), prepareOptions = __webpack_require__(35), findup = __webpack_require__(36), validateOptions = __webpack_require__(43);
    module.exports = function(...args) {
      const argv = args[1] || args[0], options = [];
      if (argv.d && (argv.debug = !0, argv["output-pathinfo"] = !0, argv.devtool || (argv.devtool = "eval-cheap-module-source-map"), 
      argv.mode || (argv.mode = "development")), argv.p && (argv["optimize-minimize"] = !0, 
      argv.define = [].concat(argv.define || []).concat('process.env.NODE_ENV="production"'), 
      argv.mode || (argv.mode = "production")), argv.output) {
        let output = argv.output;
        path.isAbsolute(argv.o) || (output = path.resolve(process.cwd(), output)), argv["output-filename"] = path.basename(output), 
        argv["output-path"] = path.dirname(output);
      }
      let configFileLoaded = !1, configFiles = [];
      const extensions = Object.keys(interpret.extensions).sort((function(a, b) {
        return ".js" === a ? -1 : ".js" === b ? 1 : a.length - b.length;
      }));
      let i;
      if (argv.config) {
        const getConfigExtension = function(configPath) {
          for (i = extensions.length - 1; i >= 0; i--) {
            const tmpExt = extensions[i];
            if (configPath.indexOf(tmpExt, configPath.length - tmpExt.length) > -1) return tmpExt;
          }
          return path.extname(configPath);
        }, mapConfigArg = function(configArg) {
          const resolvedPath = path.resolve(configArg);
          return {
            path: resolvedPath,
            ext: getConfigExtension(resolvedPath)
          };
        };
        configFiles = (Array.isArray(argv.config) ? argv.config : [ argv.config ]).map(mapConfigArg);
      } else {
        const defaultConfigFileNames = [ "webpack.config", "webpackfile" ].join("|"), webpackConfigFileRegExp = `(${defaultConfigFileNames})(${extensions.join("|")})`, pathToWebpackConfig = findup(webpackConfigFileRegExp);
        if (pathToWebpackConfig) {
          const resolvedPath = path.resolve(pathToWebpackConfig), ext = path.basename(resolvedPath).replace(new RegExp(defaultConfigFileNames), "");
          configFiles.push({
            path: resolvedPath,
            ext: ext
          });
        }
      }
      if (configFiles.length > 0) {
        const registerCompiler = function registerCompiler(moduleDescriptor) {
          if (moduleDescriptor) if ("string" == typeof moduleDescriptor) require(moduleDescriptor); else if (Array.isArray(moduleDescriptor)) for (let i = 0; i < moduleDescriptor.length; i++) try {
            registerCompiler(moduleDescriptor[i]);
            break;
          } catch (e) {} else moduleDescriptor.register(require(moduleDescriptor.module));
        }, requireConfig = function(configPath) {
          let options = argv.configRegister && argv.configRegister.length ? (module.paths.unshift(path.resolve(process.cwd(), "node_modules"), process.cwd()), 
          argv.configRegister.forEach(dep => {
            require(dep);
          }), require(path.resolve(process.cwd(), configPath))) : require(path.resolve(process.cwd(), configPath));
          return options = prepareOptions(options, argv), options;
        };
        configFiles.forEach((function(file) {
          registerCompiler(interpret.extensions[file.ext]), options.push(requireConfig(file.path));
        })), configFileLoaded = !0;
      }
      return configFileLoaded ? 1 === options.length ? processConfiguredOptions(options[0]) : processConfiguredOptions(options) : processConfiguredOptions();
      function processConfiguredOptions(options) {
        if (options ? validateOptions(options) : options = {}, "function" == typeof options.then) return options.then(processConfiguredOptions);
        if ("object" == typeof options && "object" == typeof options.default) return processConfiguredOptions(options.default);
        if (Array.isArray(options) && argv["config-name"]) {
          const namedOptions = options.filter((function(opt) {
            return opt.name === argv["config-name"];
          }));
          if (0 === namedOptions.length) console.error("Configuration with name '" + argv["config-name"] + "' was not found."), 
          process.exit(-1); else if (1 === namedOptions.length) return processConfiguredOptions(namedOptions[0]);
          options = namedOptions;
        }
        return Array.isArray(options) ? options.forEach(processOptions) : processOptions(options), 
        argv.context && (options.context = path.resolve(argv.context)), options.context || (options.context = process.cwd()), 
        argv.watch && (options.watch = !0), argv["watch-aggregate-timeout"] && (options.watchOptions = options.watchOptions || {}, 
        options.watchOptions.aggregateTimeout = +argv["watch-aggregate-timeout"]), void 0 !== argv["watch-poll"] && (options.watchOptions = options.watchOptions || {}, 
        "true" === argv["watch-poll"] || "" === argv["watch-poll"] ? options.watchOptions.poll = !0 : isNaN(argv["watch-poll"]) || (options.watchOptions.poll = +argv["watch-poll"])), 
        argv["watch-stdin"] && (options.watchOptions = options.watchOptions || {}, options.watchOptions.stdin = !0, 
        options.watch = !0), options;
      }
      function processOptions(options) {
        function ifArg(name, fn, init, finalize) {
          const isArray = Array.isArray(argv[name]), isSet = void 0 !== argv[name] && null !== argv[name];
          (isArray || isSet) && (init && init(), isArray ? argv[name].forEach(fn) : isSet && fn(argv[name], -1), 
          finalize && finalize());
        }
        function ifArgPair(name, fn, init, finalize) {
          ifArg(name, (function(content, idx) {
            const i = content.indexOf("=");
            return i < 0 ? fn(null, content, idx) : fn(content.substr(0, i), content.substr(i + 1), idx);
          }), init, finalize);
        }
        function ifBooleanArg(name, fn) {
          ifArg(name, (function(bool) {
            bool && fn();
          }));
        }
        function mapArgToBoolean(name, optionName) {
          ifArg(name, (function(bool) {
            !0 === bool ? options[optionName || name] = !0 : !1 === bool && (options[optionName || name] = !1);
          }));
        }
        function ensureObject(parent, name, force) {
          (force || "object" != typeof parent[name] || null === parent[name]) && (parent[name] = {});
        }
        function ensureArray(parent, name) {
          Array.isArray(parent[name]) || (parent[name] = []);
        }
        function addPlugin(options, plugin) {
          ensureArray(options, "plugins"), options.plugins.unshift(plugin);
        }
        function bindRules(arg) {
          ifArgPair(arg, (function(name, binding) {
            null === name && (name = binding, binding += "-loader");
            const rule = {
              test: new RegExp("\\." + name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "$"),
              loader: binding
            };
            "module-bind-pre" === arg ? rule.enforce = "pre" : "module-bind-post" === arg && (rule.enforce = "post"), 
            options.module.rules.push(rule);
          }), (function() {
            ensureObject(options, "module"), ensureArray(options.module, "rules");
          }));
        }
        let defineObject;
        function processResolveAlias(arg, key) {
          ifArgPair(arg, (function(name, value) {
            if (!name) throw new Error("--" + arg + " <string>=<string>");
            ensureObject(options, key), ensureObject(options[key], "alias"), options[key].alias[name] = value;
          }));
        }
        if (ifArg("mode", (function(value) {
          options.mode = value;
        })), ifArgPair("entry", (function(name, entry) {
          void 0 !== options.entry[name] && null !== options.entry[name] ? options.entry[name] = [].concat(options.entry[name]).concat(entry) : options.entry[name] = entry;
        }), (function() {
          ensureObject(options, "entry", !0);
        })), bindRules("module-bind"), bindRules("module-bind-pre"), bindRules("module-bind-post"), 
        ifArgPair("define", (function(name, value) {
          null === name && (name = value, value = !0), defineObject[name] = value;
        }), (function() {
          defineObject = {};
        }), (function() {
          const DefinePlugin = __webpack_require__(1).DefinePlugin;
          addPlugin(options, new DefinePlugin(defineObject));
        })), ifArg("output-path", (function(value) {
          ensureObject(options, "output"), options.output.path = path.resolve(value);
        })), ifArg("output-filename", (function(value) {
          ensureObject(options, "output"), options.output.filename = value;
        })), ifArg("output-chunk-filename", (function(value) {
          ensureObject(options, "output"), options.output.chunkFilename = value;
        })), ifArg("output-source-map-filename", (function(value) {
          ensureObject(options, "output"), options.output.sourceMapFilename = value;
        })), ifArg("output-public-path", (function(value) {
          ensureObject(options, "output"), options.output.publicPath = value;
        })), ifArg("output-jsonp-function", (function(value) {
          ensureObject(options, "output"), options.output.jsonpFunction = value;
        })), ifBooleanArg("output-pathinfo", (function() {
          ensureObject(options, "output"), options.output.pathinfo = !0;
        })), ifArg("output-library", (function(value) {
          ensureObject(options, "output"), ensureArray(options.output, "library"), options.output.library.push(value);
        })), ifArg("output-library-target", (function(value) {
          ensureObject(options, "output"), options.output.libraryTarget = value;
        })), ifArg("records-input-path", (function(value) {
          options.recordsInputPath = path.resolve(value);
        })), ifArg("records-output-path", (function(value) {
          options.recordsOutputPath = path.resolve(value);
        })), ifArg("records-path", (function(value) {
          options.recordsPath = path.resolve(value);
        })), ifArg("target", (function(value) {
          options.target = value;
        })), mapArgToBoolean("cache"), ifBooleanArg("hot", (function() {
          const HotModuleReplacementPlugin = __webpack_require__(1).HotModuleReplacementPlugin;
          addPlugin(options, new HotModuleReplacementPlugin);
        })), ifBooleanArg("no-cache", (function() {
          options.cache = !1;
        })), ifBooleanArg("debug", (function() {
          const LoaderOptionsPlugin = __webpack_require__(1).LoaderOptionsPlugin;
          addPlugin(options, new LoaderOptionsPlugin({
            debug: !0
          }));
        })), ifArg("devtool", (function(value) {
          options.devtool = value;
        })), processResolveAlias("resolve-alias", "resolve"), processResolveAlias("resolve-loader-alias", "resolveLoader"), 
        ifArg("resolve-extensions", (function(value) {
          ensureObject(options, "resolve"), Array.isArray(value) ? options.resolve.extensions = value : options.resolve.extensions = value.split(/,\s*/);
        })), ifArg("optimize-max-chunks", (function(value) {
          const LimitChunkCountPlugin = __webpack_require__(1).optimize.LimitChunkCountPlugin;
          addPlugin(options, new LimitChunkCountPlugin({
            maxChunks: parseInt(value, 10)
          }));
        })), ifArg("optimize-min-chunk-size", (function(value) {
          const MinChunkSizePlugin = __webpack_require__(1).optimize.MinChunkSizePlugin;
          addPlugin(options, new MinChunkSizePlugin({
            minChunkSize: parseInt(value, 10)
          }));
        })), ifBooleanArg("optimize-minimize", (function() {
          const LoaderOptionsPlugin = __webpack_require__(1).LoaderOptionsPlugin;
          addPlugin(options, new LoaderOptionsPlugin({
            minimize: !0
          }));
        })), ifArg("prefetch", (function(request) {
          const PrefetchPlugin = __webpack_require__(1).PrefetchPlugin;
          addPlugin(options, new PrefetchPlugin(request));
        })), ifArg("provide", (function(value) {
          const idx = value.indexOf("=");
          let name;
          idx >= 0 ? (name = value.substr(0, idx), value = value.substr(idx + 1)) : name = value;
          const ProvidePlugin = __webpack_require__(1).ProvidePlugin;
          addPlugin(options, new ProvidePlugin(name, value));
        })), ifArg("plugin", (function(value) {
          addPlugin(options, function(name) {
            const loadUtils = __webpack_require__(45);
            let args, path, Plugin;
            try {
              const p = name && name.indexOf("?");
              p > -1 && (args = loadUtils.parseQuery(name.substring(p)), name = name.substring(0, p));
            } catch (e) {
              console.log("Invalid plugin arguments " + name + " (" + e + ")."), process.exit(-1);
            }
            try {
              path = __webpack_require__(46).sync(process.cwd(), name);
            } catch (e) {
              console.log("Cannot resolve plugin " + name + "."), process.exit(-1);
            }
            try {
              Plugin = require(path);
            } catch (e) {
              throw console.log("Cannot load plugin " + name + ". (" + path + ")"), e;
            }
            try {
              return new Plugin(args);
            } catch (e) {
              throw console.log("Cannot instantiate plugin " + name + ". (" + path + ")"), e;
            }
          }(value));
        })), mapArgToBoolean("bail"), mapArgToBoolean("profile"), argv._.length > 0) {
          ensureObject(options, "entry", !0);
          const addTo = function(name, entry) {
            options.entry[name] ? (Array.isArray(options.entry[name]) || (options.entry[name] = [ options.entry[name] ]), 
            options.entry[name].push(entry)) : options.entry[name] = entry;
          };
          argv._.forEach((function(content) {
            const i = content.indexOf("="), j = content.indexOf("?");
            if (i < 0 || j >= 0 && j < i) {
              const resolved = path.resolve(content);
              fs.existsSync(resolved) ? addTo("main", `${resolved}${fs.statSync(resolved).isDirectory() ? path.sep : ""}`) : addTo("main", content);
            } else addTo(content.substr(0, i), content.substr(i + 1));
          }));
        }
      }
    };
  }).call(this, __webpack_require__(8)(module));
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var extensions = {
      ".babel.js": [ {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      }, {
        module: "babel-register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      }, {
        module: "babel-core/register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      }, {
        module: "babel/register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      } ],
      ".babel.ts": [ {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".ts"
          });
        }
      } ],
      ".buble.js": "buble/register",
      ".cirru": "cirru-script/lib/register",
      ".cjsx": "node-cjsx/register",
      ".co": "coco",
      ".coffee": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
      ".coffee.md": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
      ".csv": "require-csv",
      ".eg": "earlgrey/register",
      ".esm.js": {
        module: "esm",
        register: function(hook) {
          var esmLoader = hook(module);
          require.extensions[".js"] = esmLoader("module")._extensions[".js"];
        }
      },
      ".iced": [ "iced-coffee-script/register", "iced-coffee-script" ],
      ".iced.md": "iced-coffee-script/register",
      ".ini": "require-ini",
      ".js": null,
      ".json": null,
      ".json5": "json5/lib/require",
      ".jsx": [ {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "babel-register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "babel-core/register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "babel/register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "node-jsx",
        register: function(hook) {
          hook.install({
            extension: ".jsx",
            harmony: !0
          });
        }
      } ],
      ".litcoffee": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
      ".liticed": "iced-coffee-script/register",
      ".ls": [ "livescript", "LiveScript" ],
      ".mjs": {
        module: "mjs-stub",
        register: function(hook) {
          require.extensions[".mjs"] = null;
        }
      },
      ".node": null,
      ".toml": {
        module: "toml-require",
        register: function(hook) {
          hook.install();
        }
      },
      ".ts": [ "ts-node/register", "typescript-node/register", "typescript-register", "typescript-require", "sucrase/register/ts", {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".ts"
          });
        }
      } ],
      ".tsx": [ "ts-node/register", "typescript-node/register", "sucrase/register", {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".tsx"
          });
        }
      } ],
      ".wisp": "wisp/engine/node",
      ".xml": "require-xml",
      ".yaml": "require-yaml",
      ".yml": "require-yaml"
    };
    module.exports = {
      extensions: extensions,
      jsVariants: [ ".js", ".babel.js", ".babel.ts", ".buble.js", ".cirru", ".cjsx", ".co", ".coffee", ".coffee.md", ".eg", ".esm.js", ".iced", ".iced.md", ".jsx", ".litcoffee", ".liticed", ".ls", ".mjs", ".ts", ".tsx", ".wisp" ].reduce((function(result, ext) {
        return result[ext] = extensions[ext], result;
      }), {})
    };
  }).call(this, __webpack_require__(8)(module));
}, function(module, exports, __webpack_require__) {
  function handleFunction(options, argv) {
    return "function" == typeof options && (options = options(argv.env, argv)), options;
  }
  module.exports = function(options, argv) {
    return argv = argv || {}, options = function(options) {
      return "object" == typeof options && null !== options && void 0 !== options.default ? options.default : options;
    }(options), Array.isArray(options) ? options.map(_options => handleFunction(_options, argv)) : handleFunction(options, argv);
  };
}, function(module, exports, __webpack_require__) {
  var fs = __webpack_require__(2), path = __webpack_require__(0), isGlob = __webpack_require__(37), resolveDir = __webpack_require__(39), detect = __webpack_require__(41), mm = __webpack_require__(42);
  function lookup(cwd, patterns, options) {
    for (var res, len = patterns.length, idx = -1; ++idx < len; ) if (res = isGlob(patterns[idx]) ? matchFile(cwd, patterns[idx], options) : findFile(cwd, patterns[idx], options)) return res;
    var dir = path.dirname(cwd);
    return dir === cwd ? null : lookup(dir, patterns, options);
  }
  function matchFile(cwd, pattern, opts) {
    for (var isMatch = mm.matcher(pattern, opts), files = function(fp) {
      try {
        return fs.readdirSync(fp);
      } catch (err) {}
      return [];
    }(cwd), len = files.length, idx = -1; ++idx < len; ) {
      var name = files[idx], fp = path.join(cwd, name);
      if (isMatch(name) || isMatch(fp)) return fp;
    }
    return null;
  }
  function findFile(cwd, filename, options) {
    var fp = cwd ? path.resolve(cwd, filename) : filename;
    return detect(fp, options);
  }
  module.exports = function(patterns, options) {
    options = options || {};
    var cwd = path.resolve(resolveDir(options.cwd || ""));
    if ("string" == typeof patterns) return lookup(cwd, [ patterns ], options);
    if (!Array.isArray(patterns)) throw new TypeError("findup-sync expects a string or array as the first argument.");
    return lookup(cwd, patterns, options);
  };
}, function(module, exports, __webpack_require__) {
  var isExtglob = __webpack_require__(38), chars = {
    "{": "}",
    "(": ")",
    "[": "]"
  }, strictCheck = function(str) {
    if ("!" === str[0]) return !0;
    for (var index = 0, pipeIndex = -2, closeSquareIndex = -2, closeCurlyIndex = -2, closeParenIndex = -2, backSlashIndex = -2; index < str.length; ) {
      if ("*" === str[index]) return !0;
      if ("?" === str[index + 1] && /[\].+)]/.test(str[index])) return !0;
      if (-1 !== closeSquareIndex && "[" === str[index] && "]" !== str[index + 1] && (closeSquareIndex < index && (closeSquareIndex = str.indexOf("]", index)), 
      closeSquareIndex > index)) {
        if (-1 === backSlashIndex || backSlashIndex > closeSquareIndex) return !0;
        if (-1 === (backSlashIndex = str.indexOf("\\", index)) || backSlashIndex > closeSquareIndex) return !0;
      }
      if (-1 !== closeCurlyIndex && "{" === str[index] && "}" !== str[index + 1] && (closeCurlyIndex = str.indexOf("}", index)) > index && (-1 === (backSlashIndex = str.indexOf("\\", index)) || backSlashIndex > closeCurlyIndex)) return !0;
      if (-1 !== closeParenIndex && "(" === str[index] && "?" === str[index + 1] && /[:!=]/.test(str[index + 2]) && ")" !== str[index + 3] && (closeParenIndex = str.indexOf(")", index)) > index && (-1 === (backSlashIndex = str.indexOf("\\", index)) || backSlashIndex > closeParenIndex)) return !0;
      if (-1 !== pipeIndex && "(" === str[index] && "|" !== str[index + 1] && (pipeIndex < index && (pipeIndex = str.indexOf("|", index)), 
      -1 !== pipeIndex && ")" !== str[pipeIndex + 1] && (closeParenIndex = str.indexOf(")", pipeIndex)) > pipeIndex && (-1 === (backSlashIndex = str.indexOf("\\", pipeIndex)) || backSlashIndex > closeParenIndex))) return !0;
      if ("\\" === str[index]) {
        var open = str[index + 1];
        index += 2;
        var close = chars[open];
        if (close) {
          var n = str.indexOf(close, index);
          -1 !== n && (index = n + 1);
        }
        if ("!" === str[index]) return !0;
      } else index++;
    }
    return !1;
  }, relaxedCheck = function(str) {
    if ("!" === str[0]) return !0;
    for (var index = 0; index < str.length; ) {
      if (/[*?{}()[\]]/.test(str[index])) return !0;
      if ("\\" === str[index]) {
        var open = str[index + 1];
        index += 2;
        var close = chars[open];
        if (close) {
          var n = str.indexOf(close, index);
          -1 !== n && (index = n + 1);
        }
        if ("!" === str[index]) return !0;
      } else index++;
    }
    return !1;
  };
  module.exports = function(str, options) {
    if ("string" != typeof str || "" === str) return !1;
    if (isExtglob(str)) return !0;
    var check = strictCheck;
    return options && !1 === options.strict && (check = relaxedCheck), check(str);
  };
}, function(module, exports) {
  module.exports = function(str) {
    if ("string" != typeof str || "" === str) return !1;
    for (var match; match = /(\\).|([@?!+*]\(.*\))/g.exec(str); ) {
      if (match[2]) return !0;
      str = str.slice(match.index + match[0].length);
    }
    return !1;
  };
}, function(module, exports, __webpack_require__) {
  var path = __webpack_require__(0), expand = __webpack_require__(40), gm = __webpack_require__(6);
  module.exports = function(dir) {
    return "~" === dir.charAt(0) && (dir = expand(dir)), "@" === dir.charAt(0) && (dir = path.join(gm, dir.slice(1))), 
    dir;
  };
}, function(module, exports, __webpack_require__) {
  var homedir = __webpack_require__(4).homedir, path = __webpack_require__(0);
  module.exports = function(filepath) {
    var home = homedir();
    return 126 === filepath.charCodeAt(0) ? 43 === filepath.charCodeAt(1) ? path.join(process.cwd(), filepath.slice(2)) : home ? path.join(home, filepath.slice(1)) : filepath : filepath;
  };
}, function(module, exports, __webpack_require__) {
  var fs = __webpack_require__(2), path = __webpack_require__(0);
  module.exports = function(filepath, options) {
    return filepath && "string" == typeof filepath ? fs.existsSync(filepath) ? path.resolve(filepath) : !0 === (options = options || {}).nocase ? function(filepath) {
      var res = function(filepath) {
        var ctx = {
          path: filepath,
          files: []
        };
        try {
          return ctx.files = fs.readdirSync(filepath), ctx;
        } catch (err) {}
        try {
          return ctx.path = path.dirname(filepath), ctx.files = fs.readdirSync(ctx.path), 
          ctx;
        } catch (err) {}
        return null;
      }(filepath = path.resolve(filepath));
      if (null === res) return null;
      if (res.path === filepath) return res.path;
      var upper = filepath.toUpperCase(), len = res.files.length, idx = -1;
      for (;++idx < len; ) {
        var fp = path.resolve(res.path, res.files[idx]);
        if (filepath === fp || upper === fp) return fp;
        var fpUpper = fp.toUpperCase();
        if (filepath === fpUpper || upper === fpUpper) return fp;
      }
      return null;
    }(filepath) : null : null;
  };
}, function(module, exports) {
  module.exports = require("../vendor/micromatch");
}, function(module, exports, __webpack_require__) {
  const webpackConfigurationSchema = __webpack_require__(44), validateSchema = __webpack_require__(1).validateSchema;
  module.exports = function(options) {
    let error;
    try {
      const errors = validateSchema(webpackConfigurationSchema, options);
      if (errors && errors.length > 0) {
        const {WebpackOptionsValidationError: WebpackOptionsValidationError} = __webpack_require__(1);
        error = new WebpackOptionsValidationError(errors);
      }
    } catch (err) {
      error = err;
    }
    error && (console.error(error.message), process.exit(-1));
  };
}, function(module) {
  module.exports = JSON.parse('{"anyOf":[{"type":"object","description":"A webpack configuration object."},{"type":"array","description":"An array of webpack configuration objects.","items":{"description":"A webpack configuration object.","type":"object"}},{"instanceof":"Promise","description":"A promise that resolves with a configuration object, or an array of configuration objects."}]}');
}, function(module, exports) {
  module.exports = require("../lib/loader-utils");
}, function(module, exports) {
  module.exports = require("../lib/enhanced-resolve");
} ]);