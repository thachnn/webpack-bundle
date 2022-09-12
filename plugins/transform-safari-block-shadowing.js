(() => {
  "use strict";
  var __webpack_modules__ = {
    7327: (module, exports) => {
      exports.__esModule = !0, exports.default = function({types: t}) {
        return {
          name: "transform-safari-block-shadowing",
          visitor: {
            VariableDeclarator(path) {
              const kind = path.parent.kind;
              if ("let" !== kind && "const" !== kind) return;
              const block = path.scope.block;
              if (t.isFunction(block) || t.isProgram(block)) return;
              const bindings = t.getOuterBindingIdentifiers(path.node.id);
              for (const name of Object.keys(bindings)) {
                let scope = path.scope;
                if (scope.hasOwnBinding(name)) for (;scope = scope.parent; ) {
                  if (scope.hasOwnBinding(name)) {
                    path.scope.rename(name);
                    break;
                  }
                  if (t.isFunction(scope.block) || t.isProgram(scope.block)) break;
                }
              }
            }
          }
        };
      }, module.exports = exports.default;
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
  }(7327), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();