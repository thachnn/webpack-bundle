(() => {
  "use strict";
  var __webpack_modules__ = {
    488: module => {
      module.exports = require("../lib/helper-plugin-utils");
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
    function removePlugin(plugins, name) {
      const indices = [];
      plugins.forEach(((plugin, i) => {
        (Array.isArray(plugin) ? plugin[0] : plugin) === name && indices.unshift(i);
      }));
      for (const i of indices) plugins.splice(i, 1);
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _default = (0, __webpack_require__(488).declare)(((api, {isTSX, disallowAmbiguousJSXLike}) => (api.assertVersion(7), 
    {
      name: "syntax-typescript",
      manipulateOptions(opts, parserOpts) {
        const {plugins} = parserOpts;
        removePlugin(plugins, "flow"), removePlugin(plugins, "jsx"), plugins.push([ "typescript", {
          disallowAmbiguousJSXLike
        } ], "classProperties"), plugins.push("objectRestSpread"), isTSX && plugins.push("jsx");
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