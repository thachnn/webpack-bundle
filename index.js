!function() {
  var __webpack_modules__ = {
    623: function(module) {
      function balanced(a, b, str) {
        a instanceof RegExp && (a = maybeMatch(a, str)), b instanceof RegExp && (b = maybeMatch(b, str));
        var r = range(a, b, str);
        return r && {
          start: r[0],
          end: r[1],
          pre: str.slice(0, r[0]),
          body: str.slice(r[0] + a.length, r[1]),
          post: str.slice(r[1] + b.length)
        };
      }
      function maybeMatch(reg, str) {
        var m = str.match(reg);
        return m ? m[0] : null;
      }
      function range(a, b, str) {
        var begs, beg, left, right, result, ai = str.indexOf(a), bi = str.indexOf(b, ai + 1), i = ai;
        if (ai >= 0 && bi > 0) {
          for (begs = [], left = str.length; i >= 0 && !result; ) i == ai ? (begs.push(i), 
          ai = str.indexOf(a, i + 1)) : 1 == begs.length ? result = [ begs.pop(), bi ] : ((beg = begs.pop()) < left && (left = beg, 
          right = bi), bi = str.indexOf(b, i + 1)), i = ai < bi && ai >= 0 ? ai : bi;
          begs.length && (result = [ left, right ]);
        }
        return result;
      }
      module.exports = balanced, balanced.range = range;
    },
    644: function(module, __unused_webpack_exports, __webpack_require__) {
      var concatMap = __webpack_require__(48), balanced = __webpack_require__(623);
      module.exports = function(str) {
        if (!str) return [];
        "{}" === str.substr(0, 2) && (str = "\\{\\}" + str.substr(2));
        return expand(function(str) {
          return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
        }(str), !0).map(unescapeBraces);
      };
      var escSlash = "\0SLASH" + Math.random() + "\0", escOpen = "\0OPEN" + Math.random() + "\0", escClose = "\0CLOSE" + Math.random() + "\0", escComma = "\0COMMA" + Math.random() + "\0", escPeriod = "\0PERIOD" + Math.random() + "\0";
      function numeric(str) {
        return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
      }
      function unescapeBraces(str) {
        return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
      }
      function parseCommaParts(str) {
        if (!str) return [ "" ];
        var parts = [], m = balanced("{", "}", str);
        if (!m) return str.split(",");
        var pre = m.pre, body = m.body, post = m.post, p = pre.split(",");
        p[p.length - 1] += "{" + body + "}";
        var postParts = parseCommaParts(post);
        return post.length && (p[p.length - 1] += postParts.shift(), p.push.apply(p, postParts)), 
        parts.push.apply(parts, p), parts;
      }
      function embrace(str) {
        return "{" + str + "}";
      }
      function isPadded(el) {
        return /^-?0\d/.test(el);
      }
      function lte(i, y) {
        return i <= y;
      }
      function gte(i, y) {
        return i >= y;
      }
      function expand(str, isTop) {
        var expansions = [], m = balanced("{", "}", str);
        if (!m || /\$$/.test(m.pre)) return [ str ];
        var n, isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body), isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body), isSequence = isNumericSequence || isAlphaSequence, isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) return m.post.match(/,.*\}/) ? expand(str = m.pre + "{" + m.body + escClose + m.post) : [ str ];
        if (isSequence) n = m.body.split(/\.\./); else if (1 === (n = parseCommaParts(m.body)).length && 1 === (n = expand(n[0], !1).map(embrace)).length) return (post = m.post.length ? expand(m.post, !1) : [ "" ]).map((function(p) {
          return m.pre + n[0] + p;
        }));
        var N, pre = m.pre, post = m.post.length ? expand(m.post, !1) : [ "" ];
        if (isSequence) {
          var x = numeric(n[0]), y = numeric(n[1]), width = Math.max(n[0].length, n[1].length), incr = 3 == n.length ? Math.abs(numeric(n[2])) : 1, test = lte;
          y < x && (incr *= -1, test = gte);
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test(i, y); i += incr) {
            var c;
            if (isAlphaSequence) "\\" === (c = String.fromCharCode(i)) && (c = ""); else if (c = String(i), 
            pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                c = i < 0 ? "-" + z + c.slice(1) : z + c;
              }
            }
            N.push(c);
          }
        } else N = concatMap(n, (function(el) {
          return expand(el, !1);
        }));
        for (var j = 0; j < N.length; j++) for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          (!isTop || isSequence || expansion) && expansions.push(expansion);
        }
        return expansions;
      }
    },
    48: function(module) {
      module.exports = function(xs, fn) {
        for (var res = [], i = 0; i < xs.length; i++) {
          var x = fn(xs[i], i);
          isArray(x) ? res.push.apply(res, x) : res.push(x);
        }
        return res;
      };
      var isArray = Array.isArray || function(xs) {
        return "[object Array]" === Object.prototype.toString.call(xs);
      };
    },
    983: function(module) {
      "use strict";
      var RE_MULTILINE_COMMENTS = /\/\*[\S\s]*?\*\//, RE_EMPTY_LINE = /^\s*$/, RE_LEADING_WHITESPACE = /^[ \t]+/;
      function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
      }
      module.exports = function(str) {
        if ("string" != typeof str) throw new TypeError("Expected a string");
        for (var lines = str.replace(RE_MULTILINE_COMMENTS, "").split(/\r?\n/), tabs = 0, spaces = [], i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (!RE_EMPTY_LINE.test(line)) {
            var matches = line.match(RE_LEADING_WHITESPACE);
            if (matches) {
              var whitespace = matches[0], len = whitespace.length;
              -1 !== whitespace.indexOf("\t") && tabs++, len % 2 == 1 && (len += 1), -1 !== whitespace.indexOf(" ") && spaces.push(len);
            }
          }
        }
        if (tabs > spaces.length) return "\t";
        if (0 === spaces.length) return null;
        var indentSize = spaces.reduce(gcd);
        return indentSize > 0 ? new Array(indentSize + 1).join(" ") : null;
      };
    },
    772: function(__unused_webpack_module, exports, __webpack_require__) {
      function ownProp(obj, field) {
        return Object.prototype.hasOwnProperty.call(obj, field);
      }
      exports.alphasort = alphasort, exports.alphasorti = alphasorti, exports.setopts = function(self, pattern, options) {
        options || (options = {});
        if (options.matchBase && -1 === pattern.indexOf("/")) {
          if (options.noglobstar) throw new Error("base matching requires globstar");
          pattern = "**/" + pattern;
        }
        self.silent = !!options.silent, self.pattern = pattern, self.strict = !1 !== options.strict, 
        self.realpath = !!options.realpath, self.realpathCache = options.realpathCache || Object.create(null), 
        self.follow = !!options.follow, self.dot = !!options.dot, self.mark = !!options.mark, 
        self.nodir = !!options.nodir, self.nodir && (self.mark = !0);
        self.sync = !!options.sync, self.nounique = !!options.nounique, self.nonull = !!options.nonull, 
        self.nosort = !!options.nosort, self.nocase = !!options.nocase, self.stat = !!options.stat, 
        self.noprocess = !!options.noprocess, self.maxLength = options.maxLength || 1 / 0, 
        self.cache = options.cache || Object.create(null), self.statCache = options.statCache || Object.create(null), 
        self.symlinks = options.symlinks || Object.create(null), function(self, options) {
          self.ignore = options.ignore || [], Array.isArray(self.ignore) || (self.ignore = [ self.ignore ]);
          self.ignore.length && (self.ignore = self.ignore.map(ignoreMap));
        }(self, options), self.changedCwd = !1;
        var cwd = process.cwd();
        ownProp(options, "cwd") ? (self.cwd = options.cwd, self.changedCwd = path.resolve(options.cwd) !== cwd) : self.cwd = cwd;
        self.root = options.root || path.resolve(self.cwd, "/"), self.root = path.resolve(self.root), 
        "win32" === process.platform && (self.root = self.root.replace(/\\/g, "/"));
        self.nomount = !!options.nomount, options.nonegate = !0, options.nocomment = !0, 
        self.minimatch = new Minimatch(pattern, options), self.options = self.minimatch.options;
      }, exports.ownProp = ownProp, exports.makeAbs = makeAbs, exports.finish = function(self) {
        for (var nou = self.nounique, all = nou ? [] : Object.create(null), i = 0, l = self.matches.length; i < l; i++) {
          var matches = self.matches[i];
          if (matches && 0 !== Object.keys(matches).length) {
            var m = Object.keys(matches);
            nou ? all.push.apply(all, m) : m.forEach((function(m) {
              all[m] = !0;
            }));
          } else if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            nou ? all.push(literal) : all[literal] = !0;
          }
        }
        nou || (all = Object.keys(all));
        self.nosort || (all = all.sort(self.nocase ? alphasorti : alphasort));
        if (self.mark) {
          for (i = 0; i < all.length; i++) all[i] = self._mark(all[i]);
          self.nodir && (all = all.filter((function(e) {
            return !/\/$/.test(e);
          })));
        }
        self.ignore.length && (all = all.filter((function(m) {
          return !isIgnored(self, m);
        })));
        self.found = all;
      }, exports.mark = function(self, p) {
        var abs = makeAbs(self, p), c = self.cache[abs], m = p;
        if (c) {
          var isDir = "DIR" === c || Array.isArray(c), slash = "/" === p.slice(-1);
          if (isDir && !slash ? m += "/" : !isDir && slash && (m = m.slice(0, -1)), m !== p) {
            var mabs = makeAbs(self, m);
            self.statCache[mabs] = self.statCache[abs], self.cache[mabs] = self.cache[abs];
          }
        }
        return m;
      }, exports.isIgnored = isIgnored, exports.childrenIgnored = function(self, path) {
        return !!self.ignore.length && self.ignore.some((function(item) {
          return !(!item.gmatcher || !item.gmatcher.match(path));
        }));
      };
      var path = __webpack_require__(17), minimatch = __webpack_require__(171), isAbsolute = __webpack_require__(95), Minimatch = minimatch.Minimatch;
      function alphasorti(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
      function alphasort(a, b) {
        return a.localeCompare(b);
      }
      function ignoreMap(pattern) {
        var gmatcher = null;
        if ("/**" === pattern.slice(-3)) {
          var gpattern = pattern.replace(/(\/\*\*)+$/, "");
          gmatcher = new Minimatch(gpattern, {
            dot: !0
          });
        }
        return {
          matcher: new Minimatch(pattern, {
            dot: !0
          }),
          gmatcher: gmatcher
        };
      }
      function makeAbs(self, f) {
        return "/" === f.charAt(0) ? path.join(self.root, f) : isAbsolute(f) || "" === f ? f : self.changedCwd ? path.resolve(self.cwd, f) : path.resolve(f);
      }
      function isIgnored(self, path) {
        return !!self.ignore.length && self.ignore.some((function(item) {
          return item.matcher.match(path) || !(!item.gmatcher || !item.gmatcher.match(path));
        }));
      }
    },
    884: function(module, __unused_webpack_exports, __webpack_require__) {
      module.exports = glob;
      var fs = __webpack_require__(147), minimatch = __webpack_require__(171), inherits = (minimatch.Minimatch, 
      __webpack_require__(378)), EE = __webpack_require__(361).EventEmitter, path = __webpack_require__(17), assert = __webpack_require__(491), isAbsolute = __webpack_require__(95), globSync = __webpack_require__(751), common = __webpack_require__(772), setopts = (common.alphasort, 
      common.alphasorti, common.setopts), ownProp = common.ownProp, inflight = __webpack_require__(844), childrenIgnored = (__webpack_require__(837), 
      common.childrenIgnored), isIgnored = common.isIgnored, once = __webpack_require__(778);
      function glob(pattern, options, cb) {
        if ("function" == typeof options && (cb = options, options = {}), options || (options = {}), 
        options.sync) {
          if (cb) throw new TypeError("callback provided to sync glob");
          return globSync(pattern, options);
        }
        return new Glob(pattern, options, cb);
      }
      glob.sync = globSync;
      var GlobSync = glob.GlobSync = globSync.GlobSync;
      function Glob(pattern, options, cb) {
        if ("function" == typeof options && (cb = options, options = null), options && options.sync) {
          if (cb) throw new TypeError("callback provided to sync glob");
          return new GlobSync(pattern, options);
        }
        if (!(this instanceof Glob)) return new Glob(pattern, options, cb);
        setopts(this, pattern, options), this._didRealPath = !1;
        var n = this.minimatch.set.length;
        this.matches = new Array(n), "function" == typeof cb && (cb = once(cb), this.on("error", cb), 
        this.on("end", (function(matches) {
          cb(null, matches);
        })));
        var self = this;
        n = this.minimatch.set.length;
        if (this._processing = 0, this.matches = new Array(n), this._emitQueue = [], this._processQueue = [], 
        this.paused = !1, this.noprocess) return this;
        if (0 === n) return done();
        for (var i = 0; i < n; i++) this._process(this.minimatch.set[i], i, !1, done);
        function done() {
          --self._processing, self._processing <= 0 && self._finish();
        }
      }
      glob.glob = glob, glob.hasMagic = function(pattern, options_) {
        var options = function(origin, add) {
          if (null === add || "object" != typeof add) return origin;
          for (var keys = Object.keys(add), i = keys.length; i--; ) origin[keys[i]] = add[keys[i]];
          return origin;
        }({}, options_);
        options.noprocess = !0;
        var set = new Glob(pattern, options).minimatch.set;
        if (set.length > 1) return !0;
        for (var j = 0; j < set[0].length; j++) if ("string" != typeof set[0][j]) return !0;
        return !1;
      }, glob.Glob = Glob, inherits(Glob, EE), Glob.prototype._finish = function() {
        if (assert(this instanceof Glob), !this.aborted) {
          if (this.realpath && !this._didRealpath) return this._realpath();
          common.finish(this), this.emit("end", this.found);
        }
      }, Glob.prototype._realpath = function() {
        if (!this._didRealpath) {
          this._didRealpath = !0;
          var n = this.matches.length;
          if (0 === n) return this._finish();
          for (var self = this, i = 0; i < this.matches.length; i++) this._realpathSet(i, next);
        }
        function next() {
          0 == --n && self._finish();
        }
      }, Glob.prototype._realpathSet = function(index, cb) {
        var matchset = this.matches[index];
        if (!matchset) return cb();
        var found = Object.keys(matchset), self = this, n = found.length;
        if (0 === n) return cb();
        var set = this.matches[index] = Object.create(null);
        found.forEach((function(p, i) {
          p = self._makeAbs(p), fs.realpath(p, self.realpathCache, (function(er, real) {
            er ? "stat" === er.syscall ? set[p] = !0 : self.emit("error", er) : set[real] = !0, 
            0 == --n && (self.matches[index] = set, cb());
          }));
        }));
      }, Glob.prototype._mark = function(p) {
        return common.mark(this, p);
      }, Glob.prototype._makeAbs = function(f) {
        return common.makeAbs(this, f);
      }, Glob.prototype.abort = function() {
        this.aborted = !0, this.emit("abort");
      }, Glob.prototype.pause = function() {
        this.paused || (this.paused = !0, this.emit("pause"));
      }, Glob.prototype.resume = function() {
        if (this.paused) {
          if (this.emit("resume"), this.paused = !1, this._emitQueue.length) {
            var eq = this._emitQueue.slice(0);
            this._emitQueue.length = 0;
            for (var i = 0; i < eq.length; i++) {
              var e = eq[i];
              this._emitMatch(e[0], e[1]);
            }
          }
          if (this._processQueue.length) {
            var pq = this._processQueue.slice(0);
            this._processQueue.length = 0;
            for (i = 0; i < pq.length; i++) {
              var p = pq[i];
              this._processing--, this._process(p[0], p[1], p[2], p[3]);
            }
          }
        }
      }, Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
        if (assert(this instanceof Glob), assert("function" == typeof cb), !this.aborted) if (this._processing++, 
        this.paused) this._processQueue.push([ pattern, index, inGlobStar, cb ]); else {
          for (var prefix, n = 0; "string" == typeof pattern[n]; ) n++;
          switch (n) {
           case pattern.length:
            return void this._processSimple(pattern.join("/"), index, cb);

           case 0:
            prefix = null;
            break;

           default:
            prefix = pattern.slice(0, n).join("/");
          }
          var read, remain = pattern.slice(n);
          null === prefix ? read = "." : isAbsolute(prefix) || isAbsolute(pattern.join("/")) ? (prefix && isAbsolute(prefix) || (prefix = "/" + prefix), 
          read = prefix) : read = prefix;
          var abs = this._makeAbs(read);
          if (childrenIgnored(this, read)) return cb();
          remain[0] === minimatch.GLOBSTAR ? this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb) : this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
        }
      }, Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
        var self = this;
        this._readdir(abs, inGlobStar, (function(er, entries) {
          return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
        }));
      }, Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
        if (!entries) return cb();
        for (var pn = remain[0], negate = !!this.minimatch.negate, rawGlob = pn._glob, dotOk = this.dot || "." === rawGlob.charAt(0), matchedEntries = [], i = 0; i < entries.length; i++) {
          if ("." !== (e = entries[i]).charAt(0) || dotOk) (negate && !prefix ? !e.match(pn) : e.match(pn)) && matchedEntries.push(e);
        }
        var len = matchedEntries.length;
        if (0 === len) return cb();
        if (1 === remain.length && !this.mark && !this.stat) {
          this.matches[index] || (this.matches[index] = Object.create(null));
          for (i = 0; i < len; i++) {
            var e = matchedEntries[i];
            prefix && (e = "/" !== prefix ? prefix + "/" + e : prefix + e), "/" !== e.charAt(0) || this.nomount || (e = path.join(this.root, e)), 
            this._emitMatch(index, e);
          }
          return cb();
        }
        remain.shift();
        for (i = 0; i < len; i++) {
          e = matchedEntries[i];
          prefix && (e = "/" !== prefix ? prefix + "/" + e : prefix + e), this._process([ e ].concat(remain), index, inGlobStar, cb);
        }
        cb();
      }, Glob.prototype._emitMatch = function(index, e) {
        if (!this.aborted && !this.matches[index][e] && !isIgnored(this, e)) if (this.paused) this._emitQueue.push([ index, e ]); else {
          var abs = this._makeAbs(e);
          if (this.nodir) {
            var c = this.cache[abs];
            if ("DIR" === c || Array.isArray(c)) return;
          }
          this.mark && (e = this._mark(e)), this.matches[index][e] = !0;
          var st = this.statCache[abs];
          st && this.emit("stat", e, st), this.emit("match", e);
        }
      }, Glob.prototype._readdirInGlobStar = function(abs, cb) {
        if (!this.aborted) {
          if (this.follow) return this._readdir(abs, !1, cb);
          var self = this, lstatcb = inflight("lstat\0" + abs, (function(er, lstat) {
            if (er) return cb();
            var isSym = lstat.isSymbolicLink();
            self.symlinks[abs] = isSym, isSym || lstat.isDirectory() ? self._readdir(abs, !1, cb) : (self.cache[abs] = "FILE", 
            cb());
          }));
          lstatcb && fs.lstat(abs, lstatcb);
        }
      }, Glob.prototype._readdir = function(abs, inGlobStar, cb) {
        if (!this.aborted && (cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb))) {
          if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);
          if (ownProp(this.cache, abs)) {
            var c = this.cache[abs];
            if (!c || "FILE" === c) return cb();
            if (Array.isArray(c)) return cb(null, c);
          }
          fs.readdir(abs, function(self, abs, cb) {
            return function(er, entries) {
              er ? self._readdirError(abs, er, cb) : self._readdirEntries(abs, entries, cb);
            };
          }(this, abs, cb));
        }
      }, Glob.prototype._readdirEntries = function(abs, entries, cb) {
        if (!this.aborted) {
          if (!this.mark && !this.stat) for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            e = "/" === abs ? abs + e : abs + "/" + e, this.cache[e] = !0;
          }
          return this.cache[abs] = entries, cb(null, entries);
        }
      }, Glob.prototype._readdirError = function(f, er, cb) {
        if (!this.aborted) {
          switch (er.code) {
           case "ENOTSUP":
           case "ENOTDIR":
            this.cache[this._makeAbs(f)] = "FILE";
            break;

           case "ENOENT":
           case "ELOOP":
           case "ENAMETOOLONG":
           case "UNKNOWN":
            this.cache[this._makeAbs(f)] = !1;
            break;

           default:
            this.cache[this._makeAbs(f)] = !1, this.strict && (this.emit("error", er), this.abort()), 
            this.silent || console.error("glob error", er);
          }
          return cb();
        }
      }, Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
        var self = this;
        this._readdir(abs, inGlobStar, (function(er, entries) {
          self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
        }));
      }, Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
        if (!entries) return cb();
        var remainWithoutGlobStar = remain.slice(1), gspref = prefix ? [ prefix ] : [], noGlobStar = gspref.concat(remainWithoutGlobStar);
        this._process(noGlobStar, index, !1, cb);
        var isSym = this.symlinks[abs], len = entries.length;
        if (isSym && inGlobStar) return cb();
        for (var i = 0; i < len; i++) {
          if ("." !== entries[i].charAt(0) || this.dot) {
            var instead = gspref.concat(entries[i], remainWithoutGlobStar);
            this._process(instead, index, !0, cb);
            var below = gspref.concat(entries[i], remain);
            this._process(below, index, !0, cb);
          }
        }
        cb();
      }, Glob.prototype._processSimple = function(prefix, index, cb) {
        var self = this;
        this._stat(prefix, (function(er, exists) {
          self._processSimple2(prefix, index, er, exists, cb);
        }));
      }, Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
        if (this.matches[index] || (this.matches[index] = Object.create(null)), !exists) return cb();
        if (prefix && isAbsolute(prefix) && !this.nomount) {
          var trail = /[\/\\]$/.test(prefix);
          "/" === prefix.charAt(0) ? prefix = path.join(this.root, prefix) : (prefix = path.resolve(this.root, prefix), 
          trail && (prefix += "/"));
        }
        "win32" === process.platform && (prefix = prefix.replace(/\\/g, "/")), this._emitMatch(index, prefix), 
        cb();
      }, Glob.prototype._stat = function(f, cb) {
        var abs = this._makeAbs(f), needDir = "/" === f.slice(-1);
        if (f.length > this.maxLength) return cb();
        if (!this.stat && ownProp(this.cache, abs)) {
          var c = this.cache[abs];
          if (Array.isArray(c) && (c = "DIR"), !needDir || "DIR" === c) return cb(null, c);
          if (needDir && "FILE" === c) return cb();
        }
        var stat = this.statCache[abs];
        if (void 0 !== stat) {
          if (!1 === stat) return cb(null, stat);
          var type = stat.isDirectory() ? "DIR" : "FILE";
          return needDir && "FILE" === type ? cb() : cb(null, type, stat);
        }
        var self = this, statcb = inflight("stat\0" + abs, (function(er, lstat) {
          if (lstat && lstat.isSymbolicLink()) return fs.stat(abs, (function(er, stat) {
            er ? self._stat2(f, abs, null, lstat, cb) : self._stat2(f, abs, er, stat, cb);
          }));
          self._stat2(f, abs, er, lstat, cb);
        }));
        statcb && fs.lstat(abs, statcb);
      }, Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
        if (er) return this.statCache[abs] = !1, cb();
        var needDir = "/" === f.slice(-1);
        if (this.statCache[abs] = stat, "/" === abs.slice(-1) && !stat.isDirectory()) return cb(null, !1, stat);
        var c = stat.isDirectory() ? "DIR" : "FILE";
        return this.cache[abs] = this.cache[abs] || c, needDir && "DIR" !== c ? cb() : cb(null, c, stat);
      };
    },
    751: function(module, __unused_webpack_exports, __webpack_require__) {
      module.exports = globSync, globSync.GlobSync = GlobSync;
      var fs = __webpack_require__(147), minimatch = __webpack_require__(171), path = (minimatch.Minimatch, 
      __webpack_require__(884).Glob, __webpack_require__(837), __webpack_require__(17)), assert = __webpack_require__(491), isAbsolute = __webpack_require__(95), common = __webpack_require__(772), setopts = (common.alphasort, 
      common.alphasorti, common.setopts), ownProp = common.ownProp, childrenIgnored = common.childrenIgnored;
      function globSync(pattern, options) {
        if ("function" == typeof options || 3 === arguments.length) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
        return new GlobSync(pattern, options).found;
      }
      function GlobSync(pattern, options) {
        if (!pattern) throw new Error("must provide pattern");
        if ("function" == typeof options || 3 === arguments.length) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
        if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);
        if (setopts(this, pattern, options), this.noprocess) return this;
        var n = this.minimatch.set.length;
        this.matches = new Array(n);
        for (var i = 0; i < n; i++) this._process(this.minimatch.set[i], i, !1);
        this._finish();
      }
      GlobSync.prototype._finish = function() {
        if (assert(this instanceof GlobSync), this.realpath) {
          var self = this;
          this.matches.forEach((function(matchset, index) {
            var set = self.matches[index] = Object.create(null);
            for (var p in matchset) try {
              p = self._makeAbs(p), set[fs.realpathSync(p, self.realpathCache)] = !0;
            } catch (er) {
              if ("stat" !== er.syscall) throw er;
              set[self._makeAbs(p)] = !0;
            }
          }));
        }
        common.finish(this);
      }, GlobSync.prototype._process = function(pattern, index, inGlobStar) {
        assert(this instanceof GlobSync);
        for (var prefix, n = 0; "string" == typeof pattern[n]; ) n++;
        switch (n) {
         case pattern.length:
          return void this._processSimple(pattern.join("/"), index);

         case 0:
          prefix = null;
          break;

         default:
          prefix = pattern.slice(0, n).join("/");
        }
        var read, remain = pattern.slice(n);
        null === prefix ? read = "." : isAbsolute(prefix) || isAbsolute(pattern.join("/")) ? (prefix && isAbsolute(prefix) || (prefix = "/" + prefix), 
        read = prefix) : read = prefix;
        var abs = this._makeAbs(read);
        childrenIgnored(this, read) || (remain[0] === minimatch.GLOBSTAR ? this._processGlobStar(prefix, read, abs, remain, index, inGlobStar) : this._processReaddir(prefix, read, abs, remain, index, inGlobStar));
      }, GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
        var entries = this._readdir(abs, inGlobStar);
        if (entries) {
          for (var pn = remain[0], negate = !!this.minimatch.negate, rawGlob = pn._glob, dotOk = this.dot || "." === rawGlob.charAt(0), matchedEntries = [], i = 0; i < entries.length; i++) {
            if ("." !== (e = entries[i]).charAt(0) || dotOk) (negate && !prefix ? !e.match(pn) : e.match(pn)) && matchedEntries.push(e);
          }
          var len = matchedEntries.length;
          if (0 !== len) if (1 !== remain.length || this.mark || this.stat) {
            remain.shift();
            for (i = 0; i < len; i++) {
              var newPattern;
              e = matchedEntries[i];
              newPattern = prefix ? [ prefix, e ] : [ e ], this._process(newPattern.concat(remain), index, inGlobStar);
            }
          } else {
            this.matches[index] || (this.matches[index] = Object.create(null));
            for (var i = 0; i < len; i++) {
              var e = matchedEntries[i];
              prefix && (e = "/" !== prefix.slice(-1) ? prefix + "/" + e : prefix + e), "/" !== e.charAt(0) || this.nomount || (e = path.join(this.root, e)), 
              this.matches[index][e] = !0;
            }
          }
        }
      }, GlobSync.prototype._emitMatch = function(index, e) {
        this._makeAbs(e);
        if (this.mark && (e = this._mark(e)), !this.matches[index][e]) {
          if (this.nodir) {
            var c = this.cache[this._makeAbs(e)];
            if ("DIR" === c || Array.isArray(c)) return;
          }
          this.matches[index][e] = !0, this.stat && this._stat(e);
        }
      }, GlobSync.prototype._readdirInGlobStar = function(abs) {
        if (this.follow) return this._readdir(abs, !1);
        var entries, lstat;
        try {
          lstat = fs.lstatSync(abs);
        } catch (er) {
          return null;
        }
        var isSym = lstat.isSymbolicLink();
        return this.symlinks[abs] = isSym, isSym || lstat.isDirectory() ? entries = this._readdir(abs, !1) : this.cache[abs] = "FILE", 
        entries;
      }, GlobSync.prototype._readdir = function(abs, inGlobStar) {
        if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);
        if (ownProp(this.cache, abs)) {
          var c = this.cache[abs];
          if (!c || "FILE" === c) return null;
          if (Array.isArray(c)) return c;
        }
        try {
          return this._readdirEntries(abs, fs.readdirSync(abs));
        } catch (er) {
          return this._readdirError(abs, er), null;
        }
      }, GlobSync.prototype._readdirEntries = function(abs, entries) {
        if (!this.mark && !this.stat) for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          e = "/" === abs ? abs + e : abs + "/" + e, this.cache[e] = !0;
        }
        return this.cache[abs] = entries, entries;
      }, GlobSync.prototype._readdirError = function(f, er) {
        switch (er.code) {
         case "ENOTSUP":
         case "ENOTDIR":
          this.cache[this._makeAbs(f)] = "FILE";
          break;

         case "ENOENT":
         case "ELOOP":
         case "ENAMETOOLONG":
         case "UNKNOWN":
          this.cache[this._makeAbs(f)] = !1;
          break;

         default:
          if (this.cache[this._makeAbs(f)] = !1, this.strict) throw er;
          this.silent || console.error("glob error", er);
        }
      }, GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
        var entries = this._readdir(abs, inGlobStar);
        if (entries) {
          var remainWithoutGlobStar = remain.slice(1), gspref = prefix ? [ prefix ] : [], noGlobStar = gspref.concat(remainWithoutGlobStar);
          this._process(noGlobStar, index, !1);
          var len = entries.length;
          if (!this.symlinks[abs] || !inGlobStar) for (var i = 0; i < len; i++) {
            if ("." !== entries[i].charAt(0) || this.dot) {
              var instead = gspref.concat(entries[i], remainWithoutGlobStar);
              this._process(instead, index, !0);
              var below = gspref.concat(entries[i], remain);
              this._process(below, index, !0);
            }
          }
        }
      }, GlobSync.prototype._processSimple = function(prefix, index) {
        var exists = this._stat(prefix);
        if (this.matches[index] || (this.matches[index] = Object.create(null)), exists) {
          if (prefix && isAbsolute(prefix) && !this.nomount) {
            var trail = /[\/\\]$/.test(prefix);
            "/" === prefix.charAt(0) ? prefix = path.join(this.root, prefix) : (prefix = path.resolve(this.root, prefix), 
            trail && (prefix += "/"));
          }
          "win32" === process.platform && (prefix = prefix.replace(/\\/g, "/")), this.matches[index][prefix] = !0;
        }
      }, GlobSync.prototype._stat = function(f) {
        var abs = this._makeAbs(f), needDir = "/" === f.slice(-1);
        if (f.length > this.maxLength) return !1;
        if (!this.stat && ownProp(this.cache, abs)) {
          var c = this.cache[abs];
          if (Array.isArray(c) && (c = "DIR"), !needDir || "DIR" === c) return c;
          if (needDir && "FILE" === c) return !1;
        }
        var stat = this.statCache[abs];
        if (!stat) {
          var lstat;
          try {
            lstat = fs.lstatSync(abs);
          } catch (er) {
            return !1;
          }
          if (lstat.isSymbolicLink()) try {
            stat = fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          } else stat = lstat;
        }
        this.statCache[abs] = stat;
        c = stat.isDirectory() ? "DIR" : "FILE";
        return this.cache[abs] = this.cache[abs] || c, (!needDir || "DIR" === c) && c;
      }, GlobSync.prototype._mark = function(p) {
        return common.mark(this, p);
      }, GlobSync.prototype._makeAbs = function(f) {
        return common.makeAbs(this, f);
      };
    },
    844: function(module, __unused_webpack_exports, __webpack_require__) {
      var wrappy = __webpack_require__(479), reqs = Object.create(null), once = __webpack_require__(778);
      function slice(args) {
        for (var length = args.length, array = [], i = 0; i < length; i++) array[i] = args[i];
        return array;
      }
      module.exports = wrappy((function(key, cb) {
        return reqs[key] ? (reqs[key].push(cb), null) : (reqs[key] = [ cb ], function(key) {
          return once((function RES() {
            var cbs = reqs[key], len = cbs.length, args = slice(arguments);
            try {
              for (var i = 0; i < len; i++) cbs[i].apply(null, args);
            } finally {
              cbs.length > len ? (cbs.splice(0, len), process.nextTick((function() {
                RES.apply(null, args);
              }))) : delete reqs[key];
            }
          }));
        }(key));
      }));
    },
    378: function(module, __unused_webpack_exports, __webpack_require__) {
      try {
        var util = __webpack_require__(837);
        if ("function" != typeof util.inherits) throw "";
        module.exports = util.inherits;
      } catch (e) {
        module.exports = __webpack_require__(717);
      }
    },
    717: function(module) {
      "function" == typeof Object.create ? module.exports = function(ctor, superCtor) {
        ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        });
      } : module.exports = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor, ctor.prototype.constructor = ctor;
      };
    },
    171: function(module, __unused_webpack_exports, __webpack_require__) {
      module.exports = minimatch, minimatch.Minimatch = Minimatch;
      var path = {
        sep: "/"
      };
      try {
        path = __webpack_require__(17);
      } catch (er) {}
      var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}, expand = __webpack_require__(644), plTypes = {
        "!": {
          open: "(?:(?!(?:",
          close: "))[^/]*?)"
        },
        "?": {
          open: "(?:",
          close: ")?"
        },
        "+": {
          open: "(?:",
          close: ")+"
        },
        "*": {
          open: "(?:",
          close: ")*"
        },
        "@": {
          open: "(?:",
          close: ")"
        }
      }, reSpecials = "().*{}+?[]^$\\!".split("").reduce((function(set, c) {
        return set[c] = !0, set;
      }), {});
      var slashSplit = /\/+/;
      function ext(a, b) {
        a = a || {}, b = b || {};
        var t = {};
        return Object.keys(b).forEach((function(k) {
          t[k] = b[k];
        })), Object.keys(a).forEach((function(k) {
          t[k] = a[k];
        })), t;
      }
      function minimatch(p, pattern, options) {
        if ("string" != typeof pattern) throw new TypeError("glob pattern string required");
        return options || (options = {}), !(!options.nocomment && "#" === pattern.charAt(0)) && ("" === pattern.trim() ? "" === p : new Minimatch(pattern, options).match(p));
      }
      function Minimatch(pattern, options) {
        if (!(this instanceof Minimatch)) return new Minimatch(pattern, options);
        if ("string" != typeof pattern) throw new TypeError("glob pattern string required");
        options || (options = {}), pattern = pattern.trim(), "/" !== path.sep && (pattern = pattern.split(path.sep).join("/")), 
        this.options = options, this.set = [], this.pattern = pattern, this.regexp = null, 
        this.negate = !1, this.comment = !1, this.empty = !1, this.make();
      }
      function braceExpand(pattern, options) {
        if (options || (options = this instanceof Minimatch ? this.options : {}), void 0 === (pattern = void 0 === pattern ? this.pattern : pattern)) throw new TypeError("undefined pattern");
        return options.nobrace || !pattern.match(/\{.*\}/) ? [ pattern ] : expand(pattern);
      }
      minimatch.filter = function(pattern, options) {
        return options = options || {}, function(p, i, list) {
          return minimatch(p, pattern, options);
        };
      }, minimatch.defaults = function(def) {
        if (!def || !Object.keys(def).length) return minimatch;
        var orig = minimatch, m = function(p, pattern, options) {
          return orig.minimatch(p, pattern, ext(def, options));
        };
        return m.Minimatch = function(pattern, options) {
          return new orig.Minimatch(pattern, ext(def, options));
        }, m;
      }, Minimatch.defaults = function(def) {
        return def && Object.keys(def).length ? minimatch.defaults(def).Minimatch : Minimatch;
      }, Minimatch.prototype.debug = function() {}, Minimatch.prototype.make = function() {
        if (this._made) return;
        var pattern = this.pattern, options = this.options;
        if (!options.nocomment && "#" === pattern.charAt(0)) return void (this.comment = !0);
        if (!pattern) return void (this.empty = !0);
        this.parseNegate();
        var set = this.globSet = this.braceExpand();
        options.debug && (this.debug = console.error);
        this.debug(this.pattern, set), set = this.globParts = set.map((function(s) {
          return s.split(slashSplit);
        })), this.debug(this.pattern, set), set = set.map((function(s, si, set) {
          return s.map(this.parse, this);
        }), this), this.debug(this.pattern, set), set = set.filter((function(s) {
          return -1 === s.indexOf(!1);
        })), this.debug(this.pattern, set), this.set = set;
      }, Minimatch.prototype.parseNegate = function() {
        var pattern = this.pattern, negate = !1, options = this.options, negateOffset = 0;
        if (options.nonegate) return;
        for (var i = 0, l = pattern.length; i < l && "!" === pattern.charAt(i); i++) negate = !negate, 
        negateOffset++;
        negateOffset && (this.pattern = pattern.substr(negateOffset));
        this.negate = negate;
      }, minimatch.braceExpand = function(pattern, options) {
        return braceExpand(pattern, options);
      }, Minimatch.prototype.braceExpand = braceExpand, Minimatch.prototype.parse = function(pattern, isSub) {
        if (pattern.length > 65536) throw new TypeError("pattern is too long");
        var options = this.options;
        if (!options.noglobstar && "**" === pattern) return GLOBSTAR;
        if ("" === pattern) return "";
        var stateChar, re = "", hasMagic = !!options.nocase, escaping = !1, patternListStack = [], negativeLists = [], inClass = !1, reClassStart = -1, classStart = -1, patternStart = "." === pattern.charAt(0) ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", self = this;
        function clearStateChar() {
          if (stateChar) {
            switch (stateChar) {
             case "*":
              re += "[^/]*?", hasMagic = !0;
              break;

             case "?":
              re += "[^/]", hasMagic = !0;
              break;

             default:
              re += "\\" + stateChar;
            }
            self.debug("clearStateChar %j %j", stateChar, re), stateChar = !1;
          }
        }
        for (var c, i = 0, len = pattern.length; i < len && (c = pattern.charAt(i)); i++) if (this.debug("%s\t%s %s %j", pattern, i, re, c), 
        escaping && reSpecials[c]) re += "\\" + c, escaping = !1; else switch (c) {
         case "/":
          return !1;

         case "\\":
          clearStateChar(), escaping = !0;
          continue;

         case "?":
         case "*":
         case "+":
         case "@":
         case "!":
          if (this.debug("%s\t%s %s %j <-- stateChar", pattern, i, re, c), inClass) {
            this.debug("  in class"), "!" === c && i === classStart + 1 && (c = "^"), re += c;
            continue;
          }
          self.debug("call clearStateChar %j", stateChar), clearStateChar(), stateChar = c, 
          options.noext && clearStateChar();
          continue;

         case "(":
          if (inClass) {
            re += "(";
            continue;
          }
          if (!stateChar) {
            re += "\\(";
            continue;
          }
          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          }), re += "!" === stateChar ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", stateChar, re), 
          stateChar = !1;
          continue;

         case ")":
          if (inClass || !patternListStack.length) {
            re += "\\)";
            continue;
          }
          clearStateChar(), hasMagic = !0;
          var pl = patternListStack.pop();
          re += pl.close, "!" === pl.type && negativeLists.push(pl), pl.reEnd = re.length;
          continue;

         case "|":
          if (inClass || !patternListStack.length || escaping) {
            re += "\\|", escaping = !1;
            continue;
          }
          clearStateChar(), re += "|";
          continue;

         case "[":
          if (clearStateChar(), inClass) {
            re += "\\" + c;
            continue;
          }
          inClass = !0, classStart = i, reClassStart = re.length, re += c;
          continue;

         case "]":
          if (i === classStart + 1 || !inClass) {
            re += "\\" + c, escaping = !1;
            continue;
          }
          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]", hasMagic = hasMagic || sp[1], 
              inClass = !1;
              continue;
            }
          }
          hasMagic = !0, inClass = !1, re += c;
          continue;

         default:
          clearStateChar(), escaping ? escaping = !1 : !reSpecials[c] || "^" === c && inClass || (re += "\\"), 
          re += c;
        }
        inClass && (cs = pattern.substr(classStart + 1), sp = this.parse(cs, SUBPARSE), 
        re = re.substr(0, reClassStart) + "\\[" + sp[0], hasMagic = hasMagic || sp[1]);
        for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
          var tail = re.slice(pl.reStart + pl.open.length);
          this.debug("setting tail", re, pl), tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (function(_, $1, $2) {
            return $2 || ($2 = "\\"), $1 + $1 + $2 + "|";
          })), this.debug("tail=%j\n   %s", tail, tail, pl, re);
          var t = "*" === pl.type ? "[^/]*?" : "?" === pl.type ? "[^/]" : "\\" + pl.type;
          hasMagic = !0, re = re.slice(0, pl.reStart) + t + "\\(" + tail;
        }
        clearStateChar(), escaping && (re += "\\\\");
        var addPatternStart = !1;
        switch (re.charAt(0)) {
         case ".":
         case "[":
         case "(":
          addPatternStart = !0;
        }
        for (var n = negativeLists.length - 1; n > -1; n--) {
          var nl = negativeLists[n], nlBefore = re.slice(0, nl.reStart), nlFirst = re.slice(nl.reStart, nl.reEnd - 8), nlLast = re.slice(nl.reEnd - 8, nl.reEnd), nlAfter = re.slice(nl.reEnd);
          nlLast += nlAfter;
          var openParensBefore = nlBefore.split("(").length - 1, cleanAfter = nlAfter;
          for (i = 0; i < openParensBefore; i++) cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
          var dollar = "";
          "" === (nlAfter = cleanAfter) && isSub !== SUBPARSE && (dollar = "$"), re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        }
        "" !== re && hasMagic && (re = "(?=.)" + re);
        addPatternStart && (re = patternStart + re);
        if (isSub === SUBPARSE) return [ re, hasMagic ];
        if (!hasMagic) return function(s) {
          return s.replace(/\\(.)/g, "$1");
        }(pattern);
        var flags = options.nocase ? "i" : "";
        try {
          var regExp = new RegExp("^" + re + "$", flags);
        } catch (er) {
          return new RegExp("$.");
        }
        return regExp._glob = pattern, regExp._src = re, regExp;
      };
      var SUBPARSE = {};
      minimatch.makeRe = function(pattern, options) {
        return new Minimatch(pattern, options || {}).makeRe();
      }, Minimatch.prototype.makeRe = function() {
        if (this.regexp || !1 === this.regexp) return this.regexp;
        var set = this.set;
        if (!set.length) return this.regexp = !1, this.regexp;
        var options = this.options, twoStar = options.noglobstar ? "[^/]*?" : options.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", flags = options.nocase ? "i" : "", re = set.map((function(pattern) {
          return pattern.map((function(p) {
            return p === GLOBSTAR ? twoStar : "string" == typeof p ? function(s) {
              return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            }(p) : p._src;
          })).join("\\/");
        })).join("|");
        re = "^(?:" + re + ")$", this.negate && (re = "^(?!" + re + ").*$");
        try {
          this.regexp = new RegExp(re, flags);
        } catch (ex) {
          this.regexp = !1;
        }
        return this.regexp;
      }, minimatch.match = function(list, pattern, options) {
        var mm = new Minimatch(pattern, options = options || {});
        return list = list.filter((function(f) {
          return mm.match(f);
        })), mm.options.nonull && !list.length && list.push(pattern), list;
      }, Minimatch.prototype.match = function(f, partial) {
        if (this.debug("match", f, this.pattern), this.comment) return !1;
        if (this.empty) return "" === f;
        if ("/" === f && partial) return !0;
        var options = this.options;
        "/" !== path.sep && (f = f.split(path.sep).join("/"));
        f = f.split(slashSplit), this.debug(this.pattern, "split", f);
        var filename, i, set = this.set;
        for (this.debug(this.pattern, "set", set), i = f.length - 1; i >= 0 && !(filename = f[i]); i--) ;
        for (i = 0; i < set.length; i++) {
          var pattern = set[i], file = f;
          if (options.matchBase && 1 === pattern.length && (file = [ filename ]), this.matchOne(file, pattern, partial)) return !!options.flipNegate || !this.negate;
        }
        return !options.flipNegate && this.negate;
      }, Minimatch.prototype.matchOne = function(file, pattern, partial) {
        var options = this.options;
        this.debug("matchOne", {
          this: this,
          file: file,
          pattern: pattern
        }), this.debug("matchOne", file.length, pattern.length);
        for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, 
        pi++) {
          this.debug("matchOne loop");
          var hit, p = pattern[pi], f = file[fi];
          if (this.debug(pattern, p, f), !1 === p) return !1;
          if (p === GLOBSTAR) {
            this.debug("GLOBSTAR", [ pattern, p, f ]);
            var fr = fi, pr = pi + 1;
            if (pr === pl) {
              for (this.debug("** at the end"); fi < fl; fi++) if ("." === file[fi] || ".." === file[fi] || !options.dot && "." === file[fi].charAt(0)) return !1;
              return !0;
            }
            for (;fr < fl; ) {
              var swallowee = file[fr];
              if (this.debug("\nglobstar while", file, fr, pattern, pr, swallowee), this.matchOne(file.slice(fr), pattern.slice(pr), partial)) return this.debug("globstar found match!", fr, fl, swallowee), 
              !0;
              if ("." === swallowee || ".." === swallowee || !options.dot && "." === swallowee.charAt(0)) {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue"), fr++;
            }
            return !(!partial || (this.debug("\n>>> no match, partial?", file, fr, pattern, pr), 
            fr !== fl));
          }
          if ("string" == typeof p ? (hit = options.nocase ? f.toLowerCase() === p.toLowerCase() : f === p, 
          this.debug("string match", p, f, hit)) : (hit = f.match(p), this.debug("pattern match", p, f, hit)), 
          !hit) return !1;
        }
        if (fi === fl && pi === pl) return !0;
        if (fi === fl) return partial;
        if (pi === pl) return fi === fl - 1 && "" === file[fi];
        throw new Error("wtf?");
      };
    },
    890: function(module, __unused_webpack_exports, __webpack_require__) {
      var path = __webpack_require__(17), fs = __webpack_require__(147), _0777 = parseInt("0777", 8);
      function mkdirP(p, opts, f, made) {
        "function" == typeof opts ? (f = opts, opts = {}) : opts && "object" == typeof opts || (opts = {
          mode: opts
        });
        var mode = opts.mode, xfs = opts.fs || fs;
        void 0 === mode && (mode = _0777 & ~process.umask()), made || (made = null);
        var cb = f || function() {};
        p = path.resolve(p), xfs.mkdir(p, mode, (function(er) {
          if (!er) return cb(null, made = made || p);
          if ("ENOENT" === er.code) mkdirP(path.dirname(p), opts, (function(er, made) {
            er ? cb(er, made) : mkdirP(p, opts, cb, made);
          })); else xfs.stat(p, (function(er2, stat) {
            er2 || !stat.isDirectory() ? cb(er, made) : cb(null, made);
          }));
        }));
      }
      module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP, mkdirP.sync = function sync(p, opts, made) {
        opts && "object" == typeof opts || (opts = {
          mode: opts
        });
        var mode = opts.mode, xfs = opts.fs || fs;
        void 0 === mode && (mode = _0777 & ~process.umask()), made || (made = null), p = path.resolve(p);
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
    778: function(module, __unused_webpack_exports, __webpack_require__) {
      var wrappy = __webpack_require__(479);
      function once(fn) {
        var f = function() {
          return f.called ? f.value : (f.called = !0, f.value = fn.apply(this, arguments));
        };
        return f.called = !1, f;
      }
      function onceStrict(fn) {
        var f = function() {
          if (f.called) throw new Error(f.onceError);
          return f.called = !0, f.value = fn.apply(this, arguments);
        }, name = fn.name || "Function wrapped with `once`";
        return f.onceError = name + " shouldn't be called more than once", f.called = !1, 
        f;
      }
      module.exports = wrappy(once), module.exports.strict = wrappy(onceStrict), once.proto = once((function() {
        Object.defineProperty(Function.prototype, "once", {
          value: function() {
            return once(this);
          },
          configurable: !0
        }), Object.defineProperty(Function.prototype, "onceStrict", {
          value: function() {
            return onceStrict(this);
          },
          configurable: !0
        });
      }));
    },
    95: function(module) {
      "use strict";
      function posix(path) {
        return "/" === path.charAt(0);
      }
      function win32(path) {
        var result = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(path), device = result[1] || "", isUnc = Boolean(device && ":" !== device.charAt(1));
        return Boolean(result[2] || isUnc);
      }
      module.exports = "win32" === process.platform ? win32 : posix, module.exports.posix = posix, 
      module.exports.win32 = win32;
    },
    479: function(module) {
      module.exports = function wrappy(fn, cb) {
        if (fn && cb) return wrappy(fn)(cb);
        if ("function" != typeof fn) throw new TypeError("need wrapper function");
        return Object.keys(fn).forEach((function(k) {
          wrapper[k] = fn[k];
        })), wrapper;
        function wrapper() {
          for (var args = new Array(arguments.length), i = 0; i < args.length; i++) args[i] = arguments[i];
          var ret = fn.apply(this, args), cb = args[args.length - 1];
          return "function" == typeof ret && ret !== cb && Object.keys(cb).forEach((function(k) {
            ret[k] = cb[k];
          })), ret;
        }
      };
    },
    491: function(module) {
      "use strict";
      module.exports = require("assert");
    },
    361: function(module) {
      "use strict";
      module.exports = require("events");
    },
    147: function(module) {
      "use strict";
      module.exports = require("fs");
    },
    37: function(module) {
      "use strict";
      module.exports = require("os");
    },
    17: function(module) {
      "use strict";
      module.exports = require("path");
    },
    837: function(module) {
      "use strict";
      module.exports = require("util");
    },
    756: function(module) {
      "use strict";
      module.exports = JSON.parse('{"name":"dts-bundle","version":"0.7.3","description":"Export TypeScript .d.ts files as an external module definition"}');
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
  var __webpack_exports__ = {};
  !function() {
    "use strict";
    var exports = __webpack_exports__;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var os = __webpack_require__(37), fs = __webpack_require__(147), path = __webpack_require__(17), util = __webpack_require__(837), assert = __webpack_require__(491), glob = __webpack_require__(884), mkdirp = __webpack_require__(890), detectIndent = __webpack_require__(983), pkg = __webpack_require__(756), dtsExp = /\.d\.ts$/, bomOptExp = /^\uFEFF?/, externalExp = /^([ \t]*declare module )(['"])(.+?)(\2[ \t]*{?.*)$/, importExp = /^([ \t]*(?:export )?(?:import .+? )= require\()(['"])(.+?)(\2\);.*)$/, importEs6Exp = /^([ \t]*(?:export|import) ?(?:(?:\* (?:as [^ ,]+)?)|.*)?,? ?(?:[^ ,]+ ?,?)(?:\{(?:[^ ,]+ ?,?)*\})? ?from )(['"])([^ ,]+)(\2;.*)$/, referenceTagExp = /^[ \t]*\/\/\/[ \t]*<reference[ \t]+path=(["'])(.*?)\1?[ \t]*\/>.*$/, identifierExp = /^\w+(?:[\.-]\w+)*$/, fileExp = /^([\./].*|.:.*)$/, privateExp = /^[ \t]*(?:static )?private (?:static )?/, publicExp = /^([ \t]*)(static |)(public |)(static |)(.*)/;
    function pushUnique(arr, value) {
      return arr.indexOf(value) < 0 && arr.push(value), arr;
    }
    function pushUniqueArr(arr) {
      for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
      return values.forEach((function(vs) {
        return vs.forEach((function(v) {
          return pushUnique(arr, v);
        }));
      })), arr;
    }
    function getIndenter(actual, use) {
      return actual !== use && actual ? function(line) {
        return (line.modified || line.original).replace(new RegExp("^" + actual + "+", "g"), (function(match) {
          return match.split(actual).join(use);
        }));
      } : function(line) {
        return line.modified || line.original;
      };
    }
    function optValue(passed, def) {
      return void 0 === passed ? def : passed;
    }
    exports.bundle = function(options) {
      assert("object" == typeof options && options, "options must be an object");
      var str, suffix, allFiles = (str = options.main, suffix = "**/*.d.ts", -1 !== str.indexOf(suffix, str.length - suffix.length)), main = allFiles ? "*.d.ts" : options.main, exportName = options.name, _baseDir = function() {
        var baseDir = optValue(options.baseDir, path.dirname(options.main));
        return allFiles && (baseDir = baseDir.substr(0, baseDir.length - 2)), baseDir;
      }(), out = optValue(options.out, exportName + ".d.ts").replace(/\//g, path.sep), newline = optValue(options.newline, os.EOL), indent = optValue(options.indent, "    "), outputAsModuleFolder = optValue(options.outputAsModuleFolder, !1), prefix = optValue(options.prefix, ""), separator = optValue(options.separator, "/"), externals = optValue(options.externals, !1), exclude = optValue(options.exclude, null), removeSource = optValue(options.removeSource, !1), referenceExternals = optValue(options.referenceExternals, !1), emitOnIncludedFileNotFound = optValue(options.emitOnIncludedFileNotFound, !1), emitOnNoIncludedFileNotFound = optValue(options.emitOnNoIncludedFileNotFound, !1), _headerPath = optValue(options.headerPath, null), headerText = optValue(options.headerText, ""), verbose = optValue(options.verbose, !1);
      assert.ok(main, 'option "main" must be defined'), assert.ok(exportName, 'option "name" must be defined'), 
      assert("string" == typeof newline, 'option "newline" must be a string'), assert("string" == typeof indent, 'option "indent" must be a string'), 
      assert("string" == typeof prefix, 'option "prefix" must be a string'), assert(separator.length > 0, 'option "separator" must have non-zero length');
      var obj, isExclude, baseDir = path.resolve(_baseDir), mainFile = allFiles ? path.resolve(baseDir, "**/*.d.ts") : path.resolve(main.replace(/\//g, path.sep)), outFile = function(out, baseDir) {
        var result = path.resolve(baseDir, out);
        (function(str, prefix) {
          return str.slice(0, prefix.length) == prefix;
        })(out, "~" + path.sep) && (result = path.resolve(".", out.substr(2)));
        return result;
      }(out, baseDir), headerData = "// Generated by dts-bundle v" + pkg.version + newline, headerPath = _headerPath && "none" !== _headerPath ? path.resolve(_headerPath.replace(/\//g, path.sep)) : _headerPath;
      trace("### settings object passed ###"), obj = options, verbose && console.log(obj), 
      trace("### settings ###"), trace("main:         %s", main), trace("name:         %s", exportName), 
      trace("out:          %s", out), trace("baseDir:      %s", baseDir), trace("mainFile:     %s", mainFile), 
      trace("outFile:      %s", outFile), trace("externals:    %s", externals ? "yes" : "no"), 
      trace("exclude:      %s", exclude), trace("removeSource: %s", removeSource ? "yes" : "no"), 
      trace("comments:     %s", "no"), trace("emitOnIncludedFileNotFound:   %s", emitOnIncludedFileNotFound ? "yes" : "no"), 
      trace("emitOnNoIncludedFileNotFound: %s", emitOnNoIncludedFileNotFound ? "yes" : "no"), 
      trace("headerPath    %s", headerPath), trace("headerText    %s", headerText), allFiles || assert(fs.existsSync(mainFile), "main does not exist: " + mainFile), 
      headerPath ? "none" === headerPath ? headerData = "" : (assert(fs.existsSync(headerPath), "header does not exist: " + headerPath), 
      headerData = fs.readFileSync(headerPath, "utf8") + headerData) : headerText && (headerData = "/*" + headerText + "*/\n"), 
      isExclude = "function" == typeof exclude ? exclude : exclude instanceof RegExp ? function(file) {
        return exclude.test(file);
      } : function() {
        return !1;
      };
      var sourceTypings = glob.sync("**/*.d.ts", {
        cwd: baseDir
      }).map((function(file) {
        return path.resolve(baseDir, file);
      }));
      if (allFiles) {
        var mainFileContent_1 = "";
        trace("## temporally main file ##"), sourceTypings.forEach((function(file) {
          var generatedLine = "export * from './" + path.relative(baseDir, file.substr(0, file.length - 5)).replace(path.sep, "/") + "';";
          trace(generatedLine), mainFileContent_1 += generatedLine + "\n";
        })), mainFile = path.resolve(baseDir, "dts-bundle.tmp." + exportName + ".d.ts"), 
        fs.writeFileSync(mainFile, mainFileContent_1, "utf8");
      }
      trace("\n### find typings ###");
      var inSourceTypings = function(file) {
        return -1 !== sourceTypings.indexOf(file) || -1 !== sourceTypings.indexOf(path.join(file, "index.d.ts"));
      };
      trace("source typings (will be included in output if actually used)"), sourceTypings.forEach((function(file) {
        return trace(" - %s ", file);
      })), trace("excluded typings (will always be excluded from output)");
      var mainParse, fileMap = Object.create(null), globalExternalImports = [], externalTypings = [];
      trace("\n### parse files ###");
      for (var queue = [ mainFile ], queueSeen = Object.create(null); queue.length > 0; ) {
        var target = queue.shift();
        if (!queueSeen[target]) {
          queueSeen[target] = !0;
          var parse = parseFile(target);
          mainParse || (mainParse = parse), fileMap[parse.file] = parse, pushUniqueArr(queue, parse.refs, parse.relativeImports);
        }
      }
      trace("\n### map exports ###");
      var exportMap = Object.create(null);
      Object.keys(fileMap).forEach((function(file) {
        var parse = fileMap[file];
        parse.exports.forEach((function(name) {
          assert(!(name in exportMap), "already got export for: " + name), exportMap[name] = parse, 
          trace("- %s -> %s", name, parse.file);
        }));
      })), trace("\n### determine typings to include ###");
      var excludedTypings = [], usedTypings = [], externalDependencies = [], queue_1 = [ mainParse ];
      for (queueSeen = Object.create(null), trace("queue"), trace(queue_1); queue_1.length > 0; ) {
        queueSeen[(parse = queue_1.shift()).file] || (queueSeen[parse.file] = !0, trace("%s (%s)", parse.name, parse.file), 
        usedTypings.push(parse), parse.externalImports.forEach((function(name) {
          var p = exportMap[name];
          return externals ? isExclude(path.relative(baseDir, p.file), !0) ? (trace(" - exclude external filter %s", name), 
          void pushUnique(excludedTypings, p.file)) : (trace(" - include external %s", name), 
          assert(p, name), void queue_1.push(p)) : (trace(" - exclude external %s", name), 
          void pushUnique(externalDependencies, p ? p.file : name));
        })), parse.relativeImports.forEach((function(file) {
          var p = fileMap[file];
          if (isExclude(path.relative(baseDir, p.file), !1)) return trace(" - exclude internal filter %s", file), 
          void pushUnique(excludedTypings, p.file);
          trace(" - import relative %s", file), assert(p, file), queue_1.push(p);
        })));
      }
      trace("\n### rewrite global external modules ###"), usedTypings.forEach((function(parse) {
        trace(parse.name), parse.relativeRef.forEach((function(line, i) {
          line.modified = function(line, replacer) {
            var match = line.match(externalExp);
            if (match) {
              match[0];
              var declareModule = match[1], beforeIndent = match[2], moduleName = match[3], afterIdent = match[4];
              if (assert(afterIdent), identifierExp.test(moduleName)) return declareModule + beforeIndent + replacer(moduleName) + afterIdent;
            }
            return line;
          }(line.original, getLibName), trace(" - %s  ==>  %s", line.original, line.modified);
        })), parse.importLineRef.forEach((function(line, i) {
          if (outputAsModuleFolder) return trace(" - %s was skipped.", line.original), void (line.skip = !0);
          importExp.test(line.original) ? line.modified = function(line, replacer) {
            var match = line.match(importExp);
            if (match && (assert(match[4]), identifierExp.test(match[3]))) return match[1] + match[2] + replacer(match[3]) + match[4];
            return line;
          }(line.original, getLibName) : line.modified = function(line, replacer) {
            if (line.indexOf("from") < 0) return line;
            var match = line.match(importEs6Exp);
            if (match && (assert(match[4]), identifierExp.test(match[3]))) return match[1] + match[2] + replacer(match[3]) + match[4];
            return line;
          }(line.original, getLibName), trace(" - %s  ==>  %s", line.original, line.modified);
        }));
      })), trace("\n### build output ###");
      var content = headerData;
      externalDependencies.length > 0 && (content += "// Dependencies for this module:" + newline, 
      externalDependencies.forEach((function(file) {
        content += referenceExternals ? function(file) {
          return '/// <reference path="' + file.replace(/\\/g, "/") + '" />';
        }(path.relative(baseDir, file).replace(/\\/g, "/")) + newline : "//   " + path.relative(baseDir, file).replace(/\\/g, "/") + newline;
      }))), globalExternalImports.length > 0 && (content += newline, content += globalExternalImports.join(newline) + newline), 
      content += newline, content += usedTypings.filter((function(parse) {
        return parse.lines = parse.lines.filter((function(line) {
          return !0 !== line.skip;
        })), parse.lines.length > 0;
      })).map((function(parse) {
        return inSourceTypings(parse.file) ? function(file, lines) {
          var out = "";
          if (outputAsModuleFolder) return mergeModulesLines(lines);
          return out += "declare module '" + getExpName(file) + "' {" + newline, out += mergeModulesLines(lines), 
          out += "}" + newline;
        }(parse.file, parse.lines.map((function(line) {
          return getIndenter(parse.indent, indent)(line);
        }))) : parse.lines.map((function(line) {
          return getIndenter(parse.indent, indent)(line);
        })).join(newline) + newline;
      })).join(newline) + newline, removeSource && (trace("\n### remove source typings ###"), 
      sourceTypings.forEach((function(p) {
        p !== outFile && dtsExp.test(p) && fs.statSync(p).isFile() && (trace(" - %s", p), 
        fs.unlinkSync(p));
      })));
      var inUsed = function(file) {
        return 0 !== usedTypings.filter((function(parse) {
          return parse.file === file;
        })).length;
      }, bundleResult = {
        fileMap: fileMap,
        includeFilesNotFound: [],
        noIncludeFilesNotFound: [],
        options: options
      };
      for (var p in trace("## files not found ##"), fileMap) {
        (parse = fileMap[p]).fileExists || (inUsed(parse.file) ? (bundleResult.includeFilesNotFound.push(parse.file), 
        warning(" X Included file NOT FOUND %s ", parse.file)) : (bundleResult.noIncludeFilesNotFound.push(parse.file), 
        trace(" X Not used file not found %s", parse.file)));
      }
      if (trace("\n### write output ###"), (0 == bundleResult.includeFilesNotFound.length || bundleResult.includeFilesNotFound.length > 0 && emitOnIncludedFileNotFound) && (0 == bundleResult.noIncludeFilesNotFound.length || bundleResult.noIncludeFilesNotFound.length > 0 && emitOnNoIncludedFileNotFound)) {
        trace(outFile);
        var outDir = path.dirname(outFile);
        fs.existsSync(outDir) || mkdirp.sync(outDir), fs.writeFileSync(outFile, content, "utf8"), 
        bundleResult.emitted = !0;
      } else warning(" XXX Not emit due to exist files not found."), trace("See documentation for emitOnIncludedFileNotFound and emitOnNoIncludedFileNotFound options."), 
      bundleResult.emitted = !1;
      return verbose && (trace("\n### statistics ###"), trace("used sourceTypings"), sourceTypings.forEach((function(p) {
        inUsed(p) && trace(" - %s", p);
      })), trace("unused sourceTypings"), sourceTypings.forEach((function(p) {
        inUsed(p) || trace(" - %s", p);
      })), trace("excludedTypings"), excludedTypings.forEach((function(p) {
        trace(" - %s", p);
      })), trace("used external typings"), externalTypings.forEach((function(p) {
        inUsed(p) && trace(" - %s", p);
      })), trace("unused external typings"), externalTypings.forEach((function(p) {
        inUsed(p) || trace(" - %s", p);
      })), trace("external dependencies"), externalDependencies.forEach((function(p) {
        trace(" - %s", p);
      }))), trace("\n### done ###\n"), allFiles && fs.unlinkSync(mainFile), bundleResult;
      function trace() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        verbose && console.log(util.format.apply(null, args));
      }
      function warning() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        console.log(util.format.apply(null, args));
      }
      function getModName(file) {
        return path.relative(baseDir, path.dirname(file) + path.sep + path.basename(file).replace(/\.d\.ts$/, ""));
      }
      function getExpName(file) {
        return file === mainFile ? exportName : getExpNameRaw(file);
      }
      function getExpNameRaw(file) {
        return prefix + exportName + separator + getModName(file).replace(/\.\./g, "--").replace(/[\\\/]/g, separator);
      }
      function getLibName(ref) {
        return getExpNameRaw(mainFile) + separator + prefix + separator + ref;
      }
      function mergeModulesLines(lines) {
        var i = outputAsModuleFolder ? "" : indent;
        return (0 === lines.length ? "" : i + lines.join(newline + i)) + newline;
      }
      function parseFile(file) {
        var name = getModName(file);
        trace("%s (%s)", name, file);
        var res = {
          file: file,
          name: name,
          indent: indent,
          exp: getExpName(file),
          refs: [],
          externalImports: [],
          relativeImports: [],
          exports: [],
          lines: [],
          fileExists: !0,
          importLineRef: [],
          relativeRef: []
        };
        if (!fs.existsSync(file)) return trace(" X - File not found: %s", file), res.fileExists = !1, 
        res;
        fs.lstatSync(file).isDirectory() && (file = path.join(file, "index.d.ts"));
        var code = fs.readFileSync(file, "utf8").replace(bomOptExp, "").replace(/\s*$/, "");
        res.indent = detectIndent(code) || indent;
        var queuedJSDoc, multiComment = [], inBlockComment = !1, popBlock = function() {
          multiComment.length > 0 && (/^[ \t]*\/\*\*/.test(multiComment[0]) && (queuedJSDoc = multiComment), 
          multiComment = []), inBlockComment = !1;
        };
        return code.split(/\r?\n/g).forEach((function(line) {
          var match;
          if (/^[((=====)(=*)) \t]*\*+\//.test(line)) return multiComment.push(line), void popBlock();
          if (/^[ \t]*\/\*/.test(line)) return multiComment.push(line), inBlockComment = !0, 
          void (/\*+\/[ \t]*$/.test(line) && popBlock());
          if (inBlockComment) multiComment.push(line); else if (/^\s*$/.test(line)) res.lines.push({
            original: ""
          }); else {
            if (/^\/\/\//.test(line)) {
              var ref = function(tag) {
                var match = tag.match(referenceTagExp);
                if (match) return match[2];
                return null;
              }(line);
              if (ref) {
                var refPath = path.resolve(path.dirname(file), ref);
                if (inSourceTypings(refPath)) trace(" - reference source typing %s (%s)", ref, refPath); else trace(" - reference external typing %s (%s) (relative: %s)", ref, refPath, path.relative(baseDir, refPath).replace(/\\/g, "/")), 
                function(file) {
                  return -1 !== externalTypings.indexOf(file);
                }(refPath) || externalTypings.push(refPath);
                return void pushUnique(res.refs, refPath);
              }
            }
            if (!/^\/\//.test(line)) if (privateExp.test(line)) queuedJSDoc = null; else if (queuedJSDoc && (queuedJSDoc.forEach((function(line) {
              var match = line.match(/^([ \t]*)(\*.*)/);
              match ? res.lines.push({
                original: match[1] + " " + match[2]
              }) : res.lines.push({
                original: line
              });
            })), queuedJSDoc = null), line.indexOf("from") >= 0 && (match = line.match(importEs6Exp)) || line.indexOf("require") >= 0 && (match = line.match(importExp))) {
              match[0];
              var lead = match[1], quote = match[2], moduleName = match[3], trail = match[4];
              assert(moduleName);
              var impPath = path.resolve(path.dirname(file), moduleName);
              if (fileExp.test(moduleName)) {
                var modLine = {
                  original: lead + quote + getExpName(impPath) + trail
                };
                res.lines.push(modLine);
                var full = path.resolve(path.dirname(file), impPath);
                !fs.existsSync(full) || fs.existsSync(full + ".d.ts") ? full += ".d.ts" : fs.lstatSync(full).isDirectory() && (full = path.join(full, "index.d.ts")), 
                trace(" - import relative %s (%s)", moduleName, full), pushUnique(res.relativeImports, full), 
                res.importLineRef.push(modLine);
              } else {
                modLine = {
                  original: line
                };
                trace(" - import external %s", moduleName), pushUnique(res.externalImports, moduleName), 
                externals && res.importLineRef.push(modLine), outputAsModuleFolder ? pushUnique(globalExternalImports, line) : res.lines.push(modLine);
              }
            } else if (match = line.match(externalExp)) {
              match[0], match[1], lead = match[2], moduleName = match[3], trail = match[4];
              assert(moduleName), trace(" - declare %s", moduleName), pushUnique(res.exports, moduleName);
              modLine = {
                original: line
              };
              res.relativeRef.push(modLine), res.lines.push(modLine);
            } else {
              if (match = line.match(publicExp)) {
                match[0];
                var sp = match[1], static1 = match[2];
                match[3];
                line = sp + static1 + match[4] + match[5];
              }
              inSourceTypings(file) ? res.lines.push({
                original: line.replace(/^(export )?declare /g, "$1")
              }) : res.lines.push({
                original: line
              });
            }
          }
        })), res;
      }
    };
  }();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
}();