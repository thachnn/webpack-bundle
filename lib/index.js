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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 238);
}([ function(module, exports) {
  module.exports = require("../lib/types");
}, function(module, exports) {
  module.exports = require("../lib/plugin-utils");
}, , , , , , , , , function(module, exports) {
  module.exports = require("assert");
}, , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(path) {
    const {sourceType: sourceType} = path.node;
    if ("module" !== sourceType && "script" !== sourceType) throw path.buildCodeFrameError(`Unknown sourceType "${sourceType}", cannot transform.`);
    return "module" === path.node.sourceType;
  };
}, , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.addDefault = function(path, importedSource, opts) {
    return new _importInjector.default(path).addDefault(importedSource, opts);
  }, exports.addNamed = function(path, name, importedSource, opts) {
    return new _importInjector.default(path).addNamed(name, importedSource, opts);
  }, exports.addNamespace = function(path, importedSource, opts) {
    return new _importInjector.default(path).addNamespace(importedSource, opts);
  }, exports.addSideEffect = function(path, importedSource, opts) {
    return new _importInjector.default(path).addSideEffect(importedSource, opts);
  }, Object.defineProperty(exports, "ImportInjector", {
    enumerable: !0,
    get: function() {
      return _importInjector.default;
    }
  }), Object.defineProperty(exports, "isModule", {
    enumerable: !0,
    get: function() {
      return _isModule.default;
    }
  });
  var _importInjector = _interopRequireDefault(__webpack_require__(55)), _isModule = _interopRequireDefault(__webpack_require__(33));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _assert = _interopRequireDefault(__webpack_require__(10)), t = function(obj) {
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
  }(__webpack_require__(0)), _importBuilder = _interopRequireDefault(__webpack_require__(56)), _isModule = _interopRequireDefault(__webpack_require__(33));
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
  exports.default = class {
    constructor(path, importedSource, opts) {
      this._defaultOpts = {
        importedSource: null,
        importedType: "commonjs",
        importedInterop: "babel",
        importingInterop: "babel",
        ensureLiveReference: !1,
        ensureNoContext: !1
      };
      const programPath = path.find(p => p.isProgram());
      this._programPath = programPath, this._programScope = programPath.scope, this._hub = programPath.hub, 
      this._defaultOpts = this._applyDefaults(importedSource, opts, !0);
    }
    addDefault(importedSourceIn, opts) {
      return this.addNamed("default", importedSourceIn, opts);
    }
    addNamed(importName, importedSourceIn, opts) {
      return (0, _assert.default)("string" == typeof importName), this._generateImport(this._applyDefaults(importedSourceIn, opts), importName);
    }
    addNamespace(importedSourceIn, opts) {
      return this._generateImport(this._applyDefaults(importedSourceIn, opts), null);
    }
    addSideEffect(importedSourceIn, opts) {
      return this._generateImport(this._applyDefaults(importedSourceIn, opts), !1);
    }
    _applyDefaults(importedSource, opts, isInit = !1) {
      const optsList = [];
      "string" == typeof importedSource ? (optsList.push({
        importedSource: importedSource
      }), optsList.push(opts)) : ((0, _assert.default)(!opts, "Unexpected secondary arguments."), 
      optsList.push(importedSource));
      const newOpts = Object.assign({}, this._defaultOpts);
      for (const opts of optsList) opts && (Object.keys(newOpts).forEach(key => {
        void 0 !== opts[key] && (newOpts[key] = opts[key]);
      }), isInit || (void 0 !== opts.nameHint && (newOpts.nameHint = opts.nameHint), void 0 !== opts.blockHoist && (newOpts.blockHoist = opts.blockHoist)));
      return newOpts;
    }
    _generateImport(opts, importName) {
      const isDefault = "default" === importName, isNamed = !!importName && !isDefault, isNamespace = null === importName, {importedSource: importedSource, importedType: importedType, importedInterop: importedInterop, importingInterop: importingInterop, ensureLiveReference: ensureLiveReference, ensureNoContext: ensureNoContext, nameHint: nameHint, blockHoist: blockHoist} = opts;
      let name = nameHint || importName;
      const isMod = (0, _isModule.default)(this._programPath), isModuleForNode = isMod && "node" === importingInterop, isModuleForBabel = isMod && "babel" === importingInterop, builder = new _importBuilder.default(importedSource, this._programScope, this._hub);
      if ("es6" === importedType) {
        if (!isModuleForNode && !isModuleForBabel) throw new Error("Cannot import an ES6 module from CommonJS");
        builder.import(), isNamespace ? builder.namespace(nameHint || importedSource) : (isDefault || isNamed) && builder.named(name, importName);
      } else {
        if ("commonjs" !== importedType) throw new Error(`Unexpected interopType "${importedType}"`);
        if ("babel" === importedInterop) if (isModuleForNode) {
          name = "default" !== name ? name : importedSource;
          const es6Default = importedSource + "$es6Default";
          builder.import(), isNamespace ? builder.default(es6Default).var(name || importedSource).wildcardInterop() : isDefault ? ensureLiveReference ? builder.default(es6Default).var(name || importedSource).defaultInterop().read("default") : builder.default(es6Default).var(name).defaultInterop().prop(importName) : isNamed && builder.default(es6Default).read(importName);
        } else isModuleForBabel ? (builder.import(), isNamespace ? builder.namespace(name || importedSource) : (isDefault || isNamed) && builder.named(name, importName)) : (builder.require(), 
        isNamespace ? builder.var(name || importedSource).wildcardInterop() : (isDefault || isNamed) && ensureLiveReference ? isDefault ? (name = "default" !== name ? name : importedSource, 
        builder.var(name).read(importName), builder.defaultInterop()) : builder.var(importedSource).read(importName) : isDefault ? builder.var(name).defaultInterop().prop(importName) : isNamed && builder.var(name).prop(importName)); else if ("compiled" === importedInterop) isModuleForNode ? (builder.import(), 
        isNamespace ? builder.default(name || importedSource) : (isDefault || isNamed) && builder.default(importedSource).read(name)) : isModuleForBabel ? (builder.import(), 
        isNamespace ? builder.namespace(name || importedSource) : (isDefault || isNamed) && builder.named(name, importName)) : (builder.require(), 
        isNamespace ? builder.var(name || importedSource) : (isDefault || isNamed) && (ensureLiveReference ? builder.var(importedSource).read(name) : builder.prop(importName).var(name))); else {
          if ("uncompiled" !== importedInterop) throw new Error(`Unknown importedInterop "${importedInterop}".`);
          if (isDefault && ensureLiveReference) throw new Error("No live reference for commonjs default");
          isModuleForNode ? (builder.import(), isNamespace ? builder.default(name || importedSource) : isDefault ? builder.default(name) : isNamed && builder.default(importedSource).read(name)) : isModuleForBabel ? (builder.import(), 
          isNamespace ? builder.default(name || importedSource) : isDefault ? builder.default(name) : isNamed && builder.named(name, importName)) : (builder.require(), 
          isNamespace ? builder.var(name || importedSource) : isDefault ? builder.var(name) : isNamed && (ensureLiveReference ? builder.var(importedSource).read(name) : builder.var(name).prop(importName)));
        }
      }
      const {statements: statements, resultName: resultName} = builder.done();
      return this._insertStatements(statements, blockHoist), (isDefault || isNamed) && ensureNoContext && "Identifier" !== resultName.type ? t.sequenceExpression([ t.numericLiteral(0), resultName ]) : resultName;
    }
    _insertStatements(statements, blockHoist = 3) {
      statements.forEach(node => {
        node._blockHoist = blockHoist;
      });
      const targetPath = this._programPath.get("body").find(p => {
        const val = p.node._blockHoist;
        return Number.isFinite(val) && val < 4;
      });
      targetPath ? targetPath.insertBefore(statements) : this._programPath.unshiftContainer("body", statements);
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var obj, _assert = (obj = __webpack_require__(10)) && obj.__esModule ? obj : {
    default: obj
  }, t = function(obj) {
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
  exports.default = class {
    constructor(importedSource, scope, hub) {
      this._statements = [], this._resultName = null, this._scope = null, this._hub = null, 
      this._scope = scope, this._hub = hub, this._importedSource = importedSource;
    }
    done() {
      return {
        statements: this._statements,
        resultName: this._resultName
      };
    }
    import() {
      return this._statements.push(t.importDeclaration([], t.stringLiteral(this._importedSource))), 
      this;
    }
    require() {
      return this._statements.push(t.expressionStatement(t.callExpression(t.identifier("require"), [ t.stringLiteral(this._importedSource) ]))), 
      this;
    }
    namespace(name = "namespace") {
      name = this._scope.generateUidIdentifier(name);
      const statement = this._statements[this._statements.length - 1];
      return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
      statement.specifiers = [ t.importNamespaceSpecifier(name) ], this._resultName = t.cloneNode(name), 
      this;
    }
    default(name) {
      name = this._scope.generateUidIdentifier(name);
      const statement = this._statements[this._statements.length - 1];
      return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
      statement.specifiers = [ t.importDefaultSpecifier(name) ], this._resultName = t.cloneNode(name), 
      this;
    }
    named(name, importName) {
      if ("default" === importName) return this.default(name);
      name = this._scope.generateUidIdentifier(name);
      const statement = this._statements[this._statements.length - 1];
      return (0, _assert.default)("ImportDeclaration" === statement.type), (0, _assert.default)(0 === statement.specifiers.length), 
      statement.specifiers = [ t.importSpecifier(name, t.identifier(importName)) ], this._resultName = t.cloneNode(name), 
      this;
    }
    var(name) {
      name = this._scope.generateUidIdentifier(name);
      let statement = this._statements[this._statements.length - 1];
      return "ExpressionStatement" !== statement.type && ((0, _assert.default)(this._resultName), 
      statement = t.expressionStatement(this._resultName), this._statements.push(statement)), 
      this._statements[this._statements.length - 1] = t.variableDeclaration("var", [ t.variableDeclarator(name, statement.expression) ]), 
      this._resultName = t.cloneNode(name), this;
    }
    defaultInterop() {
      return this._interop(this._hub.addHelper("interopRequireDefault"));
    }
    wildcardInterop() {
      return this._interop(this._hub.addHelper("interopRequireWildcard"));
    }
    _interop(callee) {
      const statement = this._statements[this._statements.length - 1];
      return "ExpressionStatement" === statement.type ? statement.expression = t.callExpression(callee, [ statement.expression ]) : "VariableDeclaration" === statement.type ? ((0, 
      _assert.default)(1 === statement.declarations.length), statement.declarations[0].init = t.callExpression(callee, [ statement.declarations[0].init ])) : _assert.default.fail("Unexpected type."), 
      this;
    }
    prop(name) {
      const statement = this._statements[this._statements.length - 1];
      return "ExpressionStatement" === statement.type ? statement.expression = t.memberExpression(statement.expression, t.identifier(name)) : "VariableDeclaration" === statement.type ? ((0, 
      _assert.default)(1 === statement.declarations.length), statement.declarations[0].init = t.memberExpression(statement.declarations[0].init, t.identifier(name))) : _assert.default.fail("Unexpected type:" + statement.type), 
      this;
    }
    read(name) {
      this._resultName = t.memberExpression(this._resultName, t.identifier(name));
    }
  };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.getType = function(target) {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
  }, exports.intersection = function(first, second, third) {
    const result = new Set;
    for (const el of first) second.has(el) && third.has(el) && result.add(el);
    return result;
  }, exports.filterStageFromList = function(list, stageList) {
    return Object.keys(list).reduce((result, item) => (stageList.has(item) || (result[item] = list[item]), 
    result), {});
  }, exports.getImportSource = function({node: node}) {
    if (0 === node.specifiers.length) return node.source.value;
  }, exports.getRequireSource = function({node: node}) {
    if (!t.isExpressionStatement(node)) return;
    const {expression: expression} = node;
    if (t.isCallExpression(expression) && t.isIdentifier(expression.callee) && "require" === expression.callee.name && 1 === expression.arguments.length && t.isStringLiteral(expression.arguments[0])) return expression.arguments[0].value;
  }, exports.isPolyfillSource = function(source) {
    return "@babel/polyfill" === source || "core-js" === source;
  }, exports.getModulePath = getModulePath, exports.createImport = function(path, mod) {
    return (0, _helperModuleImports.addSideEffect)(path, getModulePath(mod));
  }, exports.isNamespaced = function(path) {
    if (!path.node) return !1;
    const binding = path.scope.getBinding(path.node.name);
    return !!binding && binding.path.isImportNamespaceSpecifier();
  }, exports.has = void 0;
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
  }(__webpack_require__(0)), _helperModuleImports = __webpack_require__(54);
  function _getRequireWildcardCache() {
    if ("function" != typeof WeakMap) return null;
    var cache = new WeakMap;
    return _getRequireWildcardCache = function() {
      return cache;
    }, cache;
  }
  const has = Object.hasOwnProperty.call.bind(Object.hasOwnProperty);
  exports.has = has;
  const modulePathMap = {
    "regenerator-runtime": "regenerator-runtime/runtime"
  };
  function getModulePath(mod) {
    return modulePathMap[mod] || "core-js/modules/" + mod;
  }
}, , , , , , , , , , , , , , , , , function(module, exports) {
  var debug;
  exports = module.exports = SemVer, debug = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift("SEMVER"), console.log.apply(console, args);
  } : function() {}, exports.SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991, re = exports.re = [], src = exports.src = [], R = 0, NUMERICIDENTIFIER = R++;
  src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
  var NUMERICIDENTIFIERLOOSE = R++;
  src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
  var NONNUMERICIDENTIFIER = R++;
  src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  var MAINVERSION = R++;
  src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
  var MAINVERSIONLOOSE = R++;
  src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
  var PRERELEASEIDENTIFIER = R++;
  src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASEIDENTIFIERLOOSE = R++;
  src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASE = R++;
  src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
  var PRERELEASELOOSE = R++;
  src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
  var BUILDIDENTIFIER = R++;
  src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
  var BUILD = R++;
  src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
  var FULL = R++, FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
  src[FULL] = "^" + FULLPLAIN + "$";
  var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?", LOOSE = R++;
  src[LOOSE] = "^" + LOOSEPLAIN + "$";
  var GTLT = R++;
  src[GTLT] = "((?:<|>)?=?)";
  var XRANGEIDENTIFIERLOOSE = R++;
  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
  var XRANGEIDENTIFIER = R++;
  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
  var XRANGEPLAIN = R++;
  src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
  var XRANGEPLAINLOOSE = R++;
  src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
  var XRANGE = R++;
  src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
  var XRANGELOOSE = R++;
  src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
  var COERCE = R++;
  src[COERCE] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
  var LONETILDE = R++;
  src[LONETILDE] = "(?:~>?)";
  var TILDETRIM = R++;
  src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+", re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
  var TILDE = R++;
  src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
  var TILDELOOSE = R++;
  src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
  var LONECARET = R++;
  src[LONECARET] = "(?:\\^)";
  var CARETTRIM = R++;
  src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+", re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
  var CARET = R++;
  src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
  var CARETLOOSE = R++;
  src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
  var COMPARATORLOOSE = R++;
  src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
  var COMPARATOR = R++;
  src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
  var COMPARATORTRIM = R++;
  src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")", 
  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
  var HYPHENRANGE = R++;
  src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
  var HYPHENRANGELOOSE = R++;
  src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
  var STAR = R++;
  src[STAR] = "(<|>)?=?\\s*\\*";
  for (var i = 0; i < 35; i++) debug(i, src[i]), re[i] || (re[i] = new RegExp(src[i]));
  function parse(version, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), version instanceof SemVer) return version;
    if ("string" != typeof version) return null;
    if (version.length > 256) return null;
    if (!(options.loose ? re[LOOSE] : re[FULL]).test(version)) return null;
    try {
      return new SemVer(version, options);
    } catch (er) {
      return null;
    }
  }
  function SemVer(version, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), version instanceof SemVer) {
      if (version.loose === options.loose) return version;
      version = version.version;
    } else if ("string" != typeof version) throw new TypeError("Invalid Version: " + version);
    if (version.length > 256) throw new TypeError("version is longer than 256 characters");
    if (!(this instanceof SemVer)) return new SemVer(version, options);
    debug("SemVer", version, options), this.options = options, this.loose = !!options.loose;
    var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
    if (!m) throw new TypeError("Invalid Version: " + version);
    if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
    this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
    m[4] ? this.prerelease = m[4].split(".").map((function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
      }
      return id;
    })) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
  }
  exports.parse = parse, exports.valid = function(version, options) {
    var v = parse(version, options);
    return v ? v.version : null;
  }, exports.clean = function(version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  }, exports.SemVer = SemVer, SemVer.prototype.format = function() {
    return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
    this.version;
  }, SemVer.prototype.toString = function() {
    return this.version;
  }, SemVer.prototype.compare = function(other) {
    return debug("SemVer.compare", this.version, this.options, other), other instanceof SemVer || (other = new SemVer(other, this.options)), 
    this.compareMain(other) || this.comparePre(other);
  }, SemVer.prototype.compareMain = function(other) {
    return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }, SemVer.prototype.comparePre = function(other) {
    if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
    if (!this.prerelease.length && other.prerelease.length) return 1;
    if (!this.prerelease.length && !other.prerelease.length) return 0;
    var i = 0;
    do {
      var a = this.prerelease[i], b = other.prerelease[i];
      if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
      if (void 0 === b) return 1;
      if (void 0 === a) return -1;
      if (a !== b) return compareIdentifiers(a, b);
    } while (++i);
  }, SemVer.prototype.inc = function(release, identifier) {
    switch (release) {
     case "premajor":
      this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
      break;

     case "preminor":
      this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
      break;

     case "prepatch":
      this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
      break;

     case "prerelease":
      0 === this.prerelease.length && this.inc("patch", identifier), this.inc("pre", identifier);
      break;

     case "major":
      0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
      this.minor = 0, this.patch = 0, this.prerelease = [];
      break;

     case "minor":
      0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
      this.prerelease = [];
      break;

     case "patch":
      0 === this.prerelease.length && this.patch++, this.prerelease = [];
      break;

     case "pre":
      if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
        for (var i = this.prerelease.length; --i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
        i = -2);
        -1 === i && this.prerelease.push(0);
      }
      identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
      break;

     default:
      throw new Error("invalid increment argument: " + release);
    }
    return this.format(), this.raw = this.version, this;
  }, exports.inc = function(version, release, loose, identifier) {
    "string" == typeof loose && (identifier = loose, loose = void 0);
    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }, exports.diff = function(version1, version2) {
    if (eq(version1, version2)) return null;
    var v1 = parse(version1), v2 = parse(version2), prefix = "";
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = "pre";
      var defaultResult = "prerelease";
    }
    for (var key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return prefix + key;
    return defaultResult;
  }, exports.compareIdentifiers = compareIdentifiers;
  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a), bnum = numeric.test(b);
    return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }
  function eq(a, b, loose) {
    return 0 === compare(a, b, loose);
  }
  function neq(a, b, loose) {
    return 0 !== compare(a, b, loose);
  }
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }
  function cmp(a, op, b, loose) {
    switch (op) {
     case "===":
      return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
      a === b;

     case "!==":
      return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
      a !== b;

     case "":
     case "=":
     case "==":
      return eq(a, b, loose);

     case "!=":
      return neq(a, b, loose);

     case ">":
      return gt(a, b, loose);

     case ">=":
      return gte(a, b, loose);

     case "<":
      return lt(a, b, loose);

     case "<=":
      return lte(a, b, loose);

     default:
      throw new TypeError("Invalid operator: " + op);
    }
  }
  function Comparator(comp, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), comp instanceof Comparator) {
      if (comp.loose === !!options.loose) return comp;
      comp = comp.value;
    }
    if (!(this instanceof Comparator)) return new Comparator(comp, options);
    debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, 
    this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, 
    debug("comp", this);
  }
  exports.rcompareIdentifiers = function(a, b) {
    return compareIdentifiers(b, a);
  }, exports.major = function(a, loose) {
    return new SemVer(a, loose).major;
  }, exports.minor = function(a, loose) {
    return new SemVer(a, loose).minor;
  }, exports.patch = function(a, loose) {
    return new SemVer(a, loose).patch;
  }, exports.compare = compare, exports.compareLoose = function(a, b) {
    return compare(a, b, !0);
  }, exports.rcompare = function(a, b, loose) {
    return compare(b, a, loose);
  }, exports.sort = function(list, loose) {
    return list.sort((function(a, b) {
      return exports.compare(a, b, loose);
    }));
  }, exports.rsort = function(list, loose) {
    return list.sort((function(a, b) {
      return exports.rcompare(a, b, loose);
    }));
  }, exports.gt = gt, exports.lt = lt, exports.eq = eq, exports.neq = neq, exports.gte = gte, 
  exports.lte = lte, exports.cmp = cmp, exports.Comparator = Comparator;
  var ANY = {};
  function Range(range, options) {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), range instanceof Range) return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new Range(range.raw, options);
    if (range instanceof Comparator) return new Range(range.value, options);
    if (!(this instanceof Range)) return new Range(range, options);
    if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, 
    this.raw = range, this.set = range.split(/\s*\|\|\s*/).map((function(range) {
      return this.parseRange(range.trim());
    }), this).filter((function(c) {
      return c.length;
    })), !this.set.length) throw new TypeError("Invalid SemVer Range: " + range);
    this.format();
  }
  function isX(id) {
    return !id || "x" === id.toLowerCase() || "*" === id;
  }
  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    return ((from = isX(fM) ? "" : isX(fm) ? ">=" + fM + ".0.0" : isX(fp) ? ">=" + fM + "." + fm + ".0" : ">=" + from) + " " + (to = isX(tM) ? "" : isX(tm) ? "<" + (+tM + 1) + ".0.0" : isX(tp) ? "<" + tM + "." + (+tm + 1) + ".0" : tpr ? "<=" + tM + "." + tm + "." + tp + "-" + tpr : "<=" + to)).trim();
  }
  function testSet(set, version, options) {
    for (var i = 0; i < set.length; i++) if (!set[i].test(version)) return !1;
    if (version.prerelease.length && !options.includePrerelease) {
      for (i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== ANY && set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
      }
      return !1;
    }
    return !0;
  }
  function satisfies(version, range, options) {
    try {
      range = new Range(range, options);
    } catch (er) {
      return !1;
    }
    return range.test(version);
  }
  function outside(version, range, hilo, options) {
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (version = new SemVer(version, options), range = new Range(range, options), 
    hilo) {
     case ">":
      gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
      break;

     case "<":
      gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
      break;

     default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range, options)) return !1;
    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i], high = null, low = null;
      if (comparators.forEach((function(comparator) {
        comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, 
        low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
      })), high.operator === comp || high.operator === ecomp) return !1;
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return !1;
      if (low.operator === ecomp && ltfn(version, low.semver)) return !1;
    }
    return !0;
  }
  Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR], m = comp.match(r);
    if (!m) throw new TypeError("Invalid comparator: " + comp);
    this.operator = m[1], "=" === this.operator && (this.operator = ""), m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
  }, Comparator.prototype.toString = function() {
    return this.value;
  }, Comparator.prototype.test = function(version) {
    return debug("Comparator.test", version, this.options.loose), this.semver === ANY || ("string" == typeof version && (version = new SemVer(version, this.options)), 
    cmp(version, this.operator, this.semver, this.options));
  }, Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
    var rangeTmp;
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), "" === this.operator) return rangeTmp = new Range(comp.value, options), satisfies(this.value, rangeTmp, options);
    if ("" === comp.operator) return rangeTmp = new Range(this.value, options), satisfies(comp.semver, rangeTmp, options);
    var sameDirectionIncreasing = !(">=" !== this.operator && ">" !== this.operator || ">=" !== comp.operator && ">" !== comp.operator), sameDirectionDecreasing = !("<=" !== this.operator && "<" !== this.operator || "<=" !== comp.operator && "<" !== comp.operator), sameSemVer = this.semver.version === comp.semver.version, differentDirectionsInclusive = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== comp.operator && "<=" !== comp.operator), oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (">=" === this.operator || ">" === this.operator) && ("<=" === comp.operator || "<" === comp.operator), oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ("<=" === this.operator || "<" === this.operator) && (">=" === comp.operator || ">" === comp.operator);
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  }, exports.Range = Range, Range.prototype.format = function() {
    return this.range = this.set.map((function(comps) {
      return comps.join(" ").trim();
    })).join("||").trim(), this.range;
  }, Range.prototype.toString = function() {
    return this.range;
  }, Range.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace), debug("hyphen replace", range), range = range.replace(re[COMPARATORTRIM], "$1$2$3"), 
    debug("comparator trim", range, re[COMPARATORTRIM]), range = (range = (range = range.replace(re[TILDETRIM], "$1~")).replace(re[CARETTRIM], "$1^")).split(/\s+/).join(" ");
    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR], set = range.split(" ").map((function(comp) {
      return function(comp, options) {
        return debug("comp", comp, options), comp = function(comp, options) {
          return comp.trim().split(/\s+/).map((function(comp) {
            return function(comp, options) {
              debug("caret", comp, options);
              var r = options.loose ? re[CARETLOOSE] : re[CARET];
              return comp.replace(r, (function(_, M, m, p, pr) {
                var ret;
                return debug("caret", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = "0" === M ? ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0" : pr ? (debug("replaceCaret pr", pr), 
                ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0") : (debug("no pr"), 
                ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0"), 
                debug("caret return", ret), ret;
              }));
            }(comp, options);
          })).join(" ");
        }(comp, options), debug("caret", comp), comp = function(comp, options) {
          return comp.trim().split(/\s+/).map((function(comp) {
            return function(comp, options) {
              var r = options.loose ? re[TILDELOOSE] : re[TILDE];
              return comp.replace(r, (function(_, M, m, p, pr) {
                var ret;
                return debug("tilde", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : pr ? (debug("replaceTilde pr", pr), 
                ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0") : ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0", 
                debug("tilde return", ret), ret;
              }));
            }(comp, options);
          })).join(" ");
        }(comp, options), debug("tildes", comp), comp = function(comp, options) {
          return debug("replaceXRanges", comp, options), comp.split(/\s+/).map((function(comp) {
            return function(comp, options) {
              comp = comp.trim();
              var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
              return comp.replace(r, (function(ret, gtlt, M, m, p, pr) {
                debug("xRange", comp, ret, gtlt, M, m, p, pr);
                var xM = isX(M), xm = xM || isX(m), xp = xm || isX(p);
                return "=" === gtlt && xp && (gtlt = ""), xM ? ret = ">" === gtlt || "<" === gtlt ? "<0.0.0" : "*" : gtlt && xp ? (xm && (m = 0), 
                p = 0, ">" === gtlt ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, 
                p = 0)) : "<=" === gtlt && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), ret = gtlt + M + "." + m + "." + p) : xm ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : xp && (ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0"), 
                debug("xRange return", ret), ret;
              }));
            }(comp, options);
          })).join(" ");
        }(comp, options), debug("xrange", comp), comp = function(comp, options) {
          return debug("replaceStars", comp, options), comp.trim().replace(re[STAR], "");
        }(comp, options), debug("stars", comp), comp;
      }(comp, this.options);
    }), this).join(" ").split(/\s+/);
    return this.options.loose && (set = set.filter((function(comp) {
      return !!comp.match(compRe);
    }))), set = set.map((function(comp) {
      return new Comparator(comp, this.options);
    }), this);
  }, Range.prototype.intersects = function(range, options) {
    if (!(range instanceof Range)) throw new TypeError("a Range is required");
    return this.set.some((function(thisComparators) {
      return thisComparators.every((function(thisComparator) {
        return range.set.some((function(rangeComparators) {
          return rangeComparators.every((function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, options);
          }));
        }));
      }));
    }));
  }, exports.toComparators = function(range, options) {
    return new Range(range, options).set.map((function(comp) {
      return comp.map((function(c) {
        return c.value;
      })).join(" ").trim().split(" ");
    }));
  }, Range.prototype.test = function(version) {
    if (!version) return !1;
    "string" == typeof version && (version = new SemVer(version, this.options));
    for (var i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return !0;
    return !1;
  }, exports.satisfies = satisfies, exports.maxSatisfying = function(versions, range, options) {
    var max = null, maxSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    return versions.forEach((function(v) {
      rangeObj.test(v) && (max && -1 !== maxSV.compare(v) || (maxSV = new SemVer(max = v, options)));
    })), max;
  }, exports.minSatisfying = function(versions, range, options) {
    var min = null, minSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    return versions.forEach((function(v) {
      rangeObj.test(v) && (min && 1 !== minSV.compare(v) || (minSV = new SemVer(min = v, options)));
    })), min;
  }, exports.minVersion = function(range, loose) {
    range = new Range(range, loose);
    var minver = new SemVer("0.0.0");
    if (range.test(minver)) return minver;
    if (minver = new SemVer("0.0.0-0"), range.test(minver)) return minver;
    minver = null;
    for (var i = 0; i < range.set.length; ++i) {
      range.set[i].forEach((function(comparator) {
        var compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
         case ">":
          0 === compver.prerelease.length ? compver.patch++ : compver.prerelease.push(0), 
          compver.raw = compver.format();

         case "":
         case ">=":
          minver && !gt(minver, compver) || (minver = compver);
          break;

         case "<":
         case "<=":
          break;

         default:
          throw new Error("Unexpected operation: " + comparator.operator);
        }
      }));
    }
    if (minver && range.test(minver)) return minver;
    return null;
  }, exports.validRange = function(range, options) {
    try {
      return new Range(range, options).range || "*";
    } catch (er) {
      return null;
    }
  }, exports.ltr = function(version, range, options) {
    return outside(version, range, "<", options);
  }, exports.gtr = function(version, range, options) {
    return outside(version, range, ">", options);
  }, exports.outside = outside, exports.prerelease = function(version, options) {
    var parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }, exports.intersects = function(r1, r2, options) {
    return r1 = new Range(r1, options), r2 = new Range(r2, options), r1.intersects(r2);
  }, exports.coerce = function(version) {
    if (version instanceof SemVer) return version;
    if ("string" != typeof version) return null;
    var match = version.match(re[COERCE]);
    if (null == match) return null;
    return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isBrowsersQueryValid = isBrowsersQueryValid, exports.default = function(inputTargets = {}, options = {}) {
    let {browsers: browsers} = inputTargets;
    if (inputTargets.esmodules) {
      const supportsESModules = _nativeModules.default["es6.module"];
      browsers = Object.keys(supportsESModules).map(browser => `${browser} ${supportsESModules[browser]}`).join(", ");
    }
    const browsersquery = function(browsers) {
      return (0, _invariant.default)(void 0 === browsers || isBrowsersQueryValid(browsers), `Invalid Option: '${String(browsers)}' is not a valid browserslist query`), 
      browsers;
    }(browsers), input = Object.assign({}, inputTargets);
    delete input.esmodules, delete input.browsers;
    let targets = function(targets) {
      const validTargets = Object.keys(_options.TargetNames);
      for (const target in targets) if (!_options.TargetNames[target]) throw new Error(`Invalid Option: '${target}' is not a valid target\n        Maybe you meant to use '${(0, 
      _levenary.default)(target, validTargets)}'?`);
      return targets;
    }(input);
    const shouldParseBrowsers = !!browsersquery, hasTargets = shouldParseBrowsers || Object.keys(targets).length > 0, shouldSearchForConfig = !options.ignoreBrowserslistConfig && !hasTargets;
    if (shouldParseBrowsers || shouldSearchForConfig) {
      hasTargets || (_browserslist.default.defaults = (object = targets, Object.keys(object).reduce((list, targetName) => {
        if (validBrowserslistTargets.indexOf(targetName) >= 0) {
          const targetVersion = object[targetName];
          return list.concat(`${targetName} ${targetVersion}`);
        }
        return list;
      }, [])));
      const queryBrowsers = function(browsers) {
        return browsers.reduce((all, browser) => {
          const [browserName, browserVersion] = browser.split(" "), normalizedBrowserName = _targets.browserNameMap[browserName];
          if (!normalizedBrowserName) return all;
          try {
            const splitVersion = browserVersion.split("-")[0].toLowerCase(), isSplitUnreleased = (0, 
            _utils.isUnreleasedVersion)(splitVersion, browserName);
            if (!all[normalizedBrowserName]) return all[normalizedBrowserName] = isSplitUnreleased ? splitVersion : (0, 
            _utils.semverify)(splitVersion), all;
            const version = all[normalizedBrowserName], isUnreleased = (0, _utils.isUnreleasedVersion)(version, browserName);
            if (isUnreleased && isSplitUnreleased) all[normalizedBrowserName] = (0, _utils.getLowestUnreleased)(version, splitVersion, browserName); else if (isUnreleased) all[normalizedBrowserName] = (0, 
            _utils.semverify)(splitVersion); else if (!isUnreleased && !isSplitUnreleased) {
              const parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
              all[normalizedBrowserName] = (0, _utils.semverMin)(version, parsedBrowserVersion);
            }
          } catch (e) {}
          return all;
        }, {});
      }((0, _browserslist.default)(browsersquery, {
        path: options.configPath,
        mobileToDesktop: !0,
        env: options.browserslistEnv
      }));
      targets = Object.assign(queryBrowsers, targets), _browserslist.default.defaults = browserslistDefaults;
    }
    var object;
    const parsed = Object.keys(targets).sort().reduce((results, target) => {
      var _targetParserMap$targ;
      const value = targets[target];
      "number" == typeof value && value % 1 != 0 && results.decimalWarnings.push({
        target: target,
        value: value
      });
      const parser = null != (_targetParserMap$targ = targetParserMap[target]) ? _targetParserMap$targ : targetParserMap.__default, [parsedTarget, parsedValue] = parser(target, value);
      return parsedValue && (results.targets[parsedTarget] = parsedValue), results;
    }, {
      targets: {},
      decimalWarnings: []
    });
    return function(decimalTargets) {
      if (!(null == decimalTargets ? void 0 : decimalTargets.length)) return;
      console.log("Warning, the following targets are using a decimal version:"), console.log(""), 
      decimalTargets.forEach(({target: target, value: value}) => console.log(`  ${target}: ${value}`)), 
      console.log(""), console.log("We recommend using a string for minor/patch versions to avoid numbers like 6.10"), 
      console.log("getting parsed as 6.1, which can lead to unexpected behavior."), console.log("");
    }(parsed.decimalWarnings), parsed.targets;
  }, Object.defineProperty(exports, "unreleasedLabels", {
    enumerable: !0,
    get: function() {
      return _targets.unreleasedLabels;
    }
  }), Object.defineProperty(exports, "prettifyTargets", {
    enumerable: !0,
    get: function() {
      return _pretty.prettifyTargets;
    }
  }), Object.defineProperty(exports, "getInclusionReasons", {
    enumerable: !0,
    get: function() {
      return _debug.getInclusionReasons;
    }
  }), Object.defineProperty(exports, "filterItems", {
    enumerable: !0,
    get: function() {
      return _filterItems.default;
    }
  }), Object.defineProperty(exports, "isRequired", {
    enumerable: !0,
    get: function() {
      return _filterItems.isRequired;
    }
  });
  var _browserslist = _interopRequireDefault(__webpack_require__(239)), _levenary = _interopRequireDefault(__webpack_require__(194)), _invariant = _interopRequireDefault(__webpack_require__(131)), _nativeModules = _interopRequireDefault(__webpack_require__(240)), _utils = __webpack_require__(132), _targets = __webpack_require__(133), _options = __webpack_require__(242), _pretty = __webpack_require__(195), _debug = __webpack_require__(243), _filterItems = function(obj) {
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
  }(__webpack_require__(244));
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
  const browserslistDefaults = _browserslist.default.defaults, validBrowserslistTargets = [ ...Object.keys(_browserslist.default.data), ...Object.keys(_browserslist.default.aliases) ];
  function isBrowsersQueryValid(browsers) {
    return "string" == typeof browsers || Array.isArray(browsers);
  }
  function semverifyTarget(target, value) {
    try {
      return (0, _utils.semverify)(value);
    } catch (error) {
      throw new Error(`Invalid Option: '${value}' is not a valid value for 'targets.${target}'.`);
    }
  }
  const targetParserMap = {
    __default: (target, value) => [ target, (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : semverifyTarget(target, value) ],
    node: (target, value) => [ target, !0 === value || "current" === value ? process.versions.node : semverifyTarget(target, value) ]
  };
}, function(module, exports, __webpack_require__) {
  const SemVer = __webpack_require__(146);
  module.exports = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
}, , , , , function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.logUsagePolyfills = exports.logEntryPolyfills = exports.logPluginOrPolyfill = void 0;
  var _helperCompilationTargets = __webpack_require__(104);
  const wordEnds = size => size > 1 ? "s" : "", logPluginOrPolyfill = (item, targetVersions, list) => {
    const filteredList = (0, _helperCompilationTargets.getInclusionReasons)(item, targetVersions, list), formattedTargets = JSON.stringify(filteredList).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
    console.log(`  ${item} ${formattedTargets}`);
  };
  exports.logPluginOrPolyfill = logPluginOrPolyfill;
  exports.logEntryPolyfills = (polyfillName, importPolyfillIncluded, polyfills, filename, polyfillTargets, allBuiltInsList) => {
    if ("test" === process.env.BABEL_ENV && (filename = filename.replace(/\\/g, "/")), 
    importPolyfillIncluded) if (polyfills.size) {
      console.log(`\n[${filename}] Replaced ${polyfillName} entries with the following polyfill${wordEnds(polyfills.size)}:`);
      for (const polyfill of polyfills) logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
    } else console.log(`\n[${filename}] Based on your targets, polyfills were not added.`); else console.log(`\n[${filename}] Import of ${polyfillName} was not found.`);
  };
  exports.logUsagePolyfills = (polyfills, filename, polyfillTargets, allBuiltInsList) => {
    if ("test" === process.env.BABEL_ENV && (filename = filename.replace(/\\/g, "/")), 
    polyfills.size) {
      console.log(`\n[${filename}] Added following core-js polyfill${wordEnds(polyfills.size)}:`);
      for (const polyfill of polyfills) logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
    } else console.log(`\n[${filename}] Based on your code and targets, core-js polyfills were not added.`);
  };
}, , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  var NODE_ENV = process.env.NODE_ENV;
  module.exports = function(condition, format, a, b, c, d, e, f) {
    if ("production" !== NODE_ENV && void 0 === format) throw new Error("invariant requires an error message argument");
    if (!condition) {
      var error;
      if (void 0 === format) error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."); else {
        var args = [ a, b, c, d, e, f ], argIndex = 0;
        (error = new Error(format.replace(/%s/g, (function() {
          return args[argIndex++];
        })))).name = "Invariant Violation";
      }
      throw error.framesToPop = 1, error;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.semverMin = semverMin, exports.semverify = function(version) {
    if ("string" == typeof version && _semver.default.valid(version)) return version;
    (0, _invariant.default)("number" == typeof version || "string" == typeof version && versionRegExp.test(version), `'${version}' is not a valid version`);
    const split = version.toString().split(".");
    for (;split.length < 3; ) split.push("0");
    return split.join(".");
  }, exports.isUnreleasedVersion = function(version, env) {
    const unreleasedLabel = _targets.unreleasedLabels[env];
    return !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
  }, exports.getLowestUnreleased = function(a, b, env) {
    const unreleasedLabel = _targets.unreleasedLabels[env], hasUnreleased = [ a, b ].some(item => item === unreleasedLabel);
    if (hasUnreleased) return a === hasUnreleased ? b : a || b;
    return semverMin(a, b);
  }, exports.getLowestImplementedVersion = function(plugin, environment) {
    const result = plugin[environment];
    if (!result && "android" === environment) return plugin.chrome;
    return result;
  };
  var _invariant = _interopRequireDefault(__webpack_require__(131)), _semver = _interopRequireDefault(__webpack_require__(103)), _targets = __webpack_require__(133);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const versionRegExp = /^(\d+|\d+.\d+)$/;
  function semverMin(first, second) {
    return first && _semver.default.lt(first, second) ? first : second;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.browserNameMap = exports.unreleasedLabels = void 0;
  exports.unreleasedLabels = {
    safari: "tp"
  };
  exports.browserNameMap = {
    and_chr: "chrome",
    and_ff: "firefox",
    android: "android",
    chrome: "chrome",
    edge: "edge",
    firefox: "firefox",
    ie: "ie",
    ie_mob: "ie",
    ios_saf: "ios",
    node: "node",
    op_mob: "opera",
    opera: "opera",
    safari: "safari",
    samsung: "samsung"
  };
}, function(module) {
  module.exports = JSON.parse('{"es.symbol":{"chrome":"49","edge":"15","electron":"0.37","firefox":"51","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.symbol.description":{"chrome":"70","edge":"74","electron":"5.0","firefox":"63","ios":"12.2","node":"11.0","opera":"57","opera_mobile":"49","safari":"12.1","samsung":"10.0"},"es.symbol.async-iterator":{"chrome":"63","edge":"74","electron":"3.0","firefox":"55","ios":"12.0","node":"10.0","opera":"50","opera_mobile":"46","safari":"12.0","samsung":"8.0"},"es.symbol.has-instance":{"chrome":"50","edge":"15","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.symbol.is-concat-spreadable":{"chrome":"48","edge":"15","electron":"0.37","firefox":"48","ios":"10.0","node":"6.0","opera":"35","opera_mobile":"35","safari":"10.0","samsung":"5.0"},"es.symbol.iterator":{"chrome":"39","edge":"13","electron":"0.20","firefox":"36","ios":"9.0","node":"1.0","opera":"26","opera_mobile":"26","safari":"9.0","samsung":"3.4"},"es.symbol.match":{"chrome":"50","edge":"74","electron":"1.1","firefox":"40","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.symbol.match-all":{"chrome":"73","edge":"74","electron":"5.0","firefox":"67","ios":"13.0","node":"12.0","opera":"60","opera_mobile":"52","safari":"13","samsung":"11.0"},"es.symbol.replace":{"chrome":"50","edge":"74","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.symbol.search":{"chrome":"50","edge":"74","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.symbol.species":{"chrome":"51","edge":"13","electron":"1.2","firefox":"41","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.symbol.split":{"chrome":"50","edge":"74","electron":"1.1","firefox":"49","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.symbol.to-primitive":{"chrome":"47","edge":"15","electron":"0.36","firefox":"44","ios":"10.0","node":"6.0","opera":"34","opera_mobile":"34","safari":"10.0","samsung":"5.0"},"es.symbol.to-string-tag":{"chrome":"49","edge":"15","electron":"0.37","firefox":"51","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.symbol.unscopables":{"chrome":"39","edge":"13","electron":"0.20","firefox":"48","ios":"9.0","node":"1.0","opera":"26","opera_mobile":"26","safari":"9.0","samsung":"3.4"},"es.array.concat":{"chrome":"51","edge":"15","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.copy-within":{"chrome":"45","edge":"12","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.every":{"chrome":"48","edge":"15","electron":"0.37","firefox":"50","ios":"9.0","node":"6.0","opera":"35","opera_mobile":"35","safari":"9.0","samsung":"5.0"},"es.array.fill":{"chrome":"45","edge":"12","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.filter":{"chrome":"51","edge":"15","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.find":{"chrome":"45","edge":"13","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.find-index":{"chrome":"45","edge":"13","electron":"0.31","firefox":"48","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.flat":{"chrome":"69","edge":"74","electron":"4.0","firefox":"62","ios":"12.0","node":"11.0","opera":"56","opera_mobile":"48","safari":"12.0","samsung":"10.0"},"es.array.flat-map":{"chrome":"69","edge":"74","electron":"4.0","firefox":"62","ios":"12.0","node":"11.0","opera":"56","opera_mobile":"48","safari":"12.0","samsung":"10.0"},"es.array.for-each":{"chrome":"48","edge":"15","electron":"0.37","firefox":"50","ios":"9.0","node":"6.0","opera":"35","opera_mobile":"35","safari":"9.0","samsung":"5.0"},"es.array.from":{"chrome":"51","edge":"15","electron":"1.2","firefox":"53","ios":"9.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"9.0","samsung":"5.0"},"es.array.includes":{"chrome":"53","edge":"15","electron":"1.4","firefox":"48","ios":"10.0","node":"7.0","opera":"40","opera_mobile":"40","safari":"10.0","samsung":"6.0"},"es.array.index-of":{"chrome":"51","edge":"15","electron":"1.2","firefox":"50","ios":"11.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"11.0","samsung":"5.0"},"es.array.is-array":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"3.2","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"4.0","samsung":"1.0"},"es.array.iterator":{"chrome":"66","edge":"15","electron":"3.0","firefox":"60","ios":"10.0","node":"10.0","opera":"53","opera_mobile":"47","safari":"10.0","samsung":"9.0"},"es.array.join":{"android":"4.4","chrome":"26","edge":"13","electron":"0.20","firefox":"4","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.array.last-index-of":{"chrome":"51","edge":"13","electron":"1.2","firefox":"50","ios":"11.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"11.0","samsung":"5.0"},"es.array.map":{"chrome":"51","edge":"13","electron":"1.2","firefox":"50","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.of":{"chrome":"45","edge":"13","electron":"0.31","firefox":"25","ios":"9.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"9.0","samsung":"5.0"},"es.array.reduce":{"chrome":"48","edge":"15","electron":"0.37","firefox":"50","ios":"9.0","node":"6.0","opera":"35","opera_mobile":"35","safari":"9.0","samsung":"5.0"},"es.array.reduce-right":{"chrome":"48","edge":"15","electron":"0.37","firefox":"50","ios":"9.0","node":"6.0","opera":"35","opera_mobile":"35","safari":"9.0","samsung":"5.0"},"es.array.reverse":{"android":"3.0","chrome":"1","edge":"12","electron":"0.20","firefox":"1","ie":"5.5","ios":"12.2","node":"0.0.3","opera":"10.50","opera_mobile":"10.50","safari":"12.0.2","samsung":"1.0"},"es.array.slice":{"chrome":"51","edge":"15","electron":"1.2","firefox":"48","ios":"11.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"11.0","samsung":"5.0"},"es.array.some":{"chrome":"48","edge":"15","electron":"0.37","firefox":"50","ios":"9.0","node":"6.0","opera":"35","opera_mobile":"35","safari":"9.0","samsung":"5.0"},"es.array.sort":{"chrome":"63","edge":"12","electron":"3.0","firefox":"4","ie":"9","ios":"12.0","node":"10.0","opera":"50","opera_mobile":"46","safari":"12.0","samsung":"8.0"},"es.array.species":{"chrome":"51","edge":"13","electron":"1.2","firefox":"48","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.array.splice":{"chrome":"51","edge":"15","electron":"1.2","firefox":"49","ios":"11.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"11.0","samsung":"5.0"},"es.array.unscopables.flat":{"chrome":"73","edge":"74","electron":"5.0","firefox":"67","ios":"13.0","node":"12.0","opera":"60","opera_mobile":"52","safari":"13","samsung":"11.0"},"es.array.unscopables.flat-map":{"chrome":"73","edge":"74","electron":"5.0","firefox":"67","ios":"13.0","node":"12.0","opera":"60","opera_mobile":"52","safari":"13","samsung":"11.0"},"es.array-buffer.constructor":{"android":"4.4","chrome":"26","edge":"14","electron":"0.20","firefox":"44","ios":"12.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"12.0","samsung":"1.5"},"es.array-buffer.is-view":{"android":"4.4.3","chrome":"32","edge":"12","electron":"0.20","firefox":"29","ie":"11","ios":"8.0","node":"0.11.9","opera":"19","opera_mobile":"19","safari":"7.1","samsung":"2.0"},"es.array-buffer.slice":{"android":"4.4.3","chrome":"31","edge":"12","electron":"0.20","firefox":"46","ie":"11","ios":"12.2","node":"0.11.8","opera":"18","opera_mobile":"18","safari":"12.1","samsung":"2.0"},"es.data-view":{"android":"4.4","chrome":"26","edge":"12","electron":"0.20","firefox":"15","ie":"10","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.date.now":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ie":"9","ios":"3.2","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"4.0","samsung":"1.0"},"es.date.to-iso-string":{"android":"4.4","chrome":"26","edge":"12","electron":"0.20","firefox":"7","ie":"9","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.date.to-json":{"android":"4.4","chrome":"26","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"10.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"10.0","samsung":"1.5"},"es.date.to-primitive":{"chrome":"47","edge":"15","electron":"0.36","firefox":"44","ios":"10.0","node":"6.0","opera":"34","opera_mobile":"34","safari":"10.0","samsung":"5.0"},"es.date.to-string":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ie":"9","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.function.bind":{"android":"3.0","chrome":"7","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"5.1","node":"0.1.101","opera":"12","opera_mobile":"12","phantom":"2.0","safari":"5.1","samsung":"1.0"},"es.function.has-instance":{"chrome":"51","edge":"15","electron":"1.2","firefox":"50","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.function.name":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"3.2","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"4.0","samsung":"1.0"},"es.global-this":{"chrome":"71","edge":"74","electron":"5.0","firefox":"65","ios":"12.2","node":"12.0","opera":"58","opera_mobile":"50","safari":"12.1","samsung":"10.0"},"es.json.stringify":{"chrome":"72","edge":"74","electron":"5.0","firefox":"64","ios":"12.2","node":"12.0","opera":"59","opera_mobile":"51","safari":"12.1","samsung":"11.0"},"es.json.to-string-tag":{"chrome":"50","edge":"15","electron":"1.1","firefox":"51","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.map":{"chrome":"51","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.math.acosh":{"chrome":"54","edge":"13","electron":"1.4","firefox":"25","ios":"8.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"7.1","samsung":"6.0"},"es.math.asinh":{"chrome":"38","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.atanh":{"chrome":"38","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.cbrt":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.clz32":{"chrome":"38","edge":"12","electron":"0.20","firefox":"31","ios":"9.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"9.0","samsung":"3.0"},"es.math.cosh":{"chrome":"39","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"1.0","opera":"26","opera_mobile":"26","safari":"7.1","samsung":"3.4"},"es.math.expm1":{"chrome":"39","edge":"13","electron":"0.20","firefox":"46","ios":"8.0","node":"1.0","opera":"26","opera_mobile":"26","safari":"7.1","samsung":"3.4"},"es.math.fround":{"chrome":"38","edge":"12","electron":"0.20","firefox":"26","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.hypot":{"chrome":"78","edge":"12","electron":"7.0","firefox":"27","ios":"8.0","node":"13.0","opera":"65","safari":"7.1"},"es.math.imul":{"android":"4.4","chrome":"28","edge":"13","electron":"0.20","firefox":"20","ios":"9.0","node":"0.11.1","opera":"16","opera_mobile":"16","safari":"9.0","samsung":"1.5"},"es.math.log10":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.log1p":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.log2":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.sign":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"9.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"9.0","samsung":"3.0"},"es.math.sinh":{"chrome":"39","edge":"13","electron":"0.20","firefox":"25","ios":"8.0","node":"1.0","opera":"26","opera_mobile":"26","safari":"7.1","samsung":"3.4"},"es.math.tanh":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.math.to-string-tag":{"chrome":"50","edge":"15","electron":"1.1","firefox":"51","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.math.trunc":{"chrome":"38","edge":"12","electron":"0.20","firefox":"25","ios":"8.0","node":"0.11.15","opera":"25","opera_mobile":"25","safari":"7.1","samsung":"3.0"},"es.number.constructor":{"chrome":"41","edge":"13","electron":"0.21","firefox":"46","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","safari":"9.0","samsung":"3.4"},"es.number.epsilon":{"chrome":"34","edge":"12","electron":"0.20","firefox":"25","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","safari":"9.0","samsung":"2.0"},"es.number.is-finite":{"android":"4.1","chrome":"19","edge":"12","electron":"0.20","firefox":"16","ios":"9.0","node":"0.7.3","opera":"15","opera_mobile":"15","safari":"9.0","samsung":"1.5"},"es.number.is-integer":{"chrome":"34","edge":"12","electron":"0.20","firefox":"16","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","safari":"9.0","samsung":"2.0"},"es.number.is-nan":{"android":"4.1","chrome":"19","edge":"12","electron":"0.20","firefox":"15","ios":"9.0","node":"0.7.3","opera":"15","opera_mobile":"15","safari":"9.0","samsung":"1.5"},"es.number.is-safe-integer":{"chrome":"34","edge":"12","electron":"0.20","firefox":"32","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","safari":"9.0","samsung":"2.0"},"es.number.max-safe-integer":{"chrome":"34","edge":"12","electron":"0.20","firefox":"31","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","safari":"9.0","samsung":"2.0"},"es.number.min-safe-integer":{"chrome":"34","edge":"12","electron":"0.20","firefox":"31","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","safari":"9.0","samsung":"2.0"},"es.number.parse-float":{"chrome":"35","edge":"13","electron":"0.20","firefox":"39","ios":"11.0","node":"0.11.13","opera":"22","opera_mobile":"22","safari":"11.0","samsung":"3.0"},"es.number.parse-int":{"chrome":"35","edge":"13","electron":"0.20","firefox":"39","ios":"9.0","node":"0.11.13","opera":"22","opera_mobile":"22","safari":"9.0","samsung":"3.0"},"es.number.to-fixed":{"android":"4.4","chrome":"26","edge":"74","electron":"0.20","firefox":"4","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.number.to-precision":{"android":"4.4","chrome":"26","edge":"12","electron":"0.20","firefox":"4","ie":"8","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.object.assign":{"chrome":"49","edge":"74","electron":"0.37","firefox":"36","ios":"9.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"9.0","samsung":"5.0"},"es.object.create":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"3.2","node":"0.1.27","opera":"12","opera_mobile":"12","phantom":"1.9","safari":"4.0","samsung":"1.0"},"es.object.define-getter":{"chrome":"62","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","safari":"7.1","samsung":"8.0"},"es.object.define-properties":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"5.1","node":"0.1.27","opera":"12","opera_mobile":"12","phantom":"2.0","safari":"5.1","samsung":"1.0"},"es.object.define-property":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"4","ie":"9","ios":"5.1","node":"0.1.27","opera":"12","opera_mobile":"12","phantom":"2.0","safari":"5.1","samsung":"1.0"},"es.object.define-setter":{"chrome":"62","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","safari":"7.1","samsung":"8.0"},"es.object.entries":{"chrome":"54","edge":"14","electron":"1.4","firefox":"47","ios":"10.3","node":"7.0","opera":"41","opera_mobile":"41","safari":"10.1","samsung":"6.0"},"es.object.freeze":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.from-entries":{"chrome":"73","edge":"74","electron":"5.0","firefox":"63","ios":"12.2","node":"12.0","opera":"60","opera_mobile":"52","safari":"12.1","samsung":"11.0"},"es.object.get-own-property-descriptor":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.get-own-property-descriptors":{"chrome":"54","edge":"15","electron":"1.4","firefox":"50","ios":"10.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"10.0","samsung":"6.0"},"es.object.get-own-property-names":{"chrome":"40","edge":"13","electron":"0.21","firefox":"34","ios":"9.0","node":"1.0","opera":"27","opera_mobile":"27","safari":"9.0","samsung":"3.4"},"es.object.get-prototype-of":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.is":{"android":"4.1","chrome":"19","edge":"12","electron":"0.20","firefox":"22","ios":"9.0","node":"0.7.3","opera":"15","opera_mobile":"15","safari":"9.0","samsung":"1.5"},"es.object.is-extensible":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.is-frozen":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.is-sealed":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.keys":{"chrome":"40","edge":"13","electron":"0.21","firefox":"35","ios":"9.0","node":"1.0","opera":"27","opera_mobile":"27","safari":"9.0","samsung":"3.4"},"es.object.lookup-getter":{"chrome":"62","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","safari":"7.1","samsung":"8.0"},"es.object.lookup-setter":{"chrome":"62","edge":"16","electron":"3.0","firefox":"48","ios":"8.0","node":"8.10","opera":"49","opera_mobile":"46","safari":"7.1","samsung":"8.0"},"es.object.prevent-extensions":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.seal":{"chrome":"44","edge":"13","electron":"0.30","firefox":"35","ios":"9.0","node":"3.0","opera":"31","opera_mobile":"31","safari":"9.0","samsung":"4.0"},"es.object.set-prototype-of":{"chrome":"34","edge":"12","electron":"0.20","firefox":"31","ie":"11","ios":"9.0","node":"0.11.13","opera":"21","opera_mobile":"21","safari":"9.0","samsung":"2.0"},"es.object.to-string":{"chrome":"49","edge":"15","electron":"0.37","firefox":"51","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.object.values":{"chrome":"54","edge":"14","electron":"1.4","firefox":"47","ios":"10.3","node":"7.0","opera":"41","opera_mobile":"41","safari":"10.1","samsung":"6.0"},"es.parse-float":{"chrome":"35","edge":"12","electron":"0.20","firefox":"8","ie":"8","ios":"8.0","node":"0.11.13","opera":"22","opera_mobile":"22","safari":"7.1","samsung":"3.0"},"es.parse-int":{"chrome":"35","edge":"12","electron":"0.20","firefox":"21","ie":"9","ios":"8.0","node":"0.11.13","opera":"22","opera_mobile":"22","safari":"7.1","samsung":"3.0"},"es.promise":{"chrome":"67","edge":"74","electron":"4.0","firefox":"69","ios":"11.0","node":"10.4","opera":"54","opera_mobile":"48","safari":"11.0","samsung":"9.0"},"es.promise.all-settled":{"chrome":"76","edge":"76","electron":"6.0","firefox":"71","ios":"13.0","node":"12.9","opera":"63","opera_mobile":"54","safari":"13"},"es.promise.finally":{"chrome":"67","edge":"74","electron":"4.0","firefox":"69","ios":"13.2.3","node":"10.4","opera":"54","opera_mobile":"48","safari":"13.0.3","samsung":"9.0"},"es.reflect.apply":{"chrome":"49","edge":"15","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.construct":{"chrome":"49","edge":"15","electron":"0.37","firefox":"44","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.define-property":{"chrome":"49","edge":"13","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.delete-property":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.get":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.get-own-property-descriptor":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.get-prototype-of":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.has":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.is-extensible":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.own-keys":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.prevent-extensions":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.set":{"chrome":"49","edge":"74","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.reflect.set-prototype-of":{"chrome":"49","edge":"12","electron":"0.37","firefox":"42","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.regexp.constructor":{"chrome":"51","edge":"74","electron":"1.2","firefox":"49","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.regexp.exec":{"android":"4.4","chrome":"26","edge":"13","electron":"0.20","firefox":"44","ios":"10.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"10.0","samsung":"1.5"},"es.regexp.flags":{"chrome":"49","edge":"74","electron":"0.37","firefox":"37","ios":"9.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"9.0","samsung":"5.0"},"es.regexp.sticky":{"chrome":"49","edge":"13","electron":"0.37","firefox":"3","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.regexp.test":{"chrome":"51","edge":"74","electron":"1.2","firefox":"46","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.regexp.to-string":{"chrome":"50","edge":"74","electron":"1.1","firefox":"46","ios":"10.0","node":"6.0","opera":"37","opera_mobile":"37","safari":"10.0","samsung":"5.0"},"es.set":{"chrome":"51","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.code-point-at":{"chrome":"41","edge":"13","electron":"0.21","firefox":"29","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","safari":"9.0","samsung":"3.4"},"es.string.ends-with":{"chrome":"51","edge":"74","electron":"1.2","firefox":"40","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.from-code-point":{"chrome":"41","edge":"13","electron":"0.21","firefox":"29","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","safari":"9.0","samsung":"3.4"},"es.string.includes":{"chrome":"51","edge":"74","electron":"1.2","firefox":"40","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.iterator":{"chrome":"39","edge":"13","electron":"0.20","firefox":"36","ios":"9.0","node":"1.0","opera":"26","opera_mobile":"26","safari":"9.0","samsung":"3.4"},"es.string.match":{"chrome":"51","edge":"74","electron":"1.2","firefox":"49","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.match-all":{"chrome":"80","edge":"80","electron":"8.0","firefox":"73","opera":"67","safari":"13.1"},"es.string.pad-end":{"chrome":"57","edge":"15","electron":"1.7","firefox":"48","ios":"11.0","node":"8.0","opera":"44","opera_mobile":"43","safari":"11.0","samsung":"7.0"},"es.string.pad-start":{"chrome":"57","edge":"15","electron":"1.7","firefox":"48","ios":"11.0","node":"8.0","opera":"44","opera_mobile":"43","safari":"11.0","samsung":"7.0"},"es.string.raw":{"chrome":"41","edge":"13","electron":"0.21","firefox":"34","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","safari":"9.0","samsung":"3.4"},"es.string.repeat":{"chrome":"41","edge":"13","electron":"0.21","firefox":"24","ios":"9.0","node":"1.0","opera":"28","opera_mobile":"28","safari":"9.0","samsung":"3.4"},"es.string.replace":{"chrome":"64","edge":"74","electron":"3.0","node":"10.0","opera":"51","opera_mobile":"47","samsung":"9.0"},"es.string.search":{"chrome":"51","edge":"74","electron":"1.2","firefox":"49","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.split":{"chrome":"54","edge":"74","electron":"1.4","firefox":"49","ios":"10.0","node":"7.0","opera":"41","opera_mobile":"41","safari":"10.0","samsung":"6.0"},"es.string.starts-with":{"chrome":"51","edge":"74","electron":"1.2","firefox":"40","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.string.trim":{"chrome":"59","edge":"15","electron":"1.8","firefox":"52","ios":"12.2","node":"8.3","opera":"46","opera_mobile":"43","safari":"12.1","samsung":"7.0"},"es.string.trim-end":{"chrome":"66","edge":"74","electron":"3.0","firefox":"61","ios":"12.2","node":"10.0","opera":"53","opera_mobile":"47","safari":"12.1","samsung":"9.0"},"es.string.trim-start":{"chrome":"66","edge":"74","electron":"3.0","firefox":"61","ios":"12.0","node":"10.0","opera":"53","opera_mobile":"47","safari":"12.0","samsung":"9.0"},"es.string.anchor":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","safari":"6.0","samsung":"1.0"},"es.string.big":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.blink":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.bold":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.fixed":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.fontcolor":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","safari":"6.0","samsung":"1.0"},"es.string.fontsize":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","safari":"6.0","samsung":"1.0"},"es.string.italics":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.link":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"17","ios":"6.0","node":"0.1.27","opera":"15","opera_mobile":"15","phantom":"2.0","safari":"6.0","samsung":"1.0"},"es.string.small":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.strike":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.sub":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.string.sup":{"android":"3.0","chrome":"5","edge":"12","electron":"0.20","firefox":"2","ios":"2.0","node":"0.1.27","opera":"10.50","opera_mobile":"10.50","phantom":"1.9","safari":"3.1","samsung":"1.0"},"es.typed-array.float32-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.float64-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.int8-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.int16-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.int32-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.uint8-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.uint8-clamped-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.uint16-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.uint32-array":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.copy-within":{"chrome":"45","edge":"13","electron":"0.31","firefox":"34","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.every":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.fill":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.filter":{"chrome":"45","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.find":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.find-index":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.for-each":{"chrome":"45","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.from":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.includes":{"chrome":"49","edge":"14","electron":"0.37","firefox":"43","ios":"10.0","node":"6.0","opera":"36","opera_mobile":"36","safari":"10.0","samsung":"5.0"},"es.typed-array.index-of":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.iterator":{"chrome":"47","edge":"13","electron":"0.36","firefox":"37","ios":"10.0","node":"6.0","opera":"34","opera_mobile":"34","safari":"10.0","samsung":"5.0"},"es.typed-array.join":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.last-index-of":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.map":{"chrome":"45","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.of":{"chrome":"54","edge":"15","electron":"1.4","firefox":"55","node":"7.0","opera":"41","opera_mobile":"41","samsung":"6.0"},"es.typed-array.reduce":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.reduce-right":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.reverse":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.set":{"android":"4.4","chrome":"26","edge":"13","electron":"0.20","firefox":"15","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.typed-array.slice":{"chrome":"45","edge":"13","electron":"0.31","firefox":"38","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.some":{"chrome":"45","edge":"13","electron":"0.31","firefox":"37","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.sort":{"chrome":"45","edge":"13","electron":"0.31","firefox":"46","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.subarray":{"android":"4.4","chrome":"26","edge":"13","electron":"0.20","firefox":"15","ios":"8.0","node":"0.11.0","opera":"16","opera_mobile":"16","safari":"7.1","samsung":"1.5"},"es.typed-array.to-locale-string":{"chrome":"45","edge":"74","electron":"0.31","firefox":"51","ios":"10.0","node":"4.0","opera":"32","opera_mobile":"32","safari":"10.0","samsung":"5.0"},"es.typed-array.to-string":{"chrome":"51","edge":"13","electron":"1.2","firefox":"51","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.weak-map":{"chrome":"51","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"es.weak-set":{"chrome":"51","edge":"15","electron":"1.2","firefox":"53","ios":"10.0","node":"6.5","opera":"38","opera_mobile":"38","safari":"10.0","samsung":"5.0"},"esnext.aggregate-error":{},"esnext.array.is-template-object":{},"esnext.array.last-index":{},"esnext.array.last-item":{},"esnext.async-iterator.constructor":{},"esnext.async-iterator.as-indexed-pairs":{},"esnext.async-iterator.drop":{},"esnext.async-iterator.every":{},"esnext.async-iterator.filter":{},"esnext.async-iterator.find":{},"esnext.async-iterator.flat-map":{},"esnext.async-iterator.for-each":{},"esnext.async-iterator.from":{},"esnext.async-iterator.map":{},"esnext.async-iterator.reduce":{},"esnext.async-iterator.some":{},"esnext.async-iterator.take":{},"esnext.async-iterator.to-array":{},"esnext.composite-key":{},"esnext.composite-symbol":{},"esnext.global-this":{"chrome":"71","edge":"74","electron":"5.0","firefox":"65","ios":"12.2","node":"12.0","opera":"58","opera_mobile":"50","safari":"12.1","samsung":"10.0"},"esnext.iterator.constructor":{},"esnext.iterator.as-indexed-pairs":{},"esnext.iterator.drop":{},"esnext.iterator.every":{},"esnext.iterator.filter":{},"esnext.iterator.find":{},"esnext.iterator.flat-map":{},"esnext.iterator.for-each":{},"esnext.iterator.from":{},"esnext.iterator.map":{},"esnext.iterator.reduce":{},"esnext.iterator.some":{},"esnext.iterator.take":{},"esnext.iterator.to-array":{},"esnext.map.delete-all":{},"esnext.map.every":{},"esnext.map.filter":{},"esnext.map.find":{},"esnext.map.find-key":{},"esnext.map.from":{},"esnext.map.group-by":{},"esnext.map.includes":{},"esnext.map.key-by":{},"esnext.map.key-of":{},"esnext.map.map-keys":{},"esnext.map.map-values":{},"esnext.map.merge":{},"esnext.map.of":{},"esnext.map.reduce":{},"esnext.map.some":{},"esnext.map.update":{},"esnext.map.update-or-insert":{},"esnext.map.upsert":{},"esnext.math.clamp":{},"esnext.math.deg-per-rad":{},"esnext.math.degrees":{},"esnext.math.fscale":{},"esnext.math.iaddh":{},"esnext.math.imulh":{},"esnext.math.isubh":{},"esnext.math.rad-per-deg":{},"esnext.math.radians":{},"esnext.math.scale":{},"esnext.math.seeded-prng":{},"esnext.math.signbit":{},"esnext.math.umulh":{},"esnext.number.from-string":{},"esnext.object.iterate-entries":{},"esnext.object.iterate-keys":{},"esnext.object.iterate-values":{},"esnext.observable":{},"esnext.promise.all-settled":{"chrome":"76","edge":"76","electron":"6.0","firefox":"71","ios":"13.0","node":"12.9","opera":"63","opera_mobile":"54","safari":"13"},"esnext.promise.any":{},"esnext.promise.try":{},"esnext.reflect.define-metadata":{},"esnext.reflect.delete-metadata":{},"esnext.reflect.get-metadata":{},"esnext.reflect.get-metadata-keys":{},"esnext.reflect.get-own-metadata":{},"esnext.reflect.get-own-metadata-keys":{},"esnext.reflect.has-metadata":{},"esnext.reflect.has-own-metadata":{},"esnext.reflect.metadata":{},"esnext.set.add-all":{},"esnext.set.delete-all":{},"esnext.set.difference":{},"esnext.set.every":{},"esnext.set.filter":{},"esnext.set.find":{},"esnext.set.from":{},"esnext.set.intersection":{},"esnext.set.is-disjoint-from":{},"esnext.set.is-subset-of":{},"esnext.set.is-superset-of":{},"esnext.set.join":{},"esnext.set.map":{},"esnext.set.of":{},"esnext.set.reduce":{},"esnext.set.some":{},"esnext.set.symmetric-difference":{},"esnext.set.union":{},"esnext.string.at":{},"esnext.string.code-points":{},"esnext.string.match-all":{"chrome":"80","edge":"80","electron":"8.0","firefox":"73","opera":"67","safari":"13.1"},"esnext.string.replace-all":{},"esnext.symbol.async-dispose":{},"esnext.symbol.dispose":{},"esnext.symbol.observable":{},"esnext.symbol.pattern-match":{},"esnext.symbol.replace-all":{},"esnext.weak-map.delete-all":{},"esnext.weak-map.from":{},"esnext.weak-map.of":{},"esnext.weak-map.upsert":{},"esnext.weak-set.add-all":{},"esnext.weak-set.delete-all":{},"esnext.weak-set.from":{},"esnext.weak-set.of":{},"web.dom-collections.for-each":{"chrome":"58","edge":"16","electron":"1.7","firefox":"50","ios":"10.0","node":"0.0.1","opera":"45","opera_mobile":"43","safari":"10.0","samsung":"7.0"},"web.dom-collections.iterator":{"chrome":"66","edge":"74","electron":"3.0","firefox":"60","node":"0.0.1","opera":"53","opera_mobile":"47","safari":"13.1","samsung":"9.0"},"web.immediate":{"ie":"10","node":"0.9.1"},"web.queue-microtask":{"chrome":"71","edge":"74","electron":"5.0","firefox":"69","ios":"12.2","node":"12.0","opera":"58","opera_mobile":"50","safari":"12.1","samsung":"10.0"},"web.timers":{"android":"1.5","chrome":"1","edge":"12","electron":"0.20","firefox":"1","ie":"10","ios":"1.0","node":"0.0.1","opera":"7","opera_mobile":"7","phantom":"1.9","safari":"1.0","samsung":"1.0"},"web.url":{"chrome":"67","edge":"74","electron":"4.0","firefox":"57","node":"10.0","opera":"54","opera_mobile":"48","samsung":"9.0"},"web.url.to-json":{"chrome":"71","edge":"74","electron":"5.0","firefox":"57","node":"10.0","opera":"58","opera_mobile":"50","samsung":"10.0"},"web.url-search-params":{"chrome":"67","edge":"74","electron":"4.0","firefox":"57","node":"10.0","opera":"54","opera_mobile":"48","samsung":"9.0"}}');
}, function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(249);
}, function(module, exports) {
  module.exports = require("../plugins/syntax-async-generators");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-dynamic-import");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-json-strings");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-nullish-coalescing-operator");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-numeric-separator");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-object-rest-spread");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-optional-catch-binding");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-optional-chaining");
}, function(module, exports) {
  module.exports = require("../plugins/transform-parameters");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(targets) {
    const targetNames = Object.keys(targets), isAnyTarget = !targetNames.length, isWebTarget = targetNames.some(name => "node" !== name);
    return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
  }, exports.defaultWebIncludes = void 0;
  const defaultWebIncludes = [ "web.timers", "web.immediate", "web.dom.iterable" ];
  exports.defaultWebIncludes = defaultWebIncludes;
}, function(module, exports, __webpack_require__) {
  const debug = __webpack_require__(201), {MAX_LENGTH: MAX_LENGTH, MAX_SAFE_INTEGER: MAX_SAFE_INTEGER} = __webpack_require__(147), {re: re, t: t} = __webpack_require__(148), {compareIdentifiers: compareIdentifiers} = __webpack_require__(314);
  class SemVer {
    constructor(version, options) {
      if (options && "object" == typeof options || (options = {
        loose: !!options,
        includePrerelease: !1
      }), version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
        version = version.version;
      } else if ("string" != typeof version) throw new TypeError("Invalid Version: " + version);
      if (version.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
      debug("SemVer", version, options), this.options = options, this.loose = !!options.loose, 
      this.includePrerelease = !!options.includePrerelease;
      const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m) throw new TypeError("Invalid Version: " + version);
      if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
      this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
      m[4] ? this.prerelease = m[4].split(".").map(id => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
        }
        return id;
      }) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
      this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      if (debug("SemVer.compare", this.version, this.options, other), !(other instanceof SemVer)) {
        if ("string" == typeof other && other === this.version) return 0;
        other = new SemVer(other, this.options);
      }
      return other.version === this.version ? 0 : this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
      if (!this.prerelease.length && other.prerelease.length) return 1;
      if (!this.prerelease.length && !other.prerelease.length) return 0;
      let i = 0;
      do {
        const a = this.prerelease[i], b = other.prerelease[i];
        if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
        if (void 0 === b) return 1;
        if (void 0 === a) return -1;
        if (a !== b) return compareIdentifiers(a, b);
      } while (++i);
    }
    compareBuild(other) {
      other instanceof SemVer || (other = new SemVer(other, this.options));
      let i = 0;
      do {
        const a = this.build[i], b = other.build[i];
        if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
        if (void 0 === b) return 1;
        if (void 0 === a) return -1;
        if (a !== b) return compareIdentifiers(a, b);
      } while (++i);
    }
    inc(release, identifier) {
      switch (release) {
       case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
        break;

       case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
        break;

       case "prepatch":
        this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
        break;

       case "prerelease":
        0 === this.prerelease.length && this.inc("patch", identifier), this.inc("pre", identifier);
        break;

       case "major":
        0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
        this.minor = 0, this.patch = 0, this.prerelease = [];
        break;

       case "minor":
        0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
        this.prerelease = [];
        break;

       case "patch":
        0 === this.prerelease.length && this.patch++, this.prerelease = [];
        break;

       case "pre":
        if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
          let i = this.prerelease.length;
          for (;--i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
          i = -2);
          -1 === i && this.prerelease.push(0);
        }
        identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
        break;

       default:
        throw new Error("invalid increment argument: " + release);
      }
      return this.format(), this.raw = this.version, this;
    }
  }
  module.exports = SemVer;
}, function(module, exports) {
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  module.exports = {
    SEMVER_SPEC_VERSION: "2.0.0",
    MAX_LENGTH: 256,
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    MAX_SAFE_COMPONENT_LENGTH: 16
  };
}, function(module, exports, __webpack_require__) {
  const {MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH} = __webpack_require__(147), debug = __webpack_require__(201), re = (exports = module.exports = {}).re = [], src = exports.src = [], t = exports.t = {};
  let R = 0;
  const createToken = (name, value, isGlobal) => {
    const index = R++;
    debug(index, value), t[name] = index, src[index] = value, re[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*"), createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+"), 
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`), 
  createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`), 
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`), 
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`), 
  createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`), 
  createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`), 
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`), 
  createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`), 
  createToken("FULL", `^${src[t.FULLPLAIN]}$`), createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`), 
  createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`), createToken("GTLT", "((?:<|>)?=?)"), 
  createToken("XRANGEIDENTIFIERLOOSE", src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*"), 
  createToken("XRANGEIDENTIFIER", src[t.NUMERICIDENTIFIER] + "|x|X|\\*"), createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`), 
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`), 
  createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`), createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`), 
  createToken("COERCE", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`), 
  createToken("COERCERTL", src[t.COERCE], !0), createToken("LONETILDE", "(?:~>?)"), 
  createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, !0), exports.tildeTrimReplace = "$1~", 
  createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`), createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`), 
  createToken("LONECARET", "(?:\\^)"), createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, !0), 
  exports.caretTrimReplace = "$1^", createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`), 
  createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`), createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`), 
  createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`), createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, !0), 
  exports.comparatorTrimReplace = "$1$2$3", createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`), 
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`), 
  createToken("STAR", "(<|>)?=?\\s*\\*");
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(__webpack_module__, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "default", (function() {
    return levenArray;
  }));
  var leven__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(237);
  function levenArray(str, array) {
    let minLeven = Number.POSITIVE_INFINITY, result = void 0;
    for (const item of array) {
      const distance = leven__WEBPACK_IMPORTED_MODULE_0__(str, item);
      distance < minLeven && (minLeven = distance, result = item);
    }
    return result;
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.prettifyVersion = prettifyVersion, exports.prettifyTargets = function(targets) {
    return Object.keys(targets).reduce((results, target) => {
      let value = targets[target];
      const unreleasedLabel = _targets.unreleasedLabels[target];
      return "string" == typeof value && unreleasedLabel !== value && (value = prettifyVersion(value)), 
      results[target] = value, results;
    }, {});
  };
  var obj, _semver = (obj = __webpack_require__(103)) && obj.__esModule ? obj : {
    default: obj
  }, _targets = __webpack_require__(133);
  function prettifyVersion(version) {
    if ("string" != typeof version) return version;
    const parts = [ _semver.default.major(version) ], minor = _semver.default.minor(version), patch = _semver.default.patch(version);
    return (minor || patch) && parts.push(minor), patch && parts.push(patch), parts.join(".");
  }
}, function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(245);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  exports.default = {
    auto: "transform-modules-commonjs",
    amd: "transform-modules-amd",
    commonjs: "transform-modules-commonjs",
    cjs: "transform-modules-commonjs",
    systemjs: "transform-modules-systemjs",
    umd: "transform-modules-umd"
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.pluginsBugfixes = exports.plugins = void 0;
  var _plugins = _interopRequireDefault(__webpack_require__(196)), _pluginBugfixes = _interopRequireDefault(__webpack_require__(250)), _availablePlugins = _interopRequireDefault(__webpack_require__(199));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const pluginsFiltered = {};
  exports.plugins = pluginsFiltered;
  const bugfixPluginsFiltered = {};
  exports.pluginsBugfixes = bugfixPluginsFiltered;
  for (const plugin of Object.keys(_plugins.default)) Object.hasOwnProperty.call(_availablePlugins.default, plugin) && (pluginsFiltered[plugin] = _plugins.default[plugin]);
  for (const plugin of Object.keys(_pluginBugfixes.default)) Object.hasOwnProperty.call(_availablePlugins.default, plugin) && (bugfixPluginsFiltered[plugin] = _pluginBugfixes.default[plugin]);
  pluginsFiltered["proposal-class-properties"] = pluginsFiltered["proposal-private-methods"];
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _pluginSyntaxAsyncGenerators = _interopRequireDefault(__webpack_require__(136)), _pluginSyntaxClassProperties = _interopRequireDefault(__webpack_require__(252)), _pluginSyntaxDynamicImport = _interopRequireDefault(__webpack_require__(137)), _pluginSyntaxJsonStrings = _interopRequireDefault(__webpack_require__(138)), _pluginSyntaxNullishCoalescingOperator = _interopRequireDefault(__webpack_require__(139)), _pluginSyntaxNumericSeparator = _interopRequireDefault(__webpack_require__(140)), _pluginSyntaxObjectRestSpread = _interopRequireDefault(__webpack_require__(141)), _pluginSyntaxOptionalCatchBinding = _interopRequireDefault(__webpack_require__(142)), _pluginSyntaxOptionalChaining = _interopRequireDefault(__webpack_require__(143)), _pluginSyntaxTopLevelAwait = _interopRequireDefault(__webpack_require__(253)), _pluginProposalAsyncGeneratorFunctions = _interopRequireDefault(__webpack_require__(254)), _pluginProposalClassProperties = _interopRequireDefault(__webpack_require__(255)), _pluginProposalDynamicImport = _interopRequireDefault(__webpack_require__(256)), _pluginProposalJsonStrings = _interopRequireDefault(__webpack_require__(257)), _pluginProposalNullishCoalescingOperator = _interopRequireDefault(__webpack_require__(258)), _pluginProposalNumericSeparator = _interopRequireDefault(__webpack_require__(259)), _pluginProposalObjectRestSpread = _interopRequireDefault(__webpack_require__(260)), _pluginProposalOptionalCatchBinding = _interopRequireDefault(__webpack_require__(261)), _pluginProposalOptionalChaining = _interopRequireDefault(__webpack_require__(262)), _pluginProposalPrivateMethods = _interopRequireDefault(__webpack_require__(263)), _pluginProposalUnicodePropertyRegex = _interopRequireDefault(__webpack_require__(264)), _pluginTransformAsyncToGenerator = _interopRequireDefault(__webpack_require__(265)), _pluginTransformArrowFunctions = _interopRequireDefault(__webpack_require__(266)), _pluginTransformBlockScopedFunctions = _interopRequireDefault(__webpack_require__(267)), _pluginTransformBlockScoping = _interopRequireDefault(__webpack_require__(268)), _pluginTransformClasses = _interopRequireDefault(__webpack_require__(269)), _pluginTransformComputedProperties = _interopRequireDefault(__webpack_require__(270)), _pluginTransformDestructuring = _interopRequireDefault(__webpack_require__(271)), _pluginTransformDotallRegex = _interopRequireDefault(__webpack_require__(272)), _pluginTransformDuplicateKeys = _interopRequireDefault(__webpack_require__(273)), _pluginTransformExponentiationOperator = _interopRequireDefault(__webpack_require__(274)), _pluginTransformForOf = _interopRequireDefault(__webpack_require__(275)), _pluginTransformFunctionName = _interopRequireDefault(__webpack_require__(276)), _pluginTransformLiterals = _interopRequireDefault(__webpack_require__(277)), _pluginTransformMemberExpressionLiterals = _interopRequireDefault(__webpack_require__(278)), _pluginTransformModulesAmd = _interopRequireDefault(__webpack_require__(279)), _pluginTransformModulesCommonjs = _interopRequireDefault(__webpack_require__(280)), _pluginTransformModulesSystemjs = _interopRequireDefault(__webpack_require__(281)), _pluginTransformModulesUmd = _interopRequireDefault(__webpack_require__(282)), _pluginTransformNamedCapturingGroupsRegex = _interopRequireDefault(__webpack_require__(283)), _pluginTransformNewTarget = _interopRequireDefault(__webpack_require__(284)), _pluginTransformObjectSuper = _interopRequireDefault(__webpack_require__(285)), _pluginTransformParameters = _interopRequireDefault(__webpack_require__(144)), _pluginTransformPropertyLiterals = _interopRequireDefault(__webpack_require__(286)), _pluginTransformRegenerator = _interopRequireDefault(__webpack_require__(287)), _pluginTransformReservedWords = _interopRequireDefault(__webpack_require__(288)), _pluginTransformShorthandProperties = _interopRequireDefault(__webpack_require__(289)), _pluginTransformSpread = _interopRequireDefault(__webpack_require__(290)), _pluginTransformStickyRegex = _interopRequireDefault(__webpack_require__(291)), _pluginTransformTemplateLiterals = _interopRequireDefault(__webpack_require__(292)), _pluginTransformTypeofSymbol = _interopRequireDefault(__webpack_require__(293)), _pluginTransformUnicodeEscapes = _interopRequireDefault(__webpack_require__(294)), _pluginTransformUnicodeRegex = _interopRequireDefault(__webpack_require__(295)), _transformAsyncArrowsInClass = _interopRequireDefault(__webpack_require__(296)), _transformEdgeDefaultParameters = _interopRequireDefault(__webpack_require__(297)), _transformEdgeFunctionName = _interopRequireDefault(__webpack_require__(298)), _transformTaggedTemplateCaching = _interopRequireDefault(__webpack_require__(299)), _transformSafariBlockShadowing = _interopRequireDefault(__webpack_require__(300)), _transformSafariForShadowing = _interopRequireDefault(__webpack_require__(301));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  var _default = {
    "bugfix/transform-async-arrows-in-class": _transformAsyncArrowsInClass.default,
    "bugfix/transform-edge-default-parameters": _transformEdgeDefaultParameters.default,
    "bugfix/transform-edge-function-name": _transformEdgeFunctionName.default,
    "bugfix/transform-safari-block-shadowing": _transformSafariBlockShadowing.default,
    "bugfix/transform-safari-for-shadowing": _transformSafariForShadowing.default,
    "bugfix/transform-tagged-template-caching": _transformTaggedTemplateCaching.default,
    "proposal-async-generator-functions": _pluginProposalAsyncGeneratorFunctions.default,
    "proposal-class-properties": _pluginProposalClassProperties.default,
    "proposal-dynamic-import": _pluginProposalDynamicImport.default,
    "proposal-json-strings": _pluginProposalJsonStrings.default,
    "proposal-nullish-coalescing-operator": _pluginProposalNullishCoalescingOperator.default,
    "proposal-numeric-separator": _pluginProposalNumericSeparator.default,
    "proposal-object-rest-spread": _pluginProposalObjectRestSpread.default,
    "proposal-optional-catch-binding": _pluginProposalOptionalCatchBinding.default,
    "proposal-optional-chaining": _pluginProposalOptionalChaining.default,
    "proposal-private-methods": _pluginProposalPrivateMethods.default,
    "proposal-unicode-property-regex": _pluginProposalUnicodePropertyRegex.default,
    "syntax-async-generators": _pluginSyntaxAsyncGenerators.default,
    "syntax-class-properties": _pluginSyntaxClassProperties.default,
    "syntax-dynamic-import": _pluginSyntaxDynamicImport.default,
    "syntax-json-strings": _pluginSyntaxJsonStrings.default,
    "syntax-nullish-coalescing-operator": _pluginSyntaxNullishCoalescingOperator.default,
    "syntax-numeric-separator": _pluginSyntaxNumericSeparator.default,
    "syntax-object-rest-spread": _pluginSyntaxObjectRestSpread.default,
    "syntax-optional-catch-binding": _pluginSyntaxOptionalCatchBinding.default,
    "syntax-optional-chaining": _pluginSyntaxOptionalChaining.default,
    "syntax-top-level-await": _pluginSyntaxTopLevelAwait.default,
    "transform-arrow-functions": _pluginTransformArrowFunctions.default,
    "transform-async-to-generator": _pluginTransformAsyncToGenerator.default,
    "transform-block-scoped-functions": _pluginTransformBlockScopedFunctions.default,
    "transform-block-scoping": _pluginTransformBlockScoping.default,
    "transform-classes": _pluginTransformClasses.default,
    "transform-computed-properties": _pluginTransformComputedProperties.default,
    "transform-destructuring": _pluginTransformDestructuring.default,
    "transform-dotall-regex": _pluginTransformDotallRegex.default,
    "transform-duplicate-keys": _pluginTransformDuplicateKeys.default,
    "transform-exponentiation-operator": _pluginTransformExponentiationOperator.default,
    "transform-for-of": _pluginTransformForOf.default,
    "transform-function-name": _pluginTransformFunctionName.default,
    "transform-literals": _pluginTransformLiterals.default,
    "transform-member-expression-literals": _pluginTransformMemberExpressionLiterals.default,
    "transform-modules-amd": _pluginTransformModulesAmd.default,
    "transform-modules-commonjs": _pluginTransformModulesCommonjs.default,
    "transform-modules-systemjs": _pluginTransformModulesSystemjs.default,
    "transform-modules-umd": _pluginTransformModulesUmd.default,
    "transform-named-capturing-groups-regex": _pluginTransformNamedCapturingGroupsRegex.default,
    "transform-new-target": _pluginTransformNewTarget.default,
    "transform-object-super": _pluginTransformObjectSuper.default,
    "transform-parameters": _pluginTransformParameters.default,
    "transform-property-literals": _pluginTransformPropertyLiterals.default,
    "transform-regenerator": _pluginTransformRegenerator.default,
    "transform-reserved-words": _pluginTransformReservedWords.default,
    "transform-shorthand-properties": _pluginTransformShorthandProperties.default,
    "transform-spread": _pluginTransformSpread.default,
    "transform-sticky-regex": _pluginTransformStickyRegex.default,
    "transform-template-literals": _pluginTransformTemplateLiterals.default,
    "transform-typeof-symbol": _pluginTransformTypeofSymbol.default,
    "transform-unicode-escapes": _pluginTransformUnicodeEscapes.default,
    "transform-unicode-regex": _pluginTransformUnicodeRegex.default
  };
  exports.default = _default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  const {compare: compare, intersection: intersection, semver: semver} = __webpack_require__(311), modulesByVersions = __webpack_require__(322), modules = __webpack_require__(323);
  module.exports = function(raw) {
    const corejs = semver(raw);
    if (3 !== corejs.major) throw RangeError("This version of `core-js-compat` works only with `core-js@3`.");
    const result = [];
    for (const version of Object.keys(modulesByVersions)) compare(version, "<=", corejs) && result.push(...modulesByVersions[version]);
    return intersection(result, modules);
  };
}, function(module, exports) {
  const debug = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
  module.exports = debug;
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
  "use strict";
  const array = [], charCodeCache = [], leven = (left, right) => {
    if (left === right) return 0;
    const swap = left;
    left.length > right.length && (left = right, right = swap);
    let leftLength = left.length, rightLength = right.length;
    for (;leftLength > 0 && left.charCodeAt(~-leftLength) === right.charCodeAt(~-rightLength); ) leftLength--, 
    rightLength--;
    let bCharCode, result, temp, temp2, start = 0;
    for (;start < leftLength && left.charCodeAt(start) === right.charCodeAt(start); ) start++;
    if (leftLength -= start, rightLength -= start, 0 === leftLength) return rightLength;
    let i = 0, j = 0;
    for (;i < leftLength; ) charCodeCache[i] = left.charCodeAt(start + i), array[i] = ++i;
    for (;j < rightLength; ) for (bCharCode = right.charCodeAt(start + j), temp = j++, 
    result = j, i = 0; i < leftLength; i++) temp2 = bCharCode === charCodeCache[i] ? temp : temp + 1, 
    temp = array[i], result = array[i] = temp > result ? temp2 > result ? result + 1 : temp2 : temp2 > temp ? temp + 1 : temp2;
    return result;
  };
  module.exports = leven, module.exports.default = leven;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isPluginRequired = function(targets, support) {
    return (0, _helperCompilationTargets.isRequired)("fake-name", targets, {
      compatData: {
        "fake-name": support
      }
    });
  }, exports.default = exports.getPolyfillPlugins = exports.getModulesPluginNames = exports.transformIncludesAndExcludes = void 0;
  __webpack_require__(103);
  var _debug = __webpack_require__(110), _getOptionSpecificExcludes = _interopRequireDefault(__webpack_require__(246)), _filterItems = __webpack_require__(247), _moduleTransformations = _interopRequireDefault(__webpack_require__(197)), _normalizeOptions = _interopRequireDefault(__webpack_require__(248)), _shippedProposals = __webpack_require__(303), _pluginsCompatData = __webpack_require__(198), _overlappingPlugins = _interopRequireDefault(__webpack_require__(304)), _usagePlugin = _interopRequireDefault(__webpack_require__(306)), _usagePlugin2 = _interopRequireDefault(__webpack_require__(308)), _usagePlugin3 = _interopRequireDefault(__webpack_require__(325)), _entryPlugin = _interopRequireDefault(__webpack_require__(326)), _entryPlugin2 = _interopRequireDefault(__webpack_require__(327)), _entryPlugin3 = _interopRequireDefault(__webpack_require__(329)), _helperCompilationTargets = function(obj) {
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
  }(__webpack_require__(104)), _availablePlugins = _interopRequireDefault(__webpack_require__(199)), _utils = __webpack_require__(86), _helperPluginUtils = __webpack_require__(1);
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
  const pluginLists = {
    withProposals: {
      withoutBugfixes: _pluginsCompatData.plugins,
      withBugfixes: Object.assign({}, _pluginsCompatData.plugins, _pluginsCompatData.pluginsBugfixes)
    },
    withoutProposals: {
      withoutBugfixes: (0, _utils.filterStageFromList)(_pluginsCompatData.plugins, _shippedProposals.proposalPlugins),
      withBugfixes: (0, _utils.filterStageFromList)(Object.assign({}, _pluginsCompatData.plugins, _pluginsCompatData.pluginsBugfixes), _shippedProposals.proposalPlugins)
    }
  };
  const getPlugin = pluginName => {
    const plugin = _availablePlugins.default[pluginName];
    if (!plugin) throw new Error(`Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`);
    return plugin;
  }, transformIncludesAndExcludes = opts => opts.reduce((result, opt) => (result[opt.match(/^(es|es6|es7|esnext|web)\./) ? "builtIns" : "plugins"].add(opt), 
  result), {
    all: opts,
    plugins: new Set,
    builtIns: new Set
  });
  exports.transformIncludesAndExcludes = transformIncludesAndExcludes;
  const getModulesPluginNames = ({modules: modules, transformations: transformations, shouldTransformESM: shouldTransformESM, shouldTransformDynamicImport: shouldTransformDynamicImport, shouldParseTopLevelAwait: shouldParseTopLevelAwait}) => {
    const modulesPluginNames = [];
    return !1 !== modules && transformations[modules] ? (shouldTransformESM && modulesPluginNames.push(transformations[modules]), 
    shouldTransformDynamicImport && shouldTransformESM && "umd" !== modules ? modulesPluginNames.push("proposal-dynamic-import") : (shouldTransformDynamicImport && console.warn("Dynamic import can only be supported when transforming ES modules to AMD, CommonJS or SystemJS. Only the parser plugin will be enabled."), 
    modulesPluginNames.push("syntax-dynamic-import"))) : modulesPluginNames.push("syntax-dynamic-import"), 
    shouldParseTopLevelAwait && modulesPluginNames.push("syntax-top-level-await"), modulesPluginNames;
  };
  exports.getModulesPluginNames = getModulesPluginNames;
  const getPolyfillPlugins = ({useBuiltIns: useBuiltIns, corejs: corejs, polyfillTargets: polyfillTargets, include: include, exclude: exclude, proposals: proposals, shippedProposals: shippedProposals, regenerator: regenerator, debug: debug}) => {
    const polyfillPlugins = [];
    if ("usage" === useBuiltIns || "entry" === useBuiltIns) {
      const pluginOptions = {
        corejs: corejs,
        polyfillTargets: polyfillTargets,
        include: include,
        exclude: exclude,
        proposals: proposals,
        shippedProposals: shippedProposals,
        regenerator: regenerator,
        debug: debug
      };
      corejs && ("usage" === useBuiltIns ? (2 === corejs.major ? polyfillPlugins.push([ _usagePlugin.default, pluginOptions ]) : polyfillPlugins.push([ _usagePlugin2.default, pluginOptions ]), 
      regenerator && polyfillPlugins.push([ _usagePlugin3.default, pluginOptions ])) : 2 === corejs.major ? polyfillPlugins.push([ _entryPlugin.default, pluginOptions ]) : (polyfillPlugins.push([ _entryPlugin2.default, pluginOptions ]), 
      regenerator || polyfillPlugins.push([ _entryPlugin3.default, pluginOptions ])));
    }
    return polyfillPlugins;
  };
  function supportsStaticESM(caller) {
    return !!(null == caller ? void 0 : caller.supportsStaticESM);
  }
  function supportsDynamicImport(caller) {
    return !!(null == caller ? void 0 : caller.supportsDynamicImport);
  }
  function supportsTopLevelAwait(caller) {
    return !!(null == caller ? void 0 : caller.supportsTopLevelAwait);
  }
  exports.getPolyfillPlugins = getPolyfillPlugins;
  var _default = (0, _helperPluginUtils.declare)((api, opts) => {
    api.assertVersion(7);
    const {bugfixes: bugfixes, configPath: configPath, debug: debug, exclude: optionsExclude, forceAllTransforms: forceAllTransforms, ignoreBrowserslistConfig: ignoreBrowserslistConfig, include: optionsInclude, loose: loose, modules: modules, shippedProposals: shippedProposals, spec: spec, targets: optionsTargets, useBuiltIns: useBuiltIns, corejs: {version: corejs, proposals: proposals}, browserslistEnv: browserslistEnv} = (0, 
    _normalizeOptions.default)(opts);
    let hasUglifyTarget = !1;
    (null == optionsTargets ? void 0 : optionsTargets.uglify) && (hasUglifyTarget = !0, 
    delete optionsTargets.uglify, console.log(""), console.log("The uglify target has been deprecated. Set the top level"), 
    console.log("option `forceAllTransforms: true` instead."), console.log("")), (null == optionsTargets ? void 0 : optionsTargets.esmodules) && optionsTargets.browsers && (console.log(""), 
    console.log("@babel/preset-env: esmodules and browsers targets have been specified together."), 
    console.log(`\`browsers\` target, \`${optionsTargets.browsers}\` will be ignored.`), 
    console.log(""));
    const targets = (0, _helperCompilationTargets.default)(optionsTargets, {
      ignoreBrowserslistConfig: ignoreBrowserslistConfig,
      configPath: configPath,
      browserslistEnv: browserslistEnv
    }), include = transformIncludesAndExcludes(optionsInclude), exclude = transformIncludesAndExcludes(optionsExclude), transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets, modulesPluginNames = getModulesPluginNames({
      modules: modules,
      transformations: _moduleTransformations.default,
      shouldTransformESM: "auto" !== modules || !(null == api.caller ? void 0 : api.caller(supportsStaticESM)),
      shouldTransformDynamicImport: "auto" !== modules || !(null == api.caller ? void 0 : api.caller(supportsDynamicImport)),
      shouldParseTopLevelAwait: !api.caller || api.caller(supportsTopLevelAwait)
    }), pluginNames = (0, _helperCompilationTargets.filterItems)(function(proposals, bugfixes) {
      return proposals ? bugfixes ? pluginLists.withProposals.withBugfixes : pluginLists.withProposals.withoutBugfixes : bugfixes ? pluginLists.withoutProposals.withBugfixes : pluginLists.withoutProposals.withoutBugfixes;
    }(shippedProposals, bugfixes), include.plugins, exclude.plugins, transformTargets, modulesPluginNames, (0, 
    _getOptionSpecificExcludes.default)({
      loose: loose
    }), _shippedProposals.pluginSyntaxMap);
    (0, _filterItems.removeUnnecessaryItems)(pluginNames, _overlappingPlugins.default);
    const polyfillPlugins = getPolyfillPlugins({
      useBuiltIns: useBuiltIns,
      corejs: corejs,
      polyfillTargets: targets,
      include: include.builtIns,
      exclude: exclude.builtIns,
      proposals: proposals,
      shippedProposals: shippedProposals,
      regenerator: pluginNames.has("transform-regenerator"),
      debug: debug
    }), pluginUseBuiltIns = !1 !== useBuiltIns, plugins = Array.from(pluginNames).map(pluginName => "proposal-class-properties" === pluginName || "proposal-private-methods" === pluginName || "proposal-private-property-in-object" === pluginName ? [ getPlugin(pluginName), {
      loose: loose ? "#__internal__@babel/preset-env__prefer-true-but-false-is-ok-if-it-prevents-an-error" : "#__internal__@babel/preset-env__prefer-false-but-true-is-ok-if-it-prevents-an-error"
    } ] : [ getPlugin(pluginName), {
      spec: spec,
      loose: loose,
      useBuiltIns: pluginUseBuiltIns
    } ]).concat(polyfillPlugins);
    return debug && (console.log("@babel/preset-env: `DEBUG` option"), console.log("\nUsing targets:"), 
    console.log(JSON.stringify((0, _helperCompilationTargets.prettifyTargets)(targets), null, 2)), 
    console.log("\nUsing modules transform: " + modules.toString()), console.log("\nUsing plugins:"), 
    pluginNames.forEach(pluginName => {
      (0, _debug.logPluginOrPolyfill)(pluginName, targets, _pluginsCompatData.plugins);
    }), useBuiltIns ? console.log(`\nUsing polyfills with \`${useBuiltIns}\` option:`) : console.log("\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.")), 
    {
      plugins: plugins
    };
  });
  exports.default = _default;
}, function(module, exports) {
  module.exports = require("browserslist");
}, function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(241);
}, function(module) {
  module.exports = JSON.parse('{"es6.module":{"edge":"16","firefox":"60","chrome":"61","safari":"10.1","opera":"48","ios_saf":"10.3","android":"61","op_mob":"48","and_chr":"61","and_ff":"60","samsung":"8.2"}}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.TargetNames = void 0;
  exports.TargetNames = {
    node: "node",
    chrome: "chrome",
    opera: "opera",
    edge: "edge",
    firefox: "firefox",
    safari: "safari",
    ie: "ie",
    ios: "ios",
    android: "android",
    electron: "electron",
    samsung: "samsung"
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.getInclusionReasons = function(item, targetVersions, list) {
    const minVersions = list[item] || {};
    return Object.keys(targetVersions).reduce((result, env) => {
      const minVersion = (0, _utils.getLowestImplementedVersion)(minVersions, env), targetVersion = targetVersions[env];
      if (minVersion) {
        const minIsUnreleased = (0, _utils.isUnreleasedVersion)(minVersion, env);
        (0, _utils.isUnreleasedVersion)(targetVersion, env) || !minIsUnreleased && !_semver.default.lt(targetVersion.toString(), (0, 
        _utils.semverify)(minVersion)) || (result[env] = (0, _pretty.prettifyVersion)(targetVersion));
      } else result[env] = (0, _pretty.prettifyVersion)(targetVersion);
      return result;
    }, {});
  };
  var obj, _semver = (obj = __webpack_require__(103)) && obj.__esModule ? obj : {
    default: obj
  }, _pretty = __webpack_require__(195), _utils = __webpack_require__(132);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.targetsSupported = targetsSupported, exports.isRequired = isRequired, 
  exports.default = function(list, includes, excludes, targets, defaultIncludes, defaultExcludes, pluginSyntaxMap) {
    const result = new Set, options = {
      compatData: list,
      includes: includes,
      excludes: excludes
    };
    for (const item in list) if (isRequired(item, targets, options)) result.add(item); else if (pluginSyntaxMap) {
      const shippedProposalsSyntax = pluginSyntaxMap.get(item);
      shippedProposalsSyntax && result.add(shippedProposalsSyntax);
    }
    defaultIncludes && defaultIncludes.forEach(item => !excludes.has(item) && result.add(item));
    defaultExcludes && defaultExcludes.forEach(item => !includes.has(item) && result.delete(item));
    return result;
  };
  var _semver = _interopRequireDefault(__webpack_require__(103)), _plugins = _interopRequireDefault(__webpack_require__(196)), _utils = __webpack_require__(132);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function targetsSupported(target, support) {
    const targetEnvironments = Object.keys(target);
    if (0 === targetEnvironments.length) return !1;
    return 0 === targetEnvironments.filter(environment => {
      const lowestImplementedVersion = (0, _utils.getLowestImplementedVersion)(support, environment);
      if (!lowestImplementedVersion) return !0;
      const lowestTargetedVersion = target[environment];
      if ((0, _utils.isUnreleasedVersion)(lowestTargetedVersion, environment)) return !1;
      if ((0, _utils.isUnreleasedVersion)(lowestImplementedVersion, environment)) return !0;
      if (!_semver.default.valid(lowestTargetedVersion.toString())) throw new Error(`Invalid version passed for target "${environment}": "${lowestTargetedVersion}". Versions must be in semver format (major.minor.patch)`);
      return _semver.default.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion.toString());
    }).length;
  }
  function isRequired(name, targets, {compatData: compatData = _plugins.default, includes: includes, excludes: excludes} = {}) {
    return !(null == excludes ? void 0 : excludes.has(name)) && (!!(null == includes ? void 0 : includes.has(name)) || !targetsSupported(targets, compatData[name]));
  }
}, function(module) {
  module.exports = JSON.parse('{"proposal-numeric-separator":{"chrome":"75","opera":"62","edge":"79","firefox":"70","safari":"13","node":"12.5","ios":"13","samsung":"11","electron":"6"},"proposal-class-properties":{"chrome":"74","opera":"61","edge":"79","node":"12","samsung":"11","electron":"6"},"proposal-private-methods":{"chrome":"84"},"proposal-nullish-coalescing-operator":{"chrome":"80","opera":"67","edge":"80","firefox":"72","safari":"13.1","node":"14","electron":"8.1"},"proposal-optional-chaining":{"chrome":"80","opera":"67","edge":"80","firefox":"74","safari":"13.1","node":"14","electron":"8.1"},"proposal-json-strings":{"chrome":"66","opera":"53","edge":"79","firefox":"62","safari":"12","node":"10","ios":"12","samsung":"9","electron":"3"},"proposal-optional-catch-binding":{"chrome":"66","opera":"53","edge":"79","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3"},"transform-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"proposal-async-generator-functions":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3"},"proposal-object-rest-spread":{"chrome":"60","opera":"47","edge":"79","firefox":"55","safari":"11.1","node":"8.3","ios":"11.3","samsung":"8","electron":"2"},"transform-dotall-regex":{"chrome":"62","opera":"49","edge":"79","firefox":"78","safari":"11.1","node":"8.10","ios":"11.3","samsung":"8","electron":"3"},"proposal-unicode-property-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3"},"transform-named-capturing-groups-regex":{"chrome":"64","opera":"51","edge":"79","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3"},"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"transform-exponentiation-operator":{"chrome":"52","opera":"39","edge":"14","firefox":"52","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.3"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","electron":"0.22"},"transform-literals":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-arrow-functions":{"chrome":"47","opera":"34","edge":"13","firefox":"45","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.36"},"transform-block-scoped-functions":{"chrome":"41","opera":"28","edge":"12","firefox":"46","safari":"10","node":"4","ie":"11","ios":"10","samsung":"3.4","electron":"0.22"},"transform-classes":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-object-super":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-shorthand-properties":{"chrome":"43","opera":"30","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.28"},"transform-duplicate-keys":{"chrome":"42","opera":"29","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.25"},"transform-computed-properties":{"chrome":"44","opera":"31","edge":"12","firefox":"34","safari":"7.1","node":"4","ios":"8","samsung":"4","electron":"0.30"},"transform-for-of":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-sticky-regex":{"chrome":"49","opera":"36","edge":"13","firefox":"3","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-unicode-escapes":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-unicode-regex":{"chrome":"50","opera":"37","edge":"13","firefox":"46","safari":"12","node":"6","ios":"12","samsung":"5","electron":"1.1"},"transform-spread":{"chrome":"46","opera":"33","edge":"13","firefox":"36","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-destructuring":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"11","node":"6","ios":"11","samsung":"5","electron":"0.37"},"transform-typeof-symbol":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","electron":"0.20"},"transform-new-target":{"chrome":"46","opera":"33","edge":"14","firefox":"41","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-regenerator":{"chrome":"50","opera":"37","edge":"13","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"transform-member-expression-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"transform-property-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"transform-reserved-words":{"chrome":"13","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4.4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"}}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function({loose: loose}) {
    return loose ? defaultExcludesForLooseMode : null;
  };
  const defaultExcludesForLooseMode = [ "transform-typeof-symbol" ];
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.removeUnnecessaryItems = function(items, overlapping) {
    items.forEach(item => {
      var _overlapping$item;
      null == (_overlapping$item = overlapping[item]) || _overlapping$item.forEach(name => items.delete(name));
    });
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.normalizeCoreJSOption = normalizeCoreJSOption, exports.default = function(opts) {
    (options => {
      const validOptions = Object.keys(_options.TopLevelOptions);
      for (const option in options) if (!_options.TopLevelOptions[option]) throw new Error(`Invalid Option: ${option} is not a valid top-level option.\n        Maybe you meant to use '${(0, 
      _levenary.default)(option, validOptions)}'?`);
    })(opts);
    const useBuiltIns = validateUseBuiltInsOption(opts.useBuiltIns), corejs = normalizeCoreJSOption(opts.corejs, useBuiltIns), include = expandIncludesAndExcludes(opts.include, _options.TopLevelOptions.include, !!corejs.version && corejs.version.major), exclude = expandIncludesAndExcludes(opts.exclude, _options.TopLevelOptions.exclude, !!corejs.version && corejs.version.major);
    checkDuplicateIncludeExcludes(include, exclude);
    const shippedProposals = validateBoolOption(_options.TopLevelOptions.shippedProposals, opts.shippedProposals, !1);
    return {
      bugfixes: validateBoolOption(_options.TopLevelOptions.bugfixes, opts.bugfixes, !1),
      configPath: validateConfigPathOption(opts.configPath),
      corejs: corejs,
      debug: validateBoolOption(_options.TopLevelOptions.debug, opts.debug, !1),
      include: include,
      exclude: exclude,
      forceAllTransforms: validateBoolOption(_options.TopLevelOptions.forceAllTransforms, opts.forceAllTransforms, !1),
      ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(opts.ignoreBrowserslistConfig),
      loose: validateBoolOption(_options.TopLevelOptions.loose, opts.loose, !1),
      modules: validateModulesOption(opts.modules),
      shippedProposals: shippedProposals,
      spec: validateBoolOption(_options.TopLevelOptions.spec, opts.spec, !1),
      targets: normalizeTargets(opts.targets),
      useBuiltIns: useBuiltIns,
      browserslistEnv: validateStringOption(_options.TopLevelOptions.browserslistEnv, opts.browserslistEnv)
    };
  }, exports.validateUseBuiltInsOption = exports.validateModulesOption = exports.validateIgnoreBrowserslistConfig = exports.validateStringOption = exports.validateBoolOption = exports.validateConfigPathOption = exports.checkDuplicateIncludeExcludes = exports.normalizePluginName = void 0;
  var _data = _interopRequireDefault(__webpack_require__(134)), _levenary = _interopRequireDefault(__webpack_require__(194)), _invariant = _interopRequireDefault(__webpack_require__(131)), _semver = __webpack_require__(103), _corejs2BuiltIns = _interopRequireDefault(__webpack_require__(135)), _pluginsCompatData = __webpack_require__(198), _moduleTransformations = _interopRequireDefault(__webpack_require__(197)), _options = __webpack_require__(302), _getPlatformSpecificDefault = __webpack_require__(145);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const allPluginsList = Object.keys(_pluginsCompatData.plugins), modulePlugins = [ "proposal-dynamic-import", ...Object.keys(_moduleTransformations.default).map(m => _moduleTransformations.default[m]) ], selectPlugins = (regexp, type, corejs) => Array.from(((type, corejs) => new Set([ ...allPluginsList, ..."exclude" === type ? modulePlugins : [], ...corejs ? 2 == corejs ? [ ...Object.keys(_corejs2BuiltIns.default), ..._getPlatformSpecificDefault.defaultWebIncludes ] : Object.keys(_data.default) : [] ]))(type, corejs)).filter(item => regexp instanceof RegExp && regexp.test(item)), expandIncludesAndExcludes = (plugins = [], type, corejs) => {
    if (0 === plugins.length) return [];
    const selectedPlugins = plugins.map(plugin => selectPlugins((plugin => {
      if (plugin instanceof RegExp) return plugin;
      try {
        return new RegExp(`^${normalizePluginName(plugin)}$`);
      } catch (e) {
        return null;
      }
    })(plugin), type, corejs)), invalidRegExpList = plugins.filter((p, i) => 0 === selectedPlugins[i].length);
    return (0, _invariant.default)(0 === invalidRegExpList.length, `Invalid Option: The plugins/built-ins '${invalidRegExpList.join(", ")}' passed to the '${type}' option are not\n    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`), 
    array = selectedPlugins, [].concat(...array);
    var array;
  }, normalizePluginName = plugin => plugin.replace(/^(@babel\/|babel-)(plugin-)?/, "");
  exports.normalizePluginName = normalizePluginName;
  const checkDuplicateIncludeExcludes = (include = [], exclude = []) => {
    const duplicates = include.filter(opt => exclude.indexOf(opt) >= 0);
    (0, _invariant.default)(0 === duplicates.length, `Invalid Option: The plugins/built-ins '${duplicates.join(", ")}' were found in both the "include" and\n    "exclude" options.`);
  };
  exports.checkDuplicateIncludeExcludes = checkDuplicateIncludeExcludes;
  const normalizeTargets = targets => "string" == typeof targets || Array.isArray(targets) ? {
    browsers: targets
  } : Object.assign({}, targets), validateConfigPathOption = (configPath = process.cwd()) => ((0, 
  _invariant.default)("string" == typeof configPath, `Invalid Option: The configPath option '${configPath}' is invalid, only strings are allowed.`), 
  configPath);
  exports.validateConfigPathOption = validateConfigPathOption;
  const validateBoolOption = (name, value, defaultValue) => {
    if (void 0 === value && (value = defaultValue), "boolean" != typeof value) throw new Error(`Preset env: '${name}' option must be a boolean.`);
    return value;
  };
  exports.validateBoolOption = validateBoolOption;
  const validateStringOption = (name, value, defaultValue) => {
    if (void 0 === value) value = defaultValue; else if ("string" != typeof value) throw new Error(`Preset env: '${name}' option must be a string.`);
    return value;
  };
  exports.validateStringOption = validateStringOption;
  const validateIgnoreBrowserslistConfig = ignoreBrowserslistConfig => validateBoolOption(_options.TopLevelOptions.ignoreBrowserslistConfig, ignoreBrowserslistConfig, !1);
  exports.validateIgnoreBrowserslistConfig = validateIgnoreBrowserslistConfig;
  const validateModulesOption = (modulesOpt = _options.ModulesOption.auto) => ((0, 
  _invariant.default)(_options.ModulesOption[modulesOpt.toString()] || modulesOpt === _options.ModulesOption.false, "Invalid Option: The 'modules' option must be one of \n - 'false' to indicate no module processing\n - a specific module type: 'commonjs', 'amd', 'umd', 'systemjs' - 'auto' (default) which will automatically select 'false' if the current\n   process is known to support ES module syntax, or \"commonjs\" otherwise\n"), 
  modulesOpt);
  exports.validateModulesOption = validateModulesOption;
  const validateUseBuiltInsOption = (builtInsOpt = !1) => ((0, _invariant.default)(_options.UseBuiltInsOption[builtInsOpt.toString()] || builtInsOpt === _options.UseBuiltInsOption.false, "Invalid Option: The 'useBuiltIns' option must be either\n    'false' (default) to indicate no polyfill,\n    '\"entry\"' to indicate replacing the entry polyfill, or\n    '\"usage\"' to import only used polyfills per file"), 
  builtInsOpt);
  function normalizeCoreJSOption(corejs, useBuiltIns) {
    let rawVersion, proposals = !1;
    useBuiltIns && void 0 === corejs ? (rawVersion = 2, console.warn("\nWARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.\n\nYou should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:\n\n  npm install --save core-js@2    npm install --save core-js@3\n  yarn add core-js@2              yarn add core-js@3\n")) : "object" == typeof corejs && null !== corejs ? (rawVersion = corejs.version, 
    proposals = Boolean(corejs.proposals)) : rawVersion = corejs;
    const version = !!rawVersion && (0, _semver.coerce)(String(rawVersion));
    if (!useBuiltIns && version && console.log("\nThe `corejs` option only has an effect when the `useBuiltIns` option is not `false`\n"), 
    useBuiltIns && (!version || version.major < 2 || version.major > 3)) throw new RangeError("Invalid Option: The version passed to `corejs` is invalid. Currently, only core-js@2 and core-js@3 are supported.");
    return {
      version: version,
      proposals: proposals
    };
  }
  exports.validateUseBuiltInsOption = validateUseBuiltInsOption;
}, function(module) {
  module.exports = JSON.parse('{"es6.array.copy-within":{"chrome":"45","opera":"32","edge":"12","firefox":"32","safari":"9","node":"4","ios":"9","samsung":"5","electron":"0.32"},"es6.array.every":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.fill":{"chrome":"45","opera":"32","edge":"12","firefox":"31","safari":"7.1","node":"4","ios":"8","samsung":"5","electron":"0.32"},"es6.array.filter":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.find":{"chrome":"45","opera":"32","edge":"12","firefox":"25","safari":"7.1","node":"4","ios":"8","samsung":"5","electron":"0.32"},"es6.array.find-index":{"chrome":"45","opera":"32","edge":"12","firefox":"25","safari":"7.1","node":"4","ios":"8","samsung":"5","electron":"0.32"},"es7.array.flat-map":{"chrome":"69","opera":"56","edge":"79","firefox":"62","safari":"12","node":"11","ios":"12","samsung":"10","electron":"4"},"es6.array.for-each":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.from":{"chrome":"51","opera":"38","edge":"15","firefox":"36","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es7.array.includes":{"chrome":"47","opera":"34","edge":"14","firefox":"43","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.36"},"es6.array.index-of":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.is-array":{"chrome":"5","opera":"10.50","edge":"12","firefox":"4","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.iterator":{"chrome":"38","opera":"25","edge":"12","firefox":"28","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.array.last-index-of":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.map":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.of":{"chrome":"45","opera":"32","edge":"12","firefox":"25","safari":"9","node":"4","ios":"9","samsung":"5","electron":"0.32"},"es6.array.reduce":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.reduce-right":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.some":{"chrome":"5","opera":"10.10","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.array.sort":{"chrome":"63","opera":"50","edge":"12","firefox":"5","safari":"12","node":"10","ie":"9","ios":"12","samsung":"8","electron":"3"},"es6.array.species":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.date.now":{"chrome":"5","opera":"10.50","edge":"12","firefox":"2","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.date.to-iso-string":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3.5","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.date.to-json":{"chrome":"5","opera":"12.10","edge":"12","firefox":"4","safari":"10","node":"0.10","ie":"9","android":"4","ios":"10","samsung":"1","electron":"0.20"},"es6.date.to-primitive":{"chrome":"47","opera":"34","edge":"15","firefox":"44","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.36"},"es6.date.to-string":{"chrome":"5","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"10","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.function.bind":{"chrome":"7","opera":"12","edge":"12","firefox":"4","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.function.has-instance":{"chrome":"51","opera":"38","edge":"15","firefox":"50","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.function.name":{"chrome":"5","opera":"10.50","edge":"14","firefox":"2","safari":"4","node":"0.10","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.map":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.math.acosh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.asinh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.atanh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.cbrt":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.clz32":{"chrome":"38","opera":"25","edge":"12","firefox":"31","safari":"9","node":"0.12","ios":"9","samsung":"3","electron":"0.20"},"es6.math.cosh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.expm1":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.fround":{"chrome":"38","opera":"25","edge":"12","firefox":"26","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.hypot":{"chrome":"38","opera":"25","edge":"12","firefox":"27","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.imul":{"chrome":"30","opera":"17","edge":"12","firefox":"23","safari":"7","node":"0.12","android":"4.4","ios":"7","samsung":"2","electron":"0.20"},"es6.math.log1p":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.log10":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.log2":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.sign":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"3","electron":"0.20"},"es6.math.sinh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.tanh":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.math.trunc":{"chrome":"38","opera":"25","edge":"12","firefox":"25","safari":"7.1","node":"0.12","ios":"8","samsung":"3","electron":"0.20"},"es6.number.constructor":{"chrome":"41","opera":"28","edge":"12","firefox":"36","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.number.epsilon":{"chrome":"34","opera":"21","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.number.is-finite":{"chrome":"19","opera":"15","edge":"12","firefox":"16","safari":"9","node":"0.12","android":"4.1","ios":"9","samsung":"1.5","electron":"0.20"},"es6.number.is-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"16","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.number.is-nan":{"chrome":"19","opera":"15","edge":"12","firefox":"15","safari":"9","node":"0.12","android":"4.1","ios":"9","samsung":"1.5","electron":"0.20"},"es6.number.is-safe-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"32","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.number.max-safe-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"31","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.number.min-safe-integer":{"chrome":"34","opera":"21","edge":"12","firefox":"31","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.number.parse-float":{"chrome":"34","opera":"21","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.number.parse-int":{"chrome":"34","opera":"21","edge":"12","firefox":"25","safari":"9","node":"0.12","ios":"9","samsung":"2","electron":"0.20"},"es6.object.assign":{"chrome":"49","opera":"36","edge":"13","firefox":"36","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.object.create":{"chrome":"5","opera":"12","edge":"12","firefox":"4","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es7.object.define-getter":{"chrome":"62","opera":"49","edge":"16","firefox":"48","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3"},"es7.object.define-setter":{"chrome":"62","opera":"49","edge":"16","firefox":"48","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3"},"es6.object.define-property":{"chrome":"5","opera":"12","edge":"12","firefox":"4","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.object.define-properties":{"chrome":"5","opera":"12","edge":"12","firefox":"4","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es7.object.entries":{"chrome":"54","opera":"41","edge":"14","firefox":"47","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.5"},"es6.object.freeze":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es6.object.get-own-property-descriptor":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es7.object.get-own-property-descriptors":{"chrome":"54","opera":"41","edge":"15","firefox":"50","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.5"},"es6.object.get-own-property-names":{"chrome":"40","opera":"27","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.21"},"es6.object.get-prototype-of":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es7.object.lookup-getter":{"chrome":"62","opera":"49","edge":"79","firefox":"36","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3"},"es7.object.lookup-setter":{"chrome":"62","opera":"49","edge":"79","firefox":"36","safari":"9","node":"8.10","ios":"9","samsung":"8","electron":"3"},"es6.object.prevent-extensions":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es6.object.to-string":{"chrome":"57","opera":"44","edge":"15","firefox":"51","safari":"10","node":"8","ios":"10","samsung":"7","electron":"1.7"},"es6.object.is":{"chrome":"19","opera":"15","edge":"12","firefox":"22","safari":"9","node":"0.12","android":"4.1","ios":"9","samsung":"1.5","electron":"0.20"},"es6.object.is-frozen":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es6.object.is-sealed":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es6.object.is-extensible":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es6.object.keys":{"chrome":"40","opera":"27","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.21"},"es6.object.seal":{"chrome":"44","opera":"31","edge":"12","firefox":"35","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"es6.object.set-prototype-of":{"chrome":"34","opera":"21","edge":"12","firefox":"31","safari":"9","node":"0.12","ie":"11","ios":"9","samsung":"2","electron":"0.20"},"es7.object.values":{"chrome":"54","opera":"41","edge":"14","firefox":"47","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.5"},"es6.promise":{"chrome":"51","opera":"38","edge":"14","firefox":"45","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es7.promise.finally":{"chrome":"63","opera":"50","edge":"18","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"8","electron":"3"},"es6.reflect.apply":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.construct":{"chrome":"49","opera":"36","edge":"13","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.define-property":{"chrome":"49","opera":"36","edge":"13","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.delete-property":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.get":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.get-own-property-descriptor":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.get-prototype-of":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.has":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.is-extensible":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.own-keys":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.prevent-extensions":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.set":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.reflect.set-prototype-of":{"chrome":"49","opera":"36","edge":"12","firefox":"42","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"es6.regexp.constructor":{"chrome":"50","opera":"37","edge":"79","firefox":"40","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.flags":{"chrome":"49","opera":"36","edge":"79","firefox":"37","safari":"9","node":"6","ios":"9","samsung":"5","electron":"0.37"},"es6.regexp.match":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.replace":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.split":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.search":{"chrome":"50","opera":"37","edge":"79","firefox":"49","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.regexp.to-string":{"chrome":"50","opera":"37","edge":"79","firefox":"39","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"es6.set":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.symbol":{"chrome":"51","opera":"38","edge":"79","firefox":"51","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es7.symbol.async-iterator":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3"},"es6.string.anchor":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.big":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.blink":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.bold":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.code-point-at":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.ends-with":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.fixed":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.fontcolor":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.fontsize":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.from-code-point":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.includes":{"chrome":"41","opera":"28","edge":"12","firefox":"40","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.italics":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.iterator":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","electron":"0.20"},"es6.string.link":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es7.string.pad-start":{"chrome":"57","opera":"44","edge":"15","firefox":"48","safari":"10","node":"8","ios":"10","samsung":"7","electron":"1.7"},"es7.string.pad-end":{"chrome":"57","opera":"44","edge":"15","firefox":"48","safari":"10","node":"8","ios":"10","samsung":"7","electron":"1.7"},"es6.string.raw":{"chrome":"41","opera":"28","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.repeat":{"chrome":"41","opera":"28","edge":"12","firefox":"24","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.small":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.starts-with":{"chrome":"41","opera":"28","edge":"12","firefox":"29","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"es6.string.strike":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.sub":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.sup":{"chrome":"5","opera":"15","edge":"12","firefox":"17","safari":"6","node":"0.10","android":"4","ios":"7","phantom":"2","samsung":"1","electron":"0.20"},"es6.string.trim":{"chrome":"5","opera":"10.50","edge":"12","firefox":"3.5","safari":"4","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es7.string.trim-left":{"chrome":"66","opera":"53","edge":"79","firefox":"61","safari":"12","node":"10","ios":"12","samsung":"9","electron":"3"},"es7.string.trim-right":{"chrome":"66","opera":"53","edge":"79","firefox":"61","safari":"12","node":"10","ios":"12","samsung":"9","electron":"3"},"es6.typed.array-buffer":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.data-view":{"chrome":"5","opera":"12","edge":"12","firefox":"15","safari":"5.1","node":"0.10","ie":"10","android":"4","ios":"6","phantom":"2","samsung":"1","electron":"0.20"},"es6.typed.int8-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint8-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint8-clamped-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.int16-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint16-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.int32-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.uint32-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.float32-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.typed.float64-array":{"chrome":"51","opera":"38","edge":"13","firefox":"48","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"es6.weak-map":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"9","node":"6.5","ios":"9","samsung":"5","electron":"1.2"},"es6.weak-set":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"9","node":"6.5","ios":"9","samsung":"5","electron":"1.2"}}');
}, function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(251);
}, function(module) {
  module.exports = JSON.parse('{"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"10.1","node":"7.6","ios":"10.3","samsung":"6","electron":"1.6"},"bugfix/transform-async-arrows-in-class":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"transform-parameters":{"chrome":"49","opera":"36","edge":"15","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"bugfix/transform-edge-default-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"52","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-function-name":{"chrome":"51","opera":"38","edge":"14","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"bugfix/transform-edge-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"bugfix/transform-safari-block-shadowing":{"chrome":"49","opera":"36","edge":"12","firefox":"44","safari":"11","node":"6","ie":"11","ios":"11","samsung":"5","electron":"0.37"},"bugfix/transform-safari-for-shadowing":{"chrome":"49","opera":"36","edge":"12","firefox":"4","safari":"11","node":"6","ie":"11","ios":"11","samsung":"5","electron":"0.37"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.22"},"bugfix/transform-tagged-template-caching":{"chrome":"41","opera":"28","edge":"12","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","electron":"0.22"}}');
}, function(module, exports) {
  module.exports = require("../plugins/syntax-class-properties");
}, function(module, exports) {
  module.exports = require("../plugins/syntax-top-level-await");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-async-generator-functions");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-class-properties");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-dynamic-import");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-json-strings");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-nullish-coalescing-operator");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-numeric-separator");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-object-rest-spread");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-optional-catch-binding");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-optional-chaining");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-private-methods");
}, function(module, exports) {
  module.exports = require("../plugins/proposal-unicode-property-regex");
}, function(module, exports) {
  module.exports = require("../plugins/transform-async-to-generator");
}, function(module, exports) {
  module.exports = require("../plugins/transform-arrow-functions");
}, function(module, exports) {
  module.exports = require("../plugins/transform-block-scoped-functions");
}, function(module, exports) {
  module.exports = require("../plugins/transform-block-scoping");
}, function(module, exports) {
  module.exports = require("../plugins/transform-classes");
}, function(module, exports) {
  module.exports = require("../plugins/transform-computed-properties");
}, function(module, exports) {
  module.exports = require("../plugins/transform-destructuring");
}, function(module, exports) {
  module.exports = require("../plugins/transform-dotall-regex");
}, function(module, exports) {
  module.exports = require("../plugins/transform-duplicate-keys");
}, function(module, exports) {
  module.exports = require("../plugins/transform-exponentiation-operator");
}, function(module, exports) {
  module.exports = require("../plugins/transform-for-of");
}, function(module, exports) {
  module.exports = require("../plugins/transform-function-name");
}, function(module, exports) {
  module.exports = require("../plugins/transform-literals");
}, function(module, exports) {
  module.exports = require("../plugins/transform-member-expression-literals");
}, function(module, exports) {
  module.exports = require("../plugins/transform-modules-amd");
}, function(module, exports) {
  module.exports = require("../plugins/transform-modules-commonjs");
}, function(module, exports) {
  module.exports = require("../plugins/transform-modules-systemjs");
}, function(module, exports) {
  module.exports = require("../plugins/transform-modules-umd");
}, function(module, exports) {
  module.exports = require("../plugins/transform-named-capturing-groups-regex");
}, function(module, exports) {
  module.exports = require("../plugins/transform-new-target");
}, function(module, exports) {
  module.exports = require("../plugins/transform-object-super");
}, function(module, exports) {
  module.exports = require("../plugins/transform-property-literals");
}, function(module, exports) {
  module.exports = require("../plugins/transform-regenerator");
}, function(module, exports) {
  module.exports = require("../plugins/transform-reserved-words");
}, function(module, exports) {
  module.exports = require("../plugins/transform-shorthand-properties");
}, function(module, exports) {
  module.exports = require("../plugins/transform-spread");
}, function(module, exports) {
  module.exports = require("../plugins/transform-sticky-regex");
}, function(module, exports) {
  module.exports = require("../plugins/transform-template-literals");
}, function(module, exports) {
  module.exports = require("../plugins/transform-typeof-symbol");
}, function(module, exports) {
  module.exports = require("../plugins/transform-unicode-escapes");
}, function(module, exports) {
  module.exports = require("../plugins/transform-unicode-regex");
}, function(module, exports) {
  module.exports = require("../plugins/transform-async-arrows-in-class");
}, function(module, exports) {
  module.exports = require("../plugins/transform-edge-default-parameters");
}, function(module, exports) {
  module.exports = require("../plugins/transform-edge-function-name");
}, function(module, exports) {
  module.exports = require("../plugins/transform-tagged-template-caching");
}, function(module, exports) {
  module.exports = require("../plugins/transform-safari-block-shadowing");
}, function(module, exports) {
  module.exports = require("../plugins/transform-safari-for-shadowing");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.UseBuiltInsOption = exports.ModulesOption = exports.TopLevelOptions = void 0;
  exports.TopLevelOptions = {
    bugfixes: "bugfixes",
    configPath: "configPath",
    corejs: "corejs",
    debug: "debug",
    exclude: "exclude",
    forceAllTransforms: "forceAllTransforms",
    ignoreBrowserslistConfig: "ignoreBrowserslistConfig",
    include: "include",
    loose: "loose",
    modules: "modules",
    shippedProposals: "shippedProposals",
    spec: "spec",
    targets: "targets",
    useBuiltIns: "useBuiltIns",
    browserslistEnv: "browserslistEnv"
  };
  exports.ModulesOption = {
    false: !1,
    auto: "auto",
    amd: "amd",
    commonjs: "commonjs",
    cjs: "cjs",
    systemjs: "systemjs",
    umd: "umd"
  };
  exports.UseBuiltInsOption = {
    false: !1,
    entry: "entry",
    usage: "usage"
  };
}, function(module, exports) {
  const proposalPlugins = new Set([ "proposal-class-properties", "proposal-numeric-separator", "proposal-private-methods" ]), pluginSyntaxObject = {
    "proposal-async-generator-functions": "syntax-async-generators",
    "proposal-class-properties": "syntax-class-properties",
    "proposal-json-strings": "syntax-json-strings",
    "proposal-nullish-coalescing-operator": "syntax-nullish-coalescing-operator",
    "proposal-numeric-separator": "syntax-numeric-separator",
    "proposal-object-rest-spread": "syntax-object-rest-spread",
    "proposal-optional-catch-binding": "syntax-optional-catch-binding",
    "proposal-optional-chaining": "syntax-optional-chaining",
    "proposal-private-methods": "syntax-class-properties",
    "proposal-unicode-property-regex": null
  }, pluginSyntaxEntries = Object.keys(pluginSyntaxObject).map((function(key) {
    return [ key, pluginSyntaxObject[key] ];
  })), pluginSyntaxMap = new Map(pluginSyntaxEntries);
  module.exports = {
    pluginSyntaxMap: pluginSyntaxMap,
    proposalPlugins: proposalPlugins
  };
}, function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(305);
}, function(module) {
  module.exports = JSON.parse('{"transform-async-to-generator":["bugfix/transform-async-arrows-in-class"],"transform-parameters":["bugfix/transform-edge-default-parameters"],"transform-function-name":["bugfix/transform-edge-function-name"],"transform-block-scoping":["bugfix/transform-safari-block-shadowing","bugfix/transform-safari-for-shadowing"],"transform-template-literals":["bugfix/transform-tagged-template-caching"]}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function({types: t}, {include: include, exclude: exclude, polyfillTargets: polyfillTargets, debug: debug}) {
    const polyfills = (0, _helperCompilationTargets.filterItems)(_corejs2BuiltIns.default, include, exclude, polyfillTargets, (0, 
    _getPlatformSpecificDefault.default)(polyfillTargets));
    return {
      name: "corejs2-usage",
      pre({path: path}) {
        this.polyfillsSet = new Set, this.addImport = function(builtIn) {
          this.polyfillsSet.has(builtIn) || (this.polyfillsSet.add(builtIn), (0, _utils.createImport)(path, builtIn));
        }, this.addUnsupported = function(builtIn) {
          const modules = Array.isArray(builtIn) ? builtIn : [ builtIn ];
          for (const module of modules) polyfills.has(module) && this.addImport(module);
        };
      },
      post() {
        debug && (0, _debug.logUsagePolyfills)(this.polyfillsSet, this.file.opts.filename, polyfillTargets, _corejs2BuiltIns.default);
      },
      visitor: {
        ImportDeclaration(path) {
          (0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path)) && (console.warn(NO_DIRECT_POLYFILL_IMPORT), 
          path.remove());
        },
        Program(path) {
          path.get("body").forEach(bodyPath => {
            (0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath)) && (console.warn(NO_DIRECT_POLYFILL_IMPORT), 
            bodyPath.remove());
          });
        },
        ReferencedIdentifier({node: {name: name}, parent: parent, scope: scope}) {
          if (t.isMemberExpression(parent)) return;
          if (!(0, _utils.has)(_builtInDefinitions.BuiltIns, name)) return;
          if (scope.getBindingIdentifier(name)) return;
          const BuiltInDependencies = _builtInDefinitions.BuiltIns[name];
          this.addUnsupported(BuiltInDependencies);
        },
        CallExpression(path) {
          if (path.node.arguments.length) return;
          const callee = path.node.callee;
          t.isMemberExpression(callee) && callee.computed && path.get("callee.property").matchesPattern("Symbol.iterator") && this.addImport("web.dom.iterable");
        },
        BinaryExpression(path) {
          "in" === path.node.operator && path.get("left").matchesPattern("Symbol.iterator") && this.addImport("web.dom.iterable");
        },
        YieldExpression(path) {
          path.node.delegate && this.addImport("web.dom.iterable");
        },
        MemberExpression: {
          enter(path) {
            const {node: node} = path, {object: object, property: property} = node;
            if ((0, _utils.isNamespaced)(path.get("object"))) return;
            let evaluatedPropType = object.name, propertyName = "", instanceType = "";
            if (node.computed) if (t.isStringLiteral(property)) propertyName = property.value; else {
              const result = path.get("property").evaluate();
              result.confident && result.value && (propertyName = result.value);
            } else propertyName = property.name;
            if (path.scope.getBindingIdentifier(object.name)) {
              const result = path.get("object").evaluate();
              result.value ? instanceType = (0, _utils.getType)(result.value) : result.deopt && result.deopt.isIdentifier() && (evaluatedPropType = result.deopt.node.name);
            }
            if ((0, _utils.has)(_builtInDefinitions.StaticProperties, evaluatedPropType)) {
              const BuiltInProperties = _builtInDefinitions.StaticProperties[evaluatedPropType];
              if ((0, _utils.has)(BuiltInProperties, propertyName)) {
                const StaticPropertyDependencies = BuiltInProperties[propertyName];
                this.addUnsupported(StaticPropertyDependencies);
              }
            }
            if ((0, _utils.has)(_builtInDefinitions.InstanceProperties, propertyName)) {
              let InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[propertyName];
              instanceType && (InstancePropertyDependencies = InstancePropertyDependencies.filter(module => module.includes(instanceType))), 
              this.addUnsupported(InstancePropertyDependencies);
            }
          },
          exit(path) {
            const {name: name} = path.node.object;
            if (!(0, _utils.has)(_builtInDefinitions.BuiltIns, name)) return;
            if (path.scope.getBindingIdentifier(name)) return;
            const BuiltInDependencies = _builtInDefinitions.BuiltIns[name];
            this.addUnsupported(BuiltInDependencies);
          }
        },
        VariableDeclarator(path) {
          const {node: node} = path, {id: id, init: init} = node;
          if (t.isObjectPattern(id) && (!init || !path.scope.getBindingIdentifier(init.name))) for (const {key: key} of id.properties) if (!node.computed && t.isIdentifier(key) && (0, 
          _utils.has)(_builtInDefinitions.InstanceProperties, key.name)) {
            const InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[key.name];
            this.addUnsupported(InstancePropertyDependencies);
          }
        }
      }
    };
  };
  var _corejs2BuiltIns = _interopRequireDefault(__webpack_require__(135)), _helperCompilationTargets = __webpack_require__(104), _getPlatformSpecificDefault = _interopRequireDefault(__webpack_require__(145)), _builtInDefinitions = __webpack_require__(307), _utils = __webpack_require__(86), _debug = __webpack_require__(110);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const NO_DIRECT_POLYFILL_IMPORT = "\n  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.\n  Please remove the `import '@babel/polyfill'` call or use `useBuiltIns: 'entry'` instead.";
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = void 0;
  const ArrayNatureIterators = [ "es6.object.to-string", "es6.array.iterator", "web.dom.iterable" ], CommonIterators = [ "es6.string.iterator", ...ArrayNatureIterators ], PromiseDependencies = [ "es6.object.to-string", "es6.promise" ], BuiltIns = {
    DataView: "es6.typed.data-view",
    Float32Array: "es6.typed.float32-array",
    Float64Array: "es6.typed.float64-array",
    Int8Array: "es6.typed.int8-array",
    Int16Array: "es6.typed.int16-array",
    Int32Array: "es6.typed.int32-array",
    Map: [ "es6.map", ...CommonIterators ],
    Number: "es6.number.constructor",
    Promise: PromiseDependencies,
    RegExp: [ "es6.regexp.constructor" ],
    Set: [ "es6.set", ...CommonIterators ],
    Symbol: [ "es6.symbol", "es7.symbol.async-iterator" ],
    Uint8Array: "es6.typed.uint8-array",
    Uint8ClampedArray: "es6.typed.uint8-clamped-array",
    Uint16Array: "es6.typed.uint16-array",
    Uint32Array: "es6.typed.uint32-array",
    WeakMap: [ "es6.weak-map", ...CommonIterators ],
    WeakSet: [ "es6.weak-set", ...CommonIterators ]
  };
  exports.BuiltIns = BuiltIns;
  const InstanceProperties = {
    __defineGetter__: [ "es7.object.define-getter" ],
    __defineSetter__: [ "es7.object.define-setter" ],
    __lookupGetter__: [ "es7.object.lookup-getter" ],
    __lookupSetter__: [ "es7.object.lookup-setter" ],
    anchor: [ "es6.string.anchor" ],
    big: [ "es6.string.big" ],
    bind: [ "es6.function.bind" ],
    blink: [ "es6.string.blink" ],
    bold: [ "es6.string.bold" ],
    codePointAt: [ "es6.string.code-point-at" ],
    copyWithin: [ "es6.array.copy-within" ],
    endsWith: [ "es6.string.ends-with" ],
    entries: ArrayNatureIterators,
    every: [ "es6.array.is-array" ],
    fill: [ "es6.array.fill" ],
    filter: [ "es6.array.filter" ],
    finally: [ "es7.promise.finally", ...PromiseDependencies ],
    find: [ "es6.array.find" ],
    findIndex: [ "es6.array.find-index" ],
    fixed: [ "es6.string.fixed" ],
    flags: [ "es6.regexp.flags" ],
    flatMap: [ "es7.array.flat-map" ],
    fontcolor: [ "es6.string.fontcolor" ],
    fontsize: [ "es6.string.fontsize" ],
    forEach: [ "es6.array.for-each" ],
    includes: [ "es6.string.includes", "es7.array.includes" ],
    indexOf: [ "es6.array.index-of" ],
    italics: [ "es6.string.italics" ],
    keys: ArrayNatureIterators,
    lastIndexOf: [ "es6.array.last-index-of" ],
    link: [ "es6.string.link" ],
    map: [ "es6.array.map" ],
    match: [ "es6.regexp.match" ],
    name: [ "es6.function.name" ],
    padStart: [ "es7.string.pad-start" ],
    padEnd: [ "es7.string.pad-end" ],
    reduce: [ "es6.array.reduce" ],
    reduceRight: [ "es6.array.reduce-right" ],
    repeat: [ "es6.string.repeat" ],
    replace: [ "es6.regexp.replace" ],
    search: [ "es6.regexp.search" ],
    slice: [ "es6.array.slice" ],
    small: [ "es6.string.small" ],
    some: [ "es6.array.some" ],
    sort: [ "es6.array.sort" ],
    split: [ "es6.regexp.split" ],
    startsWith: [ "es6.string.starts-with" ],
    strike: [ "es6.string.strike" ],
    sub: [ "es6.string.sub" ],
    sup: [ "es6.string.sup" ],
    toISOString: [ "es6.date.to-iso-string" ],
    toJSON: [ "es6.date.to-json" ],
    toString: [ "es6.object.to-string", "es6.date.to-string", "es6.regexp.to-string" ],
    trim: [ "es6.string.trim" ],
    trimEnd: [ "es7.string.trim-right" ],
    trimLeft: [ "es7.string.trim-left" ],
    trimRight: [ "es7.string.trim-right" ],
    trimStart: [ "es7.string.trim-left" ],
    values: ArrayNatureIterators
  };
  exports.InstanceProperties = InstanceProperties;
  const StaticProperties = {
    Array: {
      from: [ "es6.array.from", "es6.string.iterator" ],
      isArray: "es6.array.is-array",
      of: "es6.array.of"
    },
    Date: {
      now: "es6.date.now"
    },
    Object: {
      assign: "es6.object.assign",
      create: "es6.object.create",
      defineProperty: "es6.object.define-property",
      defineProperties: "es6.object.define-properties",
      entries: "es7.object.entries",
      freeze: "es6.object.freeze",
      getOwnPropertyDescriptors: "es7.object.get-own-property-descriptors",
      getOwnPropertySymbols: "es6.symbol",
      is: "es6.object.is",
      isExtensible: "es6.object.is-extensible",
      isFrozen: "es6.object.is-frozen",
      isSealed: "es6.object.is-sealed",
      keys: "es6.object.keys",
      preventExtensions: "es6.object.prevent-extensions",
      seal: "es6.object.seal",
      setPrototypeOf: "es6.object.set-prototype-of",
      values: "es7.object.values"
    },
    Math: {
      acosh: "es6.math.acosh",
      asinh: "es6.math.asinh",
      atanh: "es6.math.atanh",
      cbrt: "es6.math.cbrt",
      clz32: "es6.math.clz32",
      cosh: "es6.math.cosh",
      expm1: "es6.math.expm1",
      fround: "es6.math.fround",
      hypot: "es6.math.hypot",
      imul: "es6.math.imul",
      log1p: "es6.math.log1p",
      log10: "es6.math.log10",
      log2: "es6.math.log2",
      sign: "es6.math.sign",
      sinh: "es6.math.sinh",
      tanh: "es6.math.tanh",
      trunc: "es6.math.trunc"
    },
    String: {
      fromCodePoint: "es6.string.from-code-point",
      raw: "es6.string.raw"
    },
    Number: {
      EPSILON: "es6.number.epsilon",
      MIN_SAFE_INTEGER: "es6.number.min-safe-integer",
      MAX_SAFE_INTEGER: "es6.number.max-safe-integer",
      isFinite: "es6.number.is-finite",
      isInteger: "es6.number.is-integer",
      isSafeInteger: "es6.number.is-safe-integer",
      isNaN: "es6.number.is-nan",
      parseFloat: "es6.number.parse-float",
      parseInt: "es6.number.parse-int"
    },
    Promise: {
      all: CommonIterators,
      race: CommonIterators
    },
    Reflect: {
      apply: "es6.reflect.apply",
      construct: "es6.reflect.construct",
      defineProperty: "es6.reflect.define-property",
      deleteProperty: "es6.reflect.delete-property",
      get: "es6.reflect.get",
      getOwnPropertyDescriptor: "es6.reflect.get-own-property-descriptor",
      getPrototypeOf: "es6.reflect.get-prototype-of",
      has: "es6.reflect.has",
      isExtensible: "es6.reflect.is-extensible",
      ownKeys: "es6.reflect.own-keys",
      preventExtensions: "es6.reflect.prevent-extensions",
      set: "es6.reflect.set",
      setPrototypeOf: "es6.reflect.set-prototype-of"
    }
  };
  exports.StaticProperties = StaticProperties;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(_, {corejs: corejs, include: include, exclude: exclude, polyfillTargets: polyfillTargets, proposals: proposals, shippedProposals: shippedProposals, debug: debug}) {
    const polyfills = (0, _helperCompilationTargets.filterItems)(proposals ? _data.default : shippedProposals ? corejs3PolyfillsWithShippedProposals : corejs3PolyfillsWithoutProposals, include, exclude, polyfillTargets, null), available = new Set((0, 
    _getModulesListForTargetVersion.default)(corejs.version));
    function resolveKey(path, computed) {
      const {node: node, parent: parent, scope: scope} = path;
      if (path.isStringLiteral()) return node.value;
      const {name: name} = node, isIdentifier = path.isIdentifier();
      if (isIdentifier && !computed && !parent.computed) return name;
      if (!isIdentifier || scope.getBindingIdentifier(name)) {
        const {value: value} = path.evaluate();
        if ("string" == typeof value) return value;
      }
    }
    function resolveSource(path) {
      const {node: node, scope: scope} = path;
      let builtIn, instanceType;
      if (node && (builtIn = node.name, !path.isIdentifier() || scope.getBindingIdentifier(builtIn))) {
        const {deopt: deopt, value: value} = path.evaluate();
        void 0 !== value ? instanceType = (0, _utils.getType)(value) : (null == deopt ? void 0 : deopt.isIdentifier()) && (builtIn = deopt.node.name);
      }
      return {
        builtIn: builtIn,
        instanceType: instanceType,
        isNamespaced: (0, _utils.isNamespaced)(path)
      };
    }
    return {
      name: "corejs3-usage",
      pre() {
        this.injectedPolyfills = new Set, this.polyfillsSet = new Set, this.addUnsupported = function(builtIn) {
          const modules = Array.isArray(builtIn) ? builtIn : [ builtIn ];
          for (const module of modules) this.polyfillsSet.add(module);
        }, this.addBuiltInDependencies = function(builtIn) {
          if ((0, _utils.has)(_builtInDefinitions.BuiltIns, builtIn)) {
            const BuiltInDependencies = _builtInDefinitions.BuiltIns[builtIn];
            this.addUnsupported(BuiltInDependencies);
          }
        }, this.addPropertyDependencies = function(source = {}, key) {
          const {builtIn: builtIn, instanceType: instanceType, isNamespaced: isNamespaced} = source;
          if (isNamespaced) return;
          if (_builtInDefinitions.PossibleGlobalObjects.has(builtIn)) this.addBuiltInDependencies(key); else if ((0, 
          _utils.has)(_builtInDefinitions.StaticProperties, builtIn)) {
            const BuiltInProperties = _builtInDefinitions.StaticProperties[builtIn];
            if ((0, _utils.has)(BuiltInProperties, key)) {
              const StaticPropertyDependencies = BuiltInProperties[key];
              return this.addUnsupported(StaticPropertyDependencies);
            }
          }
          if (!(0, _utils.has)(_builtInDefinitions.InstanceProperties, key)) return;
          let InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[key];
          instanceType && (InstancePropertyDependencies = InstancePropertyDependencies.filter(m => m.includes(instanceType) || _builtInDefinitions.CommonInstanceDependencies.has(m))), 
          this.addUnsupported(InstancePropertyDependencies);
        };
      },
      post() {
        debug && (0, _debug.logUsagePolyfills)(this.injectedPolyfills, this.file.opts.filename, polyfillTargets, _data.default);
      },
      visitor: {
        ImportDeclaration(path) {
          (0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path)) && (console.warn(NO_DIRECT_POLYFILL_IMPORT), 
          path.remove());
        },
        Program: {
          enter(path) {
            path.get("body").forEach(bodyPath => {
              (0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath)) && (console.warn(NO_DIRECT_POLYFILL_IMPORT), 
              bodyPath.remove());
            });
          },
          exit(path) {
            const filtered = (0, _utils.intersection)(polyfills, this.polyfillsSet, available), reversed = Array.from(filtered).reverse();
            for (const module of reversed) this.injectedPolyfills.has(module) || (0, _utils.createImport)(path, module);
            filtered.forEach(module => this.injectedPolyfills.add(module));
          }
        },
        Import() {
          this.addUnsupported(_builtInDefinitions.PromiseDependencies);
        },
        Function({node: node}) {
          node.async && this.addUnsupported(_builtInDefinitions.PromiseDependencies);
        },
        "ForOfStatement|ArrayPattern"() {
          this.addUnsupported(_builtInDefinitions.CommonIterators);
        },
        SpreadElement({parentPath: parentPath}) {
          parentPath.isObjectExpression() || this.addUnsupported(_builtInDefinitions.CommonIterators);
        },
        YieldExpression({node: node}) {
          node.delegate && this.addUnsupported(_builtInDefinitions.CommonIterators);
        },
        ReferencedIdentifier({node: {name: name}, scope: scope}) {
          scope.getBindingIdentifier(name) || this.addBuiltInDependencies(name);
        },
        MemberExpression(path) {
          const source = resolveSource(path.get("object")), key = resolveKey(path.get("property"));
          this.addPropertyDependencies(source, key);
        },
        ObjectPattern(path) {
          const {parentPath: parentPath, parent: parent, key: key} = path;
          let source;
          if (parentPath.isVariableDeclarator()) source = resolveSource(parentPath.get("init")); else if (parentPath.isAssignmentExpression()) source = resolveSource(parentPath.get("right")); else if (parentPath.isFunctionExpression()) {
            const grand = parentPath.parentPath;
            (grand.isCallExpression() || grand.isNewExpression()) && grand.node.callee === parent && (source = resolveSource(grand.get("arguments")[key]));
          }
          for (const property of path.get("properties")) if (property.isObjectProperty()) {
            const key = resolveKey(property.get("key"));
            this.addPropertyDependencies(source, key);
          }
        },
        BinaryExpression(path) {
          if ("in" !== path.node.operator) return;
          const source = resolveSource(path.get("right")), key = resolveKey(path.get("left"), !0);
          this.addPropertyDependencies(source, key);
        }
      }
    };
  };
  var _data = _interopRequireDefault(__webpack_require__(134)), _corejs3ShippedProposals = _interopRequireDefault(__webpack_require__(309)), _getModulesListForTargetVersion = _interopRequireDefault(__webpack_require__(200)), _helperCompilationTargets = __webpack_require__(104), _builtInDefinitions = __webpack_require__(324), _utils = __webpack_require__(86), _debug = __webpack_require__(110);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const NO_DIRECT_POLYFILL_IMPORT = "\n  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.\n  Please remove the direct import of `core-js` or use `useBuiltIns: 'entry'` instead.", corejs3PolyfillsWithoutProposals = Object.keys(_data.default).filter(name => !name.startsWith("esnext.")).reduce((memo, key) => (memo[key] = _data.default[key], 
  memo), {}), corejs3PolyfillsWithShippedProposals = _corejs3ShippedProposals.default.reduce((memo, key) => (memo[key] = _data.default[key], 
  memo), Object.assign({}, corejs3PolyfillsWithoutProposals));
}, function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(310);
}, function(module) {
  module.exports = JSON.parse('["esnext.global-this","esnext.promise.all-settled","esnext.string.match-all"]');
}, function(module, exports, __webpack_require__) {
  "use strict";
  const cmp = __webpack_require__(312), semver = __webpack_require__(320), has = Function.call.bind({}.hasOwnProperty);
  module.exports = {
    compare: function(a, operator, b) {
      return cmp(semver(a), operator, semver(b));
    },
    has: has,
    intersection: function(list, order) {
      const set = list instanceof Set ? list : new Set(list);
      return order.filter(name => set.has(name));
    },
    semver: semver,
    sortObjectByKey: function(object, fn) {
      return Object.keys(object).sort(fn).reduce((memo, key) => (memo[key] = object[key], 
      memo), {});
    }
  };
}, function(module, exports, __webpack_require__) {
  const eq = __webpack_require__(313), neq = __webpack_require__(315), gt = __webpack_require__(316), gte = __webpack_require__(317), lt = __webpack_require__(318), lte = __webpack_require__(319);
  module.exports = (a, op, b, loose) => {
    switch (op) {
     case "===":
      return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
      a === b;

     case "!==":
      return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
      a !== b;

     case "":
     case "=":
     case "==":
      return eq(a, b, loose);

     case "!=":
      return neq(a, b, loose);

     case ">":
      return gt(a, b, loose);

     case ">=":
      return gte(a, b, loose);

     case "<":
      return lt(a, b, loose);

     case "<=":
      return lte(a, b, loose);

     default:
      throw new TypeError("Invalid operator: " + op);
    }
  };
}, function(module, exports, __webpack_require__) {
  const compare = __webpack_require__(105);
  module.exports = (a, b, loose) => 0 === compare(a, b, loose);
}, function(module, exports) {
  const numeric = /^[0-9]+$/, compareIdentifiers = (a, b) => {
    const anum = numeric.test(a), bnum = numeric.test(b);
    return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  module.exports = {
    compareIdentifiers: compareIdentifiers,
    rcompareIdentifiers: (a, b) => compareIdentifiers(b, a)
  };
}, function(module, exports, __webpack_require__) {
  const compare = __webpack_require__(105);
  module.exports = (a, b, loose) => 0 !== compare(a, b, loose);
}, function(module, exports, __webpack_require__) {
  const compare = __webpack_require__(105);
  module.exports = (a, b, loose) => compare(a, b, loose) > 0;
}, function(module, exports, __webpack_require__) {
  const compare = __webpack_require__(105);
  module.exports = (a, b, loose) => compare(a, b, loose) >= 0;
}, function(module, exports, __webpack_require__) {
  const compare = __webpack_require__(105);
  module.exports = (a, b, loose) => compare(a, b, loose) < 0;
}, function(module, exports, __webpack_require__) {
  const compare = __webpack_require__(105);
  module.exports = (a, b, loose) => compare(a, b, loose) <= 0;
}, function(module, exports, __webpack_require__) {
  const SemVer = __webpack_require__(146), parse = __webpack_require__(321), {re: re, t: t} = __webpack_require__(148);
  module.exports = (version, options) => {
    if (version instanceof SemVer) return version;
    if ("number" == typeof version && (version = String(version)), "string" != typeof version) return null;
    let match = null;
    if ((options = options || {}).rtl) {
      let next;
      for (;(next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length); ) match && next.index + next[0].length === match.index + match[0].length || (match = next), 
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      re[t.COERCERTL].lastIndex = -1;
    } else match = version.match(re[t.COERCE]);
    return null === match ? null : parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
  };
}, function(module, exports, __webpack_require__) {
  const {MAX_LENGTH: MAX_LENGTH} = __webpack_require__(147), {re: re, t: t} = __webpack_require__(148), SemVer = __webpack_require__(146);
  module.exports = (version, options) => {
    if (options && "object" == typeof options || (options = {
      loose: !!options,
      includePrerelease: !1
    }), version instanceof SemVer) return version;
    if ("string" != typeof version) return null;
    if (version.length > MAX_LENGTH) return null;
    if (!(options.loose ? re[t.LOOSE] : re[t.FULL]).test(version)) return null;
    try {
      return new SemVer(version, options);
    } catch (er) {
      return null;
    }
  };
}, function(module) {
  module.exports = JSON.parse('{"3.0":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set","esnext.aggregate-error","esnext.array.last-index","esnext.array.last-item","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"],"3.1":["es.string.match-all","es.symbol.match-all","esnext.symbol.replace-all"],"3.2":["es.promise.all-settled","esnext.array.is-template-object","esnext.map.update-or-insert","esnext.symbol.async-dispose"],"3.3":["es.global-this","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.upsert","esnext.weak-map.upsert"],"3.4":["es.json.stringify"],"3.5":["esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values"],"3.6":["es.regexp.sticky","es.regexp.test"]}');
}, function(module) {
  module.exports = JSON.parse('["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.global-this","es.json.stringify","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.all-settled","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set","esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"]');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.PossibleGlobalObjects = exports.CommonInstanceDependencies = exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = exports.PromiseDependencies = exports.CommonIterators = void 0;
  const ArrayNatureIterators = [ "es.array.iterator", "web.dom-collections.iterator" ], CommonIterators = [ "es.string.iterator", ...ArrayNatureIterators ];
  exports.CommonIterators = CommonIterators;
  const ArrayNatureIteratorsWithTag = [ "es.object.to-string", ...ArrayNatureIterators ], CommonIteratorsWithTag = [ "es.object.to-string", ...CommonIterators ], TypedArrayDependencies = [ "es.typed-array.copy-within", "es.typed-array.every", "es.typed-array.fill", "es.typed-array.filter", "es.typed-array.find", "es.typed-array.find-index", "es.typed-array.for-each", "es.typed-array.includes", "es.typed-array.index-of", "es.typed-array.iterator", "es.typed-array.join", "es.typed-array.last-index-of", "es.typed-array.map", "es.typed-array.reduce", "es.typed-array.reduce-right", "es.typed-array.reverse", "es.typed-array.set", "es.typed-array.slice", "es.typed-array.some", "es.typed-array.sort", "es.typed-array.subarray", "es.typed-array.to-locale-string", "es.typed-array.to-string", "es.object.to-string", "es.array.iterator", "es.array-buffer.slice" ], TypedArrayStaticMethods = {
    from: "es.typed-array.from",
    of: "es.typed-array.of"
  }, PromiseDependencies = [ "es.promise", "es.object.to-string" ];
  exports.PromiseDependencies = PromiseDependencies;
  const PromiseDependenciesWithIterators = [ ...PromiseDependencies, ...CommonIterators ], SymbolDependencies = [ "es.symbol", "es.symbol.description", "es.object.to-string" ], MapDependencies = [ "es.map", "esnext.map.delete-all", "esnext.map.every", "esnext.map.filter", "esnext.map.find", "esnext.map.find-key", "esnext.map.includes", "esnext.map.key-of", "esnext.map.map-keys", "esnext.map.map-values", "esnext.map.merge", "esnext.map.reduce", "esnext.map.some", "esnext.map.update", ...CommonIteratorsWithTag ], SetDependencies = [ "es.set", "esnext.set.add-all", "esnext.set.delete-all", "esnext.set.difference", "esnext.set.every", "esnext.set.filter", "esnext.set.find", "esnext.set.intersection", "esnext.set.is-disjoint-from", "esnext.set.is-subset-of", "esnext.set.is-superset-of", "esnext.set.join", "esnext.set.map", "esnext.set.reduce", "esnext.set.some", "esnext.set.symmetric-difference", "esnext.set.union", ...CommonIteratorsWithTag ], WeakMapDependencies = [ "es.weak-map", "esnext.weak-map.delete-all", ...CommonIteratorsWithTag ], WeakSetDependencies = [ "es.weak-set", "esnext.weak-set.add-all", "esnext.weak-set.delete-all", ...CommonIteratorsWithTag ], URLSearchParamsDependencies = [ "web.url", ...CommonIteratorsWithTag ], BuiltIns = {
    AggregateError: [ "esnext.aggregate-error", ...CommonIterators ],
    ArrayBuffer: [ "es.array-buffer.constructor", "es.array-buffer.slice", "es.object.to-string" ],
    DataView: [ "es.data-view", "es.array-buffer.slice", "es.object.to-string" ],
    Date: [ "es.date.to-string" ],
    Float32Array: [ "es.typed-array.float32-array", ...TypedArrayDependencies ],
    Float64Array: [ "es.typed-array.float64-array", ...TypedArrayDependencies ],
    Int8Array: [ "es.typed-array.int8-array", ...TypedArrayDependencies ],
    Int16Array: [ "es.typed-array.int16-array", ...TypedArrayDependencies ],
    Int32Array: [ "es.typed-array.int32-array", ...TypedArrayDependencies ],
    Uint8Array: [ "es.typed-array.uint8-array", ...TypedArrayDependencies ],
    Uint8ClampedArray: [ "es.typed-array.uint8-clamped-array", ...TypedArrayDependencies ],
    Uint16Array: [ "es.typed-array.uint16-array", ...TypedArrayDependencies ],
    Uint32Array: [ "es.typed-array.uint32-array", ...TypedArrayDependencies ],
    Map: MapDependencies,
    Number: [ "es.number.constructor" ],
    Observable: [ "esnext.observable", "esnext.symbol.observable", "es.object.to-string", ...CommonIteratorsWithTag ],
    Promise: PromiseDependencies,
    RegExp: [ "es.regexp.constructor", "es.regexp.exec", "es.regexp.to-string" ],
    Set: SetDependencies,
    Symbol: SymbolDependencies,
    URL: [ "web.url", ...URLSearchParamsDependencies ],
    URLSearchParams: URLSearchParamsDependencies,
    WeakMap: WeakMapDependencies,
    WeakSet: WeakSetDependencies,
    clearImmediate: [ "web.immediate" ],
    compositeKey: [ "esnext.composite-key" ],
    compositeSymbol: [ "esnext.composite-symbol", ...SymbolDependencies ],
    fetch: PromiseDependencies,
    globalThis: [ "es.global-this", "esnext.global-this" ],
    parseFloat: [ "es.parse-float" ],
    parseInt: [ "es.parse-int" ],
    queueMicrotask: [ "web.queue-microtask" ],
    setTimeout: [ "web.timers" ],
    setInterval: [ "web.timers" ],
    setImmediate: [ "web.immediate" ]
  };
  exports.BuiltIns = BuiltIns;
  const InstanceProperties = {
    at: [ "esnext.string.at" ],
    anchor: [ "es.string.anchor" ],
    big: [ "es.string.big" ],
    bind: [ "es.function.bind" ],
    blink: [ "es.string.blink" ],
    bold: [ "es.string.bold" ],
    codePointAt: [ "es.string.code-point-at" ],
    codePoints: [ "esnext.string.code-points" ],
    concat: [ "es.array.concat" ],
    copyWithin: [ "es.array.copy-within" ],
    description: [ "es.symbol", "es.symbol.description" ],
    endsWith: [ "es.string.ends-with" ],
    entries: ArrayNatureIteratorsWithTag,
    every: [ "es.array.every" ],
    exec: [ "es.regexp.exec" ],
    fill: [ "es.array.fill" ],
    filter: [ "es.array.filter" ],
    finally: [ "es.promise.finally", ...PromiseDependencies ],
    find: [ "es.array.find" ],
    findIndex: [ "es.array.find-index" ],
    fixed: [ "es.string.fixed" ],
    flags: [ "es.regexp.flags" ],
    flat: [ "es.array.flat", "es.array.unscopables.flat" ],
    flatMap: [ "es.array.flat-map", "es.array.unscopables.flat-map" ],
    fontcolor: [ "es.string.fontcolor" ],
    fontsize: [ "es.string.fontsize" ],
    forEach: [ "es.array.for-each", "web.dom-collections.for-each" ],
    includes: [ "es.array.includes", "es.string.includes" ],
    indexOf: [ "es.array.index-of" ],
    italics: [ "es.string.italics" ],
    join: [ "es.array.join" ],
    keys: ArrayNatureIteratorsWithTag,
    lastIndex: [ "esnext.array.last-index" ],
    lastIndexOf: [ "es.array.last-index-of" ],
    lastItem: [ "esnext.array.last-item" ],
    link: [ "es.string.link" ],
    match: [ "es.string.match", "es.regexp.exec" ],
    matchAll: [ "es.string.match-all", "esnext.string.match-all" ],
    map: [ "es.array.map" ],
    name: [ "es.function.name" ],
    padEnd: [ "es.string.pad-end" ],
    padStart: [ "es.string.pad-start" ],
    reduce: [ "es.array.reduce" ],
    reduceRight: [ "es.array.reduce-right" ],
    repeat: [ "es.string.repeat" ],
    replace: [ "es.string.replace", "es.regexp.exec" ],
    replaceAll: [ "esnext.string.replace-all" ],
    reverse: [ "es.array.reverse" ],
    search: [ "es.string.search", "es.regexp.exec" ],
    slice: [ "es.array.slice" ],
    small: [ "es.string.small" ],
    some: [ "es.array.some" ],
    sort: [ "es.array.sort" ],
    splice: [ "es.array.splice" ],
    split: [ "es.string.split", "es.regexp.exec" ],
    startsWith: [ "es.string.starts-with" ],
    strike: [ "es.string.strike" ],
    sub: [ "es.string.sub" ],
    sup: [ "es.string.sup" ],
    toFixed: [ "es.number.to-fixed" ],
    toISOString: [ "es.date.to-iso-string" ],
    toJSON: [ "es.date.to-json", "web.url.to-json" ],
    toPrecision: [ "es.number.to-precision" ],
    toString: [ "es.object.to-string", "es.regexp.to-string", "es.date.to-string" ],
    trim: [ "es.string.trim" ],
    trimEnd: [ "es.string.trim-end" ],
    trimLeft: [ "es.string.trim-start" ],
    trimRight: [ "es.string.trim-end" ],
    trimStart: [ "es.string.trim-start" ],
    values: ArrayNatureIteratorsWithTag,
    __defineGetter__: [ "es.object.define-getter" ],
    __defineSetter__: [ "es.object.define-setter" ],
    __lookupGetter__: [ "es.object.lookup-getter" ],
    __lookupSetter__: [ "es.object.lookup-setter" ]
  };
  exports.InstanceProperties = InstanceProperties;
  const StaticProperties = {
    Array: {
      from: [ "es.array.from", "es.string.iterator" ],
      isArray: [ "es.array.is-array" ],
      of: [ "es.array.of" ]
    },
    Date: {
      now: "es.date.now"
    },
    Object: {
      assign: "es.object.assign",
      create: "es.object.create",
      defineProperty: "es.object.define-property",
      defineProperties: "es.object.define-properties",
      entries: "es.object.entries",
      freeze: "es.object.freeze",
      fromEntries: [ "es.object.from-entries", "es.array.iterator" ],
      getOwnPropertyDescriptor: "es.object.get-own-property-descriptor",
      getOwnPropertyDescriptors: "es.object.get-own-property-descriptors",
      getOwnPropertyNames: "es.object.get-own-property-names",
      getOwnPropertySymbols: "es.symbol",
      getPrototypeOf: "es.object.get-prototype-of",
      is: "es.object.is",
      isExtensible: "es.object.is-extensible",
      isFrozen: "es.object.is-frozen",
      isSealed: "es.object.is-sealed",
      keys: "es.object.keys",
      preventExtensions: "es.object.prevent-extensions",
      seal: "es.object.seal",
      setPrototypeOf: "es.object.set-prototype-of",
      values: "es.object.values"
    },
    Math: {
      DEG_PER_RAD: "esnext.math.deg-per-rad",
      RAD_PER_DEG: "esnext.math.rad-per-deg",
      acosh: "es.math.acosh",
      asinh: "es.math.asinh",
      atanh: "es.math.atanh",
      cbrt: "es.math.cbrt",
      clamp: "esnext.math.clamp",
      clz32: "es.math.clz32",
      cosh: "es.math.cosh",
      degrees: "esnext.math.degrees",
      expm1: "es.math.expm1",
      fround: "es.math.fround",
      fscale: "esnext.math.fscale",
      hypot: "es.math.hypot",
      iaddh: "esnext.math.iaddh",
      imul: "es.math.imul",
      imulh: "esnext.math.imulh",
      isubh: "esnext.math.isubh",
      log1p: "es.math.log1p",
      log10: "es.math.log10",
      log2: "es.math.log2",
      radians: "esnext.math.radians",
      scale: "esnext.math.scale",
      seededPRNG: "esnext.math.seeded-prng",
      sign: "es.math.sign",
      signbit: "esnext.math.signbit",
      sinh: "es.math.sinh",
      tanh: "es.math.tanh",
      trunc: "es.math.trunc",
      umulh: "esnext.math.umulh"
    },
    String: {
      fromCodePoint: "es.string.from-code-point",
      raw: "es.string.raw"
    },
    Number: {
      EPSILON: "es.number.epsilon",
      MIN_SAFE_INTEGER: "es.number.min-safe-integer",
      MAX_SAFE_INTEGER: "es.number.max-safe-integer",
      fromString: "esnext.number.from-string",
      isFinite: "es.number.is-finite",
      isInteger: "es.number.is-integer",
      isSafeInteger: "es.number.is-safe-integer",
      isNaN: "es.number.is-nan",
      parseFloat: "es.number.parse-float",
      parseInt: "es.number.parse-int"
    },
    Map: {
      from: [ "esnext.map.from", ...MapDependencies ],
      groupBy: [ "esnext.map.group-by", ...MapDependencies ],
      keyBy: [ "esnext.map.key-by", ...MapDependencies ],
      of: [ "esnext.map.of", ...MapDependencies ]
    },
    Set: {
      from: [ "esnext.set.from", ...SetDependencies ],
      of: [ "esnext.set.of", ...SetDependencies ]
    },
    WeakMap: {
      from: [ "esnext.weak-map.from", ...WeakMapDependencies ],
      of: [ "esnext.weak-map.of", ...WeakMapDependencies ]
    },
    WeakSet: {
      from: [ "esnext.weak-set.from", ...WeakSetDependencies ],
      of: [ "esnext.weak-set.of", ...WeakSetDependencies ]
    },
    Promise: {
      all: PromiseDependenciesWithIterators,
      allSettled: [ "es.promise.all-settled", "esnext.promise.all-settled", ...PromiseDependenciesWithIterators ],
      any: [ "esnext.promise.any", "esnext.aggregate-error", ...PromiseDependenciesWithIterators ],
      race: PromiseDependenciesWithIterators,
      try: [ "esnext.promise.try", ...PromiseDependenciesWithIterators ]
    },
    Reflect: {
      apply: "es.reflect.apply",
      construct: "es.reflect.construct",
      defineMetadata: "esnext.reflect.define-metadata",
      defineProperty: "es.reflect.define-property",
      deleteMetadata: "esnext.reflect.delete-metadata",
      deleteProperty: "es.reflect.delete-property",
      get: "es.reflect.get",
      getMetadata: "esnext.reflect.get-metadata",
      getMetadataKeys: "esnext.reflect.get-metadata-keys",
      getOwnMetadata: "esnext.reflect.get-own-metadata",
      getOwnMetadataKeys: "esnext.reflect.get-own-metadata-keys",
      getOwnPropertyDescriptor: "es.reflect.get-own-property-descriptor",
      getPrototypeOf: "es.reflect.get-prototype-of",
      has: "es.reflect.has",
      hasMetadata: "esnext.reflect.has-metadata",
      hasOwnMetadata: "esnext.reflect.has-own-metadata",
      isExtensible: "es.reflect.is-extensible",
      metadata: "esnext.reflect.metadata",
      ownKeys: "es.reflect.own-keys",
      preventExtensions: "es.reflect.prevent-extensions",
      set: "es.reflect.set",
      setPrototypeOf: "es.reflect.set-prototype-of"
    },
    Symbol: {
      asyncIterator: [ "es.symbol.async-iterator" ],
      dispose: [ "esnext.symbol.dispose" ],
      hasInstance: [ "es.symbol.has-instance", "es.function.has-instance" ],
      isConcatSpreadable: [ "es.symbol.is-concat-spreadable", "es.array.concat" ],
      iterator: [ "es.symbol.iterator", ...CommonIteratorsWithTag ],
      match: [ "es.symbol.match", "es.string.match" ],
      observable: [ "esnext.symbol.observable" ],
      patternMatch: [ "esnext.symbol.pattern-match" ],
      replace: [ "es.symbol.replace", "es.string.replace" ],
      search: [ "es.symbol.search", "es.string.search" ],
      species: [ "es.symbol.species", "es.array.species" ],
      split: [ "es.symbol.split", "es.string.split" ],
      toPrimitive: [ "es.symbol.to-primitive", "es.date.to-primitive" ],
      toStringTag: [ "es.symbol.to-string-tag", "es.object.to-string", "es.math.to-string-tag", "es.json.to-string-tag" ],
      unscopables: [ "es.symbol.unscopables" ]
    },
    ArrayBuffer: {
      isView: [ "es.array-buffer.is-view" ]
    },
    Int8Array: TypedArrayStaticMethods,
    Uint8Array: TypedArrayStaticMethods,
    Uint8ClampedArray: TypedArrayStaticMethods,
    Int16Array: TypedArrayStaticMethods,
    Uint16Array: TypedArrayStaticMethods,
    Int32Array: TypedArrayStaticMethods,
    Uint32Array: TypedArrayStaticMethods,
    Float32Array: TypedArrayStaticMethods,
    Float64Array: TypedArrayStaticMethods
  };
  exports.StaticProperties = StaticProperties;
  const CommonInstanceDependencies = new Set([ "es.object.to-string", "es.object.define-getter", "es.object.define-setter", "es.object.lookup-getter", "es.object.lookup-setter", "es.regexp.exec" ]);
  exports.CommonInstanceDependencies = CommonInstanceDependencies;
  const PossibleGlobalObjects = new Set([ "global", "globalThis", "self", "window" ]);
  exports.PossibleGlobalObjects = PossibleGlobalObjects;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function() {
    return {
      name: "regenerator-usage",
      pre() {
        this.usesRegenerator = !1;
      },
      visitor: {
        Function(path) {
          const {node: node} = path;
          this.usesRegenerator || !node.generator && !node.async || (this.usesRegenerator = !0, 
          (0, _utils.createImport)(path, "regenerator-runtime"));
        }
      },
      post() {
        if (this.opts.debug && this.usesRegenerator) {
          let filename = this.file.opts.filename;
          "test" === process.env.BABEL_ENV && (filename = filename.replace(/\\/g, "/")), console.log(`\n[${filename}] Based on your code and targets, added regenerator-runtime.`);
        }
      }
    };
  };
  var _utils = __webpack_require__(86);
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(_, {include: include, exclude: exclude, polyfillTargets: polyfillTargets, regenerator: regenerator, debug: debug}) {
    const polyfills = (0, _helperCompilationTargets.filterItems)(_corejs2BuiltIns.default, include, exclude, polyfillTargets, (0, 
    _getPlatformSpecificDefault.default)(polyfillTargets));
    return {
      name: "corejs2-entry",
      visitor: {
        ImportDeclaration(path) {
          (0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path)) && this.replaceBySeparateModulesImport(path);
        },
        Program(path) {
          path.get("body").forEach(bodyPath => {
            (0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath)) && this.replaceBySeparateModulesImport(bodyPath);
          });
        }
      },
      pre() {
        this.importPolyfillIncluded = !1, this.replaceBySeparateModulesImport = function(path) {
          this.importPolyfillIncluded = !0, regenerator && (0, _utils.createImport)(path, "regenerator-runtime");
          const modules = Array.from(polyfills).reverse();
          for (const module of modules) (0, _utils.createImport)(path, module);
          path.remove();
        };
      },
      post() {
        debug && (0, _debug.logEntryPolyfills)("@babel/polyfill", this.importPolyfillIncluded, polyfills, this.file.opts.filename, polyfillTargets, _corejs2BuiltIns.default);
      }
    };
  };
  var _corejs2BuiltIns = _interopRequireDefault(__webpack_require__(135)), _helperCompilationTargets = __webpack_require__(104), _getPlatformSpecificDefault = _interopRequireDefault(__webpack_require__(145)), _utils = __webpack_require__(86), _debug = __webpack_require__(110);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function(_, {corejs: corejs, include: include, exclude: exclude, polyfillTargets: polyfillTargets, debug: debug}) {
    const polyfills = (0, _helperCompilationTargets.filterItems)(_data.default, include, exclude, polyfillTargets, null), available = new Set((0, 
    _getModulesListForTargetVersion.default)(corejs.version));
    function shouldReplace(source, modules) {
      return !!modules && (1 !== modules.length || !polyfills.has(modules[0]) || !available.has(modules[0]) || (0, 
      _utils.getModulePath)(modules[0]) !== source);
    }
    return {
      name: "corejs3-entry",
      visitor: {
        ImportDeclaration(path) {
          const source = (0, _utils.getImportSource)(path);
          if (source) if (isBabelPolyfillSource(source)) console.warn(BABEL_POLYFILL_DEPRECATION); else {
            const modules = isCoreJSSource(source);
            shouldReplace(source, modules) && this.replaceBySeparateModulesImport(path, modules);
          }
        },
        Program: {
          enter(path) {
            path.get("body").forEach(bodyPath => {
              const source = (0, _utils.getRequireSource)(bodyPath);
              if (source) if (isBabelPolyfillSource(source)) console.warn(BABEL_POLYFILL_DEPRECATION); else {
                const modules = isCoreJSSource(source);
                shouldReplace(source, modules) && this.replaceBySeparateModulesImport(bodyPath, modules);
              }
            });
          },
          exit(path) {
            const filtered = (0, _utils.intersection)(polyfills, this.polyfillsSet, available), reversed = Array.from(filtered).reverse();
            for (const module of reversed) this.injectedPolyfills.has(module) || (0, _utils.createImport)(path, module);
            filtered.forEach(module => this.injectedPolyfills.add(module));
          }
        }
      },
      pre() {
        this.injectedPolyfills = new Set, this.polyfillsSet = new Set, this.replaceBySeparateModulesImport = function(path, modules) {
          for (const module of modules) this.polyfillsSet.add(module);
          path.remove();
        };
      },
      post() {
        debug && (0, _debug.logEntryPolyfills)("core-js", this.injectedPolyfills.size > 0, this.injectedPolyfills, this.file.opts.filename, polyfillTargets, _data.default);
      }
    };
  };
  var _data = _interopRequireDefault(__webpack_require__(134)), _entries = _interopRequireDefault(__webpack_require__(328)), _getModulesListForTargetVersion = _interopRequireDefault(__webpack_require__(200)), _helperCompilationTargets = __webpack_require__(104), _utils = __webpack_require__(86), _debug = __webpack_require__(110);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function isBabelPolyfillSource(source) {
    return "@babel/polyfill" === source || "babel-polyfill" === source;
  }
  function isCoreJSSource(source) {
    return "string" == typeof source && (source = source.replace(/\\/g, "/").replace(/(\/(index)?)?(\.js)?$/i, "").toLowerCase()), 
    (0, _utils.has)(_entries.default, source) && _entries.default[source];
  }
  const BABEL_POLYFILL_DEPRECATION = "\n  `@babel/polyfill` is deprecated. Please, use required parts of `core-js`\n  and `regenerator-runtime/runtime` separately";
}, function(module) {
  module.exports = JSON.parse('{"core-js":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.global-this","es.json.stringify","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.all-settled","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set","esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"],"core-js/es":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.global-this","es.json.stringify","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.all-settled","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set"],"core-js/es/array":["es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.string.iterator"],"core-js/es/array-buffer":["es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.object.to-string"],"core-js/es/array-buffer/constructor":["es.array-buffer.constructor","es.object.to-string"],"core-js/es/array-buffer/is-view":["es.array-buffer.is-view"],"core-js/es/array-buffer/slice":["es.array-buffer.slice"],"core-js/es/array/concat":["es.array.concat"],"core-js/es/array/copy-within":["es.array.copy-within"],"core-js/es/array/entries":["es.array.iterator"],"core-js/es/array/every":["es.array.every"],"core-js/es/array/fill":["es.array.fill"],"core-js/es/array/filter":["es.array.filter"],"core-js/es/array/find":["es.array.find"],"core-js/es/array/find-index":["es.array.find-index"],"core-js/es/array/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/es/array/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/es/array/for-each":["es.array.for-each"],"core-js/es/array/from":["es.array.from","es.string.iterator"],"core-js/es/array/includes":["es.array.includes"],"core-js/es/array/index-of":["es.array.index-of"],"core-js/es/array/is-array":["es.array.is-array"],"core-js/es/array/iterator":["es.array.iterator"],"core-js/es/array/join":["es.array.join"],"core-js/es/array/keys":["es.array.iterator"],"core-js/es/array/last-index-of":["es.array.last-index-of"],"core-js/es/array/map":["es.array.map"],"core-js/es/array/of":["es.array.of"],"core-js/es/array/reduce":["es.array.reduce"],"core-js/es/array/reduce-right":["es.array.reduce-right"],"core-js/es/array/reverse":["es.array.reverse"],"core-js/es/array/slice":["es.array.slice"],"core-js/es/array/some":["es.array.some"],"core-js/es/array/sort":["es.array.sort"],"core-js/es/array/splice":["es.array.splice"],"core-js/es/array/values":["es.array.iterator"],"core-js/es/array/virtual":["es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.includes","es.array.index-of","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map"],"core-js/es/array/virtual/concat":["es.array.concat"],"core-js/es/array/virtual/copy-within":["es.array.copy-within"],"core-js/es/array/virtual/entries":["es.array.iterator"],"core-js/es/array/virtual/every":["es.array.every"],"core-js/es/array/virtual/fill":["es.array.fill"],"core-js/es/array/virtual/filter":["es.array.filter"],"core-js/es/array/virtual/find":["es.array.find"],"core-js/es/array/virtual/find-index":["es.array.find-index"],"core-js/es/array/virtual/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/es/array/virtual/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/es/array/virtual/for-each":["es.array.for-each"],"core-js/es/array/virtual/includes":["es.array.includes"],"core-js/es/array/virtual/index-of":["es.array.index-of"],"core-js/es/array/virtual/iterator":["es.array.iterator"],"core-js/es/array/virtual/join":["es.array.join"],"core-js/es/array/virtual/keys":["es.array.iterator"],"core-js/es/array/virtual/last-index-of":["es.array.last-index-of"],"core-js/es/array/virtual/map":["es.array.map"],"core-js/es/array/virtual/reduce":["es.array.reduce"],"core-js/es/array/virtual/reduce-right":["es.array.reduce-right"],"core-js/es/array/virtual/reverse":["es.array.reverse"],"core-js/es/array/virtual/slice":["es.array.slice"],"core-js/es/array/virtual/some":["es.array.some"],"core-js/es/array/virtual/sort":["es.array.sort"],"core-js/es/array/virtual/splice":["es.array.splice"],"core-js/es/array/virtual/values":["es.array.iterator"],"core-js/es/data-view":["es.data-view","es.object.to-string"],"core-js/es/date":["es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string"],"core-js/es/date/now":["es.date.now"],"core-js/es/date/to-iso-string":["es.date.to-iso-string","es.date.to-json"],"core-js/es/date/to-json":["es.date.to-json"],"core-js/es/date/to-primitive":["es.date.to-primitive"],"core-js/es/date/to-string":["es.date.to-string"],"core-js/es/function":["es.function.bind","es.function.has-instance","es.function.name"],"core-js/es/function/bind":["es.function.bind"],"core-js/es/function/has-instance":["es.function.has-instance"],"core-js/es/function/name":["es.function.name"],"core-js/es/function/virtual":["es.function.bind"],"core-js/es/function/virtual/bind":["es.function.bind"],"core-js/es/global-this":["es.global-this"],"core-js/es/instance/bind":["es.function.bind"],"core-js/es/instance/code-point-at":["es.string.code-point-at"],"core-js/es/instance/concat":["es.array.concat"],"core-js/es/instance/copy-within":["es.array.copy-within"],"core-js/es/instance/ends-with":["es.string.ends-with"],"core-js/es/instance/entries":["es.array.iterator"],"core-js/es/instance/every":["es.array.every"],"core-js/es/instance/fill":["es.array.fill"],"core-js/es/instance/filter":["es.array.filter"],"core-js/es/instance/find":["es.array.find"],"core-js/es/instance/find-index":["es.array.find-index"],"core-js/es/instance/flags":["es.regexp.flags"],"core-js/es/instance/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/es/instance/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/es/instance/for-each":["es.array.for-each"],"core-js/es/instance/includes":["es.array.includes","es.string.includes"],"core-js/es/instance/index-of":["es.array.index-of"],"core-js/es/instance/keys":["es.array.iterator"],"core-js/es/instance/last-index-of":["es.array.last-index-of"],"core-js/es/instance/map":["es.array.map"],"core-js/es/instance/match-all":["es.string.match-all"],"core-js/es/instance/pad-end":["es.string.pad-end"],"core-js/es/instance/pad-start":["es.string.pad-start"],"core-js/es/instance/reduce":["es.array.reduce"],"core-js/es/instance/reduce-right":["es.array.reduce-right"],"core-js/es/instance/repeat":["es.string.repeat"],"core-js/es/instance/reverse":["es.array.reverse"],"core-js/es/instance/slice":["es.array.slice"],"core-js/es/instance/some":["es.array.some"],"core-js/es/instance/sort":["es.array.sort"],"core-js/es/instance/splice":["es.array.splice"],"core-js/es/instance/starts-with":["es.string.starts-with"],"core-js/es/instance/trim":["es.string.trim"],"core-js/es/instance/trim-end":["es.string.trim-end"],"core-js/es/instance/trim-left":["es.string.trim-start"],"core-js/es/instance/trim-right":["es.string.trim-end"],"core-js/es/instance/trim-start":["es.string.trim-start"],"core-js/es/instance/values":["es.array.iterator"],"core-js/es/json":["es.json.stringify","es.json.to-string-tag"],"core-js/es/json/stringify":["es.json.stringify"],"core-js/es/json/to-string-tag":["es.json.to-string-tag"],"core-js/es/map":["es.map","es.object.to-string","es.string.iterator","web.dom-collections.iterator"],"core-js/es/math":["es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc"],"core-js/es/math/acosh":["es.math.acosh"],"core-js/es/math/asinh":["es.math.asinh"],"core-js/es/math/atanh":["es.math.atanh"],"core-js/es/math/cbrt":["es.math.cbrt"],"core-js/es/math/clz32":["es.math.clz32"],"core-js/es/math/cosh":["es.math.cosh"],"core-js/es/math/expm1":["es.math.expm1"],"core-js/es/math/fround":["es.math.fround"],"core-js/es/math/hypot":["es.math.hypot"],"core-js/es/math/imul":["es.math.imul"],"core-js/es/math/log10":["es.math.log10"],"core-js/es/math/log1p":["es.math.log1p"],"core-js/es/math/log2":["es.math.log2"],"core-js/es/math/sign":["es.math.sign"],"core-js/es/math/sinh":["es.math.sinh"],"core-js/es/math/tanh":["es.math.tanh"],"core-js/es/math/to-string-tag":["es.math.to-string-tag"],"core-js/es/math/trunc":["es.math.trunc"],"core-js/es/number":["es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision"],"core-js/es/number/constructor":["es.number.constructor"],"core-js/es/number/epsilon":["es.number.epsilon"],"core-js/es/number/is-finite":["es.number.is-finite"],"core-js/es/number/is-integer":["es.number.is-integer"],"core-js/es/number/is-nan":["es.number.is-nan"],"core-js/es/number/is-safe-integer":["es.number.is-safe-integer"],"core-js/es/number/max-safe-integer":["es.number.max-safe-integer"],"core-js/es/number/min-safe-integer":["es.number.min-safe-integer"],"core-js/es/number/parse-float":["es.number.parse-float"],"core-js/es/number/parse-int":["es.number.parse-int"],"core-js/es/number/to-fixed":["es.number.to-fixed"],"core-js/es/number/to-precision":["es.number.to-precision"],"core-js/es/number/virtual":["es.number.to-fixed","es.number.to-precision"],"core-js/es/number/virtual/to-fixed":["es.number.to-fixed"],"core-js/es/number/virtual/to-precision":["es.number.to-precision"],"core-js/es/object":["es.symbol","es.json.to-string-tag","es.math.to-string-tag","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values"],"core-js/es/object/assign":["es.object.assign"],"core-js/es/object/create":["es.object.create"],"core-js/es/object/define-getter":["es.object.define-getter"],"core-js/es/object/define-properties":["es.object.define-properties"],"core-js/es/object/define-property":["es.object.define-property"],"core-js/es/object/define-setter":["es.object.define-setter"],"core-js/es/object/entries":["es.object.entries"],"core-js/es/object/freeze":["es.object.freeze"],"core-js/es/object/from-entries":["es.array.iterator","es.object.from-entries"],"core-js/es/object/get-own-property-descriptor":["es.object.get-own-property-descriptor"],"core-js/es/object/get-own-property-descriptors":["es.object.get-own-property-descriptors"],"core-js/es/object/get-own-property-names":["es.object.get-own-property-names"],"core-js/es/object/get-own-property-symbols":["es.symbol"],"core-js/es/object/get-prototype-of":["es.object.get-prototype-of"],"core-js/es/object/is":["es.object.is"],"core-js/es/object/is-extensible":["es.object.is-extensible"],"core-js/es/object/is-frozen":["es.object.is-frozen"],"core-js/es/object/is-sealed":["es.object.is-sealed"],"core-js/es/object/keys":["es.object.keys"],"core-js/es/object/lookup-getter":["es.object.lookup-setter"],"core-js/es/object/lookup-setter":["es.object.lookup-setter"],"core-js/es/object/prevent-extensions":["es.object.prevent-extensions"],"core-js/es/object/seal":["es.object.seal"],"core-js/es/object/set-prototype-of":["es.object.set-prototype-of"],"core-js/es/object/to-string":["es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/es/object/values":["es.object.values"],"core-js/es/parse-float":["es.parse-float"],"core-js/es/parse-int":["es.parse-int"],"core-js/es/promise":["es.object.to-string","es.promise","es.promise.all-settled","es.promise.finally","es.string.iterator","web.dom-collections.iterator"],"core-js/es/promise/all-settled":["es.promise","es.promise.all-settled"],"core-js/es/promise/finally":["es.promise","es.promise.finally"],"core-js/es/reflect":["es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of"],"core-js/es/reflect/apply":["es.reflect.apply"],"core-js/es/reflect/construct":["es.reflect.construct"],"core-js/es/reflect/define-property":["es.reflect.define-property"],"core-js/es/reflect/delete-property":["es.reflect.delete-property"],"core-js/es/reflect/get":["es.reflect.get"],"core-js/es/reflect/get-own-property-descriptor":["es.reflect.get-own-property-descriptor"],"core-js/es/reflect/get-prototype-of":["es.reflect.get-prototype-of"],"core-js/es/reflect/has":["es.reflect.has"],"core-js/es/reflect/is-extensible":["es.reflect.is-extensible"],"core-js/es/reflect/own-keys":["es.reflect.own-keys"],"core-js/es/reflect/prevent-extensions":["es.reflect.prevent-extensions"],"core-js/es/reflect/set":["es.reflect.set"],"core-js/es/reflect/set-prototype-of":["es.reflect.set-prototype-of"],"core-js/es/regexp":["es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.string.match","es.string.replace","es.string.search","es.string.split"],"core-js/es/regexp/constructor":["es.regexp.constructor"],"core-js/es/regexp/flags":["es.regexp.flags"],"core-js/es/regexp/match":["es.string.match"],"core-js/es/regexp/replace":["es.string.replace"],"core-js/es/regexp/search":["es.string.search"],"core-js/es/regexp/split":["es.string.split"],"core-js/es/regexp/sticky":["es.regexp.sticky"],"core-js/es/regexp/test":["es.regexp.exec","es.regexp.test"],"core-js/es/regexp/to-string":["es.regexp.to-string"],"core-js/es/set":["es.object.to-string","es.set","es.string.iterator","web.dom-collections.iterator"],"core-js/es/string":["es.regexp.exec","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup"],"core-js/es/string/anchor":["es.string.anchor"],"core-js/es/string/big":["es.string.big"],"core-js/es/string/blink":["es.string.blink"],"core-js/es/string/bold":["es.string.bold"],"core-js/es/string/code-point-at":["es.string.code-point-at"],"core-js/es/string/ends-with":["es.string.ends-with"],"core-js/es/string/fixed":["es.string.fixed"],"core-js/es/string/fontcolor":["es.string.fontcolor"],"core-js/es/string/fontsize":["es.string.fontsize"],"core-js/es/string/from-code-point":["es.string.from-code-point"],"core-js/es/string/includes":["es.string.includes"],"core-js/es/string/italics":["es.string.italics"],"core-js/es/string/iterator":["es.string.iterator"],"core-js/es/string/link":["es.string.link"],"core-js/es/string/match":["es.regexp.exec","es.string.match"],"core-js/es/string/match-all":["es.string.match-all"],"core-js/es/string/pad-end":["es.string.pad-end"],"core-js/es/string/pad-start":["es.string.pad-start"],"core-js/es/string/raw":["es.string.raw"],"core-js/es/string/repeat":["es.string.repeat"],"core-js/es/string/replace":["es.regexp.exec","es.string.replace"],"core-js/es/string/search":["es.regexp.exec","es.string.search"],"core-js/es/string/small":["es.string.small"],"core-js/es/string/split":["es.regexp.exec","es.string.split"],"core-js/es/string/starts-with":["es.string.starts-with"],"core-js/es/string/strike":["es.string.strike"],"core-js/es/string/sub":["es.string.sub"],"core-js/es/string/sup":["es.string.sup"],"core-js/es/string/trim":["es.string.trim"],"core-js/es/string/trim-end":["es.string.trim-end"],"core-js/es/string/trim-left":["es.string.trim-start"],"core-js/es/string/trim-right":["es.string.trim-end"],"core-js/es/string/trim-start":["es.string.trim-start"],"core-js/es/string/virtual":["es.string.code-point-at","es.string.ends-with","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup"],"core-js/es/string/virtual/anchor":["es.string.anchor"],"core-js/es/string/virtual/big":["es.string.big"],"core-js/es/string/virtual/blink":["es.string.blink"],"core-js/es/string/virtual/bold":["es.string.bold"],"core-js/es/string/virtual/code-point-at":["es.string.code-point-at"],"core-js/es/string/virtual/ends-with":["es.string.ends-with"],"core-js/es/string/virtual/fixed":["es.string.fixed"],"core-js/es/string/virtual/fontcolor":["es.string.fontcolor"],"core-js/es/string/virtual/fontsize":["es.string.fontsize"],"core-js/es/string/virtual/includes":["es.string.includes"],"core-js/es/string/virtual/italics":["es.string.italics"],"core-js/es/string/virtual/iterator":["es.string.iterator"],"core-js/es/string/virtual/link":["es.string.link"],"core-js/es/string/virtual/match-all":["es.string.match-all"],"core-js/es/string/virtual/pad-end":["es.string.pad-end"],"core-js/es/string/virtual/pad-start":["es.string.pad-start"],"core-js/es/string/virtual/repeat":["es.string.repeat"],"core-js/es/string/virtual/small":["es.string.small"],"core-js/es/string/virtual/starts-with":["es.string.starts-with"],"core-js/es/string/virtual/strike":["es.string.strike"],"core-js/es/string/virtual/sub":["es.string.sub"],"core-js/es/string/virtual/sup":["es.string.sup"],"core-js/es/string/virtual/trim":["es.string.trim"],"core-js/es/string/virtual/trim-end":["es.string.trim-end"],"core-js/es/string/virtual/trim-left":["es.string.trim-start"],"core-js/es/string/virtual/trim-right":["es.string.trim-end"],"core-js/es/string/virtual/trim-start":["es.string.trim-start"],"core-js/es/symbol":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/es/symbol/async-iterator":["es.symbol.async-iterator"],"core-js/es/symbol/description":["es.symbol.description"],"core-js/es/symbol/for":["es.symbol"],"core-js/es/symbol/has-instance":["es.symbol.has-instance","es.function.has-instance"],"core-js/es/symbol/is-concat-spreadable":["es.symbol.is-concat-spreadable","es.array.concat"],"core-js/es/symbol/iterator":["es.symbol.iterator","es.string.iterator","web.dom-collections.iterator"],"core-js/es/symbol/key-for":["es.symbol"],"core-js/es/symbol/match":["es.symbol.match","es.string.match"],"core-js/es/symbol/match-all":["es.symbol.match-all","es.string.match-all"],"core-js/es/symbol/replace":["es.symbol.replace","es.string.replace"],"core-js/es/symbol/search":["es.symbol.search","es.string.search"],"core-js/es/symbol/species":["es.symbol.species"],"core-js/es/symbol/split":["es.symbol.split","es.string.split"],"core-js/es/symbol/to-primitive":["es.symbol.to-primitive"],"core-js/es/symbol/to-string-tag":["es.symbol.to-string-tag","es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/es/symbol/unscopables":["es.symbol.unscopables"],"core-js/es/typed-array":["es.object.to-string","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/copy-within":["es.typed-array.copy-within"],"core-js/es/typed-array/entries":["es.typed-array.iterator"],"core-js/es/typed-array/every":["es.typed-array.every"],"core-js/es/typed-array/fill":["es.typed-array.fill"],"core-js/es/typed-array/filter":["es.typed-array.filter"],"core-js/es/typed-array/find":["es.typed-array.find"],"core-js/es/typed-array/find-index":["es.typed-array.find-index"],"core-js/es/typed-array/float32-array":["es.object.to-string","es.typed-array.float32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/float64-array":["es.object.to-string","es.typed-array.float64-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/for-each":["es.typed-array.for-each"],"core-js/es/typed-array/from":["es.typed-array.from"],"core-js/es/typed-array/includes":["es.typed-array.includes"],"core-js/es/typed-array/index-of":["es.typed-array.index-of"],"core-js/es/typed-array/int16-array":["es.object.to-string","es.typed-array.int16-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/int32-array":["es.object.to-string","es.typed-array.int32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/int8-array":["es.object.to-string","es.typed-array.int8-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/iterator":["es.typed-array.iterator"],"core-js/es/typed-array/join":["es.typed-array.join"],"core-js/es/typed-array/keys":["es.typed-array.iterator"],"core-js/es/typed-array/last-index-of":["es.typed-array.last-index-of"],"core-js/es/typed-array/map":["es.typed-array.map"],"core-js/es/typed-array/methods":["es.object.to-string","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/of":["es.typed-array.of"],"core-js/es/typed-array/reduce":["es.typed-array.reduce"],"core-js/es/typed-array/reduce-right":["es.typed-array.reduce-right"],"core-js/es/typed-array/reverse":["es.typed-array.reverse"],"core-js/es/typed-array/set":["es.typed-array.set"],"core-js/es/typed-array/slice":["es.typed-array.slice"],"core-js/es/typed-array/some":["es.typed-array.some"],"core-js/es/typed-array/sort":["es.typed-array.sort"],"core-js/es/typed-array/subarray":["es.typed-array.subarray"],"core-js/es/typed-array/to-locale-string":["es.typed-array.to-locale-string"],"core-js/es/typed-array/to-string":["es.typed-array.to-string"],"core-js/es/typed-array/uint16-array":["es.object.to-string","es.typed-array.uint16-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/uint32-array":["es.object.to-string","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/uint8-array":["es.object.to-string","es.typed-array.uint8-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/uint8-clamped-array":["es.object.to-string","es.typed-array.uint8-clamped-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/es/typed-array/values":["es.typed-array.iterator"],"core-js/es/weak-map":["es.object.to-string","es.weak-map","web.dom-collections.iterator"],"core-js/es/weak-set":["es.object.to-string","es.weak-set","web.dom-collections.iterator"],"core-js/features":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.global-this","es.json.stringify","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.all-settled","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set","esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"],"core-js/features/aggregate-error":["es.string.iterator","esnext.aggregate-error","web.dom-collections.iterator"],"core-js/features/array":["es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.string.iterator","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item"],"core-js/features/array-buffer":["es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.object.to-string"],"core-js/features/array-buffer/constructor":["es.array-buffer.constructor","es.object.to-string"],"core-js/features/array-buffer/is-view":["es.array-buffer.is-view"],"core-js/features/array-buffer/slice":["es.array-buffer.slice"],"core-js/features/array/concat":["es.array.concat"],"core-js/features/array/copy-within":["es.array.copy-within"],"core-js/features/array/entries":["es.array.iterator"],"core-js/features/array/every":["es.array.every"],"core-js/features/array/fill":["es.array.fill"],"core-js/features/array/filter":["es.array.filter"],"core-js/features/array/find":["es.array.find"],"core-js/features/array/find-index":["es.array.find-index"],"core-js/features/array/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/features/array/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/features/array/for-each":["es.array.for-each"],"core-js/features/array/from":["es.array.from","es.string.iterator"],"core-js/features/array/includes":["es.array.includes"],"core-js/features/array/index-of":["es.array.index-of"],"core-js/features/array/is-array":["es.array.is-array"],"core-js/features/array/is-template-object":["esnext.array.is-template-object"],"core-js/features/array/iterator":["es.array.iterator"],"core-js/features/array/join":["es.array.join"],"core-js/features/array/keys":["es.array.iterator"],"core-js/features/array/last-index":["esnext.array.last-index"],"core-js/features/array/last-index-of":["es.array.last-index-of"],"core-js/features/array/last-item":["esnext.array.last-item"],"core-js/features/array/map":["es.array.map"],"core-js/features/array/of":["es.array.of"],"core-js/features/array/reduce":["es.array.reduce"],"core-js/features/array/reduce-right":["es.array.reduce-right"],"core-js/features/array/reverse":["es.array.reverse"],"core-js/features/array/slice":["es.array.slice"],"core-js/features/array/some":["es.array.some"],"core-js/features/array/sort":["es.array.sort"],"core-js/features/array/splice":["es.array.splice"],"core-js/features/array/values":["es.array.iterator"],"core-js/features/array/virtual":["es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.includes","es.array.index-of","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map"],"core-js/features/array/virtual/concat":["es.array.concat"],"core-js/features/array/virtual/copy-within":["es.array.copy-within"],"core-js/features/array/virtual/entries":["es.array.iterator"],"core-js/features/array/virtual/every":["es.array.every"],"core-js/features/array/virtual/fill":["es.array.fill"],"core-js/features/array/virtual/filter":["es.array.filter"],"core-js/features/array/virtual/find":["es.array.find"],"core-js/features/array/virtual/find-index":["es.array.find-index"],"core-js/features/array/virtual/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/features/array/virtual/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/features/array/virtual/for-each":["es.array.for-each"],"core-js/features/array/virtual/includes":["es.array.includes"],"core-js/features/array/virtual/index-of":["es.array.index-of"],"core-js/features/array/virtual/iterator":["es.array.iterator"],"core-js/features/array/virtual/join":["es.array.join"],"core-js/features/array/virtual/keys":["es.array.iterator"],"core-js/features/array/virtual/last-index-of":["es.array.last-index-of"],"core-js/features/array/virtual/map":["es.array.map"],"core-js/features/array/virtual/reduce":["es.array.reduce"],"core-js/features/array/virtual/reduce-right":["es.array.reduce-right"],"core-js/features/array/virtual/reverse":["es.array.reverse"],"core-js/features/array/virtual/slice":["es.array.slice"],"core-js/features/array/virtual/some":["es.array.some"],"core-js/features/array/virtual/sort":["es.array.sort"],"core-js/features/array/virtual/splice":["es.array.splice"],"core-js/features/array/virtual/values":["es.array.iterator"],"core-js/features/async-iterator":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","web.dom-collections.iterator"],"core-js/features/async-iterator/as-indexed-pairs":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","web.dom-collections.iterator"],"core-js/features/async-iterator/drop":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.drop","web.dom-collections.iterator"],"core-js/features/async-iterator/every":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.every","web.dom-collections.iterator"],"core-js/features/async-iterator/filter":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.filter","web.dom-collections.iterator"],"core-js/features/async-iterator/find":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.find","web.dom-collections.iterator"],"core-js/features/async-iterator/flat-map":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.flat-map","web.dom-collections.iterator"],"core-js/features/async-iterator/for-each":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.for-each","web.dom-collections.iterator"],"core-js/features/async-iterator/from":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.from","web.dom-collections.iterator"],"core-js/features/async-iterator/map":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.map","web.dom-collections.iterator"],"core-js/features/async-iterator/reduce":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.reduce","web.dom-collections.iterator"],"core-js/features/async-iterator/some":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.some","web.dom-collections.iterator"],"core-js/features/async-iterator/take":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.take","web.dom-collections.iterator"],"core-js/features/async-iterator/to-array":["es.object.to-string","es.promise","es.string.iterator","esnext.async-iterator.constructor","esnext.async-iterator.to-array","web.dom-collections.iterator"],"core-js/features/clear-immediate":["web.immediate"],"core-js/features/composite-key":["esnext.composite-key"],"core-js/features/composite-symbol":["es.symbol","esnext.composite-symbol"],"core-js/features/data-view":["es.data-view","es.object.to-string"],"core-js/features/date":["es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string"],"core-js/features/date/now":["es.date.now"],"core-js/features/date/to-iso-string":["es.date.to-iso-string","es.date.to-json"],"core-js/features/date/to-json":["es.date.to-json"],"core-js/features/date/to-primitive":["es.date.to-primitive"],"core-js/features/date/to-string":["es.date.to-string"],"core-js/features/dom-collections":["es.array.iterator","web.dom-collections.for-each","web.dom-collections.iterator"],"core-js/features/dom-collections/for-each":["web.dom-collections.for-each"],"core-js/features/dom-collections/iterator":["web.dom-collections.iterator"],"core-js/features/function":["es.function.bind","es.function.has-instance","es.function.name"],"core-js/features/function/bind":["es.function.bind"],"core-js/features/function/has-instance":["es.function.has-instance"],"core-js/features/function/name":["es.function.name"],"core-js/features/function/virtual":["es.function.bind"],"core-js/features/function/virtual/bind":["es.function.bind"],"core-js/features/get-iterator":["es.string.iterator","web.dom-collections.iterator"],"core-js/features/get-iterator-method":["es.string.iterator","web.dom-collections.iterator"],"core-js/features/global-this":["es.global-this","esnext.global-this"],"core-js/features/instance/at":["esnext.string.at"],"core-js/features/instance/bind":["es.function.bind"],"core-js/features/instance/code-point-at":["es.string.code-point-at"],"core-js/features/instance/code-points":["esnext.string.code-points"],"core-js/features/instance/concat":["es.array.concat"],"core-js/features/instance/copy-within":["es.array.copy-within"],"core-js/features/instance/ends-with":["es.string.ends-with"],"core-js/features/instance/entries":["es.array.iterator","web.dom-collections.iterator"],"core-js/features/instance/every":["es.array.every"],"core-js/features/instance/fill":["es.array.fill"],"core-js/features/instance/filter":["es.array.filter"],"core-js/features/instance/find":["es.array.find"],"core-js/features/instance/find-index":["es.array.find-index"],"core-js/features/instance/flags":["es.regexp.flags"],"core-js/features/instance/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/features/instance/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/features/instance/for-each":["es.array.for-each","web.dom-collections.iterator"],"core-js/features/instance/includes":["es.array.includes","es.string.includes"],"core-js/features/instance/index-of":["es.array.index-of"],"core-js/features/instance/keys":["es.array.iterator","web.dom-collections.iterator"],"core-js/features/instance/last-index-of":["es.array.last-index-of"],"core-js/features/instance/map":["es.array.map"],"core-js/features/instance/match-all":["es.string.match-all","esnext.string.match-all"],"core-js/features/instance/pad-end":["es.string.pad-end"],"core-js/features/instance/pad-start":["es.string.pad-start"],"core-js/features/instance/reduce":["es.array.reduce"],"core-js/features/instance/reduce-right":["es.array.reduce-right"],"core-js/features/instance/repeat":["es.string.repeat"],"core-js/features/instance/replace-all":["esnext.string.replace-all"],"core-js/features/instance/reverse":["es.array.reverse"],"core-js/features/instance/slice":["es.array.slice"],"core-js/features/instance/some":["es.array.some"],"core-js/features/instance/sort":["es.array.sort"],"core-js/features/instance/splice":["es.array.splice"],"core-js/features/instance/starts-with":["es.string.starts-with"],"core-js/features/instance/trim":["es.string.trim"],"core-js/features/instance/trim-end":["es.string.trim-end"],"core-js/features/instance/trim-left":["es.string.trim-start"],"core-js/features/instance/trim-right":["es.string.trim-end"],"core-js/features/instance/trim-start":["es.string.trim-start"],"core-js/features/instance/values":["es.array.iterator","web.dom-collections.iterator"],"core-js/features/is-iterable":["es.string.iterator","web.dom-collections.iterator"],"core-js/features/iterator":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","web.dom-collections.iterator"],"core-js/features/iterator/as-indexed-pairs":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","web.dom-collections.iterator"],"core-js/features/iterator/drop":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.drop","web.dom-collections.iterator"],"core-js/features/iterator/every":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.every","web.dom-collections.iterator"],"core-js/features/iterator/filter":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.filter","web.dom-collections.iterator"],"core-js/features/iterator/find":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.find","web.dom-collections.iterator"],"core-js/features/iterator/flat-map":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.flat-map","web.dom-collections.iterator"],"core-js/features/iterator/for-each":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.for-each","web.dom-collections.iterator"],"core-js/features/iterator/from":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.from","web.dom-collections.iterator"],"core-js/features/iterator/map":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.map","web.dom-collections.iterator"],"core-js/features/iterator/reduce":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.reduce","web.dom-collections.iterator"],"core-js/features/iterator/some":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.some","web.dom-collections.iterator"],"core-js/features/iterator/take":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.take","web.dom-collections.iterator"],"core-js/features/iterator/to-array":["es.object.to-string","es.string.iterator","esnext.iterator.constructor","esnext.iterator.to-array","web.dom-collections.iterator"],"core-js/features/json":["es.json.stringify","es.json.to-string-tag"],"core-js/features/json/stringify":["es.json.stringify"],"core-js/features/json/to-string-tag":["es.json.to-string-tag"],"core-js/features/map":["es.map","es.object.to-string","es.string.iterator","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","web.dom-collections.iterator"],"core-js/features/map/delete-all":["es.map","esnext.map.delete-all"],"core-js/features/map/every":["es.map","esnext.map.every"],"core-js/features/map/filter":["es.map","esnext.map.filter"],"core-js/features/map/find":["es.map","esnext.map.find"],"core-js/features/map/find-key":["es.map","esnext.map.find-key"],"core-js/features/map/from":["es.map","es.string.iterator","esnext.map.from","web.dom-collections.iterator"],"core-js/features/map/group-by":["es.map","esnext.map.group-by"],"core-js/features/map/includes":["es.map","esnext.map.includes"],"core-js/features/map/key-by":["es.map","esnext.map.key-by"],"core-js/features/map/key-of":["es.map","esnext.map.key-of"],"core-js/features/map/map-keys":["es.map","esnext.map.map-keys"],"core-js/features/map/map-values":["es.map","esnext.map.map-values"],"core-js/features/map/merge":["es.map","esnext.map.merge"],"core-js/features/map/of":["es.map","es.string.iterator","esnext.map.of","web.dom-collections.iterator"],"core-js/features/map/reduce":["es.map","esnext.map.reduce"],"core-js/features/map/some":["es.map","esnext.map.some"],"core-js/features/map/update":["es.map","esnext.map.update"],"core-js/features/map/update-or-insert":["es.map","esnext.map.update-or-insert"],"core-js/features/map/upsert":["es.map","esnext.map.upsert"],"core-js/features/math":["es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh"],"core-js/features/math/acosh":["es.math.acosh"],"core-js/features/math/asinh":["es.math.asinh"],"core-js/features/math/atanh":["es.math.atanh"],"core-js/features/math/cbrt":["es.math.cbrt"],"core-js/features/math/clamp":["esnext.math.clamp"],"core-js/features/math/clz32":["es.math.clz32"],"core-js/features/math/cosh":["es.math.cosh"],"core-js/features/math/deg-per-rad":["esnext.math.deg-per-rad"],"core-js/features/math/degrees":["esnext.math.degrees"],"core-js/features/math/expm1":["es.math.expm1"],"core-js/features/math/fround":["es.math.fround"],"core-js/features/math/fscale":["esnext.math.fscale"],"core-js/features/math/hypot":["es.math.hypot"],"core-js/features/math/iaddh":["esnext.math.iaddh"],"core-js/features/math/imul":["es.math.imul"],"core-js/features/math/imulh":["esnext.math.imulh"],"core-js/features/math/isubh":["esnext.math.isubh"],"core-js/features/math/log10":["es.math.log10"],"core-js/features/math/log1p":["es.math.log1p"],"core-js/features/math/log2":["es.math.log2"],"core-js/features/math/rad-per-deg":["esnext.math.rad-per-deg"],"core-js/features/math/radians":["esnext.math.radians"],"core-js/features/math/scale":["esnext.math.scale"],"core-js/features/math/seeded-prng":["esnext.math.seeded-prng"],"core-js/features/math/sign":["es.math.sign"],"core-js/features/math/signbit":["esnext.math.signbit"],"core-js/features/math/sinh":["es.math.sinh"],"core-js/features/math/tanh":["es.math.tanh"],"core-js/features/math/to-string-tag":["es.math.to-string-tag"],"core-js/features/math/trunc":["es.math.trunc"],"core-js/features/math/umulh":["esnext.math.umulh"],"core-js/features/number":["es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","esnext.number.from-string"],"core-js/features/number/constructor":["es.number.constructor"],"core-js/features/number/epsilon":["es.number.epsilon"],"core-js/features/number/from-string":["esnext.number.from-string"],"core-js/features/number/is-finite":["es.number.is-finite"],"core-js/features/number/is-integer":["es.number.is-integer"],"core-js/features/number/is-nan":["es.number.is-nan"],"core-js/features/number/is-safe-integer":["es.number.is-safe-integer"],"core-js/features/number/max-safe-integer":["es.number.max-safe-integer"],"core-js/features/number/min-safe-integer":["es.number.min-safe-integer"],"core-js/features/number/parse-float":["es.number.parse-float"],"core-js/features/number/parse-int":["es.number.parse-int"],"core-js/features/number/to-fixed":["es.number.to-fixed"],"core-js/features/number/to-precision":["es.number.to-precision"],"core-js/features/number/virtual":["es.number.to-fixed","es.number.to-precision"],"core-js/features/number/virtual/to-fixed":["es.number.to-fixed"],"core-js/features/number/virtual/to-precision":["es.number.to-precision"],"core-js/features/object":["es.symbol","es.json.to-string-tag","es.math.to-string-tag","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values"],"core-js/features/object/assign":["es.object.assign"],"core-js/features/object/create":["es.object.create"],"core-js/features/object/define-getter":["es.object.define-getter"],"core-js/features/object/define-properties":["es.object.define-properties"],"core-js/features/object/define-property":["es.object.define-property"],"core-js/features/object/define-setter":["es.object.define-setter"],"core-js/features/object/entries":["es.object.entries"],"core-js/features/object/freeze":["es.object.freeze"],"core-js/features/object/from-entries":["es.array.iterator","es.object.from-entries"],"core-js/features/object/get-own-property-descriptor":["es.object.get-own-property-descriptor"],"core-js/features/object/get-own-property-descriptors":["es.object.get-own-property-descriptors"],"core-js/features/object/get-own-property-names":["es.object.get-own-property-names"],"core-js/features/object/get-own-property-symbols":["es.symbol"],"core-js/features/object/get-prototype-of":["es.object.get-prototype-of"],"core-js/features/object/is":["es.object.is"],"core-js/features/object/is-extensible":["es.object.is-extensible"],"core-js/features/object/is-frozen":["es.object.is-frozen"],"core-js/features/object/is-sealed":["es.object.is-sealed"],"core-js/features/object/iterate-entries":["esnext.object.iterate-entries"],"core-js/features/object/iterate-keys":["esnext.object.iterate-keys"],"core-js/features/object/iterate-values":["esnext.object.iterate-values"],"core-js/features/object/keys":["es.object.keys"],"core-js/features/object/lookup-getter":["es.object.lookup-setter"],"core-js/features/object/lookup-setter":["es.object.lookup-setter"],"core-js/features/object/prevent-extensions":["es.object.prevent-extensions"],"core-js/features/object/seal":["es.object.seal"],"core-js/features/object/set-prototype-of":["es.object.set-prototype-of"],"core-js/features/object/to-string":["es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/features/object/values":["es.object.values"],"core-js/features/observable":["es.object.to-string","es.string.iterator","esnext.observable","esnext.symbol.observable","web.dom-collections.iterator"],"core-js/features/parse-float":["es.parse-float"],"core-js/features/parse-int":["es.parse-int"],"core-js/features/promise":["es.object.to-string","es.promise","es.promise.all-settled","es.promise.finally","es.string.iterator","esnext.aggregate-error","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","web.dom-collections.iterator"],"core-js/features/promise/all-settled":["es.promise","es.promise.all-settled","esnext.promise.all-settled"],"core-js/features/promise/any":["es.promise","esnext.aggregate-error","esnext.promise.any"],"core-js/features/promise/finally":["es.promise","es.promise.finally"],"core-js/features/promise/try":["es.promise","esnext.promise.try"],"core-js/features/queue-microtask":["web.queue-microtask"],"core-js/features/reflect":["es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata"],"core-js/features/reflect/apply":["es.reflect.apply"],"core-js/features/reflect/construct":["es.reflect.construct"],"core-js/features/reflect/define-metadata":["esnext.reflect.define-metadata"],"core-js/features/reflect/define-property":["es.reflect.define-property"],"core-js/features/reflect/delete-metadata":["esnext.reflect.delete-metadata"],"core-js/features/reflect/delete-property":["es.reflect.delete-property"],"core-js/features/reflect/get":["es.reflect.get"],"core-js/features/reflect/get-metadata":["esnext.reflect.get-metadata"],"core-js/features/reflect/get-metadata-keys":["esnext.reflect.get-metadata-keys"],"core-js/features/reflect/get-own-metadata":["esnext.reflect.get-own-metadata"],"core-js/features/reflect/get-own-metadata-keys":["esnext.reflect.get-own-metadata-keys"],"core-js/features/reflect/get-own-property-descriptor":["es.reflect.get-own-property-descriptor"],"core-js/features/reflect/get-prototype-of":["es.reflect.get-prototype-of"],"core-js/features/reflect/has":["es.reflect.has"],"core-js/features/reflect/has-metadata":["esnext.reflect.has-metadata"],"core-js/features/reflect/has-own-metadata":["esnext.reflect.has-own-metadata"],"core-js/features/reflect/is-extensible":["es.reflect.is-extensible"],"core-js/features/reflect/metadata":["esnext.reflect.metadata"],"core-js/features/reflect/own-keys":["es.reflect.own-keys"],"core-js/features/reflect/prevent-extensions":["es.reflect.prevent-extensions"],"core-js/features/reflect/set":["es.reflect.set"],"core-js/features/reflect/set-prototype-of":["es.reflect.set-prototype-of"],"core-js/features/regexp":["es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.string.match","es.string.replace","es.string.search","es.string.split"],"core-js/features/regexp/constructor":["es.regexp.constructor"],"core-js/features/regexp/flags":["es.regexp.flags"],"core-js/features/regexp/match":["es.string.match"],"core-js/features/regexp/replace":["es.string.replace"],"core-js/features/regexp/search":["es.string.search"],"core-js/features/regexp/split":["es.string.split"],"core-js/features/regexp/sticky":["es.regexp.sticky"],"core-js/features/regexp/test":["es.regexp.exec","es.regexp.test"],"core-js/features/regexp/to-string":["es.regexp.to-string"],"core-js/features/set":["es.object.to-string","es.set","es.string.iterator","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","web.dom-collections.iterator"],"core-js/features/set-immediate":["web.immediate"],"core-js/features/set-interval":["web.timers"],"core-js/features/set-timeout":["web.timers"],"core-js/features/set/add-all":["es.set","esnext.set.add-all"],"core-js/features/set/delete-all":["es.set","esnext.set.delete-all"],"core-js/features/set/difference":["es.set","es.string.iterator","esnext.set.difference","web.dom-collections.iterator"],"core-js/features/set/every":["es.set","esnext.set.every"],"core-js/features/set/filter":["es.set","esnext.set.filter"],"core-js/features/set/find":["es.set","esnext.set.find"],"core-js/features/set/from":["es.set","es.string.iterator","esnext.set.from","web.dom-collections.iterator"],"core-js/features/set/intersection":["es.set","esnext.set.intersection"],"core-js/features/set/is-disjoint-from":["es.set","esnext.set.is-disjoint-from"],"core-js/features/set/is-subset-of":["es.set","es.string.iterator","esnext.set.is-subset-of","web.dom-collections.iterator"],"core-js/features/set/is-superset-of":["es.set","esnext.set.is-superset-of"],"core-js/features/set/join":["es.set","esnext.set.join"],"core-js/features/set/map":["es.set","esnext.set.map"],"core-js/features/set/of":["es.set","es.string.iterator","esnext.set.of","web.dom-collections.iterator"],"core-js/features/set/reduce":["es.set","esnext.set.reduce"],"core-js/features/set/some":["es.set","esnext.set.some"],"core-js/features/set/symmetric-difference":["es.set","es.string.iterator","esnext.set.symmetric-difference","web.dom-collections.iterator"],"core-js/features/set/union":["es.set","es.string.iterator","esnext.set.union","web.dom-collections.iterator"],"core-js/features/string":["es.regexp.exec","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all"],"core-js/features/string/anchor":["es.string.anchor"],"core-js/features/string/at":["esnext.string.at"],"core-js/features/string/big":["es.string.big"],"core-js/features/string/blink":["es.string.blink"],"core-js/features/string/bold":["es.string.bold"],"core-js/features/string/code-point-at":["es.string.code-point-at"],"core-js/features/string/code-points":["esnext.string.code-points"],"core-js/features/string/ends-with":["es.string.ends-with"],"core-js/features/string/fixed":["es.string.fixed"],"core-js/features/string/fontcolor":["es.string.fontcolor"],"core-js/features/string/fontsize":["es.string.fontsize"],"core-js/features/string/from-code-point":["es.string.from-code-point"],"core-js/features/string/includes":["es.string.includes"],"core-js/features/string/italics":["es.string.italics"],"core-js/features/string/iterator":["es.string.iterator"],"core-js/features/string/link":["es.string.link"],"core-js/features/string/match":["es.regexp.exec","es.string.match"],"core-js/features/string/match-all":["es.string.match-all","esnext.string.match-all"],"core-js/features/string/pad-end":["es.string.pad-end"],"core-js/features/string/pad-start":["es.string.pad-start"],"core-js/features/string/raw":["es.string.raw"],"core-js/features/string/repeat":["es.string.repeat"],"core-js/features/string/replace":["es.regexp.exec","es.string.replace"],"core-js/features/string/replace-all":["esnext.string.replace-all"],"core-js/features/string/search":["es.regexp.exec","es.string.search"],"core-js/features/string/small":["es.string.small"],"core-js/features/string/split":["es.regexp.exec","es.string.split"],"core-js/features/string/starts-with":["es.string.starts-with"],"core-js/features/string/strike":["es.string.strike"],"core-js/features/string/sub":["es.string.sub"],"core-js/features/string/sup":["es.string.sup"],"core-js/features/string/trim":["es.string.trim"],"core-js/features/string/trim-end":["es.string.trim-end"],"core-js/features/string/trim-left":["es.string.trim-start"],"core-js/features/string/trim-right":["es.string.trim-end"],"core-js/features/string/trim-start":["es.string.trim-start"],"core-js/features/string/virtual":["es.string.code-point-at","es.string.ends-with","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all"],"core-js/features/string/virtual/anchor":["es.string.anchor"],"core-js/features/string/virtual/at":["esnext.string.at"],"core-js/features/string/virtual/big":["es.string.big"],"core-js/features/string/virtual/blink":["es.string.blink"],"core-js/features/string/virtual/bold":["es.string.bold"],"core-js/features/string/virtual/code-point-at":["es.string.code-point-at"],"core-js/features/string/virtual/code-points":["esnext.string.code-points"],"core-js/features/string/virtual/ends-with":["es.string.ends-with"],"core-js/features/string/virtual/fixed":["es.string.fixed"],"core-js/features/string/virtual/fontcolor":["es.string.fontcolor"],"core-js/features/string/virtual/fontsize":["es.string.fontsize"],"core-js/features/string/virtual/includes":["es.string.includes"],"core-js/features/string/virtual/italics":["es.string.italics"],"core-js/features/string/virtual/iterator":["es.string.iterator"],"core-js/features/string/virtual/link":["es.string.link"],"core-js/features/string/virtual/match-all":["es.string.match-all","esnext.string.match-all"],"core-js/features/string/virtual/pad-end":["es.string.pad-end"],"core-js/features/string/virtual/pad-start":["es.string.pad-start"],"core-js/features/string/virtual/repeat":["es.string.repeat"],"core-js/features/string/virtual/replace-all":["esnext.string.replace-all"],"core-js/features/string/virtual/small":["es.string.small"],"core-js/features/string/virtual/starts-with":["es.string.starts-with"],"core-js/features/string/virtual/strike":["es.string.strike"],"core-js/features/string/virtual/sub":["es.string.sub"],"core-js/features/string/virtual/sup":["es.string.sup"],"core-js/features/string/virtual/trim":["es.string.trim"],"core-js/features/string/virtual/trim-end":["es.string.trim-end"],"core-js/features/string/virtual/trim-left":["es.string.trim-start"],"core-js/features/string/virtual/trim-right":["es.string.trim-end"],"core-js/features/string/virtual/trim-start":["es.string.trim-start"],"core-js/features/symbol":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.json.to-string-tag","es.math.to-string-tag","es.object.to-string","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all"],"core-js/features/symbol/async-dispose":["esnext.symbol.async-dispose"],"core-js/features/symbol/async-iterator":["es.symbol.async-iterator"],"core-js/features/symbol/description":["es.symbol.description"],"core-js/features/symbol/dispose":["esnext.symbol.dispose"],"core-js/features/symbol/for":["es.symbol"],"core-js/features/symbol/has-instance":["es.symbol.has-instance","es.function.has-instance"],"core-js/features/symbol/is-concat-spreadable":["es.symbol.is-concat-spreadable","es.array.concat"],"core-js/features/symbol/iterator":["es.symbol.iterator","es.string.iterator","web.dom-collections.iterator"],"core-js/features/symbol/key-for":["es.symbol"],"core-js/features/symbol/match":["es.symbol.match","es.string.match"],"core-js/features/symbol/match-all":["es.symbol.match-all","es.string.match-all"],"core-js/features/symbol/observable":["esnext.symbol.observable"],"core-js/features/symbol/pattern-match":["esnext.symbol.pattern-match"],"core-js/features/symbol/replace":["es.symbol.replace","es.string.replace"],"core-js/features/symbol/replace-all":["esnext.symbol.replace-all"],"core-js/features/symbol/search":["es.symbol.search","es.string.search"],"core-js/features/symbol/species":["es.symbol.species"],"core-js/features/symbol/split":["es.symbol.split","es.string.split"],"core-js/features/symbol/to-primitive":["es.symbol.to-primitive"],"core-js/features/symbol/to-string-tag":["es.symbol.to-string-tag","es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/features/symbol/unscopables":["es.symbol.unscopables"],"core-js/features/typed-array":["es.object.to-string","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/copy-within":["es.typed-array.copy-within"],"core-js/features/typed-array/entries":["es.typed-array.iterator"],"core-js/features/typed-array/every":["es.typed-array.every"],"core-js/features/typed-array/fill":["es.typed-array.fill"],"core-js/features/typed-array/filter":["es.typed-array.filter"],"core-js/features/typed-array/find":["es.typed-array.find"],"core-js/features/typed-array/find-index":["es.typed-array.find-index"],"core-js/features/typed-array/float32-array":["es.object.to-string","es.typed-array.float32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/float64-array":["es.object.to-string","es.typed-array.float64-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/for-each":["es.typed-array.for-each"],"core-js/features/typed-array/from":["es.typed-array.from"],"core-js/features/typed-array/includes":["es.typed-array.includes"],"core-js/features/typed-array/index-of":["es.typed-array.index-of"],"core-js/features/typed-array/int16-array":["es.object.to-string","es.typed-array.int16-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/int32-array":["es.object.to-string","es.typed-array.int32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/int8-array":["es.object.to-string","es.typed-array.int8-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/iterator":["es.typed-array.iterator"],"core-js/features/typed-array/join":["es.typed-array.join"],"core-js/features/typed-array/keys":["es.typed-array.iterator"],"core-js/features/typed-array/last-index-of":["es.typed-array.last-index-of"],"core-js/features/typed-array/map":["es.typed-array.map"],"core-js/features/typed-array/of":["es.typed-array.of"],"core-js/features/typed-array/reduce":["es.typed-array.reduce"],"core-js/features/typed-array/reduce-right":["es.typed-array.reduce-right"],"core-js/features/typed-array/reverse":["es.typed-array.reverse"],"core-js/features/typed-array/set":["es.typed-array.set"],"core-js/features/typed-array/slice":["es.typed-array.slice"],"core-js/features/typed-array/some":["es.typed-array.some"],"core-js/features/typed-array/sort":["es.typed-array.sort"],"core-js/features/typed-array/subarray":["es.typed-array.subarray"],"core-js/features/typed-array/to-locale-string":["es.typed-array.to-locale-string"],"core-js/features/typed-array/to-string":["es.typed-array.to-string"],"core-js/features/typed-array/uint16-array":["es.object.to-string","es.typed-array.uint16-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/uint32-array":["es.object.to-string","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/uint8-array":["es.object.to-string","es.typed-array.uint8-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/uint8-clamped-array":["es.object.to-string","es.typed-array.uint8-clamped-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/features/typed-array/values":["es.typed-array.iterator"],"core-js/features/url":["web.url","web.url.to-json","web.url-search-params"],"core-js/features/url-search-params":["web.url-search-params"],"core-js/features/url/to-json":["web.url.to-json"],"core-js/features/weak-map":["es.object.to-string","es.weak-map","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","web.dom-collections.iterator"],"core-js/features/weak-map/delete-all":["es.weak-map","esnext.weak-map.delete-all"],"core-js/features/weak-map/from":["es.string.iterator","es.weak-map","esnext.weak-map.from","web.dom-collections.iterator"],"core-js/features/weak-map/of":["es.string.iterator","es.weak-map","esnext.weak-map.of","web.dom-collections.iterator"],"core-js/features/weak-map/upsert":["es.weak-map","esnext.weak-map.upsert"],"core-js/features/weak-set":["es.object.to-string","es.weak-set","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.dom-collections.iterator"],"core-js/features/weak-set/add-all":["es.weak-set","esnext.weak-set.add-all"],"core-js/features/weak-set/delete-all":["es.weak-set","esnext.weak-set.delete-all"],"core-js/features/weak-set/from":["es.string.iterator","es.weak-set","esnext.weak-set.from","web.dom-collections.iterator"],"core-js/features/weak-set/of":["es.string.iterator","es.weak-set","esnext.weak-set.of","web.dom-collections.iterator"],"core-js/modules/es.array-buffer.constructor":["es.array-buffer.constructor"],"core-js/modules/es.array-buffer.is-view":["es.array-buffer.is-view"],"core-js/modules/es.array-buffer.slice":["es.array-buffer.slice"],"core-js/modules/es.array.concat":["es.array.concat"],"core-js/modules/es.array.copy-within":["es.array.copy-within"],"core-js/modules/es.array.every":["es.array.every"],"core-js/modules/es.array.fill":["es.array.fill"],"core-js/modules/es.array.filter":["es.array.filter"],"core-js/modules/es.array.find":["es.array.find"],"core-js/modules/es.array.find-index":["es.array.find-index"],"core-js/modules/es.array.flat":["es.array.flat"],"core-js/modules/es.array.flat-map":["es.array.flat-map"],"core-js/modules/es.array.for-each":["es.array.for-each"],"core-js/modules/es.array.from":["es.array.from"],"core-js/modules/es.array.includes":["es.array.includes"],"core-js/modules/es.array.index-of":["es.array.index-of"],"core-js/modules/es.array.is-array":["es.array.is-array"],"core-js/modules/es.array.iterator":["es.array.iterator"],"core-js/modules/es.array.join":["es.array.join"],"core-js/modules/es.array.last-index-of":["es.array.last-index-of"],"core-js/modules/es.array.map":["es.array.map"],"core-js/modules/es.array.of":["es.array.of"],"core-js/modules/es.array.reduce":["es.array.reduce"],"core-js/modules/es.array.reduce-right":["es.array.reduce-right"],"core-js/modules/es.array.reverse":["es.array.reverse"],"core-js/modules/es.array.slice":["es.array.slice"],"core-js/modules/es.array.some":["es.array.some"],"core-js/modules/es.array.sort":["es.array.sort"],"core-js/modules/es.array.species":["es.array.species"],"core-js/modules/es.array.splice":["es.array.splice"],"core-js/modules/es.array.unscopables.flat":["es.array.unscopables.flat"],"core-js/modules/es.array.unscopables.flat-map":["es.array.unscopables.flat-map"],"core-js/modules/es.data-view":["es.data-view"],"core-js/modules/es.date.now":["es.date.now"],"core-js/modules/es.date.to-iso-string":["es.date.to-iso-string"],"core-js/modules/es.date.to-json":["es.date.to-json"],"core-js/modules/es.date.to-primitive":["es.date.to-primitive"],"core-js/modules/es.date.to-string":["es.date.to-string"],"core-js/modules/es.function.bind":["es.function.bind"],"core-js/modules/es.function.has-instance":["es.function.has-instance"],"core-js/modules/es.function.name":["es.function.name"],"core-js/modules/es.global-this":["es.global-this"],"core-js/modules/es.json.stringify":["es.json.stringify"],"core-js/modules/es.json.to-string-tag":["es.json.to-string-tag"],"core-js/modules/es.map":["es.map"],"core-js/modules/es.math.acosh":["es.math.acosh"],"core-js/modules/es.math.asinh":["es.math.asinh"],"core-js/modules/es.math.atanh":["es.math.atanh"],"core-js/modules/es.math.cbrt":["es.math.cbrt"],"core-js/modules/es.math.clz32":["es.math.clz32"],"core-js/modules/es.math.cosh":["es.math.cosh"],"core-js/modules/es.math.expm1":["es.math.expm1"],"core-js/modules/es.math.fround":["es.math.fround"],"core-js/modules/es.math.hypot":["es.math.hypot"],"core-js/modules/es.math.imul":["es.math.imul"],"core-js/modules/es.math.log10":["es.math.log10"],"core-js/modules/es.math.log1p":["es.math.log1p"],"core-js/modules/es.math.log2":["es.math.log2"],"core-js/modules/es.math.sign":["es.math.sign"],"core-js/modules/es.math.sinh":["es.math.sinh"],"core-js/modules/es.math.tanh":["es.math.tanh"],"core-js/modules/es.math.to-string-tag":["es.math.to-string-tag"],"core-js/modules/es.math.trunc":["es.math.trunc"],"core-js/modules/es.number.constructor":["es.number.constructor"],"core-js/modules/es.number.epsilon":["es.number.epsilon"],"core-js/modules/es.number.is-finite":["es.number.is-finite"],"core-js/modules/es.number.is-integer":["es.number.is-integer"],"core-js/modules/es.number.is-nan":["es.number.is-nan"],"core-js/modules/es.number.is-safe-integer":["es.number.is-safe-integer"],"core-js/modules/es.number.max-safe-integer":["es.number.max-safe-integer"],"core-js/modules/es.number.min-safe-integer":["es.number.min-safe-integer"],"core-js/modules/es.number.parse-float":["es.number.parse-float"],"core-js/modules/es.number.parse-int":["es.number.parse-int"],"core-js/modules/es.number.to-fixed":["es.number.to-fixed"],"core-js/modules/es.number.to-precision":["es.number.to-precision"],"core-js/modules/es.object.assign":["es.object.assign"],"core-js/modules/es.object.create":["es.object.create"],"core-js/modules/es.object.define-getter":["es.object.define-getter"],"core-js/modules/es.object.define-properties":["es.object.define-properties"],"core-js/modules/es.object.define-property":["es.object.define-property"],"core-js/modules/es.object.define-setter":["es.object.define-setter"],"core-js/modules/es.object.entries":["es.object.entries"],"core-js/modules/es.object.freeze":["es.object.freeze"],"core-js/modules/es.object.from-entries":["es.object.from-entries"],"core-js/modules/es.object.get-own-property-descriptor":["es.object.get-own-property-descriptor"],"core-js/modules/es.object.get-own-property-descriptors":["es.object.get-own-property-descriptors"],"core-js/modules/es.object.get-own-property-names":["es.object.get-own-property-names"],"core-js/modules/es.object.get-prototype-of":["es.object.get-prototype-of"],"core-js/modules/es.object.is":["es.object.is"],"core-js/modules/es.object.is-extensible":["es.object.is-extensible"],"core-js/modules/es.object.is-frozen":["es.object.is-frozen"],"core-js/modules/es.object.is-sealed":["es.object.is-sealed"],"core-js/modules/es.object.keys":["es.object.keys"],"core-js/modules/es.object.lookup-getter":["es.object.lookup-getter"],"core-js/modules/es.object.lookup-setter":["es.object.lookup-setter"],"core-js/modules/es.object.prevent-extensions":["es.object.prevent-extensions"],"core-js/modules/es.object.seal":["es.object.seal"],"core-js/modules/es.object.set-prototype-of":["es.object.set-prototype-of"],"core-js/modules/es.object.to-string":["es.object.to-string"],"core-js/modules/es.object.values":["es.object.values"],"core-js/modules/es.parse-float":["es.parse-float"],"core-js/modules/es.parse-int":["es.parse-int"],"core-js/modules/es.promise":["es.promise"],"core-js/modules/es.promise.all-settled":["es.promise.all-settled"],"core-js/modules/es.promise.finally":["es.promise.finally"],"core-js/modules/es.reflect.apply":["es.reflect.apply"],"core-js/modules/es.reflect.construct":["es.reflect.construct"],"core-js/modules/es.reflect.define-property":["es.reflect.define-property"],"core-js/modules/es.reflect.delete-property":["es.reflect.delete-property"],"core-js/modules/es.reflect.get":["es.reflect.get"],"core-js/modules/es.reflect.get-own-property-descriptor":["es.reflect.get-own-property-descriptor"],"core-js/modules/es.reflect.get-prototype-of":["es.reflect.get-prototype-of"],"core-js/modules/es.reflect.has":["es.reflect.has"],"core-js/modules/es.reflect.is-extensible":["es.reflect.is-extensible"],"core-js/modules/es.reflect.own-keys":["es.reflect.own-keys"],"core-js/modules/es.reflect.prevent-extensions":["es.reflect.prevent-extensions"],"core-js/modules/es.reflect.set":["es.reflect.set"],"core-js/modules/es.reflect.set-prototype-of":["es.reflect.set-prototype-of"],"core-js/modules/es.regexp.constructor":["es.regexp.constructor"],"core-js/modules/es.regexp.exec":["es.regexp.exec"],"core-js/modules/es.regexp.flags":["es.regexp.flags"],"core-js/modules/es.regexp.sticky":["es.regexp.sticky"],"core-js/modules/es.regexp.test":["es.regexp.test"],"core-js/modules/es.regexp.to-string":["es.regexp.to-string"],"core-js/modules/es.set":["es.set"],"core-js/modules/es.string.anchor":["es.string.anchor"],"core-js/modules/es.string.big":["es.string.big"],"core-js/modules/es.string.blink":["es.string.blink"],"core-js/modules/es.string.bold":["es.string.bold"],"core-js/modules/es.string.code-point-at":["es.string.code-point-at"],"core-js/modules/es.string.ends-with":["es.string.ends-with"],"core-js/modules/es.string.fixed":["es.string.fixed"],"core-js/modules/es.string.fontcolor":["es.string.fontcolor"],"core-js/modules/es.string.fontsize":["es.string.fontsize"],"core-js/modules/es.string.from-code-point":["es.string.from-code-point"],"core-js/modules/es.string.includes":["es.string.includes"],"core-js/modules/es.string.italics":["es.string.italics"],"core-js/modules/es.string.iterator":["es.string.iterator"],"core-js/modules/es.string.link":["es.string.link"],"core-js/modules/es.string.match":["es.string.match"],"core-js/modules/es.string.match-all":["es.string.match-all"],"core-js/modules/es.string.pad-end":["es.string.pad-end"],"core-js/modules/es.string.pad-start":["es.string.pad-start"],"core-js/modules/es.string.raw":["es.string.raw"],"core-js/modules/es.string.repeat":["es.string.repeat"],"core-js/modules/es.string.replace":["es.string.replace"],"core-js/modules/es.string.search":["es.string.search"],"core-js/modules/es.string.small":["es.string.small"],"core-js/modules/es.string.split":["es.string.split"],"core-js/modules/es.string.starts-with":["es.string.starts-with"],"core-js/modules/es.string.strike":["es.string.strike"],"core-js/modules/es.string.sub":["es.string.sub"],"core-js/modules/es.string.sup":["es.string.sup"],"core-js/modules/es.string.trim":["es.string.trim"],"core-js/modules/es.string.trim-end":["es.string.trim-end"],"core-js/modules/es.string.trim-start":["es.string.trim-start"],"core-js/modules/es.symbol":["es.symbol"],"core-js/modules/es.symbol.async-iterator":["es.symbol.async-iterator"],"core-js/modules/es.symbol.description":["es.symbol.description"],"core-js/modules/es.symbol.has-instance":["es.symbol.has-instance"],"core-js/modules/es.symbol.is-concat-spreadable":["es.symbol.is-concat-spreadable"],"core-js/modules/es.symbol.iterator":["es.symbol.iterator"],"core-js/modules/es.symbol.match":["es.symbol.match"],"core-js/modules/es.symbol.match-all":["es.symbol.match-all"],"core-js/modules/es.symbol.replace":["es.symbol.replace"],"core-js/modules/es.symbol.search":["es.symbol.search"],"core-js/modules/es.symbol.species":["es.symbol.species"],"core-js/modules/es.symbol.split":["es.symbol.split"],"core-js/modules/es.symbol.to-primitive":["es.symbol.to-primitive"],"core-js/modules/es.symbol.to-string-tag":["es.symbol.to-string-tag"],"core-js/modules/es.symbol.unscopables":["es.symbol.unscopables"],"core-js/modules/es.typed-array.copy-within":["es.typed-array.copy-within"],"core-js/modules/es.typed-array.every":["es.typed-array.every"],"core-js/modules/es.typed-array.fill":["es.typed-array.fill"],"core-js/modules/es.typed-array.filter":["es.typed-array.filter"],"core-js/modules/es.typed-array.find":["es.typed-array.find"],"core-js/modules/es.typed-array.find-index":["es.typed-array.find-index"],"core-js/modules/es.typed-array.float32-array":["es.typed-array.float32-array"],"core-js/modules/es.typed-array.float64-array":["es.typed-array.float64-array"],"core-js/modules/es.typed-array.for-each":["es.typed-array.for-each"],"core-js/modules/es.typed-array.from":["es.typed-array.from"],"core-js/modules/es.typed-array.includes":["es.typed-array.includes"],"core-js/modules/es.typed-array.index-of":["es.typed-array.index-of"],"core-js/modules/es.typed-array.int16-array":["es.typed-array.int16-array"],"core-js/modules/es.typed-array.int32-array":["es.typed-array.int32-array"],"core-js/modules/es.typed-array.int8-array":["es.typed-array.int8-array"],"core-js/modules/es.typed-array.iterator":["es.typed-array.iterator"],"core-js/modules/es.typed-array.join":["es.typed-array.join"],"core-js/modules/es.typed-array.last-index-of":["es.typed-array.last-index-of"],"core-js/modules/es.typed-array.map":["es.typed-array.map"],"core-js/modules/es.typed-array.of":["es.typed-array.of"],"core-js/modules/es.typed-array.reduce":["es.typed-array.reduce"],"core-js/modules/es.typed-array.reduce-right":["es.typed-array.reduce-right"],"core-js/modules/es.typed-array.reverse":["es.typed-array.reverse"],"core-js/modules/es.typed-array.set":["es.typed-array.set"],"core-js/modules/es.typed-array.slice":["es.typed-array.slice"],"core-js/modules/es.typed-array.some":["es.typed-array.some"],"core-js/modules/es.typed-array.sort":["es.typed-array.sort"],"core-js/modules/es.typed-array.subarray":["es.typed-array.subarray"],"core-js/modules/es.typed-array.to-locale-string":["es.typed-array.to-locale-string"],"core-js/modules/es.typed-array.to-string":["es.typed-array.to-string"],"core-js/modules/es.typed-array.uint16-array":["es.typed-array.uint16-array"],"core-js/modules/es.typed-array.uint32-array":["es.typed-array.uint32-array"],"core-js/modules/es.typed-array.uint8-array":["es.typed-array.uint8-array"],"core-js/modules/es.typed-array.uint8-clamped-array":["es.typed-array.uint8-clamped-array"],"core-js/modules/es.weak-map":["es.weak-map"],"core-js/modules/es.weak-set":["es.weak-set"],"core-js/modules/esnext.aggregate-error":["esnext.aggregate-error"],"core-js/modules/esnext.array.is-template-object":["esnext.array.is-template-object"],"core-js/modules/esnext.array.last-index":["esnext.array.last-index"],"core-js/modules/esnext.array.last-item":["esnext.array.last-item"],"core-js/modules/esnext.async-iterator.as-indexed-pairs":["esnext.async-iterator.as-indexed-pairs"],"core-js/modules/esnext.async-iterator.constructor":["esnext.async-iterator.constructor"],"core-js/modules/esnext.async-iterator.drop":["esnext.async-iterator.drop"],"core-js/modules/esnext.async-iterator.every":["esnext.async-iterator.every"],"core-js/modules/esnext.async-iterator.filter":["esnext.async-iterator.filter"],"core-js/modules/esnext.async-iterator.find":["esnext.async-iterator.find"],"core-js/modules/esnext.async-iterator.flat-map":["esnext.async-iterator.flat-map"],"core-js/modules/esnext.async-iterator.for-each":["esnext.async-iterator.for-each"],"core-js/modules/esnext.async-iterator.from":["esnext.async-iterator.from"],"core-js/modules/esnext.async-iterator.map":["esnext.async-iterator.map"],"core-js/modules/esnext.async-iterator.reduce":["esnext.async-iterator.reduce"],"core-js/modules/esnext.async-iterator.some":["esnext.async-iterator.some"],"core-js/modules/esnext.async-iterator.take":["esnext.async-iterator.take"],"core-js/modules/esnext.async-iterator.to-array":["esnext.async-iterator.to-array"],"core-js/modules/esnext.composite-key":["esnext.composite-key"],"core-js/modules/esnext.composite-symbol":["esnext.composite-symbol"],"core-js/modules/esnext.global-this":["esnext.global-this"],"core-js/modules/esnext.iterator.as-indexed-pairs":["esnext.iterator.as-indexed-pairs"],"core-js/modules/esnext.iterator.constructor":["esnext.iterator.constructor"],"core-js/modules/esnext.iterator.drop":["esnext.iterator.drop"],"core-js/modules/esnext.iterator.every":["esnext.iterator.every"],"core-js/modules/esnext.iterator.filter":["esnext.iterator.filter"],"core-js/modules/esnext.iterator.find":["esnext.iterator.find"],"core-js/modules/esnext.iterator.flat-map":["esnext.iterator.flat-map"],"core-js/modules/esnext.iterator.for-each":["esnext.iterator.for-each"],"core-js/modules/esnext.iterator.from":["esnext.iterator.from"],"core-js/modules/esnext.iterator.map":["esnext.iterator.map"],"core-js/modules/esnext.iterator.reduce":["esnext.iterator.reduce"],"core-js/modules/esnext.iterator.some":["esnext.iterator.some"],"core-js/modules/esnext.iterator.take":["esnext.iterator.take"],"core-js/modules/esnext.iterator.to-array":["esnext.iterator.to-array"],"core-js/modules/esnext.map.delete-all":["esnext.map.delete-all"],"core-js/modules/esnext.map.every":["esnext.map.every"],"core-js/modules/esnext.map.filter":["esnext.map.filter"],"core-js/modules/esnext.map.find":["esnext.map.find"],"core-js/modules/esnext.map.find-key":["esnext.map.find-key"],"core-js/modules/esnext.map.from":["esnext.map.from"],"core-js/modules/esnext.map.group-by":["esnext.map.group-by"],"core-js/modules/esnext.map.includes":["esnext.map.includes"],"core-js/modules/esnext.map.key-by":["esnext.map.key-by"],"core-js/modules/esnext.map.key-of":["esnext.map.key-of"],"core-js/modules/esnext.map.map-keys":["esnext.map.map-keys"],"core-js/modules/esnext.map.map-values":["esnext.map.map-values"],"core-js/modules/esnext.map.merge":["esnext.map.merge"],"core-js/modules/esnext.map.of":["esnext.map.of"],"core-js/modules/esnext.map.reduce":["esnext.map.reduce"],"core-js/modules/esnext.map.some":["esnext.map.some"],"core-js/modules/esnext.map.update":["esnext.map.update"],"core-js/modules/esnext.map.update-or-insert":["esnext.map.update-or-insert"],"core-js/modules/esnext.map.upsert":["esnext.map.upsert"],"core-js/modules/esnext.math.clamp":["esnext.math.clamp"],"core-js/modules/esnext.math.deg-per-rad":["esnext.math.deg-per-rad"],"core-js/modules/esnext.math.degrees":["esnext.math.degrees"],"core-js/modules/esnext.math.fscale":["esnext.math.fscale"],"core-js/modules/esnext.math.iaddh":["esnext.math.iaddh"],"core-js/modules/esnext.math.imulh":["esnext.math.imulh"],"core-js/modules/esnext.math.isubh":["esnext.math.isubh"],"core-js/modules/esnext.math.rad-per-deg":["esnext.math.rad-per-deg"],"core-js/modules/esnext.math.radians":["esnext.math.radians"],"core-js/modules/esnext.math.scale":["esnext.math.scale"],"core-js/modules/esnext.math.seeded-prng":["esnext.math.seeded-prng"],"core-js/modules/esnext.math.signbit":["esnext.math.signbit"],"core-js/modules/esnext.math.umulh":["esnext.math.umulh"],"core-js/modules/esnext.number.from-string":["esnext.number.from-string"],"core-js/modules/esnext.object.iterate-entries":["esnext.object.iterate-entries"],"core-js/modules/esnext.object.iterate-keys":["esnext.object.iterate-keys"],"core-js/modules/esnext.object.iterate-values":["esnext.object.iterate-values"],"core-js/modules/esnext.observable":["esnext.observable"],"core-js/modules/esnext.promise.all-settled":["esnext.promise.all-settled"],"core-js/modules/esnext.promise.any":["esnext.promise.any"],"core-js/modules/esnext.promise.try":["esnext.promise.try"],"core-js/modules/esnext.reflect.define-metadata":["esnext.reflect.define-metadata"],"core-js/modules/esnext.reflect.delete-metadata":["esnext.reflect.delete-metadata"],"core-js/modules/esnext.reflect.get-metadata":["esnext.reflect.get-metadata"],"core-js/modules/esnext.reflect.get-metadata-keys":["esnext.reflect.get-metadata-keys"],"core-js/modules/esnext.reflect.get-own-metadata":["esnext.reflect.get-own-metadata"],"core-js/modules/esnext.reflect.get-own-metadata-keys":["esnext.reflect.get-own-metadata-keys"],"core-js/modules/esnext.reflect.has-metadata":["esnext.reflect.has-metadata"],"core-js/modules/esnext.reflect.has-own-metadata":["esnext.reflect.has-own-metadata"],"core-js/modules/esnext.reflect.metadata":["esnext.reflect.metadata"],"core-js/modules/esnext.set.add-all":["esnext.set.add-all"],"core-js/modules/esnext.set.delete-all":["esnext.set.delete-all"],"core-js/modules/esnext.set.difference":["esnext.set.difference"],"core-js/modules/esnext.set.every":["esnext.set.every"],"core-js/modules/esnext.set.filter":["esnext.set.filter"],"core-js/modules/esnext.set.find":["esnext.set.find"],"core-js/modules/esnext.set.from":["esnext.set.from"],"core-js/modules/esnext.set.intersection":["esnext.set.intersection"],"core-js/modules/esnext.set.is-disjoint-from":["esnext.set.is-disjoint-from"],"core-js/modules/esnext.set.is-subset-of":["esnext.set.is-subset-of"],"core-js/modules/esnext.set.is-superset-of":["esnext.set.is-superset-of"],"core-js/modules/esnext.set.join":["esnext.set.join"],"core-js/modules/esnext.set.map":["esnext.set.map"],"core-js/modules/esnext.set.of":["esnext.set.of"],"core-js/modules/esnext.set.reduce":["esnext.set.reduce"],"core-js/modules/esnext.set.some":["esnext.set.some"],"core-js/modules/esnext.set.symmetric-difference":["esnext.set.symmetric-difference"],"core-js/modules/esnext.set.union":["esnext.set.union"],"core-js/modules/esnext.string.at":["esnext.string.at"],"core-js/modules/esnext.string.code-points":["esnext.string.code-points"],"core-js/modules/esnext.string.match-all":["esnext.string.match-all"],"core-js/modules/esnext.string.replace-all":["esnext.string.replace-all"],"core-js/modules/esnext.symbol.async-dispose":["esnext.symbol.async-dispose"],"core-js/modules/esnext.symbol.dispose":["esnext.symbol.dispose"],"core-js/modules/esnext.symbol.observable":["esnext.symbol.observable"],"core-js/modules/esnext.symbol.pattern-match":["esnext.symbol.pattern-match"],"core-js/modules/esnext.symbol.replace-all":["esnext.symbol.replace-all"],"core-js/modules/esnext.weak-map.delete-all":["esnext.weak-map.delete-all"],"core-js/modules/esnext.weak-map.from":["esnext.weak-map.from"],"core-js/modules/esnext.weak-map.of":["esnext.weak-map.of"],"core-js/modules/esnext.weak-map.upsert":["esnext.weak-map.upsert"],"core-js/modules/esnext.weak-set.add-all":["esnext.weak-set.add-all"],"core-js/modules/esnext.weak-set.delete-all":["esnext.weak-set.delete-all"],"core-js/modules/esnext.weak-set.from":["esnext.weak-set.from"],"core-js/modules/esnext.weak-set.of":["esnext.weak-set.of"],"core-js/modules/web.dom-collections.for-each":["web.dom-collections.for-each"],"core-js/modules/web.dom-collections.iterator":["web.dom-collections.iterator"],"core-js/modules/web.immediate":["web.immediate"],"core-js/modules/web.queue-microtask":["web.queue-microtask"],"core-js/modules/web.timers":["web.timers"],"core-js/modules/web.url":["web.url"],"core-js/modules/web.url-search-params":["web.url-search-params"],"core-js/modules/web.url.to-json":["web.url.to-json"],"core-js/proposals":["esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.url","web.url.to-json","web.url-search-params"],"core-js/proposals/array-is-template-object":["esnext.array.is-template-object"],"core-js/proposals/array-last":["esnext.array.last-index","esnext.array.last-item"],"core-js/proposals/collection-methods":["esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.set.add-all","esnext.set.delete-all","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.join","esnext.set.map","esnext.set.reduce","esnext.set.some","esnext.weak-map.delete-all","esnext.weak-set.add-all","esnext.weak-set.delete-all"],"core-js/proposals/collection-of-from":["esnext.map.from","esnext.map.of","esnext.set.from","esnext.set.of","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-set.from","esnext.weak-set.of"],"core-js/proposals/efficient-64-bit-arithmetic":["esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.umulh"],"core-js/proposals/global-this":["esnext.global-this"],"core-js/proposals/iterator-helpers":["esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array"],"core-js/proposals/keys-composition":["esnext.composite-key","esnext.composite-symbol"],"core-js/proposals/map-update-or-insert":["esnext.map.update-or-insert","esnext.map.upsert","esnext.weak-map.upsert"],"core-js/proposals/map-upsert":["esnext.map.update-or-insert","esnext.map.upsert","esnext.weak-map.upsert"],"core-js/proposals/math-extensions":["esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale"],"core-js/proposals/math-signbit":["esnext.math.signbit"],"core-js/proposals/number-from-string":["esnext.number.from-string"],"core-js/proposals/object-iteration":["esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values"],"core-js/proposals/observable":["esnext.observable","esnext.symbol.observable"],"core-js/proposals/pattern-matching":["esnext.symbol.pattern-match"],"core-js/proposals/promise-all-settled":["esnext.promise.all-settled"],"core-js/proposals/promise-any":["esnext.aggregate-error","esnext.promise.any"],"core-js/proposals/promise-try":["esnext.promise.try"],"core-js/proposals/reflect-metadata":["esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata"],"core-js/proposals/seeded-random":["esnext.math.seeded-prng"],"core-js/proposals/set-methods":["esnext.set.difference","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.symmetric-difference","esnext.set.union"],"core-js/proposals/string-at":["esnext.string.at"],"core-js/proposals/string-code-points":["esnext.string.code-points"],"core-js/proposals/string-match-all":["esnext.string.match-all"],"core-js/proposals/string-replace-all":["esnext.string.replace-all","esnext.symbol.replace-all"],"core-js/proposals/url":["web.url","web.url.to-json","web.url-search-params"],"core-js/proposals/using-statement":["esnext.symbol.async-dispose","esnext.symbol.dispose"],"core-js/stable":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.data-view","es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string","es.function.bind","es.function.has-instance","es.function.name","es.global-this","es.json.stringify","es.json.to-string-tag","es.map","es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc","es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values","es.parse-float","es.parse-int","es.promise","es.promise.all-settled","es.promise.finally","es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of","es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.set","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string","es.weak-map","es.weak-set","web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"],"core-js/stable/array":["es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.from","es.array.includes","es.array.index-of","es.array.is-array","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.of","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map","es.string.iterator"],"core-js/stable/array-buffer":["es.array-buffer.constructor","es.array-buffer.is-view","es.array-buffer.slice","es.object.to-string"],"core-js/stable/array-buffer/constructor":["es.array-buffer.constructor","es.object.to-string"],"core-js/stable/array-buffer/is-view":["es.array-buffer.is-view"],"core-js/stable/array-buffer/slice":["es.array-buffer.slice"],"core-js/stable/array/concat":["es.array.concat"],"core-js/stable/array/copy-within":["es.array.copy-within"],"core-js/stable/array/entries":["es.array.iterator"],"core-js/stable/array/every":["es.array.every"],"core-js/stable/array/fill":["es.array.fill"],"core-js/stable/array/filter":["es.array.filter"],"core-js/stable/array/find":["es.array.find"],"core-js/stable/array/find-index":["es.array.find-index"],"core-js/stable/array/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/stable/array/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/stable/array/for-each":["es.array.for-each"],"core-js/stable/array/from":["es.array.from","es.string.iterator"],"core-js/stable/array/includes":["es.array.includes"],"core-js/stable/array/index-of":["es.array.index-of"],"core-js/stable/array/is-array":["es.array.is-array"],"core-js/stable/array/iterator":["es.array.iterator"],"core-js/stable/array/join":["es.array.join"],"core-js/stable/array/keys":["es.array.iterator"],"core-js/stable/array/last-index-of":["es.array.last-index-of"],"core-js/stable/array/map":["es.array.map"],"core-js/stable/array/of":["es.array.of"],"core-js/stable/array/reduce":["es.array.reduce"],"core-js/stable/array/reduce-right":["es.array.reduce-right"],"core-js/stable/array/reverse":["es.array.reverse"],"core-js/stable/array/slice":["es.array.slice"],"core-js/stable/array/some":["es.array.some"],"core-js/stable/array/sort":["es.array.sort"],"core-js/stable/array/splice":["es.array.splice"],"core-js/stable/array/values":["es.array.iterator"],"core-js/stable/array/virtual":["es.array.concat","es.array.copy-within","es.array.every","es.array.fill","es.array.filter","es.array.find","es.array.find-index","es.array.flat","es.array.flat-map","es.array.for-each","es.array.includes","es.array.index-of","es.array.iterator","es.array.join","es.array.last-index-of","es.array.map","es.array.reduce","es.array.reduce-right","es.array.reverse","es.array.slice","es.array.some","es.array.sort","es.array.species","es.array.splice","es.array.unscopables.flat","es.array.unscopables.flat-map"],"core-js/stable/array/virtual/concat":["es.array.concat"],"core-js/stable/array/virtual/copy-within":["es.array.copy-within"],"core-js/stable/array/virtual/entries":["es.array.iterator"],"core-js/stable/array/virtual/every":["es.array.every"],"core-js/stable/array/virtual/fill":["es.array.fill"],"core-js/stable/array/virtual/filter":["es.array.filter"],"core-js/stable/array/virtual/find":["es.array.find"],"core-js/stable/array/virtual/find-index":["es.array.find-index"],"core-js/stable/array/virtual/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/stable/array/virtual/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/stable/array/virtual/for-each":["es.array.for-each"],"core-js/stable/array/virtual/includes":["es.array.includes"],"core-js/stable/array/virtual/index-of":["es.array.index-of"],"core-js/stable/array/virtual/iterator":["es.array.iterator"],"core-js/stable/array/virtual/join":["es.array.join"],"core-js/stable/array/virtual/keys":["es.array.iterator"],"core-js/stable/array/virtual/last-index-of":["es.array.last-index-of"],"core-js/stable/array/virtual/map":["es.array.map"],"core-js/stable/array/virtual/reduce":["es.array.reduce"],"core-js/stable/array/virtual/reduce-right":["es.array.reduce-right"],"core-js/stable/array/virtual/reverse":["es.array.reverse"],"core-js/stable/array/virtual/slice":["es.array.slice"],"core-js/stable/array/virtual/some":["es.array.some"],"core-js/stable/array/virtual/sort":["es.array.sort"],"core-js/stable/array/virtual/splice":["es.array.splice"],"core-js/stable/array/virtual/values":["es.array.iterator"],"core-js/stable/clear-immediate":["web.immediate"],"core-js/stable/data-view":["es.data-view","es.object.to-string"],"core-js/stable/date":["es.date.now","es.date.to-iso-string","es.date.to-json","es.date.to-primitive","es.date.to-string"],"core-js/stable/date/now":["es.date.now"],"core-js/stable/date/to-iso-string":["es.date.to-iso-string","es.date.to-json"],"core-js/stable/date/to-json":["es.date.to-json"],"core-js/stable/date/to-primitive":["es.date.to-primitive"],"core-js/stable/date/to-string":["es.date.to-string"],"core-js/stable/dom-collections":["es.array.iterator","web.dom-collections.for-each","web.dom-collections.iterator"],"core-js/stable/dom-collections/for-each":["web.dom-collections.for-each"],"core-js/stable/dom-collections/iterator":["web.dom-collections.iterator"],"core-js/stable/function":["es.function.bind","es.function.has-instance","es.function.name"],"core-js/stable/function/bind":["es.function.bind"],"core-js/stable/function/has-instance":["es.function.has-instance"],"core-js/stable/function/name":["es.function.name"],"core-js/stable/function/virtual":["es.function.bind"],"core-js/stable/function/virtual/bind":["es.function.bind"],"core-js/stable/global-this":["es.global-this"],"core-js/stable/instance/bind":["es.function.bind"],"core-js/stable/instance/code-point-at":["es.string.code-point-at"],"core-js/stable/instance/concat":["es.array.concat"],"core-js/stable/instance/copy-within":["es.array.copy-within"],"core-js/stable/instance/ends-with":["es.string.ends-with"],"core-js/stable/instance/entries":["es.array.iterator","web.dom-collections.iterator"],"core-js/stable/instance/every":["es.array.every"],"core-js/stable/instance/fill":["es.array.fill"],"core-js/stable/instance/filter":["es.array.filter"],"core-js/stable/instance/find":["es.array.find"],"core-js/stable/instance/find-index":["es.array.find-index"],"core-js/stable/instance/flags":["es.regexp.flags"],"core-js/stable/instance/flat":["es.array.flat","es.array.unscopables.flat"],"core-js/stable/instance/flat-map":["es.array.flat-map","es.array.unscopables.flat-map"],"core-js/stable/instance/for-each":["es.array.for-each","web.dom-collections.iterator"],"core-js/stable/instance/includes":["es.array.includes","es.string.includes"],"core-js/stable/instance/index-of":["es.array.index-of"],"core-js/stable/instance/keys":["es.array.iterator","web.dom-collections.iterator"],"core-js/stable/instance/last-index-of":["es.array.last-index-of"],"core-js/stable/instance/map":["es.array.map"],"core-js/stable/instance/match-all":["es.string.match-all"],"core-js/stable/instance/pad-end":["es.string.pad-end"],"core-js/stable/instance/pad-start":["es.string.pad-start"],"core-js/stable/instance/reduce":["es.array.reduce"],"core-js/stable/instance/reduce-right":["es.array.reduce-right"],"core-js/stable/instance/repeat":["es.string.repeat"],"core-js/stable/instance/reverse":["es.array.reverse"],"core-js/stable/instance/slice":["es.array.slice"],"core-js/stable/instance/some":["es.array.some"],"core-js/stable/instance/sort":["es.array.sort"],"core-js/stable/instance/splice":["es.array.splice"],"core-js/stable/instance/starts-with":["es.string.starts-with"],"core-js/stable/instance/trim":["es.string.trim"],"core-js/stable/instance/trim-end":["es.string.trim-end"],"core-js/stable/instance/trim-left":["es.string.trim-start"],"core-js/stable/instance/trim-right":["es.string.trim-end"],"core-js/stable/instance/trim-start":["es.string.trim-start"],"core-js/stable/instance/values":["es.array.iterator","web.dom-collections.iterator"],"core-js/stable/json":["es.json.stringify","es.json.to-string-tag"],"core-js/stable/json/stringify":["es.json.stringify"],"core-js/stable/json/to-string-tag":["es.json.to-string-tag"],"core-js/stable/map":["es.map","es.object.to-string","es.string.iterator","web.dom-collections.iterator"],"core-js/stable/math":["es.math.acosh","es.math.asinh","es.math.atanh","es.math.cbrt","es.math.clz32","es.math.cosh","es.math.expm1","es.math.fround","es.math.hypot","es.math.imul","es.math.log10","es.math.log1p","es.math.log2","es.math.sign","es.math.sinh","es.math.tanh","es.math.to-string-tag","es.math.trunc"],"core-js/stable/math/acosh":["es.math.acosh"],"core-js/stable/math/asinh":["es.math.asinh"],"core-js/stable/math/atanh":["es.math.atanh"],"core-js/stable/math/cbrt":["es.math.cbrt"],"core-js/stable/math/clz32":["es.math.clz32"],"core-js/stable/math/cosh":["es.math.cosh"],"core-js/stable/math/expm1":["es.math.expm1"],"core-js/stable/math/fround":["es.math.fround"],"core-js/stable/math/hypot":["es.math.hypot"],"core-js/stable/math/imul":["es.math.imul"],"core-js/stable/math/log10":["es.math.log10"],"core-js/stable/math/log1p":["es.math.log1p"],"core-js/stable/math/log2":["es.math.log2"],"core-js/stable/math/sign":["es.math.sign"],"core-js/stable/math/sinh":["es.math.sinh"],"core-js/stable/math/tanh":["es.math.tanh"],"core-js/stable/math/to-string-tag":["es.math.to-string-tag"],"core-js/stable/math/trunc":["es.math.trunc"],"core-js/stable/number":["es.number.constructor","es.number.epsilon","es.number.is-finite","es.number.is-integer","es.number.is-nan","es.number.is-safe-integer","es.number.max-safe-integer","es.number.min-safe-integer","es.number.parse-float","es.number.parse-int","es.number.to-fixed","es.number.to-precision"],"core-js/stable/number/constructor":["es.number.constructor"],"core-js/stable/number/epsilon":["es.number.epsilon"],"core-js/stable/number/is-finite":["es.number.is-finite"],"core-js/stable/number/is-integer":["es.number.is-integer"],"core-js/stable/number/is-nan":["es.number.is-nan"],"core-js/stable/number/is-safe-integer":["es.number.is-safe-integer"],"core-js/stable/number/max-safe-integer":["es.number.max-safe-integer"],"core-js/stable/number/min-safe-integer":["es.number.min-safe-integer"],"core-js/stable/number/parse-float":["es.number.parse-float"],"core-js/stable/number/parse-int":["es.number.parse-int"],"core-js/stable/number/to-fixed":["es.number.to-fixed"],"core-js/stable/number/to-precision":["es.number.to-precision"],"core-js/stable/number/virtual":["es.number.to-fixed","es.number.to-precision"],"core-js/stable/number/virtual/to-fixed":["es.number.to-fixed"],"core-js/stable/number/virtual/to-precision":["es.number.to-precision"],"core-js/stable/object":["es.symbol","es.json.to-string-tag","es.math.to-string-tag","es.object.assign","es.object.create","es.object.define-getter","es.object.define-properties","es.object.define-property","es.object.define-setter","es.object.entries","es.object.freeze","es.object.from-entries","es.object.get-own-property-descriptor","es.object.get-own-property-descriptors","es.object.get-own-property-names","es.object.get-prototype-of","es.object.is","es.object.is-extensible","es.object.is-frozen","es.object.is-sealed","es.object.keys","es.object.lookup-getter","es.object.lookup-setter","es.object.prevent-extensions","es.object.seal","es.object.set-prototype-of","es.object.to-string","es.object.values"],"core-js/stable/object/assign":["es.object.assign"],"core-js/stable/object/create":["es.object.create"],"core-js/stable/object/define-getter":["es.object.define-getter"],"core-js/stable/object/define-properties":["es.object.define-properties"],"core-js/stable/object/define-property":["es.object.define-property"],"core-js/stable/object/define-setter":["es.object.define-setter"],"core-js/stable/object/entries":["es.object.entries"],"core-js/stable/object/freeze":["es.object.freeze"],"core-js/stable/object/from-entries":["es.array.iterator","es.object.from-entries"],"core-js/stable/object/get-own-property-descriptor":["es.object.get-own-property-descriptor"],"core-js/stable/object/get-own-property-descriptors":["es.object.get-own-property-descriptors"],"core-js/stable/object/get-own-property-names":["es.object.get-own-property-names"],"core-js/stable/object/get-own-property-symbols":["es.symbol"],"core-js/stable/object/get-prototype-of":["es.object.get-prototype-of"],"core-js/stable/object/is":["es.object.is"],"core-js/stable/object/is-extensible":["es.object.is-extensible"],"core-js/stable/object/is-frozen":["es.object.is-frozen"],"core-js/stable/object/is-sealed":["es.object.is-sealed"],"core-js/stable/object/keys":["es.object.keys"],"core-js/stable/object/lookup-getter":["es.object.lookup-setter"],"core-js/stable/object/lookup-setter":["es.object.lookup-setter"],"core-js/stable/object/prevent-extensions":["es.object.prevent-extensions"],"core-js/stable/object/seal":["es.object.seal"],"core-js/stable/object/set-prototype-of":["es.object.set-prototype-of"],"core-js/stable/object/to-string":["es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/stable/object/values":["es.object.values"],"core-js/stable/parse-float":["es.parse-float"],"core-js/stable/parse-int":["es.parse-int"],"core-js/stable/promise":["es.object.to-string","es.promise","es.promise.all-settled","es.promise.finally","es.string.iterator","web.dom-collections.iterator"],"core-js/stable/promise/all-settled":["es.promise","es.promise.all-settled"],"core-js/stable/promise/finally":["es.promise","es.promise.finally"],"core-js/stable/queue-microtask":["web.queue-microtask"],"core-js/stable/reflect":["es.reflect.apply","es.reflect.construct","es.reflect.define-property","es.reflect.delete-property","es.reflect.get","es.reflect.get-own-property-descriptor","es.reflect.get-prototype-of","es.reflect.has","es.reflect.is-extensible","es.reflect.own-keys","es.reflect.prevent-extensions","es.reflect.set","es.reflect.set-prototype-of"],"core-js/stable/reflect/apply":["es.reflect.apply"],"core-js/stable/reflect/construct":["es.reflect.construct"],"core-js/stable/reflect/define-property":["es.reflect.define-property"],"core-js/stable/reflect/delete-property":["es.reflect.delete-property"],"core-js/stable/reflect/get":["es.reflect.get"],"core-js/stable/reflect/get-own-property-descriptor":["es.reflect.get-own-property-descriptor"],"core-js/stable/reflect/get-prototype-of":["es.reflect.get-prototype-of"],"core-js/stable/reflect/has":["es.reflect.has"],"core-js/stable/reflect/is-extensible":["es.reflect.is-extensible"],"core-js/stable/reflect/own-keys":["es.reflect.own-keys"],"core-js/stable/reflect/prevent-extensions":["es.reflect.prevent-extensions"],"core-js/stable/reflect/set":["es.reflect.set"],"core-js/stable/reflect/set-prototype-of":["es.reflect.set-prototype-of"],"core-js/stable/regexp":["es.regexp.constructor","es.regexp.exec","es.regexp.flags","es.regexp.sticky","es.regexp.test","es.regexp.to-string","es.string.match","es.string.replace","es.string.search","es.string.split"],"core-js/stable/regexp/constructor":["es.regexp.constructor"],"core-js/stable/regexp/flags":["es.regexp.flags"],"core-js/stable/regexp/match":["es.string.match"],"core-js/stable/regexp/replace":["es.string.replace"],"core-js/stable/regexp/search":["es.string.search"],"core-js/stable/regexp/split":["es.string.split"],"core-js/stable/regexp/sticky":["es.regexp.sticky"],"core-js/stable/regexp/test":["es.regexp.exec","es.regexp.test"],"core-js/stable/regexp/to-string":["es.regexp.to-string"],"core-js/stable/set":["es.object.to-string","es.set","es.string.iterator","web.dom-collections.iterator"],"core-js/stable/set-immediate":["web.immediate"],"core-js/stable/set-interval":["web.timers"],"core-js/stable/set-timeout":["web.timers"],"core-js/stable/string":["es.regexp.exec","es.string.code-point-at","es.string.ends-with","es.string.from-code-point","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.raw","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup"],"core-js/stable/string/anchor":["es.string.anchor"],"core-js/stable/string/big":["es.string.big"],"core-js/stable/string/blink":["es.string.blink"],"core-js/stable/string/bold":["es.string.bold"],"core-js/stable/string/code-point-at":["es.string.code-point-at"],"core-js/stable/string/ends-with":["es.string.ends-with"],"core-js/stable/string/fixed":["es.string.fixed"],"core-js/stable/string/fontcolor":["es.string.fontcolor"],"core-js/stable/string/fontsize":["es.string.fontsize"],"core-js/stable/string/from-code-point":["es.string.from-code-point"],"core-js/stable/string/includes":["es.string.includes"],"core-js/stable/string/italics":["es.string.italics"],"core-js/stable/string/iterator":["es.string.iterator"],"core-js/stable/string/link":["es.string.link"],"core-js/stable/string/match":["es.regexp.exec","es.string.match"],"core-js/stable/string/match-all":["es.string.match-all"],"core-js/stable/string/pad-end":["es.string.pad-end"],"core-js/stable/string/pad-start":["es.string.pad-start"],"core-js/stable/string/raw":["es.string.raw"],"core-js/stable/string/repeat":["es.string.repeat"],"core-js/stable/string/replace":["es.regexp.exec","es.string.replace"],"core-js/stable/string/search":["es.regexp.exec","es.string.search"],"core-js/stable/string/small":["es.string.small"],"core-js/stable/string/split":["es.regexp.exec","es.string.split"],"core-js/stable/string/starts-with":["es.string.starts-with"],"core-js/stable/string/strike":["es.string.strike"],"core-js/stable/string/sub":["es.string.sub"],"core-js/stable/string/sup":["es.string.sup"],"core-js/stable/string/trim":["es.string.trim"],"core-js/stable/string/trim-end":["es.string.trim-end"],"core-js/stable/string/trim-left":["es.string.trim-start"],"core-js/stable/string/trim-right":["es.string.trim-end"],"core-js/stable/string/trim-start":["es.string.trim-start"],"core-js/stable/string/virtual":["es.string.code-point-at","es.string.ends-with","es.string.includes","es.string.iterator","es.string.match","es.string.match-all","es.string.pad-end","es.string.pad-start","es.string.repeat","es.string.replace","es.string.search","es.string.split","es.string.starts-with","es.string.trim","es.string.trim-end","es.string.trim-start","es.string.anchor","es.string.big","es.string.blink","es.string.bold","es.string.fixed","es.string.fontcolor","es.string.fontsize","es.string.italics","es.string.link","es.string.small","es.string.strike","es.string.sub","es.string.sup"],"core-js/stable/string/virtual/anchor":["es.string.anchor"],"core-js/stable/string/virtual/big":["es.string.big"],"core-js/stable/string/virtual/blink":["es.string.blink"],"core-js/stable/string/virtual/bold":["es.string.bold"],"core-js/stable/string/virtual/code-point-at":["es.string.code-point-at"],"core-js/stable/string/virtual/ends-with":["es.string.ends-with"],"core-js/stable/string/virtual/fixed":["es.string.fixed"],"core-js/stable/string/virtual/fontcolor":["es.string.fontcolor"],"core-js/stable/string/virtual/fontsize":["es.string.fontsize"],"core-js/stable/string/virtual/includes":["es.string.includes"],"core-js/stable/string/virtual/italics":["es.string.italics"],"core-js/stable/string/virtual/iterator":["es.string.iterator"],"core-js/stable/string/virtual/link":["es.string.link"],"core-js/stable/string/virtual/match-all":["es.string.match-all"],"core-js/stable/string/virtual/pad-end":["es.string.pad-end"],"core-js/stable/string/virtual/pad-start":["es.string.pad-start"],"core-js/stable/string/virtual/repeat":["es.string.repeat"],"core-js/stable/string/virtual/small":["es.string.small"],"core-js/stable/string/virtual/starts-with":["es.string.starts-with"],"core-js/stable/string/virtual/strike":["es.string.strike"],"core-js/stable/string/virtual/sub":["es.string.sub"],"core-js/stable/string/virtual/sup":["es.string.sup"],"core-js/stable/string/virtual/trim":["es.string.trim"],"core-js/stable/string/virtual/trim-end":["es.string.trim-end"],"core-js/stable/string/virtual/trim-left":["es.string.trim-start"],"core-js/stable/string/virtual/trim-right":["es.string.trim-end"],"core-js/stable/string/virtual/trim-start":["es.string.trim-start"],"core-js/stable/symbol":["es.symbol","es.symbol.description","es.symbol.async-iterator","es.symbol.has-instance","es.symbol.is-concat-spreadable","es.symbol.iterator","es.symbol.match","es.symbol.match-all","es.symbol.replace","es.symbol.search","es.symbol.species","es.symbol.split","es.symbol.to-primitive","es.symbol.to-string-tag","es.symbol.unscopables","es.array.concat","es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/stable/symbol/async-iterator":["es.symbol.async-iterator"],"core-js/stable/symbol/description":["es.symbol.description"],"core-js/stable/symbol/for":["es.symbol"],"core-js/stable/symbol/has-instance":["es.symbol.has-instance","es.function.has-instance"],"core-js/stable/symbol/is-concat-spreadable":["es.symbol.is-concat-spreadable","es.array.concat"],"core-js/stable/symbol/iterator":["es.symbol.iterator","es.string.iterator","web.dom-collections.iterator"],"core-js/stable/symbol/key-for":["es.symbol"],"core-js/stable/symbol/match":["es.symbol.match","es.string.match"],"core-js/stable/symbol/match-all":["es.symbol.match-all","es.string.match-all"],"core-js/stable/symbol/replace":["es.symbol.replace","es.string.replace"],"core-js/stable/symbol/search":["es.symbol.search","es.string.search"],"core-js/stable/symbol/species":["es.symbol.species"],"core-js/stable/symbol/split":["es.symbol.split","es.string.split"],"core-js/stable/symbol/to-primitive":["es.symbol.to-primitive"],"core-js/stable/symbol/to-string-tag":["es.symbol.to-string-tag","es.json.to-string-tag","es.math.to-string-tag","es.object.to-string"],"core-js/stable/symbol/unscopables":["es.symbol.unscopables"],"core-js/stable/typed-array":["es.object.to-string","es.typed-array.float32-array","es.typed-array.float64-array","es.typed-array.int8-array","es.typed-array.int16-array","es.typed-array.int32-array","es.typed-array.uint8-array","es.typed-array.uint8-clamped-array","es.typed-array.uint16-array","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/copy-within":["es.typed-array.copy-within"],"core-js/stable/typed-array/entries":["es.typed-array.iterator"],"core-js/stable/typed-array/every":["es.typed-array.every"],"core-js/stable/typed-array/fill":["es.typed-array.fill"],"core-js/stable/typed-array/filter":["es.typed-array.filter"],"core-js/stable/typed-array/find":["es.typed-array.find"],"core-js/stable/typed-array/find-index":["es.typed-array.find-index"],"core-js/stable/typed-array/float32-array":["es.object.to-string","es.typed-array.float32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/float64-array":["es.object.to-string","es.typed-array.float64-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/for-each":["es.typed-array.for-each"],"core-js/stable/typed-array/from":["es.typed-array.from"],"core-js/stable/typed-array/includes":["es.typed-array.includes"],"core-js/stable/typed-array/index-of":["es.typed-array.index-of"],"core-js/stable/typed-array/int16-array":["es.object.to-string","es.typed-array.int16-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/int32-array":["es.object.to-string","es.typed-array.int32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/int8-array":["es.object.to-string","es.typed-array.int8-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/iterator":["es.typed-array.iterator"],"core-js/stable/typed-array/join":["es.typed-array.join"],"core-js/stable/typed-array/keys":["es.typed-array.iterator"],"core-js/stable/typed-array/last-index-of":["es.typed-array.last-index-of"],"core-js/stable/typed-array/map":["es.typed-array.map"],"core-js/stable/typed-array/of":["es.typed-array.of"],"core-js/stable/typed-array/reduce":["es.typed-array.reduce"],"core-js/stable/typed-array/reduce-right":["es.typed-array.reduce-right"],"core-js/stable/typed-array/reverse":["es.typed-array.reverse"],"core-js/stable/typed-array/set":["es.typed-array.set"],"core-js/stable/typed-array/slice":["es.typed-array.slice"],"core-js/stable/typed-array/some":["es.typed-array.some"],"core-js/stable/typed-array/sort":["es.typed-array.sort"],"core-js/stable/typed-array/subarray":["es.typed-array.subarray"],"core-js/stable/typed-array/to-locale-string":["es.typed-array.to-locale-string"],"core-js/stable/typed-array/to-string":["es.typed-array.to-string"],"core-js/stable/typed-array/uint16-array":["es.object.to-string","es.typed-array.uint16-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/uint32-array":["es.object.to-string","es.typed-array.uint32-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/uint8-array":["es.object.to-string","es.typed-array.uint8-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/uint8-clamped-array":["es.object.to-string","es.typed-array.uint8-clamped-array","es.typed-array.copy-within","es.typed-array.every","es.typed-array.fill","es.typed-array.filter","es.typed-array.find","es.typed-array.find-index","es.typed-array.for-each","es.typed-array.from","es.typed-array.includes","es.typed-array.index-of","es.typed-array.iterator","es.typed-array.join","es.typed-array.last-index-of","es.typed-array.map","es.typed-array.of","es.typed-array.reduce","es.typed-array.reduce-right","es.typed-array.reverse","es.typed-array.set","es.typed-array.slice","es.typed-array.some","es.typed-array.sort","es.typed-array.subarray","es.typed-array.to-locale-string","es.typed-array.to-string"],"core-js/stable/typed-array/values":["es.typed-array.iterator"],"core-js/stable/url":["web.url","web.url.to-json","web.url-search-params"],"core-js/stable/url-search-params":["web.url-search-params"],"core-js/stable/url/to-json":["web.url.to-json"],"core-js/stable/weak-map":["es.object.to-string","es.weak-map","web.dom-collections.iterator"],"core-js/stable/weak-set":["es.object.to-string","es.weak-set","web.dom-collections.iterator"],"core-js/stage":["esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.url","web.url.to-json","web.url-search-params"],"core-js/stage/0":["esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.url","web.url.to-json","web.url-search-params"],"core-js/stage/1":["esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of"],"core-js/stage/2":["esnext.aggregate-error","esnext.array.is-template-object","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.update-or-insert","esnext.map.upsert","esnext.promise.all-settled","esnext.promise.any","esnext.set.difference","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.symmetric-difference","esnext.set.union","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.replace-all","esnext.weak-map.upsert"],"core-js/stage/3":["esnext.aggregate-error","esnext.global-this","esnext.promise.all-settled","esnext.promise.any","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.replace-all"],"core-js/stage/4":["esnext.global-this","esnext.promise.all-settled","esnext.string.match-all"],"core-js/stage/pre":["esnext.aggregate-error","esnext.array.is-template-object","esnext.array.last-index","esnext.array.last-item","esnext.async-iterator.constructor","esnext.async-iterator.as-indexed-pairs","esnext.async-iterator.drop","esnext.async-iterator.every","esnext.async-iterator.filter","esnext.async-iterator.find","esnext.async-iterator.flat-map","esnext.async-iterator.for-each","esnext.async-iterator.from","esnext.async-iterator.map","esnext.async-iterator.reduce","esnext.async-iterator.some","esnext.async-iterator.take","esnext.async-iterator.to-array","esnext.composite-key","esnext.composite-symbol","esnext.global-this","esnext.iterator.constructor","esnext.iterator.as-indexed-pairs","esnext.iterator.drop","esnext.iterator.every","esnext.iterator.filter","esnext.iterator.find","esnext.iterator.flat-map","esnext.iterator.for-each","esnext.iterator.from","esnext.iterator.map","esnext.iterator.reduce","esnext.iterator.some","esnext.iterator.take","esnext.iterator.to-array","esnext.map.delete-all","esnext.map.every","esnext.map.filter","esnext.map.find","esnext.map.find-key","esnext.map.from","esnext.map.group-by","esnext.map.includes","esnext.map.key-by","esnext.map.key-of","esnext.map.map-keys","esnext.map.map-values","esnext.map.merge","esnext.map.of","esnext.map.reduce","esnext.map.some","esnext.map.update","esnext.map.update-or-insert","esnext.map.upsert","esnext.math.clamp","esnext.math.deg-per-rad","esnext.math.degrees","esnext.math.fscale","esnext.math.iaddh","esnext.math.imulh","esnext.math.isubh","esnext.math.rad-per-deg","esnext.math.radians","esnext.math.scale","esnext.math.seeded-prng","esnext.math.signbit","esnext.math.umulh","esnext.number.from-string","esnext.object.iterate-entries","esnext.object.iterate-keys","esnext.object.iterate-values","esnext.observable","esnext.promise.all-settled","esnext.promise.any","esnext.promise.try","esnext.reflect.define-metadata","esnext.reflect.delete-metadata","esnext.reflect.get-metadata","esnext.reflect.get-metadata-keys","esnext.reflect.get-own-metadata","esnext.reflect.get-own-metadata-keys","esnext.reflect.has-metadata","esnext.reflect.has-own-metadata","esnext.reflect.metadata","esnext.set.add-all","esnext.set.delete-all","esnext.set.difference","esnext.set.every","esnext.set.filter","esnext.set.find","esnext.set.from","esnext.set.intersection","esnext.set.is-disjoint-from","esnext.set.is-subset-of","esnext.set.is-superset-of","esnext.set.join","esnext.set.map","esnext.set.of","esnext.set.reduce","esnext.set.some","esnext.set.symmetric-difference","esnext.set.union","esnext.string.at","esnext.string.code-points","esnext.string.match-all","esnext.string.replace-all","esnext.symbol.async-dispose","esnext.symbol.dispose","esnext.symbol.observable","esnext.symbol.pattern-match","esnext.symbol.replace-all","esnext.weak-map.delete-all","esnext.weak-map.from","esnext.weak-map.of","esnext.weak-map.upsert","esnext.weak-set.add-all","esnext.weak-set.delete-all","esnext.weak-set.from","esnext.weak-set.of","web.url","web.url.to-json","web.url-search-params"],"core-js/web":["web.dom-collections.for-each","web.dom-collections.iterator","web.immediate","web.queue-microtask","web.timers","web.url","web.url.to-json","web.url-search-params"],"core-js/web/dom-collections":["web.dom-collections.for-each","web.dom-collections.iterator"],"core-js/web/immediate":["web.immediate"],"core-js/web/queue-microtask":["web.queue-microtask"],"core-js/web/timers":["web.timers"],"core-js/web/url":["web.url","web.url.to-json","web.url-search-params"],"core-js/web/url-search-params":["web.url-search-params"]}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = function() {
    return {
      name: "regenerator-entry",
      visitor: {
        ImportDeclaration(path) {
          isRegeneratorSource((0, _utils.getImportSource)(path)) && (this.regeneratorImportExcluded = !0, 
          path.remove());
        },
        Program(path) {
          path.get("body").forEach(bodyPath => {
            isRegeneratorSource((0, _utils.getRequireSource)(bodyPath)) && (this.regeneratorImportExcluded = !0, 
            bodyPath.remove());
          });
        }
      },
      pre() {
        this.regeneratorImportExcluded = !1;
      },
      post() {
        if (this.opts.debug && this.regeneratorImportExcluded) {
          let filename = this.file.opts.filename;
          "test" === process.env.BABEL_ENV && (filename = filename.replace(/\\/g, "/")), console.log(`\n[${filename}] Based on your targets, regenerator-runtime import excluded.`);
        }
      }
    };
  };
  var _utils = __webpack_require__(86);
  function isRegeneratorSource(source) {
    return "regenerator-runtime/runtime" === source;
  }
} ]);