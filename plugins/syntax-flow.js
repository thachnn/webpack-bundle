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
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _default = (0, __webpack_require__(488).declare)(((api, options) => {
      api.assertVersion(7);
      const {all, enums} = options;
      if ("boolean" != typeof all && void 0 !== all) throw new Error(".all must be a boolean, or undefined");
      if ("boolean" != typeof enums && void 0 !== enums) throw new Error(".enums must be a boolean, or undefined");
      return {
        name: "syntax-flow",
        manipulateOptions(opts, parserOpts) {
          parserOpts.plugins.some((p => "typescript" === (Array.isArray(p) ? p[0] : p))) || parserOpts.plugins.push([ "flow", {
            all,
            enums
          } ]);
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