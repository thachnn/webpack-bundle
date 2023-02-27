#!/usr/bin/env node
require("../vendor/v8-compile-cache"), (() => {
  var __webpack_modules__ = {
    985: module => {
      "use strict";
      module.exports = require("../lib/libnpx");
    },
    17: module => {
      "use strict";
      module.exports = require("path");
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
  (() => {
    const npx = __webpack_require__(985), NPM_PATH = __webpack_require__(17).join(__dirname, "npm-cli.js");
    npx(npx.parseArgs(process.argv, NPM_PATH));
  })();
})();