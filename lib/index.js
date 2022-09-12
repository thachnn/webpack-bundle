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
    5008: () => {},
    656: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.assertSimpleType = assertSimpleType, exports.makeStrongCache = makeStrongCache, 
      exports.makeStrongCacheSync = function(handler) {
        return synchronize(makeStrongCache(handler));
      }, exports.makeWeakCache = makeWeakCache, exports.makeWeakCacheSync = function(handler) {
        return synchronize(makeWeakCache(handler));
      };
      var _async = __webpack_require__(7241), _util = __webpack_require__(1050);
      const synchronize = gen => _gensync()(gen).sync;
      function* genTrue() {
        return !0;
      }
      function makeWeakCache(handler) {
        return makeCachedFunction(WeakMap, handler);
      }
      function makeStrongCache(handler) {
        return makeCachedFunction(Map, handler);
      }
      function makeCachedFunction(CallCache, handler) {
        const callCacheSync = new CallCache, callCacheAsync = new CallCache, futureCache = new CallCache;
        return function*(arg, data) {
          const asyncContext = yield* (0, _async.isAsync)(), callCache = asyncContext ? callCacheAsync : callCacheSync, cached = yield* function*(asyncContext, callCache, futureCache, arg, data) {
            const cached = yield* getCachedValue(callCache, arg, data);
            if (cached.valid) return cached;
            if (asyncContext) {
              const cached = yield* getCachedValue(futureCache, arg, data);
              if (cached.valid) {
                return {
                  valid: !0,
                  value: yield* (0, _async.waitFor)(cached.value.promise)
                };
              }
            }
            return {
              valid: !1,
              value: null
            };
          }(asyncContext, callCache, futureCache, arg, data);
          if (cached.valid) return cached.value;
          const cache = new CacheConfigurator(data), handlerResult = handler(arg, cache);
          let finishLock, value;
          if ((0, _util.isIterableIterator)(handlerResult)) {
            const gen = handlerResult;
            value = yield* (0, _async.onFirstPause)(gen, (() => {
              finishLock = function(config, futureCache, arg) {
                const finishLock = new Lock;
                return updateFunctionCache(futureCache, config, arg, finishLock), finishLock;
              }(cache, futureCache, arg);
            }));
          } else value = handlerResult;
          return updateFunctionCache(callCache, cache, arg, value), finishLock && (futureCache.delete(arg), 
          finishLock.release(value)), value;
        };
      }
      function* getCachedValue(cache, arg, data) {
        const cachedValue = cache.get(arg);
        if (cachedValue) for (const {value, valid} of cachedValue) if (yield* valid(data)) return {
          valid: !0,
          value
        };
        return {
          valid: !1,
          value: null
        };
      }
      function updateFunctionCache(cache, config, arg, value) {
        config.configured() || config.forever();
        let cachedValue = cache.get(arg);
        switch (config.deactivate(), config.mode()) {
         case "forever":
          cachedValue = [ {
            value,
            valid: genTrue
          } ], cache.set(arg, cachedValue);
          break;

         case "invalidate":
          cachedValue = [ {
            value,
            valid: config.validator()
          } ], cache.set(arg, cachedValue);
          break;

         case "valid":
          cachedValue ? cachedValue.push({
            value,
            valid: config.validator()
          }) : (cachedValue = [ {
            value,
            valid: config.validator()
          } ], cache.set(arg, cachedValue));
        }
      }
      class CacheConfigurator {
        constructor(data) {
          this._active = !0, this._never = !1, this._forever = !1, this._invalidate = !1, 
          this._configured = !1, this._pairs = [], this._data = void 0, this._data = data;
        }
        simple() {
          return function(cache) {
            function cacheFn(val) {
              if ("boolean" != typeof val) return cache.using((() => assertSimpleType(val())));
              val ? cache.forever() : cache.never();
            }
            return cacheFn.forever = () => cache.forever(), cacheFn.never = () => cache.never(), 
            cacheFn.using = cb => cache.using((() => assertSimpleType(cb()))), cacheFn.invalidate = cb => cache.invalidate((() => assertSimpleType(cb()))), 
            cacheFn;
          }(this);
        }
        mode() {
          return this._never ? "never" : this._forever ? "forever" : this._invalidate ? "invalidate" : "valid";
        }
        forever() {
          if (!this._active) throw new Error("Cannot change caching after evaluation has completed.");
          if (this._never) throw new Error("Caching has already been configured with .never()");
          this._forever = !0, this._configured = !0;
        }
        never() {
          if (!this._active) throw new Error("Cannot change caching after evaluation has completed.");
          if (this._forever) throw new Error("Caching has already been configured with .forever()");
          this._never = !0, this._configured = !0;
        }
        using(handler) {
          if (!this._active) throw new Error("Cannot change caching after evaluation has completed.");
          if (this._never || this._forever) throw new Error("Caching has already been configured with .never or .forever()");
          this._configured = !0;
          const key = handler(this._data), fn = (0, _async.maybeAsync)(handler, "You appear to be using an async cache handler, but Babel has been called synchronously");
          return (0, _async.isThenable)(key) ? key.then((key => (this._pairs.push([ key, fn ]), 
          key))) : (this._pairs.push([ key, fn ]), key);
        }
        invalidate(handler) {
          return this._invalidate = !0, this.using(handler);
        }
        validator() {
          const pairs = this._pairs;
          return function*(data) {
            for (const [key, fn] of pairs) if (key !== (yield* fn(data))) return !1;
            return !0;
          };
        }
        deactivate() {
          this._active = !1;
        }
        configured() {
          return this._configured;
        }
      }
      function assertSimpleType(value) {
        if ((0, _async.isThenable)(value)) throw new Error("You appear to be using an async cache handler, which your current version of Babel does not support. We may add support for this in the future, but if you're on the most recent version of @babel/core and still seeing this error, then you'll need to synchronously handle your caching logic.");
        if (null != value && "string" != typeof value && "boolean" != typeof value && "number" != typeof value) throw new Error("Cache keys must be either string, boolean, number, null, or undefined.");
        return value;
      }
      class Lock {
        constructor() {
          this.released = !1, this.promise = void 0, this._resolve = void 0, this.promise = new Promise((resolve => {
            this._resolve = resolve;
          }));
        }
        release(value) {
          this.released = !0, this._resolve(value);
        }
      }
    },
    4025: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _debug() {
        const data = __webpack_require__(5158);
        return _debug = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.buildPresetChain = function*(arg, context) {
        const chain = yield* buildPresetChainWalker(arg, context);
        return chain ? {
          plugins: dedupDescriptors(chain.plugins),
          presets: dedupDescriptors(chain.presets),
          options: chain.options.map((o => normalizeOptions(o))),
          files: new Set
        } : null;
      }, exports.buildPresetChainWalker = void 0, exports.buildRootChain = function*(opts, context) {
        let configReport, babelRcReport;
        const programmaticLogger = new _printer.ConfigPrinter, programmaticChain = yield* loadProgrammaticChain({
          options: opts,
          dirname: context.cwd
        }, context, void 0, programmaticLogger);
        if (!programmaticChain) return null;
        const programmaticReport = yield* programmaticLogger.output();
        let configFile;
        "string" == typeof opts.configFile ? configFile = yield* (0, _files.loadConfig)(opts.configFile, context.cwd, context.envName, context.caller) : !1 !== opts.configFile && (configFile = yield* (0, 
        _files.findRootConfig)(context.root, context.envName, context.caller));
        let {babelrc, babelrcRoots} = opts, babelrcRootsDirectory = context.cwd;
        const configFileChain = emptyChain(), configFileLogger = new _printer.ConfigPrinter;
        if (configFile) {
          const validatedFile = validateConfigFile(configFile), result = yield* loadFileChain(validatedFile, context, void 0, configFileLogger);
          if (!result) return null;
          configReport = yield* configFileLogger.output(), void 0 === babelrc && (babelrc = validatedFile.options.babelrc), 
          void 0 === babelrcRoots && (babelrcRootsDirectory = validatedFile.dirname, babelrcRoots = validatedFile.options.babelrcRoots), 
          mergeChain(configFileChain, result);
        }
        let ignoreFile, babelrcFile, isIgnored = !1;
        const fileChain = emptyChain();
        if ((!0 === babelrc || void 0 === babelrc) && "string" == typeof context.filename) {
          const pkgData = yield* (0, _files.findPackageData)(context.filename);
          if (pkgData && function(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
            if ("boolean" == typeof babelrcRoots) return babelrcRoots;
            const absoluteRoot = context.root;
            if (void 0 === babelrcRoots) return -1 !== pkgData.directories.indexOf(absoluteRoot);
            let babelrcPatterns = babelrcRoots;
            Array.isArray(babelrcPatterns) || (babelrcPatterns = [ babelrcPatterns ]);
            if (babelrcPatterns = babelrcPatterns.map((pat => "string" == typeof pat ? _path().resolve(babelrcRootsDirectory, pat) : pat)), 
            1 === babelrcPatterns.length && babelrcPatterns[0] === absoluteRoot) return -1 !== pkgData.directories.indexOf(absoluteRoot);
            return babelrcPatterns.some((pat => ("string" == typeof pat && (pat = (0, _patternToRegex.default)(pat, babelrcRootsDirectory)), 
            pkgData.directories.some((directory => matchPattern(pat, babelrcRootsDirectory, directory, context))))));
          }(context, pkgData, babelrcRoots, babelrcRootsDirectory)) {
            if (({ignore: ignoreFile, config: babelrcFile} = yield* (0, _files.findRelativeConfig)(pkgData, context.envName, context.caller)), 
            ignoreFile && fileChain.files.add(ignoreFile.filepath), ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname) && (isIgnored = !0), 
            babelrcFile && !isIgnored) {
              const validatedFile = validateBabelrcFile(babelrcFile), babelrcLogger = new _printer.ConfigPrinter, result = yield* loadFileChain(validatedFile, context, void 0, babelrcLogger);
              result ? (babelRcReport = yield* babelrcLogger.output(), mergeChain(fileChain, result)) : isIgnored = !0;
            }
            babelrcFile && isIgnored && fileChain.files.add(babelrcFile.filepath);
          }
        }
        context.showConfig && console.log(`Babel configs on "${context.filename}" (ascending priority):\n` + [ configReport, babelRcReport, programmaticReport ].filter((x => !!x)).join("\n\n") + "\n-----End Babel configs-----");
        const chain = mergeChain(mergeChain(mergeChain(emptyChain(), configFileChain), fileChain), programmaticChain);
        return {
          plugins: isIgnored ? [] : dedupDescriptors(chain.plugins),
          presets: isIgnored ? [] : dedupDescriptors(chain.presets),
          options: isIgnored ? [] : chain.options.map((o => normalizeOptions(o))),
          fileHandling: isIgnored ? "ignored" : "transpile",
          ignore: ignoreFile || void 0,
          babelrc: babelrcFile || void 0,
          config: configFile || void 0,
          files: chain.files
        };
      };
      var _options = __webpack_require__(1139), _patternToRegex = __webpack_require__(8552), _printer = __webpack_require__(5078), _files = __webpack_require__(2557), _caching = __webpack_require__(656), _configDescriptors = __webpack_require__(9261);
      const debug = _debug()("babel:config:config-chain");
      const buildPresetChainWalker = makeChainWalker({
        root: preset => loadPresetDescriptors(preset),
        env: (preset, envName) => loadPresetEnvDescriptors(preset)(envName),
        overrides: (preset, index) => loadPresetOverridesDescriptors(preset)(index),
        overridesEnv: (preset, index, envName) => loadPresetOverridesEnvDescriptors(preset)(index)(envName),
        createLogger: () => () => {}
      });
      exports.buildPresetChainWalker = buildPresetChainWalker;
      const loadPresetDescriptors = (0, _caching.makeWeakCacheSync)((preset => buildRootDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors))), loadPresetEnvDescriptors = (0, 
      _caching.makeWeakCacheSync)((preset => (0, _caching.makeStrongCacheSync)((envName => buildEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, envName))))), loadPresetOverridesDescriptors = (0, 
      _caching.makeWeakCacheSync)((preset => (0, _caching.makeStrongCacheSync)((index => buildOverrideDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index))))), loadPresetOverridesEnvDescriptors = (0, 
      _caching.makeWeakCacheSync)((preset => (0, _caching.makeStrongCacheSync)((index => (0, 
      _caching.makeStrongCacheSync)((envName => buildOverrideEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index, envName)))))));
      const validateConfigFile = (0, _caching.makeWeakCacheSync)((file => ({
        filepath: file.filepath,
        dirname: file.dirname,
        options: (0, _options.validate)("configfile", file.options)
      }))), validateBabelrcFile = (0, _caching.makeWeakCacheSync)((file => ({
        filepath: file.filepath,
        dirname: file.dirname,
        options: (0, _options.validate)("babelrcfile", file.options)
      }))), validateExtendFile = (0, _caching.makeWeakCacheSync)((file => ({
        filepath: file.filepath,
        dirname: file.dirname,
        options: (0, _options.validate)("extendsfile", file.options)
      }))), loadProgrammaticChain = makeChainWalker({
        root: input => buildRootDescriptors(input, "base", _configDescriptors.createCachedDescriptors),
        env: (input, envName) => buildEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, envName),
        overrides: (input, index) => buildOverrideDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index),
        overridesEnv: (input, index, envName) => buildOverrideEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index, envName),
        createLogger: (input, context, baseLogger) => function(_, context, baseLogger) {
          var _context$caller;
          if (!baseLogger) return () => {};
          return baseLogger.configure(context.showConfig, _printer.ChainFormatter.Programmatic, {
            callerName: null == (_context$caller = context.caller) ? void 0 : _context$caller.name
          });
        }(0, context, baseLogger)
      }), loadFileChainWalker = makeChainWalker({
        root: file => loadFileDescriptors(file),
        env: (file, envName) => loadFileEnvDescriptors(file)(envName),
        overrides: (file, index) => loadFileOverridesDescriptors(file)(index),
        overridesEnv: (file, index, envName) => loadFileOverridesEnvDescriptors(file)(index)(envName),
        createLogger: (file, context, baseLogger) => function(filepath, context, baseLogger) {
          if (!baseLogger) return () => {};
          return baseLogger.configure(context.showConfig, _printer.ChainFormatter.Config, {
            filepath
          });
        }(file.filepath, context, baseLogger)
      });
      function* loadFileChain(input, context, files, baseLogger) {
        const chain = yield* loadFileChainWalker(input, context, files, baseLogger);
        return chain && chain.files.add(input.filepath), chain;
      }
      const loadFileDescriptors = (0, _caching.makeWeakCacheSync)((file => buildRootDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors))), loadFileEnvDescriptors = (0, 
      _caching.makeWeakCacheSync)((file => (0, _caching.makeStrongCacheSync)((envName => buildEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, envName))))), loadFileOverridesDescriptors = (0, 
      _caching.makeWeakCacheSync)((file => (0, _caching.makeStrongCacheSync)((index => buildOverrideDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index))))), loadFileOverridesEnvDescriptors = (0, 
      _caching.makeWeakCacheSync)((file => (0, _caching.makeStrongCacheSync)((index => (0, 
      _caching.makeStrongCacheSync)((envName => buildOverrideEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index, envName)))))));
      function buildRootDescriptors({dirname, options}, alias, descriptors) {
        return descriptors(dirname, options, alias);
      }
      function buildEnvDescriptors({dirname, options}, alias, descriptors, envName) {
        const opts = options.env && options.env[envName];
        return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
      }
      function buildOverrideDescriptors({dirname, options}, alias, descriptors, index) {
        const opts = options.overrides && options.overrides[index];
        if (!opts) throw new Error("Assertion failure - missing override");
        return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
      }
      function buildOverrideEnvDescriptors({dirname, options}, alias, descriptors, index, envName) {
        const override = options.overrides && options.overrides[index];
        if (!override) throw new Error("Assertion failure - missing override");
        const opts = override.env && override.env[envName];
        return opts ? descriptors(dirname, opts, `${alias}.overrides[${index}].env["${envName}"]`) : null;
      }
      function makeChainWalker({root, env, overrides, overridesEnv, createLogger}) {
        return function*(input, context, files = new Set, baseLogger) {
          const {dirname} = input, flattenedConfigs = [], rootOpts = root(input);
          if (configIsApplicable(rootOpts, dirname, context)) {
            flattenedConfigs.push({
              config: rootOpts,
              envName: void 0,
              index: void 0
            });
            const envOpts = env(input, context.envName);
            envOpts && configIsApplicable(envOpts, dirname, context) && flattenedConfigs.push({
              config: envOpts,
              envName: context.envName,
              index: void 0
            }), (rootOpts.options.overrides || []).forEach(((_, index) => {
              const overrideOps = overrides(input, index);
              if (configIsApplicable(overrideOps, dirname, context)) {
                flattenedConfigs.push({
                  config: overrideOps,
                  index,
                  envName: void 0
                });
                const overrideEnvOpts = overridesEnv(input, index, context.envName);
                overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context) && flattenedConfigs.push({
                  config: overrideEnvOpts,
                  index,
                  envName: context.envName
                });
              }
            }));
          }
          if (flattenedConfigs.some((({config: {options: {ignore, only}}}) => shouldIgnore(context, ignore, only, dirname)))) return null;
          const chain = emptyChain(), logger = createLogger(input, context, baseLogger);
          for (const {config, index, envName} of flattenedConfigs) {
            if (!(yield* mergeExtendsChain(chain, config.options, dirname, context, files, baseLogger))) return null;
            logger(config, index, envName), yield* mergeChainOpts(chain, config);
          }
          return chain;
        };
      }
      function* mergeExtendsChain(chain, opts, dirname, context, files, baseLogger) {
        if (void 0 === opts.extends) return !0;
        const file = yield* (0, _files.loadConfig)(opts.extends, dirname, context.envName, context.caller);
        if (files.has(file)) throw new Error(`Configuration cycle detected loading ${file.filepath}.\nFile already loaded following the config chain:\n` + Array.from(files, (file => ` - ${file.filepath}`)).join("\n"));
        files.add(file);
        const fileChain = yield* loadFileChain(validateExtendFile(file), context, files, baseLogger);
        return files.delete(file), !!fileChain && (mergeChain(chain, fileChain), !0);
      }
      function mergeChain(target, source) {
        target.options.push(...source.options), target.plugins.push(...source.plugins), 
        target.presets.push(...source.presets);
        for (const file of source.files) target.files.add(file);
        return target;
      }
      function* mergeChainOpts(target, {options, plugins, presets}) {
        return target.options.push(options), target.plugins.push(...yield* plugins()), target.presets.push(...yield* presets()), 
        target;
      }
      function emptyChain() {
        return {
          options: [],
          presets: [],
          plugins: [],
          files: new Set
        };
      }
      function normalizeOptions(opts) {
        const options = Object.assign({}, opts);
        return delete options.extends, delete options.env, delete options.overrides, delete options.plugins, 
        delete options.presets, delete options.passPerPreset, delete options.ignore, delete options.only, 
        delete options.test, delete options.include, delete options.exclude, Object.prototype.hasOwnProperty.call(options, "sourceMap") && (options.sourceMaps = options.sourceMap, 
        delete options.sourceMap), options;
      }
      function dedupDescriptors(items) {
        const map = new Map, descriptors = [];
        for (const item of items) if ("function" == typeof item.value) {
          const fnKey = item.value;
          let nameMap = map.get(fnKey);
          nameMap || (nameMap = new Map, map.set(fnKey, nameMap));
          let desc = nameMap.get(item.name);
          desc ? desc.value = item : (desc = {
            value: item
          }, descriptors.push(desc), item.ownPass || nameMap.set(item.name, desc));
        } else descriptors.push({
          value: item
        });
        return descriptors.reduce(((acc, desc) => (acc.push(desc.value), acc)), []);
      }
      function configIsApplicable({options}, dirname, context) {
        return (void 0 === options.test || configFieldIsApplicable(context, options.test, dirname)) && (void 0 === options.include || configFieldIsApplicable(context, options.include, dirname)) && (void 0 === options.exclude || !configFieldIsApplicable(context, options.exclude, dirname));
      }
      function configFieldIsApplicable(context, test, dirname) {
        return matchesPatterns(context, Array.isArray(test) ? test : [ test ], dirname);
      }
      function ignoreListReplacer(_key, value) {
        return value instanceof RegExp ? String(value) : value;
      }
      function shouldIgnore(context, ignore, only, dirname) {
        if (ignore && matchesPatterns(context, ignore, dirname)) {
          var _context$filename;
          const message = `No config is applied to "${null != (_context$filename = context.filename) ? _context$filename : "(unknown)"}" because it matches one of \`ignore: ${JSON.stringify(ignore, ignoreListReplacer)}\` from "${dirname}"`;
          return debug(message), context.showConfig && console.log(message), !0;
        }
        if (only && !matchesPatterns(context, only, dirname)) {
          var _context$filename2;
          const message = `No config is applied to "${null != (_context$filename2 = context.filename) ? _context$filename2 : "(unknown)"}" because it fails to match one of \`only: ${JSON.stringify(only, ignoreListReplacer)}\` from "${dirname}"`;
          return debug(message), context.showConfig && console.log(message), !0;
        }
        return !1;
      }
      function matchesPatterns(context, patterns, dirname) {
        return patterns.some((pattern => matchPattern(pattern, dirname, context.filename, context)));
      }
      function matchPattern(pattern, dirname, pathToTest, context) {
        if ("function" == typeof pattern) return !!pattern(pathToTest, {
          dirname,
          envName: context.envName,
          caller: context.caller
        });
        if ("string" != typeof pathToTest) throw new Error("Configuration contains string/RegExp pattern, but no filename was passed to Babel");
        return "string" == typeof pattern && (pattern = (0, _patternToRegex.default)(pattern, dirname)), 
        pattern.test(pathToTest);
      }
    },
    9261: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createCachedDescriptors = function(dirname, options, alias) {
        const {plugins, presets, passPerPreset} = options;
        return {
          options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
          plugins: plugins ? () => createCachedPluginDescriptors(plugins, dirname)(alias) : () => handlerOf([]),
          presets: presets ? () => createCachedPresetDescriptors(presets, dirname)(alias)(!!passPerPreset) : () => handlerOf([])
        };
      }, exports.createDescriptor = createDescriptor, exports.createUncachedDescriptors = function(dirname, options, alias) {
        let plugins, presets;
        return {
          options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
          * plugins() {
            return plugins || (plugins = yield* createPluginDescriptors(options.plugins || [], dirname, alias)), 
            plugins;
          },
          * presets() {
            return presets || (presets = yield* createPresetDescriptors(options.presets || [], dirname, alias, !!options.passPerPreset)), 
            presets;
          }
        };
      };
      var _files = __webpack_require__(2557), _item = __webpack_require__(6415), _caching = __webpack_require__(656), _resolveTargets = __webpack_require__(3122);
      function* handlerOf(value) {
        return value;
      }
      function optionsWithResolvedBrowserslistConfigFile(options, dirname) {
        return "string" == typeof options.browserslistConfigFile && (options.browserslistConfigFile = (0, 
        _resolveTargets.resolveBrowserslistConfigFile)(options.browserslistConfigFile, dirname)), 
        options;
      }
      const PRESET_DESCRIPTOR_CACHE = new WeakMap, createCachedPresetDescriptors = (0, 
      _caching.makeWeakCacheSync)(((items, cache) => {
        const dirname = cache.using((dir => dir));
        return (0, _caching.makeStrongCacheSync)((alias => (0, _caching.makeStrongCache)((function*(passPerPreset) {
          return (yield* createPresetDescriptors(items, dirname, alias, passPerPreset)).map((desc => loadCachedDescriptor(PRESET_DESCRIPTOR_CACHE, desc)));
        }))));
      })), PLUGIN_DESCRIPTOR_CACHE = new WeakMap, createCachedPluginDescriptors = (0, 
      _caching.makeWeakCacheSync)(((items, cache) => {
        const dirname = cache.using((dir => dir));
        return (0, _caching.makeStrongCache)((function*(alias) {
          return (yield* createPluginDescriptors(items, dirname, alias)).map((desc => loadCachedDescriptor(PLUGIN_DESCRIPTOR_CACHE, desc)));
        }));
      })), DEFAULT_OPTIONS = {};
      function loadCachedDescriptor(cache, desc) {
        const {value, options = DEFAULT_OPTIONS} = desc;
        if (!1 === options) return desc;
        let cacheByOptions = cache.get(value);
        cacheByOptions || (cacheByOptions = new WeakMap, cache.set(value, cacheByOptions));
        let possibilities = cacheByOptions.get(options);
        if (possibilities || (possibilities = [], cacheByOptions.set(options, possibilities)), 
        -1 === possibilities.indexOf(desc)) {
          const matches = possibilities.filter((possibility => {
            return b = desc, (a = possibility).name === b.name && a.value === b.value && a.options === b.options && a.dirname === b.dirname && a.alias === b.alias && a.ownPass === b.ownPass && (a.file && a.file.request) === (b.file && b.file.request) && (a.file && a.file.resolved) === (b.file && b.file.resolved);
            var a, b;
          }));
          if (matches.length > 0) return matches[0];
          possibilities.push(desc);
        }
        return desc;
      }
      function* createPresetDescriptors(items, dirname, alias, passPerPreset) {
        return yield* createDescriptors("preset", items, dirname, alias, passPerPreset);
      }
      function* createPluginDescriptors(items, dirname, alias) {
        return yield* createDescriptors("plugin", items, dirname, alias);
      }
      function* createDescriptors(type, items, dirname, alias, ownPass) {
        const descriptors = yield* _gensync().all(items.map(((item, index) => createDescriptor(item, dirname, {
          type,
          alias: `${alias}$${index}`,
          ownPass: !!ownPass
        }))));
        return function(items) {
          const map = new Map;
          for (const item of items) {
            if ("function" != typeof item.value) continue;
            let nameMap = map.get(item.value);
            if (nameMap || (nameMap = new Set, map.set(item.value, nameMap)), nameMap.has(item.name)) {
              const conflicts = items.filter((i => i.value === item.value));
              throw new Error([ "Duplicate plugin/preset detected.", "If you'd like to use two separate instances of a plugin,", "they need separate names, e.g.", "", "  plugins: [", "    ['some-plugin', {}],", "    ['some-plugin', {}, 'some unique name'],", "  ]", "", "Duplicates detected are:", `${JSON.stringify(conflicts, null, 2)}` ].join("\n"));
            }
            nameMap.add(item.name);
          }
        }(descriptors), descriptors;
      }
      function* createDescriptor(pair, dirname, {type, alias, ownPass}) {
        const desc = (0, _item.getItemDescriptor)(pair);
        if (desc) return desc;
        let name, options, file, value = pair;
        Array.isArray(value) && (3 === value.length ? [value, options, name] = value : [value, options] = value);
        let filepath = null;
        if ("string" == typeof value) {
          if ("string" != typeof type) throw new Error("To resolve a string-based item, the type of item must be given");
          const resolver = "plugin" === type ? _files.loadPlugin : _files.loadPreset, request = value;
          ({filepath, value} = yield* resolver(value, dirname)), file = {
            request,
            resolved: filepath
          };
        }
        if (!value) throw new Error(`Unexpected falsy value: ${String(value)}`);
        if ("object" == typeof value && value.__esModule) {
          if (!value.default) throw new Error("Must export a default export when using ES6 modules.");
          value = value.default;
        }
        if ("object" != typeof value && "function" != typeof value) throw new Error(`Unsupported format: ${typeof value}. Expected an object or a function.`);
        if (null !== filepath && "object" == typeof value && value) throw new Error(`Plugin/Preset files are not allowed to export objects, only functions. In ${filepath}`);
        return {
          name,
          alias: filepath || alias,
          value,
          options,
          dirname,
          ownPass,
          file
        };
      }
    },
    6834: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(_x, _x2) {
        return _resolve.apply(this, arguments);
      };
      var _importMetaResolve = __webpack_require__(7674);
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg), value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self = this, args = arguments;
          return new Promise((function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          }));
        };
      }
      let import_;
      try {
        import_ = __webpack_require__(8912).Z;
      } catch (_unused) {}
      const importMetaResolveP = import_ && process.execArgv.includes("--experimental-import-meta-resolve") ? import_("data:text/javascript,export default import.meta.resolve").then((m => m.default || _importMetaResolve.resolve), (() => _importMetaResolve.resolve)) : Promise.resolve(_importMetaResolve.resolve);
      function _resolve() {
        return (_resolve = _asyncToGenerator((function*(specifier, parent) {
          return (yield importMetaResolveP)(specifier, parent);
        }))).apply(this, arguments);
      }
    },
    2557: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "ROOT_CONFIG_FILENAMES", {
        enumerable: !0,
        get: function() {
          return _configuration.ROOT_CONFIG_FILENAMES;
        }
      }), Object.defineProperty(exports, "findConfigUpwards", {
        enumerable: !0,
        get: function() {
          return _configuration.findConfigUpwards;
        }
      }), Object.defineProperty(exports, "findPackageData", {
        enumerable: !0,
        get: function() {
          return _package.findPackageData;
        }
      }), Object.defineProperty(exports, "findRelativeConfig", {
        enumerable: !0,
        get: function() {
          return _configuration.findRelativeConfig;
        }
      }), Object.defineProperty(exports, "findRootConfig", {
        enumerable: !0,
        get: function() {
          return _configuration.findRootConfig;
        }
      }), Object.defineProperty(exports, "loadConfig", {
        enumerable: !0,
        get: function() {
          return _configuration.loadConfig;
        }
      }), Object.defineProperty(exports, "loadPlugin", {
        enumerable: !0,
        get: function() {
          return plugins.loadPlugin;
        }
      }), Object.defineProperty(exports, "loadPreset", {
        enumerable: !0,
        get: function() {
          return plugins.loadPreset;
        }
      }), exports.resolvePreset = exports.resolvePlugin = void 0, Object.defineProperty(exports, "resolveShowConfigPath", {
        enumerable: !0,
        get: function() {
          return _configuration.resolveShowConfigPath;
        }
      });
      var _package = __webpack_require__(5904), _configuration = __webpack_require__(5190), plugins = __webpack_require__(4574);
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      const resolvePlugin = _gensync()(plugins.resolvePlugin).sync;
      exports.resolvePlugin = resolvePlugin;
      const resolvePreset = _gensync()(plugins.resolvePreset).sync;
      exports.resolvePreset = resolvePreset;
    },
    5904: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.findPackageData = function*(filepath) {
        let pkg = null;
        const directories = [];
        let isPackage = !0, dirname = _path().dirname(filepath);
        for (;!pkg && "node_modules" !== _path().basename(dirname); ) {
          directories.push(dirname), pkg = yield* readConfigPackage(_path().join(dirname, "package.json"));
          const nextLoc = _path().dirname(dirname);
          if (dirname === nextLoc) {
            isPackage = !1;
            break;
          }
          dirname = nextLoc;
        }
        return {
          filepath,
          directories,
          pkg,
          isPackage
        };
      };
      var _utils = __webpack_require__(2800);
      const readConfigPackage = (0, _utils.makeStaticFileCache)(((filepath, content) => {
        let options;
        try {
          options = JSON.parse(content);
        } catch (err) {
          throw err.message = `${filepath}: Error while parsing JSON - ${err.message}`, err;
        }
        if (!options) throw new Error(`${filepath}: No config detected`);
        if ("object" != typeof options) throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
        if (Array.isArray(options)) throw new Error(`${filepath}: Expected config object but found array`);
        return {
          filepath,
          dirname: _path().dirname(filepath),
          options
        };
      }));
    },
    2800: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.makeStaticFileCache = function(fn) {
        return (0, _caching.makeStrongCache)((function*(filepath, cache) {
          const cached = cache.invalidate((() => function(filepath) {
            if (!_fs2().existsSync(filepath)) return null;
            try {
              return +_fs2().statSync(filepath).mtime;
            } catch (e) {
              if ("ENOENT" !== e.code && "ENOTDIR" !== e.code) throw e;
            }
            return null;
          }(filepath)));
          return null === cached ? null : fn(filepath, yield* fs.readFile(filepath, "utf8"));
        }));
      };
      var _caching = __webpack_require__(656), fs = __webpack_require__(2344);
      function _fs2() {
        const data = __webpack_require__(7147);
        return _fs2 = function() {
          return data;
        }, data;
      }
    },
    9178: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _async = __webpack_require__(7241), _util = __webpack_require__(1050), context = __webpack_require__(2420), _plugin = __webpack_require__(424), _item = __webpack_require__(6415), _configChain = __webpack_require__(4025), _deepArray = __webpack_require__(2853);
      function _traverse() {
        const data = __webpack_require__(241);
        return _traverse = function() {
          return data;
        }, data;
      }
      var _caching = __webpack_require__(656), _options = __webpack_require__(1139), _plugins = __webpack_require__(4931), _configApi = __webpack_require__(5839), _partial = __webpack_require__(6248), _default = (__webpack_require__(5008), 
      _gensync()((function*(inputOpts) {
        var _opts$assumptions;
        const result = yield* (0, _partial.default)(inputOpts);
        if (!result) return null;
        const {options, context, fileHandling} = result;
        if ("ignored" === fileHandling) return null;
        const optionDefaults = {}, {plugins, presets} = options;
        if (!plugins || !presets) throw new Error("Assertion failure - plugins and presets exist");
        const presetContext = Object.assign({}, context, {
          targets: options.targets
        }), toDescriptor = item => {
          const desc = (0, _item.getItemDescriptor)(item);
          if (!desc) throw new Error("Assertion failure - must be config item");
          return desc;
        }, presetsDescriptors = presets.map(toDescriptor), initialPluginsDescriptors = plugins.map(toDescriptor), pluginDescriptorsByPass = [ [] ], passes = [], externalDependencies = [], ignored = yield* enhanceError(context, (function* recursePresetDescriptors(rawPresets, pluginDescriptorsPass) {
          const presets = [];
          for (let i = 0; i < rawPresets.length; i++) {
            const descriptor = rawPresets[i];
            if (!1 !== descriptor.options) {
              try {
                var preset = yield* loadPresetDescriptor(descriptor, presetContext);
              } catch (e) {
                throw "BABEL_UNKNOWN_OPTION" === e.code && (0, _options.checkNoUnwrappedItemOptionPairs)(rawPresets, i, "preset", e), 
                e;
              }
              externalDependencies.push(preset.externalDependencies), descriptor.ownPass ? presets.push({
                preset: preset.chain,
                pass: []
              }) : presets.unshift({
                preset: preset.chain,
                pass: pluginDescriptorsPass
              });
            }
          }
          if (presets.length > 0) {
            pluginDescriptorsByPass.splice(1, 0, ...presets.map((o => o.pass)).filter((p => p !== pluginDescriptorsPass)));
            for (const {preset, pass} of presets) {
              if (!preset) return !0;
              pass.push(...preset.plugins);
              if (yield* recursePresetDescriptors(preset.presets, pass)) return !0;
              preset.options.forEach((opts => {
                (0, _util.mergeOptions)(optionDefaults, opts);
              }));
            }
          }
        }))(presetsDescriptors, pluginDescriptorsByPass[0]);
        if (ignored) return null;
        const opts = optionDefaults;
        (0, _util.mergeOptions)(opts, options);
        const pluginContext = Object.assign({}, presetContext, {
          assumptions: null != (_opts$assumptions = opts.assumptions) ? _opts$assumptions : {}
        });
        return yield* enhanceError(context, (function*() {
          pluginDescriptorsByPass[0].unshift(...initialPluginsDescriptors);
          for (const descs of pluginDescriptorsByPass) {
            const pass = [];
            passes.push(pass);
            for (let i = 0; i < descs.length; i++) {
              const descriptor = descs[i];
              if (!1 !== descriptor.options) {
                try {
                  var plugin = yield* loadPluginDescriptor(descriptor, pluginContext);
                } catch (e) {
                  throw "BABEL_UNKNOWN_PLUGIN_PROPERTY" === e.code && (0, _options.checkNoUnwrappedItemOptionPairs)(descs, i, "plugin", e), 
                  e;
                }
                pass.push(plugin), externalDependencies.push(plugin.externalDependencies);
              }
            }
          }
        }))(), opts.plugins = passes[0], opts.presets = passes.slice(1).filter((plugins => plugins.length > 0)).map((plugins => ({
          plugins
        }))), opts.passPerPreset = opts.presets.length > 0, {
          options: opts,
          passes,
          externalDependencies: (0, _deepArray.finalize)(externalDependencies)
        };
      })));
      function enhanceError(context, fn) {
        return function*(arg1, arg2) {
          try {
            return yield* fn(arg1, arg2);
          } catch (e) {
            throw /^\[BABEL\]/.test(e.message) || (e.message = `[BABEL] ${context.filename || "unknown"}: ${e.message}`), 
            e;
          }
        };
      }
      exports.default = _default;
      const makeDescriptorLoader = apiFactory => (0, _caching.makeWeakCache)((function*({value, options, dirname, alias}, cache) {
        if (!1 === options) throw new Error("Assertion failure");
        options = options || {};
        const externalDependencies = [];
        let item = value;
        if ("function" == typeof value) {
          const factory = (0, _async.maybeAsync)(value, "You appear to be using an async plugin/preset, but Babel has been called synchronously"), api = Object.assign({}, context, apiFactory(cache, externalDependencies));
          try {
            item = yield* factory(api, options, dirname);
          } catch (e) {
            throw alias && (e.message += ` (While processing: ${JSON.stringify(alias)})`), e;
          }
        }
        if (!item || "object" != typeof item) throw new Error("Plugin/Preset did not return an object.");
        if ((0, _async.isThenable)(item)) throw yield* [], new Error(`You appear to be using a promise as a plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version. As an alternative, you can prefix the promise with "await". (While processing: ${JSON.stringify(alias)})`);
        if (externalDependencies.length > 0 && (!cache.configured() || "forever" === cache.mode())) {
          let error = `A plugin/preset has external untracked dependencies (${externalDependencies[0]}), but the cache `;
          throw cache.configured() ? error += " has been configured to never be invalidated. " : error += "has not been configured to be invalidated when the external dependencies change. ", 
          error += `Plugins/presets should configure their cache to be invalidated when the external dependencies change, for example using \`api.cache.invalidate(() => statSync(filepath).mtimeMs)\` or \`api.cache.never()\`\n(While processing: ${JSON.stringify(alias)})`, 
          new Error(error);
        }
        return {
          value: item,
          options,
          dirname,
          alias,
          externalDependencies: (0, _deepArray.finalize)(externalDependencies)
        };
      })), pluginDescriptorLoader = makeDescriptorLoader(_configApi.makePluginAPI), presetDescriptorLoader = makeDescriptorLoader(_configApi.makePresetAPI);
      function* loadPluginDescriptor(descriptor, context) {
        if (descriptor.value instanceof _plugin.default) {
          if (descriptor.options) throw new Error("Passed options to an existing Plugin instance will not work.");
          return descriptor.value;
        }
        return yield* instantiatePlugin(yield* pluginDescriptorLoader(descriptor, context), context);
      }
      const instantiatePlugin = (0, _caching.makeWeakCache)((function*({value, options, dirname, alias, externalDependencies}, cache) {
        const pluginObj = (0, _plugins.validatePluginObject)(value), plugin = Object.assign({}, pluginObj);
        if (plugin.visitor && (plugin.visitor = _traverse().default.explode(Object.assign({}, plugin.visitor))), 
        plugin.inherits) {
          const inheritsDescriptor = {
            name: void 0,
            alias: `${alias}$inherits`,
            value: plugin.inherits,
            options,
            dirname
          }, inherits = yield* (0, _async.forwardAsync)(loadPluginDescriptor, (run => cache.invalidate((data => run(inheritsDescriptor, data)))));
          plugin.pre = chain(inherits.pre, plugin.pre), plugin.post = chain(inherits.post, plugin.post), 
          plugin.manipulateOptions = chain(inherits.manipulateOptions, plugin.manipulateOptions), 
          plugin.visitor = _traverse().default.visitors.merge([ inherits.visitor || {}, plugin.visitor || {} ]), 
          inherits.externalDependencies.length > 0 && (externalDependencies = 0 === externalDependencies.length ? inherits.externalDependencies : (0, 
          _deepArray.finalize)([ externalDependencies, inherits.externalDependencies ]));
        }
        return new _plugin.default(plugin, options, alias, externalDependencies);
      })), validateIfOptionNeedsFilename = (options, descriptor) => {
        if (options.test || options.include || options.exclude) {
          const formattedPresetName = descriptor.name ? `"${descriptor.name}"` : "/* your preset */";
          throw new Error([ `Preset ${formattedPresetName} requires a filename to be set when babel is called directly,`, "```", `babel.transform(code, { filename: 'file.ts', presets: [${formattedPresetName}] });`, "```", "See https://babeljs.io/docs/en/options#filename for more information." ].join("\n"));
        }
      };
      function* loadPresetDescriptor(descriptor, context) {
        const preset = instantiatePreset(yield* presetDescriptorLoader(descriptor, context));
        return ((preset, context, descriptor) => {
          if (!context.filename) {
            const {options} = preset;
            validateIfOptionNeedsFilename(options, descriptor), options.overrides && options.overrides.forEach((overrideOptions => validateIfOptionNeedsFilename(overrideOptions, descriptor)));
          }
        })(preset, context, descriptor), {
          chain: yield* (0, _configChain.buildPresetChain)(preset, context),
          externalDependencies: preset.externalDependencies
        };
      }
      const instantiatePreset = (0, _caching.makeWeakCacheSync)((({value, dirname, alias, externalDependencies}) => ({
        options: (0, _options.validate)("preset", value),
        alias,
        dirname,
        externalDependencies
      })));
      function chain(a, b) {
        const fns = [ a, b ].filter(Boolean);
        return fns.length <= 1 ? fns[0] : function(...args) {
          for (const fn of fns) fn.apply(this, args);
        };
      }
    },
    5839: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _semver() {
        const data = __webpack_require__(6625);
        return _semver = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.makeConfigAPI = makeConfigAPI, exports.makePluginAPI = function(cache, externalDependencies) {
        return Object.assign({}, makePresetAPI(cache, externalDependencies), {
          assumption: name => cache.using((data => data.assumptions[name]))
        });
      }, exports.makePresetAPI = makePresetAPI;
      var _ = __webpack_require__(2420), _caching = __webpack_require__(656);
      __webpack_require__(5008);
      function makeConfigAPI(cache) {
        return {
          version: _.version,
          cache: cache.simple(),
          env: value => cache.using((data => void 0 === value ? data.envName : "function" == typeof value ? (0, 
          _caching.assertSimpleType)(value(data.envName)) : (Array.isArray(value) || (value = [ value ]), 
          value.some((entry => {
            if ("string" != typeof entry) throw new Error("Unexpected non-string value");
            return entry === data.envName;
          }))))),
          async: () => !1,
          caller: cb => cache.using((data => (0, _caching.assertSimpleType)(cb(data.caller)))),
          assertVersion
        };
      }
      function makePresetAPI(cache, externalDependencies) {
        return Object.assign({}, makeConfigAPI(cache), {
          targets: () => JSON.parse(cache.using((data => JSON.stringify(data.targets)))),
          addExternalDependency: ref => {
            externalDependencies.push(ref);
          }
        });
      }
      function assertVersion(range) {
        if ("number" == typeof range) {
          if (!Number.isInteger(range)) throw new Error("Expected string or integer value.");
          range = `^${range}.0.0-0`;
        }
        if ("string" != typeof range) throw new Error("Expected string or integer value.");
        if (_semver().satisfies(_.version, range)) return;
        const limit = Error.stackTraceLimit;
        "number" == typeof limit && limit < 25 && (Error.stackTraceLimit = 25);
        const err = new Error(`Requires Babel "${range}", but was loaded with "${_.version}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`);
        throw "number" == typeof limit && (Error.stackTraceLimit = limit), Object.assign(err, {
          code: "BABEL_VERSION_UNSUPPORTED",
          version: _.version,
          range
        });
      }
    },
    2853: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.finalize = function(deepArr) {
        return Object.freeze(deepArr);
      }, exports.flattenToSet = function(arr) {
        const result = new Set, stack = [ arr ];
        for (;stack.length > 0; ) for (const el of stack.pop()) Array.isArray(el) ? stack.push(el) : result.add(el);
        return result;
      };
    },
    2837: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.getEnv = function(defaultValue = "development") {
        return process.env.BABEL_ENV || process.env.NODE_ENV || defaultValue;
      };
    },
    695: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createConfigItem = function(target, options, callback) {
        return void 0 !== callback ? createConfigItemRunner.errback(target, options, callback) : "function" == typeof options ? createConfigItemRunner.errback(target, void 0, callback) : createConfigItemRunner.sync(target, options);
      }, exports.createConfigItemSync = exports.createConfigItemAsync = void 0, Object.defineProperty(exports, "default", {
        enumerable: !0,
        get: function() {
          return _full.default;
        }
      }), exports.loadPartialConfigSync = exports.loadPartialConfigAsync = exports.loadPartialConfig = exports.loadOptionsSync = exports.loadOptionsAsync = exports.loadOptions = void 0;
      var _full = __webpack_require__(9178), _partial = __webpack_require__(6248), _item = __webpack_require__(6415);
      const loadOptionsRunner = _gensync()((function*(opts) {
        var _config$options;
        const config = yield* (0, _full.default)(opts);
        return null != (_config$options = null == config ? void 0 : config.options) ? _config$options : null;
      })), createConfigItemRunner = _gensync()(_item.createConfigItem), maybeErrback = runner => (opts, callback) => (void 0 === callback && "function" == typeof opts && (callback = opts, 
      opts = void 0), callback ? runner.errback(opts, callback) : runner.sync(opts)), loadPartialConfig = maybeErrback(_partial.loadPartialConfig);
      exports.loadPartialConfig = loadPartialConfig;
      const loadPartialConfigSync = _partial.loadPartialConfig.sync;
      exports.loadPartialConfigSync = loadPartialConfigSync;
      const loadPartialConfigAsync = _partial.loadPartialConfig.async;
      exports.loadPartialConfigAsync = loadPartialConfigAsync;
      const loadOptions = maybeErrback(loadOptionsRunner);
      exports.loadOptions = loadOptions;
      const loadOptionsSync = loadOptionsRunner.sync;
      exports.loadOptionsSync = loadOptionsSync;
      const loadOptionsAsync = loadOptionsRunner.async;
      exports.loadOptionsAsync = loadOptionsAsync;
      const createConfigItemSync = createConfigItemRunner.sync;
      exports.createConfigItemSync = createConfigItemSync;
      const createConfigItemAsync = createConfigItemRunner.async;
      exports.createConfigItemAsync = createConfigItemAsync;
    },
    6415: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.createConfigItem = function*(value, {dirname = ".", type} = {}) {
        return createItemFromDescriptor(yield* (0, _configDescriptors.createDescriptor)(value, _path().resolve(dirname), {
          type,
          alias: "programmatic item"
        }));
      }, exports.createItemFromDescriptor = createItemFromDescriptor, exports.getItemDescriptor = function(item) {
        if (null != item && item[CONFIG_ITEM_BRAND]) return item._descriptor;
        return;
      };
      var _configDescriptors = __webpack_require__(9261);
      function createItemFromDescriptor(desc) {
        return new ConfigItem(desc);
      }
      const CONFIG_ITEM_BRAND = Symbol.for("@babel/core@7 - ConfigItem");
      class ConfigItem {
        constructor(descriptor) {
          this._descriptor = void 0, this[CONFIG_ITEM_BRAND] = !0, this.value = void 0, this.options = void 0, 
          this.dirname = void 0, this.name = void 0, this.file = void 0, this._descriptor = descriptor, 
          Object.defineProperty(this, "_descriptor", {
            enumerable: !1
          }), Object.defineProperty(this, CONFIG_ITEM_BRAND, {
            enumerable: !1
          }), this.value = this._descriptor.value, this.options = this._descriptor.options, 
          this.dirname = this._descriptor.dirname, this.name = this._descriptor.name, this.file = this._descriptor.file ? {
            request: this._descriptor.file.request,
            resolved: this._descriptor.file.resolved
          } : void 0, Object.freeze(this);
        }
      }
      Object.freeze(ConfigItem.prototype);
    },
    6248: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = loadPrivatePartialConfig, exports.loadPartialConfig = void 0;
      var _plugin = __webpack_require__(424), _util = __webpack_require__(1050), _item = __webpack_require__(6415), _configChain = __webpack_require__(4025), _environment = __webpack_require__(2837), _options = __webpack_require__(1139), _files = __webpack_require__(2557), _resolveTargets = __webpack_require__(3122);
      const _excluded = [ "showIgnoredFiles" ];
      function* loadPrivatePartialConfig(inputOpts) {
        if (null != inputOpts && ("object" != typeof inputOpts || Array.isArray(inputOpts))) throw new Error("Babel options must be an object, null, or undefined");
        const args = inputOpts ? (0, _options.validate)("arguments", inputOpts) : {}, {envName = (0, 
        _environment.getEnv)(), cwd = ".", root: rootDir = ".", rootMode = "root", caller, cloneInputAst = !0} = args, absoluteCwd = _path().resolve(cwd), absoluteRootDir = function(rootDir, rootMode) {
          switch (rootMode) {
           case "root":
            return rootDir;

           case "upward-optional":
            {
              const upwardRootDir = (0, _files.findConfigUpwards)(rootDir);
              return null === upwardRootDir ? rootDir : upwardRootDir;
            }

           case "upward":
            {
              const upwardRootDir = (0, _files.findConfigUpwards)(rootDir);
              if (null !== upwardRootDir) return upwardRootDir;
              throw Object.assign(new Error(`Babel was run with rootMode:"upward" but a root could not be found when searching upward from "${rootDir}".\nOne of the following config files must be in the directory tree: "${_files.ROOT_CONFIG_FILENAMES.join(", ")}".`), {
                code: "BABEL_ROOT_NOT_FOUND",
                dirname: rootDir
              });
            }

           default:
            throw new Error("Assertion failure - unknown rootMode value.");
          }
        }(_path().resolve(absoluteCwd, rootDir), rootMode), filename = "string" == typeof args.filename ? _path().resolve(cwd, args.filename) : void 0, context = {
          filename,
          cwd: absoluteCwd,
          root: absoluteRootDir,
          envName,
          caller,
          showConfig: (yield* (0, _files.resolveShowConfigPath)(absoluteCwd)) === filename
        }, configChain = yield* (0, _configChain.buildRootChain)(args, context);
        if (!configChain) return null;
        const merged = {
          assumptions: {}
        };
        configChain.options.forEach((opts => {
          (0, _util.mergeOptions)(merged, opts);
        }));
        return {
          options: Object.assign({}, merged, {
            targets: (0, _resolveTargets.resolveTargets)(merged, absoluteRootDir),
            cloneInputAst,
            babelrc: !1,
            configFile: !1,
            browserslistConfigFile: !1,
            passPerPreset: !1,
            envName: context.envName,
            cwd: context.cwd,
            root: context.root,
            rootMode: "root",
            filename: "string" == typeof context.filename ? context.filename : void 0,
            plugins: configChain.plugins.map((descriptor => (0, _item.createItemFromDescriptor)(descriptor))),
            presets: configChain.presets.map((descriptor => (0, _item.createItemFromDescriptor)(descriptor)))
          }),
          context,
          fileHandling: configChain.fileHandling,
          ignore: configChain.ignore,
          babelrc: configChain.babelrc,
          config: configChain.config,
          files: configChain.files
        };
      }
      const loadPartialConfig = _gensync()((function*(opts) {
        let showIgnoredFiles = !1;
        if ("object" == typeof opts && null !== opts && !Array.isArray(opts)) {
          var _opts = opts;
          ({showIgnoredFiles} = _opts), opts = function(source, excluded) {
            if (null == source) return {};
            var key, i, target = {}, sourceKeys = Object.keys(source);
            for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
            return target;
          }(_opts, _excluded);
        }
        const result = yield* loadPrivatePartialConfig(opts);
        if (!result) return null;
        const {options, babelrc, ignore, config, fileHandling, files} = result;
        return "ignored" !== fileHandling || showIgnoredFiles ? ((options.plugins || []).forEach((item => {
          if (item.value instanceof _plugin.default) throw new Error("Passing cached plugin instances is not supported in babel.loadPartialConfig()");
        })), new PartialConfig(options, babelrc ? babelrc.filepath : void 0, ignore ? ignore.filepath : void 0, config ? config.filepath : void 0, fileHandling, files)) : null;
      }));
      exports.loadPartialConfig = loadPartialConfig;
      class PartialConfig {
        constructor(options, babelrc, ignore, config, fileHandling, files) {
          this.options = void 0, this.babelrc = void 0, this.babelignore = void 0, this.config = void 0, 
          this.fileHandling = void 0, this.files = void 0, this.options = options, this.babelignore = ignore, 
          this.babelrc = babelrc, this.config = config, this.fileHandling = fileHandling, 
          this.files = files, Object.freeze(this);
        }
        hasFilesystemConfig() {
          return void 0 !== this.babelrc || void 0 !== this.config;
        }
      }
      Object.freeze(PartialConfig.prototype);
    },
    8552: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(pattern, dirname) {
        const parts = _path().resolve(dirname, pattern).split(_path().sep);
        return new RegExp([ "^", ...parts.map(((part, i) => {
          const last = i === parts.length - 1;
          return "**" === part ? last ? starStarPatLast : starStarPat : "*" === part ? last ? starPatLast : starPat : 0 === part.indexOf("*.") ? substitution + escapeRegExp(part.slice(1)) + (last ? endSep : sep) : escapeRegExp(part) + (last ? endSep : sep);
        })) ].join(""));
      };
      const sep = `\\${_path().sep}`, endSep = `(?:${sep}|$)`, substitution = `[^${sep}]+`, starPat = `(?:${substitution}${sep})`, starPatLast = `(?:${substitution}${endSep})`, starStarPat = `${starPat}*?`, starStarPatLast = `${starPat}*?${starPatLast}?`;
      function escapeRegExp(string) {
        return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      }
    },
    424: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _deepArray = __webpack_require__(2853);
      exports.default = class {
        constructor(plugin, options, key, externalDependencies = (0, _deepArray.finalize)([])) {
          this.key = void 0, this.manipulateOptions = void 0, this.post = void 0, this.pre = void 0, 
          this.visitor = void 0, this.parserOverride = void 0, this.generatorOverride = void 0, 
          this.options = void 0, this.externalDependencies = void 0, this.key = plugin.name || key, 
          this.manipulateOptions = plugin.manipulateOptions, this.post = plugin.post, this.pre = plugin.pre, 
          this.visitor = plugin.visitor || {}, this.parserOverride = plugin.parserOverride, 
          this.generatorOverride = plugin.generatorOverride, this.options = options, this.externalDependencies = externalDependencies;
        }
      };
    },
    5078: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ConfigPrinter = exports.ChainFormatter = void 0;
      const ChainFormatter = {
        Programmatic: 0,
        Config: 1
      };
      exports.ChainFormatter = ChainFormatter;
      const Formatter = {
        title(type, callerName, filepath) {
          let title = "";
          return type === ChainFormatter.Programmatic ? (title = "programmatic options", callerName && (title += " from " + callerName)) : title = "config " + filepath, 
          title;
        },
        loc(index, envName) {
          let loc = "";
          return null != index && (loc += `.overrides[${index}]`), null != envName && (loc += `.env["${envName}"]`), 
          loc;
        },
        * optionsAndDescriptors(opt) {
          const content = Object.assign({}, opt.options);
          delete content.overrides, delete content.env;
          const pluginDescriptors = [ ...yield* opt.plugins() ];
          pluginDescriptors.length && (content.plugins = pluginDescriptors.map((d => descriptorToConfig(d))));
          const presetDescriptors = [ ...yield* opt.presets() ];
          return presetDescriptors.length && (content.presets = [ ...presetDescriptors ].map((d => descriptorToConfig(d)))), 
          JSON.stringify(content, void 0, 2);
        }
      };
      function descriptorToConfig(d) {
        var _d$file;
        let name = null == (_d$file = d.file) ? void 0 : _d$file.request;
        return null == name && ("object" == typeof d.value ? name = d.value : "function" == typeof d.value && (name = `[Function: ${d.value.toString().slice(0, 50)} ... ]`)), 
        null == name && (name = "[Unknown]"), void 0 === d.options ? name : null == d.name ? [ name, d.options ] : [ name, d.options, d.name ];
      }
      class ConfigPrinter {
        constructor() {
          this._stack = [];
        }
        configure(enabled, type, {callerName, filepath}) {
          return enabled ? (content, index, envName) => {
            this._stack.push({
              type,
              callerName,
              filepath,
              content,
              index,
              envName
            });
          } : () => {};
        }
        static * format(config) {
          let title = Formatter.title(config.type, config.callerName, config.filepath);
          const loc = Formatter.loc(config.index, config.envName);
          loc && (title += ` ${loc}`);
          return `${title}\n${yield* Formatter.optionsAndDescriptors(config.content)}`;
        }
        * output() {
          if (0 === this._stack.length) return "";
          return (yield* _gensync().all(this._stack.map((s => ConfigPrinter.format(s))))).join("\n\n");
        }
      }
      exports.ConfigPrinter = ConfigPrinter;
    },
    3122: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _helperCompilationTargets() {
        const data = __webpack_require__(4077);
        return _helperCompilationTargets = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.resolveBrowserslistConfigFile = function(browserslistConfigFile, configFileDir) {
        return _path().resolve(configFileDir, browserslistConfigFile);
      }, exports.resolveTargets = function(options, root) {
        let targets = options.targets;
        ("string" == typeof targets || Array.isArray(targets)) && (targets = {
          browsers: targets
        });
        targets && targets.esmodules && (targets = Object.assign({}, targets, {
          esmodules: "intersect"
        }));
        const {browserslistConfigFile} = options;
        let configFile, ignoreBrowserslistConfig = !1;
        "string" == typeof browserslistConfigFile ? configFile = browserslistConfigFile : ignoreBrowserslistConfig = !1 === browserslistConfigFile;
        return (0, _helperCompilationTargets().default)(targets, {
          ignoreBrowserslistConfig,
          configFile,
          configPath: root,
          browserslistEnv: options.browserslistEnv
        });
      };
    },
    1050: (__unused_webpack_module, exports) => {
      "use strict";
      function mergeDefaultFields(target, source) {
        for (const k of Object.keys(source)) {
          const val = source[k];
          void 0 !== val && (target[k] = val);
        }
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isIterableIterator = function(value) {
        return !!value && "function" == typeof value.next && "function" == typeof value[Symbol.iterator];
      }, exports.mergeOptions = function(target, source) {
        for (const k of Object.keys(source)) if ("parserOpts" !== k && "generatorOpts" !== k && "assumptions" !== k || !source[k]) {
          const val = source[k];
          void 0 !== val && (target[k] = val);
        } else {
          const parserOpts = source[k];
          mergeDefaultFields(target[k] || (target[k] = {}), parserOpts);
        }
      };
    },
    2517: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _helperCompilationTargets() {
        const data = __webpack_require__(4077);
        return _helperCompilationTargets = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.access = access, exports.assertArray = assertArray, exports.assertAssumptions = function(loc, value) {
        if (void 0 === value) return;
        if ("object" != typeof value || null === value) throw new Error(`${msg(loc)} must be an object or undefined.`);
        let root = loc;
        do {
          root = root.parent;
        } while ("root" !== root.type);
        const inPreset = "preset" === root.source;
        for (const name of Object.keys(value)) {
          const subLoc = access(loc, name);
          if (!_options.assumptionsNames.has(name)) throw new Error(`${msg(subLoc)} is not a supported assumption.`);
          if ("boolean" != typeof value[name]) throw new Error(`${msg(subLoc)} must be a boolean.`);
          if (inPreset && !1 === value[name]) throw new Error(`${msg(subLoc)} cannot be set to 'false' inside presets.`);
        }
        return value;
      }, exports.assertBabelrcSearch = function(loc, value) {
        if (void 0 === value || "boolean" == typeof value) return value;
        if (Array.isArray(value)) value.forEach(((item, i) => {
          if (!checkValidTest(item)) throw new Error(`${msg(access(loc, i))} must be a string/Function/RegExp.`);
        })); else if (!checkValidTest(value)) throw new Error(`${msg(loc)} must be a undefined, a boolean, a string/Function/RegExp or an array of those, got ${JSON.stringify(value)}`);
        return value;
      }, exports.assertBoolean = assertBoolean, exports.assertCallerMetadata = function(loc, value) {
        const obj = assertObject(loc, value);
        if (obj) {
          if ("string" != typeof obj.name) throw new Error(`${msg(loc)} set but does not contain "name" property string`);
          for (const prop of Object.keys(obj)) {
            const propLoc = access(loc, prop), value = obj[prop];
            if (null != value && "boolean" != typeof value && "string" != typeof value && "number" != typeof value) throw new Error(`${msg(propLoc)} must be null, undefined, a boolean, a string, or a number.`);
          }
        }
        return value;
      }, exports.assertCompact = function(loc, value) {
        if (void 0 !== value && "boolean" != typeof value && "auto" !== value) throw new Error(`${msg(loc)} must be a boolean, "auto", or undefined`);
        return value;
      }, exports.assertConfigApplicableTest = function(loc, value) {
        if (void 0 === value) return value;
        if (Array.isArray(value)) value.forEach(((item, i) => {
          if (!checkValidTest(item)) throw new Error(`${msg(access(loc, i))} must be a string/Function/RegExp.`);
        })); else if (!checkValidTest(value)) throw new Error(`${msg(loc)} must be a string/Function/RegExp, or an array of those`);
        return value;
      }, exports.assertConfigFileSearch = function(loc, value) {
        if (void 0 !== value && "boolean" != typeof value && "string" != typeof value) throw new Error(`${msg(loc)} must be a undefined, a boolean, a string, got ${JSON.stringify(value)}`);
        return value;
      }, exports.assertFunction = function(loc, value) {
        if (void 0 !== value && "function" != typeof value) throw new Error(`${msg(loc)} must be a function, or undefined`);
        return value;
      }, exports.assertIgnoreList = function(loc, value) {
        const arr = assertArray(loc, value);
        arr && arr.forEach(((item, i) => function(loc, value) {
          if ("string" != typeof value && "function" != typeof value && !(value instanceof RegExp)) throw new Error(`${msg(loc)} must be an array of string/Function/RegExp values, or undefined`);
          return value;
        }(access(loc, i), item)));
        return arr;
      }, exports.assertInputSourceMap = function(loc, value) {
        if (void 0 !== value && "boolean" != typeof value && ("object" != typeof value || !value)) throw new Error(`${msg(loc)} must be a boolean, object, or undefined`);
        return value;
      }, exports.assertObject = assertObject, exports.assertPluginList = function(loc, value) {
        const arr = assertArray(loc, value);
        arr && arr.forEach(((item, i) => function(loc, value) {
          if (Array.isArray(value)) {
            if (0 === value.length) throw new Error(`${msg(loc)} must include an object`);
            if (value.length > 3) throw new Error(`${msg(loc)} may only be a two-tuple or three-tuple`);
            if (assertPluginTarget(access(loc, 0), value[0]), value.length > 1) {
              const opts = value[1];
              if (void 0 !== opts && !1 !== opts && ("object" != typeof opts || Array.isArray(opts) || null === opts)) throw new Error(`${msg(access(loc, 1))} must be an object, false, or undefined`);
            }
            if (3 === value.length) {
              const name = value[2];
              if (void 0 !== name && "string" != typeof name) throw new Error(`${msg(access(loc, 2))} must be a string, or undefined`);
            }
          } else assertPluginTarget(loc, value);
          return value;
        }(access(loc, i), item)));
        return arr;
      }, exports.assertRootMode = function(loc, value) {
        if (void 0 !== value && "root" !== value && "upward" !== value && "upward-optional" !== value) throw new Error(`${msg(loc)} must be a "root", "upward", "upward-optional" or undefined`);
        return value;
      }, exports.assertSourceMaps = function(loc, value) {
        if (void 0 !== value && "boolean" != typeof value && "inline" !== value && "both" !== value) throw new Error(`${msg(loc)} must be a boolean, "inline", "both", or undefined`);
        return value;
      }, exports.assertSourceType = function(loc, value) {
        if (void 0 !== value && "module" !== value && "script" !== value && "unambiguous" !== value) throw new Error(`${msg(loc)} must be "module", "script", "unambiguous", or undefined`);
        return value;
      }, exports.assertString = function(loc, value) {
        if (void 0 !== value && "string" != typeof value) throw new Error(`${msg(loc)} must be a string, or undefined`);
        return value;
      }, exports.assertTargets = function(loc, value) {
        if ((0, _helperCompilationTargets().isBrowsersQueryValid)(value)) return value;
        if ("object" != typeof value || !value || Array.isArray(value)) throw new Error(`${msg(loc)} must be a string, an array of strings or an object`);
        const browsersLoc = access(loc, "browsers"), esmodulesLoc = access(loc, "esmodules");
        assertBrowsersList(browsersLoc, value.browsers), assertBoolean(esmodulesLoc, value.esmodules);
        for (const key of Object.keys(value)) {
          const val = value[key], subLoc = access(loc, key);
          if ("esmodules" === key) assertBoolean(subLoc, val); else if ("browsers" === key) assertBrowsersList(subLoc, val); else {
            if (!Object.hasOwnProperty.call(_helperCompilationTargets().TargetNames, key)) {
              const validTargets = Object.keys(_helperCompilationTargets().TargetNames).join(", ");
              throw new Error(`${msg(subLoc)} is not a valid target. Supported targets are ${validTargets}`);
            }
            assertBrowserVersion(subLoc, val);
          }
        }
        return value;
      }, exports.msg = msg;
      var _options = __webpack_require__(1139);
      function msg(loc) {
        switch (loc.type) {
         case "root":
          return "";

         case "env":
          return `${msg(loc.parent)}.env["${loc.name}"]`;

         case "overrides":
          return `${msg(loc.parent)}.overrides[${loc.index}]`;

         case "option":
          return `${msg(loc.parent)}.${loc.name}`;

         case "access":
          return `${msg(loc.parent)}[${JSON.stringify(loc.name)}]`;

         default:
          throw new Error(`Assertion failure: Unknown type ${loc.type}`);
        }
      }
      function access(loc, name) {
        return {
          type: "access",
          name,
          parent: loc
        };
      }
      function assertBoolean(loc, value) {
        if (void 0 !== value && "boolean" != typeof value) throw new Error(`${msg(loc)} must be a boolean, or undefined`);
        return value;
      }
      function assertObject(loc, value) {
        if (void 0 !== value && ("object" != typeof value || Array.isArray(value) || !value)) throw new Error(`${msg(loc)} must be an object, or undefined`);
        return value;
      }
      function assertArray(loc, value) {
        if (null != value && !Array.isArray(value)) throw new Error(`${msg(loc)} must be an array, or undefined`);
        return value;
      }
      function checkValidTest(value) {
        return "string" == typeof value || "function" == typeof value || value instanceof RegExp;
      }
      function assertPluginTarget(loc, value) {
        if (("object" != typeof value || !value) && "string" != typeof value && "function" != typeof value) throw new Error(`${msg(loc)} must be a string, object, function`);
        return value;
      }
      function assertBrowsersList(loc, value) {
        if (void 0 !== value && !(0, _helperCompilationTargets().isBrowsersQueryValid)(value)) throw new Error(`${msg(loc)} must be undefined, a string or an array of strings`);
      }
      function assertBrowserVersion(loc, value) {
        if (("number" != typeof value || Math.round(value) !== value) && "string" != typeof value) throw new Error(`${msg(loc)} must be a string or an integer number`);
      }
    },
    1139: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.assumptionsNames = void 0, exports.checkNoUnwrappedItemOptionPairs = function(items, index, type, e) {
        if (0 === index) return;
        const lastItem = items[index - 1], thisItem = items[index];
        lastItem.file && void 0 === lastItem.options && "object" == typeof thisItem.value && (e.message += `\n- Maybe you meant to use\n"${type}s": [\n  ["${lastItem.file.request}", ${JSON.stringify(thisItem.value, void 0, 2)}]\n]\nTo be a valid ${type}, its name and options should be wrapped in a pair of brackets`);
      }, exports.validate = function(type, opts) {
        return validateNested({
          type: "root",
          source: type
        }, opts);
      };
      __webpack_require__(424);
      var _removed = __webpack_require__(9010), _optionAssertions = __webpack_require__(2517);
      const ROOT_VALIDATORS = {
        cwd: _optionAssertions.assertString,
        root: _optionAssertions.assertString,
        rootMode: _optionAssertions.assertRootMode,
        configFile: _optionAssertions.assertConfigFileSearch,
        caller: _optionAssertions.assertCallerMetadata,
        filename: _optionAssertions.assertString,
        filenameRelative: _optionAssertions.assertString,
        code: _optionAssertions.assertBoolean,
        ast: _optionAssertions.assertBoolean,
        cloneInputAst: _optionAssertions.assertBoolean,
        envName: _optionAssertions.assertString
      }, BABELRC_VALIDATORS = {
        babelrc: _optionAssertions.assertBoolean,
        babelrcRoots: _optionAssertions.assertBabelrcSearch
      }, NONPRESET_VALIDATORS = {
        extends: _optionAssertions.assertString,
        ignore: _optionAssertions.assertIgnoreList,
        only: _optionAssertions.assertIgnoreList,
        targets: _optionAssertions.assertTargets,
        browserslistConfigFile: _optionAssertions.assertConfigFileSearch,
        browserslistEnv: _optionAssertions.assertString
      }, COMMON_VALIDATORS = {
        inputSourceMap: _optionAssertions.assertInputSourceMap,
        presets: _optionAssertions.assertPluginList,
        plugins: _optionAssertions.assertPluginList,
        passPerPreset: _optionAssertions.assertBoolean,
        assumptions: _optionAssertions.assertAssumptions,
        env: function(loc, value) {
          if ("env" === loc.parent.type) throw new Error(`${(0, _optionAssertions.msg)(loc)} is not allowed inside of another .env block`);
          const parent = loc.parent, obj = (0, _optionAssertions.assertObject)(loc, value);
          if (obj) for (const envName of Object.keys(obj)) {
            const env = (0, _optionAssertions.assertObject)((0, _optionAssertions.access)(loc, envName), obj[envName]);
            if (!env) continue;
            validateNested({
              type: "env",
              name: envName,
              parent
            }, env);
          }
          return obj;
        },
        overrides: function(loc, value) {
          if ("env" === loc.parent.type) throw new Error(`${(0, _optionAssertions.msg)(loc)} is not allowed inside an .env block`);
          if ("overrides" === loc.parent.type) throw new Error(`${(0, _optionAssertions.msg)(loc)} is not allowed inside an .overrides block`);
          const parent = loc.parent, arr = (0, _optionAssertions.assertArray)(loc, value);
          if (arr) for (const [index, item] of arr.entries()) {
            const objLoc = (0, _optionAssertions.access)(loc, index), env = (0, _optionAssertions.assertObject)(objLoc, item);
            if (!env) throw new Error(`${(0, _optionAssertions.msg)(objLoc)} must be an object`);
            validateNested({
              type: "overrides",
              index,
              parent
            }, env);
          }
          return arr;
        },
        test: _optionAssertions.assertConfigApplicableTest,
        include: _optionAssertions.assertConfigApplicableTest,
        exclude: _optionAssertions.assertConfigApplicableTest,
        retainLines: _optionAssertions.assertBoolean,
        comments: _optionAssertions.assertBoolean,
        shouldPrintComment: _optionAssertions.assertFunction,
        compact: _optionAssertions.assertCompact,
        minified: _optionAssertions.assertBoolean,
        auxiliaryCommentBefore: _optionAssertions.assertString,
        auxiliaryCommentAfter: _optionAssertions.assertString,
        sourceType: _optionAssertions.assertSourceType,
        wrapPluginVisitorMethod: _optionAssertions.assertFunction,
        highlightCode: _optionAssertions.assertBoolean,
        sourceMaps: _optionAssertions.assertSourceMaps,
        sourceMap: _optionAssertions.assertSourceMaps,
        sourceFileName: _optionAssertions.assertString,
        sourceRoot: _optionAssertions.assertString,
        parserOpts: _optionAssertions.assertObject,
        generatorOpts: _optionAssertions.assertObject
      };
      Object.assign(COMMON_VALIDATORS, {
        getModuleId: _optionAssertions.assertFunction,
        moduleRoot: _optionAssertions.assertString,
        moduleIds: _optionAssertions.assertBoolean,
        moduleId: _optionAssertions.assertString
      });
      const assumptionsNames = new Set([ "arrayLikeIsIterable", "constantReexports", "constantSuper", "enumerableModuleMeta", "ignoreFunctionLength", "ignoreToPrimitiveHint", "iterableIsArray", "mutableTemplateObject", "noClassCalls", "noDocumentAll", "noIncompleteNsImportDetection", "noNewArrows", "objectRestNoSymbols", "privateFieldsAsProperties", "pureGetters", "setClassMethods", "setComputedProperties", "setPublicClassFields", "setSpreadProperties", "skipForOfIteratorClosing", "superIsCallableConstructor" ]);
      function getSource(loc) {
        return "root" === loc.type ? loc.source : getSource(loc.parent);
      }
      function validateNested(loc, opts) {
        const type = getSource(loc);
        return function(opts) {
          if (has(opts, "sourceMap") && has(opts, "sourceMaps")) throw new Error(".sourceMap is an alias for .sourceMaps, cannot use both");
        }(opts), Object.keys(opts).forEach((key => {
          const optLoc = {
            type: "option",
            name: key,
            parent: loc
          };
          if ("preset" === type && NONPRESET_VALIDATORS[key]) throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is not allowed in preset options`);
          if ("arguments" !== type && ROOT_VALIDATORS[key]) throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is only allowed in root programmatic options`);
          if ("arguments" !== type && "configfile" !== type && BABELRC_VALIDATORS[key]) {
            if ("babelrcfile" === type || "extendsfile" === type) throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is not allowed in .babelrc or "extends"ed files, only in root programmatic options, or babel.config.js/config file options`);
            throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is only allowed in root programmatic options, or babel.config.js/config file options`);
          }
          (COMMON_VALIDATORS[key] || NONPRESET_VALIDATORS[key] || BABELRC_VALIDATORS[key] || ROOT_VALIDATORS[key] || throwUnknownError)(optLoc, opts[key]);
        })), opts;
      }
      function throwUnknownError(loc) {
        const key = loc.name;
        if (_removed.default[key]) {
          const {message, version = 5} = _removed.default[key];
          throw new Error(`Using removed Babel ${version} option: ${(0, _optionAssertions.msg)(loc)} - ${message}`);
        }
        {
          const unknownOptErr = new Error(`Unknown option: ${(0, _optionAssertions.msg)(loc)}. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.`);
          throw unknownOptErr.code = "BABEL_UNKNOWN_OPTION", unknownOptErr;
        }
      }
      function has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      exports.assumptionsNames = assumptionsNames;
    },
    4931: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.validatePluginObject = function(obj) {
        const rootPath = {
          type: "root",
          source: "plugin"
        };
        return Object.keys(obj).forEach((key => {
          const validator = VALIDATORS[key];
          if (!validator) {
            const invalidPluginPropertyError = new Error(`.${key} is not a valid Plugin property`);
            throw invalidPluginPropertyError.code = "BABEL_UNKNOWN_PLUGIN_PROPERTY", invalidPluginPropertyError;
          }
          validator({
            type: "option",
            name: key,
            parent: rootPath
          }, obj[key]);
        })), obj;
      };
      var _optionAssertions = __webpack_require__(2517);
      const VALIDATORS = {
        name: _optionAssertions.assertString,
        manipulateOptions: _optionAssertions.assertFunction,
        pre: _optionAssertions.assertFunction,
        post: _optionAssertions.assertFunction,
        inherits: _optionAssertions.assertFunction,
        visitor: function(loc, value) {
          const obj = (0, _optionAssertions.assertObject)(loc, value);
          if (obj && (Object.keys(obj).forEach((prop => function(key, value) {
            if (value && "object" == typeof value) Object.keys(value).forEach((handler => {
              if ("enter" !== handler && "exit" !== handler) throw new Error(`.visitor["${key}"] may only have .enter and/or .exit handlers.`);
            })); else if ("function" != typeof value) throw new Error(`.visitor["${key}"] must be a function`);
            return value;
          }(prop, obj[prop]))), obj.enter || obj.exit)) throw new Error(`${(0, _optionAssertions.msg)(loc)} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`);
          return obj;
        },
        parserOverride: _optionAssertions.assertFunction,
        generatorOverride: _optionAssertions.assertFunction
      };
    },
    9010: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      exports.default = {
        auxiliaryComment: {
          message: "Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"
        },
        blacklist: {
          message: "Put the specific transforms you want in the `plugins` option"
        },
        breakConfig: {
          message: "This is not a necessary option in Babel 6"
        },
        experimental: {
          message: "Put the specific transforms you want in the `plugins` option"
        },
        externalHelpers: {
          message: "Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"
        },
        extra: {
          message: ""
        },
        jsxPragma: {
          message: "use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"
        },
        loose: {
          message: "Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."
        },
        metadataUsedHelpers: {
          message: "Not required anymore as this is enabled by default"
        },
        modules: {
          message: "Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"
        },
        nonStandard: {
          message: "Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"
        },
        optional: {
          message: "Put the specific transforms you want in the `plugins` option"
        },
        sourceMapName: {
          message: "The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."
        },
        stage: {
          message: "Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"
        },
        whitelist: {
          message: "Put the specific transforms you want in the `plugins` option"
        },
        resolveModuleSource: {
          version: 6,
          message: "Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"
        },
        metadata: {
          version: 6,
          message: "Generated plugin metadata is always included in the output result"
        },
        sourceMapTarget: {
          version: 6,
          message: "The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."
        }
      };
    },
    7241: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.forwardAsync = function(action, cb) {
        const g = _gensync()(action);
        return withKind((kind => {
          const adapted = g[kind];
          return cb(adapted);
        }));
      }, exports.isAsync = void 0, exports.isThenable = isThenable, exports.maybeAsync = function(fn, message) {
        return _gensync()({
          sync(...args) {
            const result = fn.apply(this, args);
            if (isThenable(result)) throw new Error(message);
            return result;
          },
          async(...args) {
            return Promise.resolve(fn.apply(this, args));
          }
        });
      }, exports.waitFor = exports.onFirstPause = void 0;
      const id = x => x, runGenerator = _gensync()((function*(item) {
        return yield* item;
      })), isAsync = _gensync()({
        sync: () => !1,
        errback: cb => cb(null, !0)
      });
      exports.isAsync = isAsync;
      const withKind = _gensync()({
        sync: cb => cb("sync"),
        async: cb => cb("async")
      });
      const onFirstPause = _gensync()({
        name: "onFirstPause",
        arity: 2,
        sync: function(item) {
          return runGenerator.sync(item);
        },
        errback: function(item, firstPause, cb) {
          let completed = !1;
          runGenerator.errback(item, ((err, value) => {
            completed = !0, cb(err, value);
          })), completed || firstPause();
        }
      });
      exports.onFirstPause = onFirstPause;
      const waitFor = _gensync()({
        sync: id,
        async: id
      });
      function isThenable(val) {
        return !(!val || "object" != typeof val && "function" != typeof val || !val.then || "function" != typeof val.then);
      }
      exports.waitFor = waitFor;
    },
    2344: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _fs() {
        const data = __webpack_require__(7147);
        return _fs = function() {
          return data;
        }, data;
      }
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.stat = exports.readFile = void 0;
      const readFile = _gensync()({
        sync: _fs().readFileSync,
        errback: _fs().readFile
      });
      exports.readFile = readFile;
      const stat = _gensync()({
        sync: _fs().statSync,
        errback: _fs().stat
      });
      exports.stat = stat;
    },
    2420: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.DEFAULT_EXTENSIONS = void 0, Object.defineProperty(exports, "File", {
        enumerable: !0,
        get: function() {
          return _file.default;
        }
      }), exports.OptionManager = void 0, exports.Plugin = function(alias) {
        throw new Error(`The (${alias}) Babel 5 plugin is being run with an unsupported Babel version.`);
      }, Object.defineProperty(exports, "buildExternalHelpers", {
        enumerable: !0,
        get: function() {
          return _buildExternalHelpers.default;
        }
      }), Object.defineProperty(exports, "createConfigItem", {
        enumerable: !0,
        get: function() {
          return _config.createConfigItem;
        }
      }), Object.defineProperty(exports, "createConfigItemAsync", {
        enumerable: !0,
        get: function() {
          return _config.createConfigItemAsync;
        }
      }), Object.defineProperty(exports, "createConfigItemSync", {
        enumerable: !0,
        get: function() {
          return _config.createConfigItemSync;
        }
      }), Object.defineProperty(exports, "getEnv", {
        enumerable: !0,
        get: function() {
          return _environment.getEnv;
        }
      }), Object.defineProperty(exports, "loadOptions", {
        enumerable: !0,
        get: function() {
          return _config.loadOptions;
        }
      }), Object.defineProperty(exports, "loadOptionsAsync", {
        enumerable: !0,
        get: function() {
          return _config.loadOptionsAsync;
        }
      }), Object.defineProperty(exports, "loadOptionsSync", {
        enumerable: !0,
        get: function() {
          return _config.loadOptionsSync;
        }
      }), Object.defineProperty(exports, "loadPartialConfig", {
        enumerable: !0,
        get: function() {
          return _config.loadPartialConfig;
        }
      }), Object.defineProperty(exports, "loadPartialConfigAsync", {
        enumerable: !0,
        get: function() {
          return _config.loadPartialConfigAsync;
        }
      }), Object.defineProperty(exports, "loadPartialConfigSync", {
        enumerable: !0,
        get: function() {
          return _config.loadPartialConfigSync;
        }
      }), Object.defineProperty(exports, "parse", {
        enumerable: !0,
        get: function() {
          return _parse.parse;
        }
      }), Object.defineProperty(exports, "parseAsync", {
        enumerable: !0,
        get: function() {
          return _parse.parseAsync;
        }
      }), Object.defineProperty(exports, "parseSync", {
        enumerable: !0,
        get: function() {
          return _parse.parseSync;
        }
      }), Object.defineProperty(exports, "resolvePlugin", {
        enumerable: !0,
        get: function() {
          return _files.resolvePlugin;
        }
      }), Object.defineProperty(exports, "resolvePreset", {
        enumerable: !0,
        get: function() {
          return _files.resolvePreset;
        }
      }), Object.defineProperty(exports, "template", {
        enumerable: !0,
        get: function() {
          return _template().default;
        }
      }), Object.defineProperty(exports, "tokTypes", {
        enumerable: !0,
        get: function() {
          return _parser().tokTypes;
        }
      }), Object.defineProperty(exports, "transform", {
        enumerable: !0,
        get: function() {
          return _transform.transform;
        }
      }), Object.defineProperty(exports, "transformAsync", {
        enumerable: !0,
        get: function() {
          return _transform.transformAsync;
        }
      }), Object.defineProperty(exports, "transformFile", {
        enumerable: !0,
        get: function() {
          return _transformFile.transformFile;
        }
      }), Object.defineProperty(exports, "transformFileAsync", {
        enumerable: !0,
        get: function() {
          return _transformFile.transformFileAsync;
        }
      }), Object.defineProperty(exports, "transformFileSync", {
        enumerable: !0,
        get: function() {
          return _transformFile.transformFileSync;
        }
      }), Object.defineProperty(exports, "transformFromAst", {
        enumerable: !0,
        get: function() {
          return _transformAst.transformFromAst;
        }
      }), Object.defineProperty(exports, "transformFromAstAsync", {
        enumerable: !0,
        get: function() {
          return _transformAst.transformFromAstAsync;
        }
      }), Object.defineProperty(exports, "transformFromAstSync", {
        enumerable: !0,
        get: function() {
          return _transformAst.transformFromAstSync;
        }
      }), Object.defineProperty(exports, "transformSync", {
        enumerable: !0,
        get: function() {
          return _transform.transformSync;
        }
      }), Object.defineProperty(exports, "traverse", {
        enumerable: !0,
        get: function() {
          return _traverse().default;
        }
      }), exports.version = exports.types = void 0;
      var _file = __webpack_require__(5212), _buildExternalHelpers = __webpack_require__(6984), _files = __webpack_require__(2557), _environment = __webpack_require__(2837);
      function _types() {
        const data = __webpack_require__(7289);
        return _types = function() {
          return data;
        }, data;
      }
      function _parser() {
        const data = __webpack_require__(9516);
        return _parser = function() {
          return data;
        }, data;
      }
      function _traverse() {
        const data = __webpack_require__(241);
        return _traverse = function() {
          return data;
        }, data;
      }
      function _template() {
        const data = __webpack_require__(4847);
        return _template = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "types", {
        enumerable: !0,
        get: function() {
          return _types();
        }
      });
      var _config = __webpack_require__(695), _transform = __webpack_require__(4203), _transformFile = __webpack_require__(2722), _transformAst = __webpack_require__(3724), _parse = __webpack_require__(4727);
      exports.version = "7.17.10";
      const DEFAULT_EXTENSIONS = Object.freeze([ ".js", ".jsx", ".es6", ".es", ".mjs", ".cjs" ]);
      exports.DEFAULT_EXTENSIONS = DEFAULT_EXTENSIONS;
      exports.OptionManager = class {
        init(opts) {
          return (0, _config.loadOptions)(opts);
        }
      };
    },
    4727: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.parseSync = exports.parseAsync = exports.parse = void 0;
      var _config = __webpack_require__(695), _parser = __webpack_require__(3596), _normalizeOpts = __webpack_require__(7331);
      const parseRunner = _gensync()((function*(code, opts) {
        const config = yield* (0, _config.default)(opts);
        return null === config ? null : yield* (0, _parser.default)(config.passes, (0, _normalizeOpts.default)(config), code);
      }));
      exports.parse = function(code, opts, callback) {
        if ("function" == typeof opts && (callback = opts, opts = void 0), void 0 === callback) return parseRunner.sync(code, opts);
        parseRunner.errback(code, opts, callback);
      };
      const parseSync = parseRunner.sync;
      exports.parseSync = parseSync;
      const parseAsync = parseRunner.async;
      exports.parseAsync = parseAsync;
    },
    3596: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _parser() {
        const data = __webpack_require__(9516);
        return _parser = function() {
          return data;
        }, data;
      }
      function _codeFrame() {
        const data = __webpack_require__(4709);
        return _codeFrame = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function*(pluginPasses, {parserOpts, highlightCode = !0, filename = "unknown"}, code) {
        try {
          const results = [];
          for (const plugins of pluginPasses) for (const plugin of plugins) {
            const {parserOverride} = plugin;
            if (parserOverride) {
              const ast = parserOverride(code, parserOpts, _parser().parse);
              void 0 !== ast && results.push(ast);
            }
          }
          if (0 === results.length) return (0, _parser().parse)(code, parserOpts);
          if (1 === results.length) {
            if (yield* [], "function" == typeof results[0].then) throw new Error("You appear to be using an async parser plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
            return results[0];
          }
          throw new Error("More than one plugin attempted to override parsing.");
        } catch (err) {
          "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED" === err.code && (err.message += "\nConsider renaming the file to '.mjs', or setting sourceType:module or sourceType:unambiguous in your Babel config for this file.");
          const {loc, missingPlugin} = err;
          if (loc) {
            const codeFrame = (0, _codeFrame().codeFrameColumns)(code, {
              start: {
                line: loc.line,
                column: loc.column + 1
              }
            }, {
              highlightCode
            });
            err.message = missingPlugin ? `${filename}: ` + (0, _missingPluginHelper.default)(missingPlugin[0], loc, codeFrame) : `${filename}: ${err.message}\n\n` + codeFrame, 
            err.code = "BABEL_PARSE_ERROR";
          }
          throw err;
        }
      };
      var _missingPluginHelper = __webpack_require__(7499);
    },
    7499: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(missingPluginName, loc, codeFrame) {
        let helpMessage = `Support for the experimental syntax '${missingPluginName}' isn't currently enabled (${loc.line}:${loc.column + 1}):\n\n` + codeFrame;
        const pluginInfo = pluginNameMap[missingPluginName];
        if (pluginInfo) {
          const {syntax: syntaxPlugin, transform: transformPlugin} = pluginInfo;
          if (syntaxPlugin) {
            const syntaxPluginInfo = getNameURLCombination(syntaxPlugin);
            if (transformPlugin) {
              const transformPluginInfo = getNameURLCombination(transformPlugin), sectionType = transformPlugin.name.startsWith("@babel/plugin") ? "plugins" : "presets";
              helpMessage += `\n\nAdd ${transformPluginInfo} to the '${sectionType}' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add ${syntaxPluginInfo} to the 'plugins' section to enable parsing.`;
            } else helpMessage += `\n\nAdd ${syntaxPluginInfo} to the 'plugins' section of your Babel config to enable parsing.`;
          }
        }
        return helpMessage;
      };
      const pluginNameMap = {
        asyncDoExpressions: {
          syntax: {
            name: "@babel/plugin-syntax-async-do-expressions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-async-do-expressions"
          }
        },
        classProperties: {
          syntax: {
            name: "@babel/plugin-syntax-class-properties",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-class-properties"
          },
          transform: {
            name: "@babel/plugin-proposal-class-properties",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-class-properties"
          }
        },
        classPrivateProperties: {
          syntax: {
            name: "@babel/plugin-syntax-class-properties",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-class-properties"
          },
          transform: {
            name: "@babel/plugin-proposal-class-properties",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-class-properties"
          }
        },
        classPrivateMethods: {
          syntax: {
            name: "@babel/plugin-syntax-class-properties",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-class-properties"
          },
          transform: {
            name: "@babel/plugin-proposal-private-methods",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-private-methods"
          }
        },
        classStaticBlock: {
          syntax: {
            name: "@babel/plugin-syntax-class-static-block",
            url: "https://github.com/babel/babel/tree/HEAD/packages/babel-plugin-syntax-class-static-block"
          },
          transform: {
            name: "@babel/plugin-proposal-class-static-block",
            url: "https://github.com/babel/babel/tree/HEAD/packages/babel-plugin-proposal-class-static-block"
          }
        },
        decimal: {
          syntax: {
            name: "@babel/plugin-syntax-decimal",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-decimal"
          }
        },
        decorators: {
          syntax: {
            name: "@babel/plugin-syntax-decorators",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-decorators"
          },
          transform: {
            name: "@babel/plugin-proposal-decorators",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-decorators"
          }
        },
        doExpressions: {
          syntax: {
            name: "@babel/plugin-syntax-do-expressions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-do-expressions"
          },
          transform: {
            name: "@babel/plugin-proposal-do-expressions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-do-expressions"
          }
        },
        dynamicImport: {
          syntax: {
            name: "@babel/plugin-syntax-dynamic-import",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-dynamic-import"
          }
        },
        exportDefaultFrom: {
          syntax: {
            name: "@babel/plugin-syntax-export-default-from",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-export-default-from"
          },
          transform: {
            name: "@babel/plugin-proposal-export-default-from",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-export-default-from"
          }
        },
        exportNamespaceFrom: {
          syntax: {
            name: "@babel/plugin-syntax-export-namespace-from",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-export-namespace-from"
          },
          transform: {
            name: "@babel/plugin-proposal-export-namespace-from",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-export-namespace-from"
          }
        },
        flow: {
          syntax: {
            name: "@babel/plugin-syntax-flow",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-flow"
          },
          transform: {
            name: "@babel/preset-flow",
            url: "https://github.com/babel/babel/tree/main/packages/babel-preset-flow"
          }
        },
        functionBind: {
          syntax: {
            name: "@babel/plugin-syntax-function-bind",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-function-bind"
          },
          transform: {
            name: "@babel/plugin-proposal-function-bind",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-function-bind"
          }
        },
        functionSent: {
          syntax: {
            name: "@babel/plugin-syntax-function-sent",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-function-sent"
          },
          transform: {
            name: "@babel/plugin-proposal-function-sent",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-function-sent"
          }
        },
        importMeta: {
          syntax: {
            name: "@babel/plugin-syntax-import-meta",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-import-meta"
          }
        },
        jsx: {
          syntax: {
            name: "@babel/plugin-syntax-jsx",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-jsx"
          },
          transform: {
            name: "@babel/preset-react",
            url: "https://github.com/babel/babel/tree/main/packages/babel-preset-react"
          }
        },
        importAssertions: {
          syntax: {
            name: "@babel/plugin-syntax-import-assertions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-import-assertions"
          }
        },
        moduleStringNames: {
          syntax: {
            name: "@babel/plugin-syntax-module-string-names",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-module-string-names"
          }
        },
        numericSeparator: {
          syntax: {
            name: "@babel/plugin-syntax-numeric-separator",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-numeric-separator"
          },
          transform: {
            name: "@babel/plugin-proposal-numeric-separator",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-numeric-separator"
          }
        },
        optionalChaining: {
          syntax: {
            name: "@babel/plugin-syntax-optional-chaining",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-optional-chaining"
          },
          transform: {
            name: "@babel/plugin-proposal-optional-chaining",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-optional-chaining"
          }
        },
        pipelineOperator: {
          syntax: {
            name: "@babel/plugin-syntax-pipeline-operator",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-pipeline-operator"
          },
          transform: {
            name: "@babel/plugin-proposal-pipeline-operator",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-pipeline-operator"
          }
        },
        privateIn: {
          syntax: {
            name: "@babel/plugin-syntax-private-property-in-object",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-private-property-in-object"
          },
          transform: {
            name: "@babel/plugin-proposal-private-property-in-object",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-private-property-in-object"
          }
        },
        recordAndTuple: {
          syntax: {
            name: "@babel/plugin-syntax-record-and-tuple",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-record-and-tuple"
          }
        },
        regexpUnicodeSets: {
          syntax: {
            name: "@babel/plugin-syntax-unicode-sets-regex",
            url: "https://github.com/babel/babel/blob/main/packages/babel-plugin-syntax-unicode-sets-regex/README.md"
          },
          transform: {
            name: "@babel/plugin-proposal-unicode-sets-regex",
            url: "https://github.com/babel/babel/blob/main/packages/babel-plugin-proposalunicode-sets-regex/README.md"
          }
        },
        throwExpressions: {
          syntax: {
            name: "@babel/plugin-syntax-throw-expressions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-throw-expressions"
          },
          transform: {
            name: "@babel/plugin-proposal-throw-expressions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-throw-expressions"
          }
        },
        typescript: {
          syntax: {
            name: "@babel/plugin-syntax-typescript",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-typescript"
          },
          transform: {
            name: "@babel/preset-typescript",
            url: "https://github.com/babel/babel/tree/main/packages/babel-preset-typescript"
          }
        },
        asyncGenerators: {
          syntax: {
            name: "@babel/plugin-syntax-async-generators",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-async-generators"
          },
          transform: {
            name: "@babel/plugin-proposal-async-generator-functions",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-async-generator-functions"
          }
        },
        logicalAssignment: {
          syntax: {
            name: "@babel/plugin-syntax-logical-assignment-operators",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-logical-assignment-operators"
          },
          transform: {
            name: "@babel/plugin-proposal-logical-assignment-operators",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-logical-assignment-operators"
          }
        },
        nullishCoalescingOperator: {
          syntax: {
            name: "@babel/plugin-syntax-nullish-coalescing-operator",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-nullish-coalescing-operator"
          },
          transform: {
            name: "@babel/plugin-proposal-nullish-coalescing-operator",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-nullish-coalescing-opearator"
          }
        },
        objectRestSpread: {
          syntax: {
            name: "@babel/plugin-syntax-object-rest-spread",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-object-rest-spread"
          },
          transform: {
            name: "@babel/plugin-proposal-object-rest-spread",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-object-rest-spread"
          }
        },
        optionalCatchBinding: {
          syntax: {
            name: "@babel/plugin-syntax-optional-catch-binding",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-optional-catch-binding"
          },
          transform: {
            name: "@babel/plugin-proposal-optional-catch-binding",
            url: "https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-optional-catch-binding"
          }
        }
      };
      pluginNameMap.privateIn.syntax = pluginNameMap.privateIn.transform;
      const getNameURLCombination = ({name, url}) => `${name} (${url})`;
    },
    6984: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function helpers() {
        const data = __webpack_require__(3466);
        return helpers = function() {
          return data;
        }, data;
      }
      function _generator() {
        const data = __webpack_require__(9166);
        return _generator = function() {
          return data;
        }, data;
      }
      function _template() {
        const data = __webpack_require__(4847);
        return _template = function() {
          return data;
        }, data;
      }
      function _t() {
        const data = __webpack_require__(7289);
        return _t = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(allowlist, outputType = "global") {
        let tree;
        const build = {
          global: buildGlobal,
          module: buildModule,
          umd: buildUmd,
          var: buildVar
        }[outputType];
        if (!build) throw new Error(`Unsupported output type ${outputType}`);
        tree = build(allowlist);
        return (0, _generator().default)(tree).code;
      };
      var _file = __webpack_require__(5212);
      const {arrayExpression, assignmentExpression, binaryExpression, blockStatement, callExpression, cloneNode, conditionalExpression, exportNamedDeclaration, exportSpecifier, expressionStatement, functionExpression, identifier, memberExpression, objectExpression, program, stringLiteral, unaryExpression, variableDeclaration, variableDeclarator} = _t();
      function buildGlobal(allowlist) {
        const namespace = identifier("babelHelpers"), body = [], container = functionExpression(null, [ identifier("global") ], blockStatement(body)), tree = program([ expressionStatement(callExpression(container, [ conditionalExpression(binaryExpression("===", unaryExpression("typeof", identifier("global")), stringLiteral("undefined")), identifier("self"), identifier("global")) ])) ]);
        return body.push(variableDeclaration("var", [ variableDeclarator(namespace, assignmentExpression("=", memberExpression(identifier("global"), namespace), objectExpression([]))) ])), 
        buildHelpers(body, namespace, allowlist), tree;
      }
      function buildModule(allowlist) {
        const body = [], refs = buildHelpers(body, null, allowlist);
        return body.unshift(exportNamedDeclaration(null, Object.keys(refs).map((name => exportSpecifier(cloneNode(refs[name]), identifier(name)))))), 
        program(body, [], "module");
      }
      function buildUmd(allowlist) {
        const namespace = identifier("babelHelpers"), body = [];
        return body.push(variableDeclaration("var", [ variableDeclarator(namespace, identifier("global")) ])), 
        buildHelpers(body, namespace, allowlist), program([ (replacements = {
          FACTORY_PARAMETERS: identifier("global"),
          BROWSER_ARGUMENTS: assignmentExpression("=", memberExpression(identifier("root"), namespace), objectExpression([])),
          COMMON_ARGUMENTS: identifier("exports"),
          AMD_ARGUMENTS: arrayExpression([ stringLiteral("exports") ]),
          FACTORY_BODY: body,
          UMD_ROOT: identifier("this")
        }, _template().default.statement`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(replacements)) ]);
        var replacements;
      }
      function buildVar(allowlist) {
        const namespace = identifier("babelHelpers"), body = [];
        body.push(variableDeclaration("var", [ variableDeclarator(namespace, objectExpression([])) ]));
        const tree = program(body);
        return buildHelpers(body, namespace, allowlist), body.push(expressionStatement(namespace)), 
        tree;
      }
      function buildHelpers(body, namespace, allowlist) {
        const getHelperReference = name => namespace ? memberExpression(namespace, identifier(name)) : identifier(`_${name}`), refs = {};
        return helpers().list.forEach((function(name) {
          if (allowlist && allowlist.indexOf(name) < 0) return;
          const ref = refs[name] = getHelperReference(name);
          helpers().ensure(name, _file.default);
          const {nodes} = helpers().get(name, getHelperReference, ref);
          body.push(...nodes);
        })), refs;
      }
    },
    3724: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.transformFromAstSync = exports.transformFromAstAsync = exports.transformFromAst = void 0;
      var _config = __webpack_require__(695), _transformation = __webpack_require__(1152);
      const transformFromAstRunner = _gensync()((function*(ast, code, opts) {
        const config = yield* (0, _config.default)(opts);
        if (null === config) return null;
        if (!ast) throw new Error("No AST given");
        return yield* (0, _transformation.run)(config, code, ast);
      }));
      exports.transformFromAst = function(ast, code, opts, callback) {
        if ("function" == typeof opts && (callback = opts, opts = void 0), void 0 === callback) return transformFromAstRunner.sync(ast, code, opts);
        transformFromAstRunner.errback(ast, code, opts, callback);
      };
      const transformFromAstSync = transformFromAstRunner.sync;
      exports.transformFromAstSync = transformFromAstSync;
      const transformFromAstAsync = transformFromAstRunner.async;
      exports.transformFromAstAsync = transformFromAstAsync;
    },
    2722: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.transformFileSync = exports.transformFileAsync = exports.transformFile = void 0;
      var _config = __webpack_require__(695), _transformation = __webpack_require__(1152), fs = __webpack_require__(2344);
      const transformFileRunner = _gensync()((function*(filename, opts) {
        const options = Object.assign({}, opts, {
          filename
        }), config = yield* (0, _config.default)(options);
        if (null === config) return null;
        const code = yield* fs.readFile(filename, "utf8");
        return yield* (0, _transformation.run)(config, code);
      })), transformFile = transformFileRunner.errback;
      exports.transformFile = transformFile;
      const transformFileSync = transformFileRunner.sync;
      exports.transformFileSync = transformFileSync;
      const transformFileAsync = transformFileRunner.async;
      exports.transformFileAsync = transformFileAsync;
    },
    4203: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.transformSync = exports.transformAsync = exports.transform = void 0;
      var _config = __webpack_require__(695), _transformation = __webpack_require__(1152);
      const transformRunner = _gensync()((function*(code, opts) {
        const config = yield* (0, _config.default)(opts);
        return null === config ? null : yield* (0, _transformation.run)(config, code);
      }));
      exports.transform = function(code, opts, callback) {
        if ("function" == typeof opts && (callback = opts, opts = void 0), void 0 === callback) return transformRunner.sync(code, opts);
        transformRunner.errback(code, opts, callback);
      };
      const transformSync = transformRunner.sync;
      exports.transformSync = transformSync;
      const transformAsync = transformRunner.async;
      exports.transformAsync = transformAsync;
    },
    3768: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _traverse() {
        const data = __webpack_require__(241);
        return _traverse = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function() {
        LOADED_PLUGIN || (LOADED_PLUGIN = new _plugin.default(Object.assign({}, blockHoistPlugin, {
          visitor: _traverse().default.explode(blockHoistPlugin.visitor)
        }), {}));
        return LOADED_PLUGIN;
      };
      var _plugin = __webpack_require__(424);
      let LOADED_PLUGIN;
      function priority(bodyNode) {
        const priority = null == bodyNode ? void 0 : bodyNode._blockHoist;
        return null == priority ? 1 : !0 === priority ? 2 : priority;
      }
      const blockHoistPlugin = {
        name: "internal.blockHoist",
        visitor: {
          Block: {
            exit({node}) {
              const {body} = node;
              let max = Math.pow(2, 30) - 1, hasChange = !1;
              for (let i = 0; i < body.length; i++) {
                const p = priority(body[i]);
                if (p > max) {
                  hasChange = !0;
                  break;
                }
                max = p;
              }
              hasChange && (node.body = function(body) {
                const buckets = Object.create(null);
                for (let i = 0; i < body.length; i++) {
                  const n = body[i], p = priority(n);
                  (buckets[p] || (buckets[p] = [])).push(n);
                }
                const keys = Object.keys(buckets).map((k => +k)).sort(((a, b) => b - a));
                let index = 0;
                for (const key of keys) {
                  const bucket = buckets[key];
                  for (const n of bucket) body[index++] = n;
                }
                return body;
              }(body.slice()));
            }
          }
        }
      };
    },
    5212: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function helpers() {
        const data = __webpack_require__(3466);
        return helpers = function() {
          return data;
        }, data;
      }
      function _traverse() {
        const data = __webpack_require__(241);
        return _traverse = function() {
          return data;
        }, data;
      }
      function _codeFrame() {
        const data = __webpack_require__(4709);
        return _codeFrame = function() {
          return data;
        }, data;
      }
      function _t() {
        const data = __webpack_require__(7289);
        return _t = function() {
          return data;
        }, data;
      }
      function _helperModuleTransforms() {
        const data = __webpack_require__(2454);
        return _helperModuleTransforms = function() {
          return data;
        }, data;
      }
      function _semver() {
        const data = __webpack_require__(6625);
        return _semver = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      const {cloneNode, interpreterDirective} = _t(), errorVisitor = {
        enter(path, state) {
          const loc = path.node.loc;
          loc && (state.loc = loc, path.stop());
        }
      };
      class File {
        constructor(options, {code, ast, inputMap}) {
          this._map = new Map, this.opts = void 0, this.declarations = {}, this.path = null, 
          this.ast = {}, this.scope = void 0, this.metadata = {}, this.code = "", this.inputMap = null, 
          this.hub = {
            file: this,
            getCode: () => this.code,
            getScope: () => this.scope,
            addHelper: this.addHelper.bind(this),
            buildError: this.buildCodeFrameError.bind(this)
          }, this.opts = options, this.code = code, this.ast = ast, this.inputMap = inputMap, 
          this.path = _traverse().NodePath.get({
            hub: this.hub,
            parentPath: null,
            parent: this.ast,
            container: this.ast,
            key: "program"
          }).setContext(), this.scope = this.path.scope;
        }
        get shebang() {
          const {interpreter} = this.path.node;
          return interpreter ? interpreter.value : "";
        }
        set shebang(value) {
          value ? this.path.get("interpreter").replaceWith(interpreterDirective(value)) : this.path.get("interpreter").remove();
        }
        set(key, val) {
          if ("helpersNamespace" === key) throw new Error("Babel 7.0.0-beta.56 has dropped support for the 'helpersNamespace' utility.If you are using @babel/plugin-external-helpers you will need to use a newer version than the one you currently have installed. If you have your own implementation, you'll want to explore using 'helperGenerator' alongside 'file.availableHelper()'.");
          this._map.set(key, val);
        }
        get(key) {
          return this._map.get(key);
        }
        has(key) {
          return this._map.has(key);
        }
        getModuleName() {
          return (0, _helperModuleTransforms().getModuleName)(this.opts, this.opts);
        }
        addImport() {
          throw new Error("This API has been removed. If you're looking for this functionality in Babel 7, you should import the '@babel/helper-module-imports' module and use the functions exposed  from that module, such as 'addNamed' or 'addDefault'.");
        }
        availableHelper(name, versionRange) {
          let minVersion;
          try {
            minVersion = helpers().minVersion(name);
          } catch (err) {
            if ("BABEL_HELPER_UNKNOWN" !== err.code) throw err;
            return !1;
          }
          return "string" != typeof versionRange || (_semver().valid(versionRange) && (versionRange = `^${versionRange}`), 
          !_semver().intersects(`<${minVersion}`, versionRange) && !_semver().intersects(">=8.0.0", versionRange));
        }
        addHelper(name) {
          const declar = this.declarations[name];
          if (declar) return cloneNode(declar);
          const generator = this.get("helperGenerator");
          if (generator) {
            const res = generator(name);
            if (res) return res;
          }
          helpers().ensure(name, File);
          const uid = this.declarations[name] = this.scope.generateUidIdentifier(name), dependencies = {};
          for (const dep of helpers().getDependencies(name)) dependencies[dep] = this.addHelper(dep);
          const {nodes, globals} = helpers().get(name, (dep => dependencies[dep]), uid, Object.keys(this.scope.getAllBindings()));
          return globals.forEach((name => {
            this.path.scope.hasBinding(name, !0) && this.path.scope.rename(name);
          })), nodes.forEach((node => {
            node._compact = !0;
          })), this.path.unshiftContainer("body", nodes), this.path.get("body").forEach((path => {
            -1 !== nodes.indexOf(path.node) && path.isVariableDeclaration() && this.scope.registerDeclaration(path);
          })), uid;
        }
        addTemplateObject() {
          throw new Error("This function has been moved into the template literal transform itself.");
        }
        buildCodeFrameError(node, msg, _Error = SyntaxError) {
          let loc = node && (node.loc || node._loc);
          if (!loc && node) {
            const state = {
              loc: null
            };
            (0, _traverse().default)(node, errorVisitor, this.scope, state), loc = state.loc;
            let txt = "This is an error on an internal node. Probably an internal error.";
            loc && (txt += " Location has been estimated."), msg += ` (${txt})`;
          }
          if (loc) {
            const {highlightCode = !0} = this.opts;
            msg += "\n" + (0, _codeFrame().codeFrameColumns)(this.code, {
              start: {
                line: loc.start.line,
                column: loc.start.column + 1
              },
              end: loc.end && loc.start.line === loc.end.line ? {
                line: loc.end.line,
                column: loc.end.column + 1
              } : void 0
            }, {
              highlightCode
            });
          }
          return new _Error(msg);
        }
      }
      exports.default = File;
    },
    494: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _convertSourceMap() {
        const data = __webpack_require__(3514);
        return _convertSourceMap = function() {
          return data;
        }, data;
      }
      function _generator() {
        const data = __webpack_require__(9166);
        return _generator = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(pluginPasses, file) {
        const {opts, ast, code, inputMap} = file, {generatorOpts} = opts, results = [];
        for (const plugins of pluginPasses) for (const plugin of plugins) {
          const {generatorOverride} = plugin;
          if (generatorOverride) {
            const result = generatorOverride(ast, generatorOpts, code, _generator().default);
            void 0 !== result && results.push(result);
          }
        }
        let result;
        if (0 === results.length) result = (0, _generator().default)(ast, generatorOpts, code); else {
          if (1 !== results.length) throw new Error("More than one plugin attempted to override codegen.");
          if (result = results[0], "function" == typeof result.then) throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
        }
        let {code: outputCode, decodedMap: outputMap = result.map} = result;
        outputMap && (outputMap = inputMap ? (0, _mergeMap.default)(inputMap.toObject(), outputMap, generatorOpts.sourceFileName) : result.map);
        "inline" !== opts.sourceMaps && "both" !== opts.sourceMaps || (outputCode += "\n" + _convertSourceMap().fromObject(outputMap).toComment());
        "inline" === opts.sourceMaps && (outputMap = null);
        return {
          outputCode,
          outputMap
        };
      };
      var _mergeMap = __webpack_require__(4302);
    },
    4302: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _remapping() {
        const data = __webpack_require__(1797);
        return _remapping = function() {
          return data;
        }, data;
      }
      function rootless(map) {
        return Object.assign({}, map, {
          sourceRoot: null
        });
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(inputMap, map, sourceFileName) {
        const source = sourceFileName.replace(/\\/g, "/");
        let found = !1;
        const result = _remapping()(rootless(map), ((s, ctx) => s !== source || found ? null : (found = !0, 
        ctx.source = "", rootless(inputMap))));
        "string" == typeof inputMap.sourceRoot && (result.sourceRoot = inputMap.sourceRoot);
        return Object.assign({}, result);
      };
    },
    1152: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _traverse() {
        const data = __webpack_require__(241);
        return _traverse = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.run = function*(config, code, ast) {
        const file = yield* (0, _normalizeFile.default)(config.passes, (0, _normalizeOpts.default)(config), code, ast), opts = file.opts;
        try {
          yield* function*(file, pluginPasses) {
            for (const pluginPairs of pluginPasses) {
              const passPairs = [], passes = [], visitors = [];
              for (const plugin of pluginPairs.concat([ (0, _blockHoistPlugin.default)() ])) {
                const pass = new _pluginPass.default(file, plugin.key, plugin.options);
                passPairs.push([ plugin, pass ]), passes.push(pass), visitors.push(plugin.visitor);
              }
              for (const [plugin, pass] of passPairs) {
                const fn = plugin.pre;
                if (fn) {
                  const result = fn.call(pass, file);
                  if (yield* [], isThenable(result)) throw new Error("You appear to be using an plugin with an async .pre, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
                }
              }
              const visitor = _traverse().default.visitors.merge(visitors, passes, file.opts.wrapPluginVisitorMethod);
              (0, _traverse().default)(file.ast, visitor, file.scope);
              for (const [plugin, pass] of passPairs) {
                const fn = plugin.post;
                if (fn) {
                  const result = fn.call(pass, file);
                  if (yield* [], isThenable(result)) throw new Error("You appear to be using an plugin with an async .post, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
                }
              }
            }
          }(file, config.passes);
        } catch (e) {
          var _opts$filename;
          throw e.message = `${null != (_opts$filename = opts.filename) ? _opts$filename : "unknown"}: ${e.message}`, 
          e.code || (e.code = "BABEL_TRANSFORM_ERROR"), e;
        }
        let outputCode, outputMap;
        try {
          !1 !== opts.code && ({outputCode, outputMap} = (0, _generate.default)(config.passes, file));
        } catch (e) {
          var _opts$filename2;
          throw e.message = `${null != (_opts$filename2 = opts.filename) ? _opts$filename2 : "unknown"}: ${e.message}`, 
          e.code || (e.code = "BABEL_GENERATE_ERROR"), e;
        }
        return {
          metadata: file.metadata,
          options: opts,
          ast: !0 === opts.ast ? file.ast : null,
          code: void 0 === outputCode ? null : outputCode,
          map: void 0 === outputMap ? null : outputMap,
          sourceType: file.ast.program.sourceType,
          externalDependencies: (0, _deepArray.flattenToSet)(config.externalDependencies)
        };
      };
      var _pluginPass = __webpack_require__(5889), _blockHoistPlugin = __webpack_require__(3768), _normalizeOpts = __webpack_require__(7331), _normalizeFile = __webpack_require__(104), _generate = __webpack_require__(494), _deepArray = __webpack_require__(2853);
      function isThenable(val) {
        return !(!val || "object" != typeof val && "function" != typeof val || !val.then || "function" != typeof val.then);
      }
    },
    104: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _fs() {
        const data = __webpack_require__(7147);
        return _fs = function() {
          return data;
        }, data;
      }
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _debug() {
        const data = __webpack_require__(5158);
        return _debug = function() {
          return data;
        }, data;
      }
      function _t() {
        const data = __webpack_require__(7289);
        return _t = function() {
          return data;
        }, data;
      }
      function _convertSourceMap() {
        const data = __webpack_require__(3514);
        return _convertSourceMap = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function*(pluginPasses, options, code, ast) {
        if (code = `${code || ""}`, ast) {
          if ("Program" === ast.type) ast = file(ast, [], []); else if ("File" !== ast.type) throw new Error("AST root must be a Program or File node");
          options.cloneInputAst && (ast = (0, _cloneDeep.default)(ast));
        } else ast = yield* (0, _parser.default)(pluginPasses, options, code);
        let inputMap = null;
        if (!1 !== options.inputSourceMap) {
          if ("object" == typeof options.inputSourceMap && (inputMap = _convertSourceMap().fromObject(options.inputSourceMap)), 
          !inputMap) {
            const lastComment = extractComments(INLINE_SOURCEMAP_REGEX, ast);
            if (lastComment) try {
              inputMap = _convertSourceMap().fromComment(lastComment);
            } catch (err) {
              debug("discarding unknown inline input sourcemap", err);
            }
          }
          if (!inputMap) {
            const lastComment = extractComments(EXTERNAL_SOURCEMAP_REGEX, ast);
            if ("string" == typeof options.filename && lastComment) try {
              const match = EXTERNAL_SOURCEMAP_REGEX.exec(lastComment), inputMapContent = _fs().readFileSync(_path().resolve(_path().dirname(options.filename), match[1]));
              inputMapContent.length > 1e6 ? debug("skip merging input map > 1 MB") : inputMap = _convertSourceMap().fromJSON(inputMapContent);
            } catch (err) {
              debug("discarding unknown file input sourcemap", err);
            } else lastComment && debug("discarding un-loadable file input sourcemap");
          }
        }
        return new _file.default(options, {
          code,
          ast,
          inputMap
        });
      };
      var _file = __webpack_require__(5212), _parser = __webpack_require__(3596), _cloneDeep = __webpack_require__(9618);
      const {file, traverseFast} = _t(), debug = _debug()("babel:transform:file");
      const INLINE_SOURCEMAP_REGEX = /^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/, EXTERNAL_SOURCEMAP_REGEX = /^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;
      function extractCommentsFromList(regex, comments, lastComment) {
        return comments && (comments = comments.filter((({value}) => !regex.test(value) || (lastComment = value, 
        !1)))), [ comments, lastComment ];
      }
      function extractComments(regex, ast) {
        let lastComment = null;
        return traverseFast(ast, (node => {
          [node.leadingComments, lastComment] = extractCommentsFromList(regex, node.leadingComments, lastComment), 
          [node.innerComments, lastComment] = extractCommentsFromList(regex, node.innerComments, lastComment), 
          [node.trailingComments, lastComment] = extractCommentsFromList(regex, node.trailingComments, lastComment);
        })), lastComment;
      }
    },
    7331: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(config) {
        const {filename, cwd, filenameRelative = "string" == typeof filename ? _path().relative(cwd, filename) : "unknown", sourceType = "module", inputSourceMap, sourceMaps = !!inputSourceMap, sourceRoot = config.options.moduleRoot, sourceFileName = _path().basename(filenameRelative), comments = !0, compact = "auto"} = config.options, opts = config.options, options = Object.assign({}, opts, {
          parserOpts: Object.assign({
            sourceType: ".mjs" === _path().extname(filenameRelative) ? "module" : sourceType,
            sourceFileName: filename,
            plugins: []
          }, opts.parserOpts),
          generatorOpts: Object.assign({
            filename,
            auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
            auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
            retainLines: opts.retainLines,
            comments,
            shouldPrintComment: opts.shouldPrintComment,
            compact,
            minified: opts.minified,
            sourceMaps,
            sourceRoot,
            sourceFileName
          }, opts.generatorOpts)
        });
        for (const plugins of config.passes) for (const plugin of plugins) plugin.manipulateOptions && plugin.manipulateOptions(options, options.parserOpts);
        return options;
      };
    },
    5889: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      class PluginPass {
        constructor(file, key, options) {
          this._map = new Map, this.key = void 0, this.file = void 0, this.opts = void 0, 
          this.cwd = void 0, this.filename = void 0, this.key = key, this.file = file, this.opts = options || {}, 
          this.cwd = file.opts.cwd, this.filename = file.opts.filename;
        }
        set(key, val) {
          this._map.set(key, val);
        }
        get(key) {
          return this._map.get(key);
        }
        availableHelper(name, versionRange) {
          return this.file.availableHelper(name, versionRange);
        }
        addHelper(name) {
          return this.file.addHelper(name);
        }
        addImport() {
          return this.file.addImport();
        }
        buildCodeFrameError(node, msg, _Error) {
          return this.file.buildCodeFrameError(node, msg, _Error);
        }
      }
      exports.default = PluginPass, PluginPass.prototype.getModuleName = function() {
        return this.file.getModuleName();
      };
    },
    7765: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(value) {
        return JSON.parse(JSON.stringify(value, serialize), revive);
      };
      const serialized = "$$ babel internal serialized type" + Math.random();
      function serialize(key, value) {
        return "bigint" != typeof value ? value : {
          [serialized]: "BigInt",
          value: value.toString()
        };
      }
      function revive(key, value) {
        return value && "object" == typeof value ? "BigInt" !== value[serialized] ? value : BigInt(value.value) : value;
      }
    },
    9618: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _v() {
        const data = __webpack_require__(4655);
        return _v = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(value) {
        if (_v().deserialize && _v().serialize) return _v().deserialize(_v().serialize(value));
        return (0, _cloneDeepBrowser.default)(value);
      };
      var _cloneDeepBrowser = __webpack_require__(7765);
    },
    7674: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _url() {
        const data = __webpack_require__(7310);
        return _url = function() {
          return data;
        }, data;
      }
      function _fs() {
        const data = function(obj, nodeInterop) {
          if (!nodeInterop && obj && obj.__esModule) return obj;
          if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
            default: obj
          };
          var cache = _getRequireWildcardCache(nodeInterop);
          if (cache && cache.has(obj)) return cache.get(obj);
          var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var key in obj) if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
          }
          newObj.default = obj, cache && cache.set(obj, newObj);
          return newObj;
        }(__webpack_require__(7147), !0);
        return _fs = function() {
          return data;
        }, data;
      }
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _assert() {
        const data = __webpack_require__(9491);
        return _assert = function() {
          return data;
        }, data;
      }
      function _util() {
        const data = __webpack_require__(3837);
        return _util = function() {
          return data;
        }, data;
      }
      function _getRequireWildcardCache(nodeInterop) {
        if ("function" != typeof WeakMap) return null;
        var cacheBabelInterop = new WeakMap, cacheNodeInterop = new WeakMap;
        return (_getRequireWildcardCache = function(nodeInterop) {
          return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg), value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self = this, args = arguments;
          return new Promise((function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          }));
        };
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.moduleResolve = moduleResolve, exports.resolve = function(_x, _x2) {
        return _resolve.apply(this, arguments);
      };
      var re$3 = {
        exports: {}
      };
      var constants = {
        SEMVER_SPEC_VERSION: "2.0.0",
        MAX_LENGTH: 256,
        MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991,
        MAX_SAFE_COMPONENT_LENGTH: 16
      };
      var debug_1 = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
      !function(module, exports) {
        const {MAX_SAFE_COMPONENT_LENGTH} = constants, debug = debug_1, re = (exports = module.exports = {}).re = [], src = exports.src = [], t = exports.t = {};
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
        createToken("STAR", "(<|>)?=?\\s*\\*"), createToken("GTE0", "^\\s*>=\\s*0.0.0\\s*$"), 
        createToken("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
      }(re$3, re$3.exports);
      const opts = [ "includePrerelease", "loose", "rtl" ];
      var parseOptions_1 = options => options ? "object" != typeof options ? {
        loose: !0
      } : opts.filter((k => options[k])).reduce(((options, k) => (options[k] = !0, options)), {}) : {};
      const numeric = /^[0-9]+$/, compareIdentifiers$1 = (a, b) => {
        const anum = numeric.test(a), bnum = numeric.test(b);
        return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      };
      var identifiers = {
        compareIdentifiers: compareIdentifiers$1,
        rcompareIdentifiers: (a, b) => compareIdentifiers$1(b, a)
      };
      const debug = debug_1, {MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER} = constants, {re: re$2, t: t$2} = re$3.exports, parseOptions$1 = parseOptions_1, {compareIdentifiers} = identifiers;
      class SemVer$c {
        constructor(version, options) {
          if (options = parseOptions$1(options), version instanceof SemVer$c) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
            version = version.version;
          } else if ("string" != typeof version) throw new TypeError(`Invalid Version: ${version}`);
          if (version.length > MAX_LENGTH$1) throw new TypeError(`version is longer than ${MAX_LENGTH$1} characters`);
          debug("SemVer", version, options), this.options = options, this.loose = !!options.loose, 
          this.includePrerelease = !!options.includePrerelease;
          const m = version.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL]);
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
          if (debug("SemVer.compare", this.version, this.options, other), !(other instanceof SemVer$c)) {
            if ("string" == typeof other && other === this.version) return 0;
            other = new SemVer$c(other, this.options);
          }
          return other.version === this.version ? 0 : this.compareMain(other) || this.comparePre(other);
        }
        compareMain(other) {
          return other instanceof SemVer$c || (other = new SemVer$c(other, this.options)), 
          compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        }
        comparePre(other) {
          if (other instanceof SemVer$c || (other = new SemVer$c(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
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
          other instanceof SemVer$c || (other = new SemVer$c(other, this.options));
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
      var semver$2 = SemVer$c;
      const {MAX_LENGTH} = constants, {re: re$1, t: t$1} = re$3.exports, SemVer$b = semver$2, parseOptions = parseOptions_1;
      var parse_1 = (version, options) => {
        if (options = parseOptions(options), version instanceof SemVer$b) return version;
        if ("string" != typeof version) return null;
        if (version.length > MAX_LENGTH) return null;
        if (!(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]).test(version)) return null;
        try {
          return new SemVer$b(version, options);
        } catch (er) {
          return null;
        }
      };
      const parse$4 = parse_1;
      var valid_1 = (version, options) => {
        const v = parse$4(version, options);
        return v ? v.version : null;
      };
      const parse$3 = parse_1;
      var clean_1 = (version, options) => {
        const s = parse$3(version.trim().replace(/^[=v]+/, ""), options);
        return s ? s.version : null;
      };
      const SemVer$a = semver$2;
      var inc_1 = (version, release, options, identifier) => {
        "string" == typeof options && (identifier = options, options = void 0);
        try {
          return new SemVer$a(version, options).inc(release, identifier).version;
        } catch (er) {
          return null;
        }
      };
      const SemVer$9 = semver$2;
      var compare_1 = (a, b, loose) => new SemVer$9(a, loose).compare(new SemVer$9(b, loose));
      const compare$9 = compare_1;
      var eq_1 = (a, b, loose) => 0 === compare$9(a, b, loose);
      const parse$2 = parse_1, eq$1 = eq_1;
      var diff_1 = (version1, version2) => {
        if (eq$1(version1, version2)) return null;
        {
          const v1 = parse$2(version1), v2 = parse$2(version2), hasPre = v1.prerelease.length || v2.prerelease.length, prefix = hasPre ? "pre" : "", defaultResult = hasPre ? "prerelease" : "";
          for (const key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return prefix + key;
          return defaultResult;
        }
      };
      const SemVer$8 = semver$2;
      var major_1 = (a, loose) => new SemVer$8(a, loose).major;
      const SemVer$7 = semver$2;
      var minor_1 = (a, loose) => new SemVer$7(a, loose).minor;
      const SemVer$6 = semver$2;
      var patch_1 = (a, loose) => new SemVer$6(a, loose).patch;
      const parse$1 = parse_1;
      var prerelease_1 = (version, options) => {
        const parsed = parse$1(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      };
      const compare$8 = compare_1;
      var rcompare_1 = (a, b, loose) => compare$8(b, a, loose);
      const compare$7 = compare_1;
      var compareLoose_1 = (a, b) => compare$7(a, b, !0);
      const SemVer$5 = semver$2;
      var compareBuild_1 = (a, b, loose) => {
        const versionA = new SemVer$5(a, loose), versionB = new SemVer$5(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      };
      const compareBuild$1 = compareBuild_1;
      var sort_1 = (list, loose) => list.sort(((a, b) => compareBuild$1(a, b, loose)));
      const compareBuild = compareBuild_1;
      var rsort_1 = (list, loose) => list.sort(((a, b) => compareBuild(b, a, loose)));
      const compare$6 = compare_1;
      var gt_1 = (a, b, loose) => compare$6(a, b, loose) > 0;
      const compare$5 = compare_1;
      var lt_1 = (a, b, loose) => compare$5(a, b, loose) < 0;
      const compare$4 = compare_1;
      var neq_1 = (a, b, loose) => 0 !== compare$4(a, b, loose);
      const compare$3 = compare_1;
      var gte_1 = (a, b, loose) => compare$3(a, b, loose) >= 0;
      const compare$2 = compare_1;
      var lte_1 = (a, b, loose) => compare$2(a, b, loose) <= 0;
      const eq = eq_1, neq = neq_1, gt$2 = gt_1, gte$1 = gte_1, lt$1 = lt_1, lte$1 = lte_1;
      var cmp_1 = (a, op, b, loose) => {
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
          return gt$2(a, b, loose);

         case ">=":
          return gte$1(a, b, loose);

         case "<":
          return lt$1(a, b, loose);

         case "<=":
          return lte$1(a, b, loose);

         default:
          throw new TypeError(`Invalid operator: ${op}`);
        }
      };
      const SemVer$4 = semver$2, parse = parse_1, {re, t} = re$3.exports;
      var iterator, hasRequiredIterator, yallist, hasRequiredYallist, lruCache, hasRequiredLruCache, range, hasRequiredRange, comparator, hasRequiredComparator, coerce_1 = (version, options) => {
        if (version instanceof SemVer$4) return version;
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
      function requireYallist() {
        if (hasRequiredYallist) return yallist;
        function Yallist(list) {
          var self = this;
          if (self instanceof Yallist || (self = new Yallist), self.tail = null, self.head = null, 
          self.length = 0, list && "function" == typeof list.forEach) list.forEach((function(item) {
            self.push(item);
          })); else if (arguments.length > 0) for (var i = 0, l = arguments.length; i < l; i++) self.push(arguments[i]);
          return self;
        }
        function insert(self, node, value) {
          var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
          return null === inserted.next && (self.tail = inserted), null === inserted.prev && (self.head = inserted), 
          self.length++, inserted;
        }
        function push(self, item) {
          self.tail = new Node(item, self.tail, null, self), self.head || (self.head = self.tail), 
          self.length++;
        }
        function unshift(self, item) {
          self.head = new Node(item, null, self.head, self), self.tail || (self.tail = self.head), 
          self.length++;
        }
        function Node(value, prev, next, list) {
          if (!(this instanceof Node)) return new Node(value, prev, next, list);
          this.list = list, this.value = value, prev ? (prev.next = this, this.prev = prev) : this.prev = null, 
          next ? (next.prev = this, this.next = next) : this.next = null;
        }
        hasRequiredYallist = 1, yallist = Yallist, Yallist.Node = Node, Yallist.create = Yallist, 
        Yallist.prototype.removeNode = function(node) {
          if (node.list !== this) throw new Error("removing node which does not belong to this list");
          var next = node.next, prev = node.prev;
          return next && (next.prev = prev), prev && (prev.next = next), node === this.head && (this.head = next), 
          node === this.tail && (this.tail = prev), node.list.length--, node.next = null, 
          node.prev = null, node.list = null, next;
        }, Yallist.prototype.unshiftNode = function(node) {
          if (node !== this.head) {
            node.list && node.list.removeNode(node);
            var head = this.head;
            node.list = this, node.next = head, head && (head.prev = node), this.head = node, 
            this.tail || (this.tail = node), this.length++;
          }
        }, Yallist.prototype.pushNode = function(node) {
          if (node !== this.tail) {
            node.list && node.list.removeNode(node);
            var tail = this.tail;
            node.list = this, node.prev = tail, tail && (tail.next = node), this.tail = node, 
            this.head || (this.head = node), this.length++;
          }
        }, Yallist.prototype.push = function() {
          for (var i = 0, l = arguments.length; i < l; i++) push(this, arguments[i]);
          return this.length;
        }, Yallist.prototype.unshift = function() {
          for (var i = 0, l = arguments.length; i < l; i++) unshift(this, arguments[i]);
          return this.length;
        }, Yallist.prototype.pop = function() {
          if (this.tail) {
            var res = this.tail.value;
            return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, 
            this.length--, res;
          }
        }, Yallist.prototype.shift = function() {
          if (this.head) {
            var res = this.head.value;
            return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, 
            this.length--, res;
          }
        }, Yallist.prototype.forEach = function(fn, thisp) {
          thisp = thisp || this;
          for (var walker = this.head, i = 0; null !== walker; i++) fn.call(thisp, walker.value, i, this), 
          walker = walker.next;
        }, Yallist.prototype.forEachReverse = function(fn, thisp) {
          thisp = thisp || this;
          for (var walker = this.tail, i = this.length - 1; null !== walker; i--) fn.call(thisp, walker.value, i, this), 
          walker = walker.prev;
        }, Yallist.prototype.get = function(n) {
          for (var i = 0, walker = this.head; null !== walker && i < n; i++) walker = walker.next;
          if (i === n && null !== walker) return walker.value;
        }, Yallist.prototype.getReverse = function(n) {
          for (var i = 0, walker = this.tail; null !== walker && i < n; i++) walker = walker.prev;
          if (i === n && null !== walker) return walker.value;
        }, Yallist.prototype.map = function(fn, thisp) {
          thisp = thisp || this;
          for (var res = new Yallist, walker = this.head; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
          walker = walker.next;
          return res;
        }, Yallist.prototype.mapReverse = function(fn, thisp) {
          thisp = thisp || this;
          for (var res = new Yallist, walker = this.tail; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
          walker = walker.prev;
          return res;
        }, Yallist.prototype.reduce = function(fn, initial) {
          var acc, walker = this.head;
          if (arguments.length > 1) acc = initial; else {
            if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
            walker = this.head.next, acc = this.head.value;
          }
          for (var i = 0; null !== walker; i++) acc = fn(acc, walker.value, i), walker = walker.next;
          return acc;
        }, Yallist.prototype.reduceReverse = function(fn, initial) {
          var acc, walker = this.tail;
          if (arguments.length > 1) acc = initial; else {
            if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
            walker = this.tail.prev, acc = this.tail.value;
          }
          for (var i = this.length - 1; null !== walker; i--) acc = fn(acc, walker.value, i), 
          walker = walker.prev;
          return acc;
        }, Yallist.prototype.toArray = function() {
          for (var arr = new Array(this.length), i = 0, walker = this.head; null !== walker; i++) arr[i] = walker.value, 
          walker = walker.next;
          return arr;
        }, Yallist.prototype.toArrayReverse = function() {
          for (var arr = new Array(this.length), i = 0, walker = this.tail; null !== walker; i++) arr[i] = walker.value, 
          walker = walker.prev;
          return arr;
        }, Yallist.prototype.slice = function(from, to) {
          (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
          var ret = new Yallist;
          if (to < from || to < 0) return ret;
          from < 0 && (from = 0), to > this.length && (to = this.length);
          for (var i = 0, walker = this.head; null !== walker && i < from; i++) walker = walker.next;
          for (;null !== walker && i < to; i++, walker = walker.next) ret.push(walker.value);
          return ret;
        }, Yallist.prototype.sliceReverse = function(from, to) {
          (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
          var ret = new Yallist;
          if (to < from || to < 0) return ret;
          from < 0 && (from = 0), to > this.length && (to = this.length);
          for (var i = this.length, walker = this.tail; null !== walker && i > to; i--) walker = walker.prev;
          for (;null !== walker && i > from; i--, walker = walker.prev) ret.push(walker.value);
          return ret;
        }, Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
          start > this.length && (start = this.length - 1), start < 0 && (start = this.length + start);
          for (var i = 0, walker = this.head; null !== walker && i < start; i++) walker = walker.next;
          var ret = [];
          for (i = 0; walker && i < deleteCount; i++) ret.push(walker.value), walker = this.removeNode(walker);
          null === walker && (walker = this.tail), walker !== this.head && walker !== this.tail && (walker = walker.prev);
          for (i = 0; i < nodes.length; i++) walker = insert(this, walker, nodes[i]);
          return ret;
        }, Yallist.prototype.reverse = function() {
          for (var head = this.head, tail = this.tail, walker = head; null !== walker; walker = walker.prev) {
            var p = walker.prev;
            walker.prev = walker.next, walker.next = p;
          }
          return this.head = tail, this.tail = head, this;
        };
        try {
          (hasRequiredIterator ? iterator : (hasRequiredIterator = 1, iterator = function(Yallist) {
            Yallist.prototype[Symbol.iterator] = function*() {
              for (let walker = this.head; walker; walker = walker.next) yield walker.value;
            };
          }))(Yallist);
        } catch (er) {}
        return yallist;
      }
      function requireRange() {
        if (hasRequiredRange) return range;
        hasRequiredRange = 1;
        class Range {
          constructor(range, options) {
            if (options = parseOptions(options), range instanceof Range) return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new Range(range.raw, options);
            if (range instanceof Comparator) return this.raw = range.value, this.set = [ [ range ] ], 
            this.format(), this;
            if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, 
            this.raw = range, this.set = range.split(/\s*\|\|\s*/).map((range => this.parseRange(range.trim()))).filter((c => c.length)), 
            !this.set.length) throw new TypeError(`Invalid SemVer Range: ${range}`);
            if (this.set.length > 1) {
              const first = this.set[0];
              if (this.set = this.set.filter((c => !isNullSet(c[0]))), 0 === this.set.length) this.set = [ first ]; else if (this.set.length > 1) for (const c of this.set) if (1 === c.length && isAny(c[0])) {
                this.set = [ c ];
                break;
              }
            }
            this.format();
          }
          format() {
            return this.range = this.set.map((comps => comps.join(" ").trim())).join("||").trim(), 
            this.range;
          }
          toString() {
            return this.range;
          }
          parseRange(range) {
            range = range.trim();
            const memoKey = `parseRange:${Object.keys(this.options).join(",")}:${range}`, cached = cache.get(memoKey);
            if (cached) return cached;
            const loose = this.options.loose, hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
            range = range.replace(hr, hyphenReplace(this.options.includePrerelease)), debug("hyphen replace", range), 
            range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace), debug("comparator trim", range, re[t.COMPARATORTRIM]), 
            range = (range = (range = range.replace(re[t.TILDETRIM], tildeTrimReplace)).replace(re[t.CARETTRIM], caretTrimReplace)).split(/\s+/).join(" ");
            const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], rangeList = range.split(" ").map((comp => parseComparator(comp, this.options))).join(" ").split(/\s+/).map((comp => replaceGTE0(comp, this.options))).filter(this.options.loose ? comp => !!comp.match(compRe) : () => !0).map((comp => new Comparator(comp, this.options)));
            rangeList.length;
            const rangeMap = new Map;
            for (const comp of rangeList) {
              if (isNullSet(comp)) return [ comp ];
              rangeMap.set(comp.value, comp);
            }
            rangeMap.size > 1 && rangeMap.has("") && rangeMap.delete("");
            const result = [ ...rangeMap.values() ];
            return cache.set(memoKey, result), result;
          }
          intersects(range, options) {
            if (!(range instanceof Range)) throw new TypeError("a Range is required");
            return this.set.some((thisComparators => isSatisfiable(thisComparators, options) && range.set.some((rangeComparators => isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator => rangeComparators.every((rangeComparator => thisComparator.intersects(rangeComparator, options)))))))));
          }
          test(version) {
            if (!version) return !1;
            if ("string" == typeof version) try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return !1;
            }
            for (let i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return !0;
            return !1;
          }
        }
        range = Range;
        const LRU = function() {
          if (hasRequiredLruCache) return lruCache;
          hasRequiredLruCache = 1;
          const Yallist = requireYallist(), MAX = Symbol("max"), LENGTH = Symbol("length"), LENGTH_CALCULATOR = Symbol("lengthCalculator"), ALLOW_STALE = Symbol("allowStale"), MAX_AGE = Symbol("maxAge"), DISPOSE = Symbol("dispose"), NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet"), LRU_LIST = Symbol("lruList"), CACHE = Symbol("cache"), UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet"), naiveLength = () => 1, get = (self, key, doUse) => {
            const node = self[CACHE].get(key);
            if (node) {
              const hit = node.value;
              if (isStale(self, hit)) {
                if (del(self, node), !self[ALLOW_STALE]) return;
              } else doUse && (self[UPDATE_AGE_ON_GET] && (node.value.now = Date.now()), self[LRU_LIST].unshiftNode(node));
              return hit.value;
            }
          }, isStale = (self, hit) => {
            if (!hit || !hit.maxAge && !self[MAX_AGE]) return !1;
            const diff = Date.now() - hit.now;
            return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
          }, trim = self => {
            if (self[LENGTH] > self[MAX]) for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && null !== walker; ) {
              const prev = walker.prev;
              del(self, walker), walker = prev;
            }
          }, del = (self, node) => {
            if (node) {
              const hit = node.value;
              self[DISPOSE] && self[DISPOSE](hit.key, hit.value), self[LENGTH] -= hit.length, 
              self[CACHE].delete(hit.key), self[LRU_LIST].removeNode(node);
            }
          };
          class Entry {
            constructor(key, value, length, now, maxAge) {
              this.key = key, this.value = value, this.length = length, this.now = now, this.maxAge = maxAge || 0;
            }
          }
          const forEachStep = (self, fn, node, thisp) => {
            let hit = node.value;
            isStale(self, hit) && (del(self, node), self[ALLOW_STALE] || (hit = void 0)), hit && fn.call(thisp, hit.value, hit.key, self);
          };
          return lruCache = class {
            constructor(options) {
              if ("number" == typeof options && (options = {
                max: options
              }), options || (options = {}), options.max && ("number" != typeof options.max || options.max < 0)) throw new TypeError("max must be a non-negative number");
              this[MAX] = options.max || 1 / 0;
              const lc = options.length || naiveLength;
              if (this[LENGTH_CALCULATOR] = "function" != typeof lc ? naiveLength : lc, this[ALLOW_STALE] = options.stale || !1, 
              options.maxAge && "number" != typeof options.maxAge) throw new TypeError("maxAge must be a number");
              this[MAX_AGE] = options.maxAge || 0, this[DISPOSE] = options.dispose, this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || !1, 
              this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || !1, this.reset();
            }
            set max(mL) {
              if ("number" != typeof mL || mL < 0) throw new TypeError("max must be a non-negative number");
              this[MAX] = mL || 1 / 0, trim(this);
            }
            get max() {
              return this[MAX];
            }
            set allowStale(allowStale) {
              this[ALLOW_STALE] = !!allowStale;
            }
            get allowStale() {
              return this[ALLOW_STALE];
            }
            set maxAge(mA) {
              if ("number" != typeof mA) throw new TypeError("maxAge must be a non-negative number");
              this[MAX_AGE] = mA, trim(this);
            }
            get maxAge() {
              return this[MAX_AGE];
            }
            set lengthCalculator(lC) {
              "function" != typeof lC && (lC = naiveLength), lC !== this[LENGTH_CALCULATOR] && (this[LENGTH_CALCULATOR] = lC, 
              this[LENGTH] = 0, this[LRU_LIST].forEach((hit => {
                hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key), this[LENGTH] += hit.length;
              }))), trim(this);
            }
            get lengthCalculator() {
              return this[LENGTH_CALCULATOR];
            }
            get length() {
              return this[LENGTH];
            }
            get itemCount() {
              return this[LRU_LIST].length;
            }
            rforEach(fn, thisp) {
              thisp = thisp || this;
              for (let walker = this[LRU_LIST].tail; null !== walker; ) {
                const prev = walker.prev;
                forEachStep(this, fn, walker, thisp), walker = prev;
              }
            }
            forEach(fn, thisp) {
              thisp = thisp || this;
              for (let walker = this[LRU_LIST].head; null !== walker; ) {
                const next = walker.next;
                forEachStep(this, fn, walker, thisp), walker = next;
              }
            }
            keys() {
              return this[LRU_LIST].toArray().map((k => k.key));
            }
            values() {
              return this[LRU_LIST].toArray().map((k => k.value));
            }
            reset() {
              this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length && this[LRU_LIST].forEach((hit => this[DISPOSE](hit.key, hit.value))), 
              this[CACHE] = new Map, this[LRU_LIST] = new Yallist, this[LENGTH] = 0;
            }
            dump() {
              return this[LRU_LIST].map((hit => !isStale(this, hit) && {
                k: hit.key,
                v: hit.value,
                e: hit.now + (hit.maxAge || 0)
              })).toArray().filter((h => h));
            }
            dumpLru() {
              return this[LRU_LIST];
            }
            set(key, value, maxAge) {
              if ((maxAge = maxAge || this[MAX_AGE]) && "number" != typeof maxAge) throw new TypeError("maxAge must be a number");
              const now = maxAge ? Date.now() : 0, len = this[LENGTH_CALCULATOR](value, key);
              if (this[CACHE].has(key)) {
                if (len > this[MAX]) return del(this, this[CACHE].get(key)), !1;
                const item = this[CACHE].get(key).value;
                return this[DISPOSE] && (this[NO_DISPOSE_ON_SET] || this[DISPOSE](key, item.value)), 
                item.now = now, item.maxAge = maxAge, item.value = value, this[LENGTH] += len - item.length, 
                item.length = len, this.get(key), trim(this), !0;
              }
              const hit = new Entry(key, value, len, now, maxAge);
              return hit.length > this[MAX] ? (this[DISPOSE] && this[DISPOSE](key, value), !1) : (this[LENGTH] += hit.length, 
              this[LRU_LIST].unshift(hit), this[CACHE].set(key, this[LRU_LIST].head), trim(this), 
              !0);
            }
            has(key) {
              if (!this[CACHE].has(key)) return !1;
              const hit = this[CACHE].get(key).value;
              return !isStale(this, hit);
            }
            get(key) {
              return get(this, key, !0);
            }
            peek(key) {
              return get(this, key, !1);
            }
            pop() {
              const node = this[LRU_LIST].tail;
              return node ? (del(this, node), node.value) : null;
            }
            del(key) {
              del(this, this[CACHE].get(key));
            }
            load(arr) {
              this.reset();
              const now = Date.now();
              for (let l = arr.length - 1; l >= 0; l--) {
                const hit = arr[l], expiresAt = hit.e || 0;
                if (0 === expiresAt) this.set(hit.k, hit.v); else {
                  const maxAge = expiresAt - now;
                  maxAge > 0 && this.set(hit.k, hit.v, maxAge);
                }
              }
            }
            prune() {
              this[CACHE].forEach(((value, key) => get(this, key, !1)));
            }
          };
        }(), cache = new LRU({
          max: 1e3
        }), parseOptions = parseOptions_1, Comparator = requireComparator(), debug = debug_1, SemVer = semver$2, {re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace} = re$3.exports, isNullSet = c => "<0.0.0-0" === c.value, isAny = c => "" === c.value, isSatisfiable = (comparators, options) => {
          let result = !0;
          const remainingComparators = comparators.slice();
          let testComparator = remainingComparators.pop();
          for (;result && remainingComparators.length; ) result = remainingComparators.every((otherComparator => testComparator.intersects(otherComparator, options))), 
          testComparator = remainingComparators.pop();
          return result;
        }, parseComparator = (comp, options) => (debug("comp", comp, options), comp = replaceCarets(comp, options), 
        debug("caret", comp), comp = replaceTildes(comp, options), debug("tildes", comp), 
        comp = replaceXRanges(comp, options), debug("xrange", comp), comp = replaceStars(comp, options), 
        debug("stars", comp), comp), isX = id => !id || "x" === id.toLowerCase() || "*" === id, replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((comp => replaceTilde(comp, options))).join(" "), replaceTilde = (comp, options) => {
          const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
          return comp.replace(r, ((_, M, m, p, pr) => {
            let ret;
            return debug("tilde", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = `>=${M}.0.0 <${+M + 1}.0.0-0` : isX(p) ? ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0` : pr ? (debug("replaceTilde pr", pr), 
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`) : ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`, 
            debug("tilde return", ret), ret;
          }));
        }, replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((comp => replaceCaret(comp, options))).join(" "), replaceCaret = (comp, options) => {
          debug("caret", comp, options);
          const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET], z = options.includePrerelease ? "-0" : "";
          return comp.replace(r, ((_, M, m, p, pr) => {
            let ret;
            return debug("caret", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0` : isX(p) ? ret = "0" === M ? `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0` : `>=${M}.${m}.0${z} <${+M + 1}.0.0-0` : pr ? (debug("replaceCaret pr", pr), 
            ret = "0" === M ? "0" === m ? `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0` : `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0` : `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`) : (debug("no pr"), 
            ret = "0" === M ? "0" === m ? `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0` : `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0` : `>=${M}.${m}.${p} <${+M + 1}.0.0-0`), 
            debug("caret return", ret), ret;
          }));
        }, replaceXRanges = (comp, options) => (debug("replaceXRanges", comp, options), 
        comp.split(/\s+/).map((comp => replaceXRange(comp, options))).join(" ")), replaceXRange = (comp, options) => {
          comp = comp.trim();
          const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
          return comp.replace(r, ((ret, gtlt, M, m, p, pr) => {
            debug("xRange", comp, ret, gtlt, M, m, p, pr);
            const xM = isX(M), xm = xM || isX(m), xp = xm || isX(p), anyX = xp;
            return "=" === gtlt && anyX && (gtlt = ""), pr = options.includePrerelease ? "-0" : "", 
            xM ? ret = ">" === gtlt || "<" === gtlt ? "<0.0.0-0" : "*" : gtlt && anyX ? (xm && (m = 0), 
            p = 0, ">" === gtlt ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, 
            p = 0)) : "<=" === gtlt && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), "<" === gtlt && (pr = "-0"), 
            ret = `${gtlt + M}.${m}.${p}${pr}`) : xm ? ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0` : xp && (ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`), 
            debug("xRange return", ret), ret;
          }));
        }, replaceStars = (comp, options) => (debug("replaceStars", comp, options), comp.trim().replace(re[t.STAR], "")), replaceGTE0 = (comp, options) => (debug("replaceGTE0", comp, options), 
        comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "")), hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => `${from = isX(fM) ? "" : isX(fm) ? `>=${fM}.0.0${incPr ? "-0" : ""}` : isX(fp) ? `>=${fM}.${fm}.0${incPr ? "-0" : ""}` : fpr ? `>=${from}` : `>=${from}${incPr ? "-0" : ""}`} ${to = isX(tM) ? "" : isX(tm) ? `<${+tM + 1}.0.0-0` : isX(tp) ? `<${tM}.${+tm + 1}.0-0` : tpr ? `<=${tM}.${tm}.${tp}-${tpr}` : incPr ? `<${tM}.${tm}.${+tp + 1}-0` : `<=${to}`}`.trim(), testSet = (set, version, options) => {
          for (let i = 0; i < set.length; i++) if (!set[i].test(version)) return !1;
          if (version.prerelease.length && !options.includePrerelease) {
            for (let i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== Comparator.ANY && set[i].semver.prerelease.length > 0) {
              const allowed = set[i].semver;
              if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
            }
            return !1;
          }
          return !0;
        };
        return range;
      }
      function requireComparator() {
        if (hasRequiredComparator) return comparator;
        hasRequiredComparator = 1;
        const ANY = Symbol("SemVer ANY");
        class Comparator {
          static get ANY() {
            return ANY;
          }
          constructor(comp, options) {
            if (options = parseOptions(options), comp instanceof Comparator) {
              if (comp.loose === !!options.loose) return comp;
              comp = comp.value;
            }
            debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, 
            this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, 
            debug("comp", this);
          }
          parse(comp) {
            const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], m = comp.match(r);
            if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
            this.operator = void 0 !== m[1] ? m[1] : "", "=" === this.operator && (this.operator = ""), 
            m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
          }
          toString() {
            return this.value;
          }
          test(version) {
            if (debug("Comparator.test", version, this.options.loose), this.semver === ANY || version === ANY) return !0;
            if ("string" == typeof version) try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return !1;
            }
            return cmp(version, this.operator, this.semver, this.options);
          }
          intersects(comp, options) {
            if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
            if (options && "object" == typeof options || (options = {
              loose: !!options,
              includePrerelease: !1
            }), "" === this.operator) return "" === this.value || new Range(comp.value, options).test(this.value);
            if ("" === comp.operator) return "" === comp.value || new Range(this.value, options).test(comp.semver);
            const sameDirectionIncreasing = !(">=" !== this.operator && ">" !== this.operator || ">=" !== comp.operator && ">" !== comp.operator), sameDirectionDecreasing = !("<=" !== this.operator && "<" !== this.operator || "<=" !== comp.operator && "<" !== comp.operator), sameSemVer = this.semver.version === comp.semver.version, differentDirectionsInclusive = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== comp.operator && "<=" !== comp.operator), oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (">=" === this.operator || ">" === this.operator) && ("<=" === comp.operator || "<" === comp.operator), oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ("<=" === this.operator || "<" === this.operator) && (">=" === comp.operator || ">" === comp.operator);
            return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
          }
        }
        comparator = Comparator;
        const parseOptions = parseOptions_1, {re, t} = re$3.exports, cmp = cmp_1, debug = debug_1, SemVer = semver$2, Range = requireRange();
        return comparator;
      }
      const Range$8 = requireRange();
      var satisfies_1 = (version, range, options) => {
        try {
          range = new Range$8(range, options);
        } catch (er) {
          return !1;
        }
        return range.test(version);
      };
      const Range$7 = requireRange();
      var toComparators_1 = (range, options) => new Range$7(range, options).set.map((comp => comp.map((c => c.value)).join(" ").trim().split(" ")));
      const SemVer$3 = semver$2, Range$6 = requireRange();
      var maxSatisfying_1 = (versions, range, options) => {
        let max = null, maxSV = null, rangeObj = null;
        try {
          rangeObj = new Range$6(range, options);
        } catch (er) {
          return null;
        }
        return versions.forEach((v => {
          rangeObj.test(v) && (max && -1 !== maxSV.compare(v) || (max = v, maxSV = new SemVer$3(max, options)));
        })), max;
      };
      const SemVer$2 = semver$2, Range$5 = requireRange();
      var minSatisfying_1 = (versions, range, options) => {
        let min = null, minSV = null, rangeObj = null;
        try {
          rangeObj = new Range$5(range, options);
        } catch (er) {
          return null;
        }
        return versions.forEach((v => {
          rangeObj.test(v) && (min && 1 !== minSV.compare(v) || (min = v, minSV = new SemVer$2(min, options)));
        })), min;
      };
      const SemVer$1 = semver$2, Range$4 = requireRange(), gt$1 = gt_1;
      var minVersion_1 = (range, loose) => {
        range = new Range$4(range, loose);
        let minver = new SemVer$1("0.0.0");
        if (range.test(minver)) return minver;
        if (minver = new SemVer$1("0.0.0-0"), range.test(minver)) return minver;
        minver = null;
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let setMin = null;
          comparators.forEach((comparator => {
            const compver = new SemVer$1(comparator.semver.version);
            switch (comparator.operator) {
             case ">":
              0 === compver.prerelease.length ? compver.patch++ : compver.prerelease.push(0), 
              compver.raw = compver.format();

             case "":
             case ">=":
              setMin && !gt$1(compver, setMin) || (setMin = compver);
              break;

             case "<":
             case "<=":
              break;

             default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
          })), !setMin || minver && !gt$1(minver, setMin) || (minver = setMin);
        }
        return minver && range.test(minver) ? minver : null;
      };
      const Range$3 = requireRange();
      var valid = (range, options) => {
        try {
          return new Range$3(range, options).range || "*";
        } catch (er) {
          return null;
        }
      };
      const SemVer = semver$2, Comparator$1 = requireComparator(), {ANY: ANY$1} = Comparator$1, Range$2 = requireRange(), satisfies$2 = satisfies_1, gt = gt_1, lt = lt_1, lte = lte_1, gte = gte_1;
      var outside_1 = (version, range, hilo, options) => {
        let gtfn, ltefn, ltfn, comp, ecomp;
        switch (version = new SemVer(version, options), range = new Range$2(range, options), 
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
        if (satisfies$2(version, range, options)) return !1;
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let high = null, low = null;
          if (comparators.forEach((comparator => {
            comparator.semver === ANY$1 && (comparator = new Comparator$1(">=0.0.0")), high = high || comparator, 
            low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
          })), high.operator === comp || high.operator === ecomp) return !1;
          if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return !1;
          if (low.operator === ecomp && ltfn(version, low.semver)) return !1;
        }
        return !0;
      };
      const outside$1 = outside_1;
      var gtr_1 = (version, range, options) => outside$1(version, range, ">", options);
      const outside = outside_1;
      var ltr_1 = (version, range, options) => outside(version, range, "<", options);
      const Range$1 = requireRange();
      var intersects_1 = (r1, r2, options) => (r1 = new Range$1(r1, options), r2 = new Range$1(r2, options), 
      r1.intersects(r2));
      const satisfies$1 = satisfies_1, compare$1 = compare_1;
      const Range = requireRange(), Comparator = requireComparator(), {ANY} = Comparator, satisfies = satisfies_1, compare = compare_1, simpleSubset = (sub, dom, options) => {
        if (sub === dom) return !0;
        if (1 === sub.length && sub[0].semver === ANY) {
          if (1 === dom.length && dom[0].semver === ANY) return !0;
          sub = options.includePrerelease ? [ new Comparator(">=0.0.0-0") ] : [ new Comparator(">=0.0.0") ];
        }
        if (1 === dom.length && dom[0].semver === ANY) {
          if (options.includePrerelease) return !0;
          dom = [ new Comparator(">=0.0.0") ];
        }
        const eqSet = new Set;
        let gt, lt, gtltComp, higher, lower, hasDomLT, hasDomGT;
        for (const c of sub) ">" === c.operator || ">=" === c.operator ? gt = higherGT(gt, c, options) : "<" === c.operator || "<=" === c.operator ? lt = lowerLT(lt, c, options) : eqSet.add(c.semver);
        if (eqSet.size > 1) return null;
        if (gt && lt) {
          if (gtltComp = compare(gt.semver, lt.semver, options), gtltComp > 0) return null;
          if (0 === gtltComp && (">=" !== gt.operator || "<=" !== lt.operator)) return null;
        }
        for (const eq of eqSet) {
          if (gt && !satisfies(eq, String(gt), options)) return null;
          if (lt && !satisfies(eq, String(lt), options)) return null;
          for (const c of dom) if (!satisfies(eq, String(c), options)) return !1;
          return !0;
        }
        let needDomLTPre = !(!lt || options.includePrerelease || !lt.semver.prerelease.length) && lt.semver, needDomGTPre = !(!gt || options.includePrerelease || !gt.semver.prerelease.length) && gt.semver;
        needDomLTPre && 1 === needDomLTPre.prerelease.length && "<" === lt.operator && 0 === needDomLTPre.prerelease[0] && (needDomLTPre = !1);
        for (const c of dom) {
          if (hasDomGT = hasDomGT || ">" === c.operator || ">=" === c.operator, hasDomLT = hasDomLT || "<" === c.operator || "<=" === c.operator, 
          gt) if (needDomGTPre && c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch && (needDomGTPre = !1), 
          ">" === c.operator || ">=" === c.operator) {
            if (higher = higherGT(gt, c, options), higher === c && higher !== gt) return !1;
          } else if (">=" === gt.operator && !satisfies(gt.semver, String(c), options)) return !1;
          if (lt) if (needDomLTPre && c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch && (needDomLTPre = !1), 
          "<" === c.operator || "<=" === c.operator) {
            if (lower = lowerLT(lt, c, options), lower === c && lower !== lt) return !1;
          } else if ("<=" === lt.operator && !satisfies(lt.semver, String(c), options)) return !1;
          if (!c.operator && (lt || gt) && 0 !== gtltComp) return !1;
        }
        return !(gt && hasDomLT && !lt && 0 !== gtltComp) && (!(lt && hasDomGT && !gt && 0 !== gtltComp) && (!needDomGTPre && !needDomLTPre));
      }, higherGT = (a, b, options) => {
        if (!a) return b;
        const comp = compare(a.semver, b.semver, options);
        return comp > 0 ? a : comp < 0 || ">" === b.operator && ">=" === a.operator ? b : a;
      }, lowerLT = (a, b, options) => {
        if (!a) return b;
        const comp = compare(a.semver, b.semver, options);
        return comp < 0 ? a : comp > 0 || "<" === b.operator && "<=" === a.operator ? b : a;
      };
      var subset_1 = (sub, dom, options = {}) => {
        if (sub === dom) return !0;
        sub = new Range(sub, options), dom = new Range(dom, options);
        let sawNonNull = !1;
        OUTER: for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            if (sawNonNull = sawNonNull || null !== isSub, isSub) continue OUTER;
          }
          if (sawNonNull) return !1;
        }
        return !0;
      };
      const internalRe = re$3.exports;
      var semver$1 = {
        re: internalRe.re,
        src: internalRe.src,
        tokens: internalRe.t,
        SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
        SemVer: semver$2,
        compareIdentifiers: identifiers.compareIdentifiers,
        rcompareIdentifiers: identifiers.rcompareIdentifiers,
        parse: parse_1,
        valid: valid_1,
        clean: clean_1,
        inc: inc_1,
        diff: diff_1,
        major: major_1,
        minor: minor_1,
        patch: patch_1,
        prerelease: prerelease_1,
        compare: compare_1,
        rcompare: rcompare_1,
        compareLoose: compareLoose_1,
        compareBuild: compareBuild_1,
        sort: sort_1,
        rsort: rsort_1,
        gt: gt_1,
        lt: lt_1,
        eq: eq_1,
        neq: neq_1,
        gte: gte_1,
        lte: lte_1,
        cmp: cmp_1,
        coerce: coerce_1,
        Comparator: requireComparator(),
        Range: requireRange(),
        satisfies: satisfies_1,
        toComparators: toComparators_1,
        maxSatisfying: maxSatisfying_1,
        minSatisfying: minSatisfying_1,
        minVersion: minVersion_1,
        validRange: valid,
        outside: outside_1,
        gtr: gtr_1,
        ltr: ltr_1,
        intersects: intersects_1,
        simplifyRange: (versions, range, options) => {
          const set = [];
          let min = null, prev = null;
          const v = versions.sort(((a, b) => compare$1(a, b, options)));
          for (const version of v) {
            satisfies$1(version, range, options) ? (prev = version, min || (min = version)) : (prev && set.push([ min, prev ]), 
            prev = null, min = null);
          }
          min && set.push([ min, null ]);
          const ranges = [];
          for (const [min, max] of set) min === max ? ranges.push(min) : max || min !== v[0] ? max ? min === v[0] ? ranges.push(`<=${max}`) : ranges.push(`${min} - ${max}`) : ranges.push(`>=${min}`) : ranges.push("*");
          const simplified = ranges.join(" || "), original = "string" == typeof range.raw ? range.raw : String(range);
          return simplified.length < original.length ? simplified : range;
        },
        subset: subset_1
      }, semver = semver$1;
      const reader = {
        read: function(jsonPath) {
          return find(_path().dirname(jsonPath));
        }
      };
      function find(dir) {
        try {
          return {
            string: _fs().default.readFileSync(_path().toNamespacedPath(_path().join(dir, "package.json")), "utf8")
          };
        } catch (error) {
          if ("ENOENT" === error.code) {
            const parent = _path().dirname(dir);
            return dir !== parent ? find(parent) : {
              string: void 0
            };
          }
          throw error;
        }
      }
      const isWindows = "win32" === process.platform, own$1 = {}.hasOwnProperty, codes = {}, messages = new Map;
      let userStackTraceLimit;
      function createError(sym, value, def) {
        return messages.set(sym, value), function(Base, key) {
          return NodeError;
          function NodeError(...args) {
            const limit = Error.stackTraceLimit;
            isErrorStackTraceLimitWritable() && (Error.stackTraceLimit = 0);
            const error = new Base;
            isErrorStackTraceLimitWritable() && (Error.stackTraceLimit = limit);
            const message = function(key, args, self) {
              const message = messages.get(key);
              if ("function" == typeof message) return _assert()(message.length <= args.length, `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${message.length}).`), 
              Reflect.apply(message, self, args);
              const expectedLength = (message.match(/%[dfijoOs]/g) || []).length;
              return _assert()(expectedLength === args.length, `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`), 
              0 === args.length ? message : (args.unshift(message), Reflect.apply(_util().format, null, args));
            }(key, args, error);
            return Object.defineProperty(error, "message", {
              value: message,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }), Object.defineProperty(error, "toString", {
              value() {
                return `${this.name} [${key}]: ${this.message}`;
              },
              enumerable: !1,
              writable: !0,
              configurable: !0
            }), addCodeToName(error, Base.name, key), error.code = key, error;
          }
        }(def, sym);
      }
      codes.ERR_INVALID_MODULE_SPECIFIER = createError("ERR_INVALID_MODULE_SPECIFIER", ((request, reason, base) => `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ""}`), TypeError), 
      codes.ERR_INVALID_PACKAGE_CONFIG = createError("ERR_INVALID_PACKAGE_CONFIG", ((path, base, message) => `Invalid package config ${path}${base ? ` while importing ${base}` : ""}${message ? `. ${message}` : ""}`), Error), 
      codes.ERR_INVALID_PACKAGE_TARGET = createError("ERR_INVALID_PACKAGE_TARGET", ((pkgPath, key, target, isImport = !1, base) => {
        const relError = "string" == typeof target && !isImport && target.length > 0 && !target.startsWith("./");
        return "." === key ? (_assert()(!1 === isImport), `Invalid "exports" main target ${JSON.stringify(target)} defined in the package config ${pkgPath}package.json${base ? ` imported from ${base}` : ""}${relError ? '; targets must start with "./"' : ""}`) : `Invalid "${isImport ? "imports" : "exports"}" target ${JSON.stringify(target)} defined for '${key}' in the package config ${pkgPath}package.json${base ? ` imported from ${base}` : ""}${relError ? '; targets must start with "./"' : ""}`;
      }), Error), codes.ERR_MODULE_NOT_FOUND = createError("ERR_MODULE_NOT_FOUND", ((path, base, type = "package") => `Cannot find ${type} '${path}' imported from ${base}`), Error), 
      codes.ERR_PACKAGE_IMPORT_NOT_DEFINED = createError("ERR_PACKAGE_IMPORT_NOT_DEFINED", ((specifier, packagePath, base) => `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath}package.json` : ""} imported from ${base}`), TypeError), 
      codes.ERR_PACKAGE_PATH_NOT_EXPORTED = createError("ERR_PACKAGE_PATH_NOT_EXPORTED", ((pkgPath, subpath, base) => "." === subpath ? `No "exports" main defined in ${pkgPath}package.json${base ? ` imported from ${base}` : ""}` : `Package subpath '${subpath}' is not defined by "exports" in ${pkgPath}package.json${base ? ` imported from ${base}` : ""}`), Error), 
      codes.ERR_UNSUPPORTED_DIR_IMPORT = createError("ERR_UNSUPPORTED_DIR_IMPORT", "Directory import '%s' is not supported resolving ES modules imported from %s", Error), 
      codes.ERR_UNKNOWN_FILE_EXTENSION = createError("ERR_UNKNOWN_FILE_EXTENSION", 'Unknown file extension "%s" for %s', TypeError), 
      codes.ERR_INVALID_ARG_VALUE = createError("ERR_INVALID_ARG_VALUE", ((name, value, reason = "is invalid") => {
        let inspected = (0, _util().inspect)(value);
        inspected.length > 128 && (inspected = `${inspected.slice(0, 128)}...`);
        return `The ${name.includes(".") ? "property" : "argument"} '${name}' ${reason}. Received ${inspected}`;
      }), TypeError), codes.ERR_UNSUPPORTED_ESM_URL_SCHEME = createError("ERR_UNSUPPORTED_ESM_URL_SCHEME", (url => {
        let message = "Only file and data URLs are supported by the default ESM loader";
        return isWindows && 2 === url.protocol.length && (message += ". On Windows, absolute paths must be valid file:// URLs"), 
        message += `. Received protocol '${url.protocol}'`, message;
      }), Error);
      const addCodeToName = hideStackFrames((function(error, name, code) {
        (error = captureLargerStackTrace(error)).name = `${name} [${code}]`, error.stack, 
        "SystemError" === name ? Object.defineProperty(error, "name", {
          value: name,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }) : delete error.name;
      }));
      function isErrorStackTraceLimitWritable() {
        const desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
        return void 0 === desc ? Object.isExtensible(Error) : own$1.call(desc, "writable") ? desc.writable : void 0 !== desc.set;
      }
      function hideStackFrames(fn) {
        const hidden = "__node_internal_" + fn.name;
        return Object.defineProperty(fn, "name", {
          value: hidden
        }), fn;
      }
      const captureLargerStackTrace = hideStackFrames((function(error) {
        const stackTraceLimitIsWritable = isErrorStackTraceLimitWritable();
        return stackTraceLimitIsWritable && (userStackTraceLimit = Error.stackTraceLimit, 
        Error.stackTraceLimit = Number.POSITIVE_INFINITY), Error.captureStackTrace(error), 
        stackTraceLimitIsWritable && (Error.stackTraceLimit = userStackTraceLimit), error;
      }));
      const {ERR_UNKNOWN_FILE_EXTENSION} = codes, extensionFormatMap = {
        __proto__: null,
        ".cjs": "commonjs",
        ".js": "module",
        ".mjs": "module"
      };
      function defaultGetFormat(url) {
        if (url.startsWith("node:")) return {
          format: "builtin"
        };
        const parsed = new (_url().URL)(url);
        if ("data:" === parsed.protocol) {
          const {1: mime} = /^([^/]+\/[^;,]+)[^,]*?(;base64)?,/.exec(parsed.pathname) || [ null, null ];
          return {
            format: "text/javascript" === mime ? "module" : null
          };
        }
        if ("file:" === parsed.protocol) {
          const ext = _path().extname(parsed.pathname);
          let format;
          if (format = ".js" === ext ? "module" === function(url) {
            return getPackageScopeConfig(url).type;
          }(parsed.href) ? "module" : "commonjs" : extensionFormatMap[ext], !format) throw new ERR_UNKNOWN_FILE_EXTENSION(ext, (0, 
          _url().fileURLToPath)(url));
          return {
            format: format || null
          };
        }
        return {
          format: null
        };
      }
      const listOfBuiltins = function({version = process.version, experimental = !1} = {}) {
        var coreModules = [ "assert", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "dns", "domain", "events", "fs", "http", "https", "module", "net", "os", "path", "punycode", "querystring", "readline", "repl", "stream", "string_decoder", "sys", "timers", "tls", "tty", "url", "util", "vm", "zlib" ];
        return semver.lt(version, "6.0.0") && coreModules.push("freelist"), semver.gte(version, "1.0.0") && coreModules.push("v8"), 
        semver.gte(version, "1.1.0") && coreModules.push("process"), semver.gte(version, "8.0.0") && coreModules.push("inspector"), 
        semver.gte(version, "8.1.0") && coreModules.push("async_hooks"), semver.gte(version, "8.4.0") && coreModules.push("http2"), 
        semver.gte(version, "8.5.0") && coreModules.push("perf_hooks"), semver.gte(version, "10.0.0") && coreModules.push("trace_events"), 
        semver.gte(version, "10.5.0") && (experimental || semver.gte(version, "12.0.0")) && coreModules.push("worker_threads"), 
        semver.gte(version, "12.16.0") && experimental && coreModules.push("wasi"), coreModules;
      }(), {ERR_INVALID_MODULE_SPECIFIER, ERR_INVALID_PACKAGE_CONFIG, ERR_INVALID_PACKAGE_TARGET, ERR_MODULE_NOT_FOUND, ERR_PACKAGE_IMPORT_NOT_DEFINED, ERR_PACKAGE_PATH_NOT_EXPORTED, ERR_UNSUPPORTED_DIR_IMPORT, ERR_UNSUPPORTED_ESM_URL_SCHEME, ERR_INVALID_ARG_VALUE} = codes, own = {}.hasOwnProperty, DEFAULT_CONDITIONS = Object.freeze([ "node", "import" ]), DEFAULT_CONDITIONS_SET = new Set(DEFAULT_CONDITIONS), invalidSegmentRegEx = /(^|\\|\/)(\.\.?|node_modules)(\\|\/|$)/, patternRegEx = /\*/g, encodedSepRegEx = /%2f|%2c/i, emittedPackageWarnings = new Set, packageJsonCache = new Map;
      function emitFolderMapDeprecation(match, pjsonUrl, isExports, base) {
        const pjsonPath = (0, _url().fileURLToPath)(pjsonUrl);
        emittedPackageWarnings.has(pjsonPath + "|" + match) || (emittedPackageWarnings.add(pjsonPath + "|" + match), 
        process.emitWarning(`Use of deprecated folder mapping "${match}" in the ${isExports ? '"exports"' : '"imports"'} field module resolution of the package at ${pjsonPath}${base ? ` imported from ${(0, 
        _url().fileURLToPath)(base)}` : ""}.\nUpdate this package.json to use a subpath pattern like "${match}*".`, "DeprecationWarning", "DEP0148"));
      }
      function emitLegacyIndexDeprecation(url, packageJsonUrl, base, main) {
        const {format} = defaultGetFormat(url.href);
        if ("module" !== format) return;
        const path = (0, _url().fileURLToPath)(url.href), pkgPath = (0, _url().fileURLToPath)(new (_url().URL)(".", packageJsonUrl)), basePath = (0, 
        _url().fileURLToPath)(base);
        main ? process.emitWarning(`Package ${pkgPath} has a "main" field set to ${JSON.stringify(main)}, excluding the full filename and extension to the resolved file at "${path.slice(pkgPath.length)}", imported from ${basePath}.\n Automatic extension resolution of the "main" field isdeprecated for ES modules.`, "DeprecationWarning", "DEP0151") : process.emitWarning(`No "main" or "exports" field defined in the package.json for ${pkgPath} resolving the main entry point "${path.slice(pkgPath.length)}", imported from ${basePath}.\nDefault "index" lookups for the main are deprecated for ES modules.`, "DeprecationWarning", "DEP0151");
      }
      function tryStatSync(path) {
        try {
          return (0, _fs().statSync)(path);
        } catch (_unused) {
          return new (_fs().Stats);
        }
      }
      function getPackageConfig(path, specifier, base) {
        const existing = packageJsonCache.get(path);
        if (void 0 !== existing) return existing;
        const source = reader.read(path).string;
        if (void 0 === source) {
          const packageConfig = {
            pjsonPath: path,
            exists: !1,
            main: void 0,
            name: void 0,
            type: "none",
            exports: void 0,
            imports: void 0
          };
          return packageJsonCache.set(path, packageConfig), packageConfig;
        }
        let packageJson;
        try {
          packageJson = JSON.parse(source);
        } catch (error) {
          throw new ERR_INVALID_PACKAGE_CONFIG(path, (base ? `"${specifier}" from ` : "") + (0, 
          _url().fileURLToPath)(base || specifier), error.message);
        }
        const {exports, imports, main, name, type} = packageJson, packageConfig = {
          pjsonPath: path,
          exists: !0,
          main: "string" == typeof main ? main : void 0,
          name: "string" == typeof name ? name : void 0,
          type: "module" === type || "commonjs" === type ? type : "none",
          exports,
          imports: imports && "object" == typeof imports ? imports : void 0
        };
        return packageJsonCache.set(path, packageConfig), packageConfig;
      }
      function getPackageScopeConfig(resolved) {
        let packageJsonUrl = new (_url().URL)("./package.json", resolved);
        for (;;) {
          if (packageJsonUrl.pathname.endsWith("node_modules/package.json")) break;
          const packageConfig = getPackageConfig((0, _url().fileURLToPath)(packageJsonUrl), resolved);
          if (packageConfig.exists) return packageConfig;
          const lastPackageJsonUrl = packageJsonUrl;
          if (packageJsonUrl = new (_url().URL)("../package.json", packageJsonUrl), packageJsonUrl.pathname === lastPackageJsonUrl.pathname) break;
        }
        const packageJsonPath = (0, _url().fileURLToPath)(packageJsonUrl), packageConfig = {
          pjsonPath: packageJsonPath,
          exists: !1,
          main: void 0,
          name: void 0,
          type: "none",
          exports: void 0,
          imports: void 0
        };
        return packageJsonCache.set(packageJsonPath, packageConfig), packageConfig;
      }
      function fileExists(url) {
        return tryStatSync((0, _url().fileURLToPath)(url)).isFile();
      }
      function legacyMainResolve(packageJsonUrl, packageConfig, base) {
        let guess;
        if (void 0 !== packageConfig.main) {
          if (guess = new (_url().URL)(`./${packageConfig.main}`, packageJsonUrl), fileExists(guess)) return guess;
          const tries = [ `./${packageConfig.main}.js`, `./${packageConfig.main}.json`, `./${packageConfig.main}.node`, `./${packageConfig.main}/index.js`, `./${packageConfig.main}/index.json`, `./${packageConfig.main}/index.node` ];
          let i = -1;
          for (;++i < tries.length && (guess = new (_url().URL)(tries[i], packageJsonUrl), 
          !fileExists(guess)); ) guess = void 0;
          if (guess) return emitLegacyIndexDeprecation(guess, packageJsonUrl, base, packageConfig.main), 
          guess;
        }
        const tries = [ "./index.js", "./index.json", "./index.node" ];
        let i = -1;
        for (;++i < tries.length && (guess = new (_url().URL)(tries[i], packageJsonUrl), 
        !fileExists(guess)); ) guess = void 0;
        if (guess) return emitLegacyIndexDeprecation(guess, packageJsonUrl, base, packageConfig.main), 
        guess;
        throw new ERR_MODULE_NOT_FOUND((0, _url().fileURLToPath)(new (_url().URL)(".", packageJsonUrl)), (0, 
        _url().fileURLToPath)(base));
      }
      function throwExportsNotFound(subpath, packageJsonUrl, base) {
        throw new ERR_PACKAGE_PATH_NOT_EXPORTED((0, _url().fileURLToPath)(new (_url().URL)(".", packageJsonUrl)), subpath, base && (0, 
        _url().fileURLToPath)(base));
      }
      function throwInvalidPackageTarget(subpath, target, packageJsonUrl, internal, base) {
        throw target = "object" == typeof target && null !== target ? JSON.stringify(target, null, "") : `${target}`, 
        new ERR_INVALID_PACKAGE_TARGET((0, _url().fileURLToPath)(new (_url().URL)(".", packageJsonUrl)), subpath, target, internal, base && (0, 
        _url().fileURLToPath)(base));
      }
      function resolvePackageTargetString(target, subpath, match, packageJsonUrl, base, pattern, internal, conditions) {
        if ("" === subpath || pattern || "/" === target[target.length - 1] || throwInvalidPackageTarget(match, target, packageJsonUrl, internal, base), 
        !target.startsWith("./")) {
          if (internal && !target.startsWith("../") && !target.startsWith("/")) {
            let isURL = !1;
            try {
              new (_url().URL)(target), isURL = !0;
            } catch (_unused2) {}
            if (!isURL) {
              return packageResolve(pattern ? target.replace(patternRegEx, subpath) : target + subpath, packageJsonUrl, conditions);
            }
          }
          throwInvalidPackageTarget(match, target, packageJsonUrl, internal, base);
        }
        invalidSegmentRegEx.test(target.slice(2)) && throwInvalidPackageTarget(match, target, packageJsonUrl, internal, base);
        const resolved = new (_url().URL)(target, packageJsonUrl), resolvedPath = resolved.pathname, packagePath = new (_url().URL)(".", packageJsonUrl).pathname;
        return resolvedPath.startsWith(packagePath) || throwInvalidPackageTarget(match, target, packageJsonUrl, internal, base), 
        "" === subpath ? resolved : (invalidSegmentRegEx.test(subpath) && function(subpath, packageJsonUrl, internal, base) {
          const reason = `request is not a valid subpath for the "${internal ? "imports" : "exports"}" resolution of ${(0, 
          _url().fileURLToPath)(packageJsonUrl)}`;
          throw new ERR_INVALID_MODULE_SPECIFIER(subpath, reason, base && (0, _url().fileURLToPath)(base));
        }(match + subpath, packageJsonUrl, internal, base), pattern ? new (_url().URL)(resolved.href.replace(patternRegEx, subpath)) : new (_url().URL)(subpath, resolved));
      }
      function isArrayIndex(key) {
        const keyNumber = Number(key);
        return `${keyNumber}` === key && (keyNumber >= 0 && keyNumber < 4294967295);
      }
      function resolvePackageTarget(packageJsonUrl, target, subpath, packageSubpath, base, pattern, internal, conditions) {
        if ("string" == typeof target) return resolvePackageTargetString(target, subpath, packageSubpath, packageJsonUrl, base, pattern, internal, conditions);
        if (Array.isArray(target)) {
          const targetList = target;
          if (0 === targetList.length) return null;
          let lastException, i = -1;
          for (;++i < targetList.length; ) {
            const targetItem = targetList[i];
            let resolved;
            try {
              resolved = resolvePackageTarget(packageJsonUrl, targetItem, subpath, packageSubpath, base, pattern, internal, conditions);
            } catch (error) {
              if (lastException = error, "ERR_INVALID_PACKAGE_TARGET" === error.code) continue;
              throw error;
            }
            if (void 0 !== resolved) {
              if (null !== resolved) return resolved;
              lastException = null;
            }
          }
          if (null == lastException) return lastException;
          throw lastException;
        }
        if ("object" != typeof target || null === target) {
          if (null === target) return null;
          throwInvalidPackageTarget(packageSubpath, target, packageJsonUrl, internal, base);
        } else {
          const keys = Object.getOwnPropertyNames(target);
          let i = -1;
          for (;++i < keys.length; ) {
            if (isArrayIndex(keys[i])) throw new ERR_INVALID_PACKAGE_CONFIG((0, _url().fileURLToPath)(packageJsonUrl), base, '"exports" cannot contain numeric property keys.');
          }
          for (i = -1; ++i < keys.length; ) {
            const key = keys[i];
            if ("default" === key || conditions && conditions.has(key)) {
              const resolved = resolvePackageTarget(packageJsonUrl, target[key], subpath, packageSubpath, base, pattern, internal, conditions);
              if (void 0 === resolved) continue;
              return resolved;
            }
          }
        }
      }
      function packageExportsResolve(packageJsonUrl, packageSubpath, packageConfig, base, conditions) {
        let exports = packageConfig.exports;
        if (function(exports, packageJsonUrl, base) {
          if ("string" == typeof exports || Array.isArray(exports)) return !0;
          if ("object" != typeof exports || null === exports) return !1;
          const keys = Object.getOwnPropertyNames(exports);
          let isConditionalSugar = !1, i = 0, j = -1;
          for (;++j < keys.length; ) {
            const key = keys[j], curIsConditionalSugar = "" === key || "." !== key[0];
            if (0 == i++) isConditionalSugar = curIsConditionalSugar; else if (isConditionalSugar !== curIsConditionalSugar) throw new ERR_INVALID_PACKAGE_CONFIG((0, 
            _url().fileURLToPath)(packageJsonUrl), base, "\"exports\" cannot contain some keys starting with '.' and some not. The exports object must either be an object of package subpath keys or an object of main entry condition name keys only.");
          }
          return isConditionalSugar;
        }(exports, packageJsonUrl, base) && (exports = {
          ".": exports
        }), own.call(exports, packageSubpath)) {
          const resolved = resolvePackageTarget(packageJsonUrl, exports[packageSubpath], "", packageSubpath, base, !1, !1, conditions);
          return null == resolved && throwExportsNotFound(packageSubpath, packageJsonUrl, base), 
          {
            resolved,
            exact: !0
          };
        }
        let bestMatch = "";
        const keys = Object.getOwnPropertyNames(exports);
        let i = -1;
        for (;++i < keys.length; ) {
          const key = keys[i];
          ("*" === key[key.length - 1] && packageSubpath.startsWith(key.slice(0, -1)) && packageSubpath.length >= key.length && key.length > bestMatch.length || "/" === key[key.length - 1] && packageSubpath.startsWith(key) && key.length > bestMatch.length) && (bestMatch = key);
        }
        if (bestMatch) {
          const target = exports[bestMatch], pattern = "*" === bestMatch[bestMatch.length - 1], resolved = resolvePackageTarget(packageJsonUrl, target, packageSubpath.slice(bestMatch.length - (pattern ? 1 : 0)), bestMatch, base, pattern, !1, conditions);
          return null == resolved && throwExportsNotFound(packageSubpath, packageJsonUrl, base), 
          pattern || emitFolderMapDeprecation(bestMatch, packageJsonUrl, !0, base), {
            resolved,
            exact: pattern
          };
        }
        throwExportsNotFound(packageSubpath, packageJsonUrl, base);
      }
      function packageImportsResolve(name, base, conditions) {
        if ("#" === name || name.startsWith("#/")) {
          throw new ERR_INVALID_MODULE_SPECIFIER(name, "is not a valid internal imports specifier name", (0, 
          _url().fileURLToPath)(base));
        }
        let packageJsonUrl;
        const packageConfig = getPackageScopeConfig(base);
        if (packageConfig.exists) {
          packageJsonUrl = (0, _url().pathToFileURL)(packageConfig.pjsonPath);
          const imports = packageConfig.imports;
          if (imports) if (own.call(imports, name)) {
            const resolved = resolvePackageTarget(packageJsonUrl, imports[name], "", name, base, !1, !0, conditions);
            if (null !== resolved) return {
              resolved,
              exact: !0
            };
          } else {
            let bestMatch = "";
            const keys = Object.getOwnPropertyNames(imports);
            let i = -1;
            for (;++i < keys.length; ) {
              const key = keys[i];
              ("*" === key[key.length - 1] && name.startsWith(key.slice(0, -1)) && name.length >= key.length && key.length > bestMatch.length || "/" === key[key.length - 1] && name.startsWith(key) && key.length > bestMatch.length) && (bestMatch = key);
            }
            if (bestMatch) {
              const target = imports[bestMatch], pattern = "*" === bestMatch[bestMatch.length - 1], resolved = resolvePackageTarget(packageJsonUrl, target, name.slice(bestMatch.length - (pattern ? 1 : 0)), bestMatch, base, pattern, !0, conditions);
              if (null !== resolved) return pattern || emitFolderMapDeprecation(bestMatch, packageJsonUrl, !1, base), 
              {
                resolved,
                exact: pattern
              };
            }
          }
        }
        !function(specifier, packageJsonUrl, base) {
          throw new ERR_PACKAGE_IMPORT_NOT_DEFINED(specifier, packageJsonUrl && (0, _url().fileURLToPath)(new (_url().URL)(".", packageJsonUrl)), (0, 
          _url().fileURLToPath)(base));
        }(name, packageJsonUrl, base);
      }
      function packageResolve(specifier, base, conditions) {
        const {packageName, packageSubpath, isScoped} = function(specifier, base) {
          let separatorIndex = specifier.indexOf("/"), validPackageName = !0, isScoped = !1;
          "@" === specifier[0] && (isScoped = !0, -1 === separatorIndex || 0 === specifier.length ? validPackageName = !1 : separatorIndex = specifier.indexOf("/", separatorIndex + 1));
          const packageName = -1 === separatorIndex ? specifier : specifier.slice(0, separatorIndex);
          let i = -1;
          for (;++i < packageName.length; ) if ("%" === packageName[i] || "\\" === packageName[i]) {
            validPackageName = !1;
            break;
          }
          if (!validPackageName) throw new ERR_INVALID_MODULE_SPECIFIER(specifier, "is not a valid package name", (0, 
          _url().fileURLToPath)(base));
          return {
            packageName,
            packageSubpath: "." + (-1 === separatorIndex ? "" : specifier.slice(separatorIndex)),
            isScoped
          };
        }(specifier, base), packageConfig = getPackageScopeConfig(base);
        if (packageConfig.exists) {
          const packageJsonUrl = (0, _url().pathToFileURL)(packageConfig.pjsonPath);
          if (packageConfig.name === packageName && void 0 !== packageConfig.exports && null !== packageConfig.exports) return packageExportsResolve(packageJsonUrl, packageSubpath, packageConfig, base, conditions).resolved;
        }
        let lastPath, packageJsonUrl = new (_url().URL)("./node_modules/" + packageName + "/package.json", base), packageJsonPath = (0, 
        _url().fileURLToPath)(packageJsonUrl);
        do {
          if (!tryStatSync(packageJsonPath.slice(0, -13)).isDirectory()) {
            lastPath = packageJsonPath, packageJsonUrl = new (_url().URL)((isScoped ? "../../../../node_modules/" : "../../../node_modules/") + packageName + "/package.json", packageJsonUrl), 
            packageJsonPath = (0, _url().fileURLToPath)(packageJsonUrl);
            continue;
          }
          const packageConfig = getPackageConfig(packageJsonPath, specifier, base);
          return void 0 !== packageConfig.exports && null !== packageConfig.exports ? packageExportsResolve(packageJsonUrl, packageSubpath, packageConfig, base, conditions).resolved : "." === packageSubpath ? legacyMainResolve(packageJsonUrl, packageConfig, base) : new (_url().URL)(packageSubpath, packageJsonUrl);
        } while (packageJsonPath.length !== lastPath.length);
        throw new ERR_MODULE_NOT_FOUND(packageName, (0, _url().fileURLToPath)(base));
      }
      function moduleResolve(specifier, base, conditions) {
        let resolved;
        if (function(specifier) {
          return "" !== specifier && ("/" === specifier[0] || function(specifier) {
            if ("." === specifier[0]) {
              if (1 === specifier.length || "/" === specifier[1]) return !0;
              if ("." === specifier[1] && (2 === specifier.length || "/" === specifier[2])) return !0;
            }
            return !1;
          }(specifier));
        }(specifier)) resolved = new (_url().URL)(specifier, base); else if ("#" === specifier[0]) ({resolved} = packageImportsResolve(specifier, base, conditions)); else try {
          resolved = new (_url().URL)(specifier);
        } catch (_unused3) {
          resolved = packageResolve(specifier, base, conditions);
        }
        return function(resolved, base) {
          if (encodedSepRegEx.test(resolved.pathname)) throw new ERR_INVALID_MODULE_SPECIFIER(resolved.pathname, 'must not include encoded "/" or "\\" characters', (0, 
          _url().fileURLToPath)(base));
          const path = (0, _url().fileURLToPath)(resolved), stats = tryStatSync(path.endsWith("/") ? path.slice(-1) : path);
          if (stats.isDirectory()) {
            const error = new ERR_UNSUPPORTED_DIR_IMPORT(path, (0, _url().fileURLToPath)(base));
            throw error.url = String(resolved), error;
          }
          if (!stats.isFile()) throw new ERR_MODULE_NOT_FOUND(path || resolved.pathname, base && (0, 
          _url().fileURLToPath)(base), "module");
          return resolved;
        }(resolved, base);
      }
      function defaultResolve(specifier, context = {}) {
        const {parentURL} = context;
        let parsed;
        try {
          if (parsed = new (_url().URL)(specifier), "data:" === parsed.protocol) return {
            url: specifier
          };
        } catch (_unused4) {}
        if (parsed && "node:" === parsed.protocol) return {
          url: specifier
        };
        if (parsed && "file:" !== parsed.protocol && "data:" !== parsed.protocol) throw new ERR_UNSUPPORTED_ESM_URL_SCHEME(parsed);
        if (listOfBuiltins.includes(specifier)) return {
          url: "node:" + specifier
        };
        parentURL.startsWith("data:") && new (_url().URL)(specifier, parentURL);
        const conditions = function(conditions) {
          if (void 0 !== conditions && conditions !== DEFAULT_CONDITIONS) {
            if (!Array.isArray(conditions)) throw new ERR_INVALID_ARG_VALUE("conditions", conditions, "expected an array");
            return new Set(conditions);
          }
          return DEFAULT_CONDITIONS_SET;
        }(context.conditions);
        let url = moduleResolve(specifier, new (_url().URL)(parentURL), conditions);
        const urlPath = (0, _url().fileURLToPath)(url), real = (0, _fs().realpathSync)(urlPath), old = url;
        return url = (0, _url().pathToFileURL)(real + (urlPath.endsWith(_path().sep) ? "/" : "")), 
        url.search = old.search, url.hash = old.hash, {
          url: `${url}`
        };
      }
      function _resolve() {
        return (_resolve = _asyncToGenerator((function*(specifier, parent) {
          if (!parent) throw new Error("Please pass `parent`: `import-meta-resolve` cannot ponyfill that");
          try {
            return defaultResolve(specifier, {
              parentURL: parent
            }).url;
          } catch (error) {
            return "ERR_UNSUPPORTED_DIR_IMPORT" === error.code ? error.url : Promise.reject(error);
          }
        }))).apply(this, arguments);
      }
    },
    8649: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      const SPACES_RE = /^[ \t]+$/;
      exports.default = class {
        constructor(map) {
          this._map = null, this._buf = "", this._last = 0, this._queue = [], this._position = {
            line: 1,
            column: 0
          }, this._sourcePosition = {
            identifierName: void 0,
            line: void 0,
            column: void 0,
            filename: void 0,
            force: !1
          }, this._disallowedPop = null, this._map = map;
        }
        get() {
          this._flush();
          const map = this._map, result = {
            code: this._buf.trimRight(),
            decodedMap: null == map ? void 0 : map.getDecoded(),
            get map() {
              return result.map = map ? map.get() : null;
            },
            set map(value) {
              Object.defineProperty(result, "map", {
                value,
                writable: !0
              });
            },
            get rawMappings() {
              return result.rawMappings = null == map ? void 0 : map.getRawMappings();
            },
            set rawMappings(value) {
              Object.defineProperty(result, "rawMappings", {
                value,
                writable: !0
              });
            }
          };
          return result;
        }
        append(str) {
          this._flush();
          const {line, column, filename, identifierName, force} = this._sourcePosition;
          this._append(str, line, column, identifierName, filename, force);
        }
        queue(str) {
          if ("\n" === str) for (;this._queue.length > 0 && SPACES_RE.test(this._queue[0][0]); ) this._queue.shift();
          const {line, column, filename, identifierName, force} = this._sourcePosition;
          this._queue.unshift([ str, line, column, identifierName, filename, force ]);
        }
        queueIndentation(str) {
          this._queue.unshift([ str, void 0, void 0, void 0, void 0, !1 ]);
        }
        _flush() {
          let item;
          for (;item = this._queue.pop(); ) this._append(...item);
        }
        _append(str, line, column, identifierName, filename, force) {
          this._buf += str, this._last = str.charCodeAt(str.length - 1);
          let i = str.indexOf("\n"), last = 0;
          for (0 !== i && this._mark(line, column, identifierName, filename, force); -1 !== i; ) this._position.line++, 
          this._position.column = 0, last = i + 1, last < str.length && this._mark(++line, 0, identifierName, filename, force), 
          i = str.indexOf("\n", last);
          this._position.column += str.length - last;
        }
        _mark(line, column, identifierName, filename, force) {
          var _this$_map;
          null == (_this$_map = this._map) || _this$_map.mark(this._position, line, column, identifierName, filename, force);
        }
        removeTrailingNewline() {
          this._queue.length > 0 && "\n" === this._queue[0][0] && this._queue.shift();
        }
        removeLastSemicolon() {
          this._queue.length > 0 && ";" === this._queue[0][0] && this._queue.shift();
        }
        getLastChar() {
          let last;
          if (this._queue.length > 0) {
            last = this._queue[0][0].charCodeAt(0);
          } else last = this._last;
          return last;
        }
        endsWithCharAndNewline() {
          const queue = this._queue;
          if (queue.length > 0) {
            if (10 !== queue[0][0].charCodeAt(0)) return;
            if (queue.length > 1) {
              return queue[1][0].charCodeAt(0);
            }
            return this._last;
          }
        }
        hasContent() {
          return this._queue.length > 0 || !!this._last;
        }
        exactSource(loc, cb) {
          this.source("start", loc, !0), cb(), this.source("end", loc), this._disallowPop("start", loc);
        }
        source(prop, loc, force) {
          prop && !loc || this._normalizePosition(prop, loc, this._sourcePosition, force);
        }
        withSource(prop, loc, cb) {
          if (!this._map) return cb();
          const originalLine = this._sourcePosition.line, originalColumn = this._sourcePosition.column, originalFilename = this._sourcePosition.filename, originalIdentifierName = this._sourcePosition.identifierName;
          this.source(prop, loc), cb(), this._sourcePosition.force && this._sourcePosition.line === originalLine && this._sourcePosition.column === originalColumn && this._sourcePosition.filename === originalFilename || this._disallowedPop && this._disallowedPop.line === originalLine && this._disallowedPop.column === originalColumn && this._disallowedPop.filename === originalFilename || (this._sourcePosition.line = originalLine, 
          this._sourcePosition.column = originalColumn, this._sourcePosition.filename = originalFilename, 
          this._sourcePosition.identifierName = originalIdentifierName, this._sourcePosition.force = !1, 
          this._disallowedPop = null);
        }
        _disallowPop(prop, loc) {
          prop && !loc || (this._disallowedPop = this._normalizePosition(prop, loc, {
            identifierName: void 0,
            line: void 0,
            column: void 0,
            filename: void 0,
            force: !1
          }, !1));
        }
        _normalizePosition(prop, loc, targetObj, force) {
          const pos = loc ? loc[prop] : null, origLine = targetObj.line, origColumn = targetObj.column, origFilename = targetObj.filename;
          return targetObj.identifierName = "start" === prop && (null == loc ? void 0 : loc.identifierName) || null, 
          targetObj.line = null == pos ? void 0 : pos.line, targetObj.column = null == pos ? void 0 : pos.column, 
          targetObj.filename = null == loc ? void 0 : loc.filename, (force || targetObj.line !== origLine || targetObj.column !== origColumn || targetObj.filename !== origFilename) && (targetObj.force = force), 
          targetObj;
        }
        getCurrentColumn() {
          const extra = this._queue.reduce(((acc, item) => item[0] + acc), ""), lastIndex = extra.lastIndexOf("\n");
          return -1 === lastIndex ? this._position.column + extra.length : extra.length - 1 - lastIndex;
        }
        getCurrentLine() {
          const extra = this._queue.reduce(((acc, item) => item[0] + acc), "");
          let count = 0;
          for (let i = 0; i < extra.length; i++) "\n" === extra[i] && count++;
          return this._position.line + count;
        }
      };
    },
    8516: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.BlockStatement = function(node) {
        var _node$directives;
        this.token("{"), this.printInnerComments(node);
        const hasDirectives = null == (_node$directives = node.directives) ? void 0 : _node$directives.length;
        node.body.length || hasDirectives ? (this.newline(), this.printSequence(node.directives, node, {
          indent: !0
        }), hasDirectives && this.newline(), this.printSequence(node.body, node, {
          indent: !0
        }), this.removeTrailingNewline(), this.source("end", node.loc), this.endsWith(10) || this.newline(), 
        this.rightBrace()) : (this.source("end", node.loc), this.token("}"));
      }, exports.Directive = function(node) {
        this.print(node.value, node), this.semicolon();
      }, exports.DirectiveLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.token(raw);
        const {value} = node;
        if (unescapedDoubleQuoteRE.test(value)) {
          if (unescapedSingleQuoteRE.test(value)) throw new Error("Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes.");
          this.token(`'${value}'`);
        } else this.token(`"${value}"`);
      }, exports.File = function(node) {
        node.program && this.print(node.program.interpreter, node);
        this.print(node.program, node);
      }, exports.InterpreterDirective = function(node) {
        this.token(`#!${node.value}\n`);
      }, exports.Placeholder = function(node) {
        this.token("%%"), this.print(node.name), this.token("%%"), "Statement" === node.expectedNode && this.semicolon();
      }, exports.Program = function(node) {
        this.printInnerComments(node, !1), this.printSequence(node.directives, node), node.directives && node.directives.length && this.newline();
        this.printSequence(node.body, node);
      };
      const unescapedSingleQuoteRE = /(?:^|[^\\])(?:\\\\)*'/, unescapedDoubleQuoteRE = /(?:^|[^\\])(?:\\\\)*"/;
    },
    505: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ClassAccessorProperty = function(node) {
        this.printJoin(node.decorators, node), this.source("end", node.key.loc), this.tsPrintClassMemberModifiers(node, !0), 
        this.word("accessor"), this.printInnerComments(node), this.space(), node.computed ? (this.token("["), 
        this.print(node.key, node), this.token("]")) : (this._variance(node), this.print(node.key, node));
        node.optional && this.token("?");
        node.definite && this.token("!");
        this.print(node.typeAnnotation, node), node.value && (this.space(), this.token("="), 
        this.space(), this.print(node.value, node));
        this.semicolon();
      }, exports.ClassBody = function(node) {
        this.token("{"), this.printInnerComments(node), 0 === node.body.length ? this.token("}") : (this.newline(), 
        this.indent(), this.printSequence(node.body, node), this.dedent(), this.endsWith(10) || this.newline(), 
        this.rightBrace());
      }, exports.ClassExpression = exports.ClassDeclaration = function(node, parent) {
        this.format.decoratorsBeforeExport && (isExportDefaultDeclaration(parent) || isExportNamedDeclaration(parent)) || this.printJoin(node.decorators, node);
        node.declare && (this.word("declare"), this.space());
        node.abstract && (this.word("abstract"), this.space());
        this.word("class"), this.printInnerComments(node), node.id && (this.space(), this.print(node.id, node));
        this.print(node.typeParameters, node), node.superClass && (this.space(), this.word("extends"), 
        this.space(), this.print(node.superClass, node), this.print(node.superTypeParameters, node));
        node.implements && (this.space(), this.word("implements"), this.space(), this.printList(node.implements, node));
        this.space(), this.print(node.body, node);
      }, exports.ClassMethod = function(node) {
        this._classMethodHead(node), this.space(), this.print(node.body, node);
      }, exports.ClassPrivateMethod = function(node) {
        this._classMethodHead(node), this.space(), this.print(node.body, node);
      }, exports.ClassPrivateProperty = function(node) {
        this.printJoin(node.decorators, node), node.static && (this.word("static"), this.space());
        this.print(node.key, node), this.print(node.typeAnnotation, node), node.value && (this.space(), 
        this.token("="), this.space(), this.print(node.value, node));
        this.semicolon();
      }, exports.ClassProperty = function(node) {
        this.printJoin(node.decorators, node), this.source("end", node.key.loc), this.tsPrintClassMemberModifiers(node, !0), 
        node.computed ? (this.token("["), this.print(node.key, node), this.token("]")) : (this._variance(node), 
        this.print(node.key, node));
        node.optional && this.token("?");
        node.definite && this.token("!");
        this.print(node.typeAnnotation, node), node.value && (this.space(), this.token("="), 
        this.space(), this.print(node.value, node));
        this.semicolon();
      }, exports.StaticBlock = function(node) {
        this.word("static"), this.space(), this.token("{"), 0 === node.body.length ? this.token("}") : (this.newline(), 
        this.printSequence(node.body, node, {
          indent: !0
        }), this.rightBrace());
      }, exports._classMethodHead = function(node) {
        this.printJoin(node.decorators, node), this.source("end", node.key.loc), this.tsPrintClassMemberModifiers(node, !1), 
        this._methodHead(node);
      };
      var _t = __webpack_require__(7289);
      const {isExportDefaultDeclaration, isExportNamedDeclaration} = _t;
    },
    6361: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.LogicalExpression = exports.BinaryExpression = exports.AssignmentExpression = function(node, parent) {
        const parens = this.inForStatementInitCounter && "in" === node.operator && !n.needsParens(node, parent);
        parens && this.token("(");
        this.print(node.left, node), this.space(), "in" === node.operator || "instanceof" === node.operator ? this.word(node.operator) : this.token(node.operator);
        this.space(), this.print(node.right, node), parens && this.token(")");
      }, exports.AssignmentPattern = function(node) {
        this.print(node.left, node), node.left.optional && this.token("?");
        this.print(node.left.typeAnnotation, node), this.space(), this.token("="), this.space(), 
        this.print(node.right, node);
      }, exports.AwaitExpression = void 0, exports.BindExpression = function(node) {
        this.print(node.object, node), this.token("::"), this.print(node.callee, node);
      }, exports.CallExpression = function(node) {
        this.print(node.callee, node), this.print(node.typeArguments, node), this.print(node.typeParameters, node), 
        this.token("("), this.printList(node.arguments, node), this.token(")");
      }, exports.ConditionalExpression = function(node) {
        this.print(node.test, node), this.space(), this.token("?"), this.space(), this.print(node.consequent, node), 
        this.space(), this.token(":"), this.space(), this.print(node.alternate, node);
      }, exports.Decorator = function(node) {
        this.token("@");
        const {expression} = node;
        !function(node) {
          "CallExpression" === node.type && (node = node.callee);
          if ("ParenthesizedExpression" === node.type) return !1;
          return !isDecoratorMemberExpression(node);
        }(expression) ? this.print(expression, node) : (this.token("("), this.print(expression, node), 
        this.token(")"));
        this.newline();
      }, exports.DoExpression = function(node) {
        node.async && (this.word("async"), this.space());
        this.word("do"), this.space(), this.print(node.body, node);
      }, exports.EmptyStatement = function() {
        this.semicolon(!0);
      }, exports.ExpressionStatement = function(node) {
        this.print(node.expression, node), this.semicolon();
      }, exports.Import = function() {
        this.word("import");
      }, exports.MemberExpression = function(node) {
        if (this.print(node.object, node), !node.computed && isMemberExpression(node.property)) throw new TypeError("Got a MemberExpression for MemberExpression property");
        let computed = node.computed;
        isLiteral(node.property) && "number" == typeof node.property.value && (computed = !0);
        computed ? (this.token("["), this.print(node.property, node), this.token("]")) : (this.token("."), 
        this.print(node.property, node));
      }, exports.MetaProperty = function(node) {
        this.print(node.meta, node), this.token("."), this.print(node.property, node);
      }, exports.ModuleExpression = function(node) {
        this.word("module"), this.space(), this.token("{"), 0 === node.body.body.length ? this.token("}") : (this.newline(), 
        this.printSequence(node.body.body, node, {
          indent: !0
        }), this.rightBrace());
      }, exports.NewExpression = function(node, parent) {
        if (this.word("new"), this.space(), this.print(node.callee, node), this.format.minified && 0 === node.arguments.length && !node.optional && !isCallExpression(parent, {
          callee: node
        }) && !isMemberExpression(parent) && !isNewExpression(parent)) return;
        this.print(node.typeArguments, node), this.print(node.typeParameters, node), node.optional && this.token("?.");
        this.token("("), this.printList(node.arguments, node), this.token(")");
      }, exports.OptionalCallExpression = function(node) {
        this.print(node.callee, node), this.print(node.typeArguments, node), this.print(node.typeParameters, node), 
        node.optional && this.token("?.");
        this.token("("), this.printList(node.arguments, node), this.token(")");
      }, exports.OptionalMemberExpression = function(node) {
        if (this.print(node.object, node), !node.computed && isMemberExpression(node.property)) throw new TypeError("Got a MemberExpression for MemberExpression property");
        let computed = node.computed;
        isLiteral(node.property) && "number" == typeof node.property.value && (computed = !0);
        node.optional && this.token("?.");
        computed ? (this.token("["), this.print(node.property, node), this.token("]")) : (node.optional || this.token("."), 
        this.print(node.property, node));
      }, exports.ParenthesizedExpression = function(node) {
        this.token("("), this.print(node.expression, node), this.token(")");
      }, exports.PrivateName = function(node) {
        this.token("#"), this.print(node.id, node);
      }, exports.SequenceExpression = function(node) {
        this.printList(node.expressions, node);
      }, exports.Super = function() {
        this.word("super");
      }, exports.ThisExpression = function() {
        this.word("this");
      }, exports.UnaryExpression = function(node) {
        "void" === node.operator || "delete" === node.operator || "typeof" === node.operator || "throw" === node.operator ? (this.word(node.operator), 
        this.space()) : this.token(node.operator);
        this.print(node.argument, node);
      }, exports.UpdateExpression = function(node) {
        node.prefix ? (this.token(node.operator), this.print(node.argument, node)) : (this.startTerminatorless(!0), 
        this.print(node.argument, node), this.endTerminatorless(), this.token(node.operator));
      }, exports.V8IntrinsicIdentifier = function(node) {
        this.token("%"), this.word(node.name);
      }, exports.YieldExpression = void 0;
      var _t = __webpack_require__(7289), n = __webpack_require__(2866);
      const {isCallExpression, isLiteral, isMemberExpression, isNewExpression} = _t;
      function isDecoratorMemberExpression(node) {
        switch (node.type) {
         case "Identifier":
          return !0;

         case "MemberExpression":
          return !node.computed && "Identifier" === node.property.type && isDecoratorMemberExpression(node.object);

         default:
          return !1;
        }
      }
      function buildYieldAwait(keyword) {
        return function(node) {
          if (this.word(keyword), node.delegate && this.token("*"), node.argument) {
            this.space();
            const terminatorState = this.startTerminatorless();
            this.print(node.argument, node), this.endTerminatorless(terminatorState);
          }
        };
      }
      const YieldExpression = buildYieldAwait("yield");
      exports.YieldExpression = YieldExpression;
      const AwaitExpression = buildYieldAwait("await");
      exports.AwaitExpression = AwaitExpression;
    },
    8076: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.AnyTypeAnnotation = function() {
        this.word("any");
      }, exports.ArrayTypeAnnotation = function(node) {
        this.print(node.elementType, node), this.token("["), this.token("]");
      }, exports.BooleanLiteralTypeAnnotation = function(node) {
        this.word(node.value ? "true" : "false");
      }, exports.BooleanTypeAnnotation = function() {
        this.word("boolean");
      }, exports.DeclareClass = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.word("class"), this.space(), this._interfaceish(node);
      }, exports.DeclareExportAllDeclaration = function() {
        this.word("declare"), this.space(), _modules.ExportAllDeclaration.apply(this, arguments);
      }, exports.DeclareExportDeclaration = function(node) {
        this.word("declare"), this.space(), this.word("export"), this.space(), node.default && (this.word("default"), 
        this.space());
        FlowExportDeclaration.apply(this, arguments);
      }, exports.DeclareFunction = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.word("function"), this.space(), this.print(node.id, node), this.print(node.id.typeAnnotation.typeAnnotation, node), 
        node.predicate && (this.space(), this.print(node.predicate, node));
        this.semicolon();
      }, exports.DeclareInterface = function(node) {
        this.word("declare"), this.space(), this.InterfaceDeclaration(node);
      }, exports.DeclareModule = function(node) {
        this.word("declare"), this.space(), this.word("module"), this.space(), this.print(node.id, node), 
        this.space(), this.print(node.body, node);
      }, exports.DeclareModuleExports = function(node) {
        this.word("declare"), this.space(), this.word("module"), this.token("."), this.word("exports"), 
        this.print(node.typeAnnotation, node);
      }, exports.DeclareOpaqueType = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.OpaqueType(node);
      }, exports.DeclareTypeAlias = function(node) {
        this.word("declare"), this.space(), this.TypeAlias(node);
      }, exports.DeclareVariable = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.word("var"), this.space(), this.print(node.id, node), this.print(node.id.typeAnnotation, node), 
        this.semicolon();
      }, exports.DeclaredPredicate = function(node) {
        this.token("%"), this.word("checks"), this.token("("), this.print(node.value, node), 
        this.token(")");
      }, exports.EmptyTypeAnnotation = function() {
        this.word("empty");
      }, exports.EnumBooleanBody = function(node) {
        const {explicitType} = node;
        enumExplicitType(this, "boolean", explicitType), enumBody(this, node);
      }, exports.EnumBooleanMember = function(node) {
        enumInitializedMember(this, node);
      }, exports.EnumDeclaration = function(node) {
        const {id, body} = node;
        this.word("enum"), this.space(), this.print(id, node), this.print(body, node);
      }, exports.EnumDefaultedMember = function(node) {
        const {id} = node;
        this.print(id, node), this.token(",");
      }, exports.EnumNumberBody = function(node) {
        const {explicitType} = node;
        enumExplicitType(this, "number", explicitType), enumBody(this, node);
      }, exports.EnumNumberMember = function(node) {
        enumInitializedMember(this, node);
      }, exports.EnumStringBody = function(node) {
        const {explicitType} = node;
        enumExplicitType(this, "string", explicitType), enumBody(this, node);
      }, exports.EnumStringMember = function(node) {
        enumInitializedMember(this, node);
      }, exports.EnumSymbolBody = function(node) {
        enumExplicitType(this, "symbol", !0), enumBody(this, node);
      }, exports.ExistsTypeAnnotation = function() {
        this.token("*");
      }, exports.FunctionTypeAnnotation = function(node, parent) {
        this.print(node.typeParameters, node), this.token("("), node.this && (this.word("this"), 
        this.token(":"), this.space(), this.print(node.this.typeAnnotation, node), (node.params.length || node.rest) && (this.token(","), 
        this.space()));
        this.printList(node.params, node), node.rest && (node.params.length && (this.token(","), 
        this.space()), this.token("..."), this.print(node.rest, node));
        this.token(")"), parent && ("ObjectTypeCallProperty" === parent.type || "DeclareFunction" === parent.type || "ObjectTypeProperty" === parent.type && parent.method) ? this.token(":") : (this.space(), 
        this.token("=>"));
        this.space(), this.print(node.returnType, node);
      }, exports.FunctionTypeParam = function(node) {
        this.print(node.name, node), node.optional && this.token("?");
        node.name && (this.token(":"), this.space());
        this.print(node.typeAnnotation, node);
      }, exports.IndexedAccessType = function(node) {
        this.print(node.objectType, node), this.token("["), this.print(node.indexType, node), 
        this.token("]");
      }, exports.InferredPredicate = function() {
        this.token("%"), this.word("checks");
      }, exports.InterfaceDeclaration = function(node) {
        this.word("interface"), this.space(), this._interfaceish(node);
      }, exports.GenericTypeAnnotation = exports.ClassImplements = exports.InterfaceExtends = function(node) {
        this.print(node.id, node), this.print(node.typeParameters, node);
      }, exports.InterfaceTypeAnnotation = function(node) {
        this.word("interface"), node.extends && node.extends.length && (this.space(), this.word("extends"), 
        this.space(), this.printList(node.extends, node));
        this.space(), this.print(node.body, node);
      }, exports.IntersectionTypeAnnotation = function(node) {
        this.printJoin(node.types, node, {
          separator: andSeparator
        });
      }, exports.MixedTypeAnnotation = function() {
        this.word("mixed");
      }, exports.NullLiteralTypeAnnotation = function() {
        this.word("null");
      }, exports.NullableTypeAnnotation = function(node) {
        this.token("?"), this.print(node.typeAnnotation, node);
      }, Object.defineProperty(exports, "NumberLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _types2.NumericLiteral;
        }
      }), exports.NumberTypeAnnotation = function() {
        this.word("number");
      }, exports.ObjectTypeAnnotation = function(node) {
        node.exact ? this.token("{|") : this.token("{");
        const props = [ ...node.properties, ...node.callProperties || [], ...node.indexers || [], ...node.internalSlots || [] ];
        props.length && (this.space(), this.printJoin(props, node, {
          addNewlines(leading) {
            if (leading && !props[0]) return 1;
          },
          indent: !0,
          statement: !0,
          iterator: () => {
            (1 !== props.length || node.inexact) && (this.token(","), this.space());
          }
        }), this.space());
        node.inexact && (this.indent(), this.token("..."), props.length && this.newline(), 
        this.dedent());
        node.exact ? this.token("|}") : this.token("}");
      }, exports.ObjectTypeCallProperty = function(node) {
        node.static && (this.word("static"), this.space());
        this.print(node.value, node);
      }, exports.ObjectTypeIndexer = function(node) {
        node.static && (this.word("static"), this.space());
        this._variance(node), this.token("["), node.id && (this.print(node.id, node), this.token(":"), 
        this.space());
        this.print(node.key, node), this.token("]"), this.token(":"), this.space(), this.print(node.value, node);
      }, exports.ObjectTypeInternalSlot = function(node) {
        node.static && (this.word("static"), this.space());
        this.token("["), this.token("["), this.print(node.id, node), this.token("]"), this.token("]"), 
        node.optional && this.token("?");
        node.method || (this.token(":"), this.space());
        this.print(node.value, node);
      }, exports.ObjectTypeProperty = function(node) {
        node.proto && (this.word("proto"), this.space());
        node.static && (this.word("static"), this.space());
        "get" !== node.kind && "set" !== node.kind || (this.word(node.kind), this.space());
        this._variance(node), this.print(node.key, node), node.optional && this.token("?");
        node.method || (this.token(":"), this.space());
        this.print(node.value, node);
      }, exports.ObjectTypeSpreadProperty = function(node) {
        this.token("..."), this.print(node.argument, node);
      }, exports.OpaqueType = function(node) {
        this.word("opaque"), this.space(), this.word("type"), this.space(), this.print(node.id, node), 
        this.print(node.typeParameters, node), node.supertype && (this.token(":"), this.space(), 
        this.print(node.supertype, node));
        node.impltype && (this.space(), this.token("="), this.space(), this.print(node.impltype, node));
        this.semicolon();
      }, exports.OptionalIndexedAccessType = function(node) {
        this.print(node.objectType, node), node.optional && this.token("?.");
        this.token("["), this.print(node.indexType, node), this.token("]");
      }, exports.QualifiedTypeIdentifier = function(node) {
        this.print(node.qualification, node), this.token("."), this.print(node.id, node);
      }, Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _types2.StringLiteral;
        }
      }), exports.StringTypeAnnotation = function() {
        this.word("string");
      }, exports.SymbolTypeAnnotation = function() {
        this.word("symbol");
      }, exports.ThisTypeAnnotation = function() {
        this.word("this");
      }, exports.TupleTypeAnnotation = function(node) {
        this.token("["), this.printList(node.types, node), this.token("]");
      }, exports.TypeAlias = function(node) {
        this.word("type"), this.space(), this.print(node.id, node), this.print(node.typeParameters, node), 
        this.space(), this.token("="), this.space(), this.print(node.right, node), this.semicolon();
      }, exports.TypeAnnotation = function(node) {
        this.token(":"), this.space(), node.optional && this.token("?");
        this.print(node.typeAnnotation, node);
      }, exports.TypeCastExpression = function(node) {
        this.token("("), this.print(node.expression, node), this.print(node.typeAnnotation, node), 
        this.token(")");
      }, exports.TypeParameter = function(node) {
        this._variance(node), this.word(node.name), node.bound && this.print(node.bound, node);
        node.default && (this.space(), this.token("="), this.space(), this.print(node.default, node));
      }, exports.TypeParameterDeclaration = exports.TypeParameterInstantiation = function(node) {
        this.token("<"), this.printList(node.params, node, {}), this.token(">");
      }, exports.TypeofTypeAnnotation = function(node) {
        this.word("typeof"), this.space(), this.print(node.argument, node);
      }, exports.UnionTypeAnnotation = function(node) {
        this.printJoin(node.types, node, {
          separator: orSeparator
        });
      }, exports.Variance = function(node) {
        "plus" === node.kind ? this.token("+") : this.token("-");
      }, exports.VoidTypeAnnotation = function() {
        this.word("void");
      }, exports._interfaceish = function(node) {
        var _node$extends;
        this.print(node.id, node), this.print(node.typeParameters, node), null != (_node$extends = node.extends) && _node$extends.length && (this.space(), 
        this.word("extends"), this.space(), this.printList(node.extends, node));
        node.mixins && node.mixins.length && (this.space(), this.word("mixins"), this.space(), 
        this.printList(node.mixins, node));
        node.implements && node.implements.length && (this.space(), this.word("implements"), 
        this.space(), this.printList(node.implements, node));
        this.space(), this.print(node.body, node);
      }, exports._variance = function(node) {
        node.variance && ("plus" === node.variance.kind ? this.token("+") : "minus" === node.variance.kind && this.token("-"));
      };
      var _t = __webpack_require__(7289), _modules = __webpack_require__(7064), _types2 = __webpack_require__(5718);
      const {isDeclareExportDeclaration, isStatement} = _t;
      function enumExplicitType(context, name, hasExplicitType) {
        hasExplicitType && (context.space(), context.word("of"), context.space(), context.word(name)), 
        context.space();
      }
      function enumBody(context, node) {
        const {members} = node;
        context.token("{"), context.indent(), context.newline();
        for (const member of members) context.print(member, node), context.newline();
        node.hasUnknownMembers && (context.token("..."), context.newline()), context.dedent(), 
        context.token("}");
      }
      function enumInitializedMember(context, node) {
        const {id, init} = node;
        context.print(id, node), context.space(), context.token("="), context.space(), context.print(init, node), 
        context.token(",");
      }
      function FlowExportDeclaration(node) {
        if (node.declaration) {
          const declar = node.declaration;
          this.print(declar, node), isStatement(declar) || this.semicolon();
        } else this.token("{"), node.specifiers.length && (this.space(), this.printList(node.specifiers, node), 
        this.space()), this.token("}"), node.source && (this.space(), this.word("from"), 
        this.space(), this.print(node.source, node)), this.semicolon();
      }
      function andSeparator() {
        this.space(), this.token("&"), this.space();
      }
      function orSeparator() {
        this.space(), this.token("|"), this.space();
      }
    },
    8217: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _templateLiterals = __webpack_require__(2347);
      Object.keys(_templateLiterals).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _templateLiterals[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _templateLiterals[key];
          }
        }));
      }));
      var _expressions = __webpack_require__(6361);
      Object.keys(_expressions).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _expressions[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _expressions[key];
          }
        }));
      }));
      var _statements = __webpack_require__(6787);
      Object.keys(_statements).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _statements[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _statements[key];
          }
        }));
      }));
      var _classes = __webpack_require__(505);
      Object.keys(_classes).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _classes[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _classes[key];
          }
        }));
      }));
      var _methods = __webpack_require__(624);
      Object.keys(_methods).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _methods[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _methods[key];
          }
        }));
      }));
      var _modules = __webpack_require__(7064);
      Object.keys(_modules).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _modules[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _modules[key];
          }
        }));
      }));
      var _types = __webpack_require__(5718);
      Object.keys(_types).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _types[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _types[key];
          }
        }));
      }));
      var _flow = __webpack_require__(8076);
      Object.keys(_flow).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _flow[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _flow[key];
          }
        }));
      }));
      var _base = __webpack_require__(8516);
      Object.keys(_base).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _base[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _base[key];
          }
        }));
      }));
      var _jsx = __webpack_require__(9598);
      Object.keys(_jsx).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _jsx[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _jsx[key];
          }
        }));
      }));
      var _typescript = __webpack_require__(2043);
      Object.keys(_typescript).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _typescript[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _typescript[key];
          }
        }));
      }));
    },
    9598: (__unused_webpack_module, exports) => {
      "use strict";
      function spaceSeparator() {
        this.space();
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.JSXAttribute = function(node) {
        this.print(node.name, node), node.value && (this.token("="), this.print(node.value, node));
      }, exports.JSXClosingElement = function(node) {
        this.token("</"), this.print(node.name, node), this.token(">");
      }, exports.JSXClosingFragment = function() {
        this.token("</"), this.token(">");
      }, exports.JSXElement = function(node) {
        const open = node.openingElement;
        if (this.print(open, node), open.selfClosing) return;
        this.indent();
        for (const child of node.children) this.print(child, node);
        this.dedent(), this.print(node.closingElement, node);
      }, exports.JSXEmptyExpression = function(node) {
        this.printInnerComments(node);
      }, exports.JSXExpressionContainer = function(node) {
        this.token("{"), this.print(node.expression, node), this.token("}");
      }, exports.JSXFragment = function(node) {
        this.print(node.openingFragment, node), this.indent();
        for (const child of node.children) this.print(child, node);
        this.dedent(), this.print(node.closingFragment, node);
      }, exports.JSXIdentifier = function(node) {
        this.word(node.name);
      }, exports.JSXMemberExpression = function(node) {
        this.print(node.object, node), this.token("."), this.print(node.property, node);
      }, exports.JSXNamespacedName = function(node) {
        this.print(node.namespace, node), this.token(":"), this.print(node.name, node);
      }, exports.JSXOpeningElement = function(node) {
        this.token("<"), this.print(node.name, node), this.print(node.typeParameters, node), 
        node.attributes.length > 0 && (this.space(), this.printJoin(node.attributes, node, {
          separator: spaceSeparator
        }));
        node.selfClosing ? (this.space(), this.token("/>")) : this.token(">");
      }, exports.JSXOpeningFragment = function() {
        this.token("<"), this.token(">");
      }, exports.JSXSpreadAttribute = function(node) {
        this.token("{"), this.token("..."), this.print(node.argument, node), this.token("}");
      }, exports.JSXSpreadChild = function(node) {
        this.token("{"), this.token("..."), this.print(node.expression, node), this.token("}");
      }, exports.JSXText = function(node) {
        const raw = this.getPossibleRaw(node);
        null != raw ? this.token(raw) : this.token(node.value);
      };
    },
    624: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArrowFunctionExpression = function(node) {
        node.async && (this.word("async"), this.space());
        const firstParam = node.params[0];
        this.format.retainLines || this.format.auxiliaryCommentBefore || this.format.auxiliaryCommentAfter || 1 !== node.params.length || !isIdentifier(firstParam) || function(node, param) {
          var _param$leadingComment, _param$trailingCommen;
          return !!(node.typeParameters || node.returnType || node.predicate || param.typeAnnotation || param.optional || null != (_param$leadingComment = param.leadingComments) && _param$leadingComment.length || null != (_param$trailingCommen = param.trailingComments) && _param$trailingCommen.length);
        }(node, firstParam) ? this._params(node) : this.print(firstParam, node);
        this._predicate(node), this.space(), this.token("=>"), this.space(), this.print(node.body, node);
      }, exports.FunctionDeclaration = exports.FunctionExpression = function(node) {
        this._functionHead(node), this.space(), this.print(node.body, node);
      }, exports._functionHead = function(node) {
        node.async && (this.word("async"), this.space());
        this.word("function"), node.generator && this.token("*");
        this.printInnerComments(node), this.space(), node.id && this.print(node.id, node);
        this._params(node), this._predicate(node);
      }, exports._methodHead = function(node) {
        const kind = node.kind, key = node.key;
        "get" !== kind && "set" !== kind || (this.word(kind), this.space());
        node.async && (this._catchUp("start", key.loc), this.word("async"), this.space());
        "method" !== kind && "init" !== kind || node.generator && this.token("*");
        node.computed ? (this.token("["), this.print(key, node), this.token("]")) : this.print(key, node);
        node.optional && this.token("?");
        this._params(node);
      }, exports._param = function(parameter, parent) {
        this.printJoin(parameter.decorators, parameter), this.print(parameter, parent), 
        parameter.optional && this.token("?");
        this.print(parameter.typeAnnotation, parameter);
      }, exports._parameters = function(parameters, parent) {
        for (let i = 0; i < parameters.length; i++) this._param(parameters[i], parent), 
        i < parameters.length - 1 && (this.token(","), this.space());
      }, exports._params = function(node) {
        this.print(node.typeParameters, node), this.token("("), this._parameters(node.params, node), 
        this.token(")"), this.print(node.returnType, node);
      }, exports._predicate = function(node) {
        node.predicate && (node.returnType || this.token(":"), this.space(), this.print(node.predicate, node));
      };
      var _t = __webpack_require__(7289);
      const {isIdentifier} = _t;
    },
    7064: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ExportAllDeclaration = function(node) {
        this.word("export"), this.space(), "type" === node.exportKind && (this.word("type"), 
        this.space());
        this.token("*"), this.space(), this.word("from"), this.space(), this.print(node.source, node), 
        this.printAssertions(node), this.semicolon();
      }, exports.ExportDefaultDeclaration = function(node) {
        this.format.decoratorsBeforeExport && isClassDeclaration(node.declaration) && this.printJoin(node.declaration.decorators, node);
        this.word("export"), this.space(), this.word("default"), this.space(), ExportDeclaration.apply(this, arguments);
      }, exports.ExportDefaultSpecifier = function(node) {
        this.print(node.exported, node);
      }, exports.ExportNamedDeclaration = function(node) {
        this.format.decoratorsBeforeExport && isClassDeclaration(node.declaration) && this.printJoin(node.declaration.decorators, node);
        this.word("export"), this.space(), ExportDeclaration.apply(this, arguments);
      }, exports.ExportNamespaceSpecifier = function(node) {
        this.token("*"), this.space(), this.word("as"), this.space(), this.print(node.exported, node);
      }, exports.ExportSpecifier = function(node) {
        "type" === node.exportKind && (this.word("type"), this.space());
        this.print(node.local, node), node.exported && node.local.name !== node.exported.name && (this.space(), 
        this.word("as"), this.space(), this.print(node.exported, node));
      }, exports.ImportAttribute = function(node) {
        this.print(node.key), this.token(":"), this.space(), this.print(node.value);
      }, exports.ImportDeclaration = function(node) {
        this.word("import"), this.space();
        const isTypeKind = "type" === node.importKind || "typeof" === node.importKind;
        isTypeKind && (this.word(node.importKind), this.space());
        const specifiers = node.specifiers.slice(0), hasSpecifiers = !!specifiers.length;
        for (;hasSpecifiers; ) {
          const first = specifiers[0];
          if (!isImportDefaultSpecifier(first) && !isImportNamespaceSpecifier(first)) break;
          this.print(specifiers.shift(), node), specifiers.length && (this.token(","), this.space());
        }
        specifiers.length ? (this.token("{"), this.space(), this.printList(specifiers, node), 
        this.space(), this.token("}")) : isTypeKind && !hasSpecifiers && (this.token("{"), 
        this.token("}"));
        (hasSpecifiers || isTypeKind) && (this.space(), this.word("from"), this.space());
        var _node$attributes;
        this.print(node.source, node), this.printAssertions(node), null != (_node$attributes = node.attributes) && _node$attributes.length && (this.space(), 
        this.word("with"), this.space(), this.printList(node.attributes, node));
        this.semicolon();
      }, exports.ImportDefaultSpecifier = function(node) {
        this.print(node.local, node);
      }, exports.ImportNamespaceSpecifier = function(node) {
        this.token("*"), this.space(), this.word("as"), this.space(), this.print(node.local, node);
      }, exports.ImportSpecifier = function(node) {
        "type" !== node.importKind && "typeof" !== node.importKind || (this.word(node.importKind), 
        this.space());
        this.print(node.imported, node), node.local && node.local.name !== node.imported.name && (this.space(), 
        this.word("as"), this.space(), this.print(node.local, node));
      };
      var _t = __webpack_require__(7289);
      const {isClassDeclaration, isExportDefaultSpecifier, isExportNamespaceSpecifier, isImportDefaultSpecifier, isImportNamespaceSpecifier, isStatement} = _t;
      function ExportDeclaration(node) {
        if (node.declaration) {
          const declar = node.declaration;
          this.print(declar, node), isStatement(declar) || this.semicolon();
        } else {
          "type" === node.exportKind && (this.word("type"), this.space());
          const specifiers = node.specifiers.slice(0);
          let hasSpecial = !1;
          for (;;) {
            const first = specifiers[0];
            if (!isExportDefaultSpecifier(first) && !isExportNamespaceSpecifier(first)) break;
            hasSpecial = !0, this.print(specifiers.shift(), node), specifiers.length && (this.token(","), 
            this.space());
          }
          (specifiers.length || !specifiers.length && !hasSpecial) && (this.token("{"), specifiers.length && (this.space(), 
          this.printList(specifiers, node), this.space()), this.token("}")), node.source && (this.space(), 
          this.word("from"), this.space(), this.print(node.source, node), this.printAssertions(node)), 
          this.semicolon();
        }
      }
    },
    6787: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.BreakStatement = void 0, exports.CatchClause = function(node) {
        this.word("catch"), this.space(), node.param && (this.token("("), this.print(node.param, node), 
        this.print(node.param.typeAnnotation, node), this.token(")"), this.space());
        this.print(node.body, node);
      }, exports.ContinueStatement = void 0, exports.DebuggerStatement = function() {
        this.word("debugger"), this.semicolon();
      }, exports.DoWhileStatement = function(node) {
        this.word("do"), this.space(), this.print(node.body, node), this.space(), this.word("while"), 
        this.space(), this.token("("), this.print(node.test, node), this.token(")"), this.semicolon();
      }, exports.ForOfStatement = exports.ForInStatement = void 0, exports.ForStatement = function(node) {
        this.word("for"), this.space(), this.token("("), this.inForStatementInitCounter++, 
        this.print(node.init, node), this.inForStatementInitCounter--, this.token(";"), 
        node.test && (this.space(), this.print(node.test, node));
        this.token(";"), node.update && (this.space(), this.print(node.update, node));
        this.token(")"), this.printBlock(node);
      }, exports.IfStatement = function(node) {
        this.word("if"), this.space(), this.token("("), this.print(node.test, node), this.token(")"), 
        this.space();
        const needsBlock = node.alternate && isIfStatement(getLastStatement(node.consequent));
        needsBlock && (this.token("{"), this.newline(), this.indent());
        this.printAndIndentOnComments(node.consequent, node), needsBlock && (this.dedent(), 
        this.newline(), this.token("}"));
        node.alternate && (this.endsWith(125) && this.space(), this.word("else"), this.space(), 
        this.printAndIndentOnComments(node.alternate, node));
      }, exports.LabeledStatement = function(node) {
        this.print(node.label, node), this.token(":"), this.space(), this.print(node.body, node);
      }, exports.ReturnStatement = void 0, exports.SwitchCase = function(node) {
        node.test ? (this.word("case"), this.space(), this.print(node.test, node), this.token(":")) : (this.word("default"), 
        this.token(":"));
        node.consequent.length && (this.newline(), this.printSequence(node.consequent, node, {
          indent: !0
        }));
      }, exports.SwitchStatement = function(node) {
        this.word("switch"), this.space(), this.token("("), this.print(node.discriminant, node), 
        this.token(")"), this.space(), this.token("{"), this.printSequence(node.cases, node, {
          indent: !0,
          addNewlines(leading, cas) {
            if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
          }
        }), this.token("}");
      }, exports.ThrowStatement = void 0, exports.TryStatement = function(node) {
        this.word("try"), this.space(), this.print(node.block, node), this.space(), node.handlers ? this.print(node.handlers[0], node) : this.print(node.handler, node);
        node.finalizer && (this.space(), this.word("finally"), this.space(), this.print(node.finalizer, node));
      }, exports.VariableDeclaration = function(node, parent) {
        node.declare && (this.word("declare"), this.space());
        this.word(node.kind), this.space();
        let separator, hasInits = !1;
        if (!isFor(parent)) for (const declar of node.declarations) declar.init && (hasInits = !0);
        hasInits && (separator = "const" === node.kind ? constDeclarationIndent : variableDeclarationIndent);
        if (this.printList(node.declarations, node, {
          separator
        }), isFor(parent)) if (isForStatement(parent)) {
          if (parent.init === node) return;
        } else if (parent.left === node) return;
        this.semicolon();
      }, exports.VariableDeclarator = function(node) {
        this.print(node.id, node), node.definite && this.token("!");
        this.print(node.id.typeAnnotation, node), node.init && (this.space(), this.token("="), 
        this.space(), this.print(node.init, node));
      }, exports.WhileStatement = function(node) {
        this.word("while"), this.space(), this.token("("), this.print(node.test, node), 
        this.token(")"), this.printBlock(node);
      }, exports.WithStatement = function(node) {
        this.word("with"), this.space(), this.token("("), this.print(node.object, node), 
        this.token(")"), this.printBlock(node);
      };
      var _t = __webpack_require__(7289);
      const {isFor, isForStatement, isIfStatement, isStatement} = _t;
      function getLastStatement(statement) {
        return isStatement(statement.body) ? getLastStatement(statement.body) : statement;
      }
      const buildForXStatement = function(op) {
        return function(node) {
          this.word("for"), this.space(), "of" === op && node.await && (this.word("await"), 
          this.space()), this.token("("), this.print(node.left, node), this.space(), this.word(op), 
          this.space(), this.print(node.right, node), this.token(")"), this.printBlock(node);
        };
      }, ForInStatement = buildForXStatement("in");
      exports.ForInStatement = ForInStatement;
      const ForOfStatement = buildForXStatement("of");
      function buildLabelStatement(prefix, key = "label") {
        return function(node) {
          this.word(prefix);
          const label = node[key];
          if (label) {
            this.space();
            const isLabel = "label" == key, terminatorState = this.startTerminatorless(isLabel);
            this.print(label, node), this.endTerminatorless(terminatorState);
          }
          this.semicolon();
        };
      }
      exports.ForOfStatement = ForOfStatement;
      const ContinueStatement = buildLabelStatement("continue");
      exports.ContinueStatement = ContinueStatement;
      const ReturnStatement = buildLabelStatement("return", "argument");
      exports.ReturnStatement = ReturnStatement;
      const BreakStatement = buildLabelStatement("break");
      exports.BreakStatement = BreakStatement;
      const ThrowStatement = buildLabelStatement("throw", "argument");
      function variableDeclarationIndent() {
        if (this.token(","), this.newline(), this.endsWith(10)) for (let i = 0; i < 4; i++) this.space(!0);
      }
      function constDeclarationIndent() {
        if (this.token(","), this.newline(), this.endsWith(10)) for (let i = 0; i < 6; i++) this.space(!0);
      }
      exports.ThrowStatement = ThrowStatement;
    },
    2347: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.TaggedTemplateExpression = function(node) {
        this.print(node.tag, node), this.print(node.typeParameters, node), this.print(node.quasi, node);
      }, exports.TemplateElement = function(node, parent) {
        const isFirst = parent.quasis[0] === node, isLast = parent.quasis[parent.quasis.length - 1] === node, value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");
        this.token(value);
      }, exports.TemplateLiteral = function(node) {
        const quasis = node.quasis;
        for (let i = 0; i < quasis.length; i++) this.print(quasis[i], node), i + 1 < quasis.length && this.print(node.expressions[i], node);
      };
    },
    5718: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArgumentPlaceholder = function() {
        this.token("?");
      }, exports.ArrayPattern = exports.ArrayExpression = function(node) {
        const elems = node.elements, len = elems.length;
        this.token("["), this.printInnerComments(node);
        for (let i = 0; i < elems.length; i++) {
          const elem = elems[i];
          elem ? (i > 0 && this.space(), this.print(elem, node), i < len - 1 && this.token(",")) : this.token(",");
        }
        this.token("]");
      }, exports.BigIntLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.word(raw);
        this.word(node.value + "n");
      }, exports.BooleanLiteral = function(node) {
        this.word(node.value ? "true" : "false");
      }, exports.DecimalLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.word(raw);
        this.word(node.value + "m");
      }, exports.Identifier = function(node) {
        this.exactSource(node.loc, (() => {
          this.word(node.name);
        }));
      }, exports.NullLiteral = function() {
        this.word("null");
      }, exports.NumericLiteral = function(node) {
        const raw = this.getPossibleRaw(node), opts = this.format.jsescOption, value = node.value + "";
        opts.numbers ? this.number(_jsesc(node.value, opts)) : null == raw ? this.number(value) : this.format.minified ? this.number(raw.length < value.length ? raw : value) : this.number(raw);
      }, exports.ObjectPattern = exports.ObjectExpression = function(node) {
        const props = node.properties;
        this.token("{"), this.printInnerComments(node), props.length && (this.space(), this.printList(props, node, {
          indent: !0,
          statement: !0
        }), this.space());
        this.token("}");
      }, exports.ObjectMethod = function(node) {
        this.printJoin(node.decorators, node), this._methodHead(node), this.space(), this.print(node.body, node);
      }, exports.ObjectProperty = function(node) {
        if (this.printJoin(node.decorators, node), node.computed) this.token("["), this.print(node.key, node), 
        this.token("]"); else {
          if (isAssignmentPattern(node.value) && isIdentifier(node.key) && node.key.name === node.value.left.name) return void this.print(node.value, node);
          if (this.print(node.key, node), node.shorthand && isIdentifier(node.key) && isIdentifier(node.value) && node.key.name === node.value.name) return;
        }
        this.token(":"), this.space(), this.print(node.value, node);
      }, exports.PipelineBareFunction = function(node) {
        this.print(node.callee, node);
      }, exports.PipelinePrimaryTopicReference = function() {
        this.token("#");
      }, exports.PipelineTopicExpression = function(node) {
        this.print(node.expression, node);
      }, exports.RecordExpression = function(node) {
        const props = node.properties;
        let startToken, endToken;
        if ("bar" === this.format.recordAndTupleSyntaxType) startToken = "{|", endToken = "|}"; else {
          if ("hash" !== this.format.recordAndTupleSyntaxType) throw new Error(`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`);
          startToken = "#{", endToken = "}";
        }
        this.token(startToken), this.printInnerComments(node), props.length && (this.space(), 
        this.printList(props, node, {
          indent: !0,
          statement: !0
        }), this.space());
        this.token(endToken);
      }, exports.RegExpLiteral = function(node) {
        this.word(`/${node.pattern}/${node.flags}`);
      }, exports.SpreadElement = exports.RestElement = function(node) {
        this.token("..."), this.print(node.argument, node);
      }, exports.StringLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.token(raw);
        const val = _jsesc(node.value, Object.assign(this.format.jsescOption, this.format.jsonCompatibleStrings && {
          json: !0
        }));
        return this.token(val);
      }, exports.TopicReference = function() {
        const {topicToken} = this.format;
        if (!validTopicTokenSet.has(topicToken)) {
          const givenTopicTokenJSON = JSON.stringify(topicToken), validTopics = Array.from(validTopicTokenSet, (v => JSON.stringify(v)));
          throw new Error(`The "topicToken" generator option must be one of ${validTopics.join(", ")} (${givenTopicTokenJSON} received instead).`);
        }
        this.token(topicToken);
      }, exports.TupleExpression = function(node) {
        const elems = node.elements, len = elems.length;
        let startToken, endToken;
        if ("bar" === this.format.recordAndTupleSyntaxType) startToken = "[|", endToken = "|]"; else {
          if ("hash" !== this.format.recordAndTupleSyntaxType) throw new Error(`${this.format.recordAndTupleSyntaxType} is not a valid recordAndTuple syntax type`);
          startToken = "#[", endToken = "]";
        }
        this.token(startToken), this.printInnerComments(node);
        for (let i = 0; i < elems.length; i++) {
          const elem = elems[i];
          elem && (i > 0 && this.space(), this.print(elem, node), i < len - 1 && this.token(","));
        }
        this.token(endToken);
      };
      var _t = __webpack_require__(7289), _jsesc = __webpack_require__(3312);
      const {isAssignmentPattern, isIdentifier} = _t;
      const validTopicTokenSet = new Set([ "^^", "@@", "^", "%", "#" ]);
    },
    2043: (__unused_webpack_module, exports) => {
      "use strict";
      function tokenIfPlusMinus(self, tok) {
        !0 !== tok && self.token(tok);
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.TSAnyKeyword = function() {
        this.word("any");
      }, exports.TSArrayType = function(node) {
        this.print(node.elementType, node), this.token("[]");
      }, exports.TSAsExpression = function(node) {
        const {expression, typeAnnotation} = node;
        this.print(expression, node), this.space(), this.word("as"), this.space(), this.print(typeAnnotation, node);
      }, exports.TSBigIntKeyword = function() {
        this.word("bigint");
      }, exports.TSBooleanKeyword = function() {
        this.word("boolean");
      }, exports.TSCallSignatureDeclaration = function(node) {
        this.tsPrintSignatureDeclarationBase(node), this.token(";");
      }, exports.TSConditionalType = function(node) {
        this.print(node.checkType), this.space(), this.word("extends"), this.space(), this.print(node.extendsType), 
        this.space(), this.token("?"), this.space(), this.print(node.trueType), this.space(), 
        this.token(":"), this.space(), this.print(node.falseType);
      }, exports.TSConstructSignatureDeclaration = function(node) {
        this.word("new"), this.space(), this.tsPrintSignatureDeclarationBase(node), this.token(";");
      }, exports.TSConstructorType = function(node) {
        node.abstract && (this.word("abstract"), this.space());
        this.word("new"), this.space(), this.tsPrintFunctionOrConstructorType(node);
      }, exports.TSDeclareFunction = function(node) {
        node.declare && (this.word("declare"), this.space());
        this._functionHead(node), this.token(";");
      }, exports.TSDeclareMethod = function(node) {
        this._classMethodHead(node), this.token(";");
      }, exports.TSEnumDeclaration = function(node) {
        const {declare, const: isConst, id, members} = node;
        declare && (this.word("declare"), this.space());
        isConst && (this.word("const"), this.space());
        this.word("enum"), this.space(), this.print(id, node), this.space(), this.tsPrintBraced(members, node);
      }, exports.TSEnumMember = function(node) {
        const {id, initializer} = node;
        this.print(id, node), initializer && (this.space(), this.token("="), this.space(), 
        this.print(initializer, node));
        this.token(",");
      }, exports.TSExportAssignment = function(node) {
        this.word("export"), this.space(), this.token("="), this.space(), this.print(node.expression, node), 
        this.token(";");
      }, exports.TSExpressionWithTypeArguments = function(node) {
        this.print(node.expression, node), this.print(node.typeParameters, node);
      }, exports.TSExternalModuleReference = function(node) {
        this.token("require("), this.print(node.expression, node), this.token(")");
      }, exports.TSFunctionType = function(node) {
        this.tsPrintFunctionOrConstructorType(node);
      }, exports.TSImportEqualsDeclaration = function(node) {
        const {isExport, id, moduleReference} = node;
        isExport && (this.word("export"), this.space());
        this.word("import"), this.space(), this.print(id, node), this.space(), this.token("="), 
        this.space(), this.print(moduleReference, node), this.token(";");
      }, exports.TSImportType = function(node) {
        const {argument, qualifier, typeParameters} = node;
        this.word("import"), this.token("("), this.print(argument, node), this.token(")"), 
        qualifier && (this.token("."), this.print(qualifier, node));
        typeParameters && this.print(typeParameters, node);
      }, exports.TSIndexSignature = function(node) {
        const {readonly, static: isStatic} = node;
        isStatic && (this.word("static"), this.space());
        readonly && (this.word("readonly"), this.space());
        this.token("["), this._parameters(node.parameters, node), this.token("]"), this.print(node.typeAnnotation, node), 
        this.token(";");
      }, exports.TSIndexedAccessType = function(node) {
        this.print(node.objectType, node), this.token("["), this.print(node.indexType, node), 
        this.token("]");
      }, exports.TSInferType = function(node) {
        this.token("infer"), this.space(), this.print(node.typeParameter);
      }, exports.TSInterfaceBody = function(node) {
        this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
      }, exports.TSInterfaceDeclaration = function(node) {
        const {declare, id, typeParameters, extends: extendz, body} = node;
        declare && (this.word("declare"), this.space());
        this.word("interface"), this.space(), this.print(id, node), this.print(typeParameters, node), 
        null != extendz && extendz.length && (this.space(), this.word("extends"), this.space(), 
        this.printList(extendz, node));
        this.space(), this.print(body, node);
      }, exports.TSIntersectionType = function(node) {
        this.tsPrintUnionOrIntersectionType(node, "&");
      }, exports.TSIntrinsicKeyword = function() {
        this.word("intrinsic");
      }, exports.TSLiteralType = function(node) {
        this.print(node.literal, node);
      }, exports.TSMappedType = function(node) {
        const {nameType, optional, readonly, typeParameter} = node;
        this.token("{"), this.space(), readonly && (tokenIfPlusMinus(this, readonly), this.word("readonly"), 
        this.space());
        this.token("["), this.word(typeParameter.name), this.space(), this.word("in"), this.space(), 
        this.print(typeParameter.constraint, typeParameter), nameType && (this.space(), 
        this.word("as"), this.space(), this.print(nameType, node));
        this.token("]"), optional && (tokenIfPlusMinus(this, optional), this.token("?"));
        this.token(":"), this.space(), this.print(node.typeAnnotation, node), this.space(), 
        this.token("}");
      }, exports.TSMethodSignature = function(node) {
        const {kind} = node;
        "set" !== kind && "get" !== kind || (this.word(kind), this.space());
        this.tsPrintPropertyOrMethodName(node), this.tsPrintSignatureDeclarationBase(node), 
        this.token(";");
      }, exports.TSModuleBlock = function(node) {
        this.tsPrintBraced(node.body, node);
      }, exports.TSModuleDeclaration = function(node) {
        const {declare, id} = node;
        declare && (this.word("declare"), this.space());
        node.global || (this.word("Identifier" === id.type ? "namespace" : "module"), this.space());
        if (this.print(id, node), !node.body) return void this.token(";");
        let body = node.body;
        for (;"TSModuleDeclaration" === body.type; ) this.token("."), this.print(body.id, body), 
        body = body.body;
        this.space(), this.print(body, node);
      }, exports.TSNamedTupleMember = function(node) {
        this.print(node.label, node), node.optional && this.token("?");
        this.token(":"), this.space(), this.print(node.elementType, node);
      }, exports.TSNamespaceExportDeclaration = function(node) {
        this.word("export"), this.space(), this.word("as"), this.space(), this.word("namespace"), 
        this.space(), this.print(node.id, node);
      }, exports.TSNeverKeyword = function() {
        this.word("never");
      }, exports.TSNonNullExpression = function(node) {
        this.print(node.expression, node), this.token("!");
      }, exports.TSNullKeyword = function() {
        this.word("null");
      }, exports.TSNumberKeyword = function() {
        this.word("number");
      }, exports.TSObjectKeyword = function() {
        this.word("object");
      }, exports.TSOptionalType = function(node) {
        this.print(node.typeAnnotation, node), this.token("?");
      }, exports.TSParameterProperty = function(node) {
        node.accessibility && (this.word(node.accessibility), this.space());
        node.readonly && (this.word("readonly"), this.space());
        this._param(node.parameter);
      }, exports.TSParenthesizedType = function(node) {
        this.token("("), this.print(node.typeAnnotation, node), this.token(")");
      }, exports.TSPropertySignature = function(node) {
        const {readonly, initializer} = node;
        readonly && (this.word("readonly"), this.space());
        this.tsPrintPropertyOrMethodName(node), this.print(node.typeAnnotation, node), initializer && (this.space(), 
        this.token("="), this.space(), this.print(initializer, node));
        this.token(";");
      }, exports.TSQualifiedName = function(node) {
        this.print(node.left, node), this.token("."), this.print(node.right, node);
      }, exports.TSRestType = function(node) {
        this.token("..."), this.print(node.typeAnnotation, node);
      }, exports.TSStringKeyword = function() {
        this.word("string");
      }, exports.TSSymbolKeyword = function() {
        this.word("symbol");
      }, exports.TSThisType = function() {
        this.word("this");
      }, exports.TSTupleType = function(node) {
        this.token("["), this.printList(node.elementTypes, node), this.token("]");
      }, exports.TSTypeAliasDeclaration = function(node) {
        const {declare, id, typeParameters, typeAnnotation} = node;
        declare && (this.word("declare"), this.space());
        this.word("type"), this.space(), this.print(id, node), this.print(typeParameters, node), 
        this.space(), this.token("="), this.space(), this.print(typeAnnotation, node), this.token(";");
      }, exports.TSTypeAnnotation = function(node) {
        this.token(":"), this.space(), node.optional && this.token("?");
        this.print(node.typeAnnotation, node);
      }, exports.TSTypeAssertion = function(node) {
        const {typeAnnotation, expression} = node;
        this.token("<"), this.print(typeAnnotation, node), this.token(">"), this.space(), 
        this.print(expression, node);
      }, exports.TSTypeLiteral = function(node) {
        this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
      }, exports.TSTypeOperator = function(node) {
        this.word(node.operator), this.space(), this.print(node.typeAnnotation, node);
      }, exports.TSTypeParameter = function(node) {
        this.word(node.name), node.constraint && (this.space(), this.word("extends"), this.space(), 
        this.print(node.constraint, node));
        node.default && (this.space(), this.token("="), this.space(), this.print(node.default, node));
      }, exports.TSTypeParameterDeclaration = exports.TSTypeParameterInstantiation = function(node, parent) {
        this.token("<"), this.printList(node.params, node, {}), "ArrowFunctionExpression" === parent.type && 1 === node.params.length && this.token(",");
        this.token(">");
      }, exports.TSTypePredicate = function(node) {
        node.asserts && (this.word("asserts"), this.space());
        this.print(node.parameterName), node.typeAnnotation && (this.space(), this.word("is"), 
        this.space(), this.print(node.typeAnnotation.typeAnnotation));
      }, exports.TSTypeQuery = function(node) {
        this.word("typeof"), this.space(), this.print(node.exprName);
      }, exports.TSTypeReference = function(node) {
        this.print(node.typeName, node), this.print(node.typeParameters, node);
      }, exports.TSUndefinedKeyword = function() {
        this.word("undefined");
      }, exports.TSUnionType = function(node) {
        this.tsPrintUnionOrIntersectionType(node, "|");
      }, exports.TSUnknownKeyword = function() {
        this.word("unknown");
      }, exports.TSVoidKeyword = function() {
        this.word("void");
      }, exports.tsPrintBraced = function(members, node) {
        if (this.token("{"), members.length) {
          this.indent(), this.newline();
          for (const member of members) this.print(member, node), this.newline();
          this.dedent(), this.rightBrace();
        } else this.token("}");
      }, exports.tsPrintClassMemberModifiers = function(node, isField) {
        isField && node.declare && (this.word("declare"), this.space());
        node.accessibility && (this.word(node.accessibility), this.space());
        node.static && (this.word("static"), this.space());
        node.override && (this.word("override"), this.space());
        node.abstract && (this.word("abstract"), this.space());
        isField && node.readonly && (this.word("readonly"), this.space());
      }, exports.tsPrintFunctionOrConstructorType = function(node) {
        const {typeParameters} = node, parameters = node.parameters;
        this.print(typeParameters, node), this.token("("), this._parameters(parameters, node), 
        this.token(")"), this.space(), this.token("=>"), this.space();
        const returnType = node.typeAnnotation;
        this.print(returnType.typeAnnotation, node);
      }, exports.tsPrintPropertyOrMethodName = function(node) {
        node.computed && this.token("[");
        this.print(node.key, node), node.computed && this.token("]");
        node.optional && this.token("?");
      }, exports.tsPrintSignatureDeclarationBase = function(node) {
        const {typeParameters} = node, parameters = node.parameters;
        this.print(typeParameters, node), this.token("("), this._parameters(parameters, node), 
        this.token(")");
        const returnType = node.typeAnnotation;
        this.print(returnType, node);
      }, exports.tsPrintTypeLiteralOrInterfaceBody = function(members, node) {
        this.tsPrintBraced(members, node);
      }, exports.tsPrintUnionOrIntersectionType = function(node, sep) {
        this.printJoin(node.types, node, {
          separator() {
            this.space(), this.token(sep), this.space();
          }
        });
      };
    },
    9166: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.CodeGenerator = void 0, exports.default = function(ast, opts, code) {
        return new Generator(ast, opts, code).generate();
      };
      var _sourceMap = __webpack_require__(7853), _printer = __webpack_require__(3105);
      class Generator extends _printer.default {
        constructor(ast, opts = {}, code) {
          const format = function(code, opts) {
            const format = {
              auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
              auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
              shouldPrintComment: opts.shouldPrintComment,
              retainLines: opts.retainLines,
              retainFunctionParens: opts.retainFunctionParens,
              comments: null == opts.comments || opts.comments,
              compact: opts.compact,
              minified: opts.minified,
              concise: opts.concise,
              indent: {
                adjustMultilineComment: !0,
                style: "  ",
                base: 0
              },
              decoratorsBeforeExport: !!opts.decoratorsBeforeExport,
              jsescOption: Object.assign({
                quotes: "double",
                wrap: !0,
                minimal: !1
              }, opts.jsescOption),
              recordAndTupleSyntaxType: opts.recordAndTupleSyntaxType,
              topicToken: opts.topicToken
            };
            format.jsonCompatibleStrings = opts.jsonCompatibleStrings, format.minified ? (format.compact = !0, 
            format.shouldPrintComment = format.shouldPrintComment || (() => format.comments)) : format.shouldPrintComment = format.shouldPrintComment || (value => format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0);
            "auto" === format.compact && (format.compact = code.length > 5e5, format.compact && console.error(`[BABEL] Note: The code generator has deoptimised the styling of ${opts.filename} as it exceeds the max of 500KB.`));
            format.compact && (format.indent.adjustMultilineComment = !1);
            return format;
          }(code, opts);
          super(format, opts.sourceMaps ? new _sourceMap.default(opts, code) : null), this.ast = void 0, 
          this.ast = ast;
        }
        generate() {
          return super.generate(this.ast);
        }
      }
      exports.CodeGenerator = class {
        constructor(ast, opts, code) {
          this._generator = void 0, this._generator = new Generator(ast, opts, code);
        }
        generate() {
          return this._generator.generate();
        }
      };
    },
    2866: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.needsParens = function(node, parent, printStack) {
        if (!parent) return !1;
        if (isNewExpression(parent) && parent.callee === node && isOrHasCallExpression(node)) return !0;
        return find(expandedParens, node, parent, printStack);
      }, exports.needsWhitespace = needsWhitespace, exports.needsWhitespaceAfter = function(node, parent) {
        return needsWhitespace(node, parent, "after");
      }, exports.needsWhitespaceBefore = function(node, parent) {
        return needsWhitespace(node, parent, "before");
      };
      var whitespace = __webpack_require__(4114), parens = __webpack_require__(2514), _t = __webpack_require__(7289);
      const {FLIPPED_ALIAS_KEYS, isCallExpression, isExpressionStatement, isMemberExpression, isNewExpression} = _t;
      function expandAliases(obj) {
        const newObj = {};
        function add(type, func) {
          const fn = newObj[type];
          newObj[type] = fn ? function(node, parent, stack) {
            const result = fn(node, parent, stack);
            return null == result ? func(node, parent, stack) : result;
          } : func;
        }
        for (const type of Object.keys(obj)) {
          const aliases = FLIPPED_ALIAS_KEYS[type];
          if (aliases) for (const alias of aliases) add(alias, obj[type]); else add(type, obj[type]);
        }
        return newObj;
      }
      const expandedParens = expandAliases(parens), expandedWhitespaceNodes = expandAliases(whitespace.nodes), expandedWhitespaceList = expandAliases(whitespace.list);
      function find(obj, node, parent, printStack) {
        const fn = obj[node.type];
        return fn ? fn(node, parent, printStack) : null;
      }
      function isOrHasCallExpression(node) {
        return !!isCallExpression(node) || isMemberExpression(node) && isOrHasCallExpression(node.object);
      }
      function needsWhitespace(node, parent, type) {
        if (!node) return 0;
        isExpressionStatement(node) && (node = node.expression);
        let linesInfo = find(expandedWhitespaceNodes, node, parent);
        if (!linesInfo) {
          const items = find(expandedWhitespaceList, node, parent);
          if (items) for (let i = 0; i < items.length && (linesInfo = needsWhitespace(items[i], node, type), 
          !linesInfo); i++) ;
        }
        return "object" == typeof linesInfo && null !== linesInfo && linesInfo[type] || 0;
      }
    },
    2514: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArrowFunctionExpression = function(node, parent) {
        return isExportDeclaration(parent) || ConditionalExpression(node, parent);
      }, exports.AssignmentExpression = function(node, parent) {
        return !!isObjectPattern(node.left) || ConditionalExpression(node, parent);
      }, exports.Binary = function(node, parent) {
        if ("**" === node.operator && isBinaryExpression(parent, {
          operator: "**"
        })) return parent.left === node;
        if (isClassExtendsClause(node, parent)) return !0;
        if (hasPostfixPart(node, parent) || isUnaryLike(parent) || isAwaitExpression(parent)) return !0;
        if (isBinary(parent)) {
          const parentOp = parent.operator, parentPos = PRECEDENCE[parentOp], nodeOp = node.operator, nodePos = PRECEDENCE[nodeOp];
          if (parentPos === nodePos && parent.right === node && !isLogicalExpression(parent) || parentPos > nodePos) return !0;
        }
      }, exports.BinaryExpression = function(node, parent) {
        return "in" === node.operator && (isVariableDeclarator(parent) || isFor(parent));
      }, exports.ClassExpression = function(node, parent, printStack) {
        return isFirstInContext(printStack, {
          expressionStatement: !0,
          exportDefault: !0
        });
      }, exports.ConditionalExpression = ConditionalExpression, exports.DoExpression = function(node, parent, printStack) {
        return !node.async && isFirstInContext(printStack, {
          expressionStatement: !0
        });
      }, exports.FunctionExpression = function(node, parent, printStack) {
        return isFirstInContext(printStack, {
          expressionStatement: !0,
          exportDefault: !0
        });
      }, exports.FunctionTypeAnnotation = function(node, parent, printStack) {
        return isUnionTypeAnnotation(parent) || isIntersectionTypeAnnotation(parent) || isArrayTypeAnnotation(parent) || isTypeAnnotation(parent) && isArrowFunctionExpression(printStack[printStack.length - 3]);
      }, exports.Identifier = function(node, parent, printStack) {
        if ("let" === node.name) {
          const isFollowedByBracket = isMemberExpression(parent, {
            object: node,
            computed: !0
          }) || isOptionalMemberExpression(parent, {
            object: node,
            computed: !0,
            optional: !1
          });
          return isFirstInContext(printStack, {
            expressionStatement: isFollowedByBracket,
            forHead: isFollowedByBracket,
            forInHead: isFollowedByBracket,
            forOfHead: !0
          });
        }
        return "async" === node.name && isForOfStatement(parent) && node === parent.left;
      }, exports.LogicalExpression = function(node, parent) {
        switch (node.operator) {
         case "||":
          return !!isLogicalExpression(parent) && ("??" === parent.operator || "&&" === parent.operator);

         case "&&":
          return isLogicalExpression(parent, {
            operator: "??"
          });

         case "??":
          return isLogicalExpression(parent) && "??" !== parent.operator;
        }
      }, exports.NullableTypeAnnotation = function(node, parent) {
        return isArrayTypeAnnotation(parent);
      }, exports.ObjectExpression = function(node, parent, printStack) {
        return isFirstInContext(printStack, {
          expressionStatement: !0,
          arrowBody: !0
        });
      }, exports.OptionalIndexedAccessType = function(node, parent) {
        return isIndexedAccessType(parent, {
          objectType: node
        });
      }, exports.OptionalCallExpression = exports.OptionalMemberExpression = function(node, parent) {
        return isCallExpression(parent, {
          callee: node
        }) || isMemberExpression(parent, {
          object: node
        });
      }, exports.SequenceExpression = function(node, parent) {
        if (isForStatement(parent) || isThrowStatement(parent) || isReturnStatement(parent) || isIfStatement(parent) && parent.test === node || isWhileStatement(parent) && parent.test === node || isForInStatement(parent) && parent.right === node || isSwitchStatement(parent) && parent.discriminant === node || isExpressionStatement(parent) && parent.expression === node) return !1;
        return !0;
      }, exports.TSAsExpression = function() {
        return !0;
      }, exports.TSInferType = function(node, parent) {
        return isTSArrayType(parent) || isTSOptionalType(parent);
      }, exports.TSTypeAssertion = function() {
        return !0;
      }, exports.TSIntersectionType = exports.TSUnionType = function(node, parent) {
        return isTSArrayType(parent) || isTSOptionalType(parent) || isTSIntersectionType(parent) || isTSUnionType(parent) || isTSRestType(parent);
      }, exports.UnaryLike = UnaryLike, exports.IntersectionTypeAnnotation = exports.UnionTypeAnnotation = function(node, parent) {
        return isArrayTypeAnnotation(parent) || isNullableTypeAnnotation(parent) || isIntersectionTypeAnnotation(parent) || isUnionTypeAnnotation(parent);
      }, exports.UpdateExpression = function(node, parent) {
        return hasPostfixPart(node, parent) || isClassExtendsClause(node, parent);
      }, exports.AwaitExpression = exports.YieldExpression = function(node, parent) {
        return isBinary(parent) || isUnaryLike(parent) || hasPostfixPart(node, parent) || isAwaitExpression(parent) && isYieldExpression(node) || isConditionalExpression(parent) && node === parent.test || isClassExtendsClause(node, parent);
      };
      var _t = __webpack_require__(7289);
      const {isArrayTypeAnnotation, isArrowFunctionExpression, isAssignmentExpression, isAwaitExpression, isBinary, isBinaryExpression, isCallExpression, isClassDeclaration, isClassExpression, isConditional, isConditionalExpression, isExportDeclaration, isExportDefaultDeclaration, isExpressionStatement, isFor, isForInStatement, isForOfStatement, isForStatement, isIfStatement, isIndexedAccessType, isIntersectionTypeAnnotation, isLogicalExpression, isMemberExpression, isNewExpression, isNullableTypeAnnotation, isObjectPattern, isOptionalCallExpression, isOptionalMemberExpression, isReturnStatement, isSequenceExpression, isSwitchStatement, isTSArrayType, isTSAsExpression, isTSIntersectionType, isTSNonNullExpression, isTSOptionalType, isTSRestType, isTSTypeAssertion, isTSUnionType, isTaggedTemplateExpression, isThrowStatement, isTypeAnnotation, isUnaryLike, isUnionTypeAnnotation, isVariableDeclarator, isWhileStatement, isYieldExpression} = _t, PRECEDENCE = {
        "||": 0,
        "??": 0,
        "&&": 1,
        "|": 2,
        "^": 3,
        "&": 4,
        "==": 5,
        "===": 5,
        "!=": 5,
        "!==": 5,
        "<": 6,
        ">": 6,
        "<=": 6,
        ">=": 6,
        in: 6,
        instanceof: 6,
        ">>": 7,
        "<<": 7,
        ">>>": 7,
        "+": 8,
        "-": 8,
        "*": 9,
        "/": 9,
        "%": 9,
        "**": 10
      }, isClassExtendsClause = (node, parent) => (isClassDeclaration(parent) || isClassExpression(parent)) && parent.superClass === node, hasPostfixPart = (node, parent) => (isMemberExpression(parent) || isOptionalMemberExpression(parent)) && parent.object === node || (isCallExpression(parent) || isOptionalCallExpression(parent) || isNewExpression(parent)) && parent.callee === node || isTaggedTemplateExpression(parent) && parent.tag === node || isTSNonNullExpression(parent);
      function UnaryLike(node, parent) {
        return hasPostfixPart(node, parent) || isBinaryExpression(parent, {
          operator: "**",
          left: node
        }) || isClassExtendsClause(node, parent);
      }
      function ConditionalExpression(node, parent) {
        return !!(isUnaryLike(parent) || isBinary(parent) || isConditionalExpression(parent, {
          test: node
        }) || isAwaitExpression(parent) || isTSTypeAssertion(parent) || isTSAsExpression(parent)) || UnaryLike(node, parent);
      }
      function isFirstInContext(printStack, {expressionStatement = !1, arrowBody = !1, exportDefault = !1, forHead = !1, forInHead = !1, forOfHead = !1}) {
        let i = printStack.length - 1, node = printStack[i];
        i--;
        let parent = printStack[i];
        for (;i >= 0; ) {
          if (expressionStatement && isExpressionStatement(parent, {
            expression: node
          }) || exportDefault && isExportDefaultDeclaration(parent, {
            declaration: node
          }) || arrowBody && isArrowFunctionExpression(parent, {
            body: node
          }) || forHead && isForStatement(parent, {
            init: node
          }) || forInHead && isForInStatement(parent, {
            left: node
          }) || forOfHead && isForOfStatement(parent, {
            left: node
          })) return !0;
          if (!(hasPostfixPart(node, parent) && !isNewExpression(parent) || isSequenceExpression(parent) && parent.expressions[0] === node || isConditional(parent, {
            test: node
          }) || isBinary(parent, {
            left: node
          }) || isAssignmentExpression(parent, {
            left: node
          }))) return !1;
          node = parent, i--, parent = printStack[i];
        }
        return !1;
      }
    },
    4114: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.nodes = exports.list = void 0;
      var _t = __webpack_require__(7289);
      const {FLIPPED_ALIAS_KEYS, isArrayExpression, isAssignmentExpression, isBinary, isBlockStatement, isCallExpression, isFunction, isIdentifier, isLiteral, isMemberExpression, isObjectExpression, isOptionalCallExpression, isOptionalMemberExpression, isStringLiteral} = _t;
      function crawl(node, state = {}) {
        return isMemberExpression(node) || isOptionalMemberExpression(node) ? (crawl(node.object, state), 
        node.computed && crawl(node.property, state)) : isBinary(node) || isAssignmentExpression(node) ? (crawl(node.left, state), 
        crawl(node.right, state)) : isCallExpression(node) || isOptionalCallExpression(node) ? (state.hasCall = !0, 
        crawl(node.callee, state)) : isFunction(node) ? state.hasFunction = !0 : isIdentifier(node) && (state.hasHelper = state.hasHelper || isHelper(node.callee)), 
        state;
      }
      function isHelper(node) {
        return isMemberExpression(node) ? isHelper(node.object) || isHelper(node.property) : isIdentifier(node) ? "require" === node.name || "_" === node.name[0] : isCallExpression(node) ? isHelper(node.callee) : !(!isBinary(node) && !isAssignmentExpression(node)) && (isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right));
      }
      function isType(node) {
        return isLiteral(node) || isObjectExpression(node) || isArrayExpression(node) || isIdentifier(node) || isMemberExpression(node);
      }
      const nodes = {
        AssignmentExpression(node) {
          const state = crawl(node.right);
          if (state.hasCall && state.hasHelper || state.hasFunction) return {
            before: state.hasFunction,
            after: !0
          };
        },
        SwitchCase: (node, parent) => ({
          before: !!node.consequent.length || parent.cases[0] === node,
          after: !node.consequent.length && parent.cases[parent.cases.length - 1] === node
        }),
        LogicalExpression(node) {
          if (isFunction(node.left) || isFunction(node.right)) return {
            after: !0
          };
        },
        Literal(node) {
          if (isStringLiteral(node) && "use strict" === node.value) return {
            after: !0
          };
        },
        CallExpression(node) {
          if (isFunction(node.callee) || isHelper(node)) return {
            before: !0,
            after: !0
          };
        },
        OptionalCallExpression(node) {
          if (isFunction(node.callee)) return {
            before: !0,
            after: !0
          };
        },
        VariableDeclaration(node) {
          for (let i = 0; i < node.declarations.length; i++) {
            const declar = node.declarations[i];
            let enabled = isHelper(declar.id) && !isType(declar.init);
            if (!enabled) {
              const state = crawl(declar.init);
              enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
            }
            if (enabled) return {
              before: !0,
              after: !0
            };
          }
        },
        IfStatement(node) {
          if (isBlockStatement(node.consequent)) return {
            before: !0,
            after: !0
          };
        }
      };
      exports.nodes = nodes, nodes.ObjectProperty = nodes.ObjectTypeProperty = nodes.ObjectMethod = function(node, parent) {
        if (parent.properties[0] === node) return {
          before: !0
        };
      }, nodes.ObjectTypeCallProperty = function(node, parent) {
        var _parent$properties;
        if (parent.callProperties[0] === node && (null == (_parent$properties = parent.properties) || !_parent$properties.length)) return {
          before: !0
        };
      }, nodes.ObjectTypeIndexer = function(node, parent) {
        var _parent$properties2, _parent$callPropertie;
        if (!(parent.indexers[0] !== node || null != (_parent$properties2 = parent.properties) && _parent$properties2.length || null != (_parent$callPropertie = parent.callProperties) && _parent$callPropertie.length)) return {
          before: !0
        };
      }, nodes.ObjectTypeInternalSlot = function(node, parent) {
        var _parent$properties3, _parent$callPropertie2, _parent$indexers;
        if (!(parent.internalSlots[0] !== node || null != (_parent$properties3 = parent.properties) && _parent$properties3.length || null != (_parent$callPropertie2 = parent.callProperties) && _parent$callPropertie2.length || null != (_parent$indexers = parent.indexers) && _parent$indexers.length)) return {
          before: !0
        };
      };
      const list = {
        VariableDeclaration: node => node.declarations.map((decl => decl.init)),
        ArrayExpression: node => node.elements,
        ObjectExpression: node => node.properties
      };
      exports.list = list, [ [ "Function", !0 ], [ "Class", !0 ], [ "Loop", !0 ], [ "LabeledStatement", !0 ], [ "SwitchStatement", !0 ], [ "TryStatement", !0 ] ].forEach((function([type, amounts]) {
        "boolean" == typeof amounts && (amounts = {
          after: amounts,
          before: amounts
        }), [ type ].concat(FLIPPED_ALIAS_KEYS[type] || []).forEach((function(type) {
          nodes[type] = function() {
            return amounts;
          };
        }));
      }));
    },
    3105: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _buffer = __webpack_require__(8649), n = __webpack_require__(2866), _t = __webpack_require__(7289), generatorFunctions = __webpack_require__(8217);
      const {isProgram, isFile, isEmptyStatement} = _t, SCIENTIFIC_NOTATION = /e/i, ZERO_DECIMAL_INTEGER = /\.0+$/, NON_DECIMAL_LITERAL = /^0[box]/, PURE_ANNOTATION_RE = /^\s*[@#]__PURE__\s*$/, {needsParens, needsWhitespaceAfter, needsWhitespaceBefore} = n;
      class Printer {
        constructor(format, map) {
          this.inForStatementInitCounter = 0, this._printStack = [], this._indent = 0, this._insideAux = !1, 
          this._parenPushNewlineState = null, this._noLineTerminator = !1, this._printAuxAfterOnNextUserNode = !1, 
          this._printedComments = new WeakSet, this._endsWithInteger = !1, this._endsWithWord = !1, 
          this.format = format, this._buf = new _buffer.default(map);
        }
        generate(ast) {
          return this.print(ast), this._maybeAddAuxComment(), this._buf.get();
        }
        indent() {
          this.format.compact || this.format.concise || this._indent++;
        }
        dedent() {
          this.format.compact || this.format.concise || this._indent--;
        }
        semicolon(force = !1) {
          this._maybeAddAuxComment(), this._append(";", !force);
        }
        rightBrace() {
          this.format.minified && this._buf.removeLastSemicolon(), this.token("}");
        }
        space(force = !1) {
          if (!this.format.compact) if (force) this._space(); else if (this._buf.hasContent()) {
            const lastCp = this.getLastChar();
            32 !== lastCp && 10 !== lastCp && this._space();
          }
        }
        word(str) {
          (this._endsWithWord || this.endsWith(47) && 47 === str.charCodeAt(0)) && this._space(), 
          this._maybeAddAuxComment(), this._append(str), this._endsWithWord = !0;
        }
        number(str) {
          this.word(str), this._endsWithInteger = Number.isInteger(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && 46 !== str.charCodeAt(str.length - 1);
        }
        token(str) {
          const lastChar = this.getLastChar(), strFirst = str.charCodeAt(0);
          ("--" === str && 33 === lastChar || 43 === strFirst && 43 === lastChar || 45 === strFirst && 45 === lastChar || 46 === strFirst && this._endsWithInteger) && this._space(), 
          this._maybeAddAuxComment(), this._append(str);
        }
        newline(i = 1) {
          if (this.format.retainLines || this.format.compact) return;
          if (this.format.concise) return void this.space();
          const charBeforeNewline = this.endsWithCharAndNewline();
          if (10 !== charBeforeNewline && (123 !== charBeforeNewline && 58 !== charBeforeNewline || i--, 
          !(i <= 0))) for (let j = 0; j < i; j++) this._newline();
        }
        endsWith(char) {
          return this.getLastChar() === char;
        }
        getLastChar() {
          return this._buf.getLastChar();
        }
        endsWithCharAndNewline() {
          return this._buf.endsWithCharAndNewline();
        }
        removeTrailingNewline() {
          this._buf.removeTrailingNewline();
        }
        exactSource(loc, cb) {
          this._catchUp("start", loc), this._buf.exactSource(loc, cb);
        }
        source(prop, loc) {
          this._catchUp(prop, loc), this._buf.source(prop, loc);
        }
        withSource(prop, loc, cb) {
          this._catchUp(prop, loc), this._buf.withSource(prop, loc, cb);
        }
        _space() {
          this._append(" ", !0);
        }
        _newline() {
          this._append("\n", !0);
        }
        _append(str, queue = !1) {
          this._maybeAddParen(str), this._maybeIndent(str), queue ? this._buf.queue(str) : this._buf.append(str), 
          this._endsWithWord = !1, this._endsWithInteger = !1;
        }
        _maybeIndent(str) {
          this._indent && this.endsWith(10) && 10 !== str.charCodeAt(0) && this._buf.queueIndentation(this._getIndent());
        }
        _maybeAddParen(str) {
          const parenPushNewlineState = this._parenPushNewlineState;
          if (!parenPushNewlineState) return;
          let i;
          for (i = 0; i < str.length && " " === str[i]; i++) continue;
          if (i === str.length) return;
          const cha = str[i];
          if ("\n" !== cha) {
            if ("/" !== cha || i + 1 === str.length) return void (this._parenPushNewlineState = null);
            const chaPost = str[i + 1];
            if ("*" === chaPost) {
              if (PURE_ANNOTATION_RE.test(str.slice(i + 2, str.length - 2))) return;
            } else if ("/" !== chaPost) return void (this._parenPushNewlineState = null);
          }
          this.token("("), this.indent(), parenPushNewlineState.printed = !0;
        }
        _catchUp(prop, loc) {
          if (!this.format.retainLines) return;
          const pos = loc ? loc[prop] : null;
          if (null != (null == pos ? void 0 : pos.line)) {
            const count = pos.line - this._buf.getCurrentLine();
            for (let i = 0; i < count; i++) this._newline();
          }
        }
        _getIndent() {
          return this.format.indent.style.repeat(this._indent);
        }
        startTerminatorless(isLabel = !1) {
          return isLabel ? (this._noLineTerminator = !0, null) : this._parenPushNewlineState = {
            printed: !1
          };
        }
        endTerminatorless(state) {
          this._noLineTerminator = !1, null != state && state.printed && (this.dedent(), this.newline(), 
          this.token(")"));
        }
        print(node, parent) {
          if (!node) return;
          const oldConcise = this.format.concise;
          node._compact && (this.format.concise = !0);
          const printMethod = this[node.type];
          if (!printMethod) throw new ReferenceError(`unknown node of type ${JSON.stringify(node.type)} with constructor ${JSON.stringify(null == node ? void 0 : node.constructor.name)}`);
          this._printStack.push(node);
          const oldInAux = this._insideAux;
          this._insideAux = !node.loc, this._maybeAddAuxComment(this._insideAux && !oldInAux);
          let shouldPrintParens = needsParens(node, parent, this._printStack);
          this.format.retainFunctionParens && "FunctionExpression" === node.type && node.extra && node.extra.parenthesized && (shouldPrintParens = !0), 
          shouldPrintParens && this.token("("), this._printLeadingComments(node);
          const loc = isProgram(node) || isFile(node) ? null : node.loc;
          this.withSource("start", loc, (() => {
            printMethod.call(this, node, parent);
          })), this._printTrailingComments(node), shouldPrintParens && this.token(")"), this._printStack.pop(), 
          this.format.concise = oldConcise, this._insideAux = oldInAux;
        }
        _maybeAddAuxComment(enteredPositionlessNode) {
          enteredPositionlessNode && this._printAuxBeforeComment(), this._insideAux || this._printAuxAfterComment();
        }
        _printAuxBeforeComment() {
          if (this._printAuxAfterOnNextUserNode) return;
          this._printAuxAfterOnNextUserNode = !0;
          const comment = this.format.auxiliaryCommentBefore;
          comment && this._printComment({
            type: "CommentBlock",
            value: comment
          });
        }
        _printAuxAfterComment() {
          if (!this._printAuxAfterOnNextUserNode) return;
          this._printAuxAfterOnNextUserNode = !1;
          const comment = this.format.auxiliaryCommentAfter;
          comment && this._printComment({
            type: "CommentBlock",
            value: comment
          });
        }
        getPossibleRaw(node) {
          const extra = node.extra;
          if (extra && null != extra.raw && null != extra.rawValue && node.value === extra.rawValue) return extra.raw;
        }
        printJoin(nodes, parent, opts = {}) {
          if (null == nodes || !nodes.length) return;
          opts.indent && this.indent();
          const newlineOpts = {
            addNewlines: opts.addNewlines
          };
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node && (opts.statement && this._printNewline(!0, node, parent, newlineOpts), this.print(node, parent), 
            opts.iterator && opts.iterator(node, i), opts.separator && i < nodes.length - 1 && opts.separator.call(this), 
            opts.statement && this._printNewline(!1, node, parent, newlineOpts));
          }
          opts.indent && this.dedent();
        }
        printAndIndentOnComments(node, parent) {
          const indent = node.leadingComments && node.leadingComments.length > 0;
          indent && this.indent(), this.print(node, parent), indent && this.dedent();
        }
        printBlock(parent) {
          const node = parent.body;
          isEmptyStatement(node) || this.space(), this.print(node, parent);
        }
        _printTrailingComments(node) {
          this._printComments(this._getComments(!1, node));
        }
        _printLeadingComments(node) {
          this._printComments(this._getComments(!0, node), !0);
        }
        printInnerComments(node, indent = !0) {
          var _node$innerComments;
          null != (_node$innerComments = node.innerComments) && _node$innerComments.length && (indent && this.indent(), 
          this._printComments(node.innerComments), indent && this.dedent());
        }
        printSequence(nodes, parent, opts = {}) {
          return opts.statement = !0, this.printJoin(nodes, parent, opts);
        }
        printList(items, parent, opts = {}) {
          return null == opts.separator && (opts.separator = commaSeparator), this.printJoin(items, parent, opts);
        }
        _printNewline(leading, node, parent, opts) {
          if (this.format.retainLines || this.format.compact) return;
          if (this.format.concise) return void this.space();
          let lines = 0;
          if (this._buf.hasContent()) {
            leading || lines++, opts.addNewlines && (lines += opts.addNewlines(leading, node) || 0);
            (leading ? needsWhitespaceBefore : needsWhitespaceAfter)(node, parent) && lines++;
          }
          this.newline(Math.min(2, lines));
        }
        _getComments(leading, node) {
          return node && (leading ? node.leadingComments : node.trailingComments) || [];
        }
        _printComment(comment, skipNewLines) {
          if (!this.format.shouldPrintComment(comment.value)) return;
          if (comment.ignore) return;
          if (this._printedComments.has(comment)) return;
          this._printedComments.add(comment);
          const isBlockComment = "CommentBlock" === comment.type, printNewLines = isBlockComment && !skipNewLines && !this._noLineTerminator;
          printNewLines && this._buf.hasContent() && this.newline(1);
          const lastCharCode = this.getLastChar();
          91 !== lastCharCode && 123 !== lastCharCode && this.space();
          let val = isBlockComment || this._noLineTerminator ? `/*${comment.value}*/` : `//${comment.value}\n`;
          if (isBlockComment && this.format.indent.adjustMultilineComment) {
            var _comment$loc;
            const offset = null == (_comment$loc = comment.loc) ? void 0 : _comment$loc.start.column;
            if (offset) {
              const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
              val = val.replace(newlineRegex, "\n");
            }
            const indentSize = Math.max(this._getIndent().length, this.format.retainLines ? 0 : this._buf.getCurrentColumn());
            val = val.replace(/\n(?!$)/g, `\n${" ".repeat(indentSize)}`);
          }
          this.endsWith(47) && this._space(), this.withSource("start", comment.loc, (() => {
            this._append(val);
          })), printNewLines && this.newline(1);
        }
        _printComments(comments, inlinePureAnnotation) {
          if (null != comments && comments.length) if (inlinePureAnnotation && 1 === comments.length && PURE_ANNOTATION_RE.test(comments[0].value)) this._printComment(comments[0], this._buf.hasContent() && !this.endsWith(10)); else for (const comment of comments) this._printComment(comment);
        }
        printAssertions(node) {
          var _node$assertions;
          null != (_node$assertions = node.assertions) && _node$assertions.length && (this.space(), 
          this.word("assert"), this.space(), this.token("{"), this.space(), this.printList(node.assertions, node), 
          this.space(), this.token("}"));
        }
      }
      Object.assign(Printer.prototype, generatorFunctions), Printer.prototype.Noop = function() {};
      var _default = Printer;
      function commaSeparator() {
        this.token(","), this.space();
      }
      exports.default = _default;
    },
    7853: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _genMapping = __webpack_require__(2509);
      exports.default = class {
        constructor(opts, code) {
          var _opts$sourceFileName;
          this._map = void 0, this._rawMappings = void 0, this._sourceFileName = void 0, this._lastGenLine = 0, 
          this._lastSourceLine = 0, this._lastSourceColumn = 0;
          const map = this._map = new _genMapping.GenMapping({
            sourceRoot: opts.sourceRoot
          });
          this._sourceFileName = null == (_opts$sourceFileName = opts.sourceFileName) ? void 0 : _opts$sourceFileName.replace(/\\/g, "/"), 
          this._rawMappings = void 0, "string" == typeof code ? (0, _genMapping.setSourceContent)(map, this._sourceFileName, code) : "object" == typeof code && Object.keys(code).forEach((sourceFileName => {
            (0, _genMapping.setSourceContent)(map, sourceFileName.replace(/\\/g, "/"), code[sourceFileName]);
          }));
        }
        get() {
          return (0, _genMapping.encodedMap)(this._map);
        }
        getDecoded() {
          return (0, _genMapping.decodedMap)(this._map);
        }
        getRawMappings() {
          return this._rawMappings || (this._rawMappings = (0, _genMapping.allMappings)(this._map));
        }
        mark(generated, line, column, identifierName, filename, force) {
          const generatedLine = generated.line;
          this._lastGenLine !== generatedLine && null == line || (force || this._lastGenLine !== generatedLine || this._lastSourceLine !== line || this._lastSourceColumn !== column) && (this._rawMappings = void 0, 
          this._lastGenLine = generatedLine, this._lastSourceLine = line, this._lastSourceColumn = column, 
          (0, _genMapping.addMapping)(this._map, {
            name: identifierName,
            generated,
            source: null == line ? void 0 : (null == filename ? void 0 : filename.replace(/\\/g, "/")) || this._sourceFileName,
            original: null == line ? void 0 : {
              line,
              column
            }
          }));
        }
      };
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
    1692: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, exports.skipAllButComputedKey = skipAllButComputedKey;
      var _t = __webpack_require__(7289);
      const {VISITOR_KEYS, staticBlock} = _t;
      function skipAllButComputedKey(path) {
        if (!path.node.computed) return void path.skip();
        const keys = VISITOR_KEYS[path.type];
        for (const key of keys) "key" !== key && path.skipKey(key);
      }
      var _default = {
        [(staticBlock ? "StaticBlock|" : "") + "ClassPrivateProperty|TypeAnnotation|FunctionDeclaration|FunctionExpression"]: path => path.skip(),
        "Method|ClassProperty"(path) {
          skipAllButComputedKey(path);
        }
      };
      exports.default = _default;
    },
    9503: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _assert = __webpack_require__(9491), _t = __webpack_require__(7289);
      const {callExpression, cloneNode, expressionStatement, identifier, importDeclaration, importDefaultSpecifier, importNamespaceSpecifier, importSpecifier, memberExpression, stringLiteral, variableDeclaration, variableDeclarator} = _t;
      exports.default = class {
        constructor(importedSource, scope, hub) {
          this._statements = [], this._resultName = null, this._scope = null, this._hub = null, 
          this._importedSource = void 0, this._scope = scope, this._hub = hub, this._importedSource = importedSource;
        }
        done() {
          return {
            statements: this._statements,
            resultName: this._resultName
          };
        }
        import() {
          return this._statements.push(importDeclaration([], stringLiteral(this._importedSource))), 
          this;
        }
        require() {
          return this._statements.push(expressionStatement(callExpression(identifier("require"), [ stringLiteral(this._importedSource) ]))), 
          this;
        }
        namespace(name = "namespace") {
          const local = this._scope.generateUidIdentifier(name), statement = this._statements[this._statements.length - 1];
          return _assert("ImportDeclaration" === statement.type), _assert(0 === statement.specifiers.length), 
          statement.specifiers = [ importNamespaceSpecifier(local) ], this._resultName = cloneNode(local), 
          this;
        }
        default(name) {
          name = this._scope.generateUidIdentifier(name);
          const statement = this._statements[this._statements.length - 1];
          return _assert("ImportDeclaration" === statement.type), _assert(0 === statement.specifiers.length), 
          statement.specifiers = [ importDefaultSpecifier(name) ], this._resultName = cloneNode(name), 
          this;
        }
        named(name, importName) {
          if ("default" === importName) return this.default(name);
          name = this._scope.generateUidIdentifier(name);
          const statement = this._statements[this._statements.length - 1];
          return _assert("ImportDeclaration" === statement.type), _assert(0 === statement.specifiers.length), 
          statement.specifiers = [ importSpecifier(name, identifier(importName)) ], this._resultName = cloneNode(name), 
          this;
        }
        var(name) {
          name = this._scope.generateUidIdentifier(name);
          let statement = this._statements[this._statements.length - 1];
          return "ExpressionStatement" !== statement.type && (_assert(this._resultName), statement = expressionStatement(this._resultName), 
          this._statements.push(statement)), this._statements[this._statements.length - 1] = variableDeclaration("var", [ variableDeclarator(name, statement.expression) ]), 
          this._resultName = cloneNode(name), this;
        }
        defaultInterop() {
          return this._interop(this._hub.addHelper("interopRequireDefault"));
        }
        wildcardInterop() {
          return this._interop(this._hub.addHelper("interopRequireWildcard"));
        }
        _interop(callee) {
          const statement = this._statements[this._statements.length - 1];
          return "ExpressionStatement" === statement.type ? statement.expression = callExpression(callee, [ statement.expression ]) : "VariableDeclaration" === statement.type ? (_assert(1 === statement.declarations.length), 
          statement.declarations[0].init = callExpression(callee, [ statement.declarations[0].init ])) : _assert.fail("Unexpected type."), 
          this;
        }
        prop(name) {
          const statement = this._statements[this._statements.length - 1];
          return "ExpressionStatement" === statement.type ? statement.expression = memberExpression(statement.expression, identifier(name)) : "VariableDeclaration" === statement.type ? (_assert(1 === statement.declarations.length), 
          statement.declarations[0].init = memberExpression(statement.declarations[0].init, identifier(name))) : _assert.fail("Unexpected type:" + statement.type), 
          this;
        }
        read(name) {
          this._resultName = memberExpression(this._resultName, identifier(name));
        }
      };
    },
    8694: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _assert = __webpack_require__(9491), _t = __webpack_require__(7289), _importBuilder = __webpack_require__(9503), _isModule = __webpack_require__(821);
      const {numericLiteral, sequenceExpression} = _t;
      exports.default = class {
        constructor(path, importedSource, opts) {
          this._defaultOpts = {
            importedSource: null,
            importedType: "commonjs",
            importedInterop: "babel",
            importingInterop: "babel",
            ensureLiveReference: !1,
            ensureNoContext: !1,
            importPosition: "before"
          };
          const programPath = path.find((p => p.isProgram()));
          this._programPath = programPath, this._programScope = programPath.scope, this._hub = programPath.hub, 
          this._defaultOpts = this._applyDefaults(importedSource, opts, !0);
        }
        addDefault(importedSourceIn, opts) {
          return this.addNamed("default", importedSourceIn, opts);
        }
        addNamed(importName, importedSourceIn, opts) {
          return _assert("string" == typeof importName), this._generateImport(this._applyDefaults(importedSourceIn, opts), importName);
        }
        addNamespace(importedSourceIn, opts) {
          return this._generateImport(this._applyDefaults(importedSourceIn, opts), null);
        }
        addSideEffect(importedSourceIn, opts) {
          return this._generateImport(this._applyDefaults(importedSourceIn, opts), !1);
        }
        _applyDefaults(importedSource, opts, isInit = !1) {
          const optsList = [];
          "string" == typeof importedSource ? (optsList.push({
            importedSource
          }), optsList.push(opts)) : (_assert(!opts, "Unexpected secondary arguments."), optsList.push(importedSource));
          const newOpts = Object.assign({}, this._defaultOpts);
          for (const opts of optsList) opts && (Object.keys(newOpts).forEach((key => {
            void 0 !== opts[key] && (newOpts[key] = opts[key]);
          })), isInit || (void 0 !== opts.nameHint && (newOpts.nameHint = opts.nameHint), 
          void 0 !== opts.blockHoist && (newOpts.blockHoist = opts.blockHoist)));
          return newOpts;
        }
        _generateImport(opts, importName) {
          const isDefault = "default" === importName, isNamed = !!importName && !isDefault, isNamespace = null === importName, {importedSource, importedType, importedInterop, importingInterop, ensureLiveReference, ensureNoContext, nameHint, importPosition, blockHoist} = opts;
          let name = nameHint || importName;
          const isMod = (0, _isModule.default)(this._programPath), isModuleForNode = isMod && "node" === importingInterop, isModuleForBabel = isMod && "babel" === importingInterop;
          if ("after" === importPosition && !isMod) throw new Error('"importPosition": "after" is only supported in modules');
          const builder = new _importBuilder.default(importedSource, this._programScope, this._hub);
          if ("es6" === importedType) {
            if (!isModuleForNode && !isModuleForBabel) throw new Error("Cannot import an ES6 module from CommonJS");
            builder.import(), isNamespace ? builder.namespace(nameHint || importedSource) : (isDefault || isNamed) && builder.named(name, importName);
          } else {
            if ("commonjs" !== importedType) throw new Error(`Unexpected interopType "${importedType}"`);
            if ("babel" === importedInterop) if (isModuleForNode) {
              name = "default" !== name ? name : importedSource;
              const es6Default = `${importedSource}$es6Default`;
              builder.import(), isNamespace ? builder.default(es6Default).var(name || importedSource).wildcardInterop() : isDefault ? ensureLiveReference ? builder.default(es6Default).var(name || importedSource).defaultInterop().read("default") : builder.default(es6Default).var(name).defaultInterop().prop(importName) : isNamed && builder.default(es6Default).read(importName);
            } else isModuleForBabel ? (builder.import(), isNamespace ? builder.namespace(name || importedSource) : (isDefault || isNamed) && builder.named(name, importName)) : (builder.require(), 
            isNamespace ? builder.var(name || importedSource).wildcardInterop() : (isDefault || isNamed) && ensureLiveReference ? isDefault ? (name = "default" !== name ? name : importedSource, 
            builder.var(name).read(importName), builder.defaultInterop()) : builder.var(importedSource).read(importName) : isDefault ? builder.var(name).defaultInterop().prop(importName) : isNamed && builder.var(name).prop(importName)); else if ("compiled" === importedInterop) isModuleForNode ? (builder.import(), 
            isNamespace ? builder.default(name || importedSource) : (isDefault || isNamed) && builder.default(importedSource).read(name)) : isModuleForBabel ? (builder.import(), 
            isNamespace ? builder.namespace(name || importedSource) : (isDefault || isNamed) && builder.named(name, importName)) : (builder.require(), 
            isNamespace ? builder.var(name || importedSource) : (isDefault || isNamed) && (ensureLiveReference ? builder.var(importedSource).read(name) : builder.prop(importName).var(name))); else {
              if ("uncompiled" !== importedInterop) throw new Error(`Unknown importedInterop "${importedInterop}".`);
              if (isDefault && ensureLiveReference) throw new Error("No live reference for commonjs default");
              isModuleForNode ? (builder.import(), isNamespace ? builder.default(name || importedSource) : isDefault ? builder.default(name) : isNamed && builder.default(importedSource).read(name)) : isModuleForBabel ? (builder.import(), 
              isNamespace ? builder.default(name || importedSource) : isDefault ? builder.default(name) : isNamed && builder.named(name, importName)) : (builder.require(), 
              isNamespace ? builder.var(name || importedSource) : isDefault ? builder.var(name) : isNamed && (ensureLiveReference ? builder.var(importedSource).read(name) : builder.var(name).prop(importName)));
            }
          }
          const {statements, resultName} = builder.done();
          return this._insertStatements(statements, importPosition, blockHoist), (isDefault || isNamed) && ensureNoContext && "Identifier" !== resultName.type ? sequenceExpression([ numericLiteral(0), resultName ]) : resultName;
        }
        _insertStatements(statements, importPosition = "before", blockHoist = 3) {
          const body = this._programPath.get("body");
          if ("after" === importPosition) {
            for (let i = body.length - 1; i >= 0; i--) if (body[i].isImportDeclaration()) return void body[i].insertAfter(statements);
          } else {
            statements.forEach((node => {
              node._blockHoist = blockHoist;
            }));
            const targetPath = body.find((p => {
              const val = p.node._blockHoist;
              return Number.isFinite(val) && val < 4;
            }));
            if (targetPath) return void targetPath.insertBefore(statements);
          }
          this._programPath.unshiftContainer("body", statements);
        }
      };
    },
    203: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "ImportInjector", {
        enumerable: !0,
        get: function() {
          return _importInjector.default;
        }
      }), exports.addDefault = function(path, importedSource, opts) {
        return new _importInjector.default(path).addDefault(importedSource, opts);
      }, exports.addNamed = function(path, name, importedSource, opts) {
        return new _importInjector.default(path).addNamed(name, importedSource, opts);
      }, exports.addNamespace = function(path, importedSource, opts) {
        return new _importInjector.default(path).addNamespace(importedSource, opts);
      }, exports.addSideEffect = function(path, importedSource, opts) {
        return new _importInjector.default(path).addSideEffect(importedSource, opts);
      }, Object.defineProperty(exports, "isModule", {
        enumerable: !0,
        get: function() {
          return _isModule.default;
        }
      });
      var _importInjector = __webpack_require__(8694), _isModule = __webpack_require__(821);
    },
    821: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path) {
        const {sourceType} = path.node;
        if ("module" !== sourceType && "script" !== sourceType) throw path.buildCodeFrameError(`Unknown sourceType "${sourceType}", cannot transform.`);
        return "module" === path.node.sourceType;
      };
    },
    6294: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = getModuleName;
      {
        const originalGetModuleName = getModuleName;
        exports.default = getModuleName = function(rootOpts, pluginOpts) {
          var _pluginOpts$moduleId, _pluginOpts$moduleIds, _pluginOpts$getModule, _pluginOpts$moduleRoo;
          return originalGetModuleName(rootOpts, {
            moduleId: null != (_pluginOpts$moduleId = pluginOpts.moduleId) ? _pluginOpts$moduleId : rootOpts.moduleId,
            moduleIds: null != (_pluginOpts$moduleIds = pluginOpts.moduleIds) ? _pluginOpts$moduleIds : rootOpts.moduleIds,
            getModuleId: null != (_pluginOpts$getModule = pluginOpts.getModuleId) ? _pluginOpts$getModule : rootOpts.getModuleId,
            moduleRoot: null != (_pluginOpts$moduleRoo = pluginOpts.moduleRoot) ? _pluginOpts$moduleRoo : rootOpts.moduleRoot
          });
        };
      }
      function getModuleName(rootOpts, pluginOpts) {
        const {filename, filenameRelative = filename, sourceRoot = pluginOpts.moduleRoot} = rootOpts, {moduleId, moduleIds = !!moduleId, getModuleId, moduleRoot = sourceRoot} = pluginOpts;
        if (!moduleIds) return null;
        if (null != moduleId && !getModuleId) return moduleId;
        let moduleName = null != moduleRoot ? moduleRoot + "/" : "";
        if (filenameRelative) {
          const sourceRootReplacer = null != sourceRoot ? new RegExp("^" + sourceRoot + "/?") : "";
          moduleName += filenameRelative.replace(sourceRootReplacer, "").replace(/\.(\w*?)$/, "");
        }
        return moduleName = moduleName.replace(/\\/g, "/"), getModuleId && getModuleId(moduleName) || moduleName;
      }
    },
    2454: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.buildNamespaceInitStatements = function(metadata, sourceMetadata, constantReexports = !1) {
        const statements = [];
        let srcNamespace = identifier(sourceMetadata.name);
        sourceMetadata.lazy && (srcNamespace = callExpression(srcNamespace, []));
        for (const localName of sourceMetadata.importsNamespace) localName !== sourceMetadata.name && statements.push(_template.default.statement`var NAME = SOURCE;`({
          NAME: localName,
          SOURCE: cloneNode(srcNamespace)
        }));
        constantReexports && statements.push(...buildReexportsFromMeta(metadata, sourceMetadata, !0));
        for (const exportName of sourceMetadata.reexportNamespace) statements.push((sourceMetadata.lazy ? _template.default.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          ` : _template.default.statement`EXPORTS.NAME = NAMESPACE;`)({
          EXPORTS: metadata.exportName,
          NAME: exportName,
          NAMESPACE: cloneNode(srcNamespace)
        }));
        if (sourceMetadata.reexportAll) {
          const statement = function(metadata, namespace, constantReexports) {
            return (constantReexports ? _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          EXPORTS[key] = NAMESPACE[key];
        });
      ` : _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `)({
              NAMESPACE: namespace,
              EXPORTS: metadata.exportName,
              VERIFY_NAME_LIST: metadata.exportNameListName ? _template.default`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({
                EXPORTS_LIST: metadata.exportNameListName
              }) : null
            });
          }(metadata, cloneNode(srcNamespace), constantReexports);
          statement.loc = sourceMetadata.reexportAll.loc, statements.push(statement);
        }
        return statements;
      }, exports.ensureStatementsHoisted = function(statements) {
        statements.forEach((header => {
          header._blockHoist = 3;
        }));
      }, Object.defineProperty(exports, "getModuleName", {
        enumerable: !0,
        get: function() {
          return _getModuleName.default;
        }
      }), Object.defineProperty(exports, "hasExports", {
        enumerable: !0,
        get: function() {
          return _normalizeAndLoadMetadata.hasExports;
        }
      }), Object.defineProperty(exports, "isModule", {
        enumerable: !0,
        get: function() {
          return _helperModuleImports.isModule;
        }
      }), Object.defineProperty(exports, "isSideEffectImport", {
        enumerable: !0,
        get: function() {
          return _normalizeAndLoadMetadata.isSideEffectImport;
        }
      }), exports.rewriteModuleStatementsAndPrepareHeader = function(path, {loose, exportName, strict, allowTopLevelThis, strictMode, noInterop, importInterop = noInterop ? "none" : "babel", lazy, esNamespaceOnly, constantReexports = loose, enumerableModuleMeta = loose, noIncompleteNsImportDetection}) {
        (0, _normalizeAndLoadMetadata.validateImportInteropOption)(importInterop), _assert((0, 
        _helperModuleImports.isModule)(path), "Cannot process module statements in a script"), 
        path.node.sourceType = "script";
        const meta = (0, _normalizeAndLoadMetadata.default)(path, exportName, {
          importInterop,
          initializeReexports: constantReexports,
          lazy,
          esNamespaceOnly
        });
        allowTopLevelThis || (0, _rewriteThis.default)(path);
        if ((0, _rewriteLiveReferences.default)(path, meta), !1 !== strictMode) {
          const hasStrict = path.node.directives.some((directive => "use strict" === directive.value.value));
          hasStrict || path.unshiftContainer("directives", directive(directiveLiteral("use strict")));
        }
        const headers = [];
        (0, _normalizeAndLoadMetadata.hasExports)(meta) && !strict && headers.push(function(metadata, enumerableModuleMeta = !1) {
          return (enumerableModuleMeta ? _template.default.statement`
        EXPORTS.__esModule = true;
      ` : _template.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({
            EXPORTS: metadata.exportName
          });
        }(meta, enumerableModuleMeta));
        const nameList = function(programPath, metadata) {
          const exportedVars = Object.create(null);
          for (const data of metadata.local.values()) for (const name of data.names) exportedVars[name] = !0;
          let hasReexport = !1;
          for (const data of metadata.source.values()) {
            for (const exportName of data.reexports.keys()) exportedVars[exportName] = !0;
            for (const exportName of data.reexportNamespace) exportedVars[exportName] = !0;
            hasReexport = hasReexport || !!data.reexportAll;
          }
          if (!hasReexport || 0 === Object.keys(exportedVars).length) return null;
          const name = programPath.scope.generateUidIdentifier("exportNames");
          return delete exportedVars.default, {
            name: name.name,
            statement: variableDeclaration("var", [ variableDeclarator(name, valueToNode(exportedVars)) ])
          };
        }(path, meta);
        nameList && (meta.exportNameListName = nameList.name, headers.push(nameList.statement));
        return headers.push(...function(programPath, metadata, constantReexports = !1, noIncompleteNsImportDetection = !1) {
          const initStatements = [];
          for (const [localName, data] of metadata.local) if ("import" === data.kind) ; else if ("hoisted" === data.kind) initStatements.push([ data.names[0], buildInitStatement(metadata, data.names, identifier(localName)) ]); else if (!noIncompleteNsImportDetection) for (const exportName of data.names) initStatements.push([ exportName, null ]);
          for (const data of metadata.source.values()) {
            if (!constantReexports) {
              const reexportsStatements = buildReexportsFromMeta(metadata, data, !1), reexports = [ ...data.reexports.keys() ];
              for (let i = 0; i < reexportsStatements.length; i++) initStatements.push([ reexports[i], reexportsStatements[i] ]);
            }
            if (!noIncompleteNsImportDetection) for (const exportName of data.reexportNamespace) initStatements.push([ exportName, null ]);
          }
          initStatements.sort((([a], [b]) => a < b ? -1 : b < a ? 1 : 0));
          const results = [];
          if (noIncompleteNsImportDetection) for (const [, initStatement] of initStatements) results.push(initStatement); else {
            const chunkSize = 100;
            for (let i = 0; i < initStatements.length; i += chunkSize) {
              let uninitializedExportNames = [];
              for (let j = 0; j < chunkSize && i + j < initStatements.length; j++) {
                const [exportName, initStatement] = initStatements[i + j];
                null !== initStatement ? (uninitializedExportNames.length > 0 && (results.push(buildInitStatement(metadata, uninitializedExportNames, programPath.scope.buildUndefinedNode())), 
                uninitializedExportNames = []), results.push(initStatement)) : uninitializedExportNames.push(exportName);
              }
              uninitializedExportNames.length > 0 && results.push(buildInitStatement(metadata, uninitializedExportNames, programPath.scope.buildUndefinedNode()));
            }
          }
          return results;
        }(path, meta, constantReexports, noIncompleteNsImportDetection)), {
          meta,
          headers
        };
      }, Object.defineProperty(exports, "rewriteThis", {
        enumerable: !0,
        get: function() {
          return _rewriteThis.default;
        }
      }), exports.wrapInterop = function(programPath, expr, type) {
        if ("none" === type) return null;
        if ("node-namespace" === type) return callExpression(programPath.hub.addHelper("interopRequireWildcard"), [ expr, booleanLiteral(!0) ]);
        if ("node-default" === type) return null;
        let helper;
        if ("default" === type) helper = "interopRequireDefault"; else {
          if ("namespace" !== type) throw new Error(`Unknown interop: ${type}`);
          helper = "interopRequireWildcard";
        }
        return callExpression(programPath.hub.addHelper(helper), [ expr ]);
      };
      var _assert = __webpack_require__(9491), _t = __webpack_require__(7289), _template = __webpack_require__(4847), _helperModuleImports = __webpack_require__(203), _rewriteThis = __webpack_require__(333), _rewriteLiveReferences = __webpack_require__(7500), _normalizeAndLoadMetadata = __webpack_require__(6368), _getModuleName = __webpack_require__(6294);
      const {booleanLiteral, callExpression, cloneNode, directive, directiveLiteral, expressionStatement, identifier, isIdentifier, memberExpression, stringLiteral, valueToNode, variableDeclaration, variableDeclarator} = _t;
      const ReexportTemplate = {
        constant: _template.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE_IMPORT;`,
        constantComputed: _template.default.statement`EXPORTS["EXPORT_NAME"] = NAMESPACE_IMPORT;`,
        spec: _template.default.statement`
    Object.defineProperty(EXPORTS, "EXPORT_NAME", {
      enumerable: true,
      get: function() {
        return NAMESPACE_IMPORT;
      },
    });
    `
      }, buildReexportsFromMeta = (meta, metadata, constantReexports) => {
        const namespace = metadata.lazy ? callExpression(identifier(metadata.name), []) : identifier(metadata.name), {stringSpecifiers} = meta;
        return Array.from(metadata.reexports, (([exportName, importName]) => {
          let NAMESPACE_IMPORT = cloneNode(namespace);
          "default" === importName && "node-default" === metadata.interop || (NAMESPACE_IMPORT = stringSpecifiers.has(importName) ? memberExpression(NAMESPACE_IMPORT, stringLiteral(importName), !0) : memberExpression(NAMESPACE_IMPORT, identifier(importName)));
          const astNodes = {
            EXPORTS: meta.exportName,
            EXPORT_NAME: exportName,
            NAMESPACE_IMPORT
          };
          return constantReexports || isIdentifier(NAMESPACE_IMPORT) ? stringSpecifiers.has(exportName) ? ReexportTemplate.constantComputed(astNodes) : ReexportTemplate.constant(astNodes) : ReexportTemplate.spec(astNodes);
        }));
      };
      const InitTemplate = {
        computed: _template.default.expression`EXPORTS["NAME"] = VALUE`,
        default: _template.default.expression`EXPORTS.NAME = VALUE`
      };
      function buildInitStatement(metadata, exportNames, initExpr) {
        const {stringSpecifiers, exportName: EXPORTS} = metadata;
        return expressionStatement(exportNames.reduce(((acc, exportName) => {
          const params = {
            EXPORTS,
            NAME: exportName,
            VALUE: acc
          };
          return stringSpecifiers.has(exportName) ? InitTemplate.computed(params) : InitTemplate.default(params);
        }), initExpr));
      }
    },
    6368: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(programPath, exportName, {importInterop, initializeReexports = !1, lazy = !1, esNamespaceOnly = !1}) {
        exportName || (exportName = programPath.scope.generateUidIdentifier("exports").name);
        const stringSpecifiers = new Set;
        !function(programPath) {
          programPath.get("body").forEach((child => {
            child.isExportDefaultDeclaration() && (0, _helperSplitExportDeclaration.default)(child);
          }));
        }(programPath);
        const {local, source, hasExports} = function(programPath, {lazy, initializeReexports}, stringSpecifiers) {
          const localData = function(programPath, initializeReexports, stringSpecifiers) {
            const bindingKindLookup = new Map;
            programPath.get("body").forEach((child => {
              let kind;
              if (child.isImportDeclaration()) kind = "import"; else {
                if (child.isExportDefaultDeclaration() && (child = child.get("declaration")), child.isExportNamedDeclaration()) if (child.node.declaration) child = child.get("declaration"); else if (initializeReexports && child.node.source && child.get("source").isStringLiteral()) return void child.get("specifiers").forEach((spec => {
                  assertExportSpecifier(spec), bindingKindLookup.set(spec.get("local").node.name, "block");
                }));
                if (child.isFunctionDeclaration()) kind = "hoisted"; else if (child.isClassDeclaration()) kind = "block"; else if (child.isVariableDeclaration({
                  kind: "var"
                })) kind = "var"; else {
                  if (!child.isVariableDeclaration()) return;
                  kind = "block";
                }
              }
              Object.keys(child.getOuterBindingIdentifiers()).forEach((name => {
                bindingKindLookup.set(name, kind);
              }));
            }));
            const localMetadata = new Map, getLocalMetadata = idPath => {
              const localName = idPath.node.name;
              let metadata = localMetadata.get(localName);
              if (!metadata) {
                const kind = bindingKindLookup.get(localName);
                if (void 0 === kind) throw idPath.buildCodeFrameError(`Exporting local "${localName}", which is not declared.`);
                metadata = {
                  names: [],
                  kind
                }, localMetadata.set(localName, metadata);
              }
              return metadata;
            };
            return programPath.get("body").forEach((child => {
              if (!child.isExportNamedDeclaration() || !initializeReexports && child.node.source) {
                if (child.isExportDefaultDeclaration()) {
                  const declaration = child.get("declaration");
                  if (!declaration.isFunctionDeclaration() && !declaration.isClassDeclaration()) throw declaration.buildCodeFrameError("Unexpected default expression export.");
                  getLocalMetadata(declaration.get("id")).names.push("default");
                }
              } else if (child.node.declaration) {
                const declaration = child.get("declaration"), ids = declaration.getOuterBindingIdentifierPaths();
                Object.keys(ids).forEach((name => {
                  if ("__esModule" === name) throw declaration.buildCodeFrameError('Illegal export "__esModule".');
                  getLocalMetadata(ids[name]).names.push(name);
                }));
              } else child.get("specifiers").forEach((spec => {
                const local = spec.get("local"), exported = spec.get("exported"), localMetadata = getLocalMetadata(local), exportName = getExportSpecifierName(exported, stringSpecifiers);
                if ("__esModule" === exportName) throw exported.buildCodeFrameError('Illegal export "__esModule".');
                localMetadata.names.push(exportName);
              }));
            })), localMetadata;
          }(programPath, initializeReexports, stringSpecifiers), sourceData = new Map, getData = sourceNode => {
            const source = sourceNode.value;
            let data = sourceData.get(source);
            return data || (data = {
              name: programPath.scope.generateUidIdentifier((0, _path.basename)(source, (0, _path.extname)(source))).name,
              interop: "none",
              loc: null,
              imports: new Map,
              importsNamespace: new Set,
              reexports: new Map,
              reexportNamespace: new Set,
              reexportAll: null,
              lazy: !1,
              source
            }, sourceData.set(source, data)), data;
          };
          let hasExports = !1;
          programPath.get("body").forEach((child => {
            if (child.isImportDeclaration()) {
              const data = getData(child.node.source);
              data.loc || (data.loc = child.node.loc), child.get("specifiers").forEach((spec => {
                if (spec.isImportDefaultSpecifier()) {
                  const localName = spec.get("local").node.name;
                  data.imports.set(localName, "default");
                  const reexport = localData.get(localName);
                  reexport && (localData.delete(localName), reexport.names.forEach((name => {
                    data.reexports.set(name, "default");
                  })));
                } else if (spec.isImportNamespaceSpecifier()) {
                  const localName = spec.get("local").node.name;
                  data.importsNamespace.add(localName);
                  const reexport = localData.get(localName);
                  reexport && (localData.delete(localName), reexport.names.forEach((name => {
                    data.reexportNamespace.add(name);
                  })));
                } else if (spec.isImportSpecifier()) {
                  const importName = getExportSpecifierName(spec.get("imported"), stringSpecifiers), localName = spec.get("local").node.name;
                  data.imports.set(localName, importName);
                  const reexport = localData.get(localName);
                  reexport && (localData.delete(localName), reexport.names.forEach((name => {
                    data.reexports.set(name, importName);
                  })));
                }
              }));
            } else if (child.isExportAllDeclaration()) {
              hasExports = !0;
              const data = getData(child.node.source);
              data.loc || (data.loc = child.node.loc), data.reexportAll = {
                loc: child.node.loc
              };
            } else if (child.isExportNamedDeclaration() && child.node.source) {
              hasExports = !0;
              const data = getData(child.node.source);
              data.loc || (data.loc = child.node.loc), child.get("specifiers").forEach((spec => {
                assertExportSpecifier(spec);
                const importName = getExportSpecifierName(spec.get("local"), stringSpecifiers), exportName = getExportSpecifierName(spec.get("exported"), stringSpecifiers);
                if (data.reexports.set(exportName, importName), "__esModule" === exportName) throw spec.get("exported").buildCodeFrameError('Illegal export "__esModule".');
              }));
            } else (child.isExportNamedDeclaration() || child.isExportDefaultDeclaration()) && (hasExports = !0);
          }));
          for (const metadata of sourceData.values()) {
            let needsDefault = !1, needsNamed = !1;
            metadata.importsNamespace.size > 0 && (needsDefault = !0, needsNamed = !0), metadata.reexportAll && (needsNamed = !0);
            for (const importName of metadata.imports.values()) "default" === importName ? needsDefault = !0 : needsNamed = !0;
            for (const importName of metadata.reexports.values()) "default" === importName ? needsDefault = !0 : needsNamed = !0;
            needsDefault && needsNamed ? metadata.interop = "namespace" : needsDefault && (metadata.interop = "default");
          }
          for (const [source, metadata] of sourceData) if (!1 !== lazy && !isSideEffectImport(metadata) && !metadata.reexportAll) if (!0 === lazy) metadata.lazy = !/\./.test(source); else if (Array.isArray(lazy)) metadata.lazy = -1 !== lazy.indexOf(source); else {
            if ("function" != typeof lazy) throw new Error(".lazy must be a boolean, string array, or function");
            metadata.lazy = lazy(source);
          }
          return {
            hasExports,
            local: localData,
            source: sourceData
          };
        }(programPath, {
          initializeReexports,
          lazy
        }, stringSpecifiers);
        !function(programPath) {
          programPath.get("body").forEach((child => {
            if (child.isImportDeclaration()) child.remove(); else if (child.isExportNamedDeclaration()) child.node.declaration ? (child.node.declaration._blockHoist = child.node._blockHoist, 
            child.replaceWith(child.node.declaration)) : child.remove(); else if (child.isExportDefaultDeclaration()) {
              const declaration = child.get("declaration");
              if (!declaration.isFunctionDeclaration() && !declaration.isClassDeclaration()) throw declaration.buildCodeFrameError("Unexpected default expression export.");
              declaration._blockHoist = child.node._blockHoist, child.replaceWith(declaration);
            } else child.isExportAllDeclaration() && child.remove();
          }));
        }(programPath);
        for (const [, metadata] of source) {
          metadata.importsNamespace.size > 0 && (metadata.name = metadata.importsNamespace.values().next().value);
          const resolvedInterop = resolveImportInterop(importInterop, metadata.source);
          "none" === resolvedInterop ? metadata.interop = "none" : "node" === resolvedInterop && "namespace" === metadata.interop ? metadata.interop = "node-namespace" : "node" === resolvedInterop && "default" === metadata.interop ? metadata.interop = "node-default" : esNamespaceOnly && "namespace" === metadata.interop && (metadata.interop = "default");
        }
        return {
          exportName,
          exportNameListName: null,
          hasExports,
          local,
          source,
          stringSpecifiers
        };
      }, exports.hasExports = function(metadata) {
        return metadata.hasExports;
      }, exports.isSideEffectImport = isSideEffectImport, exports.validateImportInteropOption = validateImportInteropOption;
      var _path = __webpack_require__(1017), _helperValidatorIdentifier = __webpack_require__(720), _helperSplitExportDeclaration = __webpack_require__(4170);
      function isSideEffectImport(source) {
        return 0 === source.imports.size && 0 === source.importsNamespace.size && 0 === source.reexports.size && 0 === source.reexportNamespace.size && !source.reexportAll;
      }
      function validateImportInteropOption(importInterop) {
        if ("function" != typeof importInterop && "none" !== importInterop && "babel" !== importInterop && "node" !== importInterop) throw new Error(`.importInterop must be one of "none", "babel", "node", or a function returning one of those values (received ${importInterop}).`);
        return importInterop;
      }
      function resolveImportInterop(importInterop, source) {
        return "function" == typeof importInterop ? validateImportInteropOption(importInterop(source)) : importInterop;
      }
      function getExportSpecifierName(path, stringSpecifiers) {
        if (path.isIdentifier()) return path.node.name;
        if (path.isStringLiteral()) {
          const stringValue = path.node.value;
          return (0, _helperValidatorIdentifier.isIdentifierName)(stringValue) || stringSpecifiers.add(stringValue), 
          stringValue;
        }
        throw new Error(`Expected export specifier to be either Identifier or StringLiteral, got ${path.node.type}`);
      }
      function assertExportSpecifier(path) {
        if (!path.isExportSpecifier()) throw path.isExportNamespaceSpecifier() ? path.buildCodeFrameError("Export namespace should be first transformed by `@babel/plugin-proposal-export-namespace-from`.") : path.buildCodeFrameError("Unexpected export specifier type");
      }
    },
    7500: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(programPath, metadata) {
        const imported = new Map, exported = new Map, requeueInParent = path => {
          programPath.requeue(path);
        };
        for (const [source, data] of metadata.source) {
          for (const [localName, importName] of data.imports) imported.set(localName, [ source, importName, null ]);
          for (const localName of data.importsNamespace) imported.set(localName, [ source, null, localName ]);
        }
        for (const [local, data] of metadata.local) {
          let exportMeta = exported.get(local);
          exportMeta || (exportMeta = [], exported.set(local, exportMeta)), exportMeta.push(...data.names);
        }
        const rewriteBindingInitVisitorState = {
          metadata,
          requeueInParent,
          scope: programPath.scope,
          exported
        };
        programPath.traverse(rewriteBindingInitVisitor, rewriteBindingInitVisitorState), 
        (0, _helperSimpleAccess.default)(programPath, new Set([ ...Array.from(imported.keys()), ...Array.from(exported.keys()) ]), !1);
        const rewriteReferencesVisitorState = {
          seen: new WeakSet,
          metadata,
          requeueInParent,
          scope: programPath.scope,
          imported,
          exported,
          buildImportReference: ([source, importName, localName], identNode) => {
            const meta = metadata.source.get(source);
            if (localName) return meta.lazy && (identNode = callExpression(identNode, [])), 
            identNode;
            let namespace = identifier(meta.name);
            if (meta.lazy && (namespace = callExpression(namespace, [])), "default" === importName && "node-default" === meta.interop) return namespace;
            const computed = metadata.stringSpecifiers.has(importName);
            return memberExpression(namespace, computed ? stringLiteral(importName) : identifier(importName), computed);
          }
        };
        programPath.traverse(rewriteReferencesVisitor, rewriteReferencesVisitorState);
      };
      var _assert = __webpack_require__(9491), _t = __webpack_require__(7289), _template = __webpack_require__(4847), _helperSimpleAccess = __webpack_require__(9196);
      const {assignmentExpression, callExpression, cloneNode, expressionStatement, getOuterBindingIdentifiers, identifier, isMemberExpression, isVariableDeclaration, jsxIdentifier, jsxMemberExpression, memberExpression, numericLiteral, sequenceExpression, stringLiteral, variableDeclaration, variableDeclarator} = _t;
      const rewriteBindingInitVisitor = {
        Scope(path) {
          path.skip();
        },
        ClassDeclaration(path) {
          const {requeueInParent, exported, metadata} = this, {id} = path.node;
          if (!id) throw new Error("Expected class to have a name");
          const localName = id.name, exportNames = exported.get(localName) || [];
          if (exportNames.length > 0) {
            const statement = expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, identifier(localName)));
            statement._blockHoist = path.node._blockHoist, requeueInParent(path.insertAfter(statement)[0]);
          }
        },
        VariableDeclaration(path) {
          const {requeueInParent, exported, metadata} = this;
          Object.keys(path.getOuterBindingIdentifiers()).forEach((localName => {
            const exportNames = exported.get(localName) || [];
            if (exportNames.length > 0) {
              const statement = expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, identifier(localName)));
              statement._blockHoist = path.node._blockHoist, requeueInParent(path.insertAfter(statement)[0]);
            }
          }));
        }
      }, buildBindingExportAssignmentExpression = (metadata, exportNames, localExpr) => (exportNames || []).reduce(((expr, exportName) => {
        const {stringSpecifiers} = metadata, computed = stringSpecifiers.has(exportName);
        return assignmentExpression("=", memberExpression(identifier(metadata.exportName), computed ? stringLiteral(exportName) : identifier(exportName), computed), expr);
      }), localExpr), buildImportThrow = localName => _template.default.expression.ast`
    (function() {
      throw new Error('"' + '${localName}' + '" is read-only.');
    })()
  `, rewriteReferencesVisitor = {
        ReferencedIdentifier(path) {
          const {seen, buildImportReference, scope, imported, requeueInParent} = this;
          if (seen.has(path.node)) return;
          seen.add(path.node);
          const localName = path.node.name, importData = imported.get(localName);
          if (importData) {
            if (function(path) {
              do {
                switch (path.parent.type) {
                 case "TSTypeAnnotation":
                 case "TSTypeAliasDeclaration":
                 case "TSTypeReference":
                 case "TypeAnnotation":
                 case "TypeAlias":
                  return !0;

                 case "ExportSpecifier":
                  return "type" === path.parentPath.parent.exportKind;

                 default:
                  if (path.parentPath.isStatement() || path.parentPath.isExpression()) return !1;
                }
              } while (path = path.parentPath);
            }(path)) throw path.buildCodeFrameError(`Cannot transform the imported binding "${localName}" since it's also used in a type annotation. Please strip type annotations using @babel/preset-typescript or @babel/preset-flow.`);
            const localBinding = path.scope.getBinding(localName);
            if (scope.getBinding(localName) !== localBinding) return;
            const ref = buildImportReference(importData, path.node);
            if (ref.loc = path.node.loc, (path.parentPath.isCallExpression({
              callee: path.node
            }) || path.parentPath.isOptionalCallExpression({
              callee: path.node
            }) || path.parentPath.isTaggedTemplateExpression({
              tag: path.node
            })) && isMemberExpression(ref)) path.replaceWith(sequenceExpression([ numericLiteral(0), ref ])); else if (path.isJSXIdentifier() && isMemberExpression(ref)) {
              const {object, property} = ref;
              path.replaceWith(jsxMemberExpression(jsxIdentifier(object.name), jsxIdentifier(property.name)));
            } else path.replaceWith(ref);
            requeueInParent(path), path.skip();
          }
        },
        UpdateExpression(path) {
          const {scope, seen, imported, exported, requeueInParent, buildImportReference} = this;
          if (seen.has(path.node)) return;
          seen.add(path.node);
          const arg = path.get("argument");
          if (arg.isMemberExpression()) return;
          const update = path.node;
          if (arg.isIdentifier()) {
            const localName = arg.node.name;
            if (scope.getBinding(localName) !== path.scope.getBinding(localName)) return;
            const exportedNames = exported.get(localName), importData = imported.get(localName);
            if ((null == exportedNames ? void 0 : exportedNames.length) > 0 || importData) if (importData) path.replaceWith(assignmentExpression(update.operator[0] + "=", buildImportReference(importData, arg.node), buildImportThrow(localName))); else if (update.prefix) path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, cloneNode(update))); else {
              const ref = scope.generateDeclaredUidIdentifier(localName);
              path.replaceWith(sequenceExpression([ assignmentExpression("=", cloneNode(ref), cloneNode(update)), buildBindingExportAssignmentExpression(this.metadata, exportedNames, identifier(localName)), cloneNode(ref) ]));
            }
          }
          requeueInParent(path), path.skip();
        },
        AssignmentExpression: {
          exit(path) {
            const {scope, seen, imported, exported, requeueInParent, buildImportReference} = this;
            if (seen.has(path.node)) return;
            seen.add(path.node);
            const left = path.get("left");
            if (!left.isMemberExpression()) if (left.isIdentifier()) {
              const localName = left.node.name;
              if (scope.getBinding(localName) !== path.scope.getBinding(localName)) return;
              const exportedNames = exported.get(localName), importData = imported.get(localName);
              if ((null == exportedNames ? void 0 : exportedNames.length) > 0 || importData) {
                _assert("=" === path.node.operator, "Path was not simplified");
                const assignment = path.node;
                importData && (assignment.left = buildImportReference(importData, assignment.left), 
                assignment.right = sequenceExpression([ assignment.right, buildImportThrow(localName) ])), 
                path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, assignment)), 
                requeueInParent(path);
              }
            } else {
              const ids = left.getOuterBindingIdentifiers(), programScopeIds = Object.keys(ids).filter((localName => scope.getBinding(localName) === path.scope.getBinding(localName))), id = programScopeIds.find((localName => imported.has(localName)));
              id && (path.node.right = sequenceExpression([ path.node.right, buildImportThrow(id) ]));
              const items = [];
              if (programScopeIds.forEach((localName => {
                const exportedNames = exported.get(localName) || [];
                exportedNames.length > 0 && items.push(buildBindingExportAssignmentExpression(this.metadata, exportedNames, identifier(localName)));
              })), items.length > 0) {
                let node = sequenceExpression(items);
                path.parentPath.isExpressionStatement() && (node = expressionStatement(node), node._blockHoist = path.parentPath.node._blockHoist);
                requeueInParent(path.insertAfter(node)[0]);
              }
            }
          }
        },
        "ForOfStatement|ForInStatement"(path) {
          const {scope, node} = path, {left} = node, {exported, imported, scope: programScope} = this;
          if (!isVariableDeclaration(left)) {
            let importConstViolationName, didTransformExport = !1;
            const loopBodyScope = path.get("body").scope;
            for (const name of Object.keys(getOuterBindingIdentifiers(left))) programScope.getBinding(name) === scope.getBinding(name) && (exported.has(name) && (didTransformExport = !0, 
            loopBodyScope.hasOwnBinding(name) && loopBodyScope.rename(name)), imported.has(name) && !importConstViolationName && (importConstViolationName = name));
            if (!didTransformExport && !importConstViolationName) return;
            path.ensureBlock();
            const bodyPath = path.get("body"), newLoopId = scope.generateUidIdentifierBasedOnNode(left);
            path.get("left").replaceWith(variableDeclaration("let", [ variableDeclarator(cloneNode(newLoopId)) ])), 
            scope.registerDeclaration(path.get("left")), didTransformExport && bodyPath.unshiftContainer("body", expressionStatement(assignmentExpression("=", left, newLoopId))), 
            importConstViolationName && bodyPath.unshiftContainer("body", expressionStatement(buildImportThrow(importConstViolationName)));
          }
        }
      };
    },
    333: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(programPath) {
        (0, _traverse.default)(programPath.node, Object.assign({}, rewriteThisVisitor, {
          noScope: !0
        }));
      };
      var _helperEnvironmentVisitor = __webpack_require__(1692), _traverse = __webpack_require__(241), _t = __webpack_require__(7289);
      const {numericLiteral, unaryExpression} = _t;
      const rewriteThisVisitor = _traverse.default.visitors.merge([ _helperEnvironmentVisitor.default, {
        ThisExpression(path) {
          path.replaceWith(unaryExpression("void", numericLiteral(0), !0));
        }
      } ]);
    },
    9196: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path, bindingNames, includeUpdateExpression = !0) {
        path.traverse(simpleAssignmentVisitor, {
          scope: path.scope,
          bindingNames,
          seen: new WeakSet,
          includeUpdateExpression
        });
      };
      var _t = __webpack_require__(7289);
      const {LOGICAL_OPERATORS, assignmentExpression, binaryExpression, cloneNode, identifier, logicalExpression, numericLiteral, sequenceExpression, unaryExpression} = _t;
      const simpleAssignmentVisitor = {
        UpdateExpression: {
          exit(path) {
            const {scope, bindingNames, includeUpdateExpression} = this;
            if (!includeUpdateExpression) return;
            const arg = path.get("argument");
            if (!arg.isIdentifier()) return;
            const localName = arg.node.name;
            if (bindingNames.has(localName) && scope.getBinding(localName) === path.scope.getBinding(localName)) if (path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) {
              const operator = "++" == path.node.operator ? "+=" : "-=";
              path.replaceWith(assignmentExpression(operator, arg.node, numericLiteral(1)));
            } else if (path.node.prefix) path.replaceWith(assignmentExpression("=", identifier(localName), binaryExpression(path.node.operator[0], unaryExpression("+", arg.node), numericLiteral(1)))); else {
              const old = path.scope.generateUidIdentifierBasedOnNode(arg.node, "old"), varName = old.name;
              path.scope.push({
                id: old
              });
              const binary = binaryExpression(path.node.operator[0], identifier(varName), numericLiteral(1));
              path.replaceWith(sequenceExpression([ assignmentExpression("=", identifier(varName), unaryExpression("+", arg.node)), assignmentExpression("=", cloneNode(arg.node), binary), identifier(varName) ]));
            }
          }
        },
        AssignmentExpression: {
          exit(path) {
            const {scope, seen, bindingNames} = this;
            if ("=" === path.node.operator) return;
            if (seen.has(path.node)) return;
            seen.add(path.node);
            const left = path.get("left");
            if (!left.isIdentifier()) return;
            const localName = left.node.name;
            if (!bindingNames.has(localName)) return;
            if (scope.getBinding(localName) !== path.scope.getBinding(localName)) return;
            const operator = path.node.operator.slice(0, -1);
            LOGICAL_OPERATORS.includes(operator) ? path.replaceWith(logicalExpression(operator, path.node.left, assignmentExpression("=", cloneNode(path.node.left), path.node.right))) : (path.node.right = binaryExpression(operator, cloneNode(path.node.left), path.node.right), 
            path.node.operator = "=");
          }
        }
      };
    },
    4170: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(exportDeclaration) {
        if (!exportDeclaration.isExportDeclaration()) throw new Error("Only export declarations can be split.");
        const isDefault = exportDeclaration.isExportDefaultDeclaration(), declaration = exportDeclaration.get("declaration"), isClassDeclaration = declaration.isClassDeclaration();
        if (isDefault) {
          const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration, scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
          let id = declaration.node.id, needBindingRegistration = !1;
          id || (needBindingRegistration = !0, id = scope.generateUidIdentifier("default"), 
          (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) && (declaration.node.id = cloneNode(id)));
          const updatedDeclaration = standaloneDeclaration ? declaration : variableDeclaration("var", [ variableDeclarator(cloneNode(id), declaration.node) ]), updatedExportDeclaration = exportNamedDeclaration(null, [ exportSpecifier(cloneNode(id), identifier("default")) ]);
          return exportDeclaration.insertAfter(updatedExportDeclaration), exportDeclaration.replaceWith(updatedDeclaration), 
          needBindingRegistration && scope.registerDeclaration(exportDeclaration), exportDeclaration;
        }
        if (exportDeclaration.get("specifiers").length > 0) throw new Error("It doesn't make sense to split exported specifiers.");
        const bindingIdentifiers = declaration.getOuterBindingIdentifiers(), specifiers = Object.keys(bindingIdentifiers).map((name => exportSpecifier(identifier(name), identifier(name)))), aliasDeclar = exportNamedDeclaration(null, specifiers);
        return exportDeclaration.insertAfter(aliasDeclar), exportDeclaration.replaceWith(declaration.node), 
        exportDeclaration;
      };
      var _t = __webpack_require__(7289);
      const {cloneNode, exportNamedDeclaration, exportSpecifier, identifier, variableDeclaration, variableDeclarator} = _t;
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
      var _validator = __webpack_require__(4724), _findSuggestion = __webpack_require__(4401);
    },
    4724: (__unused_webpack_module, exports, __webpack_require__) => {
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
    3281: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _template = __webpack_require__(4847);
      function helper(minVersion, source) {
        return Object.freeze({
          minVersion,
          ast: () => _template.default.program.ast(source)
        });
      }
      var _default = Object.freeze({
        applyDecs: helper("7.17.8", 'function createMetadataMethodsForProperty(metadataMap,kind,property,decoratorFinishedRef){return{getMetadata:function(key){assertNotFinished(decoratorFinishedRef,"getMetadata"),assertMetadataKey(key);var metadataForKey=metadataMap[key];if(void 0!==metadataForKey)if(1===kind){var pub=metadataForKey.public;if(void 0!==pub)return pub[property]}else if(2===kind){var priv=metadataForKey.private;if(void 0!==priv)return priv.get(property)}else if(Object.hasOwnProperty.call(metadataForKey,"constructor"))return metadataForKey.constructor},setMetadata:function(key,value){assertNotFinished(decoratorFinishedRef,"setMetadata"),assertMetadataKey(key);var metadataForKey=metadataMap[key];if(void 0===metadataForKey&&(metadataForKey=metadataMap[key]={}),1===kind){var pub=metadataForKey.public;void 0===pub&&(pub=metadataForKey.public={}),pub[property]=value}else if(2===kind){var priv=metadataForKey.priv;void 0===priv&&(priv=metadataForKey.private=new Map),priv.set(property,value)}else metadataForKey.constructor=value}}}function convertMetadataMapToFinal(obj,metadataMap){var parentMetadataMap=obj[Symbol.metadata||Symbol.for("Symbol.metadata")],metadataKeys=Object.getOwnPropertySymbols(metadataMap);if(0!==metadataKeys.length){for(var i=0;i<metadataKeys.length;i++){var key=metadataKeys[i],metaForKey=metadataMap[key],parentMetaForKey=parentMetadataMap?parentMetadataMap[key]:null,pub=metaForKey.public,parentPub=parentMetaForKey?parentMetaForKey.public:null;pub&&parentPub&&Object.setPrototypeOf(pub,parentPub);var priv=metaForKey.private;if(priv){var privArr=Array.from(priv.values()),parentPriv=parentMetaForKey?parentMetaForKey.private:null;parentPriv&&(privArr=privArr.concat(parentPriv)),metaForKey.private=privArr}parentMetaForKey&&Object.setPrototypeOf(metaForKey,parentMetaForKey)}parentMetadataMap&&Object.setPrototypeOf(metadataMap,parentMetadataMap),obj[Symbol.metadata||Symbol.for("Symbol.metadata")]=metadataMap}}function createAddInitializerMethod(initializers,decoratorFinishedRef){return function(initializer){assertNotFinished(decoratorFinishedRef,"addInitializer"),assertCallable(initializer,"An initializer"),initializers.push(initializer)}}function memberDec(dec,name,desc,metadataMap,initializers,kind,isStatic,isPrivate,value){var kindStr;switch(kind){case 1:kindStr="accessor";break;case 2:kindStr="method";break;case 3:kindStr="getter";break;case 4:kindStr="setter";break;default:kindStr="field"}var metadataKind,metadataName,ctx={kind:kindStr,name:isPrivate?"#"+name:name,isStatic:isStatic,isPrivate:isPrivate},decoratorFinishedRef={v:!1};if(0!==kind&&(ctx.addInitializer=createAddInitializerMethod(initializers,decoratorFinishedRef)),isPrivate){metadataKind=2,metadataName=Symbol(name);var access={};0===kind?(access.get=desc.get,access.set=desc.set):2===kind?access.get=function(){return desc.value}:(1!==kind&&3!==kind||(access.get=function(){return desc.get.call(this)}),1!==kind&&4!==kind||(access.set=function(v){desc.set.call(this,v)})),ctx.access=access}else metadataKind=1,metadataName=name;try{return dec(value,Object.assign(ctx,createMetadataMethodsForProperty(metadataMap,metadataKind,metadataName,decoratorFinishedRef)))}finally{decoratorFinishedRef.v=!0}}function assertNotFinished(decoratorFinishedRef,fnName){if(decoratorFinishedRef.v)throw new Error("attempted to call "+fnName+" after decoration was finished")}function assertMetadataKey(key){if("symbol"!=typeof key)throw new TypeError("Metadata keys must be symbols, received: "+key)}function assertCallable(fn,hint){if("function"!=typeof fn)throw new TypeError(hint+" must be a function")}function assertValidReturnValue(kind,value){var type=typeof value;if(1===kind){if("object"!==type||null===value)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==value.get&&assertCallable(value.get,"accessor.get"),void 0!==value.set&&assertCallable(value.set,"accessor.set"),void 0!==value.init&&assertCallable(value.init,"accessor.init"),void 0!==value.initializer&&assertCallable(value.initializer,"accessor.initializer")}else if("function"!==type){var hint;throw hint=0===kind?"field":10===kind?"class":"method",new TypeError(hint+" decorators must return a function or void 0")}}function getInit(desc){var initializer;return null==(initializer=desc.init)&&(initializer=desc.initializer)&&"undefined"!=typeof console&&console.warn(".initializer has been renamed to .init as of March 2022"),initializer}function applyMemberDec(ret,base,decInfo,name,kind,isStatic,isPrivate,metadataMap,initializers){var desc,initializer,value,newValue,get,set,decs=decInfo[0];if(isPrivate?desc=0===kind||1===kind?{get:decInfo[3],set:decInfo[4]}:3===kind?{get:decInfo[3]}:4===kind?{set:decInfo[3]}:{value:decInfo[3]}:0!==kind&&(desc=Object.getOwnPropertyDescriptor(base,name)),1===kind?value={get:desc.get,set:desc.set}:2===kind?value=desc.value:3===kind?value=desc.get:4===kind&&(value=desc.set),"function"==typeof decs)void 0!==(newValue=memberDec(decs,name,desc,metadataMap,initializers,kind,isStatic,isPrivate,value))&&(assertValidReturnValue(kind,newValue),0===kind?initializer=newValue:1===kind?(initializer=getInit(newValue),get=newValue.get||value.get,set=newValue.set||value.set,value={get:get,set:set}):value=newValue);else for(var i=decs.length-1;i>=0;i--){var newInit;if(void 0!==(newValue=memberDec(decs[i],name,desc,metadataMap,initializers,kind,isStatic,isPrivate,value)))assertValidReturnValue(kind,newValue),0===kind?newInit=newValue:1===kind?(newInit=getInit(newValue),get=newValue.get||value.get,set=newValue.set||value.set,value={get:get,set:set}):value=newValue,void 0!==newInit&&(void 0===initializer?initializer=newInit:"function"==typeof initializer?initializer=[initializer,newInit]:initializer.push(newInit))}if(0===kind||1===kind){if(void 0===initializer)initializer=function(instance,init){return init};else if("function"!=typeof initializer){var ownInitializers=initializer;initializer=function(instance,init){for(var value=init,i=0;i<ownInitializers.length;i++)value=ownInitializers[i].call(instance,value);return value}}else{var originalInitializer=initializer;initializer=function(instance,init){return originalInitializer.call(instance,init)}}ret.push(initializer)}0!==kind&&(1===kind?(desc.get=value.get,desc.set=value.set):2===kind?desc.value=value:3===kind?desc.get=value:4===kind&&(desc.set=value),isPrivate?1===kind?(ret.push((function(instance,args){return value.get.call(instance,args)})),ret.push((function(instance,args){return value.set.call(instance,args)}))):2===kind?ret.push(value):ret.push((function(instance,args){return value.call(instance,args)})):Object.defineProperty(base,name,desc))}function applyMemberDecs(ret,Class,protoMetadataMap,staticMetadataMap,decInfos){for(var protoInitializers,staticInitializers,existingProtoNonFields=new Map,existingStaticNonFields=new Map,i=0;i<decInfos.length;i++){var decInfo=decInfos[i];if(Array.isArray(decInfo)){var base,metadataMap,initializers,kind=decInfo[1],name=decInfo[2],isPrivate=decInfo.length>3,isStatic=kind>=5;if(isStatic?(base=Class,metadataMap=staticMetadataMap,0!==(kind-=5)&&(initializers=staticInitializers=staticInitializers||[])):(base=Class.prototype,metadataMap=protoMetadataMap,0!==kind&&(initializers=protoInitializers=protoInitializers||[])),0!==kind&&!isPrivate){var existingNonFields=isStatic?existingStaticNonFields:existingProtoNonFields,existingKind=existingNonFields.get(name)||0;if(!0===existingKind||3===existingKind&&4!==kind||4===existingKind&&3!==kind)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+name);!existingKind&&kind>2?existingNonFields.set(name,kind):existingNonFields.set(name,!0)}applyMemberDec(ret,base,decInfo,name,kind,isStatic,isPrivate,metadataMap,initializers)}}pushInitializers(ret,protoInitializers),pushInitializers(ret,staticInitializers)}function pushInitializers(ret,initializers){initializers&&ret.push((function(instance){for(var i=0;i<initializers.length;i++)initializers[i].call(instance);return instance}))}function applyClassDecs(ret,targetClass,metadataMap,classDecs){if(classDecs.length>0){for(var initializers=[],newClass=targetClass,name=targetClass.name,i=classDecs.length-1;i>=0;i--){var decoratorFinishedRef={v:!1};try{var ctx=Object.assign({kind:"class",name:name,addInitializer:createAddInitializerMethod(initializers,decoratorFinishedRef)},createMetadataMethodsForProperty(metadataMap,0,name,decoratorFinishedRef)),nextNewClass=classDecs[i](newClass,ctx)}finally{decoratorFinishedRef.v=!0}void 0!==nextNewClass&&(assertValidReturnValue(10,nextNewClass),newClass=nextNewClass)}ret.push(newClass,(function(){for(var i=0;i<initializers.length;i++)initializers[i].call(newClass)}))}}export default function applyDecs(targetClass,memberDecs,classDecs){var ret=[],staticMetadataMap={},protoMetadataMap={};return applyMemberDecs(ret,targetClass,protoMetadataMap,staticMetadataMap,memberDecs),convertMetadataMapToFinal(targetClass.prototype,protoMetadataMap),applyClassDecs(ret,targetClass,staticMetadataMap,classDecs),convertMetadataMapToFinal(targetClass,staticMetadataMap),ret}'),
        asyncIterator: helper("7.15.9", 'export default function _asyncIterator(iterable){var method,async,sync,retry=2;for("undefined"!=typeof Symbol&&(async=Symbol.asyncIterator,sync=Symbol.iterator);retry--;){if(async&&null!=(method=iterable[async]))return method.call(iterable);if(sync&&null!=(method=iterable[sync]))return new AsyncFromSyncIterator(method.call(iterable));async="@@asyncIterator",sync="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(s){function AsyncFromSyncIteratorContinuation(r){if(Object(r)!==r)return Promise.reject(new TypeError(r+" is not an object."));var done=r.done;return Promise.resolve(r.value).then((function(value){return{value:value,done:done}}))}return AsyncFromSyncIterator=function(s){this.s=s,this.n=s.next},AsyncFromSyncIterator.prototype={s:null,n:null,next:function(){return AsyncFromSyncIteratorContinuation(this.n.apply(this.s,arguments))},return:function(value){var ret=this.s.return;return void 0===ret?Promise.resolve({value:value,done:!0}):AsyncFromSyncIteratorContinuation(ret.apply(this.s,arguments))},throw:function(value){var thr=this.s.return;return void 0===thr?Promise.reject(value):AsyncFromSyncIteratorContinuation(thr.apply(this.s,arguments))}},new AsyncFromSyncIterator(s)}'),
        jsx: helper("7.0.0-beta.0", 'var REACT_ELEMENT_TYPE;export default function _createRawReactElement(type,props,key,children){REACT_ELEMENT_TYPE||(REACT_ELEMENT_TYPE="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var defaultProps=type&&type.defaultProps,childrenLength=arguments.length-3;if(props||0===childrenLength||(props={children:void 0}),1===childrenLength)props.children=children;else if(childrenLength>1){for(var childArray=new Array(childrenLength),i=0;i<childrenLength;i++)childArray[i]=arguments[i+3];props.children=childArray}if(props&&defaultProps)for(var propName in defaultProps)void 0===props[propName]&&(props[propName]=defaultProps[propName]);else props||(props=defaultProps||{});return{$$typeof:REACT_ELEMENT_TYPE,type:type,key:void 0===key?null:""+key,ref:null,props:props,_owner:null}}'),
        objectSpread2: helper("7.5.0", 'import defineProperty from"defineProperty";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}export default function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}'),
        typeof: helper("7.0.0-beta.0", 'export default function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}'),
        wrapRegExp: helper("7.2.6", 'import setPrototypeOf from"setPrototypeOf";import inherits from"inherits";export default function _wrapRegExp(){_wrapRegExp=function(re,groups){return new BabelRegExp(re,void 0,groups)};var _super=RegExp.prototype,_groups=new WeakMap;function BabelRegExp(re,flags,groups){var _this=new RegExp(re,flags);return _groups.set(_this,groups||_groups.get(re)),setPrototypeOf(_this,BabelRegExp.prototype)}function buildGroups(result,re){var g=_groups.get(re);return Object.keys(g).reduce((function(groups,name){return groups[name]=result[g[name]],groups}),Object.create(null))}return inherits(BabelRegExp,RegExp),BabelRegExp.prototype.exec=function(str){var result=_super.exec.call(this,str);return result&&(result.groups=buildGroups(result,this)),result},BabelRegExp.prototype[Symbol.replace]=function(str,substitution){if("string"==typeof substitution){var groups=_groups.get(this);return _super[Symbol.replace].call(this,str,substitution.replace(/\\$<([^>]+)>/g,(function(_,name){return"$"+groups[name]})))}if("function"==typeof substitution){var _this=this;return _super[Symbol.replace].call(this,str,(function(){var args=arguments;return"object"!=typeof args[args.length-1]&&(args=[].slice.call(args)).push(buildGroups(args,_this)),substitution.apply(this,args)}))}return _super[Symbol.replace].call(this,str,substitution)},_wrapRegExp.apply(this,arguments)}')
      });
      exports.default = _default;
    },
    9591: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _template = __webpack_require__(4847), _helpersGenerated = __webpack_require__(3281);
      const helpers = Object.assign({
        __proto__: null
      }, _helpersGenerated.default);
      var _default = helpers;
      exports.default = _default;
      const helper = minVersion => tpl => ({
        minVersion,
        ast: () => _template.default.program.ast(tpl)
      });
      helpers.AwaitValue = helper("7.0.0-beta.0")`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`, helpers.AsyncGenerator = helper("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; };

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`, helpers.wrapAsyncGenerator = helper("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`, helpers.awaitAsyncGenerator = helper("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`, helpers.asyncGeneratorDelegate = helper("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () { return this; };

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`, helpers.asyncToGenerator = helper("7.0.0-beta.0")`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`, helpers.classCallCheck = helper("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`, helpers.createClass = helper("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
`, helpers.defineEnumerableProperties = helper("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`, helpers.defaults = helper("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`, helpers.defineProperty = helper("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
`, helpers.extends = helper("7.0.0-beta.0")`
  export default function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

    return _extends.apply(this, arguments);
  }
`, helpers.objectSpread = helper("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`, helpers.inherits = helper("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    // We can't use defineProperty to set the prototype in a single step because it
    // doesn't work in Chrome <= 36. https://github.com/babel/babel/issues/14056
    // V8 bug: https://bugs.chromium.org/p/v8/issues/detail?id=3334
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", { writable: false });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`, helpers.inheritsLoose = helper("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    setPrototypeOf(subClass, superClass);
  }
`, helpers.getPrototypeOf = helper("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`, helpers.setPrototypeOf = helper("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`, helpers.isNativeReflectConstruct = helper("7.9.0")`
  export default function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Boolean object.

      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }
`, helpers.construct = helper("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`, helpers.isNativeFunction = helper("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`, helpers.wrapNativeSuper = helper("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`, helpers.instanceof = helper("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`, helpers.interopRequireDefault = helper("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`, helpers.interopRequireWildcard = helper("7.14.0")`
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function (nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  export default function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`, helpers.newArrowCheck = helper("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`, helpers.objectDestructuringEmpty = helper("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`, helpers.objectWithoutPropertiesLoose = helper("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`, helpers.objectWithoutProperties = helper("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`, helpers.assertThisInitialized = helper("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`, helpers.possibleConstructorReturn = helper("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return assertThisInitialized(self);
  }
`, helpers.createSuper = helper("7.9.0")`
  import getPrototypeOf from "getPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";
  import possibleConstructorReturn from "possibleConstructorReturn";

  export default function _createSuper(Derived) {
    var hasNativeReflectConstruct = isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn(this, result);
    }
  }
 `, helpers.superPropBase = helper("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`, helpers.get = helper("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          // STEP 3. If receiver is not present, then set receiver to target.
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
`, helpers.set = helper("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`, helpers.taggedTemplateLiteral = helper("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`, helpers.taggedTemplateLiteralLoose = helper("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`, helpers.readOnlyError = helper("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new TypeError("\\"" + name + "\\" is read-only");
  }
`, helpers.writeOnlyError = helper("7.12.13")`
  export default function _writeOnlyError(name) {
    throw new TypeError("\\"" + name + "\\" is write-only");
  }
`, helpers.classNameTDZError = helper("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`, helpers.temporalUndefined = helper("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`, helpers.tdz = helper("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`, helpers.temporalRef = helper("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`, helpers.slicedToArray = helper("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimit(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`, helpers.slicedToArrayLoose = helper("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimitLoose(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`, helpers.toArray = helper("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return (
      arrayWithHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableRest()
    );
  }
`, helpers.toConsumableArray = helper("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    );
  }
`, helpers.arrayWithoutHoles = helper("7.0.0-beta.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
`, helpers.arrayWithHoles = helper("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`, helpers.maybeArrayLike = helper("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
  }
`, helpers.iterableToArray = helper("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
`, helpers.iterableToArrayLimit = helper("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    var _i = arr == null ? null : (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null) return;

    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
`, helpers.iterableToArrayLimitLoose = helper("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null) return;

    var _arr = [];
    for (_i = _i.call(arr), _step; !(_step = _i.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`, helpers.unsupportedIterableToArray = helper("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen);
  }
`, helpers.arrayLikeToArray = helper("7.9.0")`
  export default function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
`, helpers.nonIterableSpread = helper("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`, helpers.nonIterableRest = helper("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`, helpers.createForOfIteratorHelper = helper("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  // s: start (create the iterator)
  // n: next
  // e: error (called whenever something throws)
  // f: finish (always called at the end)

  export default function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        var F = function(){};
        return {
          s: F,
          n: function() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function(e) { throw e; },
          f: F,
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true, didErr = false, err;

    return {
      s: function() {
        it = it.call(o);
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
`, helpers.createForOfIteratorHelperLoose = helper("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (it) return (it = it.call(o)).next.bind(it);

    // Fallback for engines without symbol support
    if (
      Array.isArray(o) ||
      (it = unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      return function() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
`, helpers.skipFirstGeneratorNext = helper("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`, helpers.toPrimitive = helper("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`, helpers.toPropertyKey = helper("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`, helpers.initializerWarningHelper = helper("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`, helpers.initializerDefineProperty = helper("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`, helpers.applyDecoratedDescriptor = helper("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`, helpers.classPrivateFieldLooseKey = helper("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`, helpers.classPrivateFieldLooseBase = helper("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`, helpers.classPrivateFieldGet = helper("7.0.0-beta.0")`
  import classApplyDescriptorGet from "classApplyDescriptorGet";
  import classExtractFieldDescriptor from "classExtractFieldDescriptor";
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
    return classApplyDescriptorGet(receiver, descriptor);
  }
`, helpers.classPrivateFieldSet = helper("7.0.0-beta.0")`
  import classApplyDescriptorSet from "classApplyDescriptorSet";
  import classExtractFieldDescriptor from "classExtractFieldDescriptor";
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
    classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
`, helpers.classPrivateFieldDestructureSet = helper("7.4.4")`
  import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
  import classExtractFieldDescriptor from "classExtractFieldDescriptor";
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
    return classApplyDescriptorDestructureSet(receiver, descriptor);
  }
`, helpers.classExtractFieldDescriptor = helper("7.13.10")`
  export default function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
`, helpers.classStaticPrivateFieldSpecGet = helper("7.0.2")`
  import classApplyDescriptorGet from "classApplyDescriptorGet";
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    classCheckPrivateStaticFieldDescriptor(descriptor, "get");
    return classApplyDescriptorGet(receiver, descriptor);
  }
`, helpers.classStaticPrivateFieldSpecSet = helper("7.0.2")`
  import classApplyDescriptorSet from "classApplyDescriptorSet";
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    classCheckPrivateStaticFieldDescriptor(descriptor, "set");
    classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
`, helpers.classStaticPrivateMethodGet = helper("7.3.2")`
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    return method;
  }
`, helpers.classStaticPrivateMethodSet = helper("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`, helpers.classApplyDescriptorGet = helper("7.13.10")`
  export default function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`, helpers.classApplyDescriptorSet = helper("7.13.10")`
  export default function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
`, helpers.classApplyDescriptorDestructureSet = helper("7.13.10")`
  export default function _classApplyDescriptorDestructureSet(receiver, descriptor) {
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`, helpers.classStaticPrivateFieldDestructureSet = helper("7.13.10")`
  import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
  export default function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    classCheckPrivateStaticFieldDescriptor(descriptor, "set");
    return classApplyDescriptorDestructureSet(receiver, descriptor);
  }
`, helpers.classCheckPrivateStaticAccess = helper("7.13.10")`
  export default function _classCheckPrivateStaticAccess(receiver, classConstructor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
  }
`, helpers.classCheckPrivateStaticFieldDescriptor = helper("7.13.10")`
  export default function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
    if (descriptor === undefined) {
      throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
  }
`, helpers.decorate = helper("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`, helpers.classPrivateMethodGet = helper("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`, helpers.checkPrivateRedeclaration = helper("7.14.1")`
  export default function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
`, helpers.classPrivateFieldInitSpec = helper("7.14.1")`
  import checkPrivateRedeclaration from "checkPrivateRedeclaration";

  export default function _classPrivateFieldInitSpec(obj, privateMap, value) {
    checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
`, helpers.classPrivateMethodInitSpec = helper("7.14.1")`
  import checkPrivateRedeclaration from "checkPrivateRedeclaration";

  export default function _classPrivateMethodInitSpec(obj, privateSet) {
    checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
`, helpers.classPrivateMethodSet = helper("7.1.6")`
    export default function _classPrivateMethodSet() {
      throw new TypeError("attempted to reassign private method");
    }
  `, helpers.identity = helper("7.17.0")`
  export default function _identity(x) {
    return x;
  }
`;
    },
    3466: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, exports.ensure = function(name, newFileClass) {
        FileClass || (FileClass = newFileClass), loadHelper(name);
      }, exports.get = get, exports.getDependencies = function(name) {
        return loadHelper(name).getDependencies();
      }, exports.list = void 0, exports.minVersion = function(name) {
        return loadHelper(name).minVersion;
      };
      var _traverse = __webpack_require__(241), _t = __webpack_require__(7289), _helpers = __webpack_require__(9591);
      const {assignmentExpression, cloneNode, expressionStatement, file, identifier} = _t;
      function makePath(path) {
        const parts = [];
        for (;path.parentPath; path = path.parentPath) parts.push(path.key), path.inList && parts.push(path.listKey);
        return parts.reverse().join(".");
      }
      let FileClass;
      function getHelperMetadata(file) {
        const globals = new Set, localBindingNames = new Set, dependencies = new Map;
        let exportName, exportPath;
        const exportBindingAssignments = [], importPaths = [], importBindingsReferences = [], dependencyVisitor = {
          ImportDeclaration(child) {
            const name = child.node.source.value;
            if (!_helpers.default[name]) throw child.buildCodeFrameError(`Unknown helper ${name}`);
            if (1 !== child.get("specifiers").length || !child.get("specifiers.0").isImportDefaultSpecifier()) throw child.buildCodeFrameError("Helpers can only import a default value");
            const bindingIdentifier = child.node.specifiers[0].local;
            dependencies.set(bindingIdentifier, name), importPaths.push(makePath(child));
          },
          ExportDefaultDeclaration(child) {
            const decl = child.get("declaration");
            if (!decl.isFunctionDeclaration() || !decl.node.id) throw decl.buildCodeFrameError("Helpers can only export named function declarations");
            exportName = decl.node.id.name, exportPath = makePath(child);
          },
          ExportAllDeclaration(child) {
            throw child.buildCodeFrameError("Helpers can only export default");
          },
          ExportNamedDeclaration(child) {
            throw child.buildCodeFrameError("Helpers can only export default");
          },
          Statement(child) {
            child.isModuleDeclaration() || child.skip();
          }
        }, referenceVisitor = {
          Program(path) {
            const bindings = path.scope.getAllBindings();
            Object.keys(bindings).forEach((name => {
              name !== exportName && (dependencies.has(bindings[name].identifier) || localBindingNames.add(name));
            }));
          },
          ReferencedIdentifier(child) {
            const name = child.node.name, binding = child.scope.getBinding(name);
            binding ? dependencies.has(binding.identifier) && importBindingsReferences.push(makePath(child)) : globals.add(name);
          },
          AssignmentExpression(child) {
            const left = child.get("left");
            if (!(exportName in left.getBindingIdentifiers())) return;
            if (!left.isIdentifier()) throw left.buildCodeFrameError("Only simple assignments to exports are allowed in helpers");
            const binding = child.scope.getBinding(exportName);
            null != binding && binding.scope.path.isProgram() && exportBindingAssignments.push(makePath(child));
          }
        };
        if ((0, _traverse.default)(file.ast, dependencyVisitor, file.scope), (0, _traverse.default)(file.ast, referenceVisitor, file.scope), 
        !exportPath) throw new Error("Helpers must have a default export.");
        return exportBindingAssignments.reverse(), {
          globals: Array.from(globals),
          localBindingNames: Array.from(localBindingNames),
          dependencies,
          exportBindingAssignments,
          exportPath,
          exportName,
          importBindingsReferences,
          importPaths
        };
      }
      const helperData = Object.create(null);
      function loadHelper(name) {
        if (!helperData[name]) {
          const helper = _helpers.default[name];
          if (!helper) throw Object.assign(new ReferenceError(`Unknown helper ${name}`), {
            code: "BABEL_HELPER_UNKNOWN",
            helper: name
          });
          const fn = () => {
            if (!FileClass) {
              const fakeFile = {
                ast: file(helper.ast()),
                path: null
              };
              return (0, _traverse.default)(fakeFile.ast, {
                Program: path => (fakeFile.path = path).stop()
              }), fakeFile;
            }
            return new FileClass({
              filename: `babel-helper://${name}`
            }, {
              ast: file(helper.ast()),
              code: "[internal Babel helper code]",
              inputMap: null
            });
          };
          let metadata = null;
          helperData[name] = {
            minVersion: helper.minVersion,
            build(getDependency, id, localBindings) {
              const file = fn();
              return metadata || (metadata = getHelperMetadata(file)), function(file, metadata, id, localBindings, getDependency) {
                if (localBindings && !id) throw new Error("Unexpected local bindings for module-based helpers.");
                if (!id) return;
                const {localBindingNames, dependencies, exportBindingAssignments, exportPath, exportName, importBindingsReferences, importPaths} = metadata, dependenciesRefs = {};
                dependencies.forEach(((name, id) => {
                  dependenciesRefs[id.name] = "function" == typeof getDependency && getDependency(name) || id;
                }));
                const toRename = {}, bindings = new Set(localBindings || []);
                localBindingNames.forEach((name => {
                  let newName = name;
                  for (;bindings.has(newName); ) newName = "_" + newName;
                  newName !== name && (toRename[name] = newName);
                })), "Identifier" === id.type && exportName !== id.name && (toRename[exportName] = id.name);
                const {path} = file, exp = path.get(exportPath), imps = importPaths.map((p => path.get(p))), impsBindingRefs = importBindingsReferences.map((p => path.get(p))), decl = exp.get("declaration");
                if ("Identifier" === id.type) exp.replaceWith(decl); else {
                  if ("MemberExpression" !== id.type) throw new Error("Unexpected helper format.");
                  exportBindingAssignments.forEach((assignPath => {
                    const assign = path.get(assignPath);
                    assign.replaceWith(assignmentExpression("=", id, assign.node));
                  })), exp.replaceWith(decl), path.pushContainer("body", expressionStatement(assignmentExpression("=", id, identifier(exportName))));
                }
                Object.keys(toRename).forEach((name => {
                  path.scope.rename(name, toRename[name]);
                }));
                for (const path of imps) path.remove();
                for (const path of impsBindingRefs) {
                  const node = cloneNode(dependenciesRefs[path.node.name]);
                  path.replaceWith(node);
                }
              }(file, metadata, id, localBindings, getDependency), {
                nodes: file.ast.program.body,
                globals: metadata.globals
              };
            },
            getDependencies: () => (metadata || (metadata = getHelperMetadata(fn())), Array.from(metadata.dependencies.values()))
          };
        }
        return helperData[name];
      }
      function get(name, getDependency, id, localBindings) {
        return loadHelper(name).build(getDependency, id, localBindings);
      }
      const list = Object.keys(_helpers.default).map((name => name.replace(/^_/, "")));
      exports.list = list;
      var _default = get;
      exports.default = _default;
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
      var _t = __webpack_require__(7289);
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
      var _t = __webpack_require__(7289), _parser = __webpack_require__(9516), _codeFrame = __webpack_require__(4709);
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
      var _t = __webpack_require__(7289);
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
    2509: function(__unused_webpack_module, exports, __webpack_require__) {
      !function(exports, setArray, sourcemapCodec) {
        "use strict";
        exports.addSegment = void 0, exports.addMapping = void 0, exports.setSourceContent = void 0, 
        exports.decodedMap = void 0, exports.encodedMap = void 0, exports.allMappings = void 0;
        class GenMapping {
          constructor({file, sourceRoot} = {}) {
            this._names = new setArray.SetArray, this._sources = new setArray.SetArray, this._sourcesContent = [], 
            this._mappings = [], this.file = file, this.sourceRoot = sourceRoot;
          }
        }
        function getLine(mappings, index) {
          for (let i = mappings.length; i <= index; i++) mappings[i] = [];
          return mappings[index];
        }
        function getColumnIndex(line, column, seg) {
          let index = line.length;
          for (let i = index - 1; i >= 0; i--, index--) {
            const current = line[i], col = current[0];
            if (col > column) continue;
            if (col < column) break;
            const cmp = compare(current, seg);
            if (0 === cmp) return index;
            if (cmp < 0) break;
          }
          return index;
        }
        function compare(a, b) {
          let cmp = compareNum(a.length, b.length);
          return 0 !== cmp ? cmp : 1 === a.length ? 0 : (cmp = compareNum(a[1], b[1]), 0 !== cmp ? cmp : (cmp = compareNum(a[2], b[2]), 
          0 !== cmp ? cmp : (cmp = compareNum(a[3], b[3]), 0 !== cmp ? cmp : 4 === a.length ? 0 : compareNum(a[4], b[4]))));
        }
        function compareNum(a, b) {
          return a - b;
        }
        function insert(array, index, value) {
          if (-1 !== index) {
            for (let i = array.length; i > index; i--) array[i] = array[i - 1];
            array[index] = value;
          }
        }
        exports.addSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name) => {
          const {_mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names} = map, line = getLine(mappings, genLine);
          if (null == source) {
            const seg = [ genColumn ];
            return insert(line, getColumnIndex(line, genColumn, seg), seg);
          }
          const sourcesIndex = setArray.put(sources, source), seg = name ? [ genColumn, sourcesIndex, sourceLine, sourceColumn, setArray.put(names, name) ] : [ genColumn, sourcesIndex, sourceLine, sourceColumn ], index = getColumnIndex(line, genColumn, seg);
          sourcesIndex === sourcesContent.length && (sourcesContent[sourcesIndex] = null), 
          insert(line, index, seg);
        }, exports.addMapping = (map, mapping) => {
          const {generated, source, original, name} = mapping;
          return exports.addSegment(map, generated.line - 1, generated.column, source, null == original ? void 0 : original.line - 1, null == original ? void 0 : original.column, name);
        }, exports.setSourceContent = (map, source, content) => {
          const {_sources: sources, _sourcesContent: sourcesContent} = map;
          sourcesContent[setArray.put(sources, source)] = content;
        }, exports.decodedMap = map => {
          const {file, sourceRoot, _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names} = map;
          return {
            version: 3,
            file,
            names: names.array,
            sourceRoot: sourceRoot || void 0,
            sources: sources.array,
            sourcesContent,
            mappings
          };
        }, exports.encodedMap = map => {
          const decoded = exports.decodedMap(map);
          return Object.assign(Object.assign({}, decoded), {
            mappings: sourcemapCodec.encode(decoded.mappings)
          });
        }, exports.allMappings = map => {
          const out = [], {_mappings: mappings, _sources: sources, _names: names} = map;
          for (let i = 0; i < mappings.length; i++) {
            const line = mappings[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j], generated = {
                line: i + 1,
                column: seg[0]
              };
              let source, original, name;
              1 !== seg.length && (source = sources.array[seg[1]], original = {
                line: seg[2] + 1,
                column: seg[3]
              }, 5 === seg.length && (name = names.array[seg[4]])), out.push({
                generated,
                source,
                original,
                name
              });
            }
          }
          return out;
        }, exports.GenMapping = GenMapping, Object.defineProperty(exports, "__esModule", {
          value: !0
        });
      }(exports, __webpack_require__(2208), __webpack_require__(2297));
    },
    2208: function(__unused_webpack_module, exports) {
      !function(exports) {
        "use strict";
        exports.get = void 0, exports.put = void 0, exports.pop = void 0;
        class SetArray {
          constructor() {
            this._indexes = {
              __proto__: null
            }, this.array = [];
          }
        }
        exports.get = (strarr, key) => strarr._indexes[key], exports.put = (strarr, key) => {
          const index = exports.get(strarr, key);
          if (void 0 !== index) return index;
          const {array, _indexes: indexes} = strarr;
          return indexes[key] = array.push(key) - 1;
        }, exports.pop = strarr => {
          const {array, _indexes: indexes} = strarr;
          0 !== array.length && (indexes[array.pop()] = void 0);
        }, exports.SetArray = SetArray, Object.defineProperty(exports, "__esModule", {
          value: !0
        });
      }(exports);
    },
    2297: function(__unused_webpack_module, exports) {
      !function(exports) {
        "use strict";
        const comma = ",".charCodeAt(0), semicolon = ";".charCodeAt(0), chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", intToChar = new Uint8Array(64), charToInt = new Uint8Array(128);
        for (let i = 0; i < chars.length; i++) {
          const c = chars.charCodeAt(i);
          intToChar[i] = c, charToInt[c] = i;
        }
        const td = "undefined" != typeof TextDecoder ? new TextDecoder : "undefined" != typeof Buffer ? {
          decode: buf => Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString()
        } : {
          decode(buf) {
            let out = "";
            for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
            return out;
          }
        };
        function decode(mappings) {
          const state = new Int32Array(5), decoded = [];
          let index = 0;
          do {
            const semi = indexOf(mappings, index), line = [];
            let sorted = !0, lastCol = 0;
            state[0] = 0;
            for (let i = index; i < semi; i++) {
              let seg;
              i = decodeInteger(mappings, i, state, 0);
              const col = state[0];
              col < lastCol && (sorted = !1), lastCol = col, hasMoreVlq(mappings, i, semi) ? (i = decodeInteger(mappings, i, state, 1), 
              i = decodeInteger(mappings, i, state, 2), i = decodeInteger(mappings, i, state, 3), 
              hasMoreVlq(mappings, i, semi) ? (i = decodeInteger(mappings, i, state, 4), seg = [ col, state[1], state[2], state[3], state[4] ]) : seg = [ col, state[1], state[2], state[3] ]) : seg = [ col ], 
              line.push(seg);
            }
            sorted || sort(line), decoded.push(line), index = semi + 1;
          } while (index <= mappings.length);
          return decoded;
        }
        function indexOf(mappings, index) {
          const idx = mappings.indexOf(";", index);
          return -1 === idx ? mappings.length : idx;
        }
        function decodeInteger(mappings, pos, state, j) {
          let value = 0, shift = 0, integer = 0;
          do {
            const c = mappings.charCodeAt(pos++);
            integer = charToInt[c], value |= (31 & integer) << shift, shift += 5;
          } while (32 & integer);
          const shouldNegate = 1 & value;
          return value >>>= 1, shouldNegate && (value = -2147483648 | -value), state[j] += value, 
          pos;
        }
        function hasMoreVlq(mappings, i, length) {
          return !(i >= length) && mappings.charCodeAt(i) !== comma;
        }
        function sort(line) {
          line.sort(sortComparator);
        }
        function sortComparator(a, b) {
          return a[0] - b[0];
        }
        function encode(decoded) {
          const state = new Int32Array(5), bufLength = 16384, subLength = bufLength - 36, buf = new Uint8Array(bufLength), sub = buf.subarray(0, subLength);
          let pos = 0, out = "";
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            if (i > 0 && (pos === bufLength && (out += td.decode(buf), pos = 0), buf[pos++] = semicolon), 
            0 !== line.length) {
              state[0] = 0;
              for (let j = 0; j < line.length; j++) {
                const segment = line[j];
                pos > subLength && (out += td.decode(sub), buf.copyWithin(0, subLength, pos), pos -= subLength), 
                j > 0 && (buf[pos++] = comma), pos = encodeInteger(buf, pos, state, segment, 0), 
                1 !== segment.length && (pos = encodeInteger(buf, pos, state, segment, 1), pos = encodeInteger(buf, pos, state, segment, 2), 
                pos = encodeInteger(buf, pos, state, segment, 3), 4 !== segment.length && (pos = encodeInteger(buf, pos, state, segment, 4)));
              }
            }
          }
          return out + td.decode(buf.subarray(0, pos));
        }
        function encodeInteger(buf, pos, state, segment, j) {
          const next = segment[j];
          let num = next - state[j];
          state[j] = next, num = num < 0 ? -num << 1 | 1 : num << 1;
          do {
            let clamped = 31 & num;
            num >>>= 5, num > 0 && (clamped |= 32), buf[pos++] = intToChar[clamped];
          } while (num > 0);
          return pos;
        }
        exports.decode = decode, exports.encode = encode, Object.defineProperty(exports, "__esModule", {
          value: !0
        });
      }(exports);
    },
    3514: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      var fs = __webpack_require__(7147), path = __webpack_require__(1017), SafeBuffer = __webpack_require__(9509);
      function Converter(sm, opts) {
        var base64;
        (opts = opts || {}).isFileComment && (sm = function(sm, dir) {
          var r = exports.mapFileCommentRegex.exec(sm), filename = r[1] || r[2], filepath = path.resolve(dir, filename);
          try {
            return fs.readFileSync(filepath, "utf8");
          } catch (e) {
            throw new Error("An error occurred while trying to read the map file at " + filepath + "\n" + e);
          }
        }(sm, opts.commentFileDir)), opts.hasComment && (sm = function(sm) {
          return sm.split(",").pop();
        }(sm)), opts.isEncoded && (base64 = sm, sm = (SafeBuffer.Buffer.from(base64, "base64") || "").toString()), 
        (opts.isJSON || opts.isEncoded) && (sm = JSON.parse(sm)), this.sourcemap = sm;
      }
      Object.defineProperty(exports, "commentRegex", {
        get: function() {
          return /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/gm;
        }
      }), Object.defineProperty(exports, "mapFileCommentRegex", {
        get: function() {
          return /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"`]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/){1}[ \t]*$)/gm;
        }
      }), Converter.prototype.toJSON = function(space) {
        return JSON.stringify(this.sourcemap, null, space);
      }, Converter.prototype.toBase64 = function() {
        var json = this.toJSON();
        return (SafeBuffer.Buffer.from(json, "utf8") || "").toString("base64");
      }, Converter.prototype.toComment = function(options) {
        var data = "sourceMappingURL=data:application/json;charset=utf-8;base64," + this.toBase64();
        return options && options.multiline ? "/*# " + data + " */" : "//# " + data;
      }, Converter.prototype.toObject = function() {
        return JSON.parse(this.toJSON());
      }, Converter.prototype.addProperty = function(key, value) {
        if (this.sourcemap.hasOwnProperty(key)) throw new Error('property "' + key + '" already exists on the sourcemap, use set property instead');
        return this.setProperty(key, value);
      }, Converter.prototype.setProperty = function(key, value) {
        return this.sourcemap[key] = value, this;
      }, Converter.prototype.getProperty = function(key) {
        return this.sourcemap[key];
      }, exports.fromObject = function(obj) {
        return new Converter(obj);
      }, exports.fromJSON = function(json) {
        return new Converter(json, {
          isJSON: !0
        });
      }, exports.fromBase64 = function(base64) {
        return new Converter(base64, {
          isEncoded: !0
        });
      }, exports.fromComment = function(comment) {
        return new Converter(comment = comment.replace(/^\/\*/g, "//").replace(/\*\/$/g, ""), {
          isEncoded: !0,
          hasComment: !0
        });
      }, exports.fromMapFileComment = function(comment, dir) {
        return new Converter(comment, {
          commentFileDir: dir,
          isFileComment: !0,
          isJSON: !0
        });
      }, exports.fromSource = function(content) {
        var m = content.match(exports.commentRegex);
        return m ? exports.fromComment(m.pop()) : null;
      }, exports.fromMapFileSource = function(content, dir) {
        var m = content.match(exports.mapFileCommentRegex);
        return m ? exports.fromMapFileComment(m.pop(), dir) : null;
      }, exports.removeComments = function(src) {
        return src.replace(exports.commentRegex, "");
      }, exports.removeMapFileComments = function(src) {
        return src.replace(exports.mapFileCommentRegex, "");
      }, exports.generateMapFileComment = function(file, options) {
        var data = "sourceMappingURL=" + file;
        return options && options.multiline ? "/*# " + data + " */" : "//# " + data;
      };
    },
    1227: (module, exports, __webpack_require__) => {
      exports.formatArgs = function(args) {
        if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), 
        !this.useColors) return;
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0, lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match => {
          "%%" !== match && (index++, "%c" === match && (lastC = index));
        })), args.splice(lastC, 0, c);
      }, exports.save = function(namespaces) {
        try {
          namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
        } catch (error) {}
      }, exports.load = function() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {}
        !r && "undefined" != typeof process && "env" in process && (r = process.env.DEBUG);
        return r;
      }, exports.useColors = function() {
        if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
        if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
        return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }, exports.storage = function() {
        try {
          return localStorage;
        } catch (error) {}
      }(), exports.destroy = (() => {
        let warned = !1;
        return () => {
          warned || (warned = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
        };
      })(), exports.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
      exports.log = console.debug || console.log || (() => {}), module.exports = __webpack_require__(2447)(exports);
      const {formatters} = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    },
    2447: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = function(env) {
        function createDebug(namespace) {
          let prevTime, namespacesCache, enabledCache, enableOverride = null;
          function debug(...args) {
            if (!debug.enabled) return;
            const self = debug, curr = Number(new Date), ms = curr - (prevTime || curr);
            self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), 
            "string" != typeof args[0] && args.unshift("%O");
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, ((match, format) => {
              if ("%%" === match) return "%";
              index++;
              const formatter = createDebug.formatters[format];
              if ("function" == typeof formatter) {
                const val = args[index];
                match = formatter.call(self, val), args.splice(index, 1), index--;
              }
              return match;
            })), createDebug.formatArgs.call(self, args);
            (self.log || createDebug.log).apply(self, args);
          }
          return debug.namespace = namespace, debug.useColors = createDebug.useColors(), debug.color = createDebug.selectColor(namespace), 
          debug.extend = extend, debug.destroy = createDebug.destroy, Object.defineProperty(debug, "enabled", {
            enumerable: !0,
            configurable: !1,
            get: () => null !== enableOverride ? enableOverride : (namespacesCache !== createDebug.namespaces && (namespacesCache = createDebug.namespaces, 
            enabledCache = createDebug.enabled(namespace)), enabledCache),
            set: v => {
              enableOverride = v;
            }
          }), "function" == typeof createDebug.init && createDebug.init(debug), debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (void 0 === delimiter ? ":" : delimiter) + namespace);
          return newDebug.log = this.log, newDebug;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        return createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = function(val) {
          if (val instanceof Error) return val.stack || val.message;
          return val;
        }, createDebug.disable = function() {
          const namespaces = [ ...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map((namespace => "-" + namespace)) ].join(",");
          return createDebug.enable(""), namespaces;
        }, createDebug.enable = function(namespaces) {
          let i;
          createDebug.save(namespaces), createDebug.namespaces = namespaces, createDebug.names = [], 
          createDebug.skips = [];
          const split = ("string" == typeof namespaces ? namespaces : "").split(/[\s,]+/), len = split.length;
          for (i = 0; i < len; i++) split[i] && ("-" === (namespaces = split[i].replace(/\*/g, ".*?"))[0] ? createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$")) : createDebug.names.push(new RegExp("^" + namespaces + "$")));
        }, createDebug.enabled = function(name) {
          if ("*" === name[name.length - 1]) return !0;
          let i, len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) if (createDebug.skips[i].test(name)) return !1;
          for (i = 0, len = createDebug.names.length; i < len; i++) if (createDebug.names[i].test(name)) return !0;
          return !1;
        }, createDebug.humanize = __webpack_require__(7824), createDebug.destroy = function() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }, Object.keys(env).forEach((key => {
          createDebug[key] = env[key];
        })), createDebug.names = [], createDebug.skips = [], createDebug.formatters = {}, 
        createDebug.selectColor = function(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) hash = (hash << 5) - hash + namespace.charCodeAt(i), 
          hash |= 0;
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }, createDebug.enable(createDebug.load()), createDebug;
      };
    },
    5158: (module, __unused_webpack_exports, __webpack_require__) => {
      "undefined" == typeof process || "renderer" === process.type || !0 === process.browser || process.__nwjs ? module.exports = __webpack_require__(1227) : module.exports = __webpack_require__(39);
    },
    39: (module, exports, __webpack_require__) => {
      const tty = __webpack_require__(6224), util = __webpack_require__(3837);
      exports.init = function(debug) {
        debug.inspectOpts = {};
        const keys = Object.keys(exports.inspectOpts);
        for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }, exports.log = function(...args) {
        return process.stderr.write(util.format(...args) + "\n");
      }, exports.formatArgs = function(args) {
        const {namespace: name, useColors} = this;
        if (useColors) {
          const c = this.color, colorCode = "[3" + (c < 8 ? c : "8;5;" + c), prefix = `  ${colorCode};1m${name} [0m`;
          args[0] = prefix + args[0].split("\n").join("\n" + prefix), args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "[0m");
        } else args[0] = function() {
          if (exports.inspectOpts.hideDate) return "";
          return (new Date).toISOString() + " ";
        }() + name + " " + args[0];
      }, exports.save = function(namespaces) {
        namespaces ? process.env.DEBUG = namespaces : delete process.env.DEBUG;
      }, exports.load = function() {
        return process.env.DEBUG;
      }, exports.useColors = function() {
        return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }, exports.destroy = util.deprecate((() => {}), "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), 
      exports.colors = [ 6, 2, 3, 4, 5, 1 ];
      try {
        const supportsColor = __webpack_require__(2130);
        supportsColor && (supportsColor.stderr || supportsColor).level >= 2 && (exports.colors = [ 20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221 ]);
      } catch (error) {}
      exports.inspectOpts = Object.keys(process.env).filter((key => /^debug_/i.test(key))).reduce(((obj, key) => {
        const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, ((_, k) => k.toUpperCase()));
        let val = process.env[key];
        return val = !!/^(yes|on|true|enabled)$/i.test(val) || !/^(no|off|false|disabled)$/i.test(val) && ("null" === val ? null : Number(val)), 
        obj[prop] = val, obj;
      }), {}), module.exports = __webpack_require__(2447)(exports);
      const {formatters} = module.exports;
      formatters.o = function(v) {
        return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts).split("\n").map((str => str.trim())).join(" ");
      }, formatters.O = function(v) {
        return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts);
      };
    },
    664: module => {
      "use strict";
      const GENSYNC_START = Symbol.for("gensync:v1:start"), GENSYNC_SUSPEND = Symbol.for("gensync:v1:suspend");
      function assertTypeof(type, name, value, allowUndefined) {
        if (typeof value === type || allowUndefined && void 0 === value) return;
        let msg;
        throw msg = allowUndefined ? `Expected opts.${name} to be either a ${type}, or undefined.` : `Expected opts.${name} to be a ${type}.`, 
        makeError(msg, "GENSYNC_OPTIONS_ERROR");
      }
      function makeError(msg, code) {
        return Object.assign(new Error(msg), {
          code
        });
      }
      function buildOperation({name, arity, sync, async}) {
        return setFunctionMetadata(name, arity, (function*(...args) {
          const resume = yield GENSYNC_START;
          if (!resume) {
            return sync.call(this, args);
          }
          let result;
          try {
            async.call(this, args, (value => {
              result || (result = {
                value
              }, resume());
            }), (err => {
              result || (result = {
                err
              }, resume());
            }));
          } catch (err) {
            result = {
              err
            }, resume();
          }
          if (yield GENSYNC_SUSPEND, result.hasOwnProperty("err")) throw result.err;
          return result.value;
        }));
      }
      function evaluateSync(gen) {
        let value;
        for (;!({value} = gen.next()).done; ) assertStart(value, gen);
        return value;
      }
      function evaluateAsync(gen, resolve, reject) {
        !function step() {
          try {
            let value;
            for (;!({value} = gen.next()).done; ) {
              assertStart(value, gen);
              let sync = !0, didSyncResume = !1;
              const out = gen.next((() => {
                sync ? didSyncResume = !0 : step();
              }));
              if (sync = !1, assertSuspend(out, gen), !didSyncResume) return;
            }
            return resolve(value);
          } catch (err) {
            return reject(err);
          }
        }();
      }
      function assertStart(value, gen) {
        value !== GENSYNC_START && throwError(gen, makeError(`Got unexpected yielded value in gensync generator: ${JSON.stringify(value)}. Did you perhaps mean to use 'yield*' instead of 'yield'?`, "GENSYNC_EXPECTED_START"));
      }
      function assertSuspend({value, done}, gen) {
        (done || value !== GENSYNC_SUSPEND) && throwError(gen, makeError(done ? "Unexpected generator completion. If you get this, it is probably a gensync bug." : `Expected GENSYNC_SUSPEND, got ${JSON.stringify(value)}. If you get this, it is probably a gensync bug.`, "GENSYNC_EXPECTED_SUSPEND"));
      }
      function throwError(gen, err) {
        throw gen.throw && gen.throw(err), err;
      }
      function setFunctionMetadata(name, arity, fn) {
        if ("string" == typeof name) {
          const nameDesc = Object.getOwnPropertyDescriptor(fn, "name");
          nameDesc && !nameDesc.configurable || Object.defineProperty(fn, "name", Object.assign(nameDesc || {}, {
            configurable: !0,
            value: name
          }));
        }
        if ("number" == typeof arity) {
          const lengthDesc = Object.getOwnPropertyDescriptor(fn, "length");
          lengthDesc && !lengthDesc.configurable || Object.defineProperty(fn, "length", Object.assign(lengthDesc || {}, {
            configurable: !0,
            value: arity
          }));
        }
        return fn;
      }
      module.exports = Object.assign((function(optsOrFn) {
        let genFn = optsOrFn;
        return genFn = "function" != typeof optsOrFn ? function({name, arity, sync, async, errback}) {
          if (assertTypeof("string", "name", name, !0), assertTypeof("number", "arity", arity, !0), 
          assertTypeof("function", "sync", sync), assertTypeof("function", "async", async, !0), 
          assertTypeof("function", "errback", errback, !0), async && errback) throw makeError("Expected one of either opts.async or opts.errback, but got _both_.", "GENSYNC_OPTIONS_ERROR");
          if ("string" != typeof name) {
            let fnName;
            errback && errback.name && "errback" !== errback.name && (fnName = errback.name), 
            async && async.name && "async" !== async.name && (fnName = async.name.replace(/Async$/, "")), 
            sync && sync.name && "sync" !== sync.name && (fnName = sync.name.replace(/Sync$/, "")), 
            "string" == typeof fnName && (name = fnName);
          }
          "number" != typeof arity && (arity = sync.length);
          return buildOperation({
            name,
            arity,
            sync: function(args) {
              return sync.apply(this, args);
            },
            async: function(args, resolve, reject) {
              async ? async.apply(this, args).then(resolve, reject) : errback ? errback.call(this, ...args, ((err, value) => {
                null == err ? resolve(value) : reject(err);
              })) : resolve(sync.apply(this, args));
            }
          });
        }(optsOrFn) : function(genFn) {
          return setFunctionMetadata(genFn.name, genFn.length, (function(...args) {
            return genFn.apply(this, args);
          }));
        }(optsOrFn), Object.assign(genFn, function(genFn) {
          return {
            sync: function(...args) {
              return evaluateSync(genFn.apply(this, args));
            },
            async: function(...args) {
              return new Promise(((resolve, reject) => {
                evaluateAsync(genFn.apply(this, args), resolve, reject);
              }));
            },
            errback: function(...args) {
              const cb = args.pop();
              if ("function" != typeof cb) throw makeError("Asynchronous function called without callback", "GENSYNC_ERRBACK_NO_CALLBACK");
              let gen;
              try {
                gen = genFn.apply(this, args);
              } catch (err) {
                return void cb(err);
              }
              evaluateAsync(gen, (val => cb(void 0, val)), (err => cb(err)));
            }
          };
        }(genFn));
      }), {
        all: buildOperation({
          name: "all",
          arity: 1,
          sync: function(args) {
            return Array.from(args[0]).map((item => evaluateSync(item)));
          },
          async: function(args, resolve, reject) {
            const items = Array.from(args[0]);
            if (0 === items.length) return void Promise.resolve().then((() => resolve([])));
            let count = 0;
            const results = items.map((() => {}));
            items.forEach(((item, i) => {
              evaluateAsync(item, (val => {
                results[i] = val, count += 1, count === results.length && resolve(results);
              }), reject);
            }));
          }
        }),
        race: buildOperation({
          name: "race",
          arity: 1,
          sync: function(args) {
            const items = Array.from(args[0]);
            if (0 === items.length) throw makeError("Must race at least 1 item", "GENSYNC_RACE_NONEMPTY");
            return evaluateSync(items[0]);
          },
          async: function(args, resolve, reject) {
            const items = Array.from(args[0]);
            if (0 === items.length) throw makeError("Must race at least 1 item", "GENSYNC_RACE_NONEMPTY");
            for (const item of items) evaluateAsync(item, resolve, reject);
          }
        })
      });
    },
    6560: module => {
      "use strict";
      module.exports = (flag, argv) => {
        argv = argv || process.argv;
        const prefix = flag.startsWith("-") ? "" : 1 === flag.length ? "-" : "--", pos = argv.indexOf(prefix + flag), terminatorPos = argv.indexOf("--");
        return -1 !== pos && (-1 === terminatorPos || pos < terminatorPos);
      };
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
    3312: module => {
      "use strict";
      const object = {}, hasOwnProperty = object.hasOwnProperty, forOwn = (object, callback) => {
        for (const key in object) hasOwnProperty.call(object, key) && callback(key, object[key]);
      }, toString = object.toString, isArray = Array.isArray, isBuffer = Buffer.isBuffer, singleEscapes = {
        '"': '\\"',
        "'": "\\'",
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
      }, regexSingleEscape = /["'\\\b\f\n\r\t]/, regexDigit = /[0-9]/, regexWhitelist = /[ !#-&\(-\[\]-_a-~]/, jsesc = (argument, options) => {
        const increaseIndentation = () => {
          oldIndent = indent, ++options.indentLevel, indent = options.indent.repeat(options.indentLevel);
        }, defaults = {
          escapeEverything: !1,
          minimal: !1,
          isScriptContext: !1,
          quotes: "single",
          wrap: !1,
          es6: !1,
          json: !1,
          compact: !0,
          lowercaseHex: !1,
          numbers: "decimal",
          indent: "\t",
          indentLevel: 0,
          __inline1__: !1,
          __inline2__: !1
        }, json = options && options.json;
        var destination, source;
        json && (defaults.quotes = "double", defaults.wrap = !0), destination = defaults, 
        options = (source = options) ? (forOwn(source, ((key, value) => {
          destination[key] = value;
        })), destination) : destination, "single" != options.quotes && "double" != options.quotes && "backtick" != options.quotes && (options.quotes = "single");
        const quote = "double" == options.quotes ? '"' : "backtick" == options.quotes ? "`" : "'", compact = options.compact, lowercaseHex = options.lowercaseHex;
        let indent = options.indent.repeat(options.indentLevel), oldIndent = "";
        const inline1 = options.__inline1__, inline2 = options.__inline2__, newLine = compact ? "" : "\n";
        let result, isEmpty = !0;
        const useBinNumbers = "binary" == options.numbers, useOctNumbers = "octal" == options.numbers, useDecNumbers = "decimal" == options.numbers, useHexNumbers = "hexadecimal" == options.numbers;
        if (json && argument && "function" == typeof argument.toJSON && (argument = argument.toJSON()), 
        !(value => "string" == typeof value || "[object String]" == toString.call(value))(argument)) {
          if ((value => "[object Map]" == toString.call(value))(argument)) return 0 == argument.size ? "new Map()" : (compact || (options.__inline1__ = !0, 
          options.__inline2__ = !1), "new Map(" + jsesc(Array.from(argument), options) + ")");
          if ((value => "[object Set]" == toString.call(value))(argument)) return 0 == argument.size ? "new Set()" : "new Set(" + jsesc(Array.from(argument), options) + ")";
          if (isBuffer(argument)) return 0 == argument.length ? "Buffer.from([])" : "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
          if (isArray(argument)) return result = [], options.wrap = !0, inline1 && (options.__inline1__ = !1, 
          options.__inline2__ = !0), inline2 || increaseIndentation(), ((array, callback) => {
            const length = array.length;
            let index = -1;
            for (;++index < length; ) callback(array[index]);
          })(argument, (value => {
            isEmpty = !1, inline2 && (options.__inline2__ = !1), result.push((compact || inline2 ? "" : indent) + jsesc(value, options));
          })), isEmpty ? "[]" : inline2 ? "[" + result.join(", ") + "]" : "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
          if (!(value => "number" == typeof value || "[object Number]" == toString.call(value))(argument)) return (value => "[object Object]" == toString.call(value))(argument) ? (result = [], 
          options.wrap = !0, increaseIndentation(), forOwn(argument, ((key, value) => {
            isEmpty = !1, result.push((compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options));
          })), isEmpty ? "{}" : "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}") : json ? JSON.stringify(argument) || "null" : String(argument);
          if (json) return JSON.stringify(argument);
          if (useDecNumbers) return String(argument);
          if (useHexNumbers) {
            let hexadecimal = argument.toString(16);
            return lowercaseHex || (hexadecimal = hexadecimal.toUpperCase()), "0x" + hexadecimal;
          }
          if (useBinNumbers) return "0b" + argument.toString(2);
          if (useOctNumbers) return "0o" + argument.toString(8);
        }
        const string = argument;
        let index = -1;
        const length = string.length;
        for (result = ""; ++index < length; ) {
          const character = string.charAt(index);
          if (options.es6) {
            const first = string.charCodeAt(index);
            if (first >= 55296 && first <= 56319 && length > index + 1) {
              const second = string.charCodeAt(index + 1);
              if (second >= 56320 && second <= 57343) {
                let hexadecimal = (1024 * (first - 55296) + second - 56320 + 65536).toString(16);
                lowercaseHex || (hexadecimal = hexadecimal.toUpperCase()), result += "\\u{" + hexadecimal + "}", 
                ++index;
                continue;
              }
            }
          }
          if (!options.escapeEverything) {
            if (regexWhitelist.test(character)) {
              result += character;
              continue;
            }
            if ('"' == character) {
              result += quote == character ? '\\"' : character;
              continue;
            }
            if ("`" == character) {
              result += quote == character ? "\\`" : character;
              continue;
            }
            if ("'" == character) {
              result += quote == character ? "\\'" : character;
              continue;
            }
          }
          if ("\0" == character && !json && !regexDigit.test(string.charAt(index + 1))) {
            result += "\\0";
            continue;
          }
          if (regexSingleEscape.test(character)) {
            result += singleEscapes[character];
            continue;
          }
          const charCode = character.charCodeAt(0);
          if (options.minimal && 8232 != charCode && 8233 != charCode) {
            result += character;
            continue;
          }
          let hexadecimal = charCode.toString(16);
          lowercaseHex || (hexadecimal = hexadecimal.toUpperCase());
          const longhand = hexadecimal.length > 2 || json, escaped = "\\" + (longhand ? "u" : "x") + ("0000" + hexadecimal).slice(longhand ? -4 : -2);
          result += escaped;
        }
        return options.wrap && (result = quote + result + quote), "`" == quote && (result = result.replace(/\$\{/g, "\\${")), 
        options.isScriptContext ? result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json ? "\\u003C!--" : "\\x3C!--") : result;
      };
      jsesc.version = "2.5.2", module.exports = jsesc;
    },
    7824: module => {
      var s = 1e3, m = 60 * s, h = 60 * m, d = 24 * h, w = 7 * d, y = 365.25 * d;
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= 1.5 * n;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if ("string" === type && val.length > 0) return function(str) {
          if ((str = String(str)).length > 100) return;
          var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
          if (!match) return;
          var n = parseFloat(match[1]);
          switch ((match[2] || "ms").toLowerCase()) {
           case "years":
           case "year":
           case "yrs":
           case "yr":
           case "y":
            return n * y;

           case "weeks":
           case "week":
           case "w":
            return n * w;

           case "days":
           case "day":
           case "d":
            return n * d;

           case "hours":
           case "hour":
           case "hrs":
           case "hr":
           case "h":
            return n * h;

           case "minutes":
           case "minute":
           case "mins":
           case "min":
           case "m":
            return n * m;

           case "seconds":
           case "second":
           case "secs":
           case "sec":
           case "s":
            return n * s;

           case "milliseconds":
           case "millisecond":
           case "msecs":
           case "msec":
           case "ms":
            return n;

           default:
            return;
          }
        }(val);
        if ("number" === type && isFinite(val)) return options.long ? function(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) return plural(ms, msAbs, d, "day");
          if (msAbs >= h) return plural(ms, msAbs, h, "hour");
          if (msAbs >= m) return plural(ms, msAbs, m, "minute");
          if (msAbs >= s) return plural(ms, msAbs, s, "second");
          return ms + " ms";
        }(val) : function(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) return Math.round(ms / d) + "d";
          if (msAbs >= h) return Math.round(ms / h) + "h";
          if (msAbs >= m) return Math.round(ms / m) + "m";
          if (msAbs >= s) return Math.round(ms / s) + "s";
          return ms + "ms";
        }(val);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
    },
    9509: (module, exports, __webpack_require__) => {
      var buffer = __webpack_require__(4300), Buffer = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) dst[key] = src[key];
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer(arg, encodingOrOffset, length);
      }
      Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), 
      exports.Buffer = SafeBuffer), copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if ("number" == typeof arg) throw new TypeError("Argument must not be a number");
        return Buffer(arg, encodingOrOffset, length);
      }, SafeBuffer.alloc = function(size, fill, encoding) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        var buf = Buffer(size);
        return void 0 !== fill ? "string" == typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0), 
        buf;
      }, SafeBuffer.allocUnsafe = function(size) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        return Buffer(size);
      }, SafeBuffer.allocUnsafeSlow = function(size) {
        if ("number" != typeof size) throw new TypeError("Argument must be a number");
        return buffer.SlowBuffer(size);
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
    5190: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _debug() {
        const data = __webpack_require__(5158);
        return _debug = function() {
          return data;
        }, data;
      }
      function _fs() {
        const data = __webpack_require__(7147);
        return _fs = function() {
          return data;
        }, data;
      }
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _json() {
        const data = __webpack_require__(5876);
        return _json = function() {
          return data;
        }, data;
      }
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ROOT_CONFIG_FILENAMES = void 0, exports.findConfigUpwards = function(rootDir) {
        let dirname = rootDir;
        for (;;) {
          for (const filename of ROOT_CONFIG_FILENAMES) if (_fs().existsSync(_path().join(dirname, filename))) return dirname;
          const nextDir = _path().dirname(dirname);
          if (dirname === nextDir) break;
          dirname = nextDir;
        }
        return null;
      }, exports.findRelativeConfig = function*(packageData, envName, caller) {
        let config = null, ignore = null;
        const dirname = _path().dirname(packageData.filepath);
        for (const loc of packageData.directories) {
          var _packageData$pkg;
          if (!config) config = yield* loadOneConfig(RELATIVE_CONFIG_FILENAMES, loc, envName, caller, (null == (_packageData$pkg = packageData.pkg) ? void 0 : _packageData$pkg.dirname) === loc ? packageToBabelConfig(packageData.pkg) : null);
          if (!ignore) {
            const ignoreLoc = _path().join(loc, ".babelignore");
            ignore = yield* readIgnoreConfig(ignoreLoc), ignore && debug("Found ignore %o from %o.", ignore.filepath, dirname);
          }
        }
        return {
          config,
          ignore
        };
      }, exports.findRootConfig = function(dirname, envName, caller) {
        return loadOneConfig(ROOT_CONFIG_FILENAMES, dirname, envName, caller);
      }, exports.loadConfig = function*(name, dirname, envName, caller) {
        const filepath = (v = process.versions.node, w = "8.9", v = v.split("."), w = w.split("."), 
        +v[0] > +w[0] || v[0] == w[0] && +v[1] >= +w[1] ? __webpack_require__(5965).resolve : (r, {paths: [b]}, M = __webpack_require__(8188)) => {
          let f = M._findPath(r, M._nodeModulePaths(b).concat(b));
          if (f) return f;
          throw f = new Error(`Cannot resolve module '${r}'`), f.code = "MODULE_NOT_FOUND", 
          f;
        })(name, {
          paths: [ dirname ]
        }), conf = yield* readConfig(filepath, envName, caller);
        var v, w;
        if (!conf) throw new Error(`Config file ${filepath} contains no configuration data`);
        return debug("Loaded config %o from %o.", name, dirname), conf;
      }, exports.resolveShowConfigPath = function*(dirname) {
        const targetPath = process.env.BABEL_SHOW_CONFIG_FOR;
        if (null != targetPath) {
          const absolutePath = _path().resolve(dirname, targetPath);
          if (!(yield* fs.stat(absolutePath)).isFile()) throw new Error(`${absolutePath}: BABEL_SHOW_CONFIG_FOR must refer to a regular file, directories are not supported.`);
          return absolutePath;
        }
        return null;
      };
      var _caching = __webpack_require__(656), _configApi = __webpack_require__(5839), _utils = __webpack_require__(2800), _moduleTypes = __webpack_require__(4150), _patternToRegex = __webpack_require__(8552), fs = __webpack_require__(2344);
      const debug = _debug()("babel:config:loading:files:configuration"), ROOT_CONFIG_FILENAMES = [ "babel.config.js", "babel.config.cjs", "babel.config.mjs", "babel.config.json" ];
      exports.ROOT_CONFIG_FILENAMES = ROOT_CONFIG_FILENAMES;
      const RELATIVE_CONFIG_FILENAMES = [ ".babelrc", ".babelrc.js", ".babelrc.cjs", ".babelrc.mjs", ".babelrc.json" ];
      function* loadOneConfig(names, dirname, envName, caller, previousConfig = null) {
        const config = (yield* _gensync().all(names.map((filename => readConfig(_path().join(dirname, filename), envName, caller))))).reduce(((previousConfig, config) => {
          if (config && previousConfig) throw new Error(`Multiple configuration files found. Please remove one:\n - ${_path().basename(previousConfig.filepath)}\n - ${config.filepath}\nfrom ${dirname}`);
          return config || previousConfig;
        }), previousConfig);
        return config && debug("Found configuration %o from %o.", config.filepath, dirname), 
        config;
      }
      function readConfig(filepath, envName, caller) {
        const ext = _path().extname(filepath);
        return ".js" === ext || ".cjs" === ext || ".mjs" === ext ? readConfigJS(filepath, {
          envName,
          caller
        }) : readConfigJSON5(filepath);
      }
      const LOADING_CONFIGS = new Set, readConfigJS = (0, _caching.makeStrongCache)((function*(filepath, cache) {
        if (!_fs().existsSync(filepath)) return cache.never(), null;
        if (LOADING_CONFIGS.has(filepath)) return cache.never(), debug("Auto-ignoring usage of config %o.", filepath), 
        {
          filepath,
          dirname: _path().dirname(filepath),
          options: {}
        };
        let options;
        try {
          LOADING_CONFIGS.add(filepath), options = yield* (0, _moduleTypes.default)(filepath, "You appear to be using a native ECMAScript module configuration file, which is only supported when running Babel asynchronously.");
        } catch (err) {
          throw err.message = `${filepath}: Error while loading config - ${err.message}`, 
          err;
        } finally {
          LOADING_CONFIGS.delete(filepath);
        }
        let assertCache = !1;
        if ("function" == typeof options && (yield* [], options = options((0, _configApi.makeConfigAPI)(cache)), 
        assertCache = !0), !options || "object" != typeof options || Array.isArray(options)) throw new Error(`${filepath}: Configuration should be an exported JavaScript object.`);
        if ("function" == typeof options.then) throw new Error("You appear to be using an async configuration, which your current version of Babel does not support. We may add support for this in the future, but if you're on the most recent version of @babel/core and still seeing this error, then you'll need to synchronously return your config.");
        return assertCache && !cache.configured() && function() {
          throw new Error('Caching was left unconfigured. Babel\'s plugins, presets, and .babelrc.js files can be configured\nfor various types of caching, using the first param of their handler functions:\n\nmodule.exports = function(api) {\n  // The API exposes the following:\n\n  // Cache the returned value forever and don\'t call this function again.\n  api.cache(true);\n\n  // Don\'t cache at all. Not recommended because it will be very slow.\n  api.cache(false);\n\n  // Cached based on the value of some function. If this function returns a value different from\n  // a previously-encountered value, the plugins will re-evaluate.\n  var env = api.cache(() => process.env.NODE_ENV);\n\n  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for\n  // any possible NODE_ENV value that might come up during plugin execution.\n  var isProd = api.cache(() => process.env.NODE_ENV === "production");\n\n  // .cache(fn) will perform a linear search though instances to find the matching plugin based\n  // based on previous instantiated plugins. If you want to recreate the plugin and discard the\n  // previous instance whenever something changes, you may use:\n  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");\n\n  // Note, we also expose the following more-verbose versions of the above examples:\n  api.cache.forever(); // api.cache(true)\n  api.cache.never();   // api.cache(false)\n  api.cache.using(fn); // api.cache(fn)\n\n  // Return the value that will be cached.\n  return { };\n};');
        }(), {
          filepath,
          dirname: _path().dirname(filepath),
          options
        };
      })), packageToBabelConfig = (0, _caching.makeWeakCacheSync)((file => {
        const babel = file.options.babel;
        if (void 0 === babel) return null;
        if ("object" != typeof babel || Array.isArray(babel) || null === babel) throw new Error(`${file.filepath}: .babel property must be an object`);
        return {
          filepath: file.filepath,
          dirname: file.dirname,
          options: babel
        };
      })), readConfigJSON5 = (0, _utils.makeStaticFileCache)(((filepath, content) => {
        let options;
        try {
          options = _json().parse(content);
        } catch (err) {
          throw err.message = `${filepath}: Error while parsing config - ${err.message}`, 
          err;
        }
        if (!options) throw new Error(`${filepath}: No config detected`);
        if ("object" != typeof options) throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
        if (Array.isArray(options)) throw new Error(`${filepath}: Expected config object but found array`);
        return delete options.$schema, {
          filepath,
          dirname: _path().dirname(filepath),
          options
        };
      })), readIgnoreConfig = (0, _utils.makeStaticFileCache)(((filepath, content) => {
        const ignoreDir = _path().dirname(filepath), ignorePatterns = content.split("\n").map((line => line.replace(/#(.*?)$/, "").trim())).filter((line => !!line));
        for (const pattern of ignorePatterns) if ("!" === pattern[0]) throw new Error("Negation of file paths is not supported.");
        return {
          filepath,
          dirname: _path().dirname(filepath),
          ignore: ignorePatterns.map((pattern => (0, _patternToRegex.default)(pattern, ignoreDir)))
        };
      }));
    },
    8912: (__unused_webpack_module, exports) => {
      "use strict";
      exports.Z = function(filepath) {
        return import(filepath);
      };
    },
    4150: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function*(filepath, asyncError, fallbackToTranspiledModule = !1) {
        switch (function(filename) {
          switch (_path().extname(filename)) {
           case ".cjs":
            return "cjs";

           case ".mjs":
            return "mjs";

           default:
            return "unknown";
          }
        }(filepath)) {
         case "cjs":
          return loadCjsDefault(filepath, fallbackToTranspiledModule);

         case "unknown":
          try {
            return loadCjsDefault(filepath, fallbackToTranspiledModule);
          } catch (e) {
            if ("ERR_REQUIRE_ESM" !== e.code) throw e;
          }

         case "mjs":
          if (yield* (0, _async.isAsync)()) return yield* (0, _async.waitFor)(function(_x) {
            return _loadMjsDefault.apply(this, arguments);
          }(filepath));
          throw new Error(asyncError);
        }
      }, exports.supportsESM = void 0;
      var _async = __webpack_require__(7241);
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _url() {
        const data = __webpack_require__(7310);
        return _url = function() {
          return data;
        }, data;
      }
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg), value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self = this, args = arguments;
          return new Promise((function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          }));
        };
      }
      let import_;
      try {
        import_ = __webpack_require__(8912).Z;
      } catch (_unused) {}
      const supportsESM = !!import_;
      function loadCjsDefault(filepath, fallbackToTranspiledModule) {
        const module = __webpack_require__(5965)(filepath);
        return null != module && module.__esModule ? module.default || (fallbackToTranspiledModule ? module : void 0) : module;
      }
      function _loadMjsDefault() {
        return (_loadMjsDefault = _asyncToGenerator((function*(filepath) {
          if (!import_) throw new Error("Internal error: Native ECMAScript modules aren't supported by this platform.\n");
          return (yield import_((0, _url().pathToFileURL)(filepath))).default;
        }))).apply(this, arguments);
      }
      exports.supportsESM = supportsESM;
    },
    4574: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _debug() {
        const data = __webpack_require__(5158);
        return _debug = function() {
          return data;
        }, data;
      }
      function _path() {
        const data = __webpack_require__(1017);
        return _path = function() {
          return data;
        }, data;
      }
      function _gensync() {
        const data = __webpack_require__(664);
        return _gensync = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.loadPlugin = function*(name, dirname) {
        const filepath = yield* resolvePlugin(name, dirname), value = yield* requireModule("plugin", filepath);
        return debug("Loaded plugin %o from %o.", name, dirname), {
          filepath,
          value
        };
      }, exports.loadPreset = function*(name, dirname) {
        const filepath = yield* resolvePreset(name, dirname), value = yield* requireModule("preset", filepath);
        return debug("Loaded preset %o from %o.", name, dirname), {
          filepath,
          value
        };
      }, exports.resolvePlugin = resolvePlugin, exports.resolvePreset = resolvePreset;
      var _async = __webpack_require__(7241), _moduleTypes = __webpack_require__(4150);
      function _url() {
        const data = __webpack_require__(7310);
        return _url = function() {
          return data;
        }, data;
      }
      var _importMetaResolve = __webpack_require__(6834);
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg), value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self = this, args = arguments;
          return new Promise((function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          }));
        };
      }
      const debug = _debug()("babel:config:loading:files:plugins"), EXACT_RE = /^module:/, BABEL_PLUGIN_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-plugin-)/, BABEL_PRESET_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-preset-)/, BABEL_PLUGIN_ORG_RE = /^(@babel\/)(?!plugin-|[^/]+\/)/, BABEL_PRESET_ORG_RE = /^(@babel\/)(?!preset-|[^/]+\/)/, OTHER_PLUGIN_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-plugin(?:-|\/|$)|[^/]+\/)/, OTHER_PRESET_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-preset(?:-|\/|$)|[^/]+\/)/, OTHER_ORG_DEFAULT_RE = /^(@(?!babel$)[^/]+)$/;
      function* resolvePlugin(name, dirname) {
        return yield* resolveStandardizedName("plugin", name, dirname);
      }
      function* resolvePreset(name, dirname) {
        return yield* resolveStandardizedName("preset", name, dirname);
      }
      function standardizeName(type, name) {
        if (_path().isAbsolute(name)) return name;
        const isPreset = "preset" === type;
        return name.replace(isPreset ? BABEL_PRESET_PREFIX_RE : BABEL_PLUGIN_PREFIX_RE, `babel-${type}-`).replace(isPreset ? BABEL_PRESET_ORG_RE : BABEL_PLUGIN_ORG_RE, `$1${type}-`).replace(isPreset ? OTHER_PRESET_ORG_RE : OTHER_PLUGIN_ORG_RE, `$1babel-${type}-`).replace(OTHER_ORG_DEFAULT_RE, `$1/babel-${type}`).replace(EXACT_RE, "");
      }
      function* resolveAlternativesHelper(type, name) {
        const standardizedName = standardizeName(type, name), {error, value} = yield standardizedName;
        if (!error) return value;
        if ("MODULE_NOT_FOUND" !== error.code) throw error;
        standardizedName === name || (yield name).error || (error.message += `\n- If you want to resolve "${name}", use "module:${name}"`), 
        (yield standardizeName(type, "@babel/" + name)).error || (error.message += `\n- Did you mean "@babel/${name}"?`);
        const oppositeType = "preset" === type ? "plugin" : "preset";
        throw (yield standardizeName(oppositeType, name)).error || (error.message += `\n- Did you accidentally pass a ${oppositeType} as a ${type}?`), 
        error;
      }
      function tryRequireResolve(id, {paths: [dirname]}) {
        try {
          return {
            error: null,
            value: (v = process.versions.node, w = "8.9", v = v.split("."), w = w.split("."), 
            +v[0] > +w[0] || v[0] == w[0] && +v[1] >= +w[1] ? __webpack_require__(5965).resolve : (r, {paths: [b]}, M = __webpack_require__(8188)) => {
              let f = M._findPath(r, M._nodeModulePaths(b).concat(b));
              if (f) return f;
              throw f = new Error(`Cannot resolve module '${r}'`), f.code = "MODULE_NOT_FOUND", 
              f;
            })(id, {
              paths: [ dirname ]
            })
          };
        } catch (error) {
          return {
            error,
            value: null
          };
        }
        var v, w;
      }
      function tryImportMetaResolve(_x, _x2) {
        return _tryImportMetaResolve.apply(this, arguments);
      }
      function _tryImportMetaResolve() {
        return (_tryImportMetaResolve = _asyncToGenerator((function*(id, options) {
          try {
            return {
              error: null,
              value: yield (0, _importMetaResolve.default)(id, options)
            };
          } catch (error) {
            return {
              error,
              value: null
            };
          }
        }))).apply(this, arguments);
      }
      function resolveStandardizedNameForRequire(type, name, dirname) {
        const it = resolveAlternativesHelper(type, name);
        let res = it.next();
        for (;!res.done; ) res = it.next(tryRequireResolve(res.value, {
          paths: [ dirname ]
        }));
        return res.value;
      }
      function _resolveStandardizedNameForImport() {
        return (_resolveStandardizedNameForImport = _asyncToGenerator((function*(type, name, dirname) {
          const parentUrl = (0, _url().pathToFileURL)(_path().join(dirname, "./babel-virtual-resolve-base.js")).href, it = resolveAlternativesHelper(type, name);
          let res = it.next();
          for (;!res.done; ) res = it.next(yield tryImportMetaResolve(res.value, parentUrl));
          return (0, _url().fileURLToPath)(res.value);
        }))).apply(this, arguments);
      }
      const resolveStandardizedName = _gensync()({
        sync: (type, name, dirname = process.cwd()) => resolveStandardizedNameForRequire(type, name, dirname),
        async: (type, name, dirname = process.cwd()) => _asyncToGenerator((function*() {
          if (!_moduleTypes.supportsESM) return resolveStandardizedNameForRequire(type, name, dirname);
          try {
            return yield function(_x3, _x4, _x5) {
              return _resolveStandardizedNameForImport.apply(this, arguments);
            }(type, name, dirname);
          } catch (e) {
            try {
              return resolveStandardizedNameForRequire(type, name, dirname);
            } catch (e2) {
              if ("MODULE_NOT_FOUND" === e.type) throw e;
              if ("MODULE_NOT_FOUND" === e2.type) throw e2;
              throw e;
            }
          }
        }))()
      });
      var LOADING_MODULES = new Set;
      function* requireModule(type, name) {
        if (!(yield* (0, _async.isAsync)()) && LOADING_MODULES.has(name)) throw new Error(`Reentrant ${type} detected trying to load "${name}". This module is not ignored and is trying to load itself while compiling itself, leading to a dependency cycle. We recommend adding it to your "ignore" list in your babelrc, or to a .babelignore.`);
        try {
          return LOADING_MODULES.add(name), yield* (0, _moduleTypes.default)(name, `You appear to be using a native ECMAScript module ${type}, which is only supported when running Babel asynchronously.`, !0);
        } catch (err) {
          throw err.message = `[BABEL]: ${err.message} (While processing: ${name})`, err;
        } finally {
          LOADING_MODULES.delete(name);
        }
      }
    },
    2130: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const os = __webpack_require__(2037), hasFlag = __webpack_require__(6560), env = process.env;
      let forceColor;
      function getSupportLevel(stream) {
        const level = function(stream) {
          if (!1 === forceColor) return 0;
          if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
          if (hasFlag("color=256")) return 2;
          if (stream && !stream.isTTY && !0 !== forceColor) return 0;
          const min = forceColor ? 1 : 0;
          if ("win32" === process.platform) {
            const osRelease = os.release().split(".");
            return Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
          }
          if ("CI" in env) return [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI" ].some((sign => sign in env)) || "codeship" === env.CI_NAME ? 1 : min;
          if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
          if ("truecolor" === env.COLORTERM) return 3;
          if ("TERM_PROGRAM" in env) {
            const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (env.TERM_PROGRAM) {
             case "iTerm.app":
              return version >= 3 ? 3 : 2;

             case "Apple_Terminal":
              return 2;
            }
          }
          return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : (env.TERM, 
          min);
        }(stream);
        return function(level) {
          return 0 !== level && {
            level,
            hasBasic: !0,
            has256: level >= 2,
            has16m: level >= 3
          };
        }(level);
      }
      hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") ? forceColor = !1 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (forceColor = !0), 
      "FORCE_COLOR" in env && (forceColor = 0 === env.FORCE_COLOR.length || 0 !== parseInt(env.FORCE_COLOR, 10)), 
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel(process.stdout),
        stderr: getSupportLevel(process.stderr)
      };
    },
    9516: module => {
      "use strict";
      module.exports = require("./parser");
    },
    241: module => {
      "use strict";
      module.exports = require("./traverse");
    },
    7289: module => {
      "use strict";
      module.exports = require("./types");
    },
    5965: module => {
      "use strict";
      module.exports = require;
    },
    1991: module => {
      "use strict";
      module.exports = require("browserslist");
    },
    3920: module => {
      "use strict";
      module.exports = require("chalk");
    },
    9491: module => {
      "use strict";
      module.exports = require("assert");
    },
    4300: module => {
      "use strict";
      module.exports = require("buffer");
    },
    7147: module => {
      "use strict";
      module.exports = require("fs");
    },
    8188: module => {
      "use strict";
      module.exports = require("module");
    },
    2037: module => {
      "use strict";
      module.exports = require("os");
    },
    1017: module => {
      "use strict";
      module.exports = require("path");
    },
    6224: module => {
      "use strict";
      module.exports = require("tty");
    },
    7310: module => {
      "use strict";
      module.exports = require("url");
    },
    3837: module => {
      "use strict";
      module.exports = require("util");
    },
    4655: module => {
      "use strict";
      module.exports = require("v8");
    },
    1797: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
        default: () => remapping
      });
      const comma = ",".charCodeAt(0), semicolon = ";".charCodeAt(0), chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", intToChar = new Uint8Array(64), charToInt = new Uint8Array(128);
      for (let i = 0; i < chars.length; i++) {
        const c = chars.charCodeAt(i);
        intToChar[i] = c, charToInt[c] = i;
      }
      const td = "undefined" != typeof TextDecoder ? new TextDecoder : "undefined" != typeof Buffer ? {
        decode: buf => Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString()
      } : {
        decode(buf) {
          let out = "";
          for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
          return out;
        }
      };
      function indexOf(mappings, index) {
        const idx = mappings.indexOf(";", index);
        return -1 === idx ? mappings.length : idx;
      }
      function decodeInteger(mappings, pos, state, j) {
        let value = 0, shift = 0, integer = 0;
        do {
          const c = mappings.charCodeAt(pos++);
          integer = charToInt[c], value |= (31 & integer) << shift, shift += 5;
        } while (32 & integer);
        const shouldNegate = 1 & value;
        return value >>>= 1, shouldNegate && (value = -2147483648 | -value), state[j] += value, 
        pos;
      }
      function hasMoreVlq(mappings, i, length) {
        return !(i >= length) && mappings.charCodeAt(i) !== comma;
      }
      function sort(line) {
        line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[0] - b[0];
      }
      function encode(decoded) {
        const state = new Int32Array(5), buf = new Uint8Array(16384), sub = buf.subarray(0, 16348);
        let pos = 0, out = "";
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          if (i > 0 && (16384 === pos && (out += td.decode(buf), pos = 0), buf[pos++] = semicolon), 
          0 !== line.length) {
            state[0] = 0;
            for (let j = 0; j < line.length; j++) {
              const segment = line[j];
              pos > 16348 && (out += td.decode(sub), buf.copyWithin(0, 16348, pos), pos -= 16348), 
              j > 0 && (buf[pos++] = comma), pos = encodeInteger(buf, pos, state, segment, 0), 
              1 !== segment.length && (pos = encodeInteger(buf, pos, state, segment, 1), pos = encodeInteger(buf, pos, state, segment, 2), 
              pos = encodeInteger(buf, pos, state, segment, 3), 4 !== segment.length && (pos = encodeInteger(buf, pos, state, segment, 4)));
            }
          }
        }
        return out + td.decode(buf.subarray(0, pos));
      }
      function encodeInteger(buf, pos, state, segment, j) {
        const next = segment[j];
        let num = next - state[j];
        state[j] = next, num = num < 0 ? -num << 1 | 1 : num << 1;
        do {
          let clamped = 31 & num;
          num >>>= 5, num > 0 && (clamped |= 32), buf[pos++] = intToChar[clamped];
        } while (num > 0);
        return pos;
      }
      const schemeRegex = /^[\w+.-]+:\/\//, urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?/, fileRegex = /^file:(?:\/\/((?![a-z]:)[^/]*)?)?(\/?.*)/i;
      function isAbsolutePath(input) {
        return input.startsWith("/");
      }
      function parseAbsoluteUrl(input) {
        const match = urlRegex.exec(input);
        return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/");
      }
      function makeUrl(scheme, user, host, port, path) {
        return {
          scheme,
          user,
          host,
          port,
          path,
          relativePath: !1
        };
      }
      function parseUrl(input) {
        if (function(input) {
          return input.startsWith("//");
        }(input)) {
          const url = parseAbsoluteUrl("http:" + input);
          return url.scheme = "", url;
        }
        if (isAbsolutePath(input)) {
          const url = parseAbsoluteUrl("http://foo.com" + input);
          return url.scheme = "", url.host = "", url;
        }
        if (function(input) {
          return input.startsWith("file:");
        }(input)) return function(input) {
          const match = fileRegex.exec(input), path = match[2];
          return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path) ? path : "/" + path);
        }(input);
        if (function(input) {
          return schemeRegex.test(input);
        }(input)) return parseAbsoluteUrl(input);
        const url = parseAbsoluteUrl("http://foo.com/" + input);
        return url.scheme = "", url.host = "", url.relativePath = !0, url;
      }
      function normalizePath(url) {
        const {relativePath} = url, pieces = url.path.split("/");
        let pointer = 1, positive = 0, addTrailingSlash = !1;
        for (let i = 1; i < pieces.length; i++) {
          const piece = pieces[i];
          piece ? (addTrailingSlash = !1, "." !== piece && (".." !== piece ? (pieces[pointer++] = piece, 
          positive++) : positive ? (addTrailingSlash = !0, positive--, pointer--) : relativePath && (pieces[pointer++] = piece))) : addTrailingSlash = !0;
        }
        let path = "";
        for (let i = 1; i < pointer; i++) path += "/" + pieces[i];
        (!path || addTrailingSlash && !path.endsWith("/..")) && (path += "/"), url.path = path;
      }
      function resolve(input, base) {
        if (!input && !base) return "";
        const url = parseUrl(input);
        if (base && !url.scheme) {
          const baseUrl = parseUrl(base);
          url.scheme = baseUrl.scheme, url.host || (url.user = baseUrl.user, url.host = baseUrl.host, 
          url.port = baseUrl.port), function(url, base) {
            url.relativePath && (normalizePath(base), "/" === url.path ? url.path = base.path : url.path = function(path) {
              if (path.endsWith("/..")) return path;
              const index = path.lastIndexOf("/");
              return path.slice(0, index + 1);
            }(base.path) + url.path, url.relativePath = base.relativePath);
          }(url, baseUrl);
        }
        if (normalizePath(url), url.relativePath) {
          const path = url.path.slice(1);
          if (!path) return ".";
          return !(base || input).startsWith(".") || path.startsWith(".") ? path : "./" + path;
        }
        return url.scheme || url.host ? `${url.scheme}//${url.user}${url.host}${url.port}${url.path}` : url.path;
      }
      function trace_mapping_resolve(input, base) {
        return base && !base.endsWith("/") && (base += "/"), resolve(input, base);
      }
      function nextUnsortedSegmentLine(mappings, start) {
        for (let i = start; i < mappings.length; i++) if (!isSorted(mappings[i])) return i;
        return mappings.length;
      }
      function isSorted(line) {
        for (let j = 1; j < line.length; j++) if (line[j][0] < line[j - 1][0]) return !1;
        return !0;
      }
      function sortSegments(line, owned) {
        return owned || (line = line.slice()), line.sort(trace_mapping_sortComparator);
      }
      function trace_mapping_sortComparator(a, b) {
        return a[0] - b[0];
      }
      let found = !1;
      function upperBound(haystack, needle, index) {
        for (let i = index + 1; i < haystack.length && haystack[i][0] === needle; index = i++) ;
        return index;
      }
      function lowerBound(haystack, needle, index) {
        for (let i = index - 1; i >= 0 && haystack[i][0] === needle; index = i--) ;
        return index;
      }
      function memoizedState() {
        return {
          lastKey: -1,
          lastNeedle: -1,
          lastIndex: -1
        };
      }
      function memoizedBinarySearch(haystack, needle, state, key) {
        const {lastKey, lastNeedle, lastIndex} = state;
        let low = 0, high = haystack.length - 1;
        if (key === lastKey) {
          if (needle === lastNeedle) return found = -1 !== lastIndex && haystack[lastIndex][0] === needle, 
          lastIndex;
          needle >= lastNeedle ? low = -1 === lastIndex ? 0 : lastIndex : high = lastIndex;
        }
        return state.lastKey = key, state.lastNeedle = needle, state.lastIndex = function(haystack, needle, low, high) {
          for (;low <= high; ) {
            const mid = low + (high - low >> 1), cmp = haystack[mid][0] - needle;
            if (0 === cmp) return found = !0, mid;
            cmp < 0 ? low = mid + 1 : high = mid - 1;
          }
          return found = !1, low - 1;
        }(haystack, needle, low, high);
      }
      function insert(array, index, value) {
        for (let i = array.length; i > index; i--) array[i] = array[i - 1];
        array[index] = value;
      }
      function buildNullArray() {
        return {
          __proto__: null
        };
      }
      const LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)", COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
      let encodedMappings, decodedMappings, traceSegment, originalPositionFor, generatedPositionFor, eachMapping, sourceContentFor, presortedDecodedMap, decodedMap, encodedMap, get, put, pop, addSegment, addMapping, setSourceContent, gen_mapping_decodedMap, gen_mapping_encodedMap, allMappings;
      class TraceMap {
        constructor(map, mapUrl) {
          this._decodedMemo = {
            lastKey: -1,
            lastNeedle: -1,
            lastIndex: -1
          }, this._bySources = void 0, this._bySourceMemos = void 0;
          const isString = "string" == typeof map;
          if (!isString && map._decodedMemo) return map;
          const parsed = isString ? JSON.parse(map) : map, {version, file, names, sourceRoot, sources, sourcesContent} = parsed;
          this.version = version, this.file = file, this.names = names, this.sourceRoot = sourceRoot, 
          this.sources = sources, this.sourcesContent = sourcesContent;
          const from = trace_mapping_resolve(sourceRoot || "", function(path) {
            if (!path) return "";
            const index = path.lastIndexOf("/");
            return path.slice(0, index + 1);
          }(mapUrl));
          this.resolvedSources = sources.map((s => trace_mapping_resolve(s || "", from)));
          const {mappings} = parsed;
          "string" == typeof mappings ? (this._encoded = mappings, this._decoded = void 0) : (this._encoded = void 0, 
          this._decoded = function(mappings, owned) {
            const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
            if (unsortedIndex === mappings.length) return mappings;
            owned || (mappings = mappings.slice());
            for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) mappings[i] = sortSegments(mappings[i], owned);
            return mappings;
          }(mappings, isString));
        }
      }
      function OMapping(source, line, column, name) {
        return {
          source,
          line,
          column,
          name
        };
      }
      function GMapping(line, column) {
        return {
          line,
          column
        };
      }
      function traceSegmentInternal(segments, memo, line, column, bias) {
        let index = memoizedBinarySearch(segments, column, memo, line);
        return found ? index = (-1 === bias ? upperBound : lowerBound)(segments, column, index) : -1 === bias && index++, 
        -1 === index || index === segments.length ? null : segments[index];
      }
      encodedMappings = map => {
        var _a;
        return null !== (_a = map._encoded) && void 0 !== _a ? _a : map._encoded = encode(map._decoded);
      }, decodedMappings = map => map._decoded || (map._decoded = function(mappings) {
        const state = new Int32Array(5), decoded = [];
        let index = 0;
        do {
          const semi = indexOf(mappings, index), line = [];
          let sorted = !0, lastCol = 0;
          state[0] = 0;
          for (let i = index; i < semi; i++) {
            let seg;
            i = decodeInteger(mappings, i, state, 0);
            const col = state[0];
            col < lastCol && (sorted = !1), lastCol = col, hasMoreVlq(mappings, i, semi) ? (i = decodeInteger(mappings, i, state, 1), 
            i = decodeInteger(mappings, i, state, 2), i = decodeInteger(mappings, i, state, 3), 
            hasMoreVlq(mappings, i, semi) ? (i = decodeInteger(mappings, i, state, 4), seg = [ col, state[1], state[2], state[3], state[4] ]) : seg = [ col, state[1], state[2], state[3] ]) : seg = [ col ], 
            line.push(seg);
          }
          sorted || sort(line), decoded.push(line), index = semi + 1;
        } while (index <= mappings.length);
        return decoded;
      }(map._encoded)), traceSegment = (map, line, column) => {
        const decoded = decodedMappings(map);
        return line >= decoded.length ? null : traceSegmentInternal(decoded[line], map._decodedMemo, line, column, 1);
      }, originalPositionFor = (map, {line, column, bias}) => {
        if (--line < 0) throw new Error(LINE_GTR_ZERO);
        if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
        const decoded = decodedMappings(map);
        if (line >= decoded.length) return OMapping(null, null, null, null);
        const segment = traceSegmentInternal(decoded[line], map._decodedMemo, line, column, bias || 1);
        if (null == segment) return OMapping(null, null, null, null);
        if (1 == segment.length) return OMapping(null, null, null, null);
        const {names, resolvedSources} = map;
        return OMapping(resolvedSources[segment[1]], segment[2] + 1, segment[3], 5 === segment.length ? names[segment[4]] : null);
      }, generatedPositionFor = (map, {source, line, column, bias}) => {
        if (--line < 0) throw new Error(LINE_GTR_ZERO);
        if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
        const {sources, resolvedSources} = map;
        let sourceIndex = sources.indexOf(source);
        if (-1 === sourceIndex && (sourceIndex = resolvedSources.indexOf(source)), -1 === sourceIndex) return GMapping(null, null);
        const generated = map._bySources || (map._bySources = function(decoded, memos) {
          const sources = memos.map(buildNullArray);
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j];
              if (1 === seg.length) continue;
              const sourceIndex = seg[1], sourceLine = seg[2], sourceColumn = seg[3], originalSource = sources[sourceIndex], originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []), memo = memos[sourceIndex], index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
              insert(originalLine, memo.lastIndex = index + 1, [ sourceColumn, i, seg[0] ]);
            }
          }
          return sources;
        }(decodedMappings(map), map._bySourceMemos = sources.map(memoizedState))), memos = map._bySourceMemos, segments = generated[sourceIndex][line];
        if (null == segments) return GMapping(null, null);
        const segment = traceSegmentInternal(segments, memos[sourceIndex], line, column, bias || 1);
        return null == segment ? GMapping(null, null) : GMapping(segment[1] + 1, segment[2]);
      }, eachMapping = (map, cb) => {
        const decoded = decodedMappings(map), {names, resolvedSources} = map;
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j], generatedLine = i + 1, generatedColumn = seg[0];
            let source = null, originalLine = null, originalColumn = null, name = null;
            1 !== seg.length && (source = resolvedSources[seg[1]], originalLine = seg[2] + 1, 
            originalColumn = seg[3]), 5 === seg.length && (name = names[seg[4]]), cb({
              generatedLine,
              generatedColumn,
              source,
              originalLine,
              originalColumn,
              name
            });
          }
        }
      }, sourceContentFor = (map, source) => {
        const {sources, resolvedSources, sourcesContent} = map;
        if (null == sourcesContent) return null;
        let index = sources.indexOf(source);
        return -1 === index && (index = resolvedSources.indexOf(source)), -1 === index ? null : sourcesContent[index];
      }, presortedDecodedMap = (map, mapUrl) => {
        const clone = Object.assign({}, map);
        clone.mappings = [];
        const tracer = new TraceMap(clone, mapUrl);
        return tracer._decoded = map.mappings, tracer;
      }, decodedMap = map => ({
        version: 3,
        file: map.file,
        names: map.names,
        sourceRoot: map.sourceRoot,
        sources: map.sources,
        sourcesContent: map.sourcesContent,
        mappings: decodedMappings(map)
      }), encodedMap = map => ({
        version: 3,
        file: map.file,
        names: map.names,
        sourceRoot: map.sourceRoot,
        sources: map.sources,
        sourcesContent: map.sourcesContent,
        mappings: encodedMappings(map)
      });
      class SetArray {
        constructor() {
          this._indexes = {
            __proto__: null
          }, this.array = [];
        }
      }
      get = (strarr, key) => strarr._indexes[key], put = (strarr, key) => {
        const index = get(strarr, key);
        if (void 0 !== index) return index;
        const {array, _indexes: indexes} = strarr;
        return indexes[key] = array.push(key) - 1;
      }, pop = strarr => {
        const {array, _indexes: indexes} = strarr;
        0 !== array.length && (indexes[array.pop()] = void 0);
      };
      class GenMapping {
        constructor({file, sourceRoot} = {}) {
          this._names = new SetArray, this._sources = new SetArray, this._sourcesContent = [], 
          this._mappings = [], this.file = file, this.sourceRoot = sourceRoot;
        }
      }
      function getColumnIndex(line, column, seg) {
        let index = line.length;
        for (let i = index - 1; i >= 0; i--, index--) {
          const current = line[i], col = current[0];
          if (col > column) continue;
          if (col < column) break;
          const cmp = compare(current, seg);
          if (0 === cmp) return index;
          if (cmp < 0) break;
        }
        return index;
      }
      function compare(a, b) {
        let cmp = compareNum(a.length, b.length);
        return 0 !== cmp ? cmp : 1 === a.length ? 0 : (cmp = compareNum(a[1], b[1]), 0 !== cmp ? cmp : (cmp = compareNum(a[2], b[2]), 
        0 !== cmp ? cmp : (cmp = compareNum(a[3], b[3]), 0 !== cmp ? cmp : 4 === a.length ? 0 : compareNum(a[4], b[4]))));
      }
      function compareNum(a, b) {
        return a - b;
      }
      function gen_mapping_insert(array, index, value) {
        if (-1 !== index) {
          for (let i = array.length; i > index; i--) array[i] = array[i - 1];
          array[index] = value;
        }
      }
      addSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name) => {
        const {_mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names} = map, line = function(mappings, index) {
          for (let i = mappings.length; i <= index; i++) mappings[i] = [];
          return mappings[index];
        }(mappings, genLine);
        if (null == source) {
          const seg = [ genColumn ];
          return gen_mapping_insert(line, getColumnIndex(line, genColumn, seg), seg);
        }
        const sourcesIndex = put(sources, source), seg = name ? [ genColumn, sourcesIndex, sourceLine, sourceColumn, put(names, name) ] : [ genColumn, sourcesIndex, sourceLine, sourceColumn ], index = getColumnIndex(line, genColumn, seg);
        sourcesIndex === sourcesContent.length && (sourcesContent[sourcesIndex] = null), 
        gen_mapping_insert(line, index, seg);
      }, addMapping = (map, mapping) => {
        const {generated, source, original, name} = mapping;
        return addSegment(map, generated.line - 1, generated.column, source, null == original ? void 0 : original.line - 1, null == original ? void 0 : original.column, name);
      }, setSourceContent = (map, source, content) => {
        const {_sources: sources, _sourcesContent: sourcesContent} = map;
        sourcesContent[put(sources, source)] = content;
      }, gen_mapping_decodedMap = map => {
        const {file, sourceRoot, _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names} = map;
        return {
          version: 3,
          file,
          names: names.array,
          sourceRoot: sourceRoot || void 0,
          sources: sources.array,
          sourcesContent,
          mappings
        };
      }, gen_mapping_encodedMap = map => {
        const decoded = gen_mapping_decodedMap(map);
        return Object.assign(Object.assign({}, decoded), {
          mappings: encode(decoded.mappings)
        });
      }, allMappings = map => {
        const out = [], {_mappings: mappings, _sources: sources, _names: names} = map;
        for (let i = 0; i < mappings.length; i++) {
          const line = mappings[i];
          for (let j = 0; j < line.length; j++) {
            const seg = line[j], generated = {
              line: i + 1,
              column: seg[0]
            };
            let source, original, name;
            1 !== seg.length && (source = sources.array[seg[1]], original = {
              line: seg[2] + 1,
              column: seg[3]
            }, 5 === seg.length && (name = names.array[seg[4]])), out.push({
              generated,
              source,
              original,
              name
            });
          }
        }
        return out;
      };
      const SOURCELESS_MAPPING = {
        source: null,
        column: null,
        line: null,
        name: null,
        content: null
      }, EMPTY_SOURCES = [];
      function Source(map, sources, source, content) {
        return {
          map,
          sources,
          source,
          content
        };
      }
      function MapSource(map, sources) {
        return Source(map, sources, "", null);
      }
      function remapping_originalPositionFor(source, line, column, name) {
        if (!source.map) return {
          column,
          line,
          name,
          source: source.source,
          content: source.content
        };
        const segment = traceSegment(source.map, line, column);
        return null == segment ? null : 1 === segment.length ? SOURCELESS_MAPPING : remapping_originalPositionFor(source.sources[segment[1]], segment[2], segment[3], 5 === segment.length ? source.map.names[segment[4]] : name);
      }
      function buildSourceMapTree(input, loader) {
        const maps = (value = input, Array.isArray(value) ? value : [ value ]).map((m => new TraceMap(m, "")));
        var value;
        const map = maps.pop();
        for (let i = 0; i < maps.length; i++) if (maps[i].sources.length > 1) throw new Error(`Transformation map ${i} must have exactly one source file.\nDid you specify these with the most recent transformation maps first?`);
        let tree = build(map, loader, "", 0);
        for (let i = maps.length - 1; i >= 0; i--) tree = MapSource(maps[i], [ tree ]);
        return tree;
      }
      function build(map, loader, importer, importerDepth) {
        const {resolvedSources, sourcesContent} = map, depth = importerDepth + 1, children = resolvedSources.map(((sourceFile, i) => {
          const ctx = {
            importer,
            depth,
            source: sourceFile || "",
            content: void 0
          }, sourceMap = loader(ctx.source, ctx), {source, content} = ctx;
          if (sourceMap) return build(new TraceMap(sourceMap, source), loader, source, depth);
          return function(source, content) {
            return Source(null, EMPTY_SOURCES, source, content);
          }(source, void 0 !== content ? content : sourcesContent ? sourcesContent[i] : null);
        }));
        return MapSource(map, children);
      }
      class SourceMap {
        constructor(map, options) {
          const out = options.decodedMappings ? gen_mapping_decodedMap(map) : gen_mapping_encodedMap(map);
          this.version = out.version, this.file = out.file, this.mappings = out.mappings, 
          this.names = out.names, this.sourceRoot = out.sourceRoot, this.sources = out.sources, 
          options.excludeContent || (this.sourcesContent = out.sourcesContent);
        }
        toString() {
          return JSON.stringify(this);
        }
      }
      function remapping(input, loader, options) {
        const opts = "object" == typeof options ? options : {
          excludeContent: !!options,
          decodedMappings: !1
        }, tree = buildSourceMapTree(input, loader);
        return new SourceMap(function(tree) {
          const gen = new GenMapping({
            file: tree.map.file
          }), {sources: rootSources, map} = tree, rootNames = map.names, rootMappings = decodedMappings(map);
          for (let i = 0; i < rootMappings.length; i++) {
            const segments = rootMappings[i];
            let lastSource = null, lastSourceLine = null, lastSourceColumn = null;
            for (let j = 0; j < segments.length; j++) {
              const segment = segments[j], genCol = segment[0];
              let traced = SOURCELESS_MAPPING;
              if (1 !== segment.length && (traced = remapping_originalPositionFor(rootSources[segment[1]], segment[2], segment[3], 5 === segment.length ? rootNames[segment[4]] : ""), 
              null == traced)) continue;
              const {column, line, name, content, source} = traced;
              line === lastSourceLine && column === lastSourceColumn && source === lastSource || (lastSourceLine = line, 
              lastSourceColumn = column, lastSource = source, addSegment(gen, i, genCol, source, line, column, name), 
              null != content && setSourceContent(gen, source, content));
            }
          }
          return gen;
        }(tree), opts);
      }
    },
    5876: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__
      });
      var unicode = {
        Space_Separator: /[\u1680\u2000-\u200A\u202F\u205F\u3000]/,
        ID_Start: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,
        ID_Continue: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
      }, util = {
        isSpaceSeparator: c => "string" == typeof c && unicode.Space_Separator.test(c),
        isIdStartChar: c => "string" == typeof c && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || "$" === c || "_" === c || unicode.ID_Start.test(c)),
        isIdContinueChar: c => "string" == typeof c && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || "$" === c || "_" === c || "‌" === c || "‍" === c || unicode.ID_Continue.test(c)),
        isDigit: c => "string" == typeof c && /[0-9]/.test(c),
        isHexDigit: c => "string" == typeof c && /[0-9A-Fa-f]/.test(c)
      };
      let source, parseState, stack, pos, line, column, token, key, root;
      function internalize(holder, name, reviver) {
        const value = holder[name];
        if (null != value && "object" == typeof value) for (const key in value) {
          const replacement = internalize(value, key, reviver);
          void 0 === replacement ? delete value[key] : value[key] = replacement;
        }
        return reviver.call(holder, name, value);
      }
      let lexState, buffer, doubleQuote, sign, c;
      function lex() {
        for (lexState = "default", buffer = "", doubleQuote = !1, sign = 1; ;) {
          c = peek();
          const token = lexStates[lexState]();
          if (token) return token;
        }
      }
      function peek() {
        if (source[pos]) return String.fromCodePoint(source.codePointAt(pos));
      }
      function read() {
        const c = peek();
        return "\n" === c ? (line++, column = 0) : c ? column += c.length : column++, c && (pos += c.length), 
        c;
      }
      const lexStates = {
        default() {
          switch (c) {
           case "\t":
           case "\v":
           case "\f":
           case " ":
           case " ":
           case "\ufeff":
           case "\n":
           case "\r":
           case "\u2028":
           case "\u2029":
            return void read();

           case "/":
            return read(), void (lexState = "comment");

           case void 0:
            return read(), newToken("eof");
          }
          if (!util.isSpaceSeparator(c)) return lexStates[parseState]();
          read();
        },
        comment() {
          switch (c) {
           case "*":
            return read(), void (lexState = "multiLineComment");

           case "/":
            return read(), void (lexState = "singleLineComment");
          }
          throw invalidChar(read());
        },
        multiLineComment() {
          switch (c) {
           case "*":
            return read(), void (lexState = "multiLineCommentAsterisk");

           case void 0:
            throw invalidChar(read());
          }
          read();
        },
        multiLineCommentAsterisk() {
          switch (c) {
           case "*":
            return void read();

           case "/":
            return read(), void (lexState = "default");

           case void 0:
            throw invalidChar(read());
          }
          read(), lexState = "multiLineComment";
        },
        singleLineComment() {
          switch (c) {
           case "\n":
           case "\r":
           case "\u2028":
           case "\u2029":
            return read(), void (lexState = "default");

           case void 0:
            return read(), newToken("eof");
          }
          read();
        },
        value() {
          switch (c) {
           case "{":
           case "[":
            return newToken("punctuator", read());

           case "n":
            return read(), literal("ull"), newToken("null", null);

           case "t":
            return read(), literal("rue"), newToken("boolean", !0);

           case "f":
            return read(), literal("alse"), newToken("boolean", !1);

           case "-":
           case "+":
            return "-" === read() && (sign = -1), void (lexState = "sign");

           case ".":
            return buffer = read(), void (lexState = "decimalPointLeading");

           case "0":
            return buffer = read(), void (lexState = "zero");

           case "1":
           case "2":
           case "3":
           case "4":
           case "5":
           case "6":
           case "7":
           case "8":
           case "9":
            return buffer = read(), void (lexState = "decimalInteger");

           case "I":
            return read(), literal("nfinity"), newToken("numeric", 1 / 0);

           case "N":
            return read(), literal("aN"), newToken("numeric", NaN);

           case '"':
           case "'":
            return doubleQuote = '"' === read(), buffer = "", void (lexState = "string");
          }
          throw invalidChar(read());
        },
        identifierNameStartEscape() {
          if ("u" !== c) throw invalidChar(read());
          read();
          const u = unicodeEscape();
          switch (u) {
           case "$":
           case "_":
            break;

           default:
            if (!util.isIdStartChar(u)) throw invalidIdentifier();
          }
          buffer += u, lexState = "identifierName";
        },
        identifierName() {
          switch (c) {
           case "$":
           case "_":
           case "‌":
           case "‍":
            return void (buffer += read());

           case "\\":
            return read(), void (lexState = "identifierNameEscape");
          }
          if (!util.isIdContinueChar(c)) return newToken("identifier", buffer);
          buffer += read();
        },
        identifierNameEscape() {
          if ("u" !== c) throw invalidChar(read());
          read();
          const u = unicodeEscape();
          switch (u) {
           case "$":
           case "_":
           case "‌":
           case "‍":
            break;

           default:
            if (!util.isIdContinueChar(u)) throw invalidIdentifier();
          }
          buffer += u, lexState = "identifierName";
        },
        sign() {
          switch (c) {
           case ".":
            return buffer = read(), void (lexState = "decimalPointLeading");

           case "0":
            return buffer = read(), void (lexState = "zero");

           case "1":
           case "2":
           case "3":
           case "4":
           case "5":
           case "6":
           case "7":
           case "8":
           case "9":
            return buffer = read(), void (lexState = "decimalInteger");

           case "I":
            return read(), literal("nfinity"), newToken("numeric", sign * (1 / 0));

           case "N":
            return read(), literal("aN"), newToken("numeric", NaN);
          }
          throw invalidChar(read());
        },
        zero() {
          switch (c) {
           case ".":
            return buffer += read(), void (lexState = "decimalPoint");

           case "e":
           case "E":
            return buffer += read(), void (lexState = "decimalExponent");

           case "x":
           case "X":
            return buffer += read(), void (lexState = "hexadecimal");
          }
          return newToken("numeric", 0 * sign);
        },
        decimalInteger() {
          switch (c) {
           case ".":
            return buffer += read(), void (lexState = "decimalPoint");

           case "e":
           case "E":
            return buffer += read(), void (lexState = "decimalExponent");
          }
          if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
          buffer += read();
        },
        decimalPointLeading() {
          if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalFraction");
          throw invalidChar(read());
        },
        decimalPoint() {
          switch (c) {
           case "e":
           case "E":
            return buffer += read(), void (lexState = "decimalExponent");
          }
          return util.isDigit(c) ? (buffer += read(), void (lexState = "decimalFraction")) : newToken("numeric", sign * Number(buffer));
        },
        decimalFraction() {
          switch (c) {
           case "e":
           case "E":
            return buffer += read(), void (lexState = "decimalExponent");
          }
          if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
          buffer += read();
        },
        decimalExponent() {
          switch (c) {
           case "+":
           case "-":
            return buffer += read(), void (lexState = "decimalExponentSign");
          }
          if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
          throw invalidChar(read());
        },
        decimalExponentSign() {
          if (util.isDigit(c)) return buffer += read(), void (lexState = "decimalExponentInteger");
          throw invalidChar(read());
        },
        decimalExponentInteger() {
          if (!util.isDigit(c)) return newToken("numeric", sign * Number(buffer));
          buffer += read();
        },
        hexadecimal() {
          if (util.isHexDigit(c)) return buffer += read(), void (lexState = "hexadecimalInteger");
          throw invalidChar(read());
        },
        hexadecimalInteger() {
          if (!util.isHexDigit(c)) return newToken("numeric", sign * Number(buffer));
          buffer += read();
        },
        string() {
          switch (c) {
           case "\\":
            return read(), void (buffer += function() {
              switch (peek()) {
               case "b":
                return read(), "\b";

               case "f":
                return read(), "\f";

               case "n":
                return read(), "\n";

               case "r":
                return read(), "\r";

               case "t":
                return read(), "\t";

               case "v":
                return read(), "\v";

               case "0":
                if (read(), util.isDigit(peek())) throw invalidChar(read());
                return "\0";

               case "x":
                return read(), function() {
                  let buffer = "", c = peek();
                  if (!util.isHexDigit(c)) throw invalidChar(read());
                  if (buffer += read(), c = peek(), !util.isHexDigit(c)) throw invalidChar(read());
                  return buffer += read(), String.fromCodePoint(parseInt(buffer, 16));
                }();

               case "u":
                return read(), unicodeEscape();

               case "\n":
               case "\u2028":
               case "\u2029":
                return read(), "";

               case "\r":
                return read(), "\n" === peek() && read(), "";

               case "1":
               case "2":
               case "3":
               case "4":
               case "5":
               case "6":
               case "7":
               case "8":
               case "9":
               case void 0:
                throw invalidChar(read());
              }
              return read();
            }());

           case '"':
            return doubleQuote ? (read(), newToken("string", buffer)) : void (buffer += read());

           case "'":
            return doubleQuote ? void (buffer += read()) : (read(), newToken("string", buffer));

           case "\n":
           case "\r":
            throw invalidChar(read());

           case "\u2028":
           case "\u2029":
            !function(c) {
              console.warn(`JSON5: '${formatChar(c)}' in strings is not valid ECMAScript; consider escaping`);
            }(c);
            break;

           case void 0:
            throw invalidChar(read());
          }
          buffer += read();
        },
        start() {
          switch (c) {
           case "{":
           case "[":
            return newToken("punctuator", read());
          }
          lexState = "value";
        },
        beforePropertyName() {
          switch (c) {
           case "$":
           case "_":
            return buffer = read(), void (lexState = "identifierName");

           case "\\":
            return read(), void (lexState = "identifierNameStartEscape");

           case "}":
            return newToken("punctuator", read());

           case '"':
           case "'":
            return doubleQuote = '"' === read(), void (lexState = "string");
          }
          if (util.isIdStartChar(c)) return buffer += read(), void (lexState = "identifierName");
          throw invalidChar(read());
        },
        afterPropertyName() {
          if (":" === c) return newToken("punctuator", read());
          throw invalidChar(read());
        },
        beforePropertyValue() {
          lexState = "value";
        },
        afterPropertyValue() {
          switch (c) {
           case ",":
           case "}":
            return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforeArrayValue() {
          if ("]" === c) return newToken("punctuator", read());
          lexState = "value";
        },
        afterArrayValue() {
          switch (c) {
           case ",":
           case "]":
            return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        end() {
          throw invalidChar(read());
        }
      };
      function newToken(type, value) {
        return {
          type,
          value,
          line,
          column
        };
      }
      function literal(s) {
        for (const c of s) {
          if (peek() !== c) throw invalidChar(read());
          read();
        }
      }
      function unicodeEscape() {
        let buffer = "", count = 4;
        for (;count-- > 0; ) {
          const c = peek();
          if (!util.isHexDigit(c)) throw invalidChar(read());
          buffer += read();
        }
        return String.fromCodePoint(parseInt(buffer, 16));
      }
      const parseStates = {
        start() {
          if ("eof" === token.type) throw invalidEOF();
          push();
        },
        beforePropertyName() {
          switch (token.type) {
           case "identifier":
           case "string":
            return key = token.value, void (parseState = "afterPropertyName");

           case "punctuator":
            return void pop();

           case "eof":
            throw invalidEOF();
          }
        },
        afterPropertyName() {
          if ("eof" === token.type) throw invalidEOF();
          parseState = "beforePropertyValue";
        },
        beforePropertyValue() {
          if ("eof" === token.type) throw invalidEOF();
          push();
        },
        beforeArrayValue() {
          if ("eof" === token.type) throw invalidEOF();
          "punctuator" !== token.type || "]" !== token.value ? push() : pop();
        },
        afterPropertyValue() {
          if ("eof" === token.type) throw invalidEOF();
          switch (token.value) {
           case ",":
            return void (parseState = "beforePropertyName");

           case "}":
            pop();
          }
        },
        afterArrayValue() {
          if ("eof" === token.type) throw invalidEOF();
          switch (token.value) {
           case ",":
            return void (parseState = "beforeArrayValue");

           case "]":
            pop();
          }
        },
        end() {}
      };
      function push() {
        let value;
        switch (token.type) {
         case "punctuator":
          switch (token.value) {
           case "{":
            value = {};
            break;

           case "[":
            value = [];
          }
          break;

         case "null":
         case "boolean":
         case "numeric":
         case "string":
          value = token.value;
        }
        if (void 0 === root) root = value; else {
          const parent = stack[stack.length - 1];
          Array.isArray(parent) ? parent.push(value) : parent[key] = value;
        }
        if (null !== value && "object" == typeof value) stack.push(value), parseState = Array.isArray(value) ? "beforeArrayValue" : "beforePropertyName"; else {
          const current = stack[stack.length - 1];
          parseState = null == current ? "end" : Array.isArray(current) ? "afterArrayValue" : "afterPropertyValue";
        }
      }
      function pop() {
        stack.pop();
        const current = stack[stack.length - 1];
        parseState = null == current ? "end" : Array.isArray(current) ? "afterArrayValue" : "afterPropertyValue";
      }
      function invalidChar(c) {
        return syntaxError(void 0 === c ? `JSON5: invalid end of input at ${line}:${column}` : `JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`);
      }
      function invalidEOF() {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
      }
      function invalidIdentifier() {
        return column -= 5, syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
      }
      function formatChar(c) {
        const replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "\t": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        if (replacements[c]) return replacements[c];
        if (c < " ") {
          const hexString = c.charCodeAt(0).toString(16);
          return "\\x" + ("00" + hexString).substring(hexString.length);
        }
        return c;
      }
      function syntaxError(message) {
        const err = new SyntaxError(message);
        return err.lineNumber = line, err.columnNumber = column, err;
      }
      const JSON5 = {
        parse: function(text, reviver) {
          source = String(text), parseState = "start", stack = [], pos = 0, line = 1, column = 0, 
          token = void 0, key = void 0, root = void 0;
          do {
            token = lex(), parseStates[parseState]();
          } while ("eof" !== token.type);
          return "function" == typeof reviver ? internalize({
            "": root
          }, "", reviver) : root;
        },
        stringify: function(value, replacer, space) {
          const stack = [];
          let propertyList, replacerFunc, quote, indent = "", gap = "";
          if (null == replacer || "object" != typeof replacer || Array.isArray(replacer) || (space = replacer.space, 
          quote = replacer.quote, replacer = replacer.replacer), "function" == typeof replacer) replacerFunc = replacer; else if (Array.isArray(replacer)) {
            propertyList = [];
            for (const v of replacer) {
              let item;
              "string" == typeof v ? item = v : ("number" == typeof v || v instanceof String || v instanceof Number) && (item = String(v)), 
              void 0 !== item && propertyList.indexOf(item) < 0 && propertyList.push(item);
            }
          }
          return space instanceof Number ? space = Number(space) : space instanceof String && (space = String(space)), 
          "number" == typeof space ? space > 0 && (space = Math.min(10, Math.floor(space)), 
          gap = "          ".substr(0, space)) : "string" == typeof space && (gap = space.substr(0, 10)), 
          serializeProperty("", {
            "": value
          });
          function serializeProperty(key, holder) {
            let value = holder[key];
            switch (null != value && ("function" == typeof value.toJSON5 ? value = value.toJSON5(key) : "function" == typeof value.toJSON && (value = value.toJSON(key))), 
            replacerFunc && (value = replacerFunc.call(holder, key, value)), value instanceof Number ? value = Number(value) : value instanceof String ? value = String(value) : value instanceof Boolean && (value = value.valueOf()), 
            value) {
             case null:
              return "null";

             case !0:
              return "true";

             case !1:
              return "false";
            }
            return "string" == typeof value ? quoteString(value) : "number" == typeof value ? String(value) : "object" == typeof value ? Array.isArray(value) ? function(value) {
              if (stack.indexOf(value) >= 0) throw TypeError("Converting circular structure to JSON5");
              stack.push(value);
              let stepback = indent;
              indent += gap;
              let final, partial = [];
              for (let i = 0; i < value.length; i++) {
                const propertyString = serializeProperty(String(i), value);
                partial.push(void 0 !== propertyString ? propertyString : "null");
              }
              if (0 === partial.length) final = "[]"; else if ("" === gap) {
                final = "[" + partial.join(",") + "]";
              } else {
                let separator = ",\n" + indent, properties = partial.join(separator);
                final = "[\n" + indent + properties + ",\n" + stepback + "]";
              }
              return stack.pop(), indent = stepback, final;
            }(value) : function(value) {
              if (stack.indexOf(value) >= 0) throw TypeError("Converting circular structure to JSON5");
              stack.push(value);
              let stepback = indent;
              indent += gap;
              let final, keys = propertyList || Object.keys(value), partial = [];
              for (const key of keys) {
                const propertyString = serializeProperty(key, value);
                if (void 0 !== propertyString) {
                  let member = serializeKey(key) + ":";
                  "" !== gap && (member += " "), member += propertyString, partial.push(member);
                }
              }
              if (0 === partial.length) final = "{}"; else {
                let properties;
                if ("" === gap) properties = partial.join(","), final = "{" + properties + "}"; else {
                  let separator = ",\n" + indent;
                  properties = partial.join(separator), final = "{\n" + indent + properties + ",\n" + stepback + "}";
                }
              }
              return stack.pop(), indent = stepback, final;
            }(value) : void 0;
          }
          function quoteString(value) {
            const quotes = {
              "'": .1,
              '"': .2
            }, replacements = {
              "'": "\\'",
              '"': '\\"',
              "\\": "\\\\",
              "\b": "\\b",
              "\f": "\\f",
              "\n": "\\n",
              "\r": "\\r",
              "\t": "\\t",
              "\v": "\\v",
              "\0": "\\0",
              "\u2028": "\\u2028",
              "\u2029": "\\u2029"
            };
            let product = "";
            for (let i = 0; i < value.length; i++) {
              const c = value[i];
              switch (c) {
               case "'":
               case '"':
                quotes[c]++, product += c;
                continue;

               case "\0":
                if (util.isDigit(value[i + 1])) {
                  product += "\\x00";
                  continue;
                }
              }
              if (replacements[c]) product += replacements[c]; else if (c < " ") {
                let hexString = c.charCodeAt(0).toString(16);
                product += "\\x" + ("00" + hexString).substring(hexString.length);
              } else product += c;
            }
            const quoteChar = quote || Object.keys(quotes).reduce(((a, b) => quotes[a] < quotes[b] ? a : b));
            return product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]), 
            quoteChar + product + quoteChar;
          }
          function serializeKey(key) {
            if (0 === key.length) return quoteString(key);
            const firstChar = String.fromCodePoint(key.codePointAt(0));
            if (!util.isIdStartChar(firstChar)) return quoteString(key);
            for (let i = firstChar.length; i < key.length; i++) if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) return quoteString(key);
            return key;
          }
        }
      };
      const __WEBPACK_DEFAULT_EXPORT__ = JSON5;
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
    return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.exports;
  }
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: definition[key]
    });
  }, __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
  __webpack_require__.r = exports => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  };
  var __webpack_exports__ = __webpack_require__(2420), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();