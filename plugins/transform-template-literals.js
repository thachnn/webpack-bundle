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
    _helperPluginUtils.declare)(((api, options) => {
      var _api$assumption, _api$assumption2;
      api.assertVersion(7);
      const ignoreToPrimitiveHint = null != (_api$assumption = api.assumption("ignoreToPrimitiveHint")) ? _api$assumption : options.loose, mutableTemplateObject = null != (_api$assumption2 = api.assumption("mutableTemplateObject")) ? _api$assumption2 : options.loose;
      let helperName = "taggedTemplateLiteral";
      return mutableTemplateObject && (helperName += "Loose"), {
        name: "transform-template-literals",
        visitor: {
          TaggedTemplateExpression(path) {
            const {node} = path, {quasi} = node, strings = [], raws = [];
            let isStringsRawEqual = !0;
            for (const elem of quasi.quasis) {
              const {raw, cooked} = elem.value, value = null == cooked ? path.scope.buildUndefinedNode() : _core.types.stringLiteral(cooked);
              strings.push(value), raws.push(_core.types.stringLiteral(raw)), raw !== cooked && (isStringsRawEqual = !1);
            }
            const helperArgs = [ _core.types.arrayExpression(strings) ];
            isStringsRawEqual || helperArgs.push(_core.types.arrayExpression(raws));
            const tmp = path.scope.generateUidIdentifier("templateObject");
            path.scope.getProgramParent().push({
              id: _core.types.cloneNode(tmp)
            }), path.replaceWith(_core.types.callExpression(node.tag, [ _core.template.expression.ast`
              ${_core.types.cloneNode(tmp)} || (
                ${tmp} = ${this.addHelper(helperName)}(${helperArgs})
              )
            `, ...quasi.expressions ]));
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
            _core.types.isStringLiteral(nodes[0]) || ignoreToPrimitiveHint && _core.types.isStringLiteral(nodes[1]) || nodes.unshift(_core.types.stringLiteral(""));
            let root = nodes[0];
            if (ignoreToPrimitiveHint) for (let i = 1; i < nodes.length; i++) root = _core.types.binaryExpression("+", root, nodes[i]); else nodes.length > 1 && (root = function(items) {
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
    }));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();