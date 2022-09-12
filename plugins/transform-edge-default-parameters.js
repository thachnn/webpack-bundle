(() => {
  "use strict";
  var __webpack_modules__ = {
    7592: (module, exports) => {
      exports.__esModule = !0, exports.default = void 0;
      exports.default = ({types: t}) => {
        const isArrowParent = p => "params" === p.parentKey && p.parentPath && t.isArrowFunctionExpression(p.parentPath);
        return {
          name: "transform-edge-default-parameters",
          visitor: {
            AssignmentPattern(path) {
              path.find(isArrowParent) && path.parent.shorthand && (path.parent.shorthand = !1, 
              (path.parent.extra || {}).shorthand = !1, path.scope.rename(path.parent.key.name));
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
  }(7592), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();