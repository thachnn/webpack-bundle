(() => {
  "use strict";
  var __webpack_modules__ = {
    4321: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(pathOrNode) {
        const node = pathOrNode.node || pathOrNode;
        if ((({leadingComments}) => !!leadingComments && leadingComments.some((comment => /[@#]__PURE__/.test(comment.value))))(node)) return;
        addComment(node, "leading", "#__PURE__");
      };
      var _t = __webpack_require__(8459);
      const {addComment} = _t;
    },
    1822: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.FEATURES = void 0, exports.enableFeature = function(features, feature) {
        return features | feature;
      }, exports.featuresKey = void 0, exports.hasFeature = function(features, feature) {
        return !!(features & feature);
      }, exports.runtimeKey = void 0;
      const FEATURES = Object.freeze({
        unicodeFlag: 1,
        dotAllFlag: 2,
        unicodePropertyEscape: 4,
        namedCaptureGroups: 8,
        unicodeSetsFlag_syntax: 16,
        unicodeSetsFlag: 32
      });
      exports.FEATURES = FEATURES;
      exports.featuresKey = "@babel/plugin-regexp-features/featuresKey";
      exports.runtimeKey = "@babel/plugin-regexp-features/runtimeKey";
    },
    1357: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createRegExpFeaturePlugin = function({name, feature, options = {}, manipulateOptions = () => {}}) {
        return {
          name,
          manipulateOptions,
          pre() {
            var _file$get;
            const {file} = this, features = null != (_file$get = file.get(_features.featuresKey)) ? _file$get : 0;
            let newFeatures = (0, _features.enableFeature)(features, _features.FEATURES[feature]);
            const {useUnicodeFlag, runtime = !0} = options;
            !1 === useUnicodeFlag && (newFeatures = (0, _features.enableFeature)(newFeatures, _features.FEATURES.unicodeFlag)), 
            newFeatures !== features && file.set(_features.featuresKey, newFeatures), runtime || file.set(_features.runtimeKey, !1), 
            (!file.has(versionKey) || file.get(versionKey) < version) && file.set(versionKey, version);
          },
          visitor: {
            RegExpLiteral(path) {
              var _file$get2;
              const {node} = path, {file} = this, features = file.get(_features.featuresKey), runtime = null == (_file$get2 = file.get(_features.runtimeKey)) || _file$get2, regexpuOptions = (0, 
              _util.generateRegexpuOptions)(features);
              if ((0, _util.canSkipRegexpu)(node, regexpuOptions)) return;
              const namedCaptureGroups = {};
              if ("transform" === regexpuOptions.namedGroups && (regexpuOptions.onNamedGroup = (name, index) => {
                namedCaptureGroups[name] = index;
              }), node.pattern = _regexpuCore(node.pattern, node.flags, regexpuOptions), "transform" === regexpuOptions.namedGroups && Object.keys(namedCaptureGroups).length > 0 && runtime && !function(path) {
                return path.parentPath.isMemberExpression({
                  object: path.node,
                  computed: !1
                }) && path.parentPath.get("property").isIdentifier({
                  name: "test"
                });
              }(path)) {
                const call = _core.types.callExpression(this.addHelper("wrapRegExp"), [ node, _core.types.valueToNode(namedCaptureGroups) ]);
                (0, _helperAnnotateAsPure.default)(call), path.replaceWith(call);
              }
              node.flags = (0, _util.transformFlags)(regexpuOptions, node.flags);
            }
          }
        };
      };
      var _regexpuCore = __webpack_require__(3144), _features = __webpack_require__(1822), _util = __webpack_require__(2888), _core = __webpack_require__(4629), _helperAnnotateAsPure = __webpack_require__(4321);
      const version = "7.17.0".split(".").reduce(((v, x) => 1e5 * v + +x), 0), versionKey = "@babel/plugin-regexp-features/version";
    },
    2888: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.canSkipRegexpu = function(node, options) {
        const {flags, pattern} = node;
        if (flags.includes("v") && "transform" === options.unicodeSetsFlag) return !1;
        if (flags.includes("u")) {
          if ("transform" === options.unicodeFlag) return !1;
          if ("transform" === options.unicodePropertyEscapes && /\\[pP]{/.test(pattern)) return !1;
        }
        if (flags.includes("s") && "transform" === options.dotAllFlag) return !1;
        if ("transform" === options.namedGroups && /\(\?<(?![=!])/.test(pattern)) return !1;
        return !0;
      }, exports.generateRegexpuOptions = function(toTransform) {
        const feat = (name, ok = "transform") => !!(0, _features.hasFeature)(toTransform, _features.FEATURES[name]) && ok;
        return {
          unicodeFlag: feat("unicodeFlag"),
          unicodeSetsFlag: feat("unicodeSetsFlag") || feat("unicodeSetsFlag_syntax", "parse"),
          dotAllFlag: feat("dotAllFlag"),
          unicodePropertyEscapes: feat("unicodePropertyEscape"),
          namedGroups: feat("namedCaptureGroups"),
          onNamedGroup: () => {}
        };
      }, exports.transformFlags = function(regexpuOptions, flags) {
        "transform" === regexpuOptions.unicodeSetsFlag && (flags = flags.replace("v", "u"));
        "transform" === regexpuOptions.unicodeFlag && (flags = flags.replace("u", ""));
        "transform" === regexpuOptions.dotAllFlag && (flags = flags.replace("s", ""));
        return flags;
      };
      var _features = __webpack_require__(1822);
    },
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    8459: module => {
      module.exports = require("../lib/types");
    },
    4629: module => {
      module.exports = require("@babel/core");
    },
    3144: module => {
      module.exports = require("regexpu-core");
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
    var _helperCreateRegexpFeaturesPlugin = __webpack_require__(1357), _default = (0, 
    __webpack_require__(3177).declare)((api => (api.assertVersion(7), (0, _helperCreateRegexpFeaturesPlugin.createRegExpFeaturePlugin)({
      name: "transform-dotall-regex",
      feature: "dotAllFlag"
    }))));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();