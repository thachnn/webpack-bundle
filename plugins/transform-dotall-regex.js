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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 512);
}({
  0: function(module, exports) {
    module.exports = require("../lib/types");
  },
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  12: function(module, exports, __webpack_require__) {
    var baseGetTag = __webpack_require__(7), isObject = __webpack_require__(3);
    module.exports = function(value) {
      if (!isObject(value)) return !1;
      var tag = baseGetTag(value);
      return "[object Function]" == tag || "[object GeneratorFunction]" == tag || "[object AsyncFunction]" == tag || "[object Proxy]" == tag;
    };
  },
  13: function(module, exports) {
    var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
    module.exports = freeGlobal;
  },
  15: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
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
  },
  16: function(module, exports) {
    var nativeObjectToString = Object.prototype.toString;
    module.exports = function(value) {
      return nativeObjectToString.call(value);
    };
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  20: function(module, exports, __webpack_require__) {
    var baseIsNative = __webpack_require__(40), getValue = __webpack_require__(43);
    module.exports = function(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    };
  },
  3: function(module, exports) {
    module.exports = function(value) {
      var type = typeof value;
      return null != value && ("object" == type || "function" == type);
    };
  },
  34: function(module, exports) {
    module.exports = function(value) {
      return value;
    };
  },
  37: function(module, exports) {
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
  },
  38: function(module, exports) {
    module.exports = function(func) {
      return function(value) {
        return func(value);
      };
    };
  },
  40: function(module, exports, __webpack_require__) {
    var isFunction = __webpack_require__(12), isMasked = __webpack_require__(41), isObject = __webpack_require__(3), toSource = __webpack_require__(37), reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    module.exports = function(value) {
      return !(!isObject(value) || isMasked(value)) && (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
    };
  },
  41: function(module, exports, __webpack_require__) {
    var uid, coreJsData = __webpack_require__(42), maskSrcKey = (uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "")) ? "Symbol(src)_1." + uid : "";
    module.exports = function(func) {
      return !!maskSrcKey && maskSrcKey in func;
    };
  },
  42: function(module, exports, __webpack_require__) {
    var coreJsData = __webpack_require__(5)["__core-js_shared__"];
    module.exports = coreJsData;
  },
  43: function(module, exports) {
    module.exports = function(object, key) {
      return null == object ? void 0 : object[key];
    };
  },
  48: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(pathOrNode) {
      const node = pathOrNode.node || pathOrNode;
      if ((({leadingComments: leadingComments}) => !!leadingComments && leadingComments.some(comment => /[@#]__PURE__/.test(comment.value)))(node)) return;
      t.addComment(node, "leading", "#__PURE__");
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
  },
  49: function(module, exports, __webpack_require__) {
    var getNative = __webpack_require__(20), defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        return func({}, "", {}), func;
      } catch (e) {}
    }();
    module.exports = defineProperty;
  },
  5: function(module, exports, __webpack_require__) {
    var freeGlobal = __webpack_require__(13), freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  },
  512: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperCreateRegexpFeaturesPlugin = __webpack_require__(89), _default = (0, 
    __webpack_require__(1).declare)(api => (api.assertVersion(7), (0, _helperCreateRegexpFeaturesPlugin.createRegExpFeaturePlugin)({
      name: "transform-dotall-regex",
      feature: "dotAllFlag"
    })));
    exports.default = _default;
  },
  57: function(module, exports) {
    module.exports = function(source, array) {
      var index = -1, length = source.length;
      for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
      return array;
    };
  },
  58: function(module, exports, __webpack_require__) {
    var identity = __webpack_require__(34), overRest = __webpack_require__(59), setToString = __webpack_require__(61);
    module.exports = function(func, start) {
      return setToString(overRest(func, start, identity), func + "");
    };
  },
  59: function(module, exports, __webpack_require__) {
    var apply = __webpack_require__(60), nativeMax = Math.max;
    module.exports = function(func, start, transform) {
      return start = nativeMax(void 0 === start ? func.length - 1 : start, 0), function() {
        for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length; ) array[index] = args[start + index];
        index = -1;
        for (var otherArgs = Array(start + 1); ++index < start; ) otherArgs[index] = args[index];
        return otherArgs[start] = transform(array), apply(func, this, otherArgs);
      };
    };
  },
  6: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(5).Symbol;
    module.exports = Symbol;
  },
  60: function(module, exports) {
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
  },
  61: function(module, exports, __webpack_require__) {
    var baseSetToString = __webpack_require__(62), setToString = __webpack_require__(64)(baseSetToString);
    module.exports = setToString;
  },
  62: function(module, exports, __webpack_require__) {
    var constant = __webpack_require__(63), defineProperty = __webpack_require__(49), identity = __webpack_require__(34), baseSetToString = defineProperty ? function(func, string) {
      return defineProperty(func, "toString", {
        configurable: !0,
        enumerable: !1,
        value: constant(string),
        writable: !0
      });
    } : identity;
    module.exports = baseSetToString;
  },
  63: function(module, exports) {
    module.exports = function(value) {
      return function() {
        return value;
      };
    };
  },
  64: function(module, exports) {
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
  },
  65: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.enableFeature = function(features, feature) {
      return features | feature;
    }, exports.hasFeature = function(features, feature) {
      return !!(features & feature);
    }, exports.runtimeKey = exports.featuresKey = exports.FEATURES = void 0;
    const FEATURES = Object.freeze({
      unicodeFlag: 1,
      dotAllFlag: 2,
      unicodePropertyEscape: 4,
      namedCaptureGroups: 8
    });
    exports.FEATURES = FEATURES;
    exports.featuresKey = "@babel/plugin-regexp-features/featuresKey";
    exports.runtimeKey = "@babel/plugin-regexp-features/runtimeKey";
  },
  66: function(module, exports) {
    module.exports = function(array, iteratee) {
      for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
      return result;
    };
  },
  7: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), getRawTag = __webpack_require__(15), objectToString = __webpack_require__(16), symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    module.exports = function(value) {
      return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    };
  },
  74: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.is = function(node, flag) {
      return "RegExpLiteral" === node.type && node.flags.indexOf(flag) >= 0;
    }, exports.pullFlag = function(node, flag) {
      const flags = node.flags.split("");
      if (node.flags.indexOf(flag) < 0) return;
      (0, _pull.default)(flags, flag), node.flags = flags.join("");
    };
    var obj, _pull = (obj = __webpack_require__(75)) && obj.__esModule ? obj : {
      default: obj
    };
  },
  75: function(module, exports, __webpack_require__) {
    var pull = __webpack_require__(58)(__webpack_require__(76));
    module.exports = pull;
  },
  76: function(module, exports, __webpack_require__) {
    var basePullAll = __webpack_require__(77);
    module.exports = function(array, values) {
      return array && array.length && values && values.length ? basePullAll(array, values) : array;
    };
  },
  77: function(module, exports, __webpack_require__) {
    var arrayMap = __webpack_require__(66), baseIndexOf = __webpack_require__(78), baseIndexOfWith = __webpack_require__(82), baseUnary = __webpack_require__(38), copyArray = __webpack_require__(57), splice = Array.prototype.splice;
    module.exports = function(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values.length, seen = array;
      for (array === values && (values = copyArray(values)), iteratee && (seen = arrayMap(array, baseUnary(iteratee))); ++index < length; ) for (var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value; (fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1; ) seen !== array && splice.call(seen, fromIndex, 1), 
      splice.call(array, fromIndex, 1);
      return array;
    };
  },
  78: function(module, exports, __webpack_require__) {
    var baseFindIndex = __webpack_require__(79), baseIsNaN = __webpack_require__(80), strictIndexOf = __webpack_require__(81);
    module.exports = function(array, value, fromIndex) {
      return value == value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    };
  },
  79: function(module, exports) {
    module.exports = function(array, predicate, fromIndex, fromRight) {
      for (var length = array.length, index = fromIndex + (fromRight ? 1 : -1); fromRight ? index-- : ++index < length; ) if (predicate(array[index], index, array)) return index;
      return -1;
    };
  },
  80: function(module, exports) {
    module.exports = function(value) {
      return value != value;
    };
  },
  81: function(module, exports) {
    module.exports = function(array, value, fromIndex) {
      for (var index = fromIndex - 1, length = array.length; ++index < length; ) if (array[index] === value) return index;
      return -1;
    };
  },
  82: function(module, exports) {
    module.exports = function(array, value, fromIndex, comparator) {
      for (var index = fromIndex - 1, length = array.length; ++index < length; ) if (comparator(array[index], value)) return index;
      return -1;
    };
  },
  89: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.createRegExpFeaturePlugin = function({name: name, feature: feature, options: options = {}}) {
      return {
        name: name,
        pre() {
          var _file$get;
          const {file: file} = this, features = null != (_file$get = file.get(_features.featuresKey)) ? _file$get : 0;
          let newFeatures = (0, _features.enableFeature)(features, _features.FEATURES[feature]);
          const {useUnicodeFlag: useUnicodeFlag, runtime: runtime = !0} = options;
          !1 === useUnicodeFlag && (newFeatures = (0, _features.enableFeature)(newFeatures, _features.FEATURES.unicodeFlag)), 
          newFeatures !== features && file.set(_features.featuresKey, newFeatures), runtime || file.set(_features.runtimeKey, !1), 
          (!file.has(versionKey) || file.get(versionKey) < version) && file.set(versionKey, version);
        },
        visitor: {
          RegExpLiteral(path) {
            var _file$get2;
            const {node: node} = path, {file: file} = this, features = file.get(_features.featuresKey), runtime = null == (_file$get2 = file.get(_features.runtimeKey)) || _file$get2, regexpuOptions = (0, 
            _util.generateRegexpuOptions)(node, features);
            if (null === regexpuOptions) return;
            const namedCaptureGroups = {};
            if (regexpuOptions.namedGroup && (regexpuOptions.onNamedGroup = (name, index) => {
              namedCaptureGroups[name] = index;
            }), node.pattern = (0, _regexpuCore.default)(node.pattern, node.flags, regexpuOptions), 
            regexpuOptions.namedGroup && Object.keys(namedCaptureGroups).length > 0 && runtime && !function(path) {
              return path.parentPath.isMemberExpression({
                object: path.node,
                computed: !1
              }) && path.parentPath.get("property").isIdentifier({
                name: "test"
              });
            }(path)) {
              const call = _core.types.callExpression(this.addHelper("wrapRegExp"), [ node, _core.types.valueToNode(namedCaptureGroups) ]);
              (0, _helperAnnotateAsPure.default)(call), path.replaceWith(call);
            }
            (0, _features.hasFeature)(features, _features.FEATURES.unicodeFlag) && (0, _helperRegex.pullFlag)(node, "u"), 
            (0, _features.hasFeature)(features, _features.FEATURES.dotAllFlag) && (0, _helperRegex.pullFlag)(node, "s");
          }
        }
      };
    };
    var _regexpuCore = _interopRequireDefault(__webpack_require__(90)), _features = __webpack_require__(65), _util = __webpack_require__(91), _package = _interopRequireDefault(__webpack_require__(92)), _core = __webpack_require__(2), _helperRegex = __webpack_require__(74), _helperAnnotateAsPure = _interopRequireDefault(__webpack_require__(48));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    const version = _package.default.version.split(".").reduce((v, x) => 1e5 * v + +x, 0), versionKey = "@babel/plugin-regexp-features/version";
  },
  90: function(module, exports) {
    module.exports = require("regexpu-core");
  },
  91: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.generateRegexpuOptions = function(node, features) {
      let useUnicodeFlag = !1, dotAllFlag = !1, unicodePropertyEscape = !1, namedGroup = !1;
      const {flags: flags, pattern: pattern} = node, flagsIncludesU = flags.includes("u");
      flagsIncludesU && ((0, _features.hasFeature)(features, _features.FEATURES.unicodeFlag) || (useUnicodeFlag = !0), 
      (0, _features.hasFeature)(features, _features.FEATURES.unicodePropertyEscape) && /\\[pP]{/.test(pattern) && (unicodePropertyEscape = !0));
      (0, _features.hasFeature)(features, _features.FEATURES.dotAllFlag) && flags.indexOf("s") >= 0 && (dotAllFlag = !0);
      (0, _features.hasFeature)(features, _features.FEATURES.namedCaptureGroups) && /\(\?<(?![=!])/.test(pattern) && (namedGroup = !0);
      if (!namedGroup && !unicodePropertyEscape && !dotAllFlag && (!flagsIncludesU || useUnicodeFlag)) return null;
      flagsIncludesU && flags.indexOf("s") >= 0 && (dotAllFlag = !0);
      return {
        useUnicodeFlag: useUnicodeFlag,
        onNamedGroup: () => {},
        namedGroup: namedGroup,
        unicodePropertyEscape: unicodePropertyEscape,
        dotAllFlag: dotAllFlag,
        lookbehind: !0
      };
    };
    var _features = __webpack_require__(65);
  },
  92: function(module) {
    module.exports = JSON.parse('{"name":"@babel/helper-create-regexp-features-plugin","version":"7.10.4"}');
  }
});