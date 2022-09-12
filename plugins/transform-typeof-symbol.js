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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 547);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  547: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)(api => (api.assertVersion(7), {
      name: "transform-typeof-symbol",
      visitor: {
        Scope({scope: scope}) {
          scope.getBinding("Symbol") && scope.rename("Symbol");
        },
        UnaryExpression(path) {
          const {node: node, parent: parent} = path;
          if ("typeof" !== node.operator) return;
          if (path.parentPath.isBinaryExpression() && _core.types.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
            const opposite = path.getOpposite();
            if (opposite.isLiteral() && "symbol" !== opposite.node.value && "object" !== opposite.node.value) return;
          }
          let isUnderHelper = path.findParent(path => {
            var _path$get;
            if (path.isFunction()) return "@babel/helpers - typeof" === (null == (_path$get = path.get("body.directives.0")) ? void 0 : _path$get.node.value.value);
          });
          if (isUnderHelper) return;
          const helper = this.addHelper("typeof");
          if (isUnderHelper = path.findParent(path => path.isVariableDeclarator() && path.node.id === helper || path.isFunctionDeclaration() && path.node.id && path.node.id.name === helper.name), 
          isUnderHelper) return;
          const call = _core.types.callExpression(helper, [ node.argument ]), arg = path.get("argument");
          if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name, !0)) {
            const unary = _core.types.unaryExpression("typeof", _core.types.cloneNode(node.argument));
            path.replaceWith(_core.types.conditionalExpression(_core.types.binaryExpression("===", unary, _core.types.stringLiteral("undefined")), _core.types.stringLiteral("undefined"), call));
          } else path.replaceWith(call);
        }
      }
    }));
    exports.default = _default;
  }
});