module.exports = function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.l = !0, module.exports;
  }
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
  __webpack_require__.d = function(exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function(value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 544);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  544: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose, allowArrayLike: allowArrayLike} = options;
      function getSpreadLiteral(spread, scope) {
        return loose && !_core.types.isIdentifier(spread.argument, {
          name: "arguments"
        }) ? spread.argument : scope.toArray(spread.argument, !0, allowArrayLike);
      }
      function hasSpread(nodes) {
        for (let i = 0; i < nodes.length; i++) if (_core.types.isSpreadElement(nodes[i])) return !0;
        return !1;
      }
      function push(_props, nodes) {
        return _props.length ? (nodes.push(_core.types.arrayExpression(_props)), []) : _props;
      }
      function build(props, scope) {
        const nodes = [];
        let _props = [];
        for (const prop of props) _core.types.isSpreadElement(prop) ? (_props = push(_props, nodes), 
        nodes.push(getSpreadLiteral(prop, scope))) : _props.push(prop);
        return push(_props, nodes), nodes;
      }
      return {
        name: "transform-spread",
        visitor: {
          ArrayExpression(path) {
            const {node: node, scope: scope} = path, elements = node.elements;
            if (!hasSpread(elements)) return;
            const nodes = build(elements, scope);
            let first = nodes[0];
            1 !== nodes.length || first === elements[0].argument ? (_core.types.isArrayExpression(first) ? nodes.shift() : first = _core.types.arrayExpression([]), 
            path.replaceWith(_core.types.callExpression(_core.types.memberExpression(first, _core.types.identifier("concat")), nodes))) : path.replaceWith(first);
          },
          CallExpression(path) {
            const {node: node, scope: scope} = path, args = node.arguments;
            if (!hasSpread(args)) return;
            const calleePath = path.get("callee");
            if (calleePath.isSuper()) return;
            let nodes, contextLiteral = scope.buildUndefinedNode();
            node.arguments = [], nodes = 1 === args.length && "arguments" === args[0].argument.name ? [ args[0].argument ] : build(args, scope);
            const first = nodes.shift();
            nodes.length ? node.arguments.push(_core.types.callExpression(_core.types.memberExpression(first, _core.types.identifier("concat")), nodes)) : node.arguments.push(first);
            const callee = node.callee;
            if (calleePath.isMemberExpression()) {
              const temp = scope.maybeGenerateMemoised(callee.object);
              temp ? (callee.object = _core.types.assignmentExpression("=", temp, callee.object), 
              contextLiteral = temp) : contextLiteral = _core.types.cloneNode(callee.object), 
              _core.types.appendToMemberExpression(callee, _core.types.identifier("apply"));
            } else node.callee = _core.types.memberExpression(node.callee, _core.types.identifier("apply"));
            _core.types.isSuper(contextLiteral) && (contextLiteral = _core.types.thisExpression()), 
            node.arguments.unshift(_core.types.cloneNode(contextLiteral));
          },
          NewExpression(path) {
            const {node: node, scope: scope} = path;
            let args = node.arguments;
            if (!hasSpread(args)) return;
            const nodes = build(args, scope), first = nodes.shift();
            args = nodes.length ? _core.types.callExpression(_core.types.memberExpression(first, _core.types.identifier("concat")), nodes) : first, 
            path.replaceWith(_core.types.callExpression(path.hub.addHelper("construct"), [ node.callee, args ]));
          }
        }
      };
    });
    exports.default = _default;
  }
});