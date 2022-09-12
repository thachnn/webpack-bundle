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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 529);
}({
  0: function(module, exports) {
    module.exports = require("../lib/types");
  },
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
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
  46: function(module, exports) {
    module.exports = require("../lib/traverse");
  },
  529: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _helperReplaceSupers = (obj = __webpack_require__(30)) && obj.__esModule ? obj : {
      default: obj
    }, _core = __webpack_require__(2);
    var _default = (0, _helperPluginUtils.declare)(api => (api.assertVersion(7), {
      name: "transform-object-super",
      visitor: {
        ObjectExpression(path, state) {
          let objectRef;
          const getObjectRef = () => objectRef = objectRef || path.scope.generateUidIdentifier("obj");
          path.get("properties").forEach(propPath => {
            propPath.isMethod() && function(path, getObjectRef, file) {
              new _helperReplaceSupers.default({
                getObjectRef: getObjectRef,
                methodPath: path,
                file: file
              }).replace();
            }(propPath, getObjectRef, state);
          }), objectRef && (path.scope.push({
            id: _core.types.cloneNode(objectRef)
          }), path.replaceWith(_core.types.assignmentExpression("=", _core.types.cloneNode(objectRef), path.node)));
        }
      }
    }));
    exports.default = _default;
  }
});