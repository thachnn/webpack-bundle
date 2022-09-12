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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 480);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  137: function(module, exports) {
    module.exports = require("../plugins/syntax-dynamic-import");
  },
  480: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _pluginSyntaxDynamicImport = (obj = __webpack_require__(137)) && obj.__esModule ? obj : {
      default: obj
    }, _package = __webpack_require__(481);
    const SUPPORTED_MODULES = [ "commonjs", "amd", "systemjs" ];
    var _default = (0, _helperPluginUtils.declare)(api => (api.assertVersion(7), {
      name: "proposal-dynamic-import",
      inherits: _pluginSyntaxDynamicImport.default,
      pre() {
        this.file.set("@babel/plugin-proposal-dynamic-import", _package.version);
      },
      visitor: {
        Program() {
          const modules = this.file.get("@babel/plugin-transform-modules-*");
          if (!SUPPORTED_MODULES.includes(modules)) throw new Error("@babel/plugin-proposal-dynamic-import depends on a modules\ntransform plugin. Supported plugins are:\n - @babel/plugin-transform-modules-commonjs ^7.4.0\n - @babel/plugin-transform-modules-amd ^7.4.0\n - @babel/plugin-transform-modules-systemjs ^7.4.0\n\nIf you are using Webpack or Rollup and thus don't want\nBabel to transpile your imports and exports, you can use\nthe @babel/plugin-syntax-dynamic-import plugin and let your\nbundler handle dynamic imports.\n");
        }
      }
    }));
    exports.default = _default;
  },
  481: function(module) {
    module.exports = JSON.parse('{"name":"@babel/plugin-proposal-dynamic-import","version":"7.10.4"}');
  }
});