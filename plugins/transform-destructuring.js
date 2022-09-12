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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 511);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  511: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose = !1, useBuiltIns: useBuiltIns = !1, allowArrayLike: allowArrayLike = !1} = options;
      if ("boolean" != typeof loose) throw new Error(".loose must be a boolean or undefined");
      const arrayOnlySpread = loose;
      function variableDeclarationHasPattern(node) {
        for (const declar of node.declarations) if (_core.types.isPattern(declar.id)) return !0;
        return !1;
      }
      function hasRest(pattern) {
        for (const elem of pattern.elements) if (_core.types.isRestElement(elem)) return !0;
        return !1;
      }
      const STOP_TRAVERSAL = {}, arrayUnpackVisitor = (node, ancestors, state) => {
        if (ancestors.length && _core.types.isIdentifier(node) && _core.types.isReferenced(node, ancestors[ancestors.length - 1]) && state.bindings[node.name]) throw state.deopt = !0, 
        STOP_TRAVERSAL;
      };
      class DestructuringTransformer {
        constructor(opts) {
          this.blockHoist = opts.blockHoist, this.operator = opts.operator, this.arrays = {}, 
          this.nodes = opts.nodes || [], this.scope = opts.scope, this.kind = opts.kind, this.arrayOnlySpread = opts.arrayOnlySpread, 
          this.allowArrayLike = opts.allowArrayLike, this.addHelper = opts.addHelper;
        }
        buildVariableAssignment(id, init) {
          let node, op = this.operator;
          return _core.types.isMemberExpression(id) && (op = "="), node = op ? _core.types.expressionStatement(_core.types.assignmentExpression(op, id, _core.types.cloneNode(init) || this.scope.buildUndefinedNode())) : _core.types.variableDeclaration(this.kind, [ _core.types.variableDeclarator(id, _core.types.cloneNode(init)) ]), 
          node._blockHoist = this.blockHoist, node;
        }
        buildVariableDeclaration(id, init) {
          const declar = _core.types.variableDeclaration("var", [ _core.types.variableDeclarator(_core.types.cloneNode(id), _core.types.cloneNode(init)) ]);
          return declar._blockHoist = this.blockHoist, declar;
        }
        push(id, _init) {
          const init = _core.types.cloneNode(_init);
          _core.types.isObjectPattern(id) ? this.pushObjectPattern(id, init) : _core.types.isArrayPattern(id) ? this.pushArrayPattern(id, init) : _core.types.isAssignmentPattern(id) ? this.pushAssignmentPattern(id, init) : this.nodes.push(this.buildVariableAssignment(id, init));
        }
        toArray(node, count) {
          return this.arrayOnlySpread || _core.types.isIdentifier(node) && this.arrays[node.name] ? node : this.scope.toArray(node, count, this.allowArrayLike);
        }
        pushAssignmentPattern({left: left, right: right}, valueRef) {
          const tempId = this.scope.generateUidIdentifierBasedOnNode(valueRef);
          this.nodes.push(this.buildVariableDeclaration(tempId, valueRef));
          const tempConditional = _core.types.conditionalExpression(_core.types.binaryExpression("===", _core.types.cloneNode(tempId), this.scope.buildUndefinedNode()), right, _core.types.cloneNode(tempId));
          if (_core.types.isPattern(left)) {
            let patternId, node;
            "const" === this.kind || "let" === this.kind ? (patternId = this.scope.generateUidIdentifier(tempId.name), 
            node = this.buildVariableDeclaration(patternId, tempConditional)) : (patternId = tempId, 
            node = _core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.cloneNode(tempId), tempConditional))), 
            this.nodes.push(node), this.push(left, patternId);
          } else this.nodes.push(this.buildVariableAssignment(left, tempConditional));
        }
        pushObjectRest(pattern, objRef, spreadProp, spreadPropIndex) {
          const keys = [];
          let value, allLiteral = !0;
          for (let i = 0; i < pattern.properties.length; i++) {
            const prop = pattern.properties[i];
            if (i >= spreadPropIndex) break;
            if (_core.types.isRestElement(prop)) continue;
            const key = prop.key;
            _core.types.isIdentifier(key) && !prop.computed ? keys.push(_core.types.stringLiteral(key.name)) : _core.types.isTemplateLiteral(prop.key) ? keys.push(_core.types.cloneNode(prop.key)) : _core.types.isLiteral(key) ? keys.push(_core.types.stringLiteral(String(key.value))) : (keys.push(_core.types.cloneNode(key)), 
            allLiteral = !1);
          }
          if (0 === keys.length) value = _core.types.callExpression((file = this, useBuiltIns ? _core.types.memberExpression(_core.types.identifier("Object"), _core.types.identifier("assign")) : file.addHelper("extends")), [ _core.types.objectExpression([]), _core.types.cloneNode(objRef) ]); else {
            let keyExpression = _core.types.arrayExpression(keys);
            allLiteral || (keyExpression = _core.types.callExpression(_core.types.memberExpression(keyExpression, _core.types.identifier("map")), [ this.addHelper("toPropertyKey") ])), 
            value = _core.types.callExpression(this.addHelper("objectWithoutProperties" + (loose ? "Loose" : "")), [ _core.types.cloneNode(objRef), keyExpression ]);
          }
          var file;
          this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
        }
        pushObjectProperty(prop, propRef) {
          _core.types.isLiteral(prop.key) && (prop.computed = !0);
          const pattern = prop.value, objRef = _core.types.memberExpression(_core.types.cloneNode(propRef), prop.key, prop.computed);
          _core.types.isPattern(pattern) ? this.push(pattern, objRef) : this.nodes.push(this.buildVariableAssignment(pattern, objRef));
        }
        pushObjectPattern(pattern, objRef) {
          if (pattern.properties.length || this.nodes.push(_core.types.expressionStatement(_core.types.callExpression(this.addHelper("objectDestructuringEmpty"), [ objRef ]))), 
          pattern.properties.length > 1 && !this.scope.isStatic(objRef)) {
            const temp = this.scope.generateUidIdentifierBasedOnNode(objRef);
            this.nodes.push(this.buildVariableDeclaration(temp, objRef)), objRef = temp;
          }
          if (function(pattern) {
            for (const elem of pattern.properties) if (_core.types.isRestElement(elem)) return !0;
            return !1;
          }(pattern)) {
            let copiedPattern;
            for (let i = 0; i < pattern.properties.length; i++) {
              const prop = pattern.properties[i];
              if (_core.types.isRestElement(prop)) break;
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
            _core.types.isRestElement(prop) ? this.pushObjectRest(pattern, objRef, prop, i) : this.pushObjectProperty(prop, objRef);
          }
        }
        canUnpackArrayPattern(pattern, arr) {
          if (!_core.types.isArrayExpression(arr)) return !1;
          if (pattern.elements.length > arr.elements.length) return;
          if (pattern.elements.length < arr.elements.length && !hasRest(pattern)) return !1;
          for (const elem of pattern.elements) {
            if (!elem) return !1;
            if (_core.types.isMemberExpression(elem)) return !1;
          }
          for (const elem of arr.elements) {
            if (_core.types.isSpreadElement(elem)) return !1;
            if (_core.types.isCallExpression(elem)) return !1;
            if (_core.types.isMemberExpression(elem)) return !1;
          }
          const state = {
            deopt: !1,
            bindings: _core.types.getBindingIdentifiers(pattern)
          };
          try {
            _core.types.traverse(arr, arrayUnpackVisitor, state);
          } catch (e) {
            if (e !== STOP_TRAVERSAL) throw e;
          }
          return !state.deopt;
        }
        pushUnpackedArrayPattern(pattern, arr) {
          for (let i = 0; i < pattern.elements.length; i++) {
            const elem = pattern.elements[i];
            _core.types.isRestElement(elem) ? this.push(elem.argument, _core.types.arrayExpression(arr.elements.slice(i))) : this.push(elem, arr.elements[i]);
          }
        }
        pushArrayPattern(pattern, arrayRef) {
          if (!pattern.elements) return;
          if (this.canUnpackArrayPattern(pattern, arrayRef)) return this.pushUnpackedArrayPattern(pattern, arrayRef);
          const count = !hasRest(pattern) && pattern.elements.length, toArray = this.toArray(arrayRef, count);
          _core.types.isIdentifier(toArray) ? arrayRef = toArray : (arrayRef = this.scope.generateUidIdentifierBasedOnNode(arrayRef), 
          this.arrays[arrayRef.name] = !0, this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray)));
          for (let i = 0; i < pattern.elements.length; i++) {
            let elemRef, elem = pattern.elements[i];
            elem && (_core.types.isRestElement(elem) ? (elemRef = this.toArray(arrayRef), elemRef = _core.types.callExpression(_core.types.memberExpression(elemRef, _core.types.identifier("slice")), [ _core.types.numericLiteral(i) ]), 
            elem = elem.argument) : elemRef = _core.types.memberExpression(arrayRef, _core.types.numericLiteral(i), !0), 
            this.push(elem, elemRef));
          }
        }
        init(pattern, ref) {
          if (!_core.types.isArrayExpression(ref) && !_core.types.isMemberExpression(ref)) {
            const memo = this.scope.maybeGenerateMemoised(ref, !0);
            memo && (this.nodes.push(this.buildVariableDeclaration(memo, _core.types.cloneNode(ref))), 
            ref = memo);
          }
          return this.push(pattern, ref), this.nodes;
        }
      }
      return {
        name: "transform-destructuring",
        visitor: {
          ExportNamedDeclaration(path) {
            const declaration = path.get("declaration");
            if (!declaration.isVariableDeclaration()) return;
            if (!variableDeclarationHasPattern(declaration.node)) return;
            const specifiers = [];
            for (const name of Object.keys(path.getOuterBindingIdentifiers(path))) specifiers.push(_core.types.exportSpecifier(_core.types.identifier(name), _core.types.identifier(name)));
            path.replaceWith(declaration.node), path.insertAfter(_core.types.exportNamedDeclaration(null, specifiers));
          },
          ForXStatement(path) {
            const {node: node, scope: scope} = path, left = node.left;
            if (_core.types.isPattern(left)) {
              const temp = scope.generateUidIdentifier("ref");
              return node.left = _core.types.variableDeclaration("var", [ _core.types.variableDeclarator(temp) ]), 
              path.ensureBlock(), 0 === node.body.body.length && path.isCompletionRecord() && node.body.body.unshift(_core.types.expressionStatement(scope.buildUndefinedNode())), 
              void node.body.body.unshift(_core.types.expressionStatement(_core.types.assignmentExpression("=", left, temp)));
            }
            if (!_core.types.isVariableDeclaration(left)) return;
            const pattern = left.declarations[0].id;
            if (!_core.types.isPattern(pattern)) return;
            const key = scope.generateUidIdentifier("ref");
            node.left = _core.types.variableDeclaration(left.kind, [ _core.types.variableDeclarator(key, null) ]);
            const nodes = [];
            new DestructuringTransformer({
              kind: left.kind,
              scope: scope,
              nodes: nodes,
              arrayOnlySpread: arrayOnlySpread,
              allowArrayLike: allowArrayLike,
              addHelper: name => this.addHelper(name)
            }).init(pattern, key), path.ensureBlock();
            const block = node.body;
            block.body = nodes.concat(block.body);
          },
          CatchClause({node: node, scope: scope}) {
            const pattern = node.param;
            if (!_core.types.isPattern(pattern)) return;
            const ref = scope.generateUidIdentifier("ref");
            node.param = ref;
            const nodes = [];
            new DestructuringTransformer({
              kind: "let",
              scope: scope,
              nodes: nodes,
              arrayOnlySpread: arrayOnlySpread,
              allowArrayLike: allowArrayLike,
              addHelper: name => this.addHelper(name)
            }).init(pattern, ref), node.body.body = nodes.concat(node.body.body);
          },
          AssignmentExpression(path) {
            const {node: node, scope: scope} = path;
            if (!_core.types.isPattern(node.left)) return;
            const nodes = [], destructuring = new DestructuringTransformer({
              operator: node.operator,
              scope: scope,
              nodes: nodes,
              arrayOnlySpread: arrayOnlySpread,
              allowArrayLike: allowArrayLike,
              addHelper: name => this.addHelper(name)
            });
            let ref;
            !path.isCompletionRecord() && path.parentPath.isExpressionStatement() || (ref = scope.generateUidIdentifierBasedOnNode(node.right, "ref"), 
            nodes.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(ref, node.right) ])), 
            _core.types.isArrayExpression(node.right) && (destructuring.arrays[ref.name] = !0)), 
            destructuring.init(node.left, ref || node.right), ref && (path.parentPath.isArrowFunctionExpression() ? (path.replaceWith(_core.types.blockStatement([])), 
            nodes.push(_core.types.returnStatement(_core.types.cloneNode(ref)))) : nodes.push(_core.types.expressionStatement(_core.types.cloneNode(ref)))), 
            path.replaceWithMultiple(nodes), path.scope.crawl();
          },
          VariableDeclaration(path) {
            const {node: node, scope: scope, parent: parent} = path;
            if (_core.types.isForXStatement(parent)) return;
            if (!parent || !path.container) return;
            if (!variableDeclarationHasPattern(node)) return;
            const nodeKind = node.kind, nodes = [];
            let declar;
            for (let i = 0; i < node.declarations.length; i++) {
              declar = node.declarations[i];
              const patternId = declar.init, pattern = declar.id, destructuring = new DestructuringTransformer({
                blockHoist: node._blockHoist,
                nodes: nodes,
                scope: scope,
                kind: node.kind,
                arrayOnlySpread: arrayOnlySpread,
                allowArrayLike: allowArrayLike,
                addHelper: name => this.addHelper(name)
              });
              _core.types.isPattern(pattern) ? (destructuring.init(pattern, patternId), +i != node.declarations.length - 1 && _core.types.inherits(nodes[nodes.length - 1], declar)) : nodes.push(_core.types.inherits(destructuring.buildVariableAssignment(declar.id, _core.types.cloneNode(declar.init)), declar));
            }
            let tail = null;
            const nodesOut = [];
            for (const node of nodes) null !== tail && _core.types.isVariableDeclaration(node) ? tail.declarations.push(...node.declarations) : (node.kind = nodeKind, 
            nodesOut.push(node), tail = _core.types.isVariableDeclaration(node) ? node : null);
            for (const nodeOut of nodesOut) if (nodeOut.declarations) for (const declaration of nodeOut.declarations) {
              const {name: name} = declaration.id;
              scope.bindings[name] && (scope.bindings[name].kind = nodeOut.kind);
            }
            1 === nodesOut.length ? path.replaceWith(nodesOut[0]) : path.replaceWithMultiple(nodesOut);
          }
        }
      };
    });
    exports.default = _default;
  }
});