(() => {
  "use strict";
  var __webpack_modules__ = {
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    1901: module => {
      module.exports = require("./syntax-numeric-separator");
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
    var _helperPluginUtils = __webpack_require__(5488), _pluginSyntaxNumericSeparator = __webpack_require__(1901);
    function remover({node}) {
      var _extra$raw;
      const {extra} = node;
      null != extra && null != (_extra$raw = extra.raw) && _extra$raw.includes("_") && (extra.raw = extra.raw.replace(/_/g, ""));
    }
    var _default = (0, _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "proposal-numeric-separator",
      inherits: _pluginSyntaxNumericSeparator.default,
      visitor: {
        NumericLiteral: remover,
        BigIntLiteral: remover
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