(() => {
  var __webpack_modules__ = {
    4709: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.codeFrameColumns = codeFrameColumns, exports.default = function(rawLines, lineNumber, colNumber, opts = {}) {
        if (!deprecationWarningShown) {
          deprecationWarningShown = !0;
          const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
          if (process.emitWarning) process.emitWarning(message, "DeprecationWarning"); else {
            new Error(message).name = "DeprecationWarning", console.warn(new Error(message));
          }
        }
        colNumber = Math.max(colNumber, 0);
        return codeFrameColumns(rawLines, {
          start: {
            column: colNumber,
            line: lineNumber
          }
        }, opts);
      };
      var _highlight = __webpack_require__(3014);
      let deprecationWarningShown = !1;
      const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
      function codeFrameColumns(rawLines, loc, opts = {}) {
        const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts), chalk = (0, 
        _highlight.getChalk)(opts), defs = function(chalk) {
          return {
            gutter: chalk.grey,
            marker: chalk.red.bold,
            message: chalk.red.bold
          };
        }(chalk), maybeHighlight = (chalkFn, string) => highlighted ? chalkFn(string) : string, lines = rawLines.split(NEWLINE), {start, end, markerLines} = function(loc, source, opts) {
          const startLoc = Object.assign({
            column: 0,
            line: -1
          }, loc.start), endLoc = Object.assign({}, startLoc, loc.end), {linesAbove = 2, linesBelow = 3} = opts || {}, startLine = startLoc.line, startColumn = startLoc.column, endLine = endLoc.line, endColumn = endLoc.column;
          let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
          -1 === startLine && (start = 0), -1 === endLine && (end = source.length);
          const lineDiff = endLine - startLine, markerLines = {};
          if (lineDiff) for (let i = 0; i <= lineDiff; i++) {
            const lineNumber = i + startLine;
            if (startColumn) if (0 === i) {
              const sourceLength = source[lineNumber - 1].length;
              markerLines[lineNumber] = [ startColumn, sourceLength - startColumn + 1 ];
            } else if (i === lineDiff) markerLines[lineNumber] = [ 0, endColumn ]; else {
              const sourceLength = source[lineNumber - i].length;
              markerLines[lineNumber] = [ 0, sourceLength ];
            } else markerLines[lineNumber] = !0;
          } else markerLines[startLine] = startColumn === endColumn ? !startColumn || [ startColumn, 0 ] : [ startColumn, endColumn - startColumn ];
          return {
            start,
            end,
            markerLines
          };
        }(loc, lines, opts), hasColumns = loc.start && "number" == typeof loc.start.column, numberMaxWidth = String(end).length;
        let frame = (highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines).split(NEWLINE, end).slice(start, end).map(((line, index) => {
          const number = start + 1 + index, gutter = ` ${` ${number}`.slice(-numberMaxWidth)} |`, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
          if (hasMarker) {
            let markerLine = "";
            if (Array.isArray(hasMarker)) {
              const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
              markerLine = [ "\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers) ].join(""), 
              lastMarkerLine && opts.message && (markerLine += " " + maybeHighlight(defs.message, opts.message));
            }
            return [ maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? ` ${line}` : "", markerLine ].join("");
          }
          return ` ${maybeHighlight(defs.gutter, gutter)}${line.length > 0 ? ` ${line}` : ""}`;
        })).join("\n");
        return opts.message && !hasColumns && (frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`), 
        highlighted ? chalk.reset(frame) : frame;
      }
    },
    8649: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      const SPACES_RE = /^[ \t]+$/;
      exports.default = class {
        constructor(map) {
          this._map = null, this._buf = "", this._last = 0, this._queue = [], this._position = {
            line: 1,
            column: 0
          }, this._sourcePosition = {
            identifierName: void 0,
            line: void 0,
            column: void 0,
            filename: void 0,
            force: !1
          }, this._disallowedPop = null, this._map = map;
        }
        get() {
          this._flush();
          const map = this._map, result = {
            code: this._buf.trimRight(),
            decodedMap: null == map ? void 0 : map.getDecoded(),
            get map() {
              return result.map = map ? map.get() : null;
            },
            set map(value) {
              Object.defineProperty(result, "map", {
                value,
                writable: !0
              });
            },
            get rawMappings() {
              return result.rawMappings = null == map ? void 0 : map.getRawMappings();
            },
            set rawMappings(value) {
              Object.defineProperty(result, "rawMappings", {
                value,
                writable: !0
              });
            }
          };
          return result;
        }
        append(str) {
          this._flush();
          const {line, column, filename, identifierName, force} = this._sourcePosition;
          this._append(str, line, column, identifierName, filename, force);
        }
        queue(str) {
          if ("\n" === str) for (;this._queue.length > 0 && SPACES_RE.test(this._queue[0][0]); ) this._queue.shift();
          const {line, column, filename, identifierName, force} = this._sourcePosition;
          this._queue.unshift([ str, line, column, identifierName, filename, force ]);
        }
        queueIndentation(str) {
          this._queue.unshift([ str, void 0, void 0, void 0, void 0, !1 ]);
        }
        _flush() {
          let item;
          for (;item = this._queue.pop(); ) this._append(...item);
        }
        _append(str, line, column, identifierName, filename, force) {
          this._buf += str, this._last = str.charCodeAt(str.length - 1);
          let i = str.indexOf("\n"), last = 0;
          for (0 !== i && this._mark(line, column, identifierName, filename, force); -1 !== i; ) this._position.line++, 
          this._position.column = 0, last = i + 1, last < str.length && this._mark(++line, 0, identifierName, filename, force), 
          i = str.indexOf("\n", last);
          this._position.column += str.length - last;
        }
        _mark(line, column, identifierName, filename, force) {
          var _this$_map;
          null == (_this$_map = this._map) || _this$_map.mark(this._position, line, column, identifierName, filename, force);
        }
        removeTrailingNewline() {
          this._queue.length > 0 && "\n" === this._queue[0][0] && this._queue.shift();
        }
        removeLastSemicolon() {
          this._queue.length > 0 && ";" === this._queue[0][0] && this._queue.shift();
        }
        getLastChar() {
          let last;
          if (this._queue.length > 0) {
            last = this._queue[0][0].charCodeAt(0);
          } else last = this._last;
          return last;
        }
        endsWithCharAndNewline() {
          const queue = this._queue;
          if (queue.length > 0) {
            if (10 !== queue[0][0].charCodeAt(0)) return;
            if (queue.length > 1) {
              return queue[1][0].charCodeAt(0);
            }
            return this._last;
          }
        }
        hasContent() {
          return this._queue.length > 0 || !!this._last;
        }
        exactSource(loc, cb) {
          this.source("start", loc, !0), cb(), this.source("end", loc), this._disallowPop("start", loc);
        }
        source(prop, loc, force) {
          prop && !loc || this._normalizePosition(prop, loc, this._sourcePosition, force);
        }
        withSource(prop, loc, cb) {
          if (!this._map) return cb();
          const originalLine = this._sourcePosition.line, originalColumn = this._sourcePosition.column, originalFilename = this._sourcePosition.filename, originalIdentifierName = this._sourcePosition.identifierName;
          this.source(prop, loc), cb(), this._sourcePosition.force && this._sourcePosition.line === originalLine && this._sourcePosition.column === originalColumn && this._sourcePosition.filename === originalFilename || this._disallowedPop && this._disallowedPop.line === originalLine && this._disallowedPop.column === originalColumn && this._disallowedPop.filename === originalFilename || (this._sourcePosition.line = originalLine, 
          this._sourcePosition.column = originalColumn, this._sourcePosition.filename = originalFilename, 
          this._sourcePosition.identifierName = originalIdentifierName, this._sourcePosition.force = !1, 
          this._disallowedPop = null);
        }
        _disallowPop(prop, loc) {
          prop && !loc || (this._disallowedPop = this._normalizePosition(prop, loc, {
            identifierName: void 0,
            line: void 0,
            column: void 0,
            filename: void 0,
            force: !1
          }, !1));
        }
        _normalizePosition(prop, loc, targetObj, force) {
          const pos = loc ? loc[prop] : null, origLine = targetObj.line, origColumn = targetObj.column, origFilename = targetObj.filename;
          return targetObj.identifierName = "start" === prop && (null == loc ? void 0 : loc.identifierName) || null, 
          targetObj.line = null == pos ? void 0 : pos.line, targetObj.column = null == pos ? void 0 : pos.column, 
          targetObj.filename = null == loc ? void 0 : loc.filename, (force || targetObj.line !== origLine || targetObj.column !== origColumn || targetObj.filename !== origFilename) && (targetObj.force = force), 
          targetObj;
        }
        getCurrentColumn() {
          const extra = this._queue.reduce(((acc, item) => item[0] + acc), ""), lastIndex = extra.lastIndexOf("\n");
          return -1 === lastIndex ? this._position.column + extra.length : extra.length - 1 - lastIndex;
        }
        getCurrentLine() {
          const extra = this._queue.reduce(((acc, item) => item[0] + acc), "");
          let count = 0;
          for (let i = 0; i < extra.length; i++) "\n" === extra[i] && count++;
          return this._position.line + count;
        }
      };
    },
    8516: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.BlockStatement = function(node) {
        var _node$directives;
        this.token("{"), this.printInnerComments(node);
        const hasDirectives = null == (_node$directives = node.directives) ? void 0 : _node$directives.length;
        node.body.length || hasDirectives ? (this.newline(), this.printSequence(node.directives, node, {
          indent: !0
        }), hasDirectives && this.newline(), this.printSequence(node.body, node, {
          indent: !0
        }), this.removeTrailingNewline(), this.source("end", node.loc), this.endsWith(10) || this.newline(), 
        this.rightBrace()) : (this.source("end", node.loc), this.token("}"));
      }, exports.Directive = function(node) {
        this.print(node.value, node), this.semicolon();
      }, exports.DirectiveLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.token(raw);
        const {value} = node;
        if (unescapedDoubleQuoteRE.test(value)) {
          if (unescapedSingleQuoteRE.test(value)) throw new Error("Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes.");
          this.token(`'${value}'`);
        } else this.token(`"${value}"`);
      }, exports.File = function(node) {
        node.program && this.print(node.program.interpreter, node);
        this.print(node.program, node);
      }, exports.InterpreterDirective = function(node) {
        this.token(`#!${node.value}\n`);
      }, exports.Placeholder = function(node) {
        this.token("%%"), this.print(node.name), this.token("%%"), "Statement" === node.expectedNode && this.semicolon();
      }, exports.Program = function(node) {
        this.printInnerComments(node, !1), this.printSequence(node.directives, node), node.directives && node.directives.length && this.newline();
        this.printSequence(node.body, node);
      };
      const unescapedSingleQuoteRE = /(?:^|[^\\])(?:\\\\)*'/, unescapedDoubleQuoteRE = /(?:^|[^\\])(?:\\\\)*"/;
    },
    505: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ClassAccessorProperty = function(node) {
        this.printJoin(node.decorators, node), this.source("end", node.key.loc), this.tsPrintClassMemberModifiers(node, !0), 
        this.word("accessor"), this.printInnerComments(node), this.space(), node.computed ? (this.token("["), 
        this.print(node.key, node), this.token("]")) : (this._variance(node), this.print(node.key, node));
        node.optional && this.token("?");
        node.definite && this.token("!");
        this.print(node.typeAnnotation, node), node.value && (this.space(), this.token("="), 
        this.space(), this.print(node.value, node));
        this.semicolon();
      }, exports.ClassBody = function(node) {
        this.token("{"), this.printInnerComments(node), 0 === node.body.length ? this.token("}") : (this.newline(), 
        this.indent(), this.printSequence(node.body, node), this.dedent(), this.endsWith(10) || this.newline(), 
        this.rightBrace());
      }, exports.ClassExpression = exports.ClassDeclaration = function(node, parent) {
        this.format.decoratorsBeforeExport && (isExportDefaultDeclaration(parent) || isExportNamedDeclaration(parent)) || this.printJoin(node.decorators, node);
        node.declare && (this.word("declare"), this.space());
        node.abstract && (this.word("abstract"), this.space());
        this.word("class"), this.printInnerComments(node), node.id && (this.space(), this.print(node.id, node));
        this.print(node.typeParameters, node), node.superClass && (this.space(), this.word("extends"), 
        this.space(), this.print(node.superClass, node), this.print(node.superTypeParameters, node));
        node.implements && (this.space(), this.word("implements"), this.space(), this.printList(node.implements, node));
        this.space(), this.print(node.body, node);
      }, exports.ClassMethod = function(node) {
        this._classMethodHead(node), this.space(), this.print(node.body, node);
      }, exports.ClassPrivateMethod = function(node) {
        this._classMethodHead(node), this.space(), this.print(node.body, node);
      }, exports.ClassPrivateProperty = function(node) {
        this.printJoin(node.decorators, node), node.static && (this.word("static"), this.space());
        this.print(node.key, node), this.print(node.typeAnnotation, node), node.value && (this.space(), 
        this.token("="), this.space(), this.print(node.value, node));
        this.semicolon();
      }, exports.ClassProperty = function(node) {
        this.printJoin(node.decorators, node), this.source("end", node.key.loc), this.tsPrintClassMemberModifiers(node, !0), 
        node.computed ? (this.token("["), this.print(node.key, node), this.token("]")) : (this._variance(node), 
        this.print(node.key, node));
        node.optional && this.token("?");
        node.definite && this.token("!");
        this.print(node.typeAnnotation, node), node.value && (this.space(), this.token("="), 
        this.space(), this.print(node.value, node));
        this.semicolon();
      }, exports.StaticBlock = function(node) {
        this.word("static"), this.space(), this.token("{"), 0 === node.body.length ? this.token("}") : (this.newline(), 
        this.printSequence(node.body, node, {
          indent: !0
        }), this.rightBrace());
      }, exports._classMethodHead = function(node) {
        this.printJoin(node.decorators, node), this.source("end", node.key.loc), this.tsPrintClassMemberModifiers(node, !1), 
        this._methodHead(node);
      };
      var _t = __webpack_require__(7289);
      const {isExportDefaultDeclaration, isExportNamedDeclaration} = _t;
    },
    6361: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.LogicalExpression = exports.BinaryExpression = exports.AssignmentExpression = function(node, parent) {
        const parens = this.inForStatementInitCounter && "in" === node.operator && !n.needsParens(node, parent);
        parens && this.token("(");
        this.print(node.left, node), this.space(), "in" === node.operator || "instanceof" === node.operator ? this.word(node.operator) : this.token(node.operator);
        this.space(), this.print(node.right, node), parens && this.token(")");
      }, exports.AssignmentPattern = function(node) {
        this.print(node.left, node), node.left.optional && this.token("?");
        this.print(node.left.typeAnnotation, node), this.space(), this.token("="), this.space(), 
        this.print(node.right, node);
      }, exports.AwaitExpression = void 0, exports.BindExpression = function(node) {
        this.print(node.object, node), this.token("::"), this.print(node.callee, node);
      }, exports.CallExpression = function(node) {
        this.print(node.callee, node), this.print(node.typeArguments, node), this.print(node.typeParameters, node), 
        this.token("("), this.printList(node.arguments, node), this.token(")");
      }, exports.ConditionalExpression = function(node) {
        this.print(node.test, node), this.space(), this.token("?"), this.space(), this.print(node.consequent, node), 
        this.space(), this.token(":"), this.space(), this.print(node.alternate, node);
      }, exports.Decorator = function(node) {
        this.token("@");
        const {expression} = node;
        !function(node) {
          "CallExpression" === node.type && (node = node.callee);
          if ("ParenthesizedExpression" === node.type) return !1;
          return !isDecoratorMemberExpression(node);
        }(expression) ? this.print(expression, node) : (this.token("("), this.print(expression, node), 
        this.token(")"));
        this.newline();
      }, exports.DoExpression = function(node) {
        node.async && (this.word("async"), this.space());
        this.word("do"), this.space(), this.print(node.body, node);
      }, exports.EmptyStatement = function() {
        this.semicolon(!0);
      }, exports.ExpressionStatement = function(node) {
        this.print(node.expression, node), this.semicolon();
      }, exports.Import = function() {
        this.word("import");
      }, exports.MemberExpression = function(node) {
        if (this.print(node.object, node), !node.computed && isMemberExpression(node.property)) throw new TypeError("Got a MemberExpression for MemberExpression property");
        let computed = node.computed;
        isLiteral(node.property) && "number" == typeof node.property.value && (computed = !0);
        computed ? (this.token("["), this.print(node.property, node), this.token("]")) : (this.token("."), 
        this.print(node.property, node));
      }, exports.MetaProperty = function(node) {
        this.print(node.meta, node), this.token("."), this.print(node.property, node);
      }, exports.ModuleExpression = function(node) {
        this.word("module"), this.space(), this.token("{"), 0 === node.body.body.length ? this.token("}") : (this.newline(), 
        this.printSequence(node.body.body, node, {
          indent: !0
        }), this.rightBrace());
      }, exports.NewExpression = function(node, parent) {
        if (this.word("new"), this.space(), this.print(node.callee, node), this.format.minified && 0 === node.arguments.length && !node.optional && !isCallExpression(parent, {
          callee: node
        }) && !isMemberExpression(parent) && !isNewExpression(parent)) return;
        this.print(node.typeArguments, node), this.print(node.typeParameters, node), node.optional && this.token("?.");
        this.token("("), this.printList(node.arguments, node), this.token(")");
      }, exports.OptionalCallExpression = function(node) {
        this.print(node.callee, node), this.print(node.typeArguments, node), this.print(node.typeParameters, node), 
        node.optional && this.token("?.");
        this.token("("), this.printList(node.arguments, node), this.token(")");
      }, exports.OptionalMemberExpression = function(node) {
        if (this.print(node.object, node), !node.computed && isMemberExpression(node.property)) throw new TypeError("Got a MemberExpression for MemberExpression property");
        let computed = node.computed;
        isLiteral(node.property) && "number" == typeof node.property.value && (computed = !0);
        node.optional && this.token("?.");
        computed ? (this.token("["), this.print(node.property, node), this.token("]")) : (node.optional || this.token("."), 
        this.print(node.property, node));
      }, exports.ParenthesizedExpression = function(node) {
        this.token("("), this.print(node.expression, node), this.token(")");
      }, exports.PrivateName = function(node) {
        this.token("#"), this.print(node.id, node);
      }, exports.SequenceExpression = function(node) {
        this.printList(node.expressions, node);
      }, exports.Super = function() {
        this.word("super");
      }, exports.ThisExpression = function() {
        this.word("this");
      }, exports.UnaryExpression = function(node) {
        "void" === node.operator || "delete" === node.operator || "typeof" === node.operator || "throw" === node.operator ? (this.word(node.operator), 
        this.space()) : this.token(node.operator);
        this.print(node.argument, node);
      }, exports.UpdateExpression = function(node) {
        node.prefix ? (this.token(node.operator), this.print(node.argument, node)) : (this.startTerminatorless(!0), 
        this.print(node.argument, node), this.endTerminatorless(), this.token(node.operator));
      }, exports.V8IntrinsicIdentifier = function(node) {
        this.token("%"), this.word(node.name);
      }, exports.YieldExpression = void 0;
      var _t = __webpack_require__(7289), n = __webpack_require__(2866);
      const {isCallExpression, isLiteral, isMemberExpression, isNewExpression} = _t;
      function isDecoratorMemberExpression(node) {
        switch (node.type) {
         case "Identifier":
          return !0;

         case "MemberExpression":
          return !node.computed && "Identifier" === node.property.type && isDecoratorMemberExpression(node.object);

         default:
          return !1;
        }
      }
      function buildYieldAwait(keyword) {
        return function(node) {
          if (this.word(keyword), node.delegate && this.token("*"), node.argument) {
            this.space();
            const terminatorState = this.startTerminatorless();
            this.print(node.argument, node), this.endTerminatorless(terminatorState);
          }
        };
      }
      const YieldExpression = buildYieldAwait("yield");
      exports.YieldExpression = YieldExpression;
      const AwaitExpression = buildYieldAwait("await");
      exports.AwaitExpression = AwaitExpression;
    },
    8076: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.AnyTypeAnnotation = function() {
        this.word("any");
      }, exports.ArrayTypeAnnotation = function(node) {
        this.print(node.elementType, node), this.token("["), this.token("]");
      }, exports.BooleanLiteralTypeAnnotation = function(node) {
        this.word(node.value ? "true" : "false");
      }, exports.BooleanTypeAnnotation = function() {
        this.word("boolean");
      }, exports.DeclareClass = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.word("class"), this.space(), this._interfaceish(node);
      }, exports.DeclareExportAllDeclaration = function() {
        this.word("declare"), this.space(), _modules.ExportAllDeclaration.apply(this, arguments);
      }, exports.DeclareExportDeclaration = function(node) {
        this.word("declare"), this.space(), this.word("export"), this.space(), node.default && (this.word("default"), 
        this.space());
        FlowExportDeclaration.apply(this, arguments);
      }, exports.DeclareFunction = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.word("function"), this.space(), this.print(node.id, node), this.print(node.id.typeAnnotation.typeAnnotation, node), 
        node.predicate && (this.space(), this.print(node.predicate, node));
        this.semicolon();
      }, exports.DeclareInterface = function(node) {
        this.word("declare"), this.space(), this.InterfaceDeclaration(node);
      }, exports.DeclareModule = function(node) {
        this.word("declare"), this.space(), this.word("module"), this.space(), this.print(node.id, node), 
        this.space(), this.print(node.body, node);
      }, exports.DeclareModuleExports = function(node) {
        this.word("declare"), this.space(), this.word("module"), this.token("."), this.word("exports"), 
        this.print(node.typeAnnotation, node);
      }, exports.DeclareOpaqueType = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.OpaqueType(node);
      }, exports.DeclareTypeAlias = function(node) {
        this.word("declare"), this.space(), this.TypeAlias(node);
      }, exports.DeclareVariable = function(node, parent) {
        isDeclareExportDeclaration(parent) || (this.word("declare"), this.space());
        this.word("var"), this.space(), this.print(node.id, node), this.print(node.id.typeAnnotation, node), 
        this.semicolon();
      }, exports.DeclaredPredicate = function(node) {
        this.token("%"), this.word("checks"), this.token("("), this.print(node.value, node), 
        this.token(")");
      }, exports.EmptyTypeAnnotation = function() {
        this.word("empty");
      }, exports.EnumBooleanBody = function(node) {
        const {explicitType} = node;
        enumExplicitType(this, "boolean", explicitType), enumBody(this, node);
      }, exports.EnumBooleanMember = function(node) {
        enumInitializedMember(this, node);
      }, exports.EnumDeclaration = function(node) {
        const {id, body} = node;
        this.word("enum"), this.space(), this.print(id, node), this.print(body, node);
      }, exports.EnumDefaultedMember = function(node) {
        const {id} = node;
        this.print(id, node), this.token(",");
      }, exports.EnumNumberBody = function(node) {
        const {explicitType} = node;
        enumExplicitType(this, "number", explicitType), enumBody(this, node);
      }, exports.EnumNumberMember = function(node) {
        enumInitializedMember(this, node);
      }, exports.EnumStringBody = function(node) {
        const {explicitType} = node;
        enumExplicitType(this, "string", explicitType), enumBody(this, node);
      }, exports.EnumStringMember = function(node) {
        enumInitializedMember(this, node);
      }, exports.EnumSymbolBody = function(node) {
        enumExplicitType(this, "symbol", !0), enumBody(this, node);
      }, exports.ExistsTypeAnnotation = function() {
        this.token("*");
      }, exports.FunctionTypeAnnotation = function(node, parent) {
        this.print(node.typeParameters, node), this.token("("), node.this && (this.word("this"), 
        this.token(":"), this.space(), this.print(node.this.typeAnnotation, node), (node.params.length || node.rest) && (this.token(","), 
        this.space()));
        this.printList(node.params, node), node.rest && (node.params.length && (this.token(","), 
        this.space()), this.token("..."), this.print(node.rest, node));
        this.token(")"), parent && ("ObjectTypeCallProperty" === parent.type || "DeclareFunction" === parent.type || "ObjectTypeProperty" === parent.type && parent.method) ? this.token(":") : (this.space(), 
        this.token("=>"));
        this.space(), this.print(node.returnType, node);
      }, exports.FunctionTypeParam = function(node) {
        this.print(node.name, node), node.optional && this.token("?");
        node.name && (this.token(":"), this.space());
        this.print(node.typeAnnotation, node);
      }, exports.IndexedAccessType = function(node) {
        this.print(node.objectType, node), this.token("["), this.print(node.indexType, node), 
        this.token("]");
      }, exports.InferredPredicate = function() {
        this.token("%"), this.word("checks");
      }, exports.InterfaceDeclaration = function(node) {
        this.word("interface"), this.space(), this._interfaceish(node);
      }, exports.GenericTypeAnnotation = exports.ClassImplements = exports.InterfaceExtends = function(node) {
        this.print(node.id, node), this.print(node.typeParameters, node);
      }, exports.InterfaceTypeAnnotation = function(node) {
        this.word("interface"), node.extends && node.extends.length && (this.space(), this.word("extends"), 
        this.space(), this.printList(node.extends, node));
        this.space(), this.print(node.body, node);
      }, exports.IntersectionTypeAnnotation = function(node) {
        this.printJoin(node.types, node, {
          separator: andSeparator
        });
      }, exports.MixedTypeAnnotation = function() {
        this.word("mixed");
      }, exports.NullLiteralTypeAnnotation = function() {
        this.word("null");
      }, exports.NullableTypeAnnotation = function(node) {
        this.token("?"), this.print(node.typeAnnotation, node);
      }, Object.defineProperty(exports, "NumberLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _types2.NumericLiteral;
        }
      }), exports.NumberTypeAnnotation = function() {
        this.word("number");
      }, exports.ObjectTypeAnnotation = function(node) {
        node.exact ? this.token("{|") : this.token("{");
        const props = [ ...node.properties, ...node.callProperties || [], ...node.indexers || [], ...node.internalSlots || [] ];
        props.length && (this.space(), this.printJoin(props, node, {
          addNewlines(leading) {
            if (leading && !props[0]) return 1;
          },
          indent: !0,
          statement: !0,
          iterator: () => {
            (1 !== props.length || node.inexact) && (this.token(","), this.space());
          }
        }), this.space());
        node.inexact && (this.indent(), this.token("..."), props.length && this.newline(), 
        this.dedent());
        node.exact ? this.token("|}") : this.token("}");
      }, exports.ObjectTypeCallProperty = function(node) {
        node.static && (this.word("static"), this.space());
        this.print(node.value, node);
      }, exports.ObjectTypeIndexer = function(node) {
        node.static && (this.word("static"), this.space());
        this._variance(node), this.token("["), node.id && (this.print(node.id, node), this.token(":"), 
        this.space());
        this.print(node.key, node), this.token("]"), this.token(":"), this.space(), this.print(node.value, node);
      }, exports.ObjectTypeInternalSlot = function(node) {
        node.static && (this.word("static"), this.space());
        this.token("["), this.token("["), this.print(node.id, node), this.token("]"), this.token("]"), 
        node.optional && this.token("?");
        node.method || (this.token(":"), this.space());
        this.print(node.value, node);
      }, exports.ObjectTypeProperty = function(node) {
        node.proto && (this.word("proto"), this.space());
        node.static && (this.word("static"), this.space());
        "get" !== node.kind && "set" !== node.kind || (this.word(node.kind), this.space());
        this._variance(node), this.print(node.key, node), node.optional && this.token("?");
        node.method || (this.token(":"), this.space());
        this.print(node.value, node);
      }, exports.ObjectTypeSpreadProperty = function(node) {
        this.token("..."), this.print(node.argument, node);
      }, exports.OpaqueType = function(node) {
        this.word("opaque"), this.space(), this.word("type"), this.space(), this.print(node.id, node), 
        this.print(node.typeParameters, node), node.supertype && (this.token(":"), this.space(), 
        this.print(node.supertype, node));
        node.impltype && (this.space(), this.token("="), this.space(), this.print(node.impltype, node));
        this.semicolon();
      }, exports.OptionalIndexedAccessType = function(node) {
        this.print(node.objectType, node), node.optional && this.token("?.");
        this.token("["), this.print(node.indexType, node), this.token("]");
      }, exports.QualifiedTypeIdentifier = function(node) {
        this.print(node.qualification, node), this.token("."), this.print(node.id, node);
      }, Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _types2.StringLiteral;
        }
      }), exports.StringTypeAnnotation = function() {
        this.word("string");
      }, exports.SymbolTypeAnnotation = function() {
        this.word("symbol");
      }, exports.ThisTypeAnnotation = function() {
        this.word("this");
      }, exports.TupleTypeAnnotation = function(node) {
        this.token("["), this.printList(node.types, node), this.token("]");
      }, exports.TypeAlias = function(node) {
        this.word("type"), this.space(), this.print(node.id, node), this.print(node.typeParameters, node), 
        this.space(), this.token("="), this.space(), this.print(node.right, node), this.semicolon();
      }, exports.TypeAnnotation = function(node) {
        this.token(":"), this.space(), node.optional && this.token("?");
        this.print(node.typeAnnotation, node);
      }, exports.TypeCastExpression = function(node) {
        this.token("("), this.print(node.expression, node), this.print(node.typeAnnotation, node), 
        this.token(")");
      }, exports.TypeParameter = function(node) {
        this._variance(node), this.word(node.name), node.bound && this.print(node.bound, node);
        node.default && (this.space(), this.token("="), this.space(), this.print(node.default, node));
      }, exports.TypeParameterDeclaration = exports.TypeParameterInstantiation = function(node) {
        this.token("<"), this.printList(node.params, node, {}), this.token(">");
      }, exports.TypeofTypeAnnotation = function(node) {
        this.word("typeof"), this.space(), this.print(node.argument, node);
      }, exports.UnionTypeAnnotation = function(node) {
        this.printJoin(node.types, node, {
          separator: orSeparator
        });
      }, exports.Variance = function(node) {
        "plus" === node.kind ? this.token("+") : this.token("-");
      }, exports.VoidTypeAnnotation = function() {
        this.word("void");
      }, exports._interfaceish = function(node) {
        var _node$extends;
        this.print(node.id, node), this.print(node.typeParameters, node), null != (_node$extends = node.extends) && _node$extends.length && (this.space(), 
        this.word("extends"), this.space(), this.printList(node.extends, node));
        node.mixins && node.mixins.length && (this.space(), this.word("mixins"), this.space(), 
        this.printList(node.mixins, node));
        node.implements && node.implements.length && (this.space(), this.word("implements"), 
        this.space(), this.printList(node.implements, node));
        this.space(), this.print(node.body, node);
      }, exports._variance = function(node) {
        node.variance && ("plus" === node.variance.kind ? this.token("+") : "minus" === node.variance.kind && this.token("-"));
      };
      var _t = __webpack_require__(7289), _modules = __webpack_require__(7064), _types2 = __webpack_require__(5718);
      const {isDeclareExportDeclaration, isStatement} = _t;
      function enumExplicitType(context, name, hasExplicitType) {
        hasExplicitType && (context.space(), context.word("of"), context.space(), context.word(name)), 
        context.space();
      }
      function enumBody(context, node) {
        const {members} = node;
        context.token("{"), context.indent(), context.newline();
        for (const member of members) context.print(member, node), context.newline();
        node.hasUnknownMembers && (context.token("..."), context.newline()), context.dedent(), 
        context.token("}");
      }
      function enumInitializedMember(context, node) {
        const {id, init} = node;
        context.print(id, node), context.space(), context.token("="), context.space(), context.print(init, node), 
        context.token(",");
      }
      function FlowExportDeclaration(node) {
        if (node.declaration) {
          const declar = node.declaration;
          this.print(declar, node), isStatement(declar) || this.semicolon();
        } else this.token("{"), node.specifiers.length && (this.space(), this.printList(node.specifiers, node), 
        this.space()), this.token("}"), node.source && (this.space(), this.word("from"), 
        this.space(), this.print(node.source, node)), this.semicolon();
      }
      function andSeparator() {
        this.space(), this.token("&"), this.space();
      }
      function orSeparator() {
        this.space(), this.token("|"), this.space();
      }
    },
    8217: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _templateLiterals = __webpack_require__(2347);
      Object.keys(_templateLiterals).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _templateLiterals[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _templateLiterals[key];
          }
        }));
      }));
      var _expressions = __webpack_require__(6361);
      Object.keys(_expressions).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _expressions[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _expressions[key];
          }
        }));
      }));
      var _statements = __webpack_require__(6787);
      Object.keys(_statements).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _statements[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _statements[key];
          }
        }));
      }));
      var _classes = __webpack_require__(505);
      Object.keys(_classes).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _classes[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _classes[key];
          }
        }));
      }));
      var _methods = __webpack_require__(624);
      Object.keys(_methods).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _methods[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _methods[key];
          }
        }));
      }));
      var _modules = __webpack_require__(7064);
      Object.keys(_modules).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _modules[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _modules[key];
          }
        }));
      }));
      var _types = __webpack_require__(5718);
      Object.keys(_types).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _types[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _types[key];
          }
        }));
      }));
      var _flow = __webpack_require__(8076);
      Object.keys(_flow).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _flow[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _flow[key];
          }
        }));
      }));
      var _base = __webpack_require__(8516);
      Object.keys(_base).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _base[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _base[key];
          }
        }));
      }));
      var _jsx = __webpack_require__(9598);
      Object.keys(_jsx).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _jsx[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _jsx[key];
          }
        }));
      }));
      var _typescript = __webpack_require__(2043);
      Object.keys(_typescript).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in exports && exports[key] === _typescript[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _typescript[key];
          }
        }));
      }));
    },
    9598: (__unused_webpack_module, exports) => {
      "use strict";
      function spaceSeparator() {
        this.space();
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.JSXAttribute = function(node) {
        this.print(node.name, node), node.value && (this.token("="), this.print(node.value, node));
      }, exports.JSXClosingElement = function(node) {
        this.token("</"), this.print(node.name, node), this.token(">");
      }, exports.JSXClosingFragment = function() {
        this.token("</"), this.token(">");
      }, exports.JSXElement = function(node) {
        const open = node.openingElement;
        if (this.print(open, node), open.selfClosing) return;
        this.indent();
        for (const child of node.children) this.print(child, node);
        this.dedent(), this.print(node.closingElement, node);
      }, exports.JSXEmptyExpression = function(node) {
        this.printInnerComments(node);
      }, exports.JSXExpressionContainer = function(node) {
        this.token("{"), this.print(node.expression, node), this.token("}");
      }, exports.JSXFragment = function(node) {
        this.print(node.openingFragment, node), this.indent();
        for (const child of node.children) this.print(child, node);
        this.dedent(), this.print(node.closingFragment, node);
      }, exports.JSXIdentifier = function(node) {
        this.word(node.name);
      }, exports.JSXMemberExpression = function(node) {
        this.print(node.object, node), this.token("."), this.print(node.property, node);
      }, exports.JSXNamespacedName = function(node) {
        this.print(node.namespace, node), this.token(":"), this.print(node.name, node);
      }, exports.JSXOpeningElement = function(node) {
        this.token("<"), this.print(node.name, node), this.print(node.typeParameters, node), 
        node.attributes.length > 0 && (this.space(), this.printJoin(node.attributes, node, {
          separator: spaceSeparator
        }));
        node.selfClosing ? (this.space(), this.token("/>")) : this.token(">");
      }, exports.JSXOpeningFragment = function() {
        this.token("<"), this.token(">");
      }, exports.JSXSpreadAttribute = function(node) {
        this.token("{"), this.token("..."), this.print(node.argument, node), this.token("}");
      }, exports.JSXSpreadChild = function(node) {
        this.token("{"), this.token("..."), this.print(node.expression, node), this.token("}");
      }, exports.JSXText = function(node) {
        const raw = this.getPossibleRaw(node);
        null != raw ? this.token(raw) : this.token(node.value);
      };
    },
    624: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArrowFunctionExpression = function(node) {
        node.async && (this.word("async"), this.space());
        const firstParam = node.params[0];
        this.format.retainLines || this.format.auxiliaryCommentBefore || this.format.auxiliaryCommentAfter || 1 !== node.params.length || !isIdentifier(firstParam) || function(node, param) {
          var _param$leadingComment, _param$trailingCommen;
          return !!(node.typeParameters || node.returnType || node.predicate || param.typeAnnotation || param.optional || null != (_param$leadingComment = param.leadingComments) && _param$leadingComment.length || null != (_param$trailingCommen = param.trailingComments) && _param$trailingCommen.length);
        }(node, firstParam) ? this._params(node) : this.print(firstParam, node);
        this._predicate(node), this.space(), this.token("=>"), this.space(), this.print(node.body, node);
      }, exports.FunctionDeclaration = exports.FunctionExpression = function(node) {
        this._functionHead(node), this.space(), this.print(node.body, node);
      }, exports._functionHead = function(node) {
        node.async && (this.word("async"), this.space());
        this.word("function"), node.generator && this.token("*");
        this.printInnerComments(node), this.space(), node.id && this.print(node.id, node);
        this._params(node), this._predicate(node);
      }, exports._methodHead = function(node) {
        const kind = node.kind, key = node.key;
        "get" !== kind && "set" !== kind || (this.word(kind), this.space());
        node.async && (this._catchUp("start", key.loc), this.word("async"), this.space());
        "method" !== kind && "init" !== kind || node.generator && this.token("*");
        node.computed ? (this.token("["), this.print(key, node), this.token("]")) : this.print(key, node);
        node.optional && this.token("?");
        this._params(node);
      }, exports._param = function(parameter, parent) {
        this.printJoin(parameter.decorators, parameter), this.print(parameter, parent), 
        parameter.optional && this.token("?");
        this.print(parameter.typeAnnotation, parameter);
      }, exports._parameters = function(parameters, parent) {
        for (let i = 0; i < parameters.length; i++) this._param(parameters[i], parent), 
        i < parameters.length - 1 && (this.token(","), this.space());
      }, exports._params = function(node) {
        this.print(node.typeParameters, node), this.token("("), this._parameters(node.params, node), 
        this.token(")"), this.print(node.returnType, node);
      }, exports._predicate = function(node) {
        node.predicate && (node.returnType || this.token(":"), this.space(), this.print(node.predicate, node));
      };
      var _t = __webpack_require__(7289);
      const {isIdentifier} = _t;
    },
    7064: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ExportAllDeclaration = function(node) {
        this.word("export"), this.space(), "type" === node.exportKind && (this.word("type"), 
        this.space());
        this.token("*"), this.space(), this.word("from"), this.space(), this.print(node.source, node), 
        this.printAssertions(node), this.semicolon();
      }, exports.ExportDefaultDeclaration = function(node) {
        this.format.decoratorsBeforeExport && isClassDeclaration(node.declaration) && this.printJoin(node.declaration.decorators, node);
        this.word("export"), this.space(), this.word("default"), this.space(), ExportDeclaration.apply(this, arguments);
      }, exports.ExportDefaultSpecifier = function(node) {
        this.print(node.exported, node);
      }, exports.ExportNamedDeclaration = function(node) {
        this.format.decoratorsBeforeExport && isClassDeclaration(node.declaration) && this.printJoin(node.declaration.decorators, node);
        this.word("export"), this.space(), ExportDeclaration.apply(this, arguments);
      }, exports.ExportNamespaceSpecifier = function(node) {
        this.token("*"), this.space(), this.word("as"), this.space(), this.print(node.exported, node);
      }, exports.ExportSpecifier = function(node) {
        "type" === node.exportKind && (this.word("type"), this.space());
        this.print(node.local, node), node.exported && node.local.name !== node.exported.name && (this.space(), 
        this.word("as"), this.space(), this.print(node.exported, node));
      }, exports.ImportAttribute = function(node) {
        this.print(node.key), this.token(":"), this.space(), this.print(node.value);
      }, exports.ImportDeclaration = function(node) {
        this.word("import"), this.space();
        const isTypeKind = "type" === node.importKind || "typeof" === node.importKind;
        isTypeKind && (this.word(node.importKind), this.space());
        const specifiers = node.specifiers.slice(0), hasSpecifiers = !!specifiers.length;
        for (;hasSpecifiers; ) {
          const first = specifiers[0];
          if (!isImportDefaultSpecifier(first) && !isImportNamespaceSpecifier(first)) break;
          this.print(specifiers.shift(), node), specifiers.length && (this.token(","), this.space());
        }
        specifiers.length ? (this.token("{"), this.space(), this.printList(specifiers, node), 
        this.space(), this.token("}")) : isTypeKind && !hasSpecifiers && (this.token("{"), 
        this.token("}"));
        (hasSpecifiers || isTypeKind) && (this.space(), this.word("from"), this.space());
        var _node$attributes;
        this.print(node.source, node), this.printAssertions(node), null != (_node$attributes = node.attributes) && _node$attributes.length && (this.space(), 
        this.word("with"), this.space(), this.printList(node.attributes, node));
        this.semicolon();
      }, exports.ImportDefaultSpecifier = function(node) {
        this.print(node.local, node);
      }, exports.ImportNamespaceSpecifier = function(node) {
        this.token("*"), this.space(), this.word("as"), this.space(), this.print(node.local, node);
      }, exports.ImportSpecifier = function(node) {
        "type" !== node.importKind && "typeof" !== node.importKind || (this.word(node.importKind), 
        this.space());
        this.print(node.imported, node), node.local && node.local.name !== node.imported.name && (this.space(), 
        this.word("as"), this.space(), this.print(node.local, node));
      };
      var _t = __webpack_require__(7289);
      const {isClassDeclaration, isExportDefaultSpecifier, isExportNamespaceSpecifier, isImportDefaultSpecifier, isImportNamespaceSpecifier, isStatement} = _t;
      function ExportDeclaration(node) {
        if (node.declaration) {
          const declar = node.declaration;
          this.print(declar, node), isStatement(declar) || this.semicolon();
        } else {
          "type" === node.exportKind && (this.word("type"), this.space());
          const specifiers = node.specifiers.slice(0);
          let hasSpecial = !1;
          for (;;) {
            const first = specifiers[0];
            if (!isExportDefaultSpecifier(first) && !isExportNamespaceSpecifier(first)) break;
            hasSpecial = !0, this.print(specifiers.shift(), node), specifiers.length && (this.token(","), 
            this.space());
          }
          (specifiers.length || !specifiers.length && !hasSpecial) && (this.token("{"), specifiers.length && (this.space(), 
          this.printList(specifiers, node), this.space()), this.token("}")), node.source && (this.space(), 
          this.word("from"), this.space(), this.print(node.source, node), this.printAssertions(node)), 
          this.semicolon();
        }
      }
    },
    6787: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.BreakStatement = void 0, exports.CatchClause = function(node) {
        this.word("catch"), this.space(), node.param && (this.token("("), this.print(node.param, node), 
        this.print(node.param.typeAnnotation, node), this.token(")"), this.space());
        this.print(node.body, node);
      }, exports.ContinueStatement = void 0, exports.DebuggerStatement = function() {
        this.word("debugger"), this.semicolon();
      }, exports.DoWhileStatement = function(node) {
        this.word("do"), this.space(), this.print(node.body, node), this.space(), this.word("while"), 
        this.space(), this.token("("), this.print(node.test, node), this.token(")"), this.semicolon();
      }, exports.ForOfStatement = exports.ForInStatement = void 0, exports.ForStatement = function(node) {
        this.word("for"), this.space(), this.token("("), this.inForStatementInitCounter++, 
        this.print(node.init, node), this.inForStatementInitCounter--, this.token(";"), 
        node.test && (this.space(), this.print(node.test, node));
        this.token(";"), node.update && (this.space(), this.print(node.update, node));
        this.token(")"), this.printBlock(node);
      }, exports.IfStatement = function(node) {
        this.word("if"), this.space(), this.token("("), this.print(node.test, node), this.token(")"), 
        this.space();
        const needsBlock = node.alternate && isIfStatement(getLastStatement(node.consequent));
        needsBlock && (this.token("{"), this.newline(), this.indent());
        this.printAndIndentOnComments(node.consequent, node), needsBlock && (this.dedent(), 
        this.newline(), this.token("}"));
        node.alternate && (this.endsWith(125) && this.space(), this.word("else"), this.space(), 
        this.printAndIndentOnComments(node.alternate, node));
      }, exports.LabeledStatement = function(node) {
        this.print(node.label, node), this.token(":"), this.space(), this.print(node.body, node);
      }, exports.ReturnStatement = void 0, exports.SwitchCase = function(node) {
        node.test ? (this.word("case"), this.space(), this.print(node.test, node), this.token(":")) : (this.word("default"), 
        this.token(":"));
        node.consequent.length && (this.newline(), this.printSequence(node.consequent, node, {
          indent: !0
        }));
      }, exports.SwitchStatement = function(node) {
        this.word("switch"), this.space(), this.token("("), this.print(node.discriminant, node), 
        this.token(")"), this.space(), this.token("{"), this.printSequence(node.cases, node, {
          indent: !0,
          addNewlines(leading, cas) {
            if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
          }
        }), this.token("}");
      }, exports.ThrowStatement = void 0, exports.TryStatement = function(node) {
        this.word("try"), this.space(), this.print(node.block, node), this.space(), node.handlers ? this.print(node.handlers[0], node) : this.print(node.handler, node);
        node.finalizer && (this.space(), this.word("finally"), this.space(), this.print(node.finalizer, node));
      }, exports.VariableDeclaration = function(node, parent) {
        node.declare && (this.word("declare"), this.space());
        this.word(node.kind), this.space();
        let separator, hasInits = !1;
        if (!isFor(parent)) for (const declar of node.declarations) declar.init && (hasInits = !0);
        hasInits && (separator = "const" === node.kind ? constDeclarationIndent : variableDeclarationIndent);
        if (this.printList(node.declarations, node, {
          separator
        }), isFor(parent)) if (isForStatement(parent)) {
          if (parent.init === node) return;
        } else if (parent.left === node) return;
        this.semicolon();
      }, exports.VariableDeclarator = function(node) {
        this.print(node.id, node), node.definite && this.token("!");
        this.print(node.id.typeAnnotation, node), node.init && (this.space(), this.token("="), 
        this.space(), this.print(node.init, node));
      }, exports.WhileStatement = function(node) {
        this.word("while"), this.space(), this.token("("), this.print(node.test, node), 
        this.token(")"), this.printBlock(node);
      }, exports.WithStatement = function(node) {
        this.word("with"), this.space(), this.token("("), this.print(node.object, node), 
        this.token(")"), this.printBlock(node);
      };
      var _t = __webpack_require__(7289);
      const {isFor, isForStatement, isIfStatement, isStatement} = _t;
      function getLastStatement(statement) {
        return isStatement(statement.body) ? getLastStatement(statement.body) : statement;
      }
      const buildForXStatement = function(op) {
        return function(node) {
          this.word("for"), this.space(), "of" === op && node.await && (this.word("await"), 
          this.space()), this.token("("), this.print(node.left, node), this.space(), this.word(op), 
          this.space(), this.print(node.right, node), this.token(")"), this.printBlock(node);
        };
      }, ForInStatement = buildForXStatement("in");
      exports.ForInStatement = ForInStatement;
      const ForOfStatement = buildForXStatement("of");
      function buildLabelStatement(prefix, key = "label") {
        return function(node) {
          this.word(prefix);
          const label = node[key];
          if (label) {
            this.space();
            const isLabel = "label" == key, terminatorState = this.startTerminatorless(isLabel);
            this.print(label, node), this.endTerminatorless(terminatorState);
          }
          this.semicolon();
        };
      }
      exports.ForOfStatement = ForOfStatement;
      const ContinueStatement = buildLabelStatement("continue");
      exports.ContinueStatement = ContinueStatement;
      const ReturnStatement = buildLabelStatement("return", "argument");
      exports.ReturnStatement = ReturnStatement;
      const BreakStatement = buildLabelStatement("break");
      exports.BreakStatement = BreakStatement;
      const ThrowStatement = buildLabelStatement("throw", "argument");
      function variableDeclarationIndent() {
        if (this.token(","), this.newline(), this.endsWith(10)) for (let i = 0; i < 4; i++) this.space(!0);
      }
      function constDeclarationIndent() {
        if (this.token(","), this.newline(), this.endsWith(10)) for (let i = 0; i < 6; i++) this.space(!0);
      }
      exports.ThrowStatement = ThrowStatement;
    },
    2347: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.TaggedTemplateExpression = function(node) {
        this.print(node.tag, node), this.print(node.typeParameters, node), this.print(node.quasi, node);
      }, exports.TemplateElement = function(node, parent) {
        const isFirst = parent.quasis[0] === node, isLast = parent.quasis[parent.quasis.length - 1] === node, value = (isFirst ? "`" : "}") + node.value.raw + (isLast ? "`" : "${");
        this.token(value);
      }, exports.TemplateLiteral = function(node) {
        const quasis = node.quasis;
        for (let i = 0; i < quasis.length; i++) this.print(quasis[i], node), i + 1 < quasis.length && this.print(node.expressions[i], node);
      };
    },
    5718: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArgumentPlaceholder = function() {
        this.token("?");
      }, exports.ArrayPattern = exports.ArrayExpression = function(node) {
        const elems = node.elements, len = elems.length;
        this.token("["), this.printInnerComments(node);
        for (let i = 0; i < elems.length; i++) {
          const elem = elems[i];
          elem ? (i > 0 && this.space(), this.print(elem, node), i < len - 1 && this.token(",")) : this.token(",");
        }
        this.token("]");
      }, exports.BigIntLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.word(raw);
        this.word(node.value + "n");
      }, exports.BooleanLiteral = function(node) {
        this.word(node.value ? "true" : "false");
      }, exports.DecimalLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.word(raw);
        this.word(node.value + "m");
      }, exports.Identifier = function(node) {
        this.exactSource(node.loc, (() => {
          this.word(node.name);
        }));
      }, exports.NullLiteral = function() {
        this.word("null");
      }, exports.NumericLiteral = function(node) {
        const raw = this.getPossibleRaw(node), opts = this.format.jsescOption, value = node.value + "";
        opts.numbers ? this.number(_jsesc(node.value, opts)) : null == raw ? this.number(value) : this.format.minified ? this.number(raw.length < value.length ? raw : value) : this.number(raw);
      }, exports.ObjectPattern = exports.ObjectExpression = function(node) {
        const props = node.properties;
        this.token("{"), this.printInnerComments(node), props.length && (this.space(), this.printList(props, node, {
          indent: !0,
          statement: !0
        }), this.space());
        this.token("}");
      }, exports.ObjectMethod = function(node) {
        this.printJoin(node.decorators, node), this._methodHead(node), this.space(), this.print(node.body, node);
      }, exports.ObjectProperty = function(node) {
        if (this.printJoin(node.decorators, node), node.computed) this.token("["), this.print(node.key, node), 
        this.token("]"); else {
          if (isAssignmentPattern(node.value) && isIdentifier(node.key) && node.key.name === node.value.left.name) return void this.print(node.value, node);
          if (this.print(node.key, node), node.shorthand && isIdentifier(node.key) && isIdentifier(node.value) && node.key.name === node.value.name) return;
        }
        this.token(":"), this.space(), this.print(node.value, node);
      }, exports.PipelineBareFunction = function(node) {
        this.print(node.callee, node);
      }, exports.PipelinePrimaryTopicReference = function() {
        this.token("#");
      }, exports.PipelineTopicExpression = function(node) {
        this.print(node.expression, node);
      }, exports.RecordExpression = function(node) {
        const props = node.properties;
        let startToken, endToken;
        if ("bar" === this.format.recordAndTupleSyntaxType) startToken = "{|", endToken = "|}"; else {
          if ("hash" !== this.format.recordAndTupleSyntaxType) throw new Error(`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`);
          startToken = "#{", endToken = "}";
        }
        this.token(startToken), this.printInnerComments(node), props.length && (this.space(), 
        this.printList(props, node, {
          indent: !0,
          statement: !0
        }), this.space());
        this.token(endToken);
      }, exports.RegExpLiteral = function(node) {
        this.word(`/${node.pattern}/${node.flags}`);
      }, exports.SpreadElement = exports.RestElement = function(node) {
        this.token("..."), this.print(node.argument, node);
      }, exports.StringLiteral = function(node) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && null != raw) return void this.token(raw);
        const val = _jsesc(node.value, Object.assign(this.format.jsescOption, this.format.jsonCompatibleStrings && {
          json: !0
        }));
        return this.token(val);
      }, exports.TopicReference = function() {
        const {topicToken} = this.format;
        if (!validTopicTokenSet.has(topicToken)) {
          const givenTopicTokenJSON = JSON.stringify(topicToken), validTopics = Array.from(validTopicTokenSet, (v => JSON.stringify(v)));
          throw new Error(`The "topicToken" generator option must be one of ${validTopics.join(", ")} (${givenTopicTokenJSON} received instead).`);
        }
        this.token(topicToken);
      }, exports.TupleExpression = function(node) {
        const elems = node.elements, len = elems.length;
        let startToken, endToken;
        if ("bar" === this.format.recordAndTupleSyntaxType) startToken = "[|", endToken = "|]"; else {
          if ("hash" !== this.format.recordAndTupleSyntaxType) throw new Error(`${this.format.recordAndTupleSyntaxType} is not a valid recordAndTuple syntax type`);
          startToken = "#[", endToken = "]";
        }
        this.token(startToken), this.printInnerComments(node);
        for (let i = 0; i < elems.length; i++) {
          const elem = elems[i];
          elem && (i > 0 && this.space(), this.print(elem, node), i < len - 1 && this.token(","));
        }
        this.token(endToken);
      };
      var _t = __webpack_require__(7289), _jsesc = __webpack_require__(3312);
      const {isAssignmentPattern, isIdentifier} = _t;
      const validTopicTokenSet = new Set([ "^^", "@@", "^", "%", "#" ]);
    },
    2043: (__unused_webpack_module, exports) => {
      "use strict";
      function tokenIfPlusMinus(self, tok) {
        !0 !== tok && self.token(tok);
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.TSAnyKeyword = function() {
        this.word("any");
      }, exports.TSArrayType = function(node) {
        this.print(node.elementType, node), this.token("[]");
      }, exports.TSAsExpression = function(node) {
        const {expression, typeAnnotation} = node;
        this.print(expression, node), this.space(), this.word("as"), this.space(), this.print(typeAnnotation, node);
      }, exports.TSBigIntKeyword = function() {
        this.word("bigint");
      }, exports.TSBooleanKeyword = function() {
        this.word("boolean");
      }, exports.TSCallSignatureDeclaration = function(node) {
        this.tsPrintSignatureDeclarationBase(node), this.token(";");
      }, exports.TSConditionalType = function(node) {
        this.print(node.checkType), this.space(), this.word("extends"), this.space(), this.print(node.extendsType), 
        this.space(), this.token("?"), this.space(), this.print(node.trueType), this.space(), 
        this.token(":"), this.space(), this.print(node.falseType);
      }, exports.TSConstructSignatureDeclaration = function(node) {
        this.word("new"), this.space(), this.tsPrintSignatureDeclarationBase(node), this.token(";");
      }, exports.TSConstructorType = function(node) {
        node.abstract && (this.word("abstract"), this.space());
        this.word("new"), this.space(), this.tsPrintFunctionOrConstructorType(node);
      }, exports.TSDeclareFunction = function(node) {
        node.declare && (this.word("declare"), this.space());
        this._functionHead(node), this.token(";");
      }, exports.TSDeclareMethod = function(node) {
        this._classMethodHead(node), this.token(";");
      }, exports.TSEnumDeclaration = function(node) {
        const {declare, const: isConst, id, members} = node;
        declare && (this.word("declare"), this.space());
        isConst && (this.word("const"), this.space());
        this.word("enum"), this.space(), this.print(id, node), this.space(), this.tsPrintBraced(members, node);
      }, exports.TSEnumMember = function(node) {
        const {id, initializer} = node;
        this.print(id, node), initializer && (this.space(), this.token("="), this.space(), 
        this.print(initializer, node));
        this.token(",");
      }, exports.TSExportAssignment = function(node) {
        this.word("export"), this.space(), this.token("="), this.space(), this.print(node.expression, node), 
        this.token(";");
      }, exports.TSExpressionWithTypeArguments = function(node) {
        this.print(node.expression, node), this.print(node.typeParameters, node);
      }, exports.TSExternalModuleReference = function(node) {
        this.token("require("), this.print(node.expression, node), this.token(")");
      }, exports.TSFunctionType = function(node) {
        this.tsPrintFunctionOrConstructorType(node);
      }, exports.TSImportEqualsDeclaration = function(node) {
        const {isExport, id, moduleReference} = node;
        isExport && (this.word("export"), this.space());
        this.word("import"), this.space(), this.print(id, node), this.space(), this.token("="), 
        this.space(), this.print(moduleReference, node), this.token(";");
      }, exports.TSImportType = function(node) {
        const {argument, qualifier, typeParameters} = node;
        this.word("import"), this.token("("), this.print(argument, node), this.token(")"), 
        qualifier && (this.token("."), this.print(qualifier, node));
        typeParameters && this.print(typeParameters, node);
      }, exports.TSIndexSignature = function(node) {
        const {readonly, static: isStatic} = node;
        isStatic && (this.word("static"), this.space());
        readonly && (this.word("readonly"), this.space());
        this.token("["), this._parameters(node.parameters, node), this.token("]"), this.print(node.typeAnnotation, node), 
        this.token(";");
      }, exports.TSIndexedAccessType = function(node) {
        this.print(node.objectType, node), this.token("["), this.print(node.indexType, node), 
        this.token("]");
      }, exports.TSInferType = function(node) {
        this.token("infer"), this.space(), this.print(node.typeParameter);
      }, exports.TSInterfaceBody = function(node) {
        this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
      }, exports.TSInterfaceDeclaration = function(node) {
        const {declare, id, typeParameters, extends: extendz, body} = node;
        declare && (this.word("declare"), this.space());
        this.word("interface"), this.space(), this.print(id, node), this.print(typeParameters, node), 
        null != extendz && extendz.length && (this.space(), this.word("extends"), this.space(), 
        this.printList(extendz, node));
        this.space(), this.print(body, node);
      }, exports.TSIntersectionType = function(node) {
        this.tsPrintUnionOrIntersectionType(node, "&");
      }, exports.TSIntrinsicKeyword = function() {
        this.word("intrinsic");
      }, exports.TSLiteralType = function(node) {
        this.print(node.literal, node);
      }, exports.TSMappedType = function(node) {
        const {nameType, optional, readonly, typeParameter} = node;
        this.token("{"), this.space(), readonly && (tokenIfPlusMinus(this, readonly), this.word("readonly"), 
        this.space());
        this.token("["), this.word(typeParameter.name), this.space(), this.word("in"), this.space(), 
        this.print(typeParameter.constraint, typeParameter), nameType && (this.space(), 
        this.word("as"), this.space(), this.print(nameType, node));
        this.token("]"), optional && (tokenIfPlusMinus(this, optional), this.token("?"));
        this.token(":"), this.space(), this.print(node.typeAnnotation, node), this.space(), 
        this.token("}");
      }, exports.TSMethodSignature = function(node) {
        const {kind} = node;
        "set" !== kind && "get" !== kind || (this.word(kind), this.space());
        this.tsPrintPropertyOrMethodName(node), this.tsPrintSignatureDeclarationBase(node), 
        this.token(";");
      }, exports.TSModuleBlock = function(node) {
        this.tsPrintBraced(node.body, node);
      }, exports.TSModuleDeclaration = function(node) {
        const {declare, id} = node;
        declare && (this.word("declare"), this.space());
        node.global || (this.word("Identifier" === id.type ? "namespace" : "module"), this.space());
        if (this.print(id, node), !node.body) return void this.token(";");
        let body = node.body;
        for (;"TSModuleDeclaration" === body.type; ) this.token("."), this.print(body.id, body), 
        body = body.body;
        this.space(), this.print(body, node);
      }, exports.TSNamedTupleMember = function(node) {
        this.print(node.label, node), node.optional && this.token("?");
        this.token(":"), this.space(), this.print(node.elementType, node);
      }, exports.TSNamespaceExportDeclaration = function(node) {
        this.word("export"), this.space(), this.word("as"), this.space(), this.word("namespace"), 
        this.space(), this.print(node.id, node);
      }, exports.TSNeverKeyword = function() {
        this.word("never");
      }, exports.TSNonNullExpression = function(node) {
        this.print(node.expression, node), this.token("!");
      }, exports.TSNullKeyword = function() {
        this.word("null");
      }, exports.TSNumberKeyword = function() {
        this.word("number");
      }, exports.TSObjectKeyword = function() {
        this.word("object");
      }, exports.TSOptionalType = function(node) {
        this.print(node.typeAnnotation, node), this.token("?");
      }, exports.TSParameterProperty = function(node) {
        node.accessibility && (this.word(node.accessibility), this.space());
        node.readonly && (this.word("readonly"), this.space());
        this._param(node.parameter);
      }, exports.TSParenthesizedType = function(node) {
        this.token("("), this.print(node.typeAnnotation, node), this.token(")");
      }, exports.TSPropertySignature = function(node) {
        const {readonly, initializer} = node;
        readonly && (this.word("readonly"), this.space());
        this.tsPrintPropertyOrMethodName(node), this.print(node.typeAnnotation, node), initializer && (this.space(), 
        this.token("="), this.space(), this.print(initializer, node));
        this.token(";");
      }, exports.TSQualifiedName = function(node) {
        this.print(node.left, node), this.token("."), this.print(node.right, node);
      }, exports.TSRestType = function(node) {
        this.token("..."), this.print(node.typeAnnotation, node);
      }, exports.TSStringKeyword = function() {
        this.word("string");
      }, exports.TSSymbolKeyword = function() {
        this.word("symbol");
      }, exports.TSThisType = function() {
        this.word("this");
      }, exports.TSTupleType = function(node) {
        this.token("["), this.printList(node.elementTypes, node), this.token("]");
      }, exports.TSTypeAliasDeclaration = function(node) {
        const {declare, id, typeParameters, typeAnnotation} = node;
        declare && (this.word("declare"), this.space());
        this.word("type"), this.space(), this.print(id, node), this.print(typeParameters, node), 
        this.space(), this.token("="), this.space(), this.print(typeAnnotation, node), this.token(";");
      }, exports.TSTypeAnnotation = function(node) {
        this.token(":"), this.space(), node.optional && this.token("?");
        this.print(node.typeAnnotation, node);
      }, exports.TSTypeAssertion = function(node) {
        const {typeAnnotation, expression} = node;
        this.token("<"), this.print(typeAnnotation, node), this.token(">"), this.space(), 
        this.print(expression, node);
      }, exports.TSTypeLiteral = function(node) {
        this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
      }, exports.TSTypeOperator = function(node) {
        this.word(node.operator), this.space(), this.print(node.typeAnnotation, node);
      }, exports.TSTypeParameter = function(node) {
        this.word(node.name), node.constraint && (this.space(), this.word("extends"), this.space(), 
        this.print(node.constraint, node));
        node.default && (this.space(), this.token("="), this.space(), this.print(node.default, node));
      }, exports.TSTypeParameterDeclaration = exports.TSTypeParameterInstantiation = function(node, parent) {
        this.token("<"), this.printList(node.params, node, {}), "ArrowFunctionExpression" === parent.type && 1 === node.params.length && this.token(",");
        this.token(">");
      }, exports.TSTypePredicate = function(node) {
        node.asserts && (this.word("asserts"), this.space());
        this.print(node.parameterName), node.typeAnnotation && (this.space(), this.word("is"), 
        this.space(), this.print(node.typeAnnotation.typeAnnotation));
      }, exports.TSTypeQuery = function(node) {
        this.word("typeof"), this.space(), this.print(node.exprName);
      }, exports.TSTypeReference = function(node) {
        this.print(node.typeName, node), this.print(node.typeParameters, node);
      }, exports.TSUndefinedKeyword = function() {
        this.word("undefined");
      }, exports.TSUnionType = function(node) {
        this.tsPrintUnionOrIntersectionType(node, "|");
      }, exports.TSUnknownKeyword = function() {
        this.word("unknown");
      }, exports.TSVoidKeyword = function() {
        this.word("void");
      }, exports.tsPrintBraced = function(members, node) {
        if (this.token("{"), members.length) {
          this.indent(), this.newline();
          for (const member of members) this.print(member, node), this.newline();
          this.dedent(), this.rightBrace();
        } else this.token("}");
      }, exports.tsPrintClassMemberModifiers = function(node, isField) {
        isField && node.declare && (this.word("declare"), this.space());
        node.accessibility && (this.word(node.accessibility), this.space());
        node.static && (this.word("static"), this.space());
        node.override && (this.word("override"), this.space());
        node.abstract && (this.word("abstract"), this.space());
        isField && node.readonly && (this.word("readonly"), this.space());
      }, exports.tsPrintFunctionOrConstructorType = function(node) {
        const {typeParameters} = node, parameters = node.parameters;
        this.print(typeParameters, node), this.token("("), this._parameters(parameters, node), 
        this.token(")"), this.space(), this.token("=>"), this.space();
        const returnType = node.typeAnnotation;
        this.print(returnType.typeAnnotation, node);
      }, exports.tsPrintPropertyOrMethodName = function(node) {
        node.computed && this.token("[");
        this.print(node.key, node), node.computed && this.token("]");
        node.optional && this.token("?");
      }, exports.tsPrintSignatureDeclarationBase = function(node) {
        const {typeParameters} = node, parameters = node.parameters;
        this.print(typeParameters, node), this.token("("), this._parameters(parameters, node), 
        this.token(")");
        const returnType = node.typeAnnotation;
        this.print(returnType, node);
      }, exports.tsPrintTypeLiteralOrInterfaceBody = function(members, node) {
        this.tsPrintBraced(members, node);
      }, exports.tsPrintUnionOrIntersectionType = function(node, sep) {
        this.printJoin(node.types, node, {
          separator() {
            this.space(), this.token(sep), this.space();
          }
        });
      };
    },
    9166: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.CodeGenerator = void 0, exports.default = function(ast, opts, code) {
        return new Generator(ast, opts, code).generate();
      };
      var _sourceMap = __webpack_require__(7853), _printer = __webpack_require__(3105);
      class Generator extends _printer.default {
        constructor(ast, opts = {}, code) {
          const format = function(code, opts) {
            const format = {
              auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
              auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
              shouldPrintComment: opts.shouldPrintComment,
              retainLines: opts.retainLines,
              retainFunctionParens: opts.retainFunctionParens,
              comments: null == opts.comments || opts.comments,
              compact: opts.compact,
              minified: opts.minified,
              concise: opts.concise,
              indent: {
                adjustMultilineComment: !0,
                style: "  ",
                base: 0
              },
              decoratorsBeforeExport: !!opts.decoratorsBeforeExport,
              jsescOption: Object.assign({
                quotes: "double",
                wrap: !0,
                minimal: !1
              }, opts.jsescOption),
              recordAndTupleSyntaxType: opts.recordAndTupleSyntaxType,
              topicToken: opts.topicToken
            };
            format.jsonCompatibleStrings = opts.jsonCompatibleStrings, format.minified ? (format.compact = !0, 
            format.shouldPrintComment = format.shouldPrintComment || (() => format.comments)) : format.shouldPrintComment = format.shouldPrintComment || (value => format.comments || value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0);
            "auto" === format.compact && (format.compact = code.length > 5e5, format.compact && console.error(`[BABEL] Note: The code generator has deoptimised the styling of ${opts.filename} as it exceeds the max of 500KB.`));
            format.compact && (format.indent.adjustMultilineComment = !1);
            return format;
          }(code, opts);
          super(format, opts.sourceMaps ? new _sourceMap.default(opts, code) : null), this.ast = void 0, 
          this.ast = ast;
        }
        generate() {
          return super.generate(this.ast);
        }
      }
      exports.CodeGenerator = class {
        constructor(ast, opts, code) {
          this._generator = void 0, this._generator = new Generator(ast, opts, code);
        }
        generate() {
          return this._generator.generate();
        }
      };
    },
    2866: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.needsParens = function(node, parent, printStack) {
        if (!parent) return !1;
        if (isNewExpression(parent) && parent.callee === node && isOrHasCallExpression(node)) return !0;
        return find(expandedParens, node, parent, printStack);
      }, exports.needsWhitespace = needsWhitespace, exports.needsWhitespaceAfter = function(node, parent) {
        return needsWhitespace(node, parent, "after");
      }, exports.needsWhitespaceBefore = function(node, parent) {
        return needsWhitespace(node, parent, "before");
      };
      var whitespace = __webpack_require__(4114), parens = __webpack_require__(2514), _t = __webpack_require__(7289);
      const {FLIPPED_ALIAS_KEYS, isCallExpression, isExpressionStatement, isMemberExpression, isNewExpression} = _t;
      function expandAliases(obj) {
        const newObj = {};
        function add(type, func) {
          const fn = newObj[type];
          newObj[type] = fn ? function(node, parent, stack) {
            const result = fn(node, parent, stack);
            return null == result ? func(node, parent, stack) : result;
          } : func;
        }
        for (const type of Object.keys(obj)) {
          const aliases = FLIPPED_ALIAS_KEYS[type];
          if (aliases) for (const alias of aliases) add(alias, obj[type]); else add(type, obj[type]);
        }
        return newObj;
      }
      const expandedParens = expandAliases(parens), expandedWhitespaceNodes = expandAliases(whitespace.nodes), expandedWhitespaceList = expandAliases(whitespace.list);
      function find(obj, node, parent, printStack) {
        const fn = obj[node.type];
        return fn ? fn(node, parent, printStack) : null;
      }
      function isOrHasCallExpression(node) {
        return !!isCallExpression(node) || isMemberExpression(node) && isOrHasCallExpression(node.object);
      }
      function needsWhitespace(node, parent, type) {
        if (!node) return 0;
        isExpressionStatement(node) && (node = node.expression);
        let linesInfo = find(expandedWhitespaceNodes, node, parent);
        if (!linesInfo) {
          const items = find(expandedWhitespaceList, node, parent);
          if (items) for (let i = 0; i < items.length && (linesInfo = needsWhitespace(items[i], node, type), 
          !linesInfo); i++) ;
        }
        return "object" == typeof linesInfo && null !== linesInfo && linesInfo[type] || 0;
      }
    },
    2514: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArrowFunctionExpression = function(node, parent) {
        return isExportDeclaration(parent) || ConditionalExpression(node, parent);
      }, exports.AssignmentExpression = function(node, parent) {
        return !!isObjectPattern(node.left) || ConditionalExpression(node, parent);
      }, exports.Binary = function(node, parent) {
        if ("**" === node.operator && isBinaryExpression(parent, {
          operator: "**"
        })) return parent.left === node;
        if (isClassExtendsClause(node, parent)) return !0;
        if (hasPostfixPart(node, parent) || isUnaryLike(parent) || isAwaitExpression(parent)) return !0;
        if (isBinary(parent)) {
          const parentOp = parent.operator, parentPos = PRECEDENCE[parentOp], nodeOp = node.operator, nodePos = PRECEDENCE[nodeOp];
          if (parentPos === nodePos && parent.right === node && !isLogicalExpression(parent) || parentPos > nodePos) return !0;
        }
      }, exports.BinaryExpression = function(node, parent) {
        return "in" === node.operator && (isVariableDeclarator(parent) || isFor(parent));
      }, exports.ClassExpression = function(node, parent, printStack) {
        return isFirstInContext(printStack, {
          expressionStatement: !0,
          exportDefault: !0
        });
      }, exports.ConditionalExpression = ConditionalExpression, exports.DoExpression = function(node, parent, printStack) {
        return !node.async && isFirstInContext(printStack, {
          expressionStatement: !0
        });
      }, exports.FunctionExpression = function(node, parent, printStack) {
        return isFirstInContext(printStack, {
          expressionStatement: !0,
          exportDefault: !0
        });
      }, exports.FunctionTypeAnnotation = function(node, parent, printStack) {
        return isUnionTypeAnnotation(parent) || isIntersectionTypeAnnotation(parent) || isArrayTypeAnnotation(parent) || isTypeAnnotation(parent) && isArrowFunctionExpression(printStack[printStack.length - 3]);
      }, exports.Identifier = function(node, parent, printStack) {
        if ("let" === node.name) {
          const isFollowedByBracket = isMemberExpression(parent, {
            object: node,
            computed: !0
          }) || isOptionalMemberExpression(parent, {
            object: node,
            computed: !0,
            optional: !1
          });
          return isFirstInContext(printStack, {
            expressionStatement: isFollowedByBracket,
            forHead: isFollowedByBracket,
            forInHead: isFollowedByBracket,
            forOfHead: !0
          });
        }
        return "async" === node.name && isForOfStatement(parent) && node === parent.left;
      }, exports.LogicalExpression = function(node, parent) {
        switch (node.operator) {
         case "||":
          return !!isLogicalExpression(parent) && ("??" === parent.operator || "&&" === parent.operator);

         case "&&":
          return isLogicalExpression(parent, {
            operator: "??"
          });

         case "??":
          return isLogicalExpression(parent) && "??" !== parent.operator;
        }
      }, exports.NullableTypeAnnotation = function(node, parent) {
        return isArrayTypeAnnotation(parent);
      }, exports.ObjectExpression = function(node, parent, printStack) {
        return isFirstInContext(printStack, {
          expressionStatement: !0,
          arrowBody: !0
        });
      }, exports.OptionalIndexedAccessType = function(node, parent) {
        return isIndexedAccessType(parent, {
          objectType: node
        });
      }, exports.OptionalCallExpression = exports.OptionalMemberExpression = function(node, parent) {
        return isCallExpression(parent, {
          callee: node
        }) || isMemberExpression(parent, {
          object: node
        });
      }, exports.SequenceExpression = function(node, parent) {
        if (isForStatement(parent) || isThrowStatement(parent) || isReturnStatement(parent) || isIfStatement(parent) && parent.test === node || isWhileStatement(parent) && parent.test === node || isForInStatement(parent) && parent.right === node || isSwitchStatement(parent) && parent.discriminant === node || isExpressionStatement(parent) && parent.expression === node) return !1;
        return !0;
      }, exports.TSAsExpression = function() {
        return !0;
      }, exports.TSInferType = function(node, parent) {
        return isTSArrayType(parent) || isTSOptionalType(parent);
      }, exports.TSTypeAssertion = function() {
        return !0;
      }, exports.TSIntersectionType = exports.TSUnionType = function(node, parent) {
        return isTSArrayType(parent) || isTSOptionalType(parent) || isTSIntersectionType(parent) || isTSUnionType(parent) || isTSRestType(parent);
      }, exports.UnaryLike = UnaryLike, exports.IntersectionTypeAnnotation = exports.UnionTypeAnnotation = function(node, parent) {
        return isArrayTypeAnnotation(parent) || isNullableTypeAnnotation(parent) || isIntersectionTypeAnnotation(parent) || isUnionTypeAnnotation(parent);
      }, exports.UpdateExpression = function(node, parent) {
        return hasPostfixPart(node, parent) || isClassExtendsClause(node, parent);
      }, exports.AwaitExpression = exports.YieldExpression = function(node, parent) {
        return isBinary(parent) || isUnaryLike(parent) || hasPostfixPart(node, parent) || isAwaitExpression(parent) && isYieldExpression(node) || isConditionalExpression(parent) && node === parent.test || isClassExtendsClause(node, parent);
      };
      var _t = __webpack_require__(7289);
      const {isArrayTypeAnnotation, isArrowFunctionExpression, isAssignmentExpression, isAwaitExpression, isBinary, isBinaryExpression, isCallExpression, isClassDeclaration, isClassExpression, isConditional, isConditionalExpression, isExportDeclaration, isExportDefaultDeclaration, isExpressionStatement, isFor, isForInStatement, isForOfStatement, isForStatement, isIfStatement, isIndexedAccessType, isIntersectionTypeAnnotation, isLogicalExpression, isMemberExpression, isNewExpression, isNullableTypeAnnotation, isObjectPattern, isOptionalCallExpression, isOptionalMemberExpression, isReturnStatement, isSequenceExpression, isSwitchStatement, isTSArrayType, isTSAsExpression, isTSIntersectionType, isTSNonNullExpression, isTSOptionalType, isTSRestType, isTSTypeAssertion, isTSUnionType, isTaggedTemplateExpression, isThrowStatement, isTypeAnnotation, isUnaryLike, isUnionTypeAnnotation, isVariableDeclarator, isWhileStatement, isYieldExpression} = _t, PRECEDENCE = {
        "||": 0,
        "??": 0,
        "&&": 1,
        "|": 2,
        "^": 3,
        "&": 4,
        "==": 5,
        "===": 5,
        "!=": 5,
        "!==": 5,
        "<": 6,
        ">": 6,
        "<=": 6,
        ">=": 6,
        in: 6,
        instanceof: 6,
        ">>": 7,
        "<<": 7,
        ">>>": 7,
        "+": 8,
        "-": 8,
        "*": 9,
        "/": 9,
        "%": 9,
        "**": 10
      }, isClassExtendsClause = (node, parent) => (isClassDeclaration(parent) || isClassExpression(parent)) && parent.superClass === node, hasPostfixPart = (node, parent) => (isMemberExpression(parent) || isOptionalMemberExpression(parent)) && parent.object === node || (isCallExpression(parent) || isOptionalCallExpression(parent) || isNewExpression(parent)) && parent.callee === node || isTaggedTemplateExpression(parent) && parent.tag === node || isTSNonNullExpression(parent);
      function UnaryLike(node, parent) {
        return hasPostfixPart(node, parent) || isBinaryExpression(parent, {
          operator: "**",
          left: node
        }) || isClassExtendsClause(node, parent);
      }
      function ConditionalExpression(node, parent) {
        return !!(isUnaryLike(parent) || isBinary(parent) || isConditionalExpression(parent, {
          test: node
        }) || isAwaitExpression(parent) || isTSTypeAssertion(parent) || isTSAsExpression(parent)) || UnaryLike(node, parent);
      }
      function isFirstInContext(printStack, {expressionStatement = !1, arrowBody = !1, exportDefault = !1, forHead = !1, forInHead = !1, forOfHead = !1}) {
        let i = printStack.length - 1, node = printStack[i];
        i--;
        let parent = printStack[i];
        for (;i >= 0; ) {
          if (expressionStatement && isExpressionStatement(parent, {
            expression: node
          }) || exportDefault && isExportDefaultDeclaration(parent, {
            declaration: node
          }) || arrowBody && isArrowFunctionExpression(parent, {
            body: node
          }) || forHead && isForStatement(parent, {
            init: node
          }) || forInHead && isForInStatement(parent, {
            left: node
          }) || forOfHead && isForOfStatement(parent, {
            left: node
          })) return !0;
          if (!(hasPostfixPart(node, parent) && !isNewExpression(parent) || isSequenceExpression(parent) && parent.expressions[0] === node || isConditional(parent, {
            test: node
          }) || isBinary(parent, {
            left: node
          }) || isAssignmentExpression(parent, {
            left: node
          }))) return !1;
          node = parent, i--, parent = printStack[i];
        }
        return !1;
      }
    },
    4114: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.nodes = exports.list = void 0;
      var _t = __webpack_require__(7289);
      const {FLIPPED_ALIAS_KEYS, isArrayExpression, isAssignmentExpression, isBinary, isBlockStatement, isCallExpression, isFunction, isIdentifier, isLiteral, isMemberExpression, isObjectExpression, isOptionalCallExpression, isOptionalMemberExpression, isStringLiteral} = _t;
      function crawl(node, state = {}) {
        return isMemberExpression(node) || isOptionalMemberExpression(node) ? (crawl(node.object, state), 
        node.computed && crawl(node.property, state)) : isBinary(node) || isAssignmentExpression(node) ? (crawl(node.left, state), 
        crawl(node.right, state)) : isCallExpression(node) || isOptionalCallExpression(node) ? (state.hasCall = !0, 
        crawl(node.callee, state)) : isFunction(node) ? state.hasFunction = !0 : isIdentifier(node) && (state.hasHelper = state.hasHelper || isHelper(node.callee)), 
        state;
      }
      function isHelper(node) {
        return isMemberExpression(node) ? isHelper(node.object) || isHelper(node.property) : isIdentifier(node) ? "require" === node.name || "_" === node.name[0] : isCallExpression(node) ? isHelper(node.callee) : !(!isBinary(node) && !isAssignmentExpression(node)) && (isIdentifier(node.left) && isHelper(node.left) || isHelper(node.right));
      }
      function isType(node) {
        return isLiteral(node) || isObjectExpression(node) || isArrayExpression(node) || isIdentifier(node) || isMemberExpression(node);
      }
      const nodes = {
        AssignmentExpression(node) {
          const state = crawl(node.right);
          if (state.hasCall && state.hasHelper || state.hasFunction) return {
            before: state.hasFunction,
            after: !0
          };
        },
        SwitchCase: (node, parent) => ({
          before: !!node.consequent.length || parent.cases[0] === node,
          after: !node.consequent.length && parent.cases[parent.cases.length - 1] === node
        }),
        LogicalExpression(node) {
          if (isFunction(node.left) || isFunction(node.right)) return {
            after: !0
          };
        },
        Literal(node) {
          if (isStringLiteral(node) && "use strict" === node.value) return {
            after: !0
          };
        },
        CallExpression(node) {
          if (isFunction(node.callee) || isHelper(node)) return {
            before: !0,
            after: !0
          };
        },
        OptionalCallExpression(node) {
          if (isFunction(node.callee)) return {
            before: !0,
            after: !0
          };
        },
        VariableDeclaration(node) {
          for (let i = 0; i < node.declarations.length; i++) {
            const declar = node.declarations[i];
            let enabled = isHelper(declar.id) && !isType(declar.init);
            if (!enabled) {
              const state = crawl(declar.init);
              enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
            }
            if (enabled) return {
              before: !0,
              after: !0
            };
          }
        },
        IfStatement(node) {
          if (isBlockStatement(node.consequent)) return {
            before: !0,
            after: !0
          };
        }
      };
      exports.nodes = nodes, nodes.ObjectProperty = nodes.ObjectTypeProperty = nodes.ObjectMethod = function(node, parent) {
        if (parent.properties[0] === node) return {
          before: !0
        };
      }, nodes.ObjectTypeCallProperty = function(node, parent) {
        var _parent$properties;
        if (parent.callProperties[0] === node && (null == (_parent$properties = parent.properties) || !_parent$properties.length)) return {
          before: !0
        };
      }, nodes.ObjectTypeIndexer = function(node, parent) {
        var _parent$properties2, _parent$callPropertie;
        if (!(parent.indexers[0] !== node || null != (_parent$properties2 = parent.properties) && _parent$properties2.length || null != (_parent$callPropertie = parent.callProperties) && _parent$callPropertie.length)) return {
          before: !0
        };
      }, nodes.ObjectTypeInternalSlot = function(node, parent) {
        var _parent$properties3, _parent$callPropertie2, _parent$indexers;
        if (!(parent.internalSlots[0] !== node || null != (_parent$properties3 = parent.properties) && _parent$properties3.length || null != (_parent$callPropertie2 = parent.callProperties) && _parent$callPropertie2.length || null != (_parent$indexers = parent.indexers) && _parent$indexers.length)) return {
          before: !0
        };
      };
      const list = {
        VariableDeclaration: node => node.declarations.map((decl => decl.init)),
        ArrayExpression: node => node.elements,
        ObjectExpression: node => node.properties
      };
      exports.list = list, [ [ "Function", !0 ], [ "Class", !0 ], [ "Loop", !0 ], [ "LabeledStatement", !0 ], [ "SwitchStatement", !0 ], [ "TryStatement", !0 ] ].forEach((function([type, amounts]) {
        "boolean" == typeof amounts && (amounts = {
          after: amounts,
          before: amounts
        }), [ type ].concat(FLIPPED_ALIAS_KEYS[type] || []).forEach((function(type) {
          nodes[type] = function() {
            return amounts;
          };
        }));
      }));
    },
    3105: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _buffer = __webpack_require__(8649), n = __webpack_require__(2866), _t = __webpack_require__(7289), generatorFunctions = __webpack_require__(8217);
      const {isProgram, isFile, isEmptyStatement} = _t, SCIENTIFIC_NOTATION = /e/i, ZERO_DECIMAL_INTEGER = /\.0+$/, NON_DECIMAL_LITERAL = /^0[box]/, PURE_ANNOTATION_RE = /^\s*[@#]__PURE__\s*$/, {needsParens, needsWhitespaceAfter, needsWhitespaceBefore} = n;
      class Printer {
        constructor(format, map) {
          this.inForStatementInitCounter = 0, this._printStack = [], this._indent = 0, this._insideAux = !1, 
          this._parenPushNewlineState = null, this._noLineTerminator = !1, this._printAuxAfterOnNextUserNode = !1, 
          this._printedComments = new WeakSet, this._endsWithInteger = !1, this._endsWithWord = !1, 
          this.format = format, this._buf = new _buffer.default(map);
        }
        generate(ast) {
          return this.print(ast), this._maybeAddAuxComment(), this._buf.get();
        }
        indent() {
          this.format.compact || this.format.concise || this._indent++;
        }
        dedent() {
          this.format.compact || this.format.concise || this._indent--;
        }
        semicolon(force = !1) {
          this._maybeAddAuxComment(), this._append(";", !force);
        }
        rightBrace() {
          this.format.minified && this._buf.removeLastSemicolon(), this.token("}");
        }
        space(force = !1) {
          if (!this.format.compact) if (force) this._space(); else if (this._buf.hasContent()) {
            const lastCp = this.getLastChar();
            32 !== lastCp && 10 !== lastCp && this._space();
          }
        }
        word(str) {
          (this._endsWithWord || this.endsWith(47) && 47 === str.charCodeAt(0)) && this._space(), 
          this._maybeAddAuxComment(), this._append(str), this._endsWithWord = !0;
        }
        number(str) {
          this.word(str), this._endsWithInteger = Number.isInteger(+str) && !NON_DECIMAL_LITERAL.test(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && 46 !== str.charCodeAt(str.length - 1);
        }
        token(str) {
          const lastChar = this.getLastChar(), strFirst = str.charCodeAt(0);
          ("--" === str && 33 === lastChar || 43 === strFirst && 43 === lastChar || 45 === strFirst && 45 === lastChar || 46 === strFirst && this._endsWithInteger) && this._space(), 
          this._maybeAddAuxComment(), this._append(str);
        }
        newline(i = 1) {
          if (this.format.retainLines || this.format.compact) return;
          if (this.format.concise) return void this.space();
          const charBeforeNewline = this.endsWithCharAndNewline();
          if (10 !== charBeforeNewline && (123 !== charBeforeNewline && 58 !== charBeforeNewline || i--, 
          !(i <= 0))) for (let j = 0; j < i; j++) this._newline();
        }
        endsWith(char) {
          return this.getLastChar() === char;
        }
        getLastChar() {
          return this._buf.getLastChar();
        }
        endsWithCharAndNewline() {
          return this._buf.endsWithCharAndNewline();
        }
        removeTrailingNewline() {
          this._buf.removeTrailingNewline();
        }
        exactSource(loc, cb) {
          this._catchUp("start", loc), this._buf.exactSource(loc, cb);
        }
        source(prop, loc) {
          this._catchUp(prop, loc), this._buf.source(prop, loc);
        }
        withSource(prop, loc, cb) {
          this._catchUp(prop, loc), this._buf.withSource(prop, loc, cb);
        }
        _space() {
          this._append(" ", !0);
        }
        _newline() {
          this._append("\n", !0);
        }
        _append(str, queue = !1) {
          this._maybeAddParen(str), this._maybeIndent(str), queue ? this._buf.queue(str) : this._buf.append(str), 
          this._endsWithWord = !1, this._endsWithInteger = !1;
        }
        _maybeIndent(str) {
          this._indent && this.endsWith(10) && 10 !== str.charCodeAt(0) && this._buf.queueIndentation(this._getIndent());
        }
        _maybeAddParen(str) {
          const parenPushNewlineState = this._parenPushNewlineState;
          if (!parenPushNewlineState) return;
          let i;
          for (i = 0; i < str.length && " " === str[i]; i++) continue;
          if (i === str.length) return;
          const cha = str[i];
          if ("\n" !== cha) {
            if ("/" !== cha || i + 1 === str.length) return void (this._parenPushNewlineState = null);
            const chaPost = str[i + 1];
            if ("*" === chaPost) {
              if (PURE_ANNOTATION_RE.test(str.slice(i + 2, str.length - 2))) return;
            } else if ("/" !== chaPost) return void (this._parenPushNewlineState = null);
          }
          this.token("("), this.indent(), parenPushNewlineState.printed = !0;
        }
        _catchUp(prop, loc) {
          if (!this.format.retainLines) return;
          const pos = loc ? loc[prop] : null;
          if (null != (null == pos ? void 0 : pos.line)) {
            const count = pos.line - this._buf.getCurrentLine();
            for (let i = 0; i < count; i++) this._newline();
          }
        }
        _getIndent() {
          return this.format.indent.style.repeat(this._indent);
        }
        startTerminatorless(isLabel = !1) {
          return isLabel ? (this._noLineTerminator = !0, null) : this._parenPushNewlineState = {
            printed: !1
          };
        }
        endTerminatorless(state) {
          this._noLineTerminator = !1, null != state && state.printed && (this.dedent(), this.newline(), 
          this.token(")"));
        }
        print(node, parent) {
          if (!node) return;
          const oldConcise = this.format.concise;
          node._compact && (this.format.concise = !0);
          const printMethod = this[node.type];
          if (!printMethod) throw new ReferenceError(`unknown node of type ${JSON.stringify(node.type)} with constructor ${JSON.stringify(null == node ? void 0 : node.constructor.name)}`);
          this._printStack.push(node);
          const oldInAux = this._insideAux;
          this._insideAux = !node.loc, this._maybeAddAuxComment(this._insideAux && !oldInAux);
          let shouldPrintParens = needsParens(node, parent, this._printStack);
          this.format.retainFunctionParens && "FunctionExpression" === node.type && node.extra && node.extra.parenthesized && (shouldPrintParens = !0), 
          shouldPrintParens && this.token("("), this._printLeadingComments(node);
          const loc = isProgram(node) || isFile(node) ? null : node.loc;
          this.withSource("start", loc, (() => {
            printMethod.call(this, node, parent);
          })), this._printTrailingComments(node), shouldPrintParens && this.token(")"), this._printStack.pop(), 
          this.format.concise = oldConcise, this._insideAux = oldInAux;
        }
        _maybeAddAuxComment(enteredPositionlessNode) {
          enteredPositionlessNode && this._printAuxBeforeComment(), this._insideAux || this._printAuxAfterComment();
        }
        _printAuxBeforeComment() {
          if (this._printAuxAfterOnNextUserNode) return;
          this._printAuxAfterOnNextUserNode = !0;
          const comment = this.format.auxiliaryCommentBefore;
          comment && this._printComment({
            type: "CommentBlock",
            value: comment
          });
        }
        _printAuxAfterComment() {
          if (!this._printAuxAfterOnNextUserNode) return;
          this._printAuxAfterOnNextUserNode = !1;
          const comment = this.format.auxiliaryCommentAfter;
          comment && this._printComment({
            type: "CommentBlock",
            value: comment
          });
        }
        getPossibleRaw(node) {
          const extra = node.extra;
          if (extra && null != extra.raw && null != extra.rawValue && node.value === extra.rawValue) return extra.raw;
        }
        printJoin(nodes, parent, opts = {}) {
          if (null == nodes || !nodes.length) return;
          opts.indent && this.indent();
          const newlineOpts = {
            addNewlines: opts.addNewlines
          };
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node && (opts.statement && this._printNewline(!0, node, parent, newlineOpts), this.print(node, parent), 
            opts.iterator && opts.iterator(node, i), opts.separator && i < nodes.length - 1 && opts.separator.call(this), 
            opts.statement && this._printNewline(!1, node, parent, newlineOpts));
          }
          opts.indent && this.dedent();
        }
        printAndIndentOnComments(node, parent) {
          const indent = node.leadingComments && node.leadingComments.length > 0;
          indent && this.indent(), this.print(node, parent), indent && this.dedent();
        }
        printBlock(parent) {
          const node = parent.body;
          isEmptyStatement(node) || this.space(), this.print(node, parent);
        }
        _printTrailingComments(node) {
          this._printComments(this._getComments(!1, node));
        }
        _printLeadingComments(node) {
          this._printComments(this._getComments(!0, node), !0);
        }
        printInnerComments(node, indent = !0) {
          var _node$innerComments;
          null != (_node$innerComments = node.innerComments) && _node$innerComments.length && (indent && this.indent(), 
          this._printComments(node.innerComments), indent && this.dedent());
        }
        printSequence(nodes, parent, opts = {}) {
          return opts.statement = !0, this.printJoin(nodes, parent, opts);
        }
        printList(items, parent, opts = {}) {
          return null == opts.separator && (opts.separator = commaSeparator), this.printJoin(items, parent, opts);
        }
        _printNewline(leading, node, parent, opts) {
          if (this.format.retainLines || this.format.compact) return;
          if (this.format.concise) return void this.space();
          let lines = 0;
          if (this._buf.hasContent()) {
            leading || lines++, opts.addNewlines && (lines += opts.addNewlines(leading, node) || 0);
            (leading ? needsWhitespaceBefore : needsWhitespaceAfter)(node, parent) && lines++;
          }
          this.newline(Math.min(2, lines));
        }
        _getComments(leading, node) {
          return node && (leading ? node.leadingComments : node.trailingComments) || [];
        }
        _printComment(comment, skipNewLines) {
          if (!this.format.shouldPrintComment(comment.value)) return;
          if (comment.ignore) return;
          if (this._printedComments.has(comment)) return;
          this._printedComments.add(comment);
          const isBlockComment = "CommentBlock" === comment.type, printNewLines = isBlockComment && !skipNewLines && !this._noLineTerminator;
          printNewLines && this._buf.hasContent() && this.newline(1);
          const lastCharCode = this.getLastChar();
          91 !== lastCharCode && 123 !== lastCharCode && this.space();
          let val = isBlockComment || this._noLineTerminator ? `/*${comment.value}*/` : `//${comment.value}\n`;
          if (isBlockComment && this.format.indent.adjustMultilineComment) {
            var _comment$loc;
            const offset = null == (_comment$loc = comment.loc) ? void 0 : _comment$loc.start.column;
            if (offset) {
              const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
              val = val.replace(newlineRegex, "\n");
            }
            const indentSize = Math.max(this._getIndent().length, this.format.retainLines ? 0 : this._buf.getCurrentColumn());
            val = val.replace(/\n(?!$)/g, `\n${" ".repeat(indentSize)}`);
          }
          this.endsWith(47) && this._space(), this.withSource("start", comment.loc, (() => {
            this._append(val);
          })), printNewLines && this.newline(1);
        }
        _printComments(comments, inlinePureAnnotation) {
          if (null != comments && comments.length) if (inlinePureAnnotation && 1 === comments.length && PURE_ANNOTATION_RE.test(comments[0].value)) this._printComment(comments[0], this._buf.hasContent() && !this.endsWith(10)); else for (const comment of comments) this._printComment(comment);
        }
        printAssertions(node) {
          var _node$assertions;
          null != (_node$assertions = node.assertions) && _node$assertions.length && (this.space(), 
          this.word("assert"), this.space(), this.token("{"), this.space(), this.printList(node.assertions, node), 
          this.space(), this.token("}"));
        }
      }
      Object.assign(Printer.prototype, generatorFunctions), Printer.prototype.Noop = function() {};
      var _default = Printer;
      function commaSeparator() {
        this.token(","), this.space();
      }
      exports.default = _default;
    },
    7853: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _genMapping = __webpack_require__(2509);
      exports.default = class {
        constructor(opts, code) {
          var _opts$sourceFileName;
          this._map = void 0, this._rawMappings = void 0, this._sourceFileName = void 0, this._lastGenLine = 0, 
          this._lastSourceLine = 0, this._lastSourceColumn = 0;
          const map = this._map = new _genMapping.GenMapping({
            sourceRoot: opts.sourceRoot
          });
          this._sourceFileName = null == (_opts$sourceFileName = opts.sourceFileName) ? void 0 : _opts$sourceFileName.replace(/\\/g, "/"), 
          this._rawMappings = void 0, "string" == typeof code ? (0, _genMapping.setSourceContent)(map, this._sourceFileName, code) : "object" == typeof code && Object.keys(code).forEach((sourceFileName => {
            (0, _genMapping.setSourceContent)(map, sourceFileName.replace(/\\/g, "/"), code[sourceFileName]);
          }));
        }
        get() {
          return (0, _genMapping.encodedMap)(this._map);
        }
        getDecoded() {
          return (0, _genMapping.decodedMap)(this._map);
        }
        getRawMappings() {
          return this._rawMappings || (this._rawMappings = (0, _genMapping.allMappings)(this._map));
        }
        mark(generated, line, column, identifierName, filename, force) {
          const generatedLine = generated.line;
          this._lastGenLine !== generatedLine && null == line || (force || this._lastGenLine !== generatedLine || this._lastSourceLine !== line || this._lastSourceColumn !== column) && (this._rawMappings = void 0, 
          this._lastGenLine = generatedLine, this._lastSourceLine = line, this._lastSourceColumn = column, 
          (0, _genMapping.addMapping)(this._map, {
            name: identifierName,
            generated,
            source: null == line ? void 0 : (null == filename ? void 0 : filename.replace(/\\/g, "/")) || this._sourceFileName,
            original: null == line ? void 0 : {
              line,
              column
            }
          }));
        }
      };
    },
    1692: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, exports.skipAllButComputedKey = skipAllButComputedKey;
      var _t = __webpack_require__(7289);
      const {VISITOR_KEYS, staticBlock} = _t;
      function skipAllButComputedKey(path) {
        if (!path.node.computed) return void path.skip();
        const keys = VISITOR_KEYS[path.type];
        for (const key of keys) "key" !== key && path.skipKey(key);
      }
      var _default = {
        [(staticBlock ? "StaticBlock|" : "") + "ClassPrivateProperty|TypeAnnotation|FunctionDeclaration|FunctionExpression"]: path => path.skip(),
        "Method|ClassProperty"(path) {
          skipAllButComputedKey(path);
        }
      };
      exports.default = _default;
    },
    1485: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function({node, parent, scope, id}, localBinding = !1, supportUnicodeId = !1) {
        if (node.id) return;
        if (!isObjectProperty(parent) && !isObjectMethod(parent, {
          kind: "method"
        }) || parent.computed && !isLiteral(parent.key)) {
          if (isVariableDeclarator(parent)) {
            if (id = parent.id, isIdentifier(id) && !localBinding) {
              const binding = scope.parent.getBinding(id.name);
              if (binding && binding.constant && scope.getBinding(id.name) === binding) return node.id = cloneNode(id), 
              void (node.id[NOT_LOCAL_BINDING] = !0);
            }
          } else if (isAssignmentExpression(parent, {
            operator: "="
          })) id = parent.left; else if (!id) return;
        } else id = parent.key;
        let name;
        id && isLiteral(id) ? name = function(id) {
          if (isNullLiteral(id)) return "null";
          if (isRegExpLiteral(id)) return `_${id.pattern}_${id.flags}`;
          if (isTemplateLiteral(id)) return id.quasis.map((quasi => quasi.value.raw)).join("");
          if (void 0 !== id.value) return id.value + "";
          return "";
        }(id) : id && isIdentifier(id) && (name = id.name);
        if (void 0 === name) return;
        if (!supportUnicodeId && isFunction(node) && /[\uD800-\uDFFF]/.test(name)) return;
        name = toBindingIdentifierName(name), (id = identifier(name))[NOT_LOCAL_BINDING] = !0;
        return function(state, method, id, scope) {
          if (state.selfReference) {
            if (!scope.hasBinding(id.name) || scope.hasGlobal(id.name)) {
              if (!isFunction(method)) return;
              let build = buildPropertyMethodAssignmentWrapper;
              method.generator && (build = buildGeneratorPropertyMethodAssignmentWrapper);
              const template = build({
                FUNCTION: method,
                FUNCTION_ID: id,
                FUNCTION_KEY: scope.generateUidIdentifier(id.name)
              }).expression, params = template.callee.body.body[0].params;
              for (let i = 0, len = function(node) {
                const count = node.params.findIndex((param => isAssignmentPattern(param) || isRestElement(param)));
                return -1 === count ? node.params.length : count;
              }(method); i < len; i++) params.push(scope.generateUidIdentifier("x"));
              return template;
            }
            scope.rename(id.name);
          }
          method.id = id, scope.getProgramParent().references[id.name] = !0;
        }(function(node, name, scope) {
          const state = {
            selfAssignment: !1,
            selfReference: !1,
            outerDeclar: scope.getBindingIdentifier(name),
            references: [],
            name
          }, binding = scope.getOwnBinding(name);
          binding ? "param" === binding.kind && (state.selfReference = !0) : (state.outerDeclar || scope.hasGlobal(name)) && scope.traverse(node, visitor, state);
          return state;
        }(node, name, scope), node, id, scope) || node;
      };
      var _template = __webpack_require__(4847), _t = __webpack_require__(7289);
      const {NOT_LOCAL_BINDING, cloneNode, identifier, isAssignmentExpression, isAssignmentPattern, isFunction, isIdentifier, isLiteral, isNullLiteral, isObjectMethod, isObjectProperty, isRegExpLiteral, isRestElement, isTemplateLiteral, isVariableDeclarator, toBindingIdentifierName} = _t;
      const buildPropertyMethodAssignmentWrapper = (0, _template.default)("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), buildGeneratorPropertyMethodAssignmentWrapper = (0, 
      _template.default)("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), visitor = {
        "ReferencedIdentifier|BindingIdentifier"(path, state) {
          if (path.node.name !== state.name) return;
          path.scope.getBindingIdentifier(state.name) === state.outerDeclar && (state.selfReference = !0, 
          path.stop());
        }
      };
    },
    9061: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path, emit, kind = "var") {
        path.traverse(visitor, {
          kind,
          emit
        });
      };
      var _t = __webpack_require__(7289);
      const {assignmentExpression, expressionStatement, identifier} = _t, visitor = {
        Scope(path, state) {
          "let" === state.kind && path.skip();
        },
        FunctionParent(path) {
          path.skip();
        },
        VariableDeclaration(path, state) {
          if (state.kind && path.node.kind !== state.kind) return;
          const nodes = [], declarations = path.get("declarations");
          let firstId;
          for (const declar of declarations) {
            firstId = declar.node.id, declar.node.init && nodes.push(expressionStatement(assignmentExpression("=", declar.node.id, declar.node.init)));
            for (const name of Object.keys(declar.getBindingIdentifiers())) state.emit(identifier(name), name, null !== declar.node.init);
          }
          path.parentPath.isFor({
            left: path.node
          }) ? path.replaceWith(firstId) : path.replaceWithMultiple(nodes);
        }
      };
    },
    4170: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(exportDeclaration) {
        if (!exportDeclaration.isExportDeclaration()) throw new Error("Only export declarations can be split.");
        const isDefault = exportDeclaration.isExportDefaultDeclaration(), declaration = exportDeclaration.get("declaration"), isClassDeclaration = declaration.isClassDeclaration();
        if (isDefault) {
          const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration, scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
          let id = declaration.node.id, needBindingRegistration = !1;
          id || (needBindingRegistration = !0, id = scope.generateUidIdentifier("default"), 
          (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) && (declaration.node.id = cloneNode(id)));
          const updatedDeclaration = standaloneDeclaration ? declaration : variableDeclaration("var", [ variableDeclarator(cloneNode(id), declaration.node) ]), updatedExportDeclaration = exportNamedDeclaration(null, [ exportSpecifier(cloneNode(id), identifier("default")) ]);
          return exportDeclaration.insertAfter(updatedExportDeclaration), exportDeclaration.replaceWith(updatedDeclaration), 
          needBindingRegistration && scope.registerDeclaration(exportDeclaration), exportDeclaration;
        }
        if (exportDeclaration.get("specifiers").length > 0) throw new Error("It doesn't make sense to split exported specifiers.");
        const bindingIdentifiers = declaration.getOuterBindingIdentifiers(), specifiers = Object.keys(bindingIdentifiers).map((name => exportSpecifier(identifier(name), identifier(name)))), aliasDeclar = exportNamedDeclaration(null, specifiers);
        return exportDeclaration.insertAfter(aliasDeclar), exportDeclaration.replaceWith(declaration.node), 
        exportDeclaration;
      };
      var _t = __webpack_require__(7289);
      const {cloneNode, exportNamedDeclaration, exportSpecifier, identifier, variableDeclaration, variableDeclarator} = _t;
    },
    3306: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isIdentifierChar = isIdentifierChar, exports.isIdentifierName = function(name) {
        let isFirst = !0;
        for (let i = 0; i < name.length; i++) {
          let cp = name.charCodeAt(i);
          if (55296 == (64512 & cp) && i + 1 < name.length) {
            const trail = name.charCodeAt(++i);
            56320 == (64512 & trail) && (cp = 65536 + ((1023 & cp) << 10) + (1023 & trail));
          }
          if (isFirst) {
            if (isFirst = !1, !isIdentifierStart(cp)) return !1;
          } else if (!isIdentifierChar(cp)) return !1;
        }
        return !isFirst;
      }, exports.isIdentifierStart = isIdentifierStart;
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
    },
    720: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "isIdentifierChar", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierChar;
        }
      }), Object.defineProperty(exports, "isIdentifierName", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierName;
        }
      }), Object.defineProperty(exports, "isIdentifierStart", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierStart;
        }
      }), Object.defineProperty(exports, "isKeyword", {
        enumerable: !0,
        get: function() {
          return _keyword.isKeyword;
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
      });
      var _identifier = __webpack_require__(3306), _keyword = __webpack_require__(2887);
    },
    2887: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isKeyword = function(word) {
        return keywords.has(word);
      }, exports.isReservedWord = isReservedWord, exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, 
      exports.isStrictBindReservedWord = function(word, inModule) {
        return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
      }, exports.isStrictReservedWord = isStrictReservedWord;
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
    },
    3014: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(code, options = {}) {
        if ("" !== code && shouldHighlight(options)) {
          const defs = function(chalk) {
            return {
              keyword: chalk.cyan,
              capitalized: chalk.yellow,
              jsxIdentifier: chalk.yellow,
              punctuator: chalk.yellow,
              number: chalk.magenta,
              string: chalk.green,
              regex: chalk.magenta,
              comment: chalk.grey,
              invalid: chalk.white.bgRed.bold
            };
          }(getChalk(options));
          return function(defs, text) {
            let highlighted = "";
            for (const {type, value} of tokenize(text)) {
              const colorize = defs[type];
              highlighted += colorize ? value.split(NEWLINE).map((str => colorize(str))).join("\n") : value;
            }
            return highlighted;
          }(defs, code);
        }
        return code;
      }, exports.getChalk = getChalk, exports.shouldHighlight = shouldHighlight;
      var _jsTokens = __webpack_require__(6188), _helperValidatorIdentifier = __webpack_require__(720), _chalk = __webpack_require__(3920);
      const sometimesKeywords = new Set([ "as", "async", "from", "get", "of", "set" ]);
      const NEWLINE = /\r\n|[\n\r\u2028\u2029]/, BRACKET = /^[()[\]{}]$/;
      let tokenize;
      {
        const JSX_TAG = /^[a-z][\w-]*$/i, getTokenType = function(token, offset, text) {
          if ("name" === token.type) {
            if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isStrictReservedWord)(token.value, !0) || sometimesKeywords.has(token.value)) return "keyword";
            if (JSX_TAG.test(token.value) && ("<" === text[offset - 1] || "</" == text.slice(offset - 2, offset))) return "jsxIdentifier";
            if (token.value[0] !== token.value[0].toLowerCase()) return "capitalized";
          }
          return "punctuator" === token.type && BRACKET.test(token.value) ? "bracket" : "invalid" !== token.type || "@" !== token.value && "#" !== token.value ? token.type : "punctuator";
        };
        tokenize = function*(text) {
          let match;
          for (;match = _jsTokens.default.exec(text); ) {
            const token = _jsTokens.matchToToken(match);
            yield {
              type: getTokenType(token, match.index, text),
              value: token.value
            };
          }
        };
      }
      function shouldHighlight(options) {
        return !!_chalk.supportsColor || options.forceColor;
      }
      function getChalk(options) {
        return options.forceColor ? new _chalk.constructor({
          enabled: !0,
          level: 1
        }) : _chalk;
      }
    },
    9007: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function createTemplateBuilder(formatter, defaultOpts) {
        const templateFnCache = new WeakMap, templateAstCache = new WeakMap, cachedOpts = defaultOpts || (0, 
        _options.validate)(null);
        return Object.assign(((tpl, ...args) => {
          if ("string" == typeof tpl) {
            if (args.length > 1) throw new Error("Unexpected extra params.");
            return extendedTrace((0, _string.default)(formatter, tpl, (0, _options.merge)(cachedOpts, (0, 
            _options.validate)(args[0]))));
          }
          if (Array.isArray(tpl)) {
            let builder = templateFnCache.get(tpl);
            return builder || (builder = (0, _literal.default)(formatter, tpl, cachedOpts), 
            templateFnCache.set(tpl, builder)), extendedTrace(builder(args));
          }
          if ("object" == typeof tpl && tpl) {
            if (args.length > 0) throw new Error("Unexpected extra params.");
            return createTemplateBuilder(formatter, (0, _options.merge)(cachedOpts, (0, _options.validate)(tpl)));
          }
          throw new Error("Unexpected template param " + typeof tpl);
        }), {
          ast: (tpl, ...args) => {
            if ("string" == typeof tpl) {
              if (args.length > 1) throw new Error("Unexpected extra params.");
              return (0, _string.default)(formatter, tpl, (0, _options.merge)((0, _options.merge)(cachedOpts, (0, 
              _options.validate)(args[0])), NO_PLACEHOLDER))();
            }
            if (Array.isArray(tpl)) {
              let builder = templateAstCache.get(tpl);
              return builder || (builder = (0, _literal.default)(formatter, tpl, (0, _options.merge)(cachedOpts, NO_PLACEHOLDER)), 
              templateAstCache.set(tpl, builder)), builder(args)();
            }
            throw new Error("Unexpected template param " + typeof tpl);
          }
        });
      };
      var _options = __webpack_require__(698), _string = __webpack_require__(4515), _literal = __webpack_require__(9948);
      const NO_PLACEHOLDER = (0, _options.validate)({
        placeholderPattern: !1
      });
      function extendedTrace(fn) {
        let rootStack = "";
        try {
          throw new Error;
        } catch (error) {
          error.stack && (rootStack = error.stack.split("\n").slice(3).join("\n"));
        }
        return arg => {
          try {
            return fn(arg);
          } catch (err) {
            throw err.stack += `\n    =============\n${rootStack}`, err;
          }
        };
      }
    },
    1522: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.statements = exports.statement = exports.smart = exports.program = exports.expression = void 0;
      var _t = __webpack_require__(7289);
      const {assertExpressionStatement} = _t;
      function makeStatementFormatter(fn) {
        return {
          code: str => `/* @babel/template */;\n${str}`,
          validate: () => {},
          unwrap: ast => fn(ast.program.body.slice(1))
        };
      }
      const smart = makeStatementFormatter((body => body.length > 1 ? body : body[0]));
      exports.smart = smart;
      const statements = makeStatementFormatter((body => body));
      exports.statements = statements;
      const statement = makeStatementFormatter((body => {
        if (0 === body.length) throw new Error("Found nothing to return.");
        if (body.length > 1) throw new Error("Found multiple statements but wanted one");
        return body[0];
      }));
      exports.statement = statement;
      const expression = {
        code: str => `(\n${str}\n)`,
        validate: ast => {
          if (ast.program.body.length > 1) throw new Error("Found multiple statements but wanted one");
          if (0 === expression.unwrap(ast).start) throw new Error("Parse result included parens.");
        },
        unwrap: ({program}) => {
          const [stmt] = program.body;
          return assertExpressionStatement(stmt), stmt.expression;
        }
      };
      exports.expression = expression;
      exports.program = {
        code: str => str,
        validate: () => {},
        unwrap: ast => ast.program
      };
    },
    4847: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.statements = exports.statement = exports.smart = exports.program = exports.expression = exports.default = void 0;
      var formatters = __webpack_require__(1522), _builder = __webpack_require__(9007);
      const smart = (0, _builder.default)(formatters.smart);
      exports.smart = smart;
      const statement = (0, _builder.default)(formatters.statement);
      exports.statement = statement;
      const statements = (0, _builder.default)(formatters.statements);
      exports.statements = statements;
      const expression = (0, _builder.default)(formatters.expression);
      exports.expression = expression;
      const program = (0, _builder.default)(formatters.program);
      exports.program = program;
      var _default = Object.assign(smart.bind(void 0), {
        smart,
        statement,
        statements,
        expression,
        program,
        ast: smart.ast
      });
      exports.default = _default;
    },
    9948: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(formatter, tpl, opts) {
        const {metadata, names} = function(formatter, tpl, opts) {
          let names, nameSet, metadata, prefix = "";
          do {
            prefix += "$";
            const result = buildTemplateCode(tpl, prefix);
            names = result.names, nameSet = new Set(names), metadata = (0, _parse.default)(formatter, formatter.code(result.code), {
              parser: opts.parser,
              placeholderWhitelist: new Set(result.names.concat(opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [])),
              placeholderPattern: opts.placeholderPattern,
              preserveComments: opts.preserveComments,
              syntacticPlaceholders: opts.syntacticPlaceholders
            });
          } while (metadata.placeholders.some((placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name))));
          return {
            metadata,
            names
          };
        }(formatter, tpl, opts);
        return arg => {
          const defaultReplacements = {};
          return arg.forEach(((replacement, i) => {
            defaultReplacements[names[i]] = replacement;
          })), arg => {
            const replacements = (0, _options.normalizeReplacements)(arg);
            return replacements && Object.keys(replacements).forEach((key => {
              if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) throw new Error("Unexpected replacement overlap.");
            })), formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
          };
        };
      };
      var _options = __webpack_require__(698), _parse = __webpack_require__(5672), _populate = __webpack_require__(1969);
      function buildTemplateCode(tpl, prefix) {
        const names = [];
        let code = tpl[0];
        for (let i = 1; i < tpl.length; i++) {
          const value = `${prefix}${i - 1}`;
          names.push(value), code += value + tpl[i];
        }
        return {
          names,
          code
        };
      }
    },
    698: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.merge = function(a, b) {
        const {placeholderWhitelist = a.placeholderWhitelist, placeholderPattern = a.placeholderPattern, preserveComments = a.preserveComments, syntacticPlaceholders = a.syntacticPlaceholders} = b;
        return {
          parser: Object.assign({}, a.parser, b.parser),
          placeholderWhitelist,
          placeholderPattern,
          preserveComments,
          syntacticPlaceholders
        };
      }, exports.normalizeReplacements = function(replacements) {
        if (Array.isArray(replacements)) return replacements.reduce(((acc, replacement, i) => (acc["$" + i] = replacement, 
        acc)), {});
        if ("object" == typeof replacements || null == replacements) return replacements || void 0;
        throw new Error("Template replacements must be an array, object, null, or undefined");
      }, exports.validate = function(opts) {
        if (null != opts && "object" != typeof opts) throw new Error("Unknown template options.");
        const _ref = opts || {}, {placeholderWhitelist, placeholderPattern, preserveComments, syntacticPlaceholders} = _ref, parser = function(source, excluded) {
          if (null == source) return {};
          var key, i, target = {}, sourceKeys = Object.keys(source);
          for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
          return target;
        }(_ref, _excluded);
        if (null != placeholderWhitelist && !(placeholderWhitelist instanceof Set)) throw new Error("'.placeholderWhitelist' must be a Set, null, or undefined");
        if (null != placeholderPattern && !(placeholderPattern instanceof RegExp) && !1 !== placeholderPattern) throw new Error("'.placeholderPattern' must be a RegExp, false, null, or undefined");
        if (null != preserveComments && "boolean" != typeof preserveComments) throw new Error("'.preserveComments' must be a boolean, null, or undefined");
        if (null != syntacticPlaceholders && "boolean" != typeof syntacticPlaceholders) throw new Error("'.syntacticPlaceholders' must be a boolean, null, or undefined");
        if (!0 === syntacticPlaceholders && (null != placeholderWhitelist || null != placeholderPattern)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
        return {
          parser,
          placeholderWhitelist: placeholderWhitelist || void 0,
          placeholderPattern: null == placeholderPattern ? void 0 : placeholderPattern,
          preserveComments: null == preserveComments ? void 0 : preserveComments,
          syntacticPlaceholders: null == syntacticPlaceholders ? void 0 : syntacticPlaceholders
        };
      };
      const _excluded = [ "placeholderWhitelist", "placeholderPattern", "preserveComments", "syntacticPlaceholders" ];
    },
    5672: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(formatter, code, opts) {
        const {placeholderWhitelist, placeholderPattern, preserveComments, syntacticPlaceholders} = opts, ast = function(code, parserOpts, syntacticPlaceholders) {
          const plugins = (parserOpts.plugins || []).slice();
          !1 !== syntacticPlaceholders && plugins.push("placeholders");
          parserOpts = Object.assign({
            allowReturnOutsideFunction: !0,
            allowSuperOutsideMethod: !0,
            sourceType: "module"
          }, parserOpts, {
            plugins
          });
          try {
            return (0, _parser.parse)(code, parserOpts);
          } catch (err) {
            const loc = err.loc;
            throw loc && (err.message += "\n" + (0, _codeFrame.codeFrameColumns)(code, {
              start: loc
            }), err.code = "BABEL_TEMPLATE_PARSE_ERROR"), err;
          }
        }(code, opts.parser, syntacticPlaceholders);
        removePropertiesDeep(ast, {
          preserveComments
        }), formatter.validate(ast);
        const syntactic = {
          placeholders: [],
          placeholderNames: new Set
        }, legacy = {
          placeholders: [],
          placeholderNames: new Set
        }, isLegacyRef = {
          value: void 0
        };
        return traverse(ast, placeholderVisitorHandler, {
          syntactic,
          legacy,
          isLegacyRef,
          placeholderWhitelist,
          placeholderPattern,
          syntacticPlaceholders
        }), Object.assign({
          ast
        }, isLegacyRef.value ? legacy : syntactic);
      };
      var _t = __webpack_require__(7289), _parser = __webpack_require__(9516), _codeFrame = __webpack_require__(4709);
      const {isCallExpression, isExpressionStatement, isFunction, isIdentifier, isJSXIdentifier, isNewExpression, isPlaceholder, isStatement, isStringLiteral, removePropertiesDeep, traverse} = _t, PATTERN = /^[_$A-Z0-9]+$/;
      function placeholderVisitorHandler(node, ancestors, state) {
        var _state$placeholderWhi;
        let name;
        if (isPlaceholder(node)) {
          if (!1 === state.syntacticPlaceholders) throw new Error("%%foo%%-style placeholders can't be used when '.syntacticPlaceholders' is false.");
          name = node.name.name, state.isLegacyRef.value = !1;
        } else {
          if (!1 === state.isLegacyRef.value || state.syntacticPlaceholders) return;
          if (isIdentifier(node) || isJSXIdentifier(node)) name = node.name, state.isLegacyRef.value = !0; else {
            if (!isStringLiteral(node)) return;
            name = node.value, state.isLegacyRef.value = !0;
          }
        }
        if (!state.isLegacyRef.value && (null != state.placeholderPattern || null != state.placeholderWhitelist)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
        if (state.isLegacyRef.value && (!1 === state.placeholderPattern || !(state.placeholderPattern || PATTERN).test(name)) && (null == (_state$placeholderWhi = state.placeholderWhitelist) || !_state$placeholderWhi.has(name))) return;
        ancestors = ancestors.slice();
        const {node: parent, key} = ancestors[ancestors.length - 1];
        let type;
        isStringLiteral(node) || isPlaceholder(node, {
          expectedNode: "StringLiteral"
        }) ? type = "string" : isNewExpression(parent) && "arguments" === key || isCallExpression(parent) && "arguments" === key || isFunction(parent) && "params" === key ? type = "param" : isExpressionStatement(parent) && !isPlaceholder(node) ? (type = "statement", 
        ancestors = ancestors.slice(0, -1)) : type = isStatement(node) && isPlaceholder(node) ? "statement" : "other";
        const {placeholders, placeholderNames} = state.isLegacyRef.value ? state.legacy : state.syntactic;
        placeholders.push({
          name,
          type,
          resolve: ast => function(ast, ancestors) {
            let parent = ast;
            for (let i = 0; i < ancestors.length - 1; i++) {
              const {key, index} = ancestors[i];
              parent = void 0 === index ? parent[key] : parent[key][index];
            }
            const {key, index} = ancestors[ancestors.length - 1];
            return {
              parent,
              key,
              index
            };
          }(ast, ancestors),
          isDuplicate: placeholderNames.has(name)
        }), placeholderNames.add(name);
      }
    },
    1969: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(metadata, replacements) {
        const ast = cloneNode(metadata.ast);
        replacements && (metadata.placeholders.forEach((placeholder => {
          if (!Object.prototype.hasOwnProperty.call(replacements, placeholder.name)) {
            const placeholderName = placeholder.name;
            throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a\n            placeholder you may want to consider passing one of the following options to @babel/template:\n            - { placeholderPattern: false, placeholderWhitelist: new Set(['${placeholderName}'])}\n            - { placeholderPattern: /^${placeholderName}$/ }`);
          }
        })), Object.keys(replacements).forEach((key => {
          if (!metadata.placeholderNames.has(key)) throw new Error(`Unknown substitution "${key}" given`);
        })));
        return metadata.placeholders.slice().reverse().forEach((placeholder => {
          try {
            !function(placeholder, ast, replacement) {
              placeholder.isDuplicate && (Array.isArray(replacement) ? replacement = replacement.map((node => cloneNode(node))) : "object" == typeof replacement && (replacement = cloneNode(replacement)));
              const {parent, key, index} = placeholder.resolve(ast);
              if ("string" === placeholder.type) {
                if ("string" == typeof replacement && (replacement = stringLiteral(replacement)), 
                !replacement || !isStringLiteral(replacement)) throw new Error("Expected string substitution");
              } else if ("statement" === placeholder.type) void 0 === index ? replacement ? Array.isArray(replacement) ? replacement = blockStatement(replacement) : "string" == typeof replacement ? replacement = expressionStatement(identifier(replacement)) : isStatement(replacement) || (replacement = expressionStatement(replacement)) : replacement = emptyStatement() : replacement && !Array.isArray(replacement) && ("string" == typeof replacement && (replacement = identifier(replacement)), 
              isStatement(replacement) || (replacement = expressionStatement(replacement))); else if ("param" === placeholder.type) {
                if ("string" == typeof replacement && (replacement = identifier(replacement)), void 0 === index) throw new Error("Assertion failure.");
              } else if ("string" == typeof replacement && (replacement = identifier(replacement)), 
              Array.isArray(replacement)) throw new Error("Cannot replace single expression with an array.");
              if (void 0 === index) validate(parent, key, replacement), parent[key] = replacement; else {
                const items = parent[key].slice();
                "statement" === placeholder.type || "param" === placeholder.type ? null == replacement ? items.splice(index, 1) : Array.isArray(replacement) ? items.splice(index, 1, ...replacement) : items[index] = replacement : items[index] = replacement, 
                validate(parent, key, items), parent[key] = items;
              }
            }(placeholder, ast, replacements && replacements[placeholder.name] || null);
          } catch (e) {
            throw e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`, 
            e;
          }
        })), ast;
      };
      var _t = __webpack_require__(7289);
      const {blockStatement, cloneNode, emptyStatement, expressionStatement, identifier, isStatement, isStringLiteral, stringLiteral, validate} = _t;
    },
    4515: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(formatter, code, opts) {
        let metadata;
        return code = formatter.code(code), arg => {
          const replacements = (0, _options.normalizeReplacements)(arg);
          return metadata || (metadata = (0, _parse.default)(formatter, code, opts)), formatter.unwrap((0, 
          _populate.default)(metadata, replacements));
        };
      };
      var _options = __webpack_require__(698), _parse = __webpack_require__(5672), _populate = __webpack_require__(1969);
    },
    732: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.clear = function() {
        clearPath(), clearScope();
      }, exports.clearPath = clearPath, exports.clearScope = clearScope, exports.scope = exports.path = void 0;
      let path = new WeakMap;
      exports.path = path;
      let scope = new WeakMap;
      function clearPath() {
        exports.path = path = new WeakMap;
      }
      function clearScope() {
        exports.scope = scope = new WeakMap;
      }
      exports.scope = scope;
    },
    6617: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _path = __webpack_require__(2969), _t = __webpack_require__(7289);
      const {VISITOR_KEYS} = _t;
      exports.default = class {
        constructor(scope, opts, state, parentPath) {
          this.queue = null, this.priorityQueue = null, this.parentPath = parentPath, this.scope = scope, 
          this.state = state, this.opts = opts;
        }
        shouldVisit(node) {
          const opts = this.opts;
          if (opts.enter || opts.exit) return !0;
          if (opts[node.type]) return !0;
          const keys = VISITOR_KEYS[node.type];
          if (null == keys || !keys.length) return !1;
          for (const key of keys) if (node[key]) return !0;
          return !1;
        }
        create(node, obj, key, listKey) {
          return _path.default.get({
            parentPath: this.parentPath,
            parent: node,
            container: obj,
            key,
            listKey
          });
        }
        maybeQueue(path, notPriority) {
          this.queue && (notPriority ? this.queue.push(path) : this.priorityQueue.push(path));
        }
        visitMultiple(container, parent, listKey) {
          if (0 === container.length) return !1;
          const queue = [];
          for (let key = 0; key < container.length; key++) {
            const node = container[key];
            node && this.shouldVisit(node) && queue.push(this.create(parent, container, key, listKey));
          }
          return this.visitQueue(queue);
        }
        visitSingle(node, key) {
          return !!this.shouldVisit(node[key]) && this.visitQueue([ this.create(node, node, key) ]);
        }
        visitQueue(queue) {
          this.queue = queue, this.priorityQueue = [];
          const visited = new WeakSet;
          let stop = !1;
          for (const path of queue) {
            if (path.resync(), 0 !== path.contexts.length && path.contexts[path.contexts.length - 1] === this || path.pushContext(this), 
            null === path.key) continue;
            const {node} = path;
            if (!visited.has(node)) {
              if (node && visited.add(node), path.visit()) {
                stop = !0;
                break;
              }
              if (this.priorityQueue.length && (stop = this.visitQueue(this.priorityQueue), this.priorityQueue = [], 
              this.queue = queue, stop)) break;
            }
          }
          for (const path of queue) path.popContext();
          return this.queue = null, stop;
        }
        visit(node, key) {
          const nodes = node[key];
          return !!nodes && (Array.isArray(nodes) ? this.visitMultiple(nodes, node, key) : this.visitSingle(node, key));
        }
      };
    },
    2180: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      exports.default = class {
        getCode() {}
        getScope() {}
        addHelper() {
          throw new Error("Helpers are not supported by the default hub.");
        }
        buildError(node, msg, Error = TypeError) {
          return new Error(msg);
        }
      };
    },
    9838: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "Hub", {
        enumerable: !0,
        get: function() {
          return _hub.default;
        }
      }), Object.defineProperty(exports, "NodePath", {
        enumerable: !0,
        get: function() {
          return _path.default;
        }
      }), Object.defineProperty(exports, "Scope", {
        enumerable: !0,
        get: function() {
          return _scope.default;
        }
      }), exports.visitors = exports.default = void 0;
      var visitors = __webpack_require__(1169);
      exports.visitors = visitors;
      var _t = __webpack_require__(7289), cache = __webpack_require__(732), _traverseNode = __webpack_require__(6033), _path = __webpack_require__(2969), _scope = __webpack_require__(2570), _hub = __webpack_require__(2180);
      const {VISITOR_KEYS, removeProperties, traverseFast} = _t;
      function traverse(parent, opts = {}, scope, state, parentPath) {
        if (parent) {
          if (!opts.noScope && !scope && "Program" !== parent.type && "File" !== parent.type) throw new Error(`You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a ${parent.type} node without passing scope and parentPath.`);
          VISITOR_KEYS[parent.type] && (visitors.explode(opts), (0, _traverseNode.traverseNode)(parent, opts, scope, state, parentPath));
        }
      }
      var _default = traverse;
      function hasDenylistedType(path, state) {
        path.node.type === state.type && (state.has = !0, path.stop());
      }
      exports.default = _default, traverse.visitors = visitors, traverse.verify = visitors.verify, 
      traverse.explode = visitors.explode, traverse.cheap = function(node, enter) {
        return traverseFast(node, enter);
      }, traverse.node = function(node, opts, scope, state, path, skipKeys) {
        (0, _traverseNode.traverseNode)(node, opts, scope, state, path, skipKeys);
      }, traverse.clearNode = function(node, opts) {
        removeProperties(node, opts), cache.path.delete(node);
      }, traverse.removeProperties = function(tree, opts) {
        return traverseFast(tree, traverse.clearNode, opts), tree;
      }, traverse.hasType = function(tree, type, denylistTypes) {
        if (null != denylistTypes && denylistTypes.includes(tree.type)) return !1;
        if (tree.type === type) return !0;
        const state = {
          has: !1,
          type
        };
        return traverse(tree, {
          noScope: !0,
          denylist: denylistTypes,
          enter: hasDenylistedType
        }, null, state), state.has;
      }, traverse.cache = cache;
    },
    6576: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.find = function(callback) {
        let path = this;
        do {
          if (callback(path)) return path;
        } while (path = path.parentPath);
        return null;
      }, exports.findParent = function(callback) {
        let path = this;
        for (;path = path.parentPath; ) if (callback(path)) return path;
        return null;
      }, exports.getAncestry = function() {
        let path = this;
        const paths = [];
        do {
          paths.push(path);
        } while (path = path.parentPath);
        return paths;
      }, exports.getDeepestCommonAncestorFrom = function(paths, filter) {
        if (!paths.length) return this;
        if (1 === paths.length) return paths[0];
        let lastCommonIndex, lastCommon, minDepth = 1 / 0;
        const ancestries = paths.map((path => {
          const ancestry = [];
          do {
            ancestry.unshift(path);
          } while ((path = path.parentPath) && path !== this);
          return ancestry.length < minDepth && (minDepth = ancestry.length), ancestry;
        })), first = ancestries[0];
        depthLoop: for (let i = 0; i < minDepth; i++) {
          const shouldMatch = first[i];
          for (const ancestry of ancestries) if (ancestry[i] !== shouldMatch) break depthLoop;
          lastCommonIndex = i, lastCommon = shouldMatch;
        }
        if (lastCommon) return filter ? filter(lastCommon, lastCommonIndex, ancestries) : lastCommon;
        throw new Error("Couldn't find intersection");
      }, exports.getEarliestCommonAncestorFrom = function(paths) {
        return this.getDeepestCommonAncestorFrom(paths, (function(deepest, i, ancestries) {
          let earliest;
          const keys = VISITOR_KEYS[deepest.type];
          for (const ancestry of ancestries) {
            const path = ancestry[i + 1];
            if (!earliest) {
              earliest = path;
              continue;
            }
            if (path.listKey && earliest.listKey === path.listKey && path.key < earliest.key) {
              earliest = path;
              continue;
            }
            keys.indexOf(earliest.parentKey) > keys.indexOf(path.parentKey) && (earliest = path);
          }
          return earliest;
        }));
      }, exports.getFunctionParent = function() {
        return this.findParent((p => p.isFunction()));
      }, exports.getStatementParent = function() {
        let path = this;
        do {
          if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) break;
          path = path.parentPath;
        } while (path);
        if (path && (path.isProgram() || path.isFile())) throw new Error("File/Program node, we can't possibly find a statement parent to this");
        return path;
      }, exports.inType = function(...candidateTypes) {
        let path = this;
        for (;path; ) {
          for (const type of candidateTypes) if (path.node.type === type) return !0;
          path = path.parentPath;
        }
        return !1;
      }, exports.isAncestor = function(maybeDescendant) {
        return maybeDescendant.isDescendant(this);
      }, exports.isDescendant = function(maybeAncestor) {
        return !!this.findParent((parent => parent === maybeAncestor));
      };
      var _t = __webpack_require__(7289);
      __webpack_require__(2969);
      const {VISITOR_KEYS} = _t;
    },
    1483: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.addComment = function(type, content, line) {
        _addComment(this.node, type, content, line);
      }, exports.addComments = function(type, comments) {
        _addComments(this.node, type, comments);
      }, exports.shareCommentsWithSiblings = function() {
        if ("string" == typeof this.key) return;
        const node = this.node;
        if (!node) return;
        const trailing = node.trailingComments, leading = node.leadingComments;
        if (!trailing && !leading) return;
        const prev = this.getSibling(this.key - 1), next = this.getSibling(this.key + 1), hasPrev = Boolean(prev.node), hasNext = Boolean(next.node);
        hasPrev && !hasNext ? prev.addComments("trailing", trailing) : hasNext && !hasPrev && next.addComments("leading", leading);
      };
      var _t = __webpack_require__(7289);
      const {addComment: _addComment, addComments: _addComments} = _t;
    },
    2523: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._call = function(fns) {
        if (!fns) return !1;
        for (const fn of fns) {
          if (!fn) continue;
          const node = this.node;
          if (!node) return !0;
          const ret = fn.call(this.state, this, this.state);
          if (ret && "object" == typeof ret && "function" == typeof ret.then) throw new Error("You appear to be using a plugin with an async traversal visitor, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");
          if (ret) throw new Error(`Unexpected return value from visitor method ${fn}`);
          if (this.node !== node) return !0;
          if (this._traverseFlags > 0) return !0;
        }
        return !1;
      }, exports._getQueueContexts = function() {
        let path = this, contexts = this.contexts;
        for (;!contexts.length && (path = path.parentPath, path); ) contexts = path.contexts;
        return contexts;
      }, exports._resyncKey = function() {
        if (!this.container) return;
        if (this.node === this.container[this.key]) return;
        if (Array.isArray(this.container)) {
          for (let i = 0; i < this.container.length; i++) if (this.container[i] === this.node) return this.setKey(i);
        } else for (const key of Object.keys(this.container)) if (this.container[key] === this.node) return this.setKey(key);
        this.key = null;
      }, exports._resyncList = function() {
        if (!this.parent || !this.inList) return;
        const newContainer = this.parent[this.listKey];
        if (this.container === newContainer) return;
        this.container = newContainer || null;
      }, exports._resyncParent = function() {
        this.parentPath && (this.parent = this.parentPath.node);
      }, exports._resyncRemoved = function() {
        null != this.key && this.container && this.container[this.key] === this.node || this._markRemoved();
      }, exports.call = function(key) {
        const opts = this.opts;
        if (this.debug(key), this.node && this._call(opts[key])) return !0;
        if (this.node) return this._call(opts[this.node.type] && opts[this.node.type][key]);
        return !1;
      }, exports.isBlacklisted = exports.isDenylisted = function() {
        var _this$opts$denylist;
        const denylist = null != (_this$opts$denylist = this.opts.denylist) ? _this$opts$denylist : this.opts.blacklist;
        return denylist && denylist.indexOf(this.node.type) > -1;
      }, exports.popContext = function() {
        this.contexts.pop(), this.contexts.length > 0 ? this.setContext(this.contexts[this.contexts.length - 1]) : this.setContext(void 0);
      }, exports.pushContext = function(context) {
        this.contexts.push(context), this.setContext(context);
      }, exports.requeue = function(pathToQueue = this) {
        if (pathToQueue.removed) return;
        const contexts = this.contexts;
        for (const context of contexts) context.maybeQueue(pathToQueue);
      }, exports.resync = function() {
        if (this.removed) return;
        this._resyncParent(), this._resyncList(), this._resyncKey();
      }, exports.setContext = function(context) {
        null != this.skipKeys && (this.skipKeys = {});
        this._traverseFlags = 0, context && (this.context = context, this.state = context.state, 
        this.opts = context.opts);
        return this.setScope(), this;
      }, exports.setKey = function(key) {
        var _this$node;
        this.key = key, this.node = this.container[this.key], this.type = null == (_this$node = this.node) ? void 0 : _this$node.type;
      }, exports.setScope = function() {
        if (this.opts && this.opts.noScope) return;
        let target, path = this.parentPath;
        "key" === this.key && path.isMethod() && (path = path.parentPath);
        for (;path && !target; ) {
          if (path.opts && path.opts.noScope) return;
          target = path.scope, path = path.parentPath;
        }
        this.scope = this.getScope(target), this.scope && this.scope.init();
      }, exports.setup = function(parentPath, container, listKey, key) {
        this.listKey = listKey, this.container = container, this.parentPath = parentPath || this.parentPath, 
        this.setKey(key);
      }, exports.skip = function() {
        this.shouldSkip = !0;
      }, exports.skipKey = function(key) {
        null == this.skipKeys && (this.skipKeys = {});
        this.skipKeys[key] = !0;
      }, exports.stop = function() {
        this._traverseFlags |= _index.SHOULD_SKIP | _index.SHOULD_STOP;
      }, exports.visit = function() {
        if (!this.node) return !1;
        if (this.isDenylisted()) return !1;
        if (this.opts.shouldSkip && this.opts.shouldSkip(this)) return !1;
        const currentContext = this.context;
        if (this.shouldSkip || this.call("enter")) return this.debug("Skip..."), this.shouldStop;
        return restoreContext(this, currentContext), this.debug("Recursing into..."), this.shouldStop = (0, 
        _traverseNode.traverseNode)(this.node, this.opts, this.scope, this.state, this, this.skipKeys), 
        restoreContext(this, currentContext), this.call("exit"), this.shouldStop;
      };
      var _traverseNode = __webpack_require__(6033), _index = __webpack_require__(2969);
      function restoreContext(path, context) {
        path.context !== context && (path.context = context, path.state = context.state, 
        path.opts = context.opts);
      }
    },
    4249: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.arrowFunctionToExpression = function({allowInsertArrow = !0, specCompliant = !1, noNewArrows = !specCompliant} = {}) {
        if (!this.isArrowFunctionExpression()) throw this.buildCodeFrameError("Cannot convert non-arrow function to a function expression.");
        const {thisBinding, fnPath: fn} = hoistFunctionEnvironment(this, noNewArrows, allowInsertArrow);
        if (fn.ensureBlock(), fn.node.type = "FunctionExpression", !noNewArrows) {
          const checkBinding = thisBinding ? null : fn.scope.generateUidIdentifier("arrowCheckId");
          checkBinding && fn.parentPath.scope.push({
            id: checkBinding,
            init: objectExpression([])
          }), fn.get("body").unshiftContainer("body", expressionStatement(callExpression(this.hub.addHelper("newArrowCheck"), [ thisExpression(), identifier(checkBinding ? checkBinding.name : thisBinding) ]))), 
          fn.replaceWith(callExpression(memberExpression((0, _helperFunctionName.default)(this, !0) || fn.node, identifier("bind")), [ checkBinding ? identifier(checkBinding.name) : thisExpression() ]));
        }
      }, exports.arrowFunctionToShadowed = function() {
        if (!this.isArrowFunctionExpression()) return;
        this.arrowFunctionToExpression();
      }, exports.ensureBlock = function() {
        const body = this.get("body"), bodyNode = body.node;
        if (Array.isArray(body)) throw new Error("Can't convert array path to a block statement");
        if (!bodyNode) throw new Error("Can't convert node without a body");
        if (body.isBlockStatement()) return bodyNode;
        const statements = [];
        let key, listKey, stringPath = "body";
        body.isStatement() ? (listKey = "body", key = 0, statements.push(body.node)) : (stringPath += ".body.0", 
        this.isFunction() ? (key = "argument", statements.push(returnStatement(body.node))) : (key = "expression", 
        statements.push(expressionStatement(body.node))));
        this.node.body = blockStatement(statements);
        const parentPath = this.get(stringPath);
        return body.setup(parentPath, listKey ? parentPath.node[listKey] : parentPath.node, listKey, key), 
        this.node;
      }, exports.toComputedKey = function() {
        let key;
        if (this.isMemberExpression()) key = this.node.property; else {
          if (!this.isProperty() && !this.isMethod()) throw new ReferenceError("todo");
          key = this.node.key;
        }
        this.node.computed || isIdentifier(key) && (key = stringLiteral(key.name));
        return key;
      }, exports.unwrapFunctionEnvironment = function() {
        if (!this.isArrowFunctionExpression() && !this.isFunctionExpression() && !this.isFunctionDeclaration()) throw this.buildCodeFrameError("Can only unwrap the environment of a function.");
        hoistFunctionEnvironment(this);
      };
      var _t = __webpack_require__(7289), _helperEnvironmentVisitor = __webpack_require__(1692), _helperFunctionName = __webpack_require__(1485), _visitors = __webpack_require__(1169);
      const {arrowFunctionExpression, assignmentExpression, binaryExpression, blockStatement, callExpression, conditionalExpression, expressionStatement, identifier, isIdentifier, jsxIdentifier, logicalExpression, LOGICAL_OPERATORS, memberExpression, metaProperty, numericLiteral, objectExpression, restElement, returnStatement, sequenceExpression, spreadElement, stringLiteral, super: _super, thisExpression, toExpression, unaryExpression} = _t;
      const getSuperCallsVisitor = (0, _visitors.merge)([ {
        CallExpression(child, {allSuperCalls}) {
          child.get("callee").isSuper() && allSuperCalls.push(child);
        }
      }, _helperEnvironmentVisitor.default ]);
      function hoistFunctionEnvironment(fnPath, noNewArrows = !0, allowInsertArrow = !0) {
        let arrowParent, thisEnvFn = fnPath.findParent((p => p.isArrowFunctionExpression() ? (null != arrowParent || (arrowParent = p), 
        !1) : p.isFunction() || p.isProgram() || p.isClassProperty({
          static: !1
        }) || p.isClassPrivateProperty({
          static: !1
        })));
        const inConstructor = thisEnvFn.isClassMethod({
          kind: "constructor"
        });
        if (thisEnvFn.isClassProperty() || thisEnvFn.isClassPrivateProperty()) if (arrowParent) thisEnvFn = arrowParent; else {
          if (!allowInsertArrow) throw fnPath.buildCodeFrameError("Unable to transform arrow inside class property");
          fnPath.replaceWith(callExpression(arrowFunctionExpression([], toExpression(fnPath.node)), [])), 
          thisEnvFn = fnPath.get("callee"), fnPath = thisEnvFn.get("body");
        }
        const {thisPaths, argumentsPaths, newTargetPaths, superProps, superCalls} = function(fnPath) {
          const thisPaths = [], argumentsPaths = [], newTargetPaths = [], superProps = [], superCalls = [];
          return fnPath.traverse(getScopeInformationVisitor, {
            thisPaths,
            argumentsPaths,
            newTargetPaths,
            superProps,
            superCalls
          }), {
            thisPaths,
            argumentsPaths,
            newTargetPaths,
            superProps,
            superCalls
          };
        }(fnPath);
        if (inConstructor && superCalls.length > 0) {
          if (!allowInsertArrow) throw superCalls[0].buildCodeFrameError("Unable to handle nested super() usage in arrow");
          const allSuperCalls = [];
          thisEnvFn.traverse(getSuperCallsVisitor, {
            allSuperCalls
          });
          const superBinding = function(thisEnvFn) {
            return getBinding(thisEnvFn, "supercall", (() => {
              const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
              return arrowFunctionExpression([ restElement(argsBinding) ], callExpression(_super(), [ spreadElement(identifier(argsBinding.name)) ]));
            }));
          }(thisEnvFn);
          allSuperCalls.forEach((superCall => {
            const callee = identifier(superBinding);
            callee.loc = superCall.node.callee.loc, superCall.get("callee").replaceWith(callee);
          }));
        }
        if (argumentsPaths.length > 0) {
          const argumentsBinding = getBinding(thisEnvFn, "arguments", (() => {
            const args = () => identifier("arguments");
            return thisEnvFn.scope.path.isProgram() ? conditionalExpression(binaryExpression("===", unaryExpression("typeof", args()), stringLiteral("undefined")), thisEnvFn.scope.buildUndefinedNode(), args()) : args();
          }));
          argumentsPaths.forEach((argumentsChild => {
            const argsRef = identifier(argumentsBinding);
            argsRef.loc = argumentsChild.node.loc, argumentsChild.replaceWith(argsRef);
          }));
        }
        if (newTargetPaths.length > 0) {
          const newTargetBinding = getBinding(thisEnvFn, "newtarget", (() => metaProperty(identifier("new"), identifier("target"))));
          newTargetPaths.forEach((targetChild => {
            const targetRef = identifier(newTargetBinding);
            targetRef.loc = targetChild.node.loc, targetChild.replaceWith(targetRef);
          }));
        }
        if (superProps.length > 0) {
          if (!allowInsertArrow) throw superProps[0].buildCodeFrameError("Unable to handle nested super.prop usage");
          superProps.reduce(((acc, superProp) => acc.concat(function(superProp) {
            if (superProp.parentPath.isAssignmentExpression() && "=" !== superProp.parentPath.node.operator) {
              const assignmentPath = superProp.parentPath, op = assignmentPath.node.operator.slice(0, -1), value = assignmentPath.node.right, isLogicalAssignment = function(op) {
                return LOGICAL_OPERATORS.includes(op);
              }(op);
              if (superProp.node.computed) {
                const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp"), object = superProp.node.object, property = superProp.node.property;
                assignmentPath.get("left").replaceWith(memberExpression(object, assignmentExpression("=", tmp, property), !0)), 
                assignmentPath.get("right").replaceWith(rightExpression(isLogicalAssignment ? "=" : op, memberExpression(object, identifier(tmp.name), !0), value));
              } else {
                const object = superProp.node.object, property = superProp.node.property;
                assignmentPath.get("left").replaceWith(memberExpression(object, property)), assignmentPath.get("right").replaceWith(rightExpression(isLogicalAssignment ? "=" : op, memberExpression(object, identifier(property.name)), value));
              }
              return isLogicalAssignment ? assignmentPath.replaceWith(logicalExpression(op, assignmentPath.node.left, assignmentPath.node.right)) : assignmentPath.node.operator = "=", 
              [ assignmentPath.get("left"), assignmentPath.get("right").get("left") ];
            }
            if (superProp.parentPath.isUpdateExpression()) {
              const updateExpr = superProp.parentPath, tmp = superProp.scope.generateDeclaredUidIdentifier("tmp"), computedKey = superProp.node.computed ? superProp.scope.generateDeclaredUidIdentifier("prop") : null, parts = [ assignmentExpression("=", tmp, memberExpression(superProp.node.object, computedKey ? assignmentExpression("=", computedKey, superProp.node.property) : superProp.node.property, superProp.node.computed)), assignmentExpression("=", memberExpression(superProp.node.object, computedKey ? identifier(computedKey.name) : superProp.node.property, superProp.node.computed), binaryExpression(superProp.parentPath.node.operator[0], identifier(tmp.name), numericLiteral(1))) ];
              superProp.parentPath.node.prefix || parts.push(identifier(tmp.name)), updateExpr.replaceWith(sequenceExpression(parts));
              return [ updateExpr.get("expressions.0.right"), updateExpr.get("expressions.1.left") ];
            }
            return [ superProp ];
            function rightExpression(op, left, right) {
              return "=" === op ? assignmentExpression("=", left, right) : binaryExpression(op, left, right);
            }
          }(superProp))), []).forEach((superProp => {
            const key = superProp.node.computed ? "" : superProp.get("property").node.name, isAssignment = superProp.parentPath.isAssignmentExpression({
              left: superProp.node
            }), isCall = superProp.parentPath.isCallExpression({
              callee: superProp.node
            }), superBinding = function(thisEnvFn, isAssignment, propName) {
              return getBinding(thisEnvFn, `superprop_${isAssignment ? "set" : "get"}:${propName || ""}`, (() => {
                const argsList = [];
                let fnBody;
                if (propName) fnBody = memberExpression(_super(), identifier(propName)); else {
                  const method = thisEnvFn.scope.generateUidIdentifier("prop");
                  argsList.unshift(method), fnBody = memberExpression(_super(), identifier(method.name), !0);
                }
                if (isAssignment) {
                  const valueIdent = thisEnvFn.scope.generateUidIdentifier("value");
                  argsList.push(valueIdent), fnBody = assignmentExpression("=", fnBody, identifier(valueIdent.name));
                }
                return arrowFunctionExpression(argsList, fnBody);
              }));
            }(thisEnvFn, isAssignment, key), args = [];
            if (superProp.node.computed && args.push(superProp.get("property").node), isAssignment) {
              const value = superProp.parentPath.node.right;
              args.push(value);
            }
            const call = callExpression(identifier(superBinding), args);
            isCall ? (superProp.parentPath.unshiftContainer("arguments", thisExpression()), 
            superProp.replaceWith(memberExpression(call, identifier("call"))), thisPaths.push(superProp.parentPath.get("arguments.0"))) : isAssignment ? superProp.parentPath.replaceWith(call) : superProp.replaceWith(call);
          }));
        }
        let thisBinding;
        return (thisPaths.length > 0 || !noNewArrows) && (thisBinding = function(thisEnvFn, inConstructor) {
          return getBinding(thisEnvFn, "this", (thisBinding => {
            if (!inConstructor || !hasSuperClass(thisEnvFn)) return thisExpression();
            thisEnvFn.traverse(assignSuperThisVisitor, {
              supers: new WeakSet,
              thisBinding
            });
          }));
        }(thisEnvFn, inConstructor), (noNewArrows || inConstructor && hasSuperClass(thisEnvFn)) && (thisPaths.forEach((thisChild => {
          const thisRef = thisChild.isJSX() ? jsxIdentifier(thisBinding) : identifier(thisBinding);
          thisRef.loc = thisChild.node.loc, thisChild.replaceWith(thisRef);
        })), noNewArrows || (thisBinding = null))), {
          thisBinding,
          fnPath
        };
      }
      function hasSuperClass(thisEnvFn) {
        return thisEnvFn.isClassMethod() && !!thisEnvFn.parentPath.parentPath.node.superClass;
      }
      const assignSuperThisVisitor = (0, _visitors.merge)([ {
        CallExpression(child, {supers, thisBinding}) {
          child.get("callee").isSuper() && (supers.has(child.node) || (supers.add(child.node), 
          child.replaceWithMultiple([ child.node, assignmentExpression("=", identifier(thisBinding), identifier("this")) ])));
        }
      }, _helperEnvironmentVisitor.default ]);
      function getBinding(thisEnvFn, key, init) {
        const cacheKey = "binding:" + key;
        let data = thisEnvFn.getData(cacheKey);
        if (!data) {
          const id = thisEnvFn.scope.generateUidIdentifier(key);
          data = id.name, thisEnvFn.setData(cacheKey, data), thisEnvFn.scope.push({
            id,
            init: init(data)
          });
        }
        return data;
      }
      const getScopeInformationVisitor = (0, _visitors.merge)([ {
        ThisExpression(child, {thisPaths}) {
          thisPaths.push(child);
        },
        JSXIdentifier(child, {thisPaths}) {
          "this" === child.node.name && (child.parentPath.isJSXMemberExpression({
            object: child.node
          }) || child.parentPath.isJSXOpeningElement({
            name: child.node
          })) && thisPaths.push(child);
        },
        CallExpression(child, {superCalls}) {
          child.get("callee").isSuper() && superCalls.push(child);
        },
        MemberExpression(child, {superProps}) {
          child.get("object").isSuper() && superProps.push(child);
        },
        Identifier(child, {argumentsPaths}) {
          if (!child.isReferencedIdentifier({
            name: "arguments"
          })) return;
          let curr = child.scope;
          do {
            if (curr.hasOwnBinding("arguments")) return void curr.rename("arguments");
            if (curr.path.isFunction() && !curr.path.isArrowFunctionExpression()) break;
          } while (curr = curr.parent);
          argumentsPaths.push(child);
        },
        MetaProperty(child, {newTargetPaths}) {
          child.get("meta").isIdentifier({
            name: "new"
          }) && child.get("property").isIdentifier({
            name: "target"
          }) && newTargetPaths.push(child);
        }
      }, _helperEnvironmentVisitor.default ]);
    },
    3456: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.evaluate = function() {
        const state = {
          confident: !0,
          deoptPath: null,
          seen: new Map
        };
        let value = evaluateCached(this, state);
        state.confident || (value = void 0);
        return {
          confident: state.confident,
          deopt: state.deoptPath,
          value
        };
      }, exports.evaluateTruthy = function() {
        const res = this.evaluate();
        if (res.confident) return !!res.value;
      };
      const VALID_CALLEES = [ "String", "Number", "Math" ], INVALID_METHODS = [ "random" ];
      function deopt(path, state) {
        state.confident && (state.deoptPath = path, state.confident = !1);
      }
      function evaluateCached(path, state) {
        const {node} = path, {seen} = state;
        if (seen.has(node)) {
          const existing = seen.get(node);
          return existing.resolved ? existing.value : void deopt(path, state);
        }
        {
          const item = {
            resolved: !1
          };
          seen.set(node, item);
          const val = function(path, state) {
            if (!state.confident) return;
            if (path.isSequenceExpression()) {
              const exprs = path.get("expressions");
              return evaluateCached(exprs[exprs.length - 1], state);
            }
            if (path.isStringLiteral() || path.isNumericLiteral() || path.isBooleanLiteral()) return path.node.value;
            if (path.isNullLiteral()) return null;
            if (path.isTemplateLiteral()) return evaluateQuasis(path, path.node.quasis, state);
            if (path.isTaggedTemplateExpression() && path.get("tag").isMemberExpression()) {
              const object = path.get("tag.object"), {node: {name}} = object, property = path.get("tag.property");
              if (object.isIdentifier() && "String" === name && !path.scope.getBinding(name) && property.isIdentifier() && "raw" === property.node.name) return evaluateQuasis(path, path.node.quasi.quasis, state, !0);
            }
            if (path.isConditionalExpression()) {
              const testResult = evaluateCached(path.get("test"), state);
              if (!state.confident) return;
              return evaluateCached(testResult ? path.get("consequent") : path.get("alternate"), state);
            }
            if (path.isExpressionWrapper()) return evaluateCached(path.get("expression"), state);
            if (path.isMemberExpression() && !path.parentPath.isCallExpression({
              callee: path.node
            })) {
              const property = path.get("property"), object = path.get("object");
              if (object.isLiteral() && property.isIdentifier()) {
                const value = object.node.value, type = typeof value;
                if ("number" === type || "string" === type) return value[property.node.name];
              }
            }
            if (path.isReferencedIdentifier()) {
              const binding = path.scope.getBinding(path.node.name);
              if (binding && binding.constantViolations.length > 0) return deopt(binding.path, state);
              if (binding && path.node.start < binding.path.node.end) return deopt(binding.path, state);
              if (null != binding && binding.hasValue) return binding.value;
              {
                if ("undefined" === path.node.name) return binding ? deopt(binding.path, state) : void 0;
                if ("Infinity" === path.node.name) return binding ? deopt(binding.path, state) : 1 / 0;
                if ("NaN" === path.node.name) return binding ? deopt(binding.path, state) : NaN;
                const resolved = path.resolve();
                return resolved === path ? deopt(path, state) : evaluateCached(resolved, state);
              }
            }
            if (path.isUnaryExpression({
              prefix: !0
            })) {
              if ("void" === path.node.operator) return;
              const argument = path.get("argument");
              if ("typeof" === path.node.operator && (argument.isFunction() || argument.isClass())) return "function";
              const arg = evaluateCached(argument, state);
              if (!state.confident) return;
              switch (path.node.operator) {
               case "!":
                return !arg;

               case "+":
                return +arg;

               case "-":
                return -arg;

               case "~":
                return ~arg;

               case "typeof":
                return typeof arg;
              }
            }
            if (path.isArrayExpression()) {
              const arr = [], elems = path.get("elements");
              for (const elem of elems) {
                const elemValue = elem.evaluate();
                if (!elemValue.confident) return deopt(elemValue.deopt, state);
                arr.push(elemValue.value);
              }
              return arr;
            }
            if (path.isObjectExpression()) {
              const obj = {}, props = path.get("properties");
              for (const prop of props) {
                if (prop.isObjectMethod() || prop.isSpreadElement()) return deopt(prop, state);
                let key = prop.get("key");
                if (prop.node.computed) {
                  if (key = key.evaluate(), !key.confident) return deopt(key.deopt, state);
                  key = key.value;
                } else key = key.isIdentifier() ? key.node.name : key.node.value;
                let value = prop.get("value").evaluate();
                if (!value.confident) return deopt(value.deopt, state);
                value = value.value, obj[key] = value;
              }
              return obj;
            }
            if (path.isLogicalExpression()) {
              const wasConfident = state.confident, left = evaluateCached(path.get("left"), state), leftConfident = state.confident;
              state.confident = wasConfident;
              const right = evaluateCached(path.get("right"), state), rightConfident = state.confident;
              switch (path.node.operator) {
               case "||":
                if (state.confident = leftConfident && (!!left || rightConfident), !state.confident) return;
                return left || right;

               case "&&":
                if (state.confident = leftConfident && (!left || rightConfident), !state.confident) return;
                return left && right;
              }
            }
            if (path.isBinaryExpression()) {
              const left = evaluateCached(path.get("left"), state);
              if (!state.confident) return;
              const right = evaluateCached(path.get("right"), state);
              if (!state.confident) return;
              switch (path.node.operator) {
               case "-":
                return left - right;

               case "+":
                return left + right;

               case "/":
                return left / right;

               case "*":
                return left * right;

               case "%":
                return left % right;

               case "**":
                return Math.pow(left, right);

               case "<":
                return left < right;

               case ">":
                return left > right;

               case "<=":
                return left <= right;

               case ">=":
                return left >= right;

               case "==":
                return left == right;

               case "!=":
                return left != right;

               case "===":
                return left === right;

               case "!==":
                return left !== right;

               case "|":
                return left | right;

               case "&":
                return left & right;

               case "^":
                return left ^ right;

               case "<<":
                return left << right;

               case ">>":
                return left >> right;

               case ">>>":
                return left >>> right;
              }
            }
            if (path.isCallExpression()) {
              const callee = path.get("callee");
              let context, func;
              if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name) && VALID_CALLEES.indexOf(callee.node.name) >= 0 && (func = global[callee.node.name]), 
              callee.isMemberExpression()) {
                const object = callee.get("object"), property = callee.get("property");
                if (object.isIdentifier() && property.isIdentifier() && VALID_CALLEES.indexOf(object.node.name) >= 0 && INVALID_METHODS.indexOf(property.node.name) < 0 && (context = global[object.node.name], 
                func = context[property.node.name]), object.isLiteral() && property.isIdentifier()) {
                  const type = typeof object.node.value;
                  "string" !== type && "number" !== type || (context = object.node.value, func = context[property.node.name]);
                }
              }
              if (func) {
                const args = path.get("arguments").map((arg => evaluateCached(arg, state)));
                if (!state.confident) return;
                return func.apply(context, args);
              }
            }
            deopt(path, state);
          }(path, state);
          return state.confident && (item.resolved = !0, item.value = val), val;
        }
      }
      function evaluateQuasis(path, quasis, state, raw = !1) {
        let str = "", i = 0;
        const exprs = path.get("expressions");
        for (const elem of quasis) {
          if (!state.confident) break;
          str += raw ? elem.value.raw : elem.value.cooked;
          const expr = exprs[i++];
          expr && (str += String(evaluateCached(expr, state)));
        }
        if (state.confident) return str;
      }
    },
    9463: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._getKey = function(key, context) {
        const node = this.node, container = node[key];
        return Array.isArray(container) ? container.map(((_, i) => _index.default.get({
          listKey: key,
          parentPath: this,
          parent: node,
          container,
          key: i
        }).setContext(context))) : _index.default.get({
          parentPath: this,
          parent: node,
          container: node,
          key
        }).setContext(context);
      }, exports._getPattern = function(parts, context) {
        let path = this;
        for (const part of parts) path = "." === part ? path.parentPath : Array.isArray(path) ? path[part] : path.get(part, context);
        return path;
      }, exports.get = function(key, context = !0) {
        !0 === context && (context = this.context);
        const parts = key.split(".");
        return 1 === parts.length ? this._getKey(key, context) : this._getPattern(parts, context);
      }, exports.getAllNextSiblings = function() {
        let _key = this.key, sibling = this.getSibling(++_key);
        const siblings = [];
        for (;sibling.node; ) siblings.push(sibling), sibling = this.getSibling(++_key);
        return siblings;
      }, exports.getAllPrevSiblings = function() {
        let _key = this.key, sibling = this.getSibling(--_key);
        const siblings = [];
        for (;sibling.node; ) siblings.push(sibling), sibling = this.getSibling(--_key);
        return siblings;
      }, exports.getBindingIdentifierPaths = function(duplicates = !1, outerOnly = !1) {
        const search = [ this ], ids = Object.create(null);
        for (;search.length; ) {
          const id = search.shift();
          if (!id) continue;
          if (!id.node) continue;
          const keys = _getBindingIdentifiers.keys[id.node.type];
          if (id.isIdentifier()) if (duplicates) {
            (ids[id.node.name] = ids[id.node.name] || []).push(id);
          } else ids[id.node.name] = id; else if (id.isExportDeclaration()) {
            const declaration = id.get("declaration");
            isDeclaration(declaration) && search.push(declaration);
          } else {
            if (outerOnly) {
              if (id.isFunctionDeclaration()) {
                search.push(id.get("id"));
                continue;
              }
              if (id.isFunctionExpression()) continue;
            }
            if (keys) for (let i = 0; i < keys.length; i++) {
              const key = keys[i], child = id.get(key);
              Array.isArray(child) ? search.push(...child) : child.node && search.push(child);
            }
          }
        }
        return ids;
      }, exports.getBindingIdentifiers = function(duplicates) {
        return _getBindingIdentifiers(this.node, duplicates);
      }, exports.getCompletionRecords = function() {
        return _getCompletionRecords(this, {
          canHaveBreak: !1,
          shouldPopulateBreak: !1,
          inCaseClause: !1
        }).map((r => r.path));
      }, exports.getNextSibling = function() {
        return this.getSibling(this.key + 1);
      }, exports.getOpposite = function() {
        if ("left" === this.key) return this.getSibling("right");
        if ("right" === this.key) return this.getSibling("left");
        return null;
      }, exports.getOuterBindingIdentifierPaths = function(duplicates) {
        return this.getBindingIdentifierPaths(duplicates, !0);
      }, exports.getOuterBindingIdentifiers = function(duplicates) {
        return _getOuterBindingIdentifiers(this.node, duplicates);
      }, exports.getPrevSibling = function() {
        return this.getSibling(this.key - 1);
      }, exports.getSibling = function(key) {
        return _index.default.get({
          parentPath: this.parentPath,
          parent: this.parent,
          container: this.container,
          listKey: this.listKey,
          key
        }).setContext(this.context);
      };
      var _index = __webpack_require__(2969), _t = __webpack_require__(7289);
      const {getBindingIdentifiers: _getBindingIdentifiers, getOuterBindingIdentifiers: _getOuterBindingIdentifiers, isDeclaration, numericLiteral, unaryExpression} = _t;
      function addCompletionRecords(path, records, context) {
        return path && records.push(..._getCompletionRecords(path, context)), records;
      }
      function normalCompletionToBreak(completions) {
        completions.forEach((c => {
          c.type = 1;
        }));
      }
      function replaceBreakStatementInBreakCompletion(completions, reachable) {
        completions.forEach((c => {
          c.path.isBreakStatement({
            label: null
          }) && (reachable ? c.path.replaceWith(unaryExpression("void", numericLiteral(0))) : c.path.remove());
        }));
      }
      function getStatementListCompletion(paths, context) {
        const completions = [];
        if (context.canHaveBreak) {
          let lastNormalCompletions = [];
          for (let i = 0; i < paths.length; i++) {
            const path = paths[i], newContext = Object.assign({}, context, {
              inCaseClause: !1
            });
            path.isBlockStatement() && (context.inCaseClause || context.shouldPopulateBreak) ? newContext.shouldPopulateBreak = !0 : newContext.shouldPopulateBreak = !1;
            const statementCompletions = _getCompletionRecords(path, newContext);
            if (statementCompletions.length > 0 && statementCompletions.every((c => 1 === c.type))) {
              lastNormalCompletions.length > 0 && statementCompletions.every((c => c.path.isBreakStatement({
                label: null
              }))) ? (normalCompletionToBreak(lastNormalCompletions), completions.push(...lastNormalCompletions), 
              lastNormalCompletions.some((c => c.path.isDeclaration())) && (completions.push(...statementCompletions), 
              replaceBreakStatementInBreakCompletion(statementCompletions, !0)), replaceBreakStatementInBreakCompletion(statementCompletions, !1)) : (completions.push(...statementCompletions), 
              context.shouldPopulateBreak || replaceBreakStatementInBreakCompletion(statementCompletions, !0));
              break;
            }
            if (i === paths.length - 1) completions.push(...statementCompletions); else {
              lastNormalCompletions = [];
              for (let i = 0; i < statementCompletions.length; i++) {
                const c = statementCompletions[i];
                1 === c.type && completions.push(c), 0 === c.type && lastNormalCompletions.push(c);
              }
            }
          }
        } else if (paths.length) for (let i = paths.length - 1; i >= 0; i--) {
          const pathCompletions = _getCompletionRecords(paths[i], context);
          if (pathCompletions.length > 1 || 1 === pathCompletions.length && !pathCompletions[0].path.isVariableDeclaration()) {
            completions.push(...pathCompletions);
            break;
          }
        }
        return completions;
      }
      function _getCompletionRecords(path, context) {
        let records = [];
        if (path.isIfStatement()) records = addCompletionRecords(path.get("consequent"), records, context), 
        records = addCompletionRecords(path.get("alternate"), records, context); else {
          if (path.isDoExpression() || path.isFor() || path.isWhile() || path.isLabeledStatement()) return addCompletionRecords(path.get("body"), records, context);
          if (path.isProgram() || path.isBlockStatement()) return getStatementListCompletion(path.get("body"), context);
          if (path.isFunction()) return _getCompletionRecords(path.get("body"), context);
          if (path.isTryStatement()) records = addCompletionRecords(path.get("block"), records, context), 
          records = addCompletionRecords(path.get("handler"), records, context); else {
            if (path.isCatchClause()) return addCompletionRecords(path.get("body"), records, context);
            if (path.isSwitchStatement()) return function(cases, records, context) {
              let lastNormalCompletions = [];
              for (let i = 0; i < cases.length; i++) {
                const caseCompletions = _getCompletionRecords(cases[i], context), normalCompletions = [], breakCompletions = [];
                for (const c of caseCompletions) 0 === c.type && normalCompletions.push(c), 1 === c.type && breakCompletions.push(c);
                normalCompletions.length && (lastNormalCompletions = normalCompletions), records.push(...breakCompletions);
              }
              return records.push(...lastNormalCompletions), records;
            }(path.get("cases"), records, context);
            if (path.isSwitchCase()) return getStatementListCompletion(path.get("consequent"), {
              canHaveBreak: !0,
              shouldPopulateBreak: !1,
              inCaseClause: !0
            });
            path.isBreakStatement() ? records.push(function(path) {
              return {
                type: 1,
                path
              };
            }(path)) : records.push(function(path) {
              return {
                type: 0,
                path
              };
            }(path));
          }
        }
        return records;
      }
    },
    2969: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = exports.SHOULD_STOP = exports.SHOULD_SKIP = exports.REMOVED = void 0;
      var virtualTypes = __webpack_require__(4387), _debug = __webpack_require__(5158), _index = __webpack_require__(9838), _scope = __webpack_require__(2570), _t = __webpack_require__(7289), t = _t, _cache = __webpack_require__(732), _generator = __webpack_require__(9166), NodePath_ancestry = __webpack_require__(6576), NodePath_inference = __webpack_require__(1534), NodePath_replacement = __webpack_require__(23), NodePath_evaluation = __webpack_require__(3456), NodePath_conversion = __webpack_require__(4249), NodePath_introspection = __webpack_require__(7743), NodePath_context = __webpack_require__(2523), NodePath_removal = __webpack_require__(2052), NodePath_modification = __webpack_require__(8129), NodePath_family = __webpack_require__(9463), NodePath_comments = __webpack_require__(1483);
      const {validate} = _t, debug = _debug("babel");
      exports.REMOVED = 1;
      exports.SHOULD_STOP = 2;
      exports.SHOULD_SKIP = 4;
      class NodePath {
        constructor(hub, parent) {
          this.contexts = [], this.state = null, this.opts = null, this._traverseFlags = 0, 
          this.skipKeys = null, this.parentPath = null, this.container = null, this.listKey = null, 
          this.key = null, this.node = null, this.type = null, this.parent = parent, this.hub = hub, 
          this.data = null, this.context = null, this.scope = null;
        }
        static get({hub, parentPath, parent, container, listKey, key}) {
          if (!hub && parentPath && (hub = parentPath.hub), !parent) throw new Error("To get a node path the parent needs to exist");
          const targetNode = container[key];
          let paths = _cache.path.get(parent);
          paths || (paths = new Map, _cache.path.set(parent, paths));
          let path = paths.get(targetNode);
          return path || (path = new NodePath(hub, parent), targetNode && paths.set(targetNode, path)), 
          path.setup(parentPath, container, listKey, key), path;
        }
        getScope(scope) {
          return this.isScope() ? new _scope.default(this) : scope;
        }
        setData(key, val) {
          return null == this.data && (this.data = Object.create(null)), this.data[key] = val;
        }
        getData(key, def) {
          null == this.data && (this.data = Object.create(null));
          let val = this.data[key];
          return void 0 === val && void 0 !== def && (val = this.data[key] = def), val;
        }
        hasNode() {
          return null != this.node;
        }
        buildCodeFrameError(msg, Error = SyntaxError) {
          return this.hub.buildError(this.node, msg, Error);
        }
        traverse(visitor, state) {
          (0, _index.default)(this.node, visitor, this.scope, state, this);
        }
        set(key, node) {
          validate(this.node, key, node), this.node[key] = node;
        }
        getPathLocation() {
          const parts = [];
          let path = this;
          do {
            let key = path.key;
            path.inList && (key = `${path.listKey}[${key}]`), parts.unshift(key);
          } while (path = path.parentPath);
          return parts.join(".");
        }
        debug(message) {
          debug.enabled && debug(`${this.getPathLocation()} ${this.type}: ${message}`);
        }
        toString() {
          return (0, _generator.default)(this.node).code;
        }
        get inList() {
          return !!this.listKey;
        }
        set inList(inList) {
          inList || (this.listKey = null);
        }
        get parentKey() {
          return this.listKey || this.key;
        }
        get shouldSkip() {
          return !!(4 & this._traverseFlags);
        }
        set shouldSkip(v) {
          v ? this._traverseFlags |= 4 : this._traverseFlags &= -5;
        }
        get shouldStop() {
          return !!(2 & this._traverseFlags);
        }
        set shouldStop(v) {
          v ? this._traverseFlags |= 2 : this._traverseFlags &= -3;
        }
        get removed() {
          return !!(1 & this._traverseFlags);
        }
        set removed(v) {
          v ? this._traverseFlags |= 1 : this._traverseFlags &= -2;
        }
      }
      Object.assign(NodePath.prototype, NodePath_ancestry, NodePath_inference, NodePath_replacement, NodePath_evaluation, NodePath_conversion, NodePath_introspection, NodePath_context, NodePath_removal, NodePath_modification, NodePath_family, NodePath_comments);
      for (const type of t.TYPES) {
        const typeKey = `is${type}`, fn = t[typeKey];
        NodePath.prototype[typeKey] = function(opts) {
          return fn(this.node, opts);
        }, NodePath.prototype[`assert${type}`] = function(opts) {
          if (!fn(this.node, opts)) throw new TypeError(`Expected node path of type ${type}`);
        };
      }
      for (const type of Object.keys(virtualTypes)) {
        if ("_" === type[0]) continue;
        t.TYPES.indexOf(type) < 0 && t.TYPES.push(type);
        const virtualType = virtualTypes[type];
        NodePath.prototype[`is${type}`] = function(opts) {
          return virtualType.checkPath(this, opts);
        };
      }
      var _default = NodePath;
      exports.default = _default;
    },
    1534: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._getTypeAnnotation = function() {
        const node = this.node;
        if (!node) {
          if ("init" === this.key && this.parentPath.isVariableDeclarator()) {
            const declar = this.parentPath.parentPath, declarParent = declar.parentPath;
            return "left" === declar.key && declarParent.isForInStatement() ? stringTypeAnnotation() : "left" === declar.key && declarParent.isForOfStatement() ? anyTypeAnnotation() : voidTypeAnnotation();
          }
          return;
        }
        if (node.typeAnnotation) return node.typeAnnotation;
        if (typeAnnotationInferringNodes.has(node)) return;
        typeAnnotationInferringNodes.add(node);
        try {
          var _inferer;
          let inferer = inferers[node.type];
          if (inferer) return inferer.call(this, node);
          if (inferer = inferers[this.parentPath.type], null != (_inferer = inferer) && _inferer.validParent) return this.parentPath.getTypeAnnotation();
        } finally {
          typeAnnotationInferringNodes.delete(node);
        }
      }, exports.baseTypeStrictlyMatches = function(rightArg) {
        const left = this.getTypeAnnotation(), right = rightArg.getTypeAnnotation();
        if (!isAnyTypeAnnotation(left) && isFlowBaseAnnotation(left)) return right.type === left.type;
        return !1;
      }, exports.couldBeBaseType = function(name) {
        const type = this.getTypeAnnotation();
        if (isAnyTypeAnnotation(type)) return !0;
        if (isUnionTypeAnnotation(type)) {
          for (const type2 of type.types) if (isAnyTypeAnnotation(type2) || _isBaseType(name, type2, !0)) return !0;
          return !1;
        }
        return _isBaseType(name, type, !0);
      }, exports.getTypeAnnotation = function() {
        if (this.typeAnnotation) return this.typeAnnotation;
        let type = this._getTypeAnnotation() || anyTypeAnnotation();
        isTypeAnnotation(type) && (type = type.typeAnnotation);
        return this.typeAnnotation = type;
      }, exports.isBaseType = function(baseName, soft) {
        return _isBaseType(baseName, this.getTypeAnnotation(), soft);
      }, exports.isGenericType = function(genericName) {
        const type = this.getTypeAnnotation();
        return isGenericTypeAnnotation(type) && isIdentifier(type.id, {
          name: genericName
        });
      };
      var inferers = __webpack_require__(5081), _t = __webpack_require__(7289);
      const {anyTypeAnnotation, isAnyTypeAnnotation, isBooleanTypeAnnotation, isEmptyTypeAnnotation, isFlowBaseAnnotation, isGenericTypeAnnotation, isIdentifier, isMixedTypeAnnotation, isNumberTypeAnnotation, isStringTypeAnnotation, isTypeAnnotation, isUnionTypeAnnotation, isVoidTypeAnnotation, stringTypeAnnotation, voidTypeAnnotation} = _t;
      const typeAnnotationInferringNodes = new WeakSet;
      function _isBaseType(baseName, type, soft) {
        if ("string" === baseName) return isStringTypeAnnotation(type);
        if ("number" === baseName) return isNumberTypeAnnotation(type);
        if ("boolean" === baseName) return isBooleanTypeAnnotation(type);
        if ("any" === baseName) return isAnyTypeAnnotation(type);
        if ("mixed" === baseName) return isMixedTypeAnnotation(type);
        if ("empty" === baseName) return isEmptyTypeAnnotation(type);
        if ("void" === baseName) return isVoidTypeAnnotation(type);
        if (soft) return !1;
        throw new Error(`Unknown base type ${baseName}`);
      }
    },
    1674: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        if (!this.isReferenced()) return;
        const binding = this.scope.getBinding(node.name);
        if (binding) return binding.identifier.typeAnnotation ? binding.identifier.typeAnnotation : function(binding, path, name) {
          const types = [], functionConstantViolations = [];
          let constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);
          const testType = getConditionalAnnotation(binding, path, name);
          if (testType) {
            const testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);
            constantViolations = constantViolations.filter((path => testConstantViolations.indexOf(path) < 0)), 
            types.push(testType.typeAnnotation);
          }
          if (constantViolations.length) {
            constantViolations.push(...functionConstantViolations);
            for (const violation of constantViolations) types.push(violation.getTypeAnnotation());
          }
          if (!types.length) return;
          if (isTSTypeAnnotation(types[0]) && createTSUnionType) return createTSUnionType(types);
          if (createFlowUnionType) return createFlowUnionType(types);
          return createUnionTypeAnnotation(types);
        }(binding, this, node.name);
        if ("undefined" === node.name) return voidTypeAnnotation();
        if ("NaN" === node.name || "Infinity" === node.name) return numberTypeAnnotation();
        node.name;
      };
      var _t = __webpack_require__(7289);
      const {BOOLEAN_NUMBER_BINARY_OPERATORS, createFlowUnionType, createTSUnionType, createTypeAnnotationBasedOnTypeof, createUnionTypeAnnotation, isTSTypeAnnotation, numberTypeAnnotation, voidTypeAnnotation} = _t;
      function getConstantViolationsBefore(binding, path, functions) {
        const violations = binding.constantViolations.slice();
        return violations.unshift(binding.path), violations.filter((violation => {
          const status = (violation = violation.resolve())._guessExecutionStatusRelativeTo(path);
          return functions && "unknown" === status && functions.push(violation), "before" === status;
        }));
      }
      function inferAnnotationFromBinaryExpression(name, path) {
        const operator = path.node.operator, right = path.get("right").resolve(), left = path.get("left").resolve();
        let target, typeofPath, typePath;
        if (left.isIdentifier({
          name
        }) ? target = right : right.isIdentifier({
          name
        }) && (target = left), target) return "===" === operator ? target.getTypeAnnotation() : BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0 ? numberTypeAnnotation() : void 0;
        if ("===" !== operator && "==" !== operator) return;
        if (left.isUnaryExpression({
          operator: "typeof"
        }) ? (typeofPath = left, typePath = right) : right.isUnaryExpression({
          operator: "typeof"
        }) && (typeofPath = right, typePath = left), !typeofPath) return;
        if (!typeofPath.get("argument").isIdentifier({
          name
        })) return;
        if (typePath = typePath.resolve(), !typePath.isLiteral()) return;
        const typeValue = typePath.node.value;
        return "string" == typeof typeValue ? createTypeAnnotationBasedOnTypeof(typeValue) : void 0;
      }
      function getConditionalAnnotation(binding, path, name) {
        const ifStatement = function(binding, path, name) {
          let parentPath;
          for (;parentPath = path.parentPath; ) {
            if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
              if ("test" === path.key) return;
              return parentPath;
            }
            if (parentPath.isFunction() && parentPath.parentPath.scope.getBinding(name) !== binding) return;
            path = parentPath;
          }
        }(binding, path, name);
        if (!ifStatement) return;
        const paths = [ ifStatement.get("test") ], types = [];
        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          if (path.isLogicalExpression()) "&&" === path.node.operator && (paths.push(path.get("left")), 
          paths.push(path.get("right"))); else if (path.isBinaryExpression()) {
            const type = inferAnnotationFromBinaryExpression(name, path);
            type && types.push(type);
          }
        }
        return types.length ? isTSTypeAnnotation(types[0]) && createTSUnionType ? {
          typeAnnotation: createTSUnionType(types),
          ifStatement
        } : createFlowUnionType ? {
          typeAnnotation: createFlowUnionType(types),
          ifStatement
        } : {
          typeAnnotation: createUnionTypeAnnotation(types),
          ifStatement
        } : getConditionalAnnotation(ifStatement, name);
      }
    },
    5081: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.ArrayExpression = ArrayExpression, exports.AssignmentExpression = function() {
        return this.get("right").getTypeAnnotation();
      }, exports.BinaryExpression = function(node) {
        const operator = node.operator;
        if (NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) return numberTypeAnnotation();
        if (BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) return booleanTypeAnnotation();
        if ("+" === operator) {
          const right = this.get("right"), left = this.get("left");
          return left.isBaseType("number") && right.isBaseType("number") ? numberTypeAnnotation() : left.isBaseType("string") || right.isBaseType("string") ? stringTypeAnnotation() : unionTypeAnnotation([ stringTypeAnnotation(), numberTypeAnnotation() ]);
        }
      }, exports.BooleanLiteral = function() {
        return booleanTypeAnnotation();
      }, exports.CallExpression = function() {
        const {callee} = this.node;
        if (isObjectKeys(callee)) return arrayTypeAnnotation(stringTypeAnnotation());
        if (isArrayFrom(callee) || isObjectValues(callee)) return arrayTypeAnnotation(anyTypeAnnotation());
        if (isObjectEntries(callee)) return arrayTypeAnnotation(tupleTypeAnnotation([ stringTypeAnnotation(), anyTypeAnnotation() ]));
        return resolveCall(this.get("callee"));
      }, exports.ConditionalExpression = function() {
        const argumentTypes = [ this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation() ];
        if (isTSTypeAnnotation(argumentTypes[0]) && createTSUnionType) return createTSUnionType(argumentTypes);
        if (createFlowUnionType) return createFlowUnionType(argumentTypes);
        return createUnionTypeAnnotation(argumentTypes);
      }, exports.ClassDeclaration = exports.ClassExpression = exports.FunctionDeclaration = exports.ArrowFunctionExpression = exports.FunctionExpression = function() {
        return genericTypeAnnotation(identifier("Function"));
      }, Object.defineProperty(exports, "Identifier", {
        enumerable: !0,
        get: function() {
          return _infererReference.default;
        }
      }), exports.LogicalExpression = function() {
        const argumentTypes = [ this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation() ];
        if (isTSTypeAnnotation(argumentTypes[0]) && createTSUnionType) return createTSUnionType(argumentTypes);
        if (createFlowUnionType) return createFlowUnionType(argumentTypes);
        return createUnionTypeAnnotation(argumentTypes);
      }, exports.NewExpression = function(node) {
        if (this.get("callee").isIdentifier()) return genericTypeAnnotation(node.callee);
      }, exports.NullLiteral = function() {
        return nullLiteralTypeAnnotation();
      }, exports.NumericLiteral = function() {
        return numberTypeAnnotation();
      }, exports.ObjectExpression = function() {
        return genericTypeAnnotation(identifier("Object"));
      }, exports.ParenthesizedExpression = function() {
        return this.get("expression").getTypeAnnotation();
      }, exports.RegExpLiteral = function() {
        return genericTypeAnnotation(identifier("RegExp"));
      }, exports.RestElement = RestElement, exports.SequenceExpression = function() {
        return this.get("expressions").pop().getTypeAnnotation();
      }, exports.StringLiteral = function() {
        return stringTypeAnnotation();
      }, exports.TaggedTemplateExpression = function() {
        return resolveCall(this.get("tag"));
      }, exports.TemplateLiteral = function() {
        return stringTypeAnnotation();
      }, exports.TypeCastExpression = TypeCastExpression, exports.UnaryExpression = function(node) {
        const operator = node.operator;
        if ("void" === operator) return voidTypeAnnotation();
        if (NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) return numberTypeAnnotation();
        if (STRING_UNARY_OPERATORS.indexOf(operator) >= 0) return stringTypeAnnotation();
        if (BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) return booleanTypeAnnotation();
      }, exports.UpdateExpression = function(node) {
        const operator = node.operator;
        if ("++" === operator || "--" === operator) return numberTypeAnnotation();
      }, exports.VariableDeclarator = function() {
        var _type;
        if (!this.get("id").isIdentifier()) return;
        const init = this.get("init");
        let type = init.getTypeAnnotation();
        "AnyTypeAnnotation" === (null == (_type = type) ? void 0 : _type.type) && init.isCallExpression() && init.get("callee").isIdentifier({
          name: "Array"
        }) && !init.scope.hasBinding("Array", !0) && (type = ArrayExpression());
        return type;
      };
      var _t = __webpack_require__(7289), _infererReference = __webpack_require__(1674);
      const {BOOLEAN_BINARY_OPERATORS, BOOLEAN_UNARY_OPERATORS, NUMBER_BINARY_OPERATORS, NUMBER_UNARY_OPERATORS, STRING_UNARY_OPERATORS, anyTypeAnnotation, arrayTypeAnnotation, booleanTypeAnnotation, buildMatchMemberExpression, createFlowUnionType, createTSUnionType, createUnionTypeAnnotation, genericTypeAnnotation, identifier, isTSTypeAnnotation, nullLiteralTypeAnnotation, numberTypeAnnotation, stringTypeAnnotation, tupleTypeAnnotation, unionTypeAnnotation, voidTypeAnnotation} = _t;
      function TypeCastExpression(node) {
        return node.typeAnnotation;
      }
      function ArrayExpression() {
        return genericTypeAnnotation(identifier("Array"));
      }
      function RestElement() {
        return ArrayExpression();
      }
      TypeCastExpression.validParent = !0, RestElement.validParent = !0;
      const isArrayFrom = buildMatchMemberExpression("Array.from"), isObjectKeys = buildMatchMemberExpression("Object.keys"), isObjectValues = buildMatchMemberExpression("Object.values"), isObjectEntries = buildMatchMemberExpression("Object.entries");
      function resolveCall(callee) {
        if ((callee = callee.resolve()).isFunction()) {
          if (callee.is("async")) return callee.is("generator") ? genericTypeAnnotation(identifier("AsyncIterator")) : genericTypeAnnotation(identifier("Promise"));
          if (callee.node.returnType) return callee.node.returnType;
        }
      }
    },
    7743: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._guessExecutionStatusRelativeTo = function(target) {
        const funcParent = {
          this: getOuterFunction(this),
          target: getOuterFunction(target)
        };
        if (funcParent.target.node !== funcParent.this.node) return this._guessExecutionStatusRelativeToDifferentFunctions(funcParent.target);
        const paths = {
          target: target.getAncestry(),
          this: this.getAncestry()
        };
        if (paths.target.indexOf(this) >= 0) return "after";
        if (paths.this.indexOf(target) >= 0) return "before";
        let commonPath;
        const commonIndex = {
          target: 0,
          this: 0
        };
        for (;!commonPath && commonIndex.this < paths.this.length; ) {
          const path = paths.this[commonIndex.this];
          commonIndex.target = paths.target.indexOf(path), commonIndex.target >= 0 ? commonPath = path : commonIndex.this++;
        }
        if (!commonPath) throw new Error("Internal Babel error - The two compared nodes don't appear to belong to the same program.");
        if (isExecutionUncertainInList(paths.this, commonIndex.this - 1) || isExecutionUncertainInList(paths.target, commonIndex.target - 1)) return "unknown";
        const divergence = {
          this: paths.this[commonIndex.this - 1],
          target: paths.target[commonIndex.target - 1]
        };
        if (divergence.target.listKey && divergence.this.listKey && divergence.target.container === divergence.this.container) return divergence.target.key > divergence.this.key ? "before" : "after";
        const keys = VISITOR_KEYS[commonPath.type], keyPosition = {
          this: keys.indexOf(divergence.this.parentKey),
          target: keys.indexOf(divergence.target.parentKey)
        };
        return keyPosition.target > keyPosition.this ? "before" : "after";
      }, exports._guessExecutionStatusRelativeToDifferentFunctions = function(target) {
        if (!target.isFunctionDeclaration() || target.parentPath.isExportDeclaration()) return "unknown";
        const binding = target.scope.getBinding(target.node.id.name);
        if (!binding.references) return "before";
        const referencePaths = binding.referencePaths;
        let allStatus;
        for (const path of referencePaths) {
          if (!!path.find((path => path.node === target.node))) continue;
          if ("callee" !== path.key || !path.parentPath.isCallExpression()) return "unknown";
          if (executionOrderCheckedNodes.has(path.node)) continue;
          executionOrderCheckedNodes.add(path.node);
          const status = this._guessExecutionStatusRelativeTo(path);
          if (executionOrderCheckedNodes.delete(path.node), allStatus && allStatus !== status) return "unknown";
          allStatus = status;
        }
        return allStatus;
      }, exports._resolve = function(dangerous, resolved) {
        if (resolved && resolved.indexOf(this) >= 0) return;
        if ((resolved = resolved || []).push(this), this.isVariableDeclarator()) {
          if (this.get("id").isIdentifier()) return this.get("init").resolve(dangerous, resolved);
        } else if (this.isReferencedIdentifier()) {
          const binding = this.scope.getBinding(this.node.name);
          if (!binding) return;
          if (!binding.constant) return;
          if ("module" === binding.kind) return;
          if (binding.path !== this) {
            const ret = binding.path.resolve(dangerous, resolved);
            if (this.find((parent => parent.node === ret.node))) return;
            return ret;
          }
        } else {
          if (this.isTypeCastExpression()) return this.get("expression").resolve(dangerous, resolved);
          if (dangerous && this.isMemberExpression()) {
            const targetKey = this.toComputedKey();
            if (!isLiteral(targetKey)) return;
            const targetName = targetKey.value, target = this.get("object").resolve(dangerous, resolved);
            if (target.isObjectExpression()) {
              const props = target.get("properties");
              for (const prop of props) {
                if (!prop.isProperty()) continue;
                const key = prop.get("key");
                let match = prop.isnt("computed") && key.isIdentifier({
                  name: targetName
                });
                if (match = match || key.isLiteral({
                  value: targetName
                }), match) return prop.get("value").resolve(dangerous, resolved);
              }
            } else if (target.isArrayExpression() && !isNaN(+targetName)) {
              const elem = target.get("elements")[targetName];
              if (elem) return elem.resolve(dangerous, resolved);
            }
          }
        }
      }, exports.canHaveVariableDeclarationOrExpression = function() {
        return ("init" === this.key || "left" === this.key) && this.parentPath.isFor();
      }, exports.canSwapBetweenExpressionAndStatement = function(replacement) {
        if ("body" !== this.key || !this.parentPath.isArrowFunctionExpression()) return !1;
        if (this.isExpression()) return isBlockStatement(replacement);
        if (this.isBlockStatement()) return isExpression(replacement);
        return !1;
      }, exports.equals = function(key, value) {
        return this.node[key] === value;
      }, exports.getSource = function() {
        const node = this.node;
        if (node.end) {
          const code = this.hub.getCode();
          if (code) return code.slice(node.start, node.end);
        }
        return "";
      }, exports.has = has, exports.is = void 0, exports.isCompletionRecord = function(allowInsideFunction) {
        let path = this, first = !0;
        do {
          const container = path.container;
          if (path.isFunction() && !first) return !!allowInsideFunction;
          if (first = !1, Array.isArray(container) && path.key !== container.length - 1) return !1;
        } while ((path = path.parentPath) && !path.isProgram());
        return !0;
      }, exports.isConstantExpression = function() {
        if (this.isIdentifier()) {
          const binding = this.scope.getBinding(this.node.name);
          return !!binding && binding.constant;
        }
        if (this.isLiteral()) return !this.isRegExpLiteral() && (!this.isTemplateLiteral() || this.get("expressions").every((expression => expression.isConstantExpression())));
        if (this.isUnaryExpression()) return "void" === this.node.operator && this.get("argument").isConstantExpression();
        if (this.isBinaryExpression()) return this.get("left").isConstantExpression() && this.get("right").isConstantExpression();
        return !1;
      }, exports.isInStrictMode = function() {
        const start = this.isProgram() ? this : this.parentPath;
        return !!start.find((path => {
          if (path.isProgram({
            sourceType: "module"
          })) return !0;
          if (path.isClass()) return !0;
          if (!path.isProgram() && !path.isFunction()) return !1;
          if (path.isArrowFunctionExpression() && !path.get("body").isBlockStatement()) return !1;
          const body = path.isFunction() ? path.node.body : path.node;
          for (const directive of body.directives) if ("use strict" === directive.value.value) return !0;
        }));
      }, exports.isNodeType = function(type) {
        return isType(this.type, type);
      }, exports.isStatementOrBlock = function() {
        return !this.parentPath.isLabeledStatement() && !isBlockStatement(this.container) && STATEMENT_OR_BLOCK_KEYS.includes(this.key);
      }, exports.isStatic = function() {
        return this.scope.isStatic(this.node);
      }, exports.isnt = function(key) {
        return !this.has(key);
      }, exports.matchesPattern = function(pattern, allowPartial) {
        return _matchesPattern(this.node, pattern, allowPartial);
      }, exports.referencesImport = function(moduleSource, importName) {
        if (!this.isReferencedIdentifier()) {
          if (this.isJSXMemberExpression() && this.node.property.name === importName || (this.isMemberExpression() || this.isOptionalMemberExpression()) && (this.node.computed ? isStringLiteral(this.node.property, {
            value: importName
          }) : this.node.property.name === importName)) {
            const object = this.get("object");
            return object.isReferencedIdentifier() && object.referencesImport(moduleSource, "*");
          }
          return !1;
        }
        const binding = this.scope.getBinding(this.node.name);
        if (!binding || "module" !== binding.kind) return !1;
        const path = binding.path, parent = path.parentPath;
        if (!parent.isImportDeclaration()) return !1;
        if (parent.node.source.value !== moduleSource) return !1;
        if (!importName) return !0;
        if (path.isImportDefaultSpecifier() && "default" === importName) return !0;
        if (path.isImportNamespaceSpecifier() && "*" === importName) return !0;
        if (path.isImportSpecifier() && isIdentifier(path.node.imported, {
          name: importName
        })) return !0;
        return !1;
      }, exports.resolve = function(dangerous, resolved) {
        return this._resolve(dangerous, resolved) || this;
      }, exports.willIMaybeExecuteBefore = function(target) {
        return "after" !== this._guessExecutionStatusRelativeTo(target);
      };
      var _t = __webpack_require__(7289);
      const {STATEMENT_OR_BLOCK_KEYS, VISITOR_KEYS, isBlockStatement, isExpression, isIdentifier, isLiteral, isStringLiteral, isType, matchesPattern: _matchesPattern} = _t;
      function has(key) {
        const val = this.node && this.node[key];
        return val && Array.isArray(val) ? !!val.length : !!val;
      }
      const is = has;
      function getOuterFunction(path) {
        return (path.scope.getFunctionParent() || path.scope.getProgramParent()).path;
      }
      function isExecutionUncertain(type, key) {
        switch (type) {
         case "LogicalExpression":
         case "AssignmentPattern":
          return "right" === key;

         case "ConditionalExpression":
         case "IfStatement":
          return "consequent" === key || "alternate" === key;

         case "WhileStatement":
         case "DoWhileStatement":
         case "ForInStatement":
         case "ForOfStatement":
          return "body" === key;

         case "ForStatement":
          return "body" === key || "update" === key;

         case "SwitchStatement":
          return "cases" === key;

         case "TryStatement":
          return "handler" === key;

         case "OptionalMemberExpression":
          return "property" === key;

         case "OptionalCallExpression":
          return "arguments" === key;

         default:
          return !1;
        }
      }
      function isExecutionUncertainInList(paths, maxIndex) {
        for (let i = 0; i < maxIndex; i++) {
          const path = paths[i];
          if (isExecutionUncertain(path.parent.type, path.parentKey)) return !0;
        }
        return !1;
      }
      exports.is = is;
      const executionOrderCheckedNodes = new WeakSet;
    },
    9380: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _t = __webpack_require__(7289), _t2 = _t;
      const {react} = _t, {cloneNode, jsxExpressionContainer, variableDeclaration, variableDeclarator} = _t2, referenceVisitor = {
        ReferencedIdentifier(path, state) {
          if (path.isJSXIdentifier() && react.isCompatTag(path.node.name) && !path.parentPath.isJSXMemberExpression()) return;
          if ("this" === path.node.name) {
            let scope = path.scope;
            do {
              if (scope.path.isFunction() && !scope.path.isArrowFunctionExpression()) break;
            } while (scope = scope.parent);
            scope && state.breakOnScopePaths.push(scope.path);
          }
          const binding = path.scope.getBinding(path.node.name);
          if (binding) {
            for (const violation of binding.constantViolations) if (violation.scope !== binding.path.scope) return state.mutableBinding = !0, 
            void path.stop();
            binding === state.scope.getBinding(path.node.name) && (state.bindings[path.node.name] = binding);
          }
        }
      };
      exports.default = class {
        constructor(path, scope) {
          this.breakOnScopePaths = void 0, this.bindings = void 0, this.mutableBinding = void 0, 
          this.scopes = void 0, this.scope = void 0, this.path = void 0, this.attachAfter = void 0, 
          this.breakOnScopePaths = [], this.bindings = {}, this.mutableBinding = !1, this.scopes = [], 
          this.scope = scope, this.path = path, this.attachAfter = !1;
        }
        isCompatibleScope(scope) {
          for (const key of Object.keys(this.bindings)) {
            const binding = this.bindings[key];
            if (!scope.bindingIdentifierEquals(key, binding.identifier)) return !1;
          }
          return !0;
        }
        getCompatibleScopes() {
          let scope = this.path.scope;
          do {
            if (!this.isCompatibleScope(scope)) break;
            if (this.scopes.push(scope), this.breakOnScopePaths.indexOf(scope.path) >= 0) break;
          } while (scope = scope.parent);
        }
        getAttachmentPath() {
          let path = this._getAttachmentPath();
          if (!path) return;
          let targetScope = path.scope;
          if (targetScope.path === path && (targetScope = path.scope.parent), targetScope.path.isProgram() || targetScope.path.isFunction()) for (const name of Object.keys(this.bindings)) {
            if (!targetScope.hasOwnBinding(name)) continue;
            const binding = this.bindings[name];
            if ("param" === binding.kind || "params" === binding.path.parentKey) continue;
            if (this.getAttachmentParentForPath(binding.path).key >= path.key) {
              this.attachAfter = !0, path = binding.path;
              for (const violationPath of binding.constantViolations) this.getAttachmentParentForPath(violationPath).key > path.key && (path = violationPath);
            }
          }
          return path;
        }
        _getAttachmentPath() {
          const scope = this.scopes.pop();
          if (scope) if (scope.path.isFunction()) {
            if (!this.hasOwnParamBindings(scope)) return this.getNextScopeAttachmentParent();
            {
              if (this.scope === scope) return;
              const bodies = scope.path.get("body").get("body");
              for (let i = 0; i < bodies.length; i++) if (!bodies[i].node._blockHoist) return bodies[i];
            }
          } else if (scope.path.isProgram()) return this.getNextScopeAttachmentParent();
        }
        getNextScopeAttachmentParent() {
          const scope = this.scopes.pop();
          if (scope) return this.getAttachmentParentForPath(scope.path);
        }
        getAttachmentParentForPath(path) {
          do {
            if (!path.parentPath || Array.isArray(path.container) && path.isStatement()) return path;
          } while (path = path.parentPath);
        }
        hasOwnParamBindings(scope) {
          for (const name of Object.keys(this.bindings)) {
            if (!scope.hasOwnBinding(name)) continue;
            const binding = this.bindings[name];
            if ("param" === binding.kind && binding.constant) return !0;
          }
          return !1;
        }
        run() {
          if (this.path.traverse(referenceVisitor, this), this.mutableBinding) return;
          this.getCompatibleScopes();
          const attachTo = this.getAttachmentPath();
          if (!attachTo) return;
          if (attachTo.getFunctionParent() === this.path.getFunctionParent()) return;
          let uid = attachTo.scope.generateUidIdentifier("ref");
          const declarator = variableDeclarator(uid, this.path.node), insertFn = this.attachAfter ? "insertAfter" : "insertBefore", [attached] = attachTo[insertFn]([ attachTo.isVariableDeclarator() ? declarator : variableDeclaration("var", [ declarator ]) ]), parent = this.path.parentPath;
          return parent.isJSXElement() && this.path.container === parent.node.children && (uid = jsxExpressionContainer(uid)), 
          this.path.replaceWith(cloneNode(uid)), attachTo.isVariableDeclarator() ? attached.get("init") : attached.get("declarations.0.init");
        }
      };
    },
    1233: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.hooks = void 0;
      exports.hooks = [ function(self, parent) {
        if ("test" === self.key && (parent.isWhile() || parent.isSwitchCase()) || "declaration" === self.key && parent.isExportDeclaration() || "body" === self.key && parent.isLabeledStatement() || "declarations" === self.listKey && parent.isVariableDeclaration() && 1 === parent.node.declarations.length || "expression" === self.key && parent.isExpressionStatement()) return parent.remove(), 
        !0;
      }, function(self, parent) {
        if (parent.isSequenceExpression() && 1 === parent.node.expressions.length) return parent.replaceWith(parent.node.expressions[0]), 
        !0;
      }, function(self, parent) {
        if (parent.isBinary()) return "left" === self.key ? parent.replaceWith(parent.node.right) : parent.replaceWith(parent.node.left), 
        !0;
      }, function(self, parent) {
        if (parent.isIfStatement() && ("consequent" === self.key || "alternate" === self.key) || "body" === self.key && (parent.isLoop() || parent.isArrowFunctionExpression())) return self.replaceWith({
          type: "BlockStatement",
          body: []
        }), !0;
      } ];
    },
    4387: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.Var = exports.User = exports.Statement = exports.SpreadProperty = exports.Scope = exports.RestProperty = exports.ReferencedMemberExpression = exports.ReferencedIdentifier = exports.Referenced = exports.Pure = exports.NumericLiteralTypeAnnotation = exports.Generated = exports.ForAwaitStatement = exports.Flow = exports.Expression = exports.ExistentialTypeParam = exports.BlockScoped = exports.BindingIdentifier = void 0;
      var _t = __webpack_require__(7289);
      const {isBinding, isBlockScoped, isExportDeclaration, isExpression, isFlow, isForStatement, isForXStatement, isIdentifier, isImportDeclaration, isImportSpecifier, isJSXIdentifier, isJSXMemberExpression, isMemberExpression, isReferenced, isScope, isStatement, isVar, isVariableDeclaration, react} = _t, {isCompatTag} = react, ReferencedIdentifier = {
        types: [ "Identifier", "JSXIdentifier" ],
        checkPath(path, opts) {
          const {node, parent} = path;
          if (!isIdentifier(node, opts) && !isJSXMemberExpression(parent, opts)) {
            if (!isJSXIdentifier(node, opts)) return !1;
            if (isCompatTag(node.name)) return !1;
          }
          return isReferenced(node, parent, path.parentPath.parent);
        }
      };
      exports.ReferencedIdentifier = ReferencedIdentifier;
      const ReferencedMemberExpression = {
        types: [ "MemberExpression" ],
        checkPath: ({node, parent}) => isMemberExpression(node) && isReferenced(node, parent)
      };
      exports.ReferencedMemberExpression = ReferencedMemberExpression;
      const BindingIdentifier = {
        types: [ "Identifier" ],
        checkPath(path) {
          const {node, parent} = path, grandparent = path.parentPath.parent;
          return isIdentifier(node) && isBinding(node, parent, grandparent);
        }
      };
      exports.BindingIdentifier = BindingIdentifier;
      const Statement = {
        types: [ "Statement" ],
        checkPath({node, parent}) {
          if (isStatement(node)) {
            if (isVariableDeclaration(node)) {
              if (isForXStatement(parent, {
                left: node
              })) return !1;
              if (isForStatement(parent, {
                init: node
              })) return !1;
            }
            return !0;
          }
          return !1;
        }
      };
      exports.Statement = Statement;
      const Expression = {
        types: [ "Expression" ],
        checkPath: path => path.isIdentifier() ? path.isReferencedIdentifier() : isExpression(path.node)
      };
      exports.Expression = Expression;
      const Scope = {
        types: [ "Scopable", "Pattern" ],
        checkPath: path => isScope(path.node, path.parent)
      };
      exports.Scope = Scope;
      const Referenced = {
        checkPath: path => isReferenced(path.node, path.parent)
      };
      exports.Referenced = Referenced;
      const BlockScoped = {
        checkPath: path => isBlockScoped(path.node)
      };
      exports.BlockScoped = BlockScoped;
      const Var = {
        types: [ "VariableDeclaration" ],
        checkPath: path => isVar(path.node)
      };
      exports.Var = Var;
      const User = {
        checkPath: path => path.node && !!path.node.loc
      };
      exports.User = User;
      const Generated = {
        checkPath: path => !path.isUser()
      };
      exports.Generated = Generated;
      const Pure = {
        checkPath: (path, constantsOnly) => path.scope.isPure(path.node, constantsOnly)
      };
      exports.Pure = Pure;
      const Flow = {
        types: [ "Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier" ],
        checkPath: ({node}) => !!isFlow(node) || (isImportDeclaration(node) ? "type" === node.importKind || "typeof" === node.importKind : isExportDeclaration(node) ? "type" === node.exportKind : !!isImportSpecifier(node) && ("type" === node.importKind || "typeof" === node.importKind))
      };
      exports.Flow = Flow;
      const RestProperty = {
        types: [ "RestElement" ],
        checkPath: path => path.parentPath && path.parentPath.isObjectPattern()
      };
      exports.RestProperty = RestProperty;
      const SpreadProperty = {
        types: [ "RestElement" ],
        checkPath: path => path.parentPath && path.parentPath.isObjectExpression()
      };
      exports.SpreadProperty = SpreadProperty;
      exports.ExistentialTypeParam = {
        types: [ "ExistsTypeAnnotation" ]
      };
      exports.NumericLiteralTypeAnnotation = {
        types: [ "NumberLiteralTypeAnnotation" ]
      };
      const ForAwaitStatement = {
        types: [ "ForOfStatement" ],
        checkPath: ({node}) => !0 === node.await
      };
      exports.ForAwaitStatement = ForAwaitStatement;
    },
    8129: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._containerInsert = function(from, nodes) {
        this.updateSiblingKeys(from, nodes.length);
        const paths = [];
        this.container.splice(from, 0, ...nodes);
        for (let i = 0; i < nodes.length; i++) {
          const to = from + i, path = this.getSibling(to);
          paths.push(path), this.context && this.context.queue && path.pushContext(this.context);
        }
        const contexts = this._getQueueContexts();
        for (const path of paths) {
          path.setScope(), path.debug("Inserted.");
          for (const context of contexts) context.maybeQueue(path, !0);
        }
        return paths;
      }, exports._containerInsertAfter = function(nodes) {
        return this._containerInsert(this.key + 1, nodes);
      }, exports._containerInsertBefore = function(nodes) {
        return this._containerInsert(this.key, nodes);
      }, exports._verifyNodeList = function(nodes) {
        if (!nodes) return [];
        Array.isArray(nodes) || (nodes = [ nodes ]);
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          let msg;
          if (node ? "object" != typeof node ? msg = "contains a non-object node" : node.type ? node instanceof _index.default && (msg = "has a NodePath when it expected a raw object") : msg = "without a type" : msg = "has falsy node", 
          msg) {
            const type = Array.isArray(node) ? "array" : typeof node;
            throw new Error(`Node list ${msg} with the index of ${i} and type of ${type}`);
          }
        }
        return nodes;
      }, exports.hoist = function(scope = this.scope) {
        return new _hoister.default(this, scope).run();
      }, exports.insertAfter = function(nodes_) {
        if (this._assertUnremoved(), this.isSequenceExpression()) return last(this.get("expressions")).insertAfter(nodes_);
        const nodes = this._verifyNodeList(nodes_), {parentPath} = this;
        if (parentPath.isExpressionStatement() || parentPath.isLabeledStatement() || parentPath.isExportNamedDeclaration() || parentPath.isExportDefaultDeclaration() && this.isDeclaration()) return parentPath.insertAfter(nodes.map((node => isExpression(node) ? expressionStatement(node) : node)));
        if (this.isNodeType("Expression") && !this.isJSXElement() && !parentPath.isJSXElement() || parentPath.isForStatement() && "init" === this.key) {
          if (this.node) {
            const node = this.node;
            let {scope} = this;
            if (scope.path.isPattern()) return assertExpression(node), this.replaceWith(callExpression(arrowFunctionExpression([], node), [])), 
            this.get("callee.body").insertAfter(nodes), [ this ];
            if (isHiddenInSequenceExpression(this)) nodes.unshift(node); else if (isCallExpression(node) && isSuper(node.callee)) nodes.unshift(node), 
            nodes.push(thisExpression()); else if (function(node, scope) {
              if (!isAssignmentExpression(node) || !isIdentifier(node.left)) return !1;
              const blockScope = scope.getBlockParent();
              return blockScope.hasOwnBinding(node.left.name) && blockScope.getOwnBinding(node.left.name).constantViolations.length <= 1;
            }(node, scope)) nodes.unshift(node), nodes.push(cloneNode(node.left)); else if (scope.isPure(node, !0)) nodes.push(node); else {
              parentPath.isMethod({
                computed: !0,
                key: node
              }) && (scope = scope.parent);
              const temp = scope.generateDeclaredUidIdentifier();
              nodes.unshift(expressionStatement(assignmentExpression("=", cloneNode(temp), node))), 
              nodes.push(expressionStatement(cloneNode(temp)));
            }
          }
          return this.replaceExpressionWithStatements(nodes);
        }
        if (Array.isArray(this.container)) return this._containerInsertAfter(nodes);
        if (this.isStatementOrBlock()) {
          const node = this.node, shouldInsertCurrentNode = node && (!this.isExpressionStatement() || null != node.expression);
          return this.replaceWith(blockStatement(shouldInsertCurrentNode ? [ node ] : [])), 
          this.pushContainer("body", nodes);
        }
        throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
      }, exports.insertBefore = function(nodes_) {
        this._assertUnremoved();
        const nodes = this._verifyNodeList(nodes_), {parentPath} = this;
        if (parentPath.isExpressionStatement() || parentPath.isLabeledStatement() || parentPath.isExportNamedDeclaration() || parentPath.isExportDefaultDeclaration() && this.isDeclaration()) return parentPath.insertBefore(nodes);
        if (this.isNodeType("Expression") && !this.isJSXElement() || parentPath.isForStatement() && "init" === this.key) return this.node && nodes.push(this.node), 
        this.replaceExpressionWithStatements(nodes);
        if (Array.isArray(this.container)) return this._containerInsertBefore(nodes);
        if (this.isStatementOrBlock()) {
          const node = this.node, shouldInsertCurrentNode = node && (!this.isExpressionStatement() || null != node.expression);
          return this.replaceWith(blockStatement(shouldInsertCurrentNode ? [ node ] : [])), 
          this.unshiftContainer("body", nodes);
        }
        throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
      }, exports.pushContainer = function(listKey, nodes) {
        this._assertUnremoved();
        const verifiedNodes = this._verifyNodeList(nodes), container = this.node[listKey];
        return _index.default.get({
          parentPath: this,
          parent: this.node,
          container,
          listKey,
          key: container.length
        }).setContext(this.context).replaceWithMultiple(verifiedNodes);
      }, exports.unshiftContainer = function(listKey, nodes) {
        this._assertUnremoved(), nodes = this._verifyNodeList(nodes);
        return _index.default.get({
          parentPath: this,
          parent: this.node,
          container: this.node[listKey],
          listKey,
          key: 0
        }).setContext(this.context)._containerInsertBefore(nodes);
      }, exports.updateSiblingKeys = function(fromIndex, incrementBy) {
        if (!this.parent) return;
        const paths = _cache.path.get(this.parent);
        for (const [, path] of paths) path.key >= fromIndex && (path.key += incrementBy);
      };
      var _cache = __webpack_require__(732), _hoister = __webpack_require__(9380), _index = __webpack_require__(2969), _t = __webpack_require__(7289);
      const {arrowFunctionExpression, assertExpression, assignmentExpression, blockStatement, callExpression, cloneNode, expressionStatement, isAssignmentExpression, isCallExpression, isExpression, isIdentifier, isSequenceExpression, isSuper, thisExpression} = _t;
      const last = arr => arr[arr.length - 1];
      function isHiddenInSequenceExpression(path) {
        return isSequenceExpression(path.parent) && (last(path.parent.expressions) !== path.node || isHiddenInSequenceExpression(path.parentPath));
      }
    },
    2052: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._assertUnremoved = function() {
        if (this.removed) throw this.buildCodeFrameError("NodePath has been removed so is read-only.");
      }, exports._callRemovalHooks = function() {
        for (const fn of _removalHooks.hooks) if (fn(this, this.parentPath)) return !0;
      }, exports._markRemoved = function() {
        this._traverseFlags |= _index.SHOULD_SKIP | _index.REMOVED, this.parent && _cache.path.get(this.parent).delete(this.node);
        this.node = null;
      }, exports._remove = function() {
        Array.isArray(this.container) ? (this.container.splice(this.key, 1), this.updateSiblingKeys(this.key, -1)) : this._replaceWith(null);
      }, exports._removeFromScope = function() {
        const bindings = this.getBindingIdentifiers();
        Object.keys(bindings).forEach((name => this.scope.removeBinding(name)));
      }, exports.remove = function() {
        var _this$opts;
        this._assertUnremoved(), this.resync(), null != (_this$opts = this.opts) && _this$opts.noScope || this._removeFromScope();
        if (this._callRemovalHooks()) return void this._markRemoved();
        this.shareCommentsWithSiblings(), this._remove(), this._markRemoved();
      };
      var _removalHooks = __webpack_require__(1233), _cache = __webpack_require__(732), _index = __webpack_require__(2969);
    },
    23: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports._replaceWith = function(node) {
        var _pathCache$get2;
        if (!this.container) throw new ReferenceError("Container is falsy");
        this.inList ? validate(this.parent, this.key, [ node ]) : validate(this.parent, this.key, node);
        this.debug(`Replace with ${null == node ? void 0 : node.type}`), null == (_pathCache$get2 = _cache.path.get(this.parent)) || _pathCache$get2.set(node, this).delete(this.node), 
        this.node = this.container[this.key] = node;
      }, exports.replaceExpressionWithStatements = function(nodes) {
        this.resync();
        const nodesAsSequenceExpression = toSequenceExpression(nodes, this.scope);
        if (nodesAsSequenceExpression) return this.replaceWith(nodesAsSequenceExpression)[0].get("expressions");
        const functionParent = this.getFunctionParent(), isParentAsync = null == functionParent ? void 0 : functionParent.is("async"), isParentGenerator = null == functionParent ? void 0 : functionParent.is("generator"), container = arrowFunctionExpression([], blockStatement(nodes));
        this.replaceWith(callExpression(container, []));
        const callee = this.get("callee");
        (0, _helperHoistVariables.default)(callee.get("body"), (id => {
          this.scope.push({
            id
          });
        }), "var");
        const completionRecords = this.get("callee").getCompletionRecords();
        for (const path of completionRecords) {
          if (!path.isExpressionStatement()) continue;
          const loop = path.findParent((path => path.isLoop()));
          if (loop) {
            let uid = loop.getData("expressionReplacementReturnUid");
            uid ? uid = identifier(uid.name) : (uid = callee.scope.generateDeclaredUidIdentifier("ret"), 
            callee.get("body").pushContainer("body", returnStatement(cloneNode(uid))), loop.setData("expressionReplacementReturnUid", uid)), 
            path.get("expression").replaceWith(assignmentExpression("=", cloneNode(uid), path.node.expression));
          } else path.replaceWith(returnStatement(path.node.expression));
        }
        callee.arrowFunctionToExpression();
        const newCallee = callee, needToAwaitFunction = isParentAsync && _index.default.hasType(this.get("callee.body").node, "AwaitExpression", FUNCTION_TYPES), needToYieldFunction = isParentGenerator && _index.default.hasType(this.get("callee.body").node, "YieldExpression", FUNCTION_TYPES);
        needToAwaitFunction && (newCallee.set("async", !0), needToYieldFunction || this.replaceWith(awaitExpression(this.node)));
        needToYieldFunction && (newCallee.set("generator", !0), this.replaceWith(yieldExpression(this.node, !0)));
        return newCallee.get("body.body");
      }, exports.replaceInline = function(nodes) {
        if (this.resync(), Array.isArray(nodes)) {
          if (Array.isArray(this.container)) {
            nodes = this._verifyNodeList(nodes);
            const paths = this._containerInsertAfter(nodes);
            return this.remove(), paths;
          }
          return this.replaceWithMultiple(nodes);
        }
        return this.replaceWith(nodes);
      }, exports.replaceWith = function(replacement) {
        if (this.resync(), this.removed) throw new Error("You can't replace this node, we've already removed it");
        replacement instanceof _index2.default && (replacement = replacement.node);
        if (!replacement) throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");
        if (this.node === replacement) return [ this ];
        if (this.isProgram() && !isProgram(replacement)) throw new Error("You can only replace a Program root node with another Program node");
        if (Array.isArray(replacement)) throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");
        if ("string" == typeof replacement) throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");
        let nodePath = "";
        this.isNodeType("Statement") && isExpression(replacement) && (this.canHaveVariableDeclarationOrExpression() || this.canSwapBetweenExpressionAndStatement(replacement) || this.parentPath.isExportDefaultDeclaration() || (replacement = expressionStatement(replacement), 
        nodePath = "expression"));
        if (this.isNodeType("Expression") && isStatement(replacement) && !this.canHaveVariableDeclarationOrExpression() && !this.canSwapBetweenExpressionAndStatement(replacement)) return this.replaceExpressionWithStatements([ replacement ]);
        const oldNode = this.node;
        oldNode && (inheritsComments(replacement, oldNode), removeComments(oldNode));
        return this._replaceWith(replacement), this.type = replacement.type, this.setScope(), 
        this.requeue(), [ nodePath ? this.get(nodePath) : this ];
      }, exports.replaceWithMultiple = function(nodes) {
        var _pathCache$get;
        this.resync(), nodes = this._verifyNodeList(nodes), inheritLeadingComments(nodes[0], this.node), 
        inheritTrailingComments(nodes[nodes.length - 1], this.node), null == (_pathCache$get = _cache.path.get(this.parent)) || _pathCache$get.delete(this.node), 
        this.node = this.container[this.key] = null;
        const paths = this.insertAfter(nodes);
        this.node ? this.requeue() : this.remove();
        return paths;
      }, exports.replaceWithSourceString = function(replacement) {
        this.resync();
        try {
          replacement = `(${replacement})`, replacement = (0, _parser.parse)(replacement);
        } catch (err) {
          const loc = err.loc;
          throw loc && (err.message += " - make sure this is an expression.\n" + (0, _codeFrame.codeFrameColumns)(replacement, {
            start: {
              line: loc.line,
              column: loc.column + 1
            }
          }), err.code = "BABEL_REPLACE_SOURCE_ERROR"), err;
        }
        return replacement = replacement.program.body[0].expression, _index.default.removeProperties(replacement), 
        this.replaceWith(replacement);
      };
      var _codeFrame = __webpack_require__(4709), _index = __webpack_require__(9838), _index2 = __webpack_require__(2969), _cache = __webpack_require__(732), _parser = __webpack_require__(9516), _t = __webpack_require__(7289), _helperHoistVariables = __webpack_require__(9061);
      const {FUNCTION_TYPES, arrowFunctionExpression, assignmentExpression, awaitExpression, blockStatement, callExpression, cloneNode, expressionStatement, identifier, inheritLeadingComments, inheritTrailingComments, inheritsComments, isExpression, isProgram, isStatement, removeComments, returnStatement, toSequenceExpression, validate, yieldExpression} = _t;
    },
    8287: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      exports.default = class {
        constructor({identifier, scope, path, kind}) {
          this.identifier = void 0, this.scope = void 0, this.path = void 0, this.kind = void 0, 
          this.constantViolations = [], this.constant = !0, this.referencePaths = [], this.referenced = !1, 
          this.references = 0, this.identifier = identifier, this.scope = scope, this.path = path, 
          this.kind = kind, this.clearValue();
        }
        deoptValue() {
          this.clearValue(), this.hasDeoptedValue = !0;
        }
        setValue(value) {
          this.hasDeoptedValue || (this.hasValue = !0, this.value = value);
        }
        clearValue() {
          this.hasDeoptedValue = !1, this.hasValue = !1, this.value = null;
        }
        reassign(path) {
          this.constant = !1, -1 === this.constantViolations.indexOf(path) && this.constantViolations.push(path);
        }
        reference(path) {
          -1 === this.referencePaths.indexOf(path) && (this.referenced = !0, this.references++, 
          this.referencePaths.push(path));
        }
        dereference() {
          this.references--, this.referenced = !!this.references;
        }
      };
    },
    2570: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _renamer = __webpack_require__(1669), _index = __webpack_require__(9838), _binding = __webpack_require__(8287), _globals = __webpack_require__(1272), _t = __webpack_require__(7289), _cache = __webpack_require__(732);
      const {NOT_LOCAL_BINDING, callExpression, cloneNode, getBindingIdentifiers, identifier, isArrayExpression, isBinary, isClass, isClassBody, isClassDeclaration, isExportAllDeclaration, isExportDefaultDeclaration, isExportNamedDeclaration, isFunctionDeclaration, isIdentifier, isImportDeclaration, isLiteral, isMethod, isModuleDeclaration, isModuleSpecifier, isObjectExpression, isProperty, isPureish, isSuper, isTaggedTemplateExpression, isTemplateLiteral, isThisExpression, isUnaryExpression, isVariableDeclaration, matchesPattern, memberExpression, numericLiteral, toIdentifier, unaryExpression, variableDeclaration, variableDeclarator, isRecordExpression, isTupleExpression, isObjectProperty, isTopicReference, isMetaProperty, isPrivateName} = _t;
      function gatherNodeParts(node, parts) {
        switch (null == node ? void 0 : node.type) {
         default:
          if (isModuleDeclaration(node)) if ((isExportAllDeclaration(node) || isExportNamedDeclaration(node) || isImportDeclaration(node)) && node.source) gatherNodeParts(node.source, parts); else if ((isExportNamedDeclaration(node) || isImportDeclaration(node)) && node.specifiers && node.specifiers.length) for (const e of node.specifiers) gatherNodeParts(e, parts); else (isExportDefaultDeclaration(node) || isExportNamedDeclaration(node)) && node.declaration && gatherNodeParts(node.declaration, parts); else isModuleSpecifier(node) ? gatherNodeParts(node.local, parts) : isLiteral(node) && parts.push(node.value);
          break;

         case "MemberExpression":
         case "OptionalMemberExpression":
         case "JSXMemberExpression":
          gatherNodeParts(node.object, parts), gatherNodeParts(node.property, parts);
          break;

         case "Identifier":
         case "JSXIdentifier":
         case "JSXOpeningElement":
          parts.push(node.name);
          break;

         case "CallExpression":
         case "OptionalCallExpression":
         case "NewExpression":
          gatherNodeParts(node.callee, parts);
          break;

         case "ObjectExpression":
         case "ObjectPattern":
          for (const e of node.properties) gatherNodeParts(e, parts);
          break;

         case "SpreadElement":
         case "RestElement":
         case "UnaryExpression":
         case "UpdateExpression":
          gatherNodeParts(node.argument, parts);
          break;

         case "ObjectProperty":
         case "ObjectMethod":
         case "ClassProperty":
         case "ClassMethod":
         case "ClassPrivateProperty":
         case "ClassPrivateMethod":
          gatherNodeParts(node.key, parts);
          break;

         case "ThisExpression":
          parts.push("this");
          break;

         case "Super":
          parts.push("super");
          break;

         case "Import":
          parts.push("import");
          break;

         case "DoExpression":
          parts.push("do");
          break;

         case "YieldExpression":
          parts.push("yield"), gatherNodeParts(node.argument, parts);
          break;

         case "AwaitExpression":
          parts.push("await"), gatherNodeParts(node.argument, parts);
          break;

         case "AssignmentExpression":
          gatherNodeParts(node.left, parts);
          break;

         case "VariableDeclarator":
         case "FunctionExpression":
         case "FunctionDeclaration":
         case "ClassExpression":
         case "ClassDeclaration":
         case "PrivateName":
          gatherNodeParts(node.id, parts);
          break;

         case "ParenthesizedExpression":
          gatherNodeParts(node.expression, parts);
          break;

         case "MetaProperty":
          gatherNodeParts(node.meta, parts), gatherNodeParts(node.property, parts);
          break;

         case "JSXElement":
          gatherNodeParts(node.openingElement, parts);
          break;

         case "JSXFragment":
          gatherNodeParts(node.openingFragment, parts);
          break;

         case "JSXOpeningFragment":
          parts.push("Fragment");
          break;

         case "JSXNamespacedName":
          gatherNodeParts(node.namespace, parts), gatherNodeParts(node.name, parts);
        }
      }
      const collectorVisitor = {
        ForStatement(path) {
          const declar = path.get("init");
          if (declar.isVar()) {
            const {scope} = path;
            (scope.getFunctionParent() || scope.getProgramParent()).registerBinding("var", declar);
          }
        },
        Declaration(path) {
          if (path.isBlockScoped()) return;
          if (path.isImportDeclaration()) return;
          if (path.isExportDeclaration()) return;
          (path.scope.getFunctionParent() || path.scope.getProgramParent()).registerDeclaration(path);
        },
        ImportDeclaration(path) {
          path.scope.getBlockParent().registerDeclaration(path);
        },
        ReferencedIdentifier(path, state) {
          state.references.push(path);
        },
        ForXStatement(path, state) {
          const left = path.get("left");
          if (left.isPattern() || left.isIdentifier()) state.constantViolations.push(path); else if (left.isVar()) {
            const {scope} = path;
            (scope.getFunctionParent() || scope.getProgramParent()).registerBinding("var", left);
          }
        },
        ExportDeclaration: {
          exit(path) {
            const {node, scope} = path;
            if (isExportAllDeclaration(node)) return;
            const declar = node.declaration;
            if (isClassDeclaration(declar) || isFunctionDeclaration(declar)) {
              const id = declar.id;
              if (!id) return;
              const binding = scope.getBinding(id.name);
              null == binding || binding.reference(path);
            } else if (isVariableDeclaration(declar)) for (const decl of declar.declarations) for (const name of Object.keys(getBindingIdentifiers(decl))) {
              const binding = scope.getBinding(name);
              null == binding || binding.reference(path);
            }
          }
        },
        LabeledStatement(path) {
          path.scope.getBlockParent().registerDeclaration(path);
        },
        AssignmentExpression(path, state) {
          state.assignments.push(path);
        },
        UpdateExpression(path, state) {
          state.constantViolations.push(path);
        },
        UnaryExpression(path, state) {
          "delete" === path.node.operator && state.constantViolations.push(path);
        },
        BlockScoped(path) {
          let scope = path.scope;
          scope.path === path && (scope = scope.parent);
          if (scope.getBlockParent().registerDeclaration(path), path.isClassDeclaration() && path.node.id) {
            const name = path.node.id.name;
            path.scope.bindings[name] = path.scope.parent.getBinding(name);
          }
        },
        CatchClause(path) {
          path.scope.registerBinding("let", path);
        },
        Function(path) {
          const params = path.get("params");
          for (const param of params) path.scope.registerBinding("param", param);
          path.isFunctionExpression() && path.has("id") && !path.get("id").node[NOT_LOCAL_BINDING] && path.scope.registerBinding("local", path.get("id"), path);
        },
        ClassExpression(path) {
          path.has("id") && !path.get("id").node[NOT_LOCAL_BINDING] && path.scope.registerBinding("local", path);
        }
      };
      let uid = 0;
      class Scope {
        constructor(path) {
          this.uid = void 0, this.path = void 0, this.block = void 0, this.labels = void 0, 
          this.inited = void 0, this.bindings = void 0, this.references = void 0, this.globals = void 0, 
          this.uids = void 0, this.data = void 0, this.crawling = void 0;
          const {node} = path, cached = _cache.scope.get(node);
          if ((null == cached ? void 0 : cached.path) === path) return cached;
          _cache.scope.set(node, this), this.uid = uid++, this.block = node, this.path = path, 
          this.labels = new Map, this.inited = !1;
        }
        get parent() {
          var _parent;
          let parent, path = this.path;
          do {
            const isKey = "key" === path.key;
            path = path.parentPath, isKey && path.isMethod() && (path = path.parentPath), path && path.isScope() && (parent = path);
          } while (path && !parent);
          return null == (_parent = parent) ? void 0 : _parent.scope;
        }
        get parentBlock() {
          return this.path.parent;
        }
        get hub() {
          return this.path.hub;
        }
        traverse(node, opts, state) {
          (0, _index.default)(node, opts, this, state, this.path);
        }
        generateDeclaredUidIdentifier(name) {
          const id = this.generateUidIdentifier(name);
          return this.push({
            id
          }), cloneNode(id);
        }
        generateUidIdentifier(name) {
          return identifier(this.generateUid(name));
        }
        generateUid(name = "temp") {
          let uid;
          name = toIdentifier(name).replace(/^_+/, "").replace(/[0-9]+$/g, "");
          let i = 1;
          do {
            uid = this._generateUid(name, i), i++;
          } while (this.hasLabel(uid) || this.hasBinding(uid) || this.hasGlobal(uid) || this.hasReference(uid));
          const program = this.getProgramParent();
          return program.references[uid] = !0, program.uids[uid] = !0, uid;
        }
        _generateUid(name, i) {
          let id = name;
          return i > 1 && (id += i), `_${id}`;
        }
        generateUidBasedOnNode(node, defaultName) {
          const parts = [];
          gatherNodeParts(node, parts);
          let id = parts.join("$");
          return id = id.replace(/^_/, "") || defaultName || "ref", this.generateUid(id.slice(0, 20));
        }
        generateUidIdentifierBasedOnNode(node, defaultName) {
          return identifier(this.generateUidBasedOnNode(node, defaultName));
        }
        isStatic(node) {
          if (isThisExpression(node) || isSuper(node) || isTopicReference(node)) return !0;
          if (isIdentifier(node)) {
            const binding = this.getBinding(node.name);
            return binding ? binding.constant : this.hasBinding(node.name);
          }
          return !1;
        }
        maybeGenerateMemoised(node, dontPush) {
          if (this.isStatic(node)) return null;
          {
            const id = this.generateUidIdentifierBasedOnNode(node);
            return dontPush ? id : (this.push({
              id
            }), cloneNode(id));
          }
        }
        checkBlockScopedCollisions(local, kind, name, id) {
          if ("param" === kind) return;
          if ("local" === local.kind) return;
          if ("let" === kind || "let" === local.kind || "const" === local.kind || "module" === local.kind || "param" === local.kind && "const" === kind) throw this.hub.buildError(id, `Duplicate declaration "${name}"`, TypeError);
        }
        rename(oldName, newName, block) {
          const binding = this.getBinding(oldName);
          if (binding) return newName = newName || this.generateUidIdentifier(oldName).name, 
          new _renamer.default(binding, oldName, newName).rename(block);
        }
        _renameFromMap(map, oldName, newName, value) {
          map[oldName] && (map[newName] = value, map[oldName] = null);
        }
        dump() {
          const sep = "-".repeat(60);
          console.log(sep);
          let scope = this;
          do {
            console.log("#", scope.block.type);
            for (const name of Object.keys(scope.bindings)) {
              const binding = scope.bindings[name];
              console.log(" -", name, {
                constant: binding.constant,
                references: binding.references,
                violations: binding.constantViolations.length,
                kind: binding.kind
              });
            }
          } while (scope = scope.parent);
          console.log(sep);
        }
        toArray(node, i, arrayLikeIsIterable) {
          if (isIdentifier(node)) {
            const binding = this.getBinding(node.name);
            if (null != binding && binding.constant && binding.path.isGenericType("Array")) return node;
          }
          if (isArrayExpression(node)) return node;
          if (isIdentifier(node, {
            name: "arguments"
          })) return callExpression(memberExpression(memberExpression(memberExpression(identifier("Array"), identifier("prototype")), identifier("slice")), identifier("call")), [ node ]);
          let helperName;
          const args = [ node ];
          return !0 === i ? helperName = "toConsumableArray" : i ? (args.push(numericLiteral(i)), 
          helperName = "slicedToArray") : helperName = "toArray", arrayLikeIsIterable && (args.unshift(this.hub.addHelper(helperName)), 
          helperName = "maybeArrayLike"), callExpression(this.hub.addHelper(helperName), args);
        }
        hasLabel(name) {
          return !!this.getLabel(name);
        }
        getLabel(name) {
          return this.labels.get(name);
        }
        registerLabel(path) {
          this.labels.set(path.node.label.name, path);
        }
        registerDeclaration(path) {
          if (path.isLabeledStatement()) this.registerLabel(path); else if (path.isFunctionDeclaration()) this.registerBinding("hoisted", path.get("id"), path); else if (path.isVariableDeclaration()) {
            const declarations = path.get("declarations");
            for (const declar of declarations) this.registerBinding(path.node.kind, declar);
          } else if (path.isClassDeclaration()) {
            if (path.node.declare) return;
            this.registerBinding("let", path);
          } else if (path.isImportDeclaration()) {
            const specifiers = path.get("specifiers");
            for (const specifier of specifiers) this.registerBinding("module", specifier);
          } else if (path.isExportDeclaration()) {
            const declar = path.get("declaration");
            (declar.isClassDeclaration() || declar.isFunctionDeclaration() || declar.isVariableDeclaration()) && this.registerDeclaration(declar);
          } else this.registerBinding("unknown", path);
        }
        buildUndefinedNode() {
          return unaryExpression("void", numericLiteral(0), !0);
        }
        registerConstantViolation(path) {
          const ids = path.getBindingIdentifiers();
          for (const name of Object.keys(ids)) {
            const binding = this.getBinding(name);
            binding && binding.reassign(path);
          }
        }
        registerBinding(kind, path, bindingPath = path) {
          if (!kind) throw new ReferenceError("no `kind`");
          if (path.isVariableDeclaration()) {
            const declarators = path.get("declarations");
            for (const declar of declarators) this.registerBinding(kind, declar);
            return;
          }
          const parent = this.getProgramParent(), ids = path.getOuterBindingIdentifiers(!0);
          for (const name of Object.keys(ids)) {
            parent.references[name] = !0;
            for (const id of ids[name]) {
              const local = this.getOwnBinding(name);
              if (local) {
                if (local.identifier === id) continue;
                this.checkBlockScopedCollisions(local, kind, name, id);
              }
              local ? this.registerConstantViolation(bindingPath) : this.bindings[name] = new _binding.default({
                identifier: id,
                scope: this,
                path: bindingPath,
                kind
              });
            }
          }
        }
        addGlobal(node) {
          this.globals[node.name] = node;
        }
        hasUid(name) {
          let scope = this;
          do {
            if (scope.uids[name]) return !0;
          } while (scope = scope.parent);
          return !1;
        }
        hasGlobal(name) {
          let scope = this;
          do {
            if (scope.globals[name]) return !0;
          } while (scope = scope.parent);
          return !1;
        }
        hasReference(name) {
          return !!this.getProgramParent().references[name];
        }
        isPure(node, constantsOnly) {
          if (isIdentifier(node)) {
            const binding = this.getBinding(node.name);
            return !!binding && (!constantsOnly || binding.constant);
          }
          if (isThisExpression(node) || isMetaProperty(node) || isTopicReference(node) || isPrivateName(node)) return !0;
          var _node$decorators, _node$decorators2, _node$decorators3;
          if (isClass(node)) return !(node.superClass && !this.isPure(node.superClass, constantsOnly)) && (!((null == (_node$decorators = node.decorators) ? void 0 : _node$decorators.length) > 0) && this.isPure(node.body, constantsOnly));
          if (isClassBody(node)) {
            for (const method of node.body) if (!this.isPure(method, constantsOnly)) return !1;
            return !0;
          }
          if (isBinary(node)) return this.isPure(node.left, constantsOnly) && this.isPure(node.right, constantsOnly);
          if (isArrayExpression(node) || isTupleExpression(node)) {
            for (const elem of node.elements) if (null !== elem && !this.isPure(elem, constantsOnly)) return !1;
            return !0;
          }
          if (isObjectExpression(node) || isRecordExpression(node)) {
            for (const prop of node.properties) if (!this.isPure(prop, constantsOnly)) return !1;
            return !0;
          }
          if (isMethod(node)) return !(node.computed && !this.isPure(node.key, constantsOnly)) && !((null == (_node$decorators2 = node.decorators) ? void 0 : _node$decorators2.length) > 0);
          if (isProperty(node)) return !(node.computed && !this.isPure(node.key, constantsOnly)) && (!((null == (_node$decorators3 = node.decorators) ? void 0 : _node$decorators3.length) > 0) && !((isObjectProperty(node) || node.static) && null !== node.value && !this.isPure(node.value, constantsOnly)));
          if (isUnaryExpression(node)) return this.isPure(node.argument, constantsOnly);
          if (isTaggedTemplateExpression(node)) return matchesPattern(node.tag, "String.raw") && !this.hasBinding("String", !0) && this.isPure(node.quasi, constantsOnly);
          if (isTemplateLiteral(node)) {
            for (const expression of node.expressions) if (!this.isPure(expression, constantsOnly)) return !1;
            return !0;
          }
          return isPureish(node);
        }
        setData(key, val) {
          return this.data[key] = val;
        }
        getData(key) {
          let scope = this;
          do {
            const data = scope.data[key];
            if (null != data) return data;
          } while (scope = scope.parent);
        }
        removeData(key) {
          let scope = this;
          do {
            null != scope.data[key] && (scope.data[key] = null);
          } while (scope = scope.parent);
        }
        init() {
          this.inited || (this.inited = !0, this.crawl());
        }
        crawl() {
          const path = this.path;
          this.references = Object.create(null), this.bindings = Object.create(null), this.globals = Object.create(null), 
          this.uids = Object.create(null), this.data = Object.create(null);
          const programParent = this.getProgramParent();
          if (programParent.crawling) return;
          const state = {
            references: [],
            constantViolations: [],
            assignments: []
          };
          if (this.crawling = !0, "Program" !== path.type && collectorVisitor._exploded) {
            for (const visit of collectorVisitor.enter) visit(path, state);
            const typeVisitors = collectorVisitor[path.type];
            if (typeVisitors) for (const visit of typeVisitors.enter) visit(path, state);
          }
          path.traverse(collectorVisitor, state), this.crawling = !1;
          for (const path of state.assignments) {
            const ids = path.getBindingIdentifiers();
            for (const name of Object.keys(ids)) path.scope.getBinding(name) || programParent.addGlobal(ids[name]);
            path.scope.registerConstantViolation(path);
          }
          for (const ref of state.references) {
            const binding = ref.scope.getBinding(ref.node.name);
            binding ? binding.reference(ref) : programParent.addGlobal(ref.node);
          }
          for (const path of state.constantViolations) path.scope.registerConstantViolation(path);
        }
        push(opts) {
          let path = this.path;
          path.isBlockStatement() || path.isProgram() || (path = this.getBlockParent().path), 
          path.isSwitchStatement() && (path = (this.getFunctionParent() || this.getProgramParent()).path), 
          (path.isLoop() || path.isCatchClause() || path.isFunction()) && (path.ensureBlock(), 
          path = path.get("body"));
          const unique = opts.unique, kind = opts.kind || "var", blockHoist = null == opts._blockHoist ? 2 : opts._blockHoist, dataKey = `declaration:${kind}:${blockHoist}`;
          let declarPath = !unique && path.getData(dataKey);
          if (!declarPath) {
            const declar = variableDeclaration(kind, []);
            declar._blockHoist = blockHoist, [declarPath] = path.unshiftContainer("body", [ declar ]), 
            unique || path.setData(dataKey, declarPath);
          }
          const declarator = variableDeclarator(opts.id, opts.init), len = declarPath.node.declarations.push(declarator);
          path.scope.registerBinding(kind, declarPath.get("declarations")[len - 1]);
        }
        getProgramParent() {
          let scope = this;
          do {
            if (scope.path.isProgram()) return scope;
          } while (scope = scope.parent);
          throw new Error("Couldn't find a Program");
        }
        getFunctionParent() {
          let scope = this;
          do {
            if (scope.path.isFunctionParent()) return scope;
          } while (scope = scope.parent);
          return null;
        }
        getBlockParent() {
          let scope = this;
          do {
            if (scope.path.isBlockParent()) return scope;
          } while (scope = scope.parent);
          throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...");
        }
        getAllBindings() {
          const ids = Object.create(null);
          let scope = this;
          do {
            for (const key of Object.keys(scope.bindings)) key in ids == !1 && (ids[key] = scope.bindings[key]);
            scope = scope.parent;
          } while (scope);
          return ids;
        }
        getAllBindingsOfKind(...kinds) {
          const ids = Object.create(null);
          for (const kind of kinds) {
            let scope = this;
            do {
              for (const name of Object.keys(scope.bindings)) {
                const binding = scope.bindings[name];
                binding.kind === kind && (ids[name] = binding);
              }
              scope = scope.parent;
            } while (scope);
          }
          return ids;
        }
        bindingIdentifierEquals(name, node) {
          return this.getBindingIdentifier(name) === node;
        }
        getBinding(name) {
          let previousPath, scope = this;
          do {
            const binding = scope.getOwnBinding(name);
            var _previousPath;
            if (binding) {
              if (null == (_previousPath = previousPath) || !_previousPath.isPattern() || "param" === binding.kind || "local" === binding.kind) return binding;
            } else if (!binding && "arguments" === name && scope.path.isFunction() && !scope.path.isArrowFunctionExpression()) break;
            previousPath = scope.path;
          } while (scope = scope.parent);
        }
        getOwnBinding(name) {
          return this.bindings[name];
        }
        getBindingIdentifier(name) {
          var _this$getBinding;
          return null == (_this$getBinding = this.getBinding(name)) ? void 0 : _this$getBinding.identifier;
        }
        getOwnBindingIdentifier(name) {
          const binding = this.bindings[name];
          return null == binding ? void 0 : binding.identifier;
        }
        hasOwnBinding(name) {
          return !!this.getOwnBinding(name);
        }
        hasBinding(name, noGlobals) {
          return !!name && (!!this.hasOwnBinding(name) || (!!this.parentHasBinding(name, noGlobals) || (!!this.hasUid(name) || (!(noGlobals || !Scope.globals.includes(name)) || !(noGlobals || !Scope.contextVariables.includes(name))))));
        }
        parentHasBinding(name, noGlobals) {
          var _this$parent;
          return null == (_this$parent = this.parent) ? void 0 : _this$parent.hasBinding(name, noGlobals);
        }
        moveBindingTo(name, scope) {
          const info = this.getBinding(name);
          info && (info.scope.removeOwnBinding(name), info.scope = scope, scope.bindings[name] = info);
        }
        removeOwnBinding(name) {
          delete this.bindings[name];
        }
        removeBinding(name) {
          var _this$getBinding2;
          null == (_this$getBinding2 = this.getBinding(name)) || _this$getBinding2.scope.removeOwnBinding(name);
          let scope = this;
          do {
            scope.uids[name] && (scope.uids[name] = !1);
          } while (scope = scope.parent);
        }
      }
      exports.default = Scope, Scope.globals = Object.keys(_globals.builtin), Scope.contextVariables = [ "arguments", "undefined", "Infinity", "NaN" ];
    },
    1669: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      __webpack_require__(8287);
      var _helperSplitExportDeclaration = __webpack_require__(4170), _t = __webpack_require__(7289);
      const {VISITOR_KEYS, assignmentExpression, identifier, toExpression, variableDeclaration, variableDeclarator} = _t, renameVisitor = {
        ReferencedIdentifier({node}, state) {
          node.name === state.oldName && (node.name = state.newName);
        },
        Scope(path, state) {
          path.scope.bindingIdentifierEquals(state.oldName, state.binding.identifier) || function(path) {
            if (!path.isMethod() || !path.node.computed) return void path.skip();
            const keys = VISITOR_KEYS[path.type];
            for (const key of keys) "key" !== key && path.skipKey(key);
          }(path);
        },
        "AssignmentExpression|Declaration|VariableDeclarator"(path, state) {
          if (path.isVariableDeclaration()) return;
          const ids = path.getOuterBindingIdentifiers();
          for (const name in ids) name === state.oldName && (ids[name].name = state.newName);
        }
      };
      exports.default = class {
        constructor(binding, oldName, newName) {
          this.newName = newName, this.oldName = oldName, this.binding = binding;
        }
        maybeConvertFromExportDeclaration(parentDeclar) {
          const maybeExportDeclar = parentDeclar.parentPath;
          maybeExportDeclar.isExportDeclaration() && (maybeExportDeclar.isExportDefaultDeclaration() && !maybeExportDeclar.get("declaration").node.id || (0, 
          _helperSplitExportDeclaration.default)(maybeExportDeclar));
        }
        maybeConvertFromClassFunctionDeclaration(path) {}
        maybeConvertFromClassFunctionExpression(path) {}
        rename(block) {
          const {binding, oldName, newName} = this, {scope, path} = binding, parentDeclar = path.find((path => path.isDeclaration() || path.isFunctionExpression() || path.isClassExpression()));
          if (parentDeclar) {
            parentDeclar.getOuterBindingIdentifiers()[oldName] === binding.identifier && this.maybeConvertFromExportDeclaration(parentDeclar);
          }
          const blockToTraverse = block || scope.block;
          "SwitchStatement" === (null == blockToTraverse ? void 0 : blockToTraverse.type) ? blockToTraverse.cases.forEach((c => {
            scope.traverse(c, renameVisitor, this);
          })) : scope.traverse(blockToTraverse, renameVisitor, this), block || (scope.removeOwnBinding(oldName), 
          scope.bindings[newName] = binding, this.binding.identifier.name = newName), parentDeclar && (this.maybeConvertFromClassFunctionDeclaration(parentDeclar), 
          this.maybeConvertFromClassFunctionExpression(parentDeclar));
        }
      };
    },
    6033: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.traverseNode = function(node, opts, scope, state, path, skipKeys) {
        const keys = VISITOR_KEYS[node.type];
        if (!keys) return !1;
        const context = new _context.default(scope, opts, state, path);
        for (const key of keys) if ((!skipKeys || !skipKeys[key]) && context.visit(node, key)) return !0;
        return !1;
      };
      var _context = __webpack_require__(6617), _t = __webpack_require__(7289);
      const {VISITOR_KEYS} = _t;
    },
    1169: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.explode = explode, exports.merge = function(visitors, states = [], wrapper) {
        const rootVisitor = {};
        for (let i = 0; i < visitors.length; i++) {
          const visitor = visitors[i], state = states[i];
          explode(visitor);
          for (const type of Object.keys(visitor)) {
            let visitorType = visitor[type];
            (state || wrapper) && (visitorType = wrapWithStateOrWrapper(visitorType, state, wrapper));
            mergePair(rootVisitor[type] = rootVisitor[type] || {}, visitorType);
          }
        }
        return rootVisitor;
      }, exports.verify = verify;
      var virtualTypes = __webpack_require__(4387), _t = __webpack_require__(7289);
      const {DEPRECATED_KEYS, FLIPPED_ALIAS_KEYS, TYPES} = _t;
      function explode(visitor) {
        if (visitor._exploded) return visitor;
        visitor._exploded = !0;
        for (const nodeType of Object.keys(visitor)) {
          if (shouldIgnoreKey(nodeType)) continue;
          const parts = nodeType.split("|");
          if (1 === parts.length) continue;
          const fns = visitor[nodeType];
          delete visitor[nodeType];
          for (const part of parts) visitor[part] = fns;
        }
        verify(visitor), delete visitor.__esModule, function(obj) {
          for (const key of Object.keys(obj)) {
            if (shouldIgnoreKey(key)) continue;
            const fns = obj[key];
            "function" == typeof fns && (obj[key] = {
              enter: fns
            });
          }
        }(visitor), ensureCallbackArrays(visitor);
        for (const nodeType of Object.keys(visitor)) {
          if (shouldIgnoreKey(nodeType)) continue;
          const wrapper = virtualTypes[nodeType];
          if (!wrapper) continue;
          const fns = visitor[nodeType];
          for (const type of Object.keys(fns)) fns[type] = wrapCheck(wrapper, fns[type]);
          if (delete visitor[nodeType], wrapper.types) for (const type of wrapper.types) visitor[type] ? mergePair(visitor[type], fns) : visitor[type] = fns; else mergePair(visitor, fns);
        }
        for (const nodeType of Object.keys(visitor)) {
          if (shouldIgnoreKey(nodeType)) continue;
          const fns = visitor[nodeType];
          let aliases = FLIPPED_ALIAS_KEYS[nodeType];
          const deprecatedKey = DEPRECATED_KEYS[nodeType];
          if (deprecatedKey && (console.trace(`Visitor defined for ${nodeType} but it has been renamed to ${deprecatedKey}`), 
          aliases = [ deprecatedKey ]), aliases) {
            delete visitor[nodeType];
            for (const alias of aliases) {
              const existing = visitor[alias];
              existing ? mergePair(existing, fns) : visitor[alias] = Object.assign({}, fns);
            }
          }
        }
        for (const nodeType of Object.keys(visitor)) shouldIgnoreKey(nodeType) || ensureCallbackArrays(visitor[nodeType]);
        return visitor;
      }
      function verify(visitor) {
        if (!visitor._verified) {
          if ("function" == typeof visitor) throw new Error("You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?");
          for (const nodeType of Object.keys(visitor)) {
            if ("enter" !== nodeType && "exit" !== nodeType || validateVisitorMethods(nodeType, visitor[nodeType]), 
            shouldIgnoreKey(nodeType)) continue;
            if (TYPES.indexOf(nodeType) < 0) throw new Error(`You gave us a visitor for the node type ${nodeType} but it's not a valid type`);
            const visitors = visitor[nodeType];
            if ("object" == typeof visitors) for (const visitorKey of Object.keys(visitors)) {
              if ("enter" !== visitorKey && "exit" !== visitorKey) throw new Error(`You passed \`traverse()\` a visitor object with the property ${nodeType} that has the invalid property ${visitorKey}`);
              validateVisitorMethods(`${nodeType}.${visitorKey}`, visitors[visitorKey]);
            }
          }
          visitor._verified = !0;
        }
      }
      function validateVisitorMethods(path, val) {
        const fns = [].concat(val);
        for (const fn of fns) if ("function" != typeof fn) throw new TypeError(`Non-function found defined in ${path} with type ${typeof fn}`);
      }
      function wrapWithStateOrWrapper(oldVisitor, state, wrapper) {
        const newVisitor = {};
        for (const key of Object.keys(oldVisitor)) {
          let fns = oldVisitor[key];
          Array.isArray(fns) && (fns = fns.map((function(fn) {
            let newFn = fn;
            return state && (newFn = function(path) {
              return fn.call(state, path, state);
            }), wrapper && (newFn = wrapper(state.key, key, newFn)), newFn !== fn && (newFn.toString = () => fn.toString()), 
            newFn;
          })), newVisitor[key] = fns);
        }
        return newVisitor;
      }
      function ensureCallbackArrays(obj) {
        obj.enter && !Array.isArray(obj.enter) && (obj.enter = [ obj.enter ]), obj.exit && !Array.isArray(obj.exit) && (obj.exit = [ obj.exit ]);
      }
      function wrapCheck(wrapper, fn) {
        const newFn = function(path) {
          if (wrapper.checkPath(path)) return fn.apply(this, arguments);
        };
        return newFn.toString = () => fn.toString(), newFn;
      }
      function shouldIgnoreKey(key) {
        return "_" === key[0] || ("enter" === key || "exit" === key || "shouldSkip" === key || ("denylist" === key || "noScope" === key || "skipKeys" === key || "blacklist" === key));
      }
      function mergePair(dest, src) {
        for (const key of Object.keys(src)) dest[key] = [].concat(dest[key] || [], src[key]);
      }
    },
    2509: function(__unused_webpack_module, exports, __webpack_require__) {
      !function(exports, setArray, sourcemapCodec) {
        "use strict";
        exports.addSegment = void 0, exports.addMapping = void 0, exports.setSourceContent = void 0, 
        exports.decodedMap = void 0, exports.encodedMap = void 0, exports.allMappings = void 0;
        class GenMapping {
          constructor({file, sourceRoot} = {}) {
            this._names = new setArray.SetArray, this._sources = new setArray.SetArray, this._sourcesContent = [], 
            this._mappings = [], this.file = file, this.sourceRoot = sourceRoot;
          }
        }
        function getLine(mappings, index) {
          for (let i = mappings.length; i <= index; i++) mappings[i] = [];
          return mappings[index];
        }
        function getColumnIndex(line, column, seg) {
          let index = line.length;
          for (let i = index - 1; i >= 0; i--, index--) {
            const current = line[i], col = current[0];
            if (col > column) continue;
            if (col < column) break;
            const cmp = compare(current, seg);
            if (0 === cmp) return index;
            if (cmp < 0) break;
          }
          return index;
        }
        function compare(a, b) {
          let cmp = compareNum(a.length, b.length);
          return 0 !== cmp ? cmp : 1 === a.length ? 0 : (cmp = compareNum(a[1], b[1]), 0 !== cmp ? cmp : (cmp = compareNum(a[2], b[2]), 
          0 !== cmp ? cmp : (cmp = compareNum(a[3], b[3]), 0 !== cmp ? cmp : 4 === a.length ? 0 : compareNum(a[4], b[4]))));
        }
        function compareNum(a, b) {
          return a - b;
        }
        function insert(array, index, value) {
          if (-1 !== index) {
            for (let i = array.length; i > index; i--) array[i] = array[i - 1];
            array[index] = value;
          }
        }
        exports.addSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name) => {
          const {_mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names} = map, line = getLine(mappings, genLine);
          if (null == source) {
            const seg = [ genColumn ];
            return insert(line, getColumnIndex(line, genColumn, seg), seg);
          }
          const sourcesIndex = setArray.put(sources, source), seg = name ? [ genColumn, sourcesIndex, sourceLine, sourceColumn, setArray.put(names, name) ] : [ genColumn, sourcesIndex, sourceLine, sourceColumn ], index = getColumnIndex(line, genColumn, seg);
          sourcesIndex === sourcesContent.length && (sourcesContent[sourcesIndex] = null), 
          insert(line, index, seg);
        }, exports.addMapping = (map, mapping) => {
          const {generated, source, original, name} = mapping;
          return exports.addSegment(map, generated.line - 1, generated.column, source, null == original ? void 0 : original.line - 1, null == original ? void 0 : original.column, name);
        }, exports.setSourceContent = (map, source, content) => {
          const {_sources: sources, _sourcesContent: sourcesContent} = map;
          sourcesContent[setArray.put(sources, source)] = content;
        }, exports.decodedMap = map => {
          const {file, sourceRoot, _mappings: mappings, _sources: sources, _sourcesContent: sourcesContent, _names: names} = map;
          return {
            version: 3,
            file,
            names: names.array,
            sourceRoot: sourceRoot || void 0,
            sources: sources.array,
            sourcesContent,
            mappings
          };
        }, exports.encodedMap = map => {
          const decoded = exports.decodedMap(map);
          return Object.assign(Object.assign({}, decoded), {
            mappings: sourcemapCodec.encode(decoded.mappings)
          });
        }, exports.allMappings = map => {
          const out = [], {_mappings: mappings, _sources: sources, _names: names} = map;
          for (let i = 0; i < mappings.length; i++) {
            const line = mappings[i];
            for (let j = 0; j < line.length; j++) {
              const seg = line[j], generated = {
                line: i + 1,
                column: seg[0]
              };
              let source, original, name;
              1 !== seg.length && (source = sources.array[seg[1]], original = {
                line: seg[2] + 1,
                column: seg[3]
              }, 5 === seg.length && (name = names.array[seg[4]])), out.push({
                generated,
                source,
                original,
                name
              });
            }
          }
          return out;
        }, exports.GenMapping = GenMapping, Object.defineProperty(exports, "__esModule", {
          value: !0
        });
      }(exports, __webpack_require__(2208), __webpack_require__(2297));
    },
    2208: function(__unused_webpack_module, exports) {
      !function(exports) {
        "use strict";
        exports.get = void 0, exports.put = void 0, exports.pop = void 0;
        class SetArray {
          constructor() {
            this._indexes = {
              __proto__: null
            }, this.array = [];
          }
        }
        exports.get = (strarr, key) => strarr._indexes[key], exports.put = (strarr, key) => {
          const index = exports.get(strarr, key);
          if (void 0 !== index) return index;
          const {array, _indexes: indexes} = strarr;
          return indexes[key] = array.push(key) - 1;
        }, exports.pop = strarr => {
          const {array, _indexes: indexes} = strarr;
          0 !== array.length && (indexes[array.pop()] = void 0);
        }, exports.SetArray = SetArray, Object.defineProperty(exports, "__esModule", {
          value: !0
        });
      }(exports);
    },
    2297: function(__unused_webpack_module, exports) {
      !function(exports) {
        "use strict";
        const comma = ",".charCodeAt(0), semicolon = ";".charCodeAt(0), chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", intToChar = new Uint8Array(64), charToInt = new Uint8Array(128);
        for (let i = 0; i < chars.length; i++) {
          const c = chars.charCodeAt(i);
          intToChar[i] = c, charToInt[c] = i;
        }
        const td = "undefined" != typeof TextDecoder ? new TextDecoder : "undefined" != typeof Buffer ? {
          decode: buf => Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString()
        } : {
          decode(buf) {
            let out = "";
            for (let i = 0; i < buf.length; i++) out += String.fromCharCode(buf[i]);
            return out;
          }
        };
        function decode(mappings) {
          const state = new Int32Array(5), decoded = [];
          let index = 0;
          do {
            const semi = indexOf(mappings, index), line = [];
            let sorted = !0, lastCol = 0;
            state[0] = 0;
            for (let i = index; i < semi; i++) {
              let seg;
              i = decodeInteger(mappings, i, state, 0);
              const col = state[0];
              col < lastCol && (sorted = !1), lastCol = col, hasMoreVlq(mappings, i, semi) ? (i = decodeInteger(mappings, i, state, 1), 
              i = decodeInteger(mappings, i, state, 2), i = decodeInteger(mappings, i, state, 3), 
              hasMoreVlq(mappings, i, semi) ? (i = decodeInteger(mappings, i, state, 4), seg = [ col, state[1], state[2], state[3], state[4] ]) : seg = [ col, state[1], state[2], state[3] ]) : seg = [ col ], 
              line.push(seg);
            }
            sorted || sort(line), decoded.push(line), index = semi + 1;
          } while (index <= mappings.length);
          return decoded;
        }
        function indexOf(mappings, index) {
          const idx = mappings.indexOf(";", index);
          return -1 === idx ? mappings.length : idx;
        }
        function decodeInteger(mappings, pos, state, j) {
          let value = 0, shift = 0, integer = 0;
          do {
            const c = mappings.charCodeAt(pos++);
            integer = charToInt[c], value |= (31 & integer) << shift, shift += 5;
          } while (32 & integer);
          const shouldNegate = 1 & value;
          return value >>>= 1, shouldNegate && (value = -2147483648 | -value), state[j] += value, 
          pos;
        }
        function hasMoreVlq(mappings, i, length) {
          return !(i >= length) && mappings.charCodeAt(i) !== comma;
        }
        function sort(line) {
          line.sort(sortComparator);
        }
        function sortComparator(a, b) {
          return a[0] - b[0];
        }
        function encode(decoded) {
          const state = new Int32Array(5), bufLength = 16384, subLength = bufLength - 36, buf = new Uint8Array(bufLength), sub = buf.subarray(0, subLength);
          let pos = 0, out = "";
          for (let i = 0; i < decoded.length; i++) {
            const line = decoded[i];
            if (i > 0 && (pos === bufLength && (out += td.decode(buf), pos = 0), buf[pos++] = semicolon), 
            0 !== line.length) {
              state[0] = 0;
              for (let j = 0; j < line.length; j++) {
                const segment = line[j];
                pos > subLength && (out += td.decode(sub), buf.copyWithin(0, subLength, pos), pos -= subLength), 
                j > 0 && (buf[pos++] = comma), pos = encodeInteger(buf, pos, state, segment, 0), 
                1 !== segment.length && (pos = encodeInteger(buf, pos, state, segment, 1), pos = encodeInteger(buf, pos, state, segment, 2), 
                pos = encodeInteger(buf, pos, state, segment, 3), 4 !== segment.length && (pos = encodeInteger(buf, pos, state, segment, 4)));
              }
            }
          }
          return out + td.decode(buf.subarray(0, pos));
        }
        function encodeInteger(buf, pos, state, segment, j) {
          const next = segment[j];
          let num = next - state[j];
          state[j] = next, num = num < 0 ? -num << 1 | 1 : num << 1;
          do {
            let clamped = 31 & num;
            num >>>= 5, num > 0 && (clamped |= 32), buf[pos++] = intToChar[clamped];
          } while (num > 0);
          return pos;
        }
        exports.decode = decode, exports.encode = encode, Object.defineProperty(exports, "__esModule", {
          value: !0
        });
      }(exports);
    },
    1227: (module, exports, __webpack_require__) => {
      exports.formatArgs = function(args) {
        if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), 
        !this.useColors) return;
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0, lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match => {
          "%%" !== match && (index++, "%c" === match && (lastC = index));
        })), args.splice(lastC, 0, c);
      }, exports.save = function(namespaces) {
        try {
          namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
        } catch (error) {}
      }, exports.load = function() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {}
        !r && "undefined" != typeof process && "env" in process && (r = process.env.DEBUG);
        return r;
      }, exports.useColors = function() {
        if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
        if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
        return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }, exports.storage = function() {
        try {
          return localStorage;
        } catch (error) {}
      }(), exports.destroy = (() => {
        let warned = !1;
        return () => {
          warned || (warned = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
        };
      })(), exports.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
      exports.log = console.debug || console.log || (() => {}), module.exports = __webpack_require__(2447)(exports);
      const {formatters} = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    },
    2447: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = function(env) {
        function createDebug(namespace) {
          let prevTime, namespacesCache, enabledCache, enableOverride = null;
          function debug(...args) {
            if (!debug.enabled) return;
            const self = debug, curr = Number(new Date), ms = curr - (prevTime || curr);
            self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), 
            "string" != typeof args[0] && args.unshift("%O");
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, ((match, format) => {
              if ("%%" === match) return "%";
              index++;
              const formatter = createDebug.formatters[format];
              if ("function" == typeof formatter) {
                const val = args[index];
                match = formatter.call(self, val), args.splice(index, 1), index--;
              }
              return match;
            })), createDebug.formatArgs.call(self, args);
            (self.log || createDebug.log).apply(self, args);
          }
          return debug.namespace = namespace, debug.useColors = createDebug.useColors(), debug.color = createDebug.selectColor(namespace), 
          debug.extend = extend, debug.destroy = createDebug.destroy, Object.defineProperty(debug, "enabled", {
            enumerable: !0,
            configurable: !1,
            get: () => null !== enableOverride ? enableOverride : (namespacesCache !== createDebug.namespaces && (namespacesCache = createDebug.namespaces, 
            enabledCache = createDebug.enabled(namespace)), enabledCache),
            set: v => {
              enableOverride = v;
            }
          }), "function" == typeof createDebug.init && createDebug.init(debug), debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (void 0 === delimiter ? ":" : delimiter) + namespace);
          return newDebug.log = this.log, newDebug;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        return createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = function(val) {
          if (val instanceof Error) return val.stack || val.message;
          return val;
        }, createDebug.disable = function() {
          const namespaces = [ ...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map((namespace => "-" + namespace)) ].join(",");
          return createDebug.enable(""), namespaces;
        }, createDebug.enable = function(namespaces) {
          let i;
          createDebug.save(namespaces), createDebug.namespaces = namespaces, createDebug.names = [], 
          createDebug.skips = [];
          const split = ("string" == typeof namespaces ? namespaces : "").split(/[\s,]+/), len = split.length;
          for (i = 0; i < len; i++) split[i] && ("-" === (namespaces = split[i].replace(/\*/g, ".*?"))[0] ? createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$")) : createDebug.names.push(new RegExp("^" + namespaces + "$")));
        }, createDebug.enabled = function(name) {
          if ("*" === name[name.length - 1]) return !0;
          let i, len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) if (createDebug.skips[i].test(name)) return !1;
          for (i = 0, len = createDebug.names.length; i < len; i++) if (createDebug.names[i].test(name)) return !0;
          return !1;
        }, createDebug.humanize = __webpack_require__(7824), createDebug.destroy = function() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }, Object.keys(env).forEach((key => {
          createDebug[key] = env[key];
        })), createDebug.names = [], createDebug.skips = [], createDebug.formatters = {}, 
        createDebug.selectColor = function(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) hash = (hash << 5) - hash + namespace.charCodeAt(i), 
          hash |= 0;
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }, createDebug.enable(createDebug.load()), createDebug;
      };
    },
    5158: (module, __unused_webpack_exports, __webpack_require__) => {
      "undefined" == typeof process || "renderer" === process.type || !0 === process.browser || process.__nwjs ? module.exports = __webpack_require__(1227) : module.exports = __webpack_require__(39);
    },
    39: (module, exports, __webpack_require__) => {
      const tty = __webpack_require__(6224), util = __webpack_require__(3837);
      exports.init = function(debug) {
        debug.inspectOpts = {};
        const keys = Object.keys(exports.inspectOpts);
        for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }, exports.log = function(...args) {
        return process.stderr.write(util.format(...args) + "\n");
      }, exports.formatArgs = function(args) {
        const {namespace: name, useColors} = this;
        if (useColors) {
          const c = this.color, colorCode = "[3" + (c < 8 ? c : "8;5;" + c), prefix = `  ${colorCode};1m${name} [0m`;
          args[0] = prefix + args[0].split("\n").join("\n" + prefix), args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "[0m");
        } else args[0] = function() {
          if (exports.inspectOpts.hideDate) return "";
          return (new Date).toISOString() + " ";
        }() + name + " " + args[0];
      }, exports.save = function(namespaces) {
        namespaces ? process.env.DEBUG = namespaces : delete process.env.DEBUG;
      }, exports.load = function() {
        return process.env.DEBUG;
      }, exports.useColors = function() {
        return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }, exports.destroy = util.deprecate((() => {}), "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), 
      exports.colors = [ 6, 2, 3, 4, 5, 1 ];
      try {
        const supportsColor = __webpack_require__(2130);
        supportsColor && (supportsColor.stderr || supportsColor).level >= 2 && (exports.colors = [ 20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221 ]);
      } catch (error) {}
      exports.inspectOpts = Object.keys(process.env).filter((key => /^debug_/i.test(key))).reduce(((obj, key) => {
        const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, ((_, k) => k.toUpperCase()));
        let val = process.env[key];
        return val = !!/^(yes|on|true|enabled)$/i.test(val) || !/^(no|off|false|disabled)$/i.test(val) && ("null" === val ? null : Number(val)), 
        obj[prop] = val, obj;
      }), {}), module.exports = __webpack_require__(2447)(exports);
      const {formatters} = module.exports;
      formatters.o = function(v) {
        return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts).split("\n").map((str => str.trim())).join(" ");
      }, formatters.O = function(v) {
        return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts);
      };
    },
    1272: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = __webpack_require__(8487);
    },
    6560: module => {
      "use strict";
      module.exports = (flag, argv) => {
        argv = argv || process.argv;
        const prefix = flag.startsWith("-") ? "" : 1 === flag.length ? "-" : "--", pos = argv.indexOf(prefix + flag), terminatorPos = argv.indexOf("--");
        return -1 !== pos && (-1 === terminatorPos || pos < terminatorPos);
      };
    },
    6188: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, 
      exports.matchToToken = function(match) {
        var token = {
          type: "invalid",
          value: match[0],
          closed: void 0
        };
        return match[1] ? (token.type = "string", token.closed = !(!match[3] && !match[4])) : match[5] ? token.type = "comment" : match[6] ? (token.type = "comment", 
        token.closed = !!match[7]) : match[8] ? token.type = "regex" : match[9] ? token.type = "number" : match[10] ? token.type = "name" : match[11] ? token.type = "punctuator" : match[12] && (token.type = "whitespace"), 
        token;
      };
    },
    3312: module => {
      "use strict";
      const object = {}, hasOwnProperty = object.hasOwnProperty, forOwn = (object, callback) => {
        for (const key in object) hasOwnProperty.call(object, key) && callback(key, object[key]);
      }, toString = object.toString, isArray = Array.isArray, isBuffer = Buffer.isBuffer, singleEscapes = {
        '"': '\\"',
        "'": "\\'",
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
      }, regexSingleEscape = /["'\\\b\f\n\r\t]/, regexDigit = /[0-9]/, regexWhitelist = /[ !#-&\(-\[\]-_a-~]/, jsesc = (argument, options) => {
        const increaseIndentation = () => {
          oldIndent = indent, ++options.indentLevel, indent = options.indent.repeat(options.indentLevel);
        }, defaults = {
          escapeEverything: !1,
          minimal: !1,
          isScriptContext: !1,
          quotes: "single",
          wrap: !1,
          es6: !1,
          json: !1,
          compact: !0,
          lowercaseHex: !1,
          numbers: "decimal",
          indent: "\t",
          indentLevel: 0,
          __inline1__: !1,
          __inline2__: !1
        }, json = options && options.json;
        var destination, source;
        json && (defaults.quotes = "double", defaults.wrap = !0), destination = defaults, 
        options = (source = options) ? (forOwn(source, ((key, value) => {
          destination[key] = value;
        })), destination) : destination, "single" != options.quotes && "double" != options.quotes && "backtick" != options.quotes && (options.quotes = "single");
        const quote = "double" == options.quotes ? '"' : "backtick" == options.quotes ? "`" : "'", compact = options.compact, lowercaseHex = options.lowercaseHex;
        let indent = options.indent.repeat(options.indentLevel), oldIndent = "";
        const inline1 = options.__inline1__, inline2 = options.__inline2__, newLine = compact ? "" : "\n";
        let result, isEmpty = !0;
        const useBinNumbers = "binary" == options.numbers, useOctNumbers = "octal" == options.numbers, useDecNumbers = "decimal" == options.numbers, useHexNumbers = "hexadecimal" == options.numbers;
        if (json && argument && "function" == typeof argument.toJSON && (argument = argument.toJSON()), 
        !(value => "string" == typeof value || "[object String]" == toString.call(value))(argument)) {
          if ((value => "[object Map]" == toString.call(value))(argument)) return 0 == argument.size ? "new Map()" : (compact || (options.__inline1__ = !0, 
          options.__inline2__ = !1), "new Map(" + jsesc(Array.from(argument), options) + ")");
          if ((value => "[object Set]" == toString.call(value))(argument)) return 0 == argument.size ? "new Set()" : "new Set(" + jsesc(Array.from(argument), options) + ")";
          if (isBuffer(argument)) return 0 == argument.length ? "Buffer.from([])" : "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
          if (isArray(argument)) return result = [], options.wrap = !0, inline1 && (options.__inline1__ = !1, 
          options.__inline2__ = !0), inline2 || increaseIndentation(), ((array, callback) => {
            const length = array.length;
            let index = -1;
            for (;++index < length; ) callback(array[index]);
          })(argument, (value => {
            isEmpty = !1, inline2 && (options.__inline2__ = !1), result.push((compact || inline2 ? "" : indent) + jsesc(value, options));
          })), isEmpty ? "[]" : inline2 ? "[" + result.join(", ") + "]" : "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
          if (!(value => "number" == typeof value || "[object Number]" == toString.call(value))(argument)) return (value => "[object Object]" == toString.call(value))(argument) ? (result = [], 
          options.wrap = !0, increaseIndentation(), forOwn(argument, ((key, value) => {
            isEmpty = !1, result.push((compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options));
          })), isEmpty ? "{}" : "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}") : json ? JSON.stringify(argument) || "null" : String(argument);
          if (json) return JSON.stringify(argument);
          if (useDecNumbers) return String(argument);
          if (useHexNumbers) {
            let hexadecimal = argument.toString(16);
            return lowercaseHex || (hexadecimal = hexadecimal.toUpperCase()), "0x" + hexadecimal;
          }
          if (useBinNumbers) return "0b" + argument.toString(2);
          if (useOctNumbers) return "0o" + argument.toString(8);
        }
        const string = argument;
        let index = -1;
        const length = string.length;
        for (result = ""; ++index < length; ) {
          const character = string.charAt(index);
          if (options.es6) {
            const first = string.charCodeAt(index);
            if (first >= 55296 && first <= 56319 && length > index + 1) {
              const second = string.charCodeAt(index + 1);
              if (second >= 56320 && second <= 57343) {
                let hexadecimal = (1024 * (first - 55296) + second - 56320 + 65536).toString(16);
                lowercaseHex || (hexadecimal = hexadecimal.toUpperCase()), result += "\\u{" + hexadecimal + "}", 
                ++index;
                continue;
              }
            }
          }
          if (!options.escapeEverything) {
            if (regexWhitelist.test(character)) {
              result += character;
              continue;
            }
            if ('"' == character) {
              result += quote == character ? '\\"' : character;
              continue;
            }
            if ("`" == character) {
              result += quote == character ? "\\`" : character;
              continue;
            }
            if ("'" == character) {
              result += quote == character ? "\\'" : character;
              continue;
            }
          }
          if ("\0" == character && !json && !regexDigit.test(string.charAt(index + 1))) {
            result += "\\0";
            continue;
          }
          if (regexSingleEscape.test(character)) {
            result += singleEscapes[character];
            continue;
          }
          const charCode = character.charCodeAt(0);
          if (options.minimal && 8232 != charCode && 8233 != charCode) {
            result += character;
            continue;
          }
          let hexadecimal = charCode.toString(16);
          lowercaseHex || (hexadecimal = hexadecimal.toUpperCase());
          const longhand = hexadecimal.length > 2 || json, escaped = "\\" + (longhand ? "u" : "x") + ("0000" + hexadecimal).slice(longhand ? -4 : -2);
          result += escaped;
        }
        return options.wrap && (result = quote + result + quote), "`" == quote && (result = result.replace(/\$\{/g, "\\${")), 
        options.isScriptContext ? result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json ? "\\u003C!--" : "\\x3C!--") : result;
      };
      jsesc.version = "2.5.2", module.exports = jsesc;
    },
    7824: module => {
      var s = 1e3, m = 60 * s, h = 60 * m, d = 24 * h, w = 7 * d, y = 365.25 * d;
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= 1.5 * n;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if ("string" === type && val.length > 0) return function(str) {
          if ((str = String(str)).length > 100) return;
          var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
          if (!match) return;
          var n = parseFloat(match[1]);
          switch ((match[2] || "ms").toLowerCase()) {
           case "years":
           case "year":
           case "yrs":
           case "yr":
           case "y":
            return n * y;

           case "weeks":
           case "week":
           case "w":
            return n * w;

           case "days":
           case "day":
           case "d":
            return n * d;

           case "hours":
           case "hour":
           case "hrs":
           case "hr":
           case "h":
            return n * h;

           case "minutes":
           case "minute":
           case "mins":
           case "min":
           case "m":
            return n * m;

           case "seconds":
           case "second":
           case "secs":
           case "sec":
           case "s":
            return n * s;

           case "milliseconds":
           case "millisecond":
           case "msecs":
           case "msec":
           case "ms":
            return n;

           default:
            return;
          }
        }(val);
        if ("number" === type && isFinite(val)) return options.long ? function(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) return plural(ms, msAbs, d, "day");
          if (msAbs >= h) return plural(ms, msAbs, h, "hour");
          if (msAbs >= m) return plural(ms, msAbs, m, "minute");
          if (msAbs >= s) return plural(ms, msAbs, s, "second");
          return ms + " ms";
        }(val) : function(ms) {
          var msAbs = Math.abs(ms);
          if (msAbs >= d) return Math.round(ms / d) + "d";
          if (msAbs >= h) return Math.round(ms / h) + "h";
          if (msAbs >= m) return Math.round(ms / m) + "m";
          if (msAbs >= s) return Math.round(ms / s) + "s";
          return ms + "ms";
        }(val);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
    },
    2130: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const os = __webpack_require__(2037), hasFlag = __webpack_require__(6560), env = process.env;
      let forceColor;
      function getSupportLevel(stream) {
        const level = function(stream) {
          if (!1 === forceColor) return 0;
          if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
          if (hasFlag("color=256")) return 2;
          if (stream && !stream.isTTY && !0 !== forceColor) return 0;
          const min = forceColor ? 1 : 0;
          if ("win32" === process.platform) {
            const osRelease = os.release().split(".");
            return Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
          }
          if ("CI" in env) return [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI" ].some((sign => sign in env)) || "codeship" === env.CI_NAME ? 1 : min;
          if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
          if ("truecolor" === env.COLORTERM) return 3;
          if ("TERM_PROGRAM" in env) {
            const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (env.TERM_PROGRAM) {
             case "iTerm.app":
              return version >= 3 ? 3 : 2;

             case "Apple_Terminal":
              return 2;
            }
          }
          return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : (env.TERM, 
          min);
        }(stream);
        return function(level) {
          return 0 !== level && {
            level,
            hasBasic: !0,
            has256: level >= 2,
            has16m: level >= 3
          };
        }(level);
      }
      hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") ? forceColor = !1 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (forceColor = !0), 
      "FORCE_COLOR" in env && (forceColor = 0 === env.FORCE_COLOR.length || 0 !== parseInt(env.FORCE_COLOR, 10)), 
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel(process.stdout),
        stderr: getSupportLevel(process.stderr)
      };
    },
    9516: module => {
      "use strict";
      module.exports = require("./parser");
    },
    7289: module => {
      "use strict";
      module.exports = require("./types");
    },
    3920: module => {
      "use strict";
      module.exports = require("chalk");
    },
    2037: module => {
      "use strict";
      module.exports = require("os");
    },
    6224: module => {
      "use strict";
      module.exports = require("tty");
    },
    3837: module => {
      "use strict";
      module.exports = require("util");
    },
    8487: module => {
      "use strict";
      module.exports = JSON.parse('{"builtin":{"Array":false,"ArrayBuffer":false,"Atomics":false,"BigInt":false,"BigInt64Array":false,"BigUint64Array":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"globalThis":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"SharedArrayBuffer":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"es5":{"Array":false,"Boolean":false,"constructor":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"propertyIsEnumerable":false,"RangeError":false,"ReferenceError":false,"RegExp":false,"String":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false},"es2015":{"Array":false,"ArrayBuffer":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"es2017":{"Array":false,"ArrayBuffer":false,"Atomics":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"SharedArrayBuffer":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"browser":{"AbortController":false,"AbortSignal":false,"addEventListener":false,"alert":false,"AnalyserNode":false,"Animation":false,"AnimationEffectReadOnly":false,"AnimationEffectTiming":false,"AnimationEffectTimingReadOnly":false,"AnimationEvent":false,"AnimationPlaybackEvent":false,"AnimationTimeline":false,"applicationCache":false,"ApplicationCache":false,"ApplicationCacheErrorEvent":false,"atob":false,"Attr":false,"Audio":false,"AudioBuffer":false,"AudioBufferSourceNode":false,"AudioContext":false,"AudioDestinationNode":false,"AudioListener":false,"AudioNode":false,"AudioParam":false,"AudioProcessingEvent":false,"AudioScheduledSourceNode":false,"AudioWorkletGlobalScope ":false,"AudioWorkletNode":false,"AudioWorkletProcessor":false,"BarProp":false,"BaseAudioContext":false,"BatteryManager":false,"BeforeUnloadEvent":false,"BiquadFilterNode":false,"Blob":false,"BlobEvent":false,"blur":false,"BroadcastChannel":false,"btoa":false,"BudgetService":false,"ByteLengthQueuingStrategy":false,"Cache":false,"caches":false,"CacheStorage":false,"cancelAnimationFrame":false,"cancelIdleCallback":false,"CanvasCaptureMediaStreamTrack":false,"CanvasGradient":false,"CanvasPattern":false,"CanvasRenderingContext2D":false,"ChannelMergerNode":false,"ChannelSplitterNode":false,"CharacterData":false,"clearInterval":false,"clearTimeout":false,"clientInformation":false,"ClipboardEvent":false,"close":false,"closed":false,"CloseEvent":false,"Comment":false,"CompositionEvent":false,"confirm":false,"console":false,"ConstantSourceNode":false,"ConvolverNode":false,"CountQueuingStrategy":false,"createImageBitmap":false,"Credential":false,"CredentialsContainer":false,"crypto":false,"Crypto":false,"CryptoKey":false,"CSS":false,"CSSConditionRule":false,"CSSFontFaceRule":false,"CSSGroupingRule":false,"CSSImportRule":false,"CSSKeyframeRule":false,"CSSKeyframesRule":false,"CSSMediaRule":false,"CSSNamespaceRule":false,"CSSPageRule":false,"CSSRule":false,"CSSRuleList":false,"CSSStyleDeclaration":false,"CSSStyleRule":false,"CSSStyleSheet":false,"CSSSupportsRule":false,"CustomElementRegistry":false,"customElements":false,"CustomEvent":false,"DataTransfer":false,"DataTransferItem":false,"DataTransferItemList":false,"defaultstatus":false,"defaultStatus":false,"DelayNode":false,"DeviceMotionEvent":false,"DeviceOrientationEvent":false,"devicePixelRatio":false,"dispatchEvent":false,"document":false,"Document":false,"DocumentFragment":false,"DocumentType":false,"DOMError":false,"DOMException":false,"DOMImplementation":false,"DOMMatrix":false,"DOMMatrixReadOnly":false,"DOMParser":false,"DOMPoint":false,"DOMPointReadOnly":false,"DOMQuad":false,"DOMRect":false,"DOMRectReadOnly":false,"DOMStringList":false,"DOMStringMap":false,"DOMTokenList":false,"DragEvent":false,"DynamicsCompressorNode":false,"Element":false,"ErrorEvent":false,"event":false,"Event":false,"EventSource":false,"EventTarget":false,"external":false,"fetch":false,"File":false,"FileList":false,"FileReader":false,"find":false,"focus":false,"FocusEvent":false,"FontFace":false,"FontFaceSetLoadEvent":false,"FormData":false,"frameElement":false,"frames":false,"GainNode":false,"Gamepad":false,"GamepadButton":false,"GamepadEvent":false,"getComputedStyle":false,"getSelection":false,"HashChangeEvent":false,"Headers":false,"history":false,"History":false,"HTMLAllCollection":false,"HTMLAnchorElement":false,"HTMLAreaElement":false,"HTMLAudioElement":false,"HTMLBaseElement":false,"HTMLBodyElement":false,"HTMLBRElement":false,"HTMLButtonElement":false,"HTMLCanvasElement":false,"HTMLCollection":false,"HTMLContentElement":false,"HTMLDataElement":false,"HTMLDataListElement":false,"HTMLDetailsElement":false,"HTMLDialogElement":false,"HTMLDirectoryElement":false,"HTMLDivElement":false,"HTMLDListElement":false,"HTMLDocument":false,"HTMLElement":false,"HTMLEmbedElement":false,"HTMLFieldSetElement":false,"HTMLFontElement":false,"HTMLFormControlsCollection":false,"HTMLFormElement":false,"HTMLFrameElement":false,"HTMLFrameSetElement":false,"HTMLHeadElement":false,"HTMLHeadingElement":false,"HTMLHRElement":false,"HTMLHtmlElement":false,"HTMLIFrameElement":false,"HTMLImageElement":false,"HTMLInputElement":false,"HTMLLabelElement":false,"HTMLLegendElement":false,"HTMLLIElement":false,"HTMLLinkElement":false,"HTMLMapElement":false,"HTMLMarqueeElement":false,"HTMLMediaElement":false,"HTMLMenuElement":false,"HTMLMetaElement":false,"HTMLMeterElement":false,"HTMLModElement":false,"HTMLObjectElement":false,"HTMLOListElement":false,"HTMLOptGroupElement":false,"HTMLOptionElement":false,"HTMLOptionsCollection":false,"HTMLOutputElement":false,"HTMLParagraphElement":false,"HTMLParamElement":false,"HTMLPictureElement":false,"HTMLPreElement":false,"HTMLProgressElement":false,"HTMLQuoteElement":false,"HTMLScriptElement":false,"HTMLSelectElement":false,"HTMLShadowElement":false,"HTMLSlotElement":false,"HTMLSourceElement":false,"HTMLSpanElement":false,"HTMLStyleElement":false,"HTMLTableCaptionElement":false,"HTMLTableCellElement":false,"HTMLTableColElement":false,"HTMLTableElement":false,"HTMLTableRowElement":false,"HTMLTableSectionElement":false,"HTMLTemplateElement":false,"HTMLTextAreaElement":false,"HTMLTimeElement":false,"HTMLTitleElement":false,"HTMLTrackElement":false,"HTMLUListElement":false,"HTMLUnknownElement":false,"HTMLVideoElement":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"IdleDeadline":false,"IIRFilterNode":false,"Image":false,"ImageBitmap":false,"ImageBitmapRenderingContext":false,"ImageCapture":false,"ImageData":false,"indexedDB":false,"innerHeight":false,"innerWidth":false,"InputEvent":false,"IntersectionObserver":false,"IntersectionObserverEntry":false,"Intl":false,"isSecureContext":false,"KeyboardEvent":false,"KeyframeEffect":false,"KeyframeEffectReadOnly":false,"length":false,"localStorage":false,"location":true,"Location":false,"locationbar":false,"matchMedia":false,"MediaDeviceInfo":false,"MediaDevices":false,"MediaElementAudioSourceNode":false,"MediaEncryptedEvent":false,"MediaError":false,"MediaKeyMessageEvent":false,"MediaKeySession":false,"MediaKeyStatusMap":false,"MediaKeySystemAccess":false,"MediaList":false,"MediaQueryList":false,"MediaQueryListEvent":false,"MediaRecorder":false,"MediaSettingsRange":false,"MediaSource":false,"MediaStream":false,"MediaStreamAudioDestinationNode":false,"MediaStreamAudioSourceNode":false,"MediaStreamEvent":false,"MediaStreamTrack":false,"MediaStreamTrackEvent":false,"menubar":false,"MessageChannel":false,"MessageEvent":false,"MessagePort":false,"MIDIAccess":false,"MIDIConnectionEvent":false,"MIDIInput":false,"MIDIInputMap":false,"MIDIMessageEvent":false,"MIDIOutput":false,"MIDIOutputMap":false,"MIDIPort":false,"MimeType":false,"MimeTypeArray":false,"MouseEvent":false,"moveBy":false,"moveTo":false,"MutationEvent":false,"MutationObserver":false,"MutationRecord":false,"name":false,"NamedNodeMap":false,"NavigationPreloadManager":false,"navigator":false,"Navigator":false,"NetworkInformation":false,"Node":false,"NodeFilter":false,"NodeIterator":false,"NodeList":false,"Notification":false,"OfflineAudioCompletionEvent":false,"OfflineAudioContext":false,"offscreenBuffering":false,"OffscreenCanvas":true,"onabort":true,"onafterprint":true,"onanimationend":true,"onanimationiteration":true,"onanimationstart":true,"onappinstalled":true,"onauxclick":true,"onbeforeinstallprompt":true,"onbeforeprint":true,"onbeforeunload":true,"onblur":true,"oncancel":true,"oncanplay":true,"oncanplaythrough":true,"onchange":true,"onclick":true,"onclose":true,"oncontextmenu":true,"oncuechange":true,"ondblclick":true,"ondevicemotion":true,"ondeviceorientation":true,"ondeviceorientationabsolute":true,"ondrag":true,"ondragend":true,"ondragenter":true,"ondragleave":true,"ondragover":true,"ondragstart":true,"ondrop":true,"ondurationchange":true,"onemptied":true,"onended":true,"onerror":true,"onfocus":true,"ongotpointercapture":true,"onhashchange":true,"oninput":true,"oninvalid":true,"onkeydown":true,"onkeypress":true,"onkeyup":true,"onlanguagechange":true,"onload":true,"onloadeddata":true,"onloadedmetadata":true,"onloadstart":true,"onlostpointercapture":true,"onmessage":true,"onmessageerror":true,"onmousedown":true,"onmouseenter":true,"onmouseleave":true,"onmousemove":true,"onmouseout":true,"onmouseover":true,"onmouseup":true,"onmousewheel":true,"onoffline":true,"ononline":true,"onpagehide":true,"onpageshow":true,"onpause":true,"onplay":true,"onplaying":true,"onpointercancel":true,"onpointerdown":true,"onpointerenter":true,"onpointerleave":true,"onpointermove":true,"onpointerout":true,"onpointerover":true,"onpointerup":true,"onpopstate":true,"onprogress":true,"onratechange":true,"onrejectionhandled":true,"onreset":true,"onresize":true,"onscroll":true,"onsearch":true,"onseeked":true,"onseeking":true,"onselect":true,"onstalled":true,"onstorage":true,"onsubmit":true,"onsuspend":true,"ontimeupdate":true,"ontoggle":true,"ontransitionend":true,"onunhandledrejection":true,"onunload":true,"onvolumechange":true,"onwaiting":true,"onwheel":true,"open":false,"openDatabase":false,"opener":false,"Option":false,"origin":false,"OscillatorNode":false,"outerHeight":false,"outerWidth":false,"PageTransitionEvent":false,"pageXOffset":false,"pageYOffset":false,"PannerNode":false,"parent":false,"Path2D":false,"PaymentAddress":false,"PaymentRequest":false,"PaymentRequestUpdateEvent":false,"PaymentResponse":false,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceLongTaskTiming":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceNavigationTiming":false,"PerformanceObserver":false,"PerformanceObserverEntryList":false,"PerformancePaintTiming":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"PeriodicWave":false,"Permissions":false,"PermissionStatus":false,"personalbar":false,"PhotoCapabilities":false,"Plugin":false,"PluginArray":false,"PointerEvent":false,"PopStateEvent":false,"postMessage":false,"Presentation":false,"PresentationAvailability":false,"PresentationConnection":false,"PresentationConnectionAvailableEvent":false,"PresentationConnectionCloseEvent":false,"PresentationConnectionList":false,"PresentationReceiver":false,"PresentationRequest":false,"print":false,"ProcessingInstruction":false,"ProgressEvent":false,"PromiseRejectionEvent":false,"prompt":false,"PushManager":false,"PushSubscription":false,"PushSubscriptionOptions":false,"queueMicrotask":false,"RadioNodeList":false,"Range":false,"ReadableStream":false,"registerProcessor":false,"RemotePlayback":false,"removeEventListener":false,"Request":false,"requestAnimationFrame":false,"requestIdleCallback":false,"resizeBy":false,"ResizeObserver":false,"ResizeObserverEntry":false,"resizeTo":false,"Response":false,"RTCCertificate":false,"RTCDataChannel":false,"RTCDataChannelEvent":false,"RTCDtlsTransport":false,"RTCIceCandidate":false,"RTCIceGatherer":false,"RTCIceTransport":false,"RTCPeerConnection":false,"RTCPeerConnectionIceEvent":false,"RTCRtpContributingSource":false,"RTCRtpReceiver":false,"RTCRtpSender":false,"RTCSctpTransport":false,"RTCSessionDescription":false,"RTCStatsReport":false,"RTCTrackEvent":false,"screen":false,"Screen":false,"screenLeft":false,"ScreenOrientation":false,"screenTop":false,"screenX":false,"screenY":false,"ScriptProcessorNode":false,"scroll":false,"scrollbars":false,"scrollBy":false,"scrollTo":false,"scrollX":false,"scrollY":false,"SecurityPolicyViolationEvent":false,"Selection":false,"self":false,"ServiceWorker":false,"ServiceWorkerContainer":false,"ServiceWorkerRegistration":false,"sessionStorage":false,"setInterval":false,"setTimeout":false,"ShadowRoot":false,"SharedWorker":false,"SourceBuffer":false,"SourceBufferList":false,"speechSynthesis":false,"SpeechSynthesisEvent":false,"SpeechSynthesisUtterance":false,"StaticRange":false,"status":false,"statusbar":false,"StereoPannerNode":false,"stop":false,"Storage":false,"StorageEvent":false,"StorageManager":false,"styleMedia":false,"StyleSheet":false,"StyleSheetList":false,"SubtleCrypto":false,"SVGAElement":false,"SVGAngle":false,"SVGAnimatedAngle":false,"SVGAnimatedBoolean":false,"SVGAnimatedEnumeration":false,"SVGAnimatedInteger":false,"SVGAnimatedLength":false,"SVGAnimatedLengthList":false,"SVGAnimatedNumber":false,"SVGAnimatedNumberList":false,"SVGAnimatedPreserveAspectRatio":false,"SVGAnimatedRect":false,"SVGAnimatedString":false,"SVGAnimatedTransformList":false,"SVGAnimateElement":false,"SVGAnimateMotionElement":false,"SVGAnimateTransformElement":false,"SVGAnimationElement":false,"SVGCircleElement":false,"SVGClipPathElement":false,"SVGComponentTransferFunctionElement":false,"SVGDefsElement":false,"SVGDescElement":false,"SVGDiscardElement":false,"SVGElement":false,"SVGEllipseElement":false,"SVGFEBlendElement":false,"SVGFEColorMatrixElement":false,"SVGFEComponentTransferElement":false,"SVGFECompositeElement":false,"SVGFEConvolveMatrixElement":false,"SVGFEDiffuseLightingElement":false,"SVGFEDisplacementMapElement":false,"SVGFEDistantLightElement":false,"SVGFEDropShadowElement":false,"SVGFEFloodElement":false,"SVGFEFuncAElement":false,"SVGFEFuncBElement":false,"SVGFEFuncGElement":false,"SVGFEFuncRElement":false,"SVGFEGaussianBlurElement":false,"SVGFEImageElement":false,"SVGFEMergeElement":false,"SVGFEMergeNodeElement":false,"SVGFEMorphologyElement":false,"SVGFEOffsetElement":false,"SVGFEPointLightElement":false,"SVGFESpecularLightingElement":false,"SVGFESpotLightElement":false,"SVGFETileElement":false,"SVGFETurbulenceElement":false,"SVGFilterElement":false,"SVGForeignObjectElement":false,"SVGGElement":false,"SVGGeometryElement":false,"SVGGradientElement":false,"SVGGraphicsElement":false,"SVGImageElement":false,"SVGLength":false,"SVGLengthList":false,"SVGLinearGradientElement":false,"SVGLineElement":false,"SVGMarkerElement":false,"SVGMaskElement":false,"SVGMatrix":false,"SVGMetadataElement":false,"SVGMPathElement":false,"SVGNumber":false,"SVGNumberList":false,"SVGPathElement":false,"SVGPatternElement":false,"SVGPoint":false,"SVGPointList":false,"SVGPolygonElement":false,"SVGPolylineElement":false,"SVGPreserveAspectRatio":false,"SVGRadialGradientElement":false,"SVGRect":false,"SVGRectElement":false,"SVGScriptElement":false,"SVGSetElement":false,"SVGStopElement":false,"SVGStringList":false,"SVGStyleElement":false,"SVGSVGElement":false,"SVGSwitchElement":false,"SVGSymbolElement":false,"SVGTextContentElement":false,"SVGTextElement":false,"SVGTextPathElement":false,"SVGTextPositioningElement":false,"SVGTitleElement":false,"SVGTransform":false,"SVGTransformList":false,"SVGTSpanElement":false,"SVGUnitTypes":false,"SVGUseElement":false,"SVGViewElement":false,"TaskAttributionTiming":false,"Text":false,"TextDecoder":false,"TextEncoder":false,"TextEvent":false,"TextMetrics":false,"TextTrack":false,"TextTrackCue":false,"TextTrackCueList":false,"TextTrackList":false,"TimeRanges":false,"toolbar":false,"top":false,"Touch":false,"TouchEvent":false,"TouchList":false,"TrackEvent":false,"TransitionEvent":false,"TreeWalker":false,"UIEvent":false,"URL":false,"URLSearchParams":false,"ValidityState":false,"visualViewport":false,"VisualViewport":false,"VTTCue":false,"WaveShaperNode":false,"WebAssembly":false,"WebGL2RenderingContext":false,"WebGLActiveInfo":false,"WebGLBuffer":false,"WebGLContextEvent":false,"WebGLFramebuffer":false,"WebGLProgram":false,"WebGLQuery":false,"WebGLRenderbuffer":false,"WebGLRenderingContext":false,"WebGLSampler":false,"WebGLShader":false,"WebGLShaderPrecisionFormat":false,"WebGLSync":false,"WebGLTexture":false,"WebGLTransformFeedback":false,"WebGLUniformLocation":false,"WebGLVertexArrayObject":false,"WebSocket":false,"WheelEvent":false,"window":false,"Window":false,"Worker":false,"WritableStream":false,"XMLDocument":false,"XMLHttpRequest":false,"XMLHttpRequestEventTarget":false,"XMLHttpRequestUpload":false,"XMLSerializer":false,"XPathEvaluator":false,"XPathExpression":false,"XPathResult":false,"XSLTProcessor":false},"worker":{"addEventListener":false,"applicationCache":false,"atob":false,"Blob":false,"BroadcastChannel":false,"btoa":false,"Cache":false,"caches":false,"clearInterval":false,"clearTimeout":false,"close":true,"console":false,"fetch":false,"FileReaderSync":false,"FormData":false,"Headers":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"ImageData":false,"importScripts":true,"indexedDB":false,"location":false,"MessageChannel":false,"MessagePort":false,"name":false,"navigator":false,"Notification":false,"onclose":true,"onconnect":true,"onerror":true,"onlanguagechange":true,"onmessage":true,"onoffline":true,"ononline":true,"onrejectionhandled":true,"onunhandledrejection":true,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"postMessage":true,"Promise":false,"queueMicrotask":false,"removeEventListener":false,"Request":false,"Response":false,"self":true,"ServiceWorkerRegistration":false,"setInterval":false,"setTimeout":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false,"WebSocket":false,"Worker":false,"WorkerGlobalScope":false,"XMLHttpRequest":false},"node":{"__dirname":false,"__filename":false,"Buffer":false,"clearImmediate":false,"clearInterval":false,"clearTimeout":false,"console":false,"exports":true,"global":false,"Intl":false,"module":false,"process":false,"queueMicrotask":false,"require":false,"setImmediate":false,"setInterval":false,"setTimeout":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false},"commonjs":{"exports":true,"global":false,"module":false,"require":false},"amd":{"define":false,"require":false},"mocha":{"after":false,"afterEach":false,"before":false,"beforeEach":false,"context":false,"describe":false,"it":false,"mocha":false,"run":false,"setup":false,"specify":false,"suite":false,"suiteSetup":false,"suiteTeardown":false,"teardown":false,"test":false,"xcontext":false,"xdescribe":false,"xit":false,"xspecify":false},"jasmine":{"afterAll":false,"afterEach":false,"beforeAll":false,"beforeEach":false,"describe":false,"expect":false,"fail":false,"fdescribe":false,"fit":false,"it":false,"jasmine":false,"pending":false,"runs":false,"spyOn":false,"spyOnProperty":false,"waits":false,"waitsFor":false,"xdescribe":false,"xit":false},"jest":{"afterAll":false,"afterEach":false,"beforeAll":false,"beforeEach":false,"describe":false,"expect":false,"fdescribe":false,"fit":false,"it":false,"jest":false,"pit":false,"require":false,"test":false,"xdescribe":false,"xit":false,"xtest":false},"qunit":{"asyncTest":false,"deepEqual":false,"equal":false,"expect":false,"module":false,"notDeepEqual":false,"notEqual":false,"notOk":false,"notPropEqual":false,"notStrictEqual":false,"ok":false,"propEqual":false,"QUnit":false,"raises":false,"start":false,"stop":false,"strictEqual":false,"test":false,"throws":false},"phantomjs":{"console":true,"exports":true,"phantom":true,"require":true,"WebPage":true},"couch":{"emit":false,"exports":false,"getRow":false,"log":false,"module":false,"provides":false,"require":false,"respond":false,"send":false,"start":false,"sum":false},"rhino":{"defineClass":false,"deserialize":false,"gc":false,"help":false,"importClass":false,"importPackage":false,"java":false,"load":false,"loadClass":false,"Packages":false,"print":false,"quit":false,"readFile":false,"readUrl":false,"runCommand":false,"seal":false,"serialize":false,"spawn":false,"sync":false,"toint32":false,"version":false},"nashorn":{"__DIR__":false,"__FILE__":false,"__LINE__":false,"com":false,"edu":false,"exit":false,"java":false,"Java":false,"javafx":false,"JavaImporter":false,"javax":false,"JSAdapter":false,"load":false,"loadWithNewGlobal":false,"org":false,"Packages":false,"print":false,"quit":false},"wsh":{"ActiveXObject":true,"Enumerator":true,"GetObject":true,"ScriptEngine":true,"ScriptEngineBuildVersion":true,"ScriptEngineMajorVersion":true,"ScriptEngineMinorVersion":true,"VBArray":true,"WScript":true,"WSH":true,"XDomainRequest":true},"jquery":{"$":false,"jQuery":false},"yui":{"YAHOO":false,"YAHOO_config":false,"YUI":false,"YUI_config":false},"shelljs":{"cat":false,"cd":false,"chmod":false,"config":false,"cp":false,"dirs":false,"echo":false,"env":false,"error":false,"exec":false,"exit":false,"find":false,"grep":false,"ln":false,"ls":false,"mkdir":false,"mv":false,"popd":false,"pushd":false,"pwd":false,"rm":false,"sed":false,"set":false,"target":false,"tempdir":false,"test":false,"touch":false,"which":false},"prototypejs":{"$":false,"$$":false,"$A":false,"$break":false,"$continue":false,"$F":false,"$H":false,"$R":false,"$w":false,"Abstract":false,"Ajax":false,"Autocompleter":false,"Builder":false,"Class":false,"Control":false,"Draggable":false,"Draggables":false,"Droppables":false,"Effect":false,"Element":false,"Enumerable":false,"Event":false,"Field":false,"Form":false,"Hash":false,"Insertion":false,"ObjectRange":false,"PeriodicalExecuter":false,"Position":false,"Prototype":false,"Scriptaculous":false,"Selector":false,"Sortable":false,"SortableObserver":false,"Sound":false,"Template":false,"Toggle":false,"Try":false},"meteor":{"_":false,"$":false,"Accounts":false,"AccountsClient":false,"AccountsCommon":false,"AccountsServer":false,"App":false,"Assets":false,"Blaze":false,"check":false,"Cordova":false,"DDP":false,"DDPRateLimiter":false,"DDPServer":false,"Deps":false,"EJSON":false,"Email":false,"HTTP":false,"Log":false,"Match":false,"Meteor":false,"Mongo":false,"MongoInternals":false,"Npm":false,"Package":false,"Plugin":false,"process":false,"Random":false,"ReactiveDict":false,"ReactiveVar":false,"Router":false,"ServiceConfiguration":false,"Session":false,"share":false,"Spacebars":false,"Template":false,"Tinytest":false,"Tracker":false,"UI":false,"Utils":false,"WebApp":false,"WebAppInternals":false},"mongo":{"_isWindows":false,"_rand":false,"BulkWriteResult":false,"cat":false,"cd":false,"connect":false,"db":false,"getHostName":false,"getMemInfo":false,"hostname":false,"ISODate":false,"listFiles":false,"load":false,"ls":false,"md5sumFile":false,"mkdir":false,"Mongo":false,"NumberInt":false,"NumberLong":false,"ObjectId":false,"PlanCache":false,"print":false,"printjson":false,"pwd":false,"quit":false,"removeFile":false,"rs":false,"sh":false,"UUID":false,"version":false,"WriteResult":false},"applescript":{"$":false,"Application":false,"Automation":false,"console":false,"delay":false,"Library":false,"ObjC":false,"ObjectSpecifier":false,"Path":false,"Progress":false,"Ref":false},"serviceworker":{"addEventListener":false,"applicationCache":false,"atob":false,"Blob":false,"BroadcastChannel":false,"btoa":false,"Cache":false,"caches":false,"CacheStorage":false,"clearInterval":false,"clearTimeout":false,"Client":false,"clients":false,"Clients":false,"close":true,"console":false,"ExtendableEvent":false,"ExtendableMessageEvent":false,"fetch":false,"FetchEvent":false,"FileReaderSync":false,"FormData":false,"Headers":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"ImageData":false,"importScripts":false,"indexedDB":false,"location":false,"MessageChannel":false,"MessagePort":false,"name":false,"navigator":false,"Notification":false,"onclose":true,"onconnect":true,"onerror":true,"onfetch":true,"oninstall":true,"onlanguagechange":true,"onmessage":true,"onmessageerror":true,"onnotificationclick":true,"onnotificationclose":true,"onoffline":true,"ononline":true,"onpush":true,"onpushsubscriptionchange":true,"onrejectionhandled":true,"onsync":true,"onunhandledrejection":true,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"postMessage":true,"Promise":false,"queueMicrotask":false,"registration":false,"removeEventListener":false,"Request":false,"Response":false,"self":false,"ServiceWorker":false,"ServiceWorkerContainer":false,"ServiceWorkerGlobalScope":false,"ServiceWorkerMessageEvent":false,"ServiceWorkerRegistration":false,"setInterval":false,"setTimeout":false,"skipWaiting":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false,"WebSocket":false,"WindowClient":false,"Worker":false,"WorkerGlobalScope":false,"XMLHttpRequest":false},"atomtest":{"advanceClock":false,"fakeClearInterval":false,"fakeClearTimeout":false,"fakeSetInterval":false,"fakeSetTimeout":false,"resetTimeouts":false,"waitsForPromise":false},"embertest":{"andThen":false,"click":false,"currentPath":false,"currentRouteName":false,"currentURL":false,"fillIn":false,"find":false,"findAll":false,"findWithAssert":false,"keyEvent":false,"pauseTest":false,"resumeTest":false,"triggerEvent":false,"visit":false,"wait":false},"protractor":{"$":false,"$$":false,"browser":false,"by":false,"By":false,"DartObject":false,"element":false,"protractor":false},"shared-node-browser":{"clearInterval":false,"clearTimeout":false,"console":false,"setInterval":false,"setTimeout":false,"URL":false,"URLSearchParams":false},"webextensions":{"browser":false,"chrome":false,"opr":false},"greasemonkey":{"cloneInto":false,"createObjectIn":false,"exportFunction":false,"GM":false,"GM_addStyle":false,"GM_deleteValue":false,"GM_getResourceText":false,"GM_getResourceURL":false,"GM_getValue":false,"GM_info":false,"GM_listValues":false,"GM_log":false,"GM_openInTab":false,"GM_registerMenuCommand":false,"GM_setClipboard":false,"GM_setValue":false,"GM_xmlhttpRequest":false,"unsafeWindow":false},"devtools":{"$":false,"$_":false,"$$":false,"$0":false,"$1":false,"$2":false,"$3":false,"$4":false,"$x":false,"chrome":false,"clear":false,"copy":false,"debug":false,"dir":false,"dirxml":false,"getEventListeners":false,"inspect":false,"keys":false,"monitor":false,"monitorEvents":false,"profile":false,"profileEnd":false,"queryObjects":false,"table":false,"undebug":false,"unmonitor":false,"unmonitorEvents":false,"values":false}}');
    }
  }, __webpack_module_cache__ = {};
  var __webpack_exports__ = function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.exports;
  }(9838), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();