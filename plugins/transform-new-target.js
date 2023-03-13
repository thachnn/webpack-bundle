(() => {
  "use strict";
  var __webpack_modules__ = {
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
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
    var _helperPluginUtils = __webpack_require__(5488), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "transform-new-target",
      visitor: {
        MetaProperty(path) {
          const meta = path.get("meta"), property = path.get("property"), {scope} = path;
          if (meta.isIdentifier({
            name: "new"
          }) && property.isIdentifier({
            name: "target"
          })) {
            const func = path.findParent((path => !!path.isClass() || !(!path.isFunction() || path.isArrowFunctionExpression()) && !path.isClassMethod({
              kind: "constructor"
            })));
            if (!func) throw path.buildCodeFrameError("new.target must be under a (non-arrow) function or a class.");
            const {node} = func;
            if (!node.id) {
              if (func.isMethod()) return void path.replaceWith(scope.buildUndefinedNode());
              node.id = scope.generateUidIdentifier("target");
            }
            const constructor = _core.types.memberExpression(_core.types.thisExpression(), _core.types.identifier("constructor"));
            if (func.isClass()) return void path.replaceWith(constructor);
            path.replaceWith(_core.types.conditionalExpression(_core.types.binaryExpression("instanceof", _core.types.thisExpression(), _core.types.cloneNode(node.id)), constructor, scope.buildUndefinedNode()));
          }
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