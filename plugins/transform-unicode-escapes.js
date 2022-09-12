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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 548);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  548: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)(api => {
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
        visitor: {
          Identifier(path) {
            const {node: node, key: key} = path, {name: name} = node, replaced = name.replace(surrogate, c => "_u" + c.charCodeAt(0).toString(16));
            if (name === replaced) return;
            const str = _core.types.inherits(_core.types.stringLiteral(name), node);
            if ("key" === key) return void path.replaceWith(str);
            const {parentPath: parentPath, scope: scope} = path;
            if (parentPath.isMemberExpression({
              property: node
            }) || parentPath.isOptionalMemberExpression({
              property: node
            })) return parentPath.node.computed = !0, void path.replaceWith(str);
            if (!scope.getBinding(name)) throw path.buildCodeFrameError(`Can't reference '${name}' as a bare identifier`);
            scope.rename(name, scope.generateUid(replaced));
          },
          "StringLiteral|DirectiveLiteral"(path) {
            const {node: node} = path, {extra: extra} = node;
            (null == extra ? void 0 : extra.raw) && (extra.raw = replaceUnicodeEscapes(extra.raw));
          },
          TemplateElement(path) {
            const {node: node, parentPath: parentPath} = path, {value: value} = node, firstEscape = function(str) {
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
    });
    exports.default = _default;
  }
});