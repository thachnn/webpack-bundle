(() => {
  var __webpack_modules__ = {
    23789: (module, __unused_webpack_exports, __webpack_require__) => {
      var core;
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
      core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(34690) : __webpack_require__(62015), 
      module.exports = isexe, isexe.sync = function(path, options) {
        try {
          return core.sync(path, options || {});
        } catch (er) {
          if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
          throw er;
        }
      };
    },
    62015: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), options);
      };
      var fs = __webpack_require__(57147);
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
    },
    34690: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), path, options);
      };
      var fs = __webpack_require__(57147);
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
    },
    41718: (module, __unused_webpack_exports, __webpack_require__) => {
      var path = __webpack_require__(71017), fs = __webpack_require__(57147), _0777 = parseInt("0777", 8);
      function mkdirP(p, opts, f, made) {
        "function" == typeof opts ? (f = opts, opts = {}) : opts && "object" == typeof opts || (opts = {
          mode: opts
        });
        var mode = opts.mode, xfs = opts.fs || fs;
        void 0 === mode && (mode = _0777), made || (made = null);
        var cb = f || function() {};
        p = path.resolve(p), xfs.mkdir(p, mode, (function(er) {
          if (!er) return cb(null, made = made || p);
          if ("ENOENT" === er.code) {
            if (path.dirname(p) === p) return cb(er);
            mkdirP(path.dirname(p), opts, (function(er, made) {
              er ? cb(er, made) : mkdirP(p, opts, cb, made);
            }));
          } else xfs.stat(p, (function(er2, stat) {
            er2 || !stat.isDirectory() ? cb(er, made) : cb(null, made);
          }));
        }));
      }
      module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP, mkdirP.sync = function sync(p, opts, made) {
        opts && "object" == typeof opts || (opts = {
          mode: opts
        });
        var mode = opts.mode, xfs = opts.fs || fs;
        void 0 === mode && (mode = _0777), made || (made = null), p = path.resolve(p);
        try {
          xfs.mkdirSync(p, mode), made = made || p;
        } catch (err0) {
          if ("ENOENT" === err0.code) made = sync(path.dirname(p), opts, made), sync(p, opts, made); else {
            var stat;
            try {
              stat = xfs.statSync(p);
            } catch (err1) {
              throw err0;
            }
            if (!stat.isDirectory()) throw err0;
          }
        }
        return made;
      };
    },
    65983: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(59799), path = __webpack_require__(71017), glob = __webpack_require__(34436), log = __webpack_require__(19334), which = __webpack_require__(7017), win = "win32" === process.platform;
      module.exports = function(gyp, argv, callback) {
        var platformMake = "make";
        "aix" === process.platform || -1 !== process.platform.indexOf("bsd") ? platformMake = "gmake" : win && argv.length > 0 && (argv = argv.map((function(target) {
          return "/t:" + target;
        })));
        var buildType, config, arch, nodeDir, guessedSolution, configPath, makeCommand = gyp.opts.make || process.env.MAKE || platformMake, command = win ? "msbuild" : makeCommand, jobs = gyp.opts.jobs || process.env.JOBS;
        function doWhich() {
          if (win) return config.variables.msbuild_path ? (command = config.variables.msbuild_path, 
          log.verbose("using MSBuild:", command), void doBuild()) : callback(new Error("MSBuild is not set, please run `node-gyp configure`."));
          which(command, (function(err, execPath) {
            err ? callback(err) : (log.verbose("`which` succeeded for `" + command + "`", execPath), 
            doBuild());
          }));
        }
        function doBuild() {
          var j, verbose = log.levels[log.level] <= log.levels.verbose;
          if (!win && verbose && argv.push("V=1"), win && !verbose && argv.push("/clp:Verbosity=minimal"), 
          win && argv.push("/nologo"), win) {
            var archLower = arch.toLowerCase(), p = "x64" === archLower ? "x64" : "arm" === archLower ? "ARM" : "arm64" === archLower ? "ARM64" : "Win32";
            argv.push("/p:Configuration=" + buildType + ";Platform=" + p), jobs && (j = parseInt(jobs, 10), 
            !isNaN(j) && j > 0 ? argv.push("/m:" + j) : "MAX" === jobs.toUpperCase() && argv.push("/m:" + __webpack_require__(22037).cpus().length));
          } else argv.push("BUILDTYPE=" + buildType), argv.push("-C"), argv.push("build"), 
          jobs && (j = parseInt(jobs, 10), !isNaN(j) && j > 0 ? (argv.push("--jobs"), argv.push(j)) : "MAX" === jobs.toUpperCase() && (argv.push("--jobs"), 
          argv.push(__webpack_require__(22037).cpus().length)));
          win && (argv.some((function(arg) {
            return ".sln" === path.extname(arg);
          })) || argv.unshift(gyp.opts.solution || guessedSolution));
          gyp.spawn(command, argv).on("exit", onExit);
        }
        function onExit(code, signal) {
          return 0 !== code ? callback(new Error("`" + command + "` failed with exit code: " + code)) : signal ? callback(new Error("`" + command + "` got signal: " + signal)) : void callback();
        }
        configPath = path.resolve("build", "config.gypi"), fs.readFile(configPath, "utf8", (function(err, data) {
          err ? "ENOENT" === err.code ? callback(new Error("You must run `node-gyp configure` first!")) : callback(err) : (config = JSON.parse(data.replace(/#.+\n/, "")), 
          buildType = config.target_defaults.default_configuration, arch = config.variables.target_arch, 
          nodeDir = config.variables.nodedir, "debug" in gyp.opts && (buildType = gyp.opts.debug ? "Debug" : "Release"), 
          buildType || (buildType = "Release"), log.verbose("build type", buildType), log.verbose("architecture", arch), 
          log.verbose("node dev dir", nodeDir), win ? glob("build/*.sln", (function(err, files) {
            return err ? callback(err) : 0 === files.length ? callback(new Error('Could not find *.sln file. Did you run "configure"?')) : (guessedSolution = files[0], 
            log.verbose("found first Solution file", guessedSolution), void doWhich());
          })) : doWhich());
        }));
      }, module.exports.usage = "Invokes `" + (win ? "msbuild" : "make") + "` and builds the module";
    },
    78600: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const rm = __webpack_require__(68259), log = __webpack_require__(19334);
      module.exports = function(gyp, argv, callback) {
        log.verbose("clean", 'removing "%s" directory', "build"), rm("build", callback);
      }, module.exports.usage = 'Removes any generated build files and the "out" dir';
    },
    92734: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(59799), path = __webpack_require__(71017), log = __webpack_require__(19334), os = __webpack_require__(22037), mkdirp = __webpack_require__(41718), processRelease = __webpack_require__(30564), win = "win32" === process.platform, findNodeDirectory = __webpack_require__(49972), msgFormat = __webpack_require__(73837).format;
      var findPython = __webpack_require__(24968);
      if (win) var findVisualStudio = __webpack_require__(49333);
      function findAccessibleSync(logprefix, dir, candidates) {
        for (var next = 0; next < candidates.length; next++) {
          var candidate = path.resolve(dir, candidates[next]);
          try {
            var fd = fs.openSync(candidate, "r");
          } catch (e) {
            log.silly(logprefix, "Could not open %s: %s", candidate, e.message);
            continue;
          }
          return fs.closeSync(fd), log.silly(logprefix, "Found readable %s", candidate), candidate;
        }
      }
      module.exports = function(gyp, argv, callback) {
        var python, nodeDir, buildDir = path.resolve("build"), configNames = [ "config.gypi", "common.gypi" ], configs = [], release = processRelease(argv, gyp, process.version, process.release);
        function createBuildDir() {
          log.verbose("build dir", 'attempting to create "build" dir: %s', buildDir), mkdirp(buildDir, (function(err, isNew) {
            if (err) return callback(err);
            log.verbose("build dir", '"build" dir needed to be created?', isNew), win ? findVisualStudio(release.semver, gyp.opts.msvs_version, createConfigFile) : createConfigFile();
          }));
        }
        function createConfigFile(err, vsInfo) {
          if (err) return callback(err);
          var configPath = path.resolve(buildDir, "config.gypi");
          log.verbose("build/config.gypi", "creating config file");
          var config = process.config || {}, defaults = config.target_defaults, variables = config.variables;
          variables || (variables = config.variables = {}), defaults || (defaults = config.target_defaults = {}), 
          defaults.cflags = [], defaults.defines = [], defaults.include_dirs = [], defaults.libraries = [], 
          "debug" in gyp.opts && (defaults.default_configuration = gyp.opts.debug ? "Debug" : "Release"), 
          defaults.default_configuration || (defaults.default_configuration = "Release"), 
          variables.target_arch = gyp.opts.arch || process.arch || "ia32", "arm64" === variables.target_arch && (defaults.msvs_configuration_platform = "ARM64"), 
          variables.nodedir = nodeDir, variables.standalone_static_library = gyp.opts.thin ? 0 : 1, 
          win && (process.env.GYP_MSVS_VERSION = Math.min(vsInfo.versionYear, 2015), process.env.GYP_MSVS_OVERRIDE_PATH = vsInfo.path, 
          defaults.msbuild_toolset = vsInfo.toolset, vsInfo.sdk && (defaults.msvs_windows_target_platform_version = vsInfo.sdk), 
          "arm64" === variables.target_arch && (vsInfo.versionMajor > 15 || 15 === vsInfo.versionMajor && vsInfo.versionMajor >= 9 ? defaults.msvs_enable_marmasm = 1 : log.warn("Compiling ARM64 assembly is only available in\nVisual Studio 2017 version 15.9 and above")), 
          variables.msbuild_path = vsInfo.msBuild), Object.keys(gyp.opts).forEach((function(opt) {
            "argv" !== opt && (opt in gyp.configDefs || (variables[opt.replace(/-/g, "_")] = gyp.opts[opt]));
          })), log.silly("build/config.gypi", config);
          var json = JSON.stringify(config, (function(k, v) {
            return "boolean" == typeof v ? String(v) : v;
          }), 2);
          log.verbose("build/config.gypi", "writing out config file: %s", configPath), configs.push(configPath), 
          fs.writeFile(configPath, [ '# Do not edit. File was generated by node-gyp\'s "configure" step', json, "" ].join("\n"), findConfigs);
        }
        function findConfigs(err) {
          if (err) return callback(err);
          var name = configNames.shift();
          if (!name) return function(err) {
            if (err) return callback(err);
            ~argv.indexOf("-f") || ~argv.indexOf("--format") || (win ? (log.verbose("gyp", 'gyp format was not specified; forcing "msvs"'), 
            argv.push("-f", "msvs")) : (log.verbose("gyp", 'gyp format was not specified; forcing "make"'), 
            argv.push("-f", "make")));
            var nodeExpFile;
            if (configs.forEach((function(config) {
              argv.push("-I", config);
            })), "aix" === process.platform || "os390" === process.platform) {
              var candidates, ext = "aix" === process.platform ? "exp" : "x", nodeRootDir = findNodeDirectory();
              candidates = "aix" === process.platform ? [ "include/node/node", "out/Release/node", "out/Debug/node", "node" ].map((function(file) {
                return file + "." + ext;
              })) : [ "out/Release/obj.target/libnode", "out/Debug/obj.target/libnode", "lib/libnode" ].map((function(file) {
                return file + "." + ext;
              }));
              var logprefix = "find exports file";
              if (void 0 === (nodeExpFile = findAccessibleSync(logprefix, nodeRootDir, candidates))) {
                var msg = msgFormat("Could not find node.%s file in %s", ext, nodeRootDir);
                return log.error(logprefix, "Could not find exports file"), callback(new Error(msg));
              }
              log.verbose(logprefix, "Found exports file: %s", nodeExpFile);
            }
            var gypScript = path.resolve(__dirname, "..", "gyp", "gyp_main.py"), addonGypi = path.resolve(__dirname, "..", "addon.gypi"), commonGypi = path.resolve(nodeDir, "include/node/common.gypi");
            fs.stat(commonGypi, (function(err) {
              err && (commonGypi = path.resolve(nodeDir, "common.gypi"));
              var outputDir = "build";
              win && (outputDir = buildDir);
              var nodeGypDir = path.resolve(__dirname, ".."), nodeLibFile = path.join(nodeDir, gyp.opts.nodedir ? "$(Configuration)" : "<(target_arch)", release.name + ".lib");
              argv.push("-I", addonGypi), argv.push("-I", commonGypi), argv.push("-Dlibrary=shared_library"), 
              argv.push("-Dvisibility=default"), argv.push("-Dnode_root_dir=" + nodeDir), "aix" !== process.platform && "os390" !== process.platform || argv.push("-Dnode_exp_file=" + nodeExpFile), 
              argv.push("-Dnode_gyp_dir=" + nodeGypDir), win && (nodeLibFile = nodeLibFile.replace(/\\/g, "\\\\")), 
              argv.push("-Dnode_lib_file=" + nodeLibFile), argv.push("-Dmodule_root_dir=" + process.cwd()), 
              argv.push("-Dnode_engine=" + (gyp.opts.node_engine || process.jsEngine || "v8")), 
              argv.push("--depth=."), argv.push("--no-parallel"), argv.push("--generator-output", outputDir), 
              argv.push("-Goutput_dir=."), argv.unshift("binding.gyp"), argv.unshift(gypScript);
              var pypath = [ path.join(__dirname, "..", "gyp", "pylib") ];
              process.env.PYTHONPATH && pypath.push(process.env.PYTHONPATH), process.env.PYTHONPATH = pypath.join(win ? ";" : ":"), 
              gyp.spawn(python, argv).on("exit", onCpExit);
            }));
          }();
          var fullPath = path.resolve(name);
          log.verbose(name, "checking for gypi file: %s", fullPath), fs.stat(fullPath, (function(err) {
            err ? "ENOENT" === err.code ? findConfigs() : callback(err) : (log.verbose(name, "found gypi file"), 
            configs.push(fullPath), findConfigs());
          }));
        }
        function onCpExit(code) {
          0 !== code ? callback(new Error("`gyp` failed with exit code: " + code)) : callback();
        }
        findPython(gyp.opts.python, (function(err, found) {
          err ? callback(err) : (python = found, function() {
            if (process.env.PYTHON = python, gyp.opts.nodedir) nodeDir = gyp.opts.nodedir.replace(/^~/, os.homedir()), 
            log.verbose("get node dir", "compiling against specified --nodedir dev files: %s", nodeDir), 
            createBuildDir(); else {
              if ("v" + release.version !== process.version ? log.verbose("get node dir", "compiling against --target node version: %s", release.version) : log.verbose("get node dir", "no --target version specified, falling back to host node version: %s", release.version), 
              !release.semver) return callback(new Error("Invalid version number: " + release.version));
              gyp.opts.ensure = !gyp.opts.tarball, gyp.commands.install([ release.version ], (function(err) {
                if (err) return callback(err);
                log.verbose("get node dir", "target node version installed:", release.versionDir), 
                nodeDir = path.resolve(gyp.devDir, release.versionDir), createBuildDir();
              }));
            }
          }());
        }));
      }, module.exports.test = {
        findAccessibleSync
      }, module.exports.usage = "Generates " + (win ? "MSVC project files" : "a Makefile") + " for the current module";
    },
    24968: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(71017), log = __webpack_require__(19334), semver = __webpack_require__(73107), cp = __webpack_require__(32081), extend = __webpack_require__(73837)._extend, win = "win32" === process.platform, logWithPrefix = __webpack_require__(40538).logWithPrefix;
      function PythonFinder(configPython, callback) {
        this.callback = callback, this.configPython = configPython, this.errorLog = [];
      }
      function findPython(configPython, callback) {
        new PythonFinder(configPython, callback).findPython();
      }
      PythonFinder.prototype = {
        log: logWithPrefix(log, "find Python"),
        argsExecutable: [ "-c", "import sys; print(sys.executable);" ],
        argsVersion: [ "-c", 'import sys; print("%s.%s.%s" % sys.version_info[:3]);' ],
        semverRange: "^2.6.0 || >=3.5.0",
        execFile: cp.execFile,
        env: process.env,
        win,
        pyLauncher: "py.exe",
        winDefaultLocations: [ path.join(process.env.SystemDrive || "C:", "Python27", "python.exe"), path.join(process.env.SystemDrive || "C:", "Python37", "python.exe") ],
        addLog: function(message) {
          this.log.verbose(message), this.errorLog.push(message);
        },
        findPython: function() {
          var toCheck = function() {
            if (this.env.NODE_GYP_FORCE_PYTHON) return [ {
              before: () => {
                this.addLog("checking Python explicitly set from NODE_GYP_FORCE_PYTHON"), this.addLog(`- process.env.NODE_GYP_FORCE_PYTHON is "${this.env.NODE_GYP_FORCE_PYTHON}"`);
              },
              check: this.checkCommand,
              arg: this.env.NODE_GYP_FORCE_PYTHON
            } ];
            var checks = [ {
              before: () => {
                if (!this.configPython) return this.addLog("Python is not set from command line or npm configuration"), 
                0;
                this.addLog("checking Python explicitly set from command line or npm configuration"), 
                this.addLog(`- "--python=" or "npm config get python" is "${this.configPython}"`);
              },
              check: this.checkCommand,
              arg: this.configPython
            }, {
              before: () => {
                if (!this.env.PYTHON) return this.addLog("Python is not set from environment variable PYTHON"), 
                0;
                this.addLog("checking Python explicitly set from environment variable PYTHON"), 
                this.addLog(`- process.env.PYTHON is "${this.env.PYTHON}"`);
              },
              check: this.checkCommand,
              arg: this.env.PYTHON
            }, {
              before: () => {
                this.addLog('checking if "python" can be used');
              },
              check: this.checkCommand,
              arg: "python"
            }, {
              before: () => {
                this.addLog('checking if "python2" can be used');
              },
              check: this.checkCommand,
              arg: "python2"
            }, {
              before: () => {
                this.addLog('checking if "python3" can be used');
              },
              check: this.checkCommand,
              arg: "python3"
            } ];
            if (this.win) {
              checks.push({
                before: () => {
                  this.addLog("checking if the py launcher can be used to find Python 2");
                },
                check: this.checkPyLauncher
              });
              for (var i = 0; i < this.winDefaultLocations.length; ++i) {
                const location = this.winDefaultLocations[i];
                checks.push({
                  before: () => {
                    this.addLog(`checking if Python is ${location}`);
                  },
                  check: this.checkExecPath,
                  arg: location
                });
              }
            }
            return checks;
          }.apply(this);
          (function runChecks(err) {
            this.log.silly("runChecks: err = %j", err && err.stack || err);
            const check = toCheck.shift();
            if (!check) return this.fail();
            const before = check.before.apply(this);
            if (0 === before) return runChecks.apply(this);
            if (1 === before) return this.fail();
            const args = [ runChecks.bind(this) ];
            check.arg && args.unshift(check.arg), check.check.apply(this, args);
          }).apply(this);
        },
        checkCommand: function(command, errorCallback) {
          var exec = command, args = this.argsExecutable, shell = !1;
          this.win && (exec = `"${exec}"`, args = args.map((a => `"${a}"`)), shell = !0), 
          this.log.verbose(`- executing "${command}" to get executable path`), this.run(exec, args, shell, function(err, execPath) {
            if (err) return this.addLog(`- "${command}" is not in PATH or produced an error`), 
            errorCallback(err);
            this.addLog(`- executable path is "${execPath}"`), this.checkExecPath(execPath, errorCallback);
          }.bind(this));
        },
        checkPyLauncher: function(errorCallback) {
          this.log.verbose(`- executing "${this.pyLauncher}" to get Python 2 executable path`), 
          this.run(this.pyLauncher, [ "-2", ...this.argsExecutable ], !1, function(err, execPath) {
            if (err) return this.addLog(`- "${this.pyLauncher}" is not in PATH or produced an error`), 
            errorCallback(err);
            this.addLog(`- executable path is "${execPath}"`), this.checkExecPath(execPath, errorCallback);
          }.bind(this));
        },
        checkExecPath: function(execPath, errorCallback) {
          this.log.verbose(`- executing "${execPath}" to get version`), this.run(execPath, this.argsVersion, !1, function(err, version) {
            if (err) return this.addLog(`- "${execPath}" could not be run`), errorCallback(err);
            this.addLog(`- version is "${version}"`);
            const range = new semver.Range(this.semverRange);
            var valid = !1;
            try {
              valid = range.test(version);
            } catch (err) {
              return this.log.silly("range.test() threw:\n%s", err.stack), this.addLog(`- "${execPath}" does not have a valid version`), 
              this.addLog("- is it a Python executable?"), errorCallback(err);
            }
            if (!valid) return this.addLog(`- version is ${version} - should be ${this.semverRange}`), 
            this.addLog("- THIS VERSION OF PYTHON IS NOT SUPPORTED"), errorCallback(new Error(`Found unsupported Python version ${version}`));
            this.succeed(execPath, version);
          }.bind(this));
        },
        run: function(exec, args, shell, callback) {
          var env = extend({}, this.env);
          env.TERM = "dumb";
          const opts = {
            env,
            shell
          };
          this.log.silly("execFile: exec = %j", exec), this.log.silly("execFile: args = %j", args), 
          this.log.silly("execFile: opts = %j", opts);
          try {
            this.execFile(exec, args, opts, function(err, stdout, stderr) {
              if (this.log.silly("execFile result: err = %j", err && err.stack || err), this.log.silly("execFile result: stdout = %j", stdout), 
              this.log.silly("execFile result: stderr = %j", stderr), err) return callback(err);
              const execPath = stdout.trim();
              callback(null, execPath);
            }.bind(this));
          } catch (err) {
            return this.log.silly("execFile: threw:\n%s", err.stack), callback(err);
          }
        },
        succeed: function(execPath, version) {
          this.log.info(`using Python version ${version} found at "${execPath}"`), process.nextTick(this.callback.bind(null, null, execPath));
        },
        fail: function() {
          const errorLog = this.errorLog.join("\n"), pathExample = this.win ? "C:\\Path\\To\\python.exe" : "/path/to/pythonexecutable", info = [ "**********************************************************", "You need to install the latest version of Python.", "Node-gyp should be able to find and use Python. If not,", "you can try one of the following options:", `- Use the switch --python="${pathExample}"`, "  (accepted by both node-gyp and npm)", "- Set the environment variable PYTHON", "- Set the npm configuration variable python:", `  npm config set python "${pathExample}"`, "For more information consult the documentation at:", "https://github.com/nodejs/node-gyp#installation", "**********************************************************" ].join("\n");
          this.log.error(`\n${errorLog}\n\n${info}\n`), process.nextTick(this.callback.bind(null, new Error("Could not find any Python installation to use")));
        }
      }, module.exports = findPython, module.exports.test = {
        PythonFinder,
        findPython
      };
    },
    49333: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const log = __webpack_require__(19334), execFile = __webpack_require__(32081).execFile, path = __webpack_require__(71017).win32, logWithPrefix = __webpack_require__(40538).logWithPrefix, regSearchKeys = __webpack_require__(40538).regSearchKeys;
      function findVisualStudio(nodeSemver, configMsvsVersion, callback) {
        new VisualStudioFinder(nodeSemver, configMsvsVersion, callback).findVisualStudio();
      }
      function VisualStudioFinder(nodeSemver, configMsvsVersion, callback) {
        this.nodeSemver = nodeSemver, this.configMsvsVersion = configMsvsVersion, this.callback = callback, 
        this.errorLog = [], this.validVersions = [];
      }
      VisualStudioFinder.prototype = {
        log: logWithPrefix(log, "find VS"),
        regSearchKeys,
        addLog: function(message) {
          this.log.verbose(message), this.errorLog.push(message);
        },
        findVisualStudio: function() {
          this.configVersionYear = null, this.configPath = null, this.configMsvsVersion ? (this.addLog("msvs_version was set from command line or npm config"), 
          this.configMsvsVersion.match(/^\d{4}$/) ? (this.configVersionYear = parseInt(this.configMsvsVersion, 10), 
          this.addLog(`- looking for Visual Studio version ${this.configVersionYear}`)) : (this.configPath = path.resolve(this.configMsvsVersion), 
          this.addLog(`- looking for Visual Studio installed in "${this.configPath}"`))) : this.addLog("msvs_version not set from command line or npm config"), 
          process.env.VCINSTALLDIR ? (this.envVcInstallDir = path.resolve(process.env.VCINSTALLDIR, ".."), 
          this.addLog(`running in VS Command Prompt, installation path is:\n"${this.envVcInstallDir}"\n- will only use this version`)) : this.addLog("VCINSTALLDIR not set, not running in VS Command Prompt"), 
          this.findVisualStudio2017OrNewer((info => {
            if (info) return this.succeed(info);
            this.findVisualStudio2015((info => {
              if (info) return this.succeed(info);
              this.findVisualStudio2013((info => {
                if (info) return this.succeed(info);
                this.fail();
              }));
            }));
          }));
        },
        succeed: function(info) {
          this.log.info(`using VS${info.versionYear} (${info.version}) found at:\n"${info.path}"\nrun with --verbose for detailed information`), 
          process.nextTick(this.callback.bind(null, null, info));
        },
        fail: function() {
          this.configMsvsVersion && this.envVcInstallDir ? this.errorLog.push("msvs_version does not match this VS Command Prompt or the", "installation cannot be used.") : this.configMsvsVersion && (this.errorLog.push(""), 
          this.validVersions ? (this.errorLog.push("valid versions for msvs_version:"), this.validVersions.forEach((version => {
            this.errorLog.push(`- "${version}"`);
          }))) : this.errorLog.push("no valid versions for msvs_version were found"));
          const errorLog = this.errorLog.join("\n"), infoLog = [ "**************************************************************", "You need to install the latest version of Visual Studio", 'including the "Desktop development with C++" workload.', "For more information consult the documentation at:", "https://github.com/nodejs/node-gyp#on-windows", "**************************************************************" ].join("\n");
          this.log.error(`\n${errorLog}\n\n${infoLog}\n`), process.nextTick(this.callback.bind(null, new Error("Could not find any Visual Studio installation to use")));
        },
        findVisualStudio2017OrNewer: function(cb) {
          var ps = path.join(process.env.SystemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe"), psArgs = [ "-ExecutionPolicy", "Unrestricted", "-NoProfile", "-Command", "&{Add-Type -Path '" + path.join(__dirname, "Find-VisualStudio.cs") + "';[VisualStudioConfiguration.Main]::PrintJson()}" ];
          this.log.silly("Running", ps, psArgs), execFile(ps, psArgs, {
            encoding: "utf8"
          }, ((err, stdout, stderr) => {
            this.parseData(err, stdout, stderr, cb);
          })).stdin.end();
        },
        parseData: function(err, stdout, stderr, cb) {
          this.log.silly("PS stderr = %j", stderr);
          const failPowershell = () => {
            this.addLog("could not use PowerShell to find Visual Studio 2017 or newer"), cb(null);
          };
          if (err) return this.log.silly("PS err = %j", err && (err.stack || err)), failPowershell();
          var vsInfo;
          try {
            vsInfo = JSON.parse(stdout);
          } catch (e) {
            return this.log.silly("PS stdout = %j", stdout), this.log.silly(e), failPowershell();
          }
          if (!Array.isArray(vsInfo)) return this.log.silly("PS stdout = %j", stdout), failPowershell();
          vsInfo = vsInfo.map((info => {
            this.log.silly(`processing installation: "${info.path}"`), info.path = path.resolve(info.path);
            var ret = this.getVersionInfo(info);
            return ret.path = info.path, ret.msBuild = this.getMSBuild(info, ret.versionYear), 
            ret.toolset = this.getToolset(info, ret.versionYear), ret.sdk = this.getSDK(info), 
            ret;
          })), this.log.silly("vsInfo:", vsInfo), (vsInfo = vsInfo.filter((info => !!info.versionYear || (this.addLog(`unknown version "${info.version}" found at "${info.path}"`), 
          !1)))).sort(((a, b) => b.versionYear - a.versionYear));
          for (var i = 0; i < vsInfo.length; ++i) {
            const info = vsInfo[i];
            if (this.addLog(`checking VS${info.versionYear} (${info.version}) found at:\n"${info.path}"`), 
            info.msBuild) if (this.addLog('- found "Visual Studio C++ core features"'), info.toolset) if (this.addLog(`- found VC++ toolset: ${info.toolset}`), 
            info.sdk) {
              if (this.addLog(`- found Windows SDK: ${info.sdk}`), this.checkConfigVersion(info.versionYear, info.path)) return cb(info);
            } else this.addLog("- missing any Windows SDK"); else this.addLog("- missing any VC++ toolset"); else this.addLog('- "Visual Studio C++ core features" missing');
          }
          this.addLog("could not find a version of Visual Studio 2017 or newer to use"), cb(null);
        },
        getVersionInfo: function(info) {
          const match = /^(\d+)\.(\d+)\..*/.exec(info.version);
          if (!match) return this.log.silly("- failed to parse version:", info.version), {};
          this.log.silly("- version match = %j", match);
          var ret = {
            version: info.version,
            versionMajor: parseInt(match[1], 10),
            versionMinor: parseInt(match[2], 10)
          };
          return 15 === ret.versionMajor ? (ret.versionYear = 2017, ret) : 16 === ret.versionMajor ? (ret.versionYear = 2019, 
          ret) : (this.log.silly("- unsupported version:", ret.versionMajor), {});
        },
        getMSBuild: function(info, versionYear) {
          if (-1 !== info.packages.indexOf("Microsoft.VisualStudio.VC.MSBuild.Base")) {
            if (this.log.silly("- found VC.MSBuild.Base"), 2017 === versionYear) return path.join(info.path, "MSBuild", "15.0", "Bin", "MSBuild.exe");
            if (2019 === versionYear) return path.join(info.path, "MSBuild", "Current", "Bin", "MSBuild.exe");
          }
          return null;
        },
        getToolset: function(info, versionYear) {
          if (-1 !== info.packages.indexOf("Microsoft.VisualStudio.Component.VC.Tools.x86.x64")) this.log.silly("- found VC.Tools.x86.x64"); else {
            if (-1 === info.packages.indexOf("Microsoft.VisualStudio.WDExpress")) return null;
            this.log.silly("- found Visual Studio Express (looking for toolset)");
          }
          return 2017 === versionYear ? "v141" : 2019 === versionYear ? "v142" : (this.log.silly("- invalid versionYear:", versionYear), 
          null);
        },
        getSDK: function(info) {
          var Win10SDKVer = 0;
          return info.packages.forEach((pkg => {
            if (!pkg.startsWith("Microsoft.VisualStudio.Component.Windows10SDK.")) return;
            const parts = pkg.split(".");
            if (parts.length > 5 && "Desktop" !== parts[5]) return void this.log.silly("- ignoring non-Desktop Win10SDK:", pkg);
            const foundSdkVer = parseInt(parts[4], 10);
            isNaN(foundSdkVer) ? this.log.silly("- failed to parse Win10SDK number:", pkg) : (this.log.silly("- found Win10SDK:", foundSdkVer), 
            Win10SDKVer = Math.max(Win10SDKVer, foundSdkVer));
          })), 0 !== Win10SDKVer ? `10.0.${Win10SDKVer}.0` : -1 !== info.packages.indexOf("Microsoft.VisualStudio.Component.Windows81SDK") ? (this.log.silly("- found Win8SDK"), 
          "8.1") : null;
        },
        findVisualStudio2015: function(cb) {
          return this.findOldVS({
            version: "14.0",
            versionMajor: 14,
            versionMinor: 0,
            versionYear: 2015,
            toolset: "v140"
          }, cb);
        },
        findVisualStudio2013: function(cb) {
          return this.nodeSemver.major >= 9 ? (this.addLog("not looking for VS2013 as it is only supported up to Node.js 8"), 
          cb(null)) : this.findOldVS({
            version: "12.0",
            versionMajor: 12,
            versionMinor: 0,
            versionYear: 2013,
            toolset: "v120"
          }, cb);
        },
        findOldVS: function(info, cb) {
          this.addLog(`looking for Visual Studio ${info.versionYear}`), this.regSearchKeys([ "HKLM\\Software\\Microsoft\\VisualStudio\\SxS\\VC7", "HKLM\\Software\\Wow6432Node\\Microsoft\\VisualStudio\\SxS\\VC7" ], info.version, [], ((err, res) => {
            if (err) return this.addLog("- not found"), cb(null);
            const vsPath = path.resolve(res, "..");
            this.addLog(`- found in "${vsPath}"`);
            const msBuildRegOpts = "ia32" === process.arch ? [] : [ "/reg:32" ];
            this.regSearchKeys([ `HKLM\\Software\\Microsoft\\MSBuild\\ToolsVersions\\${info.version}` ], "MSBuildToolsPath", msBuildRegOpts, ((err, res) => {
              if (err) return this.addLog("- could not find MSBuild in registry for this version"), 
              cb(null);
              const msBuild = path.join(res, "MSBuild.exe");
              if (this.addLog(`- MSBuild in "${msBuild}"`), !this.checkConfigVersion(info.versionYear, vsPath)) return cb(null);
              info.path = vsPath, info.msBuild = msBuild, info.sdk = null, cb(info);
            }));
          }));
        },
        checkConfigVersion: function(versionYear, vsPath) {
          return this.validVersions.push(versionYear), this.validVersions.push(vsPath), this.configVersionYear && this.configVersionYear !== versionYear ? (this.addLog("- msvs_version does not match this version"), 
          !1) : this.configPath && "" !== path.relative(this.configPath, vsPath) ? (this.addLog("- msvs_version does not point to this installation"), 
          !1) : !this.envVcInstallDir || "" === path.relative(this.envVcInstallDir, vsPath) || (this.addLog("- does not match this Visual Studio Command Prompt"), 
          !1);
        }
      }, module.exports = findVisualStudio, module.exports.test = {
        VisualStudioFinder,
        findVisualStudio
      };
    },
    43096: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(59799), os = __webpack_require__(22037), tar = __webpack_require__(39148), path = __webpack_require__(71017), crypto = __webpack_require__(6113), log = __webpack_require__(19334), semver = __webpack_require__(73107), request = __webpack_require__(34712), mkdir = __webpack_require__(41718), processRelease = __webpack_require__(30564), win = "win32" === process.platform, getProxyFromURI = __webpack_require__(13078);
      function install(fs, gyp, argv, callback) {
        var release = processRelease(argv, gyp, process.version, process.release);
        function cb(err) {
          cb.done || (cb.done = !0, err ? (log.warn("install", "got an error, rolling back install"), 
          gyp.commands.remove([ release.versionDir ], (function() {
            callback(err);
          }))) : callback(null, release.version));
        }
        if (log.verbose("install", "input version string %j", release.version), !release.semver) return callback(new Error("Invalid version number: " + release.version));
        if (semver.lt(release.version, "0.8.0")) return callback(new Error("Minimum target version is `0.8.0` or greater. Got: " + release.version));
        if ("pre" === release.semver.prerelease[0]) return log.verbose('detected "pre" node version', release.version), 
        void (gyp.opts.nodedir ? (log.verbose("--nodedir flag was passed; skipping install", gyp.opts.nodedir), 
        callback()) : callback(new Error('"pre" versions of node cannot be installed, use the --nodedir flag instead')));
        log.verbose("install", "installing version: %s", release.versionDir);
        var devDir = path.resolve(gyp.devDir, release.versionDir);
        function getContentSha(res, callback) {
          var shasum = crypto.createHash("sha256");
          res.on("data", (function(chunk) {
            shasum.update(chunk);
          })).on("end", (function() {
            callback(null, shasum.digest("hex"));
          }));
        }
        function go() {
          log.verbose("ensuring nodedir is created", devDir), mkdir(devDir, (function(err, created) {
            if (err) "EACCES" === err.code ? eaccesFallback(err) : cb(err); else {
              created && log.verbose("created nodedir", created);
              var tarPath = gyp.opts.tarball, badDownload = !1, extractCount = 0, contentShasums = {}, expectShasums = {};
              if (tarPath) return tar.extract({
                file: tarPath,
                strip: 1,
                filter: isValid,
                cwd: devDir
              }).then(afterTarball, cb);
              try {
                var req = download(gyp, process.env, release.tarballUrl);
              } catch (e) {
                return cb(e);
              }
              req.on("error", (function(err) {
                if ("ENOTFOUND" === err.code) return cb(new Error("This is most likely not a problem with node-gyp or the package itself and\nis related to network connectivity. In most cases you are behind a proxy or have bad \nnetwork settings."));
                badDownload = !0, cb(err);
              })), req.on("close", (function() {
                0 === extractCount && cb(new Error("Connection closed while downloading tarball file"));
              })), req.on("response", (function(res) {
                if (200 !== res.statusCode) return badDownload = !0, void cb(new Error(res.statusCode + " response downloading " + release.tarballUrl));
                getContentSha(res, (function(_, checksum) {
                  var filename = path.basename(release.tarballUrl).trim();
                  contentShasums[filename] = checksum, log.verbose("content checksum", filename, checksum);
                })), res.pipe(tar.extract({
                  strip: 1,
                  cwd: devDir,
                  filter: isValid
                }).on("close", afterTarball).on("error", cb));
              }));
            }
            function isValid(path) {
              var isValid = valid(path);
              return isValid ? (log.verbose("extracted file from tarball", path), extractCount++) : log.silly("ignoring from tarball", path), 
              isValid;
            }
            function afterTarball() {
              if (!badDownload) {
                if (0 === extractCount) return cb(new Error("There was a fatal problem while downloading/extracting the tarball"));
                log.verbose("tarball", "done parsing tarball");
                var async = 0;
                win && (async++, function(done) {
                  log.verbose("on Windows; need to download `" + release.name + ".lib`...");
                  var archs = [ "ia32", "x64", "arm64" ], async = archs.length;
                  archs.forEach((function(arch) {
                    var dir = path.resolve(devDir, arch), targetLibPath = path.resolve(dir, release.name + ".lib"), libUrl = release[arch].libUrl, libPath = release[arch].libPath, name = arch + " " + release.name + ".lib";
                    log.verbose(name, "dir", dir), log.verbose(name, "url", libUrl), mkdir(dir, (function(err) {
                      if (err) return done(err);
                      log.verbose("streaming", name, "to:", targetLibPath);
                      try {
                        var req = download(gyp, process.env, libUrl);
                      } catch (e) {
                        return cb(e);
                      }
                      req.on("error", done), req.on("response", (function(res) {
                        if (403 !== res.statusCode && 404 !== res.statusCode) if (200 === res.statusCode) {
                          getContentSha(res, (function(_, checksum) {
                            contentShasums[libPath] = checksum, log.verbose("content checksum", libPath, checksum);
                          }));
                          var ws = fs.createWriteStream(targetLibPath);
                          ws.on("error", cb), req.pipe(ws);
                        } else done(new Error(res.statusCode + " status code downloading " + name)); else "arm64" === arch ? log.verbose(`${name} was not found in ${libUrl}`) : log.warn(`${name} was not found in ${libUrl}`);
                      })), req.on("end", (function() {
                        --async || done();
                      }));
                    }));
                  }));
                }(deref)), async++;
                var installVersionPath = path.resolve(devDir, "installVersion");
                fs.writeFile(installVersionPath, gyp.package.installVersion + "\n", deref), tarPath && !win || (async++, 
                function(done) {
                  log.verbose("check download content checksum, need to download `SHASUMS256.txt`..."), 
                  log.verbose("checksum url", release.shasumsUrl);
                  try {
                    var req = download(gyp, process.env, release.shasumsUrl);
                  } catch (e) {
                    return cb(e);
                  }
                  req.on("error", done), req.on("response", (function(res) {
                    if (200 === res.statusCode) {
                      var chunks = [];
                      res.on("data", (function(chunk) {
                        chunks.push(chunk);
                      })), res.on("end", (function() {
                        Buffer.concat(chunks).toString().trim().split("\n").forEach((function(line) {
                          var items = line.trim().split(/\s+/);
                          if (2 === items.length) {
                            var name = items[1].replace(/^\.\//, "");
                            expectShasums[name] = items[0];
                          }
                        })), log.verbose("checksum data", JSON.stringify(expectShasums)), done();
                      }));
                    } else done(new Error(res.statusCode + " status code downloading checksum"));
                  }));
                }(deref)), 0 === async && cb();
              }
              function deref(err) {
                if (err) return cb(err);
                if (!--async) {
                  for (var k in log.verbose("download contents checksum", JSON.stringify(contentShasums)), 
                  contentShasums) if (log.verbose("validating download checksum for " + k, "(%s == %s)", contentShasums[k], expectShasums[k]), 
                  contentShasums[k] !== expectShasums[k]) return void cb(new Error(k + " local checksum " + contentShasums[k] + " not match remote " + expectShasums[k]));
                  cb();
                }
              }
            }
          }));
        }
        function valid(file) {
          var extname = path.extname(file);
          return ".h" === extname || ".gypi" === extname;
        }
        function eaccesFallback(err) {
          var noretry = "--node_gyp_internal_noretry";
          if (-1 !== argv.indexOf(noretry)) return cb(err);
          var tmpdir = os.tmpdir();
          gyp.devDir = path.resolve(tmpdir, ".node-gyp");
          var userString = "";
          try {
            userString = ` ("${os.userInfo().username}")`;
          } catch (e) {}
          log.warn("EACCES", 'current user%s does not have permission to access the dev dir "%s"', userString, devDir), 
          log.warn("EACCES", 'attempting to reinstall using temporary dev dir "%s"', gyp.devDir), 
          process.cwd() === tmpdir && (log.verbose("tmpdir == cwd", "automatically will remove dev files after to save disk space"), 
          gyp.todo.push({
            name: "remove",
            args: argv
          })), gyp.commands.install([ noretry ].concat(argv), cb);
        }
        gyp.opts.ensure ? (log.verbose("install", "--ensure was passed, so won't reinstall if already installed"), 
        fs.stat(devDir, (function(err) {
          if (err) "ENOENT" === err.code ? (log.verbose("install", "version not already installed, continuing with install", release.version), 
          go()) : "EACCES" === err.code ? eaccesFallback(err) : cb(err); else {
            log.verbose("install", 'version is already installed, need to check "installVersion"');
            var installVersionFile = path.resolve(devDir, "installVersion");
            fs.readFile(installVersionFile, "ascii", (function(err, ver) {
              if (err && "ENOENT" !== err.code) return cb(err);
              var installVersion = parseInt(ver, 10) || 0;
              log.verbose('got "installVersion"', installVersion), log.verbose('needs "installVersion"', gyp.package.installVersion), 
              installVersion < gyp.package.installVersion ? (log.verbose("install", "version is no good; reinstalling"), 
              go()) : (log.verbose("install", "version is good"), cb());
            }));
          }
        }))) : go();
      }
      function download(gyp, env, url) {
        log.http("GET", url);
        var requestOpts = {
          uri: url,
          headers: {
            "User-Agent": "node-gyp v" + gyp.version + " (node " + process.version + ")",
            Connection: "keep-alive"
          }
        }, cafile = gyp.opts.cafile;
        cafile && (requestOpts.ca = readCAFile(cafile));
        var proxyUrl = getProxyFromURI(gyp, env, url);
        proxyUrl && (/^https?:\/\//i.test(proxyUrl) ? (log.verbose("download", 'using proxy url: "%s"', proxyUrl), 
        requestOpts.proxy = proxyUrl) : log.warn("download", 'ignoring invalid "proxy" config setting: "%s"', proxyUrl));
        var req = request(requestOpts);
        return req.on("response", (function(res) {
          log.http(res.statusCode, url);
        })), req;
      }
      function readCAFile(filename) {
        return fs.readFileSync(filename, "utf8").match(/(-----BEGIN CERTIFICATE-----[\S\s]*?-----END CERTIFICATE-----)/g);
      }
      module.exports = function(gyp, argv, callback) {
        return install(fs, gyp, argv, callback);
      }, module.exports.test = {
        download,
        install,
        readCAFile
      }, module.exports.usage = "Install node development files for the specified node version.";
    },
    31676: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(59799), log = __webpack_require__(19334);
      module.exports = function(gyp, args, callback) {
        var devDir = gyp.devDir;
        log.verbose("list", "using node-gyp dir:", devDir), fs.readdir(devDir, (function(err, versions) {
          if (err && "ENOENT" !== err.code) return callback(err);
          versions = Array.isArray(versions) ? versions.filter((function(v) {
            return "current" !== v;
          })) : [];
          callback(null, versions);
        }));
      }, module.exports.usage = "Prints a listing of the currently installed node development files";
    },
    92081: (module, exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(71017), nopt = __webpack_require__(60166), log = __webpack_require__(19334), childProcess = __webpack_require__(32081), EE = __webpack_require__(82361).EventEmitter, inherits = __webpack_require__(73837).inherits, commands = [ "build", "clean", "configure", "rebuild", "install", "list", "remove" ];
      function Gyp() {
        var self = this;
        this.devDir = "", this.commands = {}, commands.forEach((function(command) {
          self.commands[command] = function(argv, callback) {
            return log.verbose("command", command, argv), __webpack_require__(67)("./" + command)(self, argv, callback);
          };
        }));
      }
      log.heading = "gyp", inherits(Gyp, EE), exports.Gyp = Gyp;
      var proto = Gyp.prototype;
      proto.package = __webpack_require__(26671), proto.configDefs = {
        help: Boolean,
        arch: String,
        cafile: String,
        debug: Boolean,
        directory: String,
        make: String,
        msvs_version: String,
        ensure: Boolean,
        solution: String,
        proxy: String,
        noproxy: String,
        devdir: String,
        nodedir: String,
        loglevel: String,
        python: String,
        "dist-url": String,
        tarball: String,
        jobs: String,
        thin: String
      }, proto.shorthands = {
        release: "--no-debug",
        C: "--directory",
        debug: "--debug",
        j: "--jobs",
        silly: "--loglevel=silly",
        verbose: "--loglevel=verbose",
        silent: "--loglevel=silent"
      }, proto.aliases = {
        ls: "list",
        rm: "remove"
      }, proto.parseArgv = function(argv) {
        this.opts = nopt(this.configDefs, this.shorthands, argv), this.argv = this.opts.argv.remain.slice();
        var commands = this.todo = [];
        (argv = this.argv.map((function(arg) {
          return arg in this.aliases && (arg = this.aliases[arg]), arg;
        }), this)).slice().forEach((function(arg) {
          if (arg in this.commands) {
            var args = argv.splice(0, argv.indexOf(arg));
            argv.shift(), commands.length > 0 && (commands[commands.length - 1].args = args), 
            commands.push({
              name: arg,
              args: []
            });
          }
        }), this), commands.length > 0 && (commands[commands.length - 1].args = argv.splice(0));
        Object.keys(process.env).forEach((function(name) {
          if (0 === name.indexOf("npm_config_")) {
            var val = process.env[name];
            "npm_config_loglevel" === name ? log.level = val : (name = name.substring("npm_config_".length)) && (this.opts[name] = val);
          }
        }), this), this.opts.loglevel && (log.level = this.opts.loglevel), log.resume();
      }, proto.spawn = function(command, args, opts) {
        opts || (opts = {}), opts.silent || opts.stdio || (opts.stdio = [ 0, 1, 2 ]);
        var cp = childProcess.spawn(command, args, opts);
        return log.info("spawn", command), log.info("spawn args", args), cp;
      }, proto.usage = function() {
        return [ "", "  Usage: node-gyp <command> [options]", "", "  where <command> is one of:", commands.map((function(c) {
          return "    - " + c + " - " + __webpack_require__(67)("./" + c).usage;
        })).join("\n"), "", "node-gyp@" + this.version + "  " + path.resolve(__dirname, ".."), "node@" + process.versions.node ].join("\n");
      }, Object.defineProperty(proto, "version", {
        get: function() {
          return this.package.version;
        },
        enumerable: !0
      }), module.exports = exports = function() {
        return new Gyp;
      };
    },
    30564: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const semver = __webpack_require__(73107), url = __webpack_require__(57310), path = __webpack_require__(71017), log = __webpack_require__(19334), bitsre = /\/win-(x86|x64|arm64)\//, bitsreV3 = /\/win-(x86|ia32|x64)\//;
      function normalizePath(p) {
        return path.normalize(p).replace(/\\/g, "/");
      }
      function resolveLibUrl(name, defaultUrl, arch, versionMajor) {
        var base = url.resolve(defaultUrl, "./");
        return bitsre.test(defaultUrl) || 3 === versionMajor && bitsreV3.test(defaultUrl) ? defaultUrl.replace(3 === versionMajor ? bitsreV3 : bitsre, "/win-" + arch + "/") : versionMajor >= 1 ? url.resolve(base, "win-" + arch + "/" + name + ".lib") : url.resolve(base, ("x86" === arch ? "" : arch + "/") + name + ".lib");
      }
      module.exports = function(argv, gyp, defaultVersion, defaultRelease) {
        var name, distBaseUrl, baseUrl, libUrl32, libUrl64, libUrlArm64, tarballUrl, canGetHeaders, version = semver.valid(argv[0]) && argv[0] || gyp.opts.target || defaultVersion, versionSemver = semver.parse(version), overrideDistUrl = gyp.opts["dist-url"] || gyp.opts.disturl;
        return versionSemver ? ((version = versionSemver.version) === semver.parse(defaultVersion).version || (defaultRelease = null), 
        name = defaultRelease ? defaultRelease.name.replace(/io\.js/, "iojs") : versionSemver.major >= 1 && versionSemver.major < 4 ? "iojs" : "node", 
        !overrideDistUrl && process.env.NODEJS_ORG_MIRROR && (overrideDistUrl = process.env.NODEJS_ORG_MIRROR), 
        overrideDistUrl && log.verbose("download", "using dist-url", overrideDistUrl), distBaseUrl = overrideDistUrl ? overrideDistUrl.replace(/\/+$/, "") : "https://nodejs.org/dist", 
        distBaseUrl += "/v" + version + "/", defaultRelease && defaultRelease.headersUrl && !overrideDistUrl ? (baseUrl = url.resolve(defaultRelease.headersUrl, "./"), 
        libUrl32 = resolveLibUrl(name, defaultRelease.libUrl || baseUrl || distBaseUrl, "x86", versionSemver.major), 
        libUrl64 = resolveLibUrl(name, defaultRelease.libUrl || baseUrl || distBaseUrl, "x64", versionSemver.major), 
        libUrlArm64 = resolveLibUrl(name, defaultRelease.libUrl || baseUrl || distBaseUrl, "arm64", versionSemver.major), 
        tarballUrl = defaultRelease.headersUrl) : (libUrl32 = resolveLibUrl(name, baseUrl = distBaseUrl, "x86", versionSemver.major), 
        libUrl64 = resolveLibUrl(name, baseUrl, "x64", versionSemver.major), libUrlArm64 = resolveLibUrl(name, baseUrl, "arm64", versionSemver.major), 
        canGetHeaders = semver.satisfies(versionSemver, ">= 3.0.0 || ~0.12.10 || ~0.10.42"), 
        tarballUrl = url.resolve(baseUrl, name + "-v" + version + (canGetHeaders ? "-headers" : "") + ".tar.gz")), 
        {
          version,
          semver: versionSemver,
          name,
          baseUrl,
          tarballUrl,
          shasumsUrl: url.resolve(baseUrl, "SHASUMS256.txt"),
          versionDir: ("node" !== name ? name + "-" : "") + version,
          ia32: {
            libUrl: libUrl32,
            libPath: normalizePath(path.relative(url.parse(baseUrl).path, url.parse(libUrl32).path))
          },
          x64: {
            libUrl: libUrl64,
            libPath: normalizePath(path.relative(url.parse(baseUrl).path, url.parse(libUrl64).path))
          },
          arm64: {
            libUrl: libUrlArm64,
            libPath: normalizePath(path.relative(url.parse(baseUrl).path, url.parse(libUrlArm64).path))
          }
        }) : {
          version
        };
      };
    },
    13078: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const url = __webpack_require__(57310);
      function formatHostname(hostname) {
        return hostname.replace(/^\.*/, ".").toLowerCase();
      }
      function parseNoProxyZone(zone) {
        var zoneParts = (zone = zone.trim().toLowerCase()).split(":", 2);
        return {
          hostname: formatHostname(zoneParts[0]),
          port: zoneParts[1],
          hasPort: zone.indexOf(":") > -1
        };
      }
      module.exports = function(gyp, env, uri) {
        "string" == typeof uri && (uri = url.parse(uri));
        var noProxy = gyp.opts.noproxy || env.NO_PROXY || env.no_proxy || env.npm_config_noproxy || "";
        return "*" === noProxy || "" !== noProxy && function(uri, noProxy) {
          var port = uri.port || ("https:" === uri.protocol ? "443" : "80"), hostname = formatHostname(uri.hostname);
          return noProxy.split(",").map(parseNoProxyZone).some((function(noProxyZone) {
            var isMatchedAt = hostname.indexOf(noProxyZone.hostname), hostnameMatched = isMatchedAt > -1 && isMatchedAt === hostname.length - noProxyZone.hostname.length;
            return noProxyZone.hasPort ? port === noProxyZone.port && hostnameMatched : hostnameMatched;
          }));
        }(uri, noProxy) ? null : "http:" === uri.protocol ? gyp.opts.proxy || env.HTTP_PROXY || env.http_proxy || env.npm_config_proxy || null : "https:" === uri.protocol && (gyp.opts.proxy || env.HTTPS_PROXY || env.https_proxy || env.HTTP_PROXY || env.http_proxy || env.npm_config_proxy) || null;
      };
    },
    80364: module => {
      "use strict";
      module.exports = function(gyp, argv, callback) {
        gyp.todo.push({
          name: "clean",
          args: []
        }, {
          name: "configure",
          args: argv
        }, {
          name: "build",
          args: []
        }), process.nextTick(callback);
      }, module.exports.usage = 'Runs "clean", "configure" and "build" all at once';
    },
    52824: (module, exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(57147), rm = __webpack_require__(68259), path = __webpack_require__(71017), log = __webpack_require__(19334), semver = __webpack_require__(73107);
      module.exports = function(gyp, argv, callback) {
        var devDir = gyp.devDir;
        log.verbose("remove", "using node-gyp dir:", devDir);
        var version = argv[0] || gyp.opts.target;
        if (log.verbose("remove", "removing target version:", version), !version) return callback(new Error('You must specify a version number to remove. Ex: "' + process.version + '"'));
        var versionSemver = semver.parse(version);
        versionSemver && (version = versionSemver.version);
        var versionPath = path.resolve(gyp.devDir, version);
        log.verbose("remove", "removing development files for version:", version), fs.stat(versionPath, (function(err) {
          err ? "ENOENT" === err.code ? callback(null, "version was already uninstalled: " + version) : callback(err) : rm(versionPath, callback);
        }));
      }, module.exports.usage = "Removes the node development files for the specified version";
    },
    40538: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const log = __webpack_require__(19334), execFile = __webpack_require__(32081).execFile, path = __webpack_require__(71017);
      function regGetValue(key, value, addOpts, cb) {
        const outReValue = value.replace(/\W/g, "."), outRe = new RegExp(`^\\s+${outReValue}\\s+REG_\\w+\\s+(\\S.*)$`, "im"), reg = path.join(process.env.SystemRoot, "System32", "reg.exe"), regArgs = [ "query", key, "/v", value ].concat(addOpts);
        log.silly("reg", "running", reg, regArgs);
        execFile(reg, regArgs, {
          encoding: "utf8"
        }, (function(err, stdout, stderr) {
          if (log.silly("reg", "reg.exe stdout = %j", stdout), err || "" !== stderr.trim()) return log.silly("reg", "reg.exe err = %j", err && (err.stack || err)), 
          log.silly("reg", "reg.exe stderr = %j", stderr), cb(err, stderr);
          const result = outRe.exec(stdout);
          if (!result) return log.silly("reg", "error parsing stdout"), cb(new Error("Could not parse output of reg.exe"));
          log.silly("reg", "found: %j", result[1]), cb(null, result[1]);
        })).stdin.end();
      }
      module.exports = {
        logWithPrefix: function(log, prefix) {
          function setPrefix(logFunction) {
            return (...args) => logFunction.apply(null, [ prefix, ...args ]);
          }
          return {
            silly: setPrefix(log.silly),
            verbose: setPrefix(log.verbose),
            info: setPrefix(log.info),
            warn: setPrefix(log.warn),
            error: setPrefix(log.error)
          };
        },
        regGetValue,
        regSearchKeys: function(keys, value, addOpts, cb) {
          var i = 0;
          const search = () => {
            log.silly("reg-search", "looking for %j in %j", value, keys[i]), regGetValue(keys[i], value, addOpts, ((err, res) => {
              if (++i, err && i < keys.length) return search();
              cb(err, res);
            }));
          };
          search();
        }
      };
    },
    67: (module, __unused_webpack_exports, __webpack_require__) => {
      var map = {
        "./build": 65983,
        "./build.js": 65983,
        "./clean": 78600,
        "./clean.js": 78600,
        "./configure": 92734,
        "./configure.js": 92734,
        "./find-node-directory": 49972,
        "./find-node-directory.js": 49972,
        "./find-python": 24968,
        "./find-python.js": 24968,
        "./find-visualstudio": 49333,
        "./find-visualstudio.js": 49333,
        "./install": 43096,
        "./install.js": 43096,
        "./list": 31676,
        "./list.js": 31676,
        "./node-gyp": 92081,
        "./node-gyp.js": 92081,
        "./process-release": 30564,
        "./process-release.js": 30564,
        "./proxy": 13078,
        "./proxy.js": 13078,
        "./rebuild": 80364,
        "./rebuild.js": 80364,
        "./remove": 52824,
        "./remove.js": 52824,
        "./util": 40538,
        "./util.js": 40538
      };
      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }
        return map[req];
      }
      webpackContext.keys = function() {
        return Object.keys(map);
      }, webpackContext.resolve = webpackContextResolve, module.exports = webpackContext, 
      webpackContext.id = 67;
    },
    68259: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = rimraf, rimraf.sync = rimrafSync;
      var assert = __webpack_require__(39491), path = __webpack_require__(71017), fs = __webpack_require__(57147), glob = void 0;
      try {
        glob = __webpack_require__(34436);
      } catch (_err) {}
      var _0666 = parseInt("666", 8), defaultGlobOpts = {
        nosort: !0,
        silent: !0
      }, timeout = 0, isWindows = "win32" === process.platform;
      function defaults(options) {
        if ([ "unlink", "chmod", "stat", "lstat", "rmdir", "readdir" ].forEach((function(m) {
          options[m] = options[m] || fs[m], options[m += "Sync"] = options[m] || fs[m];
        })), options.maxBusyTries = options.maxBusyTries || 3, options.emfileWait = options.emfileWait || 1e3, 
        !1 === options.glob && (options.disableGlob = !0), !0 !== options.disableGlob && void 0 === glob) throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
        options.disableGlob = options.disableGlob || !1, options.glob = options.glob || defaultGlobOpts;
      }
      function rimraf(p, options, cb) {
        "function" == typeof options && (cb = options, options = {}), assert(p, "rimraf: missing path"), 
        assert.equal(typeof p, "string", "rimraf: path should be a string"), assert.equal(typeof cb, "function", "rimraf: callback function required"), 
        assert(options, "rimraf: invalid options argument provided"), assert.equal(typeof options, "object", "rimraf: options should be object"), 
        defaults(options);
        var busyTries = 0, errState = null, n = 0;
        if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [ p ]);
        function afterGlob(er, results) {
          return er ? cb(er) : 0 === (n = results.length) ? cb() : void results.forEach((function(p) {
            rimraf_(p, options, (function CB(er) {
              if (er) {
                if (("EBUSY" === er.code || "ENOTEMPTY" === er.code || "EPERM" === er.code) && busyTries < options.maxBusyTries) return busyTries++, 
                setTimeout((function() {
                  rimraf_(p, options, CB);
                }), 100 * busyTries);
                if ("EMFILE" === er.code && timeout < options.emfileWait) return setTimeout((function() {
                  rimraf_(p, options, CB);
                }), timeout++);
                "ENOENT" === er.code && (er = null);
              }
              timeout = 0, function(er) {
                errState = errState || er, 0 == --n && cb(errState);
              }(er);
            }));
          }));
        }
        options.lstat(p, (function(er, stat) {
          if (!er) return afterGlob(null, [ p ]);
          glob(p, options.glob, afterGlob);
        }));
      }
      function rimraf_(p, options, cb) {
        assert(p), assert(options), assert("function" == typeof cb), options.lstat(p, (function(er, st) {
          return er && "ENOENT" === er.code ? cb(null) : (er && "EPERM" === er.code && isWindows && fixWinEPERM(p, options, er, cb), 
          st && st.isDirectory() ? rmdir(p, options, er, cb) : void options.unlink(p, (function(er) {
            if (er) {
              if ("ENOENT" === er.code) return cb(null);
              if ("EPERM" === er.code) return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
              if ("EISDIR" === er.code) return rmdir(p, options, er, cb);
            }
            return cb(er);
          })));
        }));
      }
      function fixWinEPERM(p, options, er, cb) {
        assert(p), assert(options), assert("function" == typeof cb), er && assert(er instanceof Error), 
        options.chmod(p, _0666, (function(er2) {
          er2 ? cb("ENOENT" === er2.code ? null : er) : options.stat(p, (function(er3, stats) {
            er3 ? cb("ENOENT" === er3.code ? null : er) : stats.isDirectory() ? rmdir(p, options, er, cb) : options.unlink(p, cb);
          }));
        }));
      }
      function fixWinEPERMSync(p, options, er) {
        assert(p), assert(options), er && assert(er instanceof Error);
        try {
          options.chmodSync(p, _0666);
        } catch (er2) {
          if ("ENOENT" === er2.code) return;
          throw er;
        }
        try {
          var stats = options.statSync(p);
        } catch (er3) {
          if ("ENOENT" === er3.code) return;
          throw er;
        }
        stats.isDirectory() ? rmdirSync(p, options, er) : options.unlinkSync(p);
      }
      function rmdir(p, options, originalEr, cb) {
        assert(p), assert(options), originalEr && assert(originalEr instanceof Error), assert("function" == typeof cb), 
        options.rmdir(p, (function(er) {
          !er || "ENOTEMPTY" !== er.code && "EEXIST" !== er.code && "EPERM" !== er.code ? er && "ENOTDIR" === er.code ? cb(originalEr) : cb(er) : function(p, options, cb) {
            assert(p), assert(options), assert("function" == typeof cb), options.readdir(p, (function(er, files) {
              if (er) return cb(er);
              var errState, n = files.length;
              if (0 === n) return options.rmdir(p, cb);
              files.forEach((function(f) {
                rimraf(path.join(p, f), options, (function(er) {
                  if (!errState) return er ? cb(errState = er) : void (0 == --n && options.rmdir(p, cb));
                }));
              }));
            }));
          }(p, options, cb);
        }));
      }
      function rimrafSync(p, options) {
        var results;
        if (defaults(options = options || {}), assert(p, "rimraf: missing path"), assert.equal(typeof p, "string", "rimraf: path should be a string"), 
        assert(options, "rimraf: missing options"), assert.equal(typeof options, "object", "rimraf: options should be object"), 
        options.disableGlob || !glob.hasMagic(p)) results = [ p ]; else try {
          options.lstatSync(p), results = [ p ];
        } catch (er) {
          results = glob.sync(p, options.glob);
        }
        if (results.length) for (var i = 0; i < results.length; i++) {
          p = results[i];
          try {
            var st = options.lstatSync(p);
          } catch (er) {
            if ("ENOENT" === er.code) return;
            "EPERM" === er.code && isWindows && fixWinEPERMSync(p, options, er);
          }
          try {
            st && st.isDirectory() ? rmdirSync(p, options, null) : options.unlinkSync(p);
          } catch (er) {
            if ("ENOENT" === er.code) return;
            if ("EPERM" === er.code) return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
            if ("EISDIR" !== er.code) throw er;
            rmdirSync(p, options, er);
          }
        }
      }
      function rmdirSync(p, options, originalEr) {
        assert(p), assert(options), originalEr && assert(originalEr instanceof Error);
        try {
          options.rmdirSync(p);
        } catch (er) {
          if ("ENOENT" === er.code) return;
          if ("ENOTDIR" === er.code) throw originalEr;
          "ENOTEMPTY" !== er.code && "EEXIST" !== er.code && "EPERM" !== er.code || function(p, options) {
            assert(p), assert(options), options.readdirSync(p).forEach((function(f) {
              rimrafSync(path.join(p, f), options);
            }));
            var retries = isWindows ? 100 : 1, i = 0;
            for (;;) {
              var threw = !0;
              try {
                var ret = options.rmdirSync(p, options);
                return threw = !1, ret;
              } finally {
                if (++i < retries && threw) continue;
              }
            }
          }(p, options);
        }
      }
    },
    7017: (module, __unused_webpack_exports, __webpack_require__) => {
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
      var isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(71017), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(23789);
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
    },
    49972: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(71017), log = __webpack_require__(19334);
      module.exports = function(scriptLocation, processObj) {
        void 0 === scriptLocation && (scriptLocation = __dirname), void 0 === processObj && (processObj = process);
        var npmParentDirectory = path.join(scriptLocation, "../..");
        log.verbose("node-gyp root", "npm_parent_directory is " + path.basename(npmParentDirectory));
        var nodeRootDir = "";
        if (log.verbose("node-gyp root", "Finding node root directory"), "deps" === path.basename(npmParentDirectory)) nodeRootDir = path.join(npmParentDirectory, ".."), 
        log.verbose("node-gyp root", "in build directory, root = " + nodeRootDir); else if ("node_modules" === path.basename(npmParentDirectory)) nodeRootDir = "win32" === processObj.platform ? path.join(npmParentDirectory, "..") : path.join(npmParentDirectory, "../.."), 
        log.verbose("node-gyp root", "in install directory, root = " + nodeRootDir); else {
          var nodeDir = path.dirname(processObj.execPath), directoryUp = path.basename(nodeDir);
          "bin" === directoryUp ? nodeRootDir = path.join(nodeDir, "..") : "Release" !== directoryUp && "Debug" !== directoryUp || (nodeRootDir = "win32" === processObj.platform ? path.join(nodeDir, "..") : path.join(nodeDir, "../.."));
        }
        return nodeRootDir;
      };
    },
    73107: module => {
      "use strict";
      module.exports = require("./semver");
    },
    39148: module => {
      "use strict";
      module.exports = require("./tar");
    },
    60166: module => {
      "use strict";
      module.exports = require("./nopt");
    },
    19334: module => {
      "use strict";
      module.exports = require("./npmlog");
    },
    34436: module => {
      "use strict";
      module.exports = require("../vendor/glob");
    },
    59799: module => {
      "use strict";
      module.exports = require("../vendor/graceful-fs");
    },
    34712: module => {
      "use strict";
      module.exports = require("../vendor/request");
    },
    39491: module => {
      "use strict";
      module.exports = require("assert");
    },
    32081: module => {
      "use strict";
      module.exports = require("child_process");
    },
    6113: module => {
      "use strict";
      module.exports = require("crypto");
    },
    82361: module => {
      "use strict";
      module.exports = require("events");
    },
    57147: module => {
      "use strict";
      module.exports = require("fs");
    },
    22037: module => {
      "use strict";
      module.exports = require("os");
    },
    71017: module => {
      "use strict";
      module.exports = require("path");
    },
    57310: module => {
      "use strict";
      module.exports = require("url");
    },
    73837: module => {
      "use strict";
      module.exports = require("util");
    },
    26671: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"node-gyp","description":"Node.js native addon build tool","version":"5.1.1","installVersion":9}');
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
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  var __webpack_exports__ = __webpack_require__(92081);
  module.exports = __webpack_exports__;
})();