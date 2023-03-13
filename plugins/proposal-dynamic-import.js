(() => {
  "use strict";
  var __webpack_modules__ = {
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    136: module => {
      module.exports = require("./syntax-dynamic-import");
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
    var _helperPluginUtils = __webpack_require__(5488), _pluginSyntaxDynamicImport = __webpack_require__(136);
    const SUPPORTED_MODULES = [ "commonjs", "amd", "systemjs" ];
    var _default = (0, _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "proposal-dynamic-import",
      inherits: _pluginSyntaxDynamicImport.default,
      pre() {
        this.file.set("@babel/plugin-proposal-dynamic-import", "7.16.7");
      },
      visitor: {
        Program() {
          const modules = this.file.get("@babel/plugin-transform-modules-*");
          if (!SUPPORTED_MODULES.includes(modules)) throw new Error("@babel/plugin-proposal-dynamic-import depends on a modules\ntransform plugin. Supported plugins are:\n - @babel/plugin-transform-modules-commonjs ^7.4.0\n - @babel/plugin-transform-modules-amd ^7.4.0\n - @babel/plugin-transform-modules-systemjs ^7.4.0\n\nIf you are using Webpack or Rollup and thus don't want\nBabel to transpile your imports and exports, you can use\nthe @babel/plugin-syntax-dynamic-import plugin and let your\nbundler handle dynamic imports.\n");
        }
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