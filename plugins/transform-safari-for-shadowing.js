(() => {
  "use strict";
  var __webpack_modules__ = {
    9271: (module, exports) => {
      function handle(declaration) {
        if (!declaration.isVariableDeclaration()) return;
        const fn = declaration.getFunctionParent(), {name} = declaration.node.declarations[0].id;
        fn && fn.scope.hasOwnBinding(name) && "param" === fn.scope.getOwnBinding(name).kind && declaration.scope.rename(name);
      }
      exports.__esModule = !0, exports.default = void 0;
      exports.default = () => ({
        name: "transform-safari-for-shadowing",
        visitor: {
          ForXStatement(path) {
            handle(path.get("left"));
          },
          ForStatement(path) {
            handle(path.get("init"));
          }
        }
      }), module.exports = exports.default;
    }
  }, __webpack_module_cache__ = {};
  var __webpack_exports__ = function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }(9271), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();