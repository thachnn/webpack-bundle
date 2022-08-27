(() => {
  var __webpack_modules__ = {
    137: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const plugin = __webpack_require__(818);
      module.exports = plugin.default;
    },
    795: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.readFile = function(inputFileSystem, path) {
        return new Promise(((resolve, reject) => {
          inputFileSystem.readFile(path, ((err, stats) => {
            err && reject(err), resolve(stats);
          }));
        }));
      }, exports.stat = function(inputFileSystem, path) {
        return new Promise(((resolve, reject) => {
          inputFileSystem.stat(path, ((err, stats) => {
            err && reject(err), resolve(stats);
          }));
        }));
      }, exports.throttleAll = function(limit, tasks) {
        if (!Number.isInteger(limit) || limit < 1) throw new TypeError(`Expected \`limit\` to be a finite number > 0, got \`${limit}\` (${typeof limit})`);
        if (!Array.isArray(tasks) || !tasks.every((task => "function" == typeof task))) throw new TypeError("Expected `tasks` to be a list of functions returning a promise");
        return new Promise(((resolve, reject) => {
          const result = Array(tasks.length).fill(notSettled), entries = tasks.entries(), next = () => {
            const {done, value} = entries.next();
            if (done) {
              return void (!result.includes(notSettled) && resolve(result));
            }
            const [index, task] = value;
            task().then((x => {
              result[index] = x, next();
            }), reject);
          };
          Array(limit).fill(0).forEach(next);
        }));
      };
      const notSettled = Symbol("not-settled");
    },
    647: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var isGlob = __webpack_require__(830), pathPosixDirname = __webpack_require__(17).posix.dirname, isWin32 = "win32" === __webpack_require__(37).platform(), backslash = /\\/g, escaped = /\\([!*?|[\](){}])/g;
      function isGlobby(str) {
        return !!/\([^()]+$/.test(str) || ("{" === str[0] || "[" === str[0] || (!!/[^\\][{[]/.test(str) || isGlob(str)));
      }
      module.exports = function(str, opts) {
        Object.assign({
          flipBackslashes: !0
        }, opts).flipBackslashes && isWin32 && str.indexOf("/") < 0 && (str = str.replace(backslash, "/")), 
        function(str) {
          var enclosureStart;
          switch (str.slice(-1)) {
           case "}":
            enclosureStart = "{";
            break;

           case "]":
            enclosureStart = "[";
            break;

           default:
            return !1;
          }
          var foundIndex = str.indexOf(enclosureStart);
          if (foundIndex < 0) return !1;
          return str.slice(foundIndex + 1, -1).includes("/");
        }(str) && (str += "/"), str += "a";
        do {
          str = pathPosixDirname(str);
        } while (isGlobby(str));
        return str.replace(escaped, "$1");
      };
    },
    428: module => {
      module.exports = function(str) {
        if ("string" != typeof str || "" === str) return !1;
        for (var match; match = /(\\).|([@?!+*]\(.*\))/g.exec(str); ) {
          if (match[2]) return !0;
          str = str.slice(match.index + match[0].length);
        }
        return !1;
      };
    },
    830: (module, __unused_webpack_exports, __webpack_require__) => {
      var isExtglob = __webpack_require__(428), chars = {
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
    },
    171: module => {
      module.exports = function(path, stripTrailing) {
        if ("string" != typeof path) throw new TypeError("expected path to be a string");
        if ("\\" === path || "/" === path) return "/";
        var len = path.length;
        if (len <= 1) return path;
        var prefix = "";
        if (len > 4 && "\\" === path[3]) {
          var ch = path[2];
          "?" !== ch && "." !== ch || "\\\\" !== path.slice(0, 2) || (path = path.slice(2), 
          prefix = "//");
        }
        var segs = path.split(/[/\\]+/);
        return !1 !== stripTrailing && "" === segs[segs.length - 1] && segs.pop(), prefix + segs.join("/");
      };
    },
    818: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _path = _interopRequireDefault(__webpack_require__(17)), _schemaUtils = __webpack_require__(842), _globby = _interopRequireDefault(__webpack_require__(477)), _serializeJavascript = _interopRequireDefault(__webpack_require__(659)), _normalizePath = _interopRequireDefault(__webpack_require__(171)), _globParent = _interopRequireDefault(__webpack_require__(647)), _fastGlob = _interopRequireDefault(__webpack_require__(330)), _packageVersion = __webpack_require__(966).i8, _options = _interopRequireDefault(__webpack_require__(780)), _utils = __webpack_require__(795);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      const template = /\[\\*([\w:]+)\\*\]/i;
      class CopyPlugin {
        constructor(options = {}) {
          (0, _schemaUtils.validate)(_options.default, options, {
            name: "Copy Plugin",
            baseDataPath: "options"
          }), this.patterns = options.patterns, this.options = options.options || {};
        }
        static async createSnapshot(compilation, startTime, dependency) {
          return new Promise(((resolve, reject) => {
            compilation.fileSystemInfo.createSnapshot(startTime, [ dependency ], void 0, void 0, null, ((error, snapshot) => {
              error ? reject(error) : resolve(snapshot);
            }));
          }));
        }
        static async checkSnapshotValid(compilation, snapshot) {
          return new Promise(((resolve, reject) => {
            compilation.fileSystemInfo.checkSnapshotValid(snapshot, ((error, isValid) => {
              error ? reject(error) : resolve(isValid);
            }));
          }));
        }
        static getContentHash(compiler, compilation, source) {
          const {outputOptions} = compilation, {hashDigest, hashDigestLength, hashFunction, hashSalt} = outputOptions, hash = compiler.webpack.util.createHash(hashFunction);
          hashSalt && hash.update(hashSalt), hash.update(source);
          return hash.digest(hashDigest).slice(0, hashDigestLength);
        }
        static async runPattern(compiler, compilation, logger, cache, inputPattern, index) {
          const {RawSource} = compiler.webpack.sources, pattern = "string" == typeof inputPattern ? {
            from: inputPattern
          } : {
            ...inputPattern
          };
          pattern.fromOrigin = pattern.from, pattern.from = _path.default.normalize(pattern.from), 
          pattern.context = void 0 === pattern.context ? compiler.context : _path.default.isAbsolute(pattern.context) ? pattern.context : _path.default.join(compiler.context, pattern.context), 
          logger.log(`starting to process a pattern from '${pattern.from}' using '${pattern.context}' context`), 
          _path.default.isAbsolute(pattern.from) ? pattern.absoluteFrom = pattern.from : pattern.absoluteFrom = _path.default.resolve(pattern.context, pattern.from), 
          logger.debug(`getting stats for '${pattern.absoluteFrom}'...`);
          const {inputFileSystem} = compiler;
          let stats, paths;
          try {
            stats = await (0, _utils.stat)(inputFileSystem, pattern.absoluteFrom);
          } catch (error) {}
          switch (stats && (stats.isDirectory() ? (pattern.fromType = "dir", logger.debug(`determined '${pattern.absoluteFrom}' is a directory`)) : stats.isFile() ? (pattern.fromType = "file", 
          logger.debug(`determined '${pattern.absoluteFrom}' is a file`)) : logger.debug(`determined '${pattern.absoluteFrom}' is a glob`)), 
          pattern.globOptions = {
            followSymbolicLinks: !0,
            ...pattern.globOptions || {},
            cwd: pattern.context,
            objectMode: !0
          }, pattern.globOptions.fs = inputFileSystem, pattern.fromType) {
           case "dir":
            compilation.contextDependencies.add(pattern.absoluteFrom), logger.debug(`added '${pattern.absoluteFrom}' as a context dependency`), 
            pattern.context = pattern.absoluteFrom, pattern.glob = _path.default.posix.join(_fastGlob.default.escapePath((0, 
            _normalizePath.default)(_path.default.resolve(pattern.absoluteFrom))), "**/*"), 
            pattern.absoluteFrom = _path.default.join(pattern.absoluteFrom, "**/*"), void 0 === pattern.globOptions.dot && (pattern.globOptions.dot = !0);
            break;

           case "file":
            compilation.fileDependencies.add(pattern.absoluteFrom), logger.debug(`added '${pattern.absoluteFrom}' as a file dependency`), 
            pattern.context = _path.default.dirname(pattern.absoluteFrom), pattern.glob = _fastGlob.default.escapePath((0, 
            _normalizePath.default)(_path.default.resolve(pattern.absoluteFrom))), void 0 === pattern.globOptions.dot && (pattern.globOptions.dot = !0);
            break;

           default:
            {
              const contextDependencies = _path.default.normalize((0, _globParent.default)(pattern.absoluteFrom));
              compilation.contextDependencies.add(contextDependencies), logger.debug(`added '${contextDependencies}' as a context dependency`), 
              pattern.fromType = "glob", pattern.glob = _path.default.isAbsolute(pattern.fromOrigin) ? pattern.fromOrigin : _path.default.posix.join(_fastGlob.default.escapePath((0, 
              _normalizePath.default)(_path.default.resolve(pattern.context))), pattern.fromOrigin);
            }
          }
          logger.log(`begin globbing '${pattern.glob}'...`);
          try {
            paths = await (0, _globby.default)(pattern.glob, pattern.globOptions);
          } catch (error) {
            return void compilation.errors.push(error);
          }
          if (0 === paths.length) {
            if (pattern.noErrorOnMissing) return void logger.log(`finished to process a pattern from '${pattern.from}' using '${pattern.context}' context to '${pattern.to}'`);
            const missingError = new Error(`unable to locate '${pattern.glob}' glob`);
            return void compilation.errors.push(missingError);
          }
          const filteredPaths = (await Promise.all(paths.map((async item => {
            if (!item.dirent.isFile()) return !1;
            if (pattern.filter) {
              let isFiltered;
              try {
                isFiltered = await pattern.filter(item.path);
              } catch (error) {
                return compilation.errors.push(error), !1;
              }
              return isFiltered || logger.log(`skip '${item.path}', because it was filtered`), 
              !!isFiltered && item;
            }
            return item;
          })))).filter((item => item));
          if (0 === filteredPaths.length) {
            if (pattern.noErrorOnMissing) return void logger.log(`finished to process a pattern from '${pattern.from}' using '${pattern.context}' context to '${pattern.to}'`);
            const missingError = new Error(`unable to locate '${pattern.glob}' glob after filtering paths`);
            return void compilation.errors.push(missingError);
          }
          const files = await Promise.all(filteredPaths.map((async item => {
            const from = item.path;
            logger.debug(`found '${from}'`);
            const absoluteFilename = _path.default.resolve(pattern.context, from);
            pattern.to = "function" == typeof pattern.to ? await pattern.to({
              context: pattern.context,
              absoluteFilename
            }) : _path.default.normalize(void 0 !== pattern.to ? pattern.to : "");
            const isToDirectory = "" === _path.default.extname(pattern.to) || pattern.to.slice(-1) === _path.default.sep, toType = pattern.toType ? pattern.toType : template.test(pattern.to) ? "template" : isToDirectory ? "dir" : "file";
            logger.log(`'to' option '${pattern.to}' determinated as '${toType}'`);
            const relativeFrom = _path.default.relative(pattern.context, absoluteFilename);
            let filename = "dir" === toType ? _path.default.join(pattern.to, relativeFrom) : pattern.to;
            _path.default.isAbsolute(filename) && (filename = _path.default.relative(compiler.options.output.path, filename)), 
            logger.log(`determined that '${from}' should write to '${filename}'`);
            return {
              absoluteFilename,
              sourceFilename: (0, _normalizePath.default)(_path.default.relative(compiler.context, absoluteFilename)),
              filename,
              toType
            };
          })));
          let assets;
          try {
            assets = await Promise.all(files.map((async file => {
              const {absoluteFilename, sourceFilename, filename, toType} = file, info = "function" == typeof pattern.info ? pattern.info(file) || {} : pattern.info || {}, result = {
                absoluteFilename,
                sourceFilename,
                filename,
                force: pattern.force,
                info
              };
              let cacheEntry;
              "dir" !== pattern.fromType && "glob" !== pattern.fromType || (compilation.fileDependencies.add(absoluteFilename), 
              logger.debug(`added '${absoluteFilename}' as a file dependency`)), logger.debug(`getting cache for '${absoluteFilename}'...`);
              try {
                cacheEntry = await cache.getPromise(`${sourceFilename}|${index}`, null);
              } catch (error) {
                return void compilation.errors.push(error);
              }
              if (cacheEntry) {
                let isValidSnapshot;
                logger.debug(`found cache for '${absoluteFilename}'...`), logger.debug(`checking snapshot on valid for '${absoluteFilename}'...`);
                try {
                  isValidSnapshot = await CopyPlugin.checkSnapshotValid(compilation, cacheEntry.snapshot);
                } catch (error) {
                  return void compilation.errors.push(error);
                }
                isValidSnapshot ? (logger.debug(`snapshot for '${absoluteFilename}' is valid`), 
                result.source = cacheEntry.source) : logger.debug(`snapshot for '${absoluteFilename}' is invalid`);
              } else logger.debug(`missed cache for '${absoluteFilename}'`);
              if (!result.source) {
                const startTime = Date.now();
                let data, snapshot;
                logger.debug(`reading '${absoluteFilename}'...`);
                try {
                  data = await (0, _utils.readFile)(inputFileSystem, absoluteFilename);
                } catch (error) {
                  return void compilation.errors.push(error);
                }
                logger.debug(`read '${absoluteFilename}'`), result.source = new RawSource(data), 
                logger.debug(`creating snapshot for '${absoluteFilename}'...`);
                try {
                  snapshot = await CopyPlugin.createSnapshot(compilation, startTime, absoluteFilename);
                } catch (error) {
                  return void compilation.errors.push(error);
                }
                if (snapshot) {
                  logger.debug(`created snapshot for '${absoluteFilename}'`), logger.debug(`storing cache for '${absoluteFilename}'...`);
                  try {
                    await cache.storePromise(`${sourceFilename}|${index}`, null, {
                      source: result.source,
                      snapshot
                    });
                  } catch (error) {
                    return void compilation.errors.push(error);
                  }
                  logger.debug(`stored cache for '${absoluteFilename}'`);
                }
              }
              if (pattern.transform) {
                const transform = "function" == typeof pattern.transform ? {
                  transformer: pattern.transform
                } : pattern.transform;
                if (transform.transformer) {
                  logger.log(`transforming content for '${absoluteFilename}'...`);
                  const buffer = result.source.buffer();
                  if (transform.cache) {
                    const hasher = compiler.webpack && compiler.webpack.util && compiler.webpack.util.createHash ? compiler.webpack.util.createHash("xxhash64") : __webpack_require__(113).createHash("md4"), defaultCacheKeys = {
                      version: _packageVersion,
                      sourceFilename,
                      transform: transform.transformer,
                      contentHash: hasher.update(buffer).digest("hex"),
                      index
                    }, cacheKeys = `transform|${(0, _serializeJavascript.default)("function" == typeof transform.cache.keys ? await transform.cache.keys(defaultCacheKeys, absoluteFilename) : {
                      ...defaultCacheKeys,
                      ...pattern.transform.cache.keys
                    })}`;
                    logger.debug(`getting transformation cache for '${absoluteFilename}'...`);
                    const cacheItem = cache.getItemCache(cacheKeys, cache.getLazyHashedEtag(result.source));
                    if (result.source = await cacheItem.getPromise(), logger.debug(result.source ? `found transformation cache for '${absoluteFilename}'` : `no transformation cache for '${absoluteFilename}'`), 
                    !result.source) {
                      const transformed = await transform.transformer(buffer, absoluteFilename);
                      result.source = new RawSource(transformed), logger.debug(`caching transformation for '${absoluteFilename}'...`), 
                      await cacheItem.storePromise(result.source), logger.debug(`cached transformation for '${absoluteFilename}'`);
                    }
                  } else result.source = new RawSource(await transform.transformer(buffer, absoluteFilename));
                }
              }
              if ("template" === toType) {
                logger.log(`interpolating template '${filename}' for '${sourceFilename}'...`);
                const contentHash = CopyPlugin.getContentHash(compiler, compilation, result.source.buffer()), ext = _path.default.extname(result.sourceFilename), base = _path.default.basename(result.sourceFilename), name = base.slice(0, base.length - ext.length), data = {
                  filename: (0, _normalizePath.default)(_path.default.relative(pattern.context, absoluteFilename)),
                  contentHash,
                  chunk: {
                    name,
                    id: result.sourceFilename,
                    hash: contentHash,
                    contentHash
                  }
                }, {path: interpolatedFilename, info: assetInfo} = compilation.getPathWithInfo((0, 
                _normalizePath.default)(result.filename), data);
                result.info = {
                  ...result.info,
                  ...assetInfo
                }, result.filename = interpolatedFilename, logger.log(`interpolated template '${filename}' for '${sourceFilename}'`);
              } else result.filename = (0, _normalizePath.default)(result.filename);
              return result;
            })));
          } catch (error) {
            return void compilation.errors.push(error);
          }
          return logger.log(`finished to process a pattern from '${pattern.from}' using '${pattern.context}' context to '${pattern.to}'`), 
          assets;
        }
        apply(compiler) {
          const pluginName = this.constructor.name;
          compiler.hooks.thisCompilation.tap(pluginName, (compilation => {
            const logger = compilation.getLogger("copy-webpack-plugin"), cache = compilation.getCache("CopyWebpackPlugin");
            compilation.hooks.processAssets.tapAsync({
              name: "copy-webpack-plugin",
              stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
            }, (async (unusedAssets, callback) => {
              logger.log("starting to add additional assets...");
              const assetMap = new Map, scheduledTasks = [];
              this.patterns.map(((item, index) => scheduledTasks.push((async () => {
                let assets;
                try {
                  assets = await CopyPlugin.runPattern(compiler, compilation, logger, cache, item, index);
                } catch (error) {
                  return void compilation.errors.push(error);
                }
                if (assets && assets.length > 0) {
                  if (item.transformAll) {
                    if (void 0 === item.to) return void compilation.errors.push(new Error(`Invalid "pattern.to" for the "pattern.from": "${item.from}" and "pattern.transformAll" function. The "to" option must be specified.`));
                    assets.sort(((a, b) => a.absoluteFilename > b.absoluteFilename ? 1 : a.absoluteFilename < b.absoluteFilename ? -1 : 0));
                    const mergedEtag = 1 === assets.length ? cache.getLazyHashedEtag(assets[0].source) : assets.reduce(((accumulator, asset, i) => accumulator = cache.mergeEtags(1 === i ? cache.getLazyHashedEtag(accumulator.source) : accumulator, cache.getLazyHashedEtag(asset.source)))), cacheKeys = `transformAll|${(0, 
                    _serializeJavascript.default)({
                      version: _packageVersion,
                      from: item.from,
                      to: item.to,
                      transformAll: item.transformAll
                    })}`, cacheItem = cache.getItemCache(cacheKeys, mergedEtag);
                    let transformedAsset = await cacheItem.getPromise();
                    if (!transformedAsset) {
                      transformedAsset = {
                        filename: item.to
                      };
                      try {
                        transformedAsset.data = await item.transformAll(assets.map((asset => ({
                          data: asset.source.buffer(),
                          sourceFilename: asset.sourceFilename,
                          absoluteFilename: asset.absoluteFilename
                        }))));
                      } catch (error) {
                        return void compilation.errors.push(error);
                      }
                      if (template.test(item.to)) {
                        const contentHash = CopyPlugin.getContentHash(compiler, compilation, transformedAsset.data), {path: interpolatedFilename, info: assetInfo} = compilation.getPathWithInfo((0, 
                        _normalizePath.default)(item.to), {
                          contentHash,
                          chunk: {
                            hash: contentHash,
                            contentHash
                          }
                        });
                        transformedAsset.filename = interpolatedFilename, transformedAsset.info = assetInfo;
                      }
                      const {RawSource} = compiler.webpack.sources;
                      transformedAsset.source = new RawSource(transformedAsset.data), transformedAsset.force = item.force, 
                      await cacheItem.storePromise(transformedAsset);
                    }
                    assets = [ transformedAsset ];
                  }
                  const priority = item.priority || 0;
                  assetMap.has(priority) || assetMap.set(priority, []), assetMap.get(priority).push(...assets);
                }
              })))), await (0, _utils.throttleAll)(this.options.concurrency || 100, scheduledTasks);
              [ ...assetMap.entries() ].sort(((a, b) => a[0] - b[0])).reduce(((acc, val) => acc.concat(val[1])), []).filter(Boolean).forEach((asset => {
                const {absoluteFilename, sourceFilename, filename, source, force} = asset;
                if (compilation.getAsset(filename)) {
                  if (force) {
                    const info = {
                      copied: !0,
                      sourceFilename
                    };
                    return logger.log(`force updating '${filename}' from '${absoluteFilename}' to compilation assets, because it already exists...`), 
                    compilation.updateAsset(filename, source, {
                      ...info,
                      ...asset.info
                    }), void logger.log(`force updated '${filename}' from '${absoluteFilename}' to compilation assets, because it already exists`);
                  }
                  return void logger.log(`skip adding '${filename}' from '${absoluteFilename}' to compilation assets, because it already exists`);
                }
                const info = {
                  copied: !0,
                  sourceFilename
                };
                logger.log(`writing '${filename}' from '${absoluteFilename}' to compilation assets...`), 
                compilation.emitAsset(filename, source, {
                  ...info,
                  ...asset.info
                }), logger.log(`written '${filename}' from '${absoluteFilename}' to compilation assets`);
              })), logger.log("finished to adding additional assets"), callback();
            })), compilation.hooks.statsPrinter && compilation.hooks.statsPrinter.tap(pluginName, (stats => {
              stats.hooks.print.for("asset.info.copied").tap("copy-webpack-plugin", ((copied, {green, formatFlag}) => copied ? green(formatFlag("copied")) : void 0));
            }));
          }));
        }
      }
      var _default = CopyPlugin;
      exports.default = _default;
    },
    330: module => {
      "use strict";
      module.exports = require("../vendor/fast-glob");
    },
    477: module => {
      "use strict";
      module.exports = require("../vendor/globby");
    },
    659: module => {
      "use strict";
      module.exports = require("../vendor/serialize-js");
    },
    842: module => {
      "use strict";
      module.exports = require("./schema-utils");
    },
    113: module => {
      "use strict";
      module.exports = require("crypto");
    },
    37: module => {
      "use strict";
      module.exports = require("os");
    },
    17: module => {
      "use strict";
      module.exports = require("path");
    },
    780: module => {
      "use strict";
      module.exports = JSON.parse('{"definitions":{"ObjectPattern":{"type":"object","additionalProperties":false,"properties":{"from":{"type":"string","description":"Glob or path from where we copy files.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#from","minLength":1},"to":{"anyOf":[{"type":"string"},{"instanceof":"Function"}],"description":"Output path.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#to"},"context":{"type":"string","description":"A path that determines how to interpret the \'from\' path.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#context"},"globOptions":{"type":"object","description":"Allows to configute the glob pattern matching library used by the plugin.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#globoptions"},"filter":{"instanceof":"Function","description":"Allows to filter copied assets.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#filter"},"transformAll":{"instanceof":"Function","description":"Allows you to modify the contents of multiple files and save the result to one file.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#transformall"},"toType":{"enum":["dir","file","template"],"description":"Determinate what is to option - directory, file or template.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#totype"},"force":{"type":"boolean","description":"Overwrites files already in \'compilation.assets\' (usually added by other plugins/loaders).","link":"https://github.com/webpack-contrib/copy-webpack-plugin#force"},"priority":{"type":"number","description":"Allows to specify the priority of copying files with the same destination name.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#priority"},"info":{"anyOf":[{"type":"object"},{"instanceof":"Function"}],"description":"Allows to add assets info.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#info"},"transform":{"description":"Allows to modify the file contents.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#transform","anyOf":[{"instanceof":"Function"},{"type":"object","additionalProperties":false,"properties":{"transformer":{"instanceof":"Function","description":"Allows to modify the file contents.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#transformer"},"cache":{"description":"Enables/disables and configure caching.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#cache","anyOf":[{"type":"boolean"},{"type":"object","additionalProperties":false,"properties":{"keys":{"anyOf":[{"type":"object","additionalProperties":true},{"instanceof":"Function"}]}}}]}}}]},"transformPath":{"instanceof":"Function"},"noErrorOnMissing":{"type":"boolean","description":"Doesn\'t generate an error on missing file(s).","link":"https://github.com/webpack-contrib/copy-webpack-plugin#noerroronmissing"}},"required":["from"]},"StringPattern":{"type":"string","minLength":1}},"type":"object","additionalProperties":false,"properties":{"patterns":{"type":"array","minItems":1,"items":{"anyOf":[{"$ref":"#/definitions/StringPattern"},{"$ref":"#/definitions/ObjectPattern"}]}},"options":{"type":"object","additionalProperties":false,"properties":{"concurrency":{"type":"number","description":"Limits the number of simultaneous requests to fs.","link":"https://github.com/webpack-contrib/copy-webpack-plugin#concurrency"}}}},"required":["patterns"]}');
    },
    966: module => {
      "use strict";
      module.exports = {
        i8: "9.1.0"
      };
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
  }(137);
  module.exports = __webpack_exports__;
})();