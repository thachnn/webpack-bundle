(() => {
  "use strict";
  var __webpack_modules__ = {
    4601: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.visitor = void 0;
      var _core = __webpack_require__(4629);
      function isReference(node, scope, state) {
        const declared = state.letReferences.get(node.name);
        return !!declared && scope.getBindingIdentifier(node.name) === declared;
      }
      const visitedMaybeTDZNodes = new WeakSet, visitor = {
        ReferencedIdentifier(path, state) {
          if (!state.tdzEnabled) return;
          const {node, parent, scope} = path;
          if (path.parentPath.isFor({
            left: node
          })) return;
          if (!isReference(node, scope, state)) return;
          const bindingPath = scope.getBinding(node.name).path;
          if (bindingPath.isFunctionDeclaration()) return;
          const status = function(refPath, bindingPath) {
            const executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);
            return "before" === executionStatus ? "outside" : "after" === executionStatus ? "inside" : "maybe";
          }(path, bindingPath);
          if ("outside" !== status) if ("maybe" === status) {
            if (visitedMaybeTDZNodes.has(node)) return;
            visitedMaybeTDZNodes.add(node);
            const assert = function(node, state) {
              return _core.types.callExpression(state.addHelper("temporalRef"), [ node, _core.types.stringLiteral(node.name) ]);
            }(node, state);
            if (bindingPath.parent._tdzThis = !0, path.parentPath.isUpdateExpression()) {
              if (parent._ignoreBlockScopingTDZ) return;
              path.parentPath.replaceWith(_core.types.sequenceExpression([ assert, parent ]));
            } else path.replaceWith(assert);
          } else "inside" === status && path.replaceWith(_core.template.ast`${state.addHelper("tdz")}("${node.name}")`);
        },
        AssignmentExpression: {
          exit(path, state) {
            if (!state.tdzEnabled) return;
            const {node} = path;
            if (node._ignoreBlockScopingTDZ) return;
            const nodes = [], ids = path.getBindingIdentifiers();
            for (const name of Object.keys(ids)) {
              const id = ids[name];
              isReference(id, path.scope, state) && nodes.push(id);
            }
            nodes.length && (node._ignoreBlockScopingTDZ = !0, nodes.push(node), path.replaceWithMultiple(nodes.map((n => _core.types.expressionStatement(n)))));
          }
        }
      };
      exports.visitor = visitor;
    },
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
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(5488), _tdz = __webpack_require__(4601), _core = __webpack_require__(4629);
    const DONE = new WeakSet;
    var _default = (0, _helperPluginUtils.declare)(((api, opts) => {
      api.assertVersion(7);
      const {throwIfClosureRequired = !1, tdz: tdzEnabled = !1} = opts;
      if ("boolean" != typeof throwIfClosureRequired) throw new Error(".throwIfClosureRequired must be a boolean, or undefined");
      if ("boolean" != typeof tdzEnabled) throw new Error(".tdz must be a boolean, or undefined");
      return {
        name: "transform-block-scoping",
        visitor: {
          VariableDeclaration(path) {
            const {node, parent, scope} = path;
            if (isBlockScoped(node) && (convertBlockScopedToVar(path, null, parent, scope, !0), 
            node._tdzThis)) {
              const nodes = [ node ];
              for (let i = 0; i < node.declarations.length; i++) {
                const decl = node.declarations[i], assign = _core.types.assignmentExpression("=", _core.types.cloneNode(decl.id), decl.init || scope.buildUndefinedNode());
                assign._ignoreBlockScopingTDZ = !0, nodes.push(_core.types.expressionStatement(assign)), 
                decl.init = this.addHelper("temporalUndefined");
              }
              node._blockHoist = 2, path.isCompletionRecord() && nodes.push(_core.types.expressionStatement(scope.buildUndefinedNode())), 
              path.replaceWithMultiple(nodes);
            }
          },
          Loop(path, state) {
            const {parent, scope} = path;
            path.ensureBlock();
            const replace = new BlockScoping(path, path.get("body"), parent, scope, throwIfClosureRequired, tdzEnabled, state).run();
            replace && path.replaceWith(replace);
          },
          CatchClause(path, state) {
            const {parent, scope} = path;
            new BlockScoping(null, path.get("body"), parent, scope, throwIfClosureRequired, tdzEnabled, state).run();
          },
          "BlockStatement|SwitchStatement|Program"(path, state) {
            if (!function(path) {
              return _core.types.isLoop(path.parent) || _core.types.isCatchClause(path.parent);
            }(path)) {
              new BlockScoping(null, path, path.parent, path.scope, throwIfClosureRequired, tdzEnabled, state).run();
            }
          }
        }
      };
    }));
    exports.default = _default;
    const buildRetCheck = (0, _core.template)('\n  if (typeof RETURN === "object") return RETURN.v;\n');
    function isBlockScoped(node) {
      return !!_core.types.isVariableDeclaration(node) && (!!node[_core.types.BLOCK_SCOPED_SYMBOL] || ("let" === node.kind || "const" === node.kind));
    }
    function isInLoop(path) {
      const loopOrFunctionParent = path.find((path => path.isLoop() || path.isFunction()));
      return null == loopOrFunctionParent ? void 0 : loopOrFunctionParent.isLoop();
    }
    function convertBlockScopedToVar(path, node, parent, scope, moveBindingsToParent = !1) {
      if (node || (node = path.node), isInLoop(path) && !_core.types.isFor(parent)) for (let i = 0; i < node.declarations.length; i++) {
        const declar = node.declarations[i];
        declar.init = declar.init || scope.buildUndefinedNode();
      }
      if (node[_core.types.BLOCK_SCOPED_SYMBOL] = !0, node.kind = "var", moveBindingsToParent) {
        const parentScope = scope.getFunctionParent() || scope.getProgramParent();
        for (const name of Object.keys(path.getBindingIdentifiers())) {
          const binding = scope.getOwnBinding(name);
          binding && (binding.kind = "var"), scope.moveBindingTo(name, parentScope);
        }
      }
    }
    function isVar(node) {
      return _core.types.isVariableDeclaration(node, {
        kind: "var"
      }) && !isBlockScoped(node);
    }
    const letReferenceBlockVisitor = _core.traverse.visitors.merge([ {
      Loop: {
        enter(path, state) {
          state.loopDepth++;
        },
        exit(path, state) {
          state.loopDepth--;
        }
      },
      FunctionParent: (path, state) => (state.loopDepth > 0 ? path.traverse(letReferenceFunctionVisitor, state) : path.traverse(_tdz.visitor, state), 
      path.skip())
    }, _tdz.visitor ]), letReferenceFunctionVisitor = _core.traverse.visitors.merge([ {
      ReferencedIdentifier(path, state) {
        const ref = state.letReferences.get(path.node.name);
        if (!ref) return;
        const localBinding = path.scope.getBindingIdentifier(path.node.name);
        localBinding && localBinding !== ref || (state.closurify = !0);
      }
    }, _tdz.visitor ]), hoistVarDeclarationsVisitor = {
      enter(path, self) {
        if (path.isForStatement()) {
          const {node} = path;
          if (isVar(node.init)) {
            const nodes = self.pushDeclar(node.init);
            1 === nodes.length ? node.init = nodes[0] : node.init = _core.types.sequenceExpression(nodes);
          }
        } else if (path.isForInStatement() || path.isForOfStatement()) {
          const {node} = path;
          isVar(node.left) && (self.pushDeclar(node.left), node.left = node.left.declarations[0].id);
        } else if (isVar(path.node)) path.replaceWithMultiple(self.pushDeclar(path.node).map((expr => _core.types.expressionStatement(expr)))); else if (path.isFunction()) return path.skip();
      }
    }, loopLabelVisitor = {
      LabeledStatement({node}, state) {
        state.innerLabels.push(node.label.name);
      }
    }, continuationVisitor = {
      enter(path, state) {
        if (path.isAssignmentExpression() || path.isUpdateExpression()) for (const name of Object.keys(path.getBindingIdentifiers())) state.outsideReferences.get(name) === path.scope.getBindingIdentifier(name) && (state.reassignments[name] = !0); else path.isReturnStatement() && state.returnStatements.push(path);
      }
    };
    const loopVisitor = {
      Loop(path, state) {
        const oldIgnoreLabeless = state.ignoreLabeless;
        state.ignoreLabeless = !0, path.traverse(loopVisitor, state), state.ignoreLabeless = oldIgnoreLabeless, 
        path.skip();
      },
      Function(path) {
        path.skip();
      },
      SwitchCase(path, state) {
        const oldInSwitchCase = state.inSwitchCase;
        state.inSwitchCase = !0, path.traverse(loopVisitor, state), state.inSwitchCase = oldInSwitchCase, 
        path.skip();
      },
      "BreakStatement|ContinueStatement|ReturnStatement"(path, state) {
        const {node, scope} = path;
        if (node[this.LOOP_IGNORE]) return;
        let replace, loopText = function(node) {
          return _core.types.isBreakStatement(node) ? "break" : _core.types.isContinueStatement(node) ? "continue" : void 0;
        }(node);
        if (loopText) {
          if (_core.types.isReturnStatement(node)) throw new Error("Internal error: unexpected return statement with `loopText`");
          if (node.label) {
            if (state.innerLabels.indexOf(node.label.name) >= 0) return;
            loopText = `${loopText}|${node.label.name}`;
          } else {
            if (state.ignoreLabeless) return;
            if (_core.types.isBreakStatement(node) && state.inSwitchCase) return;
          }
          state.hasBreakContinue = !0, state.map[loopText] = node, replace = _core.types.stringLiteral(loopText);
        }
        _core.types.isReturnStatement(node) && (state.hasReturn = !0, replace = _core.types.objectExpression([ _core.types.objectProperty(_core.types.identifier("v"), node.argument || scope.buildUndefinedNode()) ])), 
        replace && (replace = _core.types.returnStatement(replace), replace[this.LOOP_IGNORE] = !0, 
        path.skip(), path.replaceWith(_core.types.inherits(replace, node)));
      }
    };
    class BlockScoping {
      constructor(loopPath, blockPath, parent, scope, throwIfClosureRequired, tdzEnabled, state) {
        this.parent = void 0, this.state = void 0, this.scope = void 0, this.throwIfClosureRequired = void 0, 
        this.tdzEnabled = void 0, this.blockPath = void 0, this.block = void 0, this.outsideLetReferences = void 0, 
        this.hasLetReferences = void 0, this.letReferences = void 0, this.body = void 0, 
        this.loopParent = void 0, this.loopLabel = void 0, this.loopPath = void 0, this.loop = void 0, 
        this.has = void 0, this.parent = parent, this.scope = scope, this.state = state, 
        this.throwIfClosureRequired = throwIfClosureRequired, this.tdzEnabled = tdzEnabled, 
        this.blockPath = blockPath, this.block = blockPath.node, this.outsideLetReferences = new Map, 
        this.hasLetReferences = !1, this.letReferences = new Map, this.body = [], loopPath && (this.loopParent = loopPath.parent, 
        this.loopLabel = _core.types.isLabeledStatement(this.loopParent) && this.loopParent.label, 
        this.loopPath = loopPath, this.loop = loopPath.node);
      }
      run() {
        const block = this.block;
        if (DONE.has(block)) return;
        DONE.add(block);
        const needsClosure = this.getLetReferences();
        if (this.checkConstants(), _core.types.isFunction(this.parent) || _core.types.isProgram(this.block)) this.updateScopeInfo(); else if (this.hasLetReferences) return needsClosure ? this.wrapClosure() : this.remap(), 
        this.updateScopeInfo(needsClosure), this.loopLabel && !_core.types.isLabeledStatement(this.loopParent) ? _core.types.labeledStatement(this.loopLabel, this.loop) : void 0;
      }
      checkConstants() {
        const scope = this.scope, state = this.state;
        for (const name of Object.keys(scope.bindings)) {
          const binding = scope.bindings[name];
          if ("const" === binding.kind) for (const violation of binding.constantViolations) {
            const readOnlyError = state.addHelper("readOnlyError"), throwNode = _core.types.callExpression(readOnlyError, [ _core.types.stringLiteral(name) ]);
            if (violation.isAssignmentExpression()) {
              const {operator} = violation.node;
              "=" === operator ? violation.replaceWith(_core.types.sequenceExpression([ violation.get("right").node, throwNode ])) : [ "&&=", "||=", "??=" ].includes(operator) ? violation.replaceWith(_core.types.logicalExpression(operator.slice(0, -1), violation.get("left").node, _core.types.sequenceExpression([ violation.get("right").node, throwNode ]))) : violation.replaceWith(_core.types.sequenceExpression([ _core.types.binaryExpression(operator.slice(0, -1), violation.get("left").node, violation.get("right").node), throwNode ]));
            } else violation.isUpdateExpression() ? violation.replaceWith(_core.types.sequenceExpression([ _core.types.unaryExpression("+", violation.get("argument").node), throwNode ])) : violation.isForXStatement() && (violation.ensureBlock(), 
            violation.get("left").replaceWith(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(violation.scope.generateUidIdentifier(name)) ])), 
            violation.node.body.body.unshift(_core.types.expressionStatement(throwNode)));
          }
        }
      }
      updateScopeInfo(wrappedInClosure) {
        const blockScope = this.blockPath.scope, parentScope = blockScope.getFunctionParent() || blockScope.getProgramParent(), letRefs = this.letReferences;
        for (const key of letRefs.keys()) {
          const ref = letRefs.get(key), binding = blockScope.getBinding(ref.name);
          binding && ("let" !== binding.kind && "const" !== binding.kind || (binding.kind = "var", 
          wrappedInClosure ? blockScope.hasOwnBinding(ref.name) && blockScope.removeBinding(ref.name) : blockScope.moveBindingTo(ref.name, parentScope)));
        }
      }
      remap() {
        const letRefs = this.letReferences, outsideLetRefs = this.outsideLetReferences, scope = this.scope, blockPathScope = this.blockPath.scope;
        for (const key of letRefs.keys()) {
          const ref = letRefs.get(key);
          if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
            const binding = scope.getOwnBinding(key);
            if (binding) {
              const parentBinding = scope.parent.getOwnBinding(key);
              if ("hoisted" === binding.kind && !binding.path.node.async && !binding.path.node.generator && (!parentBinding || isVar(parentBinding.path.parent)) && !binding.path.parentPath.find((({node}) => {
                if (_core.types.isProgram(node)) {
                  if ("module" === node.sourceType) return !0;
                } else if (!_core.types.isBlockStatement(node)) return !1;
                return node.directives.some((directive => "use strict" === directive.value.value));
              }))) continue;
              scope.rename(ref.name);
            }
            blockPathScope.hasOwnBinding(key) && blockPathScope.rename(ref.name);
          }
        }
        for (const key of outsideLetRefs.keys()) {
          const ref = letRefs.get(key);
          isInLoop(this.blockPath) && blockPathScope.hasOwnBinding(key) && blockPathScope.rename(ref.name);
        }
      }
      wrapClosure() {
        if (this.throwIfClosureRequired) throw this.blockPath.buildCodeFrameError("Compiling let/const in this block would add a closure (throwIfClosureRequired).");
        const block = this.block, outsideRefs = this.outsideLetReferences;
        if (this.loop) for (const name of Array.from(outsideRefs.keys())) {
          const id = outsideRefs.get(name);
          (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) && (outsideRefs.delete(id.name), 
          this.letReferences.delete(id.name), this.scope.rename(id.name), this.letReferences.set(id.name, id), 
          outsideRefs.set(id.name, id));
        }
        this.has = this.checkLoop(), this.hoistVarDeclarations();
        const args = Array.from(outsideRefs.values(), (node => _core.types.cloneNode(node))), params = args.map((id => _core.types.cloneNode(id))), isSwitch = this.blockPath.isSwitchStatement(), fn = _core.types.functionExpression(null, params, _core.types.blockStatement(isSwitch ? [ block ] : block.body));
        this.addContinuations(fn);
        let call = _core.types.callExpression(_core.types.nullLiteral(), args), basePath = ".callee";
        _core.traverse.hasType(fn.body, "YieldExpression", _core.types.FUNCTION_TYPES) && (fn.generator = !0, 
        call = _core.types.yieldExpression(call, !0), basePath = ".argument" + basePath);
        let placeholderPath, index, callPath;
        if (_core.traverse.hasType(fn.body, "AwaitExpression", _core.types.FUNCTION_TYPES) && (fn.async = !0, 
        call = _core.types.awaitExpression(call), basePath = ".argument" + basePath), this.has.hasReturn || this.has.hasBreakContinue) {
          const ret = this.scope.generateUid("ret");
          this.body.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(_core.types.identifier(ret), call) ])), 
          placeholderPath = "declarations.0.init" + basePath, index = this.body.length - 1, 
          this.buildHas(ret);
        } else this.body.push(_core.types.expressionStatement(call)), placeholderPath = "expression" + basePath, 
        index = this.body.length - 1;
        if (isSwitch) {
          const {parentPath, listKey, key} = this.blockPath;
          this.blockPath.replaceWithMultiple(this.body), callPath = parentPath.get(listKey)[key + index];
        } else block.body = this.body, callPath = this.blockPath.get("body")[index];
        const placeholder = callPath.get(placeholderPath);
        let fnPath;
        if (this.loop) {
          const loopId = this.scope.generateUid("loop"), p = this.loopPath.insertBefore(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(_core.types.identifier(loopId), fn) ]));
          placeholder.replaceWith(_core.types.identifier(loopId)), fnPath = p[0].get("declarations.0.init");
        } else placeholder.replaceWith(fn), fnPath = placeholder;
        fnPath.unwrapFunctionEnvironment();
      }
      addContinuations(fn) {
        const state = {
          reassignments: {},
          returnStatements: [],
          outsideReferences: this.outsideLetReferences
        };
        this.scope.traverse(fn, continuationVisitor, state);
        for (let i = 0; i < fn.params.length; i++) {
          const param = fn.params[i];
          if (!state.reassignments[param.name]) continue;
          const paramName = param.name, newParamName = this.scope.generateUid(param.name);
          fn.params[i] = _core.types.identifier(newParamName), this.scope.rename(paramName, newParamName, fn), 
          state.returnStatements.forEach((returnStatement => {
            returnStatement.insertBefore(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.identifier(paramName), _core.types.identifier(newParamName))));
          })), fn.body.body.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.identifier(paramName), _core.types.identifier(newParamName))));
        }
      }
      getLetReferences() {
        const block = this.block, declarators = [];
        if (this.loop) {
          const init = this.loop.left || this.loop.init;
          if (isBlockScoped(init)) {
            declarators.push(init);
            const names = _core.types.getBindingIdentifiers(init);
            for (const name of Object.keys(names)) this.outsideLetReferences.set(name, names[name]);
          }
        }
        const addDeclarationsFromChild = (path, node) => {
          if (node = node || path.node, _core.types.isClassDeclaration(node) || _core.types.isFunctionDeclaration(node) || isBlockScoped(node)) if (isBlockScoped(node) && convertBlockScopedToVar(path, node, block, this.scope), 
          node.declarations) for (let i = 0; i < node.declarations.length; i++) declarators.push(node.declarations[i]); else declarators.push(node);
          _core.types.isLabeledStatement(node) && addDeclarationsFromChild(path.get("body"), node.body);
        };
        if (block.body) {
          const declarPaths = this.blockPath.get("body");
          for (let i = 0; i < block.body.length; i++) addDeclarationsFromChild(declarPaths[i]);
        }
        if (block.cases) {
          const declarPaths = this.blockPath.get("cases");
          for (let i = 0; i < block.cases.length; i++) {
            const consequents = block.cases[i].consequent;
            for (let j = 0; j < consequents.length; j++) {
              const declar = consequents[j];
              addDeclarationsFromChild(declarPaths[i], declar);
            }
          }
        }
        for (let i = 0; i < declarators.length; i++) {
          const declar = declarators[i], keys = _core.types.getBindingIdentifiers(declar, !1, !0);
          for (const key of Object.keys(keys)) this.letReferences.set(key, keys[key]);
          this.hasLetReferences = !0;
        }
        if (!this.hasLetReferences) return;
        const state = {
          letReferences: this.letReferences,
          closurify: !1,
          loopDepth: 0,
          tdzEnabled: this.tdzEnabled,
          addHelper: name => this.state.addHelper(name)
        };
        return isInLoop(this.blockPath) && state.loopDepth++, this.blockPath.traverse(letReferenceBlockVisitor, state), 
        state.closurify;
      }
      checkLoop() {
        const state = {
          hasBreakContinue: !1,
          ignoreLabeless: !1,
          inSwitchCase: !1,
          innerLabels: [],
          hasReturn: !1,
          isLoop: !!this.loop,
          map: {},
          LOOP_IGNORE: Symbol()
        };
        return this.blockPath.traverse(loopLabelVisitor, state), this.blockPath.traverse(loopVisitor, state), 
        state;
      }
      hoistVarDeclarations() {
        this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
      }
      pushDeclar(node) {
        const declars = [], names = _core.types.getBindingIdentifiers(node);
        for (const name of Object.keys(names)) declars.push(_core.types.variableDeclarator(names[name]));
        this.body.push(_core.types.variableDeclaration(node.kind, declars));
        const replace = [];
        for (let i = 0; i < node.declarations.length; i++) {
          const declar = node.declarations[i];
          if (!declar.init) continue;
          const expr = _core.types.assignmentExpression("=", _core.types.cloneNode(declar.id), _core.types.cloneNode(declar.init));
          replace.push(_core.types.inherits(expr, declar));
        }
        return replace;
      }
      buildHas(ret) {
        const body = this.body, has = this.has;
        if (has.hasBreakContinue) for (const key of Object.keys(has.map)) body.push(_core.types.ifStatement(_core.types.binaryExpression("===", _core.types.identifier(ret), _core.types.stringLiteral(key)), has.map[key]));
        has.hasReturn && body.push(buildRetCheck({
          RETURN: _core.types.identifier(ret)
        }));
      }
    }
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();