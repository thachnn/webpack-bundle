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
    var _helperPluginUtils = __webpack_require__(5488), _helperSkipTransparentExpressionWrappers = __webpack_require__(4539), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)(((api, options) => {
      var _api$assumption, _options$allowArrayLi;
      api.assertVersion(7);
      const iterableIsArray = null != (_api$assumption = api.assumption("iterableIsArray")) ? _api$assumption : options.loose, arrayLikeIsIterable = null != (_options$allowArrayLi = options.allowArrayLike) ? _options$allowArrayLi : api.assumption("arrayLikeIsIterable");
      function getSpreadLiteral(spread, scope) {
        return iterableIsArray && !_core.types.isIdentifier(spread.argument, {
          name: "arguments"
        }) ? spread.argument : scope.toArray(spread.argument, !0, arrayLikeIsIterable);
      }
      function hasSpread(nodes) {
        for (let i = 0; i < nodes.length; i++) if (_core.types.isSpreadElement(nodes[i])) return !0;
        return !1;
      }
      function push(_props, nodes) {
        return _props.length ? (nodes.push(_core.types.arrayExpression(_props)), []) : _props;
      }
      function build(props, scope, file) {
        const nodes = [];
        let _props = [];
        for (const prop of props) if (_core.types.isSpreadElement(prop)) {
          _props = push(_props, nodes);
          let spreadLiteral = getSpreadLiteral(prop, scope);
          _core.types.isArrayExpression(spreadLiteral) && spreadLiteral.elements.some((el => null === el)) && (spreadLiteral = _core.types.callExpression(file.addHelper("arrayWithoutHoles"), [ spreadLiteral ])), 
          nodes.push(spreadLiteral);
        } else _props.push(prop);
        return push(_props, nodes), nodes;
      }
      return {
        name: "transform-spread",
        visitor: {
          ArrayExpression(path) {
            const {node, scope} = path, elements = node.elements;
            if (!hasSpread(elements)) return;
            const nodes = build(elements, scope, this);
            let first = nodes[0];
            1 !== nodes.length || first === elements[0].argument ? (_core.types.isArrayExpression(first) ? nodes.shift() : first = _core.types.arrayExpression([]), 
            path.replaceWith(_core.types.callExpression(_core.types.memberExpression(first, _core.types.identifier("concat")), nodes))) : path.replaceWith(first);
          },
          CallExpression(path) {
            const {node, scope} = path, args = node.arguments;
            if (!hasSpread(args)) return;
            const calleePath = (0, _helperSkipTransparentExpressionWrappers.skipTransparentExprWrappers)(path.get("callee"));
            if (calleePath.isSuper()) throw path.buildCodeFrameError("It's not possible to compile spread arguments in `super()` without compiling classes.\nPlease add '@babel/plugin-transform-classes' to your Babel configuration.");
            let nodes, contextLiteral = scope.buildUndefinedNode();
            node.arguments = [], nodes = 1 === args.length && _core.types.isIdentifier(args[0].argument, {
              name: "arguments"
            }) ? [ args[0].argument ] : build(args, scope, this);
            const first = nodes.shift();
            nodes.length ? node.arguments.push(_core.types.callExpression(_core.types.memberExpression(first, _core.types.identifier("concat")), nodes)) : node.arguments.push(first);
            const callee = calleePath.node;
            if (_core.types.isMemberExpression(callee)) {
              const temp = scope.maybeGenerateMemoised(callee.object);
              temp ? (callee.object = _core.types.assignmentExpression("=", temp, callee.object), 
              contextLiteral = temp) : contextLiteral = _core.types.cloneNode(callee.object);
            }
            node.callee = _core.types.memberExpression(node.callee, _core.types.identifier("apply")), 
            _core.types.isSuper(contextLiteral) && (contextLiteral = _core.types.thisExpression()), 
            node.arguments.unshift(_core.types.cloneNode(contextLiteral));
          },
          NewExpression(path) {
            const {node, scope} = path;
            if (!hasSpread(node.arguments)) return;
            const nodes = build(node.arguments, scope, this), first = nodes.shift();
            let args;
            args = nodes.length ? _core.types.callExpression(_core.types.memberExpression(first, _core.types.identifier("concat")), nodes) : first, 
            path.replaceWith(_core.types.callExpression(path.hub.addHelper("construct"), [ node.callee, args ]));
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