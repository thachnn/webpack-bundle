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
    _helperPluginUtils.declare)((api => {
      api.assertVersion(7);
      const surrogate = /[\ud800-\udfff]/g, unicodeEscape = /(\\+)u\{([0-9a-fA-F]+)\}/g;
      function escape(code) {
        let str = code.toString(16);
        for (;str.length < 4; ) str = "0" + str;
        return "\\u" + str;
      }
      function replacer(match, backslashes, code) {
        if (backslashes.length % 2 == 0) return match;
        const char = String.fromCodePoint(parseInt(code, 16)), escaped = backslashes.slice(0, -1) + escape(char.charCodeAt(0));
        return 1 === char.length ? escaped : escaped + escape(char.charCodeAt(1));
      }
      function replaceUnicodeEscapes(str) {
        return str.replace(unicodeEscape, replacer);
      }
      return {
        name: "transform-unicode-escapes",
        manipulateOptions({generatorOpts}) {
          var _generatorOpts$jsescO;
          generatorOpts.jsescOption || (generatorOpts.jsescOption = {}), null != (_generatorOpts$jsescO = generatorOpts.jsescOption).minimal || (_generatorOpts$jsescO.minimal = !1);
        },
        visitor: {
          Identifier(path) {
            const {node, key} = path, {name} = node, replaced = name.replace(surrogate, (c => `_u${c.charCodeAt(0).toString(16)}`));
            if (name === replaced) return;
            const str = _core.types.inherits(_core.types.stringLiteral(name), node);
            if ("key" === key) return void path.replaceWith(str);
            const {parentPath, scope} = path;
            if (parentPath.isMemberExpression({
              property: node
            }) || parentPath.isOptionalMemberExpression({
              property: node
            })) return parentPath.node.computed = !0, void path.replaceWith(str);
            if (!scope.getBinding(name)) throw path.buildCodeFrameError(`Can't reference '${name}' as a bare identifier`);
            scope.rename(name, scope.generateUid(replaced));
          },
          "StringLiteral|DirectiveLiteral"(path) {
            const {node} = path, {extra} = node;
            null != extra && extra.raw && (extra.raw = replaceUnicodeEscapes(extra.raw));
          },
          TemplateElement(path) {
            const {node, parentPath} = path, {value} = node, firstEscape = function(str) {
              let match;
              for (;match = unicodeEscape.exec(str); ) if (match[1].length % 2 != 0) return unicodeEscape.lastIndex = 0, 
              match[0];
              return null;
            }(value.raw);
            if (!firstEscape) return;
            if (parentPath.parentPath.isTaggedTemplateExpression()) throw path.buildCodeFrameError(`Can't replace Unicode escape '${firstEscape}' inside tagged template literals. You can enable '@babel/plugin-transform-template-literals' to compile them to classic strings.`);
            value.raw = replaceUnicodeEscapes(value.raw);
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