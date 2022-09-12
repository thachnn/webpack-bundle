(() => {
  "use strict";
  var __webpack_modules__ = {
    2777: (module, exports) => {
      exports.__esModule = !0, exports.default = void 0;
      exports.default = ({types: t}) => ({
        name: "transform-edge-function-name",
        visitor: {
          FunctionExpression: {
            exit(path) {
              if (!path.node.id && t.isIdentifier(path.parent.id)) {
                const id = t.cloneNode(path.parent.id), binding = path.scope.getBinding(id.name);
                (null == binding ? void 0 : binding.constantViolations.length) && path.scope.rename(id.name), 
                path.node.id = id;
              }
            }
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
  }(2777), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();