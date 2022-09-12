(() => {
  "use strict";
  var __webpack_modules__ = {
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    3871: module => {
      module.exports = require("../plugins/syntax-logical-assignment-operators");
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
    var _helperPluginUtils = __webpack_require__(3177), _pluginSyntaxLogicalAssignmentOperators = __webpack_require__(3871), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "proposal-logical-assignment-operators",
      inherits: _pluginSyntaxLogicalAssignmentOperators.default,
      visitor: {
        AssignmentExpression(path) {
          const {node, scope} = path, {operator, left, right} = node, operatorTrunc = operator.slice(0, -1);
          if (!_core.types.LOGICAL_OPERATORS.includes(operatorTrunc)) return;
          const lhs = _core.types.cloneNode(left);
          if (_core.types.isMemberExpression(left)) {
            const {object, property, computed} = left, memo = scope.maybeGenerateMemoised(object);
            if (memo && (left.object = memo, lhs.object = _core.types.assignmentExpression("=", _core.types.cloneNode(memo), object)), 
            computed) {
              const memo = scope.maybeGenerateMemoised(property);
              memo && (left.property = memo, lhs.property = _core.types.assignmentExpression("=", _core.types.cloneNode(memo), property));
            }
          }
          path.replaceWith(_core.types.logicalExpression(operatorTrunc, lhs, _core.types.assignmentExpression("=", left, right)));
        }
      }
    })));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();