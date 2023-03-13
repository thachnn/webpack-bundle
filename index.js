(() => {
  var __webpack_modules__ = {
    515: (module, __unused_webpack_exports, __webpack_require__) => {
      var path = __webpack_require__(17);
      module.exports = function(basedir, relfiles) {
        if (relfiles) var files = relfiles.map((function(r) {
          return path.resolve(basedir, r);
        })); else files = basedir;
        var res = files.slice(1).reduce((function(ps, file) {
          if (!file.match(/^([A-Za-z]:)?\/|\\/)) throw new Error("relative path without a basedir");
          for (var xs = file.split(/\/+|\\+/), i = 0; ps[i] === xs[i] && i < Math.min(ps.length, xs.length); i++) ;
          return ps.slice(0, i);
        }), files[0].split(/\/+|\\+/));
        return res.length > 1 ? res.join("/") : "/";
      };
    },
    703: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), fs = __webpack_require__(147), commonDir = __webpack_require__(515), pkgDir = __webpack_require__(553), makeDir = __webpack_require__(789), {env, cwd} = process, isWritable = path => {
        try {
          return fs.accessSync(path, fs.constants.W_OK), !0;
        } catch (_) {
          return !1;
        }
      };
      function useDirectory(directory, options) {
        return options.create && makeDir.sync(directory), options.thunk ? (...arguments_) => path.join(directory, ...arguments_) : directory;
      }
      module.exports = (options = {}) => {
        if (env.CACHE_DIR && ![ "true", "false", "1", "0" ].includes(env.CACHE_DIR)) return useDirectory(path.join(env.CACHE_DIR, options.name), options);
        let {cwd: directory = cwd()} = options;
        if (options.files && (directory = commonDir(directory, options.files)), directory = pkgDir.sync(directory), 
        !directory) return;
        const nodeModules = function(directory) {
          const nodeModules = path.join(directory, "node_modules");
          if (isWritable(nodeModules) || !fs.existsSync(nodeModules) && isWritable(path.join(directory))) return nodeModules;
        }(directory);
        return nodeModules ? useDirectory(path.join(directory, "node_modules", ".cache", options.name), options) : void 0;
      };
    },
    516: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), locatePath = __webpack_require__(401), pathExists = __webpack_require__(835), stop = Symbol("findUp.stop");
      module.exports = async (name, options = {}) => {
        let directory = path.resolve(options.cwd || "");
        const {root} = path.parse(directory), paths = [].concat(name), runMatcher = async locateOptions => {
          if ("function" != typeof name) return locatePath(paths, locateOptions);
          const foundPath = await name(locateOptions.cwd);
          return "string" == typeof foundPath ? locatePath([ foundPath ], locateOptions) : foundPath;
        };
        for (;;) {
          const foundPath = await runMatcher({
            ...options,
            cwd: directory
          });
          if (foundPath === stop) return;
          if (foundPath) return path.resolve(directory, foundPath);
          if (directory === root) return;
          directory = path.dirname(directory);
        }
      }, module.exports.sync = (name, options = {}) => {
        let directory = path.resolve(options.cwd || "");
        const {root} = path.parse(directory), paths = [].concat(name), runMatcher = locateOptions => {
          if ("function" != typeof name) return locatePath.sync(paths, locateOptions);
          const foundPath = name(locateOptions.cwd);
          return "string" == typeof foundPath ? locatePath.sync([ foundPath ], locateOptions) : foundPath;
        };
        for (;;) {
          const foundPath = runMatcher({
            ...options,
            cwd: directory
          });
          if (foundPath === stop) return;
          if (foundPath) return path.resolve(directory, foundPath);
          if (directory === root) return;
          directory = path.dirname(directory);
        }
      }, module.exports.exists = pathExists, module.exports.sync.exists = pathExists.sync, 
      module.exports.stop = stop;
    },
    401: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), fs = __webpack_require__(147), {promisify} = __webpack_require__(837), pLocate = __webpack_require__(885), fsStat = promisify(fs.stat), fsLStat = promisify(fs.lstat), typeMappings = {
        directory: "isDirectory",
        file: "isFile"
      };
      function checkType({type}) {
        if (!(type in typeMappings)) throw new Error(`Invalid type specified: ${type}`);
      }
      const matchType = (type, stat) => void 0 === type || stat[typeMappings[type]]();
      module.exports = async (paths, options) => {
        checkType(options = {
          cwd: process.cwd(),
          type: "file",
          allowSymlinks: !0,
          ...options
        });
        const statFn = options.allowSymlinks ? fsStat : fsLStat;
        return pLocate(paths, (async path_ => {
          try {
            const stat = await statFn(path.resolve(options.cwd, path_));
            return matchType(options.type, stat);
          } catch (_) {
            return !1;
          }
        }), options);
      }, module.exports.sync = (paths, options) => {
        checkType(options = {
          cwd: process.cwd(),
          allowSymlinks: !0,
          type: "file",
          ...options
        });
        const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;
        for (const path_ of paths) try {
          const stat = statFn(path.resolve(options.cwd, path_));
          if (matchType(options.type, stat)) return path_;
        } catch (_) {}
      };
    },
    789: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(147), path = __webpack_require__(17), {promisify} = __webpack_require__(837), useNativeRecursiveOption = __webpack_require__(747).satisfies(process.version, ">=10.12.0"), checkPath = pth => {
        if ("win32" === process.platform) {
          if (/[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ""))) {
            const error = new Error(`Path contains invalid characters: ${pth}`);
            throw error.code = "EINVAL", error;
          }
        }
      }, processOptions = options => ({
        ...{
          mode: 511,
          fs
        },
        ...options
      }), permissionError = pth => {
        const error = new Error(`operation not permitted, mkdir '${pth}'`);
        return error.code = "EPERM", error.errno = -4048, error.path = pth, error.syscall = "mkdir", 
        error;
      };
      module.exports = async (input, options) => {
        checkPath(input), options = processOptions(options);
        const mkdir = promisify(options.fs.mkdir), stat = promisify(options.fs.stat);
        if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
          const pth = path.resolve(input);
          return await mkdir(pth, {
            mode: options.mode,
            recursive: !0
          }), pth;
        }
        const make = async pth => {
          try {
            return await mkdir(pth, options.mode), pth;
          } catch (error) {
            if ("EPERM" === error.code) throw error;
            if ("ENOENT" === error.code) {
              if (path.dirname(pth) === pth) throw permissionError(pth);
              if (error.message.includes("null bytes")) throw error;
              return await make(path.dirname(pth)), make(pth);
            }
            try {
              if (!(await stat(pth)).isDirectory()) throw new Error("The path is not a directory");
            } catch (_) {
              throw error;
            }
            return pth;
          }
        };
        return make(path.resolve(input));
      }, module.exports.sync = (input, options) => {
        if (checkPath(input), options = processOptions(options), useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
          const pth = path.resolve(input);
          return fs.mkdirSync(pth, {
            mode: options.mode,
            recursive: !0
          }), pth;
        }
        const make = pth => {
          try {
            options.fs.mkdirSync(pth, options.mode);
          } catch (error) {
            if ("EPERM" === error.code) throw error;
            if ("ENOENT" === error.code) {
              if (path.dirname(pth) === pth) throw permissionError(pth);
              if (error.message.includes("null bytes")) throw error;
              return make(path.dirname(pth)), make(pth);
            }
            try {
              if (!options.fs.statSync(pth).isDirectory()) throw new Error("The path is not a directory");
            } catch (_) {
              throw error;
            }
          }
          return pth;
        };
        return make(path.resolve(input));
      };
    },
    406: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const pTry = __webpack_require__(161), pLimit = concurrency => {
        if (!Number.isInteger(concurrency) && concurrency !== 1 / 0 || !(concurrency > 0)) return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
        const queue = [];
        let activeCount = 0;
        const next = () => {
          activeCount--, queue.length > 0 && queue.shift()();
        }, run = (fn, resolve, ...args) => {
          activeCount++;
          const result = pTry(fn, ...args);
          resolve(result), result.then(next, next);
        }, generator = (fn, ...args) => new Promise((resolve => ((fn, resolve, ...args) => {
          activeCount < concurrency ? run(fn, resolve, ...args) : queue.push(run.bind(null, fn, resolve, ...args));
        })(fn, resolve, ...args)));
        return Object.defineProperties(generator, {
          activeCount: {
            get: () => activeCount
          },
          pendingCount: {
            get: () => queue.length
          },
          clearQueue: {
            value: () => {
              queue.length = 0;
            }
          }
        }), generator;
      };
      module.exports = pLimit, module.exports.default = pLimit;
    },
    885: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const pLimit = __webpack_require__(406);
      class EndError extends Error {
        constructor(value) {
          super(), this.value = value;
        }
      }
      const testElement = async (element, tester) => tester(await element), finder = async element => {
        const values = await Promise.all(element);
        if (!0 === values[1]) throw new EndError(values[0]);
        return !1;
      }, pLocate = async (iterable, tester, options) => {
        options = {
          concurrency: 1 / 0,
          preserveOrder: !0,
          ...options
        };
        const limit = pLimit(options.concurrency), items = [ ...iterable ].map((element => [ element, limit(testElement, element, tester) ])), checkLimit = pLimit(options.preserveOrder ? 1 : 1 / 0);
        try {
          await Promise.all(items.map((element => checkLimit(finder, element))));
        } catch (error) {
          if (error instanceof EndError) return error.value;
          throw error;
        }
      };
      module.exports = pLocate, module.exports.default = pLocate;
    },
    161: module => {
      "use strict";
      const pTry = (fn, ...arguments_) => new Promise((resolve => {
        resolve(fn(...arguments_));
      }));
      module.exports = pTry, module.exports.default = pTry;
    },
    835: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(147), {promisify} = __webpack_require__(837), pAccess = promisify(fs.access);
      module.exports = async path => {
        try {
          return await pAccess(path), !0;
        } catch (_) {
          return !1;
        }
      }, module.exports.sync = path => {
        try {
          return fs.accessSync(path), !0;
        } catch (_) {
          return !1;
        }
      };
    },
    553: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), findUp = __webpack_require__(516), pkgDir = async cwd => {
        const filePath = await findUp("package.json", {
          cwd
        });
        return filePath && path.dirname(filePath);
      };
      module.exports = pkgDir, module.exports.default = pkgDir, module.exports.sync = cwd => {
        const filePath = findUp.sync("package.json", {
          cwd
        });
        return filePath && path.dirname(filePath);
      };
    },
    747: module => {
      "use strict";
      module.exports = require("./semver");
    },
    147: module => {
      "use strict";
      module.exports = require("fs");
    },
    17: module => {
      "use strict";
      module.exports = require("path");
    },
    837: module => {
      "use strict";
      module.exports = require("util");
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
  }(703);
  module.exports = __webpack_exports__;
})();