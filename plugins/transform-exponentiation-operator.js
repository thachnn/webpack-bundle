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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 514);
}({
  0: function(module, exports) {
    module.exports = require("../lib/types");
  },
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  514: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _helperBuilderBinaryAssignmentOperatorVisitor = (obj = __webpack_require__(515)) && obj.__esModule ? obj : {
      default: obj
    }, _core = __webpack_require__(2);
    var _default = (0, _helperPluginUtils.declare)(api => (api.assertVersion(7), {
      name: "transform-exponentiation-operator",
      visitor: (0, _helperBuilderBinaryAssignmentOperatorVisitor.default)({
        operator: "**",
        build: (left, right) => _core.types.callExpression(_core.types.memberExpression(_core.types.identifier("Math"), _core.types.identifier("pow")), [ left, right ])
      })
    }));
    exports.default = _default;
  },
  515: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(opts) {
      const {build: build, operator: operator} = opts;
      return {
        AssignmentExpression(path) {
          const {node: node, scope: scope} = path;
          if (node.operator !== operator + "=") return;
          const nodes = [], exploded = (0, _helperExplodeAssignableExpression.default)(node.left, nodes, this, scope);
          nodes.push(t.assignmentExpression("=", exploded.ref, build(exploded.uid, node.right))), 
          path.replaceWith(t.sequenceExpression(nodes));
        },
        BinaryExpression(path) {
          const {node: node} = path;
          node.operator === operator && path.replaceWith(build(node.left, node.right));
        }
      };
    };
    var obj, _helperExplodeAssignableExpression = (obj = __webpack_require__(516)) && obj.__esModule ? obj : {
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
  },
  516: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(node, nodes, file, scope, allowedSingleIdent) {
      let obj, ref, uid;
      obj = t.isIdentifier(node) && allowedSingleIdent ? node : function(node, nodes, file, scope) {
        let ref;
        if (t.isSuper(node)) return node;
        if (t.isIdentifier(node)) {
          if (scope.hasBinding(node.name)) return node;
          ref = node;
        } else {
          if (!t.isMemberExpression(node)) throw new Error("We can't explode this node type " + node.type);
          if (ref = node.object, t.isSuper(ref) || t.isIdentifier(ref) && scope.hasBinding(ref.name)) return ref;
        }
        const temp = scope.generateUidIdentifierBasedOnNode(ref);
        return scope.push({
          id: temp
        }), nodes.push(t.assignmentExpression("=", t.cloneNode(temp), t.cloneNode(ref))), 
        temp;
      }(node, nodes, 0, scope);
      if (t.isIdentifier(node)) ref = t.cloneNode(node), uid = obj; else {
        const prop = function(node, nodes, file, scope) {
          const prop = node.property, key = t.toComputedKey(node, prop);
          if (t.isLiteral(key) && t.isPureish(key)) return key;
          const temp = scope.generateUidIdentifierBasedOnNode(prop);
          return scope.push({
            id: temp
          }), nodes.push(t.assignmentExpression("=", t.cloneNode(temp), t.cloneNode(prop))), 
          temp;
        }(node, nodes, 0, scope), computed = node.computed || t.isLiteral(prop);
        uid = t.memberExpression(t.cloneNode(obj), t.cloneNode(prop), computed), ref = t.memberExpression(t.cloneNode(obj), t.cloneNode(prop), computed);
      }
      return {
        uid: uid,
        ref: ref
      };
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
  }
});