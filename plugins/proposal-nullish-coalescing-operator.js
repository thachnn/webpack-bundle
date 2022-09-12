(() => {
  "use strict";
  var __webpack_modules__ = {
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    7797: module => {
      module.exports = require("../plugins/syntax-nullish-coalescing-operator");
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
    var _helperPluginUtils = __webpack_require__(3177), _pluginSyntaxNullishCoalescingOperator = __webpack_require__(7797), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)(((api, {loose = !1}) => {
      var _api$assumption;
      api.assertVersion(7);
      const noDocumentAll = null != (_api$assumption = api.assumption("noDocumentAll")) ? _api$assumption : loose;
      return {
        name: "proposal-nullish-coalescing-operator",
        inherits: _pluginSyntaxNullishCoalescingOperator.default,
        visitor: {
          LogicalExpression(path) {
            const {node, scope} = path;
            if ("??" !== node.operator) return;
            let ref, assignment;
            if (scope.isStatic(node.left)) ref = node.left, assignment = _core.types.cloneNode(node.left); else {
              if (scope.path.isPattern()) return void path.replaceWith(_core.template.ast`(() => ${path.node})()`);
              ref = scope.generateUidIdentifierBasedOnNode(node.left), scope.push({
                id: _core.types.cloneNode(ref)
              }), assignment = _core.types.assignmentExpression("=", ref, node.left);
            }
            path.replaceWith(_core.types.conditionalExpression(noDocumentAll ? _core.types.binaryExpression("!=", assignment, _core.types.nullLiteral()) : _core.types.logicalExpression("&&", _core.types.binaryExpression("!==", assignment, _core.types.nullLiteral()), _core.types.binaryExpression("!==", _core.types.cloneNode(ref), scope.buildUndefinedNode())), _core.types.cloneNode(ref), node.right));
          }
        }
      };
    }));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();