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
    69892: (module, exports, __webpack_require__) => {
      var debug = process.env.DEBUG_NOPT || process.env.NOPT_DEBUG ? function() {
        console.error.apply(console, arguments);
      } : function() {}, url = __webpack_require__(57310), path = __webpack_require__(71017), Stream = __webpack_require__(12781).Stream, abbrev = __webpack_require__(70143), osenv = __webpack_require__(20396);
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
            var homePattern = "win32" === process.platform ? /^~(\/|\\)/ : /^~\//, home = osenv.home();
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
    32081: module => {
      "use strict";
      module.exports = require("child_process");
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
  }(69892);
  module.exports = __webpack_exports__;
})();