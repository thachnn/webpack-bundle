!function() {
  var __webpack_modules__ = {
    353: function(module, __unused_webpack_exports, __webpack_require__) {
      module.exports = __webpack_require__(113).randomBytes;
    },
    254: function(module, __unused_webpack_exports, __webpack_require__) {
      "use strict";
      var randomBytes = __webpack_require__(353), UID = function() {
        for (var bytes = randomBytes(16), result = "", i = 0; i < 16; ++i) result += bytes[i].toString(16);
        return result;
      }(), PLACE_HOLDER_REGEXP = new RegExp('(\\\\)?"@__(F|R|D|M|S|A|U|I|B|L)-' + UID + '-(\\d+)__@"', "g"), IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g, IS_PURE_FUNCTION = /function.*?\(/, IS_ARROW_FUNCTION = /.*?=>.*?/, UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g, RESERVED_SYMBOLS = [ "*", "async" ], ESCAPED_CHARS = {
        "<": "\\u003C",
        ">": "\\u003E",
        "/": "\\u002F",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      function escapeUnsafeChars(unsafeChar) {
        return ESCAPED_CHARS[unsafeChar];
      }
      module.exports = function serialize(obj, options) {
        options || (options = {}), "number" != typeof options && "string" != typeof options || (options = {
          space: options
        });
        var str, functions = [], regexps = [], dates = [], maps = [], sets = [], arrays = [], undefs = [], infinities = [], bigInts = [], urls = [];
        return options.ignoreFunction && "function" == typeof obj && (obj = void 0), void 0 === obj ? String(obj) : (str = options.isJSON && !options.space ? JSON.stringify(obj) : JSON.stringify(obj, options.isJSON ? null : function(key, value) {
          if (options.ignoreFunction && function(obj) {
            var functionKeys = [];
            for (var key in obj) "function" == typeof obj[key] && functionKeys.push(key);
            for (var i = 0; i < functionKeys.length; i++) delete obj[functionKeys[i]];
          }(value), !value && void 0 !== value) return value;
          var origValue = this[key], type = typeof origValue;
          if ("object" === type) {
            if (origValue instanceof RegExp) return "@__R-" + UID + "-" + (regexps.push(origValue) - 1) + "__@";
            if (origValue instanceof Date) return "@__D-" + UID + "-" + (dates.push(origValue) - 1) + "__@";
            if (origValue instanceof Map) return "@__M-" + UID + "-" + (maps.push(origValue) - 1) + "__@";
            if (origValue instanceof Set) return "@__S-" + UID + "-" + (sets.push(origValue) - 1) + "__@";
            if (origValue instanceof Array && origValue.filter((function() {
              return !0;
            })).length !== origValue.length) return "@__A-" + UID + "-" + (arrays.push(origValue) - 1) + "__@";
            if (origValue instanceof URL) return "@__L-" + UID + "-" + (urls.push(origValue) - 1) + "__@";
          }
          return "function" === type ? "@__F-" + UID + "-" + (functions.push(origValue) - 1) + "__@" : "undefined" === type ? "@__U-" + UID + "-" + (undefs.push(origValue) - 1) + "__@" : "number" !== type || isNaN(origValue) || isFinite(origValue) ? "bigint" === type ? "@__B-" + UID + "-" + (bigInts.push(origValue) - 1) + "__@" : value : "@__I-" + UID + "-" + (infinities.push(origValue) - 1) + "__@";
        }, options.space), "string" != typeof str ? String(str) : (!0 !== options.unsafe && (str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars)), 
        0 === functions.length && 0 === regexps.length && 0 === dates.length && 0 === maps.length && 0 === sets.length && 0 === arrays.length && 0 === undefs.length && 0 === infinities.length && 0 === bigInts.length && 0 === urls.length ? str : str.replace(PLACE_HOLDER_REGEXP, (function(match, backSlash, type, valueIndex) {
          return backSlash ? match : "D" === type ? 'new Date("' + dates[valueIndex].toISOString() + '")' : "R" === type ? "new RegExp(" + serialize(regexps[valueIndex].source) + ', "' + regexps[valueIndex].flags + '")' : "M" === type ? "new Map(" + serialize(Array.from(maps[valueIndex].entries()), options) + ")" : "S" === type ? "new Set(" + serialize(Array.from(sets[valueIndex].values()), options) + ")" : "A" === type ? "Array.prototype.slice.call(" + serialize(Object.assign({
            length: arrays[valueIndex].length
          }, arrays[valueIndex]), options) + ")" : "U" === type ? "undefined" : "I" === type ? infinities[valueIndex] : "B" === type ? 'BigInt("' + bigInts[valueIndex] + '")' : "L" === type ? 'new URL("' + urls[valueIndex].toString() + '")' : function(fn) {
            var serializedFn = fn.toString();
            if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) throw new TypeError("Serializing native function: " + fn.name);
            if (IS_PURE_FUNCTION.test(serializedFn)) return serializedFn;
            if (IS_ARROW_FUNCTION.test(serializedFn)) return serializedFn;
            var argsStartsAt = serializedFn.indexOf("("), def = serializedFn.substr(0, argsStartsAt).trim().split(" ").filter((function(val) {
              return val.length > 0;
            }));
            return def.filter((function(val) {
              return -1 === RESERVED_SYMBOLS.indexOf(val);
            })).length > 0 ? (def.indexOf("async") > -1 ? "async " : "") + "function" + (def.join("").indexOf("*") > -1 ? "*" : "") + serializedFn.substr(argsStartsAt) : serializedFn;
          }(functions[valueIndex]);
        }))));
      };
    },
    113: function(module) {
      "use strict";
      module.exports = require("crypto");
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
  }(254);
  module.exports = __webpack_exports__;
}();