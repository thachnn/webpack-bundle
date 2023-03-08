(() => {
  var __webpack_modules__ = {
    700: module => {
      module.exports = function(glob, opts) {
        if ("string" != typeof glob) throw new TypeError("Expected a string");
        for (var c, str = String(glob), reStr = "", extended = !!opts && !!opts.extended, globstar = !!opts && !!opts.globstar, inGroup = !1, flags = opts && "string" == typeof opts.flags ? opts.flags : "", i = 0, len = str.length; i < len; i++) switch (c = str[i]) {
         case "/":
         case "$":
         case "^":
         case "+":
         case ".":
         case "(":
         case ")":
         case "=":
         case "!":
         case "|":
          reStr += "\\" + c;
          break;

         case "?":
          if (extended) {
            reStr += ".";
            break;
          }

         case "[":
         case "]":
          if (extended) {
            reStr += c;
            break;
          }

         case "{":
          if (extended) {
            inGroup = !0, reStr += "(";
            break;
          }

         case "}":
          if (extended) {
            inGroup = !1, reStr += ")";
            break;
          }

         case ",":
          if (inGroup) {
            reStr += "|";
            break;
          }
          reStr += "\\" + c;
          break;

         case "*":
          for (var prevChar = str[i - 1], starCount = 1; "*" === str[i + 1]; ) starCount++, 
          i++;
          var nextChar = str[i + 1];
          if (globstar) starCount > 1 && ("/" === prevChar || void 0 === prevChar) && ("/" === nextChar || void 0 === nextChar) ? (reStr += "((?:[^/]*(?:/|$))*)", 
          i++) : reStr += "([^/]*)"; else reStr += ".*";
          break;

         default:
          reStr += c;
        }
        return flags && ~flags.indexOf("g") || (reStr = "^" + reStr + "$"), new RegExp(reStr, flags);
      };
    },
    458: module => {
      "use strict";
      module.exports = function(obj) {
        if (null === obj || "object" != typeof obj) return obj;
        if (obj instanceof Object) var copy = {
          __proto__: getPrototypeOf(obj)
        }; else copy = Object.create(null);
        return Object.getOwnPropertyNames(obj).forEach((function(key) {
          Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
        })), copy;
      };
      var getPrototypeOf = Object.getPrototypeOf || function(obj) {
        return obj.__proto__;
      };
    },
    77: (module, __unused_webpack_exports, __webpack_require__) => {
      var gracefulQueue, previousSymbol, fs = __webpack_require__(147), polyfills = __webpack_require__(161), legacy = __webpack_require__(520), clone = __webpack_require__(458), util = __webpack_require__(837);
      function publishQueue(context, queue) {
        Object.defineProperty(context, gracefulQueue, {
          get: function() {
            return queue;
          }
        });
      }
      "function" == typeof Symbol && "function" == typeof Symbol.for ? (gracefulQueue = Symbol.for("graceful-fs.queue"), 
      previousSymbol = Symbol.for("graceful-fs.previous")) : (gracefulQueue = "___graceful-fs.queue", 
      previousSymbol = "___graceful-fs.previous");
      var retryTimer, debug = function() {};
      if (util.debuglog ? debug = util.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: "), console.error(m);
      }), !fs[gracefulQueue]) {
        var queue = global[gracefulQueue] || [];
        publishQueue(fs, queue), fs.close = function(fs$close) {
          function close(fd, cb) {
            return fs$close.call(fs, fd, (function(err) {
              err || resetQueue(), "function" == typeof cb && cb.apply(this, arguments);
            }));
          }
          return Object.defineProperty(close, previousSymbol, {
            value: fs$close
          }), close;
        }(fs.close), fs.closeSync = function(fs$closeSync) {
          function closeSync(fd) {
            fs$closeSync.apply(fs, arguments), resetQueue();
          }
          return Object.defineProperty(closeSync, previousSymbol, {
            value: fs$closeSync
          }), closeSync;
        }(fs.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", (function() {
          debug(fs[gracefulQueue]), __webpack_require__(491).equal(fs[gracefulQueue].length, 0);
        }));
      }
      function patch(fs) {
        polyfills(fs), fs.gracefulify = patch, fs.createReadStream = function(path, options) {
          return new fs.ReadStream(path, options);
        }, fs.createWriteStream = function(path, options) {
          return new fs.WriteStream(path, options);
        };
        var fs$readFile = fs.readFile;
        fs.readFile = function(path, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          return function go$readFile(path, options, cb, startTime) {
            return fs$readFile(path, options, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$readFile, [ path, options, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, options, cb);
        };
        var fs$writeFile = fs.writeFile;
        fs.writeFile = function(path, data, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          return function go$writeFile(path, data, options, cb, startTime) {
            return fs$writeFile(path, data, options, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$writeFile, [ path, data, options, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, data, options, cb);
        };
        var fs$appendFile = fs.appendFile;
        fs$appendFile && (fs.appendFile = function(path, data, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          return function go$appendFile(path, data, options, cb, startTime) {
            return fs$appendFile(path, data, options, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$appendFile, [ path, data, options, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, data, options, cb);
        });
        var fs$copyFile = fs.copyFile;
        fs$copyFile && (fs.copyFile = function(src, dest, flags, cb) {
          "function" == typeof flags && (cb = flags, flags = 0);
          return function go$copyFile(src, dest, flags, cb, startTime) {
            return fs$copyFile(src, dest, flags, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$copyFile, [ src, dest, flags, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(src, dest, flags, cb);
        });
        var fs$readdir = fs.readdir;
        fs.readdir = function(path, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          var go$readdir = noReaddirOptionVersions.test(process.version) ? function(path, options, cb, startTime) {
            return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
          } : function(path, options, cb, startTime) {
            return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
          };
          return go$readdir(path, options, cb);
          function fs$readdirCallback(path, options, cb, startTime) {
            return function(err, files) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? (files && files.sort && files.sort(), 
              "function" == typeof cb && cb.call(this, err, files)) : enqueue([ go$readdir, [ path, options, cb ], err, startTime || Date.now(), Date.now() ]);
            };
          }
        };
        var noReaddirOptionVersions = /^v[0-5]\./;
        if ("v0.8" === process.version.substr(0, 4)) {
          var legStreams = legacy(fs);
          ReadStream = legStreams.ReadStream, WriteStream = legStreams.WriteStream;
        }
        var fs$ReadStream = fs.ReadStream;
        fs$ReadStream && (ReadStream.prototype = Object.create(fs$ReadStream.prototype), 
        ReadStream.prototype.open = function() {
          var that = this;
          open(that.path, that.flags, that.mode, (function(err, fd) {
            err ? (that.autoClose && that.destroy(), that.emit("error", err)) : (that.fd = fd, 
            that.emit("open", fd), that.read());
          }));
        });
        var fs$WriteStream = fs.WriteStream;
        fs$WriteStream && (WriteStream.prototype = Object.create(fs$WriteStream.prototype), 
        WriteStream.prototype.open = function() {
          var that = this;
          open(that.path, that.flags, that.mode, (function(err, fd) {
            err ? (that.destroy(), that.emit("error", err)) : (that.fd = fd, that.emit("open", fd));
          }));
        }), Object.defineProperty(fs, "ReadStream", {
          get: function() {
            return ReadStream;
          },
          set: function(val) {
            ReadStream = val;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(fs, "WriteStream", {
          get: function() {
            return WriteStream;
          },
          set: function(val) {
            WriteStream = val;
          },
          enumerable: !0,
          configurable: !0
        });
        var FileReadStream = ReadStream;
        Object.defineProperty(fs, "FileReadStream", {
          get: function() {
            return FileReadStream;
          },
          set: function(val) {
            FileReadStream = val;
          },
          enumerable: !0,
          configurable: !0
        });
        var FileWriteStream = WriteStream;
        function ReadStream(path, options) {
          return this instanceof ReadStream ? (fs$ReadStream.apply(this, arguments), this) : ReadStream.apply(Object.create(ReadStream.prototype), arguments);
        }
        function WriteStream(path, options) {
          return this instanceof WriteStream ? (fs$WriteStream.apply(this, arguments), this) : WriteStream.apply(Object.create(WriteStream.prototype), arguments);
        }
        Object.defineProperty(fs, "FileWriteStream", {
          get: function() {
            return FileWriteStream;
          },
          set: function(val) {
            FileWriteStream = val;
          },
          enumerable: !0,
          configurable: !0
        });
        var fs$open = fs.open;
        function open(path, flags, mode, cb) {
          return "function" == typeof mode && (cb = mode, mode = null), function go$open(path, flags, mode, cb, startTime) {
            return fs$open(path, flags, mode, (function(err, fd) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$open, [ path, flags, mode, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, flags, mode, cb);
        }
        return fs.open = open, fs;
      }
      function enqueue(elem) {
        debug("ENQUEUE", elem[0].name, elem[1]), fs[gracefulQueue].push(elem), retry();
      }
      function resetQueue() {
        for (var now = Date.now(), i = 0; i < fs[gracefulQueue].length; ++i) fs[gracefulQueue][i].length > 2 && (fs[gracefulQueue][i][3] = now, 
        fs[gracefulQueue][i][4] = now);
        retry();
      }
      function retry() {
        if (clearTimeout(retryTimer), retryTimer = void 0, 0 !== fs[gracefulQueue].length) {
          var elem = fs[gracefulQueue].shift(), fn = elem[0], args = elem[1], err = elem[2], startTime = elem[3], lastTime = elem[4];
          if (void 0 === startTime) debug("RETRY", fn.name, args), fn.apply(null, args); else if (Date.now() - startTime >= 6e4) {
            debug("TIMEOUT", fn.name, args);
            var cb = args.pop();
            "function" == typeof cb && cb.call(null, err);
          } else {
            var sinceAttempt = Date.now() - lastTime, sinceStart = Math.max(lastTime - startTime, 1);
            sinceAttempt >= Math.min(1.2 * sinceStart, 100) ? (debug("RETRY", fn.name, args), 
            fn.apply(null, args.concat([ startTime ]))) : fs[gracefulQueue].push(elem);
          }
          void 0 === retryTimer && (retryTimer = setTimeout(retry, 0));
        }
      }
      global[gracefulQueue] || publishQueue(global, fs[gracefulQueue]), module.exports = patch(clone(fs)), 
      process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched && (module.exports = patch(fs), 
      fs.__patched = !0);
    },
    520: (module, __unused_webpack_exports, __webpack_require__) => {
      var Stream = __webpack_require__(781).Stream;
      module.exports = function(fs) {
        return {
          ReadStream: function ReadStream(path, options) {
            if (!(this instanceof ReadStream)) return new ReadStream(path, options);
            Stream.call(this);
            var self = this;
            this.path = path, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", 
            this.mode = 438, this.bufferSize = 65536, options = options || {};
            for (var keys = Object.keys(options), index = 0, length = keys.length; index < length; index++) {
              var key = keys[index];
              this[key] = options[key];
            }
            this.encoding && this.setEncoding(this.encoding);
            if (void 0 !== this.start) {
              if ("number" != typeof this.start) throw TypeError("start must be a Number");
              if (void 0 === this.end) this.end = 1 / 0; else if ("number" != typeof this.end) throw TypeError("end must be a Number");
              if (this.start > this.end) throw new Error("start must be <= end");
              this.pos = this.start;
            }
            if (null !== this.fd) return void process.nextTick((function() {
              self._read();
            }));
            fs.open(this.path, this.flags, this.mode, (function(err, fd) {
              if (err) return self.emit("error", err), void (self.readable = !1);
              self.fd = fd, self.emit("open", fd), self._read();
            }));
          },
          WriteStream: function WriteStream(path, options) {
            if (!(this instanceof WriteStream)) return new WriteStream(path, options);
            Stream.call(this), this.path = path, this.fd = null, this.writable = !0, this.flags = "w", 
            this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, options = options || {};
            for (var keys = Object.keys(options), index = 0, length = keys.length; index < length; index++) {
              var key = keys[index];
              this[key] = options[key];
            }
            if (void 0 !== this.start) {
              if ("number" != typeof this.start) throw TypeError("start must be a Number");
              if (this.start < 0) throw new Error("start must be >= zero");
              this.pos = this.start;
            }
            this.busy = !1, this._queue = [], null === this.fd && (this._open = fs.open, this._queue.push([ this._open, this.path, this.flags, this.mode, void 0 ]), 
            this.flush());
          }
        };
      };
    },
    161: (module, __unused_webpack_exports, __webpack_require__) => {
      var constants = __webpack_require__(57), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
      process.cwd = function() {
        return cwd || (cwd = origCwd.call(process)), cwd;
      };
      try {
        process.cwd();
      } catch (er) {}
      if ("function" == typeof process.chdir) {
        var chdir = process.chdir;
        process.chdir = function(d) {
          cwd = null, chdir.call(process, d);
        }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, chdir);
      }
      module.exports = function(fs) {
        constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && function(fs) {
          fs.lchmod = function(path, mode, callback) {
            fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, (function(err, fd) {
              err ? callback && callback(err) : fs.fchmod(fd, mode, (function(err) {
                fs.close(fd, (function(err2) {
                  callback && callback(err || err2);
                }));
              }));
            }));
          }, fs.lchmodSync = function(path, mode) {
            var ret, fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode), threw = !0;
            try {
              ret = fs.fchmodSync(fd, mode), threw = !1;
            } finally {
              if (threw) try {
                fs.closeSync(fd);
              } catch (er) {} else fs.closeSync(fd);
            }
            return ret;
          };
        }(fs);
        fs.lutimes || function(fs) {
          constants.hasOwnProperty("O_SYMLINK") && fs.futimes ? (fs.lutimes = function(path, at, mt, cb) {
            fs.open(path, constants.O_SYMLINK, (function(er, fd) {
              er ? cb && cb(er) : fs.futimes(fd, at, mt, (function(er) {
                fs.close(fd, (function(er2) {
                  cb && cb(er || er2);
                }));
              }));
            }));
          }, fs.lutimesSync = function(path, at, mt) {
            var ret, fd = fs.openSync(path, constants.O_SYMLINK), threw = !0;
            try {
              ret = fs.futimesSync(fd, at, mt), threw = !1;
            } finally {
              if (threw) try {
                fs.closeSync(fd);
              } catch (er) {} else fs.closeSync(fd);
            }
            return ret;
          }) : fs.futimes && (fs.lutimes = function(_a, _b, _c, cb) {
            cb && process.nextTick(cb);
          }, fs.lutimesSync = function() {});
        }(fs);
        fs.chown = chownFix(fs.chown), fs.fchown = chownFix(fs.fchown), fs.lchown = chownFix(fs.lchown), 
        fs.chmod = chmodFix(fs.chmod), fs.fchmod = chmodFix(fs.fchmod), fs.lchmod = chmodFix(fs.lchmod), 
        fs.chownSync = chownFixSync(fs.chownSync), fs.fchownSync = chownFixSync(fs.fchownSync), 
        fs.lchownSync = chownFixSync(fs.lchownSync), fs.chmodSync = chmodFixSync(fs.chmodSync), 
        fs.fchmodSync = chmodFixSync(fs.fchmodSync), fs.lchmodSync = chmodFixSync(fs.lchmodSync), 
        fs.stat = statFix(fs.stat), fs.fstat = statFix(fs.fstat), fs.lstat = statFix(fs.lstat), 
        fs.statSync = statFixSync(fs.statSync), fs.fstatSync = statFixSync(fs.fstatSync), 
        fs.lstatSync = statFixSync(fs.lstatSync), fs.chmod && !fs.lchmod && (fs.lchmod = function(path, mode, cb) {
          cb && process.nextTick(cb);
        }, fs.lchmodSync = function() {});
        fs.chown && !fs.lchown && (fs.lchown = function(path, uid, gid, cb) {
          cb && process.nextTick(cb);
        }, fs.lchownSync = function() {});
        "win32" === platform && (fs.rename = "function" != typeof fs.rename ? fs.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now(), backoff = 0;
            fs$rename(from, to, (function CB(er) {
              if (er && ("EACCES" === er.code || "EPERM" === er.code) && Date.now() - start < 6e4) return setTimeout((function() {
                fs.stat(to, (function(stater, st) {
                  stater && "ENOENT" === stater.code ? fs$rename(from, to, CB) : cb(er);
                }));
              }), backoff), void (backoff < 100 && (backoff += 10));
              cb && cb(er);
            }));
          }
          return Object.setPrototypeOf && Object.setPrototypeOf(rename, fs$rename), rename;
        }(fs.rename));
        function chmodFix(orig) {
          return orig ? function(target, mode, cb) {
            return orig.call(fs, target, mode, (function(er) {
              chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
            }));
          } : orig;
        }
        function chmodFixSync(orig) {
          return orig ? function(target, mode) {
            try {
              return orig.call(fs, target, mode);
            } catch (er) {
              if (!chownErOk(er)) throw er;
            }
          } : orig;
        }
        function chownFix(orig) {
          return orig ? function(target, uid, gid, cb) {
            return orig.call(fs, target, uid, gid, (function(er) {
              chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
            }));
          } : orig;
        }
        function chownFixSync(orig) {
          return orig ? function(target, uid, gid) {
            try {
              return orig.call(fs, target, uid, gid);
            } catch (er) {
              if (!chownErOk(er)) throw er;
            }
          } : orig;
        }
        function statFix(orig) {
          return orig ? function(target, options, cb) {
            function callback(er, stats) {
              stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), 
              cb && cb.apply(this, arguments);
            }
            return "function" == typeof options && (cb = options, options = null), options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
          } : orig;
        }
        function statFixSync(orig) {
          return orig ? function(target, options) {
            var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
            return stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), 
            stats;
          } : orig;
        }
        function chownErOk(er) {
          return !er || ("ENOSYS" === er.code || !(process.getuid && 0 === process.getuid() || "EINVAL" !== er.code && "EPERM" !== er.code));
        }
        fs.read = "function" != typeof fs.read ? fs.read : function(fs$read) {
          function read(fd, buffer, offset, length, position, callback_) {
            var callback;
            if (callback_ && "function" == typeof callback_) {
              var eagCounter = 0;
              callback = function(er, _, __) {
                if (er && "EAGAIN" === er.code && eagCounter < 10) return eagCounter++, fs$read.call(fs, fd, buffer, offset, length, position, callback);
                callback_.apply(this, arguments);
              };
            }
            return fs$read.call(fs, fd, buffer, offset, length, position, callback);
          }
          return Object.setPrototypeOf && Object.setPrototypeOf(read, fs$read), read;
        }(fs.read), fs.readSync = "function" != typeof fs.readSync ? fs.readSync : (fs$readSync = fs.readSync, 
        function(fd, buffer, offset, length, position) {
          for (var eagCounter = 0; ;) try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position);
          } catch (er) {
            if ("EAGAIN" === er.code && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        });
        var fs$readSync;
      };
    },
    723: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const getWatcherManager = __webpack_require__(114), LinkResolver = __webpack_require__(913), EventEmitter = __webpack_require__(361).EventEmitter, globToRegExp = __webpack_require__(700), watchEventSource = __webpack_require__(197), EMPTY_ARRAY = [], EMPTY_OPTIONS = {};
      function addWatchersToSet(watchers, set) {
        for (const ww of watchers) {
          const w = ww.watcher;
          set.has(w.directoryWatcher) || set.add(w.directoryWatcher);
        }
      }
      const stringToRegexp = ignored => {
        const source = globToRegExp(ignored, {
          globstar: !0,
          extended: !0
        }).source;
        return source.slice(0, source.length - 1) + "(?:$|\\/)";
      }, ignoredToFunction = ignored => {
        if (Array.isArray(ignored)) {
          const regexp = new RegExp(ignored.map((i => stringToRegexp(i))).join("|"));
          return x => regexp.test(x.replace(/\\/g, "/"));
        }
        if ("string" == typeof ignored) {
          const regexp = new RegExp(stringToRegexp(ignored));
          return x => regexp.test(x.replace(/\\/g, "/"));
        }
        if (ignored instanceof RegExp) return x => ignored.test(x.replace(/\\/g, "/"));
        if (ignored instanceof Function) return ignored;
        if (ignored) throw new Error(`Invalid option for 'ignored': ${ignored}`);
        return () => !1;
      }, normalizeCache = new WeakMap, cachedNormalizeOptions = options => {
        const cacheEntry = normalizeCache.get(options);
        if (void 0 !== cacheEntry) return cacheEntry;
        const normalized = (options => ({
          followSymlinks: !!options.followSymlinks,
          ignored: ignoredToFunction(options.ignored),
          poll: options.poll
        }))(options);
        return normalizeCache.set(options, normalized), normalized;
      };
      class WatchpackFileWatcher {
        constructor(watchpack, watcher, files) {
          this.files = Array.isArray(files) ? files : [ files ], this.watcher = watcher, watcher.on("initial-missing", (type => {
            for (const file of this.files) watchpack._missing.has(file) || watchpack._onRemove(file, file, type);
          })), watcher.on("change", ((mtime, type) => {
            for (const file of this.files) watchpack._onChange(file, mtime, file, type);
          })), watcher.on("remove", (type => {
            for (const file of this.files) watchpack._onRemove(file, file, type);
          }));
        }
        update(files) {
          Array.isArray(files) ? this.files = files : 1 !== this.files.length ? this.files = [ files ] : this.files[0] !== files && (this.files[0] = files);
        }
        close() {
          this.watcher.close();
        }
      }
      class WatchpackDirectoryWatcher {
        constructor(watchpack, watcher, directories) {
          this.directories = Array.isArray(directories) ? directories : [ directories ], this.watcher = watcher, 
          watcher.on("initial-missing", (type => {
            for (const item of this.directories) watchpack._onRemove(item, item, type);
          })), watcher.on("change", ((file, mtime, type) => {
            for (const item of this.directories) watchpack._onChange(item, mtime, file, type);
          })), watcher.on("remove", (type => {
            for (const item of this.directories) watchpack._onRemove(item, item, type);
          }));
        }
        update(directories) {
          Array.isArray(directories) ? this.directories = directories : 1 !== this.directories.length ? this.directories = [ directories ] : this.directories[0] !== directories && (this.directories[0] = directories);
        }
        close() {
          this.watcher.close();
        }
      }
      module.exports = class extends EventEmitter {
        constructor(options) {
          super(), options || (options = EMPTY_OPTIONS), this.options = options, this.aggregateTimeout = "number" == typeof options.aggregateTimeout ? options.aggregateTimeout : 200, 
          this.watcherOptions = cachedNormalizeOptions(options), this.watcherManager = getWatcherManager(this.watcherOptions), 
          this.fileWatchers = new Map, this.directoryWatchers = new Map, this._missing = new Set, 
          this.startTime = void 0, this.paused = !1, this.aggregatedChanges = new Set, this.aggregatedRemovals = new Set, 
          this.aggregateTimer = void 0, this._onTimeout = this._onTimeout.bind(this);
        }
        watch(arg1, arg2, arg3) {
          let files, directories, missing, startTime;
          arg2 ? (files = arg1, directories = arg2, missing = EMPTY_ARRAY, startTime = arg3) : ({files = EMPTY_ARRAY, directories = EMPTY_ARRAY, missing = EMPTY_ARRAY, startTime} = arg1), 
          this.paused = !1;
          const fileWatchers = this.fileWatchers, directoryWatchers = this.directoryWatchers, ignored = this.watcherOptions.ignored, filter = path => !ignored(path), addToMap = (map, key, item) => {
            const list = map.get(key);
            void 0 === list ? map.set(key, item) : Array.isArray(list) ? list.push(item) : map.set(key, [ list, item ]);
          }, fileWatchersNeeded = new Map, directoryWatchersNeeded = new Map, missingFiles = new Set;
          if (this.watcherOptions.followSymlinks) {
            const resolver = new LinkResolver;
            for (const file of files) if (filter(file)) for (const innerFile of resolver.resolve(file)) (file === innerFile || filter(innerFile)) && addToMap(fileWatchersNeeded, innerFile, file);
            for (const file of missing) if (filter(file)) for (const innerFile of resolver.resolve(file)) (file === innerFile || filter(innerFile)) && (missingFiles.add(file), 
            addToMap(fileWatchersNeeded, innerFile, file));
            for (const dir of directories) if (filter(dir)) {
              let first = !0;
              for (const innerItem of resolver.resolve(dir)) filter(innerItem) && addToMap(first ? directoryWatchersNeeded : fileWatchersNeeded, innerItem, dir), 
              first = !1;
            }
          } else {
            for (const file of files) filter(file) && addToMap(fileWatchersNeeded, file, file);
            for (const file of missing) filter(file) && (missingFiles.add(file), addToMap(fileWatchersNeeded, file, file));
            for (const dir of directories) filter(dir) && addToMap(directoryWatchersNeeded, dir, dir);
          }
          for (const [key, w] of fileWatchers) {
            const needed = fileWatchersNeeded.get(key);
            void 0 === needed ? (w.close(), fileWatchers.delete(key)) : (w.update(needed), fileWatchersNeeded.delete(key));
          }
          for (const [key, w] of directoryWatchers) {
            const needed = directoryWatchersNeeded.get(key);
            void 0 === needed ? (w.close(), directoryWatchers.delete(key)) : (w.update(needed), 
            directoryWatchersNeeded.delete(key));
          }
          watchEventSource.batch((() => {
            for (const [key, files] of fileWatchersNeeded) {
              const watcher = this.watcherManager.watchFile(key, startTime);
              watcher && fileWatchers.set(key, new WatchpackFileWatcher(this, watcher, files));
            }
            for (const [key, directories] of directoryWatchersNeeded) {
              const watcher = this.watcherManager.watchDirectory(key, startTime);
              watcher && directoryWatchers.set(key, new WatchpackDirectoryWatcher(this, watcher, directories));
            }
          })), this._missing = missingFiles, this.startTime = startTime;
        }
        close() {
          this.paused = !0, this.aggregateTimer && clearTimeout(this.aggregateTimer);
          for (const w of this.fileWatchers.values()) w.close();
          for (const w of this.directoryWatchers.values()) w.close();
          this.fileWatchers.clear(), this.directoryWatchers.clear();
        }
        pause() {
          this.paused = !0, this.aggregateTimer && clearTimeout(this.aggregateTimer);
        }
        getTimes() {
          const directoryWatchers = new Set;
          addWatchersToSet(this.fileWatchers.values(), directoryWatchers), addWatchersToSet(this.directoryWatchers.values(), directoryWatchers);
          const obj = Object.create(null);
          for (const w of directoryWatchers) {
            const times = w.getTimes();
            for (const file of Object.keys(times)) obj[file] = times[file];
          }
          return obj;
        }
        getTimeInfoEntries() {
          const map = new Map;
          return this.collectTimeInfoEntries(map, map), map;
        }
        collectTimeInfoEntries(fileTimestamps, directoryTimestamps) {
          const allWatchers = new Set;
          addWatchersToSet(this.fileWatchers.values(), allWatchers), addWatchersToSet(this.directoryWatchers.values(), allWatchers);
          const safeTime = {
            value: 0
          };
          for (const w of allWatchers) w.collectTimeInfoEntries(fileTimestamps, directoryTimestamps, safeTime);
        }
        getAggregated() {
          this.aggregateTimer && (clearTimeout(this.aggregateTimer), this.aggregateTimer = void 0);
          const changes = this.aggregatedChanges, removals = this.aggregatedRemovals;
          return this.aggregatedChanges = new Set, this.aggregatedRemovals = new Set, {
            changes,
            removals
          };
        }
        _onChange(item, mtime, file, type) {
          file = file || item, this.paused || (this.emit("change", file, mtime, type), this.aggregateTimer && clearTimeout(this.aggregateTimer), 
          this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout)), this.aggregatedRemovals.delete(item), 
          this.aggregatedChanges.add(item);
        }
        _onRemove(item, file, type) {
          file = file || item, this.paused || (this.emit("remove", file, type), this.aggregateTimer && clearTimeout(this.aggregateTimer), 
          this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout)), this.aggregatedChanges.delete(item), 
          this.aggregatedRemovals.add(item);
        }
        _onTimeout() {
          this.aggregateTimer = void 0;
          const changes = this.aggregatedChanges, removals = this.aggregatedRemovals;
          this.aggregatedChanges = new Set, this.aggregatedRemovals = new Set, this.emit("aggregated", changes, removals);
        }
      }, module.exports._globToRegExp = globToRegExp, module.exports._gracefulFs = __webpack_require__(77);
    },
    899: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const EventEmitter = __webpack_require__(361).EventEmitter, fs = __webpack_require__(77), path = __webpack_require__(17), watchEventSource = __webpack_require__(197), EXISTANCE_ONLY_TIME_ENTRY = Object.freeze({});
      let FS_ACCURACY = 2e3;
      const IS_OSX = "darwin" === __webpack_require__(37).platform(), WATCHPACK_POLLING = process.env.WATCHPACK_POLLING, FORCE_POLLING = "" + +WATCHPACK_POLLING === WATCHPACK_POLLING ? +WATCHPACK_POLLING : !!WATCHPACK_POLLING && "false" !== WATCHPACK_POLLING;
      function withoutCase(str) {
        return str.toLowerCase();
      }
      class Watcher extends EventEmitter {
        constructor(directoryWatcher, filePath, startTime) {
          super(), this.directoryWatcher = directoryWatcher, this.path = filePath, this.startTime = startTime && +startTime;
        }
        checkStartTime(mtime, initial) {
          const startTime = this.startTime;
          return "number" != typeof startTime ? !initial : startTime <= mtime;
        }
        close() {
          this.emit("closed");
        }
      }
      function fixupEntryAccuracy(entry) {
        entry.accuracy > FS_ACCURACY && (entry.safeTime = entry.safeTime - entry.accuracy + FS_ACCURACY, 
        entry.accuracy = FS_ACCURACY);
      }
      function ensureFsAccuracy(mtime) {
        mtime && (FS_ACCURACY > 1 && mtime % 1 != 0 ? FS_ACCURACY = 1 : FS_ACCURACY > 10 && mtime % 10 != 0 ? FS_ACCURACY = 10 : FS_ACCURACY > 100 && mtime % 100 != 0 ? FS_ACCURACY = 100 : FS_ACCURACY > 1e3 && mtime % 1e3 != 0 && (FS_ACCURACY = 1e3));
      }
      module.exports = class extends EventEmitter {
        constructor(watcherManager, directoryPath, options) {
          super(), FORCE_POLLING && (options.poll = FORCE_POLLING), this.watcherManager = watcherManager, 
          this.options = options, this.path = directoryPath, this.files = new Map, this.filesWithoutCase = new Map, 
          this.directories = new Map, this.lastWatchEvent = 0, this.initialScan = !0, this.ignored = options.ignored || (() => !1), 
          this.nestedWatching = !1, this.polledWatching = "number" == typeof options.poll ? options.poll : !!options.poll && 5007, 
          this.timeout = void 0, this.initialScanRemoved = new Set, this.initialScanFinished = void 0, 
          this.watchers = new Map, this.parentWatcher = null, this.refs = 0, this._activeEvents = new Map, 
          this.closed = !1, this.scanning = !1, this.scanAgain = !1, this.scanAgainInitial = !1, 
          this.createWatcher(), this.doScan(!0);
        }
        createWatcher() {
          try {
            this.polledWatching ? this.watcher = {
              close: () => {
                this.timeout && (clearTimeout(this.timeout), this.timeout = void 0);
              }
            } : (IS_OSX && this.watchInParentDirectory(), this.watcher = watchEventSource.watch(this.path), 
            this.watcher.on("change", this.onWatchEvent.bind(this)), this.watcher.on("error", this.onWatcherError.bind(this)));
          } catch (err) {
            this.onWatcherError(err);
          }
        }
        forEachWatcher(path, fn) {
          const watchers = this.watchers.get(withoutCase(path));
          if (void 0 !== watchers) for (const w of watchers) fn(w);
        }
        setMissing(itemPath, initial, type) {
          this.initialScan && this.initialScanRemoved.add(itemPath);
          const oldDirectory = this.directories.get(itemPath);
          oldDirectory && (this.nestedWatching && oldDirectory.close(), this.directories.delete(itemPath), 
          this.forEachWatcher(itemPath, (w => w.emit("remove", type))), initial || this.forEachWatcher(this.path, (w => w.emit("change", itemPath, null, type, initial))));
          if (this.files.get(itemPath)) {
            this.files.delete(itemPath);
            const key = withoutCase(itemPath), count = this.filesWithoutCase.get(key) - 1;
            count <= 0 ? (this.filesWithoutCase.delete(key), this.forEachWatcher(itemPath, (w => w.emit("remove", type)))) : this.filesWithoutCase.set(key, count), 
            initial || this.forEachWatcher(this.path, (w => w.emit("change", itemPath, null, type, initial)));
          }
        }
        setFileTime(filePath, mtime, initial, ignoreWhenEqual, type) {
          const now = Date.now();
          if (this.ignored(filePath)) return;
          const old = this.files.get(filePath);
          let safeTime, accuracy;
          if (initial) safeTime = Math.min(now, mtime) + FS_ACCURACY, accuracy = FS_ACCURACY; else if (safeTime = now, 
          accuracy = 0, old && old.timestamp === mtime && mtime + FS_ACCURACY < now) return;
          if (!ignoreWhenEqual || !old || old.timestamp !== mtime) {
            if (this.files.set(filePath, {
              safeTime,
              accuracy,
              timestamp: mtime
            }), old) initial || this.forEachWatcher(filePath, (w => w.emit("change", mtime, type))); else {
              const key = withoutCase(filePath), count = this.filesWithoutCase.get(key);
              this.filesWithoutCase.set(key, (count || 0) + 1), void 0 !== count && this.doScan(!1), 
              this.forEachWatcher(filePath, (w => {
                initial && !w.checkStartTime(safeTime, initial) || w.emit("change", mtime, type);
              }));
            }
            this.forEachWatcher(this.path, (w => {
              initial && !w.checkStartTime(safeTime, initial) || w.emit("change", filePath, safeTime, type, initial);
            }));
          }
        }
        setDirectory(directoryPath, birthtime, initial, type) {
          if (!this.ignored(directoryPath)) if (directoryPath === this.path) initial || this.forEachWatcher(this.path, (w => w.emit("change", directoryPath, birthtime, type, initial))); else {
            if (!this.directories.get(directoryPath)) {
              const now = Date.now();
              let safeTime;
              this.nestedWatching ? this.createNestedWatcher(directoryPath) : this.directories.set(directoryPath, !0), 
              safeTime = initial ? Math.min(now, birthtime) + FS_ACCURACY : now, this.forEachWatcher(directoryPath, (w => {
                initial && !w.checkStartTime(safeTime, !1) || w.emit("change", birthtime, type);
              })), this.forEachWatcher(this.path, (w => {
                initial && !w.checkStartTime(safeTime, initial) || w.emit("change", directoryPath, safeTime, type, initial);
              }));
            }
          }
        }
        createNestedWatcher(directoryPath) {
          const watcher = this.watcherManager.watchDirectory(directoryPath, 1);
          watcher.on("change", ((filePath, mtime, type, initial) => {
            this.forEachWatcher(this.path, (w => {
              initial && !w.checkStartTime(mtime, initial) || w.emit("change", filePath, mtime, type, initial);
            }));
          })), this.directories.set(directoryPath, watcher);
        }
        setNestedWatching(flag) {
          if (this.nestedWatching !== !!flag) if (this.nestedWatching = !!flag, this.nestedWatching) for (const directory of this.directories.keys()) this.createNestedWatcher(directory); else for (const [directory, watcher] of this.directories) watcher.close(), 
          this.directories.set(directory, !0);
        }
        watch(filePath, startTime) {
          const key = withoutCase(filePath);
          let watchers = this.watchers.get(key);
          void 0 === watchers && (watchers = new Set, this.watchers.set(key, watchers)), this.refs++;
          const watcher = new Watcher(this, filePath, startTime);
          let safeTime;
          if (watcher.on("closed", (() => {
            --this.refs <= 0 ? this.close() : (watchers.delete(watcher), 0 === watchers.size && (this.watchers.delete(key), 
            this.path === filePath && this.setNestedWatching(!1)));
          })), watchers.add(watcher), filePath === this.path) {
            this.setNestedWatching(!0), safeTime = this.lastWatchEvent;
            for (const entry of this.files.values()) fixupEntryAccuracy(entry), safeTime = Math.max(safeTime, entry.safeTime);
          } else {
            const entry = this.files.get(filePath);
            entry ? (fixupEntryAccuracy(entry), safeTime = entry.safeTime) : safeTime = 0;
          }
          return safeTime ? safeTime >= startTime && process.nextTick((() => {
            this.closed || (filePath === this.path ? watcher.emit("change", filePath, safeTime, "watch (outdated on attach)", !0) : watcher.emit("change", safeTime, "watch (outdated on attach)", !0));
          })) : this.initialScan ? this.initialScanRemoved.has(filePath) && process.nextTick((() => {
            this.closed || watcher.emit("remove");
          })) : !this.directories.has(filePath) && watcher.checkStartTime(this.initialScanFinished, !1) && process.nextTick((() => {
            this.closed || watcher.emit("initial-missing", "watch (missing on attach)");
          })), watcher;
        }
        onWatchEvent(eventType, filename) {
          if (this.closed) return;
          if (!filename) return void this.doScan(!1);
          const filePath = path.join(this.path, filename);
          if (!this.ignored(filePath)) if (void 0 === this._activeEvents.get(filename)) {
            this._activeEvents.set(filename, !1);
            const checkStats = () => {
              this.closed || (this._activeEvents.set(filename, !1), fs.lstat(filePath, ((err, stats) => {
                this.closed || (!0 !== this._activeEvents.get(filename) ? (this._activeEvents.delete(filename), 
                err && ("ENOENT" !== err.code && "EPERM" !== err.code && "EBUSY" !== err.code ? this.onStatsError(err) : filename === path.basename(this.path) && (fs.existsSync(this.path) || this.onDirectoryRemoved("stat failed"))), 
                this.lastWatchEvent = Date.now(), stats ? stats.isDirectory() ? this.setDirectory(filePath, +stats.birthtime || 1, !1, eventType) : (stats.isFile() || stats.isSymbolicLink()) && (stats.mtime && ensureFsAccuracy(stats.mtime), 
                this.setFileTime(filePath, +stats.mtime || +stats.ctime || 1, !1, !1, eventType)) : this.setMissing(filePath, !1, eventType)) : process.nextTick(checkStats));
              })));
            };
            process.nextTick(checkStats);
          } else this._activeEvents.set(filename, !0);
        }
        onWatcherError(err) {
          this.closed || err && ("EPERM" !== err.code && "ENOENT" !== err.code && console.error("Watchpack Error (watcher): " + err), 
          this.onDirectoryRemoved("watch error"));
        }
        onStatsError(err) {
          err && console.error("Watchpack Error (stats): " + err);
        }
        onScanError(err) {
          err && console.error("Watchpack Error (initial scan): " + err), this.onScanFinished();
        }
        onScanFinished() {
          this.polledWatching && (this.timeout = setTimeout((() => {
            this.closed || this.doScan(!1);
          }), this.polledWatching));
        }
        onDirectoryRemoved(reason) {
          this.watcher && (this.watcher.close(), this.watcher = null), this.watchInParentDirectory();
          const type = `directory-removed (${reason})`;
          for (const directory of this.directories.keys()) this.setMissing(directory, null, type);
          for (const file of this.files.keys()) this.setMissing(file, null, type);
        }
        watchInParentDirectory() {
          if (!this.parentWatcher) {
            const parentDir = path.dirname(this.path);
            if (path.dirname(parentDir) === parentDir) return;
            this.parentWatcher = this.watcherManager.watchFile(this.path, 1), this.parentWatcher.on("change", ((mtime, type) => {
              this.closed || (IS_OSX && !this.polledWatching || !this.parentWatcher || (this.parentWatcher.close(), 
              this.parentWatcher = null), this.watcher || (this.createWatcher(), this.doScan(!1), 
              this.forEachWatcher(this.path, (w => w.emit("change", this.path, mtime, type, !1)))));
            })), this.parentWatcher.on("remove", (() => {
              this.onDirectoryRemoved("parent directory removed");
            }));
          }
        }
        doScan(initial) {
          this.scanning ? this.scanAgain ? initial || (this.scanAgainInitial = !1) : (this.scanAgain = !0, 
          this.scanAgainInitial = initial) : (this.scanning = !0, this.timeout && (clearTimeout(this.timeout), 
          this.timeout = void 0), process.nextTick((() => {
            this.closed || fs.readdir(this.path, ((err, items) => {
              if (this.closed) return;
              if (err) {
                if ("ENOENT" === err.code || "EPERM" === err.code ? this.onDirectoryRemoved("scan readdir failed") : this.onScanError(err), 
                this.initialScan = !1, this.initialScanFinished = Date.now(), initial) for (const watchers of this.watchers.values()) for (const watcher of watchers) watcher.checkStartTime(this.initialScanFinished, !1) && watcher.emit("initial-missing", "scan (parent directory missing in initial scan)");
                return void (this.scanAgain ? (this.scanAgain = !1, this.doScan(this.scanAgainInitial)) : this.scanning = !1);
              }
              const itemPaths = new Set(items.map((item => path.join(this.path, item.normalize("NFC")))));
              for (const file of this.files.keys()) itemPaths.has(file) || this.setMissing(file, initial, "scan (missing)");
              for (const directory of this.directories.keys()) itemPaths.has(directory) || this.setMissing(directory, initial, "scan (missing)");
              if (this.scanAgain) return this.scanAgain = !1, void this.doScan(initial);
              const itemFinished = (times = itemPaths.size + 1, callback = () => {
                if (!this.closed) {
                  if (this.initialScan = !1, this.initialScanRemoved = null, this.initialScanFinished = Date.now(), 
                  initial) {
                    const missingWatchers = new Map(this.watchers);
                    missingWatchers.delete(withoutCase(this.path));
                    for (const item of itemPaths) missingWatchers.delete(withoutCase(item));
                    for (const watchers of missingWatchers.values()) for (const watcher of watchers) watcher.checkStartTime(this.initialScanFinished, !1) && watcher.emit("initial-missing", "scan (missing in initial scan)");
                  }
                  this.scanAgain ? (this.scanAgain = !1, this.doScan(this.scanAgainInitial)) : (this.scanning = !1, 
                  this.onScanFinished());
                }
              }, function() {
                if (0 == --times) return callback();
              });
              var times, callback;
              for (const itemPath of itemPaths) fs.lstat(itemPath, ((err2, stats) => {
                if (!this.closed) {
                  if (err2) return "ENOENT" === err2.code || "EPERM" === err2.code || "EACCES" === err2.code || "EBUSY" === err2.code ? this.setMissing(itemPath, initial, "scan (" + err2.code + ")") : this.onScanError(err2), 
                  void itemFinished();
                  stats.isFile() || stats.isSymbolicLink() ? (stats.mtime && ensureFsAccuracy(stats.mtime), 
                  this.setFileTime(itemPath, +stats.mtime || +stats.ctime || 1, initial, !0, "scan (file)")) : stats.isDirectory() && (initial && this.directories.has(itemPath) || this.setDirectory(itemPath, +stats.birthtime || 1, initial, "scan (dir)")), 
                  itemFinished();
                }
              }));
              itemFinished();
            }));
          })));
        }
        getTimes() {
          const obj = Object.create(null);
          let safeTime = this.lastWatchEvent;
          for (const [file, entry] of this.files) fixupEntryAccuracy(entry), safeTime = Math.max(safeTime, entry.safeTime), 
          obj[file] = Math.max(entry.safeTime, entry.timestamp);
          if (this.nestedWatching) {
            for (const w of this.directories.values()) {
              const times = w.directoryWatcher.getTimes();
              for (const file of Object.keys(times)) {
                const time = times[file];
                safeTime = Math.max(safeTime, time), obj[file] = time;
              }
            }
            obj[this.path] = safeTime;
          }
          if (!this.initialScan) for (const watchers of this.watchers.values()) for (const watcher of watchers) {
            const path = watcher.path;
            Object.prototype.hasOwnProperty.call(obj, path) || (obj[path] = null);
          }
          return obj;
        }
        collectTimeInfoEntries(fileTimestamps, directoryTimestamps) {
          let safeTime = this.lastWatchEvent;
          for (const [file, entry] of this.files) fixupEntryAccuracy(entry), safeTime = Math.max(safeTime, entry.safeTime), 
          fileTimestamps.set(file, entry);
          if (this.nestedWatching) {
            for (const w of this.directories.values()) safeTime = Math.max(safeTime, w.directoryWatcher.collectTimeInfoEntries(fileTimestamps, directoryTimestamps));
            fileTimestamps.set(this.path, EXISTANCE_ONLY_TIME_ENTRY), directoryTimestamps.set(this.path, {
              safeTime
            });
          } else {
            for (const dir of this.directories.keys()) fileTimestamps.set(dir, EXISTANCE_ONLY_TIME_ENTRY), 
            directoryTimestamps.has(dir) || directoryTimestamps.set(dir, EXISTANCE_ONLY_TIME_ENTRY);
            fileTimestamps.set(this.path, EXISTANCE_ONLY_TIME_ENTRY), directoryTimestamps.set(this.path, EXISTANCE_ONLY_TIME_ENTRY);
          }
          if (!this.initialScan) for (const watchers of this.watchers.values()) for (const watcher of watchers) {
            const path = watcher.path;
            fileTimestamps.has(path) || fileTimestamps.set(path, null);
          }
          return safeTime;
        }
        close() {
          if (this.closed = !0, this.initialScan = !1, this.watcher && (this.watcher.close(), 
          this.watcher = null), this.nestedWatching) {
            for (const w of this.directories.values()) w.close();
            this.directories.clear();
          }
          this.parentWatcher && (this.parentWatcher.close(), this.parentWatcher = null), this.emit("closed");
        }
      }, module.exports.EXISTANCE_ONLY_TIME_ENTRY = EXISTANCE_ONLY_TIME_ENTRY;
    },
    913: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(147), path = __webpack_require__(17), EXPECTED_ERRORS = new Set([ "EINVAL", "ENOENT" ]);
      "win32" === process.platform && EXPECTED_ERRORS.add("UNKNOWN");
      module.exports = class {
        constructor() {
          this.cache = new Map;
        }
        resolve(file) {
          const cacheEntry = this.cache.get(file);
          if (void 0 !== cacheEntry) return cacheEntry;
          const parent = path.dirname(file);
          if (parent === file) {
            const result = Object.freeze([ file ]);
            return this.cache.set(file, result), result;
          }
          const parentResolved = this.resolve(parent);
          let realFile = file;
          if (parentResolved[0] !== parent) {
            const basename = path.basename(file);
            realFile = path.resolve(parentResolved[0], basename);
          }
          try {
            const linkContent = fs.readlinkSync(realFile), resolvedLink = path.resolve(parentResolved[0], linkContent), linkResolved = this.resolve(resolvedLink);
            let result;
            if (linkResolved.length > 1 && parentResolved.length > 1) {
              const resultSet = new Set(linkResolved);
              resultSet.add(realFile);
              for (let i = 1; i < parentResolved.length; i++) resultSet.add(parentResolved[i]);
              result = Object.freeze(Array.from(resultSet));
            } else parentResolved.length > 1 ? (result = parentResolved.slice(), result[0] = linkResolved[0], 
            result.push(realFile), Object.freeze(result)) : linkResolved.length > 1 ? (result = linkResolved.slice(), 
            result.push(realFile), Object.freeze(result)) : result = Object.freeze([ linkResolved[0], realFile ]);
            return this.cache.set(file, result), result;
          } catch (e) {
            if (!EXPECTED_ERRORS.has(e.code)) throw e;
            const result = parentResolved.slice();
            return result[0] = realFile, Object.freeze(result), this.cache.set(file, result), 
            result;
          }
        }
      };
    },
    114: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), DirectoryWatcher = __webpack_require__(899);
      class WatcherManager {
        constructor(options) {
          this.options = options, this.directoryWatchers = new Map;
        }
        getDirectoryWatcher(directory) {
          const watcher = this.directoryWatchers.get(directory);
          if (void 0 === watcher) {
            const newWatcher = new DirectoryWatcher(this, directory, this.options);
            return this.directoryWatchers.set(directory, newWatcher), newWatcher.on("closed", (() => {
              this.directoryWatchers.delete(directory);
            })), newWatcher;
          }
          return watcher;
        }
        watchFile(p, startTime) {
          const directory = path.dirname(p);
          return directory === p ? null : this.getDirectoryWatcher(directory).watch(p, startTime);
        }
        watchDirectory(directory, startTime) {
          return this.getDirectoryWatcher(directory).watch(directory, startTime);
        }
      }
      const watcherManagers = new WeakMap;
      module.exports = options => {
        const watcherManager = watcherManagers.get(options);
        if (void 0 !== watcherManager) return watcherManager;
        const newWatcherManager = new WatcherManager(options);
        return watcherManagers.set(options, newWatcherManager), newWatcherManager;
      }, module.exports.WatcherManager = WatcherManager;
    },
    295: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17);
      module.exports = (plan, limit) => {
        const treeMap = new Map;
        for (const [filePath, value] of plan) treeMap.set(filePath, {
          filePath,
          parent: void 0,
          children: void 0,
          entries: 1,
          active: !0,
          value
        });
        let currentCount = treeMap.size;
        for (const node of treeMap.values()) {
          const parentPath = path.dirname(node.filePath);
          if (parentPath !== node.filePath) {
            let parent = treeMap.get(parentPath);
            if (void 0 === parent) parent = {
              filePath: parentPath,
              parent: void 0,
              children: [ node ],
              entries: node.entries,
              active: !1,
              value: void 0
            }, treeMap.set(parentPath, parent), node.parent = parent; else {
              node.parent = parent, void 0 === parent.children ? parent.children = [ node ] : parent.children.push(node);
              do {
                parent.entries += node.entries, parent = parent.parent;
              } while (parent);
            }
          }
        }
        for (;currentCount > limit; ) {
          const overLimit = currentCount - limit;
          let bestNode, bestCost = 1 / 0;
          for (const node of treeMap.values()) {
            if (node.entries <= 1 || !node.children || !node.parent) continue;
            if (0 === node.children.length) continue;
            if (1 === node.children.length && !node.value) continue;
            const cost = node.entries - 1 >= overLimit ? node.entries - 1 - overLimit : overLimit - node.entries + 1 + .3 * limit;
            cost < bestCost && (bestNode = node, bestCost = cost);
          }
          if (!bestNode) break;
          const reduction = bestNode.entries - 1;
          bestNode.active = !0, bestNode.entries = 1, currentCount -= reduction;
          let parent = bestNode.parent;
          for (;parent; ) parent.entries -= reduction, parent = parent.parent;
          const queue = new Set(bestNode.children);
          for (const node of queue) if (node.active = !1, node.entries = 0, node.children) for (const child of node.children) queue.add(child);
        }
        const newPlan = new Map;
        for (const rootNode of treeMap.values()) {
          if (!rootNode.active) continue;
          const map = new Map, queue = new Set([ rootNode ]);
          for (const node of queue) if (!node.active || node === rootNode) {
            if (node.value) if (Array.isArray(node.value)) for (const item of node.value) map.set(item, node.filePath); else map.set(node.value, node.filePath);
            if (node.children) for (const child of node.children) queue.add(child);
          }
          newPlan.set(rootNode.filePath, map);
        }
        return newPlan;
      };
    },
    197: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(147), path = __webpack_require__(17), {EventEmitter} = __webpack_require__(361), reducePlan = __webpack_require__(295), IS_OSX = "darwin" === __webpack_require__(37).platform(), IS_WIN = "win32" === __webpack_require__(37).platform(), SUPPORTS_RECURSIVE_WATCHING = IS_OSX || IS_WIN, watcherLimit = +process.env.WATCHPACK_WATCHER_LIMIT || (IS_OSX ? 2e3 : 1e4), recursiveWatcherLogging = !!process.env.WATCHPACK_RECURSIVE_WATCHER_LOGGING;
      let isBatch = !1, watcherCount = 0;
      const pendingWatchers = new Map, recursiveWatchers = new Map, directWatchers = new Map, underlyingWatcher = new Map;
      class DirectWatcher {
        constructor(filePath) {
          this.filePath = filePath, this.watchers = new Set, this.watcher = void 0;
          try {
            const watcher = fs.watch(filePath);
            this.watcher = watcher, watcher.on("change", ((type, filename) => {
              for (const w of this.watchers) w.emit("change", type, filename);
            })), watcher.on("error", (error => {
              for (const w of this.watchers) w.emit("error", error);
            }));
          } catch (err) {
            process.nextTick((() => {
              for (const w of this.watchers) w.emit("error", err);
            }));
          }
          watcherCount++;
        }
        add(watcher) {
          underlyingWatcher.set(watcher, this), this.watchers.add(watcher);
        }
        remove(watcher) {
          this.watchers.delete(watcher), 0 === this.watchers.size && (directWatchers.delete(this.filePath), 
          watcherCount--, this.watcher && this.watcher.close());
        }
        getWatchers() {
          return this.watchers;
        }
      }
      class RecursiveWatcher {
        constructor(rootPath) {
          this.rootPath = rootPath, this.mapWatcherToPath = new Map, this.mapPathToWatchers = new Map, 
          this.watcher = void 0;
          try {
            const watcher = fs.watch(rootPath, {
              recursive: !0
            });
            this.watcher = watcher, watcher.on("change", ((type, filename) => {
              if (filename) {
                const dir = path.dirname(filename), watchers = this.mapPathToWatchers.get(dir);
                if (recursiveWatcherLogging && process.stderr.write(`[watchpack] dispatch ${type} event in recursive watcher (${this.rootPath}) for '${filename}' to ${watchers ? watchers.size : 0} watchers\n`), 
                void 0 === watchers) return;
                for (const w of watchers) w.emit("change", type, path.basename(filename));
              } else {
                recursiveWatcherLogging && process.stderr.write(`[watchpack] dispatch ${type} event in recursive watcher (${this.rootPath}) to all watchers\n`);
                for (const w of this.mapWatcherToPath.keys()) w.emit("change", type);
              }
            })), watcher.on("error", (error => {
              for (const w of this.mapWatcherToPath.keys()) w.emit("error", error);
            }));
          } catch (err) {
            process.nextTick((() => {
              for (const w of this.mapWatcherToPath.keys()) w.emit("error", err);
            }));
          }
          watcherCount++, recursiveWatcherLogging && process.stderr.write(`[watchpack] created recursive watcher at ${rootPath}\n`);
        }
        add(filePath, watcher) {
          underlyingWatcher.set(watcher, this);
          const subpath = filePath.slice(this.rootPath.length + 1) || ".";
          this.mapWatcherToPath.set(watcher, subpath);
          const set = this.mapPathToWatchers.get(subpath);
          if (void 0 === set) {
            const newSet = new Set;
            newSet.add(watcher), this.mapPathToWatchers.set(subpath, newSet);
          } else set.add(watcher);
        }
        remove(watcher) {
          const subpath = this.mapWatcherToPath.get(watcher);
          if (!subpath) return;
          this.mapWatcherToPath.delete(watcher);
          const set = this.mapPathToWatchers.get(subpath);
          set.delete(watcher), 0 === set.size && this.mapPathToWatchers.delete(subpath), 0 === this.mapWatcherToPath.size && (recursiveWatchers.delete(this.rootPath), 
          watcherCount--, this.watcher && this.watcher.close(), recursiveWatcherLogging && process.stderr.write(`[watchpack] closed recursive watcher at ${this.rootPath}\n`));
        }
        getWatchers() {
          return this.mapWatcherToPath;
        }
      }
      class Watcher extends EventEmitter {
        close() {
          if (pendingWatchers.has(this)) return void pendingWatchers.delete(this);
          underlyingWatcher.get(this).remove(this), underlyingWatcher.delete(this);
        }
      }
      const createDirectWatcher = filePath => {
        const existing = directWatchers.get(filePath);
        if (void 0 !== existing) return existing;
        const w = new DirectWatcher(filePath);
        return directWatchers.set(filePath, w), w;
      }, createRecursiveWatcher = rootPath => {
        const existing = recursiveWatchers.get(rootPath);
        if (void 0 !== existing) return existing;
        const w = new RecursiveWatcher(rootPath);
        return recursiveWatchers.set(rootPath, w), w;
      }, execute = () => {
        const map = new Map, addWatcher = (watcher, filePath) => {
          const entry = map.get(filePath);
          void 0 === entry ? map.set(filePath, watcher) : Array.isArray(entry) ? entry.push(watcher) : map.set(filePath, [ entry, watcher ]);
        };
        for (const [watcher, filePath] of pendingWatchers) addWatcher(watcher, filePath);
        if (pendingWatchers.clear(), !SUPPORTS_RECURSIVE_WATCHING || watcherLimit - watcherCount >= map.size) {
          for (const [filePath, entry] of map) {
            const w = createDirectWatcher(filePath);
            if (Array.isArray(entry)) for (const item of entry) w.add(item); else w.add(entry);
          }
          return;
        }
        for (const watcher of recursiveWatchers.values()) for (const [w, subpath] of watcher.getWatchers()) addWatcher(w, path.join(watcher.rootPath, subpath));
        for (const watcher of directWatchers.values()) for (const w of watcher.getWatchers()) addWatcher(w, watcher.filePath);
        const plan = reducePlan(map, .9 * watcherLimit);
        for (const [filePath, entry] of plan) if (1 === entry.size) for (const [watcher, filePath] of entry) {
          const w = createDirectWatcher(filePath), old = underlyingWatcher.get(watcher);
          old !== w && (w.add(watcher), void 0 !== old && old.remove(watcher));
        } else {
          const filePaths = new Set(entry.values());
          if (filePaths.size > 1) {
            const w = createRecursiveWatcher(filePath);
            for (const [watcher, watcherPath] of entry) {
              const old = underlyingWatcher.get(watcher);
              old !== w && (w.add(watcherPath, watcher), void 0 !== old && old.remove(watcher));
            }
          } else for (const filePath of filePaths) {
            const w = createDirectWatcher(filePath);
            for (const watcher of entry.keys()) {
              const old = underlyingWatcher.get(watcher);
              old !== w && (w.add(watcher), void 0 !== old && old.remove(watcher));
            }
          }
        }
      };
      exports.watch = filePath => {
        const watcher = new Watcher, directWatcher = directWatchers.get(filePath);
        if (void 0 !== directWatcher) return directWatcher.add(watcher), watcher;
        let current = filePath;
        for (;;) {
          const recursiveWatcher = recursiveWatchers.get(current);
          if (void 0 !== recursiveWatcher) return recursiveWatcher.add(filePath, watcher), 
          watcher;
          const parent = path.dirname(current);
          if (parent === current) break;
          current = parent;
        }
        return pendingWatchers.set(watcher, filePath), isBatch || execute(), watcher;
      }, exports.batch = fn => {
        isBatch = !0;
        try {
          fn();
        } finally {
          isBatch = !1, execute();
        }
      }, exports.getNumberOfWatchers = () => watcherCount;
    },
    491: module => {
      "use strict";
      module.exports = require("assert");
    },
    57: module => {
      "use strict";
      module.exports = require("constants");
    },
    361: module => {
      "use strict";
      module.exports = require("events");
    },
    147: module => {
      "use strict";
      module.exports = require("fs");
    },
    37: module => {
      "use strict";
      module.exports = require("os");
    },
    17: module => {
      "use strict";
      module.exports = require("path");
    },
    781: module => {
      "use strict";
      module.exports = require("stream");
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
  }(723);
  module.exports = __webpack_exports__;
})();