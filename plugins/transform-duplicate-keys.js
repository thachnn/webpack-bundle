(() => {
  "use strict";
  var __webpack_modules__ = {
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    4629: module => {
      module.exports = require("@babel/core");
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
    var _helperPluginUtils = __webpack_require__(3177), _core = __webpack_require__(4629);
    var _default = (0, _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "transform-duplicate-keys",
      visitor: {
        ObjectExpression(path) {
          const {node} = path, plainProps = node.properties.filter((prop => !_core.types.isSpreadElement(prop) && !prop.computed)), alreadySeenData = Object.create(null), alreadySeenGetters = Object.create(null), alreadySeenSetters = Object.create(null);
          for (const prop of plainProps) {
            const name = (key = prop.key, _core.types.isIdentifier(key) ? key.name : key.value.toString());
            let isDuplicate = !1;
            switch (prop.kind) {
             case "get":
              (alreadySeenData[name] || alreadySeenGetters[name]) && (isDuplicate = !0), alreadySeenGetters[name] = !0;
              break;

             case "set":
              (alreadySeenData[name] || alreadySeenSetters[name]) && (isDuplicate = !0), alreadySeenSetters[name] = !0;
              break;

             default:
              (alreadySeenData[name] || alreadySeenGetters[name] || alreadySeenSetters[name]) && (isDuplicate = !0), 
              alreadySeenData[name] = !0;
            }
            isDuplicate && (prop.computed = !0, prop.key = _core.types.stringLiteral(name));
          }
          var key;
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