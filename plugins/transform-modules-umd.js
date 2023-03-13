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
    1692: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, exports.skipAllButComputedKey = skipAllButComputedKey;
      var _t = __webpack_require__(8459);
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
      var _assert = __webpack_require__(9491), _t = __webpack_require__(8459);
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
      var _assert = __webpack_require__(9491), _t = __webpack_require__(8459), _importBuilder = __webpack_require__(9503), _isModule = __webpack_require__(821);
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
      var _assert = __webpack_require__(9491), _t = __webpack_require__(8459), _template = __webpack_require__(4847), _helperModuleImports = __webpack_require__(203), _rewriteThis = __webpack_require__(333), _rewriteLiveReferences = __webpack_require__(7500), _normalizeAndLoadMetadata = __webpack_require__(6368), _getModuleName = __webpack_require__(6294);
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
      var _assert = __webpack_require__(9491), _t = __webpack_require__(8459), _template = __webpack_require__(4847), _helperSimpleAccess = __webpack_require__(9196);
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
      var _helperEnvironmentVisitor = __webpack_require__(1692), _traverse = __webpack_require__(7098), _t = __webpack_require__(8459);
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
      var _t = __webpack_require__(8459);
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
      var _t = __webpack_require__(8459);
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
      var _jsTokens = __webpack_require__(6188), _helperValidatorIdentifier = __webpack_require__(720), _chalk = __webpack_require__(7215);
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
    5488: module => {
      "use strict";
      module.exports = require("../lib/helper-plugin-utils");
    },
    2545: module => {
      "use strict";
      module.exports = require("../lib/parser");
    },
    7098: module => {
      "use strict";
      module.exports = require("../lib/traverse");
    },
    8459: module => {
      "use strict";
      module.exports = require("../lib/types");
    },
    4629: module => {
      "use strict";
      module.exports = require("@babel/core");
    },
    7215: module => {
      "use strict";
      module.exports = require("../lib/chalk");
    },
    9491: module => {
      "use strict";
      module.exports = require("assert");
    },
    1017: module => {
      "use strict";
      module.exports = require("path");
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
    var _helperPluginUtils = __webpack_require__(5488), _path = __webpack_require__(1017), _helperModuleTransforms = __webpack_require__(2454), _core = __webpack_require__(4629);
    const buildPrerequisiteAssignment = (0, _core.template)("\n  GLOBAL_REFERENCE = GLOBAL_REFERENCE || {}\n"), buildWrapper = (0, 
    _core.template)('\n  (function (global, factory) {\n    if (typeof define === "function" && define.amd) {\n      define(MODULE_NAME, AMD_ARGUMENTS, factory);\n    } else if (typeof exports !== "undefined") {\n      factory(COMMONJS_ARGUMENTS);\n    } else {\n      var mod = { exports: {} };\n      factory(BROWSER_ARGUMENTS);\n\n      GLOBAL_TO_ASSIGN;\n    }\n  })(\n    typeof globalThis !== "undefined" ? globalThis\n      : typeof self !== "undefined" ? self\n      : this,\n    function(IMPORT_NAMES) {\n  })\n');
    var _default = (0, _helperPluginUtils.declare)(((api, options) => {
      var _api$assumption, _api$assumption2;
      api.assertVersion(7);
      const {globals, exactGlobals, allowTopLevelThis, strict, strictMode, noInterop, importInterop} = options, constantReexports = null != (_api$assumption = api.assumption("constantReexports")) ? _api$assumption : options.loose, enumerableModuleMeta = null != (_api$assumption2 = api.assumption("enumerableModuleMeta")) ? _api$assumption2 : options.loose;
      function buildBrowserInit(browserGlobals, exactGlobals, filename, moduleName) {
        const moduleNameOrBasename = moduleName ? moduleName.value : (0, _path.basename)(filename, (0, 
        _path.extname)(filename));
        let globalToAssign = _core.types.memberExpression(_core.types.identifier("global"), _core.types.identifier(_core.types.toIdentifier(moduleNameOrBasename))), initAssignments = [];
        if (exactGlobals) {
          const globalName = browserGlobals[moduleNameOrBasename];
          if (globalName) {
            initAssignments = [];
            const members = globalName.split(".");
            globalToAssign = members.slice(1).reduce(((accum, curr) => (initAssignments.push(buildPrerequisiteAssignment({
              GLOBAL_REFERENCE: _core.types.cloneNode(accum)
            })), _core.types.memberExpression(accum, _core.types.identifier(curr)))), _core.types.memberExpression(_core.types.identifier("global"), _core.types.identifier(members[0])));
          }
        }
        return initAssignments.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", globalToAssign, _core.types.memberExpression(_core.types.identifier("mod"), _core.types.identifier("exports"))))), 
        initAssignments;
      }
      function buildBrowserArg(browserGlobals, exactGlobals, source) {
        let memberExpression;
        if (exactGlobals) {
          const globalRef = browserGlobals[source];
          memberExpression = globalRef ? globalRef.split(".").reduce(((accum, curr) => _core.types.memberExpression(accum, _core.types.identifier(curr))), _core.types.identifier("global")) : _core.types.memberExpression(_core.types.identifier("global"), _core.types.identifier(_core.types.toIdentifier(source)));
        } else {
          const requireName = (0, _path.basename)(source, (0, _path.extname)(source)), globalName = browserGlobals[requireName] || requireName;
          memberExpression = _core.types.memberExpression(_core.types.identifier("global"), _core.types.identifier(_core.types.toIdentifier(globalName)));
        }
        return memberExpression;
      }
      return {
        name: "transform-modules-umd",
        visitor: {
          Program: {
            exit(path) {
              if (!(0, _helperModuleTransforms.isModule)(path)) return;
              const browserGlobals = globals || {};
              let moduleName = (0, _helperModuleTransforms.getModuleName)(this.file.opts, options);
              moduleName && (moduleName = _core.types.stringLiteral(moduleName));
              const {meta, headers} = (0, _helperModuleTransforms.rewriteModuleStatementsAndPrepareHeader)(path, {
                constantReexports,
                enumerableModuleMeta,
                strict,
                strictMode,
                allowTopLevelThis,
                noInterop,
                importInterop
              }), amdArgs = [], commonjsArgs = [], browserArgs = [], importNames = [];
              (0, _helperModuleTransforms.hasExports)(meta) && (amdArgs.push(_core.types.stringLiteral("exports")), 
              commonjsArgs.push(_core.types.identifier("exports")), browserArgs.push(_core.types.memberExpression(_core.types.identifier("mod"), _core.types.identifier("exports"))), 
              importNames.push(_core.types.identifier(meta.exportName)));
              for (const [source, metadata] of meta.source) {
                if (amdArgs.push(_core.types.stringLiteral(source)), commonjsArgs.push(_core.types.callExpression(_core.types.identifier("require"), [ _core.types.stringLiteral(source) ])), 
                browserArgs.push(buildBrowserArg(browserGlobals, exactGlobals, source)), importNames.push(_core.types.identifier(metadata.name)), 
                !(0, _helperModuleTransforms.isSideEffectImport)(metadata)) {
                  const interop = (0, _helperModuleTransforms.wrapInterop)(path, _core.types.identifier(metadata.name), metadata.interop);
                  if (interop) {
                    const header = _core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.identifier(metadata.name), interop));
                    header.loc = meta.loc, headers.push(header);
                  }
                }
                headers.push(...(0, _helperModuleTransforms.buildNamespaceInitStatements)(meta, metadata, constantReexports));
              }
              (0, _helperModuleTransforms.ensureStatementsHoisted)(headers), path.unshiftContainer("body", headers);
              const {body, directives} = path.node;
              path.node.directives = [], path.node.body = [];
              const umdFactory = path.pushContainer("body", [ buildWrapper({
                MODULE_NAME: moduleName,
                AMD_ARGUMENTS: _core.types.arrayExpression(amdArgs),
                COMMONJS_ARGUMENTS: commonjsArgs,
                BROWSER_ARGUMENTS: browserArgs,
                IMPORT_NAMES: importNames,
                GLOBAL_TO_ASSIGN: buildBrowserInit(browserGlobals, exactGlobals, this.filename || "unknown", moduleName)
              }) ])[0].get("expression.arguments")[1].get("body");
              umdFactory.pushContainer("directives", directives), umdFactory.pushContainer("body", body);
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