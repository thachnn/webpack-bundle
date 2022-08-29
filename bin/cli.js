#!/usr/bin/env node
(() => {
  "use strict";
  var __webpack_modules__ = {
    9516: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), locatePath = __webpack_require__(5870), pathExists = __webpack_require__(7835), stop = Symbol("findUp.stop");
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
    5870: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), fs = __webpack_require__(7147), {promisify} = __webpack_require__(3837), pLocate = __webpack_require__(1885), fsStat = promisify(fs.stat), fsLStat = promisify(fs.lstat), typeMappings = {
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
    406: (module, __unused_webpack_exports, __webpack_require__) => {
      const pTry = __webpack_require__(9161), pLimit = concurrency => {
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
    1885: (module, __unused_webpack_exports, __webpack_require__) => {
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
    9161: module => {
      const pTry = (fn, ...arguments_) => new Promise((resolve => {
        resolve(fn(...arguments_));
      }));
      module.exports = pTry, module.exports.default = pTry;
    },
    7835: (module, __unused_webpack_exports, __webpack_require__) => {
      const fs = __webpack_require__(7147), {promisify} = __webpack_require__(3837), pAccess = promisify(fs.access);
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
    2553: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), findUp = __webpack_require__(9516), pkgDir = async cwd => {
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
    873: (module, __unused_webpack_exports, __webpack_require__) => {
      const resolveFrom = __webpack_require__(5390);
      module.exports = moduleId => resolveFrom(process.cwd(), moduleId), module.exports.silent = moduleId => resolveFrom.silent(process.cwd(), moduleId);
    },
    5390: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), Module = __webpack_require__(8188), fs = __webpack_require__(7147), resolveFrom = (fromDirectory, moduleId, silent) => {
        if ("string" != typeof fromDirectory) throw new TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDirectory}\``);
        if ("string" != typeof moduleId) throw new TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``);
        try {
          fromDirectory = fs.realpathSync(fromDirectory);
        } catch (error) {
          if ("ENOENT" !== error.code) {
            if (silent) return;
            throw error;
          }
          fromDirectory = path.resolve(fromDirectory);
        }
        const fromFile = path.join(fromDirectory, "noop.js"), resolveFileName = () => Module._resolveFilename(moduleId, {
          id: fromFile,
          filename: fromFile,
          paths: Module._nodeModulePaths(fromDirectory)
        });
        if (silent) try {
          return resolveFileName();
        } catch (error) {
          return;
        }
        return resolveFileName();
      };
      module.exports = (fromDirectory, moduleId) => resolveFrom(fromDirectory, moduleId), 
      module.exports.silent = (fromDirectory, moduleId) => resolveFrom(fromDirectory, moduleId, !0);
    },
    3516: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), {fileURLToPath} = __webpack_require__(7310), resolveCwd = __webpack_require__(873), pkgDir = __webpack_require__(2553);
      module.exports = filename => {
        const normalizedFilename = filename.startsWith("file://") ? fileURLToPath(filename) : filename, globalDir = pkgDir.sync(path.dirname(normalizedFilename)), relativePath = path.relative(globalDir, normalizedFilename), pkg = __webpack_require__(5965)(path.join(globalDir, "package.json")), localFile = resolveCwd.silent(path.join(pkg.name, relativePath)), localNodeModules = path.join(process.cwd(), "node_modules");
        return !(!path.relative(localNodeModules, normalizedFilename).startsWith("..") && path.parse(localNodeModules).root === path.parse(normalizedFilename).root) && localFile && "" !== path.relative(localFile, normalizedFilename) && __webpack_require__(5965)(localFile);
      };
    },
    2784: (module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const WebpackCLI = __webpack_require__(5857);
      module.exports = async args => {
        const cli = new WebpackCLI;
        try {
          await cli.run(args);
        } catch (error) {
          cli.logger.error(error), process.exit(2);
        }
      };
    },
    5857: module => {
      module.exports = require("../lib/index");
    },
    5965: module => {
      module.exports = require;
    },
    7147: module => {
      module.exports = require("fs");
    },
    8188: module => {
      module.exports = require("module");
    },
    1017: module => {
      module.exports = require("path");
    },
    7310: module => {
      module.exports = require("url");
    },
    3837: module => {
      module.exports = require("util");
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
    const importLocal = __webpack_require__(3516), runCLI = __webpack_require__(2784);
    !process.env.WEBPACK_CLI_SKIP_IMPORT_LOCAL && importLocal(__filename) || (process.title = "webpack", 
    runCLI(process.argv));
  })();
})();