(() => {
  var __webpack_modules__ = {
    330: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const doc_1 = __webpack_require__(413), {dedentToRoot, group, hardline, indent, join, line, literalline, softline} = doc_1.builders;
      function getSource(content) {
        return content.chardata.map((node => {
          const {SEA_WS, TEXT} = node.children, [{image}] = SEA_WS || TEXT;
          return {
            offset: node.location.startOffset,
            printed: image
          };
        })).sort((({offset}) => offset)).map((({printed}) => printed)).join("");
      }
      exports.default = (path, print, textToDoc, opts) => {
        const node = path.getValue();
        if ("element" !== node.name) return null;
        const parser = function(node, opts) {
          const {Name, attribute} = node.children, parser = Name[0].image.toLowerCase();
          return "xml" === parser ? null : "style" === parser && attribute && attribute.some((attr => "type" === attr.children.Name[0].image && '"text/css"' === attr.children.STRING[0].image)) ? "css" : opts.plugins.some((plugin => "string" != typeof plugin && plugin.parsers && Object.prototype.hasOwnProperty.call(plugin.parsers, parser))) ? parser : null;
        }(node, opts);
        if (!parser) return null;
        const content = node.children.content[0].children;
        if (1 !== Object.keys(content).length || !content.chardata) return null;
        const nodePath = path, {openTag, closeTag} = function(path, opts, print) {
          const node = path.getValue(), {OPEN, Name, attribute, START_CLOSE, SLASH_OPEN, END_NAME, END} = node.children, parts = [ OPEN[0].image, Name[0].image ];
          return attribute && parts.push(indent([ line, join(line, path.map(print, "children", "attribute")) ])), 
          opts.bracketSameLine || parts.push(softline), {
            openTag: group([ ...parts, START_CLOSE[0].image ]),
            closeTag: group([ SLASH_OPEN[0].image, END_NAME[0].image, END[0].image ])
          };
        }(nodePath, opts, print);
        return group([ openTag, literalline, dedentToRoot((doc = doc_1.utils.stripTrailingHardline(textToDoc(getSource(content), {
          ...opts,
          parser
        })), doc_1.utils.mapDoc(doc, (currentDoc => "string" == typeof currentDoc && currentDoc.includes("\n") ? currentDoc.split(/(\n)/g).map(((v, i) => i % 2 == 0 ? v : literalline)) : currentDoc)))), hardline, closeTag ]);
        var doc;
      };
    },
    879: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const parser_1 = __webpack_require__(266), parser = {
        parse(text) {
          const {lexErrors, parseErrors, cst} = (0, parser_1.parse)(text);
          if (lexErrors.length > 0) {
            const lexError = lexErrors[0], error = new Error(lexError.message);
            throw error.loc = {
              start: {
                line: lexError.line,
                column: lexError.column
              },
              end: {
                line: lexError.line,
                column: lexError.column + lexError.length
              }
            }, error;
          }
          if (parseErrors.length > 0) {
            const parseError = parseErrors[0], error = new Error(parseError.message), {token} = parseError;
            throw error.loc = {
              start: {
                line: token.startLine,
                column: token.startColumn
              },
              end: {
                line: token.endLine,
                column: token.endColumn
              }
            }, error;
          }
          return cst;
        },
        astFormat: "xml",
        locStart: node => node.location.startOffset,
        locEnd: node => node.location.endOffset
      };
      exports.default = parser;
    },
    219: function(module, __unused_webpack_exports, __webpack_require__) {
      "use strict";
      var __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      };
      const parser_1 = __importDefault(__webpack_require__(879)), printer_1 = __importDefault(__webpack_require__(428)), plugin = {
        languages: [ {
          name: "XML",
          parsers: [ "xml" ],
          aliases: [ "rss", "xsd", "wsdl" ],
          extensions: [ ".xml", ".adml", ".admx", ".ant", ".axml", ".builds", ".ccproj", ".ccxml", ".clixml", ".cproject", ".cscfg", ".csdef", ".csl", ".csproj", ".ct", ".depproj", ".dita", ".ditamap", ".ditaval", ".dll.config", ".dotsettings", ".filters", ".fsproj", ".fxml", ".glade", ".gml", ".gmx", ".grxml", ".iml", ".inx", ".ivy", ".jelly", ".jsproj", ".kml", ".launch", ".mdpolicy", ".mjml", ".mm", ".mod", ".mxml", ".natvis", ".ncl", ".ndproj", ".nproj", ".nuspec", ".odd", ".osm", ".pkgproj", ".pluginspec", ".proj", ".props", ".ps1xml", ".psc1", ".pt", ".rdf", ".resx", ".rss", ".runsettings", ".sch", ".scxml", ".sfproj", ".shproj", ".srdf", ".storyboard", ".sublime-snippet", ".targets", ".tml", ".ts", ".tsx", ".ui", ".urdf", ".ux", ".vbproj", ".vcxproj", ".vsixmanifest", ".vssettings", ".vstemplate", ".vxml", ".wixproj", ".workflow", ".wsdl", ".wsf", ".wxi", ".wxl", ".wxs", ".x3d", ".xacro", ".xaml", ".xib", ".xlf", ".xliff", ".xmi", ".xml.dist", ".xproj", ".xsd", ".xsl", ".xslt", ".xspec", ".xul", ".zcml" ],
          filenames: [ ".classpath", ".cproject", ".project", "App.config", "NuGet.config", "Settings.StyleCop", "Web.Debug.config", "Web.Release.config", "Web.config", "packages.config" ],
          vscodeLanguageIds: [ "xml", "forcesourcemanifest" ],
          linguistLanguageId: 399
        }, {
          name: "SVG",
          parsers: [ "xml" ],
          extensions: [ ".svg" ],
          vscodeLanguageIds: [ "svg" ],
          linguistLanguageId: 337
        } ],
        parsers: {
          xml: parser_1.default
        },
        printers: {
          xml: printer_1.default
        },
        options: {
          xmlSelfClosingSpace: {
            type: "boolean",
            category: "XML",
            default: !0,
            description: "Adds a space before self-closing tags.",
            since: "1.1.0"
          },
          xmlWhitespaceSensitivity: {
            type: "choice",
            category: "XML",
            default: "strict",
            description: "How to handle whitespaces in XML.",
            choices: [ {
              value: "strict",
              description: "Whitespaces are considered sensitive in all elements."
            }, {
              value: "ignore",
              description: "Whitespaces are considered insensitive in all elements."
            } ],
            since: "0.6.0"
          }
        },
        defaultOptions: {
          printWidth: 80,
          tabWidth: 2
        }
      };
      module.exports = plugin;
    },
    428: function(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";
      var __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const doc_1 = __webpack_require__(413), embed_1 = __importDefault(__webpack_require__(330)), {fill, group, hardline, indent, join, line, literalline, softline} = doc_1.builders;
      function hasIgnoreRanges(comments) {
        if (!comments || 0 === comments.length) return !1;
        comments.sort(((left, right) => left.startOffset - right.startOffset));
        let startFound = !1;
        for (let idx = 0; idx < comments.length; idx += 1) if ("\x3c!-- prettier-ignore-start --\x3e" === comments[idx].image) startFound = !0; else if (startFound && "\x3c!-- prettier-ignore-end --\x3e" === comments[idx].image) return !0;
        return !1;
      }
      function printIToken(path) {
        const node = path.getValue();
        return {
          offset: node.startOffset,
          startLine: node.startLine,
          endLine: node.endLine,
          printed: node.image
        };
      }
      function replaceNewlinesWithLiteralLines(content) {
        return content.split(/(\n)/g).map(((value, idx) => idx % 2 == 0 ? value : literalline));
      }
      const printer = {
        embed: embed_1.default,
        print(path, opts, print) {
          const node = path.getValue();
          switch (node.name) {
           case "attribute":
            {
              const {Name, EQUALS, STRING} = node.children;
              return [ Name[0].image, EQUALS[0].image, STRING[0].image ];
            }

           case "chardata":
            {
              const {SEA_WS, TEXT} = node.children, [{image}] = SEA_WS || TEXT;
              return image.split(/(\n)/g).map(((value, index) => index % 2 == 0 ? value : literalline));
            }

           case "content":
            {
              let fragments = path.call((childrenPath => {
                let response = [];
                const children = childrenPath.getValue();
                return children.CData && (response = response.concat(childrenPath.map(printIToken, "CData"))), 
                children.Comment && (response = response.concat(childrenPath.map(printIToken, "Comment"))), 
                children.chardata && (response = response.concat(childrenPath.map((charDataPath => ({
                  offset: charDataPath.getValue().location.startOffset,
                  printed: print(charDataPath)
                })), "chardata"))), children.element && (response = response.concat(childrenPath.map((elementPath => ({
                  offset: elementPath.getValue().location.startOffset,
                  printed: print(elementPath)
                })), "element"))), children.PROCESSING_INSTRUCTION && (response = response.concat(childrenPath.map(printIToken, "PROCESSING_INSTRUCTION"))), 
                children.reference && (response = response.concat(childrenPath.map((referencePath => {
                  const referenceNode = referencePath.getValue();
                  return {
                    offset: referenceNode.location.startOffset,
                    printed: (referenceNode.children.CharRef || referenceNode.children.EntityRef)[0].image
                  };
                }), "reference"))), response;
              }), "children");
              const {Comment} = node.children;
              if (hasIgnoreRanges(Comment)) {
                Comment.sort(((left, right) => left.startOffset - right.startOffset));
                const ignoreRanges = [];
                let ignoreStart = null;
                Comment.forEach((comment => {
                  "\x3c!-- prettier-ignore-start --\x3e" === comment.image ? ignoreStart = comment : ignoreStart && "\x3c!-- prettier-ignore-end --\x3e" === comment.image && (ignoreRanges.push({
                    start: ignoreStart.startOffset,
                    end: comment.endOffset
                  }), ignoreStart = null);
                })), fragments = fragments.filter((fragment => ignoreRanges.every((({start, end}) => fragment.offset < start || fragment.offset > end)))), 
                ignoreRanges.forEach((({start, end}) => {
                  const content = opts.originalText.slice(start, end + 1);
                  fragments.push({
                    offset: start,
                    printed: replaceNewlinesWithLiteralLines(content)
                  });
                }));
              }
              return fragments.sort(((left, right) => left.offset - right.offset)), group(fragments.map((({printed}) => printed)));
            }

           case "docTypeDecl":
            {
              const {DocType, Name, externalID, CLOSE} = node.children, parts = [ DocType[0].image, " ", Name[0].image ];
              return externalID && parts.push(" ", path.call(print, "children", "externalID", 0)), 
              group([ ...parts, CLOSE[0].image ]);
            }

           case "document":
            {
              const {docTypeDecl, element, misc, prolog} = node.children, fragments = [];
              return docTypeDecl && fragments.push({
                offset: docTypeDecl[0].location.startOffset,
                printed: path.call(print, "children", "docTypeDecl", 0)
              }), prolog && fragments.push({
                offset: prolog[0].location.startOffset,
                printed: path.call(print, "children", "prolog", 0)
              }), misc && misc.forEach((node => {
                node.children.PROCESSING_INSTRUCTION ? fragments.push({
                  offset: node.location.startOffset,
                  printed: node.children.PROCESSING_INSTRUCTION[0].image
                }) : node.children.Comment && fragments.push({
                  offset: node.location.startOffset,
                  printed: node.children.Comment[0].image
                });
              })), element && fragments.push({
                offset: element[0].location.startOffset,
                printed: path.call(print, "children", "element", 0)
              }), fragments.sort(((left, right) => left.offset - right.offset)), [ join(hardline, fragments.map((({printed}) => printed))), hardline ];
            }

           case "element":
            {
              const {OPEN, Name, attribute, START_CLOSE, content, SLASH_OPEN, END_NAME, END, SLASH_CLOSE} = node.children, parts = [ OPEN[0].image, Name[0].image ];
              if (attribute) {
                const separator = opts.singleAttributePerLine ? hardline : line;
                parts.push(indent([ line, join(separator, path.map(print, "children", "attribute")) ]));
              }
              const space = opts.xmlSelfClosingSpace ? line : softline;
              if (SLASH_CLOSE) return group([ ...parts, space, SLASH_CLOSE[0].image ]);
              if (0 === Object.keys(content[0].children).length) return group([ ...parts, space, "/>" ]);
              const openTag = group([ ...parts, opts.bracketSameLine ? "" : softline, START_CLOSE[0].image ]), closeTag = group([ SLASH_OPEN[0].image, END_NAME[0].image, END[0].image ]);
              if ("ignore" === opts.xmlWhitespaceSensitivity && function(node) {
                const {CData, Comment, reference} = node.children;
                return !CData && !reference && !hasIgnoreRanges(Comment);
              }(content[0])) {
                const fragments = path.call((childrenPath => {
                  const children = childrenPath.getValue();
                  let response = [];
                  return children.Comment && (response = response.concat(childrenPath.map(printIToken, "Comment"))), 
                  children.chardata && childrenPath.each((charDataPath => {
                    const chardata = charDataPath.getValue();
                    if (!chardata.children.TEXT) return;
                    const content = chardata.children.TEXT[0].image.trim(), printed = group(content.split(/(\n)/g).map((value => "\n" === value ? literalline : fill(value.split(/\b( +)\b/g).map(((segment, index) => index % 2 == 0 ? segment : line)))))), location = chardata.location;
                    response.push({
                      offset: location.startOffset,
                      startLine: location.startLine,
                      endLine: location.endLine,
                      printed
                    });
                  }), "chardata"), children.element && (response = response.concat(childrenPath.map((elementPath => {
                    const location = elementPath.getValue().location;
                    return {
                      offset: location.startOffset,
                      startLine: location.startLine,
                      endLine: location.endLine,
                      printed: print(elementPath)
                    };
                  }), "element"))), children.PROCESSING_INSTRUCTION && (response = response.concat(childrenPath.map(printIToken, "PROCESSING_INSTRUCTION"))), 
                  response;
                }), "children", "content", 0, "children");
                if (fragments.sort(((left, right) => left.offset - right.offset)), 1 === fragments.length && 1 === (content[0].children.chardata || []).filter((chardata => chardata.children.TEXT)).length) return group([ openTag, indent([ softline, fragments[0].printed ]), softline, closeTag ]);
                if (0 === fragments.length) return group([ ...parts, space, "/>" ]);
                const docs = [];
                let lastLine = fragments[0].startLine;
                return fragments.forEach((node => {
                  node.startLine - lastLine >= 2 ? docs.push(hardline, hardline) : docs.push(hardline), 
                  docs.push(node.printed), lastLine = node.endLine;
                })), group([ openTag, indent(docs), hardline, closeTag ]);
              }
              return group([ openTag, indent(path.call(print, "children", "content", 0)), closeTag ]);
            }

           case "externalID":
            {
              const {Public, PubIDLiteral, System, SystemLiteral} = node.children;
              return group(System ? [ System[0].image, indent([ line, SystemLiteral[0].image ]) ] : [ group([ Public[0].image, indent([ line, PubIDLiteral[0].image ]) ]), indent([ line, SystemLiteral[0].image ]) ]);
            }

           case "prolog":
            {
              const {XMLDeclOpen, attribute, SPECIAL_CLOSE} = node.children, parts = [ XMLDeclOpen[0].image ];
              attribute && parts.push(indent([ softline, join(line, path.map(print, "children", "attribute")) ]));
              const space = opts.xmlSelfClosingSpace ? line : softline;
              return group([ ...parts, space, SPECIAL_CLOSE[0].image ]);
            }
          }
        }
      };
      exports.default = printer;
    },
    266: (module, __unused_webpack_exports, __webpack_require__) => {
      const {xmlLexer} = __webpack_require__(50), {xmlParser} = __webpack_require__(515);
      module.exports = {
        parse: function(text) {
          const lexResult = xmlLexer.tokenize(text);
          xmlParser.input = lexResult.tokens;
          return {
            cst: xmlParser.document(),
            tokenVector: lexResult.tokens,
            lexErrors: lexResult.errors,
            parseErrors: xmlParser.errors
          };
        },
        BaseXmlCstVisitor: xmlParser.getBaseCstVisitorConstructor()
      };
    },
    50: (module, __unused_webpack_exports, __webpack_require__) => {
      const {createToken: createTokenOrg, Lexer} = __webpack_require__(999), fragments = {}, f = fragments;
      function FRAGMENT(name, def) {
        fragments[name] = "string" == typeof def ? def : def.source;
      }
      function makePattern(strings, ...args) {
        let combined = "";
        for (let i = 0; i < strings.length; i++) if (combined += strings[i], i < args.length) {
          combined += `(?:${args[i]})`;
        }
        return new RegExp(combined);
      }
      const tokensArray = [], tokensDictionary = {};
      function createToken(options) {
        const newTokenType = createTokenOrg(options);
        return tokensArray.push(newTokenType), tokensDictionary[options.name] = newTokenType, 
        newTokenType;
      }
      FRAGMENT("NameStartChar", "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)"), 
      FRAGMENT("NameChar", makePattern`${f.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`), 
      FRAGMENT("Name", makePattern`${f.NameStartChar}(${f.NameChar})*`);
      const Comment = createToken({
        name: "Comment",
        pattern: /<!--(.|\r?\n)*?-->/,
        line_breaks: !0
      }), CData = createToken({
        name: "CData",
        pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/,
        line_breaks: !0
      }), DocType = createToken({
        name: "DocType",
        pattern: /<!DOCTYPE/,
        push_mode: "INSIDE"
      }), IgnoredDTD = createToken({
        name: "DTD",
        pattern: /<!.*?>/,
        group: Lexer.SKIPPED
      }), EntityRef = createToken({
        name: "EntityRef",
        pattern: makePattern`&${f.Name};`
      }), CharRef = createToken({
        name: "CharRef",
        pattern: /&#\d+;|&#x[a-fA-F0-9]/
      }), SEA_WS = createToken({
        name: "SEA_WS",
        pattern: /( |\t|\n|\r\n)+/
      }), XMLDeclOpen = createToken({
        name: "XMLDeclOpen",
        pattern: /<\?xml[ \t\r\n]/,
        push_mode: "INSIDE"
      }), SLASH_OPEN = createToken({
        name: "SLASH_OPEN",
        pattern: /<\//,
        push_mode: "INSIDE"
      }), INVALID_SLASH_OPEN = createToken({
        name: "INVALID_SLASH_OPEN",
        pattern: /<\//,
        categories: [ SLASH_OPEN ]
      }), PROCESSING_INSTRUCTION = createToken({
        name: "PROCESSING_INSTRUCTION",
        pattern: makePattern`<\\?${f.Name}.*\\?>`
      }), OPEN = createToken({
        name: "OPEN",
        pattern: /</,
        push_mode: "INSIDE"
      }), INVALID_OPEN_INSIDE = createToken({
        name: "INVALID_OPEN_INSIDE",
        pattern: /</,
        categories: [ OPEN ]
      }), TEXT = createToken({
        name: "TEXT",
        pattern: /[^<&]+/
      }), CLOSE = createToken({
        name: "CLOSE",
        pattern: />/,
        pop_mode: !0
      }), SPECIAL_CLOSE = createToken({
        name: "SPECIAL_CLOSE",
        pattern: /\?>/,
        pop_mode: !0
      }), SLASH_CLOSE = createToken({
        name: "SLASH_CLOSE",
        pattern: /\/>/,
        pop_mode: !0
      }), SLASH = createToken({
        name: "SLASH",
        pattern: /\//
      }), STRING = createToken({
        name: "STRING",
        pattern: /"[^<"]*"|'[^<']*'/
      }), xmlLexer = new Lexer({
        defaultMode: "OUTSIDE",
        modes: {
          OUTSIDE: [ Comment, CData, DocType, IgnoredDTD, EntityRef, CharRef, SEA_WS, XMLDeclOpen, SLASH_OPEN, PROCESSING_INSTRUCTION, OPEN, TEXT ],
          INSIDE: [ Comment, INVALID_SLASH_OPEN, INVALID_OPEN_INSIDE, CLOSE, SPECIAL_CLOSE, SLASH_CLOSE, SLASH, createToken({
            name: "EQUALS",
            pattern: /=/
          }), STRING, createToken({
            name: "Name",
            pattern: makePattern`${f.Name}`
          }), createToken({
            name: "S",
            pattern: /[ \t\r\n]/,
            group: Lexer.SKIPPED
          }) ]
        }
      }, {
        positionTracking: "full",
        ensureOptimizations: !1,
        lineTerminatorCharacters: [ "\n" ],
        lineTerminatorsPattern: /\n|\r\n/g
      });
      module.exports = {
        xmlLexer,
        tokensDictionary
      };
    },
    515: (module, __unused_webpack_exports, __webpack_require__) => {
      const {CstParser, tokenMatcher} = __webpack_require__(999), {tokensDictionary: t} = __webpack_require__(50);
      const xmlParser = new class extends CstParser {
        constructor() {
          super(t, {
            maxLookahead: 1,
            recoveryEnabled: !0,
            nodeLocationTracking: "full"
          }), this.deletionRecoveryEnabled = !0;
          const $ = this;
          $.RULE("document", (() => {
            $.OPTION((() => {
              $.SUBRULE($.prolog);
            })), $.MANY((() => {
              $.SUBRULE($.misc);
            })), $.OPTION2((() => {
              $.SUBRULE($.docTypeDecl);
            })), $.MANY2((() => {
              $.SUBRULE2($.misc);
            })), $.SUBRULE($.element), $.MANY3((() => {
              $.SUBRULE3($.misc);
            }));
          })), $.RULE("prolog", (() => {
            $.CONSUME(t.XMLDeclOpen), $.MANY((() => {
              $.SUBRULE($.attribute);
            })), $.CONSUME(t.SPECIAL_CLOSE);
          })), $.RULE("docTypeDecl", (() => {
            $.CONSUME(t.DocType), $.CONSUME(t.Name), $.OPTION((() => {
              $.SUBRULE($.externalID);
            })), $.CONSUME(t.CLOSE);
          })), $.RULE("externalID", (() => {
            $.OR([ {
              GATE: () => "SYSTEM" === $.LA(1).image,
              ALT: () => {
                $.CONSUME2(t.Name, {
                  LABEL: "System"
                }), $.CONSUME(t.STRING, {
                  LABEL: "SystemLiteral"
                });
              }
            }, {
              GATE: () => "PUBLIC" === $.LA(1).image,
              ALT: () => {
                $.CONSUME3(t.Name, {
                  LABEL: "Public"
                }), $.CONSUME2(t.STRING, {
                  LABEL: "PubIDLiteral"
                }), $.CONSUME3(t.STRING, {
                  LABEL: "SystemLiteral"
                });
              }
            } ]);
          })), $.RULE("content", (() => {
            $.MANY((() => {
              $.OR([ {
                ALT: () => $.SUBRULE($.element)
              }, {
                ALT: () => $.SUBRULE($.chardata)
              }, {
                ALT: () => $.SUBRULE($.reference)
              }, {
                ALT: () => $.CONSUME(t.CData)
              }, {
                ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION)
              }, {
                ALT: () => $.CONSUME(t.Comment)
              } ]);
            }));
          })), $.RULE("element", (() => {
            $.CONSUME(t.OPEN);
            try {
              this.deletionRecoveryEnabled = !1, $.CONSUME(t.Name);
            } finally {
              this.deletionRecoveryEnabled = !0;
            }
            $.MANY((() => {
              $.SUBRULE($.attribute);
            })), $.OR([ {
              ALT: () => {
                $.CONSUME(t.CLOSE, {
                  LABEL: "START_CLOSE"
                }), $.SUBRULE($.content), $.CONSUME(t.SLASH_OPEN), $.CONSUME2(t.Name, {
                  LABEL: "END_NAME"
                }), $.CONSUME2(t.CLOSE, {
                  LABEL: "END"
                });
              }
            }, {
              ALT: () => {
                $.CONSUME(t.SLASH_CLOSE);
              }
            } ]);
          })), $.RULE("reference", (() => {
            $.OR([ {
              ALT: () => $.CONSUME(t.EntityRef)
            }, {
              ALT: () => $.CONSUME(t.CharRef)
            } ]);
          })), $.RULE("attribute", (() => {
            $.CONSUME(t.Name);
            try {
              this.deletionRecoveryEnabled = !1, $.CONSUME(t.EQUALS), $.CONSUME(t.STRING);
            } finally {
              this.deletionRecoveryEnabled = !0;
            }
          })), $.RULE("chardata", (() => {
            $.OR([ {
              ALT: () => $.CONSUME(t.TEXT)
            }, {
              ALT: () => $.CONSUME(t.SEA_WS)
            } ]);
          })), $.RULE("misc", (() => {
            $.OR([ {
              ALT: () => $.CONSUME(t.Comment)
            }, {
              ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION)
            }, {
              ALT: () => $.CONSUME(t.SEA_WS)
            } ]);
          })), this.performSelfAnalysis();
        }
        canRecoverWithSingleTokenDeletion(expectedTokType) {
          return !1 !== this.deletionRecoveryEnabled && super.canRecoverWithSingleTokenDeletion(expectedTokType);
        }
        findReSyncTokenType() {
          const allPossibleReSyncTokTypes = this.flattenFollowSet();
          let nextToken = this.LA(1), k = 2;
          for (;;) {
            const foundMatch = allPossibleReSyncTokTypes.find((resyncTokType => tokenMatcher(nextToken, resyncTokType)));
            if (void 0 !== foundMatch) return foundMatch;
            nextToken = this.LA(k), k++;
          }
        }
      };
      module.exports = {
        xmlParser
      };
    },
    999: module => {
      "use strict";
      module.exports = require("./chevrotain");
    },
    413: module => {
      "use strict";
      module.exports = require("prettier/doc");
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
  }(219);
  module.exports = __webpack_exports__;
})();