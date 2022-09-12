(() => {
  "use strict";
  var __webpack_modules__ = {
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    8593: module => {
      module.exports = require("../plugins/syntax-json-strings");
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
    var _helperPluginUtils = __webpack_require__(3177), _pluginSyntaxJsonStrings = __webpack_require__(8593), _default = (0, 
    _helperPluginUtils.declare)((api => {
      api.assertVersion(7);
      const regex = /(\\*)([\u2028\u2029])/g;
      function replace(match, escapes, separator) {
        return escapes.length % 2 == 1 ? match : `${escapes}\\u${separator.charCodeAt(0).toString(16)}`;
      }
      return {
        name: "proposal-json-strings",
        inherits: _pluginSyntaxJsonStrings.default,
        visitor: {
          "DirectiveLiteral|StringLiteral"({node}) {
            const {extra} = node;
            null != extra && extra.raw && (extra.raw = extra.raw.replace(regex, replace));
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