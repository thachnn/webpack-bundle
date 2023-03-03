(() => {
  var __webpack_modules__ = {
    70143: (module, exports) => {
      function abbrev(list) {
        1 === arguments.length && Array.isArray(list) || (list = Array.prototype.slice.call(arguments, 0));
        for (var i = 0, l = list.length, args = []; i < l; i++) args[i] = "string" == typeof list[i] ? list[i] : String(list[i]);
        var abbrevs = {}, prev = "";
        for (i = 0, l = (args = args.sort(lexSort)).length; i < l; i++) {
          var current = args[i], next = args[i + 1] || "", nextMatches = !0, prevMatches = !0;
          if (current !== next) {
            for (var j = 0, cl = current.length; j < cl; j++) {
              var curChar = current.charAt(j);
              if (nextMatches = nextMatches && curChar === next.charAt(j), prevMatches = prevMatches && curChar === prev.charAt(j), 
              !nextMatches && !prevMatches) {
                j++;
                break;
              }
            }
            if (prev = current, j !== cl) for (var a = current.substr(0, j); j <= cl; j++) abbrevs[a] = current, 
            a += current.charAt(j); else abbrevs[current] = current;
          }
        }
        return abbrevs;
      }
      function lexSort(a, b) {
        return a === b ? 0 : a > b ? 1 : -1;
      }
      module.exports = abbrev.abbrev = abbrev, abbrev.monkeyPatch = function() {
        Object.defineProperty(Array.prototype, "abbrev", {
          value: function() {
            return abbrev(this);
          },
          enumerable: !1,
          configurable: !0,
          writable: !0
        }), Object.defineProperty(Object.prototype, "abbrev", {
          value: function() {
            return abbrev(Object.keys(this));
          },
          enumerable: !1,
          configurable: !0,
          writable: !0
        });
      };
    },
    59543: module => {
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
    49809: (module, __unused_webpack_exports, __webpack_require__) => {
      var gracefulQueue, previousSymbol, fs = __webpack_require__(57147), polyfills = __webpack_require__(17529), legacy = __webpack_require__(66454), clone = __webpack_require__(59543), util = __webpack_require__(73837);
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
          debug(fs[gracefulQueue]), __webpack_require__(39491).equal(fs[gracefulQueue].length, 0);
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
    66454: (module, __unused_webpack_exports, __webpack_require__) => {
      var Stream = __webpack_require__(12781).Stream;
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
    17529: (module, __unused_webpack_exports, __webpack_require__) => {
      var constants = __webpack_require__(22057), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
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
    78600: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const rm = __webpack_require__(11567), log = __webpack_require__(19334);
      module.exports = function(gyp, argv, callback) {
        log.verbose("clean", 'removing "%s" directory', "build"), rm("build", callback);
      }, module.exports.usage = 'Removes any generated build files and the "out" dir';
    },
    92734: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(49809), path = __webpack_require__(71017), log = __webpack_require__(19334), os = __webpack_require__(22037), processRelease = __webpack_require__(30564), win = "win32" === process.platform, findNodeDirectory = __webpack_require__(91005), createConfigGypi = __webpack_require__(28112), msgFormat = __webpack_require__(73837).format;
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
        var python, nodeDir, buildDir = path.resolve("build"), buildBinsDir = path.join(buildDir, "node_gyp_bins"), configNames = [ "config.gypi", "common.gypi" ], configs = [], release = processRelease(argv, gyp, process.version, process.release);
        function createBuildDir() {
          log.verbose("build dir", 'attempting to create "build" dir: %s', buildDir);
          const deepestBuildDirSubdirectory = win ? buildDir : buildBinsDir;
          fs.mkdir(deepestBuildDirSubdirectory, {
            recursive: !0
          }, (function(err, isNew) {
            if (err) return callback(err);
            log.verbose("build dir", '"build" dir needed to be created?', isNew ? "Yes" : "No"), 
            win ? findVisualStudio(release.semver, gyp.opts.msvs_version, createConfigFile) : (!function() {
              const symlinkDestination = path.join(buildBinsDir, "python3");
              log.verbose("python symlink", `creating symlink to "${python}" at "${symlinkDestination}"`), 
              fs.unlink(symlinkDestination, (function(err) {
                err && "ENOENT" !== err.code && (log.verbose("python symlink", "error when attempting to remove existing symlink"), 
                log.verbose("python symlink", err.stack, "errno: " + err.errno)), fs.symlink(python, symlinkDestination, (function(err) {
                  err && (log.verbose("python symlink", "error when attempting to create Python symlink"), 
                  log.verbose("python symlink", err.stack, "errno: " + err.errno));
                }));
              }));
            }(), createConfigFile());
          }));
        }
        function createConfigFile(err, vsInfo) {
          if (err) return callback(err);
          "win32" === process.platform && (process.env.GYP_MSVS_VERSION = Math.min(vsInfo.versionYear, 2015), 
          process.env.GYP_MSVS_OVERRIDE_PATH = vsInfo.path), createConfigGypi({
            gyp,
            buildDir,
            nodeDir,
            vsInfo
          }).then((configPath => {
            configs.push(configPath), findConfigs();
          })).catch((err => {
            callback(err);
          }));
        }
        function findConfigs() {
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
              })) : [ "out/Release/lib.target/libnode", "out/Debug/lib.target/libnode", "out/Release/obj.target/libnode", "out/Debug/obj.target/libnode", "lib/libnode" ].map((function(file) {
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
    28112: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(49809), log = __webpack_require__(19334), path = __webpack_require__(71017);
      function parseConfigGypi(config) {
        return config = (config = (config = config.replace(/#.*/g, "")).replace(/'$\s+'/gm, "")).replace(/'/g, '"'), 
        JSON.parse(config);
      }
      async function getCurrentConfigGypi({gyp, nodeDir, vsInfo}) {
        const config = await async function({gyp, nodeDir}) {
          if ((gyp.opts.nodedir || gyp.opts.disturl || gyp.opts["dist-url"]) && !gyp.opts["force-process-config"] && nodeDir) try {
            const baseConfigGypiPath = path.resolve(nodeDir, "include/node/config.gypi");
            return parseConfigGypi((await fs.promises.readFile(baseConfigGypiPath)).toString());
          } catch (err) {
            log.warn("read config.gypi", err.message);
          }
          return JSON.parse(JSON.stringify(process.config));
        }({
          gyp,
          nodeDir
        });
        config.target_defaults || (config.target_defaults = {}), config.variables || (config.variables = {});
        const defaults = config.target_defaults, variables = config.variables;
        return defaults.cflags = [], defaults.defines = [], defaults.include_dirs = [], 
        defaults.libraries = [], "debug" in gyp.opts && (defaults.default_configuration = gyp.opts.debug ? "Debug" : "Release"), 
        defaults.default_configuration || (defaults.default_configuration = "Release"), 
        variables.target_arch = gyp.opts.arch || process.arch || "ia32", "arm64" === variables.target_arch && (defaults.msvs_configuration_platform = "ARM64", 
        defaults.xcode_configuration_platform = "arm64"), variables.nodedir = nodeDir, variables.standalone_static_library = gyp.opts.thin ? 0 : 1, 
        "win32" === process.platform && (defaults.msbuild_toolset = vsInfo.toolset, vsInfo.sdk && (defaults.msvs_windows_target_platform_version = vsInfo.sdk), 
        "arm64" === variables.target_arch && (vsInfo.versionMajor > 15 || 15 === vsInfo.versionMajor && vsInfo.versionMajor >= 9 ? defaults.msvs_enable_marmasm = 1 : log.warn("Compiling ARM64 assembly is only available in\nVisual Studio 2017 version 15.9 and above")), 
        variables.msbuild_path = vsInfo.msBuild), Object.keys(gyp.opts).forEach((function(opt) {
          "argv" !== opt && (opt in gyp.configDefs || (variables[opt.replace(/-/g, "_")] = gyp.opts[opt]));
        })), config;
      }
      module.exports = async function({gyp, buildDir, nodeDir, vsInfo}) {
        const configPath = path.resolve(buildDir, "config.gypi");
        log.verbose("build/config.gypi", "creating config file");
        const config = await getCurrentConfigGypi({
          gyp,
          nodeDir,
          vsInfo
        });
        log.silly("build/config.gypi", config);
        const json = JSON.stringify(config, (function(k, v) {
          return "boolean" == typeof v ? String(v) : v;
        }), 2);
        return log.verbose("build/config.gypi", "writing out config file: %s", configPath), 
        await fs.promises.writeFile(configPath, [ '# Do not edit. File was generated by node-gyp\'s "configure" step', json, "" ].join("\n")), 
        configPath;
      }, module.exports.test = {
        parseConfigGypi,
        getCurrentConfigGypi
      };
    },
    24968: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const log = __webpack_require__(19334), semver = __webpack_require__(5870), cp = __webpack_require__(32081), extend = __webpack_require__(73837)._extend, win = "win32" === process.platform, logWithPrefix = __webpack_require__(40538).logWithPrefix, systemDrive = process.env.SystemDrive || "C:", username = process.env.USERNAME || process.env.USER || function() {
        try {
          return __webpack_require__(22037).userInfo().username;
        } catch (e) {}
      }(), localAppData = process.env.LOCALAPPDATA || `${systemDrive}\\${username}\\AppData\\Local`, foundLocalAppData = process.env.LOCALAPPDATA || username, programFiles = process.env.ProgramW6432 || process.env.ProgramFiles || `${systemDrive}\\Program Files`, programFilesX86 = process.env["ProgramFiles(x86)"] || `${programFiles} (x86)`, winDefaultLocationsArray = [];
      for (const majorMinor of [ "39", "38", "37", "36" ]) foundLocalAppData ? winDefaultLocationsArray.push(`${localAppData}\\Programs\\Python\\Python${majorMinor}\\python.exe`, `${programFiles}\\Python${majorMinor}\\python.exe`, `${localAppData}\\Programs\\Python\\Python${majorMinor}-32\\python.exe`, `${programFiles}\\Python${majorMinor}-32\\python.exe`, `${programFilesX86}\\Python${majorMinor}-32\\python.exe`) : winDefaultLocationsArray.push(`${programFiles}\\Python${majorMinor}\\python.exe`, `${programFiles}\\Python${majorMinor}-32\\python.exe`, `${programFilesX86}\\Python${majorMinor}-32\\python.exe`);
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
        semverRange: ">=3.6.0",
        execFile: cp.execFile,
        env: process.env,
        win,
        pyLauncher: "py.exe",
        winDefaultLocations: winDefaultLocationsArray,
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
                this.addLog('checking if "python3" can be used');
              },
              check: this.checkCommand,
              arg: "python3"
            }, {
              before: () => {
                this.addLog('checking if "python" can be used');
              },
              check: this.checkCommand,
              arg: "python"
            } ];
            if (this.win) {
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
              checks.push({
                before: () => {
                  this.addLog("checking if the py launcher can be used to find Python 3");
                },
                check: this.checkPyLauncher
              });
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
          this.log.verbose(`- executing "${this.pyLauncher}" to get Python 3 executable path`), 
          this.run(this.pyLauncher, [ "-3", ...this.argsExecutable ], !1, function(err, execPath) {
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
      const log = __webpack_require__(19334), execFile = __webpack_require__(32081).execFile, fs = __webpack_require__(57147), path = __webpack_require__(71017).win32, logWithPrefix = __webpack_require__(40538).logWithPrefix, regSearchKeys = __webpack_require__(40538).regSearchKeys;
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
            this.addLog("could not use PowerShell to find Visual Studio 2017 or newer, try re-running with '--loglevel silly' for more details"), 
            cb(null);
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
          ret) : 17 === ret.versionMajor ? (ret.versionYear = 2022, ret) : (this.log.silly("- unsupported version:", ret.versionMajor), 
          {});
        },
        getMSBuild: function(info, versionYear) {
          const msbuildPath = path.join(info.path, "MSBuild", "Current", "Bin", "MSBuild.exe");
          if (-1 !== info.packages.indexOf("Microsoft.VisualStudio.VC.MSBuild.Base")) {
            if (this.log.silly("- found VC.MSBuild.Base"), 2017 === versionYear) return path.join(info.path, "MSBuild", "15.0", "Bin", "MSBuild.exe");
            if (2019 === versionYear) return msbuildPath;
          }
          return fs.existsSync(msbuildPath) ? msbuildPath : null;
        },
        getToolset: function(info, versionYear) {
          if (-1 !== info.packages.indexOf("Microsoft.VisualStudio.Component.VC.Tools.x86.x64")) this.log.silly("- found VC.Tools.x86.x64"); else {
            if (-1 === info.packages.indexOf("Microsoft.VisualStudio.WDExpress")) return null;
            this.log.silly("- found Visual Studio Express (looking for toolset)");
          }
          return 2017 === versionYear ? "v141" : 2019 === versionYear ? "v142" : 2022 === versionYear ? "v143" : (this.log.silly("- invalid versionYear:", versionYear), 
          null);
        },
        getSDK: function(info) {
          var Win10or11SDKVer = 0;
          return info.packages.forEach((pkg => {
            if (!pkg.startsWith("Microsoft.VisualStudio.Component.Windows10SDK.") && !pkg.startsWith("Microsoft.VisualStudio.Component.Windows11SDK.")) return;
            const parts = pkg.split(".");
            if (parts.length > 5 && "Desktop" !== parts[5]) return void this.log.silly("- ignoring non-Desktop Win10/11SDK:", pkg);
            const foundSdkVer = parseInt(parts[4], 10);
            isNaN(foundSdkVer) ? this.log.silly("- failed to parse Win10/11SDK number:", pkg) : (this.log.silly("- found Win10/11SDK:", foundSdkVer), 
            Win10or11SDKVer = Math.max(Win10or11SDKVer, foundSdkVer));
          })), 0 !== Win10or11SDKVer ? `10.0.${Win10or11SDKVer}.0` : -1 !== info.packages.indexOf("Microsoft.VisualStudio.Component.Windows81SDK") ? (this.log.silly("- found Win8SDK"), 
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
      const fs = __webpack_require__(49809), os = __webpack_require__(22037), tar = __webpack_require__(39148), path = __webpack_require__(71017), util = __webpack_require__(73837), stream = __webpack_require__(12781), crypto = __webpack_require__(6113), log = __webpack_require__(19334), semver = __webpack_require__(5870), fetch = __webpack_require__(14936), processRelease = __webpack_require__(30564), win = "win32" === process.platform, streamPipeline = util.promisify(stream.pipeline);
      async function install(fs, gyp, argv) {
        const release = processRelease(argv, gyp, process.version, process.release);
        if (log.verbose("install", "input version string %j", release.version), !release.semver) throw new Error("Invalid version number: " + release.version);
        if (semver.lt(release.version, "0.8.0")) throw new Error("Minimum target version is `0.8.0` or greater. Got: " + release.version);
        if ("pre" === release.semver.prerelease[0]) {
          if (log.verbose('detected "pre" node version', release.version), !gyp.opts.nodedir) throw new Error('"pre" versions of node cannot be installed, use the --nodedir flag instead');
          return void log.verbose("--nodedir flag was passed; skipping install", gyp.opts.nodedir);
        }
        log.verbose("install", "installing version: %s", release.versionDir);
        const devDir = path.resolve(gyp.devDir, release.versionDir);
        if (gyp.opts.ensure) {
          log.verbose("install", "--ensure was passed, so won't reinstall if already installed");
          try {
            await fs.promises.stat(devDir);
          } catch (err) {
            if ("ENOENT" === err.code) {
              log.verbose("install", "version not already installed, continuing with install", release.version);
              try {
                return await go();
              } catch (err) {
                return rollback(err);
              }
            } else if ("EACCES" === err.code) return eaccesFallback(err);
            throw err;
          }
          log.verbose("install", 'version is already installed, need to check "installVersion"');
          const installVersionFile = path.resolve(devDir, "installVersion");
          let installVersion = 0;
          try {
            const ver = await fs.promises.readFile(installVersionFile, "ascii");
            installVersion = parseInt(ver, 10) || 0;
          } catch (err) {
            if ("ENOENT" !== err.code) throw err;
          }
          if (log.verbose('got "installVersion"', installVersion), log.verbose('needs "installVersion"', gyp.package.installVersion), 
          installVersion < gyp.package.installVersion) {
            log.verbose("install", "version is no good; reinstalling");
            try {
              return await go();
            } catch (err) {
              return rollback(err);
            }
          }
          log.verbose("install", "version is good");
        } else try {
          return await go();
        } catch (err) {
          return rollback(err);
        }
        async function go() {
          log.verbose("ensuring nodedir is created", devDir);
          try {
            const created = await fs.promises.mkdir(devDir, {
              recursive: !0
            });
            created && log.verbose("created nodedir", created);
          } catch (err) {
            if ("EACCES" === err.code) return eaccesFallback(err);
            throw err;
          }
          const tarPath = gyp.opts.tarball;
          let extractCount = 0;
          const contentShasums = {}, expectShasums = {};
          function isValid(path) {
            const isValid = valid(path);
            return isValid ? (log.verbose("extracted file from tarball", path), extractCount++) : log.silly("ignoring from tarball", path), 
            isValid;
          }
          if (tarPath) await tar.extract({
            file: tarPath,
            strip: 1,
            filter: isValid,
            cwd: devDir
          }); else try {
            const res = await download(gyp, release.tarballUrl);
            if (200 !== res.status) throw new Error(`${res.status} response downloading ${release.tarballUrl}`);
            await streamPipeline(res.body, new ShaSum(((_, checksum) => {
              const filename = path.basename(release.tarballUrl).trim();
              contentShasums[filename] = checksum, log.verbose("content checksum", filename, checksum);
            })), tar.extract({
              strip: 1,
              cwd: devDir,
              filter: isValid
            }));
          } catch (err) {
            if ("ENOTFOUND" === err.code) throw new Error("This is most likely not a problem with node-gyp or the package itself and\nis related to network connectivity. In most cases you are behind a proxy or have bad \nnetwork settings.");
            throw err;
          }
          if (0 === extractCount) throw new Error("There was a fatal problem while downloading/extracting the tarball");
          log.verbose("tarball", "done parsing tarball");
          const installVersionPath = path.resolve(devDir, "installVersion");
          await Promise.all([ ...win ? function() {
            log.verbose("on Windows; need to download `" + release.name + ".lib`...");
            return [ "ia32", "x64", "arm64" ].map((async arch => {
              const dir = path.resolve(devDir, arch), targetLibPath = path.resolve(dir, release.name + ".lib"), {libUrl, libPath} = release[arch], name = `${arch} ${release.name}.lib`;
              log.verbose(name, "dir", dir), log.verbose(name, "url", libUrl), await fs.promises.mkdir(dir, {
                recursive: !0
              }), log.verbose("streaming", name, "to:", targetLibPath);
              const res = await download(gyp, libUrl);
              if (403 !== res.status && 404 !== res.status) {
                if (200 !== res.status) throw new Error(`${res.status} status code downloading ${name}`);
                return streamPipeline(res.body, new ShaSum(((_, checksum) => {
                  contentShasums[libPath] = checksum, log.verbose("content checksum", libPath, checksum);
                })), fs.createWriteStream(targetLibPath));
              }
              "arm64" === arch ? log.verbose(`${name} was not found in ${libUrl}`) : log.warn(`${name} was not found in ${libUrl}`);
            }));
          }() : [], fs.promises.writeFile(installVersionPath, gyp.package.installVersion + "\n"), ...!tarPath || win ? [ async function() {
            log.verbose("check download content checksum, need to download `SHASUMS256.txt`..."), 
            log.verbose("checksum url", release.shasumsUrl);
            const res = await download(gyp, release.shasumsUrl);
            if (200 !== res.status) throw new Error(`${res.status}  status code downloading checksum`);
            for (const line of (await res.text()).trim().split("\n")) {
              const items = line.trim().split(/\s+/);
              if (2 !== items.length) return;
              const name = items[1].replace(/^\.\//, "");
              expectShasums[name] = items[0];
            }
            log.verbose("checksum data", JSON.stringify(expectShasums));
          }() ] : [] ]), log.verbose("download contents checksum", JSON.stringify(contentShasums));
          for (const k in contentShasums) if (log.verbose("validating download checksum for " + k, "(%s == %s)", contentShasums[k], expectShasums[k]), 
          contentShasums[k] !== expectShasums[k]) throw new Error(k + " local checksum " + contentShasums[k] + " not match remote " + expectShasums[k]);
        }
        function valid(file) {
          const extname = path.extname(file);
          return ".h" === extname || ".gypi" === extname;
        }
        async function rollback(err) {
          throw log.warn("install", "got an error, rolling back install"), await util.promisify(gyp.commands.remove)([ release.versionDir ]), 
          err;
        }
        async function eaccesFallback(err) {
          const noretry = "--node_gyp_internal_noretry";
          if (-1 !== argv.indexOf(noretry)) throw err;
          const tmpdir = os.tmpdir();
          gyp.devDir = path.resolve(tmpdir, ".node-gyp");
          let userString = "";
          try {
            userString = ` ("${os.userInfo().username}")`;
          } catch (e) {}
          return log.warn("EACCES", 'current user%s does not have permission to access the dev dir "%s"', userString, devDir), 
          log.warn("EACCES", 'attempting to reinstall using temporary dev dir "%s"', gyp.devDir), 
          process.cwd() === tmpdir && (log.verbose("tmpdir == cwd", "automatically will remove dev files after to save disk space"), 
          gyp.todo.push({
            name: "remove",
            args: argv
          })), util.promisify(gyp.commands.install)([ noretry ].concat(argv));
        }
      }
      class ShaSum extends stream.Transform {
        constructor(callback) {
          super(), this._callback = callback, this._digester = crypto.createHash("sha256");
        }
        _transform(chunk, _, callback) {
          this._digester.update(chunk), callback(null, chunk);
        }
        _flush(callback) {
          this._callback(null, this._digester.digest("hex")), callback();
        }
      }
      async function download(gyp, url) {
        log.http("GET", url);
        const requestOpts = {
          headers: {
            "User-Agent": `node-gyp v${gyp.version} (node ${process.version})`,
            Connection: "keep-alive"
          },
          proxy: gyp.opts.proxy,
          noProxy: gyp.opts.noproxy
        }, cafile = gyp.opts.cafile;
        cafile && (requestOpts.ca = await readCAFile(cafile));
        const res = await fetch(url, requestOpts);
        return log.http(res.status, res.url), res;
      }
      async function readCAFile(filename) {
        return (await fs.promises.readFile(filename, "utf8")).match(/(-----BEGIN CERTIFICATE-----[\S\s]*?-----END CERTIFICATE-----)/g);
      }
      module.exports = function(gyp, argv, callback) {
        install(fs, gyp, argv).then(callback.bind(void 0, null), callback);
      }, module.exports.test = {
        download,
        install,
        readCAFile
      }, module.exports.usage = "Install node development files for the specified node version.";
    },
    31676: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(49809), log = __webpack_require__(19334);
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
      const path = __webpack_require__(71017), nopt = __webpack_require__(98261), log = __webpack_require__(19334), childProcess = __webpack_require__(32081), EE = __webpack_require__(82361).EventEmitter, inherits = __webpack_require__(73837).inherits, commands = [ "build", "clean", "configure", "rebuild", "install", "list", "remove" ];
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
      proto.package = __webpack_require__(22647), proto.configDefs = {
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
        thin: String,
        "force-process-config": Boolean
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
            "npm_config_loglevel" === name ? log.level = val : (name = name.substring("npm_config_".length)) && (name.includes("_") && (name = name.replace(/_/g, "-")), 
            this.opts[name] = val);
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
      const semver = __webpack_require__(5870), url = __webpack_require__(57310), path = __webpack_require__(71017), log = __webpack_require__(19334), bitsre = /\/win-(x86|x64|arm64)\//, bitsreV3 = /\/win-(x86|ia32|x64)\//;
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
      const fs = __webpack_require__(57147), rm = __webpack_require__(11567), path = __webpack_require__(71017), log = __webpack_require__(19334), semver = __webpack_require__(5870);
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
        "./build": 71991,
        "./build.js": 71991,
        "./clean": 78600,
        "./clean.js": 78600,
        "./configure": 92734,
        "./configure.js": 92734,
        "./create-config-gypi": 28112,
        "./create-config-gypi.js": 28112,
        "./find-node-directory": 91005,
        "./find-node-directory.js": 91005,
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
    98261: (module, exports, __webpack_require__) => {
      var debug = process.env.DEBUG_NOPT || process.env.NOPT_DEBUG ? function() {
        console.error.apply(console, arguments);
      } : function() {}, url = __webpack_require__(57310), path = __webpack_require__(71017), Stream = __webpack_require__(12781).Stream, abbrev = __webpack_require__(70143), os = __webpack_require__(22037);
      function clean(data, types, typeDefs) {
        typeDefs = typeDefs || exports.typeDefs;
        var remove = {}, typeDefault = [ !1, !0, null, String, Array ];
        Object.keys(data).forEach((function(k) {
          if ("argv" !== k) {
            var val = data[k], isArray = Array.isArray(val), type = types[k];
            isArray || (val = [ val ]), type || (type = typeDefault), type === Array && (type = typeDefault.concat(Array)), 
            Array.isArray(type) || (type = [ type ]), debug("val=%j", val), debug("types=", type), 
            (val = val.map((function(val) {
              if ("string" == typeof val && (debug("string %j", val), "null" === (val = val.trim()) && ~type.indexOf(null) || "true" === val && (~type.indexOf(!0) || ~type.indexOf(Boolean)) || "false" === val && (~type.indexOf(!1) || ~type.indexOf(Boolean)) ? (val = JSON.parse(val), 
              debug("jsonable %j", val)) : ~type.indexOf(Number) && !isNaN(val) ? (debug("convert to number", val), 
              val = +val) : ~type.indexOf(Date) && !isNaN(Date.parse(val)) && (debug("convert to date", val), 
              val = new Date(val))), !types.hasOwnProperty(k)) return val;
              !1 !== val || !~type.indexOf(null) || ~type.indexOf(!1) || ~type.indexOf(Boolean) || (val = null);
              var d = {};
              return d[k] = val, debug("prevalidated val", d, val, types[k]), validate(d, k, val, types[k], typeDefs) ? (debug("validated val", d, val, types[k]), 
              d[k]) : (exports.invalidHandler ? exports.invalidHandler(k, val, types[k], data) : !1 !== exports.invalidHandler && debug("invalid: " + k + "=" + val, types[k]), 
              remove);
            })).filter((function(val) {
              return val !== remove;
            }))).length || -1 !== type.indexOf(Array) ? isArray ? (debug(isArray, data[k], val), 
            data[k] = val) : data[k] = val[0] : (debug("VAL HAS NO LENGTH, DELETE IT", val, k, type.indexOf(Array)), 
            delete data[k]), debug("k=%s val=%j", k, val, data[k]);
          }
        }));
      }
      function validate(data, k, val, type, typeDefs) {
        if (Array.isArray(type)) {
          for (var i = 0, l = type.length; i < l; i++) if (type[i] !== Array && validate(data, k, val, type[i], typeDefs)) return !0;
          return delete data[k], !1;
        }
        if (type === Array) return !0;
        if (type != type) return debug("Poison NaN", k, val, type), delete data[k], !1;
        if (val === type) return debug("Explicitly allowed %j", val), data[k] = val, !0;
        var ok = !1, types = Object.keys(typeDefs);
        for (i = 0, l = types.length; i < l; i++) {
          debug("test type %j %j %j", k, val, types[i]);
          var t = typeDefs[types[i]];
          if (t && (type && type.name && t.type && t.type.name ? type.name === t.type.name : type === t.type)) {
            var d = {};
            if (ok = !1 !== t.validate(d, k, val), val = d[k], ok) {
              data[k] = val;
              break;
            }
          }
        }
        return debug("OK? %j (%j %j %j)", ok, k, val, types[i]), ok || delete data[k], ok;
      }
      function resolveShort(arg, shorthands, shortAbbr, abbrevs) {
        if (abbrevs[arg = arg.replace(/^-+/, "")] === arg) return null;
        if (shorthands[arg]) return shorthands[arg] && !Array.isArray(shorthands[arg]) && (shorthands[arg] = shorthands[arg].split(/\s+/)), 
        shorthands[arg];
        var singles = shorthands.___singles;
        singles || (singles = Object.keys(shorthands).filter((function(s) {
          return 1 === s.length;
        })).reduce((function(l, r) {
          return l[r] = !0, l;
        }), {}), shorthands.___singles = singles, debug("shorthand singles", singles));
        var chrs = arg.split("").filter((function(c) {
          return singles[c];
        }));
        return chrs.join("") === arg ? chrs.map((function(c) {
          return shorthands[c];
        })).reduce((function(l, r) {
          return l.concat(r);
        }), []) : abbrevs[arg] && !shorthands[arg] ? null : (shortAbbr[arg] && (arg = shortAbbr[arg]), 
        shorthands[arg] && !Array.isArray(shorthands[arg]) && (shorthands[arg] = shorthands[arg].split(/\s+/)), 
        shorthands[arg]);
      }
      module.exports = exports = function(types, shorthands, args, slice) {
        args = args || process.argv, "number" != typeof slice && (slice = 2);
        debug(types = types || {}, shorthands = shorthands || {}, args, slice), args = args.slice(slice);
        var data = {}, argv = {
          remain: [],
          cooked: args,
          original: args.slice(0)
        };
        return function(args, data, remain, types, shorthands) {
          debug("parse", args, data, remain);
          for (var abbrevs = abbrev(Object.keys(types)), shortAbbr = abbrev(Object.keys(shorthands)), i = 0; i < args.length; i++) {
            var arg = args[i];
            if (debug("arg", arg), arg.match(/^-{2,}$/)) {
              remain.push.apply(remain, args.slice(i + 1)), args[i] = "--";
              break;
            }
            var hadEq = !1;
            if ("-" === arg.charAt(0) && arg.length > 1) {
              var at = arg.indexOf("=");
              if (at > -1) {
                hadEq = !0;
                var v = arg.substr(at + 1);
                arg = arg.substr(0, at), args.splice(i, 1, arg, v);
              }
              var shRes = resolveShort(arg, shorthands, shortAbbr, abbrevs);
              if (debug("arg=%j shRes=%j", arg, shRes), shRes && (debug(arg, shRes), args.splice.apply(args, [ i, 1 ].concat(shRes)), 
              arg !== shRes[0])) {
                i--;
                continue;
              }
              arg = arg.replace(/^-+/, "");
              for (var no = null; 0 === arg.toLowerCase().indexOf("no-"); ) no = !no, arg = arg.substr(3);
              abbrevs[arg] && (arg = abbrevs[arg]);
              var argType = types[arg], isTypeArray = Array.isArray(argType);
              isTypeArray && 1 === argType.length && (isTypeArray = !1, argType = argType[0]);
              var isArray = argType === Array || isTypeArray && -1 !== argType.indexOf(Array);
              !types.hasOwnProperty(arg) && data.hasOwnProperty(arg) && (Array.isArray(data[arg]) || (data[arg] = [ data[arg] ]), 
              isArray = !0);
              var val, la = args[i + 1];
              if ("boolean" == typeof no || argType === Boolean || isTypeArray && -1 !== argType.indexOf(Boolean) || void 0 === argType && !hadEq || "false" === la && (null === argType || isTypeArray && ~argType.indexOf(null))) {
                val = !no, "true" !== la && "false" !== la || (val = JSON.parse(la), la = null, 
                no && (val = !val), i++), isTypeArray && la && (~argType.indexOf(la) ? (val = la, 
                i++) : "null" === la && ~argType.indexOf(null) ? (val = null, i++) : la.match(/^-{2,}[^-]/) || isNaN(la) || !~argType.indexOf(Number) ? !la.match(/^-[^-]/) && ~argType.indexOf(String) && (val = la, 
                i++) : (val = +la, i++)), isArray ? (data[arg] = data[arg] || []).push(val) : data[arg] = val;
                continue;
              }
              argType === String && (void 0 === la ? la = "" : la.match(/^-{1,2}[^-]+/) && (la = "", 
              i--)), la && la.match(/^-{2,}$/) && (la = void 0, i--), val = void 0 === la || la, 
              isArray ? (data[arg] = data[arg] || []).push(val) : data[arg] = val, i++;
            } else remain.push(arg);
          }
        }(args, data, argv.remain, types, shorthands), clean(data, types, exports.typeDefs), 
        data.argv = argv, Object.defineProperty(data.argv, "toString", {
          value: function() {
            return this.original.map(JSON.stringify).join(" ");
          },
          enumerable: !1
        }), data;
      }, exports.clean = clean, exports.typeDefs = {
        String: {
          type: String,
          validate: function(data, k, val) {
            data[k] = String(val);
          }
        },
        Boolean: {
          type: Boolean,
          validate: function(data, k, val) {
            val = val instanceof Boolean ? val.valueOf() : "string" == typeof val ? isNaN(val) ? "null" !== val && "false" !== val : !!+val : !!val;
            data[k] = val;
          }
        },
        url: {
          type: url,
          validate: function(data, k, val) {
            if (!(val = url.parse(String(val))).host) return !1;
            data[k] = val.href;
          }
        },
        Number: {
          type: Number,
          validate: function(data, k, val) {
            if (debug("validate Number %j %j %j", k, val, isNaN(val)), isNaN(val)) return !1;
            data[k] = +val;
          }
        },
        path: {
          type: path,
          validate: function(data, k, val) {
            if (!0 === val) return !1;
            if (null === val) return !0;
            val = String(val);
            var homePattern = "win32" === process.platform ? /^~(\/|\\)/ : /^~\//, home = os.homedir();
            home && val.match(homePattern) ? data[k] = path.resolve(home, val.substr(2)) : data[k] = path.resolve(val);
            return !0;
          }
        },
        Stream: {
          type: Stream,
          validate: function(data, k, val) {
            if (!(val instanceof Stream)) return !1;
            data[k] = val;
          }
        },
        Date: {
          type: Date,
          validate: function(data, k, val) {
            var s = Date.parse(val);
            if (debug("validate Date %j %j %j", k, val, s), isNaN(s)) return !1;
            data[k] = new Date(val);
          }
        }
      };
    },
    7017: (module, __unused_webpack_exports, __webpack_require__) => {
      const isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(71017), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(23789), getNotFoundError = cmd => Object.assign(new Error(`not found: ${cmd}`), {
        code: "ENOENT"
      }), getPathInfo = (cmd, opt) => {
        const colon = opt.colon || COLON, pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [ "" ] : [ ...isWindows ? [ process.cwd() ] : [], ...(opt.path || process.env.PATH || "").split(colon) ], pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", pathExt = isWindows ? pathExtExe.split(colon) : [ "" ];
        return isWindows && -1 !== cmd.indexOf(".") && "" !== pathExt[0] && pathExt.unshift(""), 
        {
          pathEnv,
          pathExt,
          pathExtExe
        };
      }, which = (cmd, opt, cb) => {
        "function" == typeof opt && (cb = opt, opt = {}), opt || (opt = {});
        const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt), found = [], step = i => new Promise(((resolve, reject) => {
          if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
          const ppRaw = pathEnv[i], pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw, pCmd = path.join(pathPart, cmd), p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          resolve(subStep(p, i, 0));
        })), subStep = (p, i, ii) => new Promise(((resolve, reject) => {
          if (ii === pathExt.length) return resolve(step(i + 1));
          const ext = pathExt[ii];
          isexe(p + ext, {
            pathExt: pathExtExe
          }, ((er, is) => {
            if (!er && is) {
              if (!opt.all) return resolve(p + ext);
              found.push(p + ext);
            }
            return resolve(subStep(p, i, ii + 1));
          }));
        }));
        return cb ? step(0).then((res => cb(null, res)), cb) : step(0);
      };
      module.exports = which, which.sync = (cmd, opt) => {
        opt = opt || {};
        const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt), found = [];
        for (let i = 0; i < pathEnv.length; i++) {
          const ppRaw = pathEnv[i], pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw, pCmd = path.join(pathPart, cmd), p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          for (let j = 0; j < pathExt.length; j++) {
            const cur = p + pathExt[j];
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
    },
    91005: (module, __unused_webpack_exports, __webpack_require__) => {
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
    71991: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(49809), path = __webpack_require__(71017), glob = __webpack_require__(11567)._glob, log = __webpack_require__(19334), which = __webpack_require__(7017), win = "win32" === process.platform;
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
          if (!win) {
            const buildBinsDir = path.resolve("build", "node_gyp_bins");
            process.env.PATH = `${buildBinsDir}:${process.env.PATH}`, log.verbose("bin symlinks", `adding symlinks (such as Python), at "${buildBinsDir}", to PATH`);
          }
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
    39148: module => {
      "use strict";
      module.exports = require("./tar");
    },
    14936: module => {
      "use strict";
      module.exports = require("./make-fetch-happen");
    },
    19334: module => {
      "use strict";
      module.exports = require("./npmlog");
    },
    5870: module => {
      "use strict";
      module.exports = require("./semver");
    },
    11567: module => {
      "use strict";
      module.exports = require("../vendor/rimraf");
    },
    39491: module => {
      "use strict";
      module.exports = require("assert");
    },
    32081: module => {
      "use strict";
      module.exports = require("child_process");
    },
    22057: module => {
      "use strict";
      module.exports = require("constants");
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
    12781: module => {
      "use strict";
      module.exports = require("stream");
    },
    57310: module => {
      "use strict";
      module.exports = require("url");
    },
    73837: module => {
      "use strict";
      module.exports = require("util");
    },
    22647: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"node-gyp","description":"Node.js native addon build tool","version":"9.1.0","installVersion":9}');
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