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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 510);
}({
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  510: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _core = __webpack_require__(2), _default = (0, 
    _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose} = options, pushComputedProps = loose ? function(info) {
        for (const prop of info.computedProps) "get" === prop.kind || "set" === prop.kind ? pushMutatorDefine(info, prop) : pushAssign(_core.types.cloneNode(info.objId), prop, info.body);
      } : function(info) {
        const {objId: objId, body: body, computedProps: computedProps, state: state} = info;
        for (const prop of computedProps) {
          const key = _core.types.toComputedKey(prop);
          if ("get" === prop.kind || "set" === prop.kind) pushMutatorDefine(info, prop); else if (_core.types.isStringLiteral(key, {
            value: "__proto__"
          })) pushAssign(objId, prop, body); else {
            if (1 === computedProps.length) return _core.types.callExpression(state.addHelper("defineProperty"), [ info.initPropExpression, key, getValue(prop) ]);
            body.push(_core.types.expressionStatement(_core.types.callExpression(state.addHelper("defineProperty"), [ _core.types.cloneNode(objId), key, getValue(prop) ])));
          }
        }
      }, buildMutatorMapAssign = (0, _core.template)("\n    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};\n    MUTATOR_MAP_REF[KEY].KIND = VALUE;\n  ");
      function getValue(prop) {
        return _core.types.isObjectProperty(prop) ? prop.value : _core.types.isObjectMethod(prop) ? _core.types.functionExpression(null, prop.params, prop.body, prop.generator, prop.async) : void 0;
      }
      function pushAssign(objId, prop, body) {
        "get" === prop.kind && "set" === prop.kind ? pushMutatorDefine(objId, prop) : body.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", _core.types.memberExpression(_core.types.cloneNode(objId), prop.key, prop.computed || _core.types.isLiteral(prop.key)), getValue(prop))));
      }
      function pushMutatorDefine({body: body, getMutatorId: getMutatorId, scope: scope}, prop) {
        let key = !prop.computed && _core.types.isIdentifier(prop.key) ? _core.types.stringLiteral(prop.key.name) : prop.key;
        const maybeMemoise = scope.maybeGenerateMemoised(key);
        maybeMemoise && (body.push(_core.types.expressionStatement(_core.types.assignmentExpression("=", maybeMemoise, key))), 
        key = maybeMemoise), body.push(...buildMutatorMapAssign({
          MUTATOR_MAP_REF: getMutatorId(),
          KEY: _core.types.cloneNode(key),
          VALUE: getValue(prop),
          KIND: _core.types.identifier(prop.kind)
        }));
      }
      return {
        name: "transform-computed-properties",
        visitor: {
          ObjectExpression: {
            exit(path, state) {
              const {node: node, parent: parent, scope: scope} = path;
              let hasComputed = !1;
              for (const prop of node.properties) if (hasComputed = !0 === prop.computed, hasComputed) break;
              if (!hasComputed) return;
              const initProps = [], computedProps = [];
              let foundComputed = !1;
              for (const prop of node.properties) prop.computed && (foundComputed = !0), foundComputed ? computedProps.push(prop) : initProps.push(prop);
              const objId = scope.generateUidIdentifierBasedOnNode(parent), initPropExpression = _core.types.objectExpression(initProps), body = [];
              let mutatorRef;
              body.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(objId, initPropExpression) ]));
              const single = pushComputedProps({
                scope: scope,
                objId: objId,
                body: body,
                computedProps: computedProps,
                initPropExpression: initPropExpression,
                getMutatorId: function() {
                  return mutatorRef || (mutatorRef = scope.generateUidIdentifier("mutatorMap"), body.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(mutatorRef, _core.types.objectExpression([])) ]))), 
                  _core.types.cloneNode(mutatorRef);
                },
                state: state
              });
              mutatorRef && body.push(_core.types.expressionStatement(_core.types.callExpression(state.addHelper("defineEnumerableProperties"), [ _core.types.cloneNode(objId), _core.types.cloneNode(mutatorRef) ]))), 
              single ? path.replaceWith(single) : (body.push(_core.types.expressionStatement(_core.types.cloneNode(objId))), 
              path.replaceWithMultiple(body));
            }
          }
        }
      };
    });
    exports.default = _default;
  }
});