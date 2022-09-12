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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 530);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  530: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "convertFunctionParams", {
      enumerable: !0,
      get: function() {
        return _params.default;
      }
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _params = _interopRequireDefault(__webpack_require__(531)), _rest = _interopRequireDefault(__webpack_require__(532));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var _default = (0, _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose} = options;
      return {
        name: "transform-parameters",
        visitor: {
          Function(path) {
            path.isArrowFunctionExpression() && path.get("params").some(param => param.isRestElement() || param.isAssignmentPattern()) && path.arrowFunctionToExpression();
            const convertedRest = (0, _rest.default)(path), convertedParams = (0, _params.default)(path, loose);
            (convertedRest || convertedParams) && path.scope.crawl();
          }
        }
      };
    });
    exports.default = _default;
  },
  531: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path, loose, shouldTransformParam, replaceRestElement) {
      const params = path.get("params");
      if (params.every(param => param.isIdentifier())) return !1;
      const {node: node, scope: scope} = path, state = {
        stop: !1,
        needsOuterBinding: !1,
        scope: scope
      }, body = [], shadowedParams = new Set;
      for (const param of params) for (const name of Object.keys(param.getBindingIdentifiers())) {
        var _scope$bindings$name;
        const constantViolations = null == (_scope$bindings$name = scope.bindings[name]) ? void 0 : _scope$bindings$name.constantViolations;
        if (constantViolations) for (const redeclarator of constantViolations) {
          const node = redeclarator.node;
          switch (node.type) {
           case "VariableDeclarator":
            if (null === node.init) {
              const declaration = redeclarator.parentPath;
              if (!declaration.parentPath.isFor() || declaration.parentPath.get("body") === declaration) {
                redeclarator.remove();
                break;
              }
            }
            shadowedParams.add(name);
            break;

           case "FunctionDeclaration":
            shadowedParams.add(name);
          }
        }
      }
      if (0 === shadowedParams.size) for (const param of params) if (param.isIdentifier() || param.traverse(iifeVisitor, state), 
      state.needsOuterBinding) break;
      let firstOptionalIndex = null;
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if (shouldTransformParam && !shouldTransformParam(i)) continue;
        const transformedRestNodes = [];
        replaceRestElement && replaceRestElement(param.parentPath, param, transformedRestNodes);
        const paramIsAssignmentPattern = param.isAssignmentPattern();
        if (paramIsAssignmentPattern && (loose || "set" === node.kind)) {
          const left = param.get("left"), right = param.get("right"), undefinedNode = scope.buildUndefinedNode();
          if (left.isIdentifier()) body.push(buildLooseDefaultParam({
            ASSIGNMENT_IDENTIFIER: _core.types.cloneNode(left.node),
            DEFAULT_VALUE: right.node,
            UNDEFINED: undefinedNode
          })), param.replaceWith(left.node); else if (left.isObjectPattern() || left.isArrayPattern()) {
            const paramName = scope.generateUidIdentifier();
            body.push(buildLooseDestructuredDefaultParam({
              ASSIGNMENT_IDENTIFIER: left.node,
              DEFAULT_VALUE: right.node,
              PARAMETER_NAME: _core.types.cloneNode(paramName),
              UNDEFINED: undefinedNode
            })), param.replaceWith(paramName);
          }
        } else if (paramIsAssignmentPattern) {
          null === firstOptionalIndex && (firstOptionalIndex = i);
          const left = param.get("left"), right = param.get("right"), defNode = buildDefaultParam({
            VARIABLE_NAME: left.node,
            DEFAULT_VALUE: right.node,
            ARGUMENT_KEY: _core.types.numericLiteral(i)
          });
          body.push(defNode);
        } else if (null !== firstOptionalIndex) {
          const defNode = buildSafeArgumentsAccess([ param.node, _core.types.numericLiteral(i) ]);
          body.push(defNode);
        } else if (param.isObjectPattern() || param.isArrayPattern()) {
          const uid = path.scope.generateUidIdentifier("ref"), defNode = _core.types.variableDeclaration("let", [ _core.types.variableDeclarator(param.node, uid) ]);
          body.push(defNode), param.replaceWith(_core.types.cloneNode(uid));
        }
        if (transformedRestNodes) for (const transformedNode of transformedRestNodes) body.push(transformedNode);
      }
      null !== firstOptionalIndex && (node.params = node.params.slice(0, firstOptionalIndex));
      if (path.ensureBlock(), state.needsOuterBinding || shadowedParams.size > 0) {
        body.push(function(shadowedParams, body) {
          const args = [], params = [];
          for (const name of shadowedParams) args.push(_core.types.identifier(name)), params.push(_core.types.identifier(name));
          return _core.types.returnStatement(_core.types.callExpression(_core.types.arrowFunctionExpression(params, body), args));
        }(shadowedParams, path.get("body").node)), path.set("body", _core.types.blockStatement(body));
        const bodyPath = path.get("body.body"), arrowPath = bodyPath[bodyPath.length - 1].get("argument.callee");
        arrowPath.arrowFunctionToExpression(), arrowPath.node.generator = path.node.generator, 
        arrowPath.node.async = path.node.async, path.node.generator = !1;
      } else path.get("body").unshiftContainer("body", body);
      return !0;
    };
    var _core = __webpack_require__(2);
    const buildDefaultParam = (0, _core.template)("\n  let VARIABLE_NAME =\n    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?\n      arguments[ARGUMENT_KEY]\n    :\n      DEFAULT_VALUE;\n"), buildLooseDefaultParam = (0, 
    _core.template)("\n  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {\n    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;\n  }\n"), buildLooseDestructuredDefaultParam = (0, 
    _core.template)("\n  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;\n"), buildSafeArgumentsAccess = (0, 
    _core.template)("\n  let $0 = arguments.length > $1 ? arguments[$1] : undefined;\n"), iifeVisitor = {
      "ReferencedIdentifier|BindingIdentifier"(path, state) {
        const {scope: scope, node: node} = path, {name: name} = node;
        ("eval" === name || scope.getBinding(name) === state.scope.parent.getBinding(name) && state.scope.hasOwnBinding(name)) && (state.needsOuterBinding = !0, 
        path.stop());
      },
      "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration": path => path.skip()
    };
  },
  532: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path) {
      const {node: node, scope: scope} = path;
      if (!function(node) {
        const length = node.params.length;
        return length > 0 && _core.types.isRestElement(node.params[length - 1]);
      }(node)) return !1;
      let rest = node.params.pop().argument;
      const argsId = _core.types.identifier("arguments");
      if (_core.types.isPattern(rest)) {
        const pattern = rest;
        rest = scope.generateUidIdentifier("ref");
        const declar = _core.types.variableDeclaration("let", [ _core.types.variableDeclarator(pattern, rest) ]);
        node.body.body.unshift(declar);
      }
      const paramsCount = function(node) {
        let count = node.params.length;
        count > 0 && _core.types.isIdentifier(node.params[0], {
          name: "this"
        }) && (count -= 1);
        return count;
      }(node), state = {
        references: [],
        offset: paramsCount,
        argumentsNode: argsId,
        outerBinding: scope.getBindingIdentifier(rest.name),
        candidates: [],
        name: rest.name,
        deopted: !1
      };
      if (path.traverse(memberExpressionOptimisationVisitor, state), !state.deopted && !state.references.length) {
        for (const {path: path, cause: cause} of state.candidates) {
          const clonedArgsId = _core.types.cloneNode(argsId);
          switch (cause) {
           case "indexGetter":
            optimiseIndexGetter(path, clonedArgsId, state.offset);
            break;

           case "lengthGetter":
            optimiseLengthGetter(path, clonedArgsId, state.offset);
            break;

           default:
            path.replaceWith(clonedArgsId);
          }
        }
        return !0;
      }
      state.references = state.references.concat(state.candidates.map(({path: path}) => path));
      const start = _core.types.numericLiteral(paramsCount), key = scope.generateUidIdentifier("key"), len = scope.generateUidIdentifier("len");
      let arrKey, arrLen;
      paramsCount ? (arrKey = _core.types.binaryExpression("-", _core.types.cloneNode(key), _core.types.cloneNode(start)), 
      arrLen = _core.types.conditionalExpression(_core.types.binaryExpression(">", _core.types.cloneNode(len), _core.types.cloneNode(start)), _core.types.binaryExpression("-", _core.types.cloneNode(len), _core.types.cloneNode(start)), _core.types.numericLiteral(0))) : (arrKey = _core.types.identifier(key.name), 
      arrLen = _core.types.identifier(len.name));
      const loop = buildRest({
        ARGUMENTS: argsId,
        ARRAY_KEY: arrKey,
        ARRAY_LEN: arrLen,
        START: start,
        ARRAY: rest,
        KEY: key,
        LEN: len
      });
      if (state.deopted) node.body.body.unshift(loop); else {
        let target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();
        target.findParent(path => {
          if (!path.isLoop()) return path.isFunction();
          target = path;
        }), target.insertBefore(loop);
      }
      return !0;
    };
    var _core = __webpack_require__(2);
    const buildRest = (0, _core.template)("\n  for (var LEN = ARGUMENTS.length,\n           ARRAY = new Array(ARRAY_LEN),\n           KEY = START;\n       KEY < LEN;\n       KEY++) {\n    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];\n  }\n"), restIndex = (0, 
    _core.template)("\n  (INDEX < OFFSET || ARGUMENTS.length <= INDEX) ? undefined : ARGUMENTS[INDEX]\n"), restIndexImpure = (0, 
    _core.template)("\n  REF = INDEX, (REF < OFFSET || ARGUMENTS.length <= REF) ? undefined : ARGUMENTS[REF]\n"), restLength = (0, 
    _core.template)("\n  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET\n");
    function referencesRest(path, state) {
      return path.node.name === state.name && path.scope.bindingIdentifierEquals(state.name, state.outerBinding);
    }
    const memberExpressionOptimisationVisitor = {
      Scope(path, state) {
        path.scope.bindingIdentifierEquals(state.name, state.outerBinding) || path.skip();
      },
      Flow(path) {
        path.isTypeCastExpression() || path.skip();
      },
      Function(path, state) {
        const oldNoOptimise = state.noOptimise;
        state.noOptimise = !0, path.traverse(memberExpressionOptimisationVisitor, state), 
        state.noOptimise = oldNoOptimise, path.skip();
      },
      ReferencedIdentifier(path, state) {
        const {node: node} = path;
        if ("arguments" === node.name && (state.deopted = !0), referencesRest(path, state)) if (state.noOptimise) state.deopted = !0; else {
          const {parentPath: parentPath} = path;
          if ("params" === parentPath.listKey && parentPath.key < state.offset) return;
          if (parentPath.isMemberExpression({
            object: node
          })) {
            const grandparentPath = parentPath.parentPath;
            if (!state.deopted && !(grandparentPath.isAssignmentExpression() && parentPath.node === grandparentPath.node.left || grandparentPath.isLVal() || grandparentPath.isForXStatement() || grandparentPath.isUpdateExpression() || grandparentPath.isUnaryExpression({
              operator: "delete"
            }) || (grandparentPath.isCallExpression() || grandparentPath.isNewExpression()) && parentPath.node === grandparentPath.node.callee)) if (parentPath.node.computed) {
              if (parentPath.get("property").isBaseType("number")) return void state.candidates.push({
                cause: "indexGetter",
                path: path
              });
            } else if ("length" === parentPath.node.property.name) return void state.candidates.push({
              cause: "lengthGetter",
              path: path
            });
          }
          if (0 === state.offset && parentPath.isSpreadElement()) {
            const call = parentPath.parentPath;
            if (call.isCallExpression() && 1 === call.node.arguments.length) return void state.candidates.push({
              cause: "argSpread",
              path: path
            });
          }
          state.references.push(path);
        }
      },
      BindingIdentifier(path, state) {
        referencesRest(path, state) && (state.deopted = !0);
      }
    };
    function optimiseIndexGetter(path, argsId, offset) {
      const offsetLiteral = _core.types.numericLiteral(offset);
      let index;
      index = _core.types.isNumericLiteral(path.parent.property) ? _core.types.numericLiteral(path.parent.property.value + offset) : 0 === offset ? path.parent.property : _core.types.binaryExpression("+", path.parent.property, _core.types.cloneNode(offsetLiteral));
      const {scope: scope} = path;
      if (scope.isPure(index)) {
        const parentPath = path.parentPath;
        parentPath.replaceWith(restIndex({
          ARGUMENTS: argsId,
          OFFSET: offsetLiteral,
          INDEX: index
        }));
        const valRes = parentPath.get("test").get("left").evaluate();
        valRes.confident && (!0 === valRes.value ? parentPath.replaceWith(parentPath.scope.buildUndefinedNode()) : parentPath.get("test").replaceWith(parentPath.get("test").get("right")));
      } else {
        const temp = scope.generateUidIdentifierBasedOnNode(index);
        scope.push({
          id: temp,
          kind: "var"
        }), path.parentPath.replaceWith(restIndexImpure({
          ARGUMENTS: argsId,
          OFFSET: offsetLiteral,
          INDEX: index,
          REF: _core.types.cloneNode(temp)
        }));
      }
    }
    function optimiseLengthGetter(path, argsId, offset) {
      offset ? path.parentPath.replaceWith(restLength({
        ARGUMENTS: argsId,
        OFFSET: _core.types.numericLiteral(offset)
      })) : path.replaceWith(argsId);
    }
  }
});