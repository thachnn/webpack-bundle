module.exports = function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.l = !0, module.exports;
  }
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
  __webpack_require__.d = function(exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function(value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 2);
}([ function(module, exports) {
  module.exports = require("path");
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), commonDir = __webpack_require__(3), pkgDir = __webpack_require__(4), makeDir = __webpack_require__(11);
  module.exports = (options = {}) => {
    const {name: name} = options;
    let directory = options.cwd;
    return directory = options.files ? commonDir(directory, options.files) : directory || process.cwd(), 
    directory = pkgDir.sync(directory), directory && (directory = path.join(directory, "node_modules", ".cache", name), 
    directory && options.create && makeDir.sync(directory), options.thunk) ? (...arguments_) => path.join(directory, ...arguments_) : directory;
  };
}, function(module, exports, __webpack_require__) {
  var path = __webpack_require__(0);
  module.exports = function(basedir, relfiles) {
    if (relfiles) var files = relfiles.map((function(r) {
      return path.resolve(basedir, r);
    })); else files = basedir;
    var res = files.slice(1).reduce((function(ps, file) {
      if (!file.match(/^([A-Za-z]:)?\/|\\/)) throw new Error("relative path without a basedir");
      for (var xs = file.split(/\/+|\\+/), i = 0; ps[i] === xs[i] && i < Math.min(ps.length, xs.length); i++) ;
      return ps.slice(0, i);
    }), files[0].split(/\/+|\\+/));
    return res.length > 1 ? res.join("/") : "/";
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), findUp = __webpack_require__(5);
  module.exports = cwd => findUp("package.json", {
    cwd: cwd
  }).then(fp => fp ? path.dirname(fp) : null), module.exports.sync = cwd => {
    const fp = findUp.sync("package.json", {
      cwd: cwd
    });
    return fp ? path.dirname(fp) : null;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), locatePath = __webpack_require__(6);
  module.exports = (filename, opts = {}) => {
    const startDir = path.resolve(opts.cwd || ""), {root: root} = path.parse(startDir), filenames = [].concat(filename);
    return new Promise(resolve => {
      !function find(dir) {
        locatePath(filenames, {
          cwd: dir
        }).then(file => {
          file ? resolve(path.join(dir, file)) : dir === root ? resolve(null) : find(path.dirname(dir));
        });
      }(startDir);
    });
  }, module.exports.sync = (filename, opts = {}) => {
    let dir = path.resolve(opts.cwd || "");
    const {root: root} = path.parse(dir), filenames = [].concat(filename);
    for (;;) {
      const file = locatePath.sync(filenames, {
        cwd: dir
      });
      if (file) return path.join(dir, file);
      if (dir === root) return null;
      dir = path.dirname(dir);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), pathExists = __webpack_require__(7), pLocate = __webpack_require__(8);
  module.exports = (iterable, options) => (options = Object.assign({
    cwd: process.cwd()
  }, options), pLocate(iterable, el => pathExists(path.resolve(options.cwd, el)), options)), 
  module.exports.sync = (iterable, options) => {
    options = Object.assign({
      cwd: process.cwd()
    }, options);
    for (const el of iterable) if (pathExists.sync(path.resolve(options.cwd, el))) return el;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(1);
  module.exports = fp => new Promise(resolve => {
    fs.access(fp, err => {
      resolve(!err);
    });
  }), module.exports.sync = fp => {
    try {
      return fs.accessSync(fp), !0;
    } catch (err) {
      return !1;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const pLimit = __webpack_require__(9);
  class EndError extends Error {
    constructor(value) {
      super(), this.value = value;
    }
  }
  const testElement = (el, tester) => Promise.resolve(el).then(tester), finder = el => Promise.all(el).then(val => !0 === val[1] && Promise.reject(new EndError(val[0])));
  module.exports = (iterable, tester, opts) => {
    opts = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, opts);
    const limit = pLimit(opts.concurrency), items = [ ...iterable ].map(el => [ el, limit(testElement, el, tester) ]), checkLimit = pLimit(opts.preserveOrder ? 1 : 1 / 0);
    return Promise.all(items.map(el => checkLimit(finder, el))).then(() => {}).catch(err => err instanceof EndError ? err.value : Promise.reject(err));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const pTry = __webpack_require__(10), pLimit = concurrency => {
    if (!Number.isInteger(concurrency) && concurrency !== 1 / 0 || !(concurrency > 0)) return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const queue = [];
    let activeCount = 0;
    const next = () => {
      activeCount--, queue.length > 0 && queue.shift()();
    }, run = (fn, resolve, ...args) => {
      activeCount++;
      const result = pTry(fn, ...args);
      resolve(result), result.then(next, next);
    }, generator = (fn, ...args) => new Promise(resolve => ((fn, resolve, ...args) => {
      activeCount < concurrency ? run(fn, resolve, ...args) : queue.push(run.bind(null, fn, resolve, ...args));
    })(fn, resolve, ...args));
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  const pTry = (fn, ...arguments_) => new Promise(resolve => {
    resolve(fn(...arguments_));
  });
  module.exports = pTry, module.exports.default = pTry;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(1), path = __webpack_require__(0), pify = __webpack_require__(12), semver = __webpack_require__(13), defaults = {
    mode: 511 & ~process.umask(),
    fs: fs
  }, useNativeRecursiveOption = semver.satisfies(process.version, ">=10.12.0"), checkPath = pth => {
    if ("win32" === process.platform) {
      if (/[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ""))) {
        const error = new Error("Path contains invalid characters: " + pth);
        throw error.code = "EINVAL", error;
      }
    }
  }, permissionError = pth => {
    const error = new Error(`operation not permitted, mkdir '${pth}'`);
    return error.code = "EPERM", error.errno = -4048, error.path = pth, error.syscall = "mkdir", 
    error;
  }, makeDir = (input, options) => Promise.resolve().then(() => {
    checkPath(input), options = Object.assign({}, defaults, options);
    const mkdir = pify(options.fs.mkdir), stat = pify(options.fs.stat);
    if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
      const pth = path.resolve(input);
      return mkdir(pth, {
        mode: options.mode,
        recursive: !0
      }).then(() => pth);
    }
    const make = pth => mkdir(pth, options.mode).then(() => pth).catch(error => {
      if ("EPERM" === error.code) throw error;
      if ("ENOENT" === error.code) {
        if (path.dirname(pth) === pth) throw permissionError(pth);
        if (error.message.includes("null bytes")) throw error;
        return make(path.dirname(pth)).then(() => make(pth));
      }
      return stat(pth).then(stats => stats.isDirectory() ? pth : Promise.reject()).catch(() => {
        throw error;
      });
    });
    return make(path.resolve(input));
  });
  module.exports = makeDir, module.exports.default = makeDir, module.exports.sync = (input, options) => {
    if (checkPath(input), options = Object.assign({}, defaults, options), useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
      const pth = path.resolve(input);
      return fs.mkdirSync(pth, {
        mode: options.mode,
        recursive: !0
      }), pth;
    }
    const make = pth => {
      try {
        options.fs.mkdirSync(pth, options.mode);
      } catch (error) {
        if ("EPERM" === error.code) throw error;
        if ("ENOENT" === error.code) {
          if (path.dirname(pth) === pth) throw permissionError(pth);
          if (error.message.includes("null bytes")) throw error;
          return make(path.dirname(pth)), make(pth);
        }
        try {
          if (!options.fs.statSync(pth).isDirectory()) throw new Error("The path is not a directory");
        } catch (_) {
          throw error;
        }
      }
      return pth;
    };
    return make(path.resolve(input));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const processFn = (fn, options) => function(...args) {
    return new (0, options.promiseModule)((resolve, reject) => {
      options.multiArgs ? args.push((...result) => {
        options.errorFirst ? result[0] ? reject(result) : (result.shift(), resolve(result)) : resolve(result);
      }) : options.errorFirst ? args.push((error, result) => {
        error ? reject(error) : resolve(result);
      }) : args.push(resolve), fn.apply(this, args);
    });
  };
  module.exports = (input, options) => {
    options = Object.assign({
      exclude: [ /.+(Sync|Stream)$/ ],
      errorFirst: !0,
      promiseModule: Promise
    }, options);
    const objType = typeof input;
    if (null === input || "object" !== objType && "function" !== objType) throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${null === input ? "null" : objType}\``);
    const filter = key => {
      const match = pattern => "string" == typeof pattern ? key === pattern : pattern.test(key);
      return options.include ? options.include.some(match) : !options.exclude.some(match);
    };
    let ret;
    ret = "function" === objType ? function(...args) {
      return options.excludeMain ? input(...args) : processFn(input, options).apply(this, args);
    } : Object.create(Object.getPrototypeOf(input));
    for (const key in input) {
      const property = input[key];
      ret[key] = "function" == typeof property && filter(key) ? processFn(property, options) : property;
    }
    return ret;
  };
}, function(module, exports) {
  var debug;
  exports = module.exports = SemVer, debug = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift("SEMVER"), console.log.apply(console, args);
  } : function() {}, exports.SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991, re = exports.re = [], src = exports.src = [], R = 0, NUMERICIDENTIFIER = R++;
  src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
  var NUMERICIDENTIFIERLOOSE = R++;
  src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
  var NONNUMERICIDENTIFIER = R++;
  src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  var MAINVERSION = R++;
  src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
  var MAINVERSIONLOOSE = R++;
  src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
  var PRERELEASEIDENTIFIER = R++;
  src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASEIDENTIFIERLOOSE = R++;
  src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASE = R++;
  src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
  var PRERELEASELOOSE = R++;
  src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
  var BUILDIDENTIFIER = R++;
  src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
  var BUILD = R++;
  src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
  var FULL = R++, FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
  src[FULL] = "^" + FULLPLAIN + "$";
  var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?", LOOSE = R++;
  src[LOOSE] = "^" + LOOSEPLAIN + "$";
  var GTLT = R++;
  src[GTLT] = "((?:<|>)?=?)";
  var XRANGEIDENTIFIERLOOSE = R++;
  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
  var XRANGEIDENTIFIER = R++;
  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
  var XRANGEPLAIN = R++;
  src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
  var XRANGEPLAINLOOSE = R++;
  src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
  var XRANGE = R++;
  src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
  var XRANGELOOSE = R++;
  src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
  var COERCE = R++;
  src[COERCE] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
  var LONETILDE = R++;
  src[LONETILDE] = "(?:~>?)";
  var TILDETRIM = R++;
  src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+", re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
  var TILDE = R++;
  src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
  var TILDELOOSE = R++;
  src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
  var LONECARET = R++;
  src[LONECARET] = "(?:\\^)";
  var CARETTRIM = R++;
  src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+", re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
  var CARET = R++;
  src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
  var CARETLOOSE = R++;
  src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
  var COMPARATORLOOSE = R++;
  src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
  var COMPARATOR = R++;
  src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
  var COMPARATORTRIM = R++;
  src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")", 
  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
  var HYPHENRANGE = R++;
  src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
  var HYPHENRANGELOOSE = R++;
  src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
  var STAR = R++;
  src[STAR] = "(<|>)?=?\\s*\\*";
  for (var i = 0; i < 35; i++) debug(i, src[i]), re[i] || (re[i] = new RegExp(src[i]));
  function parse(version, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), version instanceof SemVer) return version;
    if ("string" != typeof version) return null;
    if (version.length > 256) return null;
    if (!(options.loose ? re[LOOSE] : re[FULL]).test(version)) return null;
    try {
      return new SemVer(version, options);
    } catch (er) {
      return null;
    }
  }
  function SemVer(version, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), version instanceof SemVer) {
      if (version.loose === options.loose) return version;
      version = version.version;
    } else if ("string" != typeof version) throw new TypeError("Invalid Version: " + version);
    if (version.length > 256) throw new TypeError("version is longer than 256 characters");
    if (!(this instanceof SemVer)) return new SemVer(version, options);
    debug("SemVer", version, options), this.options = options, this.loose = !!options.loose;
    var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
    if (!m) throw new TypeError("Invalid Version: " + version);
    if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
    this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
    m[4] ? this.prerelease = m[4].split(".").map((function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
      }
      return id;
    })) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
  }
  exports.parse = parse, exports.valid = function(version, options) {
    var v = parse(version, options);
    return v ? v.version : null;
  }, exports.clean = function(version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  }, exports.SemVer = SemVer, SemVer.prototype.format = function() {
    return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
    this.version;
  }, SemVer.prototype.toString = function() {
    return this.version;
  }, SemVer.prototype.compare = function(other) {
    return debug("SemVer.compare", this.version, this.options, other), other instanceof SemVer || (other = new SemVer(other, this.options)), 
    this.compareMain(other) || this.comparePre(other);
  }, SemVer.prototype.compareMain = function(other) {
    return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }, SemVer.prototype.comparePre = function(other) {
    if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
    if (!this.prerelease.length && other.prerelease.length) return 1;
    if (!this.prerelease.length && !other.prerelease.length) return 0;
    var i = 0;
    do {
      var a = this.prerelease[i], b = other.prerelease[i];
      if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
      if (void 0 === b) return 1;
      if (void 0 === a) return -1;
      if (a !== b) return compareIdentifiers(a, b);
    } while (++i);
  }, SemVer.prototype.inc = function(release, identifier) {
    switch (release) {
     case "premajor":
      this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
      break;

     case "preminor":
      this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
      break;

     case "prepatch":
      this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
      break;

     case "prerelease":
      0 === this.prerelease.length && this.inc("patch", identifier), this.inc("pre", identifier);
      break;

     case "major":
      0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
      this.minor = 0, this.patch = 0, this.prerelease = [];
      break;

     case "minor":
      0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
      this.prerelease = [];
      break;

     case "patch":
      0 === this.prerelease.length && this.patch++, this.prerelease = [];
      break;

     case "pre":
      if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
        for (var i = this.prerelease.length; --i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
        i = -2);
        -1 === i && this.prerelease.push(0);
      }
      identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
      break;

     default:
      throw new Error("invalid increment argument: " + release);
    }
    return this.format(), this.raw = this.version, this;
  }, exports.inc = function(version, release, loose, identifier) {
    "string" == typeof loose && (identifier = loose, loose = void 0);
    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }, exports.diff = function(version1, version2) {
    if (eq(version1, version2)) return null;
    var v1 = parse(version1), v2 = parse(version2), prefix = "";
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = "pre";
      var defaultResult = "prerelease";
    }
    for (var key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return prefix + key;
    return defaultResult;
  }, exports.compareIdentifiers = compareIdentifiers;
  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a), bnum = numeric.test(b);
    return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }
  function eq(a, b, loose) {
    return 0 === compare(a, b, loose);
  }
  function neq(a, b, loose) {
    return 0 !== compare(a, b, loose);
  }
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }
  function cmp(a, op, b, loose) {
    switch (op) {
     case "===":
      return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
      a === b;

     case "!==":
      return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
      a !== b;

     case "":
     case "=":
     case "==":
      return eq(a, b, loose);

     case "!=":
      return neq(a, b, loose);

     case ">":
      return gt(a, b, loose);

     case ">=":
      return gte(a, b, loose);

     case "<":
      return lt(a, b, loose);

     case "<=":
      return lte(a, b, loose);

     default:
      throw new TypeError("Invalid operator: " + op);
    }
  }
  function Comparator(comp, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), comp instanceof Comparator) {
      if (comp.loose === !!options.loose) return comp;
      comp = comp.value;
    }
    if (!(this instanceof Comparator)) return new Comparator(comp, options);
    debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, 
    this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, 
    debug("comp", this);
  }
  exports.rcompareIdentifiers = function(a, b) {
    return compareIdentifiers(b, a);
  }, exports.major = function(a, loose) {
    return new SemVer(a, loose).major;
  }, exports.minor = function(a, loose) {
    return new SemVer(a, loose).minor;
  }, exports.patch = function(a, loose) {
    return new SemVer(a, loose).patch;
  }, exports.compare = compare, exports.compareLoose = function(a, b) {
    return compare(a, b, !0);
  }, exports.rcompare = function(a, b, loose) {
    return compare(b, a, loose);
  }, exports.sort = function(list, loose) {
    return list.sort((function(a, b) {
      return exports.compare(a, b, loose);
    }));
  }, exports.rsort = function(list, loose) {
    return list.sort((function(a, b) {
      return exports.rcompare(a, b, loose);
    }));
  }, exports.gt = gt, exports.lt = lt, exports.eq = eq, exports.neq = neq, exports.gte = gte, 
  exports.lte = lte, exports.cmp = cmp, exports.Comparator = Comparator;
  var ANY = {};
  function Range(range, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), range instanceof Range) return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new Range(range.raw, options);
    if (range instanceof Comparator) return new Range(range.value, options);
    if (!(this instanceof Range)) return new Range(range, options);
    if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, 
    this.raw = range, this.set = range.split(/\s*\|\|\s*/).map((function(range) {
      return this.parseRange(range.trim());
    }), this).filter((function(c) {
      return c.length;
    })), !this.set.length) throw new TypeError("Invalid SemVer Range: " + range);
    this.format();
  }
  function isX(id) {
    return !id || "x" === id.toLowerCase() || "*" === id;
  }
  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    return ((from = isX(fM) ? "" : isX(fm) ? ">=" + fM + ".0.0" : isX(fp) ? ">=" + fM + "." + fm + ".0" : ">=" + from) + " " + (to = isX(tM) ? "" : isX(tm) ? "<" + (+tM + 1) + ".0.0" : isX(tp) ? "<" + tM + "." + (+tm + 1) + ".0" : tpr ? "<=" + tM + "." + tm + "." + tp + "-" + tpr : "<=" + to)).trim();
  }
  function testSet(set, version, options) {
    for (var i = 0; i < set.length; i++) if (!set[i].test(version)) return !1;
    if (version.prerelease.length && !options.includePrerelease) {
      for (i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== ANY && set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
      }
      return !1;
    }
    return !0;
  }
  function satisfies(version, range, options) {
    try {
      range = new Range(range, options);
    } catch (er) {
      return !1;
    }
    return range.test(version);
  }
  function outside(version, range, hilo, options) {
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (version = new SemVer(version, options), range = new Range(range, options), 
    hilo) {
     case ">":
      gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
      break;

     case "<":
      gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
      break;

     default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range, options)) return !1;
    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i], high = null, low = null;
      if (comparators.forEach((function(comparator) {
        comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, 
        low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
      })), high.operator === comp || high.operator === ecomp) return !1;
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return !1;
      if (low.operator === ecomp && ltfn(version, low.semver)) return !1;
    }
    return !0;
  }
  Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR], m = comp.match(r);
    if (!m) throw new TypeError("Invalid comparator: " + comp);
    this.operator = m[1], "=" === this.operator && (this.operator = ""), m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
  }, Comparator.prototype.toString = function() {
    return this.value;
  }, Comparator.prototype.test = function(version) {
    return debug("Comparator.test", version, this.options.loose), this.semver === ANY || ("string" == typeof version && (version = new SemVer(version, this.options)), 
    cmp(version, this.operator, this.semver, this.options));
  }, Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
    var rangeTmp;
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), "" === this.operator) return rangeTmp = new Range(comp.value, options), satisfies(this.value, rangeTmp, options);
    if ("" === comp.operator) return rangeTmp = new Range(this.value, options), satisfies(comp.semver, rangeTmp, options);
    var sameDirectionIncreasing = !(">=" !== this.operator && ">" !== this.operator || ">=" !== comp.operator && ">" !== comp.operator), sameDirectionDecreasing = !("<=" !== this.operator && "<" !== this.operator || "<=" !== comp.operator && "<" !== comp.operator), sameSemVer = this.semver.version === comp.semver.version, differentDirectionsInclusive = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== comp.operator && "<=" !== comp.operator), oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (">=" === this.operator || ">" === this.operator) && ("<=" === comp.operator || "<" === comp.operator), oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ("<=" === this.operator || "<" === this.operator) && (">=" === comp.operator || ">" === comp.operator);
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  }, exports.Range = Range, Range.prototype.format = function() {
    return this.range = this.set.map((function(comps) {
      return comps.join(" ").trim();
    })).join("||").trim(), this.range;
  }, Range.prototype.toString = function() {
    return this.range;
  }, Range.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace), debug("hyphen replace", range), range = range.replace(re[COMPARATORTRIM], "$1$2$3"), 
    debug("comparator trim", range, re[COMPARATORTRIM]), range = (range = (range = range.replace(re[TILDETRIM], "$1~")).replace(re[CARETTRIM], "$1^")).split(/\s+/).join(" ");
    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR], set = range.split(" ").map((function(comp) {
      return function(comp, options) {
        return debug("comp", comp, options), comp = function(comp, options) {
          return comp.trim().split(/\s+/).map((function(comp) {
            return function(comp, options) {
              debug("caret", comp, options);
              var r = options.loose ? re[CARETLOOSE] : re[CARET];
              return comp.replace(r, (function(_, M, m, p, pr) {
                var ret;
                return debug("caret", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = "0" === M ? ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0" : pr ? (debug("replaceCaret pr", pr), 
                ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0") : (debug("no pr"), 
                ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0"), 
                debug("caret return", ret), ret;
              }));
            }(comp, options);
          })).join(" ");
        }(comp, options), debug("caret", comp), comp = function(comp, options) {
          return comp.trim().split(/\s+/).map((function(comp) {
            return function(comp, options) {
              var r = options.loose ? re[TILDELOOSE] : re[TILDE];
              return comp.replace(r, (function(_, M, m, p, pr) {
                var ret;
                return debug("tilde", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : pr ? (debug("replaceTilde pr", pr), 
                ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0") : ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0", 
                debug("tilde return", ret), ret;
              }));
            }(comp, options);
          })).join(" ");
        }(comp, options), debug("tildes", comp), comp = function(comp, options) {
          return debug("replaceXRanges", comp, options), comp.split(/\s+/).map((function(comp) {
            return function(comp, options) {
              comp = comp.trim();
              var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
              return comp.replace(r, (function(ret, gtlt, M, m, p, pr) {
                debug("xRange", comp, ret, gtlt, M, m, p, pr);
                var xM = isX(M), xm = xM || isX(m), xp = xm || isX(p);
                return "=" === gtlt && xp && (gtlt = ""), xM ? ret = ">" === gtlt || "<" === gtlt ? "<0.0.0" : "*" : gtlt && xp ? (xm && (m = 0), 
                p = 0, ">" === gtlt ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, 
                p = 0)) : "<=" === gtlt && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), ret = gtlt + M + "." + m + "." + p) : xm ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : xp && (ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0"), 
                debug("xRange return", ret), ret;
              }));
            }(comp, options);
          })).join(" ");
        }(comp, options), debug("xrange", comp), comp = function(comp, options) {
          return debug("replaceStars", comp, options), comp.trim().replace(re[STAR], "");
        }(comp, options), debug("stars", comp), comp;
      }(comp, this.options);
    }), this).join(" ").split(/\s+/);
    return this.options.loose && (set = set.filter((function(comp) {
      return !!comp.match(compRe);
    }))), set = set.map((function(comp) {
      return new Comparator(comp, this.options);
    }), this);
  }, Range.prototype.intersects = function(range, options) {
    if (!(range instanceof Range)) throw new TypeError("a Range is required");
    return this.set.some((function(thisComparators) {
      return thisComparators.every((function(thisComparator) {
        return range.set.some((function(rangeComparators) {
          return rangeComparators.every((function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, options);
          }));
        }));
      }));
    }));
  }, exports.toComparators = function(range, options) {
    return new Range(range, options).set.map((function(comp) {
      return comp.map((function(c) {
        return c.value;
      })).join(" ").trim().split(" ");
    }));
  }, Range.prototype.test = function(version) {
    if (!version) return !1;
    "string" == typeof version && (version = new SemVer(version, this.options));
    for (var i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return !0;
    return !1;
  }, exports.satisfies = satisfies, exports.maxSatisfying = function(versions, range, options) {
    var max = null, maxSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    return versions.forEach((function(v) {
      rangeObj.test(v) && (max && -1 !== maxSV.compare(v) || (maxSV = new SemVer(max = v, options)));
    })), max;
  }, exports.minSatisfying = function(versions, range, options) {
    var min = null, minSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    return versions.forEach((function(v) {
      rangeObj.test(v) && (min && 1 !== minSV.compare(v) || (minSV = new SemVer(min = v, options)));
    })), min;
  }, exports.minVersion = function(range, loose) {
    range = new Range(range, loose);
    var minver = new SemVer("0.0.0");
    if (range.test(minver)) return minver;
    if (minver = new SemVer("0.0.0-0"), range.test(minver)) return minver;
    minver = null;
    for (var i = 0; i < range.set.length; ++i) {
      range.set[i].forEach((function(comparator) {
        var compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
         case ">":
          0 === compver.prerelease.length ? compver.patch++ : compver.prerelease.push(0), 
          compver.raw = compver.format();

         case "":
         case ">=":
          minver && !gt(minver, compver) || (minver = compver);
          break;

         case "<":
         case "<=":
          break;

         default:
          throw new Error("Unexpected operation: " + comparator.operator);
        }
      }));
    }
    if (minver && range.test(minver)) return minver;
    return null;
  }, exports.validRange = function(range, options) {
    try {
      return new Range(range, options).range || "*";
    } catch (er) {
      return null;
    }
  }, exports.ltr = function(version, range, options) {
    return outside(version, range, "<", options);
  }, exports.gtr = function(version, range, options) {
    return outside(version, range, ">", options);
  }, exports.outside = outside, exports.prerelease = function(version, options) {
    var parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }, exports.intersects = function(r1, r2, options) {
    return r1 = new Range(r1, options), r2 = new Range(r2, options), r1.intersects(r2);
  }, exports.coerce = function(version) {
    if (version instanceof SemVer) return version;
    if ("string" != typeof version) return null;
    var match = version.match(re[COERCE]);
    if (null == match) return null;
    return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
  };
} ]);