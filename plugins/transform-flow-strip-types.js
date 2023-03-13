(() => {
  "use strict";
  var __webpack_modules__ = {
    488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    614: module => {
      module.exports = require("./syntax-flow");
    },
    629: module => {
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
    var _helperPluginUtils = __webpack_require__(488), _pluginSyntaxFlow = __webpack_require__(614), _core = __webpack_require__(629), _default = (0, 
    _helperPluginUtils.declare)(((api, opts) => {
      api.assertVersion(7);
      const FLOW_DIRECTIVE = /(@flow(\s+(strict(-local)?|weak))?|@noflow)/;
      let skipStrip = !1;
      const {requireDirective = !1} = opts;
      var {allowDeclareFields = !1} = opts;
      return {
        name: "transform-flow-strip-types",
        inherits: _pluginSyntaxFlow.default,
        visitor: {
          Program(path, {file: {ast: {comments}}}) {
            skipStrip = !1;
            let directiveFound = !1;
            if (comments) for (const comment of comments) FLOW_DIRECTIVE.test(comment.value) && (directiveFound = !0, 
            comment.value = comment.value.replace(FLOW_DIRECTIVE, ""), comment.value.replace(/\*/g, "").trim() || (comment.ignore = !0));
            !directiveFound && requireDirective && (skipStrip = !0);
          },
          ImportDeclaration(path) {
            if (skipStrip) return;
            if (!path.node.specifiers.length) return;
            let typeCount = 0;
            path.node.specifiers.forEach((({importKind}) => {
              "type" !== importKind && "typeof" !== importKind || typeCount++;
            })), typeCount === path.node.specifiers.length && path.remove();
          },
          Flow(path) {
            if (skipStrip) throw path.buildCodeFrameError("A @flow directive is required when using Flow annotations with the `requireDirective` option.");
            path.remove();
          },
          ClassPrivateProperty(path) {
            skipStrip || (path.node.typeAnnotation = null);
          },
          Class(path) {
            skipStrip || (path.node.implements = null, path.get("body.body").forEach((child => {
              if (child.isClassProperty()) {
                const {node} = child;
                if (!allowDeclareFields && node.declare) throw child.buildCodeFrameError("The 'declare' modifier is only allowed when the 'allowDeclareFields' option of @babel/plugin-transform-flow-strip-types or @babel/preset-flow is enabled.");
                if (node.declare) child.remove(); else {
                  if (!allowDeclareFields && !node.value && !node.decorators) return void child.remove();
                  node.variance = null, node.typeAnnotation = null;
                }
              }
            })));
          },
          AssignmentPattern({node}) {
            skipStrip || (node.left.optional = !1);
          },
          Function({node}) {
            if (!skipStrip) {
              node.params.length > 0 && "Identifier" === node.params[0].type && "this" === node.params[0].name && node.params.shift();
              for (let i = 0; i < node.params.length; i++) {
                const param = node.params[i];
                param.optional = !1, "AssignmentPattern" === param.type && (param.left.optional = !1);
              }
              node.predicate = null;
            }
          },
          TypeCastExpression(path) {
            if (skipStrip) return;
            let {node} = path;
            do {
              node = node.expression;
            } while (_core.types.isTypeCastExpression(node));
            path.replaceWith(node);
          },
          CallExpression({node}) {
            skipStrip || (node.typeArguments = null);
          },
          OptionalCallExpression({node}) {
            skipStrip || (node.typeArguments = null);
          },
          NewExpression({node}) {
            skipStrip || (node.typeArguments = null);
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