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
    6004: (module, __unused_webpack_exports, __webpack_require__) => {
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
      const path = __webpack_require__(1017), globParent = __webpack_require__(6004), micromatch = __webpack_require__(8341), COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/, REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/, REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/, GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/, BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
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
    793: (module, __unused_webpack_exports, __webpack_require__) => {
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
      }(FastGlob || (FastGlob = {})), module.exports = FastGlob, module.exports._isGlob = __webpack_require__(6830), 
      module.exports._merge2 = __webpack_require__(155);
    },
    8341: module => {
      "use strict";
      module.exports = require("./micromatch");
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
  }(793);
  module.exports = __webpack_exports__;
})();