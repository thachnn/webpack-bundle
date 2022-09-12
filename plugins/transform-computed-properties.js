(() => {
  "use strict";
  var __webpack_modules__ = {
    3177: module => {
      module.exports = require("../lib/plugin-utils");
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
    var _helperPluginUtils = __webpack_require__(3177), _core = __webpack_require__(4629), _default = (0, 
    _helperPluginUtils.declare)(((api, options) => {
      var _api$assumption;
      api.assertVersion(7);
      const pushComputedProps = (null != (_api$assumption = api.assumption("setComputedProperties")) ? _api$assumption : options.loose) ? function(info) {
        for (const prop of info.computedProps) "get" === prop.kind || "set" === prop.kind ? pushMutatorDefine(info, prop) : pushAssign(_core.types.cloneNode(info.objId), prop, info.body);
      } : function(info) {
        const {objId, body, computedProps, state} = info;
        for (const prop of computedProps) {
          const key = _core.types.toComputedKey(prop);
          if ("get" === prop.kind || "set" === prop.kind) pushMutatorDefine(info, prop); else {
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
      function pushMutatorDefine({body, getMutatorId, scope}, prop) {
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
              const {node, parent, scope} = path;
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
                scope,
                objId,
                body,
                computedProps,
                initPropExpression,
                getMutatorId: function() {
                  return mutatorRef || (mutatorRef = scope.generateUidIdentifier("mutatorMap"), body.push(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(mutatorRef, _core.types.objectExpression([])) ]))), 
                  _core.types.cloneNode(mutatorRef);
                },
                state
              });
              mutatorRef && body.push(_core.types.expressionStatement(_core.types.callExpression(state.addHelper("defineEnumerableProperties"), [ _core.types.cloneNode(objId), _core.types.cloneNode(mutatorRef) ]))), 
              single ? path.replaceWith(single) : (body.push(_core.types.expressionStatement(_core.types.cloneNode(objId))), 
              path.replaceWithMultiple(body));
            }
          }
        }
      };
    }));
    exports.default = _default;
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();