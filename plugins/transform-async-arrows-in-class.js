(() => {
  "use strict";
  var __webpack_modules__ = {
    5196: (module, exports) => {
      exports.__esModule = !0, exports.default = void 0;
      const OPTS = {
        allowInsertArrow: !1,
        specCompliant: !1
      };
      exports.default = ({types: t}) => ({
        name: "transform-async-arrows-in-class",
        visitor: {
          ArrowFunctionExpression(path) {
            path.node.async && path.findParent(t.isClassMethod) && path.arrowFunctionToExpression(OPTS);
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
  }(5196), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();