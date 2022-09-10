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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 349);
}([ , function(module, exports, __webpack_require__) {
  var freeGlobal = __webpack_require__(30), freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
  module.exports = root;
}, function(module, exports) {
  module.exports = function(value) {
    var type = typeof value;
    return null != value && ("object" == type || "function" == type);
  };
}, function(module, exports) {
  module.exports = function(value) {
    return null != value && "object" == typeof value;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isArrayExpression = function(node, opts) {
    if (!node) return !1;
    if ("ArrayExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isAssignmentExpression = function(node, opts) {
    if (!node) return !1;
    if ("AssignmentExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBinaryExpression = function(node, opts) {
    if (!node) return !1;
    if ("BinaryExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isInterpreterDirective = function(node, opts) {
    if (!node) return !1;
    if ("InterpreterDirective" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDirective = function(node, opts) {
    if (!node) return !1;
    if ("Directive" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDirectiveLiteral = function(node, opts) {
    if (!node) return !1;
    if ("DirectiveLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBlockStatement = function(node, opts) {
    if (!node) return !1;
    if ("BlockStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBreakStatement = function(node, opts) {
    if (!node) return !1;
    if ("BreakStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isCallExpression = function(node, opts) {
    if (!node) return !1;
    if ("CallExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isCatchClause = function(node, opts) {
    if (!node) return !1;
    if ("CatchClause" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isConditionalExpression = function(node, opts) {
    if (!node) return !1;
    if ("ConditionalExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isContinueStatement = function(node, opts) {
    if (!node) return !1;
    if ("ContinueStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDebuggerStatement = function(node, opts) {
    if (!node) return !1;
    if ("DebuggerStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDoWhileStatement = function(node, opts) {
    if (!node) return !1;
    if ("DoWhileStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEmptyStatement = function(node, opts) {
    if (!node) return !1;
    if ("EmptyStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExpressionStatement = function(node, opts) {
    if (!node) return !1;
    if ("ExpressionStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFile = function(node, opts) {
    if (!node) return !1;
    if ("File" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isForInStatement = function(node, opts) {
    if (!node) return !1;
    if ("ForInStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isForStatement = function(node, opts) {
    if (!node) return !1;
    if ("ForStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFunctionDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("FunctionDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFunctionExpression = function(node, opts) {
    if (!node) return !1;
    if ("FunctionExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isIdentifier = function(node, opts) {
    if (!node) return !1;
    if ("Identifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isIfStatement = function(node, opts) {
    if (!node) return !1;
    if ("IfStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isLabeledStatement = function(node, opts) {
    if (!node) return !1;
    if ("LabeledStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isStringLiteral = function(node, opts) {
    if (!node) return !1;
    if ("StringLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNumericLiteral = function(node, opts) {
    if (!node) return !1;
    if ("NumericLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNullLiteral = function(node, opts) {
    if (!node) return !1;
    if ("NullLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBooleanLiteral = function(node, opts) {
    if (!node) return !1;
    if ("BooleanLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isRegExpLiteral = function(node, opts) {
    if (!node) return !1;
    if ("RegExpLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isLogicalExpression = function(node, opts) {
    if (!node) return !1;
    if ("LogicalExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isMemberExpression = function(node, opts) {
    if (!node) return !1;
    if ("MemberExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNewExpression = function(node, opts) {
    if (!node) return !1;
    if ("NewExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isProgram = function(node, opts) {
    if (!node) return !1;
    if ("Program" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectExpression = function(node, opts) {
    if (!node) return !1;
    if ("ObjectExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectMethod = function(node, opts) {
    if (!node) return !1;
    if ("ObjectMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectProperty = function(node, opts) {
    if (!node) return !1;
    if ("ObjectProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isRestElement = function(node, opts) {
    if (!node) return !1;
    if ("RestElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isReturnStatement = function(node, opts) {
    if (!node) return !1;
    if ("ReturnStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSequenceExpression = function(node, opts) {
    if (!node) return !1;
    if ("SequenceExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isParenthesizedExpression = function(node, opts) {
    if (!node) return !1;
    if ("ParenthesizedExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSwitchCase = function(node, opts) {
    if (!node) return !1;
    if ("SwitchCase" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSwitchStatement = function(node, opts) {
    if (!node) return !1;
    if ("SwitchStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isThisExpression = function(node, opts) {
    if (!node) return !1;
    if ("ThisExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isThrowStatement = function(node, opts) {
    if (!node) return !1;
    if ("ThrowStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTryStatement = function(node, opts) {
    if (!node) return !1;
    if ("TryStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isUnaryExpression = function(node, opts) {
    if (!node) return !1;
    if ("UnaryExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isUpdateExpression = function(node, opts) {
    if (!node) return !1;
    if ("UpdateExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isVariableDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("VariableDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isVariableDeclarator = function(node, opts) {
    if (!node) return !1;
    if ("VariableDeclarator" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isWhileStatement = function(node, opts) {
    if (!node) return !1;
    if ("WhileStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isWithStatement = function(node, opts) {
    if (!node) return !1;
    if ("WithStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isAssignmentPattern = function(node, opts) {
    if (!node) return !1;
    if ("AssignmentPattern" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isArrayPattern = function(node, opts) {
    if (!node) return !1;
    if ("ArrayPattern" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isArrowFunctionExpression = function(node, opts) {
    if (!node) return !1;
    if ("ArrowFunctionExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassBody = function(node, opts) {
    if (!node) return !1;
    if ("ClassBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassExpression = function(node, opts) {
    if (!node) return !1;
    if ("ClassExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("ClassDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportAllDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("ExportAllDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportDefaultDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("ExportDefaultDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportNamedDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("ExportNamedDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportSpecifier = function(node, opts) {
    if (!node) return !1;
    if ("ExportSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isForOfStatement = function(node, opts) {
    if (!node) return !1;
    if ("ForOfStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImportDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("ImportDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImportDefaultSpecifier = function(node, opts) {
    if (!node) return !1;
    if ("ImportDefaultSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImportNamespaceSpecifier = function(node, opts) {
    if (!node) return !1;
    if ("ImportNamespaceSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImportSpecifier = function(node, opts) {
    if (!node) return !1;
    if ("ImportSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isMetaProperty = function(node, opts) {
    if (!node) return !1;
    if ("MetaProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassMethod = function(node, opts) {
    if (!node) return !1;
    if ("ClassMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectPattern = function(node, opts) {
    if (!node) return !1;
    if ("ObjectPattern" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSpreadElement = function(node, opts) {
    if (!node) return !1;
    if ("SpreadElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSuper = function(node, opts) {
    if (!node) return !1;
    if ("Super" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTaggedTemplateExpression = function(node, opts) {
    if (!node) return !1;
    if ("TaggedTemplateExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTemplateElement = function(node, opts) {
    if (!node) return !1;
    if ("TemplateElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTemplateLiteral = function(node, opts) {
    if (!node) return !1;
    if ("TemplateLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isYieldExpression = function(node, opts) {
    if (!node) return !1;
    if ("YieldExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isAnyTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("AnyTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isArrayTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("ArrayTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBooleanTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("BooleanTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBooleanLiteralTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("BooleanLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNullLiteralTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("NullLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassImplements = function(node, opts) {
    if (!node) return !1;
    if ("ClassImplements" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareClass = function(node, opts) {
    if (!node) return !1;
    if ("DeclareClass" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareFunction = function(node, opts) {
    if (!node) return !1;
    if ("DeclareFunction" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareInterface = function(node, opts) {
    if (!node) return !1;
    if ("DeclareInterface" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareModule = function(node, opts) {
    if (!node) return !1;
    if ("DeclareModule" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareModuleExports = function(node, opts) {
    if (!node) return !1;
    if ("DeclareModuleExports" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareTypeAlias = function(node, opts) {
    if (!node) return !1;
    if ("DeclareTypeAlias" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareOpaqueType = function(node, opts) {
    if (!node) return !1;
    if ("DeclareOpaqueType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareVariable = function(node, opts) {
    if (!node) return !1;
    if ("DeclareVariable" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareExportDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("DeclareExportDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclareExportAllDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("DeclareExportAllDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclaredPredicate = function(node, opts) {
    if (!node) return !1;
    if ("DeclaredPredicate" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExistsTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("ExistsTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFunctionTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("FunctionTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFunctionTypeParam = function(node, opts) {
    if (!node) return !1;
    if ("FunctionTypeParam" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isGenericTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("GenericTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isInferredPredicate = function(node, opts) {
    if (!node) return !1;
    if ("InferredPredicate" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isInterfaceExtends = function(node, opts) {
    if (!node) return !1;
    if ("InterfaceExtends" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isInterfaceDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("InterfaceDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isInterfaceTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("InterfaceTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isIntersectionTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("IntersectionTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isMixedTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("MixedTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEmptyTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("EmptyTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNullableTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("NullableTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNumberLiteralTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("NumberLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNumberTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("NumberTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("ObjectTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectTypeInternalSlot = function(node, opts) {
    if (!node) return !1;
    if ("ObjectTypeInternalSlot" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectTypeCallProperty = function(node, opts) {
    if (!node) return !1;
    if ("ObjectTypeCallProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectTypeIndexer = function(node, opts) {
    if (!node) return !1;
    if ("ObjectTypeIndexer" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectTypeProperty = function(node, opts) {
    if (!node) return !1;
    if ("ObjectTypeProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectTypeSpreadProperty = function(node, opts) {
    if (!node) return !1;
    if ("ObjectTypeSpreadProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isOpaqueType = function(node, opts) {
    if (!node) return !1;
    if ("OpaqueType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isQualifiedTypeIdentifier = function(node, opts) {
    if (!node) return !1;
    if ("QualifiedTypeIdentifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isStringLiteralTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("StringLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isStringTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("StringTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSymbolTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("SymbolTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isThisTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("ThisTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTupleTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("TupleTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeofTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("TypeofTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeAlias = function(node, opts) {
    if (!node) return !1;
    if ("TypeAlias" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("TypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeCastExpression = function(node, opts) {
    if (!node) return !1;
    if ("TypeCastExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeParameter = function(node, opts) {
    if (!node) return !1;
    if ("TypeParameter" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeParameterDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TypeParameterDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTypeParameterInstantiation = function(node, opts) {
    if (!node) return !1;
    if ("TypeParameterInstantiation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isUnionTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("UnionTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isVariance = function(node, opts) {
    if (!node) return !1;
    if ("Variance" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isVoidTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("VoidTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("EnumDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumBooleanBody = function(node, opts) {
    if (!node) return !1;
    if ("EnumBooleanBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumNumberBody = function(node, opts) {
    if (!node) return !1;
    if ("EnumNumberBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumStringBody = function(node, opts) {
    if (!node) return !1;
    if ("EnumStringBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumSymbolBody = function(node, opts) {
    if (!node) return !1;
    if ("EnumSymbolBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumBooleanMember = function(node, opts) {
    if (!node) return !1;
    if ("EnumBooleanMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumNumberMember = function(node, opts) {
    if (!node) return !1;
    if ("EnumNumberMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumStringMember = function(node, opts) {
    if (!node) return !1;
    if ("EnumStringMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumDefaultedMember = function(node, opts) {
    if (!node) return !1;
    if ("EnumDefaultedMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXAttribute = function(node, opts) {
    if (!node) return !1;
    if ("JSXAttribute" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXClosingElement = function(node, opts) {
    if (!node) return !1;
    if ("JSXClosingElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXElement = function(node, opts) {
    if (!node) return !1;
    if ("JSXElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXEmptyExpression = function(node, opts) {
    if (!node) return !1;
    if ("JSXEmptyExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXExpressionContainer = function(node, opts) {
    if (!node) return !1;
    if ("JSXExpressionContainer" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXSpreadChild = function(node, opts) {
    if (!node) return !1;
    if ("JSXSpreadChild" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXIdentifier = function(node, opts) {
    if (!node) return !1;
    if ("JSXIdentifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXMemberExpression = function(node, opts) {
    if (!node) return !1;
    if ("JSXMemberExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXNamespacedName = function(node, opts) {
    if (!node) return !1;
    if ("JSXNamespacedName" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXOpeningElement = function(node, opts) {
    if (!node) return !1;
    if ("JSXOpeningElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXSpreadAttribute = function(node, opts) {
    if (!node) return !1;
    if ("JSXSpreadAttribute" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXText = function(node, opts) {
    if (!node) return !1;
    if ("JSXText" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXFragment = function(node, opts) {
    if (!node) return !1;
    if ("JSXFragment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXOpeningFragment = function(node, opts) {
    if (!node) return !1;
    if ("JSXOpeningFragment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSXClosingFragment = function(node, opts) {
    if (!node) return !1;
    if ("JSXClosingFragment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNoop = function(node, opts) {
    if (!node) return !1;
    if ("Noop" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPlaceholder = function(node, opts) {
    if (!node) return !1;
    if ("Placeholder" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isV8IntrinsicIdentifier = function(node, opts) {
    if (!node) return !1;
    if ("V8IntrinsicIdentifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isArgumentPlaceholder = function(node, opts) {
    if (!node) return !1;
    if ("ArgumentPlaceholder" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isAwaitExpression = function(node, opts) {
    if (!node) return !1;
    if ("AwaitExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBindExpression = function(node, opts) {
    if (!node) return !1;
    if ("BindExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassProperty = function(node, opts) {
    if (!node) return !1;
    if ("ClassProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isOptionalMemberExpression = function(node, opts) {
    if (!node) return !1;
    if ("OptionalMemberExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPipelineTopicExpression = function(node, opts) {
    if (!node) return !1;
    if ("PipelineTopicExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPipelineBareFunction = function(node, opts) {
    if (!node) return !1;
    if ("PipelineBareFunction" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPipelinePrimaryTopicReference = function(node, opts) {
    if (!node) return !1;
    if ("PipelinePrimaryTopicReference" === node.type) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isOptionalCallExpression = function(node, opts) {
    if (!node) return !1;
    if ("OptionalCallExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassPrivateProperty = function(node, opts) {
    if (!node) return !1;
    if ("ClassPrivateProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClassPrivateMethod = function(node, opts) {
    if (!node) return !1;
    if ("ClassPrivateMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImport = function(node, opts) {
    if (!node) return !1;
    if ("Import" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImportAttribute = function(node, opts) {
    if (!node) return !1;
    if ("ImportAttribute" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDecorator = function(node, opts) {
    if (!node) return !1;
    if ("Decorator" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDoExpression = function(node, opts) {
    if (!node) return !1;
    if ("DoExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportDefaultSpecifier = function(node, opts) {
    if (!node) return !1;
    if ("ExportDefaultSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportNamespaceSpecifier = function(node, opts) {
    if (!node) return !1;
    if ("ExportNamespaceSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPrivateName = function(node, opts) {
    if (!node) return !1;
    if ("PrivateName" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBigIntLiteral = function(node, opts) {
    if (!node) return !1;
    if ("BigIntLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isRecordExpression = function(node, opts) {
    if (!node) return !1;
    if ("RecordExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTupleExpression = function(node, opts) {
    if (!node) return !1;
    if ("TupleExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSParameterProperty = function(node, opts) {
    if (!node) return !1;
    if ("TSParameterProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSDeclareFunction = function(node, opts) {
    if (!node) return !1;
    if ("TSDeclareFunction" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSDeclareMethod = function(node, opts) {
    if (!node) return !1;
    if ("TSDeclareMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSQualifiedName = function(node, opts) {
    if (!node) return !1;
    if ("TSQualifiedName" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSCallSignatureDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSCallSignatureDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSConstructSignatureDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSConstructSignatureDeclaration" === node.type) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSPropertySignature = function(node, opts) {
    if (!node) return !1;
    if ("TSPropertySignature" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSMethodSignature = function(node, opts) {
    if (!node) return !1;
    if ("TSMethodSignature" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSIndexSignature = function(node, opts) {
    if (!node) return !1;
    if ("TSIndexSignature" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSAnyKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSAnyKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSBooleanKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSBooleanKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSBigIntKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSBigIntKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSNeverKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSNeverKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSNullKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSNullKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSNumberKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSNumberKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSObjectKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSObjectKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSStringKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSStringKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSSymbolKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSSymbolKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSUndefinedKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSUndefinedKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSUnknownKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSUnknownKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSVoidKeyword = function(node, opts) {
    if (!node) return !1;
    if ("TSVoidKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSThisType = function(node, opts) {
    if (!node) return !1;
    if ("TSThisType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSFunctionType = function(node, opts) {
    if (!node) return !1;
    if ("TSFunctionType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSConstructorType = function(node, opts) {
    if (!node) return !1;
    if ("TSConstructorType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeReference = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeReference" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypePredicate = function(node, opts) {
    if (!node) return !1;
    if ("TSTypePredicate" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeQuery = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeQuery" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeLiteral = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSArrayType = function(node, opts) {
    if (!node) return !1;
    if ("TSArrayType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTupleType = function(node, opts) {
    if (!node) return !1;
    if ("TSTupleType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSOptionalType = function(node, opts) {
    if (!node) return !1;
    if ("TSOptionalType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSRestType = function(node, opts) {
    if (!node) return !1;
    if ("TSRestType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSUnionType = function(node, opts) {
    if (!node) return !1;
    if ("TSUnionType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSIntersectionType = function(node, opts) {
    if (!node) return !1;
    if ("TSIntersectionType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSConditionalType = function(node, opts) {
    if (!node) return !1;
    if ("TSConditionalType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSInferType = function(node, opts) {
    if (!node) return !1;
    if ("TSInferType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSParenthesizedType = function(node, opts) {
    if (!node) return !1;
    if ("TSParenthesizedType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeOperator = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeOperator" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSIndexedAccessType = function(node, opts) {
    if (!node) return !1;
    if ("TSIndexedAccessType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSMappedType = function(node, opts) {
    if (!node) return !1;
    if ("TSMappedType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSLiteralType = function(node, opts) {
    if (!node) return !1;
    if ("TSLiteralType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSExpressionWithTypeArguments = function(node, opts) {
    if (!node) return !1;
    if ("TSExpressionWithTypeArguments" === node.type) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSInterfaceDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSInterfaceDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSInterfaceBody = function(node, opts) {
    if (!node) return !1;
    if ("TSInterfaceBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeAliasDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeAliasDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSAsExpression = function(node, opts) {
    if (!node) return !1;
    if ("TSAsExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeAssertion = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeAssertion" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSEnumDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSEnumDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSEnumMember = function(node, opts) {
    if (!node) return !1;
    if ("TSEnumMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSModuleDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSModuleDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSModuleBlock = function(node, opts) {
    if (!node) return !1;
    if ("TSModuleBlock" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSImportType = function(node, opts) {
    if (!node) return !1;
    if ("TSImportType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSImportEqualsDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSImportEqualsDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSExternalModuleReference = function(node, opts) {
    if (!node) return !1;
    if ("TSExternalModuleReference" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSNonNullExpression = function(node, opts) {
    if (!node) return !1;
    if ("TSNonNullExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSExportAssignment = function(node, opts) {
    if (!node) return !1;
    if ("TSExportAssignment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSNamespaceExportDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSNamespaceExportDeclaration" === node.type) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeAnnotation = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeParameterInstantiation = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeParameterInstantiation" === node.type) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeParameterDeclaration = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeParameterDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeParameter = function(node, opts) {
    if (!node) return !1;
    if ("TSTypeParameter" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExpression = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Expression" === nodeType || "ArrayExpression" === nodeType || "AssignmentExpression" === nodeType || "BinaryExpression" === nodeType || "CallExpression" === nodeType || "ConditionalExpression" === nodeType || "FunctionExpression" === nodeType || "Identifier" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "LogicalExpression" === nodeType || "MemberExpression" === nodeType || "NewExpression" === nodeType || "ObjectExpression" === nodeType || "SequenceExpression" === nodeType || "ParenthesizedExpression" === nodeType || "ThisExpression" === nodeType || "UnaryExpression" === nodeType || "UpdateExpression" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassExpression" === nodeType || "MetaProperty" === nodeType || "Super" === nodeType || "TaggedTemplateExpression" === nodeType || "TemplateLiteral" === nodeType || "YieldExpression" === nodeType || "TypeCastExpression" === nodeType || "JSXElement" === nodeType || "JSXFragment" === nodeType || "AwaitExpression" === nodeType || "BindExpression" === nodeType || "OptionalMemberExpression" === nodeType || "PipelinePrimaryTopicReference" === nodeType || "OptionalCallExpression" === nodeType || "Import" === nodeType || "DoExpression" === nodeType || "BigIntLiteral" === nodeType || "RecordExpression" === nodeType || "TupleExpression" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSNonNullExpression" === nodeType || "Placeholder" === nodeType && ("Expression" === node.expectedNode || "Identifier" === node.expectedNode || "StringLiteral" === node.expectedNode)) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBinary = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Binary" === nodeType || "BinaryExpression" === nodeType || "LogicalExpression" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isScopable = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Scopable" === nodeType || "BlockStatement" === nodeType || "CatchClause" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Program" === nodeType || "ObjectMethod" === nodeType || "SwitchStatement" === nodeType || "WhileStatement" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassExpression" === nodeType || "ClassDeclaration" === nodeType || "ForOfStatement" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "TSModuleBlock" === nodeType || "Placeholder" === nodeType && "BlockStatement" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBlockParent = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("BlockParent" === nodeType || "BlockStatement" === nodeType || "CatchClause" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Program" === nodeType || "ObjectMethod" === nodeType || "SwitchStatement" === nodeType || "WhileStatement" === nodeType || "ArrowFunctionExpression" === nodeType || "ForOfStatement" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "TSModuleBlock" === nodeType || "Placeholder" === nodeType && "BlockStatement" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isBlock = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Block" === nodeType || "BlockStatement" === nodeType || "Program" === nodeType || "TSModuleBlock" === nodeType || "Placeholder" === nodeType && "BlockStatement" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isStatement = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Statement" === nodeType || "BlockStatement" === nodeType || "BreakStatement" === nodeType || "ContinueStatement" === nodeType || "DebuggerStatement" === nodeType || "DoWhileStatement" === nodeType || "EmptyStatement" === nodeType || "ExpressionStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "IfStatement" === nodeType || "LabeledStatement" === nodeType || "ReturnStatement" === nodeType || "SwitchStatement" === nodeType || "ThrowStatement" === nodeType || "TryStatement" === nodeType || "VariableDeclaration" === nodeType || "WhileStatement" === nodeType || "WithStatement" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ForOfStatement" === nodeType || "ImportDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType || "EnumDeclaration" === nodeType || "TSDeclareFunction" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSEnumDeclaration" === nodeType || "TSModuleDeclaration" === nodeType || "TSImportEqualsDeclaration" === nodeType || "TSExportAssignment" === nodeType || "TSNamespaceExportDeclaration" === nodeType || "Placeholder" === nodeType && ("Statement" === node.expectedNode || "Declaration" === node.expectedNode || "BlockStatement" === node.expectedNode)) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTerminatorless = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Terminatorless" === nodeType || "BreakStatement" === nodeType || "ContinueStatement" === nodeType || "ReturnStatement" === nodeType || "ThrowStatement" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isCompletionStatement = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("CompletionStatement" === nodeType || "BreakStatement" === nodeType || "ContinueStatement" === nodeType || "ReturnStatement" === nodeType || "ThrowStatement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isConditional = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Conditional" === nodeType || "ConditionalExpression" === nodeType || "IfStatement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isLoop = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Loop" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "WhileStatement" === nodeType || "ForOfStatement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isWhile = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("While" === nodeType || "DoWhileStatement" === nodeType || "WhileStatement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExpressionWrapper = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("ExpressionWrapper" === nodeType || "ExpressionStatement" === nodeType || "ParenthesizedExpression" === nodeType || "TypeCastExpression" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFor = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("For" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "ForOfStatement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isForXStatement = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("ForXStatement" === nodeType || "ForInStatement" === nodeType || "ForOfStatement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFunction = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Function" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "ObjectMethod" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFunctionParent = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("FunctionParent" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "ObjectMethod" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPureish = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Pureish" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "ArrowFunctionExpression" === nodeType || "BigIntLiteral" === nodeType || "Placeholder" === nodeType && "StringLiteral" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isDeclaration = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Declaration" === nodeType || "FunctionDeclaration" === nodeType || "VariableDeclaration" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ImportDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType || "EnumDeclaration" === nodeType || "TSDeclareFunction" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSEnumDeclaration" === nodeType || "TSModuleDeclaration" === nodeType || "Placeholder" === nodeType && "Declaration" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPatternLike = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("PatternLike" === nodeType || "Identifier" === nodeType || "RestElement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "Placeholder" === nodeType && ("Pattern" === node.expectedNode || "Identifier" === node.expectedNode)) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isLVal = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("LVal" === nodeType || "Identifier" === nodeType || "MemberExpression" === nodeType || "RestElement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "TSParameterProperty" === nodeType || "Placeholder" === nodeType && ("Pattern" === node.expectedNode || "Identifier" === node.expectedNode)) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSEntityName = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("TSEntityName" === nodeType || "Identifier" === nodeType || "TSQualifiedName" === nodeType || "Placeholder" === nodeType && "Identifier" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isLiteral = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Literal" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "TemplateLiteral" === nodeType || "BigIntLiteral" === nodeType || "Placeholder" === nodeType && "StringLiteral" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isImmutable = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Immutable" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "JSXAttribute" === nodeType || "JSXClosingElement" === nodeType || "JSXElement" === nodeType || "JSXExpressionContainer" === nodeType || "JSXSpreadChild" === nodeType || "JSXOpeningElement" === nodeType || "JSXText" === nodeType || "JSXFragment" === nodeType || "JSXOpeningFragment" === nodeType || "JSXClosingFragment" === nodeType || "BigIntLiteral" === nodeType || "Placeholder" === nodeType && "StringLiteral" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isUserWhitespacable = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("UserWhitespacable" === nodeType || "ObjectMethod" === nodeType || "ObjectProperty" === nodeType || "ObjectTypeInternalSlot" === nodeType || "ObjectTypeCallProperty" === nodeType || "ObjectTypeIndexer" === nodeType || "ObjectTypeProperty" === nodeType || "ObjectTypeSpreadProperty" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isMethod = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Method" === nodeType || "ObjectMethod" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isObjectMember = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("ObjectMember" === nodeType || "ObjectMethod" === nodeType || "ObjectProperty" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isProperty = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Property" === nodeType || "ObjectProperty" === nodeType || "ClassProperty" === nodeType || "ClassPrivateProperty" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isUnaryLike = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("UnaryLike" === nodeType || "UnaryExpression" === nodeType || "SpreadElement" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPattern = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Pattern" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "Placeholder" === nodeType && "Pattern" === node.expectedNode) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isClass = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Class" === nodeType || "ClassExpression" === nodeType || "ClassDeclaration" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isModuleDeclaration = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("ModuleDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ImportDeclaration" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isExportDeclaration = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("ExportDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isModuleSpecifier = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("ModuleSpecifier" === nodeType || "ExportSpecifier" === nodeType || "ImportDefaultSpecifier" === nodeType || "ImportNamespaceSpecifier" === nodeType || "ImportSpecifier" === nodeType || "ExportDefaultSpecifier" === nodeType || "ExportNamespaceSpecifier" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFlow = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Flow" === nodeType || "AnyTypeAnnotation" === nodeType || "ArrayTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "BooleanLiteralTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "ClassImplements" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "DeclaredPredicate" === nodeType || "ExistsTypeAnnotation" === nodeType || "FunctionTypeAnnotation" === nodeType || "FunctionTypeParam" === nodeType || "GenericTypeAnnotation" === nodeType || "InferredPredicate" === nodeType || "InterfaceExtends" === nodeType || "InterfaceDeclaration" === nodeType || "InterfaceTypeAnnotation" === nodeType || "IntersectionTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NullableTypeAnnotation" === nodeType || "NumberLiteralTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "ObjectTypeAnnotation" === nodeType || "ObjectTypeInternalSlot" === nodeType || "ObjectTypeCallProperty" === nodeType || "ObjectTypeIndexer" === nodeType || "ObjectTypeProperty" === nodeType || "ObjectTypeSpreadProperty" === nodeType || "OpaqueType" === nodeType || "QualifiedTypeIdentifier" === nodeType || "StringLiteralTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "TupleTypeAnnotation" === nodeType || "TypeofTypeAnnotation" === nodeType || "TypeAlias" === nodeType || "TypeAnnotation" === nodeType || "TypeCastExpression" === nodeType || "TypeParameter" === nodeType || "TypeParameterDeclaration" === nodeType || "TypeParameterInstantiation" === nodeType || "UnionTypeAnnotation" === nodeType || "Variance" === nodeType || "VoidTypeAnnotation" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFlowType = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("FlowType" === nodeType || "AnyTypeAnnotation" === nodeType || "ArrayTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "BooleanLiteralTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "ExistsTypeAnnotation" === nodeType || "FunctionTypeAnnotation" === nodeType || "GenericTypeAnnotation" === nodeType || "InterfaceTypeAnnotation" === nodeType || "IntersectionTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NullableTypeAnnotation" === nodeType || "NumberLiteralTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "ObjectTypeAnnotation" === nodeType || "StringLiteralTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "TupleTypeAnnotation" === nodeType || "TypeofTypeAnnotation" === nodeType || "UnionTypeAnnotation" === nodeType || "VoidTypeAnnotation" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFlowBaseAnnotation = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("FlowBaseAnnotation" === nodeType || "AnyTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "VoidTypeAnnotation" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFlowDeclaration = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("FlowDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isFlowPredicate = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("FlowPredicate" === nodeType || "DeclaredPredicate" === nodeType || "InferredPredicate" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumBody = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("EnumBody" === nodeType || "EnumBooleanBody" === nodeType || "EnumNumberBody" === nodeType || "EnumStringBody" === nodeType || "EnumSymbolBody" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isEnumMember = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("EnumMember" === nodeType || "EnumBooleanMember" === nodeType || "EnumNumberMember" === nodeType || "EnumStringMember" === nodeType || "EnumDefaultedMember" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isJSX = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("JSX" === nodeType || "JSXAttribute" === nodeType || "JSXClosingElement" === nodeType || "JSXElement" === nodeType || "JSXEmptyExpression" === nodeType || "JSXExpressionContainer" === nodeType || "JSXSpreadChild" === nodeType || "JSXIdentifier" === nodeType || "JSXMemberExpression" === nodeType || "JSXNamespacedName" === nodeType || "JSXOpeningElement" === nodeType || "JSXSpreadAttribute" === nodeType || "JSXText" === nodeType || "JSXFragment" === nodeType || "JSXOpeningFragment" === nodeType || "JSXClosingFragment" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isPrivate = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("Private" === nodeType || "ClassPrivateProperty" === nodeType || "ClassPrivateMethod" === nodeType || "PrivateName" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSTypeElement = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("TSTypeElement" === nodeType || "TSCallSignatureDeclaration" === nodeType || "TSConstructSignatureDeclaration" === nodeType || "TSPropertySignature" === nodeType || "TSMethodSignature" === nodeType || "TSIndexSignature" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSType = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("TSType" === nodeType || "TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSFunctionType" === nodeType || "TSConstructorType" === nodeType || "TSTypeReference" === nodeType || "TSTypePredicate" === nodeType || "TSTypeQuery" === nodeType || "TSTypeLiteral" === nodeType || "TSArrayType" === nodeType || "TSTupleType" === nodeType || "TSOptionalType" === nodeType || "TSRestType" === nodeType || "TSUnionType" === nodeType || "TSIntersectionType" === nodeType || "TSConditionalType" === nodeType || "TSInferType" === nodeType || "TSParenthesizedType" === nodeType || "TSTypeOperator" === nodeType || "TSIndexedAccessType" === nodeType || "TSMappedType" === nodeType || "TSLiteralType" === nodeType || "TSExpressionWithTypeArguments" === nodeType || "TSImportType" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isTSBaseType = function(node, opts) {
    if (!node) return !1;
    const nodeType = node.type;
    if ("TSBaseType" === nodeType || "TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSLiteralType" === nodeType) return void 0 === opts || (0, 
    _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isNumberLiteral = function(node, opts) {
    if (console.trace("The node type NumberLiteral has been renamed to NumericLiteral"), 
    !node) return !1;
    if ("NumberLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isRegexLiteral = function(node, opts) {
    if (console.trace("The node type RegexLiteral has been renamed to RegExpLiteral"), 
    !node) return !1;
    if ("RegexLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isRestProperty = function(node, opts) {
    if (console.trace("The node type RestProperty has been renamed to RestElement"), 
    !node) return !1;
    if ("RestProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  }, exports.isSpreadProperty = function(node, opts) {
    if (console.trace("The node type SpreadProperty has been renamed to SpreadElement"), 
    !node) return !1;
    if ("SpreadProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
    return !1;
  };
  var obj, _shallowEqual = (obj = __webpack_require__(210)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports) {
  var isArray = Array.isArray;
  module.exports = isArray;
}, function(module, exports, __webpack_require__) {
  var baseIsNative = __webpack_require__(74), getValue = __webpack_require__(77);
  module.exports = function(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), getRawTag = __webpack_require__(62), objectToString = __webpack_require__(63), symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  module.exports = function(value) {
    return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  };
}, , function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(1).Symbol;
  module.exports = Symbol;
}, , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.ArrayExpression = exports.arrayExpression = function(...args) {
    return (0, _builder.default)("ArrayExpression", ...args);
  }, exports.AssignmentExpression = exports.assignmentExpression = function(...args) {
    return (0, _builder.default)("AssignmentExpression", ...args);
  }, exports.BinaryExpression = exports.binaryExpression = function(...args) {
    return (0, _builder.default)("BinaryExpression", ...args);
  }, exports.InterpreterDirective = exports.interpreterDirective = function(...args) {
    return (0, _builder.default)("InterpreterDirective", ...args);
  }, exports.Directive = exports.directive = function(...args) {
    return (0, _builder.default)("Directive", ...args);
  }, exports.DirectiveLiteral = exports.directiveLiteral = function(...args) {
    return (0, _builder.default)("DirectiveLiteral", ...args);
  }, exports.BlockStatement = exports.blockStatement = function(...args) {
    return (0, _builder.default)("BlockStatement", ...args);
  }, exports.BreakStatement = exports.breakStatement = function(...args) {
    return (0, _builder.default)("BreakStatement", ...args);
  }, exports.CallExpression = exports.callExpression = function(...args) {
    return (0, _builder.default)("CallExpression", ...args);
  }, exports.CatchClause = exports.catchClause = function(...args) {
    return (0, _builder.default)("CatchClause", ...args);
  }, exports.ConditionalExpression = exports.conditionalExpression = function(...args) {
    return (0, _builder.default)("ConditionalExpression", ...args);
  }, exports.ContinueStatement = exports.continueStatement = function(...args) {
    return (0, _builder.default)("ContinueStatement", ...args);
  }, exports.DebuggerStatement = exports.debuggerStatement = function(...args) {
    return (0, _builder.default)("DebuggerStatement", ...args);
  }, exports.DoWhileStatement = exports.doWhileStatement = function(...args) {
    return (0, _builder.default)("DoWhileStatement", ...args);
  }, exports.EmptyStatement = exports.emptyStatement = function(...args) {
    return (0, _builder.default)("EmptyStatement", ...args);
  }, exports.ExpressionStatement = exports.expressionStatement = function(...args) {
    return (0, _builder.default)("ExpressionStatement", ...args);
  }, exports.File = exports.file = function(...args) {
    return (0, _builder.default)("File", ...args);
  }, exports.ForInStatement = exports.forInStatement = function(...args) {
    return (0, _builder.default)("ForInStatement", ...args);
  }, exports.ForStatement = exports.forStatement = function(...args) {
    return (0, _builder.default)("ForStatement", ...args);
  }, exports.FunctionDeclaration = exports.functionDeclaration = function(...args) {
    return (0, _builder.default)("FunctionDeclaration", ...args);
  }, exports.FunctionExpression = exports.functionExpression = function(...args) {
    return (0, _builder.default)("FunctionExpression", ...args);
  }, exports.Identifier = exports.identifier = function(...args) {
    return (0, _builder.default)("Identifier", ...args);
  }, exports.IfStatement = exports.ifStatement = function(...args) {
    return (0, _builder.default)("IfStatement", ...args);
  }, exports.LabeledStatement = exports.labeledStatement = function(...args) {
    return (0, _builder.default)("LabeledStatement", ...args);
  }, exports.StringLiteral = exports.stringLiteral = function(...args) {
    return (0, _builder.default)("StringLiteral", ...args);
  }, exports.NumericLiteral = exports.numericLiteral = function(...args) {
    return (0, _builder.default)("NumericLiteral", ...args);
  }, exports.NullLiteral = exports.nullLiteral = function(...args) {
    return (0, _builder.default)("NullLiteral", ...args);
  }, exports.BooleanLiteral = exports.booleanLiteral = function(...args) {
    return (0, _builder.default)("BooleanLiteral", ...args);
  }, exports.RegExpLiteral = exports.regExpLiteral = function(...args) {
    return (0, _builder.default)("RegExpLiteral", ...args);
  }, exports.LogicalExpression = exports.logicalExpression = function(...args) {
    return (0, _builder.default)("LogicalExpression", ...args);
  }, exports.MemberExpression = exports.memberExpression = function(...args) {
    return (0, _builder.default)("MemberExpression", ...args);
  }, exports.NewExpression = exports.newExpression = function(...args) {
    return (0, _builder.default)("NewExpression", ...args);
  }, exports.Program = exports.program = function(...args) {
    return (0, _builder.default)("Program", ...args);
  }, exports.ObjectExpression = exports.objectExpression = function(...args) {
    return (0, _builder.default)("ObjectExpression", ...args);
  }, exports.ObjectMethod = exports.objectMethod = function(...args) {
    return (0, _builder.default)("ObjectMethod", ...args);
  }, exports.ObjectProperty = exports.objectProperty = function(...args) {
    return (0, _builder.default)("ObjectProperty", ...args);
  }, exports.RestElement = exports.restElement = function(...args) {
    return (0, _builder.default)("RestElement", ...args);
  }, exports.ReturnStatement = exports.returnStatement = function(...args) {
    return (0, _builder.default)("ReturnStatement", ...args);
  }, exports.SequenceExpression = exports.sequenceExpression = function(...args) {
    return (0, _builder.default)("SequenceExpression", ...args);
  }, exports.ParenthesizedExpression = exports.parenthesizedExpression = function(...args) {
    return (0, _builder.default)("ParenthesizedExpression", ...args);
  }, exports.SwitchCase = exports.switchCase = function(...args) {
    return (0, _builder.default)("SwitchCase", ...args);
  }, exports.SwitchStatement = exports.switchStatement = function(...args) {
    return (0, _builder.default)("SwitchStatement", ...args);
  }, exports.ThisExpression = exports.thisExpression = function(...args) {
    return (0, _builder.default)("ThisExpression", ...args);
  }, exports.ThrowStatement = exports.throwStatement = function(...args) {
    return (0, _builder.default)("ThrowStatement", ...args);
  }, exports.TryStatement = exports.tryStatement = function(...args) {
    return (0, _builder.default)("TryStatement", ...args);
  }, exports.UnaryExpression = exports.unaryExpression = function(...args) {
    return (0, _builder.default)("UnaryExpression", ...args);
  }, exports.UpdateExpression = exports.updateExpression = function(...args) {
    return (0, _builder.default)("UpdateExpression", ...args);
  }, exports.VariableDeclaration = exports.variableDeclaration = function(...args) {
    return (0, _builder.default)("VariableDeclaration", ...args);
  }, exports.VariableDeclarator = exports.variableDeclarator = function(...args) {
    return (0, _builder.default)("VariableDeclarator", ...args);
  }, exports.WhileStatement = exports.whileStatement = function(...args) {
    return (0, _builder.default)("WhileStatement", ...args);
  }, exports.WithStatement = exports.withStatement = function(...args) {
    return (0, _builder.default)("WithStatement", ...args);
  }, exports.AssignmentPattern = exports.assignmentPattern = function(...args) {
    return (0, _builder.default)("AssignmentPattern", ...args);
  }, exports.ArrayPattern = exports.arrayPattern = function(...args) {
    return (0, _builder.default)("ArrayPattern", ...args);
  }, exports.ArrowFunctionExpression = exports.arrowFunctionExpression = function(...args) {
    return (0, _builder.default)("ArrowFunctionExpression", ...args);
  }, exports.ClassBody = exports.classBody = function(...args) {
    return (0, _builder.default)("ClassBody", ...args);
  }, exports.ClassExpression = exports.classExpression = function(...args) {
    return (0, _builder.default)("ClassExpression", ...args);
  }, exports.ClassDeclaration = exports.classDeclaration = function(...args) {
    return (0, _builder.default)("ClassDeclaration", ...args);
  }, exports.ExportAllDeclaration = exports.exportAllDeclaration = function(...args) {
    return (0, _builder.default)("ExportAllDeclaration", ...args);
  }, exports.ExportDefaultDeclaration = exports.exportDefaultDeclaration = function(...args) {
    return (0, _builder.default)("ExportDefaultDeclaration", ...args);
  }, exports.ExportNamedDeclaration = exports.exportNamedDeclaration = function(...args) {
    return (0, _builder.default)("ExportNamedDeclaration", ...args);
  }, exports.ExportSpecifier = exports.exportSpecifier = function(...args) {
    return (0, _builder.default)("ExportSpecifier", ...args);
  }, exports.ForOfStatement = exports.forOfStatement = function(...args) {
    return (0, _builder.default)("ForOfStatement", ...args);
  }, exports.ImportDeclaration = exports.importDeclaration = function(...args) {
    return (0, _builder.default)("ImportDeclaration", ...args);
  }, exports.ImportDefaultSpecifier = exports.importDefaultSpecifier = function(...args) {
    return (0, _builder.default)("ImportDefaultSpecifier", ...args);
  }, exports.ImportNamespaceSpecifier = exports.importNamespaceSpecifier = function(...args) {
    return (0, _builder.default)("ImportNamespaceSpecifier", ...args);
  }, exports.ImportSpecifier = exports.importSpecifier = function(...args) {
    return (0, _builder.default)("ImportSpecifier", ...args);
  }, exports.MetaProperty = exports.metaProperty = function(...args) {
    return (0, _builder.default)("MetaProperty", ...args);
  }, exports.ClassMethod = exports.classMethod = function(...args) {
    return (0, _builder.default)("ClassMethod", ...args);
  }, exports.ObjectPattern = exports.objectPattern = function(...args) {
    return (0, _builder.default)("ObjectPattern", ...args);
  }, exports.SpreadElement = exports.spreadElement = function(...args) {
    return (0, _builder.default)("SpreadElement", ...args);
  }, exports.super = exports.Super = function(...args) {
    return (0, _builder.default)("Super", ...args);
  }, exports.TaggedTemplateExpression = exports.taggedTemplateExpression = function(...args) {
    return (0, _builder.default)("TaggedTemplateExpression", ...args);
  }, exports.TemplateElement = exports.templateElement = function(...args) {
    return (0, _builder.default)("TemplateElement", ...args);
  }, exports.TemplateLiteral = exports.templateLiteral = function(...args) {
    return (0, _builder.default)("TemplateLiteral", ...args);
  }, exports.YieldExpression = exports.yieldExpression = function(...args) {
    return (0, _builder.default)("YieldExpression", ...args);
  }, exports.AnyTypeAnnotation = exports.anyTypeAnnotation = function(...args) {
    return (0, _builder.default)("AnyTypeAnnotation", ...args);
  }, exports.ArrayTypeAnnotation = exports.arrayTypeAnnotation = function(...args) {
    return (0, _builder.default)("ArrayTypeAnnotation", ...args);
  }, exports.BooleanTypeAnnotation = exports.booleanTypeAnnotation = function(...args) {
    return (0, _builder.default)("BooleanTypeAnnotation", ...args);
  }, exports.BooleanLiteralTypeAnnotation = exports.booleanLiteralTypeAnnotation = function(...args) {
    return (0, _builder.default)("BooleanLiteralTypeAnnotation", ...args);
  }, exports.NullLiteralTypeAnnotation = exports.nullLiteralTypeAnnotation = function(...args) {
    return (0, _builder.default)("NullLiteralTypeAnnotation", ...args);
  }, exports.ClassImplements = exports.classImplements = function(...args) {
    return (0, _builder.default)("ClassImplements", ...args);
  }, exports.DeclareClass = exports.declareClass = function(...args) {
    return (0, _builder.default)("DeclareClass", ...args);
  }, exports.DeclareFunction = exports.declareFunction = function(...args) {
    return (0, _builder.default)("DeclareFunction", ...args);
  }, exports.DeclareInterface = exports.declareInterface = function(...args) {
    return (0, _builder.default)("DeclareInterface", ...args);
  }, exports.DeclareModule = exports.declareModule = function(...args) {
    return (0, _builder.default)("DeclareModule", ...args);
  }, exports.DeclareModuleExports = exports.declareModuleExports = function(...args) {
    return (0, _builder.default)("DeclareModuleExports", ...args);
  }, exports.DeclareTypeAlias = exports.declareTypeAlias = function(...args) {
    return (0, _builder.default)("DeclareTypeAlias", ...args);
  }, exports.DeclareOpaqueType = exports.declareOpaqueType = function(...args) {
    return (0, _builder.default)("DeclareOpaqueType", ...args);
  }, exports.DeclareVariable = exports.declareVariable = function(...args) {
    return (0, _builder.default)("DeclareVariable", ...args);
  }, exports.DeclareExportDeclaration = exports.declareExportDeclaration = function(...args) {
    return (0, _builder.default)("DeclareExportDeclaration", ...args);
  }, exports.DeclareExportAllDeclaration = exports.declareExportAllDeclaration = function(...args) {
    return (0, _builder.default)("DeclareExportAllDeclaration", ...args);
  }, exports.DeclaredPredicate = exports.declaredPredicate = function(...args) {
    return (0, _builder.default)("DeclaredPredicate", ...args);
  }, exports.ExistsTypeAnnotation = exports.existsTypeAnnotation = function(...args) {
    return (0, _builder.default)("ExistsTypeAnnotation", ...args);
  }, exports.FunctionTypeAnnotation = exports.functionTypeAnnotation = function(...args) {
    return (0, _builder.default)("FunctionTypeAnnotation", ...args);
  }, exports.FunctionTypeParam = exports.functionTypeParam = function(...args) {
    return (0, _builder.default)("FunctionTypeParam", ...args);
  }, exports.GenericTypeAnnotation = exports.genericTypeAnnotation = function(...args) {
    return (0, _builder.default)("GenericTypeAnnotation", ...args);
  }, exports.InferredPredicate = exports.inferredPredicate = function(...args) {
    return (0, _builder.default)("InferredPredicate", ...args);
  }, exports.InterfaceExtends = exports.interfaceExtends = function(...args) {
    return (0, _builder.default)("InterfaceExtends", ...args);
  }, exports.InterfaceDeclaration = exports.interfaceDeclaration = function(...args) {
    return (0, _builder.default)("InterfaceDeclaration", ...args);
  }, exports.InterfaceTypeAnnotation = exports.interfaceTypeAnnotation = function(...args) {
    return (0, _builder.default)("InterfaceTypeAnnotation", ...args);
  }, exports.IntersectionTypeAnnotation = exports.intersectionTypeAnnotation = function(...args) {
    return (0, _builder.default)("IntersectionTypeAnnotation", ...args);
  }, exports.MixedTypeAnnotation = exports.mixedTypeAnnotation = function(...args) {
    return (0, _builder.default)("MixedTypeAnnotation", ...args);
  }, exports.EmptyTypeAnnotation = exports.emptyTypeAnnotation = function(...args) {
    return (0, _builder.default)("EmptyTypeAnnotation", ...args);
  }, exports.NullableTypeAnnotation = exports.nullableTypeAnnotation = function(...args) {
    return (0, _builder.default)("NullableTypeAnnotation", ...args);
  }, exports.NumberLiteralTypeAnnotation = exports.numberLiteralTypeAnnotation = function(...args) {
    return (0, _builder.default)("NumberLiteralTypeAnnotation", ...args);
  }, exports.NumberTypeAnnotation = exports.numberTypeAnnotation = function(...args) {
    return (0, _builder.default)("NumberTypeAnnotation", ...args);
  }, exports.ObjectTypeAnnotation = exports.objectTypeAnnotation = function(...args) {
    return (0, _builder.default)("ObjectTypeAnnotation", ...args);
  }, exports.ObjectTypeInternalSlot = exports.objectTypeInternalSlot = function(...args) {
    return (0, _builder.default)("ObjectTypeInternalSlot", ...args);
  }, exports.ObjectTypeCallProperty = exports.objectTypeCallProperty = function(...args) {
    return (0, _builder.default)("ObjectTypeCallProperty", ...args);
  }, exports.ObjectTypeIndexer = exports.objectTypeIndexer = function(...args) {
    return (0, _builder.default)("ObjectTypeIndexer", ...args);
  }, exports.ObjectTypeProperty = exports.objectTypeProperty = function(...args) {
    return (0, _builder.default)("ObjectTypeProperty", ...args);
  }, exports.ObjectTypeSpreadProperty = exports.objectTypeSpreadProperty = function(...args) {
    return (0, _builder.default)("ObjectTypeSpreadProperty", ...args);
  }, exports.OpaqueType = exports.opaqueType = function(...args) {
    return (0, _builder.default)("OpaqueType", ...args);
  }, exports.QualifiedTypeIdentifier = exports.qualifiedTypeIdentifier = function(...args) {
    return (0, _builder.default)("QualifiedTypeIdentifier", ...args);
  }, exports.StringLiteralTypeAnnotation = exports.stringLiteralTypeAnnotation = function(...args) {
    return (0, _builder.default)("StringLiteralTypeAnnotation", ...args);
  }, exports.StringTypeAnnotation = exports.stringTypeAnnotation = function(...args) {
    return (0, _builder.default)("StringTypeAnnotation", ...args);
  }, exports.SymbolTypeAnnotation = exports.symbolTypeAnnotation = function(...args) {
    return (0, _builder.default)("SymbolTypeAnnotation", ...args);
  }, exports.ThisTypeAnnotation = exports.thisTypeAnnotation = function(...args) {
    return (0, _builder.default)("ThisTypeAnnotation", ...args);
  }, exports.TupleTypeAnnotation = exports.tupleTypeAnnotation = function(...args) {
    return (0, _builder.default)("TupleTypeAnnotation", ...args);
  }, exports.TypeofTypeAnnotation = exports.typeofTypeAnnotation = function(...args) {
    return (0, _builder.default)("TypeofTypeAnnotation", ...args);
  }, exports.TypeAlias = exports.typeAlias = function(...args) {
    return (0, _builder.default)("TypeAlias", ...args);
  }, exports.TypeAnnotation = exports.typeAnnotation = function(...args) {
    return (0, _builder.default)("TypeAnnotation", ...args);
  }, exports.TypeCastExpression = exports.typeCastExpression = function(...args) {
    return (0, _builder.default)("TypeCastExpression", ...args);
  }, exports.TypeParameter = exports.typeParameter = function(...args) {
    return (0, _builder.default)("TypeParameter", ...args);
  }, exports.TypeParameterDeclaration = exports.typeParameterDeclaration = function(...args) {
    return (0, _builder.default)("TypeParameterDeclaration", ...args);
  }, exports.TypeParameterInstantiation = exports.typeParameterInstantiation = function(...args) {
    return (0, _builder.default)("TypeParameterInstantiation", ...args);
  }, exports.UnionTypeAnnotation = exports.unionTypeAnnotation = function(...args) {
    return (0, _builder.default)("UnionTypeAnnotation", ...args);
  }, exports.Variance = exports.variance = function(...args) {
    return (0, _builder.default)("Variance", ...args);
  }, exports.VoidTypeAnnotation = exports.voidTypeAnnotation = function(...args) {
    return (0, _builder.default)("VoidTypeAnnotation", ...args);
  }, exports.EnumDeclaration = exports.enumDeclaration = function(...args) {
    return (0, _builder.default)("EnumDeclaration", ...args);
  }, exports.EnumBooleanBody = exports.enumBooleanBody = function(...args) {
    return (0, _builder.default)("EnumBooleanBody", ...args);
  }, exports.EnumNumberBody = exports.enumNumberBody = function(...args) {
    return (0, _builder.default)("EnumNumberBody", ...args);
  }, exports.EnumStringBody = exports.enumStringBody = function(...args) {
    return (0, _builder.default)("EnumStringBody", ...args);
  }, exports.EnumSymbolBody = exports.enumSymbolBody = function(...args) {
    return (0, _builder.default)("EnumSymbolBody", ...args);
  }, exports.EnumBooleanMember = exports.enumBooleanMember = function(...args) {
    return (0, _builder.default)("EnumBooleanMember", ...args);
  }, exports.EnumNumberMember = exports.enumNumberMember = function(...args) {
    return (0, _builder.default)("EnumNumberMember", ...args);
  }, exports.EnumStringMember = exports.enumStringMember = function(...args) {
    return (0, _builder.default)("EnumStringMember", ...args);
  }, exports.EnumDefaultedMember = exports.enumDefaultedMember = function(...args) {
    return (0, _builder.default)("EnumDefaultedMember", ...args);
  }, exports.jSXAttribute = exports.JSXAttribute = exports.jsxAttribute = function(...args) {
    return (0, _builder.default)("JSXAttribute", ...args);
  }, exports.jSXClosingElement = exports.JSXClosingElement = exports.jsxClosingElement = function(...args) {
    return (0, _builder.default)("JSXClosingElement", ...args);
  }, exports.jSXElement = exports.JSXElement = exports.jsxElement = function(...args) {
    return (0, _builder.default)("JSXElement", ...args);
  }, exports.jSXEmptyExpression = exports.JSXEmptyExpression = exports.jsxEmptyExpression = function(...args) {
    return (0, _builder.default)("JSXEmptyExpression", ...args);
  }, exports.jSXExpressionContainer = exports.JSXExpressionContainer = exports.jsxExpressionContainer = function(...args) {
    return (0, _builder.default)("JSXExpressionContainer", ...args);
  }, exports.jSXSpreadChild = exports.JSXSpreadChild = exports.jsxSpreadChild = function(...args) {
    return (0, _builder.default)("JSXSpreadChild", ...args);
  }, exports.jSXIdentifier = exports.JSXIdentifier = exports.jsxIdentifier = function(...args) {
    return (0, _builder.default)("JSXIdentifier", ...args);
  }, exports.jSXMemberExpression = exports.JSXMemberExpression = exports.jsxMemberExpression = function(...args) {
    return (0, _builder.default)("JSXMemberExpression", ...args);
  }, exports.jSXNamespacedName = exports.JSXNamespacedName = exports.jsxNamespacedName = function(...args) {
    return (0, _builder.default)("JSXNamespacedName", ...args);
  }, exports.jSXOpeningElement = exports.JSXOpeningElement = exports.jsxOpeningElement = function(...args) {
    return (0, _builder.default)("JSXOpeningElement", ...args);
  }, exports.jSXSpreadAttribute = exports.JSXSpreadAttribute = exports.jsxSpreadAttribute = function(...args) {
    return (0, _builder.default)("JSXSpreadAttribute", ...args);
  }, exports.jSXText = exports.JSXText = exports.jsxText = function(...args) {
    return (0, _builder.default)("JSXText", ...args);
  }, exports.jSXFragment = exports.JSXFragment = exports.jsxFragment = function(...args) {
    return (0, _builder.default)("JSXFragment", ...args);
  }, exports.jSXOpeningFragment = exports.JSXOpeningFragment = exports.jsxOpeningFragment = function(...args) {
    return (0, _builder.default)("JSXOpeningFragment", ...args);
  }, exports.jSXClosingFragment = exports.JSXClosingFragment = exports.jsxClosingFragment = function(...args) {
    return (0, _builder.default)("JSXClosingFragment", ...args);
  }, exports.Noop = exports.noop = function(...args) {
    return (0, _builder.default)("Noop", ...args);
  }, exports.Placeholder = exports.placeholder = function(...args) {
    return (0, _builder.default)("Placeholder", ...args);
  }, exports.V8IntrinsicIdentifier = exports.v8IntrinsicIdentifier = function(...args) {
    return (0, _builder.default)("V8IntrinsicIdentifier", ...args);
  }, exports.ArgumentPlaceholder = exports.argumentPlaceholder = function(...args) {
    return (0, _builder.default)("ArgumentPlaceholder", ...args);
  }, exports.AwaitExpression = exports.awaitExpression = function(...args) {
    return (0, _builder.default)("AwaitExpression", ...args);
  }, exports.BindExpression = exports.bindExpression = function(...args) {
    return (0, _builder.default)("BindExpression", ...args);
  }, exports.ClassProperty = exports.classProperty = function(...args) {
    return (0, _builder.default)("ClassProperty", ...args);
  }, exports.OptionalMemberExpression = exports.optionalMemberExpression = function(...args) {
    return (0, _builder.default)("OptionalMemberExpression", ...args);
  }, exports.PipelineTopicExpression = exports.pipelineTopicExpression = function(...args) {
    return (0, _builder.default)("PipelineTopicExpression", ...args);
  }, exports.PipelineBareFunction = exports.pipelineBareFunction = function(...args) {
    return (0, _builder.default)("PipelineBareFunction", ...args);
  }, exports.PipelinePrimaryTopicReference = exports.pipelinePrimaryTopicReference = function(...args) {
    return (0, _builder.default)("PipelinePrimaryTopicReference", ...args);
  }, exports.OptionalCallExpression = exports.optionalCallExpression = function(...args) {
    return (0, _builder.default)("OptionalCallExpression", ...args);
  }, exports.ClassPrivateProperty = exports.classPrivateProperty = function(...args) {
    return (0, _builder.default)("ClassPrivateProperty", ...args);
  }, exports.ClassPrivateMethod = exports.classPrivateMethod = function(...args) {
    return (0, _builder.default)("ClassPrivateMethod", ...args);
  }, exports.import = exports.Import = function(...args) {
    return (0, _builder.default)("Import", ...args);
  }, exports.ImportAttribute = exports.importAttribute = function(...args) {
    return (0, _builder.default)("ImportAttribute", ...args);
  }, exports.Decorator = exports.decorator = function(...args) {
    return (0, _builder.default)("Decorator", ...args);
  }, exports.DoExpression = exports.doExpression = function(...args) {
    return (0, _builder.default)("DoExpression", ...args);
  }, exports.ExportDefaultSpecifier = exports.exportDefaultSpecifier = function(...args) {
    return (0, _builder.default)("ExportDefaultSpecifier", ...args);
  }, exports.ExportNamespaceSpecifier = exports.exportNamespaceSpecifier = function(...args) {
    return (0, _builder.default)("ExportNamespaceSpecifier", ...args);
  }, exports.PrivateName = exports.privateName = function(...args) {
    return (0, _builder.default)("PrivateName", ...args);
  }, exports.BigIntLiteral = exports.bigIntLiteral = function(...args) {
    return (0, _builder.default)("BigIntLiteral", ...args);
  }, exports.RecordExpression = exports.recordExpression = function(...args) {
    return (0, _builder.default)("RecordExpression", ...args);
  }, exports.TupleExpression = exports.tupleExpression = function(...args) {
    return (0, _builder.default)("TupleExpression", ...args);
  }, exports.tSParameterProperty = exports.TSParameterProperty = exports.tsParameterProperty = function(...args) {
    return (0, _builder.default)("TSParameterProperty", ...args);
  }, exports.tSDeclareFunction = exports.TSDeclareFunction = exports.tsDeclareFunction = function(...args) {
    return (0, _builder.default)("TSDeclareFunction", ...args);
  }, exports.tSDeclareMethod = exports.TSDeclareMethod = exports.tsDeclareMethod = function(...args) {
    return (0, _builder.default)("TSDeclareMethod", ...args);
  }, exports.tSQualifiedName = exports.TSQualifiedName = exports.tsQualifiedName = function(...args) {
    return (0, _builder.default)("TSQualifiedName", ...args);
  }, exports.tSCallSignatureDeclaration = exports.TSCallSignatureDeclaration = exports.tsCallSignatureDeclaration = function(...args) {
    return (0, _builder.default)("TSCallSignatureDeclaration", ...args);
  }, exports.tSConstructSignatureDeclaration = exports.TSConstructSignatureDeclaration = exports.tsConstructSignatureDeclaration = function(...args) {
    return (0, _builder.default)("TSConstructSignatureDeclaration", ...args);
  }, exports.tSPropertySignature = exports.TSPropertySignature = exports.tsPropertySignature = function(...args) {
    return (0, _builder.default)("TSPropertySignature", ...args);
  }, exports.tSMethodSignature = exports.TSMethodSignature = exports.tsMethodSignature = function(...args) {
    return (0, _builder.default)("TSMethodSignature", ...args);
  }, exports.tSIndexSignature = exports.TSIndexSignature = exports.tsIndexSignature = function(...args) {
    return (0, _builder.default)("TSIndexSignature", ...args);
  }, exports.tSAnyKeyword = exports.TSAnyKeyword = exports.tsAnyKeyword = function(...args) {
    return (0, _builder.default)("TSAnyKeyword", ...args);
  }, exports.tSBooleanKeyword = exports.TSBooleanKeyword = exports.tsBooleanKeyword = function(...args) {
    return (0, _builder.default)("TSBooleanKeyword", ...args);
  }, exports.tSBigIntKeyword = exports.TSBigIntKeyword = exports.tsBigIntKeyword = function(...args) {
    return (0, _builder.default)("TSBigIntKeyword", ...args);
  }, exports.tSNeverKeyword = exports.TSNeverKeyword = exports.tsNeverKeyword = function(...args) {
    return (0, _builder.default)("TSNeverKeyword", ...args);
  }, exports.tSNullKeyword = exports.TSNullKeyword = exports.tsNullKeyword = function(...args) {
    return (0, _builder.default)("TSNullKeyword", ...args);
  }, exports.tSNumberKeyword = exports.TSNumberKeyword = exports.tsNumberKeyword = function(...args) {
    return (0, _builder.default)("TSNumberKeyword", ...args);
  }, exports.tSObjectKeyword = exports.TSObjectKeyword = exports.tsObjectKeyword = function(...args) {
    return (0, _builder.default)("TSObjectKeyword", ...args);
  }, exports.tSStringKeyword = exports.TSStringKeyword = exports.tsStringKeyword = function(...args) {
    return (0, _builder.default)("TSStringKeyword", ...args);
  }, exports.tSSymbolKeyword = exports.TSSymbolKeyword = exports.tsSymbolKeyword = function(...args) {
    return (0, _builder.default)("TSSymbolKeyword", ...args);
  }, exports.tSUndefinedKeyword = exports.TSUndefinedKeyword = exports.tsUndefinedKeyword = function(...args) {
    return (0, _builder.default)("TSUndefinedKeyword", ...args);
  }, exports.tSUnknownKeyword = exports.TSUnknownKeyword = exports.tsUnknownKeyword = function(...args) {
    return (0, _builder.default)("TSUnknownKeyword", ...args);
  }, exports.tSVoidKeyword = exports.TSVoidKeyword = exports.tsVoidKeyword = function(...args) {
    return (0, _builder.default)("TSVoidKeyword", ...args);
  }, exports.tSThisType = exports.TSThisType = exports.tsThisType = function(...args) {
    return (0, _builder.default)("TSThisType", ...args);
  }, exports.tSFunctionType = exports.TSFunctionType = exports.tsFunctionType = function(...args) {
    return (0, _builder.default)("TSFunctionType", ...args);
  }, exports.tSConstructorType = exports.TSConstructorType = exports.tsConstructorType = function(...args) {
    return (0, _builder.default)("TSConstructorType", ...args);
  }, exports.tSTypeReference = exports.TSTypeReference = exports.tsTypeReference = function(...args) {
    return (0, _builder.default)("TSTypeReference", ...args);
  }, exports.tSTypePredicate = exports.TSTypePredicate = exports.tsTypePredicate = function(...args) {
    return (0, _builder.default)("TSTypePredicate", ...args);
  }, exports.tSTypeQuery = exports.TSTypeQuery = exports.tsTypeQuery = function(...args) {
    return (0, _builder.default)("TSTypeQuery", ...args);
  }, exports.tSTypeLiteral = exports.TSTypeLiteral = exports.tsTypeLiteral = function(...args) {
    return (0, _builder.default)("TSTypeLiteral", ...args);
  }, exports.tSArrayType = exports.TSArrayType = exports.tsArrayType = function(...args) {
    return (0, _builder.default)("TSArrayType", ...args);
  }, exports.tSTupleType = exports.TSTupleType = exports.tsTupleType = function(...args) {
    return (0, _builder.default)("TSTupleType", ...args);
  }, exports.tSOptionalType = exports.TSOptionalType = exports.tsOptionalType = function(...args) {
    return (0, _builder.default)("TSOptionalType", ...args);
  }, exports.tSRestType = exports.TSRestType = exports.tsRestType = function(...args) {
    return (0, _builder.default)("TSRestType", ...args);
  }, exports.tSUnionType = exports.TSUnionType = exports.tsUnionType = function(...args) {
    return (0, _builder.default)("TSUnionType", ...args);
  }, exports.tSIntersectionType = exports.TSIntersectionType = exports.tsIntersectionType = function(...args) {
    return (0, _builder.default)("TSIntersectionType", ...args);
  }, exports.tSConditionalType = exports.TSConditionalType = exports.tsConditionalType = function(...args) {
    return (0, _builder.default)("TSConditionalType", ...args);
  }, exports.tSInferType = exports.TSInferType = exports.tsInferType = function(...args) {
    return (0, _builder.default)("TSInferType", ...args);
  }, exports.tSParenthesizedType = exports.TSParenthesizedType = exports.tsParenthesizedType = function(...args) {
    return (0, _builder.default)("TSParenthesizedType", ...args);
  }, exports.tSTypeOperator = exports.TSTypeOperator = exports.tsTypeOperator = function(...args) {
    return (0, _builder.default)("TSTypeOperator", ...args);
  }, exports.tSIndexedAccessType = exports.TSIndexedAccessType = exports.tsIndexedAccessType = function(...args) {
    return (0, _builder.default)("TSIndexedAccessType", ...args);
  }, exports.tSMappedType = exports.TSMappedType = exports.tsMappedType = function(...args) {
    return (0, _builder.default)("TSMappedType", ...args);
  }, exports.tSLiteralType = exports.TSLiteralType = exports.tsLiteralType = function(...args) {
    return (0, _builder.default)("TSLiteralType", ...args);
  }, exports.tSExpressionWithTypeArguments = exports.TSExpressionWithTypeArguments = exports.tsExpressionWithTypeArguments = function(...args) {
    return (0, _builder.default)("TSExpressionWithTypeArguments", ...args);
  }, exports.tSInterfaceDeclaration = exports.TSInterfaceDeclaration = exports.tsInterfaceDeclaration = function(...args) {
    return (0, _builder.default)("TSInterfaceDeclaration", ...args);
  }, exports.tSInterfaceBody = exports.TSInterfaceBody = exports.tsInterfaceBody = function(...args) {
    return (0, _builder.default)("TSInterfaceBody", ...args);
  }, exports.tSTypeAliasDeclaration = exports.TSTypeAliasDeclaration = exports.tsTypeAliasDeclaration = function(...args) {
    return (0, _builder.default)("TSTypeAliasDeclaration", ...args);
  }, exports.tSAsExpression = exports.TSAsExpression = exports.tsAsExpression = function(...args) {
    return (0, _builder.default)("TSAsExpression", ...args);
  }, exports.tSTypeAssertion = exports.TSTypeAssertion = exports.tsTypeAssertion = function(...args) {
    return (0, _builder.default)("TSTypeAssertion", ...args);
  }, exports.tSEnumDeclaration = exports.TSEnumDeclaration = exports.tsEnumDeclaration = function(...args) {
    return (0, _builder.default)("TSEnumDeclaration", ...args);
  }, exports.tSEnumMember = exports.TSEnumMember = exports.tsEnumMember = function(...args) {
    return (0, _builder.default)("TSEnumMember", ...args);
  }, exports.tSModuleDeclaration = exports.TSModuleDeclaration = exports.tsModuleDeclaration = function(...args) {
    return (0, _builder.default)("TSModuleDeclaration", ...args);
  }, exports.tSModuleBlock = exports.TSModuleBlock = exports.tsModuleBlock = function(...args) {
    return (0, _builder.default)("TSModuleBlock", ...args);
  }, exports.tSImportType = exports.TSImportType = exports.tsImportType = function(...args) {
    return (0, _builder.default)("TSImportType", ...args);
  }, exports.tSImportEqualsDeclaration = exports.TSImportEqualsDeclaration = exports.tsImportEqualsDeclaration = function(...args) {
    return (0, _builder.default)("TSImportEqualsDeclaration", ...args);
  }, exports.tSExternalModuleReference = exports.TSExternalModuleReference = exports.tsExternalModuleReference = function(...args) {
    return (0, _builder.default)("TSExternalModuleReference", ...args);
  }, exports.tSNonNullExpression = exports.TSNonNullExpression = exports.tsNonNullExpression = function(...args) {
    return (0, _builder.default)("TSNonNullExpression", ...args);
  }, exports.tSExportAssignment = exports.TSExportAssignment = exports.tsExportAssignment = function(...args) {
    return (0, _builder.default)("TSExportAssignment", ...args);
  }, exports.tSNamespaceExportDeclaration = exports.TSNamespaceExportDeclaration = exports.tsNamespaceExportDeclaration = function(...args) {
    return (0, _builder.default)("TSNamespaceExportDeclaration", ...args);
  }, exports.tSTypeAnnotation = exports.TSTypeAnnotation = exports.tsTypeAnnotation = function(...args) {
    return (0, _builder.default)("TSTypeAnnotation", ...args);
  }, exports.tSTypeParameterInstantiation = exports.TSTypeParameterInstantiation = exports.tsTypeParameterInstantiation = function(...args) {
    return (0, _builder.default)("TSTypeParameterInstantiation", ...args);
  }, exports.tSTypeParameterDeclaration = exports.TSTypeParameterDeclaration = exports.tsTypeParameterDeclaration = function(...args) {
    return (0, _builder.default)("TSTypeParameterDeclaration", ...args);
  }, exports.tSTypeParameter = exports.TSTypeParameter = exports.tsTypeParameter = function(...args) {
    return (0, _builder.default)("TSTypeParameter", ...args);
  }, exports.numberLiteral = exports.NumberLiteral = function(...args) {
    return console.trace("The node type NumberLiteral has been renamed to NumericLiteral"), 
    (0, _builder.default)("NumberLiteral", ...args);
  }, exports.regexLiteral = exports.RegexLiteral = function(...args) {
    return console.trace("The node type RegexLiteral has been renamed to RegExpLiteral"), 
    (0, _builder.default)("RegexLiteral", ...args);
  }, exports.restProperty = exports.RestProperty = function(...args) {
    return console.trace("The node type RestProperty has been renamed to RestElement"), 
    (0, _builder.default)("RestProperty", ...args);
  }, exports.spreadProperty = exports.SpreadProperty = function(...args) {
    return console.trace("The node type SpreadProperty has been renamed to SpreadElement"), 
    (0, _builder.default)("SpreadProperty", ...args);
  };
  var obj, _builder = (obj = __webpack_require__(354)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), Object.defineProperty(exports, "VISITOR_KEYS", {
    enumerable: !0,
    get: function() {
      return _utils.VISITOR_KEYS;
    }
  }), Object.defineProperty(exports, "ALIAS_KEYS", {
    enumerable: !0,
    get: function() {
      return _utils.ALIAS_KEYS;
    }
  }), Object.defineProperty(exports, "FLIPPED_ALIAS_KEYS", {
    enumerable: !0,
    get: function() {
      return _utils.FLIPPED_ALIAS_KEYS;
    }
  }), Object.defineProperty(exports, "NODE_FIELDS", {
    enumerable: !0,
    get: function() {
      return _utils.NODE_FIELDS;
    }
  }), Object.defineProperty(exports, "BUILDER_KEYS", {
    enumerable: !0,
    get: function() {
      return _utils.BUILDER_KEYS;
    }
  }), Object.defineProperty(exports, "DEPRECATED_KEYS", {
    enumerable: !0,
    get: function() {
      return _utils.DEPRECATED_KEYS;
    }
  }), Object.defineProperty(exports, "NODE_PARENT_VALIDATIONS", {
    enumerable: !0,
    get: function() {
      return _utils.NODE_PARENT_VALIDATIONS;
    }
  }), Object.defineProperty(exports, "PLACEHOLDERS", {
    enumerable: !0,
    get: function() {
      return _placeholders.PLACEHOLDERS;
    }
  }), Object.defineProperty(exports, "PLACEHOLDERS_ALIAS", {
    enumerable: !0,
    get: function() {
      return _placeholders.PLACEHOLDERS_ALIAS;
    }
  }), Object.defineProperty(exports, "PLACEHOLDERS_FLIPPED_ALIAS", {
    enumerable: !0,
    get: function() {
      return _placeholders.PLACEHOLDERS_FLIPPED_ALIAS;
    }
  }), exports.TYPES = void 0;
  var obj, _toFastProperties = (obj = __webpack_require__(356)) && obj.__esModule ? obj : {
    default: obj
  };
  __webpack_require__(102), __webpack_require__(213), __webpack_require__(357), __webpack_require__(358), 
  __webpack_require__(359), __webpack_require__(360), __webpack_require__(361);
  var _utils = __webpack_require__(28), _placeholders = __webpack_require__(244);
  (0, _toFastProperties.default)(_utils.VISITOR_KEYS), (0, _toFastProperties.default)(_utils.ALIAS_KEYS), 
  (0, _toFastProperties.default)(_utils.FLIPPED_ALIAS_KEYS), (0, _toFastProperties.default)(_utils.NODE_FIELDS), 
  (0, _toFastProperties.default)(_utils.BUILDER_KEYS), (0, _toFastProperties.default)(_utils.DEPRECATED_KEYS), 
  (0, _toFastProperties.default)(_placeholders.PLACEHOLDERS_ALIAS), (0, _toFastProperties.default)(_placeholders.PLACEHOLDERS_FLIPPED_ALIAS);
  const TYPES = Object.keys(_utils.VISITOR_KEYS).concat(Object.keys(_utils.FLIPPED_ALIAS_KEYS)).concat(Object.keys(_utils.DEPRECATED_KEYS));
  exports.TYPES = TYPES;
}, function(module, exports, __webpack_require__) {
  var isFunction = __webpack_require__(29), isLength = __webpack_require__(19);
  module.exports = function(value) {
    return null != value && isLength(value.length) && !isFunction(value);
  };
}, , function(module, exports) {
  module.exports = function(func) {
    return function(value) {
      return func(value);
    };
  };
}, function(module, exports) {
  module.exports = function(value, other) {
    return value === other || value != value && other != other;
  };
}, function(module, exports) {
  module.exports = function(module) {
    return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
    module.children || (module.children = []), Object.defineProperty(module, "loaded", {
      enumerable: !0,
      get: function() {
        return module.l;
      }
    }), Object.defineProperty(module, "id", {
      enumerable: !0,
      get: function() {
        return module.i;
      }
    }), module.webpackPolyfill = 1), module;
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var freeGlobal = __webpack_require__(30), freeExports = exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, freeProcess = freeModule && freeModule.exports === freeExports && freeGlobal.process, nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {}
    }();
    module.exports = nodeUtil;
  }).call(this, __webpack_require__(17)(module));
}, function(module, exports) {
  module.exports = function(value) {
    return "number" == typeof value && value > -1 && value % 1 == 0 && value <= 9007199254740991;
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(6)(Object, "create");
  module.exports = nativeCreate;
}, function(module, exports, __webpack_require__) {
  var listCacheClear = __webpack_require__(160), listCacheDelete = __webpack_require__(161), listCacheGet = __webpack_require__(162), listCacheHas = __webpack_require__(163), listCacheSet = __webpack_require__(164);
  function ListCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, 
  ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, 
  ListCache.prototype.set = listCacheSet, module.exports = ListCache;
}, function(module, exports, __webpack_require__) {
  var eq = __webpack_require__(16);
  module.exports = function(array, key) {
    for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
    return -1;
  };
}, function(module, exports, __webpack_require__) {
  var isKeyable = __webpack_require__(166);
  module.exports = function(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map;
  };
}, function(module, exports, __webpack_require__) {
  var arrayLikeKeys = __webpack_require__(41), baseKeys = __webpack_require__(176), isArrayLike = __webpack_require__(13);
  module.exports = function(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  };
}, function(module, exports) {
  var objectProto = Object.prototype;
  module.exports = function(value) {
    var Ctor = value && value.constructor;
    return value === ("function" == typeof Ctor && Ctor.prototype || objectProto);
  };
}, function(module, exports, __webpack_require__) {
  var assignValue = __webpack_require__(85), baseAssignValue = __webpack_require__(86);
  module.exports = function(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    for (var index = -1, length = props.length; ++index < length; ) {
      var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      void 0 === newValue && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue);
    }
    return object;
  };
}, function(module, exports, __webpack_require__) {
  var arrayLikeKeys = __webpack_require__(41), baseKeysIn = __webpack_require__(87), isArrayLike = __webpack_require__(13);
  module.exports = function(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.validate = validate, exports.typeIs = typeIs, exports.validateType = function(typeName) {
    return validate(typeIs(typeName));
  }, exports.validateOptional = function(validate) {
    return {
      validate: validate,
      optional: !0
    };
  }, exports.validateOptionalType = function(typeName) {
    return {
      validate: typeIs(typeName),
      optional: !0
    };
  }, exports.arrayOf = arrayOf, exports.arrayOfType = arrayOfType, exports.validateArrayOfType = function(typeName) {
    return validate(arrayOfType(typeName));
  }, exports.assertEach = assertEach, exports.assertOneOf = function(...values) {
    function validate(node, key, val) {
      if (values.indexOf(val) < 0) throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
    }
    return validate.oneOf = values, validate;
  }, exports.assertNodeType = assertNodeType, exports.assertNodeOrValueType = function(...types) {
    function validate(node, key, val) {
      for (const type of types) if (getType(val) === type || (0, _is.default)(type, val)) return void (0, 
      _validate.validateChild)(node, key, val);
      throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(null == val ? void 0 : val.type)}`);
    }
    return validate.oneOfNodeOrValueTypes = types, validate;
  }, exports.assertValueType = assertValueType, exports.assertShape = function(shape) {
    function validate(node, key, val) {
      const errors = [];
      for (const property of Object.keys(shape)) try {
        (0, _validate.validateField)(node, property, val[property], shape[property]);
      } catch (error) {
        if (error instanceof TypeError) {
          errors.push(error.message);
          continue;
        }
        throw error;
      }
      if (errors.length) throw new TypeError(`Property ${key} of ${node.type} expected to have the following:\n${errors.join("\n")}`);
    }
    return validate.shapeOf = shape, validate;
  }, exports.assertOptionalChainStart = function() {
    return function(node) {
      var _current;
      let current = node;
      for (;node; ) {
        const {type: type} = current;
        if ("OptionalCallExpression" !== type) {
          if ("OptionalMemberExpression" !== type) break;
          if (current.optional) return;
          current = current.object;
        } else {
          if (current.optional) return;
          current = current.callee;
        }
      }
      throw new TypeError(`Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${null == (_current = current) ? void 0 : _current.type}`);
    };
  }, exports.chain = chain, exports.default = function(type, opts = {}) {
    const inherits = opts.inherits && store[opts.inherits] || {};
    let fields = opts.fields;
    if (!fields && (fields = {}, inherits.fields)) {
      const keys = Object.getOwnPropertyNames(inherits.fields);
      for (const key of keys) {
        const field = inherits.fields[key];
        fields[key] = {
          default: field.default,
          optional: field.optional,
          validate: field.validate
        };
      }
    }
    const visitor = opts.visitor || inherits.visitor || [], aliases = opts.aliases || inherits.aliases || [], builder = opts.builder || inherits.builder || opts.visitor || [];
    for (const k of Object.keys(opts)) if (-1 === validTypeOpts.indexOf(k)) throw new Error(`Unknown type option "${k}" on ${type}`);
    opts.deprecatedAlias && (DEPRECATED_KEYS[opts.deprecatedAlias] = type);
    for (const key of visitor.concat(builder)) fields[key] = fields[key] || {};
    for (const key of Object.keys(fields)) {
      const field = fields[key];
      void 0 !== field.default && -1 === builder.indexOf(key) && (field.optional = !0), 
      void 0 === field.default ? field.default = null : field.validate || null == field.default || (field.validate = assertValueType(getType(field.default)));
      for (const k of Object.keys(field)) if (-1 === validFieldKeys.indexOf(k)) throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
    }
    VISITOR_KEYS[type] = opts.visitor = visitor, BUILDER_KEYS[type] = opts.builder = builder, 
    NODE_FIELDS[type] = opts.fields = fields, ALIAS_KEYS[type] = opts.aliases = aliases, 
    aliases.forEach(alias => {
      FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [], FLIPPED_ALIAS_KEYS[alias].push(type);
    }), opts.validate && (NODE_PARENT_VALIDATIONS[type] = opts.validate);
    store[type] = opts;
  }, exports.NODE_PARENT_VALIDATIONS = exports.DEPRECATED_KEYS = exports.BUILDER_KEYS = exports.NODE_FIELDS = exports.FLIPPED_ALIAS_KEYS = exports.ALIAS_KEYS = exports.VISITOR_KEYS = void 0;
  var obj, _is = (obj = __webpack_require__(90)) && obj.__esModule ? obj : {
    default: obj
  }, _validate = __webpack_require__(212);
  const VISITOR_KEYS = {};
  exports.VISITOR_KEYS = VISITOR_KEYS;
  const ALIAS_KEYS = {};
  exports.ALIAS_KEYS = ALIAS_KEYS;
  const FLIPPED_ALIAS_KEYS = {};
  exports.FLIPPED_ALIAS_KEYS = FLIPPED_ALIAS_KEYS;
  const NODE_FIELDS = {};
  exports.NODE_FIELDS = NODE_FIELDS;
  const BUILDER_KEYS = {};
  exports.BUILDER_KEYS = BUILDER_KEYS;
  const DEPRECATED_KEYS = {};
  exports.DEPRECATED_KEYS = DEPRECATED_KEYS;
  const NODE_PARENT_VALIDATIONS = {};
  function getType(val) {
    return Array.isArray(val) ? "array" : null === val ? "null" : typeof val;
  }
  function validate(validate) {
    return {
      validate: validate
    };
  }
  function typeIs(typeName) {
    return "string" == typeof typeName ? assertNodeType(typeName) : assertNodeType(...typeName);
  }
  function arrayOf(elementType) {
    return chain(assertValueType("array"), assertEach(elementType));
  }
  function arrayOfType(typeName) {
    return arrayOf(typeIs(typeName));
  }
  function assertEach(callback) {
    function validator(node, key, val) {
      if (Array.isArray(val)) for (let i = 0; i < val.length; i++) {
        const subkey = `${key}[${i}]`, v = val[i];
        callback(node, subkey, v), process.env.BABEL_TYPES_8_BREAKING && (0, _validate.validateChild)(node, subkey, v);
      }
    }
    return validator.each = callback, validator;
  }
  function assertNodeType(...types) {
    function validate(node, key, val) {
      for (const type of types) if ((0, _is.default)(type, val)) return void (0, _validate.validateChild)(node, key, val);
      throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(null == val ? void 0 : val.type)}`);
    }
    return validate.oneOfNodeTypes = types, validate;
  }
  function assertValueType(type) {
    function validate(node, key, val) {
      if (!(getType(val) === type)) throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
    }
    return validate.type = type, validate;
  }
  function chain(...fns) {
    function validate(...args) {
      for (const fn of fns) fn(...args);
    }
    return validate.chainOf = fns, validate;
  }
  exports.NODE_PARENT_VALIDATIONS = NODE_PARENT_VALIDATIONS;
  const validTypeOpts = [ "aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate" ], validFieldKeys = [ "default", "optional", "validate" ];
  const store = {};
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isObject = __webpack_require__(2);
  module.exports = function(value) {
    if (!isObject(value)) return !1;
    var tag = baseGetTag(value);
    return "[object Function]" == tag || "[object GeneratorFunction]" == tag || "[object AsyncFunction]" == tag || "[object Proxy]" == tag;
  };
}, function(module, exports) {
  var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
  module.exports = freeGlobal;
}, function(module, exports) {
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  module.exports = function(value, length) {
    var type = typeof value;
    return !!(length = null == length ? 9007199254740991 : length) && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var root = __webpack_require__(1), stubFalse = __webpack_require__(82), freeExports = exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, isBuffer = (Buffer ? Buffer.isBuffer : void 0) || stubFalse;
    module.exports = isBuffer;
  }).call(this, __webpack_require__(17)(module));
}, function(module, exports, __webpack_require__) {
  var DataView = __webpack_require__(178), Map = __webpack_require__(39), Promise = __webpack_require__(179), Set = __webpack_require__(180), WeakMap = __webpack_require__(181), baseGetTag = __webpack_require__(7), toSource = __webpack_require__(38), dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap), getTag = baseGetTag;
  (DataView && "[object DataView]" != getTag(new DataView(new ArrayBuffer(1))) || Map && "[object Map]" != getTag(new Map) || Promise && "[object Promise]" != getTag(Promise.resolve()) || Set && "[object Set]" != getTag(new Set) || WeakMap && "[object WeakMap]" != getTag(new WeakMap)) && (getTag = function(value) {
    var result = baseGetTag(value), Ctor = "[object Object]" == result ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) switch (ctorString) {
     case dataViewCtorString:
      return "[object DataView]";

     case mapCtorString:
      return "[object Map]";

     case promiseCtorString:
      return "[object Promise]";

     case setCtorString:
      return "[object Set]";

     case weakMapCtorString:
      return "[object WeakMap]";
    }
    return result;
  }), module.exports = getTag;
}, , , , function(module, exports, __webpack_require__) {
  var baseIsArguments = __webpack_require__(72), isObjectLike = __webpack_require__(3), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, propertyIsEnumerable = objectProto.propertyIsEnumerable, isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  module.exports = isArguments;
}, function(module, exports) {
  var funcToString = Function.prototype.toString;
  module.exports = function(func) {
    if (null != func) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + "";
      } catch (e) {}
    }
    return "";
  };
}, function(module, exports, __webpack_require__) {
  var Map = __webpack_require__(6)(__webpack_require__(1), "Map");
  module.exports = Map;
}, function(module, exports, __webpack_require__) {
  var arrayFilter = __webpack_require__(175), stubArray = __webpack_require__(80), propertyIsEnumerable = Object.prototype.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
    return null == object ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), (function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    })));
  } : stubArray;
  module.exports = getSymbols;
}, function(module, exports, __webpack_require__) {
  var baseTimes = __webpack_require__(81), isArguments = __webpack_require__(37), isArray = __webpack_require__(5), isBuffer = __webpack_require__(32), isIndex = __webpack_require__(31), isTypedArray = __webpack_require__(55), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) !inherited && !hasOwnProperty.call(value, key) || skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)) || result.push(key);
    return result;
  };
}, , function(module, exports, __webpack_require__) {
  var Uint8Array = __webpack_require__(100);
  module.exports = function(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    return new Uint8Array(result).set(new Uint8Array(arrayBuffer)), result;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.NOT_LOCAL_BINDING = exports.BLOCK_SCOPED_SYMBOL = exports.INHERIT_KEYS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.NUMBER_UNARY_OPERATORS = exports.BOOLEAN_UNARY_OPERATORS = exports.ASSIGNMENT_OPERATORS = exports.BINARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.EQUALITY_BINARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.UPDATE_OPERATORS = exports.LOGICAL_OPERATORS = exports.COMMENT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = void 0;
  exports.STATEMENT_OR_BLOCK_KEYS = [ "consequent", "body", "alternate" ];
  exports.FLATTENABLE_KEYS = [ "body", "expressions" ];
  exports.FOR_INIT_KEYS = [ "left", "init" ];
  exports.COMMENT_KEYS = [ "leadingComments", "trailingComments", "innerComments" ];
  const LOGICAL_OPERATORS = [ "||", "&&", "??" ];
  exports.LOGICAL_OPERATORS = LOGICAL_OPERATORS;
  exports.UPDATE_OPERATORS = [ "++", "--" ];
  const BOOLEAN_NUMBER_BINARY_OPERATORS = [ ">", "<", ">=", "<=" ];
  exports.BOOLEAN_NUMBER_BINARY_OPERATORS = BOOLEAN_NUMBER_BINARY_OPERATORS;
  const EQUALITY_BINARY_OPERATORS = [ "==", "===", "!=", "!==" ];
  exports.EQUALITY_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS;
  const COMPARISON_BINARY_OPERATORS = [ ...EQUALITY_BINARY_OPERATORS, "in", "instanceof" ];
  exports.COMPARISON_BINARY_OPERATORS = COMPARISON_BINARY_OPERATORS;
  const BOOLEAN_BINARY_OPERATORS = [ ...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS ];
  exports.BOOLEAN_BINARY_OPERATORS = BOOLEAN_BINARY_OPERATORS;
  const NUMBER_BINARY_OPERATORS = [ "-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^" ];
  exports.NUMBER_BINARY_OPERATORS = NUMBER_BINARY_OPERATORS;
  const BINARY_OPERATORS = [ "+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS ];
  exports.BINARY_OPERATORS = BINARY_OPERATORS;
  const ASSIGNMENT_OPERATORS = [ "=", "+=", ...NUMBER_BINARY_OPERATORS.map(op => op + "="), ...LOGICAL_OPERATORS.map(op => op + "=") ];
  exports.ASSIGNMENT_OPERATORS = ASSIGNMENT_OPERATORS;
  const BOOLEAN_UNARY_OPERATORS = [ "delete", "!" ];
  exports.BOOLEAN_UNARY_OPERATORS = BOOLEAN_UNARY_OPERATORS;
  const NUMBER_UNARY_OPERATORS = [ "+", "-", "~" ];
  exports.NUMBER_UNARY_OPERATORS = NUMBER_UNARY_OPERATORS;
  const STRING_UNARY_OPERATORS = [ "typeof" ];
  exports.STRING_UNARY_OPERATORS = STRING_UNARY_OPERATORS;
  const UNARY_OPERATORS = [ "void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS ];
  exports.UNARY_OPERATORS = UNARY_OPERATORS;
  exports.INHERIT_KEYS = {
    optional: [ "typeAnnotation", "typeParameters", "returnType" ],
    force: [ "start", "loc", "end" ]
  };
  const BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
  exports.BLOCK_SCOPED_SYMBOL = BLOCK_SCOPED_SYMBOL;
  const NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
  exports.NOT_LOCAL_BINDING = NOT_LOCAL_BINDING;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = cloneNode;
  var _definitions = __webpack_require__(12);
  const has = Function.call.bind(Object.prototype.hasOwnProperty);
  function cloneIfNode(obj, deep, withoutLoc) {
    return obj && "string" == typeof obj.type ? cloneNode(obj, deep, withoutLoc) : obj;
  }
  function cloneIfNodeOrArray(obj, deep, withoutLoc) {
    return Array.isArray(obj) ? obj.map(node => cloneIfNode(node, deep, withoutLoc)) : cloneIfNode(obj, deep, withoutLoc);
  }
  function cloneNode(node, deep = !0, withoutLoc = !1) {
    if (!node) return node;
    const {type: type} = node, newNode = {
      type: type
    };
    if ("Identifier" === type) newNode.name = node.name, has(node, "optional") && "boolean" == typeof node.optional && (newNode.optional = node.optional), 
    has(node, "typeAnnotation") && (newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node.typeAnnotation, !0, withoutLoc) : node.typeAnnotation); else {
      if (!has(_definitions.NODE_FIELDS, type)) throw new Error(`Unknown node type: "${type}"`);
      for (const field of Object.keys(_definitions.NODE_FIELDS[type])) has(node, field) && (newNode[field] = deep ? "File" === type && "comments" === field ? maybeCloneComments(node.comments, deep, withoutLoc) : cloneIfNodeOrArray(node[field], !0, withoutLoc) : node[field]);
    }
    return has(node, "loc") && (newNode.loc = withoutLoc ? null : node.loc), has(node, "leadingComments") && (newNode.leadingComments = maybeCloneComments(node.leadingComments, deep, withoutLoc)), 
    has(node, "innerComments") && (newNode.innerComments = maybeCloneComments(node.innerComments, deep, withoutLoc)), 
    has(node, "trailingComments") && (newNode.trailingComments = maybeCloneComments(node.trailingComments, deep, withoutLoc)), 
    has(node, "extra") && (newNode.extra = Object.assign({}, node.extra)), newNode;
  }
  function maybeCloneComments(comments, deep, withoutLoc) {
    return deep && withoutLoc ? function(comments) {
      return comments.map(({type: type, value: value}) => ({
        type: type,
        value: value,
        loc: null
      }));
    }(comments) : comments;
  }
}, , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), Object.defineProperty(exports, "isIdentifierName", {
    enumerable: !0,
    get: function() {
      return _identifier.isIdentifierName;
    }
  }), Object.defineProperty(exports, "isIdentifierChar", {
    enumerable: !0,
    get: function() {
      return _identifier.isIdentifierChar;
    }
  }), Object.defineProperty(exports, "isIdentifierStart", {
    enumerable: !0,
    get: function() {
      return _identifier.isIdentifierStart;
    }
  }), Object.defineProperty(exports, "isReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isReservedWord;
    }
  }), Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isStrictBindOnlyReservedWord;
    }
  }), Object.defineProperty(exports, "isStrictBindReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isStrictBindReservedWord;
    }
  }), Object.defineProperty(exports, "isStrictReservedWord", {
    enumerable: !0,
    get: function() {
      return _keyword.isStrictReservedWord;
    }
  }), Object.defineProperty(exports, "isKeyword", {
    enumerable: !0,
    get: function() {
      return _keyword.isKeyword;
    }
  });
  var _identifier = __webpack_require__(59), _keyword = __webpack_require__(60);
}, , , , , function(module, exports) {
  module.exports = function(array, values) {
    for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var baseIsTypedArray = __webpack_require__(83), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  module.exports = isTypedArray;
}, function(module, exports, __webpack_require__) {
  var getNative = __webpack_require__(6), defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      return func({}, "", {}), func;
    } catch (e) {}
  }();
  module.exports = defineProperty;
}, function(module, exports, __webpack_require__) {
  var getPrototype = __webpack_require__(84)(Object.getPrototypeOf, Object);
  module.exports = getPrototype;
}, , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isIdentifierStart = isIdentifierStart, exports.isIdentifierChar = isIdentifierChar, 
  exports.isIdentifierName = function(name) {
    let isFirst = !0;
    for (let _i = 0, _Array$from = Array.from(name); _i < _Array$from.length; _i++) {
      const cp = _Array$from[_i].codePointAt(0);
      if (isFirst) {
        if (!isIdentifierStart(cp)) return !1;
        isFirst = !1;
      } else if (!isIdentifierChar(cp)) return !1;
    }
    return !isFirst;
  };
  let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
  const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
  const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];
  function isInAstralSet(code, set) {
    let pos = 65536;
    for (let i = 0, length = set.length; i < length; i += 2) {
      if (pos += set[i], pos > code) return !1;
      if (pos += set[i + 1], pos >= code) return !0;
    }
    return !1;
  }
  function isIdentifierStart(code) {
    return code < 65 ? 36 === code : code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes)));
  }
  function isIdentifierChar(code) {
    return code < 48 ? 36 === code : code < 58 || !(code < 65) && (code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes))));
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isReservedWord = isReservedWord, exports.isStrictReservedWord = isStrictReservedWord, 
  exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, exports.isStrictBindReservedWord = function(word, inModule) {
    return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
  }, exports.isKeyword = function(word) {
    return keywords.has(word);
  };
  const reservedWords_strict = [ "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield" ], reservedWords_strictBind = [ "eval", "arguments" ], keywords = new Set([ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete" ]), reservedWordsStrictSet = new Set(reservedWords_strict), reservedWordsStrictBindSet = new Set(reservedWords_strictBind);
  function isReservedWord(word, inModule) {
    return inModule && "await" === word || "enum" === word;
  }
  function isStrictReservedWord(word, inModule) {
    return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
  }
  function isStrictBindOnlyReservedWord(word) {
    return reservedWordsStrictBindSet.has(word);
  }
}, , function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  module.exports = function(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = !0;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
    result;
  };
}, function(module, exports) {
  var nativeObjectToString = Object.prototype.toString;
  module.exports = function(value) {
    return nativeObjectToString.call(value);
  };
}, , , , , , , , , function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object Arguments]" == baseGetTag(value);
  };
}, function(module, exports, __webpack_require__) {
  var mapCacheClear = __webpack_require__(153), mapCacheDelete = __webpack_require__(165), mapCacheGet = __webpack_require__(167), mapCacheHas = __webpack_require__(168), mapCacheSet = __webpack_require__(169);
  function MapCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, 
  MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, 
  module.exports = MapCache;
}, function(module, exports, __webpack_require__) {
  var isFunction = __webpack_require__(29), isMasked = __webpack_require__(75), isObject = __webpack_require__(2), toSource = __webpack_require__(38), reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  module.exports = function(value) {
    return !(!isObject(value) || isMasked(value)) && (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
  };
}, function(module, exports, __webpack_require__) {
  var uid, coreJsData = __webpack_require__(76), maskSrcKey = (uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "")) ? "Symbol(src)_1." + uid : "";
  module.exports = function(func) {
    return !!maskSrcKey && maskSrcKey in func;
  };
}, function(module, exports, __webpack_require__) {
  var coreJsData = __webpack_require__(1)["__core-js_shared__"];
  module.exports = coreJsData;
}, function(module, exports) {
  module.exports = function(object, key) {
    return null == object ? void 0 : object[key];
  };
}, function(module, exports, __webpack_require__) {
  var ListCache = __webpack_require__(21), stackClear = __webpack_require__(170), stackDelete = __webpack_require__(171), stackGet = __webpack_require__(172), stackHas = __webpack_require__(173), stackSet = __webpack_require__(174);
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, 
  Stack.prototype.has = stackHas, Stack.prototype.set = stackSet, module.exports = Stack;
}, function(module, exports, __webpack_require__) {
  var arrayPush = __webpack_require__(54), isArray = __webpack_require__(5);
  module.exports = function(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  };
}, function(module, exports) {
  module.exports = function() {
    return [];
  };
}, function(module, exports) {
  module.exports = function(n, iteratee) {
    for (var index = -1, result = Array(n); ++index < n; ) result[index] = iteratee(index);
    return result;
  };
}, function(module, exports) {
  module.exports = function() {
    return !1;
  };
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isLength = __webpack_require__(19), isObjectLike = __webpack_require__(3), typedArrayTags = {};
  typedArrayTags["[object Float32Array]"] = typedArrayTags["[object Float64Array]"] = typedArrayTags["[object Int8Array]"] = typedArrayTags["[object Int16Array]"] = typedArrayTags["[object Int32Array]"] = typedArrayTags["[object Uint8Array]"] = typedArrayTags["[object Uint8ClampedArray]"] = typedArrayTags["[object Uint16Array]"] = typedArrayTags["[object Uint32Array]"] = !0, 
  typedArrayTags["[object Arguments]"] = typedArrayTags["[object Array]"] = typedArrayTags["[object ArrayBuffer]"] = typedArrayTags["[object Boolean]"] = typedArrayTags["[object DataView]"] = typedArrayTags["[object Date]"] = typedArrayTags["[object Error]"] = typedArrayTags["[object Function]"] = typedArrayTags["[object Map]"] = typedArrayTags["[object Number]"] = typedArrayTags["[object Object]"] = typedArrayTags["[object RegExp]"] = typedArrayTags["[object Set]"] = typedArrayTags["[object String]"] = typedArrayTags["[object WeakMap]"] = !1, 
  module.exports = function(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  };
}, function(module, exports) {
  module.exports = function(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  };
}, function(module, exports, __webpack_require__) {
  var baseAssignValue = __webpack_require__(86), eq = __webpack_require__(16), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object, key, value) {
    var objValue = object[key];
    hasOwnProperty.call(object, key) && eq(objValue, value) && (void 0 !== value || key in object) || baseAssignValue(object, key, value);
  };
}, function(module, exports, __webpack_require__) {
  var defineProperty = __webpack_require__(56);
  module.exports = function(object, key, value) {
    "__proto__" == key && defineProperty ? defineProperty(object, key, {
      configurable: !0,
      enumerable: !0,
      value: value,
      writable: !0
    }) : object[key] = value;
  };
}, function(module, exports, __webpack_require__) {
  var isObject = __webpack_require__(2), isPrototype = __webpack_require__(25), nativeKeysIn = __webpack_require__(88), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object) {
    if (!isObject(object)) return nativeKeysIn(object);
    var isProto = isPrototype(object), result = [];
    for (var key in object) ("constructor" != key || !isProto && hasOwnProperty.call(object, key)) && result.push(key);
    return result;
  };
}, function(module, exports) {
  module.exports = function(object) {
    var result = [];
    if (null != object) for (var key in Object(object)) result.push(key);
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var arrayPush = __webpack_require__(54), getPrototype = __webpack_require__(57), getSymbols = __webpack_require__(40), stubArray = __webpack_require__(80), getSymbolsIn = Object.getOwnPropertySymbols ? function(object) {
    for (var result = []; object; ) arrayPush(result, getSymbols(object)), object = getPrototype(object);
    return result;
  } : stubArray;
  module.exports = getSymbolsIn;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(type, node, opts) {
    if (!node) return !1;
    if (!(0, _isType.default)(node.type, type)) return !opts && "Placeholder" === node.type && type in _definitions.FLIPPED_ALIAS_KEYS && (0, 
    _isPlaceholderType.default)(node.expectedNode, type);
    return void 0 === opts || (0, _shallowEqual.default)(node, opts);
  };
  var _shallowEqual = _interopRequireDefault(__webpack_require__(210)), _isType = _interopRequireDefault(__webpack_require__(211)), _isPlaceholderType = _interopRequireDefault(__webpack_require__(243)), _definitions = __webpack_require__(12);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(name, reserved = !0) {
    if ("string" != typeof name) return !1;
    if (reserved) {
      if ((0, _helperValidatorIdentifier.isKeyword)(name) || (0, _helperValidatorIdentifier.isStrictReservedWord)(name)) return !1;
      if ("await" === name) return !1;
    }
    return (0, _helperValidatorIdentifier.isIdentifierName)(name);
  };
  var _helperValidatorIdentifier = __webpack_require__(49);
}, , , , , , , , , function(module, exports, __webpack_require__) {
  var Uint8Array = __webpack_require__(1).Uint8Array;
  module.exports = Uint8Array;
}, function(module, exports, __webpack_require__) {
  var baseGetAllKeys = __webpack_require__(79), getSymbols = __webpack_require__(40), keys = __webpack_require__(24);
  module.exports = function(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.patternLikeCommon = exports.functionDeclarationCommon = exports.functionTypeAnnotationCommon = exports.functionCommon = void 0;
  var _is = _interopRequireDefault(__webpack_require__(90)), _isValidIdentifier = _interopRequireDefault(__webpack_require__(91)), _helperValidatorIdentifier = __webpack_require__(49), _constants = __webpack_require__(44), _utils = function(obj) {
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
  }(__webpack_require__(28));
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
  (0, _utils.default)("ArrayExpression", {
    fields: {
      elements: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
        default: process.env.BABEL_TYPES_8_BREAKING ? void 0 : []
      }
    },
    visitor: [ "elements" ],
    aliases: [ "Expression" ]
  }), (0, _utils.default)("AssignmentExpression", {
    fields: {
      operator: {
        validate: function() {
          if (!process.env.BABEL_TYPES_8_BREAKING) return (0, _utils.assertValueType)("string");
          const identifier = (0, _utils.assertOneOf)(..._constants.ASSIGNMENT_OPERATORS), pattern = (0, 
          _utils.assertOneOf)("=");
          return function(node, key, val) {
            ((0, _is.default)("Pattern", node.left) ? pattern : identifier)(node, key, val);
          };
        }()
      },
      left: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern") : (0, 
        _utils.assertNodeType)("LVal")
      },
      right: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    },
    builder: [ "operator", "left", "right" ],
    visitor: [ "left", "right" ],
    aliases: [ "Expression" ]
  }), (0, _utils.default)("BinaryExpression", {
    builder: [ "operator", "left", "right" ],
    fields: {
      operator: {
        validate: (0, _utils.assertOneOf)(..._constants.BINARY_OPERATORS)
      },
      left: {
        validate: function() {
          const expression = (0, _utils.assertNodeType)("Expression"), inOp = (0, _utils.assertNodeType)("Expression", "PrivateName"), validator = function(node, key, val) {
            ("in" === node.operator ? inOp : expression)(node, key, val);
          };
          return validator.oneOfNodeTypes = [ "Expression", "PrivateName" ], validator;
        }()
      },
      right: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    },
    visitor: [ "left", "right" ],
    aliases: [ "Binary", "Expression" ]
  }), (0, _utils.default)("InterpreterDirective", {
    builder: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("string")
      }
    }
  }), (0, _utils.default)("Directive", {
    visitor: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertNodeType)("DirectiveLiteral")
      }
    }
  }), (0, _utils.default)("DirectiveLiteral", {
    builder: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("string")
      }
    }
  }), (0, _utils.default)("BlockStatement", {
    builder: [ "body", "directives" ],
    visitor: [ "directives", "body" ],
    fields: {
      directives: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Directive"))),
        default: []
      },
      body: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Statement")))
      }
    },
    aliases: [ "Scopable", "BlockParent", "Block", "Statement" ]
  }), (0, _utils.default)("BreakStatement", {
    visitor: [ "label" ],
    fields: {
      label: {
        validate: (0, _utils.assertNodeType)("Identifier"),
        optional: !0
      }
    },
    aliases: [ "Statement", "Terminatorless", "CompletionStatement" ]
  }), (0, _utils.default)("CallExpression", {
    visitor: [ "callee", "arguments", "typeParameters", "typeArguments" ],
    builder: [ "callee", "arguments" ],
    aliases: [ "Expression" ],
    fields: Object.assign({
      callee: {
        validate: (0, _utils.assertNodeType)("Expression", "V8IntrinsicIdentifier")
      },
      arguments: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
      }
    }, process.env.BABEL_TYPES_8_BREAKING ? {} : {
      optional: {
        validate: (0, _utils.assertOneOf)(!0, !1),
        optional: !0
      }
    }, {
      typeArguments: {
        validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
        optional: !0
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
        optional: !0
      }
    })
  }), (0, _utils.default)("CatchClause", {
    visitor: [ "param", "body" ],
    fields: {
      param: {
        validate: (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
        optional: !0
      },
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    },
    aliases: [ "Scopable", "BlockParent" ]
  }), (0, _utils.default)("ConditionalExpression", {
    visitor: [ "test", "consequent", "alternate" ],
    fields: {
      test: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      consequent: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      alternate: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    },
    aliases: [ "Expression", "Conditional" ]
  }), (0, _utils.default)("ContinueStatement", {
    visitor: [ "label" ],
    fields: {
      label: {
        validate: (0, _utils.assertNodeType)("Identifier"),
        optional: !0
      }
    },
    aliases: [ "Statement", "Terminatorless", "CompletionStatement" ]
  }), (0, _utils.default)("DebuggerStatement", {
    aliases: [ "Statement" ]
  }), (0, _utils.default)("DoWhileStatement", {
    visitor: [ "test", "body" ],
    fields: {
      test: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      }
    },
    aliases: [ "Statement", "BlockParent", "Loop", "While", "Scopable" ]
  }), (0, _utils.default)("EmptyStatement", {
    aliases: [ "Statement" ]
  }), (0, _utils.default)("ExpressionStatement", {
    visitor: [ "expression" ],
    fields: {
      expression: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    },
    aliases: [ "Statement", "ExpressionWrapper" ]
  }), (0, _utils.default)("File", {
    builder: [ "program", "comments", "tokens" ],
    visitor: [ "program" ],
    fields: {
      program: {
        validate: (0, _utils.assertNodeType)("Program")
      },
      comments: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertEach)((0, _utils.assertNodeType)("CommentBlock", "CommentLine")) : Object.assign(() => {}, {
          each: {
            oneOfNodeTypes: [ "CommentBlock", "CommentLine" ]
          }
        }),
        optional: !0
      },
      tokens: {
        validate: (0, _utils.assertEach)(Object.assign(() => {}, {
          type: "any"
        })),
        optional: !0
      }
    }
  }), (0, _utils.default)("ForInStatement", {
    visitor: [ "left", "right", "body" ],
    aliases: [ "Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement" ],
    fields: {
      left: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern") : (0, 
        _utils.assertNodeType)("VariableDeclaration", "LVal")
      },
      right: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      }
    }
  }), (0, _utils.default)("ForStatement", {
    visitor: [ "init", "test", "update", "body" ],
    aliases: [ "Scopable", "Statement", "For", "BlockParent", "Loop" ],
    fields: {
      init: {
        validate: (0, _utils.assertNodeType)("VariableDeclaration", "Expression"),
        optional: !0
      },
      test: {
        validate: (0, _utils.assertNodeType)("Expression"),
        optional: !0
      },
      update: {
        validate: (0, _utils.assertNodeType)("Expression"),
        optional: !0
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      }
    }
  });
  const functionCommon = {
    params: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
      _utils.assertNodeType)("Identifier", "Pattern", "RestElement", "TSParameterProperty")))
    },
    generator: {
      default: !1
    },
    async: {
      default: !1
    }
  };
  exports.functionCommon = functionCommon;
  const functionTypeAnnotationCommon = {
    returnType: {
      validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: !0
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
      optional: !0
    }
  };
  exports.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
  const functionDeclarationCommon = Object.assign({}, functionCommon, {
    declare: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: !0
    },
    id: {
      validate: (0, _utils.assertNodeType)("Identifier"),
      optional: !0
    }
  });
  exports.functionDeclarationCommon = functionDeclarationCommon, (0, _utils.default)("FunctionDeclaration", {
    builder: [ "id", "params", "body", "generator", "async" ],
    visitor: [ "id", "params", "body", "returnType", "typeParameters" ],
    fields: Object.assign({}, functionDeclarationCommon, functionTypeAnnotationCommon, {
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    }),
    aliases: [ "Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration" ],
    validate: function() {
      if (!process.env.BABEL_TYPES_8_BREAKING) return () => {};
      const identifier = (0, _utils.assertNodeType)("Identifier");
      return function(parent, key, node) {
        (0, _is.default)("ExportDefaultDeclaration", parent) || identifier(node, "id", node.id);
      };
    }()
  }), (0, _utils.default)("FunctionExpression", {
    inherits: "FunctionDeclaration",
    aliases: [ "Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish" ],
    fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
      id: {
        validate: (0, _utils.assertNodeType)("Identifier"),
        optional: !0
      },
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    })
  });
  const patternLikeCommon = {
    typeAnnotation: {
      validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: !0
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
      _utils.assertNodeType)("Decorator")))
    }
  };
  exports.patternLikeCommon = patternLikeCommon, (0, _utils.default)("Identifier", {
    builder: [ "name" ],
    visitor: [ "typeAnnotation", "decorators" ],
    aliases: [ "Expression", "PatternLike", "LVal", "TSEntityName" ],
    fields: Object.assign({}, patternLikeCommon, {
      name: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign((function(node, key, val) {
          if (process.env.BABEL_TYPES_8_BREAKING && !(0, _isValidIdentifier.default)(val, !1)) throw new TypeError(`"${val}" is not a valid identifier name`);
        }), {
          type: "string"
        }))
      },
      optional: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      }
    }),
    validate(parent, key, node) {
      if (!process.env.BABEL_TYPES_8_BREAKING) return;
      const match = /\.(\w+)$/.exec(key);
      if (!match) return;
      const [, parentKey] = match, nonComp = {
        computed: !1
      };
      if ("property" === parentKey) {
        if ((0, _is.default)("MemberExpression", parent, nonComp)) return;
        if ((0, _is.default)("OptionalMemberExpression", parent, nonComp)) return;
      } else if ("key" === parentKey) {
        if ((0, _is.default)("Property", parent, nonComp)) return;
        if ((0, _is.default)("Method", parent, nonComp)) return;
      } else if ("exported" === parentKey) {
        if ((0, _is.default)("ExportSpecifier", parent)) return;
      } else if ("imported" === parentKey) {
        if ((0, _is.default)("ImportSpecifier", parent, {
          imported: node
        })) return;
      } else if ("meta" === parentKey && (0, _is.default)("MetaProperty", parent, {
        meta: node
      })) return;
      if (((0, _helperValidatorIdentifier.isKeyword)(node.name) || (0, _helperValidatorIdentifier.isReservedWord)(node.name)) && "this" !== node.name) throw new TypeError(`"${node.name}" is not a valid identifier`);
    }
  }), (0, _utils.default)("IfStatement", {
    visitor: [ "test", "consequent", "alternate" ],
    aliases: [ "Statement", "Conditional" ],
    fields: {
      test: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      consequent: {
        validate: (0, _utils.assertNodeType)("Statement")
      },
      alternate: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("Statement")
      }
    }
  }), (0, _utils.default)("LabeledStatement", {
    visitor: [ "label", "body" ],
    aliases: [ "Statement" ],
    fields: {
      label: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      }
    }
  }), (0, _utils.default)("StringLiteral", {
    builder: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("string")
      }
    },
    aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
  }), (0, _utils.default)("NumericLiteral", {
    builder: [ "value" ],
    deprecatedAlias: "NumberLiteral",
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("number")
      }
    },
    aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
  }), (0, _utils.default)("NullLiteral", {
    aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
  }), (0, _utils.default)("BooleanLiteral", {
    builder: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("boolean")
      }
    },
    aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
  }), (0, _utils.default)("RegExpLiteral", {
    builder: [ "pattern", "flags" ],
    deprecatedAlias: "RegexLiteral",
    aliases: [ "Expression", "Pureish", "Literal" ],
    fields: {
      pattern: {
        validate: (0, _utils.assertValueType)("string")
      },
      flags: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign((function(node, key, val) {
          if (!process.env.BABEL_TYPES_8_BREAKING) return;
          const invalid = /[^gimsuy]/.exec(val);
          if (invalid) throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
        }), {
          type: "string"
        })),
        default: ""
      }
    }
  }), (0, _utils.default)("LogicalExpression", {
    builder: [ "operator", "left", "right" ],
    visitor: [ "left", "right" ],
    aliases: [ "Binary", "Expression" ],
    fields: {
      operator: {
        validate: (0, _utils.assertOneOf)(..._constants.LOGICAL_OPERATORS)
      },
      left: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      right: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("MemberExpression", {
    builder: [ "object", "property", "computed", "optional" ],
    visitor: [ "object", "property" ],
    aliases: [ "Expression", "LVal" ],
    fields: Object.assign({
      object: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      property: {
        validate: function() {
          const normal = (0, _utils.assertNodeType)("Identifier", "PrivateName"), computed = (0, 
          _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
            (node.computed ? computed : normal)(node, key, val);
          };
          return validator.oneOfNodeTypes = [ "Expression", "Identifier", "PrivateName" ], 
          validator;
        }()
      },
      computed: {
        default: !1
      }
    }, process.env.BABEL_TYPES_8_BREAKING ? {} : {
      optional: {
        validate: (0, _utils.assertOneOf)(!0, !1),
        optional: !0
      }
    })
  }), (0, _utils.default)("NewExpression", {
    inherits: "CallExpression"
  }), (0, _utils.default)("Program", {
    visitor: [ "directives", "body" ],
    builder: [ "body", "directives", "sourceType", "interpreter" ],
    fields: {
      sourceFile: {
        validate: (0, _utils.assertValueType)("string")
      },
      sourceType: {
        validate: (0, _utils.assertOneOf)("script", "module"),
        default: "script"
      },
      interpreter: {
        validate: (0, _utils.assertNodeType)("InterpreterDirective"),
        default: null,
        optional: !0
      },
      directives: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Directive"))),
        default: []
      },
      body: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Statement")))
      }
    },
    aliases: [ "Scopable", "BlockParent", "Block" ]
  }), (0, _utils.default)("ObjectExpression", {
    visitor: [ "properties" ],
    aliases: [ "Expression" ],
    fields: {
      properties: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadElement")))
      }
    }
  }), (0, _utils.default)("ObjectMethod", {
    builder: [ "kind", "key", "params", "body", "computed", "generator", "async" ],
    fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
      kind: Object.assign({
        validate: (0, _utils.assertOneOf)("method", "get", "set")
      }, process.env.BABEL_TYPES_8_BREAKING ? {} : {
        default: "method"
      }),
      computed: {
        default: !1
      },
      key: {
        validate: function() {
          const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral"), computed = (0, 
          _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
            (node.computed ? computed : normal)(node, key, val);
          };
          return validator.oneOfNodeTypes = [ "Expression", "Identifier", "StringLiteral", "NumericLiteral" ], 
          validator;
        }()
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      },
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    }),
    visitor: [ "key", "params", "body", "decorators", "returnType", "typeParameters" ],
    aliases: [ "UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember" ]
  }), (0, _utils.default)("ObjectProperty", {
    builder: [ "key", "value", "computed", "shorthand", ...process.env.BABEL_TYPES_8_BREAKING ? [] : [ "decorators" ] ],
    fields: {
      computed: {
        default: !1
      },
      key: {
        validate: function() {
          const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral"), computed = (0, 
          _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
            (node.computed ? computed : normal)(node, key, val);
          };
          return validator.oneOfNodeTypes = [ "Expression", "Identifier", "StringLiteral", "NumericLiteral" ], 
          validator;
        }()
      },
      value: {
        validate: (0, _utils.assertNodeType)("Expression", "PatternLike")
      },
      shorthand: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign((function(node, key, val) {
          if (process.env.BABEL_TYPES_8_BREAKING && val && node.computed) throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
        }), {
          type: "boolean"
        }), (function(node, key, val) {
          if (process.env.BABEL_TYPES_8_BREAKING && val && !(0, _is.default)("Identifier", node.key)) throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
        })),
        default: !1
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      }
    },
    visitor: [ "key", "value", "decorators" ],
    aliases: [ "UserWhitespacable", "Property", "ObjectMember" ],
    validate: function() {
      const pattern = (0, _utils.assertNodeType)("Identifier", "Pattern"), expression = (0, 
      _utils.assertNodeType)("Expression");
      return function(parent, key, node) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        ((0, _is.default)("ObjectPattern", parent) ? pattern : expression)(node, "value", node.value);
      };
    }()
  }), (0, _utils.default)("RestElement", {
    visitor: [ "argument", "typeAnnotation" ],
    builder: [ "argument" ],
    aliases: [ "LVal", "PatternLike" ],
    deprecatedAlias: "RestProperty",
    fields: Object.assign({}, patternLikeCommon, {
      argument: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Identifier", "Pattern", "MemberExpression") : (0, 
        _utils.assertNodeType)("LVal")
      }
    }),
    validate(parent, key) {
      if (!process.env.BABEL_TYPES_8_BREAKING) return;
      const match = /(\w+)\[(\d+)\]/.exec(key);
      if (!match) throw new Error("Internal Babel error: malformed key.");
      const [, listKey, index] = match;
      if (parent[listKey].length > index + 1) throw new TypeError("RestElement must be last element of " + listKey);
    }
  }), (0, _utils.default)("ReturnStatement", {
    visitor: [ "argument" ],
    aliases: [ "Statement", "Terminatorless", "CompletionStatement" ],
    fields: {
      argument: {
        validate: (0, _utils.assertNodeType)("Expression"),
        optional: !0
      }
    }
  }), (0, _utils.default)("SequenceExpression", {
    visitor: [ "expressions" ],
    fields: {
      expressions: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Expression")))
      }
    },
    aliases: [ "Expression" ]
  }), (0, _utils.default)("ParenthesizedExpression", {
    visitor: [ "expression" ],
    aliases: [ "Expression", "ExpressionWrapper" ],
    fields: {
      expression: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("SwitchCase", {
    visitor: [ "test", "consequent" ],
    fields: {
      test: {
        validate: (0, _utils.assertNodeType)("Expression"),
        optional: !0
      },
      consequent: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Statement")))
      }
    }
  }), (0, _utils.default)("SwitchStatement", {
    visitor: [ "discriminant", "cases" ],
    aliases: [ "Statement", "BlockParent", "Scopable" ],
    fields: {
      discriminant: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      cases: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("SwitchCase")))
      }
    }
  }), (0, _utils.default)("ThisExpression", {
    aliases: [ "Expression" ]
  }), (0, _utils.default)("ThrowStatement", {
    visitor: [ "argument" ],
    aliases: [ "Statement", "Terminatorless", "CompletionStatement" ],
    fields: {
      argument: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("TryStatement", {
    visitor: [ "block", "handler", "finalizer" ],
    aliases: [ "Statement" ],
    fields: {
      block: {
        validate: (0, _utils.chain)((0, _utils.assertNodeType)("BlockStatement"), Object.assign((function(node) {
          if (process.env.BABEL_TYPES_8_BREAKING && !node.handler && !node.finalizer) throw new TypeError("TryStatement expects either a handler or finalizer, or both");
        }), {
          oneOfNodeTypes: [ "BlockStatement" ]
        }))
      },
      handler: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("CatchClause")
      },
      finalizer: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    }
  }), (0, _utils.default)("UnaryExpression", {
    builder: [ "operator", "argument", "prefix" ],
    fields: {
      prefix: {
        default: !0
      },
      argument: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      operator: {
        validate: (0, _utils.assertOneOf)(..._constants.UNARY_OPERATORS)
      }
    },
    visitor: [ "argument" ],
    aliases: [ "UnaryLike", "Expression" ]
  }), (0, _utils.default)("UpdateExpression", {
    builder: [ "operator", "argument", "prefix" ],
    fields: {
      prefix: {
        default: !1
      },
      argument: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Identifier", "MemberExpression") : (0, 
        _utils.assertNodeType)("Expression")
      },
      operator: {
        validate: (0, _utils.assertOneOf)(..._constants.UPDATE_OPERATORS)
      }
    },
    visitor: [ "argument" ],
    aliases: [ "Expression" ]
  }), (0, _utils.default)("VariableDeclaration", {
    builder: [ "kind", "declarations" ],
    visitor: [ "declarations" ],
    aliases: [ "Statement", "Declaration" ],
    fields: {
      declare: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      },
      kind: {
        validate: (0, _utils.assertOneOf)("var", "let", "const")
      },
      declarations: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("VariableDeclarator")))
      }
    },
    validate(parent, key, node) {
      if (process.env.BABEL_TYPES_8_BREAKING && (0, _is.default)("ForXStatement", parent, {
        left: node
      }) && 1 !== node.declarations.length) throw new TypeError("Exactly one VariableDeclarator is required in the VariableDeclaration of a " + parent.type);
    }
  }), (0, _utils.default)("VariableDeclarator", {
    visitor: [ "id", "init" ],
    fields: {
      id: {
        validate: function() {
          if (!process.env.BABEL_TYPES_8_BREAKING) return (0, _utils.assertNodeType)("LVal");
          const normal = (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"), without = (0, 
          _utils.assertNodeType)("Identifier");
          return function(node, key, val) {
            (node.init ? normal : without)(node, key, val);
          };
        }()
      },
      definite: {
        optional: !0,
        validate: (0, _utils.assertValueType)("boolean")
      },
      init: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("WhileStatement", {
    visitor: [ "test", "body" ],
    aliases: [ "Statement", "BlockParent", "Loop", "While", "Scopable" ],
    fields: {
      test: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      }
    }
  }), (0, _utils.default)("WithStatement", {
    visitor: [ "object", "body" ],
    aliases: [ "Statement" ],
    fields: {
      object: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      }
    }
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = getBindingIdentifiers;
  var _generated = __webpack_require__(4);
  function getBindingIdentifiers(node, duplicates, outerOnly) {
    let search = [].concat(node);
    const ids = Object.create(null);
    for (;search.length; ) {
      const id = search.shift();
      if (!id) continue;
      const keys = getBindingIdentifiers.keys[id.type];
      if ((0, _generated.isIdentifier)(id)) if (duplicates) {
        (ids[id.name] = ids[id.name] || []).push(id);
      } else ids[id.name] = id; else if ((0, _generated.isExportDeclaration)(id)) (0, 
      _generated.isDeclaration)(id.declaration) && search.push(id.declaration); else {
        if (outerOnly) {
          if ((0, _generated.isFunctionDeclaration)(id)) {
            search.push(id.id);
            continue;
          }
          if ((0, _generated.isFunctionExpression)(id)) continue;
        }
        if (keys) for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          id[key] && (search = search.concat(id[key]));
        }
      }
    }
    return ids;
  }
  getBindingIdentifiers.keys = {
    DeclareClass: [ "id" ],
    DeclareFunction: [ "id" ],
    DeclareModule: [ "id" ],
    DeclareVariable: [ "id" ],
    DeclareInterface: [ "id" ],
    DeclareTypeAlias: [ "id" ],
    DeclareOpaqueType: [ "id" ],
    InterfaceDeclaration: [ "id" ],
    TypeAlias: [ "id" ],
    OpaqueType: [ "id" ],
    CatchClause: [ "param" ],
    LabeledStatement: [ "label" ],
    UnaryExpression: [ "argument" ],
    AssignmentExpression: [ "left" ],
    ImportSpecifier: [ "local" ],
    ImportNamespaceSpecifier: [ "local" ],
    ImportDefaultSpecifier: [ "local" ],
    ImportDeclaration: [ "specifiers" ],
    ExportSpecifier: [ "exported" ],
    ExportNamespaceSpecifier: [ "exported" ],
    ExportDefaultSpecifier: [ "exported" ],
    FunctionDeclaration: [ "id", "params" ],
    FunctionExpression: [ "id", "params" ],
    ArrowFunctionExpression: [ "params" ],
    ObjectMethod: [ "params" ],
    ClassMethod: [ "params" ],
    ForInStatement: [ "left" ],
    ForOfStatement: [ "left" ],
    ClassDeclaration: [ "id" ],
    ClassExpression: [ "id" ],
    RestElement: [ "argument" ],
    UpdateExpression: [ "argument" ],
    ObjectProperty: [ "value" ],
    AssignmentPattern: [ "left" ],
    ArrayPattern: [ "elements" ],
    ObjectPattern: [ "properties" ],
    VariableDeclaration: [ "declarations" ],
    VariableDeclarator: [ "id" ]
  };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  var Hash = __webpack_require__(154), ListCache = __webpack_require__(21), Map = __webpack_require__(39);
  module.exports = function() {
    this.size = 0, this.__data__ = {
      hash: new Hash,
      map: new (Map || ListCache),
      string: new Hash
    };
  };
}, function(module, exports, __webpack_require__) {
  var hashClear = __webpack_require__(155), hashDelete = __webpack_require__(156), hashGet = __webpack_require__(157), hashHas = __webpack_require__(158), hashSet = __webpack_require__(159);
  function Hash(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    for (this.clear(); ++index < length; ) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, 
  Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, module.exports = Hash;
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20);
  module.exports = function() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
  };
}, function(module, exports) {
  module.exports = function(key) {
    var result = this.has(key) && delete this.__data__[key];
    return this.size -= result ? 1 : 0, result;
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return "__lodash_hash_undefined__" === result ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(key) {
    var data = this.__data__;
    return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key);
  };
}, function(module, exports, __webpack_require__) {
  var nativeCreate = __webpack_require__(20);
  module.exports = function(key, value) {
    var data = this.__data__;
    return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && void 0 === value ? "__lodash_hash_undefined__" : value, 
    this;
  };
}, function(module, exports) {
  module.exports = function() {
    this.__data__ = [], this.size = 0;
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22), splice = Array.prototype.splice;
  module.exports = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return !(index < 0) && (index == data.length - 1 ? data.pop() : splice.call(data, index, 1), 
    --this.size, !0);
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22);
  module.exports = function(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22);
  module.exports = function(key) {
    return assocIndexOf(this.__data__, key) > -1;
  };
}, function(module, exports, __webpack_require__) {
  var assocIndexOf = __webpack_require__(22);
  module.exports = function(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? (++this.size, data.push([ key, value ])) : data[index][1] = value, 
    this;
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key) {
    var result = getMapData(this, key).delete(key);
    return this.size -= result ? 1 : 0, result;
  };
}, function(module, exports) {
  module.exports = function(value) {
    var type = typeof value;
    return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value;
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key) {
    return getMapData(this, key).get(key);
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key) {
    return getMapData(this, key).has(key);
  };
}, function(module, exports, __webpack_require__) {
  var getMapData = __webpack_require__(23);
  module.exports = function(key, value) {
    var data = getMapData(this, key), size = data.size;
    return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
  };
}, function(module, exports, __webpack_require__) {
  var ListCache = __webpack_require__(21);
  module.exports = function() {
    this.__data__ = new ListCache, this.size = 0;
  };
}, function(module, exports) {
  module.exports = function(key) {
    var data = this.__data__, result = data.delete(key);
    return this.size = data.size, result;
  };
}, function(module, exports) {
  module.exports = function(key) {
    return this.__data__.get(key);
  };
}, function(module, exports) {
  module.exports = function(key) {
    return this.__data__.has(key);
  };
}, function(module, exports, __webpack_require__) {
  var ListCache = __webpack_require__(21), Map = __webpack_require__(39), MapCache = __webpack_require__(73);
  module.exports = function(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || pairs.length < 199) return pairs.push([ key, value ]), this.size = ++data.size, 
      this;
      data = this.__data__ = new MapCache(pairs);
    }
    return data.set(key, value), this.size = data.size, this;
  };
}, function(module, exports) {
  module.exports = function(array, predicate) {
    for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
      var value = array[index];
      predicate(value, index, array) && (result[resIndex++] = value);
    }
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var isPrototype = __webpack_require__(25), nativeKeys = __webpack_require__(177), hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(object) {
    if (!isPrototype(object)) return nativeKeys(object);
    var result = [];
    for (var key in Object(object)) hasOwnProperty.call(object, key) && "constructor" != key && result.push(key);
    return result;
  };
}, function(module, exports, __webpack_require__) {
  var nativeKeys = __webpack_require__(84)(Object.keys, Object);
  module.exports = nativeKeys;
}, function(module, exports, __webpack_require__) {
  var DataView = __webpack_require__(6)(__webpack_require__(1), "DataView");
  module.exports = DataView;
}, function(module, exports, __webpack_require__) {
  var Promise = __webpack_require__(6)(__webpack_require__(1), "Promise");
  module.exports = Promise;
}, function(module, exports, __webpack_require__) {
  var Set = __webpack_require__(6)(__webpack_require__(1), "Set");
  module.exports = Set;
}, function(module, exports, __webpack_require__) {
  var WeakMap = __webpack_require__(6)(__webpack_require__(1), "WeakMap");
  module.exports = WeakMap;
}, , , , , , , , function(module, exports, __webpack_require__) {
  var Stack = __webpack_require__(78), arrayEach = __webpack_require__(190), assignValue = __webpack_require__(85), baseAssign = __webpack_require__(191), baseAssignIn = __webpack_require__(192), cloneBuffer = __webpack_require__(193), copyArray = __webpack_require__(194), copySymbols = __webpack_require__(195), copySymbolsIn = __webpack_require__(196), getAllKeys = __webpack_require__(101), getAllKeysIn = __webpack_require__(197), getTag = __webpack_require__(33), initCloneArray = __webpack_require__(198), initCloneByTag = __webpack_require__(199), initCloneObject = __webpack_require__(204), isArray = __webpack_require__(5), isBuffer = __webpack_require__(32), isMap = __webpack_require__(206), isObject = __webpack_require__(2), isSet = __webpack_require__(208), keys = __webpack_require__(24), keysIn = __webpack_require__(27), cloneableTags = {};
  cloneableTags["[object Arguments]"] = cloneableTags["[object Array]"] = cloneableTags["[object ArrayBuffer]"] = cloneableTags["[object DataView]"] = cloneableTags["[object Boolean]"] = cloneableTags["[object Date]"] = cloneableTags["[object Float32Array]"] = cloneableTags["[object Float64Array]"] = cloneableTags["[object Int8Array]"] = cloneableTags["[object Int16Array]"] = cloneableTags["[object Int32Array]"] = cloneableTags["[object Map]"] = cloneableTags["[object Number]"] = cloneableTags["[object Object]"] = cloneableTags["[object RegExp]"] = cloneableTags["[object Set]"] = cloneableTags["[object String]"] = cloneableTags["[object Symbol]"] = cloneableTags["[object Uint8Array]"] = cloneableTags["[object Uint8ClampedArray]"] = cloneableTags["[object Uint16Array]"] = cloneableTags["[object Uint32Array]"] = !0, 
  cloneableTags["[object Error]"] = cloneableTags["[object Function]"] = cloneableTags["[object WeakMap]"] = !1, 
  module.exports = function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = 1 & bitmask, isFlat = 2 & bitmask, isFull = 4 & bitmask;
    if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), 
    void 0 !== result) return result;
    if (!isObject(value)) return value;
    var isArr = isArray(value);
    if (isArr) {
      if (result = initCloneArray(value), !isDeep) return copyArray(value, result);
    } else {
      var tag = getTag(value), isFunc = "[object Function]" == tag || "[object GeneratorFunction]" == tag;
      if (isBuffer(value)) return cloneBuffer(value, isDeep);
      if ("[object Object]" == tag || "[object Arguments]" == tag || isFunc && !object) {
        if (result = isFlat || isFunc ? {} : initCloneObject(value), !isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      } else {
        if (!cloneableTags[tag]) return object ? value : {};
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack);
    var stacked = stack.get(value);
    if (stacked) return stacked;
    stack.set(value, result), isSet(value) ? value.forEach((function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    })) : isMap(value) && value.forEach((function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    }));
    var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
    return arrayEach(props || value, (function(subValue, key) {
      props && (subValue = value[key = subValue]), assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    })), result;
  };
}, function(module, exports) {
  module.exports = function(array, iteratee) {
    for (var index = -1, length = null == array ? 0 : array.length; ++index < length && !1 !== iteratee(array[index], index, array); ) ;
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), keys = __webpack_require__(24);
  module.exports = function(object, source) {
    return object && copyObject(source, keys(source), object);
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), keysIn = __webpack_require__(27);
  module.exports = function(object, source) {
    return object && copyObject(source, keysIn(source), object);
  };
}, function(module, exports, __webpack_require__) {
  (function(module) {
    var root = __webpack_require__(1), freeExports = exports && !exports.nodeType && exports, freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module, Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    module.exports = function(buffer, isDeep) {
      if (isDeep) return buffer.slice();
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      return buffer.copy(result), result;
    };
  }).call(this, __webpack_require__(17)(module));
}, function(module, exports) {
  module.exports = function(source, array) {
    var index = -1, length = source.length;
    for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
    return array;
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), getSymbols = __webpack_require__(40);
  module.exports = function(source, object) {
    return copyObject(source, getSymbols(source), object);
  };
}, function(module, exports, __webpack_require__) {
  var copyObject = __webpack_require__(26), getSymbolsIn = __webpack_require__(89);
  module.exports = function(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
  };
}, function(module, exports, __webpack_require__) {
  var baseGetAllKeys = __webpack_require__(79), getSymbolsIn = __webpack_require__(89), keysIn = __webpack_require__(27);
  module.exports = function(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  };
}, function(module, exports) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  module.exports = function(array) {
    var length = array.length, result = new array.constructor(length);
    return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, 
    result.input = array.input), result;
  };
}, function(module, exports, __webpack_require__) {
  var cloneArrayBuffer = __webpack_require__(43), cloneDataView = __webpack_require__(200), cloneRegExp = __webpack_require__(201), cloneSymbol = __webpack_require__(202), cloneTypedArray = __webpack_require__(203);
  module.exports = function(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
     case "[object ArrayBuffer]":
      return cloneArrayBuffer(object);

     case "[object Boolean]":
     case "[object Date]":
      return new Ctor(+object);

     case "[object DataView]":
      return cloneDataView(object, isDeep);

     case "[object Float32Array]":
     case "[object Float64Array]":
     case "[object Int8Array]":
     case "[object Int16Array]":
     case "[object Int32Array]":
     case "[object Uint8Array]":
     case "[object Uint8ClampedArray]":
     case "[object Uint16Array]":
     case "[object Uint32Array]":
      return cloneTypedArray(object, isDeep);

     case "[object Map]":
      return new Ctor;

     case "[object Number]":
     case "[object String]":
      return new Ctor(object);

     case "[object RegExp]":
      return cloneRegExp(object);

     case "[object Set]":
      return new Ctor;

     case "[object Symbol]":
      return cloneSymbol(object);
    }
  };
}, function(module, exports, __webpack_require__) {
  var cloneArrayBuffer = __webpack_require__(43);
  module.exports = function(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  };
}, function(module, exports) {
  var reFlags = /\w*$/;
  module.exports = function(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    return result.lastIndex = regexp.lastIndex, result;
  };
}, function(module, exports, __webpack_require__) {
  var Symbol = __webpack_require__(9), symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  module.exports = function(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  };
}, function(module, exports, __webpack_require__) {
  var cloneArrayBuffer = __webpack_require__(43);
  module.exports = function(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  };
}, function(module, exports, __webpack_require__) {
  var baseCreate = __webpack_require__(205), getPrototype = __webpack_require__(57), isPrototype = __webpack_require__(25);
  module.exports = function(object) {
    return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object));
  };
}, function(module, exports, __webpack_require__) {
  var isObject = __webpack_require__(2), objectCreate = Object.create, baseCreate = function() {
    function object() {}
    return function(proto) {
      if (!isObject(proto)) return {};
      if (objectCreate) return objectCreate(proto);
      object.prototype = proto;
      var result = new object;
      return object.prototype = void 0, result;
    };
  }();
  module.exports = baseCreate;
}, function(module, exports, __webpack_require__) {
  var baseIsMap = __webpack_require__(207), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsMap = nodeUtil && nodeUtil.isMap, isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
  module.exports = isMap;
}, function(module, exports, __webpack_require__) {
  var getTag = __webpack_require__(33), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object Map]" == getTag(value);
  };
}, function(module, exports, __webpack_require__) {
  var baseIsSet = __webpack_require__(209), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsSet = nodeUtil && nodeUtil.isSet, isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
  module.exports = isSet;
}, function(module, exports, __webpack_require__) {
  var getTag = __webpack_require__(33), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object Set]" == getTag(value);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(actual, expected) {
    const keys = Object.keys(expected);
    for (const key of keys) if (actual[key] !== expected[key]) return !1;
    return !0;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(nodeType, targetType) {
    if (nodeType === targetType) return !0;
    if (_definitions.ALIAS_KEYS[targetType]) return !1;
    const aliases = _definitions.FLIPPED_ALIAS_KEYS[targetType];
    if (aliases) {
      if (aliases[0] === nodeType) return !0;
      for (const alias of aliases) if (nodeType === alias) return !0;
    }
    return !1;
  };
  var _definitions = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, key, val) {
    if (!node) return;
    const fields = _definitions.NODE_FIELDS[node.type];
    if (!fields) return;
    const field = fields[key];
    validateField(node, key, val, field), validateChild(node, key, val);
  }, exports.validateField = validateField, exports.validateChild = validateChild;
  var _definitions = __webpack_require__(12);
  function validateField(node, key, val, field) {
    (null == field ? void 0 : field.validate) && (field.optional && null == val || field.validate(node, key, val));
  }
  function validateChild(node, key, val) {
    if (null == val) return;
    const validate = _definitions.NODE_PARENT_VALIDATIONS[val.type];
    validate && validate(node, key, val);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.classMethodOrDeclareMethodCommon = exports.classMethodOrPropertyCommon = void 0;
  var obj, _utils = function(obj) {
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
  }(__webpack_require__(28)), _core = __webpack_require__(102), _is = (obj = __webpack_require__(90)) && obj.__esModule ? obj : {
    default: obj
  };
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  (0, _utils.default)("AssignmentPattern", {
    visitor: [ "left", "right", "decorators" ],
    builder: [ "left", "right" ],
    aliases: [ "Pattern", "PatternLike", "LVal" ],
    fields: Object.assign({}, _core.patternLikeCommon, {
      left: {
        validate: (0, _utils.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression")
      },
      right: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      }
    })
  }), (0, _utils.default)("ArrayPattern", {
    visitor: [ "elements", "typeAnnotation" ],
    builder: [ "elements" ],
    aliases: [ "Pattern", "PatternLike", "LVal" ],
    fields: Object.assign({}, _core.patternLikeCommon, {
      elements: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeOrValueType)("null", "PatternLike")))
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      }
    })
  }), (0, _utils.default)("ArrowFunctionExpression", {
    builder: [ "params", "body", "async" ],
    visitor: [ "params", "body", "returnType", "typeParameters" ],
    aliases: [ "Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish" ],
    fields: Object.assign({}, _core.functionCommon, _core.functionTypeAnnotationCommon, {
      expression: {
        validate: (0, _utils.assertValueType)("boolean")
      },
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement", "Expression")
      }
    })
  }), (0, _utils.default)("ClassBody", {
    visitor: [ "body" ],
    fields: {
      body: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "TSDeclareMethod", "TSIndexSignature")))
      }
    }
  }), (0, _utils.default)("ClassExpression", {
    builder: [ "id", "superClass", "body", "decorators" ],
    visitor: [ "id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators" ],
    aliases: [ "Scopable", "Class", "Expression" ],
    fields: {
      id: {
        validate: (0, _utils.assertNodeType)("Identifier"),
        optional: !0
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
        optional: !0
      },
      body: {
        validate: (0, _utils.assertNodeType)("ClassBody")
      },
      superClass: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("Expression")
      },
      superTypeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
        optional: !0
      },
      implements: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
        optional: !0
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      },
      mixins: {
        validate: (0, _utils.assertNodeType)("InterfaceExtends"),
        optional: !0
      }
    }
  }), (0, _utils.default)("ClassDeclaration", {
    inherits: "ClassExpression",
    aliases: [ "Scopable", "Class", "Statement", "Declaration" ],
    fields: {
      id: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
        optional: !0
      },
      body: {
        validate: (0, _utils.assertNodeType)("ClassBody")
      },
      superClass: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("Expression")
      },
      superTypeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
        optional: !0
      },
      implements: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
        optional: !0
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      },
      mixins: {
        validate: (0, _utils.assertNodeType)("InterfaceExtends"),
        optional: !0
      },
      declare: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      },
      abstract: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      }
    },
    validate: function() {
      const identifier = (0, _utils.assertNodeType)("Identifier");
      return function(parent, key, node) {
        process.env.BABEL_TYPES_8_BREAKING && ((0, _is.default)("ExportDefaultDeclaration", parent) || identifier(node, "id", node.id));
      };
    }()
  }), (0, _utils.default)("ExportAllDeclaration", {
    visitor: [ "source" ],
    aliases: [ "Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration" ],
    fields: {
      source: {
        validate: (0, _utils.assertNodeType)("StringLiteral")
      }
    }
  }), (0, _utils.default)("ExportDefaultDeclaration", {
    visitor: [ "declaration" ],
    aliases: [ "Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration" ],
    fields: {
      declaration: {
        validate: (0, _utils.assertNodeType)("FunctionDeclaration", "TSDeclareFunction", "ClassDeclaration", "Expression")
      }
    }
  }), (0, _utils.default)("ExportNamedDeclaration", {
    visitor: [ "declaration", "specifiers", "source" ],
    aliases: [ "Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration" ],
    fields: {
      declaration: {
        optional: !0,
        validate: (0, _utils.chain)((0, _utils.assertNodeType)("Declaration"), Object.assign((function(node, key, val) {
          if (process.env.BABEL_TYPES_8_BREAKING && val && node.specifiers.length) throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
        }), {
          oneOfNodeTypes: [ "Declaration" ]
        }), (function(node, key, val) {
          if (process.env.BABEL_TYPES_8_BREAKING && val && node.source) throw new TypeError("Cannot export a declaration from a source");
        }))
      },
      specifiers: {
        default: [],
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)(function() {
          const sourced = (0, _utils.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier"), sourceless = (0, 
          _utils.assertNodeType)("ExportSpecifier");
          return process.env.BABEL_TYPES_8_BREAKING ? function(node, key, val) {
            (node.source ? sourced : sourceless)(node, key, val);
          } : sourced;
        }()))
      },
      source: {
        validate: (0, _utils.assertNodeType)("StringLiteral"),
        optional: !0
      },
      exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
    }
  }), (0, _utils.default)("ExportSpecifier", {
    visitor: [ "local", "exported" ],
    aliases: [ "ModuleSpecifier" ],
    fields: {
      local: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      exported: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  }), (0, _utils.default)("ForOfStatement", {
    visitor: [ "left", "right", "body" ],
    builder: [ "left", "right", "body", "await" ],
    aliases: [ "Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement" ],
    fields: {
      left: {
        validate: function() {
          if (!process.env.BABEL_TYPES_8_BREAKING) return (0, _utils.assertNodeType)("VariableDeclaration", "LVal");
          const declaration = (0, _utils.assertNodeType)("VariableDeclaration"), lval = (0, 
          _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern");
          return function(node, key, val) {
            (0, _is.default)("VariableDeclaration", val) ? declaration(node, key, val) : lval(node, key, val);
          };
        }()
      },
      right: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      body: {
        validate: (0, _utils.assertNodeType)("Statement")
      },
      await: {
        default: !1
      }
    }
  }), (0, _utils.default)("ImportDeclaration", {
    visitor: [ "specifiers", "source" ],
    aliases: [ "Statement", "Declaration", "ModuleDeclaration" ],
    fields: {
      specifiers: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
      },
      source: {
        validate: (0, _utils.assertNodeType)("StringLiteral")
      },
      importKind: {
        validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
        optional: !0
      }
    }
  }), (0, _utils.default)("ImportDefaultSpecifier", {
    visitor: [ "local" ],
    aliases: [ "ModuleSpecifier" ],
    fields: {
      local: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  }), (0, _utils.default)("ImportNamespaceSpecifier", {
    visitor: [ "local" ],
    aliases: [ "ModuleSpecifier" ],
    fields: {
      local: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  }), (0, _utils.default)("ImportSpecifier", {
    visitor: [ "local", "imported" ],
    aliases: [ "ModuleSpecifier" ],
    fields: {
      local: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      imported: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      importKind: {
        validate: (0, _utils.assertOneOf)("type", "typeof"),
        optional: !0
      }
    }
  }), (0, _utils.default)("MetaProperty", {
    visitor: [ "meta", "property" ],
    aliases: [ "Expression" ],
    fields: {
      meta: {
        validate: (0, _utils.chain)((0, _utils.assertNodeType)("Identifier"), Object.assign((function(node, key, val) {
          if (!process.env.BABEL_TYPES_8_BREAKING) return;
          let property;
          switch (val.name) {
           case "function":
            property = "sent";
            break;

           case "new":
            property = "target";
            break;

           case "import":
            property = "meta";
          }
          if (!(0, _is.default)("Identifier", node.property, {
            name: property
          })) throw new TypeError("Unrecognised MetaProperty");
        }), {
          oneOfNodeTypes: [ "Identifier" ]
        }))
      },
      property: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  });
  const classMethodOrPropertyCommon = {
    abstract: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: !0
    },
    accessibility: {
      validate: (0, _utils.assertOneOf)("public", "private", "protected"),
      optional: !0
    },
    static: {
      default: !1
    },
    computed: {
      default: !1
    },
    optional: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: !0
    },
    key: {
      validate: (0, _utils.chain)(function() {
        const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral"), computed = (0, 
        _utils.assertNodeType)("Expression");
        return function(node, key, val) {
          (node.computed ? computed : normal)(node, key, val);
        };
      }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "Expression"))
    }
  };
  exports.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
  const classMethodOrDeclareMethodCommon = Object.assign({}, _core.functionCommon, classMethodOrPropertyCommon, {
    kind: {
      validate: (0, _utils.assertOneOf)("get", "set", "method", "constructor"),
      default: "method"
    },
    access: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), (0, _utils.assertOneOf)("public", "private", "protected")),
      optional: !0
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
      _utils.assertNodeType)("Decorator"))),
      optional: !0
    }
  });
  exports.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon, (0, 
  _utils.default)("ClassMethod", {
    aliases: [ "Function", "Scopable", "BlockParent", "FunctionParent", "Method" ],
    builder: [ "kind", "key", "params", "body", "computed", "static", "generator", "async" ],
    visitor: [ "key", "params", "body", "decorators", "returnType", "typeParameters" ],
    fields: Object.assign({}, classMethodOrDeclareMethodCommon, _core.functionTypeAnnotationCommon, {
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    })
  }), (0, _utils.default)("ObjectPattern", {
    visitor: [ "properties", "typeAnnotation", "decorators" ],
    builder: [ "properties" ],
    aliases: [ "Pattern", "PatternLike", "LVal" ],
    fields: Object.assign({}, _core.patternLikeCommon, {
      properties: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("RestElement", "ObjectProperty")))
      }
    })
  }), (0, _utils.default)("SpreadElement", {
    visitor: [ "argument" ],
    aliases: [ "UnaryLike" ],
    deprecatedAlias: "SpreadProperty",
    fields: {
      argument: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("Super", {
    aliases: [ "Expression" ]
  }), (0, _utils.default)("TaggedTemplateExpression", {
    visitor: [ "tag", "quasi" ],
    aliases: [ "Expression" ],
    fields: {
      tag: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      quasi: {
        validate: (0, _utils.assertNodeType)("TemplateLiteral")
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
        optional: !0
      }
    }
  }), (0, _utils.default)("TemplateElement", {
    builder: [ "value", "tail" ],
    fields: {
      value: {
        validate: (0, _utils.assertShape)({
          raw: {
            validate: (0, _utils.assertValueType)("string")
          },
          cooked: {
            validate: (0, _utils.assertValueType)("string"),
            optional: !0
          }
        })
      },
      tail: {
        default: !1
      }
    }
  }), (0, _utils.default)("TemplateLiteral", {
    visitor: [ "quasis", "expressions" ],
    aliases: [ "Expression", "Literal" ],
    fields: {
      quasis: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("TemplateElement")))
      },
      expressions: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Expression")), (function(node, key, val) {
          if (node.quasis.length !== val.length + 1) throw new TypeError(`Number of ${node.type} quasis should be exactly one more than the number of expressions.\nExpected ${val.length + 1} quasis but got ${node.quasis.length}`);
        }))
      }
    }
  }), (0, _utils.default)("YieldExpression", {
    builder: [ "argument", "delegate" ],
    visitor: [ "argument" ],
    aliases: [ "Expression", "Terminatorless" ],
    fields: {
      delegate: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign((function(node, key, val) {
          if (process.env.BABEL_TYPES_8_BREAKING && val && !node.argument) throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
        }), {
          type: "boolean"
        })),
        default: !1
      },
      argument: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(key, child, parent) {
    child && parent && (child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean))));
  };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(match, allowPartial) {
    const parts = match.split(".");
    return member => (0, _matchesPattern.default)(member, parts, allowPartial);
  };
  var obj, _matchesPattern = (obj = __webpack_require__(242)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(member, match, allowPartial) {
    if (!(0, _generated.isMemberExpression)(member)) return !1;
    const parts = Array.isArray(match) ? match : match.split("."), nodes = [];
    let node;
    for (node = member; (0, _generated.isMemberExpression)(node); node = node.object) nodes.push(node.property);
    if (nodes.push(node), nodes.length < parts.length) return !1;
    if (!allowPartial && nodes.length > parts.length) return !1;
    for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
      const node = nodes[j];
      let value;
      if ((0, _generated.isIdentifier)(node)) value = node.name; else {
        if (!(0, _generated.isStringLiteral)(node)) return !1;
        value = node.value;
      }
      if (parts[i] !== value) return !1;
    }
    return !0;
  };
  var _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(placeholderType, targetType) {
    if (placeholderType === targetType) return !0;
    const aliases = _definitions.PLACEHOLDERS_ALIAS[placeholderType];
    if (aliases) for (const alias of aliases) if (targetType === alias) return !0;
    return !1;
  };
  var _definitions = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.PLACEHOLDERS_FLIPPED_ALIAS = exports.PLACEHOLDERS_ALIAS = exports.PLACEHOLDERS = void 0;
  var _utils = __webpack_require__(28);
  const PLACEHOLDERS = [ "Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern" ];
  exports.PLACEHOLDERS = PLACEHOLDERS;
  const PLACEHOLDERS_ALIAS = {
    Declaration: [ "Statement" ],
    Pattern: [ "PatternLike", "LVal" ]
  };
  exports.PLACEHOLDERS_ALIAS = PLACEHOLDERS_ALIAS;
  for (const type of PLACEHOLDERS) {
    const alias = _utils.ALIAS_KEYS[type];
    (null == alias ? void 0 : alias.length) && (PLACEHOLDERS_ALIAS[type] = alias);
  }
  const PLACEHOLDERS_FLIPPED_ALIAS = {};
  exports.PLACEHOLDERS_FLIPPED_ALIAS = PLACEHOLDERS_FLIPPED_ALIAS, Object.keys(PLACEHOLDERS_ALIAS).forEach(type => {
    PLACEHOLDERS_ALIAS[type].forEach(alias => {
      Object.hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias) || (PLACEHOLDERS_FLIPPED_ALIAS[alias] = []), 
      PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
    });
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return !(!node || !_definitions.VISITOR_KEYS[node.type]);
  };
  var _definitions = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function removeTypeDuplicates(nodes) {
    const generics = {}, bases = {}, typeGroups = [], types = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node && !(types.indexOf(node) >= 0)) {
        if ((0, _generated.isAnyTypeAnnotation)(node)) return [ node ];
        if ((0, _generated.isFlowBaseAnnotation)(node)) bases[node.type] = node; else if ((0, 
        _generated.isUnionTypeAnnotation)(node)) typeGroups.indexOf(node.types) < 0 && (nodes = nodes.concat(node.types), 
        typeGroups.push(node.types)); else if ((0, _generated.isGenericTypeAnnotation)(node)) {
          const name = node.id.name;
          if (generics[name]) {
            let existing = generics[name];
            existing.typeParameters ? node.typeParameters && (existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params))) : existing = node.typeParameters;
          } else generics[name] = node;
        } else types.push(node);
      }
    }
    for (const type of Object.keys(bases)) types.push(bases[type]);
    for (const name of Object.keys(generics)) types.push(generics[name]);
    return types;
  };
  var _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, type, comments) {
    if (!comments || !node) return node;
    const key = type + "Comments";
    node[key] ? node[key] = "leading" === type ? comments.concat(node[key]) : node[key].concat(comments) : node[key] = comments;
    return node;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(child, parent) {
    (0, _inherit.default)("innerComments", child, parent);
  };
  var obj, _inherit = (obj = __webpack_require__(214)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(child, parent) {
    (0, _inherit.default)("leadingComments", child, parent);
  };
  var obj, _inherit = (obj = __webpack_require__(214)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(child, parent) {
    return (0, _inheritTrailingComments.default)(child, parent), (0, _inheritLeadingComments.default)(child, parent), 
    (0, _inheritInnerComments.default)(child, parent), child;
  };
  var _inheritTrailingComments = _interopRequireDefault(__webpack_require__(251)), _inheritLeadingComments = _interopRequireDefault(__webpack_require__(249)), _inheritInnerComments = _interopRequireDefault(__webpack_require__(248));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(child, parent) {
    (0, _inherit.default)("trailingComments", child, parent);
  };
  var obj, _inherit = (obj = __webpack_require__(214)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, parent) {
    if ((0, _generated.isBlockStatement)(node)) return node;
    let blockNodes = [];
    (0, _generated.isEmptyStatement)(node) ? blockNodes = [] : ((0, _generated.isStatement)(node) || (node = (0, 
    _generated.isFunction)(parent) ? (0, _generated2.returnStatement)(node) : (0, _generated2.expressionStatement)(node)), 
    blockNodes = [ node ]);
    return (0, _generated2.blockStatement)(blockNodes);
  };
  var _generated = __webpack_require__(4), _generated2 = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(name) {
    name = (name = (name = (name += "").replace(/[^a-zA-Z0-9$_]/g, "-")).replace(/^[-0-9]+/, "")).replace(/[-\s]+(.)?/g, (function(match, c) {
      return c ? c.toUpperCase() : "";
    })), (0, _isValidIdentifier.default)(name) || (name = "_" + name);
    return name || "_";
  };
  var obj, _isValidIdentifier = (obj = __webpack_require__(91)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(tree, opts) {
    return (0, _traverseFast.default)(tree, _removeProperties.default, opts), tree;
  };
  var _traverseFast = _interopRequireDefault(__webpack_require__(255)), _removeProperties = _interopRequireDefault(__webpack_require__(256));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function traverseFast(node, enter, opts) {
    if (!node) return;
    const keys = _definitions.VISITOR_KEYS[node.type];
    if (!keys) return;
    enter(node, opts = opts || {});
    for (const key of keys) {
      const subNode = node[key];
      if (Array.isArray(subNode)) for (const node of subNode) traverseFast(node, enter, opts); else traverseFast(subNode, enter, opts);
    }
  };
  var _definitions = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, opts = {}) {
    const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
    for (const key of map) null != node[key] && (node[key] = void 0);
    for (const key of Object.keys(node)) "_" === key[0] && null != node[key] && (node[key] = void 0);
    const symbols = Object.getOwnPropertySymbols(node);
    for (const sym of symbols) node[sym] = null;
  };
  var _constants = __webpack_require__(44);
  const CLEAR_KEYS = [ "tokens", "start", "end", "loc", "raw", "rawValue" ], CLEAR_KEYS_PLUS_COMMENTS = _constants.COMMENT_KEYS.concat([ "comments" ]).concat(CLEAR_KEYS);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _generated.isVariableDeclaration)(node) && ("var" !== node.kind || node[_constants.BLOCK_SCOPED_SYMBOL]);
  };
  var _generated = __webpack_require__(4), _constants = __webpack_require__(44);
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var _exportNames = {
    react: !0,
    assertNode: !0,
    createTypeAnnotationBasedOnTypeof: !0,
    createUnionTypeAnnotation: !0,
    createFlowUnionType: !0,
    createTSUnionType: !0,
    cloneNode: !0,
    clone: !0,
    cloneDeep: !0,
    cloneDeepWithoutLoc: !0,
    cloneWithoutLoc: !0,
    addComment: !0,
    addComments: !0,
    inheritInnerComments: !0,
    inheritLeadingComments: !0,
    inheritsComments: !0,
    inheritTrailingComments: !0,
    removeComments: !0,
    ensureBlock: !0,
    toBindingIdentifierName: !0,
    toBlock: !0,
    toComputedKey: !0,
    toExpression: !0,
    toIdentifier: !0,
    toKeyAlias: !0,
    toSequenceExpression: !0,
    toStatement: !0,
    valueToNode: !0,
    appendToMemberExpression: !0,
    inherits: !0,
    prependToMemberExpression: !0,
    removeProperties: !0,
    removePropertiesDeep: !0,
    removeTypeDuplicates: !0,
    getBindingIdentifiers: !0,
    getOuterBindingIdentifiers: !0,
    traverse: !0,
    traverseFast: !0,
    shallowEqual: !0,
    is: !0,
    isBinding: !0,
    isBlockScoped: !0,
    isImmutable: !0,
    isLet: !0,
    isNode: !0,
    isNodesEquivalent: !0,
    isPlaceholderType: !0,
    isReferenced: !0,
    isScope: !0,
    isSpecifierDefault: !0,
    isType: !0,
    isValidES3Identifier: !0,
    isValidIdentifier: !0,
    isVar: !0,
    matchesPattern: !0,
    validate: !0,
    buildMatchMemberExpression: !0
  };
  Object.defineProperty(exports, "assertNode", {
    enumerable: !0,
    get: function() {
      return _assertNode.default;
    }
  }), Object.defineProperty(exports, "createTypeAnnotationBasedOnTypeof", {
    enumerable: !0,
    get: function() {
      return _createTypeAnnotationBasedOnTypeof.default;
    }
  }), Object.defineProperty(exports, "createUnionTypeAnnotation", {
    enumerable: !0,
    get: function() {
      return _createFlowUnionType.default;
    }
  }), Object.defineProperty(exports, "createFlowUnionType", {
    enumerable: !0,
    get: function() {
      return _createFlowUnionType.default;
    }
  }), Object.defineProperty(exports, "createTSUnionType", {
    enumerable: !0,
    get: function() {
      return _createTSUnionType.default;
    }
  }), Object.defineProperty(exports, "cloneNode", {
    enumerable: !0,
    get: function() {
      return _cloneNode.default;
    }
  }), Object.defineProperty(exports, "clone", {
    enumerable: !0,
    get: function() {
      return _clone.default;
    }
  }), Object.defineProperty(exports, "cloneDeep", {
    enumerable: !0,
    get: function() {
      return _cloneDeep.default;
    }
  }), Object.defineProperty(exports, "cloneDeepWithoutLoc", {
    enumerable: !0,
    get: function() {
      return _cloneDeepWithoutLoc.default;
    }
  }), Object.defineProperty(exports, "cloneWithoutLoc", {
    enumerable: !0,
    get: function() {
      return _cloneWithoutLoc.default;
    }
  }), Object.defineProperty(exports, "addComment", {
    enumerable: !0,
    get: function() {
      return _addComment.default;
    }
  }), Object.defineProperty(exports, "addComments", {
    enumerable: !0,
    get: function() {
      return _addComments.default;
    }
  }), Object.defineProperty(exports, "inheritInnerComments", {
    enumerable: !0,
    get: function() {
      return _inheritInnerComments.default;
    }
  }), Object.defineProperty(exports, "inheritLeadingComments", {
    enumerable: !0,
    get: function() {
      return _inheritLeadingComments.default;
    }
  }), Object.defineProperty(exports, "inheritsComments", {
    enumerable: !0,
    get: function() {
      return _inheritsComments.default;
    }
  }), Object.defineProperty(exports, "inheritTrailingComments", {
    enumerable: !0,
    get: function() {
      return _inheritTrailingComments.default;
    }
  }), Object.defineProperty(exports, "removeComments", {
    enumerable: !0,
    get: function() {
      return _removeComments.default;
    }
  }), Object.defineProperty(exports, "ensureBlock", {
    enumerable: !0,
    get: function() {
      return _ensureBlock.default;
    }
  }), Object.defineProperty(exports, "toBindingIdentifierName", {
    enumerable: !0,
    get: function() {
      return _toBindingIdentifierName.default;
    }
  }), Object.defineProperty(exports, "toBlock", {
    enumerable: !0,
    get: function() {
      return _toBlock.default;
    }
  }), Object.defineProperty(exports, "toComputedKey", {
    enumerable: !0,
    get: function() {
      return _toComputedKey.default;
    }
  }), Object.defineProperty(exports, "toExpression", {
    enumerable: !0,
    get: function() {
      return _toExpression.default;
    }
  }), Object.defineProperty(exports, "toIdentifier", {
    enumerable: !0,
    get: function() {
      return _toIdentifier.default;
    }
  }), Object.defineProperty(exports, "toKeyAlias", {
    enumerable: !0,
    get: function() {
      return _toKeyAlias.default;
    }
  }), Object.defineProperty(exports, "toSequenceExpression", {
    enumerable: !0,
    get: function() {
      return _toSequenceExpression.default;
    }
  }), Object.defineProperty(exports, "toStatement", {
    enumerable: !0,
    get: function() {
      return _toStatement.default;
    }
  }), Object.defineProperty(exports, "valueToNode", {
    enumerable: !0,
    get: function() {
      return _valueToNode.default;
    }
  }), Object.defineProperty(exports, "appendToMemberExpression", {
    enumerable: !0,
    get: function() {
      return _appendToMemberExpression.default;
    }
  }), Object.defineProperty(exports, "inherits", {
    enumerable: !0,
    get: function() {
      return _inherits.default;
    }
  }), Object.defineProperty(exports, "prependToMemberExpression", {
    enumerable: !0,
    get: function() {
      return _prependToMemberExpression.default;
    }
  }), Object.defineProperty(exports, "removeProperties", {
    enumerable: !0,
    get: function() {
      return _removeProperties.default;
    }
  }), Object.defineProperty(exports, "removePropertiesDeep", {
    enumerable: !0,
    get: function() {
      return _removePropertiesDeep.default;
    }
  }), Object.defineProperty(exports, "removeTypeDuplicates", {
    enumerable: !0,
    get: function() {
      return _removeTypeDuplicates.default;
    }
  }), Object.defineProperty(exports, "getBindingIdentifiers", {
    enumerable: !0,
    get: function() {
      return _getBindingIdentifiers.default;
    }
  }), Object.defineProperty(exports, "getOuterBindingIdentifiers", {
    enumerable: !0,
    get: function() {
      return _getOuterBindingIdentifiers.default;
    }
  }), Object.defineProperty(exports, "traverse", {
    enumerable: !0,
    get: function() {
      return _traverse.default;
    }
  }), Object.defineProperty(exports, "traverseFast", {
    enumerable: !0,
    get: function() {
      return _traverseFast.default;
    }
  }), Object.defineProperty(exports, "shallowEqual", {
    enumerable: !0,
    get: function() {
      return _shallowEqual.default;
    }
  }), Object.defineProperty(exports, "is", {
    enumerable: !0,
    get: function() {
      return _is.default;
    }
  }), Object.defineProperty(exports, "isBinding", {
    enumerable: !0,
    get: function() {
      return _isBinding.default;
    }
  }), Object.defineProperty(exports, "isBlockScoped", {
    enumerable: !0,
    get: function() {
      return _isBlockScoped.default;
    }
  }), Object.defineProperty(exports, "isImmutable", {
    enumerable: !0,
    get: function() {
      return _isImmutable.default;
    }
  }), Object.defineProperty(exports, "isLet", {
    enumerable: !0,
    get: function() {
      return _isLet.default;
    }
  }), Object.defineProperty(exports, "isNode", {
    enumerable: !0,
    get: function() {
      return _isNode.default;
    }
  }), Object.defineProperty(exports, "isNodesEquivalent", {
    enumerable: !0,
    get: function() {
      return _isNodesEquivalent.default;
    }
  }), Object.defineProperty(exports, "isPlaceholderType", {
    enumerable: !0,
    get: function() {
      return _isPlaceholderType.default;
    }
  }), Object.defineProperty(exports, "isReferenced", {
    enumerable: !0,
    get: function() {
      return _isReferenced.default;
    }
  }), Object.defineProperty(exports, "isScope", {
    enumerable: !0,
    get: function() {
      return _isScope.default;
    }
  }), Object.defineProperty(exports, "isSpecifierDefault", {
    enumerable: !0,
    get: function() {
      return _isSpecifierDefault.default;
    }
  }), Object.defineProperty(exports, "isType", {
    enumerable: !0,
    get: function() {
      return _isType.default;
    }
  }), Object.defineProperty(exports, "isValidES3Identifier", {
    enumerable: !0,
    get: function() {
      return _isValidES3Identifier.default;
    }
  }), Object.defineProperty(exports, "isValidIdentifier", {
    enumerable: !0,
    get: function() {
      return _isValidIdentifier.default;
    }
  }), Object.defineProperty(exports, "isVar", {
    enumerable: !0,
    get: function() {
      return _isVar.default;
    }
  }), Object.defineProperty(exports, "matchesPattern", {
    enumerable: !0,
    get: function() {
      return _matchesPattern.default;
    }
  }), Object.defineProperty(exports, "validate", {
    enumerable: !0,
    get: function() {
      return _validate.default;
    }
  }), Object.defineProperty(exports, "buildMatchMemberExpression", {
    enumerable: !0,
    get: function() {
      return _buildMatchMemberExpression.default;
    }
  }), exports.react = void 0;
  var _isReactComponent = _interopRequireDefault(__webpack_require__(350)), _isCompatTag = _interopRequireDefault(__webpack_require__(351)), _buildChildren = _interopRequireDefault(__webpack_require__(352)), _assertNode = _interopRequireDefault(__webpack_require__(362)), _generated = __webpack_require__(363);
  Object.keys(_generated).forEach((function(key) {
    "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _generated[key];
      }
    }));
  }));
  var _createTypeAnnotationBasedOnTypeof = _interopRequireDefault(__webpack_require__(364)), _createFlowUnionType = _interopRequireDefault(__webpack_require__(365)), _createTSUnionType = _interopRequireDefault(__webpack_require__(366)), _generated2 = __webpack_require__(11);
  Object.keys(_generated2).forEach((function(key) {
    "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _generated2[key];
      }
    }));
  }));
  var _cloneNode = _interopRequireDefault(__webpack_require__(45)), _clone = _interopRequireDefault(__webpack_require__(368)), _cloneDeep = _interopRequireDefault(__webpack_require__(369)), _cloneDeepWithoutLoc = _interopRequireDefault(__webpack_require__(370)), _cloneWithoutLoc = _interopRequireDefault(__webpack_require__(371)), _addComment = _interopRequireDefault(__webpack_require__(372)), _addComments = _interopRequireDefault(__webpack_require__(247)), _inheritInnerComments = _interopRequireDefault(__webpack_require__(248)), _inheritLeadingComments = _interopRequireDefault(__webpack_require__(249)), _inheritsComments = _interopRequireDefault(__webpack_require__(250)), _inheritTrailingComments = _interopRequireDefault(__webpack_require__(251)), _removeComments = _interopRequireDefault(__webpack_require__(373)), _generated3 = __webpack_require__(374);
  Object.keys(_generated3).forEach((function(key) {
    "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _generated3[key];
      }
    }));
  }));
  var _constants = __webpack_require__(44);
  Object.keys(_constants).forEach((function(key) {
    "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _constants[key];
      }
    }));
  }));
  var _ensureBlock = _interopRequireDefault(__webpack_require__(375)), _toBindingIdentifierName = _interopRequireDefault(__webpack_require__(376)), _toBlock = _interopRequireDefault(__webpack_require__(252)), _toComputedKey = _interopRequireDefault(__webpack_require__(377)), _toExpression = _interopRequireDefault(__webpack_require__(378)), _toIdentifier = _interopRequireDefault(__webpack_require__(253)), _toKeyAlias = _interopRequireDefault(__webpack_require__(379)), _toSequenceExpression = _interopRequireDefault(__webpack_require__(380)), _toStatement = _interopRequireDefault(__webpack_require__(382)), _valueToNode = _interopRequireDefault(__webpack_require__(383)), _definitions = __webpack_require__(12);
  Object.keys(_definitions).forEach((function(key) {
    "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _definitions[key];
      }
    }));
  }));
  var _appendToMemberExpression = _interopRequireDefault(__webpack_require__(387)), _inherits = _interopRequireDefault(__webpack_require__(388)), _prependToMemberExpression = _interopRequireDefault(__webpack_require__(389)), _removeProperties = _interopRequireDefault(__webpack_require__(256)), _removePropertiesDeep = _interopRequireDefault(__webpack_require__(254)), _removeTypeDuplicates = _interopRequireDefault(__webpack_require__(246)), _getBindingIdentifiers = _interopRequireDefault(__webpack_require__(103)), _getOuterBindingIdentifiers = _interopRequireDefault(__webpack_require__(390)), _traverse = _interopRequireDefault(__webpack_require__(391)), _traverseFast = _interopRequireDefault(__webpack_require__(255)), _shallowEqual = _interopRequireDefault(__webpack_require__(210)), _is = _interopRequireDefault(__webpack_require__(90)), _isBinding = _interopRequireDefault(__webpack_require__(392)), _isBlockScoped = _interopRequireDefault(__webpack_require__(393)), _isImmutable = _interopRequireDefault(__webpack_require__(394)), _isLet = _interopRequireDefault(__webpack_require__(257)), _isNode = _interopRequireDefault(__webpack_require__(245)), _isNodesEquivalent = _interopRequireDefault(__webpack_require__(395)), _isPlaceholderType = _interopRequireDefault(__webpack_require__(243)), _isReferenced = _interopRequireDefault(__webpack_require__(396)), _isScope = _interopRequireDefault(__webpack_require__(397)), _isSpecifierDefault = _interopRequireDefault(__webpack_require__(398)), _isType = _interopRequireDefault(__webpack_require__(211)), _isValidES3Identifier = _interopRequireDefault(__webpack_require__(399)), _isValidIdentifier = _interopRequireDefault(__webpack_require__(91)), _isVar = _interopRequireDefault(__webpack_require__(400)), _matchesPattern = _interopRequireDefault(__webpack_require__(242)), _validate = _interopRequireDefault(__webpack_require__(212)), _buildMatchMemberExpression = _interopRequireDefault(__webpack_require__(241)), _generated4 = __webpack_require__(4);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  Object.keys(_generated4).forEach((function(key) {
    "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || Object.defineProperty(exports, key, {
      enumerable: !0,
      get: function() {
        return _generated4[key];
      }
    }));
  }));
  const react = {
    isReactComponent: _isReactComponent.default,
    isCompatTag: _isCompatTag.default,
    buildChildren: _buildChildren.default
  };
  exports.react = react;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var obj;
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _default = (0, ((obj = __webpack_require__(241)) && obj.__esModule ? obj : {
    default: obj
  }).default)("React.Component");
  exports.default = _default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(tagName) {
    return !!tagName && /^[a-z]/.test(tagName);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    const elements = [];
    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];
      (0, _generated.isJSXText)(child) ? (0, _cleanJSXElementLiteralChild.default)(child, elements) : ((0, 
      _generated.isJSXExpressionContainer)(child) && (child = child.expression), (0, _generated.isJSXEmptyExpression)(child) || elements.push(child));
    }
    return elements;
  };
  var obj, _generated = __webpack_require__(4), _cleanJSXElementLiteralChild = (obj = __webpack_require__(353)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(child, args) {
    const lines = child.value.split(/\r\n|\n|\r/);
    let lastNonEmptyLine = 0;
    for (let i = 0; i < lines.length; i++) lines[i].match(/[^ \t]/) && (lastNonEmptyLine = i);
    let str = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i], isFirstLine = 0 === i, isLastLine = i === lines.length - 1, isLastNonEmptyLine = i === lastNonEmptyLine;
      let trimmedLine = line.replace(/\t/g, " ");
      isFirstLine || (trimmedLine = trimmedLine.replace(/^[ ]+/, "")), isLastLine || (trimmedLine = trimmedLine.replace(/[ ]+$/, "")), 
      trimmedLine && (isLastNonEmptyLine || (trimmedLine += " "), str += trimmedLine);
    }
    str && args.push((0, _generated.stringLiteral)(str));
  };
  var _generated = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(type, ...args) {
    const keys = _definitions.BUILDER_KEYS[type], countArgs = args.length;
    if (countArgs > keys.length) throw new Error(`${type}: Too many arguments passed. Received ${countArgs} but can receive no more than ${keys.length}`);
    const node = {
      type: type
    };
    let i = 0;
    keys.forEach(key => {
      const field = _definitions.NODE_FIELDS[type][key];
      let arg;
      i < countArgs && (arg = args[i]), void 0 === arg && (arg = (0, _clone.default)(field.default)), 
      node[key] = arg, i++;
    });
    for (const key of Object.keys(node)) (0, _validate.default)(node, key, node[key]);
    return node;
  };
  var _clone = _interopRequireDefault(__webpack_require__(355)), _definitions = __webpack_require__(12), _validate = _interopRequireDefault(__webpack_require__(212));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  var baseClone = __webpack_require__(189);
  module.exports = function(value) {
    return baseClone(value, 4);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  let fastProto = null;
  function FastObject(o) {
    if (null !== fastProto && (fastProto.property, 1)) {
      const result = fastProto;
      return fastProto = FastObject.prototype = null, result;
    }
    return fastProto = FastObject.prototype = null == o ? Object.create(null) : o, new FastObject;
  }
  FastObject(), module.exports = function(o) {
    return FastObject(o);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _utils = function(obj) {
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
  }(__webpack_require__(28));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const defineInterfaceishType = (name, typeParameterType = "TypeParameterDeclaration") => {
    (0, _utils.default)(name, {
      builder: [ "id", "typeParameters", "extends", "body" ],
      visitor: [ "id", "typeParameters", "extends", "mixins", "implements", "body" ],
      aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)(typeParameterType),
        extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
        mixins: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
        implements: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ClassImplements")),
        body: (0, _utils.validateType)("ObjectTypeAnnotation")
      }
    });
  };
  (0, _utils.default)("AnyTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("ArrayTypeAnnotation", {
    visitor: [ "elementType" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      elementType: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("BooleanTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("BooleanLiteralTypeAnnotation", {
    builder: [ "value" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      value: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
    }
  }), (0, _utils.default)("NullLiteralTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("ClassImplements", {
    visitor: [ "id", "typeParameters" ],
    aliases: [ "Flow" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
    }
  }), defineInterfaceishType("DeclareClass"), (0, _utils.default)("DeclareFunction", {
    visitor: [ "id" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      predicate: (0, _utils.validateOptionalType)("DeclaredPredicate")
    }
  }), defineInterfaceishType("DeclareInterface"), (0, _utils.default)("DeclareModule", {
    builder: [ "id", "body", "kind" ],
    visitor: [ "id", "body" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
      body: (0, _utils.validateType)("BlockStatement"),
      kind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("CommonJS", "ES"))
    }
  }), (0, _utils.default)("DeclareModuleExports", {
    visitor: [ "typeAnnotation" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
    }
  }), (0, _utils.default)("DeclareTypeAlias", {
    visitor: [ "id", "typeParameters", "right" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
      right: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("DeclareOpaqueType", {
    visitor: [ "id", "typeParameters", "supertype" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
      supertype: (0, _utils.validateOptionalType)("FlowType")
    }
  }), (0, _utils.default)("DeclareVariable", {
    visitor: [ "id" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)("Identifier")
    }
  }), (0, _utils.default)("DeclareExportDeclaration", {
    visitor: [ "declaration", "specifiers", "source" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      declaration: (0, _utils.validateOptionalType)("Flow"),
      specifiers: (0, _utils.validateOptional)((0, _utils.arrayOfType)([ "ExportSpecifier", "ExportNamespaceSpecifier" ])),
      source: (0, _utils.validateOptionalType)("StringLiteral"),
      default: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
    }
  }), (0, _utils.default)("DeclareExportAllDeclaration", {
    visitor: [ "source" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      source: (0, _utils.validateType)("StringLiteral"),
      exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
    }
  }), (0, _utils.default)("DeclaredPredicate", {
    visitor: [ "value" ],
    aliases: [ "Flow", "FlowPredicate" ],
    fields: {
      value: (0, _utils.validateType)("Flow")
    }
  }), (0, _utils.default)("ExistsTypeAnnotation", {
    aliases: [ "Flow", "FlowType" ]
  }), (0, _utils.default)("FunctionTypeAnnotation", {
    visitor: [ "typeParameters", "params", "rest", "returnType" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
      params: (0, _utils.validate)((0, _utils.arrayOfType)("FunctionTypeParam")),
      rest: (0, _utils.validateOptionalType)("FunctionTypeParam"),
      returnType: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("FunctionTypeParam", {
    visitor: [ "name", "typeAnnotation" ],
    aliases: [ "Flow" ],
    fields: {
      name: (0, _utils.validateOptionalType)("Identifier"),
      typeAnnotation: (0, _utils.validateType)("FlowType"),
      optional: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
    }
  }), (0, _utils.default)("GenericTypeAnnotation", {
    visitor: [ "id", "typeParameters" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      id: (0, _utils.validateType)([ "Identifier", "QualifiedTypeIdentifier" ]),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
    }
  }), (0, _utils.default)("InferredPredicate", {
    aliases: [ "Flow", "FlowPredicate" ]
  }), (0, _utils.default)("InterfaceExtends", {
    visitor: [ "id", "typeParameters" ],
    aliases: [ "Flow" ],
    fields: {
      id: (0, _utils.validateType)([ "Identifier", "QualifiedTypeIdentifier" ]),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
    }
  }), defineInterfaceishType("InterfaceDeclaration"), (0, _utils.default)("InterfaceTypeAnnotation", {
    visitor: [ "extends", "body" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
      body: (0, _utils.validateType)("ObjectTypeAnnotation")
    }
  }), (0, _utils.default)("IntersectionTypeAnnotation", {
    visitor: [ "types" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
    }
  }), (0, _utils.default)("MixedTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("EmptyTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("NullableTypeAnnotation", {
    visitor: [ "typeAnnotation" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("NumberLiteralTypeAnnotation", {
    builder: [ "value" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      value: (0, _utils.validate)((0, _utils.assertValueType)("number"))
    }
  }), (0, _utils.default)("NumberTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("ObjectTypeAnnotation", {
    visitor: [ "properties", "indexers", "callProperties", "internalSlots" ],
    aliases: [ "Flow", "FlowType" ],
    builder: [ "properties", "indexers", "callProperties", "internalSlots", "exact" ],
    fields: {
      properties: (0, _utils.validate)((0, _utils.arrayOfType)([ "ObjectTypeProperty", "ObjectTypeSpreadProperty" ])),
      indexers: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ObjectTypeIndexer")),
      callProperties: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ObjectTypeCallProperty")),
      internalSlots: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ObjectTypeInternalSlot")),
      exact: {
        validate: (0, _utils.assertValueType)("boolean"),
        default: !1
      },
      inexact: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
    }
  }), (0, _utils.default)("ObjectTypeInternalSlot", {
    visitor: [ "id", "value", "optional", "static", "method" ],
    aliases: [ "Flow", "UserWhitespacable" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      value: (0, _utils.validateType)("FlowType"),
      optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
    }
  }), (0, _utils.default)("ObjectTypeCallProperty", {
    visitor: [ "value" ],
    aliases: [ "Flow", "UserWhitespacable" ],
    fields: {
      value: (0, _utils.validateType)("FlowType"),
      static: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
    }
  }), (0, _utils.default)("ObjectTypeIndexer", {
    visitor: [ "id", "key", "value", "variance" ],
    aliases: [ "Flow", "UserWhitespacable" ],
    fields: {
      id: (0, _utils.validateOptionalType)("Identifier"),
      key: (0, _utils.validateType)("FlowType"),
      value: (0, _utils.validateType)("FlowType"),
      static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      variance: (0, _utils.validateOptionalType)("Variance")
    }
  }), (0, _utils.default)("ObjectTypeProperty", {
    visitor: [ "key", "value", "variance" ],
    aliases: [ "Flow", "UserWhitespacable" ],
    fields: {
      key: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
      value: (0, _utils.validateType)("FlowType"),
      kind: (0, _utils.validate)((0, _utils.assertOneOf)("init", "get", "set")),
      static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      proto: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      variance: (0, _utils.validateOptionalType)("Variance")
    }
  }), (0, _utils.default)("ObjectTypeSpreadProperty", {
    visitor: [ "argument" ],
    aliases: [ "Flow", "UserWhitespacable" ],
    fields: {
      argument: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("OpaqueType", {
    visitor: [ "id", "typeParameters", "supertype", "impltype" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
      supertype: (0, _utils.validateOptionalType)("FlowType"),
      impltype: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("QualifiedTypeIdentifier", {
    visitor: [ "id", "qualification" ],
    aliases: [ "Flow" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      qualification: (0, _utils.validateType)([ "Identifier", "QualifiedTypeIdentifier" ])
    }
  }), (0, _utils.default)("StringLiteralTypeAnnotation", {
    builder: [ "value" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      value: (0, _utils.validate)((0, _utils.assertValueType)("string"))
    }
  }), (0, _utils.default)("StringTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("SymbolTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("ThisTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("TupleTypeAnnotation", {
    visitor: [ "types" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
    }
  }), (0, _utils.default)("TypeofTypeAnnotation", {
    visitor: [ "argument" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      argument: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("TypeAlias", {
    visitor: [ "id", "typeParameters", "right" ],
    aliases: [ "Flow", "FlowDeclaration", "Statement", "Declaration" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
      right: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("TypeAnnotation", {
    aliases: [ "Flow" ],
    visitor: [ "typeAnnotation" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("FlowType")
    }
  }), (0, _utils.default)("TypeCastExpression", {
    visitor: [ "expression", "typeAnnotation" ],
    aliases: [ "Flow", "ExpressionWrapper", "Expression" ],
    fields: {
      expression: (0, _utils.validateType)("Expression"),
      typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
    }
  }), (0, _utils.default)("TypeParameter", {
    aliases: [ "Flow" ],
    visitor: [ "bound", "default", "variance" ],
    fields: {
      name: (0, _utils.validate)((0, _utils.assertValueType)("string")),
      bound: (0, _utils.validateOptionalType)("TypeAnnotation"),
      default: (0, _utils.validateOptionalType)("FlowType"),
      variance: (0, _utils.validateOptionalType)("Variance")
    }
  }), (0, _utils.default)("TypeParameterDeclaration", {
    aliases: [ "Flow" ],
    visitor: [ "params" ],
    fields: {
      params: (0, _utils.validate)((0, _utils.arrayOfType)("TypeParameter"))
    }
  }), (0, _utils.default)("TypeParameterInstantiation", {
    aliases: [ "Flow" ],
    visitor: [ "params" ],
    fields: {
      params: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
    }
  }), (0, _utils.default)("UnionTypeAnnotation", {
    visitor: [ "types" ],
    aliases: [ "Flow", "FlowType" ],
    fields: {
      types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
    }
  }), (0, _utils.default)("Variance", {
    aliases: [ "Flow" ],
    builder: [ "kind" ],
    fields: {
      kind: (0, _utils.validate)((0, _utils.assertOneOf)("minus", "plus"))
    }
  }), (0, _utils.default)("VoidTypeAnnotation", {
    aliases: [ "Flow", "FlowType", "FlowBaseAnnotation" ]
  }), (0, _utils.default)("EnumDeclaration", {
    aliases: [ "Statement", "Declaration" ],
    visitor: [ "id", "body" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      body: (0, _utils.validateType)([ "EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody" ])
    }
  }), (0, _utils.default)("EnumBooleanBody", {
    aliases: [ "EnumBody" ],
    visitor: [ "members" ],
    fields: {
      explicit: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      members: (0, _utils.validateArrayOfType)("EnumBooleanMember")
    }
  }), (0, _utils.default)("EnumNumberBody", {
    aliases: [ "EnumBody" ],
    visitor: [ "members" ],
    fields: {
      explicit: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      members: (0, _utils.validateArrayOfType)("EnumNumberMember")
    }
  }), (0, _utils.default)("EnumStringBody", {
    aliases: [ "EnumBody" ],
    visitor: [ "members" ],
    fields: {
      explicit: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
      members: (0, _utils.validateArrayOfType)([ "EnumStringMember", "EnumDefaultedMember" ])
    }
  }), (0, _utils.default)("EnumSymbolBody", {
    aliases: [ "EnumBody" ],
    visitor: [ "members" ],
    fields: {
      members: (0, _utils.validateArrayOfType)("EnumDefaultedMember")
    }
  }), (0, _utils.default)("EnumBooleanMember", {
    aliases: [ "EnumMember" ],
    visitor: [ "id" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      init: (0, _utils.validateType)("BooleanLiteral")
    }
  }), (0, _utils.default)("EnumNumberMember", {
    aliases: [ "EnumMember" ],
    visitor: [ "id", "init" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      init: (0, _utils.validateType)("NumericLiteral")
    }
  }), (0, _utils.default)("EnumStringMember", {
    aliases: [ "EnumMember" ],
    visitor: [ "id", "init" ],
    fields: {
      id: (0, _utils.validateType)("Identifier"),
      init: (0, _utils.validateType)("StringLiteral")
    }
  }), (0, _utils.default)("EnumDefaultedMember", {
    aliases: [ "EnumMember" ],
    visitor: [ "id" ],
    fields: {
      id: (0, _utils.validateType)("Identifier")
    }
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _utils = function(obj) {
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
  }(__webpack_require__(28));
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  (0, _utils.default)("JSXAttribute", {
    visitor: [ "name", "value" ],
    aliases: [ "JSX", "Immutable" ],
    fields: {
      name: {
        validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
      },
      value: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
      }
    }
  }), (0, _utils.default)("JSXClosingElement", {
    visitor: [ "name" ],
    aliases: [ "JSX", "Immutable" ],
    fields: {
      name: {
        validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
      }
    }
  }), (0, _utils.default)("JSXElement", {
    builder: [ "openingElement", "closingElement", "children", "selfClosing" ],
    visitor: [ "openingElement", "children", "closingElement" ],
    aliases: [ "JSX", "Immutable", "Expression" ],
    fields: {
      openingElement: {
        validate: (0, _utils.assertNodeType)("JSXOpeningElement")
      },
      closingElement: {
        optional: !0,
        validate: (0, _utils.assertNodeType)("JSXClosingElement")
      },
      children: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
      },
      selfClosing: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      }
    }
  }), (0, _utils.default)("JSXEmptyExpression", {
    aliases: [ "JSX" ]
  }), (0, _utils.default)("JSXExpressionContainer", {
    visitor: [ "expression" ],
    aliases: [ "JSX", "Immutable" ],
    fields: {
      expression: {
        validate: (0, _utils.assertNodeType)("Expression", "JSXEmptyExpression")
      }
    }
  }), (0, _utils.default)("JSXSpreadChild", {
    visitor: [ "expression" ],
    aliases: [ "JSX", "Immutable" ],
    fields: {
      expression: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("JSXIdentifier", {
    builder: [ "name" ],
    aliases: [ "JSX" ],
    fields: {
      name: {
        validate: (0, _utils.assertValueType)("string")
      }
    }
  }), (0, _utils.default)("JSXMemberExpression", {
    visitor: [ "object", "property" ],
    aliases: [ "JSX" ],
    fields: {
      object: {
        validate: (0, _utils.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
      },
      property: {
        validate: (0, _utils.assertNodeType)("JSXIdentifier")
      }
    }
  }), (0, _utils.default)("JSXNamespacedName", {
    visitor: [ "namespace", "name" ],
    aliases: [ "JSX" ],
    fields: {
      namespace: {
        validate: (0, _utils.assertNodeType)("JSXIdentifier")
      },
      name: {
        validate: (0, _utils.assertNodeType)("JSXIdentifier")
      }
    }
  }), (0, _utils.default)("JSXOpeningElement", {
    builder: [ "name", "attributes", "selfClosing" ],
    visitor: [ "name", "attributes" ],
    aliases: [ "JSX", "Immutable" ],
    fields: {
      name: {
        validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
      },
      selfClosing: {
        default: !1
      },
      attributes: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
        optional: !0
      }
    }
  }), (0, _utils.default)("JSXSpreadAttribute", {
    visitor: [ "argument" ],
    aliases: [ "JSX" ],
    fields: {
      argument: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("JSXText", {
    aliases: [ "JSX", "Immutable" ],
    builder: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("string")
      }
    }
  }), (0, _utils.default)("JSXFragment", {
    builder: [ "openingFragment", "closingFragment", "children" ],
    visitor: [ "openingFragment", "children", "closingFragment" ],
    aliases: [ "JSX", "Immutable", "Expression" ],
    fields: {
      openingFragment: {
        validate: (0, _utils.assertNodeType)("JSXOpeningFragment")
      },
      closingFragment: {
        validate: (0, _utils.assertNodeType)("JSXClosingFragment")
      },
      children: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
      }
    }
  }), (0, _utils.default)("JSXOpeningFragment", {
    aliases: [ "JSX", "Immutable" ]
  }), (0, _utils.default)("JSXClosingFragment", {
    aliases: [ "JSX", "Immutable" ]
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _utils = function(obj) {
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
  }(__webpack_require__(28)), _placeholders = __webpack_require__(244);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  (0, _utils.default)("Noop", {
    visitor: []
  }), (0, _utils.default)("Placeholder", {
    visitor: [],
    builder: [ "expectedNode", "name" ],
    fields: {
      name: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      expectedNode: {
        validate: (0, _utils.assertOneOf)(..._placeholders.PLACEHOLDERS)
      }
    }
  }), (0, _utils.default)("V8IntrinsicIdentifier", {
    builder: [ "name" ],
    fields: {
      name: {
        validate: (0, _utils.assertValueType)("string")
      }
    }
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _utils = function(obj) {
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
  }(__webpack_require__(28)), _es = __webpack_require__(213), _core = __webpack_require__(102);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  (0, _utils.default)("ArgumentPlaceholder", {}), (0, _utils.default)("AwaitExpression", {
    builder: [ "argument" ],
    visitor: [ "argument" ],
    aliases: [ "Expression", "Terminatorless" ],
    fields: {
      argument: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("BindExpression", {
    visitor: [ "object", "callee" ],
    aliases: [ "Expression" ],
    fields: process.env.BABEL_TYPES_8_BREAKING ? {
      object: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      callee: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    } : {
      object: {
        validate: Object.assign(() => {}, {
          oneOfNodeTypes: [ "Expression" ]
        })
      },
      callee: {
        validate: Object.assign(() => {}, {
          oneOfNodeTypes: [ "Expression" ]
        })
      }
    }
  }), (0, _utils.default)("ClassProperty", {
    visitor: [ "key", "value", "typeAnnotation", "decorators" ],
    builder: [ "key", "value", "typeAnnotation", "decorators", "computed", "static" ],
    aliases: [ "Property" ],
    fields: Object.assign({}, _es.classMethodOrPropertyCommon, {
      value: {
        validate: (0, _utils.assertNodeType)("Expression"),
        optional: !0
      },
      definite: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      },
      typeAnnotation: {
        validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
        optional: !0
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      },
      readonly: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      },
      declare: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      }
    })
  }), (0, _utils.default)("OptionalMemberExpression", {
    builder: [ "object", "property", "computed", "optional" ],
    visitor: [ "object", "property" ],
    aliases: [ "Expression" ],
    fields: {
      object: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      property: {
        validate: function() {
          const normal = (0, _utils.assertNodeType)("Identifier"), computed = (0, _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
            (node.computed ? computed : normal)(node, key, val);
          };
          return validator.oneOfNodeTypes = [ "Expression", "Identifier" ], validator;
        }()
      },
      computed: {
        default: !1
      },
      optional: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, 
        _utils.assertOptionalChainStart)()) : (0, _utils.assertValueType)("boolean")
      }
    }
  }), (0, _utils.default)("PipelineTopicExpression", {
    builder: [ "expression" ],
    visitor: [ "expression" ],
    fields: {
      expression: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("PipelineBareFunction", {
    builder: [ "callee" ],
    visitor: [ "callee" ],
    fields: {
      callee: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("PipelinePrimaryTopicReference", {
    aliases: [ "Expression" ]
  }), (0, _utils.default)("OptionalCallExpression", {
    visitor: [ "callee", "arguments", "typeParameters", "typeArguments" ],
    builder: [ "callee", "arguments", "optional" ],
    aliases: [ "Expression" ],
    fields: {
      callee: {
        validate: (0, _utils.assertNodeType)("Expression")
      },
      arguments: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName")))
      },
      optional: {
        validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, 
        _utils.assertOptionalChainStart)()) : (0, _utils.assertValueType)("boolean")
      },
      typeArguments: {
        validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
        optional: !0
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
        optional: !0
      }
    }
  }), (0, _utils.default)("ClassPrivateProperty", {
    visitor: [ "key", "value", "decorators" ],
    builder: [ "key", "value", "decorators" ],
    aliases: [ "Property", "Private" ],
    fields: {
      key: {
        validate: (0, _utils.assertNodeType)("PrivateName")
      },
      value: {
        validate: (0, _utils.assertNodeType)("Expression"),
        optional: !0
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Decorator"))),
        optional: !0
      }
    }
  }), (0, _utils.default)("ClassPrivateMethod", {
    builder: [ "kind", "key", "params", "body", "static" ],
    visitor: [ "key", "params", "body", "decorators", "returnType", "typeParameters" ],
    aliases: [ "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private" ],
    fields: Object.assign({}, _es.classMethodOrDeclareMethodCommon, _core.functionTypeAnnotationCommon, {
      key: {
        validate: (0, _utils.assertNodeType)("PrivateName")
      },
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    })
  }), (0, _utils.default)("Import", {
    aliases: [ "Expression" ]
  }), (0, _utils.default)("ImportAttribute", {
    visitor: [ "key", "value" ],
    fields: {
      key: {
        validate: (0, _utils.assertNodeType)("Identifier")
      },
      value: {
        validate: (0, _utils.assertNodeType)("StringLiteral")
      }
    }
  }), (0, _utils.default)("Decorator", {
    visitor: [ "expression" ],
    fields: {
      expression: {
        validate: (0, _utils.assertNodeType)("Expression")
      }
    }
  }), (0, _utils.default)("DoExpression", {
    visitor: [ "body" ],
    aliases: [ "Expression" ],
    fields: {
      body: {
        validate: (0, _utils.assertNodeType)("BlockStatement")
      }
    }
  }), (0, _utils.default)("ExportDefaultSpecifier", {
    visitor: [ "exported" ],
    aliases: [ "ModuleSpecifier" ],
    fields: {
      exported: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  }), (0, _utils.default)("ExportNamespaceSpecifier", {
    visitor: [ "exported" ],
    aliases: [ "ModuleSpecifier" ],
    fields: {
      exported: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  }), (0, _utils.default)("PrivateName", {
    visitor: [ "id" ],
    aliases: [ "Private" ],
    fields: {
      id: {
        validate: (0, _utils.assertNodeType)("Identifier")
      }
    }
  }), (0, _utils.default)("BigIntLiteral", {
    builder: [ "value" ],
    fields: {
      value: {
        validate: (0, _utils.assertValueType)("string")
      }
    },
    aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
  }), (0, _utils.default)("RecordExpression", {
    visitor: [ "properties" ],
    aliases: [ "Expression" ],
    fields: {
      properties: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("ObjectProperty", "SpreadElement")))
      }
    }
  }), (0, _utils.default)("TupleExpression", {
    fields: {
      elements: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("Expression", "SpreadElement"))),
        default: []
      }
    },
    visitor: [ "elements" ],
    aliases: [ "Expression" ]
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  var _utils = function(obj) {
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
  }(__webpack_require__(28)), _core = __webpack_require__(102), _es = __webpack_require__(213);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const bool = (0, _utils.assertValueType)("boolean"), tSFunctionTypeAnnotationCommon = {
    returnType: {
      validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
      optional: !0
    },
    typeParameters: {
      validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
      optional: !0
    }
  };
  (0, _utils.default)("TSParameterProperty", {
    aliases: [ "LVal" ],
    visitor: [ "parameter" ],
    fields: {
      accessibility: {
        validate: (0, _utils.assertOneOf)("public", "private", "protected"),
        optional: !0
      },
      readonly: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: !0
      },
      parameter: {
        validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
      }
    }
  }), (0, _utils.default)("TSDeclareFunction", {
    aliases: [ "Statement", "Declaration" ],
    visitor: [ "id", "typeParameters", "params", "returnType" ],
    fields: Object.assign({}, _core.functionDeclarationCommon, tSFunctionTypeAnnotationCommon)
  }), (0, _utils.default)("TSDeclareMethod", {
    visitor: [ "decorators", "key", "typeParameters", "params", "returnType" ],
    fields: Object.assign({}, _es.classMethodOrDeclareMethodCommon, tSFunctionTypeAnnotationCommon)
  }), (0, _utils.default)("TSQualifiedName", {
    aliases: [ "TSEntityName" ],
    visitor: [ "left", "right" ],
    fields: {
      left: (0, _utils.validateType)("TSEntityName"),
      right: (0, _utils.validateType)("Identifier")
    }
  });
  const signatureDeclarationCommon = {
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
    parameters: (0, _utils.validateArrayOfType)([ "Identifier", "RestElement" ]),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
  }, callConstructSignatureDeclaration = {
    aliases: [ "TSTypeElement" ],
    visitor: [ "typeParameters", "parameters", "typeAnnotation" ],
    fields: signatureDeclarationCommon
  };
  (0, _utils.default)("TSCallSignatureDeclaration", callConstructSignatureDeclaration), 
  (0, _utils.default)("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
  const namedTypeElementCommon = {
    key: (0, _utils.validateType)("Expression"),
    computed: (0, _utils.validate)(bool),
    optional: (0, _utils.validateOptional)(bool)
  };
  (0, _utils.default)("TSPropertySignature", {
    aliases: [ "TSTypeElement" ],
    visitor: [ "key", "typeAnnotation", "initializer" ],
    fields: Object.assign({}, namedTypeElementCommon, {
      readonly: (0, _utils.validateOptional)(bool),
      typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
      initializer: (0, _utils.validateOptionalType)("Expression")
    })
  }), (0, _utils.default)("TSMethodSignature", {
    aliases: [ "TSTypeElement" ],
    visitor: [ "key", "typeParameters", "parameters", "typeAnnotation" ],
    fields: Object.assign({}, signatureDeclarationCommon, namedTypeElementCommon)
  }), (0, _utils.default)("TSIndexSignature", {
    aliases: [ "TSTypeElement" ],
    visitor: [ "parameters", "typeAnnotation" ],
    fields: {
      readonly: (0, _utils.validateOptional)(bool),
      parameters: (0, _utils.validateArrayOfType)("Identifier"),
      typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
    }
  });
  const tsKeywordTypes = [ "TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword" ];
  for (const type of tsKeywordTypes) (0, _utils.default)(type, {
    aliases: [ "TSType", "TSBaseType" ],
    visitor: [],
    fields: {}
  });
  (0, _utils.default)("TSThisType", {
    aliases: [ "TSType", "TSBaseType" ],
    visitor: [],
    fields: {}
  });
  const fnOrCtr = {
    aliases: [ "TSType" ],
    visitor: [ "typeParameters", "parameters", "typeAnnotation" ],
    fields: signatureDeclarationCommon
  };
  (0, _utils.default)("TSFunctionType", fnOrCtr), (0, _utils.default)("TSConstructorType", fnOrCtr), 
  (0, _utils.default)("TSTypeReference", {
    aliases: [ "TSType" ],
    visitor: [ "typeName", "typeParameters" ],
    fields: {
      typeName: (0, _utils.validateType)("TSEntityName"),
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
    }
  }), (0, _utils.default)("TSTypePredicate", {
    aliases: [ "TSType" ],
    visitor: [ "parameterName", "typeAnnotation" ],
    builder: [ "parameterName", "typeAnnotation", "asserts" ],
    fields: {
      parameterName: (0, _utils.validateType)([ "Identifier", "TSThisType" ]),
      typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
      asserts: (0, _utils.validateOptional)(bool)
    }
  }), (0, _utils.default)("TSTypeQuery", {
    aliases: [ "TSType" ],
    visitor: [ "exprName" ],
    fields: {
      exprName: (0, _utils.validateType)([ "TSEntityName", "TSImportType" ])
    }
  }), (0, _utils.default)("TSTypeLiteral", {
    aliases: [ "TSType" ],
    visitor: [ "members" ],
    fields: {
      members: (0, _utils.validateArrayOfType)("TSTypeElement")
    }
  }), (0, _utils.default)("TSArrayType", {
    aliases: [ "TSType" ],
    visitor: [ "elementType" ],
    fields: {
      elementType: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSTupleType", {
    aliases: [ "TSType" ],
    visitor: [ "elementTypes" ],
    fields: {
      elementTypes: (0, _utils.validateArrayOfType)("TSType")
    }
  }), (0, _utils.default)("TSOptionalType", {
    aliases: [ "TSType" ],
    visitor: [ "typeAnnotation" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSRestType", {
    aliases: [ "TSType" ],
    visitor: [ "typeAnnotation" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("TSType")
    }
  });
  const unionOrIntersection = {
    aliases: [ "TSType" ],
    visitor: [ "types" ],
    fields: {
      types: (0, _utils.validateArrayOfType)("TSType")
    }
  };
  (0, _utils.default)("TSUnionType", unionOrIntersection), (0, _utils.default)("TSIntersectionType", unionOrIntersection), 
  (0, _utils.default)("TSConditionalType", {
    aliases: [ "TSType" ],
    visitor: [ "checkType", "extendsType", "trueType", "falseType" ],
    fields: {
      checkType: (0, _utils.validateType)("TSType"),
      extendsType: (0, _utils.validateType)("TSType"),
      trueType: (0, _utils.validateType)("TSType"),
      falseType: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSInferType", {
    aliases: [ "TSType" ],
    visitor: [ "typeParameter" ],
    fields: {
      typeParameter: (0, _utils.validateType)("TSTypeParameter")
    }
  }), (0, _utils.default)("TSParenthesizedType", {
    aliases: [ "TSType" ],
    visitor: [ "typeAnnotation" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSTypeOperator", {
    aliases: [ "TSType" ],
    visitor: [ "typeAnnotation" ],
    fields: {
      operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
      typeAnnotation: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSIndexedAccessType", {
    aliases: [ "TSType" ],
    visitor: [ "objectType", "indexType" ],
    fields: {
      objectType: (0, _utils.validateType)("TSType"),
      indexType: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSMappedType", {
    aliases: [ "TSType" ],
    visitor: [ "typeParameter", "typeAnnotation" ],
    fields: {
      readonly: (0, _utils.validateOptional)(bool),
      typeParameter: (0, _utils.validateType)("TSTypeParameter"),
      optional: (0, _utils.validateOptional)(bool),
      typeAnnotation: (0, _utils.validateOptionalType)("TSType")
    }
  }), (0, _utils.default)("TSLiteralType", {
    aliases: [ "TSType", "TSBaseType" ],
    visitor: [ "literal" ],
    fields: {
      literal: (0, _utils.validateType)([ "NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral" ])
    }
  }), (0, _utils.default)("TSExpressionWithTypeArguments", {
    aliases: [ "TSType" ],
    visitor: [ "expression", "typeParameters" ],
    fields: {
      expression: (0, _utils.validateType)("TSEntityName"),
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
    }
  }), (0, _utils.default)("TSInterfaceDeclaration", {
    aliases: [ "Statement", "Declaration" ],
    visitor: [ "id", "typeParameters", "extends", "body" ],
    fields: {
      declare: (0, _utils.validateOptional)(bool),
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
      extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
      body: (0, _utils.validateType)("TSInterfaceBody")
    }
  }), (0, _utils.default)("TSInterfaceBody", {
    visitor: [ "body" ],
    fields: {
      body: (0, _utils.validateArrayOfType)("TSTypeElement")
    }
  }), (0, _utils.default)("TSTypeAliasDeclaration", {
    aliases: [ "Statement", "Declaration" ],
    visitor: [ "id", "typeParameters", "typeAnnotation" ],
    fields: {
      declare: (0, _utils.validateOptional)(bool),
      id: (0, _utils.validateType)("Identifier"),
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
      typeAnnotation: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSAsExpression", {
    aliases: [ "Expression" ],
    visitor: [ "expression", "typeAnnotation" ],
    fields: {
      expression: (0, _utils.validateType)("Expression"),
      typeAnnotation: (0, _utils.validateType)("TSType")
    }
  }), (0, _utils.default)("TSTypeAssertion", {
    aliases: [ "Expression" ],
    visitor: [ "typeAnnotation", "expression" ],
    fields: {
      typeAnnotation: (0, _utils.validateType)("TSType"),
      expression: (0, _utils.validateType)("Expression")
    }
  }), (0, _utils.default)("TSEnumDeclaration", {
    aliases: [ "Statement", "Declaration" ],
    visitor: [ "id", "members" ],
    fields: {
      declare: (0, _utils.validateOptional)(bool),
      const: (0, _utils.validateOptional)(bool),
      id: (0, _utils.validateType)("Identifier"),
      members: (0, _utils.validateArrayOfType)("TSEnumMember"),
      initializer: (0, _utils.validateOptionalType)("Expression")
    }
  }), (0, _utils.default)("TSEnumMember", {
    visitor: [ "id", "initializer" ],
    fields: {
      id: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
      initializer: (0, _utils.validateOptionalType)("Expression")
    }
  }), (0, _utils.default)("TSModuleDeclaration", {
    aliases: [ "Statement", "Declaration" ],
    visitor: [ "id", "body" ],
    fields: {
      declare: (0, _utils.validateOptional)(bool),
      global: (0, _utils.validateOptional)(bool),
      id: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
      body: (0, _utils.validateType)([ "TSModuleBlock", "TSModuleDeclaration" ])
    }
  }), (0, _utils.default)("TSModuleBlock", {
    aliases: [ "Scopable", "Block", "BlockParent" ],
    visitor: [ "body" ],
    fields: {
      body: (0, _utils.validateArrayOfType)("Statement")
    }
  }), (0, _utils.default)("TSImportType", {
    aliases: [ "TSType" ],
    visitor: [ "argument", "qualifier", "typeParameters" ],
    fields: {
      argument: (0, _utils.validateType)("StringLiteral"),
      qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
    }
  }), (0, _utils.default)("TSImportEqualsDeclaration", {
    aliases: [ "Statement" ],
    visitor: [ "id", "moduleReference" ],
    fields: {
      isExport: (0, _utils.validate)(bool),
      id: (0, _utils.validateType)("Identifier"),
      moduleReference: (0, _utils.validateType)([ "TSEntityName", "TSExternalModuleReference" ])
    }
  }), (0, _utils.default)("TSExternalModuleReference", {
    visitor: [ "expression" ],
    fields: {
      expression: (0, _utils.validateType)("StringLiteral")
    }
  }), (0, _utils.default)("TSNonNullExpression", {
    aliases: [ "Expression" ],
    visitor: [ "expression" ],
    fields: {
      expression: (0, _utils.validateType)("Expression")
    }
  }), (0, _utils.default)("TSExportAssignment", {
    aliases: [ "Statement" ],
    visitor: [ "expression" ],
    fields: {
      expression: (0, _utils.validateType)("Expression")
    }
  }), (0, _utils.default)("TSNamespaceExportDeclaration", {
    aliases: [ "Statement" ],
    visitor: [ "id" ],
    fields: {
      id: (0, _utils.validateType)("Identifier")
    }
  }), (0, _utils.default)("TSTypeAnnotation", {
    visitor: [ "typeAnnotation" ],
    fields: {
      typeAnnotation: {
        validate: (0, _utils.assertNodeType)("TSType")
      }
    }
  }), (0, _utils.default)("TSTypeParameterInstantiation", {
    visitor: [ "params" ],
    fields: {
      params: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("TSType")))
      }
    }
  }), (0, _utils.default)("TSTypeParameterDeclaration", {
    visitor: [ "params" ],
    fields: {
      params: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
        _utils.assertNodeType)("TSTypeParameter")))
      }
    }
  }), (0, _utils.default)("TSTypeParameter", {
    builder: [ "constraint", "default", "name" ],
    visitor: [ "constraint", "default" ],
    fields: {
      name: {
        validate: (0, _utils.assertValueType)("string")
      },
      constraint: {
        validate: (0, _utils.assertNodeType)("TSType"),
        optional: !0
      },
      default: {
        validate: (0, _utils.assertNodeType)("TSType"),
        optional: !0
      }
    }
  });
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    if (!(0, _isNode.default)(node)) {
      var _node$type;
      const type = null != (_node$type = null == node ? void 0 : node.type) ? _node$type : JSON.stringify(node);
      throw new TypeError(`Not a valid node of type "${type}"`);
    }
  };
  var obj, _isNode = (obj = __webpack_require__(245)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.assertArrayExpression = function(node, opts = {}) {
    assert("ArrayExpression", node, opts);
  }, exports.assertAssignmentExpression = function(node, opts = {}) {
    assert("AssignmentExpression", node, opts);
  }, exports.assertBinaryExpression = function(node, opts = {}) {
    assert("BinaryExpression", node, opts);
  }, exports.assertInterpreterDirective = function(node, opts = {}) {
    assert("InterpreterDirective", node, opts);
  }, exports.assertDirective = function(node, opts = {}) {
    assert("Directive", node, opts);
  }, exports.assertDirectiveLiteral = function(node, opts = {}) {
    assert("DirectiveLiteral", node, opts);
  }, exports.assertBlockStatement = function(node, opts = {}) {
    assert("BlockStatement", node, opts);
  }, exports.assertBreakStatement = function(node, opts = {}) {
    assert("BreakStatement", node, opts);
  }, exports.assertCallExpression = function(node, opts = {}) {
    assert("CallExpression", node, opts);
  }, exports.assertCatchClause = function(node, opts = {}) {
    assert("CatchClause", node, opts);
  }, exports.assertConditionalExpression = function(node, opts = {}) {
    assert("ConditionalExpression", node, opts);
  }, exports.assertContinueStatement = function(node, opts = {}) {
    assert("ContinueStatement", node, opts);
  }, exports.assertDebuggerStatement = function(node, opts = {}) {
    assert("DebuggerStatement", node, opts);
  }, exports.assertDoWhileStatement = function(node, opts = {}) {
    assert("DoWhileStatement", node, opts);
  }, exports.assertEmptyStatement = function(node, opts = {}) {
    assert("EmptyStatement", node, opts);
  }, exports.assertExpressionStatement = function(node, opts = {}) {
    assert("ExpressionStatement", node, opts);
  }, exports.assertFile = function(node, opts = {}) {
    assert("File", node, opts);
  }, exports.assertForInStatement = function(node, opts = {}) {
    assert("ForInStatement", node, opts);
  }, exports.assertForStatement = function(node, opts = {}) {
    assert("ForStatement", node, opts);
  }, exports.assertFunctionDeclaration = function(node, opts = {}) {
    assert("FunctionDeclaration", node, opts);
  }, exports.assertFunctionExpression = function(node, opts = {}) {
    assert("FunctionExpression", node, opts);
  }, exports.assertIdentifier = function(node, opts = {}) {
    assert("Identifier", node, opts);
  }, exports.assertIfStatement = function(node, opts = {}) {
    assert("IfStatement", node, opts);
  }, exports.assertLabeledStatement = function(node, opts = {}) {
    assert("LabeledStatement", node, opts);
  }, exports.assertStringLiteral = function(node, opts = {}) {
    assert("StringLiteral", node, opts);
  }, exports.assertNumericLiteral = function(node, opts = {}) {
    assert("NumericLiteral", node, opts);
  }, exports.assertNullLiteral = function(node, opts = {}) {
    assert("NullLiteral", node, opts);
  }, exports.assertBooleanLiteral = function(node, opts = {}) {
    assert("BooleanLiteral", node, opts);
  }, exports.assertRegExpLiteral = function(node, opts = {}) {
    assert("RegExpLiteral", node, opts);
  }, exports.assertLogicalExpression = function(node, opts = {}) {
    assert("LogicalExpression", node, opts);
  }, exports.assertMemberExpression = function(node, opts = {}) {
    assert("MemberExpression", node, opts);
  }, exports.assertNewExpression = function(node, opts = {}) {
    assert("NewExpression", node, opts);
  }, exports.assertProgram = function(node, opts = {}) {
    assert("Program", node, opts);
  }, exports.assertObjectExpression = function(node, opts = {}) {
    assert("ObjectExpression", node, opts);
  }, exports.assertObjectMethod = function(node, opts = {}) {
    assert("ObjectMethod", node, opts);
  }, exports.assertObjectProperty = function(node, opts = {}) {
    assert("ObjectProperty", node, opts);
  }, exports.assertRestElement = function(node, opts = {}) {
    assert("RestElement", node, opts);
  }, exports.assertReturnStatement = function(node, opts = {}) {
    assert("ReturnStatement", node, opts);
  }, exports.assertSequenceExpression = function(node, opts = {}) {
    assert("SequenceExpression", node, opts);
  }, exports.assertParenthesizedExpression = function(node, opts = {}) {
    assert("ParenthesizedExpression", node, opts);
  }, exports.assertSwitchCase = function(node, opts = {}) {
    assert("SwitchCase", node, opts);
  }, exports.assertSwitchStatement = function(node, opts = {}) {
    assert("SwitchStatement", node, opts);
  }, exports.assertThisExpression = function(node, opts = {}) {
    assert("ThisExpression", node, opts);
  }, exports.assertThrowStatement = function(node, opts = {}) {
    assert("ThrowStatement", node, opts);
  }, exports.assertTryStatement = function(node, opts = {}) {
    assert("TryStatement", node, opts);
  }, exports.assertUnaryExpression = function(node, opts = {}) {
    assert("UnaryExpression", node, opts);
  }, exports.assertUpdateExpression = function(node, opts = {}) {
    assert("UpdateExpression", node, opts);
  }, exports.assertVariableDeclaration = function(node, opts = {}) {
    assert("VariableDeclaration", node, opts);
  }, exports.assertVariableDeclarator = function(node, opts = {}) {
    assert("VariableDeclarator", node, opts);
  }, exports.assertWhileStatement = function(node, opts = {}) {
    assert("WhileStatement", node, opts);
  }, exports.assertWithStatement = function(node, opts = {}) {
    assert("WithStatement", node, opts);
  }, exports.assertAssignmentPattern = function(node, opts = {}) {
    assert("AssignmentPattern", node, opts);
  }, exports.assertArrayPattern = function(node, opts = {}) {
    assert("ArrayPattern", node, opts);
  }, exports.assertArrowFunctionExpression = function(node, opts = {}) {
    assert("ArrowFunctionExpression", node, opts);
  }, exports.assertClassBody = function(node, opts = {}) {
    assert("ClassBody", node, opts);
  }, exports.assertClassExpression = function(node, opts = {}) {
    assert("ClassExpression", node, opts);
  }, exports.assertClassDeclaration = function(node, opts = {}) {
    assert("ClassDeclaration", node, opts);
  }, exports.assertExportAllDeclaration = function(node, opts = {}) {
    assert("ExportAllDeclaration", node, opts);
  }, exports.assertExportDefaultDeclaration = function(node, opts = {}) {
    assert("ExportDefaultDeclaration", node, opts);
  }, exports.assertExportNamedDeclaration = function(node, opts = {}) {
    assert("ExportNamedDeclaration", node, opts);
  }, exports.assertExportSpecifier = function(node, opts = {}) {
    assert("ExportSpecifier", node, opts);
  }, exports.assertForOfStatement = function(node, opts = {}) {
    assert("ForOfStatement", node, opts);
  }, exports.assertImportDeclaration = function(node, opts = {}) {
    assert("ImportDeclaration", node, opts);
  }, exports.assertImportDefaultSpecifier = function(node, opts = {}) {
    assert("ImportDefaultSpecifier", node, opts);
  }, exports.assertImportNamespaceSpecifier = function(node, opts = {}) {
    assert("ImportNamespaceSpecifier", node, opts);
  }, exports.assertImportSpecifier = function(node, opts = {}) {
    assert("ImportSpecifier", node, opts);
  }, exports.assertMetaProperty = function(node, opts = {}) {
    assert("MetaProperty", node, opts);
  }, exports.assertClassMethod = function(node, opts = {}) {
    assert("ClassMethod", node, opts);
  }, exports.assertObjectPattern = function(node, opts = {}) {
    assert("ObjectPattern", node, opts);
  }, exports.assertSpreadElement = function(node, opts = {}) {
    assert("SpreadElement", node, opts);
  }, exports.assertSuper = function(node, opts = {}) {
    assert("Super", node, opts);
  }, exports.assertTaggedTemplateExpression = function(node, opts = {}) {
    assert("TaggedTemplateExpression", node, opts);
  }, exports.assertTemplateElement = function(node, opts = {}) {
    assert("TemplateElement", node, opts);
  }, exports.assertTemplateLiteral = function(node, opts = {}) {
    assert("TemplateLiteral", node, opts);
  }, exports.assertYieldExpression = function(node, opts = {}) {
    assert("YieldExpression", node, opts);
  }, exports.assertAnyTypeAnnotation = function(node, opts = {}) {
    assert("AnyTypeAnnotation", node, opts);
  }, exports.assertArrayTypeAnnotation = function(node, opts = {}) {
    assert("ArrayTypeAnnotation", node, opts);
  }, exports.assertBooleanTypeAnnotation = function(node, opts = {}) {
    assert("BooleanTypeAnnotation", node, opts);
  }, exports.assertBooleanLiteralTypeAnnotation = function(node, opts = {}) {
    assert("BooleanLiteralTypeAnnotation", node, opts);
  }, exports.assertNullLiteralTypeAnnotation = function(node, opts = {}) {
    assert("NullLiteralTypeAnnotation", node, opts);
  }, exports.assertClassImplements = function(node, opts = {}) {
    assert("ClassImplements", node, opts);
  }, exports.assertDeclareClass = function(node, opts = {}) {
    assert("DeclareClass", node, opts);
  }, exports.assertDeclareFunction = function(node, opts = {}) {
    assert("DeclareFunction", node, opts);
  }, exports.assertDeclareInterface = function(node, opts = {}) {
    assert("DeclareInterface", node, opts);
  }, exports.assertDeclareModule = function(node, opts = {}) {
    assert("DeclareModule", node, opts);
  }, exports.assertDeclareModuleExports = function(node, opts = {}) {
    assert("DeclareModuleExports", node, opts);
  }, exports.assertDeclareTypeAlias = function(node, opts = {}) {
    assert("DeclareTypeAlias", node, opts);
  }, exports.assertDeclareOpaqueType = function(node, opts = {}) {
    assert("DeclareOpaqueType", node, opts);
  }, exports.assertDeclareVariable = function(node, opts = {}) {
    assert("DeclareVariable", node, opts);
  }, exports.assertDeclareExportDeclaration = function(node, opts = {}) {
    assert("DeclareExportDeclaration", node, opts);
  }, exports.assertDeclareExportAllDeclaration = function(node, opts = {}) {
    assert("DeclareExportAllDeclaration", node, opts);
  }, exports.assertDeclaredPredicate = function(node, opts = {}) {
    assert("DeclaredPredicate", node, opts);
  }, exports.assertExistsTypeAnnotation = function(node, opts = {}) {
    assert("ExistsTypeAnnotation", node, opts);
  }, exports.assertFunctionTypeAnnotation = function(node, opts = {}) {
    assert("FunctionTypeAnnotation", node, opts);
  }, exports.assertFunctionTypeParam = function(node, opts = {}) {
    assert("FunctionTypeParam", node, opts);
  }, exports.assertGenericTypeAnnotation = function(node, opts = {}) {
    assert("GenericTypeAnnotation", node, opts);
  }, exports.assertInferredPredicate = function(node, opts = {}) {
    assert("InferredPredicate", node, opts);
  }, exports.assertInterfaceExtends = function(node, opts = {}) {
    assert("InterfaceExtends", node, opts);
  }, exports.assertInterfaceDeclaration = function(node, opts = {}) {
    assert("InterfaceDeclaration", node, opts);
  }, exports.assertInterfaceTypeAnnotation = function(node, opts = {}) {
    assert("InterfaceTypeAnnotation", node, opts);
  }, exports.assertIntersectionTypeAnnotation = function(node, opts = {}) {
    assert("IntersectionTypeAnnotation", node, opts);
  }, exports.assertMixedTypeAnnotation = function(node, opts = {}) {
    assert("MixedTypeAnnotation", node, opts);
  }, exports.assertEmptyTypeAnnotation = function(node, opts = {}) {
    assert("EmptyTypeAnnotation", node, opts);
  }, exports.assertNullableTypeAnnotation = function(node, opts = {}) {
    assert("NullableTypeAnnotation", node, opts);
  }, exports.assertNumberLiteralTypeAnnotation = function(node, opts = {}) {
    assert("NumberLiteralTypeAnnotation", node, opts);
  }, exports.assertNumberTypeAnnotation = function(node, opts = {}) {
    assert("NumberTypeAnnotation", node, opts);
  }, exports.assertObjectTypeAnnotation = function(node, opts = {}) {
    assert("ObjectTypeAnnotation", node, opts);
  }, exports.assertObjectTypeInternalSlot = function(node, opts = {}) {
    assert("ObjectTypeInternalSlot", node, opts);
  }, exports.assertObjectTypeCallProperty = function(node, opts = {}) {
    assert("ObjectTypeCallProperty", node, opts);
  }, exports.assertObjectTypeIndexer = function(node, opts = {}) {
    assert("ObjectTypeIndexer", node, opts);
  }, exports.assertObjectTypeProperty = function(node, opts = {}) {
    assert("ObjectTypeProperty", node, opts);
  }, exports.assertObjectTypeSpreadProperty = function(node, opts = {}) {
    assert("ObjectTypeSpreadProperty", node, opts);
  }, exports.assertOpaqueType = function(node, opts = {}) {
    assert("OpaqueType", node, opts);
  }, exports.assertQualifiedTypeIdentifier = function(node, opts = {}) {
    assert("QualifiedTypeIdentifier", node, opts);
  }, exports.assertStringLiteralTypeAnnotation = function(node, opts = {}) {
    assert("StringLiteralTypeAnnotation", node, opts);
  }, exports.assertStringTypeAnnotation = function(node, opts = {}) {
    assert("StringTypeAnnotation", node, opts);
  }, exports.assertSymbolTypeAnnotation = function(node, opts = {}) {
    assert("SymbolTypeAnnotation", node, opts);
  }, exports.assertThisTypeAnnotation = function(node, opts = {}) {
    assert("ThisTypeAnnotation", node, opts);
  }, exports.assertTupleTypeAnnotation = function(node, opts = {}) {
    assert("TupleTypeAnnotation", node, opts);
  }, exports.assertTypeofTypeAnnotation = function(node, opts = {}) {
    assert("TypeofTypeAnnotation", node, opts);
  }, exports.assertTypeAlias = function(node, opts = {}) {
    assert("TypeAlias", node, opts);
  }, exports.assertTypeAnnotation = function(node, opts = {}) {
    assert("TypeAnnotation", node, opts);
  }, exports.assertTypeCastExpression = function(node, opts = {}) {
    assert("TypeCastExpression", node, opts);
  }, exports.assertTypeParameter = function(node, opts = {}) {
    assert("TypeParameter", node, opts);
  }, exports.assertTypeParameterDeclaration = function(node, opts = {}) {
    assert("TypeParameterDeclaration", node, opts);
  }, exports.assertTypeParameterInstantiation = function(node, opts = {}) {
    assert("TypeParameterInstantiation", node, opts);
  }, exports.assertUnionTypeAnnotation = function(node, opts = {}) {
    assert("UnionTypeAnnotation", node, opts);
  }, exports.assertVariance = function(node, opts = {}) {
    assert("Variance", node, opts);
  }, exports.assertVoidTypeAnnotation = function(node, opts = {}) {
    assert("VoidTypeAnnotation", node, opts);
  }, exports.assertEnumDeclaration = function(node, opts = {}) {
    assert("EnumDeclaration", node, opts);
  }, exports.assertEnumBooleanBody = function(node, opts = {}) {
    assert("EnumBooleanBody", node, opts);
  }, exports.assertEnumNumberBody = function(node, opts = {}) {
    assert("EnumNumberBody", node, opts);
  }, exports.assertEnumStringBody = function(node, opts = {}) {
    assert("EnumStringBody", node, opts);
  }, exports.assertEnumSymbolBody = function(node, opts = {}) {
    assert("EnumSymbolBody", node, opts);
  }, exports.assertEnumBooleanMember = function(node, opts = {}) {
    assert("EnumBooleanMember", node, opts);
  }, exports.assertEnumNumberMember = function(node, opts = {}) {
    assert("EnumNumberMember", node, opts);
  }, exports.assertEnumStringMember = function(node, opts = {}) {
    assert("EnumStringMember", node, opts);
  }, exports.assertEnumDefaultedMember = function(node, opts = {}) {
    assert("EnumDefaultedMember", node, opts);
  }, exports.assertJSXAttribute = function(node, opts = {}) {
    assert("JSXAttribute", node, opts);
  }, exports.assertJSXClosingElement = function(node, opts = {}) {
    assert("JSXClosingElement", node, opts);
  }, exports.assertJSXElement = function(node, opts = {}) {
    assert("JSXElement", node, opts);
  }, exports.assertJSXEmptyExpression = function(node, opts = {}) {
    assert("JSXEmptyExpression", node, opts);
  }, exports.assertJSXExpressionContainer = function(node, opts = {}) {
    assert("JSXExpressionContainer", node, opts);
  }, exports.assertJSXSpreadChild = function(node, opts = {}) {
    assert("JSXSpreadChild", node, opts);
  }, exports.assertJSXIdentifier = function(node, opts = {}) {
    assert("JSXIdentifier", node, opts);
  }, exports.assertJSXMemberExpression = function(node, opts = {}) {
    assert("JSXMemberExpression", node, opts);
  }, exports.assertJSXNamespacedName = function(node, opts = {}) {
    assert("JSXNamespacedName", node, opts);
  }, exports.assertJSXOpeningElement = function(node, opts = {}) {
    assert("JSXOpeningElement", node, opts);
  }, exports.assertJSXSpreadAttribute = function(node, opts = {}) {
    assert("JSXSpreadAttribute", node, opts);
  }, exports.assertJSXText = function(node, opts = {}) {
    assert("JSXText", node, opts);
  }, exports.assertJSXFragment = function(node, opts = {}) {
    assert("JSXFragment", node, opts);
  }, exports.assertJSXOpeningFragment = function(node, opts = {}) {
    assert("JSXOpeningFragment", node, opts);
  }, exports.assertJSXClosingFragment = function(node, opts = {}) {
    assert("JSXClosingFragment", node, opts);
  }, exports.assertNoop = function(node, opts = {}) {
    assert("Noop", node, opts);
  }, exports.assertPlaceholder = function(node, opts = {}) {
    assert("Placeholder", node, opts);
  }, exports.assertV8IntrinsicIdentifier = function(node, opts = {}) {
    assert("V8IntrinsicIdentifier", node, opts);
  }, exports.assertArgumentPlaceholder = function(node, opts = {}) {
    assert("ArgumentPlaceholder", node, opts);
  }, exports.assertAwaitExpression = function(node, opts = {}) {
    assert("AwaitExpression", node, opts);
  }, exports.assertBindExpression = function(node, opts = {}) {
    assert("BindExpression", node, opts);
  }, exports.assertClassProperty = function(node, opts = {}) {
    assert("ClassProperty", node, opts);
  }, exports.assertOptionalMemberExpression = function(node, opts = {}) {
    assert("OptionalMemberExpression", node, opts);
  }, exports.assertPipelineTopicExpression = function(node, opts = {}) {
    assert("PipelineTopicExpression", node, opts);
  }, exports.assertPipelineBareFunction = function(node, opts = {}) {
    assert("PipelineBareFunction", node, opts);
  }, exports.assertPipelinePrimaryTopicReference = function(node, opts = {}) {
    assert("PipelinePrimaryTopicReference", node, opts);
  }, exports.assertOptionalCallExpression = function(node, opts = {}) {
    assert("OptionalCallExpression", node, opts);
  }, exports.assertClassPrivateProperty = function(node, opts = {}) {
    assert("ClassPrivateProperty", node, opts);
  }, exports.assertClassPrivateMethod = function(node, opts = {}) {
    assert("ClassPrivateMethod", node, opts);
  }, exports.assertImport = function(node, opts = {}) {
    assert("Import", node, opts);
  }, exports.assertImportAttribute = function(node, opts = {}) {
    assert("ImportAttribute", node, opts);
  }, exports.assertDecorator = function(node, opts = {}) {
    assert("Decorator", node, opts);
  }, exports.assertDoExpression = function(node, opts = {}) {
    assert("DoExpression", node, opts);
  }, exports.assertExportDefaultSpecifier = function(node, opts = {}) {
    assert("ExportDefaultSpecifier", node, opts);
  }, exports.assertExportNamespaceSpecifier = function(node, opts = {}) {
    assert("ExportNamespaceSpecifier", node, opts);
  }, exports.assertPrivateName = function(node, opts = {}) {
    assert("PrivateName", node, opts);
  }, exports.assertBigIntLiteral = function(node, opts = {}) {
    assert("BigIntLiteral", node, opts);
  }, exports.assertRecordExpression = function(node, opts = {}) {
    assert("RecordExpression", node, opts);
  }, exports.assertTupleExpression = function(node, opts = {}) {
    assert("TupleExpression", node, opts);
  }, exports.assertTSParameterProperty = function(node, opts = {}) {
    assert("TSParameterProperty", node, opts);
  }, exports.assertTSDeclareFunction = function(node, opts = {}) {
    assert("TSDeclareFunction", node, opts);
  }, exports.assertTSDeclareMethod = function(node, opts = {}) {
    assert("TSDeclareMethod", node, opts);
  }, exports.assertTSQualifiedName = function(node, opts = {}) {
    assert("TSQualifiedName", node, opts);
  }, exports.assertTSCallSignatureDeclaration = function(node, opts = {}) {
    assert("TSCallSignatureDeclaration", node, opts);
  }, exports.assertTSConstructSignatureDeclaration = function(node, opts = {}) {
    assert("TSConstructSignatureDeclaration", node, opts);
  }, exports.assertTSPropertySignature = function(node, opts = {}) {
    assert("TSPropertySignature", node, opts);
  }, exports.assertTSMethodSignature = function(node, opts = {}) {
    assert("TSMethodSignature", node, opts);
  }, exports.assertTSIndexSignature = function(node, opts = {}) {
    assert("TSIndexSignature", node, opts);
  }, exports.assertTSAnyKeyword = function(node, opts = {}) {
    assert("TSAnyKeyword", node, opts);
  }, exports.assertTSBooleanKeyword = function(node, opts = {}) {
    assert("TSBooleanKeyword", node, opts);
  }, exports.assertTSBigIntKeyword = function(node, opts = {}) {
    assert("TSBigIntKeyword", node, opts);
  }, exports.assertTSNeverKeyword = function(node, opts = {}) {
    assert("TSNeverKeyword", node, opts);
  }, exports.assertTSNullKeyword = function(node, opts = {}) {
    assert("TSNullKeyword", node, opts);
  }, exports.assertTSNumberKeyword = function(node, opts = {}) {
    assert("TSNumberKeyword", node, opts);
  }, exports.assertTSObjectKeyword = function(node, opts = {}) {
    assert("TSObjectKeyword", node, opts);
  }, exports.assertTSStringKeyword = function(node, opts = {}) {
    assert("TSStringKeyword", node, opts);
  }, exports.assertTSSymbolKeyword = function(node, opts = {}) {
    assert("TSSymbolKeyword", node, opts);
  }, exports.assertTSUndefinedKeyword = function(node, opts = {}) {
    assert("TSUndefinedKeyword", node, opts);
  }, exports.assertTSUnknownKeyword = function(node, opts = {}) {
    assert("TSUnknownKeyword", node, opts);
  }, exports.assertTSVoidKeyword = function(node, opts = {}) {
    assert("TSVoidKeyword", node, opts);
  }, exports.assertTSThisType = function(node, opts = {}) {
    assert("TSThisType", node, opts);
  }, exports.assertTSFunctionType = function(node, opts = {}) {
    assert("TSFunctionType", node, opts);
  }, exports.assertTSConstructorType = function(node, opts = {}) {
    assert("TSConstructorType", node, opts);
  }, exports.assertTSTypeReference = function(node, opts = {}) {
    assert("TSTypeReference", node, opts);
  }, exports.assertTSTypePredicate = function(node, opts = {}) {
    assert("TSTypePredicate", node, opts);
  }, exports.assertTSTypeQuery = function(node, opts = {}) {
    assert("TSTypeQuery", node, opts);
  }, exports.assertTSTypeLiteral = function(node, opts = {}) {
    assert("TSTypeLiteral", node, opts);
  }, exports.assertTSArrayType = function(node, opts = {}) {
    assert("TSArrayType", node, opts);
  }, exports.assertTSTupleType = function(node, opts = {}) {
    assert("TSTupleType", node, opts);
  }, exports.assertTSOptionalType = function(node, opts = {}) {
    assert("TSOptionalType", node, opts);
  }, exports.assertTSRestType = function(node, opts = {}) {
    assert("TSRestType", node, opts);
  }, exports.assertTSUnionType = function(node, opts = {}) {
    assert("TSUnionType", node, opts);
  }, exports.assertTSIntersectionType = function(node, opts = {}) {
    assert("TSIntersectionType", node, opts);
  }, exports.assertTSConditionalType = function(node, opts = {}) {
    assert("TSConditionalType", node, opts);
  }, exports.assertTSInferType = function(node, opts = {}) {
    assert("TSInferType", node, opts);
  }, exports.assertTSParenthesizedType = function(node, opts = {}) {
    assert("TSParenthesizedType", node, opts);
  }, exports.assertTSTypeOperator = function(node, opts = {}) {
    assert("TSTypeOperator", node, opts);
  }, exports.assertTSIndexedAccessType = function(node, opts = {}) {
    assert("TSIndexedAccessType", node, opts);
  }, exports.assertTSMappedType = function(node, opts = {}) {
    assert("TSMappedType", node, opts);
  }, exports.assertTSLiteralType = function(node, opts = {}) {
    assert("TSLiteralType", node, opts);
  }, exports.assertTSExpressionWithTypeArguments = function(node, opts = {}) {
    assert("TSExpressionWithTypeArguments", node, opts);
  }, exports.assertTSInterfaceDeclaration = function(node, opts = {}) {
    assert("TSInterfaceDeclaration", node, opts);
  }, exports.assertTSInterfaceBody = function(node, opts = {}) {
    assert("TSInterfaceBody", node, opts);
  }, exports.assertTSTypeAliasDeclaration = function(node, opts = {}) {
    assert("TSTypeAliasDeclaration", node, opts);
  }, exports.assertTSAsExpression = function(node, opts = {}) {
    assert("TSAsExpression", node, opts);
  }, exports.assertTSTypeAssertion = function(node, opts = {}) {
    assert("TSTypeAssertion", node, opts);
  }, exports.assertTSEnumDeclaration = function(node, opts = {}) {
    assert("TSEnumDeclaration", node, opts);
  }, exports.assertTSEnumMember = function(node, opts = {}) {
    assert("TSEnumMember", node, opts);
  }, exports.assertTSModuleDeclaration = function(node, opts = {}) {
    assert("TSModuleDeclaration", node, opts);
  }, exports.assertTSModuleBlock = function(node, opts = {}) {
    assert("TSModuleBlock", node, opts);
  }, exports.assertTSImportType = function(node, opts = {}) {
    assert("TSImportType", node, opts);
  }, exports.assertTSImportEqualsDeclaration = function(node, opts = {}) {
    assert("TSImportEqualsDeclaration", node, opts);
  }, exports.assertTSExternalModuleReference = function(node, opts = {}) {
    assert("TSExternalModuleReference", node, opts);
  }, exports.assertTSNonNullExpression = function(node, opts = {}) {
    assert("TSNonNullExpression", node, opts);
  }, exports.assertTSExportAssignment = function(node, opts = {}) {
    assert("TSExportAssignment", node, opts);
  }, exports.assertTSNamespaceExportDeclaration = function(node, opts = {}) {
    assert("TSNamespaceExportDeclaration", node, opts);
  }, exports.assertTSTypeAnnotation = function(node, opts = {}) {
    assert("TSTypeAnnotation", node, opts);
  }, exports.assertTSTypeParameterInstantiation = function(node, opts = {}) {
    assert("TSTypeParameterInstantiation", node, opts);
  }, exports.assertTSTypeParameterDeclaration = function(node, opts = {}) {
    assert("TSTypeParameterDeclaration", node, opts);
  }, exports.assertTSTypeParameter = function(node, opts = {}) {
    assert("TSTypeParameter", node, opts);
  }, exports.assertExpression = function(node, opts = {}) {
    assert("Expression", node, opts);
  }, exports.assertBinary = function(node, opts = {}) {
    assert("Binary", node, opts);
  }, exports.assertScopable = function(node, opts = {}) {
    assert("Scopable", node, opts);
  }, exports.assertBlockParent = function(node, opts = {}) {
    assert("BlockParent", node, opts);
  }, exports.assertBlock = function(node, opts = {}) {
    assert("Block", node, opts);
  }, exports.assertStatement = function(node, opts = {}) {
    assert("Statement", node, opts);
  }, exports.assertTerminatorless = function(node, opts = {}) {
    assert("Terminatorless", node, opts);
  }, exports.assertCompletionStatement = function(node, opts = {}) {
    assert("CompletionStatement", node, opts);
  }, exports.assertConditional = function(node, opts = {}) {
    assert("Conditional", node, opts);
  }, exports.assertLoop = function(node, opts = {}) {
    assert("Loop", node, opts);
  }, exports.assertWhile = function(node, opts = {}) {
    assert("While", node, opts);
  }, exports.assertExpressionWrapper = function(node, opts = {}) {
    assert("ExpressionWrapper", node, opts);
  }, exports.assertFor = function(node, opts = {}) {
    assert("For", node, opts);
  }, exports.assertForXStatement = function(node, opts = {}) {
    assert("ForXStatement", node, opts);
  }, exports.assertFunction = function(node, opts = {}) {
    assert("Function", node, opts);
  }, exports.assertFunctionParent = function(node, opts = {}) {
    assert("FunctionParent", node, opts);
  }, exports.assertPureish = function(node, opts = {}) {
    assert("Pureish", node, opts);
  }, exports.assertDeclaration = function(node, opts = {}) {
    assert("Declaration", node, opts);
  }, exports.assertPatternLike = function(node, opts = {}) {
    assert("PatternLike", node, opts);
  }, exports.assertLVal = function(node, opts = {}) {
    assert("LVal", node, opts);
  }, exports.assertTSEntityName = function(node, opts = {}) {
    assert("TSEntityName", node, opts);
  }, exports.assertLiteral = function(node, opts = {}) {
    assert("Literal", node, opts);
  }, exports.assertImmutable = function(node, opts = {}) {
    assert("Immutable", node, opts);
  }, exports.assertUserWhitespacable = function(node, opts = {}) {
    assert("UserWhitespacable", node, opts);
  }, exports.assertMethod = function(node, opts = {}) {
    assert("Method", node, opts);
  }, exports.assertObjectMember = function(node, opts = {}) {
    assert("ObjectMember", node, opts);
  }, exports.assertProperty = function(node, opts = {}) {
    assert("Property", node, opts);
  }, exports.assertUnaryLike = function(node, opts = {}) {
    assert("UnaryLike", node, opts);
  }, exports.assertPattern = function(node, opts = {}) {
    assert("Pattern", node, opts);
  }, exports.assertClass = function(node, opts = {}) {
    assert("Class", node, opts);
  }, exports.assertModuleDeclaration = function(node, opts = {}) {
    assert("ModuleDeclaration", node, opts);
  }, exports.assertExportDeclaration = function(node, opts = {}) {
    assert("ExportDeclaration", node, opts);
  }, exports.assertModuleSpecifier = function(node, opts = {}) {
    assert("ModuleSpecifier", node, opts);
  }, exports.assertFlow = function(node, opts = {}) {
    assert("Flow", node, opts);
  }, exports.assertFlowType = function(node, opts = {}) {
    assert("FlowType", node, opts);
  }, exports.assertFlowBaseAnnotation = function(node, opts = {}) {
    assert("FlowBaseAnnotation", node, opts);
  }, exports.assertFlowDeclaration = function(node, opts = {}) {
    assert("FlowDeclaration", node, opts);
  }, exports.assertFlowPredicate = function(node, opts = {}) {
    assert("FlowPredicate", node, opts);
  }, exports.assertEnumBody = function(node, opts = {}) {
    assert("EnumBody", node, opts);
  }, exports.assertEnumMember = function(node, opts = {}) {
    assert("EnumMember", node, opts);
  }, exports.assertJSX = function(node, opts = {}) {
    assert("JSX", node, opts);
  }, exports.assertPrivate = function(node, opts = {}) {
    assert("Private", node, opts);
  }, exports.assertTSTypeElement = function(node, opts = {}) {
    assert("TSTypeElement", node, opts);
  }, exports.assertTSType = function(node, opts = {}) {
    assert("TSType", node, opts);
  }, exports.assertTSBaseType = function(node, opts = {}) {
    assert("TSBaseType", node, opts);
  }, exports.assertNumberLiteral = function(node, opts) {
    console.trace("The node type NumberLiteral has been renamed to NumericLiteral"), 
    assert("NumberLiteral", node, opts);
  }, exports.assertRegexLiteral = function(node, opts) {
    console.trace("The node type RegexLiteral has been renamed to RegExpLiteral"), assert("RegexLiteral", node, opts);
  }, exports.assertRestProperty = function(node, opts) {
    console.trace("The node type RestProperty has been renamed to RestElement"), assert("RestProperty", node, opts);
  }, exports.assertSpreadProperty = function(node, opts) {
    console.trace("The node type SpreadProperty has been renamed to SpreadElement"), 
    assert("SpreadProperty", node, opts);
  };
  var obj, _is = (obj = __webpack_require__(90)) && obj.__esModule ? obj : {
    default: obj
  };
  function assert(type, node, opts) {
    if (!(0, _is.default)(type, node, opts)) throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, but instead got "${node.type}".`);
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(type) {
    if ("string" === type) return (0, _generated.stringTypeAnnotation)();
    if ("number" === type) return (0, _generated.numberTypeAnnotation)();
    if ("undefined" === type) return (0, _generated.voidTypeAnnotation)();
    if ("boolean" === type) return (0, _generated.booleanTypeAnnotation)();
    if ("function" === type) return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Function"));
    if ("object" === type) return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Object"));
    if ("symbol" === type) return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Symbol"));
    throw new Error("Invalid typeof value");
  };
  var _generated = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(types) {
    const flattened = (0, _removeTypeDuplicates.default)(types);
    return 1 === flattened.length ? flattened[0] : (0, _generated.unionTypeAnnotation)(flattened);
  };
  var obj, _generated = __webpack_require__(11), _removeTypeDuplicates = (obj = __webpack_require__(246)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(typeAnnotations) {
    const types = typeAnnotations.map(type => type.typeAnnotations), flattened = (0, 
    _removeTypeDuplicates.default)(types);
    return 1 === flattened.length ? flattened[0] : (0, _generated.tsUnionType)(flattened);
  };
  var obj, _generated = __webpack_require__(11), _removeTypeDuplicates = (obj = __webpack_require__(367)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(nodes) {
    const generics = {}, bases = {}, typeGroups = [], types = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node && !(types.indexOf(node) >= 0)) {
        if ((0, _generated.isTSAnyKeyword)(node.type)) return [ node ];
        (0, _generated.isTSBaseType)(node) ? bases[node.type] = node : (0, _generated.isTSUnionType)(node) ? typeGroups.indexOf(node.types) < 0 && (nodes = nodes.concat(node.types), 
        typeGroups.push(node.types)) : types.push(node);
      }
    }
    for (const type of Object.keys(bases)) types.push(bases[type]);
    for (const name of Object.keys(generics)) types.push(generics[name]);
    return types;
  };
  var _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _cloneNode.default)(node, !1);
  };
  var obj, _cloneNode = (obj = __webpack_require__(45)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _cloneNode.default)(node);
  };
  var obj, _cloneNode = (obj = __webpack_require__(45)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _cloneNode.default)(node, !0, !0);
  };
  var obj, _cloneNode = (obj = __webpack_require__(45)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _cloneNode.default)(node, !1, !0);
  };
  var obj, _cloneNode = (obj = __webpack_require__(45)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, type, content, line) {
    return (0, _addComments.default)(node, type, [ {
      type: line ? "CommentLine" : "CommentBlock",
      value: content
    } ]);
  };
  var obj, _addComments = (obj = __webpack_require__(247)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return _constants.COMMENT_KEYS.forEach(key => {
      node[key] = null;
    }), node;
  };
  var _constants = __webpack_require__(44);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.TSBASETYPE_TYPES = exports.TSTYPE_TYPES = exports.TSTYPEELEMENT_TYPES = exports.PRIVATE_TYPES = exports.JSX_TYPES = exports.ENUMMEMBER_TYPES = exports.ENUMBODY_TYPES = exports.FLOWPREDICATE_TYPES = exports.FLOWDECLARATION_TYPES = exports.FLOWBASEANNOTATION_TYPES = exports.FLOWTYPE_TYPES = exports.FLOW_TYPES = exports.MODULESPECIFIER_TYPES = exports.EXPORTDECLARATION_TYPES = exports.MODULEDECLARATION_TYPES = exports.CLASS_TYPES = exports.PATTERN_TYPES = exports.UNARYLIKE_TYPES = exports.PROPERTY_TYPES = exports.OBJECTMEMBER_TYPES = exports.METHOD_TYPES = exports.USERWHITESPACABLE_TYPES = exports.IMMUTABLE_TYPES = exports.LITERAL_TYPES = exports.TSENTITYNAME_TYPES = exports.LVAL_TYPES = exports.PATTERNLIKE_TYPES = exports.DECLARATION_TYPES = exports.PUREISH_TYPES = exports.FUNCTIONPARENT_TYPES = exports.FUNCTION_TYPES = exports.FORXSTATEMENT_TYPES = exports.FOR_TYPES = exports.EXPRESSIONWRAPPER_TYPES = exports.WHILE_TYPES = exports.LOOP_TYPES = exports.CONDITIONAL_TYPES = exports.COMPLETIONSTATEMENT_TYPES = exports.TERMINATORLESS_TYPES = exports.STATEMENT_TYPES = exports.BLOCK_TYPES = exports.BLOCKPARENT_TYPES = exports.SCOPABLE_TYPES = exports.BINARY_TYPES = exports.EXPRESSION_TYPES = void 0;
  var _definitions = __webpack_require__(12);
  const EXPRESSION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Expression;
  exports.EXPRESSION_TYPES = EXPRESSION_TYPES;
  const BINARY_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Binary;
  exports.BINARY_TYPES = BINARY_TYPES;
  const SCOPABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Scopable;
  exports.SCOPABLE_TYPES = SCOPABLE_TYPES;
  const BLOCKPARENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.BlockParent;
  exports.BLOCKPARENT_TYPES = BLOCKPARENT_TYPES;
  const BLOCK_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Block;
  exports.BLOCK_TYPES = BLOCK_TYPES;
  const STATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Statement;
  exports.STATEMENT_TYPES = STATEMENT_TYPES;
  const TERMINATORLESS_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Terminatorless;
  exports.TERMINATORLESS_TYPES = TERMINATORLESS_TYPES;
  const COMPLETIONSTATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.CompletionStatement;
  exports.COMPLETIONSTATEMENT_TYPES = COMPLETIONSTATEMENT_TYPES;
  const CONDITIONAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Conditional;
  exports.CONDITIONAL_TYPES = CONDITIONAL_TYPES;
  const LOOP_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Loop;
  exports.LOOP_TYPES = LOOP_TYPES;
  const WHILE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.While;
  exports.WHILE_TYPES = WHILE_TYPES;
  const EXPRESSIONWRAPPER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ExpressionWrapper;
  exports.EXPRESSIONWRAPPER_TYPES = EXPRESSIONWRAPPER_TYPES;
  const FOR_TYPES = _definitions.FLIPPED_ALIAS_KEYS.For;
  exports.FOR_TYPES = FOR_TYPES;
  const FORXSTATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ForXStatement;
  exports.FORXSTATEMENT_TYPES = FORXSTATEMENT_TYPES;
  const FUNCTION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Function;
  exports.FUNCTION_TYPES = FUNCTION_TYPES;
  const FUNCTIONPARENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FunctionParent;
  exports.FUNCTIONPARENT_TYPES = FUNCTIONPARENT_TYPES;
  const PUREISH_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Pureish;
  exports.PUREISH_TYPES = PUREISH_TYPES;
  const DECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Declaration;
  exports.DECLARATION_TYPES = DECLARATION_TYPES;
  const PATTERNLIKE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.PatternLike;
  exports.PATTERNLIKE_TYPES = PATTERNLIKE_TYPES;
  const LVAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS.LVal;
  exports.LVAL_TYPES = LVAL_TYPES;
  const TSENTITYNAME_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSEntityName;
  exports.TSENTITYNAME_TYPES = TSENTITYNAME_TYPES;
  const LITERAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Literal;
  exports.LITERAL_TYPES = LITERAL_TYPES;
  const IMMUTABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Immutable;
  exports.IMMUTABLE_TYPES = IMMUTABLE_TYPES;
  const USERWHITESPACABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.UserWhitespacable;
  exports.USERWHITESPACABLE_TYPES = USERWHITESPACABLE_TYPES;
  const METHOD_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Method;
  exports.METHOD_TYPES = METHOD_TYPES;
  const OBJECTMEMBER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ObjectMember;
  exports.OBJECTMEMBER_TYPES = OBJECTMEMBER_TYPES;
  const PROPERTY_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Property;
  exports.PROPERTY_TYPES = PROPERTY_TYPES;
  const UNARYLIKE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.UnaryLike;
  exports.UNARYLIKE_TYPES = UNARYLIKE_TYPES;
  const PATTERN_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Pattern;
  exports.PATTERN_TYPES = PATTERN_TYPES;
  const CLASS_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Class;
  exports.CLASS_TYPES = CLASS_TYPES;
  const MODULEDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ModuleDeclaration;
  exports.MODULEDECLARATION_TYPES = MODULEDECLARATION_TYPES;
  const EXPORTDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ExportDeclaration;
  exports.EXPORTDECLARATION_TYPES = EXPORTDECLARATION_TYPES;
  const MODULESPECIFIER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ModuleSpecifier;
  exports.MODULESPECIFIER_TYPES = MODULESPECIFIER_TYPES;
  const FLOW_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Flow;
  exports.FLOW_TYPES = FLOW_TYPES;
  const FLOWTYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowType;
  exports.FLOWTYPE_TYPES = FLOWTYPE_TYPES;
  const FLOWBASEANNOTATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowBaseAnnotation;
  exports.FLOWBASEANNOTATION_TYPES = FLOWBASEANNOTATION_TYPES;
  const FLOWDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowDeclaration;
  exports.FLOWDECLARATION_TYPES = FLOWDECLARATION_TYPES;
  const FLOWPREDICATE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowPredicate;
  exports.FLOWPREDICATE_TYPES = FLOWPREDICATE_TYPES;
  const ENUMBODY_TYPES = _definitions.FLIPPED_ALIAS_KEYS.EnumBody;
  exports.ENUMBODY_TYPES = ENUMBODY_TYPES;
  const ENUMMEMBER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.EnumMember;
  exports.ENUMMEMBER_TYPES = ENUMMEMBER_TYPES;
  const JSX_TYPES = _definitions.FLIPPED_ALIAS_KEYS.JSX;
  exports.JSX_TYPES = JSX_TYPES;
  const PRIVATE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Private;
  exports.PRIVATE_TYPES = PRIVATE_TYPES;
  const TSTYPEELEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSTypeElement;
  exports.TSTYPEELEMENT_TYPES = TSTYPEELEMENT_TYPES;
  const TSTYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSType;
  exports.TSTYPE_TYPES = TSTYPE_TYPES;
  const TSBASETYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSBaseType;
  exports.TSBASETYPE_TYPES = TSBASETYPE_TYPES;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, key = "body") {
    return node[key] = (0, _toBlock.default)(node[key], node);
  };
  var obj, _toBlock = (obj = __webpack_require__(252)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(name) {
    "eval" !== (name = (0, _toIdentifier.default)(name)) && "arguments" !== name || (name = "_" + name);
    return name;
  };
  var obj, _toIdentifier = (obj = __webpack_require__(253)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, key = node.key || node.property) {
    !node.computed && (0, _generated.isIdentifier)(key) && (key = (0, _generated2.stringLiteral)(key.name));
    return key;
  };
  var _generated = __webpack_require__(4), _generated2 = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    (0, _generated.isExpressionStatement)(node) && (node = node.expression);
    if ((0, _generated.isExpression)(node)) return node;
    (0, _generated.isClass)(node) ? node.type = "ClassExpression" : (0, _generated.isFunction)(node) && (node.type = "FunctionExpression");
    if (!(0, _generated.isExpression)(node)) throw new Error(`cannot turn ${node.type} to an expression`);
    return node;
  };
  var _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = toKeyAlias;
  var _generated = __webpack_require__(4), _cloneNode = _interopRequireDefault(__webpack_require__(45)), _removePropertiesDeep = _interopRequireDefault(__webpack_require__(254));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function toKeyAlias(node, key = node.key) {
    let alias;
    return "method" === node.kind ? toKeyAlias.increment() + "" : (alias = (0, _generated.isIdentifier)(key) ? key.name : (0, 
    _generated.isStringLiteral)(key) ? JSON.stringify(key.value) : JSON.stringify((0, 
    _removePropertiesDeep.default)((0, _cloneNode.default)(key))), node.computed && (alias = `[${alias}]`), 
    node.static && (alias = "static:" + alias), alias);
  }
  toKeyAlias.uid = 0, toKeyAlias.increment = function() {
    return toKeyAlias.uid >= Number.MAX_SAFE_INTEGER ? toKeyAlias.uid = 0 : toKeyAlias.uid++;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(nodes, scope) {
    if (!(null == nodes ? void 0 : nodes.length)) return;
    const declars = [], result = (0, _gatherSequenceExpressions.default)(nodes, scope, declars);
    if (!result) return;
    for (const declar of declars) scope.push(declar);
    return result;
  };
  var obj, _gatherSequenceExpressions = (obj = __webpack_require__(381)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function gatherSequenceExpressions(nodes, scope, declars) {
    const exprs = [];
    let ensureLastUndefined = !0;
    for (const node of nodes) if ((0, _generated.isEmptyStatement)(node) || (ensureLastUndefined = !1), 
    (0, _generated.isExpression)(node)) exprs.push(node); else if ((0, _generated.isExpressionStatement)(node)) exprs.push(node.expression); else if ((0, 
    _generated.isVariableDeclaration)(node)) {
      if ("var" !== node.kind) return;
      for (const declar of node.declarations) {
        const bindings = (0, _getBindingIdentifiers.default)(declar);
        for (const key of Object.keys(bindings)) declars.push({
          kind: node.kind,
          id: (0, _cloneNode.default)(bindings[key])
        });
        declar.init && exprs.push((0, _generated2.assignmentExpression)("=", declar.id, declar.init));
      }
      ensureLastUndefined = !0;
    } else if ((0, _generated.isIfStatement)(node)) {
      const consequent = node.consequent ? gatherSequenceExpressions([ node.consequent ], scope, declars) : scope.buildUndefinedNode(), alternate = node.alternate ? gatherSequenceExpressions([ node.alternate ], scope, declars) : scope.buildUndefinedNode();
      if (!consequent || !alternate) return;
      exprs.push((0, _generated2.conditionalExpression)(node.test, consequent, alternate));
    } else if ((0, _generated.isBlockStatement)(node)) {
      const body = gatherSequenceExpressions(node.body, scope, declars);
      if (!body) return;
      exprs.push(body);
    } else {
      if (!(0, _generated.isEmptyStatement)(node)) return;
      0 === nodes.indexOf(node) && (ensureLastUndefined = !0);
    }
    ensureLastUndefined && exprs.push(scope.buildUndefinedNode());
    return 1 === exprs.length ? exprs[0] : (0, _generated2.sequenceExpression)(exprs);
  };
  var _getBindingIdentifiers = _interopRequireDefault(__webpack_require__(103)), _generated = __webpack_require__(4), _generated2 = __webpack_require__(11), _cloneNode = _interopRequireDefault(__webpack_require__(45));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, ignore) {
    if ((0, _generated.isStatement)(node)) return node;
    let newType, mustHaveId = !1;
    if ((0, _generated.isClass)(node)) mustHaveId = !0, newType = "ClassDeclaration"; else if ((0, 
    _generated.isFunction)(node)) mustHaveId = !0, newType = "FunctionDeclaration"; else if ((0, 
    _generated.isAssignmentExpression)(node)) return (0, _generated2.expressionStatement)(node);
    mustHaveId && !node.id && (newType = !1);
    if (!newType) {
      if (ignore) return !1;
      throw new Error(`cannot turn ${node.type} to a statement`);
    }
    return node.type = newType, node;
  };
  var _generated = __webpack_require__(4), _generated2 = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function valueToNode(value) {
    if (void 0 === value) return (0, _generated.identifier)("undefined");
    if (!0 === value || !1 === value) return (0, _generated.booleanLiteral)(value);
    if (null === value) return (0, _generated.nullLiteral)();
    if ("string" == typeof value) return (0, _generated.stringLiteral)(value);
    if ("number" == typeof value) {
      let result;
      if (Number.isFinite(value)) result = (0, _generated.numericLiteral)(Math.abs(value)); else {
        let numerator;
        numerator = Number.isNaN(value) ? (0, _generated.numericLiteral)(0) : (0, _generated.numericLiteral)(1), 
        result = (0, _generated.binaryExpression)("/", numerator, (0, _generated.numericLiteral)(0));
      }
      return (value < 0 || Object.is(value, -0)) && (result = (0, _generated.unaryExpression)("-", result)), 
      result;
    }
    if ((0, _isRegExp.default)(value)) {
      const pattern = value.source, flags = value.toString().match(/\/([a-z]+|)$/)[1];
      return (0, _generated.regExpLiteral)(pattern, flags);
    }
    if (Array.isArray(value)) return (0, _generated.arrayExpression)(value.map(valueToNode));
    if ((0, _isPlainObject.default)(value)) {
      const props = [];
      for (const key of Object.keys(value)) {
        let nodeKey;
        nodeKey = (0, _isValidIdentifier.default)(key) ? (0, _generated.identifier)(key) : (0, 
        _generated.stringLiteral)(key), props.push((0, _generated.objectProperty)(nodeKey, valueToNode(value[key])));
      }
      return (0, _generated.objectExpression)(props);
    }
    throw new Error("don't know how to turn this value into a node");
  };
  var _isPlainObject = _interopRequireDefault(__webpack_require__(384)), _isRegExp = _interopRequireDefault(__webpack_require__(385)), _isValidIdentifier = _interopRequireDefault(__webpack_require__(91)), _generated = __webpack_require__(11);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), getPrototype = __webpack_require__(57), isObjectLike = __webpack_require__(3), funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, objectCtorString = funcToString.call(Object);
  module.exports = function(value) {
    if (!isObjectLike(value) || "[object Object]" != baseGetTag(value)) return !1;
    var proto = getPrototype(value);
    if (null === proto) return !0;
    var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  };
}, function(module, exports, __webpack_require__) {
  var baseIsRegExp = __webpack_require__(386), baseUnary = __webpack_require__(15), nodeUtil = __webpack_require__(18), nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
  module.exports = isRegExp;
}, function(module, exports, __webpack_require__) {
  var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(3);
  module.exports = function(value) {
    return isObjectLike(value) && "[object RegExp]" == baseGetTag(value);
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(member, append, computed = !1) {
    return member.object = (0, _generated.memberExpression)(member.object, member.property, member.computed), 
    member.property = append, member.computed = !!computed, member;
  };
  var _generated = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(child, parent) {
    if (!child || !parent) return child;
    for (const key of _constants.INHERIT_KEYS.optional) null == child[key] && (child[key] = parent[key]);
    for (const key of Object.keys(parent)) "_" === key[0] && "__clone" !== key && (child[key] = parent[key]);
    for (const key of _constants.INHERIT_KEYS.force) child[key] = parent[key];
    return (0, _inheritsComments.default)(child, parent), child;
  };
  var obj, _constants = __webpack_require__(44), _inheritsComments = (obj = __webpack_require__(250)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(member, prepend) {
    return member.object = (0, _generated.memberExpression)(prepend, member.object), 
    member;
  };
  var _generated = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, duplicates) {
    return (0, _getBindingIdentifiers.default)(node, duplicates, !0);
  };
  var obj, _getBindingIdentifiers = (obj = __webpack_require__(103)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, handlers, state) {
    "function" == typeof handlers && (handlers = {
      enter: handlers
    });
    const {enter: enter, exit: exit} = handlers;
    !function traverseSimpleImpl(node, enter, exit, state, ancestors) {
      const keys = _definitions.VISITOR_KEYS[node.type];
      if (!keys) return;
      enter && enter(node, ancestors, state);
      for (const key of keys) {
        const subNode = node[key];
        if (Array.isArray(subNode)) for (let i = 0; i < subNode.length; i++) {
          const child = subNode[i];
          child && (ancestors.push({
            node: node,
            key: key,
            index: i
          }), traverseSimpleImpl(child, enter, exit, state, ancestors), ancestors.pop());
        } else subNode && (ancestors.push({
          node: node,
          key: key
        }), traverseSimpleImpl(subNode, enter, exit, state, ancestors), ancestors.pop());
      }
      exit && exit(node, ancestors, state);
    }(node, enter, exit, state, []);
  };
  var _definitions = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, parent, grandparent) {
    if (grandparent && "Identifier" === node.type && "ObjectProperty" === parent.type && "ObjectExpression" === grandparent.type) return !1;
    const keys = _getBindingIdentifiers.default.keys[parent.type];
    if (keys) for (let i = 0; i < keys.length; i++) {
      const key = keys[i], val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0) return !0;
      } else if (val === node) return !0;
    }
    return !1;
  };
  var obj, _getBindingIdentifiers = (obj = __webpack_require__(103)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _generated.isFunctionDeclaration)(node) || (0, _generated.isClassDeclaration)(node) || (0, 
    _isLet.default)(node);
  };
  var obj, _generated = __webpack_require__(4), _isLet = (obj = __webpack_require__(257)) && obj.__esModule ? obj : {
    default: obj
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    if ((0, _isType.default)(node.type, "Immutable")) return !0;
    if ((0, _generated.isIdentifier)(node)) return "undefined" === node.name;
    return !1;
  };
  var obj, _isType = (obj = __webpack_require__(211)) && obj.__esModule ? obj : {
    default: obj
  }, _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function isNodesEquivalent(a, b) {
    if ("object" != typeof a || "object" != typeof b || null == a || null == b) return a === b;
    if (a.type !== b.type) return !1;
    const fields = Object.keys(_definitions.NODE_FIELDS[a.type] || a.type), visitorKeys = _definitions.VISITOR_KEYS[a.type];
    for (const field of fields) {
      if (typeof a[field] != typeof b[field]) return !1;
      if (null != a[field] || null != b[field]) {
        if (null == a[field] || null == b[field]) return !1;
        if (Array.isArray(a[field])) {
          if (!Array.isArray(b[field])) return !1;
          if (a[field].length !== b[field].length) return !1;
          for (let i = 0; i < a[field].length; i++) if (!isNodesEquivalent(a[field][i], b[field][i])) return !1;
        } else if ("object" != typeof a[field] || (null == visitorKeys ? void 0 : visitorKeys.includes(field))) {
          if (!isNodesEquivalent(a[field], b[field])) return !1;
        } else for (const key of Object.keys(a[field])) if (a[field][key] !== b[field][key]) return !1;
      }
    }
    return !0;
  };
  var _definitions = __webpack_require__(12);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, parent, grandparent) {
    switch (parent.type) {
     case "MemberExpression":
     case "JSXMemberExpression":
     case "OptionalMemberExpression":
      return parent.property === node ? !!parent.computed : parent.object === node;

     case "VariableDeclarator":
      return parent.init === node;

     case "ArrowFunctionExpression":
      return parent.body === node;

     case "ExportSpecifier":
      return !parent.source && parent.local === node;

     case "PrivateName":
      return !1;

     case "ClassMethod":
     case "ClassPrivateMethod":
     case "ObjectMethod":
      if (parent.params.includes(node)) return !1;

     case "ObjectProperty":
     case "ClassProperty":
     case "ClassPrivateProperty":
      return parent.key === node ? !!parent.computed : parent.value !== node || (!grandparent || "ObjectPattern" !== grandparent.type);

     case "ClassDeclaration":
     case "ClassExpression":
      return parent.superClass === node;

     case "AssignmentExpression":
     case "AssignmentPattern":
      return parent.right === node;

     case "LabeledStatement":
     case "CatchClause":
     case "RestElement":
      return !1;

     case "BreakStatement":
     case "ContinueStatement":
      return !1;

     case "FunctionDeclaration":
     case "FunctionExpression":
      return !1;

     case "ExportNamespaceSpecifier":
     case "ExportDefaultSpecifier":
      return !1;

     case "ImportDefaultSpecifier":
     case "ImportNamespaceSpecifier":
     case "ImportSpecifier":
     case "JSXAttribute":
      return !1;

     case "ObjectPattern":
     case "ArrayPattern":
     case "MetaProperty":
      return !1;

     case "ObjectTypeProperty":
      return parent.key !== node;

     case "TSEnumMember":
      return parent.id !== node;

     case "TSPropertySignature":
      return parent.key !== node || !!parent.computed;
    }
    return !0;
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node, parent) {
    if ((0, _generated.isBlockStatement)(node) && (0, _generated.isFunction)(parent, {
      body: node
    })) return !1;
    if ((0, _generated.isBlockStatement)(node) && (0, _generated.isCatchClause)(parent, {
      body: node
    })) return !1;
    if ((0, _generated.isPattern)(node) && (0, _generated.isFunction)(parent)) return !0;
    return (0, _generated.isScopable)(node);
  };
  var _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(specifier) {
    return (0, _generated.isImportDefaultSpecifier)(specifier) || (0, _generated.isIdentifier)(specifier.imported || specifier.exported, {
      name: "default"
    });
  };
  var _generated = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(name) {
    return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
  };
  var obj, _isValidIdentifier = (obj = __webpack_require__(91)) && obj.__esModule ? obj : {
    default: obj
  };
  const RESERVED_WORDS_ES3_ONLY = new Set([ "abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile" ]);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(node) {
    return (0, _generated.isVariableDeclaration)(node, {
      kind: "var"
    }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
  };
  var _generated = __webpack_require__(4), _constants = __webpack_require__(44);
} ]);