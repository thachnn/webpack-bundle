(() => {
  "use strict";
  var __webpack_modules__ = {
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    5732: module => {
      module.exports = require("./syntax-export-namespace-from");
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
    var _helperPluginUtils = __webpack_require__(5488), _pluginSyntaxExportNamespaceFrom = __webpack_require__(5732), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "proposal-export-namespace-from",
      inherits: _pluginSyntaxExportNamespaceFrom.default,
      visitor: {
        ExportNamedDeclaration(path) {
          var _exported$name;
          const {node, scope} = path, {specifiers} = node, index = _core.types.isExportDefaultSpecifier(specifiers[0]) ? 1 : 0;
          if (!_core.types.isExportNamespaceSpecifier(specifiers[index])) return;
          const nodes = [];
          1 === index && nodes.push(_core.types.exportNamedDeclaration(null, [ specifiers.shift() ], node.source));
          const specifier = specifiers.shift(), {exported} = specifier, uid = scope.generateUidIdentifier(null != (_exported$name = exported.name) ? _exported$name : exported.value);
          nodes.push(_core.types.importDeclaration([ _core.types.importNamespaceSpecifier(uid) ], _core.types.cloneNode(node.source)), _core.types.exportNamedDeclaration(null, [ _core.types.exportSpecifier(_core.types.cloneNode(uid), exported) ])), 
          node.specifiers.length >= 1 && nodes.push(node);
          const [importDeclaration] = path.replaceWithMultiple(nodes);
          path.scope.registerDeclaration(importDeclaration);
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