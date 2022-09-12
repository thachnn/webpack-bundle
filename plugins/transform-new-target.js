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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 528);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  528: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)(api => (api.assertVersion(7), {
      name: "transform-new-target",
      visitor: {
        MetaProperty(path) {
          const meta = path.get("meta"), property = path.get("property"), {scope: scope} = path;
          if (meta.isIdentifier({
            name: "new"
          }) && property.isIdentifier({
            name: "target"
          })) {
            const func = path.findParent(path => !!path.isClass() || !(!path.isFunction() || path.isArrowFunctionExpression()) && !path.isClassMethod({
              kind: "constructor"
            }));
            if (!func) throw path.buildCodeFrameError("new.target must be under a (non-arrow) function or a class.");
            const {node: node} = func;
            if (!node.id) {
              if (func.isMethod()) return void path.replaceWith(scope.buildUndefinedNode());
              node.id = scope.generateUidIdentifier("target");
            }
            const constructor = _core.types.memberExpression(_core.types.thisExpression(), _core.types.identifier("constructor"));
            if (func.isClass()) return void path.replaceWith(constructor);
            path.replaceWith(_core.types.conditionalExpression(_core.types.binaryExpression("instanceof", _core.types.thisExpression(), _core.types.cloneNode(node.id)), constructor, scope.buildUndefinedNode()));
          }
        }
      }
    }));
    exports.default = _default;
  }
});