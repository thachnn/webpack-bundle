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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 33);
}([ function(module, exports, __webpack_require__) {
  "use strict";
  var es5 = __webpack_require__(6), canEvaluate = "undefined" == typeof navigator, errorObj = {
    e: {}
  }, tryCatchTarget, globalObject = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0 !== this ? this : null;
  function tryCatcher() {
    try {
      var target = tryCatchTarget;
      return tryCatchTarget = null, target.apply(this, arguments);
    } catch (e) {
      return errorObj.e = e, errorObj;
    }
  }
  function tryCatch(fn) {
    return tryCatchTarget = fn, tryCatcher;
  }
  var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;
    function T() {
      for (var propertyName in this.constructor = Child, this.constructor$ = Parent, Parent.prototype) hasProp.call(Parent.prototype, propertyName) && "$" !== propertyName.charAt(propertyName.length - 1) && (this[propertyName + "$"] = Parent.prototype[propertyName]);
    }
    return T.prototype = Parent.prototype, Child.prototype = new T, Child.prototype;
  };
  function isPrimitive(val) {
    return null == val || !0 === val || !1 === val || "string" == typeof val || "number" == typeof val;
  }
  function isObject(value) {
    return "function" == typeof value || "object" == typeof value && null !== value;
  }
  function maybeWrapAsError(maybeError) {
    return isPrimitive(maybeError) ? new Error(safeToString(maybeError)) : maybeError;
  }
  function withAppended(target, appendee) {
    var i, len = target.length, ret = new Array(len + 1);
    for (i = 0; i < len; ++i) ret[i] = target[i];
    return ret[i] = appendee, ret;
  }
  function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (!es5.isES5) return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
    var desc = Object.getOwnPropertyDescriptor(obj, key);
    return null != desc ? null == desc.get && null == desc.set ? desc.value : defaultValue : void 0;
  }
  function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
      value: value,
      configurable: !0,
      enumerable: !1,
      writable: !0
    };
    return es5.defineProperty(obj, name, descriptor), obj;
  }
  function thrower(r) {
    throw r;
  }
  var inheritedDataKeys = function() {
    var excludedPrototypes = [ Array.prototype, Object.prototype, Function.prototype ], isExcludedProto = function(val) {
      for (var i = 0; i < excludedPrototypes.length; ++i) if (excludedPrototypes[i] === val) return !0;
      return !1;
    };
    if (es5.isES5) {
      var getKeys = Object.getOwnPropertyNames;
      return function(obj) {
        for (var ret = [], visitedKeys = Object.create(null); null != obj && !isExcludedProto(obj); ) {
          var keys;
          try {
            keys = getKeys(obj);
          } catch (e) {
            return ret;
          }
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!visitedKeys[key]) {
              visitedKeys[key] = !0;
              var desc = Object.getOwnPropertyDescriptor(obj, key);
              null != desc && null == desc.get && null == desc.set && ret.push(key);
            }
          }
          obj = es5.getPrototypeOf(obj);
        }
        return ret;
      };
    }
    var hasProp = {}.hasOwnProperty;
    return function(obj) {
      if (isExcludedProto(obj)) return [];
      var ret = [];
      enumeration: for (var key in obj) if (hasProp.call(obj, key)) ret.push(key); else {
        for (var i = 0; i < excludedPrototypes.length; ++i) if (hasProp.call(excludedPrototypes[i], key)) continue enumeration;
        ret.push(key);
      }
      return ret;
    };
  }(), thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
  function isClass(fn) {
    try {
      if ("function" == typeof fn) {
        var keys = es5.names(fn.prototype), hasMethods = es5.isES5 && keys.length > 1, hasMethodsOtherThanConstructor = keys.length > 0 && !(1 === keys.length && "constructor" === keys[0]), hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
        if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) return !0;
      }
      return !1;
    } catch (e) {
      return !1;
    }
  }
  function toFastProperties(obj) {
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var receiver = new FakeConstructor;
    function ic() {
      return typeof receiver.foo;
    }
    return ic(), ic(), obj;
  }
  var rident = /^[a-z$_][a-z$_0-9]*$/i;
  function isIdentifier(str) {
    return rident.test(str);
  }
  function filledRange(count, prefix, suffix) {
    for (var ret = new Array(count), i = 0; i < count; ++i) ret[i] = prefix + i + suffix;
    return ret;
  }
  function safeToString(obj) {
    try {
      return obj + "";
    } catch (e) {
      return "[no string representation]";
    }
  }
  function isError(obj) {
    return obj instanceof Error || null !== obj && "object" == typeof obj && "string" == typeof obj.message && "string" == typeof obj.name;
  }
  function markAsOriginatingFromRejection(e) {
    try {
      notEnumerableProp(e, "isOperational", !0);
    } catch (ignore) {}
  }
  function originatesFromRejection(e) {
    return null != e && (e instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === e.isOperational);
  }
  function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
  }
  var ensureErrorObject = "stack" in new Error ? function(value) {
    return canAttachTrace(value) ? value : new Error(safeToString(value));
  } : function(value) {
    if (canAttachTrace(value)) return value;
    try {
      throw new Error(safeToString(value));
    } catch (err) {
      return err;
    }
  };
  function classString(obj) {
    return {}.toString.call(obj);
  }
  function copyDescriptors(from, to, filter) {
    for (var keys = es5.names(from), i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (filter(key)) try {
        es5.defineProperty(to, key, es5.getDescriptor(from, key));
      } catch (ignore) {}
    }
  }
  var asArray = function(v) {
    return es5.isArray(v) ? v : null;
  };
  if ("undefined" != typeof Symbol && Symbol.iterator) {
    var ArrayFrom = "function" == typeof Array.from ? function(v) {
      return Array.from(v);
    } : function(v) {
      for (var itResult, ret = [], it = v[Symbol.iterator](); !(itResult = it.next()).done; ) ret.push(itResult.value);
      return ret;
    };
    asArray = function(v) {
      return es5.isArray(v) ? v : null != v && "function" == typeof v[Symbol.iterator] ? ArrayFrom(v) : null;
    };
  }
  var isNode = "undefined" != typeof process && "[object process]" === classString(process).toLowerCase(), hasEnvVariables = "undefined" != typeof process && void 0 !== process.env, reflectHandler;
  function env(key) {
    return hasEnvVariables ? process.env[key] : void 0;
  }
  function getNativePromise() {
    if ("function" == typeof Promise) try {
      if ("[object Promise]" === classString(new Promise((function() {})))) return Promise;
    } catch (e) {}
  }
  function contextBind(ctx, cb) {
    if (null === ctx || "function" != typeof cb || cb === reflectHandler) return cb;
    null !== ctx.domain && (cb = ctx.domain.bind(cb));
    var async = ctx.async;
    if (null !== async) {
      var old = cb;
      cb = function() {
        for (var $_len = arguments.length + 2, args = new Array($_len), $_i = 2; $_i < $_len; ++$_i) args[$_i] = arguments[$_i - 2];
        return args[0] = old, args[1] = this, async.runInAsyncScope.apply(async, args);
      };
    }
    return cb;
  }
  var ret = {
    setReflectHandler: function(fn) {
      reflectHandler = fn;
    },
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    contextBind: contextBind
  }, version;
  ret.isRecentNode = ret.isNode && (process.versions && process.versions.node ? version = process.versions.node.split(".").map(Number) : process.version && (version = process.version.split(".").map(Number)), 
  0 === version[0] && version[1] > 10 || version[0] > 0), ret.nodeSupportsAsyncResource = ret.isNode && function() {
    var supportsAsync = !1;
    try {
      supportsAsync = "function" == typeof __webpack_require__(20).AsyncResource.prototype.runInAsyncScope;
    } catch (e) {
      supportsAsync = !1;
    }
    return supportsAsync;
  }(), ret.isNode && ret.toFastProperties(process);
  try {
    throw new Error;
  } catch (e) {
    ret.lastLineError = e;
  }
  module.exports = ret;
}, function(module, exports) {
  module.exports = require("path");
}, function(module, exports, __webpack_require__) {
  "use strict";
  var old;
  "undefined" != typeof Promise && (old = Promise);
  var bluebird = __webpack_require__(36)();
  bluebird.noConflict = function() {
    try {
      Promise === bluebird && (Promise = old);
    } catch (e) {}
    return bluebird;
  }, module.exports = bluebird;
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports) {
  module.exports = require("./mississippi");
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _TypeError, _RangeError, es5 = __webpack_require__(6), Objectfreeze = es5.freeze, util = __webpack_require__(0), inherits = util.inherits, notEnumerableProp = util.notEnumerableProp;
  function subError(nameProperty, defaultMessage) {
    function SubError(message) {
      if (!(this instanceof SubError)) return new SubError(message);
      notEnumerableProp(this, "message", "string" == typeof message ? message : defaultMessage), 
      notEnumerableProp(this, "name", nameProperty), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
    }
    return inherits(SubError, Error), SubError;
  }
  var Warning = subError("Warning", "warning"), CancellationError = subError("CancellationError", "cancellation error"), TimeoutError = subError("TimeoutError", "timeout error"), AggregateError = subError("AggregateError", "aggregate error");
  try {
    _TypeError = TypeError, _RangeError = RangeError;
  } catch (e) {
    _TypeError = subError("TypeError", "type error"), _RangeError = subError("RangeError", "range error");
  }
  for (var methods = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), i = 0; i < methods.length; ++i) "function" == typeof Array.prototype[methods[i]] && (AggregateError.prototype[methods[i]] = Array.prototype[methods[i]]);
  es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: !1,
    writable: !0,
    enumerable: !0
  }), AggregateError.prototype.isOperational = !0;
  var level = 0;
  function OperationalError(message) {
    if (!(this instanceof OperationalError)) return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError"), notEnumerableProp(this, "message", message), 
    this.cause = message, this.isOperational = !0, message instanceof Error ? (notEnumerableProp(this, "message", message.message), 
    notEnumerableProp(this, "stack", message.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
  AggregateError.prototype.toString = function() {
    var indent = Array(4 * level + 1).join(" "), ret = "\n" + indent + "AggregateError of:\n";
    level++, indent = Array(4 * level + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
      for (var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "", lines = str.split("\n"), j = 0; j < lines.length; ++j) lines[j] = indent + lines[j];
      ret += (str = lines.join("\n")) + "\n";
    }
    return level--, ret;
  }, inherits(OperationalError, Error);
  var errorTypes = Error.__BluebirdErrorTypes__;
  errorTypes || (errorTypes = Objectfreeze({
    CancellationError: CancellationError,
    TimeoutError: TimeoutError,
    OperationalError: OperationalError,
    RejectionError: OperationalError,
    AggregateError: AggregateError
  }), es5.defineProperty(Error, "__BluebirdErrorTypes__", {
    value: errorTypes,
    writable: !1,
    enumerable: !1,
    configurable: !1
  })), module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
  };
}, function(module, exports) {
  var isES5 = function() {
    "use strict";
    return void 0 === this;
  }();
  if (isES5) module.exports = {
    freeze: Object.freeze,
    defineProperty: Object.defineProperty,
    getDescriptor: Object.getOwnPropertyDescriptor,
    keys: Object.keys,
    names: Object.getOwnPropertyNames,
    getPrototypeOf: Object.getPrototypeOf,
    isArray: Array.isArray,
    isES5: isES5,
    propertyIsWritable: function(obj, prop) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      return !(descriptor && !descriptor.writable && !descriptor.set);
    }
  }; else {
    var has = {}.hasOwnProperty, str = {}.toString, proto = {}.constructor.prototype, ObjectKeys = function(o) {
      var ret = [];
      for (var key in o) has.call(o, key) && ret.push(key);
      return ret;
    };
    module.exports = {
      isArray: function(obj) {
        try {
          return "[object Array]" === str.call(obj);
        } catch (e) {
          return !1;
        }
      },
      keys: ObjectKeys,
      names: ObjectKeys,
      defineProperty: function(o, key, desc) {
        return o[key] = desc.value, o;
      },
      getDescriptor: function(o, key) {
        return {
          value: o[key]
        };
      },
      freeze: function(obj) {
        return obj;
      },
      getPrototypeOf: function(obj) {
        try {
          return Object(obj).constructor.prototype;
        } catch (e) {
          return proto;
        }
      },
      isES5: isES5,
      propertyIsWritable: function() {
        return !0;
      }
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  class FiggyPudding {
    constructor(specs, opts, providers) {
      this.__specs = specs || {}, Object.keys(this.__specs).forEach(alias => {
        if ("string" == typeof this.__specs[alias]) {
          const key = this.__specs[alias], realSpec = this.__specs[key];
          if (!realSpec) throw new Error(`Alias refers to invalid key: ${key} -> ${alias}`);
          {
            const aliasArr = realSpec.aliases || [];
            aliasArr.push(alias, key), realSpec.aliases = [ ...new Set(aliasArr) ], this.__specs[alias] = realSpec;
          }
        }
      }), this.__opts = opts || {}, this.__providers = reverse(providers.filter(x => null != x && "object" == typeof x)), 
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
      return this.forEach((val, key) => {
        obj[key] = val;
      }), obj;
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
    const util = __webpack_require__(9);
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
      throw Object.assign(new Error("invalid config key requested: " + key), {
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
    return arr.forEach(x => ret.unshift(x)), ret;
  }
  function entries(obj) {
    return Object.keys(obj).map(k => [ k, obj[k] ]);
  }
  module.exports = function(specs, opts) {
    return function(...providers) {
      return new Proxy(new FiggyPudding(specs, opts, providers), proxyHandler);
    };
  };
}, function(module, exports, __webpack_require__) {
  module.exports = rimraf, rimraf.sync = rimrafSync;
  var assert = __webpack_require__(27), path = __webpack_require__(1), fs = __webpack_require__(3), glob = void 0;
  try {
    glob = __webpack_require__(29);
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
}, function(module, exports) {
  module.exports = require("util");
}, function(module, exports, __webpack_require__) {
  var gracefulQueue, previousSymbol, fs = __webpack_require__(3), polyfills = __webpack_require__(68), legacy = __webpack_require__(70), clone = __webpack_require__(71), util = __webpack_require__(9);
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
      debug(fs[gracefulQueue]), __webpack_require__(27).equal(fs[gracefulQueue].length, 0);
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
  "use strict";
  const BB = __webpack_require__(2), contentPath = __webpack_require__(12), crypto = __webpack_require__(18), figgyPudding = __webpack_require__(7), fixOwner = __webpack_require__(15), fs = __webpack_require__(10), hashToSegments = __webpack_require__(24), ms = __webpack_require__(4), path = __webpack_require__(1), ssri = __webpack_require__(13), Y = __webpack_require__(16), indexV = __webpack_require__(23)["cache-version"].index, appendFileAsync = BB.promisify(fs.appendFile), readFileAsync = BB.promisify(fs.readFile), readdirAsync = BB.promisify(fs.readdir), concat = ms.concat, from = ms.from;
  module.exports.NotFoundError = class extends Error {
    constructor(cache, key) {
      super(Y`No cache entry for \`${key}\` found in \`${cache}\``), this.code = "ENOENT", 
      this.cache = cache, this.key = key;
    }
  };
  const IndexOpts = figgyPudding({
    metadata: {},
    size: {}
  });
  function insert(cache, key, integrity, opts) {
    opts = IndexOpts(opts);
    const bucket = bucketPath(cache, key), entry = {
      key: key,
      integrity: integrity && ssri.stringify(integrity),
      time: Date.now(),
      size: opts.size,
      metadata: opts.metadata
    };
    return fixOwner.mkdirfix(cache, path.dirname(bucket)).then(() => {
      const stringified = JSON.stringify(entry);
      return appendFileAsync(bucket, `\n${hashEntry(stringified)}\t${stringified}`);
    }).then(() => fixOwner.chownr(cache, bucket)).catch({
      code: "ENOENT"
    }, () => {}).then(() => formatEntry(cache, entry));
  }
  function insertSync(cache, key, integrity, opts) {
    opts = IndexOpts(opts);
    const bucket = bucketPath(cache, key), entry = {
      key: key,
      integrity: integrity && ssri.stringify(integrity),
      time: Date.now(),
      size: opts.size,
      metadata: opts.metadata
    };
    fixOwner.mkdirfix.sync(cache, path.dirname(bucket));
    const stringified = JSON.stringify(entry);
    fs.appendFileSync(bucket, `\n${hashEntry(stringified)}\t${stringified}`);
    try {
      fixOwner.chownr.sync(cache, bucket);
    } catch (err) {
      if ("ENOENT" !== err.code) throw err;
    }
    return formatEntry(cache, entry);
  }
  function lsStream(cache) {
    const indexDir = bucketDir(cache), stream = from.obj();
    return readdirOrEmpty(indexDir).map(bucket => {
      const bucketPath = path.join(indexDir, bucket);
      return readdirOrEmpty(bucketPath).map(subbucket => {
        const subbucketPath = path.join(bucketPath, subbucket);
        return readdirOrEmpty(subbucketPath).map(entry => bucketEntries(path.join(subbucketPath, entry)).reduce((acc, entry) => (acc.set(entry.key, entry), 
        acc), new Map).then(reduced => {
          for (let entry of reduced.values()) {
            const formatted = formatEntry(cache, entry);
            formatted && stream.push(formatted);
          }
        }).catch({
          code: "ENOENT"
        }, nop));
      });
    }).then(() => {
      stream.push(null);
    }, err => {
      stream.emit("error", err);
    }), stream;
  }
  function bucketEntries(bucket, filter) {
    return readFileAsync(bucket, "utf8").then(data => _bucketEntries(data, filter));
  }
  function _bucketEntries(data, filter) {
    let entries = [];
    return data.split("\n").forEach(entry => {
      if (!entry) return;
      const pieces = entry.split("\t");
      if (!pieces[1] || hashEntry(pieces[1]) !== pieces[0]) return;
      let obj;
      try {
        obj = JSON.parse(pieces[1]);
      } catch (e) {
        return;
      }
      obj && entries.push(obj);
    }), entries;
  }
  function bucketDir(cache) {
    return path.join(cache, "index-v" + indexV);
  }
  function bucketPath(cache, key) {
    const hashed = hashKey(key);
    return path.join.apply(path, [ bucketDir(cache) ].concat(hashToSegments(hashed)));
  }
  function hashKey(key) {
    return hash(key, "sha256");
  }
  function hashEntry(str) {
    return hash(str, "sha1");
  }
  function hash(str, digest) {
    return crypto.createHash(digest).update(str).digest("hex");
  }
  function formatEntry(cache, entry) {
    return entry.integrity ? {
      key: entry.key,
      integrity: entry.integrity,
      path: contentPath(cache, entry.integrity),
      size: entry.size,
      time: entry.time,
      metadata: entry.metadata
    } : null;
  }
  function readdirOrEmpty(dir) {
    return readdirAsync(dir).catch({
      code: "ENOENT"
    }, () => []).catch({
      code: "ENOTDIR"
    }, () => []);
  }
  function nop() {}
  module.exports.insert = insert, module.exports.insert.sync = insertSync, module.exports.find = function(cache, key) {
    return bucketEntries(bucketPath(cache, key)).then(entries => entries.reduce((latest, next) => next && next.key === key ? formatEntry(cache, next) : latest, null)).catch(err => {
      if ("ENOENT" === err.code) return null;
      throw err;
    });
  }, module.exports.find.sync = function(cache, key) {
    const bucket = bucketPath(cache, key);
    try {
      return function(bucket, filter) {
        return _bucketEntries(fs.readFileSync(bucket, "utf8"), filter);
      }(bucket).reduce((latest, next) => next && next.key === key ? formatEntry(cache, next) : latest, null);
    } catch (err) {
      if ("ENOENT" === err.code) return null;
      throw err;
    }
  }, module.exports.delete = function(cache, key, opts) {
    return insert(cache, key, null, opts);
  }, module.exports.delete.sync = function(cache, key, opts) {
    return insertSync(cache, key, null, opts);
  }, module.exports.lsStream = lsStream, module.exports.ls = function(cache) {
    return BB.fromNode(cb => {
      lsStream(cache).on("error", cb).pipe(concat(entries => {
        cb(null, entries.reduce((acc, xs) => (acc[xs.key] = xs, acc), {}));
      }));
    });
  }, module.exports._bucketDir = bucketDir, module.exports._bucketPath = bucketPath, 
  module.exports._hashKey = hashKey, module.exports._hashEntry = hashEntry;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const contentVer = __webpack_require__(23)["cache-version"].content, hashToSegments = __webpack_require__(24), path = __webpack_require__(1), ssri = __webpack_require__(13);
  function contentDir(cache) {
    return path.join(cache, "content-v" + contentVer);
  }
  module.exports = function(cache, integrity) {
    const sri = ssri.parse(integrity, {
      single: !0
    });
    return path.join.apply(path, [ contentDir(cache), sri.algorithm ].concat(hashToSegments(sri.hexDigest())));
  }, module.exports._contentDir = contentDir;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const crypto = __webpack_require__(18), figgyPudding = __webpack_require__(7), Transform = __webpack_require__(14).Transform, SPEC_ALGORITHMS = [ "sha256", "sha384", "sha512" ], BASE64_REGEX = /^[a-z0-9+/]+(?:=?=?)$/i, SRI_REGEX = /^([^-]+)-([^?]+)([?\S*]*)$/, STRICT_SRI_REGEX = /^([^-]+)-([A-Za-z0-9+/=]{44,88})(\?[\x21-\x7E]*)?$/, VCHAR_REGEX = /^[\x21-\x7E]+$/, SsriOpts = figgyPudding({
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
      if (strict && !SPEC_ALGORITHMS.some(a => a === match[1])) return;
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
      if ((opts = SsriOpts(opts)).strict && !(SPEC_ALGORITHMS.some(x => x === this.algorithm) && this.digest.match(BASE64_REGEX) && (this.options || []).every(opt => opt.match(VCHAR_REGEX)))) return "";
      const options = this.options && this.options.length ? "?" + this.options.join("?") : "";
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
      return opts.strict && (sep = sep.replace(/\S+/g, " ")), Object.keys(this).map(k => this[k].map(hash => Hash.prototype.toString.call(hash, opts)).filter(x => x.length).join(sep)).filter(x => x.length).join(sep);
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
      return this[algo] && other[algo] && this[algo].find(hash => other[algo].find(otherhash => hash.digest === otherhash.digest)) || !1;
    }
    pickAlgorithm(opts) {
      const pickAlgorithm = (opts = SsriOpts(opts)).pickAlgorithm, keys = Object.keys(this);
      if (!keys.length) throw new Error("No algorithms available for " + JSON.stringify(this.toString()));
      return keys.reduce((acc, algo) => pickAlgorithm(acc, algo) || acc);
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
    return opts.single ? new Hash(integrity, opts) : integrity.trim().split(/\s+/).reduce((acc, string) => {
      const hash = new Hash(string, opts);
      if (hash.algorithm && hash.digest) {
        const algo = hash.algorithm;
        acc[algo] || (acc[algo] = []), acc[algo].push(hash);
      }
      return acc;
    }, new Integrity);
  }
  function stringify(obj, opts) {
    return opts = SsriOpts(opts), obj.algorithm && obj.digest ? Hash.prototype.toString.call(obj, opts) : "string" == typeof obj ? stringify(parse(obj, opts), opts) : Integrity.prototype.toString.call(obj, opts);
  }
  function integrityStream(opts) {
    const sri = (opts = SsriOpts(opts)).integrity && parse(opts.integrity, opts), goodSri = sri && Object.keys(sri).length, algorithm = goodSri && sri.pickAlgorithm(opts), digests = goodSri && sri[algorithm], algorithms = Array.from(new Set(opts.algorithms.concat(algorithm ? [ algorithm ] : []))), hashes = algorithms.map(crypto.createHash);
    let streamSize = 0;
    const stream = new Transform({
      transform(chunk, enc, cb) {
        streamSize += chunk.length, hashes.forEach(h => h.update(chunk, enc)), cb(null, chunk, enc);
      }
    }).on("end", () => {
      const optString = opts.options && opts.options.length ? "?" + opts.options.join("?") : "", newSri = parse(hashes.map((h, i) => `${algorithms[i]}-${h.digest("base64")}${optString}`).join(" "), opts), match = goodSri && newSri.match(sri, opts);
      if ("number" == typeof opts.size && streamSize !== opts.size) {
        const err = new Error(`stream size mismatch when checking ${sri}.\n  Wanted: ${opts.size}\n  Found: ${streamSize}`);
        err.code = "EBADSIZE", err.found = streamSize, err.expected = opts.size, err.sri = sri, 
        stream.emit("error", err);
      } else if (opts.integrity && !match) {
        const err = new Error(`${sri} integrity checksum failed when using ${algorithm}: wanted ${digests} but got ${newSri}. (${streamSize} bytes)`);
        err.code = "EINTEGRITY", err.found = newSri, err.expected = digests, err.algorithm = algorithm, 
        err.sri = sri, stream.emit("error", err);
      } else stream.emit("size", streamSize), stream.emit("integrity", newSri), match && stream.emit("verified", match);
    });
    return stream;
  }
  module.exports.parse = parse, module.exports.stringify = stringify, module.exports.fromHex = function(hexDigest, algorithm, opts) {
    const optString = (opts = SsriOpts(opts)).options && opts.options.length ? "?" + opts.options.join("?") : "";
    return parse(`${algorithm}-${Buffer.from(hexDigest, "hex").toString("base64")}${optString}`, opts);
  }, module.exports.fromData = function(data, opts) {
    const algorithms = (opts = SsriOpts(opts)).algorithms, optString = opts.options && opts.options.length ? "?" + opts.options.join("?") : "";
    return algorithms.reduce((acc, algo) => {
      const digest = crypto.createHash(algo).update(data).digest("base64"), hash = new Hash(`${algo}-${digest}${optString}`, opts);
      if (hash.algorithm && hash.digest) {
        const algo = hash.algorithm;
        acc[algo] || (acc[algo] = []), acc[algo].push(hash);
      }
      return acc;
    }, new Integrity);
  }, module.exports.fromStream = function(stream, opts) {
    const P = (opts = SsriOpts(opts)).Promise || Promise, istream = integrityStream(opts);
    return new P((resolve, reject) => {
      let sri;
      stream.pipe(istream), stream.on("error", reject), istream.on("error", reject), istream.on("integrity", s => {
        sri = s;
      }), istream.on("end", () => resolve(sri)), istream.on("data", () => {});
    });
  }, module.exports.checkData = function(data, sri, opts) {
    if (opts = SsriOpts(opts), sri = parse(sri, opts), !Object.keys(sri).length) {
      if (opts.error) throw Object.assign(new Error("No valid integrity hashes to check against"), {
        code: "EINTEGRITY"
      });
      return !1;
    }
    const algorithm = sri.pickAlgorithm(opts), digest = crypto.createHash(algorithm).update(data).digest("base64"), newSri = parse({
      algorithm: algorithm,
      digest: digest
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
    return new P((resolve, reject) => {
      let sri;
      stream.pipe(checker), stream.on("error", reject), checker.on("error", reject), checker.on("verified", s => {
        sri = s;
      }), checker.on("end", () => resolve(sri)), checker.on("data", () => {});
    });
  }, module.exports.integrityStream = integrityStream, module.exports.create = function(opts) {
    const algorithms = (opts = SsriOpts(opts)).algorithms, optString = opts.options.length ? "?" + opts.options.join("?") : "", hashes = algorithms.map(crypto.createHash);
    return {
      update: function(chunk, enc) {
        return hashes.forEach(h => h.update(chunk, enc)), this;
      },
      digest: function(enc) {
        return algorithms.reduce((acc, algo) => {
          const digest = hashes.shift().digest("base64"), hash = new Hash(`${algo}-${digest}${optString}`, opts);
          if (hash.algorithm && hash.digest) {
            const algo = hash.algorithm;
            acc[algo] || (acc[algo] = []), acc[algo].push(hash);
          }
          return acc;
        }, new Integrity);
      }
    };
  };
  const NODE_HASHES = new Set(crypto.getHashes()), DEFAULT_PRIORITY = [ "md5", "whirlpool", "sha1", "sha224", "sha256", "sha384", "sha512", "sha3", "sha3-256", "sha3-384", "sha3-512", "sha3_256", "sha3_384", "sha3_512" ].filter(algo => NODE_HASHES.has(algo));
  function getPrioritizedHash(algo1, algo2) {
    return DEFAULT_PRIORITY.indexOf(algo1.toLowerCase()) >= DEFAULT_PRIORITY.indexOf(algo2.toLowerCase()) ? algo1 : algo2;
  }
}, function(module, exports) {
  module.exports = require("stream");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), chownr = BB.promisify(__webpack_require__(66)), mkdirp = BB.promisify(__webpack_require__(25)), inflight = __webpack_require__(26), inferOwner = __webpack_require__(67), self = {
    uid: null,
    gid: null
  }, getSelf = () => {
    if ("number" != typeof self.uid) {
      self.uid = process.getuid();
      const setuid = process.setuid;
      process.setuid = uid => (self.uid = null, process.setuid = setuid, process.setuid(uid));
    }
    if ("number" != typeof self.gid) {
      self.gid = process.getgid();
      const setgid = process.setgid;
      process.setgid = gid => (self.gid = null, process.setgid = setgid, process.setgid(gid));
    }
  };
  function fixOwner(cache, filepath) {
    return process.getuid ? (getSelf(), 0 !== self.uid ? BB.resolve() : BB.resolve(inferOwner(cache)).then(owner => {
      const {uid: uid, gid: gid} = owner;
      if (self.uid !== uid || self.gid !== gid) return inflight("fixOwner: fixing ownership on " + filepath, () => chownr(filepath, "number" == typeof uid ? uid : self.uid, "number" == typeof gid ? gid : self.gid).catch({
        code: "ENOENT"
      }, () => null));
    })) : BB.resolve();
  }
  function fixOwnerSync(cache, filepath) {
    if (!process.getuid) return;
    const {uid: uid, gid: gid} = inferOwner.sync(cache);
    if (getSelf(), self.uid !== uid || self.gid !== gid) try {
      chownr.sync(filepath, "number" == typeof uid ? uid : self.uid, "number" == typeof gid ? gid : self.gid);
    } catch (err) {
      if ("ENOENT" === err.code) return null;
      throw err;
    }
  }
  module.exports.chownr = fixOwner, module.exports.chownr.sync = fixOwnerSync, module.exports.mkdirfix = function(cache, p, cb) {
    return BB.resolve(inferOwner(cache)).then(() => mkdirp(p).then(made => {
      if (made) return fixOwner(cache, made).then(() => made);
    }).catch({
      code: "EEXIST"
    }, () => fixOwner(cache, p).then(() => null)));
  }, module.exports.mkdirfix.sync = function(cache, p) {
    try {
      inferOwner.sync(cache);
      const made = mkdirp.sync(p);
      if (made) return fixOwnerSync(cache, made), made;
    } catch (err) {
      if ("EEXIST" === err.code) return fixOwnerSync(cache, p), null;
      throw err;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(1), y18n = __webpack_require__(72)({
    directory: path.join(__dirname, "../../locales"),
    locale: "en",
    updateFiles: "true" === process.env.CACACHE_UPDATE_LOCALE_FILES
  });
  module.exports = function(parts) {
    let str = "";
    return parts.forEach((part, i) => {
      str += part, arguments[i + 1] && (str += "%s");
    }), y18n.__.apply(null, [ str ].concat([].slice.call(arguments, 1)));
  }, module.exports.setLocale = locale => {
    y18n.setLocale(locale);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  let MEMOIZED = new (__webpack_require__(74))({
    max: 52428800,
    maxAge: 18e4,
    length: (entry, key) => key.startsWith("key:") ? entry.data.length : key.startsWith("digest:") ? entry.length : void 0
  });
  function putDigest(cache, integrity, data, opts) {
    pickMem(opts).set(`digest:${cache}:${integrity}`, data);
  }
  module.exports.clearMemoized = function() {
    const old = {};
    return MEMOIZED.forEach((v, k) => {
      old[k] = v;
    }), MEMOIZED.reset(), old;
  }, module.exports.put = function(cache, entry, data, opts) {
    pickMem(opts).set(`key:${cache}:${entry.key}`, {
      entry: entry,
      data: data
    }), putDigest(cache, entry.integrity, data, opts);
  }, module.exports.put.byDigest = putDigest, module.exports.get = function(cache, key, opts) {
    return pickMem(opts).get(`key:${cache}:${key}`);
  }, module.exports.get.byDigest = function(cache, integrity, opts) {
    return pickMem(opts).get(`digest:${cache}:${integrity}`);
  };
  class ObjProxy {
    constructor(obj) {
      this.obj = obj;
    }
    get(key) {
      return this.obj[key];
    }
    set(key, val) {
      this.obj[key] = val;
    }
  }
  function pickMem(opts) {
    return opts && opts.memoize ? opts.memoize.get && opts.memoize.set ? opts.memoize : "object" == typeof opts.memoize ? new ObjProxy(opts.memoize) : MEMOIZED : MEMOIZED;
  }
}, function(module, exports) {
  module.exports = require("crypto");
}, function(module, exports, __webpack_require__) {
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
}, function(module, exports) {
  module.exports = require("async_hooks");
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(NEXT_FILTER) {
    var util = __webpack_require__(0), getKeys = __webpack_require__(6).keys, tryCatch = util.tryCatch, errorObj = util.errorObj;
    return function(instances, cb, promise) {
      return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
          var item = instances[i];
          if (item === Error || null != item && item.prototype instanceof Error) {
            if (e instanceof item) return tryCatch(cb).call(boundTo, e);
          } else if ("function" == typeof item) {
            var matchesPredicate = tryCatch(item).call(boundTo, e);
            if (matchesPredicate === errorObj) return matchesPredicate;
            if (matchesPredicate) return tryCatch(cb).call(boundTo, e);
          } else if (util.isObject(e)) {
            for (var keys = getKeys(item), j = 0; j < keys.length; ++j) {
              var key = keys[j];
              if (item[key] != e[key]) continue predicateLoop;
            }
            return tryCatch(cb).call(boundTo, e);
          }
        }
        return NEXT_FILTER;
      };
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var util = __webpack_require__(0), maybeWrapAsError = util.maybeWrapAsError, OperationalError = __webpack_require__(5).OperationalError, es5 = __webpack_require__(6);
  var rErrorKey = /^(?:name|message|stack|cause)$/;
  function wrapAsOperationalError(obj) {
    var ret;
    if (function(obj) {
      return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
    }(obj)) {
      (ret = new OperationalError(obj)).name = obj.name, ret.message = obj.message, ret.stack = obj.stack;
      for (var keys = es5.keys(obj), i = 0; i < keys.length; ++i) {
        var key = keys[i];
        rErrorKey.test(key) || (ret[key] = obj[key]);
      }
      return ret;
    }
    return util.markAsOriginatingFromRejection(obj), obj;
  }
  module.exports = function(promise, multiArgs) {
    return function(err, value) {
      if (null !== promise) {
        if (err) {
          var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
          promise._attachExtraTrace(wrapped), promise._reject(wrapped);
        } else if (multiArgs) {
          for (var $_len = arguments.length, args = new Array(Math.max($_len - 1, 0)), $_i = 1; $_i < $_len; ++$_i) args[$_i - 1] = arguments[$_i];
          promise._fulfill(args);
        } else promise._fulfill(value);
        promise = null;
      }
    };
  };
}, function(module) {
  module.exports = JSON.parse('{"name":"cacache","publishConfig":{"tag":"legacy"},"version":"12.0.4","cache-version":{"content":"2","index":"5"}}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(hash) {
    return [ hash.slice(0, 2), hash.slice(2, 4), hash.slice(4) ];
  };
}, function(module, exports, __webpack_require__) {
  var path = __webpack_require__(1), fs = __webpack_require__(3), _0777 = parseInt("0777", 8);
  function mkdirP(p, opts, f, made) {
    "function" == typeof opts ? (f = opts, opts = {}) : opts && "object" == typeof opts || (opts = {
      mode: opts
    });
    var mode = opts.mode, xfs = opts.fs || fs;
    void 0 === mode && (mode = _0777), made || (made = null);
    var cb = f || function() {};
    p = path.resolve(p), xfs.mkdir(p, mode, (function(er) {
      if (!er) return cb(null, made = made || p);
      switch (er.code) {
       case "ENOENT":
        if (path.dirname(p) === p) return cb(er);
        mkdirP(path.dirname(p), opts, (function(er, made) {
          er ? cb(er, made) : mkdirP(p, opts, cb, made);
        }));
        break;

       default:
        xfs.stat(p, (function(er2, stat) {
          er2 || !stat.isDirectory() ? cb(er, made) : cb(null, made);
        }));
      }
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
      switch (err0.code) {
       case "ENOENT":
        made = sync(path.dirname(p), opts, made), sync(p, opts, made);
        break;

       default:
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  let Bluebird;
  module.exports = inflight;
  try {
    Bluebird = __webpack_require__(2);
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
}, function(module, exports) {
  module.exports = require("assert");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), contentPath = __webpack_require__(12), figgyPudding = __webpack_require__(7), fs = __webpack_require__(10), PassThrough = __webpack_require__(14).PassThrough, pipe = BB.promisify(__webpack_require__(4).pipe), ssri = __webpack_require__(13), Y = __webpack_require__(16), lstatAsync = BB.promisify(fs.lstat), readFileAsync = BB.promisify(fs.readFile), ReadOpts = figgyPudding({
    size: {}
  });
  function readStream(cache, integrity, opts) {
    opts = ReadOpts(opts);
    const stream = new PassThrough;
    return withContentSri(cache, integrity, (cpath, sri) => lstatAsync(cpath).then(stat => ({
      cpath: cpath,
      sri: sri,
      stat: stat
    }))).then(({cpath: cpath, sri: sri, stat: stat}) => pipe(fs.createReadStream(cpath), ssri.integrityStream({
      integrity: sri,
      size: opts.size
    }), stream)).catch(err => {
      stream.emit("error", err);
    }), stream;
  }
  let copyFileAsync;
  function withContentSri(cache, integrity, fn) {
    return BB.try(() => {
      const sri = ssri.parse(integrity), algo = sri.pickAlgorithm(), digests = sri[algo];
      if (digests.length <= 1) {
        const cpath = contentPath(cache, digests[0]);
        return fn(cpath, digests[0]);
      }
      return BB.any(sri[sri.pickAlgorithm()].map(meta => withContentSri(cache, meta, fn), {
        concurrency: 1
      })).catch(err => {
        throw [].some.call(err, e => "ENOENT" === e.code) ? Object.assign(new Error("No matching content found for " + sri.toString()), {
          code: "ENOENT"
        }) : err[0];
      });
    });
  }
  function withContentSriSync(cache, integrity, fn) {
    const sri = ssri.parse(integrity), algo = sri.pickAlgorithm(), digests = sri[algo];
    if (digests.length <= 1) {
      return fn(contentPath(cache, digests[0]), digests[0]);
    }
    {
      let lastErr = null;
      for (const meta of sri[sri.pickAlgorithm()]) try {
        return withContentSriSync(cache, meta, fn);
      } catch (err) {
        lastErr = err;
      }
      if (lastErr) throw lastErr;
    }
  }
  function sizeError(expected, found) {
    var err = new Error(Y`Bad data size: expected inserted data to be ${expected} bytes, but got ${found} instead`);
    return err.expected = expected, err.found = found, err.code = "EBADSIZE", err;
  }
  function integrityError(sri, path) {
    var err = new Error(Y`Integrity verification failed for ${sri} (${path})`);
    return err.code = "EINTEGRITY", err.sri = sri, err.path = path, err;
  }
  module.exports = function(cache, integrity, opts) {
    return opts = ReadOpts(opts), withContentSri(cache, integrity, (cpath, sri) => readFileAsync(cpath, null).then(data => {
      if ("number" == typeof opts.size && opts.size !== data.length) throw sizeError(opts.size, data.length);
      if (ssri.checkData(data, sri)) return data;
      throw integrityError(sri, cpath);
    }));
  }, module.exports.sync = function(cache, integrity, opts) {
    return opts = ReadOpts(opts), withContentSriSync(cache, integrity, (cpath, sri) => {
      const data = fs.readFileSync(cpath);
      if ("number" == typeof opts.size && opts.size !== data.length) throw sizeError(opts.size, data.length);
      if (ssri.checkData(data, sri)) return data;
      throw integrityError(sri, cpath);
    });
  }, module.exports.stream = readStream, module.exports.readStream = readStream, fs.copyFile && (module.exports.copy = function(cache, integrity, dest, opts) {
    return opts = ReadOpts(opts), withContentSri(cache, integrity, (cpath, sri) => copyFileAsync(cpath, dest));
  }, module.exports.copy.sync = function(cache, integrity, dest, opts) {
    return opts = ReadOpts(opts), withContentSriSync(cache, integrity, (cpath, sri) => fs.copyFileSync(cpath, dest));
  }, copyFileAsync = BB.promisify(fs.copyFile)), module.exports.hasContent = function(cache, integrity) {
    if (!integrity) return BB.resolve(!1);
    return withContentSri(cache, integrity, (cpath, sri) => lstatAsync(cpath).then(stat => ({
      size: stat.size,
      sri: sri,
      stat: stat
    }))).catch(err => {
      if ("ENOENT" === err.code) return !1;
      if ("EPERM" === err.code) {
        if ("win32" !== process.platform) throw err;
        return !1;
      }
    });
  }, module.exports.hasContent.sync = function(cache, integrity) {
    if (!integrity) return !1;
    return withContentSriSync(cache, integrity, (cpath, sri) => {
      try {
        const stat = fs.lstatSync(cpath);
        return {
          size: stat.size,
          sri: sri,
          stat: stat
        };
      } catch (err) {
        if ("ENOENT" === err.code) return !1;
        if ("EPERM" === err.code) {
          if ("win32" !== process.platform) throw err;
          return !1;
        }
      }
    });
  };
}, function(module, exports) {
  module.exports = require("./glob");
}, function(module, exports, __webpack_require__) {
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = RunQueue;
  var validate = __webpack_require__(19);
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
      cmd: cmd,
      args: args
    }), this.currentPrio > prio && (this.currentQueue = this.queue[prio], this.currentPrio = prio);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var path = __webpack_require__(1), uniqueSlug = __webpack_require__(86);
  module.exports = function(filepath, prefix, uniq) {
    return path.join(filepath, (prefix ? prefix + "-" : "") + uniqueSlug(uniq));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = __webpack_require__(34);
}, function(module, exports, __webpack_require__) {
  "use strict";
  const ls = __webpack_require__(35), get = __webpack_require__(73), put = __webpack_require__(77), rm = __webpack_require__(87), verify = __webpack_require__(89), setLocale = __webpack_require__(16).setLocale, clearMemoized = __webpack_require__(17).clearMemoized, tmp = __webpack_require__(91);
  setLocale("en");
  const x = module.exports;
  x.ls = cache => ls(cache), x.ls.stream = cache => ls.stream(cache), x.get = (cache, key, opts) => get(cache, key, opts), 
  x.get.byDigest = (cache, hash, opts) => get.byDigest(cache, hash, opts), x.get.sync = (cache, key, opts) => get.sync(cache, key, opts), 
  x.get.sync.byDigest = (cache, key, opts) => get.sync.byDigest(cache, key, opts), 
  x.get.stream = (cache, key, opts) => get.stream(cache, key, opts), x.get.stream.byDigest = (cache, hash, opts) => get.stream.byDigest(cache, hash, opts), 
  x.get.copy = (cache, key, dest, opts) => get.copy(cache, key, dest, opts), x.get.copy.byDigest = (cache, hash, dest, opts) => get.copy.byDigest(cache, hash, dest, opts), 
  x.get.info = (cache, key) => get.info(cache, key), x.get.hasContent = (cache, hash) => get.hasContent(cache, hash), 
  x.get.hasContent.sync = (cache, hash) => get.hasContent.sync(cache, hash), x.put = (cache, key, data, opts) => put(cache, key, data, opts), 
  x.put.stream = (cache, key, opts) => put.stream(cache, key, opts), x.rm = (cache, key) => rm.entry(cache, key), 
  x.rm.all = cache => rm.all(cache), x.rm.entry = x.rm, x.rm.content = (cache, hash) => rm.content(cache, hash), 
  x.setLocale = lang => setLocale(lang), x.clearMemoized = () => clearMemoized(), 
  x.tmp = {}, x.tmp.mkdir = (cache, opts) => tmp.mkdir(cache, opts), x.tmp.withTmp = (cache, opts, cb) => tmp.withTmp(cache, opts, cb), 
  x.verify = (cache, opts) => verify(cache, opts), x.verify.lastRun = cache => verify.lastRun(cache);
}, function(module, exports, __webpack_require__) {
  "use strict";
  var index = __webpack_require__(11);
  module.exports = index.ls, module.exports.stream = index.lsStream;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function() {
    var makeSelfResolutionError = function() {
      return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
    }, reflectHandler = function() {
      return new Promise.PromiseInspection(this._target());
    }, apiRejection = function(msg) {
      return Promise.reject(new TypeError(msg));
    };
    function Proxyable() {}
    var UNDEFINED_BINDING = {}, util = __webpack_require__(0);
    util.setReflectHandler(reflectHandler);
    var getDomain = function() {
      var domain = process.domain;
      return void 0 === domain ? null : domain;
    }, getContextDomain = function() {
      return {
        domain: getDomain(),
        async: null
      };
    }, AsyncResource = util.isNode && util.nodeSupportsAsyncResource ? __webpack_require__(20).AsyncResource : null, getContextAsyncHooks = function() {
      return {
        domain: getDomain(),
        async: new AsyncResource("Bluebird::Promise")
      };
    }, getContext = util.isNode ? getContextDomain : function() {
      return null;
    };
    util.notEnumerableProp(Promise, "_getContext", getContext);
    var es5 = __webpack_require__(6), Async = __webpack_require__(37), async = new Async;
    es5.defineProperty(Promise, "_async", {
      value: async
    });
    var errors = __webpack_require__(5), TypeError = Promise.TypeError = errors.TypeError;
    Promise.RangeError = errors.RangeError;
    var CancellationError = Promise.CancellationError = errors.CancellationError;
    Promise.TimeoutError = errors.TimeoutError, Promise.OperationalError = errors.OperationalError, 
    Promise.RejectionError = errors.OperationalError, Promise.AggregateError = errors.AggregateError;
    var INTERNAL = function() {}, APPLY = {}, NEXT_FILTER = {}, tryConvertToPromise = __webpack_require__(40)(Promise, INTERNAL), PromiseArray = __webpack_require__(41)(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable), Context = __webpack_require__(42)(Promise), createContext = Context.create, debug = __webpack_require__(43)(Promise, Context, (function() {
      getContext = getContextAsyncHooks, util.notEnumerableProp(Promise, "_getContext", getContextAsyncHooks);
    }), (function() {
      getContext = getContextDomain, util.notEnumerableProp(Promise, "_getContext", getContextDomain);
    })), PassThroughHandlerContext = (debug.CapturedTrace, __webpack_require__(44)(Promise, tryConvertToPromise, NEXT_FILTER)), catchFilter = __webpack_require__(21)(NEXT_FILTER), nodebackForPromise = __webpack_require__(22), errorObj = util.errorObj, tryCatch = util.tryCatch;
    function Promise(executor) {
      executor !== INTERNAL && function(self, executor) {
        if (null == self || self.constructor !== Promise) throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
        if ("function" != typeof executor) throw new TypeError("expecting a function but got " + util.classString(executor));
      }(this, executor), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, 
      this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(executor), 
      this._promiseCreated(), this._fireEvent("promiseCreated", this);
    }
    function deferResolve(v) {
      this.promise._resolveCallback(v);
    }
    function deferReject(v) {
      this.promise._rejectCallback(v, !1);
    }
    function fillTypes(value) {
      var p = new Promise(INTERNAL);
      p._fulfillmentHandler0 = value, p._rejectionHandler0 = value, p._promise0 = value, 
      p._receiver0 = value;
    }
    return Promise.prototype.toString = function() {
      return "[object Promise]";
    }, Promise.prototype.caught = Promise.prototype.catch = function(fn) {
      var len = arguments.length;
      if (len > 1) {
        var i, catchInstances = new Array(len - 1), j = 0;
        for (i = 0; i < len - 1; ++i) {
          var item = arguments[i];
          if (!util.isObject(item)) return apiRejection("Catch statement predicate: expecting an object but got " + util.classString(item));
          catchInstances[j++] = item;
        }
        if (catchInstances.length = j, "function" != typeof (fn = arguments[i])) throw new TypeError("The last argument to .catch() must be a function, got " + util.toString(fn));
        return this.then(void 0, catchFilter(catchInstances, fn, this));
      }
      return this.then(void 0, fn);
    }, Promise.prototype.reflect = function() {
      return this._then(reflectHandler, reflectHandler, void 0, this, void 0);
    }, Promise.prototype.then = function(didFulfill, didReject) {
      if (debug.warnings() && arguments.length > 0 && "function" != typeof didFulfill && "function" != typeof didReject) {
        var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
        arguments.length > 1 && (msg += ", " + util.classString(didReject)), this._warn(msg);
      }
      return this._then(didFulfill, didReject, void 0, void 0, void 0);
    }, Promise.prototype.done = function(didFulfill, didReject) {
      this._then(didFulfill, didReject, void 0, void 0, void 0)._setIsFinal();
    }, Promise.prototype.spread = function(fn) {
      return "function" != typeof fn ? apiRejection("expecting a function but got " + util.classString(fn)) : this.all()._then(fn, void 0, void 0, APPLY, void 0);
    }, Promise.prototype.toJSON = function() {
      var ret = {
        isFulfilled: !1,
        isRejected: !1,
        fulfillmentValue: void 0,
        rejectionReason: void 0
      };
      return this.isFulfilled() ? (ret.fulfillmentValue = this.value(), ret.isFulfilled = !0) : this.isRejected() && (ret.rejectionReason = this.reason(), 
      ret.isRejected = !0), ret;
    }, Promise.prototype.all = function() {
      return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), 
      new PromiseArray(this).promise();
    }, Promise.prototype.error = function(fn) {
      return this.caught(util.originatesFromRejection, fn);
    }, Promise.getNewLibraryCopy = module.exports, Promise.is = function(val) {
      return val instanceof Promise;
    }, Promise.fromNode = Promise.fromCallback = function(fn) {
      var ret = new Promise(INTERNAL);
      ret._captureStackTrace();
      var multiArgs = arguments.length > 1 && !!Object(arguments[1]).multiArgs, result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
      return result === errorObj && ret._rejectCallback(result.e, !0), ret._isFateSealed() || ret._setAsyncGuaranteed(), 
      ret;
    }, Promise.all = function(promises) {
      return new PromiseArray(promises).promise();
    }, Promise.cast = function(obj) {
      var ret = tryConvertToPromise(obj);
      return ret instanceof Promise || ((ret = new Promise(INTERNAL))._captureStackTrace(), 
      ret._setFulfilled(), ret._rejectionHandler0 = obj), ret;
    }, Promise.resolve = Promise.fulfilled = Promise.cast, Promise.reject = Promise.rejected = function(reason) {
      var ret = new Promise(INTERNAL);
      return ret._captureStackTrace(), ret._rejectCallback(reason, !0), ret;
    }, Promise.setScheduler = function(fn) {
      if ("function" != typeof fn) throw new TypeError("expecting a function but got " + util.classString(fn));
      return async.setScheduler(fn);
    }, Promise.prototype._then = function(didFulfill, didReject, _, receiver, internalData) {
      var haveInternalData = void 0 !== internalData, promise = haveInternalData ? internalData : new Promise(INTERNAL), target = this._target(), bitField = target._bitField;
      haveInternalData || (promise._propagateFrom(this, 3), promise._captureStackTrace(), 
      void 0 === receiver && 0 != (2097152 & this._bitField) && (receiver = 0 != (50397184 & bitField) ? this._boundValue() : target === this ? void 0 : this._boundTo), 
      this._fireEvent("promiseChained", this, promise));
      var context = getContext();
      if (0 != (50397184 & bitField)) {
        var handler, value, settler = target._settlePromiseCtx;
        0 != (33554432 & bitField) ? (value = target._rejectionHandler0, handler = didFulfill) : 0 != (16777216 & bitField) ? (value = target._fulfillmentHandler0, 
        handler = didReject, target._unsetRejectionIsUnhandled()) : (settler = target._settlePromiseLateCancellationObserver, 
        value = new CancellationError("late cancellation observer"), target._attachExtraTrace(value), 
        handler = didReject), async.invoke(settler, target, {
          handler: util.contextBind(context, handler),
          promise: promise,
          receiver: receiver,
          value: value
        });
      } else target._addCallbacks(didFulfill, didReject, promise, receiver, context);
      return promise;
    }, Promise.prototype._length = function() {
      return 65535 & this._bitField;
    }, Promise.prototype._isFateSealed = function() {
      return 0 != (117506048 & this._bitField);
    }, Promise.prototype._isFollowing = function() {
      return 67108864 == (67108864 & this._bitField);
    }, Promise.prototype._setLength = function(len) {
      this._bitField = -65536 & this._bitField | 65535 & len;
    }, Promise.prototype._setFulfilled = function() {
      this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
    }, Promise.prototype._setRejected = function() {
      this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
    }, Promise.prototype._setFollowing = function() {
      this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
    }, Promise.prototype._setIsFinal = function() {
      this._bitField = 4194304 | this._bitField;
    }, Promise.prototype._isFinal = function() {
      return (4194304 & this._bitField) > 0;
    }, Promise.prototype._unsetCancelled = function() {
      this._bitField = -65537 & this._bitField;
    }, Promise.prototype._setCancelled = function() {
      this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
    }, Promise.prototype._setWillBeCancelled = function() {
      this._bitField = 8388608 | this._bitField;
    }, Promise.prototype._setAsyncGuaranteed = function() {
      if (!async.hasCustomScheduler()) {
        var bitField = this._bitField;
        this._bitField = bitField | (536870912 & bitField) >> 2 ^ 134217728;
      }
    }, Promise.prototype._setNoAsyncGuarantee = function() {
      this._bitField = -134217729 & (536870912 | this._bitField);
    }, Promise.prototype._receiverAt = function(index) {
      var ret = 0 === index ? this._receiver0 : this[4 * index - 4 + 3];
      if (ret !== UNDEFINED_BINDING) return void 0 === ret && this._isBound() ? this._boundValue() : ret;
    }, Promise.prototype._promiseAt = function(index) {
      return this[4 * index - 4 + 2];
    }, Promise.prototype._fulfillmentHandlerAt = function(index) {
      return this[4 * index - 4 + 0];
    }, Promise.prototype._rejectionHandlerAt = function(index) {
      return this[4 * index - 4 + 1];
    }, Promise.prototype._boundValue = function() {}, Promise.prototype._migrateCallback0 = function(follower) {
      follower._bitField;
      var fulfill = follower._fulfillmentHandler0, reject = follower._rejectionHandler0, promise = follower._promise0, receiver = follower._receiverAt(0);
      void 0 === receiver && (receiver = UNDEFINED_BINDING), this._addCallbacks(fulfill, reject, promise, receiver, null);
    }, Promise.prototype._migrateCallbackAt = function(follower, index) {
      var fulfill = follower._fulfillmentHandlerAt(index), reject = follower._rejectionHandlerAt(index), promise = follower._promiseAt(index), receiver = follower._receiverAt(index);
      void 0 === receiver && (receiver = UNDEFINED_BINDING), this._addCallbacks(fulfill, reject, promise, receiver, null);
    }, Promise.prototype._addCallbacks = function(fulfill, reject, promise, receiver, context) {
      var index = this._length();
      if (index >= 65531 && (index = 0, this._setLength(0)), 0 === index) this._promise0 = promise, 
      this._receiver0 = receiver, "function" == typeof fulfill && (this._fulfillmentHandler0 = util.contextBind(context, fulfill)), 
      "function" == typeof reject && (this._rejectionHandler0 = util.contextBind(context, reject)); else {
        var base = 4 * index - 4;
        this[base + 2] = promise, this[base + 3] = receiver, "function" == typeof fulfill && (this[base + 0] = util.contextBind(context, fulfill)), 
        "function" == typeof reject && (this[base + 1] = util.contextBind(context, reject));
      }
      return this._setLength(index + 1), index;
    }, Promise.prototype._proxy = function(proxyable, arg) {
      this._addCallbacks(void 0, void 0, arg, proxyable, null);
    }, Promise.prototype._resolveCallback = function(value, shouldBind) {
      if (0 == (117506048 & this._bitField)) {
        if (value === this) return this._rejectCallback(makeSelfResolutionError(), !1);
        var maybePromise = tryConvertToPromise(value, this);
        if (!(maybePromise instanceof Promise)) return this._fulfill(value);
        shouldBind && this._propagateFrom(maybePromise, 2);
        var promise = maybePromise._target();
        if (promise !== this) {
          var bitField = promise._bitField;
          if (0 == (50397184 & bitField)) {
            var len = this._length();
            len > 0 && promise._migrateCallback0(this);
            for (var i = 1; i < len; ++i) promise._migrateCallbackAt(this, i);
            this._setFollowing(), this._setLength(0), this._setFollowee(maybePromise);
          } else if (0 != (33554432 & bitField)) this._fulfill(promise._value()); else if (0 != (16777216 & bitField)) this._reject(promise._reason()); else {
            var reason = new CancellationError("late cancellation observer");
            promise._attachExtraTrace(reason), this._reject(reason);
          }
        } else this._reject(makeSelfResolutionError());
      }
    }, Promise.prototype._rejectCallback = function(reason, synchronous, ignoreNonErrorWarnings) {
      var trace = util.ensureErrorObject(reason), hasStack = trace === reason;
      if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " + util.classString(reason);
        this._warn(message, !0);
      }
      this._attachExtraTrace(trace, !!synchronous && hasStack), this._reject(reason);
    }, Promise.prototype._resolveFromExecutor = function(executor) {
      if (executor !== INTERNAL) {
        var promise = this;
        this._captureStackTrace(), this._pushContext();
        var synchronous = !0, r = this._execute(executor, (function(value) {
          promise._resolveCallback(value);
        }), (function(reason) {
          promise._rejectCallback(reason, synchronous);
        }));
        synchronous = !1, this._popContext(), void 0 !== r && promise._rejectCallback(r, !0);
      }
    }, Promise.prototype._settlePromiseFromHandler = function(handler, receiver, value, promise) {
      var bitField = promise._bitField;
      if (0 == (65536 & bitField)) {
        var x;
        promise._pushContext(), receiver === APPLY ? value && "number" == typeof value.length ? x = tryCatch(handler).apply(this._boundValue(), value) : (x = errorObj).e = new TypeError("cannot .spread() a non-array: " + util.classString(value)) : x = tryCatch(handler).call(receiver, value);
        var promiseCreated = promise._popContext();
        0 == (65536 & (bitField = promise._bitField)) && (x === NEXT_FILTER ? promise._reject(value) : x === errorObj ? promise._rejectCallback(x.e, !1) : (debug.checkForgottenReturns(x, promiseCreated, "", promise, this), 
        promise._resolveCallback(x)));
      }
    }, Promise.prototype._target = function() {
      for (var ret = this; ret._isFollowing(); ) ret = ret._followee();
      return ret;
    }, Promise.prototype._followee = function() {
      return this._rejectionHandler0;
    }, Promise.prototype._setFollowee = function(promise) {
      this._rejectionHandler0 = promise;
    }, Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
      var isPromise = promise instanceof Promise, bitField = this._bitField, asyncGuaranteed = 0 != (134217728 & bitField);
      0 != (65536 & bitField) ? (isPromise && promise._invokeInternalOnCancel(), receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler() ? (receiver.cancelPromise = promise, 
      tryCatch(handler).call(receiver, value) === errorObj && promise._reject(errorObj.e)) : handler === reflectHandler ? promise._fulfill(reflectHandler.call(receiver)) : receiver instanceof Proxyable ? receiver._promiseCancelled(promise) : isPromise || promise instanceof PromiseArray ? promise._cancel() : receiver.cancel()) : "function" == typeof handler ? isPromise ? (asyncGuaranteed && promise._setAsyncGuaranteed(), 
      this._settlePromiseFromHandler(handler, receiver, value, promise)) : handler.call(receiver, value, promise) : receiver instanceof Proxyable ? receiver._isResolved() || (0 != (33554432 & bitField) ? receiver._promiseFulfilled(value, promise) : receiver._promiseRejected(value, promise)) : isPromise && (asyncGuaranteed && promise._setAsyncGuaranteed(), 
      0 != (33554432 & bitField) ? promise._fulfill(value) : promise._reject(value));
    }, Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
      var handler = ctx.handler, promise = ctx.promise, receiver = ctx.receiver, value = ctx.value;
      "function" == typeof handler ? promise instanceof Promise ? this._settlePromiseFromHandler(handler, receiver, value, promise) : handler.call(receiver, value, promise) : promise instanceof Promise && promise._reject(value);
    }, Promise.prototype._settlePromiseCtx = function(ctx) {
      this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
    }, Promise.prototype._settlePromise0 = function(handler, value, bitField) {
      var promise = this._promise0, receiver = this._receiverAt(0);
      this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(promise, handler, receiver, value);
    }, Promise.prototype._clearCallbackDataAtIndex = function(index) {
      var base = 4 * index - 4;
      this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = void 0;
    }, Promise.prototype._fulfill = function(value) {
      var bitField = this._bitField;
      if (!((117506048 & bitField) >>> 16)) {
        if (value === this) {
          var err = makeSelfResolutionError();
          return this._attachExtraTrace(err), this._reject(err);
        }
        this._setFulfilled(), this._rejectionHandler0 = value, (65535 & bitField) > 0 && (0 != (134217728 & bitField) ? this._settlePromises() : async.settlePromises(this), 
        this._dereferenceTrace());
      }
    }, Promise.prototype._reject = function(reason) {
      var bitField = this._bitField;
      if (!((117506048 & bitField) >>> 16)) {
        if (this._setRejected(), this._fulfillmentHandler0 = reason, this._isFinal()) return async.fatalError(reason, util.isNode);
        (65535 & bitField) > 0 ? async.settlePromises(this) : this._ensurePossibleRejectionHandled();
      }
    }, Promise.prototype._fulfillPromises = function(len, value) {
      for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i), promise = this._promiseAt(i), receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i), this._settlePromise(promise, handler, receiver, value);
      }
    }, Promise.prototype._rejectPromises = function(len, reason) {
      for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i), promise = this._promiseAt(i), receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i), this._settlePromise(promise, handler, receiver, reason);
      }
    }, Promise.prototype._settlePromises = function() {
      var bitField = this._bitField, len = 65535 & bitField;
      if (len > 0) {
        if (0 != (16842752 & bitField)) {
          var reason = this._fulfillmentHandler0;
          this._settlePromise0(this._rejectionHandler0, reason, bitField), this._rejectPromises(len, reason);
        } else {
          var value = this._rejectionHandler0;
          this._settlePromise0(this._fulfillmentHandler0, value, bitField), this._fulfillPromises(len, value);
        }
        this._setLength(0);
      }
      this._clearCancellationData();
    }, Promise.prototype._settledValue = function() {
      var bitField = this._bitField;
      return 0 != (33554432 & bitField) ? this._rejectionHandler0 : 0 != (16777216 & bitField) ? this._fulfillmentHandler0 : void 0;
    }, "undefined" != typeof Symbol && Symbol.toStringTag && es5.defineProperty(Promise.prototype, Symbol.toStringTag, {
      get: function() {
        return "Object";
      }
    }), Promise.defer = Promise.pending = function() {
      return debug.deprecated("Promise.defer", "new Promise"), {
        promise: new Promise(INTERNAL),
        resolve: deferResolve,
        reject: deferReject
      };
    }, util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError), 
    __webpack_require__(45)(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug), 
    __webpack_require__(46)(Promise, INTERNAL, tryConvertToPromise, debug), __webpack_require__(47)(Promise, PromiseArray, apiRejection, debug), 
    __webpack_require__(48)(Promise), __webpack_require__(49)(Promise), __webpack_require__(50)(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async), 
    Promise.Promise = Promise, Promise.version = "3.7.2", __webpack_require__(51)(Promise), 
    __webpack_require__(52)(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug), 
    __webpack_require__(53)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug), 
    __webpack_require__(54)(Promise), __webpack_require__(55)(Promise, INTERNAL), __webpack_require__(56)(Promise, PromiseArray, tryConvertToPromise, apiRejection), 
    __webpack_require__(57)(Promise, INTERNAL, tryConvertToPromise, apiRejection), __webpack_require__(58)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug), 
    __webpack_require__(59)(Promise, PromiseArray, debug), __webpack_require__(60)(Promise, PromiseArray, apiRejection), 
    __webpack_require__(61)(Promise, INTERNAL, debug), __webpack_require__(62)(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug), 
    __webpack_require__(63)(Promise), __webpack_require__(64)(Promise, INTERNAL), __webpack_require__(65)(Promise, INTERNAL), 
    util.toFastProperties(Promise), util.toFastProperties(Promise.prototype), fillTypes({
      a: 1
    }), fillTypes({
      b: 2
    }), fillTypes({
      c: 3
    }), fillTypes(1), fillTypes((function() {})), fillTypes(void 0), fillTypes(!1), 
    fillTypes(new Promise(INTERNAL)), debug.setBounds(Async.firstLineError, util.lastLineError), 
    Promise;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var firstLineError;
  try {
    throw new Error;
  } catch (e) {
    firstLineError = e;
  }
  var schedule = __webpack_require__(38), Queue = __webpack_require__(39);
  function Async() {
    this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new Queue(16), 
    this._normalQueue = new Queue(16), this._haveDrainedQueues = !1;
    var self = this;
    this.drainQueues = function() {
      self._drainQueues();
    }, this._schedule = schedule;
  }
  function _drainQueue(queue) {
    for (;queue.length() > 0; ) _drainQueueStep(queue);
  }
  function _drainQueueStep(queue) {
    var fn = queue.shift();
    if ("function" != typeof fn) fn._settlePromises(); else {
      var receiver = queue.shift(), arg = queue.shift();
      fn.call(receiver, arg);
    }
  }
  Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    return this._schedule = fn, this._customScheduler = !0, prev;
  }, Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
  }, Async.prototype.haveItemsQueued = function() {
    return this._isTickUsed || this._haveDrainedQueues;
  }, Async.prototype.fatalError = function(e, isNode) {
    isNode ? (process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n"), 
    process.exit(2)) : this.throwLater(e);
  }, Async.prototype.throwLater = function(fn, arg) {
    if (1 === arguments.length && (arg = fn, fn = function() {
      throw arg;
    }), "undefined" != typeof setTimeout) setTimeout((function() {
      fn(arg);
    }), 0); else try {
      this._schedule((function() {
        fn(arg);
      }));
    } catch (e) {
      throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
    }
  }, Async.prototype.invokeLater = function(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg), this._queueTick();
  }, Async.prototype.invoke = function(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg), this._queueTick();
  }, Async.prototype.settlePromises = function(promise) {
    this._normalQueue._pushOne(promise), this._queueTick();
  }, Async.prototype._drainQueues = function() {
    _drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, _drainQueue(this._lateQueue);
  }, Async.prototype._queueTick = function() {
    this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
  }, Async.prototype._reset = function() {
    this._isTickUsed = !1;
  }, module.exports = Async, module.exports.firstLineError = firstLineError;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var schedule, util = __webpack_require__(0), NativePromise = util.getNativePromise();
  if (util.isNode && "undefined" == typeof MutationObserver) {
    var GlobalSetImmediate = global.setImmediate, ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode ? function(fn) {
      GlobalSetImmediate.call(global, fn);
    } : function(fn) {
      ProcessNextTick.call(process, fn);
    };
  } else if ("function" == typeof NativePromise && "function" == typeof NativePromise.resolve) {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
      nativePromise.then(fn);
    };
  } else schedule = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) || !("classList" in document.documentElement) ? "undefined" != typeof setImmediate ? function(fn) {
    setImmediate(fn);
  } : "undefined" != typeof setTimeout ? function(fn) {
    setTimeout(fn, 0);
  } : function() {
    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
  } : function() {
    var div = document.createElement("div"), opts = {
      attributes: !0
    }, toggleScheduled = !1, div2 = document.createElement("div");
    new MutationObserver((function() {
      div.classList.toggle("foo"), toggleScheduled = !1;
    })).observe(div2, opts);
    return function(fn) {
      var o = new MutationObserver((function() {
        o.disconnect(), fn();
      }));
      o.observe(div, opts), toggleScheduled || (toggleScheduled = !0, div2.classList.toggle("foo"));
    };
  }();
  module.exports = schedule;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function Queue(capacity) {
    this._capacity = capacity, this._length = 0, this._front = 0;
  }
  Queue.prototype._willBeOverCapacity = function(size) {
    return this._capacity < size;
  }, Queue.prototype._pushOne = function(arg) {
    var length = this.length();
    this._checkCapacity(length + 1), this[this._front + length & this._capacity - 1] = arg, 
    this._length = length + 1;
  }, Queue.prototype.push = function(fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) return this._pushOne(fn), this._pushOne(receiver), 
    void this._pushOne(arg);
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[j + 0 & wrapMask] = fn, this[j + 1 & wrapMask] = receiver, this[j + 2 & wrapMask] = arg, 
    this._length = length;
  }, Queue.prototype.shift = function() {
    var front = this._front, ret = this[front];
    return this[front] = void 0, this._front = front + 1 & this._capacity - 1, this._length--, 
    ret;
  }, Queue.prototype.length = function() {
    return this._length;
  }, Queue.prototype._checkCapacity = function(size) {
    this._capacity < size && this._resizeTo(this._capacity << 1);
  }, Queue.prototype._resizeTo = function(capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity, function(src, srcIndex, dst, dstIndex, len) {
      for (var j = 0; j < len; ++j) dst[j + dstIndex] = src[j + srcIndex], src[j + srcIndex] = void 0;
    }(this, 0, this, oldCapacity, this._front + this._length & oldCapacity - 1);
  }, module.exports = Queue;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL) {
    var util = __webpack_require__(0), errorObj = util.errorObj, isObject = util.isObject;
    var hasProp = {}.hasOwnProperty;
    return function(obj, context) {
      if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = function(obj) {
          try {
            return function(obj) {
              return obj.then;
            }(obj);
          } catch (e) {
            return errorObj.e = e, errorObj;
          }
        }(obj);
        if (then === errorObj) {
          context && context._pushContext();
          var ret = Promise.reject(then.e);
          return context && context._popContext(), ret;
        }
        if ("function" == typeof then) {
          if (function(obj) {
            try {
              return hasProp.call(obj, "_promise0");
            } catch (e) {
              return !1;
            }
          }(obj)) {
            ret = new Promise(INTERNAL);
            return obj._then(ret._fulfill, ret._reject, void 0, ret, null), ret;
          }
          return function(x, then, context) {
            var promise = new Promise(INTERNAL), ret = promise;
            context && context._pushContext();
            promise._captureStackTrace(), context && context._popContext();
            var result = util.tryCatch(then).call(x, (function(value) {
              if (!promise) return;
              promise._resolveCallback(value), promise = null;
            }), (function(reason) {
              if (!promise) return;
              promise._rejectCallback(reason, !1, !0), promise = null;
            }));
            !1, promise && result === errorObj && (promise._rejectCallback(result.e, !0, !0), 
            promise = null);
            return ret;
          }(obj, then, context);
        }
      }
      return obj;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
    var util = __webpack_require__(0);
    util.isArray;
    function PromiseArray(values) {
      var promise = this._promise = new Promise(INTERNAL);
      values instanceof Promise && (promise._propagateFrom(values, 3), values.suppressUnhandledRejections()), 
      promise._setOnCancel(this), this._values = values, this._length = 0, this._totalResolved = 0, 
      this._init(void 0, -2);
    }
    return util.inherits(PromiseArray, Proxyable), PromiseArray.prototype.length = function() {
      return this._length;
    }, PromiseArray.prototype.promise = function() {
      return this._promise;
    }, PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
      var values = tryConvertToPromise(this._values, this._promise);
      if (values instanceof Promise) {
        var bitField = (values = values._target())._bitField;
        if (this._values = values, 0 == (50397184 & bitField)) return this._promise._setAsyncGuaranteed(), 
        values._then(init, this._reject, void 0, this, resolveValueIfEmpty);
        if (0 == (33554432 & bitField)) return 0 != (16777216 & bitField) ? this._reject(values._reason()) : this._cancel();
        values = values._value();
      }
      if (null !== (values = util.asArray(values))) 0 !== values.length ? this._iterate(values) : -5 === resolveValueIfEmpty ? this._resolveEmptyArray() : this._resolve(function(val) {
        switch (val) {
         case -2:
          return [];

         case -3:
          return {};

         case -6:
          return new Map;
        }
      }(resolveValueIfEmpty)); else {
        var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, !1);
      }
    }, PromiseArray.prototype._iterate = function(values) {
      var len = this.getActualLength(values.length);
      this._length = len, this._values = this.shouldCopyValues() ? new Array(len) : this._values;
      for (var result = this._promise, isResolved = !1, bitField = null, i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);
        bitField = maybePromise instanceof Promise ? (maybePromise = maybePromise._target())._bitField : null, 
        isResolved ? null !== bitField && maybePromise.suppressUnhandledRejections() : null !== bitField ? 0 == (50397184 & bitField) ? (maybePromise._proxy(this, i), 
        this._values[i] = maybePromise) : isResolved = 0 != (33554432 & bitField) ? this._promiseFulfilled(maybePromise._value(), i) : 0 != (16777216 & bitField) ? this._promiseRejected(maybePromise._reason(), i) : this._promiseCancelled(i) : isResolved = this._promiseFulfilled(maybePromise, i);
      }
      isResolved || result._setAsyncGuaranteed();
    }, PromiseArray.prototype._isResolved = function() {
      return null === this._values;
    }, PromiseArray.prototype._resolve = function(value) {
      this._values = null, this._promise._fulfill(value);
    }, PromiseArray.prototype._cancel = function() {
      !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
    }, PromiseArray.prototype._reject = function(reason) {
      this._values = null, this._promise._rejectCallback(reason, !1);
    }, PromiseArray.prototype._promiseFulfilled = function(value, index) {
      return this._values[index] = value, ++this._totalResolved >= this._length && (this._resolve(this._values), 
      !0);
    }, PromiseArray.prototype._promiseCancelled = function() {
      return this._cancel(), !0;
    }, PromiseArray.prototype._promiseRejected = function(reason) {
      return this._totalResolved++, this._reject(reason), !0;
    }, PromiseArray.prototype._resultCancelled = function() {
      if (!this._isResolved()) {
        var values = this._values;
        if (this._cancel(), values instanceof Promise) values.cancel(); else for (var i = 0; i < values.length; ++i) values[i] instanceof Promise && values[i].cancel();
      }
    }, PromiseArray.prototype.shouldCopyValues = function() {
      return !0;
    }, PromiseArray.prototype.getActualLength = function(len) {
      return len;
    }, PromiseArray;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise) {
    var longStackTraces = !1, contextStack = [];
    function Context() {
      this._trace = new Context.CapturedTrace(peekContext());
    }
    function peekContext() {
      var lastIndex = contextStack.length - 1;
      if (lastIndex >= 0) return contextStack[lastIndex];
    }
    return Promise.prototype._promiseCreated = function() {}, Promise.prototype._pushContext = function() {}, 
    Promise.prototype._popContext = function() {
      return null;
    }, Promise._peekContext = Promise.prototype._peekContext = function() {}, Context.prototype._pushContext = function() {
      void 0 !== this._trace && (this._trace._promiseCreated = null, contextStack.push(this._trace));
    }, Context.prototype._popContext = function() {
      if (void 0 !== this._trace) {
        var trace = contextStack.pop(), ret = trace._promiseCreated;
        return trace._promiseCreated = null, ret;
      }
      return null;
    }, Context.CapturedTrace = null, Context.create = function() {
      if (longStackTraces) return new Context;
    }, Context.deactivateLongStackTraces = function() {}, Context.activateLongStackTraces = function() {
      var Promise_pushContext = Promise.prototype._pushContext, Promise_popContext = Promise.prototype._popContext, Promise_PeekContext = Promise._peekContext, Promise_peekContext = Promise.prototype._peekContext, Promise_promiseCreated = Promise.prototype._promiseCreated;
      Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext, Promise.prototype._popContext = Promise_popContext, 
        Promise._peekContext = Promise_PeekContext, Promise.prototype._peekContext = Promise_peekContext, 
        Promise.prototype._promiseCreated = Promise_promiseCreated, longStackTraces = !1;
      }, longStackTraces = !0, Promise.prototype._pushContext = Context.prototype._pushContext, 
      Promise.prototype._popContext = Context.prototype._popContext, Promise._peekContext = Promise.prototype._peekContext = peekContext, 
      Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        ctx && null == ctx._promiseCreated && (ctx._promiseCreated = this);
      };
    }, Context;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, Context, enableAsyncHooks, disableAsyncHooks) {
    var unhandledRejectionHandled, possiblyUnhandledRejection, printWarning, deferUnhandledRejectionCheck, async = Promise._async, Warning = __webpack_require__(5).Warning, util = __webpack_require__(0), es5 = __webpack_require__(6), canAttachTrace = util.canAttachTrace, bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/, parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, stackFramePattern = null, formatStack = null, indentStackFrames = !1, debugging = !(0 == util.env("BLUEBIRD_DEBUG") || !util.env("BLUEBIRD_DEBUG") && "development" !== util.env("NODE_ENV")), warnings = !(0 == util.env("BLUEBIRD_WARNINGS") || !debugging && !util.env("BLUEBIRD_WARNINGS")), longStackTraces = !(0 == util.env("BLUEBIRD_LONG_STACK_TRACES") || !debugging && !util.env("BLUEBIRD_LONG_STACK_TRACES")), wForgottenReturn = 0 != util.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    !function() {
      var promises = [];
      function unhandledRejectionCheck() {
        for (var i = 0; i < promises.length; ++i) promises[i]._notifyUnhandledRejection();
        unhandledRejectionClear();
      }
      function unhandledRejectionClear() {
        promises.length = 0;
      }
      deferUnhandledRejectionCheck = function(promise) {
        promises.push(promise), setTimeout(unhandledRejectionCheck, 1);
      }, es5.defineProperty(Promise, "_unhandledRejectionCheck", {
        value: unhandledRejectionCheck
      }), es5.defineProperty(Promise, "_unhandledRejectionClear", {
        value: unhandledRejectionClear
      });
    }(), Promise.prototype.suppressUnhandledRejections = function() {
      var target = this._target();
      target._bitField = -1048577 & target._bitField | 524288;
    }, Promise.prototype._ensurePossibleRejectionHandled = function() {
      0 == (524288 & this._bitField) && (this._setRejectionIsUnhandled(), deferUnhandledRejectionCheck(this));
    }, Promise.prototype._notifyUnhandledRejectionIsHandled = function() {
      fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, void 0, this);
    }, Promise.prototype._setReturnedNonUndefined = function() {
      this._bitField = 268435456 | this._bitField;
    }, Promise.prototype._returnedNonUndefined = function() {
      return 0 != (268435456 & this._bitField);
    }, Promise.prototype._notifyUnhandledRejection = function() {
      if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified(), fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
      }
    }, Promise.prototype._setUnhandledRejectionIsNotified = function() {
      this._bitField = 262144 | this._bitField;
    }, Promise.prototype._unsetUnhandledRejectionIsNotified = function() {
      this._bitField = -262145 & this._bitField;
    }, Promise.prototype._isUnhandledRejectionNotified = function() {
      return (262144 & this._bitField) > 0;
    }, Promise.prototype._setRejectionIsUnhandled = function() {
      this._bitField = 1048576 | this._bitField;
    }, Promise.prototype._unsetRejectionIsUnhandled = function() {
      this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), 
      this._notifyUnhandledRejectionIsHandled());
    }, Promise.prototype._isRejectionUnhandled = function() {
      return (1048576 & this._bitField) > 0;
    }, Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
      return warn(message, shouldUseOwnTrace, promise || this);
    }, Promise.onPossiblyUnhandledRejection = function(fn) {
      var context = Promise._getContext();
      possiblyUnhandledRejection = util.contextBind(context, fn);
    }, Promise.onUnhandledRejectionHandled = function(fn) {
      var context = Promise._getContext();
      unhandledRejectionHandled = util.contextBind(context, fn);
    };
    var disableLongStackTraces = function() {};
    Promise.longStackTraces = function() {
      if (async.haveItemsQueued() && !config.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
      if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace, Promise_attachExtraTrace = Promise.prototype._attachExtraTrace, Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
        config.longStackTraces = !0, disableLongStackTraces = function() {
          if (async.haveItemsQueued() && !config.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
          Promise.prototype._captureStackTrace = Promise_captureStackTrace, Promise.prototype._attachExtraTrace = Promise_attachExtraTrace, 
          Promise.prototype._dereferenceTrace = Promise_dereferenceTrace, Context.deactivateLongStackTraces(), 
          config.longStackTraces = !1;
        }, Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace, Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace, 
        Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace, Context.activateLongStackTraces();
      }
    }, Promise.hasLongStackTraces = function() {
      return config.longStackTraces && longStackTracesIsSupported();
    };
    var legacyHandlers = {
      unhandledrejection: {
        before: function() {
          var ret = util.global.onunhandledrejection;
          return util.global.onunhandledrejection = null, ret;
        },
        after: function(fn) {
          util.global.onunhandledrejection = fn;
        }
      },
      rejectionhandled: {
        before: function() {
          var ret = util.global.onrejectionhandled;
          return util.global.onrejectionhandled = null, ret;
        },
        after: function(fn) {
          util.global.onrejectionhandled = fn;
        }
      }
    }, fireDomEvent = function() {
      var dispatch = function(legacy, e) {
        if (!legacy) return !util.global.dispatchEvent(e);
        var fn;
        try {
          return fn = legacy.before(), !util.global.dispatchEvent(e);
        } finally {
          legacy.after(fn);
        }
      };
      try {
        if ("function" == typeof CustomEvent) {
          var event = new CustomEvent("CustomEvent");
          return util.global.dispatchEvent(event), function(name, event) {
            name = name.toLowerCase();
            var domEvent = new CustomEvent(name, {
              detail: event,
              cancelable: !0
            });
            return es5.defineProperty(domEvent, "promise", {
              value: event.promise
            }), es5.defineProperty(domEvent, "reason", {
              value: event.reason
            }), dispatch(legacyHandlers[name], domEvent);
          };
        }
        if ("function" == typeof Event) {
          event = new Event("CustomEvent");
          return util.global.dispatchEvent(event), function(name, event) {
            name = name.toLowerCase();
            var domEvent = new Event(name, {
              cancelable: !0
            });
            return domEvent.detail = event, es5.defineProperty(domEvent, "promise", {
              value: event.promise
            }), es5.defineProperty(domEvent, "reason", {
              value: event.reason
            }), dispatch(legacyHandlers[name], domEvent);
          };
        }
        return (event = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", !1, !0, {}), 
        util.global.dispatchEvent(event), function(name, event) {
          name = name.toLowerCase();
          var domEvent = document.createEvent("CustomEvent");
          return domEvent.initCustomEvent(name, !1, !0, event), dispatch(legacyHandlers[name], domEvent);
        };
      } catch (e) {}
      return function() {
        return !1;
      };
    }(), fireGlobalEvent = util.isNode ? function() {
      return process.emit.apply(process, arguments);
    } : util.global ? function(name) {
      var methodName = "on" + name.toLowerCase(), method = util.global[methodName];
      return !!method && (method.apply(util.global, [].slice.call(arguments, 1)), !0);
    } : function() {
      return !1;
    };
    function generatePromiseLifecycleEventObject(name, promise) {
      return {
        promise: promise
      };
    }
    var eventToObjectGenerator = {
      promiseCreated: generatePromiseLifecycleEventObject,
      promiseFulfilled: generatePromiseLifecycleEventObject,
      promiseRejected: generatePromiseLifecycleEventObject,
      promiseResolved: generatePromiseLifecycleEventObject,
      promiseCancelled: generatePromiseLifecycleEventObject,
      promiseChained: function(name, promise, child) {
        return {
          promise: promise,
          child: child
        };
      },
      warning: function(name, warning) {
        return {
          warning: warning
        };
      },
      unhandledRejection: function(name, reason, promise) {
        return {
          reason: reason,
          promise: promise
        };
      },
      rejectionHandled: generatePromiseLifecycleEventObject
    }, activeFireEvent = function(name) {
      var globalEventFired = !1;
      try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
      } catch (e) {
        async.throwLater(e), globalEventFired = !0;
      }
      var domEventFired = !1;
      try {
        domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
      } catch (e) {
        async.throwLater(e), domEventFired = !0;
      }
      return domEventFired || globalEventFired;
    };
    function defaultFireEvent() {
      return !1;
    }
    function cancellationExecute(executor, resolve, reject) {
      var promise = this;
      try {
        executor(resolve, reject, (function(onCancel) {
          if ("function" != typeof onCancel) throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
          promise._attachCancellationCallback(onCancel);
        }));
      } catch (e) {
        return e;
      }
    }
    function cancellationAttachCancellationCallback(onCancel) {
      if (!this._isCancellable()) return this;
      var previousOnCancel = this._onCancel();
      void 0 !== previousOnCancel ? util.isArray(previousOnCancel) ? previousOnCancel.push(onCancel) : this._setOnCancel([ previousOnCancel, onCancel ]) : this._setOnCancel(onCancel);
    }
    function cancellationOnCancel() {
      return this._onCancelField;
    }
    function cancellationSetOnCancel(onCancel) {
      this._onCancelField = onCancel;
    }
    function cancellationClearCancellationData() {
      this._cancellationParent = void 0, this._onCancelField = void 0;
    }
    function cancellationPropagateFrom(parent, flags) {
      if (0 != (1 & flags)) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        void 0 === branchesRemainingToCancel && (branchesRemainingToCancel = 0), parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
      }
      0 != (2 & flags) && parent._isBound() && this._setBoundTo(parent._boundTo);
    }
    Promise.config = function(opts) {
      if ("longStackTraces" in (opts = Object(opts)) && (opts.longStackTraces ? Promise.longStackTraces() : !opts.longStackTraces && Promise.hasLongStackTraces() && disableLongStackTraces()), 
      "warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption, wForgottenReturn = config.warnings, util.isObject(warningsOption) && "wForgottenReturn" in warningsOption && (wForgottenReturn = !!warningsOption.wForgottenReturn);
      }
      if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
        Promise.prototype._clearCancellationData = cancellationClearCancellationData, Promise.prototype._propagateFrom = cancellationPropagateFrom, 
        Promise.prototype._onCancel = cancellationOnCancel, Promise.prototype._setOnCancel = cancellationSetOnCancel, 
        Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback, 
        Promise.prototype._execute = cancellationExecute, propagateFromFunction = cancellationPropagateFrom, 
        config.cancellation = !0;
      }
      if ("monitoring" in opts && (opts.monitoring && !config.monitoring ? (config.monitoring = !0, 
      Promise.prototype._fireEvent = activeFireEvent) : !opts.monitoring && config.monitoring && (config.monitoring = !1, 
      Promise.prototype._fireEvent = defaultFireEvent)), "asyncHooks" in opts && util.nodeSupportsAsyncResource) {
        var prev = config.asyncHooks, cur = !!opts.asyncHooks;
        prev !== cur && (config.asyncHooks = cur, cur ? enableAsyncHooks() : disableAsyncHooks());
      }
      return Promise;
    }, Promise.prototype._fireEvent = defaultFireEvent, Promise.prototype._execute = function(executor, resolve, reject) {
      try {
        executor(resolve, reject);
      } catch (e) {
        return e;
      }
    }, Promise.prototype._onCancel = function() {}, Promise.prototype._setOnCancel = function(handler) {}, 
    Promise.prototype._attachCancellationCallback = function(onCancel) {}, Promise.prototype._captureStackTrace = function() {}, 
    Promise.prototype._attachExtraTrace = function() {}, Promise.prototype._dereferenceTrace = function() {}, 
    Promise.prototype._clearCancellationData = function() {}, Promise.prototype._propagateFrom = function(parent, flags) {};
    var propagateFromFunction = function(parent, flags) {
      0 != (2 & flags) && parent._isBound() && this._setBoundTo(parent._boundTo);
    };
    function boundValueFunction() {
      var ret = this._boundTo;
      return void 0 !== ret && ret instanceof Promise ? ret.isFulfilled() ? ret.value() : void 0 : ret;
    }
    function longStackTracesCaptureStackTrace() {
      this._trace = new CapturedTrace(this._peekContext());
    }
    function longStackTracesAttachExtraTrace(error, ignoreSelf) {
      if (canAttachTrace(error)) {
        var trace = this._trace;
        if (void 0 !== trace && ignoreSelf && (trace = trace._parent), void 0 !== trace) trace.attachExtraTrace(error); else if (!error.__stackCleaned__) {
          var parsed = parseStackAndMessage(error);
          util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n")), 
          util.notEnumerableProp(error, "__stackCleaned__", !0);
        }
      }
    }
    function longStackTracesDereferenceTrace() {
      this._trace = void 0;
    }
    function warn(message, shouldUseOwnTrace, promise) {
      if (config.warnings) {
        var ctx, warning = new Warning(message);
        if (shouldUseOwnTrace) promise._attachExtraTrace(warning); else if (config.longStackTraces && (ctx = Promise._peekContext())) ctx.attachExtraTrace(warning); else {
          var parsed = parseStackAndMessage(warning);
          warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
        }
        activeFireEvent("warning", warning) || formatAndLogError(warning, "", !0);
      }
    }
    function cleanStack(stack) {
      for (var ret = [], i = 0; i < stack.length; ++i) {
        var line = stack[i], isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line), isInternalFrame = isTraceLine && shouldIgnore(line);
        isTraceLine && !isInternalFrame && (indentStackFrames && " " !== line.charAt(0) && (line = "    " + line), 
        ret.push(line));
      }
      return ret;
    }
    function parseStackAndMessage(error) {
      var stack = error.stack, message = error.toString();
      return stack = "string" == typeof stack && stack.length > 0 ? function(error) {
        for (var stack = error.stack.replace(/\s+$/g, "").split("\n"), i = 0; i < stack.length; ++i) {
          var line = stack[i];
          if ("    (No stack trace)" === line || stackFramePattern.test(line)) break;
        }
        return i > 0 && "SyntaxError" != error.name && (stack = stack.slice(i)), stack;
      }(error) : [ "    (No stack trace)" ], {
        message: message,
        stack: "SyntaxError" == error.name ? stack : cleanStack(stack)
      };
    }
    function formatAndLogError(error, title, isSoft) {
      if ("undefined" != typeof console) {
        var message;
        if (util.isObject(error)) {
          var stack = error.stack;
          message = title + formatStack(stack, error);
        } else message = title + String(error);
        "function" == typeof printWarning ? printWarning(message, isSoft) : "function" != typeof console.log && "object" != typeof console.log || console.log(message);
      }
    }
    function fireRejectionEvent(name, localHandler, reason, promise) {
      var localEventFired = !1;
      try {
        "function" == typeof localHandler && (localEventFired = !0, "rejectionHandled" === name ? localHandler(promise) : localHandler(reason, promise));
      } catch (e) {
        async.throwLater(e);
      }
      "unhandledRejection" === name ? activeFireEvent(name, reason, promise) || localEventFired || formatAndLogError(reason, "Unhandled rejection ") : activeFireEvent(name, promise);
    }
    function formatNonError(obj) {
      var str;
      if ("function" == typeof obj) str = "[function " + (obj.name || "anonymous") + "]"; else {
        str = obj && "function" == typeof obj.toString ? obj.toString() : util.toString(obj);
        if (/\[object [a-zA-Z0-9$_]+\]/.test(str)) try {
          str = JSON.stringify(obj);
        } catch (e) {}
        0 === str.length && (str = "(empty array)");
      }
      return "(<" + function(str) {
        if (str.length < 41) return str;
        return str.substr(0, 38) + "...";
      }(str) + ">, no stack trace)";
    }
    function longStackTracesIsSupported() {
      return "function" == typeof captureStackTrace;
    }
    var shouldIgnore = function() {
      return !1;
    }, parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function parseLineInfo(line) {
      var matches = line.match(parseLineInfoRegex);
      if (matches) return {
        fileName: matches[1],
        line: parseInt(matches[2], 10)
      };
    }
    function CapturedTrace(parent) {
      this._parent = parent, this._promisesCreated = 0;
      var length = this._length = 1 + (void 0 === parent ? 0 : parent._length);
      captureStackTrace(this, CapturedTrace), length > 32 && this.uncycle();
    }
    util.inherits(CapturedTrace, Error), Context.CapturedTrace = CapturedTrace, CapturedTrace.prototype.uncycle = function() {
      var length = this._length;
      if (!(length < 2)) {
        for (var nodes = [], stackToIndex = {}, i = 0, node = this; void 0 !== node; ++i) nodes.push(node), 
        node = node._parent;
        for (i = (length = this._length = i) - 1; i >= 0; --i) {
          var stack = nodes[i].stack;
          void 0 === stackToIndex[stack] && (stackToIndex[stack] = i);
        }
        for (i = 0; i < length; ++i) {
          var index = stackToIndex[nodes[i].stack];
          if (void 0 !== index && index !== i) {
            index > 0 && (nodes[index - 1]._parent = void 0, nodes[index - 1]._length = 1), 
            nodes[i]._parent = void 0, nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
            index < length - 1 ? (cycleEdgeNode._parent = nodes[index + 1], cycleEdgeNode._parent.uncycle(), 
            cycleEdgeNode._length = cycleEdgeNode._parent._length + 1) : (cycleEdgeNode._parent = void 0, 
            cycleEdgeNode._length = 1);
            for (var currentChildLength = cycleEdgeNode._length + 1, j = i - 2; j >= 0; --j) nodes[j]._length = currentChildLength, 
            currentChildLength++;
            return;
          }
        }
      }
    }, CapturedTrace.prototype.attachExtraTrace = function(error) {
      if (!error.__stackCleaned__) {
        this.uncycle();
        for (var parsed = parseStackAndMessage(error), message = parsed.message, stacks = [ parsed.stack ], trace = this; void 0 !== trace; ) stacks.push(cleanStack(trace.stack.split("\n"))), 
        trace = trace._parent;
        !function(stacks) {
          for (var current = stacks[0], i = 1; i < stacks.length; ++i) {
            for (var prev = stacks[i], currentLastIndex = current.length - 1, currentLastLine = current[currentLastIndex], commonRootMeetPoint = -1, j = prev.length - 1; j >= 0; --j) if (prev[j] === currentLastLine) {
              commonRootMeetPoint = j;
              break;
            }
            for (j = commonRootMeetPoint; j >= 0; --j) {
              var line = prev[j];
              if (current[currentLastIndex] !== line) break;
              current.pop(), currentLastIndex--;
            }
            current = prev;
          }
        }(stacks), function(stacks) {
          for (var i = 0; i < stacks.length; ++i) (0 === stacks[i].length || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) && (stacks.splice(i, 1), 
          i--);
        }(stacks), util.notEnumerableProp(error, "stack", function(message, stacks) {
          for (var i = 0; i < stacks.length - 1; ++i) stacks[i].push("From previous event:"), 
          stacks[i] = stacks[i].join("\n");
          return i < stacks.length && (stacks[i] = stacks[i].join("\n")), message + "\n" + stacks.join("\n");
        }(message, stacks)), util.notEnumerableProp(error, "__stackCleaned__", !0);
      }
    };
    var captureStackTrace = function() {
      var v8stackFramePattern = /^\s*at\s*/, v8stackFormatter = function(stack, error) {
        return "string" == typeof stack ? stack : void 0 !== error.name && void 0 !== error.message ? error.toString() : formatNonError(error);
      };
      if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
        Error.stackTraceLimit += 6, stackFramePattern = v8stackFramePattern, formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;
        return shouldIgnore = function(line) {
          return bluebirdFramePattern.test(line);
        }, function(receiver, ignoreUntil) {
          Error.stackTraceLimit += 6, captureStackTrace(receiver, ignoreUntil), Error.stackTraceLimit -= 6;
        };
      }
      var hasStackAfterThrow, err = new Error;
      if ("string" == typeof err.stack && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return stackFramePattern = /@/, 
      formatStack = v8stackFormatter, indentStackFrames = !0, function(o) {
        o.stack = (new Error).stack;
      };
      try {
        throw new Error;
      } catch (e) {
        hasStackAfterThrow = "stack" in e;
      }
      return !("stack" in err) && hasStackAfterThrow && "number" == typeof Error.stackTraceLimit ? (stackFramePattern = v8stackFramePattern, 
      formatStack = v8stackFormatter, function(o) {
        Error.stackTraceLimit += 6;
        try {
          throw new Error;
        } catch (e) {
          o.stack = e.stack;
        }
        Error.stackTraceLimit -= 6;
      }) : (formatStack = function(stack, error) {
        return "string" == typeof stack ? stack : "object" != typeof error && "function" != typeof error || void 0 === error.name || void 0 === error.message ? formatNonError(error) : error.toString();
      }, null);
    }();
    "undefined" != typeof console && void 0 !== console.warn && (printWarning = function(message) {
      console.warn(message);
    }, util.isNode && process.stderr.isTTY ? printWarning = function(message, isSoft) {
      var color = isSoft ? "[33m" : "[31m";
      console.warn(color + message + "[0m\n");
    } : util.isNode || "string" != typeof (new Error).stack || (printWarning = function(message, isSoft) {
      console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
    }));
    var config = {
      warnings: warnings,
      longStackTraces: !1,
      cancellation: !1,
      monitoring: !1,
      asyncHooks: !1
    };
    return longStackTraces && Promise.longStackTraces(), {
      asyncHooks: function() {
        return config.asyncHooks;
      },
      longStackTraces: function() {
        return config.longStackTraces;
      },
      warnings: function() {
        return config.warnings;
      },
      cancellation: function() {
        return config.cancellation;
      },
      monitoring: function() {
        return config.monitoring;
      },
      propagateFromFunction: function() {
        return propagateFromFunction;
      },
      boundValueFunction: function() {
        return boundValueFunction;
      },
      checkForgottenReturns: function(returnValue, promiseCreated, name, promise, parent) {
        if (void 0 === returnValue && null !== promiseCreated && wForgottenReturn) {
          if (void 0 !== parent && parent._returnedNonUndefined()) return;
          if (0 == (65535 & promise._bitField)) return;
          name && (name += " ");
          var handlerLine = "", creatorLine = "";
          if (promiseCreated._trace) {
            for (var traceLines = promiseCreated._trace.stack.split("\n"), stack = cleanStack(traceLines), i = stack.length - 1; i >= 0; --i) {
              var line = stack[i];
              if (!nodeFramePattern.test(line)) {
                var lineMatches = line.match(parseLinePattern);
                lineMatches && (handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ");
                break;
              }
            }
            if (stack.length > 0) {
              var firstUserLine = stack[0];
              for (i = 0; i < traceLines.length; ++i) if (traceLines[i] === firstUserLine) {
                i > 0 && (creatorLine = "\n" + traceLines[i - 1]);
                break;
              }
            }
          }
          var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, see http://goo.gl/rRqMUw" + creatorLine;
          promise._warn(msg, !0, promiseCreated);
        }
      },
      setBounds: function(firstLineError, lastLineError) {
        if (longStackTracesIsSupported()) {
          for (var firstFileName, lastFileName, firstStackLines = (firstLineError.stack || "").split("\n"), lastStackLines = (lastLineError.stack || "").split("\n"), firstIndex = -1, lastIndex = -1, i = 0; i < firstStackLines.length; ++i) {
            if (result = parseLineInfo(firstStackLines[i])) {
              firstFileName = result.fileName, firstIndex = result.line;
              break;
            }
          }
          for (i = 0; i < lastStackLines.length; ++i) {
            var result;
            if (result = parseLineInfo(lastStackLines[i])) {
              lastFileName = result.fileName, lastIndex = result.line;
              break;
            }
          }
          firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex || (shouldIgnore = function(line) {
            if (bluebirdFramePattern.test(line)) return !0;
            var info = parseLineInfo(line);
            return !!(info && info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex);
          });
        }
      },
      warn: warn,
      deprecated: function(name, replacement) {
        var message = name + " is deprecated and will be removed in a future version.";
        return replacement && (message += " Use " + replacement + " instead."), warn(message);
      },
      CapturedTrace: CapturedTrace,
      fireDomEvent: fireDomEvent,
      fireGlobalEvent: fireGlobalEvent
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
    var util = __webpack_require__(0), CancellationError = Promise.CancellationError, errorObj = util.errorObj, catchFilter = __webpack_require__(21)(NEXT_FILTER);
    function PassThroughHandlerContext(promise, type, handler) {
      this.promise = promise, this.type = type, this.handler = handler, this.called = !1, 
      this.cancelPromise = null;
    }
    function FinallyHandlerCancelReaction(finallyHandler) {
      this.finallyHandler = finallyHandler;
    }
    function checkCancel(ctx, reason) {
      return null != ctx.cancelPromise && (arguments.length > 1 ? ctx.cancelPromise._reject(reason) : ctx.cancelPromise._cancel(), 
      ctx.cancelPromise = null, !0);
    }
    function succeed() {
      return finallyHandler.call(this, this.promise._target()._settledValue());
    }
    function fail(reason) {
      if (!checkCancel(this, reason)) return errorObj.e = reason, errorObj;
    }
    function finallyHandler(reasonOrValue) {
      var promise = this.promise, handler = this.handler;
      if (!this.called) {
        this.called = !0;
        var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) return ret;
        if (void 0 !== ret) {
          promise._setReturnedNonUndefined();
          var maybePromise = tryConvertToPromise(ret, promise);
          if (maybePromise instanceof Promise) {
            if (null != this.cancelPromise) {
              if (maybePromise._isCancelled()) {
                var reason = new CancellationError("late cancellation observer");
                return promise._attachExtraTrace(reason), errorObj.e = reason, errorObj;
              }
              maybePromise.isPending() && maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
            }
            return maybePromise._then(succeed, fail, void 0, this, void 0);
          }
        }
      }
      return promise.isRejected() ? (checkCancel(this), errorObj.e = reasonOrValue, errorObj) : (checkCancel(this), 
      reasonOrValue);
    }
    return PassThroughHandlerContext.prototype.isFinallyHandler = function() {
      return 0 === this.type;
    }, FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
      checkCancel(this.finallyHandler);
    }, Promise.prototype._passThrough = function(handler, type, success, fail) {
      return "function" != typeof handler ? this.then() : this._then(success, fail, void 0, new PassThroughHandlerContext(this, type, handler), void 0);
    }, Promise.prototype.lastly = Promise.prototype.finally = function(handler) {
      return this._passThrough(handler, 0, finallyHandler, finallyHandler);
    }, Promise.prototype.tap = function(handler) {
      return this._passThrough(handler, 1, finallyHandler);
    }, Promise.prototype.tapCatch = function(handlerOrPredicate) {
      var len = arguments.length;
      if (1 === len) return this._passThrough(handlerOrPredicate, 1, void 0, finallyHandler);
      var i, catchInstances = new Array(len - 1), j = 0;
      for (i = 0; i < len - 1; ++i) {
        var item = arguments[i];
        if (!util.isObject(item)) return Promise.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + util.classString(item)));
        catchInstances[j++] = item;
      }
      catchInstances.length = j;
      var handler = arguments[i];
      return this._passThrough(catchFilter(catchInstances, handler, this), 1, void 0, finallyHandler);
    }, PassThroughHandlerContext;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
    var util = __webpack_require__(0), tryCatch = util.tryCatch;
    Promise.method = function(fn) {
      if ("function" != typeof fn) throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
      return function() {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace(), ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments), promiseCreated = ret._popContext();
        return debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret), 
        ret._resolveFromSyncValue(value), ret;
      };
    }, Promise.attempt = Promise.try = function(fn) {
      if ("function" != typeof fn) return apiRejection("expecting a function but got " + util.classString(fn));
      var value, ret = new Promise(INTERNAL);
      if (ret._captureStackTrace(), ret._pushContext(), arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1], ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
      } else value = tryCatch(fn)();
      var promiseCreated = ret._popContext();
      return debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret), ret._resolveFromSyncValue(value), 
      ret;
    }, Promise.prototype._resolveFromSyncValue = function(value) {
      value === util.errorObj ? this._rejectCallback(value.e, !1) : this._resolveCallback(value, !0);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
    var calledBind = !1, rejectThis = function(_, e) {
      this._reject(e);
    }, targetRejected = function(e, context) {
      context.promiseRejectionQueued = !0, context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
    }, bindingResolved = function(thisArg, context) {
      0 == (50397184 & this._bitField) && this._resolveCallback(context.target);
    }, bindingRejected = function(e, context) {
      context.promiseRejectionQueued || this._reject(e);
    };
    Promise.prototype.bind = function(thisArg) {
      calledBind || (calledBind = !0, Promise.prototype._propagateFrom = debug.propagateFromFunction(), 
      Promise.prototype._boundValue = debug.boundValueFunction());
      var maybePromise = tryConvertToPromise(thisArg), ret = new Promise(INTERNAL);
      ret._propagateFrom(this, 1);
      var target = this._target();
      if (ret._setBoundTo(maybePromise), maybePromise instanceof Promise) {
        var context = {
          promiseRejectionQueued: !1,
          promise: ret,
          target: target,
          bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, void 0, ret, context), maybePromise._then(bindingResolved, bindingRejected, void 0, ret, context), 
        ret._setOnCancel(maybePromise);
      } else ret._resolveCallback(target);
      return ret;
    }, Promise.prototype._setBoundTo = function(obj) {
      void 0 !== obj ? (this._bitField = 2097152 | this._bitField, this._boundTo = obj) : this._bitField = -2097153 & this._bitField;
    }, Promise.prototype._isBound = function() {
      return 2097152 == (2097152 & this._bitField);
    }, Promise.bind = function(thisArg, value) {
      return Promise.resolve(value).bind(thisArg);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, apiRejection, debug) {
    var util = __webpack_require__(0), tryCatch = util.tryCatch, errorObj = util.errorObj, async = Promise._async;
    Promise.prototype.break = Promise.prototype.cancel = function() {
      if (!debug.cancellation()) return this._warn("cancellation is disabled");
      for (var promise = this, child = promise; promise._isCancellable(); ) {
        if (!promise._cancelBy(child)) {
          child._isFollowing() ? child._followee().cancel() : child._cancelBranched();
          break;
        }
        var parent = promise._cancellationParent;
        if (null == parent || !parent._isCancellable()) {
          promise._isFollowing() ? promise._followee().cancel() : promise._cancelBranched();
          break;
        }
        promise._isFollowing() && promise._followee().cancel(), promise._setWillBeCancelled(), 
        child = promise, promise = parent;
      }
    }, Promise.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
    }, Promise.prototype._enoughBranchesHaveCancelled = function() {
      return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
    }, Promise.prototype._cancelBy = function(canceller) {
      return canceller === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), 
      !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), 
      !0));
    }, Promise.prototype._cancelBranched = function() {
      this._enoughBranchesHaveCancelled() && this._cancel();
    }, Promise.prototype._cancel = function() {
      this._isCancellable() && (this._setCancelled(), async.invoke(this._cancelPromises, this, void 0));
    }, Promise.prototype._cancelPromises = function() {
      this._length() > 0 && this._settlePromises();
    }, Promise.prototype._unsetOnCancel = function() {
      this._onCancelField = void 0;
    }, Promise.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
    }, Promise.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
    }, Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
      if (util.isArray(onCancelCallback)) for (var i = 0; i < onCancelCallback.length; ++i) this._doInvokeOnCancel(onCancelCallback[i], internalOnly); else if (void 0 !== onCancelCallback) if ("function" == typeof onCancelCallback) {
        if (!internalOnly) {
          var e = tryCatch(onCancelCallback).call(this._boundValue());
          e === errorObj && (this._attachExtraTrace(e.e), async.throwLater(e.e));
        }
      } else onCancelCallback._resultCancelled(this);
    }, Promise.prototype._invokeOnCancel = function() {
      var onCancelCallback = this._onCancel();
      this._unsetOnCancel(), async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
    }, Promise.prototype._invokeInternalOnCancel = function() {
      this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
    }, Promise.prototype._resultCancelled = function() {
      this.cancel();
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise) {
    function returner() {
      return this.value;
    }
    function thrower() {
      throw this.reason;
    }
    Promise.prototype.return = Promise.prototype.thenReturn = function(value) {
      return value instanceof Promise && value.suppressUnhandledRejections(), this._then(returner, void 0, void 0, {
        value: value
      }, void 0);
    }, Promise.prototype.throw = Promise.prototype.thenThrow = function(reason) {
      return this._then(thrower, void 0, void 0, {
        reason: reason
      }, void 0);
    }, Promise.prototype.catchThrow = function(reason) {
      if (arguments.length <= 1) return this._then(void 0, thrower, void 0, {
        reason: reason
      }, void 0);
      var _reason = arguments[1], handler = function() {
        throw _reason;
      };
      return this.caught(reason, handler);
    }, Promise.prototype.catchReturn = function(value) {
      if (arguments.length <= 1) return value instanceof Promise && value.suppressUnhandledRejections(), 
      this._then(void 0, returner, void 0, {
        value: value
      }, void 0);
      var _value = arguments[1];
      _value instanceof Promise && _value.suppressUnhandledRejections();
      var handler = function() {
        return _value;
      };
      return this.caught(value, handler);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise) {
    function PromiseInspection(promise) {
      void 0 !== promise ? (promise = promise._target(), this._bitField = promise._bitField, 
      this._settledValueField = promise._isFateSealed() ? promise._settledValue() : void 0) : (this._bitField = 0, 
      this._settledValueField = void 0);
    }
    PromiseInspection.prototype._settledValue = function() {
      return this._settledValueField;
    };
    var value = PromiseInspection.prototype.value = function() {
      if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
      return this._settledValue();
    }, reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function() {
      if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
      return this._settledValue();
    }, isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
      return 0 != (33554432 & this._bitField);
    }, isRejected = PromiseInspection.prototype.isRejected = function() {
      return 0 != (16777216 & this._bitField);
    }, isPending = PromiseInspection.prototype.isPending = function() {
      return 0 == (50397184 & this._bitField);
    }, isResolved = PromiseInspection.prototype.isResolved = function() {
      return 0 != (50331648 & this._bitField);
    };
    PromiseInspection.prototype.isCancelled = function() {
      return 0 != (8454144 & this._bitField);
    }, Promise.prototype.__isCancelled = function() {
      return 65536 == (65536 & this._bitField);
    }, Promise.prototype._isCancelled = function() {
      return this._target().__isCancelled();
    }, Promise.prototype.isCancelled = function() {
      return 0 != (8454144 & this._target()._bitField);
    }, Promise.prototype.isPending = function() {
      return isPending.call(this._target());
    }, Promise.prototype.isRejected = function() {
      return isRejected.call(this._target());
    }, Promise.prototype.isFulfilled = function() {
      return isFulfilled.call(this._target());
    }, Promise.prototype.isResolved = function() {
      return isResolved.call(this._target());
    }, Promise.prototype.value = function() {
      return value.call(this._target());
    }, Promise.prototype.reason = function() {
      var target = this._target();
      return target._unsetRejectionIsUnhandled(), reason.call(target);
    }, Promise.prototype._value = function() {
      return this._settledValue();
    }, Promise.prototype._reason = function() {
      return this._unsetRejectionIsUnhandled(), this._settledValue();
    }, Promise.PromiseInspection = PromiseInspection;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async) {
    var reject, util = __webpack_require__(0), canEvaluate = util.canEvaluate, tryCatch = util.tryCatch, errorObj = util.errorObj;
    if (canEvaluate) {
      for (var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n            'use strict';                                                    \n            holder.pIndex = value;                                           \n            holder.checkFulfillment(this);                                   \n            ".replace(/Index/g, i));
      }, promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n            'use strict';                                                    \n            holder.pIndex = promise;                                         \n            ".replace(/Index/g, i));
      }, generateHolderClass = function(total) {
        for (var props = new Array(total), i = 0; i < props.length; ++i) props[i] = "this.p" + (i + 1);
        var assignment = props.join(" = ") + " = null;", cancellationCode = "var promise;\n" + props.map((function(prop) {
          return "                                                         \n                promise = " + prop + ";                                      \n                if (promise instanceof Promise) {                            \n                    promise.cancel();                                        \n                }                                                            \n            ";
        })).join("\n"), passedArguments = props.join(", "), name = "Holder$" + total, code = "return function(tryCatch, errorObj, Promise, async) {    \n            'use strict';                                                    \n            function [TheName](fn) {                                         \n                [TheProperties]                                              \n                this.fn = fn;                                                \n                this.asyncNeeded = true;                                     \n                this.now = 0;                                                \n            }                                                                \n                                                                             \n            [TheName].prototype._callFunction = function(promise) {          \n                promise._pushContext();                                      \n                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n                promise._popContext();                                       \n                if (ret === errorObj) {                                      \n                    promise._rejectCallback(ret.e, false);                   \n                } else {                                                     \n                    promise._resolveCallback(ret);                           \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype.checkFulfillment = function(promise) {       \n                var now = ++this.now;                                        \n                if (now === [TheTotal]) {                                    \n                    if (this.asyncNeeded) {                                  \n                        async.invoke(this._callFunction, this, promise);     \n                    } else {                                                 \n                        this._callFunction(promise);                         \n                    }                                                        \n                                                                             \n                }                                                            \n            };                                                               \n                                                                             \n            [TheName].prototype._resultCancelled = function() {              \n                [CancellationCode]                                           \n            };                                                               \n                                                                             \n            return [TheName];                                                \n        }(tryCatch, errorObj, Promise, async);                               \n        ";
        return code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode), 
        new Function("tryCatch", "errorObj", "Promise", "async", code)(tryCatch, errorObj, Promise, async);
      }, holderClasses = [], thenCallbacks = [], promiseSetters = [], i = 0; i < 8; ++i) holderClasses.push(generateHolderClass(i + 1)), 
      thenCallbacks.push(thenCallback(i + 1)), promiseSetters.push(promiseSetter(i + 1));
      reject = function(reason) {
        this._reject(reason);
      };
    }
    Promise.join = function() {
      var fn, last = arguments.length - 1;
      if (last > 0 && "function" == typeof arguments[last] && (fn = arguments[last], last <= 8 && canEvaluate)) {
        (ret = new Promise(INTERNAL))._captureStackTrace();
        for (var HolderClass = holderClasses[last - 1], holder = new HolderClass(fn), callbacks = thenCallbacks, i = 0; i < last; ++i) {
          var maybePromise = tryConvertToPromise(arguments[i], ret);
          if (maybePromise instanceof Promise) {
            var bitField = (maybePromise = maybePromise._target())._bitField;
            0 == (50397184 & bitField) ? (maybePromise._then(callbacks[i], reject, void 0, ret, holder), 
            promiseSetters[i](maybePromise, holder), holder.asyncNeeded = !1) : 0 != (33554432 & bitField) ? callbacks[i].call(ret, maybePromise._value(), holder) : 0 != (16777216 & bitField) ? ret._reject(maybePromise._reason()) : ret._cancel();
          } else callbacks[i].call(ret, maybePromise, holder);
        }
        if (!ret._isFateSealed()) {
          if (holder.asyncNeeded) {
            var context = Promise._getContext();
            holder.fn = util.contextBind(context, holder.fn);
          }
          ret._setAsyncGuaranteed(), ret._setOnCancel(holder);
        }
        return ret;
      }
      for (var $_len = arguments.length, args = new Array($_len), $_i = 0; $_i < $_len; ++$_i) args[$_i] = arguments[$_i];
      fn && args.pop();
      var ret = new PromiseArray(args).promise();
      return void 0 !== fn ? ret.spread(fn) : ret;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var cr = Object.create;
  if (cr) {
    var callerCache = cr(null), getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
  }
  module.exports = function(Promise) {
    var getMethodCaller, getGetter, util = __webpack_require__(0), canEvaluate = util.canEvaluate, isIdentifier = util.isIdentifier, makeMethodCaller = function(methodName) {
      return new Function("ensureMethod", "                                    \n        return function(obj) {                                               \n            'use strict'                                                     \n            var len = this.length;                                           \n            ensureMethod(obj, 'methodName');                                 \n            switch(len) {                                                    \n                case 1: return obj.methodName(this[0]);                      \n                case 2: return obj.methodName(this[0], this[1]);             \n                case 3: return obj.methodName(this[0], this[1], this[2]);    \n                case 0: return obj.methodName();                             \n                default:                                                     \n                    return obj.methodName.apply(obj, this);                  \n            }                                                                \n        };                                                                   \n        ".replace(/methodName/g, methodName))(ensureMethod);
    }, makeGetter = function(propertyName) {
      return new Function("obj", "                                             \n        'use strict';                                                        \n        return obj.propertyName;                                             \n        ".replace("propertyName", propertyName));
    }, getCompiled = function(name, compiler, cache) {
      var ret = cache[name];
      if ("function" != typeof ret) {
        if (!isIdentifier(name)) return null;
        if (ret = compiler(name), cache[name] = ret, cache[" size"]++, cache[" size"] > 512) {
          for (var keys = Object.keys(cache), i = 0; i < 256; ++i) delete cache[keys[i]];
          cache[" size"] = keys.length - 256;
        }
      }
      return ret;
    };
    function ensureMethod(obj, methodName) {
      var fn;
      if (null != obj && (fn = obj[methodName]), "function" != typeof fn) {
        var message = "Object " + util.classString(obj) + " has no method '" + util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
      }
      return fn;
    }
    function caller(obj) {
      return ensureMethod(obj, this.pop()).apply(obj, this);
    }
    function namedGetter(obj) {
      return obj[this];
    }
    function indexedGetter(obj) {
      var index = +this;
      return index < 0 && (index = Math.max(0, index + obj.length)), obj[index];
    }
    getMethodCaller = function(name) {
      return getCompiled(name, makeMethodCaller, callerCache);
    }, getGetter = function(name) {
      return getCompiled(name, makeGetter, getterCache);
    }, Promise.prototype.call = function(methodName) {
      for (var $_len = arguments.length, args = new Array(Math.max($_len - 1, 0)), $_i = 1; $_i < $_len; ++$_i) args[$_i - 1] = arguments[$_i];
      if (canEvaluate) {
        var maybeCaller = getMethodCaller(methodName);
        if (null !== maybeCaller) return this._then(maybeCaller, void 0, void 0, args, void 0);
      }
      return args.push(methodName), this._then(caller, void 0, void 0, args, void 0);
    }, Promise.prototype.get = function(propertyName) {
      var getter;
      if ("number" == typeof propertyName) getter = indexedGetter; else if (canEvaluate) {
        var maybeGetter = getGetter(propertyName);
        getter = null !== maybeGetter ? maybeGetter : namedGetter;
      } else getter = namedGetter;
      return this._then(getter, void 0, void 0, propertyName, void 0);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
    var TypeError = __webpack_require__(5).TypeError, util = __webpack_require__(0), errorObj = util.errorObj, tryCatch = util.tryCatch, yieldHandlers = [];
    function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
      if (debug.cancellation()) {
        var internal = new Promise(INTERNAL), _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly((function() {
          return _finallyPromise;
        })), internal._captureStackTrace(), internal._setOnCancel(this);
      } else {
        (this._promise = new Promise(INTERNAL))._captureStackTrace();
      }
      this._stack = stack, this._generatorFunction = generatorFunction, this._receiver = receiver, 
      this._generator = void 0, this._yieldHandlers = "function" == typeof yieldHandler ? [ yieldHandler ].concat(yieldHandlers) : yieldHandlers, 
      this._yieldedPromise = null, this._cancellationPhase = !1;
    }
    util.inherits(PromiseSpawn, Proxyable), PromiseSpawn.prototype._isResolved = function() {
      return null === this._promise;
    }, PromiseSpawn.prototype._cleanup = function() {
      this._promise = this._generator = null, debug.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), 
      this._finallyPromise = null);
    }, PromiseSpawn.prototype._promiseCancelled = function() {
      if (!this._isResolved()) {
        var result;
        if (void 0 !== this._generator.return) this._promise._pushContext(), result = tryCatch(this._generator.return).call(this._generator, void 0), 
        this._promise._popContext(); else {
          var reason = new Promise.CancellationError("generator .return() sentinel");
          Promise.coroutine.returnSentinel = reason, this._promise._attachExtraTrace(reason), 
          this._promise._pushContext(), result = tryCatch(this._generator.throw).call(this._generator, reason), 
          this._promise._popContext();
        }
        this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(result);
      }
    }, PromiseSpawn.prototype._promiseFulfilled = function(value) {
      this._yieldedPromise = null, this._promise._pushContext();
      var result = tryCatch(this._generator.next).call(this._generator, value);
      this._promise._popContext(), this._continue(result);
    }, PromiseSpawn.prototype._promiseRejected = function(reason) {
      this._yieldedPromise = null, this._promise._attachExtraTrace(reason), this._promise._pushContext();
      var result = tryCatch(this._generator.throw).call(this._generator, reason);
      this._promise._popContext(), this._continue(result);
    }, PromiseSpawn.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null, promise.cancel();
      }
    }, PromiseSpawn.prototype.promise = function() {
      return this._promise;
    }, PromiseSpawn.prototype._run = function() {
      this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, 
      this._promiseFulfilled(void 0);
    }, PromiseSpawn.prototype._continue = function(result) {
      var promise = this._promise;
      if (result === errorObj) return this._cleanup(), this._cancellationPhase ? promise.cancel() : promise._rejectCallback(result.e, !1);
      var value = result.value;
      if (!0 === result.done) return this._cleanup(), this._cancellationPhase ? promise.cancel() : promise._resolveCallback(value);
      var maybePromise = tryConvertToPromise(value, this._promise);
      if (maybePromise instanceof Promise || null !== (maybePromise = function(value, yieldHandlers, traceParent) {
        for (var i = 0; i < yieldHandlers.length; ++i) {
          traceParent._pushContext();
          var result = tryCatch(yieldHandlers[i])(value);
          if (traceParent._popContext(), result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            return traceParent._popContext(), ret;
          }
          var maybePromise = tryConvertToPromise(result, traceParent);
          if (maybePromise instanceof Promise) return maybePromise;
        }
        return null;
      }(maybePromise, this._yieldHandlers, this._promise))) {
        var bitField = (maybePromise = maybePromise._target())._bitField;
        0 == (50397184 & bitField) ? (this._yieldedPromise = maybePromise, maybePromise._proxy(this, null)) : 0 != (33554432 & bitField) ? Promise._async.invoke(this._promiseFulfilled, this, maybePromise._value()) : 0 != (16777216 & bitField) ? Promise._async.invoke(this._promiseRejected, this, maybePromise._reason()) : this._promiseCancelled();
      } else this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(value)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
    }, Promise.coroutine = function(generatorFunction, options) {
      if ("function" != typeof generatorFunction) throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
      var yieldHandler = Object(options).yieldHandler, PromiseSpawn$ = PromiseSpawn, stack = (new Error).stack;
      return function() {
        var generator = generatorFunction.apply(this, arguments), spawn = new PromiseSpawn$(void 0, void 0, yieldHandler, stack), ret = spawn.promise();
        return spawn._generator = generator, spawn._promiseFulfilled(void 0), ret;
      };
    }, Promise.coroutine.addYieldHandler = function(fn) {
      if ("function" != typeof fn) throw new TypeError("expecting a function but got " + util.classString(fn));
      yieldHandlers.push(fn);
    }, Promise.spawn = function(generatorFunction) {
      if (debug.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof generatorFunction) return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
      var spawn = new PromiseSpawn(generatorFunction, this), ret = spawn.promise();
      return spawn._run(Promise.spawn), ret;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
    var util = __webpack_require__(0), tryCatch = util.tryCatch, errorObj = util.errorObj, async = Promise._async;
    function MappingPromiseArray(promises, fn, limit, _filter) {
      this.constructor$(promises), this._promise._captureStackTrace();
      var context = Promise._getContext();
      if (this._callback = util.contextBind(context, fn), this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null, 
      this._limit = limit, this._inFlight = 0, this._queue = [], async.invoke(this._asyncInit, this, void 0), 
      util.isArray(promises)) for (var i = 0; i < promises.length; ++i) {
        var maybePromise = promises[i];
        maybePromise instanceof Promise && maybePromise.suppressUnhandledRejections();
      }
    }
    function map(promises, fn, options, _filter) {
      if ("function" != typeof fn) return apiRejection("expecting a function but got " + util.classString(fn));
      var limit = 0;
      if (void 0 !== options) {
        if ("object" != typeof options || null === options) return Promise.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
        if ("number" != typeof options.concurrency) return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
        limit = options.concurrency;
      }
      return new MappingPromiseArray(promises, fn, limit = "number" == typeof limit && isFinite(limit) && limit >= 1 ? limit : 0, _filter).promise();
    }
    util.inherits(MappingPromiseArray, PromiseArray), MappingPromiseArray.prototype._asyncInit = function() {
      this._init$(void 0, -2);
    }, MappingPromiseArray.prototype._init = function() {}, MappingPromiseArray.prototype._promiseFulfilled = function(value, index) {
      var values = this._values, length = this.length(), preservedValues = this._preservedValues, limit = this._limit;
      if (index < 0) {
        if (values[index = -1 * index - 1] = value, limit >= 1 && (this._inFlight--, this._drainQueue(), 
        this._isResolved())) return !0;
      } else {
        if (limit >= 1 && this._inFlight >= limit) return values[index] = value, this._queue.push(index), 
        !1;
        null !== preservedValues && (preservedValues[index] = value);
        var promise = this._promise, callback = this._callback, receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length), promiseCreated = promise._popContext();
        if (debug.checkForgottenReturns(ret, promiseCreated, null !== preservedValues ? "Promise.filter" : "Promise.map", promise), 
        ret === errorObj) return this._reject(ret.e), !0;
        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
          var bitField = (maybePromise = maybePromise._target())._bitField;
          if (0 == (50397184 & bitField)) return limit >= 1 && this._inFlight++, values[index] = maybePromise, 
          maybePromise._proxy(this, -1 * (index + 1)), !1;
          if (0 == (33554432 & bitField)) return 0 != (16777216 & bitField) ? (this._reject(maybePromise._reason()), 
          !0) : (this._cancel(), !0);
          ret = maybePromise._value();
        }
        values[index] = ret;
      }
      return ++this._totalResolved >= length && (null !== preservedValues ? this._filter(values, preservedValues) : this._resolve(values), 
      !0);
    }, MappingPromiseArray.prototype._drainQueue = function() {
      for (var queue = this._queue, limit = this._limit, values = this._values; queue.length > 0 && this._inFlight < limit; ) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
      }
    }, MappingPromiseArray.prototype._filter = function(booleans, values) {
      for (var len = values.length, ret = new Array(len), j = 0, i = 0; i < len; ++i) booleans[i] && (ret[j++] = values[i]);
      ret.length = j, this._resolve(ret);
    }, MappingPromiseArray.prototype.preservedValues = function() {
      return this._preservedValues;
    }, Promise.prototype.map = function(fn, options) {
      return map(this, fn, options, null);
    }, Promise.map = function(promises, fn, options, _filter) {
      return map(promises, fn, options, _filter);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise) {
    var util = __webpack_require__(0), async = Promise._async, tryCatch = util.tryCatch, errorObj = util.errorObj;
    function spreadAdapter(val, nodeback) {
      if (!util.isArray(val)) return successAdapter.call(this, val, nodeback);
      var ret = tryCatch(nodeback).apply(this._boundValue(), [ null ].concat(val));
      ret === errorObj && async.throwLater(ret.e);
    }
    function successAdapter(val, nodeback) {
      var receiver = this._boundValue(), ret = void 0 === val ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);
      ret === errorObj && async.throwLater(ret.e);
    }
    function errorAdapter(reason, nodeback) {
      if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason, reason = newReason;
      }
      var ret = tryCatch(nodeback).call(this._boundValue(), reason);
      ret === errorObj && async.throwLater(ret.e);
    }
    Promise.prototype.asCallback = Promise.prototype.nodeify = function(nodeback, options) {
      if ("function" == typeof nodeback) {
        var adapter = successAdapter;
        void 0 !== options && Object(options).spread && (adapter = spreadAdapter), this._then(adapter, errorAdapter, void 0, this, nodeback);
      }
      return this;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL) {
    var THIS = {}, util = __webpack_require__(0), nodebackForPromise = __webpack_require__(22), withAppended = util.withAppended, maybeWrapAsError = util.maybeWrapAsError, canEvaluate = util.canEvaluate, TypeError = __webpack_require__(5).TypeError, defaultPromisified = {
      __isPromisified__: !0
    }, noCopyPropsPattern = new RegExp("^(?:" + [ "arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__" ].join("|") + ")$"), defaultFilter = function(name) {
      return util.isIdentifier(name) && "_" !== name.charAt(0) && "constructor" !== name;
    };
    function propsFilter(key) {
      return !noCopyPropsPattern.test(key);
    }
    function isPromisified(fn) {
      try {
        return !0 === fn.__isPromisified__;
      } catch (e) {
        return !1;
      }
    }
    function hasPromisified(obj, key, suffix) {
      var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
      return !!val && isPromisified(val);
    }
    function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
      for (var keys = util.inheritedDataKeys(obj), ret = [], i = 0; i < keys.length; ++i) {
        var key = keys[i], value = obj[key], passesDefaultFilter = filter === defaultFilter || defaultFilter(key);
        "function" != typeof value || isPromisified(value) || hasPromisified(obj, key, suffix) || !filter(key, value, obj, passesDefaultFilter) || ret.push(key, value);
      }
      return function(ret, suffix, suffixRegexp) {
        for (var i = 0; i < ret.length; i += 2) {
          var key = ret[i];
          if (suffixRegexp.test(key)) for (var keyWithoutAsyncSuffix = key.replace(suffixRegexp, ""), j = 0; j < ret.length; j += 2) if (ret[j] === keyWithoutAsyncSuffix) throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
        }
      }(ret, suffix, suffixRegexp), ret;
    }
    var makeNodePromisified = canEvaluate ? function(callback, receiver, originalName, fn, _, multiArgs) {
      var newParameterCount = Math.max(0, function(fn) {
        return "number" == typeof fn.length ? Math.max(Math.min(fn.length, 1024), 0) : 0;
      }(fn) - 1), argumentOrder = function(likelyArgumentCount) {
        for (var ret = [ likelyArgumentCount ], min = Math.max(0, likelyArgumentCount - 1 - 3), i = likelyArgumentCount - 1; i >= min; --i) ret.push(i);
        for (i = likelyArgumentCount + 1; i <= 3; ++i) ret.push(i);
        return ret;
      }(newParameterCount), shouldProxyThis = "string" == typeof callback || receiver === THIS;
      function generateCallForArgumentCount(count) {
        var argumentCount, args = (argumentCount = count, util.filledRange(argumentCount, "_arg", "")).join(", "), comma = count > 0 ? ", " : "";
        return (shouldProxyThis ? "ret = callback.call(this, {{args}}, nodeback); break;\n" : void 0 === receiver ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n").replace("{{args}}", args).replace(", ", comma);
      }
      var getFunctionCode = "string" == typeof callback ? "this != null ? this['" + callback + "'] : fn" : "fn", body = "'use strict';                                                \n        var ret = function (Parameters) {                                    \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._captureStackTrace();                                    \n            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n            var ret;                                                         \n            var callback = tryCatch([GetFunctionCode]);                      \n            switch(len) {                                                    \n                [CodeForSwitchCase]                                          \n            }                                                                \n            if (ret === errorObj) {                                          \n                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n            }                                                                \n            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n            return promise;                                                  \n        };                                                                   \n        notEnumerableProp(ret, '__isPromisified__', true);                   \n        return ret;                                                          \n    ".replace("[CodeForSwitchCase]", function() {
        for (var ret = "", i = 0; i < argumentOrder.length; ++i) ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
        return ret += "                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = nodeback;                                              \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
      }()).replace("[GetFunctionCode]", getFunctionCode);
      return body = body.replace("Parameters", function(parameterCount) {
        return util.filledRange(Math.max(parameterCount, 3), "_arg", "");
      }(newParameterCount)), new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", body)(Promise, fn, receiver, withAppended, maybeWrapAsError, nodebackForPromise, util.tryCatch, util.errorObj, util.notEnumerableProp, INTERNAL);
    } : function(callback, receiver, _, fn, __, multiArgs) {
      var defaultThis = function() {
        return this;
      }(), method = callback;
      function promisified() {
        var _receiver = receiver;
        receiver === THIS && (_receiver = this);
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = "string" == typeof method && this !== defaultThis ? this[method] : callback, fn = nodebackForPromise(promise, multiArgs);
        try {
          cb.apply(_receiver, withAppended(arguments, fn));
        } catch (e) {
          promise._rejectCallback(maybeWrapAsError(e), !0, !0);
        }
        return promise._isFateSealed() || promise._setAsyncGuaranteed(), promise;
      }
      return "string" == typeof method && (callback = fn), util.notEnumerableProp(promisified, "__isPromisified__", !0), 
      promisified;
    };
    function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
      for (var suffixRegexp = new RegExp(suffix.replace(/([$])/, "\\$") + "$"), methods = promisifiableMethods(obj, suffix, suffixRegexp, filter), i = 0, len = methods.length; i < len; i += 2) {
        var key = methods[i], fn = methods[i + 1], promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs); else {
          var promisified = promisifier(fn, (function() {
            return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
          }));
          util.notEnumerableProp(promisified, "__isPromisified__", !0), obj[promisifiedKey] = promisified;
        }
      }
      return util.toFastProperties(obj), obj;
    }
    Promise.promisify = function(fn, options) {
      if ("function" != typeof fn) throw new TypeError("expecting a function but got " + util.classString(fn));
      if (isPromisified(fn)) return fn;
      var ret = function(callback, receiver, multiArgs) {
        return makeNodePromisified(callback, receiver, void 0, callback, null, multiArgs);
      }(fn, void 0 === (options = Object(options)).context ? THIS : options.context, !!options.multiArgs);
      return util.copyDescriptors(fn, ret, propsFilter), ret;
    }, Promise.promisifyAll = function(target, options) {
      if ("function" != typeof target && "object" != typeof target) throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
      var multiArgs = !!(options = Object(options)).multiArgs, suffix = options.suffix;
      "string" != typeof suffix && (suffix = "Async");
      var filter = options.filter;
      "function" != typeof filter && (filter = defaultFilter);
      var promisifier = options.promisifier;
      if ("function" != typeof promisifier && (promisifier = makeNodePromisified), !util.isIdentifier(suffix)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
      for (var keys = util.inheritedDataKeys(target), i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        "constructor" !== keys[i] && util.isClass(value) && (promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs), 
        promisifyAll(value, suffix, filter, promisifier, multiArgs));
      }
      return promisifyAll(target, suffix, filter, promisifier, multiArgs);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, tryConvertToPromise, apiRejection) {
    var Es6Map, util = __webpack_require__(0), isObject = util.isObject, es5 = __webpack_require__(6);
    "function" == typeof Map && (Es6Map = Map);
    var mapToEntries = function() {
      var index = 0, size = 0;
      function extractEntry(value, key) {
        this[index] = value, this[index + size] = key, index++;
      }
      return function(map) {
        size = map.size, index = 0;
        var ret = new Array(2 * map.size);
        return map.forEach(extractEntry, ret), ret;
      };
    }();
    function PropertiesPromiseArray(obj) {
      var entries, isMap = !1;
      if (void 0 !== Es6Map && obj instanceof Es6Map) entries = mapToEntries(obj), isMap = !0; else {
        var keys = es5.keys(obj), len = keys.length;
        entries = new Array(2 * len);
        for (var i = 0; i < len; ++i) {
          var key = keys[i];
          entries[i] = obj[key], entries[i + len] = key;
        }
      }
      this.constructor$(entries), this._isMap = isMap, this._init$(void 0, isMap ? -6 : -3);
    }
    function props(promises) {
      var ret, castValue = tryConvertToPromise(promises);
      return isObject(castValue) ? (ret = castValue instanceof Promise ? castValue._then(Promise.props, void 0, void 0, void 0, void 0) : new PropertiesPromiseArray(castValue).promise(), 
      castValue instanceof Promise && ret._propagateFrom(castValue, 2), ret) : apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
    }
    util.inherits(PropertiesPromiseArray, PromiseArray), PropertiesPromiseArray.prototype._init = function() {}, 
    PropertiesPromiseArray.prototype._promiseFulfilled = function(value, index) {
      if (this._values[index] = value, ++this._totalResolved >= this._length) {
        var val;
        if (this._isMap) val = function(entries) {
          for (var ret = new Es6Map, length = entries.length / 2 | 0, i = 0; i < length; ++i) {
            var key = entries[length + i], value = entries[i];
            ret.set(key, value);
          }
          return ret;
        }(this._values); else {
          val = {};
          for (var keyOffset = this.length(), i = 0, len = this.length(); i < len; ++i) val[this._values[i + keyOffset]] = this._values[i];
        }
        return this._resolve(val), !0;
      }
      return !1;
    }, PropertiesPromiseArray.prototype.shouldCopyValues = function() {
      return !1;
    }, PropertiesPromiseArray.prototype.getActualLength = function(len) {
      return len >> 1;
    }, Promise.prototype.props = function() {
      return props(this);
    }, Promise.props = function(promises) {
      return props(promises);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL, tryConvertToPromise, apiRejection) {
    var util = __webpack_require__(0);
    function race(promises, parent) {
      var promise, maybePromise = tryConvertToPromise(promises);
      if (maybePromise instanceof Promise) return (promise = maybePromise).then((function(array) {
        return race(array, promise);
      }));
      if (null === (promises = util.asArray(promises))) return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
      var ret = new Promise(INTERNAL);
      void 0 !== parent && ret._propagateFrom(parent, 3);
      for (var fulfill = ret._fulfill, reject = ret._reject, i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];
        (void 0 !== val || i in promises) && Promise.cast(val)._then(fulfill, reject, void 0, ret, null);
      }
      return ret;
    }
    Promise.race = function(promises) {
      return race(promises, void 0);
    }, Promise.prototype.race = function() {
      return race(this, void 0);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
    var util = __webpack_require__(0), tryCatch = util.tryCatch;
    function ReductionPromiseArray(promises, fn, initialValue, _each) {
      this.constructor$(promises);
      var context = Promise._getContext();
      this._fn = util.contextBind(context, fn), void 0 !== initialValue && (initialValue = Promise.resolve(initialValue))._attachCancellationCallback(this), 
      this._initialValue = initialValue, this._currentCancellable = null, this._eachValues = _each === INTERNAL ? Array(this._length) : 0 === _each ? null : void 0, 
      this._promise._captureStackTrace(), this._init$(void 0, -5);
    }
    function completed(valueOrReason, array) {
      this.isFulfilled() ? array._resolve(valueOrReason) : array._reject(valueOrReason);
    }
    function reduce(promises, fn, initialValue, _each) {
      return "function" != typeof fn ? apiRejection("expecting a function but got " + util.classString(fn)) : new ReductionPromiseArray(promises, fn, initialValue, _each).promise();
    }
    function gotAccum(accum) {
      this.accum = accum, this.array._gotAccum(accum);
      var value = tryConvertToPromise(this.value, this.array._promise);
      return value instanceof Promise ? (this.array._currentCancellable = value, value._then(gotValue, void 0, void 0, this, void 0)) : gotValue.call(this, value);
    }
    function gotValue(value) {
      var ret, array = this.array, promise = array._promise, fn = tryCatch(array._fn);
      promise._pushContext(), (ret = void 0 !== array._eachValues ? fn.call(promise._boundValue(), value, this.index, this.length) : fn.call(promise._boundValue(), this.accum, value, this.index, this.length)) instanceof Promise && (array._currentCancellable = ret);
      var promiseCreated = promise._popContext();
      return debug.checkForgottenReturns(ret, promiseCreated, void 0 !== array._eachValues ? "Promise.each" : "Promise.reduce", promise), 
      ret;
    }
    util.inherits(ReductionPromiseArray, PromiseArray), ReductionPromiseArray.prototype._gotAccum = function(accum) {
      void 0 !== this._eachValues && null !== this._eachValues && accum !== INTERNAL && this._eachValues.push(accum);
    }, ReductionPromiseArray.prototype._eachComplete = function(value) {
      return null !== this._eachValues && this._eachValues.push(value), this._eachValues;
    }, ReductionPromiseArray.prototype._init = function() {}, ReductionPromiseArray.prototype._resolveEmptyArray = function() {
      this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
    }, ReductionPromiseArray.prototype.shouldCopyValues = function() {
      return !1;
    }, ReductionPromiseArray.prototype._resolve = function(value) {
      this._promise._resolveCallback(value), this._values = null;
    }, ReductionPromiseArray.prototype._resultCancelled = function(sender) {
      if (sender === this._initialValue) return this._cancel();
      this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof Promise && this._currentCancellable.cancel(), 
      this._initialValue instanceof Promise && this._initialValue.cancel());
    }, ReductionPromiseArray.prototype._iterate = function(values) {
      var value, i;
      this._values = values;
      var length = values.length;
      void 0 !== this._initialValue ? (value = this._initialValue, i = 0) : (value = Promise.resolve(values[0]), 
      i = 1), this._currentCancellable = value;
      for (var j = i; j < length; ++j) {
        var maybePromise = values[j];
        maybePromise instanceof Promise && maybePromise.suppressUnhandledRejections();
      }
      if (!value.isRejected()) for (;i < length; ++i) {
        var ctx = {
          accum: null,
          value: values[i],
          index: i,
          length: length,
          array: this
        };
        value = value._then(gotAccum, void 0, void 0, ctx, void 0), 0 == (127 & i) && value._setNoAsyncGuarantee();
      }
      void 0 !== this._eachValues && (value = value._then(this._eachComplete, void 0, void 0, this, void 0)), 
      value._then(completed, completed, void 0, value, this);
    }, Promise.prototype.reduce = function(fn, initialValue) {
      return reduce(this, fn, initialValue, null);
    }, Promise.reduce = function(promises, fn, initialValue, _each) {
      return reduce(promises, fn, initialValue, _each);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, debug) {
    var PromiseInspection = Promise.PromiseInspection;
    function SettledPromiseArray(values) {
      this.constructor$(values);
    }
    __webpack_require__(0).inherits(SettledPromiseArray, PromiseArray), SettledPromiseArray.prototype._promiseResolved = function(index, inspection) {
      return this._values[index] = inspection, ++this._totalResolved >= this._length && (this._resolve(this._values), 
      !0);
    }, SettledPromiseArray.prototype._promiseFulfilled = function(value, index) {
      var ret = new PromiseInspection;
      return ret._bitField = 33554432, ret._settledValueField = value, this._promiseResolved(index, ret);
    }, SettledPromiseArray.prototype._promiseRejected = function(reason, index) {
      var ret = new PromiseInspection;
      return ret._bitField = 16777216, ret._settledValueField = reason, this._promiseResolved(index, ret);
    }, Promise.settle = function(promises) {
      return debug.deprecated(".settle()", ".reflect()"), new SettledPromiseArray(promises).promise();
    }, Promise.allSettled = function(promises) {
      return new SettledPromiseArray(promises).promise();
    }, Promise.prototype.settle = function() {
      return Promise.settle(this);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, PromiseArray, apiRejection) {
    var util = __webpack_require__(0), RangeError = __webpack_require__(5).RangeError, AggregateError = __webpack_require__(5).AggregateError, isArray = util.isArray, CANCELLATION = {};
    function SomePromiseArray(values) {
      this.constructor$(values), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
    }
    function some(promises, howMany) {
      if ((0 | howMany) !== howMany || howMany < 0) return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
      var ret = new SomePromiseArray(promises), promise = ret.promise();
      return ret.setHowMany(howMany), ret.init(), promise;
    }
    util.inherits(SomePromiseArray, PromiseArray), SomePromiseArray.prototype._init = function() {
      if (this._initialized) if (0 !== this._howMany) {
        this._init$(void 0, -5);
        var isArrayResolved = isArray(this._values);
        !this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
      } else this._resolve([]);
    }, SomePromiseArray.prototype.init = function() {
      this._initialized = !0, this._init();
    }, SomePromiseArray.prototype.setUnwrap = function() {
      this._unwrap = !0;
    }, SomePromiseArray.prototype.howMany = function() {
      return this._howMany;
    }, SomePromiseArray.prototype.setHowMany = function(count) {
      this._howMany = count;
    }, SomePromiseArray.prototype._promiseFulfilled = function(value) {
      return this._addFulfilled(value), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 
      1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), 
      !0);
    }, SomePromiseArray.prototype._promiseRejected = function(reason) {
      return this._addRejected(reason), this._checkOutcome();
    }, SomePromiseArray.prototype._promiseCancelled = function() {
      return this._values instanceof Promise || null == this._values ? this._cancel() : (this._addRejected(CANCELLATION), 
      this._checkOutcome());
    }, SomePromiseArray.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
        for (var e = new AggregateError, i = this.length(); i < this._values.length; ++i) this._values[i] !== CANCELLATION && e.push(this._values[i]);
        return e.length > 0 ? this._reject(e) : this._cancel(), !0;
      }
      return !1;
    }, SomePromiseArray.prototype._fulfilled = function() {
      return this._totalResolved;
    }, SomePromiseArray.prototype._rejected = function() {
      return this._values.length - this.length();
    }, SomePromiseArray.prototype._addRejected = function(reason) {
      this._values.push(reason);
    }, SomePromiseArray.prototype._addFulfilled = function(value) {
      this._values[this._totalResolved++] = value;
    }, SomePromiseArray.prototype._canPossiblyFulfill = function() {
      return this.length() - this._rejected();
    }, SomePromiseArray.prototype._getRangeError = function(count) {
      var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
      return new RangeError(message);
    }, SomePromiseArray.prototype._resolveEmptyArray = function() {
      this._reject(this._getRangeError(0));
    }, Promise.some = function(promises, howMany) {
      return some(promises, howMany);
    }, Promise.prototype.some = function(howMany) {
      return some(this, howMany);
    }, Promise._SomePromiseArray = SomePromiseArray;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL, debug) {
    var util = __webpack_require__(0), TimeoutError = Promise.TimeoutError;
    function HandleWrapper(handle) {
      this.handle = handle;
    }
    HandleWrapper.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var afterValue = function(value) {
      return delay(+this).thenReturn(value);
    }, delay = Promise.delay = function(ms, value) {
      var ret, handle;
      return void 0 !== value ? (ret = Promise.resolve(value)._then(afterValue, null, null, ms, void 0), 
      debug.cancellation() && value instanceof Promise && ret._setOnCancel(value)) : (ret = new Promise(INTERNAL), 
      handle = setTimeout((function() {
        ret._fulfill();
      }), +ms), debug.cancellation() && ret._setOnCancel(new HandleWrapper(handle)), ret._captureStackTrace()), 
      ret._setAsyncGuaranteed(), ret;
    };
    Promise.prototype.delay = function(ms) {
      return delay(ms, this);
    };
    function successClear(value) {
      return clearTimeout(this.handle), value;
    }
    function failureClear(reason) {
      throw clearTimeout(this.handle), reason;
    }
    Promise.prototype.timeout = function(ms, message) {
      var ret, parent;
      ms = +ms;
      var handleWrapper = new HandleWrapper(setTimeout((function() {
        ret.isPending() && function(promise, message, parent) {
          var err;
          err = "string" != typeof message ? message instanceof Error ? message : new TimeoutError("operation timed out") : new TimeoutError(message), 
          util.markAsOriginatingFromRejection(err), promise._attachExtraTrace(err), promise._reject(err), 
          null != parent && parent.cancel();
        }(ret, message, parent);
      }), ms));
      return debug.cancellation() ? (parent = this.then(), (ret = parent._then(successClear, failureClear, void 0, handleWrapper, void 0))._setOnCancel(handleWrapper)) : ret = this._then(successClear, failureClear, void 0, handleWrapper, void 0), 
      ret;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
    var util = __webpack_require__(0), TypeError = __webpack_require__(5).TypeError, inherits = __webpack_require__(0).inherits, errorObj = util.errorObj, tryCatch = util.tryCatch, NULL = {};
    function thrower(e) {
      setTimeout((function() {
        throw e;
      }), 0);
    }
    function dispose(resources, inspection) {
      var i = 0, len = resources.length, ret = new Promise(INTERNAL);
      return function iterator() {
        if (i >= len) return ret._fulfill();
        var maybePromise = function(thenable) {
          var maybePromise = tryConvertToPromise(thenable);
          return maybePromise !== thenable && "function" == typeof thenable._isDisposable && "function" == typeof thenable._getDisposer && thenable._isDisposable() && maybePromise._setDisposable(thenable._getDisposer()), 
          maybePromise;
        }(resources[i++]);
        if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
          try {
            maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
          } catch (e) {
            return thrower(e);
          }
          if (maybePromise instanceof Promise) return maybePromise._then(iterator, thrower, null, null, null);
        }
        iterator();
      }(), ret;
    }
    function Disposer(data, promise, context) {
      this._data = data, this._promise = promise, this._context = context;
    }
    function FunctionDisposer(fn, promise, context) {
      this.constructor$(fn, promise, context);
    }
    function maybeUnwrapDisposer(value) {
      return Disposer.isDisposer(value) ? (this.resources[this.index]._setDisposable(value), 
      value.promise()) : value;
    }
    function ResourceList(length) {
      this.length = length, this.promise = null, this[length - 1] = null;
    }
    Disposer.prototype.data = function() {
      return this._data;
    }, Disposer.prototype.promise = function() {
      return this._promise;
    }, Disposer.prototype.resource = function() {
      return this.promise().isFulfilled() ? this.promise().value() : NULL;
    }, Disposer.prototype.tryDispose = function(inspection) {
      var resource = this.resource(), context = this._context;
      void 0 !== context && context._pushContext();
      var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
      return void 0 !== context && context._popContext(), this._promise._unsetDisposable(), 
      this._data = null, ret;
    }, Disposer.isDisposer = function(d) {
      return null != d && "function" == typeof d.resource && "function" == typeof d.tryDispose;
    }, inherits(FunctionDisposer, Disposer), FunctionDisposer.prototype.doDispose = function(resource, inspection) {
      return this.data().call(resource, resource, inspection);
    }, ResourceList.prototype._resultCancelled = function() {
      for (var len = this.length, i = 0; i < len; ++i) {
        var item = this[i];
        item instanceof Promise && item.cancel();
      }
    }, Promise.using = function() {
      var len = arguments.length;
      if (len < 2) return apiRejection("you must pass at least 2 arguments to Promise.using");
      var input, fn = arguments[len - 1];
      if ("function" != typeof fn) return apiRejection("expecting a function but got " + util.classString(fn));
      var spreadArgs = !0;
      2 === len && Array.isArray(arguments[0]) ? (len = (input = arguments[0]).length, 
      spreadArgs = !1) : (input = arguments, len--);
      for (var resources = new ResourceList(len), i = 0; i < len; ++i) {
        var resource = input[i];
        if (Disposer.isDisposer(resource)) {
          var disposer = resource;
          (resource = resource.promise())._setDisposable(disposer);
        } else {
          var maybePromise = tryConvertToPromise(resource);
          maybePromise instanceof Promise && (resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
            resources: resources,
            index: i
          }, void 0));
        }
        resources[i] = resource;
      }
      var reflectedResources = new Array(resources.length);
      for (i = 0; i < reflectedResources.length; ++i) reflectedResources[i] = Promise.resolve(resources[i]).reflect();
      var resultPromise = Promise.all(reflectedResources).then((function(inspections) {
        for (var i = 0; i < inspections.length; ++i) {
          var inspection = inspections[i];
          if (inspection.isRejected()) return errorObj.e = inspection.error(), errorObj;
          if (!inspection.isFulfilled()) return void resultPromise.cancel();
          inspections[i] = inspection.value();
        }
        promise._pushContext(), fn = tryCatch(fn);
        var ret = spreadArgs ? fn.apply(void 0, inspections) : fn(inspections), promiseCreated = promise._popContext();
        return debug.checkForgottenReturns(ret, promiseCreated, "Promise.using", promise), 
        ret;
      })), promise = resultPromise.lastly((function() {
        var inspection = new Promise.PromiseInspection(resultPromise);
        return dispose(resources, inspection);
      }));
      return resources.promise = promise, promise._setOnCancel(resources), promise;
    }, Promise.prototype._setDisposable = function(disposer) {
      this._bitField = 131072 | this._bitField, this._disposer = disposer;
    }, Promise.prototype._isDisposable = function() {
      return (131072 & this._bitField) > 0;
    }, Promise.prototype._getDisposer = function() {
      return this._disposer;
    }, Promise.prototype._unsetDisposable = function() {
      this._bitField = -131073 & this._bitField, this._disposer = void 0;
    }, Promise.prototype.disposer = function(fn) {
      if ("function" == typeof fn) return new FunctionDisposer(fn, this, createContext());
      throw new TypeError;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise) {
    var SomePromiseArray = Promise._SomePromiseArray;
    function any(promises) {
      var ret = new SomePromiseArray(promises), promise = ret.promise();
      return ret.setHowMany(1), ret.setUnwrap(), ret.init(), promise;
    }
    Promise.any = function(promises) {
      return any(promises);
    }, Promise.prototype.any = function() {
      return any(this);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL) {
    var PromiseReduce = Promise.reduce, PromiseAll = Promise.all;
    function promiseAllThis() {
      return PromiseAll(this);
    }
    Promise.prototype.each = function(fn) {
      return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, this, void 0);
    }, Promise.prototype.mapSeries = function(fn) {
      return PromiseReduce(this, fn, INTERNAL, INTERNAL);
    }, Promise.each = function(promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, void 0, void 0, promises, void 0);
    }, Promise.mapSeries = function(promises, fn) {
      return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Promise, INTERNAL) {
    var PromiseMap = Promise.map;
    Promise.prototype.filter = function(fn, options) {
      return PromiseMap(this, fn, options, INTERNAL);
    }, Promise.filter = function(promises, fn, options) {
      return PromiseMap(promises, fn, options, INTERNAL);
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(3), path = __webpack_require__(1), LCHOWN = fs.lchown ? "lchown" : "chown", LCHOWNSYNC = fs.lchownSync ? "lchownSync" : "chownSync", needEISDIRHandled = fs.lchown && !process.version.match(/v1[1-9]+\./) && !process.version.match(/v10\.[6-9]/), lchownSync = (path, uid, gid) => {
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
    fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, er => {
      cb(er && "ENOENT" !== er.code ? er : null);
    }));
  }, chownrKid = (p, child, uid, gid, cb) => {
    if ("string" == typeof child) return fs.lstat(path.resolve(p, child), (er, stats) => {
      if (er) return cb("ENOENT" !== er.code ? er : null);
      stats.name = child, chownrKid(p, stats, uid, gid, cb);
    });
    if (child.isDirectory()) chownr(path.resolve(p, child.name), uid, gid, er => {
      if (er) return cb(er);
      const cpath = path.resolve(p, child.name);
      chown(cpath, uid, gid, cb);
    }); else {
      const cpath = path.resolve(p, child.name);
      chown(cpath, uid, gid, cb);
    }
  }, chownr = (p, uid, gid, cb) => {
    readdir(p, {
      withFileTypes: !0
    }, (er, children) => {
      if (er) {
        if ("ENOENT" === er.code) return cb();
        if ("ENOTDIR" !== er.code && "ENOTSUP" !== er.code) return cb(er);
      }
      if (er || !children.length) return chown(p, uid, gid, cb);
      let len = children.length, errState = null;
      const then = er => {
        if (!errState) return er ? cb(errState = er) : 0 == --len ? chown(p, uid, gid, cb) : void 0;
      };
      children.forEach(child => chownrKid(p, child, uid, gid, then));
    });
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
    return children && children.length && children.forEach(child => ((p, child, uid, gid) => {
      if ("string" == typeof child) try {
        const stats = fs.lstatSync(path.resolve(p, child));
        stats.name = child, child = stats;
      } catch (er) {
        if ("ENOENT" === er.code) return;
        throw er;
      }
      child.isDirectory() && chownrSync(path.resolve(p, child.name), uid, gid), handleEISDirSync(path.resolve(p, child.name), uid, gid);
    })(p, child, uid, gid)), handleEISDirSync(p, uid, gid);
  };
  module.exports = chownr, chownr.sync = chownrSync;
}, function(module, exports, __webpack_require__) {
  const cache = new Map, fs = __webpack_require__(3), {dirname: dirname, resolve: resolve} = __webpack_require__(1), inferOwner = path => {
    if (path = resolve(path), cache.has(path)) return Promise.resolve(cache.get(path));
    const parent = dirname(path), parentTrap = parent === path ? null : er => inferOwner(parent).then(owner => (cache.set(path, owner), 
    owner));
    return (path => new Promise((res, rej) => fs.lstat(path, (er, st) => er ? rej(er) : res(st))))(path).then(st => {
      const {uid: uid, gid: gid} = st;
      return cache.set(path, {
        uid: uid,
        gid: gid
      }), {
        uid: uid,
        gid: gid
      };
    }, parentTrap);
  }, inferOwnerSync = path => {
    if (path = resolve(path), cache.has(path)) return cache.get(path);
    const parent = dirname(path);
    let threw = !0;
    try {
      const st = fs.lstatSync(path);
      threw = !1;
      const {uid: uid, gid: gid} = st;
      return cache.set(path, {
        uid: uid,
        gid: gid
      }), {
        uid: uid,
        gid: gid
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
    const p = inferOwner(path).then(owner => (inflight.delete(path), owner));
    return inflight.set(path, p), p;
  }, module.exports.sync = inferOwnerSync, module.exports.clearCache = () => {
    cache.clear(), inflight.clear();
  };
}, function(module, exports, __webpack_require__) {
  var constants = __webpack_require__(69), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
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
  var Stream = __webpack_require__(14).Stream;
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
}, function(module, exports, __webpack_require__) {
  var fs = __webpack_require__(3), path = __webpack_require__(1), util = __webpack_require__(9);
  function Y18N(opts) {
    opts = opts || {}, this.directory = opts.directory || "./locales", this.updateFiles = "boolean" != typeof opts.updateFiles || opts.updateFiles, 
    this.locale = opts.locale || "en", this.fallbackToLanguage = "boolean" != typeof opts.fallbackToLanguage || opts.fallbackToLanguage, 
    this.cache = Object.create(null), this.writeQueue = [];
  }
  Y18N.prototype.__ = function() {
    if ("string" != typeof arguments[0]) return this._taggedLiteral.apply(this, arguments);
    var args = Array.prototype.slice.call(arguments), str = args.shift(), cb = function() {};
    return "function" == typeof args[args.length - 1] && (cb = args.pop()), cb = cb || function() {}, 
    this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][str] && this.updateFiles ? (this.cache[this.locale][str] = str, 
    this._enqueueWrite([ this.directory, this.locale, cb ])) : cb(), util.format.apply(util, [ this.cache[this.locale][str] || str ].concat(args));
  }, Y18N.prototype._taggedLiteral = function(parts) {
    var args = arguments, str = "";
    return parts.forEach((function(part, i) {
      var arg = args[i + 1];
      str += part, void 0 !== arg && (str += "%s");
    })), this.__.apply(null, [ str ].concat([].slice.call(arguments, 1)));
  }, Y18N.prototype._enqueueWrite = function(work) {
    this.writeQueue.push(work), 1 === this.writeQueue.length && this._processWriteQueue();
  }, Y18N.prototype._processWriteQueue = function() {
    var _this = this, work = this.writeQueue[0], directory = work[0], locale = work[1], cb = work[2], languageFile = this._resolveLocaleFile(directory, locale), serializedLocale = JSON.stringify(this.cache[locale], null, 2);
    fs.writeFile(languageFile, serializedLocale, "utf-8", (function(err) {
      _this.writeQueue.shift(), _this.writeQueue.length > 0 && _this._processWriteQueue(), 
      cb(err);
    }));
  }, Y18N.prototype._readLocaleFile = function() {
    var localeLookup = {}, languageFile = this._resolveLocaleFile(this.directory, this.locale);
    try {
      localeLookup = JSON.parse(fs.readFileSync(languageFile, "utf-8"));
    } catch (err) {
      if (err instanceof SyntaxError && (err.message = "syntax error in " + languageFile), 
      "ENOENT" !== err.code) throw err;
      localeLookup = {};
    }
    this.cache[this.locale] = localeLookup;
  }, Y18N.prototype._resolveLocaleFile = function(directory, locale) {
    var file = path.resolve(directory, "./", locale + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf("_")) {
      var languageFile = path.resolve(directory, "./", locale.split("_")[0] + ".json");
      this._fileExistsSync(languageFile) && (file = languageFile);
    }
    return file;
  }, Y18N.prototype._fileExistsSync = function(file) {
    try {
      return fs.statSync(file).isFile();
    } catch (err) {
      return !1;
    }
  }, Y18N.prototype.__n = function() {
    var args = Array.prototype.slice.call(arguments), singular = args.shift(), plural = args.shift(), quantity = args.shift(), cb = function() {};
    "function" == typeof args[args.length - 1] && (cb = args.pop()), this.cache[this.locale] || this._readLocaleFile();
    var str = 1 === quantity ? singular : plural;
    this.cache[this.locale][singular] && (str = this.cache[this.locale][singular][1 === quantity ? "one" : "other"]), 
    !this.cache[this.locale][singular] && this.updateFiles ? (this.cache[this.locale][singular] = {
      one: singular,
      other: plural
    }, this._enqueueWrite([ this.directory, this.locale, cb ])) : cb();
    var values = [ str ];
    return ~str.indexOf("%d") && values.push(quantity), util.format.apply(util, values.concat(args));
  }, Y18N.prototype.setLocale = function(locale) {
    this.locale = locale;
  }, Y18N.prototype.getLocale = function() {
    return this.locale;
  }, Y18N.prototype.updateLocale = function(obj) {
    for (var key in this.cache[this.locale] || this._readLocaleFile(), obj) this.cache[this.locale][key] = obj[key];
  }, module.exports = function(opts) {
    var y18n = new Y18N(opts);
    for (var key in y18n) "function" == typeof y18n[key] && (y18n[key] = y18n[key].bind(y18n));
    return y18n;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), figgyPudding = __webpack_require__(7), fs = __webpack_require__(3), index = __webpack_require__(11), memo = __webpack_require__(17), pipe = __webpack_require__(4).pipe, pipeline = __webpack_require__(4).pipeline, read = __webpack_require__(28), through = __webpack_require__(4).through, GetOpts = figgyPudding({
    integrity: {},
    memoize: {},
    size: {}
  });
  function getData(byDigest, cache, key, opts) {
    opts = GetOpts(opts);
    const memoized = byDigest ? memo.get.byDigest(cache, key, opts) : memo.get(cache, key, opts);
    return memoized && !1 !== opts.memoize ? BB.resolve(byDigest ? memoized : {
      metadata: memoized.entry.metadata,
      data: memoized.data,
      integrity: memoized.entry.integrity,
      size: memoized.entry.size
    }) : (byDigest ? BB.resolve(null) : index.find(cache, key, opts)).then(entry => {
      if (!entry && !byDigest) throw new index.NotFoundError(cache, key);
      return read(cache, byDigest ? key : entry.integrity, {
        integrity: opts.integrity,
        size: opts.size
      }).then(data => byDigest ? data : {
        metadata: entry.metadata,
        data: data,
        size: entry.size,
        integrity: entry.integrity
      }).then(res => (opts.memoize && byDigest ? memo.put.byDigest(cache, key, res, opts) : opts.memoize && memo.put(cache, entry, res.data, opts), 
      res));
    });
  }
  function getDataSync(byDigest, cache, key, opts) {
    opts = GetOpts(opts);
    const memoized = byDigest ? memo.get.byDigest(cache, key, opts) : memo.get(cache, key, opts);
    if (memoized && !1 !== opts.memoize) return byDigest ? memoized : {
      metadata: memoized.entry.metadata,
      data: memoized.data,
      integrity: memoized.entry.integrity,
      size: memoized.entry.size
    };
    const entry = !byDigest && index.find.sync(cache, key, opts);
    if (!entry && !byDigest) throw new index.NotFoundError(cache, key);
    const data = read.sync(cache, byDigest ? key : entry.integrity, {
      integrity: opts.integrity,
      size: opts.size
    }), res = byDigest ? data : {
      metadata: entry.metadata,
      data: data,
      size: entry.size,
      integrity: entry.integrity
    };
    return opts.memoize && byDigest ? memo.put.byDigest(cache, key, res, opts) : opts.memoize && memo.put(cache, entry, res.data, opts), 
    res;
  }
  function copy(byDigest, cache, key, dest, opts) {
    return opts = GetOpts(opts), read.copy ? (byDigest ? BB.resolve(null) : index.find(cache, key, opts)).then(entry => {
      if (!entry && !byDigest) throw new index.NotFoundError(cache, key);
      return read.copy(cache, byDigest ? key : entry.integrity, dest, opts).then(() => byDigest ? key : {
        metadata: entry.metadata,
        size: entry.size,
        integrity: entry.integrity
      });
    }) : getData(byDigest, cache, key, opts).then(res => fs.writeFileAsync(dest, byDigest ? res : res.data).then(() => byDigest ? key : {
      metadata: res.metadata,
      size: res.size,
      integrity: res.integrity
    }));
  }
  module.exports = function(cache, key, opts) {
    return getData(!1, cache, key, opts);
  }, module.exports.byDigest = function(cache, digest, opts) {
    return getData(!0, cache, digest, opts);
  }, module.exports.sync = function(cache, key, opts) {
    return getDataSync(!1, cache, key, opts);
  }, module.exports.sync.byDigest = function(cache, digest, opts) {
    return getDataSync(!0, cache, digest, opts);
  }, module.exports.stream = function(cache, key, opts) {
    opts = GetOpts(opts);
    let stream = through();
    const memoized = memo.get(cache, key, opts);
    if (memoized && !1 !== opts.memoize) return stream.on("newListener", (function(ev, cb) {
      "metadata" === ev && cb(memoized.entry.metadata), "integrity" === ev && cb(memoized.entry.integrity), 
      "size" === ev && cb(memoized.entry.size);
    })), stream.write(memoized.data, () => stream.end()), stream;
    return index.find(cache, key).then(entry => {
      if (!entry) return stream.emit("error", new index.NotFoundError(cache, key));
      let memoStream;
      if (opts.memoize) {
        let memoData = [], memoLength = 0;
        memoStream = through((c, en, cb) => {
          memoData && memoData.push(c), memoLength += c.length, cb(null, c, en);
        }, cb => {
          memoData && memo.put(cache, entry, Buffer.concat(memoData, memoLength), opts), cb();
        });
      } else memoStream = through();
      stream.emit("metadata", entry.metadata), stream.emit("integrity", entry.integrity), 
      stream.emit("size", entry.size), stream.on("newListener", (function(ev, cb) {
        "metadata" === ev && cb(entry.metadata), "integrity" === ev && cb(entry.integrity), 
        "size" === ev && cb(entry.size);
      })), pipe(read.readStream(cache, entry.integrity, opts.concat({
        size: null == opts.size ? entry.size : opts.size
      })), memoStream, stream);
    }).catch(err => stream.emit("error", err)), stream;
  }, module.exports.stream.byDigest = function(cache, integrity, opts) {
    opts = GetOpts(opts);
    const memoized = memo.get.byDigest(cache, integrity, opts);
    if (memoized && !1 !== opts.memoize) {
      const stream = through();
      return stream.write(memoized, () => stream.end()), stream;
    }
    {
      let stream = read.readStream(cache, integrity, opts);
      if (opts.memoize) {
        let memoData = [], memoLength = 0;
        const memoStream = through((c, en, cb) => {
          memoData && memoData.push(c), memoLength += c.length, cb(null, c, en);
        }, cb => {
          memoData && memo.put.byDigest(cache, integrity, Buffer.concat(memoData, memoLength), opts), 
          cb();
        });
        stream = pipeline(stream, memoStream);
      }
      return stream;
    }
  }, module.exports.info = function(cache, key, opts) {
    opts = GetOpts(opts);
    const memoized = memo.get(cache, key, opts);
    return memoized && !1 !== opts.memoize ? BB.resolve(memoized.entry) : index.find(cache, key);
  }, module.exports.hasContent = read.hasContent, module.exports.copy = function(cache, key, dest, opts) {
    return copy(!1, cache, key, dest, opts);
  }, module.exports.copy.byDigest = function(cache, digest, dest, opts) {
    return copy(!0, cache, digest, dest, opts);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const Yallist = __webpack_require__(75), MAX = Symbol("max"), LENGTH = Symbol("length"), LENGTH_CALCULATOR = Symbol("lengthCalculator"), ALLOW_STALE = Symbol("allowStale"), MAX_AGE = Symbol("maxAge"), DISPOSE = Symbol("dispose"), NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet"), LRU_LIST = Symbol("lruList"), CACHE = Symbol("cache"), UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet"), naiveLength = () => 1;
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
      this[LENGTH] = 0, this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key), this[LENGTH] += hit.length;
      })), trim(this);
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
      return this[LRU_LIST].toArray().map(k => k.key);
    }
    values() {
      return this[LRU_LIST].toArray().map(k => k.value);
    }
    reset() {
      this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length && this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value)), 
      this[CACHE] = new Map, this[LRU_LIST] = new Yallist, this[LENGTH] = 0;
    }
    dump() {
      return this[LRU_LIST].map(hit => !isStale(this, hit) && {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h);
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
      this[CACHE].forEach((value, key) => get(this, key, !1));
    }
  };
}, function(module, exports, __webpack_require__) {
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
    __webpack_require__(76)(Yallist);
  } catch (er) {}
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(Yallist) {
    Yallist.prototype[Symbol.iterator] = function*() {
      for (let walker = this.head; walker; walker = walker.next) yield walker.value;
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const figgyPudding = __webpack_require__(7), index = __webpack_require__(11), memo = __webpack_require__(17), write = __webpack_require__(78), to = __webpack_require__(4).to, PutOpts = figgyPudding({
    algorithms: {
      default: [ "sha512" ]
    },
    integrity: {},
    memoize: {},
    metadata: {},
    pickAlgorithm: {},
    size: {},
    tmpPrefix: {},
    single: {},
    sep: {},
    error: {},
    strict: {}
  });
  module.exports = function(cache, key, data, opts) {
    return opts = PutOpts(opts), write(cache, data, opts).then(res => index.insert(cache, key, res.integrity, opts.concat({
      size: res.size
    })).then(entry => (opts.memoize && memo.put(cache, entry, data, opts), res.integrity)));
  }, module.exports.stream = function(cache, key, opts) {
    let integrity, size;
    opts = PutOpts(opts);
    const contentStream = write.stream(cache, opts).on("integrity", int => {
      integrity = int;
    }).on("size", s => {
      size = s;
    });
    let memoData, memoTotal = 0;
    const stream = to((chunk, enc, cb) => {
      contentStream.write(chunk, enc, () => {
        opts.memoize && (memoData || (memoData = []), memoData.push(chunk), memoTotal += chunk.length), 
        cb();
      });
    }, cb => {
      contentStream.end(() => {
        index.insert(cache, key, integrity, opts.concat({
          size: size
        })).then(entry => {
          opts.memoize && memo.put(cache, entry, Buffer.concat(memoData, memoTotal), opts), 
          stream.emit("integrity", integrity), cb();
        });
      });
    });
    let erred = !1;
    return stream.once("error", err => {
      erred || (erred = !0, contentStream.emit("error", err));
    }), contentStream.once("error", err => {
      erred || (erred = !0, stream.emit("error", err));
    }), stream;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), contentPath = __webpack_require__(12), fixOwner = __webpack_require__(15), fs = __webpack_require__(10), moveFile = __webpack_require__(79), PassThrough = __webpack_require__(14).PassThrough, path = __webpack_require__(1), pipe = BB.promisify(__webpack_require__(4).pipe), rimraf = BB.promisify(__webpack_require__(8)), ssri = __webpack_require__(13), to = __webpack_require__(4).to, uniqueFilename = __webpack_require__(32), Y = __webpack_require__(16), writeFileAsync = BB.promisify(fs.writeFile);
  function makeTmp(cache, opts) {
    const tmpTarget = uniqueFilename(path.join(cache, "tmp"), opts.tmpPrefix);
    return fixOwner.mkdirfix(cache, path.dirname(tmpTarget)).then(() => ({
      target: tmpTarget,
      moved: !1
    })).disposer(tmp => !tmp.moved && rimraf(tmp.target));
  }
  function moveToDestination(tmp, cache, sri, opts, errCheck) {
    errCheck && errCheck();
    const destination = contentPath(cache, sri), destDir = path.dirname(destination);
    return fixOwner.mkdirfix(cache, destDir).then(() => (errCheck && errCheck(), moveFile(tmp.target, destination))).then(() => (errCheck && errCheck(), 
    tmp.moved = !0, fixOwner.chownr(cache, destination)));
  }
  module.exports = function(cache, data, opts) {
    if ((opts = opts || {}).algorithms && opts.algorithms.length > 1) throw new Error(Y`opts.algorithms only supports a single algorithm for now`);
    if ("number" == typeof opts.size && data.length !== opts.size) return BB.reject((expected = opts.size, 
    found = data.length, (err = new Error(Y`Bad data size: expected inserted data to be ${expected} bytes, but got ${found} instead`)).expected = expected, 
    err.found = found, err.code = "EBADSIZE", err));
    var expected, found, err;
    const sri = ssri.fromData(data, {
      algorithms: opts.algorithms
    });
    if (opts.integrity && !ssri.checkData(data, opts.integrity, opts)) return BB.reject(function(expected, found) {
      var err = new Error(Y`Integrity check failed:
  Wanted: ${expected}
   Found: ${found}`);
      return err.code = "EINTEGRITY", err.expected = expected, err.found = found, err;
    }(opts.integrity, sri));
    return BB.using(makeTmp(cache, opts), tmp => writeFileAsync(tmp.target, data, {
      flag: "wx"
    }).then(() => moveToDestination(tmp, cache, sri, opts))).then(() => ({
      integrity: sri,
      size: data.length
    }));
  }, module.exports.stream = function(cache, opts) {
    opts = opts || {};
    const inputStream = new PassThrough;
    let allDone, inputErr = !1;
    function errCheck() {
      if (inputErr) throw inputErr;
    }
    const ret = to((c, n, cb) => {
      allDone || (allDone = function(inputStream, cache, opts, errCheck) {
        return BB.using(makeTmp(cache, opts), tmp => (errCheck(), function(inputStream, cache, tmpTarget, opts, errCheck) {
          return BB.resolve().then(() => {
            let integrity, size;
            const hashStream = ssri.integrityStream({
              integrity: opts.integrity,
              algorithms: opts.algorithms,
              size: opts.size
            }).on("integrity", s => {
              integrity = s;
            }).on("size", s => {
              size = s;
            }), outStream = fs.createWriteStream(tmpTarget, {
              flags: "wx"
            });
            return errCheck(), pipe(inputStream, hashStream, outStream).then(() => ({
              integrity: integrity,
              size: size
            })).catch(err => rimraf(tmpTarget).then(() => {
              throw err;
            }));
          });
        }(inputStream, 0, tmp.target, opts, errCheck).then(res => moveToDestination(tmp, cache, res.integrity, opts, errCheck).then(() => res))));
      }(inputStream, cache, opts, errCheck)), inputStream.write(c, n, cb);
    }, cb => {
      inputStream.end(() => {
        if (!allDone) {
          const e = new Error(Y`Cache input stream was empty`);
          return e.code = "ENODATA", ret.emit("error", e);
        }
        allDone.then(res => {
          res.integrity && ret.emit("integrity", res.integrity), null !== res.size && ret.emit("size", res.size), 
          cb();
        }, e => {
          ret.emit("error", e);
        });
      });
    });
    return ret.once("error", e => {
      inputErr = e;
    }), ret;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const fs = __webpack_require__(10), BB = __webpack_require__(2), chmod = BB.promisify(fs.chmod), unlink = BB.promisify(fs.unlink);
  let move, pinflight;
  module.exports = function(src, dest) {
    return BB.fromNode(cb => {
      fs.link(src, dest, err => {
        if (err) if ("EEXIST" === err.code || "EBUSY" === err.code) ; else if ("EPERM" !== err.code || "win32" !== process.platform) return cb(err);
        return cb();
      });
    }).then(() => BB.join(unlink(src), "win32" !== process.platform && chmod(dest, "0444"))).catch(() => (pinflight || (pinflight = __webpack_require__(26)), 
    pinflight("cacache-move-file:" + dest, () => BB.promisify(fs.stat)(dest).catch(err => {
      if ("ENOENT" !== err.code) throw err;
      return move || (move = __webpack_require__(80)), move(src, dest, {
        BB: BB,
        fs: fs
      });
    }))));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = function(from, to, opts) {
    validate("SSO|SS", arguments);
    var Promise = (opts = extend({}, opts || {})).Promise || global.Promise, fs = opts.fs || nodeFs, rimrafAsync = promisify(Promise, rimraf), renameAsync = promisify(Promise, fs.rename);
    opts.top = from;
    var queue = new RunQueue({
      maxConcurrency: opts.maxConcurrency,
      Promise: Promise
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
        return "EXDEV" !== err.code ? Promise.reject(err) : remove(to).then((function() {
          return copy.item(from, to, opts);
        }));
      }));
    }
  };
  var nodeFs = __webpack_require__(3), rimraf = __webpack_require__(8), validate = __webpack_require__(19), copy = __webpack_require__(81), RunQueue = __webpack_require__(31), extend = Object.assign || __webpack_require__(9)._extend;
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
}, function(module, exports, __webpack_require__) {
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
      Promise: Promise
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
  var nodeFs = __webpack_require__(3), path = __webpack_require__(1), validate = __webpack_require__(19), stockWriteStreamAtomic = __webpack_require__(82), mkdirp = __webpack_require__(25), rimraf = __webpack_require__(8), isWindows = __webpack_require__(85), RunQueue = __webpack_require__(31), extend = Object.assign || __webpack_require__(9)._extend;
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
      fs: fs,
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
}, function(module, exports, __webpack_require__) {
  var fs = __webpack_require__(10), Writable = __webpack_require__(83).Writable, util = __webpack_require__(9), MurmurHash3 = __webpack_require__(30), iferr = __webpack_require__(84), crypto = __webpack_require__(18);
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
        writeStream.__isWin && err.syscall && "rename" === err.syscall && err.code && "EPERM" === err.code ? function(eperm) {
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
        }(err) : cleanup(err);
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
        !function() {
          try {
            fs.unlinkSync(writeStream.__atomicTmp);
          } finally {
            return;
          }
        }(), writeStream.emit("error", er), writeStream.__atomicClosed = !0, writeStream.emit("close");
      };
    }(this));
  }
  module.exports = WriteStreamAtomic, util.inherits(WriteStreamAtomic, Writable), 
  WriteStreamAtomic.prototype.emit = function(event) {
    return "finish" === event ? this.__atomicStream.end() : Writable.prototype.emit.apply(this, arguments);
  }, WriteStreamAtomic.prototype._write = function(buffer, encoding, cb) {
    if (this.__atomicStream.write(buffer, encoding)) return cb();
    this.__atomicStream.once("drain", cb);
  };
}, function(module, exports) {
  module.exports = require("./readable-stream");
}, function(module, exports) {
  (function() {
    var exports, iferr, printerr, throwerr, tiferr, __slice = [].slice;
    tiferr = function(fail, succ) {
      return iferr(fail, (function() {
        var a;
        a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        try {
          return succ.apply(null, a);
        } catch (_error) {
          return fail(_error);
        }
      }));
    }, throwerr = (iferr = function(fail, succ) {
      return function() {
        var a, err;
        return err = arguments[0], a = 2 <= arguments.length ? __slice.call(arguments, 1) : [], 
        null != err ? fail(err) : "function" == typeof succ ? succ.apply(null, a) : void 0;
      };
    }).bind(null, (function(err) {
      throw err;
    })), printerr = iferr((function(err) {
      return console.error(err.stack || err);
    })), module.exports = exports = iferr, exports.iferr = iferr, exports.tiferr = tiferr, 
    exports.throwerr = throwerr, exports.printerr = printerr;
  }).call(this);
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = "win32" === process.platform;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var MurmurHash3 = __webpack_require__(30);
  module.exports = function(uniq) {
    return uniq ? ("00000000" + new MurmurHash3(uniq).result().toString(16)).substr(-8) : (Math.random().toString(16) + "0000000").substr(2, 8);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), index = __webpack_require__(11), memo = __webpack_require__(17), path = __webpack_require__(1), rimraf = BB.promisify(__webpack_require__(8)), rmContent = __webpack_require__(88);
  function entry(cache, key) {
    return memo.clearMemoized(), index.delete(cache, key);
  }
  module.exports = entry, module.exports.entry = entry, module.exports.content = function(cache, integrity) {
    return memo.clearMemoized(), rmContent(cache, integrity);
  }, module.exports.all = function(cache) {
    return memo.clearMemoized(), rimraf(path.join(cache, "*(content-*|index-*)"));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), contentPath = __webpack_require__(12), hasContent = __webpack_require__(28).hasContent, rimraf = BB.promisify(__webpack_require__(8));
  module.exports = function(cache, integrity) {
    return hasContent(cache, integrity).then(content => {
      if (!content) return !1;
      {
        const sri = content.sri;
        if (sri) return rimraf(contentPath(cache, sri)).then(() => !0);
      }
    });
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = __webpack_require__(90);
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), contentPath = __webpack_require__(12), figgyPudding = __webpack_require__(7), finished = BB.promisify(__webpack_require__(4).finished), fixOwner = __webpack_require__(15), fs = __webpack_require__(10), glob = BB.promisify(__webpack_require__(29)), index = __webpack_require__(11), path = __webpack_require__(1), rimraf = BB.promisify(__webpack_require__(8)), ssri = __webpack_require__(13);
  BB.promisifyAll(fs);
  const VerifyOpts = figgyPudding({
    concurrency: {
      default: 20
    },
    filter: {},
    log: {
      default: {
        silly() {}
      }
    }
  });
  function markStartTime(cache, opts) {
    return {
      startTime: new Date
    };
  }
  function markEndTime(cache, opts) {
    return {
      endTime: new Date
    };
  }
  function fixPerms(cache, opts) {
    return opts.log.silly("verify", "fixing cache permissions"), fixOwner.mkdirfix(cache, cache).then(() => fixOwner.chownr(cache, cache)).then(() => null);
  }
  function garbageCollect(cache, opts) {
    opts.log.silly("verify", "garbage collecting content");
    const indexStream = index.lsStream(cache), liveContent = new Set;
    return indexStream.on("data", entry => {
      opts.filter && !opts.filter(entry) || liveContent.add(entry.integrity.toString());
    }), finished(indexStream).then(() => {
      const contentDir = contentPath._contentDir(cache);
      return glob(path.join(contentDir, "**"), {
        follow: !1,
        nodir: !0,
        nosort: !0
      }).then(files => BB.resolve({
        verifiedContent: 0,
        reclaimedCount: 0,
        reclaimedSize: 0,
        badContentCount: 0,
        keptSize: 0
      }).tap(stats => BB.map(files, f => {
        const split = f.split(/[/\\]/), digest = split.slice(split.length - 3).join(""), algo = split[split.length - 4], integrity = ssri.fromHex(digest, algo);
        return liveContent.has(integrity.toString()) ? (filepath = f, sri = integrity, fs.statAsync(filepath).then(stat => {
          const contentInfo = {
            size: stat.size,
            valid: !0
          };
          return ssri.checkStream(fs.createReadStream(filepath), sri).catch(err => {
            if ("EINTEGRITY" !== err.code) throw err;
            return rimraf(filepath).then(() => {
              contentInfo.valid = !1;
            });
          }).then(() => contentInfo);
        }).catch({
          code: "ENOENT"
        }, () => ({
          size: 0,
          valid: !1
        }))).then(info => (info.valid ? (stats.verifiedContent++, stats.keptSize += info.size) : (stats.reclaimedCount++, 
        stats.badContentCount++, stats.reclaimedSize += info.size), stats)) : (stats.reclaimedCount++, 
        fs.statAsync(f).then(s => rimraf(f).then(() => (stats.reclaimedSize += s.size, stats))));
        var filepath, sri;
      }, {
        concurrency: opts.concurrency
      })));
    });
  }
  function rebuildIndex(cache, opts) {
    return opts.log.silly("verify", "rebuilding index"), index.ls(cache).then(entries => {
      const stats = {
        missingContent: 0,
        rejectedEntries: 0,
        totalEntries: 0
      }, buckets = {};
      for (let k in entries) if (entries.hasOwnProperty(k)) {
        const hashed = index._hashKey(k), entry = entries[k], excluded = opts.filter && !opts.filter(entry);
        excluded && stats.rejectedEntries++, buckets[hashed] && !excluded ? buckets[hashed].push(entry) : buckets[hashed] && excluded || (excluded ? (buckets[hashed] = [], 
        buckets[hashed]._path = index._bucketPath(cache, k)) : (buckets[hashed] = [ entry ], 
        buckets[hashed]._path = index._bucketPath(cache, k)));
      }
      return BB.map(Object.keys(buckets), key => function(cache, bucket, stats, opts) {
        return fs.truncateAsync(bucket._path).then(() => BB.mapSeries(bucket, entry => {
          const content = contentPath(cache, entry.integrity);
          return fs.statAsync(content).then(() => index.insert(cache, entry.key, entry.integrity, {
            metadata: entry.metadata,
            size: entry.size
          }).then(() => {
            stats.totalEntries++;
          })).catch({
            code: "ENOENT"
          }, () => {
            stats.rejectedEntries++, stats.missingContent++;
          });
        }));
      }(cache, buckets[key], stats), {
        concurrency: opts.concurrency
      }).then(() => stats);
    });
  }
  function cleanTmp(cache, opts) {
    return opts.log.silly("verify", "cleaning tmp directory"), rimraf(path.join(cache, "tmp"));
  }
  function writeVerifile(cache, opts) {
    const verifile = path.join(cache, "_lastverified");
    opts.log.silly("verify", "writing verifile to " + verifile);
    try {
      return fs.writeFileAsync(verifile, "" + +new Date);
    } finally {
      fixOwner.chownr.sync(cache, verifile);
    }
  }
  module.exports = function(cache, opts) {
    return (opts = VerifyOpts(opts)).log.silly("verify", "verifying cache at", cache), 
    BB.reduce([ markStartTime, fixPerms, garbageCollect, rebuildIndex, cleanTmp, writeVerifile, markEndTime ], (stats, step, i) => {
      const label = step.name || "step #" + i, start = new Date;
      return BB.resolve(step(cache, opts)).then(s => {
        s && Object.keys(s).forEach(k => {
          stats[k] = s[k];
        });
        const end = new Date;
        return stats.runTime || (stats.runTime = {}), stats.runTime[label] = end - start, 
        stats;
      });
    }, {}).tap(stats => {
      stats.runTime.total = stats.endTime - stats.startTime, opts.log.silly("verify", "verification finished for", cache, "in", stats.runTime.total + "ms");
    });
  }, module.exports.lastRun = function(cache) {
    return fs.readFileAsync(path.join(cache, "_lastverified"), "utf8").then(data => new Date(+data));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const BB = __webpack_require__(2), figgyPudding = __webpack_require__(7), fixOwner = __webpack_require__(15), path = __webpack_require__(1), rimraf = BB.promisify(__webpack_require__(8)), uniqueFilename = __webpack_require__(32), TmpOpts = figgyPudding({
    tmpPrefix: {}
  });
  function mktmpdir(cache, opts) {
    opts = TmpOpts(opts);
    const tmpTarget = uniqueFilename(path.join(cache, "tmp"), opts.tmpPrefix);
    return fixOwner.mkdirfix(cache, tmpTarget).then(() => tmpTarget);
  }
  module.exports.mkdir = mktmpdir, module.exports.withTmp = function(cache, opts, cb) {
    cb || (cb = opts, opts = null);
    return opts = TmpOpts(opts), BB.using(mktmpdir(cache, opts).disposer(rimraf), cb);
  }, module.exports.fix = function(cache) {
    return fixOwner(cache, path.join(cache, "tmp"));
  };
} ]);