(() => {
  "use strict";
  var __webpack_modules__ = {
    1820: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(opts) {
        const {build, operator} = opts;
        return {
          AssignmentExpression(path) {
            const {node, scope} = path;
            if (node.operator !== operator + "=") return;
            const nodes = [], exploded = (0, _helperExplodeAssignableExpression.default)(node.left, nodes, this, scope);
            nodes.push(assignmentExpression("=", exploded.ref, build(exploded.uid, node.right))), 
            path.replaceWith(sequenceExpression(nodes));
          },
          BinaryExpression(path) {
            const {node} = path;
            node.operator === operator && path.replaceWith(build(node.left, node.right));
          }
        };
      };
      var _helperExplodeAssignableExpression = __webpack_require__(3538), _t = __webpack_require__(8459);
      const {assignmentExpression, sequenceExpression} = _t;
    },
    3538: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, nodes, file, scope, allowedSingleIdent) {
        let obj, ref, uid;
        obj = isIdentifier(node) && allowedSingleIdent ? node : function(node, nodes, scope) {
          let ref;
          if (isIdentifier(node)) {
            if (scope.hasBinding(node.name)) return node;
            ref = node;
          } else {
            if (!isMemberExpression(node)) throw new Error(`We can't explode this node type ${node.type}`);
            if (ref = node.object, isSuper(ref) || isIdentifier(ref) && scope.hasBinding(ref.name)) return ref;
          }
          const temp = scope.generateUidIdentifierBasedOnNode(ref);
          return scope.push({
            id: temp
          }), nodes.push(assignmentExpression("=", cloneNode(temp), cloneNode(ref))), temp;
        }(node, nodes, scope);
        if (isIdentifier(node)) ref = cloneNode(node), uid = obj; else {
          const prop = function(node, nodes, scope) {
            const prop = node.property;
            if (isPrivateName(prop)) throw new Error("We can't generate property ref for private name, please install `@babel/plugin-proposal-class-properties`");
            const key = toComputedKey(node, prop);
            if (isLiteral(key) && isPureish(key)) return key;
            const temp = scope.generateUidIdentifierBasedOnNode(prop);
            return scope.push({
              id: temp
            }), nodes.push(assignmentExpression("=", cloneNode(temp), cloneNode(prop))), temp;
          }(node, nodes, scope), computed = node.computed || isLiteral(prop);
          uid = memberExpression(cloneNode(obj), cloneNode(prop), computed), ref = memberExpression(cloneNode(obj), cloneNode(prop), computed);
        }
        return {
          uid,
          ref
        };
      };
      var _t = __webpack_require__(8459);
      const {assignmentExpression, cloneNode, isIdentifier, isLiteral, isMemberExpression, isPrivateName, isPureish, isSuper, memberExpression, toComputedKey} = _t;
    },
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    8459: module => {
      module.exports = require("../lib/types");
    },
    4629: module => {
      module.exports = require("@babel/core");
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    var exports = __webpack_exports__;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(3177), _helperBuilderBinaryAssignmentOperatorVisitor = __webpack_require__(1820), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "transform-exponentiation-operator",
      visitor: (0, _helperBuilderBinaryAssignmentOperatorVisitor.default)({
        operator: "**",
        build: (left, right) => _core.types.callExpression(_core.types.memberExpression(_core.types.identifier("Math"), _core.types.identifier("pow")), [ left, right ])
      })
    })));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();