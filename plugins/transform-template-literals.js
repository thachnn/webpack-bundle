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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 546);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  546: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose} = options;
      let helperName = "taggedTemplateLiteral";
      return loose && (helperName += "Loose"), {
        name: "transform-template-literals",
        visitor: {
          TaggedTemplateExpression(path) {
            const {node: node} = path, {quasi: quasi} = node, strings = [], raws = [];
            let isStringsRawEqual = !0;
            for (const elem of quasi.quasis) {
              const {raw: raw, cooked: cooked} = elem.value, value = null == cooked ? path.scope.buildUndefinedNode() : _core.types.stringLiteral(cooked);
              strings.push(value), raws.push(_core.types.stringLiteral(raw)), raw !== cooked && (isStringsRawEqual = !1);
            }
            const scope = path.scope.getProgramParent(), templateObject = scope.generateUidIdentifier("templateObject"), helperId = this.addHelper(helperName), callExpressionInput = [ _core.types.arrayExpression(strings) ];
            isStringsRawEqual || callExpressionInput.push(_core.types.arrayExpression(raws));
            const lazyLoad = _core.template.ast`
          function ${templateObject}() {
            const data = ${_core.types.callExpression(helperId, callExpressionInput)};
            ${_core.types.cloneNode(templateObject)} = function() { return data };
            return data;
          }
        `;
            scope.path.unshiftContainer("body", lazyLoad), path.replaceWith(_core.types.callExpression(node.tag, [ _core.types.callExpression(_core.types.cloneNode(templateObject), []), ...quasi.expressions ]));
          },
          TemplateLiteral(path) {
            const nodes = [], expressions = path.get("expressions");
            let index = 0;
            for (const elem of path.node.quasis) if (elem.value.cooked && nodes.push(_core.types.stringLiteral(elem.value.cooked)), 
            index < expressions.length) {
              const node = expressions[index++].node;
              _core.types.isStringLiteral(node, {
                value: ""
              }) || nodes.push(node);
            }
            const considerSecondNode = !loose || !_core.types.isStringLiteral(nodes[1]);
            !_core.types.isStringLiteral(nodes[0]) && considerSecondNode && nodes.unshift(_core.types.stringLiteral(""));
            let root = nodes[0];
            if (loose) for (let i = 1; i < nodes.length; i++) root = _core.types.binaryExpression("+", root, nodes[i]); else nodes.length > 1 && (root = function(items) {
              let avail = !0;
              return items.reduce((function(left, right) {
                let canBeInserted = _core.types.isLiteral(right);
                return !canBeInserted && avail && (canBeInserted = !0, avail = !1), canBeInserted && _core.types.isCallExpression(left) ? (left.arguments.push(right), 
                left) : _core.types.callExpression(_core.types.memberExpression(left, _core.types.identifier("concat")), [ right ]);
              }));
            }(nodes));
            path.replaceWith(root);
          }
        }
      };
    });
    exports.default = _default;
  }
});