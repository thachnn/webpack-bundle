#!/usr/bin/env node
!function(modules) {
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
  __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 22);
}([ function(module, exports) {
  module.exports = require("path");
}, function(module, exports) {
  module.exports = require("webpack");
}, function(module, exports) {
  module.exports = require;
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const forEachBail = __webpack_require__(8);
  function cdUp(directory) {
    if ("/" === directory) return null;
    const i = directory.lastIndexOf("/"), j = directory.lastIndexOf("\\"), p = i < 0 ? j : j < 0 ? i : i < j ? j : i;
    return p < 0 ? null : directory.substr(0, p || 1);
  }
  exports.loadDescriptionFile = function(resolver, directory, filenames, resolveContext, callback) {
    !function findDescriptionFile() {
      forEachBail(filenames, (filename, callback) => {
        const descriptionFilePath = resolver.join(directory, filename);
        function onJson(err, content) {
          if (err) return resolveContext.log ? resolveContext.log(descriptionFilePath + " (directory description file): " + err) : err.message = descriptionFilePath + " (directory description file): " + err, 
          callback(err);
          callback(null, {
            content: content,
            directory: directory,
            path: descriptionFilePath
          });
        }
        resolver.fileSystem.readJson ? resolver.fileSystem.readJson(descriptionFilePath, (err, content) => {
          if (err) return void 0 !== err.code ? callback() : onJson(err);
          onJson(null, content);
        }) : resolver.fileSystem.readFile(descriptionFilePath, (err, content) => {
          if (err) return callback();
          let json;
          try {
            json = JSON.parse(content);
          } catch (e) {
            onJson(e);
          }
          onJson(null, json);
        });
      }, (err, result) => err ? callback(err) : result ? callback(null, result) : (directory = cdUp(directory)) ? findDescriptionFile() : callback());
    }();
  }, exports.getField = function(content, field) {
    if (content) if (Array.isArray(field)) {
      let current = content;
      for (let j = 0; j < field.length; j++) {
        if (null === current || "object" != typeof current) {
          current = null;
          break;
        }
        current = current[field[j]];
      }
      if ("object" == typeof current) return current;
    } else if ("object" == typeof content[field]) return content[field];
  }, exports.cdUp = cdUp;
}, function(module, exports) {
  module.exports = function(module) {
    return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
    module.children || (module.children = []), Object.defineProperty(module, "loaded", {
      enumerable: !0,
      get: function() {
        return module.l;
      }
    }), Object.defineProperty(module, "id", {
      enumerable: !0,
      get: function() {
        return module.i;
      }
    }), module.webpackPolyfill = 1), module;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  class Hook {
    constructor(args) {
      Array.isArray(args) || (args = []), this._args = args, this.taps = [], this.interceptors = [], 
      this.call = this._call, this.promise = this._promise, this.callAsync = this._callAsync, 
      this._x = void 0;
    }
    compile(options) {
      throw new Error("Abstract: should be overriden");
    }
    _createCall(type) {
      return this.compile({
        taps: this.taps,
        interceptors: this.interceptors,
        args: this._args,
        type: type
      });
    }
    tap(options, fn) {
      if ("string" == typeof options && (options = {
        name: options
      }), "object" != typeof options || null === options) throw new Error("Invalid arguments to tap(options: Object, fn: function)");
      if ("string" != typeof (options = Object.assign({
        type: "sync",
        fn: fn
      }, options)).name || "" === options.name) throw new Error("Missing name for tap");
      options = this._runRegisterInterceptors(options), this._insert(options);
    }
    tapAsync(options, fn) {
      if ("string" == typeof options && (options = {
        name: options
      }), "object" != typeof options || null === options) throw new Error("Invalid arguments to tapAsync(options: Object, fn: function)");
      if ("string" != typeof (options = Object.assign({
        type: "async",
        fn: fn
      }, options)).name || "" === options.name) throw new Error("Missing name for tapAsync");
      options = this._runRegisterInterceptors(options), this._insert(options);
    }
    tapPromise(options, fn) {
      if ("string" == typeof options && (options = {
        name: options
      }), "object" != typeof options || null === options) throw new Error("Invalid arguments to tapPromise(options: Object, fn: function)");
      if ("string" != typeof (options = Object.assign({
        type: "promise",
        fn: fn
      }, options)).name || "" === options.name) throw new Error("Missing name for tapPromise");
      options = this._runRegisterInterceptors(options), this._insert(options);
    }
    _runRegisterInterceptors(options) {
      for (const interceptor of this.interceptors) if (interceptor.register) {
        const newOptions = interceptor.register(options);
        void 0 !== newOptions && (options = newOptions);
      }
      return options;
    }
    withOptions(options) {
      const mergeOptions = opt => Object.assign({}, options, "string" == typeof opt ? {
        name: opt
      } : opt);
      options = Object.assign({}, options, this._withOptions);
      const base = this._withOptionsBase || this, newHook = Object.create(base);
      return newHook.tapAsync = (opt, fn) => base.tapAsync(mergeOptions(opt), fn), newHook.tap = (opt, fn) => base.tap(mergeOptions(opt), fn), 
      newHook.tapPromise = (opt, fn) => base.tapPromise(mergeOptions(opt), fn), newHook._withOptions = options, 
      newHook._withOptionsBase = base, newHook;
    }
    isUsed() {
      return this.taps.length > 0 || this.interceptors.length > 0;
    }
    intercept(interceptor) {
      if (this._resetCompilation(), this.interceptors.push(Object.assign({}, interceptor)), 
      interceptor.register) for (let i = 0; i < this.taps.length; i++) this.taps[i] = interceptor.register(this.taps[i]);
    }
    _resetCompilation() {
      this.call = this._call, this.callAsync = this._callAsync, this.promise = this._promise;
    }
    _insert(item) {
      let before;
      this._resetCompilation(), "string" == typeof item.before ? before = new Set([ item.before ]) : Array.isArray(item.before) && (before = new Set(item.before));
      let stage = 0;
      "number" == typeof item.stage && (stage = item.stage);
      let i = this.taps.length;
      for (;i > 0; ) {
        i--;
        const x = this.taps[i];
        this.taps[i + 1] = x;
        const xStage = x.stage || 0;
        if (before) {
          if (before.has(x.name)) {
            before.delete(x.name);
            continue;
          }
          if (before.size > 0) continue;
        }
        if (!(xStage > stage)) {
          i++;
          break;
        }
      }
      this.taps[i] = item;
    }
  }
  function createCompileDelegate(name, type) {
    return function(...args) {
      return this[name] = this._createCall(type), this[name](...args);
    };
  }
  Object.defineProperties(Hook.prototype, {
    _call: {
      value: createCompileDelegate("call", "sync"),
      configurable: !0,
      writable: !0
    },
    _promise: {
      value: createCompileDelegate("promise", "promise"),
      configurable: !0,
      writable: !0
    },
    _callAsync: {
      value: createCompileDelegate("callAsync", "async"),
      configurable: !0,
      writable: !0
    }
  }), module.exports = Hook;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(config) {
      this.config = config, this.options = void 0, this._args = void 0;
    }
    create(options) {
      let fn;
      switch (this.init(options), this.options.type) {
       case "sync":
        fn = new Function(this.args(), '"use strict";\n' + this.header() + this.content({
          onError: err => `throw ${err};\n`,
          onResult: result => `return ${result};\n`,
          resultReturns: !0,
          onDone: () => "",
          rethrowIfPossible: !0
        }));
        break;

       case "async":
        fn = new Function(this.args({
          after: "_callback"
        }), '"use strict";\n' + this.header() + this.content({
          onError: err => `_callback(${err});\n`,
          onResult: result => `_callback(null, ${result});\n`,
          onDone: () => "_callback();\n"
        }));
        break;

       case "promise":
        let errorHelperUsed = !1;
        const content = this.content({
          onError: err => (errorHelperUsed = !0, `_error(${err});\n`),
          onResult: result => `_resolve(${result});\n`,
          onDone: () => "_resolve();\n"
        });
        let code = "";
        code += '"use strict";\n', code += "return new Promise((_resolve, _reject) => {\n", 
        errorHelperUsed && (code += "var _sync = true;\n", code += "function _error(_err) {\n", 
        code += "if(_sync)\n", code += "_resolve(Promise.resolve().then(() => { throw _err; }));\n", 
        code += "else\n", code += "_reject(_err);\n", code += "};\n"), code += this.header(), 
        code += content, errorHelperUsed && (code += "_sync = false;\n"), code += "});\n", 
        fn = new Function(this.args(), code);
      }
      return this.deinit(), fn;
    }
    setup(instance, options) {
      instance._x = options.taps.map(t => t.fn);
    }
    init(options) {
      this.options = options, this._args = options.args.slice();
    }
    deinit() {
      this.options = void 0, this._args = void 0;
    }
    header() {
      let code = "";
      this.needContext() ? code += "var _context = {};\n" : code += "var _context;\n", 
      code += "var _x = this._x;\n", this.options.interceptors.length > 0 && (code += "var _taps = this.taps;\n", 
      code += "var _interceptors = this.interceptors;\n");
      for (let i = 0; i < this.options.interceptors.length; i++) {
        const interceptor = this.options.interceptors[i];
        interceptor.call && (code += `${this.getInterceptor(i)}.call(${this.args({
          before: interceptor.context ? "_context" : void 0
        })});\n`);
      }
      return code;
    }
    needContext() {
      for (const tap of this.options.taps) if (tap.context) return !0;
      return !1;
    }
    callTap(tapIndex, {onError: onError, onResult: onResult, onDone: onDone, rethrowIfPossible: rethrowIfPossible}) {
      let code = "", hasTapCached = !1;
      for (let i = 0; i < this.options.interceptors.length; i++) {
        const interceptor = this.options.interceptors[i];
        interceptor.tap && (hasTapCached || (code += `var _tap${tapIndex} = ${this.getTap(tapIndex)};\n`, 
        hasTapCached = !0), code += `${this.getInterceptor(i)}.tap(${interceptor.context ? "_context, " : ""}_tap${tapIndex});\n`);
      }
      code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
      const tap = this.options.taps[tapIndex];
      switch (tap.type) {
       case "sync":
        rethrowIfPossible || (code += `var _hasError${tapIndex} = false;\n`, code += "try {\n"), 
        code += onResult ? `var _result${tapIndex} = _fn${tapIndex}(${this.args({
          before: tap.context ? "_context" : void 0
        })});\n` : `_fn${tapIndex}(${this.args({
          before: tap.context ? "_context" : void 0
        })});\n`, rethrowIfPossible || (code += "} catch(_err) {\n", code += `_hasError${tapIndex} = true;\n`, 
        code += onError("_err"), code += "}\n", code += `if(!_hasError${tapIndex}) {\n`), 
        onResult && (code += onResult("_result" + tapIndex)), onDone && (code += onDone()), 
        rethrowIfPossible || (code += "}\n");
        break;

       case "async":
        let cbCode = "";
        cbCode += onResult ? `(_err${tapIndex}, _result${tapIndex}) => {\n` : `_err${tapIndex} => {\n`, 
        cbCode += `if(_err${tapIndex}) {\n`, cbCode += onError("_err" + tapIndex), cbCode += "} else {\n", 
        onResult && (cbCode += onResult("_result" + tapIndex)), onDone && (cbCode += onDone()), 
        cbCode += "}\n", cbCode += "}", code += `_fn${tapIndex}(${this.args({
          before: tap.context ? "_context" : void 0,
          after: cbCode
        })});\n`;
        break;

       case "promise":
        code += `var _hasResult${tapIndex} = false;\n`, code += `var _promise${tapIndex} = _fn${tapIndex}(${this.args({
          before: tap.context ? "_context" : void 0
        })});\n`, code += `if (!_promise${tapIndex} || !_promise${tapIndex}.then)\n`, code += `  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise${tapIndex} + ')');\n`, 
        code += `_promise${tapIndex}.then(_result${tapIndex} => {\n`, code += `_hasResult${tapIndex} = true;\n`, 
        onResult && (code += onResult("_result" + tapIndex)), onDone && (code += onDone()), 
        code += `}, _err${tapIndex} => {\n`, code += `if(_hasResult${tapIndex}) throw _err${tapIndex};\n`, 
        code += onError("_err" + tapIndex), code += "});\n";
      }
      return code;
    }
    callTapsSeries({onError: onError, onResult: onResult, resultReturns: resultReturns, onDone: onDone, doneReturns: doneReturns, rethrowIfPossible: rethrowIfPossible}) {
      if (0 === this.options.taps.length) return onDone();
      const firstAsync = this.options.taps.findIndex(t => "sync" !== t.type), somethingReturns = resultReturns || doneReturns || !1;
      let code = "", current = onDone;
      for (let j = this.options.taps.length - 1; j >= 0; j--) {
        const i = j;
        current !== onDone && "sync" !== this.options.taps[i].type && (code += `function _next${i}() {\n`, 
        code += current(), code += "}\n", current = () => `${somethingReturns ? "return " : ""}_next${i}();\n`);
        const done = current, doneBreak = skipDone => skipDone ? "" : onDone(), content = this.callTap(i, {
          onError: error => onError(i, error, done, doneBreak),
          onResult: onResult && (result => onResult(i, result, done, doneBreak)),
          onDone: !onResult && done,
          rethrowIfPossible: rethrowIfPossible && (firstAsync < 0 || i < firstAsync)
        });
        current = () => content;
      }
      return code += current(), code;
    }
    callTapsLooping({onError: onError, onDone: onDone, rethrowIfPossible: rethrowIfPossible}) {
      if (0 === this.options.taps.length) return onDone();
      const syncOnly = this.options.taps.every(t => "sync" === t.type);
      let code = "";
      syncOnly || (code += "var _looper = () => {\n", code += "var _loopAsync = false;\n"), 
      code += "var _loop;\n", code += "do {\n", code += "_loop = false;\n";
      for (let i = 0; i < this.options.interceptors.length; i++) {
        const interceptor = this.options.interceptors[i];
        interceptor.loop && (code += `${this.getInterceptor(i)}.loop(${this.args({
          before: interceptor.context ? "_context" : void 0
        })});\n`);
      }
      return code += this.callTapsSeries({
        onError: onError,
        onResult: (i, result, next, doneBreak) => {
          let code = "";
          return code += `if(${result} !== undefined) {\n`, code += "_loop = true;\n", syncOnly || (code += "if(_loopAsync) _looper();\n"), 
          code += doneBreak(!0), code += "} else {\n", code += next(), code += "}\n", code;
        },
        onDone: onDone && (() => {
          let code = "";
          return code += "if(!_loop) {\n", code += onDone(), code += "}\n", code;
        }),
        rethrowIfPossible: rethrowIfPossible && syncOnly
      }), code += "} while(_loop);\n", syncOnly || (code += "_loopAsync = true;\n", code += "};\n", 
      code += "_looper();\n"), code;
    }
    callTapsParallel({onError: onError, onResult: onResult, onDone: onDone, rethrowIfPossible: rethrowIfPossible, onTap: onTap = ((i, run) => run())}) {
      if (this.options.taps.length <= 1) return this.callTapsSeries({
        onError: onError,
        onResult: onResult,
        onDone: onDone,
        rethrowIfPossible: rethrowIfPossible
      });
      let code = "";
      code += "do {\n", code += `var _counter = ${this.options.taps.length};\n`, onDone && (code += "var _done = () => {\n", 
      code += onDone(), code += "};\n");
      for (let i = 0; i < this.options.taps.length; i++) {
        const done = () => onDone ? "if(--_counter === 0) _done();\n" : "--_counter;", doneBreak = skipDone => skipDone || !onDone ? "_counter = 0;\n" : "_counter = 0;\n_done();\n";
        code += "if(_counter <= 0) break;\n", code += onTap(i, () => this.callTap(i, {
          onError: error => {
            let code = "";
            return code += "if(_counter > 0) {\n", code += onError(i, error, done, doneBreak), 
            code += "}\n", code;
          },
          onResult: onResult && (result => {
            let code = "";
            return code += "if(_counter > 0) {\n", code += onResult(i, result, done, doneBreak), 
            code += "}\n", code;
          }),
          onDone: !onResult && (() => done()),
          rethrowIfPossible: rethrowIfPossible
        }), done, doneBreak);
      }
      return code += "} while(false);\n", code;
    }
    args({before: before, after: after} = {}) {
      let allArgs = this._args;
      return before && (allArgs = [ before ].concat(allArgs)), after && (allArgs = allArgs.concat(after)), 
      0 === allArgs.length ? "" : allArgs.join(", ");
    }
    getTapFn(idx) {
      return `_x[${idx}]`;
    }
    getTap(idx) {
      return `_taps[${idx}]`;
    }
    getInterceptor(idx) {
      return `_interceptors[${idx}]`;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(array, iterator, callback) {
    if (0 === array.length) return callback();
    let currentResult, currentPos = array.length, done = [];
    for (let i = 0; i < array.length; i++) {
      const itCb = createIteratorCallback(i);
      if (iterator(array[i], itCb), 0 === currentPos) break;
    }
    function createIteratorCallback(i) {
      return (...args) => {
        i >= currentPos || (done.push(i), args.length > 0 && (currentPos = i + 1, done = done.filter(item => item <= i), 
        currentResult = args), done.length === currentPos && (callback.apply(null, currentResult), 
        currentPos = 0));
      };
    }
  }, module.exports.withIndex = function(array, iterator, callback) {
    if (0 === array.length) return callback();
    let currentResult, currentPos = array.length, done = [];
    for (let i = 0; i < array.length; i++) {
      const itCb = createIteratorCallback(i);
      if (iterator(array[i], i, itCb), 0 === currentPos) break;
    }
    function createIteratorCallback(i) {
      return (...args) => {
        i >= currentPos || (done.push(i), args.length > 0 && (currentPos = i + 1, done = done.filter(item => item <= i), 
        currentResult = args), done.length === currentPos && (callback.apply(null, currentResult), 
        currentPos = 0));
      };
    }
  };
}, function(module, exports) {
  const GROUPS = {
    CONFIG_GROUP: "Config options:",
    BASIC_GROUP: "Basic options:",
    MODULE_GROUP: "Module options:",
    OUTPUT_GROUP: "Output options:",
    ADVANCED_GROUP: "Advanced options:",
    RESOLVE_GROUP: "Resolving options:",
    OPTIMIZE_GROUP: "Optimizing options:",
    DISPLAY_GROUP: "Stats options:"
  };
  module.exports = {
    NON_COMPILATION_ARGS: [ "init", "migrate", "serve", "generate-loader", "generate-plugin", "info" ],
    GROUPS: GROUPS,
    WEBPACK_OPTIONS_FLAG: "WEBPACK_OPTIONS"
  };
}, function(module, exports) {
  module.exports = require("os");
}, function(module, exports) {
  module.exports = require("util");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const globToRegExp = __webpack_require__(93).globToRegExp;
  function parseType(type) {
    const items = type.split("+"), t = items.shift();
    return {
      type: "*" === t ? null : t,
      features: items
    };
  }
  function isTypeMatched(baseType, testedType) {
    return "string" == typeof baseType && (baseType = parseType(baseType)), "string" == typeof testedType && (testedType = parseType(testedType)), 
    (!testedType.type || testedType.type === baseType.type) && testedType.features.every(requiredFeature => baseType.features.indexOf(requiredFeature) >= 0);
  }
  function isResourceTypeSupported(context, type) {
    return context.supportedResourceTypes && context.supportedResourceTypes.some(supportedType => function(baseType, testedType) {
      if (baseType = baseType.split("/"), testedType = testedType.split("/"), baseType.length !== testedType.length) return !1;
      for (let i = 0; i < baseType.length; i++) if (!isTypeMatched(baseType[i], testedType[i])) return !1;
      return !0;
    }(supportedType, type));
  }
  function isEnvironment(context, env) {
    return context.environments && context.environments.every(environment => isTypeMatched(environment, env));
  }
  const globCache = {};
  function getGlobRegExp(glob) {
    return globCache[glob] || (globCache[glob] = globToRegExp(glob));
  }
  function matchGlob(glob, relativePath) {
    return getGlobRegExp(glob).exec(relativePath);
  }
  function isGlobMatched(glob, relativePath) {
    return !!matchGlob(glob, relativePath);
  }
  function isConditionMatched(context, condition) {
    return condition.split("|").some((function testFn(item) {
      item = item.trim();
      if (/^!/.test(item)) return !testFn(item.substr(1));
      if (!/^[a-z]+:/.test(item)) return item.indexOf("/") >= 0 ? isResourceTypeSupported(context, item) : isEnvironment(context, item);
      {
        const match = /^([a-z]+):\s*/.exec(item), value = item.substr(match[0].length);
        switch (match[1]) {
         case "referrer":
          return isGlobMatched(value, context.referrer);

         default:
          return !1;
        }
      }
    }));
  }
  function isKeyMatched(context, key) {
    for (;;) {
      const match = /^\[([^\]]+)\]\s*/.exec(key);
      if (!match) return key;
      key = key.substr(match[0].length);
      if (!isConditionMatched(context, match[1])) return !1;
    }
  }
  function getField(context, configuration, field) {
    let value;
    return Object.keys(configuration).forEach(key => {
      isKeyMatched(context, key) === field && (value = configuration[key]);
    }), value;
  }
  exports.parseType = parseType, exports.isTypeMatched = isTypeMatched, exports.isResourceTypeSupported = isResourceTypeSupported, 
  exports.isEnvironment = isEnvironment, exports.isGlobMatched = isGlobMatched, exports.isConditionMatched = isConditionMatched, 
  exports.isKeyMatched = isKeyMatched, exports.getField = getField, exports.getMain = function(context, configuration) {
    return getField(context, configuration, "main");
  }, exports.getExtensions = function(context, configuration) {
    return getField(context, configuration, "extensions");
  }, exports.matchModule = function(context, configuration, request) {
    const modulesField = getField(context, configuration, "modules");
    if (!modulesField) return request;
    let newRequest = request;
    const keys = Object.keys(modulesField);
    let match, index, iteration = 0;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i], pureKey = isKeyMatched(context, key);
      if (match = matchGlob(pureKey, newRequest), match) {
        const value = modulesField[key];
        if ("string" != typeof value) return value;
        if (/^\(.+\)$/.test(pureKey) ? newRequest = newRequest.replace(getGlobRegExp(pureKey), value) : (index = 1, 
        newRequest = value.replace(/(\/?\*)?\*/g, replaceMatcher)), i = -1, iteration++ > keys.length) throw new Error("Request '" + request + "' matches recursively");
      }
    }
    return newRequest;
    function replaceMatcher(find) {
      switch (find) {
       case "/**":
        {
          const m = match[index++];
          return m ? "/" + m : "";
        }

       case "**":
       case "*":
        return match[index++];
      }
    }
  }, exports.matchType = function(context, configuration, relativePath) {
    const typesField = getField(context, configuration, "types");
    if (!typesField) return;
    let type;
    return Object.keys(typesField).forEach(key => {
      if (isGlobMatched(isKeyMatched(context, key), relativePath)) {
        const value = typesField[key];
        if (!type && /\/\*$/.test(value)) throw new Error("value ('" + value + "') of key '" + key + "' contains '*', but there is no previous value defined");
        type = value.replace(/\/\*$/, "/" + type);
      }
    }), type;
  };
}, function(module, exports) {
  module.exports = require("child_process");
}, function(module, exports, __webpack_require__) {
  "use strict";
  (function(module) {
    const path = __webpack_require__(0), prefix = __webpack_require__(27);
    let gm;
    Reflect.defineProperty(module, "exports", {
      get: () => gm || (gm = "win32" === process.platform || "msys" === process.env.OSTYPE || "cygwin" === process.env.OSTYPE ? path.resolve(prefix, "node_modules") : path.resolve(prefix, "lib/node_modules"))
    });
  }).call(this, __webpack_require__(5)(module));
}, function(module, exports, __webpack_require__) {
  "use strict";
  const os = __webpack_require__(10), hasFlag = __webpack_require__(38), {env: env} = process;
  let forceColor;
  function getSupportLevel(stream) {
    return function(level) {
      return 0 !== level && {
        level: level,
        hasBasic: !0,
        has256: level >= 2,
        has16m: level >= 3
      };
    }(function(stream) {
      if (0 === forceColor) return 0;
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
      if (hasFlag("color=256")) return 2;
      if (stream && !stream.isTTY && void 0 === forceColor) return 0;
      const min = forceColor || 0;
      if ("dumb" === env.TERM) return min;
      if ("win32" === process.platform) {
        const osRelease = os.release().split(".");
        return Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
      }
      if ("CI" in env) return [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI" ].some(sign => sign in env) || "codeship" === env.CI_NAME ? 1 : min;
      if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      if ("truecolor" === env.COLORTERM) return 3;
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
         case "iTerm.app":
          return version >= 3 ? 3 : 2;

         case "Apple_Terminal":
          return 2;
        }
      }
      return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : min;
    }(stream));
  }
  hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never") ? forceColor = 0 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (forceColor = 1), 
  "FORCE_COLOR" in env && (forceColor = !0 === env.FORCE_COLOR || "true" === env.FORCE_COLOR ? 1 : !1 === env.FORCE_COLOR || "false" === env.FORCE_COLOR ? 0 : 0 === env.FORCE_COLOR.length ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3)), 
  module.exports = {
    supportsColor: getSupportLevel,
    stdout: getSupportLevel(process.stdout),
    stderr: getSupportLevel(process.stderr)
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const JSON5 = __webpack_require__(56), specialValues = {
    null: null,
    true: !0,
    false: !1
  };
  module.exports = function(query) {
    if ("?" !== query.substr(0, 1)) throw new Error("A valid query string passed to parseQuery should begin with '?'");
    if (!(query = query.substr(1))) return {};
    if ("{" === query.substr(0, 1) && "}" === query.substr(-1)) return JSON5.parse(query);
    const queryArgs = query.split(/[,&]/g), result = {};
    return queryArgs.forEach(arg => {
      const idx = arg.indexOf("=");
      if (idx >= 0) {
        let name = arg.substr(0, idx), value = decodeURIComponent(arg.substr(idx + 1));
        specialValues.hasOwnProperty(value) && (value = specialValues[value]), "[]" === name.substr(-2) ? (name = decodeURIComponent(name.substr(0, name.length - 2)), 
        Array.isArray(result[name]) || (result[name] = []), result[name].push(value)) : (name = decodeURIComponent(name), 
        result[name] = value);
      } else "-" === arg.substr(0, 1) ? result[decodeURIComponent(arg.substr(1))] = !1 : "+" === arg.substr(0, 1) ? result[decodeURIComponent(arg.substr(1))] = !0 : result[decodeURIComponent(arg)] = !0;
    }), result;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isSpaceSeparator = function(c) {
    return unicode.Space_Separator.test(c);
  }, exports.isIdStartChar = function(c) {
    return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || "$" === c || "_" === c || unicode.ID_Start.test(c);
  }, exports.isIdContinueChar = function(c) {
    return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || "$" === c || "_" === c || "‌" === c || "‍" === c || unicode.ID_Continue.test(c);
  }, exports.isDigit = function(c) {
    return /[0-9]/.test(c);
  }, exports.isHexDigit = function(c) {
    return /[0-9A-Fa-f]/.test(c);
  };
  var unicode = function(obj) {
    if (obj && obj.__esModule) return obj;
    var newObj = {};
    if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
    return newObj.default = obj, newObj;
  }(__webpack_require__(58));
}, function(module, exports, __webpack_require__) {
  "use strict";
  const baseEncodeTables = {
    26: "abcdefghijklmnopqrstuvwxyz",
    32: "123456789abcdefghjkmnpqrstuvwxyz",
    36: "0123456789abcdefghijklmnopqrstuvwxyz",
    49: "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    52: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    58: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
  };
  module.exports = function(buffer, hashType, digestType, maxLength) {
    hashType = hashType || "md5", maxLength = maxLength || 9999;
    const hash = __webpack_require__(67).createHash(hashType);
    return hash.update(buffer), "base26" === digestType || "base32" === digestType || "base36" === digestType || "base49" === digestType || "base52" === digestType || "base58" === digestType || "base62" === digestType || "base64" === digestType ? function(buffer, base) {
      const encodeTable = baseEncodeTables[base];
      if (!encodeTable) throw new Error("Unknown encoding base" + base);
      const readLength = buffer.length, Big = __webpack_require__(66);
      Big.RM = Big.DP = 0;
      let b = new Big(0);
      for (let i = readLength - 1; i >= 0; i--) b = b.times(256).plus(buffer[i]);
      let output = "";
      for (;b.gt(0); ) output = encodeTable[b.mod(base)] + output, b = b.div(base);
      return Big.DP = 20, Big.RM = 1, output;
    }(hash.digest(), digestType.substr(4)).substr(0, maxLength) : hash.digest(digestType || "hex").substr(0, maxLength);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(path) {
    var parts = path.split(/(\\+|\/+)/);
    if (1 === parts.length) return path;
    for (var result = [], absolutePathStart = 0, i = 0, sep = !1; i < parts.length; i += 1, 
    sep = !sep) {
      var part = parts[i];
      if (0 === i && /^([A-Z]:)?$/i.test(part)) result.push(part), absolutePathStart = 2; else if (sep) 1 === i && 0 === parts[0].length && "\\\\" === part ? result.push(part) : result.push(part[0]); else if (".." === part) switch (result.length) {
       case 0:
        result.push(part);
        break;

       case 2:
        "." !== result[0] ? (i += 1, sep = !sep, result.length = absolutePathStart) : (result.length = 0, 
        result.push(part));
        break;

       case 4:
        0 === absolutePathStart ? result.length -= 3 : (i += 1, sep = !sep, result.length = 2);
        break;

       default:
        result.length -= 3;
      } else if ("." === part) switch (result.length) {
       case 0:
        result.push(part);
        break;

       case 2:
        0 === absolutePathStart ? result.length -= 1 : (i += 1, sep = !sep);
        break;

       default:
        result.length -= 1;
      } else part && result.push(part);
    }
    return 1 === result.length && /^[A-Za-z]:$/.test(result[0]) ? result[0] + "\\" : result.join("");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(path) {
    const parts = path.split(/(.*?[\\/]+)/), paths = [ path ], seqments = [ parts[parts.length - 1] ];
    let part = parts[parts.length - 1];
    path = path.substr(0, path.length - part.length - 1);
    for (let i = parts.length - 2; i > 2; i -= 2) paths.push(path), part = parts[i], 
    path = path.substr(0, path.length - part.length) || "/", seqments.push(part.substr(0, part.length - 1));
    return part = parts[1], seqments.push(part), paths.push(part), {
      paths: paths,
      seqments: seqments
    };
  }, module.exports.basename = function(path) {
    const i = path.lastIndexOf("/"), j = path.lastIndexOf("\\"), p = i < 0 ? j : j < 0 ? i : i < j ? j : i;
    if (p < 0) return null;
    return path.substr(p + 1);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(resolver, request) {
    if ("string" == typeof request.__innerRequest && request.__innerRequest_request === request.request && request.__innerRequest_relativePath === request.relativePath) return request.__innerRequest;
    let innerRequest;
    return request.request ? (innerRequest = request.request, /^\.\.?\//.test(innerRequest) && request.relativePath && (innerRequest = resolver.join(request.relativePath, innerRequest))) : innerRequest = request.relativePath, 
    request.__innerRequest_request = request.request, request.__innerRequest_relativePath = request.relativePath, 
    request.__innerRequest = innerRequest;
  };
}, function(module, exports, __webpack_require__) {
  const {NON_COMPILATION_ARGS: NON_COMPILATION_ARGS} = __webpack_require__(9);
  !function() {
    if (__webpack_require__(23)(__filename)) return;
    __webpack_require__(24);
    const ErrorHelpers = __webpack_require__(25), NON_COMPILATION_CMD = process.argv.find(arg => ("serve" === arg && (global.process.argv = global.process.argv.filter(a => "serve" !== a), 
    process.argv = global.process.argv), NON_COMPILATION_ARGS.find(a => a === arg)));
    if (NON_COMPILATION_CMD) return __webpack_require__(26)(NON_COMPILATION_CMD, ...process.argv);
    const yargs = __webpack_require__(34).usage(`webpack-cli ${__webpack_require__(35).version}\n\nUsage: webpack-cli [options]\n       webpack-cli [options] --entry <entry> --output <output>\n       webpack-cli [options] <entries...> --output <output>\n       webpack-cli <command> [options]\n\nFor more information, see https://webpack.js.org/api/cli/.`);
    __webpack_require__(36)(yargs), yargs.parse(process.argv.slice(2), (err, argv, output) => {
      if (Error.stackTraceLimit = 30, err && output) return console.error(output), void (process.exitCode = 1);
      if (output) return void console.log(output);
      let options;
      argv.verbose && (argv.display = "verbose");
      try {
        options = __webpack_require__(39)(argv);
      } catch (err) {
        if ("MODULE_NOT_FOUND" === err.code) {
          const moduleName = err.message.split("'")[1];
          let instructions = "", errorMessage = "";
          if ("webpack" === moduleName) return errorMessage = `\n${moduleName} not installed`, 
          instructions = `Install webpack to start bundling: [32m\n  $ npm install --save-dev ${moduleName}\n`, 
          void 0 !== process.env.npm_execpath && process.env.npm_execpath.includes("yarn") && (instructions = `Install webpack to start bundling: [32m\n $ yarn add ${moduleName} --dev\n`), 
          Error.stackTraceLimit = 1, console.error(`${errorMessage}\n\n${instructions}`), 
          void (process.exitCode = 1);
        }
        if ("ValidationError" !== err.name) throw err;
        const stack = ErrorHelpers.cleanUpWebpackOptions(err.stack, err.message), message = err.message + "\n" + stack;
        return argv.color ? console.error(`[1m[31m${message}[39m[22m`) : console.error(message), 
        void (process.exitCode = 1);
      }
      const stdout = argv.silent ? {
        write: () => {}
      } : process.stdout;
      function ifArg(name, fn, init) {
        Array.isArray(argv[name]) ? (init && init(), argv[name].forEach(fn)) : void 0 !== argv[name] && (init && init(), 
        fn(argv[name], -1));
      }
      !function processOptions(options) {
        if ("function" == typeof options.then) return void options.then(processOptions).catch((function(err) {
          console.error(err.stack || err), process.exit(1);
        }));
        const firstOptions = [].concat(options)[0], statsPresetToOptions = __webpack_require__(1).Stats.presetToOptions;
        let outputOptions = options.stats;
        "boolean" == typeof outputOptions || "string" == typeof outputOptions ? outputOptions = statsPresetToOptions(outputOptions) : outputOptions || (outputOptions = {}), 
        ifArg("display", (function(preset) {
          outputOptions = statsPresetToOptions(preset);
        })), outputOptions = Object.create(outputOptions), Array.isArray(options) && !outputOptions.children && (outputOptions.children = options.map(o => o.stats)), 
        void 0 === outputOptions.context && (outputOptions.context = firstOptions.context), 
        ifArg("env", (function(value) {
          outputOptions.env && (outputOptions._env = value);
        })), ifArg("json", (function(bool) {
          bool && (outputOptions.json = bool, outputOptions.modules = bool);
        })), void 0 === outputOptions.colors && (outputOptions.colors = __webpack_require__(15).stdout), 
        ifArg("sort-modules-by", (function(value) {
          outputOptions.modulesSort = value;
        })), ifArg("sort-chunks-by", (function(value) {
          outputOptions.chunksSort = value;
        })), ifArg("sort-assets-by", (function(value) {
          outputOptions.assetsSort = value;
        })), ifArg("display-exclude", (function(value) {
          outputOptions.exclude = value;
        })), outputOptions.json || (void 0 === outputOptions.cached && (outputOptions.cached = !1), 
        void 0 === outputOptions.cachedAssets && (outputOptions.cachedAssets = !1), ifArg("display-chunks", (function(bool) {
          bool && (outputOptions.modules = !1, outputOptions.chunks = !0, outputOptions.chunkModules = !0);
        })), ifArg("display-entrypoints", (function(bool) {
          outputOptions.entrypoints = bool;
        })), ifArg("display-reasons", (function(bool) {
          bool && (outputOptions.reasons = !0);
        })), ifArg("display-depth", (function(bool) {
          bool && (outputOptions.depth = !0);
        })), ifArg("display-used-exports", (function(bool) {
          bool && (outputOptions.usedExports = !0);
        })), ifArg("display-provided-exports", (function(bool) {
          bool && (outputOptions.providedExports = !0);
        })), ifArg("display-optimization-bailout", (function(bool) {
          bool && (outputOptions.optimizationBailout = bool);
        })), ifArg("display-error-details", (function(bool) {
          bool && (outputOptions.errorDetails = !0);
        })), ifArg("display-origins", (function(bool) {
          bool && (outputOptions.chunkOrigins = !0);
        })), ifArg("display-max-modules", (function(value) {
          outputOptions.maxModules = +value;
        })), ifArg("display-cached", (function(bool) {
          bool && (outputOptions.cached = !0);
        })), ifArg("display-cached-assets", (function(bool) {
          bool && (outputOptions.cachedAssets = !0);
        })), outputOptions.exclude || (outputOptions.exclude = [ "node_modules", "bower_components", "components" ]), 
        argv["display-modules"] && (outputOptions.maxModules = 1 / 0, outputOptions.exclude = void 0, 
        outputOptions.modules = !0)), ifArg("hide-modules", (function(bool) {
          bool && (outputOptions.modules = !1, outputOptions.chunkModules = !1);
        })), ifArg("info-verbosity", (function(value) {
          outputOptions.infoVerbosity = value;
        })), ifArg("build-delimiter", (function(value) {
          outputOptions.buildDelimiter = value;
        }));
        const webpack = __webpack_require__(1);
        let compiler, lastHash = null;
        try {
          compiler = webpack(options);
        } catch (err) {
          throw "WebpackOptionsValidationError" === err.name && (argv.color ? console.error(`[1m[31m${err.message}[39m[22m`) : console.error(err.message), 
          process.exit(1)), err;
        }
        if (argv.progress) {
          new (0, __webpack_require__(1).ProgressPlugin)({
            profile: argv.profile
          }).apply(compiler);
        }
        function compilerCallback(err, stats) {
          if (options.watch && !err || compiler.purgeInputFileSystem(), err) return lastHash = null, 
          console.error(err.stack || err), err.details && console.error(err.details), void (process.exitCode = 1);
          if (outputOptions.json) stdout.write(JSON.stringify(stats.toJson(outputOptions), null, 2) + "\n"); else if (stats.hash !== lastHash) {
            if (lastHash = stats.hash, stats.compilation && 0 !== stats.compilation.errors.length) {
              "EntryModuleNotFoundError" === stats.compilation.errors[0].name && (console.error("\n[1m[31mInsufficient number of arguments or no entry found."), 
              console.error("[1m[31mAlternatively, run 'webpack(-cli) --help' for usage info.[39m[22m\n"));
            }
            const statsString = stats.toString(outputOptions), delimiter = outputOptions.buildDelimiter ? outputOptions.buildDelimiter + "\n" : "";
            statsString && stdout.write(`${statsString}\n${delimiter}`);
          }
          !options.watch && stats.hasErrors() && (process.exitCode = 2);
        }
        if ("verbose" === outputOptions.infoVerbosity && (argv.w ? compiler.hooks.watchRun.tap("WebpackInfo", compilation => {
          const compilationName = compilation.name ? compilation.name : "";
          console.error("\nCompilation " + compilationName + " starting…\n");
        }) : compiler.hooks.beforeRun.tap("WebpackInfo", compilation => {
          const compilationName = compilation.name ? compilation.name : "";
          console.error("\nCompilation " + compilationName + " starting…\n");
        }), compiler.hooks.done.tap("WebpackInfo", compilation => {
          const compilationName = compilation.name ? compilation.name : "";
          console.error("\nCompilation " + compilationName + " finished\n");
        })), firstOptions.watch || options.watch) {
          const watchOptions = firstOptions.watchOptions || options.watchOptions || firstOptions.watch || options.watch || {};
          watchOptions.stdin && (process.stdin.on("end", (function(_) {
            process.exit();
          })), process.stdin.resume()), compiler.watch(watchOptions, compilerCallback), "none" !== outputOptions.infoVerbosity && console.error("\nwebpack is watching the files…\n");
        } else compiler.run((err, stats) => {
          compiler.close ? compiler.close(err2 => {
            compilerCallback(err || err2, stats);
          }) : compilerCallback(err, stats);
        });
      }(options);
    });
  }();
}, function(module, exports) {
  module.exports = require("../vendor/import-local");
}, function(module, exports) {
  module.exports = require("v8-compile-cache");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const {WEBPACK_OPTIONS_FLAG: WEBPACK_OPTIONS_FLAG} = __webpack_require__(9);
  exports.cutOffByFlag = (stack, flag) => {
    stack = stack.split("\n");
    for (let i = 0; i < stack.length; i++) stack[i].indexOf(flag) >= 0 && (stack.length = i);
    return stack.join("\n");
  }, exports.cutOffWebpackOptions = stack => exports.cutOffByFlag(stack, WEBPACK_OPTIONS_FLAG), 
  exports.cutOffMultilineMessage = (stack, message) => (stack = stack.split("\n"), 
  message = message.split("\n"), stack.reduce((acc, line, idx) => line === message[idx] || line === "Error: " + message[idx] ? acc : acc.concat(line), []).join("\n")), 
  exports.cleanUpWebpackOptions = (stack, message) => (stack = exports.cutOffWebpackOptions(stack), 
  stack = exports.cutOffMultilineMessage(stack, message));
}, function(module, exports, __webpack_require__) {
  const runWhenInstalled = (packages, pathForCmd, ...args) => {
    const func = __webpack_require__(2)(pathForCmd).default;
    if ("function" != typeof func) throw new Error(`@webpack-cli/${packages} failed to export a default function`);
    return func(...args);
  };
  module.exports = function(packages, ...args) {
    const nameOfPackage = "@webpack-cli/" + packages;
    let pathForCmd, packageIsInstalled = !1;
    try {
      const path = __webpack_require__(0), fs = __webpack_require__(3);
      if (pathForCmd = path.resolve(process.cwd(), "node_modules", "@webpack-cli", packages), 
      fs.existsSync(pathForCmd)) __webpack_require__(2).resolve(pathForCmd); else {
        const globalModules = __webpack_require__(14);
        pathForCmd = globalModules + "/@webpack-cli/" + packages, __webpack_require__(2).resolve(pathForCmd);
      }
      packageIsInstalled = !0;
    } catch (err) {
      packageIsInstalled = !1;
    }
    if (packageIsInstalled) return runWhenInstalled(packages, pathForCmd, ...args);
    {
      const path = __webpack_require__(0), fs = __webpack_require__(3), readLine = __webpack_require__(33), isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock")), packageManager = isYarn ? "yarn" : "npm", options = [ "install", "-D", nameOfPackage ];
      isYarn && (options[0] = "add"), "init" === packages && (isYarn ? (options.splice(1, 1), 
      options.splice(0, 0, "global")) : options[1] = "-g");
      const commandToBeRun = `${packageManager} ${options.join(" ")}`, question = `Would you like to install ${packages}? (That will run ${commandToBeRun}) (yes/NO) : `;
      console.error("The command moved into a separate package: " + nameOfPackage);
      const questionInterface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      questionInterface.question(question, answer => {
        switch (questionInterface.close(), answer.toLowerCase()) {
         case "y":
         case "yes":
         case "1":
          ((command, args) => {
            const cp = __webpack_require__(13);
            return new Promise((resolve, reject) => {
              const executedCommand = cp.spawn(command, args, {
                stdio: "inherit",
                shell: !0
              });
              executedCommand.on("error", error => {
                reject(error);
              }), executedCommand.on("exit", code => {
                0 === code ? resolve() : reject();
              });
            });
          })(packageManager, options).then(_ => {
            if ("init" !== packages) return pathForCmd = path.resolve(process.cwd(), "node_modules", "@webpack-cli", packages), 
            runWhenInstalled(packages, pathForCmd, ...args);
            (() => {
              const cp = __webpack_require__(13);
              return new Promise((resolve, reject) => {
                const command = cp.spawn("npm", [ "root", "-g" ]);
                command.on("error", error => reject(error)), command.stdout.on("data", data => resolve(data.toString())), 
                command.stderr.on("data", data => reject(data));
              });
            })().then(root => path.resolve(root.trim(), "@webpack-cli", "init")).then(pathForInit => __webpack_require__(2)(pathForInit).default(...args)).catch(error => {
              console.error(error), process.exitCode = 1;
            });
          }).catch(error => {
            console.error(error), process.exitCode = 1;
          });
          break;

         default:
          console.error(nameOfPackage + " needs to be installed in order to run the command."), 
          process.exitCode = 1;
        }
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  (function(module) {
    const fs = __webpack_require__(3), os = __webpack_require__(10), path = __webpack_require__(0), ini = __webpack_require__(28);
    let prefix;
    const getPrefix = () => {
      if (process.env.PREFIX) return process.env.PREFIX;
      if (prefix) return prefix;
      let home = os.homedir();
      if (home && (prefix = tryConfigPath(path.resolve(home, ".npmrc"))), prefix) return prefix;
      let npm = function() {
        try {
          return fs.realpathSync(__webpack_require__(29).sync("npm"));
        } catch (err) {}
      }();
      if (npm && (prefix = tryConfigPath(path.resolve(npm, "..", "..", "npmrc")), prefix && (prefix = tryConfigPath(path.resolve(prefix, "etc", "npmrc")) || prefix)), 
      !prefix) {
        let {APPDATA: APPDATA, DESTDIR: DESTDIR, OSTYPE: OSTYPE} = process.env;
        if ("win32" === process.platform || "msys" === OSTYPE || "cygwin" === OSTYPE) return prefix = APPDATA ? path.join(APPDATA, "npm") : path.dirname(process.execPath), 
        prefix;
        prefix = path.dirname(path.dirname(process.execPath)), DESTDIR && (prefix = path.join(DESTDIR, prefix));
      }
      return prefix;
    };
    function tryConfigPath(configPath) {
      try {
        return ini.parse(fs.readFileSync(configPath, "utf-8")).prefix;
      } catch (err) {}
    }
    Reflect.defineProperty(module, "exports", {
      get: () => getPrefix()
    });
  }).call(this, __webpack_require__(5)(module));
}, function(module, exports) {
  exports.parse = exports.decode = function(str) {
    var out = {}, p = out, section = null, re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    return str.split(/[\r\n]+/g).forEach((function(line, _, __) {
      if (line && !line.match(/^\s*[;#]/)) {
        var match = line.match(re);
        if (match) {
          if (void 0 !== match[1]) return "__proto__" === (section = unsafe(match[1])) ? void (p = {}) : void (p = out[section] = out[section] || {});
          var key = unsafe(match[2]);
          if ("__proto__" !== key) {
            var value = !match[3] || unsafe(match[4]);
            switch (value) {
             case "true":
             case "false":
             case "null":
              value = JSON.parse(value);
            }
            if (key.length > 2 && "[]" === key.slice(-2)) {
              if ("__proto__" === (key = key.substring(0, key.length - 2))) return;
              p[key] ? Array.isArray(p[key]) || (p[key] = [ p[key] ]) : p[key] = [];
            }
            Array.isArray(p[key]) ? p[key].push(value) : p[key] = value;
          }
        }
      }
    })), Object.keys(out).filter((function(k, _, __) {
      if (!out[k] || "object" != typeof out[k] || Array.isArray(out[k])) return !1;
      var parts = dotSplit(k), p = out, l = parts.pop(), nl = l.replace(/\\\./g, ".");
      return parts.forEach((function(part, _, __) {
        "__proto__" !== part && (p[part] && "object" == typeof p[part] || (p[part] = {}), 
        p = p[part]);
      })), (p !== out || nl !== l) && (p[nl] = out[k], !0);
    })).forEach((function(del, _, __) {
      delete out[del];
    })), out;
  }, exports.stringify = exports.encode = function encode(obj, opt) {
    var children = [], out = "";
    "string" == typeof opt ? opt = {
      section: opt,
      whitespace: !1
    } : (opt = opt || {}).whitespace = !0 === opt.whitespace;
    var separator = opt.whitespace ? " = " : "=";
    Object.keys(obj).forEach((function(k, _, __) {
      var val = obj[k];
      val && Array.isArray(val) ? val.forEach((function(item) {
        out += safe(k + "[]") + separator + safe(item) + "\n";
      })) : val && "object" == typeof val ? children.push(k) : out += safe(k) + separator + safe(val) + eol;
    })), opt.section && out.length && (out = "[" + safe(opt.section) + "]" + eol + out);
    return children.forEach((function(k, _, __) {
      var nk = dotSplit(k).join("\\."), section = (opt.section ? opt.section + "." : "") + nk, child = encode(obj[k], {
        section: section,
        whitespace: opt.whitespace
      });
      out.length && child.length && (out += eol), out += child;
    })), out;
  }, exports.safe = safe, exports.unsafe = unsafe;
  var eol = "undefined" != typeof process && "win32" === process.platform ? "\r\n" : "\n";
  function dotSplit(str) {
    return str.replace(/\1/g, "LITERAL\\1LITERAL").replace(/\\\./g, "").split(/\./).map((function(part) {
      return part.replace(/\1/g, "\\.").replace(/\2LITERAL\\1LITERAL\2/g, "");
    }));
  }
  function isQuoted(val) {
    return '"' === val.charAt(0) && '"' === val.slice(-1) || "'" === val.charAt(0) && "'" === val.slice(-1);
  }
  function safe(val) {
    return "string" != typeof val || val.match(/[=\r\n]/) || val.match(/^\[/) || val.length > 1 && isQuoted(val) || val !== val.trim() ? JSON.stringify(val) : val.replace(/;/g, "\\;").replace(/#/g, "\\#");
  }
  function unsafe(val, doUnesc) {
    if (!isQuoted(val = (val || "").trim())) {
      for (var esc = !1, unesc = "", i = 0, l = val.length; i < l; i++) {
        var c = val.charAt(i);
        if (esc) -1 !== "\\;#".indexOf(c) ? unesc += c : unesc += "\\" + c, esc = !1; else {
          if (-1 !== ";#".indexOf(c)) break;
          "\\" === c ? esc = !0 : unesc += c;
        }
      }
      return esc && (unesc += "\\"), unesc.trim();
    }
    "'" === val.charAt(0) && (val = val.substr(1, val.length - 2));
    try {
      val = JSON.parse(val);
    } catch (_) {}
    return val;
  }
}, function(module, exports, __webpack_require__) {
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
  var isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(0), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(30);
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
}, function(module, exports, __webpack_require__) {
  var core;
  __webpack_require__(3);
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
  core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(31) : __webpack_require__(32), 
  module.exports = isexe, isexe.sync = function(path, options) {
    try {
      return core.sync(path, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
      throw er;
    }
  };
}, function(module, exports, __webpack_require__) {
  module.exports = isexe, isexe.sync = function(path, options) {
    return checkStat(fs.statSync(path), path, options);
  };
  var fs = __webpack_require__(3);
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
}, function(module, exports, __webpack_require__) {
  module.exports = isexe, isexe.sync = function(path, options) {
    return checkStat(fs.statSync(path), options);
  };
  var fs = __webpack_require__(3);
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
}, function(module, exports) {
  module.exports = require("readline");
}, function(module, exports) {
  module.exports = require("../vendor/yargs");
}, function(module) {
  module.exports = JSON.parse('{"name":"webpack-cli","version":"3.3.12","description":"CLI for webpack & friends"}');
}, function(module, exports, __webpack_require__) {
  const optionsSchema = __webpack_require__(37), {GROUPS: GROUPS} = __webpack_require__(9), {CONFIG_GROUP: CONFIG_GROUP, BASIC_GROUP: BASIC_GROUP, MODULE_GROUP: MODULE_GROUP, OUTPUT_GROUP: OUTPUT_GROUP, ADVANCED_GROUP: ADVANCED_GROUP, RESOLVE_GROUP: RESOLVE_GROUP, OPTIMIZE_GROUP: OPTIMIZE_GROUP, DISPLAY_GROUP: DISPLAY_GROUP} = GROUPS, nestedProperties = [ "anyOf", "oneOf", "allOf" ], resolveSchema = schema => {
    let current = schema;
    if (schema && "object" == typeof schema && "$ref" in schema) {
      const path = schema.$ref.split("/");
      for (const element of path) current = "#" === element ? optionsSchema : current[element];
    }
    return current;
  }, findPropertyInSchema = (schema, property, subProperty) => {
    if (!schema) return null;
    if (subProperty) {
      if (schema[property] && "object" == typeof schema[property] && subProperty in schema[property]) return resolveSchema(schema[property][subProperty]);
    } else if (property in schema) return resolveSchema(schema[property]);
    for (const name of nestedProperties) if (schema[name]) for (const item of schema[name]) {
      const resolvedItem = resolveSchema(item), result = findPropertyInSchema(resolvedItem, property, subProperty);
      if (result) return result;
    }
  }, getSchemaInfo = (path, property, subProperty) => {
    const pathSegments = path.split(".");
    let current = optionsSchema;
    for (const segment of pathSegments) if (current = "*" === segment ? findPropertyInSchema(current, "additionalProperties") || findPropertyInSchema(current, "items") : findPropertyInSchema(current, "properties", segment), 
    !current) return;
    return findPropertyInSchema(current, property, subProperty);
  };
  module.exports = function(yargs) {
    yargs.help("help").alias("help", "h").version().alias("version", "v").options({
      config: {
        type: "string",
        describe: "Path to the config file",
        group: CONFIG_GROUP,
        defaultDescription: "webpack.config.js or webpackfile.js",
        requiresArg: !0
      },
      "config-register": {
        type: "array",
        alias: "r",
        describe: "Preload one or more modules before loading the webpack configuration",
        group: CONFIG_GROUP,
        defaultDescription: "module id or path",
        requiresArg: !0
      },
      "config-name": {
        type: "string",
        describe: "Name of the config to use",
        group: CONFIG_GROUP,
        requiresArg: !0
      },
      env: {
        describe: "Environment passed to the config, when it is a function",
        group: CONFIG_GROUP
      },
      mode: {
        type: getSchemaInfo("mode", "type"),
        choices: getSchemaInfo("mode", "enum"),
        describe: getSchemaInfo("mode", "description"),
        group: CONFIG_GROUP,
        requiresArg: !0
      },
      context: {
        type: getSchemaInfo("context", "type"),
        describe: getSchemaInfo("context", "description"),
        group: BASIC_GROUP,
        defaultDescription: "The current directory",
        requiresArg: !0
      },
      entry: {
        type: "string",
        describe: getSchemaInfo("entry", "description"),
        group: BASIC_GROUP,
        requiresArg: !0
      },
      "no-cache": {
        type: "boolean",
        describe: "Disables cached builds",
        group: BASIC_GROUP
      },
      "module-bind": {
        type: "string",
        describe: "Bind an extension to a loader",
        group: MODULE_GROUP,
        requiresArg: !0
      },
      "module-bind-post": {
        type: "string",
        describe: "Bind an extension to a post loader",
        group: MODULE_GROUP,
        requiresArg: !0
      },
      "module-bind-pre": {
        type: "string",
        describe: "Bind an extension to a pre loader",
        group: MODULE_GROUP,
        requiresArg: !0
      },
      output: {
        alias: "o",
        describe: "The output path and file for compilation assets",
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-path": {
        type: "string",
        describe: getSchemaInfo("output.path", "description"),
        group: OUTPUT_GROUP,
        defaultDescription: "The current directory",
        requiresArg: !0
      },
      "output-filename": {
        type: "string",
        describe: getSchemaInfo("output.filename", "description"),
        group: OUTPUT_GROUP,
        defaultDescription: "[name].js",
        requiresArg: !0
      },
      "output-chunk-filename": {
        type: "string",
        describe: getSchemaInfo("output.chunkFilename", "description"),
        group: OUTPUT_GROUP,
        defaultDescription: "filename with [id] instead of [name] or [id] prefixed",
        requiresArg: !0
      },
      "output-source-map-filename": {
        type: "string",
        describe: getSchemaInfo("output.sourceMapFilename", "description"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-public-path": {
        type: "string",
        describe: getSchemaInfo("output.publicPath", "description"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-jsonp-function": {
        type: "string",
        describe: getSchemaInfo("output.jsonpFunction", "description"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-pathinfo": {
        type: "boolean",
        describe: getSchemaInfo("output.pathinfo", "description"),
        group: OUTPUT_GROUP
      },
      "output-library": {
        type: "array",
        describe: "Expose the exports of the entry point as library",
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "output-library-target": {
        type: "string",
        describe: getSchemaInfo("output.libraryTarget", "description"),
        choices: getSchemaInfo("output.libraryTarget", "enum"),
        group: OUTPUT_GROUP,
        requiresArg: !0
      },
      "records-input-path": {
        type: "string",
        describe: getSchemaInfo("recordsInputPath", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "records-output-path": {
        type: "string",
        describe: getSchemaInfo("recordsOutputPath", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "records-path": {
        type: "string",
        describe: getSchemaInfo("recordsPath", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      define: {
        type: "string",
        describe: "Define any free var in the bundle",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      target: {
        type: "string",
        describe: getSchemaInfo("target", "description"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      cache: {
        type: "boolean",
        describe: getSchemaInfo("cache", "description"),
        default: null,
        group: ADVANCED_GROUP,
        defaultDescription: "It's enabled by default when watching"
      },
      watch: {
        type: "boolean",
        alias: "w",
        describe: getSchemaInfo("watch", "description"),
        group: BASIC_GROUP
      },
      "watch-stdin": {
        type: "boolean",
        alias: "stdin",
        describe: getSchemaInfo("watchOptions.stdin", "description"),
        group: ADVANCED_GROUP
      },
      "watch-aggregate-timeout": {
        describe: getSchemaInfo("watchOptions.aggregateTimeout", "description"),
        type: getSchemaInfo("watchOptions.aggregateTimeout", "type"),
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "watch-poll": {
        type: "string",
        describe: getSchemaInfo("watchOptions.poll", "description"),
        group: ADVANCED_GROUP
      },
      hot: {
        type: "boolean",
        describe: "Enables Hot Module Replacement",
        group: ADVANCED_GROUP
      },
      debug: {
        type: "boolean",
        describe: "Switch loaders to debug mode",
        group: BASIC_GROUP
      },
      devtool: {
        type: "string",
        describe: getSchemaInfo("devtool", "description"),
        group: BASIC_GROUP,
        requiresArg: !0
      },
      "resolve-alias": {
        type: "string",
        describe: getSchemaInfo("resolve.alias", "description"),
        group: RESOLVE_GROUP,
        requiresArg: !0
      },
      "resolve-extensions": {
        type: "array",
        describe: getSchemaInfo("resolve.alias", "description"),
        group: RESOLVE_GROUP,
        requiresArg: !0
      },
      "resolve-loader-alias": {
        type: "string",
        describe: "Setup a loader alias for resolving",
        group: RESOLVE_GROUP,
        requiresArg: !0
      },
      "optimize-max-chunks": {
        describe: "Try to keep the chunk count below a limit",
        group: OPTIMIZE_GROUP,
        requiresArg: !0
      },
      "optimize-min-chunk-size": {
        describe: getSchemaInfo("optimization.splitChunks.minSize", "description"),
        group: OPTIMIZE_GROUP,
        requiresArg: !0
      },
      "optimize-minimize": {
        type: "boolean",
        describe: getSchemaInfo("optimization.minimize", "description"),
        group: OPTIMIZE_GROUP
      },
      prefetch: {
        type: "string",
        describe: "Prefetch this request (Example: --prefetch ./file.js)",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      provide: {
        type: "string",
        describe: "Provide these modules as free vars in all modules (Example: --provide jQuery=jquery)",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      "labeled-modules": {
        type: "boolean",
        describe: "Enables labeled modules",
        group: ADVANCED_GROUP
      },
      plugin: {
        type: "string",
        describe: "Load this plugin",
        group: ADVANCED_GROUP,
        requiresArg: !0
      },
      bail: {
        type: getSchemaInfo("bail", "type"),
        describe: getSchemaInfo("bail", "description"),
        group: ADVANCED_GROUP,
        default: null
      },
      profile: {
        type: "boolean",
        describe: getSchemaInfo("profile", "description"),
        group: ADVANCED_GROUP,
        default: null
      },
      d: {
        type: "boolean",
        describe: "shortcut for --debug --devtool eval-cheap-module-source-map --output-pathinfo",
        group: BASIC_GROUP
      },
      p: {
        type: "boolean",
        describe: 'shortcut for --optimize-minimize --define process.env.NODE_ENV="production"',
        group: BASIC_GROUP
      },
      silent: {
        type: "boolean",
        describe: "Prevent output from being displayed in stdout"
      },
      json: {
        type: "boolean",
        alias: "j",
        describe: "Prints the result as JSON."
      },
      progress: {
        type: "boolean",
        describe: "Print compilation progress in percentage",
        group: BASIC_GROUP
      },
      color: {
        type: "boolean",
        alias: "colors",
        default: function() {
          return __webpack_require__(15).stdout;
        },
        group: DISPLAY_GROUP,
        describe: "Force colors on the console"
      },
      "no-color": {
        type: "boolean",
        alias: "no-colors",
        group: DISPLAY_GROUP,
        describe: "Force no colors on the console"
      },
      "sort-modules-by": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Sorts the modules list by property in module"
      },
      "sort-chunks-by": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Sorts the chunks list by property in chunk"
      },
      "sort-assets-by": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Sorts the assets list by property in asset"
      },
      "hide-modules": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Hides info about modules"
      },
      "display-exclude": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Exclude modules in the output"
      },
      "display-modules": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display even excluded modules in the output"
      },
      "display-max-modules": {
        type: "number",
        group: DISPLAY_GROUP,
        describe: "Sets the maximum number of visible modules in output"
      },
      "display-chunks": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display chunks in the output"
      },
      "display-entrypoints": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display entry points in the output"
      },
      "display-origins": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display origins of chunks in the output"
      },
      "display-cached": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display also cached modules in the output"
      },
      "display-cached-assets": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display also cached assets in the output"
      },
      "display-reasons": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display reasons about module inclusion in the output"
      },
      "display-depth": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display distance from entry point for each module"
      },
      "display-used-exports": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display information about used exports in modules (Tree Shaking)"
      },
      "display-provided-exports": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display information about exports provided from modules"
      },
      "display-optimization-bailout": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display information about why optimization bailed out for modules"
      },
      "display-error-details": {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Display details about errors"
      },
      display: {
        type: "string",
        choices: [ "", "verbose", "detailed", "normal", "minimal", "errors-only", "none" ],
        group: DISPLAY_GROUP,
        describe: "Select display preset"
      },
      verbose: {
        type: "boolean",
        group: DISPLAY_GROUP,
        describe: "Show more details"
      },
      "info-verbosity": {
        type: "string",
        default: "info",
        choices: [ "none", "info", "verbose" ],
        group: DISPLAY_GROUP,
        describe: "Controls the output of lifecycle messaging e.g. Started watching files..."
      },
      "build-delimiter": {
        type: "string",
        group: DISPLAY_GROUP,
        describe: "Display custom text after build output"
      }
    });
  };
}, function(module) {
  module.exports = JSON.parse('{"additionalProperties":false,"definitions":{"common.pluginFunction":{"description":"Function acting as plugin","instanceof":"Function","properties":{"apply":{"description":"The run point of the plugin, required method.","instanceof":"Function"}},"additionalProperties":true,"required":["apply"]},"common.pluginObject":{"description":"Plugin instance","type":"object","properties":{"apply":{"description":"The run point of the plugin, required method.","instanceof":"Function"}},"additionalProperties":true,"required":["apply"]},"common.arrayOfStringOrStringArrayValues":{"items":{"description":"string or array of strings","anyOf":[{"minLength":1,"type":"string"},{"items":{"description":"A non-empty string","minLength":1,"type":"string"},"type":"array"}]},"type":"array"},"common.arrayOfStringValues":{"items":{"description":"A non-empty string","minLength":1,"type":"string"},"type":"array"},"common.nonEmptyArrayOfUniqueStringValues":{"items":{"description":"A non-empty string","minLength":1,"type":"string"},"minItems":1,"type":"array","uniqueItems":true},"entry":{"oneOf":[{"minProperties":1,"additionalProperties":{"description":"An entry point with name","oneOf":[{"description":"The string is resolved to a module which is loaded upon startup.","minLength":1,"type":"string"},{"description":"All modules are loaded upon startup. The last one is exported.","anyOf":[{"$ref":"#/definitions/common.nonEmptyArrayOfUniqueStringValues"}]}]},"description":"Multiple entry bundles are created. The key is the chunk name. The value can be a string or an array.","type":"object"},{"description":"An entry point without name. The string is resolved to a module which is loaded upon startup.","minLength":1,"type":"string"},{"description":"An entry point without name. All modules are loaded upon startup. The last one is exported.","anyOf":[{"$ref":"#/definitions/common.nonEmptyArrayOfUniqueStringValues"}]},{"description":"A Function returning an entry object, an entry string, an entry array or a promise to these things.","instanceof":"Function"}]},"externals":{"anyOf":[{"description":"An exact matched dependency becomes external. The same string is used as external dependency.","type":"string"},{"additionalProperties":{"description":"The dependency used for the external","anyOf":[{"type":"string"},{"type":"object"},{"type":"boolean"}]},"description":"If an dependency matches exactly a property of the object, the property value is used as dependency.","type":"object"},{"description":"`function(context, request, callback(err, result))` The function is called on each dependency.","instanceof":"Function"},{"description":"Every matched dependency becomes external.","instanceof":"RegExp"},{"items":{"description":"External configuration","anyOf":[{"$ref":"#/definitions/externals"}]},"type":"array"}]},"module":{"additionalProperties":false,"properties":{"exprContextCritical":{"description":"Enable warnings for full dynamic dependencies","type":"boolean"},"exprContextRecursive":{"description":"Enable recursive directory lookup for full dynamic dependencies","type":"boolean"},"exprContextRegExp":{"description":"Sets the default regular expression for full dynamic dependencies","anyOf":[{"type":"boolean"},{"instanceof":"RegExp"}]},"exprContextRequest":{"description":"Set the default request for full dynamic dependencies","type":"string"},"noParse":{"description":"Don\'t parse files matching. It\'s matched against the full resolved request.","anyOf":[{"items":{"description":"A regular expression, when matched the module is not parsed","instanceof":"RegExp"},"minItems":1,"type":"array"},{"instanceof":"RegExp"},{"instanceof":"Function"},{"items":{"description":"An absolute path, when the module starts with this path it is not parsed","type":"string","absolutePath":true},"minItems":1,"type":"array"},{"type":"string","absolutePath":true}]},"rules":{"allOf":[{"$ref":"#/definitions/ruleSet-rules"}],"description":"An array of rules applied for modules."},"defaultRules":{"description":"An array of rules applied by default for modules.","anyOf":[{"$ref":"#/definitions/ruleSet-rules"}]},"unknownContextCritical":{"description":"Enable warnings when using the require function in a not statically analyse-able way","type":"boolean"},"unknownContextRecursive":{"description":"Enable recursive directory lookup when using the require function in a not statically analyse-able way","type":"boolean"},"unknownContextRegExp":{"description":"Sets the regular expression when using the require function in a not statically analyse-able way","anyOf":[{"type":"boolean"},{"instanceof":"RegExp"}]},"unknownContextRequest":{"description":"Sets the request when using the require function in a not statically analyse-able way","type":"string"},"unsafeCache":{"description":"Cache the resolving of module requests","anyOf":[{"type":"boolean"},{"instanceof":"Function"}]},"wrappedContextCritical":{"description":"Enable warnings for partial dynamic dependencies","type":"boolean"},"wrappedContextRecursive":{"description":"Enable recursive directory lookup for partial dynamic dependencies","type":"boolean"},"wrappedContextRegExp":{"description":"Set the inner regular expression for partial dynamic dependencies","instanceof":"RegExp"},"strictExportPresence":{"description":"Emit errors instead of warnings when imported names don\'t exist in imported module","type":"boolean"},"strictThisContextOnImports":{"description":"Handle the this context correctly according to the spec for namespace objects","type":"boolean"}},"type":"object"},"output":{"additionalProperties":false,"properties":{"auxiliaryComment":{"description":"Add a comment in the UMD wrapper.","anyOf":[{"description":"Append the same comment above each import style.","type":"string"},{"additionalProperties":false,"description":"Set explicit comments for `commonjs`, `commonjs2`, `amd`, and `root`.","properties":{"amd":{"description":"Set comment for `amd` section in UMD","type":"string"},"commonjs":{"description":"Set comment for `commonjs` (exports) section in UMD","type":"string"},"commonjs2":{"description":"Set comment for `commonjs2` (module.exports) section in UMD","type":"string"},"root":{"description":"Set comment for `root` (global variable) section in UMD","type":"string"}},"type":"object"}]},"chunkFilename":{"description":"The filename of non-entry chunks as relative path inside the `output.path` directory.","type":"string","absolutePath":false},"webassemblyModuleFilename":{"description":"The filename of WebAssembly modules as relative path inside the `output.path` directory.","type":"string","absolutePath":false},"globalObject":{"description":"An expression which is used to address the global object/scope in runtime code","type":"string","minLength":1},"crossOriginLoading":{"description":"This option enables cross-origin loading of chunks.","enum":[false,"anonymous","use-credentials"]},"jsonpScriptType":{"description":"This option enables loading async chunks via a custom script type, such as script type=\\"module\\"","enum":[false,"text/javascript","module"]},"chunkLoadTimeout":{"description":"Number of milliseconds before chunk request expires","type":"number"},"devtoolFallbackModuleFilenameTemplate":{"description":"Similar to `output.devtoolModuleFilenameTemplate`, but used in the case of duplicate module identifiers.","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"devtoolLineToLine":{"description":"Enable line to line mapped mode for all/specified modules. Line to line mapped mode uses a simple SourceMap where each line of the generated source is mapped to the same line of the original source. It’s a performance optimization. Only use it if your performance need to be better and you are sure that input lines match which generated lines.","anyOf":[{"description":"`true` enables it for all modules (not recommended)","type":"boolean"},{"description":"An object similar to `module.loaders` enables it for specific files.","type":"object"}]},"devtoolModuleFilenameTemplate":{"description":"Filename template string of function for the sources array in a generated SourceMap.","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"devtoolNamespace":{"description":"Module namespace to use when interpolating filename template string for the sources array in a generated SourceMap. Defaults to `output.library` if not set. It\'s useful for avoiding runtime collisions in sourcemaps from multiple webpack projects built as libraries.","type":"string"},"filename":{"description":"Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written to, filename is used solely for naming the individual files.","anyOf":[{"type":"string"},{"instanceof":"Function"}],"absolutePath":false},"hashDigest":{"description":"Digest type used for the hash","enum":["latin1","hex","base64"]},"hashDigestLength":{"description":"Number of chars which are used for the hash","minimum":1,"type":"number"},"hashFunction":{"description":"Algorithm used for generation the hash (see node.js crypto package)","anyOf":[{"type":"string","minLength":1},{"instanceof":"Function"}]},"hashSalt":{"description":"Any string which is added to the hash to salt it","minLength":1,"type":"string"},"hotUpdateChunkFilename":{"description":"The filename of the Hot Update Chunks. They are inside the output.path directory.","anyOf":[{"type":"string"},{"instanceof":"Function"}],"absolutePath":false},"hotUpdateFunction":{"description":"The JSONP function used by webpack for async loading of hot update chunks.","type":"string"},"hotUpdateMainFilename":{"description":"The filename of the Hot Update Main File. It is inside the `output.path` directory.","anyOf":[{"type":"string"},{"instanceof":"Function"}],"absolutePath":false},"jsonpFunction":{"description":"The JSONP function used by webpack for async loading of chunks.","type":"string"},"chunkCallbackName":{"description":"The callback function name used by webpack for loading of chunks in WebWorkers.","type":"string"},"library":{"anyOf":[{"type":"string"},{"items":{"description":"A part of the library name","type":"string"},"type":"array"},{"type":"object","additionalProperties":false,"properties":{"root":{"description":"Name of the property exposed globally by a UMD library","anyOf":[{"type":"string"},{"$ref":"#/definitions/common.arrayOfStringValues"}]},"amd":{"description":"Name of the exposed AMD library in the UMD","type":"string"},"commonjs":{"description":"Name of the exposed commonjs export in the UMD","type":"string"}}}],"description":"If set, export the bundle as library. `output.library` is the name."},"libraryTarget":{"description":"Type of library","enum":["var","assign","this","window","self","global","commonjs","commonjs2","commonjs-module","amd","umd","umd2","jsonp"]},"libraryExport":{"description":"Specify which export should be exposed as library","anyOf":[{"type":"string"},{"$ref":"#/definitions/common.arrayOfStringValues"}]},"path":{"description":"The output directory as **absolute path** (required).","type":"string","absolutePath":true},"pathinfo":{"description":"Include comments with information about the modules.","type":"boolean"},"publicPath":{"description":"The `publicPath` specifies the public URL address of the output files when referenced in a browser.","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"sourceMapFilename":{"description":"The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.","type":"string","absolutePath":false},"sourcePrefix":{"description":"Prefixes every line of the source in the bundle with this string.","type":"string"},"strictModuleExceptionHandling":{"description":"Handles exceptions in module loading correctly at a performance cost.","type":"boolean"},"umdNamedDefine":{"description":"If `output.libraryTarget` is set to umd and `output.library` is set, setting this to true will name the AMD module.","type":"boolean"}},"type":"object"},"resolve":{"additionalProperties":false,"properties":{"alias":{"description":"Redirect module requests","anyOf":[{"additionalProperties":{"description":"New request","type":"string"},"type":"object"},{"items":{"description":"Alias configuration","additionalProperties":false,"properties":{"alias":{"description":"New request","type":"string"},"name":{"description":"Request to be redirected","type":"string"},"onlyModule":{"description":"Redirect only exact matching request","type":"boolean"}},"type":"object"},"type":"array"}]},"aliasFields":{"description":"Fields in the description file (package.json) which are used to redirect requests inside the module","anyOf":[{"$ref":"#/definitions/common.arrayOfStringOrStringArrayValues"}]},"cachePredicate":{"description":"Predicate function to decide which requests should be cached","instanceof":"Function"},"cacheWithContext":{"description":"Include the context information in the cache identifier when caching","type":"boolean"},"descriptionFiles":{"description":"Filenames used to find a description file","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"enforceExtension":{"description":"Enforce using one of the extensions from the extensions option","type":"boolean"},"enforceModuleExtension":{"description":"Enforce using one of the module extensions from the moduleExtensions option","type":"boolean"},"extensions":{"description":"Extensions added to the request when trying to find the file","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"fileSystem":{"description":"Filesystem for the resolver"},"mainFields":{"description":"Field names from the description file (package.json) which are used to find the default entry point","anyOf":[{"$ref":"#/definitions/common.arrayOfStringOrStringArrayValues"}]},"mainFiles":{"description":"Filenames used to find the default entry point if there is no description file or main field","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"moduleExtensions":{"description":"Extensions added to the module request when trying to find the module","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"modules":{"description":"Folder names or directory paths where to find modules","anyOf":[{"$ref":"#/definitions/common.arrayOfStringValues"}]},"plugins":{"description":"Plugins for the resolver","type":"array","items":{"description":"Plugin of type object or instanceof Function","anyOf":[{"$ref":"#/definitions/common.pluginObject"},{"$ref":"#/definitions/common.pluginFunction"}]}},"resolver":{"description":"Custom resolver"},"symlinks":{"description":"Enable resolving symlinks to the original location","type":"boolean"},"concord":{"description":"Enable concord resolving extras","type":"boolean"},"unsafeCache":{"description":"Enable caching of successfully resolved requests","anyOf":[{"type":"boolean"},{"additionalProperties":true,"type":"object"}]},"useSyncFileSystemCalls":{"description":"Use synchronous filesystem calls for the resolver","type":"boolean"}},"type":"object"},"ruleSet-condition":{"anyOf":[{"instanceof":"RegExp"},{"minLength":1,"type":"string"},{"instanceof":"Function"},{"$ref":"#/definitions/ruleSet-conditions"},{"additionalProperties":false,"properties":{"and":{"description":"Logical AND","anyOf":[{"$ref":"#/definitions/ruleSet-conditions"}]},"exclude":{"description":"Exclude all modules matching any of these conditions","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"include":{"description":"Exclude all modules matching not any of these conditions","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"not":{"description":"Logical NOT","anyOf":[{"$ref":"#/definitions/ruleSet-conditions"}]},"or":{"description":"Logical OR","anyOf":[{"$ref":"#/definitions/ruleSet-conditions"}]},"test":{"description":"Exclude all modules matching any of these conditions","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]}},"type":"object"}]},"ruleSet-conditions":{"items":{"description":"A rule condition","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"type":"array"},"ruleSet-loader":{"minLength":1,"type":"string"},"ruleSet-query":{"anyOf":[{"type":"object"},{"type":"string"}]},"ruleSet-rule":{"additionalProperties":false,"properties":{"enforce":{"description":"Enforce this rule as pre or post step","enum":["pre","post"]},"exclude":{"description":"Shortcut for resource.exclude","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"include":{"description":"Shortcut for resource.include","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"issuer":{"description":"Match the issuer of the module (The module pointing to this module)","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"loader":{"description":"Shortcut for use.loader","anyOf":[{"$ref":"#/definitions/ruleSet-loader"},{"$ref":"#/definitions/ruleSet-use"}]},"loaders":{"description":"Shortcut for use.loader","anyOf":[{"$ref":"#/definitions/ruleSet-use"}]},"oneOf":{"description":"Only execute the first matching rule in this array","anyOf":[{"$ref":"#/definitions/ruleSet-rules"}]},"options":{"description":"Shortcut for use.options","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]},"parser":{"description":"Options for parsing","additionalProperties":true,"type":"object"},"resolve":{"description":"Options for the resolver","type":"object","anyOf":[{"$ref":"#/definitions/resolve"}]},"sideEffects":{"description":"Flags a module as with or without side effects","type":"boolean"},"query":{"description":"Shortcut for use.query","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]},"type":{"description":"Module type to use for the module","enum":["javascript/auto","javascript/dynamic","javascript/esm","json","webassembly/experimental"]},"resource":{"description":"Match the resource path of the module","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"resourceQuery":{"description":"Match the resource query of the module","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"compiler":{"description":"Match the child compiler name","anyOf":[{"$ref":"#/definitions/ruleSet-condition"}]},"rules":{"description":"Match and execute these rules when this rule is matched","anyOf":[{"$ref":"#/definitions/ruleSet-rules"}]},"test":{"description":"Shortcut for resource.test","allOf":[{"$ref":"#/definitions/ruleSet-condition"},{"absolutePath":true}]},"use":{"description":"Modifiers applied to the module when rule is matched","anyOf":[{"$ref":"#/definitions/ruleSet-use"}]}},"type":"object"},"ruleSet-rules":{"items":{"description":"A rule","anyOf":[{"$ref":"#/definitions/ruleSet-rule"}]},"type":"array"},"ruleSet-use":{"anyOf":[{"$ref":"#/definitions/ruleSet-use-item"},{"instanceof":"Function"},{"items":{"description":"An use item","anyOf":[{"$ref":"#/definitions/ruleSet-use-item"}]},"type":"array"}]},"ruleSet-use-item":{"anyOf":[{"$ref":"#/definitions/ruleSet-loader"},{"instanceof":"Function"},{"additionalProperties":false,"properties":{"loader":{"description":"Loader name","anyOf":[{"$ref":"#/definitions/ruleSet-loader"}]},"options":{"description":"Loader options","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]},"ident":{"description":"Unique loader identifier","type":"string"},"query":{"description":"Loader query","anyOf":[{"$ref":"#/definitions/ruleSet-query"}]}},"type":"object"}]},"filter-item-types":{"anyOf":[{"instanceof":"RegExp"},{"type":"string"},{"instanceof":"Function"}]},"filter-types":{"anyOf":[{"$ref":"#/definitions/filter-item-types"},{"type":"array","items":{"description":"Rule to filter","anyOf":[{"$ref":"#/definitions/filter-item-types"}]}}]}},"properties":{"mode":{"description":"Enable production optimizations or development hints.","enum":["development","production","none"]},"amd":{"description":"Set the value of `require.amd` and `define.amd`."},"bail":{"description":"Report the first error as a hard error instead of tolerating it.","type":"boolean"},"cache":{"description":"Cache generated modules and chunks to improve performance for multiple incremental builds.","anyOf":[{"description":"You can pass `false` to disable it.","type":"boolean"},{"description":"You can pass an object to enable it and let webpack use the passed object as cache. This way you can share the cache object between multiple compiler calls.","type":"object"}]},"context":{"description":"The base directory (absolute path!) for resolving the `entry` option. If `output.pathinfo` is set, the included pathinfo is shortened to this directory.","type":"string","absolutePath":true},"dependencies":{"description":"References to other configurations to depend on.","items":{"description":"References to another configuration to depend on.","type":"string"},"type":"array"},"devServer":{"description":"Options for the webpack-dev-server","type":"object"},"devtool":{"description":"A developer tool to enhance debugging.","anyOf":[{"type":"string"},{"enum":[false]}]},"entry":{"description":"The entry point(s) of the compilation.","anyOf":[{"$ref":"#/definitions/entry"}]},"externals":{"description":"Specify dependencies that shouldn\'t be resolved by webpack, but should become dependencies of the resulting bundle. The kind of the dependency depends on `output.libraryTarget`.","anyOf":[{"$ref":"#/definitions/externals"}]},"loader":{"description":"Custom values available in the loader context.","type":"object"},"module":{"description":"Options affecting the normal modules (`NormalModuleFactory`).","anyOf":[{"$ref":"#/definitions/module"}]},"name":{"description":"Name of the configuration. Used when loading multiple configurations.","type":"string"},"node":{"description":"Include polyfills or mocks for various node stuff.","anyOf":[{"enum":[false]},{"additionalProperties":{"description":"Include a polyfill for the node.js module","enum":[false,true,"mock","empty"]},"properties":{"Buffer":{"description":"Include a polyfill for the \'Buffer\' variable","enum":[false,true,"mock"]},"__dirname":{"description":"Include a polyfill for the \'__dirname\' variable","enum":[false,true,"mock"]},"__filename":{"description":"Include a polyfill for the \'__filename\' variable","enum":[false,true,"mock"]},"console":{"description":"Include a polyfill for the \'console\' variable","enum":[false,true,"mock"]},"global":{"description":"Include a polyfill for the \'global\' variable","type":"boolean"},"process":{"description":"Include a polyfill for the \'process\' variable","enum":[false,true,"mock"]}},"type":"object"}]},"output":{"description":"Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk.","anyOf":[{"$ref":"#/definitions/output"}]},"optimization":{"description":"Enables/Disables integrated optimizations","type":"object","additionalProperties":false,"properties":{"removeAvailableModules":{"description":"Removes modules from chunks when these modules are already included in all parents","type":"boolean"},"removeEmptyChunks":{"description":"Remove chunks which are empty","type":"boolean"},"mergeDuplicateChunks":{"description":"Merge chunks which contain the same modules","type":"boolean"},"flagIncludedChunks":{"description":"Also flag chunks as loaded which contain a subset of the modules","type":"boolean"},"occurrenceOrder":{"description":"Figure out a order of modules which results in the smallest initial bundle","type":"boolean"},"sideEffects":{"description":"Skip over modules which are flagged to contain no side effects when exports are not used","type":"boolean"},"providedExports":{"description":"Figure out which exports are provided by modules to generate more efficient code","type":"boolean"},"usedExports":{"description":"Figure out which exports are used by modules to mangle export names, omit unused exports and generate more efficient code","type":"boolean"},"concatenateModules":{"description":"Concatenate modules when possible to generate less modules, more efficient code and enable more optimizations by the minimizer","type":"boolean"},"splitChunks":{"description":"Optimize duplication and caching by splitting chunks by shared modules and cache group","oneOf":[{"enum":[false]},{"type":"object","additionalProperties":false,"properties":{"chunks":{"description":"Select chunks for determining shared modules (defaults to \\"async\\", \\"initial\\" and \\"all\\" requires adding these chunks to the HTML)","oneOf":[{"enum":["initial","async","all"]},{"instanceof":"Function"}]},"minSize":{"description":"Minimal size for the created chunk","type":"number","minimum":0},"minChunks":{"description":"Minimum number of times a module has to be duplicated until it\'s considered for splitting","type":"number","minimum":1},"maxAsyncRequests":{"description":"Maximum number of requests which are accepted for on-demand loading","type":"number","minimum":1},"maxInitialRequests":{"description":"Maximum number of initial chunks which are accepted for an entry point","type":"number","minimum":1},"name":{"description":"Give chunks created a name (chunks with equal name are merged)","oneOf":[{"type":"boolean"},{"instanceof":"Function"},{"type":"string"}]},"filename":{"description":"Sets the template for the filename for created chunks (Only works for initial chunks)","type":"string","minLength":1},"automaticNameDelimiter":{"description":"Sets the name delimiter for created chunks","type":"string","minLength":1},"cacheGroups":{"description":"Assign modules to a cache group (modules from different cache groups are tried to keep in separate chunks)","type":"object","additionalProperties":{"description":"Configuration for a cache group","anyOf":[{"enum":[false]},{"instanceof":"Function"},{"type":"string"},{"instanceof":"RegExp"},{"type":"object","additionalProperties":false,"properties":{"test":{"description":"Assign modules to a cache group","oneOf":[{"instanceof":"Function"},{"type":"string"},{"instanceof":"RegExp"}]},"chunks":{"description":"Select chunks for determining cache group content (defaults to \\"initial\\", \\"initial\\" and \\"all\\" requires adding these chunks to the HTML)","oneOf":[{"enum":["initial","async","all"]},{"instanceof":"Function"}]},"enforce":{"description":"Ignore minimum size, minimum chunks and maximum requests and always create chunks for this cache group","type":"boolean"},"priority":{"description":"Priority of this cache group","type":"number"},"minSize":{"description":"Minimal size for the created chunk","type":"number","minimum":0},"minChunks":{"description":"Minimum number of times a module has to be duplicated until it\'s considered for splitting","type":"number","minimum":1},"maxAsyncRequests":{"description":"Maximum number of requests which are accepted for on-demand loading","type":"number","minimum":1},"maxInitialRequests":{"description":"Maximum number of initial chunks which are accepted for an entry point","type":"number","minimum":1},"reuseExistingChunk":{"description":"Try to reuse existing chunk (with name) when it has matching modules","type":"boolean"},"name":{"description":"Give chunks for this cache group a name (chunks with equal name are merged)","oneOf":[{"type":"boolean"},{"instanceof":"Function"},{"type":"string"}]},"filename":{"description":"Sets the template for the filename for created chunks (Only works for initial chunks)","type":"string","minLength":1}}}]}}}}]},"runtimeChunk":{"description":"Create an additional chunk which contains only the webpack runtime and chunk hash maps","oneOf":[{"type":"boolean"},{"enum":["single","multiple"]},{"type":"object","additionalProperties":false,"properties":{"name":{"description":"The name or name factory for the runtime chunks","oneOf":[{"type":"string"},{"instanceof":"Function"}]}}}]},"noEmitOnErrors":{"description":"Avoid emitting assets when errors occur","type":"boolean"},"namedModules":{"description":"Use readable module identifiers for better debugging","type":"boolean"},"namedChunks":{"description":"Use readable chunk identifiers for better debugging","type":"boolean"},"portableRecords":{"description":"Generate records with relative paths to be able to move the context folder","type":"boolean"},"minimize":{"description":"Enable minimizing the output. Uses optimization.minimizer.","type":"boolean"},"minimizer":{"description":"Minimizer(s) to use for minimizing the output","type":"array","items":{"description":"Plugin of type object or instanceof Function","anyOf":[{"$ref":"#/definitions/common.pluginObject"},{"$ref":"#/definitions/common.pluginFunction"}]}},"nodeEnv":{"description":"Set process.env.NODE_ENV to a specific value","anyOf":[{"enum":[false]},{"type":"string"}]}}},"parallelism":{"description":"The number of parallel processed modules in the compilation.","minimum":1,"type":"number"},"performance":{"description":"Configuration for web performance recommendations.","anyOf":[{"enum":[false]},{"additionalProperties":false,"properties":{"assetFilter":{"description":"Filter function to select assets that are checked","instanceof":"Function"},"hints":{"description":"Sets the format of the hints: warnings, errors or nothing at all","enum":[false,"warning","error"]},"maxEntrypointSize":{"description":"Total size of an entry point (in bytes)","type":"number"},"maxAssetSize":{"description":"Filesize limit (in bytes) when exceeded, that webpack will provide performance hints","type":"number"}},"type":"object"}]},"plugins":{"description":"Add additional plugins to the compiler.","type":"array","items":{"description":"Plugin of type object or instanceof Function","anyOf":[{"$ref":"#/definitions/common.pluginObject"},{"$ref":"#/definitions/common.pluginFunction"}]}},"profile":{"description":"Capture timing information for each module.","type":"boolean"},"recordsInputPath":{"description":"Store compiler state to a json file.","type":"string","absolutePath":true},"recordsOutputPath":{"description":"Load compiler state from a json file.","type":"string","absolutePath":true},"recordsPath":{"description":"Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks. An absolute path is expected. `recordsPath` is used for `recordsInputPath` and `recordsOutputPath` if they left undefined.","type":"string","absolutePath":true},"resolve":{"description":"Options for the resolver","anyOf":[{"$ref":"#/definitions/resolve"}]},"resolveLoader":{"description":"Options for the resolver when resolving loaders","anyOf":[{"$ref":"#/definitions/resolve"}]},"serve":{"description":"Options for webpack-dev-server","type":"object"},"stats":{"description":"Used by the webpack CLI program to pass stats options.","anyOf":[{"type":"object","additionalProperties":false,"properties":{"all":{"type":"boolean","description":"fallback value for stats options when an option is not defined (has precedence over local webpack defaults)"},"context":{"type":"string","description":"context directory for request shortening","absolutePath":true},"hash":{"type":"boolean","description":"add the hash of the compilation"},"version":{"type":"boolean","description":"add webpack version information"},"timings":{"type":"boolean","description":"add timing information"},"builtAt":{"type":"boolean","description":"add built at time information"},"performance":{"type":"boolean","description":"add performance hint flags"},"depth":{"type":"boolean","description":"add module depth in module graph"},"assets":{"type":"boolean","description":"add assets information"},"env":{"type":"boolean","description":"add --env information"},"colors":{"description":"Enables/Disables colorful output","oneOf":[{"type":"boolean","description":"`webpack --colors` equivalent"},{"type":"object","additionalProperties":false,"properties":{"bold":{"description":"Custom color for bold text","type":"string"},"red":{"description":"Custom color for red text","type":"string"},"green":{"description":"Custom color for green text","type":"string"},"cyan":{"description":"Custom color for cyan text","type":"string"},"magenta":{"description":"Custom color for magenta text","type":"string"},"yellow":{"description":"Custom color for yellow text","type":"string"}}}]},"maxModules":{"type":"number","description":"Set the maximum number of modules to be shown"},"chunks":{"type":"boolean","description":"add chunk information"},"chunkModules":{"type":"boolean","description":"add built modules information to chunk information"},"modules":{"type":"boolean","description":"add built modules information"},"nestedModules":{"type":"boolean","description":"add information about modules nested in other modules (like with module concatenation)"},"moduleAssets":{"type":"boolean","description":"add information about assets inside modules"},"children":{"type":"boolean","description":"add children information"},"cached":{"type":"boolean","description":"add also information about cached (not built) modules"},"cachedAssets":{"type":"boolean","description":"Show cached assets (setting this to `false` only shows emitted files)"},"reasons":{"type":"boolean","description":"add information about the reasons why modules are included"},"source":{"type":"boolean","description":"add the source code of modules"},"warnings":{"type":"boolean","description":"add warnings"},"errors":{"type":"boolean","description":"add errors"},"warningsFilter":{"description":"Suppress warnings that match the specified filters. Filters can be Strings, RegExps or Functions","anyOf":[{"$ref":"#/definitions/filter-types"}]},"excludeAssets":{"description":"Suppress assets that match the specified filters. Filters can be Strings, RegExps or Functions","anyOf":[{"$ref":"#/definitions/filter-types"}]},"excludeModules":{"description":"Suppress modules that match the specified filters. Filters can be Strings, RegExps, Booleans or Functions","anyOf":[{"$ref":"#/definitions/filter-types"},{"type":"boolean"}]},"exclude":{"description":"Please use excludeModules instead.","anyOf":[{"$ref":"#/definitions/filter-types"},{"type":"boolean"}]},"entrypoints":{"type":"boolean","description":"Display the entry points with the corresponding bundles"},"chunkGroups":{"type":"boolean","description":"Display all chunk groups with the corresponding bundles"},"errorDetails":{"type":"boolean","description":"add details to errors (like resolving log)"},"chunkOrigins":{"type":"boolean","description":"add the origins of chunks and chunk merging info"},"modulesSort":{"type":"string","description":"sort the modules by that field"},"moduleTrace":{"type":"boolean","description":"add dependencies and origin of warnings/errors"},"chunksSort":{"type":"string","description":"sort the chunks by that field"},"assetsSort":{"type":"string","description":"sort the assets by that field"},"publicPath":{"type":"boolean","description":"Add public path information"},"outputPath":{"type":"boolean","description":"Add output path information"},"providedExports":{"type":"boolean","description":"show exports provided by modules"},"usedExports":{"type":"boolean","description":"show exports used by modules"},"optimizationBailout":{"type":"boolean","description":"show reasons why optimization bailed out for modules"}}},{"type":"boolean"},{"enum":["none","errors-only","minimal","normal","detailed","verbose"]}]},"target":{"description":"Environment to build for","anyOf":[{"enum":["web","webworker","node","async-node","node-webkit","electron-main","electron-renderer"]},{"instanceof":"Function"}]},"watch":{"description":"Enter watch mode, which rebuilds on file change.","type":"boolean"},"watchOptions":{"description":"Options for the watcher","additionalProperties":false,"properties":{"aggregateTimeout":{"description":"Delay the rebuilt after the first change. Value is a time in ms.","type":"number"},"ignored":{"description":"Ignore some files from watching"},"stdin":{"description":"Stop watching when stdin stream has ended","type":"boolean"},"poll":{"description":"Enable polling mode for watching","anyOf":[{"description":"`true`: use polling.","type":"boolean"},{"description":"`number`: use polling with specified interval.","type":"number"}]}},"type":"object"}},"type":"object"}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = (flag, argv) => {
    argv = argv || process.argv;
    const prefix = flag.startsWith("-") ? "" : 1 === flag.length ? "-" : "--", pos = argv.indexOf(prefix + flag), terminatorPos = argv.indexOf("--");
    return -1 !== pos && (-1 === terminatorPos || pos < terminatorPos);
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    const path = __webpack_require__(0), fs = __webpack_require__(3);
    fs.existsSync = fs.existsSync || path.existsSync;
    const interpret = __webpack_require__(40), prepareOptions = __webpack_require__(41), findup = __webpack_require__(42), validateOptions = __webpack_require__(52);
    module.exports = function(...args) {
      const argv = args[1] || args[0], options = [];
      if (argv.d && (argv.debug = !0, argv["output-pathinfo"] = !0, argv.devtool || (argv.devtool = "eval-cheap-module-source-map"), 
      argv.mode || (argv.mode = "development")), argv.p && (argv["optimize-minimize"] = !0, 
      argv.define = [].concat(argv.define || []).concat('process.env.NODE_ENV="production"'), 
      argv.mode || (argv.mode = "production")), argv.output) {
        let output = argv.output;
        path.isAbsolute(argv.o) || (output = path.resolve(process.cwd(), output)), argv["output-filename"] = path.basename(output), 
        argv["output-path"] = path.dirname(output);
      }
      let configFileLoaded = !1, configFiles = [];
      const extensions = Object.keys(interpret.extensions).sort((function(a, b) {
        return ".js" === a ? -1 : ".js" === b ? 1 : a.length - b.length;
      }));
      let i;
      if (argv.config) {
        const getConfigExtension = function(configPath) {
          for (i = extensions.length - 1; i >= 0; i--) {
            const tmpExt = extensions[i];
            if (configPath.indexOf(tmpExt, configPath.length - tmpExt.length) > -1) return tmpExt;
          }
          return path.extname(configPath);
        }, mapConfigArg = function(configArg) {
          const resolvedPath = path.resolve(configArg);
          return {
            path: resolvedPath,
            ext: getConfigExtension(resolvedPath)
          };
        };
        configFiles = (Array.isArray(argv.config) ? argv.config : [ argv.config ]).map(mapConfigArg);
      } else {
        const defaultConfigFileNames = [ "webpack.config", "webpackfile" ].join("|"), webpackConfigFileRegExp = `(${defaultConfigFileNames})(${extensions.join("|")})`, pathToWebpackConfig = findup(webpackConfigFileRegExp);
        if (pathToWebpackConfig) {
          const resolvedPath = path.resolve(pathToWebpackConfig), ext = path.basename(resolvedPath).replace(new RegExp(defaultConfigFileNames), "");
          configFiles.push({
            path: resolvedPath,
            ext: ext
          });
        }
      }
      if (configFiles.length > 0) {
        const registerCompiler = function registerCompiler(moduleDescriptor) {
          if (moduleDescriptor) if ("string" == typeof moduleDescriptor) __webpack_require__(2)(moduleDescriptor); else if (Array.isArray(moduleDescriptor)) for (let i = 0; i < moduleDescriptor.length; i++) try {
            registerCompiler(moduleDescriptor[i]);
            break;
          } catch (e) {} else moduleDescriptor.register(__webpack_require__(2)(moduleDescriptor.module));
        }, requireConfig = function(configPath) {
          let options = argv.configRegister && argv.configRegister.length ? (module.paths.unshift(path.resolve(process.cwd(), "node_modules"), process.cwd()), 
          argv.configRegister.forEach(dep => {
            __webpack_require__(2)(dep);
          }), __webpack_require__(2)(path.resolve(process.cwd(), configPath))) : __webpack_require__(2)(path.resolve(process.cwd(), configPath));
          return options = prepareOptions(options, argv), options;
        };
        configFiles.forEach((function(file) {
          registerCompiler(interpret.extensions[file.ext]), options.push(requireConfig(file.path));
        })), configFileLoaded = !0;
      }
      return configFileLoaded ? 1 === options.length ? processConfiguredOptions(options[0]) : processConfiguredOptions(options) : processConfiguredOptions();
      function processConfiguredOptions(options) {
        if (options ? validateOptions(options) : options = {}, "function" == typeof options.then) return options.then(processConfiguredOptions);
        if ("object" == typeof options && "object" == typeof options.default) return processConfiguredOptions(options.default);
        if (Array.isArray(options) && argv["config-name"]) {
          const namedOptions = options.filter((function(opt) {
            return opt.name === argv["config-name"];
          }));
          if (0 === namedOptions.length) console.error("Configuration with name '" + argv["config-name"] + "' was not found."), 
          process.exit(-1); else if (1 === namedOptions.length) return processConfiguredOptions(namedOptions[0]);
          options = namedOptions;
        }
        return Array.isArray(options) ? options.forEach(processOptions) : processOptions(options), 
        argv.context && (options.context = path.resolve(argv.context)), options.context || (options.context = process.cwd()), 
        argv.watch && (options.watch = !0), argv["watch-aggregate-timeout"] && (options.watchOptions = options.watchOptions || {}, 
        options.watchOptions.aggregateTimeout = +argv["watch-aggregate-timeout"]), void 0 !== argv["watch-poll"] && (options.watchOptions = options.watchOptions || {}, 
        "true" === argv["watch-poll"] || "" === argv["watch-poll"] ? options.watchOptions.poll = !0 : isNaN(argv["watch-poll"]) || (options.watchOptions.poll = +argv["watch-poll"])), 
        argv["watch-stdin"] && (options.watchOptions = options.watchOptions || {}, options.watchOptions.stdin = !0, 
        options.watch = !0), options;
      }
      function processOptions(options) {
        function ifArg(name, fn, init, finalize) {
          const isArray = Array.isArray(argv[name]), isSet = void 0 !== argv[name] && null !== argv[name];
          (isArray || isSet) && (init && init(), isArray ? argv[name].forEach(fn) : isSet && fn(argv[name], -1), 
          finalize && finalize());
        }
        function ifArgPair(name, fn, init, finalize) {
          ifArg(name, (function(content, idx) {
            const i = content.indexOf("=");
            return i < 0 ? fn(null, content, idx) : fn(content.substr(0, i), content.substr(i + 1), idx);
          }), init, finalize);
        }
        function ifBooleanArg(name, fn) {
          ifArg(name, (function(bool) {
            bool && fn();
          }));
        }
        function mapArgToBoolean(name, optionName) {
          ifArg(name, (function(bool) {
            !0 === bool ? options[optionName || name] = !0 : !1 === bool && (options[optionName || name] = !1);
          }));
        }
        function ensureObject(parent, name, force) {
          (force || "object" != typeof parent[name] || null === parent[name]) && (parent[name] = {});
        }
        function ensureArray(parent, name) {
          Array.isArray(parent[name]) || (parent[name] = []);
        }
        function addPlugin(options, plugin) {
          ensureArray(options, "plugins"), options.plugins.unshift(plugin);
        }
        function bindRules(arg) {
          ifArgPair(arg, (function(name, binding) {
            null === name && (name = binding, binding += "-loader");
            const rule = {
              test: new RegExp("\\." + name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "$"),
              loader: binding
            };
            "module-bind-pre" === arg ? rule.enforce = "pre" : "module-bind-post" === arg && (rule.enforce = "post"), 
            options.module.rules.push(rule);
          }), (function() {
            ensureObject(options, "module"), ensureArray(options.module, "rules");
          }));
        }
        let defineObject;
        function processResolveAlias(arg, key) {
          ifArgPair(arg, (function(name, value) {
            if (!name) throw new Error("--" + arg + " <string>=<string>");
            ensureObject(options, key), ensureObject(options[key], "alias"), options[key].alias[name] = value;
          }));
        }
        if (ifArg("mode", (function(value) {
          options.mode = value;
        })), ifArgPair("entry", (function(name, entry) {
          void 0 !== options.entry[name] && null !== options.entry[name] ? options.entry[name] = [].concat(options.entry[name]).concat(entry) : options.entry[name] = entry;
        }), (function() {
          ensureObject(options, "entry", !0);
        })), bindRules("module-bind"), bindRules("module-bind-pre"), bindRules("module-bind-post"), 
        ifArgPair("define", (function(name, value) {
          null === name && (name = value, value = !0), defineObject[name] = value;
        }), (function() {
          defineObject = {};
        }), (function() {
          const DefinePlugin = __webpack_require__(1).DefinePlugin;
          addPlugin(options, new DefinePlugin(defineObject));
        })), ifArg("output-path", (function(value) {
          ensureObject(options, "output"), options.output.path = path.resolve(value);
        })), ifArg("output-filename", (function(value) {
          ensureObject(options, "output"), options.output.filename = value;
        })), ifArg("output-chunk-filename", (function(value) {
          ensureObject(options, "output"), options.output.chunkFilename = value;
        })), ifArg("output-source-map-filename", (function(value) {
          ensureObject(options, "output"), options.output.sourceMapFilename = value;
        })), ifArg("output-public-path", (function(value) {
          ensureObject(options, "output"), options.output.publicPath = value;
        })), ifArg("output-jsonp-function", (function(value) {
          ensureObject(options, "output"), options.output.jsonpFunction = value;
        })), ifBooleanArg("output-pathinfo", (function() {
          ensureObject(options, "output"), options.output.pathinfo = !0;
        })), ifArg("output-library", (function(value) {
          ensureObject(options, "output"), ensureArray(options.output, "library"), options.output.library.push(value);
        })), ifArg("output-library-target", (function(value) {
          ensureObject(options, "output"), options.output.libraryTarget = value;
        })), ifArg("records-input-path", (function(value) {
          options.recordsInputPath = path.resolve(value);
        })), ifArg("records-output-path", (function(value) {
          options.recordsOutputPath = path.resolve(value);
        })), ifArg("records-path", (function(value) {
          options.recordsPath = path.resolve(value);
        })), ifArg("target", (function(value) {
          options.target = value;
        })), mapArgToBoolean("cache"), ifBooleanArg("hot", (function() {
          const HotModuleReplacementPlugin = __webpack_require__(1).HotModuleReplacementPlugin;
          addPlugin(options, new HotModuleReplacementPlugin);
        })), ifBooleanArg("no-cache", (function() {
          options.cache = !1;
        })), ifBooleanArg("debug", (function() {
          const LoaderOptionsPlugin = __webpack_require__(1).LoaderOptionsPlugin;
          addPlugin(options, new LoaderOptionsPlugin({
            debug: !0
          }));
        })), ifArg("devtool", (function(value) {
          options.devtool = value;
        })), processResolveAlias("resolve-alias", "resolve"), processResolveAlias("resolve-loader-alias", "resolveLoader"), 
        ifArg("resolve-extensions", (function(value) {
          ensureObject(options, "resolve"), Array.isArray(value) ? options.resolve.extensions = value : options.resolve.extensions = value.split(/,\s*/);
        })), ifArg("optimize-max-chunks", (function(value) {
          const LimitChunkCountPlugin = __webpack_require__(1).optimize.LimitChunkCountPlugin;
          addPlugin(options, new LimitChunkCountPlugin({
            maxChunks: parseInt(value, 10)
          }));
        })), ifArg("optimize-min-chunk-size", (function(value) {
          const MinChunkSizePlugin = __webpack_require__(1).optimize.MinChunkSizePlugin;
          addPlugin(options, new MinChunkSizePlugin({
            minChunkSize: parseInt(value, 10)
          }));
        })), ifBooleanArg("optimize-minimize", (function() {
          const LoaderOptionsPlugin = __webpack_require__(1).LoaderOptionsPlugin;
          addPlugin(options, new LoaderOptionsPlugin({
            minimize: !0
          }));
        })), ifArg("prefetch", (function(request) {
          const PrefetchPlugin = __webpack_require__(1).PrefetchPlugin;
          addPlugin(options, new PrefetchPlugin(request));
        })), ifArg("provide", (function(value) {
          const idx = value.indexOf("=");
          let name;
          idx >= 0 ? (name = value.substr(0, idx), value = value.substr(idx + 1)) : name = value;
          const ProvidePlugin = __webpack_require__(1).ProvidePlugin;
          addPlugin(options, new ProvidePlugin(name, value));
        })), ifArg("plugin", (function(value) {
          addPlugin(options, function(name) {
            const loadUtils = __webpack_require__(54);
            let args, path, Plugin;
            try {
              const p = name && name.indexOf("?");
              p > -1 && (args = loadUtils.parseQuery(name.substring(p)), name = name.substring(0, p));
            } catch (e) {
              console.log("Invalid plugin arguments " + name + " (" + e + ")."), process.exit(-1);
            }
            try {
              path = __webpack_require__(70).sync(process.cwd(), name);
            } catch (e) {
              console.log("Cannot resolve plugin " + name + "."), process.exit(-1);
            }
            try {
              Plugin = __webpack_require__(2)(path);
            } catch (e) {
              throw console.log("Cannot load plugin " + name + ". (" + path + ")"), e;
            }
            try {
              return new Plugin(args);
            } catch (e) {
              throw console.log("Cannot instantiate plugin " + name + ". (" + path + ")"), e;
            }
          }(value));
        })), mapArgToBoolean("bail"), mapArgToBoolean("profile"), argv._.length > 0) {
          ensureObject(options, "entry", !0);
          const addTo = function(name, entry) {
            options.entry[name] ? (Array.isArray(options.entry[name]) || (options.entry[name] = [ options.entry[name] ]), 
            options.entry[name].push(entry)) : options.entry[name] = entry;
          };
          argv._.forEach((function(content) {
            const i = content.indexOf("="), j = content.indexOf("?");
            if (i < 0 || j >= 0 && j < i) {
              const resolved = path.resolve(content);
              fs.existsSync(resolved) ? addTo("main", `${resolved}${fs.statSync(resolved).isDirectory() ? path.sep : ""}`) : addTo("main", content);
            } else addTo(content.substr(0, i), content.substr(i + 1));
          }));
        }
      }
    };
  }).call(this, __webpack_require__(5)(module));
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var extensions = {
      ".babel.js": [ {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      }, {
        module: "babel-register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      }, {
        module: "babel-core/register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      }, {
        module: "babel/register",
        register: function(hook) {
          hook({
            extensions: ".js"
          });
        }
      } ],
      ".babel.ts": [ {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".ts"
          });
        }
      } ],
      ".buble.js": "buble/register",
      ".cirru": "cirru-script/lib/register",
      ".cjsx": "node-cjsx/register",
      ".co": "coco",
      ".coffee": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
      ".coffee.md": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
      ".csv": "require-csv",
      ".eg": "earlgrey/register",
      ".esm.js": {
        module: "esm",
        register: function(hook) {
          var esmLoader = hook(module);
          __webpack_require__(2).extensions[".js"] = esmLoader("module")._extensions[".js"];
        }
      },
      ".iced": [ "iced-coffee-script/register", "iced-coffee-script" ],
      ".iced.md": "iced-coffee-script/register",
      ".ini": "require-ini",
      ".js": null,
      ".json": null,
      ".json5": "json5/lib/require",
      ".jsx": [ {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "babel-register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "babel-core/register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "babel/register",
        register: function(hook) {
          hook({
            extensions: ".jsx"
          });
        }
      }, {
        module: "node-jsx",
        register: function(hook) {
          hook.install({
            extension: ".jsx",
            harmony: !0
          });
        }
      } ],
      ".litcoffee": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
      ".liticed": "iced-coffee-script/register",
      ".ls": [ "livescript", "LiveScript" ],
      ".mjs": {
        module: "mjs-stub",
        register: function(hook) {
          __webpack_require__(2).extensions[".mjs"] = null;
        }
      },
      ".node": null,
      ".toml": {
        module: "toml-require",
        register: function(hook) {
          hook.install();
        }
      },
      ".ts": [ "ts-node/register", "typescript-node/register", "typescript-register", "typescript-require", "sucrase/register/ts", {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".ts"
          });
        }
      } ],
      ".tsx": [ "ts-node/register", "typescript-node/register", "sucrase/register", {
        module: "@babel/register",
        register: function(hook) {
          hook({
            extensions: ".tsx"
          });
        }
      } ],
      ".wisp": "wisp/engine/node",
      ".xml": "require-xml",
      ".yaml": "require-yaml",
      ".yml": "require-yaml"
    };
    module.exports = {
      extensions: extensions,
      jsVariants: [ ".js", ".babel.js", ".babel.ts", ".buble.js", ".cirru", ".cjsx", ".co", ".coffee", ".coffee.md", ".eg", ".esm.js", ".iced", ".iced.md", ".jsx", ".litcoffee", ".liticed", ".ls", ".mjs", ".ts", ".tsx", ".wisp" ].reduce((function(result, ext) {
        return result[ext] = extensions[ext], result;
      }), {})
    };
  }).call(this, __webpack_require__(5)(module));
}, function(module, exports, __webpack_require__) {
  "use strict";
  function handleFunction(options, argv) {
    return "function" == typeof options && (options = options(argv.env, argv)), options;
  }
  module.exports = function(options, argv) {
    return argv = argv || {}, options = function(options) {
      return "object" == typeof options && null !== options && void 0 !== options.default ? options.default : options;
    }(options), Array.isArray(options) ? options.map(_options => handleFunction(_options, argv)) : handleFunction(options, argv);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var fs = __webpack_require__(3), path = __webpack_require__(0), isGlob = __webpack_require__(43), resolveDir = __webpack_require__(45), detect = __webpack_require__(50), mm = __webpack_require__(51);
  function lookup(cwd, patterns, options) {
    for (var res, len = patterns.length, idx = -1; ++idx < len; ) if (res = isGlob(patterns[idx]) ? matchFile(cwd, patterns[idx], options) : findFile(cwd, patterns[idx], options)) return res;
    var dir = path.dirname(cwd);
    return dir === cwd ? null : lookup(dir, patterns, options);
  }
  function matchFile(cwd, pattern, opts) {
    for (var isMatch = mm.matcher(pattern, opts), files = function(fp) {
      try {
        return fs.readdirSync(fp);
      } catch (err) {}
      return [];
    }(cwd), len = files.length, idx = -1; ++idx < len; ) {
      var name = files[idx], fp = path.join(cwd, name);
      if (isMatch(name) || isMatch(fp)) return fp;
    }
    return null;
  }
  function findFile(cwd, filename, options) {
    var fp = cwd ? path.resolve(cwd, filename) : filename;
    return detect(fp, options);
  }
  module.exports = function(patterns, options) {
    options = options || {};
    var cwd = path.resolve(resolveDir(options.cwd || ""));
    if ("string" == typeof patterns) return lookup(cwd, [ patterns ], options);
    if (!Array.isArray(patterns)) throw new TypeError("findup-sync expects a string or array as the first argument.");
    return lookup(cwd, patterns, options);
  };
}, function(module, exports, __webpack_require__) {
  var isExtglob = __webpack_require__(44), chars = {
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
}, function(module, exports) {
  module.exports = function(str) {
    if ("string" != typeof str || "" === str) return !1;
    for (var match; match = /(\\).|([@?!+*]\(.*\))/g.exec(str); ) {
      if (match[2]) return !0;
      str = str.slice(match.index + match[0].length);
    }
    return !1;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(0), expand = __webpack_require__(46), gm = __webpack_require__(14);
  module.exports = function(dir) {
    return "~" === dir.charAt(0) && (dir = expand(dir)), "@" === dir.charAt(0) && (dir = path.join(gm, dir.slice(1))), 
    dir;
  };
}, function(module, exports, __webpack_require__) {
  var homedir = __webpack_require__(47), path = __webpack_require__(0);
  module.exports = function(filepath) {
    var home = homedir();
    return 126 === filepath.charCodeAt(0) ? 43 === filepath.charCodeAt(1) ? path.join(process.cwd(), filepath.slice(2)) : home ? path.join(home, filepath.slice(1)) : filepath : filepath;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var os = __webpack_require__(10);
  void 0 !== os.homedir ? module.exports = os.homedir : module.exports = __webpack_require__(48);
}, function(module, exports, __webpack_require__) {
  "use strict";
  var fs = __webpack_require__(3), parse = __webpack_require__(49);
  module.exports = function() {
    if ("win32" === process.platform) return process.env.USERPROFILE ? process.env.USERPROFILE : process.env.HOMEDRIVE && process.env.HOMEPATH ? process.env.HOMEDRIVE + process.env.HOMEPATH : process.env.HOME ? process.env.HOME : null;
    if (process.env.HOME) return process.env.HOME;
    var passwd = function(fp) {
      try {
        return fs.readFileSync(fp, "utf8");
      } catch (err) {
        return "";
      }
    }("/etc/passwd"), home = function(arr, uid) {
      for (var len = arr.length, i = 0; i < len; i++) if (+arr[i].uid === uid) return arr[i].homedir;
    }(parse(passwd), function() {
      if ("function" == typeof process.geteuid) return process.geteuid();
      return process.getuid();
    }());
    if (home) return home;
    var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
    return user ? "darwin" === process.platform ? "/Users/" + user : "/home/" + user : null;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function user(line, i) {
    if (!line || !line.length || "#" === line.charAt(0)) return null;
    var fields = line.split(":");
    return {
      username: fields[0],
      password: fields[1],
      uid: fields[2],
      gid: fields[3],
      gecos: fields[4],
      homedir: fields[5],
      shell: fields[6]
    };
  }
  module.exports = function(content) {
    if ("string" != typeof content) throw new Error("expected a string");
    return content.split("\n").map(user).filter(Boolean);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var fs = __webpack_require__(3), path = __webpack_require__(0);
  module.exports = function(filepath, options) {
    return filepath && "string" == typeof filepath ? fs.existsSync(filepath) ? path.resolve(filepath) : !0 === (options = options || {}).nocase ? function(filepath) {
      var res = function(filepath) {
        var ctx = {
          path: filepath,
          files: []
        };
        try {
          return ctx.files = fs.readdirSync(filepath), ctx;
        } catch (err) {}
        try {
          return ctx.path = path.dirname(filepath), ctx.files = fs.readdirSync(ctx.path), 
          ctx;
        } catch (err) {}
        return null;
      }(filepath = path.resolve(filepath));
      if (null === res) return null;
      if (res.path === filepath) return res.path;
      var upper = filepath.toUpperCase(), len = res.files.length, idx = -1;
      for (;++idx < len; ) {
        var fp = path.resolve(res.path, res.files[idx]);
        if (filepath === fp || upper === fp) return fp;
        var fpUpper = fp.toUpperCase();
        if (filepath === fpUpper || upper === fpUpper) return fp;
      }
      return null;
    }(filepath) : null : null;
  };
}, function(module, exports) {
  module.exports = require("../vendor/micromatch");
}, function(module, exports, __webpack_require__) {
  const webpackConfigurationSchema = __webpack_require__(53), validateSchema = __webpack_require__(1).validateSchema;
  module.exports = function(options) {
    let error;
    try {
      const errors = validateSchema(webpackConfigurationSchema, options);
      if (errors && errors.length > 0) {
        const {WebpackOptionsValidationError: WebpackOptionsValidationError} = __webpack_require__(1);
        error = new WebpackOptionsValidationError(errors);
      }
    } catch (err) {
      error = err;
    }
    error && (console.error(error.message), process.exit(-1));
  };
}, function(module) {
  module.exports = JSON.parse('{"anyOf":[{"type":"object","description":"A webpack configuration object."},{"type":"array","description":"An array of webpack configuration objects.","items":{"description":"A webpack configuration object.","type":"object"}},{"instanceof":"Promise","description":"A promise that resolves with a configuration object, or an array of configuration objects."}]}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  const getOptions = __webpack_require__(55), parseQuery = __webpack_require__(16), stringifyRequest = __webpack_require__(60), getRemainingRequest = __webpack_require__(61), getCurrentRequest = __webpack_require__(62), isUrlRequest = __webpack_require__(63), urlToRequest = __webpack_require__(64), parseString = __webpack_require__(65), getHashDigest = __webpack_require__(18), interpolateName = __webpack_require__(68);
  exports.getOptions = getOptions, exports.parseQuery = parseQuery, exports.stringifyRequest = stringifyRequest, 
  exports.getRemainingRequest = getRemainingRequest, exports.getCurrentRequest = getCurrentRequest, 
  exports.isUrlRequest = isUrlRequest, exports.urlToRequest = urlToRequest, exports.parseString = parseString, 
  exports.getHashDigest = getHashDigest, exports.interpolateName = interpolateName;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const parseQuery = __webpack_require__(16);
  module.exports = function(loaderContext) {
    const query = loaderContext.query;
    return "string" == typeof query && "" !== query ? parseQuery(loaderContext.query) : query && "object" == typeof query ? query : null;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var _parse2 = _interopRequireDefault(__webpack_require__(57)), _stringify2 = _interopRequireDefault(__webpack_require__(59));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  exports.default = {
    parse: _parse2.default,
    stringify: _stringify2.default
  }, module.exports = exports.default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  exports.default = function(text, reviver) {
    source = String(text), parseState = "start", stack = [], pos = 0, line = 1, column = 0, 
    token = void 0, key = void 0, root = void 0;
    do {
      token = lex(), parseStates[parseState]();
    } while ("eof" !== token.type);
    if ("function" == typeof reviver) return function internalize(holder, name, reviver) {
      var value = holder[name];
      if (null != value && "object" === (void 0 === value ? "undefined" : _typeof(value))) for (var _key in value) {
        var replacement = internalize(value, _key, reviver);
        void 0 === replacement ? delete value[_key] : value[_key] = replacement;
      }
      return reviver.call(holder, name, value);
    }({
      "": root
    }, "", reviver);
    return root;
  };
  var util = function(obj) {
    if (obj && obj.__esModule) return obj;
    var newObj = {};
    if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
    return newObj.default = obj, newObj;
  }(__webpack_require__(17));
  var source = void 0, parseState = void 0, stack = void 0, pos = void 0, line = void 0, column = void 0, token = void 0, key = void 0, root = void 0;
  var lexState = void 0, buffer = void 0, doubleQuote = void 0, _sign = void 0, c = void 0;
  function lex() {
    for (lexState = "default", buffer = "", doubleQuote = !1, _sign = 1; ;) {
      c = peek();
      var _token = lexStates[lexState]();
      if (_token) return _token;
    }
  }
  function peek() {
    if (source[pos]) return String.fromCodePoint(source.codePointAt(pos));
  }
  function read() {
    var c = peek();
    return "\n" === c ? (line++, column = 0) : c ? column += c.length : column++, c && (pos += c.length), 
    c;
  }
  var lexStates = {
    default: function() {
      switch (c) {
       case "\t":
       case "\v":
       case "\f":
       case " ":
       case " ":
       case "\ufeff":
       case "\n":
       case "\r":
       case "\u2028":
       case "\u2029":
        return void read();

       case "/":
        return read(), void (lexState = "comment");

       case void 0:
        return read(), newToken("eof");
      }
      if (!util.isSpaceSeparator(c)) return lexStates[parseState]();
      read();
    },
    comment: function() {
      switch (c) {
       case "*":
        return read(), void (lexState = "multiLineComment");

       case "/":
        return read(), void (lexState = "singleLineComment");
      }
      throw invalidChar(read());
    },
    multiLineComment: function() {
      switch (c) {
       case "*":
        return read(), void (lexState = "multiLineCommentAsterisk");

       case void 0:
        throw invalidChar(read());
      }
      read();
    },
    multiLineCommentAsterisk: function() {
      switch (c) {
       case "*":
        return void read();

       case "/":
        return read(), void (lexState = "default");

       case void 0:
        throw invalidChar(read());
      }
      read(), lexState = "multiLineComment";
    },
    singleLineComment: function() {
      switch (c) {
       case "\n":
       case "\r":
       case "\u2028":
       case "\u2029":
        return read(), void (lexState = "default");

       case void 0:
        return read(), newToken("eof");
      }
      read();
    },
    value: function() {
      switch (c) {
       case "{":
       case "[":
        return newToken("punctuator", read());

       case "n":
        return read(), literal("ull"), newToken("null", null);

       case "t":
        return read(), literal("rue"), newToken("boolean", !0);

       case "f":
        return read(), literal("alse"), newToken("boolean", !1);

       case "-":
       case "+":
        return "-" === read() && (_sign = -1), void (lexState = "sign");

       case ".":
        return buffer = read(), void (lexState = "decimalPointLeading");

       case "0":
        return buffer = read(), void (lexState = "zero");

       case "1":
       case "2":
       case "3":
       case "4":
       case "5":
       case "6":
       case "7":
       case "8":
       case "9":
        return buffer = read(), void (lexState = "decimalInteger");

       case "I":
        return read(), literal("nfinity"), newToken("numeric", 1 / 0);

       case "N":
        return read(), literal("aN"), newToken("numeric", NaN);

       case '"':
       case "'":
        return doubleQuote = '"' === read(), buffer = "", void (lexState = "string");
      }
      throw invalidChar(read());
    },
    identifierNameStartEscape: function() {
      if ("u" !== c) throw invalidChar(read());
      read();
      var u = unicodeEscape();
      switch (u) {
       case "$":
       case "_":
        break;

       default:
        if (!util.isIdStartChar(u)) throw invalidIdentifier();
      }
      buffer += u, lexState = "identifierName";
    },
    identifierName: function() {
      switch (c) {
       case "$":
       case "_":
       case "‌":
       case "‍":
        return void (buffer += read());

       case "\\":
        return read(), void (lexState = "identifierNameEscape");
      }
      if (!util.isIdContinueChar(c)) return newToken("identifier", buffer);
      buffer += read();
    },
    identifierNameEscape: function() {
      if ("u" !== c) throw invalidChar(read());
      read();
      var u = unicodeEscape();
      switch (u) {
       case "$":
       case "_":
       case "‌":
       case "‍":
        break;

       default:
        if (!util.isIdContinueChar(u)) throw invalidIdentifier();
      }
      buffer += u, lexState = "identifierName";
    },
    sign: function() {
      switch (c) {
       case ".":
        return buffer = read(), void (lexState = "decimalPointLeading");

       case "0":
        return buffer = read(), void (lexState = "zero");

       case "1":
       case "2":
       case "3":
       case "4":
       case "5":
       case "6":
       case "7":
       case "8":
       case "9":
        return buffer = read(), void (lexState = "decimalInteger");

       case "I":
        return read(), literal("nfinity"), newToken("numeric", _sign * (1 / 0));

       case "N":
        return read(), literal("aN"), newToken("numeric", NaN);
      }
      throw invalidChar(read());
    },
    zero: function() {
      switch (c) {
       case ".":
        return buffer += read(), void (lexState = "decimalPoint");

       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");

       case "x":
       case "X":
        return buffer += read(), void (lexState = "hexadecimal");
      }
      return newToken("numeric", 0 * _sign);
    },
    decimalInteger: function() {
      switch (c) {
       case ".":
        return buffer += read(), void (lexState = "decimalPoint");

       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");
      }
      if (!util.isDigit(c)) return newToken("numeric", _sign * Number(buffer));
      buffer += read();
    },
    decimalPointLeading: function() {
      if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalFraction");
      throw invalidChar(read());
    },
    decimalPoint: function() {
      switch (c) {
       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");
      }
      return util.isDigit(c) ? (buffer += read(), void (lexState = "decimalFraction")) : newToken("numeric", _sign * Number(buffer));
    },
    decimalFraction: function() {
      switch (c) {
       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");
      }
      if (!util.isDigit(c)) return newToken("numeric", _sign * Number(buffer));
      buffer += read();
    },
    decimalExponent: function() {
      switch (c) {
       case "+":
       case "-":
        return buffer += read(), void (lexState = "decimalExponentSign");
      }
      if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
      throw invalidChar(read());
    },
    decimalExponentSign: function() {
      if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
      throw invalidChar(read());
    },
    decimalExponentInteger: function() {
      if (!util.isDigit(c)) return newToken("numeric", _sign * Number(buffer));
      buffer += read();
    },
    hexadecimal: function() {
      if (util.isHexDigit(c)) return buffer += read(), void (lexState = "hexadecimalInteger");
      throw invalidChar(read());
    },
    hexadecimalInteger: function() {
      if (!util.isHexDigit(c)) return newToken("numeric", _sign * Number(buffer));
      buffer += read();
    },
    string: function() {
      switch (c) {
       case "\\":
        return read(), void (buffer += function() {
          switch (peek()) {
           case "b":
            return read(), "\b";

           case "f":
            return read(), "\f";

           case "n":
            return read(), "\n";

           case "r":
            return read(), "\r";

           case "t":
            return read(), "\t";

           case "v":
            return read(), "\v";

           case "0":
            if (read(), util.isDigit(peek())) throw invalidChar(read());
            return "\0";

           case "x":
            return read(), function() {
              var buffer = "", c = peek();
              if (!util.isHexDigit(c)) throw invalidChar(read());
              if (buffer += read(), c = peek(), !util.isHexDigit(c)) throw invalidChar(read());
              return buffer += read(), String.fromCodePoint(parseInt(buffer, 16));
            }();

           case "u":
            return read(), unicodeEscape();

           case "\n":
           case "\u2028":
           case "\u2029":
            return read(), "";

           case "\r":
            return read(), "\n" === peek() && read(), "";

           case "1":
           case "2":
           case "3":
           case "4":
           case "5":
           case "6":
           case "7":
           case "8":
           case "9":
           case void 0:
            throw invalidChar(read());
          }
          return read();
        }());

       case '"':
        return doubleQuote ? (read(), newToken("string", buffer)) : void (buffer += read());

       case "'":
        return doubleQuote ? void (buffer += read()) : (read(), newToken("string", buffer));

       case "\n":
       case "\r":
        throw invalidChar(read());

       case "\u2028":
       case "\u2029":
        !function(c) {
          console.warn("JSON5: '" + c + "' is not valid ECMAScript; consider escaping");
        }(c);
        break;

       case void 0:
        throw invalidChar(read());
      }
      buffer += read();
    },
    start: function() {
      switch (c) {
       case "{":
       case "[":
        return newToken("punctuator", read());
      }
      lexState = "value";
    },
    beforePropertyName: function() {
      switch (c) {
       case "$":
       case "_":
        return buffer = read(), void (lexState = "identifierName");

       case "\\":
        return read(), void (lexState = "identifierNameStartEscape");

       case "}":
        return newToken("punctuator", read());

       case '"':
       case "'":
        return doubleQuote = '"' === read(), void (lexState = "string");
      }
      if (util.isIdStartChar(c)) return buffer += read(), void (lexState = "identifierName");
      throw invalidChar(read());
    },
    afterPropertyName: function() {
      if (":" === c) return newToken("punctuator", read());
      throw invalidChar(read());
    },
    beforePropertyValue: function() {
      lexState = "value";
    },
    afterPropertyValue: function() {
      switch (c) {
       case ",":
       case "}":
        return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    beforeArrayValue: function() {
      if ("]" === c) return newToken("punctuator", read());
      lexState = "value";
    },
    afterArrayValue: function() {
      switch (c) {
       case ",":
       case "]":
        return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    end: function() {
      throw invalidChar(read());
    }
  };
  function newToken(type, value) {
    return {
      type: type,
      value: value,
      line: line,
      column: column
    };
  }
  function literal(s) {
    var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
    try {
      for (var _step, _iterator = s[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var _c = _step.value;
        if (peek() !== _c) throw invalidChar(read());
        read();
      }
    } catch (err) {
      _didIteratorError = !0, _iteratorError = err;
    } finally {
      try {
        !_iteratorNormalCompletion && _iterator.return && _iterator.return();
      } finally {
        if (_didIteratorError) throw _iteratorError;
      }
    }
  }
  function unicodeEscape() {
    for (var buffer = "", count = 4; count-- > 0; ) {
      var _c2 = peek();
      if (!util.isHexDigit(_c2)) throw invalidChar(read());
      buffer += read();
    }
    return String.fromCodePoint(parseInt(buffer, 16));
  }
  var parseStates = {
    start: function() {
      if ("eof" === token.type) throw invalidEOF();
      push();
    },
    beforePropertyName: function() {
      switch (token.type) {
       case "identifier":
       case "string":
        return key = token.value, void (parseState = "afterPropertyName");

       case "punctuator":
        return void pop();

       case "eof":
        throw invalidEOF();
      }
    },
    afterPropertyName: function() {
      if ("eof" === token.type) throw invalidEOF();
      parseState = "beforePropertyValue";
    },
    beforePropertyValue: function() {
      if ("eof" === token.type) throw invalidEOF();
      push();
    },
    beforeArrayValue: function() {
      if ("eof" === token.type) throw invalidEOF();
      "punctuator" !== token.type || "]" !== token.value ? push() : pop();
    },
    afterPropertyValue: function() {
      if ("eof" === token.type) throw invalidEOF();
      switch (token.value) {
       case ",":
        return void (parseState = "beforePropertyName");

       case "}":
        pop();
      }
    },
    afterArrayValue: function() {
      if ("eof" === token.type) throw invalidEOF();
      switch (token.value) {
       case ",":
        return void (parseState = "beforeArrayValue");

       case "]":
        pop();
      }
    },
    end: function() {}
  };
  function push() {
    var value = void 0;
    switch (token.type) {
     case "punctuator":
      switch (token.value) {
       case "{":
        value = {};
        break;

       case "[":
        value = [];
      }
      break;

     case "null":
     case "boolean":
     case "numeric":
     case "string":
      value = token.value;
    }
    if (void 0 === root) root = value; else {
      var parent = stack[stack.length - 1];
      Array.isArray(parent) ? parent.push(value) : parent[key] = value;
    }
    if (null !== value && "object" === (void 0 === value ? "undefined" : _typeof(value))) stack.push(value), 
    parseState = Array.isArray(value) ? "beforeArrayValue" : "beforePropertyName"; else {
      var current = stack[stack.length - 1];
      parseState = null == current ? "end" : Array.isArray(current) ? "afterArrayValue" : "afterPropertyValue";
    }
  }
  function pop() {
    stack.pop();
    var current = stack[stack.length - 1];
    parseState = null == current ? "end" : Array.isArray(current) ? "afterArrayValue" : "afterPropertyValue";
  }
  function invalidChar(c) {
    return syntaxError(void 0 === c ? "JSON5: invalid end of input at " + line + ":" + column : "JSON5: invalid character '" + function(c) {
      var replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      if (replacements[c]) return replacements[c];
      if (c < " ") {
        var hexString = c.charCodeAt(0).toString(16);
        return "\\x" + ("00" + hexString).substring(hexString.length);
      }
      return c;
    }(c) + "' at " + line + ":" + column);
  }
  function invalidEOF() {
    return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
  }
  function invalidIdentifier() {
    return syntaxError("JSON5: invalid identifier character at " + line + ":" + (column -= 5));
  }
  function syntaxError(message) {
    var err = new SyntaxError(message);
    return err.lineNumber = line, err.columnNumber = column, err;
  }
  module.exports = exports.default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/, 
  exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  exports.default = function(value, replacer, space) {
    var stack = [], indent = "", propertyList = void 0, replacerFunc = void 0, gap = "", quote = void 0;
    null == replacer || "object" !== (void 0 === replacer ? "undefined" : _typeof(replacer)) || Array.isArray(replacer) || (space = replacer.space, 
    quote = replacer.quote, replacer = replacer.replacer);
    if ("function" == typeof replacer) replacerFunc = replacer; else if (Array.isArray(replacer)) {
      propertyList = [];
      var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
      try {
        for (var _step, _iterator = replacer[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var v = _step.value, item = void 0;
          "string" == typeof v ? item = v : ("number" == typeof v || v instanceof String || v instanceof Number) && (item = String(v)), 
          void 0 !== item && propertyList.indexOf(item) < 0 && propertyList.push(item);
        }
      } catch (err) {
        _didIteratorError = !0, _iteratorError = err;
      } finally {
        try {
          !_iteratorNormalCompletion && _iterator.return && _iterator.return();
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
    }
    space instanceof Number ? space = Number(space) : space instanceof String && (space = String(space));
    "number" == typeof space ? space > 0 && (space = Math.min(10, Math.floor(space)), 
    gap = "          ".substr(0, space)) : "string" == typeof space && (gap = space.substr(0, 10));
    return serializeProperty("", {
      "": value
    });
    function serializeProperty(key, holder) {
      var value = holder[key];
      switch (null != value && ("function" == typeof value.toJSON5 ? value = value.toJSON5(key) : "function" == typeof value.toJSON && (value = value.toJSON(key))), 
      replacerFunc && (value = replacerFunc.call(holder, key, value)), value instanceof Number ? value = Number(value) : value instanceof String ? value = String(value) : value instanceof Boolean && (value = value.valueOf()), 
      value) {
       case null:
        return "null";

       case !0:
        return "true";

       case !1:
        return "false";
      }
      return "string" == typeof value ? quoteString(value) : "number" == typeof value ? String(value) : "object" === (void 0 === value ? "undefined" : _typeof(value)) ? Array.isArray(value) ? function(value) {
        if (stack.indexOf(value) >= 0) throw TypeError("Converting circular structure to JSON5");
        stack.push(value);
        var stepback = indent;
        indent += gap;
        for (var partial = [], i = 0; i < value.length; i++) {
          var propertyString = serializeProperty(String(i), value);
          partial.push(void 0 !== propertyString ? propertyString : "null");
        }
        var final = void 0;
        if (0 === partial.length) final = "[]"; else if ("" === gap) {
          var properties = partial.join(",");
          final = "[" + properties + "]";
        } else {
          var separator = ",\n" + indent, _properties = partial.join(separator);
          final = "[\n" + indent + _properties + ",\n" + stepback + "]";
        }
        return stack.pop(), indent = stepback, final;
      }(value) : function(value) {
        if (stack.indexOf(value) >= 0) throw TypeError("Converting circular structure to JSON5");
        stack.push(value);
        var stepback = indent;
        indent += gap;
        var keys = propertyList || Object.keys(value), partial = [], _iteratorNormalCompletion3 = !0, _didIteratorError3 = !1, _iteratorError3 = void 0;
        try {
          for (var _step3, _iterator3 = keys[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = !0) {
            var key = _step3.value, propertyString = serializeProperty(key, value);
            if (void 0 !== propertyString) {
              var member = serializeKey(key) + ":";
              "" !== gap && (member += " "), member += propertyString, partial.push(member);
            }
          }
        } catch (err) {
          _didIteratorError3 = !0, _iteratorError3 = err;
        } finally {
          try {
            !_iteratorNormalCompletion3 && _iterator3.return && _iterator3.return();
          } finally {
            if (_didIteratorError3) throw _iteratorError3;
          }
        }
        var final = void 0;
        if (0 === partial.length) final = "{}"; else {
          var properties = void 0;
          if ("" === gap) properties = partial.join(","), final = "{" + properties + "}"; else {
            var separator = ",\n" + indent;
            properties = partial.join(separator), final = "{\n" + indent + properties + ",\n" + stepback + "}";
          }
        }
        return stack.pop(), indent = stepback, final;
      }(value) : void 0;
    }
    function quoteString(value) {
      var quotes = {
        "'": .1,
        '"': .2
      }, replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      }, product = "", _iteratorNormalCompletion2 = !0, _didIteratorError2 = !1, _iteratorError2 = void 0;
      try {
        for (var _step2, _iterator2 = value[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
          var c = _step2.value;
          switch (c) {
           case "'":
           case '"':
            quotes[c]++, product += c;
            continue;
          }
          if (replacements[c]) product += replacements[c]; else if (c < " ") {
            var hexString = c.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
          } else product += c;
        }
      } catch (err) {
        _didIteratorError2 = !0, _iteratorError2 = err;
      } finally {
        try {
          !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
        } finally {
          if (_didIteratorError2) throw _iteratorError2;
        }
      }
      var quoteChar = quote || Object.keys(quotes).reduce((function(a, b) {
        return quotes[a] < quotes[b] ? a : b;
      }));
      return quoteChar + (product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar])) + quoteChar;
    }
    function serializeKey(key) {
      if (0 === key.length) return quoteString(key);
      var firstChar = String.fromCodePoint(key.codePointAt(0));
      if (!util.isIdStartChar(firstChar)) return quoteString(key);
      for (var i = firstChar.length; i < key.length; i++) if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) return quoteString(key);
      return key;
    }
  };
  var util = function(obj) {
    if (obj && obj.__esModule) return obj;
    var newObj = {};
    if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
    return newObj.default = obj, newObj;
  }(__webpack_require__(17));
  module.exports = exports.default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), matchRelativePath = /^\.\.?[/\\]/;
  function isAbsolutePath(str) {
    return path.posix.isAbsolute(str) || path.win32.isAbsolute(str);
  }
  module.exports = function(loaderContext, request) {
    const splitted = request.split("!"), context = loaderContext.context || loaderContext.options && loaderContext.options.context;
    return JSON.stringify(splitted.map(part => {
      const splittedPart = part.match(/^(.*?)(\?.*)/), query = splittedPart ? splittedPart[2] : "";
      let singlePath = splittedPart ? splittedPart[1] : part;
      if (isAbsolutePath(singlePath) && context) {
        if (singlePath = path.relative(context, singlePath), isAbsolutePath(singlePath)) return singlePath + query;
        !1 === (str = singlePath, matchRelativePath.test(str)) && (singlePath = "./" + singlePath);
      }
      var str;
      return singlePath.replace(/\\/g, "/") + query;
    }).join("!"));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(loaderContext) {
    return loaderContext.remainingRequest ? loaderContext.remainingRequest : loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(obj => obj.request).concat([ loaderContext.resource ]).join("!");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(loaderContext) {
    return loaderContext.currentRequest ? loaderContext.currentRequest : loaderContext.loaders.slice(loaderContext.loaderIndex).map(obj => obj.request).concat([ loaderContext.resource ]).join("!");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0);
  module.exports = function(url, root) {
    return !(/^[a-z][a-z0-9+.-]*:/i.test(url) && !path.win32.isAbsolute(url)) && (!/^\/\//.test(url) && (!/^[{}[\]#*;,'§$%&(=?`´^°<>]/.test(url) && (void 0 !== root && !1 !== root || !/^\//.test(url))));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const matchNativeWin32Path = /^[A-Z]:[/\\]|^\\\\/i;
  module.exports = function(url, root) {
    if ("" === url) return "";
    const moduleRequestRegex = /^[^?]*~/;
    let request;
    if (matchNativeWin32Path.test(url)) request = url; else if (void 0 !== root && !1 !== root && /^\//.test(url)) switch (typeof root) {
     case "string":
      request = moduleRequestRegex.test(root) ? root.replace(/([^~/])$/, "$1/") + url.slice(1) : root + url;
      break;

     case "boolean":
      request = url;
      break;

     default:
      throw new Error("Unexpected parameters to loader-utils 'urlToRequest': url = " + url + ", root = " + root + ".");
    } else request = /^\.\.?\//.test(url) ? url : "./" + url;
    return moduleRequestRegex.test(request) && (request = request.replace(moduleRequestRegex, "")), 
    request;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function parseString(str) {
    try {
      return '"' === str[0] ? JSON.parse(str) : "'" === str[0] && "'" === str.substr(str.length - 1) ? parseString(str.replace(/\\.|"/g, x => '"' === x ? '\\"' : x).replace(/^'|'$/g, '"')) : JSON.parse('"' + str + '"');
    } catch (e) {
      return str;
    }
  };
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "Big", (function() {
    return Big;
  }));
  var NAME = "[big.js] ", INVALID = NAME + "Invalid ", INVALID_DP = INVALID + "decimal places", P = {}, NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  function round(x, dp, rm, more) {
    var xc = x.c, i = x.e + dp + 1;
    if (i < xc.length) {
      if (1 === rm) more = xc[i] >= 5; else if (2 === rm) more = xc[i] > 5 || 5 == xc[i] && (more || i < 0 || void 0 !== xc[i + 1] || 1 & xc[i - 1]); else if (3 === rm) more = more || !!xc[0]; else if (more = !1, 
      0 !== rm) throw Error("[big.js] Invalid rounding mode");
      if (i < 1) xc.length = 1, more ? (x.e = -dp, xc[0] = 1) : xc[0] = x.e = 0; else {
        if (xc.length = i--, more) for (;++xc[i] > 9; ) xc[i] = 0, i-- || (++x.e, xc.unshift(1));
        for (i = xc.length; !xc[--i]; ) xc.pop();
      }
    } else if (rm < 0 || rm > 3 || rm !== ~~rm) throw Error("[big.js] Invalid rounding mode");
    return x;
  }
  function stringify(x, id, n, k) {
    var e, s, Big = x.constructor, z = !x.c[0];
    if (void 0 !== n) {
      if (n !== ~~n || n < (3 == id) || n > 1e6) throw Error(3 == id ? INVALID + "precision" : INVALID_DP);
      for (n = k - (x = new Big(x)).e, x.c.length > ++k && round(x, n, Big.RM), 2 == id && (k = x.e + n + 1); x.c.length < k; ) x.c.push(0);
    }
    if (e = x.e, n = (s = x.c.join("")).length, 2 != id && (1 == id || 3 == id && k <= e || e <= Big.NE || e >= Big.PE)) s = s.charAt(0) + (n > 1 ? "." + s.slice(1) : "") + (e < 0 ? "e" : "e+") + e; else if (e < 0) {
      for (;++e; ) s = "0" + s;
      s = "0." + s;
    } else if (e > 0) if (++e > n) for (e -= n; e--; ) s += "0"; else e < n && (s = s.slice(0, e) + "." + s.slice(e)); else n > 1 && (s = s.charAt(0) + "." + s.slice(1));
    return x.s < 0 && (!z || 4 == id) ? "-" + s : s;
  }
  P.abs = function() {
    var x = new this.constructor(this);
    return x.s = 1, x;
  }, P.cmp = function(y) {
    var isneg, x = this, xc = x.c, yc = (y = new x.constructor(y)).c, i = x.s, j = y.s, k = x.e, l = y.e;
    if (!xc[0] || !yc[0]) return xc[0] ? i : yc[0] ? -j : 0;
    if (i != j) return i;
    if (isneg = i < 0, k != l) return k > l ^ isneg ? 1 : -1;
    for (j = (k = xc.length) < (l = yc.length) ? k : l, i = -1; ++i < j; ) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
  }, P.div = function(y) {
    var x = this, Big = x.constructor, a = x.c, b = (y = new Big(y)).c, k = x.s == y.s ? 1 : -1, dp = Big.DP;
    if (dp !== ~~dp || dp < 0 || dp > 1e6) throw Error(INVALID_DP);
    if (!b[0]) throw Error("[big.js] Division by zero");
    if (!a[0]) return new Big(0 * k);
    var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, d = dp + (q.e = x.e - y.e) + 1;
    for (q.s = k, k = d < 0 ? 0 : d, bz.unshift(0); rl++ < bl; ) r.push(0);
    do {
      for (n = 0; n < 10; n++) {
        if (bl != (rl = r.length)) cmp = bl > rl ? 1 : -1; else for (ri = -1, cmp = 0; ++ri < bl; ) if (b[ri] != r[ri]) {
          cmp = b[ri] > r[ri] ? 1 : -1;
          break;
        }
        if (!(cmp < 0)) break;
        for (bt = rl == bl ? b : bz; rl; ) {
          if (r[--rl] < bt[rl]) {
            for (ri = rl; ri && !r[--ri]; ) r[ri] = 9;
            --r[ri], r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }
        for (;!r[0]; ) r.shift();
      }
      qc[qi++] = cmp ? n : ++n, r[0] && cmp ? r[rl] = a[ai] || 0 : r = [ a[ai] ];
    } while ((ai++ < al || void 0 !== r[0]) && k--);
    return qc[0] || 1 == qi || (qc.shift(), q.e--), qi > d && round(q, dp, Big.RM, void 0 !== r[0]), 
    q;
  }, P.eq = function(y) {
    return !this.cmp(y);
  }, P.gt = function(y) {
    return this.cmp(y) > 0;
  }, P.gte = function(y) {
    return this.cmp(y) > -1;
  }, P.lt = function(y) {
    return this.cmp(y) < 0;
  }, P.lte = function(y) {
    return this.cmp(y) < 1;
  }, P.minus = P.sub = function(y) {
    var i, j, t, xlty, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    if (a != b) return y.s = -b, x.plus(y);
    var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
    if (!xc[0] || !yc[0]) return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
    if (a = xe - ye) {
      for ((xlty = a < 0) ? (a = -a, t = xc) : (ye = xe, t = yc), t.reverse(), b = a; b--; ) t.push(0);
      t.reverse();
    } else for (j = ((xlty = xc.length < yc.length) ? xc : yc).length, a = b = 0; b < j; b++) if (xc[b] != yc[b]) {
      xlty = xc[b] < yc[b];
      break;
    }
    if (xlty && (t = xc, xc = yc, yc = t, y.s = -y.s), (b = (j = yc.length) - (i = xc.length)) > 0) for (;b--; ) xc[i++] = 0;
    for (b = i; j > a; ) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; ) xc[i] = 9;
        --xc[i], xc[j] += 10;
      }
      xc[j] -= yc[j];
    }
    for (;0 === xc[--b]; ) xc.pop();
    for (;0 === xc[0]; ) xc.shift(), --ye;
    return xc[0] || (y.s = 1, xc = [ ye = 0 ]), y.c = xc, y.e = ye, y;
  }, P.mod = function(y) {
    var ygtx, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    if (!y.c[0]) throw Error("[big.js] Division by zero");
    return x.s = y.s = 1, ygtx = 1 == y.cmp(x), x.s = a, y.s = b, ygtx ? new Big(x) : (a = Big.DP, 
    b = Big.RM, Big.DP = Big.RM = 0, x = x.div(y), Big.DP = a, Big.RM = b, this.minus(x.times(y)));
  }, P.plus = P.add = function(y) {
    var t, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    if (a != b) return y.s = -b, x.minus(y);
    var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
    if (!xc[0] || !yc[0]) return yc[0] ? y : new Big(xc[0] ? x : 0 * a);
    if (xc = xc.slice(), a = xe - ye) {
      for (a > 0 ? (ye = xe, t = yc) : (a = -a, t = xc), t.reverse(); a--; ) t.push(0);
      t.reverse();
    }
    for (xc.length - yc.length < 0 && (t = yc, yc = xc, xc = t), a = yc.length, b = 0; a; xc[a] %= 10) b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
    for (b && (xc.unshift(b), ++ye), a = xc.length; 0 === xc[--a]; ) xc.pop();
    return y.c = xc, y.e = ye, y;
  }, P.pow = function(n) {
    var x = this, one = new x.constructor(1), y = one, isneg = n < 0;
    if (n !== ~~n || n < -1e6 || n > 1e6) throw Error(INVALID + "exponent");
    for (isneg && (n = -n); 1 & n && (y = y.times(x)), n >>= 1; ) x = x.times(x);
    return isneg ? one.div(y) : y;
  }, P.round = function(dp, rm) {
    var Big = this.constructor;
    if (void 0 === dp) dp = 0; else if (dp !== ~~dp || dp < -1e6 || dp > 1e6) throw Error(INVALID_DP);
    return round(new Big(this), dp, void 0 === rm ? Big.RM : rm);
  }, P.sqrt = function() {
    var r, c, t, x = this, Big = x.constructor, s = x.s, e = x.e, half = new Big(.5);
    if (!x.c[0]) return new Big(x);
    if (s < 0) throw Error(NAME + "No square root");
    0 === (s = Math.sqrt(x + "")) || s === 1 / 0 ? ((c = x.c.join("")).length + e & 1 || (c += "0"), 
    e = ((e + 1) / 2 | 0) - (e < 0 || 1 & e), r = new Big(((s = Math.sqrt(c)) == 1 / 0 ? "1e" : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + e)) : r = new Big(s), 
    e = r.e + (Big.DP += 4);
    do {
      t = r, r = half.times(t.plus(x.div(t)));
    } while (t.c.slice(0, e).join("") !== r.c.slice(0, e).join(""));
    return round(r, Big.DP -= 4, Big.RM);
  }, P.times = P.mul = function(y) {
    var c, x = this, Big = x.constructor, xc = x.c, yc = (y = new Big(y)).c, a = xc.length, b = yc.length, i = x.e, j = y.e;
    if (y.s = x.s == y.s ? 1 : -1, !xc[0] || !yc[0]) return new Big(0 * y.s);
    for (y.e = i + j, a < b && (c = xc, xc = yc, yc = c, j = a, a = b, b = j), c = new Array(j = a + b); j--; ) c[j] = 0;
    for (i = b; i--; ) {
      for (b = 0, j = a + i; j > i; ) b = c[j] + yc[i] * xc[j - i - 1] + b, c[j--] = b % 10, 
      b = b / 10 | 0;
      c[j] = (c[j] + b) % 10;
    }
    for (b ? ++y.e : c.shift(), i = c.length; !c[--i]; ) c.pop();
    return y.c = c, y;
  }, P.toExponential = function(dp) {
    return stringify(this, 1, dp, dp);
  }, P.toFixed = function(dp) {
    return stringify(this, 2, dp, this.e + dp);
  }, P.toPrecision = function(sd) {
    return stringify(this, 3, sd, sd - 1);
  }, P.toString = function() {
    return stringify(this);
  }, P.valueOf = P.toJSON = function() {
    return stringify(this, 4);
  };
  var Big = function _Big_() {
    function Big(n) {
      var x = this;
      if (!(x instanceof Big)) return void 0 === n ? _Big_() : new Big(n);
      n instanceof Big ? (x.s = n.s, x.e = n.e, x.c = n.c.slice()) : function(x, n) {
        var e, i, nl;
        if (0 === n && 1 / n < 0) n = "-0"; else if (!NUMERIC.test(n += "")) throw Error(INVALID + "number");
        x.s = "-" == n.charAt(0) ? (n = n.slice(1), -1) : 1, (e = n.indexOf(".")) > -1 && (n = n.replace(".", ""));
        (i = n.search(/e/i)) > 0 ? (e < 0 && (e = i), e += +n.slice(i + 1), n = n.substring(0, i)) : e < 0 && (e = n.length);
        for (nl = n.length, i = 0; i < nl && "0" == n.charAt(i); ) ++i;
        if (i == nl) x.c = [ x.e = 0 ]; else {
          for (;nl > 0 && "0" == n.charAt(--nl); ) ;
          for (x.e = e - i - 1, x.c = [], e = 0; i <= nl; ) x.c[e++] = +n.charAt(i++);
        }
      }(x, n), x.constructor = Big;
    }
    return Big.prototype = P, Big.DP = 20, Big.RM = 1, Big.NE = -7, Big.PE = 21, Big.version = "5.2.2", 
    Big;
  }();
  __webpack_exports__.default = Big;
}, function(module, exports) {
  module.exports = require("crypto");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), emojisList = __webpack_require__(69), getHashDigest = __webpack_require__(18), emojiRegex = /[\uD800-\uDFFF]./, emojiList = emojisList.filter(emoji => emojiRegex.test(emoji)), emojiCache = {};
  module.exports = function(loaderContext, name, options) {
    let filename;
    const hasQuery = loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1;
    filename = "function" == typeof name ? name(loaderContext.resourcePath, hasQuery ? loaderContext.resourceQuery : void 0) : name || "[hash].[ext]";
    const context = options.context, content = options.content, regExp = options.regExp;
    let ext = "bin", basename = "file", directory = "", folder = "", query = "";
    if (loaderContext.resourcePath) {
      const parsed = path.parse(loaderContext.resourcePath);
      let resourcePath = loaderContext.resourcePath;
      parsed.ext && (ext = parsed.ext.substr(1)), parsed.dir && (basename = parsed.name, 
      resourcePath = parsed.dir + path.sep), void 0 !== context ? (directory = path.relative(context, resourcePath + "_").replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1"), 
      directory = directory.substr(0, directory.length - 1)) : directory = resourcePath.replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1"), 
      1 === directory.length ? directory = "" : directory.length > 1 && (folder = path.basename(directory));
    }
    if (loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1) {
      query = loaderContext.resourceQuery;
      const hashIdx = query.indexOf("#");
      hashIdx >= 0 && (query = query.substr(0, hashIdx));
    }
    let url = filename;
    if (content && (url = url.replace(/\[(?:([^:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*))?(?::(\d+))?\]/gi, (all, hashType, digestType, maxLength) => getHashDigest(content, hashType, digestType, parseInt(maxLength, 10))).replace(/\[emoji(?::(\d+))?\]/gi, (all, length) => function(content, length) {
      if (emojiCache[content]) return emojiCache[content];
      length = length || 1;
      const emojis = [];
      do {
        if (!emojiList.length) throw new Error("Ran out of emoji");
        const index = Math.floor(Math.random() * emojiList.length);
        emojis.push(emojiList[index]), emojiList.splice(index, 1);
      } while (--length > 0);
      const emojiEncoding = emojis.join("");
      return emojiCache[content] = emojiEncoding, emojiEncoding;
    }(content, parseInt(length, 10)))), url = url.replace(/\[ext\]/gi, () => ext).replace(/\[name\]/gi, () => basename).replace(/\[path\]/gi, () => directory).replace(/\[folder\]/gi, () => folder).replace(/\[query\]/gi, () => query), 
    regExp && loaderContext.resourcePath) {
      const match = loaderContext.resourcePath.match(new RegExp(regExp));
      match && match.forEach((matched, i) => {
        url = url.replace(new RegExp("\\[" + i + "\\]", "ig"), matched);
      });
    }
    return "object" == typeof loaderContext.options && "function" == typeof loaderContext.options.customInterpolateName && (url = loaderContext.options.customInterpolateName.call(loaderContext, url, name, options)), 
    url;
  };
}, function(module, exports) {
  module.exports = [ "🀄️", "🃏", "🅰️", "🅱️", "🅾️", "🅿️", "🆎", "🆑", "🆒", "🆓", "🆔", "🆕", "🆖", "🆗", "🆘", "🆙", "🆚", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇦", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫", "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇧", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲", "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇨", "🇩🇪", "🇩🇬", "🇩🇯", "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇩", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺", "🇪", "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷", "🇫", "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭", "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇬", "🇭🇰", "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇭", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶", "🇮🇷", "🇮🇸", "🇮🇹", "🇮", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵", "🇯", "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳", "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇰", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹", "🇱🇺", "🇱🇻", "🇱🇾", "🇱", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲", "🇲🇳", "🇲🇴", "🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺", "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿", "🇲", "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇳", "🇴🇲", "🇴", "🇵🇦", "🇵🇪", "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼", "🇵🇾", "🇵", "🇶🇦", "🇶", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇷", "🇸🇦", "🇸🇧", "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬", "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽", "🇸🇾", "🇸🇿", "🇸", "🇹🇦", "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳", "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇹", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿", "🇺", "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇻", "🇼🇫", "🇼🇸", "🇼", "🇽🇰", "🇽", "🇾🇪", "🇾🇹", "🇾", "🇿🇦", "🇿🇲", "🇿🇼", "🇿", "🈁", "🈂️", "🈚️", "🈯️", "🈲", "🈳", "🈴", "🈵", "🈶", "🈷️", "🈸", "🈹", "🈺", "🉐", "🉑", "🌀", "🌁", "🌂", "🌃", "🌄", "🌅", "🌆", "🌇", "🌈", "🌉", "🌊", "🌋", "🌌", "🌍", "🌎", "🌏", "🌐", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌙", "🌚", "🌛", "🌜", "🌝", "🌞", "🌟", "🌠", "🌡️", "🌤️", "🌥️", "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "🌬️", "🌭", "🌮", "🌯", "🌰", "🌱", "🌲", "🌳", "🌴", "🌵", "🌶️", "🌷", "🌸", "🌹", "🌺", "🌻", "🌼", "🌽", "🌾", "🌿", "🍀", "🍁", "🍂", "🍃", "🍄", "🍅", "🍆", "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🍔", "🍕", "🍖", "🍗", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍞", "🍟", "🍠", "🍡", "🍢", "🍣", "🍤", "🍥", "🍦", "🍧", "🍨", "🍩", "🍪", "🍫", "🍬", "🍭", "🍮", "🍯", "🍰", "🍱", "🍲", "🍳", "🍴", "🍵", "🍶", "🍷", "🍸", "🍹", "🍺", "🍻", "🍼", "🍽️", "🍾", "🍿", "🎀", "🎁", "🎂", "🎃", "🎄", "🎅🏻", "🎅🏼", "🎅🏽", "🎅🏾", "🎅🏿", "🎅", "🎆", "🎇", "🎈", "🎉", "🎊", "🎋", "🎌", "🎍", "🎎", "🎏", "🎐", "🎑", "🎒", "🎓", "🎖️", "🎗️", "🎙️", "🎚️", "🎛️", "🎞️", "🎟️", "🎠", "🎡", "🎢", "🎣", "🎤", "🎥", "🎦", "🎧", "🎨", "🎩", "🎪", "🎫", "🎬", "🎭", "🎮", "🎯", "🎰", "🎱", "🎲", "🎳", "🎴", "🎵", "🎶", "🎷", "🎸", "🎹", "🎺", "🎻", "🎼", "🎽", "🎾", "🎿", "🏀", "🏁", "🏂🏻", "🏂🏼", "🏂🏽", "🏂🏾", "🏂🏿", "🏂", "🏃🏻‍♀️", "🏃🏻‍♂️", "🏃🏻", "🏃🏼‍♀️", "🏃🏼‍♂️", "🏃🏼", "🏃🏽‍♀️", "🏃🏽‍♂️", "🏃🏽", "🏃🏾‍♀️", "🏃🏾‍♂️", "🏃🏾", "🏃🏿‍♀️", "🏃🏿‍♂️", "🏃🏿", "🏃‍♀️", "🏃‍♂️", "🏃", "🏄🏻‍♀️", "🏄🏻‍♂️", "🏄🏻", "🏄🏼‍♀️", "🏄🏼‍♂️", "🏄🏼", "🏄🏽‍♀️", "🏄🏽‍♂️", "🏄🏽", "🏄🏾‍♀️", "🏄🏾‍♂️", "🏄🏾", "🏄🏿‍♀️", "🏄🏿‍♂️", "🏄🏿", "🏄‍♀️", "🏄‍♂️", "🏄", "🏅", "🏆", "🏇🏻", "🏇🏼", "🏇🏽", "🏇🏾", "🏇🏿", "🏇", "🏈", "🏉", "🏊🏻‍♀️", "🏊🏻‍♂️", "🏊🏻", "🏊🏼‍♀️", "🏊🏼‍♂️", "🏊🏼", "🏊🏽‍♀️", "🏊🏽‍♂️", "🏊🏽", "🏊🏾‍♀️", "🏊🏾‍♂️", "🏊🏾", "🏊🏿‍♀️", "🏊🏿‍♂️", "🏊🏿", "🏊‍♀️", "🏊‍♂️", "🏊", "🏋🏻‍♀️", "🏋🏻‍♂️", "🏋🏻", "🏋🏼‍♀️", "🏋🏼‍♂️", "🏋🏼", "🏋🏽‍♀️", "🏋🏽‍♂️", "🏋🏽", "🏋🏾‍♀️", "🏋🏾‍♂️", "🏋🏾", "🏋🏿‍♀️", "🏋🏿‍♂️", "🏋🏿", "🏋️‍♀️", "🏋️‍♂️", "🏋️", "🏌🏻‍♀️", "🏌🏻‍♂️", "🏌🏻", "🏌🏼‍♀️", "🏌🏼‍♂️", "🏌🏼", "🏌🏽‍♀️", "🏌🏽‍♂️", "🏌🏽", "🏌🏾‍♀️", "🏌🏾‍♂️", "🏌🏾", "🏌🏿‍♀️", "🏌🏿‍♂️", "🏌🏿", "🏌️‍♀️", "🏌️‍♂️", "🏌️", "🏍️", "🏎️", "🏏", "🏐", "🏑", "🏒", "🏓", "🏔️", "🏕️", "🏖️", "🏗️", "🏘️", "🏙️", "🏚️", "🏛️", "🏜️", "🏝️", "🏞️", "🏟️", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏧", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏮", "🏯", "🏰", "🏳️‍🌈", "🏳️", "🏴‍☠️", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "🏴󠁧󠁢󠁷󠁬󠁳󠁿", "🏴", "🏵️", "🏷️", "🏸", "🏹", "🏺", "🏻", "🏼", "🏽", "🏾", "🏿", "🐀", "🐁", "🐂", "🐃", "🐄", "🐅", "🐆", "🐇", "🐈", "🐉", "🐊", "🐋", "🐌", "🐍", "🐎", "🐏", "🐐", "🐑", "🐒", "🐓", "🐔", "🐕‍🦺", "🐕", "🐖", "🐗", "🐘", "🐙", "🐚", "🐛", "🐜", "🐝", "🐞", "🐟", "🐠", "🐡", "🐢", "🐣", "🐤", "🐥", "🐦", "🐧", "🐨", "🐩", "🐪", "🐫", "🐬", "🐭", "🐮", "🐯", "🐰", "🐱", "🐲", "🐳", "🐴", "🐵", "🐶", "🐷", "🐸", "🐹", "🐺", "🐻", "🐼", "🐽", "🐾", "🐿️", "👀", "👁‍🗨", "👁️", "👂🏻", "👂🏼", "👂🏽", "👂🏾", "👂🏿", "👂", "👃🏻", "👃🏼", "👃🏽", "👃🏾", "👃🏿", "👃", "👄", "👅", "👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿", "👆", "👇🏻", "👇🏼", "👇🏽", "👇🏾", "👇🏿", "👇", "👈🏻", "👈🏼", "👈🏽", "👈🏾", "👈🏿", "👈", "👉🏻", "👉🏼", "👉🏽", "👉🏾", "👉🏿", "👉", "👊🏻", "👊🏼", "👊🏽", "👊🏾", "👊🏿", "👊", "👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿", "👋", "👌🏻", "👌🏼", "👌🏽", "👌🏾", "👌🏿", "👌", "👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿", "👍", "👎🏻", "👎🏼", "👎🏽", "👎🏾", "👎🏿", "👎", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿", "👏", "👐🏻", "👐🏼", "👐🏽", "👐🏾", "👐🏿", "👐", "👑", "👒", "👓", "👔", "👕", "👖", "👗", "👘", "👙", "👚", "👛", "👜", "👝", "👞", "👟", "👠", "👡", "👢", "👣", "👤", "👥", "👦🏻", "👦🏼", "👦🏽", "👦🏾", "👦🏿", "👦", "👧🏻", "👧🏼", "👧🏽", "👧🏾", "👧🏿", "👧", "👨🏻‍🌾", "👨🏻‍🍳", "👨🏻‍🎓", "👨🏻‍🎤", "👨🏻‍🎨", "👨🏻‍🏫", "👨🏻‍🏭", "👨🏻‍💻", "👨🏻‍💼", "👨🏻‍🔧", "👨🏻‍🔬", "👨🏻‍🚀", "👨🏻‍🚒", "👨🏻‍🦯", "👨🏻‍🦰", "👨🏻‍🦱", "👨🏻‍🦲", "👨🏻‍🦳", "👨🏻‍🦼", "👨🏻‍🦽", "👨🏻‍⚕️", "👨🏻‍⚖️", "👨🏻‍✈️", "👨🏻", "👨🏼‍🌾", "👨🏼‍🍳", "👨🏼‍🎓", "👨🏼‍🎤", "👨🏼‍🎨", "👨🏼‍🏫", "👨🏼‍🏭", "👨🏼‍💻", "👨🏼‍💼", "👨🏼‍🔧", "👨🏼‍🔬", "👨🏼‍🚀", "👨🏼‍🚒", "👨🏼‍🤝‍👨🏻", "👨🏼‍🦯", "👨🏼‍🦰", "👨🏼‍🦱", "👨🏼‍🦲", "👨🏼‍🦳", "👨🏼‍🦼", "👨🏼‍🦽", "👨🏼‍⚕️", "👨🏼‍⚖️", "👨🏼‍✈️", "👨🏼", "👨🏽‍🌾", "👨🏽‍🍳", "👨🏽‍🎓", "👨🏽‍🎤", "👨🏽‍🎨", "👨🏽‍🏫", "👨🏽‍🏭", "👨🏽‍💻", "👨🏽‍💼", "👨🏽‍🔧", "👨🏽‍🔬", "👨🏽‍🚀", "👨🏽‍🚒", "👨🏽‍🤝‍👨🏻", "👨🏽‍🤝‍👨🏼", "👨🏽‍🦯", "👨🏽‍🦰", "👨🏽‍🦱", "👨🏽‍🦲", "👨🏽‍🦳", "👨🏽‍🦼", "👨🏽‍🦽", "👨🏽‍⚕️", "👨🏽‍⚖️", "👨🏽‍✈️", "👨🏽", "👨🏾‍🌾", "👨🏾‍🍳", "👨🏾‍🎓", "👨🏾‍🎤", "👨🏾‍🎨", "👨🏾‍🏫", "👨🏾‍🏭", "👨🏾‍💻", "👨🏾‍💼", "👨🏾‍🔧", "👨🏾‍🔬", "👨🏾‍🚀", "👨🏾‍🚒", "👨🏾‍🤝‍👨🏻", "👨🏾‍🤝‍👨🏼", "👨🏾‍🤝‍👨🏽", "👨🏾‍🦯", "👨🏾‍🦰", "👨🏾‍🦱", "👨🏾‍🦲", "👨🏾‍🦳", "👨🏾‍🦼", "👨🏾‍🦽", "👨🏾‍⚕️", "👨🏾‍⚖️", "👨🏾‍✈️", "👨🏾", "👨🏿‍🌾", "👨🏿‍🍳", "👨🏿‍🎓", "👨🏿‍🎤", "👨🏿‍🎨", "👨🏿‍🏫", "👨🏿‍🏭", "👨🏿‍💻", "👨🏿‍💼", "👨🏿‍🔧", "👨🏿‍🔬", "👨🏿‍🚀", "👨🏿‍🚒", "👨🏿‍🤝‍👨🏻", "👨🏿‍🤝‍👨🏼", "👨🏿‍🤝‍👨🏽", "👨🏿‍🤝‍👨🏾", "👨🏿‍🦯", "👨🏿‍🦰", "👨🏿‍🦱", "👨🏿‍🦲", "👨🏿‍🦳", "👨🏿‍🦼", "👨🏿‍🦽", "👨🏿‍⚕️", "👨🏿‍⚖️", "👨🏿‍✈️", "👨🏿", "👨‍🌾", "👨‍🍳", "👨‍🎓", "👨‍🎤", "👨‍🎨", "👨‍🏫", "👨‍🏭", "👨‍👦‍👦", "👨‍👦", "👨‍👧‍👦", "👨‍👧‍👧", "👨‍👧", "👨‍👨‍👦‍👦", "👨‍👨‍👦", "👨‍👨‍👧‍👦", "👨‍👨‍👧‍👧", "👨‍👨‍👧", "👨‍👩‍👦‍👦", "👨‍👩‍👦", "👨‍👩‍👧‍👦", "👨‍👩‍👧‍👧", "👨‍👩‍👧", "👨‍💻", "👨‍💼", "👨‍🔧", "👨‍🔬", "👨‍🚀", "👨‍🚒", "👨‍🦯", "👨‍🦰", "👨‍🦱", "👨‍🦲", "👨‍🦳", "👨‍🦼", "👨‍🦽", "👨‍⚕️", "👨‍⚖️", "👨‍✈️", "👨‍❤️‍👨", "👨‍❤️‍💋‍👨", "👨", "👩🏻‍🌾", "👩🏻‍🍳", "👩🏻‍🎓", "👩🏻‍🎤", "👩🏻‍🎨", "👩🏻‍🏫", "👩🏻‍🏭", "👩🏻‍💻", "👩🏻‍💼", "👩🏻‍🔧", "👩🏻‍🔬", "👩🏻‍🚀", "👩🏻‍🚒", "👩🏻‍🤝‍👨🏼", "👩🏻‍🤝‍👨🏽", "👩🏻‍🤝‍👨🏾", "👩🏻‍🤝‍👨🏿", "👩🏻‍🦯", "👩🏻‍🦰", "👩🏻‍🦱", "👩🏻‍🦲", "👩🏻‍🦳", "👩🏻‍🦼", "👩🏻‍🦽", "👩🏻‍⚕️", "👩🏻‍⚖️", "👩🏻‍✈️", "👩🏻", "👩🏼‍🌾", "👩🏼‍🍳", "👩🏼‍🎓", "👩🏼‍🎤", "👩🏼‍🎨", "👩🏼‍🏫", "👩🏼‍🏭", "👩🏼‍💻", "👩🏼‍💼", "👩🏼‍🔧", "👩🏼‍🔬", "👩🏼‍🚀", "👩🏼‍🚒", "👩🏼‍🤝‍👨🏻", "👩🏼‍🤝‍👨🏽", "👩🏼‍🤝‍👨🏾", "👩🏼‍🤝‍👨🏿", "👩🏼‍🤝‍👩🏻", "👩🏼‍🦯", "👩🏼‍🦰", "👩🏼‍🦱", "👩🏼‍🦲", "👩🏼‍🦳", "👩🏼‍🦼", "👩🏼‍🦽", "👩🏼‍⚕️", "👩🏼‍⚖️", "👩🏼‍✈️", "👩🏼", "👩🏽‍🌾", "👩🏽‍🍳", "👩🏽‍🎓", "👩🏽‍🎤", "👩🏽‍🎨", "👩🏽‍🏫", "👩🏽‍🏭", "👩🏽‍💻", "👩🏽‍💼", "👩🏽‍🔧", "👩🏽‍🔬", "👩🏽‍🚀", "👩🏽‍🚒", "👩🏽‍🤝‍👨🏻", "👩🏽‍🤝‍👨🏼", "👩🏽‍🤝‍👨🏾", "👩🏽‍🤝‍👨🏿", "👩🏽‍🤝‍👩🏻", "👩🏽‍🤝‍👩🏼", "👩🏽‍🦯", "👩🏽‍🦰", "👩🏽‍🦱", "👩🏽‍🦲", "👩🏽‍🦳", "👩🏽‍🦼", "👩🏽‍🦽", "👩🏽‍⚕️", "👩🏽‍⚖️", "👩🏽‍✈️", "👩🏽", "👩🏾‍🌾", "👩🏾‍🍳", "👩🏾‍🎓", "👩🏾‍🎤", "👩🏾‍🎨", "👩🏾‍🏫", "👩🏾‍🏭", "👩🏾‍💻", "👩🏾‍💼", "👩🏾‍🔧", "👩🏾‍🔬", "👩🏾‍🚀", "👩🏾‍🚒", "👩🏾‍🤝‍👨🏻", "👩🏾‍🤝‍👨🏼", "👩🏾‍🤝‍👨🏽", "👩🏾‍🤝‍👨🏿", "👩🏾‍🤝‍👩🏻", "👩🏾‍🤝‍👩🏼", "👩🏾‍🤝‍👩🏽", "👩🏾‍🦯", "👩🏾‍🦰", "👩🏾‍🦱", "👩🏾‍🦲", "👩🏾‍🦳", "👩🏾‍🦼", "👩🏾‍🦽", "👩🏾‍⚕️", "👩🏾‍⚖️", "👩🏾‍✈️", "👩🏾", "👩🏿‍🌾", "👩🏿‍🍳", "👩🏿‍🎓", "👩🏿‍🎤", "👩🏿‍🎨", "👩🏿‍🏫", "👩🏿‍🏭", "👩🏿‍💻", "👩🏿‍💼", "👩🏿‍🔧", "👩🏿‍🔬", "👩🏿‍🚀", "👩🏿‍🚒", "👩🏿‍🤝‍👨🏻", "👩🏿‍🤝‍👨🏼", "👩🏿‍🤝‍👨🏽", "👩🏿‍🤝‍👨🏾", "👩🏿‍🤝‍👩🏻", "👩🏿‍🤝‍👩🏼", "👩🏿‍🤝‍👩🏽", "👩🏿‍🤝‍👩🏾", "👩🏿‍🦯", "👩🏿‍🦰", "👩🏿‍🦱", "👩🏿‍🦲", "👩🏿‍🦳", "👩🏿‍🦼", "👩🏿‍🦽", "👩🏿‍⚕️", "👩🏿‍⚖️", "👩🏿‍✈️", "👩🏿", "👩‍🌾", "👩‍🍳", "👩‍🎓", "👩‍🎤", "👩‍🎨", "👩‍🏫", "👩‍🏭", "👩‍👦‍👦", "👩‍👦", "👩‍👧‍👦", "👩‍👧‍👧", "👩‍👧", "👩‍👩‍👦‍👦", "👩‍👩‍👦", "👩‍👩‍👧‍👦", "👩‍👩‍👧‍👧", "👩‍👩‍👧", "👩‍💻", "👩‍💼", "👩‍🔧", "👩‍🔬", "👩‍🚀", "👩‍🚒", "👩‍🦯", "👩‍🦰", "👩‍🦱", "👩‍🦲", "👩‍🦳", "👩‍🦼", "👩‍🦽", "👩‍⚕️", "👩‍⚖️", "👩‍✈️", "👩‍❤️‍👨", "👩‍❤️‍👩", "👩‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "👩", "👪", "👫🏻", "👫🏼", "👫🏽", "👫🏾", "👫🏿", "👫", "👬🏻", "👬🏼", "👬🏽", "👬🏾", "👬🏿", "👬", "👭🏻", "👭🏼", "👭🏽", "👭🏾", "👭🏿", "👭", "👮🏻‍♀️", "👮🏻‍♂️", "👮🏻", "👮🏼‍♀️", "👮🏼‍♂️", "👮🏼", "👮🏽‍♀️", "👮🏽‍♂️", "👮🏽", "👮🏾‍♀️", "👮🏾‍♂️", "👮🏾", "👮🏿‍♀️", "👮🏿‍♂️", "👮🏿", "👮‍♀️", "👮‍♂️", "👮", "👯‍♀️", "👯‍♂️", "👯", "👰🏻", "👰🏼", "👰🏽", "👰🏾", "👰🏿", "👰", "👱🏻‍♀️", "👱🏻‍♂️", "👱🏻", "👱🏼‍♀️", "👱🏼‍♂️", "👱🏼", "👱🏽‍♀️", "👱🏽‍♂️", "👱🏽", "👱🏾‍♀️", "👱🏾‍♂️", "👱🏾", "👱🏿‍♀️", "👱🏿‍♂️", "👱🏿", "👱‍♀️", "👱‍♂️", "👱", "👲🏻", "👲🏼", "👲🏽", "👲🏾", "👲🏿", "👲", "👳🏻‍♀️", "👳🏻‍♂️", "👳🏻", "👳🏼‍♀️", "👳🏼‍♂️", "👳🏼", "👳🏽‍♀️", "👳🏽‍♂️", "👳🏽", "👳🏾‍♀️", "👳🏾‍♂️", "👳🏾", "👳🏿‍♀️", "👳🏿‍♂️", "👳🏿", "👳‍♀️", "👳‍♂️", "👳", "👴🏻", "👴🏼", "👴🏽", "👴🏾", "👴🏿", "👴", "👵🏻", "👵🏼", "👵🏽", "👵🏾", "👵🏿", "👵", "👶🏻", "👶🏼", "👶🏽", "👶🏾", "👶🏿", "👶", "👷🏻‍♀️", "👷🏻‍♂️", "👷🏻", "👷🏼‍♀️", "👷🏼‍♂️", "👷🏼", "👷🏽‍♀️", "👷🏽‍♂️", "👷🏽", "👷🏾‍♀️", "👷🏾‍♂️", "👷🏾", "👷🏿‍♀️", "👷🏿‍♂️", "👷🏿", "👷‍♀️", "👷‍♂️", "👷", "👸🏻", "👸🏼", "👸🏽", "👸🏾", "👸🏿", "👸", "👹", "👺", "👻", "👼🏻", "👼🏼", "👼🏽", "👼🏾", "👼🏿", "👼", "👽", "👾", "👿", "💀", "💁🏻‍♀️", "💁🏻‍♂️", "💁🏻", "💁🏼‍♀️", "💁🏼‍♂️", "💁🏼", "💁🏽‍♀️", "💁🏽‍♂️", "💁🏽", "💁🏾‍♀️", "💁🏾‍♂️", "💁🏾", "💁🏿‍♀️", "💁🏿‍♂️", "💁🏿", "💁‍♀️", "💁‍♂️", "💁", "💂🏻‍♀️", "💂🏻‍♂️", "💂🏻", "💂🏼‍♀️", "💂🏼‍♂️", "💂🏼", "💂🏽‍♀️", "💂🏽‍♂️", "💂🏽", "💂🏾‍♀️", "💂🏾‍♂️", "💂🏾", "💂🏿‍♀️", "💂🏿‍♂️", "💂🏿", "💂‍♀️", "💂‍♂️", "💂", "💃🏻", "💃🏼", "💃🏽", "💃🏾", "💃🏿", "💃", "💄", "💅🏻", "💅🏼", "💅🏽", "💅🏾", "💅🏿", "💅", "💆🏻‍♀️", "💆🏻‍♂️", "💆🏻", "💆🏼‍♀️", "💆🏼‍♂️", "💆🏼", "💆🏽‍♀️", "💆🏽‍♂️", "💆🏽", "💆🏾‍♀️", "💆🏾‍♂️", "💆🏾", "💆🏿‍♀️", "💆🏿‍♂️", "💆🏿", "💆‍♀️", "💆‍♂️", "💆", "💇🏻‍♀️", "💇🏻‍♂️", "💇🏻", "💇🏼‍♀️", "💇🏼‍♂️", "💇🏼", "💇🏽‍♀️", "💇🏽‍♂️", "💇🏽", "💇🏾‍♀️", "💇🏾‍♂️", "💇🏾", "💇🏿‍♀️", "💇🏿‍♂️", "💇🏿", "💇‍♀️", "💇‍♂️", "💇", "💈", "💉", "💊", "💋", "💌", "💍", "💎", "💏", "💐", "💑", "💒", "💓", "💔", "💕", "💖", "💗", "💘", "💙", "💚", "💛", "💜", "💝", "💞", "💟", "💠", "💡", "💢", "💣", "💤", "💥", "💦", "💧", "💨", "💩", "💪🏻", "💪🏼", "💪🏽", "💪🏾", "💪🏿", "💪", "💫", "💬", "💭", "💮", "💯", "💰", "💱", "💲", "💳", "💴", "💵", "💶", "💷", "💸", "💹", "💺", "💻", "💼", "💽", "💾", "💿", "📀", "📁", "📂", "📃", "📄", "📅", "📆", "📇", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "📏", "📐", "📑", "📒", "📓", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "📛", "📜", "📝", "📞", "📟", "📠", "📡", "📢", "📣", "📤", "📥", "📦", "📧", "📨", "📩", "📪", "📫", "📬", "📭", "📮", "📯", "📰", "📱", "📲", "📳", "📴", "📵", "📶", "📷", "📸", "📹", "📺", "📻", "📼", "📽️", "📿", "🔀", "🔁", "🔂", "🔃", "🔄", "🔅", "🔆", "🔇", "🔈", "🔉", "🔊", "🔋", "🔌", "🔍", "🔎", "🔏", "🔐", "🔑", "🔒", "🔓", "🔔", "🔕", "🔖", "🔗", "🔘", "🔙", "🔚", "🔛", "🔜", "🔝", "🔞", "🔟", "🔠", "🔡", "🔢", "🔣", "🔤", "🔥", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "🔬", "🔭", "🔮", "🔯", "🔰", "🔱", "🔲", "🔳", "🔴", "🔵", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "🔼", "🔽", "🕉️", "🕊️", "🕋", "🕌", "🕍", "🕎", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧", "🕯️", "🕰️", "🕳️", "🕴🏻‍♀️", "🕴🏻‍♂️", "🕴🏻", "🕴🏼‍♀️", "🕴🏼‍♂️", "🕴🏼", "🕴🏽‍♀️", "🕴🏽‍♂️", "🕴🏽", "🕴🏾‍♀️", "🕴🏾‍♂️", "🕴🏾", "🕴🏿‍♀️", "🕴🏿‍♂️", "🕴🏿", "🕴️‍♀️", "🕴️‍♂️", "🕴️", "🕵🏻‍♀️", "🕵🏻‍♂️", "🕵🏻", "🕵🏼‍♀️", "🕵🏼‍♂️", "🕵🏼", "🕵🏽‍♀️", "🕵🏽‍♂️", "🕵🏽", "🕵🏾‍♀️", "🕵🏾‍♂️", "🕵🏾", "🕵🏿‍♀️", "🕵🏿‍♂️", "🕵🏿", "🕵️‍♀️", "🕵️‍♂️", "🕵️", "🕶️", "🕷️", "🕸️", "🕹️", "🕺🏻", "🕺🏼", "🕺🏽", "🕺🏾", "🕺🏿", "🕺", "🖇️", "🖊️", "🖋️", "🖌️", "🖍️", "🖐🏻", "🖐🏼", "🖐🏽", "🖐🏾", "🖐🏿", "🖐️", "🖕🏻", "🖕🏼", "🖕🏽", "🖕🏾", "🖕🏿", "🖕", "🖖🏻", "🖖🏼", "🖖🏽", "🖖🏾", "🖖🏿", "🖖", "🖤", "🖥️", "🖨️", "🖱️", "🖲️", "🖼️", "🗂️", "🗃️", "🗄️", "🗑️", "🗒️", "🗓️", "🗜️", "🗝️", "🗞️", "🗡️", "🗣️", "🗨️", "🗯️", "🗳️", "🗺️", "🗻", "🗼", "🗽", "🗾", "🗿", "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗", "😘", "😙", "😚", "😛", "😜", "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩", "😪", "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲", "😳", "😴", "😵", "😶", "😷", "😸", "😹", "😺", "😻", "😼", "😽", "😾", "😿", "🙀", "🙁", "🙂", "🙃", "🙄", "🙅🏻‍♀️", "🙅🏻‍♂️", "🙅🏻", "🙅🏼‍♀️", "🙅🏼‍♂️", "🙅🏼", "🙅🏽‍♀️", "🙅🏽‍♂️", "🙅🏽", "🙅🏾‍♀️", "🙅🏾‍♂️", "🙅🏾", "🙅🏿‍♀️", "🙅🏿‍♂️", "🙅🏿", "🙅‍♀️", "🙅‍♂️", "🙅", "🙆🏻‍♀️", "🙆🏻‍♂️", "🙆🏻", "🙆🏼‍♀️", "🙆🏼‍♂️", "🙆🏼", "🙆🏽‍♀️", "🙆🏽‍♂️", "🙆🏽", "🙆🏾‍♀️", "🙆🏾‍♂️", "🙆🏾", "🙆🏿‍♀️", "🙆🏿‍♂️", "🙆🏿", "🙆‍♀️", "🙆‍♂️", "🙆", "🙇🏻‍♀️", "🙇🏻‍♂️", "🙇🏻", "🙇🏼‍♀️", "🙇🏼‍♂️", "🙇🏼", "🙇🏽‍♀️", "🙇🏽‍♂️", "🙇🏽", "🙇🏾‍♀️", "🙇🏾‍♂️", "🙇🏾", "🙇🏿‍♀️", "🙇🏿‍♂️", "🙇🏿", "🙇‍♀️", "🙇‍♂️", "🙇", "🙈", "🙉", "🙊", "🙋🏻‍♀️", "🙋🏻‍♂️", "🙋🏻", "🙋🏼‍♀️", "🙋🏼‍♂️", "🙋🏼", "🙋🏽‍♀️", "🙋🏽‍♂️", "🙋🏽", "🙋🏾‍♀️", "🙋🏾‍♂️", "🙋🏾", "🙋🏿‍♀️", "🙋🏿‍♂️", "🙋🏿", "🙋‍♀️", "🙋‍♂️", "🙋", "🙌🏻", "🙌🏼", "🙌🏽", "🙌🏾", "🙌🏿", "🙌", "🙍🏻‍♀️", "🙍🏻‍♂️", "🙍🏻", "🙍🏼‍♀️", "🙍🏼‍♂️", "🙍🏼", "🙍🏽‍♀️", "🙍🏽‍♂️", "🙍🏽", "🙍🏾‍♀️", "🙍🏾‍♂️", "🙍🏾", "🙍🏿‍♀️", "🙍🏿‍♂️", "🙍🏿", "🙍‍♀️", "🙍‍♂️", "🙍", "🙎🏻‍♀️", "🙎🏻‍♂️", "🙎🏻", "🙎🏼‍♀️", "🙎🏼‍♂️", "🙎🏼", "🙎🏽‍♀️", "🙎🏽‍♂️", "🙎🏽", "🙎🏾‍♀️", "🙎🏾‍♂️", "🙎🏾", "🙎🏿‍♀️", "🙎🏿‍♂️", "🙎🏿", "🙎‍♀️", "🙎‍♂️", "🙎", "🙏🏻", "🙏🏼", "🙏🏽", "🙏🏾", "🙏🏿", "🙏", "🚀", "🚁", "🚂", "🚃", "🚄", "🚅", "🚆", "🚇", "🚈", "🚉", "🚊", "🚋", "🚌", "🚍", "🚎", "🚏", "🚐", "🚑", "🚒", "🚓", "🚔", "🚕", "🚖", "🚗", "🚘", "🚙", "🚚", "🚛", "🚜", "🚝", "🚞", "🚟", "🚠", "🚡", "🚢", "🚣🏻‍♀️", "🚣🏻‍♂️", "🚣🏻", "🚣🏼‍♀️", "🚣🏼‍♂️", "🚣🏼", "🚣🏽‍♀️", "🚣🏽‍♂️", "🚣🏽", "🚣🏾‍♀️", "🚣🏾‍♂️", "🚣🏾", "🚣🏿‍♀️", "🚣🏿‍♂️", "🚣🏿", "🚣‍♀️", "🚣‍♂️", "🚣", "🚤", "🚥", "🚦", "🚧", "🚨", "🚩", "🚪", "🚫", "🚬", "🚭", "🚮", "🚯", "🚰", "🚱", "🚲", "🚳", "🚴🏻‍♀️", "🚴🏻‍♂️", "🚴🏻", "🚴🏼‍♀️", "🚴🏼‍♂️", "🚴🏼", "🚴🏽‍♀️", "🚴🏽‍♂️", "🚴🏽", "🚴🏾‍♀️", "🚴🏾‍♂️", "🚴🏾", "🚴🏿‍♀️", "🚴🏿‍♂️", "🚴🏿", "🚴‍♀️", "🚴‍♂️", "🚴", "🚵🏻‍♀️", "🚵🏻‍♂️", "🚵🏻", "🚵🏼‍♀️", "🚵🏼‍♂️", "🚵🏼", "🚵🏽‍♀️", "🚵🏽‍♂️", "🚵🏽", "🚵🏾‍♀️", "🚵🏾‍♂️", "🚵🏾", "🚵🏿‍♀️", "🚵🏿‍♂️", "🚵🏿", "🚵‍♀️", "🚵‍♂️", "🚵", "🚶🏻‍♀️", "🚶🏻‍♂️", "🚶🏻", "🚶🏼‍♀️", "🚶🏼‍♂️", "🚶🏼", "🚶🏽‍♀️", "🚶🏽‍♂️", "🚶🏽", "🚶🏾‍♀️", "🚶🏾‍♂️", "🚶🏾", "🚶🏿‍♀️", "🚶🏿‍♂️", "🚶🏿", "🚶‍♀️", "🚶‍♂️", "🚶", "🚷", "🚸", "🚹", "🚺", "🚻", "🚼", "🚽", "🚾", "🚿", "🛀🏻", "🛀🏼", "🛀🏽", "🛀🏾", "🛀🏿", "🛀", "🛁", "🛂", "🛃", "🛄", "🛅", "🛋️", "🛌🏻", "🛌🏼", "🛌🏽", "🛌🏾", "🛌🏿", "🛌", "🛍️", "🛎️", "🛏️", "🛐", "🛑", "🛒", "🛕", "🛠️", "🛡️", "🛢️", "🛣️", "🛤️", "🛥️", "🛩️", "🛫", "🛬", "🛰️", "🛳️", "🛴", "🛵", "🛶", "🛷", "🛸", "🛹", "🛺", "🟠", "🟡", "🟢", "🟣", "🟤", "🟥", "🟦", "🟧", "🟨", "🟩", "🟪", "🟫", "🤍", "🤎", "🤏🏻", "🤏🏼", "🤏🏽", "🤏🏾", "🤏🏿", "🤏", "🤐", "🤑", "🤒", "🤓", "🤔", "🤕", "🤖", "🤗", "🤘🏻", "🤘🏼", "🤘🏽", "🤘🏾", "🤘🏿", "🤘", "🤙🏻", "🤙🏼", "🤙🏽", "🤙🏾", "🤙🏿", "🤙", "🤚🏻", "🤚🏼", "🤚🏽", "🤚🏾", "🤚🏿", "🤚", "🤛🏻", "🤛🏼", "🤛🏽", "🤛🏾", "🤛🏿", "🤛", "🤜🏻", "🤜🏼", "🤜🏽", "🤜🏾", "🤜🏿", "🤜", "🤝", "🤞🏻", "🤞🏼", "🤞🏽", "🤞🏾", "🤞🏿", "🤞", "🤟🏻", "🤟🏼", "🤟🏽", "🤟🏾", "🤟🏿", "🤟", "🤠", "🤡", "🤢", "🤣", "🤤", "🤥", "🤦🏻‍♀️", "🤦🏻‍♂️", "🤦🏻", "🤦🏼‍♀️", "🤦🏼‍♂️", "🤦🏼", "🤦🏽‍♀️", "🤦🏽‍♂️", "🤦🏽", "🤦🏾‍♀️", "🤦🏾‍♂️", "🤦🏾", "🤦🏿‍♀️", "🤦🏿‍♂️", "🤦🏿", "🤦‍♀️", "🤦‍♂️", "🤦", "🤧", "🤨", "🤩", "🤪", "🤫", "🤬", "🤭", "🤮", "🤯", "🤰🏻", "🤰🏼", "🤰🏽", "🤰🏾", "🤰🏿", "🤰", "🤱🏻", "🤱🏼", "🤱🏽", "🤱🏾", "🤱🏿", "🤱", "🤲🏻", "🤲🏼", "🤲🏽", "🤲🏾", "🤲🏿", "🤲", "🤳🏻", "🤳🏼", "🤳🏽", "🤳🏾", "🤳🏿", "🤳", "🤴🏻", "🤴🏼", "🤴🏽", "🤴🏾", "🤴🏿", "🤴", "🤵🏻‍♀️", "🤵🏻‍♂️", "🤵🏻", "🤵🏼‍♀️", "🤵🏼‍♂️", "🤵🏼", "🤵🏽‍♀️", "🤵🏽‍♂️", "🤵🏽", "🤵🏾‍♀️", "🤵🏾‍♂️", "🤵🏾", "🤵🏿‍♀️", "🤵🏿‍♂️", "🤵🏿", "🤵‍♀️", "🤵‍♂️", "🤵", "🤶🏻", "🤶🏼", "🤶🏽", "🤶🏾", "🤶🏿", "🤶", "🤷🏻‍♀️", "🤷🏻‍♂️", "🤷🏻", "🤷🏼‍♀️", "🤷🏼‍♂️", "🤷🏼", "🤷🏽‍♀️", "🤷🏽‍♂️", "🤷🏽", "🤷🏾‍♀️", "🤷🏾‍♂️", "🤷🏾", "🤷🏿‍♀️", "🤷🏿‍♂️", "🤷🏿", "🤷‍♀️", "🤷‍♂️", "🤷", "🤸🏻‍♀️", "🤸🏻‍♂️", "🤸🏻", "🤸🏼‍♀️", "🤸🏼‍♂️", "🤸🏼", "🤸🏽‍♀️", "🤸🏽‍♂️", "🤸🏽", "🤸🏾‍♀️", "🤸🏾‍♂️", "🤸🏾", "🤸🏿‍♀️", "🤸🏿‍♂️", "🤸🏿", "🤸‍♀️", "🤸‍♂️", "🤸", "🤹🏻‍♀️", "🤹🏻‍♂️", "🤹🏻", "🤹🏼‍♀️", "🤹🏼‍♂️", "🤹🏼", "🤹🏽‍♀️", "🤹🏽‍♂️", "🤹🏽", "🤹🏾‍♀️", "🤹🏾‍♂️", "🤹🏾", "🤹🏿‍♀️", "🤹🏿‍♂️", "🤹🏿", "🤹‍♀️", "🤹‍♂️", "🤹", "🤺", "🤼‍♀️", "🤼‍♂️", "🤼", "🤽🏻‍♀️", "🤽🏻‍♂️", "🤽🏻", "🤽🏼‍♀️", "🤽🏼‍♂️", "🤽🏼", "🤽🏽‍♀️", "🤽🏽‍♂️", "🤽🏽", "🤽🏾‍♀️", "🤽🏾‍♂️", "🤽🏾", "🤽🏿‍♀️", "🤽🏿‍♂️", "🤽🏿", "🤽‍♀️", "🤽‍♂️", "🤽", "🤾🏻‍♀️", "🤾🏻‍♂️", "🤾🏻", "🤾🏼‍♀️", "🤾🏼‍♂️", "🤾🏼", "🤾🏽‍♀️", "🤾🏽‍♂️", "🤾🏽", "🤾🏾‍♀️", "🤾🏾‍♂️", "🤾🏾", "🤾🏿‍♀️", "🤾🏿‍♂️", "🤾🏿", "🤾‍♀️", "🤾‍♂️", "🤾", "🤿", "🥀", "🥁", "🥂", "🥃", "🥄", "🥅", "🥇", "🥈", "🥉", "🥊", "🥋", "🥌", "🥍", "🥎", "🥏", "🥐", "🥑", "🥒", "🥓", "🥔", "🥕", "🥖", "🥗", "🥘", "🥙", "🥚", "🥛", "🥜", "🥝", "🥞", "🥟", "🥠", "🥡", "🥢", "🥣", "🥤", "🥥", "🥦", "🥧", "🥨", "🥩", "🥪", "🥫", "🥬", "🥭", "🥮", "🥯", "🥰", "🥱", "🥳", "🥴", "🥵", "🥶", "🥺", "🥻", "🥼", "🥽", "🥾", "🥿", "🦀", "🦁", "🦂", "🦃", "🦄", "🦅", "🦆", "🦇", "🦈", "🦉", "🦊", "🦋", "🦌", "🦍", "🦎", "🦏", "🦐", "🦑", "🦒", "🦓", "🦔", "🦕", "🦖", "🦗", "🦘", "🦙", "🦚", "🦛", "🦜", "🦝", "🦞", "🦟", "🦠", "🦡", "🦢", "🦥", "🦦", "🦧", "🦨", "🦩", "🦪", "🦮", "🦯", "🦰", "🦱", "🦲", "🦳", "🦴", "🦵🏻", "🦵🏼", "🦵🏽", "🦵🏾", "🦵🏿", "🦵", "🦶🏻", "🦶🏼", "🦶🏽", "🦶🏾", "🦶🏿", "🦶", "🦷", "🦸🏻‍♀️", "🦸🏻‍♂️", "🦸🏻", "🦸🏼‍♀️", "🦸🏼‍♂️", "🦸🏼", "🦸🏽‍♀️", "🦸🏽‍♂️", "🦸🏽", "🦸🏾‍♀️", "🦸🏾‍♂️", "🦸🏾", "🦸🏿‍♀️", "🦸🏿‍♂️", "🦸🏿", "🦸‍♀️", "🦸‍♂️", "🦸", "🦹🏻‍♀️", "🦹🏻‍♂️", "🦹🏻", "🦹🏼‍♀️", "🦹🏼‍♂️", "🦹🏼", "🦹🏽‍♀️", "🦹🏽‍♂️", "🦹🏽", "🦹🏾‍♀️", "🦹🏾‍♂️", "🦹🏾", "🦹🏿‍♀️", "🦹🏿‍♂️", "🦹🏿", "🦹‍♀️", "🦹‍♂️", "🦹", "🦺", "🦻🏻", "🦻🏼", "🦻🏽", "🦻🏾", "🦻🏿", "🦻", "🦼", "🦽", "🦾", "🦿", "🧀", "🧁", "🧂", "🧃", "🧄", "🧅", "🧆", "🧇", "🧈", "🧉", "🧊", "🧍🏻‍♀️", "🧍🏻‍♂️", "🧍🏻", "🧍🏼‍♀️", "🧍🏼‍♂️", "🧍🏼", "🧍🏽‍♀️", "🧍🏽‍♂️", "🧍🏽", "🧍🏾‍♀️", "🧍🏾‍♂️", "🧍🏾", "🧍🏿‍♀️", "🧍🏿‍♂️", "🧍🏿", "🧍‍♀️", "🧍‍♂️", "🧍", "🧎🏻‍♀️", "🧎🏻‍♂️", "🧎🏻", "🧎🏼‍♀️", "🧎🏼‍♂️", "🧎🏼", "🧎🏽‍♀️", "🧎🏽‍♂️", "🧎🏽", "🧎🏾‍♀️", "🧎🏾‍♂️", "🧎🏾", "🧎🏿‍♀️", "🧎🏿‍♂️", "🧎🏿", "🧎‍♀️", "🧎‍♂️", "🧎", "🧏🏻‍♀️", "🧏🏻‍♂️", "🧏🏻", "🧏🏼‍♀️", "🧏🏼‍♂️", "🧏🏼", "🧏🏽‍♀️", "🧏🏽‍♂️", "🧏🏽", "🧏🏾‍♀️", "🧏🏾‍♂️", "🧏🏾", "🧏🏿‍♀️", "🧏🏿‍♂️", "🧏🏿", "🧏‍♀️", "🧏‍♂️", "🧏", "🧐", "🧑🏻‍🤝‍🧑🏻", "🧑🏻", "🧑🏼‍🤝‍🧑🏻", "🧑🏼‍🤝‍🧑🏼", "🧑🏼", "🧑🏽‍🤝‍🧑🏻", "🧑🏽‍🤝‍🧑🏼", "🧑🏽‍🤝‍🧑🏽", "🧑🏽", "🧑🏾‍🤝‍🧑🏻", "🧑🏾‍🤝‍🧑🏼", "🧑🏾‍🤝‍🧑🏽", "🧑🏾‍🤝‍🧑🏾", "🧑🏾", "🧑🏿‍🤝‍🧑🏻", "🧑🏿‍🤝‍🧑🏼", "🧑🏿‍🤝‍🧑🏽", "🧑🏿‍🤝‍🧑🏾", "🧑🏿‍🤝‍🧑🏿", "🧑🏿", "🧑‍🤝‍🧑", "🧑", "🧒🏻", "🧒🏼", "🧒🏽", "🧒🏾", "🧒🏿", "🧒", "🧓🏻", "🧓🏼", "🧓🏽", "🧓🏾", "🧓🏿", "🧓", "🧔🏻", "🧔🏼", "🧔🏽", "🧔🏾", "🧔🏿", "🧔", "🧕🏻", "🧕🏼", "🧕🏽", "🧕🏾", "🧕🏿", "🧕", "🧖🏻‍♀️", "🧖🏻‍♂️", "🧖🏻", "🧖🏼‍♀️", "🧖🏼‍♂️", "🧖🏼", "🧖🏽‍♀️", "🧖🏽‍♂️", "🧖🏽", "🧖🏾‍♀️", "🧖🏾‍♂️", "🧖🏾", "🧖🏿‍♀️", "🧖🏿‍♂️", "🧖🏿", "🧖‍♀️", "🧖‍♂️", "🧖", "🧗🏻‍♀️", "🧗🏻‍♂️", "🧗🏻", "🧗🏼‍♀️", "🧗🏼‍♂️", "🧗🏼", "🧗🏽‍♀️", "🧗🏽‍♂️", "🧗🏽", "🧗🏾‍♀️", "🧗🏾‍♂️", "🧗🏾", "🧗🏿‍♀️", "🧗🏿‍♂️", "🧗🏿", "🧗‍♀️", "🧗‍♂️", "🧗", "🧘🏻‍♀️", "🧘🏻‍♂️", "🧘🏻", "🧘🏼‍♀️", "🧘🏼‍♂️", "🧘🏼", "🧘🏽‍♀️", "🧘🏽‍♂️", "🧘🏽", "🧘🏾‍♀️", "🧘🏾‍♂️", "🧘🏾", "🧘🏿‍♀️", "🧘🏿‍♂️", "🧘🏿", "🧘‍♀️", "🧘‍♂️", "🧘", "🧙🏻‍♀️", "🧙🏻‍♂️", "🧙🏻", "🧙🏼‍♀️", "🧙🏼‍♂️", "🧙🏼", "🧙🏽‍♀️", "🧙🏽‍♂️", "🧙🏽", "🧙🏾‍♀️", "🧙🏾‍♂️", "🧙🏾", "🧙🏿‍♀️", "🧙🏿‍♂️", "🧙🏿", "🧙‍♀️", "🧙‍♂️", "🧙", "🧚🏻‍♀️", "🧚🏻‍♂️", "🧚🏻", "🧚🏼‍♀️", "🧚🏼‍♂️", "🧚🏼", "🧚🏽‍♀️", "🧚🏽‍♂️", "🧚🏽", "🧚🏾‍♀️", "🧚🏾‍♂️", "🧚🏾", "🧚🏿‍♀️", "🧚🏿‍♂️", "🧚🏿", "🧚‍♀️", "🧚‍♂️", "🧚", "🧛🏻‍♀️", "🧛🏻‍♂️", "🧛🏻", "🧛🏼‍♀️", "🧛🏼‍♂️", "🧛🏼", "🧛🏽‍♀️", "🧛🏽‍♂️", "🧛🏽", "🧛🏾‍♀️", "🧛🏾‍♂️", "🧛🏾", "🧛🏿‍♀️", "🧛🏿‍♂️", "🧛🏿", "🧛‍♀️", "🧛‍♂️", "🧛", "🧜🏻‍♀️", "🧜🏻‍♂️", "🧜🏻", "🧜🏼‍♀️", "🧜🏼‍♂️", "🧜🏼", "🧜🏽‍♀️", "🧜🏽‍♂️", "🧜🏽", "🧜🏾‍♀️", "🧜🏾‍♂️", "🧜🏾", "🧜🏿‍♀️", "🧜🏿‍♂️", "🧜🏿", "🧜‍♀️", "🧜‍♂️", "🧜", "🧝🏻‍♀️", "🧝🏻‍♂️", "🧝🏻", "🧝🏼‍♀️", "🧝🏼‍♂️", "🧝🏼", "🧝🏽‍♀️", "🧝🏽‍♂️", "🧝🏽", "🧝🏾‍♀️", "🧝🏾‍♂️", "🧝🏾", "🧝🏿‍♀️", "🧝🏿‍♂️", "🧝🏿", "🧝‍♀️", "🧝‍♂️", "🧝", "🧞‍♀️", "🧞‍♂️", "🧞", "🧟‍♀️", "🧟‍♂️", "🧟", "🧠", "🧡", "🧢", "🧣", "🧤", "🧥", "🧦", "🧧", "🧨", "🧩", "🧪", "🧫", "🧬", "🧭", "🧮", "🧯", "🧰", "🧱", "🧲", "🧳", "🧴", "🧵", "🧶", "🧷", "🧸", "🧹", "🧺", "🧻", "🧼", "🧽", "🧾", "🧿", "🩰", "🩱", "🩲", "🩳", "🩸", "🩹", "🩺", "🪀", "🪁", "🪂", "🪐", "🪑", "🪒", "🪓", "🪔", "🪕", "‼️", "⁉️", "™️", "ℹ️", "↔️", "↕️", "↖️", "↗️", "↘️", "↙️", "↩️", "↪️", "#⃣", "⌚️", "⌛️", "⌨️", "⏏️", "⏩", "⏪", "⏫", "⏬", "⏭️", "⏮️", "⏯️", "⏰", "⏱️", "⏲️", "⏳", "⏸️", "⏹️", "⏺️", "Ⓜ️", "▪️", "▫️", "▶️", "◀️", "◻️", "◼️", "◽️", "◾️", "☀️", "☁️", "☂️", "☃️", "☄️", "☎️", "☑️", "☔️", "☕️", "☘️", "☝🏻", "☝🏼", "☝🏽", "☝🏾", "☝🏿", "☝️", "☠️", "☢️", "☣️", "☦️", "☪️", "☮️", "☯️", "☸️", "☹️", "☺️", "♀️", "♂️", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "♟️", "♠️", "♣️", "♥️", "♦️", "♨️", "♻️", "♾", "♿️", "⚒️", "⚓️", "⚔️", "⚕️", "⚖️", "⚗️", "⚙️", "⚛️", "⚜️", "⚠️", "⚡️", "⚪️", "⚫️", "⚰️", "⚱️", "⚽️", "⚾️", "⛄️", "⛅️", "⛈️", "⛎", "⛏️", "⛑️", "⛓️", "⛔️", "⛩️", "⛪️", "⛰️", "⛱️", "⛲️", "⛳️", "⛴️", "⛵️", "⛷🏻", "⛷🏼", "⛷🏽", "⛷🏾", "⛷🏿", "⛷️", "⛸️", "⛹🏻‍♀️", "⛹🏻‍♂️", "⛹🏻", "⛹🏼‍♀️", "⛹🏼‍♂️", "⛹🏼", "⛹🏽‍♀️", "⛹🏽‍♂️", "⛹🏽", "⛹🏾‍♀️", "⛹🏾‍♂️", "⛹🏾", "⛹🏿‍♀️", "⛹🏿‍♂️", "⛹🏿", "⛹️‍♀️", "⛹️‍♂️", "⛹️", "⛺️", "⛽️", "✂️", "✅", "✈️", "✉️", "✊🏻", "✊🏼", "✊🏽", "✊🏾", "✊🏿", "✊", "✋🏻", "✋🏼", "✋🏽", "✋🏾", "✋🏿", "✋", "✌🏻", "✌🏼", "✌🏽", "✌🏾", "✌🏿", "✌️", "✍🏻", "✍🏼", "✍🏽", "✍🏾", "✍🏿", "✍️", "✏️", "✒️", "✔️", "✖️", "✝️", "✡️", "✨", "✳️", "✴️", "❄️", "❇️", "❌", "❎", "❓", "❔", "❕", "❗️", "❣️", "❤️", "➕", "➖", "➗", "➡️", "➰", "➿", "⤴️", "⤵️", "*⃣", "⬅️", "⬆️", "⬇️", "⬛️", "⬜️", "⭐️", "⭕️", "0⃣", "〰️", "〽️", "1⃣", "2⃣", "㊗️", "㊙️", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "©️", "®️", "" ];
}, function(module, exports, __webpack_require__) {
  "use strict";
  const ResolverFactory = __webpack_require__(71), NodeJsInputFileSystem = __webpack_require__(107), CachedInputFileSystem = __webpack_require__(115), nodeFileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem, 4e3), nodeContext = {
    environments: [ "node+es3+es5+process+native" ]
  }, asyncResolver = ResolverFactory.createResolver({
    extensions: [ ".js", ".json", ".node" ],
    fileSystem: nodeFileSystem
  });
  module.exports = function(context, path, request, resolveContext, callback) {
    "string" == typeof context && (callback = resolveContext, resolveContext = request, 
    request = path, path = context, context = nodeContext), "function" != typeof callback && (callback = resolveContext), 
    asyncResolver.resolve(context, path, request, resolveContext, callback);
  };
  const syncResolver = ResolverFactory.createResolver({
    extensions: [ ".js", ".json", ".node" ],
    useSyncFileSystemCalls: !0,
    fileSystem: nodeFileSystem
  });
  module.exports.sync = function(context, path, request) {
    return "string" == typeof context && (request = path, path = context, context = nodeContext), 
    syncResolver.resolveSync(context, path, request);
  };
  const asyncContextResolver = ResolverFactory.createResolver({
    extensions: [ ".js", ".json", ".node" ],
    resolveToContext: !0,
    fileSystem: nodeFileSystem
  });
  module.exports.context = function(context, path, request, resolveContext, callback) {
    "string" == typeof context && (callback = resolveContext, resolveContext = request, 
    request = path, path = context, context = nodeContext), "function" != typeof callback && (callback = resolveContext), 
    asyncContextResolver.resolve(context, path, request, resolveContext, callback);
  };
  const syncContextResolver = ResolverFactory.createResolver({
    extensions: [ ".js", ".json", ".node" ],
    resolveToContext: !0,
    useSyncFileSystemCalls: !0,
    fileSystem: nodeFileSystem
  });
  module.exports.context.sync = function(context, path, request) {
    return "string" == typeof context && (request = path, path = context, context = nodeContext), 
    syncContextResolver.resolveSync(context, path, request);
  };
  const asyncLoaderResolver = ResolverFactory.createResolver({
    extensions: [ ".js", ".json", ".node" ],
    moduleExtensions: [ "-loader" ],
    mainFields: [ "loader", "main" ],
    fileSystem: nodeFileSystem
  });
  module.exports.loader = function(context, path, request, resolveContext, callback) {
    "string" == typeof context && (callback = resolveContext, resolveContext = request, 
    request = path, path = context, context = nodeContext), "function" != typeof callback && (callback = resolveContext), 
    asyncLoaderResolver.resolve(context, path, request, resolveContext, callback);
  };
  const syncLoaderResolver = ResolverFactory.createResolver({
    extensions: [ ".js", ".json", ".node" ],
    moduleExtensions: [ "-loader" ],
    mainFields: [ "loader", "main" ],
    useSyncFileSystemCalls: !0,
    fileSystem: nodeFileSystem
  });
  module.exports.loader.sync = function(context, path, request) {
    return "string" == typeof context && (request = path, path = context, context = nodeContext), 
    syncLoaderResolver.resolveSync(context, path, request);
  }, module.exports.create = function(options) {
    options = Object.assign({
      fileSystem: nodeFileSystem
    }, options);
    const resolver = ResolverFactory.createResolver(options);
    return function(context, path, request, resolveContext, callback) {
      "string" == typeof context && (callback = resolveContext, resolveContext = request, 
      request = path, path = context, context = nodeContext), "function" != typeof callback && (callback = resolveContext), 
      resolver.resolve(context, path, request, resolveContext, callback);
    };
  }, module.exports.create.sync = function(options) {
    options = Object.assign({
      useSyncFileSystemCalls: !0,
      fileSystem: nodeFileSystem
    }, options);
    const resolver = ResolverFactory.createResolver(options);
    return function(context, path, request) {
      return "string" == typeof context && (request = path, path = context, context = nodeContext), 
      resolver.resolveSync(context, path, request);
    };
  }, module.exports.ResolverFactory = ResolverFactory, module.exports.NodeJsInputFileSystem = NodeJsInputFileSystem, 
  module.exports.CachedInputFileSystem = CachedInputFileSystem;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const Resolver = __webpack_require__(72), SyncAsyncFileSystemDecorator = __webpack_require__(80), ParsePlugin = __webpack_require__(81), DescriptionFilePlugin = __webpack_require__(82), NextPlugin = __webpack_require__(83), TryNextPlugin = __webpack_require__(84), ModuleKindPlugin = __webpack_require__(85), FileKindPlugin = __webpack_require__(86), JoinRequestPlugin = __webpack_require__(87), ModulesInHierachicDirectoriesPlugin = __webpack_require__(88), ModulesInRootPlugin = __webpack_require__(89), AliasPlugin = __webpack_require__(90), AliasFieldPlugin = __webpack_require__(91), ConcordExtensionsPlugin = __webpack_require__(92), ConcordMainPlugin = __webpack_require__(94), ConcordModulesPlugin = __webpack_require__(95), DirectoryExistsPlugin = __webpack_require__(96), FileExistsPlugin = __webpack_require__(97), SymlinkPlugin = __webpack_require__(98), MainFieldPlugin = __webpack_require__(99), UseFilePlugin = __webpack_require__(100), AppendPlugin = __webpack_require__(101), RootPlugin = __webpack_require__(102), RestrictionsPlugin = __webpack_require__(103), ResultPlugin = __webpack_require__(104), ModuleAppendPlugin = __webpack_require__(105), UnsafeCachePlugin = __webpack_require__(106);
  exports.createResolver = function(options) {
    let modules = options.modules || [ "node_modules" ];
    const descriptionFiles = options.descriptionFiles || [ "package.json" ], plugins = options.plugins && options.plugins.slice() || [];
    let mainFields = options.mainFields || [ "main" ];
    const aliasFields = options.aliasFields || [], mainFiles = options.mainFiles || [ "index" ];
    let extensions = options.extensions || [ ".js", ".json", ".node" ];
    const enforceExtension = options.enforceExtension || !1;
    let moduleExtensions = options.moduleExtensions || [];
    const enforceModuleExtension = options.enforceModuleExtension || !1;
    let alias = options.alias || [];
    const symlinks = void 0 === options.symlinks || options.symlinks, resolveToContext = options.resolveToContext || !1, roots = options.roots || [], ignoreRootsErrors = options.ignoreRootsErrors || !1, preferAbsolute = options.preferAbsolute || !1, restrictions = options.restrictions || [];
    let unsafeCache = options.unsafeCache || !1;
    const cacheWithContext = void 0 === options.cacheWithContext || options.cacheWithContext, enableConcord = options.concord || !1, cachePredicate = options.cachePredicate || function() {
      return !0;
    }, fileSystem = options.fileSystem, useSyncFileSystemCalls = options.useSyncFileSystemCalls;
    let resolver = options.resolver;
    var array, filter;
    return resolver || (resolver = new Resolver(useSyncFileSystemCalls ? new SyncAsyncFileSystemDecorator(fileSystem) : fileSystem)), 
    extensions = [].concat(extensions), moduleExtensions = [].concat(moduleExtensions), 
    array = [].concat(modules), filter = item => !/^[A-Z]:|^\//.test(item), modules = array.reduce((array, item) => {
      if (filter(item)) {
        const lastElement = array[array.length - 1];
        return Array.isArray(lastElement) ? lastElement.push(item) : array.push([ item ]), 
        array;
      }
      return array.push(item), array;
    }, []), mainFields = mainFields.map(item => (("string" == typeof item || Array.isArray(item)) && (item = {
      name: item,
      forceRelative: !0
    }), item)), "object" != typeof alias || Array.isArray(alias) || (alias = Object.keys(alias).map(key => {
      let onlyModule = !1, obj = alias[key];
      return /\$$/.test(key) && (onlyModule = !0, key = key.substr(0, key.length - 1)), 
      "string" == typeof obj && (obj = {
        alias: obj
      }), obj = Object.assign({
        name: key,
        onlyModule: onlyModule
      }, obj), obj;
    })), unsafeCache && "object" != typeof unsafeCache && (unsafeCache = {}), resolver.ensureHook("resolve"), 
    resolver.ensureHook("parsedResolve"), resolver.ensureHook("describedResolve"), resolver.ensureHook("rawModule"), 
    resolver.ensureHook("module"), resolver.ensureHook("relative"), resolver.ensureHook("describedRelative"), 
    resolver.ensureHook("directory"), resolver.ensureHook("existingDirectory"), resolver.ensureHook("undescribedRawFile"), 
    resolver.ensureHook("rawFile"), resolver.ensureHook("file"), resolver.ensureHook("existingFile"), 
    resolver.ensureHook("resolved"), unsafeCache ? (plugins.push(new UnsafeCachePlugin("resolve", cachePredicate, unsafeCache, cacheWithContext, "new-resolve")), 
    plugins.push(new ParsePlugin("new-resolve", "parsed-resolve"))) : plugins.push(new ParsePlugin("resolve", "parsed-resolve")), 
    plugins.push(new DescriptionFilePlugin("parsed-resolve", descriptionFiles, "described-resolve")), 
    plugins.push(new NextPlugin("after-parsed-resolve", "described-resolve")), alias.length > 0 && plugins.push(new AliasPlugin("described-resolve", alias, "resolve")), 
    enableConcord && plugins.push(new ConcordModulesPlugin("described-resolve", {}, "resolve")), 
    aliasFields.forEach(item => {
      plugins.push(new AliasFieldPlugin("described-resolve", item, "resolve"));
    }), plugins.push(new ModuleKindPlugin("after-described-resolve", "raw-module")), 
    preferAbsolute && plugins.push(new JoinRequestPlugin("after-described-resolve", "relative")), 
    roots.forEach(root => {
      plugins.push(new RootPlugin("after-described-resolve", root, "relative", ignoreRootsErrors));
    }), preferAbsolute || plugins.push(new JoinRequestPlugin("after-described-resolve", "relative")), 
    moduleExtensions.forEach(item => {
      plugins.push(new ModuleAppendPlugin("raw-module", item, "module"));
    }), enforceModuleExtension || plugins.push(new TryNextPlugin("raw-module", null, "module")), 
    modules.forEach(item => {
      Array.isArray(item) ? plugins.push(new ModulesInHierachicDirectoriesPlugin("module", item, "resolve")) : plugins.push(new ModulesInRootPlugin("module", item, "resolve"));
    }), plugins.push(new DescriptionFilePlugin("relative", descriptionFiles, "described-relative")), 
    plugins.push(new NextPlugin("after-relative", "described-relative")), plugins.push(new FileKindPlugin("described-relative", "raw-file")), 
    plugins.push(new TryNextPlugin("described-relative", "as directory", "directory")), 
    plugins.push(new DirectoryExistsPlugin("directory", "existing-directory")), resolveToContext ? plugins.push(new NextPlugin("existing-directory", "resolved")) : (enableConcord && plugins.push(new ConcordMainPlugin("existing-directory", {}, "resolve")), 
    mainFields.forEach(item => {
      plugins.push(new MainFieldPlugin("existing-directory", item, "resolve"));
    }), mainFiles.forEach(item => {
      plugins.push(new UseFilePlugin("existing-directory", item, "undescribed-raw-file"));
    }), plugins.push(new DescriptionFilePlugin("undescribed-raw-file", descriptionFiles, "raw-file")), 
    plugins.push(new NextPlugin("after-undescribed-raw-file", "raw-file")), enforceExtension || plugins.push(new TryNextPlugin("raw-file", "no extension", "file")), 
    enableConcord && plugins.push(new ConcordExtensionsPlugin("raw-file", {}, "file")), 
    extensions.forEach(item => {
      plugins.push(new AppendPlugin("raw-file", item, "file"));
    }), alias.length > 0 && plugins.push(new AliasPlugin("file", alias, "resolve")), 
    enableConcord && plugins.push(new ConcordModulesPlugin("file", {}, "resolve")), 
    aliasFields.forEach(item => {
      plugins.push(new AliasFieldPlugin("file", item, "resolve"));
    }), symlinks && plugins.push(new SymlinkPlugin("file", "relative")), plugins.push(new FileExistsPlugin("file", "existing-file")), 
    plugins.push(new NextPlugin("existing-file", "resolved"))), restrictions.length > 0 && plugins.push(new RestrictionsPlugin(resolver.hooks.resolved, restrictions)), 
    plugins.push(new ResultPlugin(resolver.hooks.resolved)), plugins.forEach(plugin => {
      plugin.apply(resolver);
    }), resolver;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const util = __webpack_require__(11), Tapable = __webpack_require__(73), SyncHook = __webpack_require__(75), AsyncSeriesBailHook = __webpack_require__(76), AsyncSeriesHook = __webpack_require__(77), createInnerContext = __webpack_require__(78), REGEXP_NOT_MODULE = /^\.$|^\.[\\/]|^\.\.$|^\.\.[\\/]|^\/|^[A-Z]:[\\/]/i, REGEXP_DIRECTORY = /[\\/]$/i, memoryFsJoin = __webpack_require__(79), memoizedJoin = new Map, memoryFsNormalize = __webpack_require__(19);
  function withName(name, hook) {
    return hook.name = name, hook;
  }
  function toCamelCase(str) {
    return str.replace(/-([a-z])/g, str => str.substr(1).toUpperCase());
  }
  const deprecatedPushToMissing = util.deprecate((set, item) => {
    set.add(item);
  }, "Resolver: 'missing' is now a Set. Use add instead of push."), deprecatedResolveContextInCallback = util.deprecate(x => x, "Resolver: The callback argument was splitted into resolveContext and callback."), deprecatedHookAsString = util.deprecate(x => x, "Resolver#doResolve: The type arguments (string) is now a hook argument (Hook). Pass a reference to the hook instead.");
  module.exports = class extends Tapable {
    constructor(fileSystem) {
      super(), this.fileSystem = fileSystem, this.hooks = {
        resolveStep: withName("resolveStep", new SyncHook([ "hook", "request" ])),
        noResolve: withName("noResolve", new SyncHook([ "request", "error" ])),
        resolve: withName("resolve", new AsyncSeriesBailHook([ "request", "resolveContext" ])),
        result: new AsyncSeriesHook([ "result", "resolveContext" ])
      }, this._pluginCompat.tap("Resolver: before/after", options => {
        /^before-/.test(options.name) ? (options.name = options.name.substr(7), options.stage = -10) : /^after-/.test(options.name) && (options.name = options.name.substr(6), 
        options.stage = 10);
      }), this._pluginCompat.tap("Resolver: step hooks", options => {
        const name = options.name;
        if (!/^resolve(-s|S)tep$|^no(-r|R)esolve$/.test(name)) {
          options.async = !0, this.ensureHook(name);
          const fn = options.fn;
          options.fn = (request, resolverContext, callback) => {
            const innerCallback = (err, result) => err ? callback(err) : void 0 !== result ? callback(null, result) : void callback();
            for (const key in resolverContext) innerCallback[key] = resolverContext[key];
            fn.call(this, request, innerCallback);
          };
        }
      });
    }
    ensureHook(name) {
      if ("string" != typeof name) return name;
      if (name = toCamelCase(name), /^before/.test(name)) return this.ensureHook(name[6].toLowerCase() + name.substr(7)).withOptions({
        stage: -10
      });
      if (/^after/.test(name)) return this.ensureHook(name[5].toLowerCase() + name.substr(6)).withOptions({
        stage: 10
      });
      const hook = this.hooks[name];
      return hook || (this.hooks[name] = withName(name, new AsyncSeriesBailHook([ "request", "resolveContext" ])));
    }
    getHook(name) {
      if ("string" != typeof name) return name;
      if (name = toCamelCase(name), /^before/.test(name)) return this.getHook(name[6].toLowerCase() + name.substr(7)).withOptions({
        stage: -10
      });
      if (/^after/.test(name)) return this.getHook(name[5].toLowerCase() + name.substr(6)).withOptions({
        stage: 10
      });
      const hook = this.hooks[name];
      if (!hook) throw new Error(`Hook ${name} doesn't exist`);
      return hook;
    }
    resolveSync(context, path, request) {
      let err, result, sync = !1;
      if (this.resolve(context, path, request, {}, (e, r) => {
        err = e, result = r, sync = !0;
      }), !sync) throw new Error("Cannot 'resolveSync' because the fileSystem is not sync. Use 'resolve'!");
      if (err) throw err;
      return result;
    }
    resolve(context, path, request, resolveContext, callback) {
      "function" != typeof callback && (callback = deprecatedResolveContextInCallback(resolveContext));
      const obj = {
        context: context,
        path: path,
        request: request
      }, message = "resolve '" + request + "' in '" + path + "'";
      return this.doResolve(this.hooks.resolve, obj, message, {
        missing: resolveContext.missing,
        stack: resolveContext.stack
      }, (err, result) => {
        if (!err && result) return callback(null, !1 !== result.path && result.path + (result.query || ""), result);
        const localMissing = new Set;
        localMissing.push = item => deprecatedPushToMissing(localMissing, item);
        const log = [];
        return this.doResolve(this.hooks.resolve, obj, message, {
          log: msg => {
            resolveContext.log && resolveContext.log(msg), log.push(msg);
          },
          missing: localMissing,
          stack: resolveContext.stack
        }, (err, result) => {
          if (err) return callback(err);
          const error = new Error("Can't " + message);
          return error.details = log.join("\n"), error.missing = Array.from(localMissing), 
          this.hooks.noResolve.call(obj, error), callback(error);
        });
      });
    }
    doResolve(hook, request, message, resolveContext, callback) {
      if ("function" != typeof callback && (callback = deprecatedResolveContextInCallback(resolveContext)), 
      "string" == typeof hook) {
        const name = toCamelCase(hook);
        if (!(hook = deprecatedHookAsString(this.hooks[name]))) throw new Error(`Hook "${name}" doesn't exist`);
      }
      if ("function" != typeof callback) throw new Error("callback is not a function " + Array.from(arguments));
      if (!resolveContext) throw new Error("resolveContext is not an object " + Array.from(arguments));
      const stackLine = hook.name + ": (" + request.path + ") " + (request.request || "") + (request.query || "") + (request.directory ? " directory" : "") + (request.module ? " module" : "");
      let newStack;
      if (resolveContext.stack) {
        if (newStack = new Set(resolveContext.stack), resolveContext.stack.has(stackLine)) {
          const recursionError = new Error("Recursion in resolving\nStack:\n  " + Array.from(newStack).join("\n  "));
          return recursionError.recursion = !0, resolveContext.log && resolveContext.log("abort resolving because of recursion"), 
          callback(recursionError);
        }
        newStack.add(stackLine);
      } else newStack = new Set([ stackLine ]);
      if (this.hooks.resolveStep.call(hook, request), hook.isUsed()) {
        const innerContext = createInnerContext({
          log: resolveContext.log,
          missing: resolveContext.missing,
          stack: newStack
        }, message);
        return hook.callAsync(request, innerContext, (err, result) => err ? callback(err) : result ? callback(null, result) : void callback());
      }
      callback();
    }
    parse(identifier) {
      if ("" === identifier) return null;
      const part = {
        request: "",
        query: "",
        module: !1,
        directory: !1,
        file: !1
      }, idxQuery = identifier.indexOf("?");
      return 0 === idxQuery ? part.query = identifier : idxQuery > 0 ? (part.request = identifier.slice(0, idxQuery), 
      part.query = identifier.slice(idxQuery)) : part.request = identifier, part.request && (part.module = this.isModule(part.request), 
      part.directory = this.isDirectory(part.request), part.directory && (part.request = part.request.substr(0, part.request.length - 1))), 
      part;
    }
    isModule(path) {
      return !REGEXP_NOT_MODULE.test(path);
    }
    isDirectory(path) {
      return REGEXP_DIRECTORY.test(path);
    }
    join(path, request) {
      let cacheEntry, pathCache = memoizedJoin.get(path);
      if (void 0 === pathCache) memoizedJoin.set(path, pathCache = new Map); else if (cacheEntry = pathCache.get(request), 
      void 0 !== cacheEntry) return cacheEntry;
      return cacheEntry = memoryFsJoin(path, request), pathCache.set(request, cacheEntry), 
      cacheEntry;
    }
    normalize(path) {
      return memoryFsNormalize(path);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const util = __webpack_require__(11), SyncBailHook = __webpack_require__(74);
  function Tapable() {
    this._pluginCompat = new SyncBailHook([ "options" ]), this._pluginCompat.tap({
      name: "Tapable camelCase",
      stage: 100
    }, options => {
      options.names.add(options.name.replace(/[- ]([a-z])/g, (str, ch) => ch.toUpperCase()));
    }), this._pluginCompat.tap({
      name: "Tapable this.hooks",
      stage: 200
    }, options => {
      let hook;
      for (const name of options.names) if (hook = this.hooks[name], void 0 !== hook) break;
      if (void 0 !== hook) {
        const tapOpt = {
          name: options.fn.name || "unnamed compat plugin",
          stage: options.stage || 0
        };
        return options.async ? hook.tapAsync(tapOpt, options.fn) : hook.tap(tapOpt, options.fn), 
        !0;
      }
    });
  }
  module.exports = Tapable, Tapable.addCompatLayer = function(instance) {
    Tapable.call(instance), instance.plugin = Tapable.prototype.plugin, instance.apply = Tapable.prototype.apply;
  }, Tapable.prototype.plugin = util.deprecate((function(name, fn) {
    if (Array.isArray(name)) return void name.forEach((function(name) {
      this.plugin(name, fn);
    }), this);
    if (!this._pluginCompat.call({
      name: name,
      fn: fn,
      names: new Set([ name ])
    })) throw new Error(`Plugin could not be registered at '${name}'. Hook was not found.\nBREAKING CHANGE: There need to exist a hook at 'this.hooks'. To create a compatibility layer for this hook, hook into 'this._pluginCompat'.`);
  }), "Tapable.plugin is deprecated. Use new API on `.hooks` instead"), Tapable.prototype.apply = util.deprecate((function() {
    for (var i = 0; i < arguments.length; i++) arguments[i].apply(this);
  }), "Tapable.apply is deprecated. Call apply on the plugin directly instead");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const Hook = __webpack_require__(6), HookCodeFactory = __webpack_require__(7);
  const factory = new class extends HookCodeFactory {
    content({onError: onError, onResult: onResult, resultReturns: resultReturns, onDone: onDone, rethrowIfPossible: rethrowIfPossible}) {
      return this.callTapsSeries({
        onError: (i, err) => onError(err),
        onResult: (i, result, next) => `if(${result} !== undefined) {\n${onResult(result)};\n} else {\n${next()}}\n`,
        resultReturns: resultReturns,
        onDone: onDone,
        rethrowIfPossible: rethrowIfPossible
      });
    }
  };
  module.exports = class extends Hook {
    tapAsync() {
      throw new Error("tapAsync is not supported on a SyncBailHook");
    }
    tapPromise() {
      throw new Error("tapPromise is not supported on a SyncBailHook");
    }
    compile(options) {
      return factory.setup(this, options), factory.create(options);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const Hook = __webpack_require__(6), HookCodeFactory = __webpack_require__(7);
  const factory = new class extends HookCodeFactory {
    content({onError: onError, onDone: onDone, rethrowIfPossible: rethrowIfPossible}) {
      return this.callTapsSeries({
        onError: (i, err) => onError(err),
        onDone: onDone,
        rethrowIfPossible: rethrowIfPossible
      });
    }
  };
  module.exports = class extends Hook {
    tapAsync() {
      throw new Error("tapAsync is not supported on a SyncHook");
    }
    tapPromise() {
      throw new Error("tapPromise is not supported on a SyncHook");
    }
    compile(options) {
      return factory.setup(this, options), factory.create(options);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const Hook = __webpack_require__(6), HookCodeFactory = __webpack_require__(7);
  const factory = new class extends HookCodeFactory {
    content({onError: onError, onResult: onResult, resultReturns: resultReturns, onDone: onDone}) {
      return this.callTapsSeries({
        onError: (i, err, next, doneBreak) => onError(err) + doneBreak(!0),
        onResult: (i, result, next) => `if(${result} !== undefined) {\n${onResult(result)};\n} else {\n${next()}}\n`,
        resultReturns: resultReturns,
        onDone: onDone
      });
    }
  };
  class AsyncSeriesBailHook extends Hook {
    compile(options) {
      return factory.setup(this, options), factory.create(options);
    }
  }
  Object.defineProperties(AsyncSeriesBailHook.prototype, {
    _call: {
      value: void 0,
      configurable: !0,
      writable: !0
    }
  }), module.exports = AsyncSeriesBailHook;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const Hook = __webpack_require__(6), HookCodeFactory = __webpack_require__(7);
  const factory = new class extends HookCodeFactory {
    content({onError: onError, onDone: onDone}) {
      return this.callTapsSeries({
        onError: (i, err, next, doneBreak) => onError(err) + doneBreak(!0),
        onDone: onDone
      });
    }
  };
  class AsyncSeriesHook extends Hook {
    compile(options) {
      return factory.setup(this, options), factory.create(options);
    }
  }
  Object.defineProperties(AsyncSeriesHook.prototype, {
    _call: {
      value: void 0,
      configurable: !0,
      writable: !0
    }
  }), module.exports = AsyncSeriesHook;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(options, message, messageOptional) {
    let messageReported = !1;
    return {
      log: (() => {
        if (!options.log) return;
        if (!message) return options.log;
        return msg => {
          messageReported || (options.log(message), messageReported = !0), options.log("  " + msg);
        };
      })(),
      stack: options.stack,
      missing: options.missing
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const normalize = __webpack_require__(19), absoluteWinRegExp = /^[A-Z]:([\\\/]|$)/i, absoluteNixRegExp = /^\//i;
  module.exports = function(path, request) {
    return request ? absoluteWinRegExp.test(request) ? normalize(request.replace(/\//g, "\\")) : absoluteNixRegExp.test(request) ? normalize(request) : "/" == path ? normalize(path + request) : absoluteWinRegExp.test(path) ? normalize(path.replace(/\//g, "\\") + "\\" + request.replace(/\//g, "\\")) : (absoluteNixRegExp.test(path), 
    normalize(path + "/" + request)) : normalize(path);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(fs) {
    this.fs = fs, fs.statSync && (this.stat = function(arg, callback) {
      let result;
      try {
        result = fs.statSync(arg);
      } catch (e) {
        return callback(e);
      }
      callback(null, result);
    }), fs.readdirSync && (this.readdir = function(arg, callback) {
      let result;
      try {
        result = fs.readdirSync(arg);
      } catch (e) {
        return callback(e);
      }
      callback(null, result);
    }), fs.readFileSync && (this.readFile = function(arg, callback) {
      let result;
      try {
        result = fs.readFileSync(arg);
      } catch (e) {
        return callback(e);
      }
      callback(null, result);
    }), fs.readlinkSync && (this.readlink = function(arg, callback) {
      let result;
      try {
        result = fs.readlinkSync(arg);
      } catch (e) {
        return callback(e);
      }
      callback(null, result);
    }), fs.readJsonSync && (this.readJson = function(arg, callback) {
      let result;
      try {
        result = fs.readJsonSync(arg);
      } catch (e) {
        return callback(e);
      }
      callback(null, result);
    });
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ParsePlugin", (request, resolveContext, callback) => {
        const parsed = resolver.parse(request.request), obj = Object.assign({}, request, parsed);
        request.query && !parsed.query && (obj.query = request.query), parsed && resolveContext.log && (parsed.module && resolveContext.log("Parsed request is a module"), 
        parsed.directory && resolveContext.log("Parsed request is a directory")), resolver.doResolve(target, obj, null, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const DescriptionFileUtils = __webpack_require__(4);
  module.exports = class {
    constructor(source, filenames, target) {
      this.source = source, this.filenames = [].concat(filenames), this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("DescriptionFilePlugin", (request, resolveContext, callback) => {
        const directory = request.path;
        DescriptionFileUtils.loadDescriptionFile(resolver, directory, this.filenames, resolveContext, (err, result) => {
          if (err) return callback(err);
          if (!result) return resolveContext.missing && this.filenames.forEach(filename => {
            resolveContext.missing.add(resolver.join(directory, filename));
          }), resolveContext.log && resolveContext.log("No description file found"), callback();
          const relativePath = "." + request.path.substr(result.directory.length).replace(/\\/g, "/"), obj = Object.assign({}, request, {
            descriptionFilePath: result.path,
            descriptionFileData: result.content,
            descriptionFileRoot: result.directory,
            relativePath: relativePath
          });
          resolver.doResolve(target, obj, "using description file: " + result.path + " (relative path: " + relativePath + ")", resolveContext, (err, result) => err ? callback(err) : void 0 === result ? callback(null, null) : void callback(null, result));
        });
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("NextPlugin", (request, resolveContext, callback) => {
        resolver.doResolve(target, request, null, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, message, target) {
      this.source = source, this.message = message, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("TryNextPlugin", (request, resolveContext, callback) => {
        resolver.doResolve(target, request, this.message, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ModuleKindPlugin", (request, resolveContext, callback) => {
        if (!request.module) return callback();
        const obj = Object.assign({}, request);
        delete obj.module, resolver.doResolve(target, obj, "resolve as module", resolveContext, (err, result) => err ? callback(err) : void 0 === result ? callback(null, null) : void callback(null, result));
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("FileKindPlugin", (request, resolveContext, callback) => {
        if (request.directory) return callback();
        const obj = Object.assign({}, request);
        delete obj.directory, resolver.doResolve(target, obj, null, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("JoinRequestPlugin", (request, resolveContext, callback) => {
        const obj = Object.assign({}, request, {
          path: resolver.join(request.path, request.request),
          relativePath: request.relativePath && resolver.join(request.relativePath, request.request),
          request: void 0
        });
        resolver.doResolve(target, obj, null, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const forEachBail = __webpack_require__(8), getPaths = __webpack_require__(20);
  module.exports = class {
    constructor(source, directories, target) {
      this.source = source, this.directories = [].concat(directories), this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ModulesInHierachicDirectoriesPlugin", (request, resolveContext, callback) => {
        const fs = resolver.fileSystem, addrs = getPaths(request.path).paths.map(p => this.directories.map(d => resolver.join(p, d))).reduce((array, p) => (array.push.apply(array, p), 
        array), []);
        forEachBail(addrs, (addr, callback) => {
          fs.stat(addr, (err, stat) => {
            if (!err && stat && stat.isDirectory()) {
              const obj = Object.assign({}, request, {
                path: addr,
                request: "./" + request.request
              }), message = "looking for modules in " + addr;
              return resolver.doResolve(target, obj, message, resolveContext, callback);
            }
            return resolveContext.log && resolveContext.log(addr + " doesn't exist or is not a directory"), 
            resolveContext.missing && resolveContext.missing.add(addr), callback();
          });
        }, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, path, target) {
      this.source = source, this.path = path, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ModulesInRootPlugin", (request, resolveContext, callback) => {
        const obj = Object.assign({}, request, {
          path: this.path,
          request: "./" + request.request
        });
        resolver.doResolve(target, obj, "looking for modules in " + this.path, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function startsWith(string, searchString) {
    const stringLength = string.length, searchLength = searchString.length;
    if (searchLength > stringLength) return !1;
    let index = -1;
    for (;++index < searchLength; ) if (string.charCodeAt(index) !== searchString.charCodeAt(index)) return !1;
    return !0;
  }
  module.exports = class {
    constructor(source, options, target) {
      this.source = source, this.options = Array.isArray(options) ? options : [ options ], 
      this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("AliasPlugin", (request, resolveContext, callback) => {
        const innerRequest = request.request || request.path;
        if (!innerRequest) return callback();
        for (const item of this.options) if ((innerRequest === item.name || !item.onlyModule && startsWith(innerRequest, item.name + "/")) && innerRequest !== item.alias && !startsWith(innerRequest, item.alias + "/")) {
          const newRequestStr = item.alias + innerRequest.substr(item.name.length), obj = Object.assign({}, request, {
            request: newRequestStr
          });
          return resolver.doResolve(target, obj, "aliased with mapping '" + item.name + "': '" + item.alias + "' to '" + newRequestStr + "'", resolveContext, (err, result) => err ? callback(err) : void 0 === result ? callback(null, null) : void callback(null, result));
        }
        return callback();
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const DescriptionFileUtils = __webpack_require__(4), getInnerRequest = __webpack_require__(21);
  module.exports = class {
    constructor(source, field, target) {
      this.source = source, this.field = field, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("AliasFieldPlugin", (request, resolveContext, callback) => {
        if (!request.descriptionFileData) return callback();
        const innerRequest = getInnerRequest(resolver, request);
        if (!innerRequest) return callback();
        const fieldData = DescriptionFileUtils.getField(request.descriptionFileData, this.field);
        if ("object" != typeof fieldData) return resolveContext.log && resolveContext.log("Field '" + this.field + "' doesn't contain a valid alias configuration"), 
        callback();
        const data1 = fieldData[innerRequest], data2 = fieldData[innerRequest.replace(/^\.\//, "")], data = void 0 !== data1 ? data1 : data2;
        if (data === innerRequest) return callback();
        if (void 0 === data) return callback();
        if (!1 === data) {
          const ignoreObj = Object.assign({}, request, {
            path: !1
          });
          return callback(null, ignoreObj);
        }
        const obj = Object.assign({}, request, {
          path: request.descriptionFileRoot,
          request: data
        });
        resolver.doResolve(target, obj, "aliased from description file " + request.descriptionFilePath + " with mapping '" + innerRequest + "' to '" + data + "'", resolveContext, (err, result) => err ? callback(err) : void 0 === result ? callback(null, null) : void callback(null, result));
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const concord = __webpack_require__(12), DescriptionFileUtils = __webpack_require__(4), forEachBail = __webpack_require__(8);
  module.exports = class {
    constructor(source, options, target) {
      this.source = source, this.options = options, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ConcordExtensionsPlugin", (request, resolveContext, callback) => {
        const concordField = DescriptionFileUtils.getField(request.descriptionFileData, "concord");
        if (!concordField) return callback();
        const extensions = concord.getExtensions(request.context, concordField);
        if (!extensions) return callback();
        forEachBail(extensions, (appending, callback) => {
          const obj = Object.assign({}, request, {
            path: request.path + appending,
            relativePath: request.relativePath && request.relativePath + appending
          });
          resolver.doResolve(target, obj, "concord extension: " + appending, resolveContext, callback);
        }, (err, result) => err ? callback(err) : void 0 === result ? callback(null, null) : void callback(null, result));
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const SIMPLE_TOKENS = {
    "@(": "one",
    "?(": "zero-one",
    "+(": "one-many",
    "*(": "zero-many",
    "|": "segment-sep",
    "/**/": "any-path-segments",
    "**": "any-path",
    "*": "any-path-segment",
    "?": "any-char",
    "{": "or",
    "/": "path-sep",
    ",": "comma",
    ")": "closing-segment",
    "}": "closing-or"
  };
  exports.globToRegExp = function(glob) {
    if (/^\(.+\)$/.test(glob)) return new RegExp(glob.substr(1, glob.length - 2));
    const tokens = function(glob) {
      return glob.split(/([@?+*]\(|\/\*\*\/|\*\*|[?*]|\[[!^]?(?:[^\]\\]|\\.)+\]|\{|,|\/|[|)}])/g).map(item => {
        if (!item) return null;
        const t = SIMPLE_TOKENS[item];
        return t ? {
          type: t
        } : "[" === item[0] ? "^" === item[1] || "!" === item[1] ? {
          type: "inverted-char-set",
          value: item.substr(2, item.length - 3)
        } : {
          type: "char-set",
          value: item.substr(1, item.length - 2)
        } : {
          type: "string",
          value: item
        };
      }).filter(Boolean).concat({
        type: "end"
      });
    }(glob), process = function() {
      const inOr = [], process = function() {
        const inSeqment = [], process = function(token, initial) {
          switch (token.type) {
           case "path-sep":
            return "[\\\\/]+";

           case "any-path-segments":
            return "[\\\\/]+(?:(.+)[\\\\/]+)?";

           case "any-path":
            return "(.*)";

           case "any-path-segment":
            return initial ? "\\.[\\\\/]+(?:.*[\\\\/]+)?([^\\\\/]+)" : "([^\\\\/]*)";

           case "any-char":
            return "[^\\\\/]";

           case "inverted-char-set":
            return "[^" + token.value + "]";

           case "char-set":
            return "[" + token.value + "]";

           case "string":
            return token.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

           case "end":
            return "";

           default:
            throw new Error("Unsupported token '" + token.type + "'");
          }
        };
        return function(token, initial) {
          switch (token.type) {
           case "one":
           case "one-many":
           case "zero-many":
           case "zero-one":
            return inSeqment.push(token.type), "(";

           case "segment-sep":
            return inSeqment.length ? "|" : process({
              type: "string",
              value: "|"
            }, initial);

           case "closing-segment":
            {
              const segment = inSeqment.pop();
              switch (segment) {
               case "one":
                return ")";

               case "one-many":
                return ")+";

               case "zero-many":
                return ")*";

               case "zero-one":
                return ")?";
              }
              throw new Error("Unexcepted segment " + segment);
            }

           case "end":
            if (inSeqment.length > 0) throw new Error("Unmatched segment, missing ')'");
            return process(token, initial);

           default:
            return process(token, initial);
          }
        };
      }();
      let initial = !0;
      return function(token) {
        switch (token.type) {
         case "or":
          return inOr.push(initial), "(";

         case "comma":
          return inOr.length ? (initial = inOr[inOr.length - 1], "|") : process({
            type: "string",
            value: ","
          }, initial);

         case "closing-or":
          if (0 === inOr.length) throw new Error("Unmatched '}'");
          return inOr.pop(), ")";

         case "end":
          if (inOr.length) throw new Error("Unmatched '{'");
          return process(token, initial);

         default:
          {
            const result = process(token, initial);
            return initial = !1, result;
          }
        }
      };
    }(), regExpStr = tokens.map(process).join("");
    return new RegExp("^" + regExpStr + "$");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0), concord = __webpack_require__(12), DescriptionFileUtils = __webpack_require__(4);
  module.exports = class {
    constructor(source, options, target) {
      this.source = source, this.options = options, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ConcordMainPlugin", (request, resolveContext, callback) => {
        if (request.path !== request.descriptionFileRoot) return callback();
        const concordField = DescriptionFileUtils.getField(request.descriptionFileData, "concord");
        if (!concordField) return callback();
        const mainModule = concord.getMain(request.context, concordField);
        if (!mainModule) return callback();
        const obj = Object.assign({}, request, {
          request: mainModule
        }), filename = path.basename(request.descriptionFilePath);
        return resolver.doResolve(target, obj, "use " + mainModule + " from " + filename, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const concord = __webpack_require__(12), DescriptionFileUtils = __webpack_require__(4), getInnerRequest = __webpack_require__(21);
  module.exports = class {
    constructor(source, options, target) {
      this.source = source, this.options = options, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ConcordModulesPlugin", (request, resolveContext, callback) => {
        const innerRequest = getInnerRequest(resolver, request);
        if (!innerRequest) return callback();
        const concordField = DescriptionFileUtils.getField(request.descriptionFileData, "concord");
        if (!concordField) return callback();
        const data = concord.matchModule(request.context, concordField, innerRequest);
        if (data === innerRequest) return callback();
        if (void 0 === data) return callback();
        if (!1 === data) {
          const ignoreObj = Object.assign({}, request, {
            path: !1
          });
          return callback(null, ignoreObj);
        }
        const obj = Object.assign({}, request, {
          path: request.descriptionFileRoot,
          request: data
        });
        resolver.doResolve(target, obj, "aliased from description file " + request.descriptionFilePath + " with mapping '" + innerRequest + "' to '" + data + "'", resolveContext, (err, result) => err ? callback(err) : void 0 === result ? callback(null, null) : void callback(null, result));
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("DirectoryExistsPlugin", (request, resolveContext, callback) => {
        const fs = resolver.fileSystem, directory = request.path;
        fs.stat(directory, (err, stat) => err || !stat ? (resolveContext.missing && resolveContext.missing.add(directory), 
        resolveContext.log && resolveContext.log(directory + " doesn't exist"), callback()) : stat.isDirectory() ? void resolver.doResolve(target, request, "existing directory", resolveContext, callback) : (resolveContext.missing && resolveContext.missing.add(directory), 
        resolveContext.log && resolveContext.log(directory + " is not a directory"), callback()));
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target), fs = resolver.fileSystem;
      resolver.getHook(this.source).tapAsync("FileExistsPlugin", (request, resolveContext, callback) => {
        const file = request.path;
        fs.stat(file, (err, stat) => err || !stat ? (resolveContext.missing && resolveContext.missing.add(file), 
        resolveContext.log && resolveContext.log(file + " doesn't exist"), callback()) : stat.isFile() ? void resolver.doResolve(target, request, "existing file: " + file, resolveContext, callback) : (resolveContext.missing && resolveContext.missing.add(file), 
        resolveContext.log && resolveContext.log(file + " is not a file"), callback()));
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const getPaths = __webpack_require__(20), forEachBail = __webpack_require__(8);
  module.exports = class {
    constructor(source, target) {
      this.source = source, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target), fs = resolver.fileSystem;
      resolver.getHook(this.source).tapAsync("SymlinkPlugin", (request, resolveContext, callback) => {
        const pathsResult = getPaths(request.path), pathSeqments = pathsResult.seqments, paths = pathsResult.paths;
        let containsSymlink = !1;
        forEachBail.withIndex(paths, (path, idx, callback) => {
          fs.readlink(path, (err, result) => {
            if (!err && result && (pathSeqments[idx] = result, containsSymlink = !0, /^(\/|[a-zA-Z]:($|\\))/.test(result))) return callback(null, idx);
            callback();
          });
        }, (err, idx) => {
          if (!containsSymlink) return callback();
          const result = ("number" == typeof idx ? pathSeqments.slice(0, idx + 1) : pathSeqments.slice()).reverse().reduce((a, b) => resolver.join(a, b)), obj = Object.assign({}, request, {
            path: result
          });
          resolver.doResolve(target, obj, "resolved symlink to " + result, resolveContext, callback);
        });
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(0);
  module.exports = class {
    constructor(source, options, target) {
      this.source = source, this.options = options, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("MainFieldPlugin", (request, resolveContext, callback) => {
        if (request.path !== request.descriptionFileRoot) return callback();
        if (request.alreadyTriedMainField === request.descriptionFilePath) return callback();
        const content = request.descriptionFileData, filename = path.basename(request.descriptionFilePath);
        let mainModule;
        const field = this.options.name;
        if (Array.isArray(field)) {
          let current = content;
          for (let j = 0; j < field.length; j++) {
            if (null === current || "object" != typeof current) {
              current = null;
              break;
            }
            current = current[field[j]];
          }
          "string" == typeof current && (mainModule = current);
        } else "string" == typeof content[field] && (mainModule = content[field]);
        if (!mainModule) return callback();
        this.options.forceRelative && !/^\.\.?\//.test(mainModule) && (mainModule = "./" + mainModule);
        const obj = Object.assign({}, request, {
          request: mainModule,
          alreadyTriedMainField: request.descriptionFilePath
        });
        return resolver.doResolve(target, obj, "use " + mainModule + " from " + this.options.name + " in " + filename, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, filename, target) {
      this.source = source, this.filename = filename, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("UseFilePlugin", (request, resolveContext, callback) => {
        const filePath = resolver.join(request.path, this.filename), obj = Object.assign({}, request, {
          path: filePath,
          relativePath: request.relativePath && resolver.join(request.relativePath, this.filename)
        });
        resolver.doResolve(target, obj, "using path: " + filePath, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, appending, target) {
      this.source = source, this.appending = appending, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("AppendPlugin", (request, resolveContext, callback) => {
        const obj = Object.assign({}, request, {
          path: request.path + this.appending,
          relativePath: request.relativePath && request.relativePath + this.appending
        });
        resolver.doResolve(target, obj, this.appending, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, root, target, ignoreErrors) {
      this.root = root, this.source = source, this.target = target, this._ignoreErrors = ignoreErrors;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("RootPlugin", (request, resolveContext, callback) => {
        const req = request.request;
        if (!req) return callback();
        if (!req.startsWith("/")) return callback();
        const path = resolver.join(this.root, req.slice(1)), obj = Object.assign(request, {
          path: path,
          relativePath: request.relativePath && path
        });
        resolver.doResolve(target, obj, "root path " + this.root, resolveContext, this._ignoreErrors ? (err, result) => err ? (resolveContext.log && resolveContext.log("Ignored fatal error while resolving root path:\n" + err), 
        callback()) : result ? callback(null, result) : void callback() : callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const slashCode = "/".charCodeAt(0), backslashCode = "\\".charCodeAt(0), isInside = (path, parent) => {
    if (!path.startsWith(parent)) return !1;
    if (path.length === parent.length) return !0;
    const charCode = path.charCodeAt(parent.length);
    return charCode === slashCode || charCode === backslashCode;
  };
  module.exports = class {
    constructor(source, restrictions) {
      this.source = source, this.restrictions = restrictions;
    }
    apply(resolver) {
      resolver.getHook(this.source).tapAsync("RestrictionsPlugin", (request, resolveContext, callback) => {
        if ("string" == typeof request.path) {
          const path = request.path;
          for (let i = 0; i < this.restrictions.length; i++) {
            const rule = this.restrictions[i];
            if ("string" == typeof rule) {
              if (!isInside(path, rule)) return resolveContext.log && resolveContext.log(`${path} is not inside of the restriction ${rule}`), 
              callback(null, null);
            } else if (!rule.test(path)) return resolveContext.log && resolveContext.log(`${path} doesn't match the restriction ${rule}`), 
            callback(null, null);
          }
        }
        callback();
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source) {
      this.source = source;
    }
    apply(resolver) {
      this.source.tapAsync("ResultPlugin", (request, resolverContext, callback) => {
        const obj = Object.assign({}, request);
        resolverContext.log && resolverContext.log("reporting result " + obj.path), resolver.hooks.result.callAsync(obj, resolverContext, err => {
          if (err) return callback(err);
          callback(null, obj);
        });
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, appending, target) {
      this.source = source, this.appending = appending, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("ModuleAppendPlugin", (request, resolveContext, callback) => {
        const i = request.request.indexOf("/"), j = request.request.indexOf("\\"), p = i < 0 ? j : j < 0 || i < j ? i : j;
        let moduleName, remainingRequest;
        if (p < 0 ? (moduleName = request.request, remainingRequest = "") : (moduleName = request.request.substr(0, p), 
        remainingRequest = request.request.substr(p)), "." === moduleName || ".." === moduleName) return callback();
        const moduleFinalName = moduleName + this.appending, obj = Object.assign({}, request, {
          request: moduleFinalName + remainingRequest
        });
        resolver.doResolve(target, obj, "module variation " + moduleFinalName, resolveContext, callback);
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = class {
    constructor(source, filterPredicate, cache, withContext, target) {
      this.source = source, this.filterPredicate = filterPredicate, this.withContext = withContext, 
      this.cache = cache || {}, this.target = target;
    }
    apply(resolver) {
      const target = resolver.ensureHook(this.target);
      resolver.getHook(this.source).tapAsync("UnsafeCachePlugin", (request, resolveContext, callback) => {
        if (!this.filterPredicate(request)) return callback();
        const cacheId = function(request, withContext) {
          return JSON.stringify({
            context: withContext ? request.context : "",
            path: request.path,
            query: request.query,
            request: request.request
          });
        }(request, this.withContext), cacheEntry = this.cache[cacheId];
        if (cacheEntry) return callback(null, cacheEntry);
        resolver.doResolve(target, request, null, resolveContext, (err, result) => err ? callback(err) : result ? callback(null, this.cache[cacheId] = result) : void callback());
      });
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(108);
  class NodeJsInputFileSystem {
    readdir(path, callback) {
      fs.readdir(path, (err, files) => {
        callback(err, files && files.map(file => file.normalize ? file.normalize("NFC") : file));
      });
    }
    readdirSync(path) {
      const files = fs.readdirSync(path);
      return files && files.map(file => file.normalize ? file.normalize("NFC") : file);
    }
  }
  const fsMethods = [ "stat", "statSync", "readFile", "readFileSync", "readlink", "readlinkSync" ];
  for (const key of fsMethods) Object.defineProperty(NodeJsInputFileSystem.prototype, key, {
    configurable: !0,
    writable: !0,
    value: fs[key].bind(fs)
  });
  module.exports = NodeJsInputFileSystem;
}, function(module, exports, __webpack_require__) {
  var gracefulQueue, previousSymbol, fs = __webpack_require__(3), polyfills = __webpack_require__(109), legacy = __webpack_require__(111), clone = __webpack_require__(113), util = __webpack_require__(11);
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
      debug(fs[gracefulQueue]), __webpack_require__(114).equal(fs[gracefulQueue].length, 0);
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
}, function(module, exports, __webpack_require__) {
  var constants = __webpack_require__(110), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
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
}, function(module, exports) {
  module.exports = require("constants");
}, function(module, exports, __webpack_require__) {
  var Stream = __webpack_require__(112).Stream;
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
}, function(module, exports) {
  module.exports = require("stream");
}, function(module, exports, __webpack_require__) {
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
}, function(module, exports) {
  module.exports = require("assert");
}, function(module, exports, __webpack_require__) {
  "use strict";
  class Storage {
    constructor(duration) {
      if (this.duration = duration, this.running = new Map, this.data = new Map, this.levels = [], 
      duration > 0) {
        this.levels.push(new Set, new Set, new Set, new Set, new Set, new Set, new Set, new Set, new Set);
        for (let i = 8e3; i < duration; i += 500) this.levels.push(new Set);
      }
      this.count = 0, this.interval = null, this.needTickCheck = !1, this.nextTick = null, 
      this.passive = !0, this.tick = this.tick.bind(this);
    }
    ensureTick() {
      !this.interval && this.duration > 0 && !this.nextTick && (this.interval = setInterval(this.tick, Math.floor(this.duration / this.levels.length)));
    }
    finished(name, err, result) {
      const callbacks = this.running.get(name);
      if (this.running.delete(name), this.duration > 0) {
        this.data.set(name, [ err, result ]);
        const levelData = this.levels[0];
        this.count -= levelData.size, levelData.add(name), this.count += levelData.size, 
        this.ensureTick();
      }
      for (let i = 0; i < callbacks.length; i++) callbacks[i](err, result);
    }
    finishedSync(name, err, result) {
      if (this.duration > 0) {
        this.data.set(name, [ err, result ]);
        const levelData = this.levels[0];
        this.count -= levelData.size, levelData.add(name), this.count += levelData.size, 
        this.ensureTick();
      }
    }
    provide(name, provider, callback) {
      if ("string" != typeof name) return void callback(new TypeError("path must be a string"));
      let running = this.running.get(name);
      if (running) running.push(callback); else {
        if (this.duration > 0) {
          this.checkTicks();
          const data = this.data.get(name);
          if (data) return process.nextTick(() => {
            callback.apply(null, data);
          });
        }
        this.running.set(name, running = [ callback ]), provider(name, (err, result) => {
          this.finished(name, err, result);
        });
      }
    }
    provideSync(name, provider) {
      if ("string" != typeof name) throw new TypeError("path must be a string");
      if (this.duration > 0) {
        this.checkTicks();
        const data = this.data.get(name);
        if (data) {
          if (data[0]) throw data[0];
          return data[1];
        }
      }
      let result;
      try {
        result = provider(name);
      } catch (e) {
        throw this.finishedSync(name, e), e;
      }
      return this.finishedSync(name, null, result), result;
    }
    tick() {
      const decay = this.levels.pop();
      for (let item of decay) this.data.delete(item);
      if (this.count -= decay.size, decay.clear(), this.levels.unshift(decay), 0 === this.count) return clearInterval(this.interval), 
      this.interval = null, this.nextTick = null, !0;
      if (this.nextTick) {
        this.nextTick += Math.floor(this.duration / this.levels.length);
        const time = (new Date).getTime();
        if (this.nextTick > time) return this.nextTick = null, this.interval = setInterval(this.tick, Math.floor(this.duration / this.levels.length)), 
        !0;
      } else this.passive ? (clearInterval(this.interval), this.interval = null, this.nextTick = (new Date).getTime() + Math.floor(this.duration / this.levels.length)) : this.passive = !0;
    }
    checkTicks() {
      if (this.passive = !1, this.nextTick) for (;!this.tick(); ) ;
    }
    purge(what) {
      if (what) if ("string" == typeof what) for (let key of this.data.keys()) key.startsWith(what) && this.data.delete(key); else for (let i = what.length - 1; i >= 0; i--) this.purge(what[i]); else this.count = 0, 
      clearInterval(this.interval), this.nextTick = null, this.data.clear(), this.levels.forEach(level => {
        level.clear();
      });
    }
  }
  module.exports = class {
    constructor(fileSystem, duration) {
      this.fileSystem = fileSystem, this._statStorage = new Storage(duration), this._readdirStorage = new Storage(duration), 
      this._readFileStorage = new Storage(duration), this._readJsonStorage = new Storage(duration), 
      this._readlinkStorage = new Storage(duration), this._stat = this.fileSystem.stat ? this.fileSystem.stat.bind(this.fileSystem) : null, 
      this._stat || (this.stat = null), this._statSync = this.fileSystem.statSync ? this.fileSystem.statSync.bind(this.fileSystem) : null, 
      this._statSync || (this.statSync = null), this._readdir = this.fileSystem.readdir ? this.fileSystem.readdir.bind(this.fileSystem) : null, 
      this._readdir || (this.readdir = null), this._readdirSync = this.fileSystem.readdirSync ? this.fileSystem.readdirSync.bind(this.fileSystem) : null, 
      this._readdirSync || (this.readdirSync = null), this._readFile = this.fileSystem.readFile ? this.fileSystem.readFile.bind(this.fileSystem) : null, 
      this._readFile || (this.readFile = null), this._readFileSync = this.fileSystem.readFileSync ? this.fileSystem.readFileSync.bind(this.fileSystem) : null, 
      this._readFileSync || (this.readFileSync = null), this.fileSystem.readJson ? this._readJson = this.fileSystem.readJson.bind(this.fileSystem) : this.readFile ? this._readJson = (path, callback) => {
        this.readFile(path, (err, buffer) => {
          if (err) return callback(err);
          let data;
          try {
            data = JSON.parse(buffer.toString("utf-8"));
          } catch (e) {
            return callback(e);
          }
          callback(null, data);
        });
      } : this.readJson = null, this.fileSystem.readJsonSync ? this._readJsonSync = this.fileSystem.readJsonSync.bind(this.fileSystem) : this.readFileSync ? this._readJsonSync = path => {
        const buffer = this.readFileSync(path);
        return JSON.parse(buffer.toString("utf-8"));
      } : this.readJsonSync = null, this._readlink = this.fileSystem.readlink ? this.fileSystem.readlink.bind(this.fileSystem) : null, 
      this._readlink || (this.readlink = null), this._readlinkSync = this.fileSystem.readlinkSync ? this.fileSystem.readlinkSync.bind(this.fileSystem) : null, 
      this._readlinkSync || (this.readlinkSync = null);
    }
    stat(path, callback) {
      this._statStorage.provide(path, this._stat, callback);
    }
    readdir(path, callback) {
      this._readdirStorage.provide(path, this._readdir, callback);
    }
    readFile(path, callback) {
      this._readFileStorage.provide(path, this._readFile, callback);
    }
    readJson(path, callback) {
      this._readJsonStorage.provide(path, this._readJson, callback);
    }
    readlink(path, callback) {
      this._readlinkStorage.provide(path, this._readlink, callback);
    }
    statSync(path) {
      return this._statStorage.provideSync(path, this._statSync);
    }
    readdirSync(path) {
      return this._readdirStorage.provideSync(path, this._readdirSync);
    }
    readFileSync(path) {
      return this._readFileStorage.provideSync(path, this._readFileSync);
    }
    readJsonSync(path) {
      return this._readJsonStorage.provideSync(path, this._readJsonSync);
    }
    readlinkSync(path) {
      return this._readlinkStorage.provideSync(path, this._readlinkSync);
    }
    purge(what) {
      this._statStorage.purge(what), this._readdirStorage.purge(what), this._readFileStorage.purge(what), 
      this._readlinkStorage.purge(what), this._readJsonStorage.purge(what);
    }
  };
} ]);