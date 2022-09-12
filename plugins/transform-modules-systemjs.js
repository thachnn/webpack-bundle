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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 524);
}({
  0: function(module, exports) {
    module.exports = require("../lib/types");
  },
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  10: function(module, exports) {
    module.exports = require("assert");
  },
  100: function(module, exports, __webpack_require__) {
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
      programPath.traverse(rewriteBindingInitVisitor, {
        metadata: metadata,
        requeueInParent: requeueInParent,
        scope: programPath.scope,
        exported: exported
      }), (0, _helperSimpleAccess.default)(programPath, new Set([ ...Array.from(imported.keys()), ...Array.from(exported.keys()) ])), 
      programPath.traverse(rewriteReferencesVisitor, {
        seen: new WeakSet,
        metadata: metadata,
        requeueInParent: requeueInParent,
        scope: programPath.scope,
        imported: imported,
        exported: exported,
        buildImportReference: ([source, importName, localName], identNode) => {
          const meta = metadata.source.get(source);
          if (localName) return meta.lazy && (identNode = t.callExpression(identNode, [])), 
          identNode;
          let namespace = t.identifier(meta.name);
          return meta.lazy && (namespace = t.callExpression(namespace, [])), t.memberExpression(namespace, t.identifier(importName));
        }
      });
    };
    var _assert = _interopRequireDefault(__webpack_require__(10)), t = function(obj) {
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
    }(__webpack_require__(0)), _template = _interopRequireDefault(__webpack_require__(11)), _helperSimpleAccess = _interopRequireDefault(__webpack_require__(84));
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
    const rewriteBindingInitVisitor = {
      Scope(path) {
        path.skip();
      },
      ClassDeclaration(path) {
        const {requeueInParent: requeueInParent, exported: exported, metadata: metadata} = this, {id: id} = path.node;
        if (!id) throw new Error("Expected class to have a name");
        const localName = id.name, exportNames = exported.get(localName) || [];
        if (exportNames.length > 0) {
          const statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
          statement._blockHoist = path.node._blockHoist, requeueInParent(path.insertAfter(statement)[0]);
        }
      },
      VariableDeclaration(path) {
        const {requeueInParent: requeueInParent, exported: exported, metadata: metadata} = this;
        Object.keys(path.getOuterBindingIdentifiers()).forEach(localName => {
          const exportNames = exported.get(localName) || [];
          if (exportNames.length > 0) {
            const statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
            statement._blockHoist = path.node._blockHoist, requeueInParent(path.insertAfter(statement)[0]);
          }
        });
      }
    }, buildBindingExportAssignmentExpression = (metadata, exportNames, localExpr) => (exportNames || []).reduce((expr, exportName) => t.assignmentExpression("=", t.memberExpression(t.identifier(metadata.exportName), t.identifier(exportName)), expr), localExpr), buildImportThrow = localName => _template.default.expression.ast`
    (function() {
      throw new Error('"' + '${localName}' + '" is read-only.');
    })()
  `, rewriteReferencesVisitor = {
      ReferencedIdentifier(path) {
        const {seen: seen, buildImportReference: buildImportReference, scope: scope, imported: imported, requeueInParent: requeueInParent} = this;
        if (seen.has(path.node)) return;
        seen.add(path.node);
        const localName = path.node.name, localBinding = path.scope.getBinding(localName);
        if (scope.getBinding(localName) !== localBinding) return;
        const importData = imported.get(localName);
        if (importData) {
          const ref = buildImportReference(importData, path.node);
          if (ref.loc = path.node.loc, (path.parentPath.isCallExpression({
            callee: path.node
          }) || path.parentPath.isOptionalCallExpression({
            callee: path.node
          }) || path.parentPath.isTaggedTemplateExpression({
            tag: path.node
          })) && t.isMemberExpression(ref)) path.replaceWith(t.sequenceExpression([ t.numericLiteral(0), ref ])); else if (path.isJSXIdentifier() && t.isMemberExpression(ref)) {
            const {object: object, property: property} = ref;
            path.replaceWith(t.JSXMemberExpression(t.JSXIdentifier(object.name), t.JSXIdentifier(property.name)));
          } else path.replaceWith(ref);
          requeueInParent(path), path.skip();
        }
      },
      AssignmentExpression: {
        exit(path) {
          const {scope: scope, seen: seen, imported: imported, exported: exported, requeueInParent: requeueInParent, buildImportReference: buildImportReference} = this;
          if (seen.has(path.node)) return;
          seen.add(path.node);
          const left = path.get("left");
          if (!left.isMemberExpression()) if (left.isIdentifier()) {
            const localName = left.node.name;
            if (scope.getBinding(localName) !== path.scope.getBinding(localName)) return;
            const exportedNames = exported.get(localName), importData = imported.get(localName);
            if ((null == exportedNames ? void 0 : exportedNames.length) > 0 || importData) {
              (0, _assert.default)("=" === path.node.operator, "Path was not simplified");
              const assignment = path.node;
              importData && (assignment.left = buildImportReference(importData, assignment.left), 
              assignment.right = t.sequenceExpression([ assignment.right, buildImportThrow(localName) ])), 
              path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, assignment)), 
              requeueInParent(path);
            }
          } else {
            const ids = left.getOuterBindingIdentifiers(), programScopeIds = Object.keys(ids).filter(localName => scope.getBinding(localName) === path.scope.getBinding(localName)), id = programScopeIds.find(localName => imported.has(localName));
            id && (path.node.right = t.sequenceExpression([ path.node.right, buildImportThrow(id) ]));
            const items = [];
            if (programScopeIds.forEach(localName => {
              const exportedNames = exported.get(localName) || [];
              exportedNames.length > 0 && items.push(buildBindingExportAssignmentExpression(this.metadata, exportedNames, t.identifier(localName)));
            }), items.length > 0) {
              let node = t.sequenceExpression(items);
              path.parentPath.isExpressionStatement() && (node = t.expressionStatement(node), 
              node._blockHoist = path.parentPath.node._blockHoist);
              requeueInParent(path.insertAfter(node)[0]);
            }
          }
        }
      },
      "ForOfStatement|ForInStatement"(path) {
        const {scope: scope, node: node} = path, {left: left} = node, {exported: exported, scope: programScope} = this;
        if (!t.isVariableDeclaration(left)) {
          let didTransform = !1;
          const bodyPath = path.get("body"), loopBodyScope = bodyPath.scope;
          for (const name of Object.keys(t.getOuterBindingIdentifiers(left))) exported.get(name) && programScope.getBinding(name) === scope.getBinding(name) && (didTransform = !0, 
          loopBodyScope.hasOwnBinding(name) && loopBodyScope.rename(name));
          if (!didTransform) return;
          const newLoopId = scope.generateUidIdentifierBasedOnNode(left);
          bodyPath.unshiftContainer("body", t.expressionStatement(t.assignmentExpression("=", left, newLoopId))), 
          path.get("left").replaceWith(t.variableDeclaration("let", [ t.variableDeclarator(t.cloneNode(newLoopId)) ])), 
          scope.registerDeclaration(path.get("left"));
        }
      }
    };
  },
  101: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.hasExports = function(metadata) {
      return metadata.hasExports;
    }, exports.isSideEffectImport = isSideEffectImport, exports.default = function(programPath, exportName, {noInterop: noInterop = !1, loose: loose = !1, lazy: lazy = !1, esNamespaceOnly: esNamespaceOnly = !1} = {}) {
      exportName || (exportName = programPath.scope.generateUidIdentifier("exports").name);
      !function(programPath) {
        programPath.get("body").forEach(child => {
          child.isExportDefaultDeclaration() && (0, _helperSplitExportDeclaration.default)(child);
        });
      }(programPath);
      const {local: local, source: source, hasExports: hasExports} = function(programPath, {loose: loose, lazy: lazy}) {
        const localData = function(programPath, loose) {
          const bindingKindLookup = new Map;
          programPath.get("body").forEach(child => {
            let kind;
            if (child.isImportDeclaration()) kind = "import"; else {
              if (child.isExportDefaultDeclaration() && (child = child.get("declaration")), child.isExportNamedDeclaration()) if (child.node.declaration) child = child.get("declaration"); else if (loose && child.node.source && child.get("source").isStringLiteral()) return void child.node.specifiers.forEach(specifier => {
                bindingKindLookup.set(specifier.local.name, "block");
              });
              if (child.isFunctionDeclaration()) kind = "hoisted"; else if (child.isClassDeclaration()) kind = "block"; else if (child.isVariableDeclaration({
                kind: "var"
              })) kind = "var"; else {
                if (!child.isVariableDeclaration()) return;
                kind = "block";
              }
            }
            Object.keys(child.getOuterBindingIdentifiers()).forEach(name => {
              bindingKindLookup.set(name, kind);
            });
          });
          const localMetadata = new Map, getLocalMetadata = idPath => {
            const localName = idPath.node.name;
            let metadata = localMetadata.get(localName);
            if (!metadata) {
              const kind = bindingKindLookup.get(localName);
              if (void 0 === kind) throw idPath.buildCodeFrameError(`Exporting local "${localName}", which is not declared.`);
              metadata = {
                names: [],
                kind: kind
              }, localMetadata.set(localName, metadata);
            }
            return metadata;
          };
          return programPath.get("body").forEach(child => {
            if (!child.isExportNamedDeclaration() || !loose && child.node.source) {
              if (child.isExportDefaultDeclaration()) {
                const declaration = child.get("declaration");
                if (!declaration.isFunctionDeclaration() && !declaration.isClassDeclaration()) throw declaration.buildCodeFrameError("Unexpected default expression export.");
                getLocalMetadata(declaration.get("id")).names.push("default");
              }
            } else if (child.node.declaration) {
              const declaration = child.get("declaration"), ids = declaration.getOuterBindingIdentifierPaths();
              Object.keys(ids).forEach(name => {
                if ("__esModule" === name) throw declaration.buildCodeFrameError('Illegal export "__esModule".');
                getLocalMetadata(ids[name]).names.push(name);
              });
            } else child.get("specifiers").forEach(spec => {
              const local = spec.get("local"), exported = spec.get("exported");
              if ("__esModule" === exported.node.name) throw exported.buildCodeFrameError('Illegal export "__esModule".');
              getLocalMetadata(local).names.push(exported.node.name);
            });
          }), localMetadata;
        }(programPath, loose), sourceData = new Map, getData = sourceNode => {
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
            lazy: !1
          }, sourceData.set(source, data)), data;
        };
        let hasExports = !1;
        programPath.get("body").forEach(child => {
          if (child.isImportDeclaration()) {
            const data = getData(child.node.source);
            data.loc || (data.loc = child.node.loc), child.get("specifiers").forEach(spec => {
              if (spec.isImportDefaultSpecifier()) {
                const localName = spec.get("local").node.name;
                data.imports.set(localName, "default");
                const reexport = localData.get(localName);
                reexport && (localData.delete(localName), reexport.names.forEach(name => {
                  data.reexports.set(name, "default");
                }));
              } else if (spec.isImportNamespaceSpecifier()) {
                const localName = spec.get("local").node.name;
                data.importsNamespace.add(localName);
                const reexport = localData.get(localName);
                reexport && (localData.delete(localName), reexport.names.forEach(name => {
                  data.reexportNamespace.add(name);
                }));
              } else if (spec.isImportSpecifier()) {
                const importName = spec.get("imported").node.name, localName = spec.get("local").node.name;
                data.imports.set(localName, importName);
                const reexport = localData.get(localName);
                reexport && (localData.delete(localName), reexport.names.forEach(name => {
                  data.reexports.set(name, importName);
                }));
              }
            });
          } else if (child.isExportAllDeclaration()) {
            hasExports = !0;
            const data = getData(child.node.source);
            data.loc || (data.loc = child.node.loc), data.reexportAll = {
              loc: child.node.loc
            };
          } else if (child.isExportNamedDeclaration() && child.node.source) {
            hasExports = !0;
            const data = getData(child.node.source);
            data.loc || (data.loc = child.node.loc), child.get("specifiers").forEach(spec => {
              if (!spec.isExportSpecifier()) throw spec.buildCodeFrameError("Unexpected export specifier type");
              const importName = spec.get("local").node.name, exportName = spec.get("exported").node.name;
              if (data.reexports.set(exportName, importName), "__esModule" === exportName) throw exportName.buildCodeFrameError('Illegal export "__esModule".');
            });
          } else (child.isExportNamedDeclaration() || child.isExportDefaultDeclaration()) && (hasExports = !0);
        });
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
          hasExports: hasExports,
          local: localData,
          source: sourceData
        };
      }(programPath, {
        loose: loose,
        lazy: lazy
      });
      !function(programPath) {
        programPath.get("body").forEach(child => {
          if (child.isImportDeclaration()) child.remove(); else if (child.isExportNamedDeclaration()) child.node.declaration ? (child.node.declaration._blockHoist = child.node._blockHoist, 
          child.replaceWith(child.node.declaration)) : child.remove(); else if (child.isExportDefaultDeclaration()) {
            const declaration = child.get("declaration");
            if (!declaration.isFunctionDeclaration() && !declaration.isClassDeclaration()) throw declaration.buildCodeFrameError("Unexpected default expression export.");
            declaration._blockHoist = child.node._blockHoist, child.replaceWith(declaration);
          } else child.isExportAllDeclaration() && child.remove();
        });
      }(programPath);
      for (const [, metadata] of source) metadata.importsNamespace.size > 0 && (metadata.name = metadata.importsNamespace.values().next().value), 
      noInterop ? metadata.interop = "none" : esNamespaceOnly && "namespace" === metadata.interop && (metadata.interop = "default");
      return {
        exportName: exportName,
        exportNameListName: null,
        hasExports: hasExports,
        local: local,
        source: source
      };
    };
    var obj, _path = __webpack_require__(85), _helperSplitExportDeclaration = (obj = __webpack_require__(45)) && obj.__esModule ? obj : {
      default: obj
    };
    function isSideEffectImport(source) {
      return 0 === source.imports.size && 0 === source.importsNamespace.size && 0 === source.reexports.size && 0 === source.reexportNamespace.size && !source.reexportAll;
    }
  },
  102: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(rootOpts, pluginOpts) {
      var _pluginOpts$moduleRoo, _rootOpts$moduleIds, _rootOpts$moduleRoot;
      const {filename: filename, filenameRelative: filenameRelative = filename, sourceRoot: sourceRoot = (null != (_pluginOpts$moduleRoo = pluginOpts.moduleRoot) ? _pluginOpts$moduleRoo : rootOpts.moduleRoot)} = rootOpts, {moduleId: moduleId = rootOpts.moduleId, moduleIds: moduleIds = (null != (_rootOpts$moduleIds = rootOpts.moduleIds) ? _rootOpts$moduleIds : !!moduleId), getModuleId: getModuleId = rootOpts.getModuleId, moduleRoot: moduleRoot = (null != (_rootOpts$moduleRoot = rootOpts.moduleRoot) ? _rootOpts$moduleRoot : sourceRoot)} = pluginOpts;
      if (!moduleIds) return null;
      if (null != moduleId && !getModuleId) return moduleId;
      let moduleName = null != moduleRoot ? moduleRoot + "/" : "";
      if (filenameRelative) {
        const sourceRootReplacer = null != sourceRoot ? new RegExp("^" + sourceRoot + "/?") : "";
        moduleName += filenameRelative.replace(sourceRootReplacer, "").replace(/\.(\w*?)$/, "");
      }
      return moduleName = moduleName.replace(/\\/g, "/"), getModuleId && getModuleId(moduleName) || moduleName;
    };
  },
  11: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = exports.program = exports.expression = exports.statements = exports.statement = exports.smart = void 0;
    var obj, formatters = function(obj) {
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
    }(__webpack_require__(26)), _builder = (obj = __webpack_require__(27)) && obj.__esModule ? obj : {
      default: obj
    };
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
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
      smart: smart,
      statement: statement,
      statements: statements,
      expression: expression,
      program: program,
      ast: smart.ast
    });
    exports.default = _default;
  },
  12: function(module, exports, __webpack_require__) {
    var baseGetTag = __webpack_require__(7), isObject = __webpack_require__(3);
    module.exports = function(value) {
      if (!isObject(value)) return !1;
      var tag = baseGetTag(value);
      return "[object Function]" == tag || "[object GeneratorFunction]" == tag || "[object AsyncFunction]" == tag || "[object Proxy]" == tag;
    };
  },
  121: function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(122);
  },
  122: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var _slicedToArray = function(arr, i) {
      if (Array.isArray(arr)) return arr;
      if (Symbol.iterator in Object(arr)) return function(arr, i) {
        var _arr = [], _n = !0, _d = !1, _e = void 0;
        try {
          for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
          !i || _arr.length !== i); _n = !0) ;
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            !_n && _i.return && _i.return();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }(arr, i);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
    function getImportSource(t, callNode) {
      var importArguments = callNode.arguments, importPath = _slicedToArray(importArguments, 1)[0];
      return t.isStringLiteral(importPath) || t.isTemplateLiteral(importPath) ? (t.removeComments(importPath), 
      importPath) : t.templateLiteral([ t.templateElement({
        raw: "",
        cooked: ""
      }), t.templateElement({
        raw: "",
        cooked: ""
      }, !0) ], importArguments);
    }
    exports.getImportSource = getImportSource, exports.createDynamicImportTransform = function(_ref) {
      var template = _ref.template, t = _ref.types, builders = {
        static: {
          interop: template("Promise.resolve().then(() => INTEROP(require(SOURCE)))"),
          noInterop: template("Promise.resolve().then(() => require(SOURCE))")
        },
        dynamic: {
          interop: template("Promise.resolve(SOURCE).then(s => INTEROP(require(s)))"),
          noInterop: template("Promise.resolve(SOURCE).then(s => require(s))")
        }
      }, visited = "function" == typeof WeakSet && new WeakSet;
      return function(context, path) {
        if (visited) {
          if (visited.has(path)) return;
          visited.add(path);
        }
        var node, SOURCE = getImportSource(t, path.parent), builder = (node = SOURCE, t.isStringLiteral(node) || t.isTemplateLiteral(node) && 0 === node.expressions.length ? builders.static : builders.dynamic), newImport = context.opts.noInterop ? builder.noInterop({
          SOURCE: SOURCE
        }) : builder.interop({
          SOURCE: SOURCE,
          INTEROP: context.addHelper("interopRequireWildcard")
        });
        path.parentPath.replaceWith(newImport);
      };
    };
  },
  13: function(module, exports) {
    var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
    module.exports = freeGlobal;
  },
  14: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "isIdentifierName", {
      enumerable: !0,
      get: function() {
        return _identifier.isIdentifierName;
      }
    }), Object.defineProperty(exports, "isIdentifierChar", {
      enumerable: !0,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    }), Object.defineProperty(exports, "isIdentifierStart", {
      enumerable: !0,
      get: function() {
        return _identifier.isIdentifierStart;
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
    }), Object.defineProperty(exports, "isKeyword", {
      enumerable: !0,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    var _identifier = __webpack_require__(18), _keyword = __webpack_require__(19);
  },
  15: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    module.exports = function(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = !0;
      } catch (e) {}
      var result = nativeObjectToString.call(value);
      return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
      result;
    };
  },
  16: function(module, exports) {
    var nativeObjectToString = Object.prototype.toString;
    module.exports = function(value) {
      return nativeObjectToString.call(value);
    };
  },
  17: function(module, exports) {
    module.exports = function(value) {
      return null != value && "object" == typeof value;
    };
  },
  18: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isIdentifierStart = isIdentifierStart, exports.isIdentifierChar = isIdentifierChar, 
    exports.isIdentifierName = function(name) {
      let isFirst = !0;
      for (let _i = 0, _Array$from = Array.from(name); _i < _Array$from.length; _i++) {
        const cp = _Array$from[_i].codePointAt(0);
        if (isFirst) {
          if (!isIdentifierStart(cp)) return !1;
          isFirst = !1;
        } else if (!isIdentifierChar(cp)) return !1;
      }
      return !isFirst;
    };
    let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
    const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];
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
  19: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isReservedWord = isReservedWord, exports.isStrictReservedWord = isStrictReservedWord, 
    exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, exports.isStrictBindReservedWord = function(word, inModule) {
      return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
    }, exports.isKeyword = function(word) {
      return keywords.has(word);
    };
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
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  21: function(module, exports, __webpack_require__) {
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
    var _highlight = function(obj) {
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
    }(__webpack_require__(23));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
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
      }(chalk), maybeHighlight = (chalkFn, string) => highlighted ? chalkFn(string) : string, lines = rawLines.split(NEWLINE), {start: start, end: end, markerLines: markerLines} = function(loc, source, opts) {
        const startLoc = Object.assign({
          column: 0,
          line: -1
        }, loc.start), endLoc = Object.assign({}, startLoc, loc.end), {linesAbove: linesAbove = 2, linesBelow: linesBelow = 3} = opts || {}, startLine = startLoc.line, startColumn = startLoc.column, endLine = endLoc.line, endColumn = endLoc.column;
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
          start: start,
          end: end,
          markerLines: markerLines
        };
      }(loc, lines, opts), hasColumns = loc.start && "number" == typeof loc.start.column, numberMaxWidth = String(end).length;
      let frame = (highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines).split(NEWLINE).slice(start, end).map((line, index) => {
        const number = start + 1 + index, gutter = ` ${(" " + number).slice(-numberMaxWidth)} | `, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
            markerLine = [ "\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers) ].join(""), 
            lastMarkerLine && opts.message && (markerLine += " " + maybeHighlight(defs.message, opts.message));
          }
          return [ maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line, markerLine ].join("");
        }
        return ` ${maybeHighlight(defs.gutter, gutter)}${line}`;
      }).join("\n");
      return opts.message && !hasColumns && (frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`), 
      highlighted ? chalk.reset(frame) : frame;
    }
  },
  22: function(module, exports) {
    module.exports = require("../lib/parser");
  },
  23: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shouldHighlight = shouldHighlight, exports.getChalk = getChalk, exports.default = function(code, options = {}) {
      if (shouldHighlight(options)) {
        const chalk = getChalk(options);
        return function(defs, text) {
          return text.replace(_jsTokens.default, (function(...args) {
            const type = function(match) {
              const [offset, text] = match.slice(-2), token = (0, _jsTokens.matchToToken)(match);
              if ("name" === token.type) {
                if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isReservedWord)(token.value)) return "keyword";
                if (JSX_TAG.test(token.value) && ("<" === text[offset - 1] || "</" == text.substr(offset - 2, 2))) return "jsx_tag";
                if (token.value[0] !== token.value[0].toLowerCase()) return "capitalized";
              }
              if ("punctuator" === token.type && BRACKET.test(token.value)) return "bracket";
              if ("invalid" === token.type && ("@" === token.value || "#" === token.value)) return "punctuator";
              return token.type;
            }(args), colorize = defs[type];
            return colorize ? args[0].split(NEWLINE).map(str => colorize(str)).join("\n") : args[0];
          }));
        }(function(chalk) {
          return {
            keyword: chalk.cyan,
            capitalized: chalk.yellow,
            jsx_tag: chalk.yellow,
            punctuator: chalk.yellow,
            number: chalk.magenta,
            string: chalk.green,
            regex: chalk.magenta,
            comment: chalk.grey,
            invalid: chalk.white.bgRed.bold
          };
        }(chalk), code);
      }
      return code;
    };
    var obj, _jsTokens = function(obj) {
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
    }(__webpack_require__(24)), _helperValidatorIdentifier = __webpack_require__(14), _chalk = (obj = __webpack_require__(25)) && obj.__esModule ? obj : {
      default: obj
    };
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const NEWLINE = /\r\n|[\n\r\u2028\u2029]/, JSX_TAG = /^[a-z][\w-]*$/i, BRACKET = /^[()[\]{}]$/;
    function shouldHighlight(options) {
      return _chalk.default.supportsColor || options.forceColor;
    }
    function getChalk(options) {
      let chalk = _chalk.default;
      return options.forceColor && (chalk = new _chalk.default.constructor({
        enabled: !0,
        level: 1
      })), chalk;
    }
  },
  24: function(module, exports) {
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
  25: function(module, exports) {
    module.exports = require("chalk");
  },
  26: function(module, exports, __webpack_require__) {
    "use strict";
    function makeStatementFormatter(fn) {
      return {
        code: str => "/* @babel/template */;\n" + str,
        validate: () => {},
        unwrap: ast => fn(ast.program.body.slice(1))
      };
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.program = exports.expression = exports.statement = exports.statements = exports.smart = void 0;
    const smart = makeStatementFormatter(body => body.length > 1 ? body : body[0]);
    exports.smart = smart;
    const statements = makeStatementFormatter(body => body);
    exports.statements = statements;
    const statement = makeStatementFormatter(body => {
      if (0 === body.length) throw new Error("Found nothing to return.");
      if (body.length > 1) throw new Error("Found multiple statements but wanted one");
      return body[0];
    });
    exports.statement = statement;
    const expression = {
      code: str => `(\n${str}\n)`,
      validate: ({program: program}) => {
        if (program.body.length > 1) throw new Error("Found multiple statements but wanted one");
        if (0 === program.body[0].expression.start) throw new Error("Parse result included parens.");
      },
      unwrap: ast => ast.program.body[0].expression
    };
    exports.expression = expression;
    exports.program = {
      code: str => str,
      validate: () => {},
      unwrap: ast => ast.program
    };
  },
  27: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function createTemplateBuilder(formatter, defaultOpts) {
      const templateFnCache = new WeakMap, templateAstCache = new WeakMap, cachedOpts = defaultOpts || (0, 
      _options.validate)(null);
      return Object.assign((tpl, ...args) => {
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
      }, {
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
    var _options = __webpack_require__(4), _string = _interopRequireDefault(__webpack_require__(28)), _literal = _interopRequireDefault(__webpack_require__(29));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
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
          throw err.stack += "\n    =============\n" + rootStack, err;
        }
      };
    }
  },
  28: function(module, exports, __webpack_require__) {
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
    var _options = __webpack_require__(4), _parse = _interopRequireDefault(__webpack_require__(8)), _populate = _interopRequireDefault(__webpack_require__(9));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
  },
  29: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(formatter, tpl, opts) {
      const {metadata: metadata, names: names} = function(formatter, tpl, opts) {
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
        } while (metadata.placeholders.some(placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name)));
        return {
          metadata: metadata,
          names: names
        };
      }(formatter, tpl, opts);
      return arg => {
        const defaultReplacements = arg.reduce((acc, replacement, i) => (acc[names[i]] = replacement, 
        acc), {});
        return arg => {
          const replacements = (0, _options.normalizeReplacements)(arg);
          return replacements && Object.keys(replacements).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) throw new Error("Unexpected replacement overlap.");
          }), formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
        };
      };
    };
    var _options = __webpack_require__(4), _parse = _interopRequireDefault(__webpack_require__(8)), _populate = _interopRequireDefault(__webpack_require__(9));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function buildTemplateCode(tpl, prefix) {
      const names = [];
      let code = tpl[0];
      for (let i = 1; i < tpl.length; i++) {
        const value = `${prefix}${i - 1}`;
        names.push(value), code += value + tpl[i];
      }
      return {
        names: names,
        code: code
      };
    }
  },
  3: function(module, exports) {
    module.exports = function(value) {
      var type = typeof value;
      return null != value && ("object" == type || "function" == type);
    };
  },
  30: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.skipAllButComputedKey = skipAllButComputedKey, exports.default = exports.environmentVisitor = void 0;
    var _traverse = _interopRequireDefault(__webpack_require__(46)), _helperMemberExpressionToFunctions = _interopRequireDefault(__webpack_require__(36)), _helperOptimiseCallExpression = _interopRequireDefault(__webpack_require__(32)), t = function(obj) {
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
    }(__webpack_require__(0));
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
    function getPrototypeOfExpression(objectRef, isStatic, file, isPrivateMethod) {
      objectRef = t.cloneNode(objectRef);
      const targetRef = isStatic || isPrivateMethod ? objectRef : t.memberExpression(objectRef, t.identifier("prototype"));
      return t.callExpression(file.addHelper("getPrototypeOf"), [ targetRef ]);
    }
    function skipAllButComputedKey(path) {
      if (!path.node.computed) return void path.skip();
      const keys = t.VISITOR_KEYS[path.type];
      for (const key of keys) "key" !== key && path.skipKey(key);
    }
    const environmentVisitor = {
      TypeAnnotation(path) {
        path.skip();
      },
      Function(path) {
        path.isMethod() || path.isArrowFunctionExpression() || path.skip();
      },
      "Method|ClassProperty|ClassPrivateProperty"(path) {
        skipAllButComputedKey(path);
      }
    };
    exports.environmentVisitor = environmentVisitor;
    const visitor = _traverse.default.visitors.merge([ environmentVisitor, {
      Super(path, state) {
        const {node: node, parentPath: parentPath} = path;
        parentPath.isMemberExpression({
          object: node
        }) && state.handle(parentPath);
      }
    } ]), specHandlers = {
      memoise(superMember, count) {
        const {scope: scope, node: node} = superMember, {computed: computed, property: property} = node;
        if (!computed) return;
        const memo = scope.maybeGenerateMemoised(property);
        memo && this.memoiser.set(property, memo, count);
      },
      prop(superMember) {
        const {computed: computed, property: property} = superMember.node;
        return this.memoiser.has(property) ? t.cloneNode(this.memoiser.get(property)) : computed ? t.cloneNode(property) : t.stringLiteral(property.name);
      },
      get(superMember) {
        return this._get(superMember, this._getThisRefs());
      },
      _get(superMember, thisRefs) {
        const proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
        return t.callExpression(this.file.addHelper("get"), [ thisRefs.memo ? t.sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), thisRefs.this ]);
      },
      _getThisRefs() {
        if (!this.isDerivedConstructor) return {
          this: t.thisExpression()
        };
        const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
        return {
          memo: t.assignmentExpression("=", thisRef, t.thisExpression()),
          this: t.cloneNode(thisRef)
        };
      },
      set(superMember, value) {
        const thisRefs = this._getThisRefs(), proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
        return t.callExpression(this.file.addHelper("set"), [ thisRefs.memo ? t.sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), value, thisRefs.this, t.booleanLiteral(superMember.isInStrictMode()) ]);
      },
      destructureSet(superMember) {
        throw superMember.buildCodeFrameError("Destructuring to a super field is not supported yet.");
      },
      call(superMember, args) {
        const thisRefs = this._getThisRefs();
        return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), t.cloneNode(thisRefs.this), args, !1);
      }
    }, looseHandlers = Object.assign({}, specHandlers, {
      prop(superMember) {
        const {property: property} = superMember.node;
        return this.memoiser.has(property) ? t.cloneNode(this.memoiser.get(property)) : t.cloneNode(property);
      },
      get(superMember) {
        const {isStatic: isStatic, superRef: superRef} = this, {computed: computed} = superMember.node, prop = this.prop(superMember);
        let object;
        return object = isStatic ? superRef ? t.cloneNode(superRef) : t.memberExpression(t.identifier("Function"), t.identifier("prototype")) : superRef ? t.memberExpression(t.cloneNode(superRef), t.identifier("prototype")) : t.memberExpression(t.identifier("Object"), t.identifier("prototype")), 
        t.memberExpression(object, prop, computed);
      },
      set(superMember, value) {
        const {computed: computed} = superMember.node, prop = this.prop(superMember);
        return t.assignmentExpression("=", t.memberExpression(t.thisExpression(), prop, computed), value);
      },
      destructureSet(superMember) {
        const {computed: computed} = superMember.node, prop = this.prop(superMember);
        return t.memberExpression(t.thisExpression(), prop, computed);
      },
      call(superMember, args) {
        return (0, _helperOptimiseCallExpression.default)(this.get(superMember), t.thisExpression(), args, !1);
      }
    });
    exports.default = class {
      constructor(opts) {
        const path = opts.methodPath;
        this.methodPath = path, this.isDerivedConstructor = path.isClassMethod({
          kind: "constructor"
        }) && !!opts.superRef, this.isStatic = path.isObjectMethod() || path.node.static, 
        this.isPrivateMethod = path.isPrivate() && path.isMethod(), this.file = opts.file, 
        this.superRef = opts.superRef, this.isLoose = opts.isLoose, this.opts = opts;
      }
      getObjectRef() {
        return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
      }
      replace() {
        const handler = this.isLoose ? looseHandlers : specHandlers;
        (0, _helperMemberExpressionToFunctions.default)(this.methodPath, visitor, Object.assign({
          file: this.file,
          scope: this.methodPath.scope,
          isDerivedConstructor: this.isDerivedConstructor,
          isStatic: this.isStatic,
          isPrivateMethod: this.isPrivateMethod,
          getObjectRef: this.getObjectRef.bind(this),
          superRef: this.superRef
        }, handler));
      }
    };
  },
  32: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(callee, thisNode, args, optional) {
      return 1 === args.length && t.isSpreadElement(args[0]) && t.isIdentifier(args[0].argument, {
        name: "arguments"
      }) ? t.callExpression(t.memberExpression(callee, t.identifier("apply")), [ thisNode, args[0].argument ]) : optional ? t.optionalCallExpression(t.optionalMemberExpression(callee, t.identifier("call"), !1, !0), [ thisNode, ...args ], !1) : t.callExpression(t.memberExpression(callee, t.identifier("call")), [ thisNode, ...args ]);
    };
    var t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  33: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path) {
      const {sourceType: sourceType} = path.node;
      if ("module" !== sourceType && "script" !== sourceType) throw path.buildCodeFrameError(`Unknown sourceType "${sourceType}", cannot transform.`);
      return "module" === path.node.sourceType;
    };
  },
  36: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path, visitor, state) {
      path.traverse(visitor, Object.assign({}, handle, state, {
        memoiser: new AssignmentMemoiser
      }));
    };
    var t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    class AssignmentMemoiser {
      constructor() {
        this._map = new WeakMap;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key) {
        if (!this.has(key)) return;
        const record = this._map.get(key), {value: value} = record;
        return record.count--, 0 === record.count ? t.assignmentExpression("=", value, key) : value;
      }
      set(key, value, count) {
        return this._map.set(key, {
          count: count,
          value: value
        });
      }
    }
    function toNonOptional(path, base) {
      const {node: node} = path;
      if (path.isOptionalMemberExpression()) return t.memberExpression(base, node.property, node.computed);
      if (path.isOptionalCallExpression()) {
        const callee = path.get("callee");
        if (path.node.optional && callee.isOptionalMemberExpression()) {
          const {object: object} = callee.node, context = path.scope.maybeGenerateMemoised(object) || object;
          return callee.get("object").replaceWith(t.assignmentExpression("=", context, object)), 
          t.callExpression(t.memberExpression(base, t.identifier("call")), [ context, ...node.arguments ]);
        }
        return t.callExpression(base, node.arguments);
      }
      return path.node;
    }
    const handle = {
      memoise() {},
      handle(member) {
        const {node: node, parent: parent, parentPath: parentPath} = member;
        if (member.isOptionalMemberExpression()) {
          if (function(path) {
            for (;path && !path.isProgram(); ) {
              const {parentPath: parentPath, container: container, listKey: listKey} = path, parentNode = parentPath.node;
              if (listKey) {
                if (container !== parentNode[listKey]) return !0;
              } else if (container !== parentNode) return !0;
              path = parentPath;
            }
            return !1;
          }(member)) return;
          const endPath = member.find(({node: node, parent: parent, parentPath: parentPath}) => parentPath.isOptionalMemberExpression() ? parent.optional || parent.object !== node : !parentPath.isOptionalCallExpression() || (node !== member.node && parent.optional || parent.callee !== node)), rootParentPath = endPath.parentPath;
          if (rootParentPath.isUpdateExpression({
            argument: node
          }) || rootParentPath.isAssignmentExpression({
            left: node
          })) throw member.buildCodeFrameError("can't handle assignment");
          const isDeleteOperation = rootParentPath.isUnaryExpression({
            operator: "delete"
          });
          if (isDeleteOperation && endPath.isOptionalMemberExpression() && endPath.get("property").isPrivateName()) throw member.buildCodeFrameError("can't delete a private class element");
          let startingOptional = member;
          for (;;) if (startingOptional.isOptionalMemberExpression()) {
            if (startingOptional.node.optional) break;
            startingOptional = startingOptional.get("object");
          } else {
            if (!startingOptional.isOptionalCallExpression()) throw new Error("Internal error: unexpected " + startingOptional.node.type);
            if (startingOptional.node.optional) break;
            startingOptional = startingOptional.get("callee");
          }
          const {scope: scope} = member, startingProp = startingOptional.isOptionalMemberExpression() ? "object" : "callee", startingNode = startingOptional.node[startingProp], baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode), baseRef = null != baseNeedsMemoised ? baseNeedsMemoised : startingNode, parentIsOptionalCall = parentPath.isOptionalCallExpression({
            callee: node
          }), parentIsCall = parentPath.isCallExpression({
            callee: node
          });
          startingOptional.replaceWith(toNonOptional(startingOptional, baseRef)), parentIsOptionalCall ? parent.optional ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.replaceWith(this.call(member, parent.arguments)) : parentIsCall ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member));
          let context, regular = member.node;
          for (let current = member; current !== endPath; ) {
            const {parentPath: parentPath} = current;
            if (parentPath === endPath && parentIsOptionalCall && parent.optional) {
              regular = parentPath.node;
              break;
            }
            regular = toNonOptional(parentPath, regular), current = parentPath;
          }
          const endParentPath = endPath.parentPath;
          if (t.isMemberExpression(regular) && endParentPath.isOptionalCallExpression({
            callee: endPath.node,
            optional: !0
          })) {
            const {object: object} = regular;
            context = member.scope.maybeGenerateMemoised(object), context && (regular.object = t.assignmentExpression("=", context, object));
          }
          let replacementPath = endPath;
          if (isDeleteOperation && (replacementPath = endParentPath, regular = endParentPath.node), 
          replacementPath.replaceWith(t.conditionalExpression(t.logicalExpression("||", t.binaryExpression("===", baseNeedsMemoised ? t.assignmentExpression("=", t.cloneNode(baseRef), t.cloneNode(startingNode)) : t.cloneNode(baseRef), t.nullLiteral()), t.binaryExpression("===", t.cloneNode(baseRef), scope.buildUndefinedNode())), isDeleteOperation ? t.booleanLiteral(!0) : scope.buildUndefinedNode(), regular)), 
          context) {
            const endParent = endParentPath.node;
            endParentPath.replaceWith(t.optionalCallExpression(t.optionalMemberExpression(endParent.callee, t.identifier("call"), !1, !0), [ t.cloneNode(context), ...endParent.arguments ], !1));
          }
        } else if (parentPath.isUpdateExpression({
          argument: node
        })) {
          if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
          const {operator: operator, prefix: prefix} = parent;
          this.memoise(member, 2);
          const value = t.binaryExpression(operator[0], t.unaryExpression("+", this.get(member)), t.numericLiteral(1));
          if (prefix) parentPath.replaceWith(this.set(member, value)); else {
            const {scope: scope} = member, ref = scope.generateUidIdentifierBasedOnNode(node);
            scope.push({
              id: ref
            }), value.left = t.assignmentExpression("=", t.cloneNode(ref), value.left), parentPath.replaceWith(t.sequenceExpression([ this.set(member, value), t.cloneNode(ref) ]));
          }
        } else {
          if (parentPath.isAssignmentExpression({
            left: node
          })) {
            if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
            const {operator: operator, right: right} = parent;
            let value = right;
            return "=" !== operator && (this.memoise(member, 2), value = t.binaryExpression(operator.slice(0, -1), this.get(member), value)), 
            void parentPath.replaceWith(this.set(member, value));
          }
          parentPath.isCallExpression({
            callee: node
          }) ? parentPath.replaceWith(this.call(member, parent.arguments)) : parentPath.isOptionalCallExpression({
            callee: node
          }) ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.isForXStatement({
            left: node
          }) || parentPath.isObjectProperty({
            value: node
          }) && parentPath.parentPath.isObjectPattern() || parentPath.isAssignmentPattern({
            left: node
          }) && parentPath.parentPath.isObjectProperty({
            value: parent
          }) && parentPath.parentPath.parentPath.isObjectPattern() || parentPath.isArrayPattern() || parentPath.isAssignmentPattern({
            left: node
          }) && parentPath.parentPath.isArrayPattern() || parentPath.isRestElement() ? member.replaceWith(this.destructureSet(member)) : member.replaceWith(this.get(member));
        }
      }
    };
  },
  39: function(module, exports) {
    module.exports = function(value, other) {
      return value === other || value != value && other != other;
    };
  },
  4: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.merge = function(a, b) {
      const {placeholderWhitelist: placeholderWhitelist = a.placeholderWhitelist, placeholderPattern: placeholderPattern = a.placeholderPattern, preserveComments: preserveComments = a.preserveComments, syntacticPlaceholders: syntacticPlaceholders = a.syntacticPlaceholders} = b;
      return {
        parser: Object.assign({}, a.parser, b.parser),
        placeholderWhitelist: placeholderWhitelist,
        placeholderPattern: placeholderPattern,
        preserveComments: preserveComments,
        syntacticPlaceholders: syntacticPlaceholders
      };
    }, exports.validate = function(opts) {
      if (null != opts && "object" != typeof opts) throw new Error("Unknown template options.");
      const _ref = opts || {}, {placeholderWhitelist: placeholderWhitelist, placeholderPattern: placeholderPattern, preserveComments: preserveComments, syntacticPlaceholders: syntacticPlaceholders} = _ref, parser = function(source, excluded) {
        if (null == source) return {};
        var key, i, target = {}, sourceKeys = Object.keys(source);
        for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
        return target;
      }(_ref, [ "placeholderWhitelist", "placeholderPattern", "preserveComments", "syntacticPlaceholders" ]);
      if (null != placeholderWhitelist && !(placeholderWhitelist instanceof Set)) throw new Error("'.placeholderWhitelist' must be a Set, null, or undefined");
      if (null != placeholderPattern && !(placeholderPattern instanceof RegExp) && !1 !== placeholderPattern) throw new Error("'.placeholderPattern' must be a RegExp, false, null, or undefined");
      if (null != preserveComments && "boolean" != typeof preserveComments) throw new Error("'.preserveComments' must be a boolean, null, or undefined");
      if (null != syntacticPlaceholders && "boolean" != typeof syntacticPlaceholders) throw new Error("'.syntacticPlaceholders' must be a boolean, null, or undefined");
      if (!0 === syntacticPlaceholders && (null != placeholderWhitelist || null != placeholderPattern)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
      return {
        parser: parser,
        placeholderWhitelist: placeholderWhitelist || void 0,
        placeholderPattern: null == placeholderPattern ? void 0 : placeholderPattern,
        preserveComments: null == preserveComments ? void 0 : preserveComments,
        syntacticPlaceholders: null == syntacticPlaceholders ? void 0 : syntacticPlaceholders
      };
    }, exports.normalizeReplacements = function(replacements) {
      if (Array.isArray(replacements)) return replacements.reduce((acc, replacement, i) => (acc["$" + i] = replacement, 
      acc), {});
      if ("object" == typeof replacements || null == replacements) return replacements || void 0;
      throw new Error("Template replacements must be an array, object, null, or undefined");
    };
  },
  44: function(module, exports) {
    module.exports = function(value) {
      return "number" == typeof value && value > -1 && value % 1 == 0 && value <= 9007199254740991;
    };
  },
  45: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(exportDeclaration) {
      if (!exportDeclaration.isExportDeclaration()) throw new Error("Only export declarations can be splitted.");
      const isDefault = exportDeclaration.isExportDefaultDeclaration(), declaration = exportDeclaration.get("declaration"), isClassDeclaration = declaration.isClassDeclaration();
      if (isDefault) {
        const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration, scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
        let id = declaration.node.id, needBindingRegistration = !1;
        id || (needBindingRegistration = !0, id = scope.generateUidIdentifier("default"), 
        (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) && (declaration.node.id = t.cloneNode(id)));
        const updatedDeclaration = standaloneDeclaration ? declaration : t.variableDeclaration("var", [ t.variableDeclarator(t.cloneNode(id), declaration.node) ]), updatedExportDeclaration = t.exportNamedDeclaration(null, [ t.exportSpecifier(t.cloneNode(id), t.identifier("default")) ]);
        return exportDeclaration.insertAfter(updatedExportDeclaration), exportDeclaration.replaceWith(updatedDeclaration), 
        needBindingRegistration && scope.registerDeclaration(exportDeclaration), exportDeclaration;
      }
      if (exportDeclaration.get("specifiers").length > 0) throw new Error("It doesn't make sense to split exported specifiers.");
      const bindingIdentifiers = declaration.getOuterBindingIdentifiers(), specifiers = Object.keys(bindingIdentifiers).map(name => t.exportSpecifier(t.identifier(name), t.identifier(name))), aliasDeclar = t.exportNamedDeclaration(null, specifiers);
      return exportDeclaration.insertAfter(aliasDeclar), exportDeclaration.replaceWith(declaration.node), 
      exportDeclaration;
    };
    var t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  46: function(module, exports) {
    module.exports = require("../lib/traverse");
  },
  47: function(module, exports) {
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    module.exports = function(value, length) {
      var type = typeof value;
      return !!(length = null == length ? 9007199254740991 : length) && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    };
  },
  5: function(module, exports, __webpack_require__) {
    var freeGlobal = __webpack_require__(13), freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  },
  50: function(module, exports, __webpack_require__) {
    var isFunction = __webpack_require__(12), isLength = __webpack_require__(44);
    module.exports = function(value) {
      return null != value && isLength(value.length) && !isFunction(value);
    };
  },
  524: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _helperHoistVariables = (obj = __webpack_require__(525)) && obj.__esModule ? obj : {
      default: obj
    }, _core = __webpack_require__(2), _utils = __webpack_require__(121), _helperModuleTransforms = __webpack_require__(93);
    const buildTemplate = (0, _core.template)('\n  SYSTEM_REGISTER(MODULE_NAME, SOURCES, function (EXPORT_IDENTIFIER, CONTEXT_IDENTIFIER) {\n    "use strict";\n    BEFORE_BODY;\n    return {\n      setters: SETTERS,\n      execute: function () {\n        BODY;\n      }\n    };\n  });\n'), buildExportAll = (0, 
    _core.template)('\n  for (var KEY in TARGET) {\n    if (KEY !== "default" && KEY !== "__esModule") EXPORT_OBJ[KEY] = TARGET[KEY];\n  }\n');
    function constructExportCall(path, exportIdent, exportNames, exportValues, exportStarTarget) {
      const statements = [];
      if (1 === exportNames.length) statements.push(_core.types.expressionStatement(_core.types.callExpression(exportIdent, [ _core.types.stringLiteral(exportNames[0]), exportValues[0] ]))); else if (exportStarTarget) {
        const exportObj = path.scope.generateUid("exportObj");
        statements.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(_core.types.identifier(exportObj), _core.types.objectExpression([])) ])), 
        statements.push(buildExportAll({
          KEY: path.scope.generateUidIdentifier("key"),
          EXPORT_OBJ: _core.types.identifier(exportObj),
          TARGET: exportStarTarget
        }));
        for (let i = 0; i < exportNames.length; i++) {
          const exportName = exportNames[i], exportValue = exportValues[i];
          statements.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.memberExpression(_core.types.identifier(exportObj), _core.types.identifier(exportName)), exportValue)));
        }
        statements.push(_core.types.expressionStatement(_core.types.callExpression(exportIdent, [ _core.types.identifier(exportObj) ])));
      } else {
        const objectProperties = [];
        for (let i = 0; i < exportNames.length; i++) {
          const exportName = exportNames[i], exportValue = exportValues[i];
          objectProperties.push(_core.types.objectProperty(_core.types.identifier(exportName), exportValue));
        }
        statements.push(_core.types.expressionStatement(_core.types.callExpression(exportIdent, [ _core.types.objectExpression(objectProperties) ])));
      }
      return statements;
    }
    var _default = (0, _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {systemGlobal: systemGlobal = "System", allowTopLevelThis: allowTopLevelThis = !1} = options, IGNORE_REASSIGNMENT_SYMBOL = Symbol(), reassignmentVisitor = {
        "AssignmentExpression|UpdateExpression"(path) {
          if (path.node[IGNORE_REASSIGNMENT_SYMBOL]) return;
          path.node[IGNORE_REASSIGNMENT_SYMBOL] = !0;
          const arg = path.get(path.isAssignmentExpression() ? "left" : "argument");
          if (arg.isObjectPattern() || arg.isArrayPattern()) {
            const exprs = [ path.node ];
            for (const name of Object.keys(arg.getBindingIdentifiers())) {
              if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;
              const exportedNames = this.exports[name];
              if (!exportedNames) return;
              for (const exportedName of exportedNames) exprs.push(this.buildCall(exportedName, _core.types.identifier(name)).expression);
            }
            return void path.replaceWith(_core.types.sequenceExpression(exprs));
          }
          if (!arg.isIdentifier()) return;
          const name = arg.node.name;
          if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;
          const exportedNames = this.exports[name];
          if (!exportedNames) return;
          let node = path.node;
          const isPostUpdateExpression = path.isUpdateExpression({
            prefix: !1
          });
          isPostUpdateExpression && (node = _core.types.binaryExpression(node.operator[0], _core.types.unaryExpression("+", _core.types.cloneNode(node.argument)), _core.types.numericLiteral(1)));
          for (const exportedName of exportedNames) node = this.buildCall(exportedName, node).expression;
          isPostUpdateExpression && (node = _core.types.sequenceExpression([ node, path.node ])), 
          path.replaceWith(node);
        }
      };
      return {
        name: "transform-modules-systemjs",
        pre() {
          this.file.set("@babel/plugin-transform-modules-*", "systemjs");
        },
        visitor: {
          CallExpression(path, state) {
            _core.types.isImport(path.node.callee) && (this.file.has("@babel/plugin-proposal-dynamic-import") || console.warn("WARNING: Dynamic import() transformation must be enabled using the\n         @babel/plugin-proposal-dynamic-import plugin. Babel 8 will\n         no longer transform import() without using that plugin.\n"), 
            path.replaceWith(_core.types.callExpression(_core.types.memberExpression(_core.types.identifier(state.contextIdent), _core.types.identifier("import")), [ (0, 
            _utils.getImportSource)(_core.types, path.node) ])));
          },
          MetaProperty(path, state) {
            "import" === path.node.meta.name && "meta" === path.node.property.name && path.replaceWith(_core.types.memberExpression(_core.types.identifier(state.contextIdent), _core.types.identifier("meta")));
          },
          ReferencedIdentifier(path, state) {
            "__moduleName" !== path.node.name || path.scope.hasBinding("__moduleName") || path.replaceWith(_core.types.memberExpression(_core.types.identifier(state.contextIdent), _core.types.identifier("id")));
          },
          Program: {
            enter(path, state) {
              state.contextIdent = path.scope.generateUid("context"), allowTopLevelThis || (0, 
              _helperModuleTransforms.rewriteThis)(path);
            },
            exit(path, state) {
              const scope = path.scope, exportIdent = scope.generateUid("export"), contextIdent = state.contextIdent, exportMap = Object.create(null), modules = [];
              let beforeBody = [];
              const setters = [], sources = [], variableIds = [], removedPaths = [];
              function addExportName(key, val) {
                exportMap[key] = exportMap[key] || [], exportMap[key].push(val);
              }
              function pushModule(source, key, specifiers) {
                let module;
                modules.forEach((function(m) {
                  m.key === source && (module = m);
                })), module || modules.push(module = {
                  key: source,
                  imports: [],
                  exports: []
                }), module[key] = module[key].concat(specifiers);
              }
              function buildExportCall(name, val) {
                return _core.types.expressionStatement(_core.types.callExpression(_core.types.identifier(exportIdent), [ _core.types.stringLiteral(name), val ]));
              }
              const exportNames = [], exportValues = [], body = path.get("body");
              for (const path of body) if (path.isFunctionDeclaration()) beforeBody.push(path.node), 
              removedPaths.push(path); else if (path.isClassDeclaration()) variableIds.push(_core.types.cloneNode(path.node.id)), 
              path.replaceWith(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.cloneNode(path.node.id), _core.types.toExpression(path.node)))); else if (path.isImportDeclaration()) {
                pushModule(path.node.source.value, "imports", path.node.specifiers);
                for (const name of Object.keys(path.getBindingIdentifiers())) scope.removeBinding(name), 
                variableIds.push(_core.types.identifier(name));
                path.remove();
              } else if (path.isExportAllDeclaration()) pushModule(path.node.source.value, "exports", path.node), 
              path.remove(); else if (path.isExportDefaultDeclaration()) {
                const declar = path.get("declaration"), id = declar.node.id;
                declar.isClassDeclaration() ? id ? (exportNames.push("default"), exportValues.push(scope.buildUndefinedNode()), 
                variableIds.push(_core.types.cloneNode(id)), addExportName(id.name, "default"), 
                path.replaceWith(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.cloneNode(id), _core.types.toExpression(declar.node))))) : (exportNames.push("default"), 
                exportValues.push(_core.types.toExpression(declar.node)), removedPaths.push(path)) : declar.isFunctionDeclaration() ? (id ? (beforeBody.push(declar.node), 
                exportNames.push("default"), exportValues.push(_core.types.cloneNode(id)), addExportName(id.name, "default")) : (exportNames.push("default"), 
                exportValues.push(_core.types.toExpression(declar.node))), removedPaths.push(path)) : path.replaceWith(buildExportCall("default", declar.node));
              } else if (path.isExportNamedDeclaration()) {
                const declar = path.get("declaration");
                if (declar.node) if (path.replaceWith(declar), path.isFunction()) {
                  const node = declar.node, name = node.id.name;
                  addExportName(name, name), beforeBody.push(node), exportNames.push(name), exportValues.push(_core.types.cloneNode(node.id)), 
                  removedPaths.push(path);
                } else if (path.isClass()) {
                  const name = declar.node.id.name;
                  exportNames.push(name), exportValues.push(scope.buildUndefinedNode()), variableIds.push(_core.types.cloneNode(declar.node.id)), 
                  path.replaceWith(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.cloneNode(declar.node.id), _core.types.toExpression(declar.node)))), 
                  addExportName(name, name);
                } else for (const name of Object.keys(declar.getBindingIdentifiers())) addExportName(name, name); else {
                  const specifiers = path.node.specifiers;
                  if (null == specifiers ? void 0 : specifiers.length) if (path.node.source) pushModule(path.node.source.value, "exports", specifiers), 
                  path.remove(); else {
                    const nodes = [];
                    for (const specifier of specifiers) {
                      const binding = scope.getBinding(specifier.local.name);
                      binding && _core.types.isFunctionDeclaration(binding.path.node) ? (exportNames.push(specifier.exported.name), 
                      exportValues.push(_core.types.cloneNode(specifier.local))) : binding || nodes.push(buildExportCall(specifier.exported.name, specifier.local)), 
                      addExportName(specifier.local.name, specifier.exported.name);
                    }
                    path.replaceWithMultiple(nodes);
                  } else path.remove();
                }
              }
              modules.forEach((function(specifiers) {
                let setterBody = [];
                const target = scope.generateUid(specifiers.key);
                for (let specifier of specifiers.imports) _core.types.isImportNamespaceSpecifier(specifier) ? setterBody.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", specifier.local, _core.types.identifier(target)))) : _core.types.isImportDefaultSpecifier(specifier) && (specifier = _core.types.importSpecifier(specifier.local, _core.types.identifier("default"))), 
                _core.types.isImportSpecifier(specifier) && setterBody.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", specifier.local, _core.types.memberExpression(_core.types.identifier(target), specifier.imported))));
                if (specifiers.exports.length) {
                  const exportNames = [], exportValues = [];
                  let hasExportStar = !1;
                  for (const node of specifiers.exports) _core.types.isExportAllDeclaration(node) ? hasExportStar = !0 : _core.types.isExportSpecifier(node) && (exportNames.push(node.exported.name), 
                  exportValues.push(_core.types.memberExpression(_core.types.identifier(target), node.local)));
                  setterBody = setterBody.concat(constructExportCall(path, _core.types.identifier(exportIdent), exportNames, exportValues, hasExportStar ? _core.types.identifier(target) : null));
                }
                sources.push(_core.types.stringLiteral(specifiers.key)), setters.push(_core.types.functionExpression(null, [ _core.types.identifier(target) ], _core.types.blockStatement(setterBody)));
              }));
              let moduleName = (0, _helperModuleTransforms.getModuleName)(this.file.opts, options);
              moduleName && (moduleName = _core.types.stringLiteral(moduleName)), (0, _helperHoistVariables.default)(path, (id, name, hasInit) => {
                variableIds.push(id), hasInit || (exportNames.push(name), exportValues.push(scope.buildUndefinedNode()));
              }, null), variableIds.length && beforeBody.unshift(_core.types.variableDeclaration("var", variableIds.map(id => _core.types.variableDeclarator(id)))), 
              exportNames.length && (beforeBody = beforeBody.concat(constructExportCall(path, _core.types.identifier(exportIdent), exportNames, exportValues, null))), 
              path.traverse(reassignmentVisitor, {
                exports: exportMap,
                buildCall: buildExportCall,
                scope: scope
              });
              for (const path of removedPaths) path.remove();
              path.node.body = [ buildTemplate({
                SYSTEM_REGISTER: _core.types.memberExpression(_core.types.identifier(systemGlobal), _core.types.identifier("register")),
                BEFORE_BODY: beforeBody,
                MODULE_NAME: moduleName,
                SETTERS: _core.types.arrayExpression(setters),
                SOURCES: _core.types.arrayExpression(sources),
                BODY: path.node.body,
                EXPORT_IDENTIFIER: _core.types.identifier(exportIdent),
                CONTEXT_IDENTIFIER: _core.types.identifier(contextIdent)
              }) ];
            }
          }
        }
      };
    });
    exports.default = _default;
  },
  525: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path, emit, kind = "var") {
      path.traverse(visitor, {
        kind: kind,
        emit: emit
      });
    };
    var t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const visitor = {
      Scope(path, state) {
        "let" === state.kind && path.skip();
      },
      Function(path) {
        path.skip();
      },
      VariableDeclaration(path, state) {
        if (state.kind && path.node.kind !== state.kind) return;
        const nodes = [], declarations = path.get("declarations");
        let firstId;
        for (const declar of declarations) {
          firstId = declar.node.id, declar.node.init && nodes.push(t.expressionStatement(t.assignmentExpression("=", declar.node.id, declar.node.init)));
          for (const name of Object.keys(declar.getBindingIdentifiers())) state.emit(t.identifier(name), name, null !== declar.node.init);
        }
        path.parentPath.isFor({
          left: path.node
        }) ? path.replaceWith(firstId) : path.replaceWithMultiple(nodes);
      }
    };
  },
  54: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.addDefault = function(path, importedSource, opts) {
      return new _importInjector.default(path).addDefault(importedSource, opts);
    }, exports.addNamed = function(path, name, importedSource, opts) {
      return new _importInjector.default(path).addNamed(name, importedSource, opts);
    }, exports.addNamespace = function(path, importedSource, opts) {
      return new _importInjector.default(path).addNamespace(importedSource, opts);
    }, exports.addSideEffect = function(path, importedSource, opts) {
      return new _importInjector.default(path).addSideEffect(importedSource, opts);
    }, Object.defineProperty(exports, "ImportInjector", {
      enumerable: !0,
      get: function() {
        return _importInjector.default;
      }
    }), Object.defineProperty(exports, "isModule", {
      enumerable: !0,
      get: function() {
        return _isModule.default;
      }
    });
    var _importInjector = _interopRequireDefault(__webpack_require__(55)), _isModule = _interopRequireDefault(__webpack_require__(33));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
  },
  55: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _assert = _interopRequireDefault(__webpack_require__(10)), t = function(obj) {
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
    }(__webpack_require__(0)), _importBuilder = _interopRequireDefault(__webpack_require__(56)), _isModule = _interopRequireDefault(__webpack_require__(33));
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
    exports.default = class {
      constructor(path, importedSource, opts) {
        this._defaultOpts = {
          importedSource: null,
          importedType: "commonjs",
          importedInterop: "babel",
          importingInterop: "babel",
          ensureLiveReference: !1,
          ensureNoContext: !1
        };
        const programPath = path.find(p => p.isProgram());
        this._programPath = programPath, this._programScope = programPath.scope, this._hub = programPath.hub, 
        this._defaultOpts = this._applyDefaults(importedSource, opts, !0);
      }
      addDefault(importedSourceIn, opts) {
        return this.addNamed("default", importedSourceIn, opts);
      }
      addNamed(importName, importedSourceIn, opts) {
        return (0, _assert.default)("string" == typeof importName), this._generateImport(this._applyDefaults(importedSourceIn, opts), importName);
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
          importedSource: importedSource
        }), optsList.push(opts)) : ((0, _assert.default)(!opts, "Unexpected secondary arguments."), 
        optsList.push(importedSource));
        const newOpts = Object.assign({}, this._defaultOpts);
        for (const opts of optsList) opts && (Object.keys(newOpts).forEach(key => {
          void 0 !== opts[key] && (newOpts[key] = opts[key]);
        }), isInit || (void 0 !== opts.nameHint && (newOpts.nameHint = opts.nameHint), void 0 !== opts.blockHoist && (newOpts.blockHoist = opts.blockHoist)));
        return newOpts;
      }
      _generateImport(opts, importName) {
        const isDefault = "default" === importName, isNamed = !!importName && !isDefault, isNamespace = null === importName, {importedSource: importedSource, importedType: importedType, importedInterop: importedInterop, importingInterop: importingInterop, ensureLiveReference: ensureLiveReference, ensureNoContext: ensureNoContext, nameHint: nameHint, blockHoist: blockHoist} = opts;
        let name = nameHint || importName;
        const isMod = (0, _isModule.default)(this._programPath), isModuleForNode = isMod && "node" === importingInterop, isModuleForBabel = isMod && "babel" === importingInterop, builder = new _importBuilder.default(importedSource, this._programScope, this._hub);
        if ("es6" === importedType) {
          if (!isModuleForNode && !isModuleForBabel) throw new Error("Cannot import an ES6 module from CommonJS");
          builder.import(), isNamespace ? builder.namespace(nameHint || importedSource) : (isDefault || isNamed) && builder.named(name, importName);
        } else {
          if ("commonjs" !== importedType) throw new Error(`Unexpected interopType "${importedType}"`);
          if ("babel" === importedInterop) if (isModuleForNode) {
            name = "default" !== name ? name : importedSource;
            const es6Default = importedSource + "$es6Default";
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
        const {statements: statements, resultName: resultName} = builder.done();
        return this._insertStatements(statements, blockHoist), (isDefault || isNamed) && ensureNoContext && "Identifier" !== resultName.type ? t.sequenceExpression([ t.numericLiteral(0), resultName ]) : resultName;
      }
      _insertStatements(statements, blockHoist = 3) {
        statements.forEach(node => {
          node._blockHoist = blockHoist;
        });
        const targetPath = this._programPath.get("body").find(p => {
          const val = p.node._blockHoist;
          return Number.isFinite(val) && val < 4;
        });
        targetPath ? targetPath.insertBefore(statements) : this._programPath.unshiftContainer("body", statements);
      }
    };
  },
  56: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _assert = (obj = __webpack_require__(10)) && obj.__esModule ? obj : {
      default: obj
    }, t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    exports.default = class {
      constructor(importedSource, scope, hub) {
        this._statements = [], this._resultName = null, this._scope = null, this._hub = null, 
        this._scope = scope, this._hub = hub, this._importedSource = importedSource;
      }
      done() {
        return {
          statements: this._statements,
          resultName: this._resultName
        };
      }
      import() {
        return this._statements.push(t.importDeclaration([], t.stringLiteral(this._importedSource))), 
        this;
      }
      require() {
        return this._statements.push(t.expressionStatement(t.callExpression(t.identifier("require"), [ t.stringLiteral(this._importedSource) ]))), 
        this;
      }
      namespace(name = "namespace") {
        name = this._scope.generateUidIdentifier(name);
        const statement = this._statements[this._statements.length - 1];
        return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
        statement.specifiers = [ t.importNamespaceSpecifier(name) ], this._resultName = t.cloneNode(name), 
        this;
      }
      default(name) {
        name = this._scope.generateUidIdentifier(name);
        const statement = this._statements[this._statements.length - 1];
        return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
        statement.specifiers = [ t.importDefaultSpecifier(name) ], this._resultName = t.cloneNode(name), 
        this;
      }
      named(name, importName) {
        if ("default" === importName) return this.default(name);
        name = this._scope.generateUidIdentifier(name);
        const statement = this._statements[this._statements.length - 1];
        return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
        statement.specifiers = [ t.importSpecifier(name, t.identifier(importName)) ], this._resultName = t.cloneNode(name), 
        this;
      }
      var(name) {
        name = this._scope.generateUidIdentifier(name);
        let statement = this._statements[this._statements.length - 1];
        return "ExpressionStatement" !== statement.type && ((0, _assert.default)(this._resultName), 
        statement = t.expressionStatement(this._resultName), this._statements.push(statement)), 
        this._statements[this._statements.length - 1] = t.variableDeclaration("var", [ t.variableDeclarator(name, statement.expression) ]), 
        this._resultName = t.cloneNode(name), this;
      }
      defaultInterop() {
        return this._interop(this._hub.addHelper("interopRequireDefault"));
      }
      wildcardInterop() {
        return this._interop(this._hub.addHelper("interopRequireWildcard"));
      }
      _interop(callee) {
        const statement = this._statements[this._statements.length - 1];
        return "ExpressionStatement" === statement.type ? statement.expression = t.callExpression(callee, [ statement.expression ]) : "VariableDeclaration" === statement.type ? ((0, 
        _assert.default)(1 === statement.declarations.length), statement.declarations[0].init = t.callExpression(callee, [ statement.declarations[0].init ])) : _assert.default.fail("Unexpected type."), 
        this;
      }
      prop(name) {
        const statement = this._statements[this._statements.length - 1];
        return "ExpressionStatement" === statement.type ? statement.expression = t.memberExpression(statement.expression, t.identifier(name)) : "VariableDeclaration" === statement.type ? ((0, 
        _assert.default)(1 === statement.declarations.length), statement.declarations[0].init = t.memberExpression(statement.declarations[0].init, t.identifier(name))) : _assert.default.fail("Unexpected type:" + statement.type), 
        this;
      }
      read(name) {
        this._resultName = t.memberExpression(this._resultName, t.identifier(name));
      }
    };
  },
  6: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(5).Symbol;
    module.exports = Symbol;
  },
  67: function(module, exports, __webpack_require__) {
    var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(17);
    module.exports = function(value) {
      return "symbol" == typeof value || isObjectLike(value) && "[object Symbol]" == baseGetTag(value);
    };
  },
  7: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), getRawTag = __webpack_require__(15), objectToString = __webpack_require__(16), symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    module.exports = function(value) {
      return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    };
  },
  73: function(module, exports, __webpack_require__) {
    var eq = __webpack_require__(39), isArrayLike = __webpack_require__(50), isIndex = __webpack_require__(47), isObject = __webpack_require__(3);
    module.exports = function(value, index, object) {
      if (!isObject(object)) return !1;
      var type = typeof index;
      return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value);
    };
  },
  8: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(formatter, code, opts) {
      const {placeholderWhitelist: placeholderWhitelist, placeholderPattern: placeholderPattern, preserveComments: preserveComments, syntacticPlaceholders: syntacticPlaceholders} = opts, ast = function(code, parserOpts, syntacticPlaceholders) {
        const plugins = (parserOpts.plugins || []).slice();
        !1 !== syntacticPlaceholders && plugins.push("placeholders");
        parserOpts = Object.assign({
          allowReturnOutsideFunction: !0,
          allowSuperOutsideMethod: !0,
          sourceType: "module"
        }, parserOpts, {
          plugins: plugins
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
      t.removePropertiesDeep(ast, {
        preserveComments: preserveComments
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
      return t.traverse(ast, placeholderVisitorHandler, {
        syntactic: syntactic,
        legacy: legacy,
        isLegacyRef: isLegacyRef,
        placeholderWhitelist: placeholderWhitelist,
        placeholderPattern: placeholderPattern,
        syntacticPlaceholders: syntacticPlaceholders
      }), Object.assign({
        ast: ast
      }, isLegacyRef.value ? legacy : syntactic);
    };
    var t = function(obj) {
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
    }(__webpack_require__(0)), _parser = __webpack_require__(22), _codeFrame = __webpack_require__(21);
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const PATTERN = /^[_$A-Z0-9]+$/;
    function placeholderVisitorHandler(node, ancestors, state) {
      var _state$placeholderWhi;
      let name;
      if (t.isPlaceholder(node)) {
        if (!1 === state.syntacticPlaceholders) throw new Error("%%foo%%-style placeholders can't be used when '.syntacticPlaceholders' is false.");
        name = node.name.name, state.isLegacyRef.value = !1;
      } else {
        if (!1 === state.isLegacyRef.value || state.syntacticPlaceholders) return;
        if (t.isIdentifier(node) || t.isJSXIdentifier(node)) name = node.name, state.isLegacyRef.value = !0; else {
          if (!t.isStringLiteral(node)) return;
          name = node.value, state.isLegacyRef.value = !0;
        }
      }
      if (!state.isLegacyRef.value && (null != state.placeholderPattern || null != state.placeholderWhitelist)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
      if (state.isLegacyRef.value && (!1 === state.placeholderPattern || !(state.placeholderPattern || PATTERN).test(name)) && !(null == (_state$placeholderWhi = state.placeholderWhitelist) ? void 0 : _state$placeholderWhi.has(name))) return;
      ancestors = ancestors.slice();
      const {node: parent, key: key} = ancestors[ancestors.length - 1];
      let type;
      t.isStringLiteral(node) || t.isPlaceholder(node, {
        expectedNode: "StringLiteral"
      }) ? type = "string" : t.isNewExpression(parent) && "arguments" === key || t.isCallExpression(parent) && "arguments" === key || t.isFunction(parent) && "params" === key ? type = "param" : t.isExpressionStatement(parent) && !t.isPlaceholder(node) ? (type = "statement", 
      ancestors = ancestors.slice(0, -1)) : type = t.isStatement(node) && t.isPlaceholder(node) ? "statement" : "other";
      const {placeholders: placeholders, placeholderNames: placeholderNames} = state.isLegacyRef.value ? state.legacy : state.syntactic;
      placeholders.push({
        name: name,
        type: type,
        resolve: ast => function(ast, ancestors) {
          let parent = ast;
          for (let i = 0; i < ancestors.length - 1; i++) {
            const {key: key, index: index} = ancestors[i];
            parent = void 0 === index ? parent[key] : parent[key][index];
          }
          const {key: key, index: index} = ancestors[ancestors.length - 1];
          return {
            parent: parent,
            key: key,
            index: index
          };
        }(ast, ancestors),
        isDuplicate: placeholderNames.has(name)
      }), placeholderNames.add(name);
    }
  },
  84: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path, bindingNames) {
      path.traverse(simpleAssignmentVisitor, {
        scope: path.scope,
        bindingNames: bindingNames,
        seen: new WeakSet
      });
    };
    var t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const simpleAssignmentVisitor = {
      UpdateExpression: {
        exit(path) {
          const {scope: scope, bindingNames: bindingNames} = this, arg = path.get("argument");
          if (!arg.isIdentifier()) return;
          const localName = arg.node.name;
          if (bindingNames.has(localName) && scope.getBinding(localName) === path.scope.getBinding(localName)) if (path.parentPath.isExpressionStatement() && !path.isCompletionRecord()) {
            const operator = "++" == path.node.operator ? "+=" : "-=";
            path.replaceWith(t.assignmentExpression(operator, arg.node, t.numericLiteral(1)));
          } else if (path.node.prefix) path.replaceWith(t.assignmentExpression("=", t.identifier(localName), t.binaryExpression(path.node.operator[0], t.unaryExpression("+", arg.node), t.numericLiteral(1)))); else {
            const old = path.scope.generateUidIdentifierBasedOnNode(arg.node, "old"), varName = old.name;
            path.scope.push({
              id: old
            });
            const binary = t.binaryExpression(path.node.operator[0], t.identifier(varName), t.numericLiteral(1));
            path.replaceWith(t.sequenceExpression([ t.assignmentExpression("=", t.identifier(varName), t.unaryExpression("+", arg.node)), t.assignmentExpression("=", t.cloneNode(arg.node), binary), t.identifier(varName) ]));
          }
        }
      },
      AssignmentExpression: {
        exit(path) {
          const {scope: scope, seen: seen, bindingNames: bindingNames} = this;
          if ("=" === path.node.operator) return;
          if (seen.has(path.node)) return;
          seen.add(path.node);
          const left = path.get("left");
          if (!left.isIdentifier()) return;
          const localName = left.node.name;
          bindingNames.has(localName) && scope.getBinding(localName) === path.scope.getBinding(localName) && (path.node.right = t.binaryExpression(path.node.operator.slice(0, -1), t.cloneNode(path.node.left), path.node.right), 
          path.node.operator = "=");
        }
      }
    };
  },
  85: function(module, exports) {
    module.exports = require("path");
  },
  9: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(metadata, replacements) {
      const ast = t.cloneNode(metadata.ast);
      replacements && (metadata.placeholders.forEach(placeholder => {
        if (!Object.prototype.hasOwnProperty.call(replacements, placeholder.name)) {
          const placeholderName = placeholder.name;
          throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a\n            placeholder you may want to consider passing one of the following options to @babel/template:\n            - { placeholderPattern: false, placeholderWhitelist: new Set(['${placeholderName}'])}\n            - { placeholderPattern: /^${placeholderName}$/ }`);
        }
      }), Object.keys(replacements).forEach(key => {
        if (!metadata.placeholderNames.has(key)) throw new Error(`Unknown substitution "${key}" given`);
      }));
      return metadata.placeholders.slice().reverse().forEach(placeholder => {
        try {
          !function(placeholder, ast, replacement) {
            placeholder.isDuplicate && (Array.isArray(replacement) ? replacement = replacement.map(node => t.cloneNode(node)) : "object" == typeof replacement && (replacement = t.cloneNode(replacement)));
            const {parent: parent, key: key, index: index} = placeholder.resolve(ast);
            if ("string" === placeholder.type) {
              if ("string" == typeof replacement && (replacement = t.stringLiteral(replacement)), 
              !replacement || !t.isStringLiteral(replacement)) throw new Error("Expected string substitution");
            } else if ("statement" === placeholder.type) void 0 === index ? replacement ? Array.isArray(replacement) ? replacement = t.blockStatement(replacement) : "string" == typeof replacement ? replacement = t.expressionStatement(t.identifier(replacement)) : t.isStatement(replacement) || (replacement = t.expressionStatement(replacement)) : replacement = t.emptyStatement() : replacement && !Array.isArray(replacement) && ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
            t.isStatement(replacement) || (replacement = t.expressionStatement(replacement))); else if ("param" === placeholder.type) {
              if ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
              void 0 === index) throw new Error("Assertion failure.");
            } else if ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
            Array.isArray(replacement)) throw new Error("Cannot replace single expression with an array.");
            if (void 0 === index) t.validate(parent, key, replacement), parent[key] = replacement; else {
              const items = parent[key].slice();
              "statement" === placeholder.type || "param" === placeholder.type ? null == replacement ? items.splice(index, 1) : Array.isArray(replacement) ? items.splice(index, 1, ...replacement) : items[index] = replacement : items[index] = replacement, 
              t.validate(parent, key, items), parent[key] = items;
            }
          }(placeholder, ast, replacements && replacements[placeholder.name] || null);
        } catch (e) {
          throw e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`, 
          e;
        }
      }), ast;
    };
    var t = function(obj) {
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
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  93: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.rewriteModuleStatementsAndPrepareHeader = function(path, {exportName: exportName, strict: strict, allowTopLevelThis: allowTopLevelThis, strictMode: strictMode, loose: loose, noInterop: noInterop, lazy: lazy, esNamespaceOnly: esNamespaceOnly}) {
      (0, _assert.default)((0, _helperModuleImports.isModule)(path), "Cannot process module statements in a script"), 
      path.node.sourceType = "script";
      const meta = (0, _normalizeAndLoadMetadata.default)(path, exportName, {
        noInterop: noInterop,
        loose: loose,
        lazy: lazy,
        esNamespaceOnly: esNamespaceOnly
      });
      allowTopLevelThis || (0, _rewriteThis.default)(path);
      if ((0, _rewriteLiveReferences.default)(path, meta), !1 !== strictMode) {
        path.node.directives.some(directive => "use strict" === directive.value.value) || path.unshiftContainer("directives", t.directive(t.directiveLiteral("use strict")));
      }
      const headers = [];
      (0, _normalizeAndLoadMetadata.hasExports)(meta) && !strict && headers.push(function(metadata, enumerable = !1) {
        return (enumerable ? _template.default.statement`
        EXPORTS.__esModule = true;
      ` : _template.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({
          EXPORTS: metadata.exportName
        });
      }(meta, loose));
      const nameList = function(programPath, metadata) {
        const exportedVars = Object.create(null);
        for (const data of metadata.local.values()) for (const name of data.names) exportedVars[name] = !0;
        let hasReexport = !1;
        for (const data of metadata.source.values()) {
          for (const exportName of data.reexports.keys()) exportedVars[exportName] = !0;
          for (const exportName of data.reexportNamespace) exportedVars[exportName] = !0;
          hasReexport = hasReexport || data.reexportAll;
        }
        if (!hasReexport || 0 === Object.keys(exportedVars).length) return null;
        const name = programPath.scope.generateUidIdentifier("exportNames");
        return delete exportedVars.default, {
          name: name.name,
          statement: t.variableDeclaration("var", [ t.variableDeclarator(name, t.valueToNode(exportedVars)) ])
        };
      }(path, meta);
      nameList && (meta.exportNameListName = nameList.name, headers.push(nameList.statement));
      return headers.push(...function(programPath, metadata, loose = !1) {
        const initStatements = [], exportNames = [];
        for (const [localName, data] of metadata.local) "import" === data.kind || ("hoisted" === data.kind ? initStatements.push(buildInitStatement(metadata, data.names, t.identifier(localName))) : exportNames.push(...data.names));
        for (const data of metadata.source.values()) {
          loose || initStatements.push(...buildReexportsFromMeta(metadata, data, loose));
          for (const exportName of data.reexportNamespace) exportNames.push(exportName);
        }
        return initStatements.push(...(0, _chunk.default)(exportNames, 100).map(members => buildInitStatement(metadata, members, programPath.scope.buildUndefinedNode()))), 
        initStatements;
      }(path, meta, loose)), {
        meta: meta,
        headers: headers
      };
    }, exports.ensureStatementsHoisted = function(statements) {
      statements.forEach(header => {
        header._blockHoist = 3;
      });
    }, exports.wrapInterop = function(programPath, expr, type) {
      if ("none" === type) return null;
      let helper;
      if ("default" === type) helper = "interopRequireDefault"; else {
        if ("namespace" !== type) throw new Error("Unknown interop: " + type);
        helper = "interopRequireWildcard";
      }
      return t.callExpression(programPath.hub.addHelper(helper), [ expr ]);
    }, exports.buildNamespaceInitStatements = function(metadata, sourceMetadata, loose = !1) {
      const statements = [];
      let srcNamespace = t.identifier(sourceMetadata.name);
      sourceMetadata.lazy && (srcNamespace = t.callExpression(srcNamespace, []));
      for (const localName of sourceMetadata.importsNamespace) localName !== sourceMetadata.name && statements.push(_template.default.statement`var NAME = SOURCE;`({
        NAME: localName,
        SOURCE: t.cloneNode(srcNamespace)
      }));
      loose && statements.push(...buildReexportsFromMeta(metadata, sourceMetadata, loose));
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
        NAMESPACE: t.cloneNode(srcNamespace)
      }));
      if (sourceMetadata.reexportAll) {
        const statement = function(metadata, namespace, loose) {
          return (loose ? _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;

          EXPORTS[key] = NAMESPACE[key];
        });
      ` : _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;

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
        }(metadata, t.cloneNode(srcNamespace), loose);
        statement.loc = sourceMetadata.reexportAll.loc, statements.push(statement);
      }
      return statements;
    }, Object.defineProperty(exports, "isModule", {
      enumerable: !0,
      get: function() {
        return _helperModuleImports.isModule;
      }
    }), Object.defineProperty(exports, "rewriteThis", {
      enumerable: !0,
      get: function() {
        return _rewriteThis.default;
      }
    }), Object.defineProperty(exports, "hasExports", {
      enumerable: !0,
      get: function() {
        return _normalizeAndLoadMetadata.hasExports;
      }
    }), Object.defineProperty(exports, "isSideEffectImport", {
      enumerable: !0,
      get: function() {
        return _normalizeAndLoadMetadata.isSideEffectImport;
      }
    }), Object.defineProperty(exports, "getModuleName", {
      enumerable: !0,
      get: function() {
        return _getModuleName.default;
      }
    });
    var _assert = _interopRequireDefault(__webpack_require__(10)), t = _interopRequireWildcard(__webpack_require__(0)), _template = _interopRequireDefault(__webpack_require__(11)), _chunk = _interopRequireDefault(__webpack_require__(94)), _helperModuleImports = __webpack_require__(54), _rewriteThis = _interopRequireDefault(__webpack_require__(99)), _rewriteLiveReferences = _interopRequireDefault(__webpack_require__(100)), _normalizeAndLoadMetadata = _interopRequireWildcard(__webpack_require__(101)), _getModuleName = _interopRequireDefault(__webpack_require__(102));
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
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    const buildReexportsFromMeta = (meta, metadata, loose) => {
      const namespace = metadata.lazy ? t.callExpression(t.identifier(metadata.name), []) : t.identifier(metadata.name), templateForCurrentMode = (loose => loose ? _template.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE.IMPORT_NAME;` : _template.default`
      Object.defineProperty(EXPORTS, "EXPORT_NAME", {
        enumerable: true,
        get: function() {
          return NAMESPACE.IMPORT_NAME;
        },
      });
    `)(loose);
      return Array.from(metadata.reexports, ([exportName, importName]) => templateForCurrentMode({
        EXPORTS: meta.exportName,
        EXPORT_NAME: exportName,
        NAMESPACE: t.cloneNode(namespace),
        IMPORT_NAME: importName
      }));
    };
    function buildInitStatement(metadata, exportNames, initExpr) {
      return t.expressionStatement(exportNames.reduce((acc, exportName) => _template.default.expression`EXPORTS.NAME = VALUE`({
        EXPORTS: metadata.exportName,
        NAME: exportName,
        VALUE: acc
      }), initExpr));
    }
  },
  94: function(module, exports, __webpack_require__) {
    var baseSlice = __webpack_require__(95), isIterateeCall = __webpack_require__(73), toInteger = __webpack_require__(96), nativeCeil = Math.ceil, nativeMax = Math.max;
    module.exports = function(array, size, guard) {
      size = (guard ? isIterateeCall(array, size, guard) : void 0 === size) ? 1 : nativeMax(toInteger(size), 0);
      var length = null == array ? 0 : array.length;
      if (!length || size < 1) return [];
      for (var index = 0, resIndex = 0, result = Array(nativeCeil(length / size)); index < length; ) result[resIndex++] = baseSlice(array, index, index += size);
      return result;
    };
  },
  95: function(module, exports) {
    module.exports = function(array, start, end) {
      var index = -1, length = array.length;
      start < 0 && (start = -start > length ? 0 : length + start), (end = end > length ? length : end) < 0 && (end += length), 
      length = start > end ? 0 : end - start >>> 0, start >>>= 0;
      for (var result = Array(length); ++index < length; ) result[index] = array[index + start];
      return result;
    };
  },
  96: function(module, exports, __webpack_require__) {
    var toFinite = __webpack_require__(97);
    module.exports = function(value) {
      var result = toFinite(value), remainder = result % 1;
      return result == result ? remainder ? result - remainder : result : 0;
    };
  },
  97: function(module, exports, __webpack_require__) {
    var toNumber = __webpack_require__(98);
    module.exports = function(value) {
      return value ? (value = toNumber(value)) === 1 / 0 || value === -1 / 0 ? 17976931348623157e292 * (value < 0 ? -1 : 1) : value == value ? value : 0 : 0 === value ? value : 0;
    };
  },
  98: function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(3), isSymbol = __webpack_require__(67), reTrim = /^\s+|\s+$/g, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
    module.exports = function(value) {
      if ("number" == typeof value) return value;
      if (isSymbol(value)) return NaN;
      if (isObject(value)) {
        var other = "function" == typeof value.valueOf ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if ("string" != typeof value) return 0 === value ? value : +value;
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NaN : +value;
    };
  },
  99: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(programPath) {
      programPath.traverse(rewriteThisVisitor);
    };
    var _helperReplaceSupers = __webpack_require__(30);
    const rewriteThisVisitor = {
      ThisExpression(path) {
        path.replaceWith(path.scope.buildUndefinedNode());
      },
      Function(path) {
        path.isMethod() ? (0, _helperReplaceSupers.skipAllButComputedKey)(path) : path.isArrowFunctionExpression() || path.skip();
      },
      ClassProperty(path) {
        (0, _helperReplaceSupers.skipAllButComputedKey)(path);
      },
      ClassPrivateProperty(path) {
        path.skip();
      }
    };
  }
});