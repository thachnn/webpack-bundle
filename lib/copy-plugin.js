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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 9);
}([ function(module, exports) {
  module.exports = require("path");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const noop = () => {}, levels = Symbol("levels"), instance = Symbol("instance");
  module.exports = class {
    constructor(logger) {
      this[levels] = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, this[instance] = logger;
    }
    set logger(logger) {
      this[instance] = logger;
    }
    get logger() {
      return this[instance];
    }
    get levels() {
      return this[levels];
    }
    get methods() {
      return Object.keys(this.levels).map(key => key.toLowerCase()).filter(key => "silent" !== key);
    }
    distillLevel(level) {
      let result = level;
      if ("string" == typeof result && void 0 !== this.levels[result.toUpperCase()] && (result = this.levels[result.toUpperCase()]), 
      this.levelValid(result)) return result;
    }
    levelValid(level) {
      return "number" == typeof level && level >= 0 && level <= this.levels.SILENT;
    }
    make(method) {
      return "debug" === method && (method = "log"), void 0 !== console[method] ? this.bindMethod(console, method) : void 0 !== console.log ? this.bindMethod(console, "log") : noop;
    }
    bindMethod(obj, name) {
      const method = obj[name];
      if ("function" == typeof method.bind) return method.bind(obj);
      try {
        return Function.prototype.bind.call(method, obj);
      } catch (err) {
        return function() {
          return Function.prototype.apply.apply(method, [ obj, arguments ]);
        };
      }
    }
    replaceMethods(logLevel) {
      const level = this.distillLevel(logLevel);
      if (null == level) throw new Error("loglevel: replaceMethods() called with invalid level: " + logLevel);
      if (!this.logger || "LogLevel" !== this.logger.type) throw new TypeError("loglevel: Logger is undefined or invalid. Please specify a valid Logger instance.");
      this.methods.forEach(method => {
        this.logger[method] = this.levels[method.toUpperCase()] < level ? noop : this.make(method);
      }), this.logger.log = this.logger.debug;
    }
  };
}, function(module, exports) {
  module.exports = require("crypto");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const MethodFactory = __webpack_require__(1), defaults = {
    name: options => options.logger.name,
    time: () => (new Date).toTimeString().split(" ")[0],
    level: options => `[${options.level}]`,
    template: "{{time}} {{level}} "
  };
  module.exports = class extends MethodFactory {
    constructor(logger, options) {
      super(logger), this.options = Object.assign({}, defaults, options);
    }
    interpolate(level) {
      return this.options.template.replace(/{{([^{}]*)}}/g, (stache, prop) => {
        const fn = this.options[prop];
        return fn ? fn({
          level: level,
          logger: this.logger
        }) : stache;
      });
    }
    make(method) {
      const og = super.make(method);
      return (...args) => {
        const [first] = args, output = this.interpolate(method);
        "string" == typeof first ? args[0] = output + first : args.unshift(output), og(...args);
      };
    }
  };
}, function(module, exports) {
  module.exports = function(str) {
    if ("string" != typeof str || "" === str) return !1;
    for (var match; match = /(\\).|([@?!+*]\(.*\))/g.exec(str); ) {
      if (match[2]) return !0;
      str = str.slice(match.index + match[0].length);
    }
    return !1;
  };
}, function(module, exports) {
  module.exports = require("os");
}, function(module, exports) {
  module.exports = function(path, stripTrailing) {
    if ("string" != typeof path) throw new TypeError("expected path to be a string");
    if ("\\" === path || "/" === path) return "/";
    var len = path.length;
    if (len <= 1) return path;
    var prefix = "";
    if (len > 4 && "\\" === path[3]) {
      var ch = path[2];
      "?" !== ch && "." !== ch || "\\\\" !== path.slice(0, 2) || (path = path.slice(2), 
      prefix = "//");
    }
    var segs = path.split(/[/\\]+/);
    return !1 !== stripTrailing && "" === segs[segs.length - 1] && segs.pop(), prefix + segs.join("/");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = val => "[object Object]" === Object.prototype.toString.call(val);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.readFile = exports.stat = void 0;
  exports.stat = (inputFileSystem, path) => new Promise((resolve, reject) => {
    inputFileSystem.stat(path, (err, stats) => {
      err && reject(err), resolve(stats);
    });
  });
  exports.readFile = (inputFileSystem, path) => new Promise((resolve, reject) => {
    inputFileSystem.readFile(path, (err, stats) => {
      err && reject(err), resolve(stats);
    });
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  const plugin = __webpack_require__(10);
  module.exports = plugin.default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _path = _interopRequireDefault(__webpack_require__(0)), _schemaUtils = _interopRequireDefault(__webpack_require__(11)), _webpackLog = _interopRequireDefault(__webpack_require__(12)), _options = _interopRequireDefault(__webpack_require__(20)), _preProcessPattern = _interopRequireDefault(__webpack_require__(21)), _processPattern = _interopRequireDefault(__webpack_require__(29)), _postProcessPattern = _interopRequireDefault(__webpack_require__(37));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  var _default = class {
    constructor(patterns = [], options = {}) {
      (0, _schemaUtils.default)(_options.default, patterns, this.constructor.name), this.patterns = patterns, 
      this.options = options;
    }
    apply(compiler) {
      const fileDependencies = new Set, contextDependencies = new Set, written = {};
      let context;
      this.options.context ? _path.default.isAbsolute(this.options.context) ? ({context: context} = this.options) : context = _path.default.join(compiler.options.context, this.options.context) : ({context: context} = compiler.options);
      const logger = (0, _webpackLog.default)({
        name: "copy-webpack-plugin",
        level: this.options.logLevel || "warn"
      }), plugin = {
        name: "CopyPlugin"
      };
      compiler.hooks.emit.tapAsync(plugin, (compilation, callback) => {
        logger.debug("starting emit");
        const globalRef = {
          logger: logger,
          compilation: compilation,
          written: written,
          fileDependencies: fileDependencies,
          contextDependencies: contextDependencies,
          context: context,
          inputFileSystem: compiler.inputFileSystem,
          output: compiler.options.output.path,
          ignore: this.options.ignore || [],
          copyUnmodified: this.options.copyUnmodified,
          concurrency: this.options.concurrency
        };
        "/" === globalRef.output && compiler.options.devServer && compiler.options.devServer.outputPath && (globalRef.output = compiler.options.devServer.outputPath);
        const {patterns: patterns} = this;
        Promise.all(patterns.map(pattern => Promise.resolve().then(() => (0, _preProcessPattern.default)(globalRef, pattern)).then(pattern => (0, 
        _processPattern.default)(globalRef, pattern).then(files => files ? Promise.all(files.filter(Boolean).map(file => (0, 
        _postProcessPattern.default)(globalRef, pattern, file))) : Promise.resolve())))).catch(error => {
          compilation.errors.push(error);
        }).then(() => {
          logger.debug("finishing emit"), callback();
        });
      }), compiler.hooks.afterEmit.tapAsync(plugin, (compilation, callback) => {
        if (logger.debug("starting after-emit"), "addAll" in compilation.fileDependencies) compilation.fileDependencies.addAll(fileDependencies); else for (const fileDependency of fileDependencies) compilation.fileDependencies.add(fileDependency);
        if ("addAll" in compilation.contextDependencies) compilation.contextDependencies.addAll(contextDependencies); else for (const contextDependency of contextDependencies) compilation.contextDependencies.add(contextDependency);
        logger.debug("finishing after-emit"), callback();
      });
    }
  };
  exports.default = _default;
}, function(module, exports) {
  module.exports = require("./schema-utils");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const uuid = __webpack_require__(13), colors = __webpack_require__(16), loglevel = __webpack_require__(18), symbols = {
    trace: colors.grey("₸"),
    debug: colors.cyan("➤"),
    info: colors.blue(colors.symbols.info),
    warn: colors.yellow(colors.symbols.warning),
    error: colors.red(colors.symbols.cross)
  }, defaults = {
    name: "<unknown>",
    level: "info",
    unique: !0
  }, prefix = {
    level: options => symbols[options.level],
    template: `{{level}} ${colors.gray("｢{{name}}｣")}: `
  };
  module.exports = function(options) {
    const opts = Object.assign({}, defaults, options), {id: id} = options;
    opts.prefix = Object.assign({}, prefix, options.prefix), delete opts.id, Object.defineProperty(opts, "id", {
      get() {
        return id || this.name + (opts.unique ? "-" + uuid() : "");
      }
    }), opts.timestamp && (opts.prefix.template = "[{{time}}] " + opts.prefix.template);
    const log = loglevel.getLogger(opts);
    return Object.prototype.hasOwnProperty.call(log, "id") || Object.defineProperty(log, "id", {
      get: () => opts.id
    }), log;
  }, module.exports.colors = colors, module.exports.delLogger = function(name) {
    delete loglevel.loggers[name];
  }, module.exports.factories = loglevel.factories;
}, function(module, exports, __webpack_require__) {
  var rng = __webpack_require__(14), bytesToUuid = __webpack_require__(15);
  module.exports = function(options, buf, offset) {
    var i = buf && offset || 0;
    "string" == typeof options && (buf = "binary" === options ? new Array(16) : null, 
    options = null);
    var rnds = (options = options || {}).random || (options.rng || rng)();
    if (rnds[6] = 15 & rnds[6] | 64, rnds[8] = 63 & rnds[8] | 128, buf) for (var ii = 0; ii < 16; ++ii) buf[i + ii] = rnds[ii];
    return buf || bytesToUuid(rnds);
  };
}, function(module, exports, __webpack_require__) {
  var crypto = __webpack_require__(2);
  module.exports = function() {
    return crypto.randomBytes(16);
  };
}, function(module, exports) {
  for (var byteToHex = [], i = 0; i < 256; ++i) byteToHex[i] = (i + 256).toString(16).substr(1);
  module.exports = function(buf, offset) {
    var i = offset || 0, bth = byteToHex;
    return [ bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]] ].join("");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const colors = {
    enabled: !0,
    visible: !0,
    styles: {},
    keys: {}
  };
  "FORCE_COLOR" in process.env && (colors.enabled = "0" !== process.env.FORCE_COLOR);
  const wrap = (style, str, nl) => {
    let {open: open, close: close, regex: regex} = style;
    return str = open + (str.includes(close) ? str.replace(regex, close + open) : str) + close, 
    nl ? str.replace(/\r?\n/g, `${close}$&${open}`) : str;
  }, define = (name, codes, type) => {
    colors.styles[name] = (style => (style.open = `[${style.codes[0]}m`, style.close = `[${style.codes[1]}m`, 
    style.regex = new RegExp(`\\u001b\\[${style.codes[1]}m`, "g"), style))({
      name: name,
      codes: codes
    }), (colors.keys[type] || (colors.keys[type] = [])).push(name), Reflect.defineProperty(colors, name, {
      get() {
        let color = input => ((input, stack) => {
          if ("" === input || null == input) return "";
          if (!1 === colors.enabled) return input;
          if (!1 === colors.visible) return "";
          let str = "" + input, nl = str.includes("\n"), n = stack.length;
          for (;n-- > 0; ) str = wrap(colors.styles[stack[n]], str, nl);
          return str;
        })(input, color.stack);
        return Reflect.setPrototypeOf(color, colors), color.stack = this.stack ? this.stack.concat(name) : [ name ], 
        color;
      }
    });
  };
  define("reset", [ 0, 0 ], "modifier"), define("bold", [ 1, 22 ], "modifier"), define("dim", [ 2, 22 ], "modifier"), 
  define("italic", [ 3, 23 ], "modifier"), define("underline", [ 4, 24 ], "modifier"), 
  define("inverse", [ 7, 27 ], "modifier"), define("hidden", [ 8, 28 ], "modifier"), 
  define("strikethrough", [ 9, 29 ], "modifier"), define("black", [ 30, 39 ], "color"), 
  define("red", [ 31, 39 ], "color"), define("green", [ 32, 39 ], "color"), define("yellow", [ 33, 39 ], "color"), 
  define("blue", [ 34, 39 ], "color"), define("magenta", [ 35, 39 ], "color"), define("cyan", [ 36, 39 ], "color"), 
  define("white", [ 37, 39 ], "color"), define("gray", [ 90, 39 ], "color"), define("grey", [ 90, 39 ], "color"), 
  define("bgBlack", [ 40, 49 ], "bg"), define("bgRed", [ 41, 49 ], "bg"), define("bgGreen", [ 42, 49 ], "bg"), 
  define("bgYellow", [ 43, 49 ], "bg"), define("bgBlue", [ 44, 49 ], "bg"), define("bgMagenta", [ 45, 49 ], "bg"), 
  define("bgCyan", [ 46, 49 ], "bg"), define("bgWhite", [ 47, 49 ], "bg"), define("blackBright", [ 90, 39 ], "bright"), 
  define("redBright", [ 91, 39 ], "bright"), define("greenBright", [ 92, 39 ], "bright"), 
  define("yellowBright", [ 93, 39 ], "bright"), define("blueBright", [ 94, 39 ], "bright"), 
  define("magentaBright", [ 95, 39 ], "bright"), define("cyanBright", [ 96, 39 ], "bright"), 
  define("whiteBright", [ 97, 39 ], "bright"), define("bgBlackBright", [ 100, 49 ], "bgBright"), 
  define("bgRedBright", [ 101, 49 ], "bgBright"), define("bgGreenBright", [ 102, 49 ], "bgBright"), 
  define("bgYellowBright", [ 103, 49 ], "bgBright"), define("bgBlueBright", [ 104, 49 ], "bgBright"), 
  define("bgMagentaBright", [ 105, 49 ], "bgBright"), define("bgCyanBright", [ 106, 49 ], "bgBright"), 
  define("bgWhiteBright", [ 107, 49 ], "bgBright");
  const re = colors.ansiRegex = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
  colors.hasColor = colors.hasAnsi = str => (re.lastIndex = 0, !!str && "string" == typeof str && re.test(str)), 
  colors.unstyle = str => (re.lastIndex = 0, "string" == typeof str ? str.replace(re, "") : str), 
  colors.none = colors.clear = colors.noop = str => str, colors.stripColor = colors.unstyle, 
  colors.symbols = __webpack_require__(17), colors.define = define, module.exports = colors;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const isWindows = "win32" === process.platform, isLinux = "linux" === process.platform, windows = {
    bullet: "•",
    check: "√",
    cross: "×",
    ellipsis: "...",
    heart: "❤",
    info: "i",
    line: "─",
    middot: "·",
    minus: "－",
    plus: "＋",
    question: "?",
    questionSmall: "﹖",
    pointer: ">",
    pointerSmall: "»",
    warning: "‼"
  }, other = {
    ballotCross: "✘",
    bullet: "•",
    check: "✔",
    cross: "✖",
    ellipsis: "…",
    heart: "❤",
    info: "ℹ",
    line: "─",
    middot: "·",
    minus: "－",
    plus: "＋",
    question: "?",
    questionFull: "？",
    questionSmall: "﹖",
    pointer: isLinux ? "▸" : "❯",
    pointerSmall: isLinux ? "‣" : "›",
    warning: "⚠"
  };
  module.exports = isWindows ? windows : other, Reflect.defineProperty(module.exports, "windows", {
    enumerable: !1,
    value: windows
  }), Reflect.defineProperty(module.exports, "other", {
    enumerable: !1,
    value: other
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  const LogLevel = __webpack_require__(19), MethodFactory = __webpack_require__(1), PrefixFactory = __webpack_require__(3), defaultLogger = new LogLevel({
    name: "default"
  }), cache = {
    default: defaultLogger
  }, existing = "undefined" != typeof window ? window.log : null, loglevel = Object.assign(defaultLogger, {
    get factories() {
      return {
        MethodFactory: MethodFactory,
        PrefixFactory: PrefixFactory
      };
    },
    get loggers() {
      return cache;
    },
    getLogger(options) {
      "string" == typeof options && (options = {
        name: options
      }), options.id || (options.id = options.name);
      const {name: name, id: id} = options, defaults = {
        level: defaultLogger.level
      };
      if ("string" != typeof name || !name || !name.length) throw new TypeError("You must supply a name when creating a logger");
      let logger = cache[id];
      return logger || (logger = new LogLevel(Object.assign({}, defaults, options)), cache[id] = logger), 
      logger;
    },
    noConflict: () => ("undefined" != typeof window && window.log === defaultLogger && (window.log = existing), 
    defaultLogger)
  });
  module.exports = loglevel;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const PrefixFactory = __webpack_require__(3), MethodFactory = __webpack_require__(1), defaults = {
    name: +new Date,
    level: "warn",
    prefix: null,
    factory: null
  };
  module.exports = class {
    constructor(options) {
      if (this.type = "LogLevel", this.options = Object.assign({}, defaults, options), 
      this.methodFactory = options.factory, !this.methodFactory) {
        const factory = options.prefix ? new PrefixFactory(this, options.prefix) : new MethodFactory(this);
        this.methodFactory = factory;
      }
      this.methodFactory.logger || (this.methodFactory.logger = this), this.name = options.name || "<unknown>", 
      this.level = this.options.level;
    }
    get factory() {
      return this.methodFactory;
    }
    set factory(factory) {
      factory.logger = this, this.methodFactory = factory, this.methodFactory.replaceMethods(this.level);
    }
    enable() {
      this.level = this.levels.TRACE;
    }
    disable() {
      this.level = this.levels.SILENT;
    }
    get level() {
      return this.currentLevel;
    }
    set level(logLevel) {
      const level = this.methodFactory.distillLevel(logLevel);
      if (null == level) throw new Error("loglevel: setLevel() called with invalid level: " + logLevel);
      this.currentLevel = level, this.methodFactory.replaceMethods(level), "undefined" == typeof console && level < this.levels.SILENT && console.warn("loglevel: console is undefined. The log will produce no output");
    }
    get levels() {
      return this.methodFactory.levels;
    }
  };
}, function(module) {
  module.exports = JSON.parse('{"definitions":{"ObjectPattern":{"type":"object","properties":{"from":{"anyOf":[{"type":"string","minLength":1},{"type":"object"}]},"to":{"type":"string"},"context":{"type":"string"},"toType":{"enum":["dir","file","template"]},"test":{"anyOf":[{"type":"string"},{"instanceof":"RegExp"}]},"force":{"type":"boolean"},"ignore":{"type":"array","items":{"anyOf":[{"type":"string"},{"type":"object"}]}},"flatten":{"type":"boolean"},"cache":{"anyOf":[{"type":"boolean"},{"type":"object"}]},"transform":{"instanceof":"Function"},"transformPath":{"instanceof":"Function"}},"required":["from"]},"StringPattern":{"type":"string","minLength":1}},"type":"array","items":{"anyOf":[{"$ref":"#/definitions/StringPattern"},{"$ref":"#/definitions/ObjectPattern"}]}}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(globalRef, pattern) {
    const {logger: logger, context: context, inputFileSystem: inputFileSystem, fileDependencies: fileDependencies, contextDependencies: contextDependencies, compilation: compilation} = globalRef;
    (pattern = "string" == typeof pattern ? {
      from: pattern
    } : Object.assign({}, pattern)).to = pattern.to || "", pattern.context = pattern.context || context, 
    _path.default.isAbsolute(pattern.context) || (pattern.context = _path.default.join(context, pattern.context));
    const isFromGlobPatten = (0, _isObject.default)(pattern.from) && pattern.from.glob || pattern.globOptions, isToDirectory = "" === _path.default.extname(pattern.to) || pattern.to.slice(-1) === _path.default.sep;
    switch (pattern.from = isFromGlobPatten ? pattern.from : _path.default.normalize(pattern.from), 
    pattern.context = _path.default.normalize(pattern.context), pattern.to = _path.default.normalize(pattern.to), 
    pattern.ignore = globalRef.ignore.concat(pattern.ignore || []), logger.debug(`processing from: '${pattern.from}' to: '${pattern.to}'`), 
    !0) {
     case !!pattern.toType:
      break;

     case (0, _isTemplateLike.default)(pattern.to):
      pattern.toType = "template";
      break;

     case isToDirectory:
      pattern.toType = "dir";
      break;

     default:
      pattern.toType = "file";
    }
    if (isFromGlobPatten) {
      logger.debug(`determined '${pattern.absoluteFrom}' is a glob`), pattern.fromType = "glob";
      const globOptions = Object.assign({}, pattern.globOptions ? pattern.globOptions : pattern.from);
      return delete globOptions.glob, pattern.absoluteFrom = _path.default.resolve(pattern.context, pattern.globOptions ? pattern.from : pattern.from.glob), 
      pattern.glob = (0, _normalize.default)(pattern.context, pattern.globOptions ? pattern.from : pattern.from.glob), 
      pattern.globOptions = globOptions, Promise.resolve(pattern);
    }
    _path.default.isAbsolute(pattern.from) ? pattern.absoluteFrom = pattern.from : pattern.absoluteFrom = _path.default.resolve(pattern.context, pattern.from);
    logger.debug(`determined '${pattern.from}' to be read from '${pattern.absoluteFrom}'`);
    const noStatsHandler = () => {
      if ((0, _isGlob.default)(pattern.from) || pattern.from.includes("*")) logger.debug(`determined '${pattern.absoluteFrom}' is a glob`), 
      pattern.fromType = "glob", pattern.glob = (0, _normalize.default)(pattern.context, pattern.from), 
      contextDependencies.add(_path.default.normalize((0, _globParent.default)(pattern.absoluteFrom))); else {
        const newWarning = new Error(`unable to locate '${pattern.from}' at '${pattern.absoluteFrom}'`);
        compilation.warnings.some(warning => warning.message === newWarning.message) || (logger.warn(newWarning.message), 
        compilation.warnings.push(newWarning)), pattern.fromType = "nonexistent";
      }
    };
    return logger.debug(`getting stats for '${pattern.absoluteFrom}' to determinate 'fromType'`), 
    (0, _promisify.stat)(inputFileSystem, pattern.absoluteFrom).catch(() => noStatsHandler()).then(stats => stats ? (stats.isDirectory() ? (logger.debug(`determined '${pattern.absoluteFrom}' is a directory`), 
    contextDependencies.add(pattern.absoluteFrom), pattern.fromType = "dir", pattern.context = pattern.absoluteFrom, 
    pattern.glob = (0, _normalize.default)(pattern.absoluteFrom, "**/*"), pattern.absoluteFrom = _path.default.join(pattern.absoluteFrom, "**/*"), 
    pattern.globOptions = {
      dot: !0
    }) : stats.isFile() ? (logger.debug(`determined '${pattern.absoluteFrom}' is a file`), 
    fileDependencies.add(pattern.absoluteFrom), pattern.stats = stats, pattern.fromType = "file", 
    pattern.context = _path.default.dirname(pattern.absoluteFrom), pattern.glob = (0, 
    _normalize.default)(pattern.absoluteFrom), pattern.globOptions = {
      dot: !0
    }) : pattern.fromType || logger.warn("unrecognized file type for " + pattern.from), 
    pattern) : (noStatsHandler(), pattern));
  };
  var _path = _interopRequireDefault(__webpack_require__(0)), _isGlob = _interopRequireDefault(__webpack_require__(22)), _globParent = _interopRequireDefault(__webpack_require__(23)), _normalize = _interopRequireDefault(__webpack_require__(27)), _isTemplateLike = _interopRequireDefault(__webpack_require__(28)), _isObject = _interopRequireDefault(__webpack_require__(7)), _promisify = __webpack_require__(8);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  var isExtglob = __webpack_require__(4), chars = {
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  __webpack_require__(0);
  var isglob = __webpack_require__(24), pathDirname = __webpack_require__(25), isWin32 = "win32" === __webpack_require__(5).platform();
  module.exports = function(str) {
    isWin32 && str.indexOf("/") < 0 && (str = str.split("\\").join("/")), /[\{\[].*[\/]*.*[\}\]]$/.test(str) && (str += "/"), 
    str += "a";
    do {
      str = pathDirname.posix(str);
    } while (isglob(str) || /(^|[^\\])([\{\[]|\([^\)]+$)/.test(str));
    return str.replace(/\\([\*\?\|\[\]\(\)\{\}])/g, "$1");
  };
}, function(module, exports, __webpack_require__) {
  var isExtglob = __webpack_require__(4);
  module.exports = function(str) {
    if ("string" != typeof str || "" === str) return !1;
    if (isExtglob(str)) return !0;
    for (var match, regex = /(\\).|([*?]|\[.*\]|\{.*\}|\(.*\|.*\)|^!)/; match = regex.exec(str); ) {
      if (match[2]) return !0;
      str = str.slice(match.index + match[0].length);
    }
    return !1;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  __webpack_require__(0);
  var inspect = __webpack_require__(26).inspect;
  function assertPath(path) {
    if ("string" != typeof path) throw new TypeError("Path must be a string. Received " + inspect(path));
  }
  function posix(path) {
    if (assertPath(path), 0 === path.length) return ".";
    for (var code = path.charCodeAt(0), hasRoot = 47 === code, end = -1, matchedSlash = !0, i = path.length - 1; i >= 1; --i) if (47 === (code = path.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else matchedSlash = !1;
    return -1 === end ? hasRoot ? "/" : "." : hasRoot && 1 === end ? "//" : path.slice(0, end);
  }
  function win32(path) {
    assertPath(path);
    var len = path.length;
    if (0 === len) return ".";
    var rootEnd = -1, end = -1, matchedSlash = !0, offset = 0, code = path.charCodeAt(0);
    if (len > 1) if (47 === code || 92 === code) {
      if (rootEnd = offset = 1, 47 === (code = path.charCodeAt(1)) || 92 === code) {
        for (var j = 2, last = j; j < len && (47 !== (code = path.charCodeAt(j)) && 92 !== code); ++j) ;
        if (j < len && j !== last) {
          for (last = j; j < len && (47 === (code = path.charCodeAt(j)) || 92 === code); ++j) ;
          if (j < len && j !== last) {
            for (last = j; j < len && (47 !== (code = path.charCodeAt(j)) && 92 !== code); ++j) ;
            if (j === len) return path;
            j !== last && (rootEnd = offset = j + 1);
          }
        }
      }
    } else (code >= 65 && code <= 90 || code >= 97 && code <= 122) && (code = path.charCodeAt(1), 
    58 === path.charCodeAt(1) && (rootEnd = offset = 2, len > 2 && (47 !== (code = path.charCodeAt(2)) && 92 !== code || (rootEnd = offset = 3)))); else if (47 === code || 92 === code) return path[0];
    for (var i = len - 1; i >= offset; --i) if (47 === (code = path.charCodeAt(i)) || 92 === code) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else matchedSlash = !1;
    if (-1 === end) {
      if (-1 === rootEnd) return ".";
      end = rootEnd;
    }
    return path.slice(0, end);
  }
  module.exports = "win32" === process.platform ? win32 : posix, module.exports.posix = posix, 
  module.exports.win32 = win32;
}, function(module, exports) {
  module.exports = require("util");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(context, from) {
    return (0, _normalizePath.default)(function(context, from) {
      if (from && _path.default.isAbsolute(from)) return from;
      const absoluteContext = _path.default.resolve(context).replace(/[\*|\?|\!|\(|\)|\[|\]|\{|\}]/g, substring => `[${substring}]`);
      if (!from) return absoluteContext;
      if (absoluteContext.endsWith("/")) return `${absoluteContext}${from}`;
      return `${absoluteContext}/${from}`;
    }(context, from));
  };
  var _path = _interopRequireDefault(__webpack_require__(0)), _normalizePath = _interopRequireDefault(__webpack_require__(6));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = pattern => /(\[ext\])|(\[name\])|(\[path\])|(\[folder\])|(\[emoji(?::(\d+))?\])|(\[(?:([^:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*))?(?::(\d+))?\])|(\[\d+\])/.test(pattern);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(globalRef, pattern) {
    const {logger: logger, output: output, concurrency: concurrency, compilation: compilation} = globalRef, globOptions = Object.assign({
      cwd: pattern.context,
      follow: !0
    }, pattern.globOptions || {});
    if ("nonexistent" === pattern.fromType) return Promise.resolve();
    const limit = (0, _pLimit.default)(concurrency || 100);
    return logger.info(`begin globbing '${pattern.glob}' with a context of '${pattern.context}'`), 
    (0, _globby.default)(pattern.glob, globOptions).then(paths => Promise.all(paths.map(from => limit(() => {
      const file = {
        force: pattern.force,
        absoluteFrom: _path.default.resolve(pattern.context, from)
      };
      file.relativeFrom = _path.default.relative(pattern.context, file.absoluteFrom), 
      pattern.flatten && (file.relativeFrom = _path.default.basename(file.relativeFrom)), 
      logger.debug("found " + from);
      let il = pattern.ignore.length;
      for (;il--; ) {
        const ignoreGlob = pattern.ignore[il];
        let glob, globParams = {
          dot: !0,
          matchBase: !0
        };
        if ("string" == typeof ignoreGlob) glob = ignoreGlob; else if ((0, _isObject.default)(ignoreGlob)) {
          glob = ignoreGlob.glob || "";
          const ignoreGlobParams = Object.assign({}, ignoreGlob);
          delete ignoreGlobParams.glob, globParams = Object.assign(globParams, ignoreGlobParams);
        } else glob = "";
        if (logger.debug(`testing ${glob} against ${file.relativeFrom}`), (0, _minimatch.default)(file.relativeFrom, glob, globParams)) return logger.info(`ignoring '${file.relativeFrom}', because it matches the ignore glob '${glob}'`), 
        Promise.resolve();
        logger.debug(`${glob} doesn't match ${file.relativeFrom}`);
      }
      if ("dir" === pattern.toType ? file.webpackTo = _path.default.join(pattern.to, file.relativeFrom) : "file" === pattern.toType ? file.webpackTo = pattern.to || file.relativeFrom : "template" === pattern.toType && (file.webpackTo = pattern.to, 
      file.webpackToRegExp = pattern.test), _path.default.isAbsolute(file.webpackTo)) {
        if ("/" === output) {
          const message = "using older versions of webpack-dev-server, devServer.outputPath must be defined to write to absolute paths";
          logger.error(message), compilation.errors.push(new Error(message));
        }
        file.webpackTo = _path.default.relative(output, file.webpackTo);
      }
      return logger.info(`determined that '${from}' should write to '${file.webpackTo}'`), 
      file;
    }))));
  };
  var _path = _interopRequireDefault(__webpack_require__(0)), _globby = _interopRequireDefault(__webpack_require__(30)), _pLimit = _interopRequireDefault(__webpack_require__(31)), _minimatch = _interopRequireDefault(__webpack_require__(33)), _isObject = _interopRequireDefault(__webpack_require__(7));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports) {
  module.exports = require("../vendor/globby");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const pTry = __webpack_require__(32), pLimit = concurrency => {
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
  module.exports = minimatch, minimatch.Minimatch = Minimatch;
  var path = function() {
    try {
      return __webpack_require__(0);
    } catch (e) {}
  }() || {
    sep: "/"
  };
  minimatch.sep = path.sep;
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}, expand = __webpack_require__(34), plTypes = {
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
      if ("string" == typeof p ? (hit = f === p, this.debug("string match", p, f, hit)) : (hit = f.match(p), 
      this.debug("pattern match", p, f, hit)), !hit) return !1;
    }
    if (fi === fl && pi === pl) return !0;
    if (fi === fl) return partial;
    if (pi === pl) return fi === fl - 1 && "" === file[fi];
    throw new Error("wtf?");
  };
}, function(module, exports, __webpack_require__) {
  var concatMap = __webpack_require__(35), balanced = __webpack_require__(36);
  module.exports = function(str) {
    if (!str) return [];
    "{}" === str.substr(0, 2) && (str = "\\{\\}" + str.substr(2));
    return function expand(str, isTop) {
      var expansions = [], m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre)) return [ str ];
      var n, isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body), isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body), isSequence = isNumericSequence || isAlphaSequence, isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) return m.post.match(/,.*\}/) ? (str = m.pre + "{" + m.body + escClose + m.post, 
      expand(str)) : [ str ];
      if (isSequence) n = m.body.split(/\.\./); else {
        if (1 === (n = function parseCommaParts(str) {
          if (!str) return [ "" ];
          var parts = [], m = balanced("{", "}", str);
          if (!m) return str.split(",");
          var pre = m.pre, body = m.body, post = m.post, p = pre.split(",");
          p[p.length - 1] += "{" + body + "}";
          var postParts = parseCommaParts(post);
          post.length && (p[p.length - 1] += postParts.shift(), p.push.apply(p, postParts));
          return parts.push.apply(parts, p), parts;
        }(m.body)).length) if (1 === (n = expand(n[0], !1).map(embrace)).length) return (post = m.post.length ? expand(m.post, !1) : [ "" ]).map((function(p) {
          return m.pre + n[0] + p;
        }));
      }
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
    }(function(str) {
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
}, function(module, exports) {
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
}, function(module, exports, __webpack_require__) {
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(globalRef, pattern, file) {
    const {logger: logger, compilation: compilation, fileDependencies: fileDependencies, written: written, inputFileSystem: inputFileSystem, copyUnmodified: copyUnmodified} = globalRef;
    logger.debug(`getting stats for '${file.absoluteFrom}' to write to assets`);
    return (pattern.stats ? Promise.resolve().then(() => pattern.stats) : (0, _promisify.stat)(inputFileSystem, file.absoluteFrom)).then(stats => stats.isDirectory() ? (logger.debug(`skipping '${file.absoluteFrom}' because it is empty directory`), 
    Promise.resolve()) : ("glob" === pattern.fromType && fileDependencies.add(file.absoluteFrom), 
    logger.debug(`reading '${file.absoluteFrom}' to write to assets`), (0, _promisify.readFile)(inputFileSystem, file.absoluteFrom).then(content => {
      if (pattern.transform) {
        logger.info(`transforming content for '${file.absoluteFrom}'`);
        const transform = (content, absoluteFrom) => pattern.transform(content, absoluteFrom);
        if (pattern.cache) {
          globalRef.cacheDir || (globalRef.cacheDir = (0, _findCacheDir.default)({
            name: "copy-webpack-plugin"
          }) || _os.default.tmpdir());
          const cacheKey = pattern.cache.key ? pattern.cache.key : (0, _serializeJavascript.default)({
            name: _package.name,
            version: _package.version,
            pattern: pattern,
            hash: _crypto.default.createHash("md4").update(content).digest("hex")
          });
          return _cacache.default.get(globalRef.cacheDir, cacheKey).then(result => (logger.debug(`getting cached transformation for '${file.absoluteFrom}'`), 
          result.data), () => Promise.resolve().then(() => transform(content, file.absoluteFrom)).then(content => (logger.debug(`caching transformation for '${file.absoluteFrom}'`), 
          _cacache.default.put(globalRef.cacheDir, cacheKey, content).then(() => content))));
        }
        content = transform(content, file.absoluteFrom);
      }
      return content;
    }).then(content => ("template" === pattern.toType && (logger.info(`interpolating template '${file.webpackTo}' for '${file.relativeFrom}'`), 
    _path.default.extname(file.relativeFrom) || (file.webpackTo = file.webpackTo.replace(/\.?\[ext\]/g, "")), 
    file.webpackTo = _loaderUtils.default.interpolateName({
      resourcePath: file.absoluteFrom
    }, file.webpackTo, {
      content: content,
      regExp: file.webpackToRegExp,
      context: pattern.context
    }), file.webpackTo = _path.default.normalize(file.webpackTo)), content)).then(content => pattern.transformPath ? (logger.info(`transforming path '${file.webpackTo}' for '${file.absoluteFrom}'`), 
    Promise.resolve().then(() => pattern.transformPath(file.webpackTo, file.absoluteFrom)).then(newPath => (file.webpackTo = newPath, 
    content))) : content).then(content => {
      const hash = _loaderUtils.default.getHashDigest(content), targetPath = (0, _normalizePath.default)(file.webpackTo), targetAbsolutePath = (0, 
      _normalizePath.default)(file.absoluteFrom);
      !copyUnmodified && written[targetPath] && written[targetPath][targetAbsolutePath] && written[targetPath][targetAbsolutePath] === hash ? logger.info(`skipping '${file.webpackTo}', because content hasn't changed`) : (logger.debug(`adding '${file.webpackTo}' for tracking content changes`), 
      written[targetPath] || (written[targetPath] = {}), written[targetPath][targetAbsolutePath] = hash, 
      !compilation.assets[targetPath] || file.force ? (logger.info(`writing '${file.webpackTo}' to compilation assets from '${file.absoluteFrom}'`), 
      compilation.assets[targetPath] = {
        size: () => stats.size,
        source: () => content
      }) : logger.info(`skipping '${file.webpackTo}', because it already exists`));
    })));
  };
  var _path = _interopRequireDefault(__webpack_require__(0)), _os = _interopRequireDefault(__webpack_require__(5)), _crypto = _interopRequireDefault(__webpack_require__(2)), _loaderUtils = _interopRequireDefault(__webpack_require__(38)), _cacache = _interopRequireDefault(__webpack_require__(39)), _serializeJavascript = _interopRequireDefault(__webpack_require__(40)), _findCacheDir = _interopRequireDefault(__webpack_require__(41)), _normalizePath = _interopRequireDefault(__webpack_require__(6)), _package = __webpack_require__(42), _promisify = __webpack_require__(8);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports) {
  module.exports = require("./loader-utils");
}, function(module, exports) {
  module.exports = require("../vendor/cacache");
}, function(module, exports, __webpack_require__) {
  "use strict";
  var UID = Math.floor(1099511627776 * Math.random()).toString(16), PLACE_HOLDER_REGEXP = new RegExp('"@__(F|R|D|M|S|U)-' + UID + '-(\\d+)__@"', "g"), IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g, IS_PURE_FUNCTION = /function.*?\(/, IS_ARROW_FUNCTION = /.*?=>.*?/, UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g, RESERVED_SYMBOLS = [ "*", "async" ], ESCAPED_CHARS = {
    "<": "\\u003C",
    ">": "\\u003E",
    "/": "\\u002F",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  function escapeUnsafeChars(unsafeChar) {
    return ESCAPED_CHARS[unsafeChar];
  }
  module.exports = function serialize(obj, options) {
    options || (options = {}), "number" != typeof options && "string" != typeof options || (options = {
      space: options
    });
    var str, functions = [], regexps = [], dates = [], maps = [], sets = [], undefs = [];
    return options.ignoreFunction && "function" == typeof obj && (obj = void 0), void 0 === obj ? String(obj) : "string" != typeof (str = options.isJSON && !options.space ? JSON.stringify(obj) : JSON.stringify(obj, options.isJSON ? null : function(key, value) {
      if (options.ignoreFunction && function(obj) {
        var functionKeys = [];
        for (var key in obj) "function" == typeof obj[key] && functionKeys.push(key);
        for (var i = 0; i < functionKeys.length; i++) delete obj[functionKeys[i]];
      }(value), !value && void 0 !== value) return value;
      var origValue = this[key], type = typeof origValue;
      if ("object" === type) {
        if (origValue instanceof RegExp) return "@__R-" + UID + "-" + (regexps.push(origValue) - 1) + "__@";
        if (origValue instanceof Date) return "@__D-" + UID + "-" + (dates.push(origValue) - 1) + "__@";
        if (origValue instanceof Map) return "@__M-" + UID + "-" + (maps.push(origValue) - 1) + "__@";
        if (origValue instanceof Set) return "@__S-" + UID + "-" + (sets.push(origValue) - 1) + "__@";
      }
      return "function" === type ? "@__F-" + UID + "-" + (functions.push(origValue) - 1) + "__@" : "undefined" === type ? "@__U-" + UID + "-" + (undefs.push(origValue) - 1) + "__@" : value;
    }, options.space)) ? String(str) : (!0 !== options.unsafe && (str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars)), 
    0 === functions.length && 0 === regexps.length && 0 === dates.length && 0 === maps.length && 0 === sets.length && 0 === undefs.length ? str : str.replace(PLACE_HOLDER_REGEXP, (function(match, type, valueIndex) {
      return "D" === type ? 'new Date("' + dates[valueIndex].toISOString() + '")' : "R" === type ? "new RegExp(" + serialize(regexps[valueIndex].source) + ', "' + regexps[valueIndex].flags + '")' : "M" === type ? "new Map(" + serialize(Array.from(maps[valueIndex].entries()), options) + ")" : "S" === type ? "new Set(" + serialize(Array.from(sets[valueIndex].values()), options) + ")" : "U" === type ? "undefined" : function(fn) {
        var serializedFn = fn.toString();
        if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) throw new TypeError("Serializing native function: " + fn.name);
        if (IS_PURE_FUNCTION.test(serializedFn)) return serializedFn;
        if (IS_ARROW_FUNCTION.test(serializedFn)) return serializedFn;
        var argsStartsAt = serializedFn.indexOf("("), def = serializedFn.substr(0, argsStartsAt).trim().split(" ").filter((function(val) {
          return val.length > 0;
        }));
        return def.filter((function(val) {
          return -1 === RESERVED_SYMBOLS.indexOf(val);
        })).length > 0 ? (def.indexOf("async") > -1 ? "async " : "") + "function" + (def.join("").indexOf("*") > -1 ? "*" : "") + serializedFn.substr(argsStartsAt) : serializedFn;
      }(functions[valueIndex]);
    })));
  };
}, function(module, exports) {
  module.exports = require("../vendor/find-cache-dir");
}, function(module) {
  module.exports = JSON.parse('{"name":"copy-webpack-plugin","version":"5.1.1","description":"Copy files && directories with webpack"}');
} ]);