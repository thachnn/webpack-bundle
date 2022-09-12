(() => {
  "use strict";
  var __webpack_modules__ = {
    8895: (module, exports) => {
      exports.__esModule = !0, exports.default = void 0;
      exports.default = ({types: t}) => ({
        name: "transform-tagged-template-caching",
        visitor: {
          TaggedTemplateExpression(path, state) {
            let processed = state.get("processed");
            if (processed || (processed = new WeakSet, state.set("processed", processed)), processed.has(path.node)) return path.skip();
            const expressions = path.node.quasi.expressions;
            let identity = state.get("identity");
            if (!identity) {
              identity = path.scope.getProgramParent().generateDeclaredUidIdentifier("_"), state.set("identity", identity);
              path.scope.getBinding(identity.name).path.get("init").replaceWith(t.arrowFunctionExpression([ t.identifier("t") ], t.identifier("t")));
            }
            const template = t.taggedTemplateExpression(t.cloneNode(identity), t.templateLiteral(path.node.quasi.quasis, expressions.map((() => t.numericLiteral(0)))));
            processed.add(template);
            const ident = path.scope.getProgramParent().generateDeclaredUidIdentifier("t");
            path.scope.getBinding(ident.name).path.parent.kind = "let";
            const inlineCache = t.logicalExpression("||", ident, t.assignmentExpression("=", t.cloneNode(ident), template)), node = t.callExpression(path.node.tag, [ inlineCache, ...expressions ]);
            path.replaceWith(node);
          }
        }
      }), module.exports = exports.default;
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
  }(8895), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();