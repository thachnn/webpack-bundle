(() => {
  "use strict";
  var __webpack_modules__ = {
    9876: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(loose, path, state) {
        const pushComputedProps = loose ? pushComputedPropsLoose : pushComputedPropsSpec, {node} = path, build = pushComputedProps(path, state), declar = build.declar, loop = build.loop, block = loop.body;
        path.ensureBlock(), declar && block.body.push(declar);
        block.body.push(...node.body.body), _core.types.inherits(loop, node), _core.types.inherits(loop.body, node.body), 
        build.replaceParent ? (path.parentPath.replaceWithMultiple(build.node), path.remove()) : path.replaceWithMultiple(build.node);
      };
      var _core = __webpack_require__(4629);
      const buildForOfLoose = (0, _core.template)("\n  for (var LOOP_OBJECT = OBJECT,\n          IS_ARRAY = Array.isArray(LOOP_OBJECT),\n          INDEX = 0,\n          LOOP_OBJECT = IS_ARRAY ? LOOP_OBJECT : LOOP_OBJECT[Symbol.iterator]();;) {\n    INTERMEDIATE;\n    if (IS_ARRAY) {\n      if (INDEX >= LOOP_OBJECT.length) break;\n      ID = LOOP_OBJECT[INDEX++];\n    } else {\n      INDEX = LOOP_OBJECT.next();\n      if (INDEX.done) break;\n      ID = INDEX.value;\n    }\n  }\n"), buildForOf = (0, 
      _core.template)("\n  var ITERATOR_COMPLETION = true;\n  var ITERATOR_HAD_ERROR_KEY = false;\n  var ITERATOR_ERROR_KEY = undefined;\n  try {\n    for (\n      var ITERATOR_KEY = OBJECT[Symbol.iterator](), STEP_KEY;\n      !(ITERATOR_COMPLETION = (STEP_KEY = ITERATOR_KEY.next()).done);\n      ITERATOR_COMPLETION = true\n    ) {}\n  } catch (err) {\n    ITERATOR_HAD_ERROR_KEY = true;\n    ITERATOR_ERROR_KEY = err;\n  } finally {\n    try {\n      if (!ITERATOR_COMPLETION && ITERATOR_KEY.return != null) {\n        ITERATOR_KEY.return();\n      }\n    } finally {\n      if (ITERATOR_HAD_ERROR_KEY) {\n        throw ITERATOR_ERROR_KEY;\n      }\n    }\n  }\n");
      function pushComputedPropsLoose(path, file) {
        const {node, scope, parent} = path, {left} = node;
        let declar, id, intermediate;
        if (_core.types.isIdentifier(left) || _core.types.isPattern(left) || _core.types.isMemberExpression(left)) id = left, 
        intermediate = null; else {
          if (!_core.types.isVariableDeclaration(left)) throw file.buildCodeFrameError(left, `Unknown node type ${left.type} in ForStatement`);
          id = scope.generateUidIdentifier("ref"), declar = _core.types.variableDeclaration(left.kind, [ _core.types.variableDeclarator(left.declarations[0].id, _core.types.identifier(id.name)) ]), 
          intermediate = _core.types.variableDeclaration("var", [ _core.types.variableDeclarator(_core.types.identifier(id.name)) ]);
        }
        const iteratorKey = scope.generateUidIdentifier("iterator"), isArrayKey = scope.generateUidIdentifier("isArray"), loop = buildForOfLoose({
          LOOP_OBJECT: iteratorKey,
          IS_ARRAY: isArrayKey,
          OBJECT: node.right,
          INDEX: scope.generateUidIdentifier("i"),
          ID: id,
          INTERMEDIATE: intermediate
        }), isLabeledParent = _core.types.isLabeledStatement(parent);
        let labeled;
        return isLabeledParent && (labeled = _core.types.labeledStatement(parent.label, loop)), 
        {
          replaceParent: isLabeledParent,
          declar,
          node: labeled || loop,
          loop
        };
      }
      function pushComputedPropsSpec(path, file) {
        const {node, scope, parent} = path, left = node.left;
        let declar;
        const stepKey = scope.generateUid("step"), stepValue = _core.types.memberExpression(_core.types.identifier(stepKey), _core.types.identifier("value"));
        if (_core.types.isIdentifier(left) || _core.types.isPattern(left) || _core.types.isMemberExpression(left)) declar = _core.types.expressionStatement(_core.types.assignmentExpression("=", left, stepValue)); else {
          if (!_core.types.isVariableDeclaration(left)) throw file.buildCodeFrameError(left, `Unknown node type ${left.type} in ForStatement`);
          declar = _core.types.variableDeclaration(left.kind, [ _core.types.variableDeclarator(left.declarations[0].id, stepValue) ]);
        }
        const template = buildForOf({
          ITERATOR_HAD_ERROR_KEY: scope.generateUidIdentifier("didIteratorError"),
          ITERATOR_COMPLETION: scope.generateUidIdentifier("iteratorNormalCompletion"),
          ITERATOR_ERROR_KEY: scope.generateUidIdentifier("iteratorError"),
          ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
          STEP_KEY: _core.types.identifier(stepKey),
          OBJECT: node.right
        }), isLabeledParent = _core.types.isLabeledStatement(parent), tryBody = template[3].block.body, loop = tryBody[0];
        return isLabeledParent && (tryBody[0] = _core.types.labeledStatement(parent.label, loop)), 
        {
          replaceParent: isLabeledParent,
          declar,
          loop,
          node: template
        };
      }
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
    var _helperPluginUtils = __webpack_require__(5488), _core = __webpack_require__(4629), _noHelperImplementation = __webpack_require__(9876), _default = (0, 
    _helperPluginUtils.declare)(((api, options) => {
      var _options$assumeArray, _options$allowArrayLi, _api$assumption;
      api.assertVersion(7);
      {
        const {assumeArray, allowArrayLike, loose} = options;
        if (!0 === loose && !0 === assumeArray) throw new Error("The loose and assumeArray options cannot be used together in @babel/plugin-transform-for-of");
        if (!0 === assumeArray && !0 === allowArrayLike) throw new Error("The assumeArray and allowArrayLike options cannot be used together in @babel/plugin-transform-for-of");
        if (allowArrayLike && /^7\.\d\./.test(api.version)) throw new Error("The allowArrayLike is only supported when using @babel/core@^7.10.0");
      }
      const iterableIsArray = null != (_options$assumeArray = options.assumeArray) ? _options$assumeArray : !options.loose && api.assumption("iterableIsArray"), arrayLikeIsIterable = null != (_options$allowArrayLi = options.allowArrayLike) ? _options$allowArrayLi : api.assumption("arrayLikeIsIterable"), skipteratorClosing = null != (_api$assumption = api.assumption("skipForOfIteratorClosing")) ? _api$assumption : options.loose;
      if (iterableIsArray && arrayLikeIsIterable) throw new Error('The "iterableIsArray" and "arrayLikeIsIterable" assumptions are not compatible.');
      if (iterableIsArray) return {
        name: "transform-for-of",
        visitor: {
          ForOfStatement(path) {
            const {scope} = path, {left, right, await: isAwait} = path.node;
            if (isAwait) return;
            const i = scope.generateUidIdentifier("i");
            let array = scope.maybeGenerateMemoised(right, !0);
            const inits = [ _core.types.variableDeclarator(i, _core.types.numericLiteral(0)) ];
            array ? inits.push(_core.types.variableDeclarator(array, right)) : array = right;
            const item = _core.types.memberExpression(_core.types.cloneNode(array), _core.types.cloneNode(i), !0);
            let assignment, blockBody;
            _core.types.isVariableDeclaration(left) ? (assignment = left, assignment.declarations[0].init = item) : assignment = _core.types.expressionStatement(_core.types.assignmentExpression("=", left, item));
            const body = path.get("body");
            body.isBlockStatement() && Object.keys(path.getBindingIdentifiers()).some((id => body.scope.hasOwnBinding(id))) ? blockBody = _core.types.blockStatement([ assignment, body.node ]) : (blockBody = _core.types.toBlock(body.node), 
            blockBody.body.unshift(assignment)), path.replaceWith(_core.types.forStatement(_core.types.variableDeclaration("let", inits), _core.types.binaryExpression("<", _core.types.cloneNode(i), _core.types.memberExpression(_core.types.cloneNode(array), _core.types.identifier("length"))), _core.types.updateExpression("++", _core.types.cloneNode(i)), blockBody));
          }
        }
      };
      const buildForOfArray = _core.template`
    for (var KEY = 0, NAME = ARR; KEY < NAME.length; KEY++) BODY;
  `, buildForOfNoIteratorClosing = _core.template.statements`
    for (var ITERATOR_HELPER = CREATE_ITERATOR_HELPER(OBJECT, ARRAY_LIKE_IS_ITERABLE), STEP_KEY;
        !(STEP_KEY = ITERATOR_HELPER()).done;) BODY;
  `, buildForOf = _core.template.statements`
    var ITERATOR_HELPER = CREATE_ITERATOR_HELPER(OBJECT, ARRAY_LIKE_IS_ITERABLE), STEP_KEY;
    try {
      for (ITERATOR_HELPER.s(); !(STEP_KEY = ITERATOR_HELPER.n()).done;) BODY;
    } catch (err) {
      ITERATOR_HELPER.e(err);
    } finally {
      ITERATOR_HELPER.f();
    }
  `, builder = skipteratorClosing ? {
        build: buildForOfNoIteratorClosing,
        helper: "createForOfIteratorHelperLoose",
        getContainer: nodes => nodes
      } : {
        build: buildForOf,
        helper: "createForOfIteratorHelper",
        getContainer: nodes => nodes[1].block.body
      };
      return {
        name: "transform-for-of",
        visitor: {
          ForOfStatement(path, state) {
            const right = path.get("right");
            if (right.isArrayExpression() || right.isGenericType("Array") || _core.types.isArrayTypeAnnotation(right.getTypeAnnotation())) return void path.replaceWith(function(path) {
              const {node, scope} = path, right = scope.generateUidIdentifierBasedOnNode(node.right, "arr"), iterationKey = scope.generateUidIdentifier("i"), loop = buildForOfArray({
                BODY: node.body,
                KEY: iterationKey,
                NAME: right,
                ARR: node.right
              });
              _core.types.inherits(loop, node), _core.types.ensureBlock(loop);
              const iterationValue = _core.types.memberExpression(_core.types.cloneNode(right), _core.types.cloneNode(iterationKey), !0), left = node.left;
              return _core.types.isVariableDeclaration(left) ? (left.declarations[0].init = iterationValue, 
              loop.body.body.unshift(left)) : loop.body.body.unshift(_core.types.expressionStatement(_core.types.assignmentExpression("=", left, iterationValue))), 
              loop;
            }(path));
            if (!state.availableHelper(builder.helper)) return void (0, _noHelperImplementation.default)(skipteratorClosing, path, state);
            const {node, parent, scope} = path, left = node.left;
            let declar;
            const stepKey = scope.generateUid("step"), stepValue = _core.types.memberExpression(_core.types.identifier(stepKey), _core.types.identifier("value"));
            declar = _core.types.isVariableDeclaration(left) ? _core.types.variableDeclaration(left.kind, [ _core.types.variableDeclarator(left.declarations[0].id, stepValue) ]) : _core.types.expressionStatement(_core.types.assignmentExpression("=", left, stepValue)), 
            path.ensureBlock(), node.body.body.unshift(declar);
            const nodes = builder.build({
              CREATE_ITERATOR_HELPER: state.addHelper(builder.helper),
              ITERATOR_HELPER: scope.generateUidIdentifier("iterator"),
              ARRAY_LIKE_IS_ITERABLE: arrayLikeIsIterable ? _core.types.booleanLiteral(!0) : null,
              STEP_KEY: _core.types.identifier(stepKey),
              OBJECT: node.right,
              BODY: node.body
            }), container = builder.getContainer(nodes);
            _core.types.inherits(container[0], node), _core.types.inherits(container[0].body, node.body), 
            _core.types.isLabeledStatement(parent) ? (container[0] = _core.types.labeledStatement(parent.label, container[0]), 
            path.parentPath.replaceWithMultiple(nodes), path.skip()) : path.replaceWithMultiple(nodes);
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