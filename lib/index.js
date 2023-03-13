(() => {
  var __webpack_modules__ = {
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
      var _semver = __webpack_require__(5870), _pretty = __webpack_require__(8087), _utils = __webpack_require__(3108);
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
      var _semver = __webpack_require__(5870), _targets = __webpack_require__(2950);
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
    9470: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.stringifyTargetsMultiline = function(targets) {
        return JSON.stringify((0, _helperCompilationTargets.prettifyTargets)(targets), null, 2);
      }, exports.stringifyTargets = function(targets) {
        return JSON.stringify(targets).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
      }, exports.presetEnvSilentDebugHeader = void 0;
      var _helperCompilationTargets = __webpack_require__(4077);
      exports.presetEnvSilentDebugHeader = "#__secret_key__@babel/preset-env__don't_log_debug_header_and_resolved_targets";
    },
    7660: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var babel = function(obj) {
        if (obj && obj.__esModule) return obj;
        if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
          default: obj
        };
        var cache = _getRequireWildcardCache();
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
        newObj.default = obj, cache && cache.set(obj, newObj);
        return newObj;
      }(__webpack_require__(4629));
      function _getRequireWildcardCache() {
        if ("function" != typeof WeakMap) return null;
        var cache = new WeakMap;
        return _getRequireWildcardCache = function() {
          return cache;
        }, cache;
      }
      const {types: t} = babel.default || babel;
      exports.default = class {
        constructor(resolver) {
          this._imports = new WeakMap, this._anonymousImports = new WeakMap, this._lastImports = new WeakMap, 
          this._resolver = resolver;
        }
        storeAnonymous(programPath, url, getVal) {
          const key = this._normalizeKey(programPath, url), imports = this._ensure(this._anonymousImports, programPath, Set);
          if (imports.has(key)) return;
          const node = getVal("script" === programPath.node.sourceType, t.stringLiteral(this._resolver(url)));
          imports.add(key), this._injectImport(programPath, node);
        }
        storeNamed(programPath, url, name, getVal) {
          const key = this._normalizeKey(programPath, url, name), imports = this._ensure(this._imports, programPath, Map);
          if (!imports.has(key)) {
            const {node, name: id} = getVal("script" === programPath.node.sourceType, t.stringLiteral(this._resolver(url)), t.identifier(name));
            imports.set(key, id), this._injectImport(programPath, node);
          }
          return t.identifier(imports.get(key));
        }
        _injectImport(programPath, node) {
          let lastImport = this._lastImports.get(programPath);
          lastImport = lastImport && lastImport.node && lastImport.parent === programPath.node && lastImport.container === programPath.node.body ? lastImport.insertAfter(node) : programPath.unshiftContainer("body", node), 
          lastImport = lastImport[lastImport.length - 1], this._lastImports.set(programPath, lastImport);
        }
        _ensure(map, programPath, Collection) {
          let collection = map.get(programPath);
          return collection || (collection = new Collection, map.set(programPath, collection)), 
          collection;
        }
        _normalizeKey(programPath, url, name = "") {
          const {sourceType} = programPath.node;
          return `${name && sourceType}::${url}::${name}`;
        }
      };
    },
    9695: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = function(factory) {
        return (0, _helperPluginUtils.declare)(((babelApi, options, dirname) => {
          babelApi.assertVersion(7);
          const {traverse} = babelApi;
          let debugLog;
          const missingDependencies = (0, _normalizeOptions.applyMissingDependenciesDefaults)(options, babelApi), {debug, method, targets, provider, callProvider} = function(factory, options, missingDependencies, dirname, debugLog, babelApi) {
            const {method, methodName, targets, debug, shouldInjectPolyfill, providerOptions, absoluteImports} = function(options, babelApi) {
              const {method, targets: targetsOption, ignoreBrowserslistConfig, configPath, debug, shouldInjectPolyfill, absoluteImports} = options, providerOptions = function(source, excluded) {
                if (null == source) return {};
                var key, i, target = {}, sourceKeys = Object.keys(source);
                for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
                return target;
              }(options, [ "method", "targets", "ignoreBrowserslistConfig", "configPath", "debug", "shouldInjectPolyfill", "absoluteImports" ]);
              let methodName, targets;
              if ("usage-global" === method) methodName = "usageGlobal"; else if ("entry-global" === method) methodName = "entryGlobal"; else {
                if ("usage-pure" !== method) throw "string" != typeof method ? new Error(".method must be a string") : new Error(`.method must be one of "entry-global", "usage-global" or "usage-pure" (received ${JSON.stringify(method)})`);
                methodName = "usagePure";
              }
              if ("function" == typeof shouldInjectPolyfill) {
                if (options.include || options.exclude) throw new Error(".include and .exclude are not supported when using the .shouldInjectPolyfill function.");
              } else if (null != shouldInjectPolyfill) throw new Error(`.shouldInjectPolyfill must be a function, or undefined (received ${JSON.stringify(shouldInjectPolyfill)})`);
              if (null != absoluteImports && "boolean" != typeof absoluteImports && "string" != typeof absoluteImports) throw new Error(`.absoluteImports must be a boolean, a string, or undefined (received ${JSON.stringify(absoluteImports)})`);
              if (targetsOption || configPath || ignoreBrowserslistConfig) {
                const targetsObj = "string" == typeof targetsOption || Array.isArray(targetsOption) ? {
                  browsers: targetsOption
                } : targetsOption;
                targets = getTargets(targetsObj, {
                  ignoreBrowserslistConfig,
                  configPath
                });
              } else targets = babelApi.targets();
              return {
                method,
                methodName,
                targets,
                absoluteImports: null != absoluteImports && absoluteImports,
                shouldInjectPolyfill,
                debug: !!debug,
                providerOptions
              };
            }(options, babelApi), getUtils = (0, _utils.createUtilsGetter)(new _importsCache.default((moduleName => deps.resolve(dirname, moduleName, absoluteImports))));
            let include, exclude, polyfillsSupport, polyfillsNames, filterPolyfills;
            const depsCache = new Map, api = {
              babel: babelApi,
              getUtils,
              method: options.method,
              targets,
              createMetaResolver: _metaResolver.default,
              shouldInjectPolyfill(name) {
                if (void 0 === polyfillsNames) throw new Error(`Internal error in the ${factory.name} provider: shouldInjectPolyfill() can't be called during initialization.`);
                if (polyfillsNames.has(name) || console.warn(`Internal error in the ${provider.name} provider: unknown polyfill "${name}".`), 
                filterPolyfills && !filterPolyfills(name)) return !1;
                let shouldInject = (0, _helperCompilationTargets.isRequired)(name, targets, {
                  compatData: polyfillsSupport,
                  includes: include,
                  excludes: exclude
                });
                if (shouldInjectPolyfill && (shouldInject = shouldInjectPolyfill(name, shouldInject), 
                "boolean" != typeof shouldInject)) throw new Error(".shouldInjectPolyfill must return a boolean.");
                return shouldInject;
              },
              debug(name) {
                debugLog().found = !0, debug && name && (debugLog().polyfills.has(provider.name) || debugLog().polyfills.set(name, polyfillsSupport && name && polyfillsSupport[name]));
              },
              assertDependency(name, version = "*") {
                if (!1 === missingDependencies) return;
                if (absoluteImports) return;
                const dep = "*" === version ? name : `${name}@^${version}`;
                !missingDependencies.all && function(map, key, getDefault) {
                  let val = map.get(key);
                  void 0 === val && (val = getDefault(), map.set(key, val));
                  return val;
                }(depsCache, `${name} :: ${dirname}`, (() => deps.has(dirname, name))) || debugLog().missingDeps.add(dep);
              }
            }, provider = factory(api, providerOptions, dirname);
            if ("function" != typeof provider[methodName]) throw new Error(`The "${provider.name || factory.name}" provider doesn't support the "${method}" polyfilling method.`);
            Array.isArray(provider.polyfills) ? (polyfillsNames = new Set(provider.polyfills), 
            filterPolyfills = provider.filterPolyfills) : provider.polyfills ? (polyfillsNames = new Set(Object.keys(provider.polyfills)), 
            polyfillsSupport = provider.polyfills, filterPolyfills = provider.filterPolyfills) : polyfillsNames = new Set;
            return ({include, exclude} = (0, _normalizeOptions.validateIncludeExclude)(provider.name || factory.name, polyfillsNames, providerOptions.include || [], providerOptions.exclude || [])), 
            {
              debug,
              method,
              targets,
              provider,
              callProvider(payload, path) {
                const utils = getUtils(path);
                provider[methodName](payload, utils, path);
              }
            };
          }(factory, options, missingDependencies, dirname, (() => debugLog), babelApi), createVisitor = "entry-global" === method ? v.entry : v.usage, visitor = provider.visitor ? traverse.visitors.merge([ createVisitor(callProvider), provider.visitor ]) : createVisitor(callProvider);
          return debug && debug !== _debugUtils.presetEnvSilentDebugHeader && (console.log(`${provider.name}: \`DEBUG\` option`), 
          console.log(`\nUsing targets: ${(0, _debugUtils.stringifyTargetsMultiline)(targets)}`), 
          console.log(`\nUsing polyfills with \`${method}\` method:`)), {
            name: "inject-polyfills",
            visitor,
            pre() {
              var _provider$pre;
              debugLog = {
                polyfills: new Map,
                found: !1,
                providers: new Set,
                missingDeps: new Set
              }, null == (_provider$pre = provider.pre) || _provider$pre.apply(this, arguments);
            },
            post() {
              var _provider$post;
              if (null == (_provider$post = provider.post) || _provider$post.apply(this, arguments), 
              !1 !== missingDependencies && ("per-file" === missingDependencies.log ? deps.logMissing(debugLog.missingDeps) : deps.laterLogMissing(debugLog.missingDeps)), 
              debug) if (this.filename && console.log(`\n[${this.filename}]`), 0 !== debugLog.polyfills.size) {
                "entry-global" === method ? console.log(`The ${provider.name} polyfill entry has been replaced with the following polyfills:`) : console.log(`The ${provider.name} polyfill added the following polyfills:`);
                for (const [name, support] of debugLog.polyfills) if (support) {
                  const filteredTargets = (0, _helperCompilationTargets.getInclusionReasons)(name, targets, support), formattedTargets = JSON.stringify(filteredTargets).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
                  console.log(`  ${name} ${formattedTargets}`);
                } else console.log(`  ${name}`);
              } else console.log("entry-global" === method ? debugLog.found ? `Based on your targets, the ${provider.name} polyfill did not add any polyfill.` : `The entry point for the ${provider.name} polyfill has not been found.` : `Based on your code and targets, the ${provider.name} polyfill did not add any polyfill.`);
            }
          };
        }));
      };
      var _helperPluginUtils = __webpack_require__(5488), _helperCompilationTargets = _interopRequireWildcard(__webpack_require__(4077)), _utils = __webpack_require__(4513), _importsCache = _interopRequireDefault(__webpack_require__(7660)), _debugUtils = __webpack_require__(9470), _normalizeOptions = __webpack_require__(1404), v = _interopRequireWildcard(__webpack_require__(7429)), deps = _interopRequireWildcard(__webpack_require__(3349)), _metaResolver = _interopRequireDefault(__webpack_require__(2821));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _getRequireWildcardCache() {
        if ("function" != typeof WeakMap) return null;
        var cache = new WeakMap;
        return _getRequireWildcardCache = function() {
          return cache;
        }, cache;
      }
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) return obj;
        if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
          default: obj
        };
        var cache = _getRequireWildcardCache();
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
        return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
      }
      const getTargets = _helperCompilationTargets.default.default || _helperCompilationTargets.default;
    },
    2821: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = function(polyfills) {
        const {static: staticP, instance: instanceP, global: globalP} = polyfills;
        return meta => {
          if ("global" === meta.kind && globalP && (0, _utils.has)(globalP, meta.name)) return {
            kind: "global",
            desc: globalP[meta.name],
            name: meta.name
          };
          if ("property" === meta.kind || "in" === meta.kind) {
            const {placement, object, key} = meta;
            if (object && "static" === placement) {
              if (globalP && PossibleGlobalObjects.has(object) && (0, _utils.has)(globalP, key)) return {
                kind: "global",
                desc: globalP[key],
                name: key
              };
              if (staticP && (0, _utils.has)(staticP, object) && (0, _utils.has)(staticP[object], key)) return {
                kind: "static",
                desc: staticP[object][key],
                name: `${object}$${key}`
              };
            }
            if (instanceP && (0, _utils.has)(instanceP, key)) return {
              kind: "instance",
              desc: instanceP[key],
              name: `${key}`
            };
          }
        };
      };
      var _utils = __webpack_require__(4513);
      const PossibleGlobalObjects = new Set([ "global", "globalThis", "self", "window" ]);
    },
    1404: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.validateIncludeExclude = function(provider, polyfills, includePatterns, excludePatterns) {
        let current;
        const filter = pattern => {
          const regexp = function(pattern) {
            if (pattern instanceof RegExp) return pattern;
            try {
              return new RegExp(`^${pattern}$`);
            } catch (_unused) {
              return null;
            }
          }(pattern);
          if (!regexp) return !1;
          let matched = !1;
          for (const polyfill of polyfills) regexp.test(polyfill) && (matched = !0, current.add(polyfill));
          return !matched;
        }, include = current = new Set, unusedInclude = Array.from(includePatterns).filter(filter), exclude = current = new Set, unusedExclude = Array.from(excludePatterns).filter(filter), duplicates = (0, 
        _utils.intersection)(include, exclude);
        if (duplicates.size > 0 || unusedInclude.length > 0 || unusedExclude.length > 0) throw new Error(`Error while validating the "${provider}" provider options:\n` + buildUnusedError("include", unusedInclude) + buildUnusedError("exclude", unusedExclude) + function(duplicates) {
          return duplicates.size ? '  - The following polyfills were matched both by "include" and "exclude" patterns:\n' + Array.from(duplicates, (name => `    ${name}\n`)).join("") : "";
        }(duplicates));
        return {
          include,
          exclude
        };
      }, exports.applyMissingDependenciesDefaults = function(options, babelApi) {
        const {missingDependencies = {}} = options;
        if (!1 === missingDependencies) return !1;
        const caller = babelApi.caller((caller => null == caller ? void 0 : caller.name)), {log = "deferred", inject = "rollup-plugin-babel" === caller ? "throw" : "import", all = !1} = missingDependencies;
        return {
          log,
          inject,
          all
        };
      };
      var _utils = __webpack_require__(4513);
      function buildUnusedError(label, unused) {
        return unused.length ? `  - The following "${label}" patterns didn't match any polyfill:\n` + unused.map((original => `    ${String(original)}\n`)).join("") : "";
      }
    },
    4513: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.intersection = function(a, b) {
        const result = new Set;
        return a.forEach((v => b.has(v) && result.add(v))), result;
      }, exports.has = function(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
      }, exports.resolveKey = function resolveKey(path, computed = !1) {
        const {node, parent, scope} = path;
        if (path.isStringLiteral()) return node.value;
        const {name} = node, isIdentifier = path.isIdentifier();
        if (isIdentifier && !computed && !parent.computed) return name;
        if (computed && path.isMemberExpression() && path.get("object").isIdentifier({
          name: "Symbol"
        }) && !scope.hasBinding("Symbol", !0)) {
          const sym = resolveKey(path.get("property"), path.node.computed);
          if (sym) return "Symbol." + sym;
        }
        if (!isIdentifier || scope.hasBinding(name, !0)) {
          const {value} = path.evaluate();
          if ("string" == typeof value) return value;
        }
      }, exports.resolveSource = function(obj) {
        if (obj.isMemberExpression() && obj.get("property").isIdentifier({
          name: "prototype"
        })) {
          const id = resolveId(obj.get("object"));
          return id ? {
            id,
            placement: "prototype"
          } : {
            id: null,
            placement: null
          };
        }
        const id = resolveId(obj);
        if (id) return {
          id,
          placement: "static"
        };
        const {value} = obj.evaluate();
        if (void 0 !== value) return {
          id: (target = value, Object.prototype.toString.call(target).slice(8, -1)),
          placement: "prototype"
        };
        if (obj.isRegExpLiteral()) return {
          id: "RegExp",
          placement: "prototype"
        };
        if (obj.isFunction()) return {
          id: "Function",
          placement: "prototype"
        };
        var target;
        return {
          id: null,
          placement: null
        };
      }, exports.getImportSource = function({node}) {
        if (0 === node.specifiers.length) return node.source.value;
      }, exports.getRequireSource = function({node}) {
        if (!t.isExpressionStatement(node)) return;
        const {expression} = node;
        if (t.isCallExpression(expression) && t.isIdentifier(expression.callee) && "require" === expression.callee.name && 1 === expression.arguments.length && t.isStringLiteral(expression.arguments[0])) return expression.arguments[0].value;
      }, exports.createUtilsGetter = function(cache) {
        return path => {
          const prog = path.findParent((p => p.isProgram()));
          return {
            injectGlobalImport(url) {
              cache.storeAnonymous(prog, url, ((isScript, source) => isScript ? template.statement.ast`require(${source})` : t.importDeclaration([], source)));
            },
            injectNamedImport: (url, name, hint = name) => cache.storeNamed(prog, url, name, ((isScript, source, name) => {
              const id = prog.scope.generateUidIdentifier(hint);
              return {
                node: isScript ? hoist(template.statement.ast`
                  var ${id} = require(${source}).${name}
                `) : t.importDeclaration([ t.importSpecifier(id, name) ], source),
                name: id.name
              };
            })),
            injectDefaultImport: (url, hint = url) => cache.storeNamed(prog, url, "default", ((isScript, source) => {
              const id = prog.scope.generateUidIdentifier(hint);
              return {
                node: isScript ? hoist(template.statement.ast`var ${id} = require(${source})`) : t.importDeclaration([ t.importDefaultSpecifier(id) ], source),
                name: id.name
              };
            }))
          };
        };
      };
      var babel = function(obj) {
        if (obj && obj.__esModule) return obj;
        if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
          default: obj
        };
        var cache = _getRequireWildcardCache();
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
        newObj.default = obj, cache && cache.set(obj, newObj);
        return newObj;
      }(__webpack_require__(4629));
      function _getRequireWildcardCache() {
        if ("function" != typeof WeakMap) return null;
        var cache = new WeakMap;
        return _getRequireWildcardCache = function() {
          return cache;
        }, cache;
      }
      const {types: t, template} = babel.default || babel;
      function resolveId(path) {
        if (path.isIdentifier() && !path.scope.hasBinding(path.node.name, !0)) return path.node.name;
        const {deopt} = path.evaluate();
        return deopt && deopt.isIdentifier() ? deopt.node.name : void 0;
      }
      function hoist(node) {
        return node._blockHoist = 3, node;
      }
    },
    9184: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var _utils = __webpack_require__(4513);
      exports.default = callProvider => ({
        ImportDeclaration(path) {
          const source = (0, _utils.getImportSource)(path);
          source && callProvider({
            kind: "import",
            source
          }, path);
        },
        Program(path) {
          path.get("body").forEach((bodyPath => {
            const source = (0, _utils.getRequireSource)(bodyPath);
            source && callProvider({
              kind: "import",
              source
            }, bodyPath);
          }));
        }
      });
    },
    7429: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.entry = exports.usage = void 0;
      var _usage = _interopRequireDefault(__webpack_require__(2895));
      exports.usage = _usage.default;
      var _entry = _interopRequireDefault(__webpack_require__(9184));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      exports.entry = _entry.default;
    },
    2895: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var _utils = __webpack_require__(4513);
      exports.default = callProvider => {
        function property(object, key, placement, path) {
          return callProvider({
            kind: "property",
            object,
            key,
            placement
          }, path);
        }
        return {
          ReferencedIdentifier(path) {
            const {node: {name}, scope} = path;
            scope.getBindingIdentifier(name) || callProvider({
              kind: "global",
              name
            }, path);
          },
          MemberExpression(path) {
            const key = (0, _utils.resolveKey)(path.get("property"), path.node.computed);
            if (!key || "prototype" === key) return;
            const object = path.get("object"), binding = object.scope.getBinding(object.node.name);
            if (binding && binding.path.isImportNamespaceSpecifier()) return;
            const source = (0, _utils.resolveSource)(object);
            return property(source.id, key, source.placement, path);
          },
          ObjectPattern(path) {
            const {parentPath, parent} = path;
            let obj;
            if (parentPath.isVariableDeclarator()) obj = parentPath.get("init"); else if (parentPath.isAssignmentExpression()) obj = parentPath.get("right"); else if (parentPath.isFunction()) {
              const grand = parentPath.parentPath;
              (grand.isCallExpression() || grand.isNewExpression()) && grand.node.callee === parent && (obj = grand.get("arguments")[path.key]);
            }
            let id = null, placement = null;
            obj && ({id, placement} = (0, _utils.resolveSource)(obj));
            for (const prop of path.get("properties")) if (prop.isObjectProperty()) {
              const key = (0, _utils.resolveKey)(prop.get("key"));
              key && property(id, key, placement, prop);
            }
          },
          BinaryExpression(path) {
            if ("in" !== path.node.operator) return;
            const source = (0, _utils.resolveSource)(path.get("right")), key = (0, _utils.resolveKey)(path.get("left"), !0);
            key && callProvider({
              kind: "in",
              object: source.id,
              key,
              placement: source.placement
            }, path);
          }
        };
      };
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
    9279: module => {
      const proposalPlugins = new Set, pluginSyntaxObject = {
        "proposal-async-generator-functions": "syntax-async-generators",
        "proposal-class-properties": "syntax-class-properties",
        "proposal-class-static-block": "syntax-class-static-block",
        "proposal-json-strings": "syntax-json-strings",
        "proposal-nullish-coalescing-operator": "syntax-nullish-coalescing-operator",
        "proposal-numeric-separator": "syntax-numeric-separator",
        "proposal-object-rest-spread": "syntax-object-rest-spread",
        "proposal-optional-catch-binding": "syntax-optional-catch-binding",
        "proposal-optional-chaining": "syntax-optional-chaining",
        "proposal-private-methods": "syntax-class-properties",
        "proposal-private-property-in-object": "syntax-private-property-in-object",
        "proposal-unicode-property-regex": null
      }, pluginSyntaxEntries = Object.keys(pluginSyntaxObject).map((function(key) {
        return [ key, pluginSyntaxObject[key] ];
      })), pluginSyntaxMap = new Map(pluginSyntaxEntries);
      module.exports = {
        pluginSyntaxMap,
        proposalPlugins
      };
    },
    2751: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.minVersions = exports.default = void 0;
      var _pluginSyntaxAsyncGenerators = __webpack_require__(5906), _pluginSyntaxClassProperties = __webpack_require__(7858), _pluginSyntaxClassStaticBlock = __webpack_require__(5401), _pluginSyntaxDynamicImport = __webpack_require__(136), _pluginSyntaxExportNamespaceFrom = __webpack_require__(5732), _pluginSyntaxJsonStrings = __webpack_require__(8593), _pluginSyntaxLogicalAssignmentOperators = __webpack_require__(3871), _pluginSyntaxNullishCoalescingOperator = __webpack_require__(7797), _pluginSyntaxNumericSeparator = __webpack_require__(1901), _pluginSyntaxObjectRestSpread = __webpack_require__(1976), _pluginSyntaxOptionalCatchBinding = __webpack_require__(3117), _pluginSyntaxOptionalChaining = __webpack_require__(5111), _pluginSyntaxPrivatePropertyInObject = __webpack_require__(65), _pluginSyntaxTopLevelAwait = __webpack_require__(4364), _pluginProposalAsyncGeneratorFunctions = __webpack_require__(6560), _pluginProposalClassProperties = __webpack_require__(1957), _pluginProposalClassStaticBlock = __webpack_require__(1131), _pluginProposalDynamicImport = __webpack_require__(4750), _pluginProposalExportNamespaceFrom = __webpack_require__(4363), _pluginProposalJsonStrings = __webpack_require__(8464), _pluginProposalLogicalAssignmentOperators = __webpack_require__(7051), _pluginProposalNullishCoalescingOperator = __webpack_require__(1611), _pluginProposalNumericSeparator = __webpack_require__(9967), _pluginProposalObjectRestSpread = __webpack_require__(2073), _pluginProposalOptionalCatchBinding = __webpack_require__(2496), _pluginProposalOptionalChaining = __webpack_require__(6437), _pluginProposalPrivateMethods = __webpack_require__(4667), _pluginProposalPrivatePropertyInObject = __webpack_require__(8828), _pluginProposalUnicodePropertyRegex = __webpack_require__(2245), _pluginTransformAsyncToGenerator = __webpack_require__(45), _pluginTransformArrowFunctions = __webpack_require__(7929), _pluginTransformBlockScopedFunctions = __webpack_require__(7942), _pluginTransformBlockScoping = __webpack_require__(4597), _pluginTransformClasses = __webpack_require__(8031), _pluginTransformComputedProperties = __webpack_require__(4041), _pluginTransformDestructuring = __webpack_require__(7503), _pluginTransformDotallRegex = __webpack_require__(8817), _pluginTransformDuplicateKeys = __webpack_require__(5440), _pluginTransformExponentiationOperator = __webpack_require__(8010), _pluginTransformForOf = __webpack_require__(5394), _pluginTransformFunctionName = __webpack_require__(3406), _pluginTransformLiterals = __webpack_require__(2839), _pluginTransformMemberExpressionLiterals = __webpack_require__(9762), _pluginTransformModulesAmd = __webpack_require__(9333), _pluginTransformModulesCommonjs = __webpack_require__(8991), _pluginTransformModulesSystemjs = __webpack_require__(3837), _pluginTransformModulesUmd = __webpack_require__(9694), _pluginTransformNamedCapturingGroupsRegex = __webpack_require__(582), _pluginTransformNewTarget = __webpack_require__(8922), _pluginTransformObjectSuper = __webpack_require__(5319), _pluginTransformParameters = __webpack_require__(3729), _pluginTransformPropertyLiterals = __webpack_require__(3672), _pluginTransformRegenerator = __webpack_require__(5642), _pluginTransformReservedWords = __webpack_require__(424), _pluginTransformShorthandProperties = __webpack_require__(7386), _pluginTransformSpread = __webpack_require__(1241), _pluginTransformStickyRegex = __webpack_require__(7764), _pluginTransformTemplateLiterals = __webpack_require__(268), _pluginTransformTypeofSymbol = __webpack_require__(944), _pluginTransformUnicodeEscapes = __webpack_require__(420), _pluginTransformUnicodeRegex = __webpack_require__(913), _transformAsyncArrowsInClass = __webpack_require__(5252), _transformEdgeDefaultParameters = __webpack_require__(1841), _transformEdgeFunctionName = __webpack_require__(2292), _transformTaggedTemplateCaching = __webpack_require__(1218), _transformSafariBlockShadowing = __webpack_require__(6916), _transformSafariForShadowing = __webpack_require__(4740), _pluginBugfixSafariIdDestructuringCollisionInFunctionExpression = __webpack_require__(676), _pluginBugfixV8SpreadParametersInOptionalChaining = __webpack_require__(3098), _default = {
        "bugfix/transform-async-arrows-in-class": () => _transformAsyncArrowsInClass,
        "bugfix/transform-edge-default-parameters": () => _transformEdgeDefaultParameters,
        "bugfix/transform-edge-function-name": () => _transformEdgeFunctionName,
        "bugfix/transform-safari-block-shadowing": () => _transformSafariBlockShadowing,
        "bugfix/transform-safari-for-shadowing": () => _transformSafariForShadowing,
        "bugfix/transform-safari-id-destructuring-collision-in-function-expression": () => _pluginBugfixSafariIdDestructuringCollisionInFunctionExpression.default,
        "bugfix/transform-tagged-template-caching": () => _transformTaggedTemplateCaching,
        "bugfix/transform-v8-spread-parameters-in-optional-chaining": () => _pluginBugfixV8SpreadParametersInOptionalChaining.default,
        "proposal-async-generator-functions": () => _pluginProposalAsyncGeneratorFunctions.default,
        "proposal-class-properties": () => _pluginProposalClassProperties.default,
        "proposal-class-static-block": () => _pluginProposalClassStaticBlock.default,
        "proposal-dynamic-import": () => _pluginProposalDynamicImport.default,
        "proposal-export-namespace-from": () => _pluginProposalExportNamespaceFrom.default,
        "proposal-json-strings": () => _pluginProposalJsonStrings.default,
        "proposal-logical-assignment-operators": () => _pluginProposalLogicalAssignmentOperators.default,
        "proposal-nullish-coalescing-operator": () => _pluginProposalNullishCoalescingOperator.default,
        "proposal-numeric-separator": () => _pluginProposalNumericSeparator.default,
        "proposal-object-rest-spread": () => _pluginProposalObjectRestSpread.default,
        "proposal-optional-catch-binding": () => _pluginProposalOptionalCatchBinding.default,
        "proposal-optional-chaining": () => _pluginProposalOptionalChaining.default,
        "proposal-private-methods": () => _pluginProposalPrivateMethods.default,
        "proposal-private-property-in-object": () => _pluginProposalPrivatePropertyInObject.default,
        "proposal-unicode-property-regex": () => _pluginProposalUnicodePropertyRegex.default,
        "syntax-async-generators": () => _pluginSyntaxAsyncGenerators,
        "syntax-class-properties": () => _pluginSyntaxClassProperties,
        "syntax-class-static-block": () => _pluginSyntaxClassStaticBlock,
        "syntax-dynamic-import": () => _pluginSyntaxDynamicImport,
        "syntax-export-namespace-from": () => _pluginSyntaxExportNamespaceFrom,
        "syntax-json-strings": () => _pluginSyntaxJsonStrings,
        "syntax-logical-assignment-operators": () => _pluginSyntaxLogicalAssignmentOperators,
        "syntax-nullish-coalescing-operator": () => _pluginSyntaxNullishCoalescingOperator,
        "syntax-numeric-separator": () => _pluginSyntaxNumericSeparator,
        "syntax-object-rest-spread": () => _pluginSyntaxObjectRestSpread,
        "syntax-optional-catch-binding": () => _pluginSyntaxOptionalCatchBinding,
        "syntax-optional-chaining": () => _pluginSyntaxOptionalChaining,
        "syntax-private-property-in-object": () => _pluginSyntaxPrivatePropertyInObject,
        "syntax-top-level-await": () => _pluginSyntaxTopLevelAwait,
        "transform-arrow-functions": () => _pluginTransformArrowFunctions.default,
        "transform-async-to-generator": () => _pluginTransformAsyncToGenerator.default,
        "transform-block-scoped-functions": () => _pluginTransformBlockScopedFunctions.default,
        "transform-block-scoping": () => _pluginTransformBlockScoping.default,
        "transform-classes": () => _pluginTransformClasses.default,
        "transform-computed-properties": () => _pluginTransformComputedProperties.default,
        "transform-destructuring": () => _pluginTransformDestructuring.default,
        "transform-dotall-regex": () => _pluginTransformDotallRegex.default,
        "transform-duplicate-keys": () => _pluginTransformDuplicateKeys.default,
        "transform-exponentiation-operator": () => _pluginTransformExponentiationOperator.default,
        "transform-for-of": () => _pluginTransformForOf.default,
        "transform-function-name": () => _pluginTransformFunctionName.default,
        "transform-literals": () => _pluginTransformLiterals.default,
        "transform-member-expression-literals": () => _pluginTransformMemberExpressionLiterals.default,
        "transform-modules-amd": () => _pluginTransformModulesAmd.default,
        "transform-modules-commonjs": () => _pluginTransformModulesCommonjs.default,
        "transform-modules-systemjs": () => _pluginTransformModulesSystemjs.default,
        "transform-modules-umd": () => _pluginTransformModulesUmd.default,
        "transform-named-capturing-groups-regex": () => _pluginTransformNamedCapturingGroupsRegex.default,
        "transform-new-target": () => _pluginTransformNewTarget.default,
        "transform-object-super": () => _pluginTransformObjectSuper.default,
        "transform-parameters": () => _pluginTransformParameters.default,
        "transform-property-literals": () => _pluginTransformPropertyLiterals.default,
        "transform-regenerator": () => _pluginTransformRegenerator.default,
        "transform-reserved-words": () => _pluginTransformReservedWords.default,
        "transform-shorthand-properties": () => _pluginTransformShorthandProperties.default,
        "transform-spread": () => _pluginTransformSpread.default,
        "transform-sticky-regex": () => _pluginTransformStickyRegex.default,
        "transform-template-literals": () => _pluginTransformTemplateLiterals.default,
        "transform-typeof-symbol": () => _pluginTransformTypeofSymbol.default,
        "transform-unicode-escapes": () => _pluginTransformUnicodeEscapes.default,
        "transform-unicode-regex": () => _pluginTransformUnicodeRegex.default
      };
      exports.default = _default;
      exports.minVersions = {
        "bugfix/transform-safari-id-destructuring-collision-in-function-expression": "7.16.0",
        "proposal-class-static-block": "7.12.0",
        "proposal-private-property-in-object": "7.10.0"
      };
    },
    2157: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.logPlugin = void 0;
      var _helperCompilationTargets = __webpack_require__(4077);
      exports.logPlugin = (item, targetVersions, list) => {
        const filteredList = (0, _helperCompilationTargets.getInclusionReasons)(item, targetVersions, list), support = list[item];
        if (!support) return void console.log(`  ${item}`);
        let formattedTargets = "{", first = !0;
        for (const target of Object.keys(filteredList)) first || (formattedTargets += ","), 
        first = !1, formattedTargets += ` ${target}`, support[target] && (formattedTargets += ` < ${support[target]}`);
        formattedTargets += " }", console.log(`  ${item} ${formattedTargets}`);
      };
    },
    8502: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.removeUnnecessaryItems = function(items, overlapping) {
        items.forEach((item => {
          var _overlapping$item;
          null == (_overlapping$item = overlapping[item]) || _overlapping$item.forEach((name => items.delete(name)));
        }));
      }, exports.removeUnsupportedItems = function(items, babelVersion) {
        items.forEach((item => {
          has(_availablePlugins.minVersions, item) && (0, _semver.lt)(babelVersion, _availablePlugins.minVersions[item]) && items.delete(item);
        }));
      };
      var _semver = __webpack_require__(5870), _availablePlugins = __webpack_require__(2751);
      const has = Function.call.bind(Object.hasOwnProperty);
    },
    6015: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function({loose}) {
        return loose ? defaultExcludesForLooseMode : null;
      };
      const defaultExcludesForLooseMode = [ "transform-typeof-symbol" ];
    },
    1049: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      exports.default = {
        auto: "transform-modules-commonjs",
        amd: "transform-modules-amd",
        commonjs: "transform-modules-commonjs",
        cjs: "transform-modules-commonjs",
        systemjs: "transform-modules-systemjs",
        umd: "transform-modules-umd"
      };
    },
    3668: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.checkDuplicateIncludeExcludes = void 0, exports.default = function(opts) {
        v.validateTopLevelOptions(opts, _options.TopLevelOptions);
        const useBuiltIns = validateUseBuiltInsOption(opts.useBuiltIns), corejs = normalizeCoreJSOption(opts.corejs, useBuiltIns), include = expandIncludesAndExcludes(opts.include, _options.TopLevelOptions.include, !!corejs.version && corejs.version.major), exclude = expandIncludesAndExcludes(opts.exclude, _options.TopLevelOptions.exclude, !!corejs.version && corejs.version.major);
        return checkDuplicateIncludeExcludes(include, exclude), {
          bugfixes: v.validateBooleanOption(_options.TopLevelOptions.bugfixes, opts.bugfixes, !1),
          configPath: v.validateStringOption(_options.TopLevelOptions.configPath, opts.configPath, process.cwd()),
          corejs,
          debug: v.validateBooleanOption(_options.TopLevelOptions.debug, opts.debug, !1),
          include,
          exclude,
          forceAllTransforms: v.validateBooleanOption(_options.TopLevelOptions.forceAllTransforms, opts.forceAllTransforms, !1),
          ignoreBrowserslistConfig: v.validateBooleanOption(_options.TopLevelOptions.ignoreBrowserslistConfig, opts.ignoreBrowserslistConfig, !1),
          loose: v.validateBooleanOption(_options.TopLevelOptions.loose, opts.loose),
          modules: validateModulesOption(opts.modules),
          shippedProposals: v.validateBooleanOption(_options.TopLevelOptions.shippedProposals, opts.shippedProposals, !1),
          spec: v.validateBooleanOption(_options.TopLevelOptions.spec, opts.spec, !1),
          targets: normalizeTargets(opts.targets),
          useBuiltIns,
          browserslistEnv: v.validateStringOption(_options.TopLevelOptions.browserslistEnv, opts.browserslistEnv)
        };
      }, exports.normalizeCoreJSOption = normalizeCoreJSOption, exports.validateUseBuiltInsOption = exports.validateModulesOption = exports.normalizePluginName = void 0;
      var _data = __webpack_require__(6578), _semver = __webpack_require__(5870), _corejs2BuiltIns = __webpack_require__(4817), _pluginsCompatData = __webpack_require__(4600), _moduleTransformations = __webpack_require__(1049), _options = __webpack_require__(2524), _helperValidatorOption = __webpack_require__(4346);
      const corejs2DefaultWebIncludes = [ "web.timers", "web.immediate", "web.dom.iterable" ], v = new _helperValidatorOption.OptionValidator("@babel/preset-env"), allPluginsList = Object.keys(_pluginsCompatData.plugins), modulePlugins = [ "proposal-dynamic-import", ...Object.keys(_moduleTransformations.default).map((m => _moduleTransformations.default[m])) ], selectPlugins = (regexp, type, corejs) => Array.from(((type, corejs) => new Set([ ...allPluginsList, ..."exclude" === type ? modulePlugins : [], ...corejs ? 2 == corejs ? [ ...Object.keys(_corejs2BuiltIns), ...corejs2DefaultWebIncludes ] : Object.keys(_data) : [] ]))(type, corejs)).filter((item => regexp instanceof RegExp && regexp.test(item))), expandIncludesAndExcludes = (plugins = [], type, corejs) => {
        if (0 === plugins.length) return [];
        const selectedPlugins = plugins.map((plugin => selectPlugins((plugin => {
          if (plugin instanceof RegExp) return plugin;
          try {
            return new RegExp(`^${normalizePluginName(plugin)}$`);
          } catch (e) {
            return null;
          }
        })(plugin), type, corejs))), invalidRegExpList = plugins.filter(((p, i) => 0 === selectedPlugins[i].length));
        return v.invariant(0 === invalidRegExpList.length, `The plugins/built-ins '${invalidRegExpList.join(", ")}' passed to the '${type}' option are not\n    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`), 
        array = selectedPlugins, [].concat(...array);
        var array;
      }, normalizePluginName = plugin => plugin.replace(/^(@babel\/|babel-)(plugin-)?/, "");
      exports.normalizePluginName = normalizePluginName;
      const checkDuplicateIncludeExcludes = (include = [], exclude = []) => {
        const duplicates = include.filter((opt => exclude.indexOf(opt) >= 0));
        v.invariant(0 === duplicates.length, `The plugins/built-ins '${duplicates.join(", ")}' were found in both the "include" and\n    "exclude" options.`);
      };
      exports.checkDuplicateIncludeExcludes = checkDuplicateIncludeExcludes;
      const normalizeTargets = targets => "string" == typeof targets || Array.isArray(targets) ? {
        browsers: targets
      } : Object.assign({}, targets), validateModulesOption = (modulesOpt = _options.ModulesOption.auto) => (v.invariant(_options.ModulesOption[modulesOpt.toString()] || modulesOpt === _options.ModulesOption.false, "The 'modules' option must be one of \n - 'false' to indicate no module processing\n - a specific module type: 'commonjs', 'amd', 'umd', 'systemjs' - 'auto' (default) which will automatically select 'false' if the current\n   process is known to support ES module syntax, or \"commonjs\" otherwise\n"), 
      modulesOpt);
      exports.validateModulesOption = validateModulesOption;
      const validateUseBuiltInsOption = (builtInsOpt = !1) => (v.invariant(_options.UseBuiltInsOption[builtInsOpt.toString()] || builtInsOpt === _options.UseBuiltInsOption.false, "The 'useBuiltIns' option must be either\n    'false' (default) to indicate no polyfill,\n    '\"entry\"' to indicate replacing the entry polyfill, or\n    '\"usage\"' to import only used polyfills per file"), 
      builtInsOpt);
      function normalizeCoreJSOption(corejs, useBuiltIns) {
        let rawVersion, proposals = !1;
        useBuiltIns && void 0 === corejs ? (rawVersion = 2, console.warn("\nWARNING (@babel/preset-env): We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.\n\nYou should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:\n\n  npm install --save core-js@2    npm install --save core-js@3\n  yarn add core-js@2              yarn add core-js@3\n\nMore info about useBuiltIns: https://babeljs.io/docs/en/babel-preset-env#usebuiltins\nMore info about core-js: https://babeljs.io/docs/en/babel-preset-env#corejs")) : "object" == typeof corejs && null !== corejs ? (rawVersion = corejs.version, 
        proposals = Boolean(corejs.proposals)) : rawVersion = corejs;
        const version = !!rawVersion && (0, _semver.coerce)(String(rawVersion));
        if (!useBuiltIns && version && console.warn("\nWARNING (@babel/preset-env): The `corejs` option only has an effect when the `useBuiltIns` option is not `false`\n"), 
        useBuiltIns && (!version || version.major < 2 || version.major > 3)) throw new RangeError("Invalid Option: The version passed to `corejs` is invalid. Currently, only core-js@2 and core-js@3 are supported.");
        return {
          version,
          proposals
        };
      }
      exports.validateUseBuiltInsOption = validateUseBuiltInsOption;
    },
    2524: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.UseBuiltInsOption = exports.TopLevelOptions = exports.ModulesOption = void 0;
      exports.TopLevelOptions = {
        bugfixes: "bugfixes",
        configPath: "configPath",
        corejs: "corejs",
        debug: "debug",
        exclude: "exclude",
        forceAllTransforms: "forceAllTransforms",
        ignoreBrowserslistConfig: "ignoreBrowserslistConfig",
        include: "include",
        loose: "loose",
        modules: "modules",
        shippedProposals: "shippedProposals",
        spec: "spec",
        targets: "targets",
        useBuiltIns: "useBuiltIns",
        browserslistEnv: "browserslistEnv"
      };
      exports.ModulesOption = {
        false: !1,
        auto: "auto",
        amd: "amd",
        commonjs: "commonjs",
        cjs: "cjs",
        systemjs: "systemjs",
        umd: "umd"
      };
      exports.UseBuiltInsOption = {
        false: !1,
        entry: "entry",
        usage: "usage"
      };
    },
    4600: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.pluginsBugfixes = exports.plugins = void 0;
      var _plugins = __webpack_require__(7867), _pluginBugfixes = __webpack_require__(4374), _availablePlugins = __webpack_require__(2751);
      const pluginsFiltered = {};
      exports.plugins = pluginsFiltered;
      const bugfixPluginsFiltered = {};
      exports.pluginsBugfixes = bugfixPluginsFiltered;
      for (const plugin of Object.keys(_plugins)) Object.hasOwnProperty.call(_availablePlugins.default, plugin) && (pluginsFiltered[plugin] = _plugins[plugin]);
      for (const plugin of Object.keys(_pluginBugfixes)) Object.hasOwnProperty.call(_availablePlugins.default, plugin) && (bugfixPluginsFiltered[plugin] = _pluginBugfixes[plugin]);
    },
    9462: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function({template}, {regenerator, deprecated, usage}) {
        return {
          name: "preset-env/replace-babel-polyfill",
          visitor: {
            ImportDeclaration(path) {
              const src = (0, _utils.getImportSource)(path);
              usage && (0, _utils.isPolyfillSource)(src) ? (console.warn(NO_DIRECT_POLYFILL_IMPORT.replace("SPECIFIER", src)), 
              deprecated || path.remove()) : "@babel/polyfill" === src && (deprecated ? console.warn(BABEL_POLYFILL_DEPRECATION) : regenerator ? path.replaceWithMultiple(template.ast`
              import "core-js";
              import "regenerator-runtime/runtime.js";
            `) : path.replaceWith(template.ast`
              import "core-js";
            `));
            },
            Program(path) {
              path.get("body").forEach((bodyPath => {
                const src = (0, _utils.getRequireSource)(bodyPath);
                usage && (0, _utils.isPolyfillSource)(src) ? (console.warn(NO_DIRECT_POLYFILL_IMPORT.replace("SPECIFIER", src)), 
                deprecated || bodyPath.remove()) : "@babel/polyfill" === src && (deprecated ? console.warn(BABEL_POLYFILL_DEPRECATION) : regenerator ? bodyPath.replaceWithMultiple(template.ast`
                require("core-js");
                require("regenerator-runtime/runtime.js");
              `) : bodyPath.replaceWith(template.ast`
                require("core-js");
              `));
              }));
            }
          }
        };
      };
      var _utils = __webpack_require__(8474);
      const BABEL_POLYFILL_DEPRECATION = "\n  `@babel/polyfill` is deprecated. Please, use required parts of `core-js`\n  and `regenerator-runtime/runtime` separately", NO_DIRECT_POLYFILL_IMPORT = "\n  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.\n  Please remove the direct import of `SPECIFIER` or use `useBuiltIns: 'entry'` instead.";
    },
    3893: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function() {
        return {
          name: "preset-env/remove-regenerator",
          visitor: {
            ImportDeclaration(path) {
              isRegeneratorSource((0, _utils.getImportSource)(path)) && (this.regeneratorImportExcluded = !0, 
              path.remove());
            },
            Program(path) {
              path.get("body").forEach((bodyPath => {
                isRegeneratorSource((0, _utils.getRequireSource)(bodyPath)) && (this.regeneratorImportExcluded = !0, 
                bodyPath.remove());
              }));
            }
          },
          pre() {
            this.regeneratorImportExcluded = !1;
          },
          post() {
            if (this.opts.debug && this.regeneratorImportExcluded) {
              let filename = this.file.opts.filename;
              "test" === process.env.BABEL_ENV && (filename = filename.replace(/\\/g, "/")), console.log(`\n[${filename}] Based on your targets, regenerator-runtime import excluded.`);
            }
          }
        };
      };
      var _utils = __webpack_require__(8474);
      function isRegeneratorSource(source) {
        return "regenerator-runtime/runtime" === source || "regenerator-runtime/runtime.js" === source;
      }
    },
    8474: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.getImportSource = function({node}) {
        if (0 === node.specifiers.length) return node.source.value;
      }, exports.getRequireSource = function({node}) {
        if (!isExpressionStatement(node)) return;
        const {expression} = node;
        if (isCallExpression(expression) && isIdentifier(expression.callee) && "require" === expression.callee.name && 1 === expression.arguments.length && isStringLiteral(expression.arguments[0])) return expression.arguments[0].value;
      }, exports.isPolyfillSource = function(source) {
        return "@babel/polyfill" === source || "core-js" === source;
      };
      var _t = __webpack_require__(8459);
      const {isCallExpression, isExpressionStatement, isIdentifier, isStringLiteral} = _t;
    },
    9869: (__unused_webpack_module, exports) => {
      "use strict";
      function _extends() {
        return _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
          }
          return target;
        }, _extends.apply(this, arguments);
      }
      exports.__esModule = !0, exports.default = function(targets, method, polyfills) {
        const targetNames = Object.keys(targets), isAnyTarget = !targetNames.length, isWebTarget = targetNames.some((name => "node" !== name));
        return _extends({}, polyfills, "usage-pure" === method ? purePolyfills : null, isAnyTarget || isWebTarget ? webPolyfills : null);
      };
      const webPolyfills = {
        "web.timers": {},
        "web.immediate": {},
        "web.dom.iterable": {}
      }, purePolyfills = {
        "es6.parse-float": {},
        "es6.parse-int": {},
        "es7.string.at": {}
      };
    },
    9479: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = exports.CommonIterators = void 0;
      var obj, _corejs2BuiltIns = (obj = __webpack_require__(4817)) && obj.__esModule ? obj : {
        default: obj
      };
      const define = (name, pure, global = [], meta) => ({
        name,
        pure,
        global,
        meta
      }), pureAndGlobal = (pure, global, minRuntimeVersion = null) => define(global[0], pure, global, {
        minRuntimeVersion
      }), globalOnly = global => define(global[0], null, global), pureOnly = (pure, name) => define(name, pure, []), ArrayNatureIterators = [ "es6.object.to-string", "es6.array.iterator", "web.dom.iterable" ], CommonIterators = [ "es6.string.iterator", ...ArrayNatureIterators ];
      exports.CommonIterators = CommonIterators;
      const PromiseDependencies = [ "es6.object.to-string", "es6.promise" ], BuiltIns = {
        DataView: globalOnly([ "es6.typed.data-view" ]),
        Float32Array: globalOnly([ "es6.typed.float32-array" ]),
        Float64Array: globalOnly([ "es6.typed.float64-array" ]),
        Int8Array: globalOnly([ "es6.typed.int8-array" ]),
        Int16Array: globalOnly([ "es6.typed.int16-array" ]),
        Int32Array: globalOnly([ "es6.typed.int32-array" ]),
        Map: pureAndGlobal("map", [ "es6.map", ...CommonIterators ]),
        Number: globalOnly([ "es6.number.constructor" ]),
        Promise: pureAndGlobal("promise", PromiseDependencies),
        RegExp: globalOnly([ "es6.regexp.constructor" ]),
        Set: pureAndGlobal("set", [ "es6.set", ...CommonIterators ]),
        Symbol: pureAndGlobal("symbol", [ "es6.symbol" ]),
        Uint8Array: globalOnly([ "es6.typed.uint8-array" ]),
        Uint8ClampedArray: globalOnly([ "es6.typed.uint8-clamped-array" ]),
        Uint16Array: globalOnly([ "es6.typed.uint16-array" ]),
        Uint32Array: globalOnly([ "es6.typed.uint32-array" ]),
        WeakMap: pureAndGlobal("weak-map", [ "es6.weak-map", ...CommonIterators ]),
        WeakSet: pureAndGlobal("weak-set", [ "es6.weak-set", ...CommonIterators ]),
        setImmediate: pureOnly("set-immediate", "web.immediate"),
        clearImmediate: pureOnly("clear-immediate", "web.immediate"),
        parseFloat: pureOnly("parse-float", "es6.parse-float"),
        parseInt: pureOnly("parse-int", "es6.parse-int")
      };
      exports.BuiltIns = BuiltIns;
      const InstanceProperties = {
        __defineGetter__: globalOnly([ "es7.object.define-getter" ]),
        __defineSetter__: globalOnly([ "es7.object.define-setter" ]),
        __lookupGetter__: globalOnly([ "es7.object.lookup-getter" ]),
        __lookupSetter__: globalOnly([ "es7.object.lookup-setter" ]),
        anchor: globalOnly([ "es6.string.anchor" ]),
        big: globalOnly([ "es6.string.big" ]),
        bind: globalOnly([ "es6.function.bind" ]),
        blink: globalOnly([ "es6.string.blink" ]),
        bold: globalOnly([ "es6.string.bold" ]),
        codePointAt: globalOnly([ "es6.string.code-point-at" ]),
        copyWithin: globalOnly([ "es6.array.copy-within" ]),
        endsWith: globalOnly([ "es6.string.ends-with" ]),
        entries: globalOnly(ArrayNatureIterators),
        every: globalOnly([ "es6.array.every" ]),
        fill: globalOnly([ "es6.array.fill" ]),
        filter: globalOnly([ "es6.array.filter" ]),
        finally: globalOnly([ "es7.promise.finally", ...PromiseDependencies ]),
        find: globalOnly([ "es6.array.find" ]),
        findIndex: globalOnly([ "es6.array.find-index" ]),
        fixed: globalOnly([ "es6.string.fixed" ]),
        flags: globalOnly([ "es6.regexp.flags" ]),
        flatMap: globalOnly([ "es7.array.flat-map" ]),
        fontcolor: globalOnly([ "es6.string.fontcolor" ]),
        fontsize: globalOnly([ "es6.string.fontsize" ]),
        forEach: globalOnly([ "es6.array.for-each" ]),
        includes: globalOnly([ "es6.string.includes", "es7.array.includes" ]),
        indexOf: globalOnly([ "es6.array.index-of" ]),
        italics: globalOnly([ "es6.string.italics" ]),
        keys: globalOnly(ArrayNatureIterators),
        lastIndexOf: globalOnly([ "es6.array.last-index-of" ]),
        link: globalOnly([ "es6.string.link" ]),
        map: globalOnly([ "es6.array.map" ]),
        match: globalOnly([ "es6.regexp.match" ]),
        name: globalOnly([ "es6.function.name" ]),
        padStart: globalOnly([ "es7.string.pad-start" ]),
        padEnd: globalOnly([ "es7.string.pad-end" ]),
        reduce: globalOnly([ "es6.array.reduce" ]),
        reduceRight: globalOnly([ "es6.array.reduce-right" ]),
        repeat: globalOnly([ "es6.string.repeat" ]),
        replace: globalOnly([ "es6.regexp.replace" ]),
        search: globalOnly([ "es6.regexp.search" ]),
        small: globalOnly([ "es6.string.small" ]),
        some: globalOnly([ "es6.array.some" ]),
        sort: globalOnly([ "es6.array.sort" ]),
        split: globalOnly([ "es6.regexp.split" ]),
        startsWith: globalOnly([ "es6.string.starts-with" ]),
        strike: globalOnly([ "es6.string.strike" ]),
        sub: globalOnly([ "es6.string.sub" ]),
        sup: globalOnly([ "es6.string.sup" ]),
        toISOString: globalOnly([ "es6.date.to-iso-string" ]),
        toJSON: globalOnly([ "es6.date.to-json" ]),
        toString: globalOnly([ "es6.object.to-string", "es6.date.to-string", "es6.regexp.to-string" ]),
        trim: globalOnly([ "es6.string.trim" ]),
        trimEnd: globalOnly([ "es7.string.trim-right" ]),
        trimLeft: globalOnly([ "es7.string.trim-left" ]),
        trimRight: globalOnly([ "es7.string.trim-right" ]),
        trimStart: globalOnly([ "es7.string.trim-left" ]),
        values: globalOnly(ArrayNatureIterators)
      };
      exports.InstanceProperties = InstanceProperties, "es6.array.slice" in _corejs2BuiltIns.default && (InstanceProperties.slice = globalOnly([ "es6.array.slice" ]));
      const StaticProperties = {
        Array: {
          from: pureAndGlobal("array/from", [ "es6.symbol", "es6.array.from", ...CommonIterators ]),
          isArray: pureAndGlobal("array/is-array", [ "es6.array.is-array" ]),
          of: pureAndGlobal("array/of", [ "es6.array.of" ])
        },
        Date: {
          now: pureAndGlobal("date/now", [ "es6.date.now" ])
        },
        JSON: {
          stringify: pureOnly("json/stringify", "es6.symbol")
        },
        Math: {
          acosh: pureAndGlobal("math/acosh", [ "es6.math.acosh" ], "7.0.1"),
          asinh: pureAndGlobal("math/asinh", [ "es6.math.asinh" ], "7.0.1"),
          atanh: pureAndGlobal("math/atanh", [ "es6.math.atanh" ], "7.0.1"),
          cbrt: pureAndGlobal("math/cbrt", [ "es6.math.cbrt" ], "7.0.1"),
          clz32: pureAndGlobal("math/clz32", [ "es6.math.clz32" ], "7.0.1"),
          cosh: pureAndGlobal("math/cosh", [ "es6.math.cosh" ], "7.0.1"),
          expm1: pureAndGlobal("math/expm1", [ "es6.math.expm1" ], "7.0.1"),
          fround: pureAndGlobal("math/fround", [ "es6.math.fround" ], "7.0.1"),
          hypot: pureAndGlobal("math/hypot", [ "es6.math.hypot" ], "7.0.1"),
          imul: pureAndGlobal("math/imul", [ "es6.math.imul" ], "7.0.1"),
          log1p: pureAndGlobal("math/log1p", [ "es6.math.log1p" ], "7.0.1"),
          log10: pureAndGlobal("math/log10", [ "es6.math.log10" ], "7.0.1"),
          log2: pureAndGlobal("math/log2", [ "es6.math.log2" ], "7.0.1"),
          sign: pureAndGlobal("math/sign", [ "es6.math.sign" ], "7.0.1"),
          sinh: pureAndGlobal("math/sinh", [ "es6.math.sinh" ], "7.0.1"),
          tanh: pureAndGlobal("math/tanh", [ "es6.math.tanh" ], "7.0.1"),
          trunc: pureAndGlobal("math/trunc", [ "es6.math.trunc" ], "7.0.1")
        },
        Number: {
          EPSILON: pureAndGlobal("number/epsilon", [ "es6.number.epsilon" ]),
          MIN_SAFE_INTEGER: pureAndGlobal("number/min-safe-integer", [ "es6.number.min-safe-integer" ]),
          MAX_SAFE_INTEGER: pureAndGlobal("number/max-safe-integer", [ "es6.number.max-safe-integer" ]),
          isFinite: pureAndGlobal("number/is-finite", [ "es6.number.is-finite" ]),
          isInteger: pureAndGlobal("number/is-integer", [ "es6.number.is-integer" ]),
          isSafeInteger: pureAndGlobal("number/is-safe-integer", [ "es6.number.is-safe-integer" ]),
          isNaN: pureAndGlobal("number/is-nan", [ "es6.number.is-nan" ]),
          parseFloat: pureAndGlobal("number/parse-float", [ "es6.number.parse-float" ]),
          parseInt: pureAndGlobal("number/parse-int", [ "es6.number.parse-int" ])
        },
        Object: {
          assign: pureAndGlobal("object/assign", [ "es6.object.assign" ]),
          create: pureAndGlobal("object/create", [ "es6.object.create" ]),
          defineProperties: pureAndGlobal("object/define-properties", [ "es6.object.define-properties" ]),
          defineProperty: pureAndGlobal("object/define-property", [ "es6.object.define-property" ]),
          entries: pureAndGlobal("object/entries", [ "es7.object.entries" ]),
          freeze: pureAndGlobal("object/freeze", [ "es6.object.freeze" ]),
          getOwnPropertyDescriptor: pureAndGlobal("object/get-own-property-descriptor", [ "es6.object.get-own-property-descriptor" ]),
          getOwnPropertyDescriptors: pureAndGlobal("object/get-own-property-descriptors", [ "es7.object.get-own-property-descriptors" ]),
          getOwnPropertyNames: pureAndGlobal("object/get-own-property-names", [ "es6.object.get-own-property-names" ]),
          getOwnPropertySymbols: pureAndGlobal("object/get-own-property-symbols", [ "es6.symbol" ]),
          getPrototypeOf: pureAndGlobal("object/get-prototype-of", [ "es6.object.get-prototype-of" ]),
          is: pureAndGlobal("object/is", [ "es6.object.is" ]),
          isExtensible: pureAndGlobal("object/is-extensible", [ "es6.object.is-extensible" ]),
          isFrozen: pureAndGlobal("object/is-frozen", [ "es6.object.is-frozen" ]),
          isSealed: pureAndGlobal("object/is-sealed", [ "es6.object.is-sealed" ]),
          keys: pureAndGlobal("object/keys", [ "es6.object.keys" ]),
          preventExtensions: pureAndGlobal("object/prevent-extensions", [ "es6.object.prevent-extensions" ]),
          seal: pureAndGlobal("object/seal", [ "es6.object.seal" ]),
          setPrototypeOf: pureAndGlobal("object/set-prototype-of", [ "es6.object.set-prototype-of" ]),
          values: pureAndGlobal("object/values", [ "es7.object.values" ])
        },
        Promise: {
          all: globalOnly(CommonIterators),
          race: globalOnly(CommonIterators)
        },
        Reflect: {
          apply: pureAndGlobal("reflect/apply", [ "es6.reflect.apply" ]),
          construct: pureAndGlobal("reflect/construct", [ "es6.reflect.construct" ]),
          defineProperty: pureAndGlobal("reflect/define-property", [ "es6.reflect.define-property" ]),
          deleteProperty: pureAndGlobal("reflect/delete-property", [ "es6.reflect.delete-property" ]),
          get: pureAndGlobal("reflect/get", [ "es6.reflect.get" ]),
          getOwnPropertyDescriptor: pureAndGlobal("reflect/get-own-property-descriptor", [ "es6.reflect.get-own-property-descriptor" ]),
          getPrototypeOf: pureAndGlobal("reflect/get-prototype-of", [ "es6.reflect.get-prototype-of" ]),
          has: pureAndGlobal("reflect/has", [ "es6.reflect.has" ]),
          isExtensible: pureAndGlobal("reflect/is-extensible", [ "es6.reflect.is-extensible" ]),
          ownKeys: pureAndGlobal("reflect/own-keys", [ "es6.reflect.own-keys" ]),
          preventExtensions: pureAndGlobal("reflect/prevent-extensions", [ "es6.reflect.prevent-extensions" ]),
          set: pureAndGlobal("reflect/set", [ "es6.reflect.set" ]),
          setPrototypeOf: pureAndGlobal("reflect/set-prototype-of", [ "es6.reflect.set-prototype-of" ])
        },
        String: {
          at: pureOnly("string/at", "es7.string.at"),
          fromCodePoint: pureAndGlobal("string/from-code-point", [ "es6.string.from-code-point" ]),
          raw: pureAndGlobal("string/raw", [ "es6.string.raw" ])
        },
        Symbol: {
          asyncIterator: globalOnly([ "es6.symbol", "es7.symbol.async-iterator" ]),
          for: pureOnly("symbol/for", "es6.symbol"),
          hasInstance: pureOnly("symbol/has-instance", "es6.symbol"),
          isConcatSpreadable: pureOnly("symbol/is-concat-spreadable", "es6.symbol"),
          iterator: define("es6.symbol", "symbol/iterator", CommonIterators),
          keyFor: pureOnly("symbol/key-for", "es6.symbol"),
          match: pureAndGlobal("symbol/match", [ "es6.regexp.match" ]),
          replace: pureOnly("symbol/replace", "es6.symbol"),
          search: pureOnly("symbol/search", "es6.symbol"),
          species: pureOnly("symbol/species", "es6.symbol"),
          split: pureOnly("symbol/split", "es6.symbol"),
          toPrimitive: pureOnly("symbol/to-primitive", "es6.symbol"),
          toStringTag: pureOnly("symbol/to-string-tag", "es6.symbol"),
          unscopables: pureOnly("symbol/unscopables", "es6.symbol")
        }
      };
      exports.StaticProperties = StaticProperties;
    },
    6740: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.hasMinVersion = function(minVersion, runtimeVersion) {
        if (!runtimeVersion || !minVersion) return !0;
        _semver.default.valid(runtimeVersion) && (runtimeVersion = `^${runtimeVersion}`);
        return !_semver.default.intersects(`<${minVersion}`, runtimeVersion) && !_semver.default.intersects(">=8.0.0", runtimeVersion);
      };
      var obj, _semver = (obj = __webpack_require__(5870)) && obj.__esModule ? obj : {
        default: obj
      };
    },
    1815: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var _corejs2BuiltIns = _interopRequireDefault(__webpack_require__(4817)), _builtInDefinitions = __webpack_require__(9479), _addPlatformSpecificPolyfills = _interopRequireDefault(__webpack_require__(9869)), _helpers = __webpack_require__(6740), _helperDefinePolyfillProvider = _interopRequireDefault(__webpack_require__(9695)), babel = function(obj) {
        if (obj && obj.__esModule) return obj;
        if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
          default: obj
        };
        var cache = _getRequireWildcardCache();
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
        newObj.default = obj, cache && cache.set(obj, newObj);
        return newObj;
      }(__webpack_require__(4629));
      function _getRequireWildcardCache() {
        if ("function" != typeof WeakMap) return null;
        var cache = new WeakMap;
        return _getRequireWildcardCache = function() {
          return cache;
        }, cache;
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      const {types: t} = babel.default || babel, has = Function.call.bind(Object.hasOwnProperty);
      var _default = (0, _helperDefinePolyfillProvider.default)((function(api, {"#__secret_key__@babel/preset-env__compatibility": {entryInjectRegenerator} = {}, "#__secret_key__@babel/runtime__compatibility": {useBabelRuntime, runtimeVersion, ext = ".js"} = {}}) {
        const resolve = api.createMetaResolver({
          global: _builtInDefinitions.BuiltIns,
          static: _builtInDefinitions.StaticProperties,
          instance: _builtInDefinitions.InstanceProperties
        }), {debug, shouldInjectPolyfill, method} = api, polyfills = (0, _addPlatformSpecificPolyfills.default)(api.targets, method, _corejs2BuiltIns.default), coreJSBase = useBabelRuntime ? `${useBabelRuntime}/core-js` : "usage-pure" === method ? "core-js/library/fn" : "core-js/modules";
        function inject(name, utils) {
          "string" != typeof name ? name.forEach((name => inject(name, utils))) : has(polyfills, name) && shouldInjectPolyfill(name) && (debug(name), 
          utils.injectGlobalImport(`${coreJSBase}/${name}.js`));
        }
        return {
          name: "corejs2",
          polyfills,
          entryGlobal(meta, utils, path) {
            "import" === meta.kind && "core-js" === meta.source && (debug(null), inject(Object.keys(polyfills), utils), 
            entryInjectRegenerator && utils.injectGlobalImport("regenerator-runtime/runtime.js"), 
            path.remove());
          },
          usageGlobal(meta, utils) {
            const resolved = resolve(meta);
            if (!resolved) return;
            let deps = resolved.desc.global;
            if ("global" !== resolved.kind && meta.object && "prototype" === meta.placement) {
              const low = meta.object.toLowerCase();
              deps = deps.filter((m => m.includes(low)));
            }
            inject(deps, utils);
          },
          usagePure(meta, utils, path) {
            if ("in" === meta.kind) return void ("Symbol.iterator" === meta.key && path.replaceWith(t.callExpression(utils.injectDefaultImport(`${coreJSBase}/is-iterable${ext}`, "isIterable"), [ path.node.right ])));
            if (path.parentPath.isUnaryExpression({
              operator: "delete"
            })) return;
            if ("property" === meta.kind) {
              if (!path.isMemberExpression()) return;
              if (!path.isReferenced()) return;
              if ("Symbol.iterator" === meta.key && shouldInjectPolyfill("es6.symbol") && path.parentPath.isCallExpression({
                callee: path.node
              }) && 0 === path.parent.arguments.length) return path.parentPath.replaceWith(t.callExpression(utils.injectDefaultImport(`${coreJSBase}/get-iterator${ext}`, "getIterator"), [ path.node.object ])), 
              void path.skip();
            }
            const resolved = resolve(meta);
            if (!resolved) return;
            const id = function(desc, hint, utils) {
              const {pure, meta, name} = desc;
              if (pure && shouldInjectPolyfill(name) && (!(runtimeVersion && meta && meta.minRuntimeVersion) || (0, 
              _helpers.hasMinVersion)(meta && meta.minRuntimeVersion, runtimeVersion))) return utils.injectDefaultImport(`${coreJSBase}/${pure}${ext}`, hint);
            }(resolved.desc, resolved.name, utils);
            id && path.replaceWith(id);
          },
          visitor: "usage-global" === method && {
            YieldExpression(path) {
              path.node.delegate && inject("web.dom.iterable", api.getUtils(path));
            },
            "ForOfStatement|ArrayPattern"(path) {
              _builtInDefinitions.CommonIterators.forEach((name => inject(name, api.getUtils(path))));
            }
          }
        };
      }));
      exports.default = _default;
    },
    7237: (__unused_webpack_module, exports) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var _default = new Set([ "esnext.array.find-last", "esnext.array.find-last-index", "esnext.typed-array.find-last", "esnext.typed-array.find-last-index" ]);
      exports.default = _default;
    },
    205: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var obj, _helperDefinePolyfillProvider = (obj = __webpack_require__(9695)) && obj.__esModule ? obj : {
        default: obj
      };
      const runtimeCompat = "#__secret_key__@babel/runtime__compatibility";
      var _default = (0, _helperDefinePolyfillProvider.default)((({debug}, options) => {
        const {[runtimeCompat]: {useBabelRuntime} = {}} = options, pureName = useBabelRuntime ? `${useBabelRuntime}/regenerator` : "regenerator-runtime";
        return {
          name: "regenerator",
          polyfills: [ "regenerator-runtime" ],
          usageGlobal(meta, utils) {
            isRegenerator(meta) && (debug("regenerator-runtime"), utils.injectGlobalImport("regenerator-runtime/runtime.js"));
          },
          usagePure(meta, utils, path) {
            isRegenerator(meta) && path.replaceWith(utils.injectDefaultImport(pureName, "regenerator-runtime"));
          }
        };
      }));
      exports.default = _default;
      const isRegenerator = meta => "global" === meta.kind && "regeneratorRuntime" === meta.name;
    },
    3082: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const {compare, intersection, semver} = __webpack_require__(3485), modulesByVersions = __webpack_require__(2878), modules = __webpack_require__(9343);
      module.exports = function(raw) {
        const corejs = semver(raw);
        if (3 !== corejs.major) throw RangeError("This version of `core-js-compat` works only with `core-js@3`.");
        const result = [];
        for (const version of Object.keys(modulesByVersions)) compare(version, "<=", corejs) && result.push(...modulesByVersions[version]);
        return intersection(result, modules);
      };
    },
    3485: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const cmp = __webpack_require__(2774), semver = __webpack_require__(1495), has = Function.call.bind({}.hasOwnProperty);
      module.exports = {
        compare: function(a, operator, b) {
          return cmp(semver(a), operator, semver(b));
        },
        filterOutStabilizedProposals: function(modules) {
          const modulesSet = new Set(modules);
          for (const $module of modulesSet) $module.startsWith("esnext.") && modulesSet.has($module.replace(/^esnext\./, "es.")) && modulesSet.delete($module);
          return [ ...modulesSet ];
        },
        has,
        intersection: function(list, order) {
          const set = list instanceof Set ? list : new Set(list);
          return order.filter((name => set.has(name)));
        },
        semver,
        sortObjectByKey: function(object, fn) {
          return Object.keys(object).sort(fn).reduce(((memo, key) => (memo[key] = object[key], 
          memo)), {});
        }
      };
    },
    5293: (module, __unused_webpack_exports, __webpack_require__) => {
      const debug = __webpack_require__(958), {MAX_LENGTH, MAX_SAFE_INTEGER} = __webpack_require__(9363), {re, t} = __webpack_require__(5073), {compareIdentifiers} = __webpack_require__(9251);
      class SemVer {
        constructor(version, options) {
          if (options && "object" == typeof options || (options = {
            loose: !!options,
            includePrerelease: !1
          }), version instanceof SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
            version = version.version;
          } else if ("string" != typeof version) throw new TypeError(`Invalid Version: ${version}`);
          if (version.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
          debug("SemVer", version, options), this.options = options, this.loose = !!options.loose, 
          this.includePrerelease = !!options.includePrerelease;
          const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
          if (!m) throw new TypeError(`Invalid Version: ${version}`);
          if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
          this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
          if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
          if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
          m[4] ? this.prerelease = m[4].split(".").map((id => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
            }
            return id;
          })) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
        }
        format() {
          return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), 
          this.version;
        }
        toString() {
          return this.version;
        }
        compare(other) {
          if (debug("SemVer.compare", this.version, this.options, other), !(other instanceof SemVer)) {
            if ("string" == typeof other && other === this.version) return 0;
            other = new SemVer(other, this.options);
          }
          return other.version === this.version ? 0 : this.compareMain(other) || this.comparePre(other);
        }
        compareMain(other) {
          return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        }
        comparePre(other) {
          if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
          if (!this.prerelease.length && other.prerelease.length) return 1;
          if (!this.prerelease.length && !other.prerelease.length) return 0;
          let i = 0;
          do {
            const a = this.prerelease[i], b = other.prerelease[i];
            if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
            if (void 0 === b) return 1;
            if (void 0 === a) return -1;
            if (a !== b) return compareIdentifiers(a, b);
          } while (++i);
        }
        compareBuild(other) {
          other instanceof SemVer || (other = new SemVer(other, this.options));
          let i = 0;
          do {
            const a = this.build[i], b = other.build[i];
            if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
            if (void 0 === b) return 1;
            if (void 0 === a) return -1;
            if (a !== b) return compareIdentifiers(a, b);
          } while (++i);
        }
        inc(release, identifier) {
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
              let i = this.prerelease.length;
              for (;--i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
              i = -2);
              -1 === i && this.prerelease.push(0);
            }
            identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
            break;

           default:
            throw new Error(`invalid increment argument: ${release}`);
          }
          return this.format(), this.raw = this.version, this;
        }
      }
      module.exports = SemVer;
    },
    2774: (module, __unused_webpack_exports, __webpack_require__) => {
      const eq = __webpack_require__(5881), neq = __webpack_require__(3618), gt = __webpack_require__(3362), gte = __webpack_require__(5180), lt = __webpack_require__(7651), lte = __webpack_require__(5423);
      module.exports = (a, op, b, loose) => {
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
          throw new TypeError(`Invalid operator: ${op}`);
        }
      };
    },
    1495: (module, __unused_webpack_exports, __webpack_require__) => {
      const SemVer = __webpack_require__(5293), parse = __webpack_require__(110), {re, t} = __webpack_require__(5073);
      module.exports = (version, options) => {
        if (version instanceof SemVer) return version;
        if ("number" == typeof version && (version = String(version)), "string" != typeof version) return null;
        let match = null;
        if ((options = options || {}).rtl) {
          let next;
          for (;(next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length); ) match && next.index + next[0].length === match.index + match[0].length || (match = next), 
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
          re[t.COERCERTL].lastIndex = -1;
        } else match = version.match(re[t.COERCE]);
        return null === match ? null : parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
      };
    },
    1439: (module, __unused_webpack_exports, __webpack_require__) => {
      const SemVer = __webpack_require__(5293);
      module.exports = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    },
    5881: (module, __unused_webpack_exports, __webpack_require__) => {
      const compare = __webpack_require__(1439);
      module.exports = (a, b, loose) => 0 === compare(a, b, loose);
    },
    3362: (module, __unused_webpack_exports, __webpack_require__) => {
      const compare = __webpack_require__(1439);
      module.exports = (a, b, loose) => compare(a, b, loose) > 0;
    },
    5180: (module, __unused_webpack_exports, __webpack_require__) => {
      const compare = __webpack_require__(1439);
      module.exports = (a, b, loose) => compare(a, b, loose) >= 0;
    },
    7651: (module, __unused_webpack_exports, __webpack_require__) => {
      const compare = __webpack_require__(1439);
      module.exports = (a, b, loose) => compare(a, b, loose) < 0;
    },
    5423: (module, __unused_webpack_exports, __webpack_require__) => {
      const compare = __webpack_require__(1439);
      module.exports = (a, b, loose) => compare(a, b, loose) <= 0;
    },
    3618: (module, __unused_webpack_exports, __webpack_require__) => {
      const compare = __webpack_require__(1439);
      module.exports = (a, b, loose) => 0 !== compare(a, b, loose);
    },
    110: (module, __unused_webpack_exports, __webpack_require__) => {
      const {MAX_LENGTH} = __webpack_require__(9363), {re, t} = __webpack_require__(5073), SemVer = __webpack_require__(5293);
      module.exports = (version, options) => {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), version instanceof SemVer) return version;
        if ("string" != typeof version) return null;
        if (version.length > MAX_LENGTH) return null;
        if (!(options.loose ? re[t.LOOSE] : re[t.FULL]).test(version)) return null;
        try {
          return new SemVer(version, options);
        } catch (er) {
          return null;
        }
      };
    },
    9363: module => {
      const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
      module.exports = {
        SEMVER_SPEC_VERSION: "2.0.0",
        MAX_LENGTH: 256,
        MAX_SAFE_INTEGER,
        MAX_SAFE_COMPONENT_LENGTH: 16
      };
    },
    958: module => {
      const debug = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
      module.exports = debug;
    },
    9251: module => {
      const numeric = /^[0-9]+$/, compareIdentifiers = (a, b) => {
        const anum = numeric.test(a), bnum = numeric.test(b);
        return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      };
      module.exports = {
        compareIdentifiers,
        rcompareIdentifiers: (a, b) => compareIdentifiers(b, a)
      };
    },
    5073: (module, exports, __webpack_require__) => {
      const {MAX_SAFE_COMPONENT_LENGTH} = __webpack_require__(9363), debug = __webpack_require__(958), re = (exports = module.exports = {}).re = [], src = exports.src = [], t = exports.t = {};
      let R = 0;
      const createToken = (name, value, isGlobal) => {
        const index = R++;
        debug(index, value), t[name] = index, src[index] = value, re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      };
      createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*"), createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+"), 
      createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`), 
      createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`), 
      createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`), 
      createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`), 
      createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`), 
      createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`), 
      createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`), 
      createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`), 
      createToken("FULL", `^${src[t.FULLPLAIN]}$`), createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`), 
      createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`), createToken("GTLT", "((?:<|>)?=?)"), 
      createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), 
      createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`), createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`), 
      createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`), 
      createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`), createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`), 
      createToken("COERCE", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`), 
      createToken("COERCERTL", src[t.COERCE], !0), createToken("LONETILDE", "(?:~>?)"), 
      createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, !0), exports.tildeTrimReplace = "$1~", 
      createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`), createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`), 
      createToken("LONECARET", "(?:\\^)"), createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, !0), 
      exports.caretTrimReplace = "$1^", createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`), 
      createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`), createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`), 
      createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`), createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, !0), 
      exports.comparatorTrimReplace = "$1$2$3", createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`), 
      createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`), 
      createToken("STAR", "(<|>)?=?\\s*\\*");
    },
    1296: module => {
      var reTrim = /^\s+|\s+$/g, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt, freeGlobal = "object" == typeof global && global && global.Object === Object && global, freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")(), objectToString = Object.prototype.toString, nativeMax = Math.max, nativeMin = Math.min, now = function() {
        return root.Date.now();
      };
      function isObject(value) {
        var type = typeof value;
        return !!value && ("object" == type || "function" == type);
      }
      function toNumber(value) {
        if ("number" == typeof value) return value;
        if (function(value) {
          return "symbol" == typeof value || function(value) {
            return !!value && "object" == typeof value;
          }(value) && "[object Symbol]" == objectToString.call(value);
        }(value)) return NaN;
        if (isObject(value)) {
          var other = "function" == typeof value.valueOf ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if ("string" != typeof value) return 0 === value ? value : +value;
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NaN : +value;
      }
      module.exports = function(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0;
        if ("function" != typeof func) throw new TypeError("Expected a function");
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          return lastArgs = lastThis = void 0, lastInvokeTime = time, result = func.apply(thisArg, args);
        }
        function leadingEdge(time) {
          return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime;
          return void 0 === lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && time - lastInvokeTime >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) return trailingEdge(time);
          timerId = setTimeout(timerExpired, function(time) {
            var result = wait - (time - lastCallTime);
            return maxing ? nativeMin(result, maxWait - (time - lastInvokeTime)) : result;
          }(time));
        }
        function trailingEdge(time) {
          return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, 
          result);
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
            if (void 0 === timerId) return leadingEdge(lastCallTime);
            if (maxing) return timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime);
          }
          return void 0 === timerId && (timerId = setTimeout(timerExpired, wait)), result;
        }
        return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, 
        maxWait = (maxing = "maxWait" in options) ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, 
        trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = function() {
          void 0 !== timerId && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
        }, debounced.flush = function() {
          return void 0 === timerId ? result : trailingEdge(now());
        }, debounced;
      };
    },
    762: module => {
      "use strict";
      var isWindows = "win32" === process.platform, splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/, win32 = {};
      win32.parse = function(pathString) {
        if ("string" != typeof pathString) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
        var filename, allParts = (filename = pathString, splitWindowsRe.exec(filename).slice(1));
        if (!allParts || 5 !== allParts.length) throw new TypeError("Invalid path '" + pathString + "'");
        return {
          root: allParts[1],
          dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
          base: allParts[2],
          ext: allParts[4],
          name: allParts[3]
        };
      };
      var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/, posix = {};
      posix.parse = function(pathString) {
        if ("string" != typeof pathString) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
        var filename, allParts = (filename = pathString, splitPathRe.exec(filename).slice(1));
        if (!allParts || 5 !== allParts.length) throw new TypeError("Invalid path '" + pathString + "'");
        return {
          root: allParts[1],
          dir: allParts[0].slice(0, -1),
          base: allParts[2],
          ext: allParts[4],
          name: allParts[3]
        };
      }, module.exports = isWindows ? win32.parse : posix.parse, module.exports.posix = posix.parse, 
      module.exports.win32 = win32.parse;
    },
    6313: (module, __unused_webpack_exports, __webpack_require__) => {
      var async = __webpack_require__(8821);
      async.core = __webpack_require__(1200), async.isCore = __webpack_require__(206), 
      async.sync = __webpack_require__(6406), module.exports = async;
    },
    8821: (module, __unused_webpack_exports, __webpack_require__) => {
      var fs = __webpack_require__(7147), path = __webpack_require__(1017), caller = __webpack_require__(6628), nodeModulesPaths = __webpack_require__(3754), normalizeOptions = __webpack_require__(5031), isCore = __webpack_require__(6199), realpathFS = fs.realpath && "function" == typeof fs.realpath.native ? fs.realpath.native : fs.realpath, defaultIsFile = function(file, cb) {
        fs.stat(file, (function(err, stat) {
          return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isFile() || stat.isFIFO());
        }));
      }, defaultIsDir = function(dir, cb) {
        fs.stat(dir, (function(err, stat) {
          return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isDirectory());
        }));
      }, defaultRealpath = function(x, cb) {
        realpathFS(x, (function(realpathErr, realPath) {
          realpathErr && "ENOENT" !== realpathErr.code ? cb(realpathErr) : cb(null, realpathErr ? x : realPath);
        }));
      }, maybeRealpath = function(realpath, x, opts, cb) {
        opts && !1 === opts.preserveSymlinks ? realpath(x, cb) : cb(null, x);
      }, defaultReadPackage = function(readFile, pkgfile, cb) {
        readFile(pkgfile, (function(readFileErr, body) {
          if (readFileErr) cb(readFileErr); else try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
        }));
      };
      module.exports = function(x, options, callback) {
        var cb = callback, opts = options;
        if ("function" == typeof options && (cb = opts, opts = {}), "string" != typeof x) {
          var err = new TypeError("Path must be a string.");
          return process.nextTick((function() {
            cb(err);
          }));
        }
        var isFile = (opts = normalizeOptions(x, opts)).isFile || defaultIsFile, isDirectory = opts.isDirectory || defaultIsDir, readFile = opts.readFile || fs.readFile, realpath = opts.realpath || defaultRealpath, readPackage = opts.readPackage || defaultReadPackage;
        if (opts.readFile && opts.readPackage) {
          var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
          return process.nextTick((function() {
            cb(conflictErr);
          }));
        }
        var packageIterator = opts.packageIterator, extensions = opts.extensions || [ ".js" ], includeCoreModules = !1 !== opts.includeCoreModules, basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
        opts.paths = opts.paths || [];
        var res, absoluteStart = path.resolve(basedir);
        function onfile(err, m, pkg) {
          err ? cb(err) : m ? cb(null, m, pkg) : loadAsDirectory(res, (function(err, d, pkg) {
            if (err) cb(err); else if (d) maybeRealpath(realpath, d, opts, (function(err, realD) {
              err ? cb(err) : cb(null, realD, pkg);
            })); else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
            }
          }));
        }
        function loadAsFile(x, thePackage, callback) {
          var loadAsFilePackage = thePackage, cb = callback;
          "function" == typeof loadAsFilePackage && (cb = loadAsFilePackage, loadAsFilePackage = void 0), 
          function load(exts, x, loadPackage) {
            if (0 === exts.length) return cb(null, void 0, loadPackage);
            var file = x + exts[0], pkg = loadPackage;
            pkg ? onpkg(null, pkg) : loadpkg(path.dirname(file), onpkg);
            function onpkg(err, pkg_, dir) {
              if (pkg = pkg_, err) return cb(err);
              if (dir && pkg && opts.pathFilter) {
                var rfile = path.relative(dir, file), rel = rfile.slice(0, rfile.length - exts[0].length), r = opts.pathFilter(pkg, x, rel);
                if (r) return load([ "" ].concat(extensions.slice()), path.resolve(dir, r), pkg);
              }
              isFile(file, onex);
            }
            function onex(err, ex) {
              return err ? cb(err) : ex ? cb(null, file, pkg) : void load(exts.slice(1), x, pkg);
            }
          }([ "" ].concat(extensions), x, loadAsFilePackage);
        }
        function loadpkg(dir, cb) {
          return "" === dir || "/" === dir || "win32" === process.platform && /^\w:[/\\]*$/.test(dir) || /[/\\]node_modules[/\\]*$/.test(dir) ? cb(null) : void maybeRealpath(realpath, dir, opts, (function(unwrapErr, pkgdir) {
            if (unwrapErr) return loadpkg(path.dirname(dir), cb);
            var pkgfile = path.join(pkgdir, "package.json");
            isFile(pkgfile, (function(err, ex) {
              if (!ex) return loadpkg(path.dirname(dir), cb);
              readPackage(readFile, pkgfile, (function(err, pkgParam) {
                err && cb(err);
                var pkg = pkgParam;
                pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), cb(null, pkg, dir);
              }));
            }));
          }));
        }
        function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
          var cb = callback, fpkg = loadAsDirectoryPackage;
          "function" == typeof fpkg && (cb = fpkg, fpkg = opts.package), maybeRealpath(realpath, x, opts, (function(unwrapErr, pkgdir) {
            if (unwrapErr) return cb(unwrapErr);
            var pkgfile = path.join(pkgdir, "package.json");
            isFile(pkgfile, (function(err, ex) {
              return err ? cb(err) : ex ? void readPackage(readFile, pkgfile, (function(err, pkgParam) {
                if (err) return cb(err);
                var pkg = pkgParam;
                if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), pkg && pkg.main) {
                  if ("string" != typeof pkg.main) {
                    var mainError = new TypeError("package “" + pkg.name + "” `main` must be a string");
                    return mainError.code = "INVALID_PACKAGE_MAIN", cb(mainError);
                  }
                  return "." !== pkg.main && "./" !== pkg.main || (pkg.main = "index"), void loadAsFile(path.resolve(x, pkg.main), pkg, (function(err, m, pkg) {
                    return err ? cb(err) : m ? cb(null, m, pkg) : pkg ? void loadAsDirectory(path.resolve(x, pkg.main), pkg, (function(err, n, pkg) {
                      return err ? cb(err) : n ? cb(null, n, pkg) : void loadAsFile(path.join(x, "index"), pkg, cb);
                    })) : loadAsFile(path.join(x, "index"), pkg, cb);
                  }));
                }
                loadAsFile(path.join(x, "/index"), pkg, cb);
              })) : loadAsFile(path.join(x, "index"), fpkg, cb);
            }));
          }));
        }
        function processDirs(cb, dirs) {
          if (0 === dirs.length) return cb(null, void 0);
          var dir = dirs[0];
          function onfile(err, m, pkg) {
            return err ? cb(err) : m ? cb(null, m, pkg) : void loadAsDirectory(dir, opts.package, ondir);
          }
          function ondir(err, n, pkg) {
            return err ? cb(err) : n ? cb(null, n, pkg) : void processDirs(cb, dirs.slice(1));
          }
          isDirectory(path.dirname(dir), (function(err, isdir) {
            if (err) return cb(err);
            if (!isdir) return processDirs(cb, dirs.slice(1));
            loadAsFile(dir, opts.package, onfile);
          }));
        }
        maybeRealpath(realpath, absoluteStart, opts, (function(err, realStart) {
          err ? cb(err) : function(basedir) {
            if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) res = path.resolve(basedir, x), 
            "." !== x && ".." !== x && "/" !== x.slice(-1) || (res += "/"), /\/$/.test(x) && res === basedir ? loadAsDirectory(res, opts.package, onfile) : loadAsFile(res, opts.package, onfile); else {
              if (includeCoreModules && isCore(x)) return cb(null, x);
              !function(x, start, cb) {
                var thunk = function() {
                  return function(x, start, opts) {
                    for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) dirs[i] = path.join(dirs[i], x);
                    return dirs;
                  }(x, start, opts);
                };
                processDirs(cb, packageIterator ? packageIterator(x, start, thunk, opts) : thunk());
              }(x, basedir, (function(err, n, pkg) {
                if (err) cb(err); else {
                  if (n) return maybeRealpath(realpath, n, opts, (function(err, realN) {
                    err ? cb(err) : cb(null, realN, pkg);
                  }));
                  var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
                  moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
                }
              }));
            }
          }(realStart);
        }));
      };
    },
    6628: module => {
      module.exports = function() {
        var origPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
          return stack;
        };
        var stack = (new Error).stack;
        return Error.prepareStackTrace = origPrepareStackTrace, stack[2].getFileName();
      };
    },
    1200: (module, __unused_webpack_exports, __webpack_require__) => {
      var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
      function specifierIncluded(specifier) {
        for (var parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
          var cur = parseInt(current[i] || 0, 10), ver = parseInt(versionParts[i] || 0, 10);
          if (cur !== ver) return "<" === op ? cur < ver : ">=" === op && cur >= ver;
        }
        return ">=" === op;
      }
      function matchesRange(range) {
        var specifiers = range.split(/ ?&& ?/);
        if (0 === specifiers.length) return !1;
        for (var i = 0; i < specifiers.length; ++i) if (!specifierIncluded(specifiers[i])) return !1;
        return !0;
      }
      function versionIncluded(specifierValue) {
        if ("boolean" == typeof specifierValue) return specifierValue;
        if (specifierValue && "object" == typeof specifierValue) {
          for (var i = 0; i < specifierValue.length; ++i) if (matchesRange(specifierValue[i])) return !0;
          return !1;
        }
        return matchesRange(specifierValue);
      }
      var data = __webpack_require__(4503), core = {};
      for (var mod in data) Object.prototype.hasOwnProperty.call(data, mod) && (core[mod] = versionIncluded(data[mod]));
      module.exports = core;
    },
    206: (module, __unused_webpack_exports, __webpack_require__) => {
      var isCoreModule = __webpack_require__(6199);
      module.exports = function(x) {
        return isCoreModule(x);
      };
    },
    3754: (module, __unused_webpack_exports, __webpack_require__) => {
      var path = __webpack_require__(1017), parse = path.parse || __webpack_require__(762), getNodeModulesDirs = function(absoluteStart, modules) {
        var prefix = "/";
        /^([A-Za-z]:)/.test(absoluteStart) ? prefix = "" : /^\\\\/.test(absoluteStart) && (prefix = "\\\\");
        for (var paths = [ absoluteStart ], parsed = parse(absoluteStart); parsed.dir !== paths[paths.length - 1]; ) paths.push(parsed.dir), 
        parsed = parse(parsed.dir);
        return paths.reduce((function(dirs, aPath) {
          return dirs.concat(modules.map((function(moduleDir) {
            return path.resolve(prefix, aPath, moduleDir);
          })));
        }), []);
      };
      module.exports = function(start, opts, request) {
        var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : [ "node_modules" ];
        if (opts && "function" == typeof opts.paths) return opts.paths(request, start, (function() {
          return getNodeModulesDirs(start, modules);
        }), opts);
        var dirs = getNodeModulesDirs(start, modules);
        return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
      };
    },
    5031: module => {
      module.exports = function(x, opts) {
        return opts || {};
      };
    },
    6406: (module, __unused_webpack_exports, __webpack_require__) => {
      var isCore = __webpack_require__(6199), fs = __webpack_require__(7147), path = __webpack_require__(1017), caller = __webpack_require__(6628), nodeModulesPaths = __webpack_require__(3754), normalizeOptions = __webpack_require__(5031), realpathFS = fs.realpathSync && "function" == typeof fs.realpathSync.native ? fs.realpathSync.native : fs.realpathSync, defaultIsFile = function(file) {
        try {
          var stat = fs.statSync(file);
        } catch (e) {
          if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
          throw e;
        }
        return stat.isFile() || stat.isFIFO();
      }, defaultIsDir = function(dir) {
        try {
          var stat = fs.statSync(dir);
        } catch (e) {
          if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
          throw e;
        }
        return stat.isDirectory();
      }, defaultRealpathSync = function(x) {
        try {
          return realpathFS(x);
        } catch (realpathErr) {
          if ("ENOENT" !== realpathErr.code) throw realpathErr;
        }
        return x;
      }, maybeRealpathSync = function(realpathSync, x, opts) {
        return opts && !1 === opts.preserveSymlinks ? realpathSync(x) : x;
      }, defaultReadPackageSync = function(readFileSync, pkgfile) {
        var body = readFileSync(pkgfile);
        try {
          return JSON.parse(body);
        } catch (jsonErr) {}
      };
      module.exports = function(x, options) {
        if ("string" != typeof x) throw new TypeError("Path must be a string.");
        var opts = normalizeOptions(x, options), isFile = opts.isFile || defaultIsFile, readFileSync = opts.readFileSync || fs.readFileSync, isDirectory = opts.isDirectory || defaultIsDir, realpathSync = opts.realpathSync || defaultRealpathSync, readPackageSync = opts.readPackageSync || defaultReadPackageSync;
        if (opts.readFileSync && opts.readPackageSync) throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
        var packageIterator = opts.packageIterator, extensions = opts.extensions || [ ".js" ], includeCoreModules = !1 !== opts.includeCoreModules, basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
        opts.paths = opts.paths || [];
        var absoluteStart = maybeRealpathSync(realpathSync, path.resolve(basedir), opts);
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          var res = path.resolve(absoluteStart, x);
          "." !== x && ".." !== x && "/" !== x.slice(-1) || (res += "/");
          var m = loadAsFileSync(res) || loadAsDirectorySync(res);
          if (m) return maybeRealpathSync(realpathSync, m, opts);
        } else {
          if (includeCoreModules && isCore(x)) return x;
          var n = function(x, start) {
            for (var thunk = function() {
              return function(x, start, opts) {
                for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) dirs[i] = path.join(dirs[i], x);
                return dirs;
              }(x, start, opts);
            }, dirs = packageIterator ? packageIterator(x, start, thunk, opts) : thunk(), i = 0; i < dirs.length; i++) {
              var dir = dirs[i];
              if (isDirectory(path.dirname(dir))) {
                var m = loadAsFileSync(dir);
                if (m) return m;
                var n = loadAsDirectorySync(dir);
                if (n) return n;
              }
            }
          }(x, absoluteStart);
          if (n) return maybeRealpathSync(realpathSync, n, opts);
        }
        var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
        function loadAsFileSync(x) {
          var pkg = loadpkg(path.dirname(x));
          if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
            var rfile = path.relative(pkg.dir, x), r = opts.pathFilter(pkg.pkg, x, rfile);
            r && (x = path.resolve(pkg.dir, r));
          }
          if (isFile(x)) return x;
          for (var i = 0; i < extensions.length; i++) {
            var file = x + extensions[i];
            if (isFile(file)) return file;
          }
        }
        function loadpkg(dir) {
          if ("" !== dir && "/" !== dir && !("win32" === process.platform && /^\w:[/\\]*$/.test(dir) || /[/\\]node_modules[/\\]*$/.test(dir))) {
            var pkgfile = path.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
            if (!isFile(pkgfile)) return loadpkg(path.dirname(dir));
            var pkg = readPackageSync(readFileSync, pkgfile);
            return pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, dir)), {
              pkg,
              dir
            };
          }
        }
        function loadAsDirectorySync(x) {
          var pkgfile = path.join(maybeRealpathSync(realpathSync, x, opts), "/package.json");
          if (isFile(pkgfile)) {
            try {
              var pkg = readPackageSync(readFileSync, pkgfile);
            } catch (e) {}
            if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, x)), pkg && pkg.main) {
              if ("string" != typeof pkg.main) {
                var mainError = new TypeError("package “" + pkg.name + "” `main` must be a string");
                throw mainError.code = "INVALID_PACKAGE_MAIN", mainError;
              }
              "." !== pkg.main && "./" !== pkg.main || (pkg.main = "index");
              try {
                var m = loadAsFileSync(path.resolve(x, pkg.main));
                if (m) return m;
                var n = loadAsDirectorySync(path.resolve(x, pkg.main));
                if (n) return n;
              } catch (e) {}
            }
          }
          return loadAsFileSync(path.join(x, "/index"));
        }
      };
    },
    3349: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.resolve = function(dirname, moduleName, absoluteImports) {
        if (!1 === absoluteImports) return moduleName;
        let basedir = dirname;
        "string" == typeof absoluteImports && (basedir = _path.default.resolve(basedir, absoluteImports));
        try {
          return nativeRequireResolve ? __webpack_require__(5965).resolve(moduleName, {
            paths: [ basedir ]
          }) : _resolve.default.sync(moduleName, {
            basedir
          });
        } catch (err) {
          if ("MODULE_NOT_FOUND" !== err.code) throw err;
          throw Object.assign(new Error(`Failed to resolve "${moduleName}" relative to "${dirname}"`), {
            code: "BABEL_POLYFILL_NOT_FOUND",
            polyfill: moduleName,
            dirname
          });
        }
      }, exports.has = function(basedir, name) {
        try {
          return nativeRequireResolve ? __webpack_require__(5965).resolve(name, {
            paths: [ basedir ]
          }) : _resolve.default.sync(name, {
            basedir
          }), !0;
        } catch (_unused) {
          return !1;
        }
      }, exports.logMissing = logMissing, exports.laterLogMissing = function(missingDeps) {
        if (0 === missingDeps.size) return;
        missingDeps.forEach((name => allMissingDeps.add(name))), laterLogMissingDependencies();
      };
      var _path = _interopRequireDefault(__webpack_require__(1017)), _lodash = _interopRequireDefault(__webpack_require__(1296)), _resolve = _interopRequireDefault(__webpack_require__(6313));
      __webpack_require__(8188);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      const nativeRequireResolve = parseFloat(process.versions.node) >= 8.9;
      function logMissing(missingDeps) {
        if (0 === missingDeps.size) return;
        const deps = Array.from(missingDeps).sort().join(" ");
        console.warn(`\nSome polyfills have been added but are not present in your dependencies.\nPlease run one of the following commands:\n\tnpm install --save ${deps}\n\tyarn add ${deps}\n`), 
        process.exitCode = 1;
      }
      let allMissingDeps = new Set;
      const laterLogMissingDependencies = (0, _lodash.default)((() => {
        logMissing(allMissingDeps), allMissingDeps = new Set;
      }), 100);
    },
    6199: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      function specifierIncluded(current, specifier) {
        for (var nodeParts = current.split("."), parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
          var cur = parseInt(nodeParts[i] || 0, 10), ver = parseInt(versionParts[i] || 0, 10);
          if (cur !== ver) return "<" === op ? cur < ver : ">=" === op && cur >= ver;
        }
        return ">=" === op;
      }
      function matchesRange(current, range) {
        var specifiers = range.split(/ ?&& ?/);
        if (0 === specifiers.length) return !1;
        for (var i = 0; i < specifiers.length; ++i) if (!specifierIncluded(current, specifiers[i])) return !1;
        return !0;
      }
      var data = __webpack_require__(6151);
      module.exports = function(x, nodeVersion) {
        return Object.prototype.hasOwnProperty.call(data, x) && function(nodeVersion, specifierValue) {
          if ("boolean" == typeof specifierValue) return specifierValue;
          var current = void 0 === nodeVersion ? process.versions && process.versions.node : nodeVersion;
          if ("string" != typeof current) throw new TypeError(void 0 === nodeVersion ? "Unable to determine current node version" : "If provided, a valid node version is required");
          if (specifierValue && "object" == typeof specifierValue) {
            for (var i = 0; i < specifierValue.length; ++i) if (matchesRange(current, specifierValue[i])) return !0;
            return !1;
          }
          return matchesRange(current, specifierValue);
        }(nodeVersion, data[x]);
      };
    },
    348: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.CommonInstanceDependencies = exports.InstanceProperties = exports.StaticProperties = exports.BuiltIns = exports.PromiseDependenciesWithIterators = exports.PromiseDependencies = exports.CommonIterators = void 0;
      var obj, _data = (obj = __webpack_require__(6578)) && obj.__esModule ? obj : {
        default: obj
      };
      const polyfillsOrder = {};
      Object.keys(_data.default).forEach(((name, index) => {
        polyfillsOrder[name] = index;
      }));
      const define = (pure, global, name = global[0], exclude) => ({
        name,
        pure,
        global: global.sort(((a, b) => polyfillsOrder[a] - polyfillsOrder[b])),
        exclude
      }), typed = name => define(null, [ name, ...TypedArrayDependencies ]), ArrayNatureIterators = [ "es.array.iterator", "web.dom-collections.iterator" ], CommonIterators = [ "es.string.iterator", ...ArrayNatureIterators ];
      exports.CommonIterators = CommonIterators;
      const ArrayNatureIteratorsWithTag = [ "es.object.to-string", ...ArrayNatureIterators ], CommonIteratorsWithTag = [ "es.object.to-string", ...CommonIterators ], ErrorDependencies = [ "es.error.cause", "es.error.to-string" ], TypedArrayDependencies = [ "es.typed-array.at", "es.typed-array.copy-within", "es.typed-array.every", "es.typed-array.fill", "es.typed-array.filter", "es.typed-array.find", "es.typed-array.find-index", "es.typed-array.for-each", "es.typed-array.includes", "es.typed-array.index-of", "es.typed-array.iterator", "es.typed-array.join", "es.typed-array.last-index-of", "es.typed-array.map", "es.typed-array.reduce", "es.typed-array.reduce-right", "es.typed-array.reverse", "es.typed-array.set", "es.typed-array.slice", "es.typed-array.some", "es.typed-array.sort", "es.typed-array.subarray", "es.typed-array.to-locale-string", "es.typed-array.to-string", "es.object.to-string", "es.array.iterator", "es.array-buffer.slice", "esnext.typed-array.filter-reject", "esnext.typed-array.find-last", "esnext.typed-array.find-last-index", "esnext.typed-array.group-by", "esnext.typed-array.to-reversed", "esnext.typed-array.to-sorted", "esnext.typed-array.to-spliced", "esnext.typed-array.unique-by", "esnext.typed-array.with" ], PromiseDependencies = [ "es.promise", "es.object.to-string" ];
      exports.PromiseDependencies = PromiseDependencies;
      const PromiseDependenciesWithIterators = [ ...PromiseDependencies, ...CommonIterators ];
      exports.PromiseDependenciesWithIterators = PromiseDependenciesWithIterators;
      const MapDependencies = [ "es.map", "esnext.map.delete-all", "esnext.map.emplace", "esnext.map.every", "esnext.map.filter", "esnext.map.find", "esnext.map.find-key", "esnext.map.includes", "esnext.map.key-of", "esnext.map.map-keys", "esnext.map.map-values", "esnext.map.merge", "esnext.map.reduce", "esnext.map.some", "esnext.map.update", ...CommonIteratorsWithTag ], SetDependencies = [ "es.set", "esnext.set.add-all", "esnext.set.delete-all", "esnext.set.difference", "esnext.set.every", "esnext.set.filter", "esnext.set.find", "esnext.set.intersection", "esnext.set.is-disjoint-from", "esnext.set.is-subset-of", "esnext.set.is-superset-of", "esnext.set.join", "esnext.set.map", "esnext.set.reduce", "esnext.set.some", "esnext.set.symmetric-difference", "esnext.set.union", ...CommonIteratorsWithTag ], WeakMapDependencies = [ "es.weak-map", "esnext.weak-map.delete-all", "esnext.weak-map.emplace", ...CommonIteratorsWithTag ], WeakSetDependencies = [ "es.weak-set", "esnext.weak-set.add-all", "esnext.weak-set.delete-all", ...CommonIteratorsWithTag ], DOMExceptionDependencies = [ "web.dom-exception.constructor", "web.dom-exception.stack", "web.dom-exception.to-string-tag", "es.error.to-string" ], URLSearchParamsDependencies = [ "web.url-search-params", ...CommonIteratorsWithTag ], AsyncIteratorDependencies = [ "esnext.async-iterator.constructor", ...PromiseDependencies ], AsyncIteratorProblemMethods = [ "esnext.async-iterator.every", "esnext.async-iterator.filter", "esnext.async-iterator.find", "esnext.async-iterator.flat-map", "esnext.async-iterator.for-each", "esnext.async-iterator.map", "esnext.async-iterator.reduce", "esnext.async-iterator.some" ], IteratorDependencies = [ "esnext.iterator.constructor", "es.object.to-string" ], TypedArrayStaticMethods = {
        from: define(null, [ "es.typed-array.from" ]),
        fromAsync: define(null, [ "esnext.typed-array.from-async", ...PromiseDependenciesWithIterators ]),
        of: define(null, [ "es.typed-array.of" ])
      }, BuiltIns = {
        AsyncIterator: define("async-iterator/index", AsyncIteratorDependencies),
        AggregateError: define("aggregate-error", [ "es.aggregate-error", ...ErrorDependencies, ...CommonIteratorsWithTag, "es.aggregate-error.cause" ]),
        ArrayBuffer: define(null, [ "es.array-buffer.constructor", "es.array-buffer.slice", "es.object.to-string" ]),
        DataView: define(null, [ "es.data-view", "es.array-buffer.slice", "es.object.to-string" ]),
        Date: define(null, [ "es.date.to-string" ]),
        DOMException: define("dom-exception", DOMExceptionDependencies),
        Error: define(null, ErrorDependencies),
        EvalError: define(null, ErrorDependencies),
        Float32Array: typed("es.typed-array.float32-array"),
        Float64Array: typed("es.typed-array.float64-array"),
        Int8Array: typed("es.typed-array.int8-array"),
        Int16Array: typed("es.typed-array.int16-array"),
        Int32Array: typed("es.typed-array.int32-array"),
        Iterator: define("iterator/index", IteratorDependencies),
        Uint8Array: typed("es.typed-array.uint8-array"),
        Uint8ClampedArray: typed("es.typed-array.uint8-clamped-array"),
        Uint16Array: typed("es.typed-array.uint16-array"),
        Uint32Array: typed("es.typed-array.uint32-array"),
        Map: define("map/index", MapDependencies),
        Number: define(null, [ "es.number.constructor" ]),
        Observable: define("observable/index", [ "esnext.observable", "esnext.symbol.observable", "es.object.to-string", ...CommonIteratorsWithTag ]),
        Promise: define("promise/index", PromiseDependencies),
        RangeError: define(null, ErrorDependencies),
        ReferenceError: define(null, ErrorDependencies),
        Reflect: define(null, [ "es.reflect.to-string-tag", "es.object.to-string" ]),
        RegExp: define(null, [ "es.regexp.constructor", "es.regexp.dot-all", "es.regexp.exec", "es.regexp.sticky", "es.regexp.to-string" ]),
        Set: define("set/index", SetDependencies),
        Symbol: define("symbol/index", [ "es.symbol", "es.symbol.description", "es.object.to-string" ]),
        SyntaxError: define(null, ErrorDependencies),
        TypeError: define(null, ErrorDependencies),
        URIError: define(null, ErrorDependencies),
        URL: define("url/index", [ "web.url", ...URLSearchParamsDependencies ]),
        URLSearchParams: define("url-search-params/index", URLSearchParamsDependencies),
        WeakMap: define("weak-map/index", WeakMapDependencies),
        WeakSet: define("weak-set/index", WeakSetDependencies),
        atob: define("atob", [ "web.atob", ...DOMExceptionDependencies ]),
        btoa: define("btoa", [ "web.btoa", ...DOMExceptionDependencies ]),
        clearImmediate: define("clear-immediate", [ "web.immediate" ]),
        compositeKey: define("composite-key", [ "esnext.composite-key" ]),
        compositeSymbol: define("composite-symbol", [ "esnext.composite-symbol" ]),
        escape: define("escape", [ "es.escape" ]),
        fetch: define(null, PromiseDependencies),
        globalThis: define("global-this", [ "es.global-this" ]),
        parseFloat: define("parse-float", [ "es.parse-float" ]),
        parseInt: define("parse-int", [ "es.parse-int" ]),
        queueMicrotask: define("queue-microtask", [ "web.queue-microtask" ]),
        setImmediate: define("set-immediate", [ "web.immediate" ]),
        setInterval: define("set-interval", [ "web.timers" ]),
        setTimeout: define("set-timeout", [ "web.timers" ]),
        structuredClone: define("structured-clone", [ "web.structured-clone", ...DOMExceptionDependencies, "es.array.iterator", "es.object.keys", "es.object.to-string", "es.map", "es.set" ]),
        unescape: define("unescape", [ "es.unescape" ])
      };
      exports.BuiltIns = BuiltIns;
      const StaticProperties = {
        AsyncIterator: {
          from: define("async-iterator/from", [ "esnext.async-iterator.from", ...AsyncIteratorDependencies, ...AsyncIteratorProblemMethods, ...CommonIterators ])
        },
        Array: {
          from: define("array/from", [ "es.array.from", "es.string.iterator" ]),
          fromAsync: define("array/from-async", [ "esnext.array.from-async", ...PromiseDependenciesWithIterators ]),
          isArray: define("array/is-array", [ "es.array.is-array" ]),
          isTemplateObject: define("array/is-template-object", [ "esnext.array.is-template-object" ]),
          of: define("array/of", [ "es.array.of" ])
        },
        ArrayBuffer: {
          isView: define(null, [ "es.array-buffer.is-view" ])
        },
        BigInt: {
          range: define("bigint/range", [ "esnext.bigint.range", "es.object.to-string" ])
        },
        Date: {
          now: define("date/now", [ "es.date.now" ])
        },
        Function: {
          isCallable: define("function/is-callable", [ "esnext.function.is-callable" ]),
          isConstructor: define("function/is-constructor", [ "esnext.function.is-constructor" ])
        },
        Iterator: {
          from: define("iterator/from", [ "esnext.iterator.from", ...IteratorDependencies, ...CommonIterators ])
        },
        JSON: {
          stringify: define("json/stringify", [ "es.json.stringify" ], "es.symbol")
        },
        Math: {
          DEG_PER_RAD: define("math/deg-per-rad", [ "esnext.math.deg-per-rad" ]),
          RAD_PER_DEG: define("math/rad-per-deg", [ "esnext.math.rad-per-deg" ]),
          acosh: define("math/acosh", [ "es.math.acosh" ]),
          asinh: define("math/asinh", [ "es.math.asinh" ]),
          atanh: define("math/atanh", [ "es.math.atanh" ]),
          cbrt: define("math/cbrt", [ "es.math.cbrt" ]),
          clamp: define("math/clamp", [ "esnext.math.clamp" ]),
          clz32: define("math/clz32", [ "es.math.clz32" ]),
          cosh: define("math/cosh", [ "es.math.cosh" ]),
          degrees: define("math/degrees", [ "esnext.math.degrees" ]),
          expm1: define("math/expm1", [ "es.math.expm1" ]),
          fround: define("math/fround", [ "es.math.fround" ]),
          fscale: define("math/fscale", [ "esnext.math.fscale" ]),
          hypot: define("math/hypot", [ "es.math.hypot" ]),
          iaddh: define("math/iaddh", [ "esnext.math.iaddh" ]),
          imul: define("math/imul", [ "es.math.imul" ]),
          imulh: define("math/imulh", [ "esnext.math.imulh" ]),
          isubh: define("math/isubh", [ "esnext.math.isubh" ]),
          log10: define("math/log10", [ "es.math.log10" ]),
          log1p: define("math/log1p", [ "es.math.log1p" ]),
          log2: define("math/log2", [ "es.math.log2" ]),
          radians: define("math/radians", [ "esnext.math.radians" ]),
          scale: define("math/scale", [ "esnext.math.scale" ]),
          seededPRNG: define("math/seeded-prng", [ "esnext.math.seeded-prng" ]),
          sign: define("math/sign", [ "es.math.sign" ]),
          signbit: define("math/signbit", [ "esnext.math.signbit" ]),
          sinh: define("math/sinh", [ "es.math.sinh" ]),
          tanh: define("math/tanh", [ "es.math.tanh" ]),
          trunc: define("math/trunc", [ "es.math.trunc" ]),
          umulh: define("math/umulh", [ "esnext.math.umulh" ])
        },
        Map: {
          from: define(null, [ "esnext.map.from", ...MapDependencies ]),
          groupBy: define(null, [ "esnext.map.group-by", ...MapDependencies ]),
          keyBy: define(null, [ "esnext.map.key-by", ...MapDependencies ]),
          of: define(null, [ "esnext.map.of", ...MapDependencies ])
        },
        Number: {
          EPSILON: define("number/epsilon", [ "es.number.epsilon" ]),
          MAX_SAFE_INTEGER: define("number/max-safe-integer", [ "es.number.max-safe-integer" ]),
          MIN_SAFE_INTEGER: define("number/min-safe-integer", [ "es.number.min-safe-integer" ]),
          fromString: define("number/from-string", [ "esnext.number.from-string" ]),
          isFinite: define("number/is-finite", [ "es.number.is-finite" ]),
          isInteger: define("number/is-integer", [ "es.number.is-integer" ]),
          isNaN: define("number/is-nan", [ "es.number.is-nan" ]),
          isSafeInteger: define("number/is-safe-integer", [ "es.number.is-safe-integer" ]),
          parseFloat: define("number/parse-float", [ "es.number.parse-float" ]),
          parseInt: define("number/parse-int", [ "es.number.parse-int" ]),
          range: define("number/range", [ "esnext.number.range", "es.object.to-string" ])
        },
        Object: {
          assign: define("object/assign", [ "es.object.assign" ]),
          create: define("object/create", [ "es.object.create" ]),
          defineProperties: define("object/define-properties", [ "es.object.define-properties" ]),
          defineProperty: define("object/define-property", [ "es.object.define-property" ]),
          entries: define("object/entries", [ "es.object.entries" ]),
          freeze: define("object/freeze", [ "es.object.freeze" ]),
          fromEntries: define("object/from-entries", [ "es.object.from-entries", "es.array.iterator" ]),
          getOwnPropertyDescriptor: define("object/get-own-property-descriptor", [ "es.object.get-own-property-descriptor" ]),
          getOwnPropertyDescriptors: define("object/get-own-property-descriptors", [ "es.object.get-own-property-descriptors" ]),
          getOwnPropertyNames: define("object/get-own-property-names", [ "es.object.get-own-property-names" ]),
          getOwnPropertySymbols: define("object/get-own-property-symbols", [ "es.symbol" ]),
          getPrototypeOf: define("object/get-prototype-of", [ "es.object.get-prototype-of" ]),
          hasOwn: define("object/has-own", [ "es.object.has-own" ]),
          is: define("object/is", [ "es.object.is" ]),
          isExtensible: define("object/is-extensible", [ "es.object.is-extensible" ]),
          isFrozen: define("object/is-frozen", [ "es.object.is-frozen" ]),
          isSealed: define("object/is-sealed", [ "es.object.is-sealed" ]),
          keys: define("object/keys", [ "es.object.keys" ]),
          preventExtensions: define("object/prevent-extensions", [ "es.object.prevent-extensions" ]),
          seal: define("object/seal", [ "es.object.seal" ]),
          setPrototypeOf: define("object/set-prototype-of", [ "es.object.set-prototype-of" ]),
          values: define("object/values", [ "es.object.values" ])
        },
        Promise: {
          all: define(null, PromiseDependenciesWithIterators),
          allSettled: define(null, [ "es.promise.all-settled", ...PromiseDependenciesWithIterators ]),
          any: define(null, [ "es.promise.any", "es.aggregate-error", ...PromiseDependenciesWithIterators ]),
          race: define(null, PromiseDependenciesWithIterators),
          try: define(null, [ "esnext.promise.try", ...PromiseDependenciesWithIterators ])
        },
        Reflect: {
          apply: define("reflect/apply", [ "es.reflect.apply" ]),
          construct: define("reflect/construct", [ "es.reflect.construct" ]),
          defineMetadata: define("reflect/define-metadata", [ "esnext.reflect.define-metadata" ]),
          defineProperty: define("reflect/define-property", [ "es.reflect.define-property" ]),
          deleteMetadata: define("reflect/delete-metadata", [ "esnext.reflect.delete-metadata" ]),
          deleteProperty: define("reflect/delete-property", [ "es.reflect.delete-property" ]),
          get: define("reflect/get", [ "es.reflect.get" ]),
          getMetadata: define("reflect/get-metadata", [ "esnext.reflect.get-metadata" ]),
          getMetadataKeys: define("reflect/get-metadata-keys", [ "esnext.reflect.get-metadata-keys" ]),
          getOwnMetadata: define("reflect/get-own-metadata", [ "esnext.reflect.get-own-metadata" ]),
          getOwnMetadataKeys: define("reflect/get-own-metadata-keys", [ "esnext.reflect.get-own-metadata-keys" ]),
          getOwnPropertyDescriptor: define("reflect/get-own-property-descriptor", [ "es.reflect.get-own-property-descriptor" ]),
          getPrototypeOf: define("reflect/get-prototype-of", [ "es.reflect.get-prototype-of" ]),
          has: define("reflect/has", [ "es.reflect.has" ]),
          hasMetadata: define("reflect/has-metadata", [ "esnext.reflect.has-metadata" ]),
          hasOwnMetadata: define("reflect/has-own-metadata", [ "esnext.reflect.has-own-metadata" ]),
          isExtensible: define("reflect/is-extensible", [ "es.reflect.is-extensible" ]),
          metadata: define("reflect/metadata", [ "esnext.reflect.metadata" ]),
          ownKeys: define("reflect/own-keys", [ "es.reflect.own-keys" ]),
          preventExtensions: define("reflect/prevent-extensions", [ "es.reflect.prevent-extensions" ]),
          set: define("reflect/set", [ "es.reflect.set" ]),
          setPrototypeOf: define("reflect/set-prototype-of", [ "es.reflect.set-prototype-of" ])
        },
        Set: {
          from: define(null, [ "esnext.set.from", ...SetDependencies ]),
          of: define(null, [ "esnext.set.of", ...SetDependencies ])
        },
        String: {
          cooked: define("string/cooked", [ "esnext.string.cooked" ]),
          fromCodePoint: define("string/from-code-point", [ "es.string.from-code-point" ]),
          raw: define("string/raw", [ "es.string.raw" ])
        },
        Symbol: {
          asyncDispose: define("symbol/async-dispose", [ "esnext.symbol.async-dispose" ]),
          asyncIterator: define("symbol/async-iterator", [ "es.symbol.async-iterator" ]),
          dispose: define("symbol/dispose", [ "esnext.symbol.dispose" ]),
          for: define("symbol/for", [], "es.symbol"),
          hasInstance: define("symbol/has-instance", [ "es.symbol.has-instance", "es.function.has-instance" ]),
          isConcatSpreadable: define("symbol/is-concat-spreadable", [ "es.symbol.is-concat-spreadable", "es.array.concat" ]),
          iterator: define("symbol/iterator", [ "es.symbol.iterator", ...CommonIteratorsWithTag ]),
          keyFor: define("symbol/key-for", [], "es.symbol"),
          match: define("symbol/match", [ "es.symbol.match", "es.string.match" ]),
          matcher: define("symbol/matcher", [ "esnext.symbol.matcher" ]),
          matchAll: define("symbol/match-all", [ "es.symbol.match-all", "es.string.match-all" ]),
          metadata: define("symbol/metadata", [ "esnext.symbol.metadata" ]),
          observable: define("symbol/observable", [ "esnext.symbol.observable" ]),
          patternMatch: define("symbol/pattern-match", [ "esnext.symbol.pattern-match" ]),
          replace: define("symbol/replace", [ "es.symbol.replace", "es.string.replace" ]),
          search: define("symbol/search", [ "es.symbol.search", "es.string.search" ]),
          species: define("symbol/species", [ "es.symbol.species", "es.array.species" ]),
          split: define("symbol/split", [ "es.symbol.split", "es.string.split" ]),
          toPrimitive: define("symbol/to-primitive", [ "es.symbol.to-primitive", "es.date.to-primitive" ]),
          toStringTag: define("symbol/to-string-tag", [ "es.symbol.to-string-tag", "es.object.to-string", "es.math.to-string-tag", "es.json.to-string-tag" ]),
          unscopables: define("symbol/unscopables", [ "es.symbol.unscopables" ])
        },
        WeakMap: {
          from: define(null, [ "esnext.weak-map.from", ...WeakMapDependencies ]),
          of: define(null, [ "esnext.weak-map.of", ...WeakMapDependencies ])
        },
        WeakSet: {
          from: define(null, [ "esnext.weak-set.from", ...WeakSetDependencies ]),
          of: define(null, [ "esnext.weak-set.of", ...WeakSetDependencies ])
        },
        Int8Array: TypedArrayStaticMethods,
        Uint8Array: TypedArrayStaticMethods,
        Uint8ClampedArray: TypedArrayStaticMethods,
        Int16Array: TypedArrayStaticMethods,
        Uint16Array: TypedArrayStaticMethods,
        Int32Array: TypedArrayStaticMethods,
        Uint32Array: TypedArrayStaticMethods,
        Float32Array: TypedArrayStaticMethods,
        Float64Array: TypedArrayStaticMethods,
        WebAssembly: {
          CompileError: define(null, ErrorDependencies),
          LinkError: define(null, ErrorDependencies),
          RuntimeError: define(null, ErrorDependencies)
        }
      };
      exports.StaticProperties = StaticProperties;
      const InstanceProperties = {
        asIndexedPairs: define("instance/asIndexedPairs", [ "esnext.async-iterator.as-indexed-pairs", ...AsyncIteratorDependencies, "esnext.iterator.as-indexed-pairs", ...IteratorDependencies ]),
        at: define("instance/at", [ "esnext.string.at", "es.string.at-alternative", "es.array.at" ]),
        anchor: define(null, [ "es.string.anchor" ]),
        big: define(null, [ "es.string.big" ]),
        bind: define("instance/bind", [ "es.function.bind" ]),
        blink: define(null, [ "es.string.blink" ]),
        bold: define(null, [ "es.string.bold" ]),
        codePointAt: define("instance/code-point-at", [ "es.string.code-point-at" ]),
        codePoints: define("instance/code-points", [ "esnext.string.code-points" ]),
        concat: define("instance/concat", [ "es.array.concat" ], void 0, [ "String" ]),
        copyWithin: define("instance/copy-within", [ "es.array.copy-within" ]),
        description: define(null, [ "es.symbol", "es.symbol.description" ]),
        dotAll: define("instance/dot-all", [ "es.regexp.dot-all" ]),
        drop: define("instance/drop", [ "esnext.async-iterator.drop", ...AsyncIteratorDependencies, "esnext.iterator.drop", ...IteratorDependencies ]),
        emplace: define("instance/emplace", [ "esnext.map.emplace", "esnext.weak-map.emplace" ]),
        endsWith: define("instance/ends-with", [ "es.string.ends-with" ]),
        entries: define("instance/entries", ArrayNatureIteratorsWithTag),
        every: define("instance/every", [ "es.array.every", "esnext.async-iterator.every", "esnext.iterator.every", ...IteratorDependencies ]),
        exec: define(null, [ "es.regexp.exec" ]),
        fill: define("instance/fill", [ "es.array.fill" ]),
        filter: define("instance/filter", [ "es.array.filter", "esnext.async-iterator.filter", "esnext.iterator.filter", ...IteratorDependencies ]),
        filterReject: define("instance/filterReject", [ "esnext.array.filter-reject" ]),
        finally: define(null, [ "es.promise.finally", ...PromiseDependencies ]),
        find: define("instance/find", [ "es.array.find", "esnext.async-iterator.find", "esnext.iterator.find", ...IteratorDependencies ]),
        findIndex: define("instance/find-index", [ "es.array.find-index" ]),
        findLast: define("instance/find-last", [ "esnext.array.find-last" ]),
        findLastIndex: define("instance/find-last-index", [ "esnext.array.find-last-index" ]),
        fixed: define(null, [ "es.string.fixed" ]),
        flags: define("instance/flags", [ "es.regexp.flags" ]),
        flatMap: define("instance/flat-map", [ "es.array.flat-map", "es.array.unscopables.flat-map", "esnext.async-iterator.flat-map", "esnext.iterator.flat-map", ...IteratorDependencies ]),
        flat: define("instance/flat", [ "es.array.flat", "es.array.unscopables.flat" ]),
        getYear: define(null, [ "es.date.get-year" ]),
        groupBy: define("instance/group-by", [ "esnext.array.group-by" ]),
        groupByToMap: define("instance/group-by-to-map", [ "esnext.array.group-by-to-map", "es.map", "es.object.to-string" ]),
        fontcolor: define(null, [ "es.string.fontcolor" ]),
        fontsize: define(null, [ "es.string.fontsize" ]),
        forEach: define("instance/for-each", [ "es.array.for-each", "esnext.async-iterator.for-each", "esnext.iterator.for-each", ...IteratorDependencies, "web.dom-collections.for-each" ]),
        includes: define("instance/includes", [ "es.array.includes", "es.string.includes" ]),
        indexOf: define("instance/index-of", [ "es.array.index-of" ]),
        italic: define(null, [ "es.string.italics" ]),
        join: define(null, [ "es.array.join" ]),
        keys: define("instance/keys", ArrayNatureIteratorsWithTag),
        lastIndex: define(null, [ "esnext.array.last-index" ]),
        lastIndexOf: define("instance/last-index-of", [ "es.array.last-index-of" ]),
        lastItem: define(null, [ "esnext.array.last-item" ]),
        link: define(null, [ "es.string.link" ]),
        map: define("instance/map", [ "es.array.map", "esnext.async-iterator.map", "esnext.iterator.map" ]),
        match: define(null, [ "es.string.match", "es.regexp.exec" ]),
        matchAll: define("instance/match-all", [ "es.string.match-all", "es.regexp.exec" ]),
        name: define(null, [ "es.function.name" ]),
        padEnd: define("instance/pad-end", [ "es.string.pad-end" ]),
        padStart: define("instance/pad-start", [ "es.string.pad-start" ]),
        reduce: define("instance/reduce", [ "es.array.reduce", "esnext.async-iterator.reduce", "esnext.iterator.reduce", ...IteratorDependencies ]),
        reduceRight: define("instance/reduce-right", [ "es.array.reduce-right" ]),
        repeat: define("instance/repeat", [ "es.string.repeat" ]),
        replace: define(null, [ "es.string.replace", "es.regexp.exec" ]),
        replaceAll: define("instance/replace-all", [ "es.string.replace-all", "es.string.replace", "es.regexp.exec" ]),
        reverse: define("instance/reverse", [ "es.array.reverse" ]),
        search: define(null, [ "es.string.search", "es.regexp.exec" ]),
        setYear: define(null, [ "es.date.set-year" ]),
        slice: define("instance/slice", [ "es.array.slice" ]),
        small: define(null, [ "es.string.small" ]),
        some: define("instance/some", [ "es.array.some", "esnext.async-iterator.some", "esnext.iterator.some", ...IteratorDependencies ]),
        sort: define("instance/sort", [ "es.array.sort" ]),
        splice: define("instance/splice", [ "es.array.splice" ]),
        split: define(null, [ "es.string.split", "es.regexp.exec" ]),
        startsWith: define("instance/starts-with", [ "es.string.starts-with" ]),
        sticky: define("instance/sticky", [ "es.regexp.sticky" ]),
        strike: define(null, [ "es.string.strike" ]),
        sub: define(null, [ "es.string.sub" ]),
        substr: define(null, [ "es.string.substr" ]),
        sup: define(null, [ "es.string.sup" ]),
        take: define("instance/take", [ "esnext.async-iterator.take", ...AsyncIteratorDependencies, "esnext.iterator.take", ...IteratorDependencies ]),
        test: define("instance/test", [ "es.regexp.test", "es.regexp.exec" ]),
        toArray: define("instance/to-array", [ "esnext.async-iterator.to-array", ...AsyncIteratorDependencies, "esnext.iterator.to-array", ...IteratorDependencies ]),
        toAsync: define(null, [ "esnext.iterator.to-async", ...IteratorDependencies, ...AsyncIteratorDependencies, ...AsyncIteratorProblemMethods ]),
        toExponential: define(null, [ "es.number.to-exponential" ]),
        toFixed: define(null, [ "es.number.to-fixed" ]),
        toGMTString: define(null, [ "es.date.to-gmt-string" ]),
        toISOString: define(null, [ "es.date.to-iso-string" ]),
        toJSON: define(null, [ "es.date.to-json", "web.url.to-json" ]),
        toPrecision: define(null, [ "es.number.to-precision" ]),
        toReversed: define("instance/to-reversed", [ "esnext.array.to-reversed" ]),
        toSorted: define("instance/to-sorted", [ "esnext.array.to-sorted", "es.array.sort" ]),
        toSpliced: define("instance/to-reversed", [ "esnext.array.to-spliced" ]),
        toString: define(null, [ "es.object.to-string", "es.error.to-string", "es.date.to-string", "es.regexp.to-string" ]),
        trim: define("instance/trim", [ "es.string.trim" ]),
        trimEnd: define("instance/trim-end", [ "es.string.trim-end" ]),
        trimLeft: define("instance/trim-left", [ "es.string.trim-start" ]),
        trimRight: define("instance/trim-right", [ "es.string.trim-end" ]),
        trimStart: define("instance/trim-start", [ "es.string.trim-start" ]),
        uniqueBy: define("instance/unique-by", [ "esnext.array.unique-by", "es.map" ]),
        unThis: define("instance/un-this", [ "esnext.function.un-this" ]),
        values: define("instance/values", ArrayNatureIteratorsWithTag),
        with: define("instance/with", [ "esnext.array.with" ]),
        __defineGetter__: define(null, [ "es.object.define-getter" ]),
        __defineSetter__: define(null, [ "es.object.define-setter" ]),
        __lookupGetter__: define(null, [ "es.object.lookup-getter" ]),
        __lookupSetter__: define(null, [ "es.object.lookup-setter" ])
      };
      exports.InstanceProperties = InstanceProperties;
      const CommonInstanceDependencies = new Set([ "es.object.to-string", "es.object.define-getter", "es.object.define-setter", "es.object.lookup-getter", "es.object.lookup-setter", "es.regexp.exec" ]);
      exports.CommonInstanceDependencies = CommonInstanceDependencies;
    },
    2510: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.default = void 0;
      var _data = _interopRequireDefault(__webpack_require__(6578)), _shippedProposals = _interopRequireDefault(__webpack_require__(7237)), _getModulesListForTargetVersion = _interopRequireDefault(__webpack_require__(3082)), _builtInDefinitions = __webpack_require__(348), babel = function(obj) {
        if (obj && obj.__esModule) return obj;
        if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
          default: obj
        };
        var cache = _getRequireWildcardCache();
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
        newObj.default = obj, cache && cache.set(obj, newObj);
        return newObj;
      }(__webpack_require__(4629)), _utils = __webpack_require__(5062), _helperDefinePolyfillProvider = _interopRequireDefault(__webpack_require__(9695));
      function _getRequireWildcardCache() {
        if ("function" != typeof WeakMap) return null;
        var cache = new WeakMap;
        return _getRequireWildcardCache = function() {
          return cache;
        }, cache;
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _extends() {
        return _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
          }
          return target;
        }, _extends.apply(this, arguments);
      }
      const {types: t} = babel.default || babel, esnextFallback = (name, cb) => {
        if (cb(name)) return !0;
        if (!name.startsWith("es.")) return !1;
        const fallback = `esnext.${name.slice(3)}`;
        return !!_data.default[fallback] && cb(fallback);
      };
      var _default = (0, _helperDefinePolyfillProvider.default)((function({getUtils, method, shouldInjectPolyfill, createMetaResolver, debug, babel}, {version = 3, proposals, shippedProposals, "#__secret_key__@babel/runtime__compatibility": {useBabelRuntime, ext = ".js"} = {}}) {
        const isWebpack = babel.caller((caller => "babel-loader" === (null == caller ? void 0 : caller.name))), resolve = createMetaResolver({
          global: _builtInDefinitions.BuiltIns,
          static: _builtInDefinitions.StaticProperties,
          instance: _builtInDefinitions.InstanceProperties
        }), available = new Set((0, _getModulesListForTargetVersion.default)(version));
        function maybeInjectGlobalImpl(name, utils) {
          return !!shouldInjectPolyfill(name) && (debug(name), utils.injectGlobalImport((0, 
          _utils.coreJSModule)(name)), !0);
        }
        function maybeInjectGlobal(names, utils, fallback = !0) {
          for (const name of names) fallback ? esnextFallback(name, (name => maybeInjectGlobalImpl(name, utils))) : maybeInjectGlobalImpl(name, utils);
        }
        function maybeInjectPure(desc, hint, utils, object) {
          if (desc.pure && !(object && desc.exclude && desc.exclude.includes(object)) && esnextFallback(desc.name, shouldInjectPolyfill)) {
            const {name} = desc;
            let useProposalBase = !1;
            (proposals || shippedProposals && name.startsWith("esnext.") || name.startsWith("es.") && !available.has(name)) && (useProposalBase = !0);
            const coreJSPureBase = function(useProposalBase) {
              return useBabelRuntime ? useProposalBase ? `${useBabelRuntime}/core-js` : `${useBabelRuntime}/core-js-stable` : useProposalBase ? "core-js-pure/features" : "core-js-pure/stable";
            }(useProposalBase);
            return utils.injectDefaultImport(`${coreJSPureBase}/${desc.pure}${ext}`, hint);
          }
        }
        return {
          name: "corejs3",
          polyfills: _data.default,
          filterPolyfills: name => !!available.has(name) && (!(!proposals && "entry-global" !== method) || (!(!shippedProposals || !_shippedProposals.default.has(name)) || function(name) {
            if (name.startsWith("esnext.")) return `es.${name.slice(7)}` in _data.default;
            return !0;
          }(name))),
          entryGlobal(meta, utils, path) {
            if ("import" !== meta.kind) return;
            const modules = (0, _utils.isCoreJSSource)(meta.source);
            if (!modules) return;
            if (1 === modules.length && meta.source === (0, _utils.coreJSModule)(modules[0]) && shouldInjectPolyfill(modules[0])) return void debug(null);
            const modulesSet = new Set(modules);
            maybeInjectGlobal(modules.filter((module => {
              if (!module.startsWith("esnext.")) return !0;
              const stable = module.replace("esnext.", "es.");
              return !modulesSet.has(stable) || !shouldInjectPolyfill(stable);
            })), utils, !1), path.remove();
          },
          usageGlobal(meta, utils) {
            const resolved = resolve(meta);
            if (!resolved) return;
            let deps = resolved.desc.global;
            if ("global" !== resolved.kind && meta.object && "prototype" === meta.placement) {
              const low = meta.object.toLowerCase();
              deps = deps.filter((m => m.includes(low) || _builtInDefinitions.CommonInstanceDependencies.has(m)));
            }
            maybeInjectGlobal(deps, utils);
          },
          usagePure(meta, utils, path) {
            if ("in" === meta.kind) return void ("Symbol.iterator" === meta.key && path.replaceWith(t.callExpression(utils.injectDefaultImport((0, 
            _utils.coreJSPureHelper)("is-iterable", useBabelRuntime, ext), "isIterable"), [ path.node.right ])));
            if (path.parentPath.isUnaryExpression({
              operator: "delete"
            })) return;
            let isCall;
            if ("property" === meta.kind) {
              if (!path.isMemberExpression()) return;
              if (!path.isReferenced()) return;
              if (isCall = path.parentPath.isCallExpression({
                callee: path.node
              }), "Symbol.iterator" === meta.key) {
                if (!shouldInjectPolyfill("es.symbol.iterator")) return;
                return void (isCall ? 0 === path.parent.arguments.length ? (path.parentPath.replaceWith(t.callExpression(utils.injectDefaultImport((0, 
                _utils.coreJSPureHelper)("get-iterator", useBabelRuntime, ext), "getIterator"), [ path.node.object ])), 
                path.skip()) : (0, _utils.callMethod)(path, utils.injectDefaultImport((0, _utils.coreJSPureHelper)("get-iterator-method", useBabelRuntime, ext), "getIteratorMethod")) : path.replaceWith(t.callExpression(utils.injectDefaultImport((0, 
                _utils.coreJSPureHelper)("get-iterator-method", useBabelRuntime, ext), "getIteratorMethod"), [ path.node.object ])));
              }
            }
            let resolved = resolve(meta);
            if (resolved) if (useBabelRuntime && resolved.desc.pure && "/index" === resolved.desc.pure.slice(-6) && (resolved = _extends({}, resolved, {
              desc: _extends({}, resolved.desc, {
                pure: resolved.desc.pure.slice(0, -6)
              })
            })), "global" === resolved.kind) {
              const id = maybeInjectPure(resolved.desc, resolved.name, utils);
              id && path.replaceWith(id);
            } else if ("static" === resolved.kind) {
              const id = maybeInjectPure(resolved.desc, resolved.name, utils, meta.object);
              id && path.replaceWith(id);
            } else if ("instance" === resolved.kind) {
              const id = maybeInjectPure(resolved.desc, `${resolved.name}InstanceProperty`, utils, meta.object);
              if (!id) return;
              isCall ? (0, _utils.callMethod)(path, id) : path.replaceWith(t.callExpression(id, [ path.node.object ]));
            }
          },
          visitor: "usage-global" === method && {
            CallExpression(path) {
              if (path.get("callee").isImport()) {
                const utils = getUtils(path);
                maybeInjectGlobal(isWebpack ? _builtInDefinitions.PromiseDependenciesWithIterators : _builtInDefinitions.PromiseDependencies, utils);
              }
            },
            Function(path) {
              path.node.async && maybeInjectGlobal(_builtInDefinitions.PromiseDependencies, getUtils(path));
            },
            "ForOfStatement|ArrayPattern"(path) {
              maybeInjectGlobal(_builtInDefinitions.CommonIterators, getUtils(path));
            },
            SpreadElement(path) {
              path.parentPath.isObjectExpression() || maybeInjectGlobal(_builtInDefinitions.CommonIterators, getUtils(path));
            },
            YieldExpression(path) {
              path.node.delegate && maybeInjectGlobal(_builtInDefinitions.CommonIterators, getUtils(path));
            }
          }
        };
      }));
      exports.default = _default;
    },
    5062: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      exports.__esModule = !0, exports.callMethod = function(path, id) {
        const {object} = path.node;
        let context1, context2;
        t.isIdentifier(object) ? (context1 = object, context2 = t.cloneNode(object)) : (context1 = path.scope.generateDeclaredUidIdentifier("context"), 
        context2 = t.assignmentExpression("=", t.cloneNode(context1), object));
        path.replaceWith(t.memberExpression(t.callExpression(id, [ context2 ]), t.identifier("call"))), 
        path.parentPath.unshiftContainer("arguments", context1);
      }, exports.isCoreJSSource = function(source) {
        "string" == typeof source && (source = source.replace(/\\/g, "/").replace(/(\/(index)?)?(\.js)?$/i, "").toLowerCase());
        return hasOwnProperty.call(_entries.default, source) && _entries.default[source];
      }, exports.coreJSModule = function(name) {
        return `core-js/modules/${name}.js`;
      }, exports.coreJSPureHelper = function(name, useBabelRuntime, ext) {
        return useBabelRuntime ? `${useBabelRuntime}/core-js/${name}${ext}` : `core-js-pure/features/${name}.js`;
      };
      var obj, babel = function(obj) {
        if (obj && obj.__esModule) return obj;
        if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
          default: obj
        };
        var cache = _getRequireWildcardCache();
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
        }
        newObj.default = obj, cache && cache.set(obj, newObj);
        return newObj;
      }(__webpack_require__(4629)), _entries = (obj = __webpack_require__(6860)) && obj.__esModule ? obj : {
        default: obj
      };
      function _getRequireWildcardCache() {
        if ("function" != typeof WeakMap) return null;
        var cache = new WeakMap;
        return _getRequireWildcardCache = function() {
          return cache;
        }, cache;
      }
      const {types: t} = babel.default || babel;
    },
    5488: module => {
      "use strict";
      module.exports = require("./helper-plugin-utils");
    },
    8459: module => {
      "use strict";
      module.exports = require("./types");
    },
    676: module => {
      "use strict";
      module.exports = require("../plugins/bugfix-safari-id-destructuring-collision-in-function-expression");
    },
    3098: module => {
      "use strict";
      module.exports = require("../plugins/bugfix-v8-spread-parameters-in-optional-chaining");
    },
    6560: module => {
      "use strict";
      module.exports = require("../plugins/proposal-async-generator-functions");
    },
    1957: module => {
      "use strict";
      module.exports = require("../plugins/proposal-class-properties");
    },
    1131: module => {
      "use strict";
      module.exports = require("../plugins/proposal-class-static-block");
    },
    4750: module => {
      "use strict";
      module.exports = require("../plugins/proposal-dynamic-import");
    },
    4363: module => {
      "use strict";
      module.exports = require("../plugins/proposal-export-namespace-from");
    },
    8464: module => {
      "use strict";
      module.exports = require("../plugins/proposal-json-strings");
    },
    7051: module => {
      "use strict";
      module.exports = require("../plugins/proposal-logical-assignment-operators");
    },
    1611: module => {
      "use strict";
      module.exports = require("../plugins/proposal-nullish-coalescing-operator");
    },
    9967: module => {
      "use strict";
      module.exports = require("../plugins/proposal-numeric-separator");
    },
    2073: module => {
      "use strict";
      module.exports = require("../plugins/proposal-object-rest-spread");
    },
    2496: module => {
      "use strict";
      module.exports = require("../plugins/proposal-optional-catch-binding");
    },
    6437: module => {
      "use strict";
      module.exports = require("../plugins/proposal-optional-chaining");
    },
    4667: module => {
      "use strict";
      module.exports = require("../plugins/proposal-private-methods");
    },
    8828: module => {
      "use strict";
      module.exports = require("../plugins/proposal-private-property-in-object");
    },
    2245: module => {
      "use strict";
      module.exports = require("../plugins/proposal-unicode-property-regex");
    },
    5906: module => {
      "use strict";
      module.exports = require("../plugins/syntax-async-generators");
    },
    7858: module => {
      "use strict";
      module.exports = require("../plugins/syntax-class-properties");
    },
    5401: module => {
      "use strict";
      module.exports = require("../plugins/syntax-class-static-block");
    },
    136: module => {
      "use strict";
      module.exports = require("../plugins/syntax-dynamic-import");
    },
    5732: module => {
      "use strict";
      module.exports = require("../plugins/syntax-export-namespace-from");
    },
    8593: module => {
      "use strict";
      module.exports = require("../plugins/syntax-json-strings");
    },
    3871: module => {
      "use strict";
      module.exports = require("../plugins/syntax-logical-assignment-operators");
    },
    7797: module => {
      "use strict";
      module.exports = require("../plugins/syntax-nullish-coalescing-operator");
    },
    1901: module => {
      "use strict";
      module.exports = require("../plugins/syntax-numeric-separator");
    },
    1976: module => {
      "use strict";
      module.exports = require("../plugins/syntax-object-rest-spread");
    },
    3117: module => {
      "use strict";
      module.exports = require("../plugins/syntax-optional-catch-binding");
    },
    5111: module => {
      "use strict";
      module.exports = require("../plugins/syntax-optional-chaining");
    },
    65: module => {
      "use strict";
      module.exports = require("../plugins/syntax-private-property-in-object");
    },
    4364: module => {
      "use strict";
      module.exports = require("../plugins/syntax-top-level-await");
    },
    7929: module => {
      "use strict";
      module.exports = require("../plugins/transform-arrow-functions");
    },
    5252: module => {
      "use strict";
      module.exports = require("../plugins/transform-async-arrows-in-class");
    },
    45: module => {
      "use strict";
      module.exports = require("../plugins/transform-async-to-generator");
    },
    7942: module => {
      "use strict";
      module.exports = require("../plugins/transform-block-scoped-functions");
    },
    4597: module => {
      "use strict";
      module.exports = require("../plugins/transform-block-scoping");
    },
    8031: module => {
      "use strict";
      module.exports = require("../plugins/transform-classes");
    },
    4041: module => {
      "use strict";
      module.exports = require("../plugins/transform-computed-properties");
    },
    7503: module => {
      "use strict";
      module.exports = require("../plugins/transform-destructuring");
    },
    8817: module => {
      "use strict";
      module.exports = require("../plugins/transform-dotall-regex");
    },
    5440: module => {
      "use strict";
      module.exports = require("../plugins/transform-duplicate-keys");
    },
    1841: module => {
      "use strict";
      module.exports = require("../plugins/transform-edge-default-parameters");
    },
    2292: module => {
      "use strict";
      module.exports = require("../plugins/transform-edge-function-name");
    },
    8010: module => {
      "use strict";
      module.exports = require("../plugins/transform-exponentiation-operator");
    },
    5394: module => {
      "use strict";
      module.exports = require("../plugins/transform-for-of");
    },
    3406: module => {
      "use strict";
      module.exports = require("../plugins/transform-function-name");
    },
    2839: module => {
      "use strict";
      module.exports = require("../plugins/transform-literals");
    },
    9762: module => {
      "use strict";
      module.exports = require("../plugins/transform-member-expression-literals");
    },
    9333: module => {
      "use strict";
      module.exports = require("../plugins/transform-modules-amd");
    },
    8991: module => {
      "use strict";
      module.exports = require("../plugins/transform-modules-commonjs");
    },
    3837: module => {
      "use strict";
      module.exports = require("../plugins/transform-modules-systemjs");
    },
    9694: module => {
      "use strict";
      module.exports = require("../plugins/transform-modules-umd");
    },
    582: module => {
      "use strict";
      module.exports = require("../plugins/transform-named-capturing-groups-regex");
    },
    8922: module => {
      "use strict";
      module.exports = require("../plugins/transform-new-target");
    },
    5319: module => {
      "use strict";
      module.exports = require("../plugins/transform-object-super");
    },
    3729: module => {
      "use strict";
      module.exports = require("../plugins/transform-parameters");
    },
    3672: module => {
      "use strict";
      module.exports = require("../plugins/transform-property-literals");
    },
    5642: module => {
      "use strict";
      module.exports = require("../plugins/transform-regenerator");
    },
    424: module => {
      "use strict";
      module.exports = require("../plugins/transform-reserved-words");
    },
    6916: module => {
      "use strict";
      module.exports = require("../plugins/transform-safari-block-shadowing");
    },
    4740: module => {
      "use strict";
      module.exports = require("../plugins/transform-safari-for-shadowing");
    },
    7386: module => {
      "use strict";
      module.exports = require("../plugins/transform-shorthand-properties");
    },
    1241: module => {
      "use strict";
      module.exports = require("../plugins/transform-spread");
    },
    7764: module => {
      "use strict";
      module.exports = require("../plugins/transform-sticky-regex");
    },
    1218: module => {
      "use strict";
      module.exports = require("../plugins/transform-tagged-template-caching");
    },
    268: module => {
      "use strict";
      module.exports = require("../plugins/transform-template-literals");
    },
    944: module => {
      "use strict";
      module.exports = require("../plugins/transform-typeof-symbol");
    },
    420: module => {
      "use strict";
      module.exports = require("../plugins/transform-unicode-escapes");
    },
    913: module => {
      "use strict";
      module.exports = require("../plugins/transform-unicode-regex");
    },
    4629: module => {
      "use strict";
      module.exports = require("@babel/core");
    },
    9712: module => {
      "use strict";
      module.exports = require("./browserslist");
    },
    5870: module => {
      "use strict";
      module.exports = require("./semver");
    },
    6860: module => {
      "use strict";
      module.exports = require("./core-js-compat.json");
    },
    5965: module => {
      "use strict";
      module.exports = require;
    },
    7147: module => {
      "use strict";
      module.exports = require("fs");
    },
    8188: module => {
      "use strict";
      module.exports = require("module");
    },
    1017: module => {
      "use strict";
      module.exports = require("path");
    },
    4817: module => {
      "use strict";
      module.exports = JSON.parse('{"es6.array.copy-within":{"chrome":"45","opera":"32","edge":"12","firefox":"32","safari":"9","node":"4","ios":"9","samsung":"5","rhino":"1.7.13","electron":"0.31"},"es6.array.every":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.fill":{"chrome":"45","opera":"32","edge":"12","firefox":"31","safari":"7.1","node":"4","ios":"8","samsung":"5","rhino":"1.7.13","electron":"0.31"},"es6.array.filter":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.array.find":{"chrome":"45","opera":"32","edge":"12","firefox":"25","safari":"7.1","node":"4","ios":"8","samsung":"5","rhino":"1.7.13","electron":"0.31"},"es6.array.find-index":{"chrome":"45","opera":"32","edge":"12","firefox":"25","safari":"7.1","node":"4","ios":"8","samsung":"5","rhino":"1.7.13","electron":"0.31"},"es7.array.flat-map":{"chrome":"69","opera":"56","edge":"79","firefox":"62","safari":"12","node":"11","ios":"12","samsung":"10","electron":"4.0"},"es6.array.for-each":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.from":{"chrome":"51","opera":"38","edge":"15","firefox":"36","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es7.array.includes":{"chrome":"47","opera":"34","edge":"14","firefox":"43","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.36"},"es6.array.index-of":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.is-array":{"chrome":"5","opera":"10.50","edge":"12","firefox":"4","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.iterator":{"chrome":"66","opera":"53","edge":"12","firefox":"60","safari":"9","node":"10","ios":"9","samsung":"9","rhino":"1.7.13","electron":"3.0"},"es6.array.last-index-of":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.map":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.array.of":{"chrome":"45","opera":"32","edge":"12","firefox":"25","safari":"9","node":"4","ios":"9","samsung":"5","rhino":"1.7.13","electron":"0.31"},"es6.array.reduce":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.reduce-right":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.slice":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.array.some":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.array.sort":{"chrome":"63","opera":"50","edge":"12","firefox":"5","safari":"12","node":"10","ie":"9","ios":"12","samsung":"8","rhino":"1.7.13","electron":"3.0"},"es6.array.species":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.date.now":{"chrome":"5","opera":"10.50","edge":"12","firefox":"2","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.date.to-iso-string":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3.5","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.date.to-json":{"chrome":"5","opera":"12.10","edge":"12","firefox":"4","safari":"10","node":"0.10","ie":"9","android":"4","ios":"10","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.date.to-primitive":{"chrome":"47","opera":"34","edge":"15","firefox":"44","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.36"},"es6.date.to-string":{"chrome":"5","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"10","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.function.bind":{"chrome":"7","opera":"12","edge":"12","firefox":"4","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.function.has-instance":{"chrome":"51","opera":"38","edge":"15","firefox":"50","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.function.name":{"chrome":"5","opera":"10.50","edge":"14","firefox":"2","safari":"4","node":"0.10","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.map":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.math.acosh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.asinh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.atanh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.cbrt":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.clz32":{"chrome":"38","opera":"25","edge":"12","firefox":"31","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.cosh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.expm1":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.fround":{"chrome":"38","opera":"25","edge":"12","firefox":"26","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.hypot":{"chrome":"38","opera":"25","edge":"12","firefox":"27","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.imul":{"chrome":"30","opera":"17","edge":"12","firefox":"23","safari":"7","node":"0.12","android":"4.4","ios":"7","samsung":"2","rhino":"1.7.13","electron":"0.20"},"es6.math.log1p":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.log10":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.log2":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.sign":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.sinh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.tanh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.math.trunc":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.number.constructor":{"chrome":"41","opera":"28","edge":"12","firefox":"36","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.number.epsilon":{"chrome":"34","opera":"21","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.14","electron":"0.20"},"es6.number.is-finite":{"chrome":"19","opera":"15","edge":"12","firefox":"16","safari":"9","node":"0.12","android":"4.1","ios":"9","samsung":"1.5","rhino":"1.7.13","electron":"0.20"},"es6.number.is-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"16","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.13","electron":"0.20"},"es6.number.is-nan":{"chrome":"19","opera":"15","edge":"12","firefox":"15","safari":"9","node":"0.12","android":"4.1","ios":"9","samsung":"1.5","rhino":"1.7.13","electron":"0.20"},"es6.number.is-safe-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"32","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.13","electron":"0.20"},"es6.number.max-safe-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"31","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.13","electron":"0.20"},"es6.number.min-safe-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"31","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.13","electron":"0.20"},"es6.number.parse-float":{"chrome":"34","opera":"21","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.14","electron":"0.20"},"es6.number.parse-int":{"chrome":"34","opera":"21","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"2","rhino":"1.7.14","electron":"0.20"},"es6.object.assign":{"chrome":"49","opera":"36","edge":"13","firefox":"36","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.object.create":{"chrome":"5","opera":"12","edge":"12","firefox":"4","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es7.object.define-getter":{"chrome":"62","opera":"49","edge":"16","firefox":"48","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3.0"},"es7.object.define-setter":{"chrome":"62","opera":"49","edge":"16","firefox":"48","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3.0"},"es6.object.define-property":{"chrome":"5","opera":"12","edge":"12","firefox":"4","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.object.define-properties":{"chrome":"5","opera":"12","edge":"12","firefox":"4","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es7.object.entries":{"chrome":"54","opera":"41","edge":"14","firefox":"47","safari":"10.1","node":"7","ios":"10.3","samsung":"6","rhino":"1.7.14","electron":"1.4"},"es6.object.freeze":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es6.object.get-own-property-descriptor":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es7.object.get-own-property-descriptors":{"chrome":"54","opera":"41","edge":"15","firefox":"50","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.4"},"es6.object.get-own-property-names":{"chrome":"40","opera":"27","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.object.get-prototype-of":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es7.object.lookup-getter":{"chrome":"62","opera":"49","edge":"79","firefox":"36","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3.0"},"es7.object.lookup-setter":{"chrome":"62","opera":"49","edge":"79","firefox":"36","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3.0"},"es6.object.prevent-extensions":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es6.object.to-string":{"chrome":"57","opera":"44","edge":"15","firefox":"51","safari":"10","node":"8","ios":"10","samsung":"7","electron":"1.7"},"es6.object.is":{"chrome":"19","opera":"15","edge":"12","firefox":"22","safari":"9","node":"0.12","android":"4.1","ios":"9","samsung":"1.5","rhino":"1.7.13","electron":"0.20"},"es6.object.is-frozen":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es6.object.is-sealed":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es6.object.is-extensible":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es6.object.keys":{"chrome":"40","opera":"27","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.object.seal":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.13","electron":"0.30"},"es6.object.set-prototype-of":{"chrome":"34","opera":"21","edge":"12","firefox":"31","safari":"9","node":"0.12","ie":"11","ios":"9","samsung":"2","rhino":"1.7.13","electron":"0.20"},"es7.object.values":{"chrome":"54","opera":"41","edge":"14","firefox":"47","safari":"10.1","node":"7","ios":"10.3","samsung":"6","rhino":"1.7.14","electron":"1.4"},"es6.promise":{"chrome":"51","opera":"38","edge":"14","firefox":"45","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es7.promise.finally":{"chrome":"63","opera":"50","edge":"18","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"8","electron":"3.0"},"es6.reflect.apply":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.construct":{"chrome":"49","opera":"36","edge":"13","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.define-property":{"chrome":"49","opera":"36","edge":"13","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.delete-property":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.get":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.get-own-property-descriptor":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.get-prototype-of":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.has":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.is-extensible":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.own-keys":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.prevent-extensions":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.set":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.set-prototype-of":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.regexp.constructor":{"chrome":"50","opera":"37","edge":"79","firefox":"40","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.flags":{"chrome":"49","opera":"36","edge":"79","firefox":"37","safari":"9","node":"6","ios":"9","samsung":"5","electron":"0.37"},"es6.regexp.match":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","rhino":"1.7.13","electron":"1.1"},"es6.regexp.replace":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.split":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.search":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","rhino":"1.7.13","electron":"1.1"},"es6.regexp.to-string":{"chrome":"50","opera":"37","edge":"79","firefox":"39","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.set":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.symbol":{"chrome":"51","opera":"38","edge":"79","firefox":"51","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es7.symbol.async-iterator":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3.0"},"es6.string.anchor":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.big":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.blink":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.bold":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.code-point-at":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.string.ends-with":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.string.fixed":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.fontcolor":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.fontsize":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.from-code-point":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.string.includes":{"chrome":"41","opera":"28","edge":"12","firefox":"40","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.string.italics":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.iterator":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"es6.string.link":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es7.string.pad-start":{"chrome":"57","opera":"44","edge":"15","firefox":"48","safari":"10","node":"8","ios":"10","samsung":"7","rhino":"1.7.13","electron":"1.7"},"es7.string.pad-end":{"chrome":"57","opera":"44","edge":"15","firefox":"48","safari":"10","node":"8","ios":"10","samsung":"7","rhino":"1.7.13","electron":"1.7"},"es6.string.raw":{"chrome":"41","opera":"28","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.14","electron":"0.21"},"es6.string.repeat":{"chrome":"41","opera":"28","edge":"12","firefox":"24","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.string.small":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.starts-with":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","rhino":"1.7.13","electron":"0.21"},"es6.string.strike":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.sub":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.sup":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","rhino":"1.7.14","electron":"0.20"},"es6.string.trim":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3.5","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es7.string.trim-left":{"chrome":"66","opera":"53","edge":"79","firefox":"61","safari":"12","node":"10","ios":"12","samsung":"9","rhino":"1.7.13","electron":"3.0"},"es7.string.trim-right":{"chrome":"66","opera":"53","edge":"79","firefox":"61","safari":"12","node":"10","ios":"12","samsung":"9","rhino":"1.7.13","electron":"3.0"},"es6.typed.array-buffer":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.data-view":{"chrome":"5","opera":"12","edge":"12","firefox":"15","safari":"5.1","node":"0.10","ie":"10","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"es6.typed.int8-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint8-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint8-clamped-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.int16-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint16-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.int32-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint32-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.float32-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.float64-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.weak-map":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"9","node":"6.5","ios":"9","samsung":"5","electron":"1.2"},"es6.weak-set":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"9","node":"6.5","ios":"9","samsung":"5","electron":"1.2"}}');
    },
    8392: module => {
      "use strict";
      module.exports = JSON.parse('{"es6.module":{"chrome":"61","and_chr":"61","edge":"16","firefox":"60","and_ff":"60","node":"13.2.0","opera":"48","op_mob":"48","safari":"10.1","ios":"10.3","samsung":"8.2","android":"61","electron":"2.0","ios_saf":"10.3"}}');
    },
    5224: module => {
      "use strict";
      module.exports = JSON.parse('{"transform-async-to-generator":["bugfix/transform-async-arrows-in-class"],"transform-parameters":["bugfix/transform-edge-default-parameters","bugfix/transform-safari-id-destructuring-collision-in-function-expression"],"transform-function-name":["bugfix/transform-edge-function-name"],"transform-block-scoping":["bugfix/transform-safari-block-shadowing","bugfix/transform-safari-for-shadowing"],"transform-template-literals":["bugfix/transform-tagged-template-caching"],"proposal-optional-chaining":["bugfix/transform-v8-spread-parameters-in-optional-chaining"]}');
    },
    4374: module => {
      "use strict";
      module.exports = JSON.parse('{"bugfix/transform-async-arrows-in-class":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"bugfix/transform-edge-default-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"52","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"bugfix/transform-edge-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"bugfix/transform-safari-block-shadowing":{"chrome":"49","opera":"36","edge":"12","firefox":"44","safari":"11","node":"6","ie":"11","ios":"11","samsung":"5","electron":"0.37"},"bugfix/transform-safari-for-shadowing":{"chrome":"49","opera":"36","edge":"12","firefox":"4","safari":"11","node":"6","ie":"11","ios":"11","samsung":"5","rhino":"1.7.13","electron":"0.37"},"bugfix/transform-safari-id-destructuring-collision-in-function-expression":{"chrome":"49","opera":"36","edge":"14","firefox":"2","node":"6","samsung":"5","electron":"0.37"},"bugfix/transform-tagged-template-caching":{"chrome":"41","opera":"28","edge":"12","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","rhino":"1.7.14","electron":"0.21"},"bugfix/transform-v8-spread-parameters-in-optional-chaining":{"chrome":"91","opera":"77","edge":"91","firefox":"74","safari":"13.1","node":"16.9","ios":"13.4","electron":"13.0"},"proposal-optional-chaining":{"chrome":"80","opera":"67","edge":"80","firefox":"74","safari":"13.1","node":"14","ios":"13.4","samsung":"13","electron":"8.0"},"transform-parameters":{"chrome":"49","opera":"36","edge":"15","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"10.1","node":"7.6","ios":"10.3","samsung":"6","electron":"1.6"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.21"},"transform-function-name":{"chrome":"51","opera":"38","edge":"14","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"}}');
    },
    7867: module => {
      "use strict";
      module.exports = JSON.parse('{"proposal-class-static-block":{"chrome":"94","opera":"80","edge":"94","firefox":"93","node":"16.11","electron":"15.0"},"proposal-private-property-in-object":{"chrome":"91","opera":"77","edge":"91","firefox":"90","safari":"15","node":"16.9","ios":"15","electron":"13.0"},"proposal-class-properties":{"chrome":"74","opera":"62","edge":"79","firefox":"90","safari":"14.1","node":"12","ios":"15","samsung":"11","electron":"6.0"},"proposal-private-methods":{"chrome":"84","opera":"70","edge":"84","firefox":"90","safari":"15","node":"14.6","ios":"15","samsung":"14","electron":"10.0"},"proposal-numeric-separator":{"chrome":"75","opera":"62","edge":"79","firefox":"70","safari":"13","node":"12.5","ios":"13","samsung":"11","rhino":"1.7.14","electron":"6.0"},"proposal-logical-assignment-operators":{"chrome":"85","opera":"71","edge":"85","firefox":"79","safari":"14","node":"15","ios":"14","samsung":"14","electron":"10.0"},"proposal-nullish-coalescing-operator":{"chrome":"80","opera":"67","edge":"80","firefox":"72","safari":"13.1","node":"14","ios":"13.4","samsung":"13","electron":"8.0"},"proposal-optional-chaining":{"chrome":"91","opera":"77","edge":"91","firefox":"74","safari":"13.1","node":"16.9","ios":"13.4","electron":"13.0"},"proposal-json-strings":{"chrome":"66","opera":"53","edge":"79","firefox":"62","safari":"12","node":"10","ios":"12","samsung":"9","rhino":"1.7.14","electron":"3.0"},"proposal-optional-catch-binding":{"chrome":"66","opera":"53","edge":"79","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"53","node":"6","samsung":"5","electron":"0.37"},"proposal-async-generator-functions":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3.0"},"proposal-object-rest-spread":{"chrome":"60","opera":"47","edge":"79","firefox":"55","safari":"11.1","node":"8.3","ios":"11.3","samsung":"8","electron":"2.0"},"transform-dotall-regex":{"chrome":"62","opera":"49","edge":"79","firefox":"78","safari":"11.1","node":"8.10","ios":"11.3","samsung":"8","electron":"3.0"},"proposal-unicode-property-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-named-capturing-groups-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"transform-exponentiation-operator":{"chrome":"52","opera":"39","edge":"14","firefox":"52","safari":"10.1","node":"7","ios":"10.3","samsung":"6","rhino":"1.7.14","electron":"1.3"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","electron":"0.21"},"transform-literals":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-arrow-functions":{"chrome":"47","opera":"34","edge":"13","firefox":"43","safari":"10","node":"6","ios":"10","samsung":"5","rhino":"1.7.13","electron":"0.36"},"transform-block-scoped-functions":{"chrome":"41","opera":"28","edge":"12","firefox":"46","safari":"10","node":"4","ie":"11","ios":"10","samsung":"3.4","electron":"0.21"},"transform-classes":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-object-super":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-shorthand-properties":{"chrome":"43","opera":"30","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"4","rhino":"1.7.14","electron":"0.27"},"transform-duplicate-keys":{"chrome":"42","opera":"29","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.25"},"transform-computed-properties":{"chrome":"44","opera":"31","edge":"12","firefox":"34","safari":"7.1","node":"4","ios":"8","samsung":"4","electron":"0.30"},"transform-for-of":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-sticky-regex":{"chrome":"49","opera":"36","edge":"13","firefox":"3","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-unicode-escapes":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-unicode-regex":{"chrome":"50","opera":"37","edge":"13","firefox":"46","safari":"12","node":"6","ios":"12","samsung":"5","electron":"1.1"},"transform-spread":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-destructuring":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"11","node":"6","ios":"11","samsung":"5","electron":"0.37"},"transform-typeof-symbol":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"transform-new-target":{"chrome":"46","opera":"33","edge":"14","firefox":"41","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-regenerator":{"chrome":"50","opera":"37","edge":"13","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"transform-member-expression-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-property-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-reserved-words":{"chrome":"13","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4.4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"proposal-export-namespace-from":{"chrome":"72","and_chr":"72","edge":"79","firefox":"80","and_ff":"80","node":"13.2","opera":"60","op_mob":"51","samsung":"11.0","android":"72","electron":"5.0"}}');
    },
    6578: module => {
      "use strict";
      module.exports = JSON.parse('{"es.symbol":{"android":"49","chrome":"49","deno":"1.0","edge":"15","electron":"0.37","firefox":"51","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.symbol.description":{"android":"70","chrome":"70","deno":"1.0","edge":"74","electron":"5.0","firefox":"63","ios":"12.2","node":"11.0","opera":"57","opera_mobile":"49","safari":"12.1","samsung":"10.0"},"es.symbol.async-iterator":{"android":"63","chrome":"63","deno":"1.0","edge":"74","electron":"3.0","firefox":"55","ios":"12.0","node":"10.0","opera":"50","opera_mobile":"46","safari":"12.0","samsung":"8.0"},"es.symbol.has-instance":{"android":"50","chrome":"50","deno":"1.0","edge":"15","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.is-concat-spreadable":{"android":"48","chrome":"48","deno":"1.0","edge":"15","electron":"0.37","firefox":"48","ios":"10.0","node":"6.0","opera":"35","opera_mobile":"35","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.iterator":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"36","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.symbol.match":{"android":"50","chrome":"50","deno":"1.0","edge":"74","electron":"1.1","firefox":"40","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.match-all":{"android":"73","chrome":"73","deno":"1.0","edge":"74","electron":"5.0","firefox":"67","ios":"13.0","node":"12.0","opera":"60","opera_mobile":"52","safari":"13","samsung":"11.0"},"es.symbol.replace":{"android":"50","chrome":"50","deno":"1.0","edge":"74","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.search":{"android":"50","chrome":"50","deno":"1.0","edge":"74","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.species":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"41","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.split":{"android":"50","chrome":"50","deno":"1.0","edge":"74","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.to-primitive":{"android":"47","chrome":"47","deno":"1.0","edge":"15","electron":"0.36","firefox":"44","ios":"10.0","node":"6.0","opera":"34","opera_mobile":"34","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.to-string-tag":{"android":"49","chrome":"49","deno":"1.0","edge":"15","electron":"0.37","firefox":"51","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.symbol.unscopables":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"48","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.error.cause":{"android":"94","chrome":"94","deno":"1.14","edge":"94","electron":"15.0","firefox":"91","ios":"15.0","node":"16.11","opera":"80","opera_mobile":"66","safari":"15.0","samsung":"17.0"},"es.error.to-string":{"android":"4.4.3","chrome":"33","deno":"1.0","edge":"12","electron":"0.20","firefox":"11","ie":"9","ios":"9.0","node":"0.11.13","opera":"20","opera_mobile":"20","rhino":"1.7.14","safari":"8.0","samsung":"2.0"},"es.aggregate-error":{"android":"85","chrome":"85","deno":"1.2","edge":"85","electron":"10.0","firefox":"79","ios":"14.0","node":"15.0","opera":"71","opera_mobile":"60","safari":"14.0","samsung":"14.0"},"es.aggregate-error.cause":{"android":"94","chrome":"94","deno":"1.14","edge":"94","electron":"15.0","firefox":"91","ios":"15.0","node":"16.11","opera":"80","opera_mobile":"66","safari":"15.0","samsung":"17.0"},"es.array.at":{"android":"92","chrome":"92","deno":"1.12","edge":"92","electron":"14.0","firefox":"90","ios":"15.4","node":"16.6","opera":"78","opera_mobile":"65","safari":"15.4","samsung":"16.0"},"es.array.concat":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.copy-within":{"android":"45","chrome":"45","deno":"1.0","edge":"12","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.every":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.array.fill":{"android":"45","chrome":"45","deno":"1.0","edge":"12","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.filter":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.find":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.find-index":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.flat":{"android":"69","chrome":"69","deno":"1.0","edge":"74","electron":"4.0","firefox":"62","ios":"12.0","node":"11.0","opera":"56","opera_mobile":"48","safari":"12.0","samsung":"10.0"},"es.array.flat-map":{"android":"69","chrome":"69","deno":"1.0","edge":"74","electron":"4.0","firefox":"62","ios":"12.0","node":"11.0","opera":"56","opera_mobile":"48","safari":"12.0","samsung":"10.0"},"es.array.for-each":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.array.from":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"53","ios":"9.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"9.0","samsung":"5.0"},"es.array.includes":{"android":"53","chrome":"53","deno":"1.0","edge":"14","electron":"1.4","firefox":"102","ios":"10.0","node":"7.0","opera":"40","opera_mobile":"40","safari":"10.0","samsung":"6.0"},"es.array.index-of":{"android":"51","chrome":"51","deno":"1.0","edge":"12","electron":"1.2","firefox":"47","ie":"9","ios":"8.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"7.1","samsung":"5.0"},"es.array.is-array":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"3.2","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"4.0","samsung":"1.0"},"es.array.iterator":{"android":"66","chrome":"66","deno":"1.0","edge":"15","electron":"3.0","firefox":"60","ios":"10.0","node":"10.0","opera":"53","opera_mobile":"47","safari":"10.0","samsung":"9.0"},"es.array.join":{"android":"4.4","chrome":"26","deno":"1.0","edge":"13","electron":"0.20","firefox":"4","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.array.last-index-of":{"android":"51","chrome":"51","deno":"1.0","edge":"12","electron":"1.2","firefox":"47","ie":"9","ios":"8.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"7.1","samsung":"5.0"},"es.array.map":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"50","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.of":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"25","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","rhino":"1.7.13","safari":"9.0","samsung":"5.0"},"es.array.reduce":{"android":"83","chrome":"83","deno":"1.0","edge":"12","electron":"9.0","firefox":"4","ie":"9","ios":"8.0","node":"6.0","opera":"69","opera_mobile":"59","rhino":"1.7.13","safari":"7.1","samsung":"13.0"},"es.array.reduce-right":{"android":"83","chrome":"83","deno":"1.0","edge":"12","electron":"9.0","firefox":"4","ie":"9","ios":"8.0","node":"6.0","opera":"69","opera_mobile":"59","rhino":"1.7.13","safari":"7.1","samsung":"13.0"},"es.array.reverse":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"5.5","ios":"12.2","node":"0.0.3","opera":"10.50","opera_mobile":"10.50","rhino":"1.7.13","safari":"12.0.2","samsung":"1.0"},"es.array.slice":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.some":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.array.sort":{"android":"70","chrome":"70","deno":"1.0","edge":"74","electron":"5.0","firefox":"4","ios":"12.0","node":"11.0","opera":"57","opera_mobile":"49","safari":"12.0","samsung":"10.0"},"es.array.species":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.splice":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"49","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.unscopables.flat":{"android":"73","chrome":"73","deno":"1.0","edge":"74","electron":"5.0","firefox":"67","ios":"13.0","node":"12.0","opera":"60","opera_mobile":"52","safari":"13","samsung":"11.0"},"es.array.unscopables.flat-map":{"android":"73","chrome":"73","deno":"1.0","edge":"74","electron":"5.0","firefox":"67","ios":"13.0","node":"12.0","opera":"60","opera_mobile":"52","safari":"13","samsung":"11.0"},"es.array-buffer.constructor":{"android":"4.4","chrome":"26","deno":"1.0","edge":"14","electron":"0.20","firefox":"44","ios":"12.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"12.0","samsung":"1.5"},"es.array-buffer.is-view":{"android":"4.4.3","chrome":"32","deno":"1.0","edge":"12","electron":"0.20","firefox":"29","ie":"11","ios":"8.0","node":"0.11.9","opera":"19","opera_mobile":"19","safari":"7.1","samsung":"2.0"},"es.array-buffer.slice":{"android":"4.4.3","chrome":"31","deno":"1.0","edge":"12","electron":"0.20","firefox":"46","ie":"11","ios":"12.2","node":"0.11.8","opera":"18","opera_mobile":"18","rhino":"1.7.13","safari":"12.1","samsung":"2.0"},"es.data-view":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"15","ie":"10","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.date.get-year":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"9","ios":"1.0","node":"0.0.3","opera":"3","opera_mobile":"3","phantom":"1.9","rhino":"1.7.13","safari":"1","samsung":"1.0"},"es.date.now":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ie":"9","ios":"3.2","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"4.0","samsung":"1.0"},"es.date.set-year":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"3","ios":"1.0","node":"0.0.3","opera":"3","opera_mobile":"3","phantom":"1.9","rhino":"1.7.13","safari":"1","samsung":"1.0"},"es.date.to-gmt-string":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"3","ios":"1.0","node":"0.0.3","opera":"3","opera_mobile":"3","phantom":"1.9","rhino":"1.7.13","safari":"1","samsung":"1.0"},"es.date.to-iso-string":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"7","ie":"9","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.date.to-json":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"10.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"10.0","samsung":"1.5"},"es.date.to-primitive":{"android":"47","chrome":"47","deno":"1.0","edge":"15","electron":"0.36","firefox":"44","ios":"10.0","node":"6.0","opera":"34","opera_mobile":"34","safari":"10.0","samsung":"5.0"},"es.date.to-string":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ie":"9","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.escape":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"3","ios":"1.0","node":"0.0.3","opera":"3","opera_mobile":"3","phantom":"1.9","rhino":"1.7.13","safari":"1","samsung":"1.0"},"es.function.bind":{"android":"3.0","chrome":"7","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"5.1","node":"0.1.101","opera":"12","opera_mobile":"12","phantom":"2.0","rhino":"1.7.13","safari":"5.1","samsung":"1.0"},"es.function.has-instance":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"50","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.function.name":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"3.2","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"4.0","samsung":"1.0"},"es.global-this":{"android":"71","chrome":"71","deno":"1.0","edge":"74","electron":"5.0","firefox":"65","ios":"12.2","node":"12.0","opera":"58","opera_mobile":"50","rhino":"1.7.14","safari":"12.1","samsung":"10.0"},"es.json.stringify":{"android":"72","chrome":"72","deno":"1.0","edge":"74","electron":"5.0","firefox":"64","ios":"12.2","node":"12.0","opera":"59","opera_mobile":"51","safari":"12.1","samsung":"11.0"},"es.json.to-string-tag":{"android":"50","chrome":"50","deno":"1.0","edge":"15","electron":"1.1","firefox":"51","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.map":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.math.acosh":{"android":"54","chrome":"54","deno":"1.0","edge":"13","electron":"1.4","firefox":"25","ios":"8.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"7.1","samsung":"6.0"},"es.math.asinh":{"android":"38","chrome":"38","deno":"1.0","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.atanh":{"android":"38","chrome":"38","deno":"1.0","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.cbrt":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.clz32":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"31","ios":"9.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"9.0","samsung":"3.0"},"es.math.cosh":{"android":"39","chrome":"39","deno":"1.0","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"1.0","opera":"26","opera_mobile":"26","rhino":"1.7.13","safari":"7.1","samsung":"3.4"},"es.math.expm1":{"android":"39","chrome":"39","deno":"1.0","edge":"13","electron":"0.20","firefox":"46","ios":"8.0","node":"1.0","opera":"26","opera_mobile":"26","rhino":"1.7.13","safari":"7.1","samsung":"3.4"},"es.math.fround":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"26","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.hypot":{"android":"78","chrome":"78","deno":"1.0","edge":"12","electron":"7.0","firefox":"27","ios":"8.0","node":"13.0","opera":"65","opera_mobile":"56","rhino":"1.7.13","safari":"7.1","samsung":"12.0"},"es.math.imul":{"android":"4.4","chrome":"28","deno":"1.0","edge":"13","electron":"0.20","firefox":"20","ios":"9.0","node":"0.11.1","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"9.0","samsung":"1.5"},"es.math.log10":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.log1p":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.log2":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.sign":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"9.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"9.0","samsung":"3.0"},"es.math.sinh":{"android":"39","chrome":"39","deno":"1.0","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"1.0","opera":"26","opera_mobile":"26","rhino":"1.7.13","safari":"7.1","samsung":"3.4"},"es.math.tanh":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.math.to-string-tag":{"android":"50","chrome":"50","deno":"1.0","edge":"15","electron":"1.1","firefox":"51","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.math.trunc":{"android":"38","chrome":"38","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.number.constructor":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"46","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.number.epsilon":{"android":"37","chrome":"34","deno":"1.0","edge":"12","electron":"0.20","firefox":"25","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","rhino":"1.7.14","safari":"9.0","samsung":"2.0"},"es.number.is-finite":{"android":"4.1","chrome":"19","deno":"1.0","edge":"12","electron":"0.20","firefox":"16","ios":"9.0","node":"0.7.3","opera":"15","opera_mobile":"15","rhino":"1.7.13","safari":"9.0","samsung":"1.5"},"es.number.is-integer":{"android":"37","chrome":"34","deno":"1.0","edge":"12","electron":"0.20","firefox":"16","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","rhino":"1.7.13","safari":"9.0","samsung":"2.0"},"es.number.is-nan":{"android":"4.1","chrome":"19","deno":"1.0","edge":"12","electron":"0.20","firefox":"15","ios":"9.0","node":"0.7.3","opera":"15","opera_mobile":"15","rhino":"1.7.13","safari":"9.0","samsung":"1.5"},"es.number.is-safe-integer":{"android":"37","chrome":"34","deno":"1.0","edge":"12","electron":"0.20","firefox":"32","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","rhino":"1.7.13","safari":"9.0","samsung":"2.0"},"es.number.max-safe-integer":{"android":"37","chrome":"34","deno":"1.0","edge":"12","electron":"0.20","firefox":"31","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","rhino":"1.7.13","safari":"9.0","samsung":"2.0"},"es.number.min-safe-integer":{"android":"37","chrome":"34","deno":"1.0","edge":"12","electron":"0.20","firefox":"31","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","rhino":"1.7.13","safari":"9.0","samsung":"2.0"},"es.number.parse-float":{"android":"37","chrome":"35","deno":"1.0","edge":"74","electron":"0.20","firefox":"39","ios":"11.0","node":"0.11.13","opera":"22","opera_mobile":"22","rhino":"1.7.14","safari":"11.0","samsung":"3.0"},"es.number.parse-int":{"android":"37","chrome":"35","deno":"1.0","edge":"74","electron":"0.20","firefox":"39","ios":"9.0","node":"0.11.13","opera":"22","opera_mobile":"22","rhino":"1.7.14","safari":"9.0","samsung":"3.0"},"es.number.to-exponential":{"android":"51","chrome":"51","deno":"1.0","edge":"18","electron":"1.2","firefox":"87","ios":"11.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.14","safari":"11","samsung":"5.0"},"es.number.to-fixed":{"android":"4.4","chrome":"26","deno":"1.0","edge":"74","electron":"0.20","firefox":"4","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.number.to-precision":{"android":"4.4","chrome":"26","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"8","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","rhino":"1.7.13","safari":"7.1","samsung":"1.5"},"es.object.assign":{"android":"49","chrome":"49","deno":"1.0","edge":"74","electron":"0.37","firefox":"36","ios":"9.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"9.0","samsung":"5.0"},"es.object.create":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"3.2","node":"0.1.27","opera":"12","opera_mobile":"12","phantom":"1.9","rhino":"1.7.13","safari":"4.0","samsung":"1.0"},"es.object.define-getter":{"android":"62","chrome":"62","deno":"1.0","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","rhino":"1.7.13","safari":"7.1","samsung":"8.0"},"es.object.define-properties":{"android":"37","chrome":"37","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"5.1","node":"0.11.15","opera":"12","opera_mobile":"12","phantom":"2.0","rhino":"1.7.13","safari":"5.1","samsung":"3.0"},"es.object.define-property":{"android":"37","chrome":"37","deno":"1.0","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"5.1","node":"0.11.15","opera":"12","opera_mobile":"12","phantom":"2.0","rhino":"1.7.13","safari":"5.1","samsung":"3.0"},"es.object.define-setter":{"android":"62","chrome":"62","deno":"1.0","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","rhino":"1.7.13","safari":"7.1","samsung":"8.0"},"es.object.entries":{"android":"54","chrome":"54","deno":"1.0","edge":"14","electron":"1.4","firefox":"47","ios":"10.3","node":"7.0","opera":"41","opera_mobile":"41","rhino":"1.7.14","safari":"10.1","samsung":"6.0"},"es.object.freeze":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.from-entries":{"android":"73","chrome":"73","deno":"1.0","edge":"74","electron":"5.0","firefox":"63","ios":"12.2","node":"12.0","opera":"60","opera_mobile":"52","rhino":"1.7.14","safari":"12.1","samsung":"11.0"},"es.object.get-own-property-descriptor":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.get-own-property-descriptors":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"50","ios":"10.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"10.0","samsung":"6.0"},"es.object.get-own-property-names":{"android":"40","chrome":"40","deno":"1.0","edge":"13","electron":"0.21","firefox":"34","ios":"9.0","node":"1.0","opera":"27","opera_mobile":"27","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.object.get-prototype-of":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.has-own":{"android":"93","chrome":"93","deno":"1.13","edge":"93","electron":"14.0","firefox":"92","ios":"15.4","node":"16.9","opera":"79","opera_mobile":"66","safari":"15.4","samsung":"17.0"},"es.object.is":{"android":"4.1","chrome":"19","deno":"1.0","edge":"12","electron":"0.20","firefox":"22","ios":"9.0","node":"0.7.3","opera":"15","opera_mobile":"15","rhino":"1.7.13","safari":"9.0","samsung":"1.5"},"es.object.is-extensible":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.is-frozen":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.is-sealed":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.keys":{"android":"40","chrome":"40","deno":"1.0","edge":"13","electron":"0.21","firefox":"35","ios":"9.0","node":"1.0","opera":"27","opera_mobile":"27","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.object.lookup-getter":{"android":"62","chrome":"62","deno":"1.0","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","rhino":"1.7.13","safari":"7.1","samsung":"8.0"},"es.object.lookup-setter":{"android":"62","chrome":"62","deno":"1.0","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","rhino":"1.7.13","safari":"7.1","samsung":"8.0"},"es.object.prevent-extensions":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.seal":{"android":"44","chrome":"44","deno":"1.0","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","rhino":"1.7.13","safari":"9.0","samsung":"4.0"},"es.object.set-prototype-of":{"android":"37","chrome":"34","deno":"1.0","edge":"12","electron":"0.20","firefox":"31","ie":"11","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","rhino":"1.7.13","safari":"9.0","samsung":"2.0"},"es.object.to-string":{"android":"49","chrome":"49","deno":"1.0","edge":"15","electron":"0.37","firefox":"51","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.object.values":{"android":"54","chrome":"54","deno":"1.0","edge":"14","electron":"1.4","firefox":"47","ios":"10.3","node":"7.0","opera":"41","opera_mobile":"41","rhino":"1.7.14","safari":"10.1","samsung":"6.0"},"es.parse-float":{"android":"37","chrome":"35","deno":"1.0","edge":"74","electron":"0.20","firefox":"8","ie":"8","ios":"8.0","node":"0.11.13","opera":"22","opera_mobile":"22","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.parse-int":{"android":"37","chrome":"35","deno":"1.0","edge":"74","electron":"0.20","firefox":"21","ie":"9","ios":"8.0","node":"0.11.13","opera":"22","opera_mobile":"22","rhino":"1.7.13","safari":"7.1","samsung":"3.0"},"es.promise":{"android":"67","chrome":"67","deno":"1.0","edge":"74","electron":"4.0","firefox":"69","ios":"11.0","node":"10.4","opera":"54","opera_mobile":"48","rhino":"1.7.14","safari":"11.0","samsung":"9.0"},"es.promise.all-settled":{"android":"76","chrome":"76","deno":"1.0","edge":"76","electron":"6.0","firefox":"71","ios":"13.0","node":"12.9","opera":"63","opera_mobile":"54","safari":"13","samsung":"12.0"},"es.promise.any":{"android":"85","chrome":"85","deno":"1.2","edge":"85","electron":"10.0","firefox":"79","ios":"14.0","node":"15.0","opera":"71","opera_mobile":"60","safari":"14.0","samsung":"14.0"},"es.promise.finally":{"android":"67","chrome":"67","deno":"1.0","edge":"74","electron":"4.0","firefox":"69","ios":"13.2.3","node":"10.4","opera":"54","opera_mobile":"48","rhino":"1.7.14","safari":"13.0.3","samsung":"9.0"},"es.reflect.apply":{"android":"49","chrome":"49","deno":"1.0","edge":"15","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.construct":{"android":"49","chrome":"49","deno":"1.0","edge":"15","electron":"0.37","firefox":"44","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.define-property":{"android":"49","chrome":"49","deno":"1.0","edge":"13","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.delete-property":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.get":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.get-own-property-descriptor":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.get-prototype-of":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.has":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.is-extensible":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.own-keys":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.prevent-extensions":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.set":{"android":"49","chrome":"49","deno":"1.0","edge":"74","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.set-prototype-of":{"android":"49","chrome":"49","deno":"1.0","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.to-string-tag":{"android":"86","chrome":"86","deno":"1.3","edge":"86","electron":"11.0","firefox":"82","ios":"14.0","node":"15.0","opera":"72","opera_mobile":"61","safari":"14.0","samsung":"14.0"},"es.regexp.constructor":{"android":"64","chrome":"64","deno":"1.0","edge":"74","electron":"3.0","firefox":"78","ios":"11.3","node":"10.0","opera":"51","opera_mobile":"47","safari":"11.1","samsung":"9.0"},"es.regexp.dot-all":{"android":"62","chrome":"62","deno":"1.0","edge":"74","electron":"3.0","firefox":"78","ios":"11.3","node":"8.10","opera":"49","opera_mobile":"46","safari":"11.1","samsung":"8.0"},"es.regexp.exec":{"android":"64","chrome":"64","deno":"1.0","edge":"74","electron":"3.0","firefox":"78","ios":"11.3","node":"10.0","opera":"51","opera_mobile":"47","safari":"11.1","samsung":"9.0"},"es.regexp.flags":{"android":"62","chrome":"62","deno":"1.0","edge":"74","electron":"3.0","firefox":"78","ios":"11.3","node":"8.10","opera":"49","opera_mobile":"46","safari":"11.1","samsung":"8.0"},"es.regexp.sticky":{"android":"49","chrome":"49","deno":"1.0","edge":"13","electron":"0.37","firefox":"3","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.regexp.test":{"android":"51","chrome":"51","deno":"1.0","edge":"74","electron":"1.2","firefox":"46","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.regexp.to-string":{"android":"50","chrome":"50","deno":"1.0","edge":"74","electron":"1.1","firefox":"46","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.set":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.string.at-alternative":{"android":"92","chrome":"92","deno":"1.12","edge":"92","electron":"14.0","firefox":"90","ios":"15.4","node":"16.6","opera":"78","opera_mobile":"65","safari":"15.4","samsung":"16.0"},"es.string.code-point-at":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"29","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.string.ends-with":{"android":"51","chrome":"51","deno":"1.0","edge":"74","electron":"1.2","firefox":"40","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.from-code-point":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"29","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.string.includes":{"android":"51","chrome":"51","deno":"1.0","edge":"74","electron":"1.2","firefox":"40","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.iterator":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"36","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.string.match":{"android":"51","chrome":"51","deno":"1.0","edge":"74","electron":"1.2","firefox":"49","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.match-all":{"android":"80","chrome":"80","deno":"1.0","edge":"80","electron":"8.0","firefox":"73","ios":"13.4","node":"14.0","opera":"67","opera_mobile":"57","safari":"13.1","samsung":"13.0"},"es.string.pad-end":{"android":"57","chrome":"57","deno":"1.0","edge":"15","electron":"1.7","firefox":"48","ios":"11.0","node":"8.0","opera":"44","opera_mobile":"43","rhino":"1.7.13","safari":"11.0","samsung":"7.0"},"es.string.pad-start":{"android":"57","chrome":"57","deno":"1.0","edge":"15","electron":"1.7","firefox":"48","ios":"11.0","node":"8.0","opera":"44","opera_mobile":"43","rhino":"1.7.13","safari":"11.0","samsung":"7.0"},"es.string.raw":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"34","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.14","safari":"9.0","samsung":"3.4"},"es.string.repeat":{"android":"41","chrome":"41","deno":"1.0","edge":"13","electron":"0.21","firefox":"24","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","rhino":"1.7.13","safari":"9.0","samsung":"3.4"},"es.string.replace":{"android":"64","chrome":"64","deno":"1.0","edge":"74","electron":"3.0","firefox":"78","ios":"14.0","node":"10.0","opera":"51","opera_mobile":"47","safari":"14.0","samsung":"9.0"},"es.string.replace-all":{"android":"85","chrome":"85","deno":"1.2","edge":"85","electron":"10.0","firefox":"77","ios":"13.4","node":"15.0","opera":"71","opera_mobile":"60","safari":"13.1","samsung":"14.0"},"es.string.search":{"android":"51","chrome":"51","deno":"1.0","edge":"74","electron":"1.2","firefox":"49","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.split":{"android":"54","chrome":"54","deno":"1.0","edge":"74","electron":"1.4","firefox":"49","ios":"10.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"10.0","samsung":"6.0"},"es.string.starts-with":{"android":"51","chrome":"51","deno":"1.0","edge":"74","electron":"1.2","firefox":"40","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.substr":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"9","ios":"1.0","node":"0.0.3","opera":"4","opera_mobile":"4","phantom":"1.9","rhino":"1.7.13","safari":"1","samsung":"1.0"},"es.string.trim":{"android":"59","chrome":"59","deno":"1.0","edge":"15","electron":"1.8","firefox":"52","ios":"12.2","node":"8.3","opera":"46","opera_mobile":"43","safari":"12.1","samsung":"7.0"},"es.string.trim-end":{"android":"66","chrome":"66","deno":"1.0","edge":"74","electron":"3.0","firefox":"61","ios":"12.2","node":"10.0","opera":"53","opera_mobile":"47","safari":"12.1","samsung":"9.0"},"es.string.trim-start":{"android":"66","chrome":"66","deno":"1.0","edge":"74","electron":"3.0","firefox":"61","ios":"12.0","node":"10.0","opera":"53","opera_mobile":"47","safari":"12.0","samsung":"9.0"},"es.string.anchor":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","rhino":"1.7.14","safari":"6.0","samsung":"1.0"},"es.string.big":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.blink":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.bold":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.fixed":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.fontcolor":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","rhino":"1.7.14","safari":"6.0","samsung":"1.0"},"es.string.fontsize":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","rhino":"1.7.14","safari":"6.0","samsung":"1.0"},"es.string.italics":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.link":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","rhino":"1.7.14","safari":"6.0","samsung":"1.0"},"es.string.small":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.strike":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.sub":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.string.sup":{"android":"3.0","chrome":"5","deno":"1.0","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","rhino":"1.7.13","safari":"3.1","samsung":"1.0"},"es.typed-array.float32-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.float64-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.int8-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.int16-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.int32-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.uint8-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.uint8-clamped-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.uint16-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.uint32-array":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.at":{"android":"92","chrome":"92","deno":"1.12","edge":"92","electron":"14.0","firefox":"90","ios":"15.4","node":"16.6","opera":"78","opera_mobile":"65","safari":"15.4","samsung":"16.0"},"es.typed-array.copy-within":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"34","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.every":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.fill":{"android":"58","chrome":"58","deno":"1.0","edge":"74","electron":"1.7","firefox":"55","ios":"14.5","node":"8.0","opera":"45","opera_mobile":"43","safari":"14.1","samsung":"7.0"},"es.typed-array.filter":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.find":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.find-index":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.for-each":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.from":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.includes":{"android":"49","chrome":"49","deno":"1.0","edge":"14","electron":"0.37","firefox":"43","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.typed-array.index-of":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.iterator":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"37","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.typed-array.join":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.last-index-of":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.map":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.of":{"android":"54","chrome":"54","deno":"1.0","edge":"15","electron":"1.4","firefox":"55","ios":"14.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"14.0","samsung":"6.0"},"es.typed-array.reduce":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.reduce-right":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.reverse":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.set":{"android":"95","chrome":"95","deno":"1.15","edge":"95","electron":"16.0","firefox":"54","ios":"14.5","node":"17.0","opera":"81","opera_mobile":"67","safari":"14.1","samsung":"17.0"},"es.typed-array.slice":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.some":{"android":"45","chrome":"45","deno":"1.0","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.sort":{"android":"74","chrome":"74","deno":"1.0","edge":"74","electron":"6.0","firefox":"67","ios":"14.5","node":"12.0","opera":"61","opera_mobile":"53","safari":"14.1","samsung":"11.0"},"es.typed-array.subarray":{"android":"4.4","chrome":"26","deno":"1.0","edge":"13","electron":"0.20","firefox":"15","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.typed-array.to-locale-string":{"android":"45","chrome":"45","deno":"1.0","edge":"74","electron":"0.31","firefox":"51","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.to-string":{"android":"51","chrome":"51","deno":"1.0","edge":"13","electron":"1.2","firefox":"51","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.unescape":{"android":"3.0","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"3","ios":"1.0","node":"0.0.3","opera":"3","opera_mobile":"3","phantom":"1.9","rhino":"1.7.13","safari":"1","samsung":"1.0"},"es.weak-map":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"es.weak-set":{"android":"51","chrome":"51","deno":"1.0","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","rhino":"1.7.13","safari":"10.0","samsung":"5.0"},"esnext.aggregate-error":{"android":"85","chrome":"85","deno":"1.2","edge":"85","electron":"10.0","firefox":"79","ios":"14.0","node":"15.0","opera":"71","opera_mobile":"60","safari":"14.0","samsung":"14.0"},"esnext.array.from-async":{},"esnext.array.at":{"android":"92","chrome":"92","deno":"1.12","edge":"92","electron":"14.0","firefox":"90","ios":"15.4","node":"16.6","opera":"78","opera_mobile":"65","safari":"15.4","samsung":"16.0"},"esnext.array.filter-out":{},"esnext.array.filter-reject":{},"esnext.array.find-last":{"android":"97","chrome":"97","deno":"1.16","edge":"97","electron":"17.0","ios":"15.4","node":"18.0","opera":"83","opera_mobile":"68","safari":"15.4"},"esnext.array.find-last-index":{"android":"97","chrome":"97","deno":"1.16","edge":"97","electron":"17.0","ios":"15.4","node":"18.0","opera":"83","opera_mobile":"68","safari":"15.4"},"esnext.array.group-by":{},"esnext.array.group-by-to-map":{},"esnext.array.is-template-object":{},"esnext.array.last-index":{},"esnext.array.last-item":{},"esnext.array.to-reversed":{},"esnext.array.to-sorted":{},"esnext.array.to-spliced":{},"esnext.array.unique-by":{},"esnext.array.with":{},"esnext.async-iterator.constructor":{},"esnext.async-iterator.as-indexed-pairs":{},"esnext.async-iterator.drop":{},"esnext.async-iterator.every":{},"esnext.async-iterator.filter":{},"esnext.async-iterator.find":{},"esnext.async-iterator.flat-map":{},"esnext.async-iterator.for-each":{},"esnext.async-iterator.from":{},"esnext.async-iterator.map":{},"esnext.async-iterator.reduce":{},"esnext.async-iterator.some":{},"esnext.async-iterator.take":{},"esnext.async-iterator.to-array":{},"esnext.bigint.range":{},"esnext.composite-key":{},"esnext.composite-symbol":{},"esnext.function.is-callable":{},"esnext.function.is-constructor":{},"esnext.function.un-this":{},"esnext.global-this":{"android":"71","chrome":"71","deno":"1.0","edge":"74","electron":"5.0","firefox":"65","ios":"12.2","node":"12.0","opera":"58","opera_mobile":"50","rhino":"1.7.14","safari":"12.1","samsung":"10.0"},"esnext.iterator.constructor":{},"esnext.iterator.as-indexed-pairs":{},"esnext.iterator.drop":{},"esnext.iterator.every":{},"esnext.iterator.filter":{},"esnext.iterator.find":{},"esnext.iterator.flat-map":{},"esnext.iterator.for-each":{},"esnext.iterator.from":{},"esnext.iterator.map":{},"esnext.iterator.reduce":{},"esnext.iterator.some":{},"esnext.iterator.take":{},"esnext.iterator.to-array":{},"esnext.iterator.to-async":{},"esnext.map.delete-all":{},"esnext.map.emplace":{},"esnext.map.every":{},"esnext.map.filter":{},"esnext.map.find":{},"esnext.map.find-key":{},"esnext.map.from":{},"esnext.map.group-by":{},"esnext.map.includes":{},"esnext.map.key-by":{},"esnext.map.key-of":{},"esnext.map.map-keys":{},"esnext.map.map-values":{},"esnext.map.merge":{},"esnext.map.of":{},"esnext.map.reduce":{},"esnext.map.some":{},"esnext.map.update":{},"esnext.map.update-or-insert":{},"esnext.map.upsert":{},"esnext.math.clamp":{},"esnext.math.deg-per-rad":{},"esnext.math.degrees":{},"esnext.math.fscale":{},"esnext.math.iaddh":{},"esnext.math.imulh":{},"esnext.math.isubh":{},"esnext.math.rad-per-deg":{},"esnext.math.radians":{},"esnext.math.scale":{},"esnext.math.seeded-prng":{},"esnext.math.signbit":{},"esnext.math.umulh":{},"esnext.number.from-string":{},"esnext.number.range":{},"esnext.object.has-own":{"android":"93","chrome":"93","deno":"1.13","edge":"93","electron":"14.0","firefox":"92","ios":"15.4","node":"16.9","opera":"79","opera_mobile":"66","safari":"15.4","samsung":"17.0"},"esnext.object.iterate-entries":{},"esnext.object.iterate-keys":{},"esnext.object.iterate-values":{},"esnext.observable":{},"esnext.promise.all-settled":{"android":"76","chrome":"76","deno":"1.0","edge":"76","electron":"6.0","firefox":"71","ios":"13.0","node":"12.9","opera":"63","opera_mobile":"54","safari":"13","samsung":"12.0"},"esnext.promise.any":{"android":"85","chrome":"85","deno":"1.2","edge":"85","electron":"10.0","firefox":"79","ios":"14.0","node":"15.0","opera":"71","opera_mobile":"60","safari":"14.0","samsung":"14.0"},"esnext.promise.try":{},"esnext.reflect.define-metadata":{},"esnext.reflect.delete-metadata":{},"esnext.reflect.get-metadata":{},"esnext.reflect.get-metadata-keys":{},"esnext.reflect.get-own-metadata":{},"esnext.reflect.get-own-metadata-keys":{},"esnext.reflect.has-metadata":{},"esnext.reflect.has-own-metadata":{},"esnext.reflect.metadata":{},"esnext.set.add-all":{},"esnext.set.delete-all":{},"esnext.set.difference":{},"esnext.set.every":{},"esnext.set.filter":{},"esnext.set.find":{},"esnext.set.from":{},"esnext.set.intersection":{},"esnext.set.is-disjoint-from":{},"esnext.set.is-subset-of":{},"esnext.set.is-superset-of":{},"esnext.set.join":{},"esnext.set.map":{},"esnext.set.of":{},"esnext.set.reduce":{},"esnext.set.some":{},"esnext.set.symmetric-difference":{},"esnext.set.union":{},"esnext.string.at":{},"esnext.string.cooked":{},"esnext.string.code-points":{},"esnext.string.match-all":{"android":"80","chrome":"80","deno":"1.0","edge":"80","electron":"8.0","firefox":"73","ios":"13.4","node":"14.0","opera":"67","opera_mobile":"57","safari":"13.1","samsung":"13.0"},"esnext.string.replace-all":{"android":"85","chrome":"85","deno":"1.2","edge":"85","electron":"10.0","firefox":"77","ios":"13.4","node":"15.0","opera":"71","opera_mobile":"60","safari":"13.1","samsung":"14.0"},"esnext.symbol.async-dispose":{},"esnext.symbol.dispose":{},"esnext.symbol.matcher":{},"esnext.symbol.metadata":{},"esnext.symbol.observable":{},"esnext.symbol.pattern-match":{},"esnext.symbol.replace-all":{},"esnext.typed-array.from-async":{},"esnext.typed-array.at":{"android":"92","chrome":"92","deno":"1.12","edge":"92","electron":"14.0","firefox":"90","ios":"15.4","node":"16.6","opera":"78","opera_mobile":"65","safari":"15.4","samsung":"16.0"},"esnext.typed-array.filter-out":{},"esnext.typed-array.filter-reject":{},"esnext.typed-array.find-last":{"android":"97","chrome":"97","deno":"1.16","edge":"97","electron":"17.0","ios":"15.4","node":"18.0","opera":"83","opera_mobile":"68","safari":"15.4"},"esnext.typed-array.find-last-index":{"android":"97","chrome":"97","deno":"1.16","edge":"97","electron":"17.0","ios":"15.4","node":"18.0","opera":"83","opera_mobile":"68","safari":"15.4"},"esnext.typed-array.group-by":{},"esnext.typed-array.to-reversed":{},"esnext.typed-array.to-sorted":{},"esnext.typed-array.to-spliced":{},"esnext.typed-array.unique-by":{},"esnext.typed-array.with":{},"esnext.weak-map.delete-all":{},"esnext.weak-map.from":{},"esnext.weak-map.of":{},"esnext.weak-map.emplace":{},"esnext.weak-map.upsert":{},"esnext.weak-set.add-all":{},"esnext.weak-set.delete-all":{},"esnext.weak-set.from":{},"esnext.weak-set.of":{},"web.atob":{"android":"37","chrome":"34","deno":"1.0","edge":"16","electron":"0.20","firefox":"27","ios":"10.3","node":"18.0","opera":"10.5","opera_mobile":"10.5","safari":"10.1","samsung":"2.0"},"web.btoa":{"android":"3.0","chrome":"4","deno":"1.0","edge":"16","electron":"0.20","firefox":"27","ios":"1.0","node":"17.5","opera":"10.5","opera_mobile":"10.5","phantom":"1.9","safari":"3.0","samsung":"1.0"},"web.dom-collections.for-each":{"android":"58","chrome":"58","deno":"1.0","edge":"16","electron":"1.7","firefox":"50","ios":"10.0","node":"0.0.1","opera":"45","opera_mobile":"43","rhino":"1.7.13","safari":"10.0","samsung":"7.0"},"web.dom-collections.iterator":{"android":"66","chrome":"66","deno":"1.0","edge":"74","electron":"3.0","firefox":"60","ios":"13.4","node":"0.0.1","opera":"53","opera_mobile":"47","rhino":"1.7.13","safari":"13.1","samsung":"9.0"},"web.dom-exception.constructor":{"android":"46","chrome":"46","deno":"1.7","edge":"74","electron":"0.36","firefox":"37","ios":"11.3","node":"17.0","opera":"33","opera_mobile":"33","safari":"11.1","samsung":"5.0"},"web.dom-exception.stack":{"deno":"1.15","firefox":"37","node":"17.0"},"web.dom-exception.to-string-tag":{"android":"49","chrome":"49","deno":"1.7","edge":"74","electron":"0.37","firefox":"51","ios":"11.3","node":"17.0","opera":"36","opera_mobile":"36","safari":"11.1","samsung":"5.0"},"web.immediate":{"ie":"10","node":"0.9.1"},"web.queue-microtask":{"android":"71","chrome":"71","deno":"1.0","edge":"74","electron":"5.0","firefox":"69","ios":"12.2","node":"12.0","opera":"58","opera_mobile":"50","safari":"12.1","samsung":"10.0"},"web.structured-clone":{},"web.timers":{"android":"1.5","chrome":"1","deno":"1.0","edge":"12","electron":"0.20","firefox":"1","ie":"10","ios":"1.0","node":"0.0.1","opera":"7","opera_mobile":"7","phantom":"1.9","rhino":"1.7.13","safari":"1.0","samsung":"1.0"},"web.url":{"android":"67","chrome":"67","deno":"1.0","edge":"74","electron":"4.0","firefox":"57","ios":"14.0","node":"10.0","opera":"54","opera_mobile":"48","safari":"14.0","samsung":"9.0"},"web.url.to-json":{"android":"71","chrome":"71","deno":"1.0","edge":"74","electron":"5.0","firefox":"57","ios":"14.0","node":"10.0","opera":"58","opera_mobile":"50","safari":"14.0","samsung":"10.0"},"web.url-search-params":{"android":"67","chrome":"67","deno":"1.0","edge":"74","electron":"4.0","firefox":"57","ios":"14.0","node":"10.0","opera":"54","opera_mobile":"48","safari":"14.0","samsung":"9.0"}}');
    },
    2878: module => {
      "use strict";
      module.exports = JSON.parse('{"3.0":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set","esnext.aggregate-error","esnext.array.last-index","esnext.array.last-item","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"],"3.1":["es.string.match-all","es.symbol.match-all","esnext.symbol.replace-all"],"3.2":["es.promise.all-settled","esnext.array.is-template-object","esnext.map.update-or-insert","esnext.symbol.async-dispose"],"3.3":["es.global-this","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.upsert","esnext.weak-map.upsert"],"3.4":["es.json.stringify"],"3.5":["esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values"],"3.6":["es.regexp.sticky","es.regexp.test"],"3.7":["es.aggregate-error","es.promise.any","es.reflect.to-string-tag","es.string.replace-all","esnext.map.emplace","esnext.weak-map.emplace"],"3.8":["esnext.array.at","esnext.array.filter-out","esnext.array.unique-by","esnext.bigint.range","esnext.number.range","esnext.typed-array.at","esnext.typed-array.filter-out"],"3.9":["esnext.array.find-last","esnext.array.find-last-index","esnext.typed-array.find-last","esnext.typed-array.find-last-index","esnext.typed-array.unique-by"],"3.11":["esnext.object.has-own"],"3.12":["esnext.symbol.matcher","esnext.symbol.metadata"],"3.15":["es.date.get-year","es.date.set-year","es.date.to-gmt-string","es.escape","es.regexp.dot-all","es.string.substr","es.unescape"],"3.16":["esnext.array.filter-reject","esnext.array.group-by","esnext.typed-array.filter-reject","esnext.typed-array.group-by"],"3.17":["es.array.at","es.object.has-own","es.string.at-alternative","es.typed-array.at"],"3.18":["esnext.array.from-async","esnext.typed-array.from-async"],"3.20":["es.error.cause","es.error.to-string","es.aggregate-error.cause","es.number.to-exponential","esnext.array.group-by-to-map","esnext.array.to-reversed","esnext.array.to-sorted","esnext.array.to-spliced","esnext.array.with","esnext.function.is-callable","esnext.function.is-constructor","esnext.function.un-this","esnext.iterator.to-async","esnext.string.cooked","esnext.typed-array.to-reversed","esnext.typed-array.to-sorted","esnext.typed-array.to-spliced","esnext.typed-array.with","web.dom-exception.constructor","web.dom-exception.stack","web.dom-exception.to-string-tag","web.structured-clone"],"3.21":["web.atob","web.btoa"]}');
    },
    9343: module => {
      "use strict";
      module.exports = JSON.parse('["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.error.cause","es.error.to-string","es.aggregate-error","es.aggregate-error.cause","es.array.at","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.get-year","es.date.now","es.date.set-year","es.date.to-gmt-string","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.escape","es.function.bind","es.function.has-instance","es.function.name","es.global-this","es.json.stringify","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-exponential","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.has-own","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.all-settled","es.promise.any","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.reflect.to-string-tag","es.regexp.constructor","es.regexp.dot-all","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.set","es.string.at-alternative","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.replace-all","es.string.search","es.string.split","es.string.starts-with","es.string.substr","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.at","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.unescape","es.weak-map","es.weak-set","esnext.aggregate-error","esnext.array.from-async","esnext.array.at","esnext.array.filter-out","esnext.array.filter-reject","esnext.array.find-last","esnext.array.find-last-index","esnext.array.group-by","esnext.array.group-by-to-map","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.array.to-reversed","esnext.array.to-sorted","esnext.array.to-spliced","esnext.array.unique-by","esnext.array.with","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.bigint.range","esnext.composite-key","esnext.composite-symbol","esnext.function.is-callable","esnext.function.is-constructor","esnext.function.un-this","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.iterator.to-async","esnext.map.delete-all","esnext.map.emplace","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.number.range","esnext.object.has-own","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.cooked","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.matcher","esnext.symbol.metadata","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.typed-array.from-async","esnext.typed-array.at","esnext.typed-array.filter-out","esnext.typed-array.filter-reject","esnext.typed-array.find-last","esnext.typed-array.find-last-index","esnext.typed-array.group-by","esnext.typed-array.to-reversed","esnext.typed-array.to-sorted","esnext.typed-array.to-spliced","esnext.typed-array.unique-by","esnext.typed-array.with","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.emplace","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.atob","web.btoa","web.dom-collections.for-each","web.dom-collections.iterator","web.dom-exception.constructor","web.dom-exception.stack","web.dom-exception.to-string-tag","web.immediate","web.queue-microtask","web.structured-clone","web.timers","web.url","web.url.to-json","web.url-search-params"]');
    },
    6151: module => {
      "use strict";
      module.exports = JSON.parse('{"assert":true,"node:assert":[">= 14.18 && < 15",">= 16"],"assert/strict":">= 15","node:assert/strict":">= 16","async_hooks":">= 8","node:async_hooks":[">= 14.18 && < 15",">= 16"],"buffer_ieee754":">= 0.5 && < 0.9.7","buffer":true,"node:buffer":[">= 14.18 && < 15",">= 16"],"child_process":true,"node:child_process":[">= 14.18 && < 15",">= 16"],"cluster":">= 0.5","node:cluster":[">= 14.18 && < 15",">= 16"],"console":true,"node:console":[">= 14.18 && < 15",">= 16"],"constants":true,"node:constants":[">= 14.18 && < 15",">= 16"],"crypto":true,"node:crypto":[">= 14.18 && < 15",">= 16"],"_debug_agent":">= 1 && < 8","_debugger":"< 8","dgram":true,"node:dgram":[">= 14.18 && < 15",">= 16"],"diagnostics_channel":[">= 14.17 && < 15",">= 15.1"],"node:diagnostics_channel":[">= 14.18 && < 15",">= 16"],"dns":true,"node:dns":[">= 14.18 && < 15",">= 16"],"dns/promises":">= 15","node:dns/promises":">= 16","domain":">= 0.7.12","node:domain":[">= 14.18 && < 15",">= 16"],"events":true,"node:events":[">= 14.18 && < 15",">= 16"],"freelist":"< 6","fs":true,"node:fs":[">= 14.18 && < 15",">= 16"],"fs/promises":[">= 10 && < 10.1",">= 14"],"node:fs/promises":[">= 14.18 && < 15",">= 16"],"_http_agent":">= 0.11.1","node:_http_agent":[">= 14.18 && < 15",">= 16"],"_http_client":">= 0.11.1","node:_http_client":[">= 14.18 && < 15",">= 16"],"_http_common":">= 0.11.1","node:_http_common":[">= 14.18 && < 15",">= 16"],"_http_incoming":">= 0.11.1","node:_http_incoming":[">= 14.18 && < 15",">= 16"],"_http_outgoing":">= 0.11.1","node:_http_outgoing":[">= 14.18 && < 15",">= 16"],"_http_server":">= 0.11.1","node:_http_server":[">= 14.18 && < 15",">= 16"],"http":true,"node:http":[">= 14.18 && < 15",">= 16"],"http2":">= 8.8","node:http2":[">= 14.18 && < 15",">= 16"],"https":true,"node:https":[">= 14.18 && < 15",">= 16"],"inspector":">= 8","node:inspector":[">= 14.18 && < 15",">= 16"],"_linklist":"< 8","module":true,"node:module":[">= 14.18 && < 15",">= 16"],"net":true,"node:net":[">= 14.18 && < 15",">= 16"],"node-inspect/lib/_inspect":">= 7.6 && < 12","node-inspect/lib/internal/inspect_client":">= 7.6 && < 12","node-inspect/lib/internal/inspect_repl":">= 7.6 && < 12","os":true,"node:os":[">= 14.18 && < 15",">= 16"],"path":true,"node:path":[">= 14.18 && < 15",">= 16"],"path/posix":">= 15.3","node:path/posix":">= 16","path/win32":">= 15.3","node:path/win32":">= 16","perf_hooks":">= 8.5","node:perf_hooks":[">= 14.18 && < 15",">= 16"],"process":">= 1","node:process":[">= 14.18 && < 15",">= 16"],"punycode":">= 0.5","node:punycode":[">= 14.18 && < 15",">= 16"],"querystring":true,"node:querystring":[">= 14.18 && < 15",">= 16"],"readline":true,"node:readline":[">= 14.18 && < 15",">= 16"],"readline/promises":">= 17","node:readline/promises":">= 17","repl":true,"node:repl":[">= 14.18 && < 15",">= 16"],"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","node:_stream_duplex":[">= 14.18 && < 15",">= 16"],"_stream_transform":">= 0.9.4","node:_stream_transform":[">= 14.18 && < 15",">= 16"],"_stream_wrap":">= 1.4.1","node:_stream_wrap":[">= 14.18 && < 15",">= 16"],"_stream_passthrough":">= 0.9.4","node:_stream_passthrough":[">= 14.18 && < 15",">= 16"],"_stream_readable":">= 0.9.4","node:_stream_readable":[">= 14.18 && < 15",">= 16"],"_stream_writable":">= 0.9.4","node:_stream_writable":[">= 14.18 && < 15",">= 16"],"stream":true,"node:stream":[">= 14.18 && < 15",">= 16"],"stream/consumers":">= 16.7","node:stream/consumers":">= 16.7","stream/promises":">= 15","node:stream/promises":">= 16","stream/web":">= 16.5","node:stream/web":">= 16.5","string_decoder":true,"node:string_decoder":[">= 14.18 && < 15",">= 16"],"sys":[">= 0.4 && < 0.7",">= 0.8"],"node:sys":[">= 14.18 && < 15",">= 16"],"node:test":">= 18","timers":true,"node:timers":[">= 14.18 && < 15",">= 16"],"timers/promises":">= 15","node:timers/promises":">= 16","_tls_common":">= 0.11.13","node:_tls_common":[">= 14.18 && < 15",">= 16"],"_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","node:_tls_wrap":[">= 14.18 && < 15",">= 16"],"tls":true,"node:tls":[">= 14.18 && < 15",">= 16"],"trace_events":">= 10","node:trace_events":[">= 14.18 && < 15",">= 16"],"tty":true,"node:tty":[">= 14.18 && < 15",">= 16"],"url":true,"node:url":[">= 14.18 && < 15",">= 16"],"util":true,"node:util":[">= 14.18 && < 15",">= 16"],"util/types":">= 15.3","node:util/types":">= 16","v8/tools/arguments":">= 10 && < 12","v8/tools/codemap":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/consarray":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/csvparser":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/logreader":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/profile_view":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/splaytree":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8":">= 1","node:v8":[">= 14.18 && < 15",">= 16"],"vm":true,"node:vm":[">= 14.18 && < 15",">= 16"],"wasi":">= 13.4 && < 13.5","worker_threads":">= 11.7","node:worker_threads":[">= 14.18 && < 15",">= 16"],"zlib":">= 0.5","node:zlib":[">= 14.18 && < 15",">= 16"]}');
    },
    4503: module => {
      "use strict";
      module.exports = JSON.parse('{"assert":true,"assert/strict":">= 15","async_hooks":">= 8","buffer_ieee754":"< 0.9.7","buffer":true,"child_process":true,"cluster":true,"console":true,"constants":true,"crypto":true,"_debug_agent":">= 1 && < 8","_debugger":"< 8","dgram":true,"diagnostics_channel":">= 15.1","dns":true,"dns/promises":">= 15","domain":">= 0.7.12","events":true,"freelist":"< 6","fs":true,"fs/promises":[">= 10 && < 10.1",">= 14"],"_http_agent":">= 0.11.1","_http_client":">= 0.11.1","_http_common":">= 0.11.1","_http_incoming":">= 0.11.1","_http_outgoing":">= 0.11.1","_http_server":">= 0.11.1","http":true,"http2":">= 8.8","https":true,"inspector":">= 8.0.0","_linklist":"< 8","module":true,"net":true,"node-inspect/lib/_inspect":">= 7.6.0 && < 12","node-inspect/lib/internal/inspect_client":">= 7.6.0 && < 12","node-inspect/lib/internal/inspect_repl":">= 7.6.0 && < 12","os":true,"path":true,"path/posix":">= 15.3","path/win32":">= 15.3","perf_hooks":">= 8.5","process":">= 1","punycode":true,"querystring":true,"readline":true,"repl":true,"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","_stream_transform":">= 0.9.4","_stream_wrap":">= 1.4.1","_stream_passthrough":">= 0.9.4","_stream_readable":">= 0.9.4","_stream_writable":">= 0.9.4","stream":true,"stream/promises":">= 15","string_decoder":true,"sys":[">= 0.6 && < 0.7",">= 0.8"],"timers":true,"timers/promises":">= 15","_tls_common":">= 0.11.13","_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","tls":true,"trace_events":">= 10","tty":true,"url":true,"util":true,"util/types":">= 15.3","v8/tools/arguments":">= 10 && < 12","v8/tools/codemap":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/consarray":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/csvparser":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/logreader":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/profile_view":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8/tools/splaytree":[">= 4.4.0 && < 5",">= 5.2.0 && < 12"],"v8":">= 1","vm":true,"wasi":">= 13.4 && < 13.5","worker_threads":">= 11.7","zlib":true}');
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
    }), exports.getPolyfillPlugins = exports.getModulesPluginNames = exports.default = void 0, 
    exports.isPluginRequired = function(targets, support) {
      return (0, _helperCompilationTargets.isRequired)("fake-name", targets, {
        compatData: {
          "fake-name": support
        }
      });
    }, exports.transformIncludesAndExcludes = void 0;
    var _semver = __webpack_require__(5870), _debug = __webpack_require__(2157), _getOptionSpecificExcludes = __webpack_require__(6015), _filterItems = __webpack_require__(8502), _moduleTransformations = __webpack_require__(1049), _normalizeOptions = __webpack_require__(3668), _shippedProposals = __webpack_require__(9279), _pluginsCompatData = __webpack_require__(4600), _overlappingPlugins = __webpack_require__(5224), _regenerator = __webpack_require__(3893), _babelPolyfill = __webpack_require__(9462), _babelPluginPolyfillCorejs = __webpack_require__(1815), _babelPluginPolyfillCorejs2 = __webpack_require__(2510), _babelPluginPolyfillRegenerator = __webpack_require__(205), _helperCompilationTargets = __webpack_require__(4077), _availablePlugins = __webpack_require__(2751), _helperPluginUtils = __webpack_require__(5488);
    const pluginCoreJS2 = _babelPluginPolyfillCorejs.default || _babelPluginPolyfillCorejs, pluginCoreJS3 = _babelPluginPolyfillCorejs2.default || _babelPluginPolyfillCorejs2, pluginRegenerator = _babelPluginPolyfillRegenerator.default || _babelPluginPolyfillRegenerator;
    function filterStageFromList(list, stageList) {
      return Object.keys(list).reduce(((result, item) => (stageList.has(item) || (result[item] = list[item]), 
      result)), {});
    }
    const pluginLists = {
      withProposals: {
        withoutBugfixes: _pluginsCompatData.plugins,
        withBugfixes: Object.assign({}, _pluginsCompatData.plugins, _pluginsCompatData.pluginsBugfixes)
      },
      withoutProposals: {
        withoutBugfixes: filterStageFromList(_pluginsCompatData.plugins, _shippedProposals.proposalPlugins),
        withBugfixes: filterStageFromList(Object.assign({}, _pluginsCompatData.plugins, _pluginsCompatData.pluginsBugfixes), _shippedProposals.proposalPlugins)
      }
    };
    const getPlugin = pluginName => {
      const plugin = _availablePlugins.default[pluginName]();
      if (!plugin) throw new Error(`Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`);
      return plugin;
    }, transformIncludesAndExcludes = opts => opts.reduce(((result, opt) => (result[opt.match(/^(es|es6|es7|esnext|web)\./) ? "builtIns" : "plugins"].add(opt), 
    result)), {
      all: opts,
      plugins: new Set,
      builtIns: new Set
    });
    exports.transformIncludesAndExcludes = transformIncludesAndExcludes;
    const getModulesPluginNames = ({modules, transformations, shouldTransformESM, shouldTransformDynamicImport, shouldTransformExportNamespaceFrom, shouldParseTopLevelAwait}) => {
      const modulesPluginNames = [];
      return !1 !== modules && transformations[modules] ? (shouldTransformESM && modulesPluginNames.push(transformations[modules]), 
      shouldTransformDynamicImport && shouldTransformESM && "umd" !== modules ? modulesPluginNames.push("proposal-dynamic-import") : (shouldTransformDynamicImport && console.warn("Dynamic import can only be supported when transforming ES modules to AMD, CommonJS or SystemJS. Only the parser plugin will be enabled."), 
      modulesPluginNames.push("syntax-dynamic-import"))) : modulesPluginNames.push("syntax-dynamic-import"), 
      shouldTransformExportNamespaceFrom ? modulesPluginNames.push("proposal-export-namespace-from") : modulesPluginNames.push("syntax-export-namespace-from"), 
      shouldParseTopLevelAwait && modulesPluginNames.push("syntax-top-level-await"), modulesPluginNames;
    };
    exports.getModulesPluginNames = getModulesPluginNames;
    const getPolyfillPlugins = ({useBuiltIns, corejs, polyfillTargets, include, exclude, proposals, shippedProposals, regenerator, debug}) => {
      const polyfillPlugins = [];
      if ("usage" === useBuiltIns || "entry" === useBuiltIns) {
        const pluginOptions = {
          method: `${useBuiltIns}-global`,
          version: corejs ? corejs.toString() : void 0,
          targets: polyfillTargets,
          include,
          exclude,
          proposals,
          shippedProposals,
          debug
        };
        corejs && ("usage" === useBuiltIns ? (2 === corejs.major ? polyfillPlugins.push([ pluginCoreJS2, pluginOptions ], [ _babelPolyfill.default, {
          usage: !0
        } ]) : polyfillPlugins.push([ pluginCoreJS3, pluginOptions ], [ _babelPolyfill.default, {
          usage: !0,
          deprecated: !0
        } ]), regenerator && polyfillPlugins.push([ pluginRegenerator, {
          method: "usage-global",
          debug
        } ])) : 2 === corejs.major ? polyfillPlugins.push([ _babelPolyfill.default, {
          regenerator
        } ], [ pluginCoreJS2, pluginOptions ]) : (polyfillPlugins.push([ pluginCoreJS3, pluginOptions ], [ _babelPolyfill.default, {
          deprecated: !0
        } ]), regenerator || polyfillPlugins.push([ _regenerator.default, pluginOptions ])));
      }
      return polyfillPlugins;
    };
    function supportsStaticESM(caller) {
      return !(null == caller || !caller.supportsStaticESM);
    }
    function supportsDynamicImport(caller) {
      return !(null == caller || !caller.supportsDynamicImport);
    }
    function supportsExportNamespaceFrom(caller) {
      return !(null == caller || !caller.supportsExportNamespaceFrom);
    }
    function supportsTopLevelAwait(caller) {
      return !(null == caller || !caller.supportsTopLevelAwait);
    }
    exports.getPolyfillPlugins = getPolyfillPlugins;
    var _default = (0, _helperPluginUtils.declare)(((api, opts) => {
      api.assertVersion(7);
      const babelTargets = api.targets(), {bugfixes, configPath, debug, exclude: optionsExclude, forceAllTransforms, ignoreBrowserslistConfig, include: optionsInclude, loose, modules, shippedProposals, spec, targets: optionsTargets, useBuiltIns, corejs: {version: corejs, proposals}, browserslistEnv} = (0, 
      _normalizeOptions.default)(opts);
      let targets = babelTargets;
      if ((0, _semver.lt)(api.version, "7.13.0") || opts.targets || opts.configPath || opts.browserslistEnv || opts.ignoreBrowserslistConfig) {
        var hasUglifyTarget = !1;
        null != optionsTargets && optionsTargets.uglify && (hasUglifyTarget = !0, delete optionsTargets.uglify, 
        console.warn("\nThe uglify target has been deprecated. Set the top level\noption `forceAllTransforms: true` instead.\n")), 
        targets = function(optionsTargets, ignoreBrowserslistConfig, configPath, browserslistEnv) {
          return null != optionsTargets && optionsTargets.esmodules && optionsTargets.browsers && console.warn(`\n@babel/preset-env: esmodules and browsers targets have been specified together.\n\`browsers\` target, \`${optionsTargets.browsers.toString()}\` will be ignored.\n`), 
          (0, _helperCompilationTargets.default)(optionsTargets, {
            ignoreBrowserslistConfig,
            configPath,
            browserslistEnv
          });
        }(optionsTargets, ignoreBrowserslistConfig, configPath, browserslistEnv);
      }
      const transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets, include = transformIncludesAndExcludes(optionsInclude), exclude = transformIncludesAndExcludes(optionsExclude), compatData = function(proposals, bugfixes) {
        return proposals ? bugfixes ? pluginLists.withProposals.withBugfixes : pluginLists.withProposals.withoutBugfixes : bugfixes ? pluginLists.withoutProposals.withBugfixes : pluginLists.withoutProposals.withoutBugfixes;
      }(shippedProposals, bugfixes), shouldSkipExportNamespaceFrom = "auto" === modules && (null == api.caller ? void 0 : api.caller(supportsExportNamespaceFrom)) || !1 === modules && !(0, 
      _helperCompilationTargets.isRequired)("proposal-export-namespace-from", transformTargets, {
        compatData,
        includes: include.plugins,
        excludes: exclude.plugins
      }), modulesPluginNames = getModulesPluginNames({
        modules,
        transformations: _moduleTransformations.default,
        shouldTransformESM: "auto" !== modules || !(null != api.caller && api.caller(supportsStaticESM)),
        shouldTransformDynamicImport: "auto" !== modules || !(null != api.caller && api.caller(supportsDynamicImport)),
        shouldTransformExportNamespaceFrom: !shouldSkipExportNamespaceFrom,
        shouldParseTopLevelAwait: !api.caller || api.caller(supportsTopLevelAwait)
      }), pluginNames = (0, _helperCompilationTargets.filterItems)(compatData, include.plugins, exclude.plugins, transformTargets, modulesPluginNames, (0, 
      _getOptionSpecificExcludes.default)({
        loose
      }), _shippedProposals.pluginSyntaxMap);
      (0, _filterItems.removeUnnecessaryItems)(pluginNames, _overlappingPlugins), (0, 
      _filterItems.removeUnsupportedItems)(pluginNames, api.version);
      const polyfillPlugins = getPolyfillPlugins({
        useBuiltIns,
        corejs,
        polyfillTargets: targets,
        include: include.builtIns,
        exclude: exclude.builtIns,
        proposals,
        shippedProposals,
        regenerator: pluginNames.has("transform-regenerator"),
        debug
      }), pluginUseBuiltIns = !1 !== useBuiltIns, plugins = Array.from(pluginNames).map((pluginName => "proposal-class-properties" === pluginName || "proposal-private-methods" === pluginName || "proposal-private-property-in-object" === pluginName ? [ getPlugin(pluginName), {
        loose: loose ? "#__internal__@babel/preset-env__prefer-true-but-false-is-ok-if-it-prevents-an-error" : "#__internal__@babel/preset-env__prefer-false-but-true-is-ok-if-it-prevents-an-error"
      } ] : [ getPlugin(pluginName), {
        spec,
        loose,
        useBuiltIns: pluginUseBuiltIns
      } ])).concat(polyfillPlugins);
      return debug && (console.log("@babel/preset-env: `DEBUG` option"), console.log("\nUsing targets:"), 
      console.log(JSON.stringify((0, _helperCompilationTargets.prettifyTargets)(targets), null, 2)), 
      console.log(`\nUsing modules transform: ${modules.toString()}`), console.log("\nUsing plugins:"), 
      pluginNames.forEach((pluginName => {
        (0, _debug.logPlugin)(pluginName, targets, compatData);
      })), useBuiltIns || console.log("\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.")), 
      {
        plugins
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