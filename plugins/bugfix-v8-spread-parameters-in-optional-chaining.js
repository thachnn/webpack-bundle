(() => {
  "use strict";
  var __webpack_modules__ = {
    4539: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isTransparentExprWrapper = isTransparentExprWrapper, exports.skipTransparentExprWrapperNodes = function(node) {
        for (;isTransparentExprWrapper(node); ) node = node.expression;
        return node;
      }, exports.skipTransparentExprWrappers = function(path) {
        for (;isTransparentExprWrapper(path.node); ) path = path.get("expression");
        return path;
      };
      var _t = __webpack_require__(8459);
      const {isParenthesizedExpression, isTSAsExpression, isTSNonNullExpression, isTSTypeAssertion, isTypeCastExpression} = _t;
      function isTransparentExprWrapper(node) {
        return isTSAsExpression(node) || isTSTypeAssertion(node) || isTSNonNullExpression(node) || isTypeCastExpression(node) || isParenthesizedExpression(node);
      }
    },
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    8459: module => {
      module.exports = require("../lib/types");
    },
    6437: module => {
      module.exports = require("../plugins/proposal-optional-chaining");
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
    });
    var helperPluginUtils = __webpack_require__(3177), pluginProposalOptionalChaining = __webpack_require__(6437), helperSkipTransparentExpressionWrappers = __webpack_require__(4539), core = __webpack_require__(4629);
    function matchAffectedArguments(argumentNodes) {
      const spreadIndex = argumentNodes.findIndex((node => core.types.isSpreadElement(node)));
      return spreadIndex >= 0 && spreadIndex !== argumentNodes.length - 1;
    }
    var index = helperPluginUtils.declare((api => {
      api.assertVersion(7);
      const noDocumentAll = api.assumption("noDocumentAll"), pureGetters = api.assumption("pureGetters");
      return {
        name: "bugfix-v8-spread-parameters-in-optional-chaining",
        visitor: {
          "OptionalCallExpression|OptionalMemberExpression"(path) {
            (function(path) {
              let optionalPath = path;
              const chains = [];
              for (;optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression(); ) {
                const {node} = optionalPath;
                chains.push(node), optionalPath.isOptionalMemberExpression() ? optionalPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get("object")) : optionalPath.isOptionalCallExpression() && (optionalPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get("callee")));
              }
              for (let i = 0; i < chains.length; i++) {
                const node = chains[i];
                if (core.types.isOptionalCallExpression(node) && matchAffectedArguments(node.arguments)) {
                  if (node.optional) return !0;
                  const callee = chains[i + 1];
                  if (core.types.isOptionalMemberExpression(callee, {
                    optional: !0
                  })) return !0;
                }
              }
              return !1;
            })(path) && pluginProposalOptionalChaining.transform(path, {
              noDocumentAll,
              pureGetters
            });
          }
        }
      };
    }));
    exports.default = index;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();