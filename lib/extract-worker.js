(() => {
  "use strict";
  var __webpack_modules__ = {
    98166: (module, __unused_webpack_exports, __webpack_require__) => {
      const BB = __webpack_require__(41142), extract = __webpack_require__(96770).extract;
      module.exports = (args, cb) => {
        const parsed = "string" == typeof args ? JSON.parse(args) : args, spec = parsed[0], extractTo = parsed[1], opts = parsed[2];
        BB.resolve(extract(spec, extractTo, opts)).nodeify(cb);
      };
    },
    96770: module => {
      module.exports = require("./pacote");
    },
    41142: module => {
      module.exports = require("../vendor/bluebird");
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
  }(98166);
  module.exports = __webpack_exports__;
})();