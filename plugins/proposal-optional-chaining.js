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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 487);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  143: function(module, exports) {
    module.exports = require("../plugins/syntax-optional-chaining");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  487: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _pluginSyntaxOptionalChaining = (obj = __webpack_require__(143)) && obj.__esModule ? obj : {
      default: obj
    }, _core = __webpack_require__(2);
    var _default = (0, _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose = !1} = options;
      function isSimpleMemberExpression(expression) {
        return _core.types.isIdentifier(expression) || _core.types.isSuper(expression) || _core.types.isMemberExpression(expression) && !expression.computed && isSimpleMemberExpression(expression.object);
      }
      return {
        name: "proposal-optional-chaining",
        inherits: _pluginSyntaxOptionalChaining.default,
        visitor: {
          "OptionalCallExpression|OptionalMemberExpression"(path) {
            const {scope: scope} = path;
            let maybeParenthesized = path;
            const parentPath = path.findParent(p => {
              if (!p.isParenthesizedExpression()) return !0;
              maybeParenthesized = p;
            });
            let isDeleteOperation = !1;
            const parentIsCall = parentPath.isCallExpression({
              callee: maybeParenthesized.node
            }) && path.isOptionalMemberExpression(), optionals = [];
            let optionalPath = path;
            for (;optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression() || optionalPath.isParenthesizedExpression() || optionalPath.isTSNonNullExpression(); ) {
              const {node: node} = optionalPath;
              node.optional && optionals.push(node), optionalPath.isOptionalMemberExpression() ? (optionalPath.node.type = "MemberExpression", 
              optionalPath = optionalPath.get("object")) : optionalPath.isOptionalCallExpression() ? (optionalPath.node.type = "CallExpression", 
              optionalPath = optionalPath.get("callee")) : optionalPath = optionalPath.get("expression");
            }
            let replacementPath = path;
            parentPath.isUnaryExpression({
              operator: "delete"
            }) && (replacementPath = parentPath, isDeleteOperation = !0);
            for (let i = optionals.length - 1; i >= 0; i--) {
              const node = optionals[i], isCall = _core.types.isCallExpression(node), replaceKey = isCall ? "callee" : "object", chain = node[replaceKey];
              let ref, check;
              if (loose && isCall && isSimpleMemberExpression(chain) ? check = ref = chain : (ref = scope.maybeGenerateMemoised(chain), 
              ref ? (check = _core.types.assignmentExpression("=", _core.types.cloneNode(ref), chain), 
              node[replaceKey] = ref) : check = ref = chain), isCall && _core.types.isMemberExpression(chain)) if (loose && isSimpleMemberExpression(chain)) node.callee = chain; else {
                const {object: object} = chain;
                let context = scope.maybeGenerateMemoised(object);
                context ? chain.object = _core.types.assignmentExpression("=", context, object) : context = _core.types.isSuper(object) ? _core.types.thisExpression() : object, 
                node.arguments.unshift(_core.types.cloneNode(context)), node.callee = _core.types.memberExpression(node.callee, _core.types.identifier("call"));
              }
              let replacement = replacementPath.node;
              if (0 === i && parentIsCall) {
                var _baseRef;
                const {object: object} = replacement;
                let baseRef;
                loose && isSimpleMemberExpression(object) || (baseRef = scope.maybeGenerateMemoised(object), 
                baseRef && (replacement.object = _core.types.assignmentExpression("=", baseRef, object))), 
                replacement = _core.types.callExpression(_core.types.memberExpression(replacement, _core.types.identifier("bind")), [ _core.types.cloneNode(null != (_baseRef = baseRef) ? _baseRef : object) ]);
              }
              replacementPath.replaceWith(_core.types.conditionalExpression(loose ? _core.types.binaryExpression("==", _core.types.cloneNode(check), _core.types.nullLiteral()) : _core.types.logicalExpression("||", _core.types.binaryExpression("===", _core.types.cloneNode(check), _core.types.nullLiteral()), _core.types.binaryExpression("===", _core.types.cloneNode(ref), scope.buildUndefinedNode())), isDeleteOperation ? _core.types.booleanLiteral(!0) : scope.buildUndefinedNode(), replacement)), 
              replacementPath = replacementPath.get("alternate");
            }
          }
        }
      };
    });
    exports.default = _default;
  }
});