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
      name: "transform-shorthand-properties",
      visitor: {
        ObjectMethod(path) {
          const {node} = path;
          if ("method" === node.kind) {
            const func = _core.types.functionExpression(null, node.params, node.body, node.generator, node.async);
            func.returnType = node.returnType;
            const computedKey = _core.types.toComputedKey(node);
            _core.types.isStringLiteral(computedKey, {
              value: "__proto__"
            }) ? path.replaceWith(_core.types.objectProperty(computedKey, func, !0)) : path.replaceWith(_core.types.objectProperty(node.key, func, node.computed));
          }
        },
        ObjectProperty(path) {
          const {node} = path;
          if (node.shorthand) {
            const computedKey = _core.types.toComputedKey(node);
            _core.types.isStringLiteral(computedKey, {
              value: "__proto__"
            }) ? path.replaceWith(_core.types.objectProperty(computedKey, node.value, !0)) : node.shorthand = !1;
          }
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