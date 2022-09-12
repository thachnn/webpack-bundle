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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 482);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  138: function(module, exports) {
    module.exports = require("../plugins/syntax-json-strings");
  },
  482: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _pluginSyntaxJsonStrings = (obj = __webpack_require__(138)) && obj.__esModule ? obj : {
      default: obj
    };
    var _default = (0, _helperPluginUtils.declare)(api => {
      api.assertVersion(7);
      const regex = /(\\*)([\u2028\u2029])/g;
      function replace(match, escapes, separator) {
        return escapes.length % 2 == 1 ? match : `${escapes}\\u${separator.charCodeAt(0).toString(16)}`;
      }
      return {
        name: "proposal-json-strings",
        inherits: _pluginSyntaxJsonStrings.default,
        visitor: {
          "DirectiveLiteral|StringLiteral"({node: node}) {
            const {extra: extra} = node;
            (null == extra ? void 0 : extra.raw) && (extra.raw = extra.raw.replace(regex, replace));
          }
        }
      };
    });
    exports.default = _default;
  }
});