(() => {
  var __webpack_modules__ = {
    4709: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.codeFrameColumns = codeFrameColumns, exports.default = function(rawLines, lineNumber, colNumber, opts = {}) {
        if (!deprecationWarningShown) {
          deprecationWarningShown = !0;
          const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
          if (process.emitWarning) process.emitWarning(message, "DeprecationWarning"); else {
            new Error(message).name = "DeprecationWarning", console.warn(new Error(message));
          }
        }
        colNumber = Math.max(colNumber, 0);
        return codeFrameColumns(rawLines, {
          start: {
            column: colNumber,
            line: lineNumber
          }
        }, opts);
      };
      var _highlight = __webpack_require__(3014);
      let deprecationWarningShown = !1;
      const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
      function codeFrameColumns(rawLines, loc, opts = {}) {
        const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts), chalk = (0, 
        _highlight.getChalk)(opts), defs = function(chalk) {
          return {
            gutter: chalk.grey,
            marker: chalk.red.bold,
            message: chalk.red.bold
          };
        }(chalk), maybeHighlight = (chalkFn, string) => highlighted ? chalkFn(string) : string, lines = rawLines.split(NEWLINE), {start, end, markerLines} = function(loc, source, opts) {
          const startLoc = Object.assign({
            column: 0,
            line: -1
          }, loc.start), endLoc = Object.assign({}, startLoc, loc.end), {linesAbove = 2, linesBelow = 3} = opts || {}, startLine = startLoc.line, startColumn = startLoc.column, endLine = endLoc.line, endColumn = endLoc.column;
          let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
          -1 === startLine && (start = 0), -1 === endLine && (end = source.length);
          const lineDiff = endLine - startLine, markerLines = {};
          if (lineDiff) for (let i = 0; i <= lineDiff; i++) {
            const lineNumber = i + startLine;
            if (startColumn) if (0 === i) {
              const sourceLength = source[lineNumber - 1].length;
              markerLines[lineNumber] = [ startColumn, sourceLength - startColumn + 1 ];
            } else if (i === lineDiff) markerLines[lineNumber] = [ 0, endColumn ]; else {
              const sourceLength = source[lineNumber - i].length;
              markerLines[lineNumber] = [ 0, sourceLength ];
            } else markerLines[lineNumber] = !0;
          } else markerLines[startLine] = startColumn === endColumn ? !startColumn || [ startColumn, 0 ] : [ startColumn, endColumn - startColumn ];
          return {
            start,
            end,
            markerLines
          };
        }(loc, lines, opts), hasColumns = loc.start && "number" == typeof loc.start.column, numberMaxWidth = String(end).length;
        let frame = (highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines).split(NEWLINE, end).slice(start, end).map(((line, index) => {
          const number = start + 1 + index, gutter = ` ${` ${number}`.slice(-numberMaxWidth)} |`, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
          if (hasMarker) {
            let markerLine = "";
            if (Array.isArray(hasMarker)) {
              const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
              markerLine = [ "\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers) ].join(""), 
              lastMarkerLine && opts.message && (markerLine += " " + maybeHighlight(defs.message, opts.message));
            }
            return [ maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? ` ${line}` : "", markerLine ].join("");
          }
          return ` ${maybeHighlight(defs.gutter, gutter)}${line.length > 0 ? ` ${line}` : ""}`;
        })).join("\n");
        return opts.message && !hasColumns && (frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`), 
        highlighted ? chalk.reset(frame) : frame;
      }
    },
    8142: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = __webpack_require__(8392);
    },
    4832: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = __webpack_require__(7867);
    },
    9678: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
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
      var _semver = __webpack_require__(6625), _pretty = __webpack_require__(8087), _utils = __webpack_require__(3108);
    },
    9584: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
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
      var _semver = __webpack_require__(6625), _plugins = __webpack_require__(4832), _utils = __webpack_require__(3108);
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
      "use strict";
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
      var _browserslist = __webpack_require__(1991), _helperValidatorOption = __webpack_require__(4346), _nativeModules = __webpack_require__(8142), _utils = __webpack_require__(3108), _targets = __webpack_require__(2950), _options = __webpack_require__(8910), _pretty = __webpack_require__(8087), _debug = __webpack_require__(9678), _filterItems = __webpack_require__(9584);
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
      "use strict";
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
      "use strict";
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
      var _semver = __webpack_require__(6625), _targets = __webpack_require__(2950);
      function prettifyVersion(version) {
        if ("string" != typeof version) return version;
        const parts = [ _semver.major(version) ], minor = _semver.minor(version), patch = _semver.patch(version);
        return (minor || patch) && parts.push(minor), patch && parts.push(patch), parts.join(".");
      }
    },
    2950: (__unused_webpack_module, exports) => {
      "use strict";
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
      "use strict";
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
      var _semver = __webpack_require__(6625), _helperValidatorOption = __webpack_require__(4346), _targets = __webpack_require__(2950);
      const versionRegExp = /^(\d+|\d+.\d+)$/, v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");
      function semverMin(first, second) {
        return first && _semver.lt(first, second) ? first : second;
      }
      function getLowestUnreleased(a, b, env) {
        const unreleasedLabel = _targets.unreleasedLabels[env], hasUnreleased = [ a, b ].some((item => item === unreleasedLabel));
        return hasUnreleased ? a === hasUnreleased ? b : a || b : semverMin(a, b);
      }
    },
    1485: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function({node, parent, scope, id}, localBinding = !1, supportUnicodeId = !1) {
        if (node.id) return;
        if (!isObjectProperty(parent) && !isObjectMethod(parent, {
          kind: "method"
        }) || parent.computed && !isLiteral(parent.key)) {
          if (isVariableDeclarator(parent)) {
            if (id = parent.id, isIdentifier(id) && !localBinding) {
              const binding = scope.parent.getBinding(id.name);
              if (binding && binding.constant && scope.getBinding(id.name) === binding) return node.id = cloneNode(id), 
              void (node.id[NOT_LOCAL_BINDING] = !0);
            }
          } else if (isAssignmentExpression(parent, {
            operator: "="
          })) id = parent.left; else if (!id) return;
        } else id = parent.key;
        let name;
        id && isLiteral(id) ? name = function(id) {
          if (isNullLiteral(id)) return "null";
          if (isRegExpLiteral(id)) return `_${id.pattern}_${id.flags}`;
          if (isTemplateLiteral(id)) return id.quasis.map((quasi => quasi.value.raw)).join("");
          if (void 0 !== id.value) return id.value + "";
          return "";
        }(id) : id && isIdentifier(id) && (name = id.name);
        if (void 0 === name) return;
        if (!supportUnicodeId && isFunction(node) && /[\uD800-\uDFFF]/.test(name)) return;
        name = toBindingIdentifierName(name), (id = identifier(name))[NOT_LOCAL_BINDING] = !0;
        return function(state, method, id, scope) {
          if (state.selfReference) {
            if (!scope.hasBinding(id.name) || scope.hasGlobal(id.name)) {
              if (!isFunction(method)) return;
              let build = buildPropertyMethodAssignmentWrapper;
              method.generator && (build = buildGeneratorPropertyMethodAssignmentWrapper);
              const template = build({
                FUNCTION: method,
                FUNCTION_ID: id,
                FUNCTION_KEY: scope.generateUidIdentifier(id.name)
              }).expression, params = template.callee.body.body[0].params;
              for (let i = 0, len = function(node) {
                const count = node.params.findIndex((param => isAssignmentPattern(param) || isRestElement(param)));
                return -1 === count ? node.params.length : count;
              }(method); i < len; i++) params.push(scope.generateUidIdentifier("x"));
              return template;
            }
            scope.rename(id.name);
          }
          method.id = id, scope.getProgramParent().references[id.name] = !0;
        }(function(node, name, scope) {
          const state = {
            selfAssignment: !1,
            selfReference: !1,
            outerDeclar: scope.getBindingIdentifier(name),
            references: [],
            name
          }, binding = scope.getOwnBinding(name);
          binding ? "param" === binding.kind && (state.selfReference = !0) : (state.outerDeclar || scope.hasGlobal(name)) && scope.traverse(node, visitor, state);
          return state;
        }(node, name, scope), node, id, scope) || node;
      };
      var _template = __webpack_require__(4847), _t = __webpack_require__(8459);
      const {NOT_LOCAL_BINDING, cloneNode, identifier, isAssignmentExpression, isAssignmentPattern, isFunction, isIdentifier, isLiteral, isNullLiteral, isObjectMethod, isObjectProperty, isRegExpLiteral, isRestElement, isTemplateLiteral, isVariableDeclarator, toBindingIdentifierName} = _t;
      const buildPropertyMethodAssignmentWrapper = (0, _template.default)("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), buildGeneratorPropertyMethodAssignmentWrapper = (0, 
      _template.default)("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), visitor = {
        "ReferencedIdentifier|BindingIdentifier"(path, state) {
          if (path.node.name !== state.name) return;
          path.scope.getBindingIdentifier(state.name) === state.outerDeclar && (state.selfReference = !0, 
          path.stop());
        }
      };
    },
    3306: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isIdentifierChar = isIdentifierChar, exports.isIdentifierName = function(name) {
        let isFirst = !0;
        for (let i = 0; i < name.length; i++) {
          let cp = name.charCodeAt(i);
          if (55296 == (64512 & cp) && i + 1 < name.length) {
            const trail = name.charCodeAt(++i);
            56320 == (64512 & trail) && (cp = 65536 + ((1023 & cp) << 10) + (1023 & trail));
          }
          if (isFirst) {
            if (isFirst = !1, !isIdentifierStart(cp)) return !1;
          } else if (!isIdentifierChar(cp)) return !1;
        }
        return !isFirst;
      }, exports.isIdentifierStart = isIdentifierStart;
      let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
      const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
      nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
      const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];
      function isInAstralSet(code, set) {
        let pos = 65536;
        for (let i = 0, length = set.length; i < length; i += 2) {
          if (pos += set[i], pos > code) return !1;
          if (pos += set[i + 1], pos >= code) return !0;
        }
        return !1;
      }
      function isIdentifierStart(code) {
        return code < 65 ? 36 === code : code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes)));
      }
      function isIdentifierChar(code) {
        return code < 48 ? 36 === code : code < 58 || !(code < 65) && (code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes))));
      }
    },
    720: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "isIdentifierChar", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierChar;
        }
      }), Object.defineProperty(exports, "isIdentifierName", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierName;
        }
      }), Object.defineProperty(exports, "isIdentifierStart", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierStart;
        }
      }), Object.defineProperty(exports, "isKeyword", {
        enumerable: !0,
        get: function() {
          return _keyword.isKeyword;
        }
      }), Object.defineProperty(exports, "isReservedWord", {
        enumerable: !0,
        get: function() {
          return _keyword.isReservedWord;
        }
      }), Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
        enumerable: !0,
        get: function() {
          return _keyword.isStrictBindOnlyReservedWord;
        }
      }), Object.defineProperty(exports, "isStrictBindReservedWord", {
        enumerable: !0,
        get: function() {
          return _keyword.isStrictBindReservedWord;
        }
      }), Object.defineProperty(exports, "isStrictReservedWord", {
        enumerable: !0,
        get: function() {
          return _keyword.isStrictReservedWord;
        }
      });
      var _identifier = __webpack_require__(3306), _keyword = __webpack_require__(2887);
    },
    2887: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isKeyword = function(word) {
        return keywords.has(word);
      }, exports.isReservedWord = isReservedWord, exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, 
      exports.isStrictBindReservedWord = function(word, inModule) {
        return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
      }, exports.isStrictReservedWord = isStrictReservedWord;
      const reservedWords_strict = [ "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield" ], reservedWords_strictBind = [ "eval", "arguments" ], keywords = new Set([ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete" ]), reservedWordsStrictSet = new Set(reservedWords_strict), reservedWordsStrictBindSet = new Set(reservedWords_strictBind);
      function isReservedWord(word, inModule) {
        return inModule && "await" === word || "enum" === word;
      }
      function isStrictReservedWord(word, inModule) {
        return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
      }
      function isStrictBindOnlyReservedWord(word) {
        return reservedWordsStrictBindSet.has(word);
      }
    },
    4401: (__unused_webpack_module, exports) => {
      "use strict";
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
      "use strict";
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
      "use strict";
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
    3014: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(code, options = {}) {
        if ("" !== code && shouldHighlight(options)) {
          const defs = function(chalk) {
            return {
              keyword: chalk.cyan,
              capitalized: chalk.yellow,
              jsxIdentifier: chalk.yellow,
              punctuator: chalk.yellow,
              number: chalk.magenta,
              string: chalk.green,
              regex: chalk.magenta,
              comment: chalk.grey,
              invalid: chalk.white.bgRed.bold
            };
          }(getChalk(options));
          return function(defs, text) {
            let highlighted = "";
            for (const {type, value} of tokenize(text)) {
              const colorize = defs[type];
              highlighted += colorize ? value.split(NEWLINE).map((str => colorize(str))).join("\n") : value;
            }
            return highlighted;
          }(defs, code);
        }
        return code;
      }, exports.getChalk = getChalk, exports.shouldHighlight = shouldHighlight;
      var _jsTokens = __webpack_require__(6188), _helperValidatorIdentifier = __webpack_require__(720), _chalk = __webpack_require__(3920);
      const sometimesKeywords = new Set([ "as", "async", "from", "get", "of", "set" ]);
      const NEWLINE = /\r\n|[\n\r\u2028\u2029]/, BRACKET = /^[()[\]{}]$/;
      let tokenize;
      {
        const JSX_TAG = /^[a-z][\w-]*$/i, getTokenType = function(token, offset, text) {
          if ("name" === token.type) {
            if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isStrictReservedWord)(token.value, !0) || sometimesKeywords.has(token.value)) return "keyword";
            if (JSX_TAG.test(token.value) && ("<" === text[offset - 1] || "</" == text.slice(offset - 2, offset))) return "jsxIdentifier";
            if (token.value[0] !== token.value[0].toLowerCase()) return "capitalized";
          }
          return "punctuator" === token.type && BRACKET.test(token.value) ? "bracket" : "invalid" !== token.type || "@" !== token.value && "#" !== token.value ? token.type : "punctuator";
        };
        tokenize = function*(text) {
          let match;
          for (;match = _jsTokens.default.exec(text); ) {
            const token = _jsTokens.matchToToken(match);
            yield {
              type: getTokenType(token, match.index, text),
              value: token.value
            };
          }
        };
      }
      function shouldHighlight(options) {
        return !!_chalk.supportsColor || options.forceColor;
      }
      function getChalk(options) {
        return options.forceColor ? new _chalk.constructor({
          enabled: !0,
          level: 1
        }) : _chalk;
      }
    },
    9007: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function createTemplateBuilder(formatter, defaultOpts) {
        const templateFnCache = new WeakMap, templateAstCache = new WeakMap, cachedOpts = defaultOpts || (0, 
        _options.validate)(null);
        return Object.assign(((tpl, ...args) => {
          if ("string" == typeof tpl) {
            if (args.length > 1) throw new Error("Unexpected extra params.");
            return extendedTrace((0, _string.default)(formatter, tpl, (0, _options.merge)(cachedOpts, (0, 
            _options.validate)(args[0]))));
          }
          if (Array.isArray(tpl)) {
            let builder = templateFnCache.get(tpl);
            return builder || (builder = (0, _literal.default)(formatter, tpl, cachedOpts), 
            templateFnCache.set(tpl, builder)), extendedTrace(builder(args));
          }
          if ("object" == typeof tpl && tpl) {
            if (args.length > 0) throw new Error("Unexpected extra params.");
            return createTemplateBuilder(formatter, (0, _options.merge)(cachedOpts, (0, _options.validate)(tpl)));
          }
          throw new Error("Unexpected template param " + typeof tpl);
        }), {
          ast: (tpl, ...args) => {
            if ("string" == typeof tpl) {
              if (args.length > 1) throw new Error("Unexpected extra params.");
              return (0, _string.default)(formatter, tpl, (0, _options.merge)((0, _options.merge)(cachedOpts, (0, 
              _options.validate)(args[0])), NO_PLACEHOLDER))();
            }
            if (Array.isArray(tpl)) {
              let builder = templateAstCache.get(tpl);
              return builder || (builder = (0, _literal.default)(formatter, tpl, (0, _options.merge)(cachedOpts, NO_PLACEHOLDER)), 
              templateAstCache.set(tpl, builder)), builder(args)();
            }
            throw new Error("Unexpected template param " + typeof tpl);
          }
        });
      };
      var _options = __webpack_require__(698), _string = __webpack_require__(4515), _literal = __webpack_require__(9948);
      const NO_PLACEHOLDER = (0, _options.validate)({
        placeholderPattern: !1
      });
      function extendedTrace(fn) {
        let rootStack = "";
        try {
          throw new Error;
        } catch (error) {
          error.stack && (rootStack = error.stack.split("\n").slice(3).join("\n"));
        }
        return arg => {
          try {
            return fn(arg);
          } catch (err) {
            throw err.stack += `\n    =============\n${rootStack}`, err;
          }
        };
      }
    },
    1522: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.statements = exports.statement = exports.smart = exports.program = exports.expression = void 0;
      var _t = __webpack_require__(8459);
      const {assertExpressionStatement} = _t;
      function makeStatementFormatter(fn) {
        return {
          code: str => `/* @babel/template */;\n${str}`,
          validate: () => {},
          unwrap: ast => fn(ast.program.body.slice(1))
        };
      }
      const smart = makeStatementFormatter((body => body.length > 1 ? body : body[0]));
      exports.smart = smart;
      const statements = makeStatementFormatter((body => body));
      exports.statements = statements;
      const statement = makeStatementFormatter((body => {
        if (0 === body.length) throw new Error("Found nothing to return.");
        if (body.length > 1) throw new Error("Found multiple statements but wanted one");
        return body[0];
      }));
      exports.statement = statement;
      const expression = {
        code: str => `(\n${str}\n)`,
        validate: ast => {
          if (ast.program.body.length > 1) throw new Error("Found multiple statements but wanted one");
          if (0 === expression.unwrap(ast).start) throw new Error("Parse result included parens.");
        },
        unwrap: ({program}) => {
          const [stmt] = program.body;
          return assertExpressionStatement(stmt), stmt.expression;
        }
      };
      exports.expression = expression;
      exports.program = {
        code: str => str,
        validate: () => {},
        unwrap: ast => ast.program
      };
    },
    4847: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.statements = exports.statement = exports.smart = exports.program = exports.expression = exports.default = void 0;
      var formatters = __webpack_require__(1522), _builder = __webpack_require__(9007);
      const smart = (0, _builder.default)(formatters.smart);
      exports.smart = smart;
      const statement = (0, _builder.default)(formatters.statement);
      exports.statement = statement;
      const statements = (0, _builder.default)(formatters.statements);
      exports.statements = statements;
      const expression = (0, _builder.default)(formatters.expression);
      exports.expression = expression;
      const program = (0, _builder.default)(formatters.program);
      exports.program = program;
      var _default = Object.assign(smart.bind(void 0), {
        smart,
        statement,
        statements,
        expression,
        program,
        ast: smart.ast
      });
      exports.default = _default;
    },
    9948: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(formatter, tpl, opts) {
        const {metadata, names} = function(formatter, tpl, opts) {
          let names, nameSet, metadata, prefix = "";
          do {
            prefix += "$";
            const result = buildTemplateCode(tpl, prefix);
            names = result.names, nameSet = new Set(names), metadata = (0, _parse.default)(formatter, formatter.code(result.code), {
              parser: opts.parser,
              placeholderWhitelist: new Set(result.names.concat(opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [])),
              placeholderPattern: opts.placeholderPattern,
              preserveComments: opts.preserveComments,
              syntacticPlaceholders: opts.syntacticPlaceholders
            });
          } while (metadata.placeholders.some((placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name))));
          return {
            metadata,
            names
          };
        }(formatter, tpl, opts);
        return arg => {
          const defaultReplacements = {};
          return arg.forEach(((replacement, i) => {
            defaultReplacements[names[i]] = replacement;
          })), arg => {
            const replacements = (0, _options.normalizeReplacements)(arg);
            return replacements && Object.keys(replacements).forEach((key => {
              if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) throw new Error("Unexpected replacement overlap.");
            })), formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
          };
        };
      };
      var _options = __webpack_require__(698), _parse = __webpack_require__(5672), _populate = __webpack_require__(1969);
      function buildTemplateCode(tpl, prefix) {
        const names = [];
        let code = tpl[0];
        for (let i = 1; i < tpl.length; i++) {
          const value = `${prefix}${i - 1}`;
          names.push(value), code += value + tpl[i];
        }
        return {
          names,
          code
        };
      }
    },
    698: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.merge = function(a, b) {
        const {placeholderWhitelist = a.placeholderWhitelist, placeholderPattern = a.placeholderPattern, preserveComments = a.preserveComments, syntacticPlaceholders = a.syntacticPlaceholders} = b;
        return {
          parser: Object.assign({}, a.parser, b.parser),
          placeholderWhitelist,
          placeholderPattern,
          preserveComments,
          syntacticPlaceholders
        };
      }, exports.normalizeReplacements = function(replacements) {
        if (Array.isArray(replacements)) return replacements.reduce(((acc, replacement, i) => (acc["$" + i] = replacement, 
        acc)), {});
        if ("object" == typeof replacements || null == replacements) return replacements || void 0;
        throw new Error("Template replacements must be an array, object, null, or undefined");
      }, exports.validate = function(opts) {
        if (null != opts && "object" != typeof opts) throw new Error("Unknown template options.");
        const _ref = opts || {}, {placeholderWhitelist, placeholderPattern, preserveComments, syntacticPlaceholders} = _ref, parser = function(source, excluded) {
          if (null == source) return {};
          var key, i, target = {}, sourceKeys = Object.keys(source);
          for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
          return target;
        }(_ref, _excluded);
        if (null != placeholderWhitelist && !(placeholderWhitelist instanceof Set)) throw new Error("'.placeholderWhitelist' must be a Set, null, or undefined");
        if (null != placeholderPattern && !(placeholderPattern instanceof RegExp) && !1 !== placeholderPattern) throw new Error("'.placeholderPattern' must be a RegExp, false, null, or undefined");
        if (null != preserveComments && "boolean" != typeof preserveComments) throw new Error("'.preserveComments' must be a boolean, null, or undefined");
        if (null != syntacticPlaceholders && "boolean" != typeof syntacticPlaceholders) throw new Error("'.syntacticPlaceholders' must be a boolean, null, or undefined");
        if (!0 === syntacticPlaceholders && (null != placeholderWhitelist || null != placeholderPattern)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
        return {
          parser,
          placeholderWhitelist: placeholderWhitelist || void 0,
          placeholderPattern: null == placeholderPattern ? void 0 : placeholderPattern,
          preserveComments: null == preserveComments ? void 0 : preserveComments,
          syntacticPlaceholders: null == syntacticPlaceholders ? void 0 : syntacticPlaceholders
        };
      };
      const _excluded = [ "placeholderWhitelist", "placeholderPattern", "preserveComments", "syntacticPlaceholders" ];
    },
    5672: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(formatter, code, opts) {
        const {placeholderWhitelist, placeholderPattern, preserveComments, syntacticPlaceholders} = opts, ast = function(code, parserOpts, syntacticPlaceholders) {
          const plugins = (parserOpts.plugins || []).slice();
          !1 !== syntacticPlaceholders && plugins.push("placeholders");
          parserOpts = Object.assign({
            allowReturnOutsideFunction: !0,
            allowSuperOutsideMethod: !0,
            sourceType: "module"
          }, parserOpts, {
            plugins
          });
          try {
            return (0, _parser.parse)(code, parserOpts);
          } catch (err) {
            const loc = err.loc;
            throw loc && (err.message += "\n" + (0, _codeFrame.codeFrameColumns)(code, {
              start: loc
            }), err.code = "BABEL_TEMPLATE_PARSE_ERROR"), err;
          }
        }(code, opts.parser, syntacticPlaceholders);
        removePropertiesDeep(ast, {
          preserveComments
        }), formatter.validate(ast);
        const syntactic = {
          placeholders: [],
          placeholderNames: new Set
        }, legacy = {
          placeholders: [],
          placeholderNames: new Set
        }, isLegacyRef = {
          value: void 0
        };
        return traverse(ast, placeholderVisitorHandler, {
          syntactic,
          legacy,
          isLegacyRef,
          placeholderWhitelist,
          placeholderPattern,
          syntacticPlaceholders
        }), Object.assign({
          ast
        }, isLegacyRef.value ? legacy : syntactic);
      };
      var _t = __webpack_require__(8459), _parser = __webpack_require__(2545), _codeFrame = __webpack_require__(4709);
      const {isCallExpression, isExpressionStatement, isFunction, isIdentifier, isJSXIdentifier, isNewExpression, isPlaceholder, isStatement, isStringLiteral, removePropertiesDeep, traverse} = _t, PATTERN = /^[_$A-Z0-9]+$/;
      function placeholderVisitorHandler(node, ancestors, state) {
        var _state$placeholderWhi;
        let name;
        if (isPlaceholder(node)) {
          if (!1 === state.syntacticPlaceholders) throw new Error("%%foo%%-style placeholders can't be used when '.syntacticPlaceholders' is false.");
          name = node.name.name, state.isLegacyRef.value = !1;
        } else {
          if (!1 === state.isLegacyRef.value || state.syntacticPlaceholders) return;
          if (isIdentifier(node) || isJSXIdentifier(node)) name = node.name, state.isLegacyRef.value = !0; else {
            if (!isStringLiteral(node)) return;
            name = node.value, state.isLegacyRef.value = !0;
          }
        }
        if (!state.isLegacyRef.value && (null != state.placeholderPattern || null != state.placeholderWhitelist)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
        if (state.isLegacyRef.value && (!1 === state.placeholderPattern || !(state.placeholderPattern || PATTERN).test(name)) && (null == (_state$placeholderWhi = state.placeholderWhitelist) || !_state$placeholderWhi.has(name))) return;
        ancestors = ancestors.slice();
        const {node: parent, key} = ancestors[ancestors.length - 1];
        let type;
        isStringLiteral(node) || isPlaceholder(node, {
          expectedNode: "StringLiteral"
        }) ? type = "string" : isNewExpression(parent) && "arguments" === key || isCallExpression(parent) && "arguments" === key || isFunction(parent) && "params" === key ? type = "param" : isExpressionStatement(parent) && !isPlaceholder(node) ? (type = "statement", 
        ancestors = ancestors.slice(0, -1)) : type = isStatement(node) && isPlaceholder(node) ? "statement" : "other";
        const {placeholders, placeholderNames} = state.isLegacyRef.value ? state.legacy : state.syntactic;
        placeholders.push({
          name,
          type,
          resolve: ast => function(ast, ancestors) {
            let parent = ast;
            for (let i = 0; i < ancestors.length - 1; i++) {
              const {key, index} = ancestors[i];
              parent = void 0 === index ? parent[key] : parent[key][index];
            }
            const {key, index} = ancestors[ancestors.length - 1];
            return {
              parent,
              key,
              index
            };
          }(ast, ancestors),
          isDuplicate: placeholderNames.has(name)
        }), placeholderNames.add(name);
      }
    },
    1969: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(metadata, replacements) {
        const ast = cloneNode(metadata.ast);
        replacements && (metadata.placeholders.forEach((placeholder => {
          if (!Object.prototype.hasOwnProperty.call(replacements, placeholder.name)) {
            const placeholderName = placeholder.name;
            throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a\n            placeholder you may want to consider passing one of the following options to @babel/template:\n            - { placeholderPattern: false, placeholderWhitelist: new Set(['${placeholderName}'])}\n            - { placeholderPattern: /^${placeholderName}$/ }`);
          }
        })), Object.keys(replacements).forEach((key => {
          if (!metadata.placeholderNames.has(key)) throw new Error(`Unknown substitution "${key}" given`);
        })));
        return metadata.placeholders.slice().reverse().forEach((placeholder => {
          try {
            !function(placeholder, ast, replacement) {
              placeholder.isDuplicate && (Array.isArray(replacement) ? replacement = replacement.map((node => cloneNode(node))) : "object" == typeof replacement && (replacement = cloneNode(replacement)));
              const {parent, key, index} = placeholder.resolve(ast);
              if ("string" === placeholder.type) {
                if ("string" == typeof replacement && (replacement = stringLiteral(replacement)), 
                !replacement || !isStringLiteral(replacement)) throw new Error("Expected string substitution");
              } else if ("statement" === placeholder.type) void 0 === index ? replacement ? Array.isArray(replacement) ? replacement = blockStatement(replacement) : "string" == typeof replacement ? replacement = expressionStatement(identifier(replacement)) : isStatement(replacement) || (replacement = expressionStatement(replacement)) : replacement = emptyStatement() : replacement && !Array.isArray(replacement) && ("string" == typeof replacement && (replacement = identifier(replacement)), 
              isStatement(replacement) || (replacement = expressionStatement(replacement))); else if ("param" === placeholder.type) {
                if ("string" == typeof replacement && (replacement = identifier(replacement)), void 0 === index) throw new Error("Assertion failure.");
              } else if ("string" == typeof replacement && (replacement = identifier(replacement)), 
              Array.isArray(replacement)) throw new Error("Cannot replace single expression with an array.");
              if (void 0 === index) validate(parent, key, replacement), parent[key] = replacement; else {
                const items = parent[key].slice();
                "statement" === placeholder.type || "param" === placeholder.type ? null == replacement ? items.splice(index, 1) : Array.isArray(replacement) ? items.splice(index, 1, ...replacement) : items[index] = replacement : items[index] = replacement, 
                validate(parent, key, items), parent[key] = items;
              }
            }(placeholder, ast, replacements && replacements[placeholder.name] || null);
          } catch (e) {
            throw e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`, 
            e;
          }
        })), ast;
      };
      var _t = __webpack_require__(8459);
      const {blockStatement, cloneNode, emptyStatement, expressionStatement, identifier, isStatement, isStringLiteral, stringLiteral, validate} = _t;
    },
    4515: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(formatter, code, opts) {
        let metadata;
        return code = formatter.code(code), arg => {
          const replacements = (0, _options.normalizeReplacements)(arg);
          return metadata || (metadata = (0, _parse.default)(formatter, code, opts)), formatter.unwrap((0, 
          _populate.default)(metadata, replacements));
        };
      };
      var _options = __webpack_require__(698), _parse = __webpack_require__(5672), _populate = __webpack_require__(1969);
    },
    6188: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, 
      exports.matchToToken = function(match) {
        var token = {
          type: "invalid",
          value: match[0],
          closed: void 0
        };
        return match[1] ? (token.type = "string", token.closed = !(!match[3] && !match[4])) : match[5] ? token.type = "comment" : match[6] ? (token.type = "comment", 
        token.closed = !!match[7]) : match[8] ? token.type = "regex" : match[9] ? token.type = "number" : match[10] ? token.type = "name" : match[11] ? token.type = "punctuator" : match[12] && (token.type = "whitespace"), 
        token;
      };
    },
    6625: (module, exports) => {
      var debug;
      exports = module.exports = SemVer, debug = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER"), console.log.apply(console, args);
      } : function() {}, exports.SEMVER_SPEC_VERSION = "2.0.0";
      var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991, re = exports.re = [], src = exports.src = [], t = exports.tokens = {}, R = 0;
      function tok(n) {
        t[n] = R++;
      }
      tok("NUMERICIDENTIFIER"), src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*", tok("NUMERICIDENTIFIERLOOSE"), 
      src[t.NUMERICIDENTIFIERLOOSE] = "[0-9]+", tok("NONNUMERICIDENTIFIER"), src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*", 
      tok("MAINVERSION"), src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")", 
      tok("MAINVERSIONLOOSE"), src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")", 
      tok("PRERELEASEIDENTIFIER"), src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")", 
      tok("PRERELEASEIDENTIFIERLOOSE"), src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")", 
      tok("PRERELEASE"), src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))", 
      tok("PRERELEASELOOSE"), src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))", 
      tok("BUILDIDENTIFIER"), src[t.BUILDIDENTIFIER] = "[0-9A-Za-z-]+", tok("BUILD"), 
      src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))", 
      tok("FULL"), tok("FULLPLAIN"), src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?", 
      src[t.FULL] = "^" + src[t.FULLPLAIN] + "$", tok("LOOSEPLAIN"), src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?", 
      tok("LOOSE"), src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$", tok("GTLT"), src[t.GTLT] = "((?:<|>)?=?)", 
      tok("XRANGEIDENTIFIERLOOSE"), src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*", 
      tok("XRANGEIDENTIFIER"), src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*", 
      tok("XRANGEPLAIN"), src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?", 
      tok("XRANGEPLAINLOOSE"), src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?", 
      tok("XRANGE"), src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$", 
      tok("XRANGELOOSE"), src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$", 
      tok("COERCE"), src[t.COERCE] = "(^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])", 
      tok("COERCERTL"), re[t.COERCERTL] = new RegExp(src[t.COERCE], "g"), tok("LONETILDE"), 
      src[t.LONETILDE] = "(?:~>?)", tok("TILDETRIM"), src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+", 
      re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
      tok("TILDE"), src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$", 
      tok("TILDELOOSE"), src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$", 
      tok("LONECARET"), src[t.LONECARET] = "(?:\\^)", tok("CARETTRIM"), src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+", 
      re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
      tok("CARET"), src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$", 
      tok("CARETLOOSE"), src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$", 
      tok("COMPARATORLOOSE"), src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$", 
      tok("COMPARATOR"), src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$", 
      tok("COMPARATORTRIM"), src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")", 
      re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
      tok("HYPHENRANGE"), src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$", 
      tok("HYPHENRANGELOOSE"), src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$", 
      tok("STAR"), src[t.STAR] = "(<|>)?=?\\s*\\*";
      for (var i = 0; i < R; i++) debug(i, src[i]), re[i] || (re[i] = new RegExp(src[i]));
      function parse(version, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), version instanceof SemVer) return version;
        if ("string" != typeof version) return null;
        if (version.length > 256) return null;
        if (!(options.loose ? re[t.LOOSE] : re[t.FULL]).test(version)) return null;
        try {
          return new SemVer(version, options);
        } catch (er) {
          return null;
        }
      }
      function SemVer(version, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), version instanceof SemVer) {
          if (version.loose === options.loose) return version;
          version = version.version;
        } else if ("string" != typeof version) throw new TypeError("Invalid Version: " + version);
        if (version.length > 256) throw new TypeError("version is longer than 256 characters");
        if (!(this instanceof SemVer)) return new SemVer(version, options);
        debug("SemVer", version, options), this.options = options, this.loose = !!options.loose;
        var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) throw new TypeError("Invalid Version: " + version);
        if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
        this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
        m[4] ? this.prerelease = m[4].split(".").map((function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
          }
          return id;
        })) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
      }
      exports.parse = parse, exports.valid = function(version, options) {
        var v = parse(version, options);
        return v ? v.version : null;
      }, exports.clean = function(version, options) {
        var s = parse(version.trim().replace(/^[=v]+/, ""), options);
        return s ? s.version : null;
      }, exports.SemVer = SemVer, SemVer.prototype.format = function() {
        return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
        this.version;
      }, SemVer.prototype.toString = function() {
        return this.version;
      }, SemVer.prototype.compare = function(other) {
        return debug("SemVer.compare", this.version, this.options, other), other instanceof SemVer || (other = new SemVer(other, this.options)), 
        this.compareMain(other) || this.comparePre(other);
      }, SemVer.prototype.compareMain = function(other) {
        return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }, SemVer.prototype.comparePre = function(other) {
        if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
        if (!this.prerelease.length && other.prerelease.length) return 1;
        if (!this.prerelease.length && !other.prerelease.length) return 0;
        var i = 0;
        do {
          var a = this.prerelease[i], b = other.prerelease[i];
          if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
          if (void 0 === b) return 1;
          if (void 0 === a) return -1;
          if (a !== b) return compareIdentifiers(a, b);
        } while (++i);
      }, SemVer.prototype.compareBuild = function(other) {
        other instanceof SemVer || (other = new SemVer(other, this.options));
        var i = 0;
        do {
          var a = this.build[i], b = other.build[i];
          if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
          if (void 0 === b) return 1;
          if (void 0 === a) return -1;
          if (a !== b) return compareIdentifiers(a, b);
        } while (++i);
      }, SemVer.prototype.inc = function(release, identifier) {
        switch (release) {
         case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
          break;

         case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
          break;

         case "prepatch":
          this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
          break;

         case "prerelease":
          0 === this.prerelease.length && this.inc("patch", identifier), this.inc("pre", identifier);
          break;

         case "major":
          0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
          this.minor = 0, this.patch = 0, this.prerelease = [];
          break;

         case "minor":
          0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
          this.prerelease = [];
          break;

         case "patch":
          0 === this.prerelease.length && this.patch++, this.prerelease = [];
          break;

         case "pre":
          if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
            for (var i = this.prerelease.length; --i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
            i = -2);
            -1 === i && this.prerelease.push(0);
          }
          identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
          break;

         default:
          throw new Error("invalid increment argument: " + release);
        }
        return this.format(), this.raw = this.version, this;
      }, exports.inc = function(version, release, loose, identifier) {
        "string" == typeof loose && (identifier = loose, loose = void 0);
        try {
          return new SemVer(version, loose).inc(release, identifier).version;
        } catch (er) {
          return null;
        }
      }, exports.diff = function(version1, version2) {
        if (eq(version1, version2)) return null;
        var v1 = parse(version1), v2 = parse(version2), prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return prefix + key;
        return defaultResult;
      }, exports.compareIdentifiers = compareIdentifiers;
      var numeric = /^[0-9]+$/;
      function compareIdentifiers(a, b) {
        var anum = numeric.test(a), bnum = numeric.test(b);
        return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      }
      function compare(a, b, loose) {
        return new SemVer(a, loose).compare(new SemVer(b, loose));
      }
      function gt(a, b, loose) {
        return compare(a, b, loose) > 0;
      }
      function lt(a, b, loose) {
        return compare(a, b, loose) < 0;
      }
      function eq(a, b, loose) {
        return 0 === compare(a, b, loose);
      }
      function neq(a, b, loose) {
        return 0 !== compare(a, b, loose);
      }
      function gte(a, b, loose) {
        return compare(a, b, loose) >= 0;
      }
      function lte(a, b, loose) {
        return compare(a, b, loose) <= 0;
      }
      function cmp(a, op, b, loose) {
        switch (op) {
         case "===":
          return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
          a === b;

         case "!==":
          return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
          a !== b;

         case "":
         case "=":
         case "==":
          return eq(a, b, loose);

         case "!=":
          return neq(a, b, loose);

         case ">":
          return gt(a, b, loose);

         case ">=":
          return gte(a, b, loose);

         case "<":
          return lt(a, b, loose);

         case "<=":
          return lte(a, b, loose);

         default:
          throw new TypeError("Invalid operator: " + op);
        }
      }
      function Comparator(comp, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), comp instanceof Comparator) {
          if (comp.loose === !!options.loose) return comp;
          comp = comp.value;
        }
        if (!(this instanceof Comparator)) return new Comparator(comp, options);
        debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, 
        this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, 
        debug("comp", this);
      }
      exports.rcompareIdentifiers = function(a, b) {
        return compareIdentifiers(b, a);
      }, exports.major = function(a, loose) {
        return new SemVer(a, loose).major;
      }, exports.minor = function(a, loose) {
        return new SemVer(a, loose).minor;
      }, exports.patch = function(a, loose) {
        return new SemVer(a, loose).patch;
      }, exports.compare = compare, exports.compareLoose = function(a, b) {
        return compare(a, b, !0);
      }, exports.compareBuild = function(a, b, loose) {
        var versionA = new SemVer(a, loose), versionB = new SemVer(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      }, exports.rcompare = function(a, b, loose) {
        return compare(b, a, loose);
      }, exports.sort = function(list, loose) {
        return list.sort((function(a, b) {
          return exports.compareBuild(a, b, loose);
        }));
      }, exports.rsort = function(list, loose) {
        return list.sort((function(a, b) {
          return exports.compareBuild(b, a, loose);
        }));
      }, exports.gt = gt, exports.lt = lt, exports.eq = eq, exports.neq = neq, exports.gte = gte, 
      exports.lte = lte, exports.cmp = cmp, exports.Comparator = Comparator;
      var ANY = {};
      function Range(range, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), range instanceof Range) return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new Range(range.raw, options);
        if (range instanceof Comparator) return new Range(range.value, options);
        if (!(this instanceof Range)) return new Range(range, options);
        if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, 
        this.raw = range, this.set = range.split(/\s*\|\|\s*/).map((function(range) {
          return this.parseRange(range.trim());
        }), this).filter((function(c) {
          return c.length;
        })), !this.set.length) throw new TypeError("Invalid SemVer Range: " + range);
        this.format();
      }
      function isSatisfiable(comparators, options) {
        for (var result = !0, remainingComparators = comparators.slice(), testComparator = remainingComparators.pop(); result && remainingComparators.length; ) result = remainingComparators.every((function(otherComparator) {
          return testComparator.intersects(otherComparator, options);
        })), testComparator = remainingComparators.pop();
        return result;
      }
      function isX(id) {
        return !id || "x" === id.toLowerCase() || "*" === id;
      }
      function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
        return ((from = isX(fM) ? "" : isX(fm) ? ">=" + fM + ".0.0" : isX(fp) ? ">=" + fM + "." + fm + ".0" : ">=" + from) + " " + (to = isX(tM) ? "" : isX(tm) ? "<" + (+tM + 1) + ".0.0" : isX(tp) ? "<" + tM + "." + (+tm + 1) + ".0" : tpr ? "<=" + tM + "." + tm + "." + tp + "-" + tpr : "<=" + to)).trim();
      }
      function testSet(set, version, options) {
        for (var i = 0; i < set.length; i++) if (!set[i].test(version)) return !1;
        if (version.prerelease.length && !options.includePrerelease) {
          for (i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== ANY && set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
          }
          return !1;
        }
        return !0;
      }
      function satisfies(version, range, options) {
        try {
          range = new Range(range, options);
        } catch (er) {
          return !1;
        }
        return range.test(version);
      }
      function outside(version, range, hilo, options) {
        var gtfn, ltefn, ltfn, comp, ecomp;
        switch (version = new SemVer(version, options), range = new Range(range, options), 
        hilo) {
         case ">":
          gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
          break;

         case "<":
          gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
          break;

         default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version, range, options)) return !1;
        for (var i = 0; i < range.set.length; ++i) {
          var comparators = range.set[i], high = null, low = null;
          if (comparators.forEach((function(comparator) {
            comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, 
            low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
          })), high.operator === comp || high.operator === ecomp) return !1;
          if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return !1;
          if (low.operator === ecomp && ltfn(version, low.semver)) return !1;
        }
        return !0;
      }
      Comparator.prototype.parse = function(comp) {
        var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], m = comp.match(r);
        if (!m) throw new TypeError("Invalid comparator: " + comp);
        this.operator = void 0 !== m[1] ? m[1] : "", "=" === this.operator && (this.operator = ""), 
        m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
      }, Comparator.prototype.toString = function() {
        return this.value;
      }, Comparator.prototype.test = function(version) {
        if (debug("Comparator.test", version, this.options.loose), this.semver === ANY || version === ANY) return !0;
        if ("string" == typeof version) try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return !1;
        }
        return cmp(version, this.operator, this.semver, this.options);
      }, Comparator.prototype.intersects = function(comp, options) {
        if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
        var rangeTmp;
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), "" === this.operator) return "" === this.value || (rangeTmp = new Range(comp.value, options), 
        satisfies(this.value, rangeTmp, options));
        if ("" === comp.operator) return "" === comp.value || (rangeTmp = new Range(this.value, options), 
        satisfies(comp.semver, rangeTmp, options));
        var sameDirectionIncreasing = !(">=" !== this.operator && ">" !== this.operator || ">=" !== comp.operator && ">" !== comp.operator), sameDirectionDecreasing = !("<=" !== this.operator && "<" !== this.operator || "<=" !== comp.operator && "<" !== comp.operator), sameSemVer = this.semver.version === comp.semver.version, differentDirectionsInclusive = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== comp.operator && "<=" !== comp.operator), oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (">=" === this.operator || ">" === this.operator) && ("<=" === comp.operator || "<" === comp.operator), oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ("<=" === this.operator || "<" === this.operator) && (">=" === comp.operator || ">" === comp.operator);
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }, exports.Range = Range, Range.prototype.format = function() {
        return this.range = this.set.map((function(comps) {
          return comps.join(" ").trim();
        })).join("||").trim(), this.range;
      }, Range.prototype.toString = function() {
        return this.range;
      }, Range.prototype.parseRange = function(range) {
        var loose = this.options.loose;
        range = range.trim();
        var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace), debug("hyphen replace", range), range = range.replace(re[t.COMPARATORTRIM], "$1$2$3"), 
        debug("comparator trim", range, re[t.COMPARATORTRIM]), range = (range = (range = range.replace(re[t.TILDETRIM], "$1~")).replace(re[t.CARETTRIM], "$1^")).split(/\s+/).join(" ");
        var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], set = range.split(" ").map((function(comp) {
          return function(comp, options) {
            return debug("comp", comp, options), comp = function(comp, options) {
              return comp.trim().split(/\s+/).map((function(comp) {
                return function(comp, options) {
                  debug("caret", comp, options);
                  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
                  return comp.replace(r, (function(_, M, m, p, pr) {
                    var ret;
                    return debug("caret", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = "0" === M ? ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0" : pr ? (debug("replaceCaret pr", pr), 
                    ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0") : (debug("no pr"), 
                    ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0"), 
                    debug("caret return", ret), ret;
                  }));
                }(comp, options);
              })).join(" ");
            }(comp, options), debug("caret", comp), comp = function(comp, options) {
              return comp.trim().split(/\s+/).map((function(comp) {
                return function(comp, options) {
                  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
                  return comp.replace(r, (function(_, M, m, p, pr) {
                    var ret;
                    return debug("tilde", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : pr ? (debug("replaceTilde pr", pr), 
                    ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0") : ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0", 
                    debug("tilde return", ret), ret;
                  }));
                }(comp, options);
              })).join(" ");
            }(comp, options), debug("tildes", comp), comp = function(comp, options) {
              return debug("replaceXRanges", comp, options), comp.split(/\s+/).map((function(comp) {
                return function(comp, options) {
                  comp = comp.trim();
                  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
                  return comp.replace(r, (function(ret, gtlt, M, m, p, pr) {
                    debug("xRange", comp, ret, gtlt, M, m, p, pr);
                    var xM = isX(M), xm = xM || isX(m), xp = xm || isX(p), anyX = xp;
                    return "=" === gtlt && anyX && (gtlt = ""), pr = options.includePrerelease ? "-0" : "", 
                    xM ? ret = ">" === gtlt || "<" === gtlt ? "<0.0.0-0" : "*" : gtlt && anyX ? (xm && (m = 0), 
                    p = 0, ">" === gtlt ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, 
                    p = 0)) : "<=" === gtlt && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), ret = gtlt + M + "." + m + "." + p + pr) : xm ? ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr : xp && (ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr), 
                    debug("xRange return", ret), ret;
                  }));
                }(comp, options);
              })).join(" ");
            }(comp, options), debug("xrange", comp), comp = function(comp, options) {
              return debug("replaceStars", comp, options), comp.trim().replace(re[t.STAR], "");
            }(comp, options), debug("stars", comp), comp;
          }(comp, this.options);
        }), this).join(" ").split(/\s+/);
        return this.options.loose && (set = set.filter((function(comp) {
          return !!comp.match(compRe);
        }))), set = set.map((function(comp) {
          return new Comparator(comp, this.options);
        }), this);
      }, Range.prototype.intersects = function(range, options) {
        if (!(range instanceof Range)) throw new TypeError("a Range is required");
        return this.set.some((function(thisComparators) {
          return isSatisfiable(thisComparators, options) && range.set.some((function(rangeComparators) {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((function(thisComparator) {
              return rangeComparators.every((function(rangeComparator) {
                return thisComparator.intersects(rangeComparator, options);
              }));
            }));
          }));
        }));
      }, exports.toComparators = function(range, options) {
        return new Range(range, options).set.map((function(comp) {
          return comp.map((function(c) {
            return c.value;
          })).join(" ").trim().split(" ");
        }));
      }, Range.prototype.test = function(version) {
        if (!version) return !1;
        if ("string" == typeof version) try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return !1;
        }
        for (var i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return !0;
        return !1;
      }, exports.satisfies = satisfies, exports.maxSatisfying = function(versions, range, options) {
        var max = null, maxSV = null;
        try {
          var rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        return versions.forEach((function(v) {
          rangeObj.test(v) && (max && -1 !== maxSV.compare(v) || (maxSV = new SemVer(max = v, options)));
        })), max;
      }, exports.minSatisfying = function(versions, range, options) {
        var min = null, minSV = null;
        try {
          var rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        return versions.forEach((function(v) {
          rangeObj.test(v) && (min && 1 !== minSV.compare(v) || (minSV = new SemVer(min = v, options)));
        })), min;
      }, exports.minVersion = function(range, loose) {
        range = new Range(range, loose);
        var minver = new SemVer("0.0.0");
        if (range.test(minver)) return minver;
        if (minver = new SemVer("0.0.0-0"), range.test(minver)) return minver;
        minver = null;
        for (var i = 0; i < range.set.length; ++i) {
          range.set[i].forEach((function(comparator) {
            var compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
             case ">":
              0 === compver.prerelease.length ? compver.patch++ : compver.prerelease.push(0), 
              compver.raw = compver.format();

             case "":
             case ">=":
              minver && !gt(minver, compver) || (minver = compver);
              break;

             case "<":
             case "<=":
              break;

             default:
              throw new Error("Unexpected operation: " + comparator.operator);
            }
          }));
        }
        if (minver && range.test(minver)) return minver;
        return null;
      }, exports.validRange = function(range, options) {
        try {
          return new Range(range, options).range || "*";
        } catch (er) {
          return null;
        }
      }, exports.ltr = function(version, range, options) {
        return outside(version, range, "<", options);
      }, exports.gtr = function(version, range, options) {
        return outside(version, range, ">", options);
      }, exports.outside = outside, exports.prerelease = function(version, options) {
        var parsed = parse(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      }, exports.intersects = function(r1, r2, options) {
        return r1 = new Range(r1, options), r2 = new Range(r2, options), r1.intersects(r2);
      }, exports.coerce = function(version, options) {
        if (version instanceof SemVer) return version;
        "number" == typeof version && (version = String(version));
        if ("string" != typeof version) return null;
        var match = null;
        if ((options = options || {}).rtl) {
          for (var next; (next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length); ) match && next.index + next[0].length === match.index + match[0].length || (match = next), 
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
          re[t.COERCERTL].lastIndex = -1;
        } else match = version.match(re[t.COERCE]);
        if (null === match) return null;
        return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
      };
    },
    2545: module => {
      "use strict";
      module.exports = require("../lib/parser");
    },
    3177: module => {
      "use strict";
      module.exports = require("../lib/plugin-utils");
    },
    8459: module => {
      "use strict";
      module.exports = require("../lib/types");
    },
    1991: module => {
      "use strict";
      module.exports = require("browserslist");
    },
    3920: module => {
      "use strict";
      module.exports = require("chalk");
    },
    8392: module => {
      "use strict";
      module.exports = JSON.parse('{"es6.module":{"chrome":"61","and_chr":"61","edge":"16","firefox":"60","and_ff":"60","node":"13.2.0","opera":"48","op_mob":"48","safari":"10.1","ios":"10.3","samsung":"8.2","android":"61","electron":"2.0","ios_saf":"10.3"}}');
    },
    7867: module => {
      "use strict";
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
    "use strict";
    var exports = __webpack_exports__;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperCompilationTargets = __webpack_require__(4077), _helperPluginUtils = __webpack_require__(3177), _helperFunctionName = __webpack_require__(1485), _default = (0, 
    _helperPluginUtils.declare)((api => {
      api.assertVersion(7);
      const supportUnicodeId = !(0, _helperCompilationTargets.isRequired)("transform-unicode-escapes", api.targets());
      return {
        name: "transform-function-name",
        visitor: {
          FunctionExpression: {
            exit(path) {
              if ("value" !== path.key && !path.parentPath.isObjectProperty()) {
                const replacement = (0, _helperFunctionName.default)(path);
                replacement && path.replaceWith(replacement);
              }
            }
          },
          ObjectProperty(path) {
            const value = path.get("value");
            if (value.isFunction()) {
              const newNode = (0, _helperFunctionName.default)(value, !1, supportUnicodeId);
              newNode && value.replaceWith(newNode);
            }
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