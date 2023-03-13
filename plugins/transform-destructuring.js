(() => {
  "use strict";
  var __webpack_modules__ = {
    5488: module => {
      module.exports = require("../lib/helper-plugin-utils");
    },
    4629: module => {
      module.exports = require("@babel/core");
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
    var helperPluginUtils = __webpack_require__(5488), core = __webpack_require__(4629);
    function hasArrayRest(pattern) {
      return pattern.elements.some((elem => core.types.isRestElement(elem)));
    }
    const STOP_TRAVERSAL = {}, arrayUnpackVisitor = (node, ancestors, state) => {
      if (ancestors.length && core.types.isIdentifier(node) && core.types.isReferenced(node, ancestors[ancestors.length - 1].node) && state.bindings[node.name]) throw state.deopt = !0, 
      STOP_TRAVERSAL;
    };
    class DestructuringTransformer {
      constructor(opts) {
        this.blockHoist = void 0, this.operator = void 0, this.arrayRefSet = void 0, this.nodes = void 0, 
        this.scope = void 0, this.kind = void 0, this.iterableIsArray = void 0, this.arrayLikeIsIterable = void 0, 
        this.objectRestNoSymbols = void 0, this.useBuiltIns = void 0, this.addHelper = void 0, 
        this.blockHoist = opts.blockHoist, this.operator = opts.operator, this.arrayRefSet = new Set, 
        this.nodes = opts.nodes || [], this.scope = opts.scope, this.kind = opts.kind, this.iterableIsArray = opts.iterableIsArray, 
        this.arrayLikeIsIterable = opts.arrayLikeIsIterable, this.objectRestNoSymbols = opts.objectRestNoSymbols, 
        this.useBuiltIns = opts.useBuiltIns, this.addHelper = opts.addHelper;
      }
      getExtendsHelper() {
        return this.useBuiltIns ? core.types.memberExpression(core.types.identifier("Object"), core.types.identifier("assign")) : this.addHelper("extends");
      }
      buildVariableAssignment(id, init) {
        let node, op = this.operator;
        if (core.types.isMemberExpression(id) && (op = "="), op) node = core.types.expressionStatement(core.types.assignmentExpression(op, id, core.types.cloneNode(init) || this.scope.buildUndefinedNode())); else {
          let nodeInit;
          nodeInit = "const" === this.kind && null === init ? this.scope.buildUndefinedNode() : core.types.cloneNode(init), 
          node = core.types.variableDeclaration(this.kind, [ core.types.variableDeclarator(id, nodeInit) ]);
        }
        return node._blockHoist = this.blockHoist, node;
      }
      buildVariableDeclaration(id, init) {
        const declar = core.types.variableDeclaration("var", [ core.types.variableDeclarator(core.types.cloneNode(id), core.types.cloneNode(init)) ]);
        return declar._blockHoist = this.blockHoist, declar;
      }
      push(id, _init) {
        const init = core.types.cloneNode(_init);
        core.types.isObjectPattern(id) ? this.pushObjectPattern(id, init) : core.types.isArrayPattern(id) ? this.pushArrayPattern(id, init) : core.types.isAssignmentPattern(id) ? this.pushAssignmentPattern(id, init) : this.nodes.push(this.buildVariableAssignment(id, init));
      }
      toArray(node, count) {
        return this.iterableIsArray || core.types.isIdentifier(node) && this.arrayRefSet.has(node.name) ? node : this.scope.toArray(node, count, this.arrayLikeIsIterable);
      }
      pushAssignmentPattern({left, right}, valueRef) {
        if (null === valueRef) return void this.push(left, right);
        const tempId = this.scope.generateUidIdentifierBasedOnNode(valueRef);
        this.nodes.push(this.buildVariableDeclaration(tempId, valueRef));
        const tempConditional = core.types.conditionalExpression(core.types.binaryExpression("===", core.types.cloneNode(tempId), this.scope.buildUndefinedNode()), right, core.types.cloneNode(tempId));
        if (core.types.isPattern(left)) {
          let patternId, node;
          "const" === this.kind || "let" === this.kind ? (patternId = this.scope.generateUidIdentifier(tempId.name), 
          node = this.buildVariableDeclaration(patternId, tempConditional)) : (patternId = tempId, 
          node = core.types.expressionStatement(core.types.assignmentExpression("=", core.types.cloneNode(tempId), tempConditional))), 
          this.nodes.push(node), this.push(left, patternId);
        } else this.nodes.push(this.buildVariableAssignment(left, tempConditional));
      }
      pushObjectRest(pattern, objRef, spreadProp, spreadPropIndex) {
        const value = function(excludedKeys, objRef, scope, addHelper, objectRestNoSymbols, useBuiltIns) {
          const keys = [];
          let value, allLiteral = !0, hasTemplateLiteral = !1;
          for (let i = 0; i < excludedKeys.length; i++) {
            const prop = excludedKeys[i], key = prop.key;
            core.types.isIdentifier(key) && !prop.computed ? keys.push(core.types.stringLiteral(key.name)) : core.types.isTemplateLiteral(key) ? (keys.push(core.types.cloneNode(key)), 
            hasTemplateLiteral = !0) : core.types.isLiteral(key) ? keys.push(core.types.stringLiteral(String(key.value))) : core.types.isPrivateName(key) || (keys.push(core.types.cloneNode(key)), 
            allLiteral = !1);
          }
          if (0 === keys.length) {
            const extendsHelper = useBuiltIns ? core.types.memberExpression(core.types.identifier("Object"), core.types.identifier("assign")) : addHelper("extends");
            value = core.types.callExpression(extendsHelper, [ core.types.objectExpression([]), core.types.cloneNode(objRef) ]);
          } else {
            let keyExpression = core.types.arrayExpression(keys);
            if (allLiteral) {
              if (!hasTemplateLiteral && !core.types.isProgram(scope.block)) {
                const programScope = scope.getProgramParent(), id = programScope.generateUidIdentifier("excluded");
                programScope.push({
                  id,
                  init: keyExpression,
                  kind: "const"
                }), keyExpression = core.types.cloneNode(id);
              }
            } else keyExpression = core.types.callExpression(core.types.memberExpression(keyExpression, core.types.identifier("map")), [ addHelper("toPropertyKey") ]);
            value = core.types.callExpression(addHelper("objectWithoutProperties" + (objectRestNoSymbols ? "Loose" : "")), [ core.types.cloneNode(objRef), keyExpression ]);
          }
          return value;
        }(pattern.properties.slice(0, spreadPropIndex), objRef, this.scope, (name => this.addHelper(name)), this.objectRestNoSymbols, this.useBuiltIns);
        this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
      }
      pushObjectProperty(prop, propRef) {
        core.types.isLiteral(prop.key) && (prop.computed = !0);
        const pattern = prop.value, objRef = core.types.memberExpression(core.types.cloneNode(propRef), prop.key, prop.computed);
        core.types.isPattern(pattern) ? this.push(pattern, objRef) : this.nodes.push(this.buildVariableAssignment(pattern, objRef));
      }
      pushObjectPattern(pattern, objRef) {
        if (pattern.properties.length && null !== objRef) {
          if (pattern.properties.length > 1 && !this.scope.isStatic(objRef)) {
            const temp = this.scope.generateUidIdentifierBasedOnNode(objRef);
            this.nodes.push(this.buildVariableDeclaration(temp, objRef)), objRef = temp;
          }
          if (function(pattern) {
            return pattern.properties.some((prop => core.types.isRestElement(prop)));
          }(pattern)) {
            let copiedPattern;
            for (let i = 0; i < pattern.properties.length; i++) {
              const prop = pattern.properties[i];
              if (core.types.isRestElement(prop)) break;
              const key = prop.key;
              if (prop.computed && !this.scope.isPure(key)) {
                const name = this.scope.generateUidIdentifierBasedOnNode(key);
                this.nodes.push(this.buildVariableDeclaration(name, key)), copiedPattern || (copiedPattern = pattern = Object.assign({}, pattern, {
                  properties: pattern.properties.slice()
                })), copiedPattern.properties[i] = Object.assign({}, copiedPattern.properties[i], {
                  key: name
                });
              }
            }
          }
          for (let i = 0; i < pattern.properties.length; i++) {
            const prop = pattern.properties[i];
            core.types.isRestElement(prop) ? this.pushObjectRest(pattern, objRef, prop, i) : this.pushObjectProperty(prop, objRef);
          }
        } else this.nodes.push(core.types.expressionStatement(core.types.callExpression(this.addHelper("objectDestructuringEmpty"), null !== objRef ? [ objRef ] : [])));
      }
      canUnpackArrayPattern(pattern, arr) {
        if (!core.types.isArrayExpression(arr)) return !1;
        if (pattern.elements.length > arr.elements.length) return;
        if (pattern.elements.length < arr.elements.length && !hasArrayRest(pattern)) return !1;
        for (const elem of pattern.elements) {
          if (!elem) return !1;
          if (core.types.isMemberExpression(elem)) return !1;
        }
        for (const elem of arr.elements) {
          if (core.types.isSpreadElement(elem)) return !1;
          if (core.types.isCallExpression(elem)) return !1;
          if (core.types.isMemberExpression(elem)) return !1;
        }
        const state = {
          deopt: !1,
          bindings: core.types.getBindingIdentifiers(pattern)
        };
        try {
          core.types.traverse(arr, arrayUnpackVisitor, state);
        } catch (e) {
          if (e !== STOP_TRAVERSAL) throw e;
        }
        return !state.deopt;
      }
      pushUnpackedArrayPattern(pattern, arr) {
        for (let i = 0; i < pattern.elements.length; i++) {
          const elem = pattern.elements[i];
          core.types.isRestElement(elem) ? this.push(elem.argument, core.types.arrayExpression(arr.elements.slice(i))) : this.push(elem, arr.elements[i]);
        }
      }
      pushArrayPattern(pattern, arrayRef) {
        if (null === arrayRef) return void this.nodes.push(core.types.expressionStatement(core.types.callExpression(this.addHelper("objectDestructuringEmpty"), [])));
        if (!pattern.elements) return;
        if (this.canUnpackArrayPattern(pattern, arrayRef)) return this.pushUnpackedArrayPattern(pattern, arrayRef);
        const count = !hasArrayRest(pattern) && pattern.elements.length, toArray = this.toArray(arrayRef, count);
        core.types.isIdentifier(toArray) ? arrayRef = toArray : (arrayRef = this.scope.generateUidIdentifierBasedOnNode(arrayRef), 
        this.arrayRefSet.add(arrayRef.name), this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray)));
        for (let i = 0; i < pattern.elements.length; i++) {
          const elem = pattern.elements[i];
          if (!elem) continue;
          let elemRef;
          core.types.isRestElement(elem) ? (elemRef = this.toArray(arrayRef), elemRef = core.types.callExpression(core.types.memberExpression(elemRef, core.types.identifier("slice")), [ core.types.numericLiteral(i) ]), 
          this.push(elem.argument, elemRef)) : (elemRef = core.types.memberExpression(arrayRef, core.types.numericLiteral(i), !0), 
          this.push(elem, elemRef));
        }
      }
      init(pattern, ref) {
        if (!core.types.isArrayExpression(ref) && !core.types.isMemberExpression(ref)) {
          const memo = this.scope.maybeGenerateMemoised(ref, !0);
          memo && (this.nodes.push(this.buildVariableDeclaration(memo, core.types.cloneNode(ref))), 
          ref = memo);
        }
        return this.push(pattern, ref), this.nodes;
      }
    }
    function variableDeclarationHasPattern(node) {
      for (const declar of node.declarations) if (core.types.isPattern(declar.id)) return !0;
      return !1;
    }
    var index = helperPluginUtils.declare(((api, options) => {
      var _api$assumption, _options$allowArrayLi, _api$assumption2;
      api.assertVersion(7);
      const {useBuiltIns = !1} = options, iterableIsArray = null != (_api$assumption = api.assumption("iterableIsArray")) ? _api$assumption : options.loose, arrayLikeIsIterable = null != (_options$allowArrayLi = options.allowArrayLike) ? _options$allowArrayLi : api.assumption("arrayLikeIsIterable"), objectRestNoSymbols = null != (_api$assumption2 = api.assumption("objectRestNoSymbols")) ? _api$assumption2 : options.loose;
      return {
        name: "transform-destructuring",
        visitor: {
          ExportNamedDeclaration(path) {
            const declaration = path.get("declaration");
            if (!declaration.isVariableDeclaration()) return;
            if (!variableDeclarationHasPattern(declaration.node)) return;
            const specifiers = [];
            for (const name of Object.keys(path.getOuterBindingIdentifiers())) specifiers.push(core.types.exportSpecifier(core.types.identifier(name), core.types.identifier(name)));
            path.replaceWith(declaration.node), path.insertAfter(core.types.exportNamedDeclaration(null, specifiers));
          },
          ForXStatement(path) {
            const {node, scope} = path, left = node.left;
            if (core.types.isPattern(left)) {
              const temp = scope.generateUidIdentifier("ref");
              node.left = core.types.variableDeclaration("var", [ core.types.variableDeclarator(temp) ]), 
              path.ensureBlock();
              const statementBody = node.body.body;
              return 0 === statementBody.length && path.isCompletionRecord() && statementBody.unshift(core.types.expressionStatement(scope.buildUndefinedNode())), 
              void statementBody.unshift(core.types.expressionStatement(core.types.assignmentExpression("=", left, temp)));
            }
            if (!core.types.isVariableDeclaration(left)) return;
            const pattern = left.declarations[0].id;
            if (!core.types.isPattern(pattern)) return;
            const key = scope.generateUidIdentifier("ref");
            node.left = core.types.variableDeclaration(left.kind, [ core.types.variableDeclarator(key, null) ]);
            const nodes = [];
            new DestructuringTransformer({
              kind: left.kind,
              scope,
              nodes,
              arrayLikeIsIterable,
              iterableIsArray,
              objectRestNoSymbols,
              useBuiltIns,
              addHelper: name => this.addHelper(name)
            }).init(pattern, key), path.ensureBlock();
            const block = node.body;
            block.body = nodes.concat(block.body);
          },
          CatchClause({node, scope}) {
            const pattern = node.param;
            if (!core.types.isPattern(pattern)) return;
            const ref = scope.generateUidIdentifier("ref");
            node.param = ref;
            const nodes = [];
            new DestructuringTransformer({
              kind: "let",
              scope,
              nodes,
              arrayLikeIsIterable,
              iterableIsArray,
              objectRestNoSymbols,
              useBuiltIns,
              addHelper: name => this.addHelper(name)
            }).init(pattern, ref), node.body.body = nodes.concat(node.body.body);
          },
          AssignmentExpression(path, state) {
            core.types.isPattern(path.node.left) && function(path, addHelper, arrayLikeIsIterable, iterableIsArray, objectRestNoSymbols, useBuiltIns) {
              const {node, scope} = path, nodes = [], destructuring = new DestructuringTransformer({
                operator: node.operator,
                scope,
                nodes,
                arrayLikeIsIterable,
                iterableIsArray,
                objectRestNoSymbols,
                useBuiltIns,
                addHelper
              });
              let ref;
              !path.isCompletionRecord() && path.parentPath.isExpressionStatement() || (ref = scope.generateUidIdentifierBasedOnNode(node.right, "ref"), 
              nodes.push(core.types.variableDeclaration("var", [ core.types.variableDeclarator(ref, node.right) ])), 
              core.types.isArrayExpression(node.right) && destructuring.arrayRefSet.add(ref.name)), 
              destructuring.init(node.left, ref || node.right), ref && (path.parentPath.isArrowFunctionExpression() ? (path.replaceWith(core.types.blockStatement([])), 
              nodes.push(core.types.returnStatement(core.types.cloneNode(ref)))) : nodes.push(core.types.expressionStatement(core.types.cloneNode(ref)))), 
              path.replaceWithMultiple(nodes), path.scope.crawl();
            }(path, (name => state.addHelper(name)), arrayLikeIsIterable, iterableIsArray, objectRestNoSymbols, useBuiltIns);
          },
          VariableDeclaration(path, state) {
            const {node, parent} = path;
            core.types.isForXStatement(parent) || parent && path.container && variableDeclarationHasPattern(node) && function(path, addHelper, arrayLikeIsIterable, iterableIsArray, objectRestNoSymbols, useBuiltIns) {
              const {node, scope} = path, nodeKind = node.kind, nodeLoc = node.loc, nodes = [];
              for (let i = 0; i < node.declarations.length; i++) {
                const declar = node.declarations[i], patternId = declar.init, pattern = declar.id, destructuring = new DestructuringTransformer({
                  blockHoist: node._blockHoist,
                  nodes,
                  scope,
                  kind: node.kind,
                  iterableIsArray,
                  arrayLikeIsIterable,
                  useBuiltIns,
                  objectRestNoSymbols,
                  addHelper
                });
                core.types.isPattern(pattern) ? (destructuring.init(pattern, patternId), +i != node.declarations.length - 1 && core.types.inherits(nodes[nodes.length - 1], declar)) : nodes.push(core.types.inherits(destructuring.buildVariableAssignment(pattern, patternId), declar));
              }
              let tail = null;
              const nodesOut = [];
              for (const node of nodes) null !== tail && core.types.isVariableDeclaration(node) ? tail.declarations.push(...node.declarations) : (node.kind = nodeKind, 
              node.loc || (node.loc = nodeLoc), nodesOut.push(node), tail = core.types.isVariableDeclaration(node) ? node : null);
              for (const nodeOut of nodesOut) if (nodeOut.declarations) for (const declaration of nodeOut.declarations) {
                const {name} = declaration.id;
                scope.bindings[name] && (scope.bindings[name].kind = nodeOut.kind);
              }
              1 === nodesOut.length ? path.replaceWith(nodesOut[0]) : path.replaceWithMultiple(nodesOut);
            }(path, (name => state.addHelper(name)), arrayLikeIsIterable, iterableIsArray, objectRestNoSymbols, useBuiltIns);
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