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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 92);
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
}, , function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(1).Symbol;
  module.exports = Symbol;
}, , , , function(module, exports, __webpack_require__) {
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
}, , , , , , function(module, exports) {
  var objectProto = Object.prototype;
  module.exports = function(value) {
    var Ctor = value && value.constructor;
    return value === ("function" == typeof Ctor && Ctor.prototype || objectProto);
  };
}, , function(module, exports, __webpack_require__) {
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
}, , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = exports.SHOULD_SKIP = exports.SHOULD_STOP = exports.REMOVED = void 0;
  var virtualTypes = _interopRequireWildcard(__webpack_require__(258)), _debug = _interopRequireDefault(__webpack_require__(52)), _index = _interopRequireDefault(__webpack_require__(92)), _scope = _interopRequireDefault(__webpack_require__(259)), t = _interopRequireWildcard(__webpack_require__(0)), _cache = __webpack_require__(104), _generator = _interopRequireDefault(__webpack_require__(95)), NodePath_ancestry = _interopRequireWildcard(__webpack_require__(406)), NodePath_inference = _interopRequireWildcard(__webpack_require__(407)), NodePath_replacement = _interopRequireWildcard(__webpack_require__(410)), NodePath_evaluation = _interopRequireWildcard(__webpack_require__(411)), NodePath_conversion = _interopRequireWildcard(__webpack_require__(412)), NodePath_introspection = _interopRequireWildcard(__webpack_require__(415)), NodePath_context = _interopRequireWildcard(__webpack_require__(416)), NodePath_removal = _interopRequireWildcard(__webpack_require__(417)), NodePath_modification = _interopRequireWildcard(__webpack_require__(419)), NodePath_family = _interopRequireWildcard(__webpack_require__(421)), NodePath_comments = _interopRequireWildcard(__webpack_require__(422));
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
  const debug = (0, _debug.default)("babel");
  exports.REMOVED = 1;
  exports.SHOULD_STOP = 2;
  exports.SHOULD_SKIP = 4;
  class NodePath {
    constructor(hub, parent) {
      this.parent = parent, this.hub = hub, this.contexts = [], this.data = null, this._traverseFlags = 0, 
      this.state = null, this.opts = null, this.skipKeys = null, this.parentPath = null, 
      this.context = null, this.container = null, this.listKey = null, this.key = null, 
      this.node = null, this.scope = null, this.type = null;
    }
    static get({hub: hub, parentPath: parentPath, parent: parent, container: container, listKey: listKey, key: key}) {
      if (!hub && parentPath && (hub = parentPath.hub), !parent) throw new Error("To get a node path the parent needs to exist");
      const targetNode = container[key], paths = _cache.path.get(parent) || [];
      let path;
      _cache.path.has(parent) || _cache.path.set(parent, paths);
      for (let i = 0; i < paths.length; i++) {
        const pathCheck = paths[i];
        if (pathCheck.node === targetNode) {
          path = pathCheck;
          break;
        }
      }
      return path || (path = new NodePath(hub, parent), paths.push(path)), path.setup(parentPath, container, listKey, key), 
      path;
    }
    getScope(scope) {
      return this.isScope() ? new _scope.default(this) : scope;
    }
    setData(key, val) {
      return null == this.data && (this.data = Object.create(null)), this.data[key] = val;
    }
    getData(key, def) {
      null == this.data && (this.data = Object.create(null));
      let val = this.data[key];
      return void 0 === val && void 0 !== def && (val = this.data[key] = def), val;
    }
    buildCodeFrameError(msg, Error = SyntaxError) {
      return this.hub.buildError(this.node, msg, Error);
    }
    traverse(visitor, state) {
      (0, _index.default)(this.node, visitor, this.scope, state, this);
    }
    set(key, node) {
      t.validate(this.node, key, node), this.node[key] = node;
    }
    getPathLocation() {
      const parts = [];
      let path = this;
      do {
        let key = path.key;
        path.inList && (key = `${path.listKey}[${key}]`), parts.unshift(key);
      } while (path = path.parentPath);
      return parts.join(".");
    }
    debug(message) {
      debug.enabled && debug(`${this.getPathLocation()} ${this.type}: ${message}`);
    }
    toString() {
      return (0, _generator.default)(this.node).code;
    }
    get inList() {
      return !!this.listKey;
    }
    set inList(inList) {
      inList || (this.listKey = null);
    }
    get parentKey() {
      return this.listKey || this.key;
    }
    get shouldSkip() {
      return !!(4 & this._traverseFlags);
    }
    set shouldSkip(v) {
      v ? this._traverseFlags |= 4 : this._traverseFlags &= -5;
    }
    get shouldStop() {
      return !!(2 & this._traverseFlags);
    }
    set shouldStop(v) {
      v ? this._traverseFlags |= 2 : this._traverseFlags &= -3;
    }
    get removed() {
      return !!(1 & this._traverseFlags);
    }
    set removed(v) {
      v ? this._traverseFlags |= 1 : this._traverseFlags &= -2;
    }
  }
  exports.default = NodePath, Object.assign(NodePath.prototype, NodePath_ancestry, NodePath_inference, NodePath_replacement, NodePath_evaluation, NodePath_conversion, NodePath_introspection, NodePath_context, NodePath_removal, NodePath_modification, NodePath_family, NodePath_comments);
  for (const type of t.TYPES) {
    const typeKey = "is" + type, fn = t[typeKey];
    NodePath.prototype[typeKey] = function(opts) {
      return fn(this.node, opts);
    }, NodePath.prototype["assert" + type] = function(opts) {
      if (!fn(this.node, opts)) throw new TypeError("Expected node path of type " + type);
    };
  }
  for (const type of Object.keys(virtualTypes)) {
    if ("_" === type[0]) continue;
    t.TYPES.indexOf(type) < 0 && t.TYPES.push(type);
    const virtualType = virtualTypes[type];
    NodePath.prototype["is" + type] = function(opts) {
      return virtualType.checkPath(this, opts);
    };
  }
}, function(module, exports, __webpack_require__) {
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
}, , , function(module, exports, __webpack_require__) {
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
}, , , , , function(module, exports) {
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
}, , , function(module, exports, __webpack_require__) {
  "undefined" == typeof process || "renderer" === process.type || !0 === process.browser || process.__nwjs ? module.exports = __webpack_require__(140) : module.exports = __webpack_require__(142);
}, , , function(module, exports, __webpack_require__) {
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
}, , function(module, exports, __webpack_require__) {
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
}, , function(module, exports, __webpack_require__) {
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
}, , function(module, exports, __webpack_require__) {
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
}, , , , function(module, exports) {
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
}, , , , function(module, exports, __webpack_require__) {
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
}, , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = traverse, Object.defineProperty(exports, "NodePath", {
    enumerable: !0,
    get: function() {
      return _path.default;
    }
  }), Object.defineProperty(exports, "Scope", {
    enumerable: !0,
    get: function() {
      return _scope.default;
    }
  }), Object.defineProperty(exports, "Hub", {
    enumerable: !0,
    get: function() {
      return _hub.default;
    }
  }), exports.visitors = void 0;
  var _context = _interopRequireDefault(__webpack_require__(401)), visitors = _interopRequireWildcard(__webpack_require__(423));
  exports.visitors = visitors;
  var t = _interopRequireWildcard(__webpack_require__(0)), cache = _interopRequireWildcard(__webpack_require__(104)), _path = _interopRequireDefault(__webpack_require__(34)), _scope = _interopRequireDefault(__webpack_require__(259)), _hub = _interopRequireDefault(__webpack_require__(424));
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
  function traverse(parent, opts, scope, state, parentPath) {
    if (parent) {
      if (opts || (opts = {}), !opts.noScope && !scope && "Program" !== parent.type && "File" !== parent.type) throw new Error(`You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a ${parent.type} node without passing scope and parentPath.`);
      t.VISITOR_KEYS[parent.type] && (visitors.explode(opts), traverse.node(parent, opts, scope, state, parentPath));
    }
  }
  function hasBlacklistedType(path, state) {
    path.node.type === state.type && (state.has = !0, path.stop());
  }
  traverse.visitors = visitors, traverse.verify = visitors.verify, traverse.explode = visitors.explode, 
  traverse.cheap = function(node, enter) {
    return t.traverseFast(node, enter);
  }, traverse.node = function(node, opts, scope, state, parentPath, skipKeys) {
    const keys = t.VISITOR_KEYS[node.type];
    if (!keys) return;
    const context = new _context.default(scope, opts, state, parentPath);
    for (const key of keys) if ((!skipKeys || !skipKeys[key]) && context.visit(node, key)) return;
  }, traverse.clearNode = function(node, opts) {
    t.removeProperties(node, opts), cache.path.delete(node);
  }, traverse.removeProperties = function(tree, opts) {
    return t.traverseFast(tree, traverse.clearNode, opts), tree;
  }, traverse.hasType = function(tree, type, blacklistTypes) {
    if (null == blacklistTypes ? void 0 : blacklistTypes.includes(tree.type)) return !1;
    if (tree.type === type) return !0;
    const state = {
      has: !1,
      type: type
    };
    return traverse(tree, {
      noScope: !0,
      blacklist: blacklistTypes,
      enter: hasBlacklistedType
    }, null, state), state.has;
  }, traverse.cache = cache;
}, , function(module, exports, __webpack_require__) {
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
}, , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.clear = function() {
    clearPath(), clearScope();
  }, exports.clearPath = clearPath, exports.clearScope = clearScope, exports.scope = exports.path = void 0;
  let path = new WeakMap;
  exports.path = path;
  let scope = new WeakMap;
  function clearPath() {
    exports.path = path = new WeakMap;
  }
  function clearScope() {
    exports.scope = scope = new WeakMap;
  }
  exports.scope = scope;
}, , , function(module, exports, __webpack_require__) {
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
}, , , , function(module, exports, __webpack_require__) {
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
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
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
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.ForAwaitStatement = exports.NumericLiteralTypeAnnotation = exports.ExistentialTypeParam = exports.SpreadProperty = exports.RestProperty = exports.Flow = exports.Pure = exports.Generated = exports.User = exports.Var = exports.BlockScoped = exports.Referenced = exports.Scope = exports.Expression = exports.Statement = exports.BindingIdentifier = exports.ReferencedMemberExpression = exports.ReferencedIdentifier = void 0;
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
  const ReferencedIdentifier = {
    types: [ "Identifier", "JSXIdentifier" ],
    checkPath(path, opts) {
      const {node: node, parent: parent} = path;
      if (!t.isIdentifier(node, opts) && !t.isJSXMemberExpression(parent, opts)) {
        if (!t.isJSXIdentifier(node, opts)) return !1;
        if (t.react.isCompatTag(node.name)) return !1;
      }
      return t.isReferenced(node, parent, path.parentPath.parent);
    }
  };
  exports.ReferencedIdentifier = ReferencedIdentifier;
  const ReferencedMemberExpression = {
    types: [ "MemberExpression" ],
    checkPath: ({node: node, parent: parent}) => t.isMemberExpression(node) && t.isReferenced(node, parent)
  };
  exports.ReferencedMemberExpression = ReferencedMemberExpression;
  const BindingIdentifier = {
    types: [ "Identifier" ],
    checkPath(path) {
      const {node: node, parent: parent} = path, grandparent = path.parentPath.parent;
      return t.isIdentifier(node) && t.isBinding(node, parent, grandparent);
    }
  };
  exports.BindingIdentifier = BindingIdentifier;
  const Statement = {
    types: [ "Statement" ],
    checkPath({node: node, parent: parent}) {
      if (t.isStatement(node)) {
        if (t.isVariableDeclaration(node)) {
          if (t.isForXStatement(parent, {
            left: node
          })) return !1;
          if (t.isForStatement(parent, {
            init: node
          })) return !1;
        }
        return !0;
      }
      return !1;
    }
  };
  exports.Statement = Statement;
  const Expression = {
    types: [ "Expression" ],
    checkPath: path => path.isIdentifier() ? path.isReferencedIdentifier() : t.isExpression(path.node)
  };
  exports.Expression = Expression;
  const Scope = {
    types: [ "Scopable", "Pattern" ],
    checkPath: path => t.isScope(path.node, path.parent)
  };
  exports.Scope = Scope;
  const Referenced = {
    checkPath: path => t.isReferenced(path.node, path.parent)
  };
  exports.Referenced = Referenced;
  const BlockScoped = {
    checkPath: path => t.isBlockScoped(path.node)
  };
  exports.BlockScoped = BlockScoped;
  const Var = {
    types: [ "VariableDeclaration" ],
    checkPath: path => t.isVar(path.node)
  };
  exports.Var = Var;
  const User = {
    checkPath: path => path.node && !!path.node.loc
  };
  exports.User = User;
  const Generated = {
    checkPath: path => !path.isUser()
  };
  exports.Generated = Generated;
  const Pure = {
    checkPath: (path, opts) => path.scope.isPure(path.node, opts)
  };
  exports.Pure = Pure;
  const Flow = {
    types: [ "Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier" ],
    checkPath: ({node: node}) => !!t.isFlow(node) || (t.isImportDeclaration(node) ? "type" === node.importKind || "typeof" === node.importKind : t.isExportDeclaration(node) ? "type" === node.exportKind : !!t.isImportSpecifier(node) && ("type" === node.importKind || "typeof" === node.importKind))
  };
  exports.Flow = Flow;
  const RestProperty = {
    types: [ "RestElement" ],
    checkPath: path => path.parentPath && path.parentPath.isObjectPattern()
  };
  exports.RestProperty = RestProperty;
  const SpreadProperty = {
    types: [ "RestElement" ],
    checkPath: path => path.parentPath && path.parentPath.isObjectExpression()
  };
  exports.SpreadProperty = SpreadProperty;
  exports.ExistentialTypeParam = {
    types: [ "ExistsTypeAnnotation" ]
  };
  exports.NumericLiteralTypeAnnotation = {
    types: [ "NumberLiteralTypeAnnotation" ]
  };
  const ForAwaitStatement = {
    types: [ "ForOfStatement" ],
    checkPath: ({node: node}) => !0 === node.await
  };
  exports.ForAwaitStatement = ForAwaitStatement;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _renamer = _interopRequireDefault(__webpack_require__(402)), _index = _interopRequireDefault(__webpack_require__(92)), _defaults = _interopRequireDefault(__webpack_require__(403)), _binding = _interopRequireDefault(__webpack_require__(260)), _globals = _interopRequireDefault(__webpack_require__(404)), t = function(obj) {
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
  }(__webpack_require__(0)), _cache = __webpack_require__(104);
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
  const collectorVisitor = {
    For(path) {
      for (const key of t.FOR_INIT_KEYS) {
        const declar = path.get(key);
        if (declar.isVar()) {
          (path.scope.getFunctionParent() || path.scope.getProgramParent()).registerBinding("var", declar);
        }
      }
    },
    Declaration(path) {
      if (path.isBlockScoped()) return;
      if (path.isExportDeclaration() && path.get("declaration").isDeclaration()) return;
      (path.scope.getFunctionParent() || path.scope.getProgramParent()).registerDeclaration(path);
    },
    ReferencedIdentifier(path, state) {
      state.references.push(path);
    },
    ForXStatement(path, state) {
      const left = path.get("left");
      (left.isPattern() || left.isIdentifier()) && state.constantViolations.push(path);
    },
    ExportDeclaration: {
      exit(path) {
        const {node: node, scope: scope} = path, declar = node.declaration;
        if (t.isClassDeclaration(declar) || t.isFunctionDeclaration(declar)) {
          const id = declar.id;
          if (!id) return;
          const binding = scope.getBinding(id.name);
          binding && binding.reference(path);
        } else if (t.isVariableDeclaration(declar)) for (const decl of declar.declarations) for (const name of Object.keys(t.getBindingIdentifiers(decl))) {
          const binding = scope.getBinding(name);
          binding && binding.reference(path);
        }
      }
    },
    LabeledStatement(path) {
      path.scope.getProgramParent().addGlobal(path.node), path.scope.getBlockParent().registerDeclaration(path);
    },
    AssignmentExpression(path, state) {
      state.assignments.push(path);
    },
    UpdateExpression(path, state) {
      state.constantViolations.push(path);
    },
    UnaryExpression(path, state) {
      "delete" === path.node.operator && state.constantViolations.push(path);
    },
    BlockScoped(path) {
      let scope = path.scope;
      scope.path === path && (scope = scope.parent);
      if (scope.getBlockParent().registerDeclaration(path), path.isClassDeclaration() && path.node.id) {
        const name = path.node.id.name;
        path.scope.bindings[name] = path.scope.parent.getBinding(name);
      }
    },
    Block(path) {
      const paths = path.get("body");
      for (const bodyPath of paths) bodyPath.isFunctionDeclaration() && path.scope.getBlockParent().registerDeclaration(bodyPath);
    },
    CatchClause(path) {
      path.scope.registerBinding("let", path);
    },
    Function(path) {
      path.isFunctionExpression() && path.has("id") && !path.get("id").node[t.NOT_LOCAL_BINDING] && path.scope.registerBinding("local", path.get("id"), path);
      const params = path.get("params");
      for (const param of params) path.scope.registerBinding("param", param);
    },
    ClassExpression(path) {
      path.has("id") && !path.get("id").node[t.NOT_LOCAL_BINDING] && path.scope.registerBinding("local", path);
    }
  };
  let uid = 0;
  class Scope {
    constructor(path) {
      const {node: node} = path, cached = _cache.scope.get(node);
      if ((null == cached ? void 0 : cached.path) === path) return cached;
      _cache.scope.set(node, this), this.uid = uid++, this.block = node, this.path = path, 
      this.labels = new Map, this.inited = !1;
    }
    get parent() {
      const parent = this.path.findParent(p => p.isScope());
      return null == parent ? void 0 : parent.scope;
    }
    get parentBlock() {
      return this.path.parent;
    }
    get hub() {
      return this.path.hub;
    }
    traverse(node, opts, state) {
      (0, _index.default)(node, opts, this, state, this.path);
    }
    generateDeclaredUidIdentifier(name) {
      const id = this.generateUidIdentifier(name);
      return this.push({
        id: id
      }), t.cloneNode(id);
    }
    generateUidIdentifier(name) {
      return t.identifier(this.generateUid(name));
    }
    generateUid(name = "temp") {
      let uid;
      name = t.toIdentifier(name).replace(/^_+/, "").replace(/[0-9]+$/g, "");
      let i = 0;
      do {
        uid = this._generateUid(name, i), i++;
      } while (this.hasLabel(uid) || this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));
      const program = this.getProgramParent();
      return program.references[uid] = !0, program.uids[uid] = !0, uid;
    }
    _generateUid(name, i) {
      let id = name;
      return i > 1 && (id += i), "_" + id;
    }
    generateUidBasedOnNode(node, defaultName) {
      const parts = [];
      !function gatherNodeParts(node, parts) {
        switch (null == node ? void 0 : node.type) {
         default:
          if (t.isModuleDeclaration(node)) if (node.source) gatherNodeParts(node.source, parts); else if (node.specifiers && node.specifiers.length) for (const e of node.specifiers) gatherNodeParts(e, parts); else node.declaration && gatherNodeParts(node.declaration, parts); else t.isModuleSpecifier(node) ? gatherNodeParts(node.local, parts) : t.isLiteral(node) && parts.push(node.value);
          break;

         case "MemberExpression":
         case "OptionalMemberExpression":
         case "JSXMemberExpression":
          gatherNodeParts(node.object, parts), gatherNodeParts(node.property, parts);
          break;

         case "Identifier":
         case "JSXIdentifier":
          parts.push(node.name);
          break;

         case "CallExpression":
         case "OptionalCallExpression":
         case "NewExpression":
          gatherNodeParts(node.callee, parts);
          break;

         case "ObjectExpression":
         case "ObjectPattern":
          for (const e of node.properties) gatherNodeParts(e, parts);
          break;

         case "SpreadElement":
         case "RestElement":
          gatherNodeParts(node.argument, parts);
          break;

         case "ObjectProperty":
         case "ObjectMethod":
         case "ClassProperty":
         case "ClassMethod":
         case "ClassPrivateProperty":
         case "ClassPrivateMethod":
          gatherNodeParts(node.key, parts);
          break;

         case "ThisExpression":
          parts.push("this");
          break;

         case "Super":
          parts.push("super");
          break;

         case "Import":
          parts.push("import");
          break;

         case "DoExpression":
          parts.push("do");
          break;

         case "YieldExpression":
          parts.push("yield"), gatherNodeParts(node.argument, parts);
          break;

         case "AwaitExpression":
          parts.push("await"), gatherNodeParts(node.argument, parts);
          break;

         case "AssignmentExpression":
          gatherNodeParts(node.left, parts);
          break;

         case "VariableDeclarator":
          gatherNodeParts(node.id, parts);
          break;

         case "FunctionExpression":
         case "FunctionDeclaration":
         case "ClassExpression":
         case "ClassDeclaration":
         case "PrivateName":
          gatherNodeParts(node.id, parts);
          break;

         case "ParenthesizedExpression":
          gatherNodeParts(node.expression, parts);
          break;

         case "UnaryExpression":
         case "UpdateExpression":
          gatherNodeParts(node.argument, parts);
          break;

         case "MetaProperty":
          gatherNodeParts(node.meta, parts), gatherNodeParts(node.property, parts);
          break;

         case "JSXElement":
          gatherNodeParts(node.openingElement, parts);
          break;

         case "JSXOpeningElement":
          parts.push(node.name);
          break;

         case "JSXFragment":
          gatherNodeParts(node.openingFragment, parts);
          break;

         case "JSXOpeningFragment":
          parts.push("Fragment");
          break;

         case "JSXNamespacedName":
          gatherNodeParts(node.namespace, parts), gatherNodeParts(node.name, parts);
        }
      }(node, parts);
      let id = parts.join("$");
      return id = id.replace(/^_/, "") || defaultName || "ref", this.generateUid(id.slice(0, 20));
    }
    generateUidIdentifierBasedOnNode(node, defaultName) {
      return t.identifier(this.generateUidBasedOnNode(node, defaultName));
    }
    isStatic(node) {
      if (t.isThisExpression(node) || t.isSuper(node)) return !0;
      if (t.isIdentifier(node)) {
        const binding = this.getBinding(node.name);
        return binding ? binding.constant : this.hasBinding(node.name);
      }
      return !1;
    }
    maybeGenerateMemoised(node, dontPush) {
      if (this.isStatic(node)) return null;
      {
        const id = this.generateUidIdentifierBasedOnNode(node);
        return dontPush ? id : (this.push({
          id: id
        }), t.cloneNode(id));
      }
    }
    checkBlockScopedCollisions(local, kind, name, id) {
      if ("param" === kind) return;
      if ("local" === local.kind) return;
      if ("let" === kind || "let" === local.kind || "const" === local.kind || "module" === local.kind || "param" === local.kind && ("let" === kind || "const" === kind)) throw this.hub.buildError(id, `Duplicate declaration "${name}"`, TypeError);
    }
    rename(oldName, newName, block) {
      const binding = this.getBinding(oldName);
      if (binding) return newName = newName || this.generateUidIdentifier(oldName).name, 
      new _renamer.default(binding, oldName, newName).rename(block);
    }
    _renameFromMap(map, oldName, newName, value) {
      map[oldName] && (map[newName] = value, map[oldName] = null);
    }
    dump() {
      const sep = "-".repeat(60);
      console.log(sep);
      let scope = this;
      do {
        console.log("#", scope.block.type);
        for (const name of Object.keys(scope.bindings)) {
          const binding = scope.bindings[name];
          console.log(" -", name, {
            constant: binding.constant,
            references: binding.references,
            violations: binding.constantViolations.length,
            kind: binding.kind
          });
        }
      } while (scope = scope.parent);
      console.log(sep);
    }
    toArray(node, i, allowArrayLike) {
      if (t.isIdentifier(node)) {
        const binding = this.getBinding(node.name);
        if ((null == binding ? void 0 : binding.constant) && binding.path.isGenericType("Array")) return node;
      }
      if (t.isArrayExpression(node)) return node;
      if (t.isIdentifier(node, {
        name: "arguments"
      })) return t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Array"), t.identifier("prototype")), t.identifier("slice")), t.identifier("call")), [ node ]);
      let helperName;
      const args = [ node ];
      return !0 === i ? helperName = "toConsumableArray" : i ? (args.push(t.numericLiteral(i)), 
      helperName = "slicedToArray") : helperName = "toArray", allowArrayLike && (args.unshift(this.hub.addHelper(helperName)), 
      helperName = "maybeArrayLike"), t.callExpression(this.hub.addHelper(helperName), args);
    }
    hasLabel(name) {
      return !!this.getLabel(name);
    }
    getLabel(name) {
      return this.labels.get(name);
    }
    registerLabel(path) {
      this.labels.set(path.node.label.name, path);
    }
    registerDeclaration(path) {
      if (path.isLabeledStatement()) this.registerLabel(path); else if (path.isFunctionDeclaration()) this.registerBinding("hoisted", path.get("id"), path); else if (path.isVariableDeclaration()) {
        const declarations = path.get("declarations");
        for (const declar of declarations) this.registerBinding(path.node.kind, declar);
      } else if (path.isClassDeclaration()) this.registerBinding("let", path); else if (path.isImportDeclaration()) {
        const specifiers = path.get("specifiers");
        for (const specifier of specifiers) this.registerBinding("module", specifier);
      } else if (path.isExportDeclaration()) {
        const declar = path.get("declaration");
        (declar.isClassDeclaration() || declar.isFunctionDeclaration() || declar.isVariableDeclaration()) && this.registerDeclaration(declar);
      } else this.registerBinding("unknown", path);
    }
    buildUndefinedNode() {
      return t.unaryExpression("void", t.numericLiteral(0), !0);
    }
    registerConstantViolation(path) {
      const ids = path.getBindingIdentifiers();
      for (const name of Object.keys(ids)) {
        const binding = this.getBinding(name);
        binding && binding.reassign(path);
      }
    }
    registerBinding(kind, path, bindingPath = path) {
      if (!kind) throw new ReferenceError("no `kind`");
      if (path.isVariableDeclaration()) {
        const declarators = path.get("declarations");
        for (const declar of declarators) this.registerBinding(kind, declar);
        return;
      }
      const parent = this.getProgramParent(), ids = path.getOuterBindingIdentifiers(!0);
      for (const name of Object.keys(ids)) {
        parent.references[name] = !0;
        for (const id of ids[name]) {
          const local = this.getOwnBinding(name);
          if (local) {
            if (local.identifier === id) continue;
            this.checkBlockScopedCollisions(local, kind, name, id);
          }
          local ? this.registerConstantViolation(bindingPath) : this.bindings[name] = new _binding.default({
            identifier: id,
            scope: this,
            path: bindingPath,
            kind: kind
          });
        }
      }
    }
    addGlobal(node) {
      this.globals[node.name] = node;
    }
    hasUid(name) {
      let scope = this;
      do {
        if (scope.uids[name]) return !0;
      } while (scope = scope.parent);
      return !1;
    }
    hasGlobal(name) {
      let scope = this;
      do {
        if (scope.globals[name]) return !0;
      } while (scope = scope.parent);
      return !1;
    }
    hasReference(name) {
      return !!this.getProgramParent().references[name];
    }
    isPure(node, constantsOnly) {
      if (t.isIdentifier(node)) {
        const binding = this.getBinding(node.name);
        return !!binding && (!constantsOnly || binding.constant);
      }
      if (t.isClass(node)) return !(node.superClass && !this.isPure(node.superClass, constantsOnly)) && this.isPure(node.body, constantsOnly);
      if (t.isClassBody(node)) {
        for (const method of node.body) if (!this.isPure(method, constantsOnly)) return !1;
        return !0;
      }
      if (t.isBinary(node)) return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
      if (t.isArrayExpression(node)) {
        for (const elem of node.elements) if (!this.isPure(elem, constantsOnly)) return !1;
        return !0;
      }
      if (t.isObjectExpression(node)) {
        for (const prop of node.properties) if (!this.isPure(prop, constantsOnly)) return !1;
        return !0;
      }
      if (t.isMethod(node)) return !(node.computed && !this.isPure(node.key, constantsOnly)) && ("get" !== node.kind && "set" !== node.kind);
      if (t.isProperty(node)) return !(node.computed && !this.isPure(node.key, constantsOnly)) && this.isPure(node.value, constantsOnly);
      if (t.isUnaryExpression(node)) return this.isPure(node.argument, constantsOnly);
      if (t.isTaggedTemplateExpression(node)) return t.matchesPattern(node.tag, "String.raw") && !this.hasBinding("String", !0) && this.isPure(node.quasi, constantsOnly);
      if (t.isTemplateLiteral(node)) {
        for (const expression of node.expressions) if (!this.isPure(expression, constantsOnly)) return !1;
        return !0;
      }
      return t.isPureish(node);
    }
    setData(key, val) {
      return this.data[key] = val;
    }
    getData(key) {
      let scope = this;
      do {
        const data = scope.data[key];
        if (null != data) return data;
      } while (scope = scope.parent);
    }
    removeData(key) {
      let scope = this;
      do {
        null != scope.data[key] && (scope.data[key] = null);
      } while (scope = scope.parent);
    }
    init() {
      this.inited || (this.inited = !0, this.crawl());
    }
    crawl() {
      const path = this.path;
      if (this.references = Object.create(null), this.bindings = Object.create(null), 
      this.globals = Object.create(null), this.uids = Object.create(null), this.data = Object.create(null), 
      path.isFunction()) {
        path.isFunctionExpression() && path.has("id") && !path.get("id").node[t.NOT_LOCAL_BINDING] && this.registerBinding("local", path.get("id"), path);
        const params = path.get("params");
        for (const param of params) this.registerBinding("param", param);
      }
      const programParent = this.getProgramParent();
      if (programParent.crawling) return;
      const state = {
        references: [],
        constantViolations: [],
        assignments: []
      };
      this.crawling = !0, path.traverse(collectorVisitor, state), this.crawling = !1;
      for (const path of state.assignments) {
        const ids = path.getBindingIdentifiers();
        for (const name of Object.keys(ids)) path.scope.getBinding(name) || programParent.addGlobal(ids[name]);
        path.scope.registerConstantViolation(path);
      }
      for (const ref of state.references) {
        const binding = ref.scope.getBinding(ref.node.name);
        binding ? binding.reference(ref) : programParent.addGlobal(ref.node);
      }
      for (const path of state.constantViolations) path.scope.registerConstantViolation(path);
    }
    push(opts) {
      let path = this.path;
      path.isBlockStatement() || path.isProgram() || (path = this.getBlockParent().path), 
      path.isSwitchStatement() && (path = (this.getFunctionParent() || this.getProgramParent()).path), 
      (path.isLoop() || path.isCatchClause() || path.isFunction()) && (path.ensureBlock(), 
      path = path.get("body"));
      const unique = opts.unique, kind = opts.kind || "var", blockHoist = null == opts._blockHoist ? 2 : opts._blockHoist, dataKey = `declaration:${kind}:${blockHoist}`;
      let declarPath = !unique && path.getData(dataKey);
      if (!declarPath) {
        const declar = t.variableDeclaration(kind, []);
        declar._blockHoist = blockHoist, [declarPath] = path.unshiftContainer("body", [ declar ]), 
        unique || path.setData(dataKey, declarPath);
      }
      const declarator = t.variableDeclarator(opts.id, opts.init);
      declarPath.node.declarations.push(declarator), this.registerBinding(kind, declarPath.get("declarations").pop());
    }
    getProgramParent() {
      let scope = this;
      do {
        if (scope.path.isProgram()) return scope;
      } while (scope = scope.parent);
      throw new Error("Couldn't find a Program");
    }
    getFunctionParent() {
      let scope = this;
      do {
        if (scope.path.isFunctionParent()) return scope;
      } while (scope = scope.parent);
      return null;
    }
    getBlockParent() {
      let scope = this;
      do {
        if (scope.path.isBlockParent()) return scope;
      } while (scope = scope.parent);
      throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
    }
    getAllBindings() {
      const ids = Object.create(null);
      let scope = this;
      do {
        (0, _defaults.default)(ids, scope.bindings), scope = scope.parent;
      } while (scope);
      return ids;
    }
    getAllBindingsOfKind() {
      const ids = Object.create(null);
      for (const kind of arguments) {
        let scope = this;
        do {
          for (const name of Object.keys(scope.bindings)) {
            const binding = scope.bindings[name];
            binding.kind === kind && (ids[name] = binding);
          }
          scope = scope.parent;
        } while (scope);
      }
      return ids;
    }
    bindingIdentifierEquals(name, node) {
      return this.getBindingIdentifier(name) === node;
    }
    getBinding(name) {
      let previousPath, scope = this;
      do {
        const binding = scope.getOwnBinding(name);
        if (binding && !(previousPath && previousPath.isPattern() && previousPath.parentPath.isFunction() && "param" !== binding.kind)) return binding;
        previousPath = scope.path;
      } while (scope = scope.parent);
    }
    getOwnBinding(name) {
      return this.bindings[name];
    }
    getBindingIdentifier(name) {
      var _this$getBinding;
      return null == (_this$getBinding = this.getBinding(name)) ? void 0 : _this$getBinding.identifier;
    }
    getOwnBindingIdentifier(name) {
      const binding = this.bindings[name];
      return null == binding ? void 0 : binding.identifier;
    }
    hasOwnBinding(name) {
      return !!this.getOwnBinding(name);
    }
    hasBinding(name, noGlobals) {
      return !!name && (!!this.hasOwnBinding(name) || (!!this.parentHasBinding(name, noGlobals) || (!!this.hasUid(name) || (!(noGlobals || !Scope.globals.includes(name)) || !(noGlobals || !Scope.contextVariables.includes(name))))));
    }
    parentHasBinding(name, noGlobals) {
      var _this$parent;
      return null == (_this$parent = this.parent) ? void 0 : _this$parent.hasBinding(name, noGlobals);
    }
    moveBindingTo(name, scope) {
      const info = this.getBinding(name);
      info && (info.scope.removeOwnBinding(name), info.scope = scope, scope.bindings[name] = info);
    }
    removeOwnBinding(name) {
      delete this.bindings[name];
    }
    removeBinding(name) {
      var _this$getBinding2;
      null == (_this$getBinding2 = this.getBinding(name)) || _this$getBinding2.scope.removeOwnBinding(name);
      let scope = this;
      do {
        scope.uids[name] && (scope.uids[name] = !1);
      } while (scope = scope.parent);
    }
  }
  exports.default = Scope, Scope.globals = Object.keys(_globals.default.builtin), 
  Scope.contextVariables = [ "arguments", "undefined", "Infinity", "NaN" ];
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = class {
    constructor({identifier: identifier, scope: scope, path: path, kind: kind}) {
      this.identifier = identifier, this.scope = scope, this.path = path, this.kind = kind, 
      this.constantViolations = [], this.constant = !0, this.referencePaths = [], this.referenced = !1, 
      this.references = 0, this.clearValue();
    }
    deoptValue() {
      this.clearValue(), this.hasDeoptedValue = !0;
    }
    setValue(value) {
      this.hasDeoptedValue || (this.hasValue = !0, this.value = value);
    }
    clearValue() {
      this.hasDeoptedValue = !1, this.hasValue = !1, this.value = null;
    }
    reassign(path) {
      this.constant = !1, -1 === this.constantViolations.indexOf(path) && this.constantViolations.push(path);
    }
    reference(path) {
      -1 === this.referencePaths.indexOf(path) && (this.referenced = !0, this.references++, 
      this.referencePaths.push(path));
    }
    dereference() {
      this.references--, this.referenced = !!this.references;
    }
  };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var obj, _path = (obj = __webpack_require__(34)) && obj.__esModule ? obj : {
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
  const testing = "test" === process.env.NODE_ENV;
  exports.default = class {
    constructor(scope, opts, state, parentPath) {
      this.queue = null, this.parentPath = parentPath, this.scope = scope, this.state = state, 
      this.opts = opts;
    }
    shouldVisit(node) {
      const opts = this.opts;
      if (opts.enter || opts.exit) return !0;
      if (opts[node.type]) return !0;
      const keys = t.VISITOR_KEYS[node.type];
      if (!(null == keys ? void 0 : keys.length)) return !1;
      for (const key of keys) if (node[key]) return !0;
      return !1;
    }
    create(node, obj, key, listKey) {
      return _path.default.get({
        parentPath: this.parentPath,
        parent: node,
        container: obj,
        key: key,
        listKey: listKey
      });
    }
    maybeQueue(path, notPriority) {
      if (this.trap) throw new Error("Infinite cycle detected");
      this.queue && (notPriority ? this.queue.push(path) : this.priorityQueue.push(path));
    }
    visitMultiple(container, parent, listKey) {
      if (0 === container.length) return !1;
      const queue = [];
      for (let key = 0; key < container.length; key++) {
        const node = container[key];
        node && this.shouldVisit(node) && queue.push(this.create(parent, container, key, listKey));
      }
      return this.visitQueue(queue);
    }
    visitSingle(node, key) {
      return !!this.shouldVisit(node[key]) && this.visitQueue([ this.create(node, node, key) ]);
    }
    visitQueue(queue) {
      this.queue = queue, this.priorityQueue = [];
      const visited = [];
      let stop = !1;
      for (const path of queue) if (path.resync(), 0 !== path.contexts.length && path.contexts[path.contexts.length - 1] === this || path.pushContext(this), 
      null !== path.key && (testing && queue.length >= 1e4 && (this.trap = !0), !(visited.indexOf(path.node) >= 0))) {
        if (visited.push(path.node), path.visit()) {
          stop = !0;
          break;
        }
        if (this.priorityQueue.length && (stop = this.visitQueue(this.priorityQueue), this.priorityQueue = [], 
        this.queue = queue, stop)) break;
      }
      for (const path of queue) path.popContext();
      return this.queue = null, stop;
    }
    visit(node, key) {
      const nodes = node[key];
      return !!nodes && (Array.isArray(nodes) ? this.visitMultiple(nodes, node, key) : this.visitSingle(node, key));
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  _interopRequireDefault(__webpack_require__(260));
  var _helperSplitExportDeclaration = _interopRequireDefault(__webpack_require__(114));
  !function(obj) {
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
  const renameVisitor = {
    ReferencedIdentifier({node: node}, state) {
      node.name === state.oldName && (node.name = state.newName);
    },
    Scope(path, state) {
      path.scope.bindingIdentifierEquals(state.oldName, state.binding.identifier) || path.skip();
    },
    "AssignmentExpression|Declaration|VariableDeclarator"(path, state) {
      if (path.isVariableDeclaration()) return;
      const ids = path.getOuterBindingIdentifiers();
      for (const name in ids) name === state.oldName && (ids[name].name = state.newName);
    }
  };
  exports.default = class {
    constructor(binding, oldName, newName) {
      this.newName = newName, this.oldName = oldName, this.binding = binding;
    }
    maybeConvertFromExportDeclaration(parentDeclar) {
      const maybeExportDeclar = parentDeclar.parentPath;
      maybeExportDeclar.isExportDeclaration() && (maybeExportDeclar.isExportDefaultDeclaration() && !maybeExportDeclar.get("declaration").node.id || (0, 
      _helperSplitExportDeclaration.default)(maybeExportDeclar));
    }
    maybeConvertFromClassFunctionDeclaration(path) {}
    maybeConvertFromClassFunctionExpression(path) {}
    rename(block) {
      const {binding: binding, oldName: oldName, newName: newName} = this, {scope: scope, path: path} = binding, parentDeclar = path.find(path => path.isDeclaration() || path.isFunctionExpression() || path.isClassExpression());
      if (parentDeclar) {
        parentDeclar.getOuterBindingIdentifiers()[oldName] === binding.identifier && this.maybeConvertFromExportDeclaration(parentDeclar);
      }
      scope.traverse(block || scope.block, renameVisitor, this), block || (scope.removeOwnBinding(oldName), 
      scope.bindings[newName] = binding, this.binding.identifier.name = newName), binding.type, 
      parentDeclar && (this.maybeConvertFromClassFunctionDeclaration(parentDeclar), this.maybeConvertFromClassFunctionExpression(parentDeclar));
    }
  };
}, function(module, exports, __webpack_require__) {
  var baseRest = __webpack_require__(182), eq = __webpack_require__(16), isIterateeCall = __webpack_require__(94), keysIn = __webpack_require__(27), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, defaults = baseRest((function(object, sources) {
    object = Object(object);
    var index = -1, length = sources.length, guard = length > 2 ? sources[2] : void 0;
    for (guard && isIterateeCall(sources[0], sources[1], guard) && (length = 1); ++index < length; ) for (var source = sources[index], props = keysIn(source), propsIndex = -1, propsLength = props.length; ++propsIndex < propsLength; ) {
      var key = props[propsIndex], value = object[key];
      (void 0 === value || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) && (object[key] = source[key]);
    }
    return object;
  }));
  module.exports = defaults;
}, function(module, exports, __webpack_require__) {
  "use strict";
  module.exports = __webpack_require__(405);
}, function(module) {
  module.exports = JSON.parse('{"builtin":{"Array":false,"ArrayBuffer":false,"Atomics":false,"BigInt":false,"BigInt64Array":false,"BigUint64Array":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"globalThis":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"SharedArrayBuffer":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"es5":{"Array":false,"Boolean":false,"constructor":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"propertyIsEnumerable":false,"RangeError":false,"ReferenceError":false,"RegExp":false,"String":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false},"es2015":{"Array":false,"ArrayBuffer":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"es2017":{"Array":false,"ArrayBuffer":false,"Atomics":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"SharedArrayBuffer":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"browser":{"AbortController":false,"AbortSignal":false,"addEventListener":false,"alert":false,"AnalyserNode":false,"Animation":false,"AnimationEffectReadOnly":false,"AnimationEffectTiming":false,"AnimationEffectTimingReadOnly":false,"AnimationEvent":false,"AnimationPlaybackEvent":false,"AnimationTimeline":false,"applicationCache":false,"ApplicationCache":false,"ApplicationCacheErrorEvent":false,"atob":false,"Attr":false,"Audio":false,"AudioBuffer":false,"AudioBufferSourceNode":false,"AudioContext":false,"AudioDestinationNode":false,"AudioListener":false,"AudioNode":false,"AudioParam":false,"AudioProcessingEvent":false,"AudioScheduledSourceNode":false,"AudioWorkletGlobalScope ":false,"AudioWorkletNode":false,"AudioWorkletProcessor":false,"BarProp":false,"BaseAudioContext":false,"BatteryManager":false,"BeforeUnloadEvent":false,"BiquadFilterNode":false,"Blob":false,"BlobEvent":false,"blur":false,"BroadcastChannel":false,"btoa":false,"BudgetService":false,"ByteLengthQueuingStrategy":false,"Cache":false,"caches":false,"CacheStorage":false,"cancelAnimationFrame":false,"cancelIdleCallback":false,"CanvasCaptureMediaStreamTrack":false,"CanvasGradient":false,"CanvasPattern":false,"CanvasRenderingContext2D":false,"ChannelMergerNode":false,"ChannelSplitterNode":false,"CharacterData":false,"clearInterval":false,"clearTimeout":false,"clientInformation":false,"ClipboardEvent":false,"close":false,"closed":false,"CloseEvent":false,"Comment":false,"CompositionEvent":false,"confirm":false,"console":false,"ConstantSourceNode":false,"ConvolverNode":false,"CountQueuingStrategy":false,"createImageBitmap":false,"Credential":false,"CredentialsContainer":false,"crypto":false,"Crypto":false,"CryptoKey":false,"CSS":false,"CSSConditionRule":false,"CSSFontFaceRule":false,"CSSGroupingRule":false,"CSSImportRule":false,"CSSKeyframeRule":false,"CSSKeyframesRule":false,"CSSMediaRule":false,"CSSNamespaceRule":false,"CSSPageRule":false,"CSSRule":false,"CSSRuleList":false,"CSSStyleDeclaration":false,"CSSStyleRule":false,"CSSStyleSheet":false,"CSSSupportsRule":false,"CustomElementRegistry":false,"customElements":false,"CustomEvent":false,"DataTransfer":false,"DataTransferItem":false,"DataTransferItemList":false,"defaultstatus":false,"defaultStatus":false,"DelayNode":false,"DeviceMotionEvent":false,"DeviceOrientationEvent":false,"devicePixelRatio":false,"dispatchEvent":false,"document":false,"Document":false,"DocumentFragment":false,"DocumentType":false,"DOMError":false,"DOMException":false,"DOMImplementation":false,"DOMMatrix":false,"DOMMatrixReadOnly":false,"DOMParser":false,"DOMPoint":false,"DOMPointReadOnly":false,"DOMQuad":false,"DOMRect":false,"DOMRectReadOnly":false,"DOMStringList":false,"DOMStringMap":false,"DOMTokenList":false,"DragEvent":false,"DynamicsCompressorNode":false,"Element":false,"ErrorEvent":false,"event":false,"Event":false,"EventSource":false,"EventTarget":false,"external":false,"fetch":false,"File":false,"FileList":false,"FileReader":false,"find":false,"focus":false,"FocusEvent":false,"FontFace":false,"FontFaceSetLoadEvent":false,"FormData":false,"frameElement":false,"frames":false,"GainNode":false,"Gamepad":false,"GamepadButton":false,"GamepadEvent":false,"getComputedStyle":false,"getSelection":false,"HashChangeEvent":false,"Headers":false,"history":false,"History":false,"HTMLAllCollection":false,"HTMLAnchorElement":false,"HTMLAreaElement":false,"HTMLAudioElement":false,"HTMLBaseElement":false,"HTMLBodyElement":false,"HTMLBRElement":false,"HTMLButtonElement":false,"HTMLCanvasElement":false,"HTMLCollection":false,"HTMLContentElement":false,"HTMLDataElement":false,"HTMLDataListElement":false,"HTMLDetailsElement":false,"HTMLDialogElement":false,"HTMLDirectoryElement":false,"HTMLDivElement":false,"HTMLDListElement":false,"HTMLDocument":false,"HTMLElement":false,"HTMLEmbedElement":false,"HTMLFieldSetElement":false,"HTMLFontElement":false,"HTMLFormControlsCollection":false,"HTMLFormElement":false,"HTMLFrameElement":false,"HTMLFrameSetElement":false,"HTMLHeadElement":false,"HTMLHeadingElement":false,"HTMLHRElement":false,"HTMLHtmlElement":false,"HTMLIFrameElement":false,"HTMLImageElement":false,"HTMLInputElement":false,"HTMLLabelElement":false,"HTMLLegendElement":false,"HTMLLIElement":false,"HTMLLinkElement":false,"HTMLMapElement":false,"HTMLMarqueeElement":false,"HTMLMediaElement":false,"HTMLMenuElement":false,"HTMLMetaElement":false,"HTMLMeterElement":false,"HTMLModElement":false,"HTMLObjectElement":false,"HTMLOListElement":false,"HTMLOptGroupElement":false,"HTMLOptionElement":false,"HTMLOptionsCollection":false,"HTMLOutputElement":false,"HTMLParagraphElement":false,"HTMLParamElement":false,"HTMLPictureElement":false,"HTMLPreElement":false,"HTMLProgressElement":false,"HTMLQuoteElement":false,"HTMLScriptElement":false,"HTMLSelectElement":false,"HTMLShadowElement":false,"HTMLSlotElement":false,"HTMLSourceElement":false,"HTMLSpanElement":false,"HTMLStyleElement":false,"HTMLTableCaptionElement":false,"HTMLTableCellElement":false,"HTMLTableColElement":false,"HTMLTableElement":false,"HTMLTableRowElement":false,"HTMLTableSectionElement":false,"HTMLTemplateElement":false,"HTMLTextAreaElement":false,"HTMLTimeElement":false,"HTMLTitleElement":false,"HTMLTrackElement":false,"HTMLUListElement":false,"HTMLUnknownElement":false,"HTMLVideoElement":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"IdleDeadline":false,"IIRFilterNode":false,"Image":false,"ImageBitmap":false,"ImageBitmapRenderingContext":false,"ImageCapture":false,"ImageData":false,"indexedDB":false,"innerHeight":false,"innerWidth":false,"InputEvent":false,"IntersectionObserver":false,"IntersectionObserverEntry":false,"Intl":false,"isSecureContext":false,"KeyboardEvent":false,"KeyframeEffect":false,"KeyframeEffectReadOnly":false,"length":false,"localStorage":false,"location":true,"Location":false,"locationbar":false,"matchMedia":false,"MediaDeviceInfo":false,"MediaDevices":false,"MediaElementAudioSourceNode":false,"MediaEncryptedEvent":false,"MediaError":false,"MediaKeyMessageEvent":false,"MediaKeySession":false,"MediaKeyStatusMap":false,"MediaKeySystemAccess":false,"MediaList":false,"MediaQueryList":false,"MediaQueryListEvent":false,"MediaRecorder":false,"MediaSettingsRange":false,"MediaSource":false,"MediaStream":false,"MediaStreamAudioDestinationNode":false,"MediaStreamAudioSourceNode":false,"MediaStreamEvent":false,"MediaStreamTrack":false,"MediaStreamTrackEvent":false,"menubar":false,"MessageChannel":false,"MessageEvent":false,"MessagePort":false,"MIDIAccess":false,"MIDIConnectionEvent":false,"MIDIInput":false,"MIDIInputMap":false,"MIDIMessageEvent":false,"MIDIOutput":false,"MIDIOutputMap":false,"MIDIPort":false,"MimeType":false,"MimeTypeArray":false,"MouseEvent":false,"moveBy":false,"moveTo":false,"MutationEvent":false,"MutationObserver":false,"MutationRecord":false,"name":false,"NamedNodeMap":false,"NavigationPreloadManager":false,"navigator":false,"Navigator":false,"NetworkInformation":false,"Node":false,"NodeFilter":false,"NodeIterator":false,"NodeList":false,"Notification":false,"OfflineAudioCompletionEvent":false,"OfflineAudioContext":false,"offscreenBuffering":false,"OffscreenCanvas":true,"onabort":true,"onafterprint":true,"onanimationend":true,"onanimationiteration":true,"onanimationstart":true,"onappinstalled":true,"onauxclick":true,"onbeforeinstallprompt":true,"onbeforeprint":true,"onbeforeunload":true,"onblur":true,"oncancel":true,"oncanplay":true,"oncanplaythrough":true,"onchange":true,"onclick":true,"onclose":true,"oncontextmenu":true,"oncuechange":true,"ondblclick":true,"ondevicemotion":true,"ondeviceorientation":true,"ondeviceorientationabsolute":true,"ondrag":true,"ondragend":true,"ondragenter":true,"ondragleave":true,"ondragover":true,"ondragstart":true,"ondrop":true,"ondurationchange":true,"onemptied":true,"onended":true,"onerror":true,"onfocus":true,"ongotpointercapture":true,"onhashchange":true,"oninput":true,"oninvalid":true,"onkeydown":true,"onkeypress":true,"onkeyup":true,"onlanguagechange":true,"onload":true,"onloadeddata":true,"onloadedmetadata":true,"onloadstart":true,"onlostpointercapture":true,"onmessage":true,"onmessageerror":true,"onmousedown":true,"onmouseenter":true,"onmouseleave":true,"onmousemove":true,"onmouseout":true,"onmouseover":true,"onmouseup":true,"onmousewheel":true,"onoffline":true,"ononline":true,"onpagehide":true,"onpageshow":true,"onpause":true,"onplay":true,"onplaying":true,"onpointercancel":true,"onpointerdown":true,"onpointerenter":true,"onpointerleave":true,"onpointermove":true,"onpointerout":true,"onpointerover":true,"onpointerup":true,"onpopstate":true,"onprogress":true,"onratechange":true,"onrejectionhandled":true,"onreset":true,"onresize":true,"onscroll":true,"onsearch":true,"onseeked":true,"onseeking":true,"onselect":true,"onstalled":true,"onstorage":true,"onsubmit":true,"onsuspend":true,"ontimeupdate":true,"ontoggle":true,"ontransitionend":true,"onunhandledrejection":true,"onunload":true,"onvolumechange":true,"onwaiting":true,"onwheel":true,"open":false,"openDatabase":false,"opener":false,"Option":false,"origin":false,"OscillatorNode":false,"outerHeight":false,"outerWidth":false,"PageTransitionEvent":false,"pageXOffset":false,"pageYOffset":false,"PannerNode":false,"parent":false,"Path2D":false,"PaymentAddress":false,"PaymentRequest":false,"PaymentRequestUpdateEvent":false,"PaymentResponse":false,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceLongTaskTiming":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceNavigationTiming":false,"PerformanceObserver":false,"PerformanceObserverEntryList":false,"PerformancePaintTiming":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"PeriodicWave":false,"Permissions":false,"PermissionStatus":false,"personalbar":false,"PhotoCapabilities":false,"Plugin":false,"PluginArray":false,"PointerEvent":false,"PopStateEvent":false,"postMessage":false,"Presentation":false,"PresentationAvailability":false,"PresentationConnection":false,"PresentationConnectionAvailableEvent":false,"PresentationConnectionCloseEvent":false,"PresentationConnectionList":false,"PresentationReceiver":false,"PresentationRequest":false,"print":false,"ProcessingInstruction":false,"ProgressEvent":false,"PromiseRejectionEvent":false,"prompt":false,"PushManager":false,"PushSubscription":false,"PushSubscriptionOptions":false,"queueMicrotask":false,"RadioNodeList":false,"Range":false,"ReadableStream":false,"registerProcessor":false,"RemotePlayback":false,"removeEventListener":false,"Request":false,"requestAnimationFrame":false,"requestIdleCallback":false,"resizeBy":false,"ResizeObserver":false,"ResizeObserverEntry":false,"resizeTo":false,"Response":false,"RTCCertificate":false,"RTCDataChannel":false,"RTCDataChannelEvent":false,"RTCDtlsTransport":false,"RTCIceCandidate":false,"RTCIceGatherer":false,"RTCIceTransport":false,"RTCPeerConnection":false,"RTCPeerConnectionIceEvent":false,"RTCRtpContributingSource":false,"RTCRtpReceiver":false,"RTCRtpSender":false,"RTCSctpTransport":false,"RTCSessionDescription":false,"RTCStatsReport":false,"RTCTrackEvent":false,"screen":false,"Screen":false,"screenLeft":false,"ScreenOrientation":false,"screenTop":false,"screenX":false,"screenY":false,"ScriptProcessorNode":false,"scroll":false,"scrollbars":false,"scrollBy":false,"scrollTo":false,"scrollX":false,"scrollY":false,"SecurityPolicyViolationEvent":false,"Selection":false,"self":false,"ServiceWorker":false,"ServiceWorkerContainer":false,"ServiceWorkerRegistration":false,"sessionStorage":false,"setInterval":false,"setTimeout":false,"ShadowRoot":false,"SharedWorker":false,"SourceBuffer":false,"SourceBufferList":false,"speechSynthesis":false,"SpeechSynthesisEvent":false,"SpeechSynthesisUtterance":false,"StaticRange":false,"status":false,"statusbar":false,"StereoPannerNode":false,"stop":false,"Storage":false,"StorageEvent":false,"StorageManager":false,"styleMedia":false,"StyleSheet":false,"StyleSheetList":false,"SubtleCrypto":false,"SVGAElement":false,"SVGAngle":false,"SVGAnimatedAngle":false,"SVGAnimatedBoolean":false,"SVGAnimatedEnumeration":false,"SVGAnimatedInteger":false,"SVGAnimatedLength":false,"SVGAnimatedLengthList":false,"SVGAnimatedNumber":false,"SVGAnimatedNumberList":false,"SVGAnimatedPreserveAspectRatio":false,"SVGAnimatedRect":false,"SVGAnimatedString":false,"SVGAnimatedTransformList":false,"SVGAnimateElement":false,"SVGAnimateMotionElement":false,"SVGAnimateTransformElement":false,"SVGAnimationElement":false,"SVGCircleElement":false,"SVGClipPathElement":false,"SVGComponentTransferFunctionElement":false,"SVGDefsElement":false,"SVGDescElement":false,"SVGDiscardElement":false,"SVGElement":false,"SVGEllipseElement":false,"SVGFEBlendElement":false,"SVGFEColorMatrixElement":false,"SVGFEComponentTransferElement":false,"SVGFECompositeElement":false,"SVGFEConvolveMatrixElement":false,"SVGFEDiffuseLightingElement":false,"SVGFEDisplacementMapElement":false,"SVGFEDistantLightElement":false,"SVGFEDropShadowElement":false,"SVGFEFloodElement":false,"SVGFEFuncAElement":false,"SVGFEFuncBElement":false,"SVGFEFuncGElement":false,"SVGFEFuncRElement":false,"SVGFEGaussianBlurElement":false,"SVGFEImageElement":false,"SVGFEMergeElement":false,"SVGFEMergeNodeElement":false,"SVGFEMorphologyElement":false,"SVGFEOffsetElement":false,"SVGFEPointLightElement":false,"SVGFESpecularLightingElement":false,"SVGFESpotLightElement":false,"SVGFETileElement":false,"SVGFETurbulenceElement":false,"SVGFilterElement":false,"SVGForeignObjectElement":false,"SVGGElement":false,"SVGGeometryElement":false,"SVGGradientElement":false,"SVGGraphicsElement":false,"SVGImageElement":false,"SVGLength":false,"SVGLengthList":false,"SVGLinearGradientElement":false,"SVGLineElement":false,"SVGMarkerElement":false,"SVGMaskElement":false,"SVGMatrix":false,"SVGMetadataElement":false,"SVGMPathElement":false,"SVGNumber":false,"SVGNumberList":false,"SVGPathElement":false,"SVGPatternElement":false,"SVGPoint":false,"SVGPointList":false,"SVGPolygonElement":false,"SVGPolylineElement":false,"SVGPreserveAspectRatio":false,"SVGRadialGradientElement":false,"SVGRect":false,"SVGRectElement":false,"SVGScriptElement":false,"SVGSetElement":false,"SVGStopElement":false,"SVGStringList":false,"SVGStyleElement":false,"SVGSVGElement":false,"SVGSwitchElement":false,"SVGSymbolElement":false,"SVGTextContentElement":false,"SVGTextElement":false,"SVGTextPathElement":false,"SVGTextPositioningElement":false,"SVGTitleElement":false,"SVGTransform":false,"SVGTransformList":false,"SVGTSpanElement":false,"SVGUnitTypes":false,"SVGUseElement":false,"SVGViewElement":false,"TaskAttributionTiming":false,"Text":false,"TextDecoder":false,"TextEncoder":false,"TextEvent":false,"TextMetrics":false,"TextTrack":false,"TextTrackCue":false,"TextTrackCueList":false,"TextTrackList":false,"TimeRanges":false,"toolbar":false,"top":false,"Touch":false,"TouchEvent":false,"TouchList":false,"TrackEvent":false,"TransitionEvent":false,"TreeWalker":false,"UIEvent":false,"URL":false,"URLSearchParams":false,"ValidityState":false,"visualViewport":false,"VisualViewport":false,"VTTCue":false,"WaveShaperNode":false,"WebAssembly":false,"WebGL2RenderingContext":false,"WebGLActiveInfo":false,"WebGLBuffer":false,"WebGLContextEvent":false,"WebGLFramebuffer":false,"WebGLProgram":false,"WebGLQuery":false,"WebGLRenderbuffer":false,"WebGLRenderingContext":false,"WebGLSampler":false,"WebGLShader":false,"WebGLShaderPrecisionFormat":false,"WebGLSync":false,"WebGLTexture":false,"WebGLTransformFeedback":false,"WebGLUniformLocation":false,"WebGLVertexArrayObject":false,"WebSocket":false,"WheelEvent":false,"window":false,"Window":false,"Worker":false,"WritableStream":false,"XMLDocument":false,"XMLHttpRequest":false,"XMLHttpRequestEventTarget":false,"XMLHttpRequestUpload":false,"XMLSerializer":false,"XPathEvaluator":false,"XPathExpression":false,"XPathResult":false,"XSLTProcessor":false},"worker":{"addEventListener":false,"applicationCache":false,"atob":false,"Blob":false,"BroadcastChannel":false,"btoa":false,"Cache":false,"caches":false,"clearInterval":false,"clearTimeout":false,"close":true,"console":false,"fetch":false,"FileReaderSync":false,"FormData":false,"Headers":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"ImageData":false,"importScripts":true,"indexedDB":false,"location":false,"MessageChannel":false,"MessagePort":false,"name":false,"navigator":false,"Notification":false,"onclose":true,"onconnect":true,"onerror":true,"onlanguagechange":true,"onmessage":true,"onoffline":true,"ononline":true,"onrejectionhandled":true,"onunhandledrejection":true,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"postMessage":true,"Promise":false,"queueMicrotask":false,"removeEventListener":false,"Request":false,"Response":false,"self":true,"ServiceWorkerRegistration":false,"setInterval":false,"setTimeout":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false,"WebSocket":false,"Worker":false,"WorkerGlobalScope":false,"XMLHttpRequest":false},"node":{"__dirname":false,"__filename":false,"Buffer":false,"clearImmediate":false,"clearInterval":false,"clearTimeout":false,"console":false,"exports":true,"global":false,"Intl":false,"module":false,"process":false,"queueMicrotask":false,"require":false,"setImmediate":false,"setInterval":false,"setTimeout":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false},"commonjs":{"exports":true,"global":false,"module":false,"require":false},"amd":{"define":false,"require":false},"mocha":{"after":false,"afterEach":false,"before":false,"beforeEach":false,"context":false,"describe":false,"it":false,"mocha":false,"run":false,"setup":false,"specify":false,"suite":false,"suiteSetup":false,"suiteTeardown":false,"teardown":false,"test":false,"xcontext":false,"xdescribe":false,"xit":false,"xspecify":false},"jasmine":{"afterAll":false,"afterEach":false,"beforeAll":false,"beforeEach":false,"describe":false,"expect":false,"fail":false,"fdescribe":false,"fit":false,"it":false,"jasmine":false,"pending":false,"runs":false,"spyOn":false,"spyOnProperty":false,"waits":false,"waitsFor":false,"xdescribe":false,"xit":false},"jest":{"afterAll":false,"afterEach":false,"beforeAll":false,"beforeEach":false,"describe":false,"expect":false,"fdescribe":false,"fit":false,"it":false,"jest":false,"pit":false,"require":false,"test":false,"xdescribe":false,"xit":false,"xtest":false},"qunit":{"asyncTest":false,"deepEqual":false,"equal":false,"expect":false,"module":false,"notDeepEqual":false,"notEqual":false,"notOk":false,"notPropEqual":false,"notStrictEqual":false,"ok":false,"propEqual":false,"QUnit":false,"raises":false,"start":false,"stop":false,"strictEqual":false,"test":false,"throws":false},"phantomjs":{"console":true,"exports":true,"phantom":true,"require":true,"WebPage":true},"couch":{"emit":false,"exports":false,"getRow":false,"log":false,"module":false,"provides":false,"require":false,"respond":false,"send":false,"start":false,"sum":false},"rhino":{"defineClass":false,"deserialize":false,"gc":false,"help":false,"importClass":false,"importPackage":false,"java":false,"load":false,"loadClass":false,"Packages":false,"print":false,"quit":false,"readFile":false,"readUrl":false,"runCommand":false,"seal":false,"serialize":false,"spawn":false,"sync":false,"toint32":false,"version":false},"nashorn":{"__DIR__":false,"__FILE__":false,"__LINE__":false,"com":false,"edu":false,"exit":false,"java":false,"Java":false,"javafx":false,"JavaImporter":false,"javax":false,"JSAdapter":false,"load":false,"loadWithNewGlobal":false,"org":false,"Packages":false,"print":false,"quit":false},"wsh":{"ActiveXObject":true,"Enumerator":true,"GetObject":true,"ScriptEngine":true,"ScriptEngineBuildVersion":true,"ScriptEngineMajorVersion":true,"ScriptEngineMinorVersion":true,"VBArray":true,"WScript":true,"WSH":true,"XDomainRequest":true},"jquery":{"$":false,"jQuery":false},"yui":{"YAHOO":false,"YAHOO_config":false,"YUI":false,"YUI_config":false},"shelljs":{"cat":false,"cd":false,"chmod":false,"config":false,"cp":false,"dirs":false,"echo":false,"env":false,"error":false,"exec":false,"exit":false,"find":false,"grep":false,"ln":false,"ls":false,"mkdir":false,"mv":false,"popd":false,"pushd":false,"pwd":false,"rm":false,"sed":false,"set":false,"target":false,"tempdir":false,"test":false,"touch":false,"which":false},"prototypejs":{"$":false,"$$":false,"$A":false,"$break":false,"$continue":false,"$F":false,"$H":false,"$R":false,"$w":false,"Abstract":false,"Ajax":false,"Autocompleter":false,"Builder":false,"Class":false,"Control":false,"Draggable":false,"Draggables":false,"Droppables":false,"Effect":false,"Element":false,"Enumerable":false,"Event":false,"Field":false,"Form":false,"Hash":false,"Insertion":false,"ObjectRange":false,"PeriodicalExecuter":false,"Position":false,"Prototype":false,"Scriptaculous":false,"Selector":false,"Sortable":false,"SortableObserver":false,"Sound":false,"Template":false,"Toggle":false,"Try":false},"meteor":{"_":false,"$":false,"Accounts":false,"AccountsClient":false,"AccountsCommon":false,"AccountsServer":false,"App":false,"Assets":false,"Blaze":false,"check":false,"Cordova":false,"DDP":false,"DDPRateLimiter":false,"DDPServer":false,"Deps":false,"EJSON":false,"Email":false,"HTTP":false,"Log":false,"Match":false,"Meteor":false,"Mongo":false,"MongoInternals":false,"Npm":false,"Package":false,"Plugin":false,"process":false,"Random":false,"ReactiveDict":false,"ReactiveVar":false,"Router":false,"ServiceConfiguration":false,"Session":false,"share":false,"Spacebars":false,"Template":false,"Tinytest":false,"Tracker":false,"UI":false,"Utils":false,"WebApp":false,"WebAppInternals":false},"mongo":{"_isWindows":false,"_rand":false,"BulkWriteResult":false,"cat":false,"cd":false,"connect":false,"db":false,"getHostName":false,"getMemInfo":false,"hostname":false,"ISODate":false,"listFiles":false,"load":false,"ls":false,"md5sumFile":false,"mkdir":false,"Mongo":false,"NumberInt":false,"NumberLong":false,"ObjectId":false,"PlanCache":false,"print":false,"printjson":false,"pwd":false,"quit":false,"removeFile":false,"rs":false,"sh":false,"UUID":false,"version":false,"WriteResult":false},"applescript":{"$":false,"Application":false,"Automation":false,"console":false,"delay":false,"Library":false,"ObjC":false,"ObjectSpecifier":false,"Path":false,"Progress":false,"Ref":false},"serviceworker":{"addEventListener":false,"applicationCache":false,"atob":false,"Blob":false,"BroadcastChannel":false,"btoa":false,"Cache":false,"caches":false,"CacheStorage":false,"clearInterval":false,"clearTimeout":false,"Client":false,"clients":false,"Clients":false,"close":true,"console":false,"ExtendableEvent":false,"ExtendableMessageEvent":false,"fetch":false,"FetchEvent":false,"FileReaderSync":false,"FormData":false,"Headers":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"ImageData":false,"importScripts":false,"indexedDB":false,"location":false,"MessageChannel":false,"MessagePort":false,"name":false,"navigator":false,"Notification":false,"onclose":true,"onconnect":true,"onerror":true,"onfetch":true,"oninstall":true,"onlanguagechange":true,"onmessage":true,"onmessageerror":true,"onnotificationclick":true,"onnotificationclose":true,"onoffline":true,"ononline":true,"onpush":true,"onpushsubscriptionchange":true,"onrejectionhandled":true,"onsync":true,"onunhandledrejection":true,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"postMessage":true,"Promise":false,"queueMicrotask":false,"registration":false,"removeEventListener":false,"Request":false,"Response":false,"self":false,"ServiceWorker":false,"ServiceWorkerContainer":false,"ServiceWorkerGlobalScope":false,"ServiceWorkerMessageEvent":false,"ServiceWorkerRegistration":false,"setInterval":false,"setTimeout":false,"skipWaiting":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false,"WebSocket":false,"WindowClient":false,"Worker":false,"WorkerGlobalScope":false,"XMLHttpRequest":false},"atomtest":{"advanceClock":false,"fakeClearInterval":false,"fakeClearTimeout":false,"fakeSetInterval":false,"fakeSetTimeout":false,"resetTimeouts":false,"waitsForPromise":false},"embertest":{"andThen":false,"click":false,"currentPath":false,"currentRouteName":false,"currentURL":false,"fillIn":false,"find":false,"findAll":false,"findWithAssert":false,"keyEvent":false,"pauseTest":false,"resumeTest":false,"triggerEvent":false,"visit":false,"wait":false},"protractor":{"$":false,"$$":false,"browser":false,"by":false,"By":false,"DartObject":false,"element":false,"protractor":false},"shared-node-browser":{"clearInterval":false,"clearTimeout":false,"console":false,"setInterval":false,"setTimeout":false,"URL":false,"URLSearchParams":false},"webextensions":{"browser":false,"chrome":false,"opr":false},"greasemonkey":{"cloneInto":false,"createObjectIn":false,"exportFunction":false,"GM":false,"GM_addStyle":false,"GM_deleteValue":false,"GM_getResourceText":false,"GM_getResourceURL":false,"GM_getValue":false,"GM_info":false,"GM_listValues":false,"GM_log":false,"GM_openInTab":false,"GM_registerMenuCommand":false,"GM_setClipboard":false,"GM_setValue":false,"GM_xmlhttpRequest":false,"unsafeWindow":false},"devtools":{"$":false,"$_":false,"$$":false,"$0":false,"$1":false,"$2":false,"$3":false,"$4":false,"$x":false,"chrome":false,"clear":false,"copy":false,"debug":false,"dir":false,"dirxml":false,"getEventListeners":false,"inspect":false,"keys":false,"monitor":false,"monitorEvents":false,"profile":false,"profileEnd":false,"queryObjects":false,"table":false,"undebug":false,"unmonitor":false,"unmonitorEvents":false,"values":false}}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.findParent = function(callback) {
    let path = this;
    for (;path = path.parentPath; ) if (callback(path)) return path;
    return null;
  }, exports.find = function(callback) {
    let path = this;
    do {
      if (callback(path)) return path;
    } while (path = path.parentPath);
    return null;
  }, exports.getFunctionParent = function() {
    return this.findParent(p => p.isFunction());
  }, exports.getStatementParent = function() {
    let path = this;
    do {
      if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) break;
      path = path.parentPath;
    } while (path);
    if (path && (path.isProgram() || path.isFile())) throw new Error("File/Program node, we can't possibly find a statement parent to this");
    return path;
  }, exports.getEarliestCommonAncestorFrom = function(paths) {
    return this.getDeepestCommonAncestorFrom(paths, (function(deepest, i, ancestries) {
      let earliest;
      const keys = t.VISITOR_KEYS[deepest.type];
      for (const ancestry of ancestries) {
        const path = ancestry[i + 1];
        if (!earliest) {
          earliest = path;
          continue;
        }
        if (path.listKey && earliest.listKey === path.listKey && path.key < earliest.key) {
          earliest = path;
          continue;
        }
        keys.indexOf(earliest.parentKey) > keys.indexOf(path.parentKey) && (earliest = path);
      }
      return earliest;
    }));
  }, exports.getDeepestCommonAncestorFrom = function(paths, filter) {
    if (!paths.length) return this;
    if (1 === paths.length) return paths[0];
    let lastCommonIndex, lastCommon, minDepth = 1 / 0;
    const ancestries = paths.map(path => {
      const ancestry = [];
      do {
        ancestry.unshift(path);
      } while ((path = path.parentPath) && path !== this);
      return ancestry.length < minDepth && (minDepth = ancestry.length), ancestry;
    }), first = ancestries[0];
    depthLoop: for (let i = 0; i < minDepth; i++) {
      const shouldMatch = first[i];
      for (const ancestry of ancestries) if (ancestry[i] !== shouldMatch) break depthLoop;
      lastCommonIndex = i, lastCommon = shouldMatch;
    }
    if (lastCommon) return filter ? filter(lastCommon, lastCommonIndex, ancestries) : lastCommon;
    throw new Error("Couldn't find intersection");
  }, exports.getAncestry = function() {
    let path = this;
    const paths = [];
    do {
      paths.push(path);
    } while (path = path.parentPath);
    return paths;
  }, exports.isAncestor = function(maybeDescendant) {
    return maybeDescendant.isDescendant(this);
  }, exports.isDescendant = function(maybeAncestor) {
    return !!this.findParent(parent => parent === maybeAncestor);
  }, exports.inType = function() {
    let path = this;
    for (;path; ) {
      for (const type of arguments) if (path.node.type === type) return !0;
      path = path.parentPath;
    }
    return !1;
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
  }(__webpack_require__(0));
  (obj = __webpack_require__(34)) && obj.__esModule;
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
  }), exports.getTypeAnnotation = function() {
    if (this.typeAnnotation) return this.typeAnnotation;
    let type = this._getTypeAnnotation() || t.anyTypeAnnotation();
    t.isTypeAnnotation(type) && (type = type.typeAnnotation);
    return this.typeAnnotation = type;
  }, exports._getTypeAnnotation = function() {
    var _inferer;
    const node = this.node;
    if (!node) {
      if ("init" === this.key && this.parentPath.isVariableDeclarator()) {
        const declar = this.parentPath.parentPath, declarParent = declar.parentPath;
        return "left" === declar.key && declarParent.isForInStatement() ? t.stringTypeAnnotation() : "left" === declar.key && declarParent.isForOfStatement() ? t.anyTypeAnnotation() : t.voidTypeAnnotation();
      }
      return;
    }
    if (node.typeAnnotation) return node.typeAnnotation;
    let inferer = inferers[node.type];
    if (inferer) return inferer.call(this, node);
    if (inferer = inferers[this.parentPath.type], null == (_inferer = inferer) ? void 0 : _inferer.validParent) return this.parentPath.getTypeAnnotation();
  }, exports.isBaseType = function(baseName, soft) {
    return _isBaseType(baseName, this.getTypeAnnotation(), soft);
  }, exports.couldBeBaseType = function(name) {
    const type = this.getTypeAnnotation();
    if (t.isAnyTypeAnnotation(type)) return !0;
    if (t.isUnionTypeAnnotation(type)) {
      for (const type2 of type.types) if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, !0)) return !0;
      return !1;
    }
    return _isBaseType(name, type, !0);
  }, exports.baseTypeStrictlyMatches = function(right) {
    const left = this.getTypeAnnotation();
    if (right = right.getTypeAnnotation(), !t.isAnyTypeAnnotation(left) && t.isFlowBaseAnnotation(left)) return right.type === left.type;
  }, exports.isGenericType = function(genericName) {
    const type = this.getTypeAnnotation();
    return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, {
      name: genericName
    });
  };
  var inferers = _interopRequireWildcard(__webpack_require__(408)), t = _interopRequireWildcard(__webpack_require__(0));
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
  function _isBaseType(baseName, type, soft) {
    if ("string" === baseName) return t.isStringTypeAnnotation(type);
    if ("number" === baseName) return t.isNumberTypeAnnotation(type);
    if ("boolean" === baseName) return t.isBooleanTypeAnnotation(type);
    if ("any" === baseName) return t.isAnyTypeAnnotation(type);
    if ("mixed" === baseName) return t.isMixedTypeAnnotation(type);
    if ("empty" === baseName) return t.isEmptyTypeAnnotation(type);
    if ("void" === baseName) return t.isVoidTypeAnnotation(type);
    if (soft) return !1;
    throw new Error("Unknown base type " + baseName);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.VariableDeclarator = function() {
    var _type;
    if (!this.get("id").isIdentifier()) return;
    const init = this.get("init");
    let type = init.getTypeAnnotation();
    "AnyTypeAnnotation" === (null == (_type = type) ? void 0 : _type.type) && init.isCallExpression() && init.get("callee").isIdentifier({
      name: "Array"
    }) && !init.scope.hasBinding("Array", !0) && (type = ArrayExpression());
    return type;
  }, exports.TypeCastExpression = TypeCastExpression, exports.NewExpression = function(node) {
    if (this.get("callee").isIdentifier()) return t.genericTypeAnnotation(node.callee);
  }, exports.TemplateLiteral = function() {
    return t.stringTypeAnnotation();
  }, exports.UnaryExpression = function(node) {
    const operator = node.operator;
    if ("void" === operator) return t.voidTypeAnnotation();
    if (t.NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) return t.numberTypeAnnotation();
    if (t.STRING_UNARY_OPERATORS.indexOf(operator) >= 0) return t.stringTypeAnnotation();
    if (t.BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) return t.booleanTypeAnnotation();
  }, exports.BinaryExpression = function(node) {
    const operator = node.operator;
    if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) return t.numberTypeAnnotation();
    if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) return t.booleanTypeAnnotation();
    if ("+" === operator) {
      const right = this.get("right"), left = this.get("left");
      return left.isBaseType("number") && right.isBaseType("number") ? t.numberTypeAnnotation() : left.isBaseType("string") || right.isBaseType("string") ? t.stringTypeAnnotation() : t.unionTypeAnnotation([ t.stringTypeAnnotation(), t.numberTypeAnnotation() ]);
    }
  }, exports.LogicalExpression = function() {
    const argumentTypes = [ this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation() ];
    if (t.isTSTypeAnnotation(argumentTypes[0]) && t.createTSUnionType) return t.createTSUnionType(argumentTypes);
    if (t.createFlowUnionType) return t.createFlowUnionType(argumentTypes);
    return t.createUnionTypeAnnotation(argumentTypes);
  }, exports.ConditionalExpression = function() {
    const argumentTypes = [ this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation() ];
    if (t.isTSTypeAnnotation(argumentTypes[0]) && t.createTSUnionType) return t.createTSUnionType(argumentTypes);
    if (t.createFlowUnionType) return t.createFlowUnionType(argumentTypes);
    return t.createUnionTypeAnnotation(argumentTypes);
  }, exports.SequenceExpression = function() {
    return this.get("expressions").pop().getTypeAnnotation();
  }, exports.ParenthesizedExpression = function() {
    return this.get("expression").getTypeAnnotation();
  }, exports.AssignmentExpression = function() {
    return this.get("right").getTypeAnnotation();
  }, exports.UpdateExpression = function(node) {
    const operator = node.operator;
    if ("++" === operator || "--" === operator) return t.numberTypeAnnotation();
  }, exports.StringLiteral = function() {
    return t.stringTypeAnnotation();
  }, exports.NumericLiteral = function() {
    return t.numberTypeAnnotation();
  }, exports.BooleanLiteral = function() {
    return t.booleanTypeAnnotation();
  }, exports.NullLiteral = function() {
    return t.nullLiteralTypeAnnotation();
  }, exports.RegExpLiteral = function() {
    return t.genericTypeAnnotation(t.identifier("RegExp"));
  }, exports.ObjectExpression = function() {
    return t.genericTypeAnnotation(t.identifier("Object"));
  }, exports.ArrayExpression = ArrayExpression, exports.RestElement = RestElement, 
  exports.ClassDeclaration = exports.ClassExpression = exports.FunctionDeclaration = exports.ArrowFunctionExpression = exports.FunctionExpression = function() {
    return t.genericTypeAnnotation(t.identifier("Function"));
  }, exports.CallExpression = function() {
    const {callee: callee} = this.node;
    if (isObjectKeys(callee)) return t.arrayTypeAnnotation(t.stringTypeAnnotation());
    if (isArrayFrom(callee) || isObjectValues(callee)) return t.arrayTypeAnnotation(t.anyTypeAnnotation());
    if (isObjectEntries(callee)) return t.arrayTypeAnnotation(t.tupleTypeAnnotation([ t.stringTypeAnnotation(), t.anyTypeAnnotation() ]));
    return resolveCall(this.get("callee"));
  }, exports.TaggedTemplateExpression = function() {
    return resolveCall(this.get("tag"));
  }, Object.defineProperty(exports, "Identifier", {
    enumerable: !0,
    get: function() {
      return _infererReference.default;
    }
  });
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
  }(__webpack_require__(0)), _infererReference = (obj = __webpack_require__(409)) && obj.__esModule ? obj : {
    default: obj
  };
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function TypeCastExpression(node) {
    return node.typeAnnotation;
  }
  function ArrayExpression() {
    return t.genericTypeAnnotation(t.identifier("Array"));
  }
  function RestElement() {
    return ArrayExpression();
  }
  TypeCastExpression.validParent = !0, RestElement.validParent = !0;
  const isArrayFrom = t.buildMatchMemberExpression("Array.from"), isObjectKeys = t.buildMatchMemberExpression("Object.keys"), isObjectValues = t.buildMatchMemberExpression("Object.values"), isObjectEntries = t.buildMatchMemberExpression("Object.entries");
  function resolveCall(callee) {
    if ((callee = callee.resolve()).isFunction()) {
      if (callee.is("async")) return callee.is("generator") ? t.genericTypeAnnotation(t.identifier("AsyncIterator")) : t.genericTypeAnnotation(t.identifier("Promise"));
      if (callee.node.returnType) return callee.node.returnType;
    }
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    if (!this.isReferenced()) return;
    const binding = this.scope.getBinding(node.name);
    if (binding) return binding.identifier.typeAnnotation ? binding.identifier.typeAnnotation : function(binding, path, name) {
      const types = [], functionConstantViolations = [];
      let constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);
      const testType = function getConditionalAnnotation(binding, path, name) {
        const ifStatement = function(binding, path, name) {
          let parentPath;
          for (;parentPath = path.parentPath; ) {
            if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
              if ("test" === path.key) return;
              return parentPath;
            }
            if (parentPath.isFunction() && parentPath.parentPath.scope.getBinding(name) !== binding) return;
            path = parentPath;
          }
        }(binding, path, name);
        if (!ifStatement) return;
        const paths = [ ifStatement.get("test") ], types = [];
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          if (path.isLogicalExpression()) "&&" === path.node.operator && (paths.push(path.get("left")), 
          paths.push(path.get("right"))); else if (path.isBinaryExpression()) {
            const type = inferAnnotationFromBinaryExpression(name, path);
            type && types.push(type);
          }
        }
        if (types.length) return t.isTSTypeAnnotation(types[0]) && t.createTSUnionType ? {
          typeAnnotation: t.createTSUnionType(types),
          ifStatement: ifStatement
        } : t.createFlowUnionType ? {
          typeAnnotation: t.createFlowUnionType(types),
          ifStatement: ifStatement
        } : {
          typeAnnotation: t.createUnionTypeAnnotation(types),
          ifStatement: ifStatement
        };
        return getConditionalAnnotation(ifStatement, name);
      }(binding, path, name);
      if (testType) {
        const testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);
        constantViolations = constantViolations.filter(path => testConstantViolations.indexOf(path) < 0), 
        types.push(testType.typeAnnotation);
      }
      if (constantViolations.length) {
        constantViolations = constantViolations.concat(functionConstantViolations);
        for (const violation of constantViolations) types.push(violation.getTypeAnnotation());
      }
      if (!types.length) return;
      if (t.isTSTypeAnnotation(types[0]) && t.createTSUnionType) return t.createTSUnionType(types);
      if (t.createFlowUnionType) return t.createFlowUnionType(types);
      return t.createUnionTypeAnnotation(types);
    }(binding, this, node.name);
    if ("undefined" === node.name) return t.voidTypeAnnotation();
    if ("NaN" === node.name || "Infinity" === node.name) return t.numberTypeAnnotation();
    node.name;
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
  function getConstantViolationsBefore(binding, path, functions) {
    const violations = binding.constantViolations.slice();
    return violations.unshift(binding.path), violations.filter(violation => {
      const status = (violation = violation.resolve())._guessExecutionStatusRelativeTo(path);
      return functions && "unknown" === status && functions.push(violation), "before" === status;
    });
  }
  function inferAnnotationFromBinaryExpression(name, path) {
    const operator = path.node.operator, right = path.get("right").resolve(), left = path.get("left").resolve();
    let target, typeofPath, typePath;
    if (left.isIdentifier({
      name: name
    }) ? target = right : right.isIdentifier({
      name: name
    }) && (target = left), target) return "===" === operator ? target.getTypeAnnotation() : t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0 ? t.numberTypeAnnotation() : void 0;
    if ("===" !== operator && "==" !== operator) return;
    if (left.isUnaryExpression({
      operator: "typeof"
    }) ? (typeofPath = left, typePath = right) : right.isUnaryExpression({
      operator: "typeof"
    }) && (typeofPath = right, typePath = left), !typeofPath) return;
    if (!typeofPath.get("argument").isIdentifier({
      name: name
    })) return;
    if (typePath = typePath.resolve(), !typePath.isLiteral()) return;
    const typeValue = typePath.node.value;
    return "string" == typeof typeValue ? t.createTypeAnnotationBasedOnTypeof(typeValue) : void 0;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.replaceWithMultiple = function(nodes) {
    this.resync(), nodes = this._verifyNodeList(nodes), t.inheritLeadingComments(nodes[0], this.node), 
    t.inheritTrailingComments(nodes[nodes.length - 1], this.node), this.node = this.container[this.key] = null;
    const paths = this.insertAfter(nodes);
    this.node ? this.requeue() : this.remove();
    return paths;
  }, exports.replaceWithSourceString = function(replacement) {
    this.resync();
    try {
      replacement = `(${replacement})`, replacement = (0, _parser.parse)(replacement);
    } catch (err) {
      const loc = err.loc;
      throw loc && (err.message += " - make sure this is an expression.\n" + (0, _codeFrame.codeFrameColumns)(replacement, {
        start: {
          line: loc.line,
          column: loc.column + 1
        }
      }), err.code = "BABEL_REPLACE_SOURCE_ERROR"), err;
    }
    return replacement = replacement.program.body[0].expression, _index.default.removeProperties(replacement), 
    this.replaceWith(replacement);
  }, exports.replaceWith = function(replacement) {
    if (this.resync(), this.removed) throw new Error("You can't replace this node, we've already removed it");
    replacement instanceof _index2.default && (replacement = replacement.node);
    if (!replacement) throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
    if (this.node === replacement) return [ this ];
    if (this.isProgram() && !t.isProgram(replacement)) throw new Error("You can only replace a Program root node with another Program node");
    if (Array.isArray(replacement)) throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
    if ("string" == typeof replacement) throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");
    let nodePath = "";
    this.isNodeType("Statement") && t.isExpression(replacement) && (this.canHaveVariableDeclarationOrExpression() || this.canSwapBetweenExpressionAndStatement(replacement) || this.parentPath.isExportDefaultDeclaration() || (replacement = t.expressionStatement(replacement), 
    nodePath = "expression"));
    if (this.isNodeType("Expression") && t.isStatement(replacement) && !this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) return this.replaceExpressionWithStatements([ replacement ]);
    const oldNode = this.node;
    oldNode && (t.inheritsComments(replacement, oldNode), t.removeComments(oldNode));
    return this._replaceWith(replacement), this.type = replacement.type, this.setScope(), 
    this.requeue(), [ nodePath ? this.get(nodePath) : this ];
  }, exports._replaceWith = function(node) {
    if (!this.container) throw new ReferenceError("Container is falsy");
    this.inList ? t.validate(this.parent, this.key, [ node ]) : t.validate(this.parent, this.key, node);
    this.debug("Replace with " + (null == node ? void 0 : node.type)), this.node = this.container[this.key] = node;
  }, exports.replaceExpressionWithStatements = function(nodes) {
    this.resync();
    const toSequenceExpression = t.toSequenceExpression(nodes, this.scope);
    if (toSequenceExpression) return this.replaceWith(toSequenceExpression)[0].get("expressions");
    const functionParent = this.getFunctionParent(), isParentAsync = null == functionParent ? void 0 : functionParent.is("async"), container = t.arrowFunctionExpression([], t.blockStatement(nodes));
    this.replaceWith(t.callExpression(container, [])), this.traverse(hoistVariablesVisitor);
    const completionRecords = this.get("callee").getCompletionRecords();
    for (const path of completionRecords) {
      if (!path.isExpressionStatement()) continue;
      const loop = path.findParent(path => path.isLoop());
      if (loop) {
        let uid = loop.getData("expressionReplacementReturnUid");
        if (uid) uid = t.identifier(uid.name); else {
          const callee = this.get("callee");
          uid = callee.scope.generateDeclaredUidIdentifier("ret"), callee.get("body").pushContainer("body", t.returnStatement(t.cloneNode(uid))), 
          loop.setData("expressionReplacementReturnUid", uid);
        }
        path.get("expression").replaceWith(t.assignmentExpression("=", t.cloneNode(uid), path.node.expression));
      } else path.replaceWith(t.returnStatement(path.node.expression));
    }
    const callee = this.get("callee");
    callee.arrowFunctionToExpression(), isParentAsync && _index.default.hasType(this.get("callee.body").node, "AwaitExpression", t.FUNCTION_TYPES) && (callee.set("async", !0), 
    this.replaceWith(t.awaitExpression(this.node)));
    return callee.get("body.body");
  }, exports.replaceInline = function(nodes) {
    if (this.resync(), Array.isArray(nodes)) {
      if (Array.isArray(this.container)) {
        nodes = this._verifyNodeList(nodes);
        const paths = this._containerInsertAfter(nodes);
        return this.remove(), paths;
      }
      return this.replaceWithMultiple(nodes);
    }
    return this.replaceWith(nodes);
  };
  var _codeFrame = __webpack_require__(48), _index = _interopRequireDefault(__webpack_require__(92)), _index2 = _interopRequireDefault(__webpack_require__(34)), _parser = __webpack_require__(47), t = function(obj) {
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
  const hoistVariablesVisitor = {
    Function(path) {
      path.skip();
    },
    VariableDeclaration(path) {
      if ("var" !== path.node.kind) return;
      const bindings = path.getBindingIdentifiers();
      for (const key of Object.keys(bindings)) path.scope.push({
        id: bindings[key]
      });
      const exprs = [];
      for (const declar of path.node.declarations) declar.init && exprs.push(t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init)));
      path.replaceWithMultiple(exprs);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.evaluateTruthy = function() {
    const res = this.evaluate();
    if (res.confident) return !!res.value;
  }, exports.evaluate = function() {
    const state = {
      confident: !0,
      deoptPath: null,
      seen: new Map
    };
    let value = evaluateCached(this, state);
    state.confident || (value = void 0);
    return {
      confident: state.confident,
      deopt: state.deoptPath,
      value: value
    };
  };
  const VALID_CALLEES = [ "String", "Number", "Math" ], INVALID_METHODS = [ "random" ];
  function deopt(path, state) {
    state.confident && (state.deoptPath = path, state.confident = !1);
  }
  function evaluateCached(path, state) {
    const {node: node} = path, {seen: seen} = state;
    if (seen.has(node)) {
      const existing = seen.get(node);
      return existing.resolved ? existing.value : void deopt(path, state);
    }
    {
      const item = {
        resolved: !1
      };
      seen.set(node, item);
      const val = function(path, state) {
        if (!state.confident) return;
        const {node: node} = path;
        if (path.isSequenceExpression()) {
          const exprs = path.get("expressions");
          return evaluateCached(exprs[exprs.length - 1], state);
        }
        if (path.isStringLiteral() || path.isNumericLiteral() || path.isBooleanLiteral()) return node.value;
        if (path.isNullLiteral()) return null;
        if (path.isTemplateLiteral()) return evaluateQuasis(path, node.quasis, state);
        if (path.isTaggedTemplateExpression() && path.get("tag").isMemberExpression()) {
          const object = path.get("tag.object"), {node: {name: name}} = object, property = path.get("tag.property");
          if (object.isIdentifier() && "String" === name && !path.scope.getBinding(name, !0) && property.isIdentifier && "raw" === property.node.name) return evaluateQuasis(path, node.quasi.quasis, state, !0);
        }
        if (path.isConditionalExpression()) {
          const testResult = evaluateCached(path.get("test"), state);
          if (!state.confident) return;
          return evaluateCached(testResult ? path.get("consequent") : path.get("alternate"), state);
        }
        if (path.isExpressionWrapper()) return evaluateCached(path.get("expression"), state);
        if (path.isMemberExpression() && !path.parentPath.isCallExpression({
          callee: node
        })) {
          const property = path.get("property"), object = path.get("object");
          if (object.isLiteral() && property.isIdentifier()) {
            const value = object.node.value, type = typeof value;
            if ("number" === type || "string" === type) return value[property.node.name];
          }
        }
        if (path.isReferencedIdentifier()) {
          const binding = path.scope.getBinding(node.name);
          if (binding && binding.constantViolations.length > 0) return deopt(binding.path, state);
          if (binding && path.node.start < binding.path.node.end) return deopt(binding.path, state);
          if (null == binding ? void 0 : binding.hasValue) return binding.value;
          {
            if ("undefined" === node.name) return binding ? deopt(binding.path, state) : void 0;
            if ("Infinity" === node.name) return binding ? deopt(binding.path, state) : 1 / 0;
            if ("NaN" === node.name) return binding ? deopt(binding.path, state) : NaN;
            const resolved = path.resolve();
            return resolved === path ? deopt(path, state) : evaluateCached(resolved, state);
          }
        }
        if (path.isUnaryExpression({
          prefix: !0
        })) {
          if ("void" === node.operator) return;
          const argument = path.get("argument");
          if ("typeof" === node.operator && (argument.isFunction() || argument.isClass())) return "function";
          const arg = evaluateCached(argument, state);
          if (!state.confident) return;
          switch (node.operator) {
           case "!":
            return !arg;

           case "+":
            return +arg;

           case "-":
            return -arg;

           case "~":
            return ~arg;

           case "typeof":
            return typeof arg;
          }
        }
        if (path.isArrayExpression()) {
          const arr = [], elems = path.get("elements");
          for (const elem of elems) {
            const elemValue = elem.evaluate();
            if (!elemValue.confident) return deopt(elem, state);
            arr.push(elemValue.value);
          }
          return arr;
        }
        if (path.isObjectExpression()) {
          const obj = {}, props = path.get("properties");
          for (const prop of props) {
            if (prop.isObjectMethod() || prop.isSpreadElement()) return deopt(prop, state);
            const keyPath = prop.get("key");
            let key = keyPath;
            if (prop.node.computed) {
              if (key = key.evaluate(), !key.confident) return deopt(keyPath, state);
              key = key.value;
            } else key = key.isIdentifier() ? key.node.name : key.node.value;
            const valuePath = prop.get("value");
            let value = valuePath.evaluate();
            if (!value.confident) return deopt(valuePath, state);
            value = value.value, obj[key] = value;
          }
          return obj;
        }
        if (path.isLogicalExpression()) {
          const wasConfident = state.confident, left = evaluateCached(path.get("left"), state), leftConfident = state.confident;
          state.confident = wasConfident;
          const right = evaluateCached(path.get("right"), state), rightConfident = state.confident;
          switch (node.operator) {
           case "||":
            if (state.confident = leftConfident && (!!left || rightConfident), !state.confident) return;
            return left || right;

           case "&&":
            if (state.confident = leftConfident && (!left || rightConfident), !state.confident) return;
            return left && right;
          }
        }
        if (path.isBinaryExpression()) {
          const left = evaluateCached(path.get("left"), state);
          if (!state.confident) return;
          const right = evaluateCached(path.get("right"), state);
          if (!state.confident) return;
          switch (node.operator) {
           case "-":
            return left - right;

           case "+":
            return left + right;

           case "/":
            return left / right;

           case "*":
            return left * right;

           case "%":
            return left % right;

           case "**":
            return Math.pow(left, right);

           case "<":
            return left < right;

           case ">":
            return left > right;

           case "<=":
            return left <= right;

           case ">=":
            return left >= right;

           case "==":
            return left == right;

           case "!=":
            return left != right;

           case "===":
            return left === right;

           case "!==":
            return left !== right;

           case "|":
            return left | right;

           case "&":
            return left & right;

           case "^":
            return left ^ right;

           case "<<":
            return left << right;

           case ">>":
            return left >> right;

           case ">>>":
            return left >>> right;
          }
        }
        if (path.isCallExpression()) {
          const callee = path.get("callee");
          let context, func;
          if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name, !0) && VALID_CALLEES.indexOf(callee.node.name) >= 0 && (func = global[node.callee.name]), 
          callee.isMemberExpression()) {
            const object = callee.get("object"), property = callee.get("property");
            if (object.isIdentifier() && property.isIdentifier() && VALID_CALLEES.indexOf(object.node.name) >= 0 && INVALID_METHODS.indexOf(property.node.name) < 0 && (context = global[object.node.name], 
            func = context[property.node.name]), object.isLiteral() && property.isIdentifier()) {
              const type = typeof object.node.value;
              "string" !== type && "number" !== type || (context = object.node.value, func = context[property.node.name]);
            }
          }
          if (func) {
            const args = path.get("arguments").map(arg => evaluateCached(arg, state));
            if (!state.confident) return;
            return func.apply(context, args);
          }
        }
        deopt(path, state);
      }(path, state);
      return state.confident && (item.resolved = !0, item.value = val), val;
    }
  }
  function evaluateQuasis(path, quasis, state, raw = !1) {
    let str = "", i = 0;
    const exprs = path.get("expressions");
    for (const elem of quasis) {
      if (!state.confident) break;
      str += raw ? elem.value.raw : elem.value.cooked;
      const expr = exprs[i++];
      expr && (str += String(evaluateCached(expr, state)));
    }
    if (state.confident) return str;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.toComputedKey = function() {
    const node = this.node;
    let key;
    if (this.isMemberExpression()) key = node.property; else {
      if (!this.isProperty() && !this.isMethod()) throw new ReferenceError("todo");
      key = node.key;
    }
    node.computed || t.isIdentifier(key) && (key = t.stringLiteral(key.name));
    return key;
  }, exports.ensureBlock = function() {
    const body = this.get("body"), bodyNode = body.node;
    if (Array.isArray(body)) throw new Error("Can't convert array path to a block statement");
    if (!bodyNode) throw new Error("Can't convert node without a body");
    if (body.isBlockStatement()) return bodyNode;
    const statements = [];
    let key, listKey, stringPath = "body";
    body.isStatement() ? (listKey = "body", key = 0, statements.push(body.node)) : (stringPath += ".body.0", 
    this.isFunction() ? (key = "argument", statements.push(t.returnStatement(body.node))) : (key = "expression", 
    statements.push(t.expressionStatement(body.node))));
    this.node.body = t.blockStatement(statements);
    const parentPath = this.get(stringPath);
    return body.setup(parentPath, listKey ? parentPath.node[listKey] : parentPath.node, listKey, key), 
    this.node;
  }, exports.arrowFunctionToShadowed = function() {
    if (!this.isArrowFunctionExpression()) return;
    this.arrowFunctionToExpression();
  }, exports.unwrapFunctionEnvironment = function() {
    if (!this.isArrowFunctionExpression() && !this.isFunctionExpression() && !this.isFunctionDeclaration()) throw this.buildCodeFrameError("Can only unwrap the environment of a function.");
    hoistFunctionEnvironment(this);
  }, exports.arrowFunctionToExpression = function({allowInsertArrow: allowInsertArrow = !0, specCompliant: specCompliant = !1} = {}) {
    if (!this.isArrowFunctionExpression()) throw this.buildCodeFrameError("Cannot convert non-arrow function to a function expression.");
    const thisBinding = hoistFunctionEnvironment(this, specCompliant, allowInsertArrow);
    if (this.ensureBlock(), this.node.type = "FunctionExpression", specCompliant) {
      const checkBinding = thisBinding ? null : this.parentPath.scope.generateUidIdentifier("arrowCheckId");
      checkBinding && this.parentPath.scope.push({
        id: checkBinding,
        init: t.objectExpression([])
      }), this.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(this.hub.addHelper("newArrowCheck"), [ t.thisExpression(), checkBinding ? t.identifier(checkBinding.name) : t.identifier(thisBinding) ]))), 
      this.replaceWith(t.callExpression(t.memberExpression((0, _helperFunctionName.default)(this, !0) || this.node, t.identifier("bind")), [ checkBinding ? t.identifier(checkBinding.name) : t.thisExpression() ]));
    }
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
  }(__webpack_require__(0)), _helperFunctionName = (obj = __webpack_require__(413)) && obj.__esModule ? obj : {
    default: obj
  };
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  function hoistFunctionEnvironment(fnPath, specCompliant = !1, allowInsertArrow = !0) {
    const thisEnvFn = fnPath.findParent(p => p.isFunction() && !p.isArrowFunctionExpression() || p.isProgram() || p.isClassProperty({
      static: !1
    })), inConstructor = "constructor" === (null == thisEnvFn ? void 0 : thisEnvFn.node.kind);
    if (thisEnvFn.isClassProperty()) throw fnPath.buildCodeFrameError("Unable to transform arrow inside class property");
    const {thisPaths: thisPaths, argumentsPaths: argumentsPaths, newTargetPaths: newTargetPaths, superProps: superProps, superCalls: superCalls} = function(fnPath) {
      const thisPaths = [], argumentsPaths = [], newTargetPaths = [], superProps = [], superCalls = [];
      return fnPath.traverse({
        ClassProperty(child) {
          child.skip();
        },
        Function(child) {
          child.isArrowFunctionExpression() || child.skip();
        },
        ThisExpression(child) {
          thisPaths.push(child);
        },
        JSXIdentifier(child) {
          "this" === child.node.name && (child.parentPath.isJSXMemberExpression({
            object: child.node
          }) || child.parentPath.isJSXOpeningElement({
            name: child.node
          })) && thisPaths.push(child);
        },
        CallExpression(child) {
          child.get("callee").isSuper() && superCalls.push(child);
        },
        MemberExpression(child) {
          child.get("object").isSuper() && superProps.push(child);
        },
        ReferencedIdentifier(child) {
          "arguments" === child.node.name && argumentsPaths.push(child);
        },
        MetaProperty(child) {
          child.get("meta").isIdentifier({
            name: "new"
          }) && child.get("property").isIdentifier({
            name: "target"
          }) && newTargetPaths.push(child);
        }
      }), {
        thisPaths: thisPaths,
        argumentsPaths: argumentsPaths,
        newTargetPaths: newTargetPaths,
        superProps: superProps,
        superCalls: superCalls
      };
    }(fnPath);
    if (inConstructor && superCalls.length > 0) {
      if (!allowInsertArrow) throw superCalls[0].buildCodeFrameError("Unable to handle nested super() usage in arrow");
      const allSuperCalls = [];
      thisEnvFn.traverse({
        Function(child) {
          child.isArrowFunctionExpression() || child.skip();
        },
        ClassProperty(child) {
          child.skip();
        },
        CallExpression(child) {
          child.get("callee").isSuper() && allSuperCalls.push(child);
        }
      });
      const superBinding = function(thisEnvFn) {
        return getBinding(thisEnvFn, "supercall", () => {
          const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
          return t.arrowFunctionExpression([ t.restElement(argsBinding) ], t.callExpression(t.super(), [ t.spreadElement(t.identifier(argsBinding.name)) ]));
        });
      }(thisEnvFn);
      allSuperCalls.forEach(superCall => {
        const callee = t.identifier(superBinding);
        callee.loc = superCall.node.callee.loc, superCall.get("callee").replaceWith(callee);
      });
    }
    if (argumentsPaths.length > 0) {
      const argumentsBinding = getBinding(thisEnvFn, "arguments", () => t.identifier("arguments"));
      argumentsPaths.forEach(argumentsChild => {
        const argsRef = t.identifier(argumentsBinding);
        argsRef.loc = argumentsChild.node.loc, argumentsChild.replaceWith(argsRef);
      });
    }
    if (newTargetPaths.length > 0) {
      const newTargetBinding = getBinding(thisEnvFn, "newtarget", () => t.metaProperty(t.identifier("new"), t.identifier("target")));
      newTargetPaths.forEach(targetChild => {
        const targetRef = t.identifier(newTargetBinding);
        targetRef.loc = targetChild.node.loc, targetChild.replaceWith(targetRef);
      });
    }
    if (superProps.length > 0) {
      if (!allowInsertArrow) throw superProps[0].buildCodeFrameError("Unable to handle nested super.prop usage");
      superProps.reduce((acc, superProp) => acc.concat(function(superProp) {
        if (superProp.parentPath.isAssignmentExpression() && "=" !== superProp.parentPath.node.operator) {
          const assignmentPath = superProp.parentPath, op = assignmentPath.node.operator.slice(0, -1), value = assignmentPath.node.right;
          if (assignmentPath.node.operator = "=", superProp.node.computed) {
            const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
            assignmentPath.get("left").replaceWith(t.memberExpression(superProp.node.object, t.assignmentExpression("=", tmp, superProp.node.property), !0)), 
            assignmentPath.get("right").replaceWith(t.binaryExpression(op, t.memberExpression(superProp.node.object, t.identifier(tmp.name), !0), value));
          } else assignmentPath.get("left").replaceWith(t.memberExpression(superProp.node.object, superProp.node.property)), 
          assignmentPath.get("right").replaceWith(t.binaryExpression(op, t.memberExpression(superProp.node.object, t.identifier(superProp.node.property.name)), value));
          return [ assignmentPath.get("left"), assignmentPath.get("right").get("left") ];
        }
        if (superProp.parentPath.isUpdateExpression()) {
          const updateExpr = superProp.parentPath, tmp = superProp.scope.generateDeclaredUidIdentifier("tmp"), computedKey = superProp.node.computed ? superProp.scope.generateDeclaredUidIdentifier("prop") : null, parts = [ t.assignmentExpression("=", tmp, t.memberExpression(superProp.node.object, computedKey ? t.assignmentExpression("=", computedKey, superProp.node.property) : superProp.node.property, superProp.node.computed)), t.assignmentExpression("=", t.memberExpression(superProp.node.object, computedKey ? t.identifier(computedKey.name) : superProp.node.property, superProp.node.computed), t.binaryExpression("+", t.identifier(tmp.name), t.numericLiteral(1))) ];
          superProp.parentPath.node.prefix || parts.push(t.identifier(tmp.name)), updateExpr.replaceWith(t.sequenceExpression(parts));
          const left = updateExpr.get("expressions.0.right"), right = updateExpr.get("expressions.1.left");
          return [ left, right ];
        }
        return [ superProp ];
      }(superProp)), []).forEach(superProp => {
        const key = superProp.node.computed ? "" : superProp.get("property").node.name, isAssignment = superProp.parentPath.isAssignmentExpression({
          left: superProp.node
        }), isCall = superProp.parentPath.isCallExpression({
          callee: superProp.node
        }), superBinding = function(thisEnvFn, isAssignment, propName) {
          return getBinding(thisEnvFn, `superprop_${isAssignment ? "set" : "get"}:${propName || ""}`, () => {
            const argsList = [];
            let fnBody;
            if (propName) fnBody = t.memberExpression(t.super(), t.identifier(propName)); else {
              const method = thisEnvFn.scope.generateUidIdentifier("prop");
              argsList.unshift(method), fnBody = t.memberExpression(t.super(), t.identifier(method.name), !0);
            }
            if (isAssignment) {
              const valueIdent = thisEnvFn.scope.generateUidIdentifier("value");
              argsList.push(valueIdent), fnBody = t.assignmentExpression("=", fnBody, t.identifier(valueIdent.name));
            }
            return t.arrowFunctionExpression(argsList, fnBody);
          });
        }(thisEnvFn, isAssignment, key), args = [];
        if (superProp.node.computed && args.push(superProp.get("property").node), isAssignment) {
          const value = superProp.parentPath.node.right;
          args.push(value);
        }
        const call = t.callExpression(t.identifier(superBinding), args);
        isCall ? (superProp.parentPath.unshiftContainer("arguments", t.thisExpression()), 
        superProp.replaceWith(t.memberExpression(call, t.identifier("call"))), thisPaths.push(superProp.parentPath.get("arguments.0"))) : isAssignment ? superProp.parentPath.replaceWith(call) : superProp.replaceWith(call);
      });
    }
    let thisBinding;
    return (thisPaths.length > 0 || specCompliant) && (thisBinding = function(thisEnvFn, inConstructor) {
      return getBinding(thisEnvFn, "this", thisBinding => {
        if (!inConstructor || !hasSuperClass(thisEnvFn)) return t.thisExpression();
        const supers = new WeakSet;
        thisEnvFn.traverse({
          Function(child) {
            child.isArrowFunctionExpression() || child.skip();
          },
          ClassProperty(child) {
            child.skip();
          },
          CallExpression(child) {
            child.get("callee").isSuper() && (supers.has(child.node) || (supers.add(child.node), 
            child.replaceWithMultiple([ child.node, t.assignmentExpression("=", t.identifier(thisBinding), t.identifier("this")) ])));
          }
        });
      });
    }(thisEnvFn, inConstructor), (!specCompliant || inConstructor && hasSuperClass(thisEnvFn)) && (thisPaths.forEach(thisChild => {
      const thisRef = thisChild.isJSX() ? t.jsxIdentifier(thisBinding) : t.identifier(thisBinding);
      thisRef.loc = thisChild.node.loc, thisChild.replaceWith(thisRef);
    }), specCompliant && (thisBinding = null))), thisBinding;
  }
  function hasSuperClass(thisEnvFn) {
    return thisEnvFn.isClassMethod() && !!thisEnvFn.parentPath.parentPath.node.superClass;
  }
  function getBinding(thisEnvFn, key, init) {
    const cacheKey = "binding:" + key;
    let data = thisEnvFn.getData(cacheKey);
    if (!data) {
      const id = thisEnvFn.scope.generateUidIdentifier(key);
      data = id.name, thisEnvFn.setData(cacheKey, data), thisEnvFn.scope.push({
        id: id,
        init: init(data)
      });
    }
    return data;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function({node: node, parent: parent, scope: scope, id: id}, localBinding = !1) {
    if (node.id) return;
    if (!t.isObjectProperty(parent) && !t.isObjectMethod(parent, {
      kind: "method"
    }) || parent.computed && !t.isLiteral(parent.key)) {
      if (t.isVariableDeclarator(parent)) {
        if (id = parent.id, t.isIdentifier(id) && !localBinding) {
          const binding = scope.parent.getBinding(id.name);
          if (binding && binding.constant && scope.getBinding(id.name) === binding) return node.id = t.cloneNode(id), 
          void (node.id[t.NOT_LOCAL_BINDING] = !0);
        }
      } else if (t.isAssignmentExpression(parent, {
        operator: "="
      })) id = parent.left; else if (!id) return;
    } else id = parent.key;
    let name;
    id && t.isLiteral(id) ? name = function(id) {
      if (t.isNullLiteral(id)) return "null";
      if (t.isRegExpLiteral(id)) return `_${id.pattern}_${id.flags}`;
      if (t.isTemplateLiteral(id)) return id.quasis.map(quasi => quasi.value.raw).join("");
      if (void 0 !== id.value) return id.value + "";
      return "";
    }(id) : id && t.isIdentifier(id) && (name = id.name);
    if (void 0 === name) return;
    name = t.toBindingIdentifierName(name), (id = t.identifier(name))[t.NOT_LOCAL_BINDING] = !0;
    return function(state, method, id, scope) {
      if (state.selfReference) {
        if (!scope.hasBinding(id.name) || scope.hasGlobal(id.name)) {
          if (!t.isFunction(method)) return;
          let build = buildPropertyMethodAssignmentWrapper;
          method.generator && (build = buildGeneratorPropertyMethodAssignmentWrapper);
          const template = build({
            FUNCTION: method,
            FUNCTION_ID: id,
            FUNCTION_KEY: scope.generateUidIdentifier(id.name)
          }).expression, params = template.callee.body.body[0].params;
          for (let i = 0, len = (0, _helperGetFunctionArity.default)(method); i < len; i++) params.push(scope.generateUidIdentifier("x"));
          return template;
        }
        scope.rename(id.name);
      }
      method.id = id, scope.getProgramParent().references[id.name] = !0;
    }(function(node, name, scope) {
      const state = {
        selfAssignment: !1,
        selfReference: !1,
        outerDeclar: scope.getBindingIdentifier(name),
        references: [],
        name: name
      }, binding = scope.getOwnBinding(name);
      binding ? "param" === binding.kind && (state.selfReference = !0) : (state.outerDeclar || scope.hasGlobal(name)) && scope.traverse(node, visitor, state);
      return state;
    }(node, name, scope), node, id, scope) || node;
  };
  var _helperGetFunctionArity = _interopRequireDefault(__webpack_require__(414)), _template = _interopRequireDefault(__webpack_require__(35)), t = function(obj) {
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
  const buildPropertyMethodAssignmentWrapper = (0, _template.default)("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), buildGeneratorPropertyMethodAssignmentWrapper = (0, 
  _template.default)("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), visitor = {
    "ReferencedIdentifier|BindingIdentifier"(path, state) {
      if (path.node.name !== state.name) return;
      path.scope.getBindingIdentifier(state.name) === state.outerDeclar && (state.selfReference = !0, 
      path.stop());
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    const params = node.params;
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (t.isAssignmentPattern(param) || t.isRestElement(param)) return i;
    }
    return params.length;
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
  }), exports.matchesPattern = function(pattern, allowPartial) {
    return t.matchesPattern(this.node, pattern, allowPartial);
  }, exports.has = has, exports.isStatic = function() {
    return this.scope.isStatic(this.node);
  }, exports.isnt = function(key) {
    return !this.has(key);
  }, exports.equals = function(key, value) {
    return this.node[key] === value;
  }, exports.isNodeType = function(type) {
    return t.isType(this.type, type);
  }, exports.canHaveVariableDeclarationOrExpression = function() {
    return ("init" === this.key || "left" === this.key) && this.parentPath.isFor();
  }, exports.canSwapBetweenExpressionAndStatement = function(replacement) {
    if ("body" !== this.key || !this.parentPath.isArrowFunctionExpression()) return !1;
    if (this.isExpression()) return t.isBlockStatement(replacement);
    if (this.isBlockStatement()) return t.isExpression(replacement);
    return !1;
  }, exports.isCompletionRecord = function(allowInsideFunction) {
    let path = this, first = !0;
    do {
      const container = path.container;
      if (path.isFunction() && !first) return !!allowInsideFunction;
      if (first = !1, Array.isArray(container) && path.key !== container.length - 1) return !1;
    } while ((path = path.parentPath) && !path.isProgram());
    return !0;
  }, exports.isStatementOrBlock = function() {
    return !this.parentPath.isLabeledStatement() && !t.isBlockStatement(this.container) && t.STATEMENT_OR_BLOCK_KEYS.includes(this.key);
  }, exports.referencesImport = function(moduleSource, importName) {
    if (!this.isReferencedIdentifier()) return !1;
    const binding = this.scope.getBinding(this.node.name);
    if (!binding || "module" !== binding.kind) return !1;
    const path = binding.path, parent = path.parentPath;
    if (!parent.isImportDeclaration()) return !1;
    if (parent.node.source.value !== moduleSource) return !1;
    if (!importName) return !0;
    if (path.isImportDefaultSpecifier() && "default" === importName) return !0;
    if (path.isImportNamespaceSpecifier() && "*" === importName) return !0;
    if (path.isImportSpecifier() && path.node.imported.name === importName) return !0;
    return !1;
  }, exports.getSource = function() {
    const node = this.node;
    if (node.end) {
      const code = this.hub.getCode();
      if (code) return code.slice(node.start, node.end);
    }
    return "";
  }, exports.willIMaybeExecuteBefore = function(target) {
    return "after" !== this._guessExecutionStatusRelativeTo(target);
  }, exports._guessExecutionStatusRelativeTo = function(target) {
    const funcParent = {
      this: getOuterFunction(this),
      target: getOuterFunction(target)
    };
    if (funcParent.target.node !== funcParent.this.node) return this._guessExecutionStatusRelativeToDifferentFunctions(funcParent.target);
    const paths = {
      target: target.getAncestry(),
      this: this.getAncestry()
    };
    if (paths.target.indexOf(this) >= 0) return "after";
    if (paths.this.indexOf(target) >= 0) return "before";
    let commonPath;
    const commonIndex = {
      target: 0,
      this: 0
    };
    for (;!commonPath && commonIndex.this < paths.this.length; ) {
      const path = paths.this[commonIndex.this];
      commonIndex.target = paths.target.indexOf(path), commonIndex.target >= 0 ? commonPath = path : commonIndex.this++;
    }
    if (!commonPath) throw new Error("Internal Babel error - The two compared nodes don't appear to belong to the same program.");
    if (isExecutionUncertainInList(paths.this, commonIndex.this - 1) || isExecutionUncertainInList(paths.target, commonIndex.target - 1)) return "unknown";
    const divergence = {
      this: paths.this[commonIndex.this - 1],
      target: paths.target[commonIndex.target - 1]
    };
    if (divergence.target.listKey && divergence.this.listKey && divergence.target.container === divergence.this.container) return divergence.target.key > divergence.this.key ? "before" : "after";
    const keys = t.VISITOR_KEYS[commonPath.type], keyPosition = {
      this: keys.indexOf(divergence.this.parentKey),
      target: keys.indexOf(divergence.target.parentKey)
    };
    return keyPosition.target > keyPosition.this ? "before" : "after";
  }, exports._guessExecutionStatusRelativeToDifferentFunctions = function(target) {
    if (!target.isFunctionDeclaration() || target.parentPath.isExportDeclaration()) return "unknown";
    const binding = target.scope.getBinding(target.node.id.name);
    if (!binding.references) return "before";
    const referencePaths = binding.referencePaths;
    let allStatus;
    for (const path of referencePaths) {
      if (!!path.find(path => path.node === target.node)) continue;
      if ("callee" !== path.key || !path.parentPath.isCallExpression()) return "unknown";
      if (executionOrderCheckedNodes.has(path.node)) continue;
      executionOrderCheckedNodes.add(path.node);
      const status = this._guessExecutionStatusRelativeTo(path);
      if (executionOrderCheckedNodes.delete(path.node), allStatus && allStatus !== status) return "unknown";
      allStatus = status;
    }
    return allStatus;
  }, exports.resolve = function(dangerous, resolved) {
    return this._resolve(dangerous, resolved) || this;
  }, exports._resolve = function(dangerous, resolved) {
    if (resolved && resolved.indexOf(this) >= 0) return;
    if ((resolved = resolved || []).push(this), this.isVariableDeclarator()) {
      if (this.get("id").isIdentifier()) return this.get("init").resolve(dangerous, resolved);
    } else if (this.isReferencedIdentifier()) {
      const binding = this.scope.getBinding(this.node.name);
      if (!binding) return;
      if (!binding.constant) return;
      if ("module" === binding.kind) return;
      if (binding.path !== this) {
        const ret = binding.path.resolve(dangerous, resolved);
        if (this.find(parent => parent.node === ret.node)) return;
        return ret;
      }
    } else {
      if (this.isTypeCastExpression()) return this.get("expression").resolve(dangerous, resolved);
      if (dangerous && this.isMemberExpression()) {
        const targetKey = this.toComputedKey();
        if (!t.isLiteral(targetKey)) return;
        const targetName = targetKey.value, target = this.get("object").resolve(dangerous, resolved);
        if (target.isObjectExpression()) {
          const props = target.get("properties");
          for (const prop of props) {
            if (!prop.isProperty()) continue;
            const key = prop.get("key");
            let match = prop.isnt("computed") && key.isIdentifier({
              name: targetName
            });
            if (match = match || key.isLiteral({
              value: targetName
            }), match) return prop.get("value").resolve(dangerous, resolved);
          }
        } else if (target.isArrayExpression() && !isNaN(+targetName)) {
          const elem = target.get("elements")[targetName];
          if (elem) return elem.resolve(dangerous, resolved);
        }
      }
    }
  }, exports.isConstantExpression = function() {
    if (this.isIdentifier()) {
      const binding = this.scope.getBinding(this.node.name);
      return !!binding && binding.constant;
    }
    if (this.isLiteral()) return !this.isRegExpLiteral() && (!this.isTemplateLiteral() || this.get("expressions").every(expression => expression.isConstantExpression()));
    if (this.isUnaryExpression()) return "void" === this.get("operator").node && this.get("argument").isConstantExpression();
    if (this.isBinaryExpression()) return this.get("left").isConstantExpression() && this.get("right").isConstantExpression();
    return !1;
  }, exports.isInStrictMode = function() {
    const start = this.isProgram() ? this : this.parentPath;
    return !!start.find(path => {
      if (path.isProgram({
        sourceType: "module"
      })) return !0;
      if (path.isClass()) return !0;
      if (!path.isProgram() && !path.isFunction()) return !1;
      if (path.isArrowFunctionExpression() && !path.get("body").isBlockStatement()) return !1;
      let {node: node} = path;
      path.isFunction() && (node = node.body);
      for (const directive of node.directives) if ("use strict" === directive.value.value) return !0;
    });
  }, exports.is = void 0;
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
  function has(key) {
    const val = this.node && this.node[key];
    return val && Array.isArray(val) ? !!val.length : !!val;
  }
  const is = has;
  function getOuterFunction(path) {
    return (path.scope.getFunctionParent() || path.scope.getProgramParent()).path;
  }
  function isExecutionUncertain(type, key) {
    switch (type) {
     case "LogicalExpression":
      return "right" === key;

     case "ConditionalExpression":
     case "IfStatement":
      return "consequent" === key || "alternate" === key;

     case "WhileStatement":
     case "DoWhileStatement":
     case "ForInStatement":
     case "ForOfStatement":
      return "body" === key;

     case "ForStatement":
      return "body" === key || "update" === key;

     case "SwitchStatement":
      return "cases" === key;

     case "TryStatement":
      return "handler" === key;

     case "AssignmentPattern":
      return "right" === key;

     case "OptionalMemberExpression":
      return "property" === key;

     case "OptionalCallExpression":
      return "arguments" === key;

     default:
      return !1;
    }
  }
  function isExecutionUncertainInList(paths, maxIndex) {
    for (let i = 0; i < maxIndex; i++) {
      const path = paths[i];
      if (isExecutionUncertain(path.parent.type, path.parentKey)) return !0;
    }
    return !1;
  }
  exports.is = is;
  const executionOrderCheckedNodes = new WeakSet;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.call = function(key) {
    const opts = this.opts;
    if (this.debug(key), this.node && this._call(opts[key])) return !0;
    if (this.node) return this._call(opts[this.node.type] && opts[this.node.type][key]);
    return !1;
  }, exports._call = function(fns) {
    if (!fns) return !1;
    for (const fn of fns) {
      if (!fn) continue;
      const node = this.node;
      if (!node) return !0;
      const ret = fn.call(this.state, this, this.state);
      if (ret && "object" == typeof ret && "function" == typeof ret.then) throw new Error("You appear to be using a plugin with an async traversal visitor, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
      if (ret) throw new Error("Unexpected return value from visitor method " + fn);
      if (this.node !== node) return !0;
      if (this._traverseFlags > 0) return !0;
    }
    return !1;
  }, exports.isBlacklisted = function() {
    const blacklist = this.opts.blacklist;
    return blacklist && blacklist.indexOf(this.node.type) > -1;
  }, exports.visit = function() {
    if (!this.node) return !1;
    if (this.isBlacklisted()) return !1;
    if (this.opts.shouldSkip && this.opts.shouldSkip(this)) return !1;
    if (this.shouldSkip || this.call("enter") || this.shouldSkip) return this.debug("Skip..."), 
    this.shouldStop;
    return this.debug("Recursing into..."), _index.default.node(this.node, this.opts, this.scope, this.state, this, this.skipKeys), 
    this.call("exit"), this.shouldStop;
  }, exports.skip = function() {
    this.shouldSkip = !0;
  }, exports.skipKey = function(key) {
    null == this.skipKeys && (this.skipKeys = {});
    this.skipKeys[key] = !0;
  }, exports.stop = function() {
    this._traverseFlags |= _index2.SHOULD_SKIP | _index2.SHOULD_STOP;
  }, exports.setScope = function() {
    if (this.opts && this.opts.noScope) return;
    let target, path = this.parentPath;
    for (;path && !target; ) {
      if (path.opts && path.opts.noScope) return;
      target = path.scope, path = path.parentPath;
    }
    this.scope = this.getScope(target), this.scope && this.scope.init();
  }, exports.setContext = function(context) {
    null != this.skipKeys && (this.skipKeys = {});
    this._traverseFlags = 0, context && (this.context = context, this.state = context.state, 
    this.opts = context.opts);
    return this.setScope(), this;
  }, exports.resync = function() {
    if (this.removed) return;
    this._resyncParent(), this._resyncList(), this._resyncKey();
  }, exports._resyncParent = function() {
    this.parentPath && (this.parent = this.parentPath.node);
  }, exports._resyncKey = function() {
    if (!this.container) return;
    if (this.node === this.container[this.key]) return;
    if (Array.isArray(this.container)) {
      for (let i = 0; i < this.container.length; i++) if (this.container[i] === this.node) return this.setKey(i);
    } else for (const key of Object.keys(this.container)) if (this.container[key] === this.node) return this.setKey(key);
    this.key = null;
  }, exports._resyncList = function() {
    if (!this.parent || !this.inList) return;
    const newContainer = this.parent[this.listKey];
    if (this.container === newContainer) return;
    this.container = newContainer || null;
  }, exports._resyncRemoved = function() {
    null != this.key && this.container && this.container[this.key] === this.node || this._markRemoved();
  }, exports.popContext = function() {
    this.contexts.pop(), this.contexts.length > 0 ? this.setContext(this.contexts[this.contexts.length - 1]) : this.setContext(void 0);
  }, exports.pushContext = function(context) {
    this.contexts.push(context), this.setContext(context);
  }, exports.setup = function(parentPath, container, listKey, key) {
    this.listKey = listKey, this.container = container, this.parentPath = parentPath || this.parentPath, 
    this.setKey(key);
  }, exports.setKey = function(key) {
    var _this$node;
    this.key = key, this.node = this.container[this.key], this.type = null == (_this$node = this.node) ? void 0 : _this$node.type;
  }, exports.requeue = function(pathToQueue = this) {
    if (pathToQueue.removed) return;
    const contexts = this.contexts;
    for (const context of contexts) context.maybeQueue(pathToQueue);
  }, exports._getQueueContexts = function() {
    let path = this, contexts = this.contexts;
    for (;!contexts.length && (path = path.parentPath, path); ) contexts = path.contexts;
    return contexts;
  };
  var obj, _index = (obj = __webpack_require__(92)) && obj.__esModule ? obj : {
    default: obj
  }, _index2 = __webpack_require__(34);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.remove = function() {
    var _this$opts;
    this._assertUnremoved(), this.resync(), (null == (_this$opts = this.opts) ? void 0 : _this$opts.noScope) || this._removeFromScope();
    if (this._callRemovalHooks()) return void this._markRemoved();
    this.shareCommentsWithSiblings(), this._remove(), this._markRemoved();
  }, exports._removeFromScope = function() {
    const bindings = this.getBindingIdentifiers();
    Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
  }, exports._callRemovalHooks = function() {
    for (const fn of _removalHooks.hooks) if (fn(this, this.parentPath)) return !0;
  }, exports._remove = function() {
    Array.isArray(this.container) ? (this.container.splice(this.key, 1), this.updateSiblingKeys(this.key, -1)) : this._replaceWith(null);
  }, exports._markRemoved = function() {
    this._traverseFlags |= _index.SHOULD_SKIP | _index.REMOVED, this.node = null;
  }, exports._assertUnremoved = function() {
    if (this.removed) throw this.buildCodeFrameError("NodePath has been removed so is read-only.");
  };
  var _removalHooks = __webpack_require__(418), _index = __webpack_require__(34);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.hooks = void 0;
  exports.hooks = [ function(self, parent) {
    if ("test" === self.key && (parent.isWhile() || parent.isSwitchCase()) || "declaration" === self.key && parent.isExportDeclaration() || "body" === self.key && parent.isLabeledStatement() || "declarations" === self.listKey && parent.isVariableDeclaration() && 1 === parent.node.declarations.length || "expression" === self.key && parent.isExpressionStatement()) return parent.remove(), 
    !0;
  }, function(self, parent) {
    if (parent.isSequenceExpression() && 1 === parent.node.expressions.length) return parent.replaceWith(parent.node.expressions[0]), 
    !0;
  }, function(self, parent) {
    if (parent.isBinary()) return "left" === self.key ? parent.replaceWith(parent.node.right) : parent.replaceWith(parent.node.left), 
    !0;
  }, function(self, parent) {
    if (parent.isIfStatement() && ("consequent" === self.key || "alternate" === self.key) || "body" === self.key && (parent.isLoop() || parent.isArrowFunctionExpression())) return self.replaceWith({
      type: "BlockStatement",
      body: []
    }), !0;
  } ];
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.insertBefore = function(nodes) {
    this._assertUnremoved(), nodes = this._verifyNodeList(nodes);
    const {parentPath: parentPath} = this;
    if (parentPath.isExpressionStatement() || parentPath.isLabeledStatement() || parentPath.isExportNamedDeclaration() || parentPath.isExportDefaultDeclaration() && this.isDeclaration()) return parentPath.insertBefore(nodes);
    if (this.isNodeType("Expression") && !this.isJSXElement() || parentPath.isForStatement() && "init" === this.key) return this.node && nodes.push(this.node), 
    this.replaceExpressionWithStatements(nodes);
    if (Array.isArray(this.container)) return this._containerInsertBefore(nodes);
    if (this.isStatementOrBlock()) {
      const shouldInsertCurrentNode = this.node && (!this.isExpressionStatement() || null != this.node.expression);
      return this.replaceWith(t.blockStatement(shouldInsertCurrentNode ? [ this.node ] : [])), 
      this.unshiftContainer("body", nodes);
    }
    throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
  }, exports._containerInsert = function(from, nodes) {
    this.updateSiblingKeys(from, nodes.length);
    const paths = [];
    this.container.splice(from, 0, ...nodes);
    for (let i = 0; i < nodes.length; i++) {
      const to = from + i, path = this.getSibling(to);
      paths.push(path), this.context && this.context.queue && path.pushContext(this.context);
    }
    const contexts = this._getQueueContexts();
    for (const path of paths) {
      path.setScope(), path.debug("Inserted.");
      for (const context of contexts) context.maybeQueue(path, !0);
    }
    return paths;
  }, exports._containerInsertBefore = function(nodes) {
    return this._containerInsert(this.key, nodes);
  }, exports._containerInsertAfter = function(nodes) {
    return this._containerInsert(this.key + 1, nodes);
  }, exports.insertAfter = function(nodes) {
    this._assertUnremoved(), nodes = this._verifyNodeList(nodes);
    const {parentPath: parentPath} = this;
    if (parentPath.isExpressionStatement() || parentPath.isLabeledStatement() || parentPath.isExportNamedDeclaration() || parentPath.isExportDefaultDeclaration() && this.isDeclaration()) return parentPath.insertAfter(nodes.map(node => t.isExpression(node) ? t.expressionStatement(node) : node));
    if (this.isNodeType("Expression") && !this.isJSXElement() && !parentPath.isJSXElement() || parentPath.isForStatement() && "init" === this.key) {
      if (this.node) {
        let {scope: scope} = this;
        parentPath.isMethod({
          computed: !0,
          key: this.node
        }) && (scope = scope.parent);
        const temp = scope.generateDeclaredUidIdentifier();
        nodes.unshift(t.expressionStatement(t.assignmentExpression("=", t.cloneNode(temp), this.node))), 
        nodes.push(t.expressionStatement(t.cloneNode(temp)));
      }
      return this.replaceExpressionWithStatements(nodes);
    }
    if (Array.isArray(this.container)) return this._containerInsertAfter(nodes);
    if (this.isStatementOrBlock()) {
      const shouldInsertCurrentNode = this.node && (!this.isExpressionStatement() || null != this.node.expression);
      return this.replaceWith(t.blockStatement(shouldInsertCurrentNode ? [ this.node ] : [])), 
      this.pushContainer("body", nodes);
    }
    throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
  }, exports.updateSiblingKeys = function(fromIndex, incrementBy) {
    if (!this.parent) return;
    const paths = _cache.path.get(this.parent);
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      path.key >= fromIndex && (path.key += incrementBy);
    }
  }, exports._verifyNodeList = function(nodes) {
    if (!nodes) return [];
    nodes.constructor !== Array && (nodes = [ nodes ]);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let msg;
      if (node ? "object" != typeof node ? msg = "contains a non-object node" : node.type ? node instanceof _index.default && (msg = "has a NodePath when it expected a raw object") : msg = "without a type" : msg = "has falsy node", 
      msg) {
        const type = Array.isArray(node) ? "array" : typeof node;
        throw new Error(`Node list ${msg} with the index of ${i} and type of ${type}`);
      }
    }
    return nodes;
  }, exports.unshiftContainer = function(listKey, nodes) {
    this._assertUnremoved(), nodes = this._verifyNodeList(nodes);
    return _index.default.get({
      parentPath: this,
      parent: this.node,
      container: this.node[listKey],
      listKey: listKey,
      key: 0
    })._containerInsertBefore(nodes);
  }, exports.pushContainer = function(listKey, nodes) {
    this._assertUnremoved(), nodes = this._verifyNodeList(nodes);
    const container = this.node[listKey];
    return _index.default.get({
      parentPath: this,
      parent: this.node,
      container: container,
      listKey: listKey,
      key: container.length
    }).replaceWithMultiple(nodes);
  }, exports.hoist = function(scope = this.scope) {
    return new _hoister.default(this, scope).run();
  };
  var _cache = __webpack_require__(104), _hoister = _interopRequireDefault(__webpack_require__(420)), _index = _interopRequireDefault(__webpack_require__(34)), t = function(obj) {
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
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
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
  const referenceVisitor = {
    ReferencedIdentifier(path, state) {
      if (path.isJSXIdentifier() && t.react.isCompatTag(path.node.name) && !path.parentPath.isJSXMemberExpression()) return;
      if ("this" === path.node.name) {
        let scope = path.scope;
        do {
          if (scope.path.isFunction() && !scope.path.isArrowFunctionExpression()) break;
        } while (scope = scope.parent);
        scope && state.breakOnScopePaths.push(scope.path);
      }
      const binding = path.scope.getBinding(path.node.name);
      if (binding) {
        for (const violation of binding.constantViolations) if (violation.scope !== binding.path.scope) return state.mutableBinding = !0, 
        void path.stop();
        binding === state.scope.getBinding(path.node.name) && (state.bindings[path.node.name] = binding);
      }
    }
  };
  exports.default = class {
    constructor(path, scope) {
      this.breakOnScopePaths = [], this.bindings = {}, this.mutableBinding = !1, this.scopes = [], 
      this.scope = scope, this.path = path, this.attachAfter = !1;
    }
    isCompatibleScope(scope) {
      for (const key of Object.keys(this.bindings)) {
        const binding = this.bindings[key];
        if (!scope.bindingIdentifierEquals(key, binding.identifier)) return !1;
      }
      return !0;
    }
    getCompatibleScopes() {
      let scope = this.path.scope;
      do {
        if (!this.isCompatibleScope(scope)) break;
        if (this.scopes.push(scope), this.breakOnScopePaths.indexOf(scope.path) >= 0) break;
      } while (scope = scope.parent);
    }
    getAttachmentPath() {
      let path = this._getAttachmentPath();
      if (!path) return;
      let targetScope = path.scope;
      if (targetScope.path === path && (targetScope = path.scope.parent), targetScope.path.isProgram() || targetScope.path.isFunction()) for (const name of Object.keys(this.bindings)) {
        if (!targetScope.hasOwnBinding(name)) continue;
        const binding = this.bindings[name];
        if ("param" === binding.kind || "params" === binding.path.parentKey) continue;
        if (this.getAttachmentParentForPath(binding.path).key >= path.key) {
          this.attachAfter = !0, path = binding.path;
          for (const violationPath of binding.constantViolations) this.getAttachmentParentForPath(violationPath).key > path.key && (path = violationPath);
        }
      }
      return path;
    }
    _getAttachmentPath() {
      const scope = this.scopes.pop();
      if (scope) if (scope.path.isFunction()) {
        if (!this.hasOwnParamBindings(scope)) return this.getNextScopeAttachmentParent();
        {
          if (this.scope === scope) return;
          const bodies = scope.path.get("body").get("body");
          for (let i = 0; i < bodies.length; i++) if (!bodies[i].node._blockHoist) return bodies[i];
        }
      } else if (scope.path.isProgram()) return this.getNextScopeAttachmentParent();
    }
    getNextScopeAttachmentParent() {
      const scope = this.scopes.pop();
      if (scope) return this.getAttachmentParentForPath(scope.path);
    }
    getAttachmentParentForPath(path) {
      do {
        if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) return path;
      } while (path = path.parentPath);
    }
    hasOwnParamBindings(scope) {
      for (const name of Object.keys(this.bindings)) {
        if (!scope.hasOwnBinding(name)) continue;
        const binding = this.bindings[name];
        if ("param" === binding.kind && binding.constant) return !0;
      }
      return !1;
    }
    run() {
      if (this.path.traverse(referenceVisitor, this), this.mutableBinding) return;
      this.getCompatibleScopes();
      const attachTo = this.getAttachmentPath();
      if (!attachTo) return;
      if (attachTo.getFunctionParent() === this.path.getFunctionParent()) return;
      let uid = attachTo.scope.generateUidIdentifier("ref");
      const declarator = t.variableDeclarator(uid, this.path.node), insertFn = this.attachAfter ? "insertAfter" : "insertBefore", [attached] = attachTo[insertFn]([ attachTo.isVariableDeclarator() ? declarator : t.variableDeclaration("var", [ declarator ]) ]), parent = this.path.parentPath;
      return parent.isJSXElement() && this.path.container === parent.node.children && (uid = t.JSXExpressionContainer(uid)), 
      this.path.replaceWith(t.cloneNode(uid)), attachTo.isVariableDeclarator() ? attached.get("init") : attached.get("declarations.0.init");
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.getOpposite = function() {
    if ("left" === this.key) return this.getSibling("right");
    if ("right" === this.key) return this.getSibling("left");
  }, exports.getCompletionRecords = function() {
    let paths = [];
    if (this.isIfStatement()) paths = addCompletionRecords(this.get("consequent"), paths), 
    paths = addCompletionRecords(this.get("alternate"), paths); else if (this.isDoExpression() || this.isFor() || this.isWhile()) paths = addCompletionRecords(this.get("body"), paths); else if (this.isProgram() || this.isBlockStatement()) paths = addCompletionRecords(this.get("body").pop(), paths); else {
      if (this.isFunction()) return this.get("body").getCompletionRecords();
      this.isTryStatement() ? (paths = addCompletionRecords(this.get("block"), paths), 
      paths = addCompletionRecords(this.get("handler"), paths)) : this.isCatchClause() ? paths = addCompletionRecords(this.get("body"), paths) : this.isSwitchStatement() ? paths = function(cases, paths) {
        let isLastCaseWithConsequent = !0;
        for (let i = cases.length - 1; i >= 0; i--) {
          const consequent = cases[i].get("consequent");
          let breakStatement;
          findBreak: for (const statement of consequent) if (statement.isBlockStatement()) {
            for (const statementInBlock of statement.get("body")) if (statementInBlock.isBreakStatement()) {
              breakStatement = statementInBlock;
              break findBreak;
            }
          } else if (statement.isBreakStatement()) {
            breakStatement = statement;
            break;
          }
          if (breakStatement) {
            for (;0 === breakStatement.key && breakStatement.parentPath.isBlockStatement(); ) breakStatement = breakStatement.parentPath;
            const prevSibling = breakStatement.getPrevSibling();
            breakStatement.key > 0 && (prevSibling.isExpressionStatement() || prevSibling.isBlockStatement()) ? (paths = addCompletionRecords(prevSibling, paths), 
            breakStatement.remove()) : (breakStatement.replaceWith(breakStatement.scope.buildUndefinedNode()), 
            paths = addCompletionRecords(breakStatement, paths));
          } else if (isLastCaseWithConsequent) {
            const statementFinder = statement => !statement.isBlockStatement() || statement.get("body").some(statementFinder);
            consequent.some(statementFinder) && (paths = addCompletionRecords(consequent[consequent.length - 1], paths), 
            isLastCaseWithConsequent = !1);
          }
        }
        return paths;
      }(this.get("cases"), paths) : paths.push(this);
    }
    return paths;
  }, exports.getSibling = function(key) {
    return _index.default.get({
      parentPath: this.parentPath,
      parent: this.parent,
      container: this.container,
      listKey: this.listKey,
      key: key
    });
  }, exports.getPrevSibling = function() {
    return this.getSibling(this.key - 1);
  }, exports.getNextSibling = function() {
    return this.getSibling(this.key + 1);
  }, exports.getAllNextSiblings = function() {
    let _key = this.key, sibling = this.getSibling(++_key);
    const siblings = [];
    for (;sibling.node; ) siblings.push(sibling), sibling = this.getSibling(++_key);
    return siblings;
  }, exports.getAllPrevSiblings = function() {
    let _key = this.key, sibling = this.getSibling(--_key);
    const siblings = [];
    for (;sibling.node; ) siblings.push(sibling), sibling = this.getSibling(--_key);
    return siblings;
  }, exports.get = function(key, context) {
    !0 === context && (context = this.context);
    const parts = key.split(".");
    return 1 === parts.length ? this._getKey(key, context) : this._getPattern(parts, context);
  }, exports._getKey = function(key, context) {
    const node = this.node, container = node[key];
    return Array.isArray(container) ? container.map((_, i) => _index.default.get({
      listKey: key,
      parentPath: this,
      parent: node,
      container: container,
      key: i
    }).setContext(context)) : _index.default.get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext(context);
  }, exports._getPattern = function(parts, context) {
    let path = this;
    for (const part of parts) path = "." === part ? path.parentPath : Array.isArray(path) ? path[part] : path.get(part, context);
    return path;
  }, exports.getBindingIdentifiers = function(duplicates) {
    return t.getBindingIdentifiers(this.node, duplicates);
  }, exports.getOuterBindingIdentifiers = function(duplicates) {
    return t.getOuterBindingIdentifiers(this.node, duplicates);
  }, exports.getBindingIdentifierPaths = function(duplicates = !1, outerOnly = !1) {
    let search = [].concat(this);
    const ids = Object.create(null);
    for (;search.length; ) {
      const id = search.shift();
      if (!id) continue;
      if (!id.node) continue;
      const keys = t.getBindingIdentifiers.keys[id.node.type];
      if (id.isIdentifier()) if (duplicates) {
        (ids[id.node.name] = ids[id.node.name] || []).push(id);
      } else ids[id.node.name] = id; else if (id.isExportDeclaration()) {
        const declaration = id.get("declaration");
        declaration.isDeclaration() && search.push(declaration);
      } else {
        if (outerOnly) {
          if (id.isFunctionDeclaration()) {
            search.push(id.get("id"));
            continue;
          }
          if (id.isFunctionExpression()) continue;
        }
        if (keys) for (let i = 0; i < keys.length; i++) {
          const key = keys[i], child = id.get(key);
          (Array.isArray(child) || child.node) && (search = search.concat(child));
        }
      }
    }
    return ids;
  }, exports.getOuterBindingIdentifierPaths = function(duplicates) {
    return this.getBindingIdentifierPaths(duplicates, !0);
  };
  var obj, _index = (obj = __webpack_require__(34)) && obj.__esModule ? obj : {
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
  function addCompletionRecords(path, paths) {
    return path ? paths.concat(path.getCompletionRecords()) : paths;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.shareCommentsWithSiblings = function() {
    if ("string" == typeof this.key) return;
    const node = this.node;
    if (!node) return;
    const trailing = node.trailingComments, leading = node.leadingComments;
    if (!trailing && !leading) return;
    const prev = this.getSibling(this.key - 1), next = this.getSibling(this.key + 1), hasPrev = Boolean(prev.node), hasNext = Boolean(next.node);
    hasPrev && !hasNext ? prev.addComments("trailing", trailing) : hasNext && !hasPrev && next.addComments("leading", leading);
  }, exports.addComment = function(type, content, line) {
    t.addComment(this.node, type, content, line);
  }, exports.addComments = function(type, comments) {
    t.addComments(this.node, type, comments);
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
  }), exports.explode = explode, exports.verify = verify, exports.merge = function(visitors, states = [], wrapper) {
    const rootVisitor = {};
    for (let i = 0; i < visitors.length; i++) {
      const visitor = visitors[i], state = states[i];
      explode(visitor);
      for (const type of Object.keys(visitor)) {
        let visitorType = visitor[type];
        (state || wrapper) && (visitorType = wrapWithStateOrWrapper(visitorType, state, wrapper));
        mergePair(rootVisitor[type] = rootVisitor[type] || {}, visitorType);
      }
    }
    return rootVisitor;
  };
  var virtualTypes = _interopRequireWildcard(__webpack_require__(258)), t = _interopRequireWildcard(__webpack_require__(0));
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
  function explode(visitor) {
    if (visitor._exploded) return visitor;
    visitor._exploded = !0;
    for (const nodeType of Object.keys(visitor)) {
      if (shouldIgnoreKey(nodeType)) continue;
      const parts = nodeType.split("|");
      if (1 === parts.length) continue;
      const fns = visitor[nodeType];
      delete visitor[nodeType];
      for (const part of parts) visitor[part] = fns;
    }
    verify(visitor), delete visitor.__esModule, function(obj) {
      for (const key of Object.keys(obj)) {
        if (shouldIgnoreKey(key)) continue;
        const fns = obj[key];
        "function" == typeof fns && (obj[key] = {
          enter: fns
        });
      }
    }(visitor), ensureCallbackArrays(visitor);
    for (const nodeType of Object.keys(visitor)) {
      if (shouldIgnoreKey(nodeType)) continue;
      const wrapper = virtualTypes[nodeType];
      if (!wrapper) continue;
      const fns = visitor[nodeType];
      for (const type of Object.keys(fns)) fns[type] = wrapCheck(wrapper, fns[type]);
      if (delete visitor[nodeType], wrapper.types) for (const type of wrapper.types) visitor[type] ? mergePair(visitor[type], fns) : visitor[type] = fns; else mergePair(visitor, fns);
    }
    for (const nodeType of Object.keys(visitor)) {
      if (shouldIgnoreKey(nodeType)) continue;
      const fns = visitor[nodeType];
      let aliases = t.FLIPPED_ALIAS_KEYS[nodeType];
      const deprecratedKey = t.DEPRECATED_KEYS[nodeType];
      if (deprecratedKey && (console.trace(`Visitor defined for ${nodeType} but it has been renamed to ${deprecratedKey}`), 
      aliases = [ deprecratedKey ]), aliases) {
        delete visitor[nodeType];
        for (const alias of aliases) {
          const existing = visitor[alias];
          existing ? mergePair(existing, fns) : visitor[alias] = Object.assign({}, fns);
        }
      }
    }
    for (const nodeType of Object.keys(visitor)) shouldIgnoreKey(nodeType) || ensureCallbackArrays(visitor[nodeType]);
    return visitor;
  }
  function verify(visitor) {
    if (!visitor._verified) {
      if ("function" == typeof visitor) throw new Error("You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?");
      for (const nodeType of Object.keys(visitor)) {
        if ("enter" !== nodeType && "exit" !== nodeType || validateVisitorMethods(nodeType, visitor[nodeType]), 
        shouldIgnoreKey(nodeType)) continue;
        if (t.TYPES.indexOf(nodeType) < 0) throw new Error(`You gave us a visitor for the node type ${nodeType} but it's not a valid type`);
        const visitors = visitor[nodeType];
        if ("object" == typeof visitors) for (const visitorKey of Object.keys(visitors)) {
          if ("enter" !== visitorKey && "exit" !== visitorKey) throw new Error(`You passed \`traverse()\` a visitor object with the property ${nodeType} that has the invalid property ${visitorKey}`);
          validateVisitorMethods(`${nodeType}.${visitorKey}`, visitors[visitorKey]);
        }
      }
      visitor._verified = !0;
    }
  }
  function validateVisitorMethods(path, val) {
    const fns = [].concat(val);
    for (const fn of fns) if ("function" != typeof fn) throw new TypeError(`Non-function found defined in ${path} with type ${typeof fn}`);
  }
  function wrapWithStateOrWrapper(oldVisitor, state, wrapper) {
    const newVisitor = {};
    for (const key of Object.keys(oldVisitor)) {
      let fns = oldVisitor[key];
      Array.isArray(fns) && (fns = fns.map((function(fn) {
        let newFn = fn;
        return state && (newFn = function(path) {
          return fn.call(state, path, state);
        }), wrapper && (newFn = wrapper(state.key, key, newFn)), newFn !== fn && (newFn.toString = () => fn.toString()), 
        newFn;
      })), newVisitor[key] = fns);
    }
    return newVisitor;
  }
  function ensureCallbackArrays(obj) {
    obj.enter && !Array.isArray(obj.enter) && (obj.enter = [ obj.enter ]), obj.exit && !Array.isArray(obj.exit) && (obj.exit = [ obj.exit ]);
  }
  function wrapCheck(wrapper, fn) {
    const newFn = function(path) {
      if (wrapper.checkPath(path)) return fn.apply(this, arguments);
    };
    return newFn.toString = () => fn.toString(), newFn;
  }
  function shouldIgnoreKey(key) {
    return "_" === key[0] || ("enter" === key || "exit" === key || "shouldSkip" === key || ("blacklist" === key || "noScope" === key || "skipKeys" === key));
  }
  function mergePair(dest, src) {
    for (const key of Object.keys(src)) dest[key] = [].concat(dest[key] || [], src[key]);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = class {
    getCode() {}
    getScope() {}
    addHelper() {
      throw new Error("Helpers are not supported by the default hub.");
    }
    buildError(node, msg, Error = TypeError) {
      return new Error(msg);
    }
  };
} ]);