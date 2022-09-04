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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 4);
}([ function(module, exports, __webpack_require__) {
  "use strict";
  const processFn = (fn, opts) => function() {
    const P = opts.promiseModule, args = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) args[i] = arguments[i];
    return new P((resolve, reject) => {
      opts.errorFirst ? args.push((function(err, result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);
          for (let i = 1; i < arguments.length; i++) results[i - 1] = arguments[i];
          err ? (results.unshift(err), reject(results)) : resolve(results);
        } else err ? reject(err) : resolve(result);
      })) : args.push((function(result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);
          for (let i = 0; i < arguments.length; i++) results[i] = arguments[i];
          resolve(results);
        } else resolve(result);
      })), fn.apply(this, args);
    });
  };
  module.exports = (obj, opts) => {
    opts = Object.assign({
      exclude: [ /.+(Sync|Stream)$/ ],
      errorFirst: !0,
      promiseModule: Promise
    }, opts);
    const filter = key => {
      const match = pattern => "string" == typeof pattern ? key === pattern : pattern.test(key);
      return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
    };
    let ret;
    ret = "function" == typeof obj ? function() {
      return opts.excludeMain ? obj.apply(this, arguments) : processFn(obj, opts).apply(this, arguments);
    } : Object.create(Object.getPrototypeOf(obj));
    for (const key in obj) {
      const x = obj[key];
      ret[key] = "function" == typeof x && filter(key) ? processFn(x, opts) : x;
    }
    return ret;
  };
}, function(module, exports) {
  module.exports = require("./glob");
}, function(module, exports) {
  module.exports = require("path");
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const arrayUnion = __webpack_require__(5), glob = __webpack_require__(1), pify = __webpack_require__(0), dirGlob = __webpack_require__(7), gitignore = __webpack_require__(9), globP = pify(glob), DEFAULT_FILTER = () => !1, isNegative = pattern => "!" === pattern[0], generateGlobTasks = (patterns, taskOpts) => {
    (patterns => {
      if (!patterns.every(x => "string" == typeof x)) throw new TypeError("Patterns must be a string or an array of strings");
    })(patterns = [].concat(patterns));
    const globTasks = [];
    return taskOpts = Object.assign({
      cache: Object.create(null),
      statCache: Object.create(null),
      realpathCache: Object.create(null),
      symlinks: Object.create(null),
      ignore: [],
      expandDirectories: !0,
      nodir: !0
    }, taskOpts), patterns.forEach((pattern, i) => {
      if (isNegative(pattern)) return;
      const ignore = patterns.slice(i).filter(isNegative).map(pattern => pattern.slice(1)), opts = Object.assign({}, taskOpts, {
        ignore: taskOpts.ignore.concat(ignore)
      });
      globTasks.push({
        pattern: pattern,
        opts: opts
      });
    }), globTasks;
  }, getPattern = (task, fn) => task.opts.expandDirectories ? ((task, fn) => Array.isArray(task.opts.expandDirectories) ? fn(task.pattern, {
    files: task.opts.expandDirectories
  }) : "object" == typeof task.opts.expandDirectories ? fn(task.pattern, task.opts.expandDirectories) : fn(task.pattern))(task, fn) : [ task.pattern ];
  module.exports = (patterns, opts) => {
    let globTasks;
    try {
      globTasks = generateGlobTasks(patterns, opts);
    } catch (err) {
      return Promise.reject(err);
    }
    const getTasks = Promise.all(globTasks.map(task => Promise.resolve(getPattern(task, dirGlob)).then(globs => Promise.all(globs.map(glob => ({
      pattern: glob,
      opts: task.opts
    })))))).then(tasks => arrayUnion.apply(null, tasks));
    return Promise.resolve(opts && opts.gitignore ? gitignore({
      cwd: opts.cwd,
      ignore: opts.ignore
    }) : DEFAULT_FILTER).then(filter => getTasks.then(tasks => Promise.all(tasks.map(task => globP(task.pattern, task.opts)))).then(paths => arrayUnion.apply(null, paths)).then(paths => paths.filter(p => !filter(p))));
  }, module.exports.sync = (patterns, opts) => {
    const tasks = generateGlobTasks(patterns, opts).reduce((tasks, task) => {
      const newTask = getPattern(task, dirGlob.sync).map(glob => ({
        pattern: glob,
        opts: task.opts
      }));
      return tasks.concat(newTask);
    }, []), filter = opts && opts.gitignore ? gitignore.sync({
      cwd: opts.cwd,
      ignore: opts.ignore
    }) : DEFAULT_FILTER;
    return tasks.reduce((matches, task) => arrayUnion(matches, glob.sync(task.pattern, task.opts)), []).filter(p => !filter(p));
  }, module.exports.generateGlobTasks = generateGlobTasks, module.exports.hasMagic = (patterns, opts) => [].concat(patterns).some(pattern => glob.hasMagic(pattern, opts)), 
  module.exports.gitignore = gitignore;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var arrayUniq = __webpack_require__(6);
  module.exports = function() {
    return arrayUniq([].concat.apply([], arguments));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var ret;
  "Set" in global ? "function" == typeof Set.prototype.forEach && (ret = !1, new Set([ !0 ]).forEach((function(el) {
    ret = el;
  })), !0 === ret) ? module.exports = function(arr) {
    var ret = [];
    return new Set(arr).forEach((function(el) {
      ret.push(el);
    })), ret;
  } : module.exports = function(arr) {
    var seen = new Set;
    return arr.filter((function(el) {
      return !seen.has(el) && (seen.add(el), !0);
    }));
  } : module.exports = function(arr) {
    for (var ret = [], i = 0; i < arr.length; i++) -1 === ret.indexOf(arr[i]) && ret.push(arr[i]);
    return ret;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(2), pathType = __webpack_require__(8), getExtensions = extensions => extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0], getPath = (filepath, cwd) => {
    const pth = "!" === filepath[0] ? filepath.slice(1) : filepath;
    return path.isAbsolute(pth) ? pth : path.join(cwd, pth);
  }, getGlob = (dir, opts) => {
    if (opts.files && !Array.isArray(opts.files)) throw new TypeError(`Expected \`files\` to be of type \`Array\` but received type \`${typeof opts.files}\``);
    if (opts.extensions && !Array.isArray(opts.extensions)) throw new TypeError(`Expected \`extensions\` to be of type \`Array\` but received type \`${typeof opts.extensions}\``);
    return opts.files && opts.extensions ? opts.files.map(x => {
      return path.join(dir, (file = x, extensions = opts.extensions, path.extname(file) ? "**/" + file : `**/${file}.${getExtensions(extensions)}`));
      var file, extensions;
    }) : opts.files ? opts.files.map(x => path.join(dir, "**/" + x)) : opts.extensions ? [ path.join(dir, "**/*." + getExtensions(opts.extensions)) ] : [ path.join(dir, "**") ];
  };
  module.exports = (input, opts) => "string" != typeof (opts = Object.assign({
    cwd: process.cwd()
  }, opts)).cwd ? Promise.reject(new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof opts.cwd}\``)) : Promise.all([].concat(input).map(x => pathType.dir(getPath(x, opts.cwd)).then(isDir => isDir ? getGlob(x, opts) : x))).then(globs => [].concat.apply([], globs)), 
  module.exports.sync = (input, opts) => {
    if ("string" != typeof (opts = Object.assign({
      cwd: process.cwd()
    }, opts)).cwd) throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof opts.cwd}\``);
    const globs = [].concat(input).map(x => pathType.dirSync(getPath(x, opts.cwd)) ? getGlob(x, opts) : x);
    return [].concat.apply([], globs);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(3), pify = __webpack_require__(0);
  function type(fn, fn2, fp) {
    return "string" != typeof fp ? Promise.reject(new TypeError("Expected a string, got " + typeof fp)) : pify(fs[fn])(fp).then(stats => stats[fn2]()).catch(err => {
      if ("ENOENT" === err.code) return !1;
      throw err;
    });
  }
  function typeSync(fn, fn2, fp) {
    if ("string" != typeof fp) throw new TypeError("Expected a string, got " + typeof fp);
    try {
      return fs[fn](fp)[fn2]();
    } catch (err) {
      if ("ENOENT" === err.code) return !1;
      throw err;
    }
  }
  exports.file = type.bind(null, "stat", "isFile"), exports.dir = type.bind(null, "stat", "isDirectory"), 
  exports.symlink = type.bind(null, "lstat", "isSymbolicLink"), exports.fileSync = typeSync.bind(null, "statSync", "isFile"), 
  exports.dirSync = typeSync.bind(null, "statSync", "isDirectory"), exports.symlinkSync = typeSync.bind(null, "lstatSync", "isSymbolicLink");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(3), path = __webpack_require__(2), glob = __webpack_require__(1), gitIgnore = __webpack_require__(10), pify = __webpack_require__(0), slash = __webpack_require__(11), globP = pify(glob), readFileP = pify(fs.readFile), parseGitIgnore = (content, opts) => {
    const base = slash(path.relative(opts.cwd, path.dirname(opts.fileName)));
    return content.split(/\r?\n/).filter(Boolean).filter(l => "#" !== l.charAt(0)).map((base => ignore => ignore.startsWith("!") ? "!" + path.posix.join(base, ignore.substr(1)) : path.posix.join(base, ignore))(base));
  }, reduceIgnore = files => files.reduce((ignores, file) => (ignores.add(parseGitIgnore(file.content, {
    cwd: file.cwd,
    fileName: file.filePath
  })), ignores), gitIgnore()), getIsIgnoredPredecate = (ignores, cwd) => p => ignores.ignores(slash(path.relative(cwd, p))), normalizeOpts = opts => ({
    ignore: (opts = opts || {}).ignore || [],
    cwd: opts.cwd || process.cwd()
  });
  module.exports = o => {
    const opts = normalizeOpts(o);
    return globP("**/.gitignore", {
      ignore: opts.ignore,
      cwd: opts.cwd
    }).then(paths => Promise.all(paths.map(file => ((file, cwd) => {
      const filePath = path.join(cwd, file);
      return readFileP(filePath, "utf8").then(content => ({
        content: content,
        cwd: cwd,
        filePath: filePath
      }));
    })(file, opts.cwd)))).then(files => reduceIgnore(files)).then(ignores => getIsIgnoredPredecate(ignores, opts.cwd));
  }, module.exports.sync = o => {
    const opts = normalizeOpts(o), files = glob.sync("**/.gitignore", {
      ignore: opts.ignore,
      cwd: opts.cwd
    }).map(file => ((file, cwd) => {
      const filePath = path.join(cwd, file);
      return {
        content: fs.readFileSync(filePath, "utf8"),
        cwd: cwd,
        filePath: filePath
      };
    })(file, opts.cwd)), ignores = reduceIgnore(files);
    return getIsIgnoredPredecate(ignores, opts.cwd);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
      Constructor;
    };
  }();
  function make_array(subject) {
    return Array.isArray(subject) ? subject : [ subject ];
  }
  module.exports = function() {
    return new IgnoreBase;
  };
  var REGEX_BLANK_LINE = /^\s+$/, REGEX_LEADING_EXCAPED_EXCLAMATION = /^\\\!/, REGEX_LEADING_EXCAPED_HASH = /^\\#/, KEY_IGNORE = "undefined" != typeof Symbol ? Symbol.for("node-ignore") : "node-ignore", IgnoreBase = function() {
    function IgnoreBase() {
      !function(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
      }(this, IgnoreBase), this._rules = [], this[KEY_IGNORE] = !0, this._initCache();
    }
    return _createClass(IgnoreBase, [ {
      key: "_initCache",
      value: function() {
        this._cache = {};
      }
    }, {
      key: "add",
      value: function(pattern) {
        return this._added = !1, "string" == typeof pattern && (pattern = pattern.split(/\r?\n/g)), 
        make_array(pattern).forEach(this._addPattern, this), this._added && this._initCache(), 
        this;
      }
    }, {
      key: "addPattern",
      value: function(pattern) {
        return this.add(pattern);
      }
    }, {
      key: "_addPattern",
      value: function(pattern) {
        if (pattern && pattern[KEY_IGNORE]) return this._rules = this._rules.concat(pattern._rules), 
        void (this._added = !0);
        if (this._checkPattern(pattern)) {
          var rule = this._createRule(pattern);
          this._added = !0, this._rules.push(rule);
        }
      }
    }, {
      key: "_checkPattern",
      value: function(pattern) {
        return pattern && "string" == typeof pattern && !REGEX_BLANK_LINE.test(pattern) && 0 !== pattern.indexOf("#");
      }
    }, {
      key: "filter",
      value: function(paths) {
        var _this = this;
        return make_array(paths).filter((function(path) {
          return _this._filter(path);
        }));
      }
    }, {
      key: "createFilter",
      value: function() {
        var _this2 = this;
        return function(path) {
          return _this2._filter(path);
        };
      }
    }, {
      key: "ignores",
      value: function(path) {
        return !this._filter(path);
      }
    }, {
      key: "_createRule",
      value: function(pattern) {
        var origin = pattern, negative = !1;
        return 0 === pattern.indexOf("!") && (negative = !0, pattern = pattern.substr(1)), 
        {
          origin: origin,
          pattern: pattern = pattern.replace(REGEX_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_LEADING_EXCAPED_HASH, "#"),
          negative: negative,
          regex: function(pattern, negative) {
            var r = cache[pattern];
            if (r) return r;
            var source = (negative ? NEGATIVE_REPLACERS : POSITIVE_REPLACERS).reduce((function(prev, current) {
              return prev.replace(current[0], current[1].bind(pattern));
            }), pattern);
            return cache[pattern] = new RegExp(source, "i");
          }(pattern, negative)
        };
      }
    }, {
      key: "_filter",
      value: function(path, slices) {
        return !!path && (path in this._cache ? this._cache[path] : (slices || (slices = path.split("/")), 
        slices.pop(), this._cache[path] = slices.length ? this._filter(slices.join("/") + "/", slices) && this._test(path) : this._test(path)));
      }
    }, {
      key: "_test",
      value: function(path) {
        var matched = 0;
        return this._rules.forEach((function(rule) {
          matched ^ rule.negative || (matched = rule.negative ^ rule.regex.test(path));
        })), !matched;
      }
    } ]), IgnoreBase;
  }(), DEFAULT_REPLACER_PREFIX = [ [ /\\?\s+$/, function(match) {
    return 0 === match.indexOf("\\") ? " " : "";
  } ], [ /\\\s/g, function() {
    return " ";
  } ], [ /[\\\^$.|?*+()\[{]/g, function(match) {
    return "\\" + match;
  } ], [ /^\//, function() {
    return "^";
  } ], [ /\//g, function() {
    return "\\/";
  } ], [ /^\^*\\\*\\\*\\\//, function() {
    return "^(?:.*\\/)?";
  } ] ], DEFAULT_REPLACER_SUFFIX = [ [ /^(?=[^\^])/, function() {
    return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
  } ], [ /\\\/\\\*\\\*(?=\\\/|$)/g, function(match, index, str) {
    return index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+";
  } ], [ /(^|[^\\]+)\\\*(?=.+)/g, function(match, p1) {
    return p1 + "[^\\/]*";
  } ], [ /(\^|\\\/)?\\\*$/, function(match, p1) {
    return (p1 ? p1 + "[^/]+" : "[^/]*") + "(?=$|\\/$)";
  } ], [ /\\\\\\/g, function() {
    return "\\";
  } ] ], POSITIVE_REPLACERS = [].concat(DEFAULT_REPLACER_PREFIX, [ [ /(?:[^*\/])$/, function(match) {
    return match + "(?=$|\\/)";
  } ] ], DEFAULT_REPLACER_SUFFIX), NEGATIVE_REPLACERS = [].concat(DEFAULT_REPLACER_PREFIX, [ [ /(?:[^*])$/, function(match) {
    return match + "(?=$|\\/$)";
  } ] ], DEFAULT_REPLACER_SUFFIX), cache = {};
  if ("undefined" != typeof process && (process.env && process.env.IGNORE_TEST_WIN32 || "win32" === process.platform)) {
    var filter = IgnoreBase.prototype._filter;
    IgnoreBase.prototype._filter = function(path, slices) {
      var str;
      return path = /^\\\\\?\\/.test(str = path) || /[^\x00-\x80]+/.test(str) ? str : str.replace(/\\/g, "/"), 
      filter.call(this, path, slices);
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(str) {
    var isExtendedLengthPath = /^\\\\\?\\/.test(str), hasNonAscii = /[^\x00-\x80]+/.test(str);
    return isExtendedLengthPath || hasNonAscii ? str : str.replace(/\\/g, "/");
  };
} ]);