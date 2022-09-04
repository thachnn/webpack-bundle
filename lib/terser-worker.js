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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 36);
}({
  2: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _terser = __webpack_require__(3);
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
          _defineProperty(target, key, source[key]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        }));
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      return key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : obj[key] = value, obj;
    }
    var _default = options => {
      const {file: file, input: input, inputSourceMap: inputSourceMap, extractComments: extractComments, minify: minifyFn} = options;
      if (minifyFn) return minifyFn({
        [file]: input
      }, inputSourceMap);
      const terserOptions = (({ecma: ecma, warnings: warnings, parse: parse = {}, compress: compress = {}, mangle: mangle, module: module, output: output, toplevel: toplevel, nameCache: nameCache, ie8: ie8, keep_classnames: keep_classnames, keep_fnames: keep_fnames, safari10: safari10} = {}) => ({
        ecma: ecma,
        warnings: warnings,
        parse: _objectSpread({}, parse),
        compress: "boolean" == typeof compress ? compress : _objectSpread({}, compress),
        mangle: null == mangle || ("boolean" == typeof mangle ? mangle : _objectSpread({}, mangle)),
        output: _objectSpread({
          shebang: !0,
          comments: !1,
          beautify: !1,
          semicolons: !0
        }, output),
        module: module,
        sourceMap: null,
        toplevel: toplevel,
        nameCache: nameCache,
        ie8: ie8,
        keep_classnames: keep_classnames,
        keep_fnames: keep_fnames,
        safari10: safari10
      }))(options.terserOptions);
      inputSourceMap && (terserOptions.sourceMap = !0);
      const extractedComments = [];
      extractComments && (terserOptions.output.comments = ((options, terserOptions, extractedComments) => {
        const condition = {}, commentsOpts = terserOptions.output.comments;
        return "boolean" == typeof options.extractComments ? (condition.preserve = commentsOpts, 
        condition.extract = /^\**!|@preserve|@license|@cc_on/i) : "string" == typeof options.extractComments || options.extractComments instanceof RegExp || "function" == typeof options.extractComments ? (condition.preserve = commentsOpts, 
        condition.extract = options.extractComments) : Object.prototype.hasOwnProperty.call(options.extractComments, "condition") ? (condition.preserve = commentsOpts, 
        condition.extract = options.extractComments.condition) : (condition.preserve = !1, 
        condition.extract = commentsOpts), [ "preserve", "extract" ].forEach(key => {
          let regexStr, regex;
          switch (typeof condition[key]) {
           case "boolean":
            condition[key] = condition[key] ? () => !0 : () => !1;
            break;

           case "function":
            break;

           case "string":
            if ("all" === condition[key]) {
              condition[key] = () => !0;
              break;
            }
            if ("some" === condition[key]) {
              condition[key] = (astNode, comment) => "comment2" === comment.type && /^\**!|@preserve|@license|@cc_on/i.test(comment.value);
              break;
            }
            regexStr = condition[key], condition[key] = (astNode, comment) => new RegExp(regexStr).test(comment.value);
            break;

           default:
            regex = condition[key], condition[key] = (astNode, comment) => regex.test(comment.value);
          }
        }), (astNode, comment) => {
          if (condition.extract(astNode, comment)) {
            const commentText = "comment2" === comment.type ? `/*${comment.value}*/` : "//" + comment.value;
            extractedComments.includes(commentText) || extractedComments.push(commentText);
          }
          return condition.preserve(astNode, comment);
        };
      })(options, terserOptions, extractedComments));
      const {error: error, map: map, code: code, warnings: warnings} = (0, _terser.minify)({
        [file]: input
      }, terserOptions);
      return {
        error: error,
        map: map,
        code: code,
        warnings: warnings,
        extractedComments: extractedComments
      };
    };
    exports.default = _default;
  },
  3: function(module, exports) {
    module.exports = require("../vendor/terser");
  },
  36: function(module, exports, __webpack_require__) {
    "use strict";
    (function(module) {
      var obj, _minify = (obj = __webpack_require__(2)) && obj.__esModule ? obj : {
        default: obj
      };
      module.exports = (options, callback) => {
        try {
          options = new Function("exports", "require", "__webpack_require__", "module", "__filename", "__dirname", "'use strict'\nreturn " + options)(exports, __webpack_require__(38), __webpack_require__, module, __filename, __dirname), 
          callback(null, (0, _minify.default)(options));
        } catch (errors) {
          callback(errors);
        }
      };
    }).call(this, __webpack_require__(37)(module));
  },
  37: function(module, exports) {
    module.exports = function(module) {
      return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
      module.children || (module.children = []), Object.defineProperty(module, "loaded", {
        enumerable: !0,
        get: function() {
          return module.l;
        }
      }), Object.defineProperty(module, "id", {
        enumerable: !0,
        get: function() {
          return module.i;
        }
      }), module.webpackPolyfill = 1), module;
    };
  },
  38: function(module, exports) {
    module.exports = require;
  }
});