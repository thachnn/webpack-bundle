(() => {
  "use strict";
  var __webpack_modules__ = {
    3177: module => {
      module.exports = require("../lib/plugin-utils");
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
    });
    var index = __webpack_require__(3177).declare((api => (api.assertVersion("^7.16.0"), 
    {
      name: "plugin-bugfix-safari-id-destructuring-collision-in-function-expression",
      visitor: {
        FunctionExpression(path) {
          const name = function(path) {
            const {node} = path, functionId = node.id;
            if (!functionId) return !1;
            const name = functionId.name, paramNameBinding = path.scope.getOwnBinding(name);
            return void 0 !== paramNameBinding && "param" === paramNameBinding.kind && paramNameBinding.identifier !== paramNameBinding.path.node && name;
          }(path);
          if (name) {
            const {scope} = path, newParamName = scope.generateUid(name);
            scope.rename(name, newParamName);
          }
        }
      }
    })));
    exports.default = index;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();