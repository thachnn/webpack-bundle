(() => {
  "use strict";
  var __webpack_modules__ = {
    1692: (__unused_webpack_module, exports, __webpack_require__) => {
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
    9693: (__unused_webpack_module, exports, __webpack_require__) => {
      function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        return e && Object.keys(e).forEach((function(k) {
          if ("default" !== k) {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: !0,
              get: function() {
                return e[k];
              }
            });
          }
        })), n.default = e, Object.freeze(n);
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _t__namespace = _interopNamespace(__webpack_require__(8459));
      function willPathCastToBoolean(path) {
        const maybeWrapped = path, {node, parentPath} = maybeWrapped;
        if (parentPath.isLogicalExpression()) {
          const {operator, right} = parentPath.node;
          if ("&&" === operator || "||" === operator || "??" === operator && node === right) return willPathCastToBoolean(parentPath);
        }
        if (parentPath.isSequenceExpression()) {
          const {expressions} = parentPath.node;
          return expressions[expressions.length - 1] !== node || willPathCastToBoolean(parentPath);
        }
        return parentPath.isConditional({
          test: node
        }) || parentPath.isUnaryExpression({
          operator: "!"
        }) || parentPath.isLoop({
          test: node
        });
      }
      const {LOGICAL_OPERATORS, arrowFunctionExpression, assignmentExpression, binaryExpression, booleanLiteral, callExpression, cloneNode, conditionalExpression, identifier, isMemberExpression, isOptionalCallExpression, isOptionalMemberExpression, isUpdateExpression, logicalExpression, memberExpression, nullLiteral, optionalCallExpression, optionalMemberExpression, sequenceExpression, updateExpression} = _t__namespace;
      class AssignmentMemoiser {
        constructor() {
          this._map = void 0, this._map = new WeakMap;
        }
        has(key) {
          return this._map.has(key);
        }
        get(key) {
          if (!this.has(key)) return;
          const record = this._map.get(key), {value} = record;
          return record.count--, 0 === record.count ? assignmentExpression("=", value, key) : value;
        }
        set(key, value, count) {
          return this._map.set(key, {
            count,
            value
          });
        }
      }
      function toNonOptional(path, base) {
        const {node} = path;
        if (isOptionalMemberExpression(node)) return memberExpression(base, node.property, node.computed);
        if (path.isOptionalCallExpression()) {
          const callee = path.get("callee");
          if (path.node.optional && callee.isOptionalMemberExpression()) {
            const {object} = callee.node, context = path.scope.maybeGenerateMemoised(object) || object;
            return callee.get("object").replaceWith(assignmentExpression("=", context, object)), 
            callExpression(memberExpression(base, identifier("call")), [ context, ...path.node.arguments ]);
          }
          return callExpression(base, path.node.arguments);
        }
        return path.node;
      }
      const handle = {
        memoise() {},
        handle(member, noDocumentAll) {
          const {node, parent, parentPath, scope} = member;
          if (member.isOptionalMemberExpression()) {
            if (function(path) {
              for (;path && !path.isProgram(); ) {
                const {parentPath, container, listKey} = path, parentNode = parentPath.node;
                if (listKey) {
                  if (container !== parentNode[listKey]) return !0;
                } else if (container !== parentNode) return !0;
                path = parentPath;
              }
              return !1;
            }(member)) return;
            const endPath = member.find((({node, parent}) => isOptionalMemberExpression(parent) ? parent.optional || parent.object !== node : !isOptionalCallExpression(parent) || (node !== member.node && parent.optional || parent.callee !== node)));
            if (scope.path.isPattern()) return void endPath.replaceWith(callExpression(arrowFunctionExpression([], endPath.node), []));
            const willEndPathCastToBoolean = willPathCastToBoolean(endPath), rootParentPath = endPath.parentPath;
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
              if (!startingOptional.isOptionalCallExpression()) throw new Error(`Internal error: unexpected ${startingOptional.node.type}`);
              if (startingOptional.node.optional) break;
              startingOptional = startingOptional.get("callee");
            }
            const startingProp = startingOptional.isOptionalMemberExpression() ? "object" : "callee", startingNode = startingOptional.node[startingProp], baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode), baseRef = null != baseNeedsMemoised ? baseNeedsMemoised : startingNode, parentIsOptionalCall = parentPath.isOptionalCallExpression({
              callee: node
            }), isOptionalCall = parent => parentIsOptionalCall, parentIsCall = parentPath.isCallExpression({
              callee: node
            });
            startingOptional.replaceWith(toNonOptional(startingOptional, baseRef)), isOptionalCall() ? parent.optional ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.replaceWith(this.call(member, parent.arguments)) : parentIsCall ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member));
            let context, regular = member.node;
            for (let current = member; current !== endPath; ) {
              const parentPath = current.parentPath;
              if (parentPath === endPath && isOptionalCall() && parent.optional) {
                regular = parentPath.node;
                break;
              }
              regular = toNonOptional(parentPath, regular), current = parentPath;
            }
            const endParentPath = endPath.parentPath;
            if (isMemberExpression(regular) && endParentPath.isOptionalCallExpression({
              callee: endPath.node,
              optional: !0
            })) {
              const {object} = regular;
              context = member.scope.maybeGenerateMemoised(object), context && (regular.object = assignmentExpression("=", context, object));
            }
            let replacementPath = endPath;
            isDeleteOperation && (replacementPath = endParentPath, regular = endParentPath.node);
            const baseMemoised = baseNeedsMemoised ? assignmentExpression("=", cloneNode(baseRef), cloneNode(startingNode)) : cloneNode(baseRef);
            if (willEndPathCastToBoolean) {
              let nonNullishCheck;
              nonNullishCheck = noDocumentAll ? binaryExpression("!=", baseMemoised, nullLiteral()) : logicalExpression("&&", binaryExpression("!==", baseMemoised, nullLiteral()), binaryExpression("!==", cloneNode(baseRef), scope.buildUndefinedNode())), 
              replacementPath.replaceWith(logicalExpression("&&", nonNullishCheck, regular));
            } else {
              let nullishCheck;
              nullishCheck = noDocumentAll ? binaryExpression("==", baseMemoised, nullLiteral()) : logicalExpression("||", binaryExpression("===", baseMemoised, nullLiteral()), binaryExpression("===", cloneNode(baseRef), scope.buildUndefinedNode())), 
              replacementPath.replaceWith(conditionalExpression(nullishCheck, isDeleteOperation ? booleanLiteral(!0) : scope.buildUndefinedNode(), regular));
            }
            if (context) {
              const endParent = endParentPath.node;
              endParentPath.replaceWith(optionalCallExpression(optionalMemberExpression(endParent.callee, identifier("call"), !1, !0), [ cloneNode(context), ...endParent.arguments ], !1));
            }
          } else {
            if (isUpdateExpression(parent, {
              argument: node
            })) {
              if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
              const {operator, prefix} = parent;
              this.memoise(member, 2);
              const ref = scope.generateUidIdentifierBasedOnNode(node);
              scope.push({
                id: ref
              });
              const seq = [ assignmentExpression("=", cloneNode(ref), this.get(member)) ];
              if (prefix) {
                seq.push(updateExpression(operator, cloneNode(ref), prefix));
                const value = sequenceExpression(seq);
                return void parentPath.replaceWith(this.set(member, value));
              }
              {
                const ref2 = scope.generateUidIdentifierBasedOnNode(node);
                scope.push({
                  id: ref2
                }), seq.push(assignmentExpression("=", cloneNode(ref2), updateExpression(operator, cloneNode(ref), prefix)), cloneNode(ref));
                const value = sequenceExpression(seq);
                return void parentPath.replaceWith(sequenceExpression([ this.set(member, value), cloneNode(ref2) ]));
              }
            }
            if (parentPath.isAssignmentExpression({
              left: node
            })) {
              if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
              const {operator, right: value} = parentPath.node;
              if ("=" === operator) parentPath.replaceWith(this.set(member, value)); else {
                const operatorTrunc = operator.slice(0, -1);
                LOGICAL_OPERATORS.includes(operatorTrunc) ? (this.memoise(member, 1), parentPath.replaceWith(logicalExpression(operatorTrunc, this.get(member), this.set(member, value)))) : (this.memoise(member, 2), 
                parentPath.replaceWith(this.set(member, binaryExpression(operatorTrunc, this.get(member), value))));
              }
            } else {
              if (!parentPath.isCallExpression({
                callee: node
              })) return parentPath.isOptionalCallExpression({
                callee: node
              }) ? scope.path.isPattern() ? void parentPath.replaceWith(callExpression(arrowFunctionExpression([], parentPath.node), [])) : void parentPath.replaceWith(this.optionalCall(member, parentPath.node.arguments)) : void (parentPath.isForXStatement({
                left: node
              }) || parentPath.isObjectProperty({
                value: node
              }) && parentPath.parentPath.isObjectPattern() || parentPath.isAssignmentPattern({
                left: node
              }) && parentPath.parentPath.isObjectProperty({
                value: parent
              }) && parentPath.parentPath.parentPath.isObjectPattern() || parentPath.isArrayPattern() || parentPath.isAssignmentPattern({
                left: node
              }) && parentPath.parentPath.isArrayPattern() || parentPath.isRestElement() ? member.replaceWith(this.destructureSet(member)) : parentPath.isTaggedTemplateExpression() ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member)));
              parentPath.replaceWith(this.call(member, parentPath.node.arguments));
            }
          }
        }
      };
      exports.default = function(path, visitor, state) {
        path.traverse(visitor, Object.assign({}, handle, state, {
          memoiser: new AssignmentMemoiser
        }));
      };
    },
    3934: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(callee, thisNode, args, optional) {
        return 1 === args.length && isSpreadElement(args[0]) && isIdentifier(args[0].argument, {
          name: "arguments"
        }) ? optional ? optionalCallExpression(optionalMemberExpression(callee, identifier("apply"), !1, !0), [ thisNode, args[0].argument ], !1) : callExpression(memberExpression(callee, identifier("apply")), [ thisNode, args[0].argument ]) : optional ? optionalCallExpression(optionalMemberExpression(callee, identifier("call"), !1, !0), [ thisNode, ...args ], !1) : callExpression(memberExpression(callee, identifier("call")), [ thisNode, ...args ]);
      };
      var _t = __webpack_require__(8459);
      const {callExpression, identifier, isIdentifier, isSpreadElement, memberExpression, optionalCallExpression, optionalMemberExpression} = _t;
    },
    4149: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, Object.defineProperty(exports, "environmentVisitor", {
        enumerable: !0,
        get: function() {
          return _helperEnvironmentVisitor.default;
        }
      }), Object.defineProperty(exports, "skipAllButComputedKey", {
        enumerable: !0,
        get: function() {
          return _helperEnvironmentVisitor.skipAllButComputedKey;
        }
      });
      var _traverse = __webpack_require__(7098), _helperMemberExpressionToFunctions = __webpack_require__(9693), _helperOptimiseCallExpression = __webpack_require__(3934), _helperEnvironmentVisitor = __webpack_require__(1692), _t = __webpack_require__(8459);
      const {assignmentExpression, booleanLiteral, callExpression, cloneNode, identifier, memberExpression, sequenceExpression, stringLiteral, thisExpression} = _t;
      function getPrototypeOfExpression(objectRef, isStatic, file, isPrivateMethod) {
        objectRef = cloneNode(objectRef);
        const targetRef = isStatic || isPrivateMethod ? objectRef : memberExpression(objectRef, identifier("prototype"));
        return callExpression(file.addHelper("getPrototypeOf"), [ targetRef ]);
      }
      const visitor = _traverse.default.visitors.merge([ _helperEnvironmentVisitor.default, {
        Super(path, state) {
          const {node, parentPath} = path;
          parentPath.isMemberExpression({
            object: node
          }) && state.handle(parentPath);
        }
      } ]), unshadowSuperBindingVisitor = _traverse.default.visitors.merge([ _helperEnvironmentVisitor.default, {
        Scopable(path, {refName}) {
          const binding = path.scope.getOwnBinding(refName);
          binding && binding.identifier.name === refName && path.scope.rename(refName);
        }
      } ]), specHandlers = {
        memoise(superMember, count) {
          const {scope, node} = superMember, {computed, property} = node;
          if (!computed) return;
          const memo = scope.maybeGenerateMemoised(property);
          memo && this.memoiser.set(property, memo, count);
        },
        prop(superMember) {
          const {computed, property} = superMember.node;
          return this.memoiser.has(property) ? cloneNode(this.memoiser.get(property)) : computed ? cloneNode(property) : stringLiteral(property.name);
        },
        get(superMember) {
          return this._get(superMember, this._getThisRefs());
        },
        _get(superMember, thisRefs) {
          const proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
          return callExpression(this.file.addHelper("get"), [ thisRefs.memo ? sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), thisRefs.this ]);
        },
        _getThisRefs() {
          if (!this.isDerivedConstructor) return {
            this: thisExpression()
          };
          const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
          return {
            memo: assignmentExpression("=", thisRef, thisExpression()),
            this: cloneNode(thisRef)
          };
        },
        set(superMember, value) {
          const thisRefs = this._getThisRefs(), proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
          return callExpression(this.file.addHelper("set"), [ thisRefs.memo ? sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), value, thisRefs.this, booleanLiteral(superMember.isInStrictMode()) ]);
        },
        destructureSet(superMember) {
          throw superMember.buildCodeFrameError("Destructuring to a super field is not supported yet.");
        },
        call(superMember, args) {
          const thisRefs = this._getThisRefs();
          return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), cloneNode(thisRefs.this), args, !1);
        },
        optionalCall(superMember, args) {
          const thisRefs = this._getThisRefs();
          return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), cloneNode(thisRefs.this), args, !0);
        }
      }, looseHandlers = Object.assign({}, specHandlers, {
        prop(superMember) {
          const {property} = superMember.node;
          return this.memoiser.has(property) ? cloneNode(this.memoiser.get(property)) : cloneNode(property);
        },
        get(superMember) {
          const {isStatic, getSuperRef} = this, {computed} = superMember.node, prop = this.prop(superMember);
          let object;
          var _getSuperRef, _getSuperRef2;
          isStatic ? object = null != (_getSuperRef = getSuperRef()) ? _getSuperRef : memberExpression(identifier("Function"), identifier("prototype")) : object = memberExpression(null != (_getSuperRef2 = getSuperRef()) ? _getSuperRef2 : identifier("Object"), identifier("prototype"));
          return memberExpression(object, prop, computed);
        },
        set(superMember, value) {
          const {computed} = superMember.node, prop = this.prop(superMember);
          return assignmentExpression("=", memberExpression(thisExpression(), prop, computed), value);
        },
        destructureSet(superMember) {
          const {computed} = superMember.node, prop = this.prop(superMember);
          return memberExpression(thisExpression(), prop, computed);
        },
        call(superMember, args) {
          return (0, _helperOptimiseCallExpression.default)(this.get(superMember), thisExpression(), args, !1);
        },
        optionalCall(superMember, args) {
          return (0, _helperOptimiseCallExpression.default)(this.get(superMember), thisExpression(), args, !0);
        }
      });
      exports.default = class {
        constructor(opts) {
          var _opts$constantSuper;
          const path = opts.methodPath;
          this.methodPath = path, this.isDerivedConstructor = path.isClassMethod({
            kind: "constructor"
          }) && !!opts.superRef, this.isStatic = path.isObjectMethod() || path.node.static || (null == path.isStaticBlock ? void 0 : path.isStaticBlock()), 
          this.isPrivateMethod = path.isPrivate() && path.isMethod(), this.file = opts.file, 
          this.constantSuper = null != (_opts$constantSuper = opts.constantSuper) ? _opts$constantSuper : opts.isLoose, 
          this.opts = opts;
        }
        getObjectRef() {
          return cloneNode(this.opts.objectRef || this.opts.getObjectRef());
        }
        getSuperRef() {
          return this.opts.superRef ? cloneNode(this.opts.superRef) : this.opts.getSuperRef ? cloneNode(this.opts.getSuperRef()) : void 0;
        }
        replace() {
          this.opts.refToPreserve && this.methodPath.traverse(unshadowSuperBindingVisitor, {
            refName: this.opts.refToPreserve.name
          });
          const handler = this.constantSuper ? looseHandlers : specHandlers;
          (0, _helperMemberExpressionToFunctions.default)(this.methodPath, visitor, Object.assign({
            file: this.file,
            scope: this.methodPath.scope,
            isDerivedConstructor: this.isDerivedConstructor,
            isStatic: this.isStatic,
            isPrivateMethod: this.isPrivateMethod,
            getObjectRef: this.getObjectRef.bind(this),
            getSuperRef: this.getSuperRef.bind(this),
            boundGet: handler.get
          }, handler));
        }
      };
    },
    3177: module => {
      module.exports = require("../lib/plugin-utils");
    },
    7098: module => {
      module.exports = require("../lib/traverse");
    },
    8459: module => {
      module.exports = require("../lib/types");
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
    var _helperPluginUtils = __webpack_require__(3177), _helperReplaceSupers = __webpack_require__(4149), _core = __webpack_require__(4629);
    var _default = (0, _helperPluginUtils.declare)((api => (api.assertVersion(7), {
      name: "transform-object-super",
      visitor: {
        ObjectExpression(path, state) {
          let objectRef;
          const getObjectRef = () => objectRef = objectRef || path.scope.generateUidIdentifier("obj");
          path.get("properties").forEach((propPath => {
            propPath.isMethod() && function(path, getObjectRef, file) {
              new _helperReplaceSupers.default({
                getObjectRef,
                methodPath: path,
                file
              }).replace();
            }(propPath, getObjectRef, state);
          })), objectRef && (path.scope.push({
            id: _core.types.cloneNode(objectRef)
          }), path.replaceWith(_core.types.assignmentExpression("=", _core.types.cloneNode(objectRef), path.node)));
        }
      }
    })));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();