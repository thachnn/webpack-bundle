"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const beforeExpr = !0, startsExpr = !0, isLoop = !0, isAssign = !0, prefix = !0, postfix = !0;

class TokenType {
  constructor(label, conf = {}) {
    this.label = label, this.keyword = conf.keyword, this.beforeExpr = !!conf.beforeExpr, 
    this.startsExpr = !!conf.startsExpr, this.rightAssociative = !!conf.rightAssociative, 
    this.isLoop = !!conf.isLoop, this.isAssign = !!conf.isAssign, this.prefix = !!conf.prefix, 
    this.postfix = !!conf.postfix, this.binop = null != conf.binop ? conf.binop : null, 
    this.updateContext = null;
  }
}

const keywords = new Map;

function createKeyword(name, options = {}) {
  options.keyword = name;
  const token = new TokenType(name, options);
  return keywords.set(name, token), token;
}

function createBinop(name, binop) {
  return new TokenType(name, {
    beforeExpr: !0,
    binop: binop
  });
}

const types = {
  num: new TokenType("num", {
    startsExpr: !0
  }),
  bigint: new TokenType("bigint", {
    startsExpr: !0
  }),
  regexp: new TokenType("regexp", {
    startsExpr: !0
  }),
  string: new TokenType("string", {
    startsExpr: !0
  }),
  name: new TokenType("name", {
    startsExpr: !0
  }),
  eof: new TokenType("eof"),
  bracketL: new TokenType("[", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  bracketHashL: new TokenType("#[", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  bracketBarL: new TokenType("[|", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  bracketR: new TokenType("]"),
  bracketBarR: new TokenType("|]"),
  braceL: new TokenType("{", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  braceBarL: new TokenType("{|", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  braceHashL: new TokenType("#{", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  braceR: new TokenType("}"),
  braceBarR: new TokenType("|}"),
  parenL: new TokenType("(", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", {
    beforeExpr: !0
  }),
  semi: new TokenType(";", {
    beforeExpr: !0
  }),
  colon: new TokenType(":", {
    beforeExpr: !0
  }),
  doubleColon: new TokenType("::", {
    beforeExpr: !0
  }),
  dot: new TokenType("."),
  question: new TokenType("?", {
    beforeExpr: !0
  }),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", {
    beforeExpr: !0
  }),
  template: new TokenType("template"),
  ellipsis: new TokenType("...", {
    beforeExpr: !0
  }),
  backQuote: new TokenType("`", {
    startsExpr: !0
  }),
  dollarBraceL: new TokenType("${", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  at: new TokenType("@"),
  hash: new TokenType("#", {
    startsExpr: !0
  }),
  interpreterDirective: new TokenType("#!..."),
  eq: new TokenType("=", {
    beforeExpr: !0,
    isAssign: !0
  }),
  assign: new TokenType("_=", {
    beforeExpr: !0,
    isAssign: !0
  }),
  incDec: new TokenType("++/--", {
    prefix: !0,
    postfix: !0,
    startsExpr: !0
  }),
  bang: new TokenType("!", {
    beforeExpr: !0,
    prefix: !0,
    startsExpr: !0
  }),
  tilde: new TokenType("~", {
    beforeExpr: !0,
    prefix: !0,
    startsExpr: !0
  }),
  pipeline: createBinop("|>", 0),
  nullishCoalescing: createBinop("??", 1),
  logicalOR: createBinop("||", 1),
  logicalAND: createBinop("&&", 2),
  bitwiseOR: createBinop("|", 3),
  bitwiseXOR: createBinop("^", 4),
  bitwiseAND: createBinop("&", 5),
  equality: createBinop("==/!=/===/!==", 6),
  relational: createBinop("</>/<=/>=", 7),
  bitShift: createBinop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", {
    beforeExpr: !0,
    binop: 9,
    prefix: !0,
    startsExpr: !0
  }),
  modulo: new TokenType("%", {
    beforeExpr: !0,
    binop: 10,
    startsExpr: !0
  }),
  star: createBinop("*", 10),
  slash: createBinop("/", 10),
  exponent: new TokenType("**", {
    beforeExpr: !0,
    binop: 11,
    rightAssociative: !0
  }),
  _break: createKeyword("break"),
  _case: createKeyword("case", {
    beforeExpr: !0
  }),
  _catch: createKeyword("catch"),
  _continue: createKeyword("continue"),
  _debugger: createKeyword("debugger"),
  _default: createKeyword("default", {
    beforeExpr: !0
  }),
  _do: createKeyword("do", {
    isLoop: !0,
    beforeExpr: !0
  }),
  _else: createKeyword("else", {
    beforeExpr: !0
  }),
  _finally: createKeyword("finally"),
  _for: createKeyword("for", {
    isLoop: !0
  }),
  _function: createKeyword("function", {
    startsExpr: !0
  }),
  _if: createKeyword("if"),
  _return: createKeyword("return", {
    beforeExpr: !0
  }),
  _switch: createKeyword("switch"),
  _throw: createKeyword("throw", {
    beforeExpr: !0,
    prefix: !0,
    startsExpr: !0
  }),
  _try: createKeyword("try"),
  _var: createKeyword("var"),
  _const: createKeyword("const"),
  _while: createKeyword("while", {
    isLoop: !0
  }),
  _with: createKeyword("with"),
  _new: createKeyword("new", {
    beforeExpr: !0,
    startsExpr: !0
  }),
  _this: createKeyword("this", {
    startsExpr: !0
  }),
  _super: createKeyword("super", {
    startsExpr: !0
  }),
  _class: createKeyword("class", {
    startsExpr: !0
  }),
  _extends: createKeyword("extends", {
    beforeExpr: !0
  }),
  _export: createKeyword("export"),
  _import: createKeyword("import", {
    startsExpr: !0
  }),
  _null: createKeyword("null", {
    startsExpr: !0
  }),
  _true: createKeyword("true", {
    startsExpr: !0
  }),
  _false: createKeyword("false", {
    startsExpr: !0
  }),
  _in: createKeyword("in", {
    beforeExpr: !0,
    binop: 7
  }),
  _instanceof: createKeyword("instanceof", {
    beforeExpr: !0,
    binop: 7
  }),
  _typeof: createKeyword("typeof", {
    beforeExpr: !0,
    prefix: !0,
    startsExpr: !0
  }),
  _void: createKeyword("void", {
    beforeExpr: !0,
    prefix: !0,
    startsExpr: !0
  }),
  _delete: createKeyword("delete", {
    beforeExpr: !0,
    prefix: !0,
    startsExpr: !0
  })
}, SCOPE_OTHER = 0, SCOPE_PROGRAM = 1, SCOPE_FUNCTION = 2, SCOPE_ARROW = 4, SCOPE_SIMPLE_CATCH = 8, SCOPE_SUPER = 16, SCOPE_DIRECT_SUPER = 32, SCOPE_CLASS = 64, SCOPE_TS_MODULE = 128, SCOPE_VAR = 131, BIND_KIND_VALUE = 1, BIND_KIND_TYPE = 2, BIND_SCOPE_VAR = 4, BIND_SCOPE_LEXICAL = 8, BIND_SCOPE_FUNCTION = 16, BIND_FLAGS_NONE = 64, BIND_FLAGS_CLASS = 128, BIND_FLAGS_TS_ENUM = 256, BIND_FLAGS_TS_CONST_ENUM = 512, BIND_FLAGS_TS_EXPORT_ONLY = 1024, BIND_CLASS = 139, BIND_LEXICAL = 9, BIND_VAR = 5, BIND_FUNCTION = 17, BIND_TS_INTERFACE = 130, BIND_TS_TYPE = 2, BIND_TS_ENUM = 267, BIND_TS_AMBIENT = 1024, BIND_NONE = 64, BIND_OUTSIDE = 65, BIND_TS_CONST_ENUM = 779, BIND_TS_NAMESPACE = 1024, CLASS_ELEMENT_FLAG_STATIC = 4, CLASS_ELEMENT_KIND_GETTER = 2, CLASS_ELEMENT_KIND_SETTER = 1, CLASS_ELEMENT_KIND_ACCESSOR = 3, CLASS_ELEMENT_STATIC_GETTER = 6, CLASS_ELEMENT_STATIC_SETTER = 5, CLASS_ELEMENT_INSTANCE_GETTER = 2, CLASS_ELEMENT_INSTANCE_SETTER = 1, CLASS_ELEMENT_OTHER = 0, lineBreak = /\r\n?|[\n\u2028\u2029]/, lineBreakG = new RegExp(lineBreak.source, "g");

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

const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

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

class Position {
  constructor(line, col) {
    this.line = line, this.column = col;
  }
}

class SourceLocation {
  constructor(start, end) {
    this.start = start, this.end = end;
  }
}

function getLineInfo(input, offset) {
  let match, line = 1, lineStart = 0;
  for (lineBreakG.lastIndex = 0; (match = lineBreakG.exec(input)) && match.index < offset; ) line++, 
  lineStart = lineBreakG.lastIndex;
  return new Position(line, offset - lineStart);
}

class BaseParser {
  constructor() {
    this.sawUnambiguousESM = !1, this.ambiguousScriptDifferentAst = !1;
  }
  hasPlugin(name) {
    return this.plugins.has(name);
  }
  getPluginOption(plugin, name) {
    if (this.hasPlugin(plugin)) return this.plugins.get(plugin)[name];
  }
}

function last(stack) {
  return stack[stack.length - 1];
}

class CommentsParser extends BaseParser {
  addComment(comment) {
    this.filename && (comment.loc.filename = this.filename), this.state.trailingComments.push(comment), 
    this.state.leadingComments.push(comment);
  }
  adjustCommentsAfterTrailingComma(node, elements, takeAllComments) {
    if (0 === this.state.leadingComments.length) return;
    let lastElement = null, i = elements.length;
    for (;null === lastElement && i > 0; ) lastElement = elements[--i];
    if (null === lastElement) return;
    for (let j = 0; j < this.state.leadingComments.length; j++) this.state.leadingComments[j].end < this.state.commentPreviousNode.end && (this.state.leadingComments.splice(j, 1), 
    j--);
    const newTrailingComments = [];
    for (let i = 0; i < this.state.leadingComments.length; i++) {
      const leadingComment = this.state.leadingComments[i];
      leadingComment.end < node.end ? (newTrailingComments.push(leadingComment), takeAllComments || (this.state.leadingComments.splice(i, 1), 
      i--)) : (void 0 === node.trailingComments && (node.trailingComments = []), node.trailingComments.push(leadingComment));
    }
    takeAllComments && (this.state.leadingComments = []), newTrailingComments.length > 0 ? lastElement.trailingComments = newTrailingComments : void 0 !== lastElement.trailingComments && (lastElement.trailingComments = []);
  }
  processComment(node) {
    if ("Program" === node.type && node.body.length > 0) return;
    const stack = this.state.commentStack;
    let firstChild, lastChild, trailingComments, i, j;
    if (this.state.trailingComments.length > 0) this.state.trailingComments[0].start >= node.end ? (trailingComments = this.state.trailingComments, 
    this.state.trailingComments = []) : this.state.trailingComments.length = 0; else if (stack.length > 0) {
      const lastInStack = last(stack);
      lastInStack.trailingComments && lastInStack.trailingComments[0].start >= node.end && (trailingComments = lastInStack.trailingComments, 
      delete lastInStack.trailingComments);
    }
    for (stack.length > 0 && last(stack).start >= node.start && (firstChild = stack.pop()); stack.length > 0 && last(stack).start >= node.start; ) lastChild = stack.pop();
    if (!lastChild && firstChild && (lastChild = firstChild), firstChild) switch (node.type) {
     case "ObjectExpression":
      this.adjustCommentsAfterTrailingComma(node, node.properties);
      break;

     case "ObjectPattern":
      this.adjustCommentsAfterTrailingComma(node, node.properties, !0);
      break;

     case "CallExpression":
      this.adjustCommentsAfterTrailingComma(node, node.arguments);
      break;

     case "ArrayExpression":
      this.adjustCommentsAfterTrailingComma(node, node.elements);
      break;

     case "ArrayPattern":
      this.adjustCommentsAfterTrailingComma(node, node.elements, !0);
    } else this.state.commentPreviousNode && ("ImportSpecifier" === this.state.commentPreviousNode.type && "ImportSpecifier" !== node.type || "ExportSpecifier" === this.state.commentPreviousNode.type && "ExportSpecifier" !== node.type) && this.adjustCommentsAfterTrailingComma(node, [ this.state.commentPreviousNode ]);
    if (lastChild) {
      if (lastChild.leadingComments) if (lastChild !== node && lastChild.leadingComments.length > 0 && last(lastChild.leadingComments).end <= node.start) node.leadingComments = lastChild.leadingComments, 
      delete lastChild.leadingComments; else for (i = lastChild.leadingComments.length - 2; i >= 0; --i) if (lastChild.leadingComments[i].end <= node.start) {
        node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
        break;
      }
    } else if (this.state.leadingComments.length > 0) if (last(this.state.leadingComments).end <= node.start) {
      if (this.state.commentPreviousNode) for (j = 0; j < this.state.leadingComments.length; j++) this.state.leadingComments[j].end < this.state.commentPreviousNode.end && (this.state.leadingComments.splice(j, 1), 
      j--);
      this.state.leadingComments.length > 0 && (node.leadingComments = this.state.leadingComments, 
      this.state.leadingComments = []);
    } else {
      for (i = 0; i < this.state.leadingComments.length && !(this.state.leadingComments[i].end > node.start); i++) ;
      const leadingComments = this.state.leadingComments.slice(0, i);
      leadingComments.length && (node.leadingComments = leadingComments), trailingComments = this.state.leadingComments.slice(i), 
      0 === trailingComments.length && (trailingComments = null);
    }
    if (this.state.commentPreviousNode = node, trailingComments) if (trailingComments.length && trailingComments[0].start >= node.start && last(trailingComments).end <= node.end) node.innerComments = trailingComments; else {
      const firstTrailingCommentIndex = trailingComments.findIndex(comment => comment.end >= node.end);
      firstTrailingCommentIndex > 0 ? (node.innerComments = trailingComments.slice(0, firstTrailingCommentIndex), 
      node.trailingComments = trailingComments.slice(firstTrailingCommentIndex)) : node.trailingComments = trailingComments;
    }
    stack.push(node);
  }
}

const ErrorMessages = Object.freeze({
  ArgumentsDisallowedInInitializer: "'arguments' is not allowed in class field initializer",
  AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block",
  AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function",
  AwaitExpressionFormalParameter: "await is not allowed in async function parameters",
  AwaitNotInAsyncFunction: "Can not use keyword 'await' outside an async function",
  BadGetterArity: "getter must not have any formal parameters",
  BadSetterArity: "setter must have exactly one formal parameter",
  BadSetterRestParameter: "setter function argument must not be a rest parameter",
  ConstructorClassField: "Classes may not have a field named 'constructor'",
  ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'",
  ConstructorIsAccessor: "Class constructor may not be an accessor",
  ConstructorIsAsync: "Constructor can't be an async function",
  ConstructorIsGenerator: "Constructor can't be a generator",
  DeclarationMissingInitializer: "%0 require an initialization value",
  DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. You can set the 'decoratorsBeforeExport' option to false to use the 'export @decorator class {}' syntax",
  DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
  DecoratorExportClass: "Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.",
  DecoratorSemicolon: "Decorators must not be followed by a semicolon",
  DeletePrivateField: "Deleting a private field is not allowed",
  DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
  DuplicateConstructor: "Duplicate constructor in the same class",
  DuplicateDefaultExport: "Only one default export allowed per module.",
  DuplicateExport: "`%0` has already been exported. Exported identifiers must be unique.",
  DuplicateProto: "Redefinition of __proto__ property",
  DuplicateRegExpFlags: "Duplicate regular expression flag",
  ElementAfterRest: "Rest element must be last element",
  EscapedCharNotAnIdentifier: "Invalid Unicode escape",
  ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'",
  ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
  GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block",
  IllegalBreakContinue: "Unsyntactic %0",
  IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
  IllegalReturn: "'return' outside of function",
  ImportCallArgumentTrailingComma: "Trailing comma is disallowed inside import(...) arguments",
  ImportCallArity: "import() requires exactly %0",
  ImportCallNotNewExpression: "Cannot use new with import(...)",
  ImportCallSpreadArgument: "... is not allowed in import()",
  ImportMetaOutsideModule: "import.meta may appear only with 'sourceType: \"module\"'",
  ImportOutsideModule: "'import' and 'export' may appear only with 'sourceType: \"module\"'",
  InvalidBigIntLiteral: "Invalid BigIntLiteral",
  InvalidCodePoint: "Code point out of bounds",
  InvalidDigit: "Expected number in radix %0",
  InvalidEscapeSequence: "Bad character escape sequence",
  InvalidEscapeSequenceTemplate: "Invalid escape sequence in template",
  InvalidEscapedReservedWord: "Escape sequence in keyword %0",
  InvalidIdentifier: "Invalid identifier %0",
  InvalidLhs: "Invalid left-hand side in %0",
  InvalidLhsBinding: "Binding invalid left-hand side in %0",
  InvalidNumber: "Invalid number",
  InvalidOrUnexpectedToken: "Unexpected character '%0'",
  InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern",
  InvalidPrivateFieldResolution: "Private name #%0 is not defined",
  InvalidPropertyBindingPattern: "Binding member expression",
  InvalidRecordProperty: "Only properties and spread elements are allowed in record definitions",
  InvalidRestAssignmentPattern: "Invalid rest operator's argument",
  LabelRedeclaration: "Label '%0' is already declared",
  LetInLexicalBinding: "'let' is not allowed to be used as a name in 'let' or 'const' declarations.",
  MalformedRegExpFlags: "Invalid regular expression flag",
  MissingClassName: "A class name is required",
  MissingEqInAssignment: "Only '=' operator can be used for specifying default value.",
  MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX",
  MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators",
  ModuleAttributeDifferentFromType: "The only accepted module attribute is `type`",
  ModuleAttributeInvalidValue: "Only string literals are allowed as module attribute values",
  ModuleAttributesWithDuplicateKeys: 'Duplicate key "%0" is not allowed in module attributes',
  ModuleExportUndefined: "Export '%0' is not defined",
  MultipleDefaultsInSwitch: "Multiple default clauses",
  NewlineAfterThrow: "Illegal newline after throw",
  NoCatchOrFinally: "Missing catch or finally clause",
  NumberIdentifier: "Identifier directly after number",
  NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences",
  ObsoleteAwaitStar: "await* has been removed from the async functions proposal. Use Promise.all() instead.",
  OptionalChainingNoNew: "constructors in/after an Optional Chain are not allowed",
  OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain",
  ParamDupe: "Argument name clash",
  PatternHasAccessor: "Object pattern can't contain getter or setter",
  PatternHasMethod: "Object pattern can't contain methods",
  PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized',
  PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression",
  PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression",
  PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference",
  PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding",
  PrimaryTopicRequiresSmartPipeline: "Primary Topic Reference found but pipelineOperator not passed 'smart' for 'proposal' option.",
  PrivateInExpectedIn: "Private names are only allowed in property accesses (`obj.#%0`) or in `in` expressions (`#%0 in obj`)",
  PrivateNameRedeclaration: "Duplicate private name #%0",
  RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'",
  RecordNoProto: "'__proto__' is not allowed in Record expressions",
  RestTrailingComma: "Unexpected trailing comma after rest element",
  SloppyFunction: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement",
  StaticPrototype: "Classes may not have static property named prototype",
  StrictDelete: "Deleting local variable in strict mode",
  StrictEvalArguments: "Assigning to '%0' in strict mode",
  StrictEvalArgumentsBinding: "Binding '%0' in strict mode",
  StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
  StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode",
  StrictWith: "'with' in strict mode",
  SuperNotAllowed: "super() is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
  SuperPrivateField: "Private fields can't be accessed on super",
  TrailingDecorator: "Decorators must be attached to a class element",
  TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'",
  UnexpectedArgumentPlaceholder: "Unexpected argument placeholder",
  UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal',
  UnexpectedDigitAfterHash: "Unexpected digit after hash token",
  UnexpectedImportExport: "'import' and 'export' may only appear at the top level",
  UnexpectedKeyword: "Unexpected keyword '%0'",
  UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration",
  UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context",
  UnexpectedNewTarget: "new.target can only be used in functions",
  UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits",
  UnexpectedPrivateField: "Private names can only be used as the name of a class element (i.e. class C { #p = 42; #m() {} } )\n or a property of member expression (i.e. this.#p).",
  UnexpectedReservedWord: "Unexpected reserved word '%0'",
  UnexpectedSuper: "super is only allowed in object methods and classes",
  UnexpectedToken: "Unexpected token '%0'",
  UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
  UnsupportedBind: "Binding should be performed on object property.",
  UnsupportedDecoratorExport: "A decorated export must export a class declaration",
  UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.",
  UnsupportedImport: "import can only be used in import() or import.meta",
  UnsupportedMetaProperty: "The only valid meta property for %0 is %0.%1",
  UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters",
  UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties",
  UnsupportedSuper: "super can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop])",
  UnterminatedComment: "Unterminated comment",
  UnterminatedRegExp: "Unterminated regular expression",
  UnterminatedString: "Unterminated string constant",
  UnterminatedTemplate: "Unterminated template",
  VarRedeclaration: "Identifier '%0' has already been declared",
  YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator",
  YieldInParameter: "yield is not allowed in generator parameters",
  ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0"
});

class ParserError extends CommentsParser {
  getLocationForPosition(pos) {
    let loc;
    return loc = pos === this.state.start ? this.state.startLoc : pos === this.state.lastTokStart ? this.state.lastTokStartLoc : pos === this.state.end ? this.state.endLoc : pos === this.state.lastTokEnd ? this.state.lastTokEndLoc : getLineInfo(this.input, pos), 
    loc;
  }
  raise(pos, errorTemplate, ...params) {
    return this.raiseWithData(pos, void 0, errorTemplate, ...params);
  }
  raiseWithData(pos, data, errorTemplate, ...params) {
    const loc = this.getLocationForPosition(pos), message = errorTemplate.replace(/%(\d+)/g, (_, i) => params[i]) + ` (${loc.line}:${loc.column})`;
    return this._raise(Object.assign({
      loc: loc,
      pos: pos
    }, data), message);
  }
  _raise(errorContext, message) {
    const err = new SyntaxError(message);
    if (Object.assign(err, errorContext), this.options.errorRecovery) return this.isLookahead || this.state.errors.push(err), 
    err;
    throw err;
  }
}

function isSimpleProperty(node) {
  return null != node && "Property" === node.type && "init" === node.kind && !1 === node.method;
}

var estree = superClass => class extends superClass {
  estreeParseRegExpLiteral({pattern: pattern, flags: flags}) {
    let regex = null;
    try {
      regex = new RegExp(pattern, flags);
    } catch (e) {}
    const node = this.estreeParseLiteral(regex);
    return node.regex = {
      pattern: pattern,
      flags: flags
    }, node;
  }
  estreeParseBigIntLiteral(value) {
    const bigInt = "undefined" != typeof BigInt ? BigInt(value) : null, node = this.estreeParseLiteral(bigInt);
    return node.bigint = String(node.value || value), node;
  }
  estreeParseLiteral(value) {
    return this.parseLiteral(value, "Literal");
  }
  directiveToStmt(directive) {
    const directiveLiteral = directive.value, stmt = this.startNodeAt(directive.start, directive.loc.start), expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);
    return expression.value = directiveLiteral.value, expression.raw = directiveLiteral.extra.raw, 
    stmt.expression = this.finishNodeAt(expression, "Literal", directiveLiteral.end, directiveLiteral.loc.end), 
    stmt.directive = directiveLiteral.extra.raw.slice(1, -1), this.finishNodeAt(stmt, "ExpressionStatement", directive.end, directive.loc.end);
  }
  initFunction(node, isAsync) {
    super.initFunction(node, isAsync), node.expression = !1;
  }
  checkDeclaration(node) {
    isSimpleProperty(node) ? this.checkDeclaration(node.value) : super.checkDeclaration(node);
  }
  checkGetterSetterParams(method) {
    const prop = method, paramCount = "get" === prop.kind ? 0 : 1, start = prop.start;
    prop.value.params.length !== paramCount ? "get" === method.kind ? this.raise(start, ErrorMessages.BadGetterArity) : this.raise(start, ErrorMessages.BadSetterArity) : "set" === prop.kind && "RestElement" === prop.value.params[0].type && this.raise(start, ErrorMessages.BadSetterRestParameter);
  }
  checkLVal(expr, bindingType = 64, checkClashes, contextDescription, disallowLetBinding) {
    switch (expr.type) {
     case "ObjectPattern":
      expr.properties.forEach(prop => {
        this.checkLVal("Property" === prop.type ? prop.value : prop, bindingType, checkClashes, "object destructuring pattern", disallowLetBinding);
      });
      break;

     default:
      super.checkLVal(expr, bindingType, checkClashes, contextDescription, disallowLetBinding);
    }
  }
  checkProto(prop, isRecord, protoRef, refExpressionErrors) {
    prop.method || super.checkProto(prop, isRecord, protoRef, refExpressionErrors);
  }
  isValidDirective(stmt) {
    var _stmt$expression$extr;
    return "ExpressionStatement" === stmt.type && "Literal" === stmt.expression.type && "string" == typeof stmt.expression.value && !(null == (_stmt$expression$extr = stmt.expression.extra) ? void 0 : _stmt$expression$extr.parenthesized);
  }
  stmtToDirective(stmt) {
    const directive = super.stmtToDirective(stmt), value = stmt.expression.value;
    return directive.value.value = value, directive;
  }
  parseBlockBody(node, allowDirectives, topLevel, end) {
    super.parseBlockBody(node, allowDirectives, topLevel, end);
    const directiveStatements = node.directives.map(d => this.directiveToStmt(d));
    node.body = directiveStatements.concat(node.body), delete node.directives;
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", !0), 
    method.typeParameters && (method.value.typeParameters = method.typeParameters, delete method.typeParameters), 
    classBody.body.push(method);
  }
  parseExprAtom(refExpressionErrors) {
    switch (this.state.type) {
     case types.num:
     case types.string:
      return this.estreeParseLiteral(this.state.value);

     case types.regexp:
      return this.estreeParseRegExpLiteral(this.state.value);

     case types.bigint:
      return this.estreeParseBigIntLiteral(this.state.value);

     case types._null:
      return this.estreeParseLiteral(null);

     case types._true:
      return this.estreeParseLiteral(!0);

     case types._false:
      return this.estreeParseLiteral(!1);

     default:
      return super.parseExprAtom(refExpressionErrors);
    }
  }
  parseLiteral(value, type, startPos, startLoc) {
    const node = super.parseLiteral(value, type, startPos, startLoc);
    return node.raw = node.extra.raw, delete node.extra, node;
  }
  parseFunctionBody(node, allowExpression, isMethod = !1) {
    super.parseFunctionBody(node, allowExpression, isMethod), node.expression = "BlockStatement" !== node.body.type;
  }
  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = !1) {
    let funcNode = this.startNode();
    return funcNode.kind = node.kind, funcNode = super.parseMethod(funcNode, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope), 
    funcNode.type = "FunctionExpression", delete funcNode.kind, node.value = funcNode, 
    type = "ClassMethod" === type ? "MethodDefinition" : type, this.finishNode(node, type);
  }
  parseObjectMethod(prop, isGenerator, isAsync, isPattern, containsEsc) {
    const node = super.parseObjectMethod(prop, isGenerator, isAsync, isPattern, containsEsc);
    return node && (node.type = "Property", "method" === node.kind && (node.kind = "init"), 
    node.shorthand = !1), node;
  }
  parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors) {
    const node = super.parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors);
    return node && (node.kind = "init", node.type = "Property"), node;
  }
  toAssignable(node) {
    return isSimpleProperty(node) ? (this.toAssignable(node.value), node) : super.toAssignable(node);
  }
  toAssignableObjectExpressionProp(prop, isLast) {
    if ("get" === prop.kind || "set" === prop.kind) throw this.raise(prop.key.start, ErrorMessages.PatternHasAccessor);
    if (prop.method) throw this.raise(prop.key.start, ErrorMessages.PatternHasMethod);
    super.toAssignableObjectExpressionProp(prop, isLast);
  }
  finishCallExpression(node, optional) {
    return super.finishCallExpression(node, optional), "Import" === node.callee.type ? (node.type = "ImportExpression", 
    node.source = node.arguments[0], delete node.arguments, delete node.callee) : "CallExpression" === node.type && (node.optional = !1), 
    node;
  }
  toReferencedListDeep(exprList, isParenthesizedExpr) {
    exprList && super.toReferencedListDeep(exprList, isParenthesizedExpr);
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
  parseSubscript(...args) {
    const node = super.parseSubscript(...args);
    return "MemberExpression" === node.type && (node.optional = !1), node;
  }
};

class TokContext {
  constructor(token, isExpr, preserveSpace, override) {
    this.token = token, this.isExpr = !!isExpr, this.preserveSpace = !!preserveSpace, 
    this.override = override;
  }
}

const types$1 = {
  braceStatement: new TokContext("{", !1),
  braceExpression: new TokContext("{", !0),
  templateQuasi: new TokContext("${", !1),
  parenStatement: new TokContext("(", !1),
  parenExpression: new TokContext("(", !0),
  template: new TokContext("`", !0, !0, p => p.readTmplToken()),
  functionExpression: new TokContext("function", !0),
  functionStatement: new TokContext("function", !1)
};

types.parenR.updateContext = types.braceR.updateContext = function() {
  if (1 === this.state.context.length) return void (this.state.exprAllowed = !0);
  let out = this.state.context.pop();
  out === types$1.braceStatement && "function" === this.curContext().token && (out = this.state.context.pop()), 
  this.state.exprAllowed = !out.isExpr;
}, types.name.updateContext = function(prevType) {
  let allowed = !1;
  prevType !== types.dot && ("of" === this.state.value && !this.state.exprAllowed && prevType !== types._function && prevType !== types._class || "yield" === this.state.value && this.prodParam.hasYield) && (allowed = !0), 
  this.state.exprAllowed = allowed, this.state.isIterator && (this.state.isIterator = !1);
}, types.braceL.updateContext = function(prevType) {
  this.state.context.push(this.braceIsBlock(prevType) ? types$1.braceStatement : types$1.braceExpression), 
  this.state.exprAllowed = !0;
}, types.dollarBraceL.updateContext = function() {
  this.state.context.push(types$1.templateQuasi), this.state.exprAllowed = !0;
}, types.parenL.updateContext = function(prevType) {
  const statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
  this.state.context.push(statementParens ? types$1.parenStatement : types$1.parenExpression), 
  this.state.exprAllowed = !0;
}, types.incDec.updateContext = function() {}, types._function.updateContext = types._class.updateContext = function(prevType) {
  prevType === types.dot || prevType === types.questionDot || (!prevType.beforeExpr || prevType === types.semi || prevType === types._else || prevType === types._return && lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start)) || (prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat ? this.state.context.push(types$1.functionStatement) : this.state.context.push(types$1.functionExpression)), 
  this.state.exprAllowed = !1;
}, types.backQuote.updateContext = function() {
  this.curContext() === types$1.template ? this.state.context.pop() : this.state.context.push(types$1.template), 
  this.state.exprAllowed = !1;
}, types.star.updateContext = function() {
  this.state.exprAllowed = !1;
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

const reservedWords = {
  keyword: [ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete" ],
  strict: [ "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield" ],
  strictBind: [ "eval", "arguments" ]
}, keywords$1 = new Set(reservedWords.keyword), reservedWordsStrictSet = new Set(reservedWords.strict), reservedWordsStrictBindSet = new Set(reservedWords.strictBind);

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
  return keywords$1.has(word);
}

const keywordRelationalOperator = /^in(stanceof)?$/;

function isIteratorStart(current, next) {
  return 64 === current && 64 === next;
}

const reservedTypes = new Set([ "_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void" ]), FlowErrors = Object.freeze({
  AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
  AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module",
  AssignReservedType: "Cannot overwrite reserved type %0",
  DeclareClassElement: "The `declare` modifier can only appear on class fields.",
  DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.",
  DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement",
  EnumBooleanMemberNotInitialized: "Boolean enum members need to be initialized. Use either `%0 = true,` or `%0 = false,` in enum `%1`.",
  EnumDuplicateMemberName: "Enum member names need to be unique, but the name `%0` has already been used before in enum `%1`.",
  EnumInconsistentMemberValues: "Enum `%0` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.",
  EnumInvalidExplicitType: "Enum type `%1` is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `%0`.",
  EnumInvalidExplicitTypeUnknownSupplied: "Supplied enum type is not valid. Use one of `boolean`, `number`, `string`, or `symbol` in enum `%0`.",
  EnumInvalidMemberInitializerPrimaryType: "Enum `%0` has type `%2`, so the initializer of `%1` needs to be a %2 literal.",
  EnumInvalidMemberInitializerSymbolType: "Symbol enum members cannot be initialized. Use `%1,` in enum `%0`.",
  EnumInvalidMemberInitializerUnknownType: "The enum member initializer for `%1` needs to be a literal (either a boolean, number, or string) in enum `%0`.",
  EnumInvalidMemberName: "Enum member names cannot start with lowercase 'a' through 'z'. Instead of using `%0`, consider using `%1`, in enum `%2`.",
  EnumNumberMemberNotInitialized: "Number enum members need to be initialized, e.g. `%1 = 1` in enum `%0`.",
  EnumStringMemberInconsistentlyInitailized: "String enum members need to consistently either all use initializers, or use no initializers, in enum `%0`.",
  ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements",
  InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type",
  InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions",
  InexactVariance: "Explicit inexact syntax cannot have variance",
  InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`",
  MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
  NestedDeclareModule: "`declare module` cannot be used inside another `declare module`",
  NestedFlowComment: "Cannot have a flow comment inside another flow comment",
  OptionalBindingPattern: "A binding pattern parameter cannot be optional in an implementation signature.",
  SpreadVariance: "Spread properties cannot have variance",
  TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`",
  TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis",
  UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object",
  UnexpectedReservedType: "Unexpected reserved type %0",
  UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new",
  UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.",
  UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions",
  UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint"',
  UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration",
  UnsupportedDeclareExportKind: "`declare export %0` is not supported. Use `%1` instead",
  UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module",
  UnterminatedFlowComment: "Unterminated flow-comment"
});

function isEsModuleType(bodyElement) {
  return "DeclareExportAllDeclaration" === bodyElement.type || "DeclareExportDeclaration" === bodyElement.type && (!bodyElement.declaration || "TypeAlias" !== bodyElement.declaration.type && "InterfaceDeclaration" !== bodyElement.declaration.type);
}

function hasTypeImportKind(node) {
  return "type" === node.importKind || "typeof" === node.importKind;
}

function isMaybeDefaultImport(state) {
  return (state.type === types.name || !!state.type.keyword) && "from" !== state.value;
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
  constructor(options, input) {
    super(options, input), this.flowPragma = void 0;
  }
  shouldParseTypes() {
    return this.getPluginOption("flow", "all") || "flow" === this.flowPragma;
  }
  shouldParseEnums() {
    return !!this.getPluginOption("flow", "enums");
  }
  finishToken(type, val) {
    return type !== types.string && type !== types.semi && type !== types.interpreterDirective && void 0 === this.flowPragma && (this.flowPragma = null), 
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
    this.state.inType = !0, this.expect(tok || types.colon);
    const type = this.flowParseType();
    return this.state.inType = oldInType, type;
  }
  flowParsePredicate() {
    const node = this.startNode(), moduloLoc = this.state.startLoc, moduloPos = this.state.start;
    this.expect(types.modulo);
    const checksLoc = this.state.startLoc;
    return this.expectContextual("checks"), moduloLoc.line === checksLoc.line && moduloLoc.column === checksLoc.column - 1 || this.raise(moduloPos, FlowErrors.UnexpectedSpaceBetweenModuloChecks), 
    this.eat(types.parenL) ? (node.value = this.parseExpression(), this.expect(types.parenR), 
    this.finishNode(node, "DeclaredPredicate")) : this.finishNode(node, "InferredPredicate");
  }
  flowParseTypeAndPredicateInitialiser() {
    const oldInType = this.state.inType;
    this.state.inType = !0, this.expect(types.colon);
    let type = null, predicate = null;
    return this.match(types.modulo) ? (this.state.inType = oldInType, predicate = this.flowParsePredicate()) : (type = this.flowParseType(), 
    this.state.inType = oldInType, this.match(types.modulo) && (predicate = this.flowParsePredicate())), 
    [ type, predicate ];
  }
  flowParseDeclareClass(node) {
    return this.next(), this.flowParseInterfaceish(node, !0), this.finishNode(node, "DeclareClass");
  }
  flowParseDeclareFunction(node) {
    this.next();
    const id = node.id = this.parseIdentifier(), typeNode = this.startNode(), typeContainer = this.startNode();
    this.isRelational("<") ? typeNode.typeParameters = this.flowParseTypeParameterDeclaration() : typeNode.typeParameters = null, 
    this.expect(types.parenL);
    const tmp = this.flowParseFunctionTypeParams();
    return typeNode.params = tmp.params, typeNode.rest = tmp.rest, this.expect(types.parenR), 
    [typeNode.returnType, node.predicate] = this.flowParseTypeAndPredicateInitialiser(), 
    typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation"), 
    id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation"), this.resetEndLocation(id), 
    this.semicolon(), this.finishNode(node, "DeclareFunction");
  }
  flowParseDeclare(node, insideModule) {
    if (this.match(types._class)) return this.flowParseDeclareClass(node);
    if (this.match(types._function)) return this.flowParseDeclareFunction(node);
    if (this.match(types._var)) return this.flowParseDeclareVariable(node);
    if (this.eatContextual("module")) return this.match(types.dot) ? this.flowParseDeclareModuleExports(node) : (insideModule && this.raise(this.state.lastTokStart, FlowErrors.NestedDeclareModule), 
    this.flowParseDeclareModule(node));
    if (this.isContextual("type")) return this.flowParseDeclareTypeAlias(node);
    if (this.isContextual("opaque")) return this.flowParseDeclareOpaqueType(node);
    if (this.isContextual("interface")) return this.flowParseDeclareInterface(node);
    if (this.match(types._export)) return this.flowParseDeclareExportDeclaration(node, insideModule);
    throw this.unexpected();
  }
  flowParseDeclareVariable(node) {
    return this.next(), node.id = this.flowParseTypeAnnotatableIdentifier(!0), this.scope.declareName(node.id.name, 5, node.id.start), 
    this.semicolon(), this.finishNode(node, "DeclareVariable");
  }
  flowParseDeclareModule(node) {
    this.scope.enter(0), this.match(types.string) ? node.id = this.parseExprAtom() : node.id = this.parseIdentifier();
    const bodyNode = node.body = this.startNode(), body = bodyNode.body = [];
    for (this.expect(types.braceL); !this.match(types.braceR); ) {
      let bodyNode = this.startNode();
      this.match(types._import) ? (this.next(), this.isContextual("type") || this.match(types._typeof) || this.raise(this.state.lastTokStart, FlowErrors.InvalidNonTypeImportInDeclareModule), 
      this.parseImport(bodyNode)) : (this.expectContextual("declare", FlowErrors.UnsupportedStatementInDeclareModule), 
      bodyNode = this.flowParseDeclare(bodyNode, !0)), body.push(bodyNode);
    }
    this.scope.exit(), this.expect(types.braceR), this.finishNode(bodyNode, "BlockStatement");
    let kind = null, hasModuleExport = !1;
    return body.forEach(bodyElement => {
      isEsModuleType(bodyElement) ? ("CommonJS" === kind && this.raise(bodyElement.start, FlowErrors.AmbiguousDeclareModuleKind), 
      kind = "ES") : "DeclareModuleExports" === bodyElement.type && (hasModuleExport && this.raise(bodyElement.start, FlowErrors.DuplicateDeclareModuleExports), 
      "ES" === kind && this.raise(bodyElement.start, FlowErrors.AmbiguousDeclareModuleKind), 
      kind = "CommonJS", hasModuleExport = !0);
    }), node.kind = kind || "CommonJS", this.finishNode(node, "DeclareModule");
  }
  flowParseDeclareExportDeclaration(node, insideModule) {
    if (this.expect(types._export), this.eat(types._default)) return this.match(types._function) || this.match(types._class) ? node.declaration = this.flowParseDeclare(this.startNode()) : (node.declaration = this.flowParseType(), 
    this.semicolon()), node.default = !0, this.finishNode(node, "DeclareExportDeclaration");
    if (this.match(types._const) || this.isLet() || (this.isContextual("type") || this.isContextual("interface")) && !insideModule) {
      const label = this.state.value, suggestion = exportSuggestions[label];
      throw this.raise(this.state.start, FlowErrors.UnsupportedDeclareExportKind, label, suggestion);
    }
    if (this.match(types._var) || this.match(types._function) || this.match(types._class) || this.isContextual("opaque")) return node.declaration = this.flowParseDeclare(this.startNode()), 
    node.default = !1, this.finishNode(node, "DeclareExportDeclaration");
    if (this.match(types.star) || this.match(types.braceL) || this.isContextual("interface") || this.isContextual("type") || this.isContextual("opaque")) return "ExportNamedDeclaration" === (node = this.parseExport(node)).type && (node.type = "ExportDeclaration", 
    node.default = !1, delete node.exportKind), node.type = "Declare" + node.type, node;
    throw this.unexpected();
  }
  flowParseDeclareModuleExports(node) {
    return this.next(), this.expectContextual("exports"), node.typeAnnotation = this.flowParseTypeAnnotation(), 
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
    if (node.id = this.flowParseRestrictedIdentifier(!isClass, !0), this.scope.declareName(node.id.name, isClass ? 17 : 9, node.id.start), 
    this.isRelational("<") ? node.typeParameters = this.flowParseTypeParameterDeclaration() : node.typeParameters = null, 
    node.extends = [], node.implements = [], node.mixins = [], this.eat(types._extends)) do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (!isClass && this.eat(types.comma));
    if (this.isContextual("mixins")) {
      this.next();
      do {
        node.mixins.push(this.flowParseInterfaceExtends());
      } while (this.eat(types.comma));
    }
    if (this.isContextual("implements")) {
      this.next();
      do {
        node.implements.push(this.flowParseInterfaceExtends());
      } while (this.eat(types.comma));
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
    return node.id = this.flowParseQualifiedTypeIdentifier(), this.isRelational("<") ? node.typeParameters = this.flowParseTypeParameterInstantiation() : node.typeParameters = null, 
    this.finishNode(node, "InterfaceExtends");
  }
  flowParseInterface(node) {
    return this.flowParseInterfaceish(node), this.finishNode(node, "InterfaceDeclaration");
  }
  checkNotUnderscore(word) {
    "_" === word && this.raise(this.state.start, FlowErrors.UnexpectedReservedUnderscore);
  }
  checkReservedType(word, startLoc, declaration) {
    reservedTypes.has(word) && this.raise(startLoc, declaration ? FlowErrors.AssignReservedType : FlowErrors.UnexpectedReservedType, word);
  }
  flowParseRestrictedIdentifier(liberal, declaration) {
    return this.checkReservedType(this.state.value, this.state.start, declaration), 
    this.parseIdentifier(liberal);
  }
  flowParseTypeAlias(node) {
    return node.id = this.flowParseRestrictedIdentifier(!1, !0), this.scope.declareName(node.id.name, 9, node.id.start), 
    this.isRelational("<") ? node.typeParameters = this.flowParseTypeParameterDeclaration() : node.typeParameters = null, 
    node.right = this.flowParseTypeInitialiser(types.eq), this.semicolon(), this.finishNode(node, "TypeAlias");
  }
  flowParseOpaqueType(node, declare) {
    return this.expectContextual("type"), node.id = this.flowParseRestrictedIdentifier(!0, !0), 
    this.scope.declareName(node.id.name, 9, node.id.start), this.isRelational("<") ? node.typeParameters = this.flowParseTypeParameterDeclaration() : node.typeParameters = null, 
    node.supertype = null, this.match(types.colon) && (node.supertype = this.flowParseTypeInitialiser(types.colon)), 
    node.impltype = null, declare || (node.impltype = this.flowParseTypeInitialiser(types.eq)), 
    this.semicolon(), this.finishNode(node, "OpaqueType");
  }
  flowParseTypeParameter(requireDefault = !1) {
    const nodeStart = this.state.start, node = this.startNode(), variance = this.flowParseVariance(), ident = this.flowParseTypeAnnotatableIdentifier();
    return node.name = ident.name, node.variance = variance, node.bound = ident.typeAnnotation, 
    this.match(types.eq) ? (this.eat(types.eq), node.default = this.flowParseType()) : requireDefault && this.raise(nodeStart, FlowErrors.MissingTypeParamDefault), 
    this.finishNode(node, "TypeParameter");
  }
  flowParseTypeParameterDeclaration() {
    const oldInType = this.state.inType, node = this.startNode();
    node.params = [], this.state.inType = !0, this.isRelational("<") || this.match(types.jsxTagStart) ? this.next() : this.unexpected();
    let defaultRequired = !1;
    do {
      const typeParameter = this.flowParseTypeParameter(defaultRequired);
      node.params.push(typeParameter), typeParameter.default && (defaultRequired = !0), 
      this.isRelational(">") || this.expect(types.comma);
    } while (!this.isRelational(">"));
    return this.expectRelational(">"), this.state.inType = oldInType, this.finishNode(node, "TypeParameterDeclaration");
  }
  flowParseTypeParameterInstantiation() {
    const node = this.startNode(), oldInType = this.state.inType;
    node.params = [], this.state.inType = !0, this.expectRelational("<");
    const oldNoAnonFunctionType = this.state.noAnonFunctionType;
    for (this.state.noAnonFunctionType = !1; !this.isRelational(">"); ) node.params.push(this.flowParseType()), 
    this.isRelational(">") || this.expect(types.comma);
    return this.state.noAnonFunctionType = oldNoAnonFunctionType, this.expectRelational(">"), 
    this.state.inType = oldInType, this.finishNode(node, "TypeParameterInstantiation");
  }
  flowParseTypeParameterInstantiationCallOrNew() {
    const node = this.startNode(), oldInType = this.state.inType;
    for (node.params = [], this.state.inType = !0, this.expectRelational("<"); !this.isRelational(">"); ) node.params.push(this.flowParseTypeOrImplicitInstantiation()), 
    this.isRelational(">") || this.expect(types.comma);
    return this.expectRelational(">"), this.state.inType = oldInType, this.finishNode(node, "TypeParameterInstantiation");
  }
  flowParseInterfaceType() {
    const node = this.startNode();
    if (this.expectContextual("interface"), node.extends = [], this.eat(types._extends)) do {
      node.extends.push(this.flowParseInterfaceExtends());
    } while (this.eat(types.comma));
    return node.body = this.flowParseObjectType({
      allowStatic: !1,
      allowExact: !1,
      allowSpread: !1,
      allowProto: !1,
      allowInexact: !1
    }), this.finishNode(node, "InterfaceTypeAnnotation");
  }
  flowParseObjectPropertyKey() {
    return this.match(types.num) || this.match(types.string) ? this.parseExprAtom() : this.parseIdentifier(!0);
  }
  flowParseObjectTypeIndexer(node, isStatic, variance) {
    return node.static = isStatic, this.lookahead().type === types.colon ? (node.id = this.flowParseObjectPropertyKey(), 
    node.key = this.flowParseTypeInitialiser()) : (node.id = null, node.key = this.flowParseType()), 
    this.expect(types.bracketR), node.value = this.flowParseTypeInitialiser(), node.variance = variance, 
    this.finishNode(node, "ObjectTypeIndexer");
  }
  flowParseObjectTypeInternalSlot(node, isStatic) {
    return node.static = isStatic, node.id = this.flowParseObjectPropertyKey(), this.expect(types.bracketR), 
    this.expect(types.bracketR), this.isRelational("<") || this.match(types.parenL) ? (node.method = !0, 
    node.optional = !1, node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.start, node.loc.start))) : (node.method = !1, 
    this.eat(types.question) && (node.optional = !0), node.value = this.flowParseTypeInitialiser()), 
    this.finishNode(node, "ObjectTypeInternalSlot");
  }
  flowParseObjectTypeMethodish(node) {
    for (node.params = [], node.rest = null, node.typeParameters = null, this.isRelational("<") && (node.typeParameters = this.flowParseTypeParameterDeclaration()), 
    this.expect(types.parenL); !this.match(types.parenR) && !this.match(types.ellipsis); ) node.params.push(this.flowParseFunctionTypeParam()), 
    this.match(types.parenR) || this.expect(types.comma);
    return this.eat(types.ellipsis) && (node.rest = this.flowParseFunctionTypeParam()), 
    this.expect(types.parenR), node.returnType = this.flowParseTypeInitialiser(), this.finishNode(node, "FunctionTypeAnnotation");
  }
  flowParseObjectTypeCallProperty(node, isStatic) {
    const valueNode = this.startNode();
    return node.static = isStatic, node.value = this.flowParseObjectTypeMethodish(valueNode), 
    this.finishNode(node, "ObjectTypeCallProperty");
  }
  flowParseObjectType({allowStatic: allowStatic, allowExact: allowExact, allowSpread: allowSpread, allowProto: allowProto, allowInexact: allowInexact}) {
    const oldInType = this.state.inType;
    this.state.inType = !0;
    const nodeStart = this.startNode();
    let endDelim, exact;
    nodeStart.callProperties = [], nodeStart.properties = [], nodeStart.indexers = [], 
    nodeStart.internalSlots = [];
    let inexact = !1;
    for (allowExact && this.match(types.braceBarL) ? (this.expect(types.braceBarL), 
    endDelim = types.braceBarR, exact = !0) : (this.expect(types.braceL), endDelim = types.braceR, 
    exact = !1), nodeStart.exact = exact; !this.match(endDelim); ) {
      let isStatic = !1, protoStart = null, inexactStart = null;
      const node = this.startNode();
      if (allowProto && this.isContextual("proto")) {
        const lookahead = this.lookahead();
        lookahead.type !== types.colon && lookahead.type !== types.question && (this.next(), 
        protoStart = this.state.start, allowStatic = !1);
      }
      if (allowStatic && this.isContextual("static")) {
        const lookahead = this.lookahead();
        lookahead.type !== types.colon && lookahead.type !== types.question && (this.next(), 
        isStatic = !0);
      }
      const variance = this.flowParseVariance();
      if (this.eat(types.bracketL)) null != protoStart && this.unexpected(protoStart), 
      this.eat(types.bracketL) ? (variance && this.unexpected(variance.start), nodeStart.internalSlots.push(this.flowParseObjectTypeInternalSlot(node, isStatic))) : nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic, variance)); else if (this.match(types.parenL) || this.isRelational("<")) null != protoStart && this.unexpected(protoStart), 
      variance && this.unexpected(variance.start), nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, isStatic)); else {
        let kind = "init";
        if (this.isContextual("get") || this.isContextual("set")) {
          const lookahead = this.lookahead();
          lookahead.type !== types.name && lookahead.type !== types.string && lookahead.type !== types.num || (kind = this.state.value, 
          this.next());
        }
        const propOrInexact = this.flowParseObjectTypeProperty(node, isStatic, protoStart, variance, kind, allowSpread, null != allowInexact ? allowInexact : !exact);
        null === propOrInexact ? (inexact = !0, inexactStart = this.state.lastTokStart) : nodeStart.properties.push(propOrInexact);
      }
      this.flowObjectTypeSemicolon(), !inexactStart || this.match(types.braceR) || this.match(types.braceBarR) || this.raise(inexactStart, FlowErrors.UnexpectedExplicitInexactInObject);
    }
    this.expect(endDelim), allowSpread && (nodeStart.inexact = inexact);
    const out = this.finishNode(nodeStart, "ObjectTypeAnnotation");
    return this.state.inType = oldInType, out;
  }
  flowParseObjectTypeProperty(node, isStatic, protoStart, variance, kind, allowSpread, allowInexact) {
    if (this.eat(types.ellipsis)) {
      return this.match(types.comma) || this.match(types.semi) || this.match(types.braceR) || this.match(types.braceBarR) ? (allowSpread ? allowInexact || this.raise(this.state.lastTokStart, FlowErrors.InexactInsideExact) : this.raise(this.state.lastTokStart, FlowErrors.InexactInsideNonObject), 
      variance && this.raise(variance.start, FlowErrors.InexactVariance), null) : (allowSpread || this.raise(this.state.lastTokStart, FlowErrors.UnexpectedSpreadType), 
      null != protoStart && this.unexpected(protoStart), variance && this.raise(variance.start, FlowErrors.SpreadVariance), 
      node.argument = this.flowParseType(), this.finishNode(node, "ObjectTypeSpreadProperty"));
    }
    {
      node.key = this.flowParseObjectPropertyKey(), node.static = isStatic, node.proto = null != protoStart, 
      node.kind = kind;
      let optional = !1;
      return this.isRelational("<") || this.match(types.parenL) ? (node.method = !0, null != protoStart && this.unexpected(protoStart), 
      variance && this.unexpected(variance.start), node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(node.start, node.loc.start)), 
      "get" !== kind && "set" !== kind || this.flowCheckGetterSetterParams(node)) : ("init" !== kind && this.unexpected(), 
      node.method = !1, this.eat(types.question) && (optional = !0), node.value = this.flowParseTypeInitialiser(), 
      node.variance = variance), node.optional = optional, this.finishNode(node, "ObjectTypeProperty");
    }
  }
  flowCheckGetterSetterParams(property) {
    const paramCount = "get" === property.kind ? 0 : 1, start = property.start;
    property.value.params.length + (property.value.rest ? 1 : 0) !== paramCount && ("get" === property.kind ? this.raise(start, ErrorMessages.BadGetterArity) : this.raise(start, ErrorMessages.BadSetterArity)), 
    "set" === property.kind && property.value.rest && this.raise(start, ErrorMessages.BadSetterRestParameter);
  }
  flowObjectTypeSemicolon() {
    this.eat(types.semi) || this.eat(types.comma) || this.match(types.braceR) || this.match(types.braceBarR) || this.unexpected();
  }
  flowParseQualifiedTypeIdentifier(startPos, startLoc, id) {
    startPos = startPos || this.state.start, startLoc = startLoc || this.state.startLoc;
    let node = id || this.flowParseRestrictedIdentifier(!0);
    for (;this.eat(types.dot); ) {
      const node2 = this.startNodeAt(startPos, startLoc);
      node2.qualification = node, node2.id = this.flowParseRestrictedIdentifier(!0), node = this.finishNode(node2, "QualifiedTypeIdentifier");
    }
    return node;
  }
  flowParseGenericType(startPos, startLoc, id) {
    const node = this.startNodeAt(startPos, startLoc);
    return node.typeParameters = null, node.id = this.flowParseQualifiedTypeIdentifier(startPos, startLoc, id), 
    this.isRelational("<") && (node.typeParameters = this.flowParseTypeParameterInstantiation()), 
    this.finishNode(node, "GenericTypeAnnotation");
  }
  flowParseTypeofType() {
    const node = this.startNode();
    return this.expect(types._typeof), node.argument = this.flowParsePrimaryType(), 
    this.finishNode(node, "TypeofTypeAnnotation");
  }
  flowParseTupleType() {
    const node = this.startNode();
    for (node.types = [], this.expect(types.bracketL); this.state.pos < this.length && !this.match(types.bracketR) && (node.types.push(this.flowParseType()), 
    !this.match(types.bracketR)); ) this.expect(types.comma);
    return this.expect(types.bracketR), this.finishNode(node, "TupleTypeAnnotation");
  }
  flowParseFunctionTypeParam() {
    let name = null, optional = !1, typeAnnotation = null;
    const node = this.startNode(), lh = this.lookahead();
    return lh.type === types.colon || lh.type === types.question ? (name = this.parseIdentifier(), 
    this.eat(types.question) && (optional = !0), typeAnnotation = this.flowParseTypeInitialiser()) : typeAnnotation = this.flowParseType(), 
    node.name = name, node.optional = optional, node.typeAnnotation = typeAnnotation, 
    this.finishNode(node, "FunctionTypeParam");
  }
  reinterpretTypeAsFunctionTypeParam(type) {
    const node = this.startNodeAt(type.start, type.loc.start);
    return node.name = null, node.optional = !1, node.typeAnnotation = type, this.finishNode(node, "FunctionTypeParam");
  }
  flowParseFunctionTypeParams(params = []) {
    let rest = null;
    for (;!this.match(types.parenR) && !this.match(types.ellipsis); ) params.push(this.flowParseFunctionTypeParam()), 
    this.match(types.parenR) || this.expect(types.comma);
    return this.eat(types.ellipsis) && (rest = this.flowParseFunctionTypeParam()), {
      params: params,
      rest: rest
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
     case types.name:
      return this.isContextual("interface") ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdentifier());

     case types.braceL:
      return this.flowParseObjectType({
        allowStatic: !1,
        allowExact: !1,
        allowSpread: !0,
        allowProto: !1,
        allowInexact: !0
      });

     case types.braceBarL:
      return this.flowParseObjectType({
        allowStatic: !1,
        allowExact: !0,
        allowSpread: !0,
        allowProto: !1,
        allowInexact: !1
      });

     case types.bracketL:
      return this.state.noAnonFunctionType = !1, type = this.flowParseTupleType(), this.state.noAnonFunctionType = oldNoAnonFunctionType, 
      type;

     case types.relational:
      if ("<" === this.state.value) return node.typeParameters = this.flowParseTypeParameterDeclaration(), 
      this.expect(types.parenL), tmp = this.flowParseFunctionTypeParams(), node.params = tmp.params, 
      node.rest = tmp.rest, this.expect(types.parenR), this.expect(types.arrow), node.returnType = this.flowParseType(), 
      this.finishNode(node, "FunctionTypeAnnotation");
      break;

     case types.parenL:
      if (this.next(), !this.match(types.parenR) && !this.match(types.ellipsis)) if (this.match(types.name)) {
        const token = this.lookahead().type;
        isGroupedType = token !== types.question && token !== types.colon;
      } else isGroupedType = !0;
      if (isGroupedType) {
        if (this.state.noAnonFunctionType = !1, type = this.flowParseType(), this.state.noAnonFunctionType = oldNoAnonFunctionType, 
        this.state.noAnonFunctionType || !(this.match(types.comma) || this.match(types.parenR) && this.lookahead().type === types.arrow)) return this.expect(types.parenR), 
        type;
        this.eat(types.comma);
      }
      return tmp = type ? this.flowParseFunctionTypeParams([ this.reinterpretTypeAsFunctionTypeParam(type) ]) : this.flowParseFunctionTypeParams(), 
      node.params = tmp.params, node.rest = tmp.rest, this.expect(types.parenR), this.expect(types.arrow), 
      node.returnType = this.flowParseType(), node.typeParameters = null, this.finishNode(node, "FunctionTypeAnnotation");

     case types.string:
      return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");

     case types._true:
     case types._false:
      return node.value = this.match(types._true), this.next(), this.finishNode(node, "BooleanLiteralTypeAnnotation");

     case types.plusMin:
      if ("-" === this.state.value) {
        if (this.next(), this.match(types.num)) return this.parseLiteral(-this.state.value, "NumberLiteralTypeAnnotation", node.start, node.loc.start);
        if (this.match(types.bigint)) return this.parseLiteral(-this.state.value, "BigIntLiteralTypeAnnotation", node.start, node.loc.start);
        throw this.raise(this.state.start, FlowErrors.UnexpectedSubtractionOperand);
      }
      throw this.unexpected();

     case types.num:
      return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");

     case types.bigint:
      return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");

     case types._void:
      return this.next(), this.finishNode(node, "VoidTypeAnnotation");

     case types._null:
      return this.next(), this.finishNode(node, "NullLiteralTypeAnnotation");

     case types._this:
      return this.next(), this.finishNode(node, "ThisTypeAnnotation");

     case types.star:
      return this.next(), this.finishNode(node, "ExistsTypeAnnotation");

     default:
      if ("typeof" === this.state.type.keyword) return this.flowParseTypeofType();
      if (this.state.type.keyword) {
        const label = this.state.type.label;
        return this.next(), super.createIdentifier(node, label);
      }
    }
    throw this.unexpected();
  }
  flowParsePostfixType() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let type = this.flowParsePrimaryType();
    for (;this.match(types.bracketL) && !this.canInsertSemicolon(); ) {
      const node = this.startNodeAt(startPos, startLoc);
      node.elementType = type, this.expect(types.bracketL), this.expect(types.bracketR), 
      type = this.finishNode(node, "ArrayTypeAnnotation");
    }
    return type;
  }
  flowParsePrefixType() {
    const node = this.startNode();
    return this.eat(types.question) ? (node.typeAnnotation = this.flowParsePrefixType(), 
    this.finishNode(node, "NullableTypeAnnotation")) : this.flowParsePostfixType();
  }
  flowParseAnonFunctionWithoutParens() {
    const param = this.flowParsePrefixType();
    if (!this.state.noAnonFunctionType && this.eat(types.arrow)) {
      const node = this.startNodeAt(param.start, param.loc.start);
      return node.params = [ this.reinterpretTypeAsFunctionTypeParam(param) ], node.rest = null, 
      node.returnType = this.flowParseType(), node.typeParameters = null, this.finishNode(node, "FunctionTypeAnnotation");
    }
    return param;
  }
  flowParseIntersectionType() {
    const node = this.startNode();
    this.eat(types.bitwiseAND);
    const type = this.flowParseAnonFunctionWithoutParens();
    for (node.types = [ type ]; this.eat(types.bitwiseAND); ) node.types.push(this.flowParseAnonFunctionWithoutParens());
    return 1 === node.types.length ? type : this.finishNode(node, "IntersectionTypeAnnotation");
  }
  flowParseUnionType() {
    const node = this.startNode();
    this.eat(types.bitwiseOR);
    const type = this.flowParseIntersectionType();
    for (node.types = [ type ]; this.eat(types.bitwiseOR); ) node.types.push(this.flowParseIntersectionType());
    return 1 === node.types.length ? type : this.finishNode(node, "UnionTypeAnnotation");
  }
  flowParseType() {
    const oldInType = this.state.inType;
    this.state.inType = !0;
    const type = this.flowParseUnionType();
    return this.state.inType = oldInType, this.state.exprAllowed = this.state.exprAllowed || this.state.noAnonFunctionType, 
    type;
  }
  flowParseTypeOrImplicitInstantiation() {
    if (this.state.type === types.name && "_" === this.state.value) {
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
    return this.match(types.colon) && (ident.typeAnnotation = this.flowParseTypeAnnotation(), 
    this.resetEndLocation(ident)), ident;
  }
  typeCastToParameter(node) {
    return node.expression.typeAnnotation = node.typeAnnotation, this.resetEndLocation(node.expression, node.typeAnnotation.end, node.typeAnnotation.loc.end), 
    node.expression;
  }
  flowParseVariance() {
    let variance = null;
    return this.match(types.plusMin) && (variance = this.startNode(), "+" === this.state.value ? variance.kind = "plus" : variance.kind = "minus", 
    this.next(), this.finishNode(variance, "Variance")), variance;
  }
  parseFunctionBody(node, allowExpressionBody, isMethod = !1) {
    return allowExpressionBody ? this.forwardNoArrowParamsConversionAt(node, () => super.parseFunctionBody(node, !0, isMethod)) : super.parseFunctionBody(node, !1, isMethod);
  }
  parseFunctionBodyAndFinish(node, type, isMethod = !1) {
    if (this.match(types.colon)) {
      const typeNode = this.startNode();
      [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser(), 
      node.returnType = typeNode.typeAnnotation ? this.finishNode(typeNode, "TypeAnnotation") : null;
    }
    super.parseFunctionBodyAndFinish(node, type, isMethod);
  }
  parseStatement(context, topLevel) {
    if (this.state.strict && this.match(types.name) && "interface" === this.state.value) {
      const node = this.startNode();
      return this.next(), this.flowParseInterface(node);
    }
    if (this.shouldParseEnums() && this.isContextual("enum")) {
      const node = this.startNode();
      return this.next(), this.flowParseEnumDeclaration(node);
    }
    {
      const stmt = super.parseStatement(context, topLevel);
      return void 0 !== this.flowPragma || this.isValidDirective(stmt) || (this.flowPragma = null), 
      stmt;
    }
  }
  parseExpressionStatement(node, expr) {
    if ("Identifier" === expr.type) if ("declare" === expr.name) {
      if (this.match(types._class) || this.match(types.name) || this.match(types._function) || this.match(types._var) || this.match(types._export)) return this.flowParseDeclare(node);
    } else if (this.match(types.name)) {
      if ("interface" === expr.name) return this.flowParseInterface(node);
      if ("type" === expr.name) return this.flowParseTypeAlias(node);
      if ("opaque" === expr.name) return this.flowParseOpaqueType(node, !1);
    }
    return super.parseExpressionStatement(node, expr);
  }
  shouldParseExportDeclaration() {
    return this.isContextual("type") || this.isContextual("interface") || this.isContextual("opaque") || this.shouldParseEnums() && this.isContextual("enum") || super.shouldParseExportDeclaration();
  }
  isExportDefaultSpecifier() {
    return (!this.match(types.name) || !("type" === this.state.value || "interface" === this.state.value || "opaque" === this.state.value || this.shouldParseEnums() && "enum" === this.state.value)) && super.isExportDefaultSpecifier();
  }
  parseExportDefaultExpression() {
    if (this.shouldParseEnums() && this.isContextual("enum")) {
      const node = this.startNode();
      return this.next(), this.flowParseEnumDeclaration(node);
    }
    return super.parseExportDefaultExpression();
  }
  parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos) {
    if (!this.match(types.question)) return expr;
    if (refNeedsArrowPos) {
      const result = this.tryParse(() => super.parseConditional(expr, noIn, startPos, startLoc));
      return result.node ? (result.error && (this.state = result.failState), result.node) : (refNeedsArrowPos.start = result.error.pos || this.state.start, 
      expr);
    }
    this.expect(types.question);
    const state = this.state.clone(), originalNoArrowAt = this.state.noArrowAt, node = this.startNodeAt(startPos, startLoc);
    let {consequent: consequent, failed: failed} = this.tryParseConditionalConsequent(), [valid, invalid] = this.getArrowLikeExpressions(consequent);
    if (failed || invalid.length > 0) {
      const noArrowAt = [ ...originalNoArrowAt ];
      if (invalid.length > 0) {
        this.state = state, this.state.noArrowAt = noArrowAt;
        for (let i = 0; i < invalid.length; i++) noArrowAt.push(invalid[i].start);
        ({consequent: consequent, failed: failed} = this.tryParseConditionalConsequent()), 
        [valid, invalid] = this.getArrowLikeExpressions(consequent);
      }
      failed && valid.length > 1 && this.raise(state.start, FlowErrors.AmbiguousConditionalArrow), 
      failed && 1 === valid.length && (this.state = state, this.state.noArrowAt = noArrowAt.concat(valid[0].start), 
      ({consequent: consequent, failed: failed} = this.tryParseConditionalConsequent()));
    }
    return this.getArrowLikeExpressions(consequent, !0), this.state.noArrowAt = originalNoArrowAt, 
    this.expect(types.colon), node.test = expr, node.consequent = consequent, node.alternate = this.forwardNoArrowParamsConversionAt(node, () => this.parseMaybeAssign(noIn, void 0, void 0, void 0)), 
    this.finishNode(node, "ConditionalExpression");
  }
  tryParseConditionalConsequent() {
    this.state.noArrowParamsConversionAt.push(this.state.start);
    const consequent = this.parseMaybeAssign(), failed = !this.match(types.colon);
    return this.state.noArrowParamsConversionAt.pop(), {
      consequent: consequent,
      failed: failed
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
    return disallowInvalid ? (arrows.forEach(node => this.finishArrowValidation(node)), 
    [ arrows, [] ]) : partition(arrows, node => node.params.every(param => this.isAssignable(param, !0)));
  }
  finishArrowValidation(node) {
    var _node$extra;
    this.toAssignableList(node.params, null == (_node$extra = node.extra) ? void 0 : _node$extra.trailingComma), 
    this.scope.enter(6), super.checkParams(node, !1, !0), this.scope.exit();
  }
  forwardNoArrowParamsConversionAt(node, parse) {
    let result;
    return -1 !== this.state.noArrowParamsConversionAt.indexOf(node.start) ? (this.state.noArrowParamsConversionAt.push(this.state.start), 
    result = parse(), this.state.noArrowParamsConversionAt.pop()) : result = parse(), 
    result;
  }
  parseParenItem(node, startPos, startLoc) {
    if (node = super.parseParenItem(node, startPos, startLoc), this.eat(types.question) && (node.optional = !0, 
    this.resetEndLocation(node)), this.match(types.colon)) {
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
    if (this.isContextual("type")) {
      node.exportKind = "type";
      const declarationNode = this.startNode();
      return this.next(), this.match(types.braceL) ? (node.specifiers = this.parseExportSpecifiers(), 
      this.parseExportFrom(node), null) : this.flowParseTypeAlias(declarationNode);
    }
    if (this.isContextual("opaque")) {
      node.exportKind = "type";
      const declarationNode = this.startNode();
      return this.next(), this.flowParseOpaqueType(declarationNode, !1);
    }
    if (this.isContextual("interface")) {
      node.exportKind = "type";
      const declarationNode = this.startNode();
      return this.next(), this.flowParseInterface(declarationNode);
    }
    if (this.shouldParseEnums() && this.isContextual("enum")) {
      node.exportKind = "value";
      const declarationNode = this.startNode();
      return this.next(), this.flowParseEnumDeclaration(declarationNode);
    }
    return super.parseExportDeclaration(node);
  }
  eatExportStar(node) {
    return !!super.eatExportStar(...arguments) || !(!this.isContextual("type") || this.lookahead().type !== types.star) && (node.exportKind = "type", 
    this.next(), this.next(), !0);
  }
  maybeParseExportNamespaceSpecifier(node) {
    const pos = this.state.start, hasNamespace = super.maybeParseExportNamespaceSpecifier(node);
    return hasNamespace && "type" === node.exportKind && this.unexpected(pos), hasNamespace;
  }
  parseClassId(node, isStatement, optionalId) {
    super.parseClassId(node, isStatement, optionalId), this.isRelational("<") && (node.typeParameters = this.flowParseTypeParameterDeclaration());
  }
  parseClassMember(classBody, member, state, constructorAllowsSuper) {
    const pos = this.state.start;
    if (this.isContextual("declare")) {
      if (this.parseClassMemberFromModifier(classBody, member)) return;
      member.declare = !0;
    }
    super.parseClassMember(classBody, member, state, constructorAllowsSuper), member.declare && ("ClassProperty" !== member.type && "ClassPrivateProperty" !== member.type ? this.raise(pos, FlowErrors.DeclareClassElement) : member.value && this.raise(member.value.start, FlowErrors.DeclareClassFieldInitializer));
  }
  getTokenFromCode(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    return 123 === code && 124 === next ? this.finishOp(types.braceBarL, 2) : !this.state.inType || 62 !== code && 60 !== code ? isIteratorStart(code, next) ? (this.state.isIterator = !0, 
    super.readWord()) : super.getTokenFromCode(code) : this.finishOp(types.relational, 1);
  }
  isAssignable(node, isBinding) {
    switch (node.type) {
     case "Identifier":
     case "ObjectPattern":
     case "ArrayPattern":
     case "AssignmentPattern":
      return !0;

     case "ObjectExpression":
      {
        const last = node.properties.length - 1;
        return node.properties.every((prop, i) => "ObjectMethod" !== prop.type && (i === last || "SpreadElement" === prop.type) && this.isAssignable(prop));
      }

     case "ObjectProperty":
      return this.isAssignable(node.value);

     case "SpreadElement":
      return this.isAssignable(node.argument);

     case "ArrayExpression":
      return node.elements.every(element => this.isAssignable(element));

     case "AssignmentExpression":
      return "=" === node.operator;

     case "ParenthesizedExpression":
     case "TypeCastExpression":
      return this.isAssignable(node.expression);

     case "MemberExpression":
     case "OptionalMemberExpression":
      return !isBinding;

     default:
      return !1;
    }
  }
  toAssignable(node) {
    return "TypeCastExpression" === node.type ? super.toAssignable(this.typeCastToParameter(node)) : super.toAssignable(node);
  }
  toAssignableList(exprList, trailingCommaPos) {
    for (let i = 0; i < exprList.length; i++) {
      const expr = exprList[i];
      "TypeCastExpression" === (null == expr ? void 0 : expr.type) && (exprList[i] = this.typeCastToParameter(expr));
    }
    return super.toAssignableList(exprList, trailingCommaPos);
  }
  toReferencedList(exprList, isParenthesizedExpr) {
    for (let i = 0; i < exprList.length; i++) {
      var _expr$extra;
      const expr = exprList[i];
      expr && "TypeCastExpression" === expr.type && !(null == (_expr$extra = expr.extra) ? void 0 : _expr$extra.parenthesized) && (exprList.length > 1 || !isParenthesizedExpr) && this.raise(expr.typeAnnotation.start, FlowErrors.TypeCastInPattern);
    }
    return exprList;
  }
  checkLVal(expr, bindingType = 64, checkClashes, contextDescription) {
    if ("TypeCastExpression" !== expr.type) return super.checkLVal(expr, bindingType, checkClashes, contextDescription);
  }
  parseClassProperty(node) {
    return this.match(types.colon) && (node.typeAnnotation = this.flowParseTypeAnnotation()), 
    super.parseClassProperty(node);
  }
  parseClassPrivateProperty(node) {
    return this.match(types.colon) && (node.typeAnnotation = this.flowParseTypeAnnotation()), 
    super.parseClassPrivateProperty(node);
  }
  isClassMethod() {
    return this.isRelational("<") || super.isClassMethod();
  }
  isClassProperty() {
    return this.match(types.colon) || super.isClassProperty();
  }
  isNonstaticConstructor(method) {
    return !this.match(types.colon) && super.isNonstaticConstructor(method);
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    method.variance && this.unexpected(method.variance.start), delete method.variance, 
    this.isRelational("<") && (method.typeParameters = this.flowParseTypeParameterDeclaration()), 
    super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
  }
  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
    method.variance && this.unexpected(method.variance.start), delete method.variance, 
    this.isRelational("<") && (method.typeParameters = this.flowParseTypeParameterDeclaration()), 
    super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
  }
  parseClassSuper(node) {
    if (super.parseClassSuper(node), node.superClass && this.isRelational("<") && (node.superTypeParameters = this.flowParseTypeParameterInstantiation()), 
    this.isContextual("implements")) {
      this.next();
      const implemented = node.implements = [];
      do {
        const node = this.startNode();
        node.id = this.flowParseRestrictedIdentifier(!0), this.isRelational("<") ? node.typeParameters = this.flowParseTypeParameterInstantiation() : node.typeParameters = null, 
        implemented.push(this.finishNode(node, "ClassImplements"));
      } while (this.eat(types.comma));
    }
  }
  parsePropertyName(node, isPrivateNameAllowed) {
    const variance = this.flowParseVariance(), key = super.parsePropertyName(node, isPrivateNameAllowed);
    return node.variance = variance, key;
  }
  parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refExpressionErrors, containsEsc) {
    let typeParameters;
    prop.variance && this.unexpected(prop.variance.start), delete prop.variance, this.isRelational("<") && (typeParameters = this.flowParseTypeParameterDeclaration(), 
    this.match(types.parenL) || this.unexpected()), super.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refExpressionErrors, containsEsc), 
    typeParameters && ((prop.value || prop).typeParameters = typeParameters);
  }
  parseAssignableListItemTypes(param) {
    return this.eat(types.question) && ("Identifier" !== param.type && this.raise(param.start, FlowErrors.OptionalBindingPattern), 
    param.optional = !0), this.match(types.colon) && (param.typeAnnotation = this.flowParseTypeAnnotation()), 
    this.resetEndLocation(param), param;
  }
  parseMaybeDefault(startPos, startLoc, left) {
    const node = super.parseMaybeDefault(startPos, startLoc, left);
    return "AssignmentPattern" === node.type && node.typeAnnotation && node.right.start < node.typeAnnotation.start && this.raise(node.typeAnnotation.start, FlowErrors.TypeBeforeInitializer), 
    node;
  }
  shouldParseDefaultImport(node) {
    return hasTypeImportKind(node) ? isMaybeDefaultImport(this.state) : super.shouldParseDefaultImport(node);
  }
  parseImportSpecifierLocal(node, specifier, type, contextDescription) {
    specifier.local = hasTypeImportKind(node) ? this.flowParseRestrictedIdentifier(!0, !0) : this.parseIdentifier(), 
    this.checkLVal(specifier.local, 9, void 0, contextDescription), node.specifiers.push(this.finishNode(specifier, type));
  }
  maybeParseDefaultImportSpecifier(node) {
    node.importKind = "value";
    let kind = null;
    if (this.match(types._typeof) ? kind = "typeof" : this.isContextual("type") && (kind = "type"), 
    kind) {
      const lh = this.lookahead();
      "type" === kind && lh.type === types.star && this.unexpected(lh.start), (isMaybeDefaultImport(lh) || lh.type === types.braceL || lh.type === types.star) && (this.next(), 
      node.importKind = kind);
    }
    return super.maybeParseDefaultImportSpecifier(node);
  }
  parseImportSpecifier(node) {
    const specifier = this.startNode(), firstIdentLoc = this.state.start, firstIdent = this.parseIdentifier(!0);
    let specifierTypeKind = null;
    "type" === firstIdent.name ? specifierTypeKind = "type" : "typeof" === firstIdent.name && (specifierTypeKind = "typeof");
    let isBinding = !1;
    if (this.isContextual("as") && !this.isLookaheadContextual("as")) {
      const as_ident = this.parseIdentifier(!0);
      null === specifierTypeKind || this.match(types.name) || this.state.type.keyword ? (specifier.imported = firstIdent, 
      specifier.importKind = null, specifier.local = this.parseIdentifier()) : (specifier.imported = as_ident, 
      specifier.importKind = specifierTypeKind, specifier.local = as_ident.__clone());
    } else null !== specifierTypeKind && (this.match(types.name) || this.state.type.keyword) ? (specifier.imported = this.parseIdentifier(!0), 
    specifier.importKind = specifierTypeKind, this.eatContextual("as") ? specifier.local = this.parseIdentifier() : (isBinding = !0, 
    specifier.local = specifier.imported.__clone())) : (isBinding = !0, specifier.imported = firstIdent, 
    specifier.importKind = null, specifier.local = specifier.imported.__clone());
    const nodeIsTypeImport = hasTypeImportKind(node), specifierIsTypeImport = hasTypeImportKind(specifier);
    nodeIsTypeImport && specifierIsTypeImport && this.raise(firstIdentLoc, FlowErrors.ImportTypeShorthandOnlyInPureImport), 
    (nodeIsTypeImport || specifierIsTypeImport) && this.checkReservedType(specifier.local.name, specifier.local.start, !0), 
    !isBinding || nodeIsTypeImport || specifierIsTypeImport || this.checkReservedWord(specifier.local.name, specifier.start, !0, !0), 
    this.checkLVal(specifier.local, 9, void 0, "import specifier"), node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
  }
  parseFunctionParams(node, allowModifiers) {
    const kind = node.kind;
    "get" !== kind && "set" !== kind && this.isRelational("<") && (node.typeParameters = this.flowParseTypeParameterDeclaration()), 
    super.parseFunctionParams(node, allowModifiers);
  }
  parseVarId(decl, kind) {
    super.parseVarId(decl, kind), this.match(types.colon) && (decl.id.typeAnnotation = this.flowParseTypeAnnotation(), 
    this.resetEndLocation(decl.id));
  }
  parseAsyncArrowFromCallExpression(node, call) {
    if (this.match(types.colon)) {
      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
      this.state.noAnonFunctionType = !0, node.returnType = this.flowParseTypeAnnotation(), 
      this.state.noAnonFunctionType = oldNoAnonFunctionType;
    }
    return super.parseAsyncArrowFromCallExpression(node, call);
  }
  shouldParseAsyncArrow() {
    return this.match(types.colon) || super.shouldParseAsyncArrow();
  }
  parseMaybeAssign(noIn, refExpressionErrors, afterLeftParse, refNeedsArrowPos) {
    var _jsx;
    let jsx, state = null;
    if (this.hasPlugin("jsx") && (this.match(types.jsxTagStart) || this.isRelational("<"))) {
      if (state = this.state.clone(), jsx = this.tryParse(() => super.parseMaybeAssign(noIn, refExpressionErrors, afterLeftParse, refNeedsArrowPos), state), 
      !jsx.error) return jsx.node;
      const {context: context} = this.state;
      context[context.length - 1] === types$1.j_oTag ? context.length -= 2 : context[context.length - 1] === types$1.j_expr && (context.length -= 1);
    }
    if ((null == (_jsx = jsx) ? void 0 : _jsx.error) || this.isRelational("<")) {
      var _arrow$node, _jsx2, _jsx3;
      let typeParameters;
      state = state || this.state.clone();
      const arrow = this.tryParse(() => {
        typeParameters = this.flowParseTypeParameterDeclaration();
        const arrowExpression = this.forwardNoArrowParamsConversionAt(typeParameters, () => super.parseMaybeAssign(noIn, refExpressionErrors, afterLeftParse, refNeedsArrowPos));
        return arrowExpression.typeParameters = typeParameters, this.resetStartLocationFromNode(arrowExpression, typeParameters), 
        arrowExpression;
      }, state), arrowExpression = "ArrowFunctionExpression" === (null == (_arrow$node = arrow.node) ? void 0 : _arrow$node.type) ? arrow.node : null;
      if (!arrow.error && arrowExpression) return arrowExpression;
      if (null == (_jsx2 = jsx) ? void 0 : _jsx2.node) return this.state = jsx.failState, 
      jsx.node;
      if (arrowExpression) return this.state = arrow.failState, arrowExpression;
      if (null == (_jsx3 = jsx) ? void 0 : _jsx3.thrown) throw jsx.error;
      if (arrow.thrown) throw arrow.error;
      throw this.raise(typeParameters.start, FlowErrors.UnexpectedTokenAfterTypeParameter);
    }
    return super.parseMaybeAssign(noIn, refExpressionErrors, afterLeftParse, refNeedsArrowPos);
  }
  parseArrow(node) {
    if (this.match(types.colon)) {
      const result = this.tryParse(() => {
        const oldNoAnonFunctionType = this.state.noAnonFunctionType;
        this.state.noAnonFunctionType = !0;
        const typeNode = this.startNode();
        return [typeNode.typeAnnotation, node.predicate] = this.flowParseTypeAndPredicateInitialiser(), 
        this.state.noAnonFunctionType = oldNoAnonFunctionType, this.canInsertSemicolon() && this.unexpected(), 
        this.match(types.arrow) || this.unexpected(), typeNode;
      });
      if (result.thrown) return null;
      result.error && (this.state = result.failState), node.returnType = result.node.typeAnnotation ? this.finishNode(result.node, "TypeAnnotation") : null;
    }
    return super.parseArrow(node);
  }
  shouldParseArrow() {
    return this.match(types.colon) || super.shouldParseArrow();
  }
  setArrowFunctionParameters(node, params) {
    -1 !== this.state.noArrowParamsConversionAt.indexOf(node.start) ? node.params = params : super.setArrowFunctionParameters(node, params);
  }
  checkParams(node, allowDuplicates, isArrowFunction) {
    if (!isArrowFunction || -1 === this.state.noArrowParamsConversionAt.indexOf(node.start)) return super.checkParams(...arguments);
  }
  parseParenAndDistinguishExpression(canBeArrow) {
    return super.parseParenAndDistinguishExpression(canBeArrow && -1 === this.state.noArrowAt.indexOf(this.state.start));
  }
  parseSubscripts(base, startPos, startLoc, noCalls) {
    if ("Identifier" === base.type && "async" === base.name && -1 !== this.state.noArrowAt.indexOf(startPos)) {
      this.next();
      const node = this.startNodeAt(startPos, startLoc);
      node.callee = base, node.arguments = this.parseCallExpressionArguments(types.parenR, !1), 
      base = this.finishNode(node, "CallExpression");
    } else if ("Identifier" === base.type && "async" === base.name && this.isRelational("<")) {
      const state = this.state.clone(), arrow = this.tryParse(abort => this.parseAsyncArrowWithTypeParameters(startPos, startLoc) || abort(), state);
      if (!arrow.error && !arrow.aborted) return arrow.node;
      const result = this.tryParse(() => super.parseSubscripts(base, startPos, startLoc, noCalls), state);
      if (result.node && !result.error) return result.node;
      if (arrow.node) return this.state = arrow.failState, arrow.node;
      if (result.node) return this.state = result.failState, result.node;
      throw arrow.error || result.error;
    }
    return super.parseSubscripts(base, startPos, startLoc, noCalls);
  }
  parseSubscript(base, startPos, startLoc, noCalls, subscriptState) {
    if (this.match(types.questionDot) && this.isLookaheadRelational("<")) {
      if (subscriptState.optionalChainMember = !0, noCalls) return subscriptState.stop = !0, 
      base;
      this.next();
      const node = this.startNodeAt(startPos, startLoc);
      return node.callee = base, node.typeArguments = this.flowParseTypeParameterInstantiation(), 
      this.expect(types.parenL), node.arguments = this.parseCallExpressionArguments(types.parenR, !1), 
      node.optional = !0, this.finishCallExpression(node, !0);
    }
    if (!noCalls && this.shouldParseTypes() && this.isRelational("<")) {
      const node = this.startNodeAt(startPos, startLoc);
      node.callee = base;
      const result = this.tryParse(() => (node.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew(), 
      this.expect(types.parenL), node.arguments = this.parseCallExpressionArguments(types.parenR, !1), 
      subscriptState.optionalChainMember && (node.optional = !1), this.finishCallExpression(node, subscriptState.optionalChainMember)));
      if (result.node) return result.error && (this.state = result.failState), result.node;
    }
    return super.parseSubscript(base, startPos, startLoc, noCalls, subscriptState);
  }
  parseNewArguments(node) {
    let targs = null;
    this.shouldParseTypes() && this.isRelational("<") && (targs = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node), 
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
    124 !== code || 125 !== next ? super.readToken_pipe_amp(code) : this.finishOp(types.braceBarR, 2);
  }
  parseTopLevel(file, program) {
    const fileNode = super.parseTopLevel(file, program);
    return this.state.hasFlowComment && this.raise(this.state.pos, FlowErrors.UnterminatedFlowComment), 
    fileNode;
  }
  skipBlockComment() {
    if (this.hasPlugin("flowComments") && this.skipFlowComment()) return this.state.hasFlowComment && this.unexpected(null, FlowErrors.NestedFlowComment), 
    this.hasFlowCommentCompletion(), this.state.pos += this.skipFlowComment(), void (this.state.hasFlowComment = !0);
    if (this.state.hasFlowComment) {
      const end = this.input.indexOf("*-/", this.state.pos += 2);
      if (-1 === end) throw this.raise(this.state.pos - 2, ErrorMessages.UnterminatedComment);
      this.state.pos = end + 3;
    } else super.skipBlockComment();
  }
  skipFlowComment() {
    const {pos: pos} = this.state;
    let shiftToFirstNonWhiteSpace = 2;
    for (;[ 32, 9 ].includes(this.input.charCodeAt(pos + shiftToFirstNonWhiteSpace)); ) shiftToFirstNonWhiteSpace++;
    const ch2 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos), ch3 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);
    return 58 === ch2 && 58 === ch3 ? shiftToFirstNonWhiteSpace + 2 : "flow-include" === this.input.slice(shiftToFirstNonWhiteSpace + pos, shiftToFirstNonWhiteSpace + pos + 12) ? shiftToFirstNonWhiteSpace + 12 : 58 === ch2 && 58 !== ch3 && shiftToFirstNonWhiteSpace;
  }
  hasFlowCommentCompletion() {
    if (-1 === this.input.indexOf("*/", this.state.pos)) throw this.raise(this.state.pos, ErrorMessages.UnterminatedComment);
  }
  flowEnumErrorBooleanMemberNotInitialized(pos, {enumName: enumName, memberName: memberName}) {
    this.raise(pos, FlowErrors.EnumBooleanMemberNotInitialized, memberName, enumName);
  }
  flowEnumErrorInvalidMemberName(pos, {enumName: enumName, memberName: memberName}) {
    const suggestion = memberName[0].toUpperCase() + memberName.slice(1);
    this.raise(pos, FlowErrors.EnumInvalidMemberName, memberName, suggestion, enumName);
  }
  flowEnumErrorDuplicateMemberName(pos, {enumName: enumName, memberName: memberName}) {
    this.raise(pos, FlowErrors.EnumDuplicateMemberName, memberName, enumName);
  }
  flowEnumErrorInconsistentMemberValues(pos, {enumName: enumName}) {
    this.raise(pos, FlowErrors.EnumInconsistentMemberValues, enumName);
  }
  flowEnumErrorInvalidExplicitType(pos, {enumName: enumName, suppliedType: suppliedType}) {
    return this.raise(pos, null === suppliedType ? FlowErrors.EnumInvalidExplicitTypeUnknownSupplied : FlowErrors.EnumInvalidExplicitType, enumName, suppliedType);
  }
  flowEnumErrorInvalidMemberInitializer(pos, {enumName: enumName, explicitType: explicitType, memberName: memberName}) {
    let message = null;
    switch (explicitType) {
     case "boolean":
     case "number":
     case "string":
      message = FlowErrors.EnumInvalidMemberInitializerPrimaryType;
      break;

     case "symbol":
      message = FlowErrors.EnumInvalidMemberInitializerSymbolType;
      break;

     default:
      message = FlowErrors.EnumInvalidMemberInitializerUnknownType;
    }
    return this.raise(pos, message, enumName, memberName, explicitType);
  }
  flowEnumErrorNumberMemberNotInitialized(pos, {enumName: enumName, memberName: memberName}) {
    this.raise(pos, FlowErrors.EnumNumberMemberNotInitialized, enumName, memberName);
  }
  flowEnumErrorStringMemberInconsistentlyInitailized(pos, {enumName: enumName}) {
    this.raise(pos, FlowErrors.EnumStringMemberInconsistentlyInitailized, enumName);
  }
  flowEnumMemberInit() {
    const startPos = this.state.start, endOfInit = () => this.match(types.comma) || this.match(types.braceR);
    switch (this.state.type) {
     case types.num:
      {
        const literal = this.parseLiteral(this.state.value, "NumericLiteral");
        return endOfInit() ? {
          type: "number",
          pos: literal.start,
          value: literal
        } : {
          type: "invalid",
          pos: startPos
        };
      }

     case types.string:
      {
        const literal = this.parseLiteral(this.state.value, "StringLiteral");
        return endOfInit() ? {
          type: "string",
          pos: literal.start,
          value: literal
        } : {
          type: "invalid",
          pos: startPos
        };
      }

     case types._true:
     case types._false:
      {
        const literal = this.parseBooleanLiteral();
        return endOfInit() ? {
          type: "boolean",
          pos: literal.start,
          value: literal
        } : {
          type: "invalid",
          pos: startPos
        };
      }

     default:
      return {
        type: "invalid",
        pos: startPos
      };
    }
  }
  flowEnumMemberRaw() {
    const pos = this.state.start;
    return {
      id: this.parseIdentifier(!0),
      init: this.eat(types.eq) ? this.flowEnumMemberInit() : {
        type: "none",
        pos: pos
      }
    };
  }
  flowEnumCheckExplicitTypeMismatch(pos, context, expectedType) {
    const {explicitType: explicitType} = context;
    null !== explicitType && explicitType !== expectedType && this.flowEnumErrorInvalidMemberInitializer(pos, context);
  }
  flowEnumMembers({enumName: enumName, explicitType: explicitType}) {
    const seenNames = new Set, members = {
      booleanMembers: [],
      numberMembers: [],
      stringMembers: [],
      defaultedMembers: []
    };
    for (;!this.match(types.braceR); ) {
      const memberNode = this.startNode(), {id: id, init: init} = this.flowEnumMemberRaw(), memberName = id.name;
      if ("" === memberName) continue;
      /^[a-z]/.test(memberName) && this.flowEnumErrorInvalidMemberName(id.start, {
        enumName: enumName,
        memberName: memberName
      }), seenNames.has(memberName) && this.flowEnumErrorDuplicateMemberName(id.start, {
        enumName: enumName,
        memberName: memberName
      }), seenNames.add(memberName);
      const context = {
        enumName: enumName,
        explicitType: explicitType,
        memberName: memberName
      };
      switch (memberNode.id = id, init.type) {
       case "boolean":
        this.flowEnumCheckExplicitTypeMismatch(init.pos, context, "boolean"), memberNode.init = init.value, 
        members.booleanMembers.push(this.finishNode(memberNode, "EnumBooleanMember"));
        break;

       case "number":
        this.flowEnumCheckExplicitTypeMismatch(init.pos, context, "number"), memberNode.init = init.value, 
        members.numberMembers.push(this.finishNode(memberNode, "EnumNumberMember"));
        break;

       case "string":
        this.flowEnumCheckExplicitTypeMismatch(init.pos, context, "string"), memberNode.init = init.value, 
        members.stringMembers.push(this.finishNode(memberNode, "EnumStringMember"));
        break;

       case "invalid":
        throw this.flowEnumErrorInvalidMemberInitializer(init.pos, context);

       case "none":
        switch (explicitType) {
         case "boolean":
          this.flowEnumErrorBooleanMemberNotInitialized(init.pos, context);
          break;

         case "number":
          this.flowEnumErrorNumberMemberNotInitialized(init.pos, context);
          break;

         default:
          members.defaultedMembers.push(this.finishNode(memberNode, "EnumDefaultedMember"));
        }
      }
      this.match(types.braceR) || this.expect(types.comma);
    }
    return members;
  }
  flowEnumStringMembers(initializedMembers, defaultedMembers, {enumName: enumName}) {
    if (0 === initializedMembers.length) return defaultedMembers;
    if (0 === defaultedMembers.length) return initializedMembers;
    if (defaultedMembers.length > initializedMembers.length) {
      for (let _i = 0; _i < initializedMembers.length; _i++) {
        const member = initializedMembers[_i];
        this.flowEnumErrorStringMemberInconsistentlyInitailized(member.start, {
          enumName: enumName
        });
      }
      return defaultedMembers;
    }
    for (let _i2 = 0; _i2 < defaultedMembers.length; _i2++) {
      const member = defaultedMembers[_i2];
      this.flowEnumErrorStringMemberInconsistentlyInitailized(member.start, {
        enumName: enumName
      });
    }
    return initializedMembers;
  }
  flowEnumParseExplicitType({enumName: enumName}) {
    if (this.eatContextual("of")) {
      if (!this.match(types.name)) throw this.flowEnumErrorInvalidExplicitType(this.state.start, {
        enumName: enumName,
        suppliedType: null
      });
      const {value: value} = this.state;
      return this.next(), "boolean" !== value && "number" !== value && "string" !== value && "symbol" !== value && this.flowEnumErrorInvalidExplicitType(this.state.start, {
        enumName: enumName,
        suppliedType: value
      }), value;
    }
    return null;
  }
  flowEnumBody(node, {enumName: enumName, nameLoc: nameLoc}) {
    const explicitType = this.flowEnumParseExplicitType({
      enumName: enumName
    });
    this.expect(types.braceL);
    const members = this.flowEnumMembers({
      enumName: enumName,
      explicitType: explicitType
    });
    switch (explicitType) {
     case "boolean":
      return node.explicitType = !0, node.members = members.booleanMembers, this.expect(types.braceR), 
      this.finishNode(node, "EnumBooleanBody");

     case "number":
      return node.explicitType = !0, node.members = members.numberMembers, this.expect(types.braceR), 
      this.finishNode(node, "EnumNumberBody");

     case "string":
      return node.explicitType = !0, node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
        enumName: enumName
      }), this.expect(types.braceR), this.finishNode(node, "EnumStringBody");

     case "symbol":
      return node.members = members.defaultedMembers, this.expect(types.braceR), this.finishNode(node, "EnumSymbolBody");

     default:
      {
        const empty = () => (node.members = [], this.expect(types.braceR), this.finishNode(node, "EnumStringBody"));
        node.explicitType = !1;
        const boolsLen = members.booleanMembers.length, numsLen = members.numberMembers.length, strsLen = members.stringMembers.length, defaultedLen = members.defaultedMembers.length;
        if (boolsLen || numsLen || strsLen || defaultedLen) {
          if (boolsLen || numsLen) {
            if (!numsLen && !strsLen && boolsLen >= defaultedLen) {
              for (let _i3 = 0, _members$defaultedMem = members.defaultedMembers; _i3 < _members$defaultedMem.length; _i3++) {
                const member = _members$defaultedMem[_i3];
                this.flowEnumErrorBooleanMemberNotInitialized(member.start, {
                  enumName: enumName,
                  memberName: member.id.name
                });
              }
              return node.members = members.booleanMembers, this.expect(types.braceR), this.finishNode(node, "EnumBooleanBody");
            }
            if (!boolsLen && !strsLen && numsLen >= defaultedLen) {
              for (let _i4 = 0, _members$defaultedMem2 = members.defaultedMembers; _i4 < _members$defaultedMem2.length; _i4++) {
                const member = _members$defaultedMem2[_i4];
                this.flowEnumErrorNumberMemberNotInitialized(member.start, {
                  enumName: enumName,
                  memberName: member.id.name
                });
              }
              return node.members = members.numberMembers, this.expect(types.braceR), this.finishNode(node, "EnumNumberBody");
            }
            return this.flowEnumErrorInconsistentMemberValues(nameLoc, {
              enumName: enumName
            }), empty();
          }
          return node.members = this.flowEnumStringMembers(members.stringMembers, members.defaultedMembers, {
            enumName: enumName
          }), this.expect(types.braceR), this.finishNode(node, "EnumStringBody");
        }
        return empty();
      }
    }
  }
  flowParseEnumDeclaration(node) {
    const id = this.parseIdentifier();
    return node.id = id, node.body = this.flowEnumBody(this.startNode(), {
      enumName: id.name,
      nameLoc: id.start
    }), this.finishNode(node, "EnumDeclaration");
  }
  updateContext(prevType) {
    this.match(types.name) && "of" === this.state.value && prevType === types.name && "interface" === this.input.slice(this.state.lastTokStart, this.state.lastTokEnd) ? this.state.exprAllowed = !1 : super.updateContext(prevType);
  }
};

const entities = {
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
}, HEX_NUMBER = /^[\da-fA-F]+$/, DECIMAL_NUMBER = /^\d+$/, JsxErrors = Object.freeze({
  AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression",
  MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>",
  MissingClosingTagElement: "Expected corresponding JSX closing tag for <%0>",
  UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text",
  UnterminatedJsxContent: "Unterminated JSX contents",
  UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?"
});

function isFragment(object) {
  return !!object && ("JSXOpeningFragment" === object.type || "JSXClosingFragment" === object.type);
}

function getQualifiedJSXName(object) {
  if ("JSXIdentifier" === object.type) return object.name;
  if ("JSXNamespacedName" === object.type) return object.namespace.name + ":" + object.name.name;
  if ("JSXMemberExpression" === object.type) return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  throw new Error("Node had unexpected type: " + object.type);
}

types$1.j_oTag = new TokContext("<tag", !1), types$1.j_cTag = new TokContext("</tag", !1), 
types$1.j_expr = new TokContext("<tag>...</tag>", !0, !0), types.jsxName = new TokenType("jsxName"), 
types.jsxText = new TokenType("jsxText", {
  beforeExpr: !0
}), types.jsxTagStart = new TokenType("jsxTagStart", {
  startsExpr: !0
}), types.jsxTagEnd = new TokenType("jsxTagEnd"), types.jsxTagStart.updateContext = function() {
  this.state.context.push(types$1.j_expr), this.state.context.push(types$1.j_oTag), 
  this.state.exprAllowed = !1;
}, types.jsxTagEnd.updateContext = function(prevType) {
  const out = this.state.context.pop();
  out === types$1.j_oTag && prevType === types.slash || out === types$1.j_cTag ? (this.state.context.pop(), 
  this.state.exprAllowed = this.curContext() === types$1.j_expr) : this.state.exprAllowed = !0;
};

var jsx = superClass => class extends superClass {
  jsxReadToken() {
    let out = "", chunkStart = this.state.pos;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(this.state.start, JsxErrors.UnterminatedJsxContent);
      const ch = this.input.charCodeAt(this.state.pos);
      switch (ch) {
       case 60:
       case 123:
        return this.state.pos === this.state.start ? 60 === ch && this.state.exprAllowed ? (++this.state.pos, 
        this.finishToken(types.jsxTagStart)) : super.getTokenFromCode(ch) : (out += this.input.slice(chunkStart, this.state.pos), 
        this.finishToken(types.jsxText, out));

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
      if (this.state.pos >= this.length) throw this.raise(this.state.start, ErrorMessages.UnterminatedString);
      const ch = this.input.charCodeAt(this.state.pos);
      if (ch === quote) break;
      38 === ch ? (out += this.input.slice(chunkStart, this.state.pos), out += this.jsxReadEntity(), 
      chunkStart = this.state.pos) : isNewLine(ch) ? (out += this.input.slice(chunkStart, this.state.pos), 
      out += this.jsxReadNewLine(!1), chunkStart = this.state.pos) : ++this.state.pos;
    }
    return out += this.input.slice(chunkStart, this.state.pos++), this.finishToken(types.string, out);
  }
  jsxReadEntity() {
    let entity, str = "", count = 0, ch = this.input[this.state.pos];
    const startPos = ++this.state.pos;
    for (;this.state.pos < this.length && count++ < 10; ) {
      if (ch = this.input[this.state.pos++], ";" === ch) {
        "#" === str[0] ? "x" === str[1] ? (str = str.substr(2), HEX_NUMBER.test(str) && (entity = String.fromCodePoint(parseInt(str, 16)))) : (str = str.substr(1), 
        DECIMAL_NUMBER.test(str) && (entity = String.fromCodePoint(parseInt(str, 10)))) : entity = entities[str];
        break;
      }
      str += ch;
    }
    return entity || (this.state.pos = startPos, "&");
  }
  jsxReadWord() {
    let ch;
    const start = this.state.pos;
    do {
      ch = this.input.charCodeAt(++this.state.pos);
    } while (isIdentifierChar(ch) || 45 === ch);
    return this.finishToken(types.jsxName, this.input.slice(start, this.state.pos));
  }
  jsxParseIdentifier() {
    const node = this.startNode();
    return this.match(types.jsxName) ? node.name = this.state.value : this.state.type.keyword ? node.name = this.state.type.keyword : this.unexpected(), 
    this.next(), this.finishNode(node, "JSXIdentifier");
  }
  jsxParseNamespacedName() {
    const startPos = this.state.start, startLoc = this.state.startLoc, name = this.jsxParseIdentifier();
    if (!this.eat(types.colon)) return name;
    const node = this.startNodeAt(startPos, startLoc);
    return node.namespace = name, node.name = this.jsxParseIdentifier(), this.finishNode(node, "JSXNamespacedName");
  }
  jsxParseElementName() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let node = this.jsxParseNamespacedName();
    if ("JSXNamespacedName" === node.type) return node;
    for (;this.eat(types.dot); ) {
      const newNode = this.startNodeAt(startPos, startLoc);
      newNode.object = node, newNode.property = this.jsxParseIdentifier(), node = this.finishNode(newNode, "JSXMemberExpression");
    }
    return node;
  }
  jsxParseAttributeValue() {
    let node;
    switch (this.state.type) {
     case types.braceL:
      return node = this.startNode(), this.next(), node = this.jsxParseExpressionContainer(node), 
      "JSXEmptyExpression" === node.expression.type && this.raise(node.start, JsxErrors.AttributeIsEmpty), 
      node;

     case types.jsxTagStart:
     case types.string:
      return this.parseExprAtom();

     default:
      throw this.raise(this.state.start, JsxErrors.UnsupportedJsxValue);
    }
  }
  jsxParseEmptyExpression() {
    const node = this.startNodeAt(this.state.lastTokEnd, this.state.lastTokEndLoc);
    return this.finishNodeAt(node, "JSXEmptyExpression", this.state.start, this.state.startLoc);
  }
  jsxParseSpreadChild(node) {
    return this.next(), node.expression = this.parseExpression(), this.expect(types.braceR), 
    this.finishNode(node, "JSXSpreadChild");
  }
  jsxParseExpressionContainer(node) {
    return this.match(types.braceR) ? node.expression = this.jsxParseEmptyExpression() : node.expression = this.parseExpression(), 
    this.expect(types.braceR), this.finishNode(node, "JSXExpressionContainer");
  }
  jsxParseAttribute() {
    const node = this.startNode();
    return this.eat(types.braceL) ? (this.expect(types.ellipsis), node.argument = this.parseMaybeAssign(), 
    this.expect(types.braceR), this.finishNode(node, "JSXSpreadAttribute")) : (node.name = this.jsxParseNamespacedName(), 
    node.value = this.eat(types.eq) ? this.jsxParseAttributeValue() : null, this.finishNode(node, "JSXAttribute"));
  }
  jsxParseOpeningElementAt(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc);
    return this.match(types.jsxTagEnd) ? (this.expect(types.jsxTagEnd), this.finishNode(node, "JSXOpeningFragment")) : (node.name = this.jsxParseElementName(), 
    this.jsxParseOpeningElementAfterName(node));
  }
  jsxParseOpeningElementAfterName(node) {
    const attributes = [];
    for (;!this.match(types.slash) && !this.match(types.jsxTagEnd); ) attributes.push(this.jsxParseAttribute());
    return node.attributes = attributes, node.selfClosing = this.eat(types.slash), this.expect(types.jsxTagEnd), 
    this.finishNode(node, "JSXOpeningElement");
  }
  jsxParseClosingElementAt(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc);
    return this.match(types.jsxTagEnd) ? (this.expect(types.jsxTagEnd), this.finishNode(node, "JSXClosingFragment")) : (node.name = this.jsxParseElementName(), 
    this.expect(types.jsxTagEnd), this.finishNode(node, "JSXClosingElement"));
  }
  jsxParseElementAt(startPos, startLoc) {
    const node = this.startNodeAt(startPos, startLoc), children = [], openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
    let closingElement = null;
    if (!openingElement.selfClosing) {
      contents: for (;;) switch (this.state.type) {
       case types.jsxTagStart:
        if (startPos = this.state.start, startLoc = this.state.startLoc, this.next(), this.eat(types.slash)) {
          closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
          break contents;
        }
        children.push(this.jsxParseElementAt(startPos, startLoc));
        break;

       case types.jsxText:
        children.push(this.parseExprAtom());
        break;

       case types.braceL:
        {
          const node = this.startNode();
          this.next(), this.match(types.ellipsis) ? children.push(this.jsxParseSpreadChild(node)) : children.push(this.jsxParseExpressionContainer(node));
          break;
        }

       default:
        throw this.unexpected();
      }
      isFragment(openingElement) && !isFragment(closingElement) ? this.raise(closingElement.start, JsxErrors.MissingClosingTagFragment) : !isFragment(openingElement) && isFragment(closingElement) ? this.raise(closingElement.start, JsxErrors.MissingClosingTagElement, getQualifiedJSXName(openingElement.name)) : isFragment(openingElement) || isFragment(closingElement) || getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name) && this.raise(closingElement.start, JsxErrors.MissingClosingTagElement, getQualifiedJSXName(openingElement.name));
    }
    if (isFragment(openingElement) ? (node.openingFragment = openingElement, node.closingFragment = closingElement) : (node.openingElement = openingElement, 
    node.closingElement = closingElement), node.children = children, this.isRelational("<")) throw this.raise(this.state.start, JsxErrors.UnwrappedAdjacentJSXElements);
    return isFragment(openingElement) ? this.finishNode(node, "JSXFragment") : this.finishNode(node, "JSXElement");
  }
  jsxParseElement() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    return this.next(), this.jsxParseElementAt(startPos, startLoc);
  }
  parseExprAtom(refExpressionErrors) {
    return this.match(types.jsxText) ? this.parseLiteral(this.state.value, "JSXText") : this.match(types.jsxTagStart) ? this.jsxParseElement() : this.isRelational("<") && 33 !== this.input.charCodeAt(this.state.pos) ? (this.finishToken(types.jsxTagStart), 
    this.jsxParseElement()) : super.parseExprAtom(refExpressionErrors);
  }
  getTokenFromCode(code) {
    if (this.state.inPropertyName) return super.getTokenFromCode(code);
    const context = this.curContext();
    if (context === types$1.j_expr) return this.jsxReadToken();
    if (context === types$1.j_oTag || context === types$1.j_cTag) {
      if (isIdentifierStart(code)) return this.jsxReadWord();
      if (62 === code) return ++this.state.pos, this.finishToken(types.jsxTagEnd);
      if ((34 === code || 39 === code) && context === types$1.j_oTag) return this.jsxReadString(code);
    }
    return 60 === code && this.state.exprAllowed && 33 !== this.input.charCodeAt(this.state.pos + 1) ? (++this.state.pos, 
    this.finishToken(types.jsxTagStart)) : super.getTokenFromCode(code);
  }
  updateContext(prevType) {
    if (this.match(types.braceL)) {
      const curContext = this.curContext();
      curContext === types$1.j_oTag ? this.state.context.push(types$1.braceExpression) : curContext === types$1.j_expr ? this.state.context.push(types$1.templateQuasi) : super.updateContext(prevType), 
      this.state.exprAllowed = !0;
    } else {
      if (!this.match(types.slash) || prevType !== types.jsxTagStart) return super.updateContext(prevType);
      this.state.context.length -= 2, this.state.context.push(types$1.j_cTag), this.state.exprAllowed = !1;
    }
  }
};

class Scope {
  constructor(flags) {
    this.var = [], this.lexical = [], this.functions = [], this.flags = flags;
  }
}

class ScopeHandler {
  constructor(raise, inModule) {
    this.scopeStack = [], this.undefinedExports = new Map, this.undefinedPrivateNames = new Map, 
    this.raise = raise, this.inModule = inModule;
  }
  get inFunction() {
    return (2 & this.currentVarScope().flags) > 0;
  }
  get allowSuper() {
    return (16 & this.currentThisScope().flags) > 0;
  }
  get allowDirectSuper() {
    return (32 & this.currentThisScope().flags) > 0;
  }
  get inClass() {
    return (64 & this.currentThisScope().flags) > 0;
  }
  get inNonArrowFunction() {
    return (2 & this.currentThisScope().flags) > 0;
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
    return !!(2 & scope.flags || !this.inModule && 1 & scope.flags);
  }
  declareName(name, bindingType, pos) {
    let scope = this.currentScope();
    if (8 & bindingType || 16 & bindingType) this.checkRedeclarationInScope(scope, name, bindingType, pos), 
    16 & bindingType ? scope.functions.push(name) : scope.lexical.push(name), 8 & bindingType && this.maybeExportDefined(scope, name); else if (4 & bindingType) for (let i = this.scopeStack.length - 1; i >= 0 && (scope = this.scopeStack[i], 
    this.checkRedeclarationInScope(scope, name, bindingType, pos), scope.var.push(name), 
    this.maybeExportDefined(scope, name), !(131 & scope.flags)); --i) ;
    this.inModule && 1 & scope.flags && this.undefinedExports.delete(name);
  }
  maybeExportDefined(scope, name) {
    this.inModule && 1 & scope.flags && this.undefinedExports.delete(name);
  }
  checkRedeclarationInScope(scope, name, bindingType, pos) {
    this.isRedeclaredInScope(scope, name, bindingType) && this.raise(pos, ErrorMessages.VarRedeclaration, name);
  }
  isRedeclaredInScope(scope, name, bindingType) {
    return !!(1 & bindingType) && (8 & bindingType ? scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1 : 16 & bindingType ? scope.lexical.indexOf(name) > -1 || !this.treatFunctionsAsVarInScope(scope) && scope.var.indexOf(name) > -1 : scope.lexical.indexOf(name) > -1 && !(8 & scope.flags && scope.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope) && scope.functions.indexOf(name) > -1);
  }
  checkLocalExport(id) {
    -1 === this.scopeStack[0].lexical.indexOf(id.name) && -1 === this.scopeStack[0].var.indexOf(id.name) && -1 === this.scopeStack[0].functions.indexOf(id.name) && this.undefinedExports.set(id.name, id.start);
  }
  currentScope() {
    return this.scopeStack[this.scopeStack.length - 1];
  }
  currentVarScope() {
    for (let i = this.scopeStack.length - 1; ;i--) {
      const scope = this.scopeStack[i];
      if (131 & scope.flags) return scope;
    }
  }
  currentThisScope() {
    for (let i = this.scopeStack.length - 1; ;i--) {
      const scope = this.scopeStack[i];
      if ((131 & scope.flags || 64 & scope.flags) && !(4 & scope.flags)) return scope;
    }
  }
}

class TypeScriptScope extends Scope {
  constructor(...args) {
    super(...args), this.types = [], this.enums = [], this.constEnums = [], this.classes = [], 
    this.exportOnlyBindings = [];
  }
}

class TypeScriptScopeHandler extends ScopeHandler {
  createScope(flags) {
    return new TypeScriptScope(flags);
  }
  declareName(name, bindingType, pos) {
    const scope = this.currentScope();
    if (1024 & bindingType) return this.maybeExportDefined(scope, name), void scope.exportOnlyBindings.push(name);
    super.declareName(...arguments), 2 & bindingType && (1 & bindingType || (this.checkRedeclarationInScope(scope, name, bindingType, pos), 
    this.maybeExportDefined(scope, name)), scope.types.push(name)), 256 & bindingType && scope.enums.push(name), 
    512 & bindingType && scope.constEnums.push(name), 128 & bindingType && scope.classes.push(name);
  }
  isRedeclaredInScope(scope, name, bindingType) {
    if (scope.enums.indexOf(name) > -1) {
      if (256 & bindingType) {
        return !!(512 & bindingType) !== scope.constEnums.indexOf(name) > -1;
      }
      return !0;
    }
    return 128 & bindingType && scope.classes.indexOf(name) > -1 ? scope.lexical.indexOf(name) > -1 && !!(1 & bindingType) : !!(2 & bindingType && scope.types.indexOf(name) > -1) || super.isRedeclaredInScope(...arguments);
  }
  checkLocalExport(id) {
    -1 === this.scopeStack[0].types.indexOf(id.name) && -1 === this.scopeStack[0].exportOnlyBindings.indexOf(id.name) && super.checkLocalExport(id);
  }
}

const PARAM = 0, PARAM_YIELD = 1, PARAM_AWAIT = 2, PARAM_RETURN = 4;

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
}

function functionFlags(isAsync, isGenerator) {
  return (isAsync ? 2 : 0) | (isGenerator ? 1 : 0);
}

function nonNull(x) {
  if (null == x) throw new Error(`Unexpected ${x} value.`);
  return x;
}

function assert(x) {
  if (!x) throw new Error("Assert fail");
}

const TSErrors = Object.freeze({
  ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier",
  ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier",
  DeclareClassFieldHasInitializer: "'declare' class fields cannot have an initializer",
  DuplicateModifier: "Duplicate modifier: '%0'",
  EmptyHeritageClauseType: "'%0' list cannot be empty.",
  IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier",
  IndexSignatureHasAccessibility: "Index signatures cannot have an accessibility modifier ('%0')",
  IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier",
  OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
  PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
  PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
  PrivateElementHasAccessibility: "Private elements cannot have an accessibility modifier ('%0')",
  TemplateTypeHasSubstitution: "Template literal types cannot have any substitution",
  TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`",
  UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
  UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
  UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
  UnsupportedImportTypeArgument: "Argument in a type import must be a string literal",
  UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
  UnsupportedSignatureParameterKind: "Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got %0"
});

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

var typescript = superClass => class extends superClass {
  getScopeHandler() {
    return TypeScriptScopeHandler;
  }
  tsIsIdentifier() {
    return this.match(types.name);
  }
  tsNextTokenCanFollowModifier() {
    return this.next(), !(this.hasPrecedingLineBreak() || this.match(types.parenL) || this.match(types.parenR) || this.match(types.colon) || this.match(types.eq) || this.match(types.question) || this.match(types.bang));
  }
  tsParseModifier(allowedModifiers) {
    if (!this.match(types.name)) return;
    const modifier = this.state.value;
    return -1 !== allowedModifiers.indexOf(modifier) && this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this)) ? modifier : void 0;
  }
  tsParseModifiers(modified, allowedModifiers) {
    for (;;) {
      const startPos = this.state.start, modifier = this.tsParseModifier(allowedModifiers);
      if (!modifier) break;
      Object.hasOwnProperty.call(modified, modifier) && this.raise(startPos, TSErrors.DuplicateModifier, modifier), 
      modified[modifier] = !0;
    }
  }
  tsIsListTerminator(kind) {
    switch (kind) {
     case "EnumMembers":
     case "TypeMembers":
      return this.match(types.braceR);

     case "HeritageClauseElement":
      return this.match(types.braceL);

     case "TupleElementTypes":
      return this.match(types.bracketR);

     case "TypeParametersOrArguments":
      return this.isRelational(">");
    }
    throw new Error("Unreachable");
  }
  tsParseList(kind, parseElement) {
    const result = [];
    for (;!this.tsIsListTerminator(kind); ) result.push(parseElement());
    return result;
  }
  tsParseDelimitedList(kind, parseElement) {
    return nonNull(this.tsParseDelimitedListWorker(kind, parseElement, !0));
  }
  tsParseDelimitedListWorker(kind, parseElement, expectSuccess) {
    const result = [];
    for (;!this.tsIsListTerminator(kind); ) {
      const element = parseElement();
      if (null == element) return;
      if (result.push(element), !this.eat(types.comma)) {
        if (this.tsIsListTerminator(kind)) break;
        return void (expectSuccess && this.expect(types.comma));
      }
    }
    return result;
  }
  tsParseBracketedList(kind, parseElement, bracket, skipFirstToken) {
    skipFirstToken || (bracket ? this.expect(types.bracketL) : this.expectRelational("<"));
    const result = this.tsParseDelimitedList(kind, parseElement);
    return bracket ? this.expect(types.bracketR) : this.expectRelational(">"), result;
  }
  tsParseImportType() {
    const node = this.startNode();
    return this.expect(types._import), this.expect(types.parenL), this.match(types.string) || this.raise(this.state.start, TSErrors.UnsupportedImportTypeArgument), 
    node.argument = this.parseExprAtom(), this.expect(types.parenR), this.eat(types.dot) && (node.qualifier = this.tsParseEntityName(!0)), 
    this.isRelational("<") && (node.typeParameters = this.tsParseTypeArguments()), this.finishNode(node, "TSImportType");
  }
  tsParseEntityName(allowReservedWords) {
    let entity = this.parseIdentifier();
    for (;this.eat(types.dot); ) {
      const node = this.startNodeAtNode(entity);
      node.left = entity, node.right = this.parseIdentifier(allowReservedWords), entity = this.finishNode(node, "TSQualifiedName");
    }
    return entity;
  }
  tsParseTypeReference() {
    const node = this.startNode();
    return node.typeName = this.tsParseEntityName(!1), !this.hasPrecedingLineBreak() && this.isRelational("<") && (node.typeParameters = this.tsParseTypeArguments()), 
    this.finishNode(node, "TSTypeReference");
  }
  tsParseThisTypePredicate(lhs) {
    this.next();
    const node = this.startNodeAtNode(lhs);
    return node.parameterName = lhs, node.typeAnnotation = this.tsParseTypeAnnotation(!1), 
    this.finishNode(node, "TSTypePredicate");
  }
  tsParseThisTypeNode() {
    const node = this.startNode();
    return this.next(), this.finishNode(node, "TSThisType");
  }
  tsParseTypeQuery() {
    const node = this.startNode();
    return this.expect(types._typeof), this.match(types._import) ? node.exprName = this.tsParseImportType() : node.exprName = this.tsParseEntityName(!0), 
    this.finishNode(node, "TSTypeQuery");
  }
  tsParseTypeParameter() {
    const node = this.startNode();
    return node.name = this.parseIdentifierName(node.start), node.constraint = this.tsEatThenParseType(types._extends), 
    node.default = this.tsEatThenParseType(types.eq), this.finishNode(node, "TSTypeParameter");
  }
  tsTryParseTypeParameters() {
    if (this.isRelational("<")) return this.tsParseTypeParameters();
  }
  tsParseTypeParameters() {
    const node = this.startNode();
    return this.isRelational("<") || this.match(types.jsxTagStart) ? this.next() : this.unexpected(), 
    node.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this), !1, !0), 
    this.finishNode(node, "TSTypeParameterDeclaration");
  }
  tsTryNextParseConstantContext() {
    return this.lookahead().type === types._const ? (this.next(), this.tsParseTypeReference()) : null;
  }
  tsFillSignature(returnToken, signature) {
    const returnTokenRequired = returnToken === types.arrow;
    signature.typeParameters = this.tsTryParseTypeParameters(), this.expect(types.parenL), 
    signature.parameters = this.tsParseBindingListForSignature(), (returnTokenRequired || this.match(returnToken)) && (signature.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(returnToken));
  }
  tsParseBindingListForSignature() {
    return this.parseBindingList(types.parenR, 41).map(pattern => ("Identifier" !== pattern.type && "RestElement" !== pattern.type && "ObjectPattern" !== pattern.type && "ArrayPattern" !== pattern.type && this.raise(pattern.start, TSErrors.UnsupportedSignatureParameterKind, pattern.type), 
    pattern));
  }
  tsParseTypeMemberSemicolon() {
    this.eat(types.comma) || this.semicolon();
  }
  tsParseSignatureMember(kind, node) {
    return this.tsFillSignature(types.colon, node), this.tsParseTypeMemberSemicolon(), 
    this.finishNode(node, kind);
  }
  tsIsUnambiguouslyIndexSignature() {
    return this.next(), this.eat(types.name) && this.match(types.colon);
  }
  tsTryParseIndexSignature(node) {
    if (!this.match(types.bracketL) || !this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))) return;
    this.expect(types.bracketL);
    const id = this.parseIdentifier();
    id.typeAnnotation = this.tsParseTypeAnnotation(), this.resetEndLocation(id), this.expect(types.bracketR), 
    node.parameters = [ id ];
    const type = this.tsTryParseTypeAnnotation();
    return type && (node.typeAnnotation = type), this.tsParseTypeMemberSemicolon(), 
    this.finishNode(node, "TSIndexSignature");
  }
  tsParsePropertyOrMethodSignature(node, readonly) {
    this.eat(types.question) && (node.optional = !0);
    const nodeAny = node;
    if (readonly || !this.match(types.parenL) && !this.isRelational("<")) {
      const property = nodeAny;
      readonly && (property.readonly = !0);
      const type = this.tsTryParseTypeAnnotation();
      return type && (property.typeAnnotation = type), this.tsParseTypeMemberSemicolon(), 
      this.finishNode(property, "TSPropertySignature");
    }
    {
      const method = nodeAny;
      return this.tsFillSignature(types.colon, method), this.tsParseTypeMemberSemicolon(), 
      this.finishNode(method, "TSMethodSignature");
    }
  }
  tsParseTypeMember() {
    const node = this.startNode();
    if (this.match(types.parenL) || this.isRelational("<")) return this.tsParseSignatureMember("TSCallSignatureDeclaration", node);
    if (this.match(types._new)) {
      const id = this.startNode();
      return this.next(), this.match(types.parenL) || this.isRelational("<") ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", node) : (node.key = this.createIdentifier(id, "new"), 
      this.tsParsePropertyOrMethodSignature(node, !1));
    }
    const readonly = !!this.tsParseModifier([ "readonly" ]), idx = this.tsTryParseIndexSignature(node);
    return idx ? (readonly && (node.readonly = !0), idx) : (this.parsePropertyName(node, !1), 
    this.tsParsePropertyOrMethodSignature(node, readonly));
  }
  tsParseTypeLiteral() {
    const node = this.startNode();
    return node.members = this.tsParseObjectTypeMembers(), this.finishNode(node, "TSTypeLiteral");
  }
  tsParseObjectTypeMembers() {
    this.expect(types.braceL);
    const members = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
    return this.expect(types.braceR), members;
  }
  tsIsStartOfMappedType() {
    return this.next(), this.eat(types.plusMin) ? this.isContextual("readonly") : (this.isContextual("readonly") && this.next(), 
    !!this.match(types.bracketL) && (this.next(), !!this.tsIsIdentifier() && (this.next(), 
    this.match(types._in))));
  }
  tsParseMappedTypeParameter() {
    const node = this.startNode();
    return node.name = this.parseIdentifierName(node.start), node.constraint = this.tsExpectThenParseType(types._in), 
    this.finishNode(node, "TSTypeParameter");
  }
  tsParseMappedType() {
    const node = this.startNode();
    return this.expect(types.braceL), this.match(types.plusMin) ? (node.readonly = this.state.value, 
    this.next(), this.expectContextual("readonly")) : this.eatContextual("readonly") && (node.readonly = !0), 
    this.expect(types.bracketL), node.typeParameter = this.tsParseMappedTypeParameter(), 
    this.expect(types.bracketR), this.match(types.plusMin) ? (node.optional = this.state.value, 
    this.next(), this.expect(types.question)) : this.eat(types.question) && (node.optional = !0), 
    node.typeAnnotation = this.tsTryParseType(), this.semicolon(), this.expect(types.braceR), 
    this.finishNode(node, "TSMappedType");
  }
  tsParseTupleType() {
    const node = this.startNode();
    node.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), !0, !1);
    let seenOptionalElement = !1;
    return node.elementTypes.forEach(elementNode => {
      "TSOptionalType" === elementNode.type ? seenOptionalElement = !0 : seenOptionalElement && "TSRestType" !== elementNode.type && this.raise(elementNode.start, TSErrors.OptionalTypeBeforeRequired);
    }), this.finishNode(node, "TSTupleType");
  }
  tsParseTupleElementType() {
    if (this.match(types.ellipsis)) {
      const restNode = this.startNode();
      return this.next(), restNode.typeAnnotation = this.tsParseType(), this.match(types.comma) && 93 !== this.lookaheadCharCode() && this.raiseRestNotLast(this.state.start), 
      this.finishNode(restNode, "TSRestType");
    }
    const type = this.tsParseType();
    if (this.eat(types.question)) {
      const optionalTypeNode = this.startNodeAtNode(type);
      return optionalTypeNode.typeAnnotation = type, this.finishNode(optionalTypeNode, "TSOptionalType");
    }
    return type;
  }
  tsParseParenthesizedType() {
    const node = this.startNode();
    return this.expect(types.parenL), node.typeAnnotation = this.tsParseType(), this.expect(types.parenR), 
    this.finishNode(node, "TSParenthesizedType");
  }
  tsParseFunctionOrConstructorType(type) {
    const node = this.startNode();
    return "TSConstructorType" === type && this.expect(types._new), this.tsFillSignature(types.arrow, node), 
    this.finishNode(node, type);
  }
  tsParseLiteralTypeNode() {
    const node = this.startNode();
    return node.literal = (() => {
      switch (this.state.type) {
       case types.num:
       case types.bigint:
       case types.string:
       case types._true:
       case types._false:
        return this.parseExprAtom();

       default:
        throw this.unexpected();
      }
    })(), this.finishNode(node, "TSLiteralType");
  }
  tsParseTemplateLiteralType() {
    const node = this.startNode(), templateNode = this.parseTemplate(!1);
    return templateNode.expressions.length > 0 && this.raise(templateNode.expressions[0].start, TSErrors.TemplateTypeHasSubstitution), 
    node.literal = templateNode, this.finishNode(node, "TSLiteralType");
  }
  tsParseThisTypeOrThisTypePredicate() {
    const thisKeyword = this.tsParseThisTypeNode();
    return this.isContextual("is") && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(thisKeyword) : thisKeyword;
  }
  tsParseNonArrayType() {
    switch (this.state.type) {
     case types.name:
     case types._void:
     case types._null:
      {
        const type = this.match(types._void) ? "TSVoidKeyword" : this.match(types._null) ? "TSNullKeyword" : keywordTypeFromName(this.state.value);
        if (void 0 !== type && 46 !== this.lookaheadCharCode()) {
          const node = this.startNode();
          return this.next(), this.finishNode(node, type);
        }
        return this.tsParseTypeReference();
      }

     case types.string:
     case types.num:
     case types.bigint:
     case types._true:
     case types._false:
      return this.tsParseLiteralTypeNode();

     case types.plusMin:
      if ("-" === this.state.value) {
        const node = this.startNode(), nextToken = this.lookahead();
        if (nextToken.type !== types.num && nextToken.type !== types.bigint) throw this.unexpected();
        return node.literal = this.parseMaybeUnary(), this.finishNode(node, "TSLiteralType");
      }
      break;

     case types._this:
      return this.tsParseThisTypeOrThisTypePredicate();

     case types._typeof:
      return this.tsParseTypeQuery();

     case types._import:
      return this.tsParseImportType();

     case types.braceL:
      return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();

     case types.bracketL:
      return this.tsParseTupleType();

     case types.parenL:
      return this.tsParseParenthesizedType();

     case types.backQuote:
      return this.tsParseTemplateLiteralType();
    }
    throw this.unexpected();
  }
  tsParseArrayTypeOrHigher() {
    let type = this.tsParseNonArrayType();
    for (;!this.hasPrecedingLineBreak() && this.eat(types.bracketL); ) if (this.match(types.bracketR)) {
      const node = this.startNodeAtNode(type);
      node.elementType = type, this.expect(types.bracketR), type = this.finishNode(node, "TSArrayType");
    } else {
      const node = this.startNodeAtNode(type);
      node.objectType = type, node.indexType = this.tsParseType(), this.expect(types.bracketR), 
      type = this.finishNode(node, "TSIndexedAccessType");
    }
    return type;
  }
  tsParseTypeOperator(operator) {
    const node = this.startNode();
    return this.expectContextual(operator), node.operator = operator, node.typeAnnotation = this.tsParseTypeOperatorOrHigher(), 
    "readonly" === operator && this.tsCheckTypeAnnotationForReadOnly(node), this.finishNode(node, "TSTypeOperator");
  }
  tsCheckTypeAnnotationForReadOnly(node) {
    switch (node.typeAnnotation.type) {
     case "TSTupleType":
     case "TSArrayType":
      return;

     default:
      this.raise(node.start, TSErrors.UnexpectedReadonly);
    }
  }
  tsParseInferType() {
    const node = this.startNode();
    this.expectContextual("infer");
    const typeParameter = this.startNode();
    return typeParameter.name = this.parseIdentifierName(typeParameter.start), node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter"), 
    this.finishNode(node, "TSInferType");
  }
  tsParseTypeOperatorOrHigher() {
    const operator = [ "keyof", "unique", "readonly" ].find(kw => this.isContextual(kw));
    return operator ? this.tsParseTypeOperator(operator) : this.isContextual("infer") ? this.tsParseInferType() : this.tsParseArrayTypeOrHigher();
  }
  tsParseUnionOrIntersectionType(kind, parseConstituentType, operator) {
    this.eat(operator);
    let type = parseConstituentType();
    if (this.match(operator)) {
      const types = [ type ];
      for (;this.eat(operator); ) types.push(parseConstituentType());
      const node = this.startNodeAtNode(type);
      node.types = types, type = this.finishNode(node, kind);
    }
    return type;
  }
  tsParseIntersectionTypeOrHigher() {
    return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), types.bitwiseAND);
  }
  tsParseUnionTypeOrHigher() {
    return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), types.bitwiseOR);
  }
  tsIsStartOfFunctionType() {
    return !!this.isRelational("<") || this.match(types.parenL) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
  }
  tsSkipParameterStart() {
    if (this.match(types.name) || this.match(types._this)) return this.next(), !0;
    if (this.match(types.braceL)) {
      let braceStackCounter = 1;
      for (this.next(); braceStackCounter > 0; ) this.match(types.braceL) ? ++braceStackCounter : this.match(types.braceR) && --braceStackCounter, 
      this.next();
      return !0;
    }
    if (this.match(types.bracketL)) {
      let braceStackCounter = 1;
      for (this.next(); braceStackCounter > 0; ) this.match(types.bracketL) ? ++braceStackCounter : this.match(types.bracketR) && --braceStackCounter, 
      this.next();
      return !0;
    }
    return !1;
  }
  tsIsUnambiguouslyStartOfFunctionType() {
    if (this.next(), this.match(types.parenR) || this.match(types.ellipsis)) return !0;
    if (this.tsSkipParameterStart()) {
      if (this.match(types.colon) || this.match(types.comma) || this.match(types.question) || this.match(types.eq)) return !0;
      if (this.match(types.parenR) && (this.next(), this.match(types.arrow))) return !0;
    }
    return !1;
  }
  tsParseTypeOrTypePredicateAnnotation(returnToken) {
    return this.tsInType(() => {
      const t = this.startNode();
      this.expect(returnToken);
      const asserts = this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
      if (asserts && this.match(types._this)) {
        let thisTypePredicate = this.tsParseThisTypeOrThisTypePredicate();
        if ("TSThisType" === thisTypePredicate.type) {
          const node = this.startNodeAtNode(t);
          node.parameterName = thisTypePredicate, node.asserts = !0, thisTypePredicate = this.finishNode(node, "TSTypePredicate");
        } else thisTypePredicate.asserts = !0;
        return t.typeAnnotation = thisTypePredicate, this.finishNode(t, "TSTypeAnnotation");
      }
      const typePredicateVariable = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
      if (!typePredicateVariable) {
        if (!asserts) return this.tsParseTypeAnnotation(!1, t);
        const node = this.startNodeAtNode(t);
        return node.parameterName = this.parseIdentifier(), node.asserts = asserts, t.typeAnnotation = this.finishNode(node, "TSTypePredicate"), 
        this.finishNode(t, "TSTypeAnnotation");
      }
      const type = this.tsParseTypeAnnotation(!1), node = this.startNodeAtNode(t);
      return node.parameterName = typePredicateVariable, node.typeAnnotation = type, node.asserts = asserts, 
      t.typeAnnotation = this.finishNode(node, "TSTypePredicate"), this.finishNode(t, "TSTypeAnnotation");
    });
  }
  tsTryParseTypeOrTypePredicateAnnotation() {
    return this.match(types.colon) ? this.tsParseTypeOrTypePredicateAnnotation(types.colon) : void 0;
  }
  tsTryParseTypeAnnotation() {
    return this.match(types.colon) ? this.tsParseTypeAnnotation() : void 0;
  }
  tsTryParseType() {
    return this.tsEatThenParseType(types.colon);
  }
  tsParseTypePredicatePrefix() {
    const id = this.parseIdentifier();
    if (this.isContextual("is") && !this.hasPrecedingLineBreak()) return this.next(), 
    id;
  }
  tsParseTypePredicateAsserts() {
    if (!this.match(types.name) || "asserts" !== this.state.value || this.hasPrecedingLineBreak()) return !1;
    const containsEsc = this.state.containsEsc;
    return this.next(), !(!this.match(types.name) && !this.match(types._this)) && (containsEsc && this.raise(this.state.lastTokStart, ErrorMessages.InvalidEscapedReservedWord, "asserts"), 
    !0);
  }
  tsParseTypeAnnotation(eatColon = !0, t = this.startNode()) {
    return this.tsInType(() => {
      eatColon && this.expect(types.colon), t.typeAnnotation = this.tsParseType();
    }), this.finishNode(t, "TSTypeAnnotation");
  }
  tsParseType() {
    assert(this.state.inType);
    const type = this.tsParseNonConditionalType();
    if (this.hasPrecedingLineBreak() || !this.eat(types._extends)) return type;
    const node = this.startNodeAtNode(type);
    return node.checkType = type, node.extendsType = this.tsParseNonConditionalType(), 
    this.expect(types.question), node.trueType = this.tsParseType(), this.expect(types.colon), 
    node.falseType = this.tsParseType(), this.finishNode(node, "TSConditionalType");
  }
  tsParseNonConditionalType() {
    return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(types._new) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.tsParseUnionTypeOrHigher();
  }
  tsParseTypeAssertion() {
    const node = this.startNode(), _const = this.tsTryNextParseConstantContext();
    return node.typeAnnotation = _const || this.tsNextThenParseType(), this.expectRelational(">"), 
    node.expression = this.parseMaybeUnary(), this.finishNode(node, "TSTypeAssertion");
  }
  tsParseHeritageClause(descriptor) {
    const originalStart = this.state.start, delimitedList = this.tsParseDelimitedList("HeritageClauseElement", this.tsParseExpressionWithTypeArguments.bind(this));
    return delimitedList.length || this.raise(originalStart, TSErrors.EmptyHeritageClauseType, descriptor), 
    delimitedList;
  }
  tsParseExpressionWithTypeArguments() {
    const node = this.startNode();
    return node.expression = this.tsParseEntityName(!1), this.isRelational("<") && (node.typeParameters = this.tsParseTypeArguments()), 
    this.finishNode(node, "TSExpressionWithTypeArguments");
  }
  tsParseInterfaceDeclaration(node) {
    node.id = this.parseIdentifier(), this.checkLVal(node.id, 130, void 0, "typescript interface declaration"), 
    node.typeParameters = this.tsTryParseTypeParameters(), this.eat(types._extends) && (node.extends = this.tsParseHeritageClause("extends"));
    const body = this.startNode();
    return body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this)), node.body = this.finishNode(body, "TSInterfaceBody"), 
    this.finishNode(node, "TSInterfaceDeclaration");
  }
  tsParseTypeAliasDeclaration(node) {
    return node.id = this.parseIdentifier(), this.checkLVal(node.id, 2, void 0, "typescript type alias"), 
    node.typeParameters = this.tsTryParseTypeParameters(), node.typeAnnotation = this.tsExpectThenParseType(types.eq), 
    this.semicolon(), this.finishNode(node, "TSTypeAliasDeclaration");
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
    return this.tsDoThenParseType(() => this.expect(token));
  }
  tsNextThenParseType() {
    return this.tsDoThenParseType(() => this.next());
  }
  tsDoThenParseType(cb) {
    return this.tsInType(() => (cb(), this.tsParseType()));
  }
  tsParseEnumMember() {
    const node = this.startNode();
    return node.id = this.match(types.string) ? this.parseExprAtom() : this.parseIdentifier(!0), 
    this.eat(types.eq) && (node.initializer = this.parseMaybeAssign()), this.finishNode(node, "TSEnumMember");
  }
  tsParseEnumDeclaration(node, isConst) {
    return isConst && (node.const = !0), node.id = this.parseIdentifier(), this.checkLVal(node.id, isConst ? 779 : 267, void 0, "typescript enum declaration"), 
    this.expect(types.braceL), node.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), 
    this.expect(types.braceR), this.finishNode(node, "TSEnumDeclaration");
  }
  tsParseModuleBlock() {
    const node = this.startNode();
    return this.scope.enter(0), this.expect(types.braceL), this.parseBlockOrModuleBlockBody(node.body = [], void 0, !0, types.braceR), 
    this.scope.exit(), this.finishNode(node, "TSModuleBlock");
  }
  tsParseModuleOrNamespaceDeclaration(node, nested = !1) {
    if (node.id = this.parseIdentifier(), nested || this.checkLVal(node.id, 1024, null, "module or namespace declaration"), 
    this.eat(types.dot)) {
      const inner = this.startNode();
      this.tsParseModuleOrNamespaceDeclaration(inner, !0), node.body = inner;
    } else this.scope.enter(128), this.prodParam.enter(0), node.body = this.tsParseModuleBlock(), 
    this.prodParam.exit(), this.scope.exit();
    return this.finishNode(node, "TSModuleDeclaration");
  }
  tsParseAmbientExternalModuleDeclaration(node) {
    return this.isContextual("global") ? (node.global = !0, node.id = this.parseIdentifier()) : this.match(types.string) ? node.id = this.parseExprAtom() : this.unexpected(), 
    this.match(types.braceL) ? (this.scope.enter(128), this.prodParam.enter(0), node.body = this.tsParseModuleBlock(), 
    this.prodParam.exit(), this.scope.exit()) : this.semicolon(), this.finishNode(node, "TSModuleDeclaration");
  }
  tsParseImportEqualsDeclaration(node, isExport) {
    return node.isExport = isExport || !1, node.id = this.parseIdentifier(), this.checkLVal(node.id, 9, void 0, "import equals declaration"), 
    this.expect(types.eq), node.moduleReference = this.tsParseModuleReference(), this.semicolon(), 
    this.finishNode(node, "TSImportEqualsDeclaration");
  }
  tsIsExternalModuleReference() {
    return this.isContextual("require") && 40 === this.lookaheadCharCode();
  }
  tsParseModuleReference() {
    return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(!1);
  }
  tsParseExternalModuleReference() {
    const node = this.startNode();
    if (this.expectContextual("require"), this.expect(types.parenL), !this.match(types.string)) throw this.unexpected();
    return node.expression = this.parseExprAtom(), this.expect(types.parenR), this.finishNode(node, "TSExternalModuleReference");
  }
  tsLookAhead(f) {
    const state = this.state.clone(), res = f();
    return this.state = state, res;
  }
  tsTryParseAndCatch(f) {
    const result = this.tryParse(abort => f() || abort());
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
    switch (this.isContextual("let") && (starttype = types._var, kind = "let"), starttype) {
     case types._function:
      return this.parseFunctionStatement(nany, !1, !0);

     case types._class:
      return nany.declare = !0, this.parseClass(nany, !0, !1);

     case types._const:
      if (this.match(types._const) && this.isLookaheadContextual("enum")) return this.expect(types._const), 
      this.expectContextual("enum"), this.tsParseEnumDeclaration(nany, !0);

     case types._var:
      return kind = kind || this.state.value, this.parseVarStatement(nany, kind);

     case types.name:
      {
        const value = this.state.value;
        return "global" === value ? this.tsParseAmbientExternalModuleDeclaration(nany) : this.tsParseDeclaration(nany, value, !0);
      }
    }
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
      if (this.match(types.braceL)) {
        this.scope.enter(128), this.prodParam.enter(0);
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
      if (this.tsCheckLineTerminatorAndMatch(types._class, next)) {
        const cls = node;
        return cls.abstract = !0, next && (this.next(), this.match(types._class) || this.unexpected(null, types._class)), 
        this.parseClass(cls, !0, !1);
      }
      break;

     case "enum":
      if (next || this.match(types.name)) return next && this.next(), this.tsParseEnumDeclaration(node, !1);
      break;

     case "interface":
      if (this.tsCheckLineTerminatorAndMatch(types.name, next)) return next && this.next(), 
      this.tsParseInterfaceDeclaration(node);
      break;

     case "module":
      if (next && this.next(), this.match(types.string)) return this.tsParseAmbientExternalModuleDeclaration(node);
      if (this.tsCheckLineTerminatorAndMatch(types.name, next)) return this.tsParseModuleOrNamespaceDeclaration(node);
      break;

     case "namespace":
      if (this.tsCheckLineTerminatorAndMatch(types.name, next)) return next && this.next(), 
      this.tsParseModuleOrNamespaceDeclaration(node);
      break;

     case "type":
      if (this.tsCheckLineTerminatorAndMatch(types.name, next)) return next && this.next(), 
      this.tsParseTypeAliasDeclaration(node);
    }
  }
  tsCheckLineTerminatorAndMatch(tokenType, next) {
    return (next || this.match(tokenType)) && !this.isLineTerminator();
  }
  tsTryParseGenericAsyncArrowFunction(startPos, startLoc) {
    if (!this.isRelational("<")) return;
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos;
    this.state.maybeInArrowParameters = !0, this.state.yieldPos = -1, this.state.awaitPos = -1;
    const res = this.tsTryParseAndCatch(() => {
      const node = this.startNodeAt(startPos, startLoc);
      return node.typeParameters = this.tsParseTypeParameters(), super.parseFunctionParams(node), 
      node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(), this.expect(types.arrow), 
      node;
    });
    return this.state.maybeInArrowParameters = oldMaybeInArrowParameters, this.state.yieldPos = oldYieldPos, 
    this.state.awaitPos = oldAwaitPos, res ? this.parseArrowExpression(res, null, !0) : void 0;
  }
  tsParseTypeArguments() {
    const node = this.startNode();
    return node.params = this.tsInType(() => this.tsInNoContext(() => (this.expectRelational("<"), 
    this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))), 
    this.state.exprAllowed = !1, this.expectRelational(">"), this.finishNode(node, "TSTypeParameterInstantiation");
  }
  tsIsDeclarationStart() {
    if (this.match(types.name)) switch (this.state.value) {
     case "abstract":
     case "declare":
     case "enum":
     case "interface":
     case "module":
     case "namespace":
     case "type":
      return !0;
    }
    return !1;
  }
  isExportDefaultSpecifier() {
    return !this.tsIsDeclarationStart() && super.isExportDefaultSpecifier();
  }
  parseAssignableListItem(allowModifiers, decorators) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let accessibility, readonly = !1;
    allowModifiers && (accessibility = this.parseAccessModifier(), readonly = !!this.tsParseModifier([ "readonly" ]));
    const left = this.parseMaybeDefault();
    this.parseAssignableListItemTypes(left);
    const elt = this.parseMaybeDefault(left.start, left.loc.start, left);
    if (accessibility || readonly) {
      const pp = this.startNodeAt(startPos, startLoc);
      return decorators.length && (pp.decorators = decorators), accessibility && (pp.accessibility = accessibility), 
      readonly && (pp.readonly = readonly), "Identifier" !== elt.type && "AssignmentPattern" !== elt.type && this.raise(pp.start, TSErrors.UnsupportedParameterPropertyKind), 
      pp.parameter = elt, this.finishNode(pp, "TSParameterProperty");
    }
    return decorators.length && (left.decorators = decorators), elt;
  }
  parseFunctionBodyAndFinish(node, type, isMethod = !1) {
    this.match(types.colon) && (node.returnType = this.tsParseTypeOrTypePredicateAnnotation(types.colon));
    const bodilessType = "FunctionDeclaration" === type ? "TSDeclareFunction" : "ClassMethod" === type ? "TSDeclareMethod" : void 0;
    bodilessType && !this.match(types.braceL) && this.isLineTerminator() ? this.finishNode(node, bodilessType) : super.parseFunctionBodyAndFinish(node, type, isMethod);
  }
  registerFunctionStatementId(node) {
    !node.body && node.id ? this.checkLVal(node.id, 1024, null, "function name") : super.registerFunctionStatementId(...arguments);
  }
  parseSubscript(base, startPos, startLoc, noCalls, state) {
    if (!this.hasPrecedingLineBreak() && this.match(types.bang)) {
      this.state.exprAllowed = !1, this.next();
      const nonNullExpression = this.startNodeAt(startPos, startLoc);
      return nonNullExpression.expression = base, this.finishNode(nonNullExpression, "TSNonNullExpression");
    }
    if (this.isRelational("<")) {
      const result = this.tsTryParseAndCatch(() => {
        if (!noCalls && this.atPossibleAsyncArrow(base)) {
          const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(startPos, startLoc);
          if (asyncArrowFn) return asyncArrowFn;
        }
        const node = this.startNodeAt(startPos, startLoc);
        node.callee = base;
        const typeArguments = this.tsParseTypeArguments();
        if (typeArguments) {
          if (!noCalls && this.eat(types.parenL)) return node.arguments = this.parseCallExpressionArguments(types.parenR, !1), 
          node.typeParameters = typeArguments, this.finishCallExpression(node, state.optionalChainMember);
          if (this.match(types.backQuote)) return this.parseTaggedTemplateExpression(startPos, startLoc, base, state, typeArguments);
        }
        this.unexpected();
      });
      if (result) return result;
    }
    return super.parseSubscript(base, startPos, startLoc, noCalls, state);
  }
  parseNewArguments(node) {
    if (this.isRelational("<")) {
      const typeParameters = this.tsTryParseAndCatch(() => {
        const args = this.tsParseTypeArguments();
        return this.match(types.parenL) || this.unexpected(), args;
      });
      typeParameters && (node.typeParameters = typeParameters);
    }
    super.parseNewArguments(node);
  }
  parseExprOp(left, leftStartPos, leftStartLoc, minPrec, noIn) {
    if (nonNull(types._in.binop) > minPrec && !this.hasPrecedingLineBreak() && this.isContextual("as")) {
      const node = this.startNodeAt(leftStartPos, leftStartLoc);
      node.expression = left;
      const _const = this.tsTryNextParseConstantContext();
      return node.typeAnnotation = _const || this.tsNextThenParseType(), this.finishNode(node, "TSAsExpression"), 
      this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
    return super.parseExprOp(left, leftStartPos, leftStartLoc, minPrec, noIn);
  }
  checkReservedWord(word, startLoc, checkKeywords, isBinding) {}
  checkDuplicateExports() {}
  parseImport(node) {
    if (this.match(types.name) || this.match(types.star) || this.match(types.braceL)) {
      const ahead = this.lookahead();
      if (this.match(types.name) && ahead.type === types.eq) return this.tsParseImportEqualsDeclaration(node);
      !this.isContextual("type") || ahead.type === types.comma || ahead.type === types.name && "from" === ahead.value ? node.importKind = "value" : (node.importKind = "type", 
      this.next());
    }
    const importNode = super.parseImport(node);
    return "type" === importNode.importKind && importNode.specifiers.length > 1 && "ImportDefaultSpecifier" === importNode.specifiers[0].type && this.raise(importNode.start, "A type-only import can specify a default import or named bindings, but not both."), 
    importNode;
  }
  parseExport(node) {
    if (this.match(types._import)) return this.expect(types._import), this.tsParseImportEqualsDeclaration(node, !0);
    if (this.eat(types.eq)) {
      const assign = node;
      return assign.expression = this.parseExpression(), this.semicolon(), this.finishNode(assign, "TSExportAssignment");
    }
    if (this.eatContextual("as")) {
      const decl = node;
      return this.expectContextual("namespace"), decl.id = this.parseIdentifier(), this.semicolon(), 
      this.finishNode(decl, "TSNamespaceExportDeclaration");
    }
    return this.isContextual("type") && this.lookahead().type === types.braceL ? (this.next(), 
    node.exportKind = "type") : node.exportKind = "value", super.parseExport(node);
  }
  isAbstractClass() {
    return this.isContextual("abstract") && this.lookahead().type === types._class;
  }
  parseExportDefaultExpression() {
    if (this.isAbstractClass()) {
      const cls = this.startNode();
      return this.next(), this.parseClass(cls, !0, !0), cls.abstract = !0, cls;
    }
    if ("interface" === this.state.value) {
      const result = this.tsParseDeclaration(this.startNode(), this.state.value, !0);
      if (result) return result;
    }
    return super.parseExportDefaultExpression();
  }
  parseStatementContent(context, topLevel) {
    if (this.state.type === types._const) {
      const ahead = this.lookahead();
      if (ahead.type === types.name && "enum" === ahead.value) {
        const node = this.startNode();
        return this.expect(types._const), this.expectContextual("enum"), this.tsParseEnumDeclaration(node, !0);
      }
    }
    return super.parseStatementContent(context, topLevel);
  }
  parseAccessModifier() {
    return this.tsParseModifier([ "public", "protected", "private" ]);
  }
  parseClassMember(classBody, member, state, constructorAllowsSuper) {
    this.tsParseModifiers(member, [ "declare" ]);
    const accessibility = this.parseAccessModifier();
    accessibility && (member.accessibility = accessibility), this.tsParseModifiers(member, [ "declare" ]), 
    super.parseClassMember(classBody, member, state, constructorAllowsSuper);
  }
  parseClassMemberWithIsStatic(classBody, member, state, isStatic, constructorAllowsSuper) {
    this.tsParseModifiers(member, [ "abstract", "readonly", "declare" ]);
    const idx = this.tsTryParseIndexSignature(member);
    if (idx) return classBody.body.push(idx), member.abstract && this.raise(member.start, TSErrors.IndexSignatureHasAbstract), 
    isStatic && this.raise(member.start, TSErrors.IndexSignatureHasStatic), void (member.accessibility && this.raise(member.start, TSErrors.IndexSignatureHasAccessibility, member.accessibility));
    super.parseClassMemberWithIsStatic(classBody, member, state, isStatic, constructorAllowsSuper);
  }
  parsePostMemberNameModifiers(methodOrProp) {
    this.eat(types.question) && (methodOrProp.optional = !0), methodOrProp.readonly && this.match(types.parenL) && this.raise(methodOrProp.start, TSErrors.ClassMethodHasReadonly), 
    methodOrProp.declare && this.match(types.parenL) && this.raise(methodOrProp.start, TSErrors.ClassMethodHasDeclare);
  }
  parseExpressionStatement(node, expr) {
    return ("Identifier" === expr.type ? this.tsParseExpressionStatement(node, expr) : void 0) || super.parseExpressionStatement(node, expr);
  }
  shouldParseExportDeclaration() {
    return !!this.tsIsDeclarationStart() || super.shouldParseExportDeclaration();
  }
  parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos) {
    if (!refNeedsArrowPos || !this.match(types.question)) return super.parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos);
    const result = this.tryParse(() => super.parseConditional(expr, noIn, startPos, startLoc));
    return result.node ? (result.error && (this.state = result.failState), result.node) : (refNeedsArrowPos.start = result.error.pos || this.state.start, 
    expr);
  }
  parseParenItem(node, startPos, startLoc) {
    if (node = super.parseParenItem(node, startPos, startLoc), this.eat(types.question) && (node.optional = !0, 
    this.resetEndLocation(node)), this.match(types.colon)) {
      const typeCastNode = this.startNodeAt(startPos, startLoc);
      return typeCastNode.expression = node, typeCastNode.typeAnnotation = this.tsParseTypeAnnotation(), 
      this.finishNode(typeCastNode, "TSTypeCastExpression");
    }
    return node;
  }
  parseExportDeclaration(node) {
    const startPos = this.state.start, startLoc = this.state.startLoc, isDeclare = this.eatContextual("declare");
    let declaration;
    return this.match(types.name) && (declaration = this.tsTryParseExportDeclaration()), 
    declaration || (declaration = super.parseExportDeclaration(node)), declaration && ("TSInterfaceDeclaration" === declaration.type || "TSTypeAliasDeclaration" === declaration.type || isDeclare) && (node.exportKind = "type"), 
    declaration && isDeclare && (this.resetStartLocation(declaration, startPos, startLoc), 
    declaration.declare = !0), declaration;
  }
  parseClassId(node, isStatement, optionalId) {
    if ((!isStatement || optionalId) && this.isContextual("implements")) return;
    super.parseClassId(node, isStatement, optionalId, node.declare ? 1024 : 139);
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (node.typeParameters = typeParameters);
  }
  parseClassPropertyAnnotation(node) {
    !node.optional && this.eat(types.bang) && (node.definite = !0);
    const type = this.tsTryParseTypeAnnotation();
    type && (node.typeAnnotation = type);
  }
  parseClassProperty(node) {
    return this.parseClassPropertyAnnotation(node), node.declare && this.match(types.equal) && this.raise(this.state.start, TSErrors.DeclareClassFieldHasInitializer), 
    super.parseClassProperty(node);
  }
  parseClassPrivateProperty(node) {
    return node.abstract && this.raise(node.start, TSErrors.PrivateElementHasAbstract), 
    node.accessibility && this.raise(node.start, TSErrors.PrivateElementHasAccessibility, node.accessibility), 
    this.parseClassPropertyAnnotation(node), super.parseClassPrivateProperty(node);
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (method.typeParameters = typeParameters), super.pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper);
  }
  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
    const typeParameters = this.tsTryParseTypeParameters();
    typeParameters && (method.typeParameters = typeParameters), super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
  }
  parseClassSuper(node) {
    super.parseClassSuper(node), node.superClass && this.isRelational("<") && (node.superTypeParameters = this.tsParseTypeArguments()), 
    this.eatContextual("implements") && (node.implements = this.tsParseHeritageClause("implements"));
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
    super.parseVarId(decl, kind), "Identifier" === decl.id.type && this.eat(types.bang) && (decl.definite = !0);
    const type = this.tsTryParseTypeAnnotation();
    type && (decl.id.typeAnnotation = type, this.resetEndLocation(decl.id));
  }
  parseAsyncArrowFromCallExpression(node, call) {
    return this.match(types.colon) && (node.returnType = this.tsParseTypeAnnotation()), 
    super.parseAsyncArrowFromCallExpression(node, call);
  }
  parseMaybeAssign(...args) {
    var _jsx, _jsx2, _typeCast, _jsx3, _typeCast2, _jsx4, _typeCast3;
    let state, jsx, typeCast, typeParameters;
    if (this.match(types.jsxTagStart)) {
      if (state = this.state.clone(), jsx = this.tryParse(() => super.parseMaybeAssign(...args), state), 
      !jsx.error) return jsx.node;
      const {context: context} = this.state;
      context[context.length - 1] === types$1.j_oTag ? context.length -= 2 : context[context.length - 1] === types$1.j_expr && (context.length -= 1);
    }
    if (!(null == (_jsx = jsx) ? void 0 : _jsx.error) && !this.isRelational("<")) return super.parseMaybeAssign(...args);
    state = state || this.state.clone();
    const arrow = this.tryParse(abort => {
      var _typeParameters;
      typeParameters = this.tsParseTypeParameters();
      const expr = super.parseMaybeAssign(...args);
      return ("ArrowFunctionExpression" !== expr.type || expr.extra && expr.extra.parenthesized) && abort(), 
      0 !== (null == (_typeParameters = typeParameters) ? void 0 : _typeParameters.params.length) && this.resetStartLocationFromNode(expr, typeParameters), 
      expr.typeParameters = typeParameters, expr;
    }, state);
    if (!arrow.error && !arrow.aborted) return arrow.node;
    if (!jsx && (assert(!this.hasPlugin("jsx")), typeCast = this.tryParse(() => super.parseMaybeAssign(...args), state), 
    !typeCast.error)) return typeCast.node;
    if (null == (_jsx2 = jsx) ? void 0 : _jsx2.node) return this.state = jsx.failState, 
    jsx.node;
    if (arrow.node) return this.state = arrow.failState, arrow.node;
    if (null == (_typeCast = typeCast) ? void 0 : _typeCast.node) return this.state = typeCast.failState, 
    typeCast.node;
    if (null == (_jsx3 = jsx) ? void 0 : _jsx3.thrown) throw jsx.error;
    if (arrow.thrown) throw arrow.error;
    if (null == (_typeCast2 = typeCast) ? void 0 : _typeCast2.thrown) throw typeCast.error;
    throw (null == (_jsx4 = jsx) ? void 0 : _jsx4.error) || arrow.error || (null == (_typeCast3 = typeCast) ? void 0 : _typeCast3.error);
  }
  parseMaybeUnary(refExpressionErrors) {
    return !this.hasPlugin("jsx") && this.isRelational("<") ? this.tsParseTypeAssertion() : super.parseMaybeUnary(refExpressionErrors);
  }
  parseArrow(node) {
    if (this.match(types.colon)) {
      const result = this.tryParse(abort => {
        const returnType = this.tsParseTypeOrTypePredicateAnnotation(types.colon);
        return !this.canInsertSemicolon() && this.match(types.arrow) || abort(), returnType;
      });
      if (result.aborted) return;
      result.thrown || (result.error && (this.state = result.failState), node.returnType = result.node);
    }
    return super.parseArrow(node);
  }
  parseAssignableListItemTypes(param) {
    this.eat(types.question) && ("Identifier" !== param.type && this.raise(param.start, TSErrors.PatternIsOptional), 
    param.optional = !0);
    const type = this.tsTryParseTypeAnnotation();
    return type && (param.typeAnnotation = type), this.resetEndLocation(param), param;
  }
  toAssignable(node) {
    switch (node.type) {
     case "TSTypeCastExpression":
      return super.toAssignable(this.typeCastToParameter(node));

     case "TSParameterProperty":
      return super.toAssignable(node);

     case "TSAsExpression":
     case "TSNonNullExpression":
     case "TSTypeAssertion":
      return node.expression = this.toAssignable(node.expression), node;

     default:
      return super.toAssignable(node);
    }
  }
  checkLVal(expr, bindingType = 64, checkClashes, contextDescription) {
    switch (expr.type) {
     case "TSTypeCastExpression":
      return;

     case "TSParameterProperty":
      return void this.checkLVal(expr.parameter, bindingType, checkClashes, "parameter property");

     case "TSAsExpression":
     case "TSNonNullExpression":
     case "TSTypeAssertion":
      return void this.checkLVal(expr.expression, bindingType, checkClashes, contextDescription);

     default:
      return void super.checkLVal(expr, bindingType, checkClashes, contextDescription);
    }
  }
  parseBindingAtom() {
    switch (this.state.type) {
     case types._this:
      return this.parseIdentifier(!0);

     default:
      return super.parseBindingAtom();
    }
  }
  parseMaybeDecoratorArguments(expr) {
    if (this.isRelational("<")) {
      const typeArguments = this.tsParseTypeArguments();
      if (this.match(types.parenL)) {
        const call = super.parseMaybeDecoratorArguments(expr);
        return call.typeParameters = typeArguments, call;
      }
      this.unexpected(this.state.start, types.parenL);
    }
    return super.parseMaybeDecoratorArguments(expr);
  }
  isClassMethod() {
    return this.isRelational("<") || super.isClassMethod();
  }
  isClassProperty() {
    return this.match(types.bang) || this.match(types.colon) || super.isClassProperty();
  }
  parseMaybeDefault(...args) {
    const node = super.parseMaybeDefault(...args);
    return "AssignmentPattern" === node.type && node.typeAnnotation && node.right.start < node.typeAnnotation.start && this.raise(node.typeAnnotation.start, TSErrors.TypeAnnotationAfterAssign), 
    node;
  }
  getTokenFromCode(code) {
    return !this.state.inType || 62 !== code && 60 !== code ? super.getTokenFromCode(code) : this.finishOp(types.relational, 1);
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
        this.state.maybeInArrowParameters ? this.raise(expr.start, TSErrors.UnexpectedTypeCastInParameter) : exprList[i] = this.typeCastToParameter(expr);
      }
    }
    return super.toAssignableList(...arguments);
  }
  typeCastToParameter(node) {
    return node.expression.typeAnnotation = node.typeAnnotation, this.resetEndLocation(node.expression, node.typeAnnotation.end, node.typeAnnotation.loc.end), 
    node.expression;
  }
  toReferencedList(exprList, isInParens) {
    for (let i = 0; i < exprList.length; i++) {
      const expr = exprList[i];
      "TSTypeCastExpression" === (null == expr ? void 0 : expr.type) && this.raise(expr.start, TSErrors.UnexpectedTypeAnnotation);
    }
    return exprList;
  }
  shouldParseArrow() {
    return this.match(types.colon) || super.shouldParseArrow();
  }
  shouldParseAsyncArrow() {
    return this.match(types.colon) || super.shouldParseAsyncArrow();
  }
  canHaveLeadingDecorator() {
    return super.canHaveLeadingDecorator() || this.isAbstractClass();
  }
  jsxParseOpeningElementAfterName(node) {
    if (this.isRelational("<")) {
      const typeArguments = this.tsTryParseAndCatch(() => this.tsParseTypeArguments());
      typeArguments && (node.typeParameters = typeArguments);
    }
    return super.jsxParseOpeningElementAfterName(node);
  }
  getGetterSetterExpectedParamCount(method) {
    const baseCount = super.getGetterSetterExpectedParamCount(method), firstParam = method.params[0];
    return firstParam && "Identifier" === firstParam.type && "this" === firstParam.name ? baseCount + 1 : baseCount;
  }
};

types.placeholder = new TokenType("%%", {
  startsExpr: !0
});

var placeholders = superClass => class extends superClass {
  parsePlaceholder(expectedNode) {
    if (this.match(types.placeholder)) {
      const node = this.startNode();
      return this.next(), this.assertNoSpace("Unexpected space in placeholder."), node.name = super.parseIdentifier(!0), 
      this.assertNoSpace("Unexpected space in placeholder."), this.expect(types.placeholder), 
      this.finishPlaceholder(node, expectedNode);
    }
  }
  finishPlaceholder(node, expectedNode) {
    const isFinished = !(!node.expectedNode || "Placeholder" !== node.type);
    return node.expectedNode = expectedNode, isFinished ? node : this.finishNode(node, "Placeholder");
  }
  getTokenFromCode(code) {
    return 37 === code && 37 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(types.placeholder, 2) : super.getTokenFromCode(...arguments);
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
  checkLVal(expr) {
    "Placeholder" !== expr.type && super.checkLVal(...arguments);
  }
  toAssignable(node) {
    return node && "Placeholder" === node.type && "Expression" === node.expectedNode ? (node.expectedNode = "Pattern", 
    node) : super.toAssignable(...arguments);
  }
  verifyBreakContinue(node) {
    node.label && "Placeholder" === node.label.type || super.verifyBreakContinue(...arguments);
  }
  parseExpressionStatement(node, expr) {
    if ("Placeholder" !== expr.type || expr.extra && expr.extra.parenthesized) return super.parseExpressionStatement(...arguments);
    if (this.match(types.colon)) {
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
    const placeholder = this.parsePlaceholder("Identifier");
    if (placeholder) if (this.match(types._extends) || this.match(types.placeholder) || this.match(types.braceL)) node.id = placeholder; else {
      if (optionalId || !isStatement) return node.id = null, node.body = this.finishPlaceholder(placeholder, "ClassBody"), 
      this.finishNode(node, type);
      this.unexpected(null, "A class name is required");
    } else this.parseClassId(node, isStatement, optionalId);
    return this.parseClassSuper(node), node.body = this.parsePlaceholder("ClassBody") || this.parseClassBody(!!node.superClass), 
    this.finishNode(node, type);
  }
  parseExport(node) {
    const placeholder = this.parsePlaceholder("Identifier");
    if (!placeholder) return super.parseExport(...arguments);
    if (!this.isContextual("from") && !this.match(types.comma)) return node.specifiers = [], 
    node.source = null, node.declaration = this.finishPlaceholder(placeholder, "Declaration"), 
    this.finishNode(node, "ExportNamedDeclaration");
    this.expectPlugin("exportDefaultFrom");
    const specifier = this.startNode();
    return specifier.exported = placeholder, node.specifiers = [ this.finishNode(specifier, "ExportDefaultSpecifier") ], 
    super.parseExport(node);
  }
  isExportDefaultSpecifier() {
    if (this.match(types._default)) {
      const next = this.nextTokenStart();
      if (this.isUnparsedContextual(next, "from") && this.input.startsWith(types.placeholder.label, this.nextTokenStartSince(next + 4))) return !0;
    }
    return super.isExportDefaultSpecifier();
  }
  maybeParseExportDefaultSpecifier(node) {
    return !!(node.specifiers && node.specifiers.length > 0) || super.maybeParseExportDefaultSpecifier(...arguments);
  }
  checkExport(node) {
    const {specifiers: specifiers} = node;
    (null == specifiers ? void 0 : specifiers.length) && (node.specifiers = specifiers.filter(node => "Placeholder" === node.exported.type)), 
    super.checkExport(node), node.specifiers = specifiers;
  }
  parseImport(node) {
    const placeholder = this.parsePlaceholder("Identifier");
    if (!placeholder) return super.parseImport(...arguments);
    if (node.specifiers = [], !this.isContextual("from") && !this.match(types.comma)) return node.source = this.finishPlaceholder(placeholder, "StringLiteral"), 
    this.semicolon(), this.finishNode(node, "ImportDeclaration");
    const specifier = this.startNodeAtNode(placeholder);
    if (specifier.local = placeholder, this.finishNode(specifier, "ImportDefaultSpecifier"), 
    node.specifiers.push(specifier), this.eat(types.comma)) {
      this.maybeParseStarImportSpecifier(node) || this.parseNamedImportSpecifiers(node);
    }
    return this.expectContextual("from"), node.source = this.parseImportSource(), this.semicolon(), 
    this.finishNode(node, "ImportDeclaration");
  }
  parseImportSource() {
    return this.parsePlaceholder("StringLiteral") || super.parseImportSource(...arguments);
  }
}, v8intrinsic = superClass => class extends superClass {
  parseV8Intrinsic() {
    if (this.match(types.modulo)) {
      const v8IntrinsicStart = this.state.start, node = this.startNode();
      if (this.eat(types.modulo), this.match(types.name)) {
        const name = this.parseIdentifierName(this.state.start), identifier = this.createIdentifier(node, name);
        if (identifier.type = "V8IntrinsicIdentifier", this.match(types.parenL)) return identifier;
      }
      this.unexpected(v8IntrinsicStart);
    }
  }
  parseExprAtom() {
    return this.parseV8Intrinsic() || super.parseExprAtom(...arguments);
  }
};

function hasPlugin(plugins, name) {
  return plugins.some(plugin => Array.isArray(plugin) ? plugin[0] === name : plugin === name);
}

function getPluginOption(plugins, name, option) {
  const plugin = plugins.find(plugin => Array.isArray(plugin) ? plugin[0] === name : plugin === name);
  return plugin && Array.isArray(plugin) ? plugin[1][option] : null;
}

const PIPELINE_PROPOSALS = [ "minimal", "smart", "fsharp" ], RECORD_AND_TUPLE_SYNTAX_TYPES = [ "hash", "bar" ];

function validatePlugins(plugins) {
  if (hasPlugin(plugins, "decorators")) {
    if (hasPlugin(plugins, "decorators-legacy")) throw new Error("Cannot use the decorators and decorators-legacy plugin together");
    const decoratorsBeforeExport = getPluginOption(plugins, "decorators", "decoratorsBeforeExport");
    if (null == decoratorsBeforeExport) throw new Error("The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.");
    if ("boolean" != typeof decoratorsBeforeExport) throw new Error("'decoratorsBeforeExport' must be a boolean.");
  }
  if (hasPlugin(plugins, "flow") && hasPlugin(plugins, "typescript")) throw new Error("Cannot combine flow and typescript plugins.");
  if (hasPlugin(plugins, "placeholders") && hasPlugin(plugins, "v8intrinsic")) throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
  if (hasPlugin(plugins, "pipelineOperator") && !PIPELINE_PROPOSALS.includes(getPluginOption(plugins, "pipelineOperator", "proposal"))) throw new Error("'pipelineOperator' requires 'proposal' option whose value should be one of: " + PIPELINE_PROPOSALS.map(p => `'${p}'`).join(", "));
  if (hasPlugin(plugins, "moduleAttributes")) {
    if ("may-2020" !== getPluginOption(plugins, "moduleAttributes", "version")) throw new Error("The 'moduleAttributes' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is 'may-2020'.");
  }
  if (hasPlugin(plugins, "recordAndTuple") && !RECORD_AND_TUPLE_SYNTAX_TYPES.includes(getPluginOption(plugins, "recordAndTuple", "syntaxType"))) throw new Error("'recordAndTuple' requires 'syntaxType' option whose value should be one of: " + RECORD_AND_TUPLE_SYNTAX_TYPES.map(p => `'${p}'`).join(", "));
}

const mixinPlugins = {
  estree: estree,
  jsx: jsx,
  flow: flow,
  typescript: typescript,
  v8intrinsic: v8intrinsic,
  placeholders: placeholders
}, mixinPluginNames = Object.keys(mixinPlugins), defaultOptions = {
  sourceType: "script",
  sourceFilename: void 0,
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
  errorRecovery: !1
};

function getOptions(opts) {
  const options = {};
  for (let _i = 0, _Object$keys = Object.keys(defaultOptions); _i < _Object$keys.length; _i++) {
    const key = _Object$keys[_i];
    options[key] = opts && null != opts[key] ? opts[key] : defaultOptions[key];
  }
  return options;
}

class State {
  constructor() {
    this.errors = [], this.potentialArrowAt = -1, this.noArrowAt = [], this.noArrowParamsConversionAt = [], 
    this.inParameters = !1, this.maybeInArrowParameters = !1, this.maybeInAsyncArrowHead = !1, 
    this.inPipeline = !1, this.inType = !1, this.noAnonFunctionType = !1, this.inPropertyName = !1, 
    this.hasFlowComment = !1, this.isIterator = !1, this.topicContext = {
      maxNumOfResolvableTopics: 0,
      maxTopicIndex: null
    }, this.soloAwait = !1, this.inFSharpPipelineDirectBody = !1, this.labels = [], 
    this.decoratorStack = [ [] ], this.yieldPos = -1, this.awaitPos = -1, this.comments = [], 
    this.trailingComments = [], this.leadingComments = [], this.commentStack = [], this.commentPreviousNode = null, 
    this.pos = 0, this.lineStart = 0, this.type = types.eof, this.value = null, this.start = 0, 
    this.end = 0, this.lastTokEndLoc = null, this.lastTokStartLoc = null, this.lastTokStart = 0, 
    this.lastTokEnd = 0, this.context = [ types$1.braceStatement ], this.exprAllowed = !0, 
    this.containsEsc = !1, this.octalPositions = [], this.exportedIdentifiers = [], 
    this.tokensLength = 0;
  }
  init(options) {
    this.strict = !1 !== options.strictMode && "module" === options.sourceType, this.curLine = options.startLine, 
    this.startLoc = this.endLoc = this.curPosition();
  }
  curPosition() {
    return new Position(this.curLine, this.pos - this.lineStart);
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

var _isDigit = function(code) {
  return code >= 48 && code <= 57;
};

const VALID_REGEX_FLAGS = new Set([ "g", "m", "s", "i", "y", "u" ]), forbiddenNumericSeparatorSiblings = {
  decBinOct: [ 46, 66, 69, 79, 95, 98, 101, 111 ],
  hex: [ 46, 88, 95, 120 ]
}, allowedNumericSeparatorSiblings = {
  bin: [ 48, 49 ]
};

allowedNumericSeparatorSiblings.oct = [ ...allowedNumericSeparatorSiblings.bin, 50, 51, 52, 53, 54, 55 ], 
allowedNumericSeparatorSiblings.dec = [ ...allowedNumericSeparatorSiblings.oct, 56, 57 ], 
allowedNumericSeparatorSiblings.hex = [ ...allowedNumericSeparatorSiblings.dec, 65, 66, 67, 68, 69, 70, 97, 98, 99, 100, 101, 102 ];

class Token {
  constructor(state) {
    this.type = state.type, this.value = state.value, this.start = state.start, this.end = state.end, 
    this.loc = new SourceLocation(state.startLoc, state.endLoc);
  }
}

class Tokenizer extends ParserError {
  constructor(options, input) {
    super(), this.tokens = [], this.state = new State, this.state.init(options), this.input = input, 
    this.length = input.length, this.isLookahead = !1;
  }
  pushToken(token) {
    this.tokens.length = this.state.tokensLength, this.tokens.push(token), ++this.state.tokensLength;
  }
  next() {
    this.isLookahead || (this.checkKeywordEscapes(), this.options.tokens && this.pushToken(new Token(this.state))), 
    this.state.lastTokEnd = this.state.end, this.state.lastTokStart = this.state.start, 
    this.state.lastTokEndLoc = this.state.endLoc, this.state.lastTokStartLoc = this.state.startLoc, 
    this.nextToken();
  }
  eat(type) {
    return !!this.match(type) && (this.next(), !0);
  }
  match(type) {
    return this.state.type === type;
  }
  lookahead() {
    const old = this.state;
    this.state = old.clone(!0), this.isLookahead = !0, this.next(), this.isLookahead = !1;
    const curr = this.state;
    return this.state = old, curr;
  }
  nextTokenStart() {
    return this.nextTokenStartSince(this.state.pos);
  }
  nextTokenStartSince(pos) {
    skipWhiteSpace.lastIndex = pos;
    return pos + skipWhiteSpace.exec(this.input)[0].length;
  }
  lookaheadCharCode() {
    return this.input.charCodeAt(this.nextTokenStart());
  }
  setStrict(strict) {
    if (this.state.strict = strict, this.match(types.num) || this.match(types.string)) {
      for (this.state.pos = this.state.start; this.state.pos < this.state.lineStart; ) this.state.lineStart = this.input.lastIndexOf("\n", this.state.lineStart - 2) + 1, 
      --this.state.curLine;
      this.nextToken();
    }
  }
  curContext() {
    return this.state.context[this.state.context.length - 1];
  }
  nextToken() {
    const curContext = this.curContext();
    if ((null == curContext ? void 0 : curContext.preserveSpace) || this.skipSpace(), 
    this.state.octalPositions = [], this.state.start = this.state.pos, this.state.startLoc = this.state.curPosition(), 
    this.state.pos >= this.length) return void this.finishToken(types.eof);
    const override = null == curContext ? void 0 : curContext.override;
    override ? override(this) : this.getTokenFromCode(this.input.codePointAt(this.state.pos));
  }
  pushComment(block, text, start, end, startLoc, endLoc) {
    const comment = {
      type: block ? "CommentBlock" : "CommentLine",
      value: text,
      start: start,
      end: end,
      loc: new SourceLocation(startLoc, endLoc)
    };
    this.options.tokens && this.pushToken(comment), this.state.comments.push(comment), 
    this.addComment(comment);
  }
  skipBlockComment() {
    const startLoc = this.state.curPosition(), start = this.state.pos, end = this.input.indexOf("*/", this.state.pos + 2);
    if (-1 === end) throw this.raise(start, ErrorMessages.UnterminatedComment);
    let match;
    for (this.state.pos = end + 2, lineBreakG.lastIndex = start; (match = lineBreakG.exec(this.input)) && match.index < this.state.pos; ) ++this.state.curLine, 
    this.state.lineStart = match.index + match[0].length;
    this.isLookahead || this.pushComment(!0, this.input.slice(start + 2, end), start, this.state.pos, startLoc, this.state.curPosition());
  }
  skipLineComment(startSkip) {
    const start = this.state.pos, startLoc = this.state.curPosition();
    let ch = this.input.charCodeAt(this.state.pos += startSkip);
    if (this.state.pos < this.length) for (;!isNewLine(ch) && ++this.state.pos < this.length; ) ch = this.input.charCodeAt(this.state.pos);
    this.isLookahead || this.pushComment(!1, this.input.slice(start + startSkip, this.state.pos), start, this.state.pos, startLoc, this.state.curPosition());
  }
  skipSpace() {
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
          this.skipBlockComment();
          break;

         case 47:
          this.skipLineComment(2);
          break;

         default:
          break loop;
        }
        break;

       default:
        if (!isWhitespace(ch)) break loop;
        ++this.state.pos;
      }
    }
  }
  finishToken(type, val) {
    this.state.end = this.state.pos, this.state.endLoc = this.state.curPosition();
    const prevType = this.state.type;
    this.state.type = type, this.state.value = val, this.isLookahead || this.updateContext(prevType);
  }
  readToken_numberSign() {
    if (0 === this.state.pos && this.readToken_interpreter()) return;
    const nextPos = this.state.pos + 1, next = this.input.charCodeAt(nextPos);
    if (next >= 48 && next <= 57) throw this.raise(this.state.pos, ErrorMessages.UnexpectedDigitAfterHash);
    if (123 === next || 91 === next && this.hasPlugin("recordAndTuple")) {
      if (this.expectPlugin("recordAndTuple"), "hash" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(this.state.pos, 123 === next ? ErrorMessages.RecordExpressionHashIncorrectStartSyntaxType : ErrorMessages.TupleExpressionHashIncorrectStartSyntaxType);
      123 === next ? this.finishToken(types.braceHashL) : this.finishToken(types.bracketHashL), 
      this.state.pos += 2;
    } else this.finishOp(types.hash, 1);
  }
  readToken_dot() {
    const next = this.input.charCodeAt(this.state.pos + 1);
    next >= 48 && next <= 57 ? this.readNumber(!0) : 46 === next && 46 === this.input.charCodeAt(this.state.pos + 2) ? (this.state.pos += 3, 
    this.finishToken(types.ellipsis)) : (++this.state.pos, this.finishToken(types.dot));
  }
  readToken_slash() {
    if (this.state.exprAllowed && !this.state.inType) return ++this.state.pos, void this.readRegexp();
    61 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(types.assign, 2) : this.finishOp(types.slash, 1);
  }
  readToken_interpreter() {
    if (0 !== this.state.pos || this.length < 2) return !1;
    let ch = this.input.charCodeAt(this.state.pos + 1);
    if (33 !== ch) return !1;
    const start = this.state.pos;
    for (this.state.pos += 1; !isNewLine(ch) && ++this.state.pos < this.length; ) ch = this.input.charCodeAt(this.state.pos);
    const value = this.input.slice(start + 2, this.state.pos);
    return this.finishToken(types.interpreterDirective, value), !0;
  }
  readToken_mult_modulo(code) {
    let type = 42 === code ? types.star : types.modulo, width = 1, next = this.input.charCodeAt(this.state.pos + 1);
    const exprAllowed = this.state.exprAllowed;
    42 === code && 42 === next && (width++, next = this.input.charCodeAt(this.state.pos + 2), 
    type = types.exponent), 61 !== next || exprAllowed || (width++, type = types.assign), 
    this.finishOp(type, width);
  }
  readToken_pipe_amp(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (next !== code) {
      if (124 === code) {
        if (62 === next) return void this.finishOp(types.pipeline, 2);
        if (this.hasPlugin("recordAndTuple") && 125 === next) {
          if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(this.state.pos, ErrorMessages.RecordExpressionBarIncorrectEndSyntaxType);
          return void this.finishOp(types.braceBarR, 2);
        }
        if (this.hasPlugin("recordAndTuple") && 93 === next) {
          if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(this.state.pos, ErrorMessages.TupleExpressionBarIncorrectEndSyntaxType);
          return void this.finishOp(types.bracketBarR, 2);
        }
      }
      61 !== next ? this.finishOp(124 === code ? types.bitwiseOR : types.bitwiseAND, 1) : this.finishOp(types.assign, 2);
    } else 61 === this.input.charCodeAt(this.state.pos + 2) ? this.finishOp(types.assign, 3) : this.finishOp(124 === code ? types.logicalOR : types.logicalAND, 2);
  }
  readToken_caret() {
    61 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(types.assign, 2) : this.finishOp(types.bitwiseXOR, 1);
  }
  readToken_plus_min(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (next === code) return 45 !== next || this.inModule || 62 !== this.input.charCodeAt(this.state.pos + 2) || 0 !== this.state.lastTokEnd && !lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.pos)) ? void this.finishOp(types.incDec, 2) : (this.skipLineComment(3), 
    this.skipSpace(), void this.nextToken());
    61 === next ? this.finishOp(types.assign, 2) : this.finishOp(types.plusMin, 1);
  }
  readToken_lt_gt(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    let size = 1;
    return next === code ? (size = 62 === code && 62 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2, 
    61 === this.input.charCodeAt(this.state.pos + size) ? void this.finishOp(types.assign, size + 1) : void this.finishOp(types.bitShift, size)) : 33 !== next || 60 !== code || this.inModule || 45 !== this.input.charCodeAt(this.state.pos + 2) || 45 !== this.input.charCodeAt(this.state.pos + 3) ? (61 === next && (size = 2), 
    void this.finishOp(types.relational, size)) : (this.skipLineComment(4), this.skipSpace(), 
    void this.nextToken());
  }
  readToken_eq_excl(code) {
    const next = this.input.charCodeAt(this.state.pos + 1);
    if (61 !== next) return 61 === code && 62 === next ? (this.state.pos += 2, void this.finishToken(types.arrow)) : void this.finishOp(61 === code ? types.eq : types.bang, 1);
    this.finishOp(types.equality, 61 === this.input.charCodeAt(this.state.pos + 2) ? 3 : 2);
  }
  readToken_question() {
    const next = this.input.charCodeAt(this.state.pos + 1), next2 = this.input.charCodeAt(this.state.pos + 2);
    63 !== next || this.state.inType ? 46 !== next || next2 >= 48 && next2 <= 57 ? (++this.state.pos, 
    this.finishToken(types.question)) : (this.state.pos += 2, this.finishToken(types.questionDot)) : 61 === next2 ? this.finishOp(types.assign, 3) : this.finishOp(types.nullishCoalescing, 2);
  }
  getTokenFromCode(code) {
    switch (code) {
     case 46:
      return void this.readToken_dot();

     case 40:
      return ++this.state.pos, void this.finishToken(types.parenL);

     case 41:
      return ++this.state.pos, void this.finishToken(types.parenR);

     case 59:
      return ++this.state.pos, void this.finishToken(types.semi);

     case 44:
      return ++this.state.pos, void this.finishToken(types.comma);

     case 91:
      if (this.hasPlugin("recordAndTuple") && 124 === this.input.charCodeAt(this.state.pos + 1)) {
        if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(this.state.pos, ErrorMessages.TupleExpressionBarIncorrectStartSyntaxType);
        this.finishToken(types.bracketBarL), this.state.pos += 2;
      } else ++this.state.pos, this.finishToken(types.bracketL);
      return;

     case 93:
      return ++this.state.pos, void this.finishToken(types.bracketR);

     case 123:
      if (this.hasPlugin("recordAndTuple") && 124 === this.input.charCodeAt(this.state.pos + 1)) {
        if ("bar" !== this.getPluginOption("recordAndTuple", "syntaxType")) throw this.raise(this.state.pos, ErrorMessages.RecordExpressionBarIncorrectStartSyntaxType);
        this.finishToken(types.braceBarL), this.state.pos += 2;
      } else ++this.state.pos, this.finishToken(types.braceL);
      return;

     case 125:
      return ++this.state.pos, void this.finishToken(types.braceR);

     case 58:
      return void (this.hasPlugin("functionBind") && 58 === this.input.charCodeAt(this.state.pos + 1) ? this.finishOp(types.doubleColon, 2) : (++this.state.pos, 
      this.finishToken(types.colon)));

     case 63:
      return void this.readToken_question();

     case 96:
      return ++this.state.pos, void this.finishToken(types.backQuote);

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
     case 62:
      return void this.readToken_lt_gt(code);

     case 61:
     case 33:
      return void this.readToken_eq_excl(code);

     case 126:
      return void this.finishOp(types.tilde, 1);

     case 64:
      return ++this.state.pos, void this.finishToken(types.at);

     case 35:
      return void this.readToken_numberSign();

     case 92:
      return void this.readWord();

     default:
      if (isIdentifierStart(code)) return void this.readWord();
    }
    throw this.raise(this.state.pos, ErrorMessages.InvalidOrUnexpectedToken, String.fromCodePoint(code));
  }
  finishOp(type, size) {
    const str = this.input.slice(this.state.pos, this.state.pos + size);
    this.state.pos += size, this.finishToken(type, str);
  }
  readRegexp() {
    const start = this.state.pos;
    let escaped, inClass;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(start, ErrorMessages.UnterminatedRegExp);
      const ch = this.input.charAt(this.state.pos);
      if (lineBreak.test(ch)) throw this.raise(start, ErrorMessages.UnterminatedRegExp);
      if (escaped) escaped = !1; else {
        if ("[" === ch) inClass = !0; else if ("]" === ch && inClass) inClass = !1; else if ("/" === ch && !inClass) break;
        escaped = "\\" === ch;
      }
      ++this.state.pos;
    }
    const content = this.input.slice(start, this.state.pos);
    ++this.state.pos;
    let mods = "";
    for (;this.state.pos < this.length; ) {
      const char = this.input[this.state.pos], charCode = this.input.codePointAt(this.state.pos);
      if (VALID_REGEX_FLAGS.has(char)) mods.indexOf(char) > -1 && this.raise(this.state.pos + 1, ErrorMessages.DuplicateRegExpFlags); else {
        if (!isIdentifierChar(charCode) && 92 !== charCode) break;
        this.raise(this.state.pos + 1, ErrorMessages.MalformedRegExpFlags);
      }
      ++this.state.pos, mods += char;
    }
    this.finishToken(types.regexp, {
      pattern: content,
      flags: mods
    });
  }
  readInt(radix, len, forceLen, allowNumSeparator = !0) {
    const start = this.state.pos, forbiddenSiblings = 16 === radix ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct, allowedSiblings = 16 === radix ? allowedNumericSeparatorSiblings.hex : 10 === radix ? allowedNumericSeparatorSiblings.dec : 8 === radix ? allowedNumericSeparatorSiblings.oct : allowedNumericSeparatorSiblings.bin;
    let invalid = !1, total = 0;
    for (let i = 0, e = null == len ? 1 / 0 : len; i < e; ++i) {
      const code = this.input.charCodeAt(this.state.pos);
      let val;
      if (this.hasPlugin("numericSeparator") && 95 === code) {
        const prev = this.input.charCodeAt(this.state.pos - 1), next = this.input.charCodeAt(this.state.pos + 1);
        (-1 === allowedSiblings.indexOf(next) || forbiddenSiblings.indexOf(prev) > -1 || forbiddenSiblings.indexOf(next) > -1 || Number.isNaN(next)) && this.raise(this.state.pos, ErrorMessages.UnexpectedNumericSeparator), 
        allowNumSeparator || this.raise(this.state.pos, ErrorMessages.NumericSeparatorInEscapeSequence), 
        ++this.state.pos;
      } else {
        if (val = code >= 97 ? code - 97 + 10 : code >= 65 ? code - 65 + 10 : _isDigit(code) ? code - 48 : 1 / 0, 
        val >= radix) if (this.options.errorRecovery && val <= 9) val = 0, this.raise(this.state.start + i + 2, ErrorMessages.InvalidDigit, radix); else {
          if (!forceLen) break;
          val = 0, invalid = !0;
        }
        ++this.state.pos, total = total * radix + val;
      }
    }
    return this.state.pos === start || null != len && this.state.pos - start !== len || invalid ? null : total;
  }
  readRadixNumber(radix) {
    const start = this.state.pos;
    let isBigInt = !1;
    this.state.pos += 2;
    const val = this.readInt(radix);
    null == val && this.raise(this.state.start + 2, ErrorMessages.InvalidDigit, radix);
    const next = this.input.charCodeAt(this.state.pos);
    if (95 === next && this.expectPlugin("numericSeparator", this.state.pos), 110 === next && (++this.state.pos, 
    isBigInt = !0), isIdentifierStart(this.input.codePointAt(this.state.pos))) throw this.raise(this.state.pos, ErrorMessages.NumberIdentifier);
    if (isBigInt) {
      const str = this.input.slice(start, this.state.pos).replace(/[_n]/g, "");
      this.finishToken(types.bigint, str);
    } else this.finishToken(types.num, val);
  }
  readNumber(startsWithDot) {
    const start = this.state.pos;
    let isFloat = !1, isBigInt = !1, isNonOctalDecimalInt = !1;
    startsWithDot || null !== this.readInt(10) || this.raise(start, ErrorMessages.InvalidNumber);
    let octal = this.state.pos - start >= 2 && 48 === this.input.charCodeAt(start);
    octal && (this.state.strict && this.raise(start, ErrorMessages.StrictOctalLiteral), 
    /[89]/.test(this.input.slice(start, this.state.pos)) && (octal = !1, isNonOctalDecimalInt = !0));
    let next = this.input.charCodeAt(this.state.pos);
    if (46 !== next || octal || (++this.state.pos, this.readInt(10), isFloat = !0, next = this.input.charCodeAt(this.state.pos)), 
    69 !== next && 101 !== next || octal || (next = this.input.charCodeAt(++this.state.pos), 
    43 !== next && 45 !== next || ++this.state.pos, null === this.readInt(10) && this.raise(start, ErrorMessages.InvalidNumber), 
    isFloat = !0, next = this.input.charCodeAt(this.state.pos)), this.hasPlugin("numericSeparator") && (octal || isNonOctalDecimalInt)) {
      const underscorePos = this.input.slice(start, this.state.pos).indexOf("_");
      underscorePos > 0 && this.raise(underscorePos + start, ErrorMessages.ZeroDigitNumericSeparator);
    }
    if (95 === next && this.expectPlugin("numericSeparator", this.state.pos), 110 === next && ((isFloat || octal || isNonOctalDecimalInt) && this.raise(start, ErrorMessages.InvalidBigIntLiteral), 
    ++this.state.pos, isBigInt = !0), isIdentifierStart(this.input.codePointAt(this.state.pos))) throw this.raise(this.state.pos, ErrorMessages.NumberIdentifier);
    const str = this.input.slice(start, this.state.pos).replace(/[_n]/g, "");
    if (isBigInt) return void this.finishToken(types.bigint, str);
    const val = octal ? parseInt(str, 8) : parseFloat(str);
    this.finishToken(types.num, val);
  }
  readCodePoint(throwOnInvalid) {
    let code;
    if (123 === this.input.charCodeAt(this.state.pos)) {
      const codePos = ++this.state.pos;
      if (code = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, !0, throwOnInvalid), 
      ++this.state.pos, null !== code && code > 1114111) {
        if (!throwOnInvalid) return null;
        this.raise(codePos, ErrorMessages.InvalidCodePoint);
      }
    } else code = this.readHexChar(4, !1, throwOnInvalid);
    return code;
  }
  readString(quote) {
    let out = "", chunkStart = ++this.state.pos;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(this.state.start, ErrorMessages.UnterminatedString);
      const ch = this.input.charCodeAt(this.state.pos);
      if (ch === quote) break;
      if (92 === ch) out += this.input.slice(chunkStart, this.state.pos), out += this.readEscapedChar(!1), 
      chunkStart = this.state.pos; else if (8232 === ch || 8233 === ch) ++this.state.pos, 
      ++this.state.curLine, this.state.lineStart = this.state.pos; else {
        if (isNewLine(ch)) throw this.raise(this.state.start, ErrorMessages.UnterminatedString);
        ++this.state.pos;
      }
    }
    out += this.input.slice(chunkStart, this.state.pos++), this.finishToken(types.string, out);
  }
  readTmplToken() {
    let out = "", chunkStart = this.state.pos, containsInvalid = !1;
    for (;;) {
      if (this.state.pos >= this.length) throw this.raise(this.state.start, ErrorMessages.UnterminatedTemplate);
      const ch = this.input.charCodeAt(this.state.pos);
      if (96 === ch || 36 === ch && 123 === this.input.charCodeAt(this.state.pos + 1)) return this.state.pos === this.state.start && this.match(types.template) ? 36 === ch ? (this.state.pos += 2, 
      void this.finishToken(types.dollarBraceL)) : (++this.state.pos, void this.finishToken(types.backQuote)) : (out += this.input.slice(chunkStart, this.state.pos), 
      void this.finishToken(types.template, containsInvalid ? null : out));
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

     default:
      if (ch >= 48 && ch <= 55) {
        const codePos = this.state.pos - 1;
        let octalStr = this.input.substr(this.state.pos - 1, 3).match(/^[0-7]+/)[0], octal = parseInt(octalStr, 8);
        octal > 255 && (octalStr = octalStr.slice(0, -1), octal = parseInt(octalStr, 8)), 
        this.state.pos += octalStr.length - 1;
        const next = this.input.charCodeAt(this.state.pos);
        if ("0" !== octalStr || 56 === next || 57 === next) {
          if (inTemplate) return null;
          this.state.strict ? this.raise(codePos, ErrorMessages.StrictOctalLiteral) : this.state.octalPositions.push(codePos);
        }
        return String.fromCharCode(octal);
      }
      return String.fromCharCode(ch);
    }
  }
  readHexChar(len, forceLen, throwOnInvalid) {
    const codePos = this.state.pos, n = this.readInt(16, len, forceLen, !1);
    return null === n && (throwOnInvalid ? this.raise(codePos, ErrorMessages.InvalidEscapeSequence) : this.state.pos = codePos - 1), 
    n;
  }
  readWord1() {
    let word = "";
    this.state.containsEsc = !1;
    const start = this.state.pos;
    let chunkStart = this.state.pos;
    for (;this.state.pos < this.length; ) {
      const ch = this.input.codePointAt(this.state.pos);
      if (isIdentifierChar(ch)) this.state.pos += ch <= 65535 ? 1 : 2; else if (this.state.isIterator && 64 === ch) ++this.state.pos; else {
        if (92 !== ch) break;
        {
          this.state.containsEsc = !0, word += this.input.slice(chunkStart, this.state.pos);
          const escStart = this.state.pos, identifierCheck = this.state.pos === start ? isIdentifierStart : isIdentifierChar;
          if (117 !== this.input.charCodeAt(++this.state.pos)) {
            this.raise(this.state.pos, ErrorMessages.MissingUnicodeEscape);
            continue;
          }
          ++this.state.pos;
          const esc = this.readCodePoint(!0);
          null !== esc && (identifierCheck(esc) || this.raise(escStart, ErrorMessages.EscapedCharNotAnIdentifier), 
          word += String.fromCodePoint(esc)), chunkStart = this.state.pos;
        }
      }
    }
    return word + this.input.slice(chunkStart, this.state.pos);
  }
  isIterator(word) {
    return "@@iterator" === word || "@@asyncIterator" === word;
  }
  readWord() {
    const word = this.readWord1(), type = keywords.get(word) || types.name;
    !this.state.isIterator || this.isIterator(word) && this.state.inType || this.raise(this.state.pos, ErrorMessages.InvalidIdentifier, word), 
    this.finishToken(type, word);
  }
  checkKeywordEscapes() {
    const kw = this.state.type.keyword;
    kw && this.state.containsEsc && this.raise(this.state.start, ErrorMessages.InvalidEscapedReservedWord, kw);
  }
  braceIsBlock(prevType) {
    const parent = this.curContext();
    return parent === types$1.functionExpression || parent === types$1.functionStatement || (prevType !== types.colon || parent !== types$1.braceStatement && parent !== types$1.braceExpression ? prevType === types._return || prevType === types.name && this.state.exprAllowed ? lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start)) : prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow || (prevType === types.braceL ? parent === types$1.braceStatement : prevType !== types._var && prevType !== types._const && prevType !== types.name && (prevType === types.relational || !this.state.exprAllowed)) : !parent.isExpr);
  }
  updateContext(prevType) {
    const type = this.state.type;
    let update;
    !type.keyword || prevType !== types.dot && prevType !== types.questionDot ? (update = type.updateContext) ? update.call(this, prevType) : this.state.exprAllowed = type.beforeExpr : this.state.exprAllowed = !1;
  }
}

class UtilParser extends Tokenizer {
  addExtra(node, key, val) {
    if (!node) return;
    (node.extra = node.extra || {})[key] = val;
  }
  isRelational(op) {
    return this.match(types.relational) && this.state.value === op;
  }
  isLookaheadRelational(op) {
    const next = this.nextTokenStart();
    if (this.input.charAt(next) === op) {
      if (next + 1 === this.input.length) return !0;
      const afterNext = this.input.charCodeAt(next + 1);
      return afterNext !== op.charCodeAt(0) && 61 !== afterNext;
    }
    return !1;
  }
  expectRelational(op) {
    this.isRelational(op) ? this.next() : this.unexpected(null, types.relational);
  }
  isContextual(name) {
    return this.match(types.name) && this.state.value === name && !this.state.containsEsc;
  }
  isUnparsedContextual(nameStart, name) {
    const nameEnd = nameStart + name.length;
    return this.input.slice(nameStart, nameEnd) === name && (nameEnd === this.input.length || !isIdentifierChar(this.input.charCodeAt(nameEnd)));
  }
  isLookaheadContextual(name) {
    const next = this.nextTokenStart();
    return this.isUnparsedContextual(next, name);
  }
  eatContextual(name) {
    return this.isContextual(name) && this.eat(types.name);
  }
  expectContextual(name, message) {
    this.eatContextual(name) || this.unexpected(null, message);
  }
  canInsertSemicolon() {
    return this.match(types.eof) || this.match(types.braceR) || this.hasPrecedingLineBreak();
  }
  hasPrecedingLineBreak() {
    return lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
  }
  isLineTerminator() {
    return this.eat(types.semi) || this.canInsertSemicolon();
  }
  semicolon() {
    this.isLineTerminator() || this.unexpected(null, types.semi);
  }
  expect(type, pos) {
    this.eat(type) || this.unexpected(pos, type);
  }
  assertNoSpace(message = "Unexpected space.") {
    this.state.start > this.state.lastTokEnd && this.raise(this.state.lastTokEnd, message);
  }
  unexpected(pos, messageOrType = "Unexpected token") {
    throw "string" != typeof messageOrType && (messageOrType = `Unexpected token, expected "${messageOrType.label}"`), 
    this.raise(null != pos ? pos : this.state.start, messageOrType);
  }
  expectPlugin(name, pos) {
    if (!this.hasPlugin(name)) throw this.raiseWithData(null != pos ? pos : this.state.start, {
      missingPlugin: [ name ]
    }, `This experimental syntax requires enabling the parser plugin: '${name}'`);
    return !0;
  }
  expectOnePlugin(names, pos) {
    if (!names.some(n => this.hasPlugin(n))) throw this.raiseWithData(null != pos ? pos : this.state.start, {
      missingPlugin: names
    }, `This experimental syntax requires enabling one of the following parser plugin(s): '${names.join(", ")}'`);
  }
  checkYieldAwaitInDefaultParams() {
    -1 !== this.state.yieldPos && (-1 === this.state.awaitPos || this.state.yieldPos < this.state.awaitPos) && this.raise(this.state.yieldPos, ErrorMessages.YieldBindingIdentifier), 
    -1 !== this.state.awaitPos && this.raise(this.state.awaitPos, ErrorMessages.AwaitBindingIdentifier);
  }
  tryParse(fn, oldState = this.state.clone()) {
    const abortSignal = {
      node: null
    };
    try {
      const node = fn((node = null) => {
        throw abortSignal.node = node, abortSignal;
      });
      if (this.state.errors.length > oldState.errors.length) {
        const failState = this.state;
        return this.state = oldState, {
          node: node,
          error: failState.errors[oldState.errors.length],
          thrown: !1,
          aborted: !1,
          failState: failState
        };
      }
      return {
        node: node,
        error: null,
        thrown: !1,
        aborted: !1,
        failState: null
      };
    } catch (error) {
      const failState = this.state;
      if (this.state = oldState, error instanceof SyntaxError) return {
        node: null,
        error: error,
        thrown: !0,
        aborted: !1,
        failState: failState
      };
      if (error === abortSignal) return {
        node: abortSignal.node,
        error: null,
        thrown: !1,
        aborted: !0,
        failState: failState
      };
      throw error;
    }
  }
  checkExpressionErrors(refExpressionErrors, andThrow) {
    if (!refExpressionErrors) return !1;
    const {shorthandAssign: shorthandAssign, doubleProto: doubleProto} = refExpressionErrors;
    if (!andThrow) return shorthandAssign >= 0 || doubleProto >= 0;
    shorthandAssign >= 0 && this.unexpected(shorthandAssign), doubleProto >= 0 && this.raise(doubleProto, ErrorMessages.DuplicateProto);
  }
  isLiteralPropertyName() {
    return this.match(types.name) || !!this.state.type.keyword || this.match(types.string) || this.match(types.num) || this.match(types.bigint);
  }
}

class ExpressionErrors {
  constructor() {
    this.shorthandAssign = -1, this.doubleProto = -1;
  }
}

class Node {
  constructor(parser, pos, loc) {
    this.type = "", this.start = pos, this.end = 0, this.loc = new SourceLocation(loc), 
    (null == parser ? void 0 : parser.options.ranges) && (this.range = [ pos, 0 ]), 
    (null == parser ? void 0 : parser.filename) && (this.loc.filename = parser.filename);
  }
  __clone() {
    const newNode = new Node, keys = Object.keys(this);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      "leadingComments" !== key && "trailingComments" !== key && "innerComments" !== key && (newNode[key] = this[key]);
    }
    return newNode;
  }
}

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
    return this.finishNodeAt(node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
  }
  finishNodeAt(node, type, pos, loc) {
    return node.type = type, node.end = pos, node.loc.end = loc, this.options.ranges && (node.range[1] = pos), 
    this.processComment(node), node;
  }
  resetStartLocation(node, start, startLoc) {
    node.start = start, node.loc.start = startLoc, this.options.ranges && (node.range[0] = start);
  }
  resetEndLocation(node, end = this.state.lastTokEnd, endLoc = this.state.lastTokEndLoc) {
    node.end = end, node.loc.end = endLoc, this.options.ranges && (node.range[1] = end);
  }
  resetStartLocationFromNode(node, locationNode) {
    this.resetStartLocation(node, locationNode.start, locationNode.loc.start);
  }
}

const unwrapParenthesizedExpression = node => "ParenthesizedExpression" === node.type ? unwrapParenthesizedExpression(node.expression) : node;

class LValParser extends NodeUtils {
  toAssignable(node) {
    var _node$extra, _node$extra3;
    let parenthesized = void 0;
    switch (("ParenthesizedExpression" === node.type || (null == (_node$extra = node.extra) ? void 0 : _node$extra.parenthesized)) && (parenthesized = unwrapParenthesizedExpression(node), 
    "Identifier" !== parenthesized.type && "MemberExpression" !== parenthesized.type && this.raise(node.start, ErrorMessages.InvalidParenthesizedAssignment)), 
    node.type) {
     case "Identifier":
     case "ObjectPattern":
     case "ArrayPattern":
     case "AssignmentPattern":
      break;

     case "ObjectExpression":
      node.type = "ObjectPattern";
      for (let i = 0, length = node.properties.length, last = length - 1; i < length; i++) {
        var _node$extra2;
        const prop = node.properties[i], isLast = i === last;
        this.toAssignableObjectExpressionProp(prop, isLast), isLast && "RestElement" === prop.type && (null == (_node$extra2 = node.extra) ? void 0 : _node$extra2.trailingComma) && this.raiseRestNotLast(node.extra.trailingComma);
      }
      break;

     case "ObjectProperty":
      this.toAssignable(node.value);
      break;

     case "SpreadElement":
      {
        this.checkToRestConversion(node), node.type = "RestElement";
        const arg = node.argument;
        this.toAssignable(arg);
        break;
      }

     case "ArrayExpression":
      node.type = "ArrayPattern", this.toAssignableList(node.elements, null == (_node$extra3 = node.extra) ? void 0 : _node$extra3.trailingComma);
      break;

     case "AssignmentExpression":
      "=" !== node.operator && this.raise(node.left.end, ErrorMessages.MissingEqInAssignment), 
      node.type = "AssignmentPattern", delete node.operator, this.toAssignable(node.left);
      break;

     case "ParenthesizedExpression":
      this.toAssignable(parenthesized);
    }
    return node;
  }
  toAssignableObjectExpressionProp(prop, isLast) {
    if ("ObjectMethod" === prop.type) {
      const error = "get" === prop.kind || "set" === prop.kind ? ErrorMessages.PatternHasAccessor : ErrorMessages.PatternHasMethod;
      this.raise(prop.key.start, error);
    } else "SpreadElement" !== prop.type || isLast ? this.toAssignable(prop) : this.raiseRestNotLast(prop.start);
  }
  toAssignableList(exprList, trailingCommaPos) {
    let end = exprList.length;
    if (end) {
      const last = exprList[end - 1];
      if ("RestElement" === (null == last ? void 0 : last.type)) --end; else if ("SpreadElement" === (null == last ? void 0 : last.type)) {
        last.type = "RestElement";
        const arg = last.argument;
        this.toAssignable(arg), "Identifier" !== arg.type && "MemberExpression" !== arg.type && "ArrayPattern" !== arg.type && "ObjectPattern" !== arg.type && this.unexpected(arg.start), 
        trailingCommaPos && this.raiseTrailingCommaAfterRest(trailingCommaPos), --end;
      }
    }
    for (let i = 0; i < end; i++) {
      const elt = exprList[i];
      elt && (this.toAssignable(elt), "RestElement" === elt.type && this.raiseRestNotLast(elt.start));
    }
    return exprList;
  }
  toReferencedList(exprList, isParenthesizedExpr) {
    return exprList;
  }
  toReferencedListDeep(exprList, isParenthesizedExpr) {
    this.toReferencedList(exprList, isParenthesizedExpr);
    for (let _i = 0; _i < exprList.length; _i++) {
      const expr = exprList[_i];
      "ArrayExpression" === (null == expr ? void 0 : expr.type) && this.toReferencedListDeep(expr.elements);
    }
  }
  parseSpread(refExpressionErrors, refNeedsArrowPos) {
    const node = this.startNode();
    return this.next(), node.argument = this.parseMaybeAssign(!1, refExpressionErrors, void 0, refNeedsArrowPos), 
    this.finishNode(node, "SpreadElement");
  }
  parseRestBinding() {
    const node = this.startNode();
    return this.next(), node.argument = this.parseBindingAtom(), this.finishNode(node, "RestElement");
  }
  parseBindingAtom() {
    switch (this.state.type) {
     case types.bracketL:
      {
        const node = this.startNode();
        return this.next(), node.elements = this.parseBindingList(types.bracketR, 93, !0), 
        this.finishNode(node, "ArrayPattern");
      }

     case types.braceL:
      return this.parseObj(types.braceR, !0);
    }
    return this.parseIdentifier();
  }
  parseBindingList(close, closeCharCode, allowEmpty, allowModifiers) {
    const elts = [];
    let first = !0;
    for (;!this.eat(close); ) if (first ? first = !1 : this.expect(types.comma), allowEmpty && this.match(types.comma)) elts.push(null); else {
      if (this.eat(close)) break;
      if (this.match(types.ellipsis)) {
        elts.push(this.parseAssignableListItemTypes(this.parseRestBinding())), this.checkCommaAfterRest(closeCharCode), 
        this.expect(close);
        break;
      }
      {
        const decorators = [];
        for (this.match(types.at) && this.hasPlugin("decorators") && this.raise(this.state.start, ErrorMessages.UnsupportedParameterDecorator); this.match(types.at); ) decorators.push(this.parseDecorator());
        elts.push(this.parseAssignableListItem(allowModifiers, decorators));
      }
    }
    return elts;
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
    if (startLoc = startLoc || this.state.startLoc, startPos = startPos || this.state.start, 
    left = left || this.parseBindingAtom(), !this.eat(types.eq)) return left;
    const node = this.startNodeAt(startPos, startLoc);
    return node.left = left, node.right = this.parseMaybeAssign(), this.finishNode(node, "AssignmentPattern");
  }
  checkLVal(expr, bindingType = 64, checkClashes, contextDescription, disallowLetBinding, strictModeChanged = !1) {
    switch (expr.type) {
     case "Identifier":
      if (this.state.strict && (strictModeChanged ? isStrictBindReservedWord(expr.name, this.inModule) : isStrictBindOnlyReservedWord(expr.name)) && this.raise(expr.start, 64 === bindingType ? ErrorMessages.StrictEvalArguments : ErrorMessages.StrictEvalArgumentsBinding, expr.name), 
      checkClashes) {
        const key = "_" + expr.name;
        checkClashes[key] ? this.raise(expr.start, ErrorMessages.ParamDupe) : checkClashes[key] = !0;
      }
      disallowLetBinding && "let" === expr.name && this.raise(expr.start, ErrorMessages.LetInLexicalBinding), 
      64 & bindingType || this.scope.declareName(expr.name, bindingType, expr.start);
      break;

     case "MemberExpression":
      64 !== bindingType && this.raise(expr.start, ErrorMessages.InvalidPropertyBindingPattern);
      break;

     case "ObjectPattern":
      for (let _i2 = 0, _expr$properties = expr.properties; _i2 < _expr$properties.length; _i2++) {
        let prop = _expr$properties[_i2];
        if ("ObjectProperty" === prop.type) prop = prop.value; else if ("ObjectMethod" === prop.type) continue;
        this.checkLVal(prop, bindingType, checkClashes, "object destructuring pattern", disallowLetBinding);
      }
      break;

     case "ArrayPattern":
      for (let _i3 = 0, _expr$elements = expr.elements; _i3 < _expr$elements.length; _i3++) {
        const elem = _expr$elements[_i3];
        elem && this.checkLVal(elem, bindingType, checkClashes, "array destructuring pattern", disallowLetBinding);
      }
      break;

     case "AssignmentPattern":
      this.checkLVal(expr.left, bindingType, checkClashes, "assignment pattern");
      break;

     case "RestElement":
      this.checkLVal(expr.argument, bindingType, checkClashes, "rest element");
      break;

     case "ParenthesizedExpression":
      this.checkLVal(expr.expression, bindingType, checkClashes, "parenthesized expression");
      break;

     default:
      this.raise(expr.start, 64 === bindingType ? ErrorMessages.InvalidLhs : ErrorMessages.InvalidLhsBinding, contextDescription);
    }
  }
  checkToRestConversion(node) {
    "Identifier" !== node.argument.type && "MemberExpression" !== node.argument.type && this.raise(node.argument.start, ErrorMessages.InvalidRestAssignmentPattern);
  }
  checkCommaAfterRest(close) {
    this.match(types.comma) && (this.lookaheadCharCode() === close ? this.raiseTrailingCommaAfterRest(this.state.start) : this.raiseRestNotLast(this.state.start));
  }
  raiseRestNotLast(pos) {
    throw this.raise(pos, ErrorMessages.ElementAfterRest);
  }
  raiseTrailingCommaAfterRest(pos) {
    this.raise(pos, ErrorMessages.RestTrailingComma);
  }
}

class ExpressionParser extends LValParser {
  checkProto(prop, isRecord, protoRef, refExpressionErrors) {
    if ("SpreadElement" === prop.type || "ObjectMethod" === prop.type || prop.computed || prop.shorthand) return;
    const key = prop.key;
    if ("__proto__" === ("Identifier" === key.type ? key.name : key.value)) {
      if (isRecord) return void this.raise(key.start, ErrorMessages.RecordNoProto);
      protoRef.used && (refExpressionErrors ? -1 === refExpressionErrors.doubleProto && (refExpressionErrors.doubleProto = key.start) : this.raise(key.start, ErrorMessages.DuplicateProto)), 
      protoRef.used = !0;
    }
  }
  getExpression() {
    let paramFlags = 0;
    this.hasPlugin("topLevelAwait") && this.inModule && (paramFlags |= 2), this.scope.enter(1), 
    this.prodParam.enter(paramFlags), this.nextToken();
    const expr = this.parseExpression();
    return this.match(types.eof) || this.unexpected(), expr.comments = this.state.comments, 
    expr.errors = this.state.errors, expr;
  }
  parseExpression(noIn, refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, expr = this.parseMaybeAssign(noIn, refExpressionErrors);
    if (this.match(types.comma)) {
      const node = this.startNodeAt(startPos, startLoc);
      for (node.expressions = [ expr ]; this.eat(types.comma); ) node.expressions.push(this.parseMaybeAssign(noIn, refExpressionErrors));
      return this.toReferencedList(node.expressions), this.finishNode(node, "SequenceExpression");
    }
    return expr;
  }
  parseMaybeAssign(noIn, refExpressionErrors, afterLeftParse, refNeedsArrowPos) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    if (this.isContextual("yield")) {
      if (this.prodParam.hasYield) {
        let left = this.parseYield(noIn);
        return afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), 
        left;
      }
      this.state.exprAllowed = !1;
    }
    let ownExpressionErrors;
    refExpressionErrors ? ownExpressionErrors = !1 : (refExpressionErrors = new ExpressionErrors, 
    ownExpressionErrors = !0), (this.match(types.parenL) || this.match(types.name)) && (this.state.potentialArrowAt = this.state.start);
    let left = this.parseMaybeConditional(noIn, refExpressionErrors, refNeedsArrowPos);
    if (afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), 
    this.state.type.isAssign) {
      const node = this.startNodeAt(startPos, startLoc), operator = this.state.value;
      return node.operator = operator, "??=" === operator && this.expectPlugin("logicalAssignment"), 
      "||=" !== operator && "&&=" !== operator || this.expectPlugin("logicalAssignment"), 
      this.match(types.eq) ? (node.left = this.toAssignable(left), refExpressionErrors.doubleProto = -1) : node.left = left, 
      refExpressionErrors.shorthandAssign >= node.left.start && (refExpressionErrors.shorthandAssign = -1), 
      this.checkLVal(left, void 0, void 0, "assignment expression"), this.next(), node.right = this.parseMaybeAssign(noIn), 
      this.finishNode(node, "AssignmentExpression");
    }
    return ownExpressionErrors && this.checkExpressionErrors(refExpressionErrors, !0), 
    left;
  }
  parseMaybeConditional(noIn, refExpressionErrors, refNeedsArrowPos) {
    const startPos = this.state.start, startLoc = this.state.startLoc, potentialArrowAt = this.state.potentialArrowAt, expr = this.parseExprOps(noIn, refExpressionErrors);
    return "ArrowFunctionExpression" === expr.type && expr.start === potentialArrowAt || this.checkExpressionErrors(refExpressionErrors, !1) ? expr : this.parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos);
  }
  parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos) {
    if (this.eat(types.question)) {
      const node = this.startNodeAt(startPos, startLoc);
      return node.test = expr, node.consequent = this.parseMaybeAssign(), this.expect(types.colon), 
      node.alternate = this.parseMaybeAssign(noIn), this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  }
  parseExprOps(noIn, refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, potentialArrowAt = this.state.potentialArrowAt, expr = this.parseMaybeUnary(refExpressionErrors);
    return "ArrowFunctionExpression" === expr.type && expr.start === potentialArrowAt || this.checkExpressionErrors(refExpressionErrors, !1) ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  }
  parseExprOp(left, leftStartPos, leftStartLoc, minPrec, noIn) {
    let prec = this.state.type.binop;
    if (!(null == prec || noIn && this.match(types._in)) && prec > minPrec) {
      const operator = this.state.value;
      if ("|>" === operator && this.state.inFSharpPipelineDirectBody) return left;
      const node = this.startNodeAt(leftStartPos, leftStartLoc);
      node.left = left, node.operator = operator, "**" !== operator || "UnaryExpression" !== left.type || !this.options.createParenthesizedExpressions && left.extra && left.extra.parenthesized || this.raise(left.argument.start, ErrorMessages.UnexpectedTokenUnaryExponentiation);
      const op = this.state.type, logical = op === types.logicalOR || op === types.logicalAND, coalesce = op === types.nullishCoalescing;
      if (op === types.pipeline ? (this.expectPlugin("pipelineOperator"), this.state.inPipeline = !0, 
      this.checkPipelineAtInfixOperator(left, leftStartPos)) : coalesce && (prec = types.logicalAND.binop), 
      this.next(), op === types.pipeline && "minimal" === this.getPluginOption("pipelineOperator", "proposal") && this.match(types.name) && "await" === this.state.value && this.prodParam.hasAwait) throw this.raise(this.state.start, ErrorMessages.UnexpectedAwaitAfterPipelineBody);
      node.right = this.parseExprOpRightExpr(op, prec, noIn), this.finishNode(node, logical || coalesce ? "LogicalExpression" : "BinaryExpression");
      const nextOp = this.state.type;
      if (coalesce && (nextOp === types.logicalOR || nextOp === types.logicalAND) || logical && nextOp === types.nullishCoalescing) throw this.raise(this.state.start, ErrorMessages.MixingCoalesceWithLogical);
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
    return left;
  }
  parseExprOpRightExpr(op, prec, noIn) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    switch (op) {
     case types.pipeline:
      switch (this.getPluginOption("pipelineOperator", "proposal")) {
       case "smart":
        return this.withTopicPermittingContext(() => this.parseSmartPipelineBody(this.parseExprOpBaseRightExpr(op, prec, noIn), startPos, startLoc));

       case "fsharp":
        return this.withSoloAwaitPermittingContext(() => this.parseFSharpPipelineBody(prec, noIn));
      }

     default:
      return this.parseExprOpBaseRightExpr(op, prec, noIn);
    }
  }
  parseExprOpBaseRightExpr(op, prec, noIn) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    return this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, op.rightAssociative ? prec - 1 : prec, noIn);
  }
  parseMaybeUnary(refExpressionErrors) {
    if (this.isContextual("await") && this.isAwaitAllowed()) return this.parseAwait();
    if (this.state.type.prefix) {
      const node = this.startNode(), update = this.match(types.incDec);
      if (node.operator = this.state.value, node.prefix = !0, "throw" === node.operator && this.expectPlugin("throwExpressions"), 
      this.next(), node.argument = this.parseMaybeUnary(), this.checkExpressionErrors(refExpressionErrors, !0), 
      update) this.checkLVal(node.argument, void 0, void 0, "prefix operation"); else if (this.state.strict && "delete" === node.operator) {
        const arg = node.argument;
        "Identifier" === arg.type ? this.raise(node.start, ErrorMessages.StrictDelete) : "MemberExpression" !== arg.type && "OptionalMemberExpression" !== arg.type || "PrivateName" !== arg.property.type || this.raise(node.start, ErrorMessages.DeletePrivateField);
      }
      return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let expr = this.parseExprSubscripts(refExpressionErrors);
    if (this.checkExpressionErrors(refExpressionErrors, !1)) return expr;
    for (;this.state.type.postfix && !this.canInsertSemicolon(); ) {
      const node = this.startNodeAt(startPos, startLoc);
      node.operator = this.state.value, node.prefix = !1, node.argument = expr, this.checkLVal(expr, void 0, void 0, "postfix operation"), 
      this.next(), expr = this.finishNode(node, "UpdateExpression");
    }
    return expr;
  }
  parseExprSubscripts(refExpressionErrors) {
    const startPos = this.state.start, startLoc = this.state.startLoc, potentialArrowAt = this.state.potentialArrowAt, expr = this.parseExprAtom(refExpressionErrors);
    return "ArrowFunctionExpression" === expr.type && expr.start === potentialArrowAt ? expr : this.parseSubscripts(expr, startPos, startLoc);
  }
  parseSubscripts(base, startPos, startLoc, noCalls) {
    const state = {
      optionalChainMember: !1,
      maybeAsyncArrow: this.atPossibleAsyncArrow(base),
      stop: !1
    };
    do {
      const oldMaybeInAsyncArrowHead = this.state.maybeInAsyncArrowHead;
      state.maybeAsyncArrow && (this.state.maybeInAsyncArrowHead = !0), base = this.parseSubscript(base, startPos, startLoc, noCalls, state), 
      state.maybeAsyncArrow = !1, this.state.maybeInAsyncArrowHead = oldMaybeInAsyncArrowHead;
    } while (!state.stop);
    return base;
  }
  parseSubscript(base, startPos, startLoc, noCalls, state) {
    if (!noCalls && this.eat(types.doubleColon)) {
      const node = this.startNodeAt(startPos, startLoc);
      return node.object = base, node.callee = this.parseNoCallExpr(), state.stop = !0, 
      this.parseSubscripts(this.finishNode(node, "BindExpression"), startPos, startLoc, noCalls);
    }
    let optional = !1;
    if (this.match(types.questionDot)) {
      if (state.optionalChainMember = optional = !0, noCalls && 40 === this.lookaheadCharCode()) return state.stop = !0, 
      base;
      this.next();
    }
    const computed = this.eat(types.bracketL);
    if (optional && !this.match(types.parenL) && !this.match(types.backQuote) || computed || this.eat(types.dot)) {
      const node = this.startNodeAt(startPos, startLoc);
      return node.object = base, node.property = computed ? this.parseExpression() : this.parseMaybePrivateName(!0), 
      node.computed = computed, "PrivateName" === node.property.type && ("Super" === node.object.type && this.raise(startPos, ErrorMessages.SuperPrivateField), 
      this.classScope.usePrivateName(node.property.id.name, node.property.start)), computed && this.expect(types.bracketR), 
      state.optionalChainMember ? (node.optional = optional, this.finishNode(node, "OptionalMemberExpression")) : this.finishNode(node, "MemberExpression");
    }
    if (!noCalls && this.match(types.parenL)) {
      const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos;
      this.state.maybeInArrowParameters = !0, this.state.yieldPos = -1, this.state.awaitPos = -1, 
      this.next();
      let node = this.startNodeAt(startPos, startLoc);
      return node.callee = base, state.optionalChainMember && (node.optional = optional), 
      node.arguments = optional ? this.parseCallExpressionArguments(types.parenR, !1) : this.parseCallExpressionArguments(types.parenR, state.maybeAsyncArrow, "Import" === base.type, "Super" !== base.type, node), 
      this.finishCallExpression(node, state.optionalChainMember), state.maybeAsyncArrow && this.shouldParseAsyncArrow() && !optional ? (state.stop = !0, 
      node = this.parseAsyncArrowFromCallExpression(this.startNodeAt(startPos, startLoc), node), 
      this.checkYieldAwaitInDefaultParams(), this.state.yieldPos = oldYieldPos, this.state.awaitPos = oldAwaitPos) : (this.toReferencedListDeep(node.arguments), 
      -1 !== oldYieldPos && (this.state.yieldPos = oldYieldPos), (this.isAwaitAllowed() || oldMaybeInArrowParameters) && -1 === oldAwaitPos || (this.state.awaitPos = oldAwaitPos)), 
      this.state.maybeInArrowParameters = oldMaybeInArrowParameters, node;
    }
    return this.match(types.backQuote) ? this.parseTaggedTemplateExpression(startPos, startLoc, base, state) : (state.stop = !0, 
    base);
  }
  parseTaggedTemplateExpression(startPos, startLoc, base, state, typeArguments) {
    const node = this.startNodeAt(startPos, startLoc);
    return node.tag = base, node.quasi = this.parseTemplate(!0), typeArguments && (node.typeParameters = typeArguments), 
    state.optionalChainMember && this.raise(startPos, ErrorMessages.OptionalChainingNoTemplate), 
    this.finishNode(node, "TaggedTemplateExpression");
  }
  atPossibleAsyncArrow(base) {
    return "Identifier" === base.type && "async" === base.name && this.state.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start == 5 && base.start === this.state.potentialArrowAt;
  }
  finishCallExpression(node, optional) {
    if ("Import" === node.callee.type) if (2 === node.arguments.length && this.expectPlugin("moduleAttributes"), 
    0 === node.arguments.length || node.arguments.length > 2) this.raise(node.start, ErrorMessages.ImportCallArity, this.hasPlugin("moduleAttributes") ? "one or two arguments" : "one argument"); else for (let _i = 0, _node$arguments = node.arguments; _i < _node$arguments.length; _i++) {
      const arg = _node$arguments[_i];
      "SpreadElement" === arg.type && this.raise(arg.start, ErrorMessages.ImportCallSpreadArgument);
    }
    return this.finishNode(node, optional ? "OptionalCallExpression" : "CallExpression");
  }
  parseCallExpressionArguments(close, possibleAsyncArrow, dynamicImport, allowPlaceholder, nodeForExtra) {
    const elts = [];
    let innerParenStart, first = !0;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    for (this.state.inFSharpPipelineDirectBody = !1; !this.eat(close); ) {
      if (first) first = !1; else if (this.expect(types.comma), this.match(close)) {
        dynamicImport && !this.hasPlugin("moduleAttributes") && this.raise(this.state.lastTokStart, ErrorMessages.ImportCallArgumentTrailingComma), 
        nodeForExtra && this.addExtra(nodeForExtra, "trailingComma", this.state.lastTokStart), 
        this.next();
        break;
      }
      this.match(types.parenL) && !innerParenStart && (innerParenStart = this.state.start), 
      elts.push(this.parseExprListItem(!1, possibleAsyncArrow ? new ExpressionErrors : void 0, possibleAsyncArrow ? {
        start: 0
      } : void 0, allowPlaceholder));
    }
    return possibleAsyncArrow && innerParenStart && this.shouldParseAsyncArrow() && this.unexpected(), 
    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, elts;
  }
  shouldParseAsyncArrow() {
    return this.match(types.arrow) && !this.canInsertSemicolon();
  }
  parseAsyncArrowFromCallExpression(node, call) {
    var _call$extra;
    return this.expect(types.arrow), this.parseArrowExpression(node, call.arguments, !0, null == (_call$extra = call.extra) ? void 0 : _call$extra.trailingComma), 
    node;
  }
  parseNoCallExpr() {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, !0);
  }
  parseExprAtom(refExpressionErrors) {
    this.state.type === types.slash && this.readRegexp();
    const canBeArrow = this.state.potentialArrowAt === this.state.start;
    let node;
    switch (this.state.type) {
     case types._super:
      return node = this.startNode(), this.next(), !this.match(types.parenL) || this.scope.allowDirectSuper || this.options.allowSuperOutsideMethod ? this.scope.allowSuper || this.options.allowSuperOutsideMethod || this.raise(node.start, ErrorMessages.UnexpectedSuper) : this.raise(node.start, ErrorMessages.SuperNotAllowed), 
      this.match(types.parenL) || this.match(types.bracketL) || this.match(types.dot) || this.raise(node.start, ErrorMessages.UnsupportedSuper), 
      this.finishNode(node, "Super");

     case types._import:
      return node = this.startNode(), this.next(), this.match(types.dot) ? this.parseImportMetaProperty(node) : (this.match(types.parenL) || this.raise(this.state.lastTokStart, ErrorMessages.UnsupportedImport), 
      this.finishNode(node, "Import"));

     case types._this:
      return node = this.startNode(), this.next(), this.finishNode(node, "ThisExpression");

     case types.name:
      {
        node = this.startNode();
        const containsEsc = this.state.containsEsc, id = this.parseIdentifier();
        if (!containsEsc && "async" === id.name && this.match(types._function) && !this.canInsertSemicolon()) {
          const last = this.state.context.length - 1;
          if (this.state.context[last] !== types$1.functionStatement) throw new Error("Internal error");
          return this.state.context[last] = types$1.functionExpression, this.next(), this.parseFunction(node, void 0, !0);
        }
        if (canBeArrow && !containsEsc && "async" === id.name && this.match(types.name) && !this.canInsertSemicolon()) {
          const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldMaybeInAsyncArrowHead = this.state.maybeInAsyncArrowHead, oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos;
          this.state.maybeInArrowParameters = !0, this.state.maybeInAsyncArrowHead = !0, this.state.yieldPos = -1, 
          this.state.awaitPos = -1;
          const params = [ this.parseIdentifier() ];
          return this.expect(types.arrow), this.checkYieldAwaitInDefaultParams(), this.state.maybeInArrowParameters = oldMaybeInArrowParameters, 
          this.state.maybeInAsyncArrowHead = oldMaybeInAsyncArrowHead, this.state.yieldPos = oldYieldPos, 
          this.state.awaitPos = oldAwaitPos, this.parseArrowExpression(node, params, !0), 
          node;
        }
        return canBeArrow && this.match(types.arrow) && !this.canInsertSemicolon() ? (this.next(), 
        this.parseArrowExpression(node, [ id ], !1), node) : id;
      }

     case types._do:
      {
        this.expectPlugin("doExpressions");
        const node = this.startNode();
        this.next();
        const oldLabels = this.state.labels;
        return this.state.labels = [], node.body = this.parseBlock(), this.state.labels = oldLabels, 
        this.finishNode(node, "DoExpression");
      }

     case types.regexp:
      {
        const value = this.state.value;
        return node = this.parseLiteral(value.value, "RegExpLiteral"), node.pattern = value.pattern, 
        node.flags = value.flags, node;
      }

     case types.num:
      return this.parseLiteral(this.state.value, "NumericLiteral");

     case types.bigint:
      return this.parseLiteral(this.state.value, "BigIntLiteral");

     case types.string:
      return this.parseLiteral(this.state.value, "StringLiteral");

     case types._null:
      return node = this.startNode(), this.next(), this.finishNode(node, "NullLiteral");

     case types._true:
     case types._false:
      return this.parseBooleanLiteral();

     case types.parenL:
      return this.parseParenAndDistinguishExpression(canBeArrow);

     case types.bracketBarL:
     case types.bracketHashL:
      {
        this.expectPlugin("recordAndTuple");
        const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody, close = this.state.type === types.bracketBarL ? types.bracketBarR : types.bracketR;
        return this.state.inFSharpPipelineDirectBody = !1, node = this.startNode(), this.next(), 
        node.elements = this.parseExprList(close, !1, refExpressionErrors, node), this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, 
        this.finishNode(node, "TupleExpression");
      }

     case types.bracketL:
      {
        const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
        return this.state.inFSharpPipelineDirectBody = !1, node = this.startNode(), this.next(), 
        node.elements = this.parseExprList(types.bracketR, !0, refExpressionErrors, node), 
        this.state.maybeInArrowParameters || this.toReferencedList(node.elements), this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, 
        this.finishNode(node, "ArrayExpression");
      }

     case types.braceBarL:
     case types.braceHashL:
      {
        this.expectPlugin("recordAndTuple");
        const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody, close = this.state.type === types.braceBarL ? types.braceBarR : types.braceR;
        this.state.inFSharpPipelineDirectBody = !1;
        const ret = this.parseObj(close, !1, !0, refExpressionErrors);
        return this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, ret;
      }

     case types.braceL:
      {
        const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
        this.state.inFSharpPipelineDirectBody = !1;
        const ret = this.parseObj(types.braceR, !1, !1, refExpressionErrors);
        return this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, ret;
      }

     case types._function:
      return this.parseFunctionExpression();

     case types.at:
      this.parseDecorators();

     case types._class:
      return node = this.startNode(), this.takeDecorators(node), this.parseClass(node, !1);

     case types._new:
      return this.parseNew();

     case types.backQuote:
      return this.parseTemplate(!1);

     case types.doubleColon:
      {
        node = this.startNode(), this.next(), node.object = null;
        const callee = node.callee = this.parseNoCallExpr();
        if ("MemberExpression" === callee.type) return this.finishNode(node, "BindExpression");
        throw this.raise(callee.start, ErrorMessages.UnsupportedBind);
      }

     case types.hash:
      {
        if (this.state.inPipeline) return node = this.startNode(), "smart" !== this.getPluginOption("pipelineOperator", "proposal") && this.raise(node.start, ErrorMessages.PrimaryTopicRequiresSmartPipeline), 
        this.next(), this.primaryTopicReferenceIsAllowedInCurrentTopicContext() || this.raise(node.start, ErrorMessages.PrimaryTopicNotAllowed), 
        this.registerTopicReference(), this.finishNode(node, "PipelinePrimaryTopicReference");
        const nextCh = this.input.codePointAt(this.state.end);
        if (isIdentifierStart(nextCh) || 92 === nextCh) {
          const start = this.state.start;
          if (node = this.parseMaybePrivateName(!0), this.match(types._in)) this.expectPlugin("privateIn"), 
          this.classScope.usePrivateName(node.id.name, node.start); else {
            if (!this.hasPlugin("privateIn")) throw this.unexpected(start);
            this.raise(this.state.start, ErrorMessages.PrivateInExpectedIn, node.id.name);
          }
          return node;
        }
      }

     case types.relational:
      if ("<" === this.state.value) {
        const lookaheadCh = this.input.codePointAt(this.nextTokenStart());
        (isIdentifierStart(lookaheadCh) || 62 === lookaheadCh) && this.expectOnePlugin([ "jsx", "flow", "typescript" ]);
      }

     default:
      throw this.unexpected();
    }
  }
  parseBooleanLiteral() {
    const node = this.startNode();
    return node.value = this.match(types._true), this.next(), this.finishNode(node, "BooleanLiteral");
  }
  parseMaybePrivateName(isPrivateNameAllowed) {
    if (this.match(types.hash)) {
      this.expectOnePlugin([ "classPrivateProperties", "classPrivateMethods" ]), isPrivateNameAllowed || this.raise(this.state.pos, ErrorMessages.UnexpectedPrivateField);
      const node = this.startNode();
      return this.next(), this.assertNoSpace("Unexpected space between # and identifier"), 
      node.id = this.parseIdentifier(!0), this.finishNode(node, "PrivateName");
    }
    return this.parseIdentifier(!0);
  }
  parseFunctionExpression() {
    const node = this.startNode();
    let meta = this.startNode();
    return this.next(), meta = this.createIdentifier(meta, "function"), this.prodParam.hasYield && this.eat(types.dot) ? this.parseMetaProperty(node, meta, "sent") : this.parseFunction(node);
  }
  parseMetaProperty(node, meta, propertyName) {
    node.meta = meta, "function" === meta.name && "sent" === propertyName && (this.isContextual(propertyName) ? this.expectPlugin("functionSent") : this.hasPlugin("functionSent") || this.unexpected());
    const containsEsc = this.state.containsEsc;
    return node.property = this.parseIdentifier(!0), (node.property.name !== propertyName || containsEsc) && this.raise(node.property.start, ErrorMessages.UnsupportedMetaProperty, meta.name, propertyName), 
    this.finishNode(node, "MetaProperty");
  }
  parseImportMetaProperty(node) {
    const id = this.createIdentifier(this.startNodeAtNode(node), "import");
    return this.expect(types.dot), this.isContextual("meta") && (this.inModule || this.raiseWithData(id.start, {
      code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED"
    }, ErrorMessages.ImportMetaOutsideModule), this.sawUnambiguousESM = !0), this.parseMetaProperty(node, id, "meta");
  }
  parseLiteral(value, type, startPos, startLoc) {
    startPos = startPos || this.state.start, startLoc = startLoc || this.state.startLoc;
    const node = this.startNodeAt(startPos, startLoc);
    return this.addExtra(node, "rawValue", value), this.addExtra(node, "raw", this.input.slice(startPos, this.state.end)), 
    node.value = value, this.next(), this.finishNode(node, type);
  }
  parseParenAndDistinguishExpression(canBeArrow) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    let val;
    this.expect(types.parenL);
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos, oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.maybeInArrowParameters = !0, this.state.yieldPos = -1, this.state.awaitPos = -1, 
    this.state.inFSharpPipelineDirectBody = !1;
    const innerStartPos = this.state.start, innerStartLoc = this.state.startLoc, exprList = [], refExpressionErrors = new ExpressionErrors, refNeedsArrowPos = {
      start: 0
    };
    let spreadStart, optionalCommaStart, first = !0;
    for (;!this.match(types.parenR); ) {
      if (first) first = !1; else if (this.expect(types.comma, refNeedsArrowPos.start || null), 
      this.match(types.parenR)) {
        optionalCommaStart = this.state.start;
        break;
      }
      if (this.match(types.ellipsis)) {
        const spreadNodeStartPos = this.state.start, spreadNodeStartLoc = this.state.startLoc;
        spreadStart = this.state.start, exprList.push(this.parseParenItem(this.parseRestBinding(), spreadNodeStartPos, spreadNodeStartLoc)), 
        this.checkCommaAfterRest(41);
        break;
      }
      exprList.push(this.parseMaybeAssign(!1, refExpressionErrors, this.parseParenItem, refNeedsArrowPos));
    }
    const innerEndPos = this.state.start, innerEndLoc = this.state.startLoc;
    this.expect(types.parenR), this.state.maybeInArrowParameters = oldMaybeInArrowParameters, 
    this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody;
    let arrowNode = this.startNodeAt(startPos, startLoc);
    if (canBeArrow && this.shouldParseArrow() && (arrowNode = this.parseArrow(arrowNode))) {
      this.isAwaitAllowed() || this.state.maybeInAsyncArrowHead || (this.state.awaitPos = oldAwaitPos), 
      this.checkYieldAwaitInDefaultParams(), this.state.yieldPos = oldYieldPos, this.state.awaitPos = oldAwaitPos;
      for (let _i2 = 0; _i2 < exprList.length; _i2++) {
        const param = exprList[_i2];
        param.extra && param.extra.parenthesized && this.unexpected(param.extra.parenStart);
      }
      return this.parseArrowExpression(arrowNode, exprList, !1), arrowNode;
    }
    if (-1 !== oldYieldPos && (this.state.yieldPos = oldYieldPos), -1 !== oldAwaitPos && (this.state.awaitPos = oldAwaitPos), 
    exprList.length || this.unexpected(this.state.lastTokStart), optionalCommaStart && this.unexpected(optionalCommaStart), 
    spreadStart && this.unexpected(spreadStart), this.checkExpressionErrors(refExpressionErrors, !0), 
    refNeedsArrowPos.start && this.unexpected(refNeedsArrowPos.start), this.toReferencedListDeep(exprList, !0), 
    exprList.length > 1 ? (val = this.startNodeAt(innerStartPos, innerStartLoc), val.expressions = exprList, 
    this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc)) : val = exprList[0], 
    !this.options.createParenthesizedExpressions) return this.addExtra(val, "parenthesized", !0), 
    this.addExtra(val, "parenStart", startPos), val;
    const parenExpression = this.startNodeAt(startPos, startLoc);
    return parenExpression.expression = val, this.finishNode(parenExpression, "ParenthesizedExpression"), 
    parenExpression;
  }
  shouldParseArrow() {
    return !this.canInsertSemicolon();
  }
  parseArrow(node) {
    if (this.eat(types.arrow)) return node;
  }
  parseParenItem(node, startPos, startLoc) {
    return node;
  }
  parseNew() {
    const node = this.startNode();
    let meta = this.startNode();
    if (this.next(), meta = this.createIdentifier(meta, "new"), this.eat(types.dot)) {
      const metaProp = this.parseMetaProperty(node, meta, "target");
      if (!this.scope.inNonArrowFunction && !this.scope.inClass) {
        let error = ErrorMessages.UnexpectedNewTarget;
        this.hasPlugin("classProperties") && (error += " or class properties"), this.raise(metaProp.start, error);
      }
      return metaProp;
    }
    return node.callee = this.parseNoCallExpr(), "Import" === node.callee.type ? this.raise(node.callee.start, ErrorMessages.ImportCallNotNewExpression) : "OptionalMemberExpression" === node.callee.type || "OptionalCallExpression" === node.callee.type ? this.raise(this.state.lastTokEnd, ErrorMessages.OptionalChainingNoNew) : this.eat(types.questionDot) && this.raise(this.state.start, ErrorMessages.OptionalChainingNoNew), 
    this.parseNewArguments(node), this.finishNode(node, "NewExpression");
  }
  parseNewArguments(node) {
    if (this.eat(types.parenL)) {
      const args = this.parseExprList(types.parenR);
      this.toReferencedList(args), node.arguments = args;
    } else node.arguments = [];
  }
  parseTemplateElement(isTagged) {
    const elem = this.startNode();
    return null === this.state.value && (isTagged || this.raise(this.state.start + 1, ErrorMessages.InvalidEscapeSequenceTemplate)), 
    elem.value = {
      raw: this.input.slice(this.state.start, this.state.end).replace(/\r\n?/g, "\n"),
      cooked: this.state.value
    }, this.next(), elem.tail = this.match(types.backQuote), this.finishNode(elem, "TemplateElement");
  }
  parseTemplate(isTagged) {
    const node = this.startNode();
    this.next(), node.expressions = [];
    let curElt = this.parseTemplateElement(isTagged);
    for (node.quasis = [ curElt ]; !curElt.tail; ) this.expect(types.dollarBraceL), 
    node.expressions.push(this.parseExpression()), this.expect(types.braceR), node.quasis.push(curElt = this.parseTemplateElement(isTagged));
    return this.next(), this.finishNode(node, "TemplateLiteral");
  }
  parseObj(close, isPattern, isRecord, refExpressionErrors) {
    const propHash = Object.create(null);
    let first = !0;
    const node = this.startNode();
    for (node.properties = [], this.next(); !this.eat(close); ) {
      if (first) first = !1; else if (this.expect(types.comma), this.match(close)) {
        this.addExtra(node, "trailingComma", this.state.lastTokStart), this.next();
        break;
      }
      const prop = this.parseObjectMember(isPattern, refExpressionErrors);
      isPattern || this.checkProto(prop, isRecord, propHash, refExpressionErrors), isRecord && "ObjectProperty" !== prop.type && "SpreadElement" !== prop.type && this.raise(prop.start, ErrorMessages.InvalidRecordProperty), 
      prop.shorthand && this.addExtra(prop, "shorthand", !0), node.properties.push(prop);
    }
    let type = "ObjectExpression";
    return isPattern ? type = "ObjectPattern" : isRecord && (type = "RecordExpression"), 
    this.finishNode(node, type);
  }
  isAsyncProp(prop) {
    return !prop.computed && "Identifier" === prop.key.type && "async" === prop.key.name && (this.isLiteralPropertyName() || this.match(types.bracketL) || this.match(types.star)) && !this.hasPrecedingLineBreak();
  }
  parseObjectMember(isPattern, refExpressionErrors) {
    let decorators = [];
    if (this.match(types.at)) for (this.hasPlugin("decorators") && this.raise(this.state.start, ErrorMessages.UnsupportedPropertyDecorator); this.match(types.at); ) decorators.push(this.parseDecorator());
    const prop = this.startNode();
    let startPos, startLoc, isGenerator = !1, isAsync = !1;
    if (this.match(types.ellipsis)) return decorators.length && this.unexpected(), isPattern ? (this.next(), 
    prop.argument = this.parseIdentifier(), this.checkCommaAfterRest(125), this.finishNode(prop, "RestElement")) : this.parseSpread();
    decorators.length && (prop.decorators = decorators, decorators = []), prop.method = !1, 
    (isPattern || refExpressionErrors) && (startPos = this.state.start, startLoc = this.state.startLoc), 
    isPattern || (isGenerator = this.eat(types.star));
    const containsEsc = this.state.containsEsc;
    return this.parsePropertyName(prop, !1), isPattern || containsEsc || isGenerator || !this.isAsyncProp(prop) ? isAsync = !1 : (isAsync = !0, 
    isGenerator = this.eat(types.star), this.parsePropertyName(prop, !1)), this.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refExpressionErrors, containsEsc), 
    prop;
  }
  isGetterOrSetterMethod(prop, isPattern) {
    return !isPattern && !prop.computed && "Identifier" === prop.key.type && ("get" === prop.key.name || "set" === prop.key.name) && (this.isLiteralPropertyName() || this.match(types.bracketL));
  }
  getGetterSetterExpectedParamCount(method) {
    return "get" === method.kind ? 0 : 1;
  }
  checkGetterSetterParams(method) {
    const paramCount = this.getGetterSetterExpectedParamCount(method), start = method.start;
    method.params.length !== paramCount && ("get" === method.kind ? this.raise(start, ErrorMessages.BadGetterArity) : this.raise(start, ErrorMessages.BadSetterArity)), 
    "set" === method.kind && "RestElement" === method.params[method.params.length - 1].type && this.raise(start, ErrorMessages.BadSetterRestParameter);
  }
  parseObjectMethod(prop, isGenerator, isAsync, isPattern, containsEsc) {
    return isAsync || isGenerator || this.match(types.parenL) ? (isPattern && this.unexpected(), 
    prop.kind = "method", prop.method = !0, this.parseMethod(prop, isGenerator, isAsync, !1, !1, "ObjectMethod")) : !containsEsc && this.isGetterOrSetterMethod(prop, isPattern) ? ((isGenerator || isAsync) && this.unexpected(), 
    prop.kind = prop.key.name, this.parsePropertyName(prop, !1), this.parseMethod(prop, !1, !1, !1, !1, "ObjectMethod"), 
    this.checkGetterSetterParams(prop), prop) : void 0;
  }
  parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors) {
    return prop.shorthand = !1, this.eat(types.colon) ? (prop.value = isPattern ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssign(!1, refExpressionErrors), 
    this.finishNode(prop, "ObjectProperty")) : prop.computed || "Identifier" !== prop.key.type ? void 0 : (this.checkReservedWord(prop.key.name, prop.key.start, !0, !0), 
    isPattern ? prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone()) : this.match(types.eq) && refExpressionErrors ? (-1 === refExpressionErrors.shorthandAssign && (refExpressionErrors.shorthandAssign = this.state.start), 
    prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone())) : prop.value = prop.key.__clone(), 
    prop.shorthand = !0, this.finishNode(prop, "ObjectProperty"));
  }
  parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refExpressionErrors, containsEsc) {
    const node = this.parseObjectMethod(prop, isGenerator, isAsync, isPattern, containsEsc) || this.parseObjectProperty(prop, startPos, startLoc, isPattern, refExpressionErrors);
    return node || this.unexpected(), node;
  }
  parsePropertyName(prop, isPrivateNameAllowed) {
    if (this.eat(types.bracketL)) prop.computed = !0, prop.key = this.parseMaybeAssign(), 
    this.expect(types.bracketR); else {
      const oldInPropertyName = this.state.inPropertyName;
      this.state.inPropertyName = !0, prop.key = this.match(types.num) || this.match(types.string) || this.match(types.bigint) ? this.parseExprAtom() : this.parseMaybePrivateName(isPrivateNameAllowed), 
      "PrivateName" !== prop.key.type && (prop.computed = !1), this.state.inPropertyName = oldInPropertyName;
    }
    return prop.key;
  }
  initFunction(node, isAsync) {
    node.id = null, node.generator = !1, node.async = !!isAsync;
  }
  parseMethod(node, isGenerator, isAsync, isConstructor, allowDirectSuper, type, inClassScope = !1) {
    const oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos;
    this.state.yieldPos = -1, this.state.awaitPos = -1, this.initFunction(node, isAsync), 
    node.generator = !!isGenerator;
    const allowModifiers = isConstructor;
    return this.scope.enter(18 | (inClassScope ? 64 : 0) | (allowDirectSuper ? 32 : 0)), 
    this.prodParam.enter(functionFlags(isAsync, node.generator)), this.parseFunctionParams(node, allowModifiers), 
    this.parseFunctionBodyAndFinish(node, type, !0), this.prodParam.exit(), this.scope.exit(), 
    this.state.yieldPos = oldYieldPos, this.state.awaitPos = oldAwaitPos, node;
  }
  parseArrowExpression(node, params, isAsync, trailingCommaPos) {
    this.scope.enter(6), this.prodParam.enter(functionFlags(isAsync, !1)), this.initFunction(node, isAsync);
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos;
    return params && (this.state.maybeInArrowParameters = !0, this.setArrowFunctionParameters(node, params, trailingCommaPos)), 
    this.state.maybeInArrowParameters = !1, this.state.yieldPos = -1, this.state.awaitPos = -1, 
    this.parseFunctionBody(node, !0), this.prodParam.exit(), this.scope.exit(), this.state.maybeInArrowParameters = oldMaybeInArrowParameters, 
    this.state.yieldPos = oldYieldPos, this.state.awaitPos = oldAwaitPos, this.finishNode(node, "ArrowFunctionExpression");
  }
  setArrowFunctionParameters(node, params, trailingCommaPos) {
    node.params = this.toAssignableList(params, trailingCommaPos);
  }
  parseFunctionBodyAndFinish(node, type, isMethod = !1) {
    this.parseFunctionBody(node, !1, isMethod), this.finishNode(node, type);
  }
  parseFunctionBody(node, allowExpression, isMethod = !1) {
    const isExpression = allowExpression && !this.match(types.braceL), oldInParameters = this.state.inParameters;
    if (this.state.inParameters = !1, isExpression) node.body = this.parseMaybeAssign(), 
    this.checkParams(node, !1, allowExpression, !1); else {
      const oldStrict = this.state.strict, oldLabels = this.state.labels;
      this.state.labels = [], this.prodParam.enter(4 | this.prodParam.currentFlags()), 
      node.body = this.parseBlock(!0, !1, hasStrictModeDirective => {
        const nonSimple = !this.isSimpleParamList(node.params);
        if (hasStrictModeDirective && nonSimple) {
          const errorPos = "method" !== node.kind && "constructor" !== node.kind || !node.key ? node.start : node.key.end;
          this.raise(errorPos, ErrorMessages.IllegalLanguageModeDirective);
        }
        const strictModeChanged = !oldStrict && this.state.strict;
        this.checkParams(node, !(this.state.strict || allowExpression || isMethod || nonSimple), allowExpression, strictModeChanged), 
        this.state.strict && node.id && this.checkLVal(node.id, 65, void 0, "function name", void 0, strictModeChanged);
      }), this.prodParam.exit(), this.state.labels = oldLabels;
    }
    this.state.inParameters = oldInParameters;
  }
  isSimpleParamList(params) {
    for (let i = 0, len = params.length; i < len; i++) if ("Identifier" !== params[i].type) return !1;
    return !0;
  }
  checkParams(node, allowDuplicates, isArrowFunction, strictModeChanged = !0) {
    const nameHash = Object.create(null);
    for (let i = 0; i < node.params.length; i++) this.checkLVal(node.params[i], 5, allowDuplicates ? null : nameHash, "function parameter list", void 0, strictModeChanged);
  }
  parseExprList(close, allowEmpty, refExpressionErrors, nodeForExtra) {
    const elts = [];
    let first = !0;
    for (;!this.eat(close); ) {
      if (first) first = !1; else if (this.expect(types.comma), this.match(close)) {
        nodeForExtra && this.addExtra(nodeForExtra, "trailingComma", this.state.lastTokStart), 
        this.next();
        break;
      }
      elts.push(this.parseExprListItem(allowEmpty, refExpressionErrors));
    }
    return elts;
  }
  parseExprListItem(allowEmpty, refExpressionErrors, refNeedsArrowPos, allowPlaceholder) {
    let elt;
    if (this.match(types.comma)) allowEmpty || this.raise(this.state.pos, ErrorMessages.UnexpectedToken, ","), 
    elt = null; else if (this.match(types.ellipsis)) {
      const spreadNodeStartPos = this.state.start, spreadNodeStartLoc = this.state.startLoc;
      elt = this.parseParenItem(this.parseSpread(refExpressionErrors, refNeedsArrowPos), spreadNodeStartPos, spreadNodeStartLoc);
    } else if (this.match(types.question)) {
      this.expectPlugin("partialApplication"), allowPlaceholder || this.raise(this.state.start, ErrorMessages.UnexpectedArgumentPlaceholder);
      const node = this.startNode();
      this.next(), elt = this.finishNode(node, "ArgumentPlaceholder");
    } else elt = this.parseMaybeAssign(!1, refExpressionErrors, this.parseParenItem, refNeedsArrowPos);
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
    if (this.match(types.name)) name = this.state.value; else {
      if (!this.state.type.keyword) throw this.unexpected();
      {
        name = this.state.type.keyword;
        const context = this.state.context;
        "class" !== name && "function" !== name || "function" !== context[context.length - 1].token || context.pop();
      }
    }
    return liberal ? this.state.type = types.name : this.checkReservedWord(name, this.state.start, !!this.state.type.keyword, !1), 
    this.next(), name;
  }
  checkReservedWord(word, startLoc, checkKeywords, isBinding) {
    if (this.prodParam.hasYield && "yield" === word) return void this.raise(startLoc, ErrorMessages.YieldBindingIdentifier);
    if ("await" === word) {
      if (this.prodParam.hasAwait) return void this.raise(startLoc, ErrorMessages.AwaitBindingIdentifier);
      -1 === this.state.awaitPos && (this.state.maybeInAsyncArrowHead || this.isAwaitAllowed()) && (this.state.awaitPos = this.state.start);
    }
    if (this.scope.inClass && !this.scope.inNonArrowFunction && "arguments" === word) return void this.raise(startLoc, ErrorMessages.ArgumentsDisallowedInInitializer);
    if (checkKeywords && isKeyword(word)) return void this.raise(startLoc, ErrorMessages.UnexpectedKeyword, word);
    (this.state.strict ? isBinding ? isStrictBindReservedWord : isStrictReservedWord : isReservedWord)(word, this.inModule) && (this.prodParam.hasAwait || "await" !== word ? this.raise(startLoc, ErrorMessages.UnexpectedReservedWord, word) : this.raise(startLoc, ErrorMessages.AwaitNotInAsyncFunction));
  }
  isAwaitAllowed() {
    return this.scope.inFunction ? this.prodParam.hasAwait : !!this.options.allowAwaitOutsideFunction || !!this.hasPlugin("topLevelAwait") && (this.inModule && this.prodParam.hasAwait);
  }
  parseAwait() {
    const node = this.startNode();
    return this.next(), this.state.inParameters ? this.raise(node.start, ErrorMessages.AwaitExpressionFormalParameter) : -1 === this.state.awaitPos && (this.state.awaitPos = node.start), 
    this.eat(types.star) && this.raise(node.start, ErrorMessages.ObsoleteAwaitStar), 
    this.scope.inFunction || this.options.allowAwaitOutsideFunction || (this.hasPrecedingLineBreak() || this.match(types.plusMin) || this.match(types.parenL) || this.match(types.bracketL) || this.match(types.backQuote) || this.match(types.regexp) || this.match(types.slash) || this.hasPlugin("v8intrinsic") && this.match(types.modulo) ? this.ambiguousScriptDifferentAst = !0 : this.sawUnambiguousESM = !0), 
    this.state.soloAwait || (node.argument = this.parseMaybeUnary()), this.finishNode(node, "AwaitExpression");
  }
  parseYield(noIn) {
    const node = this.startNode();
    return this.state.inParameters ? this.raise(node.start, ErrorMessages.YieldInParameter) : -1 === this.state.yieldPos && (this.state.yieldPos = node.start), 
    this.next(), this.match(types.semi) || !this.match(types.star) && !this.state.type.startsExpr || this.hasPrecedingLineBreak() ? (node.delegate = !1, 
    node.argument = null) : (node.delegate = this.eat(types.star), node.argument = this.parseMaybeAssign(noIn)), 
    this.finishNode(node, "YieldExpression");
  }
  checkPipelineAtInfixOperator(left, leftStartPos) {
    "smart" === this.getPluginOption("pipelineOperator", "proposal") && "SequenceExpression" === left.type && this.raise(leftStartPos, ErrorMessages.PipelineHeadSequenceExpression);
  }
  parseSmartPipelineBody(childExpression, startPos, startLoc) {
    const pipelineStyle = this.checkSmartPipelineBodyStyle(childExpression);
    return this.checkSmartPipelineBodyEarlyErrors(childExpression, pipelineStyle, startPos), 
    this.parseSmartPipelineBodyInStyle(childExpression, pipelineStyle, startPos, startLoc);
  }
  checkSmartPipelineBodyEarlyErrors(childExpression, pipelineStyle, startPos) {
    if (this.match(types.arrow)) throw this.raise(this.state.start, ErrorMessages.PipelineBodyNoArrow);
    "PipelineTopicExpression" === pipelineStyle && "SequenceExpression" === childExpression.type && this.raise(startPos, ErrorMessages.PipelineBodySequenceExpression);
  }
  parseSmartPipelineBodyInStyle(childExpression, pipelineStyle, startPos, startLoc) {
    const bodyNode = this.startNodeAt(startPos, startLoc);
    switch (pipelineStyle) {
     case "PipelineBareFunction":
      bodyNode.callee = childExpression;
      break;

     case "PipelineBareConstructor":
      bodyNode.callee = childExpression.callee;
      break;

     case "PipelineBareAwaitedFunction":
      bodyNode.callee = childExpression.argument;
      break;

     case "PipelineTopicExpression":
      this.topicReferenceWasUsedInCurrentTopicContext() || this.raise(startPos, ErrorMessages.PipelineTopicUnused), 
      bodyNode.expression = childExpression;
      break;

     default:
      throw new Error(`Internal @babel/parser error: Unknown pipeline style (${pipelineStyle})`);
    }
    return this.finishNode(bodyNode, pipelineStyle);
  }
  checkSmartPipelineBodyStyle(expression) {
    return expression.type, this.isSimpleReference(expression) ? "PipelineBareFunction" : "PipelineTopicExpression";
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
  withTopicPermittingContext(callback) {
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
  withTopicForbiddingContext(callback) {
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
  withSoloAwaitPermittingContext(callback) {
    const outerContextSoloAwaitState = this.state.soloAwait;
    this.state.soloAwait = !0;
    try {
      return callback();
    } finally {
      this.state.soloAwait = outerContextSoloAwaitState;
    }
  }
  registerTopicReference() {
    this.state.topicContext.maxTopicIndex = 0;
  }
  primaryTopicReferenceIsAllowedInCurrentTopicContext() {
    return this.state.topicContext.maxNumOfResolvableTopics >= 1;
  }
  topicReferenceWasUsedInCurrentTopicContext() {
    return null != this.state.topicContext.maxTopicIndex && this.state.topicContext.maxTopicIndex >= 0;
  }
  parseFSharpPipelineBody(prec, noIn) {
    const startPos = this.state.start, startLoc = this.state.startLoc;
    this.state.potentialArrowAt = this.state.start;
    const oldInFSharpPipelineDirectBody = this.state.inFSharpPipelineDirectBody;
    this.state.inFSharpPipelineDirectBody = !0;
    const ret = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, prec, noIn);
    return this.state.inFSharpPipelineDirectBody = oldInFSharpPipelineDirectBody, ret;
  }
}

const loopLabel = {
  kind: "loop"
}, switchLabel = {
  kind: "switch"
}, FUNC_NO_FLAGS = 0, FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;

class StatementParser extends ExpressionParser {
  parseTopLevel(file, program) {
    if (program.sourceType = this.options.sourceType, program.interpreter = this.parseInterpreterDirective(), 
    this.parseBlockBody(program, !0, !0, types.eof), this.inModule && !this.options.allowUndeclaredExports && this.scope.undefinedExports.size > 0) for (let _i = 0, _Array$from = Array.from(this.scope.undefinedExports); _i < _Array$from.length; _i++) {
      const [name] = _Array$from[_i], pos = this.scope.undefinedExports.get(name);
      this.raise(pos, ErrorMessages.ModuleExportUndefined, name);
    }
    return file.program = this.finishNode(program, "Program"), file.comments = this.state.comments, 
    this.options.tokens && (file.tokens = this.tokens), this.finishNode(file, "File");
  }
  stmtToDirective(stmt) {
    const expr = stmt.expression, directiveLiteral = this.startNodeAt(expr.start, expr.loc.start), directive = this.startNodeAt(stmt.start, stmt.loc.start), raw = this.input.slice(expr.start, expr.end), val = directiveLiteral.value = raw.slice(1, -1);
    return this.addExtra(directiveLiteral, "raw", raw), this.addExtra(directiveLiteral, "rawValue", val), 
    directive.value = this.finishNodeAt(directiveLiteral, "DirectiveLiteral", expr.end, expr.loc.end), 
    this.finishNodeAt(directive, "Directive", stmt.end, stmt.loc.end);
  }
  parseInterpreterDirective() {
    if (!this.match(types.interpreterDirective)) return null;
    const node = this.startNode();
    return node.value = this.state.value, this.next(), this.finishNode(node, "InterpreterDirective");
  }
  isLet(context) {
    if (!this.isContextual("let")) return !1;
    const next = this.nextTokenStart(), nextCh = this.input.charCodeAt(next);
    if (91 === nextCh) return !0;
    if (context) return !1;
    if (123 === nextCh) return !0;
    if (isIdentifierStart(nextCh)) {
      let pos = next + 1;
      for (;isIdentifierChar(this.input.charCodeAt(pos)); ) ++pos;
      const ident = this.input.slice(next, pos);
      if (!keywordRelationalOperator.test(ident)) return !0;
    }
    return !1;
  }
  parseStatement(context, topLevel) {
    return this.match(types.at) && this.parseDecorators(!0), this.parseStatementContent(context, topLevel);
  }
  parseStatementContent(context, topLevel) {
    let starttype = this.state.type;
    const node = this.startNode();
    let kind;
    switch (this.isLet(context) && (starttype = types._var, kind = "let"), starttype) {
     case types._break:
     case types._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);

     case types._debugger:
      return this.parseDebuggerStatement(node);

     case types._do:
      return this.parseDoStatement(node);

     case types._for:
      return this.parseForStatement(node);

     case types._function:
      if (46 === this.lookaheadCharCode()) break;
      return context && (this.state.strict ? this.raise(this.state.start, ErrorMessages.StrictFunction) : "if" !== context && "label" !== context && this.raise(this.state.start, ErrorMessages.SloppyFunction)), 
      this.parseFunctionStatement(node, !1, !context);

     case types._class:
      return context && this.unexpected(), this.parseClass(node, !0);

     case types._if:
      return this.parseIfStatement(node);

     case types._return:
      return this.parseReturnStatement(node);

     case types._switch:
      return this.parseSwitchStatement(node);

     case types._throw:
      return this.parseThrowStatement(node);

     case types._try:
      return this.parseTryStatement(node);

     case types._const:
     case types._var:
      return kind = kind || this.state.value, context && "var" !== kind && this.raise(this.state.start, ErrorMessages.UnexpectedLexicalDeclaration), 
      this.parseVarStatement(node, kind);

     case types._while:
      return this.parseWhileStatement(node);

     case types._with:
      return this.parseWithStatement(node);

     case types.braceL:
      return this.parseBlock();

     case types.semi:
      return this.parseEmptyStatement(node);

     case types._export:
     case types._import:
      {
        const nextTokenCharCode = this.lookaheadCharCode();
        if (40 === nextTokenCharCode || 46 === nextTokenCharCode) break;
        let result;
        return this.options.allowImportExportEverywhere || topLevel || this.raise(this.state.start, ErrorMessages.UnexpectedImportExport), 
        this.next(), starttype === types._import ? (result = this.parseImport(node), "ImportDeclaration" !== result.type || result.importKind && "value" !== result.importKind || (this.sawUnambiguousESM = !0)) : (result = this.parseExport(node), 
        ("ExportNamedDeclaration" !== result.type || result.exportKind && "value" !== result.exportKind) && ("ExportAllDeclaration" !== result.type || result.exportKind && "value" !== result.exportKind) && "ExportDefaultDeclaration" !== result.type || (this.sawUnambiguousESM = !0)), 
        this.assertModuleNodeAllowed(node), result;
      }

     default:
      if (this.isAsyncFunction()) return context && this.raise(this.state.start, ErrorMessages.AsyncFunctionInSingleStatementContext), 
      this.next(), this.parseFunctionStatement(node, !0, !context);
    }
    const maybeName = this.state.value, expr = this.parseExpression();
    return starttype === types.name && "Identifier" === expr.type && this.eat(types.colon) ? this.parseLabeledStatement(node, maybeName, expr, context) : this.parseExpressionStatement(node, expr);
  }
  assertModuleNodeAllowed(node) {
    this.options.allowImportExportEverywhere || this.inModule || this.raiseWithData(node.start, {
      code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED"
    }, ErrorMessages.ImportOutsideModule);
  }
  takeDecorators(node) {
    const decorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];
    decorators.length && (node.decorators = decorators, this.resetStartLocationFromNode(node, decorators[0]), 
    this.state.decoratorStack[this.state.decoratorStack.length - 1] = []);
  }
  canHaveLeadingDecorator() {
    return this.match(types._class);
  }
  parseDecorators(allowExport) {
    const currentContextDecorators = this.state.decoratorStack[this.state.decoratorStack.length - 1];
    for (;this.match(types.at); ) {
      const decorator = this.parseDecorator();
      currentContextDecorators.push(decorator);
    }
    if (this.match(types._export)) allowExport || this.unexpected(), this.hasPlugin("decorators") && !this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(this.state.start, ErrorMessages.DecoratorExportClass); else if (!this.canHaveLeadingDecorator()) throw this.raise(this.state.start, ErrorMessages.UnexpectedLeadingDecorator);
  }
  parseDecorator() {
    this.expectOnePlugin([ "decorators-legacy", "decorators" ]);
    const node = this.startNode();
    if (this.next(), this.hasPlugin("decorators")) {
      this.state.decoratorStack.push([]);
      const startPos = this.state.start, startLoc = this.state.startLoc;
      let expr;
      if (this.eat(types.parenL)) expr = this.parseExpression(), this.expect(types.parenR); else for (expr = this.parseIdentifier(!1); this.eat(types.dot); ) {
        const node = this.startNodeAt(startPos, startLoc);
        node.object = expr, node.property = this.parseIdentifier(!0), node.computed = !1, 
        expr = this.finishNode(node, "MemberExpression");
      }
      node.expression = this.parseMaybeDecoratorArguments(expr), this.state.decoratorStack.pop();
    } else node.expression = this.parseExprSubscripts();
    return this.finishNode(node, "Decorator");
  }
  parseMaybeDecoratorArguments(expr) {
    if (this.eat(types.parenL)) {
      const node = this.startNodeAtNode(expr);
      return node.callee = expr, node.arguments = this.parseCallExpressionArguments(types.parenR, !1), 
      this.toReferencedList(node.arguments), this.finishNode(node, "CallExpression");
    }
    return expr;
  }
  parseBreakContinueStatement(node, keyword) {
    const isBreak = "break" === keyword;
    return this.next(), this.isLineTerminator() ? node.label = null : (node.label = this.parseIdentifier(), 
    this.semicolon()), this.verifyBreakContinue(node, keyword), this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  }
  verifyBreakContinue(node, keyword) {
    const isBreak = "break" === keyword;
    let i;
    for (i = 0; i < this.state.labels.length; ++i) {
      const lab = this.state.labels[i];
      if (null == node.label || lab.name === node.label.name) {
        if (null != lab.kind && (isBreak || "loop" === lab.kind)) break;
        if (node.label && isBreak) break;
      }
    }
    i === this.state.labels.length && this.raise(node.start, ErrorMessages.IllegalBreakContinue, keyword);
  }
  parseDebuggerStatement(node) {
    return this.next(), this.semicolon(), this.finishNode(node, "DebuggerStatement");
  }
  parseHeaderExpression() {
    this.expect(types.parenL);
    const val = this.parseExpression();
    return this.expect(types.parenR), val;
  }
  parseDoStatement(node) {
    return this.next(), this.state.labels.push(loopLabel), node.body = this.withTopicForbiddingContext(() => this.parseStatement("do")), 
    this.state.labels.pop(), this.expect(types._while), node.test = this.parseHeaderExpression(), 
    this.eat(types.semi), this.finishNode(node, "DoWhileStatement");
  }
  parseForStatement(node) {
    this.next(), this.state.labels.push(loopLabel);
    let awaitAt = -1;
    if (this.isAwaitAllowed() && this.eatContextual("await") && (awaitAt = this.state.lastTokStart), 
    this.scope.enter(0), this.expect(types.parenL), this.match(types.semi)) return awaitAt > -1 && this.unexpected(awaitAt), 
    this.parseFor(node, null);
    const isLet = this.isLet();
    if (this.match(types._var) || this.match(types._const) || isLet) {
      const init = this.startNode(), kind = isLet ? "let" : this.state.value;
      return this.next(), this.parseVar(init, !0, kind), this.finishNode(init, "VariableDeclaration"), 
      (this.match(types._in) || this.isContextual("of")) && 1 === init.declarations.length ? this.parseForIn(node, init, awaitAt) : (awaitAt > -1 && this.unexpected(awaitAt), 
      this.parseFor(node, init));
    }
    const refExpressionErrors = new ExpressionErrors, init = this.parseExpression(!0, refExpressionErrors);
    if (this.match(types._in) || this.isContextual("of")) {
      this.toAssignable(init);
      const description = this.isContextual("of") ? "for-of statement" : "for-in statement";
      return this.checkLVal(init, void 0, void 0, description), this.parseForIn(node, init, awaitAt);
    }
    return this.checkExpressionErrors(refExpressionErrors, !0), awaitAt > -1 && this.unexpected(awaitAt), 
    this.parseFor(node, init);
  }
  parseFunctionStatement(node, isAsync, declarationPosition) {
    return this.next(), this.parseFunction(node, 1 | (declarationPosition ? 0 : 2), isAsync);
  }
  parseIfStatement(node) {
    return this.next(), node.test = this.parseHeaderExpression(), node.consequent = this.parseStatement("if"), 
    node.alternate = this.eat(types._else) ? this.parseStatement("if") : null, this.finishNode(node, "IfStatement");
  }
  parseReturnStatement(node) {
    return this.prodParam.hasReturn || this.options.allowReturnOutsideFunction || this.raise(this.state.start, ErrorMessages.IllegalReturn), 
    this.next(), this.isLineTerminator() ? node.argument = null : (node.argument = this.parseExpression(), 
    this.semicolon()), this.finishNode(node, "ReturnStatement");
  }
  parseSwitchStatement(node) {
    this.next(), node.discriminant = this.parseHeaderExpression();
    const cases = node.cases = [];
    let cur, sawDefault;
    for (this.expect(types.braceL), this.state.labels.push(switchLabel), this.scope.enter(0); !this.match(types.braceR); ) if (this.match(types._case) || this.match(types._default)) {
      const isCase = this.match(types._case);
      cur && this.finishNode(cur, "SwitchCase"), cases.push(cur = this.startNode()), cur.consequent = [], 
      this.next(), isCase ? cur.test = this.parseExpression() : (sawDefault && this.raise(this.state.lastTokStart, ErrorMessages.MultipleDefaultsInSwitch), 
      sawDefault = !0, cur.test = null), this.expect(types.colon);
    } else cur ? cur.consequent.push(this.parseStatement(null)) : this.unexpected();
    return this.scope.exit(), cur && this.finishNode(cur, "SwitchCase"), this.next(), 
    this.state.labels.pop(), this.finishNode(node, "SwitchStatement");
  }
  parseThrowStatement(node) {
    return this.next(), lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start)) && this.raise(this.state.lastTokEnd, ErrorMessages.NewlineAfterThrow), 
    node.argument = this.parseExpression(), this.semicolon(), this.finishNode(node, "ThrowStatement");
  }
  parseTryStatement(node) {
    if (this.next(), node.block = this.parseBlock(), node.handler = null, this.match(types._catch)) {
      const clause = this.startNode();
      if (this.next(), this.match(types.parenL)) {
        this.expect(types.parenL), clause.param = this.parseBindingAtom();
        const simple = "Identifier" === clause.param.type;
        this.scope.enter(simple ? 8 : 0), this.checkLVal(clause.param, 9, null, "catch clause"), 
        this.expect(types.parenR);
      } else clause.param = null, this.scope.enter(0);
      clause.body = this.withTopicForbiddingContext(() => this.parseBlock(!1, !1)), this.scope.exit(), 
      node.handler = this.finishNode(clause, "CatchClause");
    }
    return node.finalizer = this.eat(types._finally) ? this.parseBlock() : null, node.handler || node.finalizer || this.raise(node.start, ErrorMessages.NoCatchOrFinally), 
    this.finishNode(node, "TryStatement");
  }
  parseVarStatement(node, kind) {
    return this.next(), this.parseVar(node, !1, kind), this.semicolon(), this.finishNode(node, "VariableDeclaration");
  }
  parseWhileStatement(node) {
    return this.next(), node.test = this.parseHeaderExpression(), this.state.labels.push(loopLabel), 
    node.body = this.withTopicForbiddingContext(() => this.parseStatement("while")), 
    this.state.labels.pop(), this.finishNode(node, "WhileStatement");
  }
  parseWithStatement(node) {
    return this.state.strict && this.raise(this.state.start, ErrorMessages.StrictWith), 
    this.next(), node.object = this.parseHeaderExpression(), node.body = this.withTopicForbiddingContext(() => this.parseStatement("with")), 
    this.finishNode(node, "WithStatement");
  }
  parseEmptyStatement(node) {
    return this.next(), this.finishNode(node, "EmptyStatement");
  }
  parseLabeledStatement(node, maybeName, expr, context) {
    for (let _i2 = 0, _this$state$labels = this.state.labels; _i2 < _this$state$labels.length; _i2++) {
      _this$state$labels[_i2].name === maybeName && this.raise(expr.start, ErrorMessages.LabelRedeclaration, maybeName);
    }
    const kind = this.state.type.isLoop ? "loop" : this.match(types._switch) ? "switch" : null;
    for (let i = this.state.labels.length - 1; i >= 0; i--) {
      const label = this.state.labels[i];
      if (label.statementStart !== node.start) break;
      label.statementStart = this.state.start, label.kind = kind;
    }
    return this.state.labels.push({
      name: maybeName,
      kind: kind,
      statementStart: this.state.start
    }), node.body = this.parseStatement(context ? -1 === context.indexOf("label") ? context + "label" : context : "label"), 
    this.state.labels.pop(), node.label = expr, this.finishNode(node, "LabeledStatement");
  }
  parseExpressionStatement(node, expr) {
    return node.expression = expr, this.semicolon(), this.finishNode(node, "ExpressionStatement");
  }
  parseBlock(allowDirectives = !1, createNewLexicalScope = !0, afterBlockParse) {
    const node = this.startNode();
    return this.expect(types.braceL), createNewLexicalScope && this.scope.enter(0), 
    this.parseBlockBody(node, allowDirectives, !1, types.braceR, afterBlockParse), createNewLexicalScope && this.scope.exit(), 
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
    const octalPositions = [], oldStrict = this.state.strict;
    let hasStrictModeDirective = !1, parsedNonDirective = !1;
    for (;!this.match(end); ) {
      !parsedNonDirective && this.state.octalPositions.length && octalPositions.push(...this.state.octalPositions);
      const stmt = this.parseStatement(null, topLevel);
      if (directives && !parsedNonDirective && this.isValidDirective(stmt)) {
        const directive = this.stmtToDirective(stmt);
        directives.push(directive), hasStrictModeDirective || "use strict" !== directive.value.value || (hasStrictModeDirective = !0, 
        this.setStrict(!0));
      } else parsedNonDirective = !0, body.push(stmt);
    }
    if (this.state.strict && octalPositions.length) for (let _i3 = 0; _i3 < octalPositions.length; _i3++) {
      const pos = octalPositions[_i3];
      this.raise(pos, ErrorMessages.StrictOctalLiteral);
    }
    afterBlockParse && afterBlockParse.call(this, hasStrictModeDirective), oldStrict || this.setStrict(!1), 
    this.next();
  }
  parseFor(node, init) {
    return node.init = init, this.expect(types.semi), node.test = this.match(types.semi) ? null : this.parseExpression(), 
    this.expect(types.semi), node.update = this.match(types.parenR) ? null : this.parseExpression(), 
    this.expect(types.parenR), node.body = this.withTopicForbiddingContext(() => this.parseStatement("for")), 
    this.scope.exit(), this.state.labels.pop(), this.finishNode(node, "ForStatement");
  }
  parseForIn(node, init, awaitAt) {
    const isForIn = this.match(types._in);
    return this.next(), isForIn ? awaitAt > -1 && this.unexpected(awaitAt) : node.await = awaitAt > -1, 
    "VariableDeclaration" !== init.type || null == init.declarations[0].init || isForIn && !this.state.strict && "var" === init.kind && "Identifier" === init.declarations[0].id.type ? "AssignmentPattern" === init.type && this.raise(init.start, ErrorMessages.InvalidLhs, "for-loop") : this.raise(init.start, ErrorMessages.ForInOfLoopInitializer, isForIn ? "for-in" : "for-of"), 
    node.left = init, node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign(), 
    this.expect(types.parenR), node.body = this.withTopicForbiddingContext(() => this.parseStatement("for")), 
    this.scope.exit(), this.state.labels.pop(), this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  }
  parseVar(node, isFor, kind) {
    const declarations = node.declarations = [], isTypescript = this.hasPlugin("typescript");
    for (node.kind = kind; ;) {
      const decl = this.startNode();
      if (this.parseVarId(decl, kind), this.eat(types.eq) ? decl.init = this.parseMaybeAssign(isFor) : ("const" !== kind || this.match(types._in) || this.isContextual("of") ? "Identifier" === decl.id.type || isFor && (this.match(types._in) || this.isContextual("of")) || this.raise(this.state.lastTokEnd, ErrorMessages.DeclarationMissingInitializer, "Complex binding patterns") : isTypescript || this.unexpected(), 
      decl.init = null), declarations.push(this.finishNode(decl, "VariableDeclarator")), 
      !this.eat(types.comma)) break;
    }
    return node;
  }
  parseVarId(decl, kind) {
    decl.id = this.parseBindingAtom(), this.checkLVal(decl.id, "var" === kind ? 5 : 9, void 0, "variable declaration", "var" !== kind);
  }
  parseFunction(node, statement = 0, isAsync = !1) {
    const isStatement = 1 & statement, isHangingStatement = 2 & statement, requireId = !(!isStatement || 4 & statement);
    this.initFunction(node, isAsync), this.match(types.star) && isHangingStatement && this.raise(this.state.start, ErrorMessages.GeneratorInSingleStatementContext), 
    node.generator = this.eat(types.star), isStatement && (node.id = this.parseFunctionId(requireId));
    const oldMaybeInArrowParameters = this.state.maybeInArrowParameters, oldYieldPos = this.state.yieldPos, oldAwaitPos = this.state.awaitPos;
    return this.state.maybeInArrowParameters = !1, this.state.yieldPos = -1, this.state.awaitPos = -1, 
    this.scope.enter(2), this.prodParam.enter(functionFlags(isAsync, node.generator)), 
    isStatement || (node.id = this.parseFunctionId()), this.parseFunctionParams(node), 
    this.withTopicForbiddingContext(() => {
      this.parseFunctionBodyAndFinish(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
    }), this.prodParam.exit(), this.scope.exit(), isStatement && !isHangingStatement && this.registerFunctionStatementId(node), 
    this.state.maybeInArrowParameters = oldMaybeInArrowParameters, this.state.yieldPos = oldYieldPos, 
    this.state.awaitPos = oldAwaitPos, node;
  }
  parseFunctionId(requireId) {
    return requireId || this.match(types.name) ? this.parseIdentifier() : null;
  }
  parseFunctionParams(node, allowModifiers) {
    const oldInParameters = this.state.inParameters;
    this.state.inParameters = !0, this.expect(types.parenL), node.params = this.parseBindingList(types.parenR, 41, !1, allowModifiers), 
    this.state.inParameters = oldInParameters, this.checkYieldAwaitInDefaultParams();
  }
  registerFunctionStatementId(node) {
    node.id && this.scope.declareName(node.id.name, this.state.strict || node.generator || node.async ? this.scope.treatFunctionsAsVar ? 5 : 9 : 17, node.id.start);
  }
  parseClass(node, isStatement, optionalId) {
    this.next(), this.takeDecorators(node);
    const oldStrict = this.state.strict;
    return this.state.strict = !0, this.parseClassId(node, isStatement, optionalId), 
    this.parseClassSuper(node), node.body = this.parseClassBody(!!node.superClass, oldStrict), 
    this.state.strict = oldStrict, this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  }
  isClassProperty() {
    return this.match(types.eq) || this.match(types.semi) || this.match(types.braceR);
  }
  isClassMethod() {
    return this.match(types.parenL);
  }
  isNonstaticConstructor(method) {
    return !(method.computed || method.static || "constructor" !== method.key.name && "constructor" !== method.key.value);
  }
  parseClassBody(constructorAllowsSuper, oldStrict) {
    this.classScope.enter();
    const state = {
      hadConstructor: !1
    };
    let decorators = [];
    const classBody = this.startNode();
    if (classBody.body = [], this.expect(types.braceL), this.withTopicForbiddingContext(() => {
      for (;!this.match(types.braceR); ) {
        if (this.eat(types.semi)) {
          if (decorators.length > 0) throw this.raise(this.state.lastTokEnd, ErrorMessages.DecoratorSemicolon);
          continue;
        }
        if (this.match(types.at)) {
          decorators.push(this.parseDecorator());
          continue;
        }
        const member = this.startNode();
        decorators.length && (member.decorators = decorators, this.resetStartLocationFromNode(member, decorators[0]), 
        decorators = []), this.parseClassMember(classBody, member, state, constructorAllowsSuper), 
        "constructor" === member.kind && member.decorators && member.decorators.length > 0 && this.raise(member.start, ErrorMessages.DecoratorConstructor);
      }
    }), oldStrict || (this.state.strict = !1), this.next(), decorators.length) throw this.raise(this.state.start, ErrorMessages.TrailingDecorator);
    return this.classScope.exit(), this.finishNode(classBody, "ClassBody");
  }
  parseClassMemberFromModifier(classBody, member) {
    const containsEsc = this.state.containsEsc, key = this.parseIdentifier(!0);
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
    if (containsEsc) throw this.unexpected();
    return !1;
  }
  parseClassMember(classBody, member, state, constructorAllowsSuper) {
    const isStatic = this.isContextual("static");
    isStatic && this.parseClassMemberFromModifier(classBody, member) || this.parseClassMemberWithIsStatic(classBody, member, state, isStatic, constructorAllowsSuper);
  }
  parseClassMemberWithIsStatic(classBody, member, state, isStatic, constructorAllowsSuper) {
    const publicMethod = member, privateMethod = member, publicProp = member, privateProp = member, method = publicMethod, publicMember = publicMethod;
    if (member.static = isStatic, this.eat(types.star)) return method.kind = "method", 
    this.parseClassPropertyName(method), "PrivateName" === method.key.type ? void this.pushClassPrivateMethod(classBody, privateMethod, !0, !1) : (this.isNonstaticConstructor(publicMethod) && this.raise(publicMethod.key.start, ErrorMessages.ConstructorIsGenerator), 
    void this.pushClassMethod(classBody, publicMethod, !0, !1, !1, !1));
    const containsEsc = this.state.containsEsc, key = this.parseClassPropertyName(member), isPrivate = "PrivateName" === key.type, isSimple = "Identifier" === key.type, maybeQuestionTokenStart = this.state.start;
    if (this.parsePostMemberNameModifiers(publicMember), this.isClassMethod()) {
      if (method.kind = "method", isPrivate) return void this.pushClassPrivateMethod(classBody, privateMethod, !1, !1);
      const isConstructor = this.isNonstaticConstructor(publicMethod);
      let allowsDirectSuper = !1;
      isConstructor && (publicMethod.kind = "constructor", state.hadConstructor && !this.hasPlugin("typescript") && this.raise(key.start, ErrorMessages.DuplicateConstructor), 
      state.hadConstructor = !0, allowsDirectSuper = constructorAllowsSuper), this.pushClassMethod(classBody, publicMethod, !1, !1, isConstructor, allowsDirectSuper);
    } else if (this.isClassProperty()) isPrivate ? this.pushClassPrivateProperty(classBody, privateProp) : this.pushClassProperty(classBody, publicProp); else if (!isSimple || "async" !== key.name || containsEsc || this.isLineTerminator()) !isSimple || "get" !== key.name && "set" !== key.name || containsEsc || this.match(types.star) && this.isLineTerminator() ? this.isLineTerminator() ? isPrivate ? this.pushClassPrivateProperty(classBody, privateProp) : this.pushClassProperty(classBody, publicProp) : this.unexpected() : (method.kind = key.name, 
    this.parseClassPropertyName(publicMethod), "PrivateName" === method.key.type ? this.pushClassPrivateMethod(classBody, privateMethod, !1, !1) : (this.isNonstaticConstructor(publicMethod) && this.raise(publicMethod.key.start, ErrorMessages.ConstructorIsAccessor), 
    this.pushClassMethod(classBody, publicMethod, !1, !1, !1, !1)), this.checkGetterSetterParams(publicMethod)); else {
      const isGenerator = this.eat(types.star);
      publicMember.optional && this.unexpected(maybeQuestionTokenStart), method.kind = "method", 
      this.parseClassPropertyName(method), this.parsePostMemberNameModifiers(publicMember), 
      "PrivateName" === method.key.type ? this.pushClassPrivateMethod(classBody, privateMethod, isGenerator, !0) : (this.isNonstaticConstructor(publicMethod) && this.raise(publicMethod.key.start, ErrorMessages.ConstructorIsAsync), 
      this.pushClassMethod(classBody, publicMethod, isGenerator, !0, !1, !1));
    }
  }
  parseClassPropertyName(member) {
    const key = this.parsePropertyName(member, !0);
    return member.computed || !member.static || "prototype" !== key.name && "prototype" !== key.value || this.raise(key.start, ErrorMessages.StaticPrototype), 
    "PrivateName" === key.type && "constructor" === key.id.name && this.raise(key.start, ErrorMessages.ConstructorClassPrivateField), 
    key;
  }
  pushClassProperty(classBody, prop) {
    prop.computed || "constructor" !== prop.key.name && "constructor" !== prop.key.value || this.raise(prop.key.start, ErrorMessages.ConstructorClassField), 
    classBody.body.push(this.parseClassProperty(prop));
  }
  pushClassPrivateProperty(classBody, prop) {
    this.expectPlugin("classPrivateProperties", prop.key.start);
    const node = this.parseClassPrivateProperty(prop);
    classBody.body.push(node), this.classScope.declarePrivateName(node.key.id.name, 0, node.key.start);
  }
  pushClassMethod(classBody, method, isGenerator, isAsync, isConstructor, allowsDirectSuper) {
    classBody.body.push(this.parseMethod(method, isGenerator, isAsync, isConstructor, allowsDirectSuper, "ClassMethod", !0));
  }
  pushClassPrivateMethod(classBody, method, isGenerator, isAsync) {
    this.expectPlugin("classPrivateMethods", method.key.start);
    const node = this.parseMethod(method, isGenerator, isAsync, !1, !1, "ClassPrivateMethod", !0);
    classBody.body.push(node);
    const kind = "get" === node.kind ? node.static ? 6 : 2 : "set" === node.kind ? node.static ? 5 : 1 : 0;
    this.classScope.declarePrivateName(node.key.id.name, kind, node.key.start);
  }
  parsePostMemberNameModifiers(methodOrProp) {}
  parseAccessModifier() {}
  parseClassPrivateProperty(node) {
    return this.scope.enter(80), this.prodParam.enter(0), node.value = this.eat(types.eq) ? this.parseMaybeAssign() : null, 
    this.semicolon(), this.prodParam.exit(), this.scope.exit(), this.finishNode(node, "ClassPrivateProperty");
  }
  parseClassProperty(node) {
    return node.typeAnnotation || this.expectPlugin("classProperties"), this.scope.enter(80), 
    this.prodParam.enter(0), this.match(types.eq) ? (this.expectPlugin("classProperties"), 
    this.next(), node.value = this.parseMaybeAssign()) : node.value = null, this.semicolon(), 
    this.prodParam.exit(), this.scope.exit(), this.finishNode(node, "ClassProperty");
  }
  parseClassId(node, isStatement, optionalId, bindingType = 139) {
    this.match(types.name) ? (node.id = this.parseIdentifier(), isStatement && this.checkLVal(node.id, bindingType, void 0, "class name")) : optionalId || !isStatement ? node.id = null : this.unexpected(null, ErrorMessages.MissingClassName);
  }
  parseClassSuper(node) {
    node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
  }
  parseExport(node) {
    const hasDefault = this.maybeParseExportDefaultSpecifier(node), parseAfterDefault = !hasDefault || this.eat(types.comma), hasStar = parseAfterDefault && this.eatExportStar(node), hasNamespace = hasStar && this.maybeParseExportNamespaceSpecifier(node), parseAfterNamespace = parseAfterDefault && (!hasNamespace || this.eat(types.comma)), isFromRequired = hasDefault || hasStar;
    if (hasStar && !hasNamespace) return hasDefault && this.unexpected(), this.parseExportFrom(node, !0), 
    this.finishNode(node, "ExportAllDeclaration");
    const hasSpecifiers = this.maybeParseExportNamedSpecifiers(node);
    if (hasDefault && parseAfterDefault && !hasStar && !hasSpecifiers || hasNamespace && parseAfterNamespace && !hasSpecifiers) throw this.unexpected(null, types.braceL);
    let hasDeclaration;
    if (isFromRequired || hasSpecifiers ? (hasDeclaration = !1, this.parseExportFrom(node, isFromRequired)) : hasDeclaration = this.maybeParseExportDeclaration(node), 
    isFromRequired || hasSpecifiers || hasDeclaration) return this.checkExport(node, !0, !1, !!node.source), 
    this.finishNode(node, "ExportNamedDeclaration");
    if (this.eat(types._default)) return node.declaration = this.parseExportDefaultExpression(), 
    this.checkExport(node, !0, !0), this.finishNode(node, "ExportDefaultDeclaration");
    throw this.unexpected(null, types.braceL);
  }
  eatExportStar(node) {
    return this.eat(types.star);
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
    if (this.isContextual("as")) {
      node.specifiers || (node.specifiers = []);
      const specifier = this.startNodeAt(this.state.lastTokStart, this.state.lastTokStartLoc);
      return this.next(), specifier.exported = this.parseIdentifier(!0), node.specifiers.push(this.finishNode(specifier, "ExportNamespaceSpecifier")), 
      !0;
    }
    return !1;
  }
  maybeParseExportNamedSpecifiers(node) {
    return !!this.match(types.braceL) && (node.specifiers || (node.specifiers = []), 
    node.specifiers.push(...this.parseExportSpecifiers()), node.source = null, node.declaration = null, 
    !0);
  }
  maybeParseExportDeclaration(node) {
    if (this.shouldParseExportDeclaration()) {
      if (this.isContextual("async")) {
        const next = this.nextTokenStart();
        this.isUnparsedContextual(next, "function") || this.unexpected(next, types._function);
      }
      return node.specifiers = [], node.source = null, node.declaration = this.parseExportDeclaration(node), 
      !0;
    }
    return !1;
  }
  isAsyncFunction() {
    if (!this.isContextual("async")) return !1;
    const next = this.nextTokenStart();
    return !lineBreak.test(this.input.slice(this.state.pos, next)) && this.isUnparsedContextual(next, "function");
  }
  parseExportDefaultExpression() {
    const expr = this.startNode(), isAsync = this.isAsyncFunction();
    if (this.match(types._function) || isAsync) return this.next(), isAsync && this.next(), 
    this.parseFunction(expr, 5, isAsync);
    if (this.match(types._class)) return this.parseClass(expr, !0, !0);
    if (this.match(types.at)) return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") && this.raise(this.state.start, ErrorMessages.DecoratorBeforeExport), 
    this.parseDecorators(!1), this.parseClass(expr, !0, !0);
    if (this.match(types._const) || this.match(types._var) || this.isLet()) throw this.raise(this.state.start, ErrorMessages.UnsupportedDefaultExport);
    {
      const res = this.parseMaybeAssign();
      return this.semicolon(), res;
    }
  }
  parseExportDeclaration(node) {
    return this.parseStatement(null);
  }
  isExportDefaultSpecifier() {
    if (this.match(types.name)) {
      const value = this.state.value;
      if ("async" === value || "let" === value) return !1;
      if (("type" === value || "interface" === value) && !this.state.containsEsc) {
        const l = this.lookahead();
        if (l.type === types.name && "from" !== l.value || l.type === types.braceL) return this.expectOnePlugin([ "flow", "typescript" ]), 
        !1;
      }
    } else if (!this.match(types._default)) return !1;
    const next = this.nextTokenStart(), hasFrom = this.isUnparsedContextual(next, "from");
    if (44 === this.input.charCodeAt(next) || this.match(types.name) && hasFrom) return !0;
    if (this.match(types._default) && hasFrom) {
      const nextAfterFrom = this.input.charCodeAt(this.nextTokenStartSince(next + 4));
      return 34 === nextAfterFrom || 39 === nextAfterFrom;
    }
    return !1;
  }
  parseExportFrom(node, expect) {
    this.eatContextual("from") ? (node.source = this.parseImportSource(), this.checkExport(node)) : expect ? this.unexpected() : node.source = null, 
    this.semicolon();
  }
  shouldParseExportDeclaration() {
    if (this.match(types.at) && (this.expectOnePlugin([ "decorators", "decorators-legacy" ]), 
    this.hasPlugin("decorators"))) {
      if (!this.getPluginOption("decorators", "decoratorsBeforeExport")) return !0;
      this.unexpected(this.state.start, ErrorMessages.DecoratorBeforeExport);
    }
    return "var" === this.state.type.keyword || "const" === this.state.type.keyword || "function" === this.state.type.keyword || "class" === this.state.type.keyword || this.isLet() || this.isAsyncFunction();
  }
  checkExport(node, checkNames, isDefault, isFrom) {
    if (checkNames) if (isDefault) {
      if (this.checkDuplicateExports(node, "default"), this.hasPlugin("exportDefaultFrom")) {
        var _declaration$extra;
        const declaration = node.declaration;
        "Identifier" !== declaration.type || "from" !== declaration.name || declaration.end - declaration.start != 4 || (null == (_declaration$extra = declaration.extra) ? void 0 : _declaration$extra.parenthesized) || this.raise(declaration.start, ErrorMessages.ExportDefaultFromAsIdentifier);
      }
    } else if (node.specifiers && node.specifiers.length) for (let _i4 = 0, _node$specifiers = node.specifiers; _i4 < _node$specifiers.length; _i4++) {
      const specifier = _node$specifiers[_i4];
      this.checkDuplicateExports(specifier, specifier.exported.name), !isFrom && specifier.local && (this.checkReservedWord(specifier.local.name, specifier.local.start, !0, !1), 
      this.scope.checkLocalExport(specifier.local));
    } else if (node.declaration) if ("FunctionDeclaration" === node.declaration.type || "ClassDeclaration" === node.declaration.type) {
      const id = node.declaration.id;
      if (!id) throw new Error("Assertion failure");
      this.checkDuplicateExports(node, id.name);
    } else if ("VariableDeclaration" === node.declaration.type) for (let _i5 = 0, _node$declaration$dec = node.declaration.declarations; _i5 < _node$declaration$dec.length; _i5++) {
      const declaration = _node$declaration$dec[_i5];
      this.checkDeclaration(declaration.id);
    }
    if (this.state.decoratorStack[this.state.decoratorStack.length - 1].length) {
      const isClass = node.declaration && ("ClassDeclaration" === node.declaration.type || "ClassExpression" === node.declaration.type);
      if (!node.declaration || !isClass) throw this.raise(node.start, ErrorMessages.UnsupportedDecoratorExport);
      this.takeDecorators(node.declaration);
    }
  }
  checkDeclaration(node) {
    if ("Identifier" === node.type) this.checkDuplicateExports(node, node.name); else if ("ObjectPattern" === node.type) for (let _i6 = 0, _node$properties = node.properties; _i6 < _node$properties.length; _i6++) {
      const prop = _node$properties[_i6];
      this.checkDeclaration(prop);
    } else if ("ArrayPattern" === node.type) for (let _i7 = 0, _node$elements = node.elements; _i7 < _node$elements.length; _i7++) {
      const elem = _node$elements[_i7];
      elem && this.checkDeclaration(elem);
    } else "ObjectProperty" === node.type ? this.checkDeclaration(node.value) : "RestElement" === node.type ? this.checkDeclaration(node.argument) : "AssignmentPattern" === node.type && this.checkDeclaration(node.left);
  }
  checkDuplicateExports(node, name) {
    this.state.exportedIdentifiers.indexOf(name) > -1 && this.raise(node.start, "default" === name ? ErrorMessages.DuplicateDefaultExport : ErrorMessages.DuplicateExport, name), 
    this.state.exportedIdentifiers.push(name);
  }
  parseExportSpecifiers() {
    const nodes = [];
    let first = !0;
    for (this.expect(types.braceL); !this.eat(types.braceR); ) {
      if (first) first = !1; else if (this.expect(types.comma), this.eat(types.braceR)) break;
      const node = this.startNode();
      node.local = this.parseIdentifier(!0), node.exported = this.eatContextual("as") ? this.parseIdentifier(!0) : node.local.__clone(), 
      nodes.push(this.finishNode(node, "ExportSpecifier"));
    }
    return nodes;
  }
  parseImport(node) {
    if (node.specifiers = [], !this.match(types.string)) {
      const parseNext = !this.maybeParseDefaultImportSpecifier(node) || this.eat(types.comma), hasStar = parseNext && this.maybeParseStarImportSpecifier(node);
      parseNext && !hasStar && this.parseNamedImportSpecifiers(node), this.expectContextual("from");
    }
    node.source = this.parseImportSource();
    const attributes = this.maybeParseModuleAttributes();
    return attributes && (node.attributes = attributes), this.semicolon(), this.finishNode(node, "ImportDeclaration");
  }
  parseImportSource() {
    return this.match(types.string) || this.unexpected(), this.parseExprAtom();
  }
  shouldParseDefaultImport(node) {
    return this.match(types.name);
  }
  parseImportSpecifierLocal(node, specifier, type, contextDescription) {
    specifier.local = this.parseIdentifier(), this.checkLVal(specifier.local, 9, void 0, contextDescription), 
    node.specifiers.push(this.finishNode(specifier, type));
  }
  maybeParseModuleAttributes() {
    if (!this.match(types._with) || this.hasPrecedingLineBreak()) return this.hasPlugin("moduleAttributes") ? [] : null;
    this.expectPlugin("moduleAttributes"), this.next();
    const attrs = [], attributes = new Set;
    do {
      const node = this.startNode();
      if (node.key = this.parseIdentifier(!0), "type" !== node.key.name && this.raise(node.key.start, ErrorMessages.ModuleAttributeDifferentFromType, node.key.name), 
      attributes.has(node.key.name) && this.raise(node.key.start, ErrorMessages.ModuleAttributesWithDuplicateKeys, node.key.name), 
      attributes.add(node.key.name), this.expect(types.colon), !this.match(types.string)) throw this.unexpected(this.state.start, ErrorMessages.ModuleAttributeInvalidValue);
      node.value = this.parseLiteral(this.state.value, "StringLiteral"), this.finishNode(node, "ImportAttribute"), 
      attrs.push(node);
    } while (this.eat(types.comma));
    return attrs;
  }
  maybeParseDefaultImportSpecifier(node) {
    return !!this.shouldParseDefaultImport(node) && (this.parseImportSpecifierLocal(node, this.startNode(), "ImportDefaultSpecifier", "default import specifier"), 
    !0);
  }
  maybeParseStarImportSpecifier(node) {
    if (this.match(types.star)) {
      const specifier = this.startNode();
      return this.next(), this.expectContextual("as"), this.parseImportSpecifierLocal(node, specifier, "ImportNamespaceSpecifier", "import namespace specifier"), 
      !0;
    }
    return !1;
  }
  parseNamedImportSpecifiers(node) {
    let first = !0;
    for (this.expect(types.braceL); !this.eat(types.braceR); ) {
      if (first) first = !1; else {
        if (this.eat(types.colon)) throw this.raise(this.state.start, ErrorMessages.DestructureNamedImport);
        if (this.expect(types.comma), this.eat(types.braceR)) break;
      }
      this.parseImportSpecifier(node);
    }
  }
  parseImportSpecifier(node) {
    const specifier = this.startNode();
    specifier.imported = this.parseIdentifier(!0), this.eatContextual("as") ? specifier.local = this.parseIdentifier() : (this.checkReservedWord(specifier.imported.name, specifier.start, !0, !0), 
    specifier.local = specifier.imported.__clone()), this.checkLVal(specifier.local, 9, void 0, "import specifier"), 
    node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
  }
}

class ClassScope {
  constructor() {
    this.privateNames = new Set, this.loneAccessors = new Map, this.undefinedPrivateNames = new Map;
  }
}

class ClassScopeHandler {
  constructor(raise) {
    this.stack = [], this.undefinedPrivateNames = new Map, this.raise = raise;
  }
  current() {
    return this.stack[this.stack.length - 1];
  }
  enter() {
    this.stack.push(new ClassScope);
  }
  exit() {
    const oldClassScope = this.stack.pop(), current = this.current();
    for (let _i = 0, _Array$from = Array.from(oldClassScope.undefinedPrivateNames); _i < _Array$from.length; _i++) {
      const [name, pos] = _Array$from[_i];
      current ? current.undefinedPrivateNames.has(name) || current.undefinedPrivateNames.set(name, pos) : this.raise(pos, ErrorMessages.InvalidPrivateFieldResolution, name);
    }
  }
  declarePrivateName(name, elementType, pos) {
    const classScope = this.current();
    let redefined = classScope.privateNames.has(name);
    if (3 & elementType) {
      const accessor = redefined && classScope.loneAccessors.get(name);
      if (accessor) {
        const oldStatic = 4 & accessor, newStatic = 4 & elementType;
        redefined = (3 & accessor) === (3 & elementType) || oldStatic !== newStatic, redefined || classScope.loneAccessors.delete(name);
      } else redefined || classScope.loneAccessors.set(name, elementType);
    }
    redefined && this.raise(pos, ErrorMessages.PrivateNameRedeclaration, name), classScope.privateNames.add(name), 
    classScope.undefinedPrivateNames.delete(name);
  }
  usePrivateName(name, pos) {
    let classScope;
    for (let _i2 = 0, _this$stack = this.stack; _i2 < _this$stack.length; _i2++) if (classScope = _this$stack[_i2], 
    classScope.privateNames.has(name)) return;
    classScope ? classScope.undefinedPrivateNames.set(name, pos) : this.raise(pos, ErrorMessages.InvalidPrivateFieldResolution, name);
  }
}

class Parser extends StatementParser {
  constructor(options, input) {
    super(options = getOptions(options), input);
    const ScopeHandler = this.getScopeHandler();
    this.options = options, this.inModule = "module" === this.options.sourceType, this.scope = new ScopeHandler(this.raise.bind(this), this.inModule), 
    this.prodParam = new ProductionParameterHandler, this.classScope = new ClassScopeHandler(this.raise.bind(this)), 
    this.plugins = pluginsMap(this.options.plugins), this.filename = options.sourceFilename;
  }
  getScopeHandler() {
    return ScopeHandler;
  }
  parse() {
    let paramFlags = 0;
    this.hasPlugin("topLevelAwait") && this.inModule && (paramFlags |= 2), this.scope.enter(1), 
    this.prodParam.enter(paramFlags);
    const file = this.startNode(), program = this.startNode();
    return this.nextToken(), file.errors = null, this.parseTopLevel(file, program), 
    file.errors = this.state.errors, file;
  }
}

function pluginsMap(plugins) {
  const pluginMap = new Map;
  for (let _i = 0; _i < plugins.length; _i++) {
    const plugin = plugins[_i], [name, options] = Array.isArray(plugin) ? plugin : [ plugin, {} ];
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

function getParser(options, input) {
  let cls = Parser;
  return (null == options ? void 0 : options.plugins) && (validatePlugins(options.plugins), 
  cls = getParserClass(options.plugins)), new cls(options, input);
}

const parserClassCache = {};

function getParserClass(pluginsFromOptions) {
  const pluginList = mixinPluginNames.filter(name => hasPlugin(pluginsFromOptions, name)), key = pluginList.join("/");
  let cls = parserClassCache[key];
  if (!cls) {
    cls = Parser;
    for (let _i = 0; _i < pluginList.length; _i++) {
      const plugin = pluginList[_i];
      cls = mixinPlugins[plugin](cls);
    }
    parserClassCache[key] = cls;
  }
  return cls;
}

exports.parse = parse, exports.parseExpression = parseExpression, exports.tokTypes = types;