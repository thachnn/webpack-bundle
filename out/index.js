(() => {
  var __webpack_modules__ = {
    8185: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
      const fs = __webpack_require__(7147);
      exports.FILE_SYSTEM_ADAPTER = {
        lstat: fs.lstat,
        stat: fs.stat,
        lstatSync: fs.lstatSync,
        statSync: fs.statSync,
        readdir: fs.readdir,
        readdirSync: fs.readdirSync
      }, exports.createFileSystemAdapter = function(fsMethods) {
        return void 0 === fsMethods ? exports.FILE_SYSTEM_ADAPTER : Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
      };
    },
    1107: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
      const NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
      if (void 0 === NODE_PROCESS_VERSION_PARTS[0] || void 0 === NODE_PROCESS_VERSION_PARTS[1]) throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
      const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10), MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10), IS_MATCHED_BY_MAJOR = MAJOR_VERSION > 10, IS_MATCHED_BY_MAJOR_AND_MINOR = 10 === MAJOR_VERSION && MINOR_VERSION >= 10;
      exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
    },
    5923: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.Settings = exports.scandirSync = exports.scandir = void 0;
      const async = __webpack_require__(1411), sync = __webpack_require__(3953), settings_1 = __webpack_require__(6913);
      function getSettings(settingsOrOptions = {}) {
        return settingsOrOptions instanceof settings_1.default ? settingsOrOptions : new settings_1.default(settingsOrOptions);
      }
      exports.Settings = settings_1.default, exports.scandir = function(path, optionsOrSettingsOrCallback, callback) {
        "function" != typeof optionsOrSettingsOrCallback ? async.read(path, getSettings(optionsOrSettingsOrCallback), callback) : async.read(path, getSettings(), optionsOrSettingsOrCallback);
      }, exports.scandirSync = function(path, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return sync.read(path, settings);
      };
    },
    1411: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
      const fsStat = __webpack_require__(6203), rpl = __webpack_require__(4595), constants_1 = __webpack_require__(1107), utils = __webpack_require__(6582), common = __webpack_require__(4587);
      function readdirWithFileTypes(directory, settings, callback) {
        settings.fs.readdir(directory, {
          withFileTypes: !0
        }, ((readdirError, dirents) => {
          if (null !== readdirError) return void callFailureCallback(callback, readdirError);
          const entries = dirents.map((dirent => ({
            dirent,
            name: dirent.name,
            path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
          })));
          if (!settings.followSymbolicLinks) return void callSuccessCallback(callback, entries);
          const tasks = entries.map((entry => function(entry, settings) {
            return done => {
              entry.dirent.isSymbolicLink() ? settings.fs.stat(entry.path, ((statError, stats) => {
                if (null !== statError) return settings.throwErrorOnBrokenSymbolicLink ? void done(statError) : void done(null, entry);
                entry.dirent = utils.fs.createDirentFromStats(entry.name, stats), done(null, entry);
              })) : done(null, entry);
            };
          }(entry, settings)));
          rpl(tasks, ((rplError, rplEntries) => {
            null === rplError ? callSuccessCallback(callback, rplEntries) : callFailureCallback(callback, rplError);
          }));
        }));
      }
      function readdir(directory, settings, callback) {
        settings.fs.readdir(directory, ((readdirError, names) => {
          if (null !== readdirError) return void callFailureCallback(callback, readdirError);
          const tasks = names.map((name => {
            const path = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
            return done => {
              fsStat.stat(path, settings.fsStatSettings, ((error, stats) => {
                if (null !== error) return void done(error);
                const entry = {
                  name,
                  path,
                  dirent: utils.fs.createDirentFromStats(name, stats)
                };
                settings.stats && (entry.stats = stats), done(null, entry);
              }));
            };
          }));
          rpl(tasks, ((rplError, entries) => {
            null === rplError ? callSuccessCallback(callback, entries) : callFailureCallback(callback, rplError);
          }));
        }));
      }
      function callFailureCallback(callback, error) {
        callback(error);
      }
      function callSuccessCallback(callback, result) {
        callback(null, result);
      }
      exports.read = function(directory, settings, callback) {
        settings.stats || !constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES ? readdir(directory, settings, callback) : readdirWithFileTypes(directory, settings, callback);
      }, exports.readdirWithFileTypes = readdirWithFileTypes, exports.readdir = readdir;
    },
    4587: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.joinPathSegments = void 0, exports.joinPathSegments = function(a, b, separator) {
        return a.endsWith(separator) ? a + b : a + separator + b;
      };
    },
    3953: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
      const fsStat = __webpack_require__(6203), constants_1 = __webpack_require__(1107), utils = __webpack_require__(6582), common = __webpack_require__(4587);
      function readdirWithFileTypes(directory, settings) {
        return settings.fs.readdirSync(directory, {
          withFileTypes: !0
        }).map((dirent => {
          const entry = {
            dirent,
            name: dirent.name,
            path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
          };
          if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) try {
            const stats = settings.fs.statSync(entry.path);
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink) throw error;
          }
          return entry;
        }));
      }
      function readdir(directory, settings) {
        return settings.fs.readdirSync(directory).map((name => {
          const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator), stats = fsStat.statSync(entryPath, settings.fsStatSettings), entry = {
            name,
            path: entryPath,
            dirent: utils.fs.createDirentFromStats(name, stats)
          };
          return settings.stats && (entry.stats = stats), entry;
        }));
      }
      exports.read = function(directory, settings) {
        return !settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES ? readdirWithFileTypes(directory, settings) : readdir(directory, settings);
      }, exports.readdirWithFileTypes = readdirWithFileTypes, exports.readdir = readdir;
    },
    6913: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const path = __webpack_require__(1017), fsStat = __webpack_require__(6203), fs = __webpack_require__(8185);
      exports.default = class {
        constructor(_options = {}) {
          this._options = _options, this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, !1), 
          this.fs = fs.createFileSystemAdapter(this._options.fs), this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep), 
          this.stats = this._getValue(this._options.stats, !1), this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !0), 
          this.fsStatSettings = new fsStat.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
          });
        }
        _getValue(option, value) {
          return null != option ? option : value;
        }
      };
    },
    322: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createDirentFromStats = void 0;
      class DirentFromStats {
        constructor(name, stats) {
          this.name = name, this.isBlockDevice = stats.isBlockDevice.bind(stats), this.isCharacterDevice = stats.isCharacterDevice.bind(stats), 
          this.isDirectory = stats.isDirectory.bind(stats), this.isFIFO = stats.isFIFO.bind(stats), 
          this.isFile = stats.isFile.bind(stats), this.isSocket = stats.isSocket.bind(stats), 
          this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
        }
      }
      exports.createDirentFromStats = function(name, stats) {
        return new DirentFromStats(name, stats);
      };
    },
    6582: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.fs = void 0;
      const fs = __webpack_require__(322);
      exports.fs = fs;
    },
    8980: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
      const fs = __webpack_require__(7147);
      exports.FILE_SYSTEM_ADAPTER = {
        lstat: fs.lstat,
        stat: fs.stat,
        lstatSync: fs.lstatSync,
        statSync: fs.statSync
      }, exports.createFileSystemAdapter = function(fsMethods) {
        return void 0 === fsMethods ? exports.FILE_SYSTEM_ADAPTER : Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
      };
    },
    6203: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.statSync = exports.stat = exports.Settings = void 0;
      const async = __webpack_require__(2654), sync = __webpack_require__(8946), settings_1 = __webpack_require__(8328);
      function getSettings(settingsOrOptions = {}) {
        return settingsOrOptions instanceof settings_1.default ? settingsOrOptions : new settings_1.default(settingsOrOptions);
      }
      exports.Settings = settings_1.default, exports.stat = function(path, optionsOrSettingsOrCallback, callback) {
        "function" != typeof optionsOrSettingsOrCallback ? async.read(path, getSettings(optionsOrSettingsOrCallback), callback) : async.read(path, getSettings(), optionsOrSettingsOrCallback);
      }, exports.statSync = function(path, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return sync.read(path, settings);
      };
    },
    2654: (__unused_webpack_module, exports) => {
      "use strict";
      function callFailureCallback(callback, error) {
        callback(error);
      }
      function callSuccessCallback(callback, result) {
        callback(null, result);
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.read = void 0, exports.read = function(path, settings, callback) {
        settings.fs.lstat(path, ((lstatError, lstat) => {
          null === lstatError ? lstat.isSymbolicLink() && settings.followSymbolicLink ? settings.fs.stat(path, ((statError, stat) => {
            if (null !== statError) return settings.throwErrorOnBrokenSymbolicLink ? void callFailureCallback(callback, statError) : void callSuccessCallback(callback, lstat);
            settings.markSymbolicLink && (stat.isSymbolicLink = () => !0), callSuccessCallback(callback, stat);
          })) : callSuccessCallback(callback, lstat) : callFailureCallback(callback, lstatError);
        }));
      };
    },
    8946: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.read = void 0, exports.read = function(path, settings) {
        const lstat = settings.fs.lstatSync(path);
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) return lstat;
        try {
          const stat = settings.fs.statSync(path);
          return settings.markSymbolicLink && (stat.isSymbolicLink = () => !0), stat;
        } catch (error) {
          if (!settings.throwErrorOnBrokenSymbolicLink) return lstat;
          throw error;
        }
      };
    },
    8328: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const fs = __webpack_require__(8980);
      exports.default = class {
        constructor(_options = {}) {
          this._options = _options, this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, !0), 
          this.fs = fs.createFileSystemAdapter(this._options.fs), this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, !1), 
          this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !0);
        }
        _getValue(option, value) {
          return null != option ? option : value;
        }
      };
    },
    5439: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0;
      const async_1 = __webpack_require__(9346), stream_1 = __webpack_require__(215), sync_1 = __webpack_require__(4078), settings_1 = __webpack_require__(8690);
      function getSettings(settingsOrOptions = {}) {
        return settingsOrOptions instanceof settings_1.default ? settingsOrOptions : new settings_1.default(settingsOrOptions);
      }
      exports.Settings = settings_1.default, exports.walk = function(directory, optionsOrSettingsOrCallback, callback) {
        "function" != typeof optionsOrSettingsOrCallback ? new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback) : new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
      }, exports.walkSync = function(directory, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return new sync_1.default(directory, settings).read();
      }, exports.walkStream = function(directory, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return new stream_1.default(directory, settings).read();
      };
    },
    9346: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const async_1 = __webpack_require__(4714);
      exports.default = class {
        constructor(_root, _settings) {
          this._root = _root, this._settings = _settings, this._reader = new async_1.default(this._root, this._settings), 
          this._storage = [];
        }
        read(callback) {
          this._reader.onError((error => {
            !function(callback, error) {
              callback(error);
            }(callback, error);
          })), this._reader.onEntry((entry => {
            this._storage.push(entry);
          })), this._reader.onEnd((() => {
            !function(callback, entries) {
              callback(null, entries);
            }(callback, this._storage);
          })), this._reader.read();
        }
      };
    },
    215: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const stream_1 = __webpack_require__(2781), async_1 = __webpack_require__(4714);
      exports.default = class {
        constructor(_root, _settings) {
          this._root = _root, this._settings = _settings, this._reader = new async_1.default(this._root, this._settings), 
          this._stream = new stream_1.Readable({
            objectMode: !0,
            read: () => {},
            destroy: () => {
              this._reader.isDestroyed || this._reader.destroy();
            }
          });
        }
        read() {
          return this._reader.onError((error => {
            this._stream.emit("error", error);
          })), this._reader.onEntry((entry => {
            this._stream.push(entry);
          })), this._reader.onEnd((() => {
            this._stream.push(null);
          })), this._reader.read(), this._stream;
        }
      };
    },
    4078: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const sync_1 = __webpack_require__(9555);
      exports.default = class {
        constructor(_root, _settings) {
          this._root = _root, this._settings = _settings, this._reader = new sync_1.default(this._root, this._settings);
        }
        read() {
          return this._reader.read();
        }
      };
    },
    4714: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const events_1 = __webpack_require__(2361), fsScandir = __webpack_require__(5923), fastq = __webpack_require__(373), common = __webpack_require__(6865), reader_1 = __webpack_require__(5274);
      class AsyncReader extends reader_1.default {
        constructor(_root, _settings) {
          super(_root, _settings), this._settings = _settings, this._scandir = fsScandir.scandir, 
          this._emitter = new events_1.EventEmitter, this._queue = fastq(this._worker.bind(this), this._settings.concurrency), 
          this._isFatalError = !1, this._isDestroyed = !1, this._queue.drain = () => {
            this._isFatalError || this._emitter.emit("end");
          };
        }
        read() {
          return this._isFatalError = !1, this._isDestroyed = !1, setImmediate((() => {
            this._pushToQueue(this._root, this._settings.basePath);
          })), this._emitter;
        }
        get isDestroyed() {
          return this._isDestroyed;
        }
        destroy() {
          if (this._isDestroyed) throw new Error("The reader is already destroyed");
          this._isDestroyed = !0, this._queue.killAndDrain();
        }
        onEntry(callback) {
          this._emitter.on("entry", callback);
        }
        onError(callback) {
          this._emitter.once("error", callback);
        }
        onEnd(callback) {
          this._emitter.once("end", callback);
        }
        _pushToQueue(directory, base) {
          const queueItem = {
            directory,
            base
          };
          this._queue.push(queueItem, (error => {
            null !== error && this._handleError(error);
          }));
        }
        _worker(item, done) {
          this._scandir(item.directory, this._settings.fsScandirSettings, ((error, entries) => {
            if (null === error) {
              for (const entry of entries) this._handleEntry(entry, item.base);
              done(null, void 0);
            } else done(error, void 0);
          }));
        }
        _handleError(error) {
          !this._isDestroyed && common.isFatalError(this._settings, error) && (this._isFatalError = !0, 
          this._isDestroyed = !0, this._emitter.emit("error", error));
        }
        _handleEntry(entry, base) {
          if (this._isDestroyed || this._isFatalError) return;
          const fullpath = entry.path;
          void 0 !== base && (entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator)), 
          common.isAppliedFilter(this._settings.entryFilter, entry) && this._emitEntry(entry), 
          entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry) && this._pushToQueue(fullpath, void 0 === base ? void 0 : entry.path);
        }
        _emitEntry(entry) {
          this._emitter.emit("entry", entry);
        }
      }
      exports.default = AsyncReader;
    },
    6865: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.joinPathSegments = exports.replacePathSegmentSeparator = exports.isAppliedFilter = exports.isFatalError = void 0, 
      exports.isFatalError = function(settings, error) {
        return null === settings.errorFilter || !settings.errorFilter(error);
      }, exports.isAppliedFilter = function(filter, value) {
        return null === filter || filter(value);
      }, exports.replacePathSegmentSeparator = function(filepath, separator) {
        return filepath.split(/[/\\]/).join(separator);
      }, exports.joinPathSegments = function(a, b, separator) {
        return "" === a ? b : a.endsWith(separator) ? a + b : a + separator + b;
      };
    },
    5274: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const common = __webpack_require__(6865);
      exports.default = class {
        constructor(_root, _settings) {
          this._root = _root, this._settings = _settings, this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
        }
      };
    },
    9555: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const fsScandir = __webpack_require__(5923), common = __webpack_require__(6865), reader_1 = __webpack_require__(5274);
      class SyncReader extends reader_1.default {
        constructor() {
          super(...arguments), this._scandir = fsScandir.scandirSync, this._storage = [], 
          this._queue = new Set;
        }
        read() {
          return this._pushToQueue(this._root, this._settings.basePath), this._handleQueue(), 
          this._storage;
        }
        _pushToQueue(directory, base) {
          this._queue.add({
            directory,
            base
          });
        }
        _handleQueue() {
          for (const item of this._queue.values()) this._handleDirectory(item.directory, item.base);
        }
        _handleDirectory(directory, base) {
          try {
            const entries = this._scandir(directory, this._settings.fsScandirSettings);
            for (const entry of entries) this._handleEntry(entry, base);
          } catch (error) {
            this._handleError(error);
          }
        }
        _handleError(error) {
          if (common.isFatalError(this._settings, error)) throw error;
        }
        _handleEntry(entry, base) {
          const fullpath = entry.path;
          void 0 !== base && (entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator)), 
          common.isAppliedFilter(this._settings.entryFilter, entry) && this._pushToStorage(entry), 
          entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry) && this._pushToQueue(fullpath, void 0 === base ? void 0 : entry.path);
        }
        _pushToStorage(entry) {
          this._storage.push(entry);
        }
      }
      exports.default = SyncReader;
    },
    8690: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const path = __webpack_require__(1017), fsScandir = __webpack_require__(5923);
      exports.default = class {
        constructor(_options = {}) {
          this._options = _options, this.basePath = this._getValue(this._options.basePath, void 0), 
          this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY), 
          this.deepFilter = this._getValue(this._options.deepFilter, null), this.entryFilter = this._getValue(this._options.entryFilter, null), 
          this.errorFilter = this._getValue(this._options.errorFilter, null), this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path.sep), 
          this.fsScandirSettings = new fsScandir.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
          });
        }
        _getValue(option, value) {
          return null != option ? option : value;
        }
      };
    },
    6744: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const stringify = __webpack_require__(3349), compile = __webpack_require__(7529), expand = __webpack_require__(8050), parse = __webpack_require__(4339), braces = (input, options = {}) => {
        let output = [];
        if (Array.isArray(input)) for (let pattern of input) {
          let result = braces.create(pattern, options);
          Array.isArray(result) ? output.push(...result) : output.push(result);
        } else output = [].concat(braces.create(input, options));
        return options && !0 === options.expand && !0 === options.nodupes && (output = [ ...new Set(output) ]), 
        output;
      };
      braces.parse = (input, options = {}) => parse(input, options), braces.stringify = (input, options = {}) => stringify("string" == typeof input ? braces.parse(input, options) : input, options), 
      braces.compile = (input, options = {}) => ("string" == typeof input && (input = braces.parse(input, options)), 
      compile(input, options)), braces.expand = (input, options = {}) => {
        "string" == typeof input && (input = braces.parse(input, options));
        let result = expand(input, options);
        return !0 === options.noempty && (result = result.filter(Boolean)), !0 === options.nodupes && (result = [ ...new Set(result) ]), 
        result;
      }, braces.create = (input, options = {}) => "" === input || input.length < 3 ? [ input ] : !0 !== options.expand ? braces.compile(input, options) : braces.expand(input, options), 
      module.exports = braces;
    },
    7529: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fill = __webpack_require__(2664), utils = __webpack_require__(3083);
      module.exports = (ast, options = {}) => {
        let walk = (node, parent = {}) => {
          let invalidBlock = utils.isInvalidBrace(parent), invalidNode = !0 === node.invalid && !0 === options.escapeInvalid, invalid = !0 === invalidBlock || !0 === invalidNode, prefix = !0 === options.escapeInvalid ? "\\" : "", output = "";
          if (!0 === node.isOpen) return prefix + node.value;
          if (!0 === node.isClose) return prefix + node.value;
          if ("open" === node.type) return invalid ? prefix + node.value : "(";
          if ("close" === node.type) return invalid ? prefix + node.value : ")";
          if ("comma" === node.type) return "comma" === node.prev.type ? "" : invalid ? node.value : "|";
          if (node.value) return node.value;
          if (node.nodes && node.ranges > 0) {
            let args = utils.reduce(node.nodes), range = fill(...args, {
              ...options,
              wrap: !1,
              toRegex: !0
            });
            if (0 !== range.length) return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
          if (node.nodes) for (let child of node.nodes) output += walk(child, node);
          return output;
        };
        return walk(ast);
      };
    },
    6611: module => {
      "use strict";
      module.exports = {
        MAX_LENGTH: 65536,
        CHAR_0: "0",
        CHAR_9: "9",
        CHAR_UPPERCASE_A: "A",
        CHAR_LOWERCASE_A: "a",
        CHAR_UPPERCASE_Z: "Z",
        CHAR_LOWERCASE_Z: "z",
        CHAR_LEFT_PARENTHESES: "(",
        CHAR_RIGHT_PARENTHESES: ")",
        CHAR_ASTERISK: "*",
        CHAR_AMPERSAND: "&",
        CHAR_AT: "@",
        CHAR_BACKSLASH: "\\",
        CHAR_BACKTICK: "`",
        CHAR_CARRIAGE_RETURN: "\r",
        CHAR_CIRCUMFLEX_ACCENT: "^",
        CHAR_COLON: ":",
        CHAR_COMMA: ",",
        CHAR_DOLLAR: "$",
        CHAR_DOT: ".",
        CHAR_DOUBLE_QUOTE: '"',
        CHAR_EQUAL: "=",
        CHAR_EXCLAMATION_MARK: "!",
        CHAR_FORM_FEED: "\f",
        CHAR_FORWARD_SLASH: "/",
        CHAR_HASH: "#",
        CHAR_HYPHEN_MINUS: "-",
        CHAR_LEFT_ANGLE_BRACKET: "<",
        CHAR_LEFT_CURLY_BRACE: "{",
        CHAR_LEFT_SQUARE_BRACKET: "[",
        CHAR_LINE_FEED: "\n",
        CHAR_NO_BREAK_SPACE: " ",
        CHAR_PERCENT: "%",
        CHAR_PLUS: "+",
        CHAR_QUESTION_MARK: "?",
        CHAR_RIGHT_ANGLE_BRACKET: ">",
        CHAR_RIGHT_CURLY_BRACE: "}",
        CHAR_RIGHT_SQUARE_BRACKET: "]",
        CHAR_SEMICOLON: ";",
        CHAR_SINGLE_QUOTE: "'",
        CHAR_SPACE: " ",
        CHAR_TAB: "\t",
        CHAR_UNDERSCORE: "_",
        CHAR_VERTICAL_LINE: "|",
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\ufeff"
      };
    },
    8050: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fill = __webpack_require__(2664), stringify = __webpack_require__(3349), utils = __webpack_require__(3083), append = (queue = "", stash = "", enclose = !1) => {
        let result = [];
        if (queue = [].concat(queue), !(stash = [].concat(stash)).length) return queue;
        if (!queue.length) return enclose ? utils.flatten(stash).map((ele => `{${ele}}`)) : stash;
        for (let item of queue) if (Array.isArray(item)) for (let value of item) result.push(append(value, stash, enclose)); else for (let ele of stash) !0 === enclose && "string" == typeof ele && (ele = `{${ele}}`), 
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
        return utils.flatten(result);
      };
      module.exports = (ast, options = {}) => {
        let rangeLimit = void 0 === options.rangeLimit ? 1e3 : options.rangeLimit, walk = (node, parent = {}) => {
          node.queue = [];
          let p = parent, q = parent.queue;
          for (;"brace" !== p.type && "root" !== p.type && p.parent; ) p = p.parent, q = p.queue;
          if (node.invalid || node.dollar) return void q.push(append(q.pop(), stringify(node, options)));
          if ("brace" === node.type && !0 !== node.invalid && 2 === node.nodes.length) return void q.push(append(q.pop(), [ "{}" ]));
          if (node.nodes && node.ranges > 0) {
            let args = utils.reduce(node.nodes);
            if (utils.exceedsLimit(...args, options.step, rangeLimit)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
            let range = fill(...args, options);
            return 0 === range.length && (range = stringify(node, options)), q.push(append(q.pop(), range)), 
            void (node.nodes = []);
          }
          let enclose = utils.encloseBrace(node), queue = node.queue, block = node;
          for (;"brace" !== block.type && "root" !== block.type && block.parent; ) block = block.parent, 
          queue = block.queue;
          for (let i = 0; i < node.nodes.length; i++) {
            let child = node.nodes[i];
            "comma" !== child.type || "brace" !== node.type ? "close" !== child.type ? child.value && "open" !== child.type ? queue.push(append(queue.pop(), child.value)) : child.nodes && walk(child, node) : q.push(append(q.pop(), queue, enclose)) : (1 === i && queue.push(""), 
            queue.push(""));
          }
          return queue;
        };
        return utils.flatten(walk(ast));
      };
    },
    4339: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const stringify = __webpack_require__(3349), {MAX_LENGTH, CHAR_BACKSLASH, CHAR_BACKTICK, CHAR_COMMA, CHAR_DOT, CHAR_LEFT_PARENTHESES, CHAR_RIGHT_PARENTHESES, CHAR_LEFT_CURLY_BRACE, CHAR_RIGHT_CURLY_BRACE, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE} = __webpack_require__(6611);
      module.exports = (input, options = {}) => {
        if ("string" != typeof input) throw new TypeError("Expected a string");
        let opts = options || {}, max = "number" == typeof opts.maxLength ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
        if (input.length > max) throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
        let value, ast = {
          type: "root",
          input,
          nodes: []
        }, stack = [ ast ], block = ast, prev = ast, brackets = 0, length = input.length, index = 0, depth = 0;
        const advance = () => input[index++], push = node => {
          if ("text" === node.type && "dot" === prev.type && (prev.type = "text"), !prev || "text" !== prev.type || "text" !== node.type) return block.nodes.push(node), 
          node.parent = block, node.prev = prev, prev = node, node;
          prev.value += node.value;
        };
        for (push({
          type: "bos"
        }); index < length; ) if (block = stack[stack.length - 1], value = advance(), value !== CHAR_ZERO_WIDTH_NOBREAK_SPACE && value !== CHAR_NO_BREAK_SPACE) if (value !== CHAR_BACKSLASH) if (value !== CHAR_RIGHT_SQUARE_BRACKET) if (value !== CHAR_LEFT_SQUARE_BRACKET) if (value !== CHAR_LEFT_PARENTHESES) if (value !== CHAR_RIGHT_PARENTHESES) if (value !== CHAR_DOUBLE_QUOTE && value !== CHAR_SINGLE_QUOTE && value !== CHAR_BACKTICK) if (value !== CHAR_LEFT_CURLY_BRACE) if (value !== CHAR_RIGHT_CURLY_BRACE) if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            let open = block.nodes.shift();
            block.nodes = [ open, {
              type: "text",
              value: stringify(block)
            } ];
          }
          push({
            type: "comma",
            value
          }), block.commas++;
        } else if (value === CHAR_DOT && depth > 0 && 0 === block.commas) {
          let siblings = block.nodes;
          if (0 === depth || 0 === siblings.length) {
            push({
              type: "text",
              value
            });
            continue;
          }
          if ("dot" === prev.type) {
            if (block.range = [], prev.value += value, prev.type = "range", 3 !== block.nodes.length && 5 !== block.nodes.length) {
              block.invalid = !0, block.ranges = 0, prev.type = "text";
              continue;
            }
            block.ranges++, block.args = [];
            continue;
          }
          if ("range" === prev.type) {
            siblings.pop();
            let before = siblings[siblings.length - 1];
            before.value += prev.value + value, prev = before, block.ranges--;
            continue;
          }
          push({
            type: "dot",
            value
          });
        } else push({
          type: "text",
          value
        }); else {
          if ("brace" !== block.type) {
            push({
              type: "text",
              value
            });
            continue;
          }
          let type = "close";
          block = stack.pop(), block.close = !0, push({
            type,
            value
          }), depth--, block = stack[stack.length - 1];
        } else {
          depth++;
          let dollar = prev.value && "$" === prev.value.slice(-1) || !0 === block.dollar;
          block = push({
            type: "brace",
            open: !0,
            close: !1,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          }), stack.push(block), push({
            type: "open",
            value
          });
        } else {
          let next, open = value;
          for (!0 !== options.keepQuotes && (value = ""); index < length && (next = advance()); ) if (next !== CHAR_BACKSLASH) {
            if (next === open) {
              !0 === options.keepQuotes && (value += next);
              break;
            }
            value += next;
          } else value += next + advance();
          push({
            type: "text",
            value
          });
        } else {
          if ("paren" !== block.type) {
            push({
              type: "text",
              value
            });
            continue;
          }
          block = stack.pop(), push({
            type: "text",
            value
          }), block = stack[stack.length - 1];
        } else block = push({
          type: "paren",
          nodes: []
        }), stack.push(block), push({
          type: "text",
          value
        }); else {
          brackets++;
          let next;
          for (;index < length && (next = advance()); ) if (value += next, next !== CHAR_LEFT_SQUARE_BRACKET) if (next !== CHAR_BACKSLASH) {
            if (next === CHAR_RIGHT_SQUARE_BRACKET && (brackets--, 0 === brackets)) break;
          } else value += advance(); else brackets++;
          push({
            type: "text",
            value
          });
        } else push({
          type: "text",
          value: "\\" + value
        }); else push({
          type: "text",
          value: (options.keepEscaping ? value : "") + advance()
        });
        do {
          if (block = stack.pop(), "root" !== block.type) {
            block.nodes.forEach((node => {
              node.nodes || ("open" === node.type && (node.isOpen = !0), "close" === node.type && (node.isClose = !0), 
              node.nodes || (node.type = "text"), node.invalid = !0);
            }));
            let parent = stack[stack.length - 1], index = parent.nodes.indexOf(block);
            parent.nodes.splice(index, 1, ...block.nodes);
          }
        } while (stack.length > 0);
        return push({
          type: "eos"
        }), ast;
      };
    },
    3349: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const utils = __webpack_require__(3083);
      module.exports = (ast, options = {}) => {
        let stringify = (node, parent = {}) => {
          let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent), invalidNode = !0 === node.invalid && !0 === options.escapeInvalid, output = "";
          if (node.value) return (invalidBlock || invalidNode) && utils.isOpenOrClose(node) ? "\\" + node.value : node.value;
          if (node.value) return node.value;
          if (node.nodes) for (let child of node.nodes) output += stringify(child);
          return output;
        };
        return stringify(ast);
      };
    },
    3083: (__unused_webpack_module, exports) => {
      "use strict";
      exports.isInteger = num => "number" == typeof num ? Number.isInteger(num) : "string" == typeof num && "" !== num.trim() && Number.isInteger(Number(num)), 
      exports.find = (node, type) => node.nodes.find((node => node.type === type)), exports.exceedsLimit = (min, max, step = 1, limit) => !1 !== limit && (!(!exports.isInteger(min) || !exports.isInteger(max)) && (Number(max) - Number(min)) / Number(step) >= limit), 
      exports.escapeNode = (block, n = 0, type) => {
        let node = block.nodes[n];
        node && (type && node.type === type || "open" === node.type || "close" === node.type) && !0 !== node.escaped && (node.value = "\\" + node.value, 
        node.escaped = !0);
      }, exports.encloseBrace = node => "brace" === node.type && (node.commas >> 0 + node.ranges >> 0 == 0 && (node.invalid = !0, 
      !0)), exports.isInvalidBrace = block => "brace" === block.type && (!(!0 !== block.invalid && !block.dollar) || (block.commas >> 0 + block.ranges >> 0 == 0 || !0 !== block.open || !0 !== block.close) && (block.invalid = !0, 
      !0)), exports.isOpenOrClose = node => "open" === node.type || "close" === node.type || (!0 === node.open || !0 === node.close), 
      exports.reduce = nodes => nodes.reduce(((acc, node) => ("text" === node.type && acc.push(node.value), 
      "range" === node.type && (node.type = "text"), acc)), []), exports.flatten = (...args) => {
        const result = [], flat = arr => {
          for (let i = 0; i < arr.length; i++) {
            let ele = arr[i];
            Array.isArray(ele) ? flat(ele, result) : void 0 !== ele && result.push(ele);
          }
          return result;
        };
        return flat(args), result;
      };
    },
    3294: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const taskManager = __webpack_require__(5135), patternManager = __webpack_require__(7888), async_1 = __webpack_require__(3456), stream_1 = __webpack_require__(3403), sync_1 = __webpack_require__(4113), settings_1 = __webpack_require__(3862), utils = __webpack_require__(4426);
      async function FastGlob(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, async_1.default, options), result = await Promise.all(works);
        return utils.array.flatten(result);
      }
      function getWorks(source, _Provider, options) {
        const patterns = patternManager.transform([].concat(source)), settings = new settings_1.default(options), tasks = taskManager.generate(patterns, settings), provider = new _Provider(settings);
        return tasks.map(provider.read, provider);
      }
      function assertPatternsInput(input) {
        if (![].concat(input).every((item => utils.string.isString(item) && !utils.string.isEmpty(item)))) throw new TypeError("Patterns must be a string (non empty) or an array of strings");
      }
      !function(FastGlob) {
        FastGlob.sync = function(source, options) {
          assertPatternsInput(source);
          const works = getWorks(source, sync_1.default, options);
          return utils.array.flatten(works);
        }, FastGlob.stream = function(source, options) {
          assertPatternsInput(source);
          const works = getWorks(source, stream_1.default, options);
          return utils.stream.merge(works);
        }, FastGlob.generateTasks = function(source, options) {
          assertPatternsInput(source);
          const patterns = patternManager.transform([].concat(source)), settings = new settings_1.default(options);
          return taskManager.generate(patterns, settings);
        }, FastGlob.isDynamicPattern = function(source, options) {
          assertPatternsInput(source);
          const settings = new settings_1.default(options);
          return utils.pattern.isDynamicPattern(source, settings);
        }, FastGlob.escapePath = function(source) {
          return assertPatternsInput(source), utils.path.escape(source);
        };
      }(FastGlob || (FastGlob = {})), module.exports = FastGlob;
    },
    7888: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.removeDuplicateSlashes = exports.transform = void 0;
      const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
      function removeDuplicateSlashes(pattern) {
        return pattern.replace(DOUBLE_SLASH_RE, "/");
      }
      exports.transform = function(patterns) {
        return patterns.map((pattern => removeDuplicateSlashes(pattern)));
      }, exports.removeDuplicateSlashes = removeDuplicateSlashes;
    },
    5135: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
      const utils = __webpack_require__(4426);
      function convertPatternsToTasks(positive, negative, dynamic) {
        const tasks = [], patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive), patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive), outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory), insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
        return tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic)), 
        "." in insideCurrentDirectoryGroup ? tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic)) : tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic)), 
        tasks;
      }
      function getPositivePatterns(patterns) {
        return utils.pattern.getPositivePatterns(patterns);
      }
      function getNegativePatternsAsPositive(patterns, ignore) {
        return utils.pattern.getNegativePatterns(patterns).concat(ignore).map(utils.pattern.convertToPositivePattern);
      }
      function groupPatternsByBaseDirectory(patterns) {
        return patterns.reduce(((collection, pattern) => {
          const base = utils.pattern.getBaseDirectory(pattern);
          return base in collection ? collection[base].push(pattern) : collection[base] = [ pattern ], 
          collection;
        }), {});
      }
      function convertPatternGroupsToTasks(positive, negative, dynamic) {
        return Object.keys(positive).map((base => convertPatternGroupToTask(base, positive[base], negative, dynamic)));
      }
      function convertPatternGroupToTask(base, positive, negative, dynamic) {
        return {
          dynamic,
          positive,
          negative,
          base,
          patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
        };
      }
      exports.generate = function(patterns, settings) {
        const positivePatterns = getPositivePatterns(patterns), negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore), staticPatterns = positivePatterns.filter((pattern => utils.pattern.isStaticPattern(pattern, settings))), dynamicPatterns = positivePatterns.filter((pattern => utils.pattern.isDynamicPattern(pattern, settings))), staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, !1), dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, !0);
        return staticTasks.concat(dynamicTasks);
      }, exports.convertPatternsToTasks = convertPatternsToTasks, exports.getPositivePatterns = getPositivePatterns, 
      exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive, exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory, 
      exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks, exports.convertPatternGroupToTask = convertPatternGroupToTask;
    },
    3456: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const stream_1 = __webpack_require__(9086), provider_1 = __webpack_require__(466);
      class ProviderAsync extends provider_1.default {
        constructor() {
          super(...arguments), this._reader = new stream_1.default(this._settings);
        }
        read(task) {
          const root = this._getRootDirectory(task), options = this._getReaderOptions(task), entries = [];
          return new Promise(((resolve, reject) => {
            const stream = this.api(root, task, options);
            stream.once("error", reject), stream.on("data", (entry => entries.push(options.transform(entry)))), 
            stream.once("end", (() => resolve(entries)));
          }));
        }
        api(root, task, options) {
          return task.dynamic ? this._reader.dynamic(root, options) : this._reader.static(task.patterns, options);
        }
      }
      exports.default = ProviderAsync;
    },
    346: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const utils = __webpack_require__(4426), partial_1 = __webpack_require__(7769);
      exports.default = class {
        constructor(_settings, _micromatchOptions) {
          this._settings = _settings, this._micromatchOptions = _micromatchOptions;
        }
        getFilter(basePath, positive, negative) {
          const matcher = this._getMatcher(positive), negativeRe = this._getNegativePatternsRe(negative);
          return entry => this._filter(basePath, entry, matcher, negativeRe);
        }
        _getMatcher(patterns) {
          return new partial_1.default(patterns, this._settings, this._micromatchOptions);
        }
        _getNegativePatternsRe(patterns) {
          const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
          return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
        }
        _filter(basePath, entry, matcher, negativeRe) {
          if (this._isSkippedByDeep(basePath, entry.path)) return !1;
          if (this._isSkippedSymbolicLink(entry)) return !1;
          const filepath = utils.path.removeLeadingDotSegment(entry.path);
          return !this._isSkippedByPositivePatterns(filepath, matcher) && this._isSkippedByNegativePatterns(filepath, negativeRe);
        }
        _isSkippedByDeep(basePath, entryPath) {
          return this._settings.deep !== 1 / 0 && this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
        }
        _getEntryLevel(basePath, entryPath) {
          const entryPathDepth = entryPath.split("/").length;
          if ("" === basePath) return entryPathDepth;
          return entryPathDepth - basePath.split("/").length;
        }
        _isSkippedSymbolicLink(entry) {
          return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
        }
        _isSkippedByPositivePatterns(entryPath, matcher) {
          return !this._settings.baseNameMatch && !matcher.match(entryPath);
        }
        _isSkippedByNegativePatterns(entryPath, patternsRe) {
          return !utils.pattern.matchAny(entryPath, patternsRe);
        }
      };
    },
    7026: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const utils = __webpack_require__(4426);
      exports.default = class {
        constructor(_settings, _micromatchOptions) {
          this._settings = _settings, this._micromatchOptions = _micromatchOptions, this.index = new Map;
        }
        getFilter(positive, negative) {
          const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions), negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions);
          return entry => this._filter(entry, positiveRe, negativeRe);
        }
        _filter(entry, positiveRe, negativeRe) {
          if (this._settings.unique && this._isDuplicateEntry(entry)) return !1;
          if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) return !1;
          if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) return !1;
          const filepath = this._settings.baseNameMatch ? entry.name : entry.path, isMatched = this._isMatchToPatterns(filepath, positiveRe) && !this._isMatchToPatterns(entry.path, negativeRe);
          return this._settings.unique && isMatched && this._createIndexRecord(entry), isMatched;
        }
        _isDuplicateEntry(entry) {
          return this.index.has(entry.path);
        }
        _createIndexRecord(entry) {
          this.index.set(entry.path, void 0);
        }
        _onlyFileFilter(entry) {
          return this._settings.onlyFiles && !entry.dirent.isFile();
        }
        _onlyDirectoryFilter(entry) {
          return this._settings.onlyDirectories && !entry.dirent.isDirectory();
        }
        _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
          if (!this._settings.absolute) return !1;
          const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath);
          return utils.pattern.matchAny(fullpath, patternsRe);
        }
        _isMatchToPatterns(entryPath, patternsRe) {
          const filepath = utils.path.removeLeadingDotSegment(entryPath);
          return utils.pattern.matchAny(filepath, patternsRe) || utils.pattern.matchAny(filepath + "/", patternsRe);
        }
      };
    },
    3046: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const utils = __webpack_require__(4426);
      exports.default = class {
        constructor(_settings) {
          this._settings = _settings;
        }
        getFilter() {
          return error => this._isNonFatalError(error);
        }
        _isNonFatalError(error) {
          return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
        }
      };
    },
    92: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const utils = __webpack_require__(4426);
      exports.default = class {
        constructor(_patterns, _settings, _micromatchOptions) {
          this._patterns = _patterns, this._settings = _settings, this._micromatchOptions = _micromatchOptions, 
          this._storage = [], this._fillStorage();
        }
        _fillStorage() {
          const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns);
          for (const pattern of patterns) {
            const segments = this._getPatternSegments(pattern), sections = this._splitSegmentsIntoSections(segments);
            this._storage.push({
              complete: sections.length <= 1,
              pattern,
              segments,
              sections
            });
          }
        }
        _getPatternSegments(pattern) {
          return utils.pattern.getPatternParts(pattern, this._micromatchOptions).map((part => utils.pattern.isDynamicPattern(part, this._settings) ? {
            dynamic: !0,
            pattern: part,
            patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
          } : {
            dynamic: !1,
            pattern: part
          }));
        }
        _splitSegmentsIntoSections(segments) {
          return utils.array.splitWhen(segments, (segment => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern)));
        }
      };
    },
    7769: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const matcher_1 = __webpack_require__(92);
      class PartialMatcher extends matcher_1.default {
        match(filepath) {
          const parts = filepath.split("/"), levels = parts.length, patterns = this._storage.filter((info => !info.complete || info.segments.length > levels));
          for (const pattern of patterns) {
            const section = pattern.sections[0];
            if (!pattern.complete && levels > section.length) return !0;
            if (parts.every(((part, index) => {
              const segment = pattern.segments[index];
              return !(!segment.dynamic || !segment.patternRe.test(part)) || !segment.dynamic && segment.pattern === part;
            }))) return !0;
          }
          return !1;
        }
      }
      exports.default = PartialMatcher;
    },
    466: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const path = __webpack_require__(1017), deep_1 = __webpack_require__(346), entry_1 = __webpack_require__(7026), error_1 = __webpack_require__(3046), entry_2 = __webpack_require__(218);
      exports.default = class {
        constructor(_settings) {
          this._settings = _settings, this.errorFilter = new error_1.default(this._settings), 
          this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions()), 
          this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions()), 
          this.entryTransformer = new entry_2.default(this._settings);
        }
        _getRootDirectory(task) {
          return path.resolve(this._settings.cwd, task.base);
        }
        _getReaderOptions(task) {
          const basePath = "." === task.base ? "" : task.base;
          return {
            basePath,
            pathSegmentSeparator: "/",
            concurrency: this._settings.concurrency,
            deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
            entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
            errorFilter: this.errorFilter.getFilter(),
            followSymbolicLinks: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            stats: this._settings.stats,
            throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
            transform: this.entryTransformer.getTransformer()
          };
        }
        _getMicromatchOptions() {
          return {
            dot: this._settings.dot,
            matchBase: this._settings.baseNameMatch,
            nobrace: !this._settings.braceExpansion,
            nocase: !this._settings.caseSensitiveMatch,
            noext: !this._settings.extglob,
            noglobstar: !this._settings.globstar,
            posix: !0,
            strictSlashes: !1
          };
        }
      };
    },
    3403: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const stream_1 = __webpack_require__(2781), stream_2 = __webpack_require__(9086), provider_1 = __webpack_require__(466);
      class ProviderStream extends provider_1.default {
        constructor() {
          super(...arguments), this._reader = new stream_2.default(this._settings);
        }
        read(task) {
          const root = this._getRootDirectory(task), options = this._getReaderOptions(task), source = this.api(root, task, options), destination = new stream_1.Readable({
            objectMode: !0,
            read: () => {}
          });
          return source.once("error", (error => destination.emit("error", error))).on("data", (entry => destination.emit("data", options.transform(entry)))).once("end", (() => destination.emit("end"))), 
          destination.once("close", (() => source.destroy())), destination;
        }
        api(root, task, options) {
          return task.dynamic ? this._reader.dynamic(root, options) : this._reader.static(task.patterns, options);
        }
      }
      exports.default = ProviderStream;
    },
    4113: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const sync_1 = __webpack_require__(112), provider_1 = __webpack_require__(466);
      class ProviderSync extends provider_1.default {
        constructor() {
          super(...arguments), this._reader = new sync_1.default(this._settings);
        }
        read(task) {
          const root = this._getRootDirectory(task), options = this._getReaderOptions(task);
          return this.api(root, task, options).map(options.transform);
        }
        api(root, task, options) {
          return task.dynamic ? this._reader.dynamic(root, options) : this._reader.static(task.patterns, options);
        }
      }
      exports.default = ProviderSync;
    },
    218: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const utils = __webpack_require__(4426);
      exports.default = class {
        constructor(_settings) {
          this._settings = _settings;
        }
        getTransformer() {
          return entry => this._transform(entry);
        }
        _transform(entry) {
          let filepath = entry.path;
          return this._settings.absolute && (filepath = utils.path.makeAbsolute(this._settings.cwd, filepath), 
          filepath = utils.path.unixify(filepath)), this._settings.markDirectories && entry.dirent.isDirectory() && (filepath += "/"), 
          this._settings.objectMode ? Object.assign(Object.assign({}, entry), {
            path: filepath
          }) : filepath;
        }
      };
    },
    2117: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const path = __webpack_require__(1017), fsStat = __webpack_require__(6203), utils = __webpack_require__(4426);
      exports.default = class {
        constructor(_settings) {
          this._settings = _settings, this._fsStatSettings = new fsStat.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
          });
        }
        _getFullEntryPath(filepath) {
          return path.resolve(this._settings.cwd, filepath);
        }
        _makeEntry(stats, pattern) {
          const entry = {
            name: pattern,
            path: pattern,
            dirent: utils.fs.createDirentFromStats(pattern, stats)
          };
          return this._settings.stats && (entry.stats = stats), entry;
        }
        _isFatalError(error) {
          return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
        }
      };
    },
    9086: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const stream_1 = __webpack_require__(2781), fsStat = __webpack_require__(6203), fsWalk = __webpack_require__(5439), reader_1 = __webpack_require__(2117);
      class ReaderStream extends reader_1.default {
        constructor() {
          super(...arguments), this._walkStream = fsWalk.walkStream, this._stat = fsStat.stat;
        }
        dynamic(root, options) {
          return this._walkStream(root, options);
        }
        static(patterns, options) {
          const filepaths = patterns.map(this._getFullEntryPath, this), stream = new stream_1.PassThrough({
            objectMode: !0
          });
          stream._write = (index, _enc, done) => this._getEntry(filepaths[index], patterns[index], options).then((entry => {
            null !== entry && options.entryFilter(entry) && stream.push(entry), index === filepaths.length - 1 && stream.end(), 
            done();
          })).catch(done);
          for (let i = 0; i < filepaths.length; i++) stream.write(i);
          return stream;
        }
        _getEntry(filepath, pattern, options) {
          return this._getStat(filepath).then((stats => this._makeEntry(stats, pattern))).catch((error => {
            if (options.errorFilter(error)) return null;
            throw error;
          }));
        }
        _getStat(filepath) {
          return new Promise(((resolve, reject) => {
            this._stat(filepath, this._fsStatSettings, ((error, stats) => null === error ? resolve(stats) : reject(error)));
          }));
        }
      }
      exports.default = ReaderStream;
    },
    112: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const fsStat = __webpack_require__(6203), fsWalk = __webpack_require__(5439), reader_1 = __webpack_require__(2117);
      class ReaderSync extends reader_1.default {
        constructor() {
          super(...arguments), this._walkSync = fsWalk.walkSync, this._statSync = fsStat.statSync;
        }
        dynamic(root, options) {
          return this._walkSync(root, options);
        }
        static(patterns, options) {
          const entries = [];
          for (const pattern of patterns) {
            const filepath = this._getFullEntryPath(pattern), entry = this._getEntry(filepath, pattern, options);
            null !== entry && options.entryFilter(entry) && entries.push(entry);
          }
          return entries;
        }
        _getEntry(filepath, pattern, options) {
          try {
            const stats = this._getStat(filepath);
            return this._makeEntry(stats, pattern);
          } catch (error) {
            if (options.errorFilter(error)) return null;
            throw error;
          }
        }
        _getStat(filepath) {
          return this._statSync(filepath, this._fsStatSettings);
        }
      }
      exports.default = ReaderSync;
    },
    3862: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
      const fs = __webpack_require__(7147), os = __webpack_require__(2037), CPU_COUNT = Math.max(os.cpus().length, 1);
      exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
        lstat: fs.lstat,
        lstatSync: fs.lstatSync,
        stat: fs.stat,
        statSync: fs.statSync,
        readdir: fs.readdir,
        readdirSync: fs.readdirSync
      };
      exports.default = class {
        constructor(_options = {}) {
          this._options = _options, this.absolute = this._getValue(this._options.absolute, !1), 
          this.baseNameMatch = this._getValue(this._options.baseNameMatch, !1), this.braceExpansion = this._getValue(this._options.braceExpansion, !0), 
          this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, !0), 
          this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT), this.cwd = this._getValue(this._options.cwd, process.cwd()), 
          this.deep = this._getValue(this._options.deep, 1 / 0), this.dot = this._getValue(this._options.dot, !1), 
          this.extglob = this._getValue(this._options.extglob, !0), this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, !0), 
          this.fs = this._getFileSystemMethods(this._options.fs), this.globstar = this._getValue(this._options.globstar, !0), 
          this.ignore = this._getValue(this._options.ignore, []), this.markDirectories = this._getValue(this._options.markDirectories, !1), 
          this.objectMode = this._getValue(this._options.objectMode, !1), this.onlyDirectories = this._getValue(this._options.onlyDirectories, !1), 
          this.onlyFiles = this._getValue(this._options.onlyFiles, !0), this.stats = this._getValue(this._options.stats, !1), 
          this.suppressErrors = this._getValue(this._options.suppressErrors, !1), this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !1), 
          this.unique = this._getValue(this._options.unique, !0), this.onlyDirectories && (this.onlyFiles = !1), 
          this.stats && (this.objectMode = !0);
        }
        _getValue(option, value) {
          return void 0 === option ? value : option;
        }
        _getFileSystemMethods(methods = {}) {
          return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
        }
      };
    },
    4825: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.splitWhen = exports.flatten = void 0, exports.flatten = function(items) {
        return items.reduce(((collection, item) => [].concat(collection, item)), []);
      }, exports.splitWhen = function(items, predicate) {
        const result = [ [] ];
        let groupIndex = 0;
        for (const item of items) predicate(item) ? (groupIndex++, result[groupIndex] = []) : result[groupIndex].push(item);
        return result;
      };
    },
    7843: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isEnoentCodeError = void 0, exports.isEnoentCodeError = function(error) {
        return "ENOENT" === error.code;
      };
    },
    6334: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createDirentFromStats = void 0;
      class DirentFromStats {
        constructor(name, stats) {
          this.name = name, this.isBlockDevice = stats.isBlockDevice.bind(stats), this.isCharacterDevice = stats.isCharacterDevice.bind(stats), 
          this.isDirectory = stats.isDirectory.bind(stats), this.isFIFO = stats.isFIFO.bind(stats), 
          this.isFile = stats.isFile.bind(stats), this.isSocket = stats.isSocket.bind(stats), 
          this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
        }
      }
      exports.createDirentFromStats = function(name, stats) {
        return new DirentFromStats(name, stats);
      };
    },
    4426: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
      const array = __webpack_require__(4825);
      exports.array = array;
      const errno = __webpack_require__(7843);
      exports.errno = errno;
      const fs = __webpack_require__(6334);
      exports.fs = fs;
      const path = __webpack_require__(2003);
      exports.path = path;
      const pattern = __webpack_require__(57);
      exports.pattern = pattern;
      const stream = __webpack_require__(6242);
      exports.stream = stream;
      const string = __webpack_require__(3021);
      exports.string = string;
    },
    2003: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.removeLeadingDotSegment = exports.escape = exports.makeAbsolute = exports.unixify = void 0;
      const path = __webpack_require__(1017), UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
      exports.unixify = function(filepath) {
        return filepath.replace(/\\/g, "/");
      }, exports.makeAbsolute = function(cwd, filepath) {
        return path.resolve(cwd, filepath);
      }, exports.escape = function(pattern) {
        return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
      }, exports.removeLeadingDotSegment = function(entry) {
        if ("." === entry.charAt(0)) {
          const secondCharactery = entry.charAt(1);
          if ("/" === secondCharactery || "\\" === secondCharactery) return entry.slice(2);
        }
        return entry;
      };
    },
    57: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.isPatternRelatedToParentDirectory = exports.getPatternsOutsideCurrentDirectory = exports.getPatternsInsideCurrentDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
      const path = __webpack_require__(1017), globParent = __webpack_require__(7647), micromatch = __webpack_require__(850), COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/, REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/, REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/, GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/, BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
      function isStaticPattern(pattern, options = {}) {
        return !isDynamicPattern(pattern, options);
      }
      function isDynamicPattern(pattern, options = {}) {
        return "" !== pattern && (!(!1 !== options.caseSensitiveMatch && !pattern.includes("\\")) || (!!(COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) || (!(!1 === options.extglob || !GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) || !(!1 === options.braceExpansion || !function(pattern) {
          const openingBraceIndex = pattern.indexOf("{");
          if (-1 === openingBraceIndex) return !1;
          const closingBraceIndex = pattern.indexOf("}", openingBraceIndex + 1);
          if (-1 === closingBraceIndex) return !1;
          const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
          return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
        }(pattern)))));
      }
      function isNegativePattern(pattern) {
        return pattern.startsWith("!") && "(" !== pattern[1];
      }
      function isPositivePattern(pattern) {
        return !isNegativePattern(pattern);
      }
      function isPatternRelatedToParentDirectory(pattern) {
        return pattern.startsWith("..") || pattern.startsWith("./..");
      }
      function endsWithSlashGlobStar(pattern) {
        return pattern.endsWith("/**");
      }
      function expandBraceExpansion(pattern) {
        return micromatch.braces(pattern, {
          expand: !0,
          nodupes: !0
        });
      }
      function makeRe(pattern, options) {
        return micromatch.makeRe(pattern, options);
      }
      exports.isStaticPattern = isStaticPattern, exports.isDynamicPattern = isDynamicPattern, 
      exports.convertToPositivePattern = function(pattern) {
        return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
      }, exports.convertToNegativePattern = function(pattern) {
        return "!" + pattern;
      }, exports.isNegativePattern = isNegativePattern, exports.isPositivePattern = isPositivePattern, 
      exports.getNegativePatterns = function(patterns) {
        return patterns.filter(isNegativePattern);
      }, exports.getPositivePatterns = function(patterns) {
        return patterns.filter(isPositivePattern);
      }, exports.getPatternsInsideCurrentDirectory = function(patterns) {
        return patterns.filter((pattern => !isPatternRelatedToParentDirectory(pattern)));
      }, exports.getPatternsOutsideCurrentDirectory = function(patterns) {
        return patterns.filter(isPatternRelatedToParentDirectory);
      }, exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory, 
      exports.getBaseDirectory = function(pattern) {
        return globParent(pattern, {
          flipBackslashes: !1
        });
      }, exports.hasGlobStar = function(pattern) {
        return pattern.includes("**");
      }, exports.endsWithSlashGlobStar = endsWithSlashGlobStar, exports.isAffectDepthOfReadingPattern = function(pattern) {
        const basename = path.basename(pattern);
        return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
      }, exports.expandPatternsWithBraceExpansion = function(patterns) {
        return patterns.reduce(((collection, pattern) => collection.concat(expandBraceExpansion(pattern))), []);
      }, exports.expandBraceExpansion = expandBraceExpansion, exports.getPatternParts = function(pattern, options) {
        let {parts} = micromatch.scan(pattern, Object.assign(Object.assign({}, options), {
          parts: !0
        }));
        return 0 === parts.length && (parts = [ pattern ]), parts[0].startsWith("/") && (parts[0] = parts[0].slice(1), 
        parts.unshift("")), parts;
      }, exports.makeRe = makeRe, exports.convertPatternsToRe = function(patterns, options) {
        return patterns.map((pattern => makeRe(pattern, options)));
      }, exports.matchAny = function(entry, patternsRe) {
        return patternsRe.some((patternRe => patternRe.test(entry)));
      };
    },
    6242: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.merge = void 0;
      const merge2 = __webpack_require__(155);
      function propagateCloseEventToSources(streams) {
        streams.forEach((stream => stream.emit("close")));
      }
      exports.merge = function(streams) {
        const mergedStream = merge2(streams);
        return streams.forEach((stream => {
          stream.once("error", (error => mergedStream.emit("error", error)));
        })), mergedStream.once("close", (() => propagateCloseEventToSources(streams))), 
        mergedStream.once("end", (() => propagateCloseEventToSources(streams))), mergedStream;
      };
    },
    3021: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isEmpty = exports.isString = void 0, exports.isString = function(input) {
        return "string" == typeof input;
      }, exports.isEmpty = function(input) {
        return "" === input;
      };
    },
    373: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var reusify = __webpack_require__(3650);
      function fastqueue(context, worker, concurrency) {
        if ("function" == typeof context && (concurrency = worker, worker = context, context = null), 
        concurrency < 1) throw new Error("fastqueue concurrency must be greater than 1");
        var cache = reusify(Task), queueHead = null, queueTail = null, _running = 0, errorHandler = null, self = {
          push: function(value, done) {
            var current = cache.get();
            current.context = context, current.release = release, current.value = value, current.callback = done || noop, 
            current.errorHandler = errorHandler, _running === self.concurrency || self.paused ? queueTail ? (queueTail.next = current, 
            queueTail = current) : (queueHead = current, queueTail = current, self.saturated()) : (_running++, 
            worker.call(context, current.value, current.worked));
          },
          drain: noop,
          saturated: noop,
          pause: function() {
            self.paused = !0;
          },
          paused: !1,
          concurrency,
          running: function() {
            return _running;
          },
          resume: function() {
            if (!self.paused) return;
            self.paused = !1;
            for (var i = 0; i < self.concurrency; i++) _running++, release();
          },
          idle: function() {
            return 0 === _running && 0 === self.length();
          },
          length: function() {
            var current = queueHead, counter = 0;
            for (;current; ) current = current.next, counter++;
            return counter;
          },
          getQueue: function() {
            var current = queueHead, tasks = [];
            for (;current; ) tasks.push(current.value), current = current.next;
            return tasks;
          },
          unshift: function(value, done) {
            var current = cache.get();
            current.context = context, current.release = release, current.value = value, current.callback = done || noop, 
            _running === self.concurrency || self.paused ? queueHead ? (current.next = queueHead, 
            queueHead = current) : (queueHead = current, queueTail = current, self.saturated()) : (_running++, 
            worker.call(context, current.value, current.worked));
          },
          empty: noop,
          kill: function() {
            queueHead = null, queueTail = null, self.drain = noop;
          },
          killAndDrain: function() {
            queueHead = null, queueTail = null, self.drain(), self.drain = noop;
          },
          error: function(handler) {
            errorHandler = handler;
          }
        };
        return self;
        function release(holder) {
          holder && cache.release(holder);
          var next = queueHead;
          next ? self.paused ? _running-- : (queueTail === queueHead && (queueTail = null), 
          queueHead = next.next, next.next = null, worker.call(context, next.value, next.worked), 
          null === queueTail && self.empty()) : 0 == --_running && self.drain();
        }
      }
      function noop() {}
      function Task() {
        this.value = null, this.callback = noop, this.next = null, this.release = noop, 
        this.context = null, this.errorHandler = null;
        var self = this;
        this.worked = function(err, result) {
          var callback = self.callback, errorHandler = self.errorHandler, val = self.value;
          self.value = null, self.callback = noop, self.errorHandler && errorHandler(err, val), 
          callback.call(self.context, err, result), self.release(self);
        };
      }
      module.exports = fastqueue, module.exports.promise = function(context, worker, concurrency) {
        "function" == typeof context && (concurrency = worker, worker = context, context = null);
        var queue = fastqueue(context, (function(arg, cb) {
          worker.call(this, arg).then((function(res) {
            cb(null, res);
          }), cb);
        }), concurrency), pushCb = queue.push, unshiftCb = queue.unshift;
        return queue.push = function(value) {
          var p = new Promise((function(resolve, reject) {
            pushCb(value, (function(err, result) {
              err ? reject(err) : resolve(result);
            }));
          }));
          return p.catch(noop), p;
        }, queue.unshift = function(value) {
          var p = new Promise((function(resolve, reject) {
            unshiftCb(value, (function(err, result) {
              err ? reject(err) : resolve(result);
            }));
          }));
          return p.catch(noop), p;
        }, queue.drained = function() {
          var previousDrain = queue.drain;
          return new Promise((function(resolve) {
            queue.drain = function() {
              previousDrain(), resolve();
            };
          }));
        }, queue;
      };
    },
    2664: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const util = __webpack_require__(3837), toRegexRange = __webpack_require__(5702), isObject = val => null !== val && "object" == typeof val && !Array.isArray(val), isValidValue = value => "number" == typeof value || "string" == typeof value && "" !== value, isNumber = num => Number.isInteger(+num), zeros = input => {
        let value = `${input}`, index = -1;
        if ("-" === value[0] && (value = value.slice(1)), "0" === value) return !1;
        for (;"0" === value[++index]; ) ;
        return index > 0;
      }, pad = (input, maxLength, toNumber) => {
        if (maxLength > 0) {
          let dash = "-" === input[0] ? "-" : "";
          dash && (input = input.slice(1)), input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
        }
        return !1 === toNumber ? String(input) : input;
      }, toMaxLen = (input, maxLength) => {
        let negative = "-" === input[0] ? "-" : "";
        for (negative && (input = input.slice(1), maxLength--); input.length < maxLength; ) input = "0" + input;
        return negative ? "-" + input : input;
      }, toRange = (a, b, isNumbers, options) => {
        if (isNumbers) return toRegexRange(a, b, {
          wrap: !1,
          ...options
        });
        let start = String.fromCharCode(a);
        return a === b ? start : `[${start}-${String.fromCharCode(b)}]`;
      }, toRegex = (start, end, options) => {
        if (Array.isArray(start)) {
          let wrap = !0 === options.wrap, prefix = options.capture ? "" : "?:";
          return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
        }
        return toRegexRange(start, end, options);
      }, rangeError = (...args) => new RangeError("Invalid range arguments: " + util.inspect(...args)), invalidRange = (start, end, options) => {
        if (!0 === options.strictRanges) throw rangeError([ start, end ]);
        return [];
      }, fillNumbers = (start, end, step = 1, options = {}) => {
        let a = Number(start), b = Number(end);
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
          if (!0 === options.strictRanges) throw rangeError([ start, end ]);
          return [];
        }
        0 === a && (a = 0), 0 === b && (b = 0);
        let descending = a > b, startString = String(start), endString = String(end), stepString = String(step);
        step = Math.max(Math.abs(step), 1);
        let padded = zeros(startString) || zeros(endString) || zeros(stepString), maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0, toNumber = !1 === padded && !1 === ((start, end, options) => "string" == typeof start || "string" == typeof end || !0 === options.stringify)(start, end, options), format = options.transform || (toNumber => value => !0 === toNumber ? Number(value) : String(value))(toNumber);
        if (options.toRegex && 1 === step) return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), !0, options);
        let parts = {
          negatives: [],
          positives: []
        }, range = [], index = 0;
        for (;descending ? a >= b : a <= b; ) !0 === options.toRegex && step > 1 ? parts[(num = a) < 0 ? "negatives" : "positives"].push(Math.abs(num)) : range.push(pad(format(a, index), maxLen, toNumber)), 
        a = descending ? a - step : a + step, index++;
        var num;
        return !0 === options.toRegex ? step > 1 ? ((parts, options) => {
          parts.negatives.sort(((a, b) => a < b ? -1 : a > b ? 1 : 0)), parts.positives.sort(((a, b) => a < b ? -1 : a > b ? 1 : 0));
          let result, prefix = options.capture ? "" : "?:", positives = "", negatives = "";
          return parts.positives.length && (positives = parts.positives.join("|")), parts.negatives.length && (negatives = `-(${prefix}${parts.negatives.join("|")})`), 
          result = positives && negatives ? `${positives}|${negatives}` : positives || negatives, 
          options.wrap ? `(${prefix}${result})` : result;
        })(parts, options) : toRegex(range, null, {
          wrap: !1,
          ...options
        }) : range;
      }, fill = (start, end, step, options = {}) => {
        if (null == end && isValidValue(start)) return [ start ];
        if (!isValidValue(start) || !isValidValue(end)) return invalidRange(start, end, options);
        if ("function" == typeof step) return fill(start, end, 1, {
          transform: step
        });
        if (isObject(step)) return fill(start, end, 0, step);
        let opts = {
          ...options
        };
        return !0 === opts.capture && (opts.wrap = !0), step = step || opts.step || 1, isNumber(step) ? isNumber(start) && isNumber(end) ? fillNumbers(start, end, step, opts) : ((start, end, step = 1, options = {}) => {
          if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) return invalidRange(start, end, options);
          let format = options.transform || (val => String.fromCharCode(val)), a = `${start}`.charCodeAt(0), b = `${end}`.charCodeAt(0), descending = a > b, min = Math.min(a, b), max = Math.max(a, b);
          if (options.toRegex && 1 === step) return toRange(min, max, !1, options);
          let range = [], index = 0;
          for (;descending ? a >= b : a <= b; ) range.push(format(a, index)), a = descending ? a - step : a + step, 
          index++;
          return !0 === options.toRegex ? toRegex(range, null, {
            wrap: !1,
            options
          }) : range;
        })(start, end, Math.max(Math.abs(step), 1), opts) : null == step || isObject(step) ? fill(start, end, 1, step) : ((step, options) => {
          if (!0 === options.strictRanges) throw new TypeError(`Expected step "${step}" to be a number`);
          return [];
        })(step, opts);
      };
      module.exports = fill;
    },
    7647: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var isGlob = __webpack_require__(6830), pathPosixDirname = __webpack_require__(1017).posix.dirname, isWin32 = "win32" === __webpack_require__(2037).platform(), backslash = /\\/g, enclosure = /[\{\[].*[\}\]]$/, globby = /(^|[^\\])([\{\[]|\([^\)]+$)/, escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
      module.exports = function(str, opts) {
        Object.assign({
          flipBackslashes: !0
        }, opts).flipBackslashes && isWin32 && str.indexOf("/") < 0 && (str = str.replace(backslash, "/")), 
        enclosure.test(str) && (str += "/"), str += "a";
        do {
          str = pathPosixDirname(str);
        } while (isGlob(str) || globby.test(str));
        return str.replace(escaped, "$1");
      };
    },
    2428: module => {
      module.exports = function(str) {
        if ("string" != typeof str || "" === str) return !1;
        for (var match; match = /(\\).|([@?!+*]\(.*\))/g.exec(str); ) {
          if (match[2]) return !0;
          str = str.slice(match.index + match[0].length);
        }
        return !1;
      };
    },
    6830: (module, __unused_webpack_exports, __webpack_require__) => {
      var isExtglob = __webpack_require__(2428), chars = {
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
    9924: module => {
      "use strict";
      module.exports = function(num) {
        return "number" == typeof num ? num - num == 0 : "string" == typeof num && "" !== num.trim() && (Number.isFinite ? Number.isFinite(+num) : isFinite(+num));
      };
    },
    155: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const PassThrough = __webpack_require__(2781).PassThrough, slice = Array.prototype.slice;
      function pauseStreams(streams, options) {
        if (Array.isArray(streams)) for (let i = 0, len = streams.length; i < len; i++) streams[i] = pauseStreams(streams[i], options); else {
          if (!streams._readableState && streams.pipe && (streams = streams.pipe(PassThrough(options))), 
          !streams._readableState || !streams.pause || !streams.pipe) throw new Error("Only readable stream can be merged.");
          streams.pause();
        }
        return streams;
      }
      module.exports = function() {
        const streamsQueue = [], args = slice.call(arguments);
        let merging = !1, options = args[args.length - 1];
        options && !Array.isArray(options) && null == options.pipe ? args.pop() : options = {};
        const doEnd = !1 !== options.end, doPipeError = !0 === options.pipeError;
        null == options.objectMode && (options.objectMode = !0);
        null == options.highWaterMark && (options.highWaterMark = 65536);
        const mergedStream = PassThrough(options);
        function addStream() {
          for (let i = 0, len = arguments.length; i < len; i++) streamsQueue.push(pauseStreams(arguments[i], options));
          return mergeStream(), this;
        }
        function mergeStream() {
          if (merging) return;
          merging = !0;
          let streams = streamsQueue.shift();
          if (!streams) return void process.nextTick(endStream);
          Array.isArray(streams) || (streams = [ streams ]);
          let pipesCount = streams.length + 1;
          function next() {
            --pipesCount > 0 || (merging = !1, mergeStream());
          }
          function pipe(stream) {
            function onend() {
              stream.removeListener("merge2UnpipeEnd", onend), stream.removeListener("end", onend), 
              doPipeError && stream.removeListener("error", onerror), next();
            }
            function onerror(err) {
              mergedStream.emit("error", err);
            }
            if (stream._readableState.endEmitted) return next();
            stream.on("merge2UnpipeEnd", onend), stream.on("end", onend), doPipeError && stream.on("error", onerror), 
            stream.pipe(mergedStream, {
              end: !1
            }), stream.resume();
          }
          for (let i = 0; i < streams.length; i++) pipe(streams[i]);
          next();
        }
        function endStream() {
          merging = !1, mergedStream.emit("queueDrain"), doEnd && mergedStream.end();
        }
        mergedStream.setMaxListeners(0), mergedStream.add = addStream, mergedStream.on("unpipe", (function(stream) {
          stream.emit("merge2UnpipeEnd");
        })), args.length && addStream.apply(null, args);
        return mergedStream;
      };
    },
    850: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const util = __webpack_require__(3837), braces = __webpack_require__(6744), picomatch = __webpack_require__(9444), utils = __webpack_require__(8702), isEmptyString = val => "" === val || "./" === val, micromatch = (list, patterns, options) => {
        patterns = [].concat(patterns), list = [].concat(list);
        let omit = new Set, keep = new Set, items = new Set, negatives = 0, onResult = state => {
          items.add(state.output), options && options.onResult && options.onResult(state);
        };
        for (let i = 0; i < patterns.length; i++) {
          let isMatch = picomatch(String(patterns[i]), {
            ...options,
            onResult
          }, !0), negated = isMatch.state.negated || isMatch.state.negatedExtglob;
          negated && negatives++;
          for (let item of list) {
            let matched = isMatch(item, !0);
            (negated ? !matched.isMatch : matched.isMatch) && (negated ? omit.add(matched.output) : (omit.delete(matched.output), 
            keep.add(matched.output)));
          }
        }
        let matches = (negatives === patterns.length ? [ ...items ] : [ ...keep ]).filter((item => !omit.has(item)));
        if (options && 0 === matches.length) {
          if (!0 === options.failglob) throw new Error(`No matches found for "${patterns.join(", ")}"`);
          if (!0 === options.nonull || !0 === options.nullglob) return options.unescape ? patterns.map((p => p.replace(/\\/g, ""))) : patterns;
        }
        return matches;
      };
      micromatch.match = micromatch, micromatch.matcher = (pattern, options) => picomatch(pattern, options), 
      micromatch.any = micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str), 
      micromatch.not = (list, patterns, options = {}) => {
        patterns = [].concat(patterns).map(String);
        let result = new Set, items = [], matches = new Set(micromatch(list, patterns, {
          ...options,
          onResult: state => {
            options.onResult && options.onResult(state), items.push(state.output);
          }
        }));
        for (let item of items) matches.has(item) || result.add(item);
        return [ ...result ];
      }, micromatch.contains = (str, pattern, options) => {
        if ("string" != typeof str) throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
        if (Array.isArray(pattern)) return pattern.some((p => micromatch.contains(str, p, options)));
        if ("string" == typeof pattern) {
          if (isEmptyString(str) || isEmptyString(pattern)) return !1;
          if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) return !0;
        }
        return micromatch.isMatch(str, pattern, {
          ...options,
          contains: !0
        });
      }, micromatch.matchKeys = (obj, patterns, options) => {
        if (!utils.isObject(obj)) throw new TypeError("Expected the first argument to be an object");
        let keys = micromatch(Object.keys(obj), patterns, options), res = {};
        for (let key of keys) res[key] = obj[key];
        return res;
      }, micromatch.some = (list, patterns, options) => {
        let items = [].concat(list);
        for (let pattern of [].concat(patterns)) {
          let isMatch = picomatch(String(pattern), options);
          if (items.some((item => isMatch(item)))) return !0;
        }
        return !1;
      }, micromatch.every = (list, patterns, options) => {
        let items = [].concat(list);
        for (let pattern of [].concat(patterns)) {
          let isMatch = picomatch(String(pattern), options);
          if (!items.every((item => isMatch(item)))) return !1;
        }
        return !0;
      }, micromatch.all = (str, patterns, options) => {
        if ("string" != typeof str) throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
        return [].concat(patterns).every((p => picomatch(p, options)(str)));
      }, micromatch.capture = (glob, input, options) => {
        let posix = utils.isWindows(options), match = picomatch.makeRe(String(glob), {
          ...options,
          capture: !0
        }).exec(posix ? utils.toPosixSlashes(input) : input);
        if (match) return match.slice(1).map((v => void 0 === v ? "" : v));
      }, micromatch.makeRe = (...args) => picomatch.makeRe(...args), micromatch.scan = (...args) => picomatch.scan(...args), 
      micromatch.parse = (patterns, options) => {
        let res = [];
        for (let pattern of [].concat(patterns || [])) for (let str of braces(String(pattern), options)) res.push(picomatch.parse(str, options));
        return res;
      }, micromatch.braces = (pattern, options) => {
        if ("string" != typeof pattern) throw new TypeError("Expected a string");
        return options && !0 === options.nobrace || !/\{.*\}/.test(pattern) ? [ pattern ] : braces(pattern, options);
      }, micromatch.braceExpand = (pattern, options) => {
        if ("string" != typeof pattern) throw new TypeError("Expected a string");
        return micromatch.braces(pattern, {
          ...options,
          expand: !0
        });
      }, module.exports = micromatch;
    },
    9444: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(6087);
    },
    1006: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(1017), POSIX_CHARS = {
        DOT_LITERAL: "\\.",
        PLUS_LITERAL: "\\+",
        QMARK_LITERAL: "\\?",
        SLASH_LITERAL: "\\/",
        ONE_CHAR: "(?=.)",
        QMARK: "[^/]",
        END_ANCHOR: "(?:\\/|$)",
        DOTS_SLASH: "\\.{1,2}(?:\\/|$)",
        NO_DOT: "(?!\\.)",
        NO_DOTS: "(?!(?:^|\\/)\\.{1,2}(?:\\/|$))",
        NO_DOT_SLASH: "(?!\\.{0,1}(?:\\/|$))",
        NO_DOTS_SLASH: "(?!\\.{1,2}(?:\\/|$))",
        QMARK_NO_DOT: "[^.\\/]",
        STAR: "[^/]*?",
        START_ANCHOR: "(?:^|\\/)"
      }, WINDOWS_CHARS = {
        ...POSIX_CHARS,
        SLASH_LITERAL: "[\\\\/]",
        QMARK: "[^\\\\/]",
        STAR: "[^\\\\/]*?",
        DOTS_SLASH: "\\.{1,2}(?:[\\\\/]|$)",
        NO_DOT: "(?!\\.)",
        NO_DOTS: "(?!(?:^|[\\\\/])\\.{1,2}(?:[\\\\/]|$))",
        NO_DOT_SLASH: "(?!\\.{0,1}(?:[\\\\/]|$))",
        NO_DOTS_SLASH: "(?!\\.{1,2}(?:[\\\\/]|$))",
        QMARK_NO_DOT: "[^.\\\\/]",
        START_ANCHOR: "(?:^|[\\\\/])",
        END_ANCHOR: "(?:[\\\\/]|$)"
      };
      module.exports = {
        MAX_LENGTH: 65536,
        POSIX_REGEX_SOURCE: {
          alnum: "a-zA-Z0-9",
          alpha: "a-zA-Z",
          ascii: "\\x00-\\x7F",
          blank: " \\t",
          cntrl: "\\x00-\\x1F\\x7F",
          digit: "0-9",
          graph: "\\x21-\\x7E",
          lower: "a-z",
          print: "\\x20-\\x7E ",
          punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
          space: " \\t\\r\\n\\v\\f",
          upper: "A-Z",
          word: "A-Za-z0-9_",
          xdigit: "A-Fa-f0-9"
        },
        REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
        REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
        REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
        REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
        REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
        REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
        REPLACEMENTS: {
          "***": "*",
          "**/**": "**",
          "**/**/**": "**"
        },
        CHAR_0: 48,
        CHAR_9: 57,
        CHAR_UPPERCASE_A: 65,
        CHAR_LOWERCASE_A: 97,
        CHAR_UPPERCASE_Z: 90,
        CHAR_LOWERCASE_Z: 122,
        CHAR_LEFT_PARENTHESES: 40,
        CHAR_RIGHT_PARENTHESES: 41,
        CHAR_ASTERISK: 42,
        CHAR_AMPERSAND: 38,
        CHAR_AT: 64,
        CHAR_BACKWARD_SLASH: 92,
        CHAR_CARRIAGE_RETURN: 13,
        CHAR_CIRCUMFLEX_ACCENT: 94,
        CHAR_COLON: 58,
        CHAR_COMMA: 44,
        CHAR_DOT: 46,
        CHAR_DOUBLE_QUOTE: 34,
        CHAR_EQUAL: 61,
        CHAR_EXCLAMATION_MARK: 33,
        CHAR_FORM_FEED: 12,
        CHAR_FORWARD_SLASH: 47,
        CHAR_GRAVE_ACCENT: 96,
        CHAR_HASH: 35,
        CHAR_HYPHEN_MINUS: 45,
        CHAR_LEFT_ANGLE_BRACKET: 60,
        CHAR_LEFT_CURLY_BRACE: 123,
        CHAR_LEFT_SQUARE_BRACKET: 91,
        CHAR_LINE_FEED: 10,
        CHAR_NO_BREAK_SPACE: 160,
        CHAR_PERCENT: 37,
        CHAR_PLUS: 43,
        CHAR_QUESTION_MARK: 63,
        CHAR_RIGHT_ANGLE_BRACKET: 62,
        CHAR_RIGHT_CURLY_BRACE: 125,
        CHAR_RIGHT_SQUARE_BRACKET: 93,
        CHAR_SEMICOLON: 59,
        CHAR_SINGLE_QUOTE: 39,
        CHAR_SPACE: 32,
        CHAR_TAB: 9,
        CHAR_UNDERSCORE: 95,
        CHAR_VERTICAL_LINE: 124,
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
        SEP: path.sep,
        extglobChars: chars => ({
          "!": {
            type: "negate",
            open: "(?:(?!(?:",
            close: `))${chars.STAR})`
          },
          "?": {
            type: "qmark",
            open: "(?:",
            close: ")?"
          },
          "+": {
            type: "plus",
            open: "(?:",
            close: ")+"
          },
          "*": {
            type: "star",
            open: "(?:",
            close: ")*"
          },
          "@": {
            type: "at",
            open: "(?:",
            close: ")"
          }
        }),
        globChars: win32 => !0 === win32 ? WINDOWS_CHARS : POSIX_CHARS
      };
    },
    3376: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const constants = __webpack_require__(1006), utils = __webpack_require__(8702), {MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS} = constants, expandRange = (args, options) => {
        if ("function" == typeof options.expandRange) return options.expandRange(...args, options);
        args.sort();
        const value = `[${args.join("-")}]`;
        try {
          new RegExp(value);
        } catch (ex) {
          return args.map((v => utils.escapeRegex(v))).join("..");
        }
        return value;
      }, syntaxError = (type, char) => `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`, parse = (input, options) => {
        if ("string" != typeof input) throw new TypeError("Expected a string");
        input = REPLACEMENTS[input] || input;
        const opts = {
          ...options
        }, max = "number" == typeof opts.maxLength ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
        let len = input.length;
        if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
        const bos = {
          type: "bos",
          value: "",
          output: opts.prepend || ""
        }, tokens = [ bos ], capture = opts.capture ? "" : "?:", win32 = utils.isWindows(options), PLATFORM_CHARS = constants.globChars(win32), EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS), {DOT_LITERAL, PLUS_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOT_SLASH, NO_DOTS_SLASH, QMARK, QMARK_NO_DOT, STAR, START_ANCHOR} = PLATFORM_CHARS, globstar = opts => `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`, nodot = opts.dot ? "" : NO_DOT, qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
        let star = !0 === opts.bash ? globstar(opts) : STAR;
        opts.capture && (star = `(${star})`), "boolean" == typeof opts.noext && (opts.noextglob = opts.noext);
        const state = {
          input,
          index: -1,
          start: 0,
          dot: !0 === opts.dot,
          consumed: "",
          output: "",
          prefix: "",
          backtrack: !1,
          negated: !1,
          brackets: 0,
          braces: 0,
          parens: 0,
          quotes: 0,
          globstar: !1,
          tokens
        };
        input = utils.removePrefix(input, state), len = input.length;
        const extglobs = [], braces = [], stack = [];
        let value, prev = bos;
        const eos = () => state.index === len - 1, peek = state.peek = (n = 1) => input[state.index + n], advance = state.advance = () => input[++state.index] || "", remaining = () => input.slice(state.index + 1), consume = (value = "", num = 0) => {
          state.consumed += value, state.index += num;
        }, append = token => {
          state.output += null != token.output ? token.output : token.value, consume(token.value);
        }, negate = () => {
          let count = 1;
          for (;"!" === peek() && ("(" !== peek(2) || "?" === peek(3)); ) advance(), state.start++, 
          count++;
          return count % 2 != 0 && (state.negated = !0, state.start++, !0);
        }, increment = type => {
          state[type]++, stack.push(type);
        }, decrement = type => {
          state[type]--, stack.pop();
        }, push = tok => {
          if ("globstar" === prev.type) {
            const isBrace = state.braces > 0 && ("comma" === tok.type || "brace" === tok.type), isExtglob = !0 === tok.extglob || extglobs.length && ("pipe" === tok.type || "paren" === tok.type);
            "slash" === tok.type || "paren" === tok.type || isBrace || isExtglob || (state.output = state.output.slice(0, -prev.output.length), 
            prev.type = "star", prev.value = "*", prev.output = star, state.output += prev.output);
          }
          if (extglobs.length && "paren" !== tok.type && (extglobs[extglobs.length - 1].inner += tok.value), 
          (tok.value || tok.output) && append(tok), prev && "text" === prev.type && "text" === tok.type) return prev.value += tok.value, 
          void (prev.output = (prev.output || "") + tok.value);
          tok.prev = prev, tokens.push(tok), prev = tok;
        }, extglobOpen = (type, value) => {
          const token = {
            ...EXTGLOB_CHARS[value],
            conditions: 1,
            inner: ""
          };
          token.prev = prev, token.parens = state.parens, token.output = state.output;
          const output = (opts.capture ? "(" : "") + token.open;
          increment("parens"), push({
            type,
            value,
            output: state.output ? "" : ONE_CHAR
          }), push({
            type: "paren",
            extglob: !0,
            value: advance(),
            output
          }), extglobs.push(token);
        }, extglobClose = token => {
          let rest, output = token.close + (opts.capture ? ")" : "");
          if ("negate" === token.type) {
            let extglobStar = star;
            if (token.inner && token.inner.length > 1 && token.inner.includes("/") && (extglobStar = globstar(opts)), 
            (extglobStar !== star || eos() || /^\)+$/.test(remaining())) && (output = token.close = `)$))${extglobStar}`), 
            token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
              const expression = parse(rest, {
                ...options,
                fastpaths: !1
              }).output;
              output = token.close = `)${expression})${extglobStar})`;
            }
            "bos" === token.prev.type && (state.negatedExtglob = !0);
          }
          push({
            type: "paren",
            extglob: !0,
            value,
            output
          }), decrement("parens");
        };
        if (!1 !== opts.fastpaths && !/(^[*!]|[/()[\]{}"])/.test(input)) {
          let backslashes = !1, output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, ((m, esc, chars, first, rest, index) => "\\" === first ? (backslashes = !0, 
          m) : "?" === first ? esc ? esc + first + (rest ? QMARK.repeat(rest.length) : "") : 0 === index ? qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "") : QMARK.repeat(chars.length) : "." === first ? DOT_LITERAL.repeat(chars.length) : "*" === first ? esc ? esc + first + (rest ? star : "") : star : esc ? m : `\\${m}`));
          return !0 === backslashes && (output = !0 === opts.unescape ? output.replace(/\\/g, "") : output.replace(/\\+/g, (m => m.length % 2 == 0 ? "\\\\" : m ? "\\" : ""))), 
          output === input && !0 === opts.contains ? (state.output = input, state) : (state.output = utils.wrapOutput(output, state, options), 
          state);
        }
        for (;!eos(); ) {
          if (value = advance(), "\0" === value) continue;
          if ("\\" === value) {
            const next = peek();
            if ("/" === next && !0 !== opts.bash) continue;
            if ("." === next || ";" === next) continue;
            if (!next) {
              value += "\\", push({
                type: "text",
                value
              });
              continue;
            }
            const match = /^\\+/.exec(remaining());
            let slashes = 0;
            if (match && match[0].length > 2 && (slashes = match[0].length, state.index += slashes, 
            slashes % 2 != 0 && (value += "\\")), !0 === opts.unescape ? value = advance() : value += advance(), 
            0 === state.brackets) {
              push({
                type: "text",
                value
              });
              continue;
            }
          }
          if (state.brackets > 0 && ("]" !== value || "[" === prev.value || "[^" === prev.value)) {
            if (!1 !== opts.posix && ":" === value) {
              const inner = prev.value.slice(1);
              if (inner.includes("[") && (prev.posix = !0, inner.includes(":"))) {
                const idx = prev.value.lastIndexOf("["), pre = prev.value.slice(0, idx), rest = prev.value.slice(idx + 2), posix = POSIX_REGEX_SOURCE[rest];
                if (posix) {
                  prev.value = pre + posix, state.backtrack = !0, advance(), bos.output || 1 !== tokens.indexOf(prev) || (bos.output = ONE_CHAR);
                  continue;
                }
              }
            }
            ("[" === value && ":" !== peek() || "-" === value && "]" === peek()) && (value = `\\${value}`), 
            "]" !== value || "[" !== prev.value && "[^" !== prev.value || (value = `\\${value}`), 
            !0 === opts.posix && "!" === value && "[" === prev.value && (value = "^"), prev.value += value, 
            append({
              value
            });
            continue;
          }
          if (1 === state.quotes && '"' !== value) {
            value = utils.escapeRegex(value), prev.value += value, append({
              value
            });
            continue;
          }
          if ('"' === value) {
            state.quotes = 1 === state.quotes ? 0 : 1, !0 === opts.keepQuotes && push({
              type: "text",
              value
            });
            continue;
          }
          if ("(" === value) {
            increment("parens"), push({
              type: "paren",
              value
            });
            continue;
          }
          if (")" === value) {
            if (0 === state.parens && !0 === opts.strictBrackets) throw new SyntaxError(syntaxError("opening", "("));
            const extglob = extglobs[extglobs.length - 1];
            if (extglob && state.parens === extglob.parens + 1) {
              extglobClose(extglobs.pop());
              continue;
            }
            push({
              type: "paren",
              value,
              output: state.parens ? ")" : "\\)"
            }), decrement("parens");
            continue;
          }
          if ("[" === value) {
            if (!0 !== opts.nobracket && remaining().includes("]")) increment("brackets"); else {
              if (!0 !== opts.nobracket && !0 === opts.strictBrackets) throw new SyntaxError(syntaxError("closing", "]"));
              value = `\\${value}`;
            }
            push({
              type: "bracket",
              value
            });
            continue;
          }
          if ("]" === value) {
            if (!0 === opts.nobracket || prev && "bracket" === prev.type && 1 === prev.value.length) {
              push({
                type: "text",
                value,
                output: `\\${value}`
              });
              continue;
            }
            if (0 === state.brackets) {
              if (!0 === opts.strictBrackets) throw new SyntaxError(syntaxError("opening", "["));
              push({
                type: "text",
                value,
                output: `\\${value}`
              });
              continue;
            }
            decrement("brackets");
            const prevValue = prev.value.slice(1);
            if (!0 === prev.posix || "^" !== prevValue[0] || prevValue.includes("/") || (value = `/${value}`), 
            prev.value += value, append({
              value
            }), !1 === opts.literalBrackets || utils.hasRegexChars(prevValue)) continue;
            const escaped = utils.escapeRegex(prev.value);
            if (state.output = state.output.slice(0, -prev.value.length), !0 === opts.literalBrackets) {
              state.output += escaped, prev.value = escaped;
              continue;
            }
            prev.value = `(${capture}${escaped}|${prev.value})`, state.output += prev.value;
            continue;
          }
          if ("{" === value && !0 !== opts.nobrace) {
            increment("braces");
            const open = {
              type: "brace",
              value,
              output: "(",
              outputIndex: state.output.length,
              tokensIndex: state.tokens.length
            };
            braces.push(open), push(open);
            continue;
          }
          if ("}" === value) {
            const brace = braces[braces.length - 1];
            if (!0 === opts.nobrace || !brace) {
              push({
                type: "text",
                value,
                output: value
              });
              continue;
            }
            let output = ")";
            if (!0 === brace.dots) {
              const arr = tokens.slice(), range = [];
              for (let i = arr.length - 1; i >= 0 && (tokens.pop(), "brace" !== arr[i].type); i--) "dots" !== arr[i].type && range.unshift(arr[i].value);
              output = expandRange(range, opts), state.backtrack = !0;
            }
            if (!0 !== brace.comma && !0 !== brace.dots) {
              const out = state.output.slice(0, brace.outputIndex), toks = state.tokens.slice(brace.tokensIndex);
              brace.value = brace.output = "\\{", value = output = "\\}", state.output = out;
              for (const t of toks) state.output += t.output || t.value;
            }
            push({
              type: "brace",
              value,
              output
            }), decrement("braces"), braces.pop();
            continue;
          }
          if ("|" === value) {
            extglobs.length > 0 && extglobs[extglobs.length - 1].conditions++, push({
              type: "text",
              value
            });
            continue;
          }
          if ("," === value) {
            let output = value;
            const brace = braces[braces.length - 1];
            brace && "braces" === stack[stack.length - 1] && (brace.comma = !0, output = "|"), 
            push({
              type: "comma",
              value,
              output
            });
            continue;
          }
          if ("/" === value) {
            if ("dot" === prev.type && state.index === state.start + 1) {
              state.start = state.index + 1, state.consumed = "", state.output = "", tokens.pop(), 
              prev = bos;
              continue;
            }
            push({
              type: "slash",
              value,
              output: SLASH_LITERAL
            });
            continue;
          }
          if ("." === value) {
            if (state.braces > 0 && "dot" === prev.type) {
              "." === prev.value && (prev.output = DOT_LITERAL);
              const brace = braces[braces.length - 1];
              prev.type = "dots", prev.output += value, prev.value += value, brace.dots = !0;
              continue;
            }
            if (state.braces + state.parens === 0 && "bos" !== prev.type && "slash" !== prev.type) {
              push({
                type: "text",
                value,
                output: DOT_LITERAL
              });
              continue;
            }
            push({
              type: "dot",
              value,
              output: DOT_LITERAL
            });
            continue;
          }
          if ("?" === value) {
            if (!(prev && "(" === prev.value) && !0 !== opts.noextglob && "(" === peek() && "?" !== peek(2)) {
              extglobOpen("qmark", value);
              continue;
            }
            if (prev && "paren" === prev.type) {
              const next = peek();
              let output = value;
              if ("<" === next && !utils.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
              ("(" === prev.value && !/[!=<:]/.test(next) || "<" === next && !/<([!=]|\w+>)/.test(remaining())) && (output = `\\${value}`), 
              push({
                type: "text",
                value,
                output
              });
              continue;
            }
            if (!0 !== opts.dot && ("slash" === prev.type || "bos" === prev.type)) {
              push({
                type: "qmark",
                value,
                output: QMARK_NO_DOT
              });
              continue;
            }
            push({
              type: "qmark",
              value,
              output: QMARK
            });
            continue;
          }
          if ("!" === value) {
            if (!0 !== opts.noextglob && "(" === peek() && ("?" !== peek(2) || !/[!=<:]/.test(peek(3)))) {
              extglobOpen("negate", value);
              continue;
            }
            if (!0 !== opts.nonegate && 0 === state.index) {
              negate();
              continue;
            }
          }
          if ("+" === value) {
            if (!0 !== opts.noextglob && "(" === peek() && "?" !== peek(2)) {
              extglobOpen("plus", value);
              continue;
            }
            if (prev && "(" === prev.value || !1 === opts.regex) {
              push({
                type: "plus",
                value,
                output: PLUS_LITERAL
              });
              continue;
            }
            if (prev && ("bracket" === prev.type || "paren" === prev.type || "brace" === prev.type) || state.parens > 0) {
              push({
                type: "plus",
                value
              });
              continue;
            }
            push({
              type: "plus",
              value: PLUS_LITERAL
            });
            continue;
          }
          if ("@" === value) {
            if (!0 !== opts.noextglob && "(" === peek() && "?" !== peek(2)) {
              push({
                type: "at",
                extglob: !0,
                value,
                output: ""
              });
              continue;
            }
            push({
              type: "text",
              value
            });
            continue;
          }
          if ("*" !== value) {
            "$" !== value && "^" !== value || (value = `\\${value}`);
            const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
            match && (value += match[0], state.index += match[0].length), push({
              type: "text",
              value
            });
            continue;
          }
          if (prev && ("globstar" === prev.type || !0 === prev.star)) {
            prev.type = "star", prev.star = !0, prev.value += value, prev.output = star, state.backtrack = !0, 
            state.globstar = !0, consume(value);
            continue;
          }
          let rest = remaining();
          if (!0 !== opts.noextglob && /^\([^?]/.test(rest)) {
            extglobOpen("star", value);
            continue;
          }
          if ("star" === prev.type) {
            if (!0 === opts.noglobstar) {
              consume(value);
              continue;
            }
            const prior = prev.prev, before = prior.prev, isStart = "slash" === prior.type || "bos" === prior.type, afterStar = before && ("star" === before.type || "globstar" === before.type);
            if (!0 === opts.bash && (!isStart || rest[0] && "/" !== rest[0])) {
              push({
                type: "star",
                value,
                output: ""
              });
              continue;
            }
            const isBrace = state.braces > 0 && ("comma" === prior.type || "brace" === prior.type), isExtglob = extglobs.length && ("pipe" === prior.type || "paren" === prior.type);
            if (!isStart && "paren" !== prior.type && !isBrace && !isExtglob) {
              push({
                type: "star",
                value,
                output: ""
              });
              continue;
            }
            for (;"/**" === rest.slice(0, 3); ) {
              const after = input[state.index + 4];
              if (after && "/" !== after) break;
              rest = rest.slice(3), consume("/**", 3);
            }
            if ("bos" === prior.type && eos()) {
              prev.type = "globstar", prev.value += value, prev.output = globstar(opts), state.output = prev.output, 
              state.globstar = !0, consume(value);
              continue;
            }
            if ("slash" === prior.type && "bos" !== prior.prev.type && !afterStar && eos()) {
              state.output = state.output.slice(0, -(prior.output + prev.output).length), prior.output = `(?:${prior.output}`, 
              prev.type = "globstar", prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)"), 
              prev.value += value, state.globstar = !0, state.output += prior.output + prev.output, 
              consume(value);
              continue;
            }
            if ("slash" === prior.type && "bos" !== prior.prev.type && "/" === rest[0]) {
              const end = void 0 !== rest[1] ? "|$" : "";
              state.output = state.output.slice(0, -(prior.output + prev.output).length), prior.output = `(?:${prior.output}`, 
              prev.type = "globstar", prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`, 
              prev.value += value, state.output += prior.output + prev.output, state.globstar = !0, 
              consume(value + advance()), push({
                type: "slash",
                value: "/",
                output: ""
              });
              continue;
            }
            if ("bos" === prior.type && "/" === rest[0]) {
              prev.type = "globstar", prev.value += value, prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`, 
              state.output = prev.output, state.globstar = !0, consume(value + advance()), push({
                type: "slash",
                value: "/",
                output: ""
              });
              continue;
            }
            state.output = state.output.slice(0, -prev.output.length), prev.type = "globstar", 
            prev.output = globstar(opts), prev.value += value, state.output += prev.output, 
            state.globstar = !0, consume(value);
            continue;
          }
          const token = {
            type: "star",
            value,
            output: star
          };
          !0 !== opts.bash ? !prev || "bracket" !== prev.type && "paren" !== prev.type || !0 !== opts.regex ? (state.index !== state.start && "slash" !== prev.type && "dot" !== prev.type || ("dot" === prev.type ? (state.output += NO_DOT_SLASH, 
          prev.output += NO_DOT_SLASH) : !0 === opts.dot ? (state.output += NO_DOTS_SLASH, 
          prev.output += NO_DOTS_SLASH) : (state.output += nodot, prev.output += nodot), "*" !== peek() && (state.output += ONE_CHAR, 
          prev.output += ONE_CHAR)), push(token)) : (token.output = value, push(token)) : (token.output = ".*?", 
          "bos" !== prev.type && "slash" !== prev.type || (token.output = nodot + token.output), 
          push(token));
        }
        for (;state.brackets > 0; ) {
          if (!0 === opts.strictBrackets) throw new SyntaxError(syntaxError("closing", "]"));
          state.output = utils.escapeLast(state.output, "["), decrement("brackets");
        }
        for (;state.parens > 0; ) {
          if (!0 === opts.strictBrackets) throw new SyntaxError(syntaxError("closing", ")"));
          state.output = utils.escapeLast(state.output, "("), decrement("parens");
        }
        for (;state.braces > 0; ) {
          if (!0 === opts.strictBrackets) throw new SyntaxError(syntaxError("closing", "}"));
          state.output = utils.escapeLast(state.output, "{"), decrement("braces");
        }
        if (!0 === opts.strictSlashes || "star" !== prev.type && "bracket" !== prev.type || push({
          type: "maybe_slash",
          value: "",
          output: `${SLASH_LITERAL}?`
        }), !0 === state.backtrack) {
          state.output = "";
          for (const token of state.tokens) state.output += null != token.output ? token.output : token.value, 
          token.suffix && (state.output += token.suffix);
        }
        return state;
      };
      parse.fastpaths = (input, options) => {
        const opts = {
          ...options
        }, max = "number" == typeof opts.maxLength ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH, len = input.length;
        if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
        input = REPLACEMENTS[input] || input;
        const win32 = utils.isWindows(options), {DOT_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOTS, NO_DOTS_SLASH, STAR, START_ANCHOR} = constants.globChars(win32), nodot = opts.dot ? NO_DOTS : NO_DOT, slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT, capture = opts.capture ? "" : "?:";
        let star = !0 === opts.bash ? ".*?" : STAR;
        opts.capture && (star = `(${star})`);
        const globstar = opts => !0 === opts.noglobstar ? star : `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`, create = str => {
          switch (str) {
           case "*":
            return `${nodot}${ONE_CHAR}${star}`;

           case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;

           case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

           case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

           case "**":
            return nodot + globstar(opts);

           case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

           case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

           case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

           default:
            {
              const match = /^(.*?)\.(\w+)$/.exec(str);
              if (!match) return;
              const source = create(match[1]);
              if (!source) return;
              return source + DOT_LITERAL + match[2];
            }
          }
        }, output = utils.removePrefix(input, {
          negated: !1,
          prefix: ""
        });
        let source = create(output);
        return source && !0 !== opts.strictSlashes && (source += `${SLASH_LITERAL}?`), source;
      }, module.exports = parse;
    },
    6087: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(1017), scan = __webpack_require__(3921), parse = __webpack_require__(3376), utils = __webpack_require__(8702), constants = __webpack_require__(1006), picomatch = (glob, options, returnState = !1) => {
        if (Array.isArray(glob)) {
          const fns = glob.map((input => picomatch(input, options, returnState))), arrayMatcher = str => {
            for (const isMatch of fns) {
              const state = isMatch(str);
              if (state) return state;
            }
            return !1;
          };
          return arrayMatcher;
        }
        const isState = (val = glob) && "object" == typeof val && !Array.isArray(val) && glob.tokens && glob.input;
        var val;
        if ("" === glob || "string" != typeof glob && !isState) throw new TypeError("Expected pattern to be a non-empty string");
        const opts = options || {}, posix = utils.isWindows(options), regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, !1, !0), state = regex.state;
        delete regex.state;
        let isIgnored = () => !1;
        if (opts.ignore) {
          const ignoreOpts = {
            ...options,
            ignore: null,
            onMatch: null,
            onResult: null
          };
          isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
        }
        const matcher = (input, returnObject = !1) => {
          const {isMatch, match, output} = picomatch.test(input, regex, options, {
            glob,
            posix
          }), result = {
            glob,
            state,
            regex,
            posix,
            input,
            output,
            match,
            isMatch
          };
          return "function" == typeof opts.onResult && opts.onResult(result), !1 === isMatch ? (result.isMatch = !1, 
          !!returnObject && result) : isIgnored(input) ? ("function" == typeof opts.onIgnore && opts.onIgnore(result), 
          result.isMatch = !1, !!returnObject && result) : ("function" == typeof opts.onMatch && opts.onMatch(result), 
          !returnObject || result);
        };
        return returnState && (matcher.state = state), matcher;
      };
      picomatch.test = (input, regex, options, {glob, posix} = {}) => {
        if ("string" != typeof input) throw new TypeError("Expected input to be a string");
        if ("" === input) return {
          isMatch: !1,
          output: ""
        };
        const opts = options || {}, format = opts.format || (posix ? utils.toPosixSlashes : null);
        let match = input === glob, output = match && format ? format(input) : input;
        return !1 === match && (output = format ? format(input) : input, match = output === glob), 
        !1 !== match && !0 !== opts.capture || (match = !0 === opts.matchBase || !0 === opts.basename ? picomatch.matchBase(input, regex, options, posix) : regex.exec(output)), 
        {
          isMatch: Boolean(match),
          match,
          output
        };
      }, picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => (glob instanceof RegExp ? glob : picomatch.makeRe(glob, options)).test(path.basename(input)), 
      picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str), 
      picomatch.parse = (pattern, options) => Array.isArray(pattern) ? pattern.map((p => picomatch.parse(p, options))) : parse(pattern, {
        ...options,
        fastpaths: !1
      }), picomatch.scan = (input, options) => scan(input, options), picomatch.compileRe = (state, options, returnOutput = !1, returnState = !1) => {
        if (!0 === returnOutput) return state.output;
        const opts = options || {}, prepend = opts.contains ? "" : "^", append = opts.contains ? "" : "$";
        let source = `${prepend}(?:${state.output})${append}`;
        state && !0 === state.negated && (source = `^(?!${source}).*$`);
        const regex = picomatch.toRegex(source, options);
        return !0 === returnState && (regex.state = state), regex;
      }, picomatch.makeRe = (input, options = {}, returnOutput = !1, returnState = !1) => {
        if (!input || "string" != typeof input) throw new TypeError("Expected a non-empty string");
        let parsed = {
          negated: !1,
          fastpaths: !0
        };
        return !1 === options.fastpaths || "." !== input[0] && "*" !== input[0] || (parsed.output = parse.fastpaths(input, options)), 
        parsed.output || (parsed = parse(input, options)), picomatch.compileRe(parsed, options, returnOutput, returnState);
      }, picomatch.toRegex = (source, options) => {
        try {
          const opts = options || {};
          return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
        } catch (err) {
          if (options && !0 === options.debug) throw err;
          return /$^/;
        }
      }, picomatch.constants = constants, module.exports = picomatch;
    },
    3921: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const utils = __webpack_require__(8702), {CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET} = __webpack_require__(1006), isPathSeparator = code => code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH, depth = token => {
        !0 !== token.isPrefix && (token.depth = token.isGlobstar ? 1 / 0 : 1);
      };
      module.exports = (input, options) => {
        const opts = options || {}, length = input.length - 1, scanToEnd = !0 === opts.parts || !0 === opts.scanToEnd, slashes = [], tokens = [], parts = [];
        let prev, code, str = input, index = -1, start = 0, lastIndex = 0, isBrace = !1, isBracket = !1, isGlob = !1, isExtglob = !1, isGlobstar = !1, braceEscaped = !1, backslashes = !1, negated = !1, negatedExtglob = !1, finished = !1, braces = 0, token = {
          value: "",
          depth: 0,
          isGlob: !1
        };
        const eos = () => index >= length, advance = () => (prev = code, str.charCodeAt(++index));
        for (;index < length; ) {
          let next;
          if (code = advance(), code !== CHAR_BACKWARD_SLASH) {
            if (!0 === braceEscaped || code === CHAR_LEFT_CURLY_BRACE) {
              for (braces++; !0 !== eos() && (code = advance()); ) if (code !== CHAR_BACKWARD_SLASH) if (code !== CHAR_LEFT_CURLY_BRACE) {
                if (!0 !== braceEscaped && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
                  if (isBrace = token.isBrace = !0, isGlob = token.isGlob = !0, finished = !0, !0 === scanToEnd) continue;
                  break;
                }
                if (!0 !== braceEscaped && code === CHAR_COMMA) {
                  if (isBrace = token.isBrace = !0, isGlob = token.isGlob = !0, finished = !0, !0 === scanToEnd) continue;
                  break;
                }
                if (code === CHAR_RIGHT_CURLY_BRACE && (braces--, 0 === braces)) {
                  braceEscaped = !1, isBrace = token.isBrace = !0, finished = !0;
                  break;
                }
              } else braces++; else backslashes = token.backslashes = !0, advance();
              if (!0 === scanToEnd) continue;
              break;
            }
            if (code !== CHAR_FORWARD_SLASH) {
              if (!0 !== opts.noext) {
                if (!0 === (code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK) && str.charCodeAt(index + 1) === CHAR_LEFT_PARENTHESES) {
                  if (isGlob = token.isGlob = !0, isExtglob = token.isExtglob = !0, finished = !0, 
                  code === CHAR_EXCLAMATION_MARK && index === start && (negatedExtglob = !0), !0 === scanToEnd) {
                    for (;!0 !== eos() && (code = advance()); ) if (code !== CHAR_BACKWARD_SLASH) {
                      if (code === CHAR_RIGHT_PARENTHESES) {
                        isGlob = token.isGlob = !0, finished = !0;
                        break;
                      }
                    } else backslashes = token.backslashes = !0, code = advance();
                    continue;
                  }
                  break;
                }
              }
              if (code === CHAR_ASTERISK) {
                if (prev === CHAR_ASTERISK && (isGlobstar = token.isGlobstar = !0), isGlob = token.isGlob = !0, 
                finished = !0, !0 === scanToEnd) continue;
                break;
              }
              if (code === CHAR_QUESTION_MARK) {
                if (isGlob = token.isGlob = !0, finished = !0, !0 === scanToEnd) continue;
                break;
              }
              if (code === CHAR_LEFT_SQUARE_BRACKET) {
                for (;!0 !== eos() && (next = advance()); ) if (next !== CHAR_BACKWARD_SLASH) {
                  if (next === CHAR_RIGHT_SQUARE_BRACKET) {
                    isBracket = token.isBracket = !0, isGlob = token.isGlob = !0, finished = !0;
                    break;
                  }
                } else backslashes = token.backslashes = !0, advance();
                if (!0 === scanToEnd) continue;
                break;
              }
              if (!0 === opts.nonegate || code !== CHAR_EXCLAMATION_MARK || index !== start) {
                if (!0 !== opts.noparen && code === CHAR_LEFT_PARENTHESES) {
                  if (isGlob = token.isGlob = !0, !0 === scanToEnd) {
                    for (;!0 !== eos() && (code = advance()); ) if (code !== CHAR_LEFT_PARENTHESES) {
                      if (code === CHAR_RIGHT_PARENTHESES) {
                        finished = !0;
                        break;
                      }
                    } else backslashes = token.backslashes = !0, code = advance();
                    continue;
                  }
                  break;
                }
                if (!0 === isGlob) {
                  if (finished = !0, !0 === scanToEnd) continue;
                  break;
                }
              } else negated = token.negated = !0, start++;
            } else {
              if (slashes.push(index), tokens.push(token), token = {
                value: "",
                depth: 0,
                isGlob: !1
              }, !0 === finished) continue;
              if (prev === CHAR_DOT && index === start + 1) {
                start += 2;
                continue;
              }
              lastIndex = index + 1;
            }
          } else backslashes = token.backslashes = !0, code = advance(), code === CHAR_LEFT_CURLY_BRACE && (braceEscaped = !0);
        }
        !0 === opts.noext && (isExtglob = !1, isGlob = !1);
        let base = str, prefix = "", glob = "";
        start > 0 && (prefix = str.slice(0, start), str = str.slice(start), lastIndex -= start), 
        base && !0 === isGlob && lastIndex > 0 ? (base = str.slice(0, lastIndex), glob = str.slice(lastIndex)) : !0 === isGlob ? (base = "", 
        glob = str) : base = str, base && "" !== base && "/" !== base && base !== str && isPathSeparator(base.charCodeAt(base.length - 1)) && (base = base.slice(0, -1)), 
        !0 === opts.unescape && (glob && (glob = utils.removeBackslashes(glob)), base && !0 === backslashes && (base = utils.removeBackslashes(base)));
        const state = {
          prefix,
          input,
          start,
          base,
          glob,
          isBrace,
          isBracket,
          isGlob,
          isExtglob,
          isGlobstar,
          negated,
          negatedExtglob
        };
        if (!0 === opts.tokens && (state.maxDepth = 0, isPathSeparator(code) || tokens.push(token), 
        state.tokens = tokens), !0 === opts.parts || !0 === opts.tokens) {
          let prevIndex;
          for (let idx = 0; idx < slashes.length; idx++) {
            const n = prevIndex ? prevIndex + 1 : start, i = slashes[idx], value = input.slice(n, i);
            opts.tokens && (0 === idx && 0 !== start ? (tokens[idx].isPrefix = !0, tokens[idx].value = prefix) : tokens[idx].value = value, 
            depth(tokens[idx]), state.maxDepth += tokens[idx].depth), 0 === idx && "" === value || parts.push(value), 
            prevIndex = i;
          }
          if (prevIndex && prevIndex + 1 < input.length) {
            const value = input.slice(prevIndex + 1);
            parts.push(value), opts.tokens && (tokens[tokens.length - 1].value = value, depth(tokens[tokens.length - 1]), 
            state.maxDepth += tokens[tokens.length - 1].depth);
          }
          state.slashes = slashes, state.parts = parts;
        }
        return state;
      };
    },
    8702: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(1017), win32 = "win32" === process.platform, {REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH, REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL} = __webpack_require__(1006);
      exports.isObject = val => null !== val && "object" == typeof val && !Array.isArray(val), 
      exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str), exports.isRegexChar = str => 1 === str.length && exports.hasRegexChars(str), 
      exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1"), exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, "/"), 
      exports.removeBackslashes = str => str.replace(REGEX_REMOVE_BACKSLASH, (match => "\\" === match ? "" : match)), 
      exports.supportsLookbehinds = () => {
        const segs = process.version.slice(1).split(".").map(Number);
        return 3 === segs.length && segs[0] >= 9 || 8 === segs[0] && segs[1] >= 10;
      }, exports.isWindows = options => options && "boolean" == typeof options.windows ? options.windows : !0 === win32 || "\\" === path.sep, 
      exports.escapeLast = (input, char, lastIdx) => {
        const idx = input.lastIndexOf(char, lastIdx);
        return -1 === idx ? input : "\\" === input[idx - 1] ? exports.escapeLast(input, char, idx - 1) : `${input.slice(0, idx)}\\${input.slice(idx)}`;
      }, exports.removePrefix = (input, state = {}) => {
        let output = input;
        return output.startsWith("./") && (output = output.slice(2), state.prefix = "./"), 
        output;
      }, exports.wrapOutput = (input, state = {}, options = {}) => {
        let output = `${options.contains ? "" : "^"}(?:${input})${options.contains ? "" : "$"}`;
        return !0 === state.negated && (output = `(?:^(?!${output}).*$)`), output;
      };
    },
    4375: module => {
      let promise;
      module.exports = "function" == typeof queueMicrotask ? queueMicrotask.bind("undefined" != typeof window ? window : global) : cb => (promise || (promise = Promise.resolve())).then(cb).catch((err => setTimeout((() => {
        throw err;
      }), 0)));
    },
    3650: module => {
      "use strict";
      module.exports = function(Constructor) {
        var head = new Constructor, tail = head;
        return {
          get: function() {
            var current = head;
            return current.next ? head = current.next : (head = new Constructor, tail = head), 
            current.next = null, current;
          },
          release: function(obj) {
            tail.next = obj, tail = obj;
          }
        };
      };
    },
    4595: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = function(tasks, cb) {
        let results, pending, keys, isSync = !0;
        Array.isArray(tasks) ? (results = [], pending = tasks.length) : (keys = Object.keys(tasks), 
        results = {}, pending = keys.length);
        function done(err) {
          function end() {
            cb && cb(err, results), cb = null;
          }
          isSync ? queueMicrotask(end) : end();
        }
        function each(i, err, result) {
          results[i] = result, (0 == --pending || err) && done(err);
        }
        pending ? keys ? keys.forEach((function(key) {
          tasks[key]((function(err, result) {
            each(key, err, result);
          }));
        })) : tasks.forEach((function(task, i) {
          task((function(err, result) {
            each(i, err, result);
          }));
        })) : done(null);
        isSync = !1;
      };
      const queueMicrotask = __webpack_require__(4375);
    },
    5702: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const isNumber = __webpack_require__(9924), toRegexRange = (min, max, options) => {
        if (!1 === isNumber(min)) throw new TypeError("toRegexRange: expected the first argument to be a number");
        if (void 0 === max || min === max) return String(min);
        if (!1 === isNumber(max)) throw new TypeError("toRegexRange: expected the second argument to be a number.");
        let opts = {
          relaxZeros: !0,
          ...options
        };
        "boolean" == typeof opts.strictZeros && (opts.relaxZeros = !1 === opts.strictZeros);
        let cacheKey = min + ":" + max + "=" + String(opts.relaxZeros) + String(opts.shorthand) + String(opts.capture) + String(opts.wrap);
        if (toRegexRange.cache.hasOwnProperty(cacheKey)) return toRegexRange.cache[cacheKey].result;
        let a = Math.min(min, max), b = Math.max(min, max);
        if (1 === Math.abs(a - b)) {
          let result = min + "|" + max;
          return opts.capture ? `(${result})` : !1 === opts.wrap ? result : `(?:${result})`;
        }
        let isPadded = hasPadding(min) || hasPadding(max), state = {
          min,
          max,
          a,
          b
        }, positives = [], negatives = [];
        if (isPadded && (state.isPadded = isPadded, state.maxLen = String(state.max).length), 
        a < 0) {
          negatives = splitToPatterns(b < 0 ? Math.abs(b) : 1, Math.abs(a), state, opts), 
          a = state.a = 0;
        }
        return b >= 0 && (positives = splitToPatterns(a, b, state, opts)), state.negatives = negatives, 
        state.positives = positives, state.result = function(neg, pos, options) {
          let onlyNegative = filterPatterns(neg, pos, "-", !1, options) || [], onlyPositive = filterPatterns(pos, neg, "", !1, options) || [], intersected = filterPatterns(neg, pos, "-?", !0, options) || [];
          return onlyNegative.concat(intersected).concat(onlyPositive).join("|");
        }(negatives, positives, opts), !0 === opts.capture ? state.result = `(${state.result})` : !1 !== opts.wrap && positives.length + negatives.length > 1 && (state.result = `(?:${state.result})`), 
        toRegexRange.cache[cacheKey] = state, state.result;
      };
      function rangeToPattern(start, stop, options) {
        if (start === stop) return {
          pattern: start,
          count: [],
          digits: 0
        };
        let zipped = function(a, b) {
          let arr = [];
          for (let i = 0; i < a.length; i++) arr.push([ a[i], b[i] ]);
          return arr;
        }(start, stop), digits = zipped.length, pattern = "", count = 0;
        for (let i = 0; i < digits; i++) {
          let [startDigit, stopDigit] = zipped[i];
          startDigit === stopDigit ? pattern += startDigit : "0" !== startDigit || "9" !== stopDigit ? pattern += toCharacterClass(startDigit, stopDigit, options) : count++;
        }
        return count && (pattern += !0 === options.shorthand ? "\\d" : "[0-9]"), {
          pattern,
          count: [ count ],
          digits
        };
      }
      function splitToPatterns(min, max, tok, options) {
        let prev, ranges = function(min, max) {
          let nines = 1, zeros = 1, stop = countNines(min, nines), stops = new Set([ max ]);
          for (;min <= stop && stop <= max; ) stops.add(stop), nines += 1, stop = countNines(min, nines);
          for (stop = countZeros(max + 1, zeros) - 1; min < stop && stop <= max; ) stops.add(stop), 
          zeros += 1, stop = countZeros(max + 1, zeros) - 1;
          return stops = [ ...stops ], stops.sort(compare), stops;
        }(min, max), tokens = [], start = min;
        for (let i = 0; i < ranges.length; i++) {
          let max = ranges[i], obj = rangeToPattern(String(start), String(max), options), zeros = "";
          tok.isPadded || !prev || prev.pattern !== obj.pattern ? (tok.isPadded && (zeros = padZeros(max, tok, options)), 
          obj.string = zeros + obj.pattern + toQuantifier(obj.count), tokens.push(obj), start = max + 1, 
          prev = obj) : (prev.count.length > 1 && prev.count.pop(), prev.count.push(obj.count[0]), 
          prev.string = prev.pattern + toQuantifier(prev.count), start = max + 1);
        }
        return tokens;
      }
      function filterPatterns(arr, comparison, prefix, intersection, options) {
        let result = [];
        for (let ele of arr) {
          let {string} = ele;
          intersection || contains(comparison, "string", string) || result.push(prefix + string), 
          intersection && contains(comparison, "string", string) && result.push(prefix + string);
        }
        return result;
      }
      function compare(a, b) {
        return a > b ? 1 : b > a ? -1 : 0;
      }
      function contains(arr, key, val) {
        return arr.some((ele => ele[key] === val));
      }
      function countNines(min, len) {
        return Number(String(min).slice(0, -len) + "9".repeat(len));
      }
      function countZeros(integer, zeros) {
        return integer - integer % Math.pow(10, zeros);
      }
      function toQuantifier(digits) {
        let [start = 0, stop = ""] = digits;
        return stop || start > 1 ? `{${start + (stop ? "," + stop : "")}}` : "";
      }
      function toCharacterClass(a, b, options) {
        return `[${a}${b - a == 1 ? "" : "-"}${b}]`;
      }
      function hasPadding(str) {
        return /^-?(0+)\d/.test(str);
      }
      function padZeros(value, tok, options) {
        if (!tok.isPadded) return value;
        let diff = Math.abs(tok.maxLen - String(value).length), relax = !1 !== options.relaxZeros;
        switch (diff) {
         case 0:
          return "";

         case 1:
          return relax ? "0?" : "0";

         case 2:
          return relax ? "0{0,2}" : "00";

         default:
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
      toRegexRange.cache = {}, toRegexRange.clearCache = () => toRegexRange.cache = {}, 
      module.exports = toRegexRange;
    },
    2361: module => {
      "use strict";
      module.exports = require("events");
    },
    7147: module => {
      "use strict";
      module.exports = require("fs");
    },
    2037: module => {
      "use strict";
      module.exports = require("os");
    },
    1017: module => {
      "use strict";
      module.exports = require("path");
    },
    2781: module => {
      "use strict";
      module.exports = require("stream");
    },
    3837: module => {
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
  }(3294);
  module.exports = __webpack_exports__;
})();