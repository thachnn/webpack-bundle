(() => {
  "use strict";
  var __webpack_modules__ = {
    401: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.findSuggestion = function(str, arr) {
        const distances = arr.map((el => function(a, b) {
          let i, j, t = [], u = [];
          const m = a.length, n = b.length;
          if (!m) return n;
          if (!n) return m;
          for (j = 0; j <= n; j++) t[j] = j;
          for (i = 1; i <= m; i++) {
            for (u = [ i ], j = 1; j <= n; j++) u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : min(t[j - 1], t[j], u[j - 1]) + 1;
            t = u;
          }
          return u[n];
        }(el, str)));
        return arr[distances.indexOf(min(...distances))];
      };
      const {min} = Math;
    },
    346: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "OptionValidator", {
        enumerable: !0,
        get: function() {
          return _validator.OptionValidator;
        }
      }), Object.defineProperty(exports, "findSuggestion", {
        enumerable: !0,
        get: function() {
          return _findSuggestion.findSuggestion;
        }
      });
      var _validator = __webpack_require__(834), _findSuggestion = __webpack_require__(401);
    },
    834: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.OptionValidator = void 0;
      var _findSuggestion = __webpack_require__(401);
      exports.OptionValidator = class {
        constructor(descriptor) {
          this.descriptor = descriptor;
        }
        validateTopLevelOptions(options, TopLevelOptionShape) {
          const validOptionNames = Object.keys(TopLevelOptionShape);
          for (const option of Object.keys(options)) if (!validOptionNames.includes(option)) throw new Error(this.formatMessage(`'${option}' is not a valid top-level option.\n- Did you mean '${(0, 
          _findSuggestion.findSuggestion)(option, validOptionNames)}'?`));
        }
        validateBooleanOption(name, value, defaultValue) {
          return void 0 === value ? defaultValue : (this.invariant("boolean" == typeof value, `'${name}' option must be a boolean.`), 
          value);
        }
        validateStringOption(name, value, defaultValue) {
          return void 0 === value ? defaultValue : (this.invariant("string" == typeof value, `'${name}' option must be a string.`), 
          value);
        }
        invariant(condition, message) {
          if (!condition) throw new Error(this.formatMessage(message));
        }
        formatMessage(message) {
          return `${this.descriptor}: ${message}`;
        }
      };
    },
    488: module => {
      module.exports = require("./helper-plugin-utils");
    },
    111: module => {
      module.exports = require("../plugins/transform-typescript");
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
    var helperPluginUtils = __webpack_require__(488), transformTypeScript = __webpack_require__(111), helperValidatorOption = __webpack_require__(346);
    function _interopDefaultLegacy(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var transformTypeScript__default = _interopDefaultLegacy(transformTypeScript);
    const v = new helperValidatorOption.OptionValidator("@babel/preset-typescript");
    var index = helperPluginUtils.declare(((api, opts) => {
      api.assertVersion(7);
      const {allExtensions, allowNamespaces, disallowAmbiguousJSXLike, isTSX, jsxPragma, jsxPragmaFrag, onlyRemoveTypeImports, optimizeConstEnums} = function(options = {}) {
        let {allowNamespaces = !0, jsxPragma, onlyRemoveTypeImports} = options;
        const TopLevelOptions_allExtensions = "allExtensions", TopLevelOptions_disallowAmbiguousJSXLike = "disallowAmbiguousJSXLike", TopLevelOptions_isTSX = "isTSX", TopLevelOptions_jsxPragmaFrag = "jsxPragmaFrag", TopLevelOptions_optimizeConstEnums = "optimizeConstEnums", jsxPragmaFrag = v.validateStringOption(TopLevelOptions_jsxPragmaFrag, options.jsxPragmaFrag, "React.Fragment"), allExtensions = v.validateBooleanOption(TopLevelOptions_allExtensions, options.allExtensions, !1), isTSX = v.validateBooleanOption(TopLevelOptions_isTSX, options.isTSX, !1);
        isTSX && v.invariant(allExtensions, "isTSX:true requires allExtensions:true");
        const disallowAmbiguousJSXLike = v.validateBooleanOption(TopLevelOptions_disallowAmbiguousJSXLike, options.disallowAmbiguousJSXLike, !1);
        return disallowAmbiguousJSXLike && v.invariant(allExtensions, "disallowAmbiguousJSXLike:true requires allExtensions:true"), 
        {
          allExtensions,
          allowNamespaces,
          disallowAmbiguousJSXLike,
          isTSX,
          jsxPragma,
          jsxPragmaFrag,
          onlyRemoveTypeImports,
          optimizeConstEnums: v.validateBooleanOption(TopLevelOptions_optimizeConstEnums, options.optimizeConstEnums, !1)
        };
      }(opts), pluginOptions = (isTSX, disallowAmbiguousJSXLike) => ({
        allowDeclareFields: opts.allowDeclareFields,
        allowNamespaces,
        disallowAmbiguousJSXLike,
        isTSX,
        jsxPragma,
        jsxPragmaFrag,
        onlyRemoveTypeImports,
        optimizeConstEnums
      });
      return {
        overrides: allExtensions ? [ {
          plugins: [ [ transformTypeScript__default.default, pluginOptions(isTSX, disallowAmbiguousJSXLike) ] ]
        } ] : [ {
          test: /\.ts$/,
          plugins: [ [ transformTypeScript__default.default, pluginOptions(!1, !1) ] ]
        }, {
          test: /\.mts$/,
          sourceType: "module",
          plugins: [ [ transformTypeScript__default.default, pluginOptions(!1, !0) ] ]
        }, {
          test: /\.cts$/,
          sourceType: "script",
          plugins: [ [ transformTypeScript__default.default, pluginOptions(!1, !0) ] ]
        }, {
          test: /\.tsx$/,
          plugins: [ [ transformTypeScript__default.default, pluginOptions(!0, !1) ] ]
        } ]
      };
    }));
    exports.default = index;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();