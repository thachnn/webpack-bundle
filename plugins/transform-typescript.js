(() => {
  "use strict";
  var __webpack_modules__ = {
    141: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.extractComputedKeys = function(ref, path, computedPaths, file) {
        const declarations = [], state = {
          classBinding: path.node.id && path.scope.getBinding(path.node.id.name),
          file
        };
        for (const computedPath of computedPaths) {
          const computedKey = computedPath.get("key");
          computedKey.isReferencedIdentifier() ? handleClassTDZ(computedKey, state) : computedKey.traverse(classFieldDefinitionEvaluationTDZVisitor, state);
          const computedNode = computedPath.node;
          if (!computedKey.isConstantExpression()) {
            const ident = path.scope.generateUidIdentifierBasedOnNode(computedNode.key);
            path.scope.push({
              id: ident,
              kind: "let"
            }), declarations.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.cloneNode(ident), computedNode.key))), 
            computedNode.key = _core.types.cloneNode(ident);
          }
        }
        return declarations;
      }, exports.injectInitialization = function(path, constructor, nodes, renamer) {
        if (!nodes.length) return;
        const isDerived = !!path.node.superClass;
        if (!constructor) {
          const newConstructor = _core.types.classMethod("constructor", _core.types.identifier("constructor"), [], _core.types.blockStatement([]));
          isDerived && (newConstructor.params = [ _core.types.restElement(_core.types.identifier("args")) ], 
          newConstructor.body.body.push(_core.template.statement.ast`super(...args)`)), [constructor] = path.get("body").unshiftContainer("body", newConstructor);
        }
        renamer && renamer(referenceVisitor, {
          scope: constructor.scope
        });
        if (isDerived) {
          const bareSupers = [];
          constructor.traverse(findBareSupers, bareSupers);
          let isFirst = !0;
          for (const bareSuper of bareSupers) isFirst ? (bareSuper.insertAfter(nodes), isFirst = !1) : bareSuper.insertAfter(nodes.map((n => _core.types.cloneNode(n))));
        } else constructor.get("body").unshiftContainer("body", nodes);
      };
      var _core = __webpack_require__(629), _helperEnvironmentVisitor = __webpack_require__(692);
      const findBareSupers = _core.traverse.visitors.merge([ {
        Super(path) {
          const {node, parentPath} = path;
          parentPath.isCallExpression({
            callee: node
          }) && this.push(parentPath);
        }
      }, _helperEnvironmentVisitor.default ]), referenceVisitor = {
        "TSTypeAnnotation|TypeAnnotation"(path) {
          path.skip();
        },
        ReferencedIdentifier(path) {
          this.scope.hasOwnBinding(path.node.name) && (this.scope.rename(path.node.name), 
          path.skip());
        }
      };
      function handleClassTDZ(path, state) {
        if (state.classBinding && state.classBinding === path.scope.getBinding(path.node.name)) {
          const classNameTDZError = state.file.addHelper("classNameTDZError"), throwNode = _core.types.callExpression(classNameTDZError, [ _core.types.stringLiteral(path.node.name) ]);
          path.replaceWith(_core.types.sequenceExpression([ throwNode, path.node ])), path.skip();
        }
      }
      const classFieldDefinitionEvaluationTDZVisitor = {
        ReferencedIdentifier: handleClassTDZ
      };
    },
    692: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, exports.skipAllButComputedKey = skipAllButComputedKey;
      var _t = __webpack_require__(459);
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
    508: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path, t) {
        const {name} = path.node.id, parentIsExport = path.parentPath.isExportNamedDeclaration();
        let isExported = parentIsExport;
        !isExported && t.isProgram(path.parent) && (isExported = path.parent.body.some((stmt => t.isExportNamedDeclaration(stmt) && !stmt.source && stmt.specifiers.some((spec => t.isExportSpecifier(spec) && spec.local.name === name)))));
        const entries = (0, _enum.translateEnumValues)(path, t);
        if (isExported) {
          const obj = t.objectExpression(entries.map((([name, value]) => t.objectProperty(t.isValidIdentifier(name) ? t.identifier(name) : t.stringLiteral(name), value))));
          return void (path.scope.hasOwnBinding(name) ? (parentIsExport ? path.parentPath : path).replaceWith(t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("assign")), [ path.node.id, obj ]))) : (path.replaceWith(t.variableDeclaration("var", [ t.variableDeclarator(path.node.id, obj) ])), 
          path.scope.registerDeclaration(path)));
        }
        const entriesMap = new Map(entries);
        path.scope.path.traverse({
          Scope(path) {
            path.scope.hasOwnBinding(name) && path.skip();
          },
          MemberExpression(path) {
            if (!t.isIdentifier(path.node.object, {
              name
            })) return;
            let key;
            if (path.node.computed) {
              if (!t.isStringLiteral(path.node.property)) return;
              key = path.node.property.value;
            } else {
              if (!t.isIdentifier(path.node.property)) return;
              key = path.node.property.name;
            }
            entriesMap.has(key) && path.replaceWith(t.cloneNode(entriesMap.get(key)));
          }
        }), path.remove();
      };
      var _enum = __webpack_require__(888);
    },
    888: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path, t) {
        const {node} = path;
        if (node.declare) return void path.remove();
        const name = node.id.name, fill = function(path, t, id) {
          const assignments = translateEnumValues(path, t).map((([memberName, memberValue]) => {
            return isString = t.isStringLiteral(memberValue), options = {
              ENUM: t.cloneNode(id),
              NAME: memberName,
              VALUE: memberValue
            }, (isString ? buildStringAssignment : buildNumericAssignment)(options);
            var isString, options;
          }));
          return buildEnumWrapper({
            ID: t.cloneNode(id),
            ASSIGNMENTS: assignments
          });
        }(path, t, node.id);
        switch (path.parent.type) {
         case "BlockStatement":
         case "ExportNamedDeclaration":
         case "Program":
          if (path.insertAfter(fill), function seen(parentPath) {
            if (parentPath.isExportDeclaration()) return seen(parentPath.parentPath);
            return !!parentPath.getData(name) || (parentPath.setData(name, !0), !1);
          }(path.parentPath)) path.remove(); else {
            const isGlobal = t.isProgram(path.parent);
            path.scope.registerDeclaration(path.replaceWith(function(id, t, kind) {
              return t.variableDeclaration(kind, [ t.variableDeclarator(id) ]);
            }(node.id, t, isGlobal ? "var" : "let"))[0]);
          }
          break;

         default:
          throw new Error(`Unexpected enum parent '${path.parent.type}`);
        }
      }, exports.translateEnumValues = translateEnumValues;
      var _core = __webpack_require__(629), _assert = __webpack_require__(491);
      const buildEnumWrapper = (0, _core.template)("\n  (function (ID) {\n    ASSIGNMENTS;\n  })(ID || (ID = {}));\n"), buildStringAssignment = (0, 
      _core.template)('\n  ENUM["NAME"] = VALUE;\n'), buildNumericAssignment = (0, _core.template)('\n  ENUM[ENUM["NAME"] = VALUE] = "NAME";\n');
      function ReferencedIdentifier(expr, state) {
        const {seen, path, t} = state, name = expr.node.name;
        seen.has(name) && !expr.scope.hasOwnBinding(name) && (expr.replaceWith(t.memberExpression(t.cloneNode(path.node.id), t.cloneNode(expr.node))), 
        expr.skip());
      }
      const enumSelfReferenceVisitor = {
        ReferencedIdentifier
      };
      function translateEnumValues(path, t) {
        const seen = new Map;
        let lastName, constValue = -1;
        return path.get("members").map((memberPath => {
          const member = memberPath.node, name = t.isIdentifier(member.id) ? member.id.name : member.id.value, initializer = member.initializer;
          let value;
          if (initializer) if (constValue = function(expr, seen) {
            return evalConstant(expr);
            function evalConstant(expr) {
              switch (expr.type) {
               case "StringLiteral":
                return expr.value;

               case "UnaryExpression":
                return evalUnaryExpression(expr);

               case "BinaryExpression":
                return evalBinaryExpression(expr);

               case "NumericLiteral":
                return expr.value;

               case "ParenthesizedExpression":
                return evalConstant(expr.expression);

               case "Identifier":
                return seen.get(expr.name);

               case "TemplateLiteral":
                if (1 === expr.quasis.length) return expr.quasis[0].value.cooked;

               default:
                return;
              }
            }
            function evalUnaryExpression({argument, operator}) {
              const value = evalConstant(argument);
              if (void 0 !== value) switch (operator) {
               case "+":
                return value;

               case "-":
                return -value;

               case "~":
                return ~value;

               default:
                return;
              }
            }
            function evalBinaryExpression(expr) {
              const left = evalConstant(expr.left);
              if (void 0 === left) return;
              const right = evalConstant(expr.right);
              if (void 0 !== right) switch (expr.operator) {
               case "|":
                return left | right;

               case "&":
                return left & right;

               case ">>":
                return left >> right;

               case ">>>":
                return left >>> right;

               case "<<":
                return left << right;

               case "^":
                return left ^ right;

               case "*":
                return left * right;

               case "/":
                return left / right;

               case "+":
                return left + right;

               case "-":
                return left - right;

               case "%":
                return left % right;

               default:
                return;
              }
            }
          }(initializer, seen), void 0 !== constValue) seen.set(name, constValue), "number" == typeof constValue ? value = t.numericLiteral(constValue) : (_assert("string" == typeof constValue), 
          value = t.stringLiteral(constValue)); else {
            const initializerPath = memberPath.get("initializer");
            initializerPath.isReferencedIdentifier() ? ReferencedIdentifier(initializerPath, {
              t,
              seen,
              path
            }) : initializerPath.traverse(enumSelfReferenceVisitor, {
              t,
              seen,
              path
            }), value = initializerPath.node, seen.set(name, void 0);
          } else if ("number" == typeof constValue) constValue += 1, value = t.numericLiteral(constValue), 
          seen.set(name, constValue); else {
            if ("string" == typeof constValue) throw path.buildCodeFrameError("Enum member must have initializer.");
            {
              const lastRef = t.memberExpression(t.cloneNode(path.node.id), t.stringLiteral(lastName), !0);
              value = t.binaryExpression("+", t.numericLiteral(1), lastRef), seen.set(name, void 0);
            }
          }
          return lastName = name, [ name, value ];
        }));
      }
    },
    524: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path, t, allowNamespaces) {
        if (path.node.declare || "StringLiteral" === path.node.id.type) return void path.remove();
        if (!allowNamespaces) throw path.hub.file.buildCodeFrameError(path.node.id, "Namespace not marked type-only declare. Non-declarative namespaces are only supported experimentally in Babel. To enable and review caveats see: https://babeljs.io/docs/en/babel-plugin-transform-typescript");
        const name = path.node.id.name, value = handleNested(path, t, t.cloneDeep(path.node)), bound = path.scope.hasOwnBinding(name);
        "ExportNamedDeclaration" === path.parent.type ? bound ? path.parentPath.replaceWith(value) : (path.parentPath.insertAfter(value), 
        path.replaceWith(getDeclaration(t, name)), path.scope.registerDeclaration(path.parentPath)) : bound ? path.replaceWith(value) : path.scope.registerDeclaration(path.replaceWithMultiple([ getDeclaration(t, name), value ])[0]);
      };
      var _core = __webpack_require__(629);
      function getDeclaration(t, name) {
        return t.variableDeclaration("let", [ t.variableDeclarator(t.identifier(name)) ]);
      }
      function getMemberExpression(t, name, itemName) {
        return t.memberExpression(t.identifier(name), t.identifier(itemName));
      }
      function handleVariableDeclaration(node, name, hub) {
        if ("const" !== node.kind) throw hub.file.buildCodeFrameError(node, "Namespaces exporting non-const are not supported by Babel. Change to const or see: https://babeljs.io/docs/en/babel-plugin-transform-typescript");
        const {declarations} = node;
        if (declarations.every((declarator => _core.types.isIdentifier(declarator.id)))) {
          for (const declarator of declarations) declarator.init = _core.types.assignmentExpression("=", getMemberExpression(_core.types, name, declarator.id.name), declarator.init);
          return [ node ];
        }
        const bindingIdentifiers = _core.types.getBindingIdentifiers(node), assignments = [];
        for (const idName in bindingIdentifiers) assignments.push(_core.types.assignmentExpression("=", getMemberExpression(_core.types, name, idName), _core.types.cloneNode(bindingIdentifiers[idName])));
        return [ node, _core.types.expressionStatement(_core.types.sequenceExpression(assignments)) ];
      }
      function buildNestedAmbiendModuleError(path, node) {
        throw path.hub.buildError(node, "Ambient modules cannot be nested in other modules or namespaces.", Error);
      }
      function handleNested(path, t, node, parentExport) {
        const names = new Set, realName = node.id;
        t.assertIdentifier(realName);
        const name = path.scope.generateUid(realName.name), namespaceTopLevel = t.isTSModuleBlock(node.body) ? node.body.body : [ t.exportNamedDeclaration(node.body) ];
        for (let i = 0; i < namespaceTopLevel.length; i++) {
          const subNode = namespaceTopLevel[i];
          switch (subNode.type) {
           case "TSModuleDeclaration":
            {
              if (!t.isIdentifier(subNode.id)) throw buildNestedAmbiendModuleError(path, subNode);
              const transformed = handleNested(path, t, subNode), moduleName = subNode.id.name;
              names.has(moduleName) ? namespaceTopLevel[i] = transformed : (names.add(moduleName), 
              namespaceTopLevel.splice(i++, 1, getDeclaration(t, moduleName), transformed));
              continue;
            }

           case "TSEnumDeclaration":
           case "FunctionDeclaration":
           case "ClassDeclaration":
            names.add(subNode.id.name);
            continue;

           case "VariableDeclaration":
            for (const name in t.getBindingIdentifiers(subNode)) names.add(name);
            continue;

           default:
            continue;

           case "ExportNamedDeclaration":
          }
          switch (subNode.declaration.type) {
           case "TSEnumDeclaration":
           case "FunctionDeclaration":
           case "ClassDeclaration":
            {
              const itemName = subNode.declaration.id.name;
              names.add(itemName), namespaceTopLevel.splice(i++, 1, subNode.declaration, t.expressionStatement(t.assignmentExpression("=", getMemberExpression(t, name, itemName), t.identifier(itemName))));
              break;
            }

           case "VariableDeclaration":
            {
              const nodes = handleVariableDeclaration(subNode.declaration, name, path.hub);
              namespaceTopLevel.splice(i, nodes.length, ...nodes), i += nodes.length - 1;
              break;
            }

           case "TSModuleDeclaration":
            {
              if (!t.isIdentifier(subNode.declaration.id)) throw buildNestedAmbiendModuleError(path, subNode.declaration);
              const transformed = handleNested(path, t, subNode.declaration, t.identifier(name)), moduleName = subNode.declaration.id.name;
              names.has(moduleName) ? namespaceTopLevel[i] = transformed : (names.add(moduleName), 
              namespaceTopLevel.splice(i++, 1, getDeclaration(t, moduleName), transformed));
            }
          }
        }
        let fallthroughValue = t.objectExpression([]);
        if (parentExport) {
          const memberExpr = t.memberExpression(parentExport, realName);
          fallthroughValue = _core.template.expression.ast`
      ${t.cloneNode(memberExpr)} ||
        (${t.cloneNode(memberExpr)} = ${fallthroughValue})
    `;
        }
        return _core.template.statement.ast`
    (function (${t.identifier(name)}) {
      ${namespaceTopLevel}
    })(${realName} || (${t.cloneNode(realName)} = ${fallthroughValue}));
  `;
      }
    },
    488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    459: module => {
      module.exports = require("../lib/types");
    },
    923: module => {
      module.exports = require("./syntax-typescript");
    },
    629: module => {
      module.exports = require("@babel/core");
    },
    491: module => {
      module.exports = require("assert");
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
    var _helperPluginUtils = __webpack_require__(488), _pluginSyntaxTypescript = __webpack_require__(923), _core = __webpack_require__(629), _helperCreateClassFeaturesPlugin = __webpack_require__(141), _constEnum = __webpack_require__(508), _enum = __webpack_require__(888), _namespace = __webpack_require__(524);
    function isInType(path) {
      switch (path.parent.type) {
       case "TSTypeReference":
       case "TSQualifiedName":
       case "TSExpressionWithTypeArguments":
       case "TSTypeQuery":
        return !0;

       case "ExportSpecifier":
        return "type" === path.parentPath.parent.exportKind;

       default:
        return !1;
      }
    }
    const GLOBAL_TYPES = new WeakMap, NEEDS_EXPLICIT_ESM = new WeakMap, PARSED_PARAMS = new WeakSet;
    function isGlobalType(path, name) {
      const program = path.find((path => path.isProgram())).node;
      return !path.scope.hasOwnBinding(name) && (!!GLOBAL_TYPES.get(program).has(name) || (console.warn(`The exported identifier "${name}" is not declared in Babel's scope tracker\nas a JavaScript value binding, and "@babel/plugin-transform-typescript"\nnever encountered it as a TypeScript type declaration.\nIt will be treated as a JavaScript value.\n\nThis problem is likely caused by another plugin injecting\n"${name}" without registering it in the scope tracker. If you are the author\n of that plugin, please use "scope.registerDeclaration(declarationPath)".`), 
      !1));
    }
    function registerGlobalType(programNode, name) {
      GLOBAL_TYPES.get(programNode).add(name);
    }
    var _default = (0, _helperPluginUtils.declare)(((api, opts) => {
      api.assertVersion(7);
      const JSX_PRAGMA_REGEX = /\*?\s*@jsx((?:Frag)?)\s+([^\s]+)/, {allowNamespaces = !0, jsxPragma = "React.createElement", jsxPragmaFrag = "React.Fragment", onlyRemoveTypeImports = !1, optimizeConstEnums = !1} = opts;
      var {allowDeclareFields = !1} = opts;
      const classMemberVisitors = {
        field(path) {
          const {node} = path;
          if (!allowDeclareFields && node.declare) throw path.buildCodeFrameError("The 'declare' modifier is only allowed when the 'allowDeclareFields' option of @babel/plugin-transform-typescript or @babel/preset-typescript is enabled.");
          if (node.declare) {
            if (node.value) throw path.buildCodeFrameError("Fields with the 'declare' modifier cannot be initialized here, but only in the constructor");
            node.decorators || path.remove();
          } else if (node.definite) {
            if (node.value) throw path.buildCodeFrameError("Definitely assigned fields cannot be initialized here, but only in the constructor");
            allowDeclareFields || node.decorators || path.remove();
          } else allowDeclareFields || node.value || node.decorators || _core.types.isClassPrivateProperty(node) || path.remove();
          node.accessibility && (node.accessibility = null), node.abstract && (node.abstract = null), 
          node.readonly && (node.readonly = null), node.optional && (node.optional = null), 
          node.typeAnnotation && (node.typeAnnotation = null), node.definite && (node.definite = null), 
          node.declare && (node.declare = null), node.override && (node.override = null);
        },
        method({node}) {
          node.accessibility && (node.accessibility = null), node.abstract && (node.abstract = null), 
          node.optional && (node.optional = null), node.override && (node.override = null);
        },
        constructor(path, classPath) {
          path.node.accessibility && (path.node.accessibility = null);
          const parameterProperties = [];
          for (const param of path.node.params) "TSParameterProperty" !== param.type || PARSED_PARAMS.has(param.parameter) || (PARSED_PARAMS.add(param.parameter), 
          parameterProperties.push(param.parameter));
          if (parameterProperties.length) {
            const assigns = parameterProperties.map((p => {
              let id;
              if (_core.types.isIdentifier(p)) id = p; else {
                if (!_core.types.isAssignmentPattern(p) || !_core.types.isIdentifier(p.left)) throw path.buildCodeFrameError("Parameter properties can not be destructuring patterns.");
                id = p.left;
              }
              return _core.template.statement.ast`
              this.${_core.types.cloneNode(id)} = ${_core.types.cloneNode(id)}`;
            }));
            (0, _helperCreateClassFeaturesPlugin.injectInitialization)(classPath, path, assigns);
          }
        }
      };
      return {
        name: "transform-typescript",
        inherits: _pluginSyntaxTypescript.default,
        visitor: {
          Pattern: visitPattern,
          Identifier: visitPattern,
          RestElement: visitPattern,
          Program: {
            enter(path, state) {
              const {file} = state;
              let fileJsxPragma = null, fileJsxPragmaFrag = null;
              const programNode = path.node;
              if (GLOBAL_TYPES.has(programNode) || GLOBAL_TYPES.set(programNode, new Set), file.ast.comments) for (const comment of file.ast.comments) {
                const jsxMatches = JSX_PRAGMA_REGEX.exec(comment.value);
                jsxMatches && (jsxMatches[1] ? fileJsxPragmaFrag = jsxMatches[2] : fileJsxPragma = jsxMatches[2]);
              }
              let pragmaImportName = fileJsxPragma || jsxPragma;
              pragmaImportName && ([pragmaImportName] = pragmaImportName.split("."));
              let pragmaFragImportName = fileJsxPragmaFrag || jsxPragmaFrag;
              pragmaFragImportName && ([pragmaFragImportName] = pragmaFragImportName.split("."));
              for (let stmt of path.get("body")) if (stmt.isImportDeclaration()) {
                if (NEEDS_EXPLICIT_ESM.has(state.file.ast.program) || NEEDS_EXPLICIT_ESM.set(state.file.ast.program, !0), 
                "type" === stmt.node.importKind) {
                  for (const specifier of stmt.node.specifiers) registerGlobalType(programNode, specifier.local.name);
                  stmt.remove();
                  continue;
                }
                const importsToRemove = new Set, specifiersLength = stmt.node.specifiers.length, isAllSpecifiersElided = () => specifiersLength > 0 && specifiersLength === importsToRemove.size;
                for (const specifier of stmt.node.specifiers) if ("ImportSpecifier" === specifier.type && "type" === specifier.importKind) {
                  registerGlobalType(programNode, specifier.local.name);
                  const binding = stmt.scope.getBinding(specifier.local.name);
                  binding && importsToRemove.add(binding.path);
                }
                if (onlyRemoveTypeImports) NEEDS_EXPLICIT_ESM.set(path.node, !1); else {
                  if (0 === stmt.node.specifiers.length) {
                    NEEDS_EXPLICIT_ESM.set(path.node, !1);
                    continue;
                  }
                  for (const specifier of stmt.node.specifiers) {
                    const binding = stmt.scope.getBinding(specifier.local.name);
                    binding && !importsToRemove.has(binding.path) && (isImportTypeOnly({
                      binding,
                      programPath: path,
                      pragmaImportName,
                      pragmaFragImportName
                    }) ? importsToRemove.add(binding.path) : NEEDS_EXPLICIT_ESM.set(path.node, !1));
                  }
                }
                if (isAllSpecifiersElided()) stmt.remove(); else for (const importPath of importsToRemove) importPath.remove();
              } else if (stmt.isExportDeclaration() && (stmt = stmt.get("declaration")), stmt.isVariableDeclaration({
                declare: !0
              })) for (const name of Object.keys(stmt.getBindingIdentifiers())) registerGlobalType(programNode, name); else (stmt.isTSTypeAliasDeclaration() || stmt.isTSDeclareFunction() && stmt.get("id").isIdentifier() || stmt.isTSInterfaceDeclaration() || stmt.isClassDeclaration({
                declare: !0
              }) || stmt.isTSEnumDeclaration({
                declare: !0
              }) || stmt.isTSModuleDeclaration({
                declare: !0
              }) && stmt.get("id").isIdentifier()) && registerGlobalType(programNode, stmt.node.id.name);
            },
            exit(path) {
              "module" === path.node.sourceType && NEEDS_EXPLICIT_ESM.get(path.node) && path.pushContainer("body", _core.types.exportNamedDeclaration());
            }
          },
          ExportNamedDeclaration(path, state) {
            NEEDS_EXPLICIT_ESM.has(state.file.ast.program) || NEEDS_EXPLICIT_ESM.set(state.file.ast.program, !0), 
            "type" !== path.node.exportKind ? path.node.source && path.node.specifiers.length > 0 && path.node.specifiers.every((specifier => "ExportSpecifier" === specifier.type && "type" === specifier.exportKind)) || !path.node.source && path.node.specifiers.length > 0 && path.node.specifiers.every((specifier => _core.types.isExportSpecifier(specifier) && isGlobalType(path, specifier.local.name))) ? path.remove() : NEEDS_EXPLICIT_ESM.set(state.file.ast.program, !1) : path.remove();
          },
          ExportSpecifier(path) {
            (!path.parent.source && isGlobalType(path, path.node.local.name) || "type" === path.node.exportKind) && path.remove();
          },
          ExportDefaultDeclaration(path, state) {
            NEEDS_EXPLICIT_ESM.has(state.file.ast.program) || NEEDS_EXPLICIT_ESM.set(state.file.ast.program, !0), 
            _core.types.isIdentifier(path.node.declaration) && isGlobalType(path, path.node.declaration.name) ? path.remove() : NEEDS_EXPLICIT_ESM.set(state.file.ast.program, !1);
          },
          TSDeclareFunction(path) {
            path.remove();
          },
          TSDeclareMethod(path) {
            path.remove();
          },
          VariableDeclaration(path) {
            path.node.declare && path.remove();
          },
          VariableDeclarator({node}) {
            node.definite && (node.definite = null);
          },
          TSIndexSignature(path) {
            path.remove();
          },
          ClassDeclaration(path) {
            const {node} = path;
            node.declare && path.remove();
          },
          Class(path) {
            const {node} = path;
            node.typeParameters && (node.typeParameters = null), node.superTypeParameters && (node.superTypeParameters = null), 
            node.implements && (node.implements = null), node.abstract && (node.abstract = null), 
            path.get("body.body").forEach((child => {
              child.isClassMethod() || child.isClassPrivateMethod() ? "constructor" === child.node.kind ? classMemberVisitors.constructor(child, path) : classMemberVisitors.method(child) : (child.isClassProperty() || child.isClassPrivateProperty()) && classMemberVisitors.field(child);
            }));
          },
          Function(path) {
            const {node, scope} = path;
            node.typeParameters && (node.typeParameters = null), node.returnType && (node.returnType = null);
            const params = node.params;
            params.length > 0 && _core.types.isIdentifier(params[0], {
              name: "this"
            }) && params.shift();
            const paramsPath = path.get("params");
            for (const p of paramsPath) "TSParameterProperty" === p.type && (p.replaceWith(p.get("parameter")), 
            scope.registerBinding("param", p));
          },
          TSModuleDeclaration(path) {
            (0, _namespace.default)(path, _core.types, allowNamespaces);
          },
          TSInterfaceDeclaration(path) {
            path.remove();
          },
          TSTypeAliasDeclaration(path) {
            path.remove();
          },
          TSEnumDeclaration(path) {
            optimizeConstEnums && path.node.const ? (0, _constEnum.default)(path, _core.types) : (0, 
            _enum.default)(path, _core.types);
          },
          TSImportEqualsDeclaration(path) {
            if (_core.types.isTSExternalModuleReference(path.node.moduleReference)) throw path.buildCodeFrameError(`\`import ${path.node.id.name} = require('${path.node.moduleReference.expression.value}')\` is not supported by @babel/plugin-transform-typescript\nPlease consider using \`import ${path.node.id.name} from '${path.node.moduleReference.expression.value}';\` alongside Typescript's --allowSyntheticDefaultImports option.`);
            path.replaceWith(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(path.node.id, entityNameToExpr(path.node.moduleReference)) ]));
          },
          TSExportAssignment(path) {
            throw path.buildCodeFrameError("`export =` is not supported by @babel/plugin-transform-typescript\nPlease consider using `export <value>;`.");
          },
          TSTypeAssertion(path) {
            path.replaceWith(path.node.expression);
          },
          TSAsExpression(path) {
            let {node} = path;
            do {
              node = node.expression;
            } while (_core.types.isTSAsExpression(node));
            path.replaceWith(node);
          },
          TSNonNullExpression(path) {
            path.replaceWith(path.node.expression);
          },
          CallExpression(path) {
            path.node.typeParameters = null;
          },
          OptionalCallExpression(path) {
            path.node.typeParameters = null;
          },
          NewExpression(path) {
            path.node.typeParameters = null;
          },
          JSXOpeningElement(path) {
            path.node.typeParameters = null;
          },
          TaggedTemplateExpression(path) {
            path.node.typeParameters = null;
          }
        }
      };
      function entityNameToExpr(node) {
        return _core.types.isTSQualifiedName(node) ? _core.types.memberExpression(entityNameToExpr(node.left), node.right) : node;
      }
      function visitPattern({node}) {
        node.typeAnnotation && (node.typeAnnotation = null), _core.types.isIdentifier(node) && node.optional && (node.optional = null);
      }
      function isImportTypeOnly({binding, programPath, pragmaImportName, pragmaFragImportName}) {
        for (const path of binding.referencePaths) if (!isInType(path)) return !1;
        if (binding.identifier.name !== pragmaImportName && binding.identifier.name !== pragmaFragImportName) return !0;
        let sourceFileHasJsx = !1;
        return programPath.traverse({
          "JSXElement|JSXFragment"(path) {
            sourceFileHasJsx = !0, path.stop();
          }
        }), !sourceFileHasJsx;
      }
    }));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();