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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 534);
}({
  10: function(module, exports) {
    module.exports = require("assert");
  },
  109: function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0, exports.wrapWithTypes = function(types, fn) {
      return function() {
        var oldTypes = currentTypes;
        currentTypes = types;
        try {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
          return fn.apply(this, args);
        } finally {
          currentTypes = oldTypes;
        }
      };
    }, exports.getTypes = getTypes, exports.runtimeProperty = function(name) {
      var t = getTypes();
      return t.memberExpression(t.identifier("regeneratorRuntime"), t.identifier(name), !1);
    }, exports.isReference = function(path) {
      return path.isReferenced() || path.parentPath.isAssignmentExpression({
        left: path.node
      });
    }, exports.replaceWithOrRemove = function(path, replacement) {
      replacement ? path.replaceWith(replacement) : path.remove();
    };
    var currentTypes = null;
    function getTypes() {
      return currentTypes;
    }
  },
  129: function(module, exports, __webpack_require__) {
    var _typeof = __webpack_require__(537);
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    module.exports = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" !== _typeof(obj) && "function" != typeof obj) return {
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
    };
  },
  130: function(module, exports) {
    module.exports = function(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    };
  },
  183: function(module, exports) {
    module.exports = require("util");
  },
  236: function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(129), _assert = __webpack_require__(130)(__webpack_require__(10)), leap = _interopRequireWildcard(__webpack_require__(539)), meta = _interopRequireWildcard(__webpack_require__(540)), util = _interopRequireWildcard(__webpack_require__(109)), hasOwn = Object.prototype.hasOwnProperty;
    function Emitter(contextId) {
      _assert.default.ok(this instanceof Emitter), util.getTypes().assertIdentifier(contextId), 
      this.nextTempId = 0, this.contextId = contextId, this.listing = [], this.marked = [ !0 ], 
      this.insertedLocs = new Set, this.finalLoc = this.loc(), this.tryEntries = [], this.leapManager = new leap.LeapManager(this);
    }
    var Ep = Emitter.prototype;
    function getDeclError(node) {
      return new Error("all declarations should have been transformed into assignments before the Exploder began its work: " + JSON.stringify(node));
    }
    exports.Emitter = Emitter, Ep.loc = function() {
      var l = util.getTypes().numericLiteral(-1);
      return this.insertedLocs.add(l), l;
    }, Ep.getInsertedLocs = function() {
      return this.insertedLocs;
    }, Ep.getContextId = function() {
      return util.getTypes().clone(this.contextId);
    }, Ep.mark = function(loc) {
      util.getTypes().assertLiteral(loc);
      var index = this.listing.length;
      return -1 === loc.value ? loc.value = index : _assert.default.strictEqual(loc.value, index), 
      this.marked[index] = !0, loc;
    }, Ep.emit = function(node) {
      var t = util.getTypes();
      t.isExpression(node) && (node = t.expressionStatement(node)), t.assertStatement(node), 
      this.listing.push(node);
    }, Ep.emitAssign = function(lhs, rhs) {
      return this.emit(this.assign(lhs, rhs)), lhs;
    }, Ep.assign = function(lhs, rhs) {
      var t = util.getTypes();
      return t.expressionStatement(t.assignmentExpression("=", t.cloneDeep(lhs), rhs));
    }, Ep.contextProperty = function(name, computed) {
      var t = util.getTypes();
      return t.memberExpression(this.getContextId(), computed ? t.stringLiteral(name) : t.identifier(name), !!computed);
    }, Ep.stop = function(rval) {
      rval && this.setReturnValue(rval), this.jump(this.finalLoc);
    }, Ep.setReturnValue = function(valuePath) {
      util.getTypes().assertExpression(valuePath.value), this.emitAssign(this.contextProperty("rval"), this.explodeExpression(valuePath));
    }, Ep.clearPendingException = function(tryLoc, assignee) {
      var t = util.getTypes();
      t.assertLiteral(tryLoc);
      var catchCall = t.callExpression(this.contextProperty("catch", !0), [ t.clone(tryLoc) ]);
      assignee ? this.emitAssign(assignee, catchCall) : this.emit(catchCall);
    }, Ep.jump = function(toLoc) {
      this.emitAssign(this.contextProperty("next"), toLoc), this.emit(util.getTypes().breakStatement());
    }, Ep.jumpIf = function(test, toLoc) {
      var t = util.getTypes();
      t.assertExpression(test), t.assertLiteral(toLoc), this.emit(t.ifStatement(test, t.blockStatement([ this.assign(this.contextProperty("next"), toLoc), t.breakStatement() ])));
    }, Ep.jumpIfNot = function(test, toLoc) {
      var negatedTest, t = util.getTypes();
      t.assertExpression(test), t.assertLiteral(toLoc), negatedTest = t.isUnaryExpression(test) && "!" === test.operator ? test.argument : t.unaryExpression("!", test), 
      this.emit(t.ifStatement(negatedTest, t.blockStatement([ this.assign(this.contextProperty("next"), toLoc), t.breakStatement() ])));
    }, Ep.makeTempVar = function() {
      return this.contextProperty("t" + this.nextTempId++);
    }, Ep.getContextFunction = function(id) {
      var t = util.getTypes();
      return t.functionExpression(id || null, [ this.getContextId() ], t.blockStatement([ this.getDispatchLoop() ]), !1, !1);
    }, Ep.getDispatchLoop = function() {
      var current, self = this, t = util.getTypes(), cases = [], alreadyEnded = !1;
      return self.listing.forEach((function(stmt, i) {
        self.marked.hasOwnProperty(i) && (cases.push(t.switchCase(t.numericLiteral(i), current = [])), 
        alreadyEnded = !1), alreadyEnded || (current.push(stmt), t.isCompletionStatement(stmt) && (alreadyEnded = !0));
      })), this.finalLoc.value = this.listing.length, cases.push(t.switchCase(this.finalLoc, []), t.switchCase(t.stringLiteral("end"), [ t.returnStatement(t.callExpression(this.contextProperty("stop"), [])) ])), 
      t.whileStatement(t.numericLiteral(1), t.switchStatement(t.assignmentExpression("=", this.contextProperty("prev"), this.contextProperty("next")), cases));
    }, Ep.getTryLocsList = function() {
      if (0 === this.tryEntries.length) return null;
      var t = util.getTypes(), lastLocValue = 0;
      return t.arrayExpression(this.tryEntries.map((function(tryEntry) {
        var thisLocValue = tryEntry.firstLoc.value;
        _assert.default.ok(thisLocValue >= lastLocValue, "try entries out of order"), lastLocValue = thisLocValue;
        var ce = tryEntry.catchEntry, fe = tryEntry.finallyEntry, locs = [ tryEntry.firstLoc, ce ? ce.firstLoc : null ];
        return fe && (locs[2] = fe.firstLoc, locs[3] = fe.afterLoc), t.arrayExpression(locs.map((function(loc) {
          return loc && t.clone(loc);
        })));
      })));
    }, Ep.explode = function(path, ignoreResult) {
      var t = util.getTypes(), node = path.node;
      if (t.assertNode(node), t.isDeclaration(node)) throw getDeclError(node);
      if (t.isStatement(node)) return this.explodeStatement(path);
      if (t.isExpression(node)) return this.explodeExpression(path, ignoreResult);
      switch (node.type) {
       case "Program":
        return path.get("body").map(this.explodeStatement, this);

       case "VariableDeclarator":
        throw getDeclError(node);

       case "Property":
       case "SwitchCase":
       case "CatchClause":
        throw new Error(node.type + " nodes should be handled by their parents");

       default:
        throw new Error("unknown Node of type " + JSON.stringify(node.type));
      }
    }, Ep.explodeStatement = function(path, labelId) {
      var before, after, head, t = util.getTypes(), stmt = path.node, self = this;
      if (t.assertStatement(stmt), labelId ? t.assertIdentifier(labelId) : labelId = null, 
      t.isBlockStatement(stmt)) path.get("body").forEach((function(path) {
        self.explodeStatement(path);
      })); else if (meta.containsLeap(stmt)) switch (stmt.type) {
       case "ExpressionStatement":
        self.explodeExpression(path.get("expression"), !0);
        break;

       case "LabeledStatement":
        after = this.loc(), self.leapManager.withEntry(new leap.LabeledEntry(after, stmt.label), (function() {
          self.explodeStatement(path.get("body"), stmt.label);
        })), self.mark(after);
        break;

       case "WhileStatement":
        before = this.loc(), after = this.loc(), self.mark(before), self.jumpIfNot(self.explodeExpression(path.get("test")), after), 
        self.leapManager.withEntry(new leap.LoopEntry(after, before, labelId), (function() {
          self.explodeStatement(path.get("body"));
        })), self.jump(before), self.mark(after);
        break;

       case "DoWhileStatement":
        var first = this.loc(), test = this.loc();
        after = this.loc(), self.mark(first), self.leapManager.withEntry(new leap.LoopEntry(after, test, labelId), (function() {
          self.explode(path.get("body"));
        })), self.mark(test), self.jumpIf(self.explodeExpression(path.get("test")), first), 
        self.mark(after);
        break;

       case "ForStatement":
        head = this.loc();
        var update = this.loc();
        after = this.loc(), stmt.init && self.explode(path.get("init"), !0), self.mark(head), 
        stmt.test && self.jumpIfNot(self.explodeExpression(path.get("test")), after), self.leapManager.withEntry(new leap.LoopEntry(after, update, labelId), (function() {
          self.explodeStatement(path.get("body"));
        })), self.mark(update), stmt.update && self.explode(path.get("update"), !0), self.jump(head), 
        self.mark(after);
        break;

       case "TypeCastExpression":
        return self.explodeExpression(path.get("expression"));

       case "ForInStatement":
        head = this.loc(), after = this.loc();
        var keyIterNextFn = self.makeTempVar();
        self.emitAssign(keyIterNextFn, t.callExpression(util.runtimeProperty("keys"), [ self.explodeExpression(path.get("right")) ])), 
        self.mark(head);
        var keyInfoTmpVar = self.makeTempVar();
        self.jumpIf(t.memberExpression(t.assignmentExpression("=", keyInfoTmpVar, t.callExpression(t.cloneDeep(keyIterNextFn), [])), t.identifier("done"), !1), after), 
        self.emitAssign(stmt.left, t.memberExpression(t.cloneDeep(keyInfoTmpVar), t.identifier("value"), !1)), 
        self.leapManager.withEntry(new leap.LoopEntry(after, head, labelId), (function() {
          self.explodeStatement(path.get("body"));
        })), self.jump(head), self.mark(after);
        break;

       case "BreakStatement":
        self.emitAbruptCompletion({
          type: "break",
          target: self.leapManager.getBreakLoc(stmt.label)
        });
        break;

       case "ContinueStatement":
        self.emitAbruptCompletion({
          type: "continue",
          target: self.leapManager.getContinueLoc(stmt.label)
        });
        break;

       case "SwitchStatement":
        var disc = self.emitAssign(self.makeTempVar(), self.explodeExpression(path.get("discriminant")));
        after = this.loc();
        for (var defaultLoc = this.loc(), condition = defaultLoc, caseLocs = [], cases = stmt.cases || [], i = cases.length - 1; i >= 0; --i) {
          var c = cases[i];
          t.assertSwitchCase(c), c.test ? condition = t.conditionalExpression(t.binaryExpression("===", t.cloneDeep(disc), c.test), caseLocs[i] = this.loc(), condition) : caseLocs[i] = defaultLoc;
        }
        var discriminant = path.get("discriminant");
        util.replaceWithOrRemove(discriminant, condition), self.jump(self.explodeExpression(discriminant)), 
        self.leapManager.withEntry(new leap.SwitchEntry(after), (function() {
          path.get("cases").forEach((function(casePath) {
            var i = casePath.key;
            self.mark(caseLocs[i]), casePath.get("consequent").forEach((function(path) {
              self.explodeStatement(path);
            }));
          }));
        })), self.mark(after), -1 === defaultLoc.value && (self.mark(defaultLoc), _assert.default.strictEqual(after.value, defaultLoc.value));
        break;

       case "IfStatement":
        var elseLoc = stmt.alternate && this.loc();
        after = this.loc(), self.jumpIfNot(self.explodeExpression(path.get("test")), elseLoc || after), 
        self.explodeStatement(path.get("consequent")), elseLoc && (self.jump(after), self.mark(elseLoc), 
        self.explodeStatement(path.get("alternate"))), self.mark(after);
        break;

       case "ReturnStatement":
        self.emitAbruptCompletion({
          type: "return",
          value: self.explodeExpression(path.get("argument"))
        });
        break;

       case "WithStatement":
        throw new Error("WithStatement not supported in generator functions.");

       case "TryStatement":
        after = this.loc();
        var handler = stmt.handler, catchLoc = handler && this.loc(), catchEntry = catchLoc && new leap.CatchEntry(catchLoc, handler.param), finallyLoc = stmt.finalizer && this.loc(), finallyEntry = finallyLoc && new leap.FinallyEntry(finallyLoc, after), tryEntry = new leap.TryEntry(self.getUnmarkedCurrentLoc(), catchEntry, finallyEntry);
        self.tryEntries.push(tryEntry), self.updateContextPrevLoc(tryEntry.firstLoc), self.leapManager.withEntry(tryEntry, (function() {
          if (self.explodeStatement(path.get("block")), catchLoc) {
            finallyLoc ? self.jump(finallyLoc) : self.jump(after), self.updateContextPrevLoc(self.mark(catchLoc));
            var bodyPath = path.get("handler.body"), safeParam = self.makeTempVar();
            self.clearPendingException(tryEntry.firstLoc, safeParam), bodyPath.traverse(catchParamVisitor, {
              getSafeParam: function() {
                return t.cloneDeep(safeParam);
              },
              catchParamName: handler.param.name
            }), self.leapManager.withEntry(catchEntry, (function() {
              self.explodeStatement(bodyPath);
            }));
          }
          finallyLoc && (self.updateContextPrevLoc(self.mark(finallyLoc)), self.leapManager.withEntry(finallyEntry, (function() {
            self.explodeStatement(path.get("finalizer"));
          })), self.emit(t.returnStatement(t.callExpression(self.contextProperty("finish"), [ finallyEntry.firstLoc ]))));
        })), self.mark(after);
        break;

       case "ThrowStatement":
        self.emit(t.throwStatement(self.explodeExpression(path.get("argument"))));
        break;

       default:
        throw new Error("unknown Statement of type " + JSON.stringify(stmt.type));
      } else self.emit(stmt);
    };
    var catchParamVisitor = {
      Identifier: function(path, state) {
        path.node.name === state.catchParamName && util.isReference(path) && util.replaceWithOrRemove(path, state.getSafeParam());
      },
      Scope: function(path, state) {
        path.scope.hasOwnBinding(state.catchParamName) && path.skip();
      }
    };
    Ep.emitAbruptCompletion = function(record) {
      (function(record) {
        var type = record.type;
        if ("normal" === type) return !hasOwn.call(record, "target");
        if ("break" === type || "continue" === type) return !hasOwn.call(record, "value") && util.getTypes().isLiteral(record.target);
        if ("return" === type || "throw" === type) return hasOwn.call(record, "value") && !hasOwn.call(record, "target");
        return !1;
      })(record) || _assert.default.ok(!1, "invalid completion record: " + JSON.stringify(record)), 
      _assert.default.notStrictEqual(record.type, "normal", "normal completions are not abrupt");
      var t = util.getTypes(), abruptArgs = [ t.stringLiteral(record.type) ];
      "break" === record.type || "continue" === record.type ? (t.assertLiteral(record.target), 
      abruptArgs[1] = this.insertedLocs.has(record.target) ? record.target : t.cloneDeep(record.target)) : "return" !== record.type && "throw" !== record.type || record.value && (t.assertExpression(record.value), 
      abruptArgs[1] = this.insertedLocs.has(record.value) ? record.value : t.cloneDeep(record.value)), 
      this.emit(t.returnStatement(t.callExpression(this.contextProperty("abrupt"), abruptArgs)));
    }, Ep.getUnmarkedCurrentLoc = function() {
      return util.getTypes().numericLiteral(this.listing.length);
    }, Ep.updateContextPrevLoc = function(loc) {
      var t = util.getTypes();
      loc ? (t.assertLiteral(loc), -1 === loc.value ? loc.value = this.listing.length : _assert.default.strictEqual(loc.value, this.listing.length)) : loc = this.getUnmarkedCurrentLoc(), 
      this.emitAssign(this.contextProperty("prev"), loc);
    }, Ep.explodeExpression = function(path, ignoreResult) {
      var t = util.getTypes(), expr = path.node;
      if (!expr) return expr;
      t.assertExpression(expr);
      var result, after, self = this;
      function finish(expr) {
        if (t.assertExpression(expr), !ignoreResult) return expr;
        self.emit(expr);
      }
      if (!meta.containsLeap(expr)) return finish(expr);
      var hasLeapingChildren = meta.containsLeap.onlyChildren(expr);
      function explodeViaTempVar(tempVar, childPath, ignoreChildResult) {
        _assert.default.ok(!ignoreChildResult || !tempVar, "Ignoring the result of a child expression but forcing it to be assigned to a temporary variable?");
        var result = self.explodeExpression(childPath, ignoreChildResult);
        return ignoreChildResult || (tempVar || hasLeapingChildren && !t.isLiteral(result)) && (result = self.emitAssign(tempVar || self.makeTempVar(), result)), 
        result;
      }
      switch (expr.type) {
       case "MemberExpression":
        return finish(t.memberExpression(self.explodeExpression(path.get("object")), expr.computed ? explodeViaTempVar(null, path.get("property")) : expr.property, expr.computed));

       case "CallExpression":
        var newCallee, newArgs, calleePath = path.get("callee"), argsPath = path.get("arguments"), hasLeapingArgs = argsPath.some((function(argPath) {
          return meta.containsLeap(argPath.node);
        })), injectFirstArg = null;
        if (t.isMemberExpression(calleePath.node)) if (hasLeapingArgs) {
          var newObject = explodeViaTempVar(self.makeTempVar(), calleePath.get("object")), newProperty = calleePath.node.computed ? explodeViaTempVar(null, calleePath.get("property")) : calleePath.node.property;
          injectFirstArg = newObject, newCallee = t.memberExpression(t.memberExpression(t.cloneDeep(newObject), newProperty, calleePath.node.computed), t.identifier("call"), !1);
        } else newCallee = self.explodeExpression(calleePath); else newCallee = explodeViaTempVar(null, calleePath), 
        t.isMemberExpression(newCallee) && (newCallee = t.sequenceExpression([ t.numericLiteral(0), t.cloneDeep(newCallee) ]));
        return hasLeapingArgs ? (newArgs = argsPath.map((function(argPath) {
          return explodeViaTempVar(null, argPath);
        })), injectFirstArg && newArgs.unshift(injectFirstArg), newArgs = newArgs.map((function(arg) {
          return t.cloneDeep(arg);
        }))) : newArgs = path.node.arguments, finish(t.callExpression(newCallee, newArgs));

       case "NewExpression":
        return finish(t.newExpression(explodeViaTempVar(null, path.get("callee")), path.get("arguments").map((function(argPath) {
          return explodeViaTempVar(null, argPath);
        }))));

       case "ObjectExpression":
        return finish(t.objectExpression(path.get("properties").map((function(propPath) {
          return propPath.isObjectProperty() ? t.objectProperty(propPath.node.key, explodeViaTempVar(null, propPath.get("value")), propPath.node.computed) : propPath.node;
        }))));

       case "ArrayExpression":
        return finish(t.arrayExpression(path.get("elements").map((function(elemPath) {
          return elemPath.isSpreadElement() ? t.spreadElement(explodeViaTempVar(null, elemPath.get("argument"))) : explodeViaTempVar(null, elemPath);
        }))));

       case "SequenceExpression":
        var lastIndex = expr.expressions.length - 1;
        return path.get("expressions").forEach((function(exprPath) {
          exprPath.key === lastIndex ? result = self.explodeExpression(exprPath, ignoreResult) : self.explodeExpression(exprPath, !0);
        })), result;

       case "LogicalExpression":
        after = this.loc(), ignoreResult || (result = self.makeTempVar());
        var left = explodeViaTempVar(result, path.get("left"));
        return "&&" === expr.operator ? self.jumpIfNot(left, after) : (_assert.default.strictEqual(expr.operator, "||"), 
        self.jumpIf(left, after)), explodeViaTempVar(result, path.get("right"), ignoreResult), 
        self.mark(after), result;

       case "ConditionalExpression":
        var elseLoc = this.loc();
        after = this.loc();
        var test = self.explodeExpression(path.get("test"));
        return self.jumpIfNot(test, elseLoc), ignoreResult || (result = self.makeTempVar()), 
        explodeViaTempVar(result, path.get("consequent"), ignoreResult), self.jump(after), 
        self.mark(elseLoc), explodeViaTempVar(result, path.get("alternate"), ignoreResult), 
        self.mark(after), result;

       case "UnaryExpression":
        return finish(t.unaryExpression(expr.operator, self.explodeExpression(path.get("argument")), !!expr.prefix));

       case "BinaryExpression":
        return finish(t.binaryExpression(expr.operator, explodeViaTempVar(null, path.get("left")), explodeViaTempVar(null, path.get("right"))));

       case "AssignmentExpression":
        if ("=" === expr.operator) return finish(t.assignmentExpression(expr.operator, self.explodeExpression(path.get("left")), self.explodeExpression(path.get("right"))));
        var lhs = self.explodeExpression(path.get("left")), temp = self.emitAssign(self.makeTempVar(), lhs);
        return finish(t.assignmentExpression("=", t.cloneDeep(lhs), t.assignmentExpression(expr.operator, t.cloneDeep(temp), self.explodeExpression(path.get("right")))));

       case "UpdateExpression":
        return finish(t.updateExpression(expr.operator, self.explodeExpression(path.get("argument")), expr.prefix));

       case "YieldExpression":
        after = this.loc();
        var arg = expr.argument && self.explodeExpression(path.get("argument"));
        if (arg && expr.delegate) {
          var _result = self.makeTempVar(), _ret = t.returnStatement(t.callExpression(self.contextProperty("delegateYield"), [ arg, t.stringLiteral(_result.property.name), after ]));
          return _ret.loc = expr.loc, self.emit(_ret), self.mark(after), _result;
        }
        self.emitAssign(self.contextProperty("next"), after);
        var ret = t.returnStatement(t.cloneDeep(arg) || null);
        return ret.loc = expr.loc, self.emit(ret), self.mark(after), self.contextProperty("sent");

       default:
        throw new Error("unknown Expression of type " + JSON.stringify(expr.type));
      }
    };
  },
  534: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "default", {
      enumerable: !0,
      get: function() {
        return _regeneratorTransform.default;
      }
    });
    var obj, _regeneratorTransform = (obj = __webpack_require__(535)) && obj.__esModule ? obj : {
      default: obj
    };
  },
  535: function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0, exports.default = function(context) {
      var plugin = {
        visitor: (0, _visit.getVisitor)(context)
      }, version = context && context.version;
      version && parseInt(version, 10) >= 7 && (plugin.name = "regenerator-transform");
      return plugin;
    };
    var _visit = __webpack_require__(536);
  },
  536: function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(129), _interopRequireDefault = __webpack_require__(130), _assert = _interopRequireDefault(__webpack_require__(10)), _hoist = __webpack_require__(538), _emit = __webpack_require__(236), _replaceShorthandObjectMethod = _interopRequireDefault(__webpack_require__(541)), util = _interopRequireWildcard(__webpack_require__(109));
    function shouldRegenerate(node, state) {
      return node.generator ? node.async ? !1 !== state.opts.asyncGenerators : !1 !== state.opts.generators : !!node.async && !1 !== state.opts.async;
    }
    exports.getVisitor = function(_ref) {
      var t = _ref.types;
      return {
        Method: function(path, state) {
          var node = path.node;
          if (shouldRegenerate(node, state)) {
            var container = t.functionExpression(null, [], t.cloneNode(node.body, !1), node.generator, node.async);
            path.get("body").set("body", [ t.returnStatement(t.callExpression(container, [])) ]), 
            node.async = !1, node.generator = !1, path.get("body.body.0.argument.callee").unwrapFunctionEnvironment();
          }
        },
        Function: {
          exit: util.wrapWithTypes(t, (function(path, state) {
            var node = path.node;
            if (shouldRegenerate(node, state)) {
              node = (path = (0, _replaceShorthandObjectMethod.default)(path)).node;
              var contextId = path.scope.generateUidIdentifier("context"), argsId = path.scope.generateUidIdentifier("args");
              path.ensureBlock();
              var bodyBlockPath = path.get("body");
              node.async && bodyBlockPath.traverse(awaitVisitor), bodyBlockPath.traverse(functionSentVisitor, {
                context: contextId
              });
              var outerBody = [], innerBody = [];
              bodyBlockPath.get("body").forEach((function(childPath) {
                var node = childPath.node;
                t.isExpressionStatement(node) && t.isStringLiteral(node.expression) || node && null != node._blockHoist ? outerBody.push(node) : innerBody.push(node);
              })), outerBody.length > 0 && (bodyBlockPath.node.body = innerBody);
              var outerFnExpr = function(funPath) {
                var t = util.getTypes(), node = funPath.node;
                t.assertFunction(node), node.id || (node.id = funPath.scope.parent.generateUidIdentifier("callee"));
                if (node.generator && t.isFunctionDeclaration(node)) return function(funPath) {
                  var t = util.getTypes(), node = funPath.node;
                  t.assertIdentifier(node.id);
                  var blockPath = funPath.findParent((function(path) {
                    return path.isProgram() || path.isBlockStatement();
                  }));
                  if (!blockPath) return node.id;
                  var block = blockPath.node;
                  _assert.default.ok(Array.isArray(block.body));
                  var info = function(node) {
                    markInfo.has(node) || markInfo.set(node, {});
                    return markInfo.get(node);
                  }(block);
                  info.decl || (info.decl = t.variableDeclaration("var", []), blockPath.unshiftContainer("body", info.decl), 
                  info.declPath = blockPath.get("body.0"));
                  _assert.default.strictEqual(info.declPath.node, info.decl);
                  var markedId = blockPath.scope.generateUidIdentifier("marked"), markCallExp = t.callExpression(util.runtimeProperty("mark"), [ t.clone(node.id) ]), index = info.decl.declarations.push(t.variableDeclarator(markedId, markCallExp)) - 1, markCallExpPath = info.declPath.get("declarations." + index + ".init");
                  return _assert.default.strictEqual(markCallExpPath.node, markCallExp), markCallExpPath.addComment("leading", "#__PURE__"), 
                  t.clone(markedId);
                }(funPath);
                return t.clone(node.id);
              }(path);
              t.assertIdentifier(node.id);
              var innerFnId = t.identifier(node.id.name + "$"), vars = (0, _hoist.hoist)(path), context = {
                usesThis: !1,
                usesArguments: !1,
                getArgsId: function() {
                  return t.clone(argsId);
                }
              };
              path.traverse(argumentsThisVisitor, context), context.usesArguments && (vars = vars || t.variableDeclaration("var", [])).declarations.push(t.variableDeclarator(t.clone(argsId), t.identifier("arguments")));
              var emitter = new _emit.Emitter(contextId);
              emitter.explode(path.get("body")), vars && vars.declarations.length > 0 && outerBody.push(vars);
              var wrapArgs = [ emitter.getContextFunction(innerFnId) ], tryLocsList = emitter.getTryLocsList();
              if (node.generator ? wrapArgs.push(outerFnExpr) : (context.usesThis || tryLocsList || node.async) && wrapArgs.push(t.nullLiteral()), 
              context.usesThis ? wrapArgs.push(t.thisExpression()) : (tryLocsList || node.async) && wrapArgs.push(t.nullLiteral()), 
              tryLocsList ? wrapArgs.push(tryLocsList) : node.async && wrapArgs.push(t.nullLiteral()), 
              node.async) {
                var currentScope = path.scope;
                do {
                  currentScope.hasOwnBinding("Promise") && currentScope.rename("Promise");
                } while (currentScope = currentScope.parent);
                wrapArgs.push(t.identifier("Promise"));
              }
              var wrapCall = t.callExpression(util.runtimeProperty(node.async ? "async" : "wrap"), wrapArgs);
              outerBody.push(t.returnStatement(wrapCall)), node.body = t.blockStatement(outerBody), 
              path.get("body.body").forEach((function(p) {
                return p.scope.registerDeclaration(p);
              }));
              var oldDirectives = bodyBlockPath.node.directives;
              oldDirectives && (node.body.directives = oldDirectives);
              var wasGeneratorFunction = node.generator;
              wasGeneratorFunction && (node.generator = !1), node.async && (node.async = !1), 
              wasGeneratorFunction && t.isExpression(node) && (util.replaceWithOrRemove(path, t.callExpression(util.runtimeProperty("mark"), [ node ])), 
              path.addComment("leading", "#__PURE__"));
              var insertedLocs = emitter.getInsertedLocs();
              path.traverse({
                NumericLiteral: function(path) {
                  insertedLocs.has(path.node) && path.replaceWith(t.numericLiteral(path.node.value));
                }
              }), path.requeue();
            }
          }))
        }
      };
    };
    var markInfo = new WeakMap;
    var argumentsThisVisitor = {
      "FunctionExpression|FunctionDeclaration|Method": function(path) {
        path.skip();
      },
      Identifier: function(path, state) {
        "arguments" === path.node.name && util.isReference(path) && (util.replaceWithOrRemove(path, state.getArgsId()), 
        state.usesArguments = !0);
      },
      ThisExpression: function(path, state) {
        state.usesThis = !0;
      }
    }, functionSentVisitor = {
      MetaProperty: function(path) {
        var node = path.node;
        if ("function" === node.meta.name && "sent" === node.property.name) {
          var t = util.getTypes();
          util.replaceWithOrRemove(path, t.memberExpression(t.clone(this.context), t.identifier("_sent")));
        }
      }
    }, awaitVisitor = {
      Function: function(path) {
        path.skip();
      },
      AwaitExpression: function(path) {
        var t = util.getTypes(), argument = path.node.argument;
        util.replaceWithOrRemove(path, t.yieldExpression(t.callExpression(util.runtimeProperty("awrap"), [ argument ]), !1));
      }
    };
  },
  537: function(module, exports) {
    function _typeof(obj) {
      return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? module.exports = _typeof = function(obj) {
        return typeof obj;
      } : module.exports = _typeof = function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    module.exports = _typeof;
  },
  538: function(module, exports, __webpack_require__) {
    "use strict";
    var util = __webpack_require__(129)(__webpack_require__(109)), hasOwn = Object.prototype.hasOwnProperty;
    exports.hoist = function(funPath) {
      var t = util.getTypes();
      t.assertFunction(funPath.node);
      var vars = {};
      function varDeclToExpr(_ref, includeIdentifiers) {
        var vdec = _ref.node, scope = _ref.scope;
        t.assertVariableDeclaration(vdec);
        var exprs = [];
        return vdec.declarations.forEach((function(dec) {
          vars[dec.id.name] = t.identifier(dec.id.name), scope.removeBinding(dec.id.name), 
          dec.init ? exprs.push(t.assignmentExpression("=", dec.id, dec.init)) : includeIdentifiers && exprs.push(dec.id);
        })), 0 === exprs.length ? null : 1 === exprs.length ? exprs[0] : t.sequenceExpression(exprs);
      }
      funPath.get("body").traverse({
        VariableDeclaration: {
          exit: function(path) {
            var expr = varDeclToExpr(path, !1);
            null === expr ? path.remove() : util.replaceWithOrRemove(path, t.expressionStatement(expr)), 
            path.skip();
          }
        },
        ForStatement: function(path) {
          var init = path.get("init");
          init.isVariableDeclaration() && util.replaceWithOrRemove(init, varDeclToExpr(init, !1));
        },
        ForXStatement: function(path) {
          var left = path.get("left");
          left.isVariableDeclaration() && util.replaceWithOrRemove(left, varDeclToExpr(left, !0));
        },
        FunctionDeclaration: function(path) {
          var node = path.node;
          vars[node.id.name] = node.id;
          var assignment = t.expressionStatement(t.assignmentExpression("=", t.clone(node.id), t.functionExpression(path.scope.generateUidIdentifierBasedOnNode(node), node.params, node.body, node.generator, node.expression)));
          path.parentPath.isBlockStatement() ? (path.parentPath.unshiftContainer("body", assignment), 
          path.remove()) : util.replaceWithOrRemove(path, assignment), path.scope.removeBinding(node.id.name), 
          path.skip();
        },
        FunctionExpression: function(path) {
          path.skip();
        },
        ArrowFunctionExpression: function(path) {
          path.skip();
        }
      });
      var paramNames = {};
      funPath.get("params").forEach((function(paramPath) {
        var param = paramPath.node;
        t.isIdentifier(param) && (paramNames[param.name] = param);
      }));
      var declarations = [];
      return Object.keys(vars).forEach((function(name) {
        hasOwn.call(paramNames, name) || declarations.push(t.variableDeclarator(vars[name], null));
      })), 0 === declarations.length ? null : t.variableDeclaration("var", declarations);
    };
  },
  539: function(module, exports, __webpack_require__) {
    "use strict";
    var _assert = __webpack_require__(130)(__webpack_require__(10)), _emit = __webpack_require__(236), _util = __webpack_require__(183), _util2 = __webpack_require__(109);
    function Entry() {
      _assert.default.ok(this instanceof Entry);
    }
    function FunctionEntry(returnLoc) {
      Entry.call(this), (0, _util2.getTypes)().assertLiteral(returnLoc), this.returnLoc = returnLoc;
    }
    function LoopEntry(breakLoc, continueLoc, label) {
      Entry.call(this);
      var t = (0, _util2.getTypes)();
      t.assertLiteral(breakLoc), t.assertLiteral(continueLoc), label ? t.assertIdentifier(label) : label = null, 
      this.breakLoc = breakLoc, this.continueLoc = continueLoc, this.label = label;
    }
    function SwitchEntry(breakLoc) {
      Entry.call(this), (0, _util2.getTypes)().assertLiteral(breakLoc), this.breakLoc = breakLoc;
    }
    function TryEntry(firstLoc, catchEntry, finallyEntry) {
      Entry.call(this), (0, _util2.getTypes)().assertLiteral(firstLoc), catchEntry ? _assert.default.ok(catchEntry instanceof CatchEntry) : catchEntry = null, 
      finallyEntry ? _assert.default.ok(finallyEntry instanceof FinallyEntry) : finallyEntry = null, 
      _assert.default.ok(catchEntry || finallyEntry), this.firstLoc = firstLoc, this.catchEntry = catchEntry, 
      this.finallyEntry = finallyEntry;
    }
    function CatchEntry(firstLoc, paramId) {
      Entry.call(this);
      var t = (0, _util2.getTypes)();
      t.assertLiteral(firstLoc), t.assertIdentifier(paramId), this.firstLoc = firstLoc, 
      this.paramId = paramId;
    }
    function FinallyEntry(firstLoc, afterLoc) {
      Entry.call(this);
      var t = (0, _util2.getTypes)();
      t.assertLiteral(firstLoc), t.assertLiteral(afterLoc), this.firstLoc = firstLoc, 
      this.afterLoc = afterLoc;
    }
    function LabeledEntry(breakLoc, label) {
      Entry.call(this);
      var t = (0, _util2.getTypes)();
      t.assertLiteral(breakLoc), t.assertIdentifier(label), this.breakLoc = breakLoc, 
      this.label = label;
    }
    function LeapManager(emitter) {
      _assert.default.ok(this instanceof LeapManager), _assert.default.ok(emitter instanceof _emit.Emitter), 
      this.emitter = emitter, this.entryStack = [ new FunctionEntry(emitter.finalLoc) ];
    }
    (0, _util.inherits)(FunctionEntry, Entry), exports.FunctionEntry = FunctionEntry, 
    (0, _util.inherits)(LoopEntry, Entry), exports.LoopEntry = LoopEntry, (0, _util.inherits)(SwitchEntry, Entry), 
    exports.SwitchEntry = SwitchEntry, (0, _util.inherits)(TryEntry, Entry), exports.TryEntry = TryEntry, 
    (0, _util.inherits)(CatchEntry, Entry), exports.CatchEntry = CatchEntry, (0, _util.inherits)(FinallyEntry, Entry), 
    exports.FinallyEntry = FinallyEntry, (0, _util.inherits)(LabeledEntry, Entry), exports.LabeledEntry = LabeledEntry;
    var LMp = LeapManager.prototype;
    exports.LeapManager = LeapManager, LMp.withEntry = function(entry, callback) {
      _assert.default.ok(entry instanceof Entry), this.entryStack.push(entry);
      try {
        callback.call(this.emitter);
      } finally {
        var popped = this.entryStack.pop();
        _assert.default.strictEqual(popped, entry);
      }
    }, LMp._findLeapLocation = function(property, label) {
      for (var i = this.entryStack.length - 1; i >= 0; --i) {
        var entry = this.entryStack[i], loc = entry[property];
        if (loc) if (label) {
          if (entry.label && entry.label.name === label.name) return loc;
        } else if (!(entry instanceof LabeledEntry)) return loc;
      }
      return null;
    }, LMp.getBreakLoc = function(label) {
      return this._findLeapLocation("breakLoc", label);
    }, LMp.getContinueLoc = function(label) {
      return this._findLeapLocation("continueLoc", label);
    };
  },
  540: function(module, exports, __webpack_require__) {
    "use strict";
    var _assert = __webpack_require__(130)(__webpack_require__(10)), _util = __webpack_require__(109), mMap = new WeakMap;
    var hasOwn = Object.prototype.hasOwnProperty;
    function makePredicate(propertyName, knownTypes) {
      function onlyChildren(node) {
        var t = (0, _util.getTypes)();
        t.assertNode(node);
        var result = !1;
        function check(child) {
          return result || (Array.isArray(child) ? child.some(check) : t.isNode(child) && (_assert.default.strictEqual(result, !1), 
          result = predicate(child))), result;
        }
        var keys = t.VISITOR_KEYS[node.type];
        if (keys) for (var i = 0; i < keys.length; i++) {
          check(node[keys[i]]);
        }
        return result;
      }
      function predicate(node) {
        (0, _util.getTypes)().assertNode(node);
        var meta = function(node) {
          return mMap.has(node) || mMap.set(node, {}), mMap.get(node);
        }(node);
        return hasOwn.call(meta, propertyName) ? meta[propertyName] : hasOwn.call(opaqueTypes, node.type) ? meta[propertyName] = !1 : hasOwn.call(knownTypes, node.type) ? meta[propertyName] = !0 : meta[propertyName] = onlyChildren(node);
      }
      return predicate.onlyChildren = onlyChildren, predicate;
    }
    var opaqueTypes = {
      FunctionExpression: !0,
      ArrowFunctionExpression: !0
    }, sideEffectTypes = {
      CallExpression: !0,
      ForInStatement: !0,
      UnaryExpression: !0,
      BinaryExpression: !0,
      AssignmentExpression: !0,
      UpdateExpression: !0,
      NewExpression: !0
    }, leapTypes = {
      YieldExpression: !0,
      BreakStatement: !0,
      ContinueStatement: !0,
      ReturnStatement: !0,
      ThrowStatement: !0
    };
    for (var type in leapTypes) hasOwn.call(leapTypes, type) && (sideEffectTypes[type] = leapTypes[type]);
    exports.hasSideEffects = makePredicate("hasSideEffects", sideEffectTypes), exports.containsLeap = makePredicate("containsLeap", leapTypes);
  },
  541: function(module, exports, __webpack_require__) {
    "use strict";
    var _interopRequireWildcard = __webpack_require__(129);
    exports.__esModule = !0, exports.default = function(path) {
      var t = util.getTypes();
      if (!path.node || !t.isFunction(path.node)) throw new Error("replaceShorthandObjectMethod can only be called on Function AST node paths.");
      if (!t.isObjectMethod(path.node)) return path;
      if (!path.node.generator) return path;
      var parameters = path.node.params.map((function(param) {
        return t.cloneDeep(param);
      })), functionExpression = t.functionExpression(null, parameters, t.cloneDeep(path.node.body), path.node.generator, path.node.async);
      return util.replaceWithOrRemove(path, t.objectProperty(t.cloneDeep(path.node.key), functionExpression, path.node.computed, !1)), 
      path.get("value");
    };
    var util = _interopRequireWildcard(__webpack_require__(109));
  }
});