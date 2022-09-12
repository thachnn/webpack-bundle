"use strict";

function _objectWithoutPropertiesLoose(source, excluded) {
  if (null == source) return {};
  var key, i, target = {}, sourceKeys = Object.keys(source);
  for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
  return target;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class Position {
  constructor(line, col, index) {
    this.line = void 0, this.column = void 0, this.index = void 0, this.line = line, 
    this.column = col, this.index = index;
  }
}

class SourceLocation {
  constructor(start, end) {
    this.start = void 0, this.end = void 0, this.filename = void 0, this.identifierName = void 0, 
    this.start = start, this.end = end;
  }
}

function createPositionWithColumnOffset(position, columnOffset) {
  const {line, column, index} = position;
  return new Position(line, column + columnOffset, index + columnOffset);
}

const ParseErrorCodes = Object.freeze({
  SyntaxError: "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED"
}), reflect = (keys, last = keys.length - 1) => ({
  get() {
    return keys.reduce(((object, key) => object[key]), this);
  },
  set(value) {
    keys.reduce(((item, key, i) => i === last ? item[key] = value : item[key]), this);
  }
}), instantiate = (constructor, properties, descriptors) => Object.keys(descriptors).map((key => [ key, descriptors[key] ])).filter((([, descriptor]) => !!descriptor)).map((([key, descriptor]) => [ key, "function" == typeof descriptor ? {
  value: descriptor,
  enumerable: !1
} : "string" == typeof descriptor.reflect ? Object.assign({}, descriptor, reflect(descriptor.reflect.split("."))) : descriptor ])).reduce(((instance, [key, descriptor]) => Object.defineProperty(instance, key, Object.assign({
  configurable: !0
}, descriptor))), Object.assign(new constructor, properties));

var ModuleErrors = _ => ({
  ImportMetaOutsideModule: _("import.meta may appear only with 'sourceType: \"module\"'", {
    code: ParseErrorCodes.SourceTypeModuleError
  }),
  ImportOutsideModule: _("'import' and 'export' may appear only with 'sourceType: \"module\"'", {
    code: ParseErrorCodes.SourceTypeModuleError
  })
});

const NodeDescriptions = {
  ArrayPattern: "array destructuring pattern",
  AssignmentExpression: "assignment expression",
  AssignmentPattern: "assignment expression",
  ArrowFunctionExpression: "arrow function expression",
  ConditionalExpression: "conditional expression",
  ForOfStatement: "for-of statement",
  ForInStatement: "for-in statement",
  ForStatement: "for-loop",
  FormalParameters: "function parameter list",
  Identifier: "identifier",
  ObjectPattern: "object destructuring pattern",
  ParenthesizedExpression: "parenthesized expression",
  RestElement: "rest element",
  UpdateExpression: {
    true: "prefix operation",
    false: "postfix operation"
  },
  VariableDeclarator: "variable declaration",
  YieldExpression: "yield expression"
}, toNodeDescription = ({type, prefix}) => "UpdateExpression" === type ? NodeDescriptions.UpdateExpression[String(prefix)] : NodeDescriptions[type];

var StandardErrors = _ => ({
  AccessorIsGenerator: _((({kind}) => `A ${kind}ter cannot be a generator.`)),
  ArgumentsInClass: _("'arguments' is only allowed in functions and class methods."),
  AsyncFunctionInSingleStatementContext: _("Async functions can only be declared at the top level or inside a block."),
  AwaitBindingIdentifier: _("Can not use 'await' as identifier inside an async function."),
  AwaitBindingIdentifierInStaticBlock: _("Can not use 'await' as identifier inside a static block."),
  AwaitExpressionFormalParameter: _("'await' is not allowed in async function parameters."),
  AwaitNotInAsyncContext: _("'await' is only allowed within async functions and at the top levels of modules."),
  AwaitNotInAsyncFunction: _("'await' is only allowed within async functions."),
  BadGetterArity: _("A 'get' accesor must not have any formal parameters."),
  BadSetterArity: _("A 'set' accesor must have exactly one formal parameter."),
  BadSetterRestParameter: _("A 'set' accesor function argument must not be a rest parameter."),
  ConstructorClassField: _("Classes may not have a field named 'constructor'."),
  ConstructorClassPrivateField: _("Classes may not have a private field named '#constructor'."),
  ConstructorIsAccessor: _("Class constructor may not be an accessor."),
  ConstructorIsAsync: _("Constructor can't be an async function."),
  ConstructorIsGenerator: _("Constructor can't be a generator."),
  DeclarationMissingInitializer: _((({kind}) => `Missing initializer in ${kind} declaration.`)),
  DecoratorBeforeExport: _("Decorators must be placed *before* the 'export' keyword. You can set the 'decoratorsBeforeExport' option to false to use the 'export @decorator class {}' syntax."),
  DecoratorConstructor: _("Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?"),
  DecoratorExportClass: _("Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead."),
  DecoratorSemicolon: _("Decorators must not be followed by a semicolon."),
  DecoratorStaticBlock: _("Decorators can't be used with a static block."),
  DeletePrivateField: _("Deleting a private field is not allowed."),
  DestructureNamedImport: _("ES2015 named imports do not destructure. Use another statement for destructuring after the import."),
  DuplicateConstructor: _("Duplicate constructor in the same class."),
  DuplicateDefaultExport: _("Only one default export allowed per module."),
  DuplicateExport: _((({exportName}) => `\`${exportName}\` has already been exported. Exported identifiers must be unique.`)),
  DuplicateProto: _("Redefinition of __proto__ property."),
  DuplicateRegExpFlags: _("Duplicate regular expression flag."),
  ElementAfterRest: _("Rest element must be last element."),
  EscapedCharNotAnIdentifier: _("Invalid Unicode escape."),
  ExportBindingIsString: _((({localName, exportName}) => `A string literal cannot be used as an exported binding without \`from\`.\n- Did you mean \`export { '${localName}' as '${exportName}' } from 'some-module'\`?`)),
  ExportDefaultFromAsIdentifier: _("'from' is not allowed as an identifier after 'export default'."),
  ForInOfLoopInitializer: _((({type}) => `'${"ForInStatement" === type ? "for-in" : "for-of"}' loop variable declaration may not have an initializer.`)),
  ForOfAsync: _("The left-hand side of a for-of loop may not be 'async'."),
  ForOfLet: _("The left-hand side of a for-of loop may not start with 'let'."),
  GeneratorInSingleStatementContext: _("Generators can only be declared at the top level or inside a block."),
  IllegalBreakContinue: _((({type}) => `Unsyntactic ${"BreakStatement" === type ? "break" : "continue"}.`)),
  IllegalLanguageModeDirective: _("Illegal 'use strict' directive in function with non-simple parameter list."),
  IllegalReturn: _("'return' outside of function."),
  ImportBindingIsString: _((({importName}) => `A string literal cannot be used as an imported binding.\n- Did you mean \`import { "${importName}" as foo }\`?`)),
  ImportCallArgumentTrailingComma: _("Trailing comma is disallowed inside import(...) arguments."),
  ImportCallArity: _((({maxArgumentCount}) => `\`import()\` requires exactly ${1 === maxArgumentCount ? "one argument" : "one or two arguments"}.`)),
  ImportCallNotNewExpression: _("Cannot use new with import(...)."),
  ImportCallSpreadArgument: _("`...` is not allowed in `import()`."),
  IncompatibleRegExpUVFlags: _("The 'u' and 'v' regular expression flags cannot be enabled at the same time."),
  InvalidBigIntLiteral: _("Invalid BigIntLiteral."),
  InvalidCodePoint: _("Code point out of bounds."),
  InvalidCoverInitializedName: _("Invalid shorthand property initializer."),
  InvalidDecimal: _("Invalid decimal."),
  InvalidDigit: _((({radix}) => `Expected number in radix ${radix}.`)),
  InvalidEscapeSequence: _("Bad character escape sequence."),
  InvalidEscapeSequenceTemplate: _("Invalid escape sequence in template."),
  InvalidEscapedReservedWord: _((({reservedWord}) => `Escape sequence in keyword ${reservedWord}.`)),
  InvalidIdentifier: _((({identifierName}) => `Invalid identifier ${identifierName}.`)),
  InvalidLhs: _((({ancestor}) => `Invalid left-hand side in ${toNodeDescription(ancestor)}.`)),
  InvalidLhsBinding: _((({ancestor}) => `Binding invalid left-hand side in ${toNodeDescription(ancestor)}.`)),
  InvalidNumber: _("Invalid number."),
  InvalidOrMissingExponent: _("Floating-point numbers require a valid exponent after the 'e'."),
  InvalidOrUnexpectedToken: _((({unexpected}) => `Unexpected character '${unexpected}'.`)),
  InvalidParenthesizedAssignment: _("Invalid parenthesized assignment pattern."),
  InvalidPrivateFieldResolution: _((({identifierName}) => `Private name #${identifierName} is not defined.`)),
  InvalidPropertyBindingPattern: _("Binding member expression."),
  InvalidRecordProperty: _("Only properties and spread elements are allowed in record definitions."),
  InvalidRestAssignmentPattern: _("Invalid rest operator's argument."),
  LabelRedeclaration: _((({labelName}) => `Label '${labelName}' is already declared.`)),
  LetInLexicalBinding: _("'let' is not allowed to be used as a name in 'let' or 'const' declarations."),
  LineTerminatorBeforeArrow: _("No line break is allowed before '=>'."),
  MalformedRegExpFlags: _("Invalid regular expression flag."),
  MissingClassName: _("A class name is required."),
  MissingEqInAssignment: _("Only '=' operator can be used for specifying default value."),
  MissingSemicolon: _("Missing semicolon."),
  MissingPlugin: _((({missingPlugin}) => `This experimental syntax requires enabling the parser plugin: ${missingPlugin.map((name => JSON.stringify(name))).join(", ")}.`)),
  MissingOneOfPlugins: _((({missingPlugin}) => `This experimental syntax requires enabling one of the following parser plugin(s): ${missingPlugin.map((name => JSON.stringify(name))).join(", ")}.`)),
  MissingUnicodeEscape: _("Expecting Unicode escape sequence \\uXXXX."),
  MixingCoalesceWithLogical: _("Nullish coalescing operator(??) requires parens when mixing with logical operators."),
  ModuleAttributeDifferentFromType: _("The only accepted module attribute is `type`."),
  ModuleAttributeInvalidValue: _("Only string literals are allowed as module attribute values."),
  ModuleAttributesWithDuplicateKeys: _((({key}) => `Duplicate key "${key}" is not allowed in module attributes.`)),
  ModuleExportNameHasLoneSurrogate: _((({surrogateCharCode}) => `An export name cannot include a lone surrogate, found '\\u${surrogateCharCode.toString(16)}'.`)),
  ModuleExportUndefined: _((({localName}) => `Export '${localName}' is not defined.`)),
  MultipleDefaultsInSwitch: _("Multiple default clauses."),
  NewlineAfterThrow: _("Illegal newline after throw."),
  NoCatchOrFinally: _("Missing catch or finally clause."),
  NumberIdentifier: _("Identifier directly after number."),
  NumericSeparatorInEscapeSequence: _("Numeric separators are not allowed inside unicode escape sequences or hex escape sequences."),
  ObsoleteAwaitStar: _("'await*' has been removed from the async functions proposal. Use Promise.all() instead."),
  OptionalChainingNoNew: _("Constructors in/after an Optional Chain are not allowed."),
  OptionalChainingNoTemplate: _("Tagged Template Literals are not allowed in optionalChain."),
  OverrideOnConstructor: _("'override' modifier cannot appear on a constructor declaration."),
  ParamDupe: _("Argument name clash."),
  PatternHasAccessor: _("Object pattern can't contain getter or setter."),
  PatternHasMethod: _("Object pattern can't contain methods."),
  PrivateInExpectedIn: _((({identifierName}) => `Private names are only allowed in property accesses (\`obj.#${identifierName}\`) or in \`in\` expressions (\`#${identifierName} in obj\`).`)),
  PrivateNameRedeclaration: _((({identifierName}) => `Duplicate private name #${identifierName}.`)),
  RecordExpressionBarIncorrectEndSyntaxType: _("Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."),
  RecordExpressionBarIncorrectStartSyntaxType: _("Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."),
  RecordExpressionHashIncorrectStartSyntaxType: _("Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'."),
  RecordNoProto: _("'__proto__' is not allowed in Record expressions."),
  RestTrailingComma: _("Unexpected trailing comma after rest element."),
  SloppyFunction: _("In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement."),
  StaticPrototype: _("Classes may not have static property named prototype."),
  SuperNotAllowed: _("`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?"),
  SuperPrivateField: _("Private fields can't be accessed on super."),
  TrailingDecorator: _("Decorators must be attached to a class element."),
  TupleExpressionBarIncorrectEndSyntaxType: _("Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."),
  TupleExpressionBarIncorrectStartSyntaxType: _("Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'."),
  TupleExpressionHashIncorrectStartSyntaxType: _("Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'."),
  UnexpectedArgumentPlaceholder: _("Unexpected argument placeholder."),
  UnexpectedAwaitAfterPipelineBody: _('Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.'),
  UnexpectedDigitAfterHash: _("Unexpected digit after hash token."),
  UnexpectedImportExport: _("'import' and 'export' may only appear at the top level."),
  UnexpectedKeyword: _((({keyword}) => `Unexpected keyword '${keyword}'.`)),
  UnexpectedLeadingDecorator: _("Leading decorators must be attached to a class declaration."),
  UnexpectedLexicalDeclaration: _("Lexical declaration cannot appear in a single-statement context."),
  UnexpectedNewTarget: _("`new.target` can only be used in functions or class properties."),
  UnexpectedNumericSeparator: _("A numeric separator is only allowed between two digits."),
  UnexpectedPrivateField: _("Unexpected private name."),
  UnexpectedReservedWord: _((({reservedWord}) => `Unexpected reserved word '${reservedWord}'.`)),
  UnexpectedSuper: _("'super' is only allowed in object methods and classes."),
  UnexpectedToken: _((({expected, unexpected}) => `Unexpected token${unexpected ? ` '${unexpected}'.` : ""}${expected ? `, expected "${expected}"` : ""}`)),
  UnexpectedTokenUnaryExponentiation: _("Illegal expression. Wrap left hand side or entire exponentiation in parentheses."),
  UnsupportedBind: _("Binding should be performed on object property."),
  UnsupportedDecoratorExport: _("A decorated export must export a class declaration."),
  UnsupportedDefaultExport: _("Only expressions, functions or classes are allowed as the `default` export."),
  UnsupportedImport: _("`import` can only be used in `import()` or `import.meta`."),
  UnsupportedMetaProperty: _((({target, onlyValidPropertyName}) => `The only valid meta property for ${target} is ${target}.${onlyValidPropertyName}.`)),
  UnsupportedParameterDecorator: _("Decorators cannot be used to decorate parameters."),
  UnsupportedPropertyDecorator: _("Decorators cannot be used to decorate object literal properties."),
  UnsupportedSuper: _("'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop])."),
  UnterminatedComment: _("Unterminated comment."),
  UnterminatedRegExp: _("Unterminated regular expression."),
  UnterminatedString: _("Unterminated string constant."),
  UnterminatedTemplate: _("Unterminated template."),
  VarRedeclaration: _((({identifierName}) => `Identifier '${identifierName}' has already been declared.`)),
  YieldBindingIdentifier: _("Can not use 'yield' as identifier inside a generator."),
  YieldInParameter: _("Yield expression is not allowed in formal parameters."),
  ZeroDigitNumericSeparator: _("Numeric separator can not be used after leading 0.")
}), StrictModeErrors = _ => ({
  StrictDelete: _("Deleting local variable in strict mode."),
  StrictEvalArguments: _((({referenceName}) => `Assigning to '${referenceName}' in strict mode.`)),
  StrictEvalArgumentsBinding: _((({bindingName}) => `Binding '${bindingName}' in strict mode.`)),
  StrictFunction: _("In strict mode code, functions can only be declared at top level or inside a block."),
  StrictNumericEscape: _("The only valid numeric escape in strict mode is '\\0'."),
  StrictOctalLiteral: _("Legacy octal literals are not allowed in strict mode."),
  StrictWith: _("'with' in strict mode.")
});

const UnparenthesizedPipeBodyDescriptions = new Set([ "ArrowFunctionExpression", "AssignmentExpression", "ConditionalExpression", "YieldExpression" ]);

var PipelineOperatorErrors = _ => ({
  PipeBodyIsTighter: _("Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence."),
  PipeTopicRequiresHackPipes: _('Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.'),
  PipeTopicUnbound: _("Topic reference is unbound; it must be inside a pipe body."),
  PipeTopicUnconfiguredToken: _((({token}) => `Invalid topic token ${token}. In order to use ${token} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${token}" }.`)),
  PipeTopicUnused: _("Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once."),
  PipeUnparenthesizedBody: _((({type}) => `Hack-style pipe body cannot be an unparenthesized ${toNodeDescription({
    type
  })}; please wrap it in parentheses.`)),
  PipelineBodyNoArrow: _('Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.'),
  PipelineBodySequenceExpression: _("Pipeline body may not be a comma-separated sequence expression."),
  PipelineHeadSequenceExpression: _("Pipeline head should not be a comma-separated sequence expression."),
  PipelineTopicUnused: _("Pipeline is in topic style but does not use topic reference."),
  PrimaryTopicNotAllowed: _("Topic reference was used in a lexical context without topic binding."),
  PrimaryTopicRequiresSmartPipeline: _('Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.')
});

const _excluded$1 = [ "toMessage" ];

function toParseErrorConstructor(_ref) {
  let {toMessage} = _ref, properties = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  return function constructor({loc, details}) {
    return instantiate(SyntaxError, Object.assign({}, properties, {
      loc
    }), {
      clone(overrides = {}) {
        const loc = overrides.loc || {};
        return constructor({
          loc: new Position("line" in loc ? loc.line : this.loc.line, "column" in loc ? loc.column : this.loc.column, "index" in loc ? loc.index : this.loc.index),
          details: Object.assign({}, this.details, overrides.details)
        });
      },
      details: {
        value: details,
        enumerable: !1
      },
      message: {
        get() {
          return `${toMessage(this.details)} (${this.loc.line}:${this.loc.column})`;
        },
        set(value) {
          Object.defineProperty(this, "message", {
            value
          });
        }
      },
      pos: {
        reflect: "loc.index",
        enumerable: !0
      },
      missingPlugin: "missingPlugin" in details && {
        reflect: "details.missingPlugin",
        enumerable: !0
      }
    });
  };
}

function toParseErrorCredentials(toMessageOrMessage, credentials) {
  return Object.assign({
    toMessage: "string" == typeof toMessageOrMessage ? () => toMessageOrMessage : toMessageOrMessage
  }, credentials);
}

function ParseErrorEnum(argument, syntaxPlugin) {
  if (Array.isArray(argument)) return toParseErrorCredentialsMap => ParseErrorEnum(toParseErrorCredentialsMap, argument[0]);
  const partialCredentials = argument(toParseErrorCredentials), ParseErrorConstructors = {};
  for (const reasonCode of Object.keys(partialCredentials)) ParseErrorConstructors[reasonCode] = toParseErrorConstructor(Object.assign({
    code: ParseErrorCodes.SyntaxError,
    reasonCode
  }, syntaxPlugin ? {
    syntaxPlugin
  } : {}, partialCredentials[reasonCode]));
  return ParseErrorConstructors;
}

const Errors = Object.assign({}, ParseErrorEnum(ModuleErrors), ParseErrorEnum(StandardErrors), ParseErrorEnum(StrictModeErrors), ParseErrorEnum`pipelineOperator`(PipelineOperatorErrors)), {defineProperty} = Object, toUnenumerable = (object, key) => defineProperty(object, key, {
  enumerable: !1,
  value: object[key]
});

function toESTreeLocation(node) {
  return toUnenumerable(node.loc.start, "index"), toUnenumerable(node.loc.end, "index"), 
  node;
}

var estree = superClass => class extends superClass {
  parse() {
    const file = toESTreeLocation(super.parse());
    return this.options.tokens && (file.tokens = file.tokens.map(toESTreeLocation)), 
    file;
  }
  parseRegExpLiteral({pattern, flags}) {
    let regex = null;
    try {
      regex = new RegExp(pattern, flags);
    } catch (e) {}
    const node = this.estreeParseLiteral(regex);
    return node.regex = {
      pattern,
      flags
    }, node;
  }
  parseBigIntLiteral(value) {
    let bigInt;
    try {
      bigInt = BigInt(value);
    } catch (_unused) {
      bigInt = null;
    }
    const node = this.estreeParseLiteral(bigInt);
    return node.bigint = String(node.value || value), node;
  }
  parseDecimalLiteral(value) {
    const node = this.estreeParseLiteral(null);
    return node.decimal = String(node.value || value), node;
  }
  estreeParseLiteral(value) {
    return this.parseLiteral(value, "Literal");
  }
  parseStringLiteral(value) {
    return this.estreeParseLiteral(value);
  }
  parseNumericLiteral(value) {
    return this.estreeParseLiteral(value);
  }
  parseNullLiteral() {
    return this.estreeParseLiteral(null);
  }
  parseBooleanLiteral(value) {
    return this.estreeParseLiteral(value);
  }
  directiveToStmt(directive) {
    const directiveLiteral = directive.value, stmt = this.startNodeAt(directive.start, directive.loc.start), expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);
    return expression.value = directiveLiteral.extra.expressionValue, expression.raw = directiveLiteral.extra.raw, 
    stmt.expression = this.finishNodeAt(expression, "Literal", directiveLiteral.loc.end), 
    stmt.directive = directiveLiteral.extra.raw.slice(1, -1), this.finishNodeAt(stmt, "ExpressionStatement", directive.loc.end);
  }
  initFunction(node, isAsync) {
    super.initFunction(node, isAsync), node.expression = !1;
  }
  checkDeclaration(node) {
    null != node && this.isObjectProperty(node) ? this.checkDeclaration(node.value) : super.checkDeclaration(node);
  }
  getObjectOrClassMethodParams(method) {
    return method.value.params;
  }
  isValidDirective(stmt) {
    var _stmt$expression$extr;
    return "ExpressionStatement" === stmt.type && "Literal" === stmt.expression.type && "string" == typeof stmt.expression.value && !(null != (_stmt$expression$extr = stmt.expression.extra) && _stmt$expression$extr.parenthesized);
  }
  parseBlockBody(node, ...args) {
    super.parseBlockBody(node, ...args);
    const directiveStatements = node.directives.map((d => this.directiveToStmt(d)));
    node.body = directiveStatements.concat(node.body), delete node.directives;
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", !0), 
    method.typeParameters && (method.value.typeParameters = method.typeParameters, delete method.typeParameters), 
    classBody.body.push(method);
  }
  parsePrivateName() {
    const node = super.parsePrivateName();
    return this.getPluginOption("estree", "classFeatures") ? this.convertPrivateNameToPrivateIdentifier(node) : node;
  }
  convertPrivateNameToPrivateIdentifier(node) {
    const name = super.getPrivateNameSV(node);
    return delete (node = node).id, node.name = name, node.type = "PrivateIdentifier", 
    node;
  }
  isPrivateName(node) {
    return this.getPluginOption("estree", "classFeatures") ? "PrivateIdentifier" === node.type : super.isPrivateName(node);
  }
  getPrivateNameSV(node) {
    return this.getPluginOption("estree", "classFeatures") ? node.name : super.getPrivateNameSV(node);
  }
  parseLiteral(value, type) {
    const node = super.parseLiteral(value, type);
    return node.raw = node.extra.raw, delete node.extra, node;
  }
  parseFunctionBody(node, allowExpression, isMethod = !1) {
    super.parseFunctionBody(node, allowExpression, isMethod), node.expression = "BlockStatement" !== node.body.type;
  }
  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = !1) {
    let funcNode = this.startNode();
    return funcNode.kind = node.kind, funcNode = super.parseMethod(funcNode, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope), 
    funcNode.type = "FunctionExpression", delete funcNode.kind, node.value = funcNode, 
    "ClassPrivateMethod" === type && (node.computed = !1), type = "MethodDefinition", 
    this.finishNode(node, type);
  }
  parseClassProperty(...args) {
    const propertyNode = super.parseClassProperty(...args);
    return this.getPluginOption("estree", "classFeatures") ? (propertyNode.type = "PropertyDefinition", 
    propertyNode) : propertyNode;
  }
  parseClassPrivateProperty(...args) {
    const propertyNode = super.parseClassPrivateProperty(...args);
    return this.getPluginOption("estree", "classFeatures") ? (propertyNode.type = "PropertyDefinition", 
    propertyNode.computed = !1, propertyNode) : propertyNode;
  }
  parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) {
    const node = super.parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor);
    return node && (node.type = "Property", "method" === node.kind && (node.kind = "init"), 
    node.shorthand = !1), node;
  }
  parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors) {
    const node = super.parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors);
    return node && (node.kind = "init", node.type = "Property"), node;
  }
  isValidLVal(type, ...rest) {
    return "Property" === type ? "value" : super.isValidLVal(type, ...rest);
  }
  isAssignable(node, isBinding) {
    return null != node && this.isObjectProperty(node) ? this.isAssignable(node.value, isBinding) : super.isAssignable(node, isBinding);
  }
  toAssignable(node, isLHS = !1) {
    if (null != node && this.isObjectProperty(node)) {
      const {key, value} = node;
      return this.isPrivateName(key) && this.classScope.usePrivateName(this.getPrivateNameSV(key), key.loc.start), 
      this.toAssignable(value, isLHS), node;
    }
    return super.toAssignable(node, isLHS);
  }
  toAssignableObjectExpressionProp(prop, ...args) {
    "get" === prop.kind || "set" === prop.kind ? this.raise(Errors.PatternHasAccessor, {
      at: prop.key
    }) : prop.method ? this.raise(Errors.PatternHasMethod, {
      at: prop.key
    }) : super.toAssignableObjectExpressionProp(prop, ...args);
  }
  finishCallExpression(node, optional) {
    if (super.finishCallExpression(node, optional), "Import" === node.callee.type) {
      var _node$arguments$;
      if (node.type = "ImportExpression", node.source = node.arguments[0], this.hasPlugin("importAssertions")) node.attributes = null != (_node$arguments$ = node.arguments[1]) ? _node$arguments$ : null;
      delete node.arguments, delete node.callee;
    }
    return node;
  }
  toReferencedArguments(node) {
    "ImportExpression" !== node.type && super.toReferencedArguments(node);
  }
  parseExport(node) {
    switch (super.parseExport(node), node.type) {
     case "ExportAllDeclaration":
      node.exported = null;
      break;

     case "ExportNamedDeclaration":
      1 === node.specifiers.length && "ExportNamespaceSpecifier" === node.specifiers[0].type && (node.type = "ExportAllDeclaration", 
      node.exported = node.specifiers[0].exported, delete node.specifiers);
    }
    return node;
  }
  parseSubscript(base, startPos, startLoc, noCalls, state) {
    const node = super.parseSubscript(base, startPos, startLoc, noCalls, state);
    if (state.optionalChainMember) {
      if ("OptionalMemberExpression" !== node.type && "OptionalCallExpression" !== node.type || (node.type = node.type.substring(8)), 
      state.stop) {
        const chain = this.startNodeAtNode(node);
        return chain.expression = node, this.finishNode(chain, "ChainExpression");
      }
    } else "MemberExpression" !== node.type && "CallExpression" !== node.type || (node.optional = !1);
    return node;
  }
  hasPropertyAsPrivateName(node) {
    return "ChainExpression" === node.type && (node = node.expression), super.hasPropertyAsPrivateName(node);
  }
  isOptionalChain(node) {
    return "ChainExpression" === node.type;
  }
  isObjectProperty(node) {
    return "Property" === node.type && "init" === node.kind && !node.method;
  }
  isObjectMethod(node) {
    return node.method || "get" === node.kind || "set" === node.kind;
  }
  finishNodeAt(node, type, endLoc) {
    return toESTreeLocation(super.finishNodeAt(node, type, endLoc));
  }
  resetEndLocation(node, endLoc = this.state.lastTokEndLoc) {
    super.resetEndLocation(node, endLoc), toESTreeLocation(node);
  }
};

class TokContext {
  constructor(token, preserveSpace) {
    this.token = void 0, this.preserveSpace = void 0, this.token = token, this.preserveSpace = !!preserveSpace;
  }
}

const types = {
  brace: new TokContext("{"),
  j_oTag: new TokContext("<tag"),
  j_cTag: new TokContext("</tag"),
  j_expr: new TokContext("<tag>...</tag>", !0)
};

types.template = new TokContext("`", !0);

const beforeExpr = !0, startsExpr = !0, isLoop = !0, isAssign = !0, prefix = !0, postfix = !0;

class ExportedTokenType {
  constructor(label, conf = {}) {
    this.label = void 0, this.keyword = void 0, this.beforeExpr = void 0, this.startsExpr = void 0, 
    this.rightAssociative = void 0, this.isLoop = void 0, this.isAssign = void 0, this.prefix = void 0, 
    this.postfix = void 0, this.binop = void 0, this.label = label, this.keyword = conf.keyword, 
    this.beforeExpr = !!conf.beforeExpr, this.startsExpr = !!conf.startsExpr, this.rightAssociative = !!conf.rightAssociative, 
    this.isLoop = !!conf.isLoop, this.isAssign = !!conf.isAssign, this.prefix = !!conf.prefix, 
    this.postfix = !!conf.postfix, this.binop = null != conf.binop ? conf.binop : null, 
    this.updateContext = null;
  }
}

const keywords$1 = new Map;

function createKeyword(name, options = {}) {
  options.keyword = name;
  const token = createToken(name, options);
  return keywords$1.set(name, token), token;
}

function createBinop(name, binop) {
  return createToken(name, {
    beforeExpr: true,
    binop
  });
}

let tokenTypeCounter = -1;

const tokenTypes = [], tokenLabels = [], tokenBinops = [], tokenBeforeExprs = [], tokenStartsExprs = [], tokenPrefixes = [];

function createToken(name, options = {}) {
  var _options$binop, _options$beforeExpr, _options$startsExpr, _options$prefix;
  return ++tokenTypeCounter, tokenLabels.push(name), tokenBinops.push(null != (_options$binop = options.binop) ? _options$binop : -1), 
  tokenBeforeExprs.push(null != (_options$beforeExpr = options.beforeExpr) && _options$beforeExpr), 
  tokenStartsExprs.push(null != (_options$startsExpr = options.startsExpr) && _options$startsExpr), 
  tokenPrefixes.push(null != (_options$prefix = options.prefix) && _options$prefix), 
  tokenTypes.push(new ExportedTokenType(name, options)), tokenTypeCounter;
}

function createKeywordLike(name, options = {}) {
  var _options$binop2, _options$beforeExpr2, _options$startsExpr2, _options$prefix2;
  return ++tokenTypeCounter, keywords$1.set(name, tokenTypeCounter), tokenLabels.push(name), 
  tokenBinops.push(null != (_options$binop2 = options.binop) ? _options$binop2 : -1), 
  tokenBeforeExprs.push(null != (_options$beforeExpr2 = options.beforeExpr) && _options$beforeExpr2), 
  tokenStartsExprs.push(null != (_options$startsExpr2 = options.startsExpr) && _options$startsExpr2), 
  tokenPrefixes.push(null != (_options$prefix2 = options.prefix) && _options$prefix2), 
  tokenTypes.push(new ExportedTokenType("name", options)), tokenTypeCounter;
}

const tt = {
  bracketL: createToken("[", {
    beforeExpr: true,
    startsExpr: true
  }),
  bracketHashL: createToken("#[", {
    beforeExpr: true,
    startsExpr: true
  }),
  bracketBarL: createToken("[|", {
    beforeExpr: true,
    startsExpr: true
  }),
  bracketR: createToken("]"),
  bracketBarR: createToken("|]"),
  braceL: createToken("{", {
    beforeExpr: true,
    startsExpr: true
  }),
  braceBarL: createToken("{|", {
    beforeExpr: true,
    startsExpr: true
  }),
  braceHashL: createToken("#{", {
    beforeExpr: true,
    startsExpr: true
  }),
  braceR: createToken("}", {
    beforeExpr: true
  }),
  braceBarR: createToken("|}"),
  parenL: createToken("(", {
    beforeExpr: true,
    startsExpr: true
  }),
  parenR: createToken(")"),
  comma: createToken(",", {
    beforeExpr: true
  }),
  semi: createToken(";", {
    beforeExpr: true
  }),
  colon: createToken(":", {
    beforeExpr: true
  }),
  doubleColon: createToken("::", {
    beforeExpr: true
  }),
  dot: createToken("."),
  question: createToken("?", {
    beforeExpr: true
  }),
  questionDot: createToken("?."),
  arrow: createToken("=>", {
    beforeExpr: true
  }),
  template: createToken("template"),
  ellipsis: createToken("...", {
    beforeExpr: true
  }),
  backQuote: createToken("`", {
    startsExpr: true
  }),
  dollarBraceL: createToken("${", {
    beforeExpr: true,
    startsExpr: true
  }),
  templateTail: createToken("...`", {
    startsExpr: true
  }),
  templateNonTail: createToken("...${", {
    beforeExpr: true,
    startsExpr: true
  }),
  at: createToken("@"),
  hash: createToken("#", {
    startsExpr: true
  }),
  interpreterDirective: createToken("#!..."),
  eq: createToken("=", {
    beforeExpr: true,
    isAssign: true
  }),
  assign: createToken("_=", {
    beforeExpr: true,
    isAssign: true
  }),
  slashAssign: createToken("_=", {
    beforeExpr: true,
    isAssign: true
  }),
  xorAssign: createToken("_=", {
    beforeExpr: true,
    isAssign: true
  }),
  moduloAssign: createToken("_=", {
    beforeExpr: true,
    isAssign: true
  }),
  incDec: createToken("++/--", {
    prefix: true,
    postfix: true,
    startsExpr: true
  }),
  bang: createToken("!", {
    beforeExpr: true,
    prefix: true,
    startsExpr: true
  }),
  tilde: createToken("~", {
    beforeExpr: true,
    prefix: true,
    startsExpr: true
  }),
  doubleCaret: createToken("^^", {
    startsExpr: true
  }),
  doubleAt: createToken("@@", {
    startsExpr: true
  }),
  pipeline: createBinop("|>", 0),
  nullishCoalescing: createBinop("??", 1),
  logicalOR: createBinop("||", 1),
  logicalAND: createBinop("&&", 2),
  bitwiseOR: createBinop("|", 3),
  bitwiseXOR: createBinop("^", 4),
  bitwiseAND: createBinop("&", 5),
  equality: createBinop("==/!=/===/!==", 6),
  lt: createBinop("</>/<=/>=", 7),
  gt: createBinop("</>/<=/>=", 7),
  relational: createBinop("</>/<=/>=", 7),
  bitShift: createBinop("<</>>/>>>", 8),
  bitShiftL: createBinop("<</>>/>>>", 8),
  bitShiftR: createBinop("<</>>/>>>", 8),
  plusMin: createToken("+/-", {
    beforeExpr: true,
    binop: 9,
    prefix: true,
    startsExpr: true
  }),
  modulo: createToken("%", {
    binop: 10,
    startsExpr: true
  }),
  star: createToken("*", {
    binop: 10
  }),
  slash: createBinop("/", 10),
  exponent: createToken("**", {
    beforeExpr: true,
    binop: 11,
    rightAssociative: !0
  }),
  _in: createKeyword("in", {
    beforeExpr: true,
    binop: 7
  }),
  _instanceof: createKeyword("instanceof", {
    beforeExpr: true,
    binop: 7
  }),
  _break: createKeyword("break"),
  _case: createKeyword("case", {
    beforeExpr: true
  }),
  _catch: createKeyword("catch"),
  _continue: createKeyword("continue"),
  _debugger: createKeyword("debugger"),
  _default: createKeyword("default", {
    beforeExpr: true
  }),
  _else: createKeyword("else", {
    beforeExpr: true
  }),
  _finally: createKeyword("finally"),
  _function: createKeyword("function", {
    startsExpr: true
  }),
  _if: createKeyword("if"),
  _return: createKeyword("return", {
    beforeExpr: true
  }),
  _switch: createKeyword("switch"),
  _throw: createKeyword("throw", {
    beforeExpr: true,
    prefix: true,
    startsExpr: true
  }),
  _try: createKeyword("try"),
  _var: createKeyword("var"),
  _const: createKeyword("const"),
  _with: createKeyword("with"),
  _new: createKeyword("new", {
    beforeExpr: true,
    startsExpr: true
  }),
  _this: createKeyword("this", {
    startsExpr: true
  }),
  _super: createKeyword("super", {
    startsExpr: true
  }),
  _class: createKeyword("class", {
    startsExpr: true
  }),
  _extends: createKeyword("extends", {
    beforeExpr: true
  }),
  _export: createKeyword("export"),
  _import: createKeyword("import", {
    startsExpr: true
  }),
  _null: createKeyword("null", {
    startsExpr: true
  }),
  _true: createKeyword("true", {
    startsExpr: true
  }),
  _false: createKeyword("false", {
    startsExpr: true
  }),
  _typeof: createKeyword("typeof", {
    beforeExpr: true,
    prefix: true,
    startsExpr: true
  }),
  _void: createKeyword("void", {
    beforeExpr: true,
    prefix: true,
    startsExpr: true
  }),
  _delete: createKeyword("delete", {
    beforeExpr: true,
    prefix: true,
    startsExpr: true
  }),
  _do: createKeyword("do", {
    isLoop: true,
    beforeExpr: true
  }),
  _for: createKeyword("for", {
    isLoop: true
  }),
  _while: createKeyword("while", {
    isLoop: true
  }),
  _as: createKeywordLike("as", {
    startsExpr: true
  }),
  _assert: createKeywordLike("assert", {
    startsExpr: true
  }),
  _async: createKeywordLike("async", {
    startsExpr: true
  }),
  _await: createKeywordLike("await", {
    startsExpr: true
  }),
  _from: createKeywordLike("from", {
    startsExpr: true
  }),
  _get: createKeywordLike("get", {
    startsExpr: true
  }),
  _let: createKeywordLike("let", {
    startsExpr: true
  }),
  _meta: createKeywordLike("meta", {
    startsExpr: true
  }),
  _of: createKeywordLike("of", {
    startsExpr: true
  }),
  _sent: createKeywordLike("sent", {
    startsExpr: true
  }),
  _set: createKeywordLike("set", {
    startsExpr: true
  }),
  _static: createKeywordLike("static", {
    startsExpr: true
  }),
  _yield: createKeywordLike("yield", {
    startsExpr: true
  }),
  _asserts: createKeywordLike("asserts", {
    startsExpr: true
  }),
  _checks: createKeywordLike("checks", {
    startsExpr: true
  }),
  _exports: createKeywordLike("exports", {
    startsExpr: true
  }),
  _global: createKeywordLike("global", {
    startsExpr: true
  }),
  _implements: createKeywordLike("implements", {
    startsExpr: true
  }),
  _intrinsic: createKeywordLike("intrinsic", {
    startsExpr: true
  }),
  _infer: createKeywordLike("infer", {
    startsExpr: true
  }),
  _is: createKeywordLike("is", {
    startsExpr: true
  }),
  _mixins: createKeywordLike("mixins", {
    startsExpr: true
  }),
  _proto: createKeywordLike("proto", {
    startsExpr: true
  }),
  _require: createKeywordLike("require", {
    startsExpr: true
  }),
  _keyof: createKeywordLike("keyof", {
    startsExpr: true
  }),
  _readonly: createKeywordLike("readonly", {
    startsExpr: true
  }),
  _unique: createKeywordLike("unique", {
    startsExpr: true
  }),
  _abstract: createKeywordLike("abstract", {
    startsExpr: true
  }),
  _declare: createKeywordLike("declare", {
    startsExpr: true
  }),
  _enum: createKeywordLike("enum", {
    startsExpr: true
  }),
  _module: createKeywordLike("module", {
    startsExpr: true
  }),
  _namespace: createKeywordLike("namespace", {
    startsExpr: true
  }),
  _interface: createKeywordLike("interface", {
    startsExpr: true
  }),
  _type: createKeywordLike("type", {
    startsExpr: true
  }),
  _opaque: createKeywordLike("opaque", {
    startsExpr: true
  }),
  name: createToken("name", {
    startsExpr: true
  }),
  string: createToken("string", {
    startsExpr: true
  }),
  num: createToken("num", {
    startsExpr: true
  }),
  bigint: createToken("bigint", {
    startsExpr: true
  }),
  decimal: createToken("decimal", {
    startsExpr: true
  }),
  regexp: createToken("regexp", {
    startsExpr: true
  }),
  privateName: createToken("#name", {
    startsExpr: true
  }),
  eof: createToken("eof"),
  jsxName: createToken("jsxName"),
  jsxText: createToken("jsxText", {
    beforeExpr: !0
  }),
  jsxTagStart: createToken("jsxTagStart", {
    startsExpr: !0
  }),
  jsxTagEnd: createToken("jsxTagEnd"),
  placeholder: createToken("%%", {
    startsExpr: !0
  })
};

function tokenIsIdentifier(token) {
  return token >= 93 && token <= 128;
}

function tokenKeywordOrIdentifierIsKeyword(token) {
  return token <= 92;
}

function tokenIsKeywordOrIdentifier(token) {
  return token >= 58 && token <= 128;
}

function tokenIsLiteralPropertyName(token) {
  return token >= 58 && token <= 132;
}

function tokenComesBeforeExpression(token) {
  return tokenBeforeExprs[token];
}

function tokenCanStartExpression(token) {
  return tokenStartsExprs[token];
}

function tokenIsAssignment(token) {
  return token >= 29 && token <= 33;
}

function tokenIsFlowInterfaceOrTypeOrOpaque(token) {
  return token >= 125 && token <= 127;
}

function tokenIsLoop(token) {
  return token >= 90 && token <= 92;
}

function tokenIsKeyword(token) {
  return token >= 58 && token <= 92;
}

function tokenIsOperator(token) {
  return token >= 39 && token <= 59;
}

function tokenIsPostfix(token) {
  return 34 === token;
}

function tokenIsPrefix(token) {
  return tokenPrefixes[token];
}

function tokenIsTSTypeOperator(token) {
  return token >= 117 && token <= 119;
}

function tokenIsTSDeclarationStart(token) {
  return token >= 120 && token <= 126;
}

function tokenLabelName(token) {
  return tokenLabels[token];
}

function tokenOperatorPrecedence(token) {
  return tokenBinops[token];
}

function tokenIsRightAssociative(token) {
  return 57 === token;
}

function tokenIsTemplate(token) {
  return token >= 24 && token <= 25;
}

function getExportedToken(token) {
  return tokenTypes[token];
}

tokenTypes[8].updateContext = context => {
  context.pop();
}, tokenTypes[5].updateContext = tokenTypes[7].updateContext = tokenTypes[23].updateContext = context => {
  context.push(types.brace);
}, tokenTypes[22].updateContext = context => {
  context[context.length - 1] === types.template ? context.pop() : context.push(types.template);
}, tokenTypes[138].updateContext = context => {
  context.push(types.j_expr, types.j_oTag);
};

let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";

const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];

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

const reservedWords = {
  keyword: [ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete" ],
  strict: [ "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield" ],
  strictBind: [ "eval", "arguments" ]
}, keywords = new Set(reservedWords.keyword), reservedWordsStrictSet = new Set(reservedWords.strict), reservedWordsStrictBindSet = new Set(reservedWords.strictBind);

function isReservedWord(word, inModule) {
  return inModule && "await" === word || "enum" === word;
}

function isStrictReservedWord(word, inModule) {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}

function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word);
}

function isStrictBindReservedWord(word, inModule) {
  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
}

function isKeyword(word) {
  return keywords.has(word);
}

function isIteratorStart(current, next, next2) {
  return 64 === current && 64 === next && isIdentifierStart(next2);
}

const reservedWordLikeSet = new Set([ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await" ]);

function canBeReservedWord(word) {
  return reservedWordLikeSet.has(word);
}

const SCOPE_OTHER = 0, SCOPE_PROGRAM = 1, SCOPE_FUNCTION = 2, SCOPE_ARROW = 4, SCOPE_SIMPLE_CATCH = 8, SCOPE_SUPER = 16, SCOPE_DIRECT_SUPER = 32, SCOPE_CLASS = 64, SCOPE_STATIC_BLOCK = 128, SCOPE_TS_MODULE = 256, SCOPE_VAR = 259, BIND_KIND_VALUE = 1, BIND_KIND_TYPE = 2, BIND_SCOPE_VAR = 4, BIND_SCOPE_LEXICAL = 8, BIND_SCOPE_FUNCTION = 16, BIND_FLAGS_NONE = 64, BIND_FLAGS_CLASS = 128, BIND_FLAGS_TS_ENUM = 256, BIND_FLAGS_TS_CONST_ENUM = 512, BIND_FLAGS_TS_EXPORT_ONLY = 1024, BIND_FLAGS_FLOW_DECLARE_FN = 2048, BIND_CLASS = 139, BIND_LEXICAL = 9, BIND_VAR = 5, BIND_FUNCTION = 17, BIND_TS_INTERFACE = 130, BIND_TS_TYPE = 2, BIND_TS_ENUM = 267, BIND_TS_AMBIENT = 1024, BIND_NONE = 64, BIND_OUTSIDE = 65, BIND_TS_CONST_ENUM = 779, BIND_TS_NAMESPACE = 1024, BIND_FLOW_DECLARE_FN = 2048, CLASS_ELEMENT_FLAG_STATIC = 4, CLASS_ELEMENT_KIND_GETTER = 2, CLASS_ELEMENT_KIND_SETTER = 1, CLASS_ELEMENT_KIND_ACCESSOR = 3, CLASS_ELEMENT_STATIC_GETTER = 6, CLASS_ELEMENT_STATIC_SETTER = 5, CLASS_ELEMENT_INSTANCE_GETTER = 2, CLASS_ELEMENT_INSTANCE_SETTER = 1, CLASS_ELEMENT_OTHER = 0;

class BaseParser {
  constructor() {
    this.sawUnambiguousESM = !1, this.ambiguousScriptDifferentAst = !1;
  }
  hasPlugin(pluginConfig) {
    if ("string" == typeof pluginConfig) return this.plugins.has(pluginConfig);
    {
      const [pluginName, pluginOptions] = pluginConfig;
      if (!this.hasPlugin(pluginName)) return !1;
      const actualOptions = this.plugins.get(pluginName);
      for (const key of Object.keys(pluginOptions)) if ((null == actualOptions ? void 0 : actualOptions[key]) !== pluginOptions[key]) return !1;
      return !0;
    }
  }
  getPluginOption(plugin, name) {
    var _this$plugins$get;
    return null == (_this$plugins$get = this.plugins.get(plugin)) ? void 0 : _this$plugins$get[name];
  }
}

function setTrailingComments(node, comments) {
  void 0 === node.trailingComments ? node.trailingComments = comments : node.trailingComments.unshift(...comments);
}

function setLeadingComments(node, comments) {
  void 0 === node.leadingComments ? node.leadingComments = comments : node.leadingComments.unshift(...comments);
}

function setInnerComments(node, comments) {
  void 0 === node.innerComments ? node.innerComments = comments : node.innerComments.unshift(...comments);
}

function adjustInnerComments(node, elements, commentWS) {
  let lastElement = null, i = elements.length;
  for (;null === lastElement && i > 0; ) lastElement = elements[--i];
  null === lastElement || lastElement.start > commentWS.start ? setInnerComments(node, commentWS.comments) : setTrailingComments(lastElement, commentWS.comments);
}

class CommentsParser extends BaseParser {
  addComment(comment) {
    this.filename && (comment.loc.filename = this.filename), this.state.comments.push(comment);
  }
  processComment(node) {
    const {commentStack} = this.state, commentStackLength = commentStack.length;
    if (0 === commentStackLength) return;
    let i = commentStackLength - 1;
    const lastCommentWS = commentStack[i];
    lastCommentWS.start === node.end && (lastCommentWS.leadingNode = node, i--);
    const {start: nodeStart} = node;
    for (;i >= 0; i--) {
      const commentWS = commentStack[i], commentEnd = commentWS.end;
      if (!(commentEnd > nodeStart)) {
        commentEnd === nodeStart && (commentWS.trailingNode = node);
        break;
      }
      commentWS.containingNode = node, this.finalizeComment(commentWS), commentStack.splice(i, 1);
    }
  }
  finalizeComment(commentWS) {
    const {comments} = commentWS;
    if (null !== commentWS.leadingNode || null !== commentWS.trailingNode) null !== commentWS.leadingNode && setTrailingComments(commentWS.leadingNode, comments), 
    null !== commentWS.trailingNode && setLeadingComments(commentWS.trailingNode, comments); else {
      const {containingNode: node, start: commentStart} = commentWS;
      if (44 === this.input.charCodeAt(commentStart - 1)) switch (node.type) {
       case "ObjectExpression":
       case "ObjectPattern":
       case "RecordExpression":
        adjustInnerComments(node, node.properties, commentWS);
        break;

       case "CallExpression":
       case "OptionalCallExpression":
        adjustInnerComments(node, node.arguments, commentWS);
        break;

       case "FunctionDeclaration":
       case "FunctionExpression":
       case "ArrowFunctionExpression":
       case "ObjectMethod":
       case "ClassMethod":
       case "ClassPrivateMethod":
        adjustInnerComments(node, node.params, commentWS);
        break;

       case "ArrayExpression":
       case "ArrayPattern":
       case "TupleExpression":
        adjustInnerComments(node, node.elements, commentWS);
        break;

       case "ExportNamedDeclaration":
       case "ImportDeclaration":
        adjustInnerComments(node, node.specifiers, commentWS);
        break;

       default:
        setInnerComments(node, comments);
      } else setInnerComments(node, comments);
    }
  }
  finalizeRemainingComments() {
    const {commentStack} = this.state;
    for (let i = commentStack.length - 1; i >= 0; i--) this.finalizeComment(commentStack[i]);
    this.state.commentStack = [];
  }
  resetPreviousNodeTrailingComments(node) {
    const {commentStack} = this.state, {length} = commentStack;
    if (0 === length) return;
    const commentWS = commentStack[length - 1];
    commentWS.leadingNode === node && (commentWS.leadingNode = null);
  }
  takeSurroundingComments(node, start, end) {
    const {commentStack} = this.state, commentStackLength = commentStack.length;
    if (0 === commentStackLength) return;
    let i = commentStackLength - 1;
    for (;i >= 0; i--) {
      const commentWS = commentStack[i], commentEnd = commentWS.end;
      if (commentWS.start === end) commentWS.leadingNode = node; else if (commentEnd === start) commentWS.trailingNode = node; else if (commentEnd < start) break;
    }
  }
}

const lineBreak = /\r\n?|[\n\u2028\u2029]/, lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code) {
  switch (code) {
   case 10:
   case 13:
   case 8232:
   case 8233:
    return !0;

   default:
    return !1;
  }
}

const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, skipWhiteSpaceInLine = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/y, skipWhiteSpaceToLineBreak = new RegExp("(?=(" + skipWhiteSpaceInLine.source + "))\\1" + /(?=[\n\r\u2028\u2029]|\/\*(?!.*?\*\/)|$)/.source, "y");

function isWhitespace(code) {
  switch (code) {
   case 9:
   case 11:
   case 12:
   case 32:
   case 160:
   case 5760:
   case 8192:
   case 8193:
   case 8194:
   case 8195:
   case 8196:
   case 8197:
   case 8198:
   case 8199:
   case 8200:
   case 8201:
   case 8202:
   case 8239:
   case 8287:
   case 12288:
   case 65279:
    return !0;

   default:
    return !1;
  }
}

class State {
  constructor() {
    this.strict = void 0, this.curLine = void 0, this.lineStart = void 0, this.startLoc = void 0, 
    this.endLoc = void 0, this.errors = [], this.potentialArrowAt = -1, this.noArrowAt = [], 
    this.noArrowParamsConversionAt = [], this.maybeInArrowParameters = !1, this.inType = !1, 
    this.noAnonFunctionType = !1, this.hasFlowComment = !1, this.isAmbientContext = !1, 
    this.inAbstractClass = !1, this.topicContext = {
      maxNumOfResolvableTopics: 0,
      maxTopicIndex: null
    }, this.soloAwait = !1, this.inFSharpPipelineDirectBody = !1, this.labels = [], 
    this.decoratorStack = [ [] ], this.comments = [], this.commentStack = [], this.pos = 0, 
    this.type = 135, this.value = null, this.start = 0, this.end = 0, this.lastTokEndLoc = null, 
    this.lastTokStartLoc = null, this.lastTokStart = 0, this.context = [ types.brace ], 
    this.canStartJSXElement = !0, this.containsEsc = !1, this.strictErrors = new Map, 
    this.tokensLength = 0;
  }
  init({strictMode, sourceType, startLine, startColumn}) {
    this.strict = !1 !== strictMode && (!0 === strictMode || "module" === sourceType), 
    this.curLine = startLine, this.lineStart = -startColumn, this.startLoc = this.endLoc = new Position(startLine, startColumn, 0);
  }
  curPosition() {
    return new Position(this.curLine, this.pos - this.lineStart, this.pos);
  }
  clone(skipArrays) {
    const state = new State, keys = Object.keys(this);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      let val = this[key];
      !skipArrays && Array.isArray(val) && (val = val.slice()), state[key] = val;
    }
    return state;
  }
}

const _excluded = [ "at" ], _excluded2 = [ "at" ];

var _isDigit = function(code) {
  return code >= 48 && code <= 57;
};

const VALID_REGEX_FLAGS = new Set([ 103, 109, 115, 105, 121, 117, 100, 118 ]), forbiddenNumericSeparatorSiblings = {
  decBinOct: new Set([ 46, 66, 69, 79, 95, 98, 101, 111 ]),
  hex: new Set([ 46, 88, 95, 120 ])
}, isAllowedNumericSeparatorSibling = {
  bin: ch => 48 === ch || 49 === ch,
  oct: ch => ch >= 48 && ch <= 55,
  dec: ch => ch >= 48 && ch <= 57,
  hex: ch => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
};

class Token {
  constructor(state) {
    this.type = state.type, this.value = state.value, this.start = state.start, this.end = state.end, 
    this.loc = new SourceLocation(state.startLoc, state.endLoc);
  }
}

class Tokenizer extends CommentsParser {
  constructor(options, input) {
    super(), this.isLookahead = void 0, this.tokens = [], this.state = new State, this.state.init(options), 
    this.input = input, this.length = input.length, this.isLookahead = !1;
  }
  pushToken(token) {
    this.tokens.length = this.state.tokensLength, this.tokens.push(token), ++this.state.tokensLength;
  }
  next() {
    this.checkKeywordEscapes(), this.options.tokens && this.pushToken(new Token(this.state)), 
    this.state.lastTokStart = this.state.start, this.state.lastTokEndLoc = this.state.endLoc, 
    this.state.lastTokStartLoc = this.state.startLoc, this.nextToken();
  }
  eat(type) {
    return !!this.match(type) && (this.next(), !0);
  }
  match(type) {
    return this.state.type === type;
  }
  createLookaheadState(state) {
    return {
      pos: state.pos,
      value: null,
      type: state.type,
      start: state.start,
      end: state.end,
      context: [ this.curContext() ],
      inType: state.inType,
      startLoc: state.startLoc,
      lastTokEndLoc: state.lastTokEndLoc,
      curLine: state.curLine,
      lineStart: state.lineStart,
      curPosition: state.curPosition
    };
  }
  lookahead() {
    const old = this.state;
    this.state = this.createLookaheadState(old), this.isLookahead = !0, this.nextToken(), 
    this.isLookahead = !1;
    const curr = this.state;
    return this.state = old, curr;
  }
  nextTokenStart() {
    return this.nextTokenStartSince(this.state.pos);
  }
  nextTokenStartSince(pos) {
    return skipWhiteSpace.lastIndex = pos, skipWhiteSpace.test(this.input) ? skipWhiteSpace.lastIndex : pos;
  }
  lookaheadCharCode() {
    return this.input.charCodeAt(this.nextTokenStart());
  }
  codePointAtPos(pos) {
    let cp = this.input.charCodeAt(pos);
    if (55296 == (64512 & cp) && ++pos < this.input.length) {
      const trail = this.input.charCodeAt(pos);
      56320 == (64512 & trail) && (cp = 65536 + ((1023 & cp) << 10) + (1023 & trail));
    }
    return cp;
  }
  setStrict(strict) {
    this.state.strict = strict, strict && (this.state.strictErrors.forEach((([toParseError, at]) => this.raise(toParseError, {
      at
    }))), this.state.strictErrors.clear());
  }
  curContext() {
    return this.state.context[this.state.context.length - 1];
  }
  nextToken() {
    this.skipSpace(), this.state.start = this.state.pos, this.isLookahead || (this.state.startLoc = this.state.curPosition()), 
    this.state.pos >= this.length ? this.finishToken(135) : this.getTokenFromCode(this.codePointAtPos(this.state.pos));
  }
  skipBlockComment() {
    let startLoc;
    this.isLookahead || (startLoc = this.state.curPosition());
    const start = this.state.pos, end = this.input.indexOf("*/", start + 2);
    if (-1 === end) throw this.raise(Errors.UnterminatedComment, {
      at: this.state.curPosition()
    });
    for (this.state.pos = end + 2, lineBreakG.lastIndex = start + 2; lineBreakG.test(this.input) && lineBreakG.lastIndex <= end; ) ++this.state.curLine, 
    this.state.lineStart = lineBreakG.lastIndex;
    if (this.isLookahead) return;
    const comment = {
      type: "CommentBlock",
      value: this.input.slice(start + 2, end),
      start,
      end: end + 2,
      loc: new SourceLocation(startLoc, this.state.curPosition())
    };
    return this.options.tokens && this.pushToken(comment), comment;
  }
  skipLineComment(startSkip) {
    const start = this.state.pos;
    let startLoc;
    this.isLookahead || (startLoc = this.state.curPosition());
    let ch = this.input.charCodeAt(this.state.pos += startSkip);
    if (this.state.pos < this.length) for (;!isNewLine(ch) && ++this.state.pos < this.length; ) ch = this.input.charCodeAt(this.state.pos);
    if (this.isLookahead) return;
    const end = this.state.pos, comment = {
      type: "CommentLine",
      value: this.input.slice(start + startSkip, end),
      start,
      end,
      loc: new SourceLocation(startLoc, this.state.curPosition())
    };
    return this.options.tokens && this.pushToken(comment), comment;
  }
  skipSpace() {
    const spaceStart = this.state.pos, comments = [];
    loop: for (;this.state.pos < this.length; ) {
      const ch = this.input.charCodeAt(this.state.pos);
      switch (ch) {
       case 32:
       case 160:
       case 9:
        ++this.state.pos;
        break;

       case 13:
        10 === this.input.charCodeAt(this.state.pos + 1) && ++this.state.pos;

       case 10:
       case 8232:
       case 8233:
        ++this.state.pos, ++this.state.curLine, this.state.lineStart = this.state.pos;
        break;

       case 47:
        switch (this.input.charCodeAt(this.state.pos + 1)) {
         case 42:
          {
            const comment = this.skipBlockComment();
            void 0 !== comment && (this.addComment(comment), this.options.attachComment && comments.push(comment));
            break;
          }

         case 47:
          {
            const comment = this.skipLineComment(2);
            void 0 !== comment && (this.addComment(comment), this.options.attachComment && comments.push(comment));
            break;
          }

         default:
          break loop;
        }
        break;

       default:
        if (isWhitespace(ch)) ++this.state.pos; else if (45 !== ch || this.inModule) {
          if (60 !== ch || this.inModule) break loop;
          {
            const pos = this.state.pos;
            if (33 !== this.input.charCodeAt(pos + 1) || 45 !== this.input.charCodeAt(pos + 2) || 45 !== this.input.charCodeAt(pos + 3)) break loop;
            {
              const comment = this.skipLineComment(4);
              void 0 !== comment && (this.addComment(comment), this.options.attachComment && comments.push(comment));
            }
          }
        } else {
          const pos = this.state.pos;
          if (45 !== this.input.charCodeAt(pos + 1) || 62 !== this.input.charCodeAt(pos + 2) || !(0 === spaceStart || this.state.lineStart > spaceStart)) break loop;
          {
            const comment = this.skipLineComment(3);
            void 0 !== comment && (this.addComment(comment), this.options.attachComment && comments.push(comment));
          }
        }
      }
    }
    if (comments.length > 0) {
      const CommentWhitespace = {
        start: spaceStart,
        end: this.state.pos,
        comments,
        leadingNode: null,
        trailingNode: null,
        containingNode: null
      };
      this.state.commentStack.push(CommentWhitespace);
    }
  }
  finishToken(type, val) {
    this.state.end = this.state.pos, this.state.endLoc = this.state.curPosition();
    const prevType = this.state.type;
    this.state.type = type, this.state.value = val, this.isLookahead || this.updateContext(prevType);
  }
  replaceToken(type) {
    this.state.type = type, this.updateContext();
  }
  readToken_numberSign() {
    if (0 === this.state.pos && this.readToken_interpreter()) return;
    const nextPos = this.state.pos + 1, next = this.codePointAtPos(nextPos);
    if (next >= 48 && next <= 57) throw this.raise(Errors.UnexpectedDigitAfterHash, {
      at: this.state.curPosition()
    });
    if (123 === next || 91 === next && this.hasPlugin("recordAndTuple")) {
      if (this.expectPlugin("recordAndTuple"), "hash" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(123 === next ? Errors.RecordExpressionHashIncorrectStartSyntaxType : Errors.TupleExpressionHashIncorrectStartSyntaxType, {
        at: this.state.curPosition()
      });
      this.state.pos += 2, 123 === next ? this.finishToken(7) : this.finishToken(1);
    } else isIdentifierStart(next) ? (++this.state.pos, this.finishToken(134, this.readWord1(next))) : 92 === next ? (++this.state.pos, 
    this.finishToken(134, this.readWord1())) : this.finishOp(27, 1);
  }
  readToken_dot() {
    const next = this.input.charCodeAt(this.state.pos + 1);
    next >= 48 && next <= 57 ? this.readNumber(!0) : 46 === next && 46 === this.input.charCodeAt(this.state.pos + 2) ? (this.state.pos += 3, 
    this.finishToken(21)) : (++this.state.pos, this.finishToken(16));
  }
  readToken_slash() {
    61 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(31, 2) : this.finishOp(56, 1);
  }
  readToken_interpreter() {
    if (0 !== this.state.pos || this.length < 2) return !1;
    let ch = this.input.charCodeAt(this.state.pos + 1);
    if (33 !== ch) return !1;
    const start = this.state.pos;
    for (this.state.pos += 1; !isNewLine(ch) && ++this.state.pos < this.length; ) ch = this.input.charCodeAt(this.state.pos);
    const value = this.input.slice(start + 2, this.state.pos);
    return this.finishToken(28, value), !0;
  }
  readToken_mult_modulo(code) {
    let type = 42 === code ? 55 : 54, width = 1, next = this.input.charCodeAt(this.state.pos + 1);
    42 === code && 42 === next && (width++, next = this.input.charCodeAt(this.state.pos + 2), 
    type = 57), 61 !== next || this.state.inType || (width++, type = 37 === code ? 33 : 30), 
    this.finishOp(type, width);
  }
  readToken_pipe_amp(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (next !== code) {
      if (124 === code) {
        if (62 === next) return void this.finishOp(39, 2);
        if (this.hasPlugin("recordAndTuple") && 125 === next) {
          if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(Errors.RecordExpressionBarIncorrectEndSyntaxType, {
            at: this.state.curPosition()
          });
          return this.state.pos += 2, void this.finishToken(9);
        }
        if (this.hasPlugin("recordAndTuple") && 93 === next) {
          if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(Errors.TupleExpressionBarIncorrectEndSyntaxType, {
            at: this.state.curPosition()
          });
          return this.state.pos += 2, void this.finishToken(4);
        }
      }
      61 !== next ? this.finishOp(124 === code ? 43 : 45, 1) : this.finishOp(30, 2);
    } else 61 === this.input.charCodeAt(this.state.pos + 2) ? this.finishOp(30, 3) : this.finishOp(124 === code ? 41 : 42, 2);
  }
  readToken_caret() {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (61 !== next || this.state.inType) if (94 === next && this.hasPlugin([ "pipelineOperator", {
      proposal: "hack",
      topicToken: "^^"
    } ])) {
      this.finishOp(37, 2);
      if (94 === this.input.codePointAt(this.state.pos)) throw this.unexpected();
    } else this.finishOp(44, 1); else this.finishOp(32, 2);
  }
  readToken_atSign() {
    64 === this.input.charCodeAt(this.state.pos + 1) && this.hasPlugin([ "pipelineOperator", {
      proposal: "hack",
      topicToken: "@@"
    } ]) ? this.finishOp(38, 2) : this.finishOp(26, 1);
  }
  readToken_plus_min(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    next !== code ? 61 === next ? this.finishOp(30, 2) : this.finishOp(53, 1) : this.finishOp(34, 2);
  }
  readToken_lt() {
    const {pos} = this.state, next = this.input.charCodeAt(pos + 1);
    if (60 === next) return 61 === this.input.charCodeAt(pos + 2) ? void this.finishOp(30, 3) : void this.finishOp(51, 2);
    61 !== next ? this.finishOp(47, 1) : this.finishOp(49, 2);
  }
  readToken_gt() {
    const {pos} = this.state, next = this.input.charCodeAt(pos + 1);
    if (62 === next) {
      const size = 62 === this.input.charCodeAt(pos + 2) ? 3 : 2;
      return 61 === this.input.charCodeAt(pos + size) ? void this.finishOp(30, size + 1) : void this.finishOp(52, size);
    }
    61 !== next ? this.finishOp(48, 1) : this.finishOp(49, 2);
  }
  readToken_eq_excl(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (61 !== next) return 61 === code && 62 === next ? (this.state.pos += 2, void this.finishToken(19)) : void this.finishOp(61 === code ? 29 : 35, 1);
    this.finishOp(46, 61 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2);
  }
  readToken_question() {
    const next = this.input.charCodeAt(this.state.pos + 1), next2 = this.input.charCodeAt(this.state.pos + 2);
    63 === next ? 61 === next2 ? this.finishOp(30, 3) : this.finishOp(40, 2) : 46 !== next || next2 >= 48 && next2 <= 57 ? (++this.state.pos, 
    this.finishToken(17)) : (this.state.pos += 2, this.finishToken(18));
  }
  getTokenFromCode(code) {
    switch (code) {
     case 46:
      return void this.readToken_dot();

     case 40:
      return ++this.state.pos, void this.finishToken(10);

     case 41:
      return ++this.state.pos, void this.finishToken(11);

     case 59:
      return ++this.state.pos, void this.finishToken(13);

     case 44:
      return ++this.state.pos, void this.finishToken(12);

     case 91:
      if (this.hasPlugin("recordAndTuple") && 124 === this.input.charCodeAt(this.state.pos + 1)) {
        if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(Errors.TupleExpressionBarIncorrectStartSyntaxType, {
          at: this.state.curPosition()
        });
        this.state.pos += 2, this.finishToken(2);
      } else ++this.state.pos, this.finishToken(0);
      return;

     case 93:
      return ++this.state.pos, void this.finishToken(3);

     case 123:
      if (this.hasPlugin("recordAndTuple") && 124 === this.input.charCodeAt(this.state.pos + 1)) {
        if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(Errors.RecordExpressionBarIncorrectStartSyntaxType, {
          at: this.state.curPosition()
        });
        this.state.pos += 2, this.finishToken(6);
      } else ++this.state.pos, this.finishToken(5);
      return;

     case 125:
      return ++this.state.pos, void this.finishToken(8);

     case 58:
      return void (this.hasPlugin("functionBind") && 58 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(15, 2) : (++this.state.pos, 
      this.finishToken(14)));

     case 63:
      return void this.readToken_question();

     case 96:
      return void this.readTemplateToken();

     case 48:
      {
        const next = this.input.charCodeAt(this.state.pos + 1);
        if (120 === next || 88 === next) return void this.readRadixNumber(16);
        if (111 === next || 79 === next) return void this.readRadixNumber(8);
        if (98 === next || 66 === next) return void this.readRadixNumber(2);
      }

     case 49:
     case 50:
     case 51:
     case 52:
     case 53:
     case 54:
     case 55:
     case 56:
     case 57:
      return void this.readNumber(!1);

     case 34:
     case 39:
      return void this.readString(code);

     case 47:
      return void this.readToken_slash();

     case 37:
     case 42:
      return void this.readToken_mult_modulo(code);

     case 124:
     case 38:
      return void this.readToken_pipe_amp(code);

     case 94:
      return void this.readToken_caret();

     case 43:
     case 45:
      return void this.readToken_plus_min(code);

     case 60:
      return void this.readToken_lt();

     case 62:
      return void this.readToken_gt();

     case 61:
     case 33:
      return void this.readToken_eq_excl(code);

     case 126:
      return void this.finishOp(36, 1);

     case 64:
      return void this.readToken_atSign();

     case 35:
      return void this.readToken_numberSign();

     case 92:
      return void this.readWord();

     default:
      if (isIdentifierStart(code)) return void this.readWord(code);
    }
    throw this.raise(Errors.InvalidOrUnexpectedToken, {
      at: this.state.curPosition(),
      unexpected: String.fromCodePoint(code)
    });
  }
  finishOp(type, size) {
    const str = this.input.slice(this.state.pos, this.state.pos + size);
    this.state.pos += size, this.finishToken(type, str);
  }
  readRegexp() {
    const startLoc = this.state.startLoc, start = this.state.start + 1;
    let escaped, inClass, {pos} = this.state;
    for (;;++pos) {
      if (pos >= this.length) throw this.raise(Errors.UnterminatedRegExp, {
        at: createPositionWithColumnOffset(startLoc, 1)
      });
      const ch = this.input.charCodeAt(pos);
      if (isNewLine(ch)) throw this.raise(Errors.UnterminatedRegExp, {
        at: createPositionWithColumnOffset(startLoc, 1)
      });
      if (escaped) escaped = !1; else {
        if (91 === ch) inClass = !0; else if (93 === ch && inClass) inClass = !1; else if (47 === ch && !inClass) break;
        escaped = 92 === ch;
      }
    }
    const content = this.input.slice(start, pos);
    ++pos;
    let mods = "";
    const nextPos = () => createPositionWithColumnOffset(startLoc, pos + 2 - start);
    for (;pos < this.length; ) {
      const cp = this.codePointAtPos(pos), char = String.fromCharCode(cp);
      if (VALID_REGEX_FLAGS.has(cp)) 118 === cp ? (this.expectPlugin("regexpUnicodeSets", nextPos()), 
      mods.includes("u") && this.raise(Errors.IncompatibleRegExpUVFlags, {
        at: nextPos()
      })) : 117 === cp && mods.includes("v") && this.raise(Errors.IncompatibleRegExpUVFlags, {
        at: nextPos()
      }), mods.includes(char) && this.raise(Errors.DuplicateRegExpFlags, {
        at: nextPos()
      }); else {
        if (!isIdentifierChar(cp) && 92 !== cp) break;
        this.raise(Errors.MalformedRegExpFlags, {
          at: nextPos()
        });
      }
      ++pos, mods += char;
    }
    this.state.pos = pos, this.finishToken(133, {
      pattern: content,
      flags: mods
    });
  }
  readInt(radix, len, forceLen, allowNumSeparator = !0) {
    const start = this.state.pos, forbiddenSiblings = 16 === radix ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct, isAllowedSibling = 16 === radix ? isAllowedNumericSeparatorSibling.hex : 10 === radix ? isAllowedNumericSeparatorSibling.dec : 8 === radix ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
    let invalid = !1, total = 0;
    for (let i = 0, e = null == len ? 1 / 0 : len; i < e; ++i) {
      const code = this.input.charCodeAt(this.state.pos);
      let val;
      if (95 !== code || "bail" === allowNumSeparator) {
        if (val = code >= 97 ? code - 97 + 10 : code >= 65 ? code - 65 + 10 : _isDigit(code) ? code - 48 : 1 / 0, 
        val >= radix) if (this.options.errorRecovery && val <= 9) val = 0, this.raise(Errors.InvalidDigit, {
          at: this.state.curPosition(),
          radix
        }); else {
          if (!forceLen) break;
          val = 0, invalid = !0;
        }
        ++this.state.pos, total = total * radix + val;
      } else {
        const prev = this.input.charCodeAt(this.state.pos - 1), next = this.input.charCodeAt(this.state.pos + 1);
        allowNumSeparator ? (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) && this.raise(Errors.UnexpectedNumericSeparator, {
          at: this.state.curPosition()
        }) : this.raise(Errors.NumericSeparatorInEscapeSequence, {
          at: this.state.curPosition()
        }), ++this.state.pos;
      }
    }
    return this.state.pos === start || null != len && this.state.pos - start !== len || invalid ? null : total;
  }
  readRadixNumber(radix) {
    const startLoc = this.state.curPosition();
    let isBigInt = !1;
    this.state.pos += 2;
    const val = this.readInt(radix);
    null == val && this.raise(Errors.InvalidDigit, {
      at: createPositionWithColumnOffset(startLoc, 2),
      radix
    });
    const next = this.input.charCodeAt(this.state.pos);
    if (110 === next) ++this.state.pos, isBigInt = !0; else if (109 === next) throw this.raise(Errors.InvalidDecimal, {
      at: startLoc
    });
    if (isIdentifierStart(this.codePointAtPos(this.state.pos))) throw this.raise(Errors.NumberIdentifier, {
      at: this.state.curPosition()
    });
    if (isBigInt) {
      const str = this.input.slice(startLoc.index, this.state.pos).replace(/[_n]/g, "");
      this.finishToken(131, str);
    } else this.finishToken(130, val);
  }
  readNumber(startsWithDot) {
    const start = this.state.pos, startLoc = this.state.curPosition();
    let isFloat = !1, isBigInt = !1, isDecimal = !1, hasExponent = !1, isOctal = !1;
    startsWithDot || null !== this.readInt(10) || this.raise(Errors.InvalidNumber, {
      at: this.state.curPosition()
    });
    const hasLeadingZero = this.state.pos - start >= 2 && 48 === this.input.charCodeAt(start);
    if (hasLeadingZero) {
      const integer = this.input.slice(start, this.state.pos);
      if (this.recordStrictModeErrors(Errors.StrictOctalLiteral, {
        at: startLoc
      }), !this.state.strict) {
        const underscorePos = integer.indexOf("_");
        underscorePos > 0 && this.raise(Errors.ZeroDigitNumericSeparator, {
          at: createPositionWithColumnOffset(startLoc, underscorePos)
        });
      }
      isOctal = hasLeadingZero && !/[89]/.test(integer);
    }
    let next = this.input.charCodeAt(this.state.pos);
    if (46 !== next || isOctal || (++this.state.pos, this.readInt(10), isFloat = !0, 
    next = this.input.charCodeAt(this.state.pos)), 69 !== next && 101 !== next || isOctal || (next = this.input.charCodeAt(++this.state.pos), 
    43 !== next && 45 !== next || ++this.state.pos, null === this.readInt(10) && this.raise(Errors.InvalidOrMissingExponent, {
      at: startLoc
    }), isFloat = !0, hasExponent = !0, next = this.input.charCodeAt(this.state.pos)), 
    110 === next && ((isFloat || hasLeadingZero) && this.raise(Errors.InvalidBigIntLiteral, {
      at: startLoc
    }), ++this.state.pos, isBigInt = !0), 109 === next && (this.expectPlugin("decimal", this.state.curPosition()), 
    (hasExponent || hasLeadingZero) && this.raise(Errors.InvalidDecimal, {
      at: startLoc
    }), ++this.state.pos, isDecimal = !0), isIdentifierStart(this.codePointAtPos(this.state.pos))) throw this.raise(Errors.NumberIdentifier, {
      at: this.state.curPosition()
    });
    const str = this.input.slice(start, this.state.pos).replace(/[_mn]/g, "");
    if (isBigInt) return void this.finishToken(131, str);
    if (isDecimal) return void this.finishToken(132, str);
    const val = isOctal ? parseInt(str, 8) : parseFloat(str);
    this.finishToken(130, val);
  }
  readCodePoint(throwOnInvalid) {
    let code;
    if (123 === this.input.charCodeAt(this.state.pos)) {
      if (++this.state.pos, code = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, !0, throwOnInvalid), 
      ++this.state.pos, null !== code && code > 1114111) {
        if (!throwOnInvalid) return null;
        this.raise(Errors.InvalidCodePoint, {
          at: this.state.curPosition()
        });
      }
    } else code = this.readHexChar(4, !1, throwOnInvalid);
    return code;
  }
  readString(quote) {
    let out = "", chunkStart = ++this.state.pos;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(Errors.UnterminatedString, {
        at: this.state.startLoc
      });
      const ch = this.input.charCodeAt(this.state.pos);
      if (ch === quote) break;
      if (92 === ch) out += this.input.slice(chunkStart, this.state.pos), out += this.readEscapedChar(!1), 
      chunkStart = this.state.pos; else if (8232 === ch || 8233 === ch) ++this.state.pos, 
      ++this.state.curLine, this.state.lineStart = this.state.pos; else {
        if (isNewLine(ch)) throw this.raise(Errors.UnterminatedString, {
          at: this.state.startLoc
        });
        ++this.state.pos;
      }
    }
    out += this.input.slice(chunkStart, this.state.pos++), this.finishToken(129, out);
  }
  readTemplateContinuation() {
    this.match(8) || this.unexpected(null, 8), this.state.pos--, this.readTemplateToken();
  }
  readTemplateToken() {
    let out = "", chunkStart = this.state.pos, containsInvalid = !1;
    for (++this.state.pos; ;) {
      if (this.state.pos >= this.length) throw this.raise(Errors.UnterminatedTemplate, {
        at: createPositionWithColumnOffset(this.state.startLoc, 1)
      });
      const ch = this.input.charCodeAt(this.state.pos);
      if (96 === ch) return ++this.state.pos, out += this.input.slice(chunkStart, this.state.pos), 
      void this.finishToken(24, containsInvalid ? null : out);
      if (36 === ch && 123 === this.input.charCodeAt(this.state.pos + 1)) return this.state.pos += 2, 
      out += this.input.slice(chunkStart, this.state.pos), void this.finishToken(25, containsInvalid ? null : out);
      if (92 === ch) {
        out += this.input.slice(chunkStart, this.state.pos);
        const escaped = this.readEscapedChar(!0);
        null === escaped ? containsInvalid = !0 : out += escaped, chunkStart = this.state.pos;
      } else if (isNewLine(ch)) {
        switch (out += this.input.slice(chunkStart, this.state.pos), ++this.state.pos, ch) {
         case 13:
          10 === this.input.charCodeAt(this.state.pos) && ++this.state.pos;

         case 10:
          out += "\n";
          break;

         default:
          out += String.fromCharCode(ch);
        }
        ++this.state.curLine, this.state.lineStart = this.state.pos, chunkStart = this.state.pos;
      } else ++this.state.pos;
    }
  }
  recordStrictModeErrors(toParseError, {at}) {
    const index = at.index;
    this.state.strict && !this.state.strictErrors.has(index) ? this.raise(toParseError, {
      at
    }) : this.state.strictErrors.set(index, [ toParseError, at ]);
  }
  readEscapedChar(inTemplate) {
    const throwOnInvalid = !inTemplate, ch = this.input.charCodeAt(++this.state.pos);
    switch (++this.state.pos, ch) {
     case 110:
      return "\n";

     case 114:
      return "\r";

     case 120:
      {
        const code = this.readHexChar(2, !1, throwOnInvalid);
        return null === code ? null : String.fromCharCode(code);
      }

     case 117:
      {
        const code = this.readCodePoint(throwOnInvalid);
        return null === code ? null : String.fromCodePoint(code);
      }

     case 116:
      return "\t";

     case 98:
      return "\b";

     case 118:
      return "\v";

     case 102:
      return "\f";

     case 13:
      10 === this.input.charCodeAt(this.state.pos) && ++this.state.pos;

     case 10:
      this.state.lineStart = this.state.pos, ++this.state.curLine;

     case 8232:
     case 8233:
      return "";

     case 56:
     case 57:
      if (inTemplate) return null;
      this.recordStrictModeErrors(Errors.StrictNumericEscape, {
        at: createPositionWithColumnOffset(this.state.curPosition(), -1)
      });

     default:
      if (ch >= 48 && ch <= 55) {
        const codePos = createPositionWithColumnOffset(this.state.curPosition(), -1);
        let octalStr = this.input.slice(this.state.pos - 1, this.state.pos + 2).match(/^[0-7]+/)[0], octal = parseInt(octalStr, 8);
        octal > 255 && (octalStr = octalStr.slice(0, -1), octal = parseInt(octalStr, 8)), 
        this.state.pos += octalStr.length - 1;
        const next = this.input.charCodeAt(this.state.pos);
        if ("0" !== octalStr || 56 === next || 57 === next) {
          if (inTemplate) return null;
          this.recordStrictModeErrors(Errors.StrictNumericEscape, {
            at: codePos
          });
        }
        return String.fromCharCode(octal);
      }
      return String.fromCharCode(ch);
    }
  }
  readHexChar(len, forceLen, throwOnInvalid) {
    const codeLoc = this.state.curPosition(), n = this.readInt(16, len, forceLen, !1);
    return null === n && (throwOnInvalid ? this.raise(Errors.InvalidEscapeSequence, {
      at: codeLoc
    }) : this.state.pos = codeLoc.index - 1), n;
  }
  readWord1(firstCode) {
    this.state.containsEsc = !1;
    let word = "";
    const start = this.state.pos;
    let chunkStart = this.state.pos;
    for (void 0 !== firstCode && (this.state.pos += firstCode <= 65535 ? 1 : 2); this.state.pos < this.length; ) {
      const ch = this.codePointAtPos(this.state.pos);
      if (isIdentifierChar(ch)) this.state.pos += ch <= 65535 ? 1 : 2; else {
        if (92 !== ch) break;
        {
          this.state.containsEsc = !0, word += this.input.slice(chunkStart, this.state.pos);
          const escStart = this.state.curPosition(), identifierCheck = this.state.pos === start ? isIdentifierStart : isIdentifierChar;
          if (117 !== this.input.charCodeAt(++this.state.pos)) {
            this.raise(Errors.MissingUnicodeEscape, {
              at: this.state.curPosition()
            }), chunkStart = this.state.pos - 1;
            continue;
          }
          ++this.state.pos;
          const esc = this.readCodePoint(!0);
          null !== esc && (identifierCheck(esc) || this.raise(Errors.EscapedCharNotAnIdentifier, {
            at: escStart
          }), word += String.fromCodePoint(esc)), chunkStart = this.state.pos;
        }
      }
    }
    return word + this.input.slice(chunkStart, this.state.pos);
  }
  readWord(firstCode) {
    const word = this.readWord1(firstCode), type = keywords$1.get(word);
    void 0 !== type ? this.finishToken(type, tokenLabelName(type)) : this.finishToken(128, word);
  }
  checkKeywordEscapes() {
    const {type} = this.state;
    tokenIsKeyword(type) && this.state.containsEsc && this.raise(Errors.InvalidEscapedReservedWord, {
      at: this.state.startLoc,
      reservedWord: tokenLabelName(type)
    });
  }
  raise(toParseError, raiseProperties) {
    const {at} = raiseProperties, details = _objectWithoutPropertiesLoose(raiseProperties, _excluded), error = toParseError({
      loc: at instanceof Position ? at : at.loc.start,
      details
    });
    if (!this.options.errorRecovery) throw error;
    return this.isLookahead || this.state.errors.push(error), error;
  }
  raiseOverwrite(toParseError, raiseProperties) {
    const {at} = raiseProperties, details = _objectWithoutPropertiesLoose(raiseProperties, _excluded2), loc = at instanceof Position ? at : at.loc.start, pos = loc.index, errors = this.state.errors;
    for (let i = errors.length - 1; i >= 0; i--) {
      const error = errors[i];
      if (error.loc.index === pos) return errors[i] = toParseError({
        loc,
        details
      });
      if (error.loc.index < pos) break;
    }
    return this.raise(toParseError, raiseProperties);
  }
  updateContext(prevType) {}
  unexpected(loc, type) {
    throw this.raise(Errors.UnexpectedToken, {
      expected: type ? tokenLabelName(type) : null,
      at: null != loc ? loc : this.state.startLoc
    });
  }
  expectPlugin(pluginName, loc) {
    if (this.hasPlugin(pluginName)) return !0;
    throw this.raise(Errors.MissingPlugin, {
      at: null != loc ? loc : this.state.startLoc,
      missingPlugin: [ pluginName ]
    });
  }
  expectOnePlugin(pluginNames) {
    if (!pluginNames.some((name => this.hasPlugin(name)))) throw this.raise(Errors.MissingOneOfPlugins, {
      at: this.state.startLoc,
      missingPlugin: pluginNames
    });
  }
}

class Scope {
  constructor(flags) {
    this.var = new Set, this.lexical = new Set, this.functions = new Set, this.flags = flags;
  }
}

class ScopeHandler {
  constructor(parser, inModule) {
    this.parser = void 0, this.scopeStack = [], this.inModule = void 0, this.undefinedExports = new Map, 
    this.parser = parser, this.inModule = inModule;
  }
  get inFunction() {
    return (2 & this.currentVarScopeFlags()) > 0;
  }
  get allowSuper() {
    return (16 & this.currentThisScopeFlags()) > 0;
  }
  get allowDirectSuper() {
    return (32 & this.currentThisScopeFlags()) > 0;
  }
  get inClass() {
    return (64 & this.currentThisScopeFlags()) > 0;
  }
  get inClassAndNotInNonArrowFunction() {
    const flags = this.currentThisScopeFlags();
    return (64 & flags) > 0 && 0 == (2 & flags);
  }
  get inStaticBlock() {
    for (let i = this.scopeStack.length - 1; ;i--) {
      const {flags} = this.scopeStack[i];
      if (128 & flags) return !0;
      if (323 & flags) return !1;
    }
  }
  get inNonArrowFunction() {
    return (2 & this.currentThisScopeFlags()) > 0;
  }
  get treatFunctionsAsVar() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  }
  createScope(flags) {
    return new Scope(flags);
  }
  enter(flags) {
    this.scopeStack.push(this.createScope(flags));
  }
  exit() {
    this.scopeStack.pop();
  }
  treatFunctionsAsVarInScope(scope) {
    return !!(130 & scope.flags || !this.parser.inModule && 1 & scope.flags);
  }
  declareName(name, bindingType, loc) {
    let scope = this.currentScope();
    if (8 & bindingType || 16 & bindingType) this.checkRedeclarationInScope(scope, name, bindingType, loc), 
    16 & bindingType ? scope.functions.add(name) : scope.lexical.add(name), 8 & bindingType && this.maybeExportDefined(scope, name); else if (4 & bindingType) for (let i = this.scopeStack.length - 1; i >= 0 && (scope = this.scopeStack[i], 
    this.checkRedeclarationInScope(scope, name, bindingType, loc), scope.var.add(name), 
    this.maybeExportDefined(scope, name), !(259 & scope.flags)); --i) ;
    this.parser.inModule && 1 & scope.flags && this.undefinedExports.delete(name);
  }
  maybeExportDefined(scope, name) {
    this.parser.inModule && 1 & scope.flags && this.undefinedExports.delete(name);
  }
  checkRedeclarationInScope(scope, name, bindingType, loc) {
    this.isRedeclaredInScope(scope, name, bindingType) && this.parser.raise(Errors.VarRedeclaration, {
      at: loc,
      identifierName: name
    });
  }
  isRedeclaredInScope(scope, name, bindingType) {
    return !!(1 & bindingType) && (8 & bindingType ? scope.lexical.has(name) || scope.functions.has(name) || scope.var.has(name) : 16 & bindingType ? scope.lexical.has(name) || !this.treatFunctionsAsVarInScope(scope) && scope.var.has(name) : scope.lexical.has(name) && !(8 & scope.flags && scope.lexical.values().next().value === name) || !this.treatFunctionsAsVarInScope(scope) && scope.functions.has(name));
  }
  checkLocalExport(id) {
    const {name} = id, topLevelScope = this.scopeStack[0];
    topLevelScope.lexical.has(name) || topLevelScope.var.has(name) || topLevelScope.functions.has(name) || this.undefinedExports.set(name, id.loc.start);
  }
  currentScope() {
    return this.scopeStack[this.scopeStack.length - 1];
  }
  currentVarScopeFlags() {
    for (let i = this.scopeStack.length - 1; ;i--) {
      const {flags} = this.scopeStack[i];
      if (259 & flags) return flags;
    }
  }
  currentThisScopeFlags() {
    for (let i = this.scopeStack.length - 1; ;i--) {
      const {flags} = this.scopeStack[i];
      if (323 & flags && !(4 & flags)) return flags;
    }
  }
}

class FlowScope extends Scope {
  constructor(...args) {
    super(...args), this.declareFunctions = new Set;
  }
}

class FlowScopeHandler extends ScopeHandler {
  createScope(flags) {
    return new FlowScope(flags);
  }
  declareName(name, bindingType, loc) {
    const scope = this.currentScope();
    if (2048 & bindingType) return this.checkRedeclarationInScope(scope, name, bindingType, loc), 
    this.maybeExportDefined(scope, name), void scope.declareFunctions.add(name);
    super.declareName(...arguments);
  }
  isRedeclaredInScope(scope, name, bindingType) {
    return !!super.isRedeclaredInScope(...arguments) || !!(2048 & bindingType) && (!scope.declareFunctions.has(name) && (scope.lexical.has(name) || scope.functions.has(name)));
  }
  checkLocalExport(id) {
    this.scopeStack[0].declareFunctions.has(id.name) || super.checkLocalExport(id);
  }
}

class ClassScope {
  constructor() {
    this.privateNames = new Set, this.loneAccessors = new Map, this.undefinedPrivateNames = new Map;
  }
}

class ClassScopeHandler {
  constructor(parser) {
    this.parser = void 0, this.stack = [], this.undefinedPrivateNames = new Map, this.parser = parser;
  }
  current() {
    return this.stack[this.stack.length - 1];
  }
  enter() {
    this.stack.push(new ClassScope);
  }
  exit() {
    const oldClassScope = this.stack.pop(), current = this.current();
    for (const [name, loc] of Array.from(oldClassScope.undefinedPrivateNames)) current ? current.undefinedPrivateNames.has(name) || current.undefinedPrivateNames.set(name, loc) : this.parser.raise(Errors.InvalidPrivateFieldResolution, {
      at: loc,
      identifierName: name
    });
  }
  declarePrivateName(name, elementType, loc) {
    const {privateNames, loneAccessors, undefinedPrivateNames} = this.current();
    let redefined = privateNames.has(name);
    if (3 & elementType) {
      const accessor = redefined && loneAccessors.get(name);
      if (accessor) {
        const oldStatic = 4 & accessor, newStatic = 4 & elementType;
        redefined = (3 & accessor) === (3 & elementType) || oldStatic !== newStatic, redefined || loneAccessors.delete(name);
      } else redefined || loneAccessors.set(name, elementType);
    }
    redefined && this.parser.raise(Errors.PrivateNameRedeclaration, {
      at: loc,
      identifierName: name
    }), privateNames.add(name), undefinedPrivateNames.delete(name);
  }
  usePrivateName(name, loc) {
    let classScope;
    for (classScope of this.stack) if (classScope.privateNames.has(name)) return;
    classScope ? classScope.undefinedPrivateNames.set(name, loc) : this.parser.raise(Errors.InvalidPrivateFieldResolution, {
      at: loc,
      identifierName: name
    });
  }
}

const kExpression = 0, kMaybeArrowParameterDeclaration = 1, kMaybeAsyncArrowParameterDeclaration = 2, kParameterDeclaration = 3;

class ExpressionScope {
  constructor(type = 0) {
    this.type = void 0, this.type = type;
  }
  canBeArrowParameterDeclaration() {
    return 2 === this.type || 1 === this.type;
  }
  isCertainlyParameterDeclaration() {
    return 3 === this.type;
  }
}

class ArrowHeadParsingScope extends ExpressionScope {
  constructor(type) {
    super(type), this.declarationErrors = new Map;
  }
  recordDeclarationError(ParsingErrorClass, {at}) {
    const index = at.index;
    this.declarationErrors.set(index, [ ParsingErrorClass, at ]);
  }
  clearDeclarationError(index) {
    this.declarationErrors.delete(index);
  }
  iterateErrors(iterator) {
    this.declarationErrors.forEach(iterator);
  }
}

class ExpressionScopeHandler {
  constructor(parser) {
    this.parser = void 0, this.stack = [ new ExpressionScope ], this.parser = parser;
  }
  enter(scope) {
    this.stack.push(scope);
  }
  exit() {
    this.stack.pop();
  }
  recordParameterInitializerError(toParseError, {at: node}) {
    const origin = {
      at: node.loc.start
    }, {stack} = this;
    let i = stack.length - 1, scope = stack[i];
    for (;!scope.isCertainlyParameterDeclaration(); ) {
      if (!scope.canBeArrowParameterDeclaration()) return;
      scope.recordDeclarationError(toParseError, origin), scope = stack[--i];
    }
    this.parser.raise(toParseError, origin);
  }
  recordParenthesizedIdentifierError({at: node}) {
    const {stack} = this, scope = stack[stack.length - 1], origin = {
      at: node.loc.start
    };
    if (scope.isCertainlyParameterDeclaration()) this.parser.raise(Errors.InvalidParenthesizedAssignment, origin); else {
      if (!scope.canBeArrowParameterDeclaration()) return;
      scope.recordDeclarationError(Errors.InvalidParenthesizedAssignment, origin);
    }
  }
  recordAsyncArrowParametersError({at}) {
    const {stack} = this;
    let i = stack.length - 1, scope = stack[i];
    for (;scope.canBeArrowParameterDeclaration(); ) 2 === scope.type && scope.recordDeclarationError(Errors.AwaitBindingIdentifier, {
      at
    }), scope = stack[--i];
  }
  validateAsPattern() {
    const {stack} = this, currentScope = stack[stack.length - 1];
    currentScope.canBeArrowParameterDeclaration() && currentScope.iterateErrors((([toParseError, loc]) => {
      this.parser.raise(toParseError, {
        at: loc
      });
      let i = stack.length - 2, scope = stack[i];
      for (;scope.canBeArrowParameterDeclaration(); ) scope.clearDeclarationError(loc.index), 
      scope = stack[--i];
    }));
  }
}

function newParameterDeclarationScope() {
  return new ExpressionScope(3);
}

function newArrowHeadScope() {
  return new ArrowHeadParsingScope(1);
}

function newAsyncArrowScope() {
  return new ArrowHeadParsingScope(2);
}

function newExpressionScope() {
  return new ExpressionScope;
}

const PARAM = 0, PARAM_YIELD = 1, PARAM_AWAIT = 2, PARAM_RETURN = 4, PARAM_IN = 8;

class ProductionParameterHandler {
  constructor() {
    this.stacks = [];
  }
  enter(flags) {
    this.stacks.push(flags);
  }
  exit() {
    this.stacks.pop();
  }
  currentFlags() {
    return this.stacks[this.stacks.length - 1];
  }
  get hasAwait() {
    return (2 & this.currentFlags()) > 0;
  }
  get hasYield() {
    return (1 & this.currentFlags()) > 0;
  }
  get hasReturn() {
    return (4 & this.currentFlags()) > 0;
  }
  get hasIn() {
    return (8 & this.currentFlags()) > 0;
  }
}

function functionFlags(isAsync, isGenerator) {
  return (isAsync ? 2 : 0) | (isGenerator ? 1 : 0);
}

class UtilParser extends Tokenizer {
  addExtra(node, key, value, enumerable = !0) {
    if (!node) return;
    const extra = node.extra = node.extra || {};
    enumerable ? extra[key] = value : Object.defineProperty(extra, key, {
      enumerable,
      value
    });
  }
  isContextual(token) {
    return this.state.type === token && !this.state.containsEsc;
  }
  isUnparsedContextual(nameStart, name) {
    const nameEnd = nameStart + name.length;
    if (this.input.slice(nameStart, nameEnd) === name) {
      const nextCh = this.input.charCodeAt(nameEnd);
      return !(isIdentifierChar(nextCh) || 55296 == (64512 & nextCh));
    }
    return !1;
  }
  isLookaheadContextual(name) {
    const next = this.nextTokenStart();
    return this.isUnparsedContextual(next, name);
  }
  eatContextual(token) {
    return !!this.isContextual(token) && (this.next(), !0);
  }
  expectContextual(token, toParseError) {
    if (!this.eatContextual(token)) {
      if (null != toParseError) throw this.raise(toParseError, {
        at: this.state.startLoc
      });
      throw this.unexpected(null, token);
    }
  }
  canInsertSemicolon() {
    return this.match(135) || this.match(8) || this.hasPrecedingLineBreak();
  }
  hasPrecedingLineBreak() {
    return lineBreak.test(this.input.slice(this.state.lastTokEndLoc.index, this.state.start));
  }
  hasFollowingLineBreak() {
    return skipWhiteSpaceToLineBreak.lastIndex = this.state.end, skipWhiteSpaceToLineBreak.test(this.input);
  }
  isLineTerminator() {
    return this.eat(13) || this.canInsertSemicolon();
  }
  semicolon(allowAsi = !0) {
    (allowAsi ? this.isLineTerminator() : this.eat(13)) || this.raise(Errors.MissingSemicolon, {
      at: this.state.lastTokEndLoc
    });
  }
  expect(type, loc) {
    this.eat(type) || this.unexpected(loc, type);
  }
  tryParse(fn, oldState = this.state.clone()) {
    const abortSignal = {
      node: null
    };
    try {
      const node = fn(((node = null) => {
        throw abortSignal.node = node, abortSignal;
      }));
      if (this.state.errors.length > oldState.errors.length) {
        const failState = this.state;
        return this.state = oldState, this.state.tokensLength = failState.tokensLength, 
        {
          node,
          error: failState.errors[oldState.errors.length],
          thrown: !1,
          aborted: !1,
          failState
        };
      }
      return {
        node,
        error: null,
        thrown: !1,
        aborted: !1,
        failState: null
      };
    } catch (error) {
      const failState = this.state;
      if (this.state = oldState, error instanceof SyntaxError) return {
        node: null,
        error,
        thrown: !0,
        aborted: !1,
        failState
      };
      if (error === abortSignal) return {
        node: abortSignal.node,
        error: null,
        thrown: !1,
        aborted: !0,
        failState
      };
      throw error;
    }
  }
  checkExpressionErrors(refExpressionErrors, andThrow) {
    if (!refExpressionErrors) return !1;
    const {shorthandAssignLoc, doubleProtoLoc, privateKeyLoc, optionalParametersLoc} = refExpressionErrors;
    if (!andThrow) return !!(shorthandAssignLoc || doubleProtoLoc || optionalParametersLoc || privateKeyLoc);
    null != shorthandAssignLoc && this.raise(Errors.InvalidCoverInitializedName, {
      at: shorthandAssignLoc
    }), null != doubleProtoLoc && this.raise(Errors.DuplicateProto, {
      at: doubleProtoLoc
    }), null != privateKeyLoc && this.raise(Errors.UnexpectedPrivateField, {
      at: privateKeyLoc
    }), null != optionalParametersLoc && this.unexpected(optionalParametersLoc);
  }
  isLiteralPropertyName() {
    return tokenIsLiteralPropertyName(this.state.type);
  }
  isPrivateName(node) {
    return "PrivateName" === node.type;
  }
  getPrivateNameSV(node) {
    return node.id.name;
  }
  hasPropertyAsPrivateName(node) {
    return ("MemberExpression" === node.type || "OptionalMemberExpression" === node.type) && this.isPrivateName(node.property);
  }
  isOptionalChain(node) {
    return "OptionalMemberExpression" === node.type || "OptionalCallExpression" === node.type;
  }
  isObjectProperty(node) {
    return "ObjectProperty" === node.type;
  }
  isObjectMethod(node) {
    return "ObjectMethod" === node.type;
  }
  initializeScopes(inModule = "module" === this.options.sourceType) {
    const oldLabels = this.state.labels;
    this.state.labels = [];
    const oldExportedIdentifiers = this.exportedIdentifiers;
    this.exportedIdentifiers = new Set;
    const oldInModule = this.inModule;
    this.inModule = inModule;
    const oldScope = this.scope, ScopeHandler = this.getScopeHandler();
    this.scope = new ScopeHandler(this, inModule);
    const oldProdParam = this.prodParam;
    this.prodParam = new ProductionParameterHandler;
    const oldClassScope = this.classScope;
    this.classScope = new ClassScopeHandler(this);
    const oldExpressionScope = this.expressionScope;
    return this.expressionScope = new ExpressionScopeHandler(this), () => {
      this.state.labels = oldLabels, this.exportedIdentifiers = oldExportedIdentifiers, 
      this.inModule = oldInModule, this.scope = oldScope, this.prodParam = oldProdParam, 
      this.classScope = oldClassScope, this.expressionScope = oldExpressionScope;
    };
  }
  enterInitialScopes() {
    let paramFlags = 0;
    this.inModule && (paramFlags |= 2), this.scope.enter(1), this.prodParam.enter(paramFlags);
  }
  checkDestructuringPrivate(refExpressionErrors) {
    const {privateKeyLoc} = refExpressionErrors;
    null !== privateKeyLoc && this.expectPlugin("destructuringPrivate", privateKeyLoc);
  }
}

class ExpressionErrors {
  constructor() {
    this.shorthandAssignLoc = null, this.doubleProtoLoc = null, this.privateKeyLoc = null, 
    this.optionalParametersLoc = null;
  }
}

class Node {
  constructor(parser, pos, loc) {
    this.type = "", this.start = pos, this.end = 0, this.loc = new SourceLocation(loc), 
    null != parser && parser.options.ranges && (this.range = [ pos, 0 ]), null != parser && parser.filename && (this.loc.filename = parser.filename);
  }
}

const NodePrototype = Node.prototype;

function clonePlaceholder(node) {
  return cloneIdentifier(node);
}

function cloneIdentifier(node) {
  const {type, start, end, loc, range, extra, name} = node, cloned = Object.create(NodePrototype);
  return cloned.type = type, cloned.start = start, cloned.end = end, cloned.loc = loc, 
  cloned.range = range, cloned.extra = extra, cloned.name = name, "Placeholder" === type && (cloned.expectedNode = node.expectedNode), 
  cloned;
}

function cloneStringLiteral(node) {
  const {type, start, end, loc, range, extra} = node;
  if ("Placeholder" === type) return clonePlaceholder(node);
  const cloned = Object.create(NodePrototype);
  return cloned.type = type, cloned.start = start, cloned.end = end, cloned.loc = loc, 
  cloned.range = range, void 0 !== node.raw ? cloned.raw = node.raw : cloned.extra = extra, 
  cloned.value = node.value, cloned;
}

NodePrototype.__clone = function() {
  const newNode = new Node, keys = Object.keys(this);
  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i];
    "leadingComments" !== key && "trailingComments" !== key && "innerComments" !== key && (newNode[key] = this[key]);
  }
  return newNode;
};

class NodeUtils extends UtilParser {
  startNode() {
    return new Node(this, this.state.start, this.state.startLoc);
  }
  startNodeAt(pos, loc) {
    return new Node(this, pos, loc);
  }
  startNodeAtNode(type) {
    return this.startNodeAt(type.start, type.loc.start);
  }
  finishNode(node, type) {
    return this.finishNodeAt(node, type, this.state.lastTokEndLoc);
  }
  finishNodeAt(node, type, endLoc) {
    return node.type = type, node.end = endLoc.index, node.loc.end = endLoc, this.options.ranges && (node.range[1] = endLoc.index), 
    this.options.attachComment && this.processComment(node), node;
  }
  resetStartLocation(node, start, startLoc) {
    node.start = start, node.loc.start = startLoc, this.options.ranges && (node.range[0] = start);
  }
  resetEndLocation(node, endLoc = this.state.lastTokEndLoc) {
    node.end = endLoc.index, node.loc.end = endLoc, this.options.ranges && (node.range[1] = endLoc.index);
  }
  resetStartLocationFromNode(node, locationNode) {
    this.resetStartLocation(node, locationNode.start, locationNode.loc.start);
  }
}

const reservedTypes = new Set([ "_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void" ]), FlowErrors = ParseErrorEnum`flow`((_ => ({
  AmbiguousConditionalArrow: _("Ambiguous expression: wrap the arrow functions in parentheses to disambiguate."),
  AmbiguousDeclareModuleKind: _("Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module."),
  AssignReservedType: _((({reservedType}) => `Cannot overwrite reserved type ${reservedType}.`)),
  DeclareClassElement: _("The `declare` modifier can only appear on class fields."),
  DeclareClassFieldInitializer: _("Initializers are not allowed in fields with the `declare` modifier."),
  DuplicateDeclareModuleExports: _("Duplicate `declare module.exports` statement."),
  EnumBooleanMemberNotInitialized: _((({memberName, enumName}) => `Boolean enum members need to be initialized. Use either \`${memberName} = true,\` or \`${memberName} = false,\` in enum \`${enumName}\`.`)),
  EnumDuplicateMemberName: _((({memberName, enumName}) => `Enum member names need to be unique, but the name \`${memberName}\` has already been used before in enum \`${enumName}\`.`)),
  EnumInconsistentMemberValues: _((({enumName}) => `Enum \`${enumName}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`)),
  EnumInvalidExplicitType: _((({invalidEnumType, enumName}) => `Enum type \`${invalidEnumType}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`)),
  EnumInvalidExplicitTypeUnknownSupplied: _((({enumName}) => `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`)),
  EnumInvalidMemberInitializerPrimaryType: _((({enumName, memberName, explicitType}) => `Enum \`${enumName}\` has type \`${explicitType}\`, so the initializer of \`${memberName}\` needs to be a ${explicitType} literal.`)),
  EnumInvalidMemberInitializerSymbolType: _((({enumName, memberName}) => `Symbol enum members cannot be initialized. Use \`${memberName},\` in enum \`${enumName}\`.`)),
  EnumInvalidMemberInitializerUnknownType: _((({enumName, memberName}) => `The enum member initializer for \`${memberName}\` needs to be a literal (either a boolean, number, or string) in enum \`${enumName}\`.`)),
  EnumInvalidMemberName: _((({enumName, memberName, suggestion}) => `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${memberName}\`, consider using \`${suggestion}\`, in enum \`${enumName}\`.`)),
  EnumNumberMemberNotInitialized: _((({enumName, memberName}) => `Number enum members need to be initialized, e.g. \`${memberName} = 1\` in enum \`${enumName}\`.`)),
  EnumStringMemberInconsistentlyInitailized: _((({enumName}) => `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${enumName}\`.`)),
  GetterMayNotHaveThisParam: _("A getter cannot have a `this` parameter."),
  ImportTypeShorthandOnlyInPureImport: _("The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements."),
  InexactInsideExact: _("Explicit inexact syntax cannot appear inside an explicit exact object type."),
  InexactInsideNonObject: _("Explicit inexact syntax cannot appear in class or interface definitions."),
  InexactVariance: _("Explicit inexact syntax cannot have variance."),
  InvalidNonTypeImportInDeclareModule: _("Imports within a `declare module` body must always be `import type` or `import typeof`."),
  MissingTypeParamDefault: _("Type parameter declaration needs a default, since a preceding type parameter declaration has a default."),
  NestedDeclareModule: _("`declare module` cannot be used inside another `declare module`."),
  NestedFlowComment: _("Cannot have a flow comment inside another flow comment."),
  PatternIsOptional: _("A binding pattern parameter cannot be optional in an implementation signature.", {
    reasonCode: "OptionalBindingPattern"
  }),
  SetterMayNotHaveThisParam: _("A setter cannot have a `this` parameter."),
  SpreadVariance: _("Spread properties cannot have variance."),
  ThisParamAnnotationRequired: _("A type annotation is required for the `this` parameter."),
  ThisParamBannedInConstructor: _("Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions."),
  ThisParamMayNotBeOptional: _("The `this` parameter cannot be optional."),
  ThisParamMustBeFirst: _("The `this` parameter must be the first function parameter."),
  ThisParamNoDefault: _("The `this` parameter may not have a default value."),
  TypeBeforeInitializer: _("Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`."),
  TypeCastInPattern: _("The type cast expression is expected to be wrapped with parenthesis."),
  UnexpectedExplicitInexactInObject: _("Explicit inexact syntax must appear at the end of an inexact object."),
  UnexpectedReservedType: _((({reservedType}) => `Unexpected reserved type ${reservedType}.`)),
  UnexpectedReservedUnderscore: _("`_` is only allowed as a type argument to call or new."),
  UnexpectedSpaceBetweenModuloChecks: _("Spaces between `%` and `checks` are not allowed here."),
  UnexpectedSpreadType: _("Spread operator cannot appear in class or interface definitions."),
  UnexpectedSubtractionOperand: _('Unexpected token, expected "number" or "bigint".'),
  UnexpectedTokenAfterTypeParameter: _("Expected an arrow function after this type parameter declaration."),
  UnexpectedTypeParameterBeforeAsyncArrowFunction: _("Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`."),
  UnsupportedDeclareExportKind: _((({unsupportedExportKind, suggestion}) => `\`declare export ${unsupportedExportKind}\` is not supported. Use \`${suggestion}\` instead.`)),
  UnsupportedStatementInDeclareModule: _("Only declares and type imports are allowed inside declare module."),
  UnterminatedFlowComment: _("Unterminated flow-comment.")
})));

function isEsModuleType(bodyElement) {
  return "DeclareExportAllDeclaration" === bodyElement.type || "DeclareExportDeclaration" === bodyElement.type && (!bodyElement.declaration || "TypeAlias" !== bodyElement.declaration.type && "InterfaceDeclaration" !== bodyElement.declaration.type);
}

function hasTypeImportKind(node) {
  return "type" === node.importKind || "typeof" === node.importKind;
}

function isMaybeDefaultImport(type) {
  return tokenIsKeywordOrIdentifier(type) && 97 !== type;
}

const exportSuggestions = {
  const: "declare export var",
  let: "declare export var",
  type: "export type",
  interface: "export interface"
};

function partition(list, test) {
  const list1 = [], list2 = [];
  for (let i = 0; i < list.length; i++) (test(list[i], i, list) ? list1 : list2).push(list[i]);
  return [ list1, list2 ];
}

const FLOW_PRAGMA_REGEX = /\*?\s*@((?:no)?flow)\b/;

var flow = superClass => class extends superClass {
  constructor(...args) {
    super(...args), this.flowPragma = void 0;
  }
  getScopeHandler() {
    return FlowScopeHandler;
  }
  shouldParseTypes() {
    return this.getPluginOption("flow", "all") || "flow" === this.flowPragma;
  }
  shouldParseEnums() {
    return !!this.getPluginOption("flow", "enums");
  }
  finishToken(type, val) {
    return 129 !== type && 13 !== type && 28 !== type && void 0 === this.flowPragma && (this.flowPragma = null), 
    super.finishToken(type, val);
  }
  addComment(comment) {
    if (void 0 === this.flowPragma) {
      const matches = FLOW_PRAGMA_REGEX.exec(comment.value);
      if (matches) if ("flow" === matches[1]) this.flowPragma = "flow"; else {
        if ("noflow" !== matches[1]) throw new Error("Unexpected flow pragma");
        this.flowPragma = "noflow";
      } else ;
    }
    return super.addComment(comment);
  }
  flowParseTypeInitialiser(tok) {
    const oldInType = this.state.inType;
    this.state.inType = !0, this.expect(tok || 14);
    const type = this.flowParseType();
    return this.state.inType = oldInType, type;
  }
  flowParsePredicate() {
    const node = this.startNode(), moduloLoc = this.state.startLoc;
    return this.next(), this.expectContextual(107), this.state.lastTokStart > moduloLoc.index + 1 && this.raise(FlowErrors.UnexpectedSpaceBetweenModuloChecks, {
      at: moduloLoc
    }), this.eat(10) ? (node.value = this.parseExpression(), this.expect(11), this.finishNode(node, "DeclaredPredicate")) : this.finishNode(node, "InferredPredicate");
  }
  flowParseTypeAndPredicateInitialiser() {
    const oldInType = this.state.inType;
    this.state.inType = !0, this.expect(14);
    let type = null, predicate = null;
    return this.match(54) ? (this.state.inType = oldInType, predicate = this.flowParsePredicate()) : (type = this.flowParseType(), 
    this.state.inType = oldInType, this.match(54) && (predicate = this.flowParsePredicate())), 
    [ type, predicate ];
  }
  flowParseDeclareClass(node) {
    return this.next(), this.flowParseInterfaceish(node, !0), this.finishNode(node, "DeclareClass");
  }
  flowParseDeclareFunction(node) {
    this.next();
    const id = node.id = this.parseIdentifier(), typeNode = this.startNode(), typeContainer = this.startNode();
    this.match(47) ? typeNode.typeParameters = this.flowParseTypeParameterDeclaration() : typeNode.typeParameters = null, 
    this.expect(10);
    const tmp = this.flowParseFunctionTypeParams();
    return typeNode.params = tmp.params, typeNode.rest = tmp.rest, typeNode.this = tmp._this, 
    this.expect(11), [typeNode.returnType, node.predicate] = this.flowParseTypeAndPredicateInitialiser(), 
    typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation"), 
    id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation"), this.resetEndLocation(id), 
    this.semicolon(), this.scope.declareName(node.id.name, 2048, node.id.loc.start), 
    this.finishNode(node, "DeclareFunction");
  }
  flowParseDeclare(node, insideModule) {
    if (this.match(80)) return this.flowParseDeclareClass(node);
    if (this.match(68)) return this.flowParseDeclareFunction(node);
    if (this.match(74)) return this.flowParseDeclareVariable(node);
    if (this.eatContextual(123)) return this.match(16) ? this.flowParseDeclareModuleExports(node) : (insideModule && this.raise(FlowErrors.NestedDeclareModule, {
      at: this.state.lastTokStartLoc
    }), this.flowParseDeclareModule(node));
    if (this.isContextual(126)) return this.flowParseDeclareTypeAlias(node);
    if (this.isContextual(127)) return this.flowParseDeclareOpaqueType(node);
    if (this.isContextual(125)) return this.flowParseDeclareInterface(node);
    if (this.match(82)) return this.flowParseDeclareExportDeclaration(node, insideModule);
    throw this.unexpected();
  }
  flowParseDeclareVariable(node) {
    return this.next(), node.id = this.flowParseTypeAnnotatableIdentifier(!0), this.scope.declareName(node.id.name, 5, node.id.loc.start), 
    this.semicolon(), this.finishNode(node, "DeclareVariable");
  }
  flowParseDeclareModule(node) {
    this.scope.enter(0), this.match(129) ? node.id = this.parseExprAtom() : node.id = this.parseIdentifier();
    const bodyNode = node.body = this.startNode(), body = bodyNode.body = [];
    for (this.expect(5); !this.match(8); ) {
      let bodyNode = this.startNode();
      this.match(83) ? (this.next(), this.isContextual(126) || this.match(87) || this.raise(FlowErrors.InvalidNonTypeImportInDeclareModule, {
        at: this.state.lastTokStartLoc
      }), this.parseImport(bodyNode)) : (this.expectContextual(121, FlowErrors.UnsupportedStatementInDeclareModule), 
      bodyNode = this.flowParseDeclare(bodyNode, !0)), body.push(bodyNode);
    }
    this.scope.exit(), this.expect(8), this.finishNode(bodyNode, "BlockStatement");
    let kind = null, hasModuleExport = !1;
    return body.forEach((bodyElement => {
      isEsModuleType(bodyElement) ? ("CommonJS" === kind && this.raise(FlowErrors.AmbiguousDeclareModuleKind, {
        at: bodyElement
      }), kind = "ES") : "DeclareModuleExports" === bodyElement.type && (hasModuleExport && this.raise(FlowErrors.DuplicateDeclareModuleExports, {
        at: bodyElement
      }), "ES" === kind && this.raise(FlowErrors.AmbiguousDeclareModuleKind, {
        at: bodyElement
      }), kind = "CommonJS", hasModuleExport = !0);
    })), node.kind = kind || "CommonJS", this.finishNode(node, "DeclareModule");
  }
  flowParseDeclareExportDeclaration(node, insideModule) {
    if (this.expect(82), this.eat(65)) return this.match(68) || this.match(80) ? node.declaration = this.flowParseDeclare(this.startNode()) : (node.declaration = this.flowParseType(), 
    this.semicolon()), node.default = !0, this.finishNode(node, "DeclareExportDeclaration");
    if (this.match(75) || this.isLet() || (this.isContextual(126) || this.isContextual(125)) && !insideModule) {
      const label = this.state.value;
      throw this.raise(FlowErrors.UnsupportedDeclareExportKind, {
        at: this.state.startLoc,
        unsupportedExportKind: label,
        suggestion: exportSuggestions[label]
      });
    }
    if (this.match(74) || this.match(68) || this.match(80) || this.isContextual(127)) return node.declaration = this.flowParseDeclare(this.startNode()), 
    node.default = !1, this.finishNode(node, "DeclareExportDeclaration");
    if (this.match(55) || this.match(5) || this.isContextual(125) || this.isContextual(126) || this.isContextual(127)) return "ExportNamedDeclaration" === (node = this.parseExport(node)).type && (node.type = "ExportDeclaration", 
    node.default = !1, delete node.exportKind), node.type = "Declare" + node.type, node;
    throw this.unexpected();
  }
  flowParseDeclareModuleExports(node) {
    return this.next(), this.expectContextual(108), node.typeAnnotation = this.flowParseTypeAnnotation(), 
    this.semicolon(), this.finishNode(node, "DeclareModuleExports");
  }
  flowParseDeclareTypeAlias(node) {
    return this.next(), this.flowParseTypeAlias(node), node.type = "DeclareTypeAlias", 
    node;
  }
  flowParseDeclareOpaqueType(node) {
    return this.next(), this.flowParseOpaqueType(node, !0), node.type = "DeclareOpaqueType", 
    node;
  }
  flowParseDeclareInterface(node) {
    return this.next(), this.flowParseInterfaceish(node), this.finishNode(node, "DeclareInterface");
  }
  flowParseInterfaceish(node, isClass = !1) {
    if (node.id = this.flowParseRestrictedIdentifier(!isClass, !0), this.scope.declareName(node.id.name, isClass ? 17 : 9, node.id.loc.start), 
    this.match(47) ? node.typeParameters = this.flowParseTypeParameterDeclaration() : node.typeParameters = null, 
    node.extends = [], node.implements = [], node.mixins = [], this.eat(81)) do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (!isClass && this.eat(12));
    if (this.isContextual(114)) {
      this.next();
      do {
        node.mixins.push(this.flowParseInterfaceExtends());
      } while (this.eat(12));
    }
    if (this.isContextual(110)) {
      this.next();
      do {
        node.implements.push(this.flowParseInterfaceExtends());
      } while (this.eat(12));
    }
    node.body = this.flowParseObjectType({
      allowStatic: isClass,
      allowExact: !1,
      allowSpread: !1,
      allowProto: isClass,
      allowInexact: !1
    });
  }
  flowParseInterfaceExtends() {
    const node = this.startNode();
    return node.id = this.flowParseQualifiedTypeIdentifier(), this.match(47) ? node.typeParameters = this.flowParseTypeParameterInstantiation() : node.typeParameters = null, 
    this.finishNode(node, "InterfaceExtends");
  }
  flowParseInterface(node) {
    return this.flowParseInterfaceish(node), this.finishNode(node, "InterfaceDeclaration");
  }
  checkNotUnderscore(word) {
    "_" === word && this.raise(FlowErrors.UnexpectedReservedUnderscore, {
      at: this.state.startLoc
    });
  }
  checkReservedType(word, startLoc, declaration) {
    reservedTypes.has(word) && this.raise(declaration ? FlowErrors.AssignReservedType : FlowErrors.UnexpectedReservedType, {
      at: startLoc,
      reservedType: word
    });
  }
  flowParseRestrictedIdentifier(liberal, declaration) {
    return this.checkReservedType(this.state.value, this.state.startLoc, declaration), 
    this.parseIdentifier(liberal);
  }
  flowParseTypeAlias(node) {
    return node.id = this.flowParseRestrictedIdentifier(!1, !0), this.scope.declareName(node.id.name, 9, node.id.loc.start), 
    this.match(47) ? node.typeParameters = this.flowParseTypeParameterDeclaration() : node.typeParameters = null, 
    node.right = this.flowParseTypeInitialiser(29), this.semicolon(), this.finishNode(node, "TypeAlias");
  }
  flowParseOpaqueType(node, declare) {
    return this.expectContextual(126), node.id = this.flowParseRestrictedIdentifier(!0, !0), 
    this.scope.declareName(node.id.name, 9, node.id.loc.start), this.match(47) ? node.typeParameters = this.flowParseTypeParameterDeclaration() : node.typeParameters = null, 
    node.supertype = null, this.match(14) && (node.supertype = this.flowParseTypeInitialiser(14)), 
    node.impltype = null, declare || (node.impltype = this.flowParseTypeInitialiser(29)), 
    this.semicolon(), this.finishNode(node, "OpaqueType");
  }
  flowParseTypeParameter(requireDefault = !1) {
    const nodeStartLoc = this.state.startLoc, node = this.startNode(), variance = this.flowParseVariance(), ident = this.flowParseTypeAnnotatableIdentifier();
    return node.name = ident.name, node.variance = variance, node.bound = ident.typeAnnotation, 
    this.match(29) ? (this.eat(29), node.default = this.flowParseType()) : requireDefault && this.raise(FlowErrors.MissingTypeParamDefault, {
      at: nodeStartLoc
    }), this.finishNode(node, "TypeParameter");
  }
  flowParseTypeParameterDeclaration() {
    const oldInType = this.state.inType, node = this.startNode();
    node.params = [], this.state.inType = !0, this.match(47) || this.match(138) ? this.next() : this.unexpected();
    let defaultRequired = !1;
    do {
      const typeParameter = this.flowParseTypeParameter(defaultRequired);
      node.params.push(typeParameter), typeParameter.default && (defaultRequired = !0), 
      this.match(48) || this.expect(12);
    } while (!this.match(48));
    return this.expect(48), this.state.inType = oldInType, this.finishNode(node, "TypeParameterDeclaration");
  }
  flowParseTypeParameterInstantiation() {
    const node = this.startNode(), oldInType = this.state.inType;
    node.params = [], this.state.inType = !0, this.expect(47);
    const oldNoAnonFunctionType = this.state.noAnonFunctionType;
    for (this.state.noAnonFunctionType = !1; !this.match(48); ) node.params.push(this.flowParseType()), 
    this.match(48) || this.expect(12);
    return this.state.noAnonFunctionType = oldNoAnonFunctionType, this.expect(48), this.state.inType = oldInType, 
    this.finishNode(node, "TypeParameterInstantiation");
  }
  flowParseTypeParameterInstantiationCallOrNew() {
    const node = this.startNode(), oldInType = this.state.inType;
    for (node.params = [], this.state.inType = !0, this.expect(47); !this.match(48); ) node.params.push(this.flowParseTypeOrImplicitInstantiation()), 
    this.match(48) || this.expect(12);
    return this.expect(48), this.state.inType = oldInType, this.finishNode(node, "TypeParameterInstantiation");
  }
  flowParseInterfaceType() {
    const node = this.startNode();
    if (this.expectContextual(125), node.extends = [], this.eat(81)) do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (this.eat(12));
    return node.body = this.flowParseObjectType({
      allowStatic: !1,
      allowExact: !1,
      allowSpread: !1,
      allowProto: !1,
      allowInexact: !1
    }), this.finishNode(node, "InterfaceTypeAnnotation");
  }
  flowParseObjectPropertyKey() {
    return this.match(130) || this.match(129) ? this.parseExprAtom() : this.parseIdentifier(!0);
  }
  flowParseObjectTypeIndexer(node, isStatic, variance) {
    return node.static = isStatic, 14 === this.lookahead().type ? (node.id = this.flowParseObjectPropertyKey(), 
    node.key = this.flowParseTypeInitialiser()) : (node.id = null, node.key = this.flowParseType()), 
    this.expect(3), node.value = this.flowParseTypeInitialiser(), node.variance = variance, 
    this.finishNode(node, "ObjectTypeIndexer");
  }
  flowParseObjectTypeInternalSlot(node, isStatic) {
    return node.static = isStatic, node.id = this.flowParseObjectPropertyKey(), this.expect(3), 
    this.expect(3), this.match(47) || this.match(10) ? (node.method = !0, node.optional = !1, 
    node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.start, node.loc.start))) : (node.method = !1, 
    this.eat(17) && (node.optional = !0), node.value = this.flowParseTypeInitialiser()), 
    this.finishNode(node, "ObjectTypeInternalSlot");
  }
  flowParseObjectTypeMethodish(node) {
    for (node.params = [], node.rest = null, node.typeParameters = null, node.this = null, 
    this.match(47) && (node.typeParameters = this.flowParseTypeParameterDeclaration()), 
    this.expect(10), this.match(78) && (node.this = this.flowParseFunctionTypeParam(!0), 
    node.this.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); ) node.params.push(this.flowParseFunctionTypeParam(!1)), 
    this.match(11) || this.expect(12);
    return this.eat(21) && (node.rest = this.flowParseFunctionTypeParam(!1)), this.expect(11), 
    node.returnType = this.flowParseTypeInitialiser(), this.finishNode(node, "FunctionTypeAnnotation");
  }
  flowParseObjectTypeCallProperty(node, isStatic) {
    const valueNode = this.startNode();
    return node.static = isStatic, node.value = this.flowParseObjectTypeMethodish(valueNode), 
    this.finishNode(node, "ObjectTypeCallProperty");
  }
  flowParseObjectType({allowStatic, allowExact, allowSpread, allowProto, allowInexact}) {
    const oldInType = this.state.inType;
    this.state.inType = !0;
    const nodeStart = this.startNode();
    let endDelim, exact;
    nodeStart.callProperties = [], nodeStart.properties = [], nodeStart.indexers = [], 
    nodeStart.internalSlots = [];
    let inexact = !1;
    for (allowExact && this.match(6) ? (this.expect(6), endDelim = 9, exact = !0) : (this.expect(5), 
    endDelim = 8, exact = !1), nodeStart.exact = exact; !this.match(endDelim); ) {
      let isStatic = !1, protoStartLoc = null, inexactStartLoc = null;
      const node = this.startNode();
      if (allowProto && this.isContextual(115)) {
        const lookahead = this.lookahead();
        14 !== lookahead.type && 17 !== lookahead.type && (this.next(), protoStartLoc = this.state.startLoc, 
        allowStatic = !1);
      }
      if (allowStatic && this.isContextual(104)) {
        const lookahead = this.lookahead();
        14 !== lookahead.type && 17 !== lookahead.type && (this.next(), isStatic = !0);
      }
      const variance = this.flowParseVariance();
      if (this.eat(0)) null != protoStartLoc && this.unexpected(protoStartLoc), this.eat(0) ? (variance && this.unexpected(variance.loc.start), 
      nodeStart.internalSlots.push(this.flowParseObjectTypeInternalSlot(node, isStatic))) : nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic, variance)); else if (this.match(10) || this.match(47)) null != protoStartLoc && this.unexpected(protoStartLoc), 
      variance && this.unexpected(variance.loc.start), nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, isStatic)); else {
        let kind = "init";
        if (this.isContextual(98) || this.isContextual(103)) {
          tokenIsLiteralPropertyName(this.lookahead().type) && (kind = this.state.value, this.next());
        }
        const propOrInexact = this.flowParseObjectTypeProperty(node, isStatic, protoStartLoc, variance, kind, allowSpread, null != allowInexact ? allowInexact : !exact);
        null === propOrInexact ? (inexact = !0, inexactStartLoc = this.state.lastTokStartLoc) : nodeStart.properties.push(propOrInexact);
      }
      this.flowObjectTypeSemicolon(), !inexactStartLoc || this.match(8) || this.match(9) || this.raise(FlowErrors.UnexpectedExplicitInexactInObject, {
        at: inexactStartLoc
      });
    }
    this.expect(endDelim), allowSpread && (nodeStart.inexact = inexact);
    const out = this.finishNode(nodeStart, "ObjectTypeAnnotation");
    return this.state.inType = oldInType, out;
  }
  flowParseObjectTypeProperty(node, isStatic, protoStartLoc, variance, kind, allowSpread, allowInexact) {
    if (this.eat(21)) {
      return this.match(12) || this.match(13) || this.match(8) || this.match(9) ? (allowSpread ? allowInexact || this.raise(FlowErrors.InexactInsideExact, {
        at: this.state.lastTokStartLoc
      }) : this.raise(FlowErrors.InexactInsideNonObject, {
        at: this.state.lastTokStartLoc
      }), variance && this.raise(FlowErrors.InexactVariance, {
        at: variance
      }), null) : (allowSpread || this.raise(FlowErrors.UnexpectedSpreadType, {
        at: this.state.lastTokStartLoc
      }), null != protoStartLoc && this.unexpected(protoStartLoc), variance && this.raise(FlowErrors.SpreadVariance, {
        at: variance
      }), node.argument = this.flowParseType(), this.finishNode(node, "ObjectTypeSpreadProperty"));
    }
    {
      node.key = this.flowParseObjectPropertyKey(), node.static = isStatic, node.proto = null != protoStartLoc, 
      node.kind = kind;
      let optional = !1;
      return this.match(47) || this.match(10) ? (node.method = !0, null != protoStartLoc && this.unexpected(protoStartLoc), 
      variance && this.unexpected(variance.loc.start), node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.start, node.loc.start)), 
      "get" !== kind && "set" !== kind || this.flowCheckGetterSetterParams(node), !allowSpread && "constructor" === node.key.name && node.value.this && this.raise(FlowErrors.ThisParamBannedInConstructor, {
        at: node.value.this
      })) : ("init" !== kind && this.unexpected(), node.method = !1, this.eat(17) && (optional = !0), 
      node.value = this.flowParseTypeInitialiser(), node.variance = variance), node.optional = optional, 
      this.finishNode(node, "ObjectTypeProperty");
    }
  }
  flowCheckGetterSetterParams(property) {
    const paramCount = "get" === property.kind ? 0 : 1, length = property.value.params.length + (property.value.rest ? 1 : 0);
    property.value.this && this.raise("get" === property.kind ? FlowErrors.GetterMayNotHaveThisParam : FlowErrors.SetterMayNotHaveThisParam, {
      at: property.value.this
    }), length !== paramCount && this.raise("get" === property.kind ? Errors.BadGetterArity : Errors.BadSetterArity, {
      at: property
    }), "set" === property.kind && property.value.rest && this.raise(Errors.BadSetterRestParameter, {
      at: property
    });
  }
  flowObjectTypeSemicolon() {
    this.eat(13) || this.eat(12) || this.match(8) || this.match(9) || this.unexpected();
  }
  flowParseQualifiedTypeIdentifier(startPos, startLoc, id) {
    startPos = startPos || this.state.start, startLoc = startLoc || this.state.startLoc;
    let node = id || this.flowParseRestrictedIdentifier(!0);
    for (;this.eat(16); ) {
      const node2 = this.startNodeAt(startPos, startLoc);
      node2.qualification = node, node2.id = this.flowParseRestrictedIdentifier(!0), node = this.finishNode(node2, "QualifiedTypeIdentifier");
    }
    return node;
  }
  flowParseGenericType(startPos, startLoc, id) {
    const node = this.startNodeAt(startPos, startLoc);
    return node.typeParameters = null, node.id = this.flowParseQualifiedTypeIdentifier(startPos, startLoc, id), 
    this.match(47) && (node.typeParameters = this.flowParseTypeParameterInstantiation()), 
    this.finishNode(node, "GenericTypeAnnotation");
  }
  flowParseTypeofType() {
    const node = this.startNode();
    return this.expect(87), node.argument = this.flowParsePrimaryType(), this.finishNode(node, "TypeofTypeAnnotation");
  }
  flowParseTupleType() {
    const node = this.startNode();
    for (node.types = [], this.expect(0); this.state.pos < this.length && !this.match(3) && (node.types.push(this.flowParseType()), 
    !this.match(3)); ) this.expect(12);
    return this.expect(3), this.finishNode(node, "TupleTypeAnnotation");
  }
  flowParseFunctionTypeParam(first) {
    let name = null, optional = !1, typeAnnotation = null;
    const node = this.startNode(), lh = this.lookahead(), isThis = 78 === this.state.type;
    return 14 === lh.type || 17 === lh.type ? (isThis && !first && this.raise(FlowErrors.ThisParamMustBeFirst, {
      at: node
    }), name = this.parseIdentifier(isThis), this.eat(17) && (optional = !0, isThis && this.raise(FlowErrors.ThisParamMayNotBeOptional, {
      at: node
    })), typeAnnotation = this.flowParseTypeInitialiser()) : typeAnnotation = this.flowParseType(), 
    node.name = name, node.optional = optional, node.typeAnnotation = typeAnnotation, 
    this.finishNode(node, "FunctionTypeParam");
  }
  reinterpretTypeAsFunctionTypeParam(type) {
    const node = this.startNodeAt(type.start, type.loc.start);
    return node.name = null, node.optional = !1, node.typeAnnotation = type, this.finishNode(node, "FunctionTypeParam");
  }
  flowParseFunctionTypeParams(params = []) {
    let rest = null, _this = null;
    for (this.match(78) && (_this = this.flowParseFunctionTypeParam(!0), _this.name = null, 
    this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); ) params.push(this.flowParseFunctionTypeParam(!1)), 
    this.match(11) || this.expect(12);
    return this.eat(21) && (rest = this.flowParseFunctionTypeParam(!1)), {
      params,
      rest,
      _this
    };
  }
  flowIdentToTypeAnnotation(startPos, startLoc, node, id) {
    switch (id.name) {
     case "any":
      return this.finishNode(node, "AnyTypeAnnotation");

     case "bool":
     case "boolean":
      return this.finishNode(node, "BooleanTypeAnnotation");

     case "mixed":
      return this.finishNode(node, "MixedTypeAnnotation");

     case "empty":
      return this.finishNode(node, "EmptyTypeAnnotation");

     case "number":
      return this.finishNode(node, "NumberTypeAnnotation");

     case "string":
      return this.finishNode(node, "StringTypeAnnotation");

     case "symbol":
      return this.finishNode(node, "SymbolTypeAnnotation");

     default:
      return this.checkNotUnderscore(id.name), this.flowParseGenericType(startPos, startLoc, id);
    }
  }
  flowParsePrimaryType() {
    const startPos = this.state.start, startLoc = this.state.startLoc, node = this.startNode();
    let tmp, type, isGroupedType = !1;
    const oldNoAnonFunctionType = this.state.noAnonFunctionType;
    switch (this.state.type) {
     case 5:
      return this.flowParseObjectType({
        allowStatic: !1,
        allowExact: !1,
        allowSpread: !0,
        allowProto: !1,
        allowInexact: !0
      });

     case 6:
      return this.flowParseObjectType({
        allowStatic: !1,
        allowExact: !0,
        allowSpread: !0,
        allowProto: !1,
        allowInexact: !1
      });

     case 0:
      return this.state.noAnonFunctionType = !1, type = this.flowParseTupleType(), this.state.noAnonFunctionType = oldNoAnonFunctionType, 
      type;

     case 47:
      return node.typeParameters = this.flowParseTypeParameterDeclaration(), this.expect(10), 
      tmp = this.flowParseFunctionTypeParams(), node.params = tmp.params, node.rest = tmp.rest, 
      node.this = tmp._this, this.expect(11), this.expect(19), node.returnType = this.flowParseType(), 
      this.finishNode(node, "FunctionTypeAnnotation");

     case 10:
      if (this.next(), !this.match(11) && !this.match(21)) if (tokenIsIdentifier(this.state.type) || this.match(78)) {
        const token = this.lookahead().type;
        isGroupedType = 17 !== token && 14 !== token;
      } else isGroupedType = !0;
      if (isGroupedType) {
        if (this.state.noAnonFunctionType = !1, type = this.flowParseType(), this.state.noAnonFunctionType = oldNoAnonFunctionType, 
        this.state.noAnonFunctionType || !(this.match(12) || this.match(11) && 19 === this.lookahead().type)) return this.expect(11), 
        type;
        this.eat(12);
      }
      return tmp = type ? this.flowParseFunctionTypeParams([ this.reinterpretTypeAsFunctionTypeParam(type) ]) : this.flowParseFunctionTypeParams(), 
      node.params = tmp.params, node.rest = tmp.rest, node.this = tmp._this, this.expect(11), 
      this.expect(19), node.returnType = this.flowParseType(), node.typeParameters = null, 
      this.finishNode(node, "FunctionTypeAnnotation");

     case 129:
      return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");

     case 85:
     case 86:
      return node.value = this.match(85), this.next(), this.finishNode(node, "BooleanLiteralTypeAnnotation");

     case 53:
      if ("-" === this.state.value) {
        if (this.next(), this.match(130)) return this.parseLiteralAtNode(-this.state.value, "NumberLiteralTypeAnnotation", node);
        if (this.match(131)) return this.parseLiteralAtNode(-this.state.value, "BigIntLiteralTypeAnnotation", node);
        throw this.raise(FlowErrors.UnexpectedSubtractionOperand, {
          at: this.state.startLoc
        });
      }
      throw this.unexpected();

     case 130:
      return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");

     case 131:
      return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");

     case 88:
      return this.next(), this.finishNode(node, "VoidTypeAnnotation");

     case 84:
      return this.next(), this.finishNode(node, "NullLiteralTypeAnnotation");

     case 78:
      return this.next(), this.finishNode(node, "ThisTypeAnnotation");

     case 55:
      return this.next(), this.finishNode(node, "ExistsTypeAnnotation");

     case 87:
      return this.flowParseTypeofType();

     default:
      if (tokenIsKeyword(this.state.type)) {
        const label = tokenLabelName(this.state.type);
        return this.next(), super.createIdentifier(node, label);
      }
      if (tokenIsIdentifier(this.state.type)) return this.isContextual(125) ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdentifier());
    }
    throw this.unexpected();
  }
  flowParsePostfixType() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let type = this.flowParsePrimaryType(), seenOptionalIndexedAccess = !1;
    for (;(this.match(0) || this.match(18)) && !this.canInsertSemicolon(); ) {
      const node = this.startNodeAt(startPos, startLoc), optional = this.eat(18);
      seenOptionalIndexedAccess = seenOptionalIndexedAccess || optional, this.expect(0), 
      !optional && this.match(3) ? (node.elementType = type, this.next(), type = this.finishNode(node, "ArrayTypeAnnotation")) : (node.objectType = type, 
      node.indexType = this.flowParseType(), this.expect(3), seenOptionalIndexedAccess ? (node.optional = optional, 
      type = this.finishNode(node, "OptionalIndexedAccessType")) : type = this.finishNode(node, "IndexedAccessType"));
    }
    return type;
  }
  flowParsePrefixType() {
    const node = this.startNode();
    return this.eat(17) ? (node.typeAnnotation = this.flowParsePrefixType(), this.finishNode(node, "NullableTypeAnnotation")) : this.flowParsePostfixType();
  }
  flowParseAnonFunctionWithoutParens() {
    const param = this.flowParsePrefixType();
    if (!this.state.noAnonFunctionType && this.eat(19)) {
      const node = this.startNodeAt(param.start, param.loc.start);
      return node.params = [ this.reinterpretTypeAsFunctionTypeParam(param) ], node.rest = null, 
      node.this = null, node.returnType = this.flowParseType(), node.typeParameters = null, 
      this.finishNode(node, "FunctionTypeAnnotation");
    }
    return param;
  }
  flowParseIntersectionType() {
    const node = this.startNode();
    this.eat(45);
    const type = this.flowParseAnonFunctionWithoutParens();
    for (node.types = [ type ]; this.eat(45); ) node.types.push(this.flowParseAnonFunctionWithoutParens());
    return 1 === node.types.length ? type : this.finishNode(node, "IntersectionTypeAnnotation");
  }
  flowParseUnionType() {
    const node = this.startNode();
    this.eat(43);
    const type = this.flowParseIntersectionType();
    for (node.types = [ type ]; this.eat(43); ) node.types.push(this.flowParseIntersectionType());
    return 1 === node.types.length ? type : this.finishNode(node, "UnionTypeAnnotation");
  }
  flowParseType() {
    const oldInType = this.state.inType;
    this.state.inType = !0;
    const type = this.flowParseUnionType();
    return this.state.inType = oldInType, type;
  }
  flowParseTypeOrImplicitInstantiation() {
    if (128 === this.state.type && "_" === this.state.value) {
      const startPos = this.state.start, startLoc = this.state.startLoc, node = this.parseIdentifier();
      return this.flowParseGenericType(startPos, startLoc, node);
    }
    return this.flowParseType();
  }
  flowParseTypeAnnotation() {
    const node = this.startNode();
    return node.typeAnnotation = this.flowParseTypeInitialiser(), this.finishNode(node, "TypeAnnotation");
  }
  flowParseTypeAnnotatableIdentifier(allowPrimitiveOverride) {
    const ident = allowPrimitiveOverride ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();
    return this.match(14) && (ident.typeAnnotation = this.flowParseTypeAnnotation(), 
    this.resetEndLocation(ident)), ident;
  }
  typeCastToParameter(node) {
    return node.expression.typeAnnotation = node.typeAnnotation, this.resetEndLocation(node.expression, node.typeAnnotation.loc.end), 
    node.expression;
  }
  flowParseVariance() {
    let variance = null;
    return this.match(53) && (variance = this.startNode(), "+" === this.state.value ? variance.kind = "plus" : variance.kind = "minus", 
    this.next(), this.finishNode(variance, "Variance")), variance;
  }
  parseFunctionBody(node, allowExpressionBody, isMethod = !1) {
    return allowExpressionBody ? this.forwardNoArrowParamsConversionAt(node, (() => super.parseFunctionBody(node, !0, isMethod))) : super.parseFunctionBody(node, !1, isMethod);
  }
  parseFunctionBodyAndFinish(node, type, isMethod = !1) {
    if (this.match(14)) {
      const typeNode = this.startNode();
      [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser(), 
      node.returnType = typeNode.typeAnnotation ? this.finishNode(typeNode, "TypeAnnotation") : null;
    }
    super.parseFunctionBodyAndFinish(node, type, isMethod);
  }
  parseStatement(context, topLevel) {
    if (this.state.strict && this.isContextual(125)) {
      if (tokenIsKeywordOrIdentifier(this.lookahead().type)) {
        const node = this.startNode();
        return this.next(), this.flowParseInterface(node);
      }
    } else if (this.shouldParseEnums() && this.isContextual(122)) {
      const node = this.startNode();
      return this.next(), this.flowParseEnumDeclaration(node);
    }
    const stmt = super.parseStatement(context, topLevel);
    return void 0 !== this.flowPragma || this.isValidDirective(stmt) || (this.flowPragma = null), 
    stmt;
  }
  parseExpressionStatement(node, expr) {
    if ("Identifier" === expr.type) if ("declare" === expr.name) {
      if (this.match(80) || tokenIsIdentifier(this.state.type) || this.match(68) || this.match(74) || this.match(82)) return this.flowParseDeclare(node);
    } else if (tokenIsIdentifier(this.state.type)) {
      if ("interface" === expr.name) return this.flowParseInterface(node);
      if ("type" === expr.name) return this.flowParseTypeAlias(node);
      if ("opaque" === expr.name) return this.flowParseOpaqueType(node, !1);
    }
    return super.parseExpressionStatement(node, expr);
  }
  shouldParseExportDeclaration() {
    const {type} = this.state;
    return tokenIsFlowInterfaceOrTypeOrOpaque(type) || this.shouldParseEnums() && 122 === type ? !this.state.containsEsc : super.shouldParseExportDeclaration();
  }
  isExportDefaultSpecifier() {
    const {type} = this.state;
    return tokenIsFlowInterfaceOrTypeOrOpaque(type) || this.shouldParseEnums() && 122 === type ? this.state.containsEsc : super.isExportDefaultSpecifier();
  }
  parseExportDefaultExpression() {
    if (this.shouldParseEnums() && this.isContextual(122)) {
      const node = this.startNode();
      return this.next(), this.flowParseEnumDeclaration(node);
    }
    return super.parseExportDefaultExpression();
  }
  parseConditional(expr, startPos, startLoc, refExpressionErrors) {
    if (!this.match(17)) return expr;
    if (this.state.maybeInArrowParameters) {
      const nextCh = this.lookaheadCharCode();
      if (44 === nextCh || 61 === nextCh || 58 === nextCh || 41 === nextCh) return this.setOptionalParametersError(refExpressionErrors), 
      expr;
    }
    this.expect(17);
    const state = this.state.clone(), originalNoArrowAt = this.state.noArrowAt, node = this.startNodeAt(startPos, startLoc);
    let {consequent, failed} = this.tryParseConditionalConsequent(), [valid, invalid] = this.getArrowLikeExpressions(consequent);
    if (failed || invalid.length > 0) {
      const noArrowAt = [ ...originalNoArrowAt ];
      if (invalid.length > 0) {
        this.state = state, this.state.noArrowAt = noArrowAt;
        for (let i = 0; i < invalid.length; i++) noArrowAt.push(invalid[i].start);
        ({consequent, failed} = this.tryParseConditionalConsequent()), [valid, invalid] = this.getArrowLikeExpressions(consequent);
      }
      failed && valid.length > 1 && this.raise(FlowErrors.AmbiguousConditionalArrow, {
        at: state.startLoc
      }), failed && 1 === valid.length && (this.state = state, noArrowAt.push(valid[0].start), 
      this.state.noArrowAt = noArrowAt, ({consequent, failed} = this.tryParseConditionalConsequent()));
    }
    return this.getArrowLikeExpressions(consequent, !0), this.state.noArrowAt = originalNoArrowAt, 
    this.expect(14), node.test = expr, node.consequent = consequent, node.alternate = this.forwardNoArrowParamsConversionAt(node, (() => this.parseMaybeAssign(void 0, void 0))), 
    this.finishNode(node, "ConditionalExpression");
  }
  tryParseConditionalConsequent() {
    this.state.noArrowParamsConversionAt.push(this.state.start);
    const consequent = this.parseMaybeAssignAllowIn(), failed = !this.match(14);
    return this.state.noArrowParamsConversionAt.pop(), {
      consequent,
      failed
    };
  }
  getArrowLikeExpressions(node, disallowInvalid) {
    const stack = [ node ], arrows = [];
    for (;0 !== stack.length; ) {
      const node = stack.pop();
      "ArrowFunctionExpression" === node.type ? (node.typeParameters || !node.returnType ? this.finishArrowValidation(node) : arrows.push(node), 
      stack.push(node.body)) : "ConditionalExpression" === node.type && (stack.push(node.consequent), 
      stack.push(node.alternate));
    }
    return disallowInvalid ? (arrows.forEach((node => this.finishArrowValidation(node))), 
    [ arrows, [] ]) : partition(arrows, (node => node.params.every((param => this.isAssignable(param, !0)))));
  }
  finishArrowValidation(node) {
    var _node$extra;
    this.toAssignableList(node.params, null == (_node$extra = node.extra) ? void 0 : _node$extra.trailingCommaLoc, !1), 
    this.scope.enter(6), super.checkParams(node, !1, !0), this.scope.exit();
  }
  forwardNoArrowParamsConversionAt(node, parse) {
    let result;
    return -1 !== this.state.noArrowParamsConversionAt.indexOf(node.start) ? (this.state.noArrowParamsConversionAt.push(this.state.start), 
    result = parse(), this.state.noArrowParamsConversionAt.pop()) : result = parse(), 
    result;
  }
  parseParenItem(node, startPos, startLoc) {
    if (node = super.parseParenItem(node, startPos, startLoc), this.eat(17) && (node.optional = !0, 
    this.resetEndLocation(node)), this.match(14)) {
      const typeCastNode = this.startNodeAt(startPos, startLoc);
      return typeCastNode.expression = node, typeCastNode.typeAnnotation = this.flowParseTypeAnnotation(), 
      this.finishNode(typeCastNode, "TypeCastExpression");
    }
    return node;
  }
  assertModuleNodeAllowed(node) {
    "ImportDeclaration" === node.type && ("type" === node.importKind || "typeof" === node.importKind) || "ExportNamedDeclaration" === node.type && "type" === node.exportKind || "ExportAllDeclaration" === node.type && "type" === node.exportKind || super.assertModuleNodeAllowed(node);
  }
  parseExport(node) {
    const decl = super.parseExport(node);
    return "ExportNamedDeclaration" !== decl.type && "ExportAllDeclaration" !== decl.type || (decl.exportKind = decl.exportKind || "value"), 
    decl;
  }
  parseExportDeclaration(node) {
    if (this.isContextual(126)) {
      node.exportKind = "type";
      const declarationNode = this.startNode();
      return this.next(), this.match(5) ? (node.specifiers = this.parseExportSpecifiers(!0), 
      this.parseExportFrom(node), null) : this.flowParseTypeAlias(declarationNode);
    }
    if (this.isContextual(127)) {
      node.exportKind = "type";
      const declarationNode = this.startNode();
      return this.next(), this.flowParseOpaqueType(declarationNode, !1);
    }
    if (this.isContextual(125)) {
      node.exportKind = "type";
      const declarationNode = this.startNode();
      return this.next(), this.flowParseInterface(declarationNode);
    }
    if (this.shouldParseEnums() && this.isContextual(122)) {
      node.exportKind = "value";
      const declarationNode = this.startNode();
      return this.next(), this.flowParseEnumDeclaration(declarationNode);
    }
    return super.parseExportDeclaration(node);
  }
  eatExportStar(node) {
    return !!super.eatExportStar(...arguments) || !(!this.isContextual(126) || 55 !== this.lookahead().type) && (node.exportKind = "type", 
    this.next(), this.next(), !0);
  }
  maybeParseExportNamespaceSpecifier(node) {
    const {startLoc} = this.state, hasNamespace = super.maybeParseExportNamespaceSpecifier(node);
    return hasNamespace && "type" === node.exportKind && this.unexpected(startLoc), 
    hasNamespace;
  }
  parseClassId(node, isStatement, optionalId) {
    super.parseClassId(node, isStatement, optionalId), this.match(47) && (node.typeParameters = this.flowParseTypeParameterDeclaration());
  }
  parseClassMember(classBody, member, state) {
    const {startLoc} = this.state;
    if (this.isContextual(121)) {
      if (this.parseClassMemberFromModifier(classBody, member)) return;
      member.declare = !0;
    }
    super.parseClassMember(classBody, member, state), member.declare && ("ClassProperty" !== member.type && "ClassPrivateProperty" !== member.type && "PropertyDefinition" !== member.type ? this.raise(FlowErrors.DeclareClassElement, {
      at: startLoc
    }) : member.value && this.raise(FlowErrors.DeclareClassFieldInitializer, {
      at: member.value
    }));
  }
  isIterator(word) {
    return "iterator" === word || "asyncIterator" === word;
  }
  readIterator() {
    const word = super.readWord1(), fullWord = "@@" + word;
    this.isIterator(word) && this.state.inType || this.raise(Errors.InvalidIdentifier, {
      at: this.state.curPosition(),
      identifierName: fullWord
    }), this.finishToken(128, fullWord);
  }
  getTokenFromCode(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    return 123 === code && 124 === next ? this.finishOp(6, 2) : !this.state.inType || 62 !== code && 60 !== code ? this.state.inType && 63 === code ? 46 === next ? this.finishOp(18, 2) : this.finishOp(17, 1) : isIteratorStart(code, next, this.input.charCodeAt(this.state.pos + 2)) ? (this.state.pos += 2, 
    this.readIterator()) : super.getTokenFromCode(code) : this.finishOp(62 === code ? 48 : 47, 1);
  }
  isAssignable(node, isBinding) {
    return "TypeCastExpression" === node.type ? this.isAssignable(node.expression, isBinding) : super.isAssignable(node, isBinding);
  }
  toAssignable(node, isLHS = !1) {
    return "TypeCastExpression" === node.type ? super.toAssignable(this.typeCastToParameter(node), isLHS) : super.toAssignable(node, isLHS);
  }
  toAssignableList(exprList, trailingCommaLoc, isLHS) {
    for (let i = 0; i < exprList.length; i++) {
      const expr = exprList[i];
      "TypeCastExpression" === (null == expr ? void 0 : expr.type) && (exprList[i] = this.typeCastToParameter(expr));
    }
    return super.toAssignableList(exprList, trailingCommaLoc, isLHS);
  }
  toReferencedList(exprList, isParenthesizedExpr) {
    for (let i = 0; i < exprList.length; i++) {
      var _expr$extra;
      const expr = exprList[i];
      !expr || "TypeCastExpression" !== expr.type || null != (_expr$extra = expr.extra) && _expr$extra.parenthesized || !(exprList.length > 1) && isParenthesizedExpr || this.raise(FlowErrors.TypeCastInPattern, {
        at: expr.typeAnnotation
      });
    }
    return exprList;
  }
  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
    const node = super.parseArrayLike(close, canBePattern, isTuple, refExpressionErrors);
    return canBePattern && !this.state.maybeInArrowParameters && this.toReferencedList(node.elements), 
    node;
  }
  isValidLVal(type, ...rest) {
    return "TypeCastExpression" === type || super.isValidLVal(type, ...rest);
  }
  parseClassProperty(node) {
    return this.match(14) && (node.typeAnnotation = this.flowParseTypeAnnotation()), 
    super.parseClassProperty(node);
  }
  parseClassPrivateProperty(node) {
    return this.match(14) && (node.typeAnnotation = this.flowParseTypeAnnotation()), 
    super.parseClassPrivateProperty(node);
  }
  isClassMethod() {
    return this.match(47) || super.isClassMethod();
  }
  isClassProperty() {
    return this.match(14) || super.isClassProperty();
  }
  isNonstaticConstructor(method) {
    return !this.match(14) && super.isNonstaticConstructor(method);
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    if (method.variance && this.unexpected(method.variance.loc.start), delete method.variance, 
    this.match(47) && (method.typeParameters = this.flowParseTypeParameterDeclaration()), 
    super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper), 
    method.params && isConstructor) {
      const params = method.params;
      params.length > 0 && this.isThisParam(params[0]) && this.raise(FlowErrors.ThisParamBannedInConstructor, {
        at: method
      });
    } else if ("MethodDefinition" === method.type && isConstructor && method.value.params) {
      const params = method.value.params;
      params.length > 0 && this.isThisParam(params[0]) && this.raise(FlowErrors.ThisParamBannedInConstructor, {
        at: method
      });
    }
  }
  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
    method.variance && this.unexpected(method.variance.loc.start), delete method.variance, 
    this.match(47) && (method.typeParameters = this.flowParseTypeParameterDeclaration()), 
    super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
  }
  parseClassSuper(node) {
    if (super.parseClassSuper(node), node.superClass && this.match(47) && (node.superTypeParameters = this.flowParseTypeParameterInstantiation()), 
    this.isContextual(110)) {
      this.next();
      const implemented = node.implements = [];
      do {
        const node = this.startNode();
        node.id = this.flowParseRestrictedIdentifier(!0), this.match(47) ? node.typeParameters = this.flowParseTypeParameterInstantiation() : node.typeParameters = null, 
        implemented.push(this.finishNode(node, "ClassImplements"));
      } while (this.eat(12));
    }
  }
  checkGetterSetterParams(method) {
    super.checkGetterSetterParams(method);
    const params = this.getObjectOrClassMethodParams(method);
    if (params.length > 0) {
      const param = params[0];
      this.isThisParam(param) && "get" === method.kind ? this.raise(FlowErrors.GetterMayNotHaveThisParam, {
        at: param
      }) : this.isThisParam(param) && this.raise(FlowErrors.SetterMayNotHaveThisParam, {
        at: param
      });
    }
  }
  parsePropertyNamePrefixOperator(node) {
    node.variance = this.flowParseVariance();
  }
  parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
    let typeParameters;
    prop.variance && this.unexpected(prop.variance.loc.start), delete prop.variance, 
    this.match(47) && !isAccessor && (typeParameters = this.flowParseTypeParameterDeclaration(), 
    this.match(10) || this.unexpected()), super.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors), 
    typeParameters && ((prop.value || prop).typeParameters = typeParameters);
  }
  parseAssignableListItemTypes(param) {
    return this.eat(17) && ("Identifier" !== param.type && this.raise(FlowErrors.PatternIsOptional, {
      at: param
    }), this.isThisParam(param) && this.raise(FlowErrors.ThisParamMayNotBeOptional, {
      at: param
    }), param.optional = !0), this.match(14) ? param.typeAnnotation = this.flowParseTypeAnnotation() : this.isThisParam(param) && this.raise(FlowErrors.ThisParamAnnotationRequired, {
      at: param
    }), this.match(29) && this.isThisParam(param) && this.raise(FlowErrors.ThisParamNoDefault, {
      at: param
    }), this.resetEndLocation(param), param;
  }
  parseMaybeDefault(startPos, startLoc, left) {
    const node = super.parseMaybeDefault(startPos, startLoc, left);
    return "AssignmentPattern" === node.type && node.typeAnnotation && node.right.start < node.typeAnnotation.start && this.raise(FlowErrors.TypeBeforeInitializer, {
      at: node.typeAnnotation
    }), node;
  }
  shouldParseDefaultImport(node) {
    return hasTypeImportKind(node) ? isMaybeDefaultImport(this.state.type) : super.shouldParseDefaultImport(node);
  }
  parseImportSpecifierLocal(node, specifier, type) {
    specifier.local = hasTypeImportKind(node) ? this.flowParseRestrictedIdentifier(!0, !0) : this.parseIdentifier(), 
    node.specifiers.push(this.finishImportSpecifier(specifier, type));
  }
  maybeParseDefaultImportSpecifier(node) {
    node.importKind = "value";
    let kind = null;
    if (this.match(87) ? kind = "typeof" : this.isContextual(126) && (kind = "type"), 
    kind) {
      const lh = this.lookahead(), {type} = lh;
      "type" === kind && 55 === type && this.unexpected(null, lh.type), (isMaybeDefaultImport(type) || 5 === type || 55 === type) && (this.next(), 
      node.importKind = kind);
    }
    return super.maybeParseDefaultImportSpecifier(node);
  }
  parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly) {
    const firstIdent = specifier.imported;
    let specifierTypeKind = null;
    "Identifier" === firstIdent.type && ("type" === firstIdent.name ? specifierTypeKind = "type" : "typeof" === firstIdent.name && (specifierTypeKind = "typeof"));
    let isBinding = !1;
    if (this.isContextual(93) && !this.isLookaheadContextual("as")) {
      const as_ident = this.parseIdentifier(!0);
      null === specifierTypeKind || tokenIsKeywordOrIdentifier(this.state.type) ? (specifier.imported = firstIdent, 
      specifier.importKind = null, specifier.local = this.parseIdentifier()) : (specifier.imported = as_ident, 
      specifier.importKind = specifierTypeKind, specifier.local = cloneIdentifier(as_ident));
    } else {
      if (null !== specifierTypeKind && tokenIsKeywordOrIdentifier(this.state.type)) specifier.imported = this.parseIdentifier(!0), 
      specifier.importKind = specifierTypeKind; else {
        if (importedIsString) throw this.raise(Errors.ImportBindingIsString, {
          at: specifier,
          importName: firstIdent.value
        });
        specifier.imported = firstIdent, specifier.importKind = null;
      }
      this.eatContextual(93) ? specifier.local = this.parseIdentifier() : (isBinding = !0, 
      specifier.local = cloneIdentifier(specifier.imported));
    }
    const specifierIsTypeImport = hasTypeImportKind(specifier);
    return isInTypeOnlyImport && specifierIsTypeImport && this.raise(FlowErrors.ImportTypeShorthandOnlyInPureImport, {
      at: specifier
    }), (isInTypeOnlyImport || specifierIsTypeImport) && this.checkReservedType(specifier.local.name, specifier.local.loc.start, !0), 
    !isBinding || isInTypeOnlyImport || specifierIsTypeImport || this.checkReservedWord(specifier.local.name, specifier.loc.start, !0, !0), 
    this.finishImportSpecifier(specifier, "ImportSpecifier");
  }
  parseBindingAtom() {
    return 78 === this.state.type ? this.parseIdentifier(!0) : super.parseBindingAtom();
  }
  parseFunctionParams(node, allowModifiers) {
    const kind = node.kind;
    "get" !== kind && "set" !== kind && this.match(47) && (node.typeParameters = this.flowParseTypeParameterDeclaration()), 
    super.parseFunctionParams(node, allowModifiers);
  }
  parseVarId(decl, kind) {
    super.parseVarId(decl, kind), this.match(14) && (decl.id.typeAnnotation = this.flowParseTypeAnnotation(), 
    this.resetEndLocation(decl.id));
  }
  parseAsyncArrowFromCallExpression(node, call) {
    if (this.match(14)) {
      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
      this.state.noAnonFunctionType = !0, node.returnType = this.flowParseTypeAnnotation(), 
      this.state.noAnonFunctionType = oldNoAnonFunctionType;
    }
    return super.parseAsyncArrowFromCallExpression(node, call);
  }
  shouldParseAsyncArrow() {
    return this.match(14) || super.shouldParseAsyncArrow();
  }
  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
    var _jsx;
    let jsx, state = null;
    if (this.hasPlugin("jsx") && (this.match(138) || this.match(47))) {
      if (state = this.state.clone(), jsx = this.tryParse((() => super.parseMaybeAssign(refExpressionErrors, afterLeftParse)), state), 
      !jsx.error) return jsx.node;
      const {context} = this.state, currentContext = context[context.length - 1];
      currentContext !== types.j_oTag && currentContext !== types.j_expr || context.pop();
    }
    if (null != (_jsx = jsx) && _jsx.error || this.match(47)) {
      var _jsx2, _jsx3;
      let typeParameters;
      state = state || this.state.clone();
      const arrow = this.tryParse((abort => {
        var _arrowExpression$extr;
        typeParameters = this.flowParseTypeParameterDeclaration();
        const arrowExpression = this.forwardNoArrowParamsConversionAt(typeParameters, (() => {
          const result = super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
          return this.resetStartLocationFromNode(result, typeParameters), result;
        }));
        null != (_arrowExpression$extr = arrowExpression.extra) && _arrowExpression$extr.parenthesized && abort();
        const expr = this.maybeUnwrapTypeCastExpression(arrowExpression);
        return "ArrowFunctionExpression" !== expr.type && abort(), expr.typeParameters = typeParameters, 
        this.resetStartLocationFromNode(expr, typeParameters), arrowExpression;
      }), state);
      let arrowExpression = null;
      if (arrow.node && "ArrowFunctionExpression" === this.maybeUnwrapTypeCastExpression(arrow.node).type) {
        if (!arrow.error && !arrow.aborted) return arrow.node.async && this.raise(FlowErrors.UnexpectedTypeParameterBeforeAsyncArrowFunction, {
          at: typeParameters
        }), arrow.node;
        arrowExpression = arrow.node;
      }
      if (null != (_jsx2 = jsx) && _jsx2.node) return this.state = jsx.failState, jsx.node;
      if (arrowExpression) return this.state = arrow.failState, arrowExpression;
      if (null != (_jsx3 = jsx) && _jsx3.thrown) throw jsx.error;
      if (arrow.thrown) throw arrow.error;
      throw this.raise(FlowErrors.UnexpectedTokenAfterTypeParameter, {
        at: typeParameters
      });
    }
    return super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
  }
  parseArrow(node) {
    if (this.match(14)) {
      const result = this.tryParse((() => {
        const oldNoAnonFunctionType = this.state.noAnonFunctionType;
        this.state.noAnonFunctionType = !0;
        const typeNode = this.startNode();
        return [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser(), 
        this.state.noAnonFunctionType = oldNoAnonFunctionType, this.canInsertSemicolon() && this.unexpected(), 
        this.match(19) || this.unexpected(), typeNode;
      }));
      if (result.thrown) return null;
      result.error && (this.state = result.failState), node.returnType = result.node.typeAnnotation ? this.finishNode(result.node, "TypeAnnotation") : null;
    }
    return super.parseArrow(node);
  }
  shouldParseArrow(params) {
    return this.match(14) || super.shouldParseArrow(params);
  }
  setArrowFunctionParameters(node, params) {
    -1 !== this.state.noArrowParamsConversionAt.indexOf(node.start) ? node.params = params : super.setArrowFunctionParameters(node, params);
  }
  checkParams(node, allowDuplicates, isArrowFunction) {
    if (!isArrowFunction || -1 === this.state.noArrowParamsConversionAt.indexOf(node.start)) {
      for (let i = 0; i < node.params.length; i++) this.isThisParam(node.params[i]) && i > 0 && this.raise(FlowErrors.ThisParamMustBeFirst, {
        at: node.params[i]
      });
      return super.checkParams(...arguments);
    }
  }
  parseParenAndDistinguishExpression(canBeArrow) {
    return super.parseParenAndDistinguishExpression(canBeArrow && -1 === this.state.noArrowAt.indexOf(this.state.start));
  }
  parseSubscripts(base, startPos, startLoc, noCalls) {
    if ("Identifier" === base.type && "async" === base.name && -1 !== this.state.noArrowAt.indexOf(startPos)) {
      this.next();
      const node = this.startNodeAt(startPos, startLoc);
      node.callee = base, node.arguments = this.parseCallExpressionArguments(11, !1), 
      base = this.finishNode(node, "CallExpression");
    } else if ("Identifier" === base.type && "async" === base.name && this.match(47)) {
      const state = this.state.clone(), arrow = this.tryParse((abort => this.parseAsyncArrowWithTypeParameters(startPos, startLoc) || abort()), state);
      if (!arrow.error && !arrow.aborted) return arrow.node;
      const result = this.tryParse((() => super.parseSubscripts(base, startPos, startLoc, noCalls)), state);
      if (result.node && !result.error) return result.node;
      if (arrow.node) return this.state = arrow.failState, arrow.node;
      if (result.node) return this.state = result.failState, result.node;
      throw arrow.error || result.error;
    }
    return super.parseSubscripts(base, startPos, startLoc, noCalls);
  }
  parseSubscript(base, startPos, startLoc, noCalls, subscriptState) {
    if (this.match(18) && this.isLookaheadToken_lt()) {
      if (subscriptState.optionalChainMember = !0, noCalls) return subscriptState.stop = !0, 
      base;
      this.next();
      const node = this.startNodeAt(startPos, startLoc);
      return node.callee = base, node.typeArguments = this.flowParseTypeParameterInstantiation(), 
      this.expect(10), node.arguments = this.parseCallExpressionArguments(11, !1), node.optional = !0, 
      this.finishCallExpression(node, !0);
    }
    if (!noCalls && this.shouldParseTypes() && this.match(47)) {
      const node = this.startNodeAt(startPos, startLoc);
      node.callee = base;
      const result = this.tryParse((() => (node.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew(), 
      this.expect(10), node.arguments = this.parseCallExpressionArguments(11, !1), subscriptState.optionalChainMember && (node.optional = !1), 
      this.finishCallExpression(node, subscriptState.optionalChainMember))));
      if (result.node) return result.error && (this.state = result.failState), result.node;
    }
    return super.parseSubscript(base, startPos, startLoc, noCalls, subscriptState);
  }
  parseNewArguments(node) {
    let targs = null;
    this.shouldParseTypes() && this.match(47) && (targs = this.tryParse((() => this.flowParseTypeParameterInstantiationCallOrNew())).node), 
    node.typeArguments = targs, super.parseNewArguments(node);
  }
  parseAsyncArrowWithTypeParameters(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc);
    if (this.parseFunctionParams(node), this.parseArrow(node)) return this.parseArrowExpression(node, void 0, !0);
  }
  readToken_mult_modulo(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (42 === code && 47 === next && this.state.hasFlowComment) return this.state.hasFlowComment = !1, 
    this.state.pos += 2, void this.nextToken();
    super.readToken_mult_modulo(code);
  }
  readToken_pipe_amp(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    124 !== code || 125 !== next ? super.readToken_pipe_amp(code) : this.finishOp(9, 2);
  }
  parseTopLevel(file, program) {
    const fileNode = super.parseTopLevel(file, program);
    return this.state.hasFlowComment && this.raise(FlowErrors.UnterminatedFlowComment, {
      at: this.state.curPosition()
    }), fileNode;
  }
  skipBlockComment() {
    if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
      if (this.state.hasFlowComment) throw this.raise(FlowErrors.NestedFlowComment, {
        at: this.state.startLoc
      });
      return this.hasFlowCommentCompletion(), this.state.pos += this.skipFlowComment(), 
      void (this.state.hasFlowComment = !0);
    }
    if (!this.state.hasFlowComment) return super.skipBlockComment();
    {
      const end = this.input.indexOf("*-/", this.state.pos + 2);
      if (-1 === end) throw this.raise(Errors.UnterminatedComment, {
        at: this.state.curPosition()
      });
      this.state.pos = end + 2 + 3;
    }
  }
  skipFlowComment() {
    const {pos} = this.state;
    let shiftToFirstNonWhiteSpace = 2;
    for (;[ 32, 9 ].includes(this.input.charCodeAt(pos + shiftToFirstNonWhiteSpace)); ) shiftToFirstNonWhiteSpace++;
    const ch2 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos), ch3 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);
    return 58 === ch2 && 58 === ch3 ? shiftToFirstNonWhiteSpace + 2 : "flow-include" === this.input.slice(shiftToFirstNonWhiteSpace + pos, shiftToFirstNonWhiteSpace + pos + 12) ? shiftToFirstNonWhiteSpace + 12 : 58 === ch2 && 58 !== ch3 && shiftToFirstNonWhiteSpace;
  }
  hasFlowCommentCompletion() {
    if (-1 === this.input.indexOf("*/", this.state.pos)) throw this.raise(Errors.UnterminatedComment, {
      at: this.state.curPosition()
    });
  }
  flowEnumErrorBooleanMemberNotInitialized(loc, {enumName, memberName}) {
    this.raise(FlowErrors.EnumBooleanMemberNotInitialized, {
      at: loc,
      memberName,
      enumName
    });
  }
  flowEnumErrorInvalidMemberInitializer(loc, enumContext) {
    return this.raise(enumContext.explicitType ? "symbol" === enumContext.explicitType ? FlowErrors.EnumInvalidMemberInitializerSymbolType : FlowErrors.EnumInvalidMemberInitializerPrimaryType : FlowErrors.EnumInvalidMemberInitializerUnknownType, Object.assign({
      at: loc
    }, enumContext));
  }
  flowEnumErrorNumberMemberNotInitialized(loc, {enumName, memberName}) {
    this.raise(FlowErrors.EnumNumberMemberNotInitialized, {
      at: loc,
      enumName,
      memberName
    });
  }
  flowEnumErrorStringMemberInconsistentlyInitailized(node, {enumName}) {
    this.raise(FlowErrors.EnumStringMemberInconsistentlyInitailized, {
      at: node,
      enumName
    });
  }
  flowEnumMemberInit() {
    const startLoc = this.state.startLoc, endOfInit = () => this.match(12) || this.match(8);
    switch (this.state.type) {
     case 130:
      {
        const literal = this.parseNumericLiteral(this.state.value);
        return endOfInit() ? {
          type: "number",
          loc: literal.loc.start,
          value: literal
        } : {
          type: "invalid",
          loc: startLoc
        };
      }

     case 129:
      {
        const literal = this.parseStringLiteral(this.state.value);
        return endOfInit() ? {
          type: "string",
          loc: literal.loc.start,
          value: literal
        } : {
          type: "invalid",
          loc: startLoc
        };
      }

     case 85:
     case 86:
      {
        const literal = this.parseBooleanLiteral(this.match(85));
        return endOfInit() ? {
          type: "boolean",
          loc: literal.loc.start,
          value: literal
        } : {
          type: "invalid",
          loc: startLoc
        };
      }

     default:
      return {
        type: "invalid",
        loc: startLoc
      };
    }
  }
  flowEnumMemberRaw() {
    const loc = this.state.startLoc;
    return {
      id: this.parseIdentifier(!0),
      init: this.eat(29) ? this.flowEnumMemberInit() : {
        type: "none",
        loc
      }
    };
  }
  flowEnumCheckExplicitTypeMismatch(loc, context, expectedType) {
    const {explicitType} = context;
    null !== explicitType && explicitType !== expectedType && this.flowEnumErrorInvalidMemberInitializer(loc, context);
  }
  flowEnumMembers({enumName, explicitType}) {
    const seenNames = new Set, members = {
      booleanMembers: [],
      numberMembers: [],
      stringMembers: [],
      defaultedMembers: []
    };
    let hasUnknownMembers = !1;
    for (;!this.match(8); ) {
      if (this.eat(21)) {
        hasUnknownMembers = !0;
        break;
      }
      const memberNode = this.startNode(), {id, init} = this.flowEnumMemberRaw(), memberName = id.name;
      if ("" === memberName) continue;
      /^[a-z]/.test(memberName) && this.raise(FlowErrors.EnumInvalidMemberName, {
        at: id,
        memberName,
        suggestion: memberName[0].toUpperCase() + memberName.slice(1),
        enumName
      }), seenNames.has(memberName) && this.raise(FlowErrors.EnumDuplicateMemberName, {
        at: id,
        memberName,
        enumName
      }), seenNames.add(memberName);
      const context = {
        enumName,
        explicitType,
        memberName
      };
      switch (memberNode.id = id, init.type) {
       case "boolean":
        this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "boolean"), memberNode.init = init.value, 
        members.booleanMembers.push(this.finishNode(memberNode, "EnumBooleanMember"));
        break;

       case "number":
        this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "number"), memberNode.init = init.value, 
        members.numberMembers.push(this.finishNode(memberNode, "EnumNumberMember"));
        break;

       case "string":
        this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "string"), memberNode.init = init.value, 
        members.stringMembers.push(this.finishNode(memberNode, "EnumStringMember"));
        break;

       case "invalid":
        throw this.flowEnumErrorInvalidMemberInitializer(init.loc, context);

       case "none":
        switch (explicitType) {
         case "boolean":
          this.flowEnumErrorBooleanMemberNotInitialized(init.loc, context);
          break;

         case "number":
          this.flowEnumErrorNumberMemberNotInitialized(init.loc, context);
          break;

         default:
          members.defaultedMembers.push(this.finishNode(memberNode, "EnumDefaultedMember"));
        }
      }
      this.match(8) || this.expect(12);
    }
    return {
      members,
      hasUnknownMembers
    };
  }
  flowEnumStringMembers(initializedMembers, defaultedMembers, {enumName}) {
    if (0 === initializedMembers.length) return defaultedMembers;
    if (0 === defaultedMembers.length) return initializedMembers;
    if (defaultedMembers.length > initializedMembers.length) {
      for (const member of initializedMembers) this.flowEnumErrorStringMemberInconsistentlyInitailized(member, {
        enumName
      });
      return defaultedMembers;
    }
    for (const member of defaultedMembers) this.flowEnumErrorStringMemberInconsistentlyInitailized(member, {
      enumName
    });
    return initializedMembers;
  }
  flowEnumParseExplicitType({enumName}) {
    if (!this.eatContextual(101)) return null;
    if (!tokenIsIdentifier(this.state.type)) throw this.raise(FlowErrors.EnumInvalidExplicitTypeUnknownSupplied, {
      at: this.state.startLoc,
      enumName
    });
    const {value} = this.state;
    return this.next(), "boolean" !== value && "number" !== value && "string" !== value && "symbol" !== value && this.raise(FlowErrors.EnumInvalidExplicitType, {
      at: this.state.startLoc,
      enumName,
      invalidEnumType: value
    }), value;
  }
  flowEnumBody(node, id) {
    const enumName = id.name, nameLoc = id.loc.start, explicitType = this.flowEnumParseExplicitType({
      enumName
    });
    this.expect(5);
    const {members, hasUnknownMembers} = this.flowEnumMembers({
      enumName,
      explicitType
    });
    switch (node.hasUnknownMembers = hasUnknownMembers, explicitType) {
     case "boolean":
      return node.explicitType = !0, node.members = members.booleanMembers, this.expect(8), 
      this.finishNode(node, "EnumBooleanBody");

     case "number":
      return node.explicitType = !0, node.members = members.numberMembers, this.expect(8), 
      this.finishNode(node, "EnumNumberBody");

     case "string":
      return node.explicitType = !0, node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
        enumName
      }), this.expect(8), this.finishNode(node, "EnumStringBody");

     case "symbol":
      return node.members = members.defaultedMembers, this.expect(8), this.finishNode(node, "EnumSymbolBody");

     default:
      {
        const empty = () => (node.members = [], this.expect(8), this.finishNode(node, "EnumStringBody"));
        node.explicitType = !1;
        const boolsLen = members.booleanMembers.length, numsLen = members.numberMembers.length, strsLen = members.stringMembers.length, defaultedLen = members.defaultedMembers.length;
        if (boolsLen || numsLen || strsLen || defaultedLen) {
          if (boolsLen || numsLen) {
            if (!numsLen && !strsLen && boolsLen >= defaultedLen) {
              for (const member of members.defaultedMembers) this.flowEnumErrorBooleanMemberNotInitialized(member.loc.start, {
                enumName,
                memberName: member.id.name
              });
              return node.members = members.booleanMembers, this.expect(8), this.finishNode(node, "EnumBooleanBody");
            }
            if (!boolsLen && !strsLen && numsLen >= defaultedLen) {
              for (const member of members.defaultedMembers) this.flowEnumErrorNumberMemberNotInitialized(member.loc.start, {
                enumName,
                memberName: member.id.name
              });
              return node.members = members.numberMembers, this.expect(8), this.finishNode(node, "EnumNumberBody");
            }
            return this.raise(FlowErrors.EnumInconsistentMemberValues, {
              at: nameLoc,
              enumName
            }), empty();
          }
          return node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
            enumName
          }), this.expect(8), this.finishNode(node, "EnumStringBody");
        }
        return empty();
      }
    }
  }
  flowParseEnumDeclaration(node) {
    const id = this.parseIdentifier();
    return node.id = id, node.body = this.flowEnumBody(this.startNode(), id), this.finishNode(node, "EnumDeclaration");
  }
  isLookaheadToken_lt() {
    const next = this.nextTokenStart();
    if (60 === this.input.charCodeAt(next)) {
      const afterNext = this.input.charCodeAt(next + 1);
      return 60 !== afterNext && 61 !== afterNext;
    }
    return !1;
  }
  maybeUnwrapTypeCastExpression(node) {
    return "TypeCastExpression" === node.type ? node.expression : node;
  }
};

const entities = {
  __proto__: null,
  quot: '"',
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  fnof: "ƒ",
  circ: "ˆ",
  tilde: "˜",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  bull: "•",
  hellip: "…",
  permil: "‰",
  prime: "′",
  Prime: "″",
  lsaquo: "‹",
  rsaquo: "›",
  oline: "‾",
  frasl: "⁄",
  euro: "€",
  image: "ℑ",
  weierp: "℘",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦"
}, JsxErrors = ParseErrorEnum`jsx`((_ => ({
  AttributeIsEmpty: _("JSX attributes must only be assigned a non-empty expression."),
  MissingClosingTagElement: _((({openingTagName}) => `Expected corresponding JSX closing tag for <${openingTagName}>.`)),
  MissingClosingTagFragment: _("Expected corresponding JSX closing tag for <>."),
  UnexpectedSequenceExpression: _("Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?"),
  UnexpectedToken: _((({unexpected, HTMLEntity}) => `Unexpected token \`${unexpected}\`. Did you mean \`${HTMLEntity}\` or \`{'${unexpected}'}\`?`)),
  UnsupportedJsxValue: _("JSX value should be either an expression or a quoted JSX text."),
  UnterminatedJsxContent: _("Unterminated JSX contents."),
  UnwrappedAdjacentJSXElements: _("Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?")
})));

function isFragment(object) {
  return !!object && ("JSXOpeningFragment" === object.type || "JSXClosingFragment" === object.type);
}

function getQualifiedJSXName(object) {
  if ("JSXIdentifier" === object.type) return object.name;
  if ("JSXNamespacedName" === object.type) return object.namespace.name + ":" + object.name.name;
  if ("JSXMemberExpression" === object.type) return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  throw new Error("Node had unexpected type: " + object.type);
}

var jsx = superClass => class extends superClass {
  jsxReadToken() {
    let out = "", chunkStart = this.state.pos;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(JsxErrors.UnterminatedJsxContent, {
        at: this.state.startLoc
      });
      const ch = this.input.charCodeAt(this.state.pos);
      switch (ch) {
       case 60:
       case 123:
        return this.state.pos === this.state.start ? 60 === ch && this.state.canStartJSXElement ? (++this.state.pos, 
        this.finishToken(138)) : super.getTokenFromCode(ch) : (out += this.input.slice(chunkStart, this.state.pos), 
        this.finishToken(137, out));

       case 38:
        out += this.input.slice(chunkStart, this.state.pos), out += this.jsxReadEntity(), 
        chunkStart = this.state.pos;
        break;

       default:
        isNewLine(ch) ? (out += this.input.slice(chunkStart, this.state.pos), out += this.jsxReadNewLine(!0), 
        chunkStart = this.state.pos) : ++this.state.pos;
      }
    }
  }
  jsxReadNewLine(normalizeCRLF) {
    const ch = this.input.charCodeAt(this.state.pos);
    let out;
    return ++this.state.pos, 13 === ch && 10 === this.input.charCodeAt(this.state.pos) ? (++this.state.pos, 
    out = normalizeCRLF ? "\n" : "\r\n") : out = String.fromCharCode(ch), ++this.state.curLine, 
    this.state.lineStart = this.state.pos, out;
  }
  jsxReadString(quote) {
    let out = "", chunkStart = ++this.state.pos;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(Errors.UnterminatedString, {
        at: this.state.startLoc
      });
      const ch = this.input.charCodeAt(this.state.pos);
      if (ch === quote) break;
      38 === ch ? (out += this.input.slice(chunkStart, this.state.pos), out += this.jsxReadEntity(), 
      chunkStart = this.state.pos) : isNewLine(ch) ? (out += this.input.slice(chunkStart, this.state.pos), 
      out += this.jsxReadNewLine(!1), chunkStart = this.state.pos) : ++this.state.pos;
    }
    return out += this.input.slice(chunkStart, this.state.pos++), this.finishToken(129, out);
  }
  jsxReadEntity() {
    const startPos = ++this.state.pos;
    if (35 === this.codePointAtPos(this.state.pos)) {
      ++this.state.pos;
      let radix = 10;
      120 === this.codePointAtPos(this.state.pos) && (radix = 16, ++this.state.pos);
      const codePoint = this.readInt(radix, void 0, !1, "bail");
      if (null !== codePoint && 59 === this.codePointAtPos(this.state.pos)) return ++this.state.pos, 
      String.fromCodePoint(codePoint);
    } else {
      let count = 0, semi = !1;
      for (;count++ < 10 && this.state.pos < this.length && !(semi = 59 == this.codePointAtPos(this.state.pos)); ) ++this.state.pos;
      if (semi) {
        const desc = this.input.slice(startPos, this.state.pos), entity = entities[desc];
        if (++this.state.pos, entity) return entity;
      }
    }
    return this.state.pos = startPos, "&";
  }
  jsxReadWord() {
    let ch;
    const start = this.state.pos;
    do {
      ch = this.input.charCodeAt(++this.state.pos);
    } while (isIdentifierChar(ch) || 45 === ch);
    return this.finishToken(136, this.input.slice(start, this.state.pos));
  }
  jsxParseIdentifier() {
    const node = this.startNode();
    return this.match(136) ? node.name = this.state.value : tokenIsKeyword(this.state.type) ? node.name = tokenLabelName(this.state.type) : this.unexpected(), 
    this.next(), this.finishNode(node, "JSXIdentifier");
  }
  jsxParseNamespacedName() {
    const startPos = this.state.start, startLoc = this.state.startLoc, name = this.jsxParseIdentifier();
    if (!this.eat(14)) return name;
    const node = this.startNodeAt(startPos, startLoc);
    return node.namespace = name, node.name = this.jsxParseIdentifier(), this.finishNode(node, "JSXNamespacedName");
  }
  jsxParseElementName() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let node = this.jsxParseNamespacedName();
    if ("JSXNamespacedName" === node.type) return node;
    for (;this.eat(16); ) {
      const newNode = this.startNodeAt(startPos, startLoc);
      newNode.object = node, newNode.property = this.jsxParseIdentifier(), node = this.finishNode(newNode, "JSXMemberExpression");
    }
    return node;
  }
  jsxParseAttributeValue() {
    let node;
    switch (this.state.type) {
     case 5:
      return node = this.startNode(), this.setContext(types.brace), this.next(), node = this.jsxParseExpressionContainer(node, types.j_oTag), 
      "JSXEmptyExpression" === node.expression.type && this.raise(JsxErrors.AttributeIsEmpty, {
        at: node
      }), node;

     case 138:
     case 129:
      return this.parseExprAtom();

     default:
      throw this.raise(JsxErrors.UnsupportedJsxValue, {
        at: this.state.startLoc
      });
    }
  }
  jsxParseEmptyExpression() {
    const node = this.startNodeAt(this.state.lastTokEndLoc.index, this.state.lastTokEndLoc);
    return this.finishNodeAt(node, "JSXEmptyExpression", this.state.startLoc);
  }
  jsxParseSpreadChild(node) {
    return this.next(), node.expression = this.parseExpression(), this.setContext(types.j_oTag), 
    this.expect(8), this.finishNode(node, "JSXSpreadChild");
  }
  jsxParseExpressionContainer(node, previousContext) {
    if (this.match(8)) node.expression = this.jsxParseEmptyExpression(); else {
      const expression = this.parseExpression();
      node.expression = expression;
    }
    return this.setContext(previousContext), this.expect(8), this.finishNode(node, "JSXExpressionContainer");
  }
  jsxParseAttribute() {
    const node = this.startNode();
    return this.match(5) ? (this.setContext(types.brace), this.next(), this.expect(21), 
    node.argument = this.parseMaybeAssignAllowIn(), this.setContext(types.j_oTag), this.expect(8), 
    this.finishNode(node, "JSXSpreadAttribute")) : (node.name = this.jsxParseNamespacedName(), 
    node.value = this.eat(29) ? this.jsxParseAttributeValue() : null, this.finishNode(node, "JSXAttribute"));
  }
  jsxParseOpeningElementAt(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc);
    return this.match(139) ? (this.expect(139), this.finishNode(node, "JSXOpeningFragment")) : (node.name = this.jsxParseElementName(), 
    this.jsxParseOpeningElementAfterName(node));
  }
  jsxParseOpeningElementAfterName(node) {
    const attributes = [];
    for (;!this.match(56) && !this.match(139); ) attributes.push(this.jsxParseAttribute());
    return node.attributes = attributes, node.selfClosing = this.eat(56), this.expect(139), 
    this.finishNode(node, "JSXOpeningElement");
  }
  jsxParseClosingElementAt(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc);
    return this.match(139) ? (this.expect(139), this.finishNode(node, "JSXClosingFragment")) : (node.name = this.jsxParseElementName(), 
    this.expect(139), this.finishNode(node, "JSXClosingElement"));
  }
  jsxParseElementAt(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc), children = [], openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
    let closingElement = null;
    if (!openingElement.selfClosing) {
      contents: for (;;) switch (this.state.type) {
       case 138:
        if (startPos = this.state.start, startLoc = this.state.startLoc, this.next(), this.eat(56)) {
          closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
          break contents;
        }
        children.push(this.jsxParseElementAt(startPos, startLoc));
        break;

       case 137:
        children.push(this.parseExprAtom());
        break;

       case 5:
        {
          const node = this.startNode();
          this.setContext(types.brace), this.next(), this.match(21) ? children.push(this.jsxParseSpreadChild(node)) : children.push(this.jsxParseExpressionContainer(node, types.j_expr));
          break;
        }

       default:
        throw this.unexpected();
      }
      isFragment(openingElement) && !isFragment(closingElement) && null !== closingElement ? this.raise(JsxErrors.MissingClosingTagFragment, {
        at: closingElement
      }) : !isFragment(openingElement) && isFragment(closingElement) ? this.raise(JsxErrors.MissingClosingTagElement, {
        at: closingElement,
        openingTagName: getQualifiedJSXName(openingElement.name)
      }) : isFragment(openingElement) || isFragment(closingElement) || getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name) && this.raise(JsxErrors.MissingClosingTagElement, {
        at: closingElement,
        openingTagName: getQualifiedJSXName(openingElement.name)
      });
    }
    if (isFragment(openingElement) ? (node.openingFragment = openingElement, node.closingFragment = closingElement) : (node.openingElement = openingElement, 
    node.closingElement = closingElement), node.children = children, this.match(47)) throw this.raise(JsxErrors.UnwrappedAdjacentJSXElements, {
      at: this.state.startLoc
    });
    return isFragment(openingElement) ? this.finishNode(node, "JSXFragment") : this.finishNode(node, "JSXElement");
  }
  jsxParseElement() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    return this.next(), this.jsxParseElementAt(startPos, startLoc);
  }
  setContext(newContext) {
    const {context} = this.state;
    context[context.length - 1] = newContext;
  }
  parseExprAtom(refExpressionErrors) {
    return this.match(137) ? this.parseLiteral(this.state.value, "JSXText") : this.match(138) ? this.jsxParseElement() : this.match(47) && 33 !== this.input.charCodeAt(this.state.pos) ? (this.replaceToken(138), 
    this.jsxParseElement()) : super.parseExprAtom(refExpressionErrors);
  }
  skipSpace() {
    this.curContext().preserveSpace || super.skipSpace();
  }
  getTokenFromCode(code) {
    const context = this.curContext();
    if (context === types.j_expr) return this.jsxReadToken();
    if (context === types.j_oTag || context === types.j_cTag) {
      if (isIdentifierStart(code)) return this.jsxReadWord();
      if (62 === code) return ++this.state.pos, this.finishToken(139);
      if ((34 === code || 39 === code) && context === types.j_oTag) return this.jsxReadString(code);
    }
    return 60 === code && this.state.canStartJSXElement && 33 !== this.input.charCodeAt(this.state.pos + 1) ? (++this.state.pos, 
    this.finishToken(138)) : super.getTokenFromCode(code);
  }
  updateContext(prevType) {
    const {context, type} = this.state;
    if (56 === type && 138 === prevType) context.splice(-2, 2, types.j_cTag), this.state.canStartJSXElement = !1; else if (138 === type) context.push(types.j_oTag); else if (139 === type) {
      const out = context[context.length - 1];
      out === types.j_oTag && 56 === prevType || out === types.j_cTag ? (context.pop(), 
      this.state.canStartJSXElement = context[context.length - 1] === types.j_expr) : (this.setContext(types.j_expr), 
      this.state.canStartJSXElement = !0);
    } else this.state.canStartJSXElement = tokenComesBeforeExpression(type);
  }
};

class TypeScriptScope extends Scope {
  constructor(...args) {
    super(...args), this.types = new Set, this.enums = new Set, this.constEnums = new Set, 
    this.classes = new Set, this.exportOnlyBindings = new Set;
  }
}

class TypeScriptScopeHandler extends ScopeHandler {
  createScope(flags) {
    return new TypeScriptScope(flags);
  }
  declareName(name, bindingType, loc) {
    const scope = this.currentScope();
    if (1024 & bindingType) return this.maybeExportDefined(scope, name), void scope.exportOnlyBindings.add(name);
    super.declareName(...arguments), 2 & bindingType && (1 & bindingType || (this.checkRedeclarationInScope(scope, name, bindingType, loc), 
    this.maybeExportDefined(scope, name)), scope.types.add(name)), 256 & bindingType && scope.enums.add(name), 
    512 & bindingType && scope.constEnums.add(name), 128 & bindingType && scope.classes.add(name);
  }
  isRedeclaredInScope(scope, name, bindingType) {
    if (scope.enums.has(name)) {
      if (256 & bindingType) {
        return !!(512 & bindingType) !== scope.constEnums.has(name);
      }
      return !0;
    }
    return 128 & bindingType && scope.classes.has(name) ? !!scope.lexical.has(name) && !!(1 & bindingType) : !!(2 & bindingType && scope.types.has(name)) || super.isRedeclaredInScope(...arguments);
  }
  checkLocalExport(id) {
    const topLevelScope = this.scopeStack[0], {name} = id;
    topLevelScope.types.has(name) || topLevelScope.exportOnlyBindings.has(name) || super.checkLocalExport(id);
  }
}

const getOwn$1 = (object, key) => Object.hasOwnProperty.call(object, key) && object[key];

function nonNull(x) {
  if (null == x) throw new Error(`Unexpected ${x} value.`);
  return x;
}

function assert(x) {
  if (!x) throw new Error("Assert fail");
}

const TSErrors = ParseErrorEnum`typescript`((_ => ({
  AbstractMethodHasImplementation: _((({methodName}) => `Method '${methodName}' cannot have an implementation because it is marked abstract.`)),
  AbstractPropertyHasInitializer: _((({propertyName}) => `Property '${propertyName}' cannot have an initializer because it is marked abstract.`)),
  AccesorCannotDeclareThisParameter: _("'get' and 'set' accessors cannot declare 'this' parameters."),
  AccesorCannotHaveTypeParameters: _("An accessor cannot have type parameters."),
  CannotFindName: _((({name}) => `Cannot find name '${name}'.`)),
  ClassMethodHasDeclare: _("Class methods cannot have the 'declare' modifier."),
  ClassMethodHasReadonly: _("Class methods cannot have the 'readonly' modifier."),
  ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference: _("A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference."),
  ConstructorHasTypeParameters: _("Type parameters cannot appear on a constructor declaration."),
  DeclareAccessor: _((({kind}) => `'declare' is not allowed in ${kind}ters.`)),
  DeclareClassFieldHasInitializer: _("Initializers are not allowed in ambient contexts."),
  DeclareFunctionHasImplementation: _("An implementation cannot be declared in ambient contexts."),
  DuplicateAccessibilityModifier: _((({modifier}) => "Accessibility modifier already seen.")),
  DuplicateModifier: _((({modifier}) => `Duplicate modifier: '${modifier}'.`)),
  EmptyHeritageClauseType: _((({token}) => `'${token}' list cannot be empty.`)),
  EmptyTypeArguments: _("Type argument list cannot be empty."),
  EmptyTypeParameters: _("Type parameter list cannot be empty."),
  ExpectedAmbientAfterExportDeclare: _("'export declare' must be followed by an ambient declaration."),
  ImportAliasHasImportType: _("An import alias can not use 'import type'."),
  IncompatibleModifiers: _((({modifiers}) => `'${modifiers[0]}' modifier cannot be used with '${modifiers[1]}' modifier.`)),
  IndexSignatureHasAbstract: _("Index signatures cannot have the 'abstract' modifier."),
  IndexSignatureHasAccessibility: _((({modifier}) => `Index signatures cannot have an accessibility modifier ('${modifier}').`)),
  IndexSignatureHasDeclare: _("Index signatures cannot have the 'declare' modifier."),
  IndexSignatureHasOverride: _("'override' modifier cannot appear on an index signature."),
  IndexSignatureHasStatic: _("Index signatures cannot have the 'static' modifier."),
  InitializerNotAllowedInAmbientContext: _("Initializers are not allowed in ambient contexts."),
  InvalidModifierOnTypeMember: _((({modifier}) => `'${modifier}' modifier cannot appear on a type member.`)),
  InvalidModifiersOrder: _((({orderedModifiers}) => `'${orderedModifiers[0]}' modifier must precede '${orderedModifiers[1]}' modifier.`)),
  InvalidTupleMemberLabel: _("Tuple members must be labeled with a simple identifier."),
  MissingInterfaceName: _("'interface' declarations must be followed by an identifier."),
  MixedLabeledAndUnlabeledElements: _("Tuple members must all have names or all not have names."),
  NonAbstractClassHasAbstractMethod: _("Abstract methods can only appear within an abstract class."),
  NonClassMethodPropertyHasAbstractModifer: _("'abstract' modifier can only appear on a class, method, or property declaration."),
  OptionalTypeBeforeRequired: _("A required element cannot follow an optional element."),
  OverrideNotInSubClass: _("This member cannot have an 'override' modifier because its containing class does not extend another class."),
  PatternIsOptional: _("A binding pattern parameter cannot be optional in an implementation signature."),
  PrivateElementHasAbstract: _("Private elements cannot have the 'abstract' modifier."),
  PrivateElementHasAccessibility: _((({modifier}) => `Private elements cannot have an accessibility modifier ('${modifier}').`)),
  ReadonlyForMethodSignature: _("'readonly' modifier can only appear on a property declaration or index signature."),
  ReservedArrowTypeParam: _("This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`."),
  ReservedTypeAssertion: _("This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead."),
  SetAccesorCannotHaveOptionalParameter: _("A 'set' accessor cannot have an optional parameter."),
  SetAccesorCannotHaveRestParameter: _("A 'set' accessor cannot have rest parameter."),
  SetAccesorCannotHaveReturnType: _("A 'set' accessor cannot have a return type annotation."),
  SingleTypeParameterWithoutTrailingComma: _((({typeParameterName}) => `Single type parameter ${typeParameterName} should have a trailing comma. Example usage: <${typeParameterName},>.`)),
  StaticBlockCannotHaveModifier: _("Static class blocks cannot have any modifier."),
  TypeAnnotationAfterAssign: _("Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`."),
  TypeImportCannotSpecifyDefaultAndNamed: _("A type-only import can specify a default import or named bindings, but not both."),
  TypeModifierIsUsedInTypeExports: _("The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement."),
  TypeModifierIsUsedInTypeImports: _("The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement."),
  UnexpectedParameterModifier: _("A parameter property is only allowed in a constructor implementation."),
  UnexpectedReadonly: _("'readonly' type modifier is only permitted on array and tuple literal types."),
  UnexpectedTypeAnnotation: _("Did not expect a type annotation here."),
  UnexpectedTypeCastInParameter: _("Unexpected type cast in parameter position."),
  UnsupportedImportTypeArgument: _("Argument in a type import must be a string literal."),
  UnsupportedParameterPropertyKind: _("A parameter property may not be declared using a binding pattern."),
  UnsupportedSignatureParameterKind: _((({type}) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${type}.`))
})));

function keywordTypeFromName(value) {
  switch (value) {
   case "any":
    return "TSAnyKeyword";

   case "boolean":
    return "TSBooleanKeyword";

   case "bigint":
    return "TSBigIntKeyword";

   case "never":
    return "TSNeverKeyword";

   case "number":
    return "TSNumberKeyword";

   case "object":
    return "TSObjectKeyword";

   case "string":
    return "TSStringKeyword";

   case "symbol":
    return "TSSymbolKeyword";

   case "undefined":
    return "TSUndefinedKeyword";

   case "unknown":
    return "TSUnknownKeyword";

   default:
    return;
  }
}

function tsIsAccessModifier(modifier) {
  return "private" === modifier || "public" === modifier || "protected" === modifier;
}

var typescript = superClass => class extends superClass {
  getScopeHandler() {
    return TypeScriptScopeHandler;
  }
  tsIsIdentifier() {
    return tokenIsIdentifier(this.state.type);
  }
  tsTokenCanFollowModifier() {
    return (this.match(0) || this.match(5) || this.match(55) || this.match(21) || this.match(134) || this.isLiteralPropertyName()) && !this.hasPrecedingLineBreak();
  }
  tsNextTokenCanFollowModifier() {
    return this.next(), this.tsTokenCanFollowModifier();
  }
  tsParseModifier(allowedModifiers, stopOnStartOfClassStaticBlock) {
    if (!tokenIsIdentifier(this.state.type)) return;
    const modifier = this.state.value;
    if (-1 !== allowedModifiers.indexOf(modifier)) {
      if (stopOnStartOfClassStaticBlock && this.tsIsStartOfStaticBlocks()) return;
      if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) return modifier;
    }
  }
  tsParseModifiers({modified, allowedModifiers, disallowedModifiers, stopOnStartOfClassStaticBlock}) {
    const enforceOrder = (loc, modifier, before, after) => {
      modifier === before && modified[after] && this.raise(TSErrors.InvalidModifiersOrder, {
        at: loc,
        orderedModifiers: [ before, after ]
      });
    }, incompatible = (loc, modifier, mod1, mod2) => {
      (modified[mod1] && modifier === mod2 || modified[mod2] && modifier === mod1) && this.raise(TSErrors.IncompatibleModifiers, {
        at: loc,
        modifiers: [ mod1, mod2 ]
      });
    };
    for (;;) {
      const {startLoc} = this.state, modifier = this.tsParseModifier(allowedModifiers.concat(null != disallowedModifiers ? disallowedModifiers : []), stopOnStartOfClassStaticBlock);
      if (!modifier) break;
      tsIsAccessModifier(modifier) ? modified.accessibility ? this.raise(TSErrors.DuplicateAccessibilityModifier, {
        at: startLoc,
        modifier
      }) : (enforceOrder(startLoc, modifier, modifier, "override"), enforceOrder(startLoc, modifier, modifier, "static"), 
      enforceOrder(startLoc, modifier, modifier, "readonly"), modified.accessibility = modifier) : (Object.hasOwnProperty.call(modified, modifier) ? this.raise(TSErrors.DuplicateModifier, {
        at: startLoc,
        modifier
      }) : (enforceOrder(startLoc, modifier, "static", "readonly"), enforceOrder(startLoc, modifier, "static", "override"), 
      enforceOrder(startLoc, modifier, "override", "readonly"), enforceOrder(startLoc, modifier, "abstract", "override"), 
      incompatible(startLoc, modifier, "declare", "override"), incompatible(startLoc, modifier, "static", "abstract")), 
      modified[modifier] = !0), null != disallowedModifiers && disallowedModifiers.includes(modifier) && this.raise(TSErrors.InvalidModifierOnTypeMember, {
        at: startLoc,
        modifier
      });
    }
  }
  tsIsListTerminator(kind) {
    switch (kind) {
     case "EnumMembers":
     case "TypeMembers":
      return this.match(8);

     case "HeritageClauseElement":
      return this.match(5);

     case "TupleElementTypes":
      return this.match(3);

     case "TypeParametersOrArguments":
      return this.match(48);
    }
    throw new Error("Unreachable");
  }
  tsParseList(kind, parseElement) {
    const result = [];
    for (;!this.tsIsListTerminator(kind); ) result.push(parseElement());
    return result;
  }
  tsParseDelimitedList(kind, parseElement, refTrailingCommaPos) {
    return nonNull(this.tsParseDelimitedListWorker(kind, parseElement, !0, refTrailingCommaPos));
  }
  tsParseDelimitedListWorker(kind, parseElement, expectSuccess, refTrailingCommaPos) {
    const result = [];
    let trailingCommaPos = -1;
    for (;!this.tsIsListTerminator(kind); ) {
      trailingCommaPos = -1;
      const element = parseElement();
      if (null == element) return;
      if (result.push(element), !this.eat(12)) {
        if (this.tsIsListTerminator(kind)) break;
        return void (expectSuccess && this.expect(12));
      }
      trailingCommaPos = this.state.lastTokStart;
    }
    return refTrailingCommaPos && (refTrailingCommaPos.value = trailingCommaPos), result;
  }
  tsParseBracketedList(kind, parseElement, bracket, skipFirstToken, refTrailingCommaPos) {
    skipFirstToken || (bracket ? this.expect(0) : this.expect(47));
    const result = this.tsParseDelimitedList(kind, parseElement, refTrailingCommaPos);
    return bracket ? this.expect(3) : this.expect(48), result;
  }
  tsParseImportType() {
    const node = this.startNode();
    return this.expect(83), this.expect(10), this.match(129) || this.raise(TSErrors.UnsupportedImportTypeArgument, {
      at: this.state.startLoc
    }), node.argument = this.parseExprAtom(), this.expect(11), this.eat(16) && (node.qualifier = this.tsParseEntityName()), 
    this.match(47) && (node.typeParameters = this.tsParseTypeArguments()), this.finishNode(node, "TSImportType");
  }
  tsParseEntityName(allowReservedWords = !0) {
    let entity = this.parseIdentifier(allowReservedWords);
    for (;this.eat(16); ) {
      const node = this.startNodeAtNode(entity);
      node.left = entity, node.right = this.parseIdentifier(allowReservedWords), entity = this.finishNode(node, "TSQualifiedName");
    }
    return entity;
  }
  tsParseTypeReference() {
    const node = this.startNode();
    return node.typeName = this.tsParseEntityName(), !this.hasPrecedingLineBreak() && this.match(47) && (node.typeParameters = this.tsParseTypeArguments()), 
    this.finishNode(node, "TSTypeReference");
  }
  tsParseThisTypePredicate(lhs) {
    this.next();
    const node = this.startNodeAtNode(lhs);
    return node.parameterName = lhs, node.typeAnnotation = this.tsParseTypeAnnotation(!1), 
    node.asserts = !1, this.finishNode(node, "TSTypePredicate");
  }
  tsParseThisTypeNode() {
    const node = this.startNode();
    return this.next(), this.finishNode(node, "TSThisType");
  }
  tsParseTypeQuery() {
    const node = this.startNode();
    return this.expect(87), this.match(83) ? node.exprName = this.tsParseImportType() : node.exprName = this.tsParseEntityName(), 
    this.finishNode(node, "TSTypeQuery");
  }
  tsParseTypeParameter() {
    const node = this.startNode();
    return node.name = this.tsParseTypeParameterName(), node.constraint = this.tsEatThenParseType(81), 
    node.default = this.tsEatThenParseType(29), this.finishNode(node, "TSTypeParameter");
  }
  tsTryParseTypeParameters() {
    if (this.match(47)) return this.tsParseTypeParameters();
  }
  tsParseTypeParameters() {
    const node = this.startNode();
    this.match(47) || this.match(138) ? this.next() : this.unexpected();
    const refTrailingCommaPos = {
      value: -1
    };
    return node.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this), !1, !0, refTrailingCommaPos), 
    0 === node.params.length && this.raise(TSErrors.EmptyTypeParameters, {
      at: node
    }), -1 !== refTrailingCommaPos.value && this.addExtra(node, "trailingComma", refTrailingCommaPos.value), 
    this.finishNode(node, "TSTypeParameterDeclaration");
  }
  tsTryNextParseConstantContext() {
    if (75 !== this.lookahead().type) return null;
    this.next();
    const typeReference = this.tsParseTypeReference();
    return typeReference.typeParameters && this.raise(TSErrors.CannotFindName, {
      at: typeReference.typeName,
      name: "const"
    }), typeReference;
  }
  tsFillSignature(returnToken, signature) {
    const returnTokenRequired = 19 === returnToken;
    signature.typeParameters = this.tsTryParseTypeParameters(), this.expect(10), signature.parameters = this.tsParseBindingListForSignature(), 
    (returnTokenRequired || this.match(returnToken)) && (signature.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(returnToken));
  }
  tsParseBindingListForSignature() {
    return this.parseBindingList(11, 41).map((pattern => ("Identifier" !== pattern.type && "RestElement" !== pattern.type && "ObjectPattern" !== pattern.type && "ArrayPattern" !== pattern.type && this.raise(TSErrors.UnsupportedSignatureParameterKind, {
      at: pattern,
      type: pattern.type
    }), pattern)));
  }
  tsParseTypeMemberSemicolon() {
    this.eat(12) || this.isLineTerminator() || this.expect(13);
  }
  tsParseSignatureMember(kind, node) {
    return this.tsFillSignature(14, node), this.tsParseTypeMemberSemicolon(), this.finishNode(node, kind);
  }
  tsIsUnambiguouslyIndexSignature() {
    return this.next(), !!tokenIsIdentifier(this.state.type) && (this.next(), this.match(14));
  }
  tsTryParseIndexSignature(node) {
    if (!this.match(0) || !this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))) return;
    this.expect(0);
    const id = this.parseIdentifier();
    id.typeAnnotation = this.tsParseTypeAnnotation(), this.resetEndLocation(id), this.expect(3), 
    node.parameters = [ id ];
    const type = this.tsTryParseTypeAnnotation();
    return type && (node.typeAnnotation = type), this.tsParseTypeMemberSemicolon(), 
    this.finishNode(node, "TSIndexSignature");
  }
  tsParsePropertyOrMethodSignature(node, readonly) {
    this.eat(17) && (node.optional = !0);
    const nodeAny = node;
    if (this.match(10) || this.match(47)) {
      readonly && this.raise(TSErrors.ReadonlyForMethodSignature, {
        at: node
      });
      const method = nodeAny;
      method.kind && this.match(47) && this.raise(TSErrors.AccesorCannotHaveTypeParameters, {
        at: this.state.curPosition()
      }), this.tsFillSignature(14, method), this.tsParseTypeMemberSemicolon();
      const paramsKey = "parameters", returnTypeKey = "typeAnnotation";
      if ("get" === method.kind) method[paramsKey].length > 0 && (this.raise(Errors.BadGetterArity, {
        at: this.state.curPosition()
      }), this.isThisParam(method[paramsKey][0]) && this.raise(TSErrors.AccesorCannotDeclareThisParameter, {
        at: this.state.curPosition()
      })); else if ("set" === method.kind) {
        if (1 !== method[paramsKey].length) this.raise(Errors.BadSetterArity, {
          at: this.state.curPosition()
        }); else {
          const firstParameter = method[paramsKey][0];
          this.isThisParam(firstParameter) && this.raise(TSErrors.AccesorCannotDeclareThisParameter, {
            at: this.state.curPosition()
          }), "Identifier" === firstParameter.type && firstParameter.optional && this.raise(TSErrors.SetAccesorCannotHaveOptionalParameter, {
            at: this.state.curPosition()
          }), "RestElement" === firstParameter.type && this.raise(TSErrors.SetAccesorCannotHaveRestParameter, {
            at: this.state.curPosition()
          });
        }
        method[returnTypeKey] && this.raise(TSErrors.SetAccesorCannotHaveReturnType, {
          at: method[returnTypeKey]
        });
      } else method.kind = "method";
      return this.finishNode(method, "TSMethodSignature");
    }
    {
      const property = nodeAny;
      readonly && (property.readonly = !0);
      const type = this.tsTryParseTypeAnnotation();
      return type && (property.typeAnnotation = type), this.tsParseTypeMemberSemicolon(), 
      this.finishNode(property, "TSPropertySignature");
    }
  }
  tsParseTypeMember() {
    const node = this.startNode();
    if (this.match(10) || this.match(47)) return this.tsParseSignatureMember("TSCallSignatureDeclaration", node);
    if (this.match(77)) {
      const id = this.startNode();
      return this.next(), this.match(10) || this.match(47) ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", node) : (node.key = this.createIdentifier(id, "new"), 
      this.tsParsePropertyOrMethodSignature(node, !1));
    }
    this.tsParseModifiers({
      modified: node,
      allowedModifiers: [ "readonly" ],
      disallowedModifiers: [ "declare", "abstract", "private", "protected", "public", "static", "override" ]
    });
    const idx = this.tsTryParseIndexSignature(node);
    return idx || (this.parsePropertyName(node), node.computed || "Identifier" !== node.key.type || "get" !== node.key.name && "set" !== node.key.name || !this.tsTokenCanFollowModifier() || (node.kind = node.key.name, 
    this.parsePropertyName(node)), this.tsParsePropertyOrMethodSignature(node, !!node.readonly));
  }
  tsParseTypeLiteral() {
    const node = this.startNode();
    return node.members = this.tsParseObjectTypeMembers(), this.finishNode(node, "TSTypeLiteral");
  }
  tsParseObjectTypeMembers() {
    this.expect(5);
    const members = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
    return this.expect(8), members;
  }
  tsIsStartOfMappedType() {
    return this.next(), this.eat(53) ? this.isContextual(118) : (this.isContextual(118) && this.next(), 
    !!this.match(0) && (this.next(), !!this.tsIsIdentifier() && (this.next(), this.match(58))));
  }
  tsParseMappedTypeParameter() {
    const node = this.startNode();
    return node.name = this.tsParseTypeParameterName(), node.constraint = this.tsExpectThenParseType(58), 
    this.finishNode(node, "TSTypeParameter");
  }
  tsParseMappedType() {
    const node = this.startNode();
    return this.expect(5), this.match(53) ? (node.readonly = this.state.value, this.next(), 
    this.expectContextual(118)) : this.eatContextual(118) && (node.readonly = !0), this.expect(0), 
    node.typeParameter = this.tsParseMappedTypeParameter(), node.nameType = this.eatContextual(93) ? this.tsParseType() : null, 
    this.expect(3), this.match(53) ? (node.optional = this.state.value, this.next(), 
    this.expect(17)) : this.eat(17) && (node.optional = !0), node.typeAnnotation = this.tsTryParseType(), 
    this.semicolon(), this.expect(8), this.finishNode(node, "TSMappedType");
  }
  tsParseTupleType() {
    const node = this.startNode();
    node.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), !0, !1);
    let seenOptionalElement = !1, labeledElements = null;
    return node.elementTypes.forEach((elementNode => {
      var _labeledElements;
      let {type} = elementNode;
      !seenOptionalElement || "TSRestType" === type || "TSOptionalType" === type || "TSNamedTupleMember" === type && elementNode.optional || this.raise(TSErrors.OptionalTypeBeforeRequired, {
        at: elementNode
      }), seenOptionalElement = seenOptionalElement || "TSNamedTupleMember" === type && elementNode.optional || "TSOptionalType" === type, 
      "TSRestType" === type && (type = (elementNode = elementNode.typeAnnotation).type);
      const isLabeled = "TSNamedTupleMember" === type;
      labeledElements = null != (_labeledElements = labeledElements) ? _labeledElements : isLabeled, 
      labeledElements !== isLabeled && this.raise(TSErrors.MixedLabeledAndUnlabeledElements, {
        at: elementNode
      });
    })), this.finishNode(node, "TSTupleType");
  }
  tsParseTupleElementType() {
    const {start: startPos, startLoc} = this.state, rest = this.eat(21);
    let type = this.tsParseType();
    const optional = this.eat(17);
    if (this.eat(14)) {
      const labeledNode = this.startNodeAtNode(type);
      labeledNode.optional = optional, "TSTypeReference" !== type.type || type.typeParameters || "Identifier" !== type.typeName.type ? (this.raise(TSErrors.InvalidTupleMemberLabel, {
        at: type
      }), labeledNode.label = type) : labeledNode.label = type.typeName, labeledNode.elementType = this.tsParseType(), 
      type = this.finishNode(labeledNode, "TSNamedTupleMember");
    } else if (optional) {
      const optionalTypeNode = this.startNodeAtNode(type);
      optionalTypeNode.typeAnnotation = type, type = this.finishNode(optionalTypeNode, "TSOptionalType");
    }
    if (rest) {
      const restNode = this.startNodeAt(startPos, startLoc);
      restNode.typeAnnotation = type, type = this.finishNode(restNode, "TSRestType");
    }
    return type;
  }
  tsParseParenthesizedType() {
    const node = this.startNode();
    return this.expect(10), node.typeAnnotation = this.tsParseType(), this.expect(11), 
    this.finishNode(node, "TSParenthesizedType");
  }
  tsParseFunctionOrConstructorType(type, abstract) {
    const node = this.startNode();
    return "TSConstructorType" === type && (node.abstract = !!abstract, abstract && this.next(), 
    this.next()), this.tsFillSignature(19, node), this.finishNode(node, type);
  }
  tsParseLiteralTypeNode() {
    const node = this.startNode();
    return node.literal = (() => {
      switch (this.state.type) {
       case 130:
       case 131:
       case 129:
       case 85:
       case 86:
        return this.parseExprAtom();

       default:
        throw this.unexpected();
      }
    })(), this.finishNode(node, "TSLiteralType");
  }
  tsParseTemplateLiteralType() {
    const node = this.startNode();
    return node.literal = this.parseTemplate(!1), this.finishNode(node, "TSLiteralType");
  }
  parseTemplateSubstitution() {
    return this.state.inType ? this.tsParseType() : super.parseTemplateSubstitution();
  }
  tsParseThisTypeOrThisTypePredicate() {
    const thisKeyword = this.tsParseThisTypeNode();
    return this.isContextual(113) && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(thisKeyword) : thisKeyword;
  }
  tsParseNonArrayType() {
    switch (this.state.type) {
     case 129:
     case 130:
     case 131:
     case 85:
     case 86:
      return this.tsParseLiteralTypeNode();

     case 53:
      if ("-" === this.state.value) {
        const node = this.startNode(), nextToken = this.lookahead();
        if (130 !== nextToken.type && 131 !== nextToken.type) throw this.unexpected();
        return node.literal = this.parseMaybeUnary(), this.finishNode(node, "TSLiteralType");
      }
      break;

     case 78:
      return this.tsParseThisTypeOrThisTypePredicate();

     case 87:
      return this.tsParseTypeQuery();

     case 83:
      return this.tsParseImportType();

     case 5:
      return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();

     case 0:
      return this.tsParseTupleType();

     case 10:
      return this.tsParseParenthesizedType();

     case 25:
     case 24:
      return this.tsParseTemplateLiteralType();

     default:
      {
        const {type} = this.state;
        if (tokenIsIdentifier(type) || 88 === type || 84 === type) {
          const nodeType = 88 === type ? "TSVoidKeyword" : 84 === type ? "TSNullKeyword" : keywordTypeFromName(this.state.value);
          if (void 0 !== nodeType && 46 !== this.lookaheadCharCode()) {
            const node = this.startNode();
            return this.next(), this.finishNode(node, nodeType);
          }
          return this.tsParseTypeReference();
        }
      }
    }
    throw this.unexpected();
  }
  tsParseArrayTypeOrHigher() {
    let type = this.tsParseNonArrayType();
    for (;!this.hasPrecedingLineBreak() && this.eat(0); ) if (this.match(3)) {
      const node = this.startNodeAtNode(type);
      node.elementType = type, this.expect(3), type = this.finishNode(node, "TSArrayType");
    } else {
      const node = this.startNodeAtNode(type);
      node.objectType = type, node.indexType = this.tsParseType(), this.expect(3), type = this.finishNode(node, "TSIndexedAccessType");
    }
    return type;
  }
  tsParseTypeOperator() {
    const node = this.startNode(), operator = this.state.value;
    return this.next(), node.operator = operator, node.typeAnnotation = this.tsParseTypeOperatorOrHigher(), 
    "readonly" === operator && this.tsCheckTypeAnnotationForReadOnly(node), this.finishNode(node, "TSTypeOperator");
  }
  tsCheckTypeAnnotationForReadOnly(node) {
    switch (node.typeAnnotation.type) {
     case "TSTupleType":
     case "TSArrayType":
      return;

     default:
      this.raise(TSErrors.UnexpectedReadonly, {
        at: node
      });
    }
  }
  tsParseInferType() {
    const node = this.startNode();
    this.expectContextual(112);
    const typeParameter = this.startNode();
    return typeParameter.name = this.tsParseTypeParameterName(), node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter"), 
    this.finishNode(node, "TSInferType");
  }
  tsParseTypeOperatorOrHigher() {
    return tokenIsTSTypeOperator(this.state.type) && !this.state.containsEsc ? this.tsParseTypeOperator() : this.isContextual(112) ? this.tsParseInferType() : this.tsParseArrayTypeOrHigher();
  }
  tsParseUnionOrIntersectionType(kind, parseConstituentType, operator) {
    const node = this.startNode(), hasLeadingOperator = this.eat(operator), types = [];
    do {
      types.push(parseConstituentType());
    } while (this.eat(operator));
    return 1 !== types.length || hasLeadingOperator ? (node.types = types, this.finishNode(node, kind)) : types[0];
  }
  tsParseIntersectionTypeOrHigher() {
    return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), 45);
  }
  tsParseUnionTypeOrHigher() {
    return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), 43);
  }
  tsIsStartOfFunctionType() {
    return !!this.match(47) || this.match(10) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
  }
  tsSkipParameterStart() {
    if (tokenIsIdentifier(this.state.type) || this.match(78)) return this.next(), !0;
    if (this.match(5)) {
      const {errors} = this.state, previousErrorCount = errors.length;
      try {
        return this.parseObjectLike(8, !0), errors.length === previousErrorCount;
      } catch (_unused) {
        return !1;
      }
    }
    if (this.match(0)) {
      this.next();
      const {errors} = this.state, previousErrorCount = errors.length;
      try {
        return this.parseBindingList(3, 93, !0), errors.length === previousErrorCount;
      } catch (_unused2) {
        return !1;
      }
    }
    return !1;
  }
  tsIsUnambiguouslyStartOfFunctionType() {
    if (this.next(), this.match(11) || this.match(21)) return !0;
    if (this.tsSkipParameterStart()) {
      if (this.match(14) || this.match(12) || this.match(17) || this.match(29)) return !0;
      if (this.match(11) && (this.next(), this.match(19))) return !0;
    }
    return !1;
  }
  tsParseTypeOrTypePredicateAnnotation(returnToken) {
    return this.tsInType((() => {
      const t = this.startNode();
      this.expect(returnToken);
      const node = this.startNode(), asserts = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
      if (asserts && this.match(78)) {
        let thisTypePredicate = this.tsParseThisTypeOrThisTypePredicate();
        return "TSThisType" === thisTypePredicate.type ? (node.parameterName = thisTypePredicate, 
        node.asserts = !0, node.typeAnnotation = null, thisTypePredicate = this.finishNode(node, "TSTypePredicate")) : (this.resetStartLocationFromNode(thisTypePredicate, node), 
        thisTypePredicate.asserts = !0), t.typeAnnotation = thisTypePredicate, this.finishNode(t, "TSTypeAnnotation");
      }
      const typePredicateVariable = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
      if (!typePredicateVariable) return asserts ? (node.parameterName = this.parseIdentifier(), 
      node.asserts = asserts, node.typeAnnotation = null, t.typeAnnotation = this.finishNode(node, "TSTypePredicate"), 
      this.finishNode(t, "TSTypeAnnotation")) : this.tsParseTypeAnnotation(!1, t);
      const type = this.tsParseTypeAnnotation(!1);
      return node.parameterName = typePredicateVariable, node.typeAnnotation = type, node.asserts = asserts, 
      t.typeAnnotation = this.finishNode(node, "TSTypePredicate"), this.finishNode(t, "TSTypeAnnotation");
    }));
  }
  tsTryParseTypeOrTypePredicateAnnotation() {
    return this.match(14) ? this.tsParseTypeOrTypePredicateAnnotation(14) : void 0;
  }
  tsTryParseTypeAnnotation() {
    return this.match(14) ? this.tsParseTypeAnnotation() : void 0;
  }
  tsTryParseType() {
    return this.tsEatThenParseType(14);
  }
  tsParseTypePredicatePrefix() {
    const id = this.parseIdentifier();
    if (this.isContextual(113) && !this.hasPrecedingLineBreak()) return this.next(), 
    id;
  }
  tsParseTypePredicateAsserts() {
    if (106 !== this.state.type) return !1;
    const containsEsc = this.state.containsEsc;
    return this.next(), !(!tokenIsIdentifier(this.state.type) && !this.match(78)) && (containsEsc && this.raise(Errors.InvalidEscapedReservedWord, {
      at: this.state.lastTokStartLoc,
      reservedWord: "asserts"
    }), !0);
  }
  tsParseTypeAnnotation(eatColon = !0, t = this.startNode()) {
    return this.tsInType((() => {
      eatColon && this.expect(14), t.typeAnnotation = this.tsParseType();
    })), this.finishNode(t, "TSTypeAnnotation");
  }
  tsParseType() {
    assert(this.state.inType);
    const type = this.tsParseNonConditionalType();
    if (this.hasPrecedingLineBreak() || !this.eat(81)) return type;
    const node = this.startNodeAtNode(type);
    return node.checkType = type, node.extendsType = this.tsParseNonConditionalType(), 
    this.expect(17), node.trueType = this.tsParseType(), this.expect(14), node.falseType = this.tsParseType(), 
    this.finishNode(node, "TSConditionalType");
  }
  isAbstractConstructorSignature() {
    return this.isContextual(120) && 77 === this.lookahead().type;
  }
  tsParseNonConditionalType() {
    return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(77) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.isAbstractConstructorSignature() ? this.tsParseFunctionOrConstructorType("TSConstructorType", !0) : this.tsParseUnionTypeOrHigher();
  }
  tsParseTypeAssertion() {
    this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(TSErrors.ReservedTypeAssertion, {
      at: this.state.startLoc
    });
    const node = this.startNode(), _const = this.tsTryNextParseConstantContext();
    return node.typeAnnotation = _const || this.tsNextThenParseType(), this.expect(48), 
    node.expression = this.parseMaybeUnary(), this.finishNode(node, "TSTypeAssertion");
  }
  tsParseHeritageClause(token) {
    const originalStartLoc = this.state.startLoc, delimitedList = this.tsParseDelimitedList("HeritageClauseElement", this.tsParseExpressionWithTypeArguments.bind(this));
    return delimitedList.length || this.raise(TSErrors.EmptyHeritageClauseType, {
      at: originalStartLoc,
      token
    }), delimitedList;
  }
  tsParseExpressionWithTypeArguments() {
    const node = this.startNode();
    return node.expression = this.tsParseEntityName(), this.match(47) && (node.typeParameters = this.tsParseTypeArguments()), 
    this.finishNode(node, "TSExpressionWithTypeArguments");
  }
  tsParseInterfaceDeclaration(node, properties = {}) {
    if (this.hasFollowingLineBreak()) return null;
    this.expectContextual(125), properties.declare && (node.declare = !0), tokenIsIdentifier(this.state.type) ? (node.id = this.parseIdentifier(), 
    this.checkIdentifier(node.id, 130)) : (node.id = null, this.raise(TSErrors.MissingInterfaceName, {
      at: this.state.startLoc
    })), node.typeParameters = this.tsTryParseTypeParameters(), this.eat(81) && (node.extends = this.tsParseHeritageClause("extends"));
    const body = this.startNode();
    return body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this)), node.body = this.finishNode(body, "TSInterfaceBody"), 
    this.finishNode(node, "TSInterfaceDeclaration");
  }
  tsParseTypeAliasDeclaration(node) {
    return node.id = this.parseIdentifier(), this.checkIdentifier(node.id, 2), node.typeAnnotation = this.tsInType((() => {
      if (node.typeParameters = this.tsTryParseTypeParameters(), this.expect(29), this.isContextual(111) && 16 !== this.lookahead().type) {
        const node = this.startNode();
        return this.next(), this.finishNode(node, "TSIntrinsicKeyword");
      }
      return this.tsParseType();
    })), this.semicolon(), this.finishNode(node, "TSTypeAliasDeclaration");
  }
  tsInNoContext(cb) {
    const oldContext = this.state.context;
    this.state.context = [ oldContext[0] ];
    try {
      return cb();
    } finally {
      this.state.context = oldContext;
    }
  }
  tsInType(cb) {
    const oldInType = this.state.inType;
    this.state.inType = !0;
    try {
      return cb();
    } finally {
      this.state.inType = oldInType;
    }
  }
  tsEatThenParseType(token) {
    return this.match(token) ? this.tsNextThenParseType() : void 0;
  }
  tsExpectThenParseType(token) {
    return this.tsDoThenParseType((() => this.expect(token)));
  }
  tsNextThenParseType() {
    return this.tsDoThenParseType((() => this.next()));
  }
  tsDoThenParseType(cb) {
    return this.tsInType((() => (cb(), this.tsParseType())));
  }
  tsParseEnumMember() {
    const node = this.startNode();
    return node.id = this.match(129) ? this.parseExprAtom() : this.parseIdentifier(!0), 
    this.eat(29) && (node.initializer = this.parseMaybeAssignAllowIn()), this.finishNode(node, "TSEnumMember");
  }
  tsParseEnumDeclaration(node, properties = {}) {
    return properties.const && (node.const = !0), properties.declare && (node.declare = !0), 
    this.expectContextual(122), node.id = this.parseIdentifier(), this.checkIdentifier(node.id, node.const ? 779 : 267), 
    this.expect(5), node.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), 
    this.expect(8), this.finishNode(node, "TSEnumDeclaration");
  }
  tsParseModuleBlock() {
    const node = this.startNode();
    return this.scope.enter(0), this.expect(5), this.parseBlockOrModuleBlockBody(node.body = [], void 0, !0, 8), 
    this.scope.exit(), this.finishNode(node, "TSModuleBlock");
  }
  tsParseModuleOrNamespaceDeclaration(node, nested = !1) {
    if (node.id = this.parseIdentifier(), nested || this.checkIdentifier(node.id, 1024), 
    this.eat(16)) {
      const inner = this.startNode();
      this.tsParseModuleOrNamespaceDeclaration(inner, !0), node.body = inner;
    } else this.scope.enter(256), this.prodParam.enter(0), node.body = this.tsParseModuleBlock(), 
    this.prodParam.exit(), this.scope.exit();
    return this.finishNode(node, "TSModuleDeclaration");
  }
  tsParseAmbientExternalModuleDeclaration(node) {
    return this.isContextual(109) ? (node.global = !0, node.id = this.parseIdentifier()) : this.match(129) ? node.id = this.parseExprAtom() : this.unexpected(), 
    this.match(5) ? (this.scope.enter(256), this.prodParam.enter(0), node.body = this.tsParseModuleBlock(), 
    this.prodParam.exit(), this.scope.exit()) : this.semicolon(), this.finishNode(node, "TSModuleDeclaration");
  }
  tsParseImportEqualsDeclaration(node, isExport) {
    node.isExport = isExport || !1, node.id = this.parseIdentifier(), this.checkIdentifier(node.id, 9), 
    this.expect(29);
    const moduleReference = this.tsParseModuleReference();
    return "type" === node.importKind && "TSExternalModuleReference" !== moduleReference.type && this.raise(TSErrors.ImportAliasHasImportType, {
      at: moduleReference
    }), node.moduleReference = moduleReference, this.semicolon(), this.finishNode(node, "TSImportEqualsDeclaration");
  }
  tsIsExternalModuleReference() {
    return this.isContextual(116) && 40 === this.lookaheadCharCode();
  }
  tsParseModuleReference() {
    return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(!1);
  }
  tsParseExternalModuleReference() {
    const node = this.startNode();
    if (this.expectContextual(116), this.expect(10), !this.match(129)) throw this.unexpected();
    return node.expression = this.parseExprAtom(), this.expect(11), this.finishNode(node, "TSExternalModuleReference");
  }
  tsLookAhead(f) {
    const state = this.state.clone(), res = f();
    return this.state = state, res;
  }
  tsTryParseAndCatch(f) {
    const result = this.tryParse((abort => f() || abort()));
    if (!result.aborted && result.node) return result.error && (this.state = result.failState), 
    result.node;
  }
  tsTryParse(f) {
    const state = this.state.clone(), result = f();
    return void 0 !== result && !1 !== result ? result : void (this.state = state);
  }
  tsTryParseDeclare(nany) {
    if (this.isLineTerminator()) return;
    let kind, starttype = this.state.type;
    return this.isContextual(99) && (starttype = 74, kind = "let"), this.tsInAmbientContext((() => {
      if (68 === starttype) return nany.declare = !0, this.parseFunctionStatement(nany, !1, !0);
      if (80 === starttype) return nany.declare = !0, this.parseClass(nany, !0, !1);
      if (122 === starttype) return this.tsParseEnumDeclaration(nany, {
        declare: !0
      });
      if (109 === starttype) return this.tsParseAmbientExternalModuleDeclaration(nany);
      if (75 === starttype || 74 === starttype) return this.match(75) && this.isLookaheadContextual("enum") ? (this.expect(75), 
      this.tsParseEnumDeclaration(nany, {
        const: !0,
        declare: !0
      })) : (nany.declare = !0, this.parseVarStatement(nany, kind || this.state.value, !0));
      if (125 === starttype) {
        const result = this.tsParseInterfaceDeclaration(nany, {
          declare: !0
        });
        if (result) return result;
      }
      return tokenIsIdentifier(starttype) ? this.tsParseDeclaration(nany, this.state.value, !0) : void 0;
    }));
  }
  tsTryParseExportDeclaration() {
    return this.tsParseDeclaration(this.startNode(), this.state.value, !0);
  }
  tsParseExpressionStatement(node, expr) {
    switch (expr.name) {
     case "declare":
      {
        const declaration = this.tsTryParseDeclare(node);
        if (declaration) return declaration.declare = !0, declaration;
        break;
      }

     case "global":
      if (this.match(5)) {
        this.scope.enter(256), this.prodParam.enter(0);
        const mod = node;
        return mod.global = !0, mod.id = expr, mod.body = this.tsParseModuleBlock(), this.scope.exit(), 
        this.prodParam.exit(), this.finishNode(mod, "TSModuleDeclaration");
      }
      break;

     default:
      return this.tsParseDeclaration(node, expr.name, !1);
    }
  }
  tsParseDeclaration(node, value, next) {
    switch (value) {
     case "abstract":
      if (this.tsCheckLineTerminator(next) && (this.match(80) || tokenIsIdentifier(this.state.type))) return this.tsParseAbstractDeclaration(node);
      break;

     case "module":
      if (this.tsCheckLineTerminator(next)) {
        if (this.match(129)) return this.tsParseAmbientExternalModuleDeclaration(node);
        if (tokenIsIdentifier(this.state.type)) return this.tsParseModuleOrNamespaceDeclaration(node);
      }
      break;

     case "namespace":
      if (this.tsCheckLineTerminator(next) && tokenIsIdentifier(this.state.type)) return this.tsParseModuleOrNamespaceDeclaration(node);
      break;

     case "type":
      if (this.tsCheckLineTerminator(next) && tokenIsIdentifier(this.state.type)) return this.tsParseTypeAliasDeclaration(node);
    }
  }
  tsCheckLineTerminator(next) {
    return next ? !this.hasFollowingLineBreak() && (this.next(), !0) : !this.isLineTerminator();
  }
  tsTryParseGenericAsyncArrowFunction(startPos, startLoc) {
    if (!this.match(47)) return;
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    this.state.maybeInArrowParameters = !0;
    const res = this.tsTryParseAndCatch((() => {
      const node = this.startNodeAt(startPos, startLoc);
      return node.typeParameters = this.tsParseTypeParameters(), super.parseFunctionParams(node), 
      node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(), this.expect(19), 
      node;
    }));
    return this.state.maybeInArrowParameters = oldMaybeInArrowParameters, res ? this.parseArrowExpression(res, null, !0) : void 0;
  }
  tsParseTypeArgumentsInExpression() {
    if (47 === this.reScan_lt()) return this.tsParseTypeArguments();
  }
  tsParseTypeArguments() {
    const node = this.startNode();
    return node.params = this.tsInType((() => this.tsInNoContext((() => (this.expect(47), 
    this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))))), 
    0 === node.params.length && this.raise(TSErrors.EmptyTypeArguments, {
      at: node
    }), this.expect(48), this.finishNode(node, "TSTypeParameterInstantiation");
  }
  tsIsDeclarationStart() {
    return tokenIsTSDeclarationStart(this.state.type);
  }
  isExportDefaultSpecifier() {
    return !this.tsIsDeclarationStart() && super.isExportDefaultSpecifier();
  }
  parseAssignableListItem(allowModifiers, decorators) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let accessibility, readonly = !1, override = !1;
    if (void 0 !== allowModifiers) {
      const modified = {};
      this.tsParseModifiers({
        modified,
        allowedModifiers: [ "public", "private", "protected", "override", "readonly" ]
      }), accessibility = modified.accessibility, override = modified.override, readonly = modified.readonly, 
      !1 === allowModifiers && (accessibility || readonly || override) && this.raise(TSErrors.UnexpectedParameterModifier, {
        at: startLoc
      });
    }
    const left = this.parseMaybeDefault();
    this.parseAssignableListItemTypes(left);
    const elt = this.parseMaybeDefault(left.start, left.loc.start, left);
    if (accessibility || readonly || override) {
      const pp = this.startNodeAt(startPos, startLoc);
      return decorators.length && (pp.decorators = decorators), accessibility && (pp.accessibility = accessibility), 
      readonly && (pp.readonly = readonly), override && (pp.override = override), "Identifier" !== elt.type && "AssignmentPattern" !== elt.type && this.raise(TSErrors.UnsupportedParameterPropertyKind, {
        at: pp
      }), pp.parameter = elt, this.finishNode(pp, "TSParameterProperty");
    }
    return decorators.length && (left.decorators = decorators), elt;
  }
  isSimpleParameter(node) {
    return "TSParameterProperty" === node.type && super.isSimpleParameter(node.parameter) || super.isSimpleParameter(node);
  }
  parseFunctionBodyAndFinish(node, type, isMethod = !1) {
    this.match(14) && (node.returnType = this.tsParseTypeOrTypePredicateAnnotation(14));
    const bodilessType = "FunctionDeclaration" === type ? "TSDeclareFunction" : "ClassMethod" === type || "ClassPrivateMethod" === type ? "TSDeclareMethod" : void 0;
    bodilessType && !this.match(5) && this.isLineTerminator() ? this.finishNode(node, bodilessType) : "TSDeclareFunction" === bodilessType && this.state.isAmbientContext && (this.raise(TSErrors.DeclareFunctionHasImplementation, {
      at: node
    }), node.declare) ? super.parseFunctionBodyAndFinish(node, bodilessType, isMethod) : super.parseFunctionBodyAndFinish(node, type, isMethod);
  }
  registerFunctionStatementId(node) {
    !node.body && node.id ? this.checkIdentifier(node.id, 1024) : super.registerFunctionStatementId(...arguments);
  }
  tsCheckForInvalidTypeCasts(items) {
    items.forEach((node => {
      "TSTypeCastExpression" === (null == node ? void 0 : node.type) && this.raise(TSErrors.UnexpectedTypeAnnotation, {
        at: node.typeAnnotation
      });
    }));
  }
  toReferencedList(exprList, isInParens) {
    return this.tsCheckForInvalidTypeCasts(exprList), exprList;
  }
  parseArrayLike(...args) {
    const node = super.parseArrayLike(...args);
    return "ArrayExpression" === node.type && this.tsCheckForInvalidTypeCasts(node.elements), 
    node;
  }
  parseSubscript(base, startPos, startLoc, noCalls, state) {
    if (!this.hasPrecedingLineBreak() && this.match(35)) {
      this.state.canStartJSXElement = !1, this.next();
      const nonNullExpression = this.startNodeAt(startPos, startLoc);
      return nonNullExpression.expression = base, this.finishNode(nonNullExpression, "TSNonNullExpression");
    }
    let isOptionalCall = !1;
    if (this.match(18) && 60 === this.lookaheadCharCode()) {
      if (noCalls) return state.stop = !0, base;
      state.optionalChainMember = isOptionalCall = !0, this.next();
    }
    if (this.match(47) || this.match(51)) {
      let missingParenErrorLoc;
      const result = this.tsTryParseAndCatch((() => {
        if (!noCalls && this.atPossibleAsyncArrow(base)) {
          const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(startPos, startLoc);
          if (asyncArrowFn) return asyncArrowFn;
        }
        const node = this.startNodeAt(startPos, startLoc);
        node.callee = base;
        const typeArguments = this.tsParseTypeArgumentsInExpression();
        if (typeArguments) {
          if (isOptionalCall && !this.match(10) && (missingParenErrorLoc = this.state.curPosition(), 
          this.unexpected()), !noCalls && this.eat(10)) return node.arguments = this.parseCallExpressionArguments(11, !1), 
          this.tsCheckForInvalidTypeCasts(node.arguments), node.typeParameters = typeArguments, 
          state.optionalChainMember && (node.optional = isOptionalCall), this.finishCallExpression(node, state.optionalChainMember);
          if (tokenIsTemplate(this.state.type)) {
            const result = this.parseTaggedTemplateExpression(base, startPos, startLoc, state);
            return result.typeParameters = typeArguments, result;
          }
        }
        this.unexpected();
      }));
      if (missingParenErrorLoc && this.unexpected(missingParenErrorLoc, 10), result) return result;
    }
    return super.parseSubscript(base, startPos, startLoc, noCalls, state);
  }
  parseNewArguments(node) {
    if (this.match(47) || this.match(51)) {
      const typeParameters = this.tsTryParseAndCatch((() => {
        const args = this.tsParseTypeArgumentsInExpression();
        return this.match(10) || this.unexpected(), args;
      }));
      typeParameters && (node.typeParameters = typeParameters);
    }
    super.parseNewArguments(node);
  }
  parseExprOp(left, leftStartPos, leftStartLoc, minPrec) {
    if (tokenOperatorPrecedence(58) > minPrec && !this.hasPrecedingLineBreak() && this.isContextual(93)) {
      const node = this.startNodeAt(leftStartPos, leftStartLoc);
      node.expression = left;
      const _const = this.tsTryNextParseConstantContext();
      return node.typeAnnotation = _const || this.tsNextThenParseType(), this.finishNode(node, "TSAsExpression"), 
      this.reScan_lt_gt(), this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec);
    }
    return super.parseExprOp(left, leftStartPos, leftStartLoc, minPrec);
  }
  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
    this.state.isAmbientContext || super.checkReservedWord(word, startLoc, checkKeywords, isBinding);
  }
  checkDuplicateExports() {}
  parseImport(node) {
    if (node.importKind = "value", tokenIsIdentifier(this.state.type) || this.match(55) || this.match(5)) {
      let ahead = this.lookahead();
      if (this.isContextual(126) && 12 !== ahead.type && 97 !== ahead.type && 29 !== ahead.type && (node.importKind = "type", 
      this.next(), ahead = this.lookahead()), tokenIsIdentifier(this.state.type) && 29 === ahead.type) return this.tsParseImportEqualsDeclaration(node);
    }
    const importNode = super.parseImport(node);
    return "type" === importNode.importKind && importNode.specifiers.length > 1 && "ImportDefaultSpecifier" === importNode.specifiers[0].type && this.raise(TSErrors.TypeImportCannotSpecifyDefaultAndNamed, {
      at: importNode
    }), importNode;
  }
  parseExport(node) {
    if (this.match(83)) return this.next(), this.isContextual(126) && 61 !== this.lookaheadCharCode() ? (node.importKind = "type", 
    this.next()) : node.importKind = "value", this.tsParseImportEqualsDeclaration(node, !0);
    if (this.eat(29)) {
      const assign = node;
      return assign.expression = this.parseExpression(), this.semicolon(), this.finishNode(assign, "TSExportAssignment");
    }
    if (this.eatContextual(93)) {
      const decl = node;
      return this.expectContextual(124), decl.id = this.parseIdentifier(), this.semicolon(), 
      this.finishNode(decl, "TSNamespaceExportDeclaration");
    }
    return this.isContextual(126) && 5 === this.lookahead().type ? (this.next(), node.exportKind = "type") : node.exportKind = "value", 
    super.parseExport(node);
  }
  isAbstractClass() {
    return this.isContextual(120) && 80 === this.lookahead().type;
  }
  parseExportDefaultExpression() {
    if (this.isAbstractClass()) {
      const cls = this.startNode();
      return this.next(), cls.abstract = !0, this.parseClass(cls, !0, !0), cls;
    }
    if (this.match(125)) {
      const result = this.tsParseInterfaceDeclaration(this.startNode());
      if (result) return result;
    }
    return super.parseExportDefaultExpression();
  }
  parseVarStatement(node, kind, allowMissingInitializer = !1) {
    const {isAmbientContext} = this.state, declaration = super.parseVarStatement(node, kind, allowMissingInitializer || isAmbientContext);
    if (!isAmbientContext) return declaration;
    for (const {id, init} of declaration.declarations) init && ("const" !== kind || id.typeAnnotation ? this.raise(TSErrors.InitializerNotAllowedInAmbientContext, {
      at: init
    }) : "StringLiteral" !== init.type && "BooleanLiteral" !== init.type && "NumericLiteral" !== init.type && "BigIntLiteral" !== init.type && ("TemplateLiteral" !== init.type || init.expressions.length > 0) && !isPossiblyLiteralEnum(init) && this.raise(TSErrors.ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference, {
      at: init
    }));
    return declaration;
  }
  parseStatementContent(context, topLevel) {
    if (this.match(75) && this.isLookaheadContextual("enum")) {
      const node = this.startNode();
      return this.expect(75), this.tsParseEnumDeclaration(node, {
        const: !0
      });
    }
    if (this.isContextual(122)) return this.tsParseEnumDeclaration(this.startNode());
    if (this.isContextual(125)) {
      const result = this.tsParseInterfaceDeclaration(this.startNode());
      if (result) return result;
    }
    return super.parseStatementContent(context, topLevel);
  }
  parseAccessModifier() {
    return this.tsParseModifier([ "public", "protected", "private" ]);
  }
  tsHasSomeModifiers(member, modifiers) {
    return modifiers.some((modifier => tsIsAccessModifier(modifier) ? member.accessibility === modifier : !!member[modifier]));
  }
  tsIsStartOfStaticBlocks() {
    return this.isContextual(104) && 123 === this.lookaheadCharCode();
  }
  parseClassMember(classBody, member, state) {
    const modifiers = [ "declare", "private", "public", "protected", "override", "abstract", "readonly", "static" ];
    this.tsParseModifiers({
      modified: member,
      allowedModifiers: modifiers,
      stopOnStartOfClassStaticBlock: !0
    });
    const callParseClassMemberWithIsStatic = () => {
      this.tsIsStartOfStaticBlocks() ? (this.next(), this.next(), this.tsHasSomeModifiers(member, modifiers) && this.raise(TSErrors.StaticBlockCannotHaveModifier, {
        at: this.state.curPosition()
      }), this.parseClassStaticBlock(classBody, member)) : this.parseClassMemberWithIsStatic(classBody, member, state, !!member.static);
    };
    member.declare ? this.tsInAmbientContext(callParseClassMemberWithIsStatic) : callParseClassMemberWithIsStatic();
  }
  parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
    const idx = this.tsTryParseIndexSignature(member);
    if (idx) return classBody.body.push(idx), member.abstract && this.raise(TSErrors.IndexSignatureHasAbstract, {
      at: member
    }), member.accessibility && this.raise(TSErrors.IndexSignatureHasAccessibility, {
      at: member,
      modifier: member.accessibility
    }), member.declare && this.raise(TSErrors.IndexSignatureHasDeclare, {
      at: member
    }), void (member.override && this.raise(TSErrors.IndexSignatureHasOverride, {
      at: member
    }));
    !this.state.inAbstractClass && member.abstract && this.raise(TSErrors.NonAbstractClassHasAbstractMethod, {
      at: member
    }), member.override && (state.hadSuperClass || this.raise(TSErrors.OverrideNotInSubClass, {
      at: member
    })), super.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
  }
  parsePostMemberNameModifiers(methodOrProp) {
    this.eat(17) && (methodOrProp.optional = !0), methodOrProp.readonly && this.match(10) && this.raise(TSErrors.ClassMethodHasReadonly, {
      at: methodOrProp
    }), methodOrProp.declare && this.match(10) && this.raise(TSErrors.ClassMethodHasDeclare, {
      at: methodOrProp
    });
  }
  parseExpressionStatement(node, expr) {
    return ("Identifier" === expr.type ? this.tsParseExpressionStatement(node, expr) : void 0) || super.parseExpressionStatement(node, expr);
  }
  shouldParseExportDeclaration() {
    return !!this.tsIsDeclarationStart() || super.shouldParseExportDeclaration();
  }
  parseConditional(expr, startPos, startLoc, refExpressionErrors) {
    if (!this.state.maybeInArrowParameters || !this.match(17)) return super.parseConditional(expr, startPos, startLoc, refExpressionErrors);
    const result = this.tryParse((() => super.parseConditional(expr, startPos, startLoc)));
    return result.node ? (result.error && (this.state = result.failState), result.node) : (result.error && super.setOptionalParametersError(refExpressionErrors, result.error), 
    expr);
  }
  parseParenItem(node, startPos, startLoc) {
    if (node = super.parseParenItem(node, startPos, startLoc), this.eat(17) && (node.optional = !0, 
    this.resetEndLocation(node)), this.match(14)) {
      const typeCastNode = this.startNodeAt(startPos, startLoc);
      return typeCastNode.expression = node, typeCastNode.typeAnnotation = this.tsParseTypeAnnotation(), 
      this.finishNode(typeCastNode, "TSTypeCastExpression");
    }
    return node;
  }
  parseExportDeclaration(node) {
    if (!this.state.isAmbientContext && this.isContextual(121)) return this.tsInAmbientContext((() => this.parseExportDeclaration(node)));
    const startPos = this.state.start, startLoc = this.state.startLoc, isDeclare = this.eatContextual(121);
    if (isDeclare && (this.isContextual(121) || !this.shouldParseExportDeclaration())) throw this.raise(TSErrors.ExpectedAmbientAfterExportDeclare, {
      at: this.state.startLoc
    });
    const declaration = tokenIsIdentifier(this.state.type) && this.tsTryParseExportDeclaration() || super.parseExportDeclaration(node);
    return declaration ? (("TSInterfaceDeclaration" === declaration.type || "TSTypeAliasDeclaration" === declaration.type || isDeclare) && (node.exportKind = "type"), 
    isDeclare && (this.resetStartLocation(declaration, startPos, startLoc), declaration.declare = !0), 
    declaration) : null;
  }
  parseClassId(node, isStatement, optionalId) {
    if ((!isStatement || optionalId) && this.isContextual(110)) return;
    super.parseClassId(node, isStatement, optionalId, node.declare ? 1024 : 139);
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (node.typeParameters = typeParameters);
  }
  parseClassPropertyAnnotation(node) {
    !node.optional && this.eat(35) && (node.definite = !0);
    const type = this.tsTryParseTypeAnnotation();
    type && (node.typeAnnotation = type);
  }
  parseClassProperty(node) {
    if (this.parseClassPropertyAnnotation(node), this.state.isAmbientContext && this.match(29) && this.raise(TSErrors.DeclareClassFieldHasInitializer, {
      at: this.state.startLoc
    }), node.abstract && this.match(29)) {
      const {key} = node;
      this.raise(TSErrors.AbstractPropertyHasInitializer, {
        at: this.state.startLoc,
        propertyName: "Identifier" !== key.type || node.computed ? `[${this.input.slice(key.start, key.end)}]` : key.name
      });
    }
    return super.parseClassProperty(node);
  }
  parseClassPrivateProperty(node) {
    return node.abstract && this.raise(TSErrors.PrivateElementHasAbstract, {
      at: node
    }), node.accessibility && this.raise(TSErrors.PrivateElementHasAccessibility, {
      at: node,
      modifier: node.accessibility
    }), this.parseClassPropertyAnnotation(node), super.parseClassPrivateProperty(node);
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && isConstructor && this.raise(TSErrors.ConstructorHasTypeParameters, {
      at: typeParameters
    });
    const {declare = !1, kind} = method;
    !declare || "get" !== kind && "set" !== kind || this.raise(TSErrors.DeclareAccessor, {
      at: method,
      kind
    }), typeParameters && (method.typeParameters = typeParameters), super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
  }
  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (method.typeParameters = typeParameters), super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
  }
  declareClassPrivateMethodInScope(node, kind) {
    "TSDeclareMethod" !== node.type && ("MethodDefinition" !== node.type || node.value.body) && super.declareClassPrivateMethodInScope(node, kind);
  }
  parseClassSuper(node) {
    super.parseClassSuper(node), node.superClass && (this.match(47) || this.match(51)) && (node.superTypeParameters = this.tsParseTypeArgumentsInExpression()), 
    this.eatContextual(110) && (node.implements = this.tsParseHeritageClause("implements"));
  }
  parseObjPropValue(prop, ...args) {
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (prop.typeParameters = typeParameters), super.parseObjPropValue(prop, ...args);
  }
  parseFunctionParams(node, allowModifiers) {
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (node.typeParameters = typeParameters), super.parseFunctionParams(node, allowModifiers);
  }
  parseVarId(decl, kind) {
    super.parseVarId(decl, kind), "Identifier" === decl.id.type && !this.hasPrecedingLineBreak() && this.eat(35) && (decl.definite = !0);
    const type = this.tsTryParseTypeAnnotation();
    type && (decl.id.typeAnnotation = type, this.resetEndLocation(decl.id));
  }
  parseAsyncArrowFromCallExpression(node, call) {
    return this.match(14) && (node.returnType = this.tsParseTypeAnnotation()), super.parseAsyncArrowFromCallExpression(node, call);
  }
  parseMaybeAssign(...args) {
    var _jsx, _jsx2, _typeCast, _jsx3, _typeCast2, _jsx4, _typeCast3;
    let state, jsx, typeCast, typeParameters;
    if (this.hasPlugin("jsx") && (this.match(138) || this.match(47))) {
      if (state = this.state.clone(), jsx = this.tryParse((() => super.parseMaybeAssign(...args)), state), 
      !jsx.error) return jsx.node;
      const {context} = this.state, currentContext = context[context.length - 1];
      currentContext !== types.j_oTag && currentContext !== types.j_expr || context.pop();
    }
    if (!(null != (_jsx = jsx) && _jsx.error || this.match(47))) return super.parseMaybeAssign(...args);
    state = state || this.state.clone();
    const arrow = this.tryParse((abort => {
      var _expr$extra, _typeParameters, _expr$typeParameters$;
      typeParameters = this.tsParseTypeParameters();
      const expr = super.parseMaybeAssign(...args);
      if (("ArrowFunctionExpression" !== expr.type || null != (_expr$extra = expr.extra) && _expr$extra.parenthesized) && abort(), 
      0 !== (null == (_typeParameters = typeParameters) ? void 0 : _typeParameters.params.length) && this.resetStartLocationFromNode(expr, typeParameters), 
      expr.typeParameters = typeParameters, this.hasPlugin("jsx") && 1 === expr.typeParameters.params.length && (null == (_expr$typeParameters$ = expr.typeParameters.extra) || !_expr$typeParameters$.trailingComma)) {
        expr.typeParameters.params[0].constraint;
      }
      return expr;
    }), state);
    if (!arrow.error && !arrow.aborted) return typeParameters && this.reportReservedArrowTypeParam(typeParameters), 
    arrow.node;
    if (!jsx && (assert(!this.hasPlugin("jsx")), typeCast = this.tryParse((() => super.parseMaybeAssign(...args)), state), 
    !typeCast.error)) return typeCast.node;
    if (null != (_jsx2 = jsx) && _jsx2.node) return this.state = jsx.failState, jsx.node;
    if (arrow.node) return this.state = arrow.failState, typeParameters && this.reportReservedArrowTypeParam(typeParameters), 
    arrow.node;
    if (null != (_typeCast = typeCast) && _typeCast.node) return this.state = typeCast.failState, 
    typeCast.node;
    if (null != (_jsx3 = jsx) && _jsx3.thrown) throw jsx.error;
    if (arrow.thrown) throw arrow.error;
    if (null != (_typeCast2 = typeCast) && _typeCast2.thrown) throw typeCast.error;
    throw (null == (_jsx4 = jsx) ? void 0 : _jsx4.error) || arrow.error || (null == (_typeCast3 = typeCast) ? void 0 : _typeCast3.error);
  }
  reportReservedArrowTypeParam(node) {
    var _node$extra;
    1 !== node.params.length || null != (_node$extra = node.extra) && _node$extra.trailingComma || !this.getPluginOption("typescript", "disallowAmbiguousJSXLike") || this.raise(TSErrors.ReservedArrowTypeParam, {
      at: node
    });
  }
  parseMaybeUnary(refExpressionErrors) {
    return !this.hasPlugin("jsx") && this.match(47) ? this.tsParseTypeAssertion() : super.parseMaybeUnary(refExpressionErrors);
  }
  parseArrow(node) {
    if (this.match(14)) {
      const result = this.tryParse((abort => {
        const returnType = this.tsParseTypeOrTypePredicateAnnotation(14);
        return !this.canInsertSemicolon() && this.match(19) || abort(), returnType;
      }));
      if (result.aborted) return;
      result.thrown || (result.error && (this.state = result.failState), node.returnType = result.node);
    }
    return super.parseArrow(node);
  }
  parseAssignableListItemTypes(param) {
    this.eat(17) && ("Identifier" === param.type || this.state.isAmbientContext || this.state.inType || this.raise(TSErrors.PatternIsOptional, {
      at: param
    }), param.optional = !0);
    const type = this.tsTryParseTypeAnnotation();
    return type && (param.typeAnnotation = type), this.resetEndLocation(param), param;
  }
  isAssignable(node, isBinding) {
    switch (node.type) {
     case "TSTypeCastExpression":
      return this.isAssignable(node.expression, isBinding);

     case "TSParameterProperty":
      return !0;

     default:
      return super.isAssignable(node, isBinding);
    }
  }
  toAssignable(node, isLHS = !1) {
    switch (node.type) {
     case "TSTypeCastExpression":
      return super.toAssignable(this.typeCastToParameter(node), isLHS);

     case "TSParameterProperty":
     default:
      return super.toAssignable(node, isLHS);

     case "ParenthesizedExpression":
      return this.toAssignableParenthesizedExpression(node, isLHS);

     case "TSAsExpression":
     case "TSNonNullExpression":
     case "TSTypeAssertion":
      return node.expression = this.toAssignable(node.expression, isLHS), node;
    }
  }
  toAssignableParenthesizedExpression(node, isLHS) {
    switch (node.expression.type) {
     case "TSAsExpression":
     case "TSNonNullExpression":
     case "TSTypeAssertion":
     case "ParenthesizedExpression":
      return node.expression = this.toAssignable(node.expression, isLHS), node;

     default:
      return super.toAssignable(node, isLHS);
    }
  }
  isValidLVal(type, isParenthesized, binding) {
    return object = {
      TSTypeCastExpression: !0,
      TSParameterProperty: "parameter",
      TSNonNullExpression: "expression",
      TSAsExpression: (64 !== binding || isParenthesized) && [ "expression", !0 ],
      TSTypeAssertion: (64 !== binding || isParenthesized) && [ "expression", !0 ]
    }, key = type, Object.hasOwnProperty.call(object, key) && object[key] || super.isValidLVal(type, isParenthesized, binding);
    var object, key;
  }
  parseBindingAtom() {
    return 78 === this.state.type ? this.parseIdentifier(!0) : super.parseBindingAtom();
  }
  parseMaybeDecoratorArguments(expr) {
    if (this.match(47) || this.match(51)) {
      const typeArguments = this.tsParseTypeArgumentsInExpression();
      if (this.match(10)) {
        const call = super.parseMaybeDecoratorArguments(expr);
        return call.typeParameters = typeArguments, call;
      }
      this.unexpected(null, 10);
    }
    return super.parseMaybeDecoratorArguments(expr);
  }
  checkCommaAfterRest(close) {
    return this.state.isAmbientContext && this.match(12) && this.lookaheadCharCode() === close ? (this.next(), 
    !1) : super.checkCommaAfterRest(close);
  }
  isClassMethod() {
    return this.match(47) || super.isClassMethod();
  }
  isClassProperty() {
    return this.match(35) || this.match(14) || super.isClassProperty();
  }
  parseMaybeDefault(...args) {
    const node = super.parseMaybeDefault(...args);
    return "AssignmentPattern" === node.type && node.typeAnnotation && node.right.start < node.typeAnnotation.start && this.raise(TSErrors.TypeAnnotationAfterAssign, {
      at: node.typeAnnotation
    }), node;
  }
  getTokenFromCode(code) {
    if (this.state.inType) {
      if (62 === code) return this.finishOp(48, 1);
      if (60 === code) return this.finishOp(47, 1);
    }
    return super.getTokenFromCode(code);
  }
  reScan_lt_gt() {
    const {type} = this.state;
    47 === type ? (this.state.pos -= 1, this.readToken_lt()) : 48 === type && (this.state.pos -= 1, 
    this.readToken_gt());
  }
  reScan_lt() {
    const {type} = this.state;
    return 51 === type ? (this.state.pos -= 2, this.finishOp(47, 1), 47) : type;
  }
  toAssignableList(exprList) {
    for (let i = 0; i < exprList.length; i++) {
      const expr = exprList[i];
      if (expr) switch (expr.type) {
       case "TSTypeCastExpression":
        exprList[i] = this.typeCastToParameter(expr);
        break;

       case "TSAsExpression":
       case "TSTypeAssertion":
        this.state.maybeInArrowParameters ? this.raise(TSErrors.UnexpectedTypeCastInParameter, {
          at: expr
        }) : exprList[i] = this.typeCastToParameter(expr);
      }
    }
    return super.toAssignableList(...arguments);
  }
  typeCastToParameter(node) {
    return node.expression.typeAnnotation = node.typeAnnotation, this.resetEndLocation(node.expression, node.typeAnnotation.loc.end), 
    node.expression;
  }
  shouldParseArrow(params) {
    return this.match(14) ? params.every((expr => this.isAssignable(expr, !0))) : super.shouldParseArrow(params);
  }
  shouldParseAsyncArrow() {
    return this.match(14) || super.shouldParseAsyncArrow();
  }
  canHaveLeadingDecorator() {
    return super.canHaveLeadingDecorator() || this.isAbstractClass();
  }
  jsxParseOpeningElementAfterName(node) {
    if (this.match(47) || this.match(51)) {
      const typeArguments = this.tsTryParseAndCatch((() => this.tsParseTypeArgumentsInExpression()));
      typeArguments && (node.typeParameters = typeArguments);
    }
    return super.jsxParseOpeningElementAfterName(node);
  }
  getGetterSetterExpectedParamCount(method) {
    const baseCount = super.getGetterSetterExpectedParamCount(method), firstParam = this.getObjectOrClassMethodParams(method)[0];
    return firstParam && this.isThisParam(firstParam) ? baseCount + 1 : baseCount;
  }
  parseCatchClauseParam() {
    const param = super.parseCatchClauseParam(), type = this.tsTryParseTypeAnnotation();
    return type && (param.typeAnnotation = type, this.resetEndLocation(param)), param;
  }
  tsInAmbientContext(cb) {
    const oldIsAmbientContext = this.state.isAmbientContext;
    this.state.isAmbientContext = !0;
    try {
      return cb();
    } finally {
      this.state.isAmbientContext = oldIsAmbientContext;
    }
  }
  parseClass(node, ...args) {
    const oldInAbstractClass = this.state.inAbstractClass;
    this.state.inAbstractClass = !!node.abstract;
    try {
      return super.parseClass(node, ...args);
    } finally {
      this.state.inAbstractClass = oldInAbstractClass;
    }
  }
  tsParseAbstractDeclaration(node) {
    if (this.match(80)) return node.abstract = !0, this.parseClass(node, !0, !1);
    if (this.isContextual(125)) {
      if (!this.hasFollowingLineBreak()) return node.abstract = !0, this.raise(TSErrors.NonClassMethodPropertyHasAbstractModifer, {
        at: node
      }), this.tsParseInterfaceDeclaration(node);
    } else this.unexpected(null, 80);
  }
  parseMethod(...args) {
    const method = super.parseMethod(...args);
    if (method.abstract) {
      if (this.hasPlugin("estree") ? !!method.value.body : !!method.body) {
        const {key} = method;
        this.raise(TSErrors.AbstractMethodHasImplementation, {
          at: method,
          methodName: "Identifier" !== key.type || method.computed ? `[${this.input.slice(key.start, key.end)}]` : key.name
        });
      }
    }
    return method;
  }
  tsParseTypeParameterName() {
    return this.parseIdentifier().name;
  }
  shouldParseAsAmbientContext() {
    return !!this.getPluginOption("typescript", "dts");
  }
  parse() {
    return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), 
    super.parse();
  }
  getExpression() {
    return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = !0), 
    super.getExpression();
  }
  parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly) {
    return !isString && isMaybeTypeOnly ? (this.parseTypeOnlyImportExportSpecifier(node, !1, isInTypeExport), 
    this.finishNode(node, "ExportSpecifier")) : (node.exportKind = "value", super.parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly));
  }
  parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly) {
    return !importedIsString && isMaybeTypeOnly ? (this.parseTypeOnlyImportExportSpecifier(specifier, !0, isInTypeOnlyImport), 
    this.finishNode(specifier, "ImportSpecifier")) : (specifier.importKind = "value", 
    super.parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly));
  }
  parseTypeOnlyImportExportSpecifier(node, isImport, isInTypeOnlyImportExport) {
    const leftOfAsKey = isImport ? "imported" : "local", rightOfAsKey = isImport ? "local" : "exported";
    let rightOfAs, leftOfAs = node[leftOfAsKey], hasTypeSpecifier = !1, canParseAsKeyword = !0;
    const loc = leftOfAs.loc.start;
    if (this.isContextual(93)) {
      const firstAs = this.parseIdentifier();
      if (this.isContextual(93)) {
        const secondAs = this.parseIdentifier();
        tokenIsKeywordOrIdentifier(this.state.type) ? (hasTypeSpecifier = !0, leftOfAs = firstAs, 
        rightOfAs = isImport ? this.parseIdentifier() : this.parseModuleExportName(), canParseAsKeyword = !1) : (rightOfAs = secondAs, 
        canParseAsKeyword = !1);
      } else tokenIsKeywordOrIdentifier(this.state.type) ? (canParseAsKeyword = !1, rightOfAs = isImport ? this.parseIdentifier() : this.parseModuleExportName()) : (hasTypeSpecifier = !0, 
      leftOfAs = firstAs);
    } else tokenIsKeywordOrIdentifier(this.state.type) && (hasTypeSpecifier = !0, leftOfAs = isImport ? this.parseIdentifier() : this.parseModuleExportName());
    hasTypeSpecifier && isInTypeOnlyImportExport && this.raise(isImport ? TSErrors.TypeModifierIsUsedInTypeImports : TSErrors.TypeModifierIsUsedInTypeExports, {
      at: loc
    }), node[leftOfAsKey] = leftOfAs, node[rightOfAsKey] = rightOfAs;
    node[isImport ? "importKind" : "exportKind"] = hasTypeSpecifier ? "type" : "value", 
    canParseAsKeyword && this.eatContextual(93) && (node[rightOfAsKey] = isImport ? this.parseIdentifier() : this.parseModuleExportName()), 
    node[rightOfAsKey] || (node[rightOfAsKey] = cloneIdentifier(node[leftOfAsKey])), 
    isImport && this.checkIdentifier(node[rightOfAsKey], 9);
  }
};

function isPossiblyLiteralEnum(expression) {
  if ("MemberExpression" !== expression.type) return !1;
  const {computed, property} = expression;
  return (!computed || "StringLiteral" === property.type || !("TemplateLiteral" !== property.type || property.expressions.length > 0)) && isUncomputedMemberExpressionChain(expression.object);
}

function isUncomputedMemberExpressionChain(expression) {
  return "Identifier" === expression.type || "MemberExpression" === expression.type && (!expression.computed && isUncomputedMemberExpressionChain(expression.object));
}

const PlaceholderErrors = ParseErrorEnum`placeholders`((_ => ({
  ClassNameIsRequired: _("A class name is required."),
  UnexpectedSpace: _("Unexpected space in placeholder.")
})));

var placeholders = superClass => class extends superClass {
  parsePlaceholder(expectedNode) {
    if (this.match(140)) {
      const node = this.startNode();
      return this.next(), this.assertNoSpace(), node.name = super.parseIdentifier(!0), 
      this.assertNoSpace(), this.expect(140), this.finishPlaceholder(node, expectedNode);
    }
  }
  finishPlaceholder(node, expectedNode) {
    const isFinished = !(!node.expectedNode || "Placeholder" !== node.type);
    return node.expectedNode = expectedNode, isFinished ? node : this.finishNode(node, "Placeholder");
  }
  getTokenFromCode(code) {
    return 37 === code && 37 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(140, 2) : super.getTokenFromCode(...arguments);
  }
  parseExprAtom() {
    return this.parsePlaceholder("Expression") || super.parseExprAtom(...arguments);
  }
  parseIdentifier() {
    return this.parsePlaceholder("Identifier") || super.parseIdentifier(...arguments);
  }
  checkReservedWord(word) {
    void 0 !== word && super.checkReservedWord(...arguments);
  }
  parseBindingAtom() {
    return this.parsePlaceholder("Pattern") || super.parseBindingAtom(...arguments);
  }
  isValidLVal(type, ...rest) {
    return "Placeholder" === type || super.isValidLVal(type, ...rest);
  }
  toAssignable(node) {
    return node && "Placeholder" === node.type && "Expression" === node.expectedNode ? (node.expectedNode = "Pattern", 
    node) : super.toAssignable(...arguments);
  }
  isLet(context) {
    if (super.isLet(context)) return !0;
    if (!this.isContextual(99)) return !1;
    if (context) return !1;
    return 140 === this.lookahead().type;
  }
  verifyBreakContinue(node) {
    node.label && "Placeholder" === node.label.type || super.verifyBreakContinue(...arguments);
  }
  parseExpressionStatement(node, expr) {
    if ("Placeholder" !== expr.type || expr.extra && expr.extra.parenthesized) return super.parseExpressionStatement(...arguments);
    if (this.match(14)) {
      const stmt = node;
      return stmt.label = this.finishPlaceholder(expr, "Identifier"), this.next(), stmt.body = this.parseStatement("label"), 
      this.finishNode(stmt, "LabeledStatement");
    }
    return this.semicolon(), node.name = expr.name, this.finishPlaceholder(node, "Statement");
  }
  parseBlock() {
    return this.parsePlaceholder("BlockStatement") || super.parseBlock(...arguments);
  }
  parseFunctionId() {
    return this.parsePlaceholder("Identifier") || super.parseFunctionId(...arguments);
  }
  parseClass(node, isStatement, optionalId) {
    const type = isStatement ? "ClassDeclaration" : "ClassExpression";
    this.next(), this.takeDecorators(node);
    const oldStrict = this.state.strict, placeholder = this.parsePlaceholder("Identifier");
    if (placeholder) {
      if (!(this.match(81) || this.match(140) || this.match(5))) {
        if (optionalId || !isStatement) return node.id = null, node.body = this.finishPlaceholder(placeholder, "ClassBody"), 
        this.finishNode(node, type);
        throw this.raise(PlaceholderErrors.ClassNameIsRequired, {
          at: this.state.startLoc
        });
      }
      node.id = placeholder;
    } else this.parseClassId(node, isStatement, optionalId);
    return this.parseClassSuper(node), node.body = this.parsePlaceholder("ClassBody") || this.parseClassBody(!!node.superClass, oldStrict), 
    this.finishNode(node, type);
  }
  parseExport(node) {
    const placeholder = this.parsePlaceholder("Identifier");
    if (!placeholder) return super.parseExport(...arguments);
    if (!this.isContextual(97) && !this.match(12)) return node.specifiers = [], node.source = null, 
    node.declaration = this.finishPlaceholder(placeholder, "Declaration"), this.finishNode(node, "ExportNamedDeclaration");
    this.expectPlugin("exportDefaultFrom");
    const specifier = this.startNode();
    return specifier.exported = placeholder, node.specifiers = [ this.finishNode(specifier, "ExportDefaultSpecifier") ], 
    super.parseExport(node);
  }
  isExportDefaultSpecifier() {
    if (this.match(65)) {
      const next = this.nextTokenStart();
      if (this.isUnparsedContextual(next, "from") && this.input.startsWith(tokenLabelName(140), this.nextTokenStartSince(next + 4))) return !0;
    }
    return super.isExportDefaultSpecifier();
  }
  maybeParseExportDefaultSpecifier(node) {
    return !!(node.specifiers && node.specifiers.length > 0) || super.maybeParseExportDefaultSpecifier(...arguments);
  }
  checkExport(node) {
    const {specifiers} = node;
    null != specifiers && specifiers.length && (node.specifiers = specifiers.filter((node => "Placeholder" === node.exported.type))), 
    super.checkExport(node), node.specifiers = specifiers;
  }
  parseImport(node) {
    const placeholder = this.parsePlaceholder("Identifier");
    if (!placeholder) return super.parseImport(...arguments);
    if (node.specifiers = [], !this.isContextual(97) && !this.match(12)) return node.source = this.finishPlaceholder(placeholder, "StringLiteral"), 
    this.semicolon(), this.finishNode(node, "ImportDeclaration");
    const specifier = this.startNodeAtNode(placeholder);
    if (specifier.local = placeholder, this.finishNode(specifier, "ImportDefaultSpecifier"), 
    node.specifiers.push(specifier), this.eat(12)) {
      this.maybeParseStarImportSpecifier(node) || this.parseNamedImportSpecifiers(node);
    }
    return this.expectContextual(97), node.source = this.parseImportSource(), this.semicolon(), 
    this.finishNode(node, "ImportDeclaration");
  }
  parseImportSource() {
    return this.parsePlaceholder("StringLiteral") || super.parseImportSource(...arguments);
  }
  assertNoSpace() {
    this.state.start > this.state.lastTokEndLoc.index && this.raise(PlaceholderErrors.UnexpectedSpace, {
      at: this.state.lastTokEndLoc
    });
  }
}, v8intrinsic = superClass => class extends superClass {
  parseV8Intrinsic() {
    if (this.match(54)) {
      const v8IntrinsicStartLoc = this.state.startLoc, node = this.startNode();
      if (this.next(), tokenIsIdentifier(this.state.type)) {
        const name = this.parseIdentifierName(this.state.start), identifier = this.createIdentifier(node, name);
        if (identifier.type = "V8IntrinsicIdentifier", this.match(10)) return identifier;
      }
      this.unexpected(v8IntrinsicStartLoc);
    }
  }
  parseExprAtom() {
    return this.parseV8Intrinsic() || super.parseExprAtom(...arguments);
  }
};

function hasPlugin(plugins, expectedConfig) {
  const [expectedName, expectedOptions] = "string" == typeof expectedConfig ? [ expectedConfig, {} ] : expectedConfig, expectedKeys = Object.keys(expectedOptions), expectedOptionsIsEmpty = 0 === expectedKeys.length;
  return plugins.some((p => {
    if ("string" == typeof p) return expectedOptionsIsEmpty && p === expectedName;
    {
      const [pluginName, pluginOptions] = p;
      if (pluginName !== expectedName) return !1;
      for (const key of expectedKeys) if (pluginOptions[key] !== expectedOptions[key]) return !1;
      return !0;
    }
  }));
}

function getPluginOption(plugins, name, option) {
  const plugin = plugins.find((plugin => Array.isArray(plugin) ? plugin[0] === name : plugin === name));
  return plugin && Array.isArray(plugin) ? plugin[1][option] : null;
}

const PIPELINE_PROPOSALS = [ "minimal", "fsharp", "hack", "smart" ], TOPIC_TOKENS = [ "^^", "@@", "^", "%", "#" ], RECORD_AND_TUPLE_SYNTAX_TYPES = [ "hash", "bar" ];

function validatePlugins(plugins) {
  if (hasPlugin(plugins, "decorators")) {
    if (hasPlugin(plugins, "decorators-legacy")) throw new Error("Cannot use the decorators and decorators-legacy plugin together");
    const decoratorsBeforeExport = getPluginOption(plugins, "decorators", "decoratorsBeforeExport");
    if (null == decoratorsBeforeExport) throw new Error("The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.");
    if ("boolean" != typeof decoratorsBeforeExport) throw new Error("'decoratorsBeforeExport' must be a boolean.");
  }
  if (hasPlugin(plugins, "flow") && hasPlugin(plugins, "typescript")) throw new Error("Cannot combine flow and typescript plugins.");
  if (hasPlugin(plugins, "placeholders") && hasPlugin(plugins, "v8intrinsic")) throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
  if (hasPlugin(plugins, "pipelineOperator")) {
    const proposal = getPluginOption(plugins, "pipelineOperator", "proposal");
    if (!PIPELINE_PROPOSALS.includes(proposal)) {
      const proposalList = PIPELINE_PROPOSALS.map((p => `"${p}"`)).join(", ");
      throw new Error(`"pipelineOperator" requires "proposal" option whose value must be one of: ${proposalList}.`);
    }
    const tupleSyntaxIsHash = hasPlugin(plugins, [ "recordAndTuple", {
      syntaxType: "hash"
    } ]);
    if ("hack" === proposal) {
      if (hasPlugin(plugins, "placeholders")) throw new Error("Cannot combine placeholders plugin and Hack-style pipes.");
      if (hasPlugin(plugins, "v8intrinsic")) throw new Error("Cannot combine v8intrinsic plugin and Hack-style pipes.");
      const topicToken = getPluginOption(plugins, "pipelineOperator", "topicToken");
      if (!TOPIC_TOKENS.includes(topicToken)) {
        const tokenList = TOPIC_TOKENS.map((t => `"${t}"`)).join(", ");
        throw new Error(`"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${tokenList}.`);
      }
      if ("#" === topicToken && tupleSyntaxIsHash) throw new Error('Plugin conflict between `["pipelineOperator", { proposal: "hack", topicToken: "#" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.');
    } else if ("smart" === proposal && tupleSyntaxIsHash) throw new Error('Plugin conflict between `["pipelineOperator", { proposal: "smart" }]` and `["recordAndtuple", { syntaxType: "hash"}]`.');
  }
  if (hasPlugin(plugins, "moduleAttributes")) {
    if (hasPlugin(plugins, "importAssertions")) throw new Error("Cannot combine importAssertions and moduleAttributes plugins.");
    if ("may-2020" !== getPluginOption(plugins, "moduleAttributes", "version")) throw new Error("The 'moduleAttributes' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is 'may-2020'.");
  }
  if (hasPlugin(plugins, "recordAndTuple") && !RECORD_AND_TUPLE_SYNTAX_TYPES.includes(getPluginOption(plugins, "recordAndTuple", "syntaxType"))) throw new Error("'recordAndTuple' requires 'syntaxType' option whose value should be one of: " + RECORD_AND_TUPLE_SYNTAX_TYPES.map((p => `'${p}'`)).join(", "));
  if (hasPlugin(plugins, "asyncDoExpressions") && !hasPlugin(plugins, "doExpressions")) {
    const error = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
    throw error.missingPlugins = "doExpressions", error;
  }
}

const mixinPlugins = {
  estree,
  jsx,
  flow,
  typescript,
  v8intrinsic,
  placeholders
}, mixinPluginNames = Object.keys(mixinPlugins), defaultOptions = {
  sourceType: "script",
  sourceFilename: void 0,
  startColumn: 0,
  startLine: 1,
  allowAwaitOutsideFunction: !1,
  allowReturnOutsideFunction: !1,
  allowImportExportEverywhere: !1,
  allowSuperOutsideMethod: !1,
  allowUndeclaredExports: !1,
  plugins: [],
  strictMode: null,
  ranges: !1,
  tokens: !1,
  createParenthesizedExpressions: !1,
  errorRecovery: !1,
  attachComment: !0
};

function getOptions(opts) {
  const options = {};
  for (const key of Object.keys(defaultOptions)) options[key] = opts && null != opts[key] ? opts[key] : defaultOptions[key];
  return options;
}

const getOwn = (object, key) => Object.hasOwnProperty.call(object, key) && object[key], unwrapParenthesizedExpression = node => "ParenthesizedExpression" === node.type ? unwrapParenthesizedExpression(node.expression) : node;

class LValParser extends NodeUtils {
  toAssignable(node, isLHS = !1) {
    var _node$extra, _node$extra3;
    let parenthesized;
    switch (("ParenthesizedExpression" === node.type || null != (_node$extra = node.extra) && _node$extra.parenthesized) && (parenthesized = unwrapParenthesizedExpression(node), 
    isLHS ? "Identifier" === parenthesized.type ? this.expressionScope.recordParenthesizedIdentifierError({
      at: node
    }) : "MemberExpression" !== parenthesized.type && this.raise(Errors.InvalidParenthesizedAssignment, {
      at: node
    }) : this.raise(Errors.InvalidParenthesizedAssignment, {
      at: node
    })), node.type) {
     case "Identifier":
     case "ObjectPattern":
     case "ArrayPattern":
     case "AssignmentPattern":
     case "RestElement":
      break;

     case "ObjectExpression":
      node.type = "ObjectPattern";
      for (let i = 0, length = node.properties.length, last = length - 1; i < length; i++) {
        var _node$extra2;
        const prop = node.properties[i], isLast = i === last;
        this.toAssignableObjectExpressionProp(prop, isLast, isLHS), isLast && "RestElement" === prop.type && null != (_node$extra2 = node.extra) && _node$extra2.trailingCommaLoc && this.raise(Errors.RestTrailingComma, {
          at: node.extra.trailingCommaLoc
        });
      }
      break;

     case "ObjectProperty":
      {
        const {key, value} = node;
        this.isPrivateName(key) && this.classScope.usePrivateName(this.getPrivateNameSV(key), key.loc.start), 
        this.toAssignable(value, isLHS);
        break;
      }

     case "SpreadElement":
      {
        this.checkToRestConversion(node), node.type = "RestElement";
        const arg = node.argument;
        this.toAssignable(arg, isLHS);
        break;
      }

     case "ArrayExpression":
      node.type = "ArrayPattern", this.toAssignableList(node.elements, null == (_node$extra3 = node.extra) ? void 0 : _node$extra3.trailingCommaLoc, isLHS);
      break;

     case "AssignmentExpression":
      "=" !== node.operator && this.raise(Errors.MissingEqInAssignment, {
        at: node.left.loc.end
      }), node.type = "AssignmentPattern", delete node.operator, this.toAssignable(node.left, isLHS);
      break;

     case "ParenthesizedExpression":
      this.toAssignable(parenthesized, isLHS);
    }
    return node;
  }
  toAssignableObjectExpressionProp(prop, isLast, isLHS) {
    "ObjectMethod" === prop.type ? this.raise("get" === prop.kind || "set" === prop.kind ? Errors.PatternHasAccessor : Errors.PatternHasMethod, {
      at: prop.key
    }) : "SpreadElement" !== prop.type || isLast ? this.toAssignable(prop, isLHS) : this.raise(Errors.RestTrailingComma, {
      at: prop
    });
  }
  toAssignableList(exprList, trailingCommaLoc, isLHS) {
    let end = exprList.length;
    if (end) {
      const last = exprList[end - 1];
      if ("RestElement" === (null == last ? void 0 : last.type)) --end; else if ("SpreadElement" === (null == last ? void 0 : last.type)) {
        last.type = "RestElement";
        let arg = last.argument;
        this.toAssignable(arg, isLHS), arg = unwrapParenthesizedExpression(arg), "Identifier" !== arg.type && "MemberExpression" !== arg.type && "ArrayPattern" !== arg.type && "ObjectPattern" !== arg.type && this.unexpected(arg.start), 
        trailingCommaLoc && this.raise(Errors.RestTrailingComma, {
          at: trailingCommaLoc
        }), --end;
      }
    }
    for (let i = 0; i < end; i++) {
      const elt = exprList[i];
      elt && (this.toAssignable(elt, isLHS), "RestElement" === elt.type && this.raise(Errors.RestTrailingComma, {
        at: elt
      }));
    }
    return exprList;
  }
  isAssignable(node, isBinding) {
    switch (node.type) {
     case "Identifier":
     case "ObjectPattern":
     case "ArrayPattern":
     case "AssignmentPattern":
     case "RestElement":
      return !0;

     case "ObjectExpression":
      {
        const last = node.properties.length - 1;
        return node.properties.every(((prop, i) => "ObjectMethod" !== prop.type && (i === last || "SpreadElement" !== prop.type) && this.isAssignable(prop)));
      }

     case "ObjectProperty":
      return this.isAssignable(node.value);

     case "SpreadElement":
      return this.isAssignable(node.argument);

     case "ArrayExpression":
      return node.elements.every((element => null === element || this.isAssignable(element)));

     case "AssignmentExpression":
      return "=" === node.operator;

     case "ParenthesizedExpression":
      return this.isAssignable(node.expression);

     case "MemberExpression":
     case "OptionalMemberExpression":
      return !isBinding;

     default:
      return !1;
    }
  }
  toReferencedList(exprList, isParenthesizedExpr) {
    return exprList;
  }
  toReferencedListDeep(exprList, isParenthesizedExpr) {
    this.toReferencedList(exprList, isParenthesizedExpr);
    for (const expr of exprList) "ArrayExpression" === (null == expr ? void 0 : expr.type) && this.toReferencedListDeep(expr.elements);
  }
  parseSpread(refExpressionErrors, refNeedsArrowPos) {
    const node = this.startNode();
    return this.next(), node.argument = this.parseMaybeAssignAllowIn(refExpressionErrors, void 0, refNeedsArrowPos), 
    this.finishNode(node, "SpreadElement");
  }
  parseRestBinding() {
    const node = this.startNode();
    return this.next(), node.argument = this.parseBindingAtom(), this.finishNode(node, "RestElement");
  }
  parseBindingAtom() {
    switch (this.state.type) {
     case 0:
      {
        const node = this.startNode();
        return this.next(), node.elements = this.parseBindingList(3, 93, !0), this.finishNode(node, "ArrayPattern");
      }

     case 5:
      return this.parseObjectLike(8, !0);
    }
    return this.parseIdentifier();
  }
  parseBindingList(close, closeCharCode, allowEmpty, allowModifiers) {
    const elts = [];
    let first = !0;
    for (;!this.eat(close); ) if (first ? first = !1 : this.expect(12), allowEmpty && this.match(12)) elts.push(null); else {
      if (this.eat(close)) break;
      if (this.match(21)) {
        if (elts.push(this.parseAssignableListItemTypes(this.parseRestBinding())), !this.checkCommaAfterRest(closeCharCode)) {
          this.expect(close);
          break;
        }
      } else {
        const decorators = [];
        for (this.match(26) && this.hasPlugin("decorators") && this.raise(Errors.UnsupportedParameterDecorator, {
          at: this.state.startLoc
        }); this.match(26); ) decorators.push(this.parseDecorator());
        elts.push(this.parseAssignableListItem(allowModifiers, decorators));
      }
    }
    return elts;
  }
  parseBindingRestProperty(prop) {
    return this.next(), prop.argument = this.parseIdentifier(), this.checkCommaAfterRest(125), 
    this.finishNode(prop, "RestElement");
  }
  parseBindingProperty() {
    const prop = this.startNode(), {type, start: startPos, startLoc} = this.state;
    return 21 === type ? this.parseBindingRestProperty(prop) : (134 === type ? (this.expectPlugin("destructuringPrivate", startLoc), 
    this.classScope.usePrivateName(this.state.value, startLoc), prop.key = this.parsePrivateName()) : this.parsePropertyName(prop), 
    prop.method = !1, this.parseObjPropValue(prop, startPos, startLoc, !1, !1, !0, !1), 
    prop);
  }
  parseAssignableListItem(allowModifiers, decorators) {
    const left = this.parseMaybeDefault();
    this.parseAssignableListItemTypes(left);
    const elt = this.parseMaybeDefault(left.start, left.loc.start, left);
    return decorators.length && (left.decorators = decorators), elt;
  }
  parseAssignableListItemTypes(param) {
    return param;
  }
  parseMaybeDefault(startPos, startLoc, left) {
    var _startLoc, _startPos, _left;
    if (startLoc = null != (_startLoc = startLoc) ? _startLoc : this.state.startLoc, 
    startPos = null != (_startPos = startPos) ? _startPos : this.state.start, left = null != (_left = left) ? _left : this.parseBindingAtom(), 
    !this.eat(29)) return left;
    const node = this.startNodeAt(startPos, startLoc);
    return node.left = left, node.right = this.parseMaybeAssignAllowIn(), this.finishNode(node, "AssignmentPattern");
  }
  isValidLVal(type, isParenthesized, binding) {
    return object = {
      AssignmentPattern: "left",
      RestElement: "argument",
      ObjectProperty: "value",
      ParenthesizedExpression: "expression",
      ArrayPattern: "elements",
      ObjectPattern: "properties"
    }, key = type, Object.hasOwnProperty.call(object, key) && object[key];
    var object, key;
  }
  checkLVal(expression, {in: ancestor, binding = 64, checkClashes = !1, strictModeChanged = !1, allowingSloppyLetBinding = !(8 & binding), hasParenthesizedAncestor = !1}) {
    var _expression$extra;
    const type = expression.type;
    if (this.isObjectMethod(expression)) return;
    if ("MemberExpression" === type) return void (64 !== binding && this.raise(Errors.InvalidPropertyBindingPattern, {
      at: expression
    }));
    if ("Identifier" === expression.type) {
      this.checkIdentifier(expression, binding, strictModeChanged, allowingSloppyLetBinding);
      const {name} = expression;
      return void (checkClashes && (checkClashes.has(name) ? this.raise(Errors.ParamDupe, {
        at: expression
      }) : checkClashes.add(name)));
    }
    const validity = this.isValidLVal(expression.type, hasParenthesizedAncestor || (null == (_expression$extra = expression.extra) ? void 0 : _expression$extra.parenthesized), binding);
    if (!0 === validity) return;
    if (!1 === validity) {
      const ParseErrorClass = 64 === binding ? Errors.InvalidLhs : Errors.InvalidLhsBinding;
      return void this.raise(ParseErrorClass, {
        at: expression,
        ancestor: "UpdateExpression" === ancestor.type ? {
          type: "UpdateExpression",
          prefix: ancestor.prefix
        } : {
          type: ancestor.type
        }
      });
    }
    const [key, isParenthesizedExpression] = Array.isArray(validity) ? validity : [ validity, "ParenthesizedExpression" === type ], nextAncestor = "ArrayPattern" === expression.type || "ObjectPattern" === expression.type || "ParenthesizedExpression" === expression.type ? expression : ancestor;
    for (const child of [].concat(expression[key])) child && this.checkLVal(child, {
      in: nextAncestor,
      binding,
      checkClashes,
      allowingSloppyLetBinding,
      strictModeChanged,
      hasParenthesizedAncestor: isParenthesizedExpression
    });
  }
  checkIdentifier(at, bindingType, strictModeChanged = !1, allowLetBinding = !(8 & bindingType)) {
    this.state.strict && (strictModeChanged ? isStrictBindReservedWord(at.name, this.inModule) : isStrictBindOnlyReservedWord(at.name)) && (64 === bindingType ? this.raise(Errors.StrictEvalArguments, {
      at,
      referenceName: at.name
    }) : this.raise(Errors.StrictEvalArgumentsBinding, {
      at,
      bindingName: at.name
    })), allowLetBinding || "let" !== at.name || this.raise(Errors.LetInLexicalBinding, {
      at
    }), 64 & bindingType || this.declareNameFromIdentifier(at, bindingType);
  }
  declareNameFromIdentifier(identifier, binding) {
    this.scope.declareName(identifier.name, binding, identifier.loc.start);
  }
  checkToRestConversion(node) {
    "Identifier" !== node.argument.type && "MemberExpression" !== node.argument.type && this.raise(Errors.InvalidRestAssignmentPattern, {
      at: node.argument
    });
  }
  checkCommaAfterRest(close) {
    return !!this.match(12) && (this.raise(this.lookaheadCharCode() === close ? Errors.RestTrailingComma : Errors.ElementAfterRest, {
      at: this.state.startLoc
    }), !0);
  }
}

class ExpressionParser extends LValParser {
  checkProto(prop, isRecord, protoRef, refExpressionErrors) {
    if ("SpreadElement" === prop.type || this.isObjectMethod(prop) || prop.computed || prop.shorthand) return;
    const key = prop.key;
    if ("__proto__" === ("Identifier" === key.type ? key.name : key.value)) {
      if (isRecord) return void this.raise(Errors.RecordNoProto, {
        at: key
      });
      protoRef.used && (refExpressionErrors ? null === refExpressionErrors.doubleProtoLoc && (refExpressionErrors.doubleProtoLoc = key.loc.start) : this.raise(Errors.DuplicateProto, {
        at: key
      })), protoRef.used = !0;
    }
  }
  shouldExitDescending(expr, potentialArrowAt) {
    return "ArrowFunctionExpression" === expr.type && expr.start === potentialArrowAt;
  }
  getExpression() {
    this.enterInitialScopes(), this.nextToken();
    const expr = this.parseExpression();
    return this.match(135) || this.unexpected(), this.finalizeRemainingComments(), expr.comments = this.state.comments, 
    expr.errors = this.state.errors, this.options.tokens && (expr.tokens = this.tokens), 
    expr;
  }
  parseExpression(disallowIn, refExpressionErrors) {
    return disallowIn ? this.disallowInAnd((() => this.parseExpressionBase(refExpressionErrors))) : this.allowInAnd((() => this.parseExpressionBase(refExpressionErrors)));
  }
  parseExpressionBase(refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, expr = this.parseMaybeAssign(refExpressionErrors);
    if (this.match(12)) {
      const node = this.startNodeAt(startPos, startLoc);
      for (node.expressions = [ expr ]; this.eat(12); ) node.expressions.push(this.parseMaybeAssign(refExpressionErrors));
      return this.toReferencedList(node.expressions), this.finishNode(node, "SequenceExpression");
    }
    return expr;
  }
  parseMaybeAssignDisallowIn(refExpressionErrors, afterLeftParse) {
    return this.disallowInAnd((() => this.parseMaybeAssign(refExpressionErrors, afterLeftParse)));
  }
  parseMaybeAssignAllowIn(refExpressionErrors, afterLeftParse) {
    return this.allowInAnd((() => this.parseMaybeAssign(refExpressionErrors, afterLeftParse)));
  }
  setOptionalParametersError(refExpressionErrors, resultError) {
    var _resultError$loc;
    refExpressionErrors.optionalParametersLoc = null != (_resultError$loc = null == resultError ? void 0 : resultError.loc) ? _resultError$loc : this.state.startLoc;
  }
  parseMaybeAssign(refExpressionErrors, afterLeftParse) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    if (this.isContextual(105) && this.prodParam.hasYield) {
      let left = this.parseYield();
      return afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), 
      left;
    }
    let ownExpressionErrors;
    refExpressionErrors ? ownExpressionErrors = !1 : (refExpressionErrors = new ExpressionErrors, 
    ownExpressionErrors = !0);
    const {type} = this.state;
    (10 === type || tokenIsIdentifier(type)) && (this.state.potentialArrowAt = this.state.start);
    let left = this.parseMaybeConditional(refExpressionErrors);
    if (afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), 
    tokenIsAssignment(this.state.type)) {
      const node = this.startNodeAt(startPos, startLoc), operator = this.state.value;
      return node.operator = operator, this.match(29) ? (node.left = this.toAssignable(left, !0), 
      null != refExpressionErrors.doubleProtoLoc && refExpressionErrors.doubleProtoLoc.index >= startPos && (refExpressionErrors.doubleProtoLoc = null), 
      null != refExpressionErrors.shorthandAssignLoc && refExpressionErrors.shorthandAssignLoc.index >= startPos && (refExpressionErrors.shorthandAssignLoc = null), 
      null != refExpressionErrors.privateKeyLoc && refExpressionErrors.privateKeyLoc.index >= startPos && (this.checkDestructuringPrivate(refExpressionErrors), 
      refExpressionErrors.privateKeyLoc = null)) : node.left = left, this.next(), node.right = this.parseMaybeAssign(), 
      this.checkLVal(left, {
        in: this.finishNode(node, "AssignmentExpression")
      }), node;
    }
    return ownExpressionErrors && this.checkExpressionErrors(refExpressionErrors, !0), 
    left;
  }
  parseMaybeConditional(refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, potentialArrowAt = this.state.potentialArrowAt, expr = this.parseExprOps(refExpressionErrors);
    return this.shouldExitDescending(expr, potentialArrowAt) ? expr : this.parseConditional(expr, startPos, startLoc, refExpressionErrors);
  }
  parseConditional(expr, startPos, startLoc, refExpressionErrors) {
    if (this.eat(17)) {
      const node = this.startNodeAt(startPos, startLoc);
      return node.test = expr, node.consequent = this.parseMaybeAssignAllowIn(), this.expect(14), 
      node.alternate = this.parseMaybeAssign(), this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  }
  parseMaybeUnaryOrPrivate(refExpressionErrors) {
    return this.match(134) ? this.parsePrivateName() : this.parseMaybeUnary(refExpressionErrors);
  }
  parseExprOps(refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, potentialArrowAt = this.state.potentialArrowAt, expr = this.parseMaybeUnaryOrPrivate(refExpressionErrors);
    return this.shouldExitDescending(expr, potentialArrowAt) ? expr : this.parseExprOp(expr, startPos, startLoc, -1);
  }
  parseExprOp(left, leftStartPos, leftStartLoc, minPrec) {
    if (this.isPrivateName(left)) {
      const value = this.getPrivateNameSV(left);
      (minPrec >= tokenOperatorPrecedence(58) || !this.prodParam.hasIn || !this.match(58)) && this.raise(Errors.PrivateInExpectedIn, {
        at: left,
        identifierName: value
      }), this.classScope.usePrivateName(value, left.loc.start);
    }
    const op = this.state.type;
    if (tokenIsOperator(op) && (this.prodParam.hasIn || !this.match(58))) {
      let prec = tokenOperatorPrecedence(op);
      if (prec > minPrec) {
        if (39 === op) {
          if (this.expectPlugin("pipelineOperator"), this.state.inFSharpPipelineDirectBody) return left;
          this.checkPipelineAtInfixOperator(left, leftStartLoc);
        }
        const node = this.startNodeAt(leftStartPos, leftStartLoc);
        node.left = left, node.operator = this.state.value;
        const logical = 41 === op || 42 === op, coalesce = 40 === op;
        if (coalesce && (prec = tokenOperatorPrecedence(42)), this.next(), 39 === op && this.hasPlugin([ "pipelineOperator", {
          proposal: "minimal"
        } ]) && 96 === this.state.type && this.prodParam.hasAwait) throw this.raise(Errors.UnexpectedAwaitAfterPipelineBody, {
          at: this.state.startLoc
        });
        node.right = this.parseExprOpRightExpr(op, prec), this.finishNode(node, logical || coalesce ? "LogicalExpression" : "BinaryExpression");
        const nextOp = this.state.type;
        if (coalesce && (41 === nextOp || 42 === nextOp) || logical && 40 === nextOp) throw this.raise(Errors.MixingCoalesceWithLogical, {
          at: this.state.startLoc
        });
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec);
      }
    }
    return left;
  }
  parseExprOpRightExpr(op, prec) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    if (39 === op) switch (this.getPluginOption("pipelineOperator", "proposal")) {
     case "hack":
      return this.withTopicBindingContext((() => this.parseHackPipeBody()));

     case "smart":
      return this.withTopicBindingContext((() => {
        if (this.prodParam.hasYield && this.isContextual(105)) throw this.raise(Errors.PipeBodyIsTighter, {
          at: this.state.startLoc
        });
        return this.parseSmartPipelineBodyInStyle(this.parseExprOpBaseRightExpr(op, prec), startPos, startLoc);
      }));

     case "fsharp":
      return this.withSoloAwaitPermittingContext((() => this.parseFSharpPipelineBody(prec)));
    }
    return this.parseExprOpBaseRightExpr(op, prec);
  }
  parseExprOpBaseRightExpr(op, prec) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    return this.parseExprOp(this.parseMaybeUnaryOrPrivate(), startPos, startLoc, tokenIsRightAssociative(op) ? prec - 1 : prec);
  }
  parseHackPipeBody() {
    var _body$extra;
    const {startLoc} = this.state, body = this.parseMaybeAssign();
    return !UnparenthesizedPipeBodyDescriptions.has(body.type) || null != (_body$extra = body.extra) && _body$extra.parenthesized || this.raise(Errors.PipeUnparenthesizedBody, {
      at: startLoc,
      type: body.type
    }), this.topicReferenceWasUsedInCurrentContext() || this.raise(Errors.PipeTopicUnused, {
      at: startLoc
    }), body;
  }
  checkExponentialAfterUnary(node) {
    this.match(57) && this.raise(Errors.UnexpectedTokenUnaryExponentiation, {
      at: node.argument
    });
  }
  parseMaybeUnary(refExpressionErrors, sawUnary) {
    const startPos = this.state.start, startLoc = this.state.startLoc, isAwait = this.isContextual(96);
    if (isAwait && this.isAwaitAllowed()) {
      this.next();
      const expr = this.parseAwait(startPos, startLoc);
      return sawUnary || this.checkExponentialAfterUnary(expr), expr;
    }
    const update = this.match(34), node = this.startNode();
    if (tokenIsPrefix(this.state.type)) {
      node.operator = this.state.value, node.prefix = !0, this.match(72) && this.expectPlugin("throwExpressions");
      const isDelete = this.match(89);
      if (this.next(), node.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(refExpressionErrors, !0), 
      this.state.strict && isDelete) {
        const arg = node.argument;
        "Identifier" === arg.type ? this.raise(Errors.StrictDelete, {
          at: node
        }) : this.hasPropertyAsPrivateName(arg) && this.raise(Errors.DeletePrivateField, {
          at: node
        });
      }
      if (!update) return sawUnary || this.checkExponentialAfterUnary(node), this.finishNode(node, "UnaryExpression");
    }
    const expr = this.parseUpdate(node, update, refExpressionErrors);
    if (isAwait) {
      const {type} = this.state;
      if ((this.hasPlugin("v8intrinsic") ? tokenCanStartExpression(type) : tokenCanStartExpression(type) && !this.match(54)) && !this.isAmbiguousAwait()) return this.raiseOverwrite(Errors.AwaitNotInAsyncContext, {
        at: startLoc
      }), this.parseAwait(startPos, startLoc);
    }
    return expr;
  }
  parseUpdate(node, update, refExpressionErrors) {
    if (update) return this.checkLVal(node.argument, {
      in: this.finishNode(node, "UpdateExpression")
    }), node;
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let expr = this.parseExprSubscripts(refExpressionErrors);
    if (this.checkExpressionErrors(refExpressionErrors, !1)) return expr;
    for (;tokenIsPostfix(this.state.type) && !this.canInsertSemicolon(); ) {
      const node = this.startNodeAt(startPos, startLoc);
      node.operator = this.state.value, node.prefix = !1, node.argument = expr, this.next(), 
      this.checkLVal(expr, {
        in: expr = this.finishNode(node, "UpdateExpression")
      });
    }
    return expr;
  }
  parseExprSubscripts(refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, potentialArrowAt = this.state.potentialArrowAt, expr = this.parseExprAtom(refExpressionErrors);
    return this.shouldExitDescending(expr, potentialArrowAt) ? expr : this.parseSubscripts(expr, startPos, startLoc);
  }
  parseSubscripts(base, startPos, startLoc, noCalls) {
    const state = {
      optionalChainMember: !1,
      maybeAsyncArrow: this.atPossibleAsyncArrow(base),
      stop: !1
    };
    do {
      base = this.parseSubscript(base, startPos, startLoc, noCalls, state), state.maybeAsyncArrow = !1;
    } while (!state.stop);
    return base;
  }
  parseSubscript(base, startPos, startLoc, noCalls, state) {
    const {type} = this.state;
    if (!noCalls && 15 === type) return this.parseBind(base, startPos, startLoc, noCalls, state);
    if (tokenIsTemplate(type)) return this.parseTaggedTemplateExpression(base, startPos, startLoc, state);
    let optional = !1;
    if (18 === type) {
      if (noCalls && 40 === this.lookaheadCharCode()) return state.stop = !0, base;
      state.optionalChainMember = optional = !0, this.next();
    }
    if (!noCalls && this.match(10)) return this.parseCoverCallAndAsyncArrowHead(base, startPos, startLoc, state, optional);
    {
      const computed = this.eat(0);
      return computed || optional || this.eat(16) ? this.parseMember(base, startPos, startLoc, state, computed, optional) : (state.stop = !0, 
      base);
    }
  }
  parseMember(base, startPos, startLoc, state, computed, optional) {
    const node = this.startNodeAt(startPos, startLoc);
    return node.object = base, node.computed = computed, computed ? (node.property = this.parseExpression(), 
    this.expect(3)) : this.match(134) ? ("Super" === base.type && this.raise(Errors.SuperPrivateField, {
      at: startLoc
    }), this.classScope.usePrivateName(this.state.value, this.state.startLoc), node.property = this.parsePrivateName()) : node.property = this.parseIdentifier(!0), 
    state.optionalChainMember ? (node.optional = optional, this.finishNode(node, "OptionalMemberExpression")) : this.finishNode(node, "MemberExpression");
  }
  parseBind(base, startPos, startLoc, noCalls, state) {
    const node = this.startNodeAt(startPos, startLoc);
    return node.object = base, this.next(), node.callee = this.parseNoCallExpr(), state.stop = !0, 
    this.parseSubscripts(this.finishNode(node, "BindExpression"), startPos, startLoc, noCalls);
  }
  parseCoverCallAndAsyncArrowHead(base, startPos, startLoc, state, optional) {
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    let refExpressionErrors = null;
    this.state.maybeInArrowParameters = !0, this.next();
    let node = this.startNodeAt(startPos, startLoc);
    node.callee = base;
    const {maybeAsyncArrow, optionalChainMember} = state;
    return maybeAsyncArrow && (this.expressionScope.enter(newAsyncArrowScope()), refExpressionErrors = new ExpressionErrors), 
    optionalChainMember && (node.optional = optional), node.arguments = optional ? this.parseCallExpressionArguments(11) : this.parseCallExpressionArguments(11, "Import" === base.type, "Super" !== base.type, node, refExpressionErrors), 
    this.finishCallExpression(node, optionalChainMember), maybeAsyncArrow && this.shouldParseAsyncArrow() && !optional ? (state.stop = !0, 
    this.checkDestructuringPrivate(refExpressionErrors), this.expressionScope.validateAsPattern(), 
    this.expressionScope.exit(), node = this.parseAsyncArrowFromCallExpression(this.startNodeAt(startPos, startLoc), node)) : (maybeAsyncArrow && (this.checkExpressionErrors(refExpressionErrors, !0), 
    this.expressionScope.exit()), this.toReferencedArguments(node)), this.state.maybeInArrowParameters = oldMaybeInArrowParameters, 
    node;
  }
  toReferencedArguments(node, isParenthesizedExpr) {
    this.toReferencedListDeep(node.arguments, isParenthesizedExpr);
  }
  parseTaggedTemplateExpression(base, startPos, startLoc, state) {
    const node = this.startNodeAt(startPos, startLoc);
    return node.tag = base, node.quasi = this.parseTemplate(!0), state.optionalChainMember && this.raise(Errors.OptionalChainingNoTemplate, {
      at: startLoc
    }), this.finishNode(node, "TaggedTemplateExpression");
  }
  atPossibleAsyncArrow(base) {
    return "Identifier" === base.type && "async" === base.name && this.state.lastTokEndLoc.index === base.end && !this.canInsertSemicolon() && base.end - base.start == 5 && base.start === this.state.potentialArrowAt;
  }
  finishCallExpression(node, optional) {
    if ("Import" === node.callee.type) if (2 === node.arguments.length && (this.hasPlugin("moduleAttributes") || this.expectPlugin("importAssertions")), 
    0 === node.arguments.length || node.arguments.length > 2) this.raise(Errors.ImportCallArity, {
      at: node,
      maxArgumentCount: this.hasPlugin("importAssertions") || this.hasPlugin("moduleAttributes") ? 2 : 1
    }); else for (const arg of node.arguments) "SpreadElement" === arg.type && this.raise(Errors.ImportCallSpreadArgument, {
      at: arg
    });
    return this.finishNode(node, optional ? "OptionalCallExpression" : "CallExpression");
  }
  parseCallExpressionArguments(close, dynamicImport, allowPlaceholder, nodeForExtra, refExpressionErrors) {
    const elts = [];
    let first = !0;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    for (this.state.inFSharpPipelineDirectBody = !1; !this.eat(close); ) {
      if (first) first = !1; else if (this.expect(12), this.match(close)) {
        !dynamicImport || this.hasPlugin("importAssertions") || this.hasPlugin("moduleAttributes") || this.raise(Errors.ImportCallArgumentTrailingComma, {
          at: this.state.lastTokStartLoc
        }), nodeForExtra && this.addTrailingCommaExtraToNode(nodeForExtra), this.next();
        break;
      }
      elts.push(this.parseExprListItem(!1, refExpressionErrors, allowPlaceholder));
    }
    return this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, elts;
  }
  shouldParseAsyncArrow() {
    return this.match(19) && !this.canInsertSemicolon();
  }
  parseAsyncArrowFromCallExpression(node, call) {
    var _call$extra;
    return this.resetPreviousNodeTrailingComments(call), this.expect(19), this.parseArrowExpression(node, call.arguments, !0, null == (_call$extra = call.extra) ? void 0 : _call$extra.trailingCommaLoc), 
    call.innerComments && setInnerComments(node, call.innerComments), call.callee.trailingComments && setInnerComments(node, call.callee.trailingComments), 
    node;
  }
  parseNoCallExpr() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, !0);
  }
  parseExprAtom(refExpressionErrors) {
    let node;
    const {type} = this.state;
    switch (type) {
     case 79:
      return this.parseSuper();

     case 83:
      return node = this.startNode(), this.next(), this.match(16) ? this.parseImportMetaProperty(node) : (this.match(10) || this.raise(Errors.UnsupportedImport, {
        at: this.state.lastTokStartLoc
      }), this.finishNode(node, "Import"));

     case 78:
      return node = this.startNode(), this.next(), this.finishNode(node, "ThisExpression");

     case 90:
      return this.parseDo(this.startNode(), !1);

     case 56:
     case 31:
      return this.readRegexp(), this.parseRegExpLiteral(this.state.value);

     case 130:
      return this.parseNumericLiteral(this.state.value);

     case 131:
      return this.parseBigIntLiteral(this.state.value);

     case 132:
      return this.parseDecimalLiteral(this.state.value);

     case 129:
      return this.parseStringLiteral(this.state.value);

     case 84:
      return this.parseNullLiteral();

     case 85:
      return this.parseBooleanLiteral(!0);

     case 86:
      return this.parseBooleanLiteral(!1);

     case 10:
      {
        const canBeArrow = this.state.potentialArrowAt === this.state.start;
        return this.parseParenAndDistinguishExpression(canBeArrow);
      }

     case 2:
     case 1:
      return this.parseArrayLike(2 === this.state.type ? 4 : 3, !1, !0);

     case 0:
      return this.parseArrayLike(3, !0, !1, refExpressionErrors);

     case 6:
     case 7:
      return this.parseObjectLike(6 === this.state.type ? 9 : 8, !1, !0);

     case 5:
      return this.parseObjectLike(8, !1, !1, refExpressionErrors);

     case 68:
      return this.parseFunctionOrFunctionSent();

     case 26:
      this.parseDecorators();

     case 80:
      return node = this.startNode(), this.takeDecorators(node), this.parseClass(node, !1);

     case 77:
      return this.parseNewOrNewTarget();

     case 25:
     case 24:
      return this.parseTemplate(!1);

     case 15:
      {
        node = this.startNode(), this.next(), node.object = null;
        const callee = node.callee = this.parseNoCallExpr();
        if ("MemberExpression" === callee.type) return this.finishNode(node, "BindExpression");
        throw this.raise(Errors.UnsupportedBind, {
          at: callee
        });
      }

     case 134:
      return this.raise(Errors.PrivateInExpectedIn, {
        at: this.state.startLoc,
        identifierName: this.state.value
      }), this.parsePrivateName();

     case 33:
      return this.parseTopicReferenceThenEqualsSign(54, "%");

     case 32:
      return this.parseTopicReferenceThenEqualsSign(44, "^");

     case 37:
     case 38:
      return this.parseTopicReference("hack");

     case 44:
     case 54:
     case 27:
      {
        const pipeProposal = this.getPluginOption("pipelineOperator", "proposal");
        if (pipeProposal) return this.parseTopicReference(pipeProposal);
        throw this.unexpected();
      }

     case 47:
      {
        const lookaheadCh = this.input.codePointAt(this.nextTokenStart());
        if (isIdentifierStart(lookaheadCh) || 62 === lookaheadCh) {
          this.expectOnePlugin([ "jsx", "flow", "typescript" ]);
          break;
        }
        throw this.unexpected();
      }

     default:
      if (tokenIsIdentifier(type)) {
        if (this.isContextual(123) && 123 === this.lookaheadCharCode() && !this.hasFollowingLineBreak()) return this.parseModuleExpression();
        const canBeArrow = this.state.potentialArrowAt === this.state.start, containsEsc = this.state.containsEsc, id = this.parseIdentifier();
        if (!containsEsc && "async" === id.name && !this.canInsertSemicolon()) {
          const {type} = this.state;
          if (68 === type) return this.resetPreviousNodeTrailingComments(id), this.next(), 
          this.parseFunction(this.startNodeAtNode(id), void 0, !0);
          if (tokenIsIdentifier(type)) return 61 === this.lookaheadCharCode() ? this.parseAsyncArrowUnaryFunction(this.startNodeAtNode(id)) : id;
          if (90 === type) return this.resetPreviousNodeTrailingComments(id), this.parseDo(this.startNodeAtNode(id), !0);
        }
        return canBeArrow && this.match(19) && !this.canInsertSemicolon() ? (this.next(), 
        this.parseArrowExpression(this.startNodeAtNode(id), [ id ], !1)) : id;
      }
      throw this.unexpected();
    }
  }
  parseTopicReferenceThenEqualsSign(topicTokenType, topicTokenValue) {
    const pipeProposal = this.getPluginOption("pipelineOperator", "proposal");
    if (pipeProposal) return this.state.type = topicTokenType, this.state.value = topicTokenValue, 
    this.state.pos--, this.state.end--, this.state.endLoc = createPositionWithColumnOffset(this.state.endLoc, -1), 
    this.parseTopicReference(pipeProposal);
    throw this.unexpected();
  }
  parseTopicReference(pipeProposal) {
    const node = this.startNode(), startLoc = this.state.startLoc, tokenType = this.state.type;
    return this.next(), this.finishTopicReference(node, startLoc, pipeProposal, tokenType);
  }
  finishTopicReference(node, startLoc, pipeProposal, tokenType) {
    if (this.testTopicReferenceConfiguration(pipeProposal, startLoc, tokenType)) {
      const nodeType = "smart" === pipeProposal ? "PipelinePrimaryTopicReference" : "TopicReference";
      return this.topicReferenceIsAllowedInCurrentContext() || this.raise("smart" === pipeProposal ? Errors.PrimaryTopicNotAllowed : Errors.PipeTopicUnbound, {
        at: startLoc
      }), this.registerTopicReference(), this.finishNode(node, nodeType);
    }
    throw this.raise(Errors.PipeTopicUnconfiguredToken, {
      at: startLoc,
      token: tokenLabelName(tokenType)
    });
  }
  testTopicReferenceConfiguration(pipeProposal, startLoc, tokenType) {
    switch (pipeProposal) {
     case "hack":
      return this.hasPlugin([ "pipelineOperator", {
        topicToken: tokenLabelName(tokenType)
      } ]);

     case "smart":
      return 27 === tokenType;

     default:
      throw this.raise(Errors.PipeTopicRequiresHackPipes, {
        at: startLoc
      });
    }
  }
  parseAsyncArrowUnaryFunction(node) {
    this.prodParam.enter(functionFlags(!0, this.prodParam.hasYield));
    const params = [ this.parseIdentifier() ];
    return this.prodParam.exit(), this.hasPrecedingLineBreak() && this.raise(Errors.LineTerminatorBeforeArrow, {
      at: this.state.curPosition()
    }), this.expect(19), this.parseArrowExpression(node, params, !0), node;
  }
  parseDo(node, isAsync) {
    this.expectPlugin("doExpressions"), isAsync && this.expectPlugin("asyncDoExpressions"), 
    node.async = isAsync, this.next();
    const oldLabels = this.state.labels;
    return this.state.labels = [], isAsync ? (this.prodParam.enter(2), node.body = this.parseBlock(), 
    this.prodParam.exit()) : node.body = this.parseBlock(), this.state.labels = oldLabels, 
    this.finishNode(node, "DoExpression");
  }
  parseSuper() {
    const node = this.startNode();
    return this.next(), !this.match(10) || this.scope.allowDirectSuper || this.options.allowSuperOutsideMethod ? this.scope.allowSuper || this.options.allowSuperOutsideMethod || this.raise(Errors.UnexpectedSuper, {
      at: node
    }) : this.raise(Errors.SuperNotAllowed, {
      at: node
    }), this.match(10) || this.match(0) || this.match(16) || this.raise(Errors.UnsupportedSuper, {
      at: node
    }), this.finishNode(node, "Super");
  }
  parsePrivateName() {
    const node = this.startNode(), id = this.startNodeAt(this.state.start + 1, new Position(this.state.curLine, this.state.start + 1 - this.state.lineStart, this.state.start + 1)), name = this.state.value;
    return this.next(), node.id = this.createIdentifier(id, name), this.finishNode(node, "PrivateName");
  }
  parseFunctionOrFunctionSent() {
    const node = this.startNode();
    if (this.next(), this.prodParam.hasYield && this.match(16)) {
      const meta = this.createIdentifier(this.startNodeAtNode(node), "function");
      return this.next(), this.match(102) ? this.expectPlugin("functionSent") : this.hasPlugin("functionSent") || this.unexpected(), 
      this.parseMetaProperty(node, meta, "sent");
    }
    return this.parseFunction(node);
  }
  parseMetaProperty(node, meta, propertyName) {
    node.meta = meta;
    const containsEsc = this.state.containsEsc;
    return node.property = this.parseIdentifier(!0), (node.property.name !== propertyName || containsEsc) && this.raise(Errors.UnsupportedMetaProperty, {
      at: node.property,
      target: meta.name,
      onlyValidPropertyName: propertyName
    }), this.finishNode(node, "MetaProperty");
  }
  parseImportMetaProperty(node) {
    const id = this.createIdentifier(this.startNodeAtNode(node), "import");
    return this.next(), this.isContextual(100) && (this.inModule || this.raise(Errors.ImportMetaOutsideModule, {
      at: id
    }), this.sawUnambiguousESM = !0), this.parseMetaProperty(node, id, "meta");
  }
  parseLiteralAtNode(value, type, node) {
    return this.addExtra(node, "rawValue", value), this.addExtra(node, "raw", this.input.slice(node.start, this.state.end)), 
    node.value = value, this.next(), this.finishNode(node, type);
  }
  parseLiteral(value, type) {
    const node = this.startNode();
    return this.parseLiteralAtNode(value, type, node);
  }
  parseStringLiteral(value) {
    return this.parseLiteral(value, "StringLiteral");
  }
  parseNumericLiteral(value) {
    return this.parseLiteral(value, "NumericLiteral");
  }
  parseBigIntLiteral(value) {
    return this.parseLiteral(value, "BigIntLiteral");
  }
  parseDecimalLiteral(value) {
    return this.parseLiteral(value, "DecimalLiteral");
  }
  parseRegExpLiteral(value) {
    const node = this.parseLiteral(value.value, "RegExpLiteral");
    return node.pattern = value.pattern, node.flags = value.flags, node;
  }
  parseBooleanLiteral(value) {
    const node = this.startNode();
    return node.value = value, this.next(), this.finishNode(node, "BooleanLiteral");
  }
  parseNullLiteral() {
    const node = this.startNode();
    return this.next(), this.finishNode(node, "NullLiteral");
  }
  parseParenAndDistinguishExpression(canBeArrow) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let val;
    this.next(), this.expressionScope.enter(newArrowHeadScope());
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.maybeInArrowParameters = !0, this.state.inFSharpPipelineDirectBody = !1;
    const innerStartPos = this.state.start, innerStartLoc = this.state.startLoc, exprList = [], refExpressionErrors = new ExpressionErrors;
    let spreadStartLoc, optionalCommaStartLoc, first = !0;
    for (;!this.match(11); ) {
      if (first) first = !1; else if (this.expect(12, null === refExpressionErrors.optionalParametersLoc ? null : refExpressionErrors.optionalParametersLoc), 
      this.match(11)) {
        optionalCommaStartLoc = this.state.startLoc;
        break;
      }
      if (this.match(21)) {
        const spreadNodeStartPos = this.state.start, spreadNodeStartLoc = this.state.startLoc;
        if (spreadStartLoc = this.state.startLoc, exprList.push(this.parseParenItem(this.parseRestBinding(), spreadNodeStartPos, spreadNodeStartLoc)), 
        !this.checkCommaAfterRest(41)) break;
      } else exprList.push(this.parseMaybeAssignAllowIn(refExpressionErrors, this.parseParenItem));
    }
    const innerEndLoc = this.state.lastTokEndLoc;
    this.expect(11), this.state.maybeInArrowParameters = oldMaybeInArrowParameters, 
    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
    let arrowNode = this.startNodeAt(startPos, startLoc);
    return canBeArrow && this.shouldParseArrow(exprList) && (arrowNode = this.parseArrow(arrowNode)) ? (this.checkDestructuringPrivate(refExpressionErrors), 
    this.expressionScope.validateAsPattern(), this.expressionScope.exit(), this.parseArrowExpression(arrowNode, exprList, !1), 
    arrowNode) : (this.expressionScope.exit(), exprList.length || this.unexpected(this.state.lastTokStartLoc), 
    optionalCommaStartLoc && this.unexpected(optionalCommaStartLoc), spreadStartLoc && this.unexpected(spreadStartLoc), 
    this.checkExpressionErrors(refExpressionErrors, !0), this.toReferencedListDeep(exprList, !0), 
    exprList.length > 1 ? (val = this.startNodeAt(innerStartPos, innerStartLoc), val.expressions = exprList, 
    this.finishNode(val, "SequenceExpression"), this.resetEndLocation(val, innerEndLoc)) : val = exprList[0], 
    this.wrapParenthesis(startPos, startLoc, val));
  }
  wrapParenthesis(startPos, startLoc, expression) {
    if (!this.options.createParenthesizedExpressions) return this.addExtra(expression, "parenthesized", !0), 
    this.addExtra(expression, "parenStart", startPos), this.takeSurroundingComments(expression, startPos, this.state.lastTokEndLoc.index), 
    expression;
    const parenExpression = this.startNodeAt(startPos, startLoc);
    return parenExpression.expression = expression, this.finishNode(parenExpression, "ParenthesizedExpression"), 
    parenExpression;
  }
  shouldParseArrow(params) {
    return !this.canInsertSemicolon();
  }
  parseArrow(node) {
    if (this.eat(19)) return node;
  }
  parseParenItem(node, startPos, startLoc) {
    return node;
  }
  parseNewOrNewTarget() {
    const node = this.startNode();
    if (this.next(), this.match(16)) {
      const meta = this.createIdentifier(this.startNodeAtNode(node), "new");
      this.next();
      const metaProp = this.parseMetaProperty(node, meta, "target");
      return this.scope.inNonArrowFunction || this.scope.inClass || this.raise(Errors.UnexpectedNewTarget, {
        at: metaProp
      }), metaProp;
    }
    return this.parseNew(node);
  }
  parseNew(node) {
    return node.callee = this.parseNoCallExpr(), "Import" === node.callee.type ? this.raise(Errors.ImportCallNotNewExpression, {
      at: node.callee
    }) : this.isOptionalChain(node.callee) ? this.raise(Errors.OptionalChainingNoNew, {
      at: this.state.lastTokEndLoc
    }) : this.eat(18) && this.raise(Errors.OptionalChainingNoNew, {
      at: this.state.startLoc
    }), this.parseNewArguments(node), this.finishNode(node, "NewExpression");
  }
  parseNewArguments(node) {
    if (this.eat(10)) {
      const args = this.parseExprList(11);
      this.toReferencedList(args), node.arguments = args;
    } else node.arguments = [];
  }
  parseTemplateElement(isTagged) {
    const {start, startLoc, end, value} = this.state, elemStart = start + 1, elem = this.startNodeAt(elemStart, createPositionWithColumnOffset(startLoc, 1));
    null === value && (isTagged || this.raise(Errors.InvalidEscapeSequenceTemplate, {
      at: createPositionWithColumnOffset(startLoc, 2)
    }));
    const isTail = this.match(24), endOffset = isTail ? -1 : -2, elemEnd = end + endOffset;
    return elem.value = {
      raw: this.input.slice(elemStart, elemEnd).replace(/\r\n?/g, "\n"),
      cooked: null === value ? null : value.slice(1, endOffset)
    }, elem.tail = isTail, this.next(), this.finishNode(elem, "TemplateElement"), this.resetEndLocation(elem, createPositionWithColumnOffset(this.state.lastTokEndLoc, endOffset)), 
    elem;
  }
  parseTemplate(isTagged) {
    const node = this.startNode();
    node.expressions = [];
    let curElt = this.parseTemplateElement(isTagged);
    for (node.quasis = [ curElt ]; !curElt.tail; ) node.expressions.push(this.parseTemplateSubstitution()), 
    this.readTemplateContinuation(), node.quasis.push(curElt = this.parseTemplateElement(isTagged));
    return this.finishNode(node, "TemplateLiteral");
  }
  parseTemplateSubstitution() {
    return this.parseExpression();
  }
  parseObjectLike(close, isPattern, isRecord, refExpressionErrors) {
    isRecord && this.expectPlugin("recordAndTuple");
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = !1;
    const propHash = Object.create(null);
    let first = !0;
    const node = this.startNode();
    for (node.properties = [], this.next(); !this.match(close); ) {
      if (first) first = !1; else if (this.expect(12), this.match(close)) {
        this.addTrailingCommaExtraToNode(node);
        break;
      }
      let prop;
      isPattern ? prop = this.parseBindingProperty() : (prop = this.parsePropertyDefinition(refExpressionErrors), 
      this.checkProto(prop, isRecord, propHash, refExpressionErrors)), isRecord && !this.isObjectProperty(prop) && "SpreadElement" !== prop.type && this.raise(Errors.InvalidRecordProperty, {
        at: prop
      }), prop.shorthand && this.addExtra(prop, "shorthand", !0), node.properties.push(prop);
    }
    this.next(), this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
    let type = "ObjectExpression";
    return isPattern ? type = "ObjectPattern" : isRecord && (type = "RecordExpression"), 
    this.finishNode(node, type);
  }
  addTrailingCommaExtraToNode(node) {
    this.addExtra(node, "trailingComma", this.state.lastTokStart), this.addExtra(node, "trailingCommaLoc", this.state.lastTokStartLoc, !1);
  }
  maybeAsyncOrAccessorProp(prop) {
    return !prop.computed && "Identifier" === prop.key.type && (this.isLiteralPropertyName() || this.match(0) || this.match(55));
  }
  parsePropertyDefinition(refExpressionErrors) {
    let decorators = [];
    if (this.match(26)) for (this.hasPlugin("decorators") && this.raise(Errors.UnsupportedPropertyDecorator, {
      at: this.state.startLoc
    }); this.match(26); ) decorators.push(this.parseDecorator());
    const prop = this.startNode();
    let startPos, startLoc, isAsync = !1, isAccessor = !1;
    if (this.match(21)) return decorators.length && this.unexpected(), this.parseSpread();
    decorators.length && (prop.decorators = decorators, decorators = []), prop.method = !1, 
    refExpressionErrors && (startPos = this.state.start, startLoc = this.state.startLoc);
    let isGenerator = this.eat(55);
    this.parsePropertyNamePrefixOperator(prop);
    const containsEsc = this.state.containsEsc, key = this.parsePropertyName(prop, refExpressionErrors);
    if (!isGenerator && !containsEsc && this.maybeAsyncOrAccessorProp(prop)) {
      const keyName = key.name;
      "async" !== keyName || this.hasPrecedingLineBreak() || (isAsync = !0, this.resetPreviousNodeTrailingComments(key), 
      isGenerator = this.eat(55), this.parsePropertyName(prop)), "get" !== keyName && "set" !== keyName || (isAccessor = !0, 
      this.resetPreviousNodeTrailingComments(key), prop.kind = keyName, this.match(55) && (isGenerator = !0, 
      this.raise(Errors.AccessorIsGenerator, {
        at: this.state.curPosition(),
        kind: keyName
      }), this.next()), this.parsePropertyName(prop));
    }
    return this.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, !1, isAccessor, refExpressionErrors), 
    prop;
  }
  getGetterSetterExpectedParamCount(method) {
    return "get" === method.kind ? 0 : 1;
  }
  getObjectOrClassMethodParams(method) {
    return method.params;
  }
  checkGetterSetterParams(method) {
    var _params;
    const paramCount = this.getGetterSetterExpectedParamCount(method), params = this.getObjectOrClassMethodParams(method);
    params.length !== paramCount && this.raise("get" === method.kind ? Errors.BadGetterArity : Errors.BadSetterArity, {
      at: method
    }), "set" === method.kind && "RestElement" === (null == (_params = params[params.length - 1]) ? void 0 : _params.type) && this.raise(Errors.BadSetterRestParameter, {
      at: method
    });
  }
  parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) {
    return isAccessor ? (this.parseMethod(prop, isGenerator, !1, !1, !1, "ObjectMethod"), 
    this.checkGetterSetterParams(prop), prop) : isAsync || isGenerator || this.match(10) ? (isPattern && this.unexpected(), 
    prop.kind = "method", prop.method = !0, this.parseMethod(prop, isGenerator, isAsync, !1, !1, "ObjectMethod")) : void 0;
  }
  parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors) {
    if (prop.shorthand = !1, this.eat(14)) return prop.value = isPattern ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssignAllowIn(refExpressionErrors), 
    this.finishNode(prop, "ObjectProperty");
    if (!prop.computed && "Identifier" === prop.key.type) {
      if (this.checkReservedWord(prop.key.name, prop.key.loc.start, !0, !1), isPattern) prop.value = this.parseMaybeDefault(startPos, startLoc, cloneIdentifier(prop.key)); else if (this.match(29)) {
        const shorthandAssignLoc = this.state.startLoc;
        null != refExpressionErrors ? null === refExpressionErrors.shorthandAssignLoc && (refExpressionErrors.shorthandAssignLoc = shorthandAssignLoc) : this.raise(Errors.InvalidCoverInitializedName, {
          at: shorthandAssignLoc
        }), prop.value = this.parseMaybeDefault(startPos, startLoc, cloneIdentifier(prop.key));
      } else prop.value = cloneIdentifier(prop.key);
      return prop.shorthand = !0, this.finishNode(prop, "ObjectProperty");
    }
  }
  parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, isAccessor, refExpressionErrors) {
    const node = this.parseObjectMethod(prop, isGenerator, isAsync, isPattern, isAccessor) || this.parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors);
    return node || this.unexpected(), node;
  }
  parsePropertyName(prop, refExpressionErrors) {
    if (this.eat(0)) prop.computed = !0, prop.key = this.parseMaybeAssignAllowIn(), 
    this.expect(3); else {
      const {type, value} = this.state;
      let key;
      if (tokenIsKeywordOrIdentifier(type)) key = this.parseIdentifier(!0); else switch (type) {
       case 130:
        key = this.parseNumericLiteral(value);
        break;

       case 129:
        key = this.parseStringLiteral(value);
        break;

       case 131:
        key = this.parseBigIntLiteral(value);
        break;

       case 132:
        key = this.parseDecimalLiteral(value);
        break;

       case 134:
        {
          const privateKeyLoc = this.state.startLoc;
          null != refExpressionErrors ? null === refExpressionErrors.privateKeyLoc && (refExpressionErrors.privateKeyLoc = privateKeyLoc) : this.raise(Errors.UnexpectedPrivateField, {
            at: privateKeyLoc
          }), key = this.parsePrivateName();
          break;
        }

       default:
        throw this.unexpected();
      }
      prop.key = key, 134 !== type && (prop.computed = !1);
    }
    return prop.key;
  }
  initFunction(node, isAsync) {
    node.id = null, node.generator = !1, node.async = !!isAsync;
  }
  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = !1) {
    this.initFunction(node, isAsync), node.generator = !!isGenerator;
    const allowModifiers = isConstructor;
    return this.scope.enter(18 | (inClassScope ? 64 : 0) | (allowDirectSuper ? 32 : 0)), 
    this.prodParam.enter(functionFlags(isAsync, node.generator)), this.parseFunctionParams(node, allowModifiers), 
    this.parseFunctionBodyAndFinish(node, type, !0), this.prodParam.exit(), this.scope.exit(), 
    node;
  }
  parseArrayLike(close, canBePattern, isTuple, refExpressionErrors) {
    isTuple && this.expectPlugin("recordAndTuple");
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = !1;
    const node = this.startNode();
    return this.next(), node.elements = this.parseExprList(close, !isTuple, refExpressionErrors, node), 
    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, this.finishNode(node, isTuple ? "TupleExpression" : "ArrayExpression");
  }
  parseArrowExpression(node, params, isAsync, trailingCommaLoc) {
    this.scope.enter(6);
    let flags = functionFlags(isAsync, !1);
    !this.match(5) && this.prodParam.hasIn && (flags |= 8), this.prodParam.enter(flags), 
    this.initFunction(node, isAsync);
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    return params && (this.state.maybeInArrowParameters = !0, this.setArrowFunctionParameters(node, params, trailingCommaLoc)), 
    this.state.maybeInArrowParameters = !1, this.parseFunctionBody(node, !0), this.prodParam.exit(), 
    this.scope.exit(), this.state.maybeInArrowParameters = oldMaybeInArrowParameters, 
    this.finishNode(node, "ArrowFunctionExpression");
  }
  setArrowFunctionParameters(node, params, trailingCommaLoc) {
    node.params = this.toAssignableList(params, trailingCommaLoc, !1);
  }
  parseFunctionBodyAndFinish(node, type, isMethod = !1) {
    this.parseFunctionBody(node, !1, isMethod), this.finishNode(node, type);
  }
  parseFunctionBody(node, allowExpression, isMethod = !1) {
    const isExpression = allowExpression && !this.match(5);
    if (this.expressionScope.enter(newExpressionScope()), isExpression) node.body = this.parseMaybeAssign(), 
    this.checkParams(node, !1, allowExpression, !1); else {
      const oldStrict = this.state.strict, oldLabels = this.state.labels;
      this.state.labels = [], this.prodParam.enter(4 | this.prodParam.currentFlags()), 
      node.body = this.parseBlock(!0, !1, (hasStrictModeDirective => {
        const nonSimple = !this.isSimpleParamList(node.params);
        hasStrictModeDirective && nonSimple && this.raise(Errors.IllegalLanguageModeDirective, {
          at: "method" !== node.kind && "constructor" !== node.kind || !node.key ? node : node.key.loc.end
        });
        const strictModeChanged = !oldStrict && this.state.strict;
        this.checkParams(node, !(this.state.strict || allowExpression || isMethod || nonSimple), allowExpression, strictModeChanged), 
        this.state.strict && node.id && this.checkIdentifier(node.id, 65, strictModeChanged);
      })), this.prodParam.exit(), this.state.labels = oldLabels;
    }
    this.expressionScope.exit();
  }
  isSimpleParameter(node) {
    return "Identifier" === node.type;
  }
  isSimpleParamList(params) {
    for (let i = 0, len = params.length; i < len; i++) if (!this.isSimpleParameter(params[i])) return !1;
    return !0;
  }
  checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged = !0) {
    const checkClashes = !allowDuplicates && new Set, formalParameters = {
      type: "FormalParameters"
    };
    for (const param of node.params) this.checkLVal(param, {
      in: formalParameters,
      binding: 5,
      checkClashes,
      strictModeChanged
    });
  }
  parseExprList(close, allowEmpty, refExpressionErrors, nodeForExtra) {
    const elts = [];
    let first = !0;
    for (;!this.eat(close); ) {
      if (first) first = !1; else if (this.expect(12), this.match(close)) {
        nodeForExtra && this.addTrailingCommaExtraToNode(nodeForExtra), this.next();
        break;
      }
      elts.push(this.parseExprListItem(allowEmpty, refExpressionErrors));
    }
    return elts;
  }
  parseExprListItem(allowEmpty, refExpressionErrors, allowPlaceholder) {
    let elt;
    if (this.match(12)) allowEmpty || this.raise(Errors.UnexpectedToken, {
      at: this.state.curPosition(),
      unexpected: ","
    }), elt = null; else if (this.match(21)) {
      const spreadNodeStartPos = this.state.start, spreadNodeStartLoc = this.state.startLoc;
      elt = this.parseParenItem(this.parseSpread(refExpressionErrors), spreadNodeStartPos, spreadNodeStartLoc);
    } else if (this.match(17)) {
      this.expectPlugin("partialApplication"), allowPlaceholder || this.raise(Errors.UnexpectedArgumentPlaceholder, {
        at: this.state.startLoc
      });
      const node = this.startNode();
      this.next(), elt = this.finishNode(node, "ArgumentPlaceholder");
    } else elt = this.parseMaybeAssignAllowIn(refExpressionErrors, this.parseParenItem);
    return elt;
  }
  parseIdentifier(liberal) {
    const node = this.startNode(), name = this.parseIdentifierName(node.start, liberal);
    return this.createIdentifier(node, name);
  }
  createIdentifier(node, name) {
    return node.name = name, node.loc.identifierName = name, this.finishNode(node, "Identifier");
  }
  parseIdentifierName(pos, liberal) {
    let name;
    const {startLoc, type} = this.state;
    if (!tokenIsKeywordOrIdentifier(type)) throw this.unexpected();
    name = this.state.value;
    const tokenIsKeyword = tokenKeywordOrIdentifierIsKeyword(type);
    return liberal ? tokenIsKeyword && this.replaceToken(128) : this.checkReservedWord(name, startLoc, tokenIsKeyword, !1), 
    this.next(), name;
  }
  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
    if (word.length > 10) return;
    if (!canBeReservedWord(word)) return;
    if ("yield" === word) {
      if (this.prodParam.hasYield) return void this.raise(Errors.YieldBindingIdentifier, {
        at: startLoc
      });
    } else if ("await" === word) {
      if (this.prodParam.hasAwait) return void this.raise(Errors.AwaitBindingIdentifier, {
        at: startLoc
      });
      if (this.scope.inStaticBlock) return void this.raise(Errors.AwaitBindingIdentifierInStaticBlock, {
        at: startLoc
      });
      this.expressionScope.recordAsyncArrowParametersError({
        at: startLoc
      });
    } else if ("arguments" === word && this.scope.inClassAndNotInNonArrowFunction) return void this.raise(Errors.ArgumentsInClass, {
      at: startLoc
    });
    if (checkKeywords && isKeyword(word)) return void this.raise(Errors.UnexpectedKeyword, {
      at: startLoc,
      keyword: word
    });
    (this.state.strict ? isBinding ? isStrictBindReservedWord : isStrictReservedWord : isReservedWord)(word, this.inModule) && this.raise(Errors.UnexpectedReservedWord, {
      at: startLoc,
      reservedWord: word
    });
  }
  isAwaitAllowed() {
    return !!this.prodParam.hasAwait || !(!this.options.allowAwaitOutsideFunction || this.scope.inFunction);
  }
  parseAwait(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc);
    return this.expressionScope.recordParameterInitializerError(Errors.AwaitExpressionFormalParameter, {
      at: node
    }), this.eat(55) && this.raise(Errors.ObsoleteAwaitStar, {
      at: node
    }), this.scope.inFunction || this.options.allowAwaitOutsideFunction || (this.isAmbiguousAwait() ? this.ambiguousScriptDifferentAst = !0 : this.sawUnambiguousESM = !0), 
    this.state.soloAwait || (node.argument = this.parseMaybeUnary(null, !0)), this.finishNode(node, "AwaitExpression");
  }
  isAmbiguousAwait() {
    if (this.hasPrecedingLineBreak()) return !0;
    const {type} = this.state;
    return 53 === type || 10 === type || 0 === type || tokenIsTemplate(type) || 133 === type || 56 === type || this.hasPlugin("v8intrinsic") && 54 === type;
  }
  parseYield() {
    const node = this.startNode();
    this.expressionScope.recordParameterInitializerError(Errors.YieldInParameter, {
      at: node
    }), this.next();
    let delegating = !1, argument = null;
    if (!this.hasPrecedingLineBreak()) switch (delegating = this.eat(55), this.state.type) {
     case 13:
     case 135:
     case 8:
     case 11:
     case 3:
     case 9:
     case 14:
     case 12:
      if (!delegating) break;

     default:
      argument = this.parseMaybeAssign();
    }
    return node.delegate = delegating, node.argument = argument, this.finishNode(node, "YieldExpression");
  }
  checkPipelineAtInfixOperator(left, leftStartLoc) {
    this.hasPlugin([ "pipelineOperator", {
      proposal: "smart"
    } ]) && "SequenceExpression" === left.type && this.raise(Errors.PipelineHeadSequenceExpression, {
      at: leftStartLoc
    });
  }
  parseSmartPipelineBodyInStyle(childExpr, startPos, startLoc) {
    const bodyNode = this.startNodeAt(startPos, startLoc);
    return this.isSimpleReference(childExpr) ? (bodyNode.callee = childExpr, this.finishNode(bodyNode, "PipelineBareFunction")) : (this.checkSmartPipeTopicBodyEarlyErrors(startLoc), 
    bodyNode.expression = childExpr, this.finishNode(bodyNode, "PipelineTopicExpression"));
  }
  isSimpleReference(expression) {
    switch (expression.type) {
     case "MemberExpression":
      return !expression.computed && this.isSimpleReference(expression.object);

     case "Identifier":
      return !0;

     default:
      return !1;
    }
  }
  checkSmartPipeTopicBodyEarlyErrors(startLoc) {
    if (this.match(19)) throw this.raise(Errors.PipelineBodyNoArrow, {
      at: this.state.startLoc
    });
    this.topicReferenceWasUsedInCurrentContext() || this.raise(Errors.PipelineTopicUnused, {
      at: startLoc
    });
  }
  withTopicBindingContext(callback) {
    const outerContextTopicState = this.state.topicContext;
    this.state.topicContext = {
      maxNumOfResolvableTopics: 1,
      maxTopicIndex: null
    };
    try {
      return callback();
    } finally {
      this.state.topicContext = outerContextTopicState;
    }
  }
  withSmartMixTopicForbiddingContext(callback) {
    if (!this.hasPlugin([ "pipelineOperator", {
      proposal: "smart"
    } ])) return callback();
    {
      const outerContextTopicState = this.state.topicContext;
      this.state.topicContext = {
        maxNumOfResolvableTopics: 0,
        maxTopicIndex: null
      };
      try {
        return callback();
      } finally {
        this.state.topicContext = outerContextTopicState;
      }
    }
  }
  withSoloAwaitPermittingContext(callback) {
    const outerContextSoloAwaitState = this.state.soloAwait;
    this.state.soloAwait = !0;
    try {
      return callback();
    } finally {
      this.state.soloAwait = outerContextSoloAwaitState;
    }
  }
  allowInAnd(callback) {
    const flags = this.prodParam.currentFlags();
    if (8 & ~flags) {
      this.prodParam.enter(8 | flags);
      try {
        return callback();
      } finally {
        this.prodParam.exit();
      }
    }
    return callback();
  }
  disallowInAnd(callback) {
    const flags = this.prodParam.currentFlags();
    if (8 & flags) {
      this.prodParam.enter(-9 & flags);
      try {
        return callback();
      } finally {
        this.prodParam.exit();
      }
    }
    return callback();
  }
  registerTopicReference() {
    this.state.topicContext.maxTopicIndex = 0;
  }
  topicReferenceIsAllowedInCurrentContext() {
    return this.state.topicContext.maxNumOfResolvableTopics >= 1;
  }
  topicReferenceWasUsedInCurrentContext() {
    return null != this.state.topicContext.maxTopicIndex && this.state.topicContext.maxTopicIndex >= 0;
  }
  parseFSharpPipelineBody(prec) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    this.state.potentialArrowAt = this.state.start;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = !0;
    const ret = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), startPos, startLoc, prec);
    return this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, ret;
  }
  parseModuleExpression() {
    this.expectPlugin("moduleBlocks");
    const node = this.startNode();
    this.next(), this.eat(5);
    const revertScopes = this.initializeScopes(!0);
    this.enterInitialScopes();
    const program = this.startNode();
    try {
      node.body = this.parseProgram(program, 8, "module");
    } finally {
      revertScopes();
    }
    return this.eat(8), this.finishNode(node, "ModuleExpression");
  }
  parsePropertyNamePrefixOperator(prop) {}
}

const loopLabel = {
  kind: "loop"
}, switchLabel = {
  kind: "switch"
}, FUNC_NO_FLAGS = 0, FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4, loneSurrogate = /[\uD800-\uDFFF]/u, keywordRelationalOperator = /in(?:stanceof)?/y;

function babel7CompatTokens(tokens, input) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i], {type} = token;
    if ("number" == typeof type) {
      if (134 === type) {
        const {loc, start, value, end} = token, hashEndPos = start + 1, hashEndLoc = createPositionWithColumnOffset(loc.start, 1);
        tokens.splice(i, 1, new Token({
          type: getExportedToken(27),
          value: "#",
          start,
          end: hashEndPos,
          startLoc: loc.start,
          endLoc: hashEndLoc
        }), new Token({
          type: getExportedToken(128),
          value,
          start: hashEndPos,
          end,
          startLoc: hashEndLoc,
          endLoc: loc.end
        })), i++;
        continue;
      }
      if (tokenIsTemplate(type)) {
        const {loc, start, value, end} = token, backquoteEnd = start + 1, backquoteEndLoc = createPositionWithColumnOffset(loc.start, 1);
        let startToken, templateValue, templateElementEnd, templateElementEndLoc, endToken;
        startToken = 96 === input.charCodeAt(start) ? new Token({
          type: getExportedToken(22),
          value: "`",
          start,
          end: backquoteEnd,
          startLoc: loc.start,
          endLoc: backquoteEndLoc
        }) : new Token({
          type: getExportedToken(8),
          value: "}",
          start,
          end: backquoteEnd,
          startLoc: loc.start,
          endLoc: backquoteEndLoc
        }), 24 === type ? (templateElementEnd = end - 1, templateElementEndLoc = createPositionWithColumnOffset(loc.end, -1), 
        templateValue = null === value ? null : value.slice(1, -1), endToken = new Token({
          type: getExportedToken(22),
          value: "`",
          start: templateElementEnd,
          end,
          startLoc: templateElementEndLoc,
          endLoc: loc.end
        })) : (templateElementEnd = end - 2, templateElementEndLoc = createPositionWithColumnOffset(loc.end, -2), 
        templateValue = null === value ? null : value.slice(1, -2), endToken = new Token({
          type: getExportedToken(23),
          value: "${",
          start: templateElementEnd,
          end,
          startLoc: templateElementEndLoc,
          endLoc: loc.end
        })), tokens.splice(i, 1, startToken, new Token({
          type: getExportedToken(20),
          value: templateValue,
          start: backquoteEnd,
          end: templateElementEnd,
          startLoc: backquoteEndLoc,
          endLoc: templateElementEndLoc
        }), endToken), i += 2;
        continue;
      }
      token.type = getExportedToken(type);
    }
  }
  return tokens;
}

class StatementParser extends ExpressionParser {
  parseTopLevel(file, program) {
    return file.program = this.parseProgram(program), file.comments = this.state.comments, 
    this.options.tokens && (file.tokens = babel7CompatTokens(this.tokens, this.input)), 
    this.finishNode(file, "File");
  }
  parseProgram(program, end = 135, sourceType = this.options.sourceType) {
    if (program.sourceType = sourceType, program.interpreter = this.parseInterpreterDirective(), 
    this.parseBlockBody(program, !0, !0, end), this.inModule && !this.options.allowUndeclaredExports && this.scope.undefinedExports.size > 0) for (const [localName, at] of Array.from(this.scope.undefinedExports)) this.raise(Errors.ModuleExportUndefined, {
      at,
      localName
    });
    return this.finishNode(program, "Program");
  }
  stmtToDirective(stmt) {
    const directive = stmt;
    directive.type = "Directive", directive.value = directive.expression, delete directive.expression;
    const directiveLiteral = directive.value, expressionValue = directiveLiteral.value, raw = this.input.slice(directiveLiteral.start, directiveLiteral.end), val = directiveLiteral.value = raw.slice(1, -1);
    return this.addExtra(directiveLiteral, "raw", raw), this.addExtra(directiveLiteral, "rawValue", val), 
    this.addExtra(directiveLiteral, "expressionValue", expressionValue), directiveLiteral.type = "DirectiveLiteral", 
    directive;
  }
  parseInterpreterDirective() {
    if (!this.match(28)) return null;
    const node = this.startNode();
    return node.value = this.state.value, this.next(), this.finishNode(node, "InterpreterDirective");
  }
  isLet(context) {
    return !!this.isContextual(99) && this.isLetKeyword(context);
  }
  isLetKeyword(context) {
    const next = this.nextTokenStart(), nextCh = this.codePointAtPos(next);
    if (92 === nextCh || 91 === nextCh) return !0;
    if (context) return !1;
    if (123 === nextCh) return !0;
    if (isIdentifierStart(nextCh)) {
      if (keywordRelationalOperator.lastIndex = next, keywordRelationalOperator.test(this.input)) {
        const endCh = this.codePointAtPos(keywordRelationalOperator.lastIndex);
        if (!isIdentifierChar(endCh) && 92 !== endCh) return !1;
      }
      return !0;
    }
    return !1;
  }
  parseStatement(context, topLevel) {
    return this.match(26) && this.parseDecorators(!0), this.parseStatementContent(context, topLevel);
  }
  parseStatementContent(context, topLevel) {
    let starttype = this.state.type;
    const node = this.startNode();
    let kind;
    switch (this.isLet(context) && (starttype = 74, kind = "let"), starttype) {
     case 60:
      return this.parseBreakContinueStatement(node, !0);

     case 63:
      return this.parseBreakContinueStatement(node, !1);

     case 64:
      return this.parseDebuggerStatement(node);

     case 90:
      return this.parseDoStatement(node);

     case 91:
      return this.parseForStatement(node);

     case 68:
      if (46 === this.lookaheadCharCode()) break;
      return context && (this.state.strict ? this.raise(Errors.StrictFunction, {
        at: this.state.startLoc
      }) : "if" !== context && "label" !== context && this.raise(Errors.SloppyFunction, {
        at: this.state.startLoc
      })), this.parseFunctionStatement(node, !1, !context);

     case 80:
      return context && this.unexpected(), this.parseClass(node, !0);

     case 69:
      return this.parseIfStatement(node);

     case 70:
      return this.parseReturnStatement(node);

     case 71:
      return this.parseSwitchStatement(node);

     case 72:
      return this.parseThrowStatement(node);

     case 73:
      return this.parseTryStatement(node);

     case 75:
     case 74:
      return kind = kind || this.state.value, context && "var" !== kind && this.raise(Errors.UnexpectedLexicalDeclaration, {
        at: this.state.startLoc
      }), this.parseVarStatement(node, kind);

     case 92:
      return this.parseWhileStatement(node);

     case 76:
      return this.parseWithStatement(node);

     case 5:
      return this.parseBlock();

     case 13:
      return this.parseEmptyStatement(node);

     case 83:
      {
        const nextTokenCharCode = this.lookaheadCharCode();
        if (40 === nextTokenCharCode || 46 === nextTokenCharCode) break;
      }

     case 82:
      {
        let result;
        return this.options.allowImportExportEverywhere || topLevel || this.raise(Errors.UnexpectedImportExport, {
          at: this.state.startLoc
        }), this.next(), 83 === starttype ? (result = this.parseImport(node), "ImportDeclaration" !== result.type || result.importKind && "value" !== result.importKind || (this.sawUnambiguousESM = !0)) : (result = this.parseExport(node), 
        ("ExportNamedDeclaration" !== result.type || result.exportKind && "value" !== result.exportKind) && ("ExportAllDeclaration" !== result.type || result.exportKind && "value" !== result.exportKind) && "ExportDefaultDeclaration" !== result.type || (this.sawUnambiguousESM = !0)), 
        this.assertModuleNodeAllowed(node), result;
      }

     default:
      if (this.isAsyncFunction()) return context && this.raise(Errors.AsyncFunctionInSingleStatementContext, {
        at: this.state.startLoc
      }), this.next(), this.parseFunctionStatement(node, !0, !context);
    }
    const maybeName = this.state.value, expr = this.parseExpression();
    return tokenIsIdentifier(starttype) && "Identifier" === expr.type && this.eat(14) ? this.parseLabeledStatement(node, maybeName, expr, context) : this.parseExpressionStatement(node, expr);
  }
  assertModuleNodeAllowed(node) {
    this.options.allowImportExportEverywhere || this.inModule || this.raise(Errors.ImportOutsideModule, {
      at: node
    });
  }
  takeDecorators(node) {
    const decorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];
    decorators.length && (node.decorators = decorators, this.resetStartLocationFromNode(node, decorators[0]), 
    this.state.decoratorStack[this.state.decoratorStack.length - 1] = []);
  }
  canHaveLeadingDecorator() {
    return this.match(80);
  }
  parseDecorators(allowExport) {
    const currentContextDecorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];
    for (;this.match(26); ) {
      const decorator = this.parseDecorator();
      currentContextDecorators.push(decorator);
    }
    if (this.match(82)) allowExport || this.unexpected(), this.hasPlugin("decorators") && !this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(Errors.DecoratorExportClass, {
      at: this.state.startLoc
    }); else if (!this.canHaveLeadingDecorator()) throw this.raise(Errors.UnexpectedLeadingDecorator, {
      at: this.state.startLoc
    });
  }
  parseDecorator() {
    this.expectOnePlugin([ "decorators-legacy", "decorators" ]);
    const node = this.startNode();
    if (this.next(), this.hasPlugin("decorators")) {
      this.state.decoratorStack.push([]);
      const startPos = this.state.start, startLoc = this.state.startLoc;
      let expr;
      if (this.match(10)) {
        const startPos = this.state.start, startLoc = this.state.startLoc;
        this.next(), expr = this.parseExpression(), this.expect(11), expr = this.wrapParenthesis(startPos, startLoc, expr);
      } else for (expr = this.parseIdentifier(!1); this.eat(16); ) {
        const node = this.startNodeAt(startPos, startLoc);
        node.object = expr, node.property = this.parseIdentifier(!0), node.computed = !1, 
        expr = this.finishNode(node, "MemberExpression");
      }
      node.expression = this.parseMaybeDecoratorArguments(expr), this.state.decoratorStack.pop();
    } else node.expression = this.parseExprSubscripts();
    return this.finishNode(node, "Decorator");
  }
  parseMaybeDecoratorArguments(expr) {
    if (this.eat(10)) {
      const node = this.startNodeAtNode(expr);
      return node.callee = expr, node.arguments = this.parseCallExpressionArguments(11, !1), 
      this.toReferencedList(node.arguments), this.finishNode(node, "CallExpression");
    }
    return expr;
  }
  parseBreakContinueStatement(node, isBreak) {
    return this.next(), this.isLineTerminator() ? node.label = null : (node.label = this.parseIdentifier(), 
    this.semicolon()), this.verifyBreakContinue(node, isBreak), this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  }
  verifyBreakContinue(node, isBreak) {
    let i;
    for (i = 0; i < this.state.labels.length; ++i) {
      const lab = this.state.labels[i];
      if (null == node.label || lab.name === node.label.name) {
        if (null != lab.kind && (isBreak || "loop" === lab.kind)) break;
        if (node.label && isBreak) break;
      }
    }
    if (i === this.state.labels.length) {
      const type = isBreak ? "BreakStatement" : "ContinueStatement";
      this.raise(Errors.IllegalBreakContinue, {
        at: node,
        type
      });
    }
  }
  parseDebuggerStatement(node) {
    return this.next(), this.semicolon(), this.finishNode(node, "DebuggerStatement");
  }
  parseHeaderExpression() {
    this.expect(10);
    const val = this.parseExpression();
    return this.expect(11), val;
  }
  parseDoStatement(node) {
    return this.next(), this.state.labels.push(loopLabel), node.body = this.withSmartMixTopicForbiddingContext((() => this.parseStatement("do"))), 
    this.state.labels.pop(), this.expect(92), node.test = this.parseHeaderExpression(), 
    this.eat(13), this.finishNode(node, "DoWhileStatement");
  }
  parseForStatement(node) {
    this.next(), this.state.labels.push(loopLabel);
    let awaitAt = null;
    if (this.isAwaitAllowed() && this.eatContextual(96) && (awaitAt = this.state.lastTokStartLoc), 
    this.scope.enter(0), this.expect(10), this.match(13)) return null !== awaitAt && this.unexpected(awaitAt), 
    this.parseFor(node, null);
    const startsWithLet = this.isContextual(99), isLet = startsWithLet && this.isLetKeyword();
    if (this.match(74) || this.match(75) || isLet) {
      const init = this.startNode(), kind = isLet ? "let" : this.state.value;
      return this.next(), this.parseVar(init, !0, kind), this.finishNode(init, "VariableDeclaration"), 
      (this.match(58) || this.isContextual(101)) && 1 === init.declarations.length ? this.parseForIn(node, init, awaitAt) : (null !== awaitAt && this.unexpected(awaitAt), 
      this.parseFor(node, init));
    }
    const startsWithAsync = this.isContextual(95), refExpressionErrors = new ExpressionErrors, init = this.parseExpression(!0, refExpressionErrors), isForOf = this.isContextual(101);
    if (isForOf && (startsWithLet && this.raise(Errors.ForOfLet, {
      at: init
    }), null === awaitAt && startsWithAsync && "Identifier" === init.type && this.raise(Errors.ForOfAsync, {
      at: init
    })), isForOf || this.match(58)) {
      this.checkDestructuringPrivate(refExpressionErrors), this.toAssignable(init, !0);
      const type = isForOf ? "ForOfStatement" : "ForInStatement";
      return this.checkLVal(init, {
        in: {
          type
        }
      }), this.parseForIn(node, init, awaitAt);
    }
    return this.checkExpressionErrors(refExpressionErrors, !0), null !== awaitAt && this.unexpected(awaitAt), 
    this.parseFor(node, init);
  }
  parseFunctionStatement(node, isAsync, declarationPosition) {
    return this.next(), this.parseFunction(node, 1 | (declarationPosition ? 0 : 2), isAsync);
  }
  parseIfStatement(node) {
    return this.next(), node.test = this.parseHeaderExpression(), node.consequent = this.parseStatement("if"), 
    node.alternate = this.eat(66) ? this.parseStatement("if") : null, this.finishNode(node, "IfStatement");
  }
  parseReturnStatement(node) {
    return this.prodParam.hasReturn || this.options.allowReturnOutsideFunction || this.raise(Errors.IllegalReturn, {
      at: this.state.startLoc
    }), this.next(), this.isLineTerminator() ? node.argument = null : (node.argument = this.parseExpression(), 
    this.semicolon()), this.finishNode(node, "ReturnStatement");
  }
  parseSwitchStatement(node) {
    this.next(), node.discriminant = this.parseHeaderExpression();
    const cases = node.cases = [];
    let cur, sawDefault;
    for (this.expect(5), this.state.labels.push(switchLabel), this.scope.enter(0); !this.match(8); ) if (this.match(61) || this.match(65)) {
      const isCase = this.match(61);
      cur && this.finishNode(cur, "SwitchCase"), cases.push(cur = this.startNode()), cur.consequent = [], 
      this.next(), isCase ? cur.test = this.parseExpression() : (sawDefault && this.raise(Errors.MultipleDefaultsInSwitch, {
        at: this.state.lastTokStartLoc
      }), sawDefault = !0, cur.test = null), this.expect(14);
    } else cur ? cur.consequent.push(this.parseStatement(null)) : this.unexpected();
    return this.scope.exit(), cur && this.finishNode(cur, "SwitchCase"), this.next(), 
    this.state.labels.pop(), this.finishNode(node, "SwitchStatement");
  }
  parseThrowStatement(node) {
    return this.next(), this.hasPrecedingLineBreak() && this.raise(Errors.NewlineAfterThrow, {
      at: this.state.lastTokEndLoc
    }), node.argument = this.parseExpression(), this.semicolon(), this.finishNode(node, "ThrowStatement");
  }
  parseCatchClauseParam() {
    const param = this.parseBindingAtom(), simple = "Identifier" === param.type;
    return this.scope.enter(simple ? 8 : 0), this.checkLVal(param, {
      in: {
        type: "CatchClause"
      },
      binding: 9,
      allowingSloppyLetBinding: !0
    }), param;
  }
  parseTryStatement(node) {
    if (this.next(), node.block = this.parseBlock(), node.handler = null, this.match(62)) {
      const clause = this.startNode();
      this.next(), this.match(10) ? (this.expect(10), clause.param = this.parseCatchClauseParam(), 
      this.expect(11)) : (clause.param = null, this.scope.enter(0)), clause.body = this.withSmartMixTopicForbiddingContext((() => this.parseBlock(!1, !1))), 
      this.scope.exit(), node.handler = this.finishNode(clause, "CatchClause");
    }
    return node.finalizer = this.eat(67) ? this.parseBlock() : null, node.handler || node.finalizer || this.raise(Errors.NoCatchOrFinally, {
      at: node
    }), this.finishNode(node, "TryStatement");
  }
  parseVarStatement(node, kind, allowMissingInitializer = !1) {
    return this.next(), this.parseVar(node, !1, kind, allowMissingInitializer), this.semicolon(), 
    this.finishNode(node, "VariableDeclaration");
  }
  parseWhileStatement(node) {
    return this.next(), node.test = this.parseHeaderExpression(), this.state.labels.push(loopLabel), 
    node.body = this.withSmartMixTopicForbiddingContext((() => this.parseStatement("while"))), 
    this.state.labels.pop(), this.finishNode(node, "WhileStatement");
  }
  parseWithStatement(node) {
    return this.state.strict && this.raise(Errors.StrictWith, {
      at: this.state.startLoc
    }), this.next(), node.object = this.parseHeaderExpression(), node.body = this.withSmartMixTopicForbiddingContext((() => this.parseStatement("with"))), 
    this.finishNode(node, "WithStatement");
  }
  parseEmptyStatement(node) {
    return this.next(), this.finishNode(node, "EmptyStatement");
  }
  parseLabeledStatement(node, maybeName, expr, context) {
    for (const label of this.state.labels) label.name === maybeName && this.raise(Errors.LabelRedeclaration, {
      at: expr,
      labelName: maybeName
    });
    const kind = tokenIsLoop(this.state.type) ? "loop" : this.match(71) ? "switch" : null;
    for (let i = this.state.labels.length - 1; i >= 0; i--) {
      const label = this.state.labels[i];
      if (label.statementStart !== node.start) break;
      label.statementStart = this.state.start, label.kind = kind;
    }
    return this.state.labels.push({
      name: maybeName,
      kind,
      statementStart: this.state.start
    }), node.body = this.parseStatement(context ? -1 === context.indexOf("label") ? context + "label" : context : "label"), 
    this.state.labels.pop(), node.label = expr, this.finishNode(node, "LabeledStatement");
  }
  parseExpressionStatement(node, expr) {
    return node.expression = expr, this.semicolon(), this.finishNode(node, "ExpressionStatement");
  }
  parseBlock(allowDirectives = !1, createNewLexicalScope = !0, afterBlockParse) {
    const node = this.startNode();
    return allowDirectives && this.state.strictErrors.clear(), this.expect(5), createNewLexicalScope && this.scope.enter(0), 
    this.parseBlockBody(node, allowDirectives, !1, 8, afterBlockParse), createNewLexicalScope && this.scope.exit(), 
    this.finishNode(node, "BlockStatement");
  }
  isValidDirective(stmt) {
    return "ExpressionStatement" === stmt.type && "StringLiteral" === stmt.expression.type && !stmt.expression.extra.parenthesized;
  }
  parseBlockBody(node, allowDirectives, topLevel, end, afterBlockParse) {
    const body = node.body = [], directives = node.directives = [];
    this.parseBlockOrModuleBlockBody(body, allowDirectives ? directives : void 0, topLevel, end, afterBlockParse);
  }
  parseBlockOrModuleBlockBody(body, directives, topLevel, end, afterBlockParse) {
    const oldStrict = this.state.strict;
    let hasStrictModeDirective = !1, parsedNonDirective = !1;
    for (;!this.match(end); ) {
      const stmt = this.parseStatement(null, topLevel);
      if (directives && !parsedNonDirective) {
        if (this.isValidDirective(stmt)) {
          const directive = this.stmtToDirective(stmt);
          directives.push(directive), hasStrictModeDirective || "use strict" !== directive.value.value || (hasStrictModeDirective = !0, 
          this.setStrict(!0));
          continue;
        }
        parsedNonDirective = !0, this.state.strictErrors.clear();
      }
      body.push(stmt);
    }
    afterBlockParse && afterBlockParse.call(this, hasStrictModeDirective), oldStrict || this.setStrict(!1), 
    this.next();
  }
  parseFor(node, init) {
    return node.init = init, this.semicolon(!1), node.test = this.match(13) ? null : this.parseExpression(), 
    this.semicolon(!1), node.update = this.match(11) ? null : this.parseExpression(), 
    this.expect(11), node.body = this.withSmartMixTopicForbiddingContext((() => this.parseStatement("for"))), 
    this.scope.exit(), this.state.labels.pop(), this.finishNode(node, "ForStatement");
  }
  parseForIn(node, init, awaitAt) {
    const isForIn = this.match(58);
    return this.next(), isForIn ? null !== awaitAt && this.unexpected(awaitAt) : node.await = null !== awaitAt, 
    "VariableDeclaration" !== init.type || null == init.declarations[0].init || isForIn && !this.state.strict && "var" === init.kind && "Identifier" === init.declarations[0].id.type || this.raise(Errors.ForInOfLoopInitializer, {
      at: init,
      type: isForIn ? "ForInStatement" : "ForOfStatement"
    }), "AssignmentPattern" === init.type && this.raise(Errors.InvalidLhs, {
      at: init,
      ancestor: {
        type: "ForStatement"
      }
    }), node.left = init, node.right = isForIn ? this.parseExpression() : this.parseMaybeAssignAllowIn(), 
    this.expect(11), node.body = this.withSmartMixTopicForbiddingContext((() => this.parseStatement("for"))), 
    this.scope.exit(), this.state.labels.pop(), this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  }
  parseVar(node, isFor, kind, allowMissingInitializer = !1) {
    const declarations = node.declarations = [];
    for (node.kind = kind; ;) {
      const decl = this.startNode();
      if (this.parseVarId(decl, kind), decl.init = this.eat(29) ? isFor ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn() : null, 
      null !== decl.init || allowMissingInitializer || ("Identifier" === decl.id.type || isFor && (this.match(58) || this.isContextual(101)) ? "const" !== kind || this.match(58) || this.isContextual(101) || this.raise(Errors.DeclarationMissingInitializer, {
        at: this.state.lastTokEndLoc,
        kind: "const"
      }) : this.raise(Errors.DeclarationMissingInitializer, {
        at: this.state.lastTokEndLoc,
        kind: "destructuring"
      })), declarations.push(this.finishNode(decl, "VariableDeclarator")), !this.eat(12)) break;
    }
    return node;
  }
  parseVarId(decl, kind) {
    decl.id = this.parseBindingAtom(), this.checkLVal(decl.id, {
      in: {
        type: "VariableDeclarator"
      },
      binding: "var" === kind ? 5 : 9
    });
  }
  parseFunction(node, statement = 0, isAsync = !1) {
    const isStatement = 1 & statement, isHangingStatement = 2 & statement, requireId = !(!isStatement || 4 & statement);
    this.initFunction(node, isAsync), this.match(55) && isHangingStatement && this.raise(Errors.GeneratorInSingleStatementContext, {
      at: this.state.startLoc
    }), node.generator = this.eat(55), isStatement && (node.id = this.parseFunctionId(requireId));
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters;
    return this.state.maybeInArrowParameters = !1, this.scope.enter(2), this.prodParam.enter(functionFlags(isAsync, node.generator)), 
    isStatement || (node.id = this.parseFunctionId()), this.parseFunctionParams(node, !1), 
    this.withSmartMixTopicForbiddingContext((() => {
      this.parseFunctionBodyAndFinish(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
    })), this.prodParam.exit(), this.scope.exit(), isStatement && !isHangingStatement && this.registerFunctionStatementId(node), 
    this.state.maybeInArrowParameters = oldMaybeInArrowParameters, node;
  }
  parseFunctionId(requireId) {
    return requireId || tokenIsIdentifier(this.state.type) ? this.parseIdentifier() : null;
  }
  parseFunctionParams(node, allowModifiers) {
    this.expect(10), this.expressionScope.enter(newParameterDeclarationScope()), node.params = this.parseBindingList(11, 41, !1, allowModifiers), 
    this.expressionScope.exit();
  }
  registerFunctionStatementId(node) {
    node.id && this.scope.declareName(node.id.name, this.state.strict || node.generator || node.async ? this.scope.treatFunctionsAsVar ? 5 : 9 : 17, node.id.loc.start);
  }
  parseClass(node, isStatement, optionalId) {
    this.next(), this.takeDecorators(node);
    const oldStrict = this.state.strict;
    return this.state.strict = !0, this.parseClassId(node, isStatement, optionalId), 
    this.parseClassSuper(node), node.body = this.parseClassBody(!!node.superClass, oldStrict), 
    this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  }
  isClassProperty() {
    return this.match(29) || this.match(13) || this.match(8);
  }
  isClassMethod() {
    return this.match(10);
  }
  isNonstaticConstructor(method) {
    return !(method.computed || method.static || "constructor" !== method.key.name && "constructor" !== method.key.value);
  }
  parseClassBody(hadSuperClass, oldStrict) {
    this.classScope.enter();
    const state = {
      hadConstructor: !1,
      hadSuperClass
    };
    let decorators = [];
    const classBody = this.startNode();
    if (classBody.body = [], this.expect(5), this.withSmartMixTopicForbiddingContext((() => {
      for (;!this.match(8); ) {
        if (this.eat(13)) {
          if (decorators.length > 0) throw this.raise(Errors.DecoratorSemicolon, {
            at: this.state.lastTokEndLoc
          });
          continue;
        }
        if (this.match(26)) {
          decorators.push(this.parseDecorator());
          continue;
        }
        const member = this.startNode();
        decorators.length && (member.decorators = decorators, this.resetStartLocationFromNode(member, decorators[0]), 
        decorators = []), this.parseClassMember(classBody, member, state), "constructor" === member.kind && member.decorators && member.decorators.length > 0 && this.raise(Errors.DecoratorConstructor, {
          at: member
        });
      }
    })), this.state.strict = oldStrict, this.next(), decorators.length) throw this.raise(Errors.TrailingDecorator, {
      at: this.state.startLoc
    });
    return this.classScope.exit(), this.finishNode(classBody, "ClassBody");
  }
  parseClassMemberFromModifier(classBody, member) {
    const key = this.parseIdentifier(!0);
    if (this.isClassMethod()) {
      const method = member;
      return method.kind = "method", method.computed = !1, method.key = key, method.static = !1, 
      this.pushClassMethod(classBody, method, !1, !1, !1, !1), !0;
    }
    if (this.isClassProperty()) {
      const prop = member;
      return prop.computed = !1, prop.key = key, prop.static = !1, classBody.body.push(this.parseClassProperty(prop)), 
      !0;
    }
    return this.resetPreviousNodeTrailingComments(key), !1;
  }
  parseClassMember(classBody, member, state) {
    const isStatic = this.isContextual(104);
    if (isStatic) {
      if (this.parseClassMemberFromModifier(classBody, member)) return;
      if (this.eat(5)) return void this.parseClassStaticBlock(classBody, member);
    }
    this.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
  }
  parseClassMemberWithIsStatic(classBody, member, state, isStatic) {
    const publicMethod = member, privateMethod = member, publicProp = member, privateProp = member, accessorProp = member, method = publicMethod, publicMember = publicMethod;
    if (member.static = isStatic, this.parsePropertyNamePrefixOperator(member), this.eat(55)) {
      method.kind = "method";
      const isPrivateName = this.match(134);
      return this.parseClassElementName(method), isPrivateName ? void this.pushClassPrivateMethod(classBody, privateMethod, !0, !1) : (this.isNonstaticConstructor(publicMethod) && this.raise(Errors.ConstructorIsGenerator, {
        at: publicMethod.key
      }), void this.pushClassMethod(classBody, publicMethod, !0, !1, !1, !1));
    }
    const isContextual = tokenIsIdentifier(this.state.type) && !this.state.containsEsc, isPrivate = this.match(134), key = this.parseClassElementName(member), maybeQuestionTokenStartLoc = this.state.startLoc;
    if (this.parsePostMemberNameModifiers(publicMember), this.isClassMethod()) {
      if (method.kind = "method", isPrivate) return void this.pushClassPrivateMethod(classBody, privateMethod, !1, !1);
      const isConstructor = this.isNonstaticConstructor(publicMethod);
      let allowsDirectSuper = !1;
      isConstructor && (publicMethod.kind = "constructor", state.hadConstructor && !this.hasPlugin("typescript") && this.raise(Errors.DuplicateConstructor, {
        at: key
      }), isConstructor && this.hasPlugin("typescript") && member.override && this.raise(Errors.OverrideOnConstructor, {
        at: key
      }), state.hadConstructor = !0, allowsDirectSuper = state.hadSuperClass), this.pushClassMethod(classBody, publicMethod, !1, !1, isConstructor, allowsDirectSuper);
    } else if (this.isClassProperty()) isPrivate ? this.pushClassPrivateProperty(classBody, privateProp) : this.pushClassProperty(classBody, publicProp); else if (isContextual && "async" === key.name && !this.isLineTerminator()) {
      this.resetPreviousNodeTrailingComments(key);
      const isGenerator = this.eat(55);
      publicMember.optional && this.unexpected(maybeQuestionTokenStartLoc), method.kind = "method";
      const isPrivate = this.match(134);
      this.parseClassElementName(method), this.parsePostMemberNameModifiers(publicMember), 
      isPrivate ? this.pushClassPrivateMethod(classBody, privateMethod, isGenerator, !0) : (this.isNonstaticConstructor(publicMethod) && this.raise(Errors.ConstructorIsAsync, {
        at: publicMethod.key
      }), this.pushClassMethod(classBody, publicMethod, isGenerator, !0, !1, !1));
    } else if (!isContextual || "get" !== key.name && "set" !== key.name || this.match(55) && this.isLineTerminator()) if (isContextual && "accessor" === key.name && !this.isLineTerminator()) {
      this.expectPlugin("decoratorAutoAccessors"), this.resetPreviousNodeTrailingComments(key);
      const isPrivate = this.match(134);
      this.parseClassElementName(publicProp), this.pushClassAccessorProperty(classBody, accessorProp, isPrivate);
    } else this.isLineTerminator() ? isPrivate ? this.pushClassPrivateProperty(classBody, privateProp) : this.pushClassProperty(classBody, publicProp) : this.unexpected(); else {
      this.resetPreviousNodeTrailingComments(key), method.kind = key.name;
      const isPrivate = this.match(134);
      this.parseClassElementName(publicMethod), isPrivate ? this.pushClassPrivateMethod(classBody, privateMethod, !1, !1) : (this.isNonstaticConstructor(publicMethod) && this.raise(Errors.ConstructorIsAccessor, {
        at: publicMethod.key
      }), this.pushClassMethod(classBody, publicMethod, !1, !1, !1, !1)), this.checkGetterSetterParams(publicMethod);
    }
  }
  parseClassElementName(member) {
    const {type, value} = this.state;
    if (128 !== type && 129 !== type || !member.static || "prototype" !== value || this.raise(Errors.StaticPrototype, {
      at: this.state.startLoc
    }), 134 === type) {
      "constructor" === value && this.raise(Errors.ConstructorClassPrivateField, {
        at: this.state.startLoc
      });
      const key = this.parsePrivateName();
      return member.key = key, key;
    }
    return this.parsePropertyName(member);
  }
  parseClassStaticBlock(classBody, member) {
    var _member$decorators;
    this.scope.enter(208);
    const oldLabels = this.state.labels;
    this.state.labels = [], this.prodParam.enter(0);
    const body = member.body = [];
    this.parseBlockOrModuleBlockBody(body, void 0, !1, 8), this.prodParam.exit(), this.scope.exit(), 
    this.state.labels = oldLabels, classBody.body.push(this.finishNode(member, "StaticBlock")), 
    null != (_member$decorators = member.decorators) && _member$decorators.length && this.raise(Errors.DecoratorStaticBlock, {
      at: member
    });
  }
  pushClassProperty(classBody, prop) {
    prop.computed || "constructor" !== prop.key.name && "constructor" !== prop.key.value || this.raise(Errors.ConstructorClassField, {
      at: prop.key
    }), classBody.body.push(this.parseClassProperty(prop));
  }
  pushClassPrivateProperty(classBody, prop) {
    const node = this.parseClassPrivateProperty(prop);
    classBody.body.push(node), this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), 0, node.key.loc.start);
  }
  pushClassAccessorProperty(classBody, prop, isPrivate) {
    if (!isPrivate && !prop.computed) {
      const key = prop.key;
      "constructor" !== key.name && "constructor" !== key.value || this.raise(Errors.ConstructorClassField, {
        at: key
      });
    }
    const node = this.parseClassAccessorProperty(prop);
    classBody.body.push(node), isPrivate && this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), 0, node.key.loc.start);
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    classBody.body.push(this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", !0));
  }
  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
    const node = this.parseMethod(method, isGenerator, isAsync, !1, !1, "ClassPrivateMethod", !0);
    classBody.body.push(node);
    const kind = "get" === node.kind ? node.static ? 6 : 2 : "set" === node.kind ? node.static ? 5 : 1 : 0;
    this.declareClassPrivateMethodInScope(node, kind);
  }
  declareClassPrivateMethodInScope(node, kind) {
    this.classScope.declarePrivateName(this.getPrivateNameSV(node.key), kind, node.key.loc.start);
  }
  parsePostMemberNameModifiers(methodOrProp) {}
  parseClassPrivateProperty(node) {
    return this.parseInitializer(node), this.semicolon(), this.finishNode(node, "ClassPrivateProperty");
  }
  parseClassProperty(node) {
    return this.parseInitializer(node), this.semicolon(), this.finishNode(node, "ClassProperty");
  }
  parseClassAccessorProperty(node) {
    return this.parseInitializer(node), this.semicolon(), this.finishNode(node, "ClassAccessorProperty");
  }
  parseInitializer(node) {
    this.scope.enter(80), this.expressionScope.enter(newExpressionScope()), this.prodParam.enter(0), 
    node.value = this.eat(29) ? this.parseMaybeAssignAllowIn() : null, this.expressionScope.exit(), 
    this.prodParam.exit(), this.scope.exit();
  }
  parseClassId(node, isStatement, optionalId, bindingType = 139) {
    if (tokenIsIdentifier(this.state.type)) node.id = this.parseIdentifier(), isStatement && this.declareNameFromIdentifier(node.id, bindingType); else {
      if (!optionalId && isStatement) throw this.raise(Errors.MissingClassName, {
        at: this.state.startLoc
      });
      node.id = null;
    }
  }
  parseClassSuper(node) {
    node.superClass = this.eat(81) ? this.parseExprSubscripts() : null;
  }
  parseExport(node) {
    const hasDefault = this.maybeParseExportDefaultSpecifier(node), parseAfterDefault = !hasDefault || this.eat(12), hasStar = parseAfterDefault && this.eatExportStar(node), hasNamespace = hasStar && this.maybeParseExportNamespaceSpecifier(node), parseAfterNamespace = parseAfterDefault && (!hasNamespace || this.eat(12)), isFromRequired = hasDefault || hasStar;
    if (hasStar && !hasNamespace) return hasDefault && this.unexpected(), this.parseExportFrom(node, !0), 
    this.finishNode(node, "ExportAllDeclaration");
    const hasSpecifiers = this.maybeParseExportNamedSpecifiers(node);
    if (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers || hasNamespace && parseAfterNamespace && !hasSpecifiers) throw this.unexpected(null, 5);
    let hasDeclaration;
    if (isFromRequired || hasSpecifiers ? (hasDeclaration = !1, this.parseExportFrom(node, isFromRequired)) : hasDeclaration = this.maybeParseExportDeclaration(node), 
    isFromRequired || hasSpecifiers || hasDeclaration) return this.checkExport(node, !0, !1, !!node.source), 
    this.finishNode(node, "ExportNamedDeclaration");
    if (this.eat(65)) return node.declaration = this.parseExportDefaultExpression(), 
    this.checkExport(node, !0, !0), this.finishNode(node, "ExportDefaultDeclaration");
    throw this.unexpected(null, 5);
  }
  eatExportStar(node) {
    return this.eat(55);
  }
  maybeParseExportDefaultSpecifier(node) {
    if (this.isExportDefaultSpecifier()) {
      this.expectPlugin("exportDefaultFrom");
      const specifier = this.startNode();
      return specifier.exported = this.parseIdentifier(!0), node.specifiers = [ this.finishNode(specifier, "ExportDefaultSpecifier") ], 
      !0;
    }
    return !1;
  }
  maybeParseExportNamespaceSpecifier(node) {
    if (this.isContextual(93)) {
      node.specifiers || (node.specifiers = []);
      const specifier = this.startNodeAt(this.state.lastTokStart, this.state.lastTokStartLoc);
      return this.next(), specifier.exported = this.parseModuleExportName(), node.specifiers.push(this.finishNode(specifier, "ExportNamespaceSpecifier")), 
      !0;
    }
    return !1;
  }
  maybeParseExportNamedSpecifiers(node) {
    if (this.match(5)) {
      node.specifiers || (node.specifiers = []);
      const isTypeExport = "type" === node.exportKind;
      return node.specifiers.push(...this.parseExportSpecifiers(isTypeExport)), node.source = null, 
      node.declaration = null, this.hasPlugin("importAssertions") && (node.assertions = []), 
      !0;
    }
    return !1;
  }
  maybeParseExportDeclaration(node) {
    return !!this.shouldParseExportDeclaration() && (node.specifiers = [], node.source = null, 
    this.hasPlugin("importAssertions") && (node.assertions = []), node.declaration = this.parseExportDeclaration(node), 
    !0);
  }
  isAsyncFunction() {
    if (!this.isContextual(95)) return !1;
    const next = this.nextTokenStart();
    return !lineBreak.test(this.input.slice(this.state.pos, next)) && this.isUnparsedContextual(next, "function");
  }
  parseExportDefaultExpression() {
    const expr = this.startNode(), isAsync = this.isAsyncFunction();
    if (this.match(68) || isAsync) return this.next(), isAsync && this.next(), this.parseFunction(expr, 5, isAsync);
    if (this.match(80)) return this.parseClass(expr, !0, !0);
    if (this.match(26)) return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(Errors.DecoratorBeforeExport, {
      at: this.state.startLoc
    }), this.parseDecorators(!1), this.parseClass(expr, !0, !0);
    if (this.match(75) || this.match(74) || this.isLet()) throw this.raise(Errors.UnsupportedDefaultExport, {
      at: this.state.startLoc
    });
    const res = this.parseMaybeAssignAllowIn();
    return this.semicolon(), res;
  }
  parseExportDeclaration(node) {
    return this.parseStatement(null);
  }
  isExportDefaultSpecifier() {
    const {type} = this.state;
    if (tokenIsIdentifier(type)) {
      if (95 === type && !this.state.containsEsc || 99 === type) return !1;
      if ((126 === type || 125 === type) && !this.state.containsEsc) {
        const {type: nextType} = this.lookahead();
        if (tokenIsIdentifier(nextType) && 97 !== nextType || 5 === nextType) return this.expectOnePlugin([ "flow", "typescript" ]), 
        !1;
      }
    } else if (!this.match(65)) return !1;
    const next = this.nextTokenStart(), hasFrom = this.isUnparsedContextual(next, "from");
    if (44 === this.input.charCodeAt(next) || tokenIsIdentifier(this.state.type) && hasFrom) return !0;
    if (this.match(65) && hasFrom) {
      const nextAfterFrom = this.input.charCodeAt(this.nextTokenStartSince(next + 4));
      return 34 === nextAfterFrom || 39 === nextAfterFrom;
    }
    return !1;
  }
  parseExportFrom(node, expect) {
    if (this.eatContextual(97)) {
      node.source = this.parseImportSource(), this.checkExport(node);
      const assertions = this.maybeParseImportAssertions();
      assertions && (node.assertions = assertions);
    } else expect && this.unexpected();
    this.semicolon();
  }
  shouldParseExportDeclaration() {
    const {type} = this.state;
    if (26 === type && (this.expectOnePlugin([ "decorators", "decorators-legacy" ]), 
    this.hasPlugin("decorators"))) {
      if (this.getPluginOption("decorators", "decoratorsBeforeExport")) throw this.raise(Errors.DecoratorBeforeExport, {
        at: this.state.startLoc
      });
      return !0;
    }
    return 74 === type || 75 === type || 68 === type || 80 === type || this.isLet() || this.isAsyncFunction();
  }
  checkExport(node, checkNames, isDefault, isFrom) {
    if (checkNames) if (isDefault) {
      if (this.checkDuplicateExports(node, "default"), this.hasPlugin("exportDefaultFrom")) {
        var _declaration$extra;
        const declaration = node.declaration;
        "Identifier" !== declaration.type || "from" !== declaration.name || declaration.end - declaration.start != 4 || null != (_declaration$extra = declaration.extra) && _declaration$extra.parenthesized || this.raise(Errors.ExportDefaultFromAsIdentifier, {
          at: declaration
        });
      }
    } else if (node.specifiers && node.specifiers.length) for (const specifier of node.specifiers) {
      const {exported} = specifier, exportName = "Identifier" === exported.type ? exported.name : exported.value;
      if (this.checkDuplicateExports(specifier, exportName), !isFrom && specifier.local) {
        const {local} = specifier;
        "Identifier" !== local.type ? this.raise(Errors.ExportBindingIsString, {
          at: specifier,
          localName: local.value,
          exportName
        }) : (this.checkReservedWord(local.name, local.loc.start, !0, !1), this.scope.checkLocalExport(local));
      }
    } else if (node.declaration) if ("FunctionDeclaration" === node.declaration.type || "ClassDeclaration" === node.declaration.type) {
      const id = node.declaration.id;
      if (!id) throw new Error("Assertion failure");
      this.checkDuplicateExports(node, id.name);
    } else if ("VariableDeclaration" === node.declaration.type) for (const declaration of node.declaration.declarations) this.checkDeclaration(declaration.id);
    if (this.state.decoratorStack[this.state.decoratorStack.length - 1].length) throw this.raise(Errors.UnsupportedDecoratorExport, {
      at: node
    });
  }
  checkDeclaration(node) {
    if ("Identifier" === node.type) this.checkDuplicateExports(node, node.name); else if ("ObjectPattern" === node.type) for (const prop of node.properties) this.checkDeclaration(prop); else if ("ArrayPattern" === node.type) for (const elem of node.elements) elem && this.checkDeclaration(elem); else "ObjectProperty" === node.type ? this.checkDeclaration(node.value) : "RestElement" === node.type ? this.checkDeclaration(node.argument) : "AssignmentPattern" === node.type && this.checkDeclaration(node.left);
  }
  checkDuplicateExports(node, exportName) {
    this.exportedIdentifiers.has(exportName) && ("default" === exportName ? this.raise(Errors.DuplicateDefaultExport, {
      at: node
    }) : this.raise(Errors.DuplicateExport, {
      at: node,
      exportName
    })), this.exportedIdentifiers.add(exportName);
  }
  parseExportSpecifiers(isInTypeExport) {
    const nodes = [];
    let first = !0;
    for (this.expect(5); !this.eat(8); ) {
      if (first) first = !1; else if (this.expect(12), this.eat(8)) break;
      const isMaybeTypeOnly = this.isContextual(126), isString = this.match(129), node = this.startNode();
      node.local = this.parseModuleExportName(), nodes.push(this.parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly));
    }
    return nodes;
  }
  parseExportSpecifier(node, isString, isInTypeExport, isMaybeTypeOnly) {
    return this.eatContextual(93) ? node.exported = this.parseModuleExportName() : isString ? node.exported = cloneStringLiteral(node.local) : node.exported || (node.exported = cloneIdentifier(node.local)), 
    this.finishNode(node, "ExportSpecifier");
  }
  parseModuleExportName() {
    if (this.match(129)) {
      const result = this.parseStringLiteral(this.state.value), surrogate = result.value.match(loneSurrogate);
      return surrogate && this.raise(Errors.ModuleExportNameHasLoneSurrogate, {
        at: result,
        surrogateCharCode: surrogate[0].charCodeAt(0)
      }), result;
    }
    return this.parseIdentifier(!0);
  }
  parseImport(node) {
    if (node.specifiers = [], !this.match(129)) {
      const parseNext = !this.maybeParseDefaultImportSpecifier(node) || this.eat(12), hasStar = parseNext && this.maybeParseStarImportSpecifier(node);
      parseNext && !hasStar && this.parseNamedImportSpecifiers(node), this.expectContextual(97);
    }
    node.source = this.parseImportSource();
    const assertions = this.maybeParseImportAssertions();
    if (assertions) node.assertions = assertions; else {
      const attributes = this.maybeParseModuleAttributes();
      attributes && (node.attributes = attributes);
    }
    return this.semicolon(), this.finishNode(node, "ImportDeclaration");
  }
  parseImportSource() {
    return this.match(129) || this.unexpected(), this.parseExprAtom();
  }
  shouldParseDefaultImport(node) {
    return tokenIsIdentifier(this.state.type);
  }
  parseImportSpecifierLocal(node, specifier, type) {
    specifier.local = this.parseIdentifier(), node.specifiers.push(this.finishImportSpecifier(specifier, type));
  }
  finishImportSpecifier(specifier, type) {
    return this.checkLVal(specifier.local, {
      in: specifier,
      binding: 9
    }), this.finishNode(specifier, type);
  }
  parseAssertEntries() {
    const attrs = [], attrNames = new Set;
    do {
      if (this.match(8)) break;
      const node = this.startNode(), keyName = this.state.value;
      if (attrNames.has(keyName) && this.raise(Errors.ModuleAttributesWithDuplicateKeys, {
        at: this.state.startLoc,
        key: keyName
      }), attrNames.add(keyName), this.match(129) ? node.key = this.parseStringLiteral(keyName) : node.key = this.parseIdentifier(!0), 
      this.expect(14), !this.match(129)) throw this.raise(Errors.ModuleAttributeInvalidValue, {
        at: this.state.startLoc
      });
      node.value = this.parseStringLiteral(this.state.value), this.finishNode(node, "ImportAttribute"), 
      attrs.push(node);
    } while (this.eat(12));
    return attrs;
  }
  maybeParseModuleAttributes() {
    if (!this.match(76) || this.hasPrecedingLineBreak()) return this.hasPlugin("moduleAttributes") ? [] : null;
    this.expectPlugin("moduleAttributes"), this.next();
    const attrs = [], attributes = new Set;
    do {
      const node = this.startNode();
      if (node.key = this.parseIdentifier(!0), "type" !== node.key.name && this.raise(Errors.ModuleAttributeDifferentFromType, {
        at: node.key
      }), attributes.has(node.key.name) && this.raise(Errors.ModuleAttributesWithDuplicateKeys, {
        at: node.key,
        key: node.key.name
      }), attributes.add(node.key.name), this.expect(14), !this.match(129)) throw this.raise(Errors.ModuleAttributeInvalidValue, {
        at: this.state.startLoc
      });
      node.value = this.parseStringLiteral(this.state.value), this.finishNode(node, "ImportAttribute"), 
      attrs.push(node);
    } while (this.eat(12));
    return attrs;
  }
  maybeParseImportAssertions() {
    if (!this.isContextual(94) || this.hasPrecedingLineBreak()) return this.hasPlugin("importAssertions") ? [] : null;
    this.expectPlugin("importAssertions"), this.next(), this.eat(5);
    const attrs = this.parseAssertEntries();
    return this.eat(8), attrs;
  }
  maybeParseDefaultImportSpecifier(node) {
    return !!this.shouldParseDefaultImport(node) && (this.parseImportSpecifierLocal(node, this.startNode(), "ImportDefaultSpecifier"), 
    !0);
  }
  maybeParseStarImportSpecifier(node) {
    if (this.match(55)) {
      const specifier = this.startNode();
      return this.next(), this.expectContextual(93), this.parseImportSpecifierLocal(node, specifier, "ImportNamespaceSpecifier"), 
      !0;
    }
    return !1;
  }
  parseNamedImportSpecifiers(node) {
    let first = !0;
    for (this.expect(5); !this.eat(8); ) {
      if (first) first = !1; else {
        if (this.eat(14)) throw this.raise(Errors.DestructureNamedImport, {
          at: this.state.startLoc
        });
        if (this.expect(12), this.eat(8)) break;
      }
      const specifier = this.startNode(), importedIsString = this.match(129), isMaybeTypeOnly = this.isContextual(126);
      specifier.imported = this.parseModuleExportName();
      const importSpecifier = this.parseImportSpecifier(specifier, importedIsString, "type" === node.importKind || "typeof" === node.importKind, isMaybeTypeOnly);
      node.specifiers.push(importSpecifier);
    }
  }
  parseImportSpecifier(specifier, importedIsString, isInTypeOnlyImport, isMaybeTypeOnly) {
    if (this.eatContextual(93)) specifier.local = this.parseIdentifier(); else {
      const {imported} = specifier;
      if (importedIsString) throw this.raise(Errors.ImportBindingIsString, {
        at: specifier,
        importName: imported.value
      });
      this.checkReservedWord(imported.name, specifier.loc.start, !0, !0), specifier.local || (specifier.local = cloneIdentifier(imported));
    }
    return this.finishImportSpecifier(specifier, "ImportSpecifier");
  }
  isThisParam(param) {
    return "Identifier" === param.type && "this" === param.name;
  }
}

class Parser extends StatementParser {
  constructor(options, input) {
    super(options = getOptions(options), input), this.options = options, this.initializeScopes(), 
    this.plugins = pluginsMap(this.options.plugins), this.filename = options.sourceFilename;
  }
  getScopeHandler() {
    return ScopeHandler;
  }
  parse() {
    this.enterInitialScopes();
    const file = this.startNode(), program = this.startNode();
    return this.nextToken(), file.errors = null, this.parseTopLevel(file, program), 
    file.errors = this.state.errors, file;
  }
}

function pluginsMap(plugins) {
  const pluginMap = new Map;
  for (const plugin of plugins) {
    const [name, options] = Array.isArray(plugin) ? plugin : [ plugin, {} ];
    pluginMap.has(name) || pluginMap.set(name, options || {});
  }
  return pluginMap;
}

function parse(input, options) {
  var _options;
  if ("unambiguous" !== (null == (_options = options) ? void 0 : _options.sourceType)) return getParser(options, input).parse();
  options = Object.assign({}, options);
  try {
    options.sourceType = "module";
    const parser = getParser(options, input), ast = parser.parse();
    if (parser.sawUnambiguousESM) return ast;
    if (parser.ambiguousScriptDifferentAst) try {
      return options.sourceType = "script", getParser(options, input).parse();
    } catch (_unused) {} else ast.program.sourceType = "script";
    return ast;
  } catch (moduleError) {
    try {
      return options.sourceType = "script", getParser(options, input).parse();
    } catch (_unused2) {}
    throw moduleError;
  }
}

function parseExpression(input, options) {
  const parser = getParser(options, input);
  return parser.options.strictMode && (parser.state.strict = !0), parser.getExpression();
}

function generateExportedTokenTypes(internalTokenTypes) {
  const tokenTypes = {};
  for (const typeName of Object.keys(internalTokenTypes)) tokenTypes[typeName] = getExportedToken(internalTokenTypes[typeName]);
  return tokenTypes;
}

const tokTypes = generateExportedTokenTypes(tt);

function getParser(options, input) {
  let cls = Parser;
  return null != options && options.plugins && (validatePlugins(options.plugins), 
  cls = getParserClass(options.plugins)), new cls(options, input);
}

const parserClassCache = {};

function getParserClass(pluginsFromOptions) {
  const pluginList = mixinPluginNames.filter((name => hasPlugin(pluginsFromOptions, name))), key = pluginList.join("/");
  let cls = parserClassCache[key];
  if (!cls) {
    cls = Parser;
    for (const plugin of pluginList) cls = mixinPlugins[plugin](cls);
    parserClassCache[key] = cls;
  }
  return cls;
}

exports.parse = parse, exports.parseExpression = parseExpression, exports.tokTypes = tokTypes;