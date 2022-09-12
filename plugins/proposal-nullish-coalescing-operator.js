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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 483);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  139: function(module, exports) {
    module.exports = require("../plugins/syntax-nullish-coalescing-operator");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  483: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _pluginSyntaxNullishCoalescingOperator = (obj = __webpack_require__(139)) && obj.__esModule ? obj : {
      default: obj
    }, _core = __webpack_require__(2);
    var _default = (0, _helperPluginUtils.declare)((api, {loose: loose = !1}) => (api.assertVersion(7), 
    {
      name: "proposal-nullish-coalescing-operator",
      inherits: _pluginSyntaxNullishCoalescingOperator.default,
      visitor: {
        LogicalExpression(path) {
          const {node: node, scope: scope} = path;
          if ("??" !== node.operator) return;
          let assignment, ref = scope.maybeGenerateMemoised(node.left);
          null === ref ? (ref = node.left, assignment = _core.types.cloneNode(node.left)) : assignment = _core.types.assignmentExpression("=", ref, node.left), 
          path.replaceWith(_core.types.conditionalExpression(loose ? _core.types.binaryExpression("!=", assignment, _core.types.nullLiteral()) : _core.types.logicalExpression("&&", _core.types.binaryExpression("!==", assignment, _core.types.nullLiteral()), _core.types.binaryExpression("!==", _core.types.cloneNode(ref), scope.buildUndefinedNode())), _core.types.cloneNode(ref), node.right));
        }
      }
    }));
    exports.default = _default;
  }
});