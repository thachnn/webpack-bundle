(() => {
  "use strict";
  var __webpack_modules__ = {
    9678: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.getInclusionReasons = function(item, targetVersions, list) {
        const minVersions = list[item] || {};
        return Object.keys(targetVersions).reduce(((result, env) => {
          const minVersion = (0, _utils.getLowestImplementedVersion)(minVersions, env), targetVersion = targetVersions[env];
          if (minVersion) {
            const minIsUnreleased = (0, _utils.isUnreleasedVersion)(minVersion, env);
            (0, _utils.isUnreleasedVersion)(targetVersion, env) || !minIsUnreleased && !_semver.lt(targetVersion.toString(), (0, 
            _utils.semverify)(minVersion)) || (result[env] = (0, _pretty.prettifyVersion)(targetVersion));
          } else result[env] = (0, _pretty.prettifyVersion)(targetVersion);
          return result;
        }), {});
      };
      var _semver = __webpack_require__(5870), _pretty = __webpack_require__(8087), _utils = __webpack_require__(3108);
    },
    9584: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(list, includes, excludes, targets, defaultIncludes, defaultExcludes, pluginSyntaxMap) {
        const result = new Set, options = {
          compatData: list,
          includes,
          excludes
        };
        for (const item in list) if (isRequired(item, targets, options)) result.add(item); else if (pluginSyntaxMap) {
          const shippedProposalsSyntax = pluginSyntaxMap.get(item);
          shippedProposalsSyntax && result.add(shippedProposalsSyntax);
        }
        defaultIncludes && defaultIncludes.forEach((item => !excludes.has(item) && result.add(item)));
        defaultExcludes && defaultExcludes.forEach((item => !includes.has(item) && result.delete(item)));
        return result;
      }, exports.isRequired = isRequired, exports.targetsSupported = targetsSupported;
      var _semver = __webpack_require__(5870), _plugins = __webpack_require__(7867), _utils = __webpack_require__(3108);
      function targetsSupported(target, support) {
        const targetEnvironments = Object.keys(target);
        if (0 === targetEnvironments.length) return !1;
        return 0 === targetEnvironments.filter((environment => {
          const lowestImplementedVersion = (0, _utils.getLowestImplementedVersion)(support, environment);
          if (!lowestImplementedVersion) return !0;
          const lowestTargetedVersion = target[environment];
          if ((0, _utils.isUnreleasedVersion)(lowestTargetedVersion, environment)) return !1;
          if ((0, _utils.isUnreleasedVersion)(lowestImplementedVersion, environment)) return !0;
          if (!_semver.valid(lowestTargetedVersion.toString())) throw new Error(`Invalid version passed for target "${environment}": "${lowestTargetedVersion}". Versions must be in semver format (major.minor.patch)`);
          return _semver.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion.toString());
        })).length;
      }
      function isRequired(name, targets, {compatData = _plugins, includes, excludes} = {}) {
        return (null == excludes || !excludes.has(name)) && (!(null == includes || !includes.has(name)) || !targetsSupported(targets, compatData[name]));
      }
    },
    4077: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "TargetNames", {
        enumerable: !0,
        get: function() {
          return _options.TargetNames;
        }
      }), exports.default = function(inputTargets = {}, options = {}) {
        var _browsers, _browsers2;
        let {browsers, esmodules} = inputTargets;
        const {configPath = "."} = options;
        !function(browsers) {
          v.invariant(void 0 === browsers || isBrowsersQueryValid(browsers), `'${String(browsers)}' is not a valid browserslist query`);
        }(browsers);
        let targets = function(targets) {
          const validTargets = Object.keys(_options.TargetNames);
          for (const target of Object.keys(targets)) if (!(target in _options.TargetNames)) throw new Error(v.formatMessage(`'${target}' is not a valid target\n- Did you mean '${(0, 
          _helperValidatorOption.findSuggestion)(target, validTargets)}'?`));
          return targets;
        }(function(inputTargets) {
          const input = Object.assign({}, inputTargets);
          return delete input.esmodules, delete input.browsers, input;
        }(inputTargets));
        const hasTargets = !!browsers || Object.keys(targets).length > 0, shouldSearchForConfig = !options.ignoreBrowserslistConfig && !hasTargets;
        !browsers && shouldSearchForConfig && (browsers = _browserslist.loadConfig({
          config: options.configFile,
          path: configPath,
          env: options.browserslistEnv
        }), null == browsers && (browsers = []));
        !esmodules || "intersect" === esmodules && null != (_browsers = browsers) && _browsers.length || (browsers = Object.keys(ESM_SUPPORT).map((browser => `${browser} >= ${ESM_SUPPORT[browser]}`)).join(", "), 
        esmodules = !1);
        if (null != (_browsers2 = browsers) && _browsers2.length) {
          const queryBrowsers = (queries = browsers, env = options.browserslistEnv, function(browsers) {
            return browsers.reduce(((all, browser) => {
              const [browserName, browserVersion] = browser.split(" "), normalizedBrowserName = _targets.browserNameMap[browserName];
              if (!normalizedBrowserName) return all;
              try {
                const splitVersion = browserVersion.split("-")[0].toLowerCase(), isSplitUnreleased = (0, 
                _utils.isUnreleasedVersion)(splitVersion, browserName);
                if (!all[normalizedBrowserName]) return all[normalizedBrowserName] = isSplitUnreleased ? splitVersion : (0, 
                _utils.semverify)(splitVersion), all;
                const version = all[normalizedBrowserName], isUnreleased = (0, _utils.isUnreleasedVersion)(version, browserName);
                if (isUnreleased && isSplitUnreleased) all[normalizedBrowserName] = (0, _utils.getLowestUnreleased)(version, splitVersion, browserName); else if (isUnreleased) all[normalizedBrowserName] = (0, 
                _utils.semverify)(splitVersion); else if (!isUnreleased && !isSplitUnreleased) {
                  const parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
                  all[normalizedBrowserName] = (0, _utils.semverMin)(version, parsedBrowserVersion);
                }
              } catch (e) {}
              return all;
            }), {});
          }(_browserslist(queries, {
            mobileToDesktop: !0,
            env
          })));
          if ("intersect" === esmodules) for (const browser of Object.keys(queryBrowsers)) {
            const version = queryBrowsers[browser];
            ESM_SUPPORT[browser] ? queryBrowsers[browser] = (0, _utils.getHighestUnreleased)(version, (0, 
            _utils.semverify)(ESM_SUPPORT[browser]), browser) : delete queryBrowsers[browser];
          }
          targets = Object.assign(queryBrowsers, targets);
        }
        var queries, env;
        const result = {}, decimalWarnings = [];
        for (const target of Object.keys(targets).sort()) {
          var _targetParserMap$targ;
          const value = targets[target];
          "number" == typeof value && value % 1 != 0 && decimalWarnings.push({
            target,
            value
          });
          const parser = null != (_targetParserMap$targ = targetParserMap[target]) ? _targetParserMap$targ : targetParserMap.__default, [parsedTarget, parsedValue] = parser(target, value);
          parsedValue && (result[parsedTarget] = parsedValue);
        }
        return function(decimalTargets) {
          if (!decimalTargets.length) return;
          console.warn("Warning, the following targets are using a decimal version:\n"), decimalTargets.forEach((({target, value}) => console.warn(`  ${target}: ${value}`))), 
          console.warn("\nWe recommend using a string for minor/patch versions to avoid numbers like 6.10\ngetting parsed as 6.1, which can lead to unexpected behavior.\n");
        }(decimalWarnings), result;
      }, Object.defineProperty(exports, "filterItems", {
        enumerable: !0,
        get: function() {
          return _filterItems.default;
        }
      }), Object.defineProperty(exports, "getInclusionReasons", {
        enumerable: !0,
        get: function() {
          return _debug.getInclusionReasons;
        }
      }), exports.isBrowsersQueryValid = isBrowsersQueryValid, Object.defineProperty(exports, "isRequired", {
        enumerable: !0,
        get: function() {
          return _filterItems.isRequired;
        }
      }), Object.defineProperty(exports, "prettifyTargets", {
        enumerable: !0,
        get: function() {
          return _pretty.prettifyTargets;
        }
      }), Object.defineProperty(exports, "unreleasedLabels", {
        enumerable: !0,
        get: function() {
          return _targets.unreleasedLabels;
        }
      });
      var _browserslist = __webpack_require__(9712), _helperValidatorOption = __webpack_require__(4346), _nativeModules = __webpack_require__(8392), _utils = __webpack_require__(3108), _targets = __webpack_require__(2950), _options = __webpack_require__(8910), _pretty = __webpack_require__(8087), _debug = __webpack_require__(9678), _filterItems = __webpack_require__(9584);
      const ESM_SUPPORT = _nativeModules["es6.module"], v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");
      function isBrowsersQueryValid(browsers) {
        return "string" == typeof browsers || Array.isArray(browsers) && browsers.every((b => "string" == typeof b));
      }
      function semverifyTarget(target, value) {
        try {
          return (0, _utils.semverify)(value);
        } catch (error) {
          throw new Error(v.formatMessage(`'${value}' is not a valid value for 'targets.${target}'.`));
        }
      }
      const targetParserMap = {
        __default: (target, value) => [ target, (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : semverifyTarget(target, value) ],
        node: (target, value) => [ target, !0 === value || "current" === value ? process.versions.node : semverifyTarget(target, value) ]
      };
    },
    8910: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.TargetNames = void 0;
      exports.TargetNames = {
        node: "node",
        chrome: "chrome",
        opera: "opera",
        edge: "edge",
        firefox: "firefox",
        safari: "safari",
        ie: "ie",
        ios: "ios",
        android: "android",
        electron: "electron",
        samsung: "samsung",
        rhino: "rhino"
      };
    },
    8087: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.prettifyTargets = function(targets) {
        return Object.keys(targets).reduce(((results, target) => {
          let value = targets[target];
          const unreleasedLabel = _targets.unreleasedLabels[target];
          return "string" == typeof value && unreleasedLabel !== value && (value = prettifyVersion(value)), 
          results[target] = value, results;
        }), {});
      }, exports.prettifyVersion = prettifyVersion;
      var _semver = __webpack_require__(5870), _targets = __webpack_require__(2950);
      function prettifyVersion(version) {
        if ("string" != typeof version) return version;
        const parts = [ _semver.major(version) ], minor = _semver.minor(version), patch = _semver.patch(version);
        return (minor || patch) && parts.push(minor), patch && parts.push(patch), parts.join(".");
      }
    },
    2950: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.unreleasedLabels = exports.browserNameMap = void 0;
      exports.unreleasedLabels = {
        safari: "tp"
      };
      exports.browserNameMap = {
        and_chr: "chrome",
        and_ff: "firefox",
        android: "android",
        chrome: "chrome",
        edge: "edge",
        firefox: "firefox",
        ie: "ie",
        ie_mob: "ie",
        ios_saf: "ios",
        node: "node",
        op_mob: "opera",
        opera: "opera",
        safari: "safari",
        samsung: "samsung"
      };
    },
    3108: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.getHighestUnreleased = function(a, b, env) {
        return getLowestUnreleased(a, b, env) === a ? b : a;
      }, exports.getLowestImplementedVersion = function(plugin, environment) {
        const result = plugin[environment];
        if (!result && "android" === environment) return plugin.chrome;
        return result;
      }, exports.getLowestUnreleased = getLowestUnreleased, exports.isUnreleasedVersion = function(version, env) {
        const unreleasedLabel = _targets.unreleasedLabels[env];
        return !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
      }, exports.semverMin = semverMin, exports.semverify = function(version) {
        if ("string" == typeof version && _semver.valid(version)) return version;
        v.invariant("number" == typeof version || "string" == typeof version && versionRegExp.test(version), `'${version}' is not a valid version`);
        const split = version.toString().split(".");
        for (;split.length < 3; ) split.push("0");
        return split.join(".");
      };
      var _semver = __webpack_require__(5870), _helperValidatorOption = __webpack_require__(4346), _targets = __webpack_require__(2950);
      const versionRegExp = /^(\d+|\d+.\d+)$/, v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");
      function semverMin(first, second) {
        return first && _semver.lt(first, second) ? first : second;
      }
      function getLowestUnreleased(a, b, env) {
        const unreleasedLabel = _targets.unreleasedLabels[env], hasUnreleased = [ a, b ].some((item => item === unreleasedLabel));
        return hasUnreleased ? a === hasUnreleased ? b : a || b : semverMin(a, b);
      }
    },
    4401: (__unused_webpack_module, exports) => {
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
    4346: (__unused_webpack_module, exports, __webpack_require__) => {
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
      var _validator = __webpack_require__(6834), _findSuggestion = __webpack_require__(4401);
    },
    6834: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.OptionValidator = void 0;
      var _findSuggestion = __webpack_require__(4401);
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
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    1976: module => {
      module.exports = require("./syntax-object-rest-spread");
    },
    3729: module => {
      module.exports = require("./transform-parameters");
    },
    4629: module => {
      module.exports = require("@babel/core");
    },
    9712: module => {
      module.exports = require("../lib/browserslist");
    },
    5870: module => {
      module.exports = require("../lib/semver");
    },
    8392: module => {
      module.exports = JSON.parse('{"es6.module":{"chrome":"61","and_chr":"61","edge":"16","firefox":"60","and_ff":"60","node":"13.2.0","opera":"48","op_mob":"48","safari":"10.1","ios":"10.3","samsung":"8.2","android":"61","electron":"2.0","ios_saf":"10.3"}}');
    },
    7867: module => {
      module.exports = JSON.parse('{"proposal-class-static-block":{"chrome":"94","opera":"80","edge":"94","firefox":"93","node":"16.11","electron":"15.0"},"proposal-private-property-in-object":{"chrome":"91","opera":"77","edge":"91","firefox":"90","safari":"15","node":"16.9","ios":"15","electron":"13.0"},"proposal-class-properties":{"chrome":"74","opera":"62","edge":"79","firefox":"90","safari":"14.1","node":"12","ios":"15","samsung":"11","electron":"6.0"},"proposal-private-methods":{"chrome":"84","opera":"70","edge":"84","firefox":"90","safari":"15","node":"14.6","ios":"15","samsung":"14","electron":"10.0"},"proposal-numeric-separator":{"chrome":"75","opera":"62","edge":"79","firefox":"70","safari":"13","node":"12.5","ios":"13","samsung":"11","rhino":"1.7.14","electron":"6.0"},"proposal-logical-assignment-operators":{"chrome":"85","opera":"71","edge":"85","firefox":"79","safari":"14","node":"15","ios":"14","samsung":"14","electron":"10.0"},"proposal-nullish-coalescing-operator":{"chrome":"80","opera":"67","edge":"80","firefox":"72","safari":"13.1","node":"14","ios":"13.4","samsung":"13","electron":"8.0"},"proposal-optional-chaining":{"chrome":"91","opera":"77","edge":"91","firefox":"74","safari":"13.1","node":"16.9","ios":"13.4","electron":"13.0"},"proposal-json-strings":{"chrome":"66","opera":"53","edge":"79","firefox":"62","safari":"12","node":"10","ios":"12","samsung":"9","rhino":"1.7.14","electron":"3.0"},"proposal-optional-catch-binding":{"chrome":"66","opera":"53","edge":"79","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"53","node":"6","samsung":"5","electron":"0.37"},"proposal-async-generator-functions":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3.0"},"proposal-object-rest-spread":{"chrome":"60","opera":"47","edge":"79","firefox":"55","safari":"11.1","node":"8.3","ios":"11.3","samsung":"8","electron":"2.0"},"transform-dotall-regex":{"chrome":"62","opera":"49","edge":"79","firefox":"78","safari":"11.1","node":"8.10","ios":"11.3","samsung":"8","electron":"3.0"},"proposal-unicode-property-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-named-capturing-groups-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"transform-exponentiation-operator":{"chrome":"52","opera":"39","edge":"14","firefox":"52","safari":"10.1","node":"7","ios":"10.3","samsung":"6","rhino":"1.7.14","electron":"1.3"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","electron":"0.21"},"transform-literals":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-arrow-functions":{"chrome":"47","opera":"34","edge":"13","firefox":"43","safari":"10","node":"6","ios":"10","samsung":"5","rhino":"1.7.13","electron":"0.36"},"transform-block-scoped-functions":{"chrome":"41","opera":"28","edge":"12","firefox":"46","safari":"10","node":"4","ie":"11","ios":"10","samsung":"3.4","electron":"0.21"},"transform-classes":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-object-super":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-shorthand-properties":{"chrome":"43","opera":"30","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.14","electron":"0.27"},"transform-duplicate-keys":{"chrome":"42","opera":"29","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.25"},"transform-computed-properties":{"chrome":"44","opera":"31","edge":"12","firefox":"34","safari":"7.1","node":"4","ios":"8","samsung":"4","electron":"0.30"},"transform-for-of":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-sticky-regex":{"chrome":"49","opera":"36","edge":"13","firefox":"3","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-unicode-escapes":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-unicode-regex":{"chrome":"50","opera":"37","edge":"13","firefox":"46","safari":"12","node":"6","ios":"12","samsung":"5","electron":"1.1"},"transform-spread":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-destructuring":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"11","node":"6","ios":"11","samsung":"5","electron":"0.37"},"transform-typeof-symbol":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"transform-new-target":{"chrome":"46","opera":"33","edge":"14","firefox":"41","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-regenerator":{"chrome":"50","opera":"37","edge":"13","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"transform-member-expression-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-property-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-reserved-words":{"chrome":"13","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4.4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"proposal-export-namespace-from":{"chrome":"72","and_chr":"72","edge":"79","firefox":"80","and_ff":"80","node":"13.2","opera":"60","op_mob":"51","samsung":"11.0","android":"72","electron":"5.0"}}');
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
    var helperPluginUtils = __webpack_require__(5488), syntaxObjectRestSpread = __webpack_require__(1976), core = __webpack_require__(4629), pluginTransformParameters = __webpack_require__(3729), helperCompilationTargets = __webpack_require__(4077);
    function _interopDefaultLegacy(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var syntaxObjectRestSpread__default = _interopDefaultLegacy(syntaxObjectRestSpread), corejs2BuiltIns = {
      "es6.array.copy-within": {
        chrome: "45",
        opera: "32",
        edge: "12",
        firefox: "32",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "5",
        rhino: "1.7.13",
        electron: "0.31"
      },
      "es6.array.every": {
        chrome: "5",
        opera: "10.10",
        edge: "12",
        firefox: "2",
        safari: "3.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.fill": {
        chrome: "45",
        opera: "32",
        edge: "12",
        firefox: "31",
        safari: "7.1",
        node: "4",
        ios: "8",
        samsung: "5",
        rhino: "1.7.13",
        electron: "0.31"
      },
      "es6.array.filter": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.array.find": {
        chrome: "45",
        opera: "32",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "4",
        ios: "8",
        samsung: "5",
        rhino: "1.7.13",
        electron: "0.31"
      },
      "es6.array.find-index": {
        chrome: "45",
        opera: "32",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "4",
        ios: "8",
        samsung: "5",
        rhino: "1.7.13",
        electron: "0.31"
      },
      "es7.array.flat-map": {
        chrome: "69",
        opera: "56",
        edge: "79",
        firefox: "62",
        safari: "12",
        node: "11",
        ios: "12",
        samsung: "10",
        electron: "4.0"
      },
      "es6.array.for-each": {
        chrome: "5",
        opera: "10.10",
        edge: "12",
        firefox: "2",
        safari: "3.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.from": {
        chrome: "51",
        opera: "38",
        edge: "15",
        firefox: "36",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es7.array.includes": {
        chrome: "47",
        opera: "34",
        edge: "14",
        firefox: "43",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.36"
      },
      "es6.array.index-of": {
        chrome: "5",
        opera: "10.10",
        edge: "12",
        firefox: "2",
        safari: "3.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.is-array": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "4",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.iterator": {
        chrome: "66",
        opera: "53",
        edge: "12",
        firefox: "60",
        safari: "9",
        node: "10",
        ios: "9",
        samsung: "9",
        rhino: "1.7.13",
        electron: "3.0"
      },
      "es6.array.last-index-of": {
        chrome: "5",
        opera: "10.10",
        edge: "12",
        firefox: "2",
        safari: "3.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.map": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.array.of": {
        chrome: "45",
        opera: "32",
        edge: "12",
        firefox: "25",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "5",
        rhino: "1.7.13",
        electron: "0.31"
      },
      "es6.array.reduce": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "3",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.reduce-right": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "3",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.slice": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.array.some": {
        chrome: "5",
        opera: "10.10",
        edge: "12",
        firefox: "2",
        safari: "3.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.array.sort": {
        chrome: "63",
        opera: "50",
        edge: "12",
        firefox: "5",
        safari: "12",
        node: "10",
        ie: "9",
        ios: "12",
        samsung: "8",
        rhino: "1.7.13",
        electron: "3.0"
      },
      "es6.array.species": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.date.now": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "2",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.date.to-iso-string": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "3.5",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.date.to-json": {
        chrome: "5",
        opera: "12.10",
        edge: "12",
        firefox: "4",
        safari: "10",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "10",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.date.to-primitive": {
        chrome: "47",
        opera: "34",
        edge: "15",
        firefox: "44",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.36"
      },
      "es6.date.to-string": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "2",
        safari: "3.1",
        node: "0.10",
        ie: "10",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.function.bind": {
        chrome: "7",
        opera: "12",
        edge: "12",
        firefox: "4",
        safari: "5.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.function.has-instance": {
        chrome: "51",
        opera: "38",
        edge: "15",
        firefox: "50",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.function.name": {
        chrome: "5",
        opera: "10.50",
        edge: "14",
        firefox: "2",
        safari: "4",
        node: "0.10",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.map": {
        chrome: "51",
        opera: "38",
        edge: "15",
        firefox: "53",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.math.acosh": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.asinh": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.atanh": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.cbrt": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.clz32": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "31",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.cosh": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.expm1": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.fround": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "26",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.hypot": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "27",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.imul": {
        chrome: "30",
        opera: "17",
        edge: "12",
        firefox: "23",
        safari: "7",
        node: "0.12",
        android: "4.4",
        ios: "7",
        samsung: "2",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.log1p": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.log10": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.log2": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.sign": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.sinh": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.tanh": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.math.trunc": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "25",
        safari: "7.1",
        node: "0.12",
        ios: "8",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.constructor": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "36",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.number.epsilon": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "25",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.number.is-finite": {
        chrome: "19",
        opera: "15",
        edge: "12",
        firefox: "16",
        safari: "9",
        node: "0.12",
        android: "4.1",
        ios: "9",
        samsung: "1.5",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.is-integer": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "16",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.is-nan": {
        chrome: "19",
        opera: "15",
        edge: "12",
        firefox: "15",
        safari: "9",
        node: "0.12",
        android: "4.1",
        ios: "9",
        samsung: "1.5",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.is-safe-integer": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "32",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.max-safe-integer": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "31",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.min-safe-integer": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "31",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.number.parse-float": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "25",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.number.parse-int": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "25",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "2",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.object.assign": {
        chrome: "49",
        opera: "36",
        edge: "13",
        firefox: "36",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.object.create": {
        chrome: "5",
        opera: "12",
        edge: "12",
        firefox: "4",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es7.object.define-getter": {
        chrome: "62",
        opera: "49",
        edge: "16",
        firefox: "48",
        safari: "9",
        node: "8.10",
        ios: "9",
        samsung: "8",
        electron: "3.0"
      },
      "es7.object.define-setter": {
        chrome: "62",
        opera: "49",
        edge: "16",
        firefox: "48",
        safari: "9",
        node: "8.10",
        ios: "9",
        samsung: "8",
        electron: "3.0"
      },
      "es6.object.define-property": {
        chrome: "5",
        opera: "12",
        edge: "12",
        firefox: "4",
        safari: "5.1",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.object.define-properties": {
        chrome: "5",
        opera: "12",
        edge: "12",
        firefox: "4",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es7.object.entries": {
        chrome: "54",
        opera: "41",
        edge: "14",
        firefox: "47",
        safari: "10.1",
        node: "7",
        ios: "10.3",
        samsung: "6",
        rhino: "1.7.14",
        electron: "1.4"
      },
      "es6.object.freeze": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es6.object.get-own-property-descriptor": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es7.object.get-own-property-descriptors": {
        chrome: "54",
        opera: "41",
        edge: "15",
        firefox: "50",
        safari: "10.1",
        node: "7",
        ios: "10.3",
        samsung: "6",
        electron: "1.4"
      },
      "es6.object.get-own-property-names": {
        chrome: "40",
        opera: "27",
        edge: "12",
        firefox: "33",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.object.get-prototype-of": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es7.object.lookup-getter": {
        chrome: "62",
        opera: "49",
        edge: "79",
        firefox: "36",
        safari: "9",
        node: "8.10",
        ios: "9",
        samsung: "8",
        electron: "3.0"
      },
      "es7.object.lookup-setter": {
        chrome: "62",
        opera: "49",
        edge: "79",
        firefox: "36",
        safari: "9",
        node: "8.10",
        ios: "9",
        samsung: "8",
        electron: "3.0"
      },
      "es6.object.prevent-extensions": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es6.object.to-string": {
        chrome: "57",
        opera: "44",
        edge: "15",
        firefox: "51",
        safari: "10",
        node: "8",
        ios: "10",
        samsung: "7",
        electron: "1.7"
      },
      "es6.object.is": {
        chrome: "19",
        opera: "15",
        edge: "12",
        firefox: "22",
        safari: "9",
        node: "0.12",
        android: "4.1",
        ios: "9",
        samsung: "1.5",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.object.is-frozen": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es6.object.is-sealed": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es6.object.is-extensible": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es6.object.keys": {
        chrome: "40",
        opera: "27",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.object.seal": {
        chrome: "44",
        opera: "31",
        edge: "12",
        firefox: "35",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "4",
        rhino: "1.7.13",
        electron: "0.30"
      },
      "es6.object.set-prototype-of": {
        chrome: "34",
        opera: "21",
        edge: "12",
        firefox: "31",
        safari: "9",
        node: "0.12",
        ie: "11",
        ios: "9",
        samsung: "2",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es7.object.values": {
        chrome: "54",
        opera: "41",
        edge: "14",
        firefox: "47",
        safari: "10.1",
        node: "7",
        ios: "10.3",
        samsung: "6",
        rhino: "1.7.14",
        electron: "1.4"
      },
      "es6.promise": {
        chrome: "51",
        opera: "38",
        edge: "14",
        firefox: "45",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es7.promise.finally": {
        chrome: "63",
        opera: "50",
        edge: "18",
        firefox: "58",
        safari: "11.1",
        node: "10",
        ios: "11.3",
        samsung: "8",
        electron: "3.0"
      },
      "es6.reflect.apply": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.construct": {
        chrome: "49",
        opera: "36",
        edge: "13",
        firefox: "49",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.define-property": {
        chrome: "49",
        opera: "36",
        edge: "13",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.delete-property": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.get": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.get-own-property-descriptor": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.get-prototype-of": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.has": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.is-extensible": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.own-keys": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.prevent-extensions": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.set": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.reflect.set-prototype-of": {
        chrome: "49",
        opera: "36",
        edge: "12",
        firefox: "42",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "0.37"
      },
      "es6.regexp.constructor": {
        chrome: "50",
        opera: "37",
        edge: "79",
        firefox: "40",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "1.1"
      },
      "es6.regexp.flags": {
        chrome: "49",
        opera: "36",
        edge: "79",
        firefox: "37",
        safari: "9",
        node: "6",
        ios: "9",
        samsung: "5",
        electron: "0.37"
      },
      "es6.regexp.match": {
        chrome: "50",
        opera: "37",
        edge: "79",
        firefox: "49",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        rhino: "1.7.13",
        electron: "1.1"
      },
      "es6.regexp.replace": {
        chrome: "50",
        opera: "37",
        edge: "79",
        firefox: "49",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "1.1"
      },
      "es6.regexp.split": {
        chrome: "50",
        opera: "37",
        edge: "79",
        firefox: "49",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "1.1"
      },
      "es6.regexp.search": {
        chrome: "50",
        opera: "37",
        edge: "79",
        firefox: "49",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        rhino: "1.7.13",
        electron: "1.1"
      },
      "es6.regexp.to-string": {
        chrome: "50",
        opera: "37",
        edge: "79",
        firefox: "39",
        safari: "10",
        node: "6",
        ios: "10",
        samsung: "5",
        electron: "1.1"
      },
      "es6.set": {
        chrome: "51",
        opera: "38",
        edge: "15",
        firefox: "53",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.symbol": {
        chrome: "51",
        opera: "38",
        edge: "79",
        firefox: "51",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es7.symbol.async-iterator": {
        chrome: "63",
        opera: "50",
        edge: "79",
        firefox: "57",
        safari: "12",
        node: "10",
        ios: "12",
        samsung: "8",
        electron: "3.0"
      },
      "es6.string.anchor": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.big": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.blink": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.bold": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.code-point-at": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "29",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.string.ends-with": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "29",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.string.fixed": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.fontcolor": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.fontsize": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.from-code-point": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "29",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.string.includes": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "40",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.string.italics": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.iterator": {
        chrome: "38",
        opera: "25",
        edge: "12",
        firefox: "36",
        safari: "9",
        node: "0.12",
        ios: "9",
        samsung: "3",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.string.link": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es7.string.pad-start": {
        chrome: "57",
        opera: "44",
        edge: "15",
        firefox: "48",
        safari: "10",
        node: "8",
        ios: "10",
        samsung: "7",
        rhino: "1.7.13",
        electron: "1.7"
      },
      "es7.string.pad-end": {
        chrome: "57",
        opera: "44",
        edge: "15",
        firefox: "48",
        safari: "10",
        node: "8",
        ios: "10",
        samsung: "7",
        rhino: "1.7.13",
        electron: "1.7"
      },
      "es6.string.raw": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "34",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.14",
        electron: "0.21"
      },
      "es6.string.repeat": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "24",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.string.small": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.starts-with": {
        chrome: "41",
        opera: "28",
        edge: "12",
        firefox: "29",
        safari: "9",
        node: "4",
        ios: "9",
        samsung: "3.4",
        rhino: "1.7.13",
        electron: "0.21"
      },
      "es6.string.strike": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.sub": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.sup": {
        chrome: "5",
        opera: "15",
        edge: "12",
        firefox: "17",
        safari: "6",
        node: "0.10",
        android: "4",
        ios: "7",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.14",
        electron: "0.20"
      },
      "es6.string.trim": {
        chrome: "5",
        opera: "10.50",
        edge: "12",
        firefox: "3.5",
        safari: "4",
        node: "0.10",
        ie: "9",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es7.string.trim-left": {
        chrome: "66",
        opera: "53",
        edge: "79",
        firefox: "61",
        safari: "12",
        node: "10",
        ios: "12",
        samsung: "9",
        rhino: "1.7.13",
        electron: "3.0"
      },
      "es7.string.trim-right": {
        chrome: "66",
        opera: "53",
        edge: "79",
        firefox: "61",
        safari: "12",
        node: "10",
        ios: "12",
        samsung: "9",
        rhino: "1.7.13",
        electron: "3.0"
      },
      "es6.typed.array-buffer": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.data-view": {
        chrome: "5",
        opera: "12",
        edge: "12",
        firefox: "15",
        safari: "5.1",
        node: "0.10",
        ie: "10",
        android: "4",
        ios: "6",
        phantom: "2",
        samsung: "1",
        rhino: "1.7.13",
        electron: "0.20"
      },
      "es6.typed.int8-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.uint8-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.uint8-clamped-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.int16-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.uint16-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.int32-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.uint32-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.float32-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.typed.float64-array": {
        chrome: "51",
        opera: "38",
        edge: "13",
        firefox: "48",
        safari: "10",
        node: "6.5",
        ios: "10",
        samsung: "5",
        electron: "1.2"
      },
      "es6.weak-map": {
        chrome: "51",
        opera: "38",
        edge: "15",
        firefox: "53",
        safari: "9",
        node: "6.5",
        ios: "9",
        samsung: "5",
        electron: "1.2"
      },
      "es6.weak-set": {
        chrome: "51",
        opera: "38",
        edge: "15",
        firefox: "53",
        safari: "9",
        node: "6.5",
        ios: "9",
        samsung: "5",
        electron: "1.2"
      }
    };
    const {isObjectProperty: isObjectProperty$1, isArrayPattern, isObjectPattern, isAssignmentPattern: isAssignmentPattern$1, isRestElement, isIdentifier} = core.types;
    function shouldStoreRHSInTemporaryVariable(node) {
      if (isArrayPattern(node)) {
        const nonNullElements = node.elements.filter((element => null !== element));
        return nonNullElements.length > 1 || shouldStoreRHSInTemporaryVariable(nonNullElements[0]);
      }
      if (isObjectPattern(node)) {
        const {properties} = node;
        if (properties.length > 1) return !0;
        if (0 === properties.length) return !1;
        {
          const firstProperty = properties[0];
          return isObjectProperty$1(firstProperty) ? shouldStoreRHSInTemporaryVariable(firstProperty.value) : shouldStoreRHSInTemporaryVariable(firstProperty);
        }
      }
      return isAssignmentPattern$1(node) ? shouldStoreRHSInTemporaryVariable(node.left) : !!isRestElement(node) && (!!isIdentifier(node.argument) || shouldStoreRHSInTemporaryVariable(node.argument));
    }
    const {isAssignmentPattern, isObjectProperty} = core.types;
    {
      const node = core.types.identifier("a"), property = core.types.objectProperty(core.types.identifier("key"), node), pattern = core.types.objectPattern([ property ]);
      var ZERO_REFS = core.types.isReferenced(node, property, pattern) ? 1 : 0;
    }
    var index = helperPluginUtils.declare(((api, opts) => {
      var _api$assumption, _api$assumption2, _api$assumption3, _api$assumption4;
      api.assertVersion(7);
      const targets = api.targets(), supportsObjectAssign = !helperCompilationTargets.isRequired("es6.object.assign", targets, {
        compatData: corejs2BuiltIns
      }), {useBuiltIns = supportsObjectAssign, loose = !1} = opts;
      if ("boolean" != typeof loose) throw new Error(".loose must be a boolean, or undefined");
      const ignoreFunctionLength = null != (_api$assumption = api.assumption("ignoreFunctionLength")) ? _api$assumption : loose, objectRestNoSymbols = null != (_api$assumption2 = api.assumption("objectRestNoSymbols")) ? _api$assumption2 : loose, pureGetters = null != (_api$assumption3 = api.assumption("pureGetters")) ? _api$assumption3 : loose, setSpreadProperties = null != (_api$assumption4 = api.assumption("setSpreadProperties")) ? _api$assumption4 : loose;
      function getExtendsHelper(file) {
        return useBuiltIns ? core.types.memberExpression(core.types.identifier("Object"), core.types.identifier("assign")) : file.addHelper("extends");
      }
      function hasRestElement(path) {
        let foundRestElement = !1;
        return visitRestElements(path, (restElement => {
          foundRestElement = !0, restElement.stop();
        })), foundRestElement;
      }
      function hasObjectPatternRestElement(path) {
        let foundRestElement = !1;
        return visitRestElements(path, (restElement => {
          restElement.parentPath.isObjectPattern() && (foundRestElement = !0, restElement.stop());
        })), foundRestElement;
      }
      function visitRestElements(path, visitor) {
        path.traverse({
          Expression(path) {
            const {parent, key} = path;
            (isAssignmentPattern(parent) && "right" === key || isObjectProperty(parent) && parent.computed && "key" === key) && path.skip();
          },
          RestElement: visitor
        });
      }
      function replaceImpureComputedKeys(properties, scope) {
        const impureComputedPropertyDeclarators = [];
        for (const propPath of properties) {
          const key = propPath.get("key");
          if (propPath.node.computed && !key.isPure()) {
            const name = scope.generateUidBasedOnNode(key.node), declarator = core.types.variableDeclarator(core.types.identifier(name), key.node);
            impureComputedPropertyDeclarators.push(declarator), key.replaceWith(core.types.identifier(name));
          }
        }
        return impureComputedPropertyDeclarators;
      }
      function createObjectRest(path, file, objRef) {
        const props = path.get("properties"), last = props[props.length - 1];
        core.types.assertRestElement(last.node);
        const restElement = core.types.cloneNode(last.node);
        last.remove();
        const impureComputedPropertyDeclarators = replaceImpureComputedKeys(path.get("properties"), path.scope), {keys, allLiteral, hasTemplateLiteral} = function(node) {
          const props = node.properties, keys = [];
          let allLiteral = !0, hasTemplateLiteral = !1;
          for (const prop of props) core.types.isIdentifier(prop.key) && !prop.computed ? keys.push(core.types.stringLiteral(prop.key.name)) : core.types.isTemplateLiteral(prop.key) ? (keys.push(core.types.cloneNode(prop.key)), 
          hasTemplateLiteral = !0) : core.types.isLiteral(prop.key) ? keys.push(core.types.stringLiteral(String(prop.key.value))) : (keys.push(core.types.cloneNode(prop.key)), 
          allLiteral = !1);
          return {
            keys,
            allLiteral,
            hasTemplateLiteral
          };
        }(path.node);
        if (0 === keys.length) return [ impureComputedPropertyDeclarators, restElement.argument, core.types.callExpression(getExtendsHelper(file), [ core.types.objectExpression([]), core.types.cloneNode(objRef) ]) ];
        let keyExpression;
        if (allLiteral) {
          if (keyExpression = core.types.arrayExpression(keys), !hasTemplateLiteral && !core.types.isProgram(path.scope.block)) {
            const program = path.findParent((path => path.isProgram())), id = path.scope.generateUidIdentifier("excluded");
            program.scope.push({
              id,
              init: keyExpression,
              kind: "const"
            }), keyExpression = core.types.cloneNode(id);
          }
        } else keyExpression = core.types.callExpression(core.types.memberExpression(core.types.arrayExpression(keys), core.types.identifier("map")), [ file.addHelper("toPropertyKey") ]);
        return [ impureComputedPropertyDeclarators, restElement.argument, core.types.callExpression(file.addHelper("objectWithoutProperties" + (objectRestNoSymbols ? "Loose" : "")), [ core.types.cloneNode(objRef), keyExpression ]) ];
      }
      function replaceRestElement(parentPath, paramPath, container) {
        if (paramPath.isAssignmentPattern()) replaceRestElement(parentPath, paramPath.get("left"), container); else {
          if (paramPath.isArrayPattern() && hasRestElement(paramPath)) {
            const elements = paramPath.get("elements");
            for (let i = 0; i < elements.length; i++) replaceRestElement(parentPath, elements[i], container);
          }
          if (paramPath.isObjectPattern() && hasRestElement(paramPath)) {
            const uid = parentPath.scope.generateUidIdentifier("ref"), declar = core.types.variableDeclaration("let", [ core.types.variableDeclarator(paramPath.node, uid) ]);
            container ? container.push(declar) : (parentPath.ensureBlock(), parentPath.get("body").unshiftContainer("body", declar)), 
            paramPath.replaceWith(core.types.cloneNode(uid));
          }
        }
      }
      return {
        name: "proposal-object-rest-spread",
        inherits: syntaxObjectRestSpread__default.default.default,
        visitor: {
          Function(path) {
            const params = path.get("params"), paramsWithRestElement = new Set, idsInRestParams = new Set;
            for (let i = 0; i < params.length; ++i) {
              const param = params[i];
              if (hasRestElement(param)) {
                paramsWithRestElement.add(i);
                for (const name of Object.keys(param.getBindingIdentifiers())) idsInRestParams.add(name);
              }
            }
            let idInRest = !1;
            const IdentifierHandler = function(path, functionScope) {
              const name = path.node.name;
              path.scope.getBinding(name) === functionScope.getBinding(name) && idsInRestParams.has(name) && (idInRest = !0, 
              path.stop());
            };
            let i;
            for (i = 0; i < params.length && !idInRest; ++i) {
              const param = params[i];
              paramsWithRestElement.has(i) || (param.isReferencedIdentifier() || param.isBindingIdentifier() ? IdentifierHandler(path, path.scope) : param.traverse({
                "Scope|TypeAnnotation|TSTypeAnnotation": path => path.skip(),
                "ReferencedIdentifier|BindingIdentifier": IdentifierHandler
              }, path.scope));
            }
            if (idInRest) {
              const shouldTransformParam = idx => idx >= i - 1 || paramsWithRestElement.has(idx);
              pluginTransformParameters.convertFunctionParams(path, ignoreFunctionLength, shouldTransformParam, replaceRestElement);
            } else for (let i = 0; i < params.length; ++i) {
              const param = params[i];
              paramsWithRestElement.has(i) && replaceRestElement(path, param);
            }
          },
          VariableDeclarator(path, file) {
            if (!path.get("id").isObjectPattern()) return;
            let insertionPath = path;
            const originalPath = path;
            visitRestElements(path.get("id"), (path => {
              if (!path.parentPath.isObjectPattern()) return;
              if (shouldStoreRHSInTemporaryVariable(originalPath.node.id) && !core.types.isIdentifier(originalPath.node.init)) {
                const initRef = path.scope.generateUidIdentifierBasedOnNode(originalPath.node.init, "ref");
                return originalPath.insertBefore(core.types.variableDeclarator(initRef, originalPath.node.init)), 
                void originalPath.replaceWith(core.types.variableDeclarator(originalPath.node.id, core.types.cloneNode(initRef)));
              }
              let ref = originalPath.node.init;
              const refPropertyPath = [];
              let kind;
              path.findParent((path => {
                if (path.isObjectProperty()) refPropertyPath.unshift(path); else if (path.isVariableDeclarator()) return kind = path.parentPath.node.kind, 
                !0;
              }));
              const impureObjRefComputedDeclarators = replaceImpureComputedKeys(refPropertyPath, path.scope);
              refPropertyPath.forEach((prop => {
                const {node} = prop;
                ref = core.types.memberExpression(ref, core.types.cloneNode(node.key), node.computed || core.types.isLiteral(node.key));
              }));
              const objectPatternPath = path.findParent((path => path.isObjectPattern())), [impureComputedPropertyDeclarators, argument, callExpression] = createObjectRest(objectPatternPath, file, ref);
              pureGetters && function(path) {
                const bindings = path.getOuterBindingIdentifierPaths();
                Object.keys(bindings).forEach((bindingName => {
                  const bindingParentPath = bindings[bindingName].parentPath;
                  path.scope.getBinding(bindingName).references > ZERO_REFS || !bindingParentPath.isObjectProperty() || bindingParentPath.remove();
                }));
              }(objectPatternPath), core.types.assertIdentifier(argument), insertionPath.insertBefore(impureComputedPropertyDeclarators), 
              insertionPath.insertBefore(impureObjRefComputedDeclarators), insertionPath = insertionPath.insertAfter(core.types.variableDeclarator(argument, callExpression))[0], 
              path.scope.registerBinding(kind, insertionPath), 0 === objectPatternPath.node.properties.length && objectPatternPath.findParent((path => path.isObjectProperty() || path.isVariableDeclarator())).remove();
            }));
          },
          ExportNamedDeclaration(path) {
            const declaration = path.get("declaration");
            if (!declaration.isVariableDeclaration()) return;
            const hasRest = declaration.get("declarations").some((path => hasObjectPatternRestElement(path.get("id"))));
            if (!hasRest) return;
            const specifiers = [];
            for (const name of Object.keys(path.getOuterBindingIdentifiers(!0))) specifiers.push(core.types.exportSpecifier(core.types.identifier(name), core.types.identifier(name)));
            path.replaceWith(declaration.node), path.insertAfter(core.types.exportNamedDeclaration(null, specifiers));
          },
          CatchClause(path) {
            const paramPath = path.get("param");
            replaceRestElement(path, paramPath);
          },
          AssignmentExpression(path, file) {
            const leftPath = path.get("left");
            if (leftPath.isObjectPattern() && hasRestElement(leftPath)) {
              const nodes = [], refName = path.scope.generateUidBasedOnNode(path.node.right, "ref");
              nodes.push(core.types.variableDeclaration("var", [ core.types.variableDeclarator(core.types.identifier(refName), path.node.right) ]));
              const [impureComputedPropertyDeclarators, argument, callExpression] = createObjectRest(leftPath, file, core.types.identifier(refName));
              impureComputedPropertyDeclarators.length > 0 && nodes.push(core.types.variableDeclaration("var", impureComputedPropertyDeclarators));
              const nodeWithoutSpread = core.types.cloneNode(path.node);
              nodeWithoutSpread.right = core.types.identifier(refName), nodes.push(core.types.expressionStatement(nodeWithoutSpread)), 
              nodes.push(core.types.toStatement(core.types.assignmentExpression("=", argument, callExpression))), 
              nodes.push(core.types.expressionStatement(core.types.identifier(refName))), path.replaceWithMultiple(nodes);
            }
          },
          ForXStatement(path) {
            const {node, scope} = path, leftPath = path.get("left"), left = node.left;
            if (hasObjectPatternRestElement(leftPath)) if (core.types.isVariableDeclaration(left)) {
              const pattern = left.declarations[0].id, key = scope.generateUidIdentifier("ref");
              node.left = core.types.variableDeclaration(left.kind, [ core.types.variableDeclarator(key, null) ]), 
              path.ensureBlock();
              node.body.body.unshift(core.types.variableDeclaration(node.left.kind, [ core.types.variableDeclarator(pattern, core.types.cloneNode(key)) ]));
            } else {
              const temp = scope.generateUidIdentifier("ref");
              node.left = core.types.variableDeclaration("var", [ core.types.variableDeclarator(temp) ]), 
              path.ensureBlock();
              const body = node.body;
              0 === body.body.length && path.isCompletionRecord() && body.body.unshift(core.types.expressionStatement(scope.buildUndefinedNode())), 
              body.body.unshift(core.types.expressionStatement(core.types.assignmentExpression("=", left, core.types.cloneNode(temp))));
            }
          },
          ArrayPattern(path) {
            const objectPatterns = [];
            if (visitRestElements(path, (path => {
              if (!path.parentPath.isObjectPattern()) return;
              const objectPattern = path.parentPath, uid = path.scope.generateUidIdentifier("ref");
              objectPatterns.push(core.types.variableDeclarator(objectPattern.node, uid)), objectPattern.replaceWith(core.types.cloneNode(uid)), 
              path.skip();
            })), objectPatterns.length > 0) {
              const statementPath = path.getStatementParent(), statementNode = statementPath.node, kind = "VariableDeclaration" === statementNode.type ? statementNode.kind : "var";
              statementPath.insertAfter(core.types.variableDeclaration(kind, objectPatterns));
            }
          },
          ObjectExpression(path, file) {
            if (!function(node) {
              for (const prop of node.properties) if (core.types.isSpreadElement(prop)) return !0;
              return !1;
            }(path.node)) return;
            let helper;
            if (setSpreadProperties) helper = getExtendsHelper(file); else try {
              helper = file.addHelper("objectSpread2");
            } catch (_unused) {
              this.file.declarations.objectSpread2 = null, helper = file.addHelper("objectSpread");
            }
            let exp = null, props = [];
            function make() {
              const hadProps = props.length > 0, obj = core.types.objectExpression(props);
              props = [], exp ? pureGetters ? hadProps && exp.arguments.push(obj) : exp = core.types.callExpression(core.types.cloneNode(helper), [ exp, ...hadProps ? [ core.types.objectExpression([]), obj ] : [] ]) : exp = core.types.callExpression(helper, [ obj ]);
            }
            for (const prop of path.node.properties) core.types.isSpreadElement(prop) ? (make(), 
            exp.arguments.push(prop.argument)) : props.push(prop);
            props.length && make(), path.replaceWith(exp);
          }
        }
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