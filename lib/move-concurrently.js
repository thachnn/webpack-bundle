(() => {
  var __webpack_modules__ = {
    51749: module => {
      "use strict";
      module.exports = "win32" === process.platform;
    },
    6198: module => {
      "use strict";
      var types = {
        "*": {
          label: "any",
          check: function() {
            return !0;
          }
        },
        A: {
          label: "array",
          check: function(thingy) {
            return Array.isArray(thingy) || function(thingy) {
              return null != thingy && "object" == typeof thingy && thingy.hasOwnProperty("callee");
            }(thingy);
          }
        },
        S: {
          label: "string",
          check: function(thingy) {
            return "string" == typeof thingy;
          }
        },
        N: {
          label: "number",
          check: function(thingy) {
            return "number" == typeof thingy;
          }
        },
        F: {
          label: "function",
          check: function(thingy) {
            return "function" == typeof thingy;
          }
        },
        O: {
          label: "object",
          check: function(thingy) {
            return "object" == typeof thingy && null != thingy && !types.A.check(thingy) && !types.E.check(thingy);
          }
        },
        B: {
          label: "boolean",
          check: function(thingy) {
            return "boolean" == typeof thingy;
          }
        },
        E: {
          label: "error",
          check: function(thingy) {
            return thingy instanceof Error;
          }
        },
        Z: {
          label: "null",
          check: function(thingy) {
            return null == thingy;
          }
        }
      };
      function addSchema(schema, arity) {
        var group = arity[schema.length] = arity[schema.length] || [];
        -1 === group.indexOf(schema) && group.push(schema);
      }
      var validate = module.exports = function(rawSchemas, args) {
        if (2 !== arguments.length) throw wrongNumberOfArgs([ "SA" ], arguments.length);
        if (!rawSchemas) throw missingRequiredArg(0);
        if (!args) throw missingRequiredArg(1);
        if (!types.S.check(rawSchemas)) throw invalidType(0, [ "string" ], rawSchemas);
        if (!types.A.check(args)) throw invalidType(1, [ "array" ], args);
        var schemas = rawSchemas.split("|"), arity = {};
        schemas.forEach((function(schema) {
          for (var ii = 0; ii < schema.length; ++ii) {
            var type = schema[ii];
            if (!types[type]) throw unknownType(ii, type);
          }
          if (/E.*E/.test(schema)) throw moreThanOneError(schema);
          addSchema(schema, arity), /E/.test(schema) && (addSchema(schema.replace(/E.*$/, "E"), arity), 
          addSchema(schema.replace(/E/, "Z"), arity), 1 === schema.length && addSchema("", arity));
        }));
        var matching = arity[args.length];
        if (!matching) throw wrongNumberOfArgs(Object.keys(arity), args.length);
        for (var ii = 0; ii < args.length; ++ii) {
          var newMatching = matching.filter((function(schema) {
            var type = schema[ii];
            return (0, types[type].check)(args[ii]);
          }));
          if (!newMatching.length) {
            var labels = matching.map((function(schema) {
              return types[schema[ii]].label;
            })).filter((function(schema) {
              return null != schema;
            }));
            throw invalidType(ii, labels, args[ii]);
          }
          matching = newMatching;
        }
      };
      function missingRequiredArg(num) {
        return newException("EMISSINGARG", "Missing required argument #" + (num + 1));
      }
      function unknownType(num, type) {
        return newException("EUNKNOWNTYPE", "Unknown type " + type + " in argument #" + (num + 1));
      }
      function invalidType(num, expectedTypes, value) {
        var valueType;
        return Object.keys(types).forEach((function(typeCode) {
          types[typeCode].check(value) && (valueType = types[typeCode].label);
        })), newException("EINVALIDTYPE", "Argument #" + (num + 1) + ": Expected " + englishList(expectedTypes) + " but got " + valueType);
      }
      function englishList(list) {
        return list.join(", ").replace(/, ([^,]+)$/, " or $1");
      }
      function wrongNumberOfArgs(expected, got) {
        return newException("EWRONGARGCOUNT", "Expected " + englishList(expected) + " " + (expected.every((function(ex) {
          return 1 === ex.length;
        })) ? "argument" : "arguments") + " but got " + got);
      }
      function moreThanOneError(schema) {
        return newException("ETOOMANYERRORTYPES", 'Only one error type per argument signature is allowed, more than one found in "' + schema + '"');
      }
      function newException(code, msg) {
        var e = new Error(msg);
        return e.code = code, Error.captureStackTrace && Error.captureStackTrace(e, validate), 
        e;
      }
    },
    48588: function(module) {
      (function() {
        var exports, iferr, printerr, throwerr, tiferr, __slice = [].slice;
        iferr = function(fail, succ) {
          return function() {
            var a, err;
            return err = arguments[0], a = 2 <= arguments.length ? __slice.call(arguments, 1) : [], 
            null != err ? fail(err) : "function" == typeof succ ? succ.apply(null, a) : void 0;
          };
        }, tiferr = function(fail, succ) {
          return iferr(fail, (function() {
            var a;
            a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            try {
              return succ.apply(null, a);
            } catch (_error) {
              return fail(_error);
            }
          }));
        }, throwerr = iferr.bind(null, (function(err) {
          throw err;
        })), printerr = iferr((function(err) {
          return console.error(err.stack || err);
        })), module.exports = exports = iferr, exports.iferr = iferr, exports.tiferr = tiferr, 
        exports.throwerr = throwerr, exports.printerr = printerr;
      }).call(this);
    },
    287: module => {
      !function() {
        var cache;
        function MurmurHash3(key, seed) {
          var m = this instanceof MurmurHash3 ? this : cache;
          if (m.reset(seed), "string" == typeof key && key.length > 0 && m.hash(key), m !== this) return m;
        }
        MurmurHash3.prototype.hash = function(key) {
          var h1, k1, i, top, len;
          switch (len = key.length, this.len += len, k1 = this.k1, i = 0, this.rem) {
           case 0:
            k1 ^= len > i ? 65535 & key.charCodeAt(i++) : 0;

           case 1:
            k1 ^= len > i ? (65535 & key.charCodeAt(i++)) << 8 : 0;

           case 2:
            k1 ^= len > i ? (65535 & key.charCodeAt(i++)) << 16 : 0;

           case 3:
            k1 ^= len > i ? (255 & key.charCodeAt(i)) << 24 : 0, k1 ^= len > i ? (65280 & key.charCodeAt(i++)) >> 8 : 0;
          }
          if (this.rem = len + this.rem & 3, (len -= this.rem) > 0) {
            for (h1 = this.h1; h1 = 5 * (h1 = (h1 ^= k1 = 13715 * (k1 = (k1 = 11601 * k1 + 3432906752 * (65535 & k1) & 4294967295) << 15 | k1 >>> 17) + 461832192 * (65535 & k1) & 4294967295) << 13 | h1 >>> 19) + 3864292196 & 4294967295, 
            !(i >= len); ) k1 = 65535 & key.charCodeAt(i++) ^ (65535 & key.charCodeAt(i++)) << 8 ^ (65535 & key.charCodeAt(i++)) << 16, 
            k1 ^= (255 & (top = key.charCodeAt(i++))) << 24 ^ (65280 & top) >> 8;
            switch (k1 = 0, this.rem) {
             case 3:
              k1 ^= (65535 & key.charCodeAt(i + 2)) << 16;

             case 2:
              k1 ^= (65535 & key.charCodeAt(i + 1)) << 8;

             case 1:
              k1 ^= 65535 & key.charCodeAt(i);
            }
            this.h1 = h1;
          }
          return this.k1 = k1, this;
        }, MurmurHash3.prototype.result = function() {
          var k1, h1;
          return k1 = this.k1, h1 = this.h1, k1 > 0 && (h1 ^= k1 = 13715 * (k1 = (k1 = 11601 * k1 + 3432906752 * (65535 & k1) & 4294967295) << 15 | k1 >>> 17) + 461832192 * (65535 & k1) & 4294967295), 
          h1 ^= this.len, h1 = 51819 * (h1 ^= h1 >>> 16) + 2246770688 * (65535 & h1) & 4294967295, 
          h1 = 44597 * (h1 ^= h1 >>> 13) + 3266445312 * (65535 & h1) & 4294967295, (h1 ^= h1 >>> 16) >>> 0;
        }, MurmurHash3.prototype.reset = function(seed) {
          return this.h1 = "number" == typeof seed ? seed : 0, this.rem = this.k1 = this.len = 0, 
          this;
        }, cache = new MurmurHash3, module.exports = MurmurHash3;
      }();
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
    41687: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = function(from, to, opts) {
        validate("SSO|SS", arguments);
        var Promise = (opts = extend({}, opts || {})).Promise || global.Promise, fs = opts.fs || nodeFs, rimrafAsync = promisify(Promise, rimraf), renameAsync = promisify(Promise, fs.rename);
        opts.top = from;
        var queue = new RunQueue({
          maxConcurrency: opts.maxConcurrency,
          Promise
        });
        return opts.queue = queue, opts.recurseWith = rename, queue.add(0, rename, [ from, to, opts ]), 
        queue.run().then((function() {
          return remove(from);
        }), (function(err) {
          return "EEXIST" === err.code || "EPERM" === err.code ? passThroughError() : remove(to).then(passThroughError, passThroughError);
          function passThroughError() {
            return Promise.reject(err);
          }
        }));
        function remove(target) {
          var opts = {
            unlink: fs.unlink,
            chmod: fs.chmod,
            stat: fs.stat,
            lstat: fs.lstat,
            rmdir: fs.rmdir,
            readdir: fs.readdir,
            glob: !1
          };
          return rimrafAsync(target, opts);
        }
        function rename(from, to, opts, done) {
          return renameAsync(from, to).catch((function(err) {
            return "EXDEV" === err.code || "ENOENT" === err.code && fs.existsSync(from) ? remove(to).then((function() {
              return copy.item(from, to, opts);
            })) : Promise.reject(err);
          }));
        }
      };
      var nodeFs = __webpack_require__(57147), rimraf = __webpack_require__(68259), validate = __webpack_require__(6198), copy = __webpack_require__(41953), RunQueue = __webpack_require__(84592), extend = Object.assign || __webpack_require__(73837)._extend;
      function promisify(Promise, fn) {
        return function() {
          var args = [].slice.call(arguments);
          return new Promise((function(resolve, reject) {
            return fn.apply(null, args.concat((function(err, value) {
              err ? reject(err) : resolve(value);
            })));
          }));
        };
      }
    },
    84592: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = RunQueue;
      var validate = __webpack_require__(6198);
      function RunQueue(opts) {
        validate("Z|O", [ opts ]), opts || (opts = {}), this.finished = !1, this.inflight = 0, 
        this.maxConcurrency = opts.maxConcurrency || 1, this.queued = 0, this.queue = [], 
        this.currentPrio = null, this.currentQueue = null, this.Promise = opts.Promise || global.Promise, 
        this.deferred = {};
      }
      RunQueue.prototype = {}, RunQueue.prototype.run = function() {
        if (0 !== arguments.length) throw new Error("RunQueue.run takes no arguments");
        var self = this, deferred = this.deferred;
        return deferred.promise || (deferred.promise = new this.Promise((function(resolve, reject) {
          deferred.resolve = resolve, deferred.reject = reject, self._runQueue();
        }))), deferred.promise;
      }, RunQueue.prototype._runQueue = function() {
        for (var self = this; this.inflight < this.maxConcurrency && this.queued; ) {
          if (!this.currentQueue || 0 === this.currentQueue.length) {
            if (this.inflight) return;
            for (var prios = Object.keys(this.queue), ii = 0; ii < prios.length; ++ii) {
              var prioQueue = this.queue[prios[ii]];
              if (prioQueue.length) {
                this.currentQueue = prioQueue, this.currentPrio = prios[ii];
                break;
              }
            }
          }
          --this.queued, ++this.inflight;
          var next = this.currentQueue.shift(), args = next.args || [];
          new this.Promise((function(resolve) {
            resolve(next.cmd.apply(null, args));
          })).then((function() {
            --self.inflight, self.finished || (self.queued <= 0 && self.inflight <= 0 && (self.finished = !0, 
            self.deferred.resolve()), self._runQueue());
          }), (function(err) {
            self.finished = !0, self.deferred.reject(err);
          }));
        }
      }, RunQueue.prototype.add = function(prio, cmd, args) {
        if (this.finished) throw new Error("Can't add to a finished queue. Create a new queue.");
        if (Math.abs(Math.floor(prio)) !== prio) throw new Error("Priorities must be a positive integer value.");
        validate("NFA|NFZ", [ prio, cmd, args ]), prio = Number(prio), this.queue[prio] || (this.queue[prio] = []), 
        ++this.queued, this.queue[prio].push({
          cmd,
          args
        }), this.currentPrio > prio && (this.currentQueue = this.queue[prio], this.currentPrio = prio);
      };
    },
    41953: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = function(from, to, opts) {
        validate("SSO|SS", arguments);
        var Promise = (opts = extend({}, opts || {})).Promise || global.Promise, fs = opts.fs || nodeFs;
        null == opts.isWindows && (opts.isWindows = isWindows);
        opts.Promise || (opts.Promise = Promise);
        opts.fs || (opts.fs = fs);
        opts.recurseWith || (opts.recurseWith = copyItem);
        opts.lstat || (opts.lstat = promisify(opts.Promise, fs.lstat));
        opts.stat || (opts.stat = promisify(opts.Promise, fs.stat));
        opts.chown || (opts.chown = promisify(opts.Promise, fs.chown));
        opts.readdir || (opts.readdir = promisify(opts.Promise, fs.readdir));
        opts.readlink || (opts.readlink = promisify(opts.Promise, fs.readlink));
        opts.symlink || (opts.symlink = promisify(opts.Promise, fs.symlink));
        opts.chmod || (opts.chmod = promisify(opts.Promise, fs.chmod));
        opts.top = from, opts.mkdirpAsync = promisify(opts.Promise, mkdirp);
        var rimrafAsync = promisify(opts.Promise, rimraf), queue = new RunQueue({
          maxConcurrency: opts.maxConcurrency,
          Promise
        });
        return opts.queue = queue, queue.add(0, copyItem, [ from, to, opts ]), queue.run().catch((function(err) {
          return "EEXIST" === err.code || "EPERM" === err.code ? passThroughError() : remove(to).then(passThroughError, passThroughError);
          function passThroughError() {
            return Promise.reject(err);
          }
        }));
        function remove(target) {
          var opts = {
            unlink: fs.unlink,
            chmod: fs.chmod,
            stat: fs.stat,
            lstat: fs.lstat,
            rmdir: fs.rmdir,
            readdir: fs.readdir,
            glob: !1
          };
          return rimrafAsync(target, opts);
        }
      }, module.exports.item = copyItem, module.exports.recurse = recurseDir, module.exports.symlink = copySymlink, 
      module.exports.file = copyFile;
      var nodeFs = __webpack_require__(57147), path = __webpack_require__(71017), validate = __webpack_require__(6198), stockWriteStreamAtomic = __webpack_require__(84469), mkdirp = __webpack_require__(41718), rimraf = __webpack_require__(68259), isWindows = __webpack_require__(51749), RunQueue = __webpack_require__(84592), extend = Object.assign || __webpack_require__(73837)._extend;
      function promisify(Promise, fn) {
        return function() {
          var args = [].slice.call(arguments);
          return new Promise((function(resolve, reject) {
            return fn.apply(null, args.concat((function(err, value) {
              err ? reject(err) : resolve(value);
            })));
          }));
        };
      }
      function copyItem(from, to, opts) {
        validate("SSO", [ from, to, opts ]);
        var fs = opts.fs || nodeFs, Promise = opts.Promise || global.Promise, lstat = opts.lstat || promisify(Promise, fs.lstat);
        return lstat(to).then((function() {
          return Promise.reject(function(from, to) {
            var err = new Error("Could not move " + from + " to " + to + ": destination already exists.");
            return err.code = "EEXIST", err;
          }(from, to));
        }), (function(err) {
          return err && "ENOENT" !== err.code ? Promise.reject(err) : lstat(from);
        })).then((function(fromStat) {
          var cmdOpts = extend(extend({}, opts), fromStat);
          return fromStat.isDirectory() ? recurseDir(from, to, cmdOpts) : fromStat.isSymbolicLink() ? void opts.queue.add(1, copySymlink, [ from, to, cmdOpts ]) : fromStat.isFile() ? copyFile(from, to, cmdOpts) : fromStat.isBlockDevice() ? Promise.reject(eunsupported(from + " is a block device, and we don't know how to copy those.")) : fromStat.isCharacterDevice() ? Promise.reject(eunsupported(from + " is a character device, and we don't know how to copy those.")) : fromStat.isFIFO() ? Promise.reject(eunsupported(from + " is a FIFO, and we don't know how to copy those.")) : fromStat.isSocket() ? Promise.reject(eunsupported(from + " is a socket, and we don't know how to copy those.")) : Promise.reject(eunsupported("We can't tell what " + from + " is and so we can't copy it."));
        }));
      }
      function recurseDir(from, to, opts) {
        validate("SSO", [ from, to, opts ]);
        var recurseWith = opts.recurseWith || copyItem, fs = opts.fs || nodeFs, chown = opts.chown || promisify(Promise, fs.chown), readdir = opts.readdir || promisify(Promise, fs.readdir);
        return (opts.mkdirpAsync || promisify(Promise, mkdirp))(to, {
          fs,
          mode: opts.mode
        }).then((function() {
          var getuid = opts.getuid || process.getuid;
          if (getuid && null != opts.uid && 0 === getuid()) return chown(to, opts.uid, opts.gid);
        })).then((function() {
          return readdir(from);
        })).then((function(files) {
          files.forEach((function(file) {
            opts.queue.add(0, recurseWith, [ path.join(from, file), path.join(to, file), opts ]);
          }));
        }));
      }
      function copySymlink(from, to, opts) {
        validate("SSO", [ from, to, opts ]);
        var fs = opts.fs || nodeFs, readlink = opts.readlink || promisify(Promise, fs.readlink), stat = opts.stat || promisify(Promise, fs.symlink), symlink = opts.symlink || promisify(Promise, fs.symlink), Promise = opts.Promise || global.Promise;
        return readlink(from).then((function(fromDest) {
          var absoluteDest = path.resolve(path.dirname(from), fromDest), linkFrom = ".." === path.relative(opts.top, absoluteDest).substr(0, 2) ? fromDest : path.relative(path.dirname(from), absoluteDest);
          return opts.isWindows ? stat(absoluteDest).catch((function() {
            return null;
          })).then((function(destStat) {
            var type = destStat && destStat.isDirectory() ? "dir" : "file";
            return symlink(linkFrom, to, type).catch((function(err) {
              return "dir" === type ? symlink(linkFrom, to, "junction") : Promise.reject(err);
            }));
          })) : symlink(linkFrom, to);
        }));
      }
      function copyFile(from, to, opts) {
        validate("SSO", [ from, to, opts ]);
        var fs = opts.fs || nodeFs, writeStreamAtomic = opts.writeStreamAtomic || stockWriteStreamAtomic, Promise = opts.Promise || global.Promise, chmod = opts.chmod || promisify(Promise, fs.chmod), writeOpts = {}, getuid = opts.getuid || process.getuid;
        return getuid && null != opts.uid && 0 === getuid() && (writeOpts.chown = {
          uid: opts.uid,
          gid: opts.gid
        }), new Promise((function(resolve, reject) {
          var errored = !1;
          function onError(err) {
            errored = !0, reject(err);
          }
          fs.createReadStream(from).once("error", onError).pipe(writeStreamAtomic(to, writeOpts)).once("error", onError).once("close", (function() {
            errored || (null != opts.mode ? resolve(chmod(to, opts.mode)) : resolve());
          }));
        }));
      }
      function eunsupported(msg) {
        var err = new Error(msg);
        return err.code = "EUNSUPPORTED", err;
      }
    },
    84469: (module, __unused_webpack_exports, __webpack_require__) => {
      var fs = __webpack_require__(59799), Writable = __webpack_require__(91685).Writable, util = __webpack_require__(73837), MurmurHash3 = __webpack_require__(287), iferr = __webpack_require__(48588), crypto = __webpack_require__(6113);
      var invocations = 0;
      function getTmpname(filename) {
        return filename + "." + function() {
          for (var hash = MurmurHash3(""), ii = 0; ii < arguments.length; ++ii) hash.hash("" + arguments[ii]);
          return hash.result();
        }(__filename, process.pid, ++invocations);
      }
      var setImmediate = global.setImmediate || setTimeout;
      function WriteStreamAtomic(path, options) {
        if (!(this instanceof WriteStreamAtomic)) return new WriteStreamAtomic(path, options);
        var writeStream;
        Writable.call(this, options), this.__isWin = options && options.hasOwnProperty("isWin") ? options.isWin : "win32" === process.platform, 
        this.__atomicTarget = path, this.__atomicTmp = getTmpname(path), this.__atomicChown = options && options.chown, 
        this.__atomicClosed = !1, this.__atomicStream = fs.WriteStream(this.__atomicTmp, options), 
        this.__atomicStream.once("open", (writeStream = this, function(fd) {
          writeStream.emit("open", fd);
        })), this.__atomicStream.once("close", function(writeStream) {
          return function() {
            if (!writeStream.__atomicClosed) {
              if (writeStream.__atomicClosed = !0, writeStream.__atomicChown) {
                var uid = writeStream.__atomicChown.uid, gid = writeStream.__atomicChown.gid;
                return fs.chown(writeStream.__atomicTmp, uid, gid, iferr(cleanup, moveIntoPlace));
              }
              moveIntoPlace();
            }
          };
          function moveIntoPlace() {
            fs.rename(writeStream.__atomicTmp, writeStream.__atomicTarget, iferr(trapWindowsEPERM, end));
          }
          function trapWindowsEPERM(err) {
            writeStream.__isWin && err.syscall && "rename" === err.syscall && err.code && "EPERM" === err.code ? checkFileHashes(err) : cleanup(err);
          }
          function checkFileHashes(eperm) {
            var inprocess = 2, tmpFileHash = crypto.createHash("sha512"), targetFileHash = crypto.createHash("sha512");
            function fileHashError() {
              0 !== inprocess && (inprocess = 0, cleanup(eperm));
            }
            function fileHashComplete() {
              if (0 !== inprocess && !--inprocess) return tmpFileHash.digest("hex") === targetFileHash.digest("hex") ? cleanup() : cleanup(eperm);
            }
            fs.createReadStream(writeStream.__atomicTmp).on("data", (function(data, enc) {
              tmpFileHash.update(data, enc);
            })).on("error", fileHashError).on("end", fileHashComplete), fs.createReadStream(writeStream.__atomicTarget).on("data", (function(data, enc) {
              targetFileHash.update(data, enc);
            })).on("error", fileHashError).on("end", fileHashComplete);
          }
          function cleanup(err) {
            fs.unlink(writeStream.__atomicTmp, (function() {
              err ? (writeStream.emit("error", err), writeStream.emit("close")) : end();
            }));
          }
          function end() {
            Writable.prototype.emit.call(writeStream, "finish"), setImmediate((function() {
              writeStream.emit("close");
            }));
          }
        }(this)), this.__atomicStream.once("error", function(writeStream) {
          return function(er) {
            cleanupSync(), writeStream.emit("error", er), writeStream.__atomicClosed = !0, writeStream.emit("close");
          };
          function cleanupSync() {
            try {
              fs.unlinkSync(writeStream.__atomicTmp);
            } finally {
              return;
            }
          }
        }(this));
      }
      module.exports = WriteStreamAtomic, util.inherits(WriteStreamAtomic, Writable), 
      WriteStreamAtomic.prototype.emit = function(event) {
        return "finish" === event ? this.__atomicStream.end() : Writable.prototype.emit.apply(this, arguments);
      }, WriteStreamAtomic.prototype._write = function(buffer, encoding, cb) {
        if (this.__atomicStream.write(buffer, encoding)) return cb();
        this.__atomicStream.once("drain", cb);
      };
    },
    91685: module => {
      "use strict";
      module.exports = require("./readable-stream");
    },
    34436: module => {
      "use strict";
      module.exports = require("../vendor/glob");
    },
    59799: module => {
      "use strict";
      module.exports = require("../vendor/graceful-fs");
    },
    39491: module => {
      "use strict";
      module.exports = require("assert");
    },
    6113: module => {
      "use strict";
      module.exports = require("crypto");
    },
    57147: module => {
      "use strict";
      module.exports = require("fs");
    },
    71017: module => {
      "use strict";
      module.exports = require("path");
    },
    73837: module => {
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
    return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.exports;
  }(41687);
  module.exports = __webpack_exports__;
})();