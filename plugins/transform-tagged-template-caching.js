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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 553);
}({
  553: function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0, exports.default = void 0;
    exports.default = ({types: t}) => ({
      name: "transform-tagged-template-caching",
      visitor: {
        TaggedTemplateExpression(path, state) {
          let processed = state.get("processed");
          if (processed || (processed = new Map, state.set("processed", processed)), processed.has(path.node)) return path.skip();
          const expressions = path.node.quasi.expressions;
          let identity = state.get("identity");
          if (!identity) {
            identity = path.scope.getProgramParent().generateDeclaredUidIdentifier("_"), state.set("identity", identity);
            path.scope.getBinding(identity.name).path.get("init").replaceWith(t.arrowFunctionExpression([ t.identifier("t") ], t.identifier("t")));
          }
          const template = t.taggedTemplateExpression(identity, t.templateLiteral(path.node.quasi.quasis, expressions.map(() => t.numericLiteral(0))));
          processed.set(template, !0);
          const ident = path.scope.getProgramParent().generateDeclaredUidIdentifier("t");
          path.scope.getBinding(ident.name).path.parent.kind = "let";
          const inlineCache = t.logicalExpression("||", ident, t.assignmentExpression("=", ident, template)), node = t.callExpression(path.node.tag, [ inlineCache, ...expressions ]);
          path.replaceWith(node);
        }
      }
    }), module.exports = exports.default;
  }
});