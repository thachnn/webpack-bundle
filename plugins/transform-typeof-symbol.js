(() => {
  "use strict";
  var __webpack_modules__ = {
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
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
    var _helperPluginUtils = __webpack_require__(5488), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "transform-typeof-symbol",
      visitor: {
        Scope({scope}) {
          scope.getBinding("Symbol") && scope.rename("Symbol");
        },
        UnaryExpression(path) {
          const {node, parent} = path;
          if ("typeof" !== node.operator) return;
          if (path.parentPath.isBinaryExpression() && _core.types.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
            const opposite = path.getOpposite();
            if (opposite.isLiteral() && "symbol" !== opposite.node.value && "object" !== opposite.node.value) return;
          }
          let isUnderHelper = path.findParent((path => {
            var _path$get;
            if (path.isFunction()) return "@babel/helpers - typeof" === (null == (_path$get = path.get("body.directives.0")) ? void 0 : _path$get.node.value.value);
          }));
          if (isUnderHelper) return;
          const helper = this.addHelper("typeof");
          if (isUnderHelper = path.findParent((path => path.isVariableDeclarator() && path.node.id === helper || path.isFunctionDeclaration() && path.node.id && path.node.id.name === helper.name)), 
          isUnderHelper) return;
          const call = _core.types.callExpression(helper, [ node.argument ]), arg = path.get("argument");
          if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name, !0)) {
            const unary = _core.types.unaryExpression("typeof", _core.types.cloneNode(node.argument));
            path.replaceWith(_core.types.conditionalExpression(_core.types.binaryExpression("===", unary, _core.types.stringLiteral("undefined")), _core.types.stringLiteral("undefined"), call));
          } else path.replaceWith(call);
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