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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 485);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  141: function(module, exports) {
    module.exports = require("../plugins/syntax-object-rest-spread");
  },
  144: function(module, exports) {
    module.exports = require("../plugins/transform-parameters");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  485: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _pluginSyntaxObjectRestSpread = (obj = __webpack_require__(141)) && obj.__esModule ? obj : {
      default: obj
    }, _core = __webpack_require__(2), _pluginTransformParameters = __webpack_require__(144);
    const ZERO_REFS = (() => {
      const node = _core.types.identifier("a"), property = _core.types.objectProperty(_core.types.identifier("key"), node), pattern = _core.types.objectPattern([ property ]);
      return _core.types.isReferenced(node, property, pattern) ? 1 : 0;
    })();
    var _default = (0, _helperPluginUtils.declare)((api, opts) => {
      api.assertVersion(7);
      const {useBuiltIns: useBuiltIns = !1, loose: loose = !1} = opts;
      if ("boolean" != typeof loose) throw new Error(".loose must be a boolean, or undefined");
      function getExtendsHelper(file) {
        return useBuiltIns ? _core.types.memberExpression(_core.types.identifier("Object"), _core.types.identifier("assign")) : file.addHelper("extends");
      }
      function hasRestElement(path) {
        let foundRestElement = !1;
        return visitRestElements(path, restElement => {
          foundRestElement = !0, restElement.stop();
        }), foundRestElement;
      }
      function hasObjectPatternRestElement(path) {
        let foundRestElement = !1;
        return visitRestElements(path, restElement => {
          restElement.parentPath.isObjectPattern() && (foundRestElement = !0, restElement.stop());
        }), foundRestElement;
      }
      function visitRestElements(path, visitor) {
        path.traverse({
          Expression(path) {
            const parentType = path.parent.type;
            ("AssignmentPattern" === parentType && "right" === path.key || "ObjectProperty" === parentType && path.parent.computed && "key" === path.key) && path.skip();
          },
          RestElement: visitor
        });
      }
      function replaceImpureComputedKeys(properties, scope) {
        const impureComputedPropertyDeclarators = [];
        for (const propPath of properties) {
          const key = propPath.get("key");
          if (propPath.node.computed && !key.isPure()) {
            const name = scope.generateUidBasedOnNode(key.node), declarator = _core.types.variableDeclarator(_core.types.identifier(name), key.node);
            impureComputedPropertyDeclarators.push(declarator), key.replaceWith(_core.types.identifier(name));
          }
        }
        return impureComputedPropertyDeclarators;
      }
      function createObjectSpread(path, file, objRef) {
        const props = path.get("properties"), last = props[props.length - 1];
        _core.types.assertRestElement(last.node);
        const restElement = _core.types.cloneNode(last.node);
        last.remove();
        const impureComputedPropertyDeclarators = replaceImpureComputedKeys(path.get("properties"), path.scope), {keys: keys, allLiteral: allLiteral} = function(path) {
          const props = path.node.properties, keys = [];
          let allLiteral = !0;
          for (const prop of props) _core.types.isIdentifier(prop.key) && !prop.computed ? keys.push(_core.types.stringLiteral(prop.key.name)) : _core.types.isTemplateLiteral(prop.key) ? keys.push(_core.types.cloneNode(prop.key)) : _core.types.isLiteral(prop.key) ? keys.push(_core.types.stringLiteral(String(prop.key.value))) : (keys.push(_core.types.cloneNode(prop.key)), 
          allLiteral = !1);
          return {
            keys: keys,
            allLiteral: allLiteral
          };
        }(path);
        if (0 === keys.length) return [ impureComputedPropertyDeclarators, restElement.argument, _core.types.callExpression(getExtendsHelper(file), [ _core.types.objectExpression([]), _core.types.cloneNode(objRef) ]) ];
        let keyExpression;
        return keyExpression = allLiteral ? _core.types.arrayExpression(keys) : _core.types.callExpression(_core.types.memberExpression(_core.types.arrayExpression(keys), _core.types.identifier("map")), [ file.addHelper("toPropertyKey") ]), 
        [ impureComputedPropertyDeclarators, restElement.argument, _core.types.callExpression(file.addHelper("objectWithoutProperties" + (loose ? "Loose" : "")), [ _core.types.cloneNode(objRef), keyExpression ]) ];
      }
      function replaceRestElement(parentPath, paramPath, container) {
        if (paramPath.isAssignmentPattern()) replaceRestElement(parentPath, paramPath.get("left"), container); else {
          if (paramPath.isArrayPattern() && hasRestElement(paramPath)) {
            const elements = paramPath.get("elements");
            for (let i = 0; i < elements.length; i++) replaceRestElement(parentPath, elements[i], container);
          }
          if (paramPath.isObjectPattern() && hasRestElement(paramPath)) {
            const uid = parentPath.scope.generateUidIdentifier("ref"), declar = _core.types.variableDeclaration("let", [ _core.types.variableDeclarator(paramPath.node, uid) ]);
            container ? container.push(declar) : (parentPath.ensureBlock(), parentPath.get("body").unshiftContainer("body", declar)), 
            paramPath.replaceWith(_core.types.cloneNode(uid));
          }
        }
      }
      return {
        name: "proposal-object-rest-spread",
        inherits: _pluginSyntaxObjectRestSpread.default,
        visitor: {
          Function(path) {
            const params = path.get("params"), paramsWithRestElement = new Set, idsInRestParams = new Set;
            for (let i = 0; i < params.length; ++i) {
              const param = params[i];
              if (hasRestElement(param)) {
                paramsWithRestElement.add(i);
                for (const name of Object.keys(param.getBindingIdentifiers())) idsInRestParams.add(name);
              }
            }
            let idInRest = !1;
            const IdentifierHandler = function(path, functionScope) {
              const name = path.node.name;
              path.scope.getBinding(name) === functionScope.getBinding(name) && idsInRestParams.has(name) && (idInRest = !0, 
              path.stop());
            };
            let i;
            for (i = 0; i < params.length && !idInRest; ++i) {
              const param = params[i];
              paramsWithRestElement.has(i) || (param.isReferencedIdentifier() || param.isBindingIdentifier() ? IdentifierHandler(path, path.scope) : param.traverse({
                "Scope|TypeAnnotation|TSTypeAnnotation": path => path.skip(),
                "ReferencedIdentifier|BindingIdentifier": IdentifierHandler
              }, path.scope));
            }
            if (idInRest) {
              const shouldTransformParam = idx => idx >= i - 1 || paramsWithRestElement.has(idx);
              (0, _pluginTransformParameters.convertFunctionParams)(path, loose, shouldTransformParam, replaceRestElement);
            } else for (let i = 0; i < params.length; ++i) {
              const param = params[i];
              paramsWithRestElement.has(i) && replaceRestElement(param.parentPath, param);
            }
          },
          VariableDeclarator(path, file) {
            if (!path.get("id").isObjectPattern()) return;
            let insertionPath = path;
            const originalPath = path;
            visitRestElements(path.get("id"), path => {
              if (!path.parentPath.isObjectPattern()) return;
              if (originalPath.node.id.properties.length > 1 && !_core.types.isIdentifier(originalPath.node.init)) {
                const initRef = path.scope.generateUidIdentifierBasedOnNode(originalPath.node.init, "ref");
                return originalPath.insertBefore(_core.types.variableDeclarator(initRef, originalPath.node.init)), 
                void originalPath.replaceWith(_core.types.variableDeclarator(originalPath.node.id, _core.types.cloneNode(initRef)));
              }
              let ref = originalPath.node.init;
              const refPropertyPath = [];
              let kind;
              path.findParent(path => {
                if (path.isObjectProperty()) refPropertyPath.unshift(path); else if (path.isVariableDeclarator()) return kind = path.parentPath.node.kind, 
                !0;
              });
              const impureObjRefComputedDeclarators = replaceImpureComputedKeys(refPropertyPath, path.scope);
              refPropertyPath.forEach(prop => {
                const {node: node} = prop;
                ref = _core.types.memberExpression(ref, _core.types.cloneNode(node.key), node.computed || _core.types.isLiteral(node.key));
              });
              const objectPatternPath = path.findParent(path => path.isObjectPattern()), [impureComputedPropertyDeclarators, argument, callExpression] = createObjectSpread(objectPatternPath, file, ref);
              loose && function(path) {
                const bindings = path.getOuterBindingIdentifierPaths();
                Object.keys(bindings).forEach(bindingName => {
                  const bindingParentPath = bindings[bindingName].parentPath;
                  path.scope.getBinding(bindingName).references > ZERO_REFS || !bindingParentPath.isObjectProperty() || bindingParentPath.remove();
                });
              }(objectPatternPath), _core.types.assertIdentifier(argument), insertionPath.insertBefore(impureComputedPropertyDeclarators), 
              insertionPath.insertBefore(impureObjRefComputedDeclarators), insertionPath.insertAfter(_core.types.variableDeclarator(argument, callExpression)), 
              insertionPath = insertionPath.getSibling(insertionPath.key + 1), path.scope.registerBinding(kind, insertionPath), 
              0 === objectPatternPath.node.properties.length && objectPatternPath.findParent(path => path.isObjectProperty() || path.isVariableDeclarator()).remove();
            });
          },
          ExportNamedDeclaration(path) {
            const declaration = path.get("declaration");
            if (!declaration.isVariableDeclaration()) return;
            if (!declaration.get("declarations").some(path => hasObjectPatternRestElement(path.get("id")))) return;
            const specifiers = [];
            for (const name of Object.keys(path.getOuterBindingIdentifiers(path))) specifiers.push(_core.types.exportSpecifier(_core.types.identifier(name), _core.types.identifier(name)));
            path.replaceWith(declaration.node), path.insertAfter(_core.types.exportNamedDeclaration(null, specifiers));
          },
          CatchClause(path) {
            const paramPath = path.get("param");
            replaceRestElement(paramPath.parentPath, paramPath);
          },
          AssignmentExpression(path, file) {
            const leftPath = path.get("left");
            if (leftPath.isObjectPattern() && hasRestElement(leftPath)) {
              const nodes = [], refName = path.scope.generateUidBasedOnNode(path.node.right, "ref");
              nodes.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(_core.types.identifier(refName), path.node.right) ]));
              const [impureComputedPropertyDeclarators, argument, callExpression] = createObjectSpread(leftPath, file, _core.types.identifier(refName));
              impureComputedPropertyDeclarators.length > 0 && nodes.push(_core.types.variableDeclaration("var", impureComputedPropertyDeclarators));
              const nodeWithoutSpread = _core.types.cloneNode(path.node);
              nodeWithoutSpread.right = _core.types.identifier(refName), nodes.push(_core.types.expressionStatement(nodeWithoutSpread)), 
              nodes.push(_core.types.toStatement(_core.types.assignmentExpression("=", argument, callExpression))), 
              nodes.push(_core.types.expressionStatement(_core.types.identifier(refName))), path.replaceWithMultiple(nodes);
            }
          },
          ForXStatement(path) {
            const {node: node, scope: scope} = path, leftPath = path.get("left"), left = node.left;
            if (hasObjectPatternRestElement(leftPath)) if (_core.types.isVariableDeclaration(left)) {
              const pattern = left.declarations[0].id, key = scope.generateUidIdentifier("ref");
              node.left = _core.types.variableDeclaration(left.kind, [ _core.types.variableDeclarator(key, null) ]), 
              path.ensureBlock(), node.body.body.unshift(_core.types.variableDeclaration(node.left.kind, [ _core.types.variableDeclarator(pattern, _core.types.cloneNode(key)) ]));
            } else {
              const temp = scope.generateUidIdentifier("ref");
              node.left = _core.types.variableDeclaration("var", [ _core.types.variableDeclarator(temp) ]), 
              path.ensureBlock(), 0 === node.body.body.length && path.isCompletionRecord() && node.body.body.unshift(_core.types.expressionStatement(scope.buildUndefinedNode())), 
              node.body.body.unshift(_core.types.expressionStatement(_core.types.assignmentExpression("=", left, _core.types.cloneNode(temp))));
            }
          },
          ArrayPattern(path) {
            const objectPatterns = [];
            if (visitRestElements(path, path => {
              if (!path.parentPath.isObjectPattern()) return;
              const objectPattern = path.parentPath, uid = path.scope.generateUidIdentifier("ref");
              objectPatterns.push(_core.types.variableDeclarator(objectPattern.node, uid)), objectPattern.replaceWith(_core.types.cloneNode(uid)), 
              path.skip();
            }), objectPatterns.length > 0) {
              const statementPath = path.getStatementParent();
              statementPath.insertAfter(_core.types.variableDeclaration(statementPath.node.kind || "var", objectPatterns));
            }
          },
          ObjectExpression(path, file) {
            if (!function(node) {
              for (const prop of node.properties) if (_core.types.isSpreadElement(prop)) return !0;
              return !1;
            }(path.node)) return;
            let helper;
            if (loose) helper = getExtendsHelper(file); else try {
              helper = file.addHelper("objectSpread2");
            } catch (_unused) {
              this.file.declarations.objectSpread2 = null, helper = file.addHelper("objectSpread");
            }
            let exp = null, props = [];
            function make() {
              const hadProps = props.length > 0, obj = _core.types.objectExpression(props);
              props = [], exp ? loose ? hadProps && exp.arguments.push(obj) : exp = _core.types.callExpression(_core.types.cloneNode(helper), [ exp, ...hadProps ? [ _core.types.objectExpression([]), obj ] : [] ]) : exp = _core.types.callExpression(helper, [ obj ]);
            }
            for (const prop of path.node.properties) _core.types.isSpreadElement(prop) ? (make(), 
            exp.arguments.push(prop.argument)) : props.push(prop);
            props.length && make(), path.replaceWith(exp);
          }
        }
      };
    });
    exports.default = _default;
  }
});