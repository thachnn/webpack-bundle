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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 105);
}([ function(module, exports) {
  module.exports = require("./types");
}, function(module, exports, __webpack_require__) {
  var freeGlobal = __webpack_require__(30), freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
  module.exports = root;
}, function(module, exports) {
  module.exports = function(value) {
    var type = typeof value;
    return null != value && ("object" == type || "function" == type);
  };
}, function(module, exports) {
  module.exports = function(value) {
    return null != value && "object" == typeof value;
  };
}, , function(module, exports) {
  var isArray = Array.isArray;
  module.exports = isArray;
}, function(module, exports, __webpack_require__) {
  var baseIsNative = __webpack_require__(74), getValue = __webpack_require__(77);
  module.exports = function(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), getRawTag = __webpack_require__(62), objectToString = __webpack_require__(63), symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  module.exports = function(value) {
    return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  };
}, function(module, exports) {
  module.exports = require("path");
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(1).Symbol;
  module.exports = Symbol;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const GENSYNC_START = Symbol.for("gensync:v1:start"), GENSYNC_SUSPEND = Symbol.for("gensync:v1:suspend");
  function assertTypeof(type, name, value, allowUndefined) {
    if (typeof value === type || allowUndefined && void 0 === value) return;
    let msg;
    throw msg = allowUndefined ? `Expected opts.${name} to be either a ${type}, or undefined.` : `Expected opts.${name} to be a ${type}.`, 
    makeError(msg, "GENSYNC_OPTIONS_ERROR");
  }
  function makeError(msg, code) {
    return Object.assign(new Error(msg), {
      code: code
    });
  }
  function buildOperation({name: name, arity: arity, sync: sync, async: async}) {
    return setFunctionMetadata(name, arity, (function*(...args) {
      const resume = yield GENSYNC_START;
      if (!resume) {
        return sync.call(this, args);
      }
      let result;
      try {
        async.call(this, args, value => {
          result || (result = {
            value: value
          }, resume());
        }, err => {
          result || (result = {
            err: err
          }, resume());
        });
      } catch (err) {
        result = {
          err: err
        }, resume();
      }
      if (yield GENSYNC_SUSPEND, result.hasOwnProperty("err")) throw result.err;
      return result.value;
    }));
  }
  function evaluateSync(gen) {
    let value;
    for (;!({value: value} = gen.next()).done; ) assertStart(value, gen);
    return value;
  }
  function evaluateAsync(gen, resolve, reject) {
    !function step() {
      try {
        let value;
        for (;!({value: value} = gen.next()).done; ) {
          assertStart(value, gen);
          let sync = !0, didSyncResume = !1;
          const out = gen.next(() => {
            sync ? didSyncResume = !0 : step();
          });
          if (sync = !1, assertSuspend(out, gen), !didSyncResume) return;
        }
        return resolve(value);
      } catch (err) {
        return reject(err);
      }
    }();
  }
  function assertStart(value, gen) {
    value !== GENSYNC_START && throwError(gen, makeError(`Got unexpected yielded value in gensync generator: ${JSON.stringify(value)}. Did you perhaps mean to use 'yield*' instead of 'yield'?`, "GENSYNC_EXPECTED_START"));
  }
  function assertSuspend({value: value, done: done}, gen) {
    (done || value !== GENSYNC_SUSPEND) && throwError(gen, makeError(done ? "Unexpected generator completion. If you get this, it is probably a gensync bug." : `Expected GENSYNC_SUSPEND, got ${JSON.stringify(value)}. If you get this, it is probably a gensync bug.`, "GENSYNC_EXPECTED_SUSPEND"));
  }
  function throwError(gen, err) {
    throw gen.throw && gen.throw(err), err;
  }
  function setFunctionMetadata(name, arity, fn) {
    if ("string" == typeof name) {
      const nameDesc = Object.getOwnPropertyDescriptor(fn, "name");
      nameDesc && !nameDesc.configurable || Object.defineProperty(fn, "name", Object.assign(nameDesc || {}, {
        configurable: !0,
        value: name
      }));
    }
    if ("number" == typeof arity) {
      const lengthDesc = Object.getOwnPropertyDescriptor(fn, "length");
      lengthDesc && !lengthDesc.configurable || Object.defineProperty(fn, "length", Object.assign(lengthDesc || {}, {
        configurable: !0,
        value: arity
      }));
    }
    return fn;
  }
  module.exports = Object.assign((function(optsOrFn) {
    let genFn = optsOrFn;
    return genFn = "function" != typeof optsOrFn ? function({name: name, arity: arity, sync: sync, async: async, errback: errback}) {
      if (assertTypeof("string", "name", name, !0), assertTypeof("number", "arity", arity, !0), 
      assertTypeof("function", "sync", sync), assertTypeof("function", "async", async, !0), 
      assertTypeof("function", "errback", errback, !0), async && errback) throw makeError("Expected one of either opts.async or opts.errback, but got _both_.", "GENSYNC_OPTIONS_ERROR");
      if ("string" != typeof name) {
        let fnName;
        errback && errback.name && "errback" !== errback.name && (fnName = errback.name), 
        async && async.name && "async" !== async.name && (fnName = async.name.replace(/Async$/, "")), 
        sync && sync.name && "sync" !== sync.name && (fnName = sync.name.replace(/Sync$/, "")), 
        "string" == typeof fnName && (name = fnName);
      }
      "number" != typeof arity && (arity = sync.length);
      return buildOperation({
        name: name,
        arity: arity,
        sync: function(args) {
          return sync.apply(this, args);
        },
        async: function(args, resolve, reject) {
          async ? async.apply(this, args).then(resolve, reject) : errback ? errback.call(this, ...args, (err, value) => {
            null == err ? resolve(value) : reject(err);
          }) : resolve(sync.apply(this, args));
        }
      });
    }(optsOrFn) : function(genFn) {
      return setFunctionMetadata(genFn.name, genFn.length, (function(...args) {
        return genFn.apply(this, args);
      }));
    }(optsOrFn), Object.assign(genFn, function(genFn) {
      return {
        sync: function(...args) {
          return evaluateSync(genFn.apply(this, args));
        },
        async: function(...args) {
          return new Promise((resolve, reject) => {
            evaluateAsync(genFn.apply(this, args), resolve, reject);
          });
        },
        errback: function(...args) {
          const cb = args.pop();
          if ("function" != typeof cb) throw makeError("Asynchronous function called without callback", "GENSYNC_ERRBACK_NO_CALLBACK");
          let gen;
          try {
            gen = genFn.apply(this, args);
          } catch (err) {
            return void cb(err);
          }
          evaluateAsync(gen, val => cb(void 0, val), err => cb(err));
        }
      };
    }(genFn));
  }), {
    all: buildOperation({
      name: "all",
      arity: 1,
      sync: function(args) {
        return Array.from(args[0]).map(item => evaluateSync(item));
      },
      async: function(args, resolve, reject) {
        const items = Array.from(args[0]);
        if (0 === items.length) return void Promise.resolve().then(() => resolve([]));
        let count = 0;
        const results = items.map(() => {});
        items.forEach((item, i) => {
          evaluateAsync(item, val => {
            results[i] = val, count += 1, count === results.length && resolve(results);
          }, reject);
        });
      }
    }),
    race: buildOperation({
      name: "race",
      arity: 1,
      sync: function(args) {
        const items = Array.from(args[0]);
        if (0 === items.length) throw makeError("Must race at least 1 item", "GENSYNC_RACE_NONEMPTY");
        return evaluateSync(items[0]);
      },
      async: function(args, resolve, reject) {
        const items = Array.from(args[0]);
        if (0 === items.length) throw makeError("Must race at least 1 item", "GENSYNC_RACE_NONEMPTY");
        for (const item of items) evaluateAsync(item, resolve, reject);
      }
    })
  });
}, , , function(module, exports, __webpack_require__) {
  var isFunction = __webpack_require__(29), isLength = __webpack_require__(19);
  module.exports = function(value) {
    return null != value && isLength(value.length) && !isFunction(value);
  };
}, function(module, exports) {
  exports.getArg = function(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) return aArgs[aName];
    if (3 === arguments.length) return aDefaultValue;
    throw new Error('"' + aName + '" is a required argument.');
  };
  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/, dataUrlRegexp = /^data:.+\,.+$/;
  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    return match ? {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    } : null;
  }
  function urlGenerate(aParsedUrl) {
    var url = "";
    return aParsedUrl.scheme && (url += aParsedUrl.scheme + ":"), url += "//", aParsedUrl.auth && (url += aParsedUrl.auth + "@"), 
    aParsedUrl.host && (url += aParsedUrl.host), aParsedUrl.port && (url += ":" + aParsedUrl.port), 
    aParsedUrl.path && (url += aParsedUrl.path), url;
  }
  function normalize(aPath) {
    var path = aPath, url = urlParse(aPath);
    if (url) {
      if (!url.path) return aPath;
      path = url.path;
    }
    for (var part, isAbsolute = exports.isAbsolute(path), parts = path.split(/\/+/), up = 0, i = parts.length - 1; i >= 0; i--) "." === (part = parts[i]) ? parts.splice(i, 1) : ".." === part ? up++ : up > 0 && ("" === part ? (parts.splice(i + 1, up), 
    up = 0) : (parts.splice(i, 2), up--));
    return "" === (path = parts.join("/")) && (path = isAbsolute ? "/" : "."), url ? (url.path = path, 
    urlGenerate(url)) : path;
  }
  exports.urlParse = urlParse, exports.urlGenerate = urlGenerate, exports.normalize = normalize, 
  exports.join = function(aRoot, aPath) {
    "" === aRoot && (aRoot = "."), "" === aPath && (aPath = ".");
    var aPathUrl = urlParse(aPath), aRootUrl = urlParse(aRoot);
    if (aRootUrl && (aRoot = aRootUrl.path || "/"), aPathUrl && !aPathUrl.scheme) return aRootUrl && (aPathUrl.scheme = aRootUrl.scheme), 
    urlGenerate(aPathUrl);
    if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) return aRootUrl.host = aPath, 
    urlGenerate(aRootUrl);
    var joined = "/" === aPath.charAt(0) ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
    return aRootUrl ? (aRootUrl.path = joined, urlGenerate(aRootUrl)) : joined;
  }, exports.isAbsolute = function(aPath) {
    return "/" === aPath.charAt(0) || !!aPath.match(urlRegexp);
  }, exports.relative = function(aRoot, aPath) {
    "" === aRoot && (aRoot = "."), aRoot = aRoot.replace(/\/$/, "");
    for (var level = 0; 0 !== aPath.indexOf(aRoot + "/"); ) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) return aPath;
      if ((aRoot = aRoot.slice(0, index)).match(/^([^\/]+:\/)?\/*$/)) return aPath;
      ++level;
    }
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  };
  var supportsNullProto = !("__proto__" in Object.create(null));
  function identity(s) {
    return s;
  }
  function isProtoString(s) {
    if (!s) return !1;
    var length = s.length;
    if (length < 9) return !1;
    if (95 !== s.charCodeAt(length - 1) || 95 !== s.charCodeAt(length - 2) || 111 !== s.charCodeAt(length - 3) || 116 !== s.charCodeAt(length - 4) || 111 !== s.charCodeAt(length - 5) || 114 !== s.charCodeAt(length - 6) || 112 !== s.charCodeAt(length - 7) || 95 !== s.charCodeAt(length - 8) || 95 !== s.charCodeAt(length - 9)) return !1;
    for (var i = length - 10; i >= 0; i--) if (36 !== s.charCodeAt(i)) return !1;
    return !0;
  }
  function strcmp(aStr1, aStr2) {
    return aStr1 === aStr2 ? 0 : aStr1 > aStr2 ? 1 : -1;
  }
  exports.toSetString = supportsNullProto ? identity : function(aStr) {
    return isProtoString(aStr) ? "$" + aStr : aStr;
  }, exports.fromSetString = supportsNullProto ? identity : function(aStr) {
    return isProtoString(aStr) ? aStr.slice(1) : aStr;
  }, exports.compareByOriginalPositions = function(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = mappingA.source - mappingB.source;
    return 0 !== cmp || 0 !== (cmp = mappingA.originalLine - mappingB.originalLine) || 0 !== (cmp = mappingA.originalColumn - mappingB.originalColumn) || onlyCompareOriginal || 0 !== (cmp = mappingA.generatedColumn - mappingB.generatedColumn) || 0 !== (cmp = mappingA.generatedLine - mappingB.generatedLine) ? cmp : mappingA.name - mappingB.name;
  }, exports.compareByGeneratedPositionsDeflated = function(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    return 0 !== cmp || 0 !== (cmp = mappingA.generatedColumn - mappingB.generatedColumn) || onlyCompareGenerated || 0 !== (cmp = mappingA.source - mappingB.source) || 0 !== (cmp = mappingA.originalLine - mappingB.originalLine) || 0 !== (cmp = mappingA.originalColumn - mappingB.originalColumn) ? cmp : mappingA.name - mappingB.name;
  }, exports.compareByGeneratedPositionsInflated = function(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    return 0 !== cmp || 0 !== (cmp = mappingA.generatedColumn - mappingB.generatedColumn) || 0 !== (cmp = strcmp(mappingA.source, mappingB.source)) || 0 !== (cmp = mappingA.originalLine - mappingB.originalLine) || 0 !== (cmp = mappingA.originalColumn - mappingB.originalColumn) ? cmp : strcmp(mappingA.name, mappingB.name);
  };
}, function(module, exports) {
  module.exports = function(func) {
    return function(value) {
      return func(value);
    };
  };
}, function(module, exports) {
  module.exports = function(value, other) {
    return value === other || value != value && other != other;
  };
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
  (function(module) {
    var freeGlobal = __webpack_require__(30), freeExports = exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process, nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {}
    }();
    module.exports = nodeUtil;
  }).call(this, __webpack_require__(17)(module));
}, function(module, exports) {
  module.exports = function(value) {
    return "number" == typeof value && value > -1 && value % 1 == 0 && value <= 9007199254740991;
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(6)(Object, "create");
  module.exports = nativeCreate;
}, function(module, exports, __webpack_require__) {
  var listCacheClear = __webpack_require__(160), listCacheDelete = __webpack_require__(161), listCacheGet = __webpack_require__(162), listCacheHas = __webpack_require__(163), listCacheSet = __webpack_require__(164);
  function ListCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, 
  ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, 
  ListCache.prototype.set = listCacheSet, module.exports = ListCache;
}, function(module, exports, __webpack_require__) {
  var eq = __webpack_require__(16);
  module.exports = function(array, key) {
    for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
    return -1;
  };
}, function(module, exports, __webpack_require__) {
  var isKeyable = __webpack_require__(166);
  module.exports = function(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map;
  };
}, function(module, exports, __webpack_require__) {
  var arrayLikeKeys = __webpack_require__(41), baseKeys = __webpack_require__(176), isArrayLike = __webpack_require__(13);
  module.exports = function(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  };
}, function(module, exports) {
  var objectProto = Object.prototype;
  module.exports = function(value) {
    var Ctor = value && value.constructor;
    return value === ("function" == typeof Ctor && Ctor.prototype || objectProto);
  };
}, function(module, exports, __webpack_require__) {
  var assignValue = __webpack_require__(85), baseAssignValue = __webpack_require__(86);
  module.exports = function(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    for (var index = -1, length = props.length; ++index < length; ) {
      var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      void 0 === newValue && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue);
    }
    return object;
  };
}, function(module, exports, __webpack_require__) {
  var arrayLikeKeys = __webpack_require__(41), baseKeysIn = __webpack_require__(87), isArrayLike = __webpack_require__(13);
  module.exports = function(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object);
  };
}, , function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isObject = __webpack_require__(2);
  module.exports = function(value) {
    if (!isObject(value)) return !1;
    var tag = baseGetTag(value);
    return "[object Function]" == tag || "[object GeneratorFunction]" == tag || "[object AsyncFunction]" == tag || "[object Proxy]" == tag;
  };
}, function(module, exports) {
  var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
  module.exports = freeGlobal;
}, function(module, exports) {
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  module.exports = function(value, length) {
    var type = typeof value;
    return !!(length = null == length ? 9007199254740991 : length) && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var root = __webpack_require__(1), stubFalse = __webpack_require__(82), freeExports = exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, isBuffer = (Buffer ? Buffer.isBuffer : void 0) || stubFalse;
    module.exports = isBuffer;
  }).call(this, __webpack_require__(17)(module));
}, function(module, exports, __webpack_require__) {
  var DataView = __webpack_require__(178), Map = __webpack_require__(39), Promise = __webpack_require__(179), Set = __webpack_require__(180), WeakMap = __webpack_require__(181), baseGetTag = __webpack_require__(7), toSource = __webpack_require__(38), dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap), getTag = baseGetTag;
  (DataView && "[object DataView]" != getTag(new DataView(new ArrayBuffer(1))) || Map && "[object Map]" != getTag(new Map) || Promise && "[object Promise]" != getTag(Promise.resolve()) || Set && "[object Set]" != getTag(new Set) || WeakMap && "[object WeakMap]" != getTag(new WeakMap)) && (getTag = function(value) {
    var result = baseGetTag(value), Ctor = "[object Object]" == result ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) switch (ctorString) {
     case dataViewCtorString:
      return "[object DataView]";

     case mapCtorString:
      return "[object Map]";

     case promiseCtorString:
      return "[object Promise]";

     case setCtorString:
      return "[object Set]";

     case weakMapCtorString:
      return "[object WeakMap]";
    }
    return result;
  }), module.exports = getTag;
}, , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = exports.program = exports.expression = exports.statements = exports.statement = exports.smart = void 0;
  var obj, formatters = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(107)), _builder = (obj = __webpack_require__(108)) && obj.__esModule ? obj : {
    default: obj
  };
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const smart = (0, _builder.default)(formatters.smart);
  exports.smart = smart;
  const statement = (0, _builder.default)(formatters.statement);
  exports.statement = statement;
  const statements = (0, _builder.default)(formatters.statements);
  exports.statements = statements;
  const expression = (0, _builder.default)(formatters.expression);
  exports.expression = expression;
  const program = (0, _builder.default)(formatters.program);
  exports.program = program;
  var _default = Object.assign(smart.bind(void 0), {
    smart: smart,
    statement: statement,
    statements: statements,
    expression: expression,
    program: program,
    ast: smart.ast
  });
  exports.default = _default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.merge = function(a, b) {
    const {placeholderWhitelist: placeholderWhitelist = a.placeholderWhitelist, placeholderPattern: placeholderPattern = a.placeholderPattern, preserveComments: preserveComments = a.preserveComments, syntacticPlaceholders: syntacticPlaceholders = a.syntacticPlaceholders} = b;
    return {
      parser: Object.assign({}, a.parser, b.parser),
      placeholderWhitelist: placeholderWhitelist,
      placeholderPattern: placeholderPattern,
      preserveComments: preserveComments,
      syntacticPlaceholders: syntacticPlaceholders
    };
  }, exports.validate = function(opts) {
    if (null != opts && "object" != typeof opts) throw new Error("Unknown template options.");
    const _ref = opts || {}, {placeholderWhitelist: placeholderWhitelist, placeholderPattern: placeholderPattern, preserveComments: preserveComments, syntacticPlaceholders: syntacticPlaceholders} = _ref, parser = function(source, excluded) {
      if (null == source) return {};
      var key, i, target = {}, sourceKeys = Object.keys(source);
      for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
      return target;
    }(_ref, [ "placeholderWhitelist", "placeholderPattern", "preserveComments", "syntacticPlaceholders" ]);
    if (null != placeholderWhitelist && !(placeholderWhitelist instanceof Set)) throw new Error("'.placeholderWhitelist' must be a Set, null, or undefined");
    if (null != placeholderPattern && !(placeholderPattern instanceof RegExp) && !1 !== placeholderPattern) throw new Error("'.placeholderPattern' must be a RegExp, false, null, or undefined");
    if (null != preserveComments && "boolean" != typeof preserveComments) throw new Error("'.preserveComments' must be a boolean, null, or undefined");
    if (null != syntacticPlaceholders && "boolean" != typeof syntacticPlaceholders) throw new Error("'.syntacticPlaceholders' must be a boolean, null, or undefined");
    if (!0 === syntacticPlaceholders && (null != placeholderWhitelist || null != placeholderPattern)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
    return {
      parser: parser,
      placeholderWhitelist: placeholderWhitelist || void 0,
      placeholderPattern: null == placeholderPattern ? void 0 : placeholderPattern,
      preserveComments: null == preserveComments ? void 0 : preserveComments,
      syntacticPlaceholders: null == syntacticPlaceholders ? void 0 : syntacticPlaceholders
    };
  }, exports.normalizeReplacements = function(replacements) {
    if (Array.isArray(replacements)) return replacements.reduce((acc, replacement, i) => (acc["$" + i] = replacement, 
    acc), {});
    if ("object" == typeof replacements || null == replacements) return replacements || void 0;
    throw new Error("Template replacements must be an array, object, null, or undefined");
  };
}, function(module, exports, __webpack_require__) {
  var baseIsArguments = __webpack_require__(72), isObjectLike = __webpack_require__(3), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, propertyIsEnumerable = objectProto.propertyIsEnumerable, isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  module.exports = isArguments;
}, function(module, exports) {
  var funcToString = Function.prototype.toString;
  module.exports = function(func) {
    if (null != func) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + "";
      } catch (e) {}
    }
    return "";
  };
}, function(module, exports, __webpack_require__) {
  var Map = __webpack_require__(6)(__webpack_require__(1), "Map");
  module.exports = Map;
}, function(module, exports, __webpack_require__) {
  var arrayFilter = __webpack_require__(175), stubArray = __webpack_require__(80), propertyIsEnumerable = Object.prototype.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
    return null == object ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), (function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    })));
  } : stubArray;
  module.exports = getSymbols;
}, function(module, exports, __webpack_require__) {
  var baseTimes = __webpack_require__(81), isArguments = __webpack_require__(37), isArray = __webpack_require__(5), isBuffer = __webpack_require__(32), isIndex = __webpack_require__(31), isTypedArray = __webpack_require__(55), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) !inherited && !hasOwnProperty.call(value, key) || skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)) || result.push(key);
    return result;
  };
}, function(module, exports) {
  module.exports = function(value) {
    return value;
  };
}, function(module, exports, __webpack_require__) {
  var Uint8Array = __webpack_require__(100);
  module.exports = function(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    return new Uint8Array(result).set(new Uint8Array(arrayBuffer)), result;
  };
}, , , function(module, exports) {
  module.exports = require("./traverse");
}, function(module, exports) {
  module.exports = require("./parser");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.codeFrameColumns = codeFrameColumns, exports.default = function(rawLines, lineNumber, colNumber, opts = {}) {
    if (!deprecationWarningShown) {
      deprecationWarningShown = !0;
      const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
      if (process.emitWarning) process.emitWarning(message, "DeprecationWarning"); else {
        new Error(message).name = "DeprecationWarning", console.warn(new Error(message));
      }
    }
    colNumber = Math.max(colNumber, 0);
    return codeFrameColumns(rawLines, {
      start: {
        column: colNumber,
        line: lineNumber
      }
    }, opts);
  };
  var _highlight = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(110));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  let deprecationWarningShown = !1;
  const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
  function codeFrameColumns(rawLines, loc, opts = {}) {
    const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts), chalk = (0, 
    _highlight.getChalk)(opts), defs = function(chalk) {
      return {
        gutter: chalk.grey,
        marker: chalk.red.bold,
        message: chalk.red.bold
      };
    }(chalk), maybeHighlight = (chalkFn, string) => highlighted ? chalkFn(string) : string, lines = rawLines.split(NEWLINE), {start: start, end: end, markerLines: markerLines} = function(loc, source, opts) {
      const startLoc = Object.assign({
        column: 0,
        line: -1
      }, loc.start), endLoc = Object.assign({}, startLoc, loc.end), {linesAbove: linesAbove = 2, linesBelow: linesBelow = 3} = opts || {}, startLine = startLoc.line, startColumn = startLoc.column, endLine = endLoc.line, endColumn = endLoc.column;
      let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
      -1 === startLine && (start = 0), -1 === endLine && (end = source.length);
      const lineDiff = endLine - startLine, markerLines = {};
      if (lineDiff) for (let i = 0; i <= lineDiff; i++) {
        const lineNumber = i + startLine;
        if (startColumn) if (0 === i) {
          const sourceLength = source[lineNumber - 1].length;
          markerLines[lineNumber] = [ startColumn, sourceLength - startColumn + 1 ];
        } else if (i === lineDiff) markerLines[lineNumber] = [ 0, endColumn ]; else {
          const sourceLength = source[lineNumber - i].length;
          markerLines[lineNumber] = [ 0, sourceLength ];
        } else markerLines[lineNumber] = !0;
      } else markerLines[startLine] = startColumn === endColumn ? !startColumn || [ startColumn, 0 ] : [ startColumn, endColumn - startColumn ];
      return {
        start: start,
        end: end,
        markerLines: markerLines
      };
    }(loc, lines, opts), hasColumns = loc.start && "number" == typeof loc.start.column, numberMaxWidth = String(end).length;
    let frame = (highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines).split(NEWLINE).slice(start, end).map((line, index) => {
      const number = start + 1 + index, gutter = ` ${(" " + number).slice(-numberMaxWidth)} | `, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
      if (hasMarker) {
        let markerLine = "";
        if (Array.isArray(hasMarker)) {
          const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
          markerLine = [ "\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers) ].join(""), 
          lastMarkerLine && opts.message && (markerLine += " " + maybeHighlight(defs.message, opts.message));
        }
        return [ maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line, markerLine ].join("");
      }
      return ` ${maybeHighlight(defs.gutter, gutter)}${line}`;
    }).join("\n");
    return opts.message && !hasColumns && (frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`), 
    highlighted ? chalk.reset(frame) : frame;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), Object.defineProperty(exports, "isIdentifierName", {
    enumerable: !0,
    get: function() {
      return _identifier.isIdentifierName;
    }
  }), Object.defineProperty(exports, "isIdentifierChar", {
    enumerable: !0,
    get: function() {
      return _identifier.isIdentifierChar;
    }
  }), Object.defineProperty(exports, "isIdentifierStart", {
    enumerable: !0,
    get: function() {
      return _identifier.isIdentifierStart;
    }
  }), Object.defineProperty(exports, "isReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isReservedWord;
    }
  }), Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isStrictBindOnlyReservedWord;
    }
  }), Object.defineProperty(exports, "isStrictBindReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isStrictBindReservedWord;
    }
  }), Object.defineProperty(exports, "isStrictReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isStrictReservedWord;
    }
  }), Object.defineProperty(exports, "isKeyword", {
    enumerable: !0,
    get: function() {
      return _keyword.isKeyword;
    }
  });
  var _identifier = __webpack_require__(59), _keyword = __webpack_require__(60);
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = (obj = __webpack_require__(10)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.makeWeakCache = makeWeakCache, exports.makeWeakCacheSync = function(handler) {
    return synchronize(makeWeakCache(handler));
  }, exports.makeStrongCache = makeStrongCache, exports.makeStrongCacheSync = function(handler) {
    return synchronize(makeStrongCache(handler));
  }, exports.assertSimpleType = assertSimpleType;
  var _async = __webpack_require__(137), _util = __webpack_require__(138);
  const synchronize = gen => (0, _gensync().default)(gen).sync;
  function* genTrue(data) {
    return !0;
  }
  function makeWeakCache(handler) {
    return makeCachedFunction(WeakMap, handler);
  }
  function makeStrongCache(handler) {
    return makeCachedFunction(Map, handler);
  }
  function makeCachedFunction(CallCache, handler) {
    const callCacheSync = new CallCache, callCacheAsync = new CallCache, futureCache = new CallCache;
    return function*(arg, data) {
      const asyncContext = yield* (0, _async.isAsync)(), callCache = asyncContext ? callCacheAsync : callCacheSync, cached = yield* function*(asyncContext, callCache, futureCache, arg, data) {
        const cached = yield* getCachedValue(callCache, arg, data);
        if (cached.valid) return cached;
        if (asyncContext) {
          const cached = yield* getCachedValue(futureCache, arg, data);
          if (cached.valid) {
            return {
              valid: !0,
              value: yield* (0, _async.waitFor)(cached.value.promise)
            };
          }
        }
        return {
          valid: !1,
          value: null
        };
      }(asyncContext, callCache, futureCache, arg, data);
      if (cached.valid) return cached.value;
      const cache = new CacheConfigurator(data), handlerResult = handler(arg, cache);
      let finishLock, value;
      if ((0, _util.isIterableIterator)(handlerResult)) {
        const gen = handlerResult;
        value = yield* (0, _async.onFirstPause)(gen, () => {
          finishLock = function(config, futureCache, arg) {
            const finishLock = new Lock;
            return updateFunctionCache(futureCache, config, arg, finishLock), finishLock;
          }(cache, futureCache, arg);
        });
      } else value = handlerResult;
      return updateFunctionCache(callCache, cache, arg, value), finishLock && (futureCache.delete(arg), 
      finishLock.release(value)), value;
    };
  }
  function* getCachedValue(cache, arg, data) {
    const cachedValue = cache.get(arg);
    if (cachedValue) for (const {value: value, valid: valid} of cachedValue) if (yield* valid(data)) return {
      valid: !0,
      value: value
    };
    return {
      valid: !1,
      value: null
    };
  }
  function updateFunctionCache(cache, config, arg, value) {
    config.configured() || config.forever();
    let cachedValue = cache.get(arg);
    switch (config.deactivate(), config.mode()) {
     case "forever":
      cachedValue = [ {
        value: value,
        valid: genTrue
      } ], cache.set(arg, cachedValue);
      break;

     case "invalidate":
      cachedValue = [ {
        value: value,
        valid: config.validator()
      } ], cache.set(arg, cachedValue);
      break;

     case "valid":
      cachedValue ? cachedValue.push({
        value: value,
        valid: config.validator()
      }) : (cachedValue = [ {
        value: value,
        valid: config.validator()
      } ], cache.set(arg, cachedValue));
    }
  }
  class CacheConfigurator {
    constructor(data) {
      this._active = !0, this._never = !1, this._forever = !1, this._invalidate = !1, 
      this._configured = !1, this._pairs = [], this._data = data;
    }
    simple() {
      return function(cache) {
        function cacheFn(val) {
          if ("boolean" != typeof val) return cache.using(() => assertSimpleType(val()));
          val ? cache.forever() : cache.never();
        }
        return cacheFn.forever = () => cache.forever(), cacheFn.never = () => cache.never(), 
        cacheFn.using = cb => cache.using(() => assertSimpleType(cb())), cacheFn.invalidate = cb => cache.invalidate(() => assertSimpleType(cb())), 
        cacheFn;
      }(this);
    }
    mode() {
      return this._never ? "never" : this._forever ? "forever" : this._invalidate ? "invalidate" : "valid";
    }
    forever() {
      if (!this._active) throw new Error("Cannot change caching after evaluation has completed.");
      if (this._never) throw new Error("Caching has already been configured with .never()");
      this._forever = !0, this._configured = !0;
    }
    never() {
      if (!this._active) throw new Error("Cannot change caching after evaluation has completed.");
      if (this._forever) throw new Error("Caching has already been configured with .forever()");
      this._never = !0, this._configured = !0;
    }
    using(handler) {
      if (!this._active) throw new Error("Cannot change caching after evaluation has completed.");
      if (this._never || this._forever) throw new Error("Caching has already been configured with .never or .forever()");
      this._configured = !0;
      const key = handler(this._data), fn = (0, _async.maybeAsync)(handler, "You appear to be using an async cache handler, but Babel has been called synchronously");
      return (0, _async.isThenable)(key) ? key.then(key => (this._pairs.push([ key, fn ]), 
      key)) : (this._pairs.push([ key, fn ]), key);
    }
    invalidate(handler) {
      return this._invalidate = !0, this.using(handler);
    }
    validator() {
      const pairs = this._pairs;
      return function*(data) {
        for (const [key, fn] of pairs) if (key !== (yield* fn(data))) return !1;
        return !0;
      };
    }
    deactivate() {
      this._active = !1;
    }
    configured() {
      return this._configured;
    }
  }
  function assertSimpleType(value) {
    if ((0, _async.isThenable)(value)) throw new Error("You appear to be using an async cache handler, which your current version of Babel does not support. We may add support for this in the future, but if you're on the most recent version of @babel/core and still seeing this error, then you'll need to synchronously handle your caching logic.");
    if (null != value && "string" != typeof value && "boolean" != typeof value && "number" != typeof value) throw new Error("Cache keys must be either string, boolean, number, null, or undefined.");
    return value;
  }
  class Lock {
    constructor() {
      this.released = !1, this.promise = new Promise(resolve => {
        this._resolve = resolve;
      });
    }
    release(value) {
      this.released = !0, this._resolve(value);
    }
  }
}, function(module, exports) {
  module.exports = require("fs");
}, function(module, exports, __webpack_require__) {
  "undefined" == typeof process || "renderer" === process.type || !0 === process.browser || process.__nwjs ? module.exports = __webpack_require__(140) : module.exports = __webpack_require__(142);
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
      return _full.default;
    }
  }), exports.loadOptionsAsync = exports.loadOptionsSync = exports.loadOptions = exports.loadPartialConfigAsync = exports.loadPartialConfigSync = exports.loadPartialConfig = void 0;
  var _full = _interopRequireDefault(__webpack_require__(295)), _partial = __webpack_require__(232);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const loadOptionsRunner = (0, _gensync().default)((function*(opts) {
    var _config$options;
    const config = yield* (0, _full.default)(opts);
    return null != (_config$options = null == config ? void 0 : config.options) ? _config$options : null;
  })), maybeErrback = runner => (opts, callback) => (void 0 === callback && "function" == typeof opts && (callback = opts, 
  opts = void 0), callback ? runner.errback(opts, callback) : runner.sync(opts)), loadPartialConfig = maybeErrback(_partial.loadPartialConfig);
  exports.loadPartialConfig = loadPartialConfig;
  const loadPartialConfigSync = _partial.loadPartialConfig.sync;
  exports.loadPartialConfigSync = loadPartialConfigSync;
  const loadPartialConfigAsync = _partial.loadPartialConfig.async;
  exports.loadPartialConfigAsync = loadPartialConfigAsync;
  const loadOptions = maybeErrback(loadOptionsRunner);
  exports.loadOptions = loadOptions;
  const loadOptionsSync = loadOptionsRunner.sync;
  exports.loadOptionsSync = loadOptionsSync;
  const loadOptionsAsync = loadOptionsRunner.async;
  exports.loadOptionsAsync = loadOptionsAsync;
}, function(module, exports) {
  module.exports = function(array, values) {
    for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var baseIsTypedArray = __webpack_require__(83), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  module.exports = isTypedArray;
}, function(module, exports, __webpack_require__) {
  var getNative = __webpack_require__(6), defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      return func({}, "", {}), func;
    } catch (e) {}
  }();
  module.exports = defineProperty;
}, function(module, exports, __webpack_require__) {
  var getPrototype = __webpack_require__(84)(Object.getPrototypeOf, Object);
  module.exports = getPrototype;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(formatter, code, opts) {
    const {placeholderWhitelist: placeholderWhitelist, placeholderPattern: placeholderPattern, preserveComments: preserveComments, syntacticPlaceholders: syntacticPlaceholders} = opts, ast = function(code, parserOpts, syntacticPlaceholders) {
      const plugins = (parserOpts.plugins || []).slice();
      !1 !== syntacticPlaceholders && plugins.push("placeholders");
      parserOpts = Object.assign({
        allowReturnOutsideFunction: !0,
        allowSuperOutsideMethod: !0,
        sourceType: "module"
      }, parserOpts, {
        plugins: plugins
      });
      try {
        return (0, _parser.parse)(code, parserOpts);
      } catch (err) {
        const loc = err.loc;
        throw loc && (err.message += "\n" + (0, _codeFrame.codeFrameColumns)(code, {
          start: loc
        }), err.code = "BABEL_TEMPLATE_PARSE_ERROR"), err;
      }
    }(code, opts.parser, syntacticPlaceholders);
    t.removePropertiesDeep(ast, {
      preserveComments: preserveComments
    }), formatter.validate(ast);
    const syntactic = {
      placeholders: [],
      placeholderNames: new Set
    }, legacy = {
      placeholders: [],
      placeholderNames: new Set
    }, isLegacyRef = {
      value: void 0
    };
    return t.traverse(ast, placeholderVisitorHandler, {
      syntactic: syntactic,
      legacy: legacy,
      isLegacyRef: isLegacyRef,
      placeholderWhitelist: placeholderWhitelist,
      placeholderPattern: placeholderPattern,
      syntacticPlaceholders: syntacticPlaceholders
    }), Object.assign({
      ast: ast
    }, isLegacyRef.value ? legacy : syntactic);
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0)), _parser = __webpack_require__(47), _codeFrame = __webpack_require__(48);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const PATTERN = /^[_$A-Z0-9]+$/;
  function placeholderVisitorHandler(node, ancestors, state) {
    var _state$placeholderWhi;
    let name;
    if (t.isPlaceholder(node)) {
      if (!1 === state.syntacticPlaceholders) throw new Error("%%foo%%-style placeholders can't be used when '.syntacticPlaceholders' is false.");
      name = node.name.name, state.isLegacyRef.value = !1;
    } else {
      if (!1 === state.isLegacyRef.value || state.syntacticPlaceholders) return;
      if (t.isIdentifier(node) || t.isJSXIdentifier(node)) name = node.name, state.isLegacyRef.value = !0; else {
        if (!t.isStringLiteral(node)) return;
        name = node.value, state.isLegacyRef.value = !0;
      }
    }
    if (!state.isLegacyRef.value && (null != state.placeholderPattern || null != state.placeholderWhitelist)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
    if (state.isLegacyRef.value && (!1 === state.placeholderPattern || !(state.placeholderPattern || PATTERN).test(name)) && !(null == (_state$placeholderWhi = state.placeholderWhitelist) ? void 0 : _state$placeholderWhi.has(name))) return;
    ancestors = ancestors.slice();
    const {node: parent, key: key} = ancestors[ancestors.length - 1];
    let type;
    t.isStringLiteral(node) || t.isPlaceholder(node, {
      expectedNode: "StringLiteral"
    }) ? type = "string" : t.isNewExpression(parent) && "arguments" === key || t.isCallExpression(parent) && "arguments" === key || t.isFunction(parent) && "params" === key ? type = "param" : t.isExpressionStatement(parent) && !t.isPlaceholder(node) ? (type = "statement", 
    ancestors = ancestors.slice(0, -1)) : type = t.isStatement(node) && t.isPlaceholder(node) ? "statement" : "other";
    const {placeholders: placeholders, placeholderNames: placeholderNames} = state.isLegacyRef.value ? state.legacy : state.syntactic;
    placeholders.push({
      name: name,
      type: type,
      resolve: ast => function(ast, ancestors) {
        let parent = ast;
        for (let i = 0; i < ancestors.length - 1; i++) {
          const {key: key, index: index} = ancestors[i];
          parent = void 0 === index ? parent[key] : parent[key][index];
        }
        const {key: key, index: index} = ancestors[ancestors.length - 1];
        return {
          parent: parent,
          key: key,
          index: index
        };
      }(ast, ancestors),
      isDuplicate: placeholderNames.has(name)
    }), placeholderNames.add(name);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isIdentifierStart = isIdentifierStart, exports.isIdentifierChar = isIdentifierChar, 
  exports.isIdentifierName = function(name) {
    let isFirst = !0;
    for (let _i = 0, _Array$from = Array.from(name); _i < _Array$from.length; _i++) {
      const cp = _Array$from[_i].codePointAt(0);
      if (isFirst) {
        if (!isIdentifierStart(cp)) return !1;
        isFirst = !1;
      } else if (!isIdentifierChar(cp)) return !1;
    }
    return !isFirst;
  };
  let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
  const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
  const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];
  function isInAstralSet(code, set) {
    let pos = 65536;
    for (let i = 0, length = set.length; i < length; i += 2) {
      if (pos += set[i], pos > code) return !1;
      if (pos += set[i + 1], pos >= code) return !0;
    }
    return !1;
  }
  function isIdentifierStart(code) {
    return code < 65 ? 36 === code : code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes)));
  }
  function isIdentifierChar(code) {
    return code < 48 ? 36 === code : code < 58 || !(code < 65) && (code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes))));
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isReservedWord = isReservedWord, exports.isStrictReservedWord = isStrictReservedWord, 
  exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, exports.isStrictBindReservedWord = function(word, inModule) {
    return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
  }, exports.isKeyword = function(word) {
    return keywords.has(word);
  };
  const reservedWords_strict = [ "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield" ], reservedWords_strictBind = [ "eval", "arguments" ], keywords = new Set([ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete" ]), reservedWordsStrictSet = new Set(reservedWords_strict), reservedWordsStrictBindSet = new Set(reservedWords_strictBind);
  function isReservedWord(word, inModule) {
    return inModule && "await" === word || "enum" === word;
  }
  function isStrictReservedWord(word, inModule) {
    return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
  }
  function isStrictBindOnlyReservedWord(word) {
    return reservedWordsStrictBindSet.has(word);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(metadata, replacements) {
    const ast = t.cloneNode(metadata.ast);
    replacements && (metadata.placeholders.forEach(placeholder => {
      if (!Object.prototype.hasOwnProperty.call(replacements, placeholder.name)) {
        const placeholderName = placeholder.name;
        throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a\n            placeholder you may want to consider passing one of the following options to @babel/template:\n            - { placeholderPattern: false, placeholderWhitelist: new Set(['${placeholderName}'])}\n            - { placeholderPattern: /^${placeholderName}$/ }`);
      }
    }), Object.keys(replacements).forEach(key => {
      if (!metadata.placeholderNames.has(key)) throw new Error(`Unknown substitution "${key}" given`);
    }));
    return metadata.placeholders.slice().reverse().forEach(placeholder => {
      try {
        !function(placeholder, ast, replacement) {
          placeholder.isDuplicate && (Array.isArray(replacement) ? replacement = replacement.map(node => t.cloneNode(node)) : "object" == typeof replacement && (replacement = t.cloneNode(replacement)));
          const {parent: parent, key: key, index: index} = placeholder.resolve(ast);
          if ("string" === placeholder.type) {
            if ("string" == typeof replacement && (replacement = t.stringLiteral(replacement)), 
            !replacement || !t.isStringLiteral(replacement)) throw new Error("Expected string substitution");
          } else if ("statement" === placeholder.type) void 0 === index ? replacement ? Array.isArray(replacement) ? replacement = t.blockStatement(replacement) : "string" == typeof replacement ? replacement = t.expressionStatement(t.identifier(replacement)) : t.isStatement(replacement) || (replacement = t.expressionStatement(replacement)) : replacement = t.emptyStatement() : replacement && !Array.isArray(replacement) && ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
          t.isStatement(replacement) || (replacement = t.expressionStatement(replacement))); else if ("param" === placeholder.type) {
            if ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
            void 0 === index) throw new Error("Assertion failure.");
          } else if ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
          Array.isArray(replacement)) throw new Error("Cannot replace single expression with an array.");
          if (void 0 === index) t.validate(parent, key, replacement), parent[key] = replacement; else {
            const items = parent[key].slice();
            "statement" === placeholder.type || "param" === placeholder.type ? null == replacement ? items.splice(index, 1) : Array.isArray(replacement) ? items.splice(index, 1, ...replacement) : items[index] = replacement : items[index] = replacement, 
            t.validate(parent, key, items), parent[key] = items;
          }
        }(placeholder, ast, replacements && replacements[placeholder.name] || null);
      } catch (e) {
        throw e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`, 
        e;
      }
    }), ast;
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  module.exports = function(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = !0;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
    result;
  };
}, function(module, exports) {
  var nativeObjectToString = Object.prototype.toString;
  module.exports = function(value) {
    return nativeObjectToString.call(value);
  };
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return "symbol" == typeof value || isObjectLike(value) && "[object Symbol]" == baseGetTag(value);
  };
}, function(module, exports, __webpack_require__) {
  var base64VLQ = __webpack_require__(66), util = __webpack_require__(14), ArraySet = __webpack_require__(67).ArraySet, MappingList = __webpack_require__(117).MappingList;
  function SourceMapGenerator(aArgs) {
    aArgs || (aArgs = {}), this._file = util.getArg(aArgs, "file", null), this._sourceRoot = util.getArg(aArgs, "sourceRoot", null), 
    this._skipValidation = util.getArg(aArgs, "skipValidation", !1), this._sources = new ArraySet, 
    this._names = new ArraySet, this._mappings = new MappingList, this._sourcesContents = null;
  }
  SourceMapGenerator.prototype._version = 3, SourceMapGenerator.fromSourceMap = function(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot, generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    return aSourceMapConsumer.eachMapping((function(mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };
      null != mapping.source && (newMapping.source = mapping.source, null != sourceRoot && (newMapping.source = util.relative(sourceRoot, newMapping.source)), 
      newMapping.original = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      }, null != mapping.name && (newMapping.name = mapping.name)), generator.addMapping(newMapping);
    })), aSourceMapConsumer.sources.forEach((function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      null != content && generator.setSourceContent(sourceFile, content);
    })), generator;
  }, SourceMapGenerator.prototype.addMapping = function(aArgs) {
    var generated = util.getArg(aArgs, "generated"), original = util.getArg(aArgs, "original", null), source = util.getArg(aArgs, "source", null), name = util.getArg(aArgs, "name", null);
    this._skipValidation || this._validateMapping(generated, original, source, name), 
    null != source && (source = String(source), this._sources.has(source) || this._sources.add(source)), 
    null != name && (name = String(name), this._names.has(name) || this._names.add(name)), 
    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: null != original && original.line,
      originalColumn: null != original && original.column,
      source: source,
      name: name
    });
  }, SourceMapGenerator.prototype.setSourceContent = function(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    null != this._sourceRoot && (source = util.relative(this._sourceRoot, source)), 
    null != aSourceContent ? (this._sourcesContents || (this._sourcesContents = Object.create(null)), 
    this._sourcesContents[util.toSetString(source)] = aSourceContent) : this._sourcesContents && (delete this._sourcesContents[util.toSetString(source)], 
    0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null));
  }, SourceMapGenerator.prototype.applySourceMap = function(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    if (null == aSourceFile) {
      if (null == aSourceMapConsumer.file) throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    null != sourceRoot && (sourceFile = util.relative(sourceRoot, sourceFile));
    var newSources = new ArraySet, newNames = new ArraySet;
    this._mappings.unsortedForEach((function(mapping) {
      if (mapping.source === sourceFile && null != mapping.originalLine) {
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        null != original.source && (mapping.source = original.source, null != aSourceMapPath && (mapping.source = util.join(aSourceMapPath, mapping.source)), 
        null != sourceRoot && (mapping.source = util.relative(sourceRoot, mapping.source)), 
        mapping.originalLine = original.line, mapping.originalColumn = original.column, 
        null != original.name && (mapping.name = original.name));
      }
      var source = mapping.source;
      null == source || newSources.has(source) || newSources.add(source);
      var name = mapping.name;
      null == name || newNames.has(name) || newNames.add(name);
    }), this), this._sources = newSources, this._names = newNames, aSourceMapConsumer.sources.forEach((function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      null != content && (null != aSourceMapPath && (sourceFile = util.join(aSourceMapPath, sourceFile)), 
      null != sourceRoot && (sourceFile = util.relative(sourceRoot, sourceFile)), this.setSourceContent(sourceFile, content));
    }), this);
  }, SourceMapGenerator.prototype._validateMapping = function(aGenerated, aOriginal, aSource, aName) {
    if (aOriginal && "number" != typeof aOriginal.line && "number" != typeof aOriginal.column) throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
    if ((!(aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0) || aOriginal || aSource || aName) && !(aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource)) throw new Error("Invalid mapping: " + JSON.stringify({
      generated: aGenerated,
      source: aSource,
      original: aOriginal,
      name: aName
    }));
  }, SourceMapGenerator.prototype._serializeMappings = function() {
    for (var next, mapping, nameIdx, sourceIdx, previousGeneratedColumn = 0, previousGeneratedLine = 1, previousOriginalColumn = 0, previousOriginalLine = 0, previousName = 0, previousSource = 0, result = "", mappings = this._mappings.toArray(), i = 0, len = mappings.length; i < len; i++) {
      if (next = "", (mapping = mappings[i]).generatedLine !== previousGeneratedLine) for (previousGeneratedColumn = 0; mapping.generatedLine !== previousGeneratedLine; ) next += ";", 
      previousGeneratedLine++; else if (i > 0) {
        if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
        next += ",";
      }
      next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn), previousGeneratedColumn = mapping.generatedColumn, 
      null != mapping.source && (sourceIdx = this._sources.indexOf(mapping.source), next += base64VLQ.encode(sourceIdx - previousSource), 
      previousSource = sourceIdx, next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine), 
      previousOriginalLine = mapping.originalLine - 1, next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn), 
      previousOriginalColumn = mapping.originalColumn, null != mapping.name && (nameIdx = this._names.indexOf(mapping.name), 
      next += base64VLQ.encode(nameIdx - previousName), previousName = nameIdx)), result += next;
    }
    return result;
  }, SourceMapGenerator.prototype._generateSourcesContent = function(aSources, aSourceRoot) {
    return aSources.map((function(source) {
      if (!this._sourcesContents) return null;
      null != aSourceRoot && (source = util.relative(aSourceRoot, source));
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }), this);
  }, SourceMapGenerator.prototype.toJSON = function() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return null != this._file && (map.file = this._file), null != this._sourceRoot && (map.sourceRoot = this._sourceRoot), 
    this._sourcesContents && (map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot)), 
    map;
  }, SourceMapGenerator.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, exports.SourceMapGenerator = SourceMapGenerator;
}, function(module, exports, __webpack_require__) {
  var base64 = __webpack_require__(116);
  exports.encode = function(aValue) {
    var digit, encoded = "", vlq = function(aValue) {
      return aValue < 0 ? 1 + (-aValue << 1) : 0 + (aValue << 1);
    }(aValue);
    do {
      digit = 31 & vlq, (vlq >>>= 5) > 0 && (digit |= 32), encoded += base64.encode(digit);
    } while (vlq > 0);
    return encoded;
  }, exports.decode = function(aStr, aIndex, aOutParam) {
    var continuation, digit, aValue, shifted, strLen = aStr.length, result = 0, shift = 0;
    do {
      if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
      if (-1 === (digit = base64.decode(aStr.charCodeAt(aIndex++)))) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      continuation = !!(32 & digit), result += (digit &= 31) << shift, shift += 5;
    } while (continuation);
    aOutParam.value = (shifted = (aValue = result) >> 1, 1 == (1 & aValue) ? -shifted : shifted), 
    aOutParam.rest = aIndex;
  };
}, function(module, exports, __webpack_require__) {
  var util = __webpack_require__(14), has = Object.prototype.hasOwnProperty, hasNativeMap = "undefined" != typeof Map;
  function ArraySet() {
    this._array = [], this._set = hasNativeMap ? new Map : Object.create(null);
  }
  ArraySet.fromArray = function(aArray, aAllowDuplicates) {
    for (var set = new ArraySet, i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
    return set;
  }, ArraySet.prototype.size = function() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, ArraySet.prototype.add = function(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util.toSetString(aStr), isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr), idx = this._array.length;
    isDuplicate && !aAllowDuplicates || this._array.push(aStr), isDuplicate || (hasNativeMap ? this._set.set(aStr, idx) : this._set[sStr] = idx);
  }, ArraySet.prototype.has = function(aStr) {
    if (hasNativeMap) return this._set.has(aStr);
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }, ArraySet.prototype.indexOf = function(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) return idx;
    } else {
      var sStr = util.toSetString(aStr);
      if (has.call(this._set, sStr)) return this._set[sStr];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  }, ArraySet.prototype.at = function(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
    throw new Error("No element indexed by " + aIdx);
  }, ArraySet.prototype.toArray = function() {
    return this._array.slice();
  }, exports.ArraySet = ArraySet;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.needsWhitespace = needsWhitespace, exports.needsWhitespaceBefore = function(node, parent) {
    return needsWhitespace(node, parent, "before");
  }, exports.needsWhitespaceAfter = function(node, parent) {
    return needsWhitespace(node, parent, "after");
  }, exports.needsParens = function(node, parent, printStack) {
    if (!parent) return !1;
    if (t.isNewExpression(parent) && parent.callee === node && function isOrHasCallExpression(node) {
      if (t.isCallExpression(node)) return !0;
      return t.isMemberExpression(node) && isOrHasCallExpression(node.object);
    }(node)) return !0;
    return find(expandedParens, node, parent, printStack);
  };
  var whitespace = _interopRequireWildcard(__webpack_require__(124)), parens = _interopRequireWildcard(__webpack_require__(125)), t = _interopRequireWildcard(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  function expandAliases(obj) {
    const newObj = {};
    function add(type, func) {
      const fn = newObj[type];
      newObj[type] = fn ? function(node, parent, stack) {
        const result = fn(node, parent, stack);
        return null == result ? func(node, parent, stack) : result;
      } : func;
    }
    for (const type of Object.keys(obj)) {
      const aliases = t.FLIPPED_ALIAS_KEYS[type];
      if (aliases) for (const alias of aliases) add(alias, obj[type]); else add(type, obj[type]);
    }
    return newObj;
  }
  const expandedParens = expandAliases(parens), expandedWhitespaceNodes = expandAliases(whitespace.nodes), expandedWhitespaceList = expandAliases(whitespace.list);
  function find(obj, node, parent, printStack) {
    const fn = obj[node.type];
    return fn ? fn(node, parent, printStack) : null;
  }
  function needsWhitespace(node, parent, type) {
    if (!node) return 0;
    t.isExpressionStatement(node) && (node = node.expression);
    let linesInfo = find(expandedWhitespaceNodes, node, parent);
    if (!linesInfo) {
      const items = find(expandedWhitespaceList, node, parent);
      if (items) for (let i = 0; i < items.length && (linesInfo = needsWhitespace(items[i], node, type), 
      !linesInfo); i++) ;
    }
    return "object" == typeof linesInfo && null !== linesInfo && linesInfo[type] || 0;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.ImportSpecifier = function(node) {
    "type" !== node.importKind && "typeof" !== node.importKind || (this.word(node.importKind), 
    this.space());
    this.print(node.imported, node), node.local && node.local.name !== node.imported.name && (this.space(), 
    this.word("as"), this.space(), this.print(node.local, node));
  }, exports.ImportDefaultSpecifier = function(node) {
    this.print(node.local, node);
  }, exports.ExportDefaultSpecifier = function(node) {
    this.print(node.exported, node);
  }, exports.ExportSpecifier = function(node) {
    this.print(node.local, node), node.exported && node.local.name !== node.exported.name && (this.space(), 
    this.word("as"), this.space(), this.print(node.exported, node));
  }, exports.ExportNamespaceSpecifier = function(node) {
    this.token("*"), this.space(), this.word("as"), this.space(), this.print(node.exported, node);
  }, exports.ExportAllDeclaration = function(node) {
    this.word("export"), this.space(), "type" === node.exportKind && (this.word("type"), 
    this.space());
    this.token("*"), this.space(), this.word("from"), this.space(), this.print(node.source, node), 
    this.semicolon();
  }, exports.ExportNamedDeclaration = function(node) {
    this.format.decoratorsBeforeExport && t.isClassDeclaration(node.declaration) && this.printJoin(node.declaration.decorators, node);
    this.word("export"), this.space(), ExportDeclaration.apply(this, arguments);
  }, exports.ExportDefaultDeclaration = function(node) {
    this.format.decoratorsBeforeExport && t.isClassDeclaration(node.declaration) && this.printJoin(node.declaration.decorators, node);
    this.word("export"), this.space(), this.word("default"), this.space(), ExportDeclaration.apply(this, arguments);
  }, exports.ImportDeclaration = function(node) {
    var _node$attributes;
    this.word("import"), this.space(), ("type" === node.importKind || "typeof" === node.importKind) && (this.word(node.importKind), 
    this.space());
    const specifiers = node.specifiers.slice(0);
    if (null == specifiers ? void 0 : specifiers.length) {
      for (;;) {
        const first = specifiers[0];
        if (!t.isImportDefaultSpecifier(first) && !t.isImportNamespaceSpecifier(first)) break;
        this.print(specifiers.shift(), node), specifiers.length && (this.token(","), this.space());
      }
      specifiers.length && (this.token("{"), this.space(), this.printList(specifiers, node), 
      this.space(), this.token("}")), this.space(), this.word("from"), this.space();
    }
    this.print(node.source, node), (null == (_node$attributes = node.attributes) ? void 0 : _node$attributes.length) && (this.space(), 
    this.word("with"), this.space(), this.printList(node.attributes, node));
    this.semicolon();
  }, exports.ImportAttribute = function(node) {
    this.print(node.key), this.token(":"), this.space(), this.print(node.value);
  }, exports.ImportNamespaceSpecifier = function(node) {
    this.token("*"), this.space(), this.word("as"), this.space(), this.print(node.local, node);
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function ExportDeclaration(node) {
    if (node.declaration) {
      const declar = node.declaration;
      this.print(declar, node), t.isStatement(declar) || this.semicolon();
    } else {
      "type" === node.exportKind && (this.word("type"), this.space());
      const specifiers = node.specifiers.slice(0);
      let hasSpecial = !1;
      for (;;) {
        const first = specifiers[0];
        if (!t.isExportDefaultSpecifier(first) && !t.isExportNamespaceSpecifier(first)) break;
        hasSpecial = !0, this.print(specifiers.shift(), node), specifiers.length && (this.token(","), 
        this.space());
      }
      (specifiers.length || !specifiers.length && !hasSpecial) && (this.token("{"), specifiers.length && (this.space(), 
      this.printList(specifiers, node), this.space()), this.token("}")), node.source && (this.space(), 
      this.word("from"), this.space(), this.print(node.source, node)), this.semicolon();
    }
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.Identifier = function(node) {
    this.exactSource(node.loc, () => {
      this.word(node.name);
    });
  }, exports.ArgumentPlaceholder = function() {
    this.token("?");
  }, exports.SpreadElement = exports.RestElement = function(node) {
    this.token("..."), this.print(node.argument, node);
  }, exports.ObjectPattern = exports.ObjectExpression = function(node) {
    const props = node.properties;
    this.token("{"), this.printInnerComments(node), props.length && (this.space(), this.printList(props, node, {
      indent: !0,
      statement: !0
    }), this.space());
    this.token("}");
  }, exports.ObjectMethod = function(node) {
    this.printJoin(node.decorators, node), this._methodHead(node), this.space(), this.print(node.body, node);
  }, exports.ObjectProperty = function(node) {
    if (this.printJoin(node.decorators, node), node.computed) this.token("["), this.print(node.key, node), 
    this.token("]"); else {
      if (t.isAssignmentPattern(node.value) && t.isIdentifier(node.key) && node.key.name === node.value.left.name) return void this.print(node.value, node);
      if (this.print(node.key, node), node.shorthand && t.isIdentifier(node.key) && t.isIdentifier(node.value) && node.key.name === node.value.name) return;
    }
    this.token(":"), this.space(), this.print(node.value, node);
  }, exports.ArrayPattern = exports.ArrayExpression = function(node) {
    const elems = node.elements, len = elems.length;
    this.token("["), this.printInnerComments(node);
    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i];
      elem ? (i > 0 && this.space(), this.print(elem, node), i < len - 1 && this.token(",")) : this.token(",");
    }
    this.token("]");
  }, exports.RecordExpression = function(node) {
    const props = node.properties;
    let startToken, endToken;
    if ("bar" === this.format.recordAndTupleSyntaxType) startToken = "{|", endToken = "|}"; else {
      if ("hash" !== this.format.recordAndTupleSyntaxType) throw new Error(`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`);
      startToken = "#{", endToken = "}";
    }
    this.token(startToken), this.printInnerComments(node), props.length && (this.space(), 
    this.printList(props, node, {
      indent: !0,
      statement: !0
    }), this.space());
    this.token(endToken);
  }, exports.TupleExpression = function(node) {
    const elems = node.elements, len = elems.length;
    let startToken, endToken;
    if ("bar" === this.format.recordAndTupleSyntaxType) startToken = "[|", endToken = "|]"; else {
      if ("hash" !== this.format.recordAndTupleSyntaxType) throw new Error(this.format.recordAndTupleSyntaxType + " is not a valid recordAndTuple syntax type");
      startToken = "#[", endToken = "]";
    }
    this.token(startToken), this.printInnerComments(node);
    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i];
      elem && (i > 0 && this.space(), this.print(elem, node), i < len - 1 && this.token(","));
    }
    this.token(endToken);
  }, exports.RegExpLiteral = function(node) {
    this.word(`/${node.pattern}/${node.flags}`);
  }, exports.BooleanLiteral = function(node) {
    this.word(node.value ? "true" : "false");
  }, exports.NullLiteral = function() {
    this.word("null");
  }, exports.NumericLiteral = function(node) {
    const raw = this.getPossibleRaw(node), opts = this.format.jsescOption, value = node.value + "";
    opts.numbers ? this.number((0, _jsesc.default)(node.value, opts)) : null == raw ? this.number(value) : this.format.minified ? this.number(raw.length < value.length ? raw : value) : this.number(raw);
  }, exports.StringLiteral = function(node) {
    const raw = this.getPossibleRaw(node);
    if (!this.format.minified && null != raw) return void this.token(raw);
    const opts = this.format.jsescOption;
    this.format.jsonCompatibleStrings && (opts.json = !0);
    const val = (0, _jsesc.default)(node.value, opts);
    return this.token(val);
  }, exports.BigIntLiteral = function(node) {
    const raw = this.getPossibleRaw(node);
    if (!this.format.minified && null != raw) return void this.token(raw);
    this.token(node.value + "n");
  }, exports.PipelineTopicExpression = function(node) {
    this.print(node.expression, node);
  }, exports.PipelineBareFunction = function(node) {
    this.print(node.callee, node);
  }, exports.PipelinePrimaryTopicReference = function() {
    this.token("#");
  };
  var obj, t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0)), _jsesc = (obj = __webpack_require__(132)) && obj.__esModule ? obj : {
    default: obj
  };
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  module.exports = function(env) {
    function createDebug(namespace) {
      let prevTime;
      function debug(...args) {
        if (!debug.enabled) return;
        const self = debug, curr = Number(new Date), ms = curr - (prevTime || curr);
        self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), 
        "string" != typeof args[0] && args.unshift("%O");
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if ("%%" === match) return match;
          index++;
          const formatter = createDebug.formatters[format];
          if ("function" == typeof formatter) {
            const val = args[index];
            match = formatter.call(self, val), args.splice(index, 1), index--;
          }
          return match;
        }), createDebug.formatArgs.call(self, args);
        (self.log || createDebug.log).apply(self, args);
      }
      return debug.namespace = namespace, debug.enabled = createDebug.enabled(namespace), 
      debug.useColors = createDebug.useColors(), debug.color = createDebug.selectColor(namespace), 
      debug.destroy = destroy, debug.extend = extend, "function" == typeof createDebug.init && createDebug.init(debug), 
      createDebug.instances.push(debug), debug;
    }
    function destroy() {
      const index = createDebug.instances.indexOf(this);
      return -1 !== index && (createDebug.instances.splice(index, 1), !0);
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (void 0 === delimiter ? ":" : delimiter) + namespace);
      return newDebug.log = this.log, newDebug;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    return createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = function(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }, createDebug.disable = function() {
      const namespaces = [ ...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => "-" + namespace) ].join(",");
      return createDebug.enable(""), namespaces;
    }, createDebug.enable = function(namespaces) {
      let i;
      createDebug.save(namespaces), createDebug.names = [], createDebug.skips = [];
      const split = ("string" == typeof namespaces ? namespaces : "").split(/[\s,]+/), len = split.length;
      for (i = 0; i < len; i++) split[i] && ("-" === (namespaces = split[i].replace(/\*/g, ".*?"))[0] ? createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$")) : createDebug.names.push(new RegExp("^" + namespaces + "$")));
      for (i = 0; i < createDebug.instances.length; i++) {
        const instance = createDebug.instances[i];
        instance.enabled = createDebug.enabled(instance.namespace);
      }
    }, createDebug.enabled = function(name) {
      if ("*" === name[name.length - 1]) return !0;
      let i, len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) if (createDebug.skips[i].test(name)) return !1;
      for (i = 0, len = createDebug.names.length; i < len; i++) if (createDebug.names[i].test(name)) return !0;
      return !1;
    }, createDebug.humanize = __webpack_require__(141), Object.keys(env).forEach(key => {
      createDebug[key] = env[key];
    }), createDebug.instances = [], createDebug.names = [], createDebug.skips = [], 
    createDebug.formatters = {}, createDebug.selectColor = function(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) hash = (hash << 5) - hash + namespace.charCodeAt(i), 
      hash |= 0;
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }, createDebug.enable(createDebug.load()), createDebug;
  };
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object Arguments]" == baseGetTag(value);
  };
}, function(module, exports, __webpack_require__) {
  var mapCacheClear = __webpack_require__(153), mapCacheDelete = __webpack_require__(165), mapCacheGet = __webpack_require__(167), mapCacheHas = __webpack_require__(168), mapCacheSet = __webpack_require__(169);
  function MapCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, 
  MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, 
  module.exports = MapCache;
}, function(module, exports, __webpack_require__) {
  var isFunction = __webpack_require__(29), isMasked = __webpack_require__(75), isObject = __webpack_require__(2), toSource = __webpack_require__(38), reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  module.exports = function(value) {
    return !(!isObject(value) || isMasked(value)) && (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
  };
}, function(module, exports, __webpack_require__) {
  var uid, coreJsData = __webpack_require__(76), maskSrcKey = (uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "")) ? "Symbol(src)_1." + uid : "";
  module.exports = function(func) {
    return !!maskSrcKey && maskSrcKey in func;
  };
}, function(module, exports, __webpack_require__) {
  var coreJsData = __webpack_require__(1)["__core-js_shared__"];
  module.exports = coreJsData;
}, function(module, exports) {
  module.exports = function(object, key) {
    return null == object ? void 0 : object[key];
  };
}, function(module, exports, __webpack_require__) {
  var ListCache = __webpack_require__(21), stackClear = __webpack_require__(170), stackDelete = __webpack_require__(171), stackGet = __webpack_require__(172), stackHas = __webpack_require__(173), stackSet = __webpack_require__(174);
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, 
  Stack.prototype.has = stackHas, Stack.prototype.set = stackSet, module.exports = Stack;
}, function(module, exports, __webpack_require__) {
  var arrayPush = __webpack_require__(54), isArray = __webpack_require__(5);
  module.exports = function(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  };
}, function(module, exports) {
  module.exports = function() {
    return [];
  };
}, function(module, exports) {
  module.exports = function(n, iteratee) {
    for (var index = -1, result = Array(n); ++index < n; ) result[index] = iteratee(index);
    return result;
  };
}, function(module, exports) {
  module.exports = function() {
    return !1;
  };
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isLength = __webpack_require__(19), isObjectLike = __webpack_require__(3), typedArrayTags = {};
  typedArrayTags["[object Float32Array]"] = typedArrayTags["[object Float64Array]"] = typedArrayTags["[object Int8Array]"] = typedArrayTags["[object Int16Array]"] = typedArrayTags["[object Int32Array]"] = typedArrayTags["[object Uint8Array]"] = typedArrayTags["[object Uint8ClampedArray]"] = typedArrayTags["[object Uint16Array]"] = typedArrayTags["[object Uint32Array]"] = !0, 
  typedArrayTags["[object Arguments]"] = typedArrayTags["[object Array]"] = typedArrayTags["[object ArrayBuffer]"] = typedArrayTags["[object Boolean]"] = typedArrayTags["[object DataView]"] = typedArrayTags["[object Date]"] = typedArrayTags["[object Error]"] = typedArrayTags["[object Function]"] = typedArrayTags["[object Map]"] = typedArrayTags["[object Number]"] = typedArrayTags["[object Object]"] = typedArrayTags["[object RegExp]"] = typedArrayTags["[object Set]"] = typedArrayTags["[object String]"] = typedArrayTags["[object WeakMap]"] = !1, 
  module.exports = function(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  };
}, function(module, exports) {
  module.exports = function(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  };
}, function(module, exports, __webpack_require__) {
  var baseAssignValue = __webpack_require__(86), eq = __webpack_require__(16), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object, key, value) {
    var objValue = object[key];
    hasOwnProperty.call(object, key) && eq(objValue, value) && (void 0 !== value || key in object) || baseAssignValue(object, key, value);
  };
}, function(module, exports, __webpack_require__) {
  var defineProperty = __webpack_require__(56);
  module.exports = function(object, key, value) {
    "__proto__" == key && defineProperty ? defineProperty(object, key, {
      configurable: !0,
      enumerable: !0,
      value: value,
      writable: !0
    }) : object[key] = value;
  };
}, function(module, exports, __webpack_require__) {
  var isObject = __webpack_require__(2), isPrototype = __webpack_require__(25), nativeKeysIn = __webpack_require__(88), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object) {
    if (!isObject(object)) return nativeKeysIn(object);
    var isProto = isPrototype(object), result = [];
    for (var key in object) ("constructor" != key || !isProto && hasOwnProperty.call(object, key)) && result.push(key);
    return result;
  };
}, function(module, exports) {
  module.exports = function(object) {
    var result = [];
    if (null != object) for (var key in Object(object)) result.push(key);
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var arrayPush = __webpack_require__(54), getPrototype = __webpack_require__(57), getSymbols = __webpack_require__(40), stubArray = __webpack_require__(80), getSymbolsIn = Object.getOwnPropertySymbols ? function(object) {
    for (var result = []; object; ) arrayPush(result, getSymbols(object)), object = getPrototype(object);
    return result;
  } : stubArray;
  module.exports = getSymbolsIn;
}, , , , function(module, exports) {
  module.exports = require("assert");
}, function(module, exports, __webpack_require__) {
  var eq = __webpack_require__(16), isArrayLike = __webpack_require__(13), isIndex = __webpack_require__(31), isObject = __webpack_require__(2);
  module.exports = function(value, index, object) {
    if (!isObject(object)) return !1;
    var type = typeof index;
    return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(ast, opts, code) {
    return new Generator(ast, opts, code).generate();
  }, exports.CodeGenerator = void 0;
  var _sourceMap = _interopRequireDefault(__webpack_require__(115)), _printer = _interopRequireDefault(__webpack_require__(122));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  class Generator extends _printer.default {
    constructor(ast, opts = {}, code) {
      super(function(code, opts) {
        const format = {
          auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
          auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
          shouldPrintComment: opts.shouldPrintComment,
          retainLines: opts.retainLines,
          retainFunctionParens: opts.retainFunctionParens,
          comments: null == opts.comments || opts.comments,
          compact: opts.compact,
          minified: opts.minified,
          concise: opts.concise,
          jsonCompatibleStrings: opts.jsonCompatibleStrings,
          indent: {
            adjustMultilineComment: !0,
            style: "  ",
            base: 0
          },
          decoratorsBeforeExport: !!opts.decoratorsBeforeExport,
          jsescOption: Object.assign({
            quotes: "double",
            wrap: !0
          }, opts.jsescOption),
          recordAndTupleSyntaxType: opts.recordAndTupleSyntaxType
        };
        format.minified ? (format.compact = !0, format.shouldPrintComment = format.shouldPrintComment || (() => format.comments)) : format.shouldPrintComment = format.shouldPrintComment || (value => format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0);
        "auto" === format.compact && (format.compact = code.length > 5e5, format.compact && console.error("[BABEL] Note: The code generator has deoptimised the styling of " + opts.filename + " as it exceeds the max of 500KB."));
        format.compact && (format.indent.adjustMultilineComment = !1);
        return format;
      }(code, opts), opts.sourceMaps ? new _sourceMap.default(opts, code) : null), this.ast = ast;
    }
    generate() {
      return super.generate(this.ast);
    }
  }
  exports.CodeGenerator = class {
    constructor(ast, opts, code) {
      this._generator = new Generator(ast, opts, code);
    }
    generate() {
      return this._generator.generate();
    }
  };
}, function(module, exports, __webpack_require__) {
  exports.SourceMapGenerator = __webpack_require__(65).SourceMapGenerator, exports.SourceMapConsumer = __webpack_require__(118).SourceMapConsumer, 
  exports.SourceNode = __webpack_require__(121).SourceNode;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), Object.defineProperty(exports, "findPackageData", {
    enumerable: !0,
    get: function() {
      return _package.findPackageData;
    }
  }), Object.defineProperty(exports, "findConfigUpwards", {
    enumerable: !0,
    get: function() {
      return _configuration.findConfigUpwards;
    }
  }), Object.defineProperty(exports, "findRelativeConfig", {
    enumerable: !0,
    get: function() {
      return _configuration.findRelativeConfig;
    }
  }), Object.defineProperty(exports, "findRootConfig", {
    enumerable: !0,
    get: function() {
      return _configuration.findRootConfig;
    }
  }), Object.defineProperty(exports, "loadConfig", {
    enumerable: !0,
    get: function() {
      return _configuration.loadConfig;
    }
  }), Object.defineProperty(exports, "ROOT_CONFIG_FILENAMES", {
    enumerable: !0,
    get: function() {
      return _configuration.ROOT_CONFIG_FILENAMES;
    }
  }), Object.defineProperty(exports, "resolvePlugin", {
    enumerable: !0,
    get: function() {
      return _plugins.resolvePlugin;
    }
  }), Object.defineProperty(exports, "resolvePreset", {
    enumerable: !0,
    get: function() {
      return _plugins.resolvePreset;
    }
  }), Object.defineProperty(exports, "loadPlugin", {
    enumerable: !0,
    get: function() {
      return _plugins.loadPlugin;
    }
  }), Object.defineProperty(exports, "loadPreset", {
    enumerable: !0,
    get: function() {
      return _plugins.loadPreset;
    }
  });
  var _package = __webpack_require__(280), _configuration = __webpack_require__(281), _plugins = __webpack_require__(293);
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _path() {
    const data = (obj = __webpack_require__(8)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _path = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.createItemFromDescriptor = createItemFromDescriptor, exports.createConfigItem = function(value, {dirname: dirname = ".", type: type} = {}) {
    return createItemFromDescriptor((0, _configDescriptors.createDescriptor)(value, _path().default.resolve(dirname), {
      type: type,
      alias: "programmatic item"
    }));
  }, exports.getItemDescriptor = function(item) {
    if (item instanceof ConfigItem) return item._descriptor;
    return;
  };
  var _configDescriptors = __webpack_require__(229);
  function createItemFromDescriptor(desc) {
    return new ConfigItem(desc);
  }
  class ConfigItem {
    constructor(descriptor) {
      this._descriptor = descriptor, Object.defineProperty(this, "_descriptor", {
        enumerable: !1
      }), this.value = this._descriptor.value, this.options = this._descriptor.options, 
      this.dirname = this._descriptor.dirname, this.name = this._descriptor.name, this.file = this._descriptor.file ? {
        request: this._descriptor.file.request,
        resolved: this._descriptor.file.resolved
      } : void 0, Object.freeze(this);
    }
  }
  Object.freeze(ConfigItem.prototype);
}, function(module, exports, __webpack_require__) {
  var isSymbol = __webpack_require__(64);
  module.exports = function(value) {
    if ("string" == typeof value || isSymbol(value)) return value;
    var result = value + "";
    return "0" == result && 1 / value == -1 / 0 ? "-0" : result;
  };
}, function(module, exports, __webpack_require__) {
  var Uint8Array = __webpack_require__(1).Uint8Array;
  module.exports = Uint8Array;
}, function(module, exports, __webpack_require__) {
  var baseGetAllKeys = __webpack_require__(79), getSymbols = __webpack_require__(40), keys = __webpack_require__(24);
  module.exports = function(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  };
}, , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.Plugin = function(alias) {
    throw new Error(`The (${alias}) Babel 5 plugin is being run with an unsupported Babel version.`);
  }, Object.defineProperty(exports, "File", {
    enumerable: !0,
    get: function() {
      return _file.default;
    }
  }), Object.defineProperty(exports, "buildExternalHelpers", {
    enumerable: !0,
    get: function() {
      return _buildExternalHelpers.default;
    }
  }), Object.defineProperty(exports, "resolvePlugin", {
    enumerable: !0,
    get: function() {
      return _files.resolvePlugin;
    }
  }), Object.defineProperty(exports, "resolvePreset", {
    enumerable: !0,
    get: function() {
      return _files.resolvePreset;
    }
  }), Object.defineProperty(exports, "version", {
    enumerable: !0,
    get: function() {
      return _package.version;
    }
  }), Object.defineProperty(exports, "getEnv", {
    enumerable: !0,
    get: function() {
      return _environment.getEnv;
    }
  }), Object.defineProperty(exports, "tokTypes", {
    enumerable: !0,
    get: function() {
      return function() {
        const data = __webpack_require__(47);
        return function() {
          return data;
        }, data;
      }().tokTypes;
    }
  }), Object.defineProperty(exports, "traverse", {
    enumerable: !0,
    get: function() {
      return function() {
        const data = _interopRequireDefault(__webpack_require__(46));
        return function() {
          return data;
        }, data;
      }().default;
    }
  }), Object.defineProperty(exports, "template", {
    enumerable: !0,
    get: function() {
      return function() {
        const data = _interopRequireDefault(__webpack_require__(35));
        return function() {
          return data;
        }, data;
      }().default;
    }
  }), Object.defineProperty(exports, "createConfigItem", {
    enumerable: !0,
    get: function() {
      return _item.createConfigItem;
    }
  }), Object.defineProperty(exports, "loadPartialConfig", {
    enumerable: !0,
    get: function() {
      return _config.loadPartialConfig;
    }
  }), Object.defineProperty(exports, "loadPartialConfigSync", {
    enumerable: !0,
    get: function() {
      return _config.loadPartialConfigSync;
    }
  }), Object.defineProperty(exports, "loadPartialConfigAsync", {
    enumerable: !0,
    get: function() {
      return _config.loadPartialConfigAsync;
    }
  }), Object.defineProperty(exports, "loadOptions", {
    enumerable: !0,
    get: function() {
      return _config.loadOptions;
    }
  }), Object.defineProperty(exports, "loadOptionsSync", {
    enumerable: !0,
    get: function() {
      return _config.loadOptionsSync;
    }
  }), Object.defineProperty(exports, "loadOptionsAsync", {
    enumerable: !0,
    get: function() {
      return _config.loadOptionsAsync;
    }
  }), Object.defineProperty(exports, "transform", {
    enumerable: !0,
    get: function() {
      return _transform.transform;
    }
  }), Object.defineProperty(exports, "transformSync", {
    enumerable: !0,
    get: function() {
      return _transform.transformSync;
    }
  }), Object.defineProperty(exports, "transformAsync", {
    enumerable: !0,
    get: function() {
      return _transform.transformAsync;
    }
  }), Object.defineProperty(exports, "transformFile", {
    enumerable: !0,
    get: function() {
      return _transformFile.transformFile;
    }
  }), Object.defineProperty(exports, "transformFileSync", {
    enumerable: !0,
    get: function() {
      return _transformFile.transformFileSync;
    }
  }), Object.defineProperty(exports, "transformFileAsync", {
    enumerable: !0,
    get: function() {
      return _transformFile.transformFileAsync;
    }
  }), Object.defineProperty(exports, "transformFromAst", {
    enumerable: !0,
    get: function() {
      return _transformAst.transformFromAst;
    }
  }), Object.defineProperty(exports, "transformFromAstSync", {
    enumerable: !0,
    get: function() {
      return _transformAst.transformFromAstSync;
    }
  }), Object.defineProperty(exports, "transformFromAstAsync", {
    enumerable: !0,
    get: function() {
      return _transformAst.transformFromAstAsync;
    }
  }), Object.defineProperty(exports, "parse", {
    enumerable: !0,
    get: function() {
      return _parse.parse;
    }
  }), Object.defineProperty(exports, "parseSync", {
    enumerable: !0,
    get: function() {
      return _parse.parseSync;
    }
  }), Object.defineProperty(exports, "parseAsync", {
    enumerable: !0,
    get: function() {
      return _parse.parseAsync;
    }
  }), exports.types = exports.OptionManager = exports.DEFAULT_EXTENSIONS = void 0;
  var _file = _interopRequireDefault(__webpack_require__(106)), _buildExternalHelpers = _interopRequireDefault(__webpack_require__(279)), _files = __webpack_require__(97), _package = __webpack_require__(294), _environment = __webpack_require__(228);
  function _types() {
    const data = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    return _types = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "types", {
    enumerable: !0,
    get: function() {
      return _types();
    }
  });
  var _item = __webpack_require__(98), _config = __webpack_require__(53), _transform = __webpack_require__(298), _transformFile = __webpack_require__(346), _transformAst = __webpack_require__(347), _parse = __webpack_require__(348);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const DEFAULT_EXTENSIONS = Object.freeze([ ".js", ".jsx", ".es6", ".es", ".mjs" ]);
  exports.DEFAULT_EXTENSIONS = DEFAULT_EXTENSIONS;
  exports.OptionManager = class {
    init(opts) {
      return (0, _config.loadOptions)(opts);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function helpers() {
    const data = _interopRequireWildcard(__webpack_require__(215));
    return helpers = function() {
      return data;
    }, data;
  }
  function _traverse() {
    const data = _interopRequireWildcard(__webpack_require__(46));
    return _traverse = function() {
      return data;
    }, data;
  }
  function _codeFrame() {
    const data = __webpack_require__(48);
    return _codeFrame = function() {
      return data;
    }, data;
  }
  function t() {
    const data = _interopRequireWildcard(__webpack_require__(0));
    return t = function() {
      return data;
    }, data;
  }
  function _helperModuleTransforms() {
    const data = __webpack_require__(262);
    return _helperModuleTransforms = function() {
      return data;
    }, data;
  }
  function _semver() {
    const data = (obj = __webpack_require__(217)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _semver = function() {
      return data;
    }, data;
  }
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  const errorVisitor = {
    enter(path, state) {
      const loc = path.node.loc;
      loc && (state.loc = loc, path.stop());
    }
  };
  class File {
    constructor(options, {code: code, ast: ast, inputMap: inputMap}) {
      this._map = new Map, this.declarations = {}, this.path = null, this.ast = {}, this.metadata = {}, 
      this.code = "", this.inputMap = null, this.hub = {
        file: this,
        getCode: () => this.code,
        getScope: () => this.scope,
        addHelper: this.addHelper.bind(this),
        buildError: this.buildCodeFrameError.bind(this)
      }, this.opts = options, this.code = code, this.ast = ast, this.inputMap = inputMap, 
      this.path = _traverse().NodePath.get({
        hub: this.hub,
        parentPath: null,
        parent: this.ast,
        container: this.ast,
        key: "program"
      }).setContext(), this.scope = this.path.scope;
    }
    get shebang() {
      const {interpreter: interpreter} = this.path.node;
      return interpreter ? interpreter.value : "";
    }
    set shebang(value) {
      value ? this.path.get("interpreter").replaceWith(t().interpreterDirective(value)) : this.path.get("interpreter").remove();
    }
    set(key, val) {
      if ("helpersNamespace" === key) throw new Error("Babel 7.0.0-beta.56 has dropped support for the 'helpersNamespace' utility.If you are using @babel/plugin-external-helpers you will need to use a newer version than the one you currently have installed. If you have your own implementation, you'll want to explore using 'helperGenerator' alongside 'file.availableHelper()'.");
      this._map.set(key, val);
    }
    get(key) {
      return this._map.get(key);
    }
    has(key) {
      return this._map.has(key);
    }
    getModuleName() {
      return (0, _helperModuleTransforms().getModuleName)(this.opts, this.opts);
    }
    addImport() {
      throw new Error("This API has been removed. If you're looking for this functionality in Babel 7, you should import the '@babel/helper-module-imports' module and use the functions exposed  from that module, such as 'addNamed' or 'addDefault'.");
    }
    availableHelper(name, versionRange) {
      let minVersion;
      try {
        minVersion = helpers().minVersion(name);
      } catch (err) {
        if ("BABEL_HELPER_UNKNOWN" !== err.code) throw err;
        return !1;
      }
      return "string" != typeof versionRange || (_semver().default.valid(versionRange) && (versionRange = "^" + versionRange), 
      !_semver().default.intersects("<" + minVersion, versionRange) && !_semver().default.intersects(">=8.0.0", versionRange));
    }
    addHelper(name) {
      const declar = this.declarations[name];
      if (declar) return t().cloneNode(declar);
      const generator = this.get("helperGenerator");
      if (generator) {
        const res = generator(name);
        if (res) return res;
      }
      helpers().ensure(name, File);
      const uid = this.declarations[name] = this.scope.generateUidIdentifier(name), dependencies = {};
      for (const dep of helpers().getDependencies(name)) dependencies[dep] = this.addHelper(dep);
      const {nodes: nodes, globals: globals} = helpers().get(name, dep => dependencies[dep], uid, Object.keys(this.scope.getAllBindings()));
      return globals.forEach(name => {
        this.path.scope.hasBinding(name, !0) && this.path.scope.rename(name);
      }), nodes.forEach(node => {
        node._compact = !0;
      }), this.path.unshiftContainer("body", nodes), this.path.get("body").forEach(path => {
        -1 !== nodes.indexOf(path.node) && path.isVariableDeclaration() && this.scope.registerDeclaration(path);
      }), uid;
    }
    addTemplateObject() {
      throw new Error("This function has been moved into the template literal transform itself.");
    }
    buildCodeFrameError(node, msg, Error = SyntaxError) {
      let loc = node && (node.loc || node._loc);
      if (!loc && node) {
        const state = {
          loc: null
        };
        (0, _traverse().default)(node, errorVisitor, this.scope, state), loc = state.loc;
        let txt = "This is an error on an internal node. Probably an internal error.";
        loc && (txt += " Location has been estimated."), msg += ` (${txt})`;
      }
      if (loc) {
        const {highlightCode: highlightCode = !0} = this.opts;
        msg += "\n" + (0, _codeFrame().codeFrameColumns)(this.code, {
          start: {
            line: loc.start.line,
            column: loc.start.column + 1
          },
          end: loc.end && loc.start.line === loc.end.line ? {
            line: loc.end.line,
            column: loc.end.column + 1
          } : void 0
        }, {
          highlightCode: highlightCode
        });
      }
      return new Error(msg);
    }
  }
  exports.default = File;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function makeStatementFormatter(fn) {
    return {
      code: str => "/* @babel/template */;\n" + str,
      validate: () => {},
      unwrap: ast => fn(ast.program.body.slice(1))
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.program = exports.expression = exports.statement = exports.statements = exports.smart = void 0;
  const smart = makeStatementFormatter(body => body.length > 1 ? body : body[0]);
  exports.smart = smart;
  const statements = makeStatementFormatter(body => body);
  exports.statements = statements;
  const statement = makeStatementFormatter(body => {
    if (0 === body.length) throw new Error("Found nothing to return.");
    if (body.length > 1) throw new Error("Found multiple statements but wanted one");
    return body[0];
  });
  exports.statement = statement;
  const expression = {
    code: str => `(\n${str}\n)`,
    validate: ({program: program}) => {
      if (program.body.length > 1) throw new Error("Found multiple statements but wanted one");
      if (0 === program.body[0].expression.start) throw new Error("Parse result included parens.");
    },
    unwrap: ast => ast.program.body[0].expression
  };
  exports.expression = expression;
  exports.program = {
    code: str => str,
    validate: () => {},
    unwrap: ast => ast.program
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function createTemplateBuilder(formatter, defaultOpts) {
    const templateFnCache = new WeakMap, templateAstCache = new WeakMap, cachedOpts = defaultOpts || (0, 
    _options.validate)(null);
    return Object.assign((tpl, ...args) => {
      if ("string" == typeof tpl) {
        if (args.length > 1) throw new Error("Unexpected extra params.");
        return extendedTrace((0, _string.default)(formatter, tpl, (0, _options.merge)(cachedOpts, (0, 
        _options.validate)(args[0]))));
      }
      if (Array.isArray(tpl)) {
        let builder = templateFnCache.get(tpl);
        return builder || (builder = (0, _literal.default)(formatter, tpl, cachedOpts), 
        templateFnCache.set(tpl, builder)), extendedTrace(builder(args));
      }
      if ("object" == typeof tpl && tpl) {
        if (args.length > 0) throw new Error("Unexpected extra params.");
        return createTemplateBuilder(formatter, (0, _options.merge)(cachedOpts, (0, _options.validate)(tpl)));
      }
      throw new Error("Unexpected template param " + typeof tpl);
    }, {
      ast: (tpl, ...args) => {
        if ("string" == typeof tpl) {
          if (args.length > 1) throw new Error("Unexpected extra params.");
          return (0, _string.default)(formatter, tpl, (0, _options.merge)((0, _options.merge)(cachedOpts, (0, 
          _options.validate)(args[0])), NO_PLACEHOLDER))();
        }
        if (Array.isArray(tpl)) {
          let builder = templateAstCache.get(tpl);
          return builder || (builder = (0, _literal.default)(formatter, tpl, (0, _options.merge)(cachedOpts, NO_PLACEHOLDER)), 
          templateAstCache.set(tpl, builder)), builder(args)();
        }
        throw new Error("Unexpected template param " + typeof tpl);
      }
    });
  };
  var _options = __webpack_require__(36), _string = _interopRequireDefault(__webpack_require__(109)), _literal = _interopRequireDefault(__webpack_require__(113));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const NO_PLACEHOLDER = (0, _options.validate)({
    placeholderPattern: !1
  });
  function extendedTrace(fn) {
    let rootStack = "";
    try {
      throw new Error;
    } catch (error) {
      error.stack && (rootStack = error.stack.split("\n").slice(3).join("\n"));
    }
    return arg => {
      try {
        return fn(arg);
      } catch (err) {
        throw err.stack += "\n    =============\n" + rootStack, err;
      }
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(formatter, code, opts) {
    let metadata;
    return code = formatter.code(code), arg => {
      const replacements = (0, _options.normalizeReplacements)(arg);
      return metadata || (metadata = (0, _parse.default)(formatter, code, opts)), formatter.unwrap((0, 
      _populate.default)(metadata, replacements));
    };
  };
  var _options = __webpack_require__(36), _parse = _interopRequireDefault(__webpack_require__(58)), _populate = _interopRequireDefault(__webpack_require__(61));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.shouldHighlight = shouldHighlight, exports.getChalk = getChalk, exports.default = function(code, options = {}) {
    if (shouldHighlight(options)) {
      const chalk = getChalk(options);
      return function(defs, text) {
        return text.replace(_jsTokens.default, (function(...args) {
          const type = function(match) {
            const [offset, text] = match.slice(-2), token = (0, _jsTokens.matchToToken)(match);
            if ("name" === token.type) {
              if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isReservedWord)(token.value)) return "keyword";
              if (JSX_TAG.test(token.value) && ("<" === text[offset - 1] || "</" == text.substr(offset - 2, 2))) return "jsx_tag";
              if (token.value[0] !== token.value[0].toLowerCase()) return "capitalized";
            }
            if ("punctuator" === token.type && BRACKET.test(token.value)) return "bracket";
            if ("invalid" === token.type && ("@" === token.value || "#" === token.value)) return "punctuator";
            return token.type;
          }(args), colorize = defs[type];
          return colorize ? args[0].split(NEWLINE).map(str => colorize(str)).join("\n") : args[0];
        }));
      }(function(chalk) {
        return {
          keyword: chalk.cyan,
          capitalized: chalk.yellow,
          jsx_tag: chalk.yellow,
          punctuator: chalk.yellow,
          number: chalk.magenta,
          string: chalk.green,
          regex: chalk.magenta,
          comment: chalk.grey,
          invalid: chalk.white.bgRed.bold
        };
      }(chalk), code);
    }
    return code;
  };
  var obj, _jsTokens = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(111)), _helperValidatorIdentifier = __webpack_require__(49), _chalk = (obj = __webpack_require__(112)) && obj.__esModule ? obj : {
    default: obj
  };
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const NEWLINE = /\r\n|[\n\r\u2028\u2029]/, JSX_TAG = /^[a-z][\w-]*$/i, BRACKET = /^[()[\]{}]$/;
  function shouldHighlight(options) {
    return _chalk.default.supportsColor || options.forceColor;
  }
  function getChalk(options) {
    let chalk = _chalk.default;
    return options.forceColor && (chalk = new _chalk.default.constructor({
      enabled: !0,
      level: 1
    })), chalk;
  }
}, function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, 
  exports.matchToToken = function(match) {
    var token = {
      type: "invalid",
      value: match[0],
      closed: void 0
    };
    return match[1] ? (token.type = "string", token.closed = !(!match[3] && !match[4])) : match[5] ? token.type = "comment" : match[6] ? (token.type = "comment", 
    token.closed = !!match[7]) : match[8] ? token.type = "regex" : match[9] ? token.type = "number" : match[10] ? token.type = "name" : match[11] ? token.type = "punctuator" : match[12] && (token.type = "whitespace"), 
    token;
  };
}, function(module, exports) {
  module.exports = require("chalk");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(formatter, tpl, opts) {
    const {metadata: metadata, names: names} = function(formatter, tpl, opts) {
      let names, nameSet, metadata, prefix = "";
      do {
        prefix += "$";
        const result = buildTemplateCode(tpl, prefix);
        names = result.names, nameSet = new Set(names), metadata = (0, _parse.default)(formatter, formatter.code(result.code), {
          parser: opts.parser,
          placeholderWhitelist: new Set(result.names.concat(opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [])),
          placeholderPattern: opts.placeholderPattern,
          preserveComments: opts.preserveComments,
          syntacticPlaceholders: opts.syntacticPlaceholders
        });
      } while (metadata.placeholders.some(placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name)));
      return {
        metadata: metadata,
        names: names
      };
    }(formatter, tpl, opts);
    return arg => {
      const defaultReplacements = arg.reduce((acc, replacement, i) => (acc[names[i]] = replacement, 
      acc), {});
      return arg => {
        const replacements = (0, _options.normalizeReplacements)(arg);
        return replacements && Object.keys(replacements).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) throw new Error("Unexpected replacement overlap.");
        }), formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
      };
    };
  };
  var _options = __webpack_require__(36), _parse = _interopRequireDefault(__webpack_require__(58)), _populate = _interopRequireDefault(__webpack_require__(61));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function buildTemplateCode(tpl, prefix) {
    const names = [];
    let code = tpl[0];
    for (let i = 1; i < tpl.length; i++) {
      const value = `${prefix}${i - 1}`;
      names.push(value), code += value + tpl[i];
    }
    return {
      names: names,
      code: code
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(exportDeclaration) {
    if (!exportDeclaration.isExportDeclaration()) throw new Error("Only export declarations can be splitted.");
    const isDefault = exportDeclaration.isExportDefaultDeclaration(), declaration = exportDeclaration.get("declaration"), isClassDeclaration = declaration.isClassDeclaration();
    if (isDefault) {
      const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration, scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
      let id = declaration.node.id, needBindingRegistration = !1;
      id || (needBindingRegistration = !0, id = scope.generateUidIdentifier("default"), 
      (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) && (declaration.node.id = t.cloneNode(id)));
      const updatedDeclaration = standaloneDeclaration ? declaration : t.variableDeclaration("var", [ t.variableDeclarator(t.cloneNode(id), declaration.node) ]), updatedExportDeclaration = t.exportNamedDeclaration(null, [ t.exportSpecifier(t.cloneNode(id), t.identifier("default")) ]);
      return exportDeclaration.insertAfter(updatedExportDeclaration), exportDeclaration.replaceWith(updatedDeclaration), 
      needBindingRegistration && scope.registerDeclaration(exportDeclaration), exportDeclaration;
    }
    if (exportDeclaration.get("specifiers").length > 0) throw new Error("It doesn't make sense to split exported specifiers.");
    const bindingIdentifiers = declaration.getOuterBindingIdentifiers(), specifiers = Object.keys(bindingIdentifiers).map(name => t.exportSpecifier(t.identifier(name), t.identifier(name))), aliasDeclar = t.exportNamedDeclaration(null, specifiers);
    return exportDeclaration.insertAfter(aliasDeclar), exportDeclaration.replaceWith(declaration.node), 
    exportDeclaration;
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var obj, _sourceMap = (obj = __webpack_require__(96)) && obj.__esModule ? obj : {
    default: obj
  };
  exports.default = class {
    constructor(opts, code) {
      this._cachedMap = null, this._code = code, this._opts = opts, this._rawMappings = [];
    }
    get() {
      if (!this._cachedMap) {
        const map = this._cachedMap = new _sourceMap.default.SourceMapGenerator({
          sourceRoot: this._opts.sourceRoot
        }), code = this._code;
        "string" == typeof code ? map.setSourceContent(this._opts.sourceFileName.replace(/\\/g, "/"), code) : "object" == typeof code && Object.keys(code).forEach(sourceFileName => {
          map.setSourceContent(sourceFileName.replace(/\\/g, "/"), code[sourceFileName]);
        }), this._rawMappings.forEach(mapping => map.addMapping(mapping), map);
      }
      return this._cachedMap.toJSON();
    }
    getRawMappings() {
      return this._rawMappings.slice();
    }
    mark(generatedLine, generatedColumn, line, column, identifierName, filename, force) {
      this._lastGenLine !== generatedLine && null === line || (force || this._lastGenLine !== generatedLine || this._lastSourceLine !== line || this._lastSourceColumn !== column) && (this._cachedMap = null, 
      this._lastGenLine = generatedLine, this._lastSourceLine = line, this._lastSourceColumn = column, 
      this._rawMappings.push({
        name: identifierName || void 0,
        generated: {
          line: generatedLine,
          column: generatedColumn
        },
        source: null == line ? void 0 : (filename || this._opts.sourceFileName).replace(/\\/g, "/"),
        original: null == line ? void 0 : {
          line: line,
          column: column
        }
      }));
    }
  };
}, function(module, exports) {
  var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  exports.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
    throw new TypeError("Must be between 0 and 63: " + number);
  }, exports.decode = function(charCode) {
    return 65 <= charCode && charCode <= 90 ? charCode - 65 : 97 <= charCode && charCode <= 122 ? charCode - 97 + 26 : 48 <= charCode && charCode <= 57 ? charCode - 48 + 52 : 43 == charCode ? 62 : 47 == charCode ? 63 : -1;
  };
}, function(module, exports, __webpack_require__) {
  var util = __webpack_require__(14);
  function MappingList() {
    this._array = [], this._sorted = !0, this._last = {
      generatedLine: -1,
      generatedColumn: 0
    };
  }
  MappingList.prototype.unsortedForEach = function(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  }, MappingList.prototype.add = function(aMapping) {
    var mappingA, mappingB, lineA, lineB, columnA, columnB;
    mappingA = this._last, mappingB = aMapping, lineA = mappingA.generatedLine, lineB = mappingB.generatedLine, 
    columnA = mappingA.generatedColumn, columnB = mappingB.generatedColumn, lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0 ? (this._last = aMapping, 
    this._array.push(aMapping)) : (this._sorted = !1, this._array.push(aMapping));
  }, MappingList.prototype.toArray = function() {
    return this._sorted || (this._array.sort(util.compareByGeneratedPositionsInflated), 
    this._sorted = !0), this._array;
  }, exports.MappingList = MappingList;
}, function(module, exports, __webpack_require__) {
  var util = __webpack_require__(14), binarySearch = __webpack_require__(119), ArraySet = __webpack_require__(67).ArraySet, base64VLQ = __webpack_require__(66), quickSort = __webpack_require__(120).quickSort;
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    return "string" == typeof aSourceMap && (sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ""))), 
    null != sourceMap.sections ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
  }
  function BasicSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    "string" == typeof aSourceMap && (sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, "")));
    var version = util.getArg(sourceMap, "version"), sources = util.getArg(sourceMap, "sources"), names = util.getArg(sourceMap, "names", []), sourceRoot = util.getArg(sourceMap, "sourceRoot", null), sourcesContent = util.getArg(sourceMap, "sourcesContent", null), mappings = util.getArg(sourceMap, "mappings"), file = util.getArg(sourceMap, "file", null);
    if (version != this._version) throw new Error("Unsupported version: " + version);
    sources = sources.map(String).map(util.normalize).map((function(source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
    })), this._names = ArraySet.fromArray(names.map(String), !0), this._sources = ArraySet.fromArray(sources, !0), 
    this.sourceRoot = sourceRoot, this.sourcesContent = sourcesContent, this._mappings = mappings, 
    this.file = file;
  }
  function Mapping() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, 
    this.originalColumn = null, this.name = null;
  }
  function IndexedSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    "string" == typeof aSourceMap && (sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, "")));
    var version = util.getArg(sourceMap, "version"), sections = util.getArg(sourceMap, "sections");
    if (version != this._version) throw new Error("Unsupported version: " + version);
    this._sources = new ArraySet, this._names = new ArraySet;
    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map((function(s) {
      if (s.url) throw new Error("Support for url field in sections not implemented.");
      var offset = util.getArg(s, "offset"), offsetLine = util.getArg(offset, "line"), offsetColumn = util.getArg(offset, "column");
      if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
      return lastOffset = offset, {
        generatedOffset: {
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, "map"))
      };
    }));
  }
  SourceMapConsumer.fromSourceMap = function(aSourceMap) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
  }, SourceMapConsumer.prototype._version = 3, SourceMapConsumer.prototype.__generatedMappings = null, 
  Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), 
      this.__generatedMappings;
    }
  }), SourceMapConsumer.prototype.__originalMappings = null, Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), 
      this.__originalMappings;
    }
  }), SourceMapConsumer.prototype._charIsMappingSeparator = function(aStr, index) {
    var c = aStr.charAt(index);
    return ";" === c || "," === c;
  }, SourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  }, SourceMapConsumer.GENERATED_ORDER = 1, SourceMapConsumer.ORIGINAL_ORDER = 2, 
  SourceMapConsumer.GREATEST_LOWER_BOUND = 1, SourceMapConsumer.LEAST_UPPER_BOUND = 2, 
  SourceMapConsumer.prototype.eachMapping = function(aCallback, aContext, aOrder) {
    var mappings, context = aContext || null;
    switch (aOrder || SourceMapConsumer.GENERATED_ORDER) {
     case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;

     case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;

     default:
      throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map((function(mapping) {
      var source = null === mapping.source ? null : this._sources.at(mapping.source);
      return null != source && null != sourceRoot && (source = util.join(sourceRoot, source)), 
      {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: null === mapping.name ? null : this._names.at(mapping.name)
      };
    }), this).forEach(aCallback, context);
  }, SourceMapConsumer.prototype.allGeneratedPositionsFor = function(aArgs) {
    var line = util.getArg(aArgs, "line"), needle = {
      source: util.getArg(aArgs, "source"),
      originalLine: line,
      originalColumn: util.getArg(aArgs, "column", 0)
    };
    if (null != this.sourceRoot && (needle.source = util.relative(this.sourceRoot, needle.source)), 
    !this._sources.has(needle.source)) return [];
    needle.source = this._sources.indexOf(needle.source);
    var mappings = [], index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (void 0 === aArgs.column) for (var originalLine = mapping.originalLine; mapping && mapping.originalLine === originalLine; ) mappings.push({
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      }), mapping = this._originalMappings[++index]; else for (var originalColumn = mapping.originalColumn; mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn; ) mappings.push({
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      }), mapping = this._originalMappings[++index];
    }
    return mappings;
  }, exports.SourceMapConsumer = SourceMapConsumer, BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype), 
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer, BasicSourceMapConsumer.fromSourceMap = function(aSourceMap) {
    var smc = Object.create(BasicSourceMapConsumer.prototype), names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), !0), sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), !0);
    smc.sourceRoot = aSourceMap._sourceRoot, smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot), 
    smc.file = aSourceMap._file;
    for (var generatedMappings = aSourceMap._mappings.toArray().slice(), destGeneratedMappings = smc.__generatedMappings = [], destOriginalMappings = smc.__originalMappings = [], i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i], destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine, destMapping.generatedColumn = srcMapping.generatedColumn, 
      srcMapping.source && (destMapping.source = sources.indexOf(srcMapping.source), destMapping.originalLine = srcMapping.originalLine, 
      destMapping.originalColumn = srcMapping.originalColumn, srcMapping.name && (destMapping.name = names.indexOf(srcMapping.name)), 
      destOriginalMappings.push(destMapping)), destGeneratedMappings.push(destMapping);
    }
    return quickSort(smc.__originalMappings, util.compareByOriginalPositions), smc;
  }, BasicSourceMapConsumer.prototype._version = 3, Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
    get: function() {
      return this._sources.toArray().map((function(s) {
        return null != this.sourceRoot ? util.join(this.sourceRoot, s) : s;
      }), this);
    }
  }), BasicSourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    for (var mapping, str, segment, end, value, generatedLine = 1, previousGeneratedColumn = 0, previousOriginalLine = 0, previousOriginalColumn = 0, previousSource = 0, previousName = 0, length = aStr.length, index = 0, cachedSegments = {}, temp = {}, originalMappings = [], generatedMappings = []; index < length; ) if (";" === aStr.charAt(index)) generatedLine++, 
    index++, previousGeneratedColumn = 0; else if ("," === aStr.charAt(index)) index++; else {
      for ((mapping = new Mapping).generatedLine = generatedLine, end = index; end < length && !this._charIsMappingSeparator(aStr, end); end++) ;
      if (segment = cachedSegments[str = aStr.slice(index, end)]) index += str.length; else {
        for (segment = []; index < end; ) base64VLQ.decode(aStr, index, temp), value = temp.value, 
        index = temp.rest, segment.push(value);
        if (2 === segment.length) throw new Error("Found a source, but no line and column");
        if (3 === segment.length) throw new Error("Found a source and line, but no column");
        cachedSegments[str] = segment;
      }
      mapping.generatedColumn = previousGeneratedColumn + segment[0], previousGeneratedColumn = mapping.generatedColumn, 
      segment.length > 1 && (mapping.source = previousSource + segment[1], previousSource += segment[1], 
      mapping.originalLine = previousOriginalLine + segment[2], previousOriginalLine = mapping.originalLine, 
      mapping.originalLine += 1, mapping.originalColumn = previousOriginalColumn + segment[3], 
      previousOriginalColumn = mapping.originalColumn, segment.length > 4 && (mapping.name = previousName + segment[4], 
      previousName += segment[4])), generatedMappings.push(mapping), "number" == typeof mapping.originalLine && originalMappings.push(mapping);
    }
    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated), this.__generatedMappings = generatedMappings, 
    quickSort(originalMappings, util.compareByOriginalPositions), this.__originalMappings = originalMappings;
  }, BasicSourceMapConsumer.prototype._findMapping = function(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
    if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  }, BasicSourceMapConsumer.prototype.computeColumnSpans = function() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];
        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }
      mapping.lastGeneratedColumn = 1 / 0;
    }
  }, BasicSourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, "line"),
      generatedColumn: util.getArg(aArgs, "column")
    }, index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._generatedMappings[index];
      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, "source", null);
        null !== source && (source = this._sources.at(source), null != this.sourceRoot && (source = util.join(this.sourceRoot, source)));
        var name = util.getArg(mapping, "name", null);
        return null !== name && (name = this._names.at(name)), {
          source: source,
          line: util.getArg(mapping, "originalLine", null),
          column: util.getArg(mapping, "originalColumn", null),
          name: name
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function() {
    return !!this.sourcesContent && (this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some((function(sc) {
      return null == sc;
    })));
  }, BasicSourceMapConsumer.prototype.sourceContentFor = function(aSource, nullOnMissing) {
    if (!this.sourcesContent) return null;
    if (null != this.sourceRoot && (aSource = util.relative(this.sourceRoot, aSource)), 
    this._sources.has(aSource)) return this.sourcesContent[this._sources.indexOf(aSource)];
    var url;
    if (null != this.sourceRoot && (url = util.urlParse(this.sourceRoot))) {
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if ("file" == url.scheme && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      if ((!url.path || "/" == url.path) && this._sources.has("/" + aSource)) return this.sourcesContent[this._sources.indexOf("/" + aSource)];
    }
    if (nullOnMissing) return null;
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }, BasicSourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
    var source = util.getArg(aArgs, "source");
    if (null != this.sourceRoot && (source = util.relative(this.sourceRoot, source)), 
    !this._sources.has(source)) return {
      line: null,
      column: null,
      lastColumn: null
    };
    var needle = {
      source: source = this._sources.indexOf(source),
      originalLine: util.getArg(aArgs, "line"),
      originalColumn: util.getArg(aArgs, "column")
    }, index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (mapping.source === needle.source) return {
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, exports.BasicSourceMapConsumer = BasicSourceMapConsumer, IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype), 
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer, IndexedSourceMapConsumer.prototype._version = 3, 
  Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
    get: function() {
      for (var sources = [], i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
      return sources;
    }
  }), IndexedSourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, "line"),
      generatedColumn: util.getArg(aArgs, "column")
    }, sectionIndex = binarySearch.search(needle, this._sections, (function(needle, section) {
      var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
      return cmp || needle.generatedColumn - section.generatedOffset.generatedColumn;
    })), section = this._sections[sectionIndex];
    return section ? section.consumer.originalPositionFor({
      line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
      bias: aArgs.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function() {
    return this._sections.every((function(s) {
      return s.consumer.hasContentsOfAllSources();
    }));
  }, IndexedSourceMapConsumer.prototype.sourceContentFor = function(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var content = this._sections[i].consumer.sourceContentFor(aSource, !0);
      if (content) return content;
    }
    if (nullOnMissing) return null;
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }, IndexedSourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      if (-1 !== section.consumer.sources.indexOf(util.getArg(aArgs, "source"))) {
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) return {
          line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
        };
      }
    }
    return {
      line: null,
      column: null
    };
  }, IndexedSourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) for (var section = this._sections[i], sectionMappings = section.consumer._generatedMappings, j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j], source = section.consumer._sources.at(mapping.source);
      null !== section.consumer.sourceRoot && (source = util.join(section.consumer.sourceRoot, source)), 
      this._sources.add(source), source = this._sources.indexOf(source);
      var name = section.consumer._names.at(mapping.name);
      this._names.add(name), name = this._names.indexOf(name);
      var adjustedMapping = {
        source: source,
        generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
        generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: name
      };
      this.__generatedMappings.push(adjustedMapping), "number" == typeof adjustedMapping.originalLine && this.__originalMappings.push(adjustedMapping);
    }
    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated), quickSort(this.__originalMappings, util.compareByOriginalPositions);
  }, exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}, function(module, exports) {
  exports.GREATEST_LOWER_BOUND = 1, exports.LEAST_UPPER_BOUND = 2, exports.search = function(aNeedle, aHaystack, aCompare, aBias) {
    if (0 === aHaystack.length) return -1;
    var index = function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid], !0);
      return 0 === cmp ? mid : cmp > 0 ? aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? aHigh < aHaystack.length ? aHigh : -1 : mid : mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? mid : aLow < 0 ? -1 : aLow;
    }(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) return -1;
    for (;index - 1 >= 0 && 0 === aCompare(aHaystack[index], aHaystack[index - 1], !0); ) --index;
    return index;
  };
}, function(module, exports) {
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y], ary[y] = temp;
  }
  function doQuickSort(ary, comparator, p, r) {
    if (p < r) {
      var i = p - 1;
      swap(ary, (low = p, high = r, Math.round(low + Math.random() * (high - low))), r);
      for (var pivot = ary[r], j = p; j < r; j++) comparator(ary[j], pivot) <= 0 && swap(ary, i += 1, j);
      swap(ary, i + 1, j);
      var q = i + 1;
      doQuickSort(ary, comparator, p, q - 1), doQuickSort(ary, comparator, q + 1, r);
    }
    var low, high;
  }
  exports.quickSort = function(ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };
}, function(module, exports, __webpack_require__) {
  var SourceMapGenerator = __webpack_require__(65).SourceMapGenerator, util = __webpack_require__(14), REGEX_NEWLINE = /(\r?\n)/, isSourceNode = "$$$isSourceNode$$$";
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [], this.sourceContents = {}, this.line = null == aLine ? null : aLine, 
    this.column = null == aColumn ? null : aColumn, this.source = null == aSource ? null : aSource, 
    this.name = null == aName ? null : aName, this[isSourceNode] = !0, null != aChunks && this.add(aChunks);
  }
  SourceNode.fromStringWithSourceMap = function(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    var node = new SourceNode, remainingLines = aGeneratedCode.split(REGEX_NEWLINE), remainingLinesIndex = 0, shiftNextLine = function() {
      return getNextLine() + (getNextLine() || "");
      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
      }
    }, lastGeneratedLine = 1, lastGeneratedColumn = 0, lastMapping = null;
    return aSourceMapConsumer.eachMapping((function(mapping) {
      if (null !== lastMapping) {
        if (!(lastGeneratedLine < mapping.generatedLine)) {
          var code = (nextLine = remainingLines[remainingLinesIndex]).substr(0, mapping.generatedColumn - lastGeneratedColumn);
          return remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn), 
          lastGeneratedColumn = mapping.generatedColumn, addMappingWithCode(lastMapping, code), 
          void (lastMapping = mapping);
        }
        addMappingWithCode(lastMapping, shiftNextLine()), lastGeneratedLine++, lastGeneratedColumn = 0;
      }
      for (;lastGeneratedLine < mapping.generatedLine; ) node.add(shiftNextLine()), lastGeneratedLine++;
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex];
        node.add(nextLine.substr(0, mapping.generatedColumn)), remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn), 
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }), this), remainingLinesIndex < remainingLines.length && (lastMapping && addMappingWithCode(lastMapping, shiftNextLine()), 
    node.add(remainingLines.splice(remainingLinesIndex).join(""))), aSourceMapConsumer.sources.forEach((function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      null != content && (null != aRelativePath && (sourceFile = util.join(aRelativePath, sourceFile)), 
      node.setSourceContent(sourceFile, content));
    })), node;
    function addMappingWithCode(mapping, code) {
      if (null === mapping || void 0 === mapping.source) node.add(code); else {
        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
      }
    }
  }, SourceNode.prototype.add = function(aChunk) {
    if (Array.isArray(aChunk)) aChunk.forEach((function(chunk) {
      this.add(chunk);
    }), this); else {
      if (!aChunk[isSourceNode] && "string" != typeof aChunk) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      aChunk && this.children.push(aChunk);
    }
    return this;
  }, SourceNode.prototype.prepend = function(aChunk) {
    if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]); else {
      if (!aChunk[isSourceNode] && "string" != typeof aChunk) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      this.children.unshift(aChunk);
    }
    return this;
  }, SourceNode.prototype.walk = function(aFn) {
    for (var chunk, i = 0, len = this.children.length; i < len; i++) (chunk = this.children[i])[isSourceNode] ? chunk.walk(aFn) : "" !== chunk && aFn(chunk, {
      source: this.source,
      line: this.line,
      column: this.column,
      name: this.name
    });
  }, SourceNode.prototype.join = function(aSep) {
    var newChildren, i, len = this.children.length;
    if (len > 0) {
      for (newChildren = [], i = 0; i < len - 1; i++) newChildren.push(this.children[i]), 
      newChildren.push(aSep);
      newChildren.push(this.children[i]), this.children = newChildren;
    }
    return this;
  }, SourceNode.prototype.replaceRight = function(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    return lastChild[isSourceNode] ? lastChild.replaceRight(aPattern, aReplacement) : "string" == typeof lastChild ? this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement) : this.children.push("".replace(aPattern, aReplacement)), 
    this;
  }, SourceNode.prototype.setSourceContent = function(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  }, SourceNode.prototype.walkSourceContents = function(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) this.children[i][isSourceNode] && this.children[i].walkSourceContents(aFn);
    var sources = Object.keys(this.sourceContents);
    for (i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  }, SourceNode.prototype.toString = function() {
    var str = "";
    return this.walk((function(chunk) {
      str += chunk;
    })), str;
  }, SourceNode.prototype.toStringWithSourceMap = function(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    }, map = new SourceMapGenerator(aArgs), sourceMappingActive = !1, lastOriginalSource = null, lastOriginalLine = null, lastOriginalColumn = null, lastOriginalName = null;
    return this.walk((function(chunk, original) {
      generated.code += chunk, null !== original.source && null !== original.line && null !== original.column ? (lastOriginalSource === original.source && lastOriginalLine === original.line && lastOriginalColumn === original.column && lastOriginalName === original.name || map.addMapping({
        source: original.source,
        original: {
          line: original.line,
          column: original.column
        },
        generated: {
          line: generated.line,
          column: generated.column
        },
        name: original.name
      }), lastOriginalSource = original.source, lastOriginalLine = original.line, lastOriginalColumn = original.column, 
      lastOriginalName = original.name, sourceMappingActive = !0) : sourceMappingActive && (map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      }), lastOriginalSource = null, sourceMappingActive = !1);
      for (var idx = 0, length = chunk.length; idx < length; idx++) 10 === chunk.charCodeAt(idx) ? (generated.line++, 
      generated.column = 0, idx + 1 === length ? (lastOriginalSource = null, sourceMappingActive = !1) : sourceMappingActive && map.addMapping({
        source: original.source,
        original: {
          line: original.line,
          column: original.column
        },
        generated: {
          line: generated.line,
          column: generated.column
        },
        name: original.name
      })) : generated.column++;
    })), this.walkSourceContents((function(sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    })), {
      code: generated.code,
      map: map
    };
  }, exports.SourceNode = SourceNode;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var obj, _buffer = (obj = __webpack_require__(123)) && obj.__esModule ? obj : {
    default: obj
  }, n = _interopRequireWildcard(__webpack_require__(68)), t = _interopRequireWildcard(__webpack_require__(0)), generatorFunctions = _interopRequireWildcard(__webpack_require__(126));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  const SCIENTIFIC_NOTATION = /e/i, ZERO_DECIMAL_INTEGER = /\.0+$/, NON_DECIMAL_LITERAL = /^0[box]/, PURE_ANNOTATION_RE = /^\s*[@#]__PURE__\s*$/;
  class Printer {
    constructor(format, map) {
      this.inForStatementInitCounter = 0, this._printStack = [], this._indent = 0, this._insideAux = !1, 
      this._printedCommentStarts = {}, this._parenPushNewlineState = null, this._noLineTerminator = !1, 
      this._printAuxAfterOnNextUserNode = !1, this._printedComments = new WeakSet, this._endsWithInteger = !1, 
      this._endsWithWord = !1, this.format = format || {}, this._buf = new _buffer.default(map);
    }
    generate(ast) {
      return this.print(ast), this._maybeAddAuxComment(), this._buf.get();
    }
    indent() {
      this.format.compact || this.format.concise || this._indent++;
    }
    dedent() {
      this.format.compact || this.format.concise || this._indent--;
    }
    semicolon(force = !1) {
      this._maybeAddAuxComment(), this._append(";", !force);
    }
    rightBrace() {
      this.format.minified && this._buf.removeLastSemicolon(), this.token("}");
    }
    space(force = !1) {
      this.format.compact || (this._buf.hasContent() && !this.endsWith(" ") && !this.endsWith("\n") || force) && this._space();
    }
    word(str) {
      (this._endsWithWord || this.endsWith("/") && 0 === str.indexOf("/")) && this._space(), 
      this._maybeAddAuxComment(), this._append(str), this._endsWithWord = !0;
    }
    number(str) {
      this.word(str), this._endsWithInteger = Number.isInteger(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && "." !== str[str.length - 1];
    }
    token(str) {
      ("--" === str && this.endsWith("!") || "+" === str[0] && this.endsWith("+") || "-" === str[0] && this.endsWith("-") || "." === str[0] && this._endsWithInteger) && this._space(), 
      this._maybeAddAuxComment(), this._append(str);
    }
    newline(i) {
      if (!this.format.retainLines && !this.format.compact) if (this.format.concise) this.space(); else if (!(this.endsWith("\n\n") || ("number" != typeof i && (i = 1), 
      i = Math.min(2, i), (this.endsWith("{\n") || this.endsWith(":\n")) && i--, i <= 0))) for (let j = 0; j < i; j++) this._newline();
    }
    endsWith(str) {
      return this._buf.endsWith(str);
    }
    removeTrailingNewline() {
      this._buf.removeTrailingNewline();
    }
    exactSource(loc, cb) {
      this._catchUp("start", loc), this._buf.exactSource(loc, cb);
    }
    source(prop, loc) {
      this._catchUp(prop, loc), this._buf.source(prop, loc);
    }
    withSource(prop, loc, cb) {
      this._catchUp(prop, loc), this._buf.withSource(prop, loc, cb);
    }
    _space() {
      this._append(" ", !0);
    }
    _newline() {
      this._append("\n", !0);
    }
    _append(str, queue = !1) {
      this._maybeAddParen(str), this._maybeIndent(str), queue ? this._buf.queue(str) : this._buf.append(str), 
      this._endsWithWord = !1, this._endsWithInteger = !1;
    }
    _maybeIndent(str) {
      this._indent && this.endsWith("\n") && "\n" !== str[0] && this._buf.queue(this._getIndent());
    }
    _maybeAddParen(str) {
      const parenPushNewlineState = this._parenPushNewlineState;
      if (!parenPushNewlineState) return;
      let i;
      for (i = 0; i < str.length && " " === str[i]; i++) continue;
      if (i === str.length) return;
      const cha = str[i];
      if ("\n" !== cha) {
        if ("/" !== cha || i + 1 === str.length) return void (this._parenPushNewlineState = null);
        const chaPost = str[i + 1];
        if ("*" === chaPost) {
          if (PURE_ANNOTATION_RE.test(str.slice(i + 2, str.length - 2))) return;
        } else if ("/" !== chaPost) return void (this._parenPushNewlineState = null);
      }
      this.token("("), this.indent(), parenPushNewlineState.printed = !0;
    }
    _catchUp(prop, loc) {
      if (!this.format.retainLines) return;
      const pos = loc ? loc[prop] : null;
      if (null != (null == pos ? void 0 : pos.line)) {
        const count = pos.line - this._buf.getCurrentLine();
        for (let i = 0; i < count; i++) this._newline();
      }
    }
    _getIndent() {
      return this.format.indent.style.repeat(this._indent);
    }
    startTerminatorless(isLabel = !1) {
      return isLabel ? (this._noLineTerminator = !0, null) : this._parenPushNewlineState = {
        printed: !1
      };
    }
    endTerminatorless(state) {
      this._noLineTerminator = !1, (null == state ? void 0 : state.printed) && (this.dedent(), 
      this.newline(), this.token(")"));
    }
    print(node, parent) {
      if (!node) return;
      const oldConcise = this.format.concise;
      node._compact && (this.format.concise = !0);
      const printMethod = this[node.type];
      if (!printMethod) throw new ReferenceError(`unknown node of type ${JSON.stringify(node.type)} with constructor ${JSON.stringify(null == node ? void 0 : node.constructor.name)}`);
      this._printStack.push(node);
      const oldInAux = this._insideAux;
      this._insideAux = !node.loc, this._maybeAddAuxComment(this._insideAux && !oldInAux);
      let needsParens = n.needsParens(node, parent, this._printStack);
      this.format.retainFunctionParens && "FunctionExpression" === node.type && node.extra && node.extra.parenthesized && (needsParens = !0), 
      needsParens && this.token("("), this._printLeadingComments(node);
      const loc = t.isProgram(node) || t.isFile(node) ? null : node.loc;
      this.withSource("start", loc, () => {
        printMethod.call(this, node, parent);
      }), this._printTrailingComments(node), needsParens && this.token(")"), this._printStack.pop(), 
      this.format.concise = oldConcise, this._insideAux = oldInAux;
    }
    _maybeAddAuxComment(enteredPositionlessNode) {
      enteredPositionlessNode && this._printAuxBeforeComment(), this._insideAux || this._printAuxAfterComment();
    }
    _printAuxBeforeComment() {
      if (this._printAuxAfterOnNextUserNode) return;
      this._printAuxAfterOnNextUserNode = !0;
      const comment = this.format.auxiliaryCommentBefore;
      comment && this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
    _printAuxAfterComment() {
      if (!this._printAuxAfterOnNextUserNode) return;
      this._printAuxAfterOnNextUserNode = !1;
      const comment = this.format.auxiliaryCommentAfter;
      comment && this._printComment({
        type: "CommentBlock",
        value: comment
      });
    }
    getPossibleRaw(node) {
      const extra = node.extra;
      if (extra && null != extra.raw && null != extra.rawValue && node.value === extra.rawValue) return extra.raw;
    }
    printJoin(nodes, parent, opts = {}) {
      if (!(null == nodes ? void 0 : nodes.length)) return;
      opts.indent && this.indent();
      const newlineOpts = {
        addNewlines: opts.addNewlines
      };
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node && (opts.statement && this._printNewline(!0, node, parent, newlineOpts), this.print(node, parent), 
        opts.iterator && opts.iterator(node, i), opts.separator && i < nodes.length - 1 && opts.separator.call(this), 
        opts.statement && this._printNewline(!1, node, parent, newlineOpts));
      }
      opts.indent && this.dedent();
    }
    printAndIndentOnComments(node, parent) {
      const indent = node.leadingComments && node.leadingComments.length > 0;
      indent && this.indent(), this.print(node, parent), indent && this.dedent();
    }
    printBlock(parent) {
      const node = parent.body;
      t.isEmptyStatement(node) || this.space(), this.print(node, parent);
    }
    _printTrailingComments(node) {
      this._printComments(this._getComments(!1, node));
    }
    _printLeadingComments(node) {
      this._printComments(this._getComments(!0, node), !0);
    }
    printInnerComments(node, indent = !0) {
      var _node$innerComments;
      (null == (_node$innerComments = node.innerComments) ? void 0 : _node$innerComments.length) && (indent && this.indent(), 
      this._printComments(node.innerComments), indent && this.dedent());
    }
    printSequence(nodes, parent, opts = {}) {
      return opts.statement = !0, this.printJoin(nodes, parent, opts);
    }
    printList(items, parent, opts = {}) {
      return null == opts.separator && (opts.separator = commaSeparator), this.printJoin(items, parent, opts);
    }
    _printNewline(leading, node, parent, opts) {
      if (this.format.retainLines || this.format.compact) return;
      if (this.format.concise) return void this.space();
      let lines = 0;
      if (this._buf.hasContent()) {
        leading || lines++, opts.addNewlines && (lines += opts.addNewlines(leading, node) || 0);
        (leading ? n.needsWhitespaceBefore : n.needsWhitespaceAfter)(node, parent) && lines++;
      }
      this.newline(lines);
    }
    _getComments(leading, node) {
      return node && (leading ? node.leadingComments : node.trailingComments) || [];
    }
    _printComment(comment, skipNewLines) {
      if (!this.format.shouldPrintComment(comment.value)) return;
      if (comment.ignore) return;
      if (this._printedComments.has(comment)) return;
      if (this._printedComments.add(comment), null != comment.start) {
        if (this._printedCommentStarts[comment.start]) return;
        this._printedCommentStarts[comment.start] = !0;
      }
      const isBlockComment = "CommentBlock" === comment.type, printNewLines = isBlockComment && !skipNewLines && !this._noLineTerminator;
      printNewLines && this._buf.hasContent() && this.newline(1), this.endsWith("[") || this.endsWith("{") || this.space();
      let val = isBlockComment || this._noLineTerminator ? `/*${comment.value}*/` : `//${comment.value}\n`;
      if (isBlockComment && this.format.indent.adjustMultilineComment) {
        var _comment$loc;
        const offset = null == (_comment$loc = comment.loc) ? void 0 : _comment$loc.start.column;
        if (offset) {
          const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }
        const indentSize = Math.max(this._getIndent().length, this._buf.getCurrentColumn());
        val = val.replace(/\n(?!$)/g, "\n" + " ".repeat(indentSize));
      }
      this.endsWith("/") && this._space(), this.withSource("start", comment.loc, () => {
        this._append(val);
      }), printNewLines && this.newline(1);
    }
    _printComments(comments, inlinePureAnnotation) {
      if (null == comments ? void 0 : comments.length) if (inlinePureAnnotation && 1 === comments.length && PURE_ANNOTATION_RE.test(comments[0].value)) this._printComment(comments[0], this._buf.hasContent() && !this.endsWith("\n")); else for (const comment of comments) this._printComment(comment);
    }
  }
  function commaSeparator() {
    this.token(","), this.space();
  }
  exports.default = Printer, Object.assign(Printer.prototype, generatorFunctions);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  const SPACES_RE = /^[ \t]+$/;
  exports.default = class {
    constructor(map) {
      this._map = null, this._buf = [], this._last = "", this._queue = [], this._position = {
        line: 1,
        column: 0
      }, this._sourcePosition = {
        identifierName: null,
        line: null,
        column: null,
        filename: null
      }, this._disallowedPop = null, this._map = map;
    }
    get() {
      this._flush();
      const map = this._map, result = {
        code: this._buf.join("").trimRight(),
        map: null,
        rawMappings: null == map ? void 0 : map.getRawMappings()
      };
      return map && Object.defineProperty(result, "map", {
        configurable: !0,
        enumerable: !0,
        get() {
          return this.map = map.get();
        },
        set(value) {
          Object.defineProperty(this, "map", {
            value: value,
            writable: !0
          });
        }
      }), result;
    }
    append(str) {
      this._flush();
      const {line: line, column: column, filename: filename, identifierName: identifierName, force: force} = this._sourcePosition;
      this._append(str, line, column, identifierName, filename, force);
    }
    queue(str) {
      if ("\n" === str) for (;this._queue.length > 0 && SPACES_RE.test(this._queue[0][0]); ) this._queue.shift();
      const {line: line, column: column, filename: filename, identifierName: identifierName, force: force} = this._sourcePosition;
      this._queue.unshift([ str, line, column, identifierName, filename, force ]);
    }
    _flush() {
      let item;
      for (;item = this._queue.pop(); ) this._append(...item);
    }
    _append(str, line, column, identifierName, filename, force) {
      this._map && "\n" !== str[0] && this._map.mark(this._position.line, this._position.column, line, column, identifierName, filename, force), 
      this._buf.push(str), this._last = str[str.length - 1];
      for (let i = 0; i < str.length; i++) "\n" === str[i] ? (this._position.line++, this._position.column = 0) : this._position.column++;
    }
    removeTrailingNewline() {
      this._queue.length > 0 && "\n" === this._queue[0][0] && this._queue.shift();
    }
    removeLastSemicolon() {
      this._queue.length > 0 && ";" === this._queue[0][0] && this._queue.shift();
    }
    endsWith(suffix) {
      if (1 === suffix.length) {
        let last;
        if (this._queue.length > 0) {
          const str = this._queue[0][0];
          last = str[str.length - 1];
        } else last = this._last;
        return last === suffix;
      }
      const end = this._last + this._queue.reduce((acc, item) => item[0] + acc, "");
      return suffix.length <= end.length && end.slice(-suffix.length) === suffix;
    }
    hasContent() {
      return this._queue.length > 0 || !!this._last;
    }
    exactSource(loc, cb) {
      this.source("start", loc, !0), cb(), this.source("end", loc), this._disallowPop("start", loc);
    }
    source(prop, loc, force) {
      prop && !loc || this._normalizePosition(prop, loc, this._sourcePosition, force);
    }
    withSource(prop, loc, cb) {
      if (!this._map) return cb();
      const originalLine = this._sourcePosition.line, originalColumn = this._sourcePosition.column, originalFilename = this._sourcePosition.filename, originalIdentifierName = this._sourcePosition.identifierName;
      this.source(prop, loc), cb(), this._sourcePosition.force && this._sourcePosition.line === originalLine && this._sourcePosition.column === originalColumn && this._sourcePosition.filename === originalFilename || this._disallowedPop && this._disallowedPop.line === originalLine && this._disallowedPop.column === originalColumn && this._disallowedPop.filename === originalFilename || (this._sourcePosition.line = originalLine, 
      this._sourcePosition.column = originalColumn, this._sourcePosition.filename = originalFilename, 
      this._sourcePosition.identifierName = originalIdentifierName, this._sourcePosition.force = !1, 
      this._disallowedPop = null);
    }
    _disallowPop(prop, loc) {
      prop && !loc || (this._disallowedPop = this._normalizePosition(prop, loc));
    }
    _normalizePosition(prop, loc, targetObj, force) {
      const pos = loc ? loc[prop] : null;
      void 0 === targetObj && (targetObj = {
        identifierName: null,
        line: null,
        column: null,
        filename: null,
        force: !1
      });
      const origLine = targetObj.line, origColumn = targetObj.column, origFilename = targetObj.filename;
      return targetObj.identifierName = "start" === prop && (null == loc ? void 0 : loc.identifierName) || null, 
      targetObj.line = null == pos ? void 0 : pos.line, targetObj.column = null == pos ? void 0 : pos.column, 
      targetObj.filename = null == loc ? void 0 : loc.filename, (force || targetObj.line !== origLine || targetObj.column !== origColumn || targetObj.filename !== origFilename) && (targetObj.force = force), 
      targetObj;
    }
    getCurrentColumn() {
      const extra = this._queue.reduce((acc, item) => item[0] + acc, ""), lastIndex = extra.lastIndexOf("\n");
      return -1 === lastIndex ? this._position.column + extra.length : extra.length - 1 - lastIndex;
    }
    getCurrentLine() {
      const extra = this._queue.reduce((acc, item) => item[0] + acc, "");
      let count = 0;
      for (let i = 0; i < extra.length; i++) "\n" === extra[i] && count++;
      return this._position.line + count;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.list = exports.nodes = void 0;
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function crawl(node, state = {}) {
    return t.isMemberExpression(node) || t.isOptionalMemberExpression(node) ? (crawl(node.object, state), 
    node.computed && crawl(node.property, state)) : t.isBinary(node) || t.isAssignmentExpression(node) ? (crawl(node.left, state), 
    crawl(node.right, state)) : t.isCallExpression(node) || t.isOptionalCallExpression(node) ? (state.hasCall = !0, 
    crawl(node.callee, state)) : t.isFunction(node) ? state.hasFunction = !0 : t.isIdentifier(node) && (state.hasHelper = state.hasHelper || isHelper(node.callee)), 
    state;
  }
  function isHelper(node) {
    return t.isMemberExpression(node) ? isHelper(node.object) || isHelper(node.property) : t.isIdentifier(node) ? "require" === node.name || "_" === node.name[0] : t.isCallExpression(node) ? isHelper(node.callee) : !(!t.isBinary(node) && !t.isAssignmentExpression(node)) && (t.isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right));
  }
  function isType(node) {
    return t.isLiteral(node) || t.isObjectExpression(node) || t.isArrayExpression(node) || t.isIdentifier(node) || t.isMemberExpression(node);
  }
  const nodes = {
    AssignmentExpression(node) {
      const state = crawl(node.right);
      if (state.hasCall && state.hasHelper || state.hasFunction) return {
        before: state.hasFunction,
        after: !0
      };
    },
    SwitchCase: (node, parent) => ({
      before: node.consequent.length || parent.cases[0] === node,
      after: !node.consequent.length && parent.cases[parent.cases.length - 1] === node
    }),
    LogicalExpression(node) {
      if (t.isFunction(node.left) || t.isFunction(node.right)) return {
        after: !0
      };
    },
    Literal(node) {
      if ("use strict" === node.value) return {
        after: !0
      };
    },
    CallExpression(node) {
      if (t.isFunction(node.callee) || isHelper(node)) return {
        before: !0,
        after: !0
      };
    },
    OptionalCallExpression(node) {
      if (t.isFunction(node.callee)) return {
        before: !0,
        after: !0
      };
    },
    VariableDeclaration(node) {
      for (let i = 0; i < node.declarations.length; i++) {
        const declar = node.declarations[i];
        let enabled = isHelper(declar.id) && !isType(declar.init);
        if (!enabled) {
          const state = crawl(declar.init);
          enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
        }
        if (enabled) return {
          before: !0,
          after: !0
        };
      }
    },
    IfStatement(node) {
      if (t.isBlockStatement(node.consequent)) return {
        before: !0,
        after: !0
      };
    }
  };
  exports.nodes = nodes, nodes.ObjectProperty = nodes.ObjectTypeProperty = nodes.ObjectMethod = function(node, parent) {
    if (parent.properties[0] === node) return {
      before: !0
    };
  }, nodes.ObjectTypeCallProperty = function(node, parent) {
    var _parent$properties;
    if (parent.callProperties[0] === node && !(null == (_parent$properties = parent.properties) ? void 0 : _parent$properties.length)) return {
      before: !0
    };
  }, nodes.ObjectTypeIndexer = function(node, parent) {
    var _parent$properties2, _parent$callPropertie;
    if (parent.indexers[0] === node && !(null == (_parent$properties2 = parent.properties) ? void 0 : _parent$properties2.length) && !(null == (_parent$callPropertie = parent.callProperties) ? void 0 : _parent$callPropertie.length)) return {
      before: !0
    };
  }, nodes.ObjectTypeInternalSlot = function(node, parent) {
    var _parent$properties3, _parent$callPropertie2, _parent$indexers;
    if (parent.internalSlots[0] === node && !(null == (_parent$properties3 = parent.properties) ? void 0 : _parent$properties3.length) && !(null == (_parent$callPropertie2 = parent.callProperties) ? void 0 : _parent$callPropertie2.length) && !(null == (_parent$indexers = parent.indexers) ? void 0 : _parent$indexers.length)) return {
      before: !0
    };
  };
  const list = {
    VariableDeclaration: node => node.declarations.map(decl => decl.init),
    ArrayExpression: node => node.elements,
    ObjectExpression: node => node.properties
  };
  exports.list = list, [ [ "Function", !0 ], [ "Class", !0 ], [ "Loop", !0 ], [ "LabeledStatement", !0 ], [ "SwitchStatement", !0 ], [ "TryStatement", !0 ] ].forEach((function([type, amounts]) {
    "boolean" == typeof amounts && (amounts = {
      after: amounts,
      before: amounts
    }), [ type ].concat(t.FLIPPED_ALIAS_KEYS[type] || []).forEach((function(type) {
      nodes[type] = function() {
        return amounts;
      };
    }));
  }));
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.NullableTypeAnnotation = function(node, parent) {
    return t.isArrayTypeAnnotation(parent);
  }, exports.FunctionTypeAnnotation = function(node, parent, printStack) {
    return t.isUnionTypeAnnotation(parent) || t.isIntersectionTypeAnnotation(parent) || t.isArrayTypeAnnotation(parent) || t.isTypeAnnotation(parent) && t.isArrowFunctionExpression(printStack[printStack.length - 3]);
  }, exports.UpdateExpression = function(node, parent) {
    return hasPostfixPart(node, parent) || isClassExtendsClause(node, parent);
  }, exports.ObjectExpression = function(node, parent, printStack) {
    return isFirstInStatement(printStack, {
      considerArrow: !0
    });
  }, exports.DoExpression = function(node, parent, printStack) {
    return isFirstInStatement(printStack);
  }, exports.Binary = function(node, parent) {
    if ("**" === node.operator && t.isBinaryExpression(parent, {
      operator: "**"
    })) return parent.left === node;
    if (isClassExtendsClause(node, parent)) return !0;
    if (hasPostfixPart(node, parent) || t.isUnaryLike(parent) || t.isAwaitExpression(parent)) return !0;
    if (t.isBinary(parent)) {
      const parentOp = parent.operator, parentPos = PRECEDENCE[parentOp], nodeOp = node.operator, nodePos = PRECEDENCE[nodeOp];
      if (parentPos === nodePos && parent.right === node && !t.isLogicalExpression(parent) || parentPos > nodePos) return !0;
    }
  }, exports.IntersectionTypeAnnotation = exports.UnionTypeAnnotation = function(node, parent) {
    return t.isArrayTypeAnnotation(parent) || t.isNullableTypeAnnotation(parent) || t.isIntersectionTypeAnnotation(parent) || t.isUnionTypeAnnotation(parent);
  }, exports.TSAsExpression = function() {
    return !0;
  }, exports.TSTypeAssertion = function() {
    return !0;
  }, exports.TSIntersectionType = exports.TSUnionType = function(node, parent) {
    return t.isTSArrayType(parent) || t.isTSOptionalType(parent) || t.isTSIntersectionType(parent) || t.isTSUnionType(parent) || t.isTSRestType(parent);
  }, exports.TSInferType = function(node, parent) {
    return t.isTSArrayType(parent) || t.isTSOptionalType(parent);
  }, exports.BinaryExpression = function(node, parent) {
    return "in" === node.operator && (t.isVariableDeclarator(parent) || t.isFor(parent));
  }, exports.SequenceExpression = function(node, parent) {
    if (t.isForStatement(parent) || t.isThrowStatement(parent) || t.isReturnStatement(parent) || t.isIfStatement(parent) && parent.test === node || t.isWhileStatement(parent) && parent.test === node || t.isForInStatement(parent) && parent.right === node || t.isSwitchStatement(parent) && parent.discriminant === node || t.isExpressionStatement(parent) && parent.expression === node) return !1;
    return !0;
  }, exports.AwaitExpression = exports.YieldExpression = function(node, parent) {
    return t.isBinary(parent) || t.isUnaryLike(parent) || hasPostfixPart(node, parent) || t.isAwaitExpression(parent) && t.isYieldExpression(node) || t.isConditionalExpression(parent) && node === parent.test || isClassExtendsClause(node, parent);
  }, exports.ClassExpression = function(node, parent, printStack) {
    return isFirstInStatement(printStack, {
      considerDefaultExports: !0
    });
  }, exports.UnaryLike = UnaryLike, exports.FunctionExpression = function(node, parent, printStack) {
    return isFirstInStatement(printStack, {
      considerDefaultExports: !0
    });
  }, exports.ArrowFunctionExpression = function(node, parent) {
    return t.isExportDeclaration(parent) || ConditionalExpression(node, parent);
  }, exports.ConditionalExpression = ConditionalExpression, exports.OptionalCallExpression = exports.OptionalMemberExpression = function(node, parent) {
    return t.isCallExpression(parent, {
      callee: node
    }) || t.isMemberExpression(parent, {
      object: node
    });
  }, exports.AssignmentExpression = function(node, parent, printStack) {
    return !!t.isObjectPattern(node.left) || ConditionalExpression(node, parent);
  }, exports.LogicalExpression = function(node, parent) {
    switch (node.operator) {
     case "||":
      return !!t.isLogicalExpression(parent) && ("??" === parent.operator || "&&" === parent.operator);

     case "&&":
      return t.isLogicalExpression(parent, {
        operator: "??"
      });

     case "??":
      return t.isLogicalExpression(parent) && "??" !== parent.operator;
    }
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const PRECEDENCE = {
    "||": 0,
    "??": 0,
    "&&": 1,
    "|": 2,
    "^": 3,
    "&": 4,
    "==": 5,
    "===": 5,
    "!=": 5,
    "!==": 5,
    "<": 6,
    ">": 6,
    "<=": 6,
    ">=": 6,
    in: 6,
    instanceof: 6,
    ">>": 7,
    "<<": 7,
    ">>>": 7,
    "+": 8,
    "-": 8,
    "*": 9,
    "/": 9,
    "%": 9,
    "**": 10
  }, isClassExtendsClause = (node, parent) => (t.isClassDeclaration(parent) || t.isClassExpression(parent)) && parent.superClass === node, hasPostfixPart = (node, parent) => (t.isMemberExpression(parent) || t.isOptionalMemberExpression(parent)) && parent.object === node || (t.isCallExpression(parent) || t.isOptionalCallExpression(parent) || t.isNewExpression(parent)) && parent.callee === node || t.isTaggedTemplateExpression(parent) && parent.tag === node || t.isTSNonNullExpression(parent);
  function UnaryLike(node, parent) {
    return hasPostfixPart(node, parent) || t.isBinaryExpression(parent, {
      operator: "**",
      left: node
    }) || isClassExtendsClause(node, parent);
  }
  function ConditionalExpression(node, parent) {
    return !!(t.isUnaryLike(parent) || t.isBinary(parent) || t.isConditionalExpression(parent, {
      test: node
    }) || t.isAwaitExpression(parent) || t.isTSTypeAssertion(parent) || t.isTSAsExpression(parent)) || UnaryLike(node, parent);
  }
  function isFirstInStatement(printStack, {considerArrow: considerArrow = !1, considerDefaultExports: considerDefaultExports = !1} = {}) {
    let i = printStack.length - 1, node = printStack[i];
    i--;
    let parent = printStack[i];
    for (;i > 0; ) {
      if (t.isExpressionStatement(parent, {
        expression: node
      }) || considerDefaultExports && t.isExportDefaultDeclaration(parent, {
        declaration: node
      }) || considerArrow && t.isArrowFunctionExpression(parent, {
        body: node
      })) return !0;
      if (!(hasPostfixPart(node, parent) && !t.isNewExpression(parent) || t.isSequenceExpression(parent) && parent.expressions[0] === node || t.isConditional(parent, {
        test: node
      }) || t.isBinary(parent, {
        left: node
      }) || t.isAssignmentExpression(parent, {
        left: node
      }))) return !1;
      node = parent, i--, parent = printStack[i];
    }
    return !1;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var _templateLiterals = __webpack_require__(127);
  Object.keys(_templateLiterals).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _templateLiterals[key];
      }
    });
  }));
  var _expressions = __webpack_require__(128);
  Object.keys(_expressions).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _expressions[key];
      }
    });
  }));
  var _statements = __webpack_require__(129);
  Object.keys(_statements).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _statements[key];
      }
    });
  }));
  var _classes = __webpack_require__(130);
  Object.keys(_classes).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _classes[key];
      }
    });
  }));
  var _methods = __webpack_require__(131);
  Object.keys(_methods).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _methods[key];
      }
    });
  }));
  var _modules = __webpack_require__(69);
  Object.keys(_modules).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _modules[key];
      }
    });
  }));
  var _types = __webpack_require__(70);
  Object.keys(_types).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _types[key];
      }
    });
  }));
  var _flow = __webpack_require__(133);
  Object.keys(_flow).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _flow[key];
      }
    });
  }));
  var _base = __webpack_require__(134);
  Object.keys(_base).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _base[key];
      }
    });
  }));
  var _jsx = __webpack_require__(135);
  Object.keys(_jsx).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _jsx[key];
      }
    });
  }));
  var _typescript = __webpack_require__(136);
  Object.keys(_typescript).forEach((function(key) {
    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _typescript[key];
      }
    });
  }));
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.TaggedTemplateExpression = function(node) {
    this.print(node.tag, node), this.print(node.typeParameters, node), this.print(node.quasi, node);
  }, exports.TemplateElement = function(node, parent) {
    const isFirst = parent.quasis[0] === node, isLast = parent.quasis[parent.quasis.length - 1] === node, value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");
    this.token(value);
  }, exports.TemplateLiteral = function(node) {
    const quasis = node.quasis;
    for (let i = 0; i < quasis.length; i++) this.print(quasis[i], node), i + 1 < quasis.length && this.print(node.expressions[i], node);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.UnaryExpression = function(node) {
    "void" === node.operator || "delete" === node.operator || "typeof" === node.operator || "throw" === node.operator ? (this.word(node.operator), 
    this.space()) : this.token(node.operator);
    this.print(node.argument, node);
  }, exports.DoExpression = function(node) {
    this.word("do"), this.space(), this.print(node.body, node);
  }, exports.ParenthesizedExpression = function(node) {
    this.token("("), this.print(node.expression, node), this.token(")");
  }, exports.UpdateExpression = function(node) {
    node.prefix ? (this.token(node.operator), this.print(node.argument, node)) : (this.startTerminatorless(!0), 
    this.print(node.argument, node), this.endTerminatorless(), this.token(node.operator));
  }, exports.ConditionalExpression = function(node) {
    this.print(node.test, node), this.space(), this.token("?"), this.space(), this.print(node.consequent, node), 
    this.space(), this.token(":"), this.space(), this.print(node.alternate, node);
  }, exports.NewExpression = function(node, parent) {
    if (this.word("new"), this.space(), this.print(node.callee, node), this.format.minified && 0 === node.arguments.length && !node.optional && !t.isCallExpression(parent, {
      callee: node
    }) && !t.isMemberExpression(parent) && !t.isNewExpression(parent)) return;
    this.print(node.typeArguments, node), this.print(node.typeParameters, node), node.optional && this.token("?.");
    this.token("("), this.printList(node.arguments, node), this.token(")");
  }, exports.SequenceExpression = function(node) {
    this.printList(node.expressions, node);
  }, exports.ThisExpression = function() {
    this.word("this");
  }, exports.Super = function() {
    this.word("super");
  }, exports.Decorator = function(node) {
    this.token("@"), this.print(node.expression, node), this.newline();
  }, exports.OptionalMemberExpression = function(node) {
    if (this.print(node.object, node), !node.computed && t.isMemberExpression(node.property)) throw new TypeError("Got a MemberExpression for MemberExpression property");
    let computed = node.computed;
    t.isLiteral(node.property) && "number" == typeof node.property.value && (computed = !0);
    node.optional && this.token("?.");
    computed ? (this.token("["), this.print(node.property, node), this.token("]")) : (node.optional || this.token("."), 
    this.print(node.property, node));
  }, exports.OptionalCallExpression = function(node) {
    this.print(node.callee, node), this.print(node.typeArguments, node), this.print(node.typeParameters, node), 
    node.optional && this.token("?.");
    this.token("("), this.printList(node.arguments, node), this.token(")");
  }, exports.CallExpression = function(node) {
    this.print(node.callee, node), this.print(node.typeArguments, node), this.print(node.typeParameters, node), 
    this.token("("), this.printList(node.arguments, node), this.token(")");
  }, exports.Import = function() {
    this.word("import");
  }, exports.EmptyStatement = function() {
    this.semicolon(!0);
  }, exports.ExpressionStatement = function(node) {
    this.print(node.expression, node), this.semicolon();
  }, exports.AssignmentPattern = function(node) {
    this.print(node.left, node), node.left.optional && this.token("?");
    this.print(node.left.typeAnnotation, node), this.space(), this.token("="), this.space(), 
    this.print(node.right, node);
  }, exports.LogicalExpression = exports.BinaryExpression = exports.AssignmentExpression = function(node, parent) {
    const parens = this.inForStatementInitCounter && "in" === node.operator && !n.needsParens(node, parent);
    parens && this.token("(");
    this.print(node.left, node), this.space(), "in" === node.operator || "instanceof" === node.operator ? this.word(node.operator) : this.token(node.operator);
    this.space(), this.print(node.right, node), parens && this.token(")");
  }, exports.BindExpression = function(node) {
    this.print(node.object, node), this.token("::"), this.print(node.callee, node);
  }, exports.MemberExpression = function(node) {
    if (this.print(node.object, node), !node.computed && t.isMemberExpression(node.property)) throw new TypeError("Got a MemberExpression for MemberExpression property");
    let computed = node.computed;
    t.isLiteral(node.property) && "number" == typeof node.property.value && (computed = !0);
    computed ? (this.token("["), this.print(node.property, node), this.token("]")) : (this.token("."), 
    this.print(node.property, node));
  }, exports.MetaProperty = function(node) {
    this.print(node.meta, node), this.token("."), this.print(node.property, node);
  }, exports.PrivateName = function(node) {
    this.token("#"), this.print(node.id, node);
  }, exports.V8IntrinsicIdentifier = function(node) {
    this.token("%"), this.word(node.name);
  }, exports.AwaitExpression = exports.YieldExpression = void 0;
  var t = _interopRequireWildcard(__webpack_require__(0)), n = _interopRequireWildcard(__webpack_require__(68));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  function buildYieldAwait(keyword) {
    return function(node) {
      if (this.word(keyword), node.delegate && this.token("*"), node.argument) {
        this.space();
        const terminatorState = this.startTerminatorless();
        this.print(node.argument, node), this.endTerminatorless(terminatorState);
      }
    };
  }
  const YieldExpression = buildYieldAwait("yield");
  exports.YieldExpression = YieldExpression;
  const AwaitExpression = buildYieldAwait("await");
  exports.AwaitExpression = AwaitExpression;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.WithStatement = function(node) {
    this.word("with"), this.space(), this.token("("), this.print(node.object, node), 
    this.token(")"), this.printBlock(node);
  }, exports.IfStatement = function(node) {
    this.word("if"), this.space(), this.token("("), this.print(node.test, node), this.token(")"), 
    this.space();
    const needsBlock = node.alternate && t.isIfStatement(function getLastStatement(statement) {
      return t.isStatement(statement.body) ? getLastStatement(statement.body) : statement;
    }(node.consequent));
    needsBlock && (this.token("{"), this.newline(), this.indent());
    this.printAndIndentOnComments(node.consequent, node), needsBlock && (this.dedent(), 
    this.newline(), this.token("}"));
    node.alternate && (this.endsWith("}") && this.space(), this.word("else"), this.space(), 
    this.printAndIndentOnComments(node.alternate, node));
  }, exports.ForStatement = function(node) {
    this.word("for"), this.space(), this.token("("), this.inForStatementInitCounter++, 
    this.print(node.init, node), this.inForStatementInitCounter--, this.token(";"), 
    node.test && (this.space(), this.print(node.test, node));
    this.token(";"), node.update && (this.space(), this.print(node.update, node));
    this.token(")"), this.printBlock(node);
  }, exports.WhileStatement = function(node) {
    this.word("while"), this.space(), this.token("("), this.print(node.test, node), 
    this.token(")"), this.printBlock(node);
  }, exports.DoWhileStatement = function(node) {
    this.word("do"), this.space(), this.print(node.body, node), this.space(), this.word("while"), 
    this.space(), this.token("("), this.print(node.test, node), this.token(")"), this.semicolon();
  }, exports.LabeledStatement = function(node) {
    this.print(node.label, node), this.token(":"), this.space(), this.print(node.body, node);
  }, exports.TryStatement = function(node) {
    this.word("try"), this.space(), this.print(node.block, node), this.space(), node.handlers ? this.print(node.handlers[0], node) : this.print(node.handler, node);
    node.finalizer && (this.space(), this.word("finally"), this.space(), this.print(node.finalizer, node));
  }, exports.CatchClause = function(node) {
    this.word("catch"), this.space(), node.param && (this.token("("), this.print(node.param, node), 
    this.token(")"), this.space());
    this.print(node.body, node);
  }, exports.SwitchStatement = function(node) {
    this.word("switch"), this.space(), this.token("("), this.print(node.discriminant, node), 
    this.token(")"), this.space(), this.token("{"), this.printSequence(node.cases, node, {
      indent: !0,
      addNewlines(leading, cas) {
        if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
      }
    }), this.token("}");
  }, exports.SwitchCase = function(node) {
    node.test ? (this.word("case"), this.space(), this.print(node.test, node), this.token(":")) : (this.word("default"), 
    this.token(":"));
    node.consequent.length && (this.newline(), this.printSequence(node.consequent, node, {
      indent: !0
    }));
  }, exports.DebuggerStatement = function() {
    this.word("debugger"), this.semicolon();
  }, exports.VariableDeclaration = function(node, parent) {
    node.declare && (this.word("declare"), this.space());
    this.word(node.kind), this.space();
    let separator, hasInits = !1;
    if (!t.isFor(parent)) for (const declar of node.declarations) declar.init && (hasInits = !0);
    hasInits && (separator = "const" === node.kind ? constDeclarationIndent : variableDeclarationIndent);
    if (this.printList(node.declarations, node, {
      separator: separator
    }), t.isFor(parent) && (parent.left === node || parent.init === node)) return;
    this.semicolon();
  }, exports.VariableDeclarator = function(node) {
    this.print(node.id, node), node.definite && this.token("!");
    this.print(node.id.typeAnnotation, node), node.init && (this.space(), this.token("="), 
    this.space(), this.print(node.init, node));
  }, exports.ThrowStatement = exports.BreakStatement = exports.ReturnStatement = exports.ContinueStatement = exports.ForOfStatement = exports.ForInStatement = void 0;
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const buildForXStatement = function(op) {
    return function(node) {
      this.word("for"), this.space(), "of" === op && node.await && (this.word("await"), 
      this.space()), this.token("("), this.print(node.left, node), this.space(), this.word(op), 
      this.space(), this.print(node.right, node), this.token(")"), this.printBlock(node);
    };
  }, ForInStatement = buildForXStatement("in");
  exports.ForInStatement = ForInStatement;
  const ForOfStatement = buildForXStatement("of");
  function buildLabelStatement(prefix, key = "label") {
    return function(node) {
      this.word(prefix);
      const label = node[key];
      if (label) {
        this.space();
        const isLabel = "label" == key, terminatorState = this.startTerminatorless(isLabel);
        this.print(label, node), this.endTerminatorless(terminatorState);
      }
      this.semicolon();
    };
  }
  exports.ForOfStatement = ForOfStatement;
  const ContinueStatement = buildLabelStatement("continue");
  exports.ContinueStatement = ContinueStatement;
  const ReturnStatement = buildLabelStatement("return", "argument");
  exports.ReturnStatement = ReturnStatement;
  const BreakStatement = buildLabelStatement("break");
  exports.BreakStatement = BreakStatement;
  const ThrowStatement = buildLabelStatement("throw", "argument");
  function variableDeclarationIndent() {
    if (this.token(","), this.newline(), this.endsWith("\n")) for (let i = 0; i < 4; i++) this.space(!0);
  }
  function constDeclarationIndent() {
    if (this.token(","), this.newline(), this.endsWith("\n")) for (let i = 0; i < 6; i++) this.space(!0);
  }
  exports.ThrowStatement = ThrowStatement;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.ClassExpression = exports.ClassDeclaration = function(node, parent) {
    this.format.decoratorsBeforeExport && (t.isExportDefaultDeclaration(parent) || t.isExportNamedDeclaration(parent)) || this.printJoin(node.decorators, node);
    node.declare && (this.word("declare"), this.space());
    node.abstract && (this.word("abstract"), this.space());
    this.word("class"), node.id && (this.space(), this.print(node.id, node));
    this.print(node.typeParameters, node), node.superClass && (this.space(), this.word("extends"), 
    this.space(), this.print(node.superClass, node), this.print(node.superTypeParameters, node));
    node.implements && (this.space(), this.word("implements"), this.space(), this.printList(node.implements, node));
    this.space(), this.print(node.body, node);
  }, exports.ClassBody = function(node) {
    this.token("{"), this.printInnerComments(node), 0 === node.body.length ? this.token("}") : (this.newline(), 
    this.indent(), this.printSequence(node.body, node), this.dedent(), this.endsWith("\n") || this.newline(), 
    this.rightBrace());
  }, exports.ClassProperty = function(node) {
    this.printJoin(node.decorators, node), this.tsPrintClassMemberModifiers(node, !0), 
    node.computed ? (this.token("["), this.print(node.key, node), this.token("]")) : (this._variance(node), 
    this.print(node.key, node));
    node.optional && this.token("?");
    node.definite && this.token("!");
    this.print(node.typeAnnotation, node), node.value && (this.space(), this.token("="), 
    this.space(), this.print(node.value, node));
    this.semicolon();
  }, exports.ClassPrivateProperty = function(node) {
    node.static && (this.word("static"), this.space());
    this.print(node.key, node), this.print(node.typeAnnotation, node), node.value && (this.space(), 
    this.token("="), this.space(), this.print(node.value, node));
    this.semicolon();
  }, exports.ClassMethod = function(node) {
    this._classMethodHead(node), this.space(), this.print(node.body, node);
  }, exports.ClassPrivateMethod = function(node) {
    this._classMethodHead(node), this.space(), this.print(node.body, node);
  }, exports._classMethodHead = function(node) {
    this.printJoin(node.decorators, node), this.tsPrintClassMemberModifiers(node, !1), 
    this._methodHead(node);
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports._params = function(node) {
    this.print(node.typeParameters, node), this.token("("), this._parameters(node.params, node), 
    this.token(")"), this.print(node.returnType, node);
  }, exports._parameters = function(parameters, parent) {
    for (let i = 0; i < parameters.length; i++) this._param(parameters[i], parent), 
    i < parameters.length - 1 && (this.token(","), this.space());
  }, exports._param = function(parameter, parent) {
    this.printJoin(parameter.decorators, parameter), this.print(parameter, parent), 
    parameter.optional && this.token("?");
    this.print(parameter.typeAnnotation, parameter);
  }, exports._methodHead = function(node) {
    const kind = node.kind, key = node.key;
    "get" !== kind && "set" !== kind || (this.word(kind), this.space());
    node.async && (this.word("async"), this.space());
    "method" !== kind && "init" !== kind || node.generator && this.token("*");
    node.computed ? (this.token("["), this.print(key, node), this.token("]")) : this.print(key, node);
    node.optional && this.token("?");
    this._params(node);
  }, exports._predicate = function(node) {
    node.predicate && (node.returnType || this.token(":"), this.space(), this.print(node.predicate, node));
  }, exports._functionHead = function(node) {
    node.async && (this.word("async"), this.space());
    this.word("function"), node.generator && this.token("*");
    this.space(), node.id && this.print(node.id, node);
    this._params(node), this._predicate(node);
  }, exports.FunctionDeclaration = exports.FunctionExpression = function(node) {
    this._functionHead(node), this.space(), this.print(node.body, node);
  }, exports.ArrowFunctionExpression = function(node) {
    node.async && (this.word("async"), this.space());
    const firstParam = node.params[0];
    1 === node.params.length && t.isIdentifier(firstParam) && !function(node, param) {
      return node.typeParameters || node.returnType || param.typeAnnotation || param.optional || param.trailingComments;
    }(node, firstParam) ? this.format.retainLines && node.loc && node.body.loc && node.loc.start.line < node.body.loc.start.line ? (this.token("("), 
    firstParam.loc && firstParam.loc.start.line > node.loc.start.line ? (this.indent(), 
    this.print(firstParam, node), this.dedent(), this._catchUp("start", node.body.loc)) : this.print(firstParam, node), 
    this.token(")")) : this.print(firstParam, node) : this._params(node);
    this._predicate(node), this.space(), this.token("=>"), this.space(), this.print(node.body, node);
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  const object = {}, hasOwnProperty = object.hasOwnProperty, forOwn = (object, callback) => {
    for (const key in object) hasOwnProperty.call(object, key) && callback(key, object[key]);
  }, toString = object.toString, isArray = Array.isArray, isBuffer = Buffer.isBuffer, singleEscapes = {
    '"': '\\"',
    "'": "\\'",
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t"
  }, regexSingleEscape = /["'\\\b\f\n\r\t]/, regexDigit = /[0-9]/, regexWhitelist = /[ !#-&\(-\[\]-_a-~]/, jsesc = (argument, options) => {
    const increaseIndentation = () => {
      oldIndent = indent, ++options.indentLevel, indent = options.indent.repeat(options.indentLevel);
    }, defaults = {
      escapeEverything: !1,
      minimal: !1,
      isScriptContext: !1,
      quotes: "single",
      wrap: !1,
      es6: !1,
      json: !1,
      compact: !0,
      lowercaseHex: !1,
      numbers: "decimal",
      indent: "\t",
      indentLevel: 0,
      __inline1__: !1,
      __inline2__: !1
    }, json = options && options.json;
    var destination, source;
    json && (defaults.quotes = "double", defaults.wrap = !0), destination = defaults, 
    "single" != (options = (source = options) ? (forOwn(source, (key, value) => {
      destination[key] = value;
    }), destination) : destination).quotes && "double" != options.quotes && "backtick" != options.quotes && (options.quotes = "single");
    const quote = "double" == options.quotes ? '"' : "backtick" == options.quotes ? "`" : "'", compact = options.compact, lowercaseHex = options.lowercaseHex;
    let indent = options.indent.repeat(options.indentLevel), oldIndent = "";
    const inline1 = options.__inline1__, inline2 = options.__inline2__, newLine = compact ? "" : "\n";
    let result, isEmpty = !0;
    const useBinNumbers = "binary" == options.numbers, useOctNumbers = "octal" == options.numbers, useDecNumbers = "decimal" == options.numbers, useHexNumbers = "hexadecimal" == options.numbers;
    if (json && argument && "function" == typeof argument.toJSON && (argument = argument.toJSON()), 
    !(value => "string" == typeof value || "[object String]" == toString.call(value))(argument)) {
      if ((value => "[object Map]" == toString.call(value))(argument)) return 0 == argument.size ? "new Map()" : (compact || (options.__inline1__ = !0, 
      options.__inline2__ = !1), "new Map(" + jsesc(Array.from(argument), options) + ")");
      if ((value => "[object Set]" == toString.call(value))(argument)) return 0 == argument.size ? "new Set()" : "new Set(" + jsesc(Array.from(argument), options) + ")";
      if (isBuffer(argument)) return 0 == argument.length ? "Buffer.from([])" : "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
      if (isArray(argument)) return result = [], options.wrap = !0, inline1 && (options.__inline1__ = !1, 
      options.__inline2__ = !0), inline2 || increaseIndentation(), ((array, callback) => {
        const length = array.length;
        let index = -1;
        for (;++index < length; ) callback(array[index]);
      })(argument, value => {
        isEmpty = !1, inline2 && (options.__inline2__ = !1), result.push((compact || inline2 ? "" : indent) + jsesc(value, options));
      }), isEmpty ? "[]" : inline2 ? "[" + result.join(", ") + "]" : "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
      if (!(value => "number" == typeof value || "[object Number]" == toString.call(value))(argument)) return (value => "[object Object]" == toString.call(value))(argument) ? (result = [], 
      options.wrap = !0, increaseIndentation(), forOwn(argument, (key, value) => {
        isEmpty = !1, result.push((compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options));
      }), isEmpty ? "{}" : "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}") : json ? JSON.stringify(argument) || "null" : String(argument);
      if (json) return JSON.stringify(argument);
      if (useDecNumbers) return String(argument);
      if (useHexNumbers) {
        let hexadecimal = argument.toString(16);
        return lowercaseHex || (hexadecimal = hexadecimal.toUpperCase()), "0x" + hexadecimal;
      }
      if (useBinNumbers) return "0b" + argument.toString(2);
      if (useOctNumbers) return "0o" + argument.toString(8);
    }
    const string = argument;
    let index = -1;
    const length = string.length;
    for (result = ""; ++index < length; ) {
      const character = string.charAt(index);
      if (options.es6) {
        const first = string.charCodeAt(index);
        if (first >= 55296 && first <= 56319 && length > index + 1) {
          const second = string.charCodeAt(index + 1);
          if (second >= 56320 && second <= 57343) {
            let hexadecimal = (1024 * (first - 55296) + second - 56320 + 65536).toString(16);
            lowercaseHex || (hexadecimal = hexadecimal.toUpperCase()), result += "\\u{" + hexadecimal + "}", 
            ++index;
            continue;
          }
        }
      }
      if (!options.escapeEverything) {
        if (regexWhitelist.test(character)) {
          result += character;
          continue;
        }
        if ('"' == character) {
          result += quote == character ? '\\"' : character;
          continue;
        }
        if ("`" == character) {
          result += quote == character ? "\\`" : character;
          continue;
        }
        if ("'" == character) {
          result += quote == character ? "\\'" : character;
          continue;
        }
      }
      if ("\0" == character && !json && !regexDigit.test(string.charAt(index + 1))) {
        result += "\\0";
        continue;
      }
      if (regexSingleEscape.test(character)) {
        result += singleEscapes[character];
        continue;
      }
      const charCode = character.charCodeAt(0);
      if (options.minimal && 8232 != charCode && 8233 != charCode) {
        result += character;
        continue;
      }
      let hexadecimal = charCode.toString(16);
      lowercaseHex || (hexadecimal = hexadecimal.toUpperCase());
      const longhand = hexadecimal.length > 2 || json, escaped = "\\" + (longhand ? "u" : "x") + ("0000" + hexadecimal).slice(longhand ? -4 : -2);
      result += escaped;
    }
    return options.wrap && (result = quote + result + quote), "`" == quote && (result = result.replace(/\$\{/g, "\\${")), 
    options.isScriptContext ? result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json ? "\\u003C!--" : "\\x3C!--") : result;
  };
  jsesc.version = "2.5.2", module.exports = jsesc;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.AnyTypeAnnotation = function() {
    this.word("any");
  }, exports.ArrayTypeAnnotation = function(node) {
    this.print(node.elementType, node), this.token("["), this.token("]");
  }, exports.BooleanTypeAnnotation = function() {
    this.word("boolean");
  }, exports.BooleanLiteralTypeAnnotation = function(node) {
    this.word(node.value ? "true" : "false");
  }, exports.NullLiteralTypeAnnotation = function() {
    this.word("null");
  }, exports.DeclareClass = function(node, parent) {
    t.isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
    this.word("class"), this.space(), this._interfaceish(node);
  }, exports.DeclareFunction = function(node, parent) {
    t.isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
    this.word("function"), this.space(), this.print(node.id, node), this.print(node.id.typeAnnotation.typeAnnotation, node), 
    node.predicate && (this.space(), this.print(node.predicate, node));
    this.semicolon();
  }, exports.InferredPredicate = function() {
    this.token("%"), this.word("checks");
  }, exports.DeclaredPredicate = function(node) {
    this.token("%"), this.word("checks"), this.token("("), this.print(node.value, node), 
    this.token(")");
  }, exports.DeclareInterface = function(node) {
    this.word("declare"), this.space(), this.InterfaceDeclaration(node);
  }, exports.DeclareModule = function(node) {
    this.word("declare"), this.space(), this.word("module"), this.space(), this.print(node.id, node), 
    this.space(), this.print(node.body, node);
  }, exports.DeclareModuleExports = function(node) {
    this.word("declare"), this.space(), this.word("module"), this.token("."), this.word("exports"), 
    this.print(node.typeAnnotation, node);
  }, exports.DeclareTypeAlias = function(node) {
    this.word("declare"), this.space(), this.TypeAlias(node);
  }, exports.DeclareOpaqueType = function(node, parent) {
    t.isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
    this.OpaqueType(node);
  }, exports.DeclareVariable = function(node, parent) {
    t.isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
    this.word("var"), this.space(), this.print(node.id, node), this.print(node.id.typeAnnotation, node), 
    this.semicolon();
  }, exports.DeclareExportDeclaration = function(node) {
    this.word("declare"), this.space(), this.word("export"), this.space(), node.default && (this.word("default"), 
    this.space());
    FlowExportDeclaration.apply(this, arguments);
  }, exports.DeclareExportAllDeclaration = function() {
    this.word("declare"), this.space(), _modules.ExportAllDeclaration.apply(this, arguments);
  }, exports.EnumDeclaration = function(node) {
    const {id: id, body: body} = node;
    this.word("enum"), this.space(), this.print(id, node), this.print(body, node);
  }, exports.EnumBooleanBody = function(node) {
    const {explicitType: explicitType} = node;
    enumExplicitType(this, "boolean", explicitType), enumBody(this, node);
  }, exports.EnumNumberBody = function(node) {
    const {explicitType: explicitType} = node;
    enumExplicitType(this, "number", explicitType), enumBody(this, node);
  }, exports.EnumStringBody = function(node) {
    const {explicitType: explicitType} = node;
    enumExplicitType(this, "string", explicitType), enumBody(this, node);
  }, exports.EnumSymbolBody = function(node) {
    enumExplicitType(this, "symbol", !0), enumBody(this, node);
  }, exports.EnumDefaultedMember = function(node) {
    const {id: id} = node;
    this.print(id, node), this.token(",");
  }, exports.EnumBooleanMember = function(node) {
    enumInitializedMember(this, node);
  }, exports.EnumNumberMember = function(node) {
    enumInitializedMember(this, node);
  }, exports.EnumStringMember = function(node) {
    enumInitializedMember(this, node);
  }, exports.ExistsTypeAnnotation = function() {
    this.token("*");
  }, exports.FunctionTypeAnnotation = function(node, parent) {
    this.print(node.typeParameters, node), this.token("("), this.printList(node.params, node), 
    node.rest && (node.params.length && (this.token(","), this.space()), this.token("..."), 
    this.print(node.rest, node));
    this.token(")"), "ObjectTypeCallProperty" === parent.type || "DeclareFunction" === parent.type || "ObjectTypeProperty" === parent.type && parent.method ? this.token(":") : (this.space(), 
    this.token("=>"));
    this.space(), this.print(node.returnType, node);
  }, exports.FunctionTypeParam = function(node) {
    this.print(node.name, node), node.optional && this.token("?");
    node.name && (this.token(":"), this.space());
    this.print(node.typeAnnotation, node);
  }, exports.GenericTypeAnnotation = exports.ClassImplements = exports.InterfaceExtends = function(node) {
    this.print(node.id, node), this.print(node.typeParameters, node);
  }, exports._interfaceish = function(node) {
    this.print(node.id, node), this.print(node.typeParameters, node), node.extends.length && (this.space(), 
    this.word("extends"), this.space(), this.printList(node.extends, node));
    node.mixins && node.mixins.length && (this.space(), this.word("mixins"), this.space(), 
    this.printList(node.mixins, node));
    node.implements && node.implements.length && (this.space(), this.word("implements"), 
    this.space(), this.printList(node.implements, node));
    this.space(), this.print(node.body, node);
  }, exports._variance = function(node) {
    node.variance && ("plus" === node.variance.kind ? this.token("+") : "minus" === node.variance.kind && this.token("-"));
  }, exports.InterfaceDeclaration = function(node) {
    this.word("interface"), this.space(), this._interfaceish(node);
  }, exports.InterfaceTypeAnnotation = function(node) {
    this.word("interface"), node.extends && node.extends.length && (this.space(), this.word("extends"), 
    this.space(), this.printList(node.extends, node));
    this.space(), this.print(node.body, node);
  }, exports.IntersectionTypeAnnotation = function(node) {
    this.printJoin(node.types, node, {
      separator: andSeparator
    });
  }, exports.MixedTypeAnnotation = function() {
    this.word("mixed");
  }, exports.EmptyTypeAnnotation = function() {
    this.word("empty");
  }, exports.NullableTypeAnnotation = function(node) {
    this.token("?"), this.print(node.typeAnnotation, node);
  }, exports.NumberTypeAnnotation = function() {
    this.word("number");
  }, exports.StringTypeAnnotation = function() {
    this.word("string");
  }, exports.ThisTypeAnnotation = function() {
    this.word("this");
  }, exports.TupleTypeAnnotation = function(node) {
    this.token("["), this.printList(node.types, node), this.token("]");
  }, exports.TypeofTypeAnnotation = function(node) {
    this.word("typeof"), this.space(), this.print(node.argument, node);
  }, exports.TypeAlias = function(node) {
    this.word("type"), this.space(), this.print(node.id, node), this.print(node.typeParameters, node), 
    this.space(), this.token("="), this.space(), this.print(node.right, node), this.semicolon();
  }, exports.TypeAnnotation = function(node) {
    this.token(":"), this.space(), node.optional && this.token("?");
    this.print(node.typeAnnotation, node);
  }, exports.TypeParameterDeclaration = exports.TypeParameterInstantiation = function(node) {
    this.token("<"), this.printList(node.params, node, {}), this.token(">");
  }, exports.TypeParameter = function(node) {
    this._variance(node), this.word(node.name), node.bound && this.print(node.bound, node);
    node.default && (this.space(), this.token("="), this.space(), this.print(node.default, node));
  }, exports.OpaqueType = function(node) {
    this.word("opaque"), this.space(), this.word("type"), this.space(), this.print(node.id, node), 
    this.print(node.typeParameters, node), node.supertype && (this.token(":"), this.space(), 
    this.print(node.supertype, node));
    node.impltype && (this.space(), this.token("="), this.space(), this.print(node.impltype, node));
    this.semicolon();
  }, exports.ObjectTypeAnnotation = function(node) {
    node.exact ? this.token("{|") : this.token("{");
    const props = node.properties.concat(node.callProperties || [], node.indexers || [], node.internalSlots || []);
    props.length && (this.space(), this.printJoin(props, node, {
      addNewlines(leading) {
        if (leading && !props[0]) return 1;
      },
      indent: !0,
      statement: !0,
      iterator: () => {
        (1 !== props.length || node.inexact) && (this.token(","), this.space());
      }
    }), this.space());
    node.inexact && (this.indent(), this.token("..."), props.length && this.newline(), 
    this.dedent());
    node.exact ? this.token("|}") : this.token("}");
  }, exports.ObjectTypeInternalSlot = function(node) {
    node.static && (this.word("static"), this.space());
    this.token("["), this.token("["), this.print(node.id, node), this.token("]"), this.token("]"), 
    node.optional && this.token("?");
    node.method || (this.token(":"), this.space());
    this.print(node.value, node);
  }, exports.ObjectTypeCallProperty = function(node) {
    node.static && (this.word("static"), this.space());
    this.print(node.value, node);
  }, exports.ObjectTypeIndexer = function(node) {
    node.static && (this.word("static"), this.space());
    this._variance(node), this.token("["), node.id && (this.print(node.id, node), this.token(":"), 
    this.space());
    this.print(node.key, node), this.token("]"), this.token(":"), this.space(), this.print(node.value, node);
  }, exports.ObjectTypeProperty = function(node) {
    node.proto && (this.word("proto"), this.space());
    node.static && (this.word("static"), this.space());
    "get" !== node.kind && "set" !== node.kind || (this.word(node.kind), this.space());
    this._variance(node), this.print(node.key, node), node.optional && this.token("?");
    node.method || (this.token(":"), this.space());
    this.print(node.value, node);
  }, exports.ObjectTypeSpreadProperty = function(node) {
    this.token("..."), this.print(node.argument, node);
  }, exports.QualifiedTypeIdentifier = function(node) {
    this.print(node.qualification, node), this.token("."), this.print(node.id, node);
  }, exports.SymbolTypeAnnotation = function() {
    this.word("symbol");
  }, exports.UnionTypeAnnotation = function(node) {
    this.printJoin(node.types, node, {
      separator: orSeparator
    });
  }, exports.TypeCastExpression = function(node) {
    this.token("("), this.print(node.expression, node), this.print(node.typeAnnotation, node), 
    this.token(")");
  }, exports.Variance = function(node) {
    "plus" === node.kind ? this.token("+") : this.token("-");
  }, exports.VoidTypeAnnotation = function() {
    this.word("void");
  }, Object.defineProperty(exports, "NumberLiteralTypeAnnotation", {
    enumerable: !0,
    get: function() {
      return _types2.NumericLiteral;
    }
  }), Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
    enumerable: !0,
    get: function() {
      return _types2.StringLiteral;
    }
  });
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0)), _modules = __webpack_require__(69), _types2 = __webpack_require__(70);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function enumExplicitType(context, name, hasExplicitType) {
    hasExplicitType && (context.space(), context.word("of"), context.space(), context.word(name)), 
    context.space();
  }
  function enumBody(context, node) {
    const {members: members} = node;
    context.token("{"), context.indent(), context.newline();
    for (const member of members) context.print(member, node), context.newline();
    context.dedent(), context.token("}");
  }
  function enumInitializedMember(context, node) {
    const {id: id, init: init} = node;
    context.print(id, node), context.space(), context.token("="), context.space(), context.print(init, node), 
    context.token(",");
  }
  function FlowExportDeclaration(node) {
    if (node.declaration) {
      const declar = node.declaration;
      this.print(declar, node), t.isStatement(declar) || this.semicolon();
    } else this.token("{"), node.specifiers.length && (this.space(), this.printList(node.specifiers, node), 
    this.space()), this.token("}"), node.source && (this.space(), this.word("from"), 
    this.space(), this.print(node.source, node)), this.semicolon();
  }
  function andSeparator() {
    this.space(), this.token("&"), this.space();
  }
  function orSeparator() {
    this.space(), this.token("|"), this.space();
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.File = function(node) {
    node.program && this.print(node.program.interpreter, node);
    this.print(node.program, node);
  }, exports.Program = function(node) {
    this.printInnerComments(node, !1), this.printSequence(node.directives, node), node.directives && node.directives.length && this.newline();
    this.printSequence(node.body, node);
  }, exports.BlockStatement = function(node) {
    var _node$directives;
    this.token("{"), this.printInnerComments(node);
    const hasDirectives = null == (_node$directives = node.directives) ? void 0 : _node$directives.length;
    node.body.length || hasDirectives ? (this.newline(), this.printSequence(node.directives, node, {
      indent: !0
    }), hasDirectives && this.newline(), this.printSequence(node.body, node, {
      indent: !0
    }), this.removeTrailingNewline(), this.source("end", node.loc), this.endsWith("\n") || this.newline(), 
    this.rightBrace()) : (this.source("end", node.loc), this.token("}"));
  }, exports.Noop = function() {}, exports.Directive = function(node) {
    this.print(node.value, node), this.semicolon();
  }, exports.DirectiveLiteral = function(node) {
    const raw = this.getPossibleRaw(node);
    if (null != raw) return void this.token(raw);
    const {value: value} = node;
    if (unescapedDoubleQuoteRE.test(value)) {
      if (unescapedSingleQuoteRE.test(value)) throw new Error("Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes.");
      this.token(`'${value}'`);
    } else this.token(`"${value}"`);
  }, exports.InterpreterDirective = function(node) {
    this.token(`#!${node.value}\n`);
  }, exports.Placeholder = function(node) {
    this.token("%%"), this.print(node.name), this.token("%%"), "Statement" === node.expectedNode && this.semicolon();
  };
  const unescapedSingleQuoteRE = /(?:^|[^\\])(?:\\\\)*'/, unescapedDoubleQuoteRE = /(?:^|[^\\])(?:\\\\)*"/;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function spaceSeparator() {
    this.space();
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.JSXAttribute = function(node) {
    this.print(node.name, node), node.value && (this.token("="), this.print(node.value, node));
  }, exports.JSXIdentifier = function(node) {
    this.word(node.name);
  }, exports.JSXNamespacedName = function(node) {
    this.print(node.namespace, node), this.token(":"), this.print(node.name, node);
  }, exports.JSXMemberExpression = function(node) {
    this.print(node.object, node), this.token("."), this.print(node.property, node);
  }, exports.JSXSpreadAttribute = function(node) {
    this.token("{"), this.token("..."), this.print(node.argument, node), this.token("}");
  }, exports.JSXExpressionContainer = function(node) {
    this.token("{"), this.print(node.expression, node), this.token("}");
  }, exports.JSXSpreadChild = function(node) {
    this.token("{"), this.token("..."), this.print(node.expression, node), this.token("}");
  }, exports.JSXText = function(node) {
    const raw = this.getPossibleRaw(node);
    null != raw ? this.token(raw) : this.token(node.value);
  }, exports.JSXElement = function(node) {
    const open = node.openingElement;
    if (this.print(open, node), open.selfClosing) return;
    this.indent();
    for (const child of node.children) this.print(child, node);
    this.dedent(), this.print(node.closingElement, node);
  }, exports.JSXOpeningElement = function(node) {
    this.token("<"), this.print(node.name, node), this.print(node.typeParameters, node), 
    node.attributes.length > 0 && (this.space(), this.printJoin(node.attributes, node, {
      separator: spaceSeparator
    }));
    node.selfClosing ? (this.space(), this.token("/>")) : this.token(">");
  }, exports.JSXClosingElement = function(node) {
    this.token("</"), this.print(node.name, node), this.token(">");
  }, exports.JSXEmptyExpression = function(node) {
    this.printInnerComments(node);
  }, exports.JSXFragment = function(node) {
    this.print(node.openingFragment, node), this.indent();
    for (const child of node.children) this.print(child, node);
    this.dedent(), this.print(node.closingFragment, node);
  }, exports.JSXOpeningFragment = function() {
    this.token("<"), this.token(">");
  }, exports.JSXClosingFragment = function() {
    this.token("</"), this.token(">");
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function tokenIfPlusMinus(self, tok) {
    !0 !== tok && self.token(tok);
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.TSTypeAnnotation = function(node) {
    this.token(":"), this.space(), node.optional && this.token("?");
    this.print(node.typeAnnotation, node);
  }, exports.TSTypeParameterDeclaration = exports.TSTypeParameterInstantiation = function(node) {
    this.token("<"), this.printList(node.params, node, {}), this.token(">");
  }, exports.TSTypeParameter = function(node) {
    this.word(node.name), node.constraint && (this.space(), this.word("extends"), this.space(), 
    this.print(node.constraint, node));
    node.default && (this.space(), this.token("="), this.space(), this.print(node.default, node));
  }, exports.TSParameterProperty = function(node) {
    node.accessibility && (this.word(node.accessibility), this.space());
    node.readonly && (this.word("readonly"), this.space());
    this._param(node.parameter);
  }, exports.TSDeclareFunction = function(node) {
    node.declare && (this.word("declare"), this.space());
    this._functionHead(node), this.token(";");
  }, exports.TSDeclareMethod = function(node) {
    this._classMethodHead(node), this.token(";");
  }, exports.TSQualifiedName = function(node) {
    this.print(node.left, node), this.token("."), this.print(node.right, node);
  }, exports.TSCallSignatureDeclaration = function(node) {
    this.tsPrintSignatureDeclarationBase(node), this.token(";");
  }, exports.TSConstructSignatureDeclaration = function(node) {
    this.word("new"), this.space(), this.tsPrintSignatureDeclarationBase(node), this.token(";");
  }, exports.TSPropertySignature = function(node) {
    const {readonly: readonly, initializer: initializer} = node;
    readonly && (this.word("readonly"), this.space());
    this.tsPrintPropertyOrMethodName(node), this.print(node.typeAnnotation, node), initializer && (this.space(), 
    this.token("="), this.space(), this.print(initializer, node));
    this.token(";");
  }, exports.tsPrintPropertyOrMethodName = function(node) {
    node.computed && this.token("[");
    this.print(node.key, node), node.computed && this.token("]");
    node.optional && this.token("?");
  }, exports.TSMethodSignature = function(node) {
    this.tsPrintPropertyOrMethodName(node), this.tsPrintSignatureDeclarationBase(node), 
    this.token(";");
  }, exports.TSIndexSignature = function(node) {
    const {readonly: readonly} = node;
    readonly && (this.word("readonly"), this.space());
    this.token("["), this._parameters(node.parameters, node), this.token("]"), this.print(node.typeAnnotation, node), 
    this.token(";");
  }, exports.TSAnyKeyword = function() {
    this.word("any");
  }, exports.TSBigIntKeyword = function() {
    this.word("bigint");
  }, exports.TSUnknownKeyword = function() {
    this.word("unknown");
  }, exports.TSNumberKeyword = function() {
    this.word("number");
  }, exports.TSObjectKeyword = function() {
    this.word("object");
  }, exports.TSBooleanKeyword = function() {
    this.word("boolean");
  }, exports.TSStringKeyword = function() {
    this.word("string");
  }, exports.TSSymbolKeyword = function() {
    this.word("symbol");
  }, exports.TSVoidKeyword = function() {
    this.word("void");
  }, exports.TSUndefinedKeyword = function() {
    this.word("undefined");
  }, exports.TSNullKeyword = function() {
    this.word("null");
  }, exports.TSNeverKeyword = function() {
    this.word("never");
  }, exports.TSThisType = function() {
    this.word("this");
  }, exports.TSFunctionType = function(node) {
    this.tsPrintFunctionOrConstructorType(node);
  }, exports.TSConstructorType = function(node) {
    this.word("new"), this.space(), this.tsPrintFunctionOrConstructorType(node);
  }, exports.tsPrintFunctionOrConstructorType = function(node) {
    const {typeParameters: typeParameters, parameters: parameters} = node;
    this.print(typeParameters, node), this.token("("), this._parameters(parameters, node), 
    this.token(")"), this.space(), this.token("=>"), this.space(), this.print(node.typeAnnotation.typeAnnotation, node);
  }, exports.TSTypeReference = function(node) {
    this.print(node.typeName, node), this.print(node.typeParameters, node);
  }, exports.TSTypePredicate = function(node) {
    node.asserts && (this.word("asserts"), this.space());
    this.print(node.parameterName), node.typeAnnotation && (this.space(), this.word("is"), 
    this.space(), this.print(node.typeAnnotation.typeAnnotation));
  }, exports.TSTypeQuery = function(node) {
    this.word("typeof"), this.space(), this.print(node.exprName);
  }, exports.TSTypeLiteral = function(node) {
    this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
  }, exports.tsPrintTypeLiteralOrInterfaceBody = function(members, node) {
    this.tsPrintBraced(members, node);
  }, exports.tsPrintBraced = function(members, node) {
    if (this.token("{"), members.length) {
      this.indent(), this.newline();
      for (const member of members) this.print(member, node), this.newline();
      this.dedent(), this.rightBrace();
    } else this.token("}");
  }, exports.TSArrayType = function(node) {
    this.print(node.elementType, node), this.token("[]");
  }, exports.TSTupleType = function(node) {
    this.token("["), this.printList(node.elementTypes, node), this.token("]");
  }, exports.TSOptionalType = function(node) {
    this.print(node.typeAnnotation, node), this.token("?");
  }, exports.TSRestType = function(node) {
    this.token("..."), this.print(node.typeAnnotation, node);
  }, exports.TSUnionType = function(node) {
    this.tsPrintUnionOrIntersectionType(node, "|");
  }, exports.TSIntersectionType = function(node) {
    this.tsPrintUnionOrIntersectionType(node, "&");
  }, exports.tsPrintUnionOrIntersectionType = function(node, sep) {
    this.printJoin(node.types, node, {
      separator() {
        this.space(), this.token(sep), this.space();
      }
    });
  }, exports.TSConditionalType = function(node) {
    this.print(node.checkType), this.space(), this.word("extends"), this.space(), this.print(node.extendsType), 
    this.space(), this.token("?"), this.space(), this.print(node.trueType), this.space(), 
    this.token(":"), this.space(), this.print(node.falseType);
  }, exports.TSInferType = function(node) {
    this.token("infer"), this.space(), this.print(node.typeParameter);
  }, exports.TSParenthesizedType = function(node) {
    this.token("("), this.print(node.typeAnnotation, node), this.token(")");
  }, exports.TSTypeOperator = function(node) {
    this.token(node.operator), this.space(), this.print(node.typeAnnotation, node);
  }, exports.TSIndexedAccessType = function(node) {
    this.print(node.objectType, node), this.token("["), this.print(node.indexType, node), 
    this.token("]");
  }, exports.TSMappedType = function(node) {
    const {readonly: readonly, typeParameter: typeParameter, optional: optional} = node;
    this.token("{"), this.space(), readonly && (tokenIfPlusMinus(this, readonly), this.word("readonly"), 
    this.space());
    this.token("["), this.word(typeParameter.name), this.space(), this.word("in"), this.space(), 
    this.print(typeParameter.constraint, typeParameter), this.token("]"), optional && (tokenIfPlusMinus(this, optional), 
    this.token("?"));
    this.token(":"), this.space(), this.print(node.typeAnnotation, node), this.space(), 
    this.token("}");
  }, exports.TSLiteralType = function(node) {
    this.print(node.literal, node);
  }, exports.TSExpressionWithTypeArguments = function(node) {
    this.print(node.expression, node), this.print(node.typeParameters, node);
  }, exports.TSInterfaceDeclaration = function(node) {
    const {declare: declare, id: id, typeParameters: typeParameters, extends: extendz, body: body} = node;
    declare && (this.word("declare"), this.space());
    this.word("interface"), this.space(), this.print(id, node), this.print(typeParameters, node), 
    extendz && (this.space(), this.word("extends"), this.space(), this.printList(extendz, node));
    this.space(), this.print(body, node);
  }, exports.TSInterfaceBody = function(node) {
    this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
  }, exports.TSTypeAliasDeclaration = function(node) {
    const {declare: declare, id: id, typeParameters: typeParameters, typeAnnotation: typeAnnotation} = node;
    declare && (this.word("declare"), this.space());
    this.word("type"), this.space(), this.print(id, node), this.print(typeParameters, node), 
    this.space(), this.token("="), this.space(), this.print(typeAnnotation, node), this.token(";");
  }, exports.TSAsExpression = function(node) {
    const {expression: expression, typeAnnotation: typeAnnotation} = node;
    this.print(expression, node), this.space(), this.word("as"), this.space(), this.print(typeAnnotation, node);
  }, exports.TSTypeAssertion = function(node) {
    const {typeAnnotation: typeAnnotation, expression: expression} = node;
    this.token("<"), this.print(typeAnnotation, node), this.token(">"), this.space(), 
    this.print(expression, node);
  }, exports.TSEnumDeclaration = function(node) {
    const {declare: declare, const: isConst, id: id, members: members} = node;
    declare && (this.word("declare"), this.space());
    isConst && (this.word("const"), this.space());
    this.word("enum"), this.space(), this.print(id, node), this.space(), this.tsPrintBraced(members, node);
  }, exports.TSEnumMember = function(node) {
    const {id: id, initializer: initializer} = node;
    this.print(id, node), initializer && (this.space(), this.token("="), this.space(), 
    this.print(initializer, node));
    this.token(",");
  }, exports.TSModuleDeclaration = function(node) {
    const {declare: declare, id: id} = node;
    declare && (this.word("declare"), this.space());
    node.global || (this.word("Identifier" === id.type ? "namespace" : "module"), this.space());
    if (this.print(id, node), !node.body) return void this.token(";");
    let body = node.body;
    for (;"TSModuleDeclaration" === body.type; ) this.token("."), this.print(body.id, body), 
    body = body.body;
    this.space(), this.print(body, node);
  }, exports.TSModuleBlock = function(node) {
    this.tsPrintBraced(node.body, node);
  }, exports.TSImportType = function(node) {
    const {argument: argument, qualifier: qualifier, typeParameters: typeParameters} = node;
    this.word("import"), this.token("("), this.print(argument, node), this.token(")"), 
    qualifier && (this.token("."), this.print(qualifier, node));
    typeParameters && this.print(typeParameters, node);
  }, exports.TSImportEqualsDeclaration = function(node) {
    const {isExport: isExport, id: id, moduleReference: moduleReference} = node;
    isExport && (this.word("export"), this.space());
    this.word("import"), this.space(), this.print(id, node), this.space(), this.token("="), 
    this.space(), this.print(moduleReference, node), this.token(";");
  }, exports.TSExternalModuleReference = function(node) {
    this.token("require("), this.print(node.expression, node), this.token(")");
  }, exports.TSNonNullExpression = function(node) {
    this.print(node.expression, node), this.token("!");
  }, exports.TSExportAssignment = function(node) {
    this.word("export"), this.space(), this.token("="), this.space(), this.print(node.expression, node), 
    this.token(";");
  }, exports.TSNamespaceExportDeclaration = function(node) {
    this.word("export"), this.space(), this.word("as"), this.space(), this.word("namespace"), 
    this.space(), this.print(node.id, node);
  }, exports.tsPrintSignatureDeclarationBase = function(node) {
    const {typeParameters: typeParameters, parameters: parameters} = node;
    this.print(typeParameters, node), this.token("("), this._parameters(parameters, node), 
    this.token(")"), this.print(node.typeAnnotation, node);
  }, exports.tsPrintClassMemberModifiers = function(node, isField) {
    isField && node.declare && (this.word("declare"), this.space());
    node.accessibility && (this.word(node.accessibility), this.space());
    node.static && (this.word("static"), this.space());
    node.abstract && (this.word("abstract"), this.space());
    isField && node.readonly && (this.word("readonly"), this.space());
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = (obj = __webpack_require__(10)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.maybeAsync = function(fn, message) {
    return (0, _gensync().default)({
      sync(...args) {
        const result = fn.apply(this, args);
        if (isThenable(result)) throw new Error(message);
        return result;
      },
      async(...args) {
        return Promise.resolve(fn.apply(this, args));
      }
    });
  }, exports.forwardAsync = function(action, cb) {
    const g = (0, _gensync().default)(action);
    return withKind(kind => {
      const adapted = g[kind];
      return cb(adapted);
    });
  }, exports.isThenable = isThenable, exports.waitFor = exports.onFirstPause = exports.isAsync = void 0;
  const id = x => x, runGenerator = (0, _gensync().default)((function*(item) {
    return yield* item;
  })), isAsync = (0, _gensync().default)({
    sync: () => !1,
    errback: cb => cb(null, !0)
  });
  exports.isAsync = isAsync;
  const withKind = (0, _gensync().default)({
    sync: cb => cb("sync"),
    async: cb => cb("async")
  });
  const onFirstPause = (0, _gensync().default)({
    name: "onFirstPause",
    arity: 2,
    sync: function(item) {
      return runGenerator.sync(item);
    },
    errback: function(item, firstPause, cb) {
      let completed = !1;
      runGenerator.errback(item, (err, value) => {
        completed = !0, cb(err, value);
      }), completed || firstPause();
    }
  });
  exports.onFirstPause = onFirstPause;
  const waitFor = (0, _gensync().default)({
    sync: id,
    async: id
  });
  function isThenable(val) {
    return !(!val || "object" != typeof val && "function" != typeof val || !val.then || "function" != typeof val.then);
  }
  exports.waitFor = waitFor;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function mergeDefaultFields(target, source) {
    for (const k of Object.keys(source)) {
      const val = source[k];
      void 0 !== val && (target[k] = val);
    }
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.mergeOptions = function(target, source) {
    for (const k of Object.keys(source)) if ("parserOpts" === k && source.parserOpts) {
      const parserOpts = source.parserOpts;
      mergeDefaultFields(target.parserOpts = target.parserOpts || {}, parserOpts);
    } else if ("generatorOpts" === k && source.generatorOpts) {
      const generatorOpts = source.generatorOpts;
      mergeDefaultFields(target.generatorOpts = target.generatorOpts || {}, generatorOpts);
    } else {
      const val = source[k];
      void 0 !== val && (target[k] = val);
    }
  }, exports.isIterableIterator = function(value) {
    return !!value && "function" == typeof value.next && "function" == typeof value[Symbol.iterator];
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _fs() {
    const data = _interopRequireDefault(__webpack_require__(51));
    return _fs = function() {
      return data;
    }, data;
  }
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.exists = exports.readFile = void 0;
  const readFile = (0, _gensync().default)({
    sync: _fs().default.readFileSync,
    errback: _fs().default.readFile
  });
  exports.readFile = readFile;
  const exists = (0, _gensync().default)({
    sync(path) {
      try {
        return _fs().default.accessSync(path), !0;
      } catch (_unused) {
        return !1;
      }
    },
    errback: (path, cb) => _fs().default.access(path, void 0, err => cb(null, !err))
  });
  exports.exists = exists;
}, function(module, exports, __webpack_require__) {
  exports.formatArgs = function(args) {
    if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), 
    !this.useColors) return;
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0, lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, match => {
      "%%" !== match && (index++, "%c" === match && (lastC = index));
    }), args.splice(lastC, 0, c);
  }, exports.save = function(namespaces) {
    try {
      namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
    } catch (error) {}
  }, exports.load = function() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch (error) {}
    !r && "undefined" != typeof process && "env" in process && (r = process.env.DEBUG);
    return r;
  }, exports.useColors = function() {
    if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
    if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
    return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, exports.storage = function() {
    try {
      return localStorage;
    } catch (error) {}
  }(), exports.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
  exports.log = console.debug || console.log || (() => {}), module.exports = __webpack_require__(71)(exports);
  const {formatters: formatters} = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
}, function(module, exports) {
  var s = 1e3, m = 6e4, h = 60 * m, d = 24 * h;
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= 1.5 * n;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if ("string" === type && val.length > 0) return function(str) {
      if ((str = String(str)).length > 100) return;
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) return;
      var n = parseFloat(match[1]);
      switch ((match[2] || "ms").toLowerCase()) {
       case "years":
       case "year":
       case "yrs":
       case "yr":
       case "y":
        return 315576e5 * n;

       case "weeks":
       case "week":
       case "w":
        return 6048e5 * n;

       case "days":
       case "day":
       case "d":
        return n * d;

       case "hours":
       case "hour":
       case "hrs":
       case "hr":
       case "h":
        return n * h;

       case "minutes":
       case "minute":
       case "mins":
       case "min":
       case "m":
        return n * m;

       case "seconds":
       case "second":
       case "secs":
       case "sec":
       case "s":
        return n * s;

       case "milliseconds":
       case "millisecond":
       case "msecs":
       case "msec":
       case "ms":
        return n;

       default:
        return;
      }
    }(val);
    if ("number" === type && isFinite(val)) return options.long ? function(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) return plural(ms, msAbs, d, "day");
      if (msAbs >= h) return plural(ms, msAbs, h, "hour");
      if (msAbs >= m) return plural(ms, msAbs, m, "minute");
      if (msAbs >= s) return plural(ms, msAbs, s, "second");
      return ms + " ms";
    }(val) : function(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) return Math.round(ms / d) + "d";
      if (msAbs >= h) return Math.round(ms / h) + "h";
      if (msAbs >= m) return Math.round(ms / m) + "m";
      if (msAbs >= s) return Math.round(ms / s) + "s";
      return ms + "ms";
    }(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
}, function(module, exports, __webpack_require__) {
  const tty = __webpack_require__(143), util = __webpack_require__(144);
  exports.init = function(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }, exports.log = function(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  }, exports.formatArgs = function(args) {
    const {namespace: name, useColors: useColors} = this;
    if (useColors) {
      const c = this.color, colorCode = "[3" + (c < 8 ? c : "8;5;" + c), prefix = `  ${colorCode};1m${name} [0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix), args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "[0m");
    } else args[0] = function() {
      if (exports.inspectOpts.hideDate) return "";
      return (new Date).toISOString() + " ";
    }() + name + " " + args[0];
  }, exports.save = function(namespaces) {
    namespaces ? process.env.DEBUG = namespaces : delete process.env.DEBUG;
  }, exports.load = function() {
    return process.env.DEBUG;
  }, exports.useColors = function() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }, exports.colors = [ 6, 2, 3, 4, 5, 1 ];
  try {
    const supportsColor = __webpack_require__(145);
    supportsColor && (supportsColor.stderr || supportsColor).level >= 2 && (exports.colors = [ 20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221 ]);
  } catch (error) {}
  exports.inspectOpts = Object.keys(process.env).filter(key => /^debug_/i.test(key)).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => k.toUpperCase());
    let val = process.env[key];
    return val = !!/^(yes|on|true|enabled)$/i.test(val) || !/^(no|off|false|disabled)$/i.test(val) && ("null" === val ? null : Number(val)), 
    obj[prop] = val, obj;
  }, {}), module.exports = __webpack_require__(71)(exports);
  const {formatters: formatters} = module.exports;
  formatters.o = function(v) {
    return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, " ");
  }, formatters.O = function(v) {
    return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts);
  };
}, function(module, exports) {
  module.exports = require("tty");
}, function(module, exports) {
  module.exports = require("util");
}, function(module, exports) {
  module.exports = require("supports-color");
}, function(module, exports) {
  module.exports = require;
}, function(module, exports, __webpack_require__) {
  var core = __webpack_require__(227);
  module.exports = function(x) {
    return Object.prototype.hasOwnProperty.call(core, x);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = class {
    constructor(plugin, options, key) {
      this.key = plugin.name || key, this.manipulateOptions = plugin.manipulateOptions, 
      this.post = plugin.post, this.pre = plugin.pre, this.visitor = plugin.visitor || {}, 
      this.parserOverride = plugin.parserOverride, this.generatorOverride = plugin.generatorOverride, 
      this.options = options;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.validate = function(type, opts) {
    return validateNested({
      type: "root",
      source: type
    }, opts);
  }, exports.checkNoUnwrappedItemOptionPairs = function(lastItem, thisItem, type, index, e) {
    lastItem.file && void 0 === lastItem.options && "object" == typeof thisItem.value && (e.message += `\n- Maybe you meant to use\n"${type}": [\n  ["${lastItem.file.request}", ${JSON.stringify(thisItem.value, void 0, 2)}]\n]\nTo be a valid ${type}, its name and options should be wrapped in a pair of brackets`);
  };
  _interopRequireDefault(__webpack_require__(148));
  var _removed = _interopRequireDefault(__webpack_require__(296)), _optionAssertions = __webpack_require__(231);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const ROOT_VALIDATORS = {
    cwd: _optionAssertions.assertString,
    root: _optionAssertions.assertString,
    rootMode: _optionAssertions.assertRootMode,
    configFile: _optionAssertions.assertConfigFileSearch,
    caller: _optionAssertions.assertCallerMetadata,
    filename: _optionAssertions.assertString,
    filenameRelative: _optionAssertions.assertString,
    code: _optionAssertions.assertBoolean,
    ast: _optionAssertions.assertBoolean,
    envName: _optionAssertions.assertString
  }, BABELRC_VALIDATORS = {
    babelrc: _optionAssertions.assertBoolean,
    babelrcRoots: _optionAssertions.assertBabelrcSearch
  }, NONPRESET_VALIDATORS = {
    extends: _optionAssertions.assertString,
    ignore: _optionAssertions.assertIgnoreList,
    only: _optionAssertions.assertIgnoreList
  }, COMMON_VALIDATORS = {
    inputSourceMap: _optionAssertions.assertInputSourceMap,
    presets: _optionAssertions.assertPluginList,
    plugins: _optionAssertions.assertPluginList,
    passPerPreset: _optionAssertions.assertBoolean,
    env: function(loc, value) {
      if ("env" === loc.parent.type) throw new Error((0, _optionAssertions.msg)(loc) + " is not allowed inside of another .env block");
      const parent = loc.parent, obj = (0, _optionAssertions.assertObject)(loc, value);
      if (obj) for (const envName of Object.keys(obj)) {
        const env = (0, _optionAssertions.assertObject)((0, _optionAssertions.access)(loc, envName), obj[envName]);
        if (!env) continue;
        validateNested({
          type: "env",
          name: envName,
          parent: parent
        }, env);
      }
      return obj;
    },
    overrides: function(loc, value) {
      if ("env" === loc.parent.type) throw new Error((0, _optionAssertions.msg)(loc) + " is not allowed inside an .env block");
      if ("overrides" === loc.parent.type) throw new Error((0, _optionAssertions.msg)(loc) + " is not allowed inside an .overrides block");
      const parent = loc.parent, arr = (0, _optionAssertions.assertArray)(loc, value);
      if (arr) for (const [index, item] of arr.entries()) {
        const objLoc = (0, _optionAssertions.access)(loc, index), env = (0, _optionAssertions.assertObject)(objLoc, item);
        if (!env) throw new Error((0, _optionAssertions.msg)(objLoc) + " must be an object");
        validateNested({
          type: "overrides",
          index: index,
          parent: parent
        }, env);
      }
      return arr;
    },
    test: _optionAssertions.assertConfigApplicableTest,
    include: _optionAssertions.assertConfigApplicableTest,
    exclude: _optionAssertions.assertConfigApplicableTest,
    retainLines: _optionAssertions.assertBoolean,
    comments: _optionAssertions.assertBoolean,
    shouldPrintComment: _optionAssertions.assertFunction,
    compact: _optionAssertions.assertCompact,
    minified: _optionAssertions.assertBoolean,
    auxiliaryCommentBefore: _optionAssertions.assertString,
    auxiliaryCommentAfter: _optionAssertions.assertString,
    sourceType: _optionAssertions.assertSourceType,
    wrapPluginVisitorMethod: _optionAssertions.assertFunction,
    highlightCode: _optionAssertions.assertBoolean,
    sourceMaps: _optionAssertions.assertSourceMaps,
    sourceMap: _optionAssertions.assertSourceMaps,
    sourceFileName: _optionAssertions.assertString,
    sourceRoot: _optionAssertions.assertString,
    getModuleId: _optionAssertions.assertFunction,
    moduleRoot: _optionAssertions.assertString,
    moduleIds: _optionAssertions.assertBoolean,
    moduleId: _optionAssertions.assertString,
    parserOpts: _optionAssertions.assertObject,
    generatorOpts: _optionAssertions.assertObject
  };
  function validateNested(loc, opts) {
    const type = function getSource(loc) {
      return "root" === loc.type ? loc.source : getSource(loc.parent);
    }(loc);
    return function(opts) {
      if (has(opts, "sourceMap") && has(opts, "sourceMaps")) throw new Error(".sourceMap is an alias for .sourceMaps, cannot use both");
    }(opts), Object.keys(opts).forEach(key => {
      const optLoc = {
        type: "option",
        name: key,
        parent: loc
      };
      if ("preset" === type && NONPRESET_VALIDATORS[key]) throw new Error((0, _optionAssertions.msg)(optLoc) + " is not allowed in preset options");
      if ("arguments" !== type && ROOT_VALIDATORS[key]) throw new Error((0, _optionAssertions.msg)(optLoc) + " is only allowed in root programmatic options");
      if ("arguments" !== type && "configfile" !== type && BABELRC_VALIDATORS[key]) {
        if ("babelrcfile" === type || "extendsfile" === type) throw new Error((0, _optionAssertions.msg)(optLoc) + ' is not allowed in .babelrc or "extends"ed files, only in root programmatic options, or babel.config.js/config file options');
        throw new Error((0, _optionAssertions.msg)(optLoc) + " is only allowed in root programmatic options, or babel.config.js/config file options");
      }
      (COMMON_VALIDATORS[key] || NONPRESET_VALIDATORS[key] || BABELRC_VALIDATORS[key] || ROOT_VALIDATORS[key] || throwUnknownError)(optLoc, opts[key]);
    }), opts;
  }
  function throwUnknownError(loc) {
    const key = loc.name;
    if (_removed.default[key]) {
      const {message: message, version: version = 5} = _removed.default[key];
      throw new Error(`Using removed Babel ${version} option: ${(0, _optionAssertions.msg)(loc)} - ${message}`);
    }
    {
      const unknownOptErr = new Error(`Unknown option: ${(0, _optionAssertions.msg)(loc)}. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.`);
      throw unknownOptErr.code = "BABEL_UNKNOWN_OPTION", unknownOptErr;
    }
  }
  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _traverse() {
    const data = _interopRequireDefault(__webpack_require__(46));
    return _traverse = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.run = function*(config, code, ast) {
    const file = yield* (0, _normalizeFile.default)(config.passes, (0, _normalizeOpts.default)(config), code, ast), opts = file.opts;
    try {
      yield* function*(file, pluginPasses) {
        for (const pluginPairs of pluginPasses) {
          const passPairs = [], passes = [], visitors = [];
          for (const plugin of pluginPairs.concat([ (0, _blockHoistPlugin.default)() ])) {
            const pass = new _pluginPass.default(file, plugin.key, plugin.options);
            passPairs.push([ plugin, pass ]), passes.push(pass), visitors.push(plugin.visitor);
          }
          for (const [plugin, pass] of passPairs) {
            const fn = plugin.pre;
            if (fn) {
              const result = fn.call(pass, file);
              if (yield* [], isThenable(result)) throw new Error("You appear to be using an plugin with an async .pre, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
            }
          }
          const visitor = _traverse().default.visitors.merge(visitors, passes, file.opts.wrapPluginVisitorMethod);
          (0, _traverse().default)(file.ast, visitor, file.scope);
          for (const [plugin, pass] of passPairs) {
            const fn = plugin.post;
            if (fn) {
              const result = fn.call(pass, file);
              if (yield* [], isThenable(result)) throw new Error("You appear to be using an plugin with an async .post, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
            }
          }
        }
      }(file, config.passes);
    } catch (e) {
      var _opts$filename;
      throw e.message = `${null != (_opts$filename = opts.filename) ? _opts$filename : "unknown"}: ${e.message}`, 
      e.code || (e.code = "BABEL_TRANSFORM_ERROR"), e;
    }
    let outputCode, outputMap;
    try {
      !1 !== opts.code && ({outputCode: outputCode, outputMap: outputMap} = (0, _generate.default)(config.passes, file));
    } catch (e) {
      var _opts$filename2;
      throw e.message = `${null != (_opts$filename2 = opts.filename) ? _opts$filename2 : "unknown"}: ${e.message}`, 
      e.code || (e.code = "BABEL_GENERATE_ERROR"), e;
    }
    return {
      metadata: file.metadata,
      options: opts,
      ast: !0 === opts.ast ? file.ast : null,
      code: void 0 === outputCode ? null : outputCode,
      map: void 0 === outputMap ? null : outputMap,
      sourceType: file.ast.program.sourceType
    };
  };
  var _pluginPass = _interopRequireDefault(__webpack_require__(299)), _blockHoistPlugin = _interopRequireDefault(__webpack_require__(300)), _normalizeOpts = _interopRequireDefault(__webpack_require__(238)), _normalizeFile = _interopRequireDefault(__webpack_require__(339)), _generate = _interopRequireDefault(__webpack_require__(344));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function isThenable(val) {
    return !(!val || "object" != typeof val && "function" != typeof val || !val.then || "function" != typeof val.then);
  }
}, function(module, exports, __webpack_require__) {
  var castPath = __webpack_require__(233), toKey = __webpack_require__(99);
  module.exports = function(object, path) {
    for (var index = 0, length = (path = castPath(path, object)).length; null != object && index < length; ) object = object[toKey(path[index++])];
    return index && index == length ? object : void 0;
  };
}, function(module, exports, __webpack_require__) {
  var isArray = __webpack_require__(5), isSymbol = __webpack_require__(64), reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  module.exports = function(value, object) {
    if (isArray(value)) return !1;
    var type = typeof value;
    return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object));
  };
}, function(module, exports, __webpack_require__) {
  var Hash = __webpack_require__(154), ListCache = __webpack_require__(21), Map = __webpack_require__(39);
  module.exports = function() {
    this.size = 0, this.__data__ = {
      hash: new Hash,
      map: new (Map || ListCache),
      string: new Hash
    };
  };
}, function(module, exports, __webpack_require__) {
  var hashClear = __webpack_require__(155), hashDelete = __webpack_require__(156), hashGet = __webpack_require__(157), hashHas = __webpack_require__(158), hashSet = __webpack_require__(159);
  function Hash(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, 
  Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, module.exports = Hash;
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20);
  module.exports = function() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
  };
}, function(module, exports) {
  module.exports = function(key) {
    var result = this.has(key) && delete this.__data__[key];
    return this.size -= result ? 1 : 0, result;
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return "__lodash_hash_undefined__" === result ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(key) {
    var data = this.__data__;
    return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key);
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20);
  module.exports = function(key, value) {
    var data = this.__data__;
    return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && void 0 === value ? "__lodash_hash_undefined__" : value, 
    this;
  };
}, function(module, exports) {
  module.exports = function() {
    this.__data__ = [], this.size = 0;
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22), splice = Array.prototype.splice;
  module.exports = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return !(index < 0) && (index == data.length - 1 ? data.pop() : splice.call(data, index, 1), 
    --this.size, !0);
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22);
  module.exports = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22);
  module.exports = function(key) {
    return assocIndexOf(this.__data__, key) > -1;
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22);
  module.exports = function(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? (++this.size, data.push([ key, value ])) : data[index][1] = value, 
    this;
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key) {
    var result = getMapData(this, key).delete(key);
    return this.size -= result ? 1 : 0, result;
  };
}, function(module, exports) {
  module.exports = function(value) {
    var type = typeof value;
    return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value;
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key) {
    return getMapData(this, key).get(key);
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key) {
    return getMapData(this, key).has(key);
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key, value) {
    var data = getMapData(this, key), size = data.size;
    return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
  };
}, function(module, exports, __webpack_require__) {
  var ListCache = __webpack_require__(21);
  module.exports = function() {
    this.__data__ = new ListCache, this.size = 0;
  };
}, function(module, exports) {
  module.exports = function(key) {
    var data = this.__data__, result = data.delete(key);
    return this.size = data.size, result;
  };
}, function(module, exports) {
  module.exports = function(key) {
    return this.__data__.get(key);
  };
}, function(module, exports) {
  module.exports = function(key) {
    return this.__data__.has(key);
  };
}, function(module, exports, __webpack_require__) {
  var ListCache = __webpack_require__(21), Map = __webpack_require__(39), MapCache = __webpack_require__(73);
  module.exports = function(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || pairs.length < 199) return pairs.push([ key, value ]), this.size = ++data.size, 
      this;
      data = this.__data__ = new MapCache(pairs);
    }
    return data.set(key, value), this.size = data.size, this;
  };
}, function(module, exports) {
  module.exports = function(array, predicate) {
    for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
      var value = array[index];
      predicate(value, index, array) && (result[resIndex++] = value);
    }
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var isPrototype = __webpack_require__(25), nativeKeys = __webpack_require__(177), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object) {
    if (!isPrototype(object)) return nativeKeys(object);
    var result = [];
    for (var key in Object(object)) hasOwnProperty.call(object, key) && "constructor" != key && result.push(key);
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var nativeKeys = __webpack_require__(84)(Object.keys, Object);
  module.exports = nativeKeys;
}, function(module, exports, __webpack_require__) {
  var DataView = __webpack_require__(6)(__webpack_require__(1), "DataView");
  module.exports = DataView;
}, function(module, exports, __webpack_require__) {
  var Promise = __webpack_require__(6)(__webpack_require__(1), "Promise");
  module.exports = Promise;
}, function(module, exports, __webpack_require__) {
  var Set = __webpack_require__(6)(__webpack_require__(1), "Set");
  module.exports = Set;
}, function(module, exports, __webpack_require__) {
  var WeakMap = __webpack_require__(6)(__webpack_require__(1), "WeakMap");
  module.exports = WeakMap;
}, function(module, exports, __webpack_require__) {
  var identity = __webpack_require__(42), overRest = __webpack_require__(183), setToString = __webpack_require__(185);
  module.exports = function(func, start) {
    return setToString(overRest(func, start, identity), func + "");
  };
}, function(module, exports, __webpack_require__) {
  var apply = __webpack_require__(184), nativeMax = Math.max;
  module.exports = function(func, start, transform) {
    return start = nativeMax(void 0 === start ? func.length - 1 : start, 0), function() {
      for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length; ) array[index] = args[start + index];
      index = -1;
      for (var otherArgs = Array(start + 1); ++index < start; ) otherArgs[index] = args[index];
      return otherArgs[start] = transform(array), apply(func, this, otherArgs);
    };
  };
}, function(module, exports) {
  module.exports = function(func, thisArg, args) {
    switch (args.length) {
     case 0:
      return func.call(thisArg);

     case 1:
      return func.call(thisArg, args[0]);

     case 2:
      return func.call(thisArg, args[0], args[1]);

     case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  };
}, function(module, exports, __webpack_require__) {
  var baseSetToString = __webpack_require__(186), setToString = __webpack_require__(188)(baseSetToString);
  module.exports = setToString;
}, function(module, exports, __webpack_require__) {
  var constant = __webpack_require__(187), defineProperty = __webpack_require__(56), identity = __webpack_require__(42), baseSetToString = defineProperty ? function(func, string) {
    return defineProperty(func, "toString", {
      configurable: !0,
      enumerable: !1,
      value: constant(string),
      writable: !0
    });
  } : identity;
  module.exports = baseSetToString;
}, function(module, exports) {
  module.exports = function(value) {
    return function() {
      return value;
    };
  };
}, function(module, exports) {
  var nativeNow = Date.now;
  module.exports = function(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = 16 - (stamp - lastCalled);
      if (lastCalled = stamp, remaining > 0) {
        if (++count >= 800) return arguments[0];
      } else count = 0;
      return func.apply(void 0, arguments);
    };
  };
}, function(module, exports, __webpack_require__) {
  var Stack = __webpack_require__(78), arrayEach = __webpack_require__(190), assignValue = __webpack_require__(85), baseAssign = __webpack_require__(191), baseAssignIn = __webpack_require__(192), cloneBuffer = __webpack_require__(193), copyArray = __webpack_require__(194), copySymbols = __webpack_require__(195), copySymbolsIn = __webpack_require__(196), getAllKeys = __webpack_require__(101), getAllKeysIn = __webpack_require__(197), getTag = __webpack_require__(33), initCloneArray = __webpack_require__(198), initCloneByTag = __webpack_require__(199), initCloneObject = __webpack_require__(204), isArray = __webpack_require__(5), isBuffer = __webpack_require__(32), isMap = __webpack_require__(206), isObject = __webpack_require__(2), isSet = __webpack_require__(208), keys = __webpack_require__(24), keysIn = __webpack_require__(27), cloneableTags = {};
  cloneableTags["[object Arguments]"] = cloneableTags["[object Array]"] = cloneableTags["[object ArrayBuffer]"] = cloneableTags["[object DataView]"] = cloneableTags["[object Boolean]"] = cloneableTags["[object Date]"] = cloneableTags["[object Float32Array]"] = cloneableTags["[object Float64Array]"] = cloneableTags["[object Int8Array]"] = cloneableTags["[object Int16Array]"] = cloneableTags["[object Int32Array]"] = cloneableTags["[object Map]"] = cloneableTags["[object Number]"] = cloneableTags["[object Object]"] = cloneableTags["[object RegExp]"] = cloneableTags["[object Set]"] = cloneableTags["[object String]"] = cloneableTags["[object Symbol]"] = cloneableTags["[object Uint8Array]"] = cloneableTags["[object Uint8ClampedArray]"] = cloneableTags["[object Uint16Array]"] = cloneableTags["[object Uint32Array]"] = !0, 
  cloneableTags["[object Error]"] = cloneableTags["[object Function]"] = cloneableTags["[object WeakMap]"] = !1, 
  module.exports = function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = 1 & bitmask, isFlat = 2 & bitmask, isFull = 4 & bitmask;
    if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), 
    void 0 !== result) return result;
    if (!isObject(value)) return value;
    var isArr = isArray(value);
    if (isArr) {
      if (result = initCloneArray(value), !isDeep) return copyArray(value, result);
    } else {
      var tag = getTag(value), isFunc = "[object Function]" == tag || "[object GeneratorFunction]" == tag;
      if (isBuffer(value)) return cloneBuffer(value, isDeep);
      if ("[object Object]" == tag || "[object Arguments]" == tag || isFunc && !object) {
        if (result = isFlat || isFunc ? {} : initCloneObject(value), !isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      } else {
        if (!cloneableTags[tag]) return object ? value : {};
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack);
    var stacked = stack.get(value);
    if (stacked) return stacked;
    stack.set(value, result), isSet(value) ? value.forEach((function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    })) : isMap(value) && value.forEach((function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    }));
    var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
    return arrayEach(props || value, (function(subValue, key) {
      props && (subValue = value[key = subValue]), assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    })), result;
  };
}, function(module, exports) {
  module.exports = function(array, iteratee) {
    for (var index = -1, length = null == array ? 0 : array.length; ++index < length && !1 !== iteratee(array[index], index, array); ) ;
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), keys = __webpack_require__(24);
  module.exports = function(object, source) {
    return object && copyObject(source, keys(source), object);
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), keysIn = __webpack_require__(27);
  module.exports = function(object, source) {
    return object && copyObject(source, keysIn(source), object);
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var root = __webpack_require__(1), freeExports = exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    module.exports = function(buffer, isDeep) {
      if (isDeep) return buffer.slice();
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      return buffer.copy(result), result;
    };
  }).call(this, __webpack_require__(17)(module));
}, function(module, exports) {
  module.exports = function(source, array) {
    var index = -1, length = source.length;
    for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), getSymbols = __webpack_require__(40);
  module.exports = function(source, object) {
    return copyObject(source, getSymbols(source), object);
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), getSymbolsIn = __webpack_require__(89);
  module.exports = function(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
  };
}, function(module, exports, __webpack_require__) {
  var baseGetAllKeys = __webpack_require__(79), getSymbolsIn = __webpack_require__(89), keysIn = __webpack_require__(27);
  module.exports = function(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  };
}, function(module, exports) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(array) {
    var length = array.length, result = new array.constructor(length);
    return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, 
    result.input = array.input), result;
  };
}, function(module, exports, __webpack_require__) {
  var cloneArrayBuffer = __webpack_require__(43), cloneDataView = __webpack_require__(200), cloneRegExp = __webpack_require__(201), cloneSymbol = __webpack_require__(202), cloneTypedArray = __webpack_require__(203);
  module.exports = function(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
     case "[object ArrayBuffer]":
      return cloneArrayBuffer(object);

     case "[object Boolean]":
     case "[object Date]":
      return new Ctor(+object);

     case "[object DataView]":
      return cloneDataView(object, isDeep);

     case "[object Float32Array]":
     case "[object Float64Array]":
     case "[object Int8Array]":
     case "[object Int16Array]":
     case "[object Int32Array]":
     case "[object Uint8Array]":
     case "[object Uint8ClampedArray]":
     case "[object Uint16Array]":
     case "[object Uint32Array]":
      return cloneTypedArray(object, isDeep);

     case "[object Map]":
      return new Ctor;

     case "[object Number]":
     case "[object String]":
      return new Ctor(object);

     case "[object RegExp]":
      return cloneRegExp(object);

     case "[object Set]":
      return new Ctor;

     case "[object Symbol]":
      return cloneSymbol(object);
    }
  };
}, function(module, exports, __webpack_require__) {
  var cloneArrayBuffer = __webpack_require__(43);
  module.exports = function(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  };
}, function(module, exports) {
  var reFlags = /\w*$/;
  module.exports = function(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    return result.lastIndex = regexp.lastIndex, result;
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  module.exports = function(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  };
}, function(module, exports, __webpack_require__) {
  var cloneArrayBuffer = __webpack_require__(43);
  module.exports = function(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  };
}, function(module, exports, __webpack_require__) {
  var baseCreate = __webpack_require__(205), getPrototype = __webpack_require__(57), isPrototype = __webpack_require__(25);
  module.exports = function(object) {
    return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object));
  };
}, function(module, exports, __webpack_require__) {
  var isObject = __webpack_require__(2), objectCreate = Object.create, baseCreate = function() {
    function object() {}
    return function(proto) {
      if (!isObject(proto)) return {};
      if (objectCreate) return objectCreate(proto);
      object.prototype = proto;
      var result = new object;
      return object.prototype = void 0, result;
    };
  }();
  module.exports = baseCreate;
}, function(module, exports, __webpack_require__) {
  var baseIsMap = __webpack_require__(207), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsMap = nodeUtil && nodeUtil.isMap, isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
  module.exports = isMap;
}, function(module, exports, __webpack_require__) {
  var getTag = __webpack_require__(33), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object Map]" == getTag(value);
  };
}, function(module, exports, __webpack_require__) {
  var baseIsSet = __webpack_require__(209), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsSet = nodeUtil && nodeUtil.isSet, isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
  module.exports = isSet;
}, function(module, exports, __webpack_require__) {
  var getTag = __webpack_require__(33), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object Set]" == getTag(value);
  };
}, , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.get = get, exports.minVersion = function(name) {
    return loadHelper(name).minVersion();
  }, exports.getDependencies = function(name) {
    return Array.from(loadHelper(name).dependencies.values());
  }, exports.ensure = function(name, newFileClass) {
    fileClass || (fileClass = newFileClass);
    loadHelper(name);
  }, exports.default = exports.list = void 0;
  var _traverse = _interopRequireDefault(__webpack_require__(46)), t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0)), _helpers = _interopRequireDefault(__webpack_require__(261));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function makePath(path) {
    const parts = [];
    for (;path.parentPath; path = path.parentPath) parts.push(path.key), path.inList && parts.push(path.listKey);
    return parts.reverse().join(".");
  }
  let fileClass = void 0;
  const helperData = Object.create(null);
  function loadHelper(name) {
    if (!helperData[name]) {
      const helper = _helpers.default[name];
      if (!helper) throw Object.assign(new ReferenceError("Unknown helper " + name), {
        code: "BABEL_HELPER_UNKNOWN",
        helper: name
      });
      const fn = () => {
        const file = {
          ast: t.file(helper.ast())
        };
        return fileClass ? new fileClass({
          filename: "babel-helper://" + name
        }, file) : file;
      }, metadata = function(file) {
        const globals = new Set, localBindingNames = new Set, dependencies = new Map;
        let exportName, exportPath;
        const exportBindingAssignments = [], importPaths = [], importBindingsReferences = [], dependencyVisitor = {
          ImportDeclaration(child) {
            const name = child.node.source.value;
            if (!_helpers.default[name]) throw child.buildCodeFrameError("Unknown helper " + name);
            if (1 !== child.get("specifiers").length || !child.get("specifiers.0").isImportDefaultSpecifier()) throw child.buildCodeFrameError("Helpers can only import a default value");
            const bindingIdentifier = child.node.specifiers[0].local;
            dependencies.set(bindingIdentifier, name), importPaths.push(makePath(child));
          },
          ExportDefaultDeclaration(child) {
            const decl = child.get("declaration");
            if (decl.isFunctionDeclaration()) {
              if (!decl.node.id) throw decl.buildCodeFrameError("Helpers should give names to their exported func declaration");
              exportName = decl.node.id.name;
            }
            exportPath = makePath(child);
          },
          ExportAllDeclaration(child) {
            throw child.buildCodeFrameError("Helpers can only export default");
          },
          ExportNamedDeclaration(child) {
            throw child.buildCodeFrameError("Helpers can only export default");
          },
          Statement(child) {
            child.isModuleDeclaration() || child.skip();
          }
        }, referenceVisitor = {
          Program(path) {
            const bindings = path.scope.getAllBindings();
            Object.keys(bindings).forEach(name => {
              name !== exportName && (dependencies.has(bindings[name].identifier) || localBindingNames.add(name));
            });
          },
          ReferencedIdentifier(child) {
            const name = child.node.name, binding = child.scope.getBinding(name, !0);
            binding ? dependencies.has(binding.identifier) && importBindingsReferences.push(makePath(child)) : globals.add(name);
          },
          AssignmentExpression(child) {
            const left = child.get("left");
            if (!(exportName in left.getBindingIdentifiers())) return;
            if (!left.isIdentifier()) throw left.buildCodeFrameError("Only simple assignments to exports are allowed in helpers");
            const binding = child.scope.getBinding(exportName);
            (null == binding ? void 0 : binding.scope.path.isProgram()) && exportBindingAssignments.push(makePath(child));
          }
        };
        if ((0, _traverse.default)(file.ast, dependencyVisitor, file.scope), (0, _traverse.default)(file.ast, referenceVisitor, file.scope), 
        !exportPath) throw new Error("Helpers must default-export something.");
        return exportBindingAssignments.reverse(), {
          globals: Array.from(globals),
          localBindingNames: Array.from(localBindingNames),
          dependencies: dependencies,
          exportBindingAssignments: exportBindingAssignments,
          exportPath: exportPath,
          exportName: exportName,
          importBindingsReferences: importBindingsReferences,
          importPaths: importPaths
        };
      }(fn());
      helperData[name] = {
        build(getDependency, id, localBindings) {
          const file = fn();
          return function(file, metadata, id, localBindings, getDependency) {
            if (localBindings && !id) throw new Error("Unexpected local bindings for module-based helpers.");
            if (!id) return;
            const {localBindingNames: localBindingNames, dependencies: dependencies, exportBindingAssignments: exportBindingAssignments, exportPath: exportPath, exportName: exportName, importBindingsReferences: importBindingsReferences, importPaths: importPaths} = metadata, dependenciesRefs = {};
            dependencies.forEach((name, id) => {
              dependenciesRefs[id.name] = "function" == typeof getDependency && getDependency(name) || id;
            });
            const toRename = {}, bindings = new Set(localBindings || []);
            localBindingNames.forEach(name => {
              let newName = name;
              for (;bindings.has(newName); ) newName = "_" + newName;
              newName !== name && (toRename[name] = newName);
            }), "Identifier" === id.type && exportName !== id.name && (toRename[exportName] = id.name);
            const visitor = {
              Program(path) {
                const exp = path.get(exportPath), imps = importPaths.map(p => path.get(p)), impsBindingRefs = importBindingsReferences.map(p => path.get(p)), decl = exp.get("declaration");
                if ("Identifier" === id.type) decl.isFunctionDeclaration() ? exp.replaceWith(decl) : exp.replaceWith(t.variableDeclaration("var", [ t.variableDeclarator(id, decl.node) ])); else {
                  if ("MemberExpression" !== id.type) throw new Error("Unexpected helper format.");
                  decl.isFunctionDeclaration() ? (exportBindingAssignments.forEach(assignPath => {
                    const assign = path.get(assignPath);
                    assign.replaceWith(t.assignmentExpression("=", id, assign.node));
                  }), exp.replaceWith(decl), path.pushContainer("body", t.expressionStatement(t.assignmentExpression("=", id, t.identifier(exportName))))) : exp.replaceWith(t.expressionStatement(t.assignmentExpression("=", id, decl.node)));
                }
                Object.keys(toRename).forEach(name => {
                  path.scope.rename(name, toRename[name]);
                });
                for (const path of imps) path.remove();
                for (const path of impsBindingRefs) {
                  const node = t.cloneNode(dependenciesRefs[path.node.name]);
                  path.replaceWith(node);
                }
                path.stop();
              }
            };
            (0, _traverse.default)(file.ast, visitor, file.scope);
          }(file, metadata, id, localBindings, getDependency), {
            nodes: file.ast.program.body,
            globals: metadata.globals
          };
        },
        minVersion: () => helper.minVersion,
        dependencies: metadata.dependencies
      };
    }
    return helperData[name];
  }
  function get(name, getDependency, id, localBindings) {
    return loadHelper(name).build(getDependency, id, localBindings);
  }
  const list = Object.keys(_helpers.default).map(name => name.replace(/^_/, "")).filter(name => "__esModule" !== name);
  exports.list = list;
  var _default = get;
  exports.default = _default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(path) {
    const {sourceType: sourceType} = path.node;
    if ("module" !== sourceType && "script" !== sourceType) throw path.buildCodeFrameError(`Unknown sourceType "${sourceType}", cannot transform.`);
    return "module" === path.node.sourceType;
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.makeStaticFileCache = function(fn) {
    return (0, _caching.makeStrongCache)((function*(filepath, cache) {
      return null === cache.invalidate(() => function(filepath) {
        try {
          return +_fs2().default.statSync(filepath).mtime;
        } catch (e) {
          if ("ENOENT" !== e.code && "ENOTDIR" !== e.code) throw e;
        }
        return null;
      }(filepath)) ? (cache.forever(), null) : fn(filepath, yield* fs.readFile(filepath, "utf8"));
    }));
  };
  var _caching = __webpack_require__(50), fs = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(139));
  function _fs2() {
    const data = (obj = __webpack_require__(51)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _fs2 = function() {
      return data;
    }, data;
  }
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _semver() {
    const data = (obj = __webpack_require__(217)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _semver = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(cache) {
    return {
      version: _.version,
      cache: cache.simple(),
      env: value => cache.using(data => void 0 === value ? data.envName : "function" == typeof value ? (0, 
      _caching.assertSimpleType)(value(data.envName)) : (Array.isArray(value) || (value = [ value ]), 
      value.some(entry => {
        if ("string" != typeof entry) throw new Error("Unexpected non-string value");
        return entry === data.envName;
      }))),
      async: () => !1,
      caller: cb => cache.using(data => (0, _caching.assertSimpleType)(cb(data.caller))),
      assertVersion: assertVersion
    };
  };
  var _ = __webpack_require__(105), _caching = __webpack_require__(50);
  function assertVersion(range) {
    if ("number" == typeof range) {
      if (!Number.isInteger(range)) throw new Error("Expected string or integer value.");
      range = `^${range}.0.0-0`;
    }
    if ("string" != typeof range) throw new Error("Expected string or integer value.");
    if (_semver().default.satisfies(_.version, range)) return;
    const limit = Error.stackTraceLimit;
    "number" == typeof limit && limit < 25 && (Error.stackTraceLimit = 25);
    const err = new Error(`Requires Babel "${range}", but was loaded with "${_.version}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`);
    throw "number" == typeof limit && (Error.stackTraceLimit = limit), Object.assign(err, {
      code: "BABEL_VERSION_UNSUPPORTED",
      version: _.version,
      range: range
    });
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _path() {
    const data = _interopRequireDefault(__webpack_require__(8));
    return _path = function() {
      return data;
    }, data;
  }
  function _escapeRegExp() {
    const data = _interopRequireDefault(__webpack_require__(286));
    return _escapeRegExp = function() {
      return data;
    }, data;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(pattern, dirname) {
    const parts = _path().default.resolve(dirname, pattern).split(_path().default.sep);
    return new RegExp([ "^", ...parts.map((part, i) => {
      const last = i === parts.length - 1;
      return "**" === part ? last ? starStarPatLast : starStarPat : "*" === part ? last ? starPatLast : starPat : 0 === part.indexOf("*.") ? substitution + (0, 
      _escapeRegExp().default)(part.slice(1)) + (last ? endSep : sep) : (0, _escapeRegExp().default)(part) + (last ? endSep : sep);
    }) ].join(""));
  };
  const sep = "\\" + _path().default.sep, endSep = `(?:${sep}|$)`, substitution = `[^${sep}]+`, starPat = `(?:${substitution}${sep})`, starPatLast = `(?:${substitution}${endSep})`, starStarPat = starPat + "*?", starStarPatLast = `${starPat}*?${starPatLast}?`;
}, function(module, exports, __webpack_require__) {
  var baseToString = __webpack_require__(287);
  module.exports = function(value) {
    return null == value ? "" : baseToString(value);
  };
}, function(module, exports) {
  module.exports = function(array, iteratee) {
    for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var async = __webpack_require__(289);
  async.core = __webpack_require__(227), async.isCore = __webpack_require__(147), 
  async.sync = __webpack_require__(292), module.exports = async;
}, function(module, exports) {
  module.exports = function() {
    var origPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
      return stack;
    };
    var stack = (new Error).stack;
    return Error.prepareStackTrace = origPrepareStackTrace, stack[2].getFileName();
  };
}, function(module, exports, __webpack_require__) {
  var path = __webpack_require__(8), parse = path.parse || __webpack_require__(290), getNodeModulesDirs = function(absoluteStart, modules) {
    var prefix = "/";
    /^([A-Za-z]:)/.test(absoluteStart) ? prefix = "" : /^\\\\/.test(absoluteStart) && (prefix = "\\\\");
    for (var paths = [ absoluteStart ], parsed = parse(absoluteStart); parsed.dir !== paths[paths.length - 1]; ) paths.push(parsed.dir), 
    parsed = parse(parsed.dir);
    return paths.reduce((function(dirs, aPath) {
      return dirs.concat(modules.map((function(moduleDir) {
        return path.resolve(prefix, aPath, moduleDir);
      })));
    }), []);
  };
  module.exports = function(start, opts, request) {
    var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : [ "node_modules" ];
    if (opts && "function" == typeof opts.paths) return opts.paths(request, start, (function() {
      return getNodeModulesDirs(start, modules);
    }), opts);
    var dirs = getNodeModulesDirs(start, modules);
    return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
  };
}, function(module, exports) {
  module.exports = function(x, opts) {
    return opts || {};
  };
}, function(module, exports, __webpack_require__) {
  var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
  function specifierIncluded(specifier) {
    for (var parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
      var cur = Number(current[i] || 0), ver = Number(versionParts[i] || 0);
      if (cur !== ver) return "<" === op ? cur < ver : ">=" === op && cur >= ver;
    }
    return ">=" === op;
  }
  function matchesRange(range) {
    var specifiers = range.split(/ ?&& ?/);
    if (0 === specifiers.length) return !1;
    for (var i = 0; i < specifiers.length; ++i) if (!specifierIncluded(specifiers[i])) return !1;
    return !0;
  }
  function versionIncluded(specifierValue) {
    if ("boolean" == typeof specifierValue) return specifierValue;
    if (specifierValue && "object" == typeof specifierValue) {
      for (var i = 0; i < specifierValue.length; ++i) if (matchesRange(specifierValue[i])) return !0;
      return !1;
    }
    return matchesRange(specifierValue);
  }
  var data = __webpack_require__(291), core = {};
  for (var mod in data) Object.prototype.hasOwnProperty.call(data, mod) && (core[mod] = versionIncluded(data[mod]));
  module.exports = core;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.getEnv = function(defaultValue = "development") {
    return process.env.BABEL_ENV || process.env.NODE_ENV || defaultValue;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.createCachedDescriptors = function(dirname, options, alias) {
    const {plugins: plugins, presets: presets, passPerPreset: passPerPreset} = options;
    return {
      options: options,
      plugins: plugins ? () => createCachedPluginDescriptors(plugins, dirname)(alias) : () => [],
      presets: presets ? () => createCachedPresetDescriptors(presets, dirname)(alias)(!!passPerPreset) : () => []
    };
  }, exports.createUncachedDescriptors = function(dirname, options, alias) {
    let plugins, presets;
    return {
      options: options,
      plugins: () => (plugins || (plugins = createPluginDescriptors(options.plugins || [], dirname, alias)), 
      plugins),
      presets: () => (presets || (presets = createPresetDescriptors(options.presets || [], dirname, alias, !!options.passPerPreset)), 
      presets)
    };
  }, exports.createDescriptor = createDescriptor;
  var _files = __webpack_require__(97), _item = __webpack_require__(98), _caching = __webpack_require__(50);
  const PRESET_DESCRIPTOR_CACHE = new WeakMap, createCachedPresetDescriptors = (0, 
  _caching.makeWeakCacheSync)((items, cache) => {
    const dirname = cache.using(dir => dir);
    return (0, _caching.makeStrongCacheSync)(alias => (0, _caching.makeStrongCacheSync)(passPerPreset => createPresetDescriptors(items, dirname, alias, passPerPreset).map(desc => loadCachedDescriptor(PRESET_DESCRIPTOR_CACHE, desc))));
  }), PLUGIN_DESCRIPTOR_CACHE = new WeakMap, createCachedPluginDescriptors = (0, _caching.makeWeakCacheSync)((items, cache) => {
    const dirname = cache.using(dir => dir);
    return (0, _caching.makeStrongCacheSync)(alias => createPluginDescriptors(items, dirname, alias).map(desc => loadCachedDescriptor(PLUGIN_DESCRIPTOR_CACHE, desc)));
  }), DEFAULT_OPTIONS = {};
  function loadCachedDescriptor(cache, desc) {
    const {value: value, options: options = DEFAULT_OPTIONS} = desc;
    if (!1 === options) return desc;
    let cacheByOptions = cache.get(value);
    cacheByOptions || (cacheByOptions = new WeakMap, cache.set(value, cacheByOptions));
    let possibilities = cacheByOptions.get(options);
    if (possibilities || (possibilities = [], cacheByOptions.set(options, possibilities)), 
    -1 === possibilities.indexOf(desc)) {
      const matches = possibilities.filter(possibility => {
        return b = desc, (a = possibility).name === b.name && a.value === b.value && a.options === b.options && a.dirname === b.dirname && a.alias === b.alias && a.ownPass === b.ownPass && (a.file && a.file.request) === (b.file && b.file.request) && (a.file && a.file.resolved) === (b.file && b.file.resolved);
        var a, b;
      });
      if (matches.length > 0) return matches[0];
      possibilities.push(desc);
    }
    return desc;
  }
  function createPresetDescriptors(items, dirname, alias, passPerPreset) {
    return createDescriptors("preset", items, dirname, alias, passPerPreset);
  }
  function createPluginDescriptors(items, dirname, alias) {
    return createDescriptors("plugin", items, dirname, alias);
  }
  function createDescriptors(type, items, dirname, alias, ownPass) {
    const descriptors = items.map((item, index) => createDescriptor(item, dirname, {
      type: type,
      alias: `${alias}$${index}`,
      ownPass: !!ownPass
    }));
    return function(items) {
      const map = new Map;
      for (const item of items) {
        if ("function" != typeof item.value) continue;
        let nameMap = map.get(item.value);
        if (nameMap || (nameMap = new Set, map.set(item.value, nameMap)), nameMap.has(item.name)) {
          const conflicts = items.filter(i => i.value === item.value);
          throw new Error([ "Duplicate plugin/preset detected.", "If you'd like to use two separate instances of a plugin,", "they need separate names, e.g.", "", "  plugins: [", "    ['some-plugin', {}],", "    ['some-plugin', {}, 'some unique name'],", "  ]", "", "Duplicates detected are:", "" + JSON.stringify(conflicts, null, 2) ].join("\n"));
        }
        nameMap.add(item.name);
      }
    }(descriptors), descriptors;
  }
  function createDescriptor(pair, dirname, {type: type, alias: alias, ownPass: ownPass}) {
    const desc = (0, _item.getItemDescriptor)(pair);
    if (desc) return desc;
    let name, options, value = pair;
    Array.isArray(value) && (3 === value.length ? [value, options, name] = value : [value, options] = value);
    let file = void 0, filepath = null;
    if ("string" == typeof value) {
      if ("string" != typeof type) throw new Error("To resolve a string-based item, the type of item must be given");
      const resolver = "plugin" === type ? _files.loadPlugin : _files.loadPreset, request = value;
      ({filepath: filepath, value: value} = resolver(value, dirname)), file = {
        request: request,
        resolved: filepath
      };
    }
    if (!value) throw new Error("Unexpected falsy value: " + String(value));
    if ("object" == typeof value && value.__esModule) {
      if (!value.default) throw new Error("Must export a default export when using ES6 modules.");
      value = value.default;
    }
    if ("object" != typeof value && "function" != typeof value) throw new Error(`Unsupported format: ${typeof value}. Expected an object or a function.`);
    if (null !== filepath && "object" == typeof value && value) throw new Error("Plugin/Preset files are not allowed to export objects, only functions. In " + filepath);
    return {
      name: name,
      alias: filepath || alias,
      value: value,
      options: options,
      dirname: dirname,
      ownPass: ownPass,
      file: file
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _path() {
    const data = _interopRequireDefault(__webpack_require__(8));
    return _path = function() {
      return data;
    }, data;
  }
  function _debug() {
    const data = _interopRequireDefault(__webpack_require__(52));
    return _debug = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.buildPresetChain = function*(arg, context) {
    const chain = yield* buildPresetChainWalker(arg, context);
    return chain ? {
      plugins: dedupDescriptors(chain.plugins),
      presets: dedupDescriptors(chain.presets),
      options: chain.options.map(o => normalizeOptions(o))
    } : null;
  }, exports.buildRootChain = function*(opts, context) {
    const programmaticChain = yield* loadProgrammaticChain({
      options: opts,
      dirname: context.cwd
    }, context);
    if (!programmaticChain) return null;
    let configFile;
    "string" == typeof opts.configFile ? configFile = yield* (0, _files.loadConfig)(opts.configFile, context.cwd, context.envName, context.caller) : !1 !== opts.configFile && (configFile = yield* (0, 
    _files.findRootConfig)(context.root, context.envName, context.caller));
    let {babelrc: babelrc, babelrcRoots: babelrcRoots} = opts, babelrcRootsDirectory = context.cwd;
    const configFileChain = {
      options: [],
      presets: [],
      plugins: []
    };
    if (configFile) {
      const validatedFile = validateConfigFile(configFile), result = yield* loadFileChain(validatedFile, context);
      if (!result) return null;
      void 0 === babelrc && (babelrc = validatedFile.options.babelrc), void 0 === babelrcRoots && (babelrcRootsDirectory = validatedFile.dirname, 
      babelrcRoots = validatedFile.options.babelrcRoots), mergeChain(configFileChain, result);
    }
    const pkgData = "string" == typeof context.filename ? yield* (0, _files.findPackageData)(context.filename) : null;
    let ignoreFile, babelrcFile;
    const fileChain = {
      options: [],
      presets: [],
      plugins: []
    };
    if ((!0 === babelrc || void 0 === babelrc) && pkgData && function(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
      if ("boolean" == typeof babelrcRoots) return babelrcRoots;
      const absoluteRoot = context.root;
      if (void 0 === babelrcRoots) return -1 !== pkgData.directories.indexOf(absoluteRoot);
      let babelrcPatterns = babelrcRoots;
      Array.isArray(babelrcPatterns) || (babelrcPatterns = [ babelrcPatterns ]);
      if (babelrcPatterns = babelrcPatterns.map(pat => "string" == typeof pat ? _path().default.resolve(babelrcRootsDirectory, pat) : pat), 
      1 === babelrcPatterns.length && babelrcPatterns[0] === absoluteRoot) return -1 !== pkgData.directories.indexOf(absoluteRoot);
      return babelrcPatterns.some(pat => ("string" == typeof pat && (pat = (0, _patternToRegex.default)(pat, babelrcRootsDirectory)), 
      pkgData.directories.some(directory => matchPattern(pat, babelrcRootsDirectory, directory, context))));
    }(context, pkgData, babelrcRoots, babelrcRootsDirectory)) {
      if (({ignore: ignoreFile, config: babelrcFile} = yield* (0, _files.findRelativeConfig)(pkgData, context.envName, context.caller)), 
      ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname)) return null;
      if (babelrcFile) {
        const result = yield* loadFileChain(validateBabelrcFile(babelrcFile), context);
        if (!result) return null;
        mergeChain(fileChain, result);
      }
    }
    const chain = mergeChain(mergeChain(mergeChain({
      options: [],
      presets: [],
      plugins: []
    }, configFileChain), fileChain), programmaticChain);
    return {
      plugins: dedupDescriptors(chain.plugins),
      presets: dedupDescriptors(chain.presets),
      options: chain.options.map(o => normalizeOptions(o)),
      ignore: ignoreFile || void 0,
      babelrc: babelrcFile || void 0,
      config: configFile || void 0
    };
  }, exports.buildPresetChainWalker = void 0;
  var _options = __webpack_require__(149), _patternToRegex = _interopRequireDefault(__webpack_require__(220)), _files = __webpack_require__(97), _caching = __webpack_require__(50), _configDescriptors = __webpack_require__(229);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const debug = (0, _debug().default)("babel:config:config-chain");
  const buildPresetChainWalker = makeChainWalker({
    root: preset => loadPresetDescriptors(preset),
    env: (preset, envName) => loadPresetEnvDescriptors(preset)(envName),
    overrides: (preset, index) => loadPresetOverridesDescriptors(preset)(index),
    overridesEnv: (preset, index, envName) => loadPresetOverridesEnvDescriptors(preset)(index)(envName)
  });
  exports.buildPresetChainWalker = buildPresetChainWalker;
  const loadPresetDescriptors = (0, _caching.makeWeakCacheSync)(preset => buildRootDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors)), loadPresetEnvDescriptors = (0, 
  _caching.makeWeakCacheSync)(preset => (0, _caching.makeStrongCacheSync)(envName => buildEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, envName))), loadPresetOverridesDescriptors = (0, 
  _caching.makeWeakCacheSync)(preset => (0, _caching.makeStrongCacheSync)(index => buildOverrideDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index))), loadPresetOverridesEnvDescriptors = (0, 
  _caching.makeWeakCacheSync)(preset => (0, _caching.makeStrongCacheSync)(index => (0, 
  _caching.makeStrongCacheSync)(envName => buildOverrideEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index, envName))));
  const validateConfigFile = (0, _caching.makeWeakCacheSync)(file => ({
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("configfile", file.options)
  })), validateBabelrcFile = (0, _caching.makeWeakCacheSync)(file => ({
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("babelrcfile", file.options)
  })), validateExtendFile = (0, _caching.makeWeakCacheSync)(file => ({
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("extendsfile", file.options)
  })), loadProgrammaticChain = makeChainWalker({
    root: input => buildRootDescriptors(input, "base", _configDescriptors.createCachedDescriptors),
    env: (input, envName) => buildEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, envName),
    overrides: (input, index) => buildOverrideDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index),
    overridesEnv: (input, index, envName) => buildOverrideEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index, envName)
  }), loadFileChain = makeChainWalker({
    root: file => loadFileDescriptors(file),
    env: (file, envName) => loadFileEnvDescriptors(file)(envName),
    overrides: (file, index) => loadFileOverridesDescriptors(file)(index),
    overridesEnv: (file, index, envName) => loadFileOverridesEnvDescriptors(file)(index)(envName)
  }), loadFileDescriptors = (0, _caching.makeWeakCacheSync)(file => buildRootDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors)), loadFileEnvDescriptors = (0, 
  _caching.makeWeakCacheSync)(file => (0, _caching.makeStrongCacheSync)(envName => buildEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, envName))), loadFileOverridesDescriptors = (0, 
  _caching.makeWeakCacheSync)(file => (0, _caching.makeStrongCacheSync)(index => buildOverrideDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index))), loadFileOverridesEnvDescriptors = (0, 
  _caching.makeWeakCacheSync)(file => (0, _caching.makeStrongCacheSync)(index => (0, 
  _caching.makeStrongCacheSync)(envName => buildOverrideEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index, envName))));
  function buildRootDescriptors({dirname: dirname, options: options}, alias, descriptors) {
    return descriptors(dirname, options, alias);
  }
  function buildEnvDescriptors({dirname: dirname, options: options}, alias, descriptors, envName) {
    const opts = options.env && options.env[envName];
    return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
  }
  function buildOverrideDescriptors({dirname: dirname, options: options}, alias, descriptors, index) {
    const opts = options.overrides && options.overrides[index];
    if (!opts) throw new Error("Assertion failure - missing override");
    return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
  }
  function buildOverrideEnvDescriptors({dirname: dirname, options: options}, alias, descriptors, index, envName) {
    const override = options.overrides && options.overrides[index];
    if (!override) throw new Error("Assertion failure - missing override");
    const opts = override.env && override.env[envName];
    return opts ? descriptors(dirname, opts, `${alias}.overrides[${index}].env["${envName}"]`) : null;
  }
  function makeChainWalker({root: root, env: env, overrides: overrides, overridesEnv: overridesEnv}) {
    return function*(input, context, files = new Set) {
      const {dirname: dirname} = input, flattenedConfigs = [], rootOpts = root(input);
      if (configIsApplicable(rootOpts, dirname, context)) {
        flattenedConfigs.push(rootOpts);
        const envOpts = env(input, context.envName);
        envOpts && configIsApplicable(envOpts, dirname, context) && flattenedConfigs.push(envOpts), 
        (rootOpts.options.overrides || []).forEach((_, index) => {
          const overrideOps = overrides(input, index);
          if (configIsApplicable(overrideOps, dirname, context)) {
            flattenedConfigs.push(overrideOps);
            const overrideEnvOpts = overridesEnv(input, index, context.envName);
            overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context) && flattenedConfigs.push(overrideEnvOpts);
          }
        });
      }
      if (flattenedConfigs.some(({options: {ignore: ignore, only: only}}) => shouldIgnore(context, ignore, only, dirname))) return null;
      const chain = {
        options: [],
        presets: [],
        plugins: []
      };
      for (const op of flattenedConfigs) {
        if (!(yield* mergeExtendsChain(chain, op.options, dirname, context, files))) return null;
        mergeChainOpts(chain, op);
      }
      return chain;
    };
  }
  function* mergeExtendsChain(chain, opts, dirname, context, files) {
    if (void 0 === opts.extends) return !0;
    const file = yield* (0, _files.loadConfig)(opts.extends, dirname, context.envName, context.caller);
    if (files.has(file)) throw new Error(`Configuration cycle detected loading ${file.filepath}.\nFile already loaded following the config chain:\n` + Array.from(files, file => " - " + file.filepath).join("\n"));
    files.add(file);
    const fileChain = yield* loadFileChain(validateExtendFile(file), context, files);
    return files.delete(file), !!fileChain && (mergeChain(chain, fileChain), !0);
  }
  function mergeChain(target, source) {
    return target.options.push(...source.options), target.plugins.push(...source.plugins), 
    target.presets.push(...source.presets), target;
  }
  function mergeChainOpts(target, {options: options, plugins: plugins, presets: presets}) {
    return target.options.push(options), target.plugins.push(...plugins()), target.presets.push(...presets()), 
    target;
  }
  function normalizeOptions(opts) {
    const options = Object.assign({}, opts);
    return delete options.extends, delete options.env, delete options.overrides, delete options.plugins, 
    delete options.presets, delete options.passPerPreset, delete options.ignore, delete options.only, 
    delete options.test, delete options.include, delete options.exclude, Object.prototype.hasOwnProperty.call(options, "sourceMap") && (options.sourceMaps = options.sourceMap, 
    delete options.sourceMap), options;
  }
  function dedupDescriptors(items) {
    const map = new Map, descriptors = [];
    for (const item of items) if ("function" == typeof item.value) {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);
      nameMap || (nameMap = new Map, map.set(fnKey, nameMap));
      let desc = nameMap.get(item.name);
      desc ? desc.value = item : (desc = {
        value: item
      }, descriptors.push(desc), item.ownPass || nameMap.set(item.name, desc));
    } else descriptors.push({
      value: item
    });
    return descriptors.reduce((acc, desc) => (acc.push(desc.value), acc), []);
  }
  function configIsApplicable({options: options}, dirname, context) {
    return (void 0 === options.test || configFieldIsApplicable(context, options.test, dirname)) && (void 0 === options.include || configFieldIsApplicable(context, options.include, dirname)) && (void 0 === options.exclude || !configFieldIsApplicable(context, options.exclude, dirname));
  }
  function configFieldIsApplicable(context, test, dirname) {
    return matchesPatterns(context, Array.isArray(test) ? test : [ test ], dirname);
  }
  function shouldIgnore(context, ignore, only, dirname) {
    return ignore && matchesPatterns(context, ignore, dirname) ? (debug("Ignored %o because it matched one of %O from %o", context.filename, ignore, dirname), 
    !0) : !(!only || matchesPatterns(context, only, dirname)) && (debug("Ignored %o because it failed to match one of %O from %o", context.filename, only, dirname), 
    !0);
  }
  function matchesPatterns(context, patterns, dirname) {
    return patterns.some(pattern => matchPattern(pattern, dirname, context.filename, context));
  }
  function matchPattern(pattern, dirname, pathToTest, context) {
    if ("function" == typeof pattern) return !!pattern(pathToTest, {
      dirname: dirname,
      envName: context.envName,
      caller: context.caller
    });
    if ("string" != typeof pathToTest) throw new Error("Configuration contains string/RegExp pattern, but no filename was passed to Babel");
    return "string" == typeof pattern && (pattern = (0, _patternToRegex.default)(pattern, dirname)), 
    pattern.test(pathToTest);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function msg(loc) {
    switch (loc.type) {
     case "root":
      return "";

     case "env":
      return `${msg(loc.parent)}.env["${loc.name}"]`;

     case "overrides":
      return `${msg(loc.parent)}.overrides[${loc.index}]`;

     case "option":
      return `${msg(loc.parent)}.${loc.name}`;

     case "access":
      return `${msg(loc.parent)}[${JSON.stringify(loc.name)}]`;

     default:
      throw new Error("Assertion failure: Unknown type " + loc.type);
    }
  }
  function access(loc, name) {
    return {
      type: "access",
      name: name,
      parent: loc
    };
  }
  function assertObject(loc, value) {
    if (void 0 !== value && ("object" != typeof value || Array.isArray(value) || !value)) throw new Error(msg(loc) + " must be an object, or undefined");
    return value;
  }
  function assertArray(loc, value) {
    if (null != value && !Array.isArray(value)) throw new Error(msg(loc) + " must be an array, or undefined");
    return value;
  }
  function checkValidTest(value) {
    return "string" == typeof value || "function" == typeof value || value instanceof RegExp;
  }
  function assertPluginTarget(loc, value) {
    if (("object" != typeof value || !value) && "string" != typeof value && "function" != typeof value) throw new Error(msg(loc) + " must be a string, object, function");
    return value;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.msg = msg, exports.access = access, exports.assertRootMode = function(loc, value) {
    if (void 0 !== value && "root" !== value && "upward" !== value && "upward-optional" !== value) throw new Error(msg(loc) + ' must be a "root", "upward", "upward-optional" or undefined');
    return value;
  }, exports.assertSourceMaps = function(loc, value) {
    if (void 0 !== value && "boolean" != typeof value && "inline" !== value && "both" !== value) throw new Error(msg(loc) + ' must be a boolean, "inline", "both", or undefined');
    return value;
  }, exports.assertCompact = function(loc, value) {
    if (void 0 !== value && "boolean" != typeof value && "auto" !== value) throw new Error(msg(loc) + ' must be a boolean, "auto", or undefined');
    return value;
  }, exports.assertSourceType = function(loc, value) {
    if (void 0 !== value && "module" !== value && "script" !== value && "unambiguous" !== value) throw new Error(msg(loc) + ' must be "module", "script", "unambiguous", or undefined');
    return value;
  }, exports.assertCallerMetadata = function(loc, value) {
    const obj = assertObject(loc, value);
    if (obj) {
      if ("string" != typeof obj.name) throw new Error(msg(loc) + ' set but does not contain "name" property string');
      for (const prop of Object.keys(obj)) {
        const propLoc = access(loc, prop), value = obj[prop];
        if (null != value && "boolean" != typeof value && "string" != typeof value && "number" != typeof value) throw new Error(msg(propLoc) + " must be null, undefined, a boolean, a string, or a number.");
      }
    }
    return value;
  }, exports.assertInputSourceMap = function(loc, value) {
    if (void 0 !== value && "boolean" != typeof value && ("object" != typeof value || !value)) throw new Error(msg(loc) + " must be a boolean, object, or undefined");
    return value;
  }, exports.assertString = function(loc, value) {
    if (void 0 !== value && "string" != typeof value) throw new Error(msg(loc) + " must be a string, or undefined");
    return value;
  }, exports.assertFunction = function(loc, value) {
    if (void 0 !== value && "function" != typeof value) throw new Error(msg(loc) + " must be a function, or undefined");
    return value;
  }, exports.assertBoolean = function(loc, value) {
    if (void 0 !== value && "boolean" != typeof value) throw new Error(msg(loc) + " must be a boolean, or undefined");
    return value;
  }, exports.assertObject = assertObject, exports.assertArray = assertArray, exports.assertIgnoreList = function(loc, value) {
    const arr = assertArray(loc, value);
    arr && arr.forEach((item, i) => function(loc, value) {
      if ("string" != typeof value && "function" != typeof value && !(value instanceof RegExp)) throw new Error(msg(loc) + " must be an array of string/Function/RegExp values, or undefined");
      return value;
    }(access(loc, i), item));
    return arr;
  }, exports.assertConfigApplicableTest = function(loc, value) {
    if (void 0 === value) return value;
    if (Array.isArray(value)) value.forEach((item, i) => {
      if (!checkValidTest(item)) throw new Error(msg(access(loc, i)) + " must be a string/Function/RegExp.");
    }); else if (!checkValidTest(value)) throw new Error(msg(loc) + " must be a string/Function/RegExp, or an array of those");
    return value;
  }, exports.assertConfigFileSearch = function(loc, value) {
    if (void 0 !== value && "boolean" != typeof value && "string" != typeof value) throw new Error(msg(loc) + " must be a undefined, a boolean, a string, got " + JSON.stringify(value));
    return value;
  }, exports.assertBabelrcSearch = function(loc, value) {
    if (void 0 === value || "boolean" == typeof value) return value;
    if (Array.isArray(value)) value.forEach((item, i) => {
      if (!checkValidTest(item)) throw new Error(msg(access(loc, i)) + " must be a string/Function/RegExp.");
    }); else if (!checkValidTest(value)) throw new Error(msg(loc) + " must be a undefined, a boolean, a string/Function/RegExp or an array of those, got " + JSON.stringify(value));
    return value;
  }, exports.assertPluginList = function(loc, value) {
    const arr = assertArray(loc, value);
    arr && arr.forEach((item, i) => function(loc, value) {
      if (Array.isArray(value)) {
        if (0 === value.length) throw new Error(msg(loc) + " must include an object");
        if (value.length > 3) throw new Error(msg(loc) + " may only be a two-tuple or three-tuple");
        if (assertPluginTarget(access(loc, 0), value[0]), value.length > 1) {
          const opts = value[1];
          if (void 0 !== opts && !1 !== opts && ("object" != typeof opts || Array.isArray(opts) || null === opts)) throw new Error(msg(access(loc, 1)) + " must be an object, false, or undefined");
        }
        if (3 === value.length) {
          const name = value[2];
          if (void 0 !== name && "string" != typeof name) throw new Error(msg(access(loc, 2)) + " must be a string, or undefined");
        }
      } else assertPluginTarget(loc, value);
      return value;
    }(access(loc, i), item));
    return arr;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _path() {
    const data = _interopRequireDefault(__webpack_require__(8));
    return _path = function() {
      return data;
    }, data;
  }
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = loadPrivatePartialConfig, exports.loadPartialConfig = void 0;
  var _plugin = _interopRequireDefault(__webpack_require__(148)), _util = __webpack_require__(138), _item = __webpack_require__(98), _configChain = __webpack_require__(230), _environment = __webpack_require__(228), _options = __webpack_require__(149), _files = __webpack_require__(97);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function* loadPrivatePartialConfig(inputOpts) {
    if (null != inputOpts && ("object" != typeof inputOpts || Array.isArray(inputOpts))) throw new Error("Babel options must be an object, null, or undefined");
    const args = inputOpts ? (0, _options.validate)("arguments", inputOpts) : {}, {envName: envName = (0, 
    _environment.getEnv)(), cwd: cwd = ".", root: rootDir = ".", rootMode: rootMode = "root", caller: caller} = args, absoluteCwd = _path().default.resolve(cwd), absoluteRootDir = yield* function*(rootDir, rootMode) {
      switch (rootMode) {
       case "root":
        return rootDir;

       case "upward-optional":
        {
          const upwardRootDir = yield* (0, _files.findConfigUpwards)(rootDir);
          return null === upwardRootDir ? rootDir : upwardRootDir;
        }

       case "upward":
        {
          const upwardRootDir = yield* (0, _files.findConfigUpwards)(rootDir);
          if (null !== upwardRootDir) return upwardRootDir;
          throw Object.assign(new Error(`Babel was run with rootMode:"upward" but a root could not be found when searching upward from "${rootDir}".\nOne of the following config files must be in the directory tree: "${_files.ROOT_CONFIG_FILENAMES.join(", ")}".`), {
            code: "BABEL_ROOT_NOT_FOUND",
            dirname: rootDir
          });
        }

       default:
        throw new Error("Assertion failure - unknown rootMode value.");
      }
    }(_path().default.resolve(absoluteCwd, rootDir), rootMode), context = {
      filename: "string" == typeof args.filename ? _path().default.resolve(cwd, args.filename) : void 0,
      cwd: absoluteCwd,
      root: absoluteRootDir,
      envName: envName,
      caller: caller
    }, configChain = yield* (0, _configChain.buildRootChain)(args, context);
    if (!configChain) return null;
    const options = {};
    return configChain.options.forEach(opts => {
      (0, _util.mergeOptions)(options, opts);
    }), options.babelrc = !1, options.configFile = !1, options.passPerPreset = !1, options.envName = context.envName, 
    options.cwd = context.cwd, options.root = context.root, options.filename = "string" == typeof context.filename ? context.filename : void 0, 
    options.plugins = configChain.plugins.map(descriptor => (0, _item.createItemFromDescriptor)(descriptor)), 
    options.presets = configChain.presets.map(descriptor => (0, _item.createItemFromDescriptor)(descriptor)), 
    {
      options: options,
      context: context,
      ignore: configChain.ignore,
      babelrc: configChain.babelrc,
      config: configChain.config
    };
  }
  const loadPartialConfig = (0, _gensync().default)((function*(inputOpts) {
    const result = yield* loadPrivatePartialConfig(inputOpts);
    if (!result) return null;
    const {options: options, babelrc: babelrc, ignore: ignore, config: config} = result;
    return (options.plugins || []).forEach(item => {
      if (item.value instanceof _plugin.default) throw new Error("Passing cached plugin instances is not supported in babel.loadPartialConfig()");
    }), new PartialConfig(options, babelrc ? babelrc.filepath : void 0, ignore ? ignore.filepath : void 0, config ? config.filepath : void 0);
  }));
  exports.loadPartialConfig = loadPartialConfig;
  class PartialConfig {
    constructor(options, babelrc, ignore, config) {
      this.options = options, this.babelignore = ignore, this.babelrc = babelrc, this.config = config, 
      Object.freeze(this);
    }
    hasFilesystemConfig() {
      return void 0 !== this.babelrc || void 0 !== this.config;
    }
  }
  Object.freeze(PartialConfig.prototype);
}, function(module, exports, __webpack_require__) {
  var isArray = __webpack_require__(5), isKey = __webpack_require__(152), stringToPath = __webpack_require__(305), toString = __webpack_require__(221);
  module.exports = function(value, object) {
    return isArray(value) ? value : isKey(value, object) ? [ value ] : stringToPath(toString(value));
  };
}, function(module, exports, __webpack_require__) {
  var baseIsEqualDeep = __webpack_require__(311), isObjectLike = __webpack_require__(3);
  module.exports = function baseIsEqual(value, other, bitmask, customizer, stack) {
    return value === other || (null == value || null == other || !isObjectLike(value) && !isObjectLike(other) ? value != value && other != other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack));
  };
}, function(module, exports, __webpack_require__) {
  var SetCache = __webpack_require__(312), arraySome = __webpack_require__(315), cacheHas = __webpack_require__(316);
  module.exports = function(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = 1 & bitmask, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
    var arrStacked = stack.get(array), othStacked = stack.get(other);
    if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
    var index = -1, result = !0, seen = 2 & bitmask ? new SetCache : void 0;
    for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      if (void 0 !== compared) {
        if (compared) continue;
        result = !1;
        break;
      }
      if (seen) {
        if (!arraySome(other, (function(othValue, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
        }))) {
          result = !1;
          break;
        }
      } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack)) {
        result = !1;
        break;
      }
    }
    return stack.delete(array), stack.delete(other), result;
  };
}, function(module, exports, __webpack_require__) {
  var isObject = __webpack_require__(2);
  module.exports = function(value) {
    return value == value && !isObject(value);
  };
}, function(module, exports) {
  module.exports = function(key, srcValue) {
    return function(object) {
      return null != object && (object[key] === srcValue && (void 0 !== srcValue || key in Object(object)));
    };
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _path() {
    const data = (obj = __webpack_require__(8)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _path = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(config) {
    const {filename: filename, cwd: cwd, filenameRelative: filenameRelative = ("string" == typeof filename ? _path().default.relative(cwd, filename) : "unknown"), sourceType: sourceType = "module", inputSourceMap: inputSourceMap, sourceMaps: sourceMaps = !!inputSourceMap, moduleRoot: moduleRoot, sourceRoot: sourceRoot = moduleRoot, sourceFileName: sourceFileName = _path().default.basename(filenameRelative), comments: comments = !0, compact: compact = "auto"} = config.options, opts = config.options, options = Object.assign({}, opts, {
      parserOpts: Object.assign({
        sourceType: ".mjs" === _path().default.extname(filenameRelative) ? "module" : sourceType,
        sourceFileName: filename,
        plugins: []
      }, opts.parserOpts),
      generatorOpts: Object.assign({
        filename: filename,
        auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
        auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
        retainLines: opts.retainLines,
        comments: comments,
        shouldPrintComment: opts.shouldPrintComment,
        compact: compact,
        minified: opts.minified,
        sourceMaps: sourceMaps,
        sourceRoot: sourceRoot,
        sourceFileName: sourceFileName
      }, opts.generatorOpts)
    });
    for (const plugins of config.passes) for (const plugin of plugins) plugin.manipulateOptions && plugin.manipulateOptions(options, options.parserOpts);
    return options;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var fs = __webpack_require__(51), path = __webpack_require__(8), SafeBuffer = __webpack_require__(341);
  function Converter(sm, opts) {
    var base64;
    (opts = opts || {}).isFileComment && (sm = function(sm, dir) {
      var r = exports.mapFileCommentRegex.exec(sm), filename = r[1] || r[2], filepath = path.resolve(dir, filename);
      try {
        return fs.readFileSync(filepath, "utf8");
      } catch (e) {
        throw new Error("An error occurred while trying to read the map file at " + filepath + "\n" + e);
      }
    }(sm, opts.commentFileDir)), opts.hasComment && (sm = function(sm) {
      return sm.split(",").pop();
    }(sm)), opts.isEncoded && (base64 = sm, sm = SafeBuffer.Buffer.from(base64, "base64").toString()), 
    (opts.isJSON || opts.isEncoded) && (sm = JSON.parse(sm)), this.sourcemap = sm;
  }
  Object.defineProperty(exports, "commentRegex", {
    get: function() {
      return /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/gm;
    }
  }), Object.defineProperty(exports, "mapFileCommentRegex", {
    get: function() {
      return /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"`]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/){1}[ \t]*$)/gm;
    }
  }), Converter.prototype.toJSON = function(space) {
    return JSON.stringify(this.sourcemap, null, space);
  }, Converter.prototype.toBase64 = function() {
    var json = this.toJSON();
    return SafeBuffer.Buffer.from(json, "utf8").toString("base64");
  }, Converter.prototype.toComment = function(options) {
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64," + this.toBase64();
    return options && options.multiline ? "/*# " + data + " */" : "//# " + data;
  }, Converter.prototype.toObject = function() {
    return JSON.parse(this.toJSON());
  }, Converter.prototype.addProperty = function(key, value) {
    if (this.sourcemap.hasOwnProperty(key)) throw new Error('property "' + key + '" already exists on the sourcemap, use set property instead');
    return this.setProperty(key, value);
  }, Converter.prototype.setProperty = function(key, value) {
    return this.sourcemap[key] = value, this;
  }, Converter.prototype.getProperty = function(key) {
    return this.sourcemap[key];
  }, exports.fromObject = function(obj) {
    return new Converter(obj);
  }, exports.fromJSON = function(json) {
    return new Converter(json, {
      isJSON: !0
    });
  }, exports.fromBase64 = function(base64) {
    return new Converter(base64, {
      isEncoded: !0
    });
  }, exports.fromComment = function(comment) {
    return new Converter(comment = comment.replace(/^\/\*/g, "//").replace(/\*\/$/g, ""), {
      isEncoded: !0,
      hasComment: !0
    });
  }, exports.fromMapFileComment = function(comment, dir) {
    return new Converter(comment, {
      commentFileDir: dir,
      isFileComment: !0,
      isJSON: !0
    });
  }, exports.fromSource = function(content) {
    var m = content.match(exports.commentRegex);
    return m ? exports.fromComment(m.pop()) : null;
  }, exports.fromMapFileSource = function(content, dir) {
    var m = content.match(exports.mapFileCommentRegex);
    return m ? exports.fromMapFileComment(m.pop(), dir) : null;
  }, exports.removeComments = function(src) {
    return src.replace(exports.commentRegex, "");
  }, exports.removeMapFileComments = function(src) {
    return src.replace(exports.mapFileCommentRegex, "");
  }, exports.generateMapFileComment = function(file, options) {
    var data = "sourceMappingURL=" + file;
    return options && options.multiline ? "/*# " + data + " */" : "//# " + data;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _parser() {
    const data = __webpack_require__(47);
    return _parser = function() {
      return data;
    }, data;
  }
  function _codeFrame() {
    const data = __webpack_require__(48);
    return _codeFrame = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function*(pluginPasses, {parserOpts: parserOpts, highlightCode: highlightCode = !0, filename: filename = "unknown"}, code) {
    try {
      const results = [];
      for (const plugins of pluginPasses) for (const plugin of plugins) {
        const {parserOverride: parserOverride} = plugin;
        if (parserOverride) {
          const ast = parserOverride(code, parserOpts, _parser().parse);
          void 0 !== ast && results.push(ast);
        }
      }
      if (0 === results.length) return (0, _parser().parse)(code, parserOpts);
      if (1 === results.length) {
        if (yield* [], "function" == typeof results[0].then) throw new Error("You appear to be using an async parser plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
        return results[0];
      }
      throw new Error("More than one plugin attempted to override parsing.");
    } catch (err) {
      "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED" === err.code && (err.message += "\nConsider renaming the file to '.mjs', or setting sourceType:module or sourceType:unambiguous in your Babel config for this file.");
      const {loc: loc, missingPlugin: missingPlugin} = err;
      if (loc) {
        const codeFrame = (0, _codeFrame().codeFrameColumns)(code, {
          start: {
            line: loc.line,
            column: loc.column + 1
          }
        }, {
          highlightCode: highlightCode
        });
        err.message = missingPlugin ? filename + ": " + (0, _missingPluginHelper.default)(missingPlugin[0], loc, codeFrame) : `${filename}: ${err.message}\n\n` + codeFrame, 
        err.code = "BABEL_PARSE_ERROR";
      }
      throw err;
    }
  };
  var obj, _missingPluginHelper = (obj = __webpack_require__(343)) && obj.__esModule ? obj : {
    default: obj
  };
}, , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var obj, _template = (obj = __webpack_require__(35)) && obj.__esModule ? obj : {
    default: obj
  };
  const helpers = Object.create(null);
  var _default = helpers;
  exports.default = _default;
  const helper = minVersion => tpl => ({
    minVersion: minVersion,
    ast: () => _template.default.program.ast(tpl)
  });
  helpers.typeof = helper("7.0.0-beta.0")`
  export default function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) { return typeof obj; };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`, helpers.jsx = helper("7.0.0-beta.0")`
  var REACT_ELEMENT_TYPE;

  export default function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = (
        typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element")
      ) || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {
        children: void 0,
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }
      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null,
    };
  }
`, helpers.asyncIterator = helper("7.0.0-beta.0")`
  export default function _asyncIterator(iterable) {
    var method
    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator]
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        method = iterable[Symbol.iterator]
        if (method != null) return method.call(iterable);
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`, helpers.AwaitValue = helper("7.0.0-beta.0")`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`, helpers.AsyncGenerator = helper("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };
  }

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`, helpers.wrapAsyncGenerator = helper("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`, helpers.awaitAsyncGenerator = helper("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`, helpers.asyncGeneratorDelegate = helper("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () { return this; };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`, helpers.asyncToGenerator = helper("7.0.0-beta.0")`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`, helpers.classCallCheck = helper("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`, helpers.createClass = helper("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
`, helpers.defineEnumerableProperties = helper("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`, helpers.defaults = helper("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`, helpers.defineProperty = helper("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
`, helpers.extends = helper("7.0.0-beta.0")`
  export default function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

    return _extends.apply(this, arguments);
  }
`, helpers.objectSpread = helper("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`, helpers.objectSpread2 = helper("7.5.0")`
  import defineProperty from "defineProperty";

  // This function is different to "Reflect.ownKeys". The enumerableOnly
  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  export default function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }
`, helpers.inherits = helper("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`, helpers.inheritsLoose = helper("7.0.0-beta.0")`
  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
`, helpers.getPrototypeOf = helper("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`, helpers.setPrototypeOf = helper("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`, helpers.isNativeReflectConstruct = helper("7.9.0")`
  export default function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Date object.
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }
`, helpers.construct = helper("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`, helpers.isNativeFunction = helper("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`, helpers.wrapNativeSuper = helper("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`, helpers.instanceof = helper("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`, helpers.interopRequireDefault = helper("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`, helpers.interopRequireWildcard = helper("7.0.0-beta.0")`
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;

    var cache = new WeakMap();
    _getRequireWildcardCache = function () { return cache; };
    return cache;
  }

  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`, helpers.newArrowCheck = helper("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`, helpers.objectDestructuringEmpty = helper("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`, helpers.objectWithoutPropertiesLoose = helper("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`, helpers.objectWithoutProperties = helper("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`, helpers.assertThisInitialized = helper("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`, helpers.possibleConstructorReturn = helper("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    return assertThisInitialized(self);
  }
`, helpers.createSuper = helper("7.9.0")`
  import getPrototypeOf from "getPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";
  import possibleConstructorReturn from "possibleConstructorReturn";

  export default function _createSuper(Derived) {
    var hasNativeReflectConstruct = isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn(this, result);
    }
  }
 `, helpers.superPropBase = helper("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`, helpers.get = helper("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
`, helpers.set = helper("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`, helpers.taggedTemplateLiteral = helper("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`, helpers.taggedTemplateLiteralLoose = helper("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`, helpers.readOnlyError = helper("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new Error("\\"" + name + "\\" is read-only");
  }
`, helpers.classNameTDZError = helper("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`, helpers.temporalUndefined = helper("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`, helpers.tdz = helper("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`, helpers.temporalRef = helper("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`, helpers.slicedToArray = helper("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimit(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`, helpers.slicedToArrayLoose = helper("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimitLoose(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`, helpers.toArray = helper("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return (
      arrayWithHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableRest()
    );
  }
`, helpers.toConsumableArray = helper("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    );
  }
`, helpers.arrayWithoutHoles = helper("7.0.0-beta.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
`, helpers.arrayWithHoles = helper("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`, helpers.maybeArrayLike = helper("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
  }
`, helpers.iterableToArray = helper("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
`, helpers.iterableToArrayLimit = helper("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
`, helpers.iterableToArrayLimitLoose = helper("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;

    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`, helpers.unsupportedIterableToArray = helper("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen);
  }
`, helpers.arrayLikeToArray = helper("7.9.0")`
  export default function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
`, helpers.nonIterableSpread = helper("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`, helpers.nonIterableRest = helper("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`, helpers.createForOfIteratorHelper = helper("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  // s: start (create the iterator)
  // n: next
  // e: error (called whenever something throws)
  // f: finish (always called at the end)

  export default function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        var F = function(){};
        return {
          s: F,
          n: function() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function(e) { throw e; },
          f: F,
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true, didErr = false, err;

    return {
      s: function() {
        it = o[Symbol.iterator]();
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
`, helpers.createForOfIteratorHelperLoose = helper("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        return function() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        }
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }
`, helpers.skipFirstGeneratorNext = helper("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`, helpers.toPrimitive = helper("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`, helpers.toPropertyKey = helper("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`, helpers.initializerWarningHelper = helper("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`, helpers.initializerDefineProperty = helper("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`, helpers.applyDecoratedDescriptor = helper("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            // This is a hack to avoid this being processed by 'transform-runtime'.
            // See issue #9.
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`, helpers.classPrivateFieldLooseKey = helper("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`, helpers.classPrivateFieldLooseBase = helper("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`, helpers.classPrivateFieldGet = helper("7.0.0-beta.0")`
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`, helpers.classPrivateFieldSet = helper("7.0.0-beta.0")`
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }
`, helpers.classPrivateFieldDestructureSet = helper("7.4.4")`
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    var descriptor = privateMap.get(receiver);
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`, helpers.classStaticPrivateFieldSpecGet = helper("7.0.2")`
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`, helpers.classStaticPrivateFieldSpecSet = helper("7.0.2")`
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }

    return value;
  }
`, helpers.classStaticPrivateMethodGet = helper("7.3.2")`
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    return method;
  }
`, helpers.classStaticPrivateMethodSet = helper("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`, helpers.decorate = helper("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`, helpers.classPrivateMethodGet = helper("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`, helpers.classPrivateMethodSet = helper("7.1.6")`
  export default function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }
`, helpers.wrapRegExp = helper("7.2.6")`
  import wrapNativeSuper from "wrapNativeSuper";
  import getPrototypeOf from "getPrototypeOf";
  import possibleConstructorReturn from "possibleConstructorReturn";
  import inherits from "inherits";

  export default function _wrapRegExp(re, groups) {
    _wrapRegExp = function(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = wrapNativeSuper(RegExp);
    var _super = RegExp.prototype;
    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);
      // if the regex is recreated with 'g' flag
      _groups.set(_this, groups || _groups.get(re));
      return _this;
    }
    inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function(str) {
      var result = _super.exec.call(this, str);
      if (result) result.groups = buildGroups(result, this);
      return result;
    };
    BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);
        return _super[Symbol.replace].call(
          this,
          str,
          substitution.replace(/\\$<([^>]+)>/g, function(_, name) {
            return "$" + groups[name];
          })
        );
      } else if (typeof substitution === "function") {
        var _this = this;
        return _super[Symbol.replace].call(
          this,
          str,
          function() {
            var args = [];
            args.push.apply(args, arguments);
            if (typeof args[args.length - 1] !== "object") {
              // Modern engines already pass result.groups as the last arg.
              args.push(buildGroups(args, _this));
            }
            return substitution.apply(this, args);
          }
        );
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    }

    function buildGroups(result, re) {
      // NOTE: This function should return undefined if there are no groups,
      // but in that case Babel doesn't add the wrapper anyway.

      var g = _groups.get(re);
      return Object.keys(g).reduce(function(groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }
`;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.rewriteModuleStatementsAndPrepareHeader = function(path, {exportName: exportName, strict: strict, allowTopLevelThis: allowTopLevelThis, strictMode: strictMode, loose: loose, noInterop: noInterop, lazy: lazy, esNamespaceOnly: esNamespaceOnly}) {
    (0, _assert.default)((0, _helperModuleImports.isModule)(path), "Cannot process module statements in a script"), 
    path.node.sourceType = "script";
    const meta = (0, _normalizeAndLoadMetadata.default)(path, exportName, {
      noInterop: noInterop,
      loose: loose,
      lazy: lazy,
      esNamespaceOnly: esNamespaceOnly
    });
    allowTopLevelThis || (0, _rewriteThis.default)(path);
    if ((0, _rewriteLiveReferences.default)(path, meta), !1 !== strictMode) {
      path.node.directives.some(directive => "use strict" === directive.value.value) || path.unshiftContainer("directives", t.directive(t.directiveLiteral("use strict")));
    }
    const headers = [];
    (0, _normalizeAndLoadMetadata.hasExports)(meta) && !strict && headers.push(function(metadata, enumerable = !1) {
      return (enumerable ? _template.default.statement`
        EXPORTS.__esModule = true;
      ` : _template.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({
        EXPORTS: metadata.exportName
      });
    }(meta, loose));
    const nameList = function(programPath, metadata) {
      const exportedVars = Object.create(null);
      for (const data of metadata.local.values()) for (const name of data.names) exportedVars[name] = !0;
      let hasReexport = !1;
      for (const data of metadata.source.values()) {
        for (const exportName of data.reexports.keys()) exportedVars[exportName] = !0;
        for (const exportName of data.reexportNamespace) exportedVars[exportName] = !0;
        hasReexport = hasReexport || data.reexportAll;
      }
      if (!hasReexport || 0 === Object.keys(exportedVars).length) return null;
      const name = programPath.scope.generateUidIdentifier("exportNames");
      return delete exportedVars.default, {
        name: name.name,
        statement: t.variableDeclaration("var", [ t.variableDeclarator(name, t.valueToNode(exportedVars)) ])
      };
    }(path, meta);
    nameList && (meta.exportNameListName = nameList.name, headers.push(nameList.statement));
    return headers.push(...function(programPath, metadata, loose = !1) {
      const initStatements = [], exportNames = [];
      for (const [localName, data] of metadata.local) "import" === data.kind || ("hoisted" === data.kind ? initStatements.push(buildInitStatement(metadata, data.names, t.identifier(localName))) : exportNames.push(...data.names));
      for (const data of metadata.source.values()) {
        loose || initStatements.push(...buildReexportsFromMeta(metadata, data, loose));
        for (const exportName of data.reexportNamespace) exportNames.push(exportName);
      }
      return initStatements.push(...(0, _chunk.default)(exportNames, 100).map(members => buildInitStatement(metadata, members, programPath.scope.buildUndefinedNode()))), 
      initStatements;
    }(path, meta, loose)), {
      meta: meta,
      headers: headers
    };
  }, exports.ensureStatementsHoisted = function(statements) {
    statements.forEach(header => {
      header._blockHoist = 3;
    });
  }, exports.wrapInterop = function(programPath, expr, type) {
    if ("none" === type) return null;
    let helper;
    if ("default" === type) helper = "interopRequireDefault"; else {
      if ("namespace" !== type) throw new Error("Unknown interop: " + type);
      helper = "interopRequireWildcard";
    }
    return t.callExpression(programPath.hub.addHelper(helper), [ expr ]);
  }, exports.buildNamespaceInitStatements = function(metadata, sourceMetadata, loose = !1) {
    const statements = [];
    let srcNamespace = t.identifier(sourceMetadata.name);
    sourceMetadata.lazy && (srcNamespace = t.callExpression(srcNamespace, []));
    for (const localName of sourceMetadata.importsNamespace) localName !== sourceMetadata.name && statements.push(_template.default.statement`var NAME = SOURCE;`({
      NAME: localName,
      SOURCE: t.cloneNode(srcNamespace)
    }));
    loose && statements.push(...buildReexportsFromMeta(metadata, sourceMetadata, loose));
    for (const exportName of sourceMetadata.reexportNamespace) statements.push((sourceMetadata.lazy ? _template.default.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          ` : _template.default.statement`EXPORTS.NAME = NAMESPACE;`)({
      EXPORTS: metadata.exportName,
      NAME: exportName,
      NAMESPACE: t.cloneNode(srcNamespace)
    }));
    if (sourceMetadata.reexportAll) {
      const statement = function(metadata, namespace, loose) {
        return (loose ? _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;

          EXPORTS[key] = NAMESPACE[key];
        });
      ` : _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `)({
          NAMESPACE: namespace,
          EXPORTS: metadata.exportName,
          VERIFY_NAME_LIST: metadata.exportNameListName ? _template.default`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({
            EXPORTS_LIST: metadata.exportNameListName
          }) : null
        });
      }(metadata, t.cloneNode(srcNamespace), loose);
      statement.loc = sourceMetadata.reexportAll.loc, statements.push(statement);
    }
    return statements;
  }, Object.defineProperty(exports, "isModule", {
    enumerable: !0,
    get: function() {
      return _helperModuleImports.isModule;
    }
  }), Object.defineProperty(exports, "rewriteThis", {
    enumerable: !0,
    get: function() {
      return _rewriteThis.default;
    }
  }), Object.defineProperty(exports, "hasExports", {
    enumerable: !0,
    get: function() {
      return _normalizeAndLoadMetadata.hasExports;
    }
  }), Object.defineProperty(exports, "isSideEffectImport", {
    enumerable: !0,
    get: function() {
      return _normalizeAndLoadMetadata.isSideEffectImport;
    }
  }), Object.defineProperty(exports, "getModuleName", {
    enumerable: !0,
    get: function() {
      return _getModuleName.default;
    }
  });
  var _assert = _interopRequireDefault(__webpack_require__(93)), t = _interopRequireWildcard(__webpack_require__(0)), _template = _interopRequireDefault(__webpack_require__(35)), _chunk = _interopRequireDefault(__webpack_require__(263)), _helperModuleImports = __webpack_require__(268), _rewriteThis = _interopRequireDefault(__webpack_require__(271)), _rewriteLiveReferences = _interopRequireDefault(__webpack_require__(275)), _normalizeAndLoadMetadata = _interopRequireWildcard(__webpack_require__(277)), _getModuleName = _interopRequireDefault(__webpack_require__(278));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const buildReexportsFromMeta = (meta, metadata, loose) => {
    const namespace = metadata.lazy ? t.callExpression(t.identifier(metadata.name), []) : t.identifier(metadata.name), templateForCurrentMode = (loose => loose ? _template.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE.IMPORT_NAME;` : _template.default`
      Object.defineProperty(EXPORTS, "EXPORT_NAME", {
        enumerable: true,
        get: function() {
          return NAMESPACE.IMPORT_NAME;
        },
      });
    `)(loose);
    return Array.from(metadata.reexports, ([exportName, importName]) => templateForCurrentMode({
      EXPORTS: meta.exportName,
      EXPORT_NAME: exportName,
      NAMESPACE: t.cloneNode(namespace),
      IMPORT_NAME: importName
    }));
  };
  function buildInitStatement(metadata, exportNames, initExpr) {
    return t.expressionStatement(exportNames.reduce((acc, exportName) => _template.default.expression`EXPORTS.NAME = VALUE`({
      EXPORTS: metadata.exportName,
      NAME: exportName,
      VALUE: acc
    }), initExpr));
  }
}, function(module, exports, __webpack_require__) {
  var baseSlice = __webpack_require__(264), isIterateeCall = __webpack_require__(94), toInteger = __webpack_require__(265), nativeCeil = Math.ceil, nativeMax = Math.max;
  module.exports = function(array, size, guard) {
    size = (guard ? isIterateeCall(array, size, guard) : void 0 === size) ? 1 : nativeMax(toInteger(size), 0);
    var length = null == array ? 0 : array.length;
    if (!length || size < 1) return [];
    for (var index = 0, resIndex = 0, result = Array(nativeCeil(length / size)); index < length; ) result[resIndex++] = baseSlice(array, index, index += size);
    return result;
  };
}, function(module, exports) {
  module.exports = function(array, start, end) {
    var index = -1, length = array.length;
    start < 0 && (start = -start > length ? 0 : length + start), (end = end > length ? length : end) < 0 && (end += length), 
    length = start > end ? 0 : end - start >>> 0, start >>>= 0;
    for (var result = Array(length); ++index < length; ) result[index] = array[index + start];
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var toFinite = __webpack_require__(266);
  module.exports = function(value) {
    var result = toFinite(value), remainder = result % 1;
    return result == result ? remainder ? result - remainder : result : 0;
  };
}, function(module, exports, __webpack_require__) {
  var toNumber = __webpack_require__(267);
  module.exports = function(value) {
    return value ? (value = toNumber(value)) === 1 / 0 || value === -1 / 0 ? 17976931348623157e292 * (value < 0 ? -1 : 1) : value == value ? value : 0 : 0 === value ? value : 0;
  };
}, function(module, exports, __webpack_require__) {
  var isObject = __webpack_require__(2), isSymbol = __webpack_require__(64), reTrim = /^\s+|\s+$/g, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
  module.exports = function(value) {
    if ("number" == typeof value) return value;
    if (isSymbol(value)) return NaN;
    if (isObject(value)) {
      var other = "function" == typeof value.valueOf ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if ("string" != typeof value) return 0 === value ? value : +value;
    value = value.replace(reTrim, "");
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NaN : +value;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.addDefault = function(path, importedSource, opts) {
    return new _importInjector.default(path).addDefault(importedSource, opts);
  }, exports.addNamed = function(path, name, importedSource, opts) {
    return new _importInjector.default(path).addNamed(name, importedSource, opts);
  }, exports.addNamespace = function(path, importedSource, opts) {
    return new _importInjector.default(path).addNamespace(importedSource, opts);
  }, exports.addSideEffect = function(path, importedSource, opts) {
    return new _importInjector.default(path).addSideEffect(importedSource, opts);
  }, Object.defineProperty(exports, "ImportInjector", {
    enumerable: !0,
    get: function() {
      return _importInjector.default;
    }
  }), Object.defineProperty(exports, "isModule", {
    enumerable: !0,
    get: function() {
      return _isModule.default;
    }
  });
  var _importInjector = _interopRequireDefault(__webpack_require__(269)), _isModule = _interopRequireDefault(__webpack_require__(216));
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
  var _assert = _interopRequireDefault(__webpack_require__(93)), t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0)), _importBuilder = _interopRequireDefault(__webpack_require__(270)), _isModule = _interopRequireDefault(__webpack_require__(216));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  exports.default = class {
    constructor(path, importedSource, opts) {
      this._defaultOpts = {
        importedSource: null,
        importedType: "commonjs",
        importedInterop: "babel",
        importingInterop: "babel",
        ensureLiveReference: !1,
        ensureNoContext: !1
      };
      const programPath = path.find(p => p.isProgram());
      this._programPath = programPath, this._programScope = programPath.scope, this._hub = programPath.hub, 
      this._defaultOpts = this._applyDefaults(importedSource, opts, !0);
    }
    addDefault(importedSourceIn, opts) {
      return this.addNamed("default", importedSourceIn, opts);
    }
    addNamed(importName, importedSourceIn, opts) {
      return (0, _assert.default)("string" == typeof importName), this._generateImport(this._applyDefaults(importedSourceIn, opts), importName);
    }
    addNamespace(importedSourceIn, opts) {
      return this._generateImport(this._applyDefaults(importedSourceIn, opts), null);
    }
    addSideEffect(importedSourceIn, opts) {
      return this._generateImport(this._applyDefaults(importedSourceIn, opts), !1);
    }
    _applyDefaults(importedSource, opts, isInit = !1) {
      const optsList = [];
      "string" == typeof importedSource ? (optsList.push({
        importedSource: importedSource
      }), optsList.push(opts)) : ((0, _assert.default)(!opts, "Unexpected secondary arguments."), 
      optsList.push(importedSource));
      const newOpts = Object.assign({}, this._defaultOpts);
      for (const opts of optsList) opts && (Object.keys(newOpts).forEach(key => {
        void 0 !== opts[key] && (newOpts[key] = opts[key]);
      }), isInit || (void 0 !== opts.nameHint && (newOpts.nameHint = opts.nameHint), void 0 !== opts.blockHoist && (newOpts.blockHoist = opts.blockHoist)));
      return newOpts;
    }
    _generateImport(opts, importName) {
      const isDefault = "default" === importName, isNamed = !!importName && !isDefault, isNamespace = null === importName, {importedSource: importedSource, importedType: importedType, importedInterop: importedInterop, importingInterop: importingInterop, ensureLiveReference: ensureLiveReference, ensureNoContext: ensureNoContext, nameHint: nameHint, blockHoist: blockHoist} = opts;
      let name = nameHint || importName;
      const isMod = (0, _isModule.default)(this._programPath), isModuleForNode = isMod && "node" === importingInterop, isModuleForBabel = isMod && "babel" === importingInterop, builder = new _importBuilder.default(importedSource, this._programScope, this._hub);
      if ("es6" === importedType) {
        if (!isModuleForNode && !isModuleForBabel) throw new Error("Cannot import an ES6 module from CommonJS");
        builder.import(), isNamespace ? builder.namespace(nameHint || importedSource) : (isDefault || isNamed) && builder.named(name, importName);
      } else {
        if ("commonjs" !== importedType) throw new Error(`Unexpected interopType "${importedType}"`);
        if ("babel" === importedInterop) if (isModuleForNode) {
          name = "default" !== name ? name : importedSource;
          const es6Default = importedSource + "$es6Default";
          builder.import(), isNamespace ? builder.default(es6Default).var(name || importedSource).wildcardInterop() : isDefault ? ensureLiveReference ? builder.default(es6Default).var(name || importedSource).defaultInterop().read("default") : builder.default(es6Default).var(name).defaultInterop().prop(importName) : isNamed && builder.default(es6Default).read(importName);
        } else isModuleForBabel ? (builder.import(), isNamespace ? builder.namespace(name || importedSource) : (isDefault || isNamed) && builder.named(name, importName)) : (builder.require(), 
        isNamespace ? builder.var(name || importedSource).wildcardInterop() : (isDefault || isNamed) && ensureLiveReference ? isDefault ? (name = "default" !== name ? name : importedSource, 
        builder.var(name).read(importName), builder.defaultInterop()) : builder.var(importedSource).read(importName) : isDefault ? builder.var(name).defaultInterop().prop(importName) : isNamed && builder.var(name).prop(importName)); else if ("compiled" === importedInterop) isModuleForNode ? (builder.import(), 
        isNamespace ? builder.default(name || importedSource) : (isDefault || isNamed) && builder.default(importedSource).read(name)) : isModuleForBabel ? (builder.import(), 
        isNamespace ? builder.namespace(name || importedSource) : (isDefault || isNamed) && builder.named(name, importName)) : (builder.require(), 
        isNamespace ? builder.var(name || importedSource) : (isDefault || isNamed) && (ensureLiveReference ? builder.var(importedSource).read(name) : builder.prop(importName).var(name))); else {
          if ("uncompiled" !== importedInterop) throw new Error(`Unknown importedInterop "${importedInterop}".`);
          if (isDefault && ensureLiveReference) throw new Error("No live reference for commonjs default");
          isModuleForNode ? (builder.import(), isNamespace ? builder.default(name || importedSource) : isDefault ? builder.default(name) : isNamed && builder.default(importedSource).read(name)) : isModuleForBabel ? (builder.import(), 
          isNamespace ? builder.default(name || importedSource) : isDefault ? builder.default(name) : isNamed && builder.named(name, importName)) : (builder.require(), 
          isNamespace ? builder.var(name || importedSource) : isDefault ? builder.var(name) : isNamed && (ensureLiveReference ? builder.var(importedSource).read(name) : builder.var(name).prop(importName)));
        }
      }
      const {statements: statements, resultName: resultName} = builder.done();
      return this._insertStatements(statements, blockHoist), (isDefault || isNamed) && ensureNoContext && "Identifier" !== resultName.type ? t.sequenceExpression([ t.numericLiteral(0), resultName ]) : resultName;
    }
    _insertStatements(statements, blockHoist = 3) {
      statements.forEach(node => {
        node._blockHoist = blockHoist;
      });
      const targetPath = this._programPath.get("body").find(p => {
        const val = p.node._blockHoist;
        return Number.isFinite(val) && val < 4;
      });
      targetPath ? targetPath.insertBefore(statements) : this._programPath.unshiftContainer("body", statements);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var obj, _assert = (obj = __webpack_require__(93)) && obj.__esModule ? obj : {
    default: obj
  }, t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  exports.default = class {
    constructor(importedSource, scope, hub) {
      this._statements = [], this._resultName = null, this._scope = null, this._hub = null, 
      this._scope = scope, this._hub = hub, this._importedSource = importedSource;
    }
    done() {
      return {
        statements: this._statements,
        resultName: this._resultName
      };
    }
    import() {
      return this._statements.push(t.importDeclaration([], t.stringLiteral(this._importedSource))), 
      this;
    }
    require() {
      return this._statements.push(t.expressionStatement(t.callExpression(t.identifier("require"), [ t.stringLiteral(this._importedSource) ]))), 
      this;
    }
    namespace(name = "namespace") {
      name = this._scope.generateUidIdentifier(name);
      const statement = this._statements[this._statements.length - 1];
      return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
      statement.specifiers = [ t.importNamespaceSpecifier(name) ], this._resultName = t.cloneNode(name), 
      this;
    }
    default(name) {
      name = this._scope.generateUidIdentifier(name);
      const statement = this._statements[this._statements.length - 1];
      return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
      statement.specifiers = [ t.importDefaultSpecifier(name) ], this._resultName = t.cloneNode(name), 
      this;
    }
    named(name, importName) {
      if ("default" === importName) return this.default(name);
      name = this._scope.generateUidIdentifier(name);
      const statement = this._statements[this._statements.length - 1];
      return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
      statement.specifiers = [ t.importSpecifier(name, t.identifier(importName)) ], this._resultName = t.cloneNode(name), 
      this;
    }
    var(name) {
      name = this._scope.generateUidIdentifier(name);
      let statement = this._statements[this._statements.length - 1];
      return "ExpressionStatement" !== statement.type && ((0, _assert.default)(this._resultName), 
      statement = t.expressionStatement(this._resultName), this._statements.push(statement)), 
      this._statements[this._statements.length - 1] = t.variableDeclaration("var", [ t.variableDeclarator(name, statement.expression) ]), 
      this._resultName = t.cloneNode(name), this;
    }
    defaultInterop() {
      return this._interop(this._hub.addHelper("interopRequireDefault"));
    }
    wildcardInterop() {
      return this._interop(this._hub.addHelper("interopRequireWildcard"));
    }
    _interop(callee) {
      const statement = this._statements[this._statements.length - 1];
      return "ExpressionStatement" === statement.type ? statement.expression = t.callExpression(callee, [ statement.expression ]) : "VariableDeclaration" === statement.type ? ((0, 
      _assert.default)(1 === statement.declarations.length), statement.declarations[0].init = t.callExpression(callee, [ statement.declarations[0].init ])) : _assert.default.fail("Unexpected type."), 
      this;
    }
    prop(name) {
      const statement = this._statements[this._statements.length - 1];
      return "ExpressionStatement" === statement.type ? statement.expression = t.memberExpression(statement.expression, t.identifier(name)) : "VariableDeclaration" === statement.type ? ((0, 
      _assert.default)(1 === statement.declarations.length), statement.declarations[0].init = t.memberExpression(statement.declarations[0].init, t.identifier(name))) : _assert.default.fail("Unexpected type:" + statement.type), 
      this;
    }
    read(name) {
      this._resultName = t.memberExpression(this._resultName, t.identifier(name));
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(programPath) {
    programPath.traverse(rewriteThisVisitor);
  };
  var _helperReplaceSupers = __webpack_require__(272);
  const rewriteThisVisitor = {
    ThisExpression(path) {
      path.replaceWith(path.scope.buildUndefinedNode());
    },
    Function(path) {
      path.isMethod() ? (0, _helperReplaceSupers.skipAllButComputedKey)(path) : path.isArrowFunctionExpression() || path.skip();
    },
    ClassProperty(path) {
      (0, _helperReplaceSupers.skipAllButComputedKey)(path);
    },
    ClassPrivateProperty(path) {
      path.skip();
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.skipAllButComputedKey = skipAllButComputedKey, exports.default = exports.environmentVisitor = void 0;
  var _traverse = _interopRequireDefault(__webpack_require__(46)), _helperMemberExpressionToFunctions = _interopRequireDefault(__webpack_require__(273)), _helperOptimiseCallExpression = _interopRequireDefault(__webpack_require__(274)), t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function getPrototypeOfExpression(objectRef, isStatic, file, isPrivateMethod) {
    objectRef = t.cloneNode(objectRef);
    const targetRef = isStatic || isPrivateMethod ? objectRef : t.memberExpression(objectRef, t.identifier("prototype"));
    return t.callExpression(file.addHelper("getPrototypeOf"), [ targetRef ]);
  }
  function skipAllButComputedKey(path) {
    if (!path.node.computed) return void path.skip();
    const keys = t.VISITOR_KEYS[path.type];
    for (const key of keys) "key" !== key && path.skipKey(key);
  }
  const environmentVisitor = {
    TypeAnnotation(path) {
      path.skip();
    },
    Function(path) {
      path.isMethod() || path.isArrowFunctionExpression() || path.skip();
    },
    "Method|ClassProperty|ClassPrivateProperty"(path) {
      skipAllButComputedKey(path);
    }
  };
  exports.environmentVisitor = environmentVisitor;
  const visitor = _traverse.default.visitors.merge([ environmentVisitor, {
    Super(path, state) {
      const {node: node, parentPath: parentPath} = path;
      parentPath.isMemberExpression({
        object: node
      }) && state.handle(parentPath);
    }
  } ]), specHandlers = {
    memoise(superMember, count) {
      const {scope: scope, node: node} = superMember, {computed: computed, property: property} = node;
      if (!computed) return;
      const memo = scope.maybeGenerateMemoised(property);
      memo && this.memoiser.set(property, memo, count);
    },
    prop(superMember) {
      const {computed: computed, property: property} = superMember.node;
      return this.memoiser.has(property) ? t.cloneNode(this.memoiser.get(property)) : computed ? t.cloneNode(property) : t.stringLiteral(property.name);
    },
    get(superMember) {
      return this._get(superMember, this._getThisRefs());
    },
    _get(superMember, thisRefs) {
      const proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
      return t.callExpression(this.file.addHelper("get"), [ thisRefs.memo ? t.sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), thisRefs.this ]);
    },
    _getThisRefs() {
      if (!this.isDerivedConstructor) return {
        this: t.thisExpression()
      };
      const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
      return {
        memo: t.assignmentExpression("=", thisRef, t.thisExpression()),
        this: t.cloneNode(thisRef)
      };
    },
    set(superMember, value) {
      const thisRefs = this._getThisRefs(), proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
      return t.callExpression(this.file.addHelper("set"), [ thisRefs.memo ? t.sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), value, thisRefs.this, t.booleanLiteral(superMember.isInStrictMode()) ]);
    },
    destructureSet(superMember) {
      throw superMember.buildCodeFrameError("Destructuring to a super field is not supported yet.");
    },
    call(superMember, args) {
      const thisRefs = this._getThisRefs();
      return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), t.cloneNode(thisRefs.this), args, !1);
    }
  }, looseHandlers = Object.assign({}, specHandlers, {
    prop(superMember) {
      const {property: property} = superMember.node;
      return this.memoiser.has(property) ? t.cloneNode(this.memoiser.get(property)) : t.cloneNode(property);
    },
    get(superMember) {
      const {isStatic: isStatic, superRef: superRef} = this, {computed: computed} = superMember.node, prop = this.prop(superMember);
      let object;
      return object = isStatic ? superRef ? t.cloneNode(superRef) : t.memberExpression(t.identifier("Function"), t.identifier("prototype")) : superRef ? t.memberExpression(t.cloneNode(superRef), t.identifier("prototype")) : t.memberExpression(t.identifier("Object"), t.identifier("prototype")), 
      t.memberExpression(object, prop, computed);
    },
    set(superMember, value) {
      const {computed: computed} = superMember.node, prop = this.prop(superMember);
      return t.assignmentExpression("=", t.memberExpression(t.thisExpression(), prop, computed), value);
    },
    destructureSet(superMember) {
      const {computed: computed} = superMember.node, prop = this.prop(superMember);
      return t.memberExpression(t.thisExpression(), prop, computed);
    },
    call(superMember, args) {
      return (0, _helperOptimiseCallExpression.default)(this.get(superMember), t.thisExpression(), args, !1);
    }
  });
  exports.default = class {
    constructor(opts) {
      const path = opts.methodPath;
      this.methodPath = path, this.isDerivedConstructor = path.isClassMethod({
        kind: "constructor"
      }) && !!opts.superRef, this.isStatic = path.isObjectMethod() || path.node.static, 
      this.isPrivateMethod = path.isPrivate() && path.isMethod(), this.file = opts.file, 
      this.superRef = opts.superRef, this.isLoose = opts.isLoose, this.opts = opts;
    }
    getObjectRef() {
      return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
    }
    replace() {
      const handler = this.isLoose ? looseHandlers : specHandlers;
      (0, _helperMemberExpressionToFunctions.default)(this.methodPath, visitor, Object.assign({
        file: this.file,
        scope: this.methodPath.scope,
        isDerivedConstructor: this.isDerivedConstructor,
        isStatic: this.isStatic,
        isPrivateMethod: this.isPrivateMethod,
        getObjectRef: this.getObjectRef.bind(this),
        superRef: this.superRef
      }, handler));
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(path, visitor, state) {
    path.traverse(visitor, Object.assign({}, handle, state, {
      memoiser: new AssignmentMemoiser
    }));
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  class AssignmentMemoiser {
    constructor() {
      this._map = new WeakMap;
    }
    has(key) {
      return this._map.has(key);
    }
    get(key) {
      if (!this.has(key)) return;
      const record = this._map.get(key), {value: value} = record;
      return record.count--, 0 === record.count ? t.assignmentExpression("=", value, key) : value;
    }
    set(key, value, count) {
      return this._map.set(key, {
        count: count,
        value: value
      });
    }
  }
  function toNonOptional(path, base) {
    const {node: node} = path;
    if (path.isOptionalMemberExpression()) return t.memberExpression(base, node.property, node.computed);
    if (path.isOptionalCallExpression()) {
      const callee = path.get("callee");
      if (path.node.optional && callee.isOptionalMemberExpression()) {
        const {object: object} = callee.node, context = path.scope.maybeGenerateMemoised(object) || object;
        return callee.get("object").replaceWith(t.assignmentExpression("=", context, object)), 
        t.callExpression(t.memberExpression(base, t.identifier("call")), [ context, ...node.arguments ]);
      }
      return t.callExpression(base, node.arguments);
    }
    return path.node;
  }
  const handle = {
    memoise() {},
    handle(member) {
      const {node: node, parent: parent, parentPath: parentPath} = member;
      if (member.isOptionalMemberExpression()) {
        if (function(path) {
          for (;path && !path.isProgram(); ) {
            const {parentPath: parentPath, container: container, listKey: listKey} = path, parentNode = parentPath.node;
            if (listKey) {
              if (container !== parentNode[listKey]) return !0;
            } else if (container !== parentNode) return !0;
            path = parentPath;
          }
          return !1;
        }(member)) return;
        const endPath = member.find(({node: node, parent: parent, parentPath: parentPath}) => parentPath.isOptionalMemberExpression() ? parent.optional || parent.object !== node : !parentPath.isOptionalCallExpression() || (node !== member.node && parent.optional || parent.callee !== node)), rootParentPath = endPath.parentPath;
        if (rootParentPath.isUpdateExpression({
          argument: node
        }) || rootParentPath.isAssignmentExpression({
          left: node
        })) throw member.buildCodeFrameError("can't handle assignment");
        const isDeleteOperation = rootParentPath.isUnaryExpression({
          operator: "delete"
        });
        if (isDeleteOperation && endPath.isOptionalMemberExpression() && endPath.get("property").isPrivateName()) throw member.buildCodeFrameError("can't delete a private class element");
        let startingOptional = member;
        for (;;) if (startingOptional.isOptionalMemberExpression()) {
          if (startingOptional.node.optional) break;
          startingOptional = startingOptional.get("object");
        } else {
          if (!startingOptional.isOptionalCallExpression()) throw new Error("Internal error: unexpected " + startingOptional.node.type);
          if (startingOptional.node.optional) break;
          startingOptional = startingOptional.get("callee");
        }
        const {scope: scope} = member, startingProp = startingOptional.isOptionalMemberExpression() ? "object" : "callee", startingNode = startingOptional.node[startingProp], baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode), baseRef = null != baseNeedsMemoised ? baseNeedsMemoised : startingNode, parentIsOptionalCall = parentPath.isOptionalCallExpression({
          callee: node
        }), parentIsCall = parentPath.isCallExpression({
          callee: node
        });
        startingOptional.replaceWith(toNonOptional(startingOptional, baseRef)), parentIsOptionalCall ? parent.optional ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.replaceWith(this.call(member, parent.arguments)) : parentIsCall ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member));
        let context, regular = member.node;
        for (let current = member; current !== endPath; ) {
          const {parentPath: parentPath} = current;
          if (parentPath === endPath && parentIsOptionalCall && parent.optional) {
            regular = parentPath.node;
            break;
          }
          regular = toNonOptional(parentPath, regular), current = parentPath;
        }
        const endParentPath = endPath.parentPath;
        if (t.isMemberExpression(regular) && endParentPath.isOptionalCallExpression({
          callee: endPath.node,
          optional: !0
        })) {
          const {object: object} = regular;
          context = member.scope.maybeGenerateMemoised(object), context && (regular.object = t.assignmentExpression("=", context, object));
        }
        let replacementPath = endPath;
        if (isDeleteOperation && (replacementPath = endParentPath, regular = endParentPath.node), 
        replacementPath.replaceWith(t.conditionalExpression(t.logicalExpression("||", t.binaryExpression("===", baseNeedsMemoised ? t.assignmentExpression("=", t.cloneNode(baseRef), t.cloneNode(startingNode)) : t.cloneNode(baseRef), t.nullLiteral()), t.binaryExpression("===", t.cloneNode(baseRef), scope.buildUndefinedNode())), isDeleteOperation ? t.booleanLiteral(!0) : scope.buildUndefinedNode(), regular)), 
        context) {
          const endParent = endParentPath.node;
          endParentPath.replaceWith(t.optionalCallExpression(t.optionalMemberExpression(endParent.callee, t.identifier("call"), !1, !0), [ t.cloneNode(context), ...endParent.arguments ], !1));
        }
      } else if (parentPath.isUpdateExpression({
        argument: node
      })) {
        if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
        const {operator: operator, prefix: prefix} = parent;
        this.memoise(member, 2);
        const value = t.binaryExpression(operator[0], t.unaryExpression("+", this.get(member)), t.numericLiteral(1));
        if (prefix) parentPath.replaceWith(this.set(member, value)); else {
          const {scope: scope} = member, ref = scope.generateUidIdentifierBasedOnNode(node);
          scope.push({
            id: ref
          }), value.left = t.assignmentExpression("=", t.cloneNode(ref), value.left), parentPath.replaceWith(t.sequenceExpression([ this.set(member, value), t.cloneNode(ref) ]));
        }
      } else {
        if (parentPath.isAssignmentExpression({
          left: node
        })) {
          if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
          const {operator: operator, right: right} = parent;
          let value = right;
          return "=" !== operator && (this.memoise(member, 2), value = t.binaryExpression(operator.slice(0, -1), this.get(member), value)), 
          void parentPath.replaceWith(this.set(member, value));
        }
        parentPath.isCallExpression({
          callee: node
        }) ? parentPath.replaceWith(this.call(member, parent.arguments)) : parentPath.isOptionalCallExpression({
          callee: node
        }) ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.isForXStatement({
          left: node
        }) || parentPath.isObjectProperty({
          value: node
        }) && parentPath.parentPath.isObjectPattern() || parentPath.isAssignmentPattern({
          left: node
        }) && parentPath.parentPath.isObjectProperty({
          value: parent
        }) && parentPath.parentPath.parentPath.isObjectPattern() || parentPath.isArrayPattern() || parentPath.isAssignmentPattern({
          left: node
        }) && parentPath.parentPath.isArrayPattern() || parentPath.isRestElement() ? member.replaceWith(this.destructureSet(member)) : member.replaceWith(this.get(member));
      }
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(callee, thisNode, args, optional) {
    return 1 === args.length && t.isSpreadElement(args[0]) && t.isIdentifier(args[0].argument, {
      name: "arguments"
    }) ? t.callExpression(t.memberExpression(callee, t.identifier("apply")), [ thisNode, args[0].argument ]) : optional ? t.optionalCallExpression(t.optionalMemberExpression(callee, t.identifier("call"), !1, !0), [ thisNode, ...args ], !1) : t.callExpression(t.memberExpression(callee, t.identifier("call")), [ thisNode, ...args ]);
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(programPath, metadata) {
    const imported = new Map, exported = new Map, requeueInParent = path => {
      programPath.requeue(path);
    };
    for (const [source, data] of metadata.source) {
      for (const [localName, importName] of data.imports) imported.set(localName, [ source, importName, null ]);
      for (const localName of data.importsNamespace) imported.set(localName, [ source, null, localName ]);
    }
    for (const [local, data] of metadata.local) {
      let exportMeta = exported.get(local);
      exportMeta || (exportMeta = [], exported.set(local, exportMeta)), exportMeta.push(...data.names);
    }
    programPath.traverse(rewriteBindingInitVisitor, {
      metadata: metadata,
      requeueInParent: requeueInParent,
      scope: programPath.scope,
      exported: exported
    }), (0, _helperSimpleAccess.default)(programPath, new Set([ ...Array.from(imported.keys()), ...Array.from(exported.keys()) ])), 
    programPath.traverse(rewriteReferencesVisitor, {
      seen: new WeakSet,
      metadata: metadata,
      requeueInParent: requeueInParent,
      scope: programPath.scope,
      imported: imported,
      exported: exported,
      buildImportReference: ([source, importName, localName], identNode) => {
        const meta = metadata.source.get(source);
        if (localName) return meta.lazy && (identNode = t.callExpression(identNode, [])), 
        identNode;
        let namespace = t.identifier(meta.name);
        return meta.lazy && (namespace = t.callExpression(namespace, [])), t.memberExpression(namespace, t.identifier(importName));
      }
    });
  };
  var _assert = _interopRequireDefault(__webpack_require__(93)), t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0)), _template = _interopRequireDefault(__webpack_require__(35)), _helperSimpleAccess = _interopRequireDefault(__webpack_require__(276));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const rewriteBindingInitVisitor = {
    Scope(path) {
      path.skip();
    },
    ClassDeclaration(path) {
      const {requeueInParent: requeueInParent, exported: exported, metadata: metadata} = this, {id: id} = path.node;
      if (!id) throw new Error("Expected class to have a name");
      const localName = id.name, exportNames = exported.get(localName) || [];
      if (exportNames.length > 0) {
        const statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
        statement._blockHoist = path.node._blockHoist, requeueInParent(path.insertAfter(statement)[0]);
      }
    },
    VariableDeclaration(path) {
      const {requeueInParent: requeueInParent, exported: exported, metadata: metadata} = this;
      Object.keys(path.getOuterBindingIdentifiers()).forEach(localName => {
        const exportNames = exported.get(localName) || [];
        if (exportNames.length > 0) {
          const statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
          statement._blockHoist = path.node._blockHoist, requeueInParent(path.insertAfter(statement)[0]);
        }
      });
    }
  }, buildBindingExportAssignmentExpression = (metadata, exportNames, localExpr) => (exportNames || []).reduce((expr, exportName) => t.assignmentExpression("=", t.memberExpression(t.identifier(metadata.exportName), t.identifier(exportName)), expr), localExpr), buildImportThrow = localName => _template.default.expression.ast`
    (function() {
      throw new Error('"' + '${localName}' + '" is read-only.');
    })()
  `, rewriteReferencesVisitor = {
    ReferencedIdentifier(path) {
      const {seen: seen, buildImportReference: buildImportReference, scope: scope, imported: imported, requeueInParent: requeueInParent} = this;
      if (seen.has(path.node)) return;
      seen.add(path.node);
      const localName = path.node.name, localBinding = path.scope.getBinding(localName);
      if (scope.getBinding(localName) !== localBinding) return;
      const importData = imported.get(localName);
      if (importData) {
        const ref = buildImportReference(importData, path.node);
        if (ref.loc = path.node.loc, (path.parentPath.isCallExpression({
          callee: path.node
        }) || path.parentPath.isOptionalCallExpression({
          callee: path.node
        }) || path.parentPath.isTaggedTemplateExpression({
          tag: path.node
        })) && t.isMemberExpression(ref)) path.replaceWith(t.sequenceExpression([ t.numericLiteral(0), ref ])); else if (path.isJSXIdentifier() && t.isMemberExpression(ref)) {
          const {object: object, property: property} = ref;
          path.replaceWith(t.JSXMemberExpression(t.JSXIdentifier(object.name), t.JSXIdentifier(property.name)));
        } else path.replaceWith(ref);
        requeueInParent(path), path.skip();
      }
    },
    AssignmentExpression: {
      exit(path) {
        const {scope: scope, seen: seen, imported: imported, exported: exported, requeueInParent: requeueInParent, buildImportReference: buildImportReference} = this;
        if (seen.has(path.node)) return;
        seen.add(path.node);
        const left = path.get("left");
        if (!left.isMemberExpression()) if (left.isIdentifier()) {
          const localName = left.node.name;
          if (scope.getBinding(localName) !== path.scope.getBinding(localName)) return;
          const exportedNames = exported.get(localName), importData = imported.get(localName);
          if ((null == exportedNames ? void 0 : exportedNames.length) > 0 || importData) {
            (0, _assert.default)("=" === path.node.operator, "Path was not simplified");
            const assignment = path.node;
            importData && (assignment.left = buildImportReference(importData, assignment.left), 
            assignment.right = t.sequenceExpression([ assignment.right, buildImportThrow(localName) ])), 
            path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, assignment)), 
            requeueInParent(path);
          }
        } else {
          const ids = left.getOuterBindingIdentifiers(), programScopeIds = Object.keys(ids).filter(localName => scope.getBinding(localName) === path.scope.getBinding(localName)), id = programScopeIds.find(localName => imported.has(localName));
          id && (path.node.right = t.sequenceExpression([ path.node.right, buildImportThrow(id) ]));
          const items = [];
          if (programScopeIds.forEach(localName => {
            const exportedNames = exported.get(localName) || [];
            exportedNames.length > 0 && items.push(buildBindingExportAssignmentExpression(this.metadata, exportedNames, t.identifier(localName)));
          }), items.length > 0) {
            let node = t.sequenceExpression(items);
            path.parentPath.isExpressionStatement() && (node = t.expressionStatement(node), 
            node._blockHoist = path.parentPath.node._blockHoist);
            requeueInParent(path.insertAfter(node)[0]);
          }
        }
      }
    },
    "ForOfStatement|ForInStatement"(path) {
      const {scope: scope, node: node} = path, {left: left} = node, {exported: exported, scope: programScope} = this;
      if (!t.isVariableDeclaration(left)) {
        let didTransform = !1;
        const bodyPath = path.get("body"), loopBodyScope = bodyPath.scope;
        for (const name of Object.keys(t.getOuterBindingIdentifiers(left))) exported.get(name) && programScope.getBinding(name) === scope.getBinding(name) && (didTransform = !0, 
        loopBodyScope.hasOwnBinding(name) && loopBodyScope.rename(name));
        if (!didTransform) return;
        const newLoopId = scope.generateUidIdentifierBasedOnNode(left);
        bodyPath.unshiftContainer("body", t.expressionStatement(t.assignmentExpression("=", left, newLoopId))), 
        path.get("left").replaceWith(t.variableDeclaration("let", [ t.variableDeclarator(t.cloneNode(newLoopId)) ])), 
        scope.registerDeclaration(path.get("left"));
      }
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(path, bindingNames) {
    path.traverse(simpleAssignmentVisitor, {
      scope: path.scope,
      bindingNames: bindingNames,
      seen: new WeakSet
    });
  };
  var t = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(0));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const simpleAssignmentVisitor = {
    UpdateExpression: {
      exit(path) {
        const {scope: scope, bindingNames: bindingNames} = this, arg = path.get("argument");
        if (!arg.isIdentifier()) return;
        const localName = arg.node.name;
        if (bindingNames.has(localName) && scope.getBinding(localName) === path.scope.getBinding(localName)) if (path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) {
          const operator = "++" == path.node.operator ? "+=" : "-=";
          path.replaceWith(t.assignmentExpression(operator, arg.node, t.numericLiteral(1)));
        } else if (path.node.prefix) path.replaceWith(t.assignmentExpression("=", t.identifier(localName), t.binaryExpression(path.node.operator[0], t.unaryExpression("+", arg.node), t.numericLiteral(1)))); else {
          const old = path.scope.generateUidIdentifierBasedOnNode(arg.node, "old"), varName = old.name;
          path.scope.push({
            id: old
          });
          const binary = t.binaryExpression(path.node.operator[0], t.identifier(varName), t.numericLiteral(1));
          path.replaceWith(t.sequenceExpression([ t.assignmentExpression("=", t.identifier(varName), t.unaryExpression("+", arg.node)), t.assignmentExpression("=", t.cloneNode(arg.node), binary), t.identifier(varName) ]));
        }
      }
    },
    AssignmentExpression: {
      exit(path) {
        const {scope: scope, seen: seen, bindingNames: bindingNames} = this;
        if ("=" === path.node.operator) return;
        if (seen.has(path.node)) return;
        seen.add(path.node);
        const left = path.get("left");
        if (!left.isIdentifier()) return;
        const localName = left.node.name;
        bindingNames.has(localName) && scope.getBinding(localName) === path.scope.getBinding(localName) && (path.node.right = t.binaryExpression(path.node.operator.slice(0, -1), t.cloneNode(path.node.left), path.node.right), 
        path.node.operator = "=");
      }
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.hasExports = function(metadata) {
    return metadata.hasExports;
  }, exports.isSideEffectImport = isSideEffectImport, exports.default = function(programPath, exportName, {noInterop: noInterop = !1, loose: loose = !1, lazy: lazy = !1, esNamespaceOnly: esNamespaceOnly = !1} = {}) {
    exportName || (exportName = programPath.scope.generateUidIdentifier("exports").name);
    !function(programPath) {
      programPath.get("body").forEach(child => {
        child.isExportDefaultDeclaration() && (0, _helperSplitExportDeclaration.default)(child);
      });
    }(programPath);
    const {local: local, source: source, hasExports: hasExports} = function(programPath, {loose: loose, lazy: lazy}) {
      const localData = function(programPath, loose) {
        const bindingKindLookup = new Map;
        programPath.get("body").forEach(child => {
          let kind;
          if (child.isImportDeclaration()) kind = "import"; else {
            if (child.isExportDefaultDeclaration() && (child = child.get("declaration")), child.isExportNamedDeclaration()) if (child.node.declaration) child = child.get("declaration"); else if (loose && child.node.source && child.get("source").isStringLiteral()) return void child.node.specifiers.forEach(specifier => {
              bindingKindLookup.set(specifier.local.name, "block");
            });
            if (child.isFunctionDeclaration()) kind = "hoisted"; else if (child.isClassDeclaration()) kind = "block"; else if (child.isVariableDeclaration({
              kind: "var"
            })) kind = "var"; else {
              if (!child.isVariableDeclaration()) return;
              kind = "block";
            }
          }
          Object.keys(child.getOuterBindingIdentifiers()).forEach(name => {
            bindingKindLookup.set(name, kind);
          });
        });
        const localMetadata = new Map, getLocalMetadata = idPath => {
          const localName = idPath.node.name;
          let metadata = localMetadata.get(localName);
          if (!metadata) {
            const kind = bindingKindLookup.get(localName);
            if (void 0 === kind) throw idPath.buildCodeFrameError(`Exporting local "${localName}", which is not declared.`);
            metadata = {
              names: [],
              kind: kind
            }, localMetadata.set(localName, metadata);
          }
          return metadata;
        };
        return programPath.get("body").forEach(child => {
          if (!child.isExportNamedDeclaration() || !loose && child.node.source) {
            if (child.isExportDefaultDeclaration()) {
              const declaration = child.get("declaration");
              if (!declaration.isFunctionDeclaration() && !declaration.isClassDeclaration()) throw declaration.buildCodeFrameError("Unexpected default expression export.");
              getLocalMetadata(declaration.get("id")).names.push("default");
            }
          } else if (child.node.declaration) {
            const declaration = child.get("declaration"), ids = declaration.getOuterBindingIdentifierPaths();
            Object.keys(ids).forEach(name => {
              if ("__esModule" === name) throw declaration.buildCodeFrameError('Illegal export "__esModule".');
              getLocalMetadata(ids[name]).names.push(name);
            });
          } else child.get("specifiers").forEach(spec => {
            const local = spec.get("local"), exported = spec.get("exported");
            if ("__esModule" === exported.node.name) throw exported.buildCodeFrameError('Illegal export "__esModule".');
            getLocalMetadata(local).names.push(exported.node.name);
          });
        }), localMetadata;
      }(programPath, loose), sourceData = new Map, getData = sourceNode => {
        const source = sourceNode.value;
        let data = sourceData.get(source);
        return data || (data = {
          name: programPath.scope.generateUidIdentifier((0, _path.basename)(source, (0, _path.extname)(source))).name,
          interop: "none",
          loc: null,
          imports: new Map,
          importsNamespace: new Set,
          reexports: new Map,
          reexportNamespace: new Set,
          reexportAll: null,
          lazy: !1
        }, sourceData.set(source, data)), data;
      };
      let hasExports = !1;
      programPath.get("body").forEach(child => {
        if (child.isImportDeclaration()) {
          const data = getData(child.node.source);
          data.loc || (data.loc = child.node.loc), child.get("specifiers").forEach(spec => {
            if (spec.isImportDefaultSpecifier()) {
              const localName = spec.get("local").node.name;
              data.imports.set(localName, "default");
              const reexport = localData.get(localName);
              reexport && (localData.delete(localName), reexport.names.forEach(name => {
                data.reexports.set(name, "default");
              }));
            } else if (spec.isImportNamespaceSpecifier()) {
              const localName = spec.get("local").node.name;
              data.importsNamespace.add(localName);
              const reexport = localData.get(localName);
              reexport && (localData.delete(localName), reexport.names.forEach(name => {
                data.reexportNamespace.add(name);
              }));
            } else if (spec.isImportSpecifier()) {
              const importName = spec.get("imported").node.name, localName = spec.get("local").node.name;
              data.imports.set(localName, importName);
              const reexport = localData.get(localName);
              reexport && (localData.delete(localName), reexport.names.forEach(name => {
                data.reexports.set(name, importName);
              }));
            }
          });
        } else if (child.isExportAllDeclaration()) {
          hasExports = !0;
          const data = getData(child.node.source);
          data.loc || (data.loc = child.node.loc), data.reexportAll = {
            loc: child.node.loc
          };
        } else if (child.isExportNamedDeclaration() && child.node.source) {
          hasExports = !0;
          const data = getData(child.node.source);
          data.loc || (data.loc = child.node.loc), child.get("specifiers").forEach(spec => {
            if (!spec.isExportSpecifier()) throw spec.buildCodeFrameError("Unexpected export specifier type");
            const importName = spec.get("local").node.name, exportName = spec.get("exported").node.name;
            if (data.reexports.set(exportName, importName), "__esModule" === exportName) throw exportName.buildCodeFrameError('Illegal export "__esModule".');
          });
        } else (child.isExportNamedDeclaration() || child.isExportDefaultDeclaration()) && (hasExports = !0);
      });
      for (const metadata of sourceData.values()) {
        let needsDefault = !1, needsNamed = !1;
        metadata.importsNamespace.size > 0 && (needsDefault = !0, needsNamed = !0), metadata.reexportAll && (needsNamed = !0);
        for (const importName of metadata.imports.values()) "default" === importName ? needsDefault = !0 : needsNamed = !0;
        for (const importName of metadata.reexports.values()) "default" === importName ? needsDefault = !0 : needsNamed = !0;
        needsDefault && needsNamed ? metadata.interop = "namespace" : needsDefault && (metadata.interop = "default");
      }
      for (const [source, metadata] of sourceData) if (!1 !== lazy && !isSideEffectImport(metadata) && !metadata.reexportAll) if (!0 === lazy) metadata.lazy = !/\./.test(source); else if (Array.isArray(lazy)) metadata.lazy = -1 !== lazy.indexOf(source); else {
        if ("function" != typeof lazy) throw new Error(".lazy must be a boolean, string array, or function");
        metadata.lazy = lazy(source);
      }
      return {
        hasExports: hasExports,
        local: localData,
        source: sourceData
      };
    }(programPath, {
      loose: loose,
      lazy: lazy
    });
    !function(programPath) {
      programPath.get("body").forEach(child => {
        if (child.isImportDeclaration()) child.remove(); else if (child.isExportNamedDeclaration()) child.node.declaration ? (child.node.declaration._blockHoist = child.node._blockHoist, 
        child.replaceWith(child.node.declaration)) : child.remove(); else if (child.isExportDefaultDeclaration()) {
          const declaration = child.get("declaration");
          if (!declaration.isFunctionDeclaration() && !declaration.isClassDeclaration()) throw declaration.buildCodeFrameError("Unexpected default expression export.");
          declaration._blockHoist = child.node._blockHoist, child.replaceWith(declaration);
        } else child.isExportAllDeclaration() && child.remove();
      });
    }(programPath);
    for (const [, metadata] of source) metadata.importsNamespace.size > 0 && (metadata.name = metadata.importsNamespace.values().next().value), 
    noInterop ? metadata.interop = "none" : esNamespaceOnly && "namespace" === metadata.interop && (metadata.interop = "default");
    return {
      exportName: exportName,
      exportNameListName: null,
      hasExports: hasExports,
      local: local,
      source: source
    };
  };
  var obj, _path = __webpack_require__(8), _helperSplitExportDeclaration = (obj = __webpack_require__(114)) && obj.__esModule ? obj : {
    default: obj
  };
  function isSideEffectImport(source) {
    return 0 === source.imports.size && 0 === source.importsNamespace.size && 0 === source.reexports.size && 0 === source.reexportNamespace.size && !source.reexportAll;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(rootOpts, pluginOpts) {
    var _pluginOpts$moduleRoo, _rootOpts$moduleIds, _rootOpts$moduleRoot;
    const {filename: filename, filenameRelative: filenameRelative = filename, sourceRoot: sourceRoot = (null != (_pluginOpts$moduleRoo = pluginOpts.moduleRoot) ? _pluginOpts$moduleRoo : rootOpts.moduleRoot)} = rootOpts, {moduleId: moduleId = rootOpts.moduleId, moduleIds: moduleIds = (null != (_rootOpts$moduleIds = rootOpts.moduleIds) ? _rootOpts$moduleIds : !!moduleId), getModuleId: getModuleId = rootOpts.getModuleId, moduleRoot: moduleRoot = (null != (_rootOpts$moduleRoot = rootOpts.moduleRoot) ? _rootOpts$moduleRoot : sourceRoot)} = pluginOpts;
    if (!moduleIds) return null;
    if (null != moduleId && !getModuleId) return moduleId;
    let moduleName = null != moduleRoot ? moduleRoot + "/" : "";
    if (filenameRelative) {
      const sourceRootReplacer = null != sourceRoot ? new RegExp("^" + sourceRoot + "/?") : "";
      moduleName += filenameRelative.replace(sourceRootReplacer, "").replace(/\.(\w*?)$/, "");
    }
    return moduleName = moduleName.replace(/\\/g, "/"), getModuleId && getModuleId(moduleName) || moduleName;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function helpers() {
    const data = _interopRequireWildcard(__webpack_require__(215));
    return helpers = function() {
      return data;
    }, data;
  }
  function _generator() {
    const data = _interopRequireDefault(__webpack_require__(95));
    return _generator = function() {
      return data;
    }, data;
  }
  function _template() {
    const data = _interopRequireDefault(__webpack_require__(35));
    return _template = function() {
      return data;
    }, data;
  }
  function t() {
    const data = _interopRequireWildcard(__webpack_require__(0));
    return t = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(allowlist, outputType = "global") {
    let tree;
    const build = {
      global: buildGlobal,
      module: buildModule,
      umd: buildUmd,
      var: buildVar
    }[outputType];
    if (!build) throw new Error("Unsupported output type " + outputType);
    tree = build(allowlist);
    return (0, _generator().default)(tree).code;
  };
  var _file = _interopRequireDefault(__webpack_require__(106));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
  }
  function buildGlobal(allowlist) {
    const namespace = t().identifier("babelHelpers"), body = [], container = t().functionExpression(null, [ t().identifier("global") ], t().blockStatement(body)), tree = t().program([ t().expressionStatement(t().callExpression(container, [ t().conditionalExpression(t().binaryExpression("===", t().unaryExpression("typeof", t().identifier("global")), t().stringLiteral("undefined")), t().identifier("self"), t().identifier("global")) ])) ]);
    return body.push(t().variableDeclaration("var", [ t().variableDeclarator(namespace, t().assignmentExpression("=", t().memberExpression(t().identifier("global"), namespace), t().objectExpression([]))) ])), 
    buildHelpers(body, namespace, allowlist), tree;
  }
  function buildModule(allowlist) {
    const body = [], refs = buildHelpers(body, null, allowlist);
    return body.unshift(t().exportNamedDeclaration(null, Object.keys(refs).map(name => t().exportSpecifier(t().cloneNode(refs[name]), t().identifier(name))))), 
    t().program(body, [], "module");
  }
  function buildUmd(allowlist) {
    const namespace = t().identifier("babelHelpers"), body = [];
    return body.push(t().variableDeclaration("var", [ t().variableDeclarator(namespace, t().identifier("global")) ])), 
    buildHelpers(body, namespace, allowlist), t().program([ (replacements = {
      FACTORY_PARAMETERS: t().identifier("global"),
      BROWSER_ARGUMENTS: t().assignmentExpression("=", t().memberExpression(t().identifier("root"), namespace), t().objectExpression([])),
      COMMON_ARGUMENTS: t().identifier("exports"),
      AMD_ARGUMENTS: t().arrayExpression([ t().stringLiteral("exports") ]),
      FACTORY_BODY: body,
      UMD_ROOT: t().identifier("this")
    }, _template().default`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(replacements)) ]);
    var replacements;
  }
  function buildVar(allowlist) {
    const namespace = t().identifier("babelHelpers"), body = [];
    body.push(t().variableDeclaration("var", [ t().variableDeclarator(namespace, t().objectExpression([])) ]));
    const tree = t().program(body);
    return buildHelpers(body, namespace, allowlist), body.push(t().expressionStatement(namespace)), 
    tree;
  }
  function buildHelpers(body, namespace, allowlist) {
    const getHelperReference = name => namespace ? t().memberExpression(namespace, t().identifier(name)) : t().identifier("_" + name), refs = {};
    return helpers().list.forEach((function(name) {
      if (allowlist && allowlist.indexOf(name) < 0) return;
      const ref = refs[name] = getHelperReference(name);
      helpers().ensure(name, _file.default);
      const {nodes: nodes} = helpers().get(name, getHelperReference, ref);
      body.push(...nodes);
    })), refs;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _path() {
    const data = (obj = __webpack_require__(8)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _path = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.findPackageData = function*(filepath) {
    let pkg = null;
    const directories = [];
    let isPackage = !0, dirname = _path().default.dirname(filepath);
    for (;!pkg && "node_modules" !== _path().default.basename(dirname); ) {
      directories.push(dirname), pkg = yield* readConfigPackage(_path().default.join(dirname, "package.json"));
      const nextLoc = _path().default.dirname(dirname);
      if (dirname === nextLoc) {
        isPackage = !1;
        break;
      }
      dirname = nextLoc;
    }
    return {
      filepath: filepath,
      directories: directories,
      pkg: pkg,
      isPackage: isPackage
    };
  };
  var _utils = __webpack_require__(218);
  const readConfigPackage = (0, _utils.makeStaticFileCache)((filepath, content) => {
    let options;
    try {
      options = JSON.parse(content);
    } catch (err) {
      throw err.message = `${filepath}: Error while parsing JSON - ${err.message}`, err;
    }
    if (!options) throw new Error(filepath + ": No config detected");
    if ("object" != typeof options) throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
    if (Array.isArray(options)) throw new Error(filepath + ": Expected config object but found array");
    return {
      filepath: filepath,
      dirname: _path().default.dirname(filepath),
      options: options
    };
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _debug() {
    const data = _interopRequireDefault(__webpack_require__(52));
    return _debug = function() {
      return data;
    }, data;
  }
  function _path() {
    const data = _interopRequireDefault(__webpack_require__(8));
    return _path = function() {
      return data;
    }, data;
  }
  function _json() {
    const data = _interopRequireDefault(__webpack_require__(282));
    return _json = function() {
      return data;
    }, data;
  }
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.findConfigUpwards = function*(rootDir) {
    let dirname = rootDir;
    for (;;) {
      for (const filename of ROOT_CONFIG_FILENAMES) if (yield* fs.exists(_path().default.join(dirname, filename))) return dirname;
      const nextDir = _path().default.dirname(dirname);
      if (dirname === nextDir) break;
      dirname = nextDir;
    }
    return null;
  }, exports.findRelativeConfig = function*(packageData, envName, caller) {
    let config = null, ignore = null;
    const dirname = _path().default.dirname(packageData.filepath);
    for (const loc of packageData.directories) {
      var _packageData$pkg;
      if (!config) config = yield* loadOneConfig(RELATIVE_CONFIG_FILENAMES, loc, envName, caller, (null == (_packageData$pkg = packageData.pkg) ? void 0 : _packageData$pkg.dirname) === loc ? packageToBabelConfig(packageData.pkg) : null);
      if (!ignore) {
        const ignoreLoc = _path().default.join(loc, ".babelignore");
        ignore = yield* readIgnoreConfig(ignoreLoc), ignore && debug("Found ignore %o from %o.", ignore.filepath, dirname);
      }
    }
    return {
      config: config,
      ignore: ignore
    };
  }, exports.findRootConfig = function(dirname, envName, caller) {
    return loadOneConfig(ROOT_CONFIG_FILENAMES, dirname, envName, caller);
  }, exports.loadConfig = function*(name, dirname, envName, caller) {
    const filepath = yield* (0, _resolve.default)(name, {
      basedir: dirname
    }), conf = yield* readConfig(filepath, envName, caller);
    if (!conf) throw new Error(`Config file ${filepath} contains no configuration data`);
    return debug("Loaded config %o from %o.", name, dirname), conf;
  }, exports.ROOT_CONFIG_FILENAMES = void 0;
  var _caching = __webpack_require__(50), _configApi = _interopRequireDefault(__webpack_require__(219)), _utils = __webpack_require__(218), _moduleTypes = _interopRequireDefault(__webpack_require__(283)), _patternToRegex = _interopRequireDefault(__webpack_require__(220)), fs = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(139)), _resolve = _interopRequireDefault(__webpack_require__(288));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const debug = (0, _debug().default)("babel:config:loading:files:configuration"), ROOT_CONFIG_FILENAMES = [ "babel.config.js", "babel.config.cjs", "babel.config.mjs", "babel.config.json" ];
  exports.ROOT_CONFIG_FILENAMES = ROOT_CONFIG_FILENAMES;
  const RELATIVE_CONFIG_FILENAMES = [ ".babelrc", ".babelrc.js", ".babelrc.cjs", ".babelrc.mjs", ".babelrc.json" ];
  function* loadOneConfig(names, dirname, envName, caller, previousConfig = null) {
    const config = (yield* _gensync().default.all(names.map(filename => readConfig(_path().default.join(dirname, filename), envName, caller)))).reduce((previousConfig, config) => {
      if (config && previousConfig) throw new Error(`Multiple configuration files found. Please remove one:\n - ${_path().default.basename(previousConfig.filepath)}\n - ${config.filepath}\nfrom ` + dirname);
      return config || previousConfig;
    }, previousConfig);
    return config && debug("Found configuration %o from %o.", config.filepath, dirname), 
    config;
  }
  function readConfig(filepath, envName, caller) {
    const ext = _path().default.extname(filepath);
    return ".js" === ext || ".cjs" === ext || ".mjs" === ext ? readConfigJS(filepath, {
      envName: envName,
      caller: caller
    }) : readConfigJSON5(filepath);
  }
  const LOADING_CONFIGS = new Set, readConfigJS = (0, _caching.makeStrongCache)((function*(filepath, cache) {
    if (!fs.exists.sync(filepath)) return cache.forever(), null;
    if (LOADING_CONFIGS.has(filepath)) return cache.never(), debug("Auto-ignoring usage of config %o.", filepath), 
    {
      filepath: filepath,
      dirname: _path().default.dirname(filepath),
      options: {}
    };
    let options;
    try {
      LOADING_CONFIGS.add(filepath), options = yield* (0, _moduleTypes.default)(filepath, "You appear to be using a native ECMAScript module configuration file, which is only supported when running Babel asynchronously.");
    } catch (err) {
      throw err.message = `${filepath}: Error while loading config - ${err.message}`, 
      err;
    } finally {
      LOADING_CONFIGS.delete(filepath);
    }
    let assertCache = !1;
    if ("function" == typeof options && (yield* [], options = options((0, _configApi.default)(cache)), 
    assertCache = !0), !options || "object" != typeof options || Array.isArray(options)) throw new Error(filepath + ": Configuration should be an exported JavaScript object.");
    if ("function" == typeof options.then) throw new Error("You appear to be using an async configuration, which your current version of Babel does not support. We may add support for this in the future, but if you're on the most recent version of @babel/core and still seeing this error, then you'll need to synchronously return your config.");
    return assertCache && !cache.configured() && function() {
      throw new Error('Caching was left unconfigured. Babel\'s plugins, presets, and .babelrc.js files can be configured\nfor various types of caching, using the first param of their handler functions:\n\nmodule.exports = function(api) {\n  // The API exposes the following:\n\n  // Cache the returned value forever and don\'t call this function again.\n  api.cache(true);\n\n  // Don\'t cache at all. Not recommended because it will be very slow.\n  api.cache(false);\n\n  // Cached based on the value of some function. If this function returns a value different from\n  // a previously-encountered value, the plugins will re-evaluate.\n  var env = api.cache(() => process.env.NODE_ENV);\n\n  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for\n  // any possible NODE_ENV value that might come up during plugin execution.\n  var isProd = api.cache(() => process.env.NODE_ENV === "production");\n\n  // .cache(fn) will perform a linear search though instances to find the matching plugin based\n  // based on previous instantiated plugins. If you want to recreate the plugin and discard the\n  // previous instance whenever something changes, you may use:\n  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");\n\n  // Note, we also expose the following more-verbose versions of the above examples:\n  api.cache.forever(); // api.cache(true)\n  api.cache.never();   // api.cache(false)\n  api.cache.using(fn); // api.cache(fn)\n\n  // Return the value that will be cached.\n  return { };\n};');
    }(), {
      filepath: filepath,
      dirname: _path().default.dirname(filepath),
      options: options
    };
  })), packageToBabelConfig = (0, _caching.makeWeakCacheSync)(file => {
    const babel = file.options.babel;
    if (void 0 === babel) return null;
    if ("object" != typeof babel || Array.isArray(babel) || null === babel) throw new Error(file.filepath + ": .babel property must be an object");
    return {
      filepath: file.filepath,
      dirname: file.dirname,
      options: babel
    };
  }), readConfigJSON5 = (0, _utils.makeStaticFileCache)((filepath, content) => {
    let options;
    try {
      options = _json().default.parse(content);
    } catch (err) {
      throw err.message = `${filepath}: Error while parsing config - ${err.message}`, 
      err;
    }
    if (!options) throw new Error(filepath + ": No config detected");
    if ("object" != typeof options) throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
    if (Array.isArray(options)) throw new Error(filepath + ": Expected config object but found array");
    return {
      filepath: filepath,
      dirname: _path().default.dirname(filepath),
      options: options
    };
  }), readIgnoreConfig = (0, _utils.makeStaticFileCache)((filepath, content) => {
    const ignoreDir = _path().default.dirname(filepath), ignorePatterns = content.split("\n").map(line => line.replace(/#(.*?)$/, "").trim()).filter(line => !!line);
    for (const pattern of ignorePatterns) if ("!" === pattern[0]) throw new Error("Negation of file paths is not supported.");
    return {
      filepath: filepath,
      dirname: _path().default.dirname(filepath),
      ignore: ignorePatterns.map(pattern => (0, _patternToRegex.default)(pattern, ignoreDir))
    };
  });
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var unicode = {
    Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
    ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
    ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
  }, util = {
    isSpaceSeparator: c => "string" == typeof c && unicode.Space_Separator.test(c),
    isIdStartChar: c => "string" == typeof c && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || "$" === c || "_" === c || unicode.ID_Start.test(c)),
    isIdContinueChar: c => "string" == typeof c && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || "$" === c || "_" === c || "‌" === c || "‍" === c || unicode.ID_Continue.test(c)),
    isDigit: c => "string" == typeof c && /[0-9]/.test(c),
    isHexDigit: c => "string" == typeof c && /[0-9A-Fa-f]/.test(c)
  };
  let source, parseState, stack, pos, line, column, token, key, root;
  let lexState, buffer, doubleQuote, sign, c;
  function lex() {
    for (lexState = "default", buffer = "", doubleQuote = !1, sign = 1; ;) {
      c = peek();
      const token = lexStates[lexState]();
      if (token) return token;
    }
  }
  function peek() {
    if (source[pos]) return String.fromCodePoint(source.codePointAt(pos));
  }
  function read() {
    const c = peek();
    return "\n" === c ? (line++, column = 0) : c ? column += c.length : column++, c && (pos += c.length), 
    c;
  }
  const lexStates = {
    default() {
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
    comment() {
      switch (c) {
       case "*":
        return read(), void (lexState = "multiLineComment");

       case "/":
        return read(), void (lexState = "singleLineComment");
      }
      throw invalidChar(read());
    },
    multiLineComment() {
      switch (c) {
       case "*":
        return read(), void (lexState = "multiLineCommentAsterisk");

       case void 0:
        throw invalidChar(read());
      }
      read();
    },
    multiLineCommentAsterisk() {
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
    singleLineComment() {
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
    value() {
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
        return "-" === read() && (sign = -1), void (lexState = "sign");

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
    identifierNameStartEscape() {
      if ("u" !== c) throw invalidChar(read());
      read();
      const u = unicodeEscape();
      switch (u) {
       case "$":
       case "_":
        break;

       default:
        if (!util.isIdStartChar(u)) throw invalidIdentifier();
      }
      buffer += u, lexState = "identifierName";
    },
    identifierName() {
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
    identifierNameEscape() {
      if ("u" !== c) throw invalidChar(read());
      read();
      const u = unicodeEscape();
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
    sign() {
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
        return read(), literal("nfinity"), newToken("numeric", sign * (1 / 0));

       case "N":
        return read(), literal("aN"), newToken("numeric", NaN);
      }
      throw invalidChar(read());
    },
    zero() {
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
      return newToken("numeric", 0 * sign);
    },
    decimalInteger() {
      switch (c) {
       case ".":
        return buffer += read(), void (lexState = "decimalPoint");

       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");
      }
      if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
      buffer += read();
    },
    decimalPointLeading() {
      if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalFraction");
      throw invalidChar(read());
    },
    decimalPoint() {
      switch (c) {
       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");
      }
      return util.isDigit(c) ? (buffer += read(), void (lexState = "decimalFraction")) : newToken("numeric", sign * Number(buffer));
    },
    decimalFraction() {
      switch (c) {
       case "e":
       case "E":
        return buffer += read(), void (lexState = "decimalExponent");
      }
      if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
      buffer += read();
    },
    decimalExponent() {
      switch (c) {
       case "+":
       case "-":
        return buffer += read(), void (lexState = "decimalExponentSign");
      }
      if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
      throw invalidChar(read());
    },
    decimalExponentSign() {
      if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
      throw invalidChar(read());
    },
    decimalExponentInteger() {
      if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
      buffer += read();
    },
    hexadecimal() {
      if (util.isHexDigit(c)) return buffer += read(), void (lexState = "hexadecimalInteger");
      throw invalidChar(read());
    },
    hexadecimalInteger() {
      if (!util.isHexDigit(c)) return newToken("numeric", sign * Number(buffer));
      buffer += read();
    },
    string() {
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
              let buffer = "", c = peek();
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
          console.warn(`JSON5: '${formatChar(c)}' in strings is not valid ECMAScript; consider escaping`);
        }(c);
        break;

       case void 0:
        throw invalidChar(read());
      }
      buffer += read();
    },
    start() {
      switch (c) {
       case "{":
       case "[":
        return newToken("punctuator", read());
      }
      lexState = "value";
    },
    beforePropertyName() {
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
    afterPropertyName() {
      if (":" === c) return newToken("punctuator", read());
      throw invalidChar(read());
    },
    beforePropertyValue() {
      lexState = "value";
    },
    afterPropertyValue() {
      switch (c) {
       case ",":
       case "}":
        return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    beforeArrayValue() {
      if ("]" === c) return newToken("punctuator", read());
      lexState = "value";
    },
    afterArrayValue() {
      switch (c) {
       case ",":
       case "]":
        return newToken("punctuator", read());
      }
      throw invalidChar(read());
    },
    end() {
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
    for (const c of s) {
      if (peek() !== c) throw invalidChar(read());
      read();
    }
  }
  function unicodeEscape() {
    let buffer = "", count = 4;
    for (;count-- > 0; ) {
      const c = peek();
      if (!util.isHexDigit(c)) throw invalidChar(read());
      buffer += read();
    }
    return String.fromCodePoint(parseInt(buffer, 16));
  }
  const parseStates = {
    start() {
      if ("eof" === token.type) throw invalidEOF();
      push();
    },
    beforePropertyName() {
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
    afterPropertyName() {
      if ("eof" === token.type) throw invalidEOF();
      parseState = "beforePropertyValue";
    },
    beforePropertyValue() {
      if ("eof" === token.type) throw invalidEOF();
      push();
    },
    beforeArrayValue() {
      if ("eof" === token.type) throw invalidEOF();
      "punctuator" !== token.type || "]" !== token.value ? push() : pop();
    },
    afterPropertyValue() {
      if ("eof" === token.type) throw invalidEOF();
      switch (token.value) {
       case ",":
        return void (parseState = "beforePropertyName");

       case "}":
        pop();
      }
    },
    afterArrayValue() {
      if ("eof" === token.type) throw invalidEOF();
      switch (token.value) {
       case ",":
        return void (parseState = "beforeArrayValue");

       case "]":
        pop();
      }
    },
    end() {}
  };
  function push() {
    let value;
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
      const parent = stack[stack.length - 1];
      Array.isArray(parent) ? parent.push(value) : parent[key] = value;
    }
    if (null !== value && "object" == typeof value) stack.push(value), parseState = Array.isArray(value) ? "beforeArrayValue" : "beforePropertyName"; else {
      const current = stack[stack.length - 1];
      parseState = null == current ? "end" : Array.isArray(current) ? "afterArrayValue" : "afterPropertyValue";
    }
  }
  function pop() {
    stack.pop();
    const current = stack[stack.length - 1];
    parseState = null == current ? "end" : Array.isArray(current) ? "afterArrayValue" : "afterPropertyValue";
  }
  function invalidChar(c) {
    return syntaxError(void 0 === c ? `JSON5: invalid end of input at ${line}:${column}` : `JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`);
  }
  function invalidEOF() {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
  }
  function invalidIdentifier() {
    return column -= 5, syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
  }
  function formatChar(c) {
    const replacements = {
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
      const hexString = c.charCodeAt(0).toString(16);
      return "\\x" + ("00" + hexString).substring(hexString.length);
    }
    return c;
  }
  function syntaxError(message) {
    const err = new SyntaxError(message);
    return err.lineNumber = line, err.columnNumber = column, err;
  }
  var lib = {
    parse: function(text, reviver) {
      source = String(text), parseState = "start", stack = [], pos = 0, line = 1, column = 0, 
      token = void 0, key = void 0, root = void 0;
      do {
        token = lex(), parseStates[parseState]();
      } while ("eof" !== token.type);
      return "function" == typeof reviver ? function internalize(holder, name, reviver) {
        const value = holder[name];
        if (null != value && "object" == typeof value) for (const key in value) {
          const replacement = internalize(value, key, reviver);
          void 0 === replacement ? delete value[key] : value[key] = replacement;
        }
        return reviver.call(holder, name, value);
      }({
        "": root
      }, "", reviver) : root;
    },
    stringify: function(value, replacer, space) {
      const stack = [];
      let propertyList, replacerFunc, quote, indent = "", gap = "";
      if (null == replacer || "object" != typeof replacer || Array.isArray(replacer) || (space = replacer.space, 
      quote = replacer.quote, replacer = replacer.replacer), "function" == typeof replacer) replacerFunc = replacer; else if (Array.isArray(replacer)) {
        propertyList = [];
        for (const v of replacer) {
          let item;
          "string" == typeof v ? item = v : ("number" == typeof v || v instanceof String || v instanceof Number) && (item = String(v)), 
          void 0 !== item && propertyList.indexOf(item) < 0 && propertyList.push(item);
        }
      }
      return space instanceof Number ? space = Number(space) : space instanceof String && (space = String(space)), 
      "number" == typeof space ? space > 0 && (space = Math.min(10, Math.floor(space)), 
      gap = "          ".substr(0, space)) : "string" == typeof space && (gap = space.substr(0, 10)), 
      serializeProperty("", {
        "": value
      });
      function serializeProperty(key, holder) {
        let value = holder[key];
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
        return "string" == typeof value ? quoteString(value) : "number" == typeof value ? String(value) : "object" == typeof value ? Array.isArray(value) ? function(value) {
          if (stack.indexOf(value) >= 0) throw TypeError("Converting circular structure to JSON5");
          stack.push(value);
          let stepback = indent;
          indent += gap;
          let final, partial = [];
          for (let i = 0; i < value.length; i++) {
            const propertyString = serializeProperty(String(i), value);
            partial.push(void 0 !== propertyString ? propertyString : "null");
          }
          if (0 === partial.length) final = "[]"; else if ("" === gap) {
            let properties = partial.join(",");
            final = "[" + properties + "]";
          } else {
            let separator = ",\n" + indent, properties = partial.join(separator);
            final = "[\n" + indent + properties + ",\n" + stepback + "]";
          }
          return stack.pop(), indent = stepback, final;
        }(value) : function(value) {
          if (stack.indexOf(value) >= 0) throw TypeError("Converting circular structure to JSON5");
          stack.push(value);
          let stepback = indent;
          indent += gap;
          let final, keys = propertyList || Object.keys(value), partial = [];
          for (const key of keys) {
            const propertyString = serializeProperty(key, value);
            if (void 0 !== propertyString) {
              let member = serializeKey(key) + ":";
              "" !== gap && (member += " "), member += propertyString, partial.push(member);
            }
          }
          if (0 === partial.length) final = "{}"; else {
            let properties;
            if ("" === gap) properties = partial.join(","), final = "{" + properties + "}"; else {
              let separator = ",\n" + indent;
              properties = partial.join(separator), final = "{\n" + indent + properties + ",\n" + stepback + "}";
            }
          }
          return stack.pop(), indent = stepback, final;
        }(value) : void 0;
      }
      function quoteString(value) {
        const quotes = {
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
        };
        let product = "";
        for (let i = 0; i < value.length; i++) {
          const c = value[i];
          switch (c) {
           case "'":
           case '"':
            quotes[c]++, product += c;
            continue;

           case "\0":
            if (util.isDigit(value[i + 1])) {
              product += "\\x00";
              continue;
            }
          }
          if (replacements[c]) product += replacements[c]; else if (c < " ") {
            let hexString = c.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
          } else product += c;
        }
        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
        return product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]), 
        quoteChar + product + quoteChar;
      }
      function serializeKey(key) {
        if (0 === key.length) return quoteString(key);
        const firstChar = String.fromCodePoint(key.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) return quoteString(key);
        for (let i = firstChar.length; i < key.length; i++) if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) return quoteString(key);
        return key;
      }
    }
  };
  __webpack_exports__.default = lib;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function*(filepath, asyncError) {
    switch (function(filename) {
      switch (_path().default.extname(filename)) {
       case ".cjs":
        return "cjs";

       case ".mjs":
        return "mjs";

       default:
        return "unknown";
      }
    }(filepath)) {
     case "cjs":
      return loadCjsDefault(filepath);

     case "unknown":
      try {
        return loadCjsDefault(filepath);
      } catch (e) {
        if ("ERR_REQUIRE_ESM" !== e.code) throw e;
      }

     case "mjs":
      if (yield* (0, _async.isAsync)()) return yield* (0, _async.waitFor)(function(_x) {
        return _loadMjsDefault.apply(this, arguments);
      }(filepath));
      throw new Error(asyncError);
    }
  };
  var _async = __webpack_require__(137);
  function _path() {
    const data = (obj = __webpack_require__(8)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _path = function() {
      return data;
    }, data;
  }
  function _url() {
    const data = __webpack_require__(284);
    return _url = function() {
      return data;
    }, data;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg), value = info.value;
    } catch (error) {
      return void reject(error);
    }
    info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise((function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      }));
    };
  }
  let import_;
  try {
    import_ = __webpack_require__(285).default;
  } catch (_unused) {}
  function loadCjsDefault(filepath) {
    const module = __webpack_require__(146)(filepath);
    return (null == module ? void 0 : module.__esModule) ? module.default || void 0 : module;
  }
  function _loadMjsDefault() {
    return (_loadMjsDefault = _asyncToGenerator((function*(filepath) {
      if (!import_) throw new Error("Internal error: Native ECMAScript modules aren't supported by this platform.\n");
      return (yield import_((0, _url().pathToFileURL)(filepath))).default;
    }))).apply(this, arguments);
  }
}, function(module, exports) {
  module.exports = require("url");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(filepath) {
    return Promise.resolve(() => __webpack_require__(146)(filepath));
  };
}, function(module, exports, __webpack_require__) {
  var toString = __webpack_require__(221), reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
  module.exports = function(string) {
    return (string = toString(string)) && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), arrayMap = __webpack_require__(222), isArray = __webpack_require__(5), isSymbol = __webpack_require__(64), symbolProto = Symbol ? Symbol.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  module.exports = function baseToString(value) {
    if ("string" == typeof value) return value;
    if (isArray(value)) return arrayMap(value, baseToString) + "";
    if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
    var result = value + "";
    return "0" == result && 1 / value == -1 / 0 ? "-0" : result;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _resolve() {
    const data = _interopRequireDefault(__webpack_require__(223));
    return _resolve = function() {
      return data;
    }, data;
  }
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _default = (0, _gensync().default)({
    sync: _resolve().default.sync,
    errback: _resolve().default
  });
  exports.default = _default;
}, function(module, exports, __webpack_require__) {
  var fs = __webpack_require__(51), path = __webpack_require__(8), caller = __webpack_require__(224), nodeModulesPaths = __webpack_require__(225), normalizeOptions = __webpack_require__(226), isCore = __webpack_require__(147), realpathFS = fs.realpath && "function" == typeof fs.realpath.native ? fs.realpath.native : fs.realpath, defaultIsFile = function(file, cb) {
    fs.stat(file, (function(err, stat) {
      return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isFile() || stat.isFIFO());
    }));
  }, defaultIsDir = function(dir, cb) {
    fs.stat(dir, (function(err, stat) {
      return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isDirectory());
    }));
  }, defaultRealpath = function(x, cb) {
    realpathFS(x, (function(realpathErr, realPath) {
      realpathErr && "ENOENT" !== realpathErr.code ? cb(realpathErr) : cb(null, realpathErr ? x : realPath);
    }));
  }, maybeRealpath = function(realpath, x, opts, cb) {
    opts && !1 === opts.preserveSymlinks ? realpath(x, cb) : cb(null, x);
  };
  module.exports = function(x, options, callback) {
    var cb = callback, opts = options;
    if ("function" == typeof options && (cb = opts, opts = {}), "string" != typeof x) {
      var err = new TypeError("Path must be a string.");
      return process.nextTick((function() {
        cb(err);
      }));
    }
    var isFile = (opts = normalizeOptions(x, opts)).isFile || defaultIsFile, isDirectory = opts.isDirectory || defaultIsDir, readFile = opts.readFile || fs.readFile, realpath = opts.realpath || defaultRealpath, packageIterator = opts.packageIterator, extensions = opts.extensions || [ ".js" ], basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
    opts.paths = opts.paths || [];
    var res, absoluteStart = path.resolve(basedir);
    function onfile(err, m, pkg) {
      err ? cb(err) : m ? cb(null, m, pkg) : loadAsDirectory(res, (function(err, d, pkg) {
        if (err) cb(err); else if (d) maybeRealpath(realpath, d, opts, (function(err, realD) {
          err ? cb(err) : cb(null, realD, pkg);
        })); else {
          var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
          moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
        }
      }));
    }
    function loadAsFile(x, thePackage, callback) {
      var loadAsFilePackage = thePackage, cb = callback;
      "function" == typeof loadAsFilePackage && (cb = loadAsFilePackage, loadAsFilePackage = void 0), 
      function load(exts, x, loadPackage) {
        if (0 === exts.length) return cb(null, void 0, loadPackage);
        var file = x + exts[0], pkg = loadPackage;
        pkg ? onpkg(null, pkg) : function loadpkg(dir, cb) {
          if ("" === dir || "/" === dir) return cb(null);
          if ("win32" === process.platform && /^\w:[/\\]*$/.test(dir)) return cb(null);
          if (/[/\\]node_modules[/\\]*$/.test(dir)) return cb(null);
          maybeRealpath(realpath, dir, opts, (function(unwrapErr, pkgdir) {
            if (unwrapErr) return loadpkg(path.dirname(dir), cb);
            var pkgfile = path.join(pkgdir, "package.json");
            isFile(pkgfile, (function(err, ex) {
              if (!ex) return loadpkg(path.dirname(dir), cb);
              readFile(pkgfile, (function(err, body) {
                err && cb(err);
                try {
                  var pkg = JSON.parse(body);
                } catch (jsonErr) {}
                pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), cb(null, pkg, dir);
              }));
            }));
          }));
        }(path.dirname(file), onpkg);
        function onpkg(err, pkg_, dir) {
          if (pkg = pkg_, err) return cb(err);
          if (dir && pkg && opts.pathFilter) {
            var rfile = path.relative(dir, file), rel = rfile.slice(0, rfile.length - exts[0].length), r = opts.pathFilter(pkg, x, rel);
            if (r) return load([ "" ].concat(extensions.slice()), path.resolve(dir, r), pkg);
          }
          isFile(file, onex);
        }
        function onex(err, ex) {
          return err ? cb(err) : ex ? cb(null, file, pkg) : void load(exts.slice(1), x, pkg);
        }
      }([ "" ].concat(extensions), x, loadAsFilePackage);
    }
    function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
      var cb = callback, fpkg = loadAsDirectoryPackage;
      "function" == typeof fpkg && (cb = fpkg, fpkg = opts.package), maybeRealpath(realpath, x, opts, (function(unwrapErr, pkgdir) {
        if (unwrapErr) return cb(unwrapErr);
        var pkgfile = path.join(pkgdir, "package.json");
        isFile(pkgfile, (function(err, ex) {
          return err ? cb(err) : ex ? void readFile(pkgfile, (function(err, body) {
            if (err) return cb(err);
            try {
              var pkg = JSON.parse(body);
            } catch (jsonErr) {}
            if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), pkg && pkg.main) {
              if ("string" != typeof pkg.main) {
                var mainError = new TypeError("package “" + pkg.name + "” `main` must be a string");
                return mainError.code = "INVALID_PACKAGE_MAIN", cb(mainError);
              }
              return "." !== pkg.main && "./" !== pkg.main || (pkg.main = "index"), void loadAsFile(path.resolve(x, pkg.main), pkg, (function(err, m, pkg) {
                return err ? cb(err) : m ? cb(null, m, pkg) : pkg ? void loadAsDirectory(path.resolve(x, pkg.main), pkg, (function(err, n, pkg) {
                  return err ? cb(err) : n ? cb(null, n, pkg) : void loadAsFile(path.join(x, "index"), pkg, cb);
                })) : loadAsFile(path.join(x, "index"), pkg, cb);
              }));
            }
            loadAsFile(path.join(x, "/index"), pkg, cb);
          })) : loadAsFile(path.join(x, "index"), fpkg, cb);
        }));
      }));
    }
    maybeRealpath(realpath, absoluteStart, opts, (function(err, realStart) {
      err ? cb(err) : function(basedir) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) res = path.resolve(basedir, x), 
        "." !== x && ".." !== x && "/" !== x.slice(-1) || (res += "/"), /\/$/.test(x) && res === basedir ? loadAsDirectory(res, opts.package, onfile) : loadAsFile(res, opts.package, onfile); else {
          if (isCore(x)) return cb(null, x);
          !function(x, start, cb) {
            var thunk = function() {
              return function(x, start, opts) {
                for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) dirs[i] = path.join(dirs[i], x);
                return dirs;
              }(x, start, opts);
            };
            !function processDirs(cb, dirs) {
              if (0 === dirs.length) return cb(null, void 0);
              var dir = dirs[0];
              function isdir(err, isdir) {
                return err ? cb(err) : isdir ? void loadAsFile(dir, opts.package, onfile) : processDirs(cb, dirs.slice(1));
              }
              function onfile(err, m, pkg) {
                return err ? cb(err) : m ? cb(null, m, pkg) : void loadAsDirectory(dir, opts.package, ondir);
              }
              function ondir(err, n, pkg) {
                return err ? cb(err) : n ? cb(null, n, pkg) : void processDirs(cb, dirs.slice(1));
              }
              isDirectory(path.dirname(dir), isdir);
            }(cb, packageIterator ? packageIterator(x, start, thunk, opts) : thunk());
          }(x, basedir, (function(err, n, pkg) {
            if (err) cb(err); else {
              if (n) return maybeRealpath(realpath, n, opts, (function(err, realN) {
                err ? cb(err) : cb(null, realN, pkg);
              }));
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
            }
          }));
        }
      }(realStart);
    }));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var isWindows = "win32" === process.platform, splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/, splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/, win32 = {};
  win32.parse = function(pathString) {
    if ("string" != typeof pathString) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
    var filename, result, device, tail, result2, allParts = (filename = pathString, 
    result = splitDeviceRe.exec(filename), device = (result[1] || "") + (result[2] || ""), 
    tail = result[3] || "", result2 = splitTailRe.exec(tail), [ device, result2[1], result2[2], result2[3] ]);
    if (!allParts || 4 !== allParts.length) throw new TypeError("Invalid path '" + pathString + "'");
    return {
      root: allParts[0],
      dir: allParts[0] + allParts[1].slice(0, -1),
      base: allParts[2],
      ext: allParts[3],
      name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
  };
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, posix = {};
  posix.parse = function(pathString) {
    if ("string" != typeof pathString) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
    var filename, allParts = (filename = pathString, splitPathRe.exec(filename).slice(1));
    if (!allParts || 4 !== allParts.length) throw new TypeError("Invalid path '" + pathString + "'");
    return allParts[1] = allParts[1] || "", allParts[2] = allParts[2] || "", allParts[3] = allParts[3] || "", 
    {
      root: allParts[0],
      dir: allParts[0] + allParts[1].slice(0, -1),
      base: allParts[2],
      ext: allParts[3],
      name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
  }, module.exports = isWindows ? win32.parse : posix.parse, module.exports.posix = posix.parse, 
  module.exports.win32 = win32.parse;
}, function(module) {
  module.exports = JSON.parse('{"assert":true,"async_hooks":">= 8","buffer_ieee754":"< 0.9.7","buffer":true,"child_process":true,"cluster":true,"console":true,"constants":true,"crypto":true,"_debug_agent":">= 1 && < 8","_debugger":"< 8","dgram":true,"dns":true,"domain":true,"events":true,"freelist":"< 6","fs":true,"fs/promises":[">= 10 && < 10.1",">= 14"],"_http_agent":">= 0.11.1","_http_client":">= 0.11.1","_http_common":">= 0.11.1","_http_incoming":">= 0.11.1","_http_outgoing":">= 0.11.1","_http_server":">= 0.11.1","http":true,"http2":">= 8.8","https":true,"inspector":">= 8.0.0","_linklist":"< 8","module":true,"net":true,"node-inspect/lib/_inspect":">= 7.6.0 && < 12","node-inspect/lib/internal/inspect_client":">= 7.6.0 && < 12","node-inspect/lib/internal/inspect_repl":">= 7.6.0 && < 12","os":true,"path":true,"perf_hooks":">= 8.5","process":">= 1","punycode":true,"querystring":true,"readline":true,"repl":true,"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","_stream_transform":">= 0.9.4","_stream_wrap":">= 1.4.1","_stream_passthrough":">= 0.9.4","_stream_readable":">= 0.9.4","_stream_writable":">= 0.9.4","stream":true,"string_decoder":true,"sys":true,"timers":true,"_tls_common":">= 0.11.13","_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","tls":true,"trace_events":">= 10","tty":true,"url":true,"util":true,"v8/tools/arguments":">= 10 && < 12","v8/tools/codemap":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/consarray":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/csvparser":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/logreader":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/profile_view":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/splaytree":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8":">= 1","vm":true,"wasi":">= 13.4 && < 13.5","worker_threads":">= 11.7","zlib":true}');
}, function(module, exports, __webpack_require__) {
  var isCore = __webpack_require__(147), fs = __webpack_require__(51), path = __webpack_require__(8), caller = __webpack_require__(224), nodeModulesPaths = __webpack_require__(225), normalizeOptions = __webpack_require__(226), realpathFS = fs.realpathSync && "function" == typeof fs.realpathSync.native ? fs.realpathSync.native : fs.realpathSync, defaultIsFile = function(file) {
    try {
      var stat = fs.statSync(file);
    } catch (e) {
      if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
      throw e;
    }
    return stat.isFile() || stat.isFIFO();
  }, defaultIsDir = function(dir) {
    try {
      var stat = fs.statSync(dir);
    } catch (e) {
      if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
      throw e;
    }
    return stat.isDirectory();
  }, defaultRealpathSync = function(x) {
    try {
      return realpathFS(x);
    } catch (realpathErr) {
      if ("ENOENT" !== realpathErr.code) throw realpathErr;
    }
    return x;
  }, maybeRealpathSync = function(realpathSync, x, opts) {
    return opts && !1 === opts.preserveSymlinks ? realpathSync(x) : x;
  };
  module.exports = function(x, options) {
    if ("string" != typeof x) throw new TypeError("Path must be a string.");
    var opts = normalizeOptions(x, options), isFile = opts.isFile || defaultIsFile, readFileSync = opts.readFileSync || fs.readFileSync, isDirectory = opts.isDirectory || defaultIsDir, realpathSync = opts.realpathSync || defaultRealpathSync, packageIterator = opts.packageIterator, extensions = opts.extensions || [ ".js" ], basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
    opts.paths = opts.paths || [];
    var absoluteStart = maybeRealpathSync(realpathSync, path.resolve(basedir), opts);
    if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
      var res = path.resolve(absoluteStart, x);
      "." !== x && ".." !== x && "/" !== x.slice(-1) || (res += "/");
      var m = loadAsFileSync(res) || loadAsDirectorySync(res);
      if (m) return maybeRealpathSync(realpathSync, m, opts);
    } else {
      if (isCore(x)) return x;
      var n = function(x, start) {
        for (var thunk = function() {
          return function(x, start, opts) {
            for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) dirs[i] = path.join(dirs[i], x);
            return dirs;
          }(x, start, opts);
        }, dirs = packageIterator ? packageIterator(x, start, thunk, opts) : thunk(), i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path.dirname(dir))) {
            var m = loadAsFileSync(dir);
            if (m) return m;
            var n = loadAsDirectorySync(dir);
            if (n) return n;
          }
        }
      }(x, absoluteStart);
      if (n) return maybeRealpathSync(realpathSync, n, opts);
    }
    var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
    throw err.code = "MODULE_NOT_FOUND", err;
    function loadAsFileSync(x) {
      var pkg = function loadpkg(dir) {
        if ("" === dir || "/" === dir) return;
        if ("win32" === process.platform && /^\w:[/\\]*$/.test(dir)) return;
        if (/[/\\]node_modules[/\\]*$/.test(dir)) return;
        var pkgfile = path.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
        if (!isFile(pkgfile)) return loadpkg(path.dirname(dir));
        var body = readFileSync(pkgfile);
        try {
          var pkg = JSON.parse(body);
        } catch (jsonErr) {}
        pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, dir));
        return {
          pkg: pkg,
          dir: dir
        };
      }(path.dirname(x));
      if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
        var rfile = path.relative(pkg.dir, x), r = opts.pathFilter(pkg.pkg, x, rfile);
        r && (x = path.resolve(pkg.dir, r));
      }
      if (isFile(x)) return x;
      for (var i = 0; i < extensions.length; i++) {
        var file = x + extensions[i];
        if (isFile(file)) return file;
      }
    }
    function loadAsDirectorySync(x) {
      var pkgfile = path.join(maybeRealpathSync(realpathSync, x, opts), "/package.json");
      if (isFile(pkgfile)) {
        try {
          var body = readFileSync(pkgfile, "UTF8"), pkg = JSON.parse(body);
        } catch (e) {}
        if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, x)), pkg && pkg.main) {
          if ("string" != typeof pkg.main) {
            var mainError = new TypeError("package “" + pkg.name + "” `main` must be a string");
            throw mainError.code = "INVALID_PACKAGE_MAIN", mainError;
          }
          "." !== pkg.main && "./" !== pkg.main || (pkg.main = "index");
          try {
            var m = loadAsFileSync(path.resolve(x, pkg.main));
            if (m) return m;
            var n = loadAsDirectorySync(path.resolve(x, pkg.main));
            if (n) return n;
          } catch (e) {}
        }
      }
      return loadAsFileSync(path.join(x, "/index"));
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _debug() {
    const data = _interopRequireDefault(__webpack_require__(52));
    return _debug = function() {
      return data;
    }, data;
  }
  function _resolve() {
    const data = _interopRequireDefault(__webpack_require__(223));
    return _resolve = function() {
      return data;
    }, data;
  }
  function _path() {
    const data = _interopRequireDefault(__webpack_require__(8));
    return _path = function() {
      return data;
    }, data;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.resolvePlugin = resolvePlugin, exports.resolvePreset = resolvePreset, 
  exports.loadPlugin = function(name, dirname) {
    const filepath = resolvePlugin(name, dirname);
    if (!filepath) throw new Error(`Plugin ${name} not found relative to ${dirname}`);
    const value = requireModule("plugin", filepath);
    return debug("Loaded plugin %o from %o.", name, dirname), {
      filepath: filepath,
      value: value
    };
  }, exports.loadPreset = function(name, dirname) {
    const filepath = resolvePreset(name, dirname);
    if (!filepath) throw new Error(`Preset ${name} not found relative to ${dirname}`);
    const value = requireModule("preset", filepath);
    return debug("Loaded preset %o from %o.", name, dirname), {
      filepath: filepath,
      value: value
    };
  };
  const debug = (0, _debug().default)("babel:config:loading:files:plugins"), EXACT_RE = /^module:/, BABEL_PLUGIN_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-plugin-)/, BABEL_PRESET_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-preset-)/, BABEL_PLUGIN_ORG_RE = /^(@babel\/)(?!plugin-|[^/]+\/)/, BABEL_PRESET_ORG_RE = /^(@babel\/)(?!preset-|[^/]+\/)/, OTHER_PLUGIN_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-plugin(?:-|\/|$)|[^/]+\/)/, OTHER_PRESET_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-preset(?:-|\/|$)|[^/]+\/)/, OTHER_ORG_DEFAULT_RE = /^(@(?!babel$)[^/]+)$/;
  function resolvePlugin(name, dirname) {
    return resolveStandardizedName("plugin", name, dirname);
  }
  function resolvePreset(name, dirname) {
    return resolveStandardizedName("preset", name, dirname);
  }
  function standardizeName(type, name) {
    if (_path().default.isAbsolute(name)) return name;
    const isPreset = "preset" === type;
    return name.replace(isPreset ? BABEL_PRESET_PREFIX_RE : BABEL_PLUGIN_PREFIX_RE, `babel-${type}-`).replace(isPreset ? BABEL_PRESET_ORG_RE : BABEL_PLUGIN_ORG_RE, `$1${type}-`).replace(isPreset ? OTHER_PRESET_ORG_RE : OTHER_PLUGIN_ORG_RE, `$1babel-${type}-`).replace(OTHER_ORG_DEFAULT_RE, "$1/babel-" + type).replace(EXACT_RE, "");
  }
  function resolveStandardizedName(type, name, dirname = process.cwd()) {
    const standardizedName = standardizeName(type, name);
    try {
      return _resolve().default.sync(standardizedName, {
        basedir: dirname
      });
    } catch (e) {
      if ("MODULE_NOT_FOUND" !== e.code) throw e;
      if (standardizedName !== name) {
        let resolvedOriginal = !1;
        try {
          _resolve().default.sync(name, {
            basedir: dirname
          }), resolvedOriginal = !0;
        } catch (_unused) {}
        resolvedOriginal && (e.message += `\n- If you want to resolve "${name}", use "module:${name}"`);
      }
      let resolvedBabel = !1;
      try {
        _resolve().default.sync(standardizeName(type, "@babel/" + name), {
          basedir: dirname
        }), resolvedBabel = !0;
      } catch (_unused2) {}
      resolvedBabel && (e.message += `\n- Did you mean "@babel/${name}"?`);
      let resolvedOppositeType = !1;
      const oppositeType = "preset" === type ? "plugin" : "preset";
      try {
        _resolve().default.sync(standardizeName(oppositeType, name), {
          basedir: dirname
        }), resolvedOppositeType = !0;
      } catch (_unused3) {}
      throw resolvedOppositeType && (e.message += `\n- Did you accidentally pass a ${oppositeType} as a ${type}?`), 
      e;
    }
  }
  const LOADING_MODULES = new Set;
  function requireModule(type, name) {
    if (LOADING_MODULES.has(name)) throw new Error(`Reentrant ${type} detected trying to load "${name}". This module is not ignored and is trying to load itself while compiling itself, leading to a dependency cycle. We recommend adding it to your "ignore" list in your babelrc, or to a .babelignore.`);
    try {
      return LOADING_MODULES.add(name), __webpack_require__(146)(name);
    } finally {
      LOADING_MODULES.delete(name);
    }
  }
}, function(module) {
  module.exports = JSON.parse('{"name":"@babel/core","version":"7.10.5","description":"Babel compiler core."}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _async = __webpack_require__(137), _util = __webpack_require__(138), context = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(105)), _plugin = _interopRequireDefault(__webpack_require__(148)), _item = __webpack_require__(98), _configChain = __webpack_require__(230);
  function _traverse() {
    const data = _interopRequireDefault(__webpack_require__(46));
    return _traverse = function() {
      return data;
    }, data;
  }
  var _caching = __webpack_require__(50), _options = __webpack_require__(149), _plugins = __webpack_require__(297), _configApi = _interopRequireDefault(__webpack_require__(219)), _partial = _interopRequireDefault(__webpack_require__(232));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  var _default = (0, _gensync().default)((function*(inputOpts) {
    const result = yield* (0, _partial.default)(inputOpts);
    if (!result) return null;
    const {options: options, context: context} = result, optionDefaults = {}, passes = [ [] ];
    try {
      const {plugins: plugins, presets: presets} = options;
      if (!plugins || !presets) throw new Error("Assertion failure - plugins and presets exist");
      if (yield* function* recurseDescriptors(config, pass) {
        const plugins = [];
        for (let i = 0; i < config.plugins.length; i++) {
          const descriptor = config.plugins[i];
          if (!1 !== descriptor.options) try {
            plugins.push(yield* loadPluginDescriptor(descriptor, context));
          } catch (e) {
            throw i > 0 && "BABEL_UNKNOWN_PLUGIN_PROPERTY" === e.code && (0, _options.checkNoUnwrappedItemOptionPairs)(config.plugins[i - 1], descriptor, "plugin", i, e), 
            e;
          }
        }
        const presets = [];
        for (let i = 0; i < config.presets.length; i++) {
          const descriptor = config.presets[i];
          if (!1 !== descriptor.options) try {
            presets.push({
              preset: yield* loadPresetDescriptor(descriptor, context),
              pass: descriptor.ownPass ? [] : pass
            });
          } catch (e) {
            throw i > 0 && "BABEL_UNKNOWN_OPTION" === e.code && (0, _options.checkNoUnwrappedItemOptionPairs)(config.presets[i - 1], descriptor, "preset", i, e), 
            e;
          }
        }
        if (presets.length > 0) {
          passes.splice(1, 0, ...presets.map(o => o.pass).filter(p => p !== pass));
          for (const {preset: preset, pass: pass} of presets) {
            if (!preset) return !0;
            if (yield* recurseDescriptors({
              plugins: preset.plugins,
              presets: preset.presets
            }, pass)) return !0;
            preset.options.forEach(opts => {
              (0, _util.mergeOptions)(optionDefaults, opts);
            });
          }
        }
        plugins.length > 0 && pass.unshift(...plugins);
      }({
        plugins: plugins.map(item => {
          const desc = (0, _item.getItemDescriptor)(item);
          if (!desc) throw new Error("Assertion failure - must be config item");
          return desc;
        }),
        presets: presets.map(item => {
          const desc = (0, _item.getItemDescriptor)(item);
          if (!desc) throw new Error("Assertion failure - must be config item");
          return desc;
        })
      }, passes[0])) return null;
    } catch (e) {
      throw /^\[BABEL\]/.test(e.message) || (e.message = `[BABEL] ${context.filename || "unknown"}: ${e.message}`), 
      e;
    }
    const opts = optionDefaults;
    return (0, _util.mergeOptions)(opts, options), opts.plugins = passes[0], opts.presets = passes.slice(1).filter(plugins => plugins.length > 0).map(plugins => ({
      plugins: plugins
    })), opts.passPerPreset = opts.presets.length > 0, {
      options: opts,
      passes: passes
    };
  }));
  exports.default = _default;
  const loadDescriptor = (0, _caching.makeWeakCache)((function*({value: value, options: options, dirname: dirname, alias: alias}, cache) {
    if (!1 === options) throw new Error("Assertion failure");
    options = options || {};
    let item = value;
    if ("function" == typeof value) {
      const api = Object.assign({}, context, (0, _configApi.default)(cache));
      try {
        item = value(api, options, dirname);
      } catch (e) {
        throw alias && (e.message += ` (While processing: ${JSON.stringify(alias)})`), e;
      }
    }
    if (!item || "object" != typeof item) throw new Error("Plugin/Preset did not return an object.");
    if ("function" == typeof item.then) throw yield* [], new Error("You appear to be using an async plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
    return {
      value: item,
      options: options,
      dirname: dirname,
      alias: alias
    };
  }));
  function* loadPluginDescriptor(descriptor, context) {
    if (descriptor.value instanceof _plugin.default) {
      if (descriptor.options) throw new Error("Passed options to an existing Plugin instance will not work.");
      return descriptor.value;
    }
    return yield* instantiatePlugin(yield* loadDescriptor(descriptor, context), context);
  }
  const instantiatePlugin = (0, _caching.makeWeakCache)((function*({value: value, options: options, dirname: dirname, alias: alias}, cache) {
    const pluginObj = (0, _plugins.validatePluginObject)(value), plugin = Object.assign({}, pluginObj);
    if (plugin.visitor && (plugin.visitor = _traverse().default.explode(Object.assign({}, plugin.visitor))), 
    plugin.inherits) {
      const inheritsDescriptor = {
        name: void 0,
        alias: alias + "$inherits",
        value: plugin.inherits,
        options: options,
        dirname: dirname
      }, inherits = yield* (0, _async.forwardAsync)(loadPluginDescriptor, run => cache.invalidate(data => run(inheritsDescriptor, data)));
      plugin.pre = chain(inherits.pre, plugin.pre), plugin.post = chain(inherits.post, plugin.post), 
      plugin.manipulateOptions = chain(inherits.manipulateOptions, plugin.manipulateOptions), 
      plugin.visitor = _traverse().default.visitors.merge([ inherits.visitor || {}, plugin.visitor || {} ]);
    }
    return new _plugin.default(plugin, options, alias);
  })), validateIfOptionNeedsFilename = (options, descriptor) => {
    if (options.test || options.include || options.exclude) {
      const formattedPresetName = descriptor.name ? `"${descriptor.name}"` : "/* your preset */";
      throw new Error([ `Preset ${formattedPresetName} requires a filename to be set when babel is called directly,`, "```", `babel.transform(code, { filename: 'file.ts', presets: [${formattedPresetName}] });`, "```", "See https://babeljs.io/docs/en/options#filename for more information." ].join("\n"));
    }
  };
  function* loadPresetDescriptor(descriptor, context) {
    const preset = instantiatePreset(yield* loadDescriptor(descriptor, context));
    return ((preset, context, descriptor) => {
      if (!context.filename) {
        const {options: options} = preset;
        validateIfOptionNeedsFilename(options, descriptor), options.overrides && options.overrides.forEach(overrideOptions => validateIfOptionNeedsFilename(overrideOptions, descriptor));
      }
    })(preset, context, descriptor), yield* (0, _configChain.buildPresetChain)(preset, context);
  }
  const instantiatePreset = (0, _caching.makeWeakCacheSync)(({value: value, dirname: dirname, alias: alias}) => ({
    options: (0, _options.validate)("preset", value),
    alias: alias,
    dirname: dirname
  }));
  function chain(a, b) {
    const fns = [ a, b ].filter(Boolean);
    return fns.length <= 1 ? fns[0] : function(...args) {
      for (const fn of fns) fn.apply(this, args);
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = {
    auxiliaryComment: {
      message: "Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"
    },
    blacklist: {
      message: "Put the specific transforms you want in the `plugins` option"
    },
    breakConfig: {
      message: "This is not a necessary option in Babel 6"
    },
    experimental: {
      message: "Put the specific transforms you want in the `plugins` option"
    },
    externalHelpers: {
      message: "Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"
    },
    extra: {
      message: ""
    },
    jsxPragma: {
      message: "use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"
    },
    loose: {
      message: "Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."
    },
    metadataUsedHelpers: {
      message: "Not required anymore as this is enabled by default"
    },
    modules: {
      message: "Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"
    },
    nonStandard: {
      message: "Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"
    },
    optional: {
      message: "Put the specific transforms you want in the `plugins` option"
    },
    sourceMapName: {
      message: "The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."
    },
    stage: {
      message: "Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"
    },
    whitelist: {
      message: "Put the specific transforms you want in the `plugins` option"
    },
    resolveModuleSource: {
      version: 6,
      message: "Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"
    },
    metadata: {
      version: 6,
      message: "Generated plugin metadata is always included in the output result"
    },
    sourceMapTarget: {
      version: 6,
      message: "The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.validatePluginObject = function(obj) {
    const rootPath = {
      type: "root",
      source: "plugin"
    };
    return Object.keys(obj).forEach(key => {
      const validator = VALIDATORS[key];
      if (!validator) {
        const invalidPluginPropertyError = new Error(`.${key} is not a valid Plugin property`);
        throw invalidPluginPropertyError.code = "BABEL_UNKNOWN_PLUGIN_PROPERTY", invalidPluginPropertyError;
      }
      validator({
        type: "option",
        name: key,
        parent: rootPath
      }, obj[key]);
    }), obj;
  };
  var _optionAssertions = __webpack_require__(231);
  const VALIDATORS = {
    name: _optionAssertions.assertString,
    manipulateOptions: _optionAssertions.assertFunction,
    pre: _optionAssertions.assertFunction,
    post: _optionAssertions.assertFunction,
    inherits: _optionAssertions.assertFunction,
    visitor: function(loc, value) {
      const obj = (0, _optionAssertions.assertObject)(loc, value);
      if (obj && (Object.keys(obj).forEach(prop => function(key, value) {
        if (value && "object" == typeof value) Object.keys(value).forEach(handler => {
          if ("enter" !== handler && "exit" !== handler) throw new Error(`.visitor["${key}"] may only have .enter and/or .exit handlers.`);
        }); else if ("function" != typeof value) throw new Error(`.visitor["${key}"] must be a function`);
        return value;
      }(prop, obj[prop])), obj.enter || obj.exit)) throw new Error((0, _optionAssertions.msg)(loc) + ' cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.');
      return obj;
    },
    parserOverride: _optionAssertions.assertFunction,
    generatorOverride: _optionAssertions.assertFunction
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.transformAsync = exports.transformSync = exports.transform = void 0;
  var _config = _interopRequireDefault(__webpack_require__(53)), _transformation = __webpack_require__(150);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const transformRunner = (0, _gensync().default)((function*(code, opts) {
    const config = yield* (0, _config.default)(opts);
    return null === config ? null : yield* (0, _transformation.run)(config, code);
  }));
  exports.transform = function(code, opts, callback) {
    if ("function" == typeof opts && (callback = opts, opts = void 0), void 0 === callback) return transformRunner.sync(code, opts);
    transformRunner.errback(code, opts, callback);
  };
  const transformSync = transformRunner.sync;
  exports.transformSync = transformSync;
  const transformAsync = transformRunner.async;
  exports.transformAsync = transformAsync;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = class {
    constructor(file, key, options) {
      this._map = new Map, this.key = key, this.file = file, this.opts = options || {}, 
      this.cwd = file.opts.cwd, this.filename = file.opts.filename;
    }
    set(key, val) {
      this._map.set(key, val);
    }
    get(key) {
      return this._map.get(key);
    }
    availableHelper(name, versionRange) {
      return this.file.availableHelper(name, versionRange);
    }
    addHelper(name) {
      return this.file.addHelper(name);
    }
    addImport() {
      return this.file.addImport();
    }
    getModuleName() {
      return this.file.getModuleName();
    }
    buildCodeFrameError(node, msg, Error) {
      return this.file.buildCodeFrameError(node, msg, Error);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _sortBy() {
    const data = _interopRequireDefault(__webpack_require__(301));
    return _sortBy = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function() {
    if (!LOADED_PLUGIN) {
      const config = _config.default.sync({
        babelrc: !1,
        configFile: !1,
        plugins: [ blockHoistPlugin ]
      });
      if (LOADED_PLUGIN = config ? config.passes[0][0] : void 0, !LOADED_PLUGIN) throw new Error("Assertion failure");
    }
    return LOADED_PLUGIN;
  };
  var _config = _interopRequireDefault(__webpack_require__(53));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  let LOADED_PLUGIN;
  const blockHoistPlugin = {
    name: "internal.blockHoist",
    visitor: {
      Block: {
        exit({node: node}) {
          let hasChange = !1;
          for (let i = 0; i < node.body.length; i++) {
            const bodyNode = node.body[i];
            if (null != (null == bodyNode ? void 0 : bodyNode._blockHoist)) {
              hasChange = !0;
              break;
            }
          }
          hasChange && (node.body = (0, _sortBy().default)(node.body, (function(bodyNode) {
            let priority = null == bodyNode ? void 0 : bodyNode._blockHoist;
            return null == priority && (priority = 1), !0 === priority && (priority = 2), -1 * priority;
          })));
        }
      }
    }
  };
}, function(module, exports, __webpack_require__) {
  var baseFlatten = __webpack_require__(302), baseOrderBy = __webpack_require__(304), baseRest = __webpack_require__(182), isIterateeCall = __webpack_require__(94), sortBy = baseRest((function(collection, iteratees) {
    if (null == collection) return [];
    var length = iteratees.length;
    return length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1]) ? iteratees = [] : length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2]) && (iteratees = [ iteratees[0] ]), 
    baseOrderBy(collection, baseFlatten(iteratees, 1), []);
  }));
  module.exports = sortBy;
}, function(module, exports, __webpack_require__) {
  var arrayPush = __webpack_require__(54), isFlattenable = __webpack_require__(303);
  module.exports = function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    for (predicate || (predicate = isFlattenable), result || (result = []); ++index < length; ) {
      var value = array[index];
      depth > 0 && predicate(value) ? depth > 1 ? baseFlatten(value, depth - 1, predicate, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value);
    }
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), isArguments = __webpack_require__(37), isArray = __webpack_require__(5), spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
  module.exports = function(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  };
}, function(module, exports, __webpack_require__) {
  var arrayMap = __webpack_require__(222), baseGet = __webpack_require__(151), baseIteratee = __webpack_require__(308), baseMap = __webpack_require__(330), baseSortBy = __webpack_require__(336), baseUnary = __webpack_require__(15), compareMultiple = __webpack_require__(337), identity = __webpack_require__(42), isArray = __webpack_require__(5);
  module.exports = function(collection, iteratees, orders) {
    iteratees = iteratees.length ? arrayMap(iteratees, (function(iteratee) {
      return isArray(iteratee) ? function(value) {
        return baseGet(value, 1 === iteratee.length ? iteratee[0] : iteratee);
      } : iteratee;
    })) : [ identity ];
    var index = -1;
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    var result = baseMap(collection, (function(value, key, collection) {
      return {
        criteria: arrayMap(iteratees, (function(iteratee) {
          return iteratee(value);
        })),
        index: ++index,
        value: value
      };
    }));
    return baseSortBy(result, (function(object, other) {
      return compareMultiple(object, other, orders);
    }));
  };
}, function(module, exports, __webpack_require__) {
  var memoizeCapped = __webpack_require__(306), rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped((function(string) {
    var result = [];
    return 46 === string.charCodeAt(0) && result.push(""), string.replace(rePropName, (function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    })), result;
  }));
  module.exports = stringToPath;
}, function(module, exports, __webpack_require__) {
  var memoize = __webpack_require__(307);
  module.exports = function(func) {
    var result = memoize(func, (function(key) {
      return 500 === cache.size && cache.clear(), key;
    })), cache = result.cache;
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var MapCache = __webpack_require__(73);
  function memoize(func, resolver) {
    if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError("Expected a function");
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) return cache.get(key);
      var result = func.apply(this, args);
      return memoized.cache = cache.set(key, result) || cache, result;
    };
    return memoized.cache = new (memoize.Cache || MapCache), memoized;
  }
  memoize.Cache = MapCache, module.exports = memoize;
}, function(module, exports, __webpack_require__) {
  var baseMatches = __webpack_require__(309), baseMatchesProperty = __webpack_require__(322), identity = __webpack_require__(42), isArray = __webpack_require__(5), property = __webpack_require__(327);
  module.exports = function(value) {
    return "function" == typeof value ? value : null == value ? identity : "object" == typeof value ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value);
  };
}, function(module, exports, __webpack_require__) {
  var baseIsMatch = __webpack_require__(310), getMatchData = __webpack_require__(321), matchesStrictComparable = __webpack_require__(237);
  module.exports = function(source) {
    var matchData = getMatchData(source);
    return 1 == matchData.length && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  };
}, function(module, exports, __webpack_require__) {
  var Stack = __webpack_require__(78), baseIsEqual = __webpack_require__(234);
  module.exports = function(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (null == object) return !length;
    for (object = Object(object); index--; ) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return !1;
    }
    for (;++index < length; ) {
      var key = (data = matchData[index])[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (void 0 === objValue && !(key in object)) return !1;
      } else {
        var stack = new Stack;
        if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
        if (!(void 0 === result ? baseIsEqual(srcValue, objValue, 3, customizer, stack) : result)) return !1;
      }
    }
    return !0;
  };
}, function(module, exports, __webpack_require__) {
  var Stack = __webpack_require__(78), equalArrays = __webpack_require__(235), equalByTag = __webpack_require__(317), equalObjects = __webpack_require__(320), getTag = __webpack_require__(33), isArray = __webpack_require__(5), isBuffer = __webpack_require__(32), isTypedArray = __webpack_require__(55), objectTag = "[object Object]", hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? "[object Array]" : getTag(object), othTag = othIsArr ? "[object Array]" : getTag(other), objIsObj = (objTag = "[object Arguments]" == objTag ? objectTag : objTag) == objectTag, othIsObj = (othTag = "[object Arguments]" == othTag ? objectTag : othTag) == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) return !1;
      objIsArr = !0, objIsObj = !1;
    }
    if (isSameTag && !objIsObj) return stack || (stack = new Stack), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    if (!(1 & bitmask)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        return stack || (stack = new Stack), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    return !!isSameTag && (stack || (stack = new Stack), equalObjects(object, other, bitmask, customizer, equalFunc, stack));
  };
}, function(module, exports, __webpack_require__) {
  var MapCache = __webpack_require__(73), setCacheAdd = __webpack_require__(313), setCacheHas = __webpack_require__(314);
  function SetCache(values) {
    var index = -1, length = null == values ? 0 : values.length;
    for (this.__data__ = new MapCache; ++index < length; ) this.add(values[index]);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd, SetCache.prototype.has = setCacheHas, 
  module.exports = SetCache;
}, function(module, exports) {
  module.exports = function(value) {
    return this.__data__.set(value, "__lodash_hash_undefined__"), this;
  };
}, function(module, exports) {
  module.exports = function(value) {
    return this.__data__.has(value);
  };
}, function(module, exports) {
  module.exports = function(array, predicate) {
    for (var index = -1, length = null == array ? 0 : array.length; ++index < length; ) if (predicate(array[index], index, array)) return !0;
    return !1;
  };
}, function(module, exports) {
  module.exports = function(cache, key) {
    return cache.has(key);
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), Uint8Array = __webpack_require__(100), eq = __webpack_require__(16), equalArrays = __webpack_require__(235), mapToArray = __webpack_require__(318), setToArray = __webpack_require__(319), symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  module.exports = function(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
     case "[object DataView]":
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
      object = object.buffer, other = other.buffer;

     case "[object ArrayBuffer]":
      return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other)));

     case "[object Boolean]":
     case "[object Date]":
     case "[object Number]":
      return eq(+object, +other);

     case "[object Error]":
      return object.name == other.name && object.message == other.message;

     case "[object RegExp]":
     case "[object String]":
      return object == other + "";

     case "[object Map]":
      var convert = mapToArray;

     case "[object Set]":
      var isPartial = 1 & bitmask;
      if (convert || (convert = setToArray), object.size != other.size && !isPartial) return !1;
      var stacked = stack.get(object);
      if (stacked) return stacked == other;
      bitmask |= 2, stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      return stack.delete(object), result;

     case "[object Symbol]":
      if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
    }
    return !1;
  };
}, function(module, exports) {
  module.exports = function(map) {
    var index = -1, result = Array(map.size);
    return map.forEach((function(value, key) {
      result[++index] = [ key, value ];
    })), result;
  };
}, function(module, exports) {
  module.exports = function(set) {
    var index = -1, result = Array(set.size);
    return set.forEach((function(value) {
      result[++index] = value;
    })), result;
  };
}, function(module, exports, __webpack_require__) {
  var getAllKeys = __webpack_require__(101), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = 1 & bitmask, objProps = getAllKeys(object), objLength = objProps.length;
    if (objLength != getAllKeys(other).length && !isPartial) return !1;
    for (var index = objLength; index--; ) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return !1;
    }
    var objStacked = stack.get(object), othStacked = stack.get(other);
    if (objStacked && othStacked) return objStacked == other && othStacked == object;
    var result = !0;
    stack.set(object, other), stack.set(other, object);
    for (var skipCtor = isPartial; ++index < objLength; ) {
      var objValue = object[key = objProps[index]], othValue = other[key];
      if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      if (!(void 0 === compared ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = !1;
        break;
      }
      skipCtor || (skipCtor = "constructor" == key);
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      objCtor == othCtor || !("constructor" in object) || !("constructor" in other) || "function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor || (result = !1);
    }
    return stack.delete(object), stack.delete(other), result;
  };
}, function(module, exports, __webpack_require__) {
  var isStrictComparable = __webpack_require__(236), keys = __webpack_require__(24);
  module.exports = function(object) {
    for (var result = keys(object), length = result.length; length--; ) {
      var key = result[length], value = object[key];
      result[length] = [ key, value, isStrictComparable(value) ];
    }
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var baseIsEqual = __webpack_require__(234), get = __webpack_require__(323), hasIn = __webpack_require__(324), isKey = __webpack_require__(152), isStrictComparable = __webpack_require__(236), matchesStrictComparable = __webpack_require__(237), toKey = __webpack_require__(99);
  module.exports = function(path, srcValue) {
    return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(toKey(path), srcValue) : function(object) {
      var objValue = get(object, path);
      return void 0 === objValue && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, 3);
    };
  };
}, function(module, exports, __webpack_require__) {
  var baseGet = __webpack_require__(151);
  module.exports = function(object, path, defaultValue) {
    var result = null == object ? void 0 : baseGet(object, path);
    return void 0 === result ? defaultValue : result;
  };
}, function(module, exports, __webpack_require__) {
  var baseHasIn = __webpack_require__(325), hasPath = __webpack_require__(326);
  module.exports = function(object, path) {
    return null != object && hasPath(object, path, baseHasIn);
  };
}, function(module, exports) {
  module.exports = function(object, key) {
    return null != object && key in Object(object);
  };
}, function(module, exports, __webpack_require__) {
  var castPath = __webpack_require__(233), isArguments = __webpack_require__(37), isArray = __webpack_require__(5), isIndex = __webpack_require__(31), isLength = __webpack_require__(19), toKey = __webpack_require__(99);
  module.exports = function(object, path, hasFunc) {
    for (var index = -1, length = (path = castPath(path, object)).length, result = !1; ++index < length; ) {
      var key = toKey(path[index]);
      if (!(result = null != object && hasFunc(object, key))) break;
      object = object[key];
    }
    return result || ++index != length ? result : !!(length = null == object ? 0 : object.length) && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  };
}, function(module, exports, __webpack_require__) {
  var baseProperty = __webpack_require__(328), basePropertyDeep = __webpack_require__(329), isKey = __webpack_require__(152), toKey = __webpack_require__(99);
  module.exports = function(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  };
}, function(module, exports) {
  module.exports = function(key) {
    return function(object) {
      return null == object ? void 0 : object[key];
    };
  };
}, function(module, exports, __webpack_require__) {
  var baseGet = __webpack_require__(151);
  module.exports = function(path) {
    return function(object) {
      return baseGet(object, path);
    };
  };
}, function(module, exports, __webpack_require__) {
  var baseEach = __webpack_require__(331), isArrayLike = __webpack_require__(13);
  module.exports = function(collection, iteratee) {
    var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
    return baseEach(collection, (function(value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    })), result;
  };
}, function(module, exports, __webpack_require__) {
  var baseForOwn = __webpack_require__(332), baseEach = __webpack_require__(335)(baseForOwn);
  module.exports = baseEach;
}, function(module, exports, __webpack_require__) {
  var baseFor = __webpack_require__(333), keys = __webpack_require__(24);
  module.exports = function(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  };
}, function(module, exports, __webpack_require__) {
  var baseFor = __webpack_require__(334)();
  module.exports = baseFor;
}, function(module, exports) {
  module.exports = function(fromRight) {
    return function(object, iteratee, keysFunc) {
      for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--; ) {
        var key = props[fromRight ? length : ++index];
        if (!1 === iteratee(iterable[key], key, iterable)) break;
      }
      return object;
    };
  };
}, function(module, exports, __webpack_require__) {
  var isArrayLike = __webpack_require__(13);
  module.exports = function(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (null == collection) return collection;
      if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
      for (var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection); (fromRight ? index-- : ++index < length) && !1 !== iteratee(iterable[index], index, iterable); ) ;
      return collection;
    };
  };
}, function(module, exports) {
  module.exports = function(array, comparer) {
    var length = array.length;
    for (array.sort(comparer); length--; ) array[length] = array[length].value;
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var compareAscending = __webpack_require__(338);
  module.exports = function(object, other, orders) {
    for (var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length; ++index < length; ) {
      var result = compareAscending(objCriteria[index], othCriteria[index]);
      if (result) return index >= ordersLength ? result : result * ("desc" == orders[index] ? -1 : 1);
    }
    return object.index - other.index;
  };
}, function(module, exports, __webpack_require__) {
  var isSymbol = __webpack_require__(64);
  module.exports = function(value, other) {
    if (value !== other) {
      var valIsDefined = void 0 !== value, valIsNull = null === value, valIsReflexive = value == value, valIsSymbol = isSymbol(value), othIsDefined = void 0 !== other, othIsNull = null === other, othIsReflexive = other == other, othIsSymbol = isSymbol(other);
      if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1;
      if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1;
    }
    return 0;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _fs() {
    const data = _interopRequireDefault(__webpack_require__(51));
    return _fs = function() {
      return data;
    }, data;
  }
  function _path() {
    const data = _interopRequireDefault(__webpack_require__(8));
    return _path = function() {
      return data;
    }, data;
  }
  function _debug() {
    const data = _interopRequireDefault(__webpack_require__(52));
    return _debug = function() {
      return data;
    }, data;
  }
  function _cloneDeep() {
    const data = _interopRequireDefault(__webpack_require__(340));
    return _cloneDeep = function() {
      return data;
    }, data;
  }
  function t() {
    const data = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    return t = function() {
      return data;
    }, data;
  }
  function _convertSourceMap() {
    const data = _interopRequireDefault(__webpack_require__(239));
    return _convertSourceMap = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function*(pluginPasses, options, code, ast) {
    if (code = "" + (code || ""), ast) {
      if ("Program" === ast.type) ast = t().file(ast, [], []); else if ("File" !== ast.type) throw new Error("AST root must be a Program or File node");
      ast = (0, _cloneDeep().default)(ast);
    } else ast = yield* (0, _parser.default)(pluginPasses, options, code);
    let inputMap = null;
    if (!1 !== options.inputSourceMap) {
      if ("object" == typeof options.inputSourceMap && (inputMap = _convertSourceMap().default.fromObject(options.inputSourceMap)), 
      !inputMap) {
        const lastComment = extractComments(INLINE_SOURCEMAP_REGEX, ast);
        if (lastComment) try {
          inputMap = _convertSourceMap().default.fromComment(lastComment);
        } catch (err) {
          debug("discarding unknown inline input sourcemap", err);
        }
      }
      if (!inputMap) {
        const lastComment = extractComments(EXTERNAL_SOURCEMAP_REGEX, ast);
        if ("string" == typeof options.filename && lastComment) try {
          const match = EXTERNAL_SOURCEMAP_REGEX.exec(lastComment), inputMapContent = _fs().default.readFileSync(_path().default.resolve(_path().default.dirname(options.filename), match[1]));
          inputMapContent.length > 1e6 ? debug("skip merging input map > 1 MB") : inputMap = _convertSourceMap().default.fromJSON(inputMapContent);
        } catch (err) {
          debug("discarding unknown file input sourcemap", err);
        } else lastComment && debug("discarding un-loadable file input sourcemap");
      }
    }
    return new _file.default(options, {
      code: code,
      ast: ast,
      inputMap: inputMap
    });
  };
  var _file = _interopRequireDefault(__webpack_require__(106)), _parser = _interopRequireDefault(__webpack_require__(240));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const debug = (0, _debug().default)("babel:transform:file");
  const INLINE_SOURCEMAP_REGEX = /^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/, EXTERNAL_SOURCEMAP_REGEX = /^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;
  function extractCommentsFromList(regex, comments, lastComment) {
    return comments && (comments = comments.filter(({value: value}) => !regex.test(value) || (lastComment = value, 
    !1))), [ comments, lastComment ];
  }
  function extractComments(regex, ast) {
    let lastComment = null;
    return t().traverseFast(ast, node => {
      [node.leadingComments, lastComment] = extractCommentsFromList(regex, node.leadingComments, lastComment), 
      [node.innerComments, lastComment] = extractCommentsFromList(regex, node.innerComments, lastComment), 
      [node.trailingComments, lastComment] = extractCommentsFromList(regex, node.trailingComments, lastComment);
    }), lastComment;
  }
}, function(module, exports, __webpack_require__) {
  var baseClone = __webpack_require__(189);
  module.exports = function(value) {
    return baseClone(value, 5);
  };
}, function(module, exports, __webpack_require__) {
  var buffer = __webpack_require__(342), Buffer = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) dst[key] = src[key];
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
  }
  Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), 
  exports.Buffer = SafeBuffer), copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(arg, encodingOrOffset, length) {
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
}, function(module, exports) {
  module.exports = require("buffer");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(missingPluginName, loc, codeFrame) {
    let helpMessage = `Support for the experimental syntax '${missingPluginName}' isn't currently enabled (${loc.line}:${loc.column + 1}):\n\n` + codeFrame;
    const pluginInfo = pluginNameMap[missingPluginName];
    if (pluginInfo) {
      const {syntax: syntaxPlugin, transform: transformPlugin} = pluginInfo;
      if (syntaxPlugin) {
        const syntaxPluginInfo = getNameURLCombination(syntaxPlugin);
        if (transformPlugin) {
          const transformPluginInfo = getNameURLCombination(transformPlugin), sectionType = transformPlugin.name.startsWith("@babel/plugin") ? "plugins" : "presets";
          helpMessage += `\n\nAdd ${transformPluginInfo} to the '${sectionType}' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add ${syntaxPluginInfo} to the 'plugins' section to enable parsing.`;
        } else helpMessage += `\n\nAdd ${syntaxPluginInfo} to the 'plugins' section of your Babel config to enable parsing.`;
      }
    }
    return helpMessage;
  };
  const pluginNameMap = {
    classProperties: {
      syntax: {
        name: "@babel/plugin-syntax-class-properties",
        url: "https://git.io/vb4yQ"
      },
      transform: {
        name: "@babel/plugin-proposal-class-properties",
        url: "https://git.io/vb4SL"
      }
    },
    classPrivateProperties: {
      syntax: {
        name: "@babel/plugin-syntax-class-properties",
        url: "https://git.io/vb4yQ"
      },
      transform: {
        name: "@babel/plugin-proposal-class-properties",
        url: "https://git.io/vb4SL"
      }
    },
    classPrivateMethods: {
      syntax: {
        name: "@babel/plugin-syntax-class-properties",
        url: "https://git.io/vb4yQ"
      },
      transform: {
        name: "@babel/plugin-proposal-private-methods",
        url: "https://git.io/JvpRG"
      }
    },
    decorators: {
      syntax: {
        name: "@babel/plugin-syntax-decorators",
        url: "https://git.io/vb4y9"
      },
      transform: {
        name: "@babel/plugin-proposal-decorators",
        url: "https://git.io/vb4ST"
      }
    },
    doExpressions: {
      syntax: {
        name: "@babel/plugin-syntax-do-expressions",
        url: "https://git.io/vb4yh"
      },
      transform: {
        name: "@babel/plugin-proposal-do-expressions",
        url: "https://git.io/vb4S3"
      }
    },
    dynamicImport: {
      syntax: {
        name: "@babel/plugin-syntax-dynamic-import",
        url: "https://git.io/vb4Sv"
      }
    },
    exportDefaultFrom: {
      syntax: {
        name: "@babel/plugin-syntax-export-default-from",
        url: "https://git.io/vb4SO"
      },
      transform: {
        name: "@babel/plugin-proposal-export-default-from",
        url: "https://git.io/vb4yH"
      }
    },
    exportNamespaceFrom: {
      syntax: {
        name: "@babel/plugin-syntax-export-namespace-from",
        url: "https://git.io/vb4Sf"
      },
      transform: {
        name: "@babel/plugin-proposal-export-namespace-from",
        url: "https://git.io/vb4SG"
      }
    },
    flow: {
      syntax: {
        name: "@babel/plugin-syntax-flow",
        url: "https://git.io/vb4yb"
      },
      transform: {
        name: "@babel/preset-flow",
        url: "https://git.io/JfeDn"
      }
    },
    functionBind: {
      syntax: {
        name: "@babel/plugin-syntax-function-bind",
        url: "https://git.io/vb4y7"
      },
      transform: {
        name: "@babel/plugin-proposal-function-bind",
        url: "https://git.io/vb4St"
      }
    },
    functionSent: {
      syntax: {
        name: "@babel/plugin-syntax-function-sent",
        url: "https://git.io/vb4yN"
      },
      transform: {
        name: "@babel/plugin-proposal-function-sent",
        url: "https://git.io/vb4SZ"
      }
    },
    importMeta: {
      syntax: {
        name: "@babel/plugin-syntax-import-meta",
        url: "https://git.io/vbKK6"
      }
    },
    jsx: {
      syntax: {
        name: "@babel/plugin-syntax-jsx",
        url: "https://git.io/vb4yA"
      },
      transform: {
        name: "@babel/preset-react",
        url: "https://git.io/JfeDR"
      }
    },
    logicalAssignment: {
      syntax: {
        name: "@babel/plugin-syntax-logical-assignment-operators",
        url: "https://git.io/vAlBp"
      },
      transform: {
        name: "@babel/plugin-proposal-logical-assignment-operators",
        url: "https://git.io/vAlRe"
      }
    },
    moduleAttributes: {
      syntax: {
        name: "@babel/plugin-syntax-module-attributes",
        url: "https://git.io/JfK3k"
      }
    },
    numericSeparator: {
      syntax: {
        name: "@babel/plugin-syntax-numeric-separator",
        url: "https://git.io/vb4Sq"
      },
      transform: {
        name: "@babel/plugin-proposal-numeric-separator",
        url: "https://git.io/vb4yS"
      }
    },
    optionalChaining: {
      syntax: {
        name: "@babel/plugin-syntax-optional-chaining",
        url: "https://git.io/vb4Sc"
      },
      transform: {
        name: "@babel/plugin-proposal-optional-chaining",
        url: "https://git.io/vb4Sk"
      }
    },
    pipelineOperator: {
      syntax: {
        name: "@babel/plugin-syntax-pipeline-operator",
        url: "https://git.io/vb4yj"
      },
      transform: {
        name: "@babel/plugin-proposal-pipeline-operator",
        url: "https://git.io/vb4SU"
      }
    },
    privateIn: {
      syntax: {
        name: "@babel/plugin-syntax-private-property-in-object",
        url: "https://git.io/JfK3q"
      },
      transform: {
        name: "@babel/plugin-proposal-private-property-in-object",
        url: "https://git.io/JfK3O"
      }
    },
    recordAndTuple: {
      syntax: {
        name: "@babel/plugin-syntax-record-and-tuple",
        url: "https://git.io/JvKp3"
      }
    },
    throwExpressions: {
      syntax: {
        name: "@babel/plugin-syntax-throw-expressions",
        url: "https://git.io/vb4SJ"
      },
      transform: {
        name: "@babel/plugin-proposal-throw-expressions",
        url: "https://git.io/vb4yF"
      }
    },
    typescript: {
      syntax: {
        name: "@babel/plugin-syntax-typescript",
        url: "https://git.io/vb4SC"
      },
      transform: {
        name: "@babel/preset-typescript",
        url: "https://git.io/JfeDz"
      }
    },
    asyncGenerators: {
      syntax: {
        name: "@babel/plugin-syntax-async-generators",
        url: "https://git.io/vb4SY"
      },
      transform: {
        name: "@babel/plugin-proposal-async-generator-functions",
        url: "https://git.io/vb4yp"
      }
    },
    nullishCoalescingOperator: {
      syntax: {
        name: "@babel/plugin-syntax-nullish-coalescing-operator",
        url: "https://git.io/vb4yx"
      },
      transform: {
        name: "@babel/plugin-proposal-nullish-coalescing-operator",
        url: "https://git.io/vb4Se"
      }
    },
    objectRestSpread: {
      syntax: {
        name: "@babel/plugin-syntax-object-rest-spread",
        url: "https://git.io/vb4y5"
      },
      transform: {
        name: "@babel/plugin-proposal-object-rest-spread",
        url: "https://git.io/vb4Ss"
      }
    },
    optionalCatchBinding: {
      syntax: {
        name: "@babel/plugin-syntax-optional-catch-binding",
        url: "https://git.io/vb4Sn"
      },
      transform: {
        name: "@babel/plugin-proposal-optional-catch-binding",
        url: "https://git.io/vb4SI"
      }
    }
  };
  pluginNameMap.privateIn.syntax = pluginNameMap.privateIn.transform;
  const getNameURLCombination = ({name: name, url: url}) => `${name} (${url})`;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _convertSourceMap() {
    const data = _interopRequireDefault(__webpack_require__(239));
    return _convertSourceMap = function() {
      return data;
    }, data;
  }
  function _generator() {
    const data = _interopRequireDefault(__webpack_require__(95));
    return _generator = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(pluginPasses, file) {
    const {opts: opts, ast: ast, code: code, inputMap: inputMap} = file, results = [];
    for (const plugins of pluginPasses) for (const plugin of plugins) {
      const {generatorOverride: generatorOverride} = plugin;
      if (generatorOverride) {
        const result = generatorOverride(ast, opts.generatorOpts, code, _generator().default);
        void 0 !== result && results.push(result);
      }
    }
    let result;
    if (0 === results.length) result = (0, _generator().default)(ast, opts.generatorOpts, code); else {
      if (1 !== results.length) throw new Error("More than one plugin attempted to override codegen.");
      if (result = results[0], "function" == typeof result.then) throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
    }
    let {code: outputCode, map: outputMap} = result;
    outputMap && inputMap && (outputMap = (0, _mergeMap.default)(inputMap.toObject(), outputMap));
    "inline" !== opts.sourceMaps && "both" !== opts.sourceMaps || (outputCode += "\n" + _convertSourceMap().default.fromObject(outputMap).toComment());
    "inline" === opts.sourceMaps && (outputMap = null);
    return {
      outputCode: outputCode,
      outputMap: outputMap
    };
  };
  var _mergeMap = _interopRequireDefault(__webpack_require__(345));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _sourceMap() {
    const data = (obj = __webpack_require__(96)) && obj.__esModule ? obj : {
      default: obj
    };
    var obj;
    return _sourceMap = function() {
      return data;
    }, data;
  }
  function makeMappingKey(item) {
    return `${item.line}/${item.columnStart}`;
  }
  function buildMappingData(map) {
    const consumer = new (_sourceMap().default.SourceMapConsumer)(Object.assign({}, map, {
      sourceRoot: null
    })), sources = new Map, mappings = new Map;
    let last = null;
    return consumer.computeColumnSpans(), consumer.eachMapping(m => {
      if (null === m.originalLine) return;
      let source = sources.get(m.source);
      source || (source = {
        path: m.source,
        content: consumer.sourceContentFor(m.source, !0)
      }, sources.set(m.source, source));
      let sourceData = mappings.get(source);
      sourceData || (sourceData = {
        source: source,
        mappings: []
      }, mappings.set(source, sourceData));
      const obj = {
        line: m.originalLine,
        columnStart: m.originalColumn,
        columnEnd: 1 / 0,
        name: m.name
      };
      last && last.source === source && last.mapping.line === m.originalLine && (last.mapping.columnEnd = m.originalColumn), 
      last = {
        source: source,
        mapping: obj
      }, sourceData.mappings.push({
        original: obj,
        generated: consumer.allGeneratedPositionsFor({
          source: m.source,
          line: m.originalLine,
          column: m.originalColumn
        }).map(item => ({
          line: item.line,
          columnStart: item.column,
          columnEnd: item.lastColumn + 1
        }))
      });
    }, null, _sourceMap().default.SourceMapConsumer.ORIGINAL_ORDER), {
      file: map.file,
      sourceRoot: map.sourceRoot,
      sources: Array.from(mappings.values())
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(inputMap, map) {
    const input = buildMappingData(inputMap), output = buildMappingData(map), mergedGenerator = new (_sourceMap().default.SourceMapGenerator);
    for (const {source: source} of input.sources) "string" == typeof source.content && mergedGenerator.setSourceContent(source.path, source.content);
    if (1 === output.sources.length) {
      const defaultSource = output.sources[0], insertedMappings = new Map;
      !function(map, callback) {
        for (const {source: source, mappings: mappings} of map.sources) for (const {original: original, generated: generated} of mappings) for (const item of generated) callback(item, original, source);
      }(input, (generated, original, source) => {
        !function(outputFile, inputGeneratedRange, callback) {
          const overlappingOriginal = function({mappings: mappings}, {line: line, columnStart: columnStart, columnEnd: columnEnd}) {
            return function(array, callback) {
              const start = function(array, callback) {
                let left = 0, right = array.length;
                for (;left < right; ) {
                  const mid = Math.floor((left + right) / 2), item = array[mid], result = callback(item);
                  if (0 === result) {
                    left = mid;
                    break;
                  }
                  result >= 0 ? right = mid : left = mid + 1;
                }
                let i = left;
                if (i < array.length) {
                  for (;i >= 0 && callback(array[i]) >= 0; ) i--;
                  return i + 1;
                }
                return i;
              }(array, callback), results = [];
              for (let i = start; i < array.length && 0 === callback(array[i]); i++) results.push(array[i]);
              return results;
            }(mappings, ({original: outOriginal}) => line > outOriginal.line ? -1 : line < outOriginal.line ? 1 : columnStart >= outOriginal.columnEnd ? -1 : columnEnd <= outOriginal.columnStart ? 1 : 0);
          }(outputFile, inputGeneratedRange);
          for (const {generated: generated} of overlappingOriginal) for (const item of generated) callback(item);
        }(defaultSource, generated, item => {
          const key = makeMappingKey(item);
          insertedMappings.has(key) || (insertedMappings.set(key, item), mergedGenerator.addMapping({
            source: source.path,
            original: {
              line: original.line,
              column: original.columnStart
            },
            generated: {
              line: item.line,
              column: item.columnStart
            },
            name: original.name
          }));
        });
      });
      for (const item of insertedMappings.values()) {
        if (item.columnEnd === 1 / 0) continue;
        const clearItem = {
          line: item.line,
          columnStart: item.columnEnd
        }, key = makeMappingKey(clearItem);
        insertedMappings.has(key) || mergedGenerator.addMapping({
          generated: {
            line: clearItem.line,
            column: clearItem.columnStart
          }
        });
      }
    }
    const result = mergedGenerator.toJSON();
    "string" == typeof input.sourceRoot && (result.sourceRoot = input.sourceRoot);
    return result;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.transformFileAsync = exports.transformFileSync = exports.transformFile = void 0;
  var _config = _interopRequireDefault(__webpack_require__(53)), _transformation = __webpack_require__(150), fs = function(obj) {
    if (obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
      default: obj
    };
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    newObj.default = obj, cache && cache.set(obj, newObj);
    return newObj;
  }(__webpack_require__(139));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const transformFileRunner = (0, _gensync().default)((function*(filename, opts) {
    const options = Object.assign({}, opts, {
      filename: filename
    }), config = yield* (0, _config.default)(options);
    if (null === config) return null;
    const code = yield* fs.readFile(filename, "utf8");
    return yield* (0, _transformation.run)(config, code);
  })), transformFile = transformFileRunner.errback;
  exports.transformFile = transformFile;
  const transformFileSync = transformFileRunner.sync;
  exports.transformFileSync = transformFileSync;
  const transformFileAsync = transformFileRunner.async;
  exports.transformFileAsync = transformFileAsync;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.transformFromAstAsync = exports.transformFromAstSync = exports.transformFromAst = void 0;
  var _config = _interopRequireDefault(__webpack_require__(53)), _transformation = __webpack_require__(150);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const transformFromAstRunner = (0, _gensync().default)((function*(ast, code, opts) {
    const config = yield* (0, _config.default)(opts);
    if (null === config) return null;
    if (!ast) throw new Error("No AST given");
    return yield* (0, _transformation.run)(config, code, ast);
  }));
  exports.transformFromAst = function(ast, code, opts, callback) {
    if ("function" == typeof opts && (callback = opts, opts = void 0), void 0 === callback) return transformFromAstRunner.sync(ast, code, opts);
    transformFromAstRunner.errback(ast, code, opts, callback);
  };
  const transformFromAstSync = transformFromAstRunner.sync;
  exports.transformFromAstSync = transformFromAstSync;
  const transformFromAstAsync = transformFromAstRunner.async;
  exports.transformFromAstAsync = transformFromAstAsync;
}, function(module, exports, __webpack_require__) {
  "use strict";
  function _gensync() {
    const data = _interopRequireDefault(__webpack_require__(10));
    return _gensync = function() {
      return data;
    }, data;
  }
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.parseAsync = exports.parseSync = exports.parse = void 0;
  var _config = _interopRequireDefault(__webpack_require__(53)), _parser = _interopRequireDefault(__webpack_require__(240)), _normalizeOpts = _interopRequireDefault(__webpack_require__(238));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const parseRunner = (0, _gensync().default)((function*(code, opts) {
    const config = yield* (0, _config.default)(opts);
    return null === config ? null : yield* (0, _parser.default)(config.passes, (0, _normalizeOpts.default)(config), code);
  }));
  exports.parse = function(code, opts, callback) {
    if ("function" == typeof opts && (callback = opts, opts = void 0), void 0 === callback) return parseRunner.sync(code, opts);
    parseRunner.errback(code, opts, callback);
  };
  const parseSync = parseRunner.sync;
  exports.parseSync = parseSync;
  const parseAsync = parseRunner.async;
  exports.parseAsync = parseAsync;
} ]);