(() => {
  var __webpack_modules__ = {
    93012: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      var Parser = __webpack_require__(84105), through = __webpack_require__(49760), bufferFrom = Buffer.from && Buffer.from !== Uint8Array.from;
      function check(x, y) {
        return "string" == typeof x ? y == x : x && "function" == typeof x.exec ? x.exec(y) : "boolean" == typeof x || "object" == typeof x ? x : "function" == typeof x && x(y);
      }
      exports.parse = function(path, map) {
        var header, footer, parser = new Parser, stream = through((function(chunk) {
          "string" == typeof chunk && (chunk = bufferFrom ? Buffer.from(chunk) : new Buffer(chunk)), 
          parser.write(chunk);
        }), (function(data) {
          data && stream.write(data), header && stream.emit("header", header), footer && stream.emit("footer", footer), 
          stream.queue(null);
        }));
        "string" == typeof path && (path = path.split(".").map((function(e) {
          return "$*" === e ? {
            emitKey: !0
          } : "*" === e || ("" === e ? {
            recurse: !0
          } : e);
        })));
        return path && path.length || (path = null), parser.onValue = function(value) {
          if (this.root || (stream.root = value), path) {
            for (var i = 0, j = 0, emitKey = !1, emitPath = !1; i < path.length; ) {
              var c, key = path[i];
              if (j++, key && !key.recurse) {
                if (!(c = j === this.stack.length ? this : this.stack[j])) return;
                if (!check(key, c.key)) return void setHeaderFooter(c.key, value);
                emitKey = !!key.emitKey, emitPath = !!key.emitPath, i++;
              } else {
                i++;
                var nextKey = path[i];
                if (!nextKey) return;
                for (;;) {
                  if (!(c = j === this.stack.length ? this : this.stack[j])) return;
                  if (check(nextKey, c.key)) {
                    i++, Object.isFrozen(this.stack[j]) || (this.stack[j].value = null);
                    break;
                  }
                  setHeaderFooter(c.key, value), j++;
                }
              }
            }
            if (header && (stream.emit("header", header), header = !1), j === this.stack.length) {
              0;
              var actualPath = this.stack.slice(1).map((function(element) {
                return element.key;
              })).concat([ this.key ]), data = value;
              for (var k in null != data && null != (data = map ? map(data, actualPath) : data) && ((emitKey || emitPath) && (data = {
                value: data
              }, emitKey && (data.key = this.key), emitPath && (data.path = actualPath)), stream.queue(data)), 
              this.value && delete this.value[this.key], this.stack) Object.isFrozen(this.stack[k]) || (this.stack[k].value = null);
            }
          }
        }, parser._onToken = parser.onToken, parser.onToken = function(token, value) {
          parser._onToken(token, value), 0 === this.stack.length && stream.root && (path || stream.queue(stream.root), 
          0, stream.root = null);
        }, parser.onError = function(err) {
          err.message.indexOf("at position") > -1 && (err.message = "Invalid JSON (" + err.message + ")"), 
          stream.emit("error", err);
        }, stream;
        function setHeaderFooter(key, value) {
          !1 !== header && ((header = header || {})[key] = value), !1 !== footer && !1 === header && ((footer = footer || {})[key] = value);
        }
      }, exports.stringify = function(op, sep, cl, indent) {
        indent = indent || 0, !1 === op ? (op = "", sep = "\n", cl = "") : null == op && (op = "[\n", 
        sep = "\n,\n", cl = "\n]\n");
        var stream, first = !0, anyData = !1;
        return stream = through((function(data) {
          anyData = !0;
          try {
            var json = JSON.stringify(data, null, indent);
          } catch (err) {
            return stream.emit("error", err);
          }
          first ? (first = !1, stream.queue(op + json)) : stream.queue(sep + json);
        }), (function(data) {
          anyData || stream.queue(op), stream.queue(cl), stream.queue(null);
        }));
      }, exports.stringifyObject = function(op, sep, cl, indent) {
        indent = indent || 0, !1 === op ? (op = "", sep = "\n", cl = "") : null == op && (op = "{\n", 
        sep = "\n,\n", cl = "\n}\n");
        var first = !0, anyData = !1;
        return through((function(data) {
          anyData = !0;
          var json = JSON.stringify(data[0]) + ":" + JSON.stringify(data[1], null, indent);
          first ? (first = !1, this.queue(op + json)) : this.queue(sep + json);
        }), (function(data) {
          anyData || this.queue(op), this.queue(cl), this.queue(null);
        }));
      };
    },
    10475: module => {
      "use strict";
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
          if (a === b) return [ ai, bi ];
          for (begs = [], left = str.length; i >= 0 && !result; ) i == ai ? (begs.push(i), 
          ai = str.indexOf(a, i + 1)) : 1 == begs.length ? result = [ begs.pop(), bi ] : ((beg = begs.pop()) < left && (left = beg, 
          right = bi), bi = str.indexOf(b, i + 1)), i = ai < bi && ai >= 0 ? ai : bi;
          begs.length && (result = [ left, right ]);
        }
        return result;
      }
      module.exports = balanced, balanced.range = range;
    },
    21901: (module, __unused_webpack_exports, __webpack_require__) => {
      var concatMap = __webpack_require__(16148), balanced = __webpack_require__(10475);
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
    13159: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(57147), path = __webpack_require__(71017), LCHOWN = fs.lchown ? "lchown" : "chown", LCHOWNSYNC = fs.lchownSync ? "lchownSync" : "chownSync", needEISDIRHandled = fs.lchown && !process.version.match(/v1[1-9]+\./) && !process.version.match(/v10\.[6-9]/), lchownSync = (path, uid, gid) => {
        try {
          return fs[LCHOWNSYNC](path, uid, gid);
        } catch (er) {
          if ("ENOENT" !== er.code) throw er;
        }
      }, handleEISDIR = needEISDIRHandled ? (path, uid, gid, cb) => er => {
        er && "EISDIR" === er.code ? fs.chown(path, uid, gid, cb) : cb(er);
      } : (_, __, ___, cb) => cb, handleEISDirSync = needEISDIRHandled ? (path, uid, gid) => {
        try {
          return lchownSync(path, uid, gid);
        } catch (er) {
          if ("EISDIR" !== er.code) throw er;
          ((path, uid, gid) => {
            try {
              fs.chownSync(path, uid, gid);
            } catch (er) {
              if ("ENOENT" !== er.code) throw er;
            }
          })(path, uid, gid);
        }
      } : (path, uid, gid) => lchownSync(path, uid, gid), nodeVersion = process.version;
      let readdir = (path, options, cb) => fs.readdir(path, options, cb);
      /^v4\./.test(nodeVersion) && (readdir = (path, options, cb) => fs.readdir(path, cb));
      const chown = (cpath, uid, gid, cb) => {
        fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, (er => {
          cb(er && "ENOENT" !== er.code ? er : null);
        })));
      }, chownrKid = (p, child, uid, gid, cb) => {
        if ("string" == typeof child) return fs.lstat(path.resolve(p, child), ((er, stats) => {
          if (er) return cb("ENOENT" !== er.code ? er : null);
          stats.name = child, chownrKid(p, stats, uid, gid, cb);
        }));
        if (child.isDirectory()) chownr(path.resolve(p, child.name), uid, gid, (er => {
          if (er) return cb(er);
          const cpath = path.resolve(p, child.name);
          chown(cpath, uid, gid, cb);
        })); else {
          const cpath = path.resolve(p, child.name);
          chown(cpath, uid, gid, cb);
        }
      }, chownr = (p, uid, gid, cb) => {
        readdir(p, {
          withFileTypes: !0
        }, ((er, children) => {
          if (er) {
            if ("ENOENT" === er.code) return cb();
            if ("ENOTDIR" !== er.code && "ENOTSUP" !== er.code) return cb(er);
          }
          if (er || !children.length) return chown(p, uid, gid, cb);
          let len = children.length, errState = null;
          const then = er => {
            if (!errState) return er ? cb(errState = er) : 0 == --len ? chown(p, uid, gid, cb) : void 0;
          };
          children.forEach((child => chownrKid(p, child, uid, gid, then)));
        }));
      }, chownrSync = (p, uid, gid) => {
        let children;
        try {
          children = ((path, options) => fs.readdirSync(path, options))(p, {
            withFileTypes: !0
          });
        } catch (er) {
          if ("ENOENT" === er.code) return;
          if ("ENOTDIR" === er.code || "ENOTSUP" === er.code) return handleEISDirSync(p, uid, gid);
          throw er;
        }
        return children && children.length && children.forEach((child => ((p, child, uid, gid) => {
          if ("string" == typeof child) try {
            const stats = fs.lstatSync(path.resolve(p, child));
            stats.name = child, child = stats;
          } catch (er) {
            if ("ENOENT" === er.code) return;
            throw er;
          }
          child.isDirectory() && chownrSync(path.resolve(p, child.name), uid, gid), handleEISDirSync(path.resolve(p, child.name), uid, gid);
        })(p, child, uid, gid))), handleEISDirSync(p, uid, gid);
      };
      module.exports = chownr, chownr.sync = chownrSync;
    },
    16148: module => {
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
    33446: (module, __unused_webpack_exports, __webpack_require__) => {
      var once = __webpack_require__(38412), noop = function() {}, eos = function(stream, opts, callback) {
        if ("function" == typeof opts) return eos(stream, null, opts);
        opts || (opts = {}), callback = once(callback || noop);
        var ws = stream._writableState, rs = stream._readableState, readable = opts.readable || !1 !== opts.readable && stream.readable, writable = opts.writable || !1 !== opts.writable && stream.writable, onlegacyfinish = function() {
          stream.writable || onfinish();
        }, onfinish = function() {
          writable = !1, readable || callback.call(stream);
        }, onend = function() {
          readable = !1, writable || callback.call(stream);
        }, onexit = function(exitCode) {
          callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
        }, onerror = function(err) {
          callback.call(stream, err);
        }, onclose = function() {
          return (!readable || rs && rs.ended) && (!writable || ws && ws.ended) ? void 0 : callback.call(stream, new Error("premature close"));
        }, onrequest = function() {
          stream.req.on("finish", onfinish);
        };
        return !function(stream) {
          return stream.setHeader && "function" == typeof stream.abort;
        }(stream) ? writable && !ws && (stream.on("end", onlegacyfinish), stream.on("close", onlegacyfinish)) : (stream.on("complete", onfinish), 
        stream.on("abort", onclose), stream.req ? onrequest() : stream.on("request", onrequest)), 
        function(stream) {
          return stream.stdio && Array.isArray(stream.stdio) && 3 === stream.stdio.length;
        }(stream) && stream.on("exit", onexit), stream.on("end", onend), stream.on("finish", onfinish), 
        !1 !== opts.error && stream.on("error", onerror), stream.on("close", onclose), function() {
          stream.removeListener("complete", onfinish), stream.removeListener("abort", onclose), 
          stream.removeListener("request", onrequest), stream.req && stream.req.removeListener("finish", onfinish), 
          stream.removeListener("end", onlegacyfinish), stream.removeListener("close", onlegacyfinish), 
          stream.removeListener("finish", onfinish), stream.removeListener("exit", onexit), 
          stream.removeListener("end", onend), stream.removeListener("error", onerror), stream.removeListener("close", onclose);
        };
      };
      module.exports = eos;
    },
    50141: module => {
      "use strict";
      module.exports = function(msg, code, props) {
        var key, err = msg instanceof Error ? msg : new Error(msg);
        if ("object" == typeof code ? props = code : null != code && (err.code = code), 
        props) for (key in props) err[key] = props[key];
        return err;
      };
    },
    55212: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      class FiggyPudding {
        constructor(specs, opts, providers) {
          this.__specs = specs || {}, Object.keys(this.__specs).forEach((alias => {
            if ("string" == typeof this.__specs[alias]) {
              const key = this.__specs[alias], realSpec = this.__specs[key];
              if (!realSpec) throw new Error(`Alias refers to invalid key: ${key} -> ${alias}`);
              {
                const aliasArr = realSpec.aliases || [];
                aliasArr.push(alias, key), realSpec.aliases = [ ...new Set(aliasArr) ], this.__specs[alias] = realSpec;
              }
            }
          })), this.__opts = opts || {}, this.__providers = reverse(providers.filter((x => null != x && "object" == typeof x))), 
          this.__isFiggyPudding = !0;
        }
        get(key) {
          return pudGet(this, key, !0);
        }
        get [Symbol.toStringTag]() {
          return "FiggyPudding";
        }
        forEach(fn, thisArg = this) {
          for (let [key, value] of this.entries()) fn.call(thisArg, value, key, this);
        }
        toJSON() {
          const obj = {};
          return this.forEach(((val, key) => {
            obj[key] = val;
          })), obj;
        }
        * entries(_matcher) {
          for (let key of Object.keys(this.__specs)) yield [ key, this.get(key) ];
          const matcher = _matcher || this.__opts.other;
          if (matcher) {
            const seen = new Set;
            for (let p of this.__providers) {
              const iter = p.entries ? p.entries(matcher) : entries(p);
              for (let [key, val] of iter) matcher(key) && !seen.has(key) && (seen.add(key), yield [ key, val ]);
            }
          }
        }
        * [Symbol.iterator]() {
          for (let [key, value] of this.entries()) yield [ key, value ];
        }
        * keys() {
          for (let [key] of this.entries()) yield key;
        }
        * values() {
          for (let [, value] of this.entries()) yield value;
        }
        concat(...moreConfig) {
          return new Proxy(new FiggyPudding(this.__specs, this.__opts, reverse(this.__providers).concat(moreConfig)), proxyHandler);
        }
      }
      try {
        const util = __webpack_require__(73837);
        FiggyPudding.prototype[util.inspect.custom] = function(depth, opts) {
          return this[Symbol.toStringTag] + " " + util.inspect(this.toJSON(), opts);
        };
      } catch (e) {}
      function pudGet(pud, key, validate) {
        let spec = pud.__specs[key];
        if (!validate || spec || pud.__opts.other && pud.__opts.other(key)) {
          let ret;
          spec || (spec = {});
          for (let p of pud.__providers) {
            if (ret = tryGet(key, p), void 0 === ret && spec.aliases && spec.aliases.length) for (let alias of spec.aliases) if (alias !== key && (ret = tryGet(alias, p), 
            void 0 !== ret)) break;
            if (void 0 !== ret) break;
          }
          return void 0 === ret && void 0 !== spec.default ? "function" == typeof spec.default ? spec.default(pud) : spec.default : ret;
        }
        !function(key) {
          throw Object.assign(new Error(`invalid config key requested: ${key}`), {
            code: "EBADKEY"
          });
        }(key);
      }
      function tryGet(key, p) {
        let ret;
        return ret = p.__isFiggyPudding ? pudGet(p, key, !1) : "function" == typeof p.get ? p.get(key) : p[key], 
        ret;
      }
      const proxyHandler = {
        has: (obj, prop) => prop in obj.__specs && void 0 !== pudGet(obj, prop, !1),
        ownKeys: obj => Object.keys(obj.__specs),
        get: (obj, prop) => "symbol" == typeof prop || "__" === prop.slice(0, 2) || prop in FiggyPudding.prototype ? obj[prop] : obj.get(prop),
        set(obj, prop, value) {
          if ("symbol" == typeof prop || "__" === prop.slice(0, 2)) return obj[prop] = value, 
          !0;
          throw new Error("figgyPudding options cannot be modified. Use .concat() instead.");
        },
        deleteProperty() {
          throw new Error("figgyPudding options cannot be deleted. Use .concat() and shadow them instead.");
        }
      };
      function reverse(arr) {
        const ret = [];
        return arr.forEach((x => ret.unshift(x))), ret;
      }
      function entries(obj) {
        return Object.keys(obj).map((k => [ k, obj[k] ]));
      }
      module.exports = function(specs, opts) {
        return function(...providers) {
          return new Proxy(new FiggyPudding(specs, opts, providers), proxyHandler);
        };
      };
    },
    30056: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Method = __webpack_require__(60676), Role = __webpack_require__(62167), util = __webpack_require__(66370), kCache = Symbol("cache"), kDefaultMethod = Symbol("defaultMethod"), kMethods = Symbol("methods"), kNoNext = Symbol("noNext");
      module.exports = function(opts) {
        function gf() {
          return !gf[kMethods].length && gf[kDefaultMethod] ? gf[kDefaultMethod].func.apply(this, arguments) : gf.applyGenfun(this, arguments);
        }
        return Object.setPrototypeOf(gf, Genfun.prototype), gf[kMethods] = [], gf[kCache] = {
          key: [],
          methods: [],
          state: STATES.UNINITIALIZED
        }, opts && "function" == typeof opts ? gf.add(opts) : opts && opts.default && gf.add(opts.default), 
        opts && opts.name && Object.defineProperty(gf, "name", {
          value: opts.name
        }), opts && opts.noNextMethod && (gf[kNoNext] = !0), gf;
      };
      class Genfun extends Function {}
      Genfun.prototype.isGenfun = !0;
      const STATES = {
        UNINITIALIZED: 0,
        MONOMORPHIC: 1,
        POLYMORPHIC: 2,
        MEGAMORPHIC: 3
      };
      function cacheableProto(genfun, arg) {
        var dispatchable = util.dispatchableObject(arg);
        if (Object.hasOwnProperty.call(dispatchable, Role.roleKeyName)) for (var j = 0; j < dispatchable[Role.roleKeyName].length; j++) {
          if (dispatchable[Role.roleKeyName][j].method.genfun === genfun) return null;
        }
        return Object.getPrototypeOf(dispatchable);
      }
      function matchCachedMethods(key, protos) {
        if (key.length !== protos.length) return !1;
        for (var i = 0; i < key.length; i++) if (key[i] !== protos[i]) return !1;
        return !0;
      }
      Genfun.prototype.add = function(selector, func) {
        func || "function" != typeof selector || (func = selector, selector = []), selector = [].slice.call(selector);
        for (var i = 0; i < selector.length; i++) selector.hasOwnProperty(i) || (selector[i] = Object.prototype);
        this[kCache] = {
          key: [],
          methods: [],
          state: STATES.UNINITIALIZED
        };
        let method = new Method(this, selector, func);
        return selector.length ? this[kMethods].push(method) : this[kDefaultMethod] = method, 
        this;
      }, Genfun.prototype.rm = function() {
        throw new Error("not yet implemented");
      }, Genfun.prototype.hasMethod = function() {
        const methods = this.getApplicableMethods(arguments);
        return !(!methods || !methods.length);
      }, module.exports.noApplicableMethod = module.exports(), module.exports.noApplicableMethod.add([], ((gf, thisArg, args) => {
        let msg = "No applicable method found when called with arguments of types: (" + [].map.call(args, (arg => /\[object ([a-zA-Z0-9]+)\]/.exec({}.toString.call(arg))[1])).join(", ") + ")", err = new Error(msg);
        throw err.genfun = gf, err.thisArg = thisArg, err.args = args, err;
      })), Genfun.prototype.applyGenfun = function(newThis, args) {
        let applicableMethods = this.getApplicableMethods(args);
        if (1 === applicableMethods.length || this[kNoNext]) return applicableMethods[0].func.apply(newThis, args);
        if (applicableMethods.length > 1) {
          let idx = 0;
          const nextMethod = function nextMethod() {
            arguments.length && (args = arguments, Array.prototype.push.call(args, nextMethod));
            const next = applicableMethods[idx++];
            return idx >= applicableMethods.length && Array.prototype.pop.call(args), next.func.apply(newThis, args);
          };
          return Array.prototype.push.call(args, nextMethod), nextMethod();
        }
        return module.exports.noApplicableMethod(this, newThis, args);
      }, Genfun.prototype.getApplicableMethods = function(args) {
        if (!args.length || !this[kMethods].length) return this[kDefaultMethod] ? [ this[kDefaultMethod] ] : [];
        let applicableMethods, maybeMethods = function(genfun, args) {
          if (genfun[kCache].state === STATES.UNINITIALIZED || genfun[kCache].state === STATES.MEGAMORPHIC) return null;
          for (var proto, protos = [], i = 0; i < args.length; i++) {
            if (!(proto = cacheableProto(genfun, args[i]))) return;
            protos[i] = proto;
          }
          for (i = 0; i < genfun[kCache].key.length; i++) if (matchCachedMethods(genfun[kCache].key[i], protos)) return genfun[kCache].methods[i];
        }(this, args);
        return maybeMethods ? applicableMethods = maybeMethods : (applicableMethods = function(genfun, args) {
          args = [].slice.call(args);
          let discoveredMethods = [];
          function findAndRankRoles(object, hierarchyPosition, index) {
            (Object.hasOwnProperty.call(object, Role.roleKeyName) ? object[Role.roleKeyName] : []).forEach((role => {
              role.method.genfun === genfun && index === role.position && (discoveredMethods.indexOf(role.method) < 0 && (Method.clearRank(role.method), 
              discoveredMethods.push(role.method)), Method.setRankHierarchyPosition(role.method, index, hierarchyPosition));
            })), util.isObjectProto(object) && discoveredMethods.forEach((method => {
              method.minimalSelector <= index && Method.setRankHierarchyPosition(method, index, hierarchyPosition);
            }));
          }
          args.forEach(((arg, index) => {
            (function(obj) {
              var precedenceList = [], nextObj = obj;
              for (;nextObj; ) precedenceList.push(nextObj), nextObj = Object.getPrototypeOf(nextObj);
              return precedenceList;
            })(util.dispatchableObject(arg)).forEach(((obj, hierarchyPosition) => {
              findAndRankRoles(obj, hierarchyPosition, index);
            }));
          }));
          let applicableMethods = discoveredMethods.filter((method => args.length === method._rank.length && Method.isFullySpecified(method)));
          applicableMethods.sort(((a, b) => Method.score(a) - Method.score(b))), genfun[kDefaultMethod] && applicableMethods.push(genfun[kDefaultMethod]);
          return applicableMethods;
        }(this, args), function(genfun, args, methods) {
          if (genfun[kCache].state === STATES.MEGAMORPHIC) return;
          for (var proto, key = [], i = 0; i < args.length; i++) {
            if (!(proto = cacheableProto(genfun, args[i]))) return null;
            key[i] = proto;
          }
          genfun[kCache].key.unshift(key), genfun[kCache].methods.unshift(methods), 1 === genfun[kCache].key.length ? genfun[kCache].state = STATES.MONOMORPHIC : genfun[kCache].key.length < 32 ? genfun[kCache].state = STATES.POLYMORPHIC : genfun[kCache].state = STATES.MEGAMORPHIC;
        }(this, args, applicableMethods)), applicableMethods;
      };
    },
    60676: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Role = __webpack_require__(62167), util = __webpack_require__(66370);
      function Method(genfun, selector, func) {
        this.genfun = genfun, this.func = func, this._rank = [], this.minimalSelector = 0;
        const tmpSelector = selector.length ? selector : [ Object.prototype ];
        for (var object, i = tmpSelector.length - 1; i >= 0; i--) object = Object.hasOwnProperty.call(tmpSelector, i) ? tmpSelector[i] : Object.prototype, 
        "function" != typeof (object = util.dispatchableObject(object)) || object.isGenfun || (object = object.prototype), 
        i > 0 && !this.minimalSelector && util.isObjectProto(object) || (this.minimalSelector++, 
        Object.hasOwnProperty.call(object, Role.roleKeyName) || Object.defineProperty(object, Role.roleKeyName, {
          value: [],
          enumerable: !1
        }), object[Role.roleKeyName].unshift(new Role(this, i)));
      }
      module.exports = Method, Method.setRankHierarchyPosition = (method, index, hierarchyPosition) => {
        method._rank[index] = hierarchyPosition;
      }, Method.clearRank = method => {
        method._rank = [];
      }, Method.isFullySpecified = method => {
        for (var i = 0; i < method.minimalSelector; i++) if (!method._rank.hasOwnProperty(i)) return !1;
        return !0;
      }, Method.score = method => method._rank.reduce(((a, b) => a + b), 0);
    },
    62167: module => {
      "use strict";
      function Role(method, position) {
        this.method = method, this.position = position;
      }
      module.exports = Role, Role.roleKeyName = Symbol("roles");
    },
    66370: module => {
      "use strict";
      module.exports.isObjectProto = function(obj) {
        return obj === Object.prototype;
      };
      const _null = {}, _undefined = {}, Bool = Boolean, Num = Number, Str = String, boolCache = {
        true: new Bool(!0),
        false: new Bool(!1)
      }, numCache = {}, strCache = {};
      module.exports.dispatchableObject = function(value) {
        const Obj = Object;
        if (null === value) return _null;
        if (void 0 === value) return _undefined;
        switch (typeof value) {
         case "object":
          return value;

         case "boolean":
          return boolCache[value];

         case "number":
          return numCache[value] || (numCache[value] = new Num(value));

         case "string":
          return strCache[value] || (strCache[value] = new Str(value));

         default:
          return new Obj(value);
        }
      };
    },
    44624: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const {PassThrough} = __webpack_require__(12781);
      module.exports = options => {
        options = Object.assign({}, options);
        const {array} = options;
        let {encoding} = options;
        const buffer = "buffer" === encoding;
        let objectMode = !1;
        array ? objectMode = !(encoding || buffer) : encoding = encoding || "utf8", buffer && (encoding = null);
        let len = 0;
        const ret = [], stream = new PassThrough({
          objectMode
        });
        return encoding && stream.setEncoding(encoding), stream.on("data", (chunk => {
          ret.push(chunk), objectMode ? len = ret.length : len += chunk.length;
        })), stream.getBufferedValue = () => array ? ret : buffer ? Buffer.concat(ret, len) : ret.join(""), 
        stream.getBufferedLength = () => len, stream;
      };
    },
    94810: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const pump = __webpack_require__(42048), bufferStream = __webpack_require__(44624);
      class MaxBufferError extends Error {
        constructor() {
          super("maxBuffer exceeded"), this.name = "MaxBufferError";
        }
      }
      function getStream(inputStream, options) {
        if (!inputStream) return Promise.reject(new Error("Expected a stream"));
        options = Object.assign({
          maxBuffer: 1 / 0
        }, options);
        const {maxBuffer} = options;
        let stream;
        return new Promise(((resolve, reject) => {
          const rejectPromise = error => {
            error && (error.bufferedData = stream.getBufferedValue()), reject(error);
          };
          stream = pump(inputStream, bufferStream(options), (error => {
            error ? rejectPromise(error) : resolve();
          })), stream.on("data", (() => {
            stream.getBufferedLength() > maxBuffer && rejectPromise(new MaxBufferError);
          }));
        })).then((() => stream.getBufferedValue()));
      }
      module.exports = getStream, module.exports.buffer = (stream, options) => getStream(stream, Object.assign({}, options, {
        encoding: "buffer"
      })), module.exports.array = (stream, options) => getStream(stream, Object.assign({}, options, {
        array: !0
      })), module.exports.MaxBufferError = MaxBufferError;
    },
    41834: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(57147), path = __webpack_require__(71017), EE = __webpack_require__(82361).EventEmitter, Minimatch = __webpack_require__(42244).Minimatch;
      class Walker extends EE {
        constructor(opts) {
          super(opts = opts || {}), this.path = opts.path || process.cwd(), this.basename = path.basename(this.path), 
          this.ignoreFiles = opts.ignoreFiles || [ ".ignore" ], this.ignoreRules = {}, this.parent = opts.parent || null, 
          this.includeEmpty = !!opts.includeEmpty, this.root = this.parent ? this.parent.root : this.path, 
          this.follow = !!opts.follow, this.result = this.parent ? this.parent.result : new Set, 
          this.entries = null, this.sawError = !1;
        }
        sort(a, b) {
          return a.localeCompare(b);
        }
        emit(ev, data) {
          let ret = !1;
          return this.sawError && "error" === ev || ("error" === ev ? this.sawError = !0 : "done" !== ev || this.parent || (data = Array.from(data).map((e => /^@/.test(e) ? `./${e}` : e)).sort(this.sort), 
          this.result = data), ret = "error" === ev && this.parent ? this.parent.emit("error", data) : super.emit(ev, data)), 
          ret;
        }
        start() {
          return fs.readdir(this.path, ((er, entries) => er ? this.emit("error", er) : this.onReaddir(entries))), 
          this;
        }
        isIgnoreFile(e) {
          return "." !== e && ".." !== e && -1 !== this.ignoreFiles.indexOf(e);
        }
        onReaddir(entries) {
          if (this.entries = entries, 0 === entries.length) this.includeEmpty && this.result.add(this.path.substr(this.root.length + 1)), 
          this.emit("done", this.result); else {
            this.entries.some((e => this.isIgnoreFile(e))) ? this.addIgnoreFiles() : this.filterEntries();
          }
        }
        addIgnoreFiles() {
          const newIg = this.entries.filter((e => this.isIgnoreFile(e)));
          let igCount = newIg.length;
          const then = _ => {
            0 == --igCount && this.filterEntries();
          };
          newIg.forEach((e => this.addIgnoreFile(e, then)));
        }
        addIgnoreFile(file, then) {
          const ig = path.resolve(this.path, file);
          fs.readFile(ig, "utf8", ((er, data) => er ? this.emit("error", er) : this.onReadIgnoreFile(file, data, then)));
        }
        onReadIgnoreFile(file, data, then) {
          const mmopt = {
            matchBase: !0,
            dot: !0,
            flipNegate: !0,
            nocase: !0
          }, rules = data.split(/\r?\n/).filter((line => !/^#|^$/.test(line.trim()))).map((r => new Minimatch(r, mmopt)));
          this.ignoreRules[file] = rules, then();
        }
        filterEntries() {
          const filtered = this.entries.map((entry => {
            const passFile = this.filterEntry(entry), passDir = this.filterEntry(entry, !0);
            return !(!passFile && !passDir) && [ entry, passFile, passDir ];
          })).filter((e => e));
          let entryCount = filtered.length;
          if (0 === entryCount) this.emit("done", this.result); else {
            const then = _ => {
              0 == --entryCount && this.emit("done", this.result);
            };
            filtered.forEach((filt => {
              const entry = filt[0], file = filt[1], dir = filt[2];
              this.stat(entry, file, dir, then);
            }));
          }
        }
        onstat(st, entry, file, dir, then) {
          const abs = this.path + "/" + entry;
          st.isDirectory() ? dir ? this.walker(entry, then) : then() : (file && this.result.add(abs.substr(this.root.length + 1)), 
          then());
        }
        stat(entry, file, dir, then) {
          const abs = this.path + "/" + entry;
          fs[this.follow ? "stat" : "lstat"](abs, ((er, st) => {
            er ? this.emit("error", er) : this.onstat(st, entry, file, dir, then);
          }));
        }
        walkerOpt(entry) {
          return {
            path: this.path + "/" + entry,
            parent: this,
            ignoreFiles: this.ignoreFiles,
            follow: this.follow,
            includeEmpty: this.includeEmpty
          };
        }
        walker(entry, then) {
          new Walker(this.walkerOpt(entry)).on("done", then).start();
        }
        filterEntry(entry, partial) {
          let included = !0;
          if (this.parent && this.parent.filterEntry) {
            var pt = this.basename + "/" + entry;
            included = this.parent.filterEntry(pt, partial);
          }
          return this.ignoreFiles.forEach((f => {
            this.ignoreRules[f] && this.ignoreRules[f].forEach((rule => {
              if (rule.negate !== included) {
                (rule.match("/" + entry) || rule.match(entry) || !!partial && (rule.match("/" + entry + "/") || rule.match(entry + "/")) || !!partial && rule.negate && (rule.match("/" + entry, !0) || rule.match(entry, !0))) && (included = rule.negate);
              }
            }));
          })), included;
        }
      }
      class WalkerSync extends Walker {
        constructor(opt) {
          super(opt);
        }
        start() {
          return this.onReaddir(fs.readdirSync(this.path)), this;
        }
        addIgnoreFile(file, then) {
          const ig = path.resolve(this.path, file);
          this.onReadIgnoreFile(file, fs.readFileSync(ig, "utf8"), then);
        }
        stat(entry, file, dir, then) {
          const abs = this.path + "/" + entry, st = fs[this.follow ? "statSync" : "lstatSync"](abs);
          this.onstat(st, entry, file, dir, then);
        }
        walker(entry, then) {
          new WalkerSync(this.walkerOpt(entry)).start(), then();
        }
      }
      const walk = (options, callback) => {
        const p = new Promise(((resolve, reject) => {
          new Walker(options).on("done", resolve).on("error", reject).start();
        }));
        return callback ? p.then((res => callback(null, res)), callback) : p;
      };
      module.exports = walk, walk.sync = options => new WalkerSync(options).start().result, 
      walk.Walker = Walker, walk.WalkerSync = WalkerSync;
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
    84876: (module, __unused_webpack_exports, __webpack_require__) => {
      const cache = new Map, fs = __webpack_require__(57147), {dirname, resolve} = __webpack_require__(71017), inferOwner = path => {
        if (path = resolve(path), cache.has(path)) return Promise.resolve(cache.get(path));
        const parent = dirname(path), parentTrap = parent === path ? null : er => inferOwner(parent).then((owner => (cache.set(path, owner), 
        owner)));
        return (path => new Promise(((res, rej) => fs.lstat(path, ((er, st) => er ? rej(er) : res(st))))))(path).then((st => {
          const {uid, gid} = st;
          return cache.set(path, {
            uid,
            gid
          }), {
            uid,
            gid
          };
        }), parentTrap);
      }, inferOwnerSync = path => {
        if (path = resolve(path), cache.has(path)) return cache.get(path);
        const parent = dirname(path);
        let threw = !0;
        try {
          const st = fs.lstatSync(path);
          threw = !1;
          const {uid, gid} = st;
          return cache.set(path, {
            uid,
            gid
          }), {
            uid,
            gid
          };
        } finally {
          if (threw && parent !== path) {
            const owner = inferOwnerSync(parent);
            return cache.set(path, owner), owner;
          }
        }
      }, inflight = new Map;
      module.exports = path => {
        if (path = resolve(path), inflight.has(path)) return Promise.resolve(inflight.get(path));
        const p = inferOwner(path).then((owner => (inflight.delete(path), owner)));
        return inflight.set(path, p), p;
      }, module.exports.sync = inferOwnerSync, module.exports.clearCache = () => {
        cache.clear(), inflight.clear();
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
    84105: module => {
      var C = {}, LEFT_BRACE = C.LEFT_BRACE = 1, RIGHT_BRACE = C.RIGHT_BRACE = 2, LEFT_BRACKET = C.LEFT_BRACKET = 3, RIGHT_BRACKET = C.RIGHT_BRACKET = 4, COLON = C.COLON = 5, COMMA = C.COMMA = 6, TRUE = C.TRUE = 7, FALSE = C.FALSE = 8, NULL = C.NULL = 9, STRING = C.STRING = 10, NUMBER = C.NUMBER = 11, START = C.START = 17, STOP = C.STOP = 18, TRUE1 = C.TRUE1 = 33, TRUE2 = C.TRUE2 = 34, TRUE3 = C.TRUE3 = 35, FALSE1 = C.FALSE1 = 49, FALSE2 = C.FALSE2 = 50, FALSE3 = C.FALSE3 = 51, FALSE4 = C.FALSE4 = 52, NULL1 = C.NULL1 = 65, NULL2 = C.NULL2 = 66, NULL3 = C.NULL3 = 67, NUMBER1 = C.NUMBER1 = 81, NUMBER3 = C.NUMBER3 = 83, STRING1 = C.STRING1 = 97, STRING2 = C.STRING2 = 98, STRING3 = C.STRING3 = 99, STRING4 = C.STRING4 = 100, STRING5 = C.STRING5 = 101, STRING6 = C.STRING6 = 102, VALUE = C.VALUE = 113, KEY = C.KEY = 114, OBJECT = C.OBJECT = 129, ARRAY = C.ARRAY = 130, BACK_SLASH = "\\".charCodeAt(0), FORWARD_SLASH = "/".charCodeAt(0), BACKSPACE = "\b".charCodeAt(0), FORM_FEED = "\f".charCodeAt(0), NEWLINE = "\n".charCodeAt(0), CARRIAGE_RETURN = "\r".charCodeAt(0), TAB = "\t".charCodeAt(0);
      function Parser() {
        this.tState = START, this.value = void 0, this.string = void 0, this.stringBuffer = Buffer.alloc ? Buffer.alloc(65536) : new Buffer(65536), 
        this.stringBufferOffset = 0, this.unicode = void 0, this.highSurrogate = void 0, 
        this.key = void 0, this.mode = void 0, this.stack = [], this.state = VALUE, this.bytes_remaining = 0, 
        this.bytes_in_sequence = 0, this.temp_buffs = {
          2: new Buffer(2),
          3: new Buffer(3),
          4: new Buffer(4)
        }, this.offset = -1;
      }
      Parser.toknam = function(code) {
        for (var keys = Object.keys(C), i = 0, l = keys.length; i < l; i++) {
          var key = keys[i];
          if (C[key] === code) return key;
        }
        return code && "0x" + code.toString(16);
      };
      var proto = Parser.prototype;
      proto.onError = function(err) {
        throw err;
      }, proto.charError = function(buffer, i) {
        this.tState = STOP, this.onError(new Error("Unexpected " + JSON.stringify(String.fromCharCode(buffer[i])) + " at position " + i + " in state " + Parser.toknam(this.tState)));
      }, proto.appendStringChar = function(char) {
        this.stringBufferOffset >= 65536 && (this.string += this.stringBuffer.toString("utf8"), 
        this.stringBufferOffset = 0), this.stringBuffer[this.stringBufferOffset++] = char;
      }, proto.appendStringBuf = function(buf, start, end) {
        var size = buf.length;
        "number" == typeof start && (size = "number" == typeof end ? end < 0 ? buf.length - start + end : end - start : buf.length - start), 
        size < 0 && (size = 0), this.stringBufferOffset + size > 65536 && (this.string += this.stringBuffer.toString("utf8", 0, this.stringBufferOffset), 
        this.stringBufferOffset = 0), buf.copy(this.stringBuffer, this.stringBufferOffset, start, end), 
        this.stringBufferOffset += size;
      }, proto.write = function(buffer) {
        var n;
        "string" == typeof buffer && (buffer = new Buffer(buffer));
        for (var i = 0, l = buffer.length; i < l; i++) if (this.tState === START) {
          if (n = buffer[i], this.offset++, 123 === n) this.onToken(LEFT_BRACE, "{"); else if (125 === n) this.onToken(RIGHT_BRACE, "}"); else if (91 === n) this.onToken(LEFT_BRACKET, "["); else if (93 === n) this.onToken(RIGHT_BRACKET, "]"); else if (58 === n) this.onToken(COLON, ":"); else if (44 === n) this.onToken(COMMA, ","); else if (116 === n) this.tState = TRUE1; else if (102 === n) this.tState = FALSE1; else if (110 === n) this.tState = NULL1; else if (34 === n) this.string = "", 
          this.stringBufferOffset = 0, this.tState = STRING1; else if (45 === n) this.string = "-", 
          this.tState = NUMBER1; else if (n >= 48 && n < 64) this.string = String.fromCharCode(n), 
          this.tState = NUMBER3; else if (32 !== n && 9 !== n && 10 !== n && 13 !== n) return this.charError(buffer, i);
        } else if (this.tState === STRING1) if (n = buffer[i], this.bytes_remaining > 0) {
          for (var j = 0; j < this.bytes_remaining; j++) this.temp_buffs[this.bytes_in_sequence][this.bytes_in_sequence - this.bytes_remaining + j] = buffer[j];
          this.appendStringBuf(this.temp_buffs[this.bytes_in_sequence]), this.bytes_in_sequence = this.bytes_remaining = 0, 
          i = i + j - 1;
        } else if (0 === this.bytes_remaining && n >= 128) {
          if (n <= 193 || n > 244) return this.onError(new Error("Invalid UTF-8 character at position " + i + " in state " + Parser.toknam(this.tState)));
          if (n >= 194 && n <= 223 && (this.bytes_in_sequence = 2), n >= 224 && n <= 239 && (this.bytes_in_sequence = 3), 
          n >= 240 && n <= 244 && (this.bytes_in_sequence = 4), this.bytes_in_sequence + i > buffer.length) {
            for (var k = 0; k <= buffer.length - 1 - i; k++) this.temp_buffs[this.bytes_in_sequence][k] = buffer[i + k];
            this.bytes_remaining = i + this.bytes_in_sequence - buffer.length, i = buffer.length - 1;
          } else this.appendStringBuf(buffer, i, i + this.bytes_in_sequence), i = i + this.bytes_in_sequence - 1;
        } else if (34 === n) this.tState = START, this.string += this.stringBuffer.toString("utf8", 0, this.stringBufferOffset), 
        this.stringBufferOffset = 0, this.onToken(STRING, this.string), this.offset += Buffer.byteLength(this.string, "utf8") + 1, 
        this.string = void 0; else if (92 === n) this.tState = STRING2; else {
          if (!(n >= 32)) return this.charError(buffer, i);
          this.appendStringChar(n);
        } else if (this.tState === STRING2) if (34 === (n = buffer[i])) this.appendStringChar(n), 
        this.tState = STRING1; else if (92 === n) this.appendStringChar(BACK_SLASH), this.tState = STRING1; else if (47 === n) this.appendStringChar(FORWARD_SLASH), 
        this.tState = STRING1; else if (98 === n) this.appendStringChar(BACKSPACE), this.tState = STRING1; else if (102 === n) this.appendStringChar(FORM_FEED), 
        this.tState = STRING1; else if (110 === n) this.appendStringChar(NEWLINE), this.tState = STRING1; else if (114 === n) this.appendStringChar(CARRIAGE_RETURN), 
        this.tState = STRING1; else if (116 === n) this.appendStringChar(TAB), this.tState = STRING1; else {
          if (117 !== n) return this.charError(buffer, i);
          this.unicode = "", this.tState = STRING3;
        } else if (this.tState === STRING3 || this.tState === STRING4 || this.tState === STRING5 || this.tState === STRING6) {
          if (!((n = buffer[i]) >= 48 && n < 64 || n > 64 && n <= 70 || n > 96 && n <= 102)) return this.charError(buffer, i);
          if (this.unicode += String.fromCharCode(n), this.tState++ === STRING6) {
            var intVal = parseInt(this.unicode, 16);
            this.unicode = void 0, void 0 !== this.highSurrogate && intVal >= 56320 && intVal < 57344 ? (this.appendStringBuf(new Buffer(String.fromCharCode(this.highSurrogate, intVal))), 
            this.highSurrogate = void 0) : void 0 === this.highSurrogate && intVal >= 55296 && intVal < 56320 ? this.highSurrogate = intVal : (void 0 !== this.highSurrogate && (this.appendStringBuf(new Buffer(String.fromCharCode(this.highSurrogate))), 
            this.highSurrogate = void 0), this.appendStringBuf(new Buffer(String.fromCharCode(intVal)))), 
            this.tState = STRING1;
          }
        } else if (this.tState === NUMBER1 || this.tState === NUMBER3) switch (n = buffer[i]) {
         case 48:
         case 49:
         case 50:
         case 51:
         case 52:
         case 53:
         case 54:
         case 55:
         case 56:
         case 57:
         case 46:
         case 101:
         case 69:
         case 43:
         case 45:
          this.string += String.fromCharCode(n), this.tState = NUMBER3;
          break;

         default:
          this.tState = START;
          var result = Number(this.string);
          if (isNaN(result)) return this.charError(buffer, i);
          this.string.match(/[0-9]+/) == this.string && result.toString() != this.string ? this.onToken(STRING, this.string) : this.onToken(NUMBER, result), 
          this.offset += this.string.length - 1, this.string = void 0, i--;
        } else if (this.tState === TRUE1) {
          if (114 !== buffer[i]) return this.charError(buffer, i);
          this.tState = TRUE2;
        } else if (this.tState === TRUE2) {
          if (117 !== buffer[i]) return this.charError(buffer, i);
          this.tState = TRUE3;
        } else if (this.tState === TRUE3) {
          if (101 !== buffer[i]) return this.charError(buffer, i);
          this.tState = START, this.onToken(TRUE, !0), this.offset += 3;
        } else if (this.tState === FALSE1) {
          if (97 !== buffer[i]) return this.charError(buffer, i);
          this.tState = FALSE2;
        } else if (this.tState === FALSE2) {
          if (108 !== buffer[i]) return this.charError(buffer, i);
          this.tState = FALSE3;
        } else if (this.tState === FALSE3) {
          if (115 !== buffer[i]) return this.charError(buffer, i);
          this.tState = FALSE4;
        } else if (this.tState === FALSE4) {
          if (101 !== buffer[i]) return this.charError(buffer, i);
          this.tState = START, this.onToken(FALSE, !1), this.offset += 4;
        } else if (this.tState === NULL1) {
          if (117 !== buffer[i]) return this.charError(buffer, i);
          this.tState = NULL2;
        } else if (this.tState === NULL2) {
          if (108 !== buffer[i]) return this.charError(buffer, i);
          this.tState = NULL3;
        } else if (this.tState === NULL3) {
          if (108 !== buffer[i]) return this.charError(buffer, i);
          this.tState = START, this.onToken(NULL, null), this.offset += 3;
        }
      }, proto.onToken = function(token, value) {}, proto.parseError = function(token, value) {
        this.tState = STOP, this.onError(new Error("Unexpected " + Parser.toknam(token) + (value ? "(" + JSON.stringify(value) + ")" : "") + " in state " + Parser.toknam(this.state)));
      }, proto.push = function() {
        this.stack.push({
          value: this.value,
          key: this.key,
          mode: this.mode
        });
      }, proto.pop = function() {
        var value = this.value, parent = this.stack.pop();
        this.value = parent.value, this.key = parent.key, this.mode = parent.mode, this.emit(value), 
        this.mode || (this.state = VALUE);
      }, proto.emit = function(value) {
        this.mode && (this.state = COMMA), this.onValue(value);
      }, proto.onValue = function(value) {}, proto.onToken = function(token, value) {
        if (this.state === VALUE) if (token === STRING || token === NUMBER || token === TRUE || token === FALSE || token === NULL) this.value && (this.value[this.key] = value), 
        this.emit(value); else if (token === LEFT_BRACE) this.push(), this.value ? this.value = this.value[this.key] = {} : this.value = {}, 
        this.key = void 0, this.state = KEY, this.mode = OBJECT; else if (token === LEFT_BRACKET) this.push(), 
        this.value ? this.value = this.value[this.key] = [] : this.value = [], this.key = 0, 
        this.mode = ARRAY, this.state = VALUE; else if (token === RIGHT_BRACE) {
          if (this.mode !== OBJECT) return this.parseError(token, value);
          this.pop();
        } else {
          if (token !== RIGHT_BRACKET) return this.parseError(token, value);
          if (this.mode !== ARRAY) return this.parseError(token, value);
          this.pop();
        } else if (this.state === KEY) if (token === STRING) this.key = value, this.state = COLON; else {
          if (token !== RIGHT_BRACE) return this.parseError(token, value);
          this.pop();
        } else if (this.state === COLON) {
          if (token !== COLON) return this.parseError(token, value);
          this.state = VALUE;
        } else {
          if (this.state !== COMMA) return this.parseError(token, value);
          if (token === COMMA) this.mode === ARRAY ? (this.key++, this.state = VALUE) : this.mode === OBJECT && (this.state = KEY); else {
            if (!(token === RIGHT_BRACKET && this.mode === ARRAY || token === RIGHT_BRACE && this.mode === OBJECT)) return this.parseError(token, value);
            this.pop();
          }
        }
      }, Parser.C = C, module.exports = Parser;
    },
    36941: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Yallist = __webpack_require__(33836), MAX = Symbol("max"), LENGTH = Symbol("length"), LENGTH_CALCULATOR = Symbol("lengthCalculator"), ALLOW_STALE = Symbol("allowStale"), MAX_AGE = Symbol("maxAge"), DISPOSE = Symbol("dispose"), NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet"), LRU_LIST = Symbol("lruList"), CACHE = Symbol("cache"), UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet"), naiveLength = () => 1;
      const get = (self, key, doUse) => {
        const node = self[CACHE].get(key);
        if (node) {
          const hit = node.value;
          if (isStale(self, hit)) {
            if (del(self, node), !self[ALLOW_STALE]) return;
          } else doUse && (self[UPDATE_AGE_ON_GET] && (node.value.now = Date.now()), self[LRU_LIST].unshiftNode(node));
          return hit.value;
        }
      }, isStale = (self, hit) => {
        if (!hit || !hit.maxAge && !self[MAX_AGE]) return !1;
        const diff = Date.now() - hit.now;
        return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
      }, trim = self => {
        if (self[LENGTH] > self[MAX]) for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && null !== walker; ) {
          const prev = walker.prev;
          del(self, walker), walker = prev;
        }
      }, del = (self, node) => {
        if (node) {
          const hit = node.value;
          self[DISPOSE] && self[DISPOSE](hit.key, hit.value), self[LENGTH] -= hit.length, 
          self[CACHE].delete(hit.key), self[LRU_LIST].removeNode(node);
        }
      };
      class Entry {
        constructor(key, value, length, now, maxAge) {
          this.key = key, this.value = value, this.length = length, this.now = now, this.maxAge = maxAge || 0;
        }
      }
      const forEachStep = (self, fn, node, thisp) => {
        let hit = node.value;
        isStale(self, hit) && (del(self, node), self[ALLOW_STALE] || (hit = void 0)), hit && fn.call(thisp, hit.value, hit.key, self);
      };
      module.exports = class {
        constructor(options) {
          if ("number" == typeof options && (options = {
            max: options
          }), options || (options = {}), options.max && ("number" != typeof options.max || options.max < 0)) throw new TypeError("max must be a non-negative number");
          this[MAX] = options.max || 1 / 0;
          const lc = options.length || naiveLength;
          if (this[LENGTH_CALCULATOR] = "function" != typeof lc ? naiveLength : lc, this[ALLOW_STALE] = options.stale || !1, 
          options.maxAge && "number" != typeof options.maxAge) throw new TypeError("maxAge must be a number");
          this[MAX_AGE] = options.maxAge || 0, this[DISPOSE] = options.dispose, this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || !1, 
          this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || !1, this.reset();
        }
        set max(mL) {
          if ("number" != typeof mL || mL < 0) throw new TypeError("max must be a non-negative number");
          this[MAX] = mL || 1 / 0, trim(this);
        }
        get max() {
          return this[MAX];
        }
        set allowStale(allowStale) {
          this[ALLOW_STALE] = !!allowStale;
        }
        get allowStale() {
          return this[ALLOW_STALE];
        }
        set maxAge(mA) {
          if ("number" != typeof mA) throw new TypeError("maxAge must be a non-negative number");
          this[MAX_AGE] = mA, trim(this);
        }
        get maxAge() {
          return this[MAX_AGE];
        }
        set lengthCalculator(lC) {
          "function" != typeof lC && (lC = naiveLength), lC !== this[LENGTH_CALCULATOR] && (this[LENGTH_CALCULATOR] = lC, 
          this[LENGTH] = 0, this[LRU_LIST].forEach((hit => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key), this[LENGTH] += hit.length;
          }))), trim(this);
        }
        get lengthCalculator() {
          return this[LENGTH_CALCULATOR];
        }
        get length() {
          return this[LENGTH];
        }
        get itemCount() {
          return this[LRU_LIST].length;
        }
        rforEach(fn, thisp) {
          thisp = thisp || this;
          for (let walker = this[LRU_LIST].tail; null !== walker; ) {
            const prev = walker.prev;
            forEachStep(this, fn, walker, thisp), walker = prev;
          }
        }
        forEach(fn, thisp) {
          thisp = thisp || this;
          for (let walker = this[LRU_LIST].head; null !== walker; ) {
            const next = walker.next;
            forEachStep(this, fn, walker, thisp), walker = next;
          }
        }
        keys() {
          return this[LRU_LIST].toArray().map((k => k.key));
        }
        values() {
          return this[LRU_LIST].toArray().map((k => k.value));
        }
        reset() {
          this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length && this[LRU_LIST].forEach((hit => this[DISPOSE](hit.key, hit.value))), 
          this[CACHE] = new Map, this[LRU_LIST] = new Yallist, this[LENGTH] = 0;
        }
        dump() {
          return this[LRU_LIST].map((hit => !isStale(this, hit) && {
            k: hit.key,
            v: hit.value,
            e: hit.now + (hit.maxAge || 0)
          })).toArray().filter((h => h));
        }
        dumpLru() {
          return this[LRU_LIST];
        }
        set(key, value, maxAge) {
          if ((maxAge = maxAge || this[MAX_AGE]) && "number" != typeof maxAge) throw new TypeError("maxAge must be a number");
          const now = maxAge ? Date.now() : 0, len = this[LENGTH_CALCULATOR](value, key);
          if (this[CACHE].has(key)) {
            if (len > this[MAX]) return del(this, this[CACHE].get(key)), !1;
            const item = this[CACHE].get(key).value;
            return this[DISPOSE] && (this[NO_DISPOSE_ON_SET] || this[DISPOSE](key, item.value)), 
            item.now = now, item.maxAge = maxAge, item.value = value, this[LENGTH] += len - item.length, 
            item.length = len, this.get(key), trim(this), !0;
          }
          const hit = new Entry(key, value, len, now, maxAge);
          return hit.length > this[MAX] ? (this[DISPOSE] && this[DISPOSE](key, value), !1) : (this[LENGTH] += hit.length, 
          this[LRU_LIST].unshift(hit), this[CACHE].set(key, this[LRU_LIST].head), trim(this), 
          !0);
        }
        has(key) {
          if (!this[CACHE].has(key)) return !1;
          const hit = this[CACHE].get(key).value;
          return !isStale(this, hit);
        }
        get(key) {
          return get(this, key, !0);
        }
        peek(key) {
          return get(this, key, !1);
        }
        pop() {
          const node = this[LRU_LIST].tail;
          return node ? (del(this, node), node.value) : null;
        }
        del(key) {
          del(this, this[CACHE].get(key));
        }
        load(arr) {
          this.reset();
          const now = Date.now();
          for (let l = arr.length - 1; l >= 0; l--) {
            const hit = arr[l], expiresAt = hit.e || 0;
            if (0 === expiresAt) this.set(hit.k, hit.v); else {
              const maxAge = expiresAt - now;
              maxAge > 0 && this.set(hit.k, hit.v, maxAge);
            }
          }
        }
        prune() {
          this[CACHE].forEach(((value, key) => get(this, key, !1)));
        }
      };
    },
    42244: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = minimatch, minimatch.Minimatch = Minimatch;
      var path = function() {
        try {
          return __webpack_require__(71017);
        } catch (e) {}
      }() || {
        sep: "/"
      };
      minimatch.sep = path.sep;
      var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}, expand = __webpack_require__(21901), plTypes = {
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
        b = b || {};
        var t = {};
        return Object.keys(a).forEach((function(k) {
          t[k] = a[k];
        })), Object.keys(b).forEach((function(k) {
          t[k] = b[k];
        })), t;
      }
      function minimatch(p, pattern, options) {
        return assertValidPattern(pattern), options || (options = {}), !(!options.nocomment && "#" === pattern.charAt(0)) && new Minimatch(pattern, options).match(p);
      }
      function Minimatch(pattern, options) {
        if (!(this instanceof Minimatch)) return new Minimatch(pattern, options);
        assertValidPattern(pattern), options || (options = {}), pattern = pattern.trim(), 
        options.allowWindowsEscape || "/" === path.sep || (pattern = pattern.split(path.sep).join("/")), 
        this.options = options, this.set = [], this.pattern = pattern, this.regexp = null, 
        this.negate = !1, this.comment = !1, this.empty = !1, this.partial = !!options.partial, 
        this.make();
      }
      function braceExpand(pattern, options) {
        return options || (options = this instanceof Minimatch ? this.options : {}), pattern = void 0 === pattern ? this.pattern : pattern, 
        assertValidPattern(pattern), options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern) ? [ pattern ] : expand(pattern);
      }
      minimatch.filter = function(pattern, options) {
        return options = options || {}, function(p, i, list) {
          return minimatch(p, pattern, options);
        };
      }, minimatch.defaults = function(def) {
        if (!def || "object" != typeof def || !Object.keys(def).length) return minimatch;
        var orig = minimatch, m = function(p, pattern, options) {
          return orig(p, pattern, ext(def, options));
        };
        return (m.Minimatch = function(pattern, options) {
          return new orig.Minimatch(pattern, ext(def, options));
        }).defaults = function(options) {
          return orig.defaults(ext(def, options)).Minimatch;
        }, m.filter = function(pattern, options) {
          return orig.filter(pattern, ext(def, options));
        }, m.defaults = function(options) {
          return orig.defaults(ext(def, options));
        }, m.makeRe = function(pattern, options) {
          return orig.makeRe(pattern, ext(def, options));
        }, m.braceExpand = function(pattern, options) {
          return orig.braceExpand(pattern, ext(def, options));
        }, m.match = function(list, pattern, options) {
          return orig.match(list, pattern, ext(def, options));
        }, m;
      }, Minimatch.defaults = function(def) {
        return minimatch.defaults(def).Minimatch;
      }, Minimatch.prototype.debug = function() {}, Minimatch.prototype.make = function() {
        var pattern = this.pattern, options = this.options;
        if (!options.nocomment && "#" === pattern.charAt(0)) return void (this.comment = !0);
        if (!pattern) return void (this.empty = !0);
        this.parseNegate();
        var set = this.globSet = this.braceExpand();
        options.debug && (this.debug = function() {
          console.error.apply(console, arguments);
        });
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
      }, Minimatch.prototype.braceExpand = braceExpand;
      var assertValidPattern = function(pattern) {
        if ("string" != typeof pattern) throw new TypeError("invalid pattern");
        if (pattern.length > 65536) throw new TypeError("pattern is too long");
      };
      Minimatch.prototype.parse = function(pattern, isSub) {
        assertValidPattern(pattern);
        var options = this.options;
        if ("**" === pattern) {
          if (!options.noglobstar) return GLOBSTAR;
          pattern = "*";
        }
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
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp("[" + cs + "]");
          } catch (er) {
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]", hasMagic = hasMagic || sp[1], 
            inClass = !1;
            continue;
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
         case "[":
         case ".":
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
        if (void 0 === partial && (partial = this.partial), this.debug("match", f, this.pattern), 
        this.comment) return !1;
        if (this.empty) return "" === f;
        if ("/" === f && partial) return !0;
        var options = this.options;
        "/" !== path.sep && (f = f.split(path.sep).join("/")), f = f.split(slashSplit), 
        this.debug(this.pattern, "split", f);
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
          file,
          pattern
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
          if ("string" == typeof p ? (hit = f === p, this.debug("string match", p, f, hit)) : (hit = f.match(p), 
          this.debug("pattern match", p, f, hit)), !hit) return !1;
        }
        if (fi === fl && pi === pl) return !0;
        if (fi === fl) return partial;
        if (pi === pl) return fi === fl - 1 && "" === file[fi];
        throw new Error("wtf?");
      };
    },
    15465: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const EE = __webpack_require__(82361), Yallist = __webpack_require__(33836), SD = __webpack_require__(71576).StringDecoder, EOF = Symbol("EOF"), MAYBE_EMIT_END = Symbol("maybeEmitEnd"), EMITTED_END = Symbol("emittedEnd"), EMITTING_END = Symbol("emittingEnd"), CLOSED = Symbol("closed"), READ = Symbol("read"), FLUSH = Symbol("flush"), FLUSHCHUNK = Symbol("flushChunk"), ENCODING = Symbol("encoding"), DECODER = Symbol("decoder"), FLOWING = Symbol("flowing"), PAUSED = Symbol("paused"), RESUME = Symbol("resume"), BUFFERLENGTH = Symbol("bufferLength"), BUFFERPUSH = Symbol("bufferPush"), BUFFERSHIFT = Symbol("bufferShift"), OBJECTMODE = Symbol("objectMode"), DESTROYED = Symbol("destroyed"), doIter = "1" !== global._MP_NO_ITERATOR_SYMBOLS_, ASYNCITERATOR = doIter && Symbol.asyncIterator || Symbol("asyncIterator not implemented"), ITERATOR = doIter && Symbol.iterator || Symbol("iterator not implemented"), B = Buffer.alloc ? Buffer : __webpack_require__(28618).Buffer, isEndish = ev => "end" === ev || "finish" === ev || "prefinish" === ev;
      module.exports = class Minipass extends EE {
        constructor(options) {
          super(), this[FLOWING] = !1, this[PAUSED] = !1, this.pipes = new Yallist, this.buffer = new Yallist, 
          this[OBJECTMODE] = options && options.objectMode || !1, this[OBJECTMODE] ? this[ENCODING] = null : this[ENCODING] = options && options.encoding || null, 
          "buffer" === this[ENCODING] && (this[ENCODING] = null), this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null, 
          this[EOF] = !1, this[EMITTED_END] = !1, this[EMITTING_END] = !1, this[CLOSED] = !1, 
          this.writable = !0, this.readable = !0, this[BUFFERLENGTH] = 0, this[DESTROYED] = !1;
        }
        get bufferLength() {
          return this[BUFFERLENGTH];
        }
        get encoding() {
          return this[ENCODING];
        }
        set encoding(enc) {
          if (this[OBJECTMODE]) throw new Error("cannot set encoding in objectMode");
          if (this[ENCODING] && enc !== this[ENCODING] && (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH])) throw new Error("cannot change encoding");
          this[ENCODING] !== enc && (this[DECODER] = enc ? new SD(enc) : null, this.buffer.length && (this.buffer = this.buffer.map((chunk => this[DECODER].write(chunk))))), 
          this[ENCODING] = enc;
        }
        setEncoding(enc) {
          this.encoding = enc;
        }
        get objectMode() {
          return this[OBJECTMODE];
        }
        set objectMode(ॐ) {
          this[OBJECTMODE] = this[OBJECTMODE] || !!ॐ;
        }
        write(chunk, encoding, cb) {
          if (this[EOF]) throw new Error("write after end");
          if (this[DESTROYED]) return this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), {
            code: "ERR_STREAM_DESTROYED"
          })), !0;
          var b;
          if ("function" == typeof encoding && (cb = encoding, encoding = "utf8"), encoding || (encoding = "utf8"), 
          this[OBJECTMODE] || B.isBuffer(chunk) || (b = chunk, !B.isBuffer(b) && ArrayBuffer.isView(b) ? chunk = B.from(chunk.buffer, chunk.byteOffset, chunk.byteLength) : (b => b instanceof ArrayBuffer || "object" == typeof b && b.constructor && "ArrayBuffer" === b.constructor.name && b.byteLength >= 0)(chunk) ? chunk = B.from(chunk) : "string" != typeof chunk && (this.objectMode = !0)), 
          !this.objectMode && !chunk.length) {
            const ret = this.flowing;
            return 0 !== this[BUFFERLENGTH] && this.emit("readable"), cb && cb(), ret;
          }
          "string" != typeof chunk || this[OBJECTMODE] || encoding === this[ENCODING] && !this[DECODER].lastNeed || (chunk = B.from(chunk, encoding)), 
          B.isBuffer(chunk) && this[ENCODING] && (chunk = this[DECODER].write(chunk));
          try {
            return this.flowing ? (this.emit("data", chunk), this.flowing) : (this[BUFFERPUSH](chunk), 
            !1);
          } finally {
            0 !== this[BUFFERLENGTH] && this.emit("readable"), cb && cb();
          }
        }
        read(n) {
          if (this[DESTROYED]) return null;
          try {
            return 0 === this[BUFFERLENGTH] || 0 === n || n > this[BUFFERLENGTH] ? null : (this[OBJECTMODE] && (n = null), 
            this.buffer.length > 1 && !this[OBJECTMODE] && (this.encoding ? this.buffer = new Yallist([ Array.from(this.buffer).join("") ]) : this.buffer = new Yallist([ B.concat(Array.from(this.buffer), this[BUFFERLENGTH]) ])), 
            this[READ](n || null, this.buffer.head.value));
          } finally {
            this[MAYBE_EMIT_END]();
          }
        }
        [READ](n, chunk) {
          return n === chunk.length || null === n ? this[BUFFERSHIFT]() : (this.buffer.head.value = chunk.slice(n), 
          chunk = chunk.slice(0, n), this[BUFFERLENGTH] -= n), this.emit("data", chunk), this.buffer.length || this[EOF] || this.emit("drain"), 
          chunk;
        }
        end(chunk, encoding, cb) {
          return "function" == typeof chunk && (cb = chunk, chunk = null), "function" == typeof encoding && (cb = encoding, 
          encoding = "utf8"), chunk && this.write(chunk, encoding), cb && this.once("end", cb), 
          this[EOF] = !0, this.writable = !1, !this.flowing && this[PAUSED] || this[MAYBE_EMIT_END](), 
          this;
        }
        [RESUME]() {
          this[DESTROYED] || (this[PAUSED] = !1, this[FLOWING] = !0, this.emit("resume"), 
          this.buffer.length ? this[FLUSH]() : this[EOF] ? this[MAYBE_EMIT_END]() : this.emit("drain"));
        }
        resume() {
          return this[RESUME]();
        }
        pause() {
          this[FLOWING] = !1, this[PAUSED] = !0;
        }
        get destroyed() {
          return this[DESTROYED];
        }
        get flowing() {
          return this[FLOWING];
        }
        get paused() {
          return this[PAUSED];
        }
        [BUFFERPUSH](chunk) {
          return this[OBJECTMODE] ? this[BUFFERLENGTH] += 1 : this[BUFFERLENGTH] += chunk.length, 
          this.buffer.push(chunk);
        }
        [BUFFERSHIFT]() {
          return this.buffer.length && (this[OBJECTMODE] ? this[BUFFERLENGTH] -= 1 : this[BUFFERLENGTH] -= this.buffer.head.value.length), 
          this.buffer.shift();
        }
        [FLUSH]() {
          do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()));
          this.buffer.length || this[EOF] || this.emit("drain");
        }
        [FLUSHCHUNK](chunk) {
          return !!chunk && (this.emit("data", chunk), this.flowing);
        }
        pipe(dest, opts) {
          if (this[DESTROYED]) return;
          const ended = this[EMITTED_END];
          opts = opts || {}, dest === process.stdout || dest === process.stderr ? opts.end = !1 : opts.end = !1 !== opts.end;
          const p = {
            dest,
            opts,
            ondrain: _ => this[RESUME]()
          };
          return this.pipes.push(p), dest.on("drain", p.ondrain), this[RESUME](), ended && p.opts.end && p.dest.end(), 
          dest;
        }
        addListener(ev, fn) {
          return this.on(ev, fn);
        }
        on(ev, fn) {
          try {
            return super.on(ev, fn);
          } finally {
            "data" !== ev || this.pipes.length || this.flowing ? isEndish(ev) && this[EMITTED_END] && (super.emit(ev), 
            this.removeAllListeners(ev)) : this[RESUME]();
          }
        }
        get emittedEnd() {
          return this[EMITTED_END];
        }
        [MAYBE_EMIT_END]() {
          this[EMITTING_END] || this[EMITTED_END] || this[DESTROYED] || 0 !== this.buffer.length || !this[EOF] || (this[EMITTING_END] = !0, 
          this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[CLOSED] && this.emit("close"), 
          this[EMITTING_END] = !1);
        }
        emit(ev, data) {
          if ("error" !== ev && "close" !== ev && ev !== DESTROYED && this[DESTROYED]) return;
          if ("data" === ev) {
            if (!data) return;
            this.pipes.length && this.pipes.forEach((p => !1 === p.dest.write(data) && this.pause()));
          } else if ("end" === ev) {
            if (!0 === this[EMITTED_END]) return;
            this[EMITTED_END] = !0, this.readable = !1, this[DECODER] && (data = this[DECODER].end()) && (this.pipes.forEach((p => p.dest.write(data))), 
            super.emit("data", data)), this.pipes.forEach((p => {
              p.dest.removeListener("drain", p.ondrain), p.opts.end && p.dest.end();
            }));
          } else if ("close" === ev && (this[CLOSED] = !0, !this[EMITTED_END] && !this[DESTROYED])) return;
          const args = new Array(arguments.length);
          if (args[0] = ev, args[1] = data, arguments.length > 2) for (let i = 2; i < arguments.length; i++) args[i] = arguments[i];
          try {
            return super.emit.apply(this, args);
          } finally {
            isEndish(ev) ? this.removeAllListeners(ev) : this[MAYBE_EMIT_END]();
          }
        }
        collect() {
          const buf = [];
          return buf.dataLength = 0, this.on("data", (c => {
            buf.push(c), buf.dataLength += c.length;
          })), this.promise().then((() => buf));
        }
        concat() {
          return this[OBJECTMODE] ? Promise.reject(new Error("cannot concat in objectMode")) : this.collect().then((buf => this[OBJECTMODE] ? Promise.reject(new Error("cannot concat in objectMode")) : this[ENCODING] ? buf.join("") : B.concat(buf, buf.dataLength)));
        }
        promise() {
          return new Promise(((resolve, reject) => {
            this.on(DESTROYED, (() => reject(new Error("stream destroyed")))), this.on("end", (() => resolve())), 
            this.on("error", (er => reject(er)));
          }));
        }
        [ASYNCITERATOR]() {
          return {
            next: () => {
              const res = this.read();
              if (null !== res) return Promise.resolve({
                done: !1,
                value: res
              });
              if (this[EOF]) return Promise.resolve({
                done: !0
              });
              let resolve = null, reject = null;
              const onerr = er => {
                this.removeListener("data", ondata), this.removeListener("end", onend), reject(er);
              }, ondata = value => {
                this.removeListener("error", onerr), this.removeListener("end", onend), this.pause(), 
                resolve({
                  value,
                  done: !!this[EOF]
                });
              }, onend = () => {
                this.removeListener("error", onerr), this.removeListener("data", ondata), resolve({
                  done: !0
                });
              }, ondestroy = () => onerr(new Error("stream destroyed"));
              return new Promise(((res, rej) => {
                reject = rej, resolve = res, this.once(DESTROYED, ondestroy), this.once("error", onerr), 
                this.once("end", onend), this.once("data", ondata);
              }));
            }
          };
        }
        [ITERATOR]() {
          return {
            next: () => {
              const value = this.read();
              return {
                value,
                done: null === value
              };
            }
          };
        }
        destroy(er) {
          return this[DESTROYED] ? (er ? this.emit("error", er) : this.emit(DESTROYED), this) : (this[DESTROYED] = !0, 
          this.buffer = new Yallist, this[BUFFERLENGTH] = 0, "function" != typeof this.close || this[CLOSED] || this.close(), 
          er ? this.emit("error", er) : this.emit(DESTROYED), this);
        }
        static isStream(s) {
          return !!s && (s instanceof Minipass || s instanceof EE && ("function" == typeof s.pipe || "function" == typeof s.write && "function" == typeof s.end));
        }
      };
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
    84245: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(57147), path = __webpack_require__(71017), EE = __webpack_require__(82361).EventEmitter, normalizePackageBin = __webpack_require__(71921);
      class BundleWalker extends EE {
        constructor(opt) {
          if (super(opt = opt || {}), this.path = path.resolve(opt.path || process.cwd()), 
          this.parent = opt.parent || null, this.parent) {
            if (this.result = this.parent.result, !this.parent.parent) {
              const base = path.basename(this.path), scope = path.basename(path.dirname(this.path));
              this.result.add(/^@/.test(scope) ? scope + "/" + base : base);
            }
            this.root = this.parent.root, this.packageJsonCache = this.parent.packageJsonCache;
          } else this.result = new Set, this.root = this.path, this.packageJsonCache = opt.packageJsonCache || new Map;
          this.seen = new Set, this.didDone = !1, this.children = 0, this.node_modules = [], 
          this.package = null, this.bundle = null;
        }
        addListener(ev, fn) {
          return this.on(ev, fn);
        }
        on(ev, fn) {
          const ret = super.on(ev, fn);
          return "done" === ev && this.didDone && this.emit("done", this.result), ret;
        }
        done() {
          if (!this.didDone) if (this.didDone = !0, this.parent) this.emit("done"); else {
            const res = Array.from(this.result);
            this.result = res, this.emit("done", res);
          }
        }
        start() {
          const pj = path.resolve(this.path, "package.json");
          return this.packageJsonCache.has(pj) ? this.onPackage(this.packageJsonCache.get(pj)) : this.readPackageJson(pj), 
          this;
        }
        readPackageJson(pj) {
          fs.readFile(pj, ((er, data) => er ? this.done() : this.onPackageJson(pj, data)));
        }
        onPackageJson(pj, data) {
          try {
            this.package = normalizePackageBin(JSON.parse(data + ""));
          } catch (er) {
            return this.done();
          }
          this.packageJsonCache.set(pj, this.package), this.onPackage(this.package);
        }
        allDepsBundled(pkg) {
          return Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.optionalDependencies || {}));
        }
        onPackage(pkg) {
          const bdRaw = this.parent ? this.allDepsBundled(pkg) : pkg.bundleDependencies || pkg.bundledDependencies || [], bd = Array.from(new Set(Array.isArray(bdRaw) ? bdRaw : !0 === bdRaw ? this.allDepsBundled(pkg) : Object.keys(bdRaw)));
          if (!bd.length) return this.done();
          this.bundle = bd;
          this.path;
          this.readModules();
        }
        readModules() {
          readdirNodeModules(this.path + "/node_modules", ((er, nm) => er ? this.onReaddir([]) : this.onReaddir(nm)));
        }
        onReaddir(nm) {
          this.node_modules = nm, this.bundle.forEach((dep => this.childDep(dep))), 0 === this.children && this.done();
        }
        childDep(dep) {
          -1 === this.node_modules.indexOf(dep) || this.seen.has(dep) ? this.parent && this.parent.childDep(dep) : (this.seen.add(dep), 
          this.child(dep));
        }
        child(dep) {
          const p = this.path + "/node_modules/" + dep;
          this.children += 1;
          const child = new BundleWalker({
            path: p,
            parent: this
          });
          child.on("done", (_ => {
            0 == --this.children && this.done();
          })), child.start();
        }
      }
      class BundleWalkerSync extends BundleWalker {
        constructor(opt) {
          super(opt);
        }
        start() {
          return super.start(), this.done(), this;
        }
        readPackageJson(pj) {
          try {
            this.onPackageJson(pj, fs.readFileSync(pj));
          } catch (er) {}
          return this;
        }
        readModules() {
          try {
            this.onReaddir(readdirNodeModulesSync(this.path + "/node_modules"));
          } catch (er) {
            this.onReaddir([]);
          }
        }
        child(dep) {
          new BundleWalkerSync({
            path: this.path + "/node_modules/" + dep,
            parent: this
          }).start();
        }
      }
      const readdirNodeModules = (nm, cb) => {
        fs.readdir(nm, ((er, set) => {
          if (er) cb(er); else {
            const scopes = set.filter((f => /^@/.test(f)));
            if (scopes.length) {
              const unscoped = set.filter((f => !/^@/.test(f)));
              let count = scopes.length;
              scopes.forEach((scope => {
                fs.readdir(nm + "/" + scope, ((er, pkgs) => {
                  er || !pkgs.length ? unscoped.push(scope) : unscoped.push.apply(unscoped, pkgs.map((p => scope + "/" + p))), 
                  0 == --count && cb(null, unscoped);
                }));
              }));
            } else cb(null, set);
          }
        }));
      }, readdirNodeModulesSync = nm => {
        const set = fs.readdirSync(nm), unscoped = set.filter((f => !/^@/.test(f))), scopes = set.filter((f => /^@/.test(f))).map((scope => {
          try {
            const pkgs = fs.readdirSync(nm + "/" + scope);
            return pkgs.length ? pkgs.map((p => scope + "/" + p)) : [ scope ];
          } catch (er) {
            return [ scope ];
          }
        })).reduce(((a, b) => a.concat(b)), []);
        return unscoped.concat(scopes);
      }, walk = (options, callback) => {
        const p = new Promise(((resolve, reject) => {
          new BundleWalker(options).on("done", resolve).on("error", reject).start();
        }));
        return callback ? p.then((res => callback(null, res)), callback) : p;
      };
      module.exports = walk, walk.sync = options => new BundleWalkerSync(options).start().result, 
      walk.BundleWalker = BundleWalker, walk.BundleWalkerSync = BundleWalkerSync;
    },
    71921: (module, __unused_webpack_exports, __webpack_require__) => {
      const {join, basename} = __webpack_require__(71017), normalizeString = pkg => pkg.name ? (pkg.bin = {
        [pkg.name]: pkg.bin
      }, normalizeObject(pkg)) : removeBin(pkg), normalizeArray = pkg => (pkg.bin = pkg.bin.reduce(((acc, k) => (acc[basename(k)] = k, 
      acc)), {}), normalizeObject(pkg)), removeBin = pkg => (delete pkg.bin, pkg), normalizeObject = pkg => {
        const orig = pkg.bin, clean = {};
        let hasBins = !1;
        return Object.keys(orig).forEach((binKey => {
          const base = join("/", basename(binKey.replace(/\\|:/g, "/"))).substr(1);
          if ("string" != typeof orig[binKey] || !base) return;
          const binTarget = join("/", orig[binKey]).replace(/\\/g, "/").substr(1);
          binTarget && (clean[base] = binTarget, hasBins = !0);
        })), hasBins ? pkg.bin = clean : delete pkg.bin, pkg;
      };
      module.exports = pkg => pkg.bin ? "string" == typeof pkg.bin ? normalizeString(pkg) : Array.isArray(pkg.bin) ? normalizeArray(pkg) : "object" == typeof pkg.bin ? normalizeObject(pkg) : removeBin(pkg) : removeBin(pkg);
    },
    68749: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const bundleWalk = __webpack_require__(84245), BundleWalker = bundleWalk.BundleWalker, BundleWalkerSync = bundleWalk.BundleWalkerSync, ignoreWalk = __webpack_require__(41834), IgnoreWalker = ignoreWalk.Walker, IgnoreWalkerSync = ignoreWalk.WalkerSync, rootBuiltinRules = Symbol("root-builtin-rules"), packageNecessaryRules = Symbol("package-necessary-rules"), path = __webpack_require__(71017), normalizePackageBin = __webpack_require__(71921), defaultRules = [ ".npmignore", ".gitignore", "**/.git", "**/.svn", "**/.hg", "**/CVS", "**/.git/**", "**/.svn/**", "**/.hg/**", "**/CVS/**", "/.lock-wscript", "/.wafpickle-*", "/build/config.gypi", "npm-debug.log", "**/.npmrc", ".*.swp", ".DS_Store", "**/.DS_Store/**", "._*", "**/._*/**", "*.orig", "/package-lock.json", "/yarn.lock", "archived-packages/**", "core", "!core/", "!**/core/", "*.core", "*.vgcore", "vgcore.*", "core.+([0-9])" ], npmWalker = Class => class extends Class {
        constructor(opt) {
          (opt = opt || {}).ignoreFiles = [ rootBuiltinRules, "package.json", ".npmignore", ".gitignore", packageNecessaryRules ], 
          opt.includeEmpty = !1, opt.path = opt.path || process.cwd();
          const dirName = path.basename(opt.path), parentName = path.basename(path.dirname(opt.path));
          if (opt.follow = "node_modules" === dirName || "node_modules" === parentName && /^@/.test(dirName), 
          super(opt), this.parent) this.bundled = [], this.bundledScopes = [], this.packageJsonCache = this.parent.packageJsonCache; else {
            this.bundled = opt.bundled || [], this.bundledScopes = Array.from(new Set(this.bundled.filter((f => /^@/.test(f))).map((f => f.split("/")[0]))));
            const rules = defaultRules.join("\n") + "\n";
            this.packageJsonCache = opt.packageJsonCache || new Map, super.onReadIgnoreFile(rootBuiltinRules, rules, (_ => _));
          }
        }
        onReaddir(entries) {
          return this.parent || (entries = entries.filter((e => ".git" !== e && !("node_modules" === e && 0 === this.bundled.length)))), 
          super.onReaddir(entries);
        }
        filterEntry(entry, partial) {
          const p = this.path.substr(this.root.length + 1), pkgre = /^node_modules\/(@[^\/]+\/?[^\/]+|[^\/]+)(\/.*)?$/, isRoot = !this.parent, pkg = isRoot && pkgre.test(entry) ? entry.replace(pkgre, "$1") : null, rootNM = isRoot && "node_modules" === entry, rootPJ = isRoot && "package.json" === entry;
          return /^node_modules($|\/)/i.test(p) ? this.parent.filterEntry(this.basename + "/" + entry, partial) : pkg ? -1 !== this.bundled.indexOf(pkg) || -1 !== this.bundledScopes.indexOf(pkg) : rootNM ? !!this.bundled.length : !!rootPJ || super.filterEntry(entry, partial);
        }
        filterEntries() {
          this.ignoreRules["package.json"] ? this.ignoreRules[".gitignore"] = this.ignoreRules[".npmignore"] = null : this.ignoreRules[".npmignore"] && (this.ignoreRules[".gitignore"] = null), 
          this.filterEntries = super.filterEntries, super.filterEntries();
        }
        addIgnoreFile(file, then) {
          const ig = path.resolve(this.path, file);
          this.packageJsonCache.has(ig) ? this.onPackageJson(ig, this.packageJsonCache.get(ig), then) : super.addIgnoreFile(file, then);
        }
        onPackageJson(ig, pkg, then) {
          this.packageJsonCache.set(ig, pkg);
          const rules = [ pkg.browser ? "!" + pkg.browser : "", pkg.main ? "!" + pkg.main : "", "!package.json", "!npm-shrinkwrap.json", "!@(readme|copying|license|licence|notice|changes|changelog|history){,.*[^~$]}" ];
          if (pkg.bin) for (const key in pkg.bin) rules.push("!" + pkg.bin[key]);
          const data = rules.filter((f => f)).join("\n") + "\n";
          super.onReadIgnoreFile(packageNecessaryRules, data, (_ => _)), Array.isArray(pkg.files) ? super.onReadIgnoreFile("package.json", "*\n" + pkg.files.map((f => "!" + f + "\n!" + f.replace(/\/+$/, "") + "/**")).join("\n") + "\n", then) : then();
        }
        stat(entry, file, dir, then) {
          (file => /\*/.test(file))(entry) ? then() : super.stat(entry, file, dir, then);
        }
        onstat(st, entry, file, dir, then) {
          st.isSymbolicLink() ? then() : super.onstat(st, entry, file, dir, then);
        }
        onReadIgnoreFile(file, data, then) {
          if ("package.json" === file) try {
            const ig = path.resolve(this.path, file);
            this.onPackageJson(ig, normalizePackageBin(JSON.parse(data)), then);
          } catch (er) {
            then();
          } else super.onReadIgnoreFile(file, data, then);
        }
        sort(a, b) {
          return sort(a, b);
        }
      };
      class Walker extends(npmWalker(IgnoreWalker)){
        walker(entry, then) {
          new Walker(this.walkerOpt(entry)).on("done", then).start();
        }
      }
      class WalkerSync extends(npmWalker(IgnoreWalkerSync)){
        walker(entry, then) {
          new WalkerSync(this.walkerOpt(entry)).start(), then();
        }
      }
      const walk = (options, callback) => {
        options = options || {};
        const p = new Promise(((resolve, reject) => {
          const bw = new BundleWalker(options);
          bw.on("done", (bundled => {
            options.bundled = bundled, options.packageJsonCache = bw.packageJsonCache, new Walker(options).on("done", resolve).on("error", reject).start();
          })), bw.start();
        }));
        return callback ? p.then((res => callback(null, res)), callback) : p;
      }, sort = (a, b) => {
        const exta = path.extname(a).toLowerCase(), extb = path.extname(b).toLowerCase(), basea = path.basename(a).toLowerCase(), baseb = path.basename(b).toLowerCase();
        return exta.localeCompare(extb) || basea.localeCompare(baseb) || a.localeCompare(b);
      };
      module.exports = walk, walk.sync = options => {
        const bw = new BundleWalkerSync(options = options || {}).start();
        options.bundled = bw.result, options.packageJsonCache = bw.packageJsonCache;
        const walker = new WalkerSync(options);
        return walker.start(), walker.result;
      }, walk.Walker = Walker, walk.WalkerSync = WalkerSync;
    },
    90346: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const figgyPudding = __webpack_require__(55212), npa = __webpack_require__(19932), semver = __webpack_require__(73107), PickerOpts = figgyPudding({
        defaultTag: {
          default: "latest"
        },
        enjoyBy: {},
        includeDeprecated: {
          default: !1
        }
      });
      module.exports = function(packument, wanted, opts) {
        const time = (opts = PickerOpts(opts)).enjoyBy && packument.time && +new Date(opts.enjoyBy), type = npa.resolve(packument.name, wanted).type;
        "version" !== type && "range" !== type || (wanted = semver.clean(wanted, !0) || wanted);
        const distTags = packument["dist-tags"] || {}, versions = Object.keys(packument.versions || {}).filter((v => semver.valid(v, !0))), policyRestrictions = packument.policyRestrictions, restrictedVersions = policyRestrictions ? Object.keys(policyRestrictions.versions) : [];
        function enjoyableBy(v) {
          return !time || packument.time[v] && time >= +new Date(packument.time[v]);
        }
        let err, target;
        if (!versions.length && !restrictedVersions.length) throw err = new Error(`No valid versions available for ${packument.name}`), 
        err.code = "ENOVERSIONS", err.name = packument.name, err.type = type, err.wanted = wanted, 
        err;
        if ("tag" === type && enjoyableBy(distTags[wanted])) target = distTags[wanted]; else if ("version" === type) target = wanted; else if ("range" !== type && enjoyableBy(distTags[wanted])) throw new Error("Only tag, version, and range are supported");
        const tagVersion = distTags[opts.defaultTag];
        !target && tagVersion && packument.versions[tagVersion] && enjoyableBy(tagVersion) && semver.satisfies(tagVersion, wanted, !0) && (target = tagVersion);
        if (!target && !opts.includeDeprecated) {
          const undeprecated = versions.filter((v => !packument.versions[v].deprecated && enjoyableBy(v)));
          target = semver.maxSatisfying(undeprecated, wanted, !0);
        }
        if (!target) {
          const stillFresh = versions.filter(enjoyableBy);
          target = semver.maxSatisfying(stillFresh, wanted, !0);
        }
        !target && "*" === wanted && enjoyableBy(tagVersion) && (target = tagVersion);
        if (!target && time && "tag" === type && distTags[wanted] && !enjoyableBy(distTags[wanted])) {
          const stillFresh = versions.filter((v => enjoyableBy(v) && semver.lte(v, distTags[wanted], !0))).sort(semver.rcompare);
          target = stillFresh[0];
        }
        !target && restrictedVersions && (target = semver.maxSatisfying(restrictedVersions, wanted, !0));
        const manifest = target && packument.versions[target];
        if (manifest) return manifest;
        {
          const isForbidden = target && policyRestrictions && policyRestrictions.versions[target], pckg = `${packument.name}@${wanted}${opts.enjoyBy ? ` with an Enjoy By date of ${new Date(opts.enjoyBy).toLocaleString()}. Maybe try a different date?` : ""}`;
          throw isForbidden ? (err = new Error(`Could not download ${pckg} due to policy violations.\n${policyRestrictions.message}\n`), 
          err.code = "E403") : (err = new Error(`No matching version found for ${pckg}.`), 
          err.code = "ETARGET"), err.name = packument.name, err.type = type, err.wanted = wanted, 
          err.versions = versions, err.distTags = distTags, err.defaultTag = opts.defaultTag, 
          err;
        }
      };
    },
    59505: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const config = __webpack_require__(30342), url = __webpack_require__(57310);
      module.exports = function(registry, opts) {
        if (!registry) throw new Error("registry is required");
        opts = config(opts);
        let AUTH = {};
        const regKey = registry && function(registry) {
          const parsed = url.parse(registry), formatted = url.format({
            host: parsed.host,
            pathname: parsed.pathname,
            slashes: parsed.slashes
          });
          return url.resolve(formatted, ".");
        }(registry);
        opts.forceAuth && (opts = opts.forceAuth);
        const doKey = (key, alias) => function(opts, obj, scope, key, objKey) {
          opts[key] && (obj[objKey || key] = opts[key]);
          scope && opts[`${scope}:${key}`] && (obj[objKey || key] = opts[`${scope}:${key}`]);
        }(opts, AUTH, regKey, key, alias);
        doKey("token"), doKey("_authToken", "token"), doKey("username"), doKey("password"), 
        doKey("_password", "password"), doKey("email"), doKey("_auth"), doKey("otp"), doKey("always-auth", "alwaysAuth"), 
        AUTH.password && (AUTH.password = Buffer.from(AUTH.password, "base64").toString("utf8"));
        if (AUTH._auth && (!AUTH.username || !AUTH.password)) {
          let auth = Buffer.from(AUTH._auth, "base64").toString();
          auth = auth.split(":"), AUTH.username = auth.shift(), AUTH.password = auth.join(":");
        }
        return AUTH.alwaysAuth = "false" !== AUTH.alwaysAuth && !!AUTH.alwaysAuth, AUTH;
      };
    },
    83163: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const config = __webpack_require__(30342), errors = __webpack_require__(79729), LRU = __webpack_require__(36941);
      function logRequest(method, res, startTime, opts) {
        const elapsedTime = Date.now() - startTime, attempt = res.headers.get("x-fetch-attempts"), attemptStr = attempt && attempt > 1 ? ` attempt #${attempt}` : "", cacheStr = res.headers.get("x-local-cache") ? " (from cache)" : "";
        let urlStr;
        try {
          const url = new (0, __webpack_require__(57310).URL)(res.url);
          url.password && (url.password = "***"), urlStr = url.toString();
        } catch (er) {
          urlStr = res.url;
        }
        opts.log.http("fetch", `${method.toUpperCase()} ${res.status} ${urlStr} ${elapsedTime}ms${attemptStr}${cacheStr}`);
      }
      module.exports = function(method, res, registry, startTime, opts) {
        opts = config(opts), res.headers.has("npm-notice") && !res.headers.has("x-local-cache") && opts.log.notice("", res.headers.get("npm-notice"));
        return function(res, registry, opts) {
          if (res.headers.has("warning") && !BAD_HOSTS.has(registry)) {
            const warnings = {};
            res.headers.raw().warning.forEach((w => {
              const match = w.match(WARNING_REGEXP);
              match && (warnings[match[1]] = {
                code: match[1],
                host: match[2],
                message: match[3],
                date: new Date(match[4])
              });
            })), BAD_HOSTS.set(registry, !0), warnings[199] && (warnings[199].message.match(/ENOTFOUND/) ? opts.log.warn("registry", `Using stale data from ${registry} because the host is inaccessible -- are you offline?`) : opts.log.warn("registry", `Unexpected warning for ${registry}: ${warnings[199].message}`)), 
            warnings[111] && opts.log.warn("registry", `Using stale data from ${registry} due to a request error during revalidation.`);
          }
        }(res, registry, opts), res.status >= 400 ? (logRequest(method, res, startTime, opts), 
        function(method, res, startTime, opts) {
          return res.buffer().catch((() => null)).then((body => {
            let parsed = body;
            try {
              parsed = JSON.parse(body.toString("utf8"));
            } catch (e) {}
            if (401 === res.status && res.headers.get("www-authenticate")) {
              const auth = res.headers.get("www-authenticate").split(/,\s*/).map((s => s.toLowerCase()));
              throw -1 !== auth.indexOf("ipaddress") ? new errors.HttpErrorAuthIPAddress(method, res, parsed, opts.spec) : -1 !== auth.indexOf("otp") ? new errors.HttpErrorAuthOTP(method, res, parsed, opts.spec) : new errors.HttpErrorAuthUnknown(method, res, parsed, opts.spec);
            }
            throw 401 === res.status && null != body && /one-time pass/.test(body.toString("utf8")) ? new errors.HttpErrorAuthOTP(method, res, parsed, opts.spec) : new errors.HttpErrorGeneral(method, res, parsed, opts.spec);
          }));
        }(method, res, 0, opts)) : (res.body.on("end", (() => logRequest(method, res, startTime, opts))), 
        opts.ignoreBody && (res.body.resume(), res.body = null), res);
      };
      const WARNING_REGEXP = /^\s*(\d{3})\s+(\S+)\s+"(.*)"\s+"([^"]+)"/, BAD_HOSTS = new LRU({
        max: 50
      });
    },
    30342: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const pkg = __webpack_require__(9762), figgyPudding = __webpack_require__(55212), silentLog = __webpack_require__(63235), AUTH_REGEX = /^(?:.*:)?(token|_authToken|username|_password|password|email|always-auth|_auth|otp)$/, SCOPE_REGISTRY_REGEX = /@.*:registry$/gi;
      module.exports = figgyPudding({
        agent: {},
        algorithms: {},
        body: {},
        ca: {},
        cache: {},
        cert: {},
        "fetch-retries": {},
        "fetch-retry-factor": {},
        "fetch-retry-maxtimeout": {},
        "fetch-retry-mintimeout": {},
        "force-auth": {},
        forceAuth: "force-auth",
        gzip: {},
        headers: {},
        "https-proxy": {},
        "ignore-body": {},
        ignoreBody: "ignore-body",
        integrity: {},
        "is-from-ci": "isFromCI",
        isFromCI: {
          default: () => "true" === process.env.CI || process.env.TDDIUM || process.env.JENKINS_URL || process.env["bamboo.buildKey"] || process.env.GO_PIPELINE_NAME
        },
        key: {},
        "local-address": {},
        log: {
          default: silentLog
        },
        "map-json": "mapJson",
        mapJSON: "mapJson",
        mapJson: {},
        "max-sockets": "maxsockets",
        maxsockets: {
          default: 12
        },
        memoize: {},
        method: {
          default: "GET"
        },
        "no-proxy": {},
        noproxy: {},
        "npm-session": "npmSession",
        npmSession: {},
        offline: {},
        otp: {},
        "prefer-offline": {},
        "prefer-online": {},
        projectScope: {},
        "project-scope": "projectScope",
        Promise: {
          default: () => Promise
        },
        proxy: {},
        query: {},
        refer: {},
        referer: "refer",
        registry: {
          default: "https://registry.npmjs.org/"
        },
        retry: {},
        scope: {},
        spec: {},
        "strict-ssl": {},
        timeout: {
          default: 0
        },
        "user-agent": {
          default: `${pkg.name}@${pkg.version}/node@${process.version}+${process.arch} (${process.platform})`
        }
      }, {
        other: key => key.match(AUTH_REGEX) || key.match(SCOPE_REGISTRY_REGEX)
      });
    },
    79729: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const url = __webpack_require__(57310);
      class HttpErrorBase extends Error {
        constructor(method, res, body, spec) {
          super(), this.headers = res.headers.raw(), this.statusCode = res.status, this.code = `E${res.status}`, 
          this.method = method, this.uri = res.url, this.body = body, this.pkgid = spec ? spec.toString() : function(href) {
            try {
              let basePath = url.parse(href).pathname.substr(1);
              if (!basePath.match(/^-/)) {
                basePath = basePath.split("/");
                var index = basePath.indexOf("_rewrite");
                return -1 === index ? index = basePath.length - 1 : index++, decodeURIComponent(basePath[index]);
              }
            } catch (_) {}
          }(res.url);
        }
      }
      module.exports.HttpErrorBase = HttpErrorBase;
      class HttpErrorGeneral extends HttpErrorBase {
        constructor(method, res, body, spec) {
          super(method, res, body, spec), this.message = `${res.status} ${res.statusText} - ${this.method.toUpperCase()} ${this.spec || this.uri}${body && body.error ? " - " + body.error : ""}`, 
          Error.captureStackTrace(this, HttpErrorGeneral);
        }
      }
      module.exports.HttpErrorGeneral = HttpErrorGeneral;
      class HttpErrorAuthOTP extends HttpErrorBase {
        constructor(method, res, body, spec) {
          super(method, res, body, spec), this.message = "OTP required for authentication", 
          this.code = "EOTP", Error.captureStackTrace(this, HttpErrorAuthOTP);
        }
      }
      module.exports.HttpErrorAuthOTP = HttpErrorAuthOTP;
      class HttpErrorAuthIPAddress extends HttpErrorBase {
        constructor(method, res, body, spec) {
          super(method, res, body, spec), this.message = "Login is not allowed from your IP address", 
          this.code = "EAUTHIP", Error.captureStackTrace(this, HttpErrorAuthIPAddress);
        }
      }
      module.exports.HttpErrorAuthIPAddress = HttpErrorAuthIPAddress;
      class HttpErrorAuthUnknown extends HttpErrorBase {
        constructor(method, res, body, spec) {
          super(method, res, body, spec), this.message = "Unable to authenticate, need: " + res.headers.get("www-authenticate"), 
          Error.captureStackTrace(this, HttpErrorAuthUnknown);
        }
      }
      module.exports.HttpErrorAuthUnknown = HttpErrorAuthUnknown;
    },
    11527: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Buffer = __webpack_require__(28618).Buffer, checkResponse = __webpack_require__(83163), config = __webpack_require__(30342), getAuth = __webpack_require__(59505), fetch = __webpack_require__(72564), JSONStream = __webpack_require__(93012), npa = __webpack_require__(19932), {PassThrough} = __webpack_require__(12781), qs = __webpack_require__(63477), url = __webpack_require__(57310), zlib = __webpack_require__(59796);
      function regFetch(uri, opts) {
        const registry = (opts = config(opts)).spec && pickRegistry(opts.spec, opts) || opts.registry || "https://registry.npmjs.org/";
        uri = url.parse(uri).protocol ? uri : `${registry.trim().replace(/\/?$/g, "")}/${uri.trim().replace(/^\//, "")}`;
        const startTime = Date.now(), headers = function(registry, uri, opts) {
          const headers = Object.assign({
            "npm-in-ci": !!(opts["is-from-ci"] || "true" === process.env.CI || process.env.TDDIUM || process.env.JENKINS_URL || process.env["bamboo.buildKey"] || process.env.GO_PIPELINE_NAME),
            "npm-scope": opts["project-scope"],
            "npm-session": opts["npm-session"],
            "user-agent": opts["user-agent"],
            referer: opts.refer
          }, opts.headers), auth = getAuth(registry, opts), shouldAuth = auth.alwaysAuth || url.parse(uri).host === url.parse(registry).host;
          if (shouldAuth && auth.token) headers.authorization = `Bearer ${auth.token}`; else if (shouldAuth && auth.username && auth.password) {
            const encoded = Buffer.from(`${auth.username}:${auth.password}`, "utf8").toString("base64");
            headers.authorization = `Basic ${encoded}`;
          } else shouldAuth && auth._auth && (headers.authorization = `Basic ${auth._auth}`);
          shouldAuth && auth.otp && (headers["npm-otp"] = auth.otp);
          return headers;
        }(registry, uri, opts);
        let body = opts.body;
        const bodyIsStream = body && "object" == typeof body && "function" == typeof body.pipe;
        if (!body || bodyIsStream || "string" == typeof body || Buffer.isBuffer(body) ? body && !headers["content-type"] && (headers["content-type"] = "application/octet-stream") : (headers["content-type"] = headers["content-type"] || "application/json", 
        body = JSON.stringify(body)), opts.gzip) if (headers["content-encoding"] = "gzip", 
        bodyIsStream) {
          const gz = zlib.createGzip();
          body.on("error", (err => gz.emit("error", err))), body = body.pipe(gz);
        } else body = new opts.Promise(((resolve, reject) => {
          zlib.gzip(body, ((err, gz) => err ? reject(err) : resolve(gz)));
        }));
        let q = opts.query;
        if (q) {
          if ("string" == typeof q) q = qs.parse(q); else if ("object" != typeof q) throw new TypeError("invalid query option, must be string or object");
          Object.keys(q).forEach((key => {
            void 0 === q[key] && delete q[key];
          }));
        }
        const parsed = url.parse(uri), query = parsed.query ? Object.assign(qs.parse(parsed.query), q || {}) : Object.keys(q || {}).length ? q : null;
        return query && ("true" === String(query.write) && "GET" === opts.method && (opts = opts.concat({
          offline: !1,
          "prefer-offline": !1,
          "prefer-online": !0
        })), parsed.search = "?" + qs.stringify(query), uri = url.format(parsed)), opts.Promise.resolve(body).then((body => fetch(uri, {
          agent: opts.agent,
          algorithms: opts.algorithms,
          body,
          cache: getCacheMode(opts),
          cacheManager: opts.cache,
          ca: opts.ca,
          cert: opts.cert,
          headers,
          integrity: opts.integrity,
          key: opts.key,
          localAddress: opts["local-address"],
          maxSockets: opts.maxsockets,
          memoize: opts.memoize,
          method: opts.method || "GET",
          noProxy: opts["no-proxy"] || opts.noproxy,
          Promise: opts.Promise,
          proxy: opts["https-proxy"] || opts.proxy,
          referer: opts.refer,
          retry: null != opts.retry ? opts.retry : {
            retries: opts["fetch-retries"],
            factor: opts["fetch-retry-factor"],
            minTimeout: opts["fetch-retry-mintimeout"],
            maxTimeout: opts["fetch-retry-maxtimeout"]
          },
          strictSSL: !!opts["strict-ssl"],
          timeout: opts.timeout
        }).then((res => checkResponse(opts.method || "GET", res, registry, startTime, opts)))));
      }
      function pickRegistry(spec, opts) {
        spec = npa(spec), opts = config(opts);
        let registry = spec.scope && opts[spec.scope.replace(/^@?/, "@") + ":registry"];
        return !registry && opts.scope && (registry = opts[opts.scope.replace(/^@?/, "@") + ":registry"]), 
        registry || (registry = opts.registry || "https://registry.npmjs.org/"), registry;
      }
      function getCacheMode(opts) {
        return opts.offline ? "only-if-cached" : opts["prefer-offline"] ? "force-cache" : opts["prefer-online"] ? "no-cache" : "default";
      }
      module.exports = regFetch, module.exports.json = function(uri, opts) {
        return regFetch(uri, opts).then((res => res.json()));
      }, module.exports.json.stream = function(uri, jsonPath, opts) {
        opts = config(opts);
        const parser = JSONStream.parse(jsonPath, opts.mapJson), pt = parser.pipe(new PassThrough({
          objectMode: !0
        }));
        return parser.on("error", (err => pt.emit("error", err))), regFetch(uri, opts).then((res => {
          res.body.on("error", (err => parser.emit("error", err))), res.body.pipe(parser);
        }), (err => pt.emit("error", err))), pt;
      }, module.exports.pickRegistry = pickRegistry;
    },
    63235: module => {
      "use strict";
      const noop = Function.prototype;
      module.exports = {
        error: noop,
        warn: noop,
        notice: noop,
        info: noop,
        verbose: noop,
        silly: noop,
        http: noop,
        pause: noop,
        resume: noop
      };
    },
    38412: (module, __unused_webpack_exports, __webpack_require__) => {
      var wrappy = __webpack_require__(68839);
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
    40107: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var os = __webpack_require__(22037);
      module.exports = "function" == typeof os.homedir ? os.homedir : function() {
        var env = process.env, home = env.HOME, user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
        return "win32" === process.platform ? env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null : "darwin" === process.platform ? home || (user ? "/Users/" + user : null) : "linux" === process.platform ? home || (0 === process.getuid() ? "/root" : user ? "/home/" + user : null) : home || null;
      };
    },
    75848: module => {
      "use strict";
      var isWindows = "win32" === process.platform, trailingSlashRe = isWindows ? /[^:]\\$/ : /.\/$/;
      module.exports = function() {
        var path;
        return path = isWindows ? process.env.TEMP || process.env.TMP || (process.env.SystemRoot || process.env.windir) + "\\temp" : process.env.TMPDIR || process.env.TMP || process.env.TEMP || "/tmp", 
        trailingSlashRe.test(path) && (path = path.slice(0, -1)), path;
      };
    },
    20396: (__unused_webpack_module, exports, __webpack_require__) => {
      var isWindows = "win32" === process.platform, exec = (__webpack_require__(71017), 
      __webpack_require__(32081).exec), osTmpdir = __webpack_require__(75848), osHomedir = __webpack_require__(40107);
      function memo(key, lookup, fallback) {
        var fell = !1, falling = !1;
        exports[key] = function(cb) {
          var val = lookup();
          return val || fell || falling || !fallback || (fell = !0, falling = !0, exec(fallback, (function(er, output, stderr) {
            falling = !1, er || (val = output.trim());
          }))), exports[key] = function(cb) {
            return cb && process.nextTick(cb.bind(null, null, val)), val;
          }, cb && !falling && process.nextTick(cb.bind(null, null, val)), val;
        };
      }
      memo("user", (function() {
        return isWindows ? process.env.USERDOMAIN + "\\" + process.env.USERNAME : process.env.USER;
      }), "whoami"), memo("prompt", (function() {
        return isWindows ? process.env.PROMPT : process.env.PS1;
      })), memo("hostname", (function() {
        return isWindows ? process.env.COMPUTERNAME : process.env.HOSTNAME;
      }), "hostname"), memo("tmpdir", (function() {
        return osTmpdir();
      })), memo("home", (function() {
        return osHomedir();
      })), memo("path", (function() {
        return (process.env.PATH || process.env.Path || process.env.path).split(isWindows ? ";" : ":");
      })), memo("editor", (function() {
        return process.env.EDITOR || process.env.VISUAL || (isWindows ? "notepad.exe" : "vi");
      })), memo("shell", (function() {
        return isWindows ? process.env.ComSpec || "cmd" : process.env.SHELL || "bash";
      }));
    },
    1393: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), extractStream = __webpack_require__(25148), fs = __webpack_require__(57147), mkdirp = BB.promisify(__webpack_require__(41718)), npa = __webpack_require__(19932), optCheck = __webpack_require__(91149), path = __webpack_require__(71017), rimraf = BB.promisify(__webpack_require__(68259)), withTarballStream = __webpack_require__(86025), inferOwner = __webpack_require__(84876), chown = BB.promisify(__webpack_require__(13159)), truncateAsync = BB.promisify(fs.truncate), readFileAsync = BB.promisify(fs.readFile), appendFileAsync = BB.promisify(fs.appendFile), selfOwner = process.getuid ? {
        uid: process.getuid(),
        gid: process.getgid()
      } : {
        uid: void 0,
        gid: void 0
      };
      module.exports = function(spec, dest, opts) {
        if (opts = optCheck(opts), "git" === (spec = npa(spec, opts.where)).type && !opts.cache) throw new TypeError("Extracting git packages requires a cache folder");
        if ("string" != typeof dest) throw new TypeError("Extract requires a destination");
        const startTime = Date.now();
        return inferOwner(dest).then((({uid, gid}) => (opts = opts.concat({
          uid,
          gid
        }), withTarballStream(spec, opts, (stream => function(spec, tarStream, dest, opts) {
          return new BB(((resolve, reject) => {
            tarStream.on("error", reject), rimraf(dest).then((() => mkdirp(dest))).then((made => {
              if (0 === selfOwner.uid && "number" == typeof selfOwner.gid && selfOwner.uid !== opts.uid && selfOwner.gid !== opts.gid) return chown(made || dest, opts.uid, opts.gid);
            })).then((() => {
              const xtractor = extractStream(spec, dest, opts);
              xtractor.on("error", reject), xtractor.on("close", resolve), tarStream.pipe(xtractor);
            })).catch(reject);
          })).catch((err => {
            throw "EINTEGRITY" === err.code && (err.message = `Verification failed while extracting ${spec}:\n${err.message}`), 
            err;
          }));
        }(spec, stream, dest, opts))).then((() => {
          if (!opts.resolved) {
            const pjson = path.join(dest, "package.json");
            return readFileAsync(pjson, "utf8").then((str => truncateAsync(pjson).then((() => appendFileAsync(pjson, str.replace(/}\s*$/, `\n,"_resolved": ${JSON.stringify(opts.resolved || "")}\n,"_integrity": ${JSON.stringify(opts.integrity || "")}\n,"_from": ${JSON.stringify(spec.toString())}\n}`))))));
          }
        })).then((() => opts.log.silly("extract", `${spec} extracted to ${dest} (${Date.now() - startTime}ms)`))))));
      };
    },
    87337: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = {
        extract: __webpack_require__(1393),
        manifest: __webpack_require__(47730),
        packument: __webpack_require__(72454),
        prefetch: __webpack_require__(61465),
        tarball: __webpack_require__(41233),
        clearMemoized: __webpack_require__(12754).clearMemoized
      };
    },
    25148: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Minipass = __webpack_require__(15465), path = __webpack_require__(71017), tar = __webpack_require__(39148);
      module.exports = function(spec, dest, opts) {
        opts = opts || {};
        const sawIgnores = new Set;
        return tar.x({
          cwd: dest,
          filter: (name, entry) => !entry.header.type.match(/^.*link$/i),
          strip: 1,
          onwarn: msg => opts.log && opts.log.warn("tar", msg),
          uid: opts.uid,
          gid: opts.gid,
          umask: opts.umask,
          transform: opts.resolved && pkgJsonTransform(spec, opts),
          onentry(entry) {
            if ("file" === entry.type.toLowerCase() ? entry.mode = computeMode(entry.mode, opts.fmode, opts.umask) : "directory" === entry.type.toLowerCase() ? entry.mode = computeMode(entry.mode, opts.dmode, opts.umask) : entry.mode = computeMode(entry.mode, 0, opts.umask), 
            "file" === entry.type.toLowerCase()) {
              const base = path.basename(entry.path);
              if (".npmignore" === base) sawIgnores.add(entry.path); else if (".gitignore" === base) {
                const npmignore = entry.path.replace(/\.gitignore$/, ".npmignore");
                sawIgnores.has(npmignore) || (entry.path = npmignore);
              }
            }
          }
        });
      }, module.exports._computeMode = computeMode;
      class Transformer extends Minipass {
        constructor(spec, opts) {
          super(), this.spec = spec, this.opts = opts, this.str = "";
        }
        write(data) {
          return this.str += data, !0;
        }
        end() {
          const replaced = this.str.replace(/}\s*$/, `\n,"_resolved": ${JSON.stringify(this.opts.resolved || "")}\n,"_integrity": ${JSON.stringify(this.opts.integrity || "")}\n,"_from": ${JSON.stringify(this.spec.toString())}\n}`);
          return super.write(replaced), super.end();
        }
      }
      function computeMode(fileMode, optMode, umask) {
        return (fileMode | optMode) & ~(umask || 0);
      }
      function pkgJsonTransform(spec, opts) {
        return entry => {
          if ("package.json" === entry.path) {
            return new Transformer(spec, opts);
          }
        };
      }
    },
    12754: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Fetcher = __webpack_require__(66940).define([ "spec", "opts", "manifest" ], {
        packument: [ "spec", "opts" ],
        manifest: [ "spec", "opts" ],
        tarball: [ "spec", "opts" ],
        fromManifest: [ "manifest", "spec", "opts" ],
        clearMemoized() {}
      }, {
        name: "Fetcher"
      });
      module.exports = Fetcher, module.exports.packument = function(spec, opts) {
        return getFetcher(spec.type).packument(spec, opts);
      }, module.exports.manifest = function(spec, opts) {
        return getFetcher(spec.type).manifest(spec, opts);
      }, module.exports.tarball = function(spec, opts) {
        return getFetcher(spec.type).tarball(spec, opts);
      }, module.exports.fromManifest = function(manifest, spec, opts) {
        return getFetcher(spec.type).fromManifest(manifest, spec, opts);
      };
      const fetchers = {};
      function getFetcher(type) {
        if (!fetchers[type]) switch (type) {
         case "alias":
          fetchers[type] = __webpack_require__(10762);
          break;

         case "directory":
          fetchers[type] = __webpack_require__(79453);
          break;

         case "file":
          fetchers[type] = __webpack_require__(74614);
          break;

         case "git":
          fetchers[type] = __webpack_require__(64515);
          break;

         case "hosted":
          fetchers[type] = __webpack_require__(93561);
          break;

         case "range":
          fetchers[type] = __webpack_require__(33737);
          break;

         case "remote":
          fetchers[type] = __webpack_require__(40111);
          break;

         case "tag":
          fetchers[type] = __webpack_require__(19655);
          break;

         case "version":
          fetchers[type] = __webpack_require__(74344);
          break;

         default:
          throw new Error(`Invalid dependency type requested: ${type}`);
        }
        return fetchers[type];
      }
      module.exports.clearMemoized = function() {
        Object.keys(fetchers).forEach((k => {
          fetchers[k].clearMemoized();
        }));
      };
    },
    10762: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Fetcher = __webpack_require__(12754), fetchRegistry = __webpack_require__(89558), fetchRemote = module.exports = Object.create(null);
      Fetcher.impl(fetchRemote, {
        packument: (spec, opts) => fetchRegistry.packument(spec.subSpec, opts),
        manifest: (spec, opts) => fetchRegistry.manifest(spec.subSpec, opts),
        tarball: (spec, opts) => fetchRegistry.tarball(spec.subSpec, opts),
        fromManifest: (manifest, spec, opts) => fetchRegistry.fromManifest(manifest, spec.subSpec, opts)
      });
    },
    79453: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), Fetcher = __webpack_require__(12754), glob = BB.promisify(__webpack_require__(34436)), packDir = __webpack_require__(74323), readJson = __webpack_require__(36837), path = __webpack_require__(71017), pipe = BB.promisify(__webpack_require__(30498).pipe), through = __webpack_require__(30498).through, normalizePackageBin = __webpack_require__(71921), readFileAsync = BB.promisify(__webpack_require__(57147).readFile), fetchDirectory = module.exports = Object.create(null);
      Fetcher.impl(fetchDirectory, {
        packument(spec, opts) {
          return this.manifest(spec, opts).then((manifest => Object.assign({}, manifest, {
            "dist-tags": {
              latest: manifest.version
            },
            time: {
              [manifest.version]: (new Date).toISOString()
            },
            versions: {
              [manifest.version]: manifest
            }
          })));
        },
        manifest(spec, opts) {
          const pkgPath = path.join(spec.fetchSpec, "package.json"), srPath = path.join(spec.fetchSpec, "npm-shrinkwrap.json");
          return BB.join(readFileAsync(pkgPath).then(readJson).catch({
            code: "ENOENT"
          }, (err => {
            throw err.code = "ENOPACKAGEJSON", err;
          })), readFileAsync(srPath).then(readJson).catch({
            code: "ENOENT"
          }, (() => null)), ((pkg, sr) => (pkg._shrinkwrap = sr, pkg._hasShrinkwrap = !!sr, 
          pkg._resolved = spec.fetchSpec, pkg._integrity = !1, pkg._shasum = !1, pkg))).then((pkg => {
            if (!pkg.bin && pkg.directories && pkg.directories.bin) {
              const dirBin = pkg.directories.bin;
              return glob(path.join(spec.fetchSpec, dirBin, "/**"), {
                nodir: !0
              }).then((matches => {
                matches.forEach((filePath => {
                  const relative = path.relative(spec.fetchSpec, filePath);
                  relative && "." !== relative[0] && (pkg.bin || (pkg.bin = {}), pkg.bin[path.basename(relative)] = relative);
                }));
              })).then((() => pkg));
            }
            return pkg;
          })).then((pkg => normalizePackageBin(pkg)));
        },
        tarball(spec, opts) {
          const stream = through();
          return this.manifest(spec, opts).then((mani => pipe(this.fromManifest(mani, spec, opts), stream))).catch((err => stream.emit("error", err))), 
          stream;
        },
        fromManifest(manifest, spec, opts) {
          const stream = through();
          return packDir(manifest, manifest._resolved, manifest._resolved, stream, opts).catch((err => {
            stream.emit("error", err);
          })), stream;
        }
      });
    },
    74614: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cacache = __webpack_require__(99269), Fetcher = __webpack_require__(12754), fs = __webpack_require__(57147), pipe = BB.promisify(__webpack_require__(30498).pipe), through = __webpack_require__(30498).through, readFileAsync = BB.promisify(fs.readFile), statAsync = BB.promisify(fs.stat), fetchFile = module.exports = Object.create(null);
      Fetcher.impl(fetchFile, {
        packument: (spec, opts) => BB.reject(new Error("Not implemented yet")),
        manifest: (spec, opts) => BB.resolve(null),
        tarball(spec, opts) {
          const src = spec._resolved || spec.fetchSpec, stream = through();
          return statAsync(src).then((stat => {
            if (spec._resolved && stream.emit("manifest", spec), stat.size <= 2097152) return readFileAsync(src).then((data => opts.cache ? cacache.put(opts.cache, `pacote:tarball:file:${src}`, data, {
              integrity: opts.integrity
            }).then((integrity => ({
              data,
              integrity
            }))) : {
              data
            })).then((info => {
              info.integrity && stream.emit("integrity", info.integrity), stream.write(info.data, (() => {
                stream.end();
              }));
            }));
            {
              let integrity;
              return (opts.cache ? pipe(fs.createReadStream(src), cacache.put.stream(opts.cache, `pacote:tarball:${src}`, {
                integrity: opts.integrity
              }).on("integrity", (d => {
                integrity = d;
              }))) : BB.resolve(null)).then((() => (integrity && stream.emit("integrity", integrity), 
              pipe(fs.createReadStream(src), stream))));
            }
          })).catch((err => stream.emit("error", err))), stream;
        },
        fromManifest(manifest, spec, opts) {
          return this.tarball(manifest || spec, opts);
        }
      });
    },
    64515: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cacache = __webpack_require__(99269), cacheKey = __webpack_require__(6856), Fetcher = __webpack_require__(12754), git = __webpack_require__(69631), mkdirp = BB.promisify(__webpack_require__(41718)), pickManifest = __webpack_require__(90346), optCheck = __webpack_require__(91149), osenv = __webpack_require__(20396), packDir = __webpack_require__(74323), PassThrough = __webpack_require__(12781).PassThrough, path = __webpack_require__(71017), pipe = BB.promisify(__webpack_require__(30498).pipe), rimraf = BB.promisify(__webpack_require__(68259)), uniqueFilename = __webpack_require__(16003), fetchGit = module.exports = Object.create(null);
      function plainManifest(repo, spec, opts) {
        const rawRef = spec.gitCommittish || spec.gitRange;
        return function(url, spec, name, opts) {
          const isSemver = !!spec.gitRange;
          return git.revs(url, opts).then((remoteRefs => isSemver ? pickManifest({
            versions: remoteRefs.versions,
            "dist-tags": remoteRefs["dist-tags"],
            name
          }, spec.gitRange, opts) : remoteRefs ? BB.resolve(remoteRefs.refs[spec.gitCommittish] || remoteRefs.refs[remoteRefs.shas[spec.gitCommittish]]) : null));
        }(repo, spec, spec.name, opts).then((ref => {
          if (ref) {
            const resolved = spec.saveSpec.replace(/(?:#.*)?$/, `#${ref.sha}`);
            return {
              _repo: repo,
              _resolved: resolved,
              _spec: spec,
              _ref: ref,
              _rawRef: spec.gitCommittish || spec.gitRange,
              _uniqueResolved: resolved,
              _integrity: !1,
              _shasum: !1
            };
          }
          {
            const resolved = spec.saveSpec.replace(/(?:#.*)?$/, rawRef ? `#${rawRef}` : "");
            return {
              _repo: repo,
              _rawRef: rawRef,
              _resolved: rawRef && rawRef.match(/^[a-f0-9]{40}$/) && resolved,
              _uniqueResolved: rawRef && rawRef.match(/^[a-f0-9]{40}$/) && resolved,
              _integrity: !1,
              _shasum: !1
            };
          }
        }));
      }
      Fetcher.impl(fetchGit, {
        packument: (spec, opts) => BB.reject(new Error("Not implemented yet.")),
        manifest: (spec, opts) => (opts = optCheck(opts), spec.hosted && "shortcut" === spec.hosted.getDefaultRepresentation() ? function(spec, opts) {
          return BB.resolve(null).then((() => {
            if (!spec.hosted.git()) throw new Error(`No git url for ${spec}`);
            return plainManifest(spec.hosted.git(), spec, opts);
          })).catch((err => {
            if (!spec.hosted.https()) throw err;
            return plainManifest(spec.hosted.https(), spec, opts);
          })).catch((err => {
            if (!spec.hosted.sshurl()) throw err;
            return plainManifest(spec.hosted.sshurl(), spec, opts);
          }));
        }(spec, opts) : plainManifest(spec.fetchSpec, spec, opts)),
        tarball(spec, opts) {
          opts = optCheck(opts);
          const stream = new PassThrough;
          return this.manifest(spec, opts).then((manifest => (stream.emit("manifest", manifest), 
          pipe(this.fromManifest(manifest, spec, opts).on("integrity", (i => stream.emit("integrity", i))), stream)))).catch((err => stream.emit("error", err))), 
          stream;
        },
        fromManifest(manifest, spec, opts) {
          let streamError;
          opts = optCheck(opts);
          const stream = (new PassThrough).on("error", (e => {
            streamError = e;
          })), cacheName = manifest._uniqueResolved || manifest._resolved || "", cacheStream = opts.cache && cacache.get.stream(opts.cache, cacheKey("packed-dir", cacheName), opts).on("integrity", (i => stream.emit("integrity", i)));
          return cacheStream.pipe(stream), cacheStream.on("error", (err => "ENOENT" !== err.code ? stream.emit("error", err) : (stream.emit("reset"), 
          function(opts, cb) {
            if (opts.cache) return cacache.tmp.withTmp(opts.cache, {
              tmpPrefix: "git-clone"
            }, cb);
            {
              const tmpDir = path.join(osenv.tmpdir(), "pacote-git-tmp"), tmpName = uniqueFilename(tmpDir, "git-clone"), tmp = mkdirp(tmpName).then((() => tmpName)).disposer(rimraf);
              return BB.using(tmp, cb);
            }
          }(opts, (tmp => {
            if (streamError) throw streamError;
            return function(spec, repo, resolvedRef, rawRef, tmp, opts) {
              const ref = resolvedRef ? resolvedRef.ref : rawRef;
              return resolvedRef && spec.hosted && SHALLOW_HOSTS.has(spec.hosted.type) ? git.shallow(repo, ref, tmp, opts) : git.clone(repo, ref, tmp, opts);
            }(spec, manifest._repo, manifest._ref, manifest._rawRef, tmp, opts).then((HEAD => {
              if (streamError) throw streamError;
              return manifest._resolved = spec.saveSpec.replace(/(:?#.*)?$/, `#${HEAD}`), manifest._uniqueResolved = manifest._resolved, 
              packDir(manifest, manifest._uniqueResolved, tmp, stream, opts);
            }));
          })).catch((err => stream.emit("error", err)))))), stream;
        }
      });
      const SHALLOW_HOSTS = new Set([ "github", "gist", "gitlab", "bitbucket" ]);
    },
    93561: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(64515);
    },
    33737: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(89558);
    },
    89558: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const cacache = __webpack_require__(99269), Fetcher = __webpack_require__(12754), regManifest = __webpack_require__(82526), regPackument = __webpack_require__(72539), regTarball = __webpack_require__(63014), fetchRegistry = module.exports = Object.create(null);
      Fetcher.impl(fetchRegistry, {
        packument: (spec, opts) => regPackument(spec, opts),
        manifest: (spec, opts) => regManifest(spec, opts),
        tarball: (spec, opts) => regTarball(spec, opts),
        fromManifest: (manifest, spec, opts) => regTarball.fromManifest(manifest, spec, opts),
        clearMemoized() {
          cacache.clearMemoized(), regPackument.clearMemoized();
        }
      });
    },
    82526: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fetch = __webpack_require__(11527), fetchPackument = __webpack_require__(72539), optCheck = __webpack_require__(91149), pickManifest = __webpack_require__(90346), ssri = __webpack_require__(87783);
      module.exports = function(spec, opts) {
        return opts = optCheck(opts), function(spec, opts) {
          return opts = opts.concat({
            fullMetadata: !!opts.enjoyBy || opts.fullMetadata
          }), fetchPackument(spec, opts).then((packument => {
            try {
              return pickManifest(packument, spec.fetchSpec, {
                defaultTag: opts.defaultTag,
                enjoyBy: opts.enjoyBy,
                includeDeprecated: opts.includeDeprecated
              });
            } catch (err) {
              if ("ETARGET" !== err.code && "E403" !== err.code || !packument._cached || opts.offline) throw err;
              return opts.log.silly("registry:manifest", `no matching version for ${spec.name}@${spec.fetchSpec} in the cache. Forcing revalidation.`), 
              opts = opts.concat({
                preferOffline: !1,
                preferOnline: !0
              }), fetchPackument(spec, opts.concat({
                fullMetadata: !0
              })).then((packument => pickManifest(packument, spec.fetchSpec, {
                defaultTag: opts.defaultTag,
                enjoyBy: opts.enjoyBy
              })));
            }
          }));
        }(spec, opts).then((manifest => function(spec, manifest, opts) {
          const shasum = manifest.dist && manifest.dist.shasum;
          manifest._integrity = manifest.dist && manifest.dist.integrity, manifest._shasum = shasum, 
          !manifest._integrity && shasum && (manifest._integrity = ssri.fromHex(shasum, "sha1").toString());
          if (manifest._resolved = manifest.dist && manifest.dist.tarball, !manifest._resolved) {
            const registry = fetch.pickRegistry(spec, opts), uri = registry.replace(/\/?$/, "/") + spec.escapedName, err = new Error(`Manifest for ${manifest.name}@${manifest.version} from ${uri} is missing a tarball url (pkg.dist.tarball). Guessing a default.`);
            err.code = "ENOTARBALL", err.manifest = manifest, manifest._warnings || (manifest._warnings = []), 
            manifest._warnings.push(err.message), manifest._resolved = `${registry}/${manifest.name}/-/${manifest.name}-${manifest.version}.tgz`;
          }
          return manifest;
        }(spec, manifest, opts)));
      };
    },
    72539: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), fetch = __webpack_require__(11527), LRU = __webpack_require__(36941), optCheck = __webpack_require__(91149);
      module.exports = function(spec, opts) {
        opts = optCheck(opts);
        const registry = fetch.pickRegistry(spec, opts);
        return fetchPackument(registry.replace(/\/?$/, "/") + spec.escapedName, registry, spec, opts);
      };
      const MEMO = new LRU({
        length: m => m._contentLength,
        max: 209715200,
        maxAge: 3e4
      });
      function fetchPackument(uri, registry, spec, opts) {
        const mem = pickMem(opts), accept = opts.fullMetadata ? "application/json" : "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*", memoKey = `${uri}~(${accept})`;
        return mem && !opts.preferOnline && mem.has(memoKey) ? BB.resolve(mem.get(memoKey)) : fetch(uri, opts.concat({
          headers: {
            "pacote-req-type": "packument",
            "pacote-pkg-id": `registry:${spec.name}`,
            accept
          },
          spec
        }, opts, {
          integrity: null
        })).then((res => res.json().then((packument => {
          packument._cached = res.headers.has("x-local-cache"), packument._contentLength = +res.headers.get("content-length");
          const mem = pickMem(opts);
          return mem && mem.set(memoKey, packument), packument;
        })))).catch((err => {
          if ("E404" !== err.code || opts.fullMetadata) throw err;
          return fetchPackument(uri, registry, spec, opts.concat({
            fullMetadata: !0
          }));
        }));
      }
      module.exports.clearMemoized = function() {
        MEMO.reset();
      };
      const PROX = new class {
        get(key) {
          return this.obj[key];
        }
        set(key, val) {
          this.obj[key] = val;
        }
      };
      function pickMem(opts) {
        return opts && opts.memoize ? opts.memoize.get && opts.memoize.set ? opts.memoize : "object" == typeof opts.memoize ? (PROX.obj = opts.memoize, 
        PROX) : null : MEMO;
      }
    },
    63014: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), fetch = __webpack_require__(11527), manifest = __webpack_require__(82526), optCheck = __webpack_require__(91149), PassThrough = __webpack_require__(12781).PassThrough, ssri = __webpack_require__(87783), url = __webpack_require__(57310);
      function fromManifest(manifest, spec, opts) {
        opts = optCheck(opts), spec.scope && (opts = opts.concat({
          scope: spec.scope
        }));
        const stream = new PassThrough, uri = function(spec, registry, mani, opts) {
          const reg = url.parse(registry), tarball = url.parse(mani._resolved);
          reg.hostname === tarball.hostname && reg.protocol !== tarball.protocol && (tarball.protocol = reg.protocol, 
          reg.port !== tarball.port && (delete tarball.host, tarball.port = reg.port), delete tarball.href);
          return url.format(tarball);
        }(0, fetch.pickRegistry(spec, opts), manifest);
        return fetch(uri, opts.concat({
          headers: {
            "pacote-req-type": "tarball",
            "pacote-pkg-id": `registry:${manifest.name}@${uri}`
          },
          integrity: manifest._integrity,
          algorithms: [ manifest._integrity ? ssri.parse(manifest._integrity).pickAlgorithm() : "sha1" ],
          spec
        }, opts)).then((res => {
          const hash = res.headers.get("x-local-cache-hash");
          return hash && stream.emit("integrity", decodeURIComponent(hash)), res.body.on("error", (err => stream.emit("error", err))), 
          res.body.pipe(stream), null;
        })).catch((err => stream.emit("error", err))), stream;
      }
      module.exports = function(spec, opts) {
        opts = optCheck(opts);
        const registry = fetch.pickRegistry(spec, opts), stream = new PassThrough;
        let mani;
        mani = opts.resolved && 0 === opts.resolved.indexOf(registry) ? BB.resolve({
          name: spec.name,
          version: spec.fetchSpec,
          _integrity: opts.integrity,
          _resolved: opts.resolved,
          _fakeChild: !0
        }) : manifest(spec, opts);
        return mani.then((mani => {
          !mani._fakeChild && stream.emit("manifest", mani);
          const fetchStream = fromManifest(mani, spec, opts).on("integrity", (i => stream.emit("integrity", i)));
          return fetchStream.on("error", (err => stream.emit("error", err))), fetchStream.pipe(stream), 
          null;
        })).catch((err => stream.emit("error", err))), stream;
      }, module.exports.fromManifest = fromManifest;
    },
    40111: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), Fetcher = __webpack_require__(12754), fetchRegistry = __webpack_require__(89558), fetchRemote = module.exports = Object.create(null);
      Fetcher.impl(fetchRemote, {
        packument: (spec, opts) => BB.reject(new Error("Not implemented yet")),
        manifest: (spec, opts) => BB.resolve(null),
        tarball(spec, opts) {
          const uri = spec._resolved || spec.fetchSpec;
          return fetchRegistry.fromManifest({
            _resolved: uri,
            _integrity: opts.integrity
          }, spec, opts);
        },
        fromManifest(manifest, spec, opts) {
          return this.tarball(manifest || spec, opts);
        }
      });
    },
    19655: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(89558);
    },
    74344: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(89558);
    },
    28199: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cacache = __webpack_require__(99269), cacheKey = __webpack_require__(6856), fetchFromManifest = __webpack_require__(12754).fromManifest, finished = __webpack_require__(8332), minimatch = __webpack_require__(42244), normalize = __webpack_require__(17770), optCheck = __webpack_require__(91149), path = __webpack_require__(71017), pipe = BB.promisify(__webpack_require__(30498).pipe), ssri = __webpack_require__(87783), tar = __webpack_require__(39148), readJson = __webpack_require__(36837), normalizePackageBin = __webpack_require__(71921);
      function Manifest(pkg, fromTarball, fullMetadata) {
        fromTarball = fromTarball || {}, fullMetadata && Object.assign(this, pkg), this.name = pkg.name, 
        this.version = pkg.version, this.engines = pkg.engines || fromTarball.engines, this.cpu = pkg.cpu || fromTarball.cpu, 
        this.os = pkg.os || fromTarball.os, this.dependencies = pkg.dependencies || {}, 
        this.optionalDependencies = pkg.optionalDependencies || {}, this.peerDependenciesMeta = pkg.peerDependenciesMeta || {}, 
        this.devDependencies = pkg.devDependencies || {};
        const bundled = pkg.bundledDependencies || pkg.bundleDependencies || !1;
        this.bundleDependencies = bundled, this.peerDependencies = pkg.peerDependencies || {}, 
        this.deprecated = pkg.deprecated || !1, this._resolved = pkg._resolved, this._integrity = pkg._integrity || fromTarball._integrity || null, 
        this._shasum = pkg._shasum || fromTarball._shasum || null, this._shrinkwrap = pkg._shrinkwrap || fromTarball._shrinkwrap || null, 
        this.bin = pkg.bin || fromTarball.bin || null, normalizePackageBin(this), this._id = null, 
        normalize(this), delete this.readme;
      }
      function jsonFromStream(filename, dataStream) {
        return BB.fromNode((cb => {
          dataStream.on("error", cb), dataStream.on("close", cb), dataStream.on("entry", (entry => {
            if (entry.header.path.replace(/[^/]+\//, "") !== filename) entry.resume(); else {
              let data = "";
              entry.on("error", cb), finished(entry).then((() => {
                try {
                  cb(null, readJson(data));
                } catch (err) {
                  cb(err);
                }
              }), (err => {
                cb(err);
              })), entry.on("data", (d => {
                data += d;
              }));
            }
          }));
        }));
      }
      function finalKey(pkg, spec) {
        return pkg && pkg._uniqueResolved ? cacheKey(`${spec.type}-manifest`, pkg._uniqueResolved) : pkg && pkg._integrity && cacheKey(`${spec.type}-manifest`, `${pkg._resolved}:${ssri.stringify(pkg._integrity)}`);
      }
      module.exports = function(pkg, spec, opts) {
        const key = finalKey(pkg, spec);
        opts = optCheck(opts);
        return (!opts.cache || !key || opts.preferOnline || opts.fullMetadata || opts.enjoyBy ? BB.resolve(null) : cacache.get.info(opts.cache, key, opts)).then((cached => cached && cached.metadata && cached.metadata.manifest ? new Manifest(cached.metadata.manifest) : function(pkg, spec, opts) {
          const needsShrinkwrap = !pkg || !1 !== pkg._hasShrinkwrap && !pkg._shrinkwrap, needsBin = !(pkg && (pkg.bin || !pkg.directories || !pkg.directories.bin)), needsIntegrity = !pkg || !pkg._integrity && !1 !== pkg._integrity, needsShasum = !pkg || !pkg._shasum && !1 !== pkg._shasum, needsHash = needsIntegrity || needsShasum, needsManifest = !pkg || !pkg.name, needsExtract = needsShrinkwrap || needsBin || needsManifest;
          if (needsShrinkwrap || needsBin || needsHash || needsManifest) {
            opts = optCheck(opts);
            const tarStream = fetchFromManifest(pkg, spec, opts), extracted = needsExtract && new tar.Parse;
            return BB.join(needsShrinkwrap && jsonFromStream("npm-shrinkwrap.json", extracted), needsManifest && jsonFromStream("package.json", extracted), needsBin && (dataStream = extracted, 
            BB.fromNode((cb => {
              let paths = [];
              dataStream.on("error", cb), dataStream.on("close", (() => cb(null, paths))), dataStream.on("entry", (function(entry) {
                const filePath = entry.header.path.replace(/[^/]+\//, "");
                entry.resume(), paths.push(filePath);
              }));
            }))), needsHash && ssri.fromStream(tarStream, {
              algorithms: [ "sha1", "sha512" ]
            }), needsExtract && pipe(tarStream, extracted), ((sr, mani, paths, hash) => {
              if (needsManifest && !mani) {
                const err = new Error(`Non-registry package missing package.json: ${spec}.`);
                throw err.code = "ENOPACKAGEJSON", err;
              }
              const extraProps = mani || {};
              if (delete extraProps._resolved, tarStream.resume(), paths && paths.length) {
                const dirBin = mani ? mani && mani.directories && mani.directories.bin : pkg && pkg.directories && pkg.directories.bin;
                dirBin && (extraProps.bin = {}, paths.forEach((filePath => {
                  if (minimatch(filePath, dirBin + "/**")) {
                    const relative = path.relative(dirBin, filePath);
                    relative && "." !== relative[0] && (extraProps.bin[path.basename(relative)] = path.join(dirBin, relative));
                  }
                })));
              }
              return Object.assign(extraProps, {
                _shrinkwrap: sr,
                _resolved: mani && mani._resolved || pkg && pkg._resolved || spec.fetchSpec,
                _integrity: needsIntegrity && hash && hash.sha512 && hash.sha512[0].toString(),
                _shasum: needsShasum && hash && hash.sha1 && hash.sha1[0].hexDigest()
              });
            }));
          }
          return BB.resolve({});
          var dataStream;
        }(pkg, spec, opts).then((props => pkg && pkg.name ? new Manifest(pkg, props, opts.fullMetadata) : new Manifest(props, null, opts.fullMetadata))).then((manifest => {
          const cacheKey = key || finalKey(manifest, spec);
          return opts.cache && cacheKey ? cacache.put(opts.cache, cacheKey, ".", {
            metadata: {
              id: manifest._id,
              manifest,
              type: "finalized-manifest"
            }
          }).then((() => manifest)) : manifest;
        }))));
      }, module.exports.Manifest = Manifest;
    },
    6856: module => {
      "use strict";
      module.exports = function(type, identifier) {
        return [ "pacote", type, identifier ].join(":");
      };
    },
    8332: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142);
      module.exports = function(child, hasExitCode = !1) {
        return BB.fromNode((function(cb) {
          child.on("error", cb), child.on(hasExitCode ? "close" : "end", (function(exitCode) {
            if (void 0 === exitCode || 0 === exitCode) cb(); else {
              let err = new Error("exited with error code: " + exitCode);
              cb(err);
            }
          }));
        }));
      };
    },
    69631: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cp = __webpack_require__(32081), execFileAsync = BB.promisify(cp.execFile, {
        multiArgs: !0
      }), finished = __webpack_require__(8332), LRU = __webpack_require__(36941), optCheck = __webpack_require__(91149), osenv = __webpack_require__(20396), path = __webpack_require__(71017), pinflight = __webpack_require__(10978), promiseRetry = __webpack_require__(49776), uniqueFilename = __webpack_require__(16003), which = BB.promisify(__webpack_require__(7017)), semver = __webpack_require__(73107), inferOwner = __webpack_require__(84876), GOOD_ENV_VARS = new Set([ "GIT_ASKPASS", "GIT_EXEC_PATH", "GIT_PROXY_COMMAND", "GIT_SSH", "GIT_SSH_COMMAND", "GIT_SSL_CAINFO", "GIT_SSL_NO_VERIFY" ]), GIT_TRANSIENT_ERRORS = [ "remote error: Internal Server Error", "The remote end hung up unexpectedly", "Connection timed out", "Operation timed out", "Failed to connect to .* Timed out", "Connection reset by peer", "SSL_ERROR_SYSCALL", "The requested URL returned error: 503" ].join("|"), GIT_TRANSIENT_ERROR_RE = new RegExp(GIT_TRANSIENT_ERRORS);
      function shouldRetry(error, number) {
        return GIT_TRANSIENT_ERROR_RE.test(error) && number < 3;
      }
      let GITENV, GITPATH;
      function gitEnv() {
        if (GITENV) return GITENV;
        const tmpDir = path.join(osenv.tmpdir(), "pacote-git-template-tmp"), tmpName = uniqueFilename(tmpDir, "git-clone");
        return GITENV = {
          GIT_ASKPASS: "echo",
          GIT_TEMPLATE_DIR: tmpName
        }, Object.keys(process.env).forEach((k => {
          !GOOD_ENV_VARS.has(k) && k.startsWith("GIT_") || (GITENV[k] = process.env[k]);
        })), GITENV;
      }
      try {
        GITPATH = which.sync("git");
      } catch (e) {}
      function updateSubmodules(localRepo, opts) {
        return execGit([ "submodule", "update", "-q", "--init", "--recursive" ], {
          cwd: localRepo
        }, opts);
      }
      function headSha(repo, opts) {
        return execGit([ "rev-parse", "--revs-only", "HEAD" ], {
          cwd: repo
        }, opts = optCheck(opts)).spread((stdout => stdout.trim()));
      }
      module.exports.clone = function(repo, committish, target, opts) {
        opts = optCheck(opts);
        const gitArgs = [ "clone", "--mirror", "-q", repo, path.join(target, ".git") ];
        "win32" === process.platform && gitArgs.push("--config", "core.longpaths=true");
        return execGit(gitArgs, {
          cwd: target
        }, opts).then((() => execGit([ "init" ], {
          cwd: target
        }, opts))).then((() => execGit([ "checkout", committish || "HEAD" ], {
          cwd: target
        }, opts))).then((() => updateSubmodules(target, opts))).then((() => headSha(target, opts)));
      }, module.exports.shallow = function(repo, branch, target, opts) {
        opts = optCheck(opts);
        const gitArgs = [ "clone", "--depth=1", "-q" ];
        branch && gitArgs.push("-b", branch);
        gitArgs.push(repo, target), "win32" === process.platform && gitArgs.push("--config", "core.longpaths=true");
        return execGit(gitArgs, {
          cwd: target
        }, opts).then((() => updateSubmodules(target, opts))).then((() => headSha(target, opts)));
      };
      const REVS = new LRU({
        max: 100,
        maxAge: 3e5
      });
      function cwdOwner(gitOpts, opts) {
        return process.getuid && 0 === process.getuid() && gitOpts.cwd ? BB.resolve(inferOwner(gitOpts.cwd).then((owner => {
          gitOpts.uid = owner.uid, gitOpts.gid = owner.gid;
        }))) : Promise.resolve();
      }
      function execGit(gitArgs, gitOpts, opts) {
        return opts = optCheck(opts), BB.resolve(cwdOwner(gitOpts).then((() => checkGit(opts).then((gitPath => promiseRetry(((retry, number) => (1 !== number && opts.log.silly("pacote", "Retrying git command: " + gitArgs.join(" ") + " attempt # " + number), 
        execFileAsync(gitPath, gitArgs, mkOpts(gitOpts, opts)).catch((err => {
          if (!shouldRetry(err, number)) throw err;
          retry(err);
        })))), null != opts.retry ? opts.retry : {
          retries: opts["fetch-retries"],
          factor: opts["fetch-retry-factor"],
          maxTimeout: opts["fetch-retry-maxtimeout"],
          minTimeout: opts["fetch-retry-mintimeout"]
        }))))));
      }
      function spawnGit(gitArgs, gitOpts, opts) {
        return opts = optCheck(opts), BB.resolve(cwdOwner(gitOpts).then((() => checkGit(opts).then((gitPath => promiseRetry(((retry, number) => {
          1 !== number && opts.log.silly("pacote", "Retrying git command: " + gitArgs.join(" ") + " attempt # " + number);
          const child = cp.spawn(gitPath, gitArgs, mkOpts(gitOpts, opts));
          let stdout = "", stderr = "";
          return child.stdout.on("data", (d => {
            stdout += d;
          })), child.stderr.on("data", (d => {
            stderr += d;
          })), finished(child, !0).catch((err => {
            if (!shouldRetry(stderr, number)) throw err.stderr = stderr, err;
            retry(err);
          })).then((() => stdout));
        }), opts.retry))))));
      }
      function mkOpts(_gitOpts, opts) {
        const gitOpts = {
          env: gitEnv()
        }, isRoot = process.getuid && 0 === process.getuid();
        return +opts.uid && !isNaN(opts.uid) && isRoot && (gitOpts.uid = +opts.uid), +opts.gid && !isNaN(opts.gid) && isRoot && (gitOpts.gid = +opts.gid), 
        Object.assign(gitOpts, _gitOpts), gitOpts;
      }
      function checkGit(opts) {
        if (opts.git) return BB.resolve(opts.git);
        if (GITPATH) return BB.resolve(GITPATH);
        {
          const err = new Error("No git binary found in $PATH");
          return err.code = "ENOGIT", BB.reject(err);
        }
      }
      module.exports.revs = function(repo, opts) {
        opts = optCheck(opts);
        const cached = REVS.get(repo);
        if (cached) return BB.resolve(cached);
        return pinflight(`ls-remote:${repo}`, (() => spawnGit([ "ls-remote", "-h", "-t", repo ], {
          env: gitEnv()
        }, opts).then((stdout => stdout.split("\n").reduce(((revs, line) => {
          const split = line.split(/\s+/, 2);
          if (split.length < 2) return revs;
          const sha = split[0].trim(), ref = split[1].trim().match(/(?:refs\/[^/]+\/)?(.*)/)[1];
          if (!ref) return revs;
          if (ref.endsWith("^{}")) return revs;
          const type = function(ref) {
            return -1 !== ref.indexOf("refs/tags/") ? "tag" : -1 !== ref.indexOf("refs/heads/") ? "branch" : ref.endsWith("HEAD") ? "head" : "other";
          }(line), doc = {
            sha,
            ref,
            type
          };
          if (revs.refs[ref] = doc, revs.shas[sha] ? revs.shas[sha].push(ref) : revs.shas[sha] = [ ref ], 
          "tag" === type) {
            const match = ref.match(/v?(\d+\.\d+\.\d+(?:[-+].+)?)$/);
            match && semver.valid(match[1], !0) && (revs.versions[semver.clean(match[1], !0)] = doc);
          }
          return revs;
        }), {
          versions: {},
          "dist-tags": {},
          refs: {},
          shas: {}
        })), (err => {
          throw err.message = `Error while executing:\n${GITPATH} ls-remote -h -t ${repo}\n\n${err.stderr}\n${err.message}`, 
          err;
        })).then((revs => {
          if (revs.refs.HEAD) {
            const HEAD = revs.refs.HEAD;
            Object.keys(revs.versions).forEach((v => {
              v.sha === HEAD.sha && (revs["dist-tags"].HEAD = v, revs.refs.latest || (revs["dist-tags"].latest = revs.refs.HEAD));
            }));
          }
          return REVS.set(repo, revs), revs;
        }))));
      }, module.exports._cwdOwner = cwdOwner, module.exports._exec = execGit, module.exports._spawn = spawnGit, 
      module.exports._mkOpts = mkOpts;
    },
    91149: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const figgyPudding = __webpack_require__(55212), logger = __webpack_require__(15095), AUTH_REGEX = /^(?:.*:)?(token|_authToken|username|_password|password|email|always-auth|_auth|otp)$/, SCOPE_REGISTRY_REGEX = /@.*:registry$/gi;
      module.exports = figgyPudding({
        annotate: {},
        cache: {},
        defaultTag: "tag",
        dirPacker: {},
        dmode: {},
        "enjoy-by": "enjoyBy",
        enjoyBy: {},
        before: "enjoyBy",
        fmode: {},
        "fetch-retries": {
          default: 2
        },
        "fetch-retry-factor": {
          default: 10
        },
        "fetch-retry-maxtimeout": {
          default: 6e4
        },
        "fetch-retry-mintimeout": {
          default: 1e4
        },
        fullMetadata: "full-metadata",
        "full-metadata": {
          default: !1
        },
        gid: {},
        git: {},
        includeDeprecated: {
          default: !0
        },
        "include-deprecated": "includeDeprecated",
        integrity: {},
        log: {
          default: logger
        },
        memoize: {},
        offline: {},
        preferOffline: "prefer-offline",
        "prefer-offline": {},
        preferOnline: "prefer-online",
        "prefer-online": {},
        registry: {
          default: "https://registry.npmjs.org/"
        },
        resolved: {},
        retry: {},
        scope: {},
        tag: {
          default: "latest"
        },
        uid: {},
        umask: {},
        where: {}
      }, {
        other: key => key.match(AUTH_REGEX) || key.match(SCOPE_REGISTRY_REGEX)
      });
    },
    74323: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cacache = __webpack_require__(99269), cacheKey = __webpack_require__(6856), optCheck = __webpack_require__(91149), packlist = __webpack_require__(68749), pipe = BB.promisify(__webpack_require__(30498).pipe), tar = __webpack_require__(39148);
      module.exports = function(manifest, label, dir, target, opts) {
        const packer = (opts = optCheck(opts)).dirPacker ? BB.resolve(opts.dirPacker(manifest, dir)) : function(dir) {
          return packlist({
            path: dir
          }).then((files => tar.c({
            cwd: dir,
            gzip: !0,
            portable: !0,
            prefix: "package/"
          }, files)));
        }(dir);
        if (opts.cache) {
          const cacher = cacache.put.stream(opts.cache, cacheKey("packed-dir", label), opts).on("integrity", (i => {
            target.emit("integrity", i);
          }));
          return packer.then((packer => BB.all([ pipe(packer, cacher), pipe(packer, target) ])));
        }
        return packer.then((packer => pipe(packer, target)));
      };
    },
    15095: module => {
      "use strict";
      const LEVELS = [ "notice", "error", "warn", "info", "verbose", "http", "silly", "pause", "resume" ], logger = {};
      for (const level of LEVELS) logger[level] = log(level);
      function log(level) {
        return (category, ...args) => process.emit("log", level, category, ...args);
      }
      module.exports = logger;
    },
    36837: module => {
      "use strict";
      module.exports = function(content) {
        return JSON.parse(function(content) {
          return 65279 === (content = content.toString()).charCodeAt(0) ? content.slice(1) : content;
        }(content));
      };
    },
    86025: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cacache = __webpack_require__(99269), fetch = __webpack_require__(12754), fs = __webpack_require__(57147), npa = __webpack_require__(19932), optCheck = __webpack_require__(91149), path = __webpack_require__(71017), ssri = __webpack_require__(87783), retry = __webpack_require__(49776), statAsync = BB.promisify(fs.stat), RETRIABLE_ERRORS = new Set([ "ENOENT", "EINTEGRITY", "Z_DATA_ERROR" ]);
      function cleanUpCached(cachePath, integrity, opts) {
        return cacache.rm.content(cachePath, integrity, opts);
      }
      module.exports = function(spec, opts, streamHandler) {
        opts = optCheck(opts), spec = npa(spec, opts.where);
        const tryDigest = (!opts.preferOnline && opts.integrity && opts.resolved && opts.resolved.startsWith("file:") ? BB.try((() => {
          opts.log.silly("pacote", `trying ${spec} by local file: ${opts.resolved}`);
          const file = path.resolve(opts.where || ".", opts.resolved.substr(5));
          return statAsync(file).then((() => {
            const verifier = ssri.integrityStream({
              integrity: opts.integrity
            }), stream = fs.createReadStream(file).on("error", (err => verifier.emit("error", err))).pipe(verifier);
            return streamHandler(stream);
          })).catch((err => {
            throw "EINTEGRITY" === err.code && (opts.log.warn("pacote", `EINTEGRITY while extracting ${spec} from ${file}.You will have to recreate the file.`), 
            opts.log.verbose("pacote", `EINTEGRITY for ${spec}: ${err.message}`)), err;
          }));
        })) : BB.reject(Object.assign(new Error("no file!"), {
          code: "ENOENT"
        }))).catch((err => {
          if (!opts.preferOnline && opts.cache && opts.integrity && RETRIABLE_ERRORS.has(err.code)) {
            opts.log.silly("tarball", `trying ${spec} by hash: ${opts.integrity}`);
            const stream = cacache.get.stream.byDigest(opts.cache, opts.integrity, opts);
            return stream.once("error", (err => stream.on("newListener", ((ev, l) => {
              "error" === ev && l(err);
            })))), streamHandler(stream).catch((err => {
              if ("EINTEGRITY" === err.code || "Z_DATA_ERROR" === err.code) return opts.log.warn("tarball", `cached data for ${spec} (${opts.integrity}) seems to be corrupted. Refreshing cache.`), 
              cleanUpCached(opts.cache, opts.integrity, opts).then((() => {
                throw err;
              }));
              throw err;
            }));
          }
          throw err;
        }));
        return tryDigest.catch((err => {
          if (RETRIABLE_ERRORS.has(err.code)) return opts.log.silly("tarball", `no local data for ${spec}. Extracting by manifest.`), 
          BB.resolve(retry(((tryAgain, attemptNum) => {
            const tardata = fetch.tarball(spec, opts);
            return opts.resolved || (tardata.on("manifest", (m => {
              opts = opts.concat({
                resolved: m._resolved
              });
            })), tardata.on("integrity", (i => {
              opts = opts.concat({
                integrity: i
              });
            }))), BB.try((() => streamHandler(tardata))).catch((err => {
              if (opts.cache && err.code && !String(err.code).match(/^E\d{3}$/)) return "EINTEGRITY" !== err.code && "Z_DATA_ERROR" !== err.code || opts.log.warn("tarball", `tarball data for ${spec} (${opts.integrity}) seems to be corrupted. Trying one more time.`), 
              cleanUpCached(opts.cache, err.sri, opts).then((() => tryAgain(err)));
              throw err;
            }));
          }), {
            retries: 1
          }));
          throw err;
        })).catch((err => {
          throw "EINTEGRITY" === err.code && (err.message = `Verification failed while extracting ${spec}:\n${err.message}`), 
          err;
        }));
      };
    },
    47730: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fetchManifest = __webpack_require__(12754).manifest, finalizeManifest = __webpack_require__(28199), optCheck = __webpack_require__(91149), pinflight = __webpack_require__(10978), npa = __webpack_require__(19932);
      module.exports = function(spec, opts) {
        opts = optCheck(opts);
        const label = [ (spec = npa(spec, opts.where)).name, spec.saveSpec || spec.fetchSpec, spec.type, opts.cache, opts.registry, opts.scope ].join(":");
        return pinflight(label, (() => {
          const startTime = Date.now();
          return fetchManifest(spec, opts).then((rawManifest => finalizeManifest(rawManifest, spec, opts))).then((manifest => {
            opts.annotate && (manifest._from = spec.saveSpec || spec.raw, manifest._requested = spec, 
            manifest._spec = spec.raw, manifest._where = opts.where);
            const elapsedTime = Date.now() - startTime;
            return opts.log.silly("pacote", `${spec.type} manifest for ${spec.name}@${spec.saveSpec || spec.fetchSpec} fetched in ${elapsedTime}ms`), 
            manifest;
          }));
        }));
      };
    },
    72454: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fetchPackument = __webpack_require__(12754).packument, optCheck = __webpack_require__(91149), pinflight = __webpack_require__(10978), npa = __webpack_require__(19932);
      module.exports = function(spec, opts) {
        opts = optCheck(opts);
        const label = [ (spec = npa(spec, opts.where)).name, spec.saveSpec || spec.fetchSpec, spec.type, opts.cache, opts.registry, opts.scope ].join(":"), startTime = Date.now();
        return pinflight(label, (() => fetchPackument(spec, opts))).then((p => {
          const elapsedTime = Date.now() - startTime;
          return opts.log.silly("pacote", `${spec.registry ? "registry" : spec.type} packument for ${spec.name}@${spec.saveSpec || spec.fetchSpec} fetched in ${elapsedTime}ms`), 
          p;
        }));
      };
    },
    61465: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), cacache = __webpack_require__(99269), finished = BB.promisify(__webpack_require__(30498).finished), optCheck = __webpack_require__(91149), npa = __webpack_require__(19932);
      let fetch;
      function prefetchByManifest(start, spec, opts) {
        let manifest, integrity;
        return BB.resolve().then((() => {
          fetch || (fetch = __webpack_require__(12754));
          const stream = fetch.tarball(spec, opts);
          if (stream) return stream.on("data", (function() {})), stream.on("manifest", (m => {
            manifest = m;
          })), stream.on("integrity", (i => {
            integrity = i;
          })), finished(stream);
        })).then((() => (opts.log.silly("prefetch", `${spec} done in ${Date.now() - start}ms`), 
        {
          manifest,
          spec,
          integrity: integrity || manifest && manifest._integrity,
          byDigest: !1
        })));
      }
      module.exports = function(spec, opts) {
        opts = optCheck(opts), spec = npa(spec, opts.where), opts.log.warn("prefetch", "pacote.prefetch() is deprecated. Please use pacote.tarball() instead.");
        const startTime = Date.now();
        if (!opts.cache) return opts.log.info("prefetch", "skipping prefetch: no cache provided"), 
        BB.resolve({
          spec
        });
        return opts.integrity && !opts.preferOnline ? (opts.log.silly("prefetch", "checking if", opts.integrity, "is already cached"), 
        cacache.get.hasContent(opts.cache, opts.integrity).then((info => info ? (opts.log.silly("prefetch", `content already exists for ${spec} (${Date.now() - startTime}ms)`), 
        {
          spec,
          integrity: info.integrity,
          size: info.size,
          byDigest: !0
        }) : prefetchByManifest(startTime, spec, opts)))) : (opts.log.silly("prefetch", `no integrity hash provided for ${spec} - fetching by manifest`), 
        prefetchByManifest(startTime, spec, opts));
      };
    },
    41233: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const BB = __webpack_require__(41142), fs = __webpack_require__(57147), getStream = __webpack_require__(94810), mkdirp = BB.promisify(__webpack_require__(41718)), npa = __webpack_require__(19932), optCheck = __webpack_require__(91149), PassThrough = __webpack_require__(12781).PassThrough, path = __webpack_require__(71017), rimraf = BB.promisify(__webpack_require__(68259)), withTarballStream = __webpack_require__(86025);
      module.exports = function(spec, opts) {
        return opts = optCheck(opts), spec = npa(spec, opts.where), withTarballStream(spec, opts, (stream => getStream.buffer(stream)));
      }, module.exports.stream = function(spec, opts) {
        opts = optCheck(opts), spec = npa(spec, opts.where);
        const output = new PassThrough;
        let hasTouchedOutput = !1, lastError = null;
        return withTarballStream(spec, opts, (stream => {
          if (hasTouchedOutput && lastError) throw lastError;
          if (hasTouchedOutput) throw new Error("abort, abort!");
          return new BB(((resolve, reject) => {
            stream.on("error", reject), output.on("error", reject), output.on("error", (() => {
              hasTouchedOutput = !0;
            })), output.on("finish", resolve), stream.pipe(output), stream.once("data", (() => {
              hasTouchedOutput = !0;
            }));
          })).catch((err => {
            throw lastError = err, err;
          }));
        })).catch((err => output.emit("error", err))), output;
      }, module.exports.toFile = function(spec, dest, opts) {
        return opts = optCheck(opts), spec = npa(spec, opts.where), mkdirp(path.dirname(dest)).then((() => withTarballStream(spec, opts, (stream => rimraf(dest).then((() => new BB(((resolve, reject) => {
          const writer = fs.createWriteStream(dest);
          stream.on("error", reject), writer.on("error", reject), writer.on("close", resolve), 
          stream.pipe(writer);
        }))))))));
      };
    },
    10978: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      let Bluebird;
      module.exports = inflight;
      try {
        Bluebird = __webpack_require__(41142);
      } catch (_) {
        Bluebird = Promise;
      }
      const active = {};
      function inflight(unique, doFly) {
        return Bluebird.all([ unique, doFly ]).then((function(args) {
          const unique = args[0], doFly = args[1];
          return Array.isArray(unique) ? Bluebird.all(unique).then((function(uniqueArr) {
            return _inflight(uniqueArr.join(""), doFly);
          })) : _inflight(unique, doFly);
        }));
        function _inflight(unique, doFly) {
          if (!active[unique]) {
            function cleanup() {
              delete active[unique];
            }
            active[unique] = new Bluebird((function(resolve) {
              return resolve(doFly());
            })), active[unique].then(cleanup, cleanup);
          }
          return active[unique];
        }
      }
      inflight.active = active;
    },
    49776: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var errcode = __webpack_require__(50141), retry = __webpack_require__(64876), hasOwn = Object.prototype.hasOwnProperty;
      function isRetryError(err) {
        return err && "EPROMISERETRY" === err.code && hasOwn.call(err, "retried");
      }
      module.exports = function(fn, options) {
        var temp, operation;
        return "object" == typeof fn && "function" == typeof options && (temp = options, 
        options = fn, fn = temp), operation = retry.operation(options), new Promise((function(resolve, reject) {
          operation.attempt((function(number) {
            Promise.resolve().then((function() {
              return fn((function(err) {
                throw isRetryError(err) && (err = err.retried), errcode("Retrying", "EPROMISERETRY", {
                  retried: err
                });
              }), number);
            })).then(resolve, (function(err) {
              isRetryError(err) && (err = err.retried, operation.retry(err || new Error)) || reject(err);
            }));
          }));
        }));
      };
    },
    66940: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const genfun = __webpack_require__(30056);
      class Duck extends Function {
        impl(target, types, impls) {
          impls || isArray(types) || (impls = types, types = []), !impls && this.isDerivable && (impls = this._defaultImpls), 
          impls || (impls = {}), "function" != typeof target || target.isGenfun || (target = target.prototype), 
          function(duck, target, impls) {
            duck._methodNames.forEach((function(name) {
              if (!impls[name] && !duck._defaultImpls[name] && "function" != typeof target[name]) throw new Error(`Missing implementation for ${formatMethod(duck, name, duck.name)}. Make sure the method is present in your ${duck.name || "protocol"} definition. Required methods: ${duck._methodNames.filter((m => !duck._defaultImpls[m])).map((m => formatMethod(duck, m))).join(", ")}.`);
            })), Object.keys(impls).forEach((function(name) {
              if (-1 === duck._methodNames.indexOf(name)) throw new Error(`${name}() was included in the impl, but is not part of ${duck.name || "the protocol"}. Allowed methods: ${duck._methodNames.map((m => formatMethod(duck, m))).join(", ")}.`);
            }));
          }(this, target, impls), function(duck, types) {
            var requiredTypes = duck._types;
            if (types.length > requiredTypes.length) throw new Error(`${duck.name || "Protocol"} expects to be defined across ${requiredTypes.length} type${requiredTypes.length > 1 ? "s" : ""}, but ${types.length} ${types.length > 1 ? "were" : "was"} specified.`);
          }(this, types), this._constraints.forEach((c => {
            if (!c.verify(target, types)) throw new Error(`Implementations of ${this.name || "this protocol"} must first implement ${c.parent.name || "its constraint protocols defined in opts.where."}`);
          })), this._methodNames.forEach((name => {
            !function(duck, name, target, types, impls) {
              const methodTypes = duck._gfTypes[name].map((function(typeIdx) {
                return types[typeIdx];
              }));
              for (let i = methodTypes.length - 1; i >= 0 && void 0 === methodTypes[i]; i--) methodTypes.pop();
              const useMetaobject = duck._metaobject && duck._metaobject !== Protoduck;
              if (Object.prototype.hasOwnProperty.call(target, name)) {
                if ("function" == typeof target[name] && !target[name].isGenfun) {
                  const gf = useMetaobject ? duck._metaobject.createGenfun(duck, target, name, target[name]) : _metaCreateGenfun(duck, target, name, target[name]);
                  target[name] = gf;
                }
              } else {
                const gf = useMetaobject ? duck._metaobject.createGenfun(duck, target, name, null) : _metaCreateGenfun(duck, target, name, null);
                target[name] = gf;
              }
              const fn = impls[name] || duck._defaultImpls[name];
              fn && (useMetaobject ? duck._metaobject.addMethod(duck, target, name, methodTypes, fn) : _metaAddMethod(duck, target, name, methodTypes, fn));
            }(this, name, target, types, impls);
          }));
        }
        hasImpl(arg, args) {
          args = args || [];
          const fns = this._methodNames;
          var gf;
          "function" != typeof arg || arg.isGenfun || (arg = arg.prototype), args = args.map((arg => "function" != typeof arg || arg.isGenfun ? arg : arg.prototype));
          for (var i = 0; i < fns.length; i++) if (!(gf = arg[fns[i]]) || (gf.hasMethod ? !gf.hasMethod.apply(gf, args) : "function" == typeof gf)) return !1;
          return !0;
        }
        matches(thisType, argTypes) {
          return !argTypes && isArray(thisType) && (argTypes = thisType, thisType = "this"), 
          thisType || (thisType = "this"), argTypes || (argTypes = []), new Constraint(this, thisType, argTypes);
        }
      }
      Duck.prototype.isDuck = !0, Duck.prototype.isProtocol = !0;
      const Protoduck = module.exports = define([ "duck" ], {
        createGenfun: [ "duck", _metaCreateGenfun ],
        addMethod: [ "duck", _metaAddMethod ]
      }, {
        name: "Protoduck"
      }), noImplFound = module.exports.noImplFound = genfun.noApplicableMethod;
      function define(types, spec, opts) {
        isArray(types) || (opts = spec, spec = types, types = []);
        const duck = function(thisType, argTypes) {
          return duck.matches(thisType, argTypes);
        };
        if (Object.setPrototypeOf(duck, Duck.prototype), duck.isDerivable = !0, Object.defineProperty(duck, "name", {
          value: opts && opts.name || "Protocol"
        }), opts && opts.where) {
          let where = opts.where;
          isArray(opts.where) || (where = [ opts.where ]), duck._constraints = where.map((w => w.isProtocol ? w.matches() : w));
        } else duck._constraints = [];
        return duck.isProtocol = !0, duck._metaobject = opts && opts.metaobject, duck._types = types, 
        duck._defaultImpls = {}, duck._gfTypes = {}, duck._methodNames = Object.keys(spec), 
        duck._methodNames.forEach((name => {
          !function(duck, name, spec) {
            let gfTypes = spec[name];
            "function" == typeof gfTypes && (duck._defaultImpls[name] = gfTypes, gfTypes = [ gfTypes ]);
            "function" == typeof gfTypes[gfTypes.length - 1] ? duck._defaultImpls[name] = gfTypes.pop() : duck.isDerivable = !1;
            duck._gfTypes[name] = gfTypes.map((typeId => {
              const idx = duck._types.indexOf(typeId);
              if (-1 === idx) throw new Error(`type '${typeId}' for function '${name}' does not match any protocol types (${duck._types.join(", ")}).`);
              return idx;
            }));
          }(duck, name, spec);
        })), duck._constraints.forEach((c => c.attach(duck))), duck;
      }
      function formatMethod(duck, name, withDuckName) {
        return `${withDuckName && duck.name ? `${duck.name}#` : ""}${name}(${duck._gfTypes[name].map((n => duck._types[n])).join(", ")})`;
      }
      function typeName(obj) {
        return /\[object ([a-zA-Z0-9]+)\]/.exec({}.toString.call(obj))[1];
      }
      function isArray(x) {
        return "[object Array]" === Object.prototype.toString.call(x);
      }
      function _metaCreateGenfun(proto, target, name, deflt) {
        var gf = genfun({
          default: deflt,
          name: `${proto.name ? `${proto.name}#` : ""}${name}`
        });
        return function(proto, gf, target, name) {
          noImplFound.add([ gf ], (function(gf, thisArg, args) {
            let parent = Object.getPrototypeOf(thisArg);
            for (;parent && parent[name] === gf; ) parent = Object.getPrototypeOf(parent);
            parent && parent[name] && parent[name];
            var msg = `No ${typeName(thisArg)} impl for ${proto.name ? `${proto.name}#` : ""}${name}(${[].map.call(args, typeName).join(", ")}). You must implement ${proto.name ? formatMethod(proto, name, !0) : `the protocol ${formatMethod(proto, name)} belongs to`} in order to call ${typeName(thisArg)}#${name}(${[].map.call(args, typeName).join(", ")}).`;
            const err = new Error(msg);
            throw err.protocol = proto, err.function = gf, err.thisArg = thisArg, err.args = args, 
            err.code = "ENOIMPL", err;
          }));
        }(proto, gf, 0, name), gf.duck = proto, gf;
      }
      function _metaAddMethod(duck, target, name, methodTypes, fn) {
        return target[name].add(methodTypes, fn);
      }
      module.exports.define = define, Protoduck.impl(Protoduck);
      class Constraint {
        constructor(parent, thisType, argTypes) {
          this.parent = parent, this.target = thisType, this.types = argTypes;
        }
        attach(obj) {
          if (this.child = obj, "this" === this.target) this.thisIdx = "this"; else {
            const idx = this.child._types.indexOf(this.target);
            this.thisIdx = -1 === idx ? null : idx;
          }
          this.indices = this.types.map((typeId => {
            if ("this" === typeId) return "this";
            {
              const idx = this.child._types.indexOf(typeId);
              return -1 === idx ? null : idx;
            }
          }));
        }
        verify(target, types) {
          const thisType = "this" === this.thisIdx || null == this.thisIdx ? target : types[this.thisIdx], parentTypes = this.indices.map((idx => "this" === idx ? target : "this" === idx ? types[this.thisIdx] : null === idx ? Object : types[idx] || Object.prototype));
          return this.parent.hasImpl(thisType, parentTypes);
        }
      }
      Constraint.prototype.isConstraint = !0;
    },
    42048: (module, __unused_webpack_exports, __webpack_require__) => {
      var once = __webpack_require__(38412), eos = __webpack_require__(33446), fs = __webpack_require__(57147), noop = function() {}, ancient = /^v?\.0/.test(process.version), isFn = function(fn) {
        return "function" == typeof fn;
      }, destroyer = function(stream, reading, writing, callback) {
        callback = once(callback);
        var closed = !1;
        stream.on("close", (function() {
          closed = !0;
        })), eos(stream, {
          readable: reading,
          writable: writing
        }, (function(err) {
          if (err) return callback(err);
          closed = !0, callback();
        }));
        var destroyed = !1;
        return function(err) {
          if (!closed && !destroyed) return destroyed = !0, function(stream) {
            return !!ancient && !!fs && (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
          }(stream) ? stream.close(noop) : function(stream) {
            return stream.setHeader && isFn(stream.abort);
          }(stream) ? stream.abort() : isFn(stream.destroy) ? stream.destroy() : void callback(err || new Error("stream was destroyed"));
        };
      }, call = function(fn) {
        fn();
      }, pipe = function(from, to) {
        return from.pipe(to);
      };
      module.exports = function() {
        var error, streams = Array.prototype.slice.call(arguments), callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
        if (Array.isArray(streams[0]) && (streams = streams[0]), streams.length < 2) throw new Error("pump requires two streams per minimum");
        var destroys = streams.map((function(stream, i) {
          var reading = i < streams.length - 1;
          return destroyer(stream, reading, i > 0, (function(err) {
            error || (error = err), err && destroys.forEach(call), reading || (destroys.forEach(call), 
            callback(error));
          }));
        }));
        return streams.reduce(pipe);
      };
    },
    64876: (__unused_webpack_module, exports, __webpack_require__) => {
      var RetryOperation = __webpack_require__(32120);
      exports.operation = function(options) {
        var timeouts = exports.timeouts(options);
        return new RetryOperation(timeouts, {
          forever: options && options.forever,
          unref: options && options.unref
        });
      }, exports.timeouts = function(options) {
        if (options instanceof Array) return [].concat(options);
        var opts = {
          retries: 10,
          factor: 2,
          minTimeout: 1e3,
          maxTimeout: 1 / 0,
          randomize: !1
        };
        for (var key in options) opts[key] = options[key];
        if (opts.minTimeout > opts.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
        for (var timeouts = [], i = 0; i < opts.retries; i++) timeouts.push(this.createTimeout(i, opts));
        return options && options.forever && !timeouts.length && timeouts.push(this.createTimeout(i, opts)), 
        timeouts.sort((function(a, b) {
          return a - b;
        })), timeouts;
      }, exports.createTimeout = function(attempt, opts) {
        var random = opts.randomize ? Math.random() + 1 : 1, timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
        return timeout = Math.min(timeout, opts.maxTimeout);
      }, exports.wrap = function(obj, options, methods) {
        if (options instanceof Array && (methods = options, options = null), !methods) for (var key in methods = [], 
        obj) "function" == typeof obj[key] && methods.push(key);
        for (var i = 0; i < methods.length; i++) {
          var method = methods[i], original = obj[method];
          obj[method] = function() {
            var op = exports.operation(options), args = Array.prototype.slice.call(arguments), callback = args.pop();
            args.push((function(err) {
              op.retry(err) || (err && (arguments[0] = op.mainError()), callback.apply(this, arguments));
            })), op.attempt((function() {
              original.apply(obj, args);
            }));
          }, obj[method].options = options;
        }
      };
    },
    32120: module => {
      function RetryOperation(timeouts, options) {
        "boolean" == typeof options && (options = {
          forever: options
        }), this._timeouts = timeouts, this._options = options || {}, this._fn = null, this._errors = [], 
        this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, 
        this._timeout = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
      }
      module.exports = RetryOperation, RetryOperation.prototype.stop = function() {
        this._timeout && clearTimeout(this._timeout), this._timeouts = [], this._cachedTimeouts = null;
      }, RetryOperation.prototype.retry = function(err) {
        if (this._timeout && clearTimeout(this._timeout), !err) return !1;
        this._errors.push(err);
        var timeout = this._timeouts.shift();
        if (void 0 === timeout) {
          if (!this._cachedTimeouts) return !1;
          this._errors.splice(this._errors.length - 1, this._errors.length), this._timeouts = this._cachedTimeouts.slice(0), 
          timeout = this._timeouts.shift();
        }
        var self = this, timer = setTimeout((function() {
          self._attempts++, self._operationTimeoutCb && (self._timeout = setTimeout((function() {
            self._operationTimeoutCb(self._attempts);
          }), self._operationTimeout), this._options.unref && self._timeout.unref()), self._fn(self._attempts);
        }), timeout);
        return this._options.unref && timer.unref(), !0;
      }, RetryOperation.prototype.attempt = function(fn, timeoutOps) {
        this._fn = fn, timeoutOps && (timeoutOps.timeout && (this._operationTimeout = timeoutOps.timeout), 
        timeoutOps.cb && (this._operationTimeoutCb = timeoutOps.cb));
        var self = this;
        this._operationTimeoutCb && (this._timeout = setTimeout((function() {
          self._operationTimeoutCb();
        }), self._operationTimeout)), this._fn(this._attempts);
      }, RetryOperation.prototype.try = function(fn) {
        console.log("Using RetryOperation.try() is deprecated"), this.attempt(fn);
      }, RetryOperation.prototype.start = function(fn) {
        console.log("Using RetryOperation.start() is deprecated"), this.attempt(fn);
      }, RetryOperation.prototype.start = RetryOperation.prototype.try, RetryOperation.prototype.errors = function() {
        return this._errors;
      }, RetryOperation.prototype.attempts = function() {
        return this._attempts;
      }, RetryOperation.prototype.mainError = function() {
        if (0 === this._errors.length) return null;
        for (var counts = {}, mainError = null, mainErrorCount = 0, i = 0; i < this._errors.length; i++) {
          var error = this._errors[i], message = error.message, count = (counts[message] || 0) + 1;
          counts[message] = count, count >= mainErrorCount && (mainError = error, mainErrorCount = count);
        }
        return mainError;
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
    28618: (module, exports, __webpack_require__) => {
      var buffer = __webpack_require__(14300), Buffer = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) dst[key] = src[key];
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer(arg, encodingOrOffset, length);
      }
      Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), 
      exports.Buffer = SafeBuffer), SafeBuffer.prototype = Object.create(Buffer.prototype), 
      copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if ("number" == typeof arg) throw new TypeError("Argument must not be a number");
        return Buffer(arg, encodingOrOffset, length);
      }, SafeBuffer.alloc = function(size, fill, encoding) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        var buf = Buffer(size);
        return void 0 !== fill ? "string" == typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0), 
        buf;
      }, SafeBuffer.allocUnsafe = function(size) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        return Buffer(size);
      }, SafeBuffer.allocUnsafeSlow = function(size) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        return buffer.SlowBuffer(size);
      };
    },
    87783: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const crypto = __webpack_require__(6113), figgyPudding = __webpack_require__(55212), Transform = __webpack_require__(12781).Transform, SPEC_ALGORITHMS = [ "sha256", "sha384", "sha512" ], BASE64_REGEX = /^[a-z0-9+/]+(?:=?=?)$/i, SRI_REGEX = /^([^-]+)-([^?]+)([?\S*]*)$/, STRICT_SRI_REGEX = /^([^-]+)-([A-Za-z0-9+/=]{44,88})(\?[\x21-\x7E]*)?$/, VCHAR_REGEX = /^[\x21-\x7E]+$/, SsriOpts = figgyPudding({
        algorithms: {
          default: [ "sha512" ]
        },
        error: {
          default: !1
        },
        integrity: {},
        options: {
          default: []
        },
        pickAlgorithm: {
          default: () => getPrioritizedHash
        },
        Promise: {
          default: () => Promise
        },
        sep: {
          default: " "
        },
        single: {
          default: !1
        },
        size: {},
        strict: {
          default: !1
        }
      });
      class Hash {
        get isHash() {
          return !0;
        }
        constructor(hash, opts) {
          const strict = !!(opts = SsriOpts(opts)).strict;
          this.source = hash.trim();
          const match = this.source.match(strict ? STRICT_SRI_REGEX : SRI_REGEX);
          if (!match) return;
          if (strict && !SPEC_ALGORITHMS.some((a => a === match[1]))) return;
          this.algorithm = match[1], this.digest = match[2];
          const rawOpts = match[3];
          this.options = rawOpts ? rawOpts.slice(1).split("?") : [];
        }
        hexDigest() {
          return this.digest && Buffer.from(this.digest, "base64").toString("hex");
        }
        toJSON() {
          return this.toString();
        }
        toString(opts) {
          if ((opts = SsriOpts(opts)).strict && !(SPEC_ALGORITHMS.some((x => x === this.algorithm)) && this.digest.match(BASE64_REGEX) && (this.options || []).every((opt => opt.match(VCHAR_REGEX))))) return "";
          const options = this.options && this.options.length ? `?${this.options.join("?")}` : "";
          return `${this.algorithm}-${this.digest}${options}`;
        }
      }
      class Integrity {
        get isIntegrity() {
          return !0;
        }
        toJSON() {
          return this.toString();
        }
        toString(opts) {
          let sep = (opts = SsriOpts(opts)).sep || " ";
          return opts.strict && (sep = sep.replace(/\S+/g, " ")), Object.keys(this).map((k => this[k].map((hash => Hash.prototype.toString.call(hash, opts))).filter((x => x.length)).join(sep))).filter((x => x.length)).join(sep);
        }
        concat(integrity, opts) {
          opts = SsriOpts(opts);
          const other = "string" == typeof integrity ? integrity : stringify(integrity, opts);
          return parse(`${this.toString(opts)} ${other}`, opts);
        }
        hexDigest() {
          return parse(this, {
            single: !0
          }).hexDigest();
        }
        match(integrity, opts) {
          const other = parse(integrity, opts = SsriOpts(opts)), algo = other.pickAlgorithm(opts);
          return this[algo] && other[algo] && this[algo].find((hash => other[algo].find((otherhash => hash.digest === otherhash.digest)))) || !1;
        }
        pickAlgorithm(opts) {
          const pickAlgorithm = (opts = SsriOpts(opts)).pickAlgorithm, keys = Object.keys(this);
          if (!keys.length) throw new Error(`No algorithms available for ${JSON.stringify(this.toString())}`);
          return keys.reduce(((acc, algo) => pickAlgorithm(acc, algo) || acc));
        }
      }
      function parse(sri, opts) {
        if (opts = SsriOpts(opts), "string" == typeof sri) return _parse(sri, opts);
        if (sri.algorithm && sri.digest) {
          const fullSri = new Integrity;
          return fullSri[sri.algorithm] = [ sri ], _parse(stringify(fullSri, opts), opts);
        }
        return _parse(stringify(sri, opts), opts);
      }
      function _parse(integrity, opts) {
        return opts.single ? new Hash(integrity, opts) : integrity.trim().split(/\s+/).reduce(((acc, string) => {
          const hash = new Hash(string, opts);
          if (hash.algorithm && hash.digest) {
            const algo = hash.algorithm;
            acc[algo] || (acc[algo] = []), acc[algo].push(hash);
          }
          return acc;
        }), new Integrity);
      }
      function stringify(obj, opts) {
        return opts = SsriOpts(opts), obj.algorithm && obj.digest ? Hash.prototype.toString.call(obj, opts) : "string" == typeof obj ? stringify(parse(obj, opts), opts) : Integrity.prototype.toString.call(obj, opts);
      }
      function integrityStream(opts) {
        const sri = (opts = SsriOpts(opts)).integrity && parse(opts.integrity, opts), goodSri = sri && Object.keys(sri).length, algorithm = goodSri && sri.pickAlgorithm(opts), digests = goodSri && sri[algorithm], algorithms = Array.from(new Set(opts.algorithms.concat(algorithm ? [ algorithm ] : []))), hashes = algorithms.map(crypto.createHash);
        let streamSize = 0;
        const stream = new Transform({
          transform(chunk, enc, cb) {
            streamSize += chunk.length, hashes.forEach((h => h.update(chunk, enc))), cb(null, chunk, enc);
          }
        }).on("end", (() => {
          const optString = opts.options && opts.options.length ? `?${opts.options.join("?")}` : "", newSri = parse(hashes.map(((h, i) => `${algorithms[i]}-${h.digest("base64")}${optString}`)).join(" "), opts), match = goodSri && newSri.match(sri, opts);
          if ("number" == typeof opts.size && streamSize !== opts.size) {
            const err = new Error(`stream size mismatch when checking ${sri}.\n  Wanted: ${opts.size}\n  Found: ${streamSize}`);
            err.code = "EBADSIZE", err.found = streamSize, err.expected = opts.size, err.sri = sri, 
            stream.emit("error", err);
          } else if (opts.integrity && !match) {
            const err = new Error(`${sri} integrity checksum failed when using ${algorithm}: wanted ${digests} but got ${newSri}. (${streamSize} bytes)`);
            err.code = "EINTEGRITY", err.found = newSri, err.expected = digests, err.algorithm = algorithm, 
            err.sri = sri, stream.emit("error", err);
          } else stream.emit("size", streamSize), stream.emit("integrity", newSri), match && stream.emit("verified", match);
        }));
        return stream;
      }
      module.exports.parse = parse, module.exports.stringify = stringify, module.exports.fromHex = function(hexDigest, algorithm, opts) {
        const optString = (opts = SsriOpts(opts)).options && opts.options.length ? `?${opts.options.join("?")}` : "";
        return parse(`${algorithm}-${Buffer.from(hexDigest, "hex").toString("base64")}${optString}`, opts);
      }, module.exports.fromData = function(data, opts) {
        const algorithms = (opts = SsriOpts(opts)).algorithms, optString = opts.options && opts.options.length ? `?${opts.options.join("?")}` : "";
        return algorithms.reduce(((acc, algo) => {
          const digest = crypto.createHash(algo).update(data).digest("base64"), hash = new Hash(`${algo}-${digest}${optString}`, opts);
          if (hash.algorithm && hash.digest) {
            const algo = hash.algorithm;
            acc[algo] || (acc[algo] = []), acc[algo].push(hash);
          }
          return acc;
        }), new Integrity);
      }, module.exports.fromStream = function(stream, opts) {
        const P = (opts = SsriOpts(opts)).Promise || Promise, istream = integrityStream(opts);
        return new P(((resolve, reject) => {
          let sri;
          stream.pipe(istream), stream.on("error", reject), istream.on("error", reject), istream.on("integrity", (s => {
            sri = s;
          })), istream.on("end", (() => resolve(sri))), istream.on("data", (() => {}));
        }));
      }, module.exports.checkData = function(data, sri, opts) {
        if (opts = SsriOpts(opts), sri = parse(sri, opts), !Object.keys(sri).length) {
          if (opts.error) throw Object.assign(new Error("No valid integrity hashes to check against"), {
            code: "EINTEGRITY"
          });
          return !1;
        }
        const algorithm = sri.pickAlgorithm(opts), digest = crypto.createHash(algorithm).update(data).digest("base64"), newSri = parse({
          algorithm,
          digest
        }), match = newSri.match(sri, opts);
        if (match || !opts.error) return match;
        if ("number" == typeof opts.size && data.length !== opts.size) {
          const err = new Error(`data size mismatch when checking ${sri}.\n  Wanted: ${opts.size}\n  Found: ${data.length}`);
          throw err.code = "EBADSIZE", err.found = data.length, err.expected = opts.size, 
          err.sri = sri, err;
        }
        {
          const err = new Error(`Integrity checksum failed when using ${algorithm}: Wanted ${sri}, but got ${newSri}. (${data.length} bytes)`);
          throw err.code = "EINTEGRITY", err.found = newSri, err.expected = sri, err.algorithm = algorithm, 
          err.sri = sri, err;
        }
      }, module.exports.checkStream = function(stream, sri, opts) {
        const P = (opts = SsriOpts(opts)).Promise || Promise, checker = integrityStream(opts.concat({
          integrity: sri
        }));
        return new P(((resolve, reject) => {
          let sri;
          stream.pipe(checker), stream.on("error", reject), checker.on("error", reject), checker.on("verified", (s => {
            sri = s;
          })), checker.on("end", (() => resolve(sri))), checker.on("data", (() => {}));
        }));
      }, module.exports.integrityStream = integrityStream, module.exports.create = function(opts) {
        const algorithms = (opts = SsriOpts(opts)).algorithms, optString = opts.options.length ? `?${opts.options.join("?")}` : "", hashes = algorithms.map(crypto.createHash);
        return {
          update: function(chunk, enc) {
            return hashes.forEach((h => h.update(chunk, enc))), this;
          },
          digest: function(enc) {
            return algorithms.reduce(((acc, algo) => {
              const digest = hashes.shift().digest("base64"), hash = new Hash(`${algo}-${digest}${optString}`, opts);
              if (hash.algorithm && hash.digest) {
                const algo = hash.algorithm;
                acc[algo] || (acc[algo] = []), acc[algo].push(hash);
              }
              return acc;
            }), new Integrity);
          }
        };
      };
      const NODE_HASHES = new Set(crypto.getHashes()), DEFAULT_PRIORITY = [ "md5", "whirlpool", "sha1", "sha224", "sha256", "sha384", "sha512", "sha3", "sha3-256", "sha3-384", "sha3-512", "sha3_256", "sha3_384", "sha3_512" ].filter((algo => NODE_HASHES.has(algo)));
      function getPrioritizedHash(algo1, algo2) {
        return DEFAULT_PRIORITY.indexOf(algo1.toLowerCase()) >= DEFAULT_PRIORITY.indexOf(algo2.toLowerCase()) ? algo1 : algo2;
      }
    },
    49760: (module, exports, __webpack_require__) => {
      var Stream = __webpack_require__(12781);
      function through(write, end, opts) {
        write = write || function(data) {
          this.queue(data);
        }, end = end || function() {
          this.queue(null);
        };
        var ended = !1, destroyed = !1, buffer = [], _ended = !1, stream = new Stream;
        function drain() {
          for (;buffer.length && !stream.paused; ) {
            var data = buffer.shift();
            if (null === data) return stream.emit("end");
            stream.emit("data", data);
          }
        }
        function _end() {
          stream.writable = !1, end.call(stream), !stream.readable && stream.autoDestroy && stream.destroy();
        }
        return stream.readable = stream.writable = !0, stream.paused = !1, stream.autoDestroy = !(opts && !1 === opts.autoDestroy), 
        stream.write = function(data) {
          return write.call(this, data), !stream.paused;
        }, stream.queue = stream.push = function(data) {
          return _ended || (null === data && (_ended = !0), buffer.push(data), drain()), stream;
        }, stream.on("end", (function() {
          stream.readable = !1, !stream.writable && stream.autoDestroy && process.nextTick((function() {
            stream.destroy();
          }));
        })), stream.end = function(data) {
          if (!ended) return ended = !0, arguments.length && stream.write(data), _end(), stream;
        }, stream.destroy = function() {
          if (!destroyed) return destroyed = !0, ended = !0, buffer.length = 0, stream.writable = stream.readable = !1, 
          stream.emit("close"), stream;
        }, stream.pause = function() {
          if (!stream.paused) return stream.paused = !0, stream;
        }, stream.resume = function() {
          return stream.paused && (stream.paused = !1, stream.emit("resume")), drain(), stream.paused || stream.emit("drain"), 
          stream;
        }, stream;
      }
      module.exports = through, through.through = through;
    },
    16003: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var path = __webpack_require__(71017), uniqueSlug = __webpack_require__(36649);
      module.exports = function(filepath, prefix, uniq) {
        return path.join(filepath, (prefix ? prefix + "-" : "") + uniqueSlug(uniq));
      };
    },
    36649: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var crypto = __webpack_require__(6113), MurmurHash3 = __webpack_require__(287);
      module.exports = function(uniq) {
        return uniq ? ("00000000" + new MurmurHash3(uniq).result().toString(16)).substr(-8) : crypto.pseudoRandomBytes(4).toString("hex");
      };
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
    68839: module => {
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
    9220: module => {
      "use strict";
      module.exports = function(Yallist) {
        Yallist.prototype[Symbol.iterator] = function*() {
          for (let walker = this.head; walker; walker = walker.next) yield walker.value;
        };
      };
    },
    33836: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      function Yallist(list) {
        var self = this;
        if (self instanceof Yallist || (self = new Yallist), self.tail = null, self.head = null, 
        self.length = 0, list && "function" == typeof list.forEach) list.forEach((function(item) {
          self.push(item);
        })); else if (arguments.length > 0) for (var i = 0, l = arguments.length; i < l; i++) self.push(arguments[i]);
        return self;
      }
      function insert(self, node, value) {
        var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
        return null === inserted.next && (self.tail = inserted), null === inserted.prev && (self.head = inserted), 
        self.length++, inserted;
      }
      function push(self, item) {
        self.tail = new Node(item, self.tail, null, self), self.head || (self.head = self.tail), 
        self.length++;
      }
      function unshift(self, item) {
        self.head = new Node(item, null, self.head, self), self.tail || (self.tail = self.head), 
        self.length++;
      }
      function Node(value, prev, next, list) {
        if (!(this instanceof Node)) return new Node(value, prev, next, list);
        this.list = list, this.value = value, prev ? (prev.next = this, this.prev = prev) : this.prev = null, 
        next ? (next.prev = this, this.next = next) : this.next = null;
      }
      module.exports = Yallist, Yallist.Node = Node, Yallist.create = Yallist, Yallist.prototype.removeNode = function(node) {
        if (node.list !== this) throw new Error("removing node which does not belong to this list");
        var next = node.next, prev = node.prev;
        return next && (next.prev = prev), prev && (prev.next = next), node === this.head && (this.head = next), 
        node === this.tail && (this.tail = prev), node.list.length--, node.next = null, 
        node.prev = null, node.list = null, next;
      }, Yallist.prototype.unshiftNode = function(node) {
        if (node !== this.head) {
          node.list && node.list.removeNode(node);
          var head = this.head;
          node.list = this, node.next = head, head && (head.prev = node), this.head = node, 
          this.tail || (this.tail = node), this.length++;
        }
      }, Yallist.prototype.pushNode = function(node) {
        if (node !== this.tail) {
          node.list && node.list.removeNode(node);
          var tail = this.tail;
          node.list = this, node.prev = tail, tail && (tail.next = node), this.tail = node, 
          this.head || (this.head = node), this.length++;
        }
      }, Yallist.prototype.push = function() {
        for (var i = 0, l = arguments.length; i < l; i++) push(this, arguments[i]);
        return this.length;
      }, Yallist.prototype.unshift = function() {
        for (var i = 0, l = arguments.length; i < l; i++) unshift(this, arguments[i]);
        return this.length;
      }, Yallist.prototype.pop = function() {
        if (this.tail) {
          var res = this.tail.value;
          return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, 
          this.length--, res;
        }
      }, Yallist.prototype.shift = function() {
        if (this.head) {
          var res = this.head.value;
          return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, 
          this.length--, res;
        }
      }, Yallist.prototype.forEach = function(fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.head, i = 0; null !== walker; i++) fn.call(thisp, walker.value, i, this), 
        walker = walker.next;
      }, Yallist.prototype.forEachReverse = function(fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.tail, i = this.length - 1; null !== walker; i--) fn.call(thisp, walker.value, i, this), 
        walker = walker.prev;
      }, Yallist.prototype.get = function(n) {
        for (var i = 0, walker = this.head; null !== walker && i < n; i++) walker = walker.next;
        if (i === n && null !== walker) return walker.value;
      }, Yallist.prototype.getReverse = function(n) {
        for (var i = 0, walker = this.tail; null !== walker && i < n; i++) walker = walker.prev;
        if (i === n && null !== walker) return walker.value;
      }, Yallist.prototype.map = function(fn, thisp) {
        thisp = thisp || this;
        for (var res = new Yallist, walker = this.head; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
        walker = walker.next;
        return res;
      }, Yallist.prototype.mapReverse = function(fn, thisp) {
        thisp = thisp || this;
        for (var res = new Yallist, walker = this.tail; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
        walker = walker.prev;
        return res;
      }, Yallist.prototype.reduce = function(fn, initial) {
        var acc, walker = this.head;
        if (arguments.length > 1) acc = initial; else {
          if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
          walker = this.head.next, acc = this.head.value;
        }
        for (var i = 0; null !== walker; i++) acc = fn(acc, walker.value, i), walker = walker.next;
        return acc;
      }, Yallist.prototype.reduceReverse = function(fn, initial) {
        var acc, walker = this.tail;
        if (arguments.length > 1) acc = initial; else {
          if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
          walker = this.tail.prev, acc = this.tail.value;
        }
        for (var i = this.length - 1; null !== walker; i--) acc = fn(acc, walker.value, i), 
        walker = walker.prev;
        return acc;
      }, Yallist.prototype.toArray = function() {
        for (var arr = new Array(this.length), i = 0, walker = this.head; null !== walker; i++) arr[i] = walker.value, 
        walker = walker.next;
        return arr;
      }, Yallist.prototype.toArrayReverse = function() {
        for (var arr = new Array(this.length), i = 0, walker = this.tail; null !== walker; i++) arr[i] = walker.value, 
        walker = walker.prev;
        return arr;
      }, Yallist.prototype.slice = function(from, to) {
        (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
        var ret = new Yallist;
        if (to < from || to < 0) return ret;
        from < 0 && (from = 0), to > this.length && (to = this.length);
        for (var i = 0, walker = this.head; null !== walker && i < from; i++) walker = walker.next;
        for (;null !== walker && i < to; i++, walker = walker.next) ret.push(walker.value);
        return ret;
      }, Yallist.prototype.sliceReverse = function(from, to) {
        (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
        var ret = new Yallist;
        if (to < from || to < 0) return ret;
        from < 0 && (from = 0), to > this.length && (to = this.length);
        for (var i = this.length, walker = this.tail; null !== walker && i > to; i--) walker = walker.prev;
        for (;null !== walker && i > from; i--, walker = walker.prev) ret.push(walker.value);
        return ret;
      }, Yallist.prototype.splice = function(start, deleteCount) {
        start > this.length && (start = this.length - 1), start < 0 && (start = this.length + start);
        for (var i = 0, walker = this.head; null !== walker && i < start; i++) walker = walker.next;
        var ret = [];
        for (i = 0; walker && i < deleteCount; i++) ret.push(walker.value), walker = this.removeNode(walker);
        null === walker && (walker = this.tail), walker !== this.head && walker !== this.tail && (walker = walker.prev);
        for (i = 2; i < arguments.length; i++) walker = insert(this, walker, arguments[i]);
        return ret;
      }, Yallist.prototype.reverse = function() {
        for (var head = this.head, tail = this.tail, walker = head; null !== walker; walker = walker.prev) {
          var p = walker.prev;
          walker.prev = walker.next, walker.next = p;
        }
        return this.head = tail, this.tail = head, this;
      };
      try {
        __webpack_require__(9220)(Yallist);
      } catch (er) {}
    },
    73107: module => {
      "use strict";
      module.exports = require("./semver");
    },
    39148: module => {
      "use strict";
      module.exports = require("./tar");
    },
    99269: module => {
      "use strict";
      module.exports = require("./cacache");
    },
    17770: module => {
      "use strict";
      module.exports = require("./normalize-package-data");
    },
    19932: module => {
      "use strict";
      module.exports = require("./npm-package-arg");
    },
    41142: module => {
      "use strict";
      module.exports = require("../vendor/bluebird");
    },
    34436: module => {
      "use strict";
      module.exports = require("../vendor/glob");
    },
    72564: module => {
      "use strict";
      module.exports = require("../vendor/make-fetch-happen");
    },
    30498: module => {
      "use strict";
      module.exports = require("../vendor/mississippi");
    },
    39491: module => {
      "use strict";
      module.exports = require("assert");
    },
    14300: module => {
      "use strict";
      module.exports = require("buffer");
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
    63477: module => {
      "use strict";
      module.exports = require("querystring");
    },
    12781: module => {
      "use strict";
      module.exports = require("stream");
    },
    71576: module => {
      "use strict";
      module.exports = require("string_decoder");
    },
    57310: module => {
      "use strict";
      module.exports = require("url");
    },
    73837: module => {
      "use strict";
      module.exports = require("util");
    },
    59796: module => {
      "use strict";
      module.exports = require("zlib");
    },
    9762: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"npm-registry-fetch","version":"4.0.7","description":"Fetch-based http client for use with npm registry APIs"}');
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
  }(87337);
  module.exports = __webpack_exports__;
})();