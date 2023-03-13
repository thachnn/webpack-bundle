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
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    8459: module => {
      module.exports = require("../lib/types");
    },
    5111: module => {
      module.exports = require("./syntax-optional-chaining");
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
    var helperPluginUtils = __webpack_require__(5488), syntaxOptionalChaining = __webpack_require__(5111), core = __webpack_require__(4629), helperSkipTransparentExpressionWrappers = __webpack_require__(4539);
    function _interopDefaultLegacy(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var syntaxOptionalChaining__default = _interopDefaultLegacy(syntaxOptionalChaining);
    function willPathCastToBoolean(path) {
      const maybeWrapped = findOutermostTransparentParent(path), {node, parentPath} = maybeWrapped;
      if (parentPath.isLogicalExpression()) {
        const {operator, right} = parentPath.node;
        if ("&&" === operator || "||" === operator || "??" === operator && node === right) return willPathCastToBoolean(parentPath);
      }
      if (parentPath.isSequenceExpression()) {
        const {expressions} = parentPath.node;
        return expressions[expressions.length - 1] !== node || willPathCastToBoolean(parentPath);
      }
      return parentPath.isConditional({
        test: node
      }) || parentPath.isUnaryExpression({
        operator: "!"
      }) || parentPath.isLoop({
        test: node
      });
    }
    function findOutermostTransparentParent(path) {
      let maybeWrapped = path;
      return path.findParent((p => {
        if (!helperSkipTransparentExpressionWrappers.isTransparentExprWrapper(p.node)) return !0;
        maybeWrapped = p;
      })), maybeWrapped;
    }
    const {ast} = core.template.expression;
    function isSimpleMemberExpression(expression) {
      return expression = helperSkipTransparentExpressionWrappers.skipTransparentExprWrapperNodes(expression), 
      core.types.isIdentifier(expression) || core.types.isSuper(expression) || core.types.isMemberExpression(expression) && !expression.computed && isSimpleMemberExpression(expression.object);
    }
    function transform(path, {pureGetters, noDocumentAll}) {
      const {scope} = path, maybeWrapped = findOutermostTransparentParent(path), {parentPath} = maybeWrapped, willReplacementCastToBoolean = willPathCastToBoolean(maybeWrapped);
      let isDeleteOperation = !1;
      const parentIsCall = parentPath.isCallExpression({
        callee: maybeWrapped.node
      }) && path.isOptionalMemberExpression(), optionals = [];
      let optionalPath = path;
      if (scope.path.isPattern() && function(path) {
        let optionalPath = path;
        const {scope} = path;
        for (;optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression(); ) {
          const {node} = optionalPath, childKey = optionalPath.isOptionalMemberExpression() ? "object" : "callee", childPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get(childKey));
          if (node.optional) return !scope.isStatic(childPath.node);
          optionalPath = childPath;
        }
      }(optionalPath)) return void path.replaceWith(core.template.ast`(() => ${path.node})()`);
      for (;optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression(); ) {
        const {node} = optionalPath;
        node.optional && optionals.push(node), optionalPath.isOptionalMemberExpression() ? (optionalPath.node.type = "MemberExpression", 
        optionalPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get("object"))) : optionalPath.isOptionalCallExpression() && (optionalPath.node.type = "CallExpression", 
        optionalPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(optionalPath.get("callee")));
      }
      let replacementPath = path;
      parentPath.isUnaryExpression({
        operator: "delete"
      }) && (replacementPath = parentPath, isDeleteOperation = !0);
      for (let i = optionals.length - 1; i >= 0; i--) {
        const node = optionals[i], isCall = core.types.isCallExpression(node), replaceKey = isCall ? "callee" : "object", chainWithTypes = node[replaceKey], chain = helperSkipTransparentExpressionWrappers.skipTransparentExprWrapperNodes(chainWithTypes);
        let ref, check;
        if (isCall && core.types.isIdentifier(chain, {
          name: "eval"
        }) ? (check = ref = chain, node[replaceKey] = core.types.sequenceExpression([ core.types.numericLiteral(0), ref ])) : pureGetters && isCall && isSimpleMemberExpression(chain) ? check = ref = chainWithTypes : (ref = scope.maybeGenerateMemoised(chain), 
        ref ? (check = core.types.assignmentExpression("=", core.types.cloneNode(ref), chainWithTypes), 
        node[replaceKey] = ref) : check = ref = chainWithTypes), isCall && core.types.isMemberExpression(chain)) if (pureGetters && isSimpleMemberExpression(chain)) node.callee = chainWithTypes; else {
          const {object} = chain;
          let context = scope.maybeGenerateMemoised(object);
          context ? chain.object = core.types.assignmentExpression("=", context, object) : context = core.types.isSuper(object) ? core.types.thisExpression() : object, 
          node.arguments.unshift(core.types.cloneNode(context)), node.callee = core.types.memberExpression(node.callee, core.types.identifier("call"));
        }
        let replacement = replacementPath.node;
        if (0 === i && parentIsCall) {
          var _baseRef;
          const object = helperSkipTransparentExpressionWrappers.skipTransparentExprWrapperNodes(replacement.object);
          let baseRef;
          pureGetters && isSimpleMemberExpression(object) || (baseRef = scope.maybeGenerateMemoised(object), 
          baseRef && (replacement.object = core.types.assignmentExpression("=", baseRef, object))), 
          replacement = core.types.callExpression(core.types.memberExpression(replacement, core.types.identifier("bind")), [ core.types.cloneNode(null != (_baseRef = baseRef) ? _baseRef : object) ]);
        }
        if (willReplacementCastToBoolean) {
          const nonNullishCheck = noDocumentAll ? ast`${core.types.cloneNode(check)} != null` : ast`
            ${core.types.cloneNode(check)} !== null && ${core.types.cloneNode(ref)} !== void 0`;
          replacementPath.replaceWith(core.types.logicalExpression("&&", nonNullishCheck, replacement)), 
          replacementPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(replacementPath.get("right"));
        } else {
          const nullishCheck = noDocumentAll ? ast`${core.types.cloneNode(check)} == null` : ast`
            ${core.types.cloneNode(check)} === null || ${core.types.cloneNode(ref)} === void 0`, returnValue = isDeleteOperation ? ast`true` : ast`void 0`;
          replacementPath.replaceWith(core.types.conditionalExpression(nullishCheck, returnValue, replacement)), 
          replacementPath = helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers(replacementPath.get("alternate"));
        }
      }
    }
    var index = helperPluginUtils.declare(((api, options) => {
      var _api$assumption, _api$assumption2;
      api.assertVersion(7);
      const {loose = !1} = options, noDocumentAll = null != (_api$assumption = api.assumption("noDocumentAll")) ? _api$assumption : loose, pureGetters = null != (_api$assumption2 = api.assumption("pureGetters")) ? _api$assumption2 : loose;
      return {
        name: "proposal-optional-chaining",
        inherits: syntaxOptionalChaining__default.default.default,
        visitor: {
          "OptionalCallExpression|OptionalMemberExpression"(path) {
            transform(path, {
              noDocumentAll,
              pureGetters
            });
          }
        }
      };
    }));
    exports.default = index, exports.transform = transform;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();