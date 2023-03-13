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
    _helperPluginUtils.declare)((api => {
      function statementList(key, path) {
        const paths = path.get(key);
        for (const path of paths) {
          const func = path.node;
          if (!path.isFunctionDeclaration()) continue;
          const declar = _core.types.variableDeclaration("let", [ _core.types.variableDeclarator(func.id, _core.types.toExpression(func)) ]);
          declar._blockHoist = 2, func.id = null, path.replaceWith(declar);
        }
      }
      return api.assertVersion(7), {
        name: "transform-block-scoped-functions",
        visitor: {
          BlockStatement(path) {
            const {node, parent} = path;
            _core.types.isFunction(parent, {
              body: node
            }) || _core.types.isExportDeclaration(parent) || statementList("body", path);
          },
          SwitchCase(path) {
            statementList("consequent", path);
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